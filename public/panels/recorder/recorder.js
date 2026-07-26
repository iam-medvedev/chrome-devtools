var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/recorder/ControlButton.js
var ControlButton_exports = {};
__export(ControlButton_exports, {
  ControlButton: () => ControlButton,
  DEFAULT_VIEW: () => DEFAULT_VIEW
});
import * as UI from "./../../ui/legacy/legacy.js";
import * as Lit from "./../../ui/lit/lit.js";

// gen/front_end/panels/recorder/controlButton.css.js
var controlButton_css_default = `/*
 * Copyright 2023 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: inherit;
}

.control {
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.control[disabled] {
  filter: grayscale(100%);
  cursor: auto;
}

.icon {
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--sys-color-error-bright);
  margin-bottom: 8px;
  position: relative;
  transition: background 200ms;
  place-content: center center;
  align-items: center;
}

.icon::before {
  --override-white: #fff;

  box-sizing: border-box;
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  border: 1px solid var(--override-white);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--override-white);
}

.icon.square::before {
  border-radius: 0;
}

.icon.circle::before {
  border-radius: 50%;
}

.icon:hover {
  background: color-mix(in srgb, var(--sys-color-error-bright), var(--sys-color-state-hover-on-prominent) 10%);
}

.icon:active {
  background: color-mix(in srgb, var(--sys-color-error-bright), var(--sys-color-state-ripple-neutral-on-prominent) 16%);
}

.control[disabled] .icon:hover {
  background: var(--sys-color-error);
}

.label {
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.02em;
  color: var(--sys-color-on-surface);
}

/*# sourceURL=${import.meta.resolve("./controlButton.css")} */`;

// gen/front_end/panels/recorder/ControlButton.js
var { html } = Lit;
var DEFAULT_VIEW = (input, _output, target) => {
  const { label, shape, disabled, onClick } = input;
  const handleClickEvent = (event) => {
    if (disabled) {
      event.stopPropagation();
      event.preventDefault();
    } else {
      onClick(event);
    }
  };
  Lit.render(html`
    <style>${controlButton_css_default}</style>
    <button
        @click=${handleClickEvent}
        .disabled=${disabled}
        class="control">
      <div class="icon ${shape}"></div>
      <div class="label">${label}</div>
    </button>
  `, target, { container: { attributes: { classes: "flex-none" } } });
};
var ControlButton = class extends UI.Widget.Widget {
  #label = "";
  #shape = "square";
  #disabled = false;
  #onClick = () => {
  };
  #view;
  constructor(element, view) {
    super(element, { useShadowDom: "pure" });
    this.#view = view || DEFAULT_VIEW;
  }
  set label(label) {
    this.#label = label;
    this.requestUpdate();
  }
  set shape(shape) {
    this.#shape = shape;
    this.requestUpdate();
  }
  set disabled(disabled) {
    this.#disabled = disabled;
    this.requestUpdate();
  }
  set onClick(onClick) {
    this.#onClick = onClick;
    this.requestUpdate();
  }
  performUpdate() {
    this.#view({
      label: this.#label,
      shape: this.#shape,
      disabled: this.#disabled,
      onClick: this.#onClick
    }, {}, this.contentElement);
  }
};

// gen/front_end/panels/recorder/CreateRecordingView.js
var CreateRecordingView_exports = {};
__export(CreateRecordingView_exports, {
  CreateRecordingView: () => CreateRecordingView,
  DEFAULT_VIEW: () => DEFAULT_VIEW2
});
import "./../../ui/kit/kit.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as Badges from "./../../models/badges/badges.js";
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as Input from "./../../ui/components/input/input.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
import * as Lit2 from "./../../ui/lit/lit.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/recorder/createRecordingView.css.js
var createRecordingView_css_default = `/*
 * Copyright 2023 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  font-size: inherit;
}

.wrapper {
  padding: 24px;
  flex: 1;
}

h1 {
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: var(--sys-color-on-surface);
  margin: 0;
  font-weight: normal;
}

.row-label {
  font-weight: 500;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--sys-color-secondary);
  margin-bottom: 8px;
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 3px;
}

.footer {
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--sys-color-divider);
  padding: 12px;
  background: var(--sys-color-cdt-base-container);
}

.controls {
  display: flex;
}

.error {
  margin: 16px 0 0;
  padding: 8px;
  background: var(--sys-color-error-container);
  color: var(--sys-color-error);
}

.row-label .link:focus-visible {
  outline: var(--sys-color-state-focus-ring) auto 1px;
}

.header-wrapper {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.checkbox-label {
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  gap: 4px;
  line-height: 1.1;
  padding: 4px;
}

.checkbox-container {
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
}

input[type="checkbox"]:focus-visible {
  outline: var(--sys-color-state-focus-ring) auto 1px;
}

devtools-icon[name="help"] {
  width: 16px;
  height: 16px;
}

/*# sourceURL=${import.meta.resolve("./createRecordingView.css")} */`;

// gen/front_end/panels/recorder/CreateRecordingView.js
import * as Models from "./models/models.js";
var { html: html2, Directives: { ref, createRef, repeat } } = Lit2;
var UIStrings = {
  /**
   * @description The label for the input where the user enters a name for the new recording.
   */
  recordingName: "Recording name",
  /**
   * @description The button that starts the recording with the selected options.
   */
  startRecording: "Start recording",
  /**
   * @description The title of the page that contains the form for creating a new recording.
   */
  createRecording: "Create a new recording",
  /**
   * @description The error message that is shown if the user tries to create a recording without a name.
   */
  recordingNameIsRequired: "Recording name is required",
  /**
   * @description The label for the input where the user enters an attribute to be used for selector generation.
   */
  selectorAttribute: "Selector attribute",
  /**
   * @description The title for the close button where the user cancels a recording and returns to the previous view.
   */
  cancelRecording: "Cancel recording",
  /**
   * @description Label indicating a CSS (Cascading Style Sheets) selector type
   * (https://developer.mozilla.org/en-US/docs/Web/CSS). The label is used on a
   * checkbox which users can tick if they are interested in recording CSS
   * selectors.
   */
  selectorTypeCSS: "CSS",
  /**
   * @description Label indicating a piercing CSS (Cascading Style Sheets)
   * selector type
   * (https://pptr.dev/guides/query-selectors#pierce-selectors-pierce). These
   * types of selectors behave like CSS selectors, but can pierce through
   * Shadow DOM. The label is used on a checkbox which users can tick if they are
   * interested in recording Pierce selectors.
   */
  selectorTypePierce: "Pierce",
  /**
   * @description Label indicating an ARIA (Accessible Rich Internet
   * Applications) selector type
   * (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA). The
   * label is used on a checkbox which users can tick if they are interested in
   * recording ARIA selectors.
   */
  selectorTypeARIA: "ARIA",
  /**
   * @description Label indicating a text selector type. The label is used on a
   * checkbox which users can tick if they are interested in recording text
   * selectors.
   */
  selectorTypeText: "Text",
  /**
   * @description Label indicating an XPath (XML Path Language) selector type
   * (https://en.wikipedia.org/wiki/XPath). The label is used on a checkbox
   * which users can tick if they are interested in recording XPath selectors.
   */
  selectorTypeXPath: "XPath",
  /**
   * @description The label for the input that allows specifying selector types
   * that should be used during the recording.
   */
  selectorTypes: "Selector types to record",
  /**
   * @description The error message that shows up if the user turns off
   * necessary selectors.
   */
  includeNecessarySelectors: "You must choose CSS, Pierce, or XPath as one of your options. Only these selectors are guaranteed to be recorded since ARIA and text selectors may not be unique.",
  /**
   * @description Title of a link to the developer documentation.
   */
  learnMore: "Learn more"
};
var str_ = i18n.i18n.registerUIStrings("panels/recorder/CreateRecordingView.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var { widget } = UI2.Widget;
var DEFAULT_VIEW2 = (input, output, target) => {
  const { name, selectorAttribute, selectorTypes, error, onUpdate, onRecordingStarted, onRecordingCancelled, onErrorReset } = input;
  const nameInputRef = createRef();
  const onKeyDown = (event) => {
    if (error) {
      onErrorReset();
    }
    const keyboardEvent = event;
    if (keyboardEvent.key === "Enter") {
      onRecordingStarted();
      event.stopPropagation();
      event.preventDefault();
    }
  };
  output.focusInput = () => {
    nameInputRef.value?.focus();
  };
  const selectorTypeToLabel = /* @__PURE__ */ new Map([
    [Models.Schema.SelectorType.ARIA, i18nString(UIStrings.selectorTypeARIA)],
    [Models.Schema.SelectorType.CSS, i18nString(UIStrings.selectorTypeCSS)],
    [Models.Schema.SelectorType.Text, i18nString(UIStrings.selectorTypeText)],
    [
      Models.Schema.SelectorType.XPath,
      i18nString(UIStrings.selectorTypeXPath)
    ],
    [
      Models.Schema.SelectorType.Pierce,
      i18nString(UIStrings.selectorTypePierce)
    ]
  ]);
  Lit2.render(html2`
      <style>${createRecordingView_css_default}</style>
      <style>${Input.textInputStyles}</style>
      <style>${Input.checkboxStyles}</style>
      <div class="wrapper" jslog=${VisualLogging.section("create-recording-view")}>
        <div class="header-wrapper">
          <h1>${i18nString(UIStrings.createRecording)}</h1>
          <devtools-button
            title=${i18nString(UIStrings.cancelRecording)}
            jslog=${VisualLogging.close().track({ click: true })}
            .data=${{
    variant: "icon",
    size: "SMALL",
    iconName: "cross"
  }}
            @click=${onRecordingCancelled}
          ></devtools-button>
        </div>
        <label class="row-label" for="user-flow-name">${i18nString(UIStrings.recordingName)}</label>
        <input
          value=${name}
          @focus=${() => nameInputRef.value?.select()}
          @keydown=${onKeyDown}
          jslog=${VisualLogging.textField("user-flow-name").track({ change: true })}
          class="devtools-text-input"
          id="user-flow-name"
          ${ref(nameInputRef)}
          @input=${(e) => onUpdate({
    name: e.target.value.trim()
  })}
        />
        <label class="row-label" for="selector-attribute">
          <span>${i18nString(UIStrings.selectorAttribute)}</span>
          <devtools-link
            class="link" href="https://g.co/devtools/recorder#selector"
            title=${i18nString(UIStrings.learnMore)}
            .jslogContext=${"recorder-selector-help"}>
            <devtools-icon name="help">
            </devtools-icon>
          </devtools-link>
        </label>
        <input
          value=${selectorAttribute}
          placeholder="data-testid"
          @keydown=${onKeyDown}
          jslog=${VisualLogging.textField("selector-attribute").track({ change: true })}
          class="devtools-text-input"
          id="selector-attribute"
          @input=${(e) => onUpdate({
    selectorAttribute: e.target.value.trim()
  })}
        />
        <label class="row-label">
          <span>${i18nString(UIStrings.selectorTypes)}</span>
          <devtools-link
            class="link" href="https://g.co/devtools/recorder#selector"
            title=${i18nString(UIStrings.learnMore)}
            .jslogContext=${"recorder-selector-help"}>
            <devtools-icon name="help">
            </devtools-icon>
          </devtools-link>
        </label>
        <div class="checkbox-container">
          ${repeat(selectorTypes, (item5) => {
    return html2`
              <label class="checkbox-label selector-type">
                <input
                  @keydown=${onKeyDown}
                  .value=${item5.selectorType}
                  jslog=${VisualLogging.toggle().track({ click: true }).context(`selector-${item5.selectorType}`)}
                  ?checked=${item5.checked}
                  type="checkbox"
                  @change=${(e) => onUpdate({
      selectorType: item5.selectorType,
      checked: e.target.checked
    })}
                />
                ${selectorTypeToLabel.get(item5.selectorType) || item5.selectorType}
              </label>
            `;
  })}
        </div>
        ${error && html2` <div class="error" role="alert"> ${error.message} </div>`}
      </div>
      <div class="footer">
        <div class="controls">
          <devtools-widget
            class="control-button"
            ${widget(ControlButton, {
    label: i18nString(UIStrings.startRecording),
    shape: "circle",
    onClick: onRecordingStarted
  })}
            jslog=${VisualLogging.action(
    "chrome-recorder.start-recording"
    /* Actions.RecorderActions.START_RECORDING */
  ).track({ click: true })}
            title=${Models.Tooltip.getTooltipForActions(
    i18nString(UIStrings.startRecording),
    "chrome-recorder.start-recording"
    /* Actions.RecorderActions.START_RECORDING */
  )}
          ></devtools-widget>
        </div>
      </div>
    `, target);
};
var CreateRecordingView = class extends UI2.Widget.Widget {
  #error;
  #name = "";
  #selectorAttribute = "";
  #selectorTypes = [];
  #view;
  #output = {};
  #recorderSettings;
  onRecordingStarted = () => {
  };
  onRecordingCancelled = () => {
  };
  set recorderSettings(value2) {
    this.#recorderSettings = value2;
    this.#name = this.#recorderSettings.defaultTitle;
    this.#selectorAttribute = this.#recorderSettings.selectorAttribute;
    this.#selectorTypes = Object.values(Models.Schema.SelectorType).map((selectorType) => {
      return {
        selectorType,
        checked: this.#recorderSettings?.getSelectorByType(selectorType) ?? true
      };
    }), this.requestUpdate();
  }
  constructor(element, view) {
    super(element, { useShadowDom: true });
    this.#view = view || DEFAULT_VIEW2;
  }
  wasShown() {
    super.wasShown();
    this.requestUpdate();
    void this.updateComplete.then(() => this.#output.focusInput?.());
  }
  startRecording() {
    if (!this.#recorderSettings) {
      throw new Error("settings not set");
    }
    if (!this.#name.trim()) {
      this.#error = new Error(i18nString(UIStrings.recordingNameIsRequired));
      this.requestUpdate();
      return;
    }
    const selectorTypesToRecord = this.#selectorTypes.filter((item5) => item5.checked).map((item5) => item5.selectorType);
    if (!selectorTypesToRecord.includes(Models.Schema.SelectorType.CSS) && !selectorTypesToRecord.includes(Models.Schema.SelectorType.XPath) && !selectorTypesToRecord.includes(Models.Schema.SelectorType.Pierce)) {
      this.#error = new Error(i18nString(UIStrings.includeNecessarySelectors));
      this.requestUpdate();
      return;
    }
    for (const selectorType of Object.values(Models.Schema.SelectorType)) {
      this.#recorderSettings.setSelectorByType(selectorType, selectorTypesToRecord.includes(selectorType));
    }
    const selectorAttribute = this.#selectorAttribute.trim();
    if (selectorAttribute) {
      this.#recorderSettings.selectorAttribute = selectorAttribute;
    }
    this.onRecordingStarted({
      name: this.#name,
      selectorTypesToRecord,
      selectorAttribute: this.#selectorAttribute ? this.#selectorAttribute : void 0
    });
    Badges.UserBadges.instance().recordAction(Badges.BadgeAction.RECORDER_RECORDING_STARTED);
  }
  performUpdate() {
    this.#view({
      name: this.#name,
      selectorAttribute: this.#selectorAttribute,
      selectorTypes: this.#selectorTypes,
      error: this.#error,
      onRecordingCancelled: this.onRecordingCancelled,
      onUpdate: (update) => {
        if ("name" in update) {
          this.#name = update.name;
        } else if ("selectorAttribute" in update) {
          this.#selectorAttribute = update.selectorAttribute;
        } else {
          this.#selectorTypes = this.#selectorTypes.map((item5) => {
            if (item5.selectorType === update.selectorType) {
              return {
                ...item5,
                checked: update.checked
              };
            }
            return item5;
          });
        }
        this.requestUpdate();
      },
      onRecordingStarted: () => {
        this.startRecording();
      },
      onErrorReset: () => {
        this.#error = void 0;
        this.requestUpdate();
      }
    }, this.#output, this.contentElement);
  }
};

// gen/front_end/panels/recorder/RecorderEvents.js
var RecorderEvents_exports = {};
__export(RecorderEvents_exports, {
  RecordingStateChangedEvent: () => RecordingStateChangedEvent,
  ReplayFinishedEvent: () => ReplayFinishedEvent,
  SetRecordingFinishedEvent: () => SetRecordingFinishedEvent
});
var ReplayFinishedEvent = class _ReplayFinishedEvent extends Event {
  static eventName = "replayfinished";
  constructor() {
    super(_ReplayFinishedEvent.eventName, { bubbles: true, composed: true });
  }
};
var SetRecordingFinishedEvent = class _SetRecordingFinishedEvent extends Event {
  static eventName = "setrecordingfinished";
  constructor() {
    super(_SetRecordingFinishedEvent.eventName, { bubbles: true, composed: true });
  }
};
var RecordingStateChangedEvent = class _RecordingStateChangedEvent extends Event {
  recording;
  static eventName = "recordingstatechanged";
  constructor(recording) {
    super(_RecordingStateChangedEvent.eventName, {
      bubbles: true,
      composed: true
    });
    this.recording = recording;
  }
};

// gen/front_end/panels/recorder/RecorderPanel.js
var RecorderPanel_exports = {};
__export(RecorderPanel_exports, {
  ActionDelegate: () => ActionDelegate,
  DEFAULT_VIEW: () => DEFAULT_VIEW11,
  RecorderPanel: () => RecorderPanel
});
import "./../../ui/kit/kit.js";
import * as Common2 from "./../../core/common/common.js";
import * as Host2 from "./../../core/host/host.js";
import * as i18n17 from "./../../core/i18n/i18n.js";
import * as Platform7 from "./../../core/platform/platform.js";
import * as Root from "./../../core/root/root.js";
import * as SDK3 from "./../../core/sdk/sdk.js";
import * as Bindings from "./../../models/bindings/bindings.js";
import * as PublicExtensions from "./../../models/extensions/extensions.js";
import * as PanelCommon from "./../common/common.js";
import * as Emulation from "./../emulation/emulation.js";
import * as Tracing from "./../../services/tracing/tracing.js";
import * as Buttons8 from "./../../ui/components/buttons/buttons.js";
import * as UI11 from "./../../ui/legacy/legacy.js";
import { Directives as Directives5, html as html11, render as render11 } from "./../../ui/lit/lit.js";
import * as VisualLogging9 from "./../../ui/visual_logging/visual_logging.js";
import * as Converters from "./converters/converters.js";
import * as Extensions2 from "./extensions/extensions.js";
import * as Models8 from "./models/models.js";

// gen/front_end/panels/recorder/recorderPanel.css.js
var recorderPanel_css_default = `/*
 * Copyright 2023 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: inherit;
}

*:focus,
*:focus-visible {
  outline: none;
}

:host {
  overflow-x: auto;
}

:host,
devtools-create-recording-view {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  background-color: var(--sys-color-cdt-base-container);
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  border-bottom: 1px solid var(--sys-color-divider);
  padding: 0 5px;
  gap: 3px;
  flex-shrink: 0;
}

.separator {
  background-color: var(--sys-color-divider);
  width: 1px;
  height: 17px;
  margin: 0;
}

select {
  appearance: none;
  user-select: none;
  border: none;
  border-radius: var(--sys-shape-corner-extra-small);
  height: var(--sys-size-9);
  max-width: 140px;
  min-width: 140px;
  padding: 0 var(--sys-size-6) 0 var(--sys-size-5);
  position: relative;
  color: var(--sys-color-on-surface);
  background-color: transparent;
  text-overflow: ellipsis;
  background-image: var(--combobox-dropdown-arrow);
  background-position: right center;
  background-repeat: no-repeat;

  &:hover {
    background-color: var(--sys-color-state-hover-on-subtle);
  }

  &:active {
    background-color: var(--sys-color-state-ripple-neutral-on-subtle);
  }

  &:hover:active {
    background: var(--combobox-dropdown-arrow),
      linear-gradient(
        var(--sys-color-state-hover-on-subtle),
        var(--sys-color-state-hover-on-subtle)
      ),
      linear-gradient(
        var(--sys-color-state-ripple-neutral-on-subtle),
        var(--sys-color-state-ripple-neutral-on-subtle)
      );
    background-position: right center;
    background-repeat: no-repeat;
  }

  &:disabled {
    pointer-events: none;
    color: var(--sys-color-state-disabled);
    background-color: var(--sys-color-state-disabled-container);
  }

  &:focus-visible {
    outline: var(--sys-size-2) solid var(--sys-color-state-focus-ring);
  }
}

select option {
  background-color: var(--sys-color-cdt-base-container);
  color: var(--sys-color-on-surface);
}

devtools-menu {
  width: 0;
  height: 0;
  position: absolute;
}

devtools-recording-list-view {
  overflow: auto;
}

.error {
  color: var(--sys-color-error);
  border: 1px solid var(--sys-color-error);
  background-color: var(--sys-color-error-container);
  padding: 4px;
}

.feedback {
  margin-left: auto;
  margin-right: 4px;
}

.feedback .devtools-link {
  letter-spacing: 0.03em;
  text-decoration-line: underline;
  font-size: var(--sys-typescale-body4-size);
  line-height: 16px;
  color: var(--sys-color-primary);
  outline-offset: 3px;
}

.feedback .devtools-link:focus-visible,
.empty-state-description .devtools-link:focus-visible {
  outline: -webkit-focus-ring-color auto 1px;
}

.empty-state {
  margin: var(--sys-size-5);
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  min-height: fit-content;
  min-width: fit-content;

  > * {
    max-width: var(--sys-size-29);
  }

  .empty-state-header {
    font: var(--sys-typescale-headline5);
    margin-bottom: var(--sys-size-3);
  }

  .empty-state-description {
    font: var(--sys-typescale-body4-regular);
    color: var(--sys-color-on-surface-subtle);

    > devtools-link {
      white-space: nowrap;
      margin-left: var(--sys-size-3);
      cursor: pointer;
      text-decoration: underline;
      color: var(--sys-color-primary);
      outline-offset: var(--sys-size-2);
    }
  }

  > devtools-button {
    margin-top: var(--sys-size-7);
  }
}

/*# sourceURL=${import.meta.resolve("./recorderPanel.css")} */`;

// gen/front_end/panels/recorder/RecordingListView.js
var RecordingListView_exports = {};
__export(RecordingListView_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW3,
  RecordingListView: () => RecordingListView
});
import "./../../ui/kit/kit.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as Buttons2 from "./../../ui/components/buttons/buttons.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
import * as Lit3 from "./../../ui/lit/lit.js";
import * as VisualLogging2 from "./../../ui/visual_logging/visual_logging.js";
import * as Models2 from "./models/models.js";

// gen/front_end/panels/recorder/recordingListView.css.js
var recordingListView_css_default = `/*
 * Copyright 2023 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */
@scope to (devtools-widget > *) {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: inherit;
  }

  *:focus,
  *:focus-visible {
    outline: none;
  }

  .wrapper {
    padding: 24px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  h1 {
    font-size: 16px;
    line-height: 19px;
    color: var(--sys-color-on-surface);
    font-weight: normal;
  }

  .icon,
  .icon devtools-icon {
    width: 20px;
    height: 20px;
    color: var(--sys-color-primary);
  }

  .table {
    margin-top: 35px;
  }

  .title {
    font-size: 13px;
    color: var(--sys-color-on-surface);
    margin-left: 10px;
    flex: 1;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .row {
    display: flex;
    align-items: center;
    padding-right: 5px;
    height: 28px;
    border-bottom: 1px solid var(--sys-color-divider);
  }

  .row:focus-within,
  .row:hover {
    background-color: var(--sys-color-state-hover-on-subtle);
  }

  .row:last-child {
    border-bottom: none;
  }

  .actions {
    display: flex;
    align-items: center;
  }

  .actions button {
    border: none;
    background-color: transparent;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .actions .divider {
    width: 1px;
    height: 17px;
    background-color: var(--sys-color-divider);
    margin: 0 6px;
  }
}

/*# sourceURL=${import.meta.resolve("./recordingListView.css")} */`;

// gen/front_end/panels/recorder/RecordingListView.js
var { html: html3 } = Lit3;
var UIStrings2 = {
  /**
   * @description The title of the page that contains a list of saved recordings.
   */
  savedRecordings: "Saved recordings",
  /**
   * @description The title of the button that leads to the page for creating a new recording.
   */
  createRecording: "Create a new recording",
  /**
   * @description The title of the button that is shown next to each of the recordings and that triggers playing of the recording.
   */
  playRecording: "Play recording",
  /**
   * @description The title of the button that is shown next to each of the recordings and that triggers deletion of the recording.
   */
  deleteRecording: "Delete recording",
  /**
   * @description The title of the row corresponding to a recording. By clicking on the row, the user opens the recording for editing.
   */
  openRecording: "Open recording"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/recorder/RecordingListView.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
var DEFAULT_VIEW3 = (input, _output, target) => {
  const { recordings, replayAllowed, onCreateClick, onDeleteClick, onOpenClick, onPlayRecordingClick, onKeyDown } = input;
  Lit3.render(html3`
      <style>${recordingListView_css_default}</style>
      <div class="wrapper">
        <div class="header">
          <h1>${i18nString2(UIStrings2.savedRecordings)}</h1>
          <devtools-button
            .variant=${"primary"}
            @click=${onCreateClick}
            title=${Models2.Tooltip.getTooltipForActions(
    i18nString2(UIStrings2.createRecording),
    "chrome-recorder.create-recording"
    /* Actions.RecorderActions.CREATE_RECORDING */
  )}
            .jslogContext=${"create-recording"}
          >
            ${i18nString2(UIStrings2.createRecording)}
          </devtools-button>
        </div>
        <div class="table">
          ${recordings.map((recording) => {
    return html3`
                <div
                  role="button"
                  tabindex="0"
                  aria-label=${i18nString2(UIStrings2.openRecording)}
                  class="row"
                  @keydown=${(event) => onKeyDown(recording.storageName, event)}
                  @click=${(event) => onOpenClick(recording.storageName, event)}
                  jslog=${VisualLogging2.item().track({ click: true, resize: true }).context("recording")}>
                  <div class="icon">
                    <devtools-icon name="flow">
                    </devtools-icon>
                  </div>
                  <div class="title">${recording.name}</div>
                  <div class="actions">
                    ${replayAllowed ? html3`
                              <devtools-button
                                title=${i18nString2(UIStrings2.playRecording)}
                                .data=${{
      variant: "icon",
      iconName: "play",
      jslogContext: "play-recording"
    }}
                                @click=${(event) => onPlayRecordingClick(recording.storageName, event)}
                                @keydown=${(event) => event.stopPropagation()}
                              ></devtools-button>
                              <div class="divider"></div>` : ""}
                    <devtools-button
                      class="delete-recording-button"
                      title=${i18nString2(UIStrings2.deleteRecording)}
                      .data=${{
      variant: "icon",
      iconName: "bin",
      jslogContext: "delete-recording"
    }}
                      @click=${(event) => onDeleteClick(recording.storageName, event)}
                      @keydown=${(event) => event.stopPropagation()}
                    ></devtools-button>
                  </div>
                </div>
              `;
  })}
        </div>
      </div>
    `, target);
};
var RecordingListView = class extends UI3.Widget.Widget {
  #recordings = [];
  #replayAllowed = true;
  #view;
  onCreateRecording;
  onDeleteRecording;
  onOpenRecording;
  onPlayRecording;
  constructor(element, view) {
    super(element, { useShadowDom: true });
    this.#view = view || DEFAULT_VIEW3;
  }
  set recordings(recordings) {
    this.#recordings = recordings;
    this.performUpdate();
  }
  set replayAllowed(value2) {
    this.#replayAllowed = value2;
    this.performUpdate();
  }
  #onCreateClick() {
    this.onCreateRecording?.();
  }
  #onDeleteClick(storageName, event) {
    event.stopPropagation();
    this.onDeleteRecording?.(storageName);
  }
  #onOpenClick(storageName, event) {
    event.stopPropagation();
    this.onOpenRecording?.(storageName);
  }
  #onPlayRecordingClick(storageName, event) {
    event.stopPropagation();
    this.onPlayRecording?.(storageName);
  }
  #onKeyDown(storageName, event) {
    if (event.key !== "Enter") {
      return;
    }
    this.#onOpenClick(storageName, event);
  }
  performUpdate() {
    this.#view({
      recordings: this.#recordings,
      replayAllowed: this.#replayAllowed,
      onCreateClick: this.#onCreateClick.bind(this),
      onDeleteClick: this.#onDeleteClick.bind(this),
      onOpenClick: this.#onOpenClick.bind(this),
      onPlayRecordingClick: this.#onPlayRecordingClick.bind(this),
      onKeyDown: this.#onKeyDown.bind(this)
    }, {}, this.contentElement);
  }
  wasShown() {
    super.wasShown();
    this.performUpdate();
  }
};

