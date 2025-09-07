var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/layers/LayerPaintProfilerView.js
var LayerPaintProfilerView_exports = {};
__export(LayerPaintProfilerView_exports, {
  LayerPaintProfilerView: () => LayerPaintProfilerView
});
import * as UI from "./../../ui/legacy/legacy.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";
import * as LayerViewer from "./../layer_viewer/layer_viewer.js";
var LayerPaintProfilerView = class extends UI.SplitWidget.SplitWidget {
  logTreeView;
  paintProfilerView;
  constructor(showImageCallback) {
    super(true, false);
    this.element.setAttribute("jslog", `${VisualLogging.pane("layers.paint-profiler").track({ resize: true })}`);
    this.logTreeView = new LayerViewer.PaintProfilerView.PaintProfilerCommandLogView();
    this.setSidebarWidget(this.logTreeView);
    this.paintProfilerView = new LayerViewer.PaintProfilerView.PaintProfilerView(showImageCallback);
    this.setMainWidget(this.paintProfilerView);
    this.paintProfilerView.addEventListener("WindowChanged", this.onWindowChanged, this);
    this.logTreeView.focus();
  }
  reset() {
    void this.paintProfilerView.setSnapshotAndLog(null, [], null);
  }
  profile(snapshot) {
    void snapshot.commandLog().then((log) => setSnapshotAndLog.call(this, snapshot, log));
    function setSnapshotAndLog(snapshot2, log) {
      this.logTreeView.setCommandLog(log || []);
      void this.paintProfilerView.setSnapshotAndLog(snapshot2, log || [], null);
      if (snapshot2) {
        snapshot2.release();
      }
    }
  }
  setScale(scale) {
    this.paintProfilerView.setScale(scale);
  }
  onWindowChanged() {
    this.logTreeView.updateWindow(this.paintProfilerView.selectionWindow());
  }
};

// gen/front_end/panels/layers/LayersPanel.js
var LayersPanel_exports = {};
__export(LayersPanel_exports, {
  DetailsViewTabs: () => DetailsViewTabs,
  LayersPanel: () => LayersPanel
});
import * as Common2 from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
import * as LayerViewer2 from "./../layer_viewer/layer_viewer.js";

