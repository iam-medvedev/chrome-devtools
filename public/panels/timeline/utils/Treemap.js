// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import * as Trace from '../../../models/trace/trace.js';
/**
 * Takes an UTF-8 string and returns a base64 encoded string. The UTF-8 bytes are
 * gzipped before base64'd using CompressionStream.
 */
async function toCompressedBase64(string) {
    let bytes = new TextEncoder().encode(string);
    const cs = new CompressionStream('gzip');
    const writer = cs.writable.getWriter();
    void writer.write(bytes);
    void writer.close();
    const compAb = await new Response(cs.readable).arrayBuffer();
    bytes = new Uint8Array(compAb);
    let binaryString = '';
    // This is ~25% faster than building the string one character at a time.
    // https://jsbench.me/2gkoxazvjl
    const chunkSize = 5000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
        binaryString += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
    }
    return btoa(binaryString);
}
/**
 * Opens a new tab to an external page and sends data via base64 encoded url params.
 */
async function openTabWithUrlData(data, urlString, windowName) {
    const url = new URL(urlString);
    url.hash = await toCompressedBase64(JSON.stringify(data));
    url.searchParams.set('gzip', '1');
    window.open(url.toString(), windowName);
}
/**
 * Opens a new tab to the treemap app and sends the data using URL.fragment
 */
export function openTreemap(treemapData, mainDocumentUrl, windowNameSuffix) {
    const treemapOptions = {
        lhr: {
            mainDocumentUrl,
            audits: {
                'script-treemap-data': {
                    details: {
                        type: 'treemap-data',
                        nodes: treemapData,
                    },
                },
            },
            configSettings: {
                locale: i18n.DevToolsLocale.DevToolsLocale.instance().locale,
            },
        },
        initialView: 'duplicate-modules',
    };
    const url = 'https://googlechrome.github.io/lighthouse/treemap/';
    const windowName = `treemap-${windowNameSuffix}`;
    void openTabWithUrlData(treemapOptions, url, windowName);
}
/**
 * Returns a tree data structure where leaf nodes are sources (ie. real files from
 * source tree) from a source map, and non-leaf nodes are directories. Leaf nodes
 * have data for bytes, coverage, etc., when available, and non-leaf nodes have the
 * same data as the sum of all descendant leaf nodes.
 */
export function makeScriptNode(src, sourceRoot, sourcesData) {
    function newNode(name) {
        return {
            name,
            resourceBytes: 0,
        };
    }
    const sourceRootNode = newNode(sourceRoot);
    /**
     * Given a slash-delimited path, traverse the Node structure and increment
     * the data provided for each node in the chain. Creates nodes as needed.
     * Ex: path/to/file.js will find or create "path" on `node`, increment the data fields,
     *     and continue with "to", and so on.
     */
    function addAllNodesInSourcePath(source, data) {
        let node = sourceRootNode;
        // Apply the data to the sourceRootNode.
        sourceRootNode.resourceBytes += data.resourceBytes;
        // Strip off the shared root.
        const sourcePathSegments = source.replace(sourceRoot, '').split(/\/+/);
        sourcePathSegments.forEach((sourcePathSegment, i) => {
            if (sourcePathSegment.length === 0) {
                return;
            }
            const isLeaf = i === sourcePathSegments.length - 1;
            let child = node.children?.find(child => child.name === sourcePathSegment);
            if (!child) {
                child = newNode(sourcePathSegment);
                node.children = node.children || [];
                node.children.push(child);
            }
            node = child;
            // Now that we've found or created the next node in the path, apply the data.
            node.resourceBytes += data.resourceBytes;
            // Only leaf nodes might have duplication data.
            if (isLeaf && data.duplicatedNormalizedModuleName !== undefined) {
                node.duplicatedNormalizedModuleName = data.duplicatedNormalizedModuleName;
            }
        });
    }
    // For every source file, apply the data to all components
    // of the source path, creating nodes as necessary.
    for (const [source, data] of Object.entries(sourcesData)) {
        addAllNodesInSourcePath(source, data);
    }
    /**
     * Collapse nodes that have only one child.
     */
    function collapseAll(node) {
        while (node.children && node.children.length === 1) {
            const child = node.children[0];
            node.name += '/' + child.name;
            if (child.duplicatedNormalizedModuleName) {
                node.duplicatedNormalizedModuleName = child.duplicatedNormalizedModuleName;
            }
            node.children = child.children;
        }
        if (node.children) {
            for (const child of node.children) {
                collapseAll(child);
            }
        }
    }
    collapseAll(sourceRootNode);
    // If sourceRootNode.name is falsy (no defined sourceRoot + no collapsed common prefix),
    // collapse the sourceRootNode children into the scriptNode.
    // Otherwise, we add another node.
    if (!sourceRootNode.name) {
        return {
            ...sourceRootNode,
            name: src,
            children: sourceRootNode.children,
        };
    }
    // Script node should be just the script src.
    const scriptNode = { ...sourceRootNode };
    scriptNode.name = src;
    scriptNode.children = [sourceRootNode];
    return scriptNode;
}
/**
 * Returns an array of nodes, where the first level of nodes represents every script.
 *
 * Every external script has a node.
 * All inline scripts are combined into a single node.
 * If a script has a source map, that node will be created by makeScriptNode.
 *
 * Example return result:
 *  - index.html (inline scripts)
 *  - main.js
 *  - - webpack://
 *  - - - react.js
 *  - - - app.js
 *  - i-have-no-map.js
 */
export function createTreemapData(scripts, duplication) {
    const nodes = [];
    const htmlNodesByFrameId = new Map();
    for (const script of scripts.scripts) {
        if (!script.url) {
            continue;
        }
        const name = script.url;
        const sizes = Trace.Handlers.ModelHandlers.Scripts.getScriptGeneratedSizes(script);
        let node;
        if (script.sourceMap && sizes && !('errorMessage' in sizes)) {
            // Create nodes for each module in a bundle.
            const sourcesData = {};
            for (const [source, resourceBytes] of Object.entries(sizes.files)) {
                const sourceData = {
                    resourceBytes,
                };
                const key = Trace.Extras.ScriptDuplication.normalizeSource(source);
                if (duplication.has(key)) {
                    sourceData.duplicatedNormalizedModuleName = key;
                }
                sourcesData[source] = sourceData;
            }
            if (sizes.unmappedBytes) {
                const sourceData = {
                    resourceBytes: sizes.unmappedBytes,
                };
                sourcesData['(unmapped)'] = sourceData;
            }
            node = makeScriptNode(script.url, script.url, sourcesData);
        }
        else {
            // No valid source map for this script, so we can only produce a single node.
            node = {
                name,
                resourceBytes: script.content?.length ?? 0,
            };
        }
        // If this is an inline script, place the node inside a top-level (aka depth-one)
        // node. Also separate each iframe / the main page's inline scripts into their
        // own top-level nodes.
        if (script.inline) {
            let htmlNode = htmlNodesByFrameId.get(script.frame);
            if (!htmlNode) {
                htmlNode = {
                    name,
                    resourceBytes: 0,
                    children: [],
                };
                htmlNodesByFrameId.set(script.frame, htmlNode);
                nodes.push(htmlNode);
            }
            htmlNode.resourceBytes += node.resourceBytes;
            node.name = script.content ? '(inline) ' + script.content.trimStart().substring(0, 15) + '…' : '(inline)';
            htmlNode.children?.push(node);
        }
        else {
            // Non-inline scripts each have their own top-level node.
            nodes.push(node);
        }
    }
    return nodes;
}
//# sourceMappingURL=Treemap.js.map