// gen/front_end/panels/recorder/RecordingView.js
var RecordingView_exports = {};
__export(RecordingView_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW10,
  RecordingView: () => RecordingView
});
import "./../../ui/kit/kit.js";
import * as Host from "./../../core/host/host.js";
import * as i18n15 from "./../../core/i18n/i18n.js";
import * as Platform5 from "./../../core/platform/platform.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as CodeMirror from "./../../third_party/codemirror.next/codemirror.next.js";
import * as Buttons7 from "./../../ui/components/buttons/buttons.js";
import * as CodeHighlighter from "./../../ui/components/code_highlighter/code_highlighter.js";
import * as Dialogs from "./../../ui/components/dialogs/dialogs.js";
import * as Input2 from "./../../ui/components/input/input.js";
import * as TextEditor from "./../../ui/components/text_editor/text_editor.js";
import * as UI10 from "./../../ui/legacy/legacy.js";
import * as Lit10 from "./../../ui/lit/lit.js";
import * as VisualLogging8 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/recorder/ExtensionView.js
import * as i18n5 from "./../../core/i18n/i18n.js";
import * as Buttons3 from "./../../ui/components/buttons/buttons.js";
import * as UI4 from "./../../ui/legacy/legacy.js";
import * as Lit4 from "./../../ui/lit/lit.js";
import * as VisualLogging3 from "./../../ui/visual_logging/visual_logging.js";
import * as Extensions from "./extensions/extensions.js";

// gen/front_end/panels/recorder/extensionView.css.js
var extensionView_css_default = `/*
 * Copyright 2023 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  font-size: inherit;
}

.extension-view {
  display: flex;
  flex-direction: column;
  height: 100%;
}

main {
  flex: 1;
}

iframe {
  border: none;
  height: 100%;
  width: 100%;
}

header {
  display: flex;
  padding: 3px 8px;
  justify-content: space-between;
  border-bottom: 1px solid var(--sys-color-divider);
}

header > div {
  align-self: center;
}

.icon {
  display: block;
  width: 16px;
  height: 16px;
  color: var(--sys-color-secondary);
}

.title {
  display: flex;
  flex-direction: row;
  gap: 6px;
  color: var(--sys-color-secondary);
  align-items: center;
  font-weight: 500;
}

/*# sourceURL=${import.meta.resolve("./extensionView.css")} */`;

// gen/front_end/panels/recorder/ExtensionView.js
var { html: html4 } = Lit4;
var UIStrings3 = {
  /**
   * @description The button label that closes the panel that shows the extension content inside the Recorder panel.
   */
  closeView: "Close",
  /**
   * @description The label that indicates that the content shown is provided by a browser extension.
   */
  extension: "Content provided by a browser extension"
};
var str_3 = i18n5.i18n.registerUIStrings("panels/recorder/ExtensionView.ts", UIStrings3);
var i18nString3 = i18n5.i18n.getLocalizedString.bind(void 0, str_3);
var DEFAULT_VIEW4 = (input, output, target) => {
  const { descriptor, iframe } = input;
  Lit4.render(html4`
      <style>${extensionView_css_default}</style>
      <div class="extension-view">
        <header>
          <div class="title">
            <devtools-icon
              class="icon"
              title=${i18nString3(UIStrings3.extension)}
              name="extension">
            </devtools-icon>
            ${descriptor.title}
          </div>
          <devtools-button
            title=${i18nString3(UIStrings3.closeView)}
            jslog=${VisualLogging3.close().track({ click: true })}
            .data=${{
    variant: "icon",
    size: "SMALL",
    iconName: "cross"
  }}
            @click=${output.closeView}
          ></devtools-button>
        </header>
        <main>
          ${iframe}
        </main>
    </div>
  `, target, { container: { attributes: { jslog: VisualLogging3.section("extension-view") } } });
};
var ExtensionView = class extends UI4.Widget.VBox {
  #descriptor;
  #view;
  #onClose;
  #viewOutput = {
    closeView: () => {
      this.#onClose?.();
    }
  };
  set onClose(callback) {
    this.#onClose = callback;
  }
  constructor(element, view = DEFAULT_VIEW4) {
    super(element, { useShadowDom: true });
    this.#view = view;
  }
  get descriptor() {
    return this.#descriptor;
  }
  set descriptor(descriptor) {
    this.#descriptor = descriptor;
    if (descriptor) {
      Extensions.ExtensionManager.ExtensionManager.instance().getView(descriptor.id).show();
    }
    this.requestUpdate();
  }
  willHide() {
    super.willHide();
    if (this.#descriptor) {
      Extensions.ExtensionManager.ExtensionManager.instance().getView(this.#descriptor.id).hide();
    }
  }
  performUpdate() {
    if (!this.#descriptor) {
      return;
    }
    const iframe = Extensions.ExtensionManager.ExtensionManager.instance().getView(this.#descriptor.id).frame();
    this.#view({ descriptor: this.#descriptor, iframe }, this.#viewOutput, this.contentElement);
  }
};

// gen/front_end/panels/recorder/RecordingView.js
import * as Models7 from "./models/models.js";

// gen/front_end/panels/recorder/recordingView.css.js
var recordingView_css_default = `/*
 * Copyright 2023 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */
@scope to (devtools-widget > *) {
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-size: inherit;
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    flex: 1;
    height: 100%;
  }

  .main {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .sections {
    min-height: 0;
    background-color: var(--sys-color-cdt-base-container);
    z-index: 0;
    position: relative;
    container: sections / inline-size;
  }

  .section {
    display: flex;
    padding: 0 16px;
    gap: 8px;
    position: relative;
  }

  .section::after {
    content: '';
    border-bottom: 1px solid var(--sys-color-divider);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  .section:last-child::after {
    content: none;
  }

  .screenshot-wrapper {
    flex: 0 0 80px;
    padding-top: 32px;
    /* We want this to be on top of \\'.step-overlay\\' */
    z-index: 2;
  }

  @container sections (max-width: 400px) {
    .screenshot-wrapper {
      display: none;
    }
  }

  .screenshot {
    object-fit: cover;
    object-position: top center;
    max-width: 100%;
    width: 200px;
    height: auto;
    border: 1px solid var(--sys-color-divider);
    border-radius: 1px;
  }

  .content {
    flex: 1;
    min-width: 0;
  }

  .steps {
    flex: 1;
    position: relative;
    align-self: flex-start;
    overflow: visible;
  }

  .step {
    position: relative;
    padding-left: 40px;
    margin: 16px 0;
  }

  .step .action {
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.03em;
  }

  .recording {
    color: var(--sys-color-primary);
    font-style: italic;
    margin-top: 8px;
    margin-bottom: 0;
  }

  .add-assertion-button {
    margin-top: 8px;
  }

  .details {
    max-width: 240px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .url {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.03em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--sys-color-secondary);
    max-width: 100%;
    margin-bottom: 16px;
  }

  .header {
    flex-shrink: 0;
    align-items: center;
    border-bottom: 1px solid var(--sys-color-divider);
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-between;
    padding: 16px;
  }

  .header-title-wrapper {
    max-width: 100%;
  }

  .header-title {
    align-items: center;
    display: flex;
    flex: 1;
    max-width: 100%;
  }

  .header-title::before {
    content: '';
    min-width: 12px;
    height: 12px;
    display: inline-block;
    background: var(--sys-color-primary);
    border-radius: 50%;
    margin-right: 7px;
  }

  #title-input {
    font-family: inherit;
    field-sizing: content;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.02em;
    padding: 1px 4px;
    border: 1px solid transparent;
    border-radius: 1px;
    word-break: break-all;
  }

  #title-input:hover,
  #title-input:focus-visible {
    border-color: var(--input-outline);
  }

  #title-input.has-error {
    border-color: var(--sys-color-error);
  }

  #title-input.disabled {
    color: var(--sys-color-state-disabled);
  }

  .title-input-error-text {
    margin-top: 4px;
    margin-left: 19px;
    color: var(--sys-color-error);
  }

  .title-button-bar {
    flex-shrink: 0;
    padding-left: 2px;
    display: flex;
  }

  #title-input:focus + .title-button-bar {
    display: none;
  }

  .settings-row {
    padding: 16px 28px;
    border-bottom: 1px solid var(--sys-color-divider);
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  .settings-title {
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.03em;
    color: var(--sys-color-on-surface);
    display: flex;
    align-items: center;
    align-content: center;
    gap: 5px;
    width: fit-content;
  }

  .settings-title:focus-visible {
    outline: 2px solid var(--sys-color-state-focus-ring);
    outline-offset: 2px;
  }

  .settings {
    margin-top: 4px;
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0.03em;
    color: var(--sys-color-on-surface-subtle);
  }

  .settings.expanded {
    gap: 10px;
  }

  .settings .separator {
    width: 1px;
    height: 20px;
    background-color: var(--sys-color-divider);
    margin: 0 5px;
  }

  .actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .actions .separator {
    width: 1px;
    height: 24px;
    background-color: var(--sys-color-divider);
  }

  .is-recording .header-title::before {
    background: var(--sys-color-error-bright);
  }

  .footer {
    display: flex;
    justify-content: center;
    border-top: 1px solid var(--sys-color-divider);
    padding: 12px;
    background: var(--sys-color-cdt-base-container);
    z-index: 1;
  }

  .controls {
    align-items: center;
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
  }

  .chevron {
    width: 14px;
    height: 14px;
    transform: rotate(-90deg);
    color: var(--sys-color-on-surface);
  }

  .expanded .chevron {
    transform: rotate(0);
  }

  .editable-setting {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
  }

  .editable-setting .devtools-text-input {
    width: fit-content;
    height: var(--sys-size-9);
  }

  .wrapping-label {
    display: inline-flex;
    align-items: center;
    gap: 12px;
  }

  .text-editor {
    height: 100%;
    overflow: auto;
  }

  .section-toolbar {
    display: flex;
    align-items: center;
    padding: 3px 5px;
    justify-content: space-between;
    gap: 3px;
  }

  .section-toolbar > devtools-select-menu {
    height: 24px;
    min-width: 50px;
  }

  .sections .section-toolbar {
    justify-content: flex-end;
  }

  devtools-split-view {
    flex: 1 1 0%;
    min-height: 0;
  }

  [slot='main'] {
    overflow: hidden auto;
  }

  [slot='sidebar'] {
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100%;
    width: 100%;
  }

  [slot='sidebar'] .section-toolbar {
    border-bottom: 1px solid var(--sys-color-divider);
  }

  .recorder-extension-view {
    flex: 1;
  }
}

/*# sourceURL=${import.meta.resolve("./recordingView.css")} */`;

// gen/front_end/panels/recorder/ReplaySection.js
var ReplaySection_exports = {};
__export(ReplaySection_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW5,
  ReplaySection: () => ReplaySection
});
import * as i18n7 from "./../../core/i18n/i18n.js";
import * as Platform from "./../../core/platform/platform.js";
import * as Buttons4 from "./../../ui/components/buttons/buttons.js";
import * as UI5 from "./../../ui/legacy/legacy.js";
import * as Lit5 from "./../../ui/lit/lit.js";
import * as VisualLogging4 from "./../../ui/visual_logging/visual_logging.js";
import * as Models3 from "./models/models.js";

// gen/front_end/panels/recorder/replaySection.css.js
var replaySection_css_default = `/*
 * Copyright 2023 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.select-button {
  display: flex;
  gap: var(--sys-size-6);
}

.groups-label {
  display: inline-block;
  padding: 0 var(--sys-size-4) var(--sys-size-4) 0;
}

.select-button devtools-button {
  position: relative; /* Needed for outline to appear on top of the next element */
}

/*# sourceURL=${import.meta.resolve("./replaySection.css")} */`;

// gen/front_end/panels/recorder/ReplaySection.js
var { html: html5, Directives: { ifDefined, repeat: repeat2 } } = Lit5;
var UIStrings4 = {
  /**
   * @description Replay button label.
   */
  Replay: "Replay",
  /**
   * @description Button label for the normal speed replay option.
   */
  ReplayNormalButtonLabel: "Normal speed",
  /**
   * @description Item label for the normal speed replay option.
   */
  ReplayNormalItemLabel: "Normal (Default)",
  /**
   * @description Button label for the slow speed replay option.
   */
  ReplaySlowButtonLabel: "Slow speed",
  /**
   * @description Item label for the slow speed replay option.
   */
  ReplaySlowItemLabel: "Slow",
  /**
   * @description Button label for the very slow speed replay option.
   */
  ReplayVerySlowButtonLabel: "Very slow speed",
  /**
   * @description Item label for the very slow speed replay option.
   */
  ReplayVerySlowItemLabel: "Very slow",
  /**
   * @description Button label for the extremely slow speed replay option.
   */
  ReplayExtremelySlowButtonLabel: "Extremely slow speed",
  /**
   * @description Item label for the extremely slow speed replay option.
   */
  ReplayExtremelySlowItemLabel: "Extremely slow",
  /**
   * @description Label for a group of items in the replay menu that indicate various replay speeds (e.g., Normal, Fast, Slow).
   */
  speedGroup: "Speed",
  /**
   * @description Label for a group of items in the replay menu that indicate various extensions that can be used for replay.
   */
  extensionGroup: "Extensions"
};
var str_4 = i18n7.i18n.registerUIStrings("panels/recorder/ReplaySection.ts", UIStrings4);
var i18nString4 = i18n7.i18n.getLocalizedString.bind(void 0, str_4);
var REPLAY_EXTENSION_PREFIX = "extension";
function isPlayRecordingSpeed(string) {
  return string === "normal" || string === "slow" || string === "very_slow" || string === "extremely_slow";
}
var DEFAULT_VIEW5 = (input, _output, target) => {
  const { disabled, groups, selectedItem, actionTitle, onButtonClick, onItemSelected } = input;
  const buttonVariant = "primary";
  const handleClick = (ev) => {
    ev.stopPropagation();
    onButtonClick();
  };
  const handleSelectMenuSelect = (event) => {
    if (event.target instanceof HTMLSelectElement) {
      onItemSelected(event.target.value);
    }
  };
  Lit5.render(html5`
      <style>
        ${UI5.inspectorCommonStyles}
      </style>
      <style>
        ${replaySection_css_default}
      </style>
      <div
        class="select-button"
        title=${ifDefined(actionTitle)}
      >
        <label>
          ${groups.length > 1 ? html5`
                <div
                  class="groups-label"
                  >${groups.map((group) => {
    return group.name;
  }).join(" & ")}</div>` : Lit5.nothing}
          <select
            class="primary"
            ?disabled=${disabled}
            jslog=${VisualLogging4.dropDown("network-conditions").track({
    change: true
  })}
            @change=${handleSelectMenuSelect}
          >
            ${repeat2(groups, (group) => group.name, (group) => html5`
                <optgroup label=${group.name}>
                  ${repeat2(group.items, (item5) => item5.value, (item5) => {
    const selected = item5.value === selectedItem.value;
    return html5`
                      <option
                        .title=${item5.label()}
                        value=${item5.value}
                        ?selected=${selected}
                        jslog=${VisualLogging4.item(Platform.StringUtilities.toKebabCase(item5.value)).track({ click: true })}
                      >
                        ${selected && item5.buttonLabel ? item5.buttonLabel() : item5.label()}
                      </option>
                    `;
  })}
                </optgroup>
              `)}
          </select>
        </label>
        <devtools-button
          .disabled=${disabled}
          .variant=${buttonVariant}
          .iconName=${selectedItem.buttonIconName}
          @click=${handleClick}
          jslog=${VisualLogging4.action(
    "chrome-recorder.replay-recording"
    /* Actions.RecorderActions.REPLAY_RECORDING */
  ).track({ click: true })}
        >
          ${i18nString4(UIStrings4.Replay)}
        </devtools-button>
      </div>`, target);
};
var ReplaySection = class extends UI5.Widget.Widget {
  onStartReplay;
  #disabled = false;
  #settings;
  #replayExtensions = [];
  #view;
  #groups = [];
  constructor(element, view) {
    super(element, { useShadowDom: true });
    this.#view = view || DEFAULT_VIEW5;
    this.#groups = this.#computeGroups();
  }
  set settings(settings) {
    this.#settings = settings;
    this.performUpdate();
  }
  set replayExtensions(replayExtensions) {
    this.#replayExtensions = replayExtensions;
    this.#groups = this.#computeGroups();
    this.performUpdate();
  }
  get disabled() {
    return this.#disabled;
  }
  set disabled(disabled) {
    this.#disabled = disabled;
    this.performUpdate();
  }
  wasShown() {
    super.wasShown();
    this.performUpdate();
  }
  performUpdate() {
    const selectedItem = this.#getSelectedItem();
    this.#view({
      disabled: this.#disabled,
      groups: this.#groups,
      selectedItem,
      actionTitle: Models3.Tooltip.getTooltipForActions(
        selectedItem.label(),
        "chrome-recorder.replay-recording"
        /* Actions.RecorderActions.REPLAY_RECORDING */
      ),
      onButtonClick: () => this.#onStartReplay(),
      onItemSelected: (item5) => this.#onItemSelected(item5)
    }, void 0, this.contentElement);
  }
  #computeGroups() {
    const groups = [{
      name: i18nString4(UIStrings4.speedGroup),
      items: [
        {
          value: "normal",
          buttonIconName: "play",
          buttonLabel: () => i18nString4(UIStrings4.ReplayNormalButtonLabel),
          label: () => i18nString4(UIStrings4.ReplayNormalItemLabel)
        },
        {
          value: "slow",
          buttonIconName: "play",
          buttonLabel: () => i18nString4(UIStrings4.ReplaySlowButtonLabel),
          label: () => i18nString4(UIStrings4.ReplaySlowItemLabel)
        },
        {
          value: "very_slow",
          buttonIconName: "play",
          buttonLabel: () => i18nString4(UIStrings4.ReplayVerySlowButtonLabel),
          label: () => i18nString4(UIStrings4.ReplayVerySlowItemLabel)
        },
        {
          value: "extremely_slow",
          buttonIconName: "play",
          buttonLabel: () => i18nString4(UIStrings4.ReplayExtremelySlowButtonLabel),
          label: () => i18nString4(UIStrings4.ReplayExtremelySlowItemLabel)
        }
      ]
    }];
    if (this.#replayExtensions.length) {
      groups.push({
        name: i18nString4(UIStrings4.extensionGroup),
        items: this.#replayExtensions.map((extension) => {
          return {
            value: REPLAY_EXTENSION_PREFIX + extension.getOrigin(),
            buttonIconName: "play",
            buttonLabel: () => extension.getName(),
            label: () => extension.getName()
          };
        })
      });
    }
    return groups;
  }
  #getSelectedItem() {
    const value2 = this.#settings?.replayExtension || this.#settings?.speed || "";
    for (const group of this.#groups) {
      for (const item5 of group.items) {
        if (item5.value === value2) {
          return item5;
        }
      }
    }
    return this.#groups[0].items[0];
  }
  #onStartReplay() {
    const value2 = this.#settings?.replayExtension || this.#settings?.speed || "";
    if (value2.startsWith(REPLAY_EXTENSION_PREFIX)) {
      const origin = value2.substring(REPLAY_EXTENSION_PREFIX.length);
      const extension = this.#replayExtensions.find((ext) => ext.getOrigin() === origin);
      if (extension) {
        if (this.#settings) {
          this.#settings.replayExtension = REPLAY_EXTENSION_PREFIX + extension.getOrigin();
        }
        if (this.onStartReplay) {
          this.onStartReplay("normal", extension);
        }
        this.performUpdate();
        return;
      }
    }
    if (this.onStartReplay) {
      this.onStartReplay(
        this.#settings ? this.#settings.speed : "normal"
        /* PlayRecordingSpeed.NORMAL */
      );
    }
    this.performUpdate();
  }
  #onItemSelected(item5) {
    if (!this.#settings) {
      return;
    }
    if (isPlayRecordingSpeed(item5)) {
      this.#settings.speed = item5;
      this.#settings.replayExtension = "";
    } else {
      this.#settings.replayExtension = item5;
    }
    this.performUpdate();
  }
};

// gen/front_end/panels/recorder/StepView.js
var StepView_exports = {};
__export(StepView_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW9,
  StepView: () => StepView
});
import "./../../ui/kit/kit.js";
import * as i18n13 from "./../../core/i18n/i18n.js";
import * as Platform4 from "./../../core/platform/platform.js";
import * as Menus from "./../../ui/components/menus/menus.js";
import * as UI9 from "./../../ui/legacy/legacy.js";
import * as Lit9 from "./../../ui/lit/lit.js";
import * as VisualLogging7 from "./../../ui/visual_logging/visual_logging.js";
import * as Models6 from "./models/models.js";

// gen/front_end/panels/recorder/StepEditor.js
var StepEditor_exports = {};
__export(StepEditor_exports, {
  EditorState: () => EditorState,
  StepEditor: () => StepEditor
});
import * as i18n11 from "./../../core/i18n/i18n.js";
import * as Platform3 from "./../../core/platform/platform.js";
import * as Buttons6 from "./../../ui/components/buttons/buttons.js";
import * as SuggestionInput from "./../../ui/components/suggestion_input/suggestion_input.js";
import * as UI7 from "./../../ui/legacy/legacy.js";
import * as Lit7 from "./../../ui/lit/lit.js";
import * as VisualLogging6 from "./../../ui/visual_logging/visual_logging.js";
import * as Models5 from "./models/models.js";

// gen/front_end/panels/recorder/SelectorPicker.js
var SelectorPicker_exports = {};
__export(SelectorPicker_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW6,
  SelectorPicker: () => SelectorPicker
});
import * as Common from "./../../core/common/common.js";
import * as i18n9 from "./../../core/i18n/i18n.js";
import * as Platform2 from "./../../core/platform/platform.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as Buttons5 from "./../../ui/components/buttons/buttons.js";
import * as UI6 from "./../../ui/legacy/legacy.js";
import * as Lit6 from "./../../ui/lit/lit.js";
import * as VisualLogging5 from "./../../ui/visual_logging/visual_logging.js";
import * as Models4 from "./models/models.js";

// gen/front_end/panels/recorder/selectorPicker.css.js
var selectorPicker_css_default = `/*
 * Copyright 2025 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  display: inline-block;
}

.selector-picker {
  width: 18px;
  height: 18px;
}

/*# sourceURL=${import.meta.resolve("./selectorPicker.css")} */`;