// gen/front_end/panels/layers/LayerTreeModel.js
var LayerTreeModel_exports = {};
__export(LayerTreeModel_exports, {
  AgentLayer: () => AgentLayer,
  AgentLayerTree: () => AgentLayerTree,
  Events: () => Events,
  LayerTreeModel: () => LayerTreeModel
});
import * as Common from "./../../core/common/common.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as Geometry from "./../../models/geometry/geometry.js";
var LayerTreeModel = class extends SDK.SDKModel.SDKModel {
  layerTreeAgent;
  paintProfilerModel;
  layerTreeInternal;
  throttler;
  enabled;
  lastPaintRectByLayerId;
  constructor(target) {
    super(target);
    this.layerTreeAgent = target.layerTreeAgent();
    target.registerLayerTreeDispatcher(new LayerTreeDispatcher(this));
    this.paintProfilerModel = target.model(SDK.PaintProfiler.PaintProfilerModel);
    const resourceTreeModel = target.model(SDK.ResourceTreeModel.ResourceTreeModel);
    if (resourceTreeModel) {
      resourceTreeModel.addEventListener(SDK.ResourceTreeModel.Events.PrimaryPageChanged, this.onPrimaryPageChanged, this);
    }
    this.layerTreeInternal = null;
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
    this.lastPaintRectByLayerId = /* @__PURE__ */ new Map();
    if (!this.layerTreeInternal) {
      this.layerTreeInternal = new AgentLayerTree(this);
    }
    await this.layerTreeAgent.invoke_enable();
  }
  layerTree() {
    return this.layerTreeInternal;
  }
  async layerTreeChanged(layers) {
    if (!this.enabled) {
      return;
    }
    void this.throttler.schedule(this.innerSetLayers.bind(this, layers));
  }
  async innerSetLayers(layers) {
    const layerTree = this.layerTreeInternal;
    await layerTree.setLayers(layers);
    if (!this.lastPaintRectByLayerId) {
      this.lastPaintRectByLayerId = /* @__PURE__ */ new Map();
    }
    for (const layerId of this.lastPaintRectByLayerId.keys()) {
      const lastPaintRect = this.lastPaintRectByLayerId.get(layerId);
      const layer = layerTree.layerById(layerId);
      if (layer) {
        layer.setLastPaintRect(lastPaintRect);
      }
    }
    this.lastPaintRectByLayerId = /* @__PURE__ */ new Map();
    this.dispatchEventToListeners(Events.LayerTreeChanged);
  }
  layerPainted(layerId, clipRect) {
    if (!this.enabled) {
      return;
    }
    const layerTree = this.layerTreeInternal;
    const layer = layerTree.layerById(layerId);
    if (!layer) {
      if (!this.lastPaintRectByLayerId) {
        this.lastPaintRectByLayerId = /* @__PURE__ */ new Map();
      }
      this.lastPaintRectByLayerId.set(layerId, clipRect);
      return;
    }
    layer.didPaint(clipRect);
    this.dispatchEventToListeners(Events.LayerPainted, layer);
  }
  onPrimaryPageChanged() {
    this.layerTreeInternal = null;
    if (this.enabled) {
      void this.forceEnable();
    }
  }
};
SDK.SDKModel.SDKModel.register(LayerTreeModel, { capabilities: 2, autostart: false });
var Events;
(function(Events2) {
  Events2["LayerTreeChanged"] = "LayerTreeChanged";
  Events2["LayerPainted"] = "LayerPainted";
})(Events || (Events = {}));
var AgentLayerTree = class extends SDK.LayerTreeBase.LayerTreeBase {
  layerTreeModel;
  constructor(layerTreeModel) {
    super(layerTreeModel.target());
    this.layerTreeModel = layerTreeModel;
  }
  async setLayers(payload) {
    if (!payload) {
      this.innerSetLayers(payload);
      return;
    }
    const idsToResolve = /* @__PURE__ */ new Set();
    for (let i = 0; i < payload.length; ++i) {
      const backendNodeId = payload[i].backendNodeId;
      if (!backendNodeId || this.backendNodeIdToNode().has(backendNodeId)) {
        continue;
      }
      idsToResolve.add(backendNodeId);
    }
    await this.resolveBackendNodeIds(idsToResolve);
    this.innerSetLayers(payload);
  }
  innerSetLayers(layers) {
    this.setRoot(null);
    this.setContentRoot(null);
    if (!layers) {
      return;
    }
    let root;
    const oldLayersById = this.layersById;
    this.layersById = /* @__PURE__ */ new Map();
    for (let i = 0; i < layers.length; ++i) {
      const layerId = layers[i].layerId;
      let layer = oldLayersById.get(layerId);
      if (layer) {
        layer.reset(layers[i]);
      } else {
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
      } else {
        if (root) {
          console.assert(false, "Multiple root layers");
        }
        root = layer;
      }
    }
    if (root) {
      this.setRoot(root);
      root.calculateQuad(new WebKitCSSMatrix());
    }
  }
};
var AgentLayer = class {
  scrollRectsInternal;
  quadInternal;
  childrenInternal;
  parentInternal;
  layerPayload;
  layerTreeModel;
  nodeInternal;
  lastPaintRectInternal;
  paintCountInternal;
  stickyPositionConstraintInternal;
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
    return this.parentInternal;
  }
  isRoot() {
    return !this.parentId();
  }
  children() {
    return this.childrenInternal;
  }
  addChild(childParam) {
    const child = childParam;
    if (child.parentInternal) {
      console.assert(false, "Child already has a parent");
    }
    this.childrenInternal.push(child);
    child.parentInternal = this;
  }
  setNode(node) {
    this.nodeInternal = node;
  }
  node() {
    return this.nodeInternal || null;
  }
  nodeForSelfOrAncestor() {
    let layer = this;
    for (; layer; layer = layer.parentInternal) {
      if (layer.nodeInternal) {
        return layer.nodeInternal;
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
    return this.quadInternal;
  }
  anchorPoint() {
    return [
      this.layerPayload.anchorX || 0,
      this.layerPayload.anchorY || 0,
      this.layerPayload.anchorZ || 0
    ];
  }
  invisible() {
    return this.layerPayload.invisible || false;
  }
  paintCount() {
    return this.paintCountInternal || this.layerPayload.paintCount;
  }
  lastPaintRect() {
    return this.lastPaintRectInternal || null;
  }
  setLastPaintRect(lastPaintRect) {
    this.lastPaintRectInternal = lastPaintRect;
  }
  scrollRects() {
    return this.scrollRectsInternal;
  }
  stickyPositionConstraint() {
    return this.stickyPositionConstraintInternal || null;
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
    const promise = this.layerTreeModel.paintProfilerModel.makeSnapshot(this.id()).then((snapshot) => {
      if (!snapshot) {
        return null;
      }
      return { rect: { x: 0, y: 0, width: this.width(), height: this.height() }, snapshot };
    });
    return [promise];
  }
  didPaint(rect) {
    this.lastPaintRectInternal = rect;
    this.paintCountInternal = this.paintCount() + 1;
  }
  reset(layerPayload) {
    this.nodeInternal = null;
    this.childrenInternal = [];
    this.parentInternal = null;
    this.paintCountInternal = 0;
    this.layerPayload = layerPayload;
    this.scrollRectsInternal = this.layerPayload.scrollRects || [];
    this.stickyPositionConstraintInternal = this.layerPayload.stickyPositionConstraint ? new SDK.LayerTreeBase.StickyPositionConstraint(this.layerTreeModel.layerTree(), this.layerPayload.stickyPositionConstraint) : null;
  }
  matrixFromArray(a) {
    function toFixed9(x) {
      return x.toFixed(9);
    }
    return new WebKitCSSMatrix("matrix3d(" + a.map(toFixed9).join(",") + ")");
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
    this.quadInternal = [];
    const vertices = this.createVertexArrayForRect(this.layerPayload.width, this.layerPayload.height);
    for (let i = 0; i < 4; ++i) {
      const point = Geometry.multiplyVectorByMatrixAndNormalize(new Geometry.Vector(vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2]), matrix);
      this.quadInternal.push(point.x, point.y);
    }
    function calculateQuadForLayer(layer) {
      layer.calculateQuad(matrix);
    }
    this.childrenInternal.forEach(calculateQuadForLayer);
  }
};
var LayerTreeDispatcher = class {
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
};

