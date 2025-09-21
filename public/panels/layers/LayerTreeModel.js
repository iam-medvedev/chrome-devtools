// Copyright 2013 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Geometry from '../../models/geometry/geometry.js';
export class LayerTreeModel extends SDK.SDKModel.SDKModel {
    layerTreeAgent;
    paintProfilerModel;
    #layerTree;
    throttler;
    enabled;
    lastPaintRectByLayerId;
    constructor(target) {
        super(target);
        this.layerTreeAgent = target.layerTreeAgent();
        target.registerLayerTreeDispatcher(new LayerTreeDispatcher(this));
        this.paintProfilerModel =
            target.model(SDK.PaintProfiler.PaintProfilerModel);
        const resourceTreeModel = target.model(SDK.ResourceTreeModel.ResourceTreeModel);
        if (resourceTreeModel) {
            resourceTreeModel.addEventListener(SDK.ResourceTreeModel.Events.PrimaryPageChanged, this.onPrimaryPageChanged, this);
        }
        this.#layerTree = null;
        this.throttler = new Common.Throttler.Throttler(20);
    }
    async disable() {
        if (!this.enabled) {
            return;
        }
        this.enabled = false;
        await this.layerTreeAgent.invoke_disable();
    }
    enable() {
        if (this.enabled) {
            return;
        }
        this.enabled = true;
        void this.forceEnable();
    }
    async forceEnable() {
        this.lastPaintRectByLayerId = new Map();
        if (!this.#layerTree) {
            this.#layerTree = new AgentLayerTree(this);
        }
        await this.layerTreeAgent.invoke_enable();
    }
    layerTree() {
        return this.#layerTree;
    }
    async layerTreeChanged(layers) {
        if (!this.enabled) {
            return;
        }
        void this.throttler.schedule(this.innerSetLayers.bind(this, layers));
    }
    async innerSetLayers(layers) {
        const layerTree = this.#layerTree;
        await layerTree.setLayers(layers);
        if (!this.lastPaintRectByLayerId) {
            this.lastPaintRectByLayerId = new Map();
        }
        for (const layerId of this.lastPaintRectByLayerId.keys()) {
            const lastPaintRect = this.lastPaintRectByLayerId.get(layerId);
            const layer = layerTree.layerById(layerId);
            if (layer) {
                layer.setLastPaintRect(lastPaintRect);
            }
        }
        this.lastPaintRectByLayerId = new Map();
        this.dispatchEventToListeners(Events.LayerTreeChanged);
    }
    layerPainted(layerId, clipRect) {
        if (!this.enabled) {
            return;
        }
        const layerTree = this.#layerTree;
        const layer = layerTree.layerById(layerId);
        if (!layer) {
            if (!this.lastPaintRectByLayerId) {
                this.lastPaintRectByLayerId = new Map();
            }
            this.lastPaintRectByLayerId.set(layerId, clipRect);
            return;
        }
        layer.didPaint(clipRect);
        this.dispatchEventToListeners(Events.LayerPainted, layer);
    }
    onPrimaryPageChanged() {
        this.#layerTree = null;
        if (this.enabled) {
            void this.forceEnable();
        }
    }
}
SDK.SDKModel.SDKModel.register(LayerTreeModel, { capabilities: 2 /* SDK.Target.Capability.DOM */, autostart: false });
export var Events;
(function (Events) {
    /* eslint-disable @typescript-eslint/naming-convention -- Used by web_tests. */
    Events["LayerTreeChanged"] = "LayerTreeChanged";
    Events["LayerPainted"] = "LayerPainted";
    /* eslint-enable @typescript-eslint/naming-convention */
})(Events || (Events = {}));
export class AgentLayerTree extends SDK.LayerTreeBase.LayerTreeBase {
    layerTreeModel;
    constructor(layerTreeModel) {
        super(layerTreeModel.target());
        this.layerTreeModel = layerTreeModel;
    }
    async setLayers(payload) {
        if (!payload) {
            this.#setLayers(payload);
            return;
        }
        const idsToResolve = new Set();
        for (let i = 0; i < payload.length; ++i) {
            const backendNodeId = payload[i].backendNodeId;
            if (!backendNodeId || this.backendNodeIdToNode().has(backendNodeId)) {
                continue;
            }
            idsToResolve.add(backendNodeId);
        }
        await this.resolveBackendNodeIds(idsToResolve);
        this.#setLayers(payload);
    }
    #setLayers(layers) {
        this.setRoot(null);
        this.setContentRoot(null);
        // Payload will be null when not in the composited mode.
        if (!layers) {
            return;
        }
        let root;
        const oldLayersById = this.layersById;
        this.layersById = new Map();
        for (let i = 0; i < layers.length; ++i) {
            const layerId = layers[i].layerId;
            let layer = oldLayersById.get(layerId);
            if (layer) {
                layer.reset(layers[i]);
            }
            else {
                layer = new AgentLayer(this.layerTreeModel, layers[i]);
            }
            this.layersById.set(layerId, layer);
            const backendNodeId = layers[i].backendNodeId;
            if (backendNodeId) {
                layer.setNode(this.backendNodeIdToNode().get(backendNodeId) || null);
            }
            if (!this.contentRoot() && layer.drawsContent()) {
                this.setContentRoot(layer);
            }
            const parentId = layer.parentId();
            if (parentId) {
                const parent = this.layersById.get(parentId);
                if (!parent) {
                    throw new Error(`Missing parent ${parentId} for layer ${layerId}`);
                }
                parent.addChild(layer);
            }
            else {
                if (root) {
                    console.assert(false, 'Multiple root layers');
                }
                root = layer;
            }
        }
        if (root) {
            this.setRoot(root);
            root.calculateQuad(new WebKitCSSMatrix());
        }
    }
}
export class AgentLayer {
    // Used in Web tests
    scrollRectsInternal;
    #quad;
    #children;
    #parent;
    layerPayload;
    layerTreeModel;
    #node;
    #lastPaintRect;
    #paintCount;
    #stickyPositionConstraint;
    constructor(layerTreeModel, layerPayload) {
        this.layerTreeModel = layerTreeModel;
        this.reset(layerPayload);
    }
    id() {
        return this.layerPayload.layerId;
    }
    parentId() {
        return this.layerPayload.parentLayerId || null;
    }
    parent() {
        return this.#parent;
    }
    isRoot() {
        return !this.parentId();
    }
    children() {
        return this.#children;
    }
    addChild(childParam) {
        const child = childParam;
        if (child.#parent) {
            console.assert(false, 'Child already has a parent');
        }
        this.#children.push(child);
        child.#parent = this;
    }
    setNode(node) {
        this.#node = node;
    }
    node() {
        return this.#node || null;
    }
    nodeForSelfOrAncestor() {
        let layer = this;
        for (; layer; layer = layer.#parent) {
            if (layer.#node) {
                return layer.#node;
            }
        }
        return null;
    }
    offsetX() {
        return this.layerPayload.offsetX;
    }
    offsetY() {
        return this.layerPayload.offsetY;
    }
    width() {
        return this.layerPayload.width;
    }
    height() {
        return this.layerPayload.height;
    }
    transform() {
        return this.layerPayload.transform || null;
    }
    quad() {
        return this.#quad;
    }
    anchorPoint() {
        return [
            this.layerPayload.anchorX || 0,
            this.layerPayload.anchorY || 0,
            this.layerPayload.anchorZ || 0,
        ];
    }
    invisible() {
        return this.layerPayload.invisible || false;
    }
    paintCount() {
        return this.#paintCount || this.layerPayload.paintCount;
    }
    lastPaintRect() {
        return this.#lastPaintRect || null;
    }
    setLastPaintRect(lastPaintRect) {
        this.#lastPaintRect = lastPaintRect;
    }
    scrollRects() {
        return this.scrollRectsInternal;
    }
    stickyPositionConstraint() {
        return this.#stickyPositionConstraint || null;
    }
    async requestCompositingReasons() {
        const reasons = await this.layerTreeModel.layerTreeAgent.invoke_compositingReasons({ layerId: this.id() });
        return reasons.compositingReasons || [];
    }
    async requestCompositingReasonIds() {
        const reasons = await this.layerTreeModel.layerTreeAgent.invoke_compositingReasons({ layerId: this.id() });
        return reasons.compositingReasonIds || [];
    }
    drawsContent() {
        return this.layerPayload.drawsContent;
    }
    gpuMemoryUsage() {
        const bytesPerPixel = 4;
        return this.drawsContent() ? this.width() * this.height() * bytesPerPixel : 0;
    }
    snapshots() {
        const promise = this.layerTreeModel.paintProfilerModel.makeSnapshot(this.id()).then(snapshot => {
            if (!snapshot) {
                return null;
            }
            return { rect: { x: 0, y: 0, width: this.width(), height: this.height() }, snapshot };
        });
        return [promise];
    }
    didPaint(rect) {
        this.#lastPaintRect = rect;
        this.#paintCount = this.paintCount() + 1;
    }
    reset(layerPayload) {
        this.#node = null;
        this.#children = [];
        this.#parent = null;
        this.#paintCount = 0;
        this.layerPayload = layerPayload;
        this.scrollRectsInternal = this.layerPayload.scrollRects || [];
        this.#stickyPositionConstraint = this.layerPayload.stickyPositionConstraint ?
            new SDK.LayerTreeBase.StickyPositionConstraint(this.layerTreeModel.layerTree(), this.layerPayload.stickyPositionConstraint) :
            null;
    }
    matrixFromArray(a) {
        function toFixed9(x) {
            return x.toFixed(9);
        }
        return new WebKitCSSMatrix('matrix3d(' + a.map(toFixed9).join(',') + ')');
    }
    calculateTransformToViewport(parentTransform) {
        const offsetMatrix = new WebKitCSSMatrix().translate(this.layerPayload.offsetX, this.layerPayload.offsetY);
        let matrix = offsetMatrix;
        if (this.layerPayload.transform) {
            const transformMatrix = this.matrixFromArray(this.layerPayload.transform);
            const anchorVector = new Geometry.Vector(this.layerPayload.width * this.anchorPoint()[0], this.layerPayload.height * this.anchorPoint()[1], this.anchorPoint()[2]);
            const anchorPoint = Geometry.multiplyVectorByMatrixAndNormalize(anchorVector, matrix);
            const anchorMatrix = new WebKitCSSMatrix().translate(-anchorPoint.x, -anchorPoint.y, -anchorPoint.z);
            matrix = anchorMatrix.inverse().multiply(transformMatrix.multiply(anchorMatrix.multiply(matrix)));
        }
        matrix = parentTransform.multiply(matrix);
        return matrix;
    }
    createVertexArrayForRect(width, height) {
        return [0, 0, 0, width, 0, 0, width, height, 0, 0, height, 0];
    }
    calculateQuad(parentTransform) {
        const matrix = this.calculateTransformToViewport(parentTransform);
        this.#quad = [];
        const vertices = this.createVertexArrayForRect(this.layerPayload.width, this.layerPayload.height);
        for (let i = 0; i < 4; ++i) {
            const point = Geometry.multiplyVectorByMatrixAndNormalize(new Geometry.Vector(vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2]), matrix);
            this.#quad.push(point.x, point.y);
        }
        function calculateQuadForLayer(layer) {
            layer.calculateQuad(matrix);
        }
        this.#children.forEach(calculateQuadForLayer);
    }
}
class LayerTreeDispatcher {
    layerTreeModel;
    constructor(layerTreeModel) {
        this.layerTreeModel = layerTreeModel;
    }
    layerTreeDidChange({ layers }) {
        void this.layerTreeModel.layerTreeChanged(layers || null);
    }
    layerPainted({ layerId, clip }) {
        this.layerTreeModel.layerPainted(layerId, clip);
    }
}
//# sourceMappingURL=LayerTreeModel.js.map