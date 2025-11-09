var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/animation/AnimationGroupPreviewUI.js
var AnimationGroupPreviewUI_exports = {};
__export(AnimationGroupPreviewUI_exports, {
  AnimationGroupPreviewUI: () => AnimationGroupPreviewUI
});
import * as UI3 from "./../../ui/legacy/legacy.js";
import * as Lit2 from "./../../ui/lit/lit.js";
import * as VisualLogging3 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/animation/AnimationUI.js
var AnimationUI_exports = {};
__export(AnimationUI_exports, {
  AnimationUI: () => AnimationUI,
  Colors: () => Colors,
  Options: () => Options
});
import * as Common2 from "./../../core/common/common.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as Platform2 from "./../../core/platform/platform.js";
import * as Geometry from "./../../models/geometry/geometry.js";
import * as InlineEditor from "./../../ui/legacy/components/inline_editor/inline_editor.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
import * as VisualLogging2 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/animation/AnimationTimeline.js
var AnimationTimeline_exports = {};
__export(AnimationTimeline_exports, {
  AnimationGroupRevealer: () => AnimationGroupRevealer,
  AnimationTimeline: () => AnimationTimeline,
  GlobalPlaybackRates: () => GlobalPlaybackRates,
  NodeUI: () => NodeUI,
  StepTimingFunction: () => StepTimingFunction
});
import "./../../ui/legacy/legacy.js";
import * as Common from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as Platform from "./../../core/platform/platform.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as UI from "./../../ui/legacy/legacy.js";
import * as Lit from "./../../ui/lit/lit.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/animation/animationTimeline.css.js
var animationTimeline_css_default = `/*
 * Copyright 2015 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  overflow: hidden;

  --timeline-controls-width: 150px;
}

.toolbar-view-container {
  min-height: fit-content;
}

.animation-node-row {
  width: 100%;
  display: flex;
  border-bottom: 1px dashed var(--sys-color-divider);
}

.animation-node-description {
  padding-left: 8px;
  overflow: hidden;
  position: relative;
  background-color: var(--sys-color-cdt-base-container);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  white-space: nowrap;
  flex: 0 0 var(--timeline-controls-width);
  z-index: 1;
}

.animation-node-description > * {
  flex: 0 0 auto;
}

.animation-timeline-row {
  height: 32px;
  position: relative;
}

path.animation-keyframe {
  /* stylelint-disable-next-line declaration-property-value-no-unknown */
  fill-opacity: 20%;
}

.animation-node-selected path.animation-keyframe,
svg.animation-ui g:first-child:hover path.animation-keyframe {
  /* stylelint-disable-next-line declaration-property-value-no-unknown */
  fill-opacity: 40%;
}

line.animation-line {
  stroke-width: 2px;
  stroke-linecap: round;
  fill: none;
}

line.animation-delay-line {
  stroke-width: 2px;
  stroke-dasharray: 6, 4;
}

line.animation-delay-line.animation-fill {
  stroke-dasharray: none;
}

circle.animation-keyframe-point {
  fill: var(--sys-color-cdt-base-container);
}

circle.animation-endpoint,
circle.animation-keyframe-point {
  stroke-width: 2px;
  transition: transform 100ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale(1);
  transform-box: fill-box;
  transform-origin: 50% 50%;
}

circle.animation-endpoint:active,
circle.animation-keyframe-point:active {
  transform: scale(1);
}

.animation-ui circle.animation-endpoint:hover,
.animation-ui circle.animation-keyframe-point:hover {
  transform: scale(1.2);
}

.animation-name {
  position: absolute;
  top: 8px;
  color: var(--sys-color-on-surface);
  text-align: center;
  margin-left: -8px;
  white-space: nowrap;
}

.animation-timeline-toolbar-container {
  display: flex;
  background-color: var(--sys-color-cdt-base-container);
  border-bottom: 1px solid var(--sys-color-divider);
  flex: 0 0 auto;
}

.animation-timeline-header {
  height: 28px;
  border-bottom: 1px solid var(--sys-color-divider);
  flex-shrink: 0;
  display: flex;
}

.animation-timeline-header::after {
  content: '';
  height: calc(100% - 48px - 28px);
  position: absolute;
  width: var(--timeline-controls-width);
  left: 0;
  margin-top: 28px;
  background-color: var(--sys-color-cdt-base-container);
  z-index: 0;
  border-right: 1px solid var(--sys-color-divider);
}

.animation-controls {
  flex: 0 0 var(--timeline-controls-width);
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding-right: 8px;
}

.animation-timeline-current-time {
  flex: 0 0 auto;
  line-height: 28px;
  margin-right: 5px;
}

.animation-grid-header {
  flex: 1 0 auto;
  z-index: 2;
}

.animation-grid-header.scrubber-enabled {
  cursor: pointer;
}

.animation-timeline-buffer {
  height: 48px;
  flex: 0 0 auto;
  border-bottom: 1px solid var(--sys-color-divider);
  display: flex;
  padding: 0 2px;
}

.animation-timeline-buffer-hint {
  display: none;
}

.animation-time-overlay {
  background-color: var(--sys-color-on-surface);
  opacity: 5%;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
}

.animation-timeline-end > .animation-time-overlay {
  visibility: hidden;
}

.animation-scrubber {
  opacity: 100%;
  position: absolute;
  left: 10px;
  height: 100%;
  width: 100%;
  top: 28px;
  border-left: 1px solid var(--sys-color-error);
  z-index: 2;
}

.animation-scrubber-line {
  width: 11px;
  background: linear-gradient(
    to right,
    transparent 5px,
    var(--sys-color-error) 5px,
    var(--sys-color-error) 6px,
    transparent 6px
  );
  position: absolute;
  top: -28px;
  height: 28px;
  left: -6px;
  padding: 0 5px;
  z-index: 3;
}

.animation-scrubber-head {
  width: 7px;
  height: 7px;
  transform: rotate(45deg);
  background: var(--sys-color-error);
  position: absolute;
  left: 2px;
  top: 1px;
  z-index: 4;
}

.grid-overflow-wrapper {
  position: absolute;
  left: calc(var(--timeline-controls-width) - 10px);
  top: 76px;
  z-index: 1;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

svg.animation-timeline-grid {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

rect.animation-timeline-grid-line {
  fill: var(--sys-color-divider);
}

.animation-timeline-row > svg.animation-ui {
  position: absolute;
}

.animation-node-timeline {
  flex-grow: 1;
}

.animation-node-description > div {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  max-height: 100%;
}

.animation-node-removed {
  filter: saturate(0);
  cursor: not-allowed;
}

.animation-node-removed-overlay {
  width: 100%;
  height: 100%;
  z-index: 100;
  cursor: not-allowed;
}

svg.animation-ui g:first-child {
  opacity: 100%;
}

svg.animation-ui circle:focus-visible,
svg.animation-ui path:focus-visible {
  outline: 2px solid -webkit-focus-ring-color;
}

.animation-tail-iterations {
  opacity: 50%;
}

.animation-keyframe-step line {
  stroke-width: 2;
  stroke-opacity: 30%;
}

text.animation-timeline-grid-label {
  font-size: 10px;
  fill: var(--sys-color-token-subtle);
  text-anchor: middle;
}

.animation-timeline-rows,
.animation-timeline-rows-hint,
.animation-timeline-buffer-hint {
  flex-grow: 1;
  overflow: hidden auto;
  z-index: 1;
}

.animation-timeline-rows-hint {
  display: none;
}

.animation-timeline-buffer:not(:empty) ~ .animation-timeline-rows:empty {
  flex-grow: 0;
}

.animation-timeline-rows:empty {
  display: none;
}

.animation-timeline-buffer:not(:empty)
  ~ .animation-timeline-rows:empty
  ~ .animation-timeline-buffer-hint:not(:empty)
  ~ .animation-timeline-rows-hint,
.animation-timeline-buffer:empty ~ .animation-timeline-buffer-hint {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: var(--timeline-controls-width);
  padding: 10px;
}

.animation-controls-toolbar {
  flex: 0 0 auto;
}

.animation-node-row.animation-node-selected {
  background-color: var(--sys-color-state-ripple-primary);
}

.animation-node-selected > .animation-node-description {
  background-color: var(--sys-color-tonal-container);
}

.animation-buffer-preview {
  height: 40px;
  margin: 4px 2px;
  background-color: var(--sys-color-neutral-container);
  border: 1px solid transparent;
  border-radius: 2px;
  flex: 1 1;
  padding: 4px;
  max-width: 100px;
  animation: newGroupAnim 200ms;
  position: relative;
}

.animation-buffer-preview.no-animation {
  animation: none;
}

.animation-buffer-preview .preview-icon {
  position: absolute;
  width: 14px;
  height: 14px;
  right: 1px;
  bottom: 2px;
  opacity: 60%;
}

.animation-buffer-preview-animation {
  width: 100%;
  height: 100%;
  border-radius: 2px 0 0 2px;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--sys-color-tonal-container);
  opacity: 0%;
  border-right: 1px solid var(--sys-color-divider);
}

.animation-buffer-preview:focus-visible {
  outline: -webkit-focus-ring-color auto 5px;
}

.animation-buffer-preview.selected .preview-icon {
  opacity: 100%;
}

.animation-buffer-preview:not(.selected):focus-visible,
.animation-buffer-preview:not(.selected):hover {
  background-color: var(--sys-color-surface-variant);

  & .preview-icon {
    opacity: 80%;
  }
}

.animation-buffer-preview.selected {
  background-color: var(--sys-color-tonal-container);
}

.animation-paused {
  align-items: center;
  justify-content: center;
  display: none;
}

.animation-paused::before,
.animation-paused::after {
  content: '';
  background: var(--sys-color-cdt-base-container);
  width: 7px;
  height: 20px;
  border-radius: 2px;
  margin: 2px;
  border: 1px solid var(--sys-color-divider);
}

.animation-buffer-preview.paused .animation-paused {
  display: flex;
}

.animation-buffer-preview > svg > line {
  stroke-width: 1px;
}

.animation-buffer-preview.selected > svg > line {
  stroke: var(
    --sys-color-on-tonal-container
  ) !important; /* stylelint-disable-line declaration-no-important */
}

@keyframes newGroupAnim {
  from {
    clip-path: polygon(0% 0%, 0% 100%, 50% 100%, 50% 0%);
  }

  to {
    clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%);
  }
}

.animation-playback-rate-control {
  margin: 4px 0 4px 2px;
  display: flex;
  width: 120px;
}

.animation-playback-rate-button {
  border-width: 1px;
  border-style: solid;
  border-color: var(--sys-color-tonal-outline);
  border-right-width: 0;
  color: var(--sys-color-on-surface);
  display: inline-block;
  margin-right: -1px;
  padding: 1px 4px;
  background-color: transparent;
  flex: 1 0 auto;
  text-align: center;
}

.animation-playback-rate-button:first-child {
  border-radius: 4px 0 0 4px;
}

.animation-playback-rate-button:last-child {
  border-radius: 0 4px 4px 0;
  border-right-width: 1px;
}

.animation-playback-rate-button.selected {
  color: var(--sys-color-on-tonal-container);
  background-color: var(--sys-color-tonal-container);
  border-color: var(--sys-color-tonal-container);
  z-index: 1;
}

.animation-playback-rate-button.selected:focus-visible {
  color: var(--sys-color-on-surface);
}

.animation-playback-rate-button:focus-visible {
  outline: 2px solid var(--sys-color-primary);
  outline-offset: 2px;
  z-index: 9999;
}

.animation-playback-rate-button:not(.selected, [disabled]):hover {
  background: var(--sys-color-state-hover-on-subtle);
}

.animation-playback-rate-button[disabled] {
  background: unset;
  border-color: var(--sys-color-state-disabled);
  color: var(--sys-color-state-disabled);
}

.animation-remove-button {
  position: absolute;
  top: -3px;
  right: -3px;
  background: var(--sys-color-token-subtle);
  border-radius: 12px;
  border: 0;
  height: 16px;
  width: 16px;
  z-index: 100;
  display: none;
  padding: 0;

  & > devtools-icon {
    height: 16px;
    width: 16px;
    color: var(--sys-color-cdt-base-container);
  }

  &:hover {
    background-color: var(--sys-color-on-surface);
  }
}

.animation-group-preview-ui {
  position: relative;
}

.animation-group-preview-ui:hover .animation-remove-button {
  display: flex;
}

.timeline-controls-resizer {
  position: absolute;
  width: 6px;
  height: 100%;
  left: var(--timeline-controls-width);
  top: 104px;
  z-index: 3;
  /* We put this a bit to the left of the line to allow dragging
  the delay point of the keyframes */
  margin-left: -4px;
}

@media (forced-colors: active) {
  .animation-playback-rate-button.selected,
  .animation-playback-rate-button.selected:first-child,
  .animation-playback-rate-button.selected:first-child:focus-visible,
  .animation-playback-rate-button:focus-visible {
    forced-color-adjust: none;
    color: HighlightText;
    background-color: Highlight;
  }

  .animation-node-description:focus-visible {
    background-color: var(--sys-color-cdt-base-container);
    forced-color-adjust: none;
  }

  .monospace {
    forced-color-adjust: auto;
  }
}

/*# sourceURL=${import.meta.resolve("./animationTimeline.css")} */`;

