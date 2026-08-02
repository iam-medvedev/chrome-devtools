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
  DEFAULT_VIEW: () => DEFAULT_VIEW,
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
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as UI from "./../../ui/legacy/legacy.js";
import { Directives, html, nothing, render } from "./../../ui/lit/lit.js";

// gen/front_end/panels/screencast/screencastView.css.js
var screencastView_css_default = `/*
 * Copyright 2013 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

@scope to (devtools-widget > *) {
  :scope {
    overflow: hidden;
    display: flex;
    flex-direction: column;
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

  .screencast-navigation devtools-button {
    padding: 2px;
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

  canvas {
    flex: auto;
    position: relative;
  }

  .screencast-element-title {
    position: absolute;
    z-index: 10;
    background-color: var(--sys-color-yellow-container);
    border: 1px solid var(--sys-color-outline);
    padding: 2px 4px;
    white-space: nowrap;
  }

  .screencast-element-title.arrow-up::before {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 14px;
    border: 7px solid transparent;
    border-bottom-color: var(--sys-color-yellow-container);
  }

  .screencast-element-title.arrow-down::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 14px;
    border: 7px solid transparent;
    border-top-color: var(--sys-color-yellow-container);
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
}

/*# sourceURL=${import.meta.resolve("./screencastView.css")} */`;

