var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/web_audio/graph_visualizer/EdgeView.js
var EdgeView_exports = {};
__export(EdgeView_exports, {
  EdgeView: () => EdgeView,
  generateEdgePortIdsByData: () => generateEdgePortIdsByData
});

// gen/front_end/panels/web_audio/graph_visualizer/NodeView.js
var NodeView_exports = {};
__export(NodeView_exports, {
  NodeLabelGenerator: () => NodeLabelGenerator,
  NodeView: () => NodeView,
  generateInputPortId: () => generateInputPortId,
  generateOutputPortId: () => generateOutputPortId,
  generateParamPortId: () => generateParamPortId,
  measureTextWidth: () => measureTextWidth
});
import * as UI from "./../../../ui/legacy/legacy.js";

// gen/front_end/panels/web_audio/graph_visualizer/GraphStyle.js
var GraphStyle_exports = {};
__export(GraphStyle_exports, {
  ArrowHeadSize: () => ArrowHeadSize,
  AudioParamRadius: () => AudioParamRadius,
  BottomPaddingWithParam: () => BottomPaddingWithParam,
  BottomPaddingWithoutParam: () => BottomPaddingWithoutParam,
  GraphMargin: () => GraphMargin,
  GraphPadding: () => GraphPadding,
  InputPortRadius: () => InputPortRadius,
  LeftMarginOfText: () => LeftMarginOfText,
  LeftSideTopPadding: () => LeftSideTopPadding,
  NodeLabelFontStyle: () => NodeLabelFontStyle,
  ParamLabelFontStyle: () => ParamLabelFontStyle,
  PortPadding: () => PortPadding,
  RightMarginOfText: () => RightMarginOfText,
  TotalInputPortHeight: () => TotalInputPortHeight,
  TotalOutputPortHeight: () => TotalOutputPortHeight,
  TotalParamPortHeight: () => TotalParamPortHeight
});
var PortPadding = 4;
var InputPortRadius = 10;
var AudioParamRadius = 5;
var LeftMarginOfText = 12;
var RightMarginOfText = 30;
var LeftSideTopPadding = 5;
var BottomPaddingWithoutParam = 6;
var BottomPaddingWithParam = 8;
var ArrowHeadSize = 12;
var GraphPadding = 20;
var GraphMargin = 20;
var TotalInputPortHeight = InputPortRadius * 2 + PortPadding;
var TotalOutputPortHeight = TotalInputPortHeight;
var TotalParamPortHeight = AudioParamRadius * 2 + PortPadding;
var NodeLabelFontStyle = "14px Segoe UI, Arial";
var ParamLabelFontStyle = "12px Segoe UI, Arial";

// gen/front_end/panels/web_audio/graph_visualizer/NodeRendererUtility.js
var NodeRendererUtility_exports = {};
__export(NodeRendererUtility_exports, {
  calculateInputPortXY: () => calculateInputPortXY,
  calculateOutputPortXY: () => calculateOutputPortXY,
  calculateParamPortXY: () => calculateParamPortXY
});
var calculateInputPortXY = (portIndex) => {
  const y = InputPortRadius + LeftSideTopPadding + portIndex * TotalInputPortHeight;
  return { x: 0, y };
};
var calculateOutputPortXY = (portIndex, nodeSize, numberOfOutputs) => {
  const { width, height } = nodeSize;
  const outputPortY = height / 2 + (2 * portIndex - numberOfOutputs + 1) * TotalOutputPortHeight / 2;
  return { x: width, y: outputPortY };
};
var calculateParamPortXY = (portIndex, offsetY) => {
  const paramPortY = offsetY + TotalParamPortHeight * (portIndex + 1) - AudioParamRadius;
  return { x: 0, y: paramPortY };
};

