var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/screencast/InputModel.js
var InputModel_exports = {};
__export(InputModel_exports, {
  InputModel: () => InputModel
});
import * as SDK from "./../../core/sdk/sdk.js";
var BUTTONS = [
  "left",
  "middle",
  "right",
  "back",
  "forward"
];
var MOUSE_EVENT_TYPES = {
  mousedown: "mousePressed",
  mouseup: "mouseReleased",
  mousemove: "mouseMoved"
};
var InputModel = class extends SDK.SDKModel.SDKModel {
  inputAgent;
  activeMouseOffsetTop;
  constructor(target) {
    super(target);
    this.inputAgent = target.inputAgent();
    this.activeMouseOffsetTop = null;
  }
  emitKeyEvent(event) {
    let type;
    switch (event.type) {
      case "keydown":
        type = "keyDown";
        break;
      case "keyup":
        type = "keyUp";
        break;
      case "keypress":
        type = "char";
        break;
      default:
        return;
    }
    const text = event.type === "keypress" ? String.fromCharCode(event.charCode) : void 0;
    void this.inputAgent.invoke_dispatchKeyEvent({
      type,
      modifiers: this.modifiersForEvent(event),
      text,
      unmodifiedText: text ? text.toLowerCase() : void 0,
      keyIdentifier: event.keyIdentifier,
      code: event.code,
      key: event.key,
      windowsVirtualKeyCode: event.keyCode,
      nativeVirtualKeyCode: event.keyCode,
      autoRepeat: event.repeat,
      isKeypad: event.location === 3,
      isSystemKey: false,
      location: event.location !== 3 ? event.location : void 0
    });
  }
  emitMouseEvent(event, offsetTop, zoom) {
    if (!(event.type in MOUSE_EVENT_TYPES)) {
      return;
    }
    if (event.type === "mousedown" || this.activeMouseOffsetTop === null) {
      this.activeMouseOffsetTop = offsetTop;
    }
    void this.inputAgent.invoke_dispatchMouseEvent({
      type: MOUSE_EVENT_TYPES[event.type],
      x: Math.round(event.offsetX / zoom),
      y: Math.round(event.offsetY / zoom - this.activeMouseOffsetTop),
      modifiers: this.modifiersForEvent(event),
      button: BUTTONS[event.button],
      clickCount: event.detail
    });
    if (event.type === "mouseup") {
      this.activeMouseOffsetTop = null;
    }
  }
  emitWheelEvent(event, offsetTop, zoom) {
    if (this.activeMouseOffsetTop === null) {
      this.activeMouseOffsetTop = offsetTop;
    }
    void this.inputAgent.invoke_dispatchMouseEvent({
      type: "mouseWheel",
      x: Math.round(event.offsetX / zoom),
      y: Math.round(event.offsetY / zoom - this.activeMouseOffsetTop),
      modifiers: this.modifiersForEvent(event),
      button: BUTTONS[event.button],
      clickCount: event.detail,
      deltaX: event.deltaX / zoom,
      deltaY: event.deltaY / zoom
    });
  }
  modifiersForEvent(event) {
    return Number(event.getModifierState("Alt")) | Number(event.getModifierState("Control")) << 1 | Number(event.getModifierState("Meta")) << 2 | Number(event.getModifierState("Shift")) << 3;
  }
};
SDK.SDKModel.SDKModel.register(InputModel, {
  capabilities: 1024,
  autostart: false
});

// gen/front_end/panels/screencast/ScreencastApp.js
var ScreencastApp_exports = {};
__export(ScreencastApp_exports, {
  ScreencastApp: () => ScreencastApp,
  ScreencastAppProvider: () => ScreencastAppProvider,
  ToolbarButtonProvider: () => ToolbarButtonProvider
});
import * as Common2 from "./../../core/common/common.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as SDK3 from "./../../core/sdk/sdk.js";
import * as UI2 from "./../../ui/legacy/legacy.js";

// gen/front_end/panels/screencast/ScreencastView.js
var ScreencastView_exports = {};
__export(ScreencastView_exports, {
  BORDERS_SIZE: () => BORDERS_SIZE,
  HTTP_REGEX: () => HTTP_REGEX,
  NAVBAR_HEIGHT: () => NAVBAR_HEIGHT,
  ProgressTracker: () => ProgressTracker,
  SCHEME_REGEX: () => SCHEME_REGEX,
  ScreencastView: () => ScreencastView
});
import * as Common from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as IconButton from "./../../ui/components/icon_button/icon_button.js";
import * as UI from "./../../ui/legacy/legacy.js";

