// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Platform from '../../../core/platform/platform.js';
import * as Types from '../types/types.js';
const scriptById = new Map();
export function reset() {
    scriptById.clear();
}
export function handleEvent(event) {
    const getOrMakeScript = (scriptId) => Platform.MapUtilities.getWithDefault(scriptById, scriptId, () => ({ scriptId, frame: '', ts: 0 }));
    if (Types.Events.isTargetRundownEvent(event)) {
        const { scriptId, frame } = event.args.data;
        const script = getOrMakeScript(scriptId);
        script.frame = frame;
        script.ts = event.ts;
        return;
    }
    if (Types.Events.isScriptRundownEvent(event)) {
        const { scriptId, url, sourceMapUrl } = event.args.data;
        const script = getOrMakeScript(scriptId);
        script.url = url;
        // Ignore nonsense values, which is what this was when initially implemented.
        // TODO(cjamcl): https://g-issues.chromium.org/issues/337909145#comment15
        if (sourceMapUrl && sourceMapUrl !== url && sourceMapUrl.endsWith('.json')) {
            script.sourceMapUrl = sourceMapUrl;
        }
        return;
    }
    if (Types.Events.isScriptSourceRundownEvent(event)) {
        const { scriptId, sourceText } = event.args.data;
        const script = getOrMakeScript(scriptId);
        script.content = sourceText;
        return;
    }
}
export async function finalize(options) {
    if (!options.resolveSourceMap) {
        return;
    }
    const promises = [];
    for (const script of scriptById.values()) {
        if (script.sourceMapUrl) {
            promises.push(options.resolveSourceMap(script.sourceMapUrl).then(sourceMap => {
                script.sourceMap = sourceMap;
            }));
        }
    }
    await Promise.all(promises);
}
export function data() {
    return {
        scripts: scriptById,
    };
}
//# sourceMappingURL=ScriptsHandler.js.map