// gen/front_end/panels/web_audio/graph_visualizer/NodeView.js
var NodeView = class {
  id;
  type;
  numberOfInputs;
  numberOfOutputs;
  label;
  size;
  position;
  layout;
  ports;
  constructor(data, label) {
    this.id = data.nodeId;
    this.type = data.nodeType;
    this.numberOfInputs = data.numberOfInputs;
    this.numberOfOutputs = data.numberOfOutputs;
    this.label = label;
    this.size = { width: 0, height: 0 };
    this.position = null;
    this.layout = {
      inputPortSectionHeight: 0,
      outputPortSectionHeight: 0,
      maxTextLength: 0,
      totalHeight: 0
    };
    this.ports = /* @__PURE__ */ new Map();
    this.initialize(data);
  }
  initialize(data) {
    this.updateNodeLayoutAfterAddingNode(data);
    this.setupInputPorts();
    this.setupOutputPorts();
  }
  /**
   * Add an AudioParam to this node.
   * Note for @method removeParamPort: removeParamPort is not necessary because it will only happen
   * when the parent NodeView is destroyed. So there is no need to remove port individually
   * when the whole NodeView will be gone.
   */
  addParamPort(paramId, paramType) {
    const paramPorts = this.getPortsByType(
      "Param"
      /* PortTypes.PARAM */
    );
    const numberOfParams = paramPorts.length;
    const { x, y } = calculateParamPortXY(numberOfParams, this.layout.inputPortSectionHeight);
    this.addPort({
      id: generateParamPortId(this.id, paramId),
      type: "Param",
      label: paramType,
      x,
      y
    });
    this.updateNodeLayoutAfterAddingParam(numberOfParams + 1, paramType);
    this.setupOutputPorts();
  }
  getPortsByType(type) {
    const result = [];
    this.ports.forEach((port) => {
      if (port.type === type) {
        result.push(port);
      }
    });
    return result;
  }
  /**
   * Use number of inputs and outputs to compute the layout
   * for text and ports.
   * Credit: This function is mostly borrowed from Audion/
   *      `audion.entryPoints.handleNodeCreated_()`.
   *      https://github.com/google/audion/blob/master/js/entry-points/panel.js
   */
  updateNodeLayoutAfterAddingNode(data) {
    const inputPortSectionHeight = TotalInputPortHeight * Math.max(1, data.numberOfInputs) + LeftSideTopPadding;
    this.layout.inputPortSectionHeight = inputPortSectionHeight;
    this.layout.outputPortSectionHeight = TotalOutputPortHeight * data.numberOfOutputs;
    this.layout.totalHeight = Math.max(inputPortSectionHeight + BottomPaddingWithoutParam, this.layout.outputPortSectionHeight);
    const nodeLabelLength = measureTextWidth(this.label, NodeLabelFontStyle);
    this.layout.maxTextLength = Math.max(this.layout.maxTextLength, nodeLabelLength);
    this.updateNodeSize();
  }
  /**
   * After adding a param port, update the node layout based on the y value
   * and label length.
   */
  updateNodeLayoutAfterAddingParam(numberOfParams, paramType) {
    const leftSideMaxHeight = this.layout.inputPortSectionHeight + numberOfParams * TotalParamPortHeight + BottomPaddingWithParam;
    this.layout.totalHeight = Math.max(leftSideMaxHeight, this.layout.outputPortSectionHeight);
    const paramLabelLength = measureTextWidth(paramType, ParamLabelFontStyle);
    this.layout.maxTextLength = Math.max(this.layout.maxTextLength, paramLabelLength);
    this.updateNodeSize();
  }
  updateNodeSize() {
    this.size = {
      width: Math.ceil(LeftMarginOfText + this.layout.maxTextLength + RightMarginOfText),
      height: this.layout.totalHeight
    };
  }
  // Setup the properties of each input port.
  setupInputPorts() {
    for (let i = 0; i < this.numberOfInputs; i++) {
      const { x, y } = calculateInputPortXY(i);
      this.addPort({ id: generateInputPortId(this.id, i), type: "In", x, y, label: void 0 });
    }
  }
  // Setup the properties of each output port.
  setupOutputPorts() {
    for (let i = 0; i < this.numberOfOutputs; i++) {
      const portId = generateOutputPortId(this.id, i);
      const { x, y } = calculateOutputPortXY(i, this.size, this.numberOfOutputs);
      if (this.ports.has(portId)) {
        const port = this.ports.get(portId);
        if (!port) {
          throw new Error(`Unable to find port with id ${portId}`);
        }
        port.x = x;
        port.y = y;
      } else {
        this.addPort({ id: portId, type: "Out", x, y, label: void 0 });
      }
    }
  }
  addPort(port) {
    this.ports.set(port.id, port);
  }
};
var generateInputPortId = (nodeId, inputIndex) => {
  return `${nodeId}-input-${inputIndex || 0}`;
};
var generateOutputPortId = (nodeId, outputIndex) => {
  return `${nodeId}-output-${outputIndex || 0}`;
};
var generateParamPortId = (nodeId, paramId) => {
  return `${nodeId}-param-${paramId}`;
};
var NodeLabelGenerator = class {
  totalNumberOfNodes;
  constructor() {
    this.totalNumberOfNodes = 0;
  }
  /**
   * Generates the label for a node of a graph.
   */
  generateLabel(nodeType) {
    if (nodeType.endsWith("Node")) {
      nodeType = nodeType.slice(0, nodeType.length - 4);
    }
    this.totalNumberOfNodes += 1;
    const label = `${nodeType} ${this.totalNumberOfNodes}`;
    return label;
  }
};
var contextForFontTextMeasuring;
var measureTextWidth = (text, fontStyle) => {
  if (!contextForFontTextMeasuring) {
    const context2 = document.createElement("canvas").getContext("2d");
    if (!context2) {
      throw new Error("Unable to create canvas context.");
    }
    contextForFontTextMeasuring = context2;
  }
  const context = contextForFontTextMeasuring;
  context.save();
  if (fontStyle) {
    context.font = fontStyle;
  }
  const width = UI.UIUtils.measureTextWidth(context, text);
  context.restore();
  return width;
};