// gen/front_end/panels/recorder/SelectorPicker.js
import * as Util from "./util/util.js";
var { html: html6 } = Lit6;
var BINDING_NAME = "captureSelectors";
var UIStrings5 = {
  /**
   * @description The title of a button that allows you to select an element on the page and update CSS/ARIA selectors.
   */
  selectorPicker: "Select an element in the page to update selectors"
};
var str_5 = i18n9.i18n.registerUIStrings("panels/recorder/SelectorPicker.ts", UIStrings5);
var i18nString5 = i18n9.i18n.getLocalizedString.bind(void 0, str_5);
var DEFAULT_VIEW6 = (input, _output, target) => {
  const { active, disabled, onClick } = input;
  Lit6.render(html6`
      <style>${selectorPicker_css_default}</style>
      <devtools-button
        @click=${onClick}
        .title=${i18nString5(UIStrings5.selectorPicker)}
        class="selector-picker"
        .size=${"SMALL"}
        .iconName=${"select-element"}
        .active=${active}
        .disabled=${disabled}
        .variant=${"icon"}
        jslog=${VisualLogging5.toggle("selector-picker").track({
    click: true
  })}
      ></devtools-button>
    `, target);
};
var SelectorPicker = class _SelectorPicker extends UI6.Widget.Widget {
  #view;
  #disabled = false;
  #active = false;
  #selectorAttribute;
  #activeMutex = new Common.Mutex.Mutex();
  #targetMutexes = /* @__PURE__ */ new Map();
  #scriptIdentifier = /* @__PURE__ */ new Map();
  onSelectorPicked;
  onAttributeRequested;
  constructor(element, view) {
    super(element, { useShadowDom: true });
    this.#view = view || DEFAULT_VIEW6;
  }
  static get #targetManager() {
    return SDK.TargetManager.TargetManager.instance();
  }
  set disabled(disabled) {
    this.#disabled = disabled;
    this.requestUpdate();
  }
  performUpdate() {
    this.#view({
      active: this.#active,
      disabled: this.#disabled,
      onClick: this.#handleClickEvent.bind(this)
    }, {}, this.contentElement);
  }
  #handleClickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    void this.#toggle();
  }
  async #toggle() {
    if (!this.#active) {
      return await this.#start();
    }
    return await this.#stop();
  }
  #start = () => {
    return this.#activeMutex.run(async () => {
      if (this.#active) {
        return;
      }
      this.#active = true;
      this.#selectorAttribute = await new Promise((resolve, reject) => {
        const timeout = setTimeout(reject, 1e3);
        if (this.onAttributeRequested) {
          this.onAttributeRequested((attribute) => {
            clearTimeout(timeout);
            resolve(attribute);
          });
        } else {
          clearTimeout(timeout);
          resolve(void 0);
        }
      });
      _SelectorPicker.#targetManager.observeTargets(this);
      this.requestUpdate();
    });
  };
  #stop = () => {
    return this.#activeMutex.run(async () => {
      if (!this.#active) {
        return;
      }
      this.#active = false;
      _SelectorPicker.#targetManager.unobserveTargets(this);
      _SelectorPicker.#targetManager.targets().map(this.targetRemoved.bind(this));
      this.#selectorAttribute = void 0;
      this.requestUpdate();
    });
  };
  targetAdded(target) {
    if (target.type() !== SDK.Target.Type.FRAME) {
      return;
    }
    let mutex = this.#targetMutexes.get(target);
    if (!mutex) {
      mutex = new Common.Mutex.Mutex();
      this.#targetMutexes.set(target, mutex);
    }
    void mutex.run(async () => {
      await this.#addBindings(target);
      await this.#injectApplicationScript(target);
    });
  }
  targetRemoved(target) {
    const mutex = this.#targetMutexes.get(target);
    if (!mutex) {
      return;
    }
    void mutex.run(async () => {
      try {
        await this.#injectCleanupScript(target);
        await this.#removeBindings(target);
      } catch {
      }
    });
  }
  #handleBindingCalledEvent = (event) => {
    if (event.data.name !== BINDING_NAME) {
      return;
    }
    const contextId = event.data.executionContextId;
    const frames = SDK.TargetManager.TargetManager.instance().targets();
    const contextTarget = Models4.SDKUtils.findTargetByExecutionContext(frames, contextId);
    const frameId = Models4.SDKUtils.findFrameIdByExecutionContext(frames, contextId);
    if (!contextTarget || !frameId) {
      throw new Error(`No execution context found for the binding call + ${JSON.stringify(event.data)}`);
    }
    const model = contextTarget.model(SDK.ResourceTreeModel.ResourceTreeModel);
    if (!model) {
      throw new Error(`ResourceTreeModel instance is missing for the target: ${contextTarget.id()}`);
    }
    const frame = model.frameForId(frameId);
    if (!frame) {
      throw new Error("Frame is not found");
    }
    if (this.onSelectorPicked) {
      this.onSelectorPicked({
        ...JSON.parse(event.data.payload),
        ...Models4.SDKUtils.getTargetFrameContext(contextTarget, frame)
      });
    }
    void this.#stop();
  };
  async #injectApplicationScript(target) {
    const injectedScript = await Util.InjectedScript.get();
    const script = `${injectedScript};DevToolsRecorder.startSelectorPicker({getAccessibleName, getAccessibleRole}, ${JSON.stringify(this.#selectorAttribute ? this.#selectorAttribute : void 0)}, ${Util.isDebugBuild})`;
    const [{ identifier }] = await Promise.all([
      target.pageAgent().invoke_addScriptToEvaluateOnNewDocument({
        source: script,
        worldName: Util.DEVTOOLS_RECORDER_WORLD_NAME,
        includeCommandLineAPI: true
      }),
      Models4.SDKUtils.evaluateInAllFrames(Util.DEVTOOLS_RECORDER_WORLD_NAME, target, script)
    ]);
    this.#scriptIdentifier.set(target, identifier);
  }
  async #injectCleanupScript(target) {
    const identifier = this.#scriptIdentifier.get(target);
    Platform2.assertNotNullOrUndefined(identifier);
    this.#scriptIdentifier.delete(target);
    await target.pageAgent().invoke_removeScriptToEvaluateOnNewDocument({ identifier });
    const script = "DevToolsRecorder.stopSelectorPicker()";
    await Models4.SDKUtils.evaluateInAllFrames(Util.DEVTOOLS_RECORDER_WORLD_NAME, target, script);
  }
  async #addBindings(target) {
    const model = target.model(SDK.RuntimeModel.RuntimeModel);
    Platform2.assertNotNullOrUndefined(model);
    model.addEventListener(SDK.RuntimeModel.Events.BindingCalled, this.#handleBindingCalledEvent);
    await model.addBinding({
      name: BINDING_NAME,
      executionContextName: Util.DEVTOOLS_RECORDER_WORLD_NAME
    });
  }
  async #removeBindings(target) {
    await target.runtimeAgent().invoke_removeBinding({ name: BINDING_NAME });
    const model = target.model(SDK.RuntimeModel.RuntimeModel);
    Platform2.assertNotNullOrUndefined(model);
    model.removeEventListener(SDK.RuntimeModel.Events.BindingCalled, this.#handleBindingCalledEvent);
  }
  wasShown() {
    super.wasShown();
    this.requestUpdate();
  }
  wasHidden() {
    super.wasHidden();
    void this.#stop();
  }
};

// gen/front_end/panels/recorder/stepEditor.css.js
var stepEditor_css_default = `/*
 * Copyright 2023 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-size: inherit;
}

:host {
  display: block;
}

.row {
  display: flex;
  flex-direction: row;
  color: var(--sys-color-token-property-special);
  font-family: var(--monospace-font-family);
  font-size: var(--monospace-font-size);
  align-items: center;
  line-height: 18px;
  margin-top: 3px;
}

.row devtools-button {
  line-height: 1;
  margin-left: 0.5em;
}

.separator {
  margin-right: 0.5em;
  color: var(--sys-color-on-surface);
}

.padded {
  margin-left: 2em;
}

.padded.double {
  margin-left: 4em;
}

.inline-button {
  width: 18px;
  height: 18px;
  opacity: 0%;
  visibility: hidden;
  transition: opacity 200ms;
  flex-shrink: 0;
}

.row:focus-within .inline-button,
.row:hover .inline-button {
  opacity: 100%;
  visibility: visible;
}

.wrapped.row {
  flex-wrap: wrap;
}

.gap.row {
  gap: 5px;
}

.gap.row devtools-button {
  margin-left: 0;
}

.regular-font {
  font-family: inherit;
  font-size: inherit;
}

.no-margin {
  margin: 0;
}

.row-buttons {
  margin-top: 3px;
}

.error {
  margin: 3px 0 6px;
  padding: 8px 12px;
  background: var(--sys-color-error-container);
  color: var(--sys-color-error);
}

/*# sourceURL=${import.meta.resolve("./stepEditor.css")} */`;

// gen/front_end/panels/recorder/StepEditor.js
import { ArrayAssignments, assert, deepFreeze, immutableDeepAssign, InsertAssignment, SharedObject } from "./util/util.js";
var { html: html7, render: render7, Directives } = Lit7;
var { live } = Directives;
var { widget: widget2 } = UI7.Widget;
var typeConverters = Object.freeze({
  string: (value2) => value2.trim(),
  number: (value2) => {
    const number = parseFloat(value2);
    if (Number.isNaN(number)) {
      return 0;
    }
    return number;
  },
  boolean: (value2) => {
    if (value2.toLowerCase() === "true") {
      return true;
    }
    return false;
  }
});
var dataTypeByAttribute = Object.freeze({
  selectors: "string",
  offsetX: "number",
  offsetY: "number",
  target: "string",
  frame: "number",
  assertedEvents: "string",
  value: "string",
  key: "string",
  operator: "string",
  count: "number",
  expression: "string",
  x: "number",
  y: "number",
  url: "string",
  type: "string",
  timeout: "number",
  duration: "number",
  button: "string",
  deviceType: "string",
  width: "number",
  height: "number",
  deviceScaleFactor: "number",
  isMobile: "boolean",
  hasTouch: "boolean",
  isLandscape: "boolean",
  download: "number",
  upload: "number",
  latency: "number",
  name: "string",
  parameters: "string",
  visible: "boolean",
  properties: "string",
  attributes: "string"
});
var defaultValuesByAttribute = deepFreeze({
  selectors: [[".cls"]],
  offsetX: 1,
  offsetY: 1,
  target: "main",
  frame: [0],
  assertedEvents: [
    { type: "navigation", url: "https://example.com", title: "Title" }
  ],
  value: "Value",
  key: "Enter",
  operator: ">=",
  count: 1,
  expression: "true",
  x: 0,
  y: 0,
  url: "https://example.com",
  timeout: 5e3,
  duration: 50,
  deviceType: "mouse",
  button: "primary",
  type: "click",
  width: 800,
  height: 600,
  deviceScaleFactor: 1,
  isMobile: false,
  hasTouch: false,
  isLandscape: true,
  download: 1e3,
  upload: 1e3,
  latency: 25,
  name: "customParam",
  parameters: "{}",
  properties: "{}",
  attributes: [{ name: "attribute", value: "value" }],
  visible: true
});
var attributesByType = deepFreeze({
  [Models5.Schema.StepType.Click]: {
    required: ["selectors", "offsetX", "offsetY"],
    optional: [
      "assertedEvents",
      "button",
      "deviceType",
      "duration",
      "frame",
      "target",
      "timeout"
    ]
  },
  [Models5.Schema.StepType.DoubleClick]: {
    required: ["offsetX", "offsetY", "selectors"],
    optional: [
      "assertedEvents",
      "button",
      "deviceType",
      "frame",
      "target",
      "timeout"
    ]
  },
  [Models5.Schema.StepType.Hover]: {
    required: ["selectors"],
    optional: ["assertedEvents", "frame", "target", "timeout"]
  },
  [Models5.Schema.StepType.Change]: {
    required: ["selectors", "value"],
    optional: ["assertedEvents", "frame", "target", "timeout"]
  },
  [Models5.Schema.StepType.KeyDown]: {
    required: ["key"],
    optional: ["assertedEvents", "target", "timeout"]
  },
  [Models5.Schema.StepType.KeyUp]: {
    required: ["key"],
    optional: ["assertedEvents", "target", "timeout"]
  },
  [Models5.Schema.StepType.Scroll]: {
    required: [],
    optional: ["assertedEvents", "frame", "target", "timeout", "x", "y"]
  },
  [Models5.Schema.StepType.Close]: {
    required: [],
    optional: ["assertedEvents", "target", "timeout"]
  },
  [Models5.Schema.StepType.Navigate]: {
    required: ["url"],
    optional: ["assertedEvents", "target", "timeout"]
  },
  [Models5.Schema.StepType.WaitForElement]: {
    required: ["selectors"],
    optional: [
      "assertedEvents",
      "attributes",
      "count",
      "frame",
      "operator",
      "properties",
      "target",
      "timeout",
      "visible"
    ]
  },
  [Models5.Schema.StepType.WaitForExpression]: {
    required: ["expression"],
    optional: ["assertedEvents", "frame", "target", "timeout"]
  },
  [Models5.Schema.StepType.CustomStep]: {
    required: ["name", "parameters"],
    optional: ["assertedEvents", "target", "timeout"]
  },
  [Models5.Schema.StepType.EmulateNetworkConditions]: {
    required: ["download", "latency", "upload"],
    optional: ["assertedEvents", "target", "timeout"]
  },
  [Models5.Schema.StepType.SetViewport]: {
    required: [
      "deviceScaleFactor",
      "hasTouch",
      "height",
      "isLandscape",
      "isMobile",
      "width"
    ],
    optional: ["assertedEvents", "target", "timeout"]
  }
});
var UIStrings6 = {
  /**
   * @description The text that is displayed when the steps were not saved due to an error. The error message itself is always in English and not translated.
   * @example {Saving failed} error
   */
  notSaved: "Not saved: {error}",
  /**
   * @description The button title that adds a new attribute to the form.
   * @example {timeout} attributeName
   */
  addAttribute: "Add {attributeName}",
  /**
   * @description The title of a button that deletes an attribute from the form.
   */
  deleteRow: "Delete row",
  /**
   * @description The title of a button that adds a new input field for the entry of the frame index. Frame index is the number of the frame within the page's frame tree.
   */
  addFrameIndex: "Add frame index within the frame tree",
  /**
   * @description The title of a button that removes a frame index field from the form.
   */
  removeFrameIndex: "Remove frame index",
  /**
   * @description The title of a button that adds a field to input a part of a selector in the editor form.
   */
  addSelectorPart: "Add a selector part",
  /**
   * @description The title of a button that removes a field to input a part of a selector in the editor form.
   */
  removeSelectorPart: "Remove a selector part",
  /**
   * @description The title of a button that adds a field to input a selector in the editor form.
   */
  addSelector: "Add a selector",
  /**
   * @description The title of a button that removes a field to input a selector in the editor form.
   */
  removeSelector: "Remove a selector",
  /**
   * @description The error message displayed when a user enters a type in the input that is not associated with any existing types.
   */
  unknownActionType: "Enter a valid action type"
};
var str_6 = i18n11.i18n.registerUIStrings("panels/recorder/StepEditor.ts", UIStrings6);
var i18nString6 = i18n11.i18n.getLocalizedString.bind(void 0, str_6);
var cleanUndefineds = (value2) => {
  return JSON.parse(JSON.stringify(value2));
};
var EditorState = class {
  static #puppeteer = new SharedObject.SharedObject(() => Models5.RecordingPlayer.RecordingPlayer.connectPuppeteer(), ({ browser }) => Models5.RecordingPlayer.RecordingPlayer.disconnectPuppeteer(browser));
  static async default(type) {
    const state = { type };
    const attributes = attributesByType[state.type];
    let promise = Promise.resolve();
    for (const attribute of attributes.required) {
      promise = Promise.all([
        promise,
        (async () => Object.assign(state, {
          [attribute]: await this.defaultByAttribute(state, attribute)
        }))()
      ]);
    }
    await promise;
    return Object.freeze(state);
  }
  static async defaultByAttribute(_state, attribute) {
    return await this.#puppeteer.run((puppeteer) => {
      switch (attribute) {
        case "assertedEvents": {
          return immutableDeepAssign(defaultValuesByAttribute.assertedEvents, new ArrayAssignments({
            0: {
              url: puppeteer.page.url() || defaultValuesByAttribute.assertedEvents[0].url
            }
          }));
        }
        case "url": {
          return puppeteer.page.url() || defaultValuesByAttribute.url;
        }
        case "height": {
          return puppeteer.page.evaluate(() => visualViewport.height).then((h) => h || defaultValuesByAttribute.height);
        }
        case "width": {
          return puppeteer.page.evaluate(() => visualViewport.width).then((w) => w || defaultValuesByAttribute.width);
        }
        default: {
          return defaultValuesByAttribute[attribute];
        }
      }
    });
  }
  static fromStep(step) {
    const state = structuredClone(step);
    for (const key2 of ["parameters", "properties"]) {
      if (key2 in step && step[key2] !== void 0) {
        state[key2] = JSON.stringify(step[key2]);
      }
    }
    if ("attributes" in step && step.attributes) {
      state.attributes = [];
      for (const [name, value2] of Object.entries(step.attributes)) {
        state.attributes.push({ name, value: value2 });
      }
    }
    if ("selectors" in step) {
      state.selectors = step.selectors.map((selector) => {
        if (typeof selector === "string") {
          return [selector];
        }
        return [...selector];
      });
    }
    return deepFreeze(state);
  }
  static toStep(state) {
    const step = structuredClone(state);
    for (const key2 of ["parameters", "properties"]) {
      const value2 = state[key2];
      if (value2) {
        Object.assign(step, { [key2]: JSON.parse(value2) });
      }
    }
    if (state.attributes) {
      if (state.attributes.length !== 0) {
        const attributes = {};
        for (const { name, value: value2 } of state.attributes) {
          Object.assign(attributes, { [name]: value2 });
        }
        Object.assign(step, { attributes });
      } else if ("attributes" in step) {
        delete step.attributes;
      }
    }
    if (state.selectors) {
      const selectors = state.selectors.filter((selector) => selector.length > 0).map((selector) => {
        if (selector.length === 1) {
          return selector[0];
        }
        return [...selector];
      });
      if (selectors.length !== 0) {
        Object.assign(step, { selectors });
      } else if ("selectors" in step) {
        delete step.selectors;
      }
    }
    if (state.frame?.length === 0 && "frame" in step) {
      delete step.frame;
    }
    return cleanUndefineds(Models5.SchemaUtils.parseStep(step));
  }
};
function renderInlineButton(input, opts) {
  if (input.disabled) {
    return;
  }
  return html7`
    <devtools-button
      title=${opts.title}
      .accessibleLabel=${opts.title}
      .size=${"SMALL"}
      .iconName=${opts.iconName}
      .variant=${"icon"}
      jslog=${VisualLogging6.action(opts.class).track({
    click: true
  })}
      class="inline-button ${opts.class}"
      @click=${opts.onClick}
    ></devtools-button>
  `;
}
function renderDeleteButton(input, attribute) {
  if (input.disabled) {
    return;
  }
  const attributes = attributesByType[input.state.type];
  const optional = [...attributes.optional].includes(attribute);
  if (!optional || input.disabled) {
    return;
  }
  return html7`<devtools-button
    .size=${"SMALL"}
    .iconName=${"bin"}
    .variant=${"icon"}
    .title=${i18nString6(UIStrings6.deleteRow)}
    class="inline-button delete-row"
    data-attribute=${attribute}
    jslog=${VisualLogging6.action("delete").track({ click: true })}
    @click=${input.handleDeleteRowClick(attribute)}
  ></devtools-button>`;
}
var DEFAULT_VIEW7 = (input, _output, target) => {
  const renderedAttributes = /* @__PURE__ */ new Set();
  function renderTypeRow(editable) {
    renderedAttributes.add("type");
    return html7`<div class="row attribute" data-attribute="type" jslog=${VisualLogging6.treeItem("type").track({ resize: true })}>
      <div id="type">type<span class="separator">:</span></div>
      <devtools-suggestion-input
        aria-labelledby="type"
        .disabled=${!editable || input.disabled}
        .options=${Object.values(Models5.Schema.StepType)}
        .placeholder=${defaultValuesByAttribute.type}
        .value=${live(input.state.type)}
        @blur=${input.handleTypeInputBlur}
      ></devtools-suggestion-input>
    </div>`;
  }
  function renderRow(attribute) {
    renderedAttributes.add(attribute);
    const attributeValue = input.state[attribute]?.toString();
    if (attributeValue === void 0) {
      return;
    }
    return html7`<div class="row attribute" data-attribute=${attribute} jslog=${VisualLogging6.treeItem(Platform3.StringUtilities.toKebabCase(attribute)).track({ resize: true })}>
      <div id=${attribute}>${attribute}<span class="separator">:</span></div>
      <devtools-suggestion-input
        .disabled=${input.disabled}
        aria-labelledby=${attribute}
        .placeholder=${defaultValuesByAttribute[attribute].toString()}
        .value=${live(attributeValue)}
        .mimeType=${(() => {
      switch (attribute) {
        case "expression":
          return "text/javascript";
        case "properties":
          return "application/json";
        default:
          return "";
      }
    })()}
        @blur=${input.handleInputBlur({
      attribute,
      from(value2) {
        if (input.state[attribute] === void 0 || input.state[attribute] === value2) {
          return;
        }
        return { [attribute]: value2 };
      }
    })}
      ></devtools-suggestion-input>
      ${renderDeleteButton(input, attribute)}
    </div>`;
  }
  function renderFrameRow() {
    renderedAttributes.add("frame");
    if (input.state.frame === void 0) {
      return;
    }
    return html7`
      <div class="attribute" data-attribute="frame" jslog=${VisualLogging6.treeItem("frame").track({ resize: true })}>
        <div class="row">
          <div id="frame">frame<span class="separator">:</span></div>
          ${renderDeleteButton(input, "frame")}
        </div>
        ${input.state.frame.map((frame, index, frames) => {
      return html7`
            <div class="padded row">
              <devtools-suggestion-input
                aria-labelledby="frame"
                .disabled=${input.disabled}
                .placeholder=${defaultValuesByAttribute.frame[0].toString()}
                .value=${live(frame.toString())}
                data-path=${`frame.${index}`}
                @blur=${input.handleInputBlur({
        attribute: "frame",
        from(value2) {
          if (input.state.frame?.[index] === void 0 || input.state.frame[index] === value2) {
            return;
          }
          return {
            frame: new ArrayAssignments({ [index]: value2 })
          };
        }
      })}
              ></devtools-suggestion-input>
              ${renderInlineButton(input, {
        class: "add-frame",
        title: i18nString6(UIStrings6.addFrameIndex),
        iconName: "plus",
        onClick: input.handleAddOrRemoveClick({
          frame: new ArrayAssignments({
            [index + 1]: new InsertAssignment(defaultValuesByAttribute.frame[0])
          })
        }, `devtools-suggestion-input[data-path="frame.${index + 1}"]`)
      })}
              ${renderInlineButton(input, {
        class: "remove-frame",
        title: i18nString6(UIStrings6.removeFrameIndex),
        iconName: "minus",
        onClick: input.handleAddOrRemoveClick({
          frame: new ArrayAssignments({ [index]: void 0 })
        }, `devtools-suggestion-input[data-path="frame.${Math.min(index, frames.length - 2)}"]`)
      })}
            </div>
          `;
    })}
      </div>
    `;
  }
  function renderSelectorsRow() {
    renderedAttributes.add("selectors");
    if (input.state.selectors === void 0) {
      return;
    }
    return html7`<div class="attribute" data-attribute="selectors" jslog=${VisualLogging6.treeItem("selectors")}>
      <div class="row">
        <div>selectors<span class="separator">:</span></div>
        ${widget2(SelectorPicker, {
      disabled: input.disabled,
      onSelectorPicked: input.handleSelectorPicked,
      onAttributeRequested: input.handleAttributeRequested
    })}
        ${renderDeleteButton(input, "selectors")}
      </div>
      ${input.state.selectors.map((selector, index, selectors) => {
      return html7`<div class="padded row" data-selector-path=${index}>
            <div id="selector-${index}">selector #${index + 1}<span class="separator">:</span></div>
            ${renderInlineButton(input, {
        class: "add-selector",
        title: i18nString6(UIStrings6.addSelector),
        iconName: "plus",
        onClick: input.handleAddOrRemoveClick({
          selectors: new ArrayAssignments({
            [index + 1]: new InsertAssignment(structuredClone(defaultValuesByAttribute.selectors[0]))
          })
        }, `devtools-suggestion-input[data-path="selectors.${index + 1}.0"]`)
      })}
            ${renderInlineButton(input, {
        class: "remove-selector",
        title: i18nString6(UIStrings6.removeSelector),
        iconName: "minus",
        onClick: input.handleAddOrRemoveClick({ selectors: new ArrayAssignments({ [index]: void 0 }) }, `devtools-suggestion-input[data-path="selectors.${Math.min(index, selectors.length - 2)}.0"]`)
      })}
          </div>
          ${selector.map((part, partIndex, parts) => {
        return html7`<div
              class="double padded row"
              data-selector-path="${index}.${partIndex}"
            >
              <devtools-suggestion-input
                aria-labelledby="selector-${index}"
                .disabled=${input.disabled}
                .placeholder=${defaultValuesByAttribute.selectors[0][0]}
                .value=${live(part)}
                data-path=${`selectors.${index}.${partIndex}`}
                @blur=${input.handleInputBlur({
          attribute: "selectors",
          from(value2) {
            if (input.state.selectors?.[index]?.[partIndex] === void 0 || input.state.selectors[index][partIndex] === value2) {
              return;
            }
            return {
              selectors: new ArrayAssignments({
                [index]: new ArrayAssignments({
                  [partIndex]: value2
                })
              })
            };
          }
        })}
              ></devtools-suggestion-input>
              ${renderInlineButton(input, {
          class: "add-selector-part",
          title: i18nString6(UIStrings6.addSelectorPart),
          iconName: "plus",
          onClick: input.handleAddOrRemoveClick({
            selectors: new ArrayAssignments({
              [index]: new ArrayAssignments({
                [partIndex + 1]: new InsertAssignment(defaultValuesByAttribute.selectors[0][0])
              })
            })
          }, `devtools-suggestion-input[data-path="selectors.${index}.${partIndex + 1}"]`)
        })}
              ${renderInlineButton(input, {
          class: "remove-selector-part",
          title: i18nString6(UIStrings6.removeSelectorPart),
          iconName: "minus",
          onClick: input.handleAddOrRemoveClick({
            selectors: new ArrayAssignments({
              [index]: new ArrayAssignments({
                [partIndex]: void 0
              })
            })
          }, `devtools-suggestion-input[data-path="selectors.${index}.${Math.min(partIndex, parts.length - 2)}"]`)
        })}
            </div>`;
      })}`;
    })}
    </div>`;
  }
  function renderAssertedEvents() {
    renderedAttributes.add("assertedEvents");
    if (input.state.assertedEvents === void 0) {
      return;
    }
    return html7`<div class="attribute" data-attribute="assertedEvents" jslog=${VisualLogging6.treeItem("asserted-events")}>
      <div class="row">
        <div>asserted events<span class="separator">:</span></div>
        ${renderDeleteButton(input, "assertedEvents")}
      </div>
      ${input.state.assertedEvents.map((event, index) => {
      return html7` <div class="padded row" jslog=${VisualLogging6.treeItem("event-type")}>
            <div id="event-type">type<span class="separator">:</span></div>
            <div aria-labelledby="event-type">${event.type}</div>
          </div>
          <div class="padded row" jslog=${VisualLogging6.treeItem("event-title")}>
            <div id="event-title">title<span class="separator">:</span></div>
            <devtools-suggestion-input
              aria-labelledby="event-title"
              .disabled=${input.disabled}
              .placeholder=${defaultValuesByAttribute.assertedEvents[0].title}
              .value=${live(event.title ?? "")}
              @blur=${input.handleInputBlur({
        attribute: "assertedEvents",
        from(value2) {
          if (input.state.assertedEvents?.[index]?.title === void 0 || input.state.assertedEvents[index].title === value2) {
            return;
          }
          return {
            assertedEvents: new ArrayAssignments({
              [index]: { title: value2 }
            })
          };
        }
      })}
            ></devtools-suggestion-input>
          </div>
          <div  id="event-url" class="padded row" jslog=${VisualLogging6.treeItem("event-url")}>
            <div>url<span class="separator">:</span></div>
            <devtools-suggestion-input
              aria-labelledby="event-url"
              .disabled=${input.disabled}
              .placeholder=${defaultValuesByAttribute.assertedEvents[0].url}
              .value=${live(event.url ?? "")}
              @blur=${input.handleInputBlur({
        attribute: "url",
        from(value2) {
          if (input.state.assertedEvents?.[index]?.url === void 0 || input.state.assertedEvents[index].url === value2) {
            return;
          }
          return {
            assertedEvents: new ArrayAssignments({
              [index]: { url: value2 }
            })
          };
        }
      })}
            ></devtools-suggestion-input>
          </div>`;
    })}
    </div> `;
  }
  function renderAttributesRow() {
    renderedAttributes.add("attributes");
    if (input.state.attributes === void 0) {
      return;
    }
    return html7`<div class="attribute" data-attribute="attributes" jslog=${VisualLogging6.treeItem("attributes")}>
      <div class="row">
        <div>attributes<span class="separator">:</span></div>
        ${renderDeleteButton(input, "attributes")}
      </div>
      ${input.state.attributes.map(({ name, value: value2 }, index, attributes) => {
      return html7`<div class="padded row" jslog=${VisualLogging6.treeItem("attribute")}>
          <devtools-suggestion-input
            .disabled=${input.disabled}
            .placeholder=${defaultValuesByAttribute.attributes[0].name}
            .value=${live(name)}
            data-path=${`attributes.${index}.name`}
            jslog=${VisualLogging6.key().track({ change: true })}
            @blur=${input.handleInputBlur({
        attribute: "attributes",
        from(name2) {
          if (input.state.attributes?.[index]?.name === void 0 || input.state.attributes[index].name === name2) {
            return;
          }
          return {
            attributes: new ArrayAssignments({ [index]: { name: name2 } })
          };
        }
      })}
          ></devtools-suggestion-input>
          <span class="separator">:</span>
          <devtools-suggestion-input
            .disabled=${input.disabled}
            .placeholder=${defaultValuesByAttribute.attributes[0].value}
            .value=${live(value2)}
            data-path=${`attributes.${index}.value`}
            @blur=${input.handleInputBlur({
        attribute: "attributes",
        from(value3) {
          if (input.state.attributes?.[index]?.value === void 0 || input.state.attributes[index].value === value3) {
            return;
          }
          return {
            attributes: new ArrayAssignments({ [index]: { value: value3 } })
          };
        }
      })}
          ></devtools-suggestion-input>
          ${renderInlineButton(input, {
        class: "add-attribute-assertion",
        title: i18nString6(UIStrings6.addSelectorPart),
        iconName: "plus",
        onClick: input.handleAddOrRemoveClick({
          attributes: new ArrayAssignments({
            [index + 1]: new InsertAssignment((() => {
              {
                const names = new Set(attributes.map(({ name: name3 }) => name3));
                const defaultAttribute = defaultValuesByAttribute.attributes[0];
                let name2 = defaultAttribute.name;
                let i = 0;
                while (names.has(name2)) {
                  ++i;
                  name2 = `${defaultAttribute.name}-${i}`;
                }
                return { ...defaultAttribute, name: name2 };
              }
            })())
          })
        }, `devtools-suggestion-input[data-path="attributes.${index + 1}.name"]`)
      })}
          ${renderInlineButton(input, {
        class: "remove-attribute-assertion",
        title: i18nString6(UIStrings6.removeSelectorPart),
        iconName: "minus",
        onClick: input.handleAddOrRemoveClick({ attributes: new ArrayAssignments({ [index]: void 0 }) }, `devtools-suggestion-input[data-path="attributes.${Math.min(index, attributes.length - 2)}.value"]`)
      })}
        </div>`;
    })}
    </div>`;
  }
  function renderAddRowButtons() {
    const attributes = attributesByType[input.state.type];
    return [...attributes.optional].filter((attr) => input.state[attr] === void 0).map((attr) => {
      return html7`<devtools-button
          .variant=${"outlined"}
          class="add-row"
          data-attribute=${attr}
          jslog=${VisualLogging6.action(`add-${Platform3.StringUtilities.toKebabCase(attr)}`)}
          @click=${input.handleAddRowClickEvent}
        >
          ${i18nString6(UIStrings6.addAttribute, {
        attributeName: attr
      })}
        </devtools-button>`;
    });
  }
  const result = html7`
    <style>${stepEditor_css_default}</style>
    <div class="wrapper" jslog=${VisualLogging6.tree("step-editor")} >
      ${renderTypeRow(input.isTypeEditable)} ${renderRow("target")}
      ${renderFrameRow()} ${renderSelectorsRow()}
      ${renderRow("deviceType")} ${renderRow("button")}
      ${renderRow("url")} ${renderRow("x")}
      ${renderRow("y")} ${renderRow("offsetX")}
      ${renderRow("offsetY")} ${renderRow("value")}
      ${renderRow("key")} ${renderRow("operator")}
      ${renderRow("count")} ${renderRow("expression")}
      ${renderRow("duration")} ${renderAssertedEvents()}
      ${renderRow("timeout")} ${renderRow("width")}
      ${renderRow("height")} ${renderRow("deviceScaleFactor")}
      ${renderRow("isMobile")} ${renderRow("hasTouch")}
      ${renderRow("isLandscape")} ${renderRow("download")}
      ${renderRow("upload")} ${renderRow("latency")}
      ${renderRow("name")} ${renderRow("parameters")}
      ${renderRow("visible")} ${renderRow("properties")}
      ${renderAttributesRow()}
      ${input.error ? html7`
            <div class="error">
              ${i18nString6(UIStrings6.notSaved, {
    error: input.error
  })}
            </div>
          ` : void 0}
      ${!input.disabled ? html7`<div
            class="row-buttons wrapped gap row regular-font no-margin"
          >
            ${renderAddRowButtons()}
          </div>` : void 0}
    </div>
  `;
  for (const key2 of Object.keys(dataTypeByAttribute)) {
    if (!renderedAttributes.has(key2)) {
      throw new Error(`The editable attribute ${key2} does not have UI`);
    }
  }
  render7(result, target, { container: { listeners: { keydown: input.handleKeyDownEvent } } });
};
var StepEditor = class extends UI7.Widget.Widget {
  #state;
  #error;
  #isTypeEditable = true;
  #disabled = false;
  #view;
  onStepEdited;
  onAttributeRequested;
  constructor(element, view = DEFAULT_VIEW7) {
    super(element, { useShadowDom: true });
    this.#state = { type: Models5.Schema.StepType.WaitForElement };
    this.#view = view;
  }
  set isTypeEditable(value2) {
    this.#isTypeEditable = value2;
    this.requestUpdate();
  }
  set disabled(value2) {
    this.#disabled = value2;
    this.requestUpdate();
  }
  set step(step) {
    this.#state = deepFreeze(EditorState.fromStep(step));
    this.#error = void 0;
    this.requestUpdate();
  }
  performUpdate() {
    const input = {
      state: this.#state,
      disabled: this.#disabled,
      error: this.#error,
      isTypeEditable: this.#isTypeEditable,
      handleInputBlur: this.#handleInputBlur,
      handleTypeInputBlur: this.#handleTypeInputBlur,
      handleAddRowClickEvent: this.#handleAddRowClickEvent,
      handleDeleteRowClick: this.#handleDeleteRowClick,
      handleSelectorPicked: this.#handleSelectorPicked,
      handleAttributeRequested: this.#handleAttributeRequested,
      handleAddOrRemoveClick: this.#handleAddOrRemoveClick,
      handleKeyDownEvent: this.#handleKeyDownEvent
    };
    this.#view(input, void 0, this.contentElement);
  }
  #commit(updatedState) {
    try {
      this.onStepEdited?.(EditorState.toStep(updatedState));
      this.#state = updatedState;
    } catch (error) {
      this.#error = error.message;
    }
    this.requestUpdate();
  }
  #handleSelectorPicked = (data) => {
    this.#commit(immutableDeepAssign(this.#state, {
      target: data.target,
      frame: data.frame,
      selectors: data.selectors.map((selector) => typeof selector === "string" ? [selector] : selector),
      offsetX: data.offsetX,
      offsetY: data.offsetY
    }));
  };
  #handleAttributeRequested = (send) => {
    this.onAttributeRequested?.(send);
  };
  #handleAddOrRemoveClick = (assignments, query) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.#commit(immutableDeepAssign(this.#state, assignments));
    this.#ensureFocus(query);
  };
  #handleDeleteRowClick = (attribute) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.#commit(immutableDeepAssign(this.#state, { [attribute]: void 0 }));
  };
  #ensureFocus = (query) => {
    void this.updateComplete.then(() => {
      const node = this.contentElement.querySelector(query);
      node?.focus();
    });
  };
  #handleKeyDownEvent = (event) => {
    assert(event instanceof KeyboardEvent);
    if (event.target instanceof SuggestionInput.SuggestionInput.SuggestionInput && event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      const elements = this.contentElement.querySelectorAll("devtools-suggestion-input");
      const element = [...elements].findIndex((value2) => value2 === event.target);
      if (element >= 0 && element + 1 < elements.length) {
        elements[element + 1].focus();
      } else {
        event.target.blur();
      }
    }
  };
  #handleInputBlur = (opts) => (event) => {
    assert(event.target instanceof SuggestionInput.SuggestionInput.SuggestionInput);
    if (event.target.disabled) {
      return;
    }
    const dataType = dataTypeByAttribute[opts.attribute];
    const value2 = typeConverters[dataType](event.target.value);
    const assignments = opts.from.bind(this)(value2);
    if (!assignments) {
      return;
    }
    this.#commit(immutableDeepAssign(this.#state, assignments));
  };
  #handleTypeInputBlur = async (event) => {
    assert(event.target instanceof SuggestionInput.SuggestionInput.SuggestionInput);
    if (event.target.disabled) {
      return;
    }
    const value2 = event.target.value;
    if (value2 === this.#state.type) {
      return;
    }
    if (!Object.values(Models5.Schema.StepType).includes(value2)) {
      this.#error = i18nString6(UIStrings6.unknownActionType);
      this.requestUpdate();
      return;
    }
    this.#commit(await EditorState.default(value2));
  };
  #handleAddRowClickEvent = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const attribute = event.target.dataset.attribute;
    this.#commit(immutableDeepAssign(this.#state, {
      [attribute]: await EditorState.defaultByAttribute(this.#state, attribute)
    }));
    this.#ensureFocus(`[data-attribute=${attribute}].attribute devtools-suggestion-input`);
  };
};

