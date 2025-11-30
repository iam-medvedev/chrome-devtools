var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/recorder/components/ControlButton.js
var ControlButton_exports = {};
__export(ControlButton_exports, {
  ControlButton: () => ControlButton
});
import * as Lit from "./../../../ui/lit/lit.js";

// gen/front_end/panels/recorder/components/controlButton.css.js
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

// gen/front_end/panels/recorder/components/ControlButton.js
var __decorate = function(decorators, target, key2, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key2) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key2, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key2, r) : d(target, key2)) || r;
  return c > 3 && r && Object.defineProperty(target, key2, r), r;
};
var { html, Decorators, LitElement } = Lit;
var { customElement, property } = Decorators;
var ControlButton = class ControlButton2 extends LitElement {
  constructor() {
    super();
    this.label = "";
    this.shape = "square";
    this.disabled = false;
  }
  #handleClickEvent = (event) => {
    if (this.disabled) {
      event.stopPropagation();
      event.preventDefault();
    }
  };
  render() {
    return html`
            <style>${controlButton_css_default}</style>
            <button
                @click=${this.#handleClickEvent}
                .disabled=${this.disabled}
                class="control">
              <div class="icon ${this.shape}"></div>
              <div class="label">${this.label}</div>
            </button>
        `;
  }
};
__decorate([
  property()
], ControlButton.prototype, "label", void 0);
__decorate([
  property()
], ControlButton.prototype, "shape", void 0);
__decorate([
  property({ type: Boolean })
], ControlButton.prototype, "disabled", void 0);
ControlButton = __decorate([
  customElement("devtools-control-button")
], ControlButton);

// gen/front_end/panels/recorder/components/CreateRecordingView.js
var CreateRecordingView_exports = {};
__export(CreateRecordingView_exports, {
  CreateRecordingView: () => CreateRecordingView,
  DEFAULT_VIEW: () => DEFAULT_VIEW
});
import "./../../../ui/kit/kit.js";
import * as i18n from "./../../../core/i18n/i18n.js";
import * as Badges from "./../../../models/badges/badges.js";
import * as Buttons from "./../../../ui/components/buttons/buttons.js";
import * as Input from "./../../../ui/components/input/input.js";
import * as UI from "./../../../ui/legacy/legacy.js";
import * as Lit2 from "./../../../ui/lit/lit.js";
import * as VisualLogging from "./../../../ui/visual_logging/visual_logging.js";
import * as Models from "./../models/models.js";

// gen/front_end/panels/recorder/components/createRecordingView.css.js
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

// gen/front_end/panels/recorder/components/CreateRecordingView.js
var { html: html2, Directives: { ref, createRef, repeat } } = Lit2;
var UIStrings = {
  /**
   * @description The label for the input where the user enters a name for the new recording.
   */
  recordingName: "Recording name",
  /**
   * @description The button that start the recording with selected options.
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
   * @description The title for the close button where the user cancels a recording and returns back to previous view.
   */
  cancelRecording: "Cancel recording",
  /**
   * @description Label indicating a CSS (Cascading Style Sheets) selector type
   * (https://developer.mozilla.org/en-US/docs/Web/CSS). The label is used on a
   * checkbox which users can tick if they are interesting in recording CSS
   * selectors.
   */
  selectorTypeCSS: "CSS",
  /**
   * @description Label indicating a piercing CSS (Cascading Style Sheets)
   * selector type
   * (https://pptr.dev/guides/query-selectors#pierce-selectors-pierce). These
   * type of selectors behave like CSS selectors, but can pierce through
   * ShadowDOM. The label is used on a checkbox which users can tick if they are
   * interesting in recording CSS selectors.
   */
  selectorTypePierce: "Pierce",
  /**
   * @description Label indicating a ARIA (Accessible Rich Internet
   * Applications) selector type
   * (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA). The
   * label is used on a checkbox which users can tick if they are interesting in
   * recording ARIA selectors.
   */
  selectorTypeARIA: "ARIA",
  /**
   * @description Label indicating a text selector type. The label is used on a
   * checkbox which users can tick if they are interesting in recording text
   * selectors.
   */
  selectorTypeText: "Text",
  /**
   * @description Label indicating a XPath (XML Path Language) selector type
   * (https://en.wikipedia.org/wiki/XPath). The label is used on a checkbox
   * which users can tick if they are interesting in recording text selectors.
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
var str_ = i18n.i18n.registerUIStrings("panels/recorder/components/CreateRecordingView.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var DEFAULT_VIEW = (input, output, target) => {
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
          <x-link
            class="link" href="https://g.co/devtools/recorder#selector"
            title=${i18nString(UIStrings.learnMore)}
            jslog=${VisualLogging.link("recorder-selector-help").track({ click: true })}>
            <devtools-icon name="help">
            </devtools-icon>
          </x-link>
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
          <x-link
            class="link" href="https://g.co/devtools/recorder#selector"
            title=${i18nString(UIStrings.learnMore)}
            jslog=${VisualLogging.link("recorder-selector-help").track({ click: true })}>
            <devtools-icon name="help">
            </devtools-icon>
          </x-link>
        </label>
        <div class="checkbox-container">
          ${repeat(selectorTypes, (item4) => {
    return html2`
              <label class="checkbox-label selector-type">
                <input
                  @keydown=${onKeyDown}
                  .value=${item4.selectorType}
                  jslog=${VisualLogging.toggle().track({ click: true }).context(`selector-${item4.selectorType}`)}
                  ?checked=${item4.checked}
                  type="checkbox"
                  @change=${(e) => onUpdate({
      selectorType: item4.selectorType,
      checked: e.target.checked
    })}
                />
                ${selectorTypeToLabel.get(item4.selectorType) || item4.selectorType}
              </label>
            `;
  })}
        </div>
        ${error && html2` <div class="error" role="alert"> ${error.message} </div>`}
      </div>
      <div class="footer">
        <div class="controls">
          <devtools-control-button
            @click=${onRecordingStarted}
            .label=${i18nString(UIStrings.startRecording)}
            .shape=${"circle"}
            jslog=${VisualLogging.action(
    "chrome-recorder.start-recording"
    /* Actions.RecorderActions.START_RECORDING */
  ).track({ click: true })}
            title=${Models.Tooltip.getTooltipForActions(
    i18nString(UIStrings.startRecording),
    "chrome-recorder.start-recording"
    /* Actions.RecorderActions.START_RECORDING */
  )}
          ></devtools-control-button>
        </div>
      </div>
    `, target);
};
var CreateRecordingView = class extends UI.Widget.Widget {
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
    this.#view = view || DEFAULT_VIEW;
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
    const selectorTypesToRecord = this.#selectorTypes.filter((item4) => item4.checked).map((item4) => item4.selectorType);
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
          this.#selectorTypes = this.#selectorTypes.map((item4) => {
            if (item4.selectorType === update.selectorType) {
              return {
                ...item4,
                checked: update.checked
              };
            }
            return item4;
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

// gen/front_end/panels/recorder/components/RecordingListView.js
var RecordingListView_exports = {};
__export(RecordingListView_exports, {
  CreateRecordingEvent: () => CreateRecordingEvent,
  DEFAULT_VIEW: () => DEFAULT_VIEW2,
  DeleteRecordingEvent: () => DeleteRecordingEvent,
  OpenRecordingEvent: () => OpenRecordingEvent,
  PlayRecordingEvent: () => PlayRecordingEvent,
  RecordingListView: () => RecordingListView
});
import "./../../../ui/kit/kit.js";
import * as i18n3 from "./../../../core/i18n/i18n.js";
import * as Buttons2 from "./../../../ui/components/buttons/buttons.js";
import * as UI2 from "./../../../ui/legacy/legacy.js";
import * as Lit3 from "./../../../ui/lit/lit.js";
import * as VisualLogging2 from "./../../../ui/visual_logging/visual_logging.js";
import * as Models2 from "./../models/models.js";

// gen/front_end/panels/recorder/components/recordingListView.css.js
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

// gen/front_end/panels/recorder/components/RecordingListView.js
var { html: html3 } = Lit3;
var UIStrings2 = {
  /**
   * @description The title of the page that contains a list of saved recordings that the user has..
   */
  savedRecordings: "Saved recordings",
  /**
   * @description The title of the button that leads to create a new recording page.
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
   * @description The title of the row corresponding to a recording. By clicking on the row, the user open the recording for editing.
   */
  openRecording: "Open recording"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/recorder/components/RecordingListView.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
var CreateRecordingEvent = class _CreateRecordingEvent extends Event {
  static eventName = "createrecording";
  constructor() {
    super(_CreateRecordingEvent.eventName, { composed: true, bubbles: true });
  }
};
var DeleteRecordingEvent = class _DeleteRecordingEvent extends Event {
  storageName;
  static eventName = "deleterecording";
  constructor(storageName) {
    super(_DeleteRecordingEvent.eventName, { composed: true, bubbles: true });
    this.storageName = storageName;
  }
};
var OpenRecordingEvent = class _OpenRecordingEvent extends Event {
  storageName;
  static eventName = "openrecording";
  constructor(storageName) {
    super(_OpenRecordingEvent.eventName, { composed: true, bubbles: true });
    this.storageName = storageName;
  }
};
var PlayRecordingEvent = class _PlayRecordingEvent extends Event {
  storageName;
  static eventName = "playrecording";
  constructor(storageName) {
    super(_PlayRecordingEvent.eventName, { composed: true, bubbles: true });
    this.storageName = storageName;
  }
};
var DEFAULT_VIEW2 = (input, _output, target) => {
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
                  jslog=${VisualLogging2.item().track({ click: true }).context("recording")}>
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
var RecordingListView = class extends UI2.Widget.Widget {
  #recordings = [];
  #replayAllowed = true;
  #view;
  constructor(element, view) {
    super(element, { useShadowDom: true });
    this.#view = view || DEFAULT_VIEW2;
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
    this.contentElement.dispatchEvent(new CreateRecordingEvent());
  }
  #onDeleteClick(storageName, event) {
    event.stopPropagation();
    this.contentElement.dispatchEvent(new DeleteRecordingEvent(storageName));
  }
  #onOpenClick(storageName, event) {
    event.stopPropagation();
    this.contentElement.dispatchEvent(new OpenRecordingEvent(storageName));
  }
  #onPlayRecordingClick(storageName, event) {
    event.stopPropagation();
    this.contentElement.dispatchEvent(new PlayRecordingEvent(storageName));
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

// gen/front_end/panels/recorder/components/RecordingView.js
var RecordingView_exports = {};
__export(RecordingView_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW3,
  RecordingView: () => RecordingView
});
import "./../../../ui/kit/kit.js";

// gen/front_end/panels/recorder/components/ExtensionView.js
import "./../../../ui/legacy/legacy.js";
import "./../../../ui/kit/kit.js";
import * as i18n5 from "./../../../core/i18n/i18n.js";
import * as Buttons3 from "./../../../ui/components/buttons/buttons.js";
import * as Lit4 from "./../../../ui/lit/lit.js";
import * as VisualLogging3 from "./../../../ui/visual_logging/visual_logging.js";
import * as Extensions from "./../extensions/extensions.js";

// gen/front_end/panels/recorder/components/extensionView.css.js
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

// gen/front_end/panels/recorder/components/ExtensionView.js
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
var str_3 = i18n5.i18n.registerUIStrings("panels/recorder/components/ExtensionView.ts", UIStrings3);
var i18nString3 = i18n5.i18n.getLocalizedString.bind(void 0, str_3);
var ClosedEvent = class _ClosedEvent extends Event {
  static eventName = "recorderextensionviewclosed";
  constructor() {
    super(_ClosedEvent.eventName, { bubbles: true, composed: true });
  }
};
var ExtensionView = class extends HTMLElement {
  #shadow = this.attachShadow({ mode: "open" });
  #descriptor;
  constructor() {
    super();
    this.setAttribute("jslog", `${VisualLogging3.section("extension-view")}`);
  }
  connectedCallback() {
    this.#render();
  }
  disconnectedCallback() {
    if (!this.#descriptor) {
      return;
    }
    Extensions.ExtensionManager.ExtensionManager.instance().getView(this.#descriptor.id).hide();
  }
  set descriptor(descriptor) {
    this.#descriptor = descriptor;
    this.#render();
    Extensions.ExtensionManager.ExtensionManager.instance().getView(descriptor.id).show();
  }
  #closeView() {
    this.dispatchEvent(new ClosedEvent());
  }
  #render() {
    if (!this.#descriptor) {
      return;
    }
    const iframe = Extensions.ExtensionManager.ExtensionManager.instance().getView(this.#descriptor.id).frame();
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
              ${this.#descriptor.title}
            </div>
            <devtools-button
              title=${i18nString3(UIStrings3.closeView)}
              jslog=${VisualLogging3.close().track({ click: true })}
              .data=${{
      variant: "icon",
      size: "SMALL",
      iconName: "cross"
    }}
              @click=${this.#closeView}
            ></devtools-button>
          </header>
          <main>
            ${iframe}
          </main>
      </div>
    `, this.#shadow, { host: this });
  }
};
customElements.define("devtools-recorder-extension-view", ExtensionView);