// gen/front_end/panels/animation/AnimationTimeline.js
var UIStrings = {
  /**
   * @description Timeline hint text content in Animation Timeline of the Animation Inspector if no effect
   * is shown.
   * Animation effects are the visual effects of an animation on the page.
   */
  noEffectSelected: "No animation effect selected",
  /**
   * @description Timeline hint text content in Animation Timeline of the Animation Inspector that instructs
   * users to select an effect.
   * Animation effects are the visual effects of an animation on the page.
   */
  selectAnEffectAboveToInspectAnd: "Select an effect above to inspect and modify",
  /**
   * @description Text to clear everything
   */
  clearAll: "Clear all",
  /**
   * @description Tooltip text that appears when hovering over largeicon pause button in Animation Timeline of the Animation Inspector
   */
  pauseAll: "Pause all",
  /**
   * @description Title of the playback rate button listbox
   */
  playbackRates: "Playback rates",
  /**
   * @description Text in Animation Timeline of the Animation Inspector
   * @example {50} PH1
   */
  playbackRatePlaceholder: "{PH1}%",
  /**
   * @description Text of an item that pause the running task
   */
  pause: "Pause",
  /**
   * @description Button title in Animation Timeline of the Animation Inspector
   * @example {50%} PH1
   */
  setSpeedToS: "Set speed to {PH1}",
  /**
   * @description Title of Animation Previews listbox
   */
  animationPreviews: "Animation previews",
  /**
   * @description Empty buffer hint text content in Animation Timeline of the Animation Inspector.
   */
  waitingForAnimations: "Currently waiting for animations",
  /**
   * @description Empty buffer hint text content in Animation Timeline of the Animation Inspector that explains the panel.
   */
  animationDescription: "On this page you can inspect and modify animations.",
  /**
   * @description Tooltip text that appears when hovering over largeicon replay animation button in Animation Timeline of the Animation Inspector
   */
  replayTimeline: "Replay timeline",
  /**
   * @description Text in Animation Timeline of the Animation Inspector
   */
  resumeAll: "Resume all",
  /**
   * @description Title of control button in animation timeline of the animation inspector
   */
  playTimeline: "Play timeline",
  /**
   * @description Title of control button in animation timeline of the animation inspector
   */
  pauseTimeline: "Pause timeline",
  /**
   * @description Title of a specific Animation Preview
   * @example {1} PH1
   */
  animationPreviewS: "Animation Preview {PH1}"
};
var str_ = i18n.i18n.registerUIStrings("panels/animation/AnimationTimeline.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var { render, html, Directives: { classMap } } = Lit;
var nodeUIsByNode = /* @__PURE__ */ new WeakMap();
var MIN_TIMELINE_CONTROLS_WIDTH = 120;
var DEFAULT_TIMELINE_CONTROLS_WIDTH = 150;
var MAX_TIMELINE_CONTROLS_WIDTH = 720;
var ANIMATION_EXPLANATION_URL = "https://developer.chrome.com/docs/devtools/css/animations";
var DEFAULT_TOOLBAR_VIEW = (input, output, target) => {
  const renderPlaybackRateControl = () => {
    const focusNextPlaybackRateButton = (eventTarget, focusPrevious) => {
      const currentPlaybackRateButton = eventTarget;
      const currentPlaybackRate = Number(currentPlaybackRateButton.dataset.playbackRate);
      if (Number.isNaN(currentPlaybackRate)) {
        return;
      }
      const currentIndex = GlobalPlaybackRates.indexOf(currentPlaybackRate);
      const nextIndex = focusPrevious ? currentIndex - 1 : currentIndex + 1;
      if (nextIndex < 0 || nextIndex >= GlobalPlaybackRates.length) {
        return;
      }
      const nextPlaybackRate = GlobalPlaybackRates[nextIndex];
      const nextPlaybackRateButton = target.querySelector(`[data-playback-rate="${nextPlaybackRate}"]`);
      if (!nextPlaybackRateButton) {
        return;
      }
      currentPlaybackRateButton.tabIndex = -1;
      nextPlaybackRateButton.tabIndex = 0;
      nextPlaybackRateButton.focus();
    };
    const handleKeyDown = (event) => {
      const keyboardEvent = event;
      switch (keyboardEvent.key) {
        case "ArrowLeft":
        case "ArrowUp":
          focusNextPlaybackRateButton(
            event.target,
            /* focusPrevious */
            true
          );
          break;
        case "ArrowRight":
        case "ArrowDown":
          focusNextPlaybackRateButton(event.target);
          break;
      }
    };
    return html`
      <div class="animation-playback-rate-control" role="listbox" aria-label=${i18nString(UIStrings.playbackRates)} @keydown=${handleKeyDown}>
        ${GlobalPlaybackRates.map((playbackRate) => {
      const isSelected = input.selectedPlaybackRate === playbackRate;
      const textContent = playbackRate ? i18nString(UIStrings.playbackRatePlaceholder, { PH1: playbackRate * 100 }) : i18nString(UIStrings.pause);
      return html`
            <button jslog=${VisualLogging.action().context(`animations.playback-rate-${playbackRate * 100}`).track({
        click: true,
        keydown: "ArrowUp|ArrowDown|ArrowLeft|ArrowRight"
      })}
            data-playback-rate=${playbackRate}
            .disabled=${input.playbackRateButtonsDisabled}
            class=${classMap({
        "animation-playback-rate-button": true,
        selected: isSelected
      })}
            tabindex=${isSelected ? 0 : -1}
            role="option"
            title=${i18nString(UIStrings.setSpeedToS, { PH1: textContent })}
            @click=${() => input.onSetPlaybackRateClick(playbackRate)}>
            ${textContent}
          </button>
          `;
    })}
      </div>
    `;
  };
  render(html`
    <div class="animation-timeline-toolbar-container" role="toolbar" jslog=${VisualLogging.toolbar()}>
      <devtools-toolbar class="animation-timeline-toolbar" role="presentation">
        <devtools-button
          title=${i18nString(UIStrings.clearAll)}
          aria-label=${i18nString(UIStrings.clearAll)}
          .iconName=${"clear"}
          .jslogContext=${"animations.clear"}
          .variant=${"toolbar"}
          @click=${input.onClearClick}>
        </devtools-button>
        <div class="toolbar-divider"></div>
        <devtools-button
          title=${i18nString(UIStrings.pauseAll)}
          aria-label=${i18nString(UIStrings.pauseAll)}
          jslog=${/* Do not use `.jslogContext` here because we want this to be reported as Toggle */
  VisualLogging.toggle().track({ click: true }).context("animations.pause-resume-all")}
          .iconName=${"pause"}
          .toggledIconName=${"resume"}
          .variant=${"icon_toggle"}
          .toggleType=${"primary-toggle"}
          .toggled=${input.allPaused}
          @click=${input.onTogglePauseAllClick}>
        </devtools-button>
      </devtools-toolbar>
      ${renderPlaybackRateControl()}
    </div>
  `, target, { host: target });
};
var DEFAULT_DURATION = 100;
var animationTimelineInstance;
var AnimationTimeline = class _AnimationTimeline extends UI.Widget.VBox {
  #gridWrapper;
  #grid;
  #playbackRate;
  #allPaused;
  #animationsContainer;
  #previewContainer;
  #timelineScrubber;
  #currentTime;
  #clearButton;
  #selectedGroup;
  #renderQueue;
  #duration;
  #timelineControlsWidth;
  #nodesMap;
  #uiAnimations;
  #groupBuffer;
  #previewMap;
  #animationsMap;
  #timelineScrubberLine;
  #pauseButton;
  #controlButton;
  #controlState;
  #redrawing;
  #cachedTimelineWidth;
  #scrubberPlayer;
  #gridOffsetLeft;
  #originalScrubberTime;
  #animationGroupPausedBeforeScrub;
  #originalMousePosition;
  #timelineControlsResizer;
  #gridHeader;
  #scrollListenerId;
  #collectedGroups;
  #createPreviewForCollectedGroupsThrottler = new Common.Throttler.Throttler(10);
  #animationGroupUpdatedThrottler = new Common.Throttler.Throttler(10);
  /** Container & state for rendering `toolbarView` */
  #toolbarViewContainer;
  #toolbarView;
  #playbackRateButtonsDisabled = false;
  constructor(toolbarView = DEFAULT_TOOLBAR_VIEW) {
    super({
      jslog: `${VisualLogging.panel("animations").track({ resize: true })}`,
      useShadowDom: true
    });
    this.registerRequiredCSS(animationTimeline_css_default);
    this.#toolbarView = toolbarView;
    this.element.classList.add("animations-timeline");
    this.#timelineControlsResizer = this.contentElement.createChild("div", "timeline-controls-resizer");
    this.#gridWrapper = this.contentElement.createChild("div", "grid-overflow-wrapper");
    this.#grid = UI.UIUtils.createSVGChild(this.#gridWrapper, "svg", "animation-timeline-grid");
    this.#playbackRate = 1;
    this.#allPaused = false;
    this.#animationGroupPausedBeforeScrub = false;
    this.#toolbarViewContainer = this.contentElement.createChild("div", "toolbar-view-container");
    this.createHeader();
    this.#animationsContainer = this.contentElement.createChild("div", "animation-timeline-rows");
    this.#animationsContainer.setAttribute("jslog", `${VisualLogging.section("animations")}`);
    const emptyBufferHint = this.contentElement.createChild("div", "animation-timeline-buffer-hint");
    const noAnimationsPlaceholder = new UI.EmptyWidget.EmptyWidget(i18nString(UIStrings.waitingForAnimations), i18nString(UIStrings.animationDescription));
    noAnimationsPlaceholder.link = ANIMATION_EXPLANATION_URL;
    noAnimationsPlaceholder.show(emptyBufferHint);
    const timelineHint = this.contentElement.createChild("div", "animation-timeline-rows-hint");
    const noEffectSelectedPlaceholder = new UI.EmptyWidget.EmptyWidget(i18nString(UIStrings.noEffectSelected), i18nString(UIStrings.selectAnEffectAboveToInspectAnd));
    noEffectSelectedPlaceholder.show(timelineHint);
    this.#duration = DEFAULT_DURATION;
    this.#nodesMap = /* @__PURE__ */ new Map();
    this.#uiAnimations = [];
    this.#groupBuffer = [];
    this.#collectedGroups = [];
    this.#previewMap = /* @__PURE__ */ new Map();
    this.#animationsMap = /* @__PURE__ */ new Map();
    this.#timelineControlsWidth = DEFAULT_TIMELINE_CONTROLS_WIDTH;
    this.element.style.setProperty("--timeline-controls-width", `${this.#timelineControlsWidth}px`);
    SDK.TargetManager.TargetManager.instance().addModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.NodeRemoved, (ev) => this.markNodeAsRemoved(ev.data.node), this, { scoped: true });
    SDK.TargetManager.TargetManager.instance().observeModels(SDK.AnimationModel.AnimationModel, this, { scoped: true });
    UI.Context.Context.instance().addFlavorChangeListener(SDK.DOMModel.DOMNode, this.nodeChanged, this);
    this.#setupTimelineControlsResizer();
    this.performToolbarViewUpdate();
  }
  static instance(opts) {
    if (!animationTimelineInstance || opts?.forceNew) {
      animationTimelineInstance = new _AnimationTimeline();
    }
    return animationTimelineInstance;
  }
  #setupTimelineControlsResizer() {
    let resizeOriginX = void 0;
    UI.UIUtils.installDragHandle(this.#timelineControlsResizer, (ev) => {
      resizeOriginX = ev.clientX;
      return true;
    }, (ev) => {
      if (resizeOriginX === void 0) {
        return;
      }
      const newWidth = this.#timelineControlsWidth + ev.clientX - resizeOriginX;
      this.#timelineControlsWidth = Math.min(Math.max(newWidth, MIN_TIMELINE_CONTROLS_WIDTH), MAX_TIMELINE_CONTROLS_WIDTH);
      resizeOriginX = ev.clientX;
      this.element.style.setProperty("--timeline-controls-width", this.#timelineControlsWidth + "px");
      this.onResize();
    }, () => {
      resizeOriginX = void 0;
    }, "ew-resize");
  }
  get previewMap() {
    return this.#previewMap;
  }
  get uiAnimations() {
    return this.#uiAnimations;
  }
  get groupBuffer() {
    return this.#groupBuffer;
  }
  wasShown() {
    super.wasShown();
    for (const animationModel of SDK.TargetManager.TargetManager.instance().models(SDK.AnimationModel.AnimationModel, { scoped: true })) {
      this.#addExistingAnimationGroups(animationModel);
      this.addEventListeners(animationModel);
    }
  }
  willHide() {
    super.willHide();
    for (const animationModel of SDK.TargetManager.TargetManager.instance().models(SDK.AnimationModel.AnimationModel, { scoped: true })) {
      this.removeEventListeners(animationModel);
    }
  }
  #addExistingAnimationGroups(animationModel) {
    for (const animationGroup of animationModel.animationGroups.values()) {
      if (this.#previewMap.has(animationGroup)) {
        continue;
      }
      void this.addAnimationGroup(animationGroup);
    }
  }
  #showPanelInDrawer() {
    const viewManager = UI.ViewManager.ViewManager.instance();
    viewManager.moveView("animations", "drawer-view", {
      shouldSelectTab: true,
      overrideSaving: true
    });
  }
  async revealAnimationGroup(animationGroup) {
    if (!this.#previewMap.has(animationGroup)) {
      await this.addAnimationGroup(animationGroup);
    }
    this.#showPanelInDrawer();
    return await this.selectAnimationGroup(animationGroup);
  }
  modelAdded(animationModel) {
    if (this.isShowing()) {
      this.addEventListeners(animationModel);
    }
  }
  modelRemoved(animationModel) {
    this.removeEventListeners(animationModel);
  }
  addEventListeners(animationModel) {
    animationModel.addEventListener(SDK.AnimationModel.Events.AnimationGroupStarted, this.animationGroupStarted, this);
    animationModel.addEventListener(SDK.AnimationModel.Events.AnimationGroupUpdated, this.animationGroupUpdated, this);
    animationModel.addEventListener(SDK.AnimationModel.Events.ModelReset, this.reset, this);
  }
  removeEventListeners(animationModel) {
    animationModel.removeEventListener(SDK.AnimationModel.Events.AnimationGroupStarted, this.animationGroupStarted, this);
    animationModel.removeEventListener(SDK.AnimationModel.Events.AnimationGroupUpdated, this.animationGroupUpdated, this);
    animationModel.removeEventListener(SDK.AnimationModel.Events.ModelReset, this.reset, this);
  }
  nodeChanged() {
    for (const nodeUI of this.#nodesMap.values()) {
      nodeUI.nodeChanged();
    }
  }
  createScrubber() {
    this.#timelineScrubber = document.createElement("div");
    this.#timelineScrubber.classList.add("animation-scrubber");
    this.#timelineScrubber.classList.add("hidden");
    this.#timelineScrubberLine = this.#timelineScrubber.createChild("div", "animation-scrubber-line");
    this.#timelineScrubberLine.createChild("div", "animation-scrubber-head");
    this.#timelineScrubber.createChild("div", "animation-time-overlay");
    return this.#timelineScrubber;
  }
  performToolbarViewUpdate() {
    this.#toolbarView({
      selectedPlaybackRate: this.#playbackRate,
      playbackRateButtonsDisabled: this.#playbackRateButtonsDisabled,
      allPaused: this.#allPaused,
      onClearClick: () => {
        Host.userMetrics.actionTaken(Host.UserMetrics.Action.AnimationGroupsCleared);
        this.reset();
      },
      onTogglePauseAllClick: () => {
        this.#allPaused = !this.#allPaused;
        Host.userMetrics.actionTaken(this.#allPaused ? Host.UserMetrics.Action.AnimationsPaused : Host.UserMetrics.Action.AnimationsResumed);
        this.setPlaybackRate(this.#playbackRate);
        if (this.#pauseButton) {
          this.#pauseButton.setTitle(this.#allPaused ? i18nString(UIStrings.resumeAll) : i18nString(UIStrings.pauseAll));
        }
      },
      onSetPlaybackRateClick: (playbackRate) => {
        this.setPlaybackRate(playbackRate);
      }
    }, void 0, this.#toolbarViewContainer);
  }
  createHeader() {
    this.#previewContainer = this.contentElement.createChild("div", "animation-timeline-buffer");
    this.#previewContainer.setAttribute("jslog", `${VisualLogging.section("film-strip")}`);
    UI.ARIAUtils.markAsListBox(this.#previewContainer);
    UI.ARIAUtils.setLabel(this.#previewContainer, i18nString(UIStrings.animationPreviews));
    const container = this.contentElement.createChild("div", "animation-timeline-header");
    const controls = container.createChild("div", "animation-controls");
    this.#currentTime = controls.createChild("div", "animation-timeline-current-time monospace");
    const toolbar2 = controls.createChild("devtools-toolbar", "animation-controls-toolbar");
    this.#controlButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.replayTimeline), "replay", void 0, "animations.play-replay-pause-animation-group");
    this.#controlButton.element.classList.add("toolbar-state-on");
    this.#controlState = "replay-outline";
    this.#controlButton.addEventListener("Click", this.controlButtonToggle.bind(this));
    toolbar2.appendToolbarItem(this.#controlButton);
    this.#gridHeader = container.createChild("div", "animation-grid-header");
    this.#gridHeader.setAttribute("jslog", `${VisualLogging.timeline("animations.grid-header").track({ drag: true, click: true })}`);
    UI.UIUtils.installDragHandle(this.#gridHeader, this.scrubberDragStart.bind(this), this.scrubberDragMove.bind(this), this.scrubberDragEnd.bind(this), null);
    this.#gridWrapper.appendChild(this.createScrubber());
    this.clearCurrentTimeText();
    return container;
  }
  setPlaybackRate(playbackRate) {
    if (playbackRate !== this.#playbackRate) {
      Host.userMetrics.animationPlaybackRateChanged(
        playbackRate === 0.1 ? 2 : playbackRate === 0.25 ? 1 : playbackRate === 1 ? 0 : 3
        /* Host.UserMetrics.AnimationsPlaybackRate.OTHER */
      );
    }
    this.#playbackRate = playbackRate;
    for (const animationModel of SDK.TargetManager.TargetManager.instance().models(SDK.AnimationModel.AnimationModel, { scoped: true })) {
      animationModel.setPlaybackRate(this.#allPaused ? 0 : this.#playbackRate);
    }
    Host.userMetrics.actionTaken(Host.UserMetrics.Action.AnimationsPlaybackRateChanged);
    if (this.#scrubberPlayer) {
      this.#scrubberPlayer.playbackRate = this.effectivePlaybackRate();
    }
    this.performToolbarViewUpdate();
  }
  controlButtonToggle() {
    if (this.#controlState === "play-outline") {
      this.togglePause(false);
    } else if (this.#controlState === "replay-outline") {
      Host.userMetrics.actionTaken(Host.UserMetrics.Action.AnimationGroupReplayed);
      this.replay();
    } else {
      this.togglePause(true);
    }
  }
  updateControlButton() {
    if (!this.#controlButton) {
      return;
    }
    this.#controlButton.setEnabled(Boolean(this.#selectedGroup) && this.hasAnimationGroupActiveNodes() && !this.#selectedGroup?.isScrollDriven());
    if (this.#selectedGroup && this.#selectedGroup.paused()) {
      this.#controlState = "play-outline";
      this.#controlButton.element.classList.toggle("toolbar-state-on", true);
      this.#controlButton.setTitle(i18nString(UIStrings.playTimeline));
      this.#controlButton.setGlyph("play");
    } else if (!this.#scrubberPlayer || !this.#scrubberPlayer.currentTime || typeof this.#scrubberPlayer.currentTime !== "number" || this.#scrubberPlayer.currentTime >= this.duration()) {
      this.#controlState = "replay-outline";
      this.#controlButton.element.classList.toggle("toolbar-state-on", true);
      this.#controlButton.setTitle(i18nString(UIStrings.replayTimeline));
      this.#controlButton.setGlyph("replay");
    } else {
      this.#controlState = "pause-outline";
      this.#controlButton.element.classList.toggle("toolbar-state-on", false);
      this.#controlButton.setTitle(i18nString(UIStrings.pauseTimeline));
      this.#controlButton.setGlyph("pause");
    }
  }
  effectivePlaybackRate() {
    return this.#allPaused || this.#selectedGroup && this.#selectedGroup.paused() ? 0 : this.#playbackRate;
  }
  togglePause(pause) {
    if (this.#selectedGroup) {
      this.#selectedGroup.togglePause(pause);
      const preview = this.#previewMap.get(this.#selectedGroup);
      if (preview) {
        preview.setPaused(pause);
      }
    }
    if (this.#scrubberPlayer) {
      this.#scrubberPlayer.playbackRate = this.effectivePlaybackRate();
    }
    this.updateControlButton();
  }
  replay() {
    if (!this.#selectedGroup || !this.hasAnimationGroupActiveNodes() || this.#selectedGroup.isScrollDriven()) {
      return;
    }
    this.#selectedGroup.seekTo(0);
    this.animateTime(0);
    this.updateControlButton();
  }
  duration() {
    return this.#duration;
  }
  setDuration(duration) {
    this.#duration = duration;
    this.scheduleRedraw();
  }
  clearTimeline() {
    if (this.#selectedGroup && this.#scrollListenerId) {
      void this.#selectedGroup.scrollNode().then((node) => {
        void node?.removeScrollEventListener(this.#scrollListenerId);
        this.#scrollListenerId = void 0;
      });
    }
    this.#uiAnimations = [];
    this.#nodesMap.clear();
    this.#animationsMap.clear();
    this.#animationsContainer.removeChildren();
    this.#duration = DEFAULT_DURATION;
    this.#timelineScrubber.classList.add("hidden");
    this.#gridHeader.classList.remove("scrubber-enabled");
    this.#selectedGroup = null;
    if (this.#scrubberPlayer) {
      this.#scrubberPlayer.cancel();
    }
    this.#scrubberPlayer = void 0;
    this.clearCurrentTimeText();
    this.updateControlButton();
  }
  reset() {
    this.clearTimeline();
    this.setPlaybackRate(this.#playbackRate);
    for (const group of this.#groupBuffer) {
      group.release();
    }
    this.#groupBuffer = [];
    this.clearPreviews();
    this.renderGrid();
  }
  animationGroupStarted({ data }) {
    void this.addAnimationGroup(data);
  }
  scheduledRedrawAfterAnimationGroupUpdatedForTest() {
  }
  animationGroupUpdated({ data: group }) {
    void this.#animationGroupUpdatedThrottler.schedule(async () => {
      const preview = this.#previewMap.get(group);
      if (preview) {
        preview.replay();
      }
      if (this.#selectedGroup !== group) {
        return;
      }
      if (group.isScrollDriven()) {
        const animationNode = await group.scrollNode();
        if (animationNode) {
          const scrollRange = group.scrollOrientation() === "vertical" ? await animationNode.verticalScrollRange() : await animationNode.horizontalScrollRange();
          const scrollOffset = group.scrollOrientation() === "vertical" ? await animationNode.scrollTop() : await animationNode.scrollLeft();
          if (scrollRange !== null) {
            this.setDuration(scrollRange);
          }
          if (scrollOffset !== null) {
            this.setCurrentTimeText(scrollOffset);
            this.setTimelineScrubberPosition(scrollOffset);
          }
        }
      } else {
        this.setDuration(group.finiteDuration());
      }
      this.updateControlButton();
      this.scheduleRedraw();
      this.scheduledRedrawAfterAnimationGroupUpdatedForTest();
    });
  }
  clearPreviews() {
    this.#previewMap.clear();
    this.#previewContainer.removeChildren();
  }
  createPreview(group) {
    const preview = new AnimationGroupPreviewUI({
      animationGroup: group,
      label: i18nString(UIStrings.animationPreviewS, { PH1: this.#groupBuffer.length + 1 }),
      onRemoveAnimationGroup: () => {
        this.removeAnimationGroup(group);
      },
      onSelectAnimationGroup: () => {
        void this.selectAnimationGroup(group);
      },
      onFocusNextGroup: () => {
        this.focusNextGroup(group);
      },
      onFocusPreviousGroup: () => {
        this.focusNextGroup(
          group,
          /* focusPrevious */
          true
        );
      }
    });
    const previewUiContainer = document.createElement("div");
    previewUiContainer.classList.add("preview-ui-container");
    preview.markAsRoot();
    preview.show(previewUiContainer);
    this.#groupBuffer.push(group);
    this.#previewMap.set(group, preview);
    this.#previewContainer.appendChild(previewUiContainer);
    if (this.#previewMap.size === 1) {
      const preview2 = this.#previewMap.get(this.#groupBuffer[0]);
      if (preview2) {
        preview2.setFocusable(true);
      }
    }
  }
  previewsCreatedForTest() {
  }
  scrubberOnFinishForTest() {
  }
  createPreviewForCollectedGroups() {
    this.#collectedGroups.sort((a, b) => {
      if (a.isScrollDriven() && !b.isScrollDriven()) {
        return -1;
      }
      if (!a.isScrollDriven() && b.isScrollDriven()) {
        return 1;
      }
      if (a.startTime() !== b.startTime()) {
        return a.startTime() - b.startTime();
      }
      return a.animations.length - b.animations.length;
    });
    for (const group of this.#collectedGroups) {
      this.createPreview(group);
    }
    this.#collectedGroups = [];
    this.previewsCreatedForTest();
  }
  addAnimationGroup(group) {
    const previewGroup = this.#previewMap.get(group);
    if (previewGroup) {
      if (this.#selectedGroup === group) {
        this.syncScrubber();
      } else {
        previewGroup.replay();
      }
      return Promise.resolve();
    }
    this.#groupBuffer.sort((left, right) => left.startTime() - right.startTime());
    const groupsToDiscard = [];
    const bufferSize = this.width() / 50;
    while (this.#groupBuffer.length > bufferSize) {
      const toDiscard = this.#groupBuffer.splice(this.#groupBuffer[0] === this.#selectedGroup ? 1 : 0, 1);
      groupsToDiscard.push(toDiscard[0]);
    }
    for (const g of groupsToDiscard) {
      const discardGroup = this.#previewMap.get(g);
      if (!discardGroup) {
        continue;
      }
      discardGroup.detach();
      this.#previewMap.delete(g);
      g.release();
    }
    this.#collectedGroups.push(group);
    return this.#createPreviewForCollectedGroupsThrottler.schedule(() => Promise.resolve(this.createPreviewForCollectedGroups()));
  }
  focusNextGroup(group, focusPrevious) {
    const currentGroupIndex = this.#groupBuffer.indexOf(group);
    const nextIndex = focusPrevious ? currentGroupIndex - 1 : currentGroupIndex + 1;
    if (nextIndex < 0 || nextIndex >= this.#groupBuffer.length) {
      return;
    }
    const preview = this.#previewMap.get(this.#groupBuffer[nextIndex]);
    if (preview) {
      preview.setFocusable(true);
      preview.focus();
    }
    const previousPreview = this.#previewMap.get(group);
    if (previousPreview) {
      previousPreview.setFocusable(false);
    }
  }
  removeAnimationGroup(group) {
    const currentGroupIndex = this.#groupBuffer.indexOf(group);
    Platform.ArrayUtilities.removeElement(this.#groupBuffer, group);
    const previewGroup = this.#previewMap.get(group);
    if (previewGroup) {
      previewGroup.detach();
    }
    this.#previewMap.delete(group);
    group.release();
    if (this.#selectedGroup === group) {
      this.clearTimeline();
      this.renderGrid();
    }
    const groupLength = this.#groupBuffer.length;
    if (groupLength === 0) {
      this.#clearButton.element.focus();
      return;
    }
    const nextGroup = currentGroupIndex >= this.#groupBuffer.length ? this.#previewMap.get(this.#groupBuffer[this.#groupBuffer.length - 1]) : this.#previewMap.get(this.#groupBuffer[currentGroupIndex]);
    if (nextGroup) {
      nextGroup.setFocusable(true);
      nextGroup.focus();
    }
  }
  clearCurrentTimeText() {
    this.#currentTime.textContent = "";
  }
  setCurrentTimeText(time) {
    if (!this.#selectedGroup) {
      return;
    }
    this.#currentTime.textContent = this.#selectedGroup?.isScrollDriven() ? `${time.toFixed(0)}px` : i18n.TimeUtilities.millisToString(time);
  }
  async selectAnimationGroup(group) {
    if (this.#selectedGroup === group) {
      this.togglePause(false);
      this.replay();
      return;
    }
    this.clearTimeline();
    this.#selectedGroup = group;
    this.#previewMap.forEach((previewUI, group2) => {
      previewUI.setSelected(this.#selectedGroup === group2);
    });
    if (group.isScrollDriven()) {
      const animationNode = await group.scrollNode();
      if (!animationNode) {
        throw new Error("Scroll container is not found for the scroll driven animation");
      }
      const scrollRange = group.scrollOrientation() === "vertical" ? await animationNode.verticalScrollRange() : await animationNode.horizontalScrollRange();
      const scrollOffset = group.scrollOrientation() === "vertical" ? await animationNode.scrollTop() : await animationNode.scrollLeft();
      if (typeof scrollRange !== "number" || typeof scrollOffset !== "number") {
        throw new Error("Scroll range or scroll offset is not resolved for the scroll driven animation");
      }
      this.#scrollListenerId = await animationNode.addScrollEventListener(({ scrollTop, scrollLeft }) => {
        const offset = group.scrollOrientation() === "vertical" ? scrollTop : scrollLeft;
        this.setCurrentTimeText(offset);
        this.setTimelineScrubberPosition(offset);
      });
      this.setDuration(scrollRange);
      this.setCurrentTimeText(scrollOffset);
      this.setTimelineScrubberPosition(scrollOffset);
      if (this.#pauseButton) {
        this.#pauseButton.setEnabled(false);
      }
      this.#playbackRateButtonsDisabled = true;
      this.performToolbarViewUpdate();
    } else {
      this.setDuration(group.finiteDuration());
      if (this.#pauseButton) {
        this.#pauseButton.setEnabled(true);
      }
      this.#playbackRateButtonsDisabled = false;
      this.performToolbarViewUpdate();
    }
    await Promise.all(group.animations().map((anim) => this.addAnimation(anim)));
    this.scheduleRedraw();
    this.togglePause(false);
    this.replay();
    if (this.hasAnimationGroupActiveNodes()) {
      this.#timelineScrubber.classList.remove("hidden");
      this.#gridHeader.classList.add("scrubber-enabled");
    }
    Host.userMetrics.actionTaken(Host.UserMetrics.Action.AnimationGroupSelected);
    if (this.#selectedGroup.isScrollDriven()) {
      Host.userMetrics.actionTaken(Host.UserMetrics.Action.ScrollDrivenAnimationGroupSelected);
    }
    this.animationGroupSelectedForTest();
  }
  animationGroupSelectedForTest() {
  }
  async addAnimation(animation) {
    let nodeUI = this.#nodesMap.get(animation.source().backendNodeId());
    if (!nodeUI) {
      nodeUI = new NodeUI(animation.source());
      this.#animationsContainer.appendChild(nodeUI.element);
      this.#nodesMap.set(animation.source().backendNodeId(), nodeUI);
    }
    const nodeRow = nodeUI.createNewRow();
    const uiAnimation = new AnimationUI(animation, this, nodeRow);
    const node = await animation.source().deferredNode().resolvePromise();
    uiAnimation.setNode(node);
    if (node && nodeUI) {
      nodeUI.nodeResolved(node);
      nodeUIsByNode.set(node, nodeUI);
    }
    this.#uiAnimations.push(uiAnimation);
    this.#animationsMap.set(animation.id(), animation);
  }
  markNodeAsRemoved(node) {
    nodeUIsByNode.get(node)?.nodeRemoved();
    for (const pseudoElements of node.pseudoElements().values()) {
      pseudoElements.forEach((pseudoElement) => this.markNodeAsRemoved(pseudoElement));
    }
    node.children()?.forEach((child) => {
      this.markNodeAsRemoved(child);
    });
    if (!this.hasAnimationGroupActiveNodes()) {
      this.#gridHeader.classList.remove("scrubber-enabled");
      this.#timelineScrubber.classList.add("hidden");
      this.#scrubberPlayer?.cancel();
      this.#scrubberPlayer = void 0;
      this.clearCurrentTimeText();
      this.updateControlButton();
    }
  }
  hasAnimationGroupActiveNodes() {
    for (const nodeUI of this.#nodesMap.values()) {
      if (nodeUI.hasActiveNode()) {
        return true;
      }
    }
    return false;
  }
  renderGrid() {
    const isScrollDriven = this.#selectedGroup?.isScrollDriven();
    const gridSize = isScrollDriven ? this.duration() / 10 : 250;
    this.#grid.removeChildren();
    let lastDraw = void 0;
    for (let time = 0; time < this.duration(); time += gridSize) {
      const line = UI.UIUtils.createSVGChild(this.#grid, "rect", "animation-timeline-grid-line");
      line.setAttribute("x", (time * this.pixelTimeRatio() + 10).toString());
      line.setAttribute("y", "23");
      line.setAttribute("height", "100%");
      line.setAttribute("width", "1");
    }
    for (let time = 0; time < this.duration(); time += gridSize) {
      const gridWidth = time * this.pixelTimeRatio();
      if (lastDraw === void 0 || gridWidth - lastDraw > 50) {
        lastDraw = gridWidth;
        const label = UI.UIUtils.createSVGChild(this.#grid, "text", "animation-timeline-grid-label");
        label.textContent = isScrollDriven ? `${time.toFixed(0)}px` : i18n.TimeUtilities.millisToString(time);
        label.setAttribute("x", (gridWidth + 12).toString());
        label.setAttribute("y", "16");
      }
    }
  }
  scheduleRedraw() {
    this.renderGrid();
    this.#renderQueue = [];
    for (const ui of this.#uiAnimations) {
      this.#renderQueue.push(ui);
    }
    if (this.#redrawing) {
      return;
    }
    this.#redrawing = true;
    this.#animationsContainer.window().requestAnimationFrame(this.render.bind(this));
  }
  render(timestamp) {
    while (this.#renderQueue.length && (!timestamp || window.performance.now() - timestamp < 50)) {
      const animationUI = this.#renderQueue.shift();
      if (animationUI) {
        animationUI.redraw();
      }
    }
    if (this.#renderQueue.length) {
      this.#animationsContainer.window().requestAnimationFrame(this.render.bind(this));
    } else {
      this.#redrawing = void 0;
    }
  }
  onResize() {
    this.#cachedTimelineWidth = Math.max(0, this.contentElement.offsetWidth - this.#timelineControlsWidth) || 0;
    this.scheduleRedraw();
    if (this.#scrubberPlayer) {
      this.syncScrubber();
    }
    this.#gridOffsetLeft = void 0;
  }
  width() {
    return this.#cachedTimelineWidth || 0;
  }
  syncScrubber() {
    if (!this.#selectedGroup || !this.hasAnimationGroupActiveNodes()) {
      return;
    }
    void this.#selectedGroup.currentTimePromise().then(this.animateTime.bind(this)).then(this.updateControlButton.bind(this));
  }
  animateTime(currentTime) {
    if (this.#selectedGroup?.isScrollDriven()) {
      return;
    }
    if (this.#scrubberPlayer) {
      this.#scrubberPlayer.cancel();
    }
    this.#scrubberPlayer = this.#timelineScrubber.animate([{ transform: "translateX(0px)" }, { transform: "translateX(" + this.width() + "px)" }], { duration: this.duration(), fill: "forwards" });
    this.#scrubberPlayer.playbackRate = this.effectivePlaybackRate();
    this.#scrubberPlayer.onfinish = () => {
      this.updateControlButton();
      this.scrubberOnFinishForTest();
    };
    this.#scrubberPlayer.currentTime = currentTime;
    this.element.window().requestAnimationFrame(this.updateScrubber.bind(this));
  }
  pixelTimeRatio() {
    return this.width() / this.duration() || 0;
  }
  updateScrubber(_timestamp) {
    if (!this.#scrubberPlayer) {
      return;
    }
    this.setCurrentTimeText(this.#scrubberCurrentTime());
    if (this.#scrubberPlayer.playState.toString() === "pending" || this.#scrubberPlayer.playState === "running") {
      this.element.window().requestAnimationFrame(this.updateScrubber.bind(this));
    }
  }
  scrubberDragStart(event) {
    if (!this.#selectedGroup || !this.hasAnimationGroupActiveNodes()) {
      return false;
    }
    if (!this.#gridOffsetLeft) {
      this.#gridOffsetLeft = this.#grid.getBoundingClientRect().left + 10;
    }
    const { x } = event;
    const seekTime = Math.max(0, x - this.#gridOffsetLeft) / this.pixelTimeRatio();
    this.#originalScrubberTime = seekTime;
    this.#originalMousePosition = x;
    this.setCurrentTimeText(seekTime);
    if (this.#selectedGroup.isScrollDriven()) {
      this.setTimelineScrubberPosition(seekTime);
      void this.updateScrollOffsetOnPage(seekTime);
    } else {
      const currentTime = this.#scrubberPlayer?.currentTime;
      this.#animationGroupPausedBeforeScrub = this.#selectedGroup.paused() || typeof currentTime === "number" && currentTime >= this.duration();
      this.#selectedGroup.seekTo(seekTime);
      this.togglePause(true);
      this.animateTime(seekTime);
    }
    return true;
  }
  async updateScrollOffsetOnPage(offset) {
    const node = await this.#selectedGroup?.scrollNode();
    if (!node) {
      return;
    }
    if (this.#selectedGroup?.scrollOrientation() === "vertical") {
      return await node.setScrollTop(offset);
    }
    return await node.setScrollLeft(offset);
  }
  setTimelineScrubberPosition(time) {
    this.#timelineScrubber.style.transform = `translateX(${time * this.pixelTimeRatio()}px)`;
  }
  scrubberDragMove(event) {
    const { x } = event;
    const delta = x - (this.#originalMousePosition || 0);
    const currentTime = Math.max(0, Math.min((this.#originalScrubberTime || 0) + delta / this.pixelTimeRatio(), this.duration()));
    if (this.#scrubberPlayer) {
      this.#scrubberPlayer.currentTime = currentTime;
    } else {
      this.setTimelineScrubberPosition(currentTime);
      void this.updateScrollOffsetOnPage(currentTime);
    }
    this.setCurrentTimeText(currentTime);
    if (this.#selectedGroup && !this.#selectedGroup.isScrollDriven()) {
      this.#selectedGroup.seekTo(currentTime);
    }
  }
  #scrubberCurrentTime() {
    return typeof this.#scrubberPlayer?.currentTime === "number" ? this.#scrubberPlayer.currentTime : 0;
  }
  scrubberDragEnd(_event) {
    if (this.#scrubberPlayer) {
      const currentTime = Math.max(0, this.#scrubberCurrentTime());
      this.#scrubberPlayer.play();
      this.#scrubberPlayer.currentTime = currentTime;
    }
    Host.userMetrics.actionTaken(Host.UserMetrics.Action.AnimationGroupScrubbed);
    if (this.#selectedGroup?.isScrollDriven()) {
      Host.userMetrics.actionTaken(Host.UserMetrics.Action.ScrollDrivenAnimationGroupScrubbed);
    }
    this.#currentTime.window().requestAnimationFrame(this.updateScrubber.bind(this));
    if (!this.#animationGroupPausedBeforeScrub) {
      this.togglePause(false);
    }
  }
};
var GlobalPlaybackRates = [1, 0.25, 0.1];
var NodeUI = class {
  element;
  #description;
  #timelineElement;
  #overlayElement;
  #node;
  constructor(_animationEffect) {
    this.element = document.createElement("div");
    this.element.classList.add("animation-node-row");
    this.#description = this.element.createChild("div", "animation-node-description");
    this.#description.setAttribute("jslog", `${VisualLogging.tableCell("description").track({ resize: true })}`);
    this.#timelineElement = this.element.createChild("div", "animation-node-timeline");
    this.#timelineElement.setAttribute("jslog", `${VisualLogging.tableCell("timeline").track({ resize: true })}`);
    UI.ARIAUtils.markAsApplication(this.#timelineElement);
  }
  nodeResolved(node) {
    if (!node) {
      UI.UIUtils.createTextChild(this.#description, "<node>");
      return;
    }
    this.#node = node;
    this.nodeChanged();
    void Common.Linkifier.Linkifier.linkify(node).then((link) => {
      link.addEventListener("click", () => {
        Host.userMetrics.actionTaken(Host.UserMetrics.Action.AnimatedNodeDescriptionClicked);
      });
      this.#description.appendChild(link);
    });
    if (!node.ownerDocument) {
      this.nodeRemoved();
    }
  }
  createNewRow() {
    return this.#timelineElement.createChild("div", "animation-timeline-row");
  }
  nodeRemoved() {
    this.element.classList.add("animation-node-removed");
    if (!this.#overlayElement) {
      this.#overlayElement = document.createElement("div");
      this.#overlayElement.classList.add("animation-node-removed-overlay");
      this.#description.appendChild(this.#overlayElement);
    }
    this.#node = null;
  }
  hasActiveNode() {
    return Boolean(this.#node);
  }
  nodeChanged() {
    let animationNodeSelected = false;
    if (this.#node) {
      animationNodeSelected = this.#node === UI.Context.Context.instance().flavor(SDK.DOMModel.DOMNode);
    }
    this.element.classList.toggle("animation-node-selected", animationNodeSelected);
  }
};
var StepTimingFunction = class _StepTimingFunction {
  steps;
  stepAtPosition;
  constructor(steps, stepAtPosition) {
    this.steps = steps;
    this.stepAtPosition = stepAtPosition;
  }
  static parse(text) {
    let match = text.match(/^steps\((\d+), (start|middle)\)$/);
    if (match) {
      return new _StepTimingFunction(parseInt(match[1], 10), match[2]);
    }
    match = text.match(/^steps\((\d+)\)$/);
    if (match) {
      return new _StepTimingFunction(parseInt(match[1], 10), "end");
    }
    return null;
  }
};
var AnimationGroupRevealer = class {
  async reveal(animationGroup) {
    await AnimationTimeline.instance().revealAnimationGroup(animationGroup);
  }
};

// gen/front_end/panels/animation/AnimationUI.js
var UIStrings2 = {
  /**
   * @description Title of the first and last points of an animation
   */
  animationEndpointSlider: "Animation Endpoint slider",
  /**
   * @description Title of an Animation Keyframe point
   */
  animationKeyframeSlider: "Animation Keyframe slider",
  /**
   * @description Title of an animation keyframe group
   * @example {anilogo} PH1
   */
  sSlider: "{PH1} slider"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/animation/AnimationUI.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
var AnimationUI = class _AnimationUI {
  #animation;
  #timeline;
  #keyframes;
  #nameElement;
  #svg;
  #activeIntervalGroup;
  #cachedElements = [];
  #movementInMs = 0;
  #keyboardMovementRateMs = 50;
  #color;
  #node;
  #delayLine;
  #endDelayLine;
  #tailGroup;
  #mouseEventType;
  #keyframeMoved;
  #downMouseX;
  constructor(animation, timeline2, parentElement) {
    this.#animation = animation;
    this.#timeline = timeline2;
    const keyframesRule = this.#animation.source().keyframesRule();
    if (keyframesRule) {
      this.#keyframes = keyframesRule.keyframes();
      if (animation.viewOrScrollTimeline() && animation.playbackRate() < 0) {
        this.#keyframes.reverse();
      }
    }
    this.#nameElement = parentElement.createChild("div", "animation-name");
    this.#nameElement.textContent = this.#animation.name();
    this.#svg = UI2.UIUtils.createSVGChild(parentElement, "svg", "animation-ui");
    this.#svg.setAttribute("height", Options.AnimationSVGHeight.toString());
    this.#svg.style.marginLeft = "-" + Options.AnimationMargin + "px";
    this.#svg.addEventListener("contextmenu", this.onContextMenu.bind(this));
    this.#activeIntervalGroup = UI2.UIUtils.createSVGChild(this.#svg, "g");
    this.#activeIntervalGroup.setAttribute("jslog", `${VisualLogging2.animationClip().track({ drag: true })}`);
    if (!this.#animation.viewOrScrollTimeline()) {
      UI2.UIUtils.installDragHandle(this.#activeIntervalGroup, this.mouseDown.bind(this, "AnimationDrag", null), this.mouseMove.bind(this), this.mouseUp.bind(this), "-webkit-grabbing", "-webkit-grab");
      _AnimationUI.installDragHandleKeyboard(this.#activeIntervalGroup, this.keydownMove.bind(this, "AnimationDrag", null));
    }
    this.#color = _AnimationUI.colorForAnimation(this.#animation);
  }
  static colorForAnimation(animation) {
    const names = Array.from(Colors.keys());
    const hashCode = Platform2.StringUtilities.hashCode(animation.name() || animation.id());
    const cappedHashCode = hashCode % names.length;
    const colorName = names[cappedHashCode];
    const color = Colors.get(colorName);
    if (!color) {
      throw new Error("Unable to locate color");
    }
    return color.asString(
      "rgb"
      /* Common.Color.Format.RGB */
    ) || "";
  }
  static installDragHandleKeyboard(element, elementDrag) {
    element.addEventListener("keydown", elementDrag, false);
  }
  animation() {
    return this.#animation;
  }
  get nameElement() {
    return this.#nameElement;
  }
  get svg() {
    return this.#svg;
  }
  setNode(node) {
    this.#node = node;
  }
  createLine(parentElement, className) {
    const line = UI2.UIUtils.createSVGChild(parentElement, "line", className);
    line.setAttribute("x1", Options.AnimationMargin.toString());
    line.setAttribute("y1", Options.AnimationHeight.toString());
    line.setAttribute("y2", Options.AnimationHeight.toString());
    line.style.stroke = this.#color;
    return line;
  }
  drawAnimationLine(iteration, parentElement) {
    const cache = this.#cachedElements[iteration];
    if (!cache.animationLine) {
      cache.animationLine = this.createLine(parentElement, "animation-line");
    }
    if (!cache.animationLine) {
      return;
    }
    cache.animationLine.setAttribute("x2", (this.duration() * this.#timeline.pixelTimeRatio() + Options.AnimationMargin).toFixed(2));
  }
  drawDelayLine(parentElement) {
    if (!this.#delayLine || !this.#endDelayLine) {
      this.#delayLine = this.createLine(parentElement, "animation-delay-line");
      this.#endDelayLine = this.createLine(parentElement, "animation-delay-line");
    }
    const fill = this.#animation.source().fill();
    this.#delayLine.classList.toggle("animation-fill", fill === "backwards" || fill === "both");
    const margin = Options.AnimationMargin;
    this.#delayLine.setAttribute("x1", margin.toString());
    this.#delayLine.setAttribute("x2", (this.delayOrStartTime() * this.#timeline.pixelTimeRatio() + margin).toFixed(2));
    const forwardsFill = fill === "forwards" || fill === "both";
    this.#endDelayLine.classList.toggle("animation-fill", forwardsFill);
    const leftMargin = Math.min(this.#timeline.width(), (this.delayOrStartTime() + this.duration() * this.#animation.source().iterations()) * this.#timeline.pixelTimeRatio());
    this.#endDelayLine.style.transform = "translateX(" + leftMargin.toFixed(2) + "px)";
    this.#endDelayLine.setAttribute("x1", margin.toString());
    this.#endDelayLine.setAttribute("x2", forwardsFill ? (this.#timeline.width() - leftMargin + margin).toFixed(2) : (this.#animation.source().endDelay() * this.#timeline.pixelTimeRatio() + margin).toFixed(2));
  }
  drawPoint(iteration, parentElement, x, keyframeIndex, attachEvents) {
    if (this.#cachedElements[iteration].keyframePoints[keyframeIndex]) {
      this.#cachedElements[iteration].keyframePoints[keyframeIndex].setAttribute("cx", x.toFixed(2));
      return;
    }
    const circle = UI2.UIUtils.createSVGChild(parentElement, "circle", keyframeIndex <= 0 ? "animation-endpoint" : "animation-keyframe-point");
    circle.setAttribute("cx", x.toFixed(2));
    circle.setAttribute("cy", Options.AnimationHeight.toString());
    circle.style.stroke = this.#color;
    circle.setAttribute("r", (Options.AnimationMargin / 2).toString());
    circle.setAttribute("jslog", `${VisualLogging2.controlPoint("animations.keyframe").track({ drag: true })}`);
    circle.tabIndex = 0;
    UI2.ARIAUtils.setLabel(circle, keyframeIndex <= 0 ? i18nString2(UIStrings2.animationEndpointSlider) : i18nString2(UIStrings2.animationKeyframeSlider));
    if (keyframeIndex <= 0) {
      circle.style.fill = this.#color;
    }
    this.#cachedElements[iteration].keyframePoints[keyframeIndex] = circle;
    if (!attachEvents) {
      return;
    }
    let eventType;
    if (keyframeIndex === 0) {
      eventType = "StartEndpointMove";
    } else if (keyframeIndex === -1) {
      eventType = "FinishEndpointMove";
    } else {
      eventType = "KeyframeMove";
    }
    if (!this.animation().viewOrScrollTimeline()) {
      UI2.UIUtils.installDragHandle(circle, this.mouseDown.bind(this, eventType, keyframeIndex), this.mouseMove.bind(this), this.mouseUp.bind(this), "ew-resize");
      _AnimationUI.installDragHandleKeyboard(circle, this.keydownMove.bind(this, eventType, keyframeIndex));
    }
  }
  renderKeyframe(iteration, keyframeIndex, parentElement, leftDistance, width, easing) {
    function createStepLine(parentElement2, x, strokeColor) {
      const line = UI2.UIUtils.createSVGChild(parentElement2, "line");
      line.setAttribute("x1", x.toString());
      line.setAttribute("x2", x.toString());
      line.setAttribute("y1", Options.AnimationMargin.toString());
      line.setAttribute("y2", Options.AnimationHeight.toString());
      line.style.stroke = strokeColor;
    }
    const bezier = Geometry.CubicBezier.parse(easing);
    const cache = this.#cachedElements[iteration].keyframeRender;
    if (!cache[keyframeIndex]) {
      const svg2 = bezier ? UI2.UIUtils.createSVGChild(parentElement, "path", "animation-keyframe") : UI2.UIUtils.createSVGChild(parentElement, "g", "animation-keyframe-step");
      cache[keyframeIndex] = svg2;
    }
    const group = cache[keyframeIndex];
    group.tabIndex = 0;
    UI2.ARIAUtils.setLabel(group, i18nString2(UIStrings2.sSlider, { PH1: this.#animation.name() }));
    group.style.transform = "translateX(" + leftDistance.toFixed(2) + "px)";
    if (easing === "linear") {
      group.style.fill = this.#color;
      const height = InlineEditor.BezierUI.Height;
      group.setAttribute("d", ["M", 0, height, "L", 0, 5, "L", width.toFixed(2), 5, "L", width.toFixed(2), height, "Z"].join(" "));
    } else if (bezier) {
      group.style.fill = this.#color;
      InlineEditor.BezierUI.BezierUI.drawVelocityChart(bezier, group, width);
    } else {
      const stepFunction = StepTimingFunction.parse(easing);
      group.removeChildren();
      const offsetMap = { start: 0, middle: 0.5, end: 1 };
      if (stepFunction) {
        const offsetWeight = offsetMap[stepFunction.stepAtPosition];
        for (let i = 0; i < stepFunction.steps; i++) {
          createStepLine(group, (i + offsetWeight) * width / stepFunction.steps, this.#color);
        }
      }
    }
  }
  redraw() {
    const maxWidth = this.#timeline.width() - Options.AnimationMargin;
    this.#svg.setAttribute("width", (maxWidth + 2 * Options.AnimationMargin).toFixed(2));
    this.#activeIntervalGroup.style.transform = "translateX(" + (this.delayOrStartTime() * this.#timeline.pixelTimeRatio()).toFixed(2) + "px)";
    this.#nameElement.style.transform = "translateX(" + (Math.max(this.delayOrStartTime(), 0) * this.#timeline.pixelTimeRatio() + Options.AnimationMargin).toFixed(2) + "px)";
    this.#nameElement.style.width = (this.duration() * this.#timeline.pixelTimeRatio()).toFixed(2) + "px";
    this.drawDelayLine(this.#svg);
    if (this.#animation.type() === "CSSTransition") {
      this.renderTransition();
      return;
    }
    this.renderIteration(this.#activeIntervalGroup, 0);
    if (!this.#tailGroup) {
      this.#tailGroup = UI2.UIUtils.createSVGChild(this.#activeIntervalGroup, "g", "animation-tail-iterations");
    }
    const iterationWidth = this.duration() * this.#timeline.pixelTimeRatio();
    let iteration;
    const invisibleAreaWidth = this.delayOrStartTime() < 0 ? -this.delayOrStartTime() * this.#timeline.pixelTimeRatio() : 0;
    for (iteration = 1; iteration < this.#animation.source().iterations() && iterationWidth * (iteration - 1) < invisibleAreaWidth + this.#timeline.width() && (iterationWidth > 0 || this.#animation.source().iterations() !== Infinity); iteration++) {
      this.renderIteration(this.#tailGroup, iteration);
    }
    while (iteration < this.#cachedElements.length) {
      const poppedElement = this.#cachedElements.pop();
      if (poppedElement?.group) {
        poppedElement.group.remove();
      }
    }
  }
  renderTransition() {
    const activeIntervalGroup = this.#activeIntervalGroup;
    if (!this.#cachedElements[0]) {
      this.#cachedElements[0] = { animationLine: null, keyframePoints: {}, keyframeRender: {}, group: null };
    }
    this.drawAnimationLine(0, activeIntervalGroup);
    this.renderKeyframe(0, 0, activeIntervalGroup, Options.AnimationMargin, this.duration() * this.#timeline.pixelTimeRatio(), this.#animation.source().easing());
    this.drawPoint(0, activeIntervalGroup, Options.AnimationMargin, 0, true);
    this.drawPoint(0, activeIntervalGroup, this.duration() * this.#timeline.pixelTimeRatio() + Options.AnimationMargin, -1, true);
  }
  renderIteration(parentElement, iteration) {
    if (!this.#cachedElements[iteration]) {
      this.#cachedElements[iteration] = {
        animationLine: null,
        keyframePoints: {},
        keyframeRender: {},
        group: UI2.UIUtils.createSVGChild(parentElement, "g")
      };
    }
    const group = this.#cachedElements[iteration].group;
    if (!group) {
      return;
    }
    group.style.transform = "translateX(" + (iteration * this.duration() * this.#timeline.pixelTimeRatio()).toFixed(2) + "px)";
    this.drawAnimationLine(iteration, group);
    if (this.#keyframes && this.#keyframes.length > 1) {
      for (let i = 0; i < this.#keyframes.length - 1; i++) {
        const leftDistance = this.offset(i) * this.duration() * this.#timeline.pixelTimeRatio() + Options.AnimationMargin;
        const width = this.duration() * (this.offset(i + 1) - this.offset(i)) * this.#timeline.pixelTimeRatio();
        this.renderKeyframe(iteration, i, group, leftDistance, width, this.#keyframes[i].easing());
        if (i || !i && iteration === 0) {
          this.drawPoint(iteration, group, leftDistance, i, iteration === 0);
        }
      }
    }
    this.drawPoint(iteration, group, this.duration() * this.#timeline.pixelTimeRatio() + Options.AnimationMargin, -1, iteration === 0);
  }
  delayOrStartTime() {
    let delay = this.#animation.delayOrStartTime();
    if (this.#mouseEventType === "AnimationDrag" || this.#mouseEventType === "StartEndpointMove") {
      delay += this.#movementInMs;
    }
    return delay;
  }
  duration() {
    let duration = this.#animation.iterationDuration();
    if (this.#mouseEventType === "FinishEndpointMove") {
      duration += this.#movementInMs;
    } else if (this.#mouseEventType === "StartEndpointMove") {
      duration -= this.#movementInMs;
    }
    return Math.max(0, duration);
  }
  offset(i) {
    if (!this.#keyframes) {
      throw new Error("Unable to calculate offset; keyframes do not exist");
    }
    let offset = this.#keyframes[i].offsetAsNumber();
    if (this.#mouseEventType === "KeyframeMove" && i === this.#keyframeMoved) {
      console.assert(i > 0 && i < this.#keyframes.length - 1, "First and last keyframe cannot be moved");
      offset += this.#movementInMs / this.#animation.iterationDuration();
      offset = Math.max(offset, this.#keyframes[i - 1].offsetAsNumber());
      offset = Math.min(offset, this.#keyframes[i + 1].offsetAsNumber());
    }
    return offset;
  }
  mouseDown(mouseEventType, keyframeIndex, event) {
    const mouseEvent = event;
    if (mouseEvent.buttons === 2) {
      return false;
    }
    if (this.#svg.enclosingNodeOrSelfWithClass("animation-node-removed")) {
      return false;
    }
    this.#mouseEventType = mouseEventType;
    this.#keyframeMoved = keyframeIndex;
    this.#downMouseX = mouseEvent.clientX;
    event.consume(true);
    const viewManagerInstance = UI2.ViewManager.ViewManager.instance();
    const animationLocation = viewManagerInstance.locationNameForViewId("animations");
    const elementsLocation = viewManagerInstance.locationNameForViewId("elements");
    if (this.#node && animationLocation !== elementsLocation) {
      void Common2.Revealer.reveal(this.#node);
    }
    return true;
  }
  mouseMove(event) {
    const mouseEvent = event;
    this.setMovementAndRedraw((mouseEvent.clientX - (this.#downMouseX || 0)) / this.#timeline.pixelTimeRatio());
  }
  setMovementAndRedraw(movement) {
    this.#movementInMs = movement;
    if (this.delayOrStartTime() + this.duration() > this.#timeline.duration() * 0.8) {
      this.#timeline.setDuration(this.#timeline.duration() * 1.2);
    }
    this.redraw();
  }
  mouseUp(event) {
    const mouseEvent = event;
    this.#movementInMs = (mouseEvent.clientX - (this.#downMouseX || 0)) / this.#timeline.pixelTimeRatio();
    if (this.#mouseEventType === "KeyframeMove") {
      if (this.#keyframes && this.#keyframeMoved !== null && typeof this.#keyframeMoved !== "undefined") {
        this.#keyframes[this.#keyframeMoved].setOffset(this.offset(this.#keyframeMoved));
      }
    } else {
      this.#animation.setTiming(this.duration(), this.delayOrStartTime());
    }
    this.#movementInMs = 0;
    this.redraw();
    this.#mouseEventType = void 0;
    this.#downMouseX = void 0;
    this.#keyframeMoved = void 0;
  }
  keydownMove(mouseEventType, keyframeIndex, event) {
    const keyboardEvent = event;
    this.#mouseEventType = mouseEventType;
    this.#keyframeMoved = keyframeIndex;
    switch (keyboardEvent.key) {
      case "ArrowLeft":
      case "ArrowUp":
        this.#movementInMs = -this.#keyboardMovementRateMs;
        break;
      case "ArrowRight":
      case "ArrowDown":
        this.#movementInMs = this.#keyboardMovementRateMs;
        break;
      default:
        return;
    }
    if (this.#mouseEventType === "KeyframeMove") {
      if (this.#keyframes && this.#keyframeMoved !== null) {
        this.#keyframes[this.#keyframeMoved].setOffset(this.offset(this.#keyframeMoved));
      }
    } else {
      this.#animation.setTiming(this.duration(), this.delayOrStartTime());
    }
    this.setMovementAndRedraw(0);
    this.#mouseEventType = void 0;
    this.#keyframeMoved = void 0;
    event.consume(true);
  }
  onContextMenu(event) {
    function showContextMenu(remoteObject) {
      if (!remoteObject) {
        return;
      }
      const contextMenu = new UI2.ContextMenu.ContextMenu(event);
      contextMenu.appendApplicableItems(remoteObject);
      void contextMenu.show();
    }
    void this.#animation.remoteObjectPromise().then(showContextMenu);
    event.consume(true);
  }
};
var Options = {
  AnimationHeight: 26,
  AnimationSVGHeight: 50,
  AnimationMargin: 7,
  EndpointsClickRegionSize: 10,
  GridCanvasHeight: 40
};
var Colors = /* @__PURE__ */ new Map([
  ["Purple", Common2.Color.parse("#9C27B0")],
  ["Light Blue", Common2.Color.parse("#03A9F4")],
  ["Deep Orange", Common2.Color.parse("#FF5722")],
  ["Blue", Common2.Color.parse("#5677FC")],
  ["Lime", Common2.Color.parse("#CDDC39")],
  ["Blue Grey", Common2.Color.parse("#607D8B")],
  ["Pink", Common2.Color.parse("#E91E63")],
  ["Green", Common2.Color.parse("#0F9D58")],
  ["Brown", Common2.Color.parse("#795548")],
  ["Cyan", Common2.Color.parse("#00BCD4")]
]);

// gen/front_end/panels/animation/AnimationGroupPreviewUI.js
var { render: render2, html: html2, svg, Directives: { classMap: classMap2, ref } } = Lit2;
var VIEW_BOX_HEIGHT = 32;
var MAX_ANIMATION_LINES_TO_SHOW = 10;
var MIN_ANIMATION_GROUP_DURATION = 750;
var DEFAULT_VIEW = (input, output, target) => {
  const classes = classMap2({
    "animation-buffer-preview": true,
    selected: input.isSelected,
    paused: input.isPaused,
    "no-animation": input.isPreviewAnimationDisabled
  });
  const handleKeyDown = (event) => {
    switch (event.key) {
      case "Backspace":
      case "Delete":
        input.onRemoveAnimationGroup();
        break;
      case "ArrowLeft":
      case "ArrowUp":
        input.onFocusPreviousGroup();
        break;
      case "ArrowRight":
      case "ArrowDown":
        input.onFocusNextGroup();
    }
  };
  const renderAnimationLines = () => {
    const timeToPixelRatio = 100 / Math.max(input.animationGroupDuration, MIN_ANIMATION_GROUP_DURATION);
    const viewBox = `0 0 100 ${VIEW_BOX_HEIGHT}`;
    const lines = input.animations.map((animation, index) => {
      const xStartPoint = animation.delayOrStartTime();
      const xEndPoint = xStartPoint + animation.iterationDuration();
      const yPoint = Math.floor(VIEW_BOX_HEIGHT / Math.max(6, input.animations.length) * index + 1);
      const colorForAnimation = AnimationUI.colorForAnimation(animation);
      return svg`<line
        x1="${xStartPoint * timeToPixelRatio}"
        x2="${xEndPoint * timeToPixelRatio}"
        y1="${yPoint}"
        y2="${yPoint}"
        style="stroke: ${colorForAnimation}"></line>`;
    });
    return html2`
      <svg
        width="100%"
        height="100%"
        viewBox=${viewBox}
        preserveAspectRatio="none"
        shape-rendering="crispEdges">
        ${lines}
      </svg>
    `;
  };
  render2(html2`
    <div class="animation-group-preview-ui">
      <button
        jslog=${VisualLogging3.item(`animations.buffer-preview${input.isScrollDrivenAnimationGroup ? "-sda" : ""}`).track({ click: true })}
        class=${classes}
        role="option"
        aria-label=${input.label}
        tabindex=${input.isFocusable ? 0 : -1}
        @keydown=${handleKeyDown}
        @click=${input.onSelectAnimationGroup}
        @animationend=${input.onPreviewAnimationEnd}
        ${ref((el) => {
    if (el instanceof HTMLElement) {
      output.focus = () => {
        el.focus();
      };
    }
  })}>
          <div class="animation-paused fill"></div>
          <devtools-icon name=${input.isScrollDrivenAnimationGroup ? "mouse" : "watch"} class="preview-icon"></devtools-icon>
          <div class="animation-buffer-preview-animation" ${ref((el) => {
    if (el instanceof HTMLElement) {
      output.replay = () => {
        el.animate([
          { offset: 0, width: "0%", opacity: 1 },
          { offset: 0.9, width: "100%", opacity: 1 },
          { offset: 1, width: "100%", opacity: 0 }
        ], { duration: 200, easing: "cubic-bezier(0, 0, 0.2, 1)" });
      };
    }
  })}></div>
          ${renderAnimationLines()}
        </button>
        <button
          class="animation-remove-button"
          jslog=${VisualLogging3.action("animations.remove-preview").track({ click: true })}
          @click=${input.onRemoveAnimationGroup}>
            <devtools-icon name="cross"></devtools-icon>
        </button>
    </div>
  `, target);
};
var AnimationGroupPreviewUI = class extends UI3.Widget.Widget {
  #view;
  #viewOutput = {};
  #config;
  #previewAnimationDisabled = false;
  #selected = false;
  #paused = false;
  #focusable = false;
  constructor(config, view = DEFAULT_VIEW) {
    super();
    this.#view = view;
    this.#config = config;
    this.requestUpdate();
  }
  setSelected(selected) {
    if (this.#selected === selected) {
      return;
    }
    this.#selected = selected;
    this.requestUpdate();
  }
  setPaused(paused) {
    if (this.#paused === paused) {
      return;
    }
    this.#paused = paused;
    this.requestUpdate();
  }
  setFocusable(focusable) {
    if (this.#focusable === focusable) {
      return;
    }
    this.#focusable = focusable;
    this.requestUpdate();
  }
  performUpdate() {
    this.#view({
      isScrollDrivenAnimationGroup: this.#config.animationGroup.isScrollDriven(),
      isPreviewAnimationDisabled: this.#previewAnimationDisabled,
      isSelected: this.#selected,
      isPaused: this.#paused,
      isFocusable: this.#focusable,
      label: this.#config.label,
      animationGroupDuration: this.#config.animationGroup.groupDuration(),
      animations: this.#config.animationGroup.animations().slice(0, MAX_ANIMATION_LINES_TO_SHOW),
      onPreviewAnimationEnd: () => {
        this.#previewAnimationDisabled = true;
        this.requestUpdate();
      },
      onRemoveAnimationGroup: () => {
        this.#config.onRemoveAnimationGroup();
      },
      onSelectAnimationGroup: () => {
        this.#config.onSelectAnimationGroup();
      },
      onFocusNextGroup: () => {
        this.#config.onFocusNextGroup();
      },
      onFocusPreviousGroup: () => {
        this.#config.onFocusPreviousGroup();
      }
    }, this.#viewOutput, this.contentElement);
  }
  focus() {
    this.#viewOutput.focus?.();
  }
  replay() {
    this.#viewOutput.replay?.();
  }
};
export {
  AnimationGroupPreviewUI_exports as AnimationGroupPreviewUI,
  AnimationTimeline_exports as AnimationTimeline,
  AnimationUI_exports as AnimationUI
};
//# sourceMappingURL=animation.js.map