// gen/front_end/panels/screencast/screencastView.css.js
var screencastView_css_default = `/*
 * Copyright 2013 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.screencast {
  overflow: hidden;
}

.screencast-navigation {
  flex-direction: row;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 1px;
  border-bottom: 1px solid var(--sys-color-divider);
  background-origin: padding-box;
  background-clip: padding-box;
}

.screencast-navigation button {
  border-width: 0;
  padding: 5px;
  width: 28px;
  height: 26px;
  background: none;
}

.screencast-navigation button devtools-icon {
  width: 100%;
  height: 100%;
}

.screencast-navigation button[disabled].navigation {
  opacity: 50%;
}

.screencast-navigation input {
  flex: 1;
  margin: 2px;
  max-height: 19px;
}

.screencast-navigation .progress {
  background-color: var(--sys-color-primary-bright);
  height: 3px;
  left: 0;
  position: absolute;
  top: 100%;  /* Align with the bottom edge of the parent. */
  width: 0;
  z-index: 2;  /* Above .screencast-glasspane. */
}

.screencast-viewport {
  display: flex;
  border: 1px solid var(--sys-color-divider);
  border-radius: 20px;
  flex: none;
  padding: 20px;
  margin: auto;
  background-color: var(--sys-color-surface-variant);
}

.screencast-canvas-container {
  flex: auto;
  display: flex;
  border: 1px solid var(--sys-color-divider);
  position: relative;
}

.screencast-canvas-container.touchable {
  /* stylelint-disable-next-line custom-property-pattern */
  cursor: image-set(var(--image-file-touchCursor) 1x, var(--image-file-touchCursor_2x) 2x), default;
}

.screencast canvas {
  flex: auto;
  position: relative;
}

.screencast-element-title {
  position: absolute;
  z-index: 10;
}

.screencast-tag-name {
  color: var(--sys-color-token-tag);
}

.screencast-attribute {
  color: var(--sys-color-token-attribute);
}

.screencast-dimension {
  /* Keep this in sync with tool_highlight.css (.dimensions) */
  color: var(--sys-color-outline);
}

.screencast-glasspane {
  background-color: var(--color-background-opacity-80);
  font-size: 30px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

/*# sourceURL=${import.meta.resolve("./screencastView.css")} */`;