// gen/front_end/panels/recorder/components/ReplaySection.js
var ReplaySection_exports = {};
__export(ReplaySection_exports, {
  ReplaySection: () => ReplaySection,
  StartReplayEvent: () => StartReplayEvent
});
import * as Host from "./../../../core/host/host.js";
import * as i18n7 from "./../../../core/i18n/i18n.js";
import * as ComponentHelpers from "./../../../ui/components/helpers/helpers.js";
import * as Lit5 from "./../../../ui/lit/lit.js";
import * as VisualLogging4 from "./../../../ui/visual_logging/visual_logging.js";
var { html: html5 } = Lit5;
var UIStrings4 = {
  /**
   * @description Replay button label
   */
  Replay: "Replay",
  /**
   * @description Button label for the normal speed replay option
   */
  ReplayNormalButtonLabel: "Normal speed",
  /**
   * @description Item label for the normal speed replay option
   */
  ReplayNormalItemLabel: "Normal (Default)",
  /**
   * @description Button label for the slow speed replay option
   */
  ReplaySlowButtonLabel: "Slow speed",
  /**
   * @description Item label for the slow speed replay option
   */
  ReplaySlowItemLabel: "Slow",
  /**
   * @description Button label for the very slow speed replay option
   */
  ReplayVerySlowButtonLabel: "Very slow speed",
  /**
   * @description Item label for the very slow speed replay option
   */
  ReplayVerySlowItemLabel: "Very slow",
  /**
   * @description Button label for the extremely slow speed replay option
   */
  ReplayExtremelySlowButtonLabel: "Extremely slow speed",
  /**
   * @description Item label for the slow speed replay option
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
var items = [
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
];
var replaySpeedToMetricSpeedMap = {
  [
    "normal"
    /* PlayRecordingSpeed.NORMAL */
  ]: 1,
  [
    "slow"
    /* PlayRecordingSpeed.SLOW */
  ]: 2,
  [
    "very_slow"
    /* PlayRecordingSpeed.VERY_SLOW */
  ]: 3,
  [
    "extremely_slow"
    /* PlayRecordingSpeed.EXTREMELY_SLOW */
  ]: 4
};
var str_4 = i18n7.i18n.registerUIStrings("panels/recorder/components/ReplaySection.ts", UIStrings4);
var i18nString4 = i18n7.i18n.getLocalizedString.bind(void 0, str_4);
var StartReplayEvent = class _StartReplayEvent extends Event {
  speed;
  extension;
  static eventName = "startreplay";
  constructor(speed, extension) {
    super(_StartReplayEvent.eventName, { bubbles: true, composed: true });
    this.speed = speed;
    this.extension = extension;
  }
};
var REPLAY_EXTENSION_PREFIX = "extension";
var ReplaySection = class extends HTMLElement {
  #shadow = this.attachShadow({ mode: "open" });
  #props = { disabled: false };
  #settings;
  #replayExtensions = [];
  set data(data) {
    this.#settings = data.settings;
    this.#replayExtensions = data.replayExtensions;
  }
  get disabled() {
    return this.#props.disabled;
  }
  set disabled(disabled) {
    this.#props.disabled = disabled;
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  connectedCallback() {
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  #handleSelectMenuSelected(event) {
    const speed = event.value;
    if (this.#settings && event.value) {
      this.#settings.speed = speed;
      this.#settings.replayExtension = "";
    }
    if (replaySpeedToMetricSpeedMap[speed]) {
      Host.userMetrics.recordingReplaySpeed(replaySpeedToMetricSpeedMap[speed]);
    }
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  #handleSelectButtonClick(event) {
    event.stopPropagation();
    if (event.value?.startsWith(REPLAY_EXTENSION_PREFIX)) {
      if (this.#settings) {
        this.#settings.replayExtension = event.value;
      }
      const extensionIdx = Number(event.value.substring(REPLAY_EXTENSION_PREFIX.length));
      this.dispatchEvent(new StartReplayEvent("normal", this.#replayExtensions[extensionIdx]));
      void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
      return;
    }
    this.dispatchEvent(new StartReplayEvent(
      this.#settings ? this.#settings.speed : "normal"
      /* PlayRecordingSpeed.NORMAL */
    ));
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  #render() {
    const groups = [{ name: i18nString4(UIStrings4.speedGroup), items }];
    if (this.#replayExtensions.length) {
      groups.push({
        name: i18nString4(UIStrings4.extensionGroup),
        items: this.#replayExtensions.map((extension, idx) => {
          return {
            value: REPLAY_EXTENSION_PREFIX + idx,
            buttonIconName: "play",
            buttonLabel: () => extension.getName(),
            label: () => extension.getName()
          };
        })
      });
    }
    Lit5.render(html5`
    <devtools-select-button
      @selectmenuselected=${this.#handleSelectMenuSelected}
      @selectbuttonclick=${this.#handleSelectButtonClick}
      .variant=${"primary"}
      .showItemDivider=${false}
      .disabled=${this.#props.disabled}
      .action=${"chrome-recorder.replay-recording"}
      .value=${this.#settings?.replayExtension || this.#settings?.speed || ""}
      .buttonLabel=${i18nString4(UIStrings4.Replay)}
      .groups=${groups}
      jslog=${VisualLogging4.action(
      "chrome-recorder.replay-recording"
      /* Actions.RecorderActions.REPLAY_RECORDING */
    ).track({ click: true })}
    ></devtools-select-button>`, this.#shadow, { host: this });
  }
};
customElements.define("devtools-replay-section", ReplaySection);

// gen/front_end/panels/recorder/components/RecordingView.js
import * as Host2 from "./../../../core/host/host.js";
import * as i18n9 from "./../../../core/i18n/i18n.js";
import * as Platform from "./../../../core/platform/platform.js";
import * as SDK from "./../../../core/sdk/sdk.js";
import * as CodeMirror from "./../../../third_party/codemirror.next/codemirror.next.js";
import * as Buttons4 from "./../../../ui/components/buttons/buttons.js";
import * as CodeHighlighter from "./../../../ui/components/code_highlighter/code_highlighter.js";
import * as Dialogs from "./../../../ui/components/dialogs/dialogs.js";
import * as Input2 from "./../../../ui/components/input/input.js";
import * as TextEditor from "./../../../ui/components/text_editor/text_editor.js";
import * as UI3 from "./../../../ui/legacy/legacy.js";
import * as Lit6 from "./../../../ui/lit/lit.js";
import * as VisualLogging5 from "./../../../ui/visual_logging/visual_logging.js";
import * as Models3 from "./../models/models.js";

// gen/front_end/panels/recorder/components/recordingView.css.js
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
    overflow: hidden;
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

  .show-code {
    margin-right: 14px;
    margin-top: 8px;
  }

  devtools-recorder-extension-view {
    flex: 1;
  }
}

/*# sourceURL=${import.meta.resolve("./recordingView.css")} */`;

// gen/front_end/panels/recorder/components/RecordingView.js
var { html: html6 } = Lit6;
var UIStrings5 = {
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
   * @description The title of the screenshot image that is shown for every section in the recordign view.
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
   * @description The title of the button that open current recording in Performance panel.
   */
  performancePanel: "Performance panel"
};
var str_5 = i18n9.i18n.registerUIStrings("panels/recorder/components/RecordingView.ts", UIStrings5);
var i18nString5 = i18n9.i18n.getLocalizedString.bind(void 0, str_5);
var networkConditionPresets = [
  SDK.NetworkManager.NoThrottlingConditions,
  SDK.NetworkManager.OfflineConditions,
  SDK.NetworkManager.Slow3GConditions,
  SDK.NetworkManager.Slow4GConditions,
  SDK.NetworkManager.Fast4GConditions
];
function converterIdToFlowMetric(converterId) {
  switch (converterId) {
    case "puppeteer":
    case "puppeteer-firefox":
      return 1;
    case "json":
      return 2;
    case "@puppeteer/replay":
      return 3;
    default:
      return 4;
  }
}
function converterIdToStepMetric(converterId) {
  switch (converterId) {
    case "puppeteer":
    case "puppeteer-firefox":
      return 5;
    case "json":
      return 6;
    case "@puppeteer/replay":
      return 7;
    default:
      return 8;
  }
}
function renderSettings({ settings, replaySettingsExpanded, onSelectMenuLabelClick, onNetworkConditionsChange, onTimeoutInput, isRecording, replayState, onReplaySettingsKeydown, onToggleReplaySettings }) {
  if (!settings) {
    return Lit6.nothing;
  }
  const environmentFragments = [];
  if (settings.viewportSettings) {
    environmentFragments.push(html6`<div>${settings.viewportSettings.isMobile ? i18nString5(UIStrings5.mobile) : i18nString5(UIStrings5.desktop)}</div>`);
    environmentFragments.push(html6`<div class="separator"></div>`);
    environmentFragments.push(html6`<div>${settings.viewportSettings.width}×${settings.viewportSettings.height} px</div>`);
  }
  const replaySettingsFragments = [];
  if (!replaySettingsExpanded) {
    if (settings.networkConditionsSettings) {
      if (settings.networkConditionsSettings.title) {
        replaySettingsFragments.push(html6`<div>${settings.networkConditionsSettings.title}</div>`);
      } else {
        replaySettingsFragments.push(html6`<div>
          ${i18nString5(UIStrings5.download, {
          value: i18n9.ByteUtilities.bytesToString(settings.networkConditionsSettings.download)
        })},
          ${i18nString5(UIStrings5.upload, {
          value: i18n9.ByteUtilities.bytesToString(settings.networkConditionsSettings.upload)
        })},
          ${i18nString5(UIStrings5.latency, {
          value: settings.networkConditionsSettings.latency
        })}
        </div>`);
      }
    } else {
      replaySettingsFragments.push(html6`<div>${SDK.NetworkManager.NoThrottlingConditions.title instanceof Function ? SDK.NetworkManager.NoThrottlingConditions.title() : SDK.NetworkManager.NoThrottlingConditions.title}</div>`);
    }
    replaySettingsFragments.push(html6`<div class="separator"></div>`);
    replaySettingsFragments.push(html6`<div>${i18nString5(UIStrings5.timeout, {
      value: settings.timeout || Models3.RecordingPlayer.defaultTimeout
    })}</div>`);
  } else {
    const selectedOption = settings.networkConditionsSettings?.i18nTitleKey || SDK.NetworkManager.NoThrottlingConditions.i18nTitleKey;
    const selectedOptionTitle = networkConditionPresets.find((preset) => preset.i18nTitleKey === selectedOption);
    let menuButtonTitle = "";
    if (selectedOptionTitle) {
      menuButtonTitle = selectedOptionTitle.title instanceof Function ? selectedOptionTitle.title() : selectedOptionTitle.title;
    }
    replaySettingsFragments.push(html6`<div class="editable-setting">
      <label class="wrapping-label" @click=${onSelectMenuLabelClick}>
        ${i18nString5(UIStrings5.network)}
        <select
            title=${menuButtonTitle}
            jslog=${VisualLogging5.dropDown("network-conditions").track({ change: true })}
            @change=${onNetworkConditionsChange}>
      ${networkConditionPresets.map((condition) => html6`
        <option jslog=${VisualLogging5.item(Platform.StringUtilities.toKebabCase(condition.i18nTitleKey || ""))}
                value=${condition.i18nTitleKey || ""} ?selected=${selectedOption === condition.i18nTitleKey}>
                ${condition.title instanceof Function ? condition.title() : condition.title}
        </option>`)}
    </select>
      </label>
    </div>`);
    replaySettingsFragments.push(html6`<div class="editable-setting">
      <label class="wrapping-label" title=${i18nString5(UIStrings5.timeoutExplanation)}>
        ${i18nString5(UIStrings5.timeoutLabel)}
        <input
          @input=${onTimeoutInput}
          required
          min=${Models3.SchemaUtils.minTimeout}
          max=${Models3.SchemaUtils.maxTimeout}
          value=${settings.timeout || Models3.RecordingPlayer.defaultTimeout}
          jslog=${VisualLogging5.textField("timeout").track({ change: true })}
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
  return html6`
    <div class="settings-row">
      <div class="settings-container">
        <div
          class=${Lit6.Directives.classMap(replaySettingsButtonClassMap)}
          @keydown=${isEditable && onReplaySettingsKeydown}
          @click=${isEditable && onToggleReplaySettings}
          tabindex="0"
          role="button"
          jslog=${VisualLogging5.action("replay-settings").track({ click: true })}
          aria-label=${i18nString5(UIStrings5.editReplaySettings)}>
          <span>${i18nString5(UIStrings5.replaySettings)}</span>
          ${isEditable ? html6`<devtools-icon
                  class="chevron"
                  name="triangle-down">
                </devtools-icon>` : ""}
        </div>
        <div class=${Lit6.Directives.classMap(replaySettingsClassMap)}>
          ${replaySettingsFragments.length ? replaySettingsFragments : html6`<div>${i18nString5(UIStrings5.default)}</div>`}
        </div>
      </div>
      <div class="settings-container">
        <div class="settings-title">${i18nString5(UIStrings5.environment)}</div>
        <div class="settings">
          ${environmentFragments.length ? environmentFragments : html6`<div>${i18nString5(UIStrings5.default)}</div>`}
        </div>
      </div>
    </div>
  `;
}
function renderTimelineArea(input, output) {
  if (input.extensionDescriptor) {
    return html6`
        <devtools-recorder-extension-view .descriptor=${input.extensionDescriptor}>
        </devtools-recorder-extension-view>
      `;
  }
  return html6`
        <devtools-split-view
          direction="auto"
          sidebar-position="second"
          sidebar-initial-size="300"
          sidebar-visibility=${input.showCodeView ? "" : "hidden"}
        >
          <div slot="main">
            ${renderSections(input)}
          </div>
          <div slot="sidebar" jslog=${VisualLogging5.pane("source-code").track({ resize: true })}>
            ${input.showCodeView ? html6`
            <div class="section-toolbar" jslog=${VisualLogging5.toolbar()}>
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
    return html6`<devtools-menu-item
                    .value=${converter.getId()}
                    .selected=${input.converterId === converter.getId()}
                    jslog=${VisualLogging5.action().track({ click: true }).context(`converter-${Platform.StringUtilities.toKebabCase(converter.getId())}`)}
                  >
                    ${converter.getFormatName()}
                  </devtools-menu-item>`;
  })}
                ${input.extensionConverters.map((converter) => {
    return html6`<devtools-menu-item
                    .value=${converter.getId()}
                    .selected=${input.converterId === converter.getId()}
                    jslog=${VisualLogging5.action().track({ click: true }).context("converter-extension")}
                  >
                    ${converter.getFormatName()}
                  </devtools-menu-item>`;
  })}
              </devtools-select-menu>
              <devtools-button
                title=${Models3.Tooltip.getTooltipForActions(
    i18nString5(UIStrings5.hideCode),
    "chrome-recorder.toggle-code-view"
    /* Actions.RecorderActions.TOGGLE_CODE_VIEW */
  )}
                .data=${{
    variant: "icon",
    size: "SMALL",
    iconName: "cross"
  }}
                @click=${input.showCodeToggle}
                jslog=${VisualLogging5.close().track({ click: true })}
              ></devtools-button>
            </div>
            ${renderTextEditor(input, output)}` : Lit6.nothing}
          </div>
        </devtools-split-view>
      `;
}
function renderTextEditor(input, output) {
  if (!input.editorState) {
    throw new Error("Unexpected: trying to render the text editor without editorState");
  }
  return html6`
    <div class="text-editor" jslog=${VisualLogging5.textField().track({ change: true })}>
      <devtools-text-editor .state=${input.editorState} ${Lit6.Directives.ref((editor) => {
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
  return html6`
      <img class="screenshot" src=${section5.screenshot} alt=${i18nString5(UIStrings5.screenshotForSection)} />
    `;
}
function renderReplayOrAbortButton(input) {
  if (input.replayState.isPlaying) {
    return html6`
        <devtools-button .jslogContext=${"abort-replay"} @click=${input.onAbortReplay} .iconName=${"pause"} .variant=${"outlined"}>
          ${i18nString5(UIStrings5.cancelReplay)}
        </devtools-button>`;
  }
  if (!input.recorderSettings) {
    return Lit6.nothing;
  }
  return html6`<devtools-replay-section
        .data=${{
    settings: input.recorderSettings,
    replayExtensions: input.replayExtensions
  }}
        .disabled=${input.replayState.isPlaying}
        @startreplay=${input.onTogglePlaying}
        >
      </devtools-replay-section>`;
}
function renderSections(input) {
  return html6`
      <div class="sections">
      ${!input.showCodeView ? html6`<div class="section-toolbar">
        <devtools-button
          @click=${input.showCodeToggle}
          class="show-code"
          .data=${{
    variant: "outlined",
    title: Models3.Tooltip.getTooltipForActions(
      i18nString5(UIStrings5.showCode),
      "chrome-recorder.toggle-code-view"
      /* Actions.RecorderActions.TOGGLE_CODE_VIEW */
    )
  }}
          jslog=${VisualLogging5.toggleSubpane(
    "chrome-recorder.toggle-code-view"
    /* Actions.RecorderActions.TOGGLE_CODE_VIEW */
  ).track({ click: true })}
        >
          ${i18nString5(UIStrings5.showCode)}
        </devtools-button>
      </div>` : ""}
      ${input.sections.map((section5, i) => html6`
            <div class="section">
              <div class="screenshot-wrapper">
                ${renderScreenshot(section5)}
              </div>
              <div class="content">
                <div class="steps">
                  <devtools-step-view
                    @click=${input.onStepClick}
                    @mouseover=${input.onStepHover}
                    .data=${{
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
    error: input.getSectionState(section5) === "error" ? input.currentError : void 0,
    hasBreakpoint: false,
    removable: input.recording.steps.length > 1 && section5.causingStep
  }}
                  >
                  </devtools-step-view>
                  ${section5.steps.map((step) => {
    const stepIndex = input.recording.steps.indexOf(step);
    return html6`
                      <devtools-step-view
                      @click=${input.onStepClick}
                      @mouseover=${input.onStepHover}
                      @copystep=${input.onCopyStep}
                      .data=${{
      step,
      state: input.getStepState(step),
      error: input.currentStep === step ? input.currentError : void 0,
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
      recorderSettings: input.recorderSettings
    }}
                      jslog=${VisualLogging5.section("step").track({ click: true })}
                      ></devtools-step-view>
                    `;
  })}
                  ${!input.recordingTogglingInProgress && input.isRecording && i === input.sections.length - 1 ? html6`<devtools-button
                    class="step add-assertion-button"
                    .data=${{
    variant: "outlined",
    title: i18nString5(UIStrings5.addAssertion),
    jslogContext: "add-assertion"
  }}
                    @click=${input.onAddAssertion}
                  >${i18nString5(UIStrings5.addAssertion)}</devtools-button>` : void 0}
                  ${input.isRecording && i === input.sections.length - 1 ? html6`<div class="step recording">${i18nString5(UIStrings5.recording)}</div>` : null}
                </div>
              </div>
            </div>
      `)}
      </div>
    `;
}
function renderHeader(input) {
  if (!input.recording) {
    return Lit6.nothing;
  }
  const { title } = input.recording;
  const isTitleEditable = !input.replayState.isPlaying && !input.isRecording;
  return html6`
    <div class="header">
      <div class="header-title-wrapper">
        <div class="header-title">
          <input @blur=${input.onTitleBlur}
                @keydown=${input.onTitleInputKeyDown}
                id="title-input"
                jslog=${VisualLogging5.value("title").track({ change: true })}
                class=${Lit6.Directives.classMap({
    "has-error": input.isTitleInvalid,
    disabled: !isTitleEditable
  })}
                .value=${Lit6.Directives.live(title)}
                .disabled=${!isTitleEditable}
                >
          <div class="title-button-bar">
            <devtools-button
              @click=${input.onEditTitleButtonClick}
              .data=${{
    disabled: !isTitleEditable,
    variant: "toolbar",
    iconName: "edit",
    title: i18nString5(UIStrings5.editTitle),
    jslogContext: "edit-title"
  }}
            ></devtools-button>
          </div>
        </div>
        ${input.isTitleInvalid ? html6`<div class="title-input-error-text">
          ${i18nString5(UIStrings5.requiredTitleError)}
        </div>` : Lit6.nothing}
      </div>
      ${!input.isRecording && input.replayAllowed ? html6`<div class="actions">
              <devtools-button
                @click=${input.onMeasurePerformanceClick}
                .data=${{
    disabled: input.replayState.isPlaying,
    variant: "outlined",
    iconName: "performance",
    title: i18nString5(UIStrings5.performancePanel),
    jslogContext: "measure-performance"
  }}
              >
                ${i18nString5(UIStrings5.performancePanel)}
              </devtools-button>
              <div class="separator"></div>
              ${renderReplayOrAbortButton(input)}
            </div>` : Lit6.nothing}
    </div>`;
}
var DEFAULT_VIEW3 = (input, output, target) => {
  const classNames = {
    wrapper: true,
    "is-recording": input.isRecording,
    "is-playing": input.replayState.isPlaying,
    "was-successful": input.lastReplayResult === "Success",
    "was-failure": input.lastReplayResult === "Failure"
  };
  const footerButtonTitle = input.recordingTogglingInProgress ? i18nString5(UIStrings5.recordingIsBeingStopped) : i18nString5(UIStrings5.endRecording);
  Lit6.render(html6`
    <style>${UI3.inspectorCommonStyles}</style>
    <style>${recordingView_css_default}</style>
    <style>${Input2.textInputStyles}</style>
    <div @click=${input.onWrapperClick} class=${Lit6.Directives.classMap(classNames)}>
      <div class="recording-view main">
        ${renderHeader(input)}
        ${input.extensionDescriptor ? html6`
            <devtools-recorder-extension-view .descriptor=${input.extensionDescriptor}></devtools-recorder-extension-view>` : html6`
          ${renderSettings(input)}
          ${renderTimelineArea(input, output)}
        `}
        ${input.isRecording ? html6`<div class="footer">
          <div class="controls">
            <devtools-control-button
              jslog=${VisualLogging5.toggle("toggle-recording").track({ click: true })}
              @click=${input.onRecordingFinished}
              .disabled=${input.recordingTogglingInProgress}
              .shape=${"square"}
              .label=${footerButtonTitle}
              title=${Models3.Tooltip.getTooltipForActions(
    footerButtonTitle,
    "chrome-recorder.start-recording"
    /* Actions.RecorderActions.START_RECORDING */
  )}
            >
            </devtools-control-button>
          </div>
        </div>` : Lit6.nothing}
      </div>
    </div>
  `, target);
};
var RecordingView = class extends UI3.Widget.Widget {
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
  addAssertion;
  abortReplay;
  recordingFinished;
  playRecording;
  networkConditionsChanged;
  timeoutChanged;
  titleChanged;
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
  #selectedStep;
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
    this.#view = view || DEFAULT_VIEW3;
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
        this.addAssertion?.();
      },
      onRecordingFinished: () => {
        this.recordingFinished?.();
      },
      getSectionState: this.#getSectionState.bind(this),
      getStepState: this.#getStepState.bind(this),
      onAbortReplay: () => {
        this.abortReplay?.();
      },
      onMeasurePerformanceClick: this.#handleMeasurePerformanceClickEvent.bind(this),
      onTogglePlaying: (event) => {
        this.playRecording?.({
          targetPanel: "chrome-recorder",
          speed: event.speed,
          extension: event.extension
        });
      },
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
  #onStepHover = (event) => {
    const stepView = event.target;
    const step = stepView.step || stepView.section?.causingStep;
    if (!step || this.#selectedStep) {
      return;
    }
    this.#highlightCodeForStep(step);
  };
  #onStepClick(event) {
    event.stopPropagation();
    const stepView = event.target;
    const selectedStep = stepView.step || stepView.section?.causingStep || null;
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
    if (this.#selectedStep === void 0) {
      return;
    }
    this.#selectedStep = void 0;
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
      this.networkConditionsChanged?.(preset?.i18nTitleKey === SDK.NetworkManager.NoThrottlingConditions.i18nTitleKey ? void 0 : preset);
    }
  }
  #onTimeoutInput(event) {
    const target = event.target;
    if (!target.checkValidity()) {
      target.reportValidity();
      return;
    }
    this.timeoutChanged?.(Number(target.value));
  }
  #onTitleBlur = (event) => {
    const target = event.target;
    const title = target.value.trim();
    if (!title) {
      this.#isTitleInvalid = true;
      this.performUpdate();
      return;
    }
    this.titleChanged?.(title);
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
    Host2.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(text);
    const metric = step ? converterIdToStepMetric(converter.getId()) : converterIdToFlowMetric(converter.getId());
    Host2.userMetrics.recordingCopiedToClipboard(metric);
  }
  #onCopyStepEvent(event) {
    event.stopPropagation();
    void this.#copyCurrentSelection(event.step);
  }
  async #onCopy(event) {
    if (event.target !== document.body) {
      return;
    }
    event.preventDefault();
    await this.#copyCurrentSelection(this.#selectedStep);
    Host2.userMetrics.keyboardShortcutFired(
      "chrome-recorder.copy-recording-or-step"
      /* Actions.RecorderActions.COPY_RECORDING_OR_STEP */
    );
  }
  #handleMeasurePerformanceClickEvent(event) {
    event.stopPropagation();
    this.playRecording?.({
      targetPanel: "timeline",
      speed: "normal"
    });
  }
  showCodeToggle = () => {
    this.#showCodeView = !this.#showCodeView;
    Host2.userMetrics.recordingCodeToggled(
      this.#showCodeView ? 1 : 2
      /* Host.UserMetrics.RecordingCodeToggled.CODE_HIDDEN */
    );
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

// gen/front_end/panels/recorder/components/SelectButton.js
var SelectButton_exports = {};
__export(SelectButton_exports, {
  SelectButton: () => SelectButton,
  SelectButtonClickEvent: () => SelectButtonClickEvent,
  SelectMenuSelectedEvent: () => SelectMenuSelectedEvent
});
import "./../../../ui/components/menus/menus.js";
import * as Platform2 from "./../../../core/platform/platform.js";
import * as Buttons5 from "./../../../ui/components/buttons/buttons.js";
import * as ComponentHelpers2 from "./../../../ui/components/helpers/helpers.js";
import * as UI4 from "./../../../ui/legacy/legacy.js";
import * as Lit7 from "./../../../ui/lit/lit.js";
import * as VisualLogging6 from "./../../../ui/visual_logging/visual_logging.js";
import * as Models4 from "./../models/models.js";

// gen/front_end/panels/recorder/components/selectButton.css.js
var selectButton_css_default = `/*
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

/*# sourceURL=${import.meta.resolve("./selectButton.css")} */`;

// gen/front_end/panels/recorder/components/SelectButton.js
var { html: html7, Directives: { ifDefined, classMap } } = Lit7;
var SelectButtonClickEvent = class _SelectButtonClickEvent extends Event {
  value;
  static eventName = "selectbuttonclick";
  constructor(value2) {
    super(_SelectButtonClickEvent.eventName, { bubbles: true, composed: true });
    this.value = value2;
  }
};
var SelectMenuSelectedEvent = class _SelectMenuSelectedEvent extends Event {
  value;
  static eventName = "selectmenuselected";
  constructor(value2) {
    super(_SelectMenuSelectedEvent.eventName, { bubbles: true, composed: true });
    this.value = value2;
  }
};
var SelectButton = class extends HTMLElement {
  #shadow = this.attachShadow({ mode: "open" });
  #props = {
    disabled: false,
    value: "",
    items: [],
    buttonLabel: "",
    groups: [],
    variant: "primary"
  };
  connectedCallback() {
    void ComponentHelpers2.ScheduledRender.scheduleRender(this, this.#render);
  }
  get disabled() {
    return this.#props.disabled;
  }
  set disabled(disabled) {
    this.#props.disabled = disabled;
    void ComponentHelpers2.ScheduledRender.scheduleRender(this, this.#render);
  }
  get items() {
    return this.#props.items;
  }
  set items(items2) {
    this.#props.items = items2;
    void ComponentHelpers2.ScheduledRender.scheduleRender(this, this.#render);
  }
  set buttonLabel(buttonLabel) {
    this.#props.buttonLabel = buttonLabel;
  }
  set groups(groups) {
    this.#props.groups = groups;
    void ComponentHelpers2.ScheduledRender.scheduleRender(this, this.#render);
  }
  get value() {
    return this.#props.value;
  }
  set value(value2) {
    this.#props.value = value2;
    void ComponentHelpers2.ScheduledRender.scheduleRender(this, this.#render);
  }
  get variant() {
    return this.#props.variant;
  }
  set variant(variant) {
    this.#props.variant = variant;
    void ComponentHelpers2.ScheduledRender.scheduleRender(this, this.#render);
  }
  set action(value2) {
    this.#props.action = value2;
    void ComponentHelpers2.ScheduledRender.scheduleRender(this, this.#render);
  }
  #handleClick(ev) {
    ev.stopPropagation();
    this.dispatchEvent(new SelectButtonClickEvent(this.#props.value));
  }
  #handleSelectMenuSelect(evt) {
    if (evt.target instanceof HTMLSelectElement) {
      this.dispatchEvent(new SelectMenuSelectedEvent(evt.target.value));
      void ComponentHelpers2.ScheduledRender.scheduleRender(this, this.#render);
    }
  }
  #renderSelectItem(item4, selectedItem) {
    const selected = item4.value === selectedItem.value;
    return html7`
      <option
      .title=${item4.label()}
      value=${item4.value}
      ?selected=${selected}
      jslog=${VisualLogging6.item(Platform2.StringUtilities.toKebabCase(item4.value)).track({ click: true })}
      >${selected && item4.buttonLabel ? item4.buttonLabel() : item4.label()}</option>
    `;
  }
  #renderSelectGroup(group, selectedItem) {
    return html7`
      <optgroup label=${group.name}>
        ${group.items.map((item4) => this.#renderSelectItem(item4, selectedItem))}
      </optgroup>
    `;
  }
  #getTitle(label) {
    return this.#props.action ? Models4.Tooltip.getTooltipForActions(label, this.#props.action) : "";
  }
  #render = () => {
    const hasGroups = Boolean(this.#props.groups.length);
    const items2 = hasGroups ? this.#props.groups.flatMap((group) => group.items) : this.#props.items;
    const selectedItem = items2.find((item4) => item4.value === this.#props.value) || items2[0];
    if (!selectedItem) {
      return;
    }
    const classes = {
      primary: this.#props.variant === "primary",
      secondary: this.#props.variant === "outlined"
    };
    const buttonVariant = this.#props.variant === "outlined" ? "outlined" : "primary";
    const menuLabel = selectedItem.buttonLabel ? selectedItem.buttonLabel() : selectedItem.label();
    Lit7.render(html7` <style>
          ${UI4.inspectorCommonStyles}
        </style>
        <style>
          ${selectButton_css_default}
        </style>
        <div
          class="select-button"
          title=${ifDefined(this.#getTitle(menuLabel))}
        >
          <label>
            ${this.#props.groups.length > 1 ? html7`
                  <div
                    class="groups-label"
                    >${this.#props.groups.map((group) => {
      return group.name;
    }).join(" & ")}</div>` : Lit7.nothing}
            <select
              class=${classMap(classes)}
              ?disabled=${this.#props.disabled}
              jslog=${VisualLogging6.dropDown("network-conditions").track({
      change: true
    })}
              @change=${this.#handleSelectMenuSelect}
            >
              ${hasGroups ? this.#props.groups.map((group) => this.#renderSelectGroup(group, selectedItem)) : this.#props.items.map((item4) => this.#renderSelectItem(item4, selectedItem))}
            </select>
          </label>
          ${selectedItem ? html7` <devtools-button
                .disabled=${this.#props.disabled}
                .variant=${buttonVariant}
                .iconName=${selectedItem.buttonIconName}
                @click=${this.#handleClick}
              >
                ${this.#props.buttonLabel}
              </devtools-button>` : ""}
        </div>`, this.#shadow, { host: this });
  };
};
customElements.define("devtools-select-button", SelectButton);

// gen/front_end/panels/recorder/components/StepEditor.js
var StepEditor_exports = {};
__export(StepEditor_exports, {
  EditorState: () => EditorState2,
  StepEditedEvent: () => StepEditedEvent,
  StepEditor: () => StepEditor
});
import * as Host3 from "./../../../core/host/host.js";
import * as i18n11 from "./../../../core/i18n/i18n.js";
import * as Platform3 from "./../../../core/platform/platform.js";
import * as Buttons6 from "./../../../ui/components/buttons/buttons.js";
import * as SuggestionInput from "./../../../ui/components/suggestion_input/suggestion_input.js";
import * as Lit8 from "./../../../ui/lit/lit.js";
import * as VisualLogging7 from "./../../../ui/visual_logging/visual_logging.js";
import * as Controllers from "./../controllers/controllers.js";
import * as Models5 from "./../models/models.js";
import * as Util from "./../util/util.js";

// gen/front_end/panels/recorder/components/stepEditor.css.js
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

.selector-picker {
  width: 18px;
  height: 18px;
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

// gen/front_end/panels/recorder/components/util.js
function assert(predicate, message = "Assertion failed!") {
  if (!predicate) {
    throw new Error(message);
  }
}
var deepFreeze = (object) => {
  for (const name of Reflect.ownKeys(object)) {
    const value2 = object[name];
    if (value2 && typeof value2 === "object" || typeof value2 === "function") {
      deepFreeze(value2);
    }
  }
  return Object.freeze(object);
};
var InsertAssignment = class {
  value;
  constructor(value2) {
    this.value = value2;
  }
};
var ArrayAssignments = class {
  value;
  constructor(value2) {
    this.value = value2;
  }
};
var immutableDeepAssign = (object, assignments) => {
  if (assignments instanceof ArrayAssignments) {
    assert(Array.isArray(object), `Expected an array. Got ${typeof object}.`);
    const updatedObject = [...object];
    const keys = Object.keys(assignments.value).sort((a, b) => Number(b) - Number(a));
    for (const key2 of keys) {
      const update = assignments.value[Number(key2)];
      if (update === void 0) {
        updatedObject.splice(Number(key2), 1);
      } else if (update instanceof InsertAssignment) {
        updatedObject.splice(Number(key2), 0, update.value);
      } else {
        updatedObject[Number(key2)] = immutableDeepAssign(updatedObject[key2], update);
      }
    }
    return Object.freeze(updatedObject);
  }
  if (typeof assignments === "object" && !Array.isArray(assignments)) {
    assert(!Array.isArray(object), "Expected an object. Got an array.");
    const updatedObject = { ...object };
    const keys = Object.keys(assignments);
    for (const key2 of keys) {
      const update = assignments[key2];
      if (update === void 0) {
        delete updatedObject[key2];
      } else {
        updatedObject[key2] = immutableDeepAssign(updatedObject[key2], update);
      }
    }
    return Object.freeze(updatedObject);
  }
  return assignments;
};

// gen/front_end/panels/recorder/components/StepEditor.js
var __decorate2 = function(decorators, target, key2, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key2) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key2, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key2, r) : d(target, key2)) || r;
  return c > 3 && r && Object.defineProperty(target, key2, r), r;
};
var { html: html8, Decorators: Decorators2, Directives: Directives2, LitElement: LitElement2 } = Lit8;
var { customElement: customElement2, property: property2, state } = Decorators2;
var { live } = Directives2;
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
   * @description The text that is disabled when the steps were not saved due to an error. The error message itself is always in English and not translated.
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
   * @description The title of a button that allows you to select an element on the page and update CSS/ARIA selectors.
   */
  selectorPicker: "Select an element in the page to update selectors",
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
   * @description The error message display when a user enters a type in the input not associates with any existing types.
   */
  unknownActionType: "Unknown action type."
};
var str_6 = i18n11.i18n.registerUIStrings("panels/recorder/components/StepEditor.ts", UIStrings6);
var i18nString6 = i18n11.i18n.getLocalizedString.bind(void 0, str_6);
var StepEditedEvent = class _StepEditedEvent extends Event {
  static eventName = "stepedited";
  data;
  constructor(step) {
    super(_StepEditedEvent.eventName, { bubbles: true, composed: true });
    this.data = step;
  }
};
var cleanUndefineds = (value2) => {
  return JSON.parse(JSON.stringify(value2));
};
var EditorState2 = class {
  static #puppeteer = new Util.SharedObject.SharedObject(() => Models5.RecordingPlayer.RecordingPlayer.connectPuppeteer(), ({ browser }) => Models5.RecordingPlayer.RecordingPlayer.disconnectPuppeteer(browser));
  static async default(type) {
    const state2 = { type };
    const attributes = attributesByType[state2.type];
    let promise = Promise.resolve();
    for (const attribute of attributes.required) {
      promise = Promise.all([
        promise,
        (async () => Object.assign(state2, {
          [attribute]: await this.defaultByAttribute(state2, attribute)
        }))()
      ]);
    }
    await promise;
    return Object.freeze(state2);
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
          return puppeteer.page.evaluate(() => visualViewport.height) || defaultValuesByAttribute.height;
        }
        case "width": {
          return puppeteer.page.evaluate(() => visualViewport.width) || defaultValuesByAttribute.width;
        }
        default: {
          return defaultValuesByAttribute[attribute];
        }
      }
    });
  }
  static fromStep(step) {
    const state2 = structuredClone(step);
    for (const key2 of ["parameters", "properties"]) {
      if (key2 in step && step[key2] !== void 0) {
        state2[key2] = JSON.stringify(step[key2]);
      }
    }
    if ("attributes" in step && step.attributes) {
      state2.attributes = [];
      for (const [name, value2] of Object.entries(step.attributes)) {
        state2.attributes.push({ name, value: value2 });
      }
    }
    if ("selectors" in step) {
      state2.selectors = step.selectors.map((selector) => {
        if (typeof selector === "string") {
          return [selector];
        }
        return [...selector];
      });
    }
    return deepFreeze(state2);
  }
  static toStep(state2) {
    const step = structuredClone(state2);
    for (const key2 of ["parameters", "properties"]) {
      const value2 = state2[key2];
      if (value2) {
        Object.assign(step, { [key2]: JSON.parse(value2) });
      }
    }
    if (state2.attributes) {
      if (state2.attributes.length !== 0) {
        const attributes = {};
        for (const { name, value: value2 } of state2.attributes) {
          Object.assign(attributes, { [name]: value2 });
        }
        Object.assign(step, { attributes });
      } else if ("attributes" in step) {
        delete step.attributes;
      }
    }
    if (state2.selectors) {
      const selectors = state2.selectors.filter((selector) => selector.length > 0).map((selector) => {
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
    if (state2.frame?.length === 0 && "frame" in step) {
      delete step.frame;
    }
    return cleanUndefineds(Models5.SchemaUtils.parseStep(step));
  }
};
var RecorderSelectorPickerButton = class RecorderSelectorPickerButton2 extends LitElement2 {
  #picker = new Controllers.SelectorPicker.SelectorPicker(this);
  constructor() {
    super();
    this.disabled = false;
  }
  #handleClickEvent = (event) => {
    event.preventDefault();
    event.stopPropagation();
    void this.#picker.toggle();
  };
  disconnectedCallback() {
    super.disconnectedCallback();
    void this.#picker.stop();
  }
  render() {
    if (this.disabled) {
      return;
    }
    return html8`<style>${stepEditor_css_default}</style><devtools-button
      @click=${this.#handleClickEvent}
      .title=${i18nString6(UIStrings6.selectorPicker)}
      class="selector-picker"
      .size=${"SMALL"}
      .iconName=${"select-element"}
      .active=${this.#picker.active}
      .variant=${"icon"}
      jslog=${VisualLogging7.toggle("selector-picker").track({
      click: true
    })}
    ></devtools-button>`;
  }
};
__decorate2([
  property2({ type: Boolean })
], RecorderSelectorPickerButton.prototype, "disabled", void 0);
RecorderSelectorPickerButton = __decorate2([
  customElement2("devtools-recorder-selector-picker-button")
], RecorderSelectorPickerButton);
var StepEditor = class StepEditor2 extends LitElement2 {
  #renderedAttributes = /* @__PURE__ */ new Set();
  constructor() {
    super();
    this.state = { type: Models5.Schema.StepType.WaitForElement };
    this.isTypeEditable = true;
    this.disabled = false;
  }
  createRenderRoot() {
    const root = super.createRenderRoot();
    root.addEventListener("keydown", this.#handleKeyDownEvent);
    return root;
  }
  set step(step) {
    this.state = deepFreeze(EditorState2.fromStep(step));
    this.error = void 0;
  }
  #commit(updatedState) {
    try {
      this.dispatchEvent(new StepEditedEvent(EditorState2.toStep(updatedState)));
      this.state = updatedState;
    } catch (error) {
      this.error = error.message;
    }
  }
  #handleSelectorPickedEvent = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.#commit(immutableDeepAssign(this.state, {
      target: event.data.target,
      frame: event.data.frame,
      selectors: event.data.selectors.map((selector) => typeof selector === "string" ? [selector] : selector),
      offsetX: event.data.offsetX,
      offsetY: event.data.offsetY
    }));
  };
  #handleAddOrRemoveClick = (assignments, query, metric) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.#commit(immutableDeepAssign(this.state, assignments));
    this.#ensureFocus(query);
    if (metric) {
      Host3.userMetrics.recordingEdited(metric);
    }
  };
  #handleKeyDownEvent = (event) => {
    assert(event instanceof KeyboardEvent);
    if (event.target instanceof SuggestionInput.SuggestionInput.SuggestionInput && event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      const elements = this.renderRoot.querySelectorAll("devtools-suggestion-input");
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
    this.#commit(immutableDeepAssign(this.state, assignments));
    if (opts.metric) {
      Host3.userMetrics.recordingEdited(opts.metric);
    }
  };
  #handleTypeInputBlur = async (event) => {
    assert(event.target instanceof SuggestionInput.SuggestionInput.SuggestionInput);
    if (event.target.disabled) {
      return;
    }
    const value2 = event.target.value;
    if (value2 === this.state.type) {
      return;
    }
    if (!Object.values(Models5.Schema.StepType).includes(value2)) {
      this.error = i18nString6(UIStrings6.unknownActionType);
      return;
    }
    this.#commit(await EditorState2.default(value2));
    Host3.userMetrics.recordingEdited(
      9
      /* Host.UserMetrics.RecordingEdited.TYPE_CHANGED */
    );
  };
  #handleAddRowClickEvent = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const attribute = event.target.dataset.attribute;
    this.#commit(immutableDeepAssign(this.state, {
      [attribute]: await EditorState2.defaultByAttribute(this.state, attribute)
    }));
    this.#ensureFocus(`[data-attribute=${attribute}].attribute devtools-suggestion-input`);
  };
  #renderInlineButton(opts) {
    if (this.disabled) {
      return;
    }
    return html8`
      <devtools-button
        title=${opts.title}
        .size=${"SMALL"}
        .iconName=${opts.iconName}
        .variant=${"icon"}
        jslog=${VisualLogging7.action(opts.class).track({
      click: true
    })}
        class="inline-button ${opts.class}"
        @click=${opts.onClick}
      ></devtools-button>
    `;
  }
  #renderDeleteButton(attribute) {
    if (this.disabled) {
      return;
    }
    const attributes = attributesByType[this.state.type];
    const optional = [...attributes.optional].includes(attribute);
    if (!optional || this.disabled) {
      return;
    }
    return html8`<devtools-button
      .size=${"SMALL"}
      .iconName=${"bin"}
      .variant=${"icon"}
      .title=${i18nString6(UIStrings6.deleteRow)}
      class="inline-button delete-row"
      data-attribute=${attribute}
      jslog=${VisualLogging7.action("delete").track({ click: true })}
      @click=${(event) => {
      event.preventDefault();
      event.stopPropagation();
      this.#commit(immutableDeepAssign(this.state, { [attribute]: void 0 }));
    }}
    ></devtools-button>`;
  }
  #renderTypeRow(editable) {
    this.#renderedAttributes.add("type");
    return html8`<div class="row attribute" data-attribute="type" jslog=${VisualLogging7.treeItem("type")}>
      <div>type<span class="separator">:</span></div>
      <devtools-suggestion-input
        .disabled=${!editable || this.disabled}
        .options=${Object.values(Models5.Schema.StepType)}
        .placeholder=${defaultValuesByAttribute.type}
        .value=${live(this.state.type)}
        @blur=${this.#handleTypeInputBlur}
      ></devtools-suggestion-input>
    </div>`;
  }
  #renderRow(attribute) {
    this.#renderedAttributes.add(attribute);
    const attributeValue = this.state[attribute]?.toString();
    if (attributeValue === void 0) {
      return;
    }
    return html8`<div class="row attribute" data-attribute=${attribute} jslog=${VisualLogging7.treeItem(Platform3.StringUtilities.toKebabCase(attribute))}>
      <div>${attribute}<span class="separator">:</span></div>
      <devtools-suggestion-input
        .disabled=${this.disabled}
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
        @blur=${this.#handleInputBlur({
      attribute,
      from(value2) {
        if (this.state[attribute] === void 0) {
          return;
        }
        switch (attribute) {
          case "properties":
            Host3.userMetrics.recordingAssertion(
              2
              /* Host.UserMetrics.RecordingAssertion.PROPERTY_ASSERTION_EDITED */
            );
            break;
        }
        return { [attribute]: value2 };
      },
      metric: 10
    })}
      ></devtools-suggestion-input>
      ${this.#renderDeleteButton(attribute)}
    </div>`;
  }
  #renderFrameRow() {
    this.#renderedAttributes.add("frame");
    if (this.state.frame === void 0) {
      return;
    }
    return html8`
      <div class="attribute" data-attribute="frame" jslog=${VisualLogging7.treeItem("frame")}>
        <div class="row">
          <div>frame<span class="separator">:</span></div>
          ${this.#renderDeleteButton("frame")}
        </div>
        ${this.state.frame.map((frame, index, frames) => {
      return html8`
            <div class="padded row">
              <devtools-suggestion-input
                .disabled=${this.disabled}
                .placeholder=${defaultValuesByAttribute.frame[0].toString()}
                .value=${live(frame.toString())}
                data-path=${`frame.${index}`}
                @blur=${this.#handleInputBlur({
        attribute: "frame",
        from(value2) {
          if (this.state.frame?.[index] === void 0) {
            return;
          }
          return {
            frame: new ArrayAssignments({ [index]: value2 })
          };
        },
        metric: 10
      })}
              ></devtools-suggestion-input>
              ${this.#renderInlineButton({
        class: "add-frame",
        title: i18nString6(UIStrings6.addFrameIndex),
        iconName: "plus",
        onClick: this.#handleAddOrRemoveClick(
          {
            frame: new ArrayAssignments({
              [index + 1]: new InsertAssignment(defaultValuesByAttribute.frame[0])
            })
          },
          `devtools-suggestion-input[data-path="frame.${index + 1}"]`,
          10
          /* Host.UserMetrics.RecordingEdited.OTHER_EDITING */
        )
      })}
              ${this.#renderInlineButton({
        class: "remove-frame",
        title: i18nString6(UIStrings6.removeFrameIndex),
        iconName: "minus",
        onClick: this.#handleAddOrRemoveClick(
          {
            frame: new ArrayAssignments({ [index]: void 0 })
          },
          `devtools-suggestion-input[data-path="frame.${Math.min(index, frames.length - 2)}"]`,
          10
          /* Host.UserMetrics.RecordingEdited.OTHER_EDITING */
        )
      })}
            </div>
          `;
    })}
      </div>
    `;
  }
  #renderSelectorsRow() {
    this.#renderedAttributes.add("selectors");
    if (this.state.selectors === void 0) {
      return;
    }
    return html8`<div class="attribute" data-attribute="selectors" jslog=${VisualLogging7.treeItem("selectors")}>
      <div class="row">
        <div>selectors<span class="separator">:</span></div>
        <devtools-recorder-selector-picker-button
          @selectorpicked=${this.#handleSelectorPickedEvent}
          .disabled=${this.disabled}
        ></devtools-recorder-selector-picker-button>
        ${this.#renderDeleteButton("selectors")}
      </div>
      ${this.state.selectors.map((selector, index, selectors) => {
      return html8`<div class="padded row" data-selector-path=${index}>
            <div>selector #${index + 1}<span class="separator">:</span></div>
            ${this.#renderInlineButton({
        class: "add-selector",
        title: i18nString6(UIStrings6.addSelector),
        iconName: "plus",
        onClick: this.#handleAddOrRemoveClick(
          {
            selectors: new ArrayAssignments({
              [index + 1]: new InsertAssignment(structuredClone(defaultValuesByAttribute.selectors[0]))
            })
          },
          `devtools-suggestion-input[data-path="selectors.${index + 1}.0"]`,
          4
          /* Host.UserMetrics.RecordingEdited.SELECTOR_ADDED */
        )
      })}
            ${this.#renderInlineButton({
        class: "remove-selector",
        title: i18nString6(UIStrings6.removeSelector),
        iconName: "minus",
        onClick: this.#handleAddOrRemoveClick(
          { selectors: new ArrayAssignments({ [index]: void 0 }) },
          `devtools-suggestion-input[data-path="selectors.${Math.min(index, selectors.length - 2)}.0"]`,
          5
          /* Host.UserMetrics.RecordingEdited.SELECTOR_REMOVED */
        )
      })}
          </div>
          ${selector.map((part, partIndex, parts) => {
        return html8`<div
              class="double padded row"
              data-selector-path="${index}.${partIndex}"
            >
              <devtools-suggestion-input
                .disabled=${this.disabled}
                .placeholder=${defaultValuesByAttribute.selectors[0][0]}
                .value=${live(part)}
                data-path=${`selectors.${index}.${partIndex}`}
                @blur=${this.#handleInputBlur({
          attribute: "selectors",
          from(value2) {
            if (this.state.selectors?.[index]?.[partIndex] === void 0) {
              return;
            }
            return {
              selectors: new ArrayAssignments({
                [index]: new ArrayAssignments({
                  [partIndex]: value2
                })
              })
            };
          },
          metric: 7
        })}
              ></devtools-suggestion-input>
              ${this.#renderInlineButton({
          class: "add-selector-part",
          title: i18nString6(UIStrings6.addSelectorPart),
          iconName: "plus",
          onClick: this.#handleAddOrRemoveClick(
            {
              selectors: new ArrayAssignments({
                [index]: new ArrayAssignments({
                  [partIndex + 1]: new InsertAssignment(defaultValuesByAttribute.selectors[0][0])
                })
              })
            },
            `devtools-suggestion-input[data-path="selectors.${index}.${partIndex + 1}"]`,
            6
            /* Host.UserMetrics.RecordingEdited.SELECTOR_PART_ADDED */
          )
        })}
              ${this.#renderInlineButton({
          class: "remove-selector-part",
          title: i18nString6(UIStrings6.removeSelectorPart),
          iconName: "minus",
          onClick: this.#handleAddOrRemoveClick(
            {
              selectors: new ArrayAssignments({
                [index]: new ArrayAssignments({
                  [partIndex]: void 0
                })
              })
            },
            `devtools-suggestion-input[data-path="selectors.${index}.${Math.min(partIndex, parts.length - 2)}"]`,
            8
            /* Host.UserMetrics.RecordingEdited.SELECTOR_PART_REMOVED */
          )
        })}
            </div>`;
      })}`;
    })}
    </div>`;
  }
  #renderAssertedEvents() {
    this.#renderedAttributes.add("assertedEvents");
    if (this.state.assertedEvents === void 0) {
      return;
    }
    return html8`<div class="attribute" data-attribute="assertedEvents" jslog=${VisualLogging7.treeItem("asserted-events")}>
      <div class="row">
        <div>asserted events<span class="separator">:</span></div>
        ${this.#renderDeleteButton("assertedEvents")}
      </div>
      ${this.state.assertedEvents.map((event, index) => {
      return html8` <div class="padded row" jslog=${VisualLogging7.treeItem("event-type")}>
            <div>type<span class="separator">:</span></div>
            <div>${event.type}</div>
          </div>
          <div class="padded row" jslog=${VisualLogging7.treeItem("event-title")}>
            <div>title<span class="separator">:</span></div>
            <devtools-suggestion-input
              .disabled=${this.disabled}
              .placeholder=${defaultValuesByAttribute.assertedEvents[0].title}
              .value=${live(event.title ?? "")}
              @blur=${this.#handleInputBlur({
        attribute: "assertedEvents",
        from(value2) {
          if (this.state.assertedEvents?.[index]?.title === void 0) {
            return;
          }
          return {
            assertedEvents: new ArrayAssignments({
              [index]: { title: value2 }
            })
          };
        },
        metric: 10
      })}
            ></devtools-suggestion-input>
          </div>
          <div class="padded row" jslog=${VisualLogging7.treeItem("event-url")}>
            <div>url<span class="separator">:</span></div>
            <devtools-suggestion-input
              .disabled=${this.disabled}
              .placeholder=${defaultValuesByAttribute.assertedEvents[0].url}
              .value=${live(event.url ?? "")}
              @blur=${this.#handleInputBlur({
        attribute: "url",
        from(value2) {
          if (this.state.assertedEvents?.[index]?.url === void 0) {
            return;
          }
          return {
            assertedEvents: new ArrayAssignments({
              [index]: { url: value2 }
            })
          };
        },
        metric: 10
      })}
            ></devtools-suggestion-input>
          </div>`;
    })}
    </div> `;
  }
  #renderAttributesRow() {
    this.#renderedAttributes.add("attributes");
    if (this.state.attributes === void 0) {
      return;
    }
    return html8`<div class="attribute" data-attribute="attributes" jslog=${VisualLogging7.treeItem("attributes")}>
      <div class="row">
        <div>attributes<span class="separator">:</span></div>
        ${this.#renderDeleteButton("attributes")}
      </div>
      ${this.state.attributes.map(({ name, value: value2 }, index, attributes) => {
      return html8`<div class="padded row" jslog=${VisualLogging7.treeItem("attribute")}>
          <devtools-suggestion-input
            .disabled=${this.disabled}
            .placeholder=${defaultValuesByAttribute.attributes[0].name}
            .value=${live(name)}
            data-path=${`attributes.${index}.name`}
            jslog=${VisualLogging7.key().track({ change: true })}
            @blur=${this.#handleInputBlur({
        attribute: "attributes",
        from(name2) {
          if (this.state.attributes?.[index]?.name === void 0) {
            return;
          }
          Host3.userMetrics.recordingAssertion(
            3
            /* Host.UserMetrics.RecordingAssertion.ATTRIBUTE_ASSERTION_EDITED */
          );
          return {
            attributes: new ArrayAssignments({ [index]: { name: name2 } })
          };
        },
        metric: 10
      })}
          ></devtools-suggestion-input>
          <span class="separator">:</span>
          <devtools-suggestion-input
            .disabled=${this.disabled}
            .placeholder=${defaultValuesByAttribute.attributes[0].value}
            .value=${live(value2)}
            data-path=${`attributes.${index}.value`}
            @blur=${this.#handleInputBlur({
        attribute: "attributes",
        from(value3) {
          if (this.state.attributes?.[index]?.value === void 0) {
            return;
          }
          Host3.userMetrics.recordingAssertion(
            3
            /* Host.UserMetrics.RecordingAssertion.ATTRIBUTE_ASSERTION_EDITED */
          );
          return {
            attributes: new ArrayAssignments({ [index]: { value: value3 } })
          };
        },
        metric: 10
      })}
          ></devtools-suggestion-input>
          ${this.#renderInlineButton({
        class: "add-attribute-assertion",
        title: i18nString6(UIStrings6.addSelectorPart),
        iconName: "plus",
        onClick: this.#handleAddOrRemoveClick(
          {
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
          },
          `devtools-suggestion-input[data-path="attributes.${index + 1}.name"]`,
          10
          /* Host.UserMetrics.RecordingEdited.OTHER_EDITING */
        )
      })}
          ${this.#renderInlineButton({
        class: "remove-attribute-assertion",
        title: i18nString6(UIStrings6.removeSelectorPart),
        iconName: "minus",
        onClick: this.#handleAddOrRemoveClick(
          { attributes: new ArrayAssignments({ [index]: void 0 }) },
          `devtools-suggestion-input[data-path="attributes.${Math.min(index, attributes.length - 2)}.value"]`,
          10
          /* Host.UserMetrics.RecordingEdited.OTHER_EDITING */
        )
      })}
        </div>`;
    })}
    </div>`;
  }
  #renderAddRowButtons() {
    const attributes = attributesByType[this.state.type];
    return [...attributes.optional].filter((attr) => this.state[attr] === void 0).map((attr) => {
      return html8`<devtools-button
          .variant=${"outlined"}
          class="add-row"
          data-attribute=${attr}
          jslog=${VisualLogging7.action(`add-${Platform3.StringUtilities.toKebabCase(attr)}`)}
          @click=${this.#handleAddRowClickEvent}
        >
          ${i18nString6(UIStrings6.addAttribute, {
        attributeName: attr
      })}
        </devtools-button>`;
    });
  }
  #ensureFocus = (query) => {
    void this.updateComplete.then(() => {
      const node = this.renderRoot.querySelector(query);
      node?.focus();
    });
  };
  render() {
    this.#renderedAttributes = /* @__PURE__ */ new Set();
    const result = html8`
      <style>${stepEditor_css_default}</style>
      <div class="wrapper" jslog=${VisualLogging7.tree("step-editor")} >
        ${this.#renderTypeRow(this.isTypeEditable)} ${this.#renderRow("target")}
        ${this.#renderFrameRow()} ${this.#renderSelectorsRow()}
        ${this.#renderRow("deviceType")} ${this.#renderRow("button")}
        ${this.#renderRow("url")} ${this.#renderRow("x")}
        ${this.#renderRow("y")} ${this.#renderRow("offsetX")}
        ${this.#renderRow("offsetY")} ${this.#renderRow("value")}
        ${this.#renderRow("key")} ${this.#renderRow("operator")}
        ${this.#renderRow("count")} ${this.#renderRow("expression")}
        ${this.#renderRow("duration")} ${this.#renderAssertedEvents()}
        ${this.#renderRow("timeout")} ${this.#renderRow("width")}
        ${this.#renderRow("height")} ${this.#renderRow("deviceScaleFactor")}
        ${this.#renderRow("isMobile")} ${this.#renderRow("hasTouch")}
        ${this.#renderRow("isLandscape")} ${this.#renderRow("download")}
        ${this.#renderRow("upload")} ${this.#renderRow("latency")}
        ${this.#renderRow("name")} ${this.#renderRow("parameters")}
        ${this.#renderRow("visible")} ${this.#renderRow("properties")}
        ${this.#renderAttributesRow()}
        ${this.error ? html8`
              <div class="error">
                ${i18nString6(UIStrings6.notSaved, {
      error: this.error
    })}
              </div>
            ` : void 0}
        ${!this.disabled ? html8`<div
              class="row-buttons wrapped gap row regular-font no-margin"
            >
              ${this.#renderAddRowButtons()}
            </div>` : void 0}
      </div>
    `;
    for (const key2 of Object.keys(dataTypeByAttribute)) {
      if (!this.#renderedAttributes.has(key2)) {
        throw new Error(`The editable attribute ${key2} does not have UI`);
      }
    }
    return result;
  }
};
__decorate2([
  state()
], StepEditor.prototype, "state", void 0);
__decorate2([
  state()
], StepEditor.prototype, "error", void 0);
__decorate2([
  property2({ type: Boolean })
], StepEditor.prototype, "isTypeEditable", void 0);
__decorate2([
  property2({ type: Boolean })
], StepEditor.prototype, "disabled", void 0);
StepEditor = __decorate2([
  customElement2("devtools-recorder-step-editor")
], StepEditor);

