// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../core/common/common.js';
import * as Platform from '../../../core/platform/platform.js';
import * as Types from '../types/types.js';
import { data as metaHandlerData } from './MetaHandler.js';
import { data as networkRequestsHandlerData } from './NetworkRequestsHandler.js';
const scriptById = new Map();
export function deps() {
    return ['Meta', 'NetworkRequests'];
}
export function reset() {
    scriptById.clear();
}
export function handleEvent(event) {
    const getOrMakeScript = (isolate, scriptIdAsNumber) => {
        const scriptId = String(scriptIdAsNumber);
        const key = `${isolate}.${scriptId}`;
        return Platform.MapUtilities.getWithDefault(scriptById, key, () => ({ isolate, scriptId, frame: '', ts: 0 }));
    };
    if (Types.Events.isTargetRundownEvent(event) && event.args.data) {
        const { isolate, scriptId, frame } = event.args.data;
        const script = getOrMakeScript(isolate, scriptId);
        script.frame = frame;
        script.ts = event.ts;
        return;
    }
    if (Types.Events.isV8SourceRundownEvent(event)) {
        const { isolate, scriptId, url, sourceUrl, sourceMapUrl, startLine, startColumn } = event.args.data;
        const script = getOrMakeScript(isolate, scriptId);
        script.url = url;
        if (sourceUrl) {
            script.sourceUrl = sourceUrl;
        }
        if (sourceMapUrl) {
            script.sourceMapUrl = sourceMapUrl;
        }
        script.inline = Boolean(startLine || startColumn);
        return;
    }
    if (Types.Events.isV8SourceRundownSourcesScriptCatchupEvent(event)) {
        const { isolate, scriptId, sourceText } = event.args.data;
        const script = getOrMakeScript(isolate, scriptId);
        script.content = sourceText;
        return;
    }
    if (Types.Events.isV8SourceRundownSourcesLargeScriptCatchupEvent(event)) {
        const { isolate, scriptId, sourceText } = event.args.data;
        const script = getOrMakeScript(isolate, scriptId);
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
function findNetworkRequest(networkRequests, script) {
    return networkRequests.find(request => request.args.data.url === script.url) ?? null;
}
function computeMappingEndColumns(map) {
    const result = new Map();
    const mappings = map.mappings();
    for (let i = 0; i < mappings.length - 1; i++) {
        const mapping = mappings[i];
        const nextMapping = mappings[i + 1];
        if (mapping.lineNumber === nextMapping.lineNumber) {
            result.set(mapping, nextMapping.columnNumber);
        }
    }
    // Now, all but the last mapping on each line will have a value in this map.
    return result;
}
/**
 * Using a script's contents and source map, attribute every generated byte to an authored source file.
 */
function computeGeneratedFileSizes(script) {
    if (!script.sourceMap) {
        throw new Error('expected source map');
    }
    const map = script.sourceMap;
    const content = script.content ?? '';
    const contentLength = content.length;
    const lines = content.split('\n');
    const files = {};
    const totalBytes = contentLength;
    let unmappedBytes = totalBytes;
    const mappingEndCols = computeMappingEndColumns(script.sourceMap);
    for (const mapping of map.mappings()) {
        const source = mapping.sourceURL;
        const lineNum = mapping.lineNumber;
        const colNum = mapping.columnNumber;
        const lastColNum = mappingEndCols.get(mapping);
        // Webpack sometimes emits null mappings.
        // https://github.com/mozilla/source-map/pull/303
        if (!source) {
            continue;
        }
        // Lines and columns are zero-based indices. Visually, lines are shown as a 1-based index.
        const line = lines[lineNum];
        if (line === null || line === undefined) {
            const errorMessage = `${map.url()} mapping for line out of bounds: ${lineNum + 1}`;
            return { errorMessage };
        }
        if (colNum > line.length) {
            const errorMessage = `${map.url()} mapping for column out of bounds: ${lineNum + 1}:${colNum}`;
            return { errorMessage };
        }
        let mappingLength = 0;
        if (lastColNum !== undefined) {
            if (lastColNum > line.length) {
                const errorMessage = `${map.url()} mapping for last column out of bounds: ${lineNum + 1}:${lastColNum}`;
                return { errorMessage };
            }
            mappingLength = lastColNum - colNum;
        }
        else {
            // Add +1 to account for the newline.
            mappingLength = line.length - colNum + 1;
        }
        files[source] = (files[source] || 0) + mappingLength;
        unmappedBytes -= mappingLength;
    }
    return {
        files,
        unmappedBytes,
        totalBytes,
    };
}
export function getScriptGeneratedSizes(script) {
    if (script.sourceMap && !script.sizes) {
        script.sizes = computeGeneratedFileSizes(script);
    }
    return script.sizes ?? null;
}
function findCachedRawSourceMap(sourceMapUrl, options) {
    if (!sourceMapUrl) {
        return;
    }
    // If loading from disk, check the metadata for source maps.
    // The metadata doesn't store data url source maps.
    const isDataUrl = sourceMapUrl.startsWith('data:');
    if (!options.isFreshRecording && options.metadata?.sourceMaps && !isDataUrl) {
        const cachedSourceMap = options.metadata.sourceMaps.find(m => m.sourceMapUrl === sourceMapUrl);
        if (cachedSourceMap) {
            return cachedSourceMap.sourceMap;
        }
    }
    return;
}
export async function finalize(options) {
    const networkRequests = [...networkRequestsHandlerData().byId.values()];
    for (const script of scriptById.values()) {
        script.request = findNetworkRequest(networkRequests, script) ?? undefined;
    }
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
            cachedRawSourceMap: findCachedRawSourceMap(sourceMapUrl, options),
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
        scripts: [...scriptById.values()],
    };
}
//# sourceMappingURL=ScriptsHandler.js.map