// gen/front_end/panels/screencast/ScreencastView.js
var UIStrings = {
  /**
   * @description Accessible alt text for the screencast canvas rendering of the debug target webpage
   */
  screencastViewOfDebugTarget: "Screencast view of debug target",
  /**
   * @description Glass pane element text content in Screencast View of the Remote Devices tab when toggling screencast
   */
  theTabIsInactive: "The tab is inactive",
  /**
   * @description Glass pane element text content in Screencast View of the Remote Devices tab when toggling screencast
   */
  profilingInProgress: "Profiling in progress",
  /**
   * @description Accessible text for the screencast back button
   */
  back: "back",
  /**
   * @description Accessible text for the screencast forward button
   */
  forward: "forward",
  /**
   * @description Accessible text for the screencast reload button
   */
  reload: "reload",
  /**
   * @description Accessible text for the address bar in screencast view
   */
  addressBar: "Address bar",
  /**
   * @description Accessible text for the touch emulation button.
   */
  touchInput: "Use touch",
  /**
   * @description Accessible text for the mouse emulation button.
   */
  mouseInput: "Use mouse"
};
var str_ = i18n.i18n.registerUIStrings("panels/screencast/ScreencastView.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var ScreencastView = class extends UI.Widget.VBox {
  screenCaptureModel;
  domModel;
  overlayModel;
  resourceTreeModel;
  networkManager;
  inputModel;
  shortcuts;
  scrollOffsetX;
  scrollOffsetY;
  screenZoom;
  screenOffsetTop;
  pageScaleFactor;
  imageElement;
  viewportElement;
  glassPaneElement;
  canvasElement;
  titleElement;
  context;
  imageZoom;
  tagNameElement;
  attributeElement;
  nodeWidthElement;
  nodeHeightElement;
  model;
  highlightConfig;
  navigationUrl;
  navigationBack;
  navigationForward;
  canvasContainerElement;
  checkerboardPattern;
  targetInactive;
  deferredCasting;
  highlightNode;
  config;
  node;
  inspectModeConfig;
  navigationBar;
  navigationReload;
  navigationProgressBar;
  touchInputToggle;
  mouseInputToggle;
  touchInputToggleIcon;
  mouseInputToggleIcon;
  historyIndex;
  historyEntries;
  isCasting = false;
  screencastOperationId;
  constructor(screenCaptureModel) {
    super();
    this.registerRequiredCSS(screencastView_css_default);
    this.screenCaptureModel = screenCaptureModel;
    this.domModel = screenCaptureModel.target().model(SDK2.DOMModel.DOMModel);
    this.overlayModel = screenCaptureModel.target().model(SDK2.OverlayModel.OverlayModel);
    this.resourceTreeModel = screenCaptureModel.target().model(SDK2.ResourceTreeModel.ResourceTreeModel);
    this.networkManager = screenCaptureModel.target().model(SDK2.NetworkManager.NetworkManager);
    this.inputModel = screenCaptureModel.target().model(InputModel);
    this.setMinimumSize(150, 150);
    this.shortcuts = {};
    this.scrollOffsetX = 0;
    this.scrollOffsetY = 0;
    this.screenZoom = 1;
    this.screenOffsetTop = 0;
    this.pageScaleFactor = 1;
    this.imageZoom = 1;
  }
  initialize() {
    this.element.classList.add("screencast");
    this.createNavigationBar();
    this.viewportElement = this.element.createChild("div", "screencast-viewport hidden");
    this.canvasContainerElement = this.viewportElement.createChild("div", "screencast-canvas-container");
    this.glassPaneElement = this.canvasContainerElement.createChild("div", "screencast-glasspane fill hidden");
    this.canvasElement = this.canvasContainerElement.createChild("canvas");
    UI.ARIAUtils.setLabel(this.canvasElement, i18nString(UIStrings.screencastViewOfDebugTarget));
    this.canvasElement.tabIndex = 0;
    this.canvasElement.addEventListener("mousedown", this.handleMouseEvent.bind(this), false);
    this.canvasElement.addEventListener("mouseup", this.handleMouseEvent.bind(this), false);
    this.canvasElement.addEventListener("mousemove", this.handleMouseEvent.bind(this), false);
    this.canvasElement.addEventListener("wheel", this.handleWheelEvent.bind(this), false);
    this.canvasElement.addEventListener("click", this.handleMouseEvent.bind(this), false);
    this.canvasElement.addEventListener("contextmenu", this.handleContextMenuEvent.bind(this), false);
    this.canvasElement.addEventListener("keydown", this.handleKeyEvent.bind(this), false);
    this.canvasElement.addEventListener("keyup", this.handleKeyEvent.bind(this), false);
    this.canvasElement.addEventListener("keypress", this.handleKeyEvent.bind(this), false);
    this.canvasElement.addEventListener("blur", this.handleBlurEvent.bind(this), false);
    this.titleElement = this.canvasContainerElement.createChild("div", "screencast-element-title monospace hidden");
    this.tagNameElement = this.titleElement.createChild("span", "screencast-tag-name");
    this.attributeElement = this.titleElement.createChild("span", "screencast-attribute");
    UI.UIUtils.createTextChild(this.titleElement, " ");
    const dimension = this.titleElement.createChild("span", "screencast-dimension");
    this.nodeWidthElement = dimension.createChild("span");
    UI.UIUtils.createTextChild(dimension, " \xD7 ");
    this.nodeHeightElement = dimension.createChild("span");
    this.titleElement.style.top = "0";
    this.titleElement.style.left = "0";
    this.imageElement = new Image();
    this.context = this.canvasElement.getContext("2d");
    this.checkerboardPattern = this.createCheckerboardPattern(this.context);
    this.shortcuts[UI.KeyboardShortcut.KeyboardShortcut.makeKey("l", UI.KeyboardShortcut.Modifiers.Ctrl.value)] = this.focusNavigationBar.bind(this);
    SDK2.TargetManager.TargetManager.instance().addEventListener("SuspendStateChanged", this.onSuspendStateChange, this);
    this.updateGlasspane();
  }
  willHide() {
    super.willHide();
    this.stopCasting();
  }
  async startCasting() {
    if (SDK2.TargetManager.TargetManager.instance().allTargetsSuspended()) {
      return;
    }
    if (this.isCasting) {
      return;
    }
    this.isCasting = true;
    const maxImageDimension = 2048;
    const dimensions = this.viewportDimensions();
    if (dimensions.width < 0 || dimensions.height < 0) {
      this.isCasting = false;
      return;
    }
    dimensions.width *= window.devicePixelRatio;
    dimensions.height *= window.devicePixelRatio;
    this.screencastOperationId = await this.screenCaptureModel.startScreencast("jpeg", 80, Math.floor(Math.min(maxImageDimension, dimensions.width)), Math.floor(Math.min(maxImageDimension, dimensions.height)), void 0, this.screencastFrame.bind(this), this.screencastVisibilityChanged.bind(this));
    if (this.overlayModel) {
      this.overlayModel.setHighlighter(this);
    }
  }
  stopCasting() {
    if (!this.screencastOperationId) {
      return;
    }
    this.screenCaptureModel.stopScreencast(this.screencastOperationId);
    this.screencastOperationId = void 0;
    this.isCasting = false;
    for (const emulationModel of SDK2.TargetManager.TargetManager.instance().models(SDK2.EmulationModel.EmulationModel)) {
      void emulationModel.overrideEmulateTouch(false);
    }
    if (this.overlayModel) {
      this.overlayModel.setHighlighter(null);
    }
  }
  screencastFrame(base64Data, metadata) {
    this.imageElement.onload = () => {
      this.pageScaleFactor = metadata.pageScaleFactor;
      this.screenOffsetTop = metadata.offsetTop;
      this.scrollOffsetX = metadata.scrollOffsetX;
      this.scrollOffsetY = metadata.scrollOffsetY;
      const deviceSizeRatio = metadata.deviceHeight / metadata.deviceWidth;
      const dimensionsCSS = this.viewportDimensions();
      this.imageZoom = Math.min(dimensionsCSS.width / this.imageElement.naturalWidth, dimensionsCSS.height / (this.imageElement.naturalWidth * deviceSizeRatio));
      this.viewportElement.classList.remove("hidden");
      const bordersSize = BORDERS_SIZE;
      if (this.imageZoom < 1.01 / window.devicePixelRatio) {
        this.imageZoom = 1 / window.devicePixelRatio;
      }
      this.screenZoom = this.imageElement.naturalWidth * this.imageZoom / metadata.deviceWidth;
      this.viewportElement.style.width = metadata.deviceWidth * this.screenZoom + bordersSize + "px";
      this.viewportElement.style.height = metadata.deviceHeight * this.screenZoom + bordersSize + "px";
      const data = this.highlightNode ? { node: this.highlightNode, selectorList: void 0 } : { clear: true };
      void this.updateHighlightInOverlayAndRepaint(data, this.highlightConfig);
    };
    this.imageElement.src = "data:image/jpg;base64," + base64Data;
  }
  isGlassPaneActive() {
    return !this.glassPaneElement.classList.contains("hidden");
  }
  screencastVisibilityChanged(visible) {
    this.targetInactive = !visible;
    this.updateGlasspane();
  }
  onSuspendStateChange() {
    if (SDK2.TargetManager.TargetManager.instance().allTargetsSuspended()) {
      this.stopCasting();
    } else {
      void this.startCasting();
    }
    this.updateGlasspane();
  }
  updateGlasspane() {
    if (this.targetInactive) {
      this.glassPaneElement.textContent = i18nString(UIStrings.theTabIsInactive);
      this.glassPaneElement.classList.remove("hidden");
    } else if (SDK2.TargetManager.TargetManager.instance().allTargetsSuspended()) {
      this.glassPaneElement.textContent = i18nString(UIStrings.profilingInProgress);
      this.glassPaneElement.classList.remove("hidden");
    } else {
      this.glassPaneElement.classList.add("hidden");
    }
  }
  async handleMouseEvent(event) {
    if (this.isGlassPaneActive()) {
      event.consume();
      return;
    }
    if (!this.pageScaleFactor || !this.domModel) {
      return;
    }
    if (!this.inspectModeConfig) {
      if (this.inputModel) {
        this.inputModel.emitMouseEvent(event, this.screenOffsetTop, this.screenZoom);
      }
      event.preventDefault();
      if (event.type === "mousedown") {
        this.canvasElement.focus();
      }
      return;
    }
    const position = this.convertIntoScreenSpace(event);
    const node = await this.domModel.nodeForLocation(Math.floor(position.x / this.pageScaleFactor + this.scrollOffsetX), Math.floor(position.y / this.pageScaleFactor + this.scrollOffsetY), Common.Settings.Settings.instance().moduleSetting("show-ua-shadow-dom").get());
    if (!node) {
      return;
    }
    if (event.type === "mousemove") {
      void this.updateHighlightInOverlayAndRepaint({ node, selectorList: void 0 }, this.inspectModeConfig);
      this.domModel.overlayModel().nodeHighlightRequested({ nodeId: node.id });
    } else if (event.type === "click") {
      this.domModel.overlayModel().inspectNodeRequested({ backendNodeId: node.backendNodeId() });
    }
  }
  async handleWheelEvent(event) {
    if (this.isGlassPaneActive()) {
      event.consume();
      return;
    }
    if (!this.pageScaleFactor || !this.domModel) {
      return;
    }
    if (this.inputModel) {
      this.inputModel.emitWheelEvent(event, this.screenOffsetTop, this.screenZoom);
    }
    event.preventDefault();
  }
  handleKeyEvent(event) {
    if (this.isGlassPaneActive()) {
      event.consume();
      return;
    }
    const shortcutKey = UI.KeyboardShortcut.KeyboardShortcut.makeKeyFromEvent(event);
    const handler = this.shortcuts[shortcutKey];
    if (handler?.(event)) {
      event.consume();
      return;
    }
    if (this.inputModel) {
      this.inputModel.emitKeyEvent(event);
    }
    event.consume();
    this.canvasElement.focus();
  }
  handleBlurEvent() {
    if (this.inputModel && this.mouseInputToggle?.disabled) {
      const event = new MouseEvent("mouseup");
      this.inputModel.emitMouseEvent(event, this.screenOffsetTop, this.screenZoom);
    }
  }
  handleContextMenuEvent(event) {
    event.consume(true);
  }
  convertIntoScreenSpace(event) {
    return {
      x: Math.round(event.offsetX / this.screenZoom),
      y: Math.round(event.offsetY / this.screenZoom - this.screenOffsetTop)
    };
  }
  onResize() {
    if (this.deferredCasting) {
      clearTimeout(this.deferredCasting);
      delete this.deferredCasting;
    }
    this.stopCasting();
    this.deferredCasting = window.setTimeout(this.startCasting.bind(this), 100);
  }
  highlightInOverlay(data, config) {
    void this.updateHighlightInOverlayAndRepaint(data, config);
  }
  async updateHighlightInOverlayAndRepaint(data, config) {
    let node = null;
    if ("node" in data) {
      node = data.node;
    }
    if (!node && "deferredNode" in data) {
      node = await data.deferredNode.resolvePromise();
    }
    if (!node && "object" in data) {
      const domModel = data.object.runtimeModel().target().model(SDK2.DOMModel.DOMModel);
      if (domModel) {
        node = await domModel.pushObjectAsNodeToFrontend(data.object);
      }
    }
    this.highlightNode = node;
    this.highlightConfig = config;
    if (!node) {
      this.model = null;
      this.config = null;
      this.node = null;
      this.titleElement.classList.add("hidden");
      this.repaint();
      return;
    }
    this.node = node;
    void node.boxModel().then((model) => {
      if (!model || !this.pageScaleFactor) {
        this.repaint();
        return;
      }
      this.model = this.scaleModel(model);
      this.config = config;
      this.repaint();
    });
  }
  scaleModel(model) {
    function scaleQuad(quad) {
      for (let i = 0; i < quad.length; i += 2) {
        quad[i] = quad[i] * this.pageScaleFactor * this.screenZoom;
        quad[i + 1] = (quad[i + 1] * this.pageScaleFactor + this.screenOffsetTop) * this.screenZoom;
      }
    }
    scaleQuad.call(this, model.content);
    scaleQuad.call(this, model.padding);
    scaleQuad.call(this, model.border);
    scaleQuad.call(this, model.margin);
    return model;
  }
  repaint() {
    const model = this.model;
    const config = this.config;
    const canvasWidth = this.canvasElement.getBoundingClientRect().width;
    const canvasHeight = this.canvasElement.getBoundingClientRect().height;
    this.canvasElement.width = window.devicePixelRatio * canvasWidth;
    this.canvasElement.height = window.devicePixelRatio * canvasHeight;
    this.context.save();
    this.context.scale(window.devicePixelRatio, window.devicePixelRatio);
    this.context.save();
    if (this.checkerboardPattern) {
      this.context.fillStyle = this.checkerboardPattern;
    }
    this.context.fillRect(0, 0, canvasWidth, this.screenOffsetTop * this.screenZoom);
    this.context.fillRect(0, this.screenOffsetTop * this.screenZoom + this.imageElement.naturalHeight * this.imageZoom, canvasWidth, canvasHeight);
    this.context.restore();
    if (model && config) {
      this.context.save();
      const quads = [];
      const isTransparent = (color) => Boolean(color.a && color.a === 0);
      if (model.content && config.contentColor && !isTransparent(config.contentColor)) {
        quads.push({ quad: model.content, color: config.contentColor });
      }
      if (model.padding && config.paddingColor && !isTransparent(config.paddingColor)) {
        quads.push({ quad: model.padding, color: config.paddingColor });
      }
      if (model.border && config.borderColor && !isTransparent(config.borderColor)) {
        quads.push({ quad: model.border, color: config.borderColor });
      }
      if (model.margin && config.marginColor && !isTransparent(config.marginColor)) {
        quads.push({ quad: model.margin, color: config.marginColor });
      }
      for (let i = quads.length - 1; i > 0; --i) {
        this.drawOutlinedQuadWithClip(quads[i].quad, quads[i - 1].quad, quads[i].color);
      }
      if (quads.length > 0) {
        this.drawOutlinedQuad(quads[0].quad, quads[0].color);
      }
      this.context.restore();
      this.drawElementTitle();
      this.context.globalCompositeOperation = "destination-over";
    }
    this.context.drawImage(this.imageElement, 0, this.screenOffsetTop * this.screenZoom, this.imageElement.naturalWidth * this.imageZoom, this.imageElement.naturalHeight * this.imageZoom);
    this.context.restore();
  }
  cssColor(color) {
    if (!color) {
      return "transparent";
    }
    return Common.Color.Legacy.fromRGBA([color.r, color.g, color.b, color.a !== void 0 ? color.a : 1]).asString(
      "rgba"
      /* Common.Color.Format.RGBA */
    ) || "";
  }
  quadToPath(quad) {
    this.context.beginPath();
    this.context.moveTo(quad[0], quad[1]);
    this.context.lineTo(quad[2], quad[3]);
    this.context.lineTo(quad[4], quad[5]);
    this.context.lineTo(quad[6], quad[7]);
    this.context.closePath();
    return this.context;
  }
  drawOutlinedQuad(quad, fillColor) {
    this.context.save();
    this.context.lineWidth = 2;
    this.quadToPath(quad).clip();
    this.context.fillStyle = this.cssColor(fillColor);
    this.context.fill();
    this.context.restore();
  }
  drawOutlinedQuadWithClip(quad, clipQuad, fillColor) {
    this.context.fillStyle = this.cssColor(fillColor);
    this.context.save();
    this.context.lineWidth = 0;
    this.quadToPath(quad).fill();
    this.context.globalCompositeOperation = "destination-out";
    this.context.fillStyle = "red";
    this.quadToPath(clipQuad).fill();
    this.context.restore();
  }
  drawElementTitle() {
    if (!this.node) {
      return;
    }
    const canvasWidth = this.canvasElement.getBoundingClientRect().width;
    const canvasHeight = this.canvasElement.getBoundingClientRect().height;
    const lowerCaseName = this.node.localName() || this.node.nodeName().toLowerCase();
    this.tagNameElement.textContent = lowerCaseName;
    this.attributeElement.textContent = getAttributesForElementTitle(this.node);
    this.nodeWidthElement.textContent = String(this.model ? this.model.width : 0);
    this.nodeHeightElement.textContent = String(this.model ? this.model.height : 0);
    this.titleElement.classList.remove("hidden");
    const titleWidth = this.titleElement.offsetWidth + 6;
    const titleHeight = this.titleElement.offsetHeight + 4;
    const anchorTop = this.model ? this.model.margin[1] : 0;
    const anchorBottom = this.model ? this.model.margin[7] : 0;
    const arrowHeight = 7;
    let renderArrowUp = false;
    let renderArrowDown = false;
    let boxX = Math.max(2, this.model ? this.model.margin[0] : 0);
    if (boxX + titleWidth > canvasWidth) {
      boxX = canvasWidth - titleWidth - 2;
    }
    let boxY;
    if (anchorTop > canvasHeight) {
      boxY = canvasHeight - titleHeight - arrowHeight;
      renderArrowDown = true;
    } else if (anchorBottom < 0) {
      boxY = arrowHeight;
      renderArrowUp = true;
    } else if (anchorBottom + titleHeight + arrowHeight < canvasHeight) {
      boxY = anchorBottom + arrowHeight - 4;
      renderArrowUp = true;
    } else if (anchorTop - titleHeight - arrowHeight > 0) {
      boxY = anchorTop - titleHeight - arrowHeight + 3;
      renderArrowDown = true;
    } else {
      boxY = arrowHeight;
    }
    this.context.save();
    this.context.translate(0.5, 0.5);
    this.context.beginPath();
    this.context.moveTo(boxX, boxY);
    if (renderArrowUp) {
      this.context.lineTo(boxX + 2 * arrowHeight, boxY);
      this.context.lineTo(boxX + 3 * arrowHeight, boxY - arrowHeight);
      this.context.lineTo(boxX + 4 * arrowHeight, boxY);
    }
    this.context.lineTo(boxX + titleWidth, boxY);
    this.context.lineTo(boxX + titleWidth, boxY + titleHeight);
    if (renderArrowDown) {
      this.context.lineTo(boxX + 4 * arrowHeight, boxY + titleHeight);
      this.context.lineTo(boxX + 3 * arrowHeight, boxY + titleHeight + arrowHeight);
      this.context.lineTo(boxX + 2 * arrowHeight, boxY + titleHeight);
    }
    this.context.lineTo(boxX, boxY + titleHeight);
    this.context.closePath();
    this.context.fillStyle = "var(--sys-color-yellow-container)";
    this.context.fill();
    this.context.strokeStyle = "var(--sys-color-outline)";
    this.context.stroke();
    this.context.restore();
    this.titleElement.style.top = boxY + 3 + "px";
    this.titleElement.style.left = boxX + 3 + "px";
  }
  viewportDimensions() {
    const gutterSize = 30;
    const bordersSize = BORDERS_SIZE;
    const width = this.element.offsetWidth - bordersSize - gutterSize;
    const height = this.element.offsetHeight - bordersSize - gutterSize - NAVBAR_HEIGHT;
    return { width, height };
  }
  setInspectMode(mode, config) {
    this.inspectModeConfig = mode !== "none" ? config : null;
    return Promise.resolve();
  }
  highlightFrame(_frameId) {
  }
  createCheckerboardPattern(context) {
    const pattern = document.createElement("canvas");
    const size = 32;
    pattern.width = size * 2;
    pattern.height = size * 2;
    const pctx = pattern.getContext("2d", { willReadFrequently: true });
    pctx.fillStyle = "var(--sys-color-neutral-outline)";
    pctx.fillRect(0, 0, size * 2, size * 2);
    pctx.fillStyle = "var(--sys-color-surface-variant)";
    pctx.fillRect(0, 0, size, size);
    pctx.fillRect(size, size, size, size);
    return context.createPattern(pattern, "repeat");
  }
  createNavigationBar() {
    this.navigationBar = this.element.createChild("div", "screencast-navigation");
    this.navigationBack = this.navigationBar.createChild("button", "navigation");
    this.navigationBack.appendChild(IconButton.Icon.create("arrow-back"));
    this.navigationBack.disabled = true;
    UI.ARIAUtils.setLabel(this.navigationBack, i18nString(UIStrings.back));
    this.navigationForward = this.navigationBar.createChild("button", "navigation");
    this.navigationForward.appendChild(IconButton.Icon.create("arrow-forward"));
    this.navigationForward.disabled = true;
    UI.ARIAUtils.setLabel(this.navigationForward, i18nString(UIStrings.forward));
    this.navigationReload = this.navigationBar.createChild("button", "navigation");
    this.navigationReload.appendChild(IconButton.Icon.create("refresh"));
    UI.ARIAUtils.setLabel(this.navigationReload, i18nString(UIStrings.reload));
    this.navigationUrl = this.navigationBar.appendChild(UI.UIUtils.createInput());
    this.navigationUrl.type = "text";
    UI.ARIAUtils.setLabel(this.navigationUrl, i18nString(UIStrings.addressBar));
    this.mouseInputToggle = this.navigationBar.createChild("button");
    this.mouseInputToggle.disabled = true;
    {
      this.mouseInputToggleIcon = this.mouseInputToggle.appendChild(new IconButton.Icon.Icon());
      this.mouseInputToggleIcon.name = "mouse";
      this.mouseInputToggleIcon.classList.toggle("toggled", true);
    }
    UI.ARIAUtils.setLabel(this.mouseInputToggle, i18nString(UIStrings.mouseInput));
    this.touchInputToggle = this.navigationBar.createChild("button");
    this.touchInputToggleIcon = this.touchInputToggle.appendChild(IconButton.Icon.create("touch-app"));
    UI.ARIAUtils.setLabel(this.touchInputToggle, i18nString(UIStrings.touchInput));
    this.navigationProgressBar = new ProgressTracker(this.resourceTreeModel, this.networkManager, this.navigationBar.createChild("div", "progress"));
    if (this.resourceTreeModel) {
      this.navigationBack.addEventListener("click", this.navigateToHistoryEntry.bind(this, -1), false);
      this.navigationForward.addEventListener("click", this.navigateToHistoryEntry.bind(this, 1), false);
      this.navigationReload.addEventListener("click", this.navigateReload.bind(this), false);
      this.navigationUrl.addEventListener("keyup", this.navigationUrlKeyUp.bind(this), true);
      this.touchInputToggle.addEventListener("click", this.#toggleTouchEmulation.bind(this, true), false);
      this.mouseInputToggle.addEventListener("click", this.#toggleTouchEmulation.bind(this, false), false);
      void this.requestNavigationHistory();
      this.resourceTreeModel.addEventListener(SDK2.ResourceTreeModel.Events.PrimaryPageChanged, this.requestNavigationHistoryEvent, this);
      this.resourceTreeModel.addEventListener(SDK2.ResourceTreeModel.Events.CachedResourcesLoaded, this.requestNavigationHistoryEvent, this);
    }
  }
  navigateToHistoryEntry(offset) {
    if (!this.resourceTreeModel) {
      return;
    }
    const newIndex = (this.historyIndex || 0) + offset;
    if (!this.historyEntries || newIndex < 0 || newIndex >= this.historyEntries.length) {
      return;
    }
    this.resourceTreeModel.navigateToHistoryEntry(this.historyEntries[newIndex]);
    void this.requestNavigationHistory();
  }
  navigateReload() {
    if (!this.resourceTreeModel) {
      return;
    }
    this.resourceTreeModel.reloadPage();
  }
  navigationUrlKeyUp(event) {
    if (event.key !== "Enter") {
      return;
    }
    let url = this.navigationUrl.value;
    if (!url) {
      return;
    }
    if (!url.match(SCHEME_REGEX)) {
      url = "http://" + url;
    }
    if (this.resourceTreeModel) {
      void this.resourceTreeModel.navigate(url);
    }
    this.canvasElement.focus();
  }
  #toggleTouchEmulation(value) {
    if (!this.canvasContainerElement || !this.isCasting || !this.mouseInputToggle || !this.touchInputToggle || !this.mouseInputToggleIcon || !this.touchInputToggleIcon) {
      return;
    }
    const models = SDK2.TargetManager.TargetManager.instance().models(SDK2.EmulationModel.EmulationModel);
    for (const model of models) {
      void model.overrideEmulateTouch(value);
    }
    this.mouseInputToggle.disabled = !value;
    this.touchInputToggle.disabled = value;
    this.mouseInputToggleIcon.classList.toggle("toggled", this.mouseInputToggle.disabled);
    this.touchInputToggleIcon.classList.toggle("toggled", this.touchInputToggle.disabled);
    this.canvasContainerElement.classList.toggle("touchable", value);
  }
  requestNavigationHistoryEvent() {
    void this.requestNavigationHistory();
  }
  async requestNavigationHistory() {
    const history = this.resourceTreeModel ? await this.resourceTreeModel.navigationHistory() : null;
    if (!history) {
      return;
    }
    this.historyIndex = history.currentIndex;
    this.historyEntries = history.entries;
    this.navigationBack.disabled = this.historyIndex === 0;
    this.navigationForward.disabled = this.historyIndex === this.historyEntries.length - 1;
    let url = this.historyEntries[this.historyIndex].url;
    const match = url.match(HTTP_REGEX);
    if (match) {
      url = match[1];
    }
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.inspectedURLChanged(url);
    this.navigationUrl.value = decodeURI(url);
  }
  focusNavigationBar() {
    this.navigationUrl.focus();
    this.navigationUrl.select();
    return true;
  }
};
var BORDERS_SIZE = 44;
var NAVBAR_HEIGHT = 29;
var HTTP_REGEX = /^http:\/\/(.+)/;
var SCHEME_REGEX = /^(https?|about|chrome):/;
var ProgressTracker = class {
  element;
  requestIds;
  startedRequests;
  finishedRequests;
  maxDisplayedProgress;
  constructor(resourceTreeModel, networkManager, element) {
    this.element = element;
    if (resourceTreeModel) {
      resourceTreeModel.addEventListener(SDK2.ResourceTreeModel.Events.PrimaryPageChanged, this.onPrimaryPageChanged, this);
      resourceTreeModel.addEventListener(SDK2.ResourceTreeModel.Events.Load, this.onLoad, this);
    }
    if (networkManager) {
      networkManager.addEventListener(SDK2.NetworkManager.Events.RequestStarted, this.onRequestStarted, this);
      networkManager.addEventListener(SDK2.NetworkManager.Events.RequestFinished, this.onRequestFinished, this);
    }
    this.requestIds = null;
    this.startedRequests = 0;
    this.finishedRequests = 0;
    this.maxDisplayedProgress = 0;
  }
  onPrimaryPageChanged() {
    this.requestIds = /* @__PURE__ */ new Map();
    this.startedRequests = 0;
    this.finishedRequests = 0;
    this.maxDisplayedProgress = 0;
    this.updateProgress(0.1);
  }
  onLoad() {
    this.requestIds = null;
    this.updateProgress(1);
    window.setTimeout(() => {
      if (!this.navigationProgressVisible()) {
        this.displayProgress(0);
      }
    }, 500);
  }
  navigationProgressVisible() {
    return this.requestIds !== null;
  }
  onRequestStarted(event) {
    if (!this.navigationProgressVisible()) {
      return;
    }
    const request = event.data.request;
    if (request.resourceType() === Common.ResourceType.resourceTypes.WebSocket) {
      return;
    }
    if (this.requestIds) {
      this.requestIds.set(request.requestId(), request);
    }
    ++this.startedRequests;
  }
  onRequestFinished(event) {
    if (!this.navigationProgressVisible()) {
      return;
    }
    const request = event.data;
    if (this.requestIds && !this.requestIds.has(request.requestId())) {
      return;
    }
    ++this.finishedRequests;
    window.setTimeout(() => {
      this.updateProgress(this.finishedRequests / this.startedRequests * 0.9);
    }, 500);
  }
  updateProgress(progress) {
    if (!this.navigationProgressVisible()) {
      return;
    }
    if (this.maxDisplayedProgress >= progress) {
      return;
    }
    this.maxDisplayedProgress = progress;
    this.displayProgress(progress);
  }
  displayProgress(progress) {
    this.element.style.width = 100 * progress + "%";
  }
};
function getAttributesForElementTitle(node) {
  const id = node.getAttribute("id");
  const className = node.getAttribute("class");
  let selector = id ? "#" + id : "";
  if (className) {
    selector += "." + className.trim().replace(/\s+/g, ".");
  }
  if (selector.length > 50) {
    selector = selector.substring(0, 50) + "\u2026";
  }
  return selector;
}

// gen/front_end/panels/screencast/ScreencastApp.js
var UIStrings2 = {
  /**
   * @description Tooltip text that appears when hovering over largeicon phone button in Screencast App of the Remote Devices tab when toggling screencast
   */
  toggleScreencast: "Toggle screencast"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/screencast/ScreencastApp.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
var appInstance;
var ScreencastApp = class _ScreencastApp {
  enabledSetting;
  toggleButton;
  rootSplitWidget;
  screenCaptureModel;
  screencastView;
  rootView;
  constructor() {
    this.enabledSetting = Common2.Settings.Settings.instance().createSetting("screencast-enabled", true);
    this.toggleButton = new UI2.Toolbar.ToolbarToggle(i18nString2(UIStrings2.toggleScreencast), "devices");
    this.toggleButton.setToggled(this.enabledSetting.get());
    this.toggleButton.setEnabled(false);
    this.toggleButton.addEventListener("Click", this.toggleButtonClicked, this);
    SDK3.TargetManager.TargetManager.instance().observeModels(SDK3.ScreenCaptureModel.ScreenCaptureModel, this);
  }
  static instance() {
    if (!appInstance) {
      appInstance = new _ScreencastApp();
    }
    return appInstance;
  }
  presentUI(document2) {
    this.rootView = new UI2.RootView.RootView();
    this.rootSplitWidget = new UI2.SplitWidget.SplitWidget(false, true, "inspector-view.screencast-split-view-state", 300, 300);
    this.rootSplitWidget.setVertical(true);
    this.rootSplitWidget.setSecondIsSidebar(true);
    this.rootSplitWidget.show(this.rootView.element);
    this.rootSplitWidget.hideMain();
    this.rootSplitWidget.setSidebarWidget(UI2.InspectorView.InspectorView.instance());
    UI2.InspectorView.InspectorView.instance().setOwnerSplit(this.rootSplitWidget);
    this.rootView.attachToDocument(document2);
    this.rootView.focus();
  }
  modelAdded(screenCaptureModel) {
    if (screenCaptureModel.target() !== SDK3.TargetManager.TargetManager.instance().primaryPageTarget()) {
      return;
    }
    this.screenCaptureModel = screenCaptureModel;
    this.toggleButton.setEnabled(true);
    this.screencastView = new ScreencastView(screenCaptureModel);
    if (this.rootSplitWidget) {
      this.rootSplitWidget.setMainWidget(this.screencastView);
    }
    this.screencastView.initialize();
    this.onScreencastEnabledChanged();
  }
  modelRemoved(screenCaptureModel) {
    if (this.screenCaptureModel !== screenCaptureModel) {
      return;
    }
    delete this.screenCaptureModel;
    this.toggleButton.setEnabled(false);
    if (this.screencastView) {
      this.screencastView.detach();
      delete this.screencastView;
    }
    this.onScreencastEnabledChanged();
  }
  toggleButtonClicked() {
    const enabled = this.toggleButton.isToggled();
    this.enabledSetting.set(enabled);
    this.onScreencastEnabledChanged();
  }
  onScreencastEnabledChanged() {
    if (!this.rootSplitWidget) {
      return;
    }
    const enabled = Boolean(this.enabledSetting.get() && this.screencastView);
    this.toggleButton.setToggled(enabled);
    if (enabled) {
      this.rootSplitWidget.showBoth();
    } else {
      this.rootSplitWidget.hideMain();
    }
  }
};
var toolbarButtonProviderInstance;
var ToolbarButtonProvider = class _ToolbarButtonProvider {
  static instance(opts = { forceNew: false }) {
    const { forceNew } = opts;
    if (!toolbarButtonProviderInstance || forceNew) {
      toolbarButtonProviderInstance = new _ToolbarButtonProvider();
    }
    return toolbarButtonProviderInstance;
  }
  item() {
    return ScreencastApp.instance().toggleButton;
  }
};
var screencastAppProviderInstance;
var ScreencastAppProvider = class _ScreencastAppProvider {
  static instance(opts = { forceNew: false }) {
    const { forceNew } = opts;
    if (!screencastAppProviderInstance || forceNew) {
      screencastAppProviderInstance = new _ScreencastAppProvider();
    }
    return screencastAppProviderInstance;
  }
  createApp() {
    return ScreencastApp.instance();
  }
};
export {
  InputModel_exports as InputModel,
  ScreencastApp_exports as ScreencastApp,
  ScreencastView_exports as ScreencastView
};
//# sourceMappingURL=screencast.js.map
