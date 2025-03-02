// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../core/common/common.js';
import * as Platform from '../../../core/platform/platform.js';
import * as Types from '../types/types.js';
import { data as metaHandlerData } from './MetaHandler.js';
const scriptById = new Map();
export function reset() {
    scriptById.clear();
}
export function handleEvent(event) {
    const getOrMakeScript = (scriptIdAsNumber) => {
        const scriptId = String(scriptIdAsNumber);
        return Platform.MapUtilities.getWithDefault(scriptById, scriptId, () => ({ scriptId, frame: '', ts: 0 }));
    };
    if (Types.Events.isTargetRundownEvent(event) && event.args.data) {
        const { scriptId, frame } = event.args.data;
        const script = getOrMakeScript(scriptId);
        script.frame = frame;
        script.ts = event.ts;
        return;
    }
    if (Types.Events.isV8SourceRundownEvent(event)) {
        const { scriptId, url, sourceUrl, sourceMapUrl } = event.args.data;
        const script = getOrMakeScript(scriptId);
        script.url = url;
        if (sourceUrl) {
            script.sourceUrl = sourceUrl;
        }
        if (sourceMapUrl) {
            script.sourceMapUrl = sourceMapUrl;
        }
        return;
    }
    if (Types.Events.isV8SourceRundownSourcesScriptCatchupEvent(event)) {
        const { scriptId, sourceText } = event.args.data;
        const script = getOrMakeScript(scriptId);
        script.content = sourceText;
        return;
    }
    if (Types.Events.isV8SourceRundownSourcesLargeScriptCatchupEvent(event)) {
        const { scriptId, sourceText } = event.args.data;
        const script = getOrMakeScript(scriptId);
        script.content = (script.content ?? '') + sourceText;
        return;
    }
}
function findFrame(meta, frameId) {
    for (const frames of meta.frameByProcessId?.values()) {
        const frame = frames.get(frameId);
        if (frame) {
            return frame;
        }
    }
    return null;
}
export async function finalize(options) {
    if (!options.resolveSourceMap) {
        return;
    }
    const meta = metaHandlerData();
    const promises = [];
    for (const script of scriptById.values()) {
        // No frame or url means the script came from somewhere we don't care about.
        // Note: scripts from inline <SCRIPT> elements use the url of the HTML document,
        // so aren't ignored.
        if (!script.frame || !script.url || !script.sourceMapUrl) {
            continue;
        }
        const frameUrl = findFrame(meta, script.frame)?.url;
        if (!frameUrl) {
            continue;
        }
        // If there is a `sourceURL` magic comment, resolve the compiledUrl against the frame url.
        // example: `// #sourceURL=foo.js` for target frame https://www.example.com/home -> https://www.example.com/home/foo.js
        let sourceUrl = script.url;
        if (script.sourceUrl) {
            sourceUrl = Common.ParsedURL.ParsedURL.completeURL(frameUrl, script.sourceUrl) ?? script.sourceUrl;
        }
        // Resolve the source map url. The value given by v8 may be relative, so resolve it here.
        // This process should match the one in `SourceMapManager.attachSourceMap`.
        const sourceMapUrl = Common.ParsedURL.ParsedURL.completeURL(sourceUrl, script.sourceMapUrl);
        if (!sourceMapUrl) {
            continue;
        }
        script.sourceMapUrl = sourceMapUrl;
        const params = {
            scriptId: script.scriptId,
            scriptUrl: sourceUrl,
            sourceMapUrl: sourceMapUrl,
            frame: script.frame,
        };
        const promise = options.resolveSourceMap(params).then(sourceMap => {
            if (sourceMap) {
                script.sourceMap = sourceMap;
            }
        });
        promises.push(promise);
    }
    await Promise.all(promises);
}
export function data() {
    return {
        scripts: scriptById,
    };
}
//# sourceMappingURL=ScriptsHandler.js.map