// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './components/components.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as LitHtml from '../../ui/lit-html/lit-html.js';
const { html } = LitHtml;
function isLeafNode(node) {
    return node.numChildren() === 0 && node.role()?.value !== 'Iframe';
}
function getModel(frameId) {
    const frame = SDK.FrameManager.FrameManager.instance().getFrame(frameId);
    const model = frame?.resourceTreeModel().target().model(SDK.AccessibilityModel.AccessibilityModel);
    if (!model) {
        throw Error('Could not instantiate model for frameId');
    }
    return model;
}
export async function getRootNode(frameId) {
    const model = getModel(frameId);
    const root = await model.requestRootNode(frameId);
    if (!root) {
        throw Error('No accessibility root for frame');
    }
    return root;
}
function getFrameIdForNodeOrDocument(node) {
    let frameId;
    if (node instanceof SDK.DOMModel.DOMDocument) {
        frameId = node.body?.frameId();
    }
    else {
        frameId = node.frameId();
    }
    if (!frameId) {
        throw Error('No frameId for DOM node');
    }
    return frameId;
}
export async function getNodeAndAncestorsFromDOMNode(domNode) {
    let frameId = getFrameIdForNodeOrDocument(domNode);
    const model = getModel(frameId);
    const result = await model.requestAndLoadSubTreeToNode(domNode);
    if (!result) {
        throw Error('Could not retrieve accessibility node for inspected DOM node');
    }
    const outermostFrameId = SDK.FrameManager.FrameManager.instance().getOutermostFrame()?.id;
    if (!outermostFrameId) {
        return result;
    }
    while (frameId !== outermostFrameId) {
        const node = await SDK.FrameManager.FrameManager.instance().getFrame(frameId)?.getOwnerDOMNodeOrDocument();
        if (!node) {
            break;
        }
        frameId = getFrameIdForNodeOrDocument(node);
        const model = getModel(frameId);
        const ancestors = await model.requestAndLoadSubTreeToNode(node);
        result.push(...ancestors || []);
    }
    return result;
}
async function getChildren(node) {
    if (node.role()?.value === 'Iframe') {
        const domNode = await node.deferredDOMNode()?.resolvePromise();
        if (!domNode) {
            throw new Error('Could not find corresponding DOMNode');
        }
        const frameId = domNode.frameOwnerFrameId();
        if (!frameId) {
            throw Error('No owner frameId on iframe node');
        }
        const localRoot = await getRootNode(frameId);
        return [localRoot];
    }
    return node.accessibilityModel().requestAXChildren(node.id(), node.getFrameId() || undefined);
}
export async function sdkNodeToAXTreeNodes(sdkNode) {
    const treeNodeData = sdkNode;
    if (isLeafNode(sdkNode)) {
        return [{
                treeNodeData,
                id: getNodeId(sdkNode),
            }];
    }
    return [{
            treeNodeData,
            children: async () => {
                const childNodes = await getChildren(sdkNode);
                const childTreeNodes = await Promise.all(childNodes.map(childNode => sdkNodeToAXTreeNodes(childNode)));
                return childTreeNodes.flat(1);
            },
            id: getNodeId(sdkNode),
        }];
}
export function accessibilityNodeRenderer(node) {
    const sdkNode = node.treeNodeData;
    const name = sdkNode.name()?.value || '';
    const role = sdkNode.role()?.value || '';
    const properties = sdkNode.properties() || [];
    const ignored = sdkNode.ignored();
    const id = getNodeId(sdkNode);
    return html `<devtools-accessibility-tree-node .data=${{ name, role, ignored, properties, id }}></devtools-accessibility-tree-node>`;
}
export function getNodeId(node) {
    return node.getFrameId() + '#' + node.id();
}
//# sourceMappingURL=AccessibilityTreeUtils.js.map