// gen/front_end/panels/web_audio/graph_visualizer/EdgeView.js
var EdgeView = class {
  id;
  type;
  sourceId;
  destinationId;
  sourcePortId;
  destinationPortId;
  constructor(data, type) {
    const edgePortsIds = generateEdgePortIdsByData(data, type);
    if (!edgePortsIds) {
      throw new Error("Unable to generate edge port IDs");
    }
    const { edgeId, sourcePortId, destinationPortId } = edgePortsIds;
    this.id = edgeId;
    this.type = type;
    this.sourceId = data.sourceId;
    this.destinationId = data.destinationId;
    this.sourcePortId = sourcePortId;
    this.destinationPortId = destinationPortId;
  }
};
var generateEdgePortIdsByData = (data, type) => {
  if (!data.sourceId || !data.destinationId) {
    console.error(`Undefined node message: ${JSON.stringify(data)}`);
    return null;
  }
  const sourcePortId = generateOutputPortId(data.sourceId, data.sourceOutputIndex);
  const destinationPortId = getDestinationPortId(data, type);
  return {
    edgeId: `${sourcePortId}->${destinationPortId}`,
    sourcePortId,
    destinationPortId
  };
  function getDestinationPortId(data2, type2) {
    if (type2 === "NodeToNode") {
      const portData = data2;
      return generateInputPortId(data2.destinationId, portData.destinationInputIndex);
    }
    if (type2 === "NodeToParam") {
      const portData = data2;
      return generateParamPortId(data2.destinationId, portData.destinationParamId);
    }
    console.error(`Unknown edge type: ${type2}`);
    return "";
  }
};

// gen/front_end/panels/web_audio/graph_visualizer/GraphManager.js
var GraphManager_exports = {};
__export(GraphManager_exports, {
  GraphManager: () => GraphManager
});