// gen/front_end/panels/recorder/stepView.css.js
var stepView_css_default = `/*
 * Copyright 2023 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: inherit;
}

.title-container {
  /* Vertically center items with min-width: 0; */
  min-width: 0;
  font-size: var(--sys-size-7);
  display: flex;
  flex-direction: row;
  gap: var(--sys-size-2);
  outline-offset: var(--sys-size-2);
  flex-grow: 1;
  align-items: center;
}

.action {
  display: flex;
  align-items: center;
}

.title {
  flex: 1;
  min-width: 0;
}

.is-start-of-group .title {
  font-weight: bold;
}

.error-icon {
  display: none;
}

.breakpoint-icon {
  visibility: hidden;
  cursor: pointer;
  opacity: 0%;
  fill: var(--sys-color-primary);
  stroke: #1a73e8; /* stylelint-disable-line plugin/use_theme_colors */
  transform: translate(-1.92px, -3px);
}

.circle-icon {
  fill: var(--sys-color-primary);
  stroke: var(--sys-color-cdt-base-container);
  stroke-width: 4px;
  r: 5px;
  cx: 8px;
  cy: 8px;
}

.is-start-of-group:not(:first-of-type) .circle-icon {
  r: 7px;
  fill: var(--sys-color-cdt-base-container);
  stroke: var(--sys-color-primary);
  stroke-width: 2px;
}

.step.is-success .circle-icon {
  fill: var(--sys-color-primary);
  stroke: var(--sys-color-primary);
}

.step.is-current .circle-icon {
  stroke-dasharray: 24 10;
  animation: rotate 1s linear infinite;
  fill: var(--sys-color-cdt-base-container);
  stroke: var(--sys-color-primary);
  stroke-width: 2px;
}

.error {
  margin: 16px 0 0;
  padding: 8px;
  background: var(--sys-color-error-container);
  color: var(--sys-color-error);
  position: relative;
}

@keyframes rotate {
  0% {
    transform: translate(8px, 8px) rotate(0) translate(-8px, -8px);
  }

  100% {
    transform: translate(8px, 8px) rotate(360deg) translate(-8px, -8px);
  }
}

.step.is-error .circle-icon {
  fill: var(--sys-color-error);
  stroke: var(--sys-color-error);
}

.step.is-error .error-icon {
  display: block;
  transform: translate(4px, 4px);
}

:host-context(.was-successful) .circle-icon {
  animation: flash-circle 2s;
}

:host-context(.was-successful) .breakpoint-icon {
  animation: flash-breakpoint-icon 2s;
}

@keyframes flash-circle {
  25% {
    fill: var(--override-color-recording-successful-text);
    stroke: var(--override-color-recording-successful-text);
  }

  75% {
    fill: var(--override-color-recording-successful-text);
    stroke: var(--override-color-recording-successful-text);
  }
}

@keyframes flash-breakpoint-icon {
  25% {
    fill: var(--override-color-recording-successful-text);
    stroke: var(--override-color-recording-successful-text);
  }

  75% {
    fill: var(--override-color-recording-successful-text);
    stroke: var(--override-color-recording-successful-text);
  }
}

.chevron {
  width: 14px;
  height: 14px;
  transition: 200ms;
  position: absolute;
  top: 14px;
  left: 24px;
  transform: rotate(-90deg);
  color: var(--sys-color-on-surface);
}

.expanded .chevron {
  transform: rotate(0deg);
}

.is-start-of-group .chevron {
  top: 34px;
}

.details {
  display: none;
  margin-top: 8px;
  position: relative;
}

.expanded .details {
  display: block;
}

.step-details {
  overflow: auto;
}

devtools-recorder-step-editor {
  border: 1px solid var(--sys-color-neutral-outline);
  padding: 3px 6px 6px;
  margin-left: -6px;
  border-radius: 3px;
}

devtools-recorder-step-editor:hover {
  border: 1px solid var(--sys-color-neutral-outline);
}

devtools-recorder-step-editor.is-selected {
  background-color: color-mix(
    in srgb,
    var(--sys-color-tonal-container),
    var(--sys-color-cdt-base-container) 50%
  );
  border: 1px solid var(--sys-color-tonal-outline);
}

.summary {
  display: flex;
  flex-flow: row nowrap;
}

.subtitle {
  font-weight: normal;
  color: var(--sys-color-on-surface-subtle);
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.main-title {
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.step-actions {
  border: none;
  border-radius: 0;
  height: 24px;

  --override-select-menu-show-button-border-radius: 0;
  --override-select-menu-show-button-outline: none;
  --override-select-menu-show-button-padding: 0;
}

.step.has-breakpoint .circle-icon {
  visibility: hidden;
}

.step:not(.is-start-of-group).has-breakpoint .breakpoint-icon {
  visibility: visible;
  opacity: 100%;
}

.step:not(.is-start-of-group, .has-breakpoint) .icon:hover .circle-icon {
  transition: opacity 0.2s;
  opacity: 0%;
}

.step:not(.is-start-of-group, .has-breakpoint) .icon:hover .error-icon {
  visibility: hidden;
}

.step:not(.is-start-of-group, .has-breakpoint) .icon:hover .breakpoint-icon {
  transition: opacity 0.2s;
  visibility: visible;
  opacity: 50%;
}

/*# sourceURL=${import.meta.resolve("./stepView.css")} */`;

// gen/front_end/panels/recorder/TimelineSection.js
var TimelineSection_exports = {};
__export(TimelineSection_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW8,
  TimelineSection: () => TimelineSection
});
import * as UI8 from "./../../ui/legacy/legacy.js";
import * as Lit8 from "./../../ui/lit/lit.js";

// gen/front_end/panels/recorder/timelineSection.css.js
var timelineSection_css_default = `/*
 * Copyright 2023 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: inherit;
}

.timeline-section {
  position: relative;
  padding: 8px 0 8px 40px;
  margin-left: 8px;

  --override-color-recording-successful-text: #36a854;
  --override-color-recording-successful-background: #e6f4ea;
}

.overlay {
  position: absolute;
  width: 100vw;
  height: 100%;
  /* Offset of 32px for spacing and 80px for screenshot */
  left: calc(-32px - 80px);
  top: 0;
  z-index: -1;
  pointer-events: none;
}

@container (max-width: 400px) {
  .overlay {
    /* Offset of 32px for spacing */
    left: -32px;
  }
}

:hover .overlay {
  background: var(--sys-color-state-hover-on-subtle);
}

.is-selected .overlay {
  background: var(--sys-color-tonal-container);
}

:host-context(.is-stopped) .overlay {
  background: var(--sys-color-state-ripple-primary);
  outline: 1px solid var(--sys-color-state-focus-ring);
  z-index: 4;
}

.is-start-of-group:not(:first-of-type) {
  padding-top: 16px;
}

.is-end-of-group {
  padding-bottom: 16px;
}

.icon {
  position: absolute;
  left: 4px;
  transform: translateX(-50%);
  z-index: 2;
}

.bar {
  position: absolute;
  left: 4px;
  display: block;
  transform: translateX(-50%);
  top: 18px;
  height: 100%;
  z-index: 1; /* We want this to be below of \\'.overlay\\' for stopped case */
}

.bar .background {
  fill: var(--sys-color-state-hover-on-subtle);
}

.bar .line {
  fill: var(--sys-color-primary);
}

.is-first-section .bar {
  height: 100%;
  display: none;
}

.is-first-section:not(.is-last-section) .bar {
  display: block;
}

.is-last-section .bar .line {
  display: none;
}

.is-last-section .bar .background {
  display: none;
}

:host-context(.is-error) .bar .line {
  fill: var(--sys-color-error);
}

:host-context(.is-error) .bar .background {
  fill: var(--sys-color-error-container);
}

:host-context(.was-successful) .bar .background {
  animation: flash-background 2s;
}

:host-context(.was-successful) .bar .line {
  animation: flash-line 2s;
}

@keyframes flash-background {
  25% {
    fill: var(--override-color-recording-successful-background);
  }

  75% {
    fill: var(--override-color-recording-successful-background);
  }
}

@keyframes flash-line {
  25% {
    fill: var(--override-color-recording-successful-text);
  }

  75% {
    fill: var(--override-color-recording-successful-text);
  }
}

/*# sourceURL=${import.meta.resolve("./timelineSection.css")} */`;

// gen/front_end/panels/recorder/TimelineSection.js
var { html: html8 } = Lit8;
var DEFAULT_VIEW8 = (input, _output, target) => {
  const classes = {
    "timeline-section": true,
    "is-end-of-group": input.isEndOfGroup,
    "is-start-of-group": input.isStartOfGroup,
    "is-first-section": input.isFirstSection,
    "is-last-section": input.isLastSection,
    "is-selected": input.isSelected
  };
  Lit8.render(html8`
    <style>${timelineSection_css_default}</style>
    <div class=${Lit8.Directives.classMap(classes)}>
      <div class="overlay"></div>
      <div class="icon"><slot name="icon"></slot></div>
      <svg width="24" height="100%" class="bar">
        <rect class="line" x="7" y="0" width="2" height="100%" />
      </svg>
      <slot></slot>
    </div>
  `, target);
};
var TimelineSection = class extends UI8.Widget.Widget {
  #isEndOfGroup = false;
  #isStartOfGroup = false;
  #isFirstSection = false;
  #isLastSection = false;
  #isSelected = false;
  #view;
  constructor(element, view = DEFAULT_VIEW8) {
    super(element, { useShadowDom: true });
    this.#view = view;
  }
  set isEndOfGroup(value2) {
    this.#isEndOfGroup = value2;
    this.requestUpdate();
  }
  set isStartOfGroup(value2) {
    this.#isStartOfGroup = value2;
    this.requestUpdate();
  }
  set isFirstSection(value2) {
    this.#isFirstSection = value2;
    this.requestUpdate();
  }
  set isLastSection(value2) {
    this.#isLastSection = value2;
    this.requestUpdate();
  }
  set isSelected(value2) {
    this.#isSelected = value2;
    this.requestUpdate();
  }
  performUpdate() {
    this.#view({
      isEndOfGroup: this.#isEndOfGroup,
      isStartOfGroup: this.#isStartOfGroup,
      isFirstSection: this.#isFirstSection,
      isLastSection: this.#isLastSection,
      isSelected: this.#isSelected
    }, {}, this.contentElement);
  }
};