// gen/front_end/panels/layers/LayersPanel.js
var UIStrings = {
  /**
   * @description Text for the details of something
   */
  details: "Details",
  /**
   * @description Title of the Profiler tool
   */
  profiler: "Profiler"
};
var str_ = i18n.i18n.registerUIStrings("panels/layers/LayersPanel.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var layersPanelInstance;
var LayersPanel = class _LayersPanel extends UI2.Panel.PanelWithSidebar {
  model;
  layerViewHost;
  layerTreeOutline;
  rightSplitWidget;
  layers3DView;
  tabbedPane;
  layerDetailsView;
  paintProfilerView;
  updateThrottler;
  layerBeingProfiled;
  constructor() {
    super("layers", 225);
    this.model = null;
    SDK2.TargetManager.TargetManager.instance().observeTargets(this, { scoped: true });
    this.layerViewHost = new LayerViewer2.LayerViewHost.LayerViewHost();
    this.layerTreeOutline = new LayerViewer2.LayerTreeOutline.LayerTreeOutline(this.layerViewHost);
    this.layerTreeOutline.addEventListener("PaintProfilerRequested", this.onPaintProfileRequested, this);
    this.panelSidebarElement().appendChild(this.layerTreeOutline.element);
    this.setDefaultFocusedElement(this.layerTreeOutline.element);
    this.rightSplitWidget = new UI2.SplitWidget.SplitWidget(false, true, "layer-details-split-view-state");
    this.splitWidget().setMainWidget(this.rightSplitWidget);
    this.splitWidget().hideSidebar();
    this.layers3DView = new LayerViewer2.Layers3DView.Layers3DView(this.layerViewHost);
    this.rightSplitWidget.setMainWidget(this.layers3DView);
    this.rightSplitWidget.hideSidebar();
    this.layers3DView.addEventListener("PaintProfilerRequested", this.onPaintProfileRequested, this);
    this.layers3DView.addEventListener("ScaleChanged", this.onScaleChanged, this);
    this.tabbedPane = new UI2.TabbedPane.TabbedPane();
    this.rightSplitWidget.setSidebarWidget(this.tabbedPane);
    this.layerDetailsView = new LayerViewer2.LayerDetailsView.LayerDetailsView(this.layerViewHost);
    this.layerDetailsView.addEventListener("PaintProfilerRequested", this.onPaintProfileRequested, this);
    this.tabbedPane.appendTab(DetailsViewTabs.Details, i18nString(UIStrings.details), this.layerDetailsView);
    this.paintProfilerView = new LayerPaintProfilerView(this.showImage.bind(this));
    this.tabbedPane.addEventListener(UI2.TabbedPane.Events.TabClosed, this.onTabClosed, this);
    this.updateThrottler = new Common2.Throttler.Throttler(100);
  }
  static instance(opts) {
    if (!layersPanelInstance || opts?.forceNew) {
      layersPanelInstance = new _LayersPanel();
    }
    return layersPanelInstance;
  }
  focus() {
    this.layerTreeOutline.focus();
  }
  wasShown() {
    super.wasShown();
    if (this.model) {
      this.model.enable();
    }
  }
  willHide() {
    if (this.model) {
      void this.model.disable();
    }
    super.willHide();
  }
  targetAdded(target) {
    if (target !== target.outermostTarget()) {
      return;
    }
    this.model = target.model(LayerTreeModel);
    if (!this.model) {
      return;
    }
    this.model.addEventListener(Events.LayerTreeChanged, this.onLayerTreeUpdated, this);
    this.model.addEventListener(Events.LayerPainted, this.onLayerPainted, this);
    if (this.isShowing()) {
      this.model.enable();
      void this.update();
    }
  }
  targetRemoved(target) {
    if (!this.model || this.model.target() !== target) {
      return;
    }
    this.model.removeEventListener(Events.LayerTreeChanged, this.onLayerTreeUpdated, this);
    this.model.removeEventListener(Events.LayerPainted, this.onLayerPainted, this);
    void this.model.disable();
    this.model = null;
  }
  onLayerTreeUpdated() {
    void this.updateThrottler.schedule(this.update.bind(this));
  }
  update() {
    if (this.model) {
      this.splitWidget().showBoth();
      this.rightSplitWidget.showBoth();
      this.layerViewHost.setLayerTree(this.model.layerTree());
      const resourceModel = this.model.target().model(SDK2.ResourceTreeModel.ResourceTreeModel);
      if (resourceModel) {
        const mainFrame = resourceModel.mainFrame;
        if (mainFrame) {
          const url = mainFrame.url;
          this.element.setAttribute("test-current-url", url);
        }
      }
    }
  }
  onLayerPainted({ data: layer }) {
    if (!this.model) {
      return;
    }
    const selection = this.layerViewHost.selection();
    if (selection && selection.layer() === layer) {
      this.layerDetailsView.update();
    }
    this.layers3DView.updateLayerSnapshot(layer);
  }
  onPaintProfileRequested({ data: selection }) {
    void this.layers3DView.snapshotForSelection(selection).then((snapshotWithRect) => {
      if (!snapshotWithRect) {
        return;
      }
      this.layerBeingProfiled = selection.layer();
      if (!this.tabbedPane.hasTab(DetailsViewTabs.Profiler)) {
        this.tabbedPane.appendTab(DetailsViewTabs.Profiler, i18nString(UIStrings.profiler), this.paintProfilerView, void 0, true, true);
      }
      this.tabbedPane.selectTab(DetailsViewTabs.Profiler);
      this.paintProfilerView.profile(snapshotWithRect.snapshot);
    });
  }
  onTabClosed(event) {
    if (event.data.tabId !== DetailsViewTabs.Profiler || !this.layerBeingProfiled) {
      return;
    }
    this.paintProfilerView.reset();
    this.layers3DView.showImageForLayer(this.layerBeingProfiled, void 0);
    this.layerBeingProfiled = null;
  }
  showImage(imageURL) {
    if (this.layerBeingProfiled) {
      this.layers3DView.showImageForLayer(this.layerBeingProfiled, imageURL);
    }
  }
  onScaleChanged(event) {
    this.paintProfilerView.setScale(event.data);
  }
};
var DetailsViewTabs = {
  Details: "details",
  Profiler: "profiler"
};
export {
  LayerPaintProfilerView_exports as LayerPaintProfilerView,
  LayerTreeModel_exports as LayerTreeModel,
  LayersPanel_exports as LayersPanel
};
//# sourceMappingURL=layers.js.map