// gen/front_end/panels/screencast/ScreencastView.js
var { ref, styleMap, classMap } = Directives;
var UIStrings = {
  /**
   * @description Accessible alt text for the Screencast canvas rendering of the debug target webpage.
   */
  screencastViewOfDebugTarget: "Screencast view of debug target",
  /**
   * @description Glass pane element text content in the Screencast view of the Remote devices tab when toggling screencast.
   */
  theTabIsInactive: "The tab is inactive",
  /**
   * @description Glass pane element text content in the Screencast view of the Remote devices tab when profiling is in progress.
   */
  profilingInProgress: "Profiling in progress",
  /**
   * @description Accessible label for the Screencast back button.
   */
  back: "Back",
  /**
   * @description Accessible label for the Screencast forward button.
   */
  forward: "Forward",
  /**
   * @description Accessible label for the Screencast reload button.
   */
  reload: "Reload",
  /**
   * @description Accessible label for the address bar in the Screencast view.
   */
  addressBar: "Address bar",
  /**
   * @description Accessible label for the touch input button in the Screencast view.
   */
  touchInput: "Use touch",
  /**
   * @description Accessible label for the mouse input button in the Screencast view.
   */
  mouseInput: "Use mouse"
};
var str_ = i18n.i18n.registerUIStrings("panels/screencast/ScreencastView.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var DEFAULT_VIEW = (input, output, target) => {
  let canvasElement = null;
  render(html`
    <style>${screencastView_css_default}</style>
    <div class="screencast-navigation">
      <devtools-button class="navigation"
        .data=${{
    variant: "toolbar",
    iconName: "arrow-back",
    disabled: !input.canGoBack,
    title: i18nString(UIStrings.back),
    accessibleLabel: i18nString(UIStrings.back)
  }}
        @click=${input.onBackClick}></devtools-button>
      <devtools-button class="navigation"
        .data=${{
    variant: "toolbar",
    iconName: "arrow-forward",
    disabled: !input.canGoForward,
    title: i18nString(UIStrings.forward),
    accessibleLabel: i18nString(UIStrings.forward)
  }}
        @click=${input.onForwardClick}></devtools-button>
      <devtools-button class="navigation"
        .data=${{
    variant: "toolbar",
    iconName: "refresh",
    title: i18nString(UIStrings.reload),
    accessibleLabel: i18nString(UIStrings.reload)
  }}
        @click=${input.onReloadClick}></devtools-button>
      <input type="text" class="harmony-input" aria-label=${i18nString(UIStrings.addressBar)}
        .value=${input.navigationUrl}
        @keyup=${input.onUrlInputKeyUp}
        ${ref((el) => {
    if (el instanceof HTMLInputElement) {
      output.focusUrlInput = () => {
        el.focus();
        el.select();
      };
    }
  })}
      />
      <devtools-button
        .data=${{
    variant: "toolbar",
    iconName: "mouse",
    toggledIconName: "mouse",
    disabled: !input.isTouchEmulated,
    toggled: !input.isTouchEmulated,
    toggleType: "primary-toggle",
    title: i18nString(UIStrings.mouseInput),
    accessibleLabel: i18nString(UIStrings.mouseInput)
  }}
        @click=${() => input.onToggleTouch(false)}></devtools-button>
      <devtools-button
        .data=${{
    variant: "toolbar",
    iconName: "touch-app",
    toggledIconName: "touch-app",
    disabled: input.isTouchEmulated,
    toggled: input.isTouchEmulated,
    toggleType: "primary-toggle",
    title: i18nString(UIStrings.touchInput),
    accessibleLabel: i18nString(UIStrings.touchInput)
  }}
        @click=${() => input.onToggleTouch(true)}></devtools-button>
      <div class="progress" style=${styleMap({ width: `${(input.progressPercent ?? 0) * 100}%` })}></div>
    </div>
    <div
      class=${classMap({
    "screencast-viewport": true,
    hidden: input.isViewportHidden
  })}
      style=${styleMap({
    width: input.viewportWidth,
    height: input.viewportHeight
  })}>
      <div class=${classMap({
    "screencast-canvas-container": true,
    touchable: input.isTouchEmulated
  })}>
        <div class=${classMap({
    "screencast-glasspane": true,
    fill: true,
    hidden: input.glassPaneHidden
  })}>${input.glassPaneText}</div>
        <canvas aria-label=${i18nString(UIStrings.screencastViewOfDebugTarget)} tabindex="0"
          @mousedown=${input.onCanvasMouseEvent}
          @mouseup=${input.onCanvasMouseEvent}
          @mousemove=${input.onCanvasMouseEvent}
          @wheel=${input.onCanvasWheel}
          @click=${input.onCanvasMouseEvent}
          @contextmenu=${input.onCanvasContextMenu}
          @keydown=${input.onCanvasKeyEvent}
          @keyup=${input.onCanvasKeyEvent}
          @keypress=${input.onCanvasKeyEvent}
          @blur=${input.onCanvasBlur}
          ${ref((el) => {
    if (el instanceof HTMLCanvasElement) {
      output.focusCanvas = () => el.focus();
      canvasElement = el;
      ScreencastView.repaintScreencastCanvas(el, input);
    }
  })}></canvas>
        <div
          class=${classMap({
    "screencast-element-title": true,
    monospace: true,
    hidden: !input.elementTitleData?.visible
  })}
          ${ref((el) => {
    if (el instanceof HTMLElement && canvasElement && input.elementTitleData?.visible && !el.classList.contains("hidden")) {
      ScreencastView.clampTooltipPosition(canvasElement, el, input.highlightModel);
    }
  })}>
          <span class="screencast-tag-name">${input.elementTitleData?.tagName ?? nothing}</span>
          <span class="screencast-attribute">${input.elementTitleData?.attribute ?? nothing}</span>
          <span class="screencast-dimension"> <span>${input.elementTitleData?.width ?? nothing}</span> × <span>${input.elementTitleData?.height ?? nothing}</span>
          </span>
        </div>
      </div>
    </div>
  `, target);
};
var ScreencastView = class _ScreencastView extends UI.Widget.Widget {
  #view;
  #viewOutput;
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
  imageZoom;
  model;
  highlightConfig;
  targetInactive;
  deferredCasting;
  highlightNode;
  config;
  node;
  inspectModeConfig;
  navigationProgressBar;
  historyIndex;
  historyEntries;
  isCasting = false;
  screencastOperationId;
  #navigationUrlText = "";
  #canGoBack = false;
  #canGoForward = false;
  #isTouchEmulated = false;
  #glassPaneText = "";
  #glassPaneHidden = true;
  #isViewportHidden = true;
  #viewportWidth = "";
  #viewportHeight = "";
  #progressPercent = 0;
  #elementTitleData = { visible: false };
  constructor(screenCaptureModel, element, view = DEFAULT_VIEW) {
    super(element);
    this.#view = view;
    this.#viewOutput = {};
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
    this.createNavigationBar();
    this.imageElement = new Image();
    this.shortcuts[UI.KeyboardShortcut.KeyboardShortcut.makeKey("l", UI.KeyboardShortcut.Modifiers.Ctrl.value)] = this.focusNavigationBar.bind(this);
    SDK2.TargetManager.TargetManager.instance().addEventListener("SuspendStateChanged", this.onSuspendStateChange, this);
    this.updateGlasspane();
  }
  wasShown() {
    super.wasShown();
    if (this.deferredCasting) {
      clearTimeout(this.deferredCasting);
      delete this.deferredCasting;
    }
    this.deferredCasting = window.setTimeout(this.startCasting.bind(this), 100);
    this.requestUpdate();
  }
  performUpdate() {
    const input = {
      navigationUrl: this.#navigationUrlText,
      canGoBack: this.#canGoBack,
      canGoForward: this.#canGoForward,
      isTouchEmulated: this.#isTouchEmulated,
      glassPaneText: this.#glassPaneText,
      glassPaneHidden: this.#glassPaneHidden,
      isViewportHidden: this.#isViewportHidden,
      viewportWidth: this.#viewportWidth,
      viewportHeight: this.#viewportHeight,
      progressPercent: this.#progressPercent,
      elementTitleData: this.#elementTitleData,
      screencastImage: this.imageElement,
      screenOffsetTop: this.screenOffsetTop,
      screenZoom: this.screenZoom,
      imageZoom: this.imageZoom,
      highlightModel: this.model,
      highlightConfig: this.config,
      onBackClick: () => this.navigateToHistoryEntry(-1),
      onForwardClick: () => this.navigateToHistoryEntry(1),
      onReloadClick: () => this.navigateReload(),
      onUrlInputKeyUp: (e) => this.navigationUrlKeyUp(e),
      onToggleTouch: (emulateTouch) => this.#toggleTouchEmulation(emulateTouch),
      onCanvasMouseEvent: (e) => void this.handleMouseEvent(e),
      onCanvasWheel: (e) => void this.handleWheelEvent(e),
      onCanvasKeyEvent: (e) => this.handleKeyEvent(e),
      onCanvasContextMenu: (e) => this.handleContextMenuEvent(e),
      onCanvasBlur: () => this.handleBlurEvent()
    };
    this.#view(input, this.#viewOutput, this.contentElement);
  }
  willHide() {
    super.willHide();
    this.stopCasting();
  }
  onDetach() {
    this.navigationProgressBar?.dispose();
    SDK2.TargetManager.TargetManager.instance().removeEventListener("SuspendStateChanged", this.onSuspendStateChange, this);
    if (this.resourceTreeModel) {
      this.resourceTreeModel.removeEventListener(SDK2.ResourceTreeModel.Events.PrimaryPageChanged, this.requestNavigationHistoryEvent, this);
      this.resourceTreeModel.removeEventListener(SDK2.ResourceTreeModel.Events.CachedResourcesLoaded, this.requestNavigationHistoryEvent, this);
    }
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
    this.#isTouchEmulated = false;
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
      if (dimensionsCSS.width <= 0 || dimensionsCSS.height <= 0) {
        return;
      }
      this.imageZoom = Math.min(dimensionsCSS.width / this.imageElement.naturalWidth, dimensionsCSS.height / (this.imageElement.naturalWidth * deviceSizeRatio));
      const bordersSize = BORDERS_SIZE;
      if (this.imageZoom < 1.01 / window.devicePixelRatio) {
        this.imageZoom = 1 / window.devicePixelRatio;
      }
      this.screenZoom = this.imageElement.naturalWidth * this.imageZoom / metadata.deviceWidth;
      const newWidth = metadata.deviceWidth * this.screenZoom + bordersSize + "px";
      const newHeight = metadata.deviceHeight * this.screenZoom + bordersSize + "px";
      if (this.#viewportWidth !== newWidth || this.#viewportHeight !== newHeight || this.#isViewportHidden) {
        this.#viewportWidth = newWidth;
        this.#viewportHeight = newHeight;
        this.#isViewportHidden = false;
        this.requestUpdate();
      }
      const data = this.highlightNode ? { node: this.highlightNode } : { clear: true };
      void this.updateHighlightInOverlayAndRepaint(data, this.highlightConfig);
    };
    this.imageElement.src = "data:image/jpg;base64," + base64Data;
  }
  isGlassPaneActive() {
    return !this.#glassPaneHidden;
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
    let newText = "";
    let newHidden = true;
    if (this.targetInactive) {
      newText = i18nString(UIStrings.theTabIsInactive);
      newHidden = false;
    } else if (SDK2.TargetManager.TargetManager.instance().allTargetsSuspended()) {
      newText = i18nString(UIStrings.profilingInProgress);
      newHidden = false;
    }
    if (this.#glassPaneText !== newText || this.#glassPaneHidden !== newHidden) {
      this.#glassPaneText = newText;
      this.#glassPaneHidden = newHidden;
      this.requestUpdate();
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
        this.#viewOutput.focusCanvas?.();
      }
      return;
    }
    const position = this.convertIntoScreenSpace(event);
    const node = await this.domModel.nodeForLocation(Math.floor(position.x / this.pageScaleFactor + this.scrollOffsetX), Math.floor(position.y / this.pageScaleFactor + this.scrollOffsetY), Common.Settings.Settings.instance().moduleSetting("show-ua-shadow-dom").get());
    if (!node) {
      return;
    }
    if (event.type === "mousemove") {
      void this.updateHighlightInOverlayAndRepaint({ node }, this.inspectModeConfig);
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
    this.#viewOutput.focusCanvas?.();
  }
  handleBlurEvent() {
    if (this.inputModel && !this.#isTouchEmulated) {
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
      if (this.#elementTitleData.visible) {
        this.#elementTitleData = { visible: false };
      }
      this.drawElementTitle();
      this.requestUpdate();
      return;
    }
    this.node = node;
    void node.boxModel().then((model) => {
      if (!model || !this.pageScaleFactor) {
        this.drawElementTitle();
        this.requestUpdate();
        return;
      }
      this.model = this.scaleModel(model);
      this.config = config;
      this.drawElementTitle();
      this.requestUpdate();
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
  static repaintScreencastCanvas(el, input) {
    const context = el.getContext("2d");
    if (!context) {
      return;
    }
    const model = input.highlightModel;
    const config = input.highlightConfig;
    const canvasWidth = el.getBoundingClientRect().width;
    const canvasHeight = el.getBoundingClientRect().height;
    el.width = window.devicePixelRatio * canvasWidth;
    el.height = window.devicePixelRatio * canvasHeight;
    context.save();
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
    if (model && config) {
      context.save();
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
        _ScreencastView.drawOutlinedQuadWithClip(context, quads[i].quad, quads[i - 1].quad, quads[i].color);
      }
      if (quads.length > 0) {
        _ScreencastView.drawOutlinedQuad(context, quads[0].quad, quads[0].color);
      }
      context.globalCompositeOperation = "destination-over";
    }
    if (input.screencastImage) {
      context.drawImage(input.screencastImage, 0, input.screenOffsetTop * input.screenZoom, input.screencastImage.naturalWidth * input.imageZoom, input.screencastImage.naturalHeight * input.imageZoom);
    }
    context.restore();
  }
  static cssColor(color) {
    if (!color) {
      return "transparent";
    }
    return Common.Color.Legacy.fromRGBA([color.r, color.g, color.b, color.a !== void 0 ? color.a : 1]).asString(
      "rgba"
      /* Common.Color.Format.RGBA */
    ) || "";
  }
  static quadToPath(context, quad) {
    context.beginPath();
    context.moveTo(quad[0], quad[1]);
    context.lineTo(quad[2], quad[3]);
    context.lineTo(quad[4], quad[5]);
    context.lineTo(quad[6], quad[7]);
    context.closePath();
    return context;
  }
  static drawOutlinedQuad(context, quad, fillColor) {
    context.save();
    context.lineWidth = 2;
    _ScreencastView.quadToPath(context, quad).clip();
    context.fillStyle = _ScreencastView.cssColor(fillColor);
    context.fill();
    context.restore();
  }
  static drawOutlinedQuadWithClip(context, quad, clipQuad, fillColor) {
    context.fillStyle = _ScreencastView.cssColor(fillColor);
    context.save();
    context.lineWidth = 0;
    _ScreencastView.quadToPath(context, quad).fill();
    context.globalCompositeOperation = "destination-out";
    context.fillStyle = "red";
    _ScreencastView.quadToPath(context, clipQuad).fill();
    context.restore();
  }
  drawElementTitle() {
    if (!this.node) {
      if (this.#elementTitleData.visible) {
        this.#elementTitleData = { visible: false };
        this.requestUpdate();
      }
      return;
    }
    const lowerCaseName = this.node.localName() || this.node.nodeName().toLowerCase();
    const attribute = getAttributesForElementTitle(this.node);
    const width = String(this.model ? this.model.width : 0);
    const height = String(this.model ? this.model.height : 0);
    if (!this.#elementTitleData.visible || this.#elementTitleData.tagName !== lowerCaseName || this.#elementTitleData.attribute !== attribute || this.#elementTitleData.width !== width || this.#elementTitleData.height !== height) {
      this.#elementTitleData = {
        visible: true,
        tagName: lowerCaseName,
        attribute,
        width,
        height
      };
      this.requestUpdate();
    }
  }
  static clampTooltipPosition(canvas, titleElement, model) {
    if (!model) {
      return;
    }
    const canvasWidth = canvas.getBoundingClientRect().width;
    const canvasHeight = canvas.getBoundingClientRect().height;
    const titleWidth = titleElement.offsetWidth;
    const titleHeight = titleElement.offsetHeight;
    const anchorTop = model.margin[1];
    const anchorBottom = model.margin[7];
    const arrowHeight = 7;
    let arrowDirection;
    let boxX = Math.max(2, model.margin[0]);
    if (boxX + titleWidth > canvasWidth) {
      boxX = canvasWidth - titleWidth - 2;
    }
    let boxY;
    if (anchorTop > canvasHeight) {
      boxY = canvasHeight - titleHeight - arrowHeight;
      arrowDirection = "down";
    } else if (anchorBottom < 0) {
      boxY = arrowHeight;
      arrowDirection = "up";
    } else if (anchorBottom + titleHeight + arrowHeight < canvasHeight) {
      boxY = anchorBottom + arrowHeight - 4;
      arrowDirection = "up";
    } else if (anchorTop - titleHeight - arrowHeight > 0) {
      boxY = anchorTop - titleHeight - arrowHeight + 3;
      arrowDirection = "down";
    } else {
      boxY = arrowHeight;
    }
    titleElement.style.top = `${boxY}px`;
    titleElement.style.left = `${boxX}px`;
    titleElement.classList.toggle("arrow-up", arrowDirection === "up");
    titleElement.classList.toggle("arrow-down", arrowDirection === "down");
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
  createNavigationBar() {
    this.navigationProgressBar = new ProgressTracker(this.resourceTreeModel, this.networkManager, (progress) => {
      if (this.#progressPercent !== progress) {
        this.#progressPercent = progress;
        this.requestUpdate();
      }
    });
    if (this.resourceTreeModel) {
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
    const inputElement = event.target;
    let url = inputElement.value;
    if (!url) {
      return;
    }
    if (!url.match(SCHEME_REGEX)) {
      url = "http://" + url;
    }
    if (this.resourceTreeModel) {
      void this.resourceTreeModel.navigate(url);
    }
    this.#viewOutput.focusCanvas?.();
  }
  #toggleTouchEmulation(value) {
    if (!this.isCasting) {
      return;
    }
    const models = SDK2.TargetManager.TargetManager.instance().models(SDK2.EmulationModel.EmulationModel);
    for (const model of models) {
      void model.overrideEmulateTouch(value);
    }
    this.#isTouchEmulated = value;
    this.requestUpdate();
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
    this.#canGoBack = this.historyIndex > 0;
    this.#canGoForward = this.historyIndex < this.historyEntries.length - 1;
    let url = this.historyEntries[this.historyIndex].url;
    const match = url.match(HTTP_REGEX);
    if (match) {
      url = match[1];
    }
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.inspectedURLChanged(url);
    this.#navigationUrlText = decodeURI(url);
    this.requestUpdate();
  }
  focusNavigationBar() {
    this.#viewOutput.focusUrlInput?.();
    return true;
  }
};
var BORDERS_SIZE = 44;
var NAVBAR_HEIGHT = 29;
var HTTP_REGEX = /^http:\/\/(.+)/;
var SCHEME_REGEX = /^(https?|about|chrome):/;
var ProgressTracker = class {
  resourceTreeModel;
  networkManager;
  requestIds;
  startedRequests;
  finishedRequests;
  maxDisplayedProgress;
  onProgressUpdate;
  constructor(resourceTreeModel, networkManager, onProgressUpdate) {
    this.resourceTreeModel = resourceTreeModel;
    this.networkManager = networkManager;
    this.onProgressUpdate = onProgressUpdate;
    if (this.resourceTreeModel) {
      this.resourceTreeModel.addEventListener(SDK2.ResourceTreeModel.Events.PrimaryPageChanged, this.onPrimaryPageChanged, this);
      this.resourceTreeModel.addEventListener(SDK2.ResourceTreeModel.Events.Load, this.onLoad, this);
    }
    if (this.networkManager) {
      this.networkManager.addEventListener(SDK2.NetworkManager.Events.RequestStarted, this.onRequestStarted, this);
      this.networkManager.addEventListener(SDK2.NetworkManager.Events.RequestFinished, this.onRequestFinished, this);
    }
    this.requestIds = null;
    this.startedRequests = 0;
    this.finishedRequests = 0;
    this.maxDisplayedProgress = 0;
  }
  dispose() {
    if (this.resourceTreeModel) {
      this.resourceTreeModel.removeEventListener(SDK2.ResourceTreeModel.Events.PrimaryPageChanged, this.onPrimaryPageChanged, this);
      this.resourceTreeModel.removeEventListener(SDK2.ResourceTreeModel.Events.Load, this.onLoad, this);
    }
    if (this.networkManager) {
      this.networkManager.removeEventListener(SDK2.NetworkManager.Events.RequestStarted, this.onRequestStarted, this);
      this.networkManager.removeEventListener(SDK2.NetworkManager.Events.RequestFinished, this.onRequestFinished, this);
    }
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
    this.onProgressUpdate?.(progress);
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
   * @description Tooltip text that appears when hovering over the toggle screencast button in the Screencast app of the Remote devices tab when toggling screencast.
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
  #universe;
  constructor(universe) {
    this.#universe = universe;
    this.enabledSetting = Common2.Settings.Settings.instance().createSetting("screencast-enabled", true);
    this.toggleButton = new UI2.Toolbar.ToolbarToggle(i18nString2(UIStrings2.toggleScreencast), "devices");
    this.toggleButton.setToggled(this.enabledSetting.get());
    this.toggleButton.setEnabled(false);
    this.toggleButton.addEventListener("Click", this.toggleButtonClicked, this);
    SDK3.TargetManager.TargetManager.instance().observeModels(SDK3.ScreenCaptureModel.ScreenCaptureModel, this);
  }
  static instance(universe) {
    if (!appInstance) {
      if (!universe) {
        throw new Error("ScreencastApp.instance() requires a Universe on initial instantiation");
      }
      appInstance = new _ScreencastApp(universe);
    }
    return appInstance;
  }
  presentUI(document) {
    this.rootView = new UI2.RootView.RootView(this.#universe);
    this.rootView.registerRequiredCSS(UI2.inspectorCommonStyles);
    this.rootSplitWidget = new UI2.SplitWidget.SplitWidget(false, true, "inspector-view.screencast-split-view-state", 300, 300);
    this.rootSplitWidget.setVertical(true);
    this.rootSplitWidget.setSecondIsSidebar(true);
    this.rootSplitWidget.show(this.rootView.element);
    this.rootSplitWidget.hideMain();
    this.rootSplitWidget.setSidebarWidget(UI2.InspectorView.InspectorView.instance());
    UI2.InspectorView.InspectorView.instance().setOwnerSplit(this.rootSplitWidget);
    this.rootView.attachToDocument(document);
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
  createApp(universe) {
    return ScreencastApp.instance(universe);
  }
};
export {
  InputModel_exports as InputModel,
  ScreencastApp_exports as ScreencastApp,
  ScreencastView_exports as ScreencastView
};
//# sourceMappingURL=screencast.js.map