// gen/front_end/panels/recorder/StepView.js
var { html: html9 } = Lit9;
var { widget: widget3 } = UI9.Widget;
var UIStrings7 = {
  /**
   * @description Title for the step type that configures the viewport.
   */
  setViewportClickTitle: "Set viewport",
  /**
   * @description Title for the customStep step type.
   */
  customStepTitle: "Custom step",
  /**
   * @description Title for the click step type.
   */
  clickStepTitle: "Click",
  /**
   * @description Title for the double click step type.
   */
  doubleClickStepTitle: "Double click",
  /**
   * @description Title for the hover step type.
   */
  hoverStepTitle: "Hover",
  /**
   * @description Title for the emulateNetworkConditions step type.
   */
  emulateNetworkConditionsStepTitle: "Emulate network conditions",
  /**
   * @description Title for the change step type.
   */
  changeStepTitle: "Change",
  /**
   * @description Title for the close step type.
   */
  closeStepTitle: "Close",
  /**
   * @description Title for the scroll step type.
   */
  scrollStepTitle: "Scroll",
  /**
   * @description Title for the key up step type. `up` refers to the state of the keyboard key: it's released, i.e., up. It does not refer to the down arrow key specifically.
   */
  keyUpStepTitle: "Key up",
  /**
   * @description Title for the navigate step type.
   */
  navigateStepTitle: "Navigate",
  /**
   * @description Title for the key down step type. `down` refers to the state of the keyboard key: it's pressed, i.e., down. It does not refer to the down arrow key specifically.
   */
  keyDownStepTitle: "Key down",
  /**
   * @description Title for the waitForElement step type.
   */
  waitForElementStepTitle: "Wait for element",
  /**
   * @description Title for the waitForExpression step type.
   */
  waitForExpressionStepTitle: "Wait for expression",
  /**
   * @description Title for elements with role button.
   */
  elementRoleButton: "Button",
  /**
   * @description Title for elements with role input.
   */
  elementRoleInput: "Input",
  /**
   * @description Default title for elements without a specific role.
   */
  elementRoleFallback: "Element",
  /**
   * @description The title of the button in the step's context menu that adds a new step before the current one.
   */
  addStepBefore: "Add step before",
  /**
   * @description The title of the button in the step's context menu that adds a new step after the current one.
   */
  addStepAfter: "Add step after",
  /**
   * @description The title of the button in the step's context menu that removes the step.
   */
  removeStep: "Remove step",
  /**
   * @description The title of the button that opens the step's context menu.
   */
  openStepActions: "Open step actions",
  /**
   * @description The title of the button in the step's context menu that adds a breakpoint.
   */
  addBreakpoint: "Add breakpoint",
  /**
   * @description The title of the button in the step's context menu that removes a breakpoint.
   */
  removeBreakpoint: "Remove breakpoint",
  /**
   * @description A menu item in the context menu that expands another menu which lists all
   * the formats the user can copy the recording as.
   */
  copyAs: "Copy as",
  /**
   * @description The title of the menu group that holds actions on recording steps.
   */
  stepManagement: "Manage steps",
  /**
   * @description The title of the menu group that holds actions related to breakpoints.
   */
  breakpoints: "Breakpoints"
};
var str_7 = i18n13.i18n.registerUIStrings("panels/recorder/StepView.ts", UIStrings7);
var i18nString7 = i18n13.i18n.getLocalizedString.bind(void 0, str_7);
var COPY_ACTION_PREFIX = "copy-step-as-";
function getStepTypeTitle(input) {
  if (input.section) {
    return input.section.title ? input.section.title : html9`<span class="fallback">(No Title)</span>`;
  }
  if (!input.step) {
    throw new Error("Missing both step and section");
  }
  switch (input.step.type) {
    case Models6.Schema.StepType.CustomStep:
      return i18nString7(UIStrings7.customStepTitle);
    case Models6.Schema.StepType.SetViewport:
      return i18nString7(UIStrings7.setViewportClickTitle);
    case Models6.Schema.StepType.Click:
      return i18nString7(UIStrings7.clickStepTitle);
    case Models6.Schema.StepType.DoubleClick:
      return i18nString7(UIStrings7.doubleClickStepTitle);
    case Models6.Schema.StepType.Hover:
      return i18nString7(UIStrings7.hoverStepTitle);
    case Models6.Schema.StepType.EmulateNetworkConditions:
      return i18nString7(UIStrings7.emulateNetworkConditionsStepTitle);
    case Models6.Schema.StepType.Change:
      return i18nString7(UIStrings7.changeStepTitle);
    case Models6.Schema.StepType.Close:
      return i18nString7(UIStrings7.closeStepTitle);
    case Models6.Schema.StepType.Scroll:
      return i18nString7(UIStrings7.scrollStepTitle);
    case Models6.Schema.StepType.KeyUp:
      return i18nString7(UIStrings7.keyUpStepTitle);
    case Models6.Schema.StepType.KeyDown:
      return i18nString7(UIStrings7.keyDownStepTitle);
    case Models6.Schema.StepType.WaitForElement:
      return i18nString7(UIStrings7.waitForElementStepTitle);
    case Models6.Schema.StepType.WaitForExpression:
      return i18nString7(UIStrings7.waitForExpressionStepTitle);
    case Models6.Schema.StepType.Navigate:
      return i18nString7(UIStrings7.navigateStepTitle);
  }
}
function getElementRoleTitle(role) {
  switch (role) {
    case "button":
      return i18nString7(UIStrings7.elementRoleButton);
    case "input":
      return i18nString7(UIStrings7.elementRoleInput);
    default:
      return i18nString7(UIStrings7.elementRoleFallback);
  }
}
function getSelectorPreview(step) {
  if (!("selectors" in step)) {
    return "";
  }
  const ariaSelector = step.selectors.flat().find((selector) => selector.startsWith("aria/"));
  if (!ariaSelector) {
    return "";
  }
  const m = ariaSelector.match(/^aria\/(.+?)(\[role="(.+)"\])?$/);
  if (!m) {
    return "";
  }
  return `${getElementRoleTitle(m[3])} "${m[1]}"`;
}
function getSectionPreview(section5) {
  if (!section5) {
    return "";
  }
  return section5.url;
}
function renderStepActions(input) {
  return html9`
    <devtools-menu-button
      class="step-actions"
      title=${i18nString7(UIStrings7.openStepActions)}
      aria-label=${i18nString7(UIStrings7.openStepActions)}
      .populateMenuCall=${input.populateStepContextMenu}
      @keydown=${(event) => {
    event.stopPropagation();
  }}
      jslog=${VisualLogging7.dropDown("step-actions").track({ click: true })}
      .iconName=${"dots-vertical"}
    ></devtools-menu-button>
  `;
}
var DEFAULT_VIEW9 = (input, _output, target) => {
  if (!input.step && !input.section) {
    return;
  }
  const stepClasses = {
    step: true,
    expanded: input.showDetails,
    "is-success": input.state === "success",
    "is-current": input.state === "current",
    "is-outstanding": input.state === "outstanding",
    "is-error": input.state === "error",
    "is-stopped": input.state === "stopped",
    "is-start-of-group": input.isStartOfGroup,
    "is-first-section": input.isFirstSection,
    "has-breakpoint": input.hasBreakpoint
  };
  const isExpandable = Boolean(input.step);
  const mainTitle = getStepTypeTitle({
    step: input.step,
    section: input.section
  });
  const subtitle = input.step ? getSelectorPreview(input.step) : getSectionPreview(input.section);
  Lit9.render(html9`
    <style>${stepView_css_default}</style>
    <div>
      <devtools-widget ${widget3(TimelineSection, {
    isFirstSection: input.isFirstSection,
    isLastSection: input.isLastSection,
    isStartOfGroup: input.isStartOfGroup,
    isEndOfGroup: input.isEndOfGroup,
    isSelected: input.isSelected
  })}
        @contextmenu=${(e) => {
    const menu = new UI9.ContextMenu.ContextMenu(e);
    input.populateStepContextMenu(menu);
    void menu.show();
  }}
        data-step-index=${input.stepIndex}
        data-section-index=${input.sectionIndex}
        @click=${(event) => {
    event.stopPropagation();
    const stepOrSection = input.step || input.section;
    if (stepOrSection) {
      input.onStepClick(stepOrSection);
    }
  }}
        @mouseover=${() => {
    const stepOrSection = input.step || input.section;
    if (stepOrSection) {
      input.onStepHover(stepOrSection);
    }
  }}
        class=${Lit9.Directives.classMap(stepClasses)}>
        <svg slot="icon" width="24" height="24" class="icon">
          <circle class="circle-icon"/>
          <g class="error-icon">
            <path d="M1.5 1.5L6.5 6.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.5 6.5L6.5 1.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <path @click=${input.onBreakpointClick} jslog=${VisualLogging7.action("breakpoint").track({ click: true })} class="breakpoint-icon" d="M2.5 5.5H17.7098L21.4241 12L17.7098 18.5H2.5V5.5Z"/>
        </svg>
        <div class="summary">
          <div class="title-container ${isExpandable ? "action" : ""}"
            @click=${isExpandable ? input.toggleShowDetails : void 0}
            @keydown=${isExpandable ? input.onToggleShowDetailsKeydown : void 0}
            tabindex="0"
            jslog=${VisualLogging7.sectionHeader().track({ click: true })}
            aria-role=${isExpandable ? "button" : ""}
            aria-label=${isExpandable ? "Show details for step" : ""}
          >
            ${isExpandable ? html9`<devtools-icon
                    class="chevron"
                    jslog=${VisualLogging7.expand().track({ click: true })}
                    name="triangle-down">
                  </devtools-icon>` : ""}
            <div class="title">
              <div class="main-title" title=${mainTitle}>${mainTitle}</div>
              <div class="subtitle" title=${subtitle}>${subtitle}</div>
            </div>
          </div>
          ${renderStepActions(input)}
        </div>
        <div class="details">
          ${input.step && html9`<devtools-widget ${widget3(StepEditor, {
    step: input.step,
    disabled: input.isPlaying,
    onStepEdited: input.stepEdited,
    onAttributeRequested: input.onAttributeRequested
  })}
            class=${input.isSelected ? "is-selected" : ""}></devtools-widget>`}
          ${input.section?.causingStep && html9`<devtools-widget ${widget3(StepEditor, {
    step: input.section.causingStep,
    isTypeEditable: false,
    disabled: input.isPlaying,
    onStepEdited: input.stepEdited,
    onAttributeRequested: input.onAttributeRequested
  })}></devtools-widget>`}
          }
        </div>
        ${input.error && html9`
          <div class="error" role="alert">
            ${input.error.message}
          </div>
        `}
      </devtools-widget>
    </div>
  `, target, { container: { classes: ["step-view-widget"] } });
};
var StepView = class extends UI9.Widget.Widget {
  #observer = new IntersectionObserver((result) => {
    this.#viewInput.isVisible = result[0].isIntersecting;
  });
  onStepChanged;
  onAddStep;
  onRemoveStep;
  onAddBreakpoint;
  onRemoveBreakpoint;
  onCopyStep;
  onAttributeRequested;
  #viewInput = {
    state: "default",
    showDetails: false,
    isEndOfGroup: false,
    isStartOfGroup: false,
    stepIndex: 0,
    sectionIndex: 0,
    isFirstSection: false,
    isLastSection: false,
    isRecording: false,
    isPlaying: false,
    isVisible: false,
    hasBreakpoint: false,
    removable: true,
    builtInConverters: [],
    extensionConverters: [],
    isSelected: false,
    actions: [],
    stepEdited: this.#stepEdited.bind(this),
    onAttributeRequested: (send) => this.onAttributeRequested?.(send),
    onBreakpointClick: this.#onBreakpointClick.bind(this),
    handleStepAction: this.#handleStepAction.bind(this),
    toggleShowDetails: this.#toggleShowDetails.bind(this),
    onToggleShowDetailsKeydown: this.#onToggleShowDetailsKeydown.bind(this),
    populateStepContextMenu: this.#populateStepContextMenu.bind(this),
    onStepClick: () => {
    },
    onStepHover: () => {
    }
  };
  #view;
  constructor(element, view) {
    super(element, { useShadowDom: "pure" });
    this.#view = view || DEFAULT_VIEW9;
  }
  set step(step) {
    this.#viewInput.step = step;
    this.requestUpdate();
  }
  set section(section5) {
    this.#viewInput.section = section5;
    this.requestUpdate();
  }
  set state(state) {
    const prevState = this.#viewInput.state;
    this.#viewInput.state = state;
    this.performUpdate();
    if (this.#viewInput.state !== prevState && this.#viewInput.state === "current" && !this.#viewInput.isVisible) {
      this.element.scrollIntoView();
    }
  }
  set error(error) {
    this.#viewInput.error = error;
    this.requestUpdate();
  }
  set isEndOfGroup(isEndOfGroup) {
    this.#viewInput.isEndOfGroup = isEndOfGroup;
    this.requestUpdate();
  }
  set isStartOfGroup(isStartOfGroup) {
    this.#viewInput.isStartOfGroup = isStartOfGroup;
    this.requestUpdate();
  }
  set stepIndex(stepIndex) {
    this.#viewInput.stepIndex = stepIndex;
    this.requestUpdate();
  }
  set sectionIndex(sectionIndex) {
    this.#viewInput.sectionIndex = sectionIndex;
    this.requestUpdate();
  }
  set isFirstSection(isFirstSection) {
    this.#viewInput.isFirstSection = isFirstSection;
    this.requestUpdate();
  }
  set isLastSection(isLastSection) {
    this.#viewInput.isLastSection = isLastSection;
    this.requestUpdate();
  }
  set isRecording(isRecording) {
    this.#viewInput.isRecording = isRecording;
    this.requestUpdate();
  }
  set isPlaying(isPlaying) {
    this.#viewInput.isPlaying = isPlaying;
    this.requestUpdate();
  }
  set hasBreakpoint(hasBreakpoint) {
    this.#viewInput.hasBreakpoint = hasBreakpoint;
    this.requestUpdate();
  }
  set removable(removable) {
    this.#viewInput.removable = removable;
    this.requestUpdate();
  }
  set builtInConverters(builtInConverters) {
    this.#viewInput.builtInConverters = builtInConverters;
    this.requestUpdate();
  }
  set extensionConverters(extensionConverters) {
    this.#viewInput.extensionConverters = extensionConverters;
    this.requestUpdate();
  }
  set isSelected(isSelected) {
    this.#viewInput.isSelected = isSelected;
    this.requestUpdate();
  }
  set recorderSettings(recorderSettings) {
    this.#viewInput.recorderSettings = recorderSettings;
    this.requestUpdate();
  }
  set onStepClick(onStepClick) {
    this.#viewInput.onStepClick = onStepClick;
    this.requestUpdate();
  }
  set onStepHover(onStepHover) {
    this.#viewInput.onStepHover = onStepHover;
    this.requestUpdate();
  }
  get step() {
    return this.#viewInput.step;
  }
  get section() {
    return this.#viewInput.section;
  }
  wasShown() {
    super.wasShown();
    this.#observer.observe(this.element);
    this.requestUpdate();
  }
  willHide() {
    super.willHide();
    this.#observer.unobserve(this.element);
  }
  #toggleShowDetails() {
    this.#viewInput.showDetails = !this.#viewInput.showDetails;
    this.requestUpdate();
  }
  #onToggleShowDetailsKeydown(event) {
    const keyboardEvent = event;
    if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
      this.#toggleShowDetails();
      event.stopPropagation();
      event.preventDefault();
    }
  }
  #stepEdited(newStep) {
    const step = this.#viewInput.step || this.#viewInput.section?.causingStep;
    if (!step) {
      throw new Error("Expected step.");
    }
    this.onStepChanged?.(step, newStep);
  }
  #handleStepAction(event) {
    switch (event.itemValue) {
      case "add-step-before": {
        const stepOrSection = this.#viewInput.step || this.#viewInput.section;
        if (!stepOrSection) {
          throw new Error("Expected step or section.");
        }
        this.onAddStep?.(
          stepOrSection,
          "before"
          /* AddStepPosition.BEFORE */
        );
        break;
      }
      case "add-step-after": {
        const stepOrSection = this.#viewInput.step || this.#viewInput.section;
        if (!stepOrSection) {
          throw new Error("Expected step or section.");
        }
        this.onAddStep?.(
          stepOrSection,
          "after"
          /* AddStepPosition.AFTER */
        );
        break;
      }
      case "remove-step": {
        const causingStep = this.#viewInput.section?.causingStep;
        if (!this.#viewInput.step && !causingStep) {
          throw new Error("Expected step.");
        }
        this.onRemoveStep?.(this.#viewInput.step || causingStep);
        break;
      }
      case "add-breakpoint": {
        if (!this.#viewInput.step) {
          throw new Error("Expected step");
        }
        this.onAddBreakpoint?.(this.#viewInput.stepIndex);
        break;
      }
      case "remove-breakpoint": {
        if (!this.#viewInput.step) {
          throw new Error("Expected step");
        }
        this.onRemoveBreakpoint?.(this.#viewInput.stepIndex);
        break;
      }
      default: {
        const actionId = event.itemValue;
        if (!actionId.startsWith(COPY_ACTION_PREFIX)) {
          throw new Error("Unknown step action.");
        }
        const copyStep = this.#viewInput.step || this.#viewInput.section?.causingStep;
        if (!copyStep) {
          throw new Error("Step not found.");
        }
        const converterId = actionId.substring(COPY_ACTION_PREFIX.length);
        if (this.#viewInput.recorderSettings) {
          this.#viewInput.recorderSettings.preferredCopyFormat = converterId;
        }
        this.onCopyStep?.(structuredClone(copyStep));
      }
    }
  }
  #onBreakpointClick() {
    if (this.#viewInput.hasBreakpoint) {
      this.onRemoveBreakpoint?.(this.#viewInput.stepIndex);
    } else {
      this.onAddBreakpoint?.(this.#viewInput.stepIndex);
    }
    this.requestUpdate();
  }
  #getActions = () => {
    const actions = [];
    if (!this.#viewInput.isPlaying) {
      if (this.#viewInput.step) {
        actions.push({
          id: "add-step-before",
          label: i18nString7(UIStrings7.addStepBefore),
          group: "stepManagement",
          groupTitle: i18nString7(UIStrings7.stepManagement)
        });
      }
      actions.push({
        id: "add-step-after",
        label: i18nString7(UIStrings7.addStepAfter),
        group: "stepManagement",
        groupTitle: i18nString7(UIStrings7.stepManagement)
      });
      if (this.#viewInput.removable) {
        actions.push({
          id: "remove-step",
          group: "stepManagement",
          groupTitle: i18nString7(UIStrings7.stepManagement),
          label: i18nString7(UIStrings7.removeStep)
        });
      }
    }
    if (this.#viewInput.step && !this.#viewInput.isRecording) {
      if (this.#viewInput.hasBreakpoint) {
        actions.push({
          id: "remove-breakpoint",
          label: i18nString7(UIStrings7.removeBreakpoint),
          group: "breakPointManagement",
          groupTitle: i18nString7(UIStrings7.breakpoints)
        });
      } else {
        actions.push({
          id: "add-breakpoint",
          label: i18nString7(UIStrings7.addBreakpoint),
          group: "breakPointManagement",
          groupTitle: i18nString7(UIStrings7.breakpoints)
        });
      }
    }
    if (this.#viewInput.step) {
      for (const converter of this.#viewInput.builtInConverters || []) {
        actions.push({
          id: COPY_ACTION_PREFIX + Platform4.StringUtilities.toKebabCase(converter.getId()),
          label: converter.getFormatName(),
          group: "copy",
          groupTitle: i18nString7(UIStrings7.copyAs)
        });
      }
      for (const converter of this.#viewInput.extensionConverters || []) {
        actions.push({
          id: COPY_ACTION_PREFIX + Platform4.StringUtilities.toKebabCase(converter.getId()),
          label: converter.getFormatName(),
          group: "copy",
          groupTitle: i18nString7(UIStrings7.copyAs),
          jslogContext: COPY_ACTION_PREFIX + "extension"
        });
      }
    }
    return actions;
  };
  #populateStepContextMenu(contextMenu) {
    const actions = this.#getActions();
    const copyActions = actions.filter((item5) => item5.id.startsWith(COPY_ACTION_PREFIX));
    const otherActions = actions.filter((item5) => !item5.id.startsWith(COPY_ACTION_PREFIX));
    for (const item5 of otherActions) {
      const section5 = contextMenu.section(item5.group);
      section5.appendItem(item5.label, () => {
        this.#handleStepAction(new Menus.Menu.MenuItemSelectedEvent(item5.id));
      }, { jslogContext: item5.id });
    }
    const preferredCopyAction = copyActions.find((item5) => item5.id === COPY_ACTION_PREFIX + this.#viewInput.recorderSettings?.preferredCopyFormat);
    if (preferredCopyAction) {
      contextMenu.section("copy").appendItem(preferredCopyAction.label, () => {
        this.#handleStepAction(new Menus.Menu.MenuItemSelectedEvent(preferredCopyAction.id));
      }, { jslogContext: preferredCopyAction.id });
    }
    if (copyActions.length) {
      const copyAs = contextMenu.section("copy").appendSubMenuItem(i18nString7(UIStrings7.copyAs), false, "copy");
      for (const item5 of copyActions) {
        if (item5 === preferredCopyAction) {
          continue;
        }
        copyAs.section(item5.group).appendItem(item5.label, () => {
          this.#handleStepAction(new Menus.Menu.MenuItemSelectedEvent(item5.id));
        }, { jslogContext: item5.id });
      }
    }
  }
  performUpdate() {
    this.#viewInput.actions = this.#getActions();
    this.#view(this.#viewInput, void 0, this.contentElement);
  }
};

// gen/front_end/panels/recorder/RecordingView.js
var { html: html10 } = Lit10;
var { widget: widget4 } = UI10.Widget;
var UIStrings8 = {
  /**
   * @description Depicts that the recording was done on a mobile device (e.g., a smartphone or tablet).
   */
  mobile: "Mobile",
  /**
   * @description Depicts that the recording was done on a desktop device (e.g., on a PC or laptop).
   */
  desktop: "Desktop",
  /**
   * @description Network latency in milliseconds.
   * @example {10} value
   */
  latency: "Latency: {value} ms",
  /**
   * @description Upload speed.
   * @example {42 kB} value
   */
  upload: "Upload: {value}",
  /**
   * @description Download speed.
   * @example {8 kB} value
   */
  download: "Download: {value}",
  /**
   * @description Title of the button to edit replay settings.
   */
  editReplaySettings: "Edit replay settings",
  /**
   * @description Title of the section that contains replay settings.
   */
  replaySettings: "Replay settings",
  /**
   * @description The string is shown when a default value is used for some replay settings.
   */
  default: "Default",
  /**
   * @description The title of the section with environment settings.
   */
  environment: "Environment",
  /**
   * @description The title of the screenshot image that is shown for every section in the recording view.
   */
  screenshotForSection: "Screenshot for this section",
  /**
   * @description The title of the button that edits the current recording's title.
   */
  editTitle: "Edit title",
  /**
   * @description The error for when the title is missing.
   */
  requiredTitleError: "Title is required",
  /**
   * @description The status text that is shown while the recording is ongoing.
   */
  recording: "Recording\u2026",
  /**
   * @description The title of the button to end the current recording.
   */
  endRecording: "End recording",
  /**
   * @description The title of the button while the recording is being ended.
   */
  recordingIsBeingStopped: "Stopping recording\u2026",
  /**
   * @description The text that describes a timeout setting of {value} milliseconds.
   * @example {1000} value
   */
  timeout: "Timeout: {value} ms",
  /**
   * @description The label for the input that allows entering network throttling configuration.
   */
  network: "Network",
  /**
   * @description The label for the input that allows entering timeout (a number in ms) configuration.
   */
  timeoutLabel: "Timeout",
  /**
   * @description The text in a tooltip for the timeout input that explains what timeout settings do.
   */
  timeoutExplanation: "The timeout setting (in milliseconds) applies to every action when replaying the recording. For example, if a DOM element identified by a CSS selector does not appear on the page within the specified timeout, the replay fails with an error.",
  /**
   * @description The label for the button that cancels replaying.
   */
  cancelReplay: "Cancel replay",
  /**
   * @description Button title that shows the code view when clicked.
   */
  showCode: "Show code",
  /**
   * @description Button title that hides the code view when clicked.
   */
  hideCode: "Hide code",
  /**
   * @description Button title that adds an assertion to the step editor.
   */
  addAssertion: "Add assertion",
  /**
   * @description The title of the button that opens the current recording in the Performance panel.
   */
  performancePanel: "Performance panel",
  /**
   * @description The announcement when the code sidebar is opened.
   */
  codeSidebarOpened: "Code sidebar opened",
  /**
   * @description The announcement when the code sidebar is closed.
   */
  codeSidebarClosed: "Code sidebar closed"
};
var str_8 = i18n15.i18n.registerUIStrings("panels/recorder/RecordingView.ts", UIStrings8);
var i18nString8 = i18n15.i18n.getLocalizedString.bind(void 0, str_8);
var networkConditionPresets = [
  SDK2.NetworkManager.NoThrottlingConditions,
  SDK2.NetworkManager.OfflineConditions,
  SDK2.NetworkManager.Slow3GConditions,
  SDK2.NetworkManager.Slow4GConditions,
  SDK2.NetworkManager.Fast4GConditions
];
function renderSettings({ settings, replaySettingsExpanded, onSelectMenuLabelClick, onNetworkConditionsChange, onTimeoutInput, isRecording, replayState, onReplaySettingsKeydown, onToggleReplaySettings }) {
  if (!settings) {
    return Lit10.nothing;
  }
  const environmentFragments = [];
  if (settings.viewportSettings) {
    environmentFragments.push(html10`<div>${settings.viewportSettings.isMobile ? i18nString8(UIStrings8.mobile) : i18nString8(UIStrings8.desktop)}</div>`);
    environmentFragments.push(html10`<div class="separator"></div>`);
    environmentFragments.push(html10`<div>${settings.viewportSettings.width}×${settings.viewportSettings.height} px</div>`);
  }
  const replaySettingsFragments = [];
  if (!replaySettingsExpanded) {
    if (settings.networkConditionsSettings) {
      if (settings.networkConditionsSettings.title) {
        replaySettingsFragments.push(html10`<div>${settings.networkConditionsSettings.title}</div>`);
      } else {
        replaySettingsFragments.push(html10`<div>
          ${i18nString8(UIStrings8.download, {
          value: i18n15.ByteUtilities.bytesToString(settings.networkConditionsSettings.download)
        })},
          ${i18nString8(UIStrings8.upload, {
          value: i18n15.ByteUtilities.bytesToString(settings.networkConditionsSettings.upload)
        })},
          ${i18nString8(UIStrings8.latency, {
          value: settings.networkConditionsSettings.latency
        })}
        </div>`);
      }
    } else {
      replaySettingsFragments.push(html10`<div>${SDK2.NetworkManager.NoThrottlingConditions.title instanceof Function ? SDK2.NetworkManager.NoThrottlingConditions.title() : SDK2.NetworkManager.NoThrottlingConditions.title}</div>`);
    }
    replaySettingsFragments.push(html10`<div class="separator"></div>`);
    replaySettingsFragments.push(html10`<div>${i18nString8(UIStrings8.timeout, {
      value: settings.timeout || Models7.RecordingPlayer.defaultTimeout
    })}</div>`);
  } else {
    const selectedOption = settings.networkConditionsSettings?.i18nTitleKey || SDK2.NetworkManager.NoThrottlingConditions.i18nTitleKey;
    const selectedOptionTitle = networkConditionPresets.find((preset) => preset.i18nTitleKey === selectedOption);
    let menuButtonTitle = "";
    if (selectedOptionTitle) {
      menuButtonTitle = selectedOptionTitle.title instanceof Function ? selectedOptionTitle.title() : selectedOptionTitle.title;
    }
    replaySettingsFragments.push(html10`<div class="editable-setting">
      <label class="wrapping-label" @click=${onSelectMenuLabelClick}>
        ${i18nString8(UIStrings8.network)}
        <select
            title=${menuButtonTitle}
            jslog=${VisualLogging8.dropDown("network-conditions").track({ change: true })}
            @change=${onNetworkConditionsChange}>
      ${networkConditionPresets.map((condition) => html10`
        <option jslog=${VisualLogging8.item(Platform5.StringUtilities.toKebabCase(condition.i18nTitleKey || ""))}
                value=${condition.i18nTitleKey || ""} ?selected=${selectedOption === condition.i18nTitleKey}>
                ${condition.title instanceof Function ? condition.title() : condition.title}
        </option>`)}
    </select>
      </label>
    </div>`);
    replaySettingsFragments.push(html10`<div class="editable-setting">
      <label class="wrapping-label" title=${i18nString8(UIStrings8.timeoutExplanation)}>
        ${i18nString8(UIStrings8.timeoutLabel)}
        <input
          @input=${onTimeoutInput}
          required
          min=${Models7.SchemaUtils.minTimeout}
          max=${Models7.SchemaUtils.maxTimeout}
          value=${settings.timeout || Models7.RecordingPlayer.defaultTimeout}
          jslog=${VisualLogging8.textField("timeout").track({ change: true })}
          class="devtools-text-input"
          type="number">
      </label>
    </div>`);
  }
  const isEditable = !isRecording && !replayState.isPlaying;
  const replaySettingsButtonClassMap = {
    "settings-title": true,
    expanded: replaySettingsExpanded
  };
  const replaySettingsClassMap = {
    expanded: replaySettingsExpanded,
    settings: true
  };
  return html10`
    <div class="settings-row">
      <div class="settings-container">
        <div
          class=${Lit10.Directives.classMap(replaySettingsButtonClassMap)}
          @keydown=${isEditable && onReplaySettingsKeydown}
          @click=${isEditable && onToggleReplaySettings}
          aria-expanded=${replaySettingsButtonClassMap.expanded ?? false}
          tabindex="0"
          role="button"
          jslog=${VisualLogging8.action("replay-settings").track({ click: true })}
          aria-label=${i18nString8(UIStrings8.editReplaySettings)}>
          <span>${i18nString8(UIStrings8.replaySettings)}</span>
          ${isEditable ? html10`<devtools-icon
                  class="chevron"
                  name="triangle-down">
                </devtools-icon>` : ""}
        </div>
        <div class=${Lit10.Directives.classMap(replaySettingsClassMap)}>
          ${replaySettingsFragments.length ? replaySettingsFragments : html10`<div>${i18nString8(UIStrings8.default)}</div>`}
        </div>
      </div>
      <div class="settings-container">
        <div class="settings-title">${i18nString8(UIStrings8.environment)}</div>
        <div class="settings">
          ${environmentFragments.length ? environmentFragments : html10`<div>${i18nString8(UIStrings8.default)}</div>`}
        </div>
      </div>
    </div>
  `;
}
function renderTimelineArea(input, output) {
  if (input.extensionDescriptor) {
    return html10`
        <devtools-widget class="recorder-extension-view" ${widget4(ExtensionView, { descriptor: input.extensionDescriptor })}>
        </devtools-widget>
      `;
  }
  return html10`
        <devtools-split-view
          direction="auto"
          sidebar-position="second"
          sidebar-initial-size="300"
          sidebar-visibility=${input.showCodeView ? "" : "hidden"}
        >
          <div slot="main">
            ${renderSections(input)}
          </div>
          <div slot="sidebar" jslog=${VisualLogging8.pane("source-code").track({ resize: true })}>
            ${input.showCodeView ? html10`
            <div class="section-toolbar" jslog=${VisualLogging8.toolbar()}>
              <devtools-select-menu
                @selectmenuselected=${input.onCodeFormatChange}
                .showDivider=${true}
                .showArrow=${true}
                .sideButton=${false}
                .showSelectedItem=${true}
                .position=${"bottom"}
                .buttonTitle=${input.converterName || ""}
                .jslogContext=${"code-format"}
              >
                ${input.builtInConverters.map((converter) => {
    return html10`<devtools-menu-item
                    .value=${converter.getId()}
                    .selected=${input.converterId === converter.getId()}
                    jslog=${VisualLogging8.action().track({ click: true }).context(`converter-${Platform5.StringUtilities.toKebabCase(converter.getId())}`)}
                  >
                    ${converter.getFormatName()}
                  </devtools-menu-item>`;
  })}
                ${input.extensionConverters.map((converter) => {
    return html10`<devtools-menu-item
                    .value=${converter.getId()}
                    .selected=${input.converterId === converter.getId()}
                    jslog=${VisualLogging8.action().track({ click: true }).context("converter-extension")}
                  >
                    ${converter.getFormatName()}
                  </devtools-menu-item>`;
  })}
              </devtools-select-menu>
              <devtools-button
                title=${Models7.Tooltip.getTooltipForActions(
    i18nString8(UIStrings8.hideCode),
    "chrome-recorder.toggle-code-view"
    /* Actions.RecorderActions.TOGGLE_CODE_VIEW */
  )}
                .data=${{
    variant: "icon",
    size: "SMALL",
    iconName: "cross"
  }}
                @click=${input.showCodeToggle}
                jslog=${VisualLogging8.close().track({ click: true })}
              ></devtools-button>
            </div>
            ${renderTextEditor(input, output)}` : Lit10.nothing}
          </div>
        </devtools-split-view>
      `;
}
function renderTextEditor(input, output) {
  if (!input.editorState) {
    throw new Error("Unexpected: trying to render the text editor without editorState");
  }
  return html10`
    <div class="text-editor" jslog=${VisualLogging8.textField().track({ change: true })}>
      <devtools-text-editor .state=${input.editorState} ${Lit10.Directives.ref((editor) => {
    if (!editor || !(editor instanceof TextEditor.TextEditor.TextEditor)) {
      return;
    }
    output.highlightLinesInEditor = (line, length, scroll = false) => {
      const cm = editor.editor;
      let selection = editor.createSelection({ lineNumber: line + length, columnNumber: 0 }, { lineNumber: line, columnNumber: 0 });
      const lastLine = editor.state.doc.lineAt(selection.main.anchor);
      selection = editor.createSelection({ lineNumber: line + length - 1, columnNumber: lastLine.length + 1 }, { lineNumber: line, columnNumber: 0 });
      cm.dispatch({
        selection,
        effects: scroll ? [
          CodeMirror.EditorView.scrollIntoView(selection.main, {
            y: "nearest"
          })
        ] : void 0
      });
    };
  })}></devtools-text-editor>
    </div>
  `;
}
function renderScreenshot(section5) {
  if (!section5.screenshot) {
    return null;
  }
  return html10`
      <img class="screenshot" src=${section5.screenshot} alt=${i18nString8(UIStrings8.screenshotForSection)} />
    `;
}
function renderReplayOrAbortButton(input) {
  if (input.replayState.isPlaying) {
    return html10`
        <devtools-button .jslogContext=${"abort-replay"} @click=${input.onAbortReplay} .iconName=${"pause"} .variant=${"outlined"}>
          ${i18nString8(UIStrings8.cancelReplay)}
        </devtools-button>`;
  }
  if (!input.recorderSettings) {
    return Lit10.nothing;
  }
  return html10`${widget4(ReplaySection, {
    settings: input.recorderSettings,
    replayExtensions: input.replayExtensions,
    onStartReplay: input.onTogglePlaying,
    disabled: input.replayState.isPlaying
  })}`;
}
function renderSections(input) {
  return html10`
      <div class="sections">
      ${!input.showCodeView ? html10`<div class="section-toolbar">
        <devtools-button
          @click=${input.showCodeToggle}
          class="show-code"
          .data=${{
    variant: "outlined",
    title: Models7.Tooltip.getTooltipForActions(
      i18nString8(UIStrings8.showCode),
      "chrome-recorder.toggle-code-view"
      /* Actions.RecorderActions.TOGGLE_CODE_VIEW */
    )
  }}
          jslog=${VisualLogging8.toggleSubpane(
    "chrome-recorder.toggle-code-view"
    /* Actions.RecorderActions.TOGGLE_CODE_VIEW */
  ).track({ click: true })}
        >
          ${i18nString8(UIStrings8.showCode)}
        </devtools-button>
      </div>` : ""}
      ${input.sections.map((section5, i) => html10`
            <div class="section">
              <div class="screenshot-wrapper">
                ${renderScreenshot(section5)}
              </div>
              <div class="content">
                <div class="steps">
                  ${widget4(StepView, {
    section: section5,
    state: input.getSectionState(section5),
    isStartOfGroup: true,
    isEndOfGroup: section5.steps.length === 0,
    isFirstSection: i === 0,
    isLastSection: i === input.sections.length - 1 && section5.steps.length === 0,
    isSelected: input.selectedStep === (section5.causingStep || null),
    sectionIndex: i,
    isRecording: input.isRecording,
    isPlaying: input.replayState.isPlaying,
    error: input.getSectionState(section5) === "error" ? input.currentError ?? void 0 : void 0,
    hasBreakpoint: false,
    removable: input.recording.steps.length > 1 && Boolean(section5.causingStep),
    onStepClick: input.onStepClick,
    onStepHover: input.onStepHover,
    onStepChanged: input.onStepChanged,
    onAddStep: input.onAddStep,
    onRemoveStep: input.onRemoveStep,
    onAddBreakpoint: input.onAddBreakpoint,
    onRemoveBreakpoint: input.onRemoveBreakpoint,
    onAttributeRequested: input.onAttributeRequested,
    onCopyStep: input.onCopyStep
  })}
                  ${section5.steps.map((step) => {
    const stepIndex = input.recording.steps.indexOf(step);
    return html10`
                      <devtools-widget
                      ${widget4(StepView, {
      step,
      state: input.getStepState(step),
      error: input.currentStep === step ? input.currentError ?? void 0 : void 0,
      isFirstSection: false,
      isLastSection: i === input.sections.length - 1 && input.recording.steps[input.recording.steps.length - 1] === step,
      isStartOfGroup: false,
      isEndOfGroup: section5.steps[section5.steps.length - 1] === step,
      stepIndex,
      hasBreakpoint: input.breakpointIndexes.has(stepIndex),
      sectionIndex: -1,
      isRecording: input.isRecording,
      isPlaying: input.replayState.isPlaying,
      removable: input.recording.steps.length > 1,
      builtInConverters: input.builtInConverters,
      extensionConverters: input.extensionConverters,
      isSelected: input.selectedStep === step,
      recorderSettings: input.recorderSettings ?? void 0,
      onStepClick: input.onStepClick,
      onStepHover: input.onStepHover,
      onCopyStep: input.onCopyStep,
      onStepChanged: input.onStepChanged,
      onAddStep: input.onAddStep,
      onRemoveStep: input.onRemoveStep,
      onAddBreakpoint: input.onAddBreakpoint,
      onRemoveBreakpoint: input.onRemoveBreakpoint,
      onAttributeRequested: input.onAttributeRequested
    })}
                      jslog=${VisualLogging8.section("step").track({ click: true })}
                      ></devtools-widget>
                    `;
  })}
                  ${!input.recordingTogglingInProgress && input.isRecording && i === input.sections.length - 1 ? html10`<devtools-button
                    class="step add-assertion-button"
                    .data=${{
    variant: "outlined",
    title: i18nString8(UIStrings8.addAssertion),
    jslogContext: "add-assertion"
  }}
                    @click=${input.onAddAssertion}
                  >${i18nString8(UIStrings8.addAssertion)}</devtools-button>` : void 0}
                  ${input.isRecording && i === input.sections.length - 1 ? html10`<div class="step recording">${i18nString8(UIStrings8.recording)}</div>` : null}
                </div>
              </div>
            </div>
      `)}
      </div>
    `;
}
function renderHeader(input) {
  if (!input.recording) {
    return Lit10.nothing;
  }
  const { title } = input.recording;
  const isTitleEditable = !input.replayState.isPlaying && !input.isRecording;
  return html10`
    <div class="header">
      <div class="header-title-wrapper">
        <div class="header-title">
          <input @blur=${input.onTitleBlur}
                @keydown=${input.onTitleInputKeyDown}
                id="title-input"
                jslog=${VisualLogging8.value("title").track({ change: true })}
                class=${Lit10.Directives.classMap({
    "has-error": input.isTitleInvalid,
    disabled: !isTitleEditable
  })}
                .value=${Lit10.Directives.live(title)}
                .disabled=${!isTitleEditable}
                maxlength="300"
                >
          <div class="title-button-bar">
            <devtools-button
              @click=${input.onEditTitleButtonClick}
              .data=${{
    disabled: !isTitleEditable,
    variant: "toolbar",
    iconName: "edit",
    title: i18nString8(UIStrings8.editTitle),
    jslogContext: "edit-title"
  }}
            ></devtools-button>
          </div>
        </div>
        ${input.isTitleInvalid ? html10`<div class="title-input-error-text">
          ${i18nString8(UIStrings8.requiredTitleError)}
        </div>` : Lit10.nothing}
      </div>
      ${!input.isRecording && input.replayAllowed ? html10`<div class="actions">
              <devtools-button
                @click=${input.onMeasurePerformanceClick}
                .data=${{
    disabled: input.replayState.isPlaying,
    variant: "outlined",
    iconName: "performance",
    title: i18nString8(UIStrings8.performancePanel),
    jslogContext: "measure-performance"
  }}
              >
                ${i18nString8(UIStrings8.performancePanel)}
              </devtools-button>
              <div class="separator"></div>
              ${renderReplayOrAbortButton(input)}
            </div>` : Lit10.nothing}
    </div>`;
}
var DEFAULT_VIEW10 = (input, output, target) => {
  const classNames = {
    wrapper: true,
    "is-recording": input.isRecording,
    "is-playing": input.replayState.isPlaying,
    "was-successful": input.lastReplayResult === "Success",
    "was-failure": input.lastReplayResult === "Failure"
  };
  const footerButtonTitle = input.recordingTogglingInProgress ? i18nString8(UIStrings8.recordingIsBeingStopped) : i18nString8(UIStrings8.endRecording);
  Lit10.render(html10`
    <style>${UI10.inspectorCommonStyles}</style>
    <style>${recordingView_css_default}</style>
    <style>${Input2.textInputStyles}</style>
    <div @click=${input.onWrapperClick} class=${Lit10.Directives.classMap(classNames)}>
      <div class="recording-view main">
        ${renderHeader(input)}
        ${input.extensionDescriptor ? html10`
            <devtools-widget class="recorder-extension-view" ${widget4(ExtensionView, {
    descriptor: input.extensionDescriptor,
    onClose: () => {
      target.dispatchEvent(new Event("recorderextensionviewclosed", { bubbles: true, composed: true }));
    }
  })}>
            </devtools-widget>` : html10`
          ${renderSettings(input)}
          ${renderTimelineArea(input, output)}
        `}
        ${input.isRecording ? html10`<div class="footer">
          <div class="controls">
            <devtools-widget
              class="control-button"
              ${widget4(ControlButton, {
    label: footerButtonTitle,
    shape: "square",
    disabled: input.recordingTogglingInProgress,
    onClick: input.onRecordingFinished
  })}
              jslog=${VisualLogging8.toggle("toggle-recording").track({ click: true })}
              title=${Models7.Tooltip.getTooltipForActions(
    footerButtonTitle,
    "chrome-recorder.start-recording"
    /* Actions.RecorderActions.START_RECORDING */
  )}
            >
            </devtools-widget>
          </div>
        </div>` : Lit10.nothing}
      </div>
    </div>
  `, target);
};
var RecordingView = class extends UI10.Widget.Widget {
  replayState = { isPlaying: false, isPausedOnBreakpoint: false };
  isRecording = false;
  recordingTogglingInProgress = false;
  recording = {
    title: "",
    steps: []
  };
  currentStep;
  currentError;
  sections = [];
  settings;
  lastReplayResult;
  replayAllowed = false;
  breakpointIndexes = /* @__PURE__ */ new Set();
  extensionConverters = [];
  replayExtensions;
  extensionDescriptor;
  onPlayRecording;
  onNetworkConditionsChanged;
  onTimeoutChanged;
  onTitleChanged;
  onAddAssertion;
  onRecordingFinished;
  onAbortReplay;
  onStepChanged;
  onAddStep;
  onRemoveStep;
  onAddBreakpoint;
  onRemoveBreakpoint;
  onAttributeRequested;
  #recorderSettings;
  get recorderSettings() {
    return this.#recorderSettings;
  }
  set recorderSettings(settings) {
    this.#recorderSettings = settings;
    this.#converterId = this.recorderSettings?.preferredCopyFormat ?? this.#builtInConverters[0]?.getId();
    void this.#convertToCode();
  }
  #builtInConverters = [];
  get builtInConverters() {
    return this.#builtInConverters;
  }
  set builtInConverters(converters) {
    this.#builtInConverters = converters;
    this.#converterId = this.recorderSettings?.preferredCopyFormat ?? this.#builtInConverters[0]?.getId();
    void this.#convertToCode();
  }
  #isTitleInvalid = false;
  #selectedStep = null;
  #replaySettingsExpanded = false;
  #showCodeView = false;
  #code = "";
  #converterId = "";
  #sourceMap;
  #editorState;
  #onCopyBound = this.#onCopy.bind(this);
  #view;
  #viewOutput = {};
  constructor(element, view) {
    super(element, { useShadowDom: true });
    this.#view = view || DEFAULT_VIEW10;
  }
  performUpdate() {
    const converter = [
      ...this.builtInConverters || [],
      ...this.extensionConverters || []
    ].find((converter2) => converter2.getId() === this.#converterId) ?? this.builtInConverters[0];
    this.#view({
      breakpointIndexes: this.breakpointIndexes,
      builtInConverters: this.builtInConverters,
      converterId: this.#converterId,
      converterName: converter?.getFormatName(),
      currentError: this.currentError ?? null,
      currentStep: this.currentStep ?? null,
      editorState: this.#editorState ?? null,
      extensionConverters: this.extensionConverters,
      extensionDescriptor: this.extensionDescriptor,
      isRecording: this.isRecording,
      isTitleInvalid: this.#isTitleInvalid,
      lastReplayResult: this.lastReplayResult ?? null,
      recorderSettings: this.#recorderSettings ?? null,
      recording: this.recording,
      recordingTogglingInProgress: this.recordingTogglingInProgress,
      replayAllowed: this.replayAllowed,
      replayExtensions: this.replayExtensions ?? [],
      replaySettingsExpanded: this.#replaySettingsExpanded,
      replayState: this.replayState,
      sections: this.sections,
      selectedStep: this.#selectedStep ?? null,
      settings: this.settings ?? null,
      showCodeView: this.#showCodeView,
      onAddAssertion: () => {
        this.onAddAssertion?.();
      },
      onRecordingFinished: () => {
        this.onRecordingFinished?.();
      },
      getSectionState: this.#getSectionState.bind(this),
      getStepState: this.#getStepState.bind(this),
      onAbortReplay: () => {
        this.onAbortReplay?.();
      },
      onMeasurePerformanceClick: this.#handleMeasurePerformanceClickEvent.bind(this),
      onTogglePlaying: (speed, extension) => {
        this.onPlayRecording?.({
          targetPanel: "chrome-recorder",
          speed,
          extension
        });
      },
      onStepChanged: (currentStep, newStep) => this.onStepChanged?.(currentStep, newStep),
      onAddStep: (stepOrSection, position) => this.onAddStep?.(stepOrSection, position),
      onRemoveStep: (step) => this.onRemoveStep?.(step),
      onAddBreakpoint: (index) => this.onAddBreakpoint?.(index),
      onRemoveBreakpoint: (index) => this.onRemoveBreakpoint?.(index),
      onAttributeRequested: (send) => this.onAttributeRequested?.(send),
      onCodeFormatChange: this.#onCodeFormatChange.bind(this),
      onCopyStep: this.#onCopyStepEvent.bind(this),
      onEditTitleButtonClick: this.#onEditTitleButtonClick.bind(this),
      onNetworkConditionsChange: this.#onNetworkConditionsChange.bind(this),
      onReplaySettingsKeydown: this.#onReplaySettingsKeydown.bind(this),
      onSelectMenuLabelClick: this.#onSelectMenuLabelClick.bind(this),
      onStepClick: this.#onStepClick.bind(this),
      onStepHover: this.#onStepHover.bind(this),
      onTimeoutInput: this.#onTimeoutInput.bind(this),
      onTitleBlur: this.#onTitleBlur.bind(this),
      onTitleInputKeyDown: this.#onTitleInputKeyDown.bind(this),
      onToggleReplaySettings: this.#onToggleReplaySettings.bind(this),
      onWrapperClick: this.#onWrapperClick.bind(this),
      showCodeToggle: this.showCodeToggle.bind(this)
    }, this.#viewOutput, this.contentElement);
  }
  wasShown() {
    super.wasShown();
    document.addEventListener("copy", this.#onCopyBound);
    this.performUpdate();
  }
  willHide() {
    super.willHide();
    document.removeEventListener("copy", this.#onCopyBound);
  }
  scrollToBottom() {
    const wrapper = this.contentElement?.querySelector(".sections");
    if (!wrapper) {
      return;
    }
    wrapper.scrollTop = wrapper.scrollHeight;
  }
  #getStepState(step) {
    if (!this.currentStep) {
      return "default";
    }
    if (step === this.currentStep) {
      if (this.currentError) {
        return "error";
      }
      if (!this.replayState?.isPlaying) {
        return "success";
      }
      if (this.replayState?.isPausedOnBreakpoint) {
        return "stopped";
      }
      return "current";
    }
    const currentIndex = this.recording.steps.indexOf(this.currentStep);
    if (currentIndex === -1) {
      return "default";
    }
    const index = this.recording.steps.indexOf(step);
    return index < currentIndex ? "success" : "outstanding";
  }
  #getSectionState(section5) {
    const currentStep = this.currentStep;
    if (!currentStep) {
      return "default";
    }
    const currentSection = this.sections.find((section6) => section6.steps.includes(currentStep));
    if (!currentSection) {
      if (this.currentError) {
        return "error";
      }
    }
    if (section5 === currentSection) {
      return "success";
    }
    const index = this.sections.indexOf(currentSection);
    const ownIndex = this.sections.indexOf(section5);
    return index >= ownIndex ? "success" : "outstanding";
  }
  #onStepHover = (stepOrSection) => {
    const step = "type" in stepOrSection ? stepOrSection : stepOrSection.causingStep;
    if (!step || this.#selectedStep) {
      return;
    }
    this.#highlightCodeForStep(step);
  };
  #onStepClick(stepOrSection) {
    const selectedStep = "type" in stepOrSection ? stepOrSection : stepOrSection.causingStep || null;
    if (this.#selectedStep === selectedStep) {
      return;
    }
    this.#selectedStep = selectedStep;
    this.performUpdate();
    if (selectedStep) {
      this.#highlightCodeForStep(
        selectedStep,
        /* scroll=*/
        true
      );
    }
  }
  #onWrapperClick() {
    if (!this.#selectedStep) {
      return;
    }
    this.#selectedStep = null;
    this.performUpdate();
  }
  #onReplaySettingsKeydown(event) {
    if (event.key !== "Enter") {
      return;
    }
    event.preventDefault();
    this.#onToggleReplaySettings(event);
  }
  #onToggleReplaySettings(event) {
    event.stopPropagation();
    this.#replaySettingsExpanded = !this.#replaySettingsExpanded;
    this.performUpdate();
  }
  #onNetworkConditionsChange(event) {
    const throttlingMenu = event.target;
    if (throttlingMenu instanceof HTMLSelectElement) {
      const preset = networkConditionPresets.find((preset2) => preset2.i18nTitleKey === throttlingMenu.value);
      this.onNetworkConditionsChanged?.(preset?.i18nTitleKey === SDK2.NetworkManager.NoThrottlingConditions.i18nTitleKey ? void 0 : preset);
    }
  }
  #onTimeoutInput(event) {
    const target = event.target;
    if (!target.checkValidity()) {
      target.reportValidity();
      return;
    }
    this.onTimeoutChanged?.(Number(target.value));
  }
  #onTitleBlur = (event) => {
    const target = event.target;
    const title = target.value.trim();
    if (!title) {
      this.#isTitleInvalid = true;
      this.performUpdate();
      return;
    }
    this.onTitleChanged?.(title);
  };
  #onTitleInputKeyDown = (event) => {
    switch (event.code) {
      case "Escape":
      case "Enter":
        event.target.blur();
        event.stopPropagation();
        break;
    }
  };
  #onEditTitleButtonClick = () => {
    const input = this.contentElement.querySelector("#title-input");
    if (!input) {
      throw new Error("Missing #title-input");
    }
    input.focus();
  };
  #onSelectMenuLabelClick = (event) => {
    const target = event.target;
    if (target.matches(".wrapping-label")) {
      target.querySelector("devtools-select-menu")?.click();
    }
  };
  async #copyCurrentSelection(step) {
    let converter = [
      ...this.builtInConverters,
      ...this.extensionConverters
    ].find((converter2) => converter2.getId() === this.recorderSettings?.preferredCopyFormat);
    if (!converter) {
      converter = this.builtInConverters[0];
    }
    if (!converter) {
      throw new Error("No default converter found");
    }
    let text = "";
    if (step) {
      text = await converter.stringifyStep(step);
    } else if (this.recording) {
      [text] = await converter.stringify(this.recording);
    }
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(text);
  }
  #onCopyStepEvent(step) {
    void this.#copyCurrentSelection(step);
  }
  async #onCopy(event) {
    if (event.target !== document.body) {
      return;
    }
    event.preventDefault();
    await this.#copyCurrentSelection(this.#selectedStep);
    Host.userMetrics.keyboardShortcutFired(
      "chrome-recorder.copy-recording-or-step"
      /* Actions.RecorderActions.COPY_RECORDING_OR_STEP */
    );
  }
  #handleMeasurePerformanceClickEvent(event) {
    event.stopPropagation();
    this.onPlayRecording?.({
      targetPanel: "timeline",
      speed: "normal"
    });
  }
  showCodeToggle = () => {
    this.#showCodeView = !this.#showCodeView;
    if (this.#showCodeView) {
      UI10.ARIAUtils.LiveAnnouncer.alert(i18nString8(UIStrings8.codeSidebarOpened));
    } else {
      UI10.ARIAUtils.LiveAnnouncer.alert(i18nString8(UIStrings8.codeSidebarClosed));
    }
    void this.#convertToCode();
  };
  #convertToCode = async () => {
    if (!this.recording) {
      return;
    }
    const converter = [
      ...this.builtInConverters || [],
      ...this.extensionConverters || []
    ].find((converter2) => converter2.getId() === this.#converterId) ?? this.builtInConverters[0];
    if (!converter) {
      return;
    }
    const [code, sourceMap] = await converter.stringify(this.recording);
    this.#code = code;
    this.#sourceMap = sourceMap;
    this.#sourceMap?.shift();
    const mediaType = converter.getMediaType();
    const languageSupport = mediaType ? await CodeHighlighter.CodeHighlighter.languageFromMIME(mediaType) : null;
    this.#editorState = CodeMirror.EditorState.create({
      doc: this.#code,
      extensions: [
        TextEditor.Config.baseConfiguration(this.#code),
        CodeMirror.EditorState.readOnly.of(true),
        CodeMirror.EditorView.lineWrapping,
        languageSupport ? languageSupport : []
      ]
    });
    this.performUpdate();
    this.contentElement.dispatchEvent(new Event("code-generated"));
  };
  #highlightCodeForStep = (step, scroll = false) => {
    if (!this.#sourceMap) {
      return;
    }
    const stepIndex = this.recording.steps.indexOf(step);
    if (stepIndex === -1) {
      return;
    }
    const line = this.#sourceMap[stepIndex * 2];
    const length = this.#sourceMap[stepIndex * 2 + 1];
    this.#viewOutput.highlightLinesInEditor?.(line, length, scroll);
  };
  #onCodeFormatChange = (event) => {
    this.#converterId = event.itemValue;
    if (this.recorderSettings) {
      this.recorderSettings.preferredCopyFormat = event.itemValue;
    }
    void this.#convertToCode();
  };
};

