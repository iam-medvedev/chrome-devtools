// Copyright 2016 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { DOMModel } from './DOMModel.js';
export class StickyPositionConstraint {
    #stickyBoxRectInternal;
    #containingBlockRectInternal;
    #nearestLayerShiftingStickyBoxInternal;
    #nearestLayerShiftingContainingBlockInternal;
    constructor(layerTree, constraint) {
        this.#stickyBoxRectInternal = constraint.stickyBoxRect;
        this.#containingBlockRectInternal = constraint.containingBlockRect;
        this.#nearestLayerShiftingStickyBoxInternal = null;
        if (layerTree && constraint.nearestLayerShiftingStickyBox) {
            this.#nearestLayerShiftingStickyBoxInternal = layerTree.layerById(constraint.nearestLayerShiftingStickyBox);
        }
        this.#nearestLayerShiftingContainingBlockInternal = null;
        if (layerTree && constraint.nearestLayerShiftingContainingBlock) {
            this.#nearestLayerShiftingContainingBlockInternal =
                layerTree.layerById(constraint.nearestLayerShiftingContainingBlock);
        }
    }
    stickyBoxRect() {
        return this.#stickyBoxRectInternal;
    }
    containingBlockRect() {
        return this.#containingBlockRectInternal;
    }
    nearestLayerShiftingStickyBox() {
        return this.#nearestLayerShiftingStickyBoxInternal;
    }
    nearestLayerShiftingContainingBlock() {
        return this.#nearestLayerShiftingContainingBlockInternal;
    }
}
export class LayerTreeBase {
    #targetInternal;
    #domModel;
    layersById = new Map();
    #rootInternal = null;
    #contentRootInternal = null;
    #backendNodeIdToNodeInternal = new Map();
    #viewportSizeInternal;
    constructor(target) {
        this.#targetInternal = target;
        this.#domModel = target ? target.model(DOMModel) : null;
    }
    target() {
        return this.#targetInternal;
    }
    root() {
        return this.#rootInternal;
    }
    setRoot(root) {
        this.#rootInternal = root;
    }
    contentRoot() {
        return this.#contentRootInternal;
    }
    setContentRoot(contentRoot) {
        this.#contentRootInternal = contentRoot;
    }
    forEachLayer(callback, root) {
        if (!root) {
            root = this.root();
            if (!root) {
                return false;
            }
        }
        return callback(root) || root.children().some(this.forEachLayer.bind(this, callback));
    }
    layerById(id) {
        return this.layersById.get(id) || null;
    }
    async resolveBackendNodeIds(requestedNodeIds) {
        if (!requestedNodeIds.size || !this.#domModel) {
            return;
        }
        const nodesMap = await this.#domModel.pushNodesByBackendIdsToFrontend(requestedNodeIds);
        if (!nodesMap) {
            return;
        }
        for (const nodeId of nodesMap.keys()) {
            this.#backendNodeIdToNodeInternal.set(nodeId, nodesMap.get(nodeId) || null);
        }
    }
    backendNodeIdToNode() {
        return this.#backendNodeIdToNodeInternal;
    }
    setViewportSize(viewportSize) {
        this.#viewportSizeInternal = viewportSize;
    }
    viewportSize() {
        return this.#viewportSizeInternal;
    }
}
//# sourceMappingURL=LayerTreeBase.js.map