// gen/front_end/panels/recorder/components/StepView.js
var StepView_exports = {};
__export(StepView_exports, {
  AddBreakpointEvent: () => AddBreakpointEvent,
  AddStep: () => AddStep,
  CaptureSelectorsEvent: () => CaptureSelectorsEvent,
  CopyStepEvent: () => CopyStepEvent,
  RemoveBreakpointEvent: () => RemoveBreakpointEvent,
  RemoveStep: () => RemoveStep,
  StepChanged: () => StepChanged,
  StepView: () => StepView,
  StopSelectorsCaptureEvent: () => StopSelectorsCaptureEvent
});
import "./../../../ui/kit/kit.js";

// gen/front_end/panels/recorder/components/TimelineSection.js
var TimelineSection_exports = {};
__export(TimelineSection_exports, {
  TimelineSection: () => TimelineSection
});
import * as Lit9 from "./../../../ui/lit/lit.js";

// gen/front_end/panels/recorder/components/timelineSection.css.js
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
  padding: 16px 0 0 40px;
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

.is-start-of-group {
  padding-top: 28px;
}

.is-end-of-group {
  padding-bottom: 24px;
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
  height: calc(100% + 8px);
  z-index: 1; /* We want this to be below of \\'.overlay\\' for stopped case */
}