// gen/front_end/panels/recorder/RecorderPanel.js
var { ref: ref2, repeat: repeat3 } = Directives5;
var recorderPanelInstance;
var UIStrings9 = {
  /**
   * @description The title of the button that leads to a page for creating a new recording.
   */
  createRecording: "Create recording",
  /**
   * @description The title of the button that allows importing a recording.
   */
  importRecording: "Import recording",
  /**
   * @description The announcement text for screen readers when a recording is imported.
   */
  recordingImported: "Recording imported",
  /**
   * @description The title of the button that deletes the recording.
   */
  deleteRecording: "Delete recording",
  /**
   * @description The announcement text for screen readers when a recording is deleted.
   */
  recordingDeleted: "Recording deleted",
  /**
   * @description The title of the select option if the user has no saved recordings.
   */
  noRecordings: "No recordings",
  /**
   * @description The title of the select option for one or more recording number followed by this text - 1 recording(s) or 4 recording(s).
   */
  numberOfRecordings: "recording(s)",
  /**
   * @description The title of the button that continues the replay.
   */
  continueReplay: "Continue",
  /**
   * @description The title of the button that executes only one step in the replay.
   */
  stepOverReplay: "Execute one step",
  /**
   * @description The title of the button that opens a menu with various options of exporting a recording to file.
   */
  exportRecording: "Export recording",
  /**
   * @description The title of shortcut for starting and stopping recording.
   */
  startStopRecording: "Start/stop recording",
  /**
   * @description The title of shortcut for replaying recording.
   */
  replayRecording: "Replay recording",
  /**
   * @description The title of shortcut for copying a recording or selected step.
   */
  copyShortcut: "Copy recording or selected step",
  /**
   * @description The title of shortcut for toggling code view.
   */
  toggleCode: "Toggle code view",
  /**
   * @description The title of the menu group in the export menu of the Recorder
   * panel that is followed by the list of built-in export formats.
   */
  export: "Export",
  /**
   * @description The announcement text for screen readers when a recording is exported successfully.
   */
  recordingExported: "Recording exported",
  /**
   * @description The title of the menu group in the export menu of the Recorder
   * panel that is followed by the list of export formats available via browser
   * extensions.
   */
  exportViaExtensions: "Export via extensions",
  /**
   * @description The title of the menu option that leads to a page that lists
   * all browser extensions available for the Recorder panel.
   */
  getExtensions: "Get extensions\u2026",
  /**
   * @description The button label that leads to the feedback form for the Recorder panel.
   */
  sendFeedback: "Send feedback",
  /**
   * @description The header of the start page in the Recorder panel.
   */
  header: "Nothing recorded yet",
  /**
   * @description Text to explain the usage of the Recorder panel.
   */
  recordingDescription: "Use recordings to create automated end-to-end tests or performance traces.",
  /**
   * @description Link text to forward to a documentation page on the Recorder panel.
   */
  learnMore: "Learn more",
  /**
   * @description Headline of warning shown when users import a recording into the Recorder panel.
   */
  doYouTrustThisCode: "Do you trust this recording?",
  /**
   * @description Warning shown to users when importing code into the Recorder panel. IMPORTANT: keep double quotes around PH1 and do not use single quotes.
   * @example {allow importing} PH1
   */
  doNotImport: 'Don\u2019t import recordings you don\u2019t understand or haven\u2019t reviewed yourself into DevTools. This could allow attackers to steal your identity or take control of your computer. Type "{PH1}" below to allow importing.',
  /**
   * @description Text a user needs to type in order to confirm that they
   * are aware of the danger of importing code into the Recorder panel.
   */
  allowImporting: "allow importing",
  /**
   * @description Input box placeholder which instructs the user to type 'allow importing' into the input box. IMPORTANT: keep double quotes around PH1 and do not use single quotes.
   * @example {allow importing} PH1
   */
  typeAllowImporting: 'Type "{PH1}"'
};
var str_9 = i18n17.i18n.registerUIStrings("panels/recorder/RecorderPanel.ts", UIStrings9);
var i18nString9 = i18n17.i18n.getLocalizedString.bind(void 0, str_9);
var { widget: widget5 } = UI11.Widget;
var GET_EXTENSIONS_MENU_ITEM = "get-extensions-link";
var GET_EXTENSIONS_URL = "https://goo.gle/recorder-extension-list";
var RECORDER_EXPLANATION_URL = "https://developer.chrome.com/docs/devtools/recorder";
var FEEDBACK_URL = "https://goo.gle/recorder-feedback";
var CONVERTER_ID_TO_METRIC = {
  [
    "json"
    /* Models.ConverterIds.ConverterIds.JSON */
  ]: 2,
  [
    "@puppeteer/replay"
    /* Models.ConverterIds.ConverterIds.REPLAY */
  ]: 3,
  [
    "puppeteer"
    /* Models.ConverterIds.ConverterIds.PUPPETEER */
  ]: 1,
  [
    "puppeteer-firefox"
    /* Models.ConverterIds.ConverterIds.PUPPETEER_FIREFOX */
  ]: 1,
  [
    "lighthouse"
    /* Models.ConverterIds.ConverterIds.LIGHTHOUSE */
  ]: 5
};
function verifyFlowSize(flow) {
  if (flow.steps.length > 4096) {
    throw new Error("Recording with steps over 4096 is not allowed");
  }
  if (flow.title.length > 300) {
    throw new Error("Recording with title over 300 characters is not allowed");
  }
}
var DEFAULT_VIEW11 = (input, output, target) => {
  function renderCurrentPage() {
    switch (input.currentPage) {
      case "StartPage":
        return renderStartPage();
      case "AllRecordingsPage":
        return renderAllRecordingsPage();
      case "RecordingPage":
        return renderRecordingPage();
      case "CreateRecordingPage":
        return renderCreateRecordingPage();
    }
  }
  function renderAllRecordingsPage() {
    return html11`
      <devtools-widget
        ${widget5(RecordingListView, {
      recordings: input.recordings.map((recording) => ({
        storageName: recording.storageName,
        name: recording.flow.title
      })),
      replayAllowed: input.replayAllowed,
      onCreateRecording: input.onCreateNewRecording,
      onDeleteRecording: input.onDeleteRecording,
      onOpenRecording: input.onRecordingSelected,
      onPlayRecording: input.onPlayRecordingByName
    })}
      >
      </devtools-widget>
    `;
  }
  function renderStartPage() {
    return html11`
      <div class="empty-state" jslog=${VisualLogging9.section().context("start-view")}>
        <div class="empty-state-header">${i18nString9(UIStrings9.header)}</div>
        <div class="empty-state-description">
          <span>${i18nString9(UIStrings9.recordingDescription)}</span>
          <devtools-link
            class="devtools-link"
            href=${RECORDER_EXPLANATION_URL}
            jslogcontext="learn-more"
          >${i18nString9(UIStrings9.learnMore)}</devtools-link>
        </div>
        <devtools-button .variant=${"tonal"} jslogContext=${"chrome-recorder.create-recording"} @click=${input.onCreateNewRecording}>${i18nString9(UIStrings9.createRecording)}</devtools-button>
      </div>
    `;
  }
  function renderRecordingPage() {
    return html11`
      <devtools-widget
          class="recording-view"
          ${widget5(RecordingView, {
      recording: input.currentRecording?.flow ?? { title: "", steps: [] },
      replayState: input.replayState,
      isRecording: input.isRecording,
      recordingTogglingInProgress: input.isToggling,
      currentStep: input.currentStep,
      currentError: input.recordingError,
      sections: input.sections ?? [],
      settings: input.settings,
      recorderSettings: input.recorderSettings,
      lastReplayResult: input.lastReplayResult,
      replayAllowed: input.replayAllowed,
      breakpointIndexes: input.breakpointIndexes,
      builtInConverters: input.builtInConverters,
      extensionConverters: input.extensionConverters,
      replayExtensions: input.replayExtensions,
      extensionDescriptor: input.extensionDescriptor,
      onRecordingFinished: input.onRecordingFinished,
      onAddAssertion: input.handleAddAssertionEvent,
      onAbortReplay: input.onAbortReplay,
      onPlayRecording: input.onPlayRecording,
      onNetworkConditionsChanged: input.onNetworkConditionsChanged,
      onTimeoutChanged: input.onTimeoutChanged,
      onTitleChanged: input.handleRecordingTitleChanged,
      onStepChanged: input.handleRecordingChanged,
      onAddStep: input.handleStepAdded,
      onRemoveStep: input.handleStepRemoved,
      onAddBreakpoint: input.onAddBreakpoint,
      onRemoveBreakpoint: input.onRemoveBreakpoint,
      onAttributeRequested: (send) => {
        send(input.currentRecording?.flow.selectorAttribute);
      }
    })}
          @recorderextensionviewclosed=${input.onExtensionViewClosed}
          ${UI11.Widget.widgetRef(RecordingView, (widget6) => {
      output.recordingView = widget6;
    })}
        ></devtools-widget>
    `;
  }
  function renderCreateRecordingPage() {
    return html11`
      <devtools-widget
        class="recording-view"
        ${widget5(CreateRecordingView, {
      recorderSettings: input.recorderSettings,
      onRecordingStarted: input.onRecordingStarted,
      onRecordingCancelled: input.onRecordingCancelled
    })}
        ${UI11.Widget.widgetRef(CreateRecordingView, (widget6) => {
      output.createRecordingView = widget6;
    })}
      ></devtools-widget>
    `;
  }
  const selectValue = input.currentRecording ? input.currentRecording.storageName : input.currentPage;
  const values = [
    input.recordings.length === 0 ? {
      value: "StartPage",
      name: i18nString9(UIStrings9.noRecordings),
      selected: selectValue === "StartPage"
    } : {
      value: "AllRecordingsPage",
      name: `${input.recordings.length} ${i18nString9(UIStrings9.numberOfRecordings)}`,
      selected: selectValue === "AllRecordingsPage"
    },
    ...input.recordings.map((recording) => ({
      value: recording.storageName,
      name: recording.flow.title,
      selected: selectValue === recording.storageName
    }))
  ];
  render11(html11`
        <style>${UI11.inspectorCommonStyles}</style>
        <style>${recorderPanel_css_default}</style>
        <div class="wrapper">
          <div class="header" jslog=${VisualLogging9.toolbar()}>
            <devtools-button
              @click=${input.onCreateNewRecording}
              .data=${{
    variant: "toolbar",
    iconName: "plus",
    disabled: input.replayState.isPlaying || input.isRecording || input.isToggling,
    title: Models8.Tooltip.getTooltipForActions(
      i18nString9(UIStrings9.createRecording),
      "chrome-recorder.create-recording"
      /* Actions.RecorderActions.CREATE_RECORDING */
    ),
    jslogContext: "chrome-recorder.create-recording"
  }}
            ></devtools-button>
            <div class="separator"></div>
            <select
              .disabled=${input.recordings.length === 0 || input.replayState.isPlaying || input.isRecording || input.isToggling}
              @click=${(e) => e.stopPropagation()}
              @change=${input.onRecordingSelected}
              jslog=${VisualLogging9.dropDown("recordings").track({ change: true })}
            >
              ${repeat3(values, (item5) => item5.value, (item5) => {
    return html11`<option .selected=${item5.selected} value=${item5.value}>${item5.name}</option>`;
  })}
            </select>
            <div class="separator"></div>
            <devtools-button
              @click=${input.onImportRecording}
              .data=${{
    variant: "toolbar",
    iconName: "import",
    title: i18nString9(UIStrings9.importRecording),
    jslogContext: "import-recording"
  }}
            ></devtools-button>
            <devtools-button
              id='origin'
              @click=${input.onExportRecording}
              ${ref2((el) => {
    if (el instanceof HTMLElement) {
      output.exportMenuButton = el;
    }
  })}
              .data=${{
    variant: "toolbar",
    iconName: "download",
    title: i18nString9(UIStrings9.exportRecording),
    disabled: !input.currentRecording
  }}
              jslog=${VisualLogging9.dropDown("export-recording").track({ click: true })}
            ></devtools-button>
            <devtools-menu
              @menucloserequest=${input.onExportMenuClosed}
              @menuitemselected=${input.onExportOptionSelected}
              .origin=${input.getExportMenuButton}
              .showDivider=${false}
              .showSelectedItem=${false}
              .open=${input.exportMenuExpanded}
            >
              <devtools-menu-group .name=${i18nString9(UIStrings9.export)}>
                ${repeat3(input.builtInConverters, (converter) => {
    return html11`
                    <devtools-menu-item
                      .value=${converter.getId()}
                      jslog=${VisualLogging9.item(`converter-${Platform7.StringUtilities.toKebabCase(converter.getId())}`).track({ click: true })}>
                      ${converter.getFormatName()}
                    </devtools-menu-item>
                  `;
  })}
              </devtools-menu-group>
              <devtools-menu-group .name=${i18nString9(UIStrings9.exportViaExtensions)}>
                ${repeat3(input.extensionConverters, (converter) => {
    return html11`
                    <devtools-menu-item
                     .value=${converter.getId()}
                      jslog=${VisualLogging9.item("converter-extension").track({ click: true })}>
                    ${converter.getFormatName()}
                    </devtools-menu-item>
                  `;
  })}
                <devtools-menu-item .value=${GET_EXTENSIONS_MENU_ITEM}>
                  ${i18nString9(UIStrings9.getExtensions)}
                </devtools-menu-item>
              </devtools-menu-group>
            </devtools-menu>
            <devtools-button
              @click=${input.onDeleteRecording}
              .data=${{
    variant: "toolbar",
    iconName: "bin",
    disabled: !input.currentRecording || input.replayState.isPlaying || input.isRecording || input.isToggling,
    title: i18nString9(UIStrings9.deleteRecording),
    jslogContext: "delete-recording"
  }}
            ></devtools-button>
            <div class="separator"></div>
            <devtools-button
              @click=${input.onContinueReplay}
              .data=${{
    variant: "primary_toolbar",
    iconName: "resume",
    disabled: !input.replayState.isPausedOnBreakpoint,
    title: i18nString9(UIStrings9.continueReplay),
    jslogContext: "continue-replay"
  }}
            ></devtools-button>
            <devtools-button
              @click=${input.onStepOverReplay}
              .data=${{
    variant: "toolbar",
    iconName: "step-over",
    disabled: !input.replayState.isPausedOnBreakpoint,
    title: i18nString9(UIStrings9.stepOverReplay),
    jslogContext: "step-over"
  }}
            ></devtools-button>
            <div class="feedback">
              <devtools-link class="devtools-link" title=${i18nString9(UIStrings9.sendFeedback)} href=${FEEDBACK_URL} jslogcontext="feedback">${i18nString9(UIStrings9.sendFeedback)}</devtools-link>
            </div>
            <div class="separator"></div>
            <devtools-shortcut-dialog
              .data=${{
    shortcuts: input.shortcutsInfo
  }} jslog=${VisualLogging9.action("show-shortcuts").track({ click: true })}
            ></devtools-shortcut-dialog>
          </div>
          ${input.importError ? html11`<div class='error'>Import error: ${input.importError.message}</div>` : ""}
          ${renderCurrentPage()}
        </div>
    `, target, { container: { listeners: { setrecording: input.onSetRecording } } });
};
var RecorderPanel = class _RecorderPanel extends UI11.Widget.VBox {
  static panelName = "chrome-recorder";
  static instance(opts = {}) {
    const { forceNew } = opts;
    if (!recorderPanelInstance || forceNew) {
      recorderPanelInstance = new _RecorderPanel();
    }
    return recorderPanelInstance;
  }
  #currentRecordingSession;
  get currentRecordingSession() {
    return this.#currentRecordingSession;
  }
  set currentRecordingSession(value2) {
    if (this.#currentRecordingSession !== value2) {
      this.#currentRecordingSession = value2;
      this.requestUpdate();
    }
  }
  #currentRecording;
  get currentRecording() {
    return this.#currentRecording;
  }
  set currentRecording(value2) {
    if (this.#currentRecording !== value2) {
      this.#currentRecording = value2;
      this.requestUpdate();
    }
  }
  #currentStep;
  get currentStep() {
    return this.#currentStep;
  }
  set currentStep(value2) {
    if (this.#currentStep !== value2) {
      this.#currentStep = value2;
      this.requestUpdate();
    }
  }
  #recordingError;
  get recordingError() {
    return this.#recordingError;
  }
  set recordingError(value2) {
    if (this.#recordingError !== value2) {
      this.#recordingError = value2;
      this.requestUpdate();
    }
  }
  #storage = Models8.RecordingStorage.RecordingStorage.instance();
  #screenshotStorage = Models8.ScreenshotStorage.ScreenshotStorage.instance();
  #isRecording = false;
  get isRecording() {
    return this.#isRecording;
  }
  set isRecording(value2) {
    if (this.#isRecording !== value2) {
      this.#isRecording = value2;
      this.requestUpdate();
    }
  }
  #isToggling = false;
  get isToggling() {
    return this.#isToggling;
  }
  set isToggling(value2) {
    if (this.#isToggling !== value2) {
      this.#isToggling = value2;
      this.requestUpdate();
    }
  }
  // TODO: we keep the functionality to allow/disallow replay but right now it's not used.
  // It can be used to decide if we allow replay on a certain target for example.
  #replayAllowed = true;
  #recordingPlayer;
  get recordingPlayer() {
    return this.#recordingPlayer;
  }
  set recordingPlayer(value2) {
    if (this.#recordingPlayer !== value2) {
      this.#recordingPlayer = value2;
      this.requestUpdate();
    }
  }
  #lastReplayResult;
  get lastReplayResult() {
    return this.#lastReplayResult;
  }
  set lastReplayResult(value2) {
    if (this.#lastReplayResult !== value2) {
      this.#lastReplayResult = value2;
      this.requestUpdate();
    }
  }
  #replayState = { isPlaying: false, isPausedOnBreakpoint: false };
  #currentPage = "StartPage";
  get currentPage() {
    return this.#currentPage;
  }
  set currentPage(value2) {
    if (this.#currentPage !== value2) {
      this.#currentPage = value2;
      this.requestUpdate();
    }
  }
  #previousPage;
  get previousPage() {
    return this.#previousPage;
  }
  set previousPage(value2) {
    if (this.#previousPage !== value2) {
      this.#previousPage = value2;
      this.requestUpdate();
    }
  }
  #fileSelector;
  #sections;
  get sections() {
    return this.#sections;
  }
  set sections(value2) {
    if (this.#sections !== value2) {
      this.#sections = value2;
      this.requestUpdate();
    }
  }
  #settings;
  get settings() {
    return this.#settings;
  }
  set settings(value2) {
    if (this.#settings !== value2) {
      this.#settings = value2;
      this.requestUpdate();
    }
  }
  #importError;
  get importError() {
    return this.#importError;
  }
  set importError(value2) {
    if (this.#importError !== value2) {
      this.#importError = value2;
      this.requestUpdate();
    }
  }
  #exportMenuExpanded = false;
  get exportMenuExpanded() {
    return this.#exportMenuExpanded;
  }
  set exportMenuExpanded(value2) {
    if (this.#exportMenuExpanded !== value2) {
      this.#exportMenuExpanded = value2;
      this.requestUpdate();
    }
  }
  #exportMenuButton;
  #stepBreakpointIndexes = /* @__PURE__ */ new Set();
  #builtInConverters;
  #extensionConverters = [];
  get extensionConverters() {
    return this.#extensionConverters;
  }
  set extensionConverters(value2) {
    if (this.#extensionConverters !== value2) {
      this.#extensionConverters = value2;
      this.requestUpdate();
    }
  }
  #replayExtensions = [];
  get replayExtensions() {
    return this.#replayExtensions;
  }
  set replayExtensions(value2) {
    if (this.#replayExtensions !== value2) {
      this.#replayExtensions = value2;
      this.requestUpdate();
    }
  }
  #viewDescriptor;
  get viewDescriptor() {
    return this.#viewDescriptor;
  }
  set viewDescriptor(value2) {
    if (this.#viewDescriptor !== value2) {
      this.#viewDescriptor = value2;
      this.requestUpdate();
    }
  }
  #extensionViewShowRequestedListener;
  #recorderSettings = new Models8.RecorderSettings.RecorderSettings();
  #shortcutHelper = new Models8.RecorderShortcutHelper.RecorderShortcutHelper();
  #disableRecorderImportWarningSetting = Common2.Settings.Settings.instance().createSetting(
    "disable-recorder-import-warning",
    false,
    "Synced"
    /* Common.Settings.SettingStorageType.SYNCED */
  );
  #selfXssWarningDisabledSetting = Common2.Settings.Settings.instance().createSetting(
    "disable-self-xss-warning",
    false,
    "Synced"
    /* Common.Settings.SettingStorageType.SYNCED */
  );
  #recordingView;
  #createRecordingView;
  #view;
  constructor(element, view) {
    const el = element || document.createElement("devtools-recorder-panel");
    super(el, { useShadowDom: "pure" });
    this.#view = view || DEFAULT_VIEW11;
    this.setHideOnDetach();
    this.isRecording = false;
    this.isToggling = false;
    this.exportMenuExpanded = false;
    this.currentPage = "StartPage";
    if (this.#storage.getRecordings().length) {
      this.#setCurrentPage(
        "AllRecordingsPage"
        /* Pages.ALL_RECORDINGS_PAGE */
      );
    }
    const textEditorIndent = Common2.Settings.Settings.instance().moduleSetting("text-editor-indent").get();
    this.#builtInConverters = Object.freeze([
      new Converters.JSONConverter.JSONConverter(textEditorIndent),
      new Converters.PuppeteerReplayConverter.PuppeteerReplayConverter(textEditorIndent),
      new Converters.PuppeteerConverter.PuppeteerConverter(textEditorIndent),
      new Converters.PuppeteerFirefoxConverter.PuppeteerFirefoxConverter(textEditorIndent),
      new Converters.LighthouseConverter.LighthouseConverter(textEditorIndent)
    ]);
    const extensionManager = Extensions2.ExtensionManager.ExtensionManager.instance();
    this.#updateExtensions(extensionManager.extensions());
    extensionManager.addEventListener("extensionsUpdated", (event) => {
      this.#updateExtensions(event.data);
    });
  }
  wasShown() {
    super.wasShown();
    UI11.Context.Context.instance().setFlavor(_RecorderPanel, this);
    this.requestUpdate();
    void this.updateComplete.then(() => {
      this.focus();
    });
  }
  willHide() {
    super.willHide();
    UI11.Context.Context.instance().setFlavor(_RecorderPanel, null);
  }
  onDetach() {
    super.onDetach();
    if (this.currentRecordingSession) {
      void this.currentRecordingSession.stop();
    }
    if (this.#extensionViewShowRequestedListener) {
      PublicExtensions.RecorderPluginManager.RecorderPluginManager.instance().removeEventListener("showViewRequested", this.#extensionViewShowRequestedListener);
      this.#extensionViewShowRequestedListener = void 0;
    }
  }
  #updateExtensions(extensions) {
    this.extensionConverters = extensions.filter((extension) => extension.getCapabilities().includes("export")).map((extension, idx) => {
      return new Converters.ExtensionConverter.ExtensionConverter(idx, extension);
    });
    this.replayExtensions = extensions.filter((extension) => extension.getCapabilities().includes("replay"));
  }
  setIsRecordingStateForTesting(isRecording) {
    this.isRecording = isRecording;
  }
  setRecordingStateForTesting(state) {
    this.#replayState.isPlaying = state.isPlaying;
    this.#replayState.isPausedOnBreakpoint = state.isPausedOnBreakpoint;
  }
  setCurrentPageForTesting(page) {
    this.#setCurrentPage(page);
  }
  getCurrentPageForTesting() {
    return this.currentPage;
  }
  getCurrentRecordingForTesting() {
    return this.currentRecording;
  }
  getStepBreakpointIndexesForTesting() {
    return [...this.#stepBreakpointIndexes.values()];
  }
  /**
   * We should clear errors on every new action in the controller.
   * TODO: think how to make handle this centrally so that in no case
   * the error remains shown for longer than needed. Maybe a timer?
   */
  #clearError() {
    this.importError = void 0;
  }
  async #importFile(file) {
    const outputStream = new Common2.StringOutputStream.StringOutputStream();
    const reader = new Bindings.FileUtils.ChunkedFileReader(
      file,
      /* chunkSize */
      1e7
    );
    const success = await reader.read(outputStream);
    if (!success) {
      throw reader.error() ?? new Error("Unknown");
    }
    let flow;
    try {
      flow = Models8.SchemaUtils.parse(JSON.parse(outputStream.data()));
      verifyFlowSize(flow);
    } catch (error) {
      this.importError = error;
      return;
    }
    this.#setCurrentRecording(await this.#storage.upsertRecording(flow));
    this.#setCurrentPage(
      "RecordingPage"
      /* Pages.RECORDING_PAGE */
    );
    this.#clearError();
    UI11.ARIAUtils.LiveAnnouncer.alert(i18nString9(UIStrings9.recordingImported));
  }
  setCurrentRecordingForTesting(recording) {
    this.#setCurrentRecording(recording);
  }
  getSectionsForTesting() {
    return this.sections;
  }
  #setCurrentRecording(recording, opts = {}) {
    const { keepBreakpoints = false, updateSession = false } = opts;
    this.recordingPlayer?.abort();
    this.currentStep = void 0;
    this.recordingError = void 0;
    this.lastReplayResult = void 0;
    this.recordingPlayer = void 0;
    this.#replayState.isPlaying = false;
    this.#replayState.isPausedOnBreakpoint = false;
    this.#stepBreakpointIndexes = keepBreakpoints ? this.#stepBreakpointIndexes : /* @__PURE__ */ new Set();
    if (recording) {
      this.currentRecording = recording;
      this.sections = Models8.Section.buildSections(recording.flow.steps);
      this.settings = this.#buildSettings(recording.flow);
      if (updateSession && this.currentRecordingSession) {
        this.currentRecordingSession.overwriteUserFlow(recording.flow);
      }
    } else {
      this.currentRecording = void 0;
      this.sections = void 0;
      this.settings = void 0;
    }
    this.#updateScreenshotsForSections();
  }
  #setCurrentPage(page) {
    if (page === this.currentPage) {
      return;
    }
    this.previousPage = this.currentPage;
    this.currentPage = page;
  }
  #buildSettings(flow) {
    const steps = flow.steps;
    const navigateStepIdx = steps.findIndex((step) => step.type === "navigate");
    const settings = { timeout: flow.timeout };
    for (let i = navigateStepIdx - 1; i >= 0; i--) {
      const step = steps[i];
      if (!settings.viewportSettings && step.type === "setViewport") {
        settings.viewportSettings = step;
      }
      if (!settings.networkConditionsSettings && step.type === "emulateNetworkConditions") {
        settings.networkConditionsSettings = { ...step };
        for (const preset of [
          SDK3.NetworkManager.OfflineConditions,
          SDK3.NetworkManager.Slow3GConditions,
          SDK3.NetworkManager.Slow4GConditions,
          SDK3.NetworkManager.Fast4GConditions
        ]) {
          if (SDK3.NetworkManager.networkConditionsEqual(
            { ...preset, title: preset.i18nTitleKey || "" },
            // The key below is not used, but we need it to satisfy TS.
            {
              ...step,
              title: preset.i18nTitleKey || "",
              key: `step_${i}_recorder_key`
            }
          )) {
            settings.networkConditionsSettings.title = preset.title instanceof Function ? preset.title() : preset.title;
            settings.networkConditionsSettings.i18nTitleKey = preset.i18nTitleKey;
          }
        }
      }
    }
    return settings;
  }
  #getMainTarget() {
    const target = SDK3.TargetManager.TargetManager.instance().primaryPageTarget();
    if (!target) {
      throw new Error("Missing main page target");
    }
    return target;
  }
  #getSectionFromStep(step) {
    if (!this.sections) {
      return null;
    }
    for (const section5 of this.sections) {
      if (section5.steps.indexOf(step) !== -1) {
        return section5;
      }
    }
    return null;
  }
  #updateScreenshotsForSections() {
    if (!this.sections || !this.currentRecording) {
      return;
    }
    const storageName = this.currentRecording.storageName;
    for (let i = 0; i < this.sections.length; i++) {
      const screenshot = this.#screenshotStorage.getScreenshotForSection(storageName, i);
      this.sections[i].screenshot = screenshot || void 0;
    }
    this.requestUpdate();
  }
  #onAbortReplay() {
    this.recordingPlayer?.abort();
  }
  async #onPlayViaExtension(extension) {
    if (!this.currentRecording || !this.#replayAllowed) {
      return;
    }
    const pluginManager = PublicExtensions.RecorderPluginManager.RecorderPluginManager.instance();
    if (this.#extensionViewShowRequestedListener) {
      pluginManager.removeEventListener("showViewRequested", this.#extensionViewShowRequestedListener);
      this.#extensionViewShowRequestedListener = void 0;
    }
    let resolveView;
    const promise = new Promise((resolve) => {
      resolveView = resolve;
    });
    this.#extensionViewShowRequestedListener = (event) => {
      const descriptor2 = event.data;
      if (descriptor2.extensionOrigin === extension.getOrigin()) {
        if (this.#extensionViewShowRequestedListener) {
          pluginManager.removeEventListener("showViewRequested", this.#extensionViewShowRequestedListener);
          this.#extensionViewShowRequestedListener = void 0;
        }
        resolveView(descriptor2);
      }
    };
    pluginManager.addEventListener("showViewRequested", this.#extensionViewShowRequestedListener);
    extension.replay(this.currentRecording.flow);
    const descriptor = await promise;
    this.viewDescriptor = descriptor;
    Host2.userMetrics.recordingReplayStarted(
      3
      /* Host.UserMetrics.RecordingReplayStarted.REPLAY_VIA_EXTENSION */
    );
  }
  async #onPlayRecording(event) {
    if (!this.currentRecording || !this.#replayAllowed) {
      return;
    }
    if (this.viewDescriptor) {
      this.viewDescriptor = void 0;
    }
    if (this.#extensionViewShowRequestedListener) {
      PublicExtensions.RecorderPluginManager.RecorderPluginManager.instance().removeEventListener("showViewRequested", this.#extensionViewShowRequestedListener);
      this.#extensionViewShowRequestedListener = void 0;
    }
    if (event.extension) {
      return await this.#onPlayViaExtension(event.extension);
    }
    Host2.userMetrics.recordingReplayStarted(
      event.targetPanel !== "chrome-recorder" ? 2 : 1
      /* Host.UserMetrics.RecordingReplayStarted.REPLAY_ONLY */
    );
    this.#replayState.isPlaying = true;
    this.currentStep = void 0;
    this.recordingError = void 0;
    this.lastReplayResult = void 0;
    const currentRecording = this.currentRecording;
    this.#clearError();
    await this.#disableDeviceModeIfEnabled();
    this.recordingPlayer = new Models8.RecordingPlayer.RecordingPlayer(this.currentRecording.flow, { speed: event.speed, breakpointIndexes: this.#stepBreakpointIndexes });
    const withPerformanceTrace = event.targetPanel === "timeline";
    const sectionsWithScreenshot = /* @__PURE__ */ new Set();
    this.recordingPlayer.addEventListener("Step", async ({ data: { step, resolve } }) => {
      this.currentStep = step;
      const currentSection = this.#getSectionFromStep(step);
      if (this.sections && currentSection && !sectionsWithScreenshot.has(currentSection)) {
        sectionsWithScreenshot.add(currentSection);
        const currentSectionIndex = this.sections.indexOf(currentSection);
        const screenshot = await Models8.ScreenshotUtils.takeScreenshot();
        currentSection.screenshot = screenshot;
        Models8.ScreenshotStorage.ScreenshotStorage.instance().storeScreenshotForSection(currentRecording.storageName, currentSectionIndex, screenshot);
      }
      resolve();
    });
    this.recordingPlayer.addEventListener("Stop", () => {
      this.#replayState.isPausedOnBreakpoint = true;
      this.requestUpdate();
    });
    this.recordingPlayer.addEventListener("Continue", () => {
      this.#replayState.isPausedOnBreakpoint = false;
      this.requestUpdate();
    });
    this.recordingPlayer.addEventListener("Error", ({ data: error }) => {
      this.recordingError = error;
      if (!withPerformanceTrace) {
        this.#replayState.isPlaying = false;
        this.recordingPlayer = void 0;
      }
      this.lastReplayResult = "Failure";
      const errorMessage = error.message.toLowerCase();
      if (errorMessage.startsWith("could not find element")) {
        Host2.userMetrics.recordingReplayFinished(
          2
          /* Host.UserMetrics.RecordingReplayFinished.TIMEOUT_ERROR_SELECTORS */
        );
      } else if (errorMessage.startsWith("waiting for target failed")) {
        Host2.userMetrics.recordingReplayFinished(
          3
          /* Host.UserMetrics.RecordingReplayFinished.TIMEOUT_ERROR_TARGET */
        );
      } else {
        Host2.userMetrics.recordingReplayFinished(
          4
          /* Host.UserMetrics.RecordingReplayFinished.OTHER_ERROR */
        );
      }
      this.element.dispatchEvent(new ReplayFinishedEvent());
    });
    this.recordingPlayer.addEventListener("Done", () => {
      if (!withPerformanceTrace) {
        this.#replayState.isPlaying = false;
        this.recordingPlayer = void 0;
      }
      this.lastReplayResult = "Success";
      this.element.dispatchEvent(new ReplayFinishedEvent());
      Host2.userMetrics.recordingReplayFinished(
        1
        /* Host.UserMetrics.RecordingReplayFinished.SUCCESS */
      );
    });
    this.recordingPlayer.addEventListener("Abort", () => {
      this.currentStep = void 0;
      this.recordingError = void 0;
      this.lastReplayResult = void 0;
      this.#replayState.isPlaying = false;
    });
    let resolveWithEvents = (_events) => {
    };
    const eventsPromise = new Promise((resolve) => {
      resolveWithEvents = resolve;
    });
    let performanceTracing = null;
    switch (event.targetPanel) {
      case "timeline":
        performanceTracing = new Tracing.PerformanceTracing.PerformanceTracing(this.#getMainTarget(), {
          tracingBufferUsage() {
          },
          eventsRetrievalProgress() {
          },
          tracingComplete(events) {
            resolveWithEvents(events);
          }
        });
        break;
    }
    if (performanceTracing) {
      await performanceTracing.start();
    }
    this.#setTouchEmulationAllowed(false);
    await this.recordingPlayer.play();
    this.#setTouchEmulationAllowed(true);
    if (performanceTracing) {
      await performanceTracing.stop();
      const events = await eventsPromise;
      this.#replayState.isPlaying = false;
      this.recordingPlayer = void 0;
      await UI11.InspectorView.InspectorView.instance().showPanel(event.targetPanel);
      if (event.targetPanel === "timeline") {
        const trace = new SDK3.TraceObject.TraceObject(events);
        void Common2.Revealer.reveal(trace);
      }
    }
  }
  async #disableDeviceModeIfEnabled() {
    try {
      const deviceModeWrapper = Emulation.DeviceModeWrapper.DeviceModeWrapper.instance();
      if (deviceModeWrapper.isDeviceModeOn()) {
        deviceModeWrapper.toggleDeviceMode();
        const emulationModel = this.#getMainTarget().model(SDK3.EmulationModel.EmulationModel);
        await emulationModel?.emulateDevice(null);
      }
    } catch {
    }
  }
  #setTouchEmulationAllowed(touchEmulationAllowed) {
    const emulationModel = this.#getMainTarget().model(SDK3.EmulationModel.EmulationModel);
    emulationModel?.setTouchEmulationAllowed(touchEmulationAllowed);
  }
  async #onSetRecording(event) {
    const json = JSON.parse(event.detail);
    this.#setCurrentRecording(await this.#storage.upsertRecording(Models8.SchemaUtils.parse(json)));
    this.#setCurrentPage(
      "RecordingPage"
      /* Pages.RECORDING_PAGE */
    );
    this.#clearError();
    this.element.dispatchEvent(new SetRecordingFinishedEvent());
  }
  // Used by e2e tests to inspect the current recording.
  getUserFlow() {
    return this.currentRecording?.flow;
  }
  async #handleRecordingChanged(currentStep, newStep) {
    if (!this.currentRecording) {
      throw new Error("Current recording expected to be defined.");
    }
    const recording = {
      ...this.currentRecording,
      flow: {
        ...this.currentRecording.flow,
        steps: this.currentRecording.flow.steps.map((step) => step === currentStep ? newStep : step)
      }
    };
    this.#setCurrentRecording(await this.#storage.upsertRecording(recording.flow, recording.storageName), { keepBreakpoints: true, updateSession: true });
  }
  async #handleStepAdded(stepOrSection, position) {
    if (!this.currentRecording) {
      throw new Error("Current recording expected to be defined.");
    }
    let step;
    let actualPosition = position;
    if ("steps" in stepOrSection) {
      const sectionIdx = this.sections?.indexOf(stepOrSection);
      if (sectionIdx === void 0 || sectionIdx === -1) {
        throw new Error("There is no section to add a step to");
      }
      if (position === "after") {
        if (this.sections?.[sectionIdx].steps.length) {
          step = this.sections?.[sectionIdx].steps[0];
          actualPosition = "before";
        } else {
          step = this.sections?.[sectionIdx].causingStep;
          actualPosition = "after";
        }
      } else {
        if (sectionIdx <= 0) {
          throw new Error("There is no section to add a step to");
        }
        const prevSection = this.sections?.[sectionIdx - 1];
        step = prevSection?.steps[prevSection.steps.length - 1];
        actualPosition = "after";
      }
    } else {
      step = stepOrSection;
    }
    if (!step) {
      throw new Error("Anchor step is not found when adding a step");
    }
    const steps = this.currentRecording.flow.steps;
    const currentIndex = steps.indexOf(step);
    const indexToInsertAt = currentIndex + (actualPosition === "before" ? 0 : 1);
    steps.splice(indexToInsertAt, 0, { type: Models8.Schema.StepType.WaitForElement, selectors: ["body"] });
    const recording = { ...this.currentRecording, flow: { ...this.currentRecording.flow, steps } };
    this.#stepBreakpointIndexes = new Set([...this.#stepBreakpointIndexes.values()].map((breakpointIndex) => {
      if (indexToInsertAt > breakpointIndex) {
        return breakpointIndex;
      }
      return breakpointIndex + 1;
    }));
    this.#setCurrentRecording(await this.#storage.upsertRecording(recording.flow, recording.storageName), { keepBreakpoints: true, updateSession: true });
  }
  async #handleRecordingTitleChanged(title) {
    if (!this.currentRecording) {
      throw new Error("Current recording expected to be defined.");
    }
    const flow = { ...this.currentRecording.flow, title };
    this.#setCurrentRecording(await this.#storage.upsertRecording(flow, this.currentRecording.storageName));
  }
  async #handleStepRemoved(step) {
    if (!this.currentRecording) {
      throw new Error("Current recording expected to be defined.");
    }
    const steps = this.currentRecording.flow.steps;
    const currentIndex = steps.indexOf(step);
    steps.splice(currentIndex, 1);
    const flow = { ...this.currentRecording.flow, steps };
    this.#stepBreakpointIndexes = new Set([...this.#stepBreakpointIndexes.values()].map((breakpointIndex) => {
      if (currentIndex > breakpointIndex) {
        return breakpointIndex;
      }
      if (currentIndex === breakpointIndex) {
        return -1;
      }
      return breakpointIndex - 1;
    }).filter((index) => index >= 0));
    this.#setCurrentRecording(await this.#storage.upsertRecording(flow, this.currentRecording.storageName), { keepBreakpoints: true, updateSession: true });
  }
  async #onNetworkConditionsChanged(data) {
    if (!this.currentRecording) {
      throw new Error("Current recording expected to be defined.");
    }
    const navigateIdx = this.currentRecording.flow.steps.findIndex((step) => step.type === "navigate");
    if (navigateIdx === -1) {
      throw new Error("Current recording does not have a navigate step");
    }
    const emulateNetworkConditionsIdx = this.currentRecording.flow.steps.findIndex((step, idx) => {
      if (idx >= navigateIdx) {
        return false;
      }
      return step.type === "emulateNetworkConditions";
    });
    if (!data) {
      if (emulateNetworkConditionsIdx !== -1) {
        this.currentRecording.flow.steps.splice(emulateNetworkConditionsIdx, 1);
      }
    } else if (emulateNetworkConditionsIdx === -1) {
      this.currentRecording.flow.steps.splice(0, 0, Models8.SchemaUtils.createEmulateNetworkConditionsStep({ download: data.download, upload: data.upload, latency: data.latency }));
    } else {
      const step = this.currentRecording.flow.steps[emulateNetworkConditionsIdx];
      step.download = data.download;
      step.upload = data.upload;
      step.latency = data.latency;
    }
    this.#setCurrentRecording(await this.#storage.upsertRecording(this.currentRecording.flow, this.currentRecording.storageName));
  }
  async #onTimeoutChanged(timeout) {
    if (!this.currentRecording) {
      throw new Error("Current recording expected to be defined.");
    }
    this.currentRecording.flow.timeout = timeout;
    this.#setCurrentRecording(await this.#storage.upsertRecording(this.currentRecording.flow, this.currentRecording.storageName));
  }
  async #onDeleteRecording(storageNameOrEvent) {
    let storageName;
    if (typeof storageNameOrEvent === "string") {
      storageName = storageNameOrEvent;
    } else {
      storageNameOrEvent.stopPropagation();
      if (!this.currentRecording) {
        return;
      }
      storageName = this.currentRecording.storageName;
    }
    await this.#storage.deleteRecording(storageName);
    this.#screenshotStorage.deleteScreenshotsForRecording(storageName);
    this.requestUpdate();
    UI11.ARIAUtils.LiveAnnouncer.alert(i18nString9(UIStrings9.recordingDeleted));
    if ((await this.#storage.getRecordings()).length) {
      this.#setCurrentPage(
        "AllRecordingsPage"
        /* Pages.ALL_RECORDINGS_PAGE */
      );
    } else {
      this.#setCurrentPage(
        "StartPage"
        /* Pages.START_PAGE */
      );
    }
    this.#setCurrentRecording(void 0);
    this.#clearError();
  }
  #onCreateNewRecording(event) {
    event?.stopPropagation();
    this.#setCurrentPage(
      "CreateRecordingPage"
      /* Pages.CREATE_RECORDING_PAGE */
    );
    this.#clearError();
  }
  async #onRecordingStarted(data) {
    await this.#disableDeviceModeIfEnabled();
    this.isToggling = true;
    this.#clearError();
    Host2.userMetrics.recordingToggled(
      1
      /* Host.UserMetrics.RecordingToggled.RECORDING_STARTED */
    );
    this.currentRecordingSession = new Models8.RecordingSession.RecordingSession(this.#getMainTarget(), {
      title: data.name,
      selectorAttribute: data.selectorAttribute,
      selectorTypesToRecord: data.selectorTypesToRecord.length ? data.selectorTypesToRecord : Object.values(Models8.Schema.SelectorType)
    });
    this.#setCurrentRecording(await this.#storage.upsertRecording(this.currentRecordingSession.cloneUserFlow()));
    let previousSectionIndex = -1;
    let screenshotPromise;
    const takeScreenshot = async (currentRecording) => {
      if (!this.sections) {
        throw new Error("Could not find sections.");
      }
      const currentSectionIndex = this.sections.length - 1;
      const currentSection = this.sections[currentSectionIndex];
      if (screenshotPromise || previousSectionIndex === currentSectionIndex) {
        return;
      }
      screenshotPromise = Models8.ScreenshotUtils.takeScreenshot();
      const screenshot = await screenshotPromise;
      screenshotPromise = void 0;
      currentSection.screenshot = screenshot;
      Models8.ScreenshotStorage.ScreenshotStorage.instance().storeScreenshotForSection(currentRecording.storageName, currentSectionIndex, screenshot);
      previousSectionIndex = currentSectionIndex;
      this.#updateScreenshotsForSections();
    };
    this.currentRecordingSession.addEventListener("recordingupdated", async ({ data: data2 }) => {
      if (!this.currentRecording) {
        throw new Error("No current recording found");
      }
      this.#setCurrentRecording(await this.#storage.upsertRecording(data2, this.currentRecording.storageName));
      this.#recordingView?.scrollToBottom();
      await takeScreenshot(this.currentRecording);
    });
    this.currentRecordingSession.addEventListener("recordingstopped", async ({ data: data2 }) => {
      if (!this.currentRecording) {
        throw new Error("No current recording found");
      }
      Host2.userMetrics.keyboardShortcutFired(
        "chrome-recorder.start-recording"
        /* Actions.RecorderActions.START_RECORDING */
      );
      this.#setCurrentRecording(await this.#storage.upsertRecording(data2, this.currentRecording.storageName));
      await this.#onRecordingFinished();
    });
    await this.currentRecordingSession.start();
    this.isToggling = false;
    this.isRecording = true;
    this.#setCurrentPage(
      "RecordingPage"
      /* Pages.RECORDING_PAGE */
    );
    this.element.dispatchEvent(new RecordingStateChangedEvent(this.currentRecording.flow));
  }
  async #onRecordingFinished() {
    if (!this.currentRecording || !this.currentRecordingSession) {
      throw new Error("Recording was never started");
    }
    this.isToggling = true;
    this.#clearError();
    Host2.userMetrics.recordingToggled(
      2
      /* Host.UserMetrics.RecordingToggled.RECORDING_FINISHED */
    );
    await this.currentRecordingSession.stop();
    this.currentRecordingSession = void 0;
    this.isToggling = false;
    this.isRecording = false;
    this.element.dispatchEvent(new RecordingStateChangedEvent(this.currentRecording.flow));
  }
  async onRecordingCancelled() {
    if (this.previousPage) {
      this.#setCurrentPage(this.previousPage);
    }
  }
  async #onRecordingSelected(storageNameOrEvent) {
    let storageName;
    if (typeof storageNameOrEvent === "string") {
      storageName = storageNameOrEvent;
    } else {
      storageName = storageNameOrEvent.target?.value;
    }
    this.#setCurrentRecording(await this.#storage.getRecording(storageName));
    if (this.currentRecording) {
      this.#setCurrentPage(
        "RecordingPage"
        /* Pages.RECORDING_PAGE */
      );
    } else if (storageName === "StartPage") {
      this.#setCurrentPage(
        "StartPage"
        /* Pages.START_PAGE */
      );
    } else if (storageName === "AllRecordingsPage") {
      this.#setCurrentPage(
        "AllRecordingsPage"
        /* Pages.ALL_RECORDINGS_PAGE */
      );
    }
  }
  async #onExportOptionSelected(event) {
    if (typeof event.itemValue !== "string") {
      throw new Error("Invalid export option value");
    }
    if (event.itemValue === GET_EXTENSIONS_MENU_ITEM) {
      Host2.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(GET_EXTENSIONS_URL);
      return;
    }
    if (!this.currentRecording) {
      throw new Error("No recording selected");
    }
    const id = event.itemValue;
    const byId = (converter2) => converter2.getId() === id;
    const converter = this.#builtInConverters.find(byId) || this.extensionConverters.find(byId);
    if (!converter) {
      throw new Error("No recording selected");
    }
    const [content] = await converter.stringify(this.currentRecording.flow);
    await this.#exportContent(converter.getFilename(this.currentRecording.flow), content);
    const builtInMetric = CONVERTER_ID_TO_METRIC[converter.getId()];
    if (builtInMetric) {
      UI11.ARIAUtils.LiveAnnouncer.alert(i18nString9(UIStrings9.recordingExported));
    } else if (converter.getId().startsWith(Converters.ExtensionConverter.EXTENSION_PREFIX)) {
      UI11.ARIAUtils.LiveAnnouncer.alert(i18nString9(UIStrings9.recordingExported));
    } else {
      throw new Error("Could not find a metric for the export option with id = " + id);
    }
  }
  async #exportContent(suggestedName, data) {
    try {
      const handle = await window.showSaveFilePicker({ suggestedName });
      const writable = await handle.createWritable();
      await writable.write(data);
      await writable.close();
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
      throw error;
    }
  }
  async #handleAddAssertionEvent() {
    if (!this.currentRecordingSession || !this.currentRecording) {
      return;
    }
    const flow = this.currentRecordingSession.cloneUserFlow();
    flow.steps.push({ type: "waitForElement", selectors: [[".cls"]] });
    this.#setCurrentRecording(await this.#storage.upsertRecording(flow, this.currentRecording.storageName), { keepBreakpoints: true, updateSession: true });
    await this.updateComplete;
    await this.#recordingView?.updateComplete;
    this.#recordingView?.contentElement?.querySelector(".section:last-child .step-view-widget:last-of-type")?.shadowRoot?.querySelector(".action")?.click();
  }
  async #acknowledgeImportNotice() {
    if (this.#disableRecorderImportWarningSetting.get()) {
      return true;
    }
    if (Root.Runtime.Runtime.queryParam("isChromeForTesting") || Root.Runtime.Runtime.queryParam("disableSelfXssWarnings") || this.#selfXssWarningDisabledSetting.get()) {
      return true;
    }
    const result = await PanelCommon.TypeToAllowDialog.show({
      jslogContext: {
        input: "confirm-import-recording-input",
        dialog: "confirm-import-recording-dialog"
      },
      message: i18nString9(UIStrings9.doNotImport, { PH1: i18nString9(UIStrings9.allowImporting) }),
      header: i18nString9(UIStrings9.doYouTrustThisCode),
      typePhrase: i18nString9(UIStrings9.allowImporting),
      inputPlaceholder: i18nString9(UIStrings9.typeAllowImporting, { PH1: i18nString9(UIStrings9.allowImporting) })
    });
    if (result) {
      this.#disableRecorderImportWarningSetting.set(true);
    }
    return result;
  }
  async #onImportRecording(event) {
    event.stopPropagation();
    this.#clearError();
    if (await this.#acknowledgeImportNotice()) {
      this.#fileSelector = UI11.UIUtils.createFileSelectorElement(this.#importFile.bind(this));
      this.#fileSelector.click();
    }
  }
  async #onPlayRecordingByName(storageName) {
    await this.#onRecordingSelected(storageName);
    await this.#onPlayRecording({ targetPanel: "chrome-recorder", speed: this.#recorderSettings.speed });
  }
  #onAddBreakpoint = (index) => {
    this.#stepBreakpointIndexes = structuredClone(this.#stepBreakpointIndexes);
    this.#stepBreakpointIndexes.add(index);
    this.recordingPlayer?.updateBreakpointIndexes(this.#stepBreakpointIndexes);
    this.requestUpdate();
  };
  #onRemoveBreakpoint = (index) => {
    this.#stepBreakpointIndexes = structuredClone(this.#stepBreakpointIndexes);
    this.#stepBreakpointIndexes.delete(index);
    this.recordingPlayer?.updateBreakpointIndexes(this.#stepBreakpointIndexes);
    this.requestUpdate();
  };
  #onExtensionViewClosed() {
    this.viewDescriptor = void 0;
  }
  handleActions(actionId) {
    if (!this.isActionPossible(actionId)) {
      return;
    }
    switch (actionId) {
      case "chrome-recorder.create-recording":
        this.#onCreateNewRecording();
        return;
      case "chrome-recorder.start-recording":
        if (this.currentPage !== "CreateRecordingPage" && !this.isRecording) {
          this.#shortcutHelper.handleShortcut(this.#onRecordingStarted.bind(this, {
            name: this.#recorderSettings.defaultTitle,
            selectorTypesToRecord: this.#recorderSettings.defaultSelectors,
            selectorAttribute: this.#recorderSettings.selectorAttribute ? this.#recorderSettings.selectorAttribute : void 0
          }));
        } else if (this.currentPage === "CreateRecordingPage") {
          if (this.#createRecordingView) {
            this.#shortcutHelper.handleShortcut(() => {
              this.#createRecordingView?.startRecording();
            });
          }
        } else if (this.isRecording) {
          void this.#onRecordingFinished();
        }
        return;
      case "chrome-recorder.replay-recording":
        void this.#onPlayRecording({ targetPanel: "chrome-recorder", speed: this.#recorderSettings.speed });
        return;
      case "chrome-recorder.toggle-code-view": {
        this.#recordingView?.showCodeToggle();
        return;
      }
    }
  }
  isActionPossible(actionId) {
    switch (actionId) {
      case "chrome-recorder.create-recording":
        return !this.isRecording && !this.#replayState.isPlaying;
      case "chrome-recorder.start-recording":
        return !this.#replayState.isPlaying;
      case "chrome-recorder.replay-recording":
        return this.currentPage === "RecordingPage" && !this.#replayState.isPlaying;
      case "chrome-recorder.toggle-code-view":
        return this.currentPage === "RecordingPage";
      case "chrome-recorder.copy-recording-or-step":
        return false;
    }
  }
  #getShortcutsInfo() {
    const getBindingForAction = (action7) => {
      const shortcuts = UI11.ShortcutRegistry.ShortcutRegistry.instance().shortcutsForAction(action7);
      const shortcutsWithSplitBindings = shortcuts.map((shortcut) => shortcut.title().split(/[\s+]+/).map((word) => {
        return { key: word.trim() };
      }));
      return shortcutsWithSplitBindings;
    };
    return [
      {
        title: i18nString9(UIStrings9.startStopRecording),
        rows: getBindingForAction(
          "chrome-recorder.start-recording"
          /* Actions.RecorderActions.START_RECORDING */
        )
      },
      {
        title: i18nString9(UIStrings9.replayRecording),
        rows: getBindingForAction(
          "chrome-recorder.replay-recording"
          /* Actions.RecorderActions.REPLAY_RECORDING */
        )
      },
      {
        title: i18nString9(UIStrings9.copyShortcut),
        rows: Host2.Platform.isMac() ? [[{ key: "\u2318" }, { key: "C" }]] : [[{ key: "Ctrl" }, { key: "C" }]]
      },
      {
        title: i18nString9(UIStrings9.toggleCode),
        rows: getBindingForAction(
          "chrome-recorder.toggle-code-view"
          /* Actions.RecorderActions.TOGGLE_CODE_VIEW */
        )
      }
    ];
  }
  #getExportMenuButton = () => {
    if (!this.#exportMenuButton) {
      throw new Error("#exportMenuButton not found");
    }
    return this.#exportMenuButton;
  };
  #onExportRecording(event) {
    event.stopPropagation();
    this.#clearError();
    this.exportMenuExpanded = !this.exportMenuExpanded;
  }
  #onExportMenuClosed() {
    this.exportMenuExpanded = false;
  }
  performUpdate() {
    const recordings = this.#storage.getRecordings();
    const that = this;
    const output = {
      set exportMenuButton(el) {
        that.#exportMenuButton = el;
      },
      set recordingView(widget6) {
        that.#recordingView = widget6;
      },
      set createRecordingView(widget6) {
        that.#createRecordingView = widget6;
      }
    };
    this.#view({
      recordings,
      currentRecording: this.currentRecording,
      currentPage: this.currentPage,
      isRecording: this.isRecording,
      isToggling: this.isToggling,
      importError: this.importError,
      recordingError: this.recordingError,
      sections: this.sections ?? [],
      settings: this.settings,
      recorderSettings: this.#recorderSettings,
      lastReplayResult: this.lastReplayResult,
      replayAllowed: this.#replayAllowed,
      breakpointIndexes: this.#stepBreakpointIndexes,
      builtInConverters: this.#builtInConverters,
      extensionConverters: this.extensionConverters,
      replayExtensions: this.replayExtensions,
      extensionDescriptor: this.viewDescriptor,
      exportMenuExpanded: this.exportMenuExpanded,
      replayState: this.#replayState,
      shortcutsInfo: this.#getShortcutsInfo(),
      currentStep: this.currentStep,
      onCreateNewRecording: this.#onCreateNewRecording.bind(this),
      onImportRecording: this.#onImportRecording.bind(this),
      onExportRecording: this.#onExportRecording.bind(this),
      onDeleteRecording: this.#onDeleteRecording.bind(this),
      onRecordingSelected: this.#onRecordingSelected.bind(this),
      onPlayRecordingByName: this.#onPlayRecordingByName.bind(this),
      onPlayRecording: this.#onPlayRecording.bind(this),
      onAbortReplay: this.#onAbortReplay.bind(this),
      onNetworkConditionsChanged: this.#onNetworkConditionsChanged.bind(this),
      onTimeoutChanged: this.#onTimeoutChanged.bind(this),
      handleRecordingTitleChanged: this.#handleRecordingTitleChanged.bind(this),
      handleRecordingChanged: this.#handleRecordingChanged.bind(this),
      handleStepAdded: this.#handleStepAdded.bind(this),
      handleStepRemoved: this.#handleStepRemoved.bind(this),
      onAddBreakpoint: this.#onAddBreakpoint.bind(this),
      onRemoveBreakpoint: this.#onRemoveBreakpoint.bind(this),
      onExtensionViewClosed: this.#onExtensionViewClosed.bind(this),
      onExportMenuClosed: this.#onExportMenuClosed.bind(this),
      onExportOptionSelected: this.#onExportOptionSelected.bind(this),
      onRecordingFinished: this.#onRecordingFinished.bind(this),
      handleAddAssertionEvent: this.#handleAddAssertionEvent.bind(this),
      onSetRecording: this.#onSetRecording.bind(this),
      onContinueReplay: () => this.recordingPlayer?.continue(),
      onStepOverReplay: () => this.recordingPlayer?.stepOver(),
      getExportMenuButton: this.#getExportMenuButton.bind(this),
      onRecordingStarted: this.#onRecordingStarted.bind(this),
      onRecordingCancelled: this.onRecordingCancelled.bind(this)
    }, output, this.contentElement);
  }
};
var ActionDelegate = class {
  handleAction(_context, actionId) {
    void (async () => {
      await UI11.ViewManager.ViewManager.instance().showView(RecorderPanel.panelName);
      const view = UI11.ViewManager.ViewManager.instance().view(RecorderPanel.panelName);
      if (view) {
        const widget6 = await view.widget();
        widget6.handleActions(actionId);
      }
    })();
    return true;
  }
};
export {
  ControlButton_exports as ControlButton,
  CreateRecordingView_exports as CreateRecordingView,
  RecorderEvents_exports as RecorderEvents,
  RecorderPanel_exports as RecorderPanel,
  RecordingListView_exports as RecordingListView,
  RecordingView_exports as RecordingView,
  ReplaySection_exports as ReplaySection,
  SelectorPicker_exports as SelectorPicker,
  StepEditor_exports as StepEditor,
  StepView_exports as StepView,
  TimelineSection_exports as TimelineSection
};
//# sourceMappingURL=recorder.js.map