// gen/front_end/panels/web_audio/graph_visualizer/GraphView.js
var GraphView_exports = {};
__export(GraphView_exports, {
  GraphView: () => GraphView
});
import * as Common from "./../../../core/common/common.js";
import * as Platform from "./../../../core/platform/platform.js";
var GraphView = class extends Common.ObjectWrapper.ObjectWrapper {
  contextId;
  nodes = /* @__PURE__ */ new Map();
  edges = /* @__PURE__ */ new Map();
  /**
   * For each node ID, keep a set of all out-bound edge IDs.
   */
  outboundEdgeMap = new Platform.MapUtilities.Multimap();
  /**
   * For each node ID, keep a set of all in-bound edge IDs.
   */
  inboundEdgeMap = new Platform.MapUtilities.Multimap();
  /**
   * Use concise node label to replace the long UUID.
   * Each graph has its own label generator so that the label starts from 0.
   */
  nodeLabelGenerator = new NodeLabelGenerator();
  /**
   * For each param ID, save its corresponding node Id.
   */
  paramIdToNodeIdMap = /* @__PURE__ */ new Map();
  constructor(contextId) {
    super();
    this.contextId = contextId;
  }
  /**
   * Add a node to the graph.
   */
  addNode(data) {
    const label = this.nodeLabelGenerator.generateLabel(data.nodeType);
    const node = new NodeView(data, label);
    this.nodes.set(data.nodeId, node);
    this.notifyShouldRedraw();
  }
  /**
   * Remove a node by id and all related edges.
   */
  removeNode(nodeId) {
    this.outboundEdgeMap.get(nodeId).forEach((edgeId) => this.removeEdge(edgeId));
    this.inboundEdgeMap.get(nodeId).forEach((edgeId) => this.removeEdge(edgeId));
    this.nodes.delete(nodeId);
    this.notifyShouldRedraw();
  }
  /**
   * Add a param to the node.
   */
  addParam(data) {
    const node = this.getNodeById(data.nodeId);
    if (!node) {
      console.error("AudioNode should be added before AudioParam");
      return;
    }
    node.addParamPort(data.paramId, data.paramType);
    this.paramIdToNodeIdMap.set(data.paramId, data.nodeId);
    this.notifyShouldRedraw();
  }
  /**
   * Remove a param.
   */
  removeParam(paramId) {
    this.paramIdToNodeIdMap.delete(paramId);
  }
  /**
   * Add a Node-to-Node connection to the graph.
   */
  addNodeToNodeConnection(edgeData) {
    const edge = new EdgeView(
      edgeData,
      "NodeToNode"
      /* EdgeTypes.NODE_TO_NODE */
    );
    this.addEdge(edge);
  }
  /**
   * Remove a Node-to-Node connection from the graph.
   */
  removeNodeToNodeConnection(edgeData) {
    if (edgeData.destinationId) {
      const edgePortIds = generateEdgePortIdsByData(
        edgeData,
        "NodeToNode"
        /* EdgeTypes.NODE_TO_NODE */
      );
      if (!edgePortIds) {
        throw new Error("Unable to generate edge port IDs");
      }
      const { edgeId } = edgePortIds;
      this.removeEdge(edgeId);
    } else {
      this.outboundEdgeMap.get(edgeData.sourceId).forEach((edgeId) => this.removeEdge(edgeId));
    }
  }
  /**
   * Add a Node-to-Param connection to the graph.
   */
  addNodeToParamConnection(edgeData) {
    const edge = new EdgeView(
      edgeData,
      "NodeToParam"
      /* EdgeTypes.NODE_TO_PARAM */
    );
    this.addEdge(edge);
  }
  /**
   * Remove a Node-to-Param connection from the graph.
   */
  removeNodeToParamConnection(edgeData) {
    const edgePortIds = generateEdgePortIdsByData(
      edgeData,
      "NodeToParam"
      /* EdgeTypes.NODE_TO_PARAM */
    );
    if (!edgePortIds) {
      throw new Error("Unable to generate edge port IDs");
    }
    const { edgeId } = edgePortIds;
    this.removeEdge(edgeId);
  }
  getNodeById(nodeId) {
    return this.nodes.get(nodeId) || null;
  }
  getNodes() {
    return this.nodes;
  }
  getEdges() {
    return this.edges;
  }
  getNodeIdByParamId(paramId) {
    return this.paramIdToNodeIdMap.get(paramId) || null;
  }
  /**
   * Add an edge to the graph.
   */
  addEdge(edge) {
    const sourceId = edge.sourceId;
    if (this.outboundEdgeMap.hasValue(sourceId, edge.id)) {
      return;
    }
    this.edges.set(edge.id, edge);
    this.outboundEdgeMap.set(sourceId, edge.id);
    this.inboundEdgeMap.set(edge.destinationId, edge.id);
    this.notifyShouldRedraw();
  }
  /**
   * Given an edge id, remove the edge from the graph.
   * Also remove the edge from inbound and outbound edge maps.
   */
  removeEdge(edgeId) {
    const edge = this.edges.get(edgeId);
    if (!edge) {
      return;
    }
    this.outboundEdgeMap.delete(edge.sourceId, edgeId);
    this.inboundEdgeMap.delete(edge.destinationId, edgeId);
    this.edges.delete(edgeId);
    this.notifyShouldRedraw();
  }
  notifyShouldRedraw() {
    this.dispatchEventToListeners("ShouldRedraw", this);
  }
};

// gen/front_end/panels/web_audio/graph_visualizer/GraphManager.js
var GraphManager = class {
  graphMapByContextId = /* @__PURE__ */ new Map();
  createContext(contextId) {
    const graph = new GraphView(contextId);
    this.graphMapByContextId.set(contextId, graph);
  }
  destroyContext(contextId) {
    if (!this.graphMapByContextId.has(contextId)) {
      return;
    }
    const graph = this.graphMapByContextId.get(contextId);
    if (!graph) {
      return;
    }
    this.graphMapByContextId.delete(contextId);
  }
  hasContext(contextId) {
    return this.graphMapByContextId.has(contextId);
  }
  clearGraphs() {
    this.graphMapByContextId.clear();
  }
  /**
   * Get graph by contextId.
   * If the user starts listening for WebAudio events after the page has been running a context for awhile,
   * the graph might be undefined.
   */
  getGraph(contextId) {
    return this.graphMapByContextId.get(contextId) || null;
  }
};
export {
  EdgeView_exports as EdgeView,
  GraphManager_exports as GraphManager,
  GraphStyle_exports as GraphStyle,
  GraphView_exports as GraphView,
  NodeRendererUtility_exports as NodeRendererUtility,
  NodeView_exports as NodeView
};
//# sourceMappingURL=graph_visualizer.js.map