.bar .background {
  fill: var(--sys-color-state-hover-on-subtle);
}

.bar .line {
  fill: var(--sys-color-primary);
}

.is-first-section .bar {
  top: 32px;
  height: calc(100% - 8px);
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

// gen/front_end/panels/recorder/components/TimelineSection.js
var { html: html9 } = Lit9;
var TimelineSection = class extends HTMLElement {
  #isEndOfGroup = false;
  #isStartOfGroup = false;
  #isFirstSection = false;
  #isLastSection = false;
  #isSelected = false;
  #shadowRoot = this.attachShadow({ mode: "open" });
  set data(data) {
    this.#isFirstSection = data.isFirstSection;
    this.#isLastSection = data.isLastSection;
    this.#isEndOfGroup = data.isEndOfGroup;
    this.#isStartOfGroup = data.isStartOfGroup;
    this.#isSelected = data.isSelected;
    this.#render();
  }
  connectedCallback() {
    this.#render();
  }
  #render() {
    const classes = {
      "timeline-section": true,
      "is-end-of-group": this.#isEndOfGroup,
      "is-start-of-group": this.#isStartOfGroup,
      "is-first-section": this.#isFirstSection,
      "is-last-section": this.#isLastSection,
      "is-selected": this.#isSelected
    };
    Lit9.render(html9`
      <style>${timelineSection_css_default}</style>
      <div class=${Lit9.Directives.classMap(classes)}>
        <div class="overlay"></div>
        <div class="icon"><slot name="icon"></slot></div>
        <svg width="24" height="100%" class="bar">
          <rect class="line" x="7" y="0" width="2" height="100%" />
        </svg>
        <slot></slot>
      </div>
    `, this.#shadowRoot, { host: this });
  }
};
customElements.define("devtools-timeline-section", TimelineSection);

// gen/front_end/panels/recorder/components/StepView.js
import * as i18n13 from "./../../../core/i18n/i18n.js";
import * as Platform4 from "./../../../core/platform/platform.js";
import * as Menus from "./../../../ui/components/menus/menus.js";
import * as UI5 from "./../../../ui/legacy/legacy.js";
import * as Lit10 from "./../../../ui/lit/lit.js";
import * as VisualLogging8 from "./../../../ui/visual_logging/visual_logging.js";
import * as Models6 from "./../models/models.js";

// gen/front_end/panels/recorder/components/stepView.css.js
var stepView_css_default = `/*
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

  .title-container {
    /* Vertically center items with min-width: 0; */
    min-width: 0;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.03em;
    display: flex;
    flex-direction: row;
    gap: 3px;
    outline-offset: 3px;
  }

  .action {
    display: flex;
    align-items: flex-start;
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

  .is-start-of-group .circle-icon {
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
    top: 18px;
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
    background-color: color-mix(in srgb, var(--sys-color-tonal-container), var(--sys-color-cdt-base-container) 50%);
    border: 1px solid var(--sys-color-tonal-outline);
  }

  .summary {
    display: flex;
    flex-flow: row nowrap;
  }

  .filler {
    flex-grow: 1;
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
}

/*# sourceURL=${import.meta.resolve("./stepView.css")} */`;

// gen/front_end/panels/recorder/components/StepView.js
var { html: html10 } = Lit10;
var UIStrings7 = {
  /**
   * @description Title for the step type that configures the viewport
   */
  setViewportClickTitle: "Set viewport",
  /**
   * @description Title for the customStep step type
   */
  customStepTitle: "Custom step",
  /**
   * @description Title for the click step type
   */
  clickStepTitle: "Click",
  /**
   * @description Title for the double click step type
   */
  doubleClickStepTitle: "Double click",
  /**
   * @description Title for the hover step type
   */
  hoverStepTitle: "Hover",
  /**
   * @description Title for the emulateNetworkConditions step type
   */
  emulateNetworkConditionsStepTitle: "Emulate network conditions",
  /**
   * @description Title for the change step type
   */
  changeStepTitle: "Change",
  /**
   * @description Title for the close step type
   */
  closeStepTitle: "Close",
  /**
   * @description Title for the scroll step type
   */
  scrollStepTitle: "Scroll",
  /**
   * @description Title for the key up step type. `up` refers to the state of the keyboard key: it's released, i.e., up. It does not refer to the down arrow key specifically.
   */
  keyUpStepTitle: "Key up",
  /**
   * @description Title for the navigate step type
   */
  navigateStepTitle: "Navigate",
  /**
   * @description Title for the key down step type. `down` refers to the state of the keyboard key: it's pressed, i.e., down. It does not refer to the down arrow key specifically.
   */
  keyDownStepTitle: "Key down",
  /**
   * @description Title for the waitForElement step type
   */
  waitForElementStepTitle: "Wait for element",
  /**
   * @description Title for the waitForExpression step type
   */
  waitForExpressionStepTitle: "Wait for expression",
  /**
   * @description Title for elements with role button
   */
  elementRoleButton: "Button",
  /**
   * @description Title for elements with role input
   */
  elementRoleInput: "Input",
  /**
   * @description Default title for elements without a specific role
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
   * @description The title of the button that open the step's context menu.
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
   * @description A menu item item in the context menu that expands another menu which list all
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
var str_7 = i18n13.i18n.registerUIStrings("panels/recorder/components/StepView.ts", UIStrings7);
var i18nString7 = i18n13.i18n.getLocalizedString.bind(void 0, str_7);
var CaptureSelectorsEvent = class _CaptureSelectorsEvent extends Event {
  static eventName = "captureselectors";
  data;
  constructor(step) {
    super(_CaptureSelectorsEvent.eventName, { bubbles: true, composed: true });
    this.data = step;
  }
};
var StopSelectorsCaptureEvent = class _StopSelectorsCaptureEvent extends Event {
  static eventName = "stopselectorscapture";
  constructor() {
    super(_StopSelectorsCaptureEvent.eventName, {
      bubbles: true,
      composed: true
    });
  }
};
var CopyStepEvent = class _CopyStepEvent extends Event {
  static eventName = "copystep";
  step;
  constructor(step) {
    super(_CopyStepEvent.eventName, { bubbles: true, composed: true });
    this.step = step;
  }
};
var StepChanged = class _StepChanged extends Event {
  static eventName = "stepchanged";
  currentStep;
  newStep;
  constructor(currentStep, newStep) {
    super(_StepChanged.eventName, { bubbles: true, composed: true });
    this.currentStep = currentStep;
    this.newStep = newStep;
  }
};
var AddStep = class _AddStep extends Event {
  static eventName = "addstep";
  position;
  stepOrSection;
  constructor(stepOrSection, position) {
    super(_AddStep.eventName, { bubbles: true, composed: true });
    this.stepOrSection = stepOrSection;
    this.position = position;
  }
};
var RemoveStep = class _RemoveStep extends Event {
  static eventName = "removestep";
  step;
  constructor(step) {
    super(_RemoveStep.eventName, { bubbles: true, composed: true });
    this.step = step;
  }
};
var AddBreakpointEvent = class _AddBreakpointEvent extends Event {
  static eventName = "addbreakpoint";
  index;
  constructor(index) {
    super(_AddBreakpointEvent.eventName, { bubbles: true, composed: true });
    this.index = index;
  }
};
var RemoveBreakpointEvent = class _RemoveBreakpointEvent extends Event {
  static eventName = "removebreakpoint";
  index;
  constructor(index) {
    super(_RemoveBreakpointEvent.eventName, { bubbles: true, composed: true });
    this.index = index;
  }
};
var COPY_ACTION_PREFIX = "copy-step-as-";
function getStepTypeTitle(input) {
  if (input.section) {
    return input.section.title ? input.section.title : html10`<span class="fallback">(No Title)</span>`;
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
  return html10`
    <devtools-menu-button
      class="step-actions"
      title=${i18nString7(UIStrings7.openStepActions)}
      aria-label=${i18nString7(UIStrings7.openStepActions)}
      .populateMenuCall=${input.populateStepContextMenu}
      @keydown=${(event) => {
    event.stopPropagation();
  }}
      jslog=${VisualLogging8.dropDown("step-actions").track({ click: true })}
      .iconName=${"dots-vertical"}
      }
    ></devtools-menu-button>
  `;
}
function viewFunction(input, _output, target) {
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
  const subtitle = input.step ? getSelectorPreview(input.step) : getSectionPreview();
  Lit10.render(html10`
    <style>${stepView_css_default}</style>
    <devtools-timeline-section .data=${{
    isFirstSection: input.isFirstSection,
    isLastSection: input.isLastSection,
    isStartOfGroup: input.isStartOfGroup,
    isEndOfGroup: input.isEndOfGroup,
    isSelected: input.isSelected
  }} @contextmenu=${(e) => {
    const menu = new UI5.ContextMenu.ContextMenu(e);
    input.populateStepContextMenu(menu);
    void menu.show();
  }}
      data-step-index=${input.stepIndex} data-section-index=${input.sectionIndex} class=${Lit10.Directives.classMap(stepClasses)}>
      <svg slot="icon" width="24" height="24" class="icon">
        <circle class="circle-icon"/>
        <g class="error-icon">
          <path d="M1.5 1.5L6.5 6.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1.5 6.5L6.5 1.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <path @click=${input.onBreakpointClick} jslog=${VisualLogging8.action("breakpoint").track({ click: true })} class="breakpoint-icon" d="M2.5 5.5H17.7098L21.4241 12L17.7098 18.5H2.5V5.5Z"/>
      </svg>
      <div class="summary">
        <div class="title-container ${isExpandable ? "action" : ""}"
          @click=${isExpandable && input.toggleShowDetails}
          @keydown=${isExpandable && input.onToggleShowDetailsKeydown}
          tabindex="0"
          jslog=${VisualLogging8.sectionHeader().track({ click: true })}
          aria-role=${isExpandable ? "button" : ""}
          aria-label=${isExpandable ? "Show details for step" : ""}
        >
          ${isExpandable ? html10`<devtools-icon
                  class="chevron"
                  jslog=${VisualLogging8.expand().track({ click: true })}
                  name="triangle-down">
                </devtools-icon>` : ""}
          <div class="title">
            <div class="main-title" title=${mainTitle}>${mainTitle}</div>
            <div class="subtitle" title=${subtitle}>${subtitle}</div>
          </div>
        </div>
        <div class="filler"></div>
        ${renderStepActions(input)}
      </div>
      <div class="details">
        ${input.step && html10`<devtools-recorder-step-editor
          class=${input.isSelected ? "is-selected" : ""}
          .step=${input.step}
          .disabled=${input.isPlaying}
          @stepedited=${input.stepEdited}>
        </devtools-recorder-step-editor>`}
        ${input.section?.causingStep && html10`<devtools-recorder-step-editor
          .step=${input.section.causingStep}
          .isTypeEditable=${false}
          .disabled=${input.isPlaying}
          @stepedited=${input.stepEdited}>
        </devtools-recorder-step-editor>`}
      </div>
      ${input.error && html10`
        <div class="error" role="alert">
          ${input.error.message}
        </div>
      `}
    </devtools-timeline-section>
  `, target);
}
var StepView = class extends HTMLElement {
  #shadow = this.attachShadow({ mode: "open" });
  #observer = new IntersectionObserver((result) => {
    this.#viewInput.isVisible = result[0].isIntersecting;
  });
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
    recorderSettings: void 0,
    actions: [],
    stepEdited: this.#stepEdited.bind(this),
    onBreakpointClick: this.#onBreakpointClick.bind(this),
    handleStepAction: this.#handleStepAction.bind(this),
    toggleShowDetails: this.#toggleShowDetails.bind(this),
    onToggleShowDetailsKeydown: this.#onToggleShowDetailsKeydown.bind(this),
    populateStepContextMenu: this.#populateStepContextMenu.bind(this)
  };
  #view = viewFunction;
  constructor(view) {
    super();
    if (view) {
      this.#view = view;
    }
    this.setAttribute("jslog", `${VisualLogging8.section("step-view")}`);
  }
  set data(data) {
    const prevState = this.#viewInput.state;
    this.#viewInput.step = data.step;
    this.#viewInput.section = data.section;
    this.#viewInput.state = data.state;
    this.#viewInput.error = data.error;
    this.#viewInput.isEndOfGroup = data.isEndOfGroup;
    this.#viewInput.isStartOfGroup = data.isStartOfGroup;
    this.#viewInput.stepIndex = data.stepIndex;
    this.#viewInput.sectionIndex = data.sectionIndex;
    this.#viewInput.isFirstSection = data.isFirstSection;
    this.#viewInput.isLastSection = data.isLastSection;
    this.#viewInput.isRecording = data.isRecording;
    this.#viewInput.isPlaying = data.isPlaying;
    this.#viewInput.hasBreakpoint = data.hasBreakpoint;
    this.#viewInput.removable = data.removable;
    this.#viewInput.builtInConverters = data.builtInConverters;
    this.#viewInput.extensionConverters = data.extensionConverters;
    this.#viewInput.isSelected = data.isSelected;
    this.#viewInput.recorderSettings = data.recorderSettings;
    this.#viewInput.actions = this.#getActions();
    this.#render();
    if (this.#viewInput.state !== prevState && this.#viewInput.state === "current" && !this.#viewInput.isVisible) {
      this.scrollIntoView();
    }
  }
  get step() {
    return this.#viewInput.step;
  }
  get section() {
    return this.#viewInput.section;
  }
  connectedCallback() {
    this.#observer.observe(this);
    this.#render();
  }
  disconnectedCallback() {
    this.#observer.unobserve(this);
  }
  #toggleShowDetails() {
    this.#viewInput.showDetails = !this.#viewInput.showDetails;
    this.#render();
  }
  #onToggleShowDetailsKeydown(event) {
    const keyboardEvent = event;
    if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
      this.#toggleShowDetails();
      event.stopPropagation();
      event.preventDefault();
    }
  }
  #stepEdited(event) {
    const step = this.#viewInput.step || this.#viewInput.section?.causingStep;
    if (!step) {
      throw new Error("Expected step.");
    }
    this.dispatchEvent(new StepChanged(step, event.data));
  }
  #handleStepAction(event) {
    switch (event.itemValue) {
      case "add-step-before": {
        const stepOrSection = this.#viewInput.step || this.#viewInput.section;
        if (!stepOrSection) {
          throw new Error("Expected step or section.");
        }
        this.dispatchEvent(new AddStep(
          stepOrSection,
          "before"
          /* AddStepPosition.BEFORE */
        ));
        break;
      }
      case "add-step-after": {
        const stepOrSection = this.#viewInput.step || this.#viewInput.section;
        if (!stepOrSection) {
          throw new Error("Expected step or section.");
        }
        this.dispatchEvent(new AddStep(
          stepOrSection,
          "after"
          /* AddStepPosition.AFTER */
        ));
        break;
      }
      case "remove-step": {
        const causingStep = this.#viewInput.section?.causingStep;
        if (!this.#viewInput.step && !causingStep) {
          throw new Error("Expected step.");
        }
        this.dispatchEvent(new RemoveStep(this.#viewInput.step || causingStep));
        break;
      }
      case "add-breakpoint": {
        if (!this.#viewInput.step) {
          throw new Error("Expected step");
        }
        this.dispatchEvent(new AddBreakpointEvent(this.#viewInput.stepIndex));
        break;
      }
      case "remove-breakpoint": {
        if (!this.#viewInput.step) {
          throw new Error("Expected step");
        }
        this.dispatchEvent(new RemoveBreakpointEvent(this.#viewInput.stepIndex));
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
        this.dispatchEvent(new CopyStepEvent(structuredClone(copyStep)));
      }
    }
  }
  #onBreakpointClick() {
    if (this.#viewInput.hasBreakpoint) {
      this.dispatchEvent(new RemoveBreakpointEvent(this.#viewInput.stepIndex));
    } else {
      this.dispatchEvent(new AddBreakpointEvent(this.#viewInput.stepIndex));
    }
    this.#render();
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
    const copyActions = actions.filter((item4) => item4.id.startsWith(COPY_ACTION_PREFIX));
    const otherActions = actions.filter((item4) => !item4.id.startsWith(COPY_ACTION_PREFIX));
    for (const item4 of otherActions) {
      const section5 = contextMenu.section(item4.group);
      section5.appendItem(item4.label, () => {
        this.#handleStepAction(new Menus.Menu.MenuItemSelectedEvent(item4.id));
      }, { jslogContext: item4.id });
    }
    const preferredCopyAction = copyActions.find((item4) => item4.id === COPY_ACTION_PREFIX + this.#viewInput.recorderSettings?.preferredCopyFormat);
    if (preferredCopyAction) {
      contextMenu.section("copy").appendItem(preferredCopyAction.label, () => {
        this.#handleStepAction(new Menus.Menu.MenuItemSelectedEvent(preferredCopyAction.id));
      }, { jslogContext: preferredCopyAction.id });
    }
    if (copyActions.length) {
      const copyAs = contextMenu.section("copy").appendSubMenuItem(i18nString7(UIStrings7.copyAs), false, "copy");
      for (const item4 of copyActions) {
        if (item4 === preferredCopyAction) {
          continue;
        }
        copyAs.section(item4.group).appendItem(item4.label, () => {
          this.#handleStepAction(new Menus.Menu.MenuItemSelectedEvent(item4.id));
        }, { jslogContext: item4.id });
      }
    }
  }
  #render() {
    const output = {};
    this.#view(this.#viewInput, output, this.#shadow);
  }
};
customElements.define("devtools-step-view", StepView);
export {
  ControlButton_exports as ControlButton,
  CreateRecordingView_exports as CreateRecordingView,
  RecordingListView_exports as RecordingListView,
  RecordingView_exports as RecordingView,
  ReplaySection_exports as ReplaySection,
  SelectButton_exports as SelectButton,
  StepEditor_exports as StepEditor,
  StepView_exports as StepView,
  TimelineSection_exports as TimelineSection
};
//# sourceMappingURL=components.js.map
