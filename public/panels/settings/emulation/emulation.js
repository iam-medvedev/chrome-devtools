var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../../front_end/panels/settings/emulation/DevicesSettingsTab.ts
var DevicesSettingsTab_exports = {};
__export(DevicesSettingsTab_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW,
  DevicesSettingsTab: () => DevicesSettingsTab
});
import "../../../ui/components/lists/lists.js";
import "../../../ui/kit/kit.js";
import * as i18n from "../../../core/i18n/i18n.js";
import * as Platform from "../../../core/platform/platform.js";
import * as Root from "../../../core/root/root.js";
import * as EmulationModel from "../../../models/emulation/emulation.js";
import * as Buttons from "../../../ui/components/buttons/buttons.js";
import * as Input from "../../../ui/components/input/input.js";
import * as UI from "../../../ui/legacy/legacy.js";
import { Directives, html, nothing, render } from "../../../ui/lit/lit.js";
import * as VisualLogging from "../../../ui/visual_logging/visual_logging.js";
import * as EmulationComponents from "./components/components.js";

// gen/front_end/panels/settings/emulation/devicesSettingsTab.css.js
var devicesSettingsTab_css_default = `/*
 * Copyright 2015 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.device-card-content {
  padding-left: 0;
  padding-right: 0;
}

.device-group-container {
  margin-bottom: var(--sys-size-5);
}

.device-group-title {
  font-weight: 600;
  color: var(--sys-color-on-surface-subtle);
  font-size: var(--sys-typescale-body5-size);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: var(--sys-size-6) 0 var(--sys-size-3);
}

.list {
  &:has(div) {
    border: none;
  }
}

#custom-device-add-button {
  padding: var(--sys-size-5) var(--sys-size-6);
}

.devices-settings-tab .devices-button-row {
  flex: none;
  display: flex;

  devtools-button {
    margin: var(--sys-size-3) 0 0 5px;
  }
}

.devices-settings-tab .devices-list {
  width: min(350px, 100%);
  margin-top: 10px;
}

.devices-list-item {
  padding: var(--sys-size-3) var(--sys-size-6);
  height: var(--sys-size-13);
  display: flex;
  align-items: center;
  flex: auto 1 1;
  overflow: hidden;
  color: var(--sys-color-on-surface);
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.devices-list-checkbox {
  height: var(--sys-size-6);
  width: var(--sys-size-6);
  margin: var(--sys-size-2) 5px var(--sys-size-2) var(--sys-size-2);
  flex: none;
  pointer-events: none;
}

.device-name {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.devices-edit-fields {
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-left: var(--sys-size-3);
  margin-bottom: 5px;
}

.devices-edit-safe-area-group {
  display: flex;
  flex-direction: column;
}

.devices-edit-fields b {
  margin-top: var(--sys-size-5);
  margin-bottom: 0;
}

.devices-edit-client-hints-heading {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
}
/* Don't want the bottom margin in the specific case of the folding one;
 * it messes with alignment with the arrow (which is a ::before) and  it's
 * spaced reasonably without it anyway
 */
li .devices-edit-client-hints-heading {
  margin-bottom: 0;
}

.devices-edit-client-hints-heading b {
  margin-inline-end: var(--sys-size-2);
}

.devices-edit-client-hints-heading .help-icon {
  margin-left: var(--sys-size-2);
  margin-right: var(--sys-size-2);
  vertical-align: middle;
}

.devices-edit-client-hints-heading a:focus {
  box-shadow: var(--sys-color-state-focus-ring);
}

.devices-edit-fields input {
  flex: auto;
  margin: var(--sys-size-5) 5px 0;
}

li.devices-edit-client-hints-field {
  /* Cancel out padding from treeview's .tree-outline ol */
  left: calc(-1 * var(--sys-size-6));
}

.devices-edit-client-hints-field input {
  flex: auto;
  margin: var(--sys-size-5) 5px 0;
}

.devices-edit-fields .device-edit-fixed {
  flex: 0 0 140px;
}

.devices-edit-fields select {
  margin: var(--sys-size-5) 5px 0;
}

.editor-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: none;
  background: var(--sys-color-surface3);
  overflow: hidden;
}

.editor-container[hidden] {
  display: none;
}

.editor-content {
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.editor-content input.error-input {
  background-color: var(--sys-color-cdt-base-container);
}

.editor-buttons {
  flex: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
  gap: var(--sys-size-6);
}

.list-widget-input-validation-error {
  color: var(--sys-color-error);
  margin: 0 5px;
}

/*# sourceURL=${import.meta.resolve("./devicesSettingsTab.css")} */`;

// ../../front_end/panels/settings/emulation/DevicesSettingsTab.ts
var { classMap, ifDefined, live, ref } = Directives;
var { widget } = UI.Widget;
var UIStrings = {
  /**
   * @description Title for a section of the UI that shows all of the custom devices the user can emulate, in the device toolbar.
   */
  customDevices: "Custom devices",
  /**
   * @description Title for a section of the UI that shows all of the default devices the user can emulate, in the device toolbar.
   */
  defaultDevices: "Default devices",
  /**
   * @description Button to add a custom device (e.g., phone, tablet) to the device toolbar.
   */
  addCustomDevice: "Add custom device",
  /**
   * @description Label/title for UI to add a new custom device type. Device means mobile/tablet, etc.
   */
  device: "Device",
  /**
   * @description Placeholder for text input for the name of a custom device.
   */
  deviceName: "Device name",
  /**
   * @description Placeholder text for text input for the width of a custom device in pixels.
   */
  width: "Width",
  /**
   * @description Placeholder text for text input for the height of a custom device in pixels.
   */
  height: "Height",
  /**
   * @description Placeholder text for text input for the height/width ratio of a custom device in pixels.
   */
  devicePixelRatio: "Device pixel ratio",
  /**
   * @description Label in the Devices settings tab for the user agent string input of a custom device.
   */
  userAgentString: "User agent string",
  /**
   * @description Tooltip text for a drop-down in the Devices settings tab for the user agent type input of a custom device.
   * 'Type' refers to different options, such as mobile or desktop.
   */
  userAgentType: "User agent type",
  /**
   * @description Error message in the Devices settings tab that declares the maximum length of the device name input.
   * @example {50} PH1
   */
  deviceNameMustBeLessThanS: "Device name must be less than {PH1} characters",
  /**
   * @description Error message in the Devices settings tab that declares that the device name input must not be empty.
   */
  deviceNameCannotBeEmpty: "Device name can\u2019t be empty",
  /**
   * @description Success message for screen readers when device is added.
   * @example {TestDevice} PH1
   */
  deviceAddedOrUpdated: "Device {PH1} successfully added/updated",
  /**
   * @description Error message in the Devices settings tab shown when the user agent string is empty.
   */
  userAgentStringCannotBeEmpty: "User agent string can\u2019t be empty",
  /**
   * @description Label for portrait safe-area values on a custom device.
   */
  portraitSafeArea: "Portrait safe area",
  /**
   * @description Label for landscape safe-area values on a custom device.
   */
  landscapeSafeArea: "Landscape safe area",
  /**
   * @description Placeholder text for a custom device safe-area left inset field.
   */
  safeAreaLeft: "Left inset",
  /**
   * @description Placeholder text for a custom device safe-area top inset field.
   */
  safeAreaTop: "Top inset",
  /**
   * @description Placeholder text for a custom device safe-area right inset field.
   */
  safeAreaRight: "Right inset",
  /**
   * @description Placeholder text for a custom device safe-area bottom inset field.
   */
  safeAreaBottom: "Bottom inset",
  /**
   * @description Error message shown when a custom device safe-area value is invalid.
   * @example {Portrait safe area} PH1
   * @example {Top inset} PH2
   * @example {9999} PH3
   */
  safeAreaValueMustBeInRange: "{PH1}: {PH2} must be an integer from 0 to {PH3}",
  /**
   * @description Error message shown when custom device safe-area left and right insets are too large.
   * @example {Portrait safe area} PH1
   */
  safeAreaHorizontalInsetsExceedWidth: "{PH1}: Left and right insets mustn\u2019t exceed the device width",
  /**
   * @description Error message shown when custom device safe-area top and bottom insets are too large.
   * @example {Landscape safe area} PH1
   */
  safeAreaVerticalInsetsExceedHeight: "{PH1}: Top and bottom insets mustn\u2019t exceed the device height",
  /**
   * @description Label for display cutout values on a custom device.
   */
  displayCutout: "Display cutout",
  /**
   * @description Option shown when a custom device has no display cutout.
   */
  noDisplayCutout: "No cutout",
  /**
   * @description Option shown for pill-shaped display cutouts such as Dynamic Island.
   */
  pillDisplayCutout: "Pill",
  /**
   * @description Option shown for classic notch display cutouts.
   */
  notchDisplayCutout: "Notch",
  /**
   * @description Option shown for circular display cutouts such as hole-punch cameras.
   */
  circleDisplayCutout: "Circle",
  /**
   * @description Option shown for rectangular display cutouts.
   */
  rectangleDisplayCutout: "Rectangle",
  /**
   * @description Placeholder text for a custom device display cutout x coordinate field.
   */
  cutoutX: "Cutout x",
  /**
   * @description Placeholder text for a custom device display cutout y coordinate field.
   */
  cutoutY: "Cutout y",
  /**
   * @description Placeholder text for a custom device display cutout width field.
   */
  cutoutWidth: "Cutout width",
  /**
   * @description Placeholder text for a custom device display cutout height field.
   */
  cutoutHeight: "Cutout height",
  /**
   * @description Placeholder text for a custom device pill-shaped display cutout radius field.
   */
  cutoutBorderRadius: "Pill radius",
  /**
   * @description Placeholder text for a custom device notch upper radius field.
   */
  cutoutUpperRadius: "Upper radius",
  /**
   * @description Placeholder text for a custom device notch lower radius field.
   */
  cutoutLowerRadius: "Lower radius",
  /**
   * @description Placeholder text for a custom device circular display cutout center x coordinate field.
   */
  cutoutCenterX: "Center x",
  /**
   * @description Placeholder text for a custom device circular display cutout center y coordinate field.
   */
  cutoutCenterY: "Center y",
  /**
   * @description Placeholder text for a custom device circular display cutout radius field.
   */
  cutoutRadius: "Radius",
  /**
   * @description Error message shown when a custom display cutout field is required.
   * @example {Cutout width} PH1
   */
  cutoutFieldRequired: "{PH1} is required when display cutout is enabled",
  /**
   * @description Error message shown when a custom display cutout field is outside its supported integer range.
   * @example {Cutout x} PH1
   * @example {9999} PH2
   */
  cutoutValueMustBeInRange: "{PH1} must be an integer from 0 to {PH2}",
  /**
   * @description Error message shown when a custom display cutout field must be positive.
   * @example {Cutout width} PH1
   */
  cutoutValueMustBePositiveInteger: "{PH1} must be a positive integer",
  /**
   * @description Error message shown when a custom display cutout's x coordinate plus its width exceeds the device width.
   */
  cutoutXAndWidthExceedDeviceWidth: "Cutout x plus width mustn\u2019t exceed the device width",
  /**
   * @description Error message shown when a custom display cutout's y coordinate plus its height exceeds the device height.
   */
  cutoutYAndHeightExceedDeviceHeight: "Cutout y plus height mustn\u2019t exceed the device height",
  /**
   * @description Error message shown when a circular display cutout is outside its cutout bounds.
   */
  circleMustFitCutoutBounds: "Circle must fit within the cutout bounds",
  /**
   * @description Button text to cancel editing a custom device in the Devices settings tab.
   */
  cancel: "Cancel",
  /**
   * @description Button text to save changes when editing a custom device in the Devices settings tab.
   */
  save: "Save",
  /**
   * @description Button text to add a new custom device in the Devices settings tab.
   */
  add: "Add"
};
var str_ = i18n.i18n.registerUIStrings("panels/settings/emulation/DevicesSettingsTab.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
function parseOptionalNonNegativeInteger(value) {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return 0;
  }
  if (!/^\d+$/.test(trimmedValue)) {
    return null;
  }
  const parsedValue = Number(trimmedValue);
  if (!Number.isSafeInteger(parsedValue) || parsedValue < 0 || parsedValue > EmulationModel.DeviceModeModel.MaxDeviceSize) {
    return null;
  }
  return parsedValue;
}
var NO_CUSTOM_CUTOUT = "none";
var EMPTY_EDITOR_VALUES = {
  title: "",
  width: "",
  height: "",
  scale: "",
  "user-agent": "",
  "ua-type": EmulationModel.DeviceModeModel.UA.MOBILE,
  "safe-area-left": "",
  "safe-area-top": "",
  "safe-area-right": "",
  "safe-area-bottom": "",
  "landscape-safe-area-left": "",
  "landscape-safe-area-top": "",
  "landscape-safe-area-right": "",
  "landscape-safe-area-bottom": "",
  "cutout-shape": NO_CUSTOM_CUTOUT,
  "cutout-x": "",
  "cutout-y": "",
  "cutout-width": "",
  "cutout-height": "",
  "cutout-border-radius": "",
  "cutout-upper-radius": "",
  "cutout-lower-radius": "",
  "cutout-cx": "",
  "cutout-cy": "",
  "cutout-radius": ""
};
function renderDeviceItem(input) {
  return html`
    <label class="devices-list-item" tabindex="-1">
      <input
        class="devices-list-checkbox"
        type="checkbox"
        .checked=${live(input.checked)}
        jslog=${VisualLogging.toggle().track({ click: true })}
        @click=${(event) => {
    const checkbox = event.currentTarget;
    input.onToggle(checkbox.checked);
    event.consume();
  }}
      />
      <span class="device-name">${input.title}</span>
    </label>
  `;
}
function renderEditorInput(editorState, onEditorInput, output, name, placeholder, options) {
  const isInvalid = editorState.showValidationErrors && editorState.invalidFields.has(name);
  return html`
    <input
      id=${ifDefined(options?.id)}
      name=${name}
      class=${classMap({
    "harmony-input": true,
    "device-edit-fixed": Boolean(options?.fixedWidth),
    "error-input": isInvalid
  })}
      type="text"
      placeholder=${placeholder}
      aria-label=${placeholder}
      aria-invalid=${ifDefined(isInvalid ? "true" : void 0)}
      ?hidden=${Boolean(options?.hidden)}
      .value=${editorState.values[name]}
      jslog=${VisualLogging.textField().track({ change: true, keydown: "Enter" }).context(name)}
      @input=${(e) => onEditorInput(name, e.target.value)}
      ${options?.id === "custom-device-name-field" ? ref((el) => {
    if (el instanceof HTMLInputElement) {
      output.focusDeviceNameField = () => el.focus();
    } else {
      output.focusDeviceNameField = void 0;
    }
  }) : nothing}
    />
  `;
}
function renderSafeAreaGroup(editorState, onEditorInput, output, headingId, title, prefix) {
  return html`
    <div class="devices-edit-safe-area-group" role="group" aria-labelledby=${headingId}>
      <b id=${headingId}>${title}</b>
      <div class="hbox">
        ${renderEditorInput(editorState, onEditorInput, output, `${prefix}safe-area-left`, i18nString(UIStrings.safeAreaLeft))}
        ${renderEditorInput(editorState, onEditorInput, output, `${prefix}safe-area-top`, i18nString(UIStrings.safeAreaTop))}
        ${renderEditorInput(editorState, onEditorInput, output, `${prefix}safe-area-right`, i18nString(UIStrings.safeAreaRight))}
        ${renderEditorInput(editorState, onEditorInput, output, `${prefix}safe-area-bottom`, i18nString(UIStrings.safeAreaBottom))}
      </div>
    </div>
  `;
}
function renderCutoutFields(editorState, onEditorInput, output) {
  const headingId = "cutout-heading";
  const shape = editorState.values["cutout-shape"];
  const noCutout = shape === NO_CUSTOM_CUTOUT;
  const isPill = shape === EmulationModel.EmulatedDevices.CutoutShape.PILL;
  const isNotch = shape === EmulationModel.EmulatedDevices.CutoutShape.NOTCH;
  const isCircle = shape === EmulationModel.EmulatedDevices.CutoutShape.CIRCLE;
  const rectRowHidden = noCutout;
  const radiusRowHidden = noCutout || !(isPill || isNotch || isCircle);
  const shapeOptions = [
    { value: NO_CUSTOM_CUTOUT, label: i18nString(UIStrings.noDisplayCutout) },
    { value: EmulationModel.EmulatedDevices.CutoutShape.PILL, label: i18nString(UIStrings.pillDisplayCutout) },
    { value: EmulationModel.EmulatedDevices.CutoutShape.NOTCH, label: i18nString(UIStrings.notchDisplayCutout) },
    { value: EmulationModel.EmulatedDevices.CutoutShape.CIRCLE, label: i18nString(UIStrings.circleDisplayCutout) },
    { value: EmulationModel.EmulatedDevices.CutoutShape.RECTANGLE, label: i18nString(UIStrings.rectangleDisplayCutout) }
  ];
  return html`
    <div class="devices-edit-fields devices-edit-cutout-fields" role="group" aria-labelledby=${headingId}>
      <b id=${headingId}>${i18nString(UIStrings.displayCutout)}</b>
      <div class="hbox">
        <select
          name="cutout-shape"
          title=${i18nString(UIStrings.displayCutout)}
          aria-label=${i18nString(UIStrings.displayCutout)}
          .value=${shape}
          jslog=${VisualLogging.dropDown().track({ change: true }).context("cutout-shape")}
          @input=${(e) => onEditorInput("cutout-shape", e.target.value)}
          @change=${(e) => onEditorInput("cutout-shape", e.target.value)}>
          ${shapeOptions.map((option) => html`
            <option
              value=${option.value}
              .selected=${shape === option.value}
              jslog=${VisualLogging.item(Platform.StringUtilities.toKebabCase(option.value)).track({ click: true })}>
              ${option.label}
            </option>
          `)}
        </select>
      </div>
      <div class="hbox devices-edit-cutout-rect-row" ?hidden=${rectRowHidden}>
        ${renderEditorInput(editorState, onEditorInput, output, "cutout-x", i18nString(UIStrings.cutoutX))}
        ${renderEditorInput(editorState, onEditorInput, output, "cutout-y", i18nString(UIStrings.cutoutY))}
        ${renderEditorInput(editorState, onEditorInput, output, "cutout-width", i18nString(UIStrings.cutoutWidth))}
        ${renderEditorInput(editorState, onEditorInput, output, "cutout-height", i18nString(UIStrings.cutoutHeight))}
      </div>
      <div class="hbox devices-edit-cutout-radius-row" ?hidden=${radiusRowHidden}>
        ${renderEditorInput(editorState, onEditorInput, output, "cutout-border-radius", i18nString(UIStrings.cutoutBorderRadius), { hidden: !isPill })}
        ${renderEditorInput(editorState, onEditorInput, output, "cutout-upper-radius", i18nString(UIStrings.cutoutUpperRadius), { hidden: !isNotch })}
        ${renderEditorInput(editorState, onEditorInput, output, "cutout-lower-radius", i18nString(UIStrings.cutoutLowerRadius), { hidden: !isNotch })}
        ${renderEditorInput(editorState, onEditorInput, output, "cutout-cx", i18nString(UIStrings.cutoutCenterX), { hidden: !isCircle })}
        ${renderEditorInput(editorState, onEditorInput, output, "cutout-cy", i18nString(UIStrings.cutoutCenterY), { hidden: !isCircle })}
        ${renderEditorInput(editorState, onEditorInput, output, "cutout-radius", i18nString(UIStrings.cutoutRadius), { hidden: !isCircle })}
      </div>
    </div>
  `;
}
var EMPTY_EDITOR_STATE = {
  index: 0,
  isNew: false,
  values: EMPTY_EDITOR_VALUES,
  showSafeAreaAndCutout: false,
  clientHintsValue: {},
  invalidFields: /* @__PURE__ */ new Set(),
  isClientHintsInvalid: false,
  errorMessages: [],
  hasErrors: false,
  showValidationErrors: false
};
function renderEditor(input, output) {
  const editorState = input.editorState ?? EMPTY_EDITOR_STATE;
  const uaTypeOptions = [
    EmulationModel.DeviceModeModel.UA.MOBILE,
    EmulationModel.DeviceModeModel.UA.MOBILE_NO_TOUCH,
    EmulationModel.DeviceModeModel.UA.DESKTOP,
    EmulationModel.DeviceModeModel.UA.DESKTOP_TOUCH
  ];
  const uaType = editorState.values["ua-type"];
  return html`
    <div
      class="editor-container"
      ?hidden=${!input.editorState}
      jslog=${VisualLogging.pane("editor").track({ resize: true })}
      @keydown=${(e) => {
    if (Platform.KeyboardUtilities.isEscKey(e)) {
      e.consume(true);
      input.onCancelEdit();
    }
  }}>
      <div
        class="editor-content"
        @keydown=${(e) => {
    if (e.key === "Enter" && !e.isComposing && !(e.target instanceof HTMLSelectElement)) {
      e.consume(true);
      if (!editorState.hasErrors) {
        input.onCommitEdit();
      }
    }
  }}>
        <div class="devices-edit-fields">
          <b>${i18nString(UIStrings.device)}</b>
          <div class="hbox">
            ${renderEditorInput(editorState, input.onEditorInput, output, "title", i18nString(UIStrings.deviceName), {
    id: "custom-device-name-field"
  })}
          </div>
          <div class="hbox">
            ${renderEditorInput(editorState, input.onEditorInput, output, "width", i18nString(UIStrings.width))}
            ${renderEditorInput(editorState, input.onEditorInput, output, "height", i18nString(UIStrings.height))}
            ${renderEditorInput(editorState, input.onEditorInput, output, "scale", i18nString(UIStrings.devicePixelRatio), {
    fixedWidth: true
  })}
          </div>
          ${editorState.showSafeAreaAndCutout ? html`
            ${renderSafeAreaGroup(editorState, input.onEditorInput, output, "portrait-safe-area-heading", i18nString(UIStrings.portraitSafeArea), "")}
            ${renderSafeAreaGroup(editorState, input.onEditorInput, output, "landscape-safe-area-heading", i18nString(UIStrings.landscapeSafeArea), "landscape-")}
          ` : nothing}
        </div>
        ${editorState.showSafeAreaAndCutout ? renderCutoutFields(editorState, input.onEditorInput, output) : nothing}
        <div class="devices-edit-fields">
          <b>${i18nString(UIStrings.userAgentString)}</b>
          <div class="hbox">
            ${renderEditorInput(editorState, input.onEditorInput, output, "user-agent", i18nString(UIStrings.userAgentString))}
            <select
              name="ua-type"
              class="device-edit-fixed"
              title=${i18nString(UIStrings.userAgentType)}
              aria-label=${i18nString(UIStrings.userAgentType)}
              .value=${uaType}
              jslog=${VisualLogging.dropDown().track({ change: true }).context("ua-type")}
              @input=${(e) => input.onEditorInput("ua-type", e.target.value)}
              @change=${(e) => input.onEditorInput("ua-type", e.target.value)}>
              ${uaTypeOptions.map((option) => html`
                <option
                  value=${option}
                  .selected=${uaType === option}
                  jslog=${VisualLogging.item(Platform.StringUtilities.toKebabCase(option)).track({ click: true })}>
                  ${option}
                </option>
              `)}
            </select>
          </div>
        </div>
        <devtools-widget
          class=${classMap({
    "error-input": editorState.showValidationErrors && editorState.isClientHintsInvalid
  })}
          aria-invalid=${ifDefined(editorState.showValidationErrors && editorState.isClientHintsInvalid ? "true" : void 0)}
          ${widget(EmulationComponents.UserAgentClientHintsForm.UserAgentClientHintsForm, {
    value: editorState.clientHintsValue
  })}
          @clienthintschange=${(e) => input.onClientHintsChange(e.detail)}>
        </devtools-widget>
      </div>
      <div class="editor-buttons">
        <devtools-button
          .variant=${Buttons.Button.Variant.OUTLINED}
          .jslogContext=${"cancel"}
          jslog=${VisualLogging.action("cancel").track({ click: true })}
          @click=${input.onCancelEdit}>
          ${i18nString(UIStrings.cancel)}
        </devtools-button>
        <devtools-button
          .variant=${Buttons.Button.Variant.PRIMARY}
          .jslogContext=${"commit"}
          .disabled=${editorState.hasErrors}
          @click=${() => {
    if (!editorState.hasErrors) {
      input.onCommitEdit();
    }
  }}>
          ${editorState.isNew ? i18nString(UIStrings.add) : i18nString(UIStrings.save)}
        </devtools-button>
      </div>
      <div class="list-widget-input-validation-error" role="alert" aria-live="polite">
        ${editorState.showValidationErrors && editorState.errorMessages.length > 0 ? html`<span>${editorState.errorMessages.map((msg, i) => html`${i > 0 ? html`<br>` : nothing}${msg}`)}</span>` : nothing}
      </div>
    </div>
  `;
}
var DEFAULT_VIEW = (input, output, target) => {
  const editingIndex = input.editorState?.index ?? null;
  const customBefore = editingIndex !== null ? input.customDevices.slice(0, editingIndex) : input.customDevices;
  const customAfter = editingIndex !== null ? input.customDevices.slice(editingIndex + 1) : [];
  render(html`
    <style>${Input.checkboxStyles}</style>
    <style>${devicesSettingsTab_css_default}</style>
    <div class="settings-card-container-wrapper">
      <div class="settings-card-container ignore-list-settings">
        <devtools-card heading=${i18nString(UIStrings.customDevices)}>
          <div class="device-card-content">
            <div
              class="device-success-message"
              aria-live="polite"
              aria-atomic="false"
              aria-label=${input.successMessage}
            ></div>
            <div>
              ${customBefore.length > 0 ? html`
                <devtools-list
                  class="devices-list"
                  .editable=${true}
                  .deletable=${true}
                  @edit=${(e) => input.onBeginEdit(e.detail.index)}
                  @delete=${(e) => input.onRemoveDevice(e.detail.index)}>
                  ${customBefore.map((device) => renderDeviceItem({
    title: device.title,
    checked: device.show(),
    onToggle: (checked) => input.onToggleDevice(device, true, checked)
  }))}
                </devtools-list>
              ` : nothing}
              ${renderEditor(input, output)}
              ${editingIndex !== null && customAfter.length > 0 ? html`
                <devtools-list
                  class="devices-list"
                  .editable=${true}
                  .deletable=${true}
                  @edit=${(e) => input.onBeginEdit(editingIndex + 1 + e.detail.index)}
                  @delete=${(e) => input.onRemoveDevice(editingIndex + 1 + e.detail.index)}>
                  ${customAfter.map((device) => renderDeviceItem({
    title: device.title,
    checked: device.show(),
    onToggle: (checked) => input.onToggleDevice(device, true, checked)
  }))}
                </devtools-list>
              ` : nothing}
            </div>
            <devtools-button
              id="custom-device-add-button"
              ?hidden=${Boolean(input.editorState)}
              .variant=${Buttons.Button.Variant.OUTLINED}
              .jslogContext=${"add-custom-device"}
              @click=${input.onAddCustomDevice}
              ${ref((el) => {
    if (el instanceof HTMLElement) {
      output.focusAddCustomButton = () => {
        el.scrollIntoViewIfNeeded();
        el.focus();
      };
    } else {
      output.focusAddCustomButton = void 0;
    }
  })}
            >${i18nString(UIStrings.addCustomDevice)}</devtools-button>
          </div>
        </devtools-card>
        <devtools-card heading=${i18nString(UIStrings.defaultDevices)}>
          ${input.defaultDeviceGroups.map((group) => html`
            <div class="device-group-container" ?hidden=${group.hidden}>
              <div class="device-group-title">${group.title}</div>
              <devtools-list class="devices-list device-card-content" .disableListItemFocus=${true}>
                ${group.devices.map((device) => renderDeviceItem({
    title: device.title,
    checked: device.show(),
    onToggle: (checked) => input.onToggleDevice(device, false, checked)
  }))}
              </devtools-list>
            </div>
          `)}
        </devtools-card>
      </div>
    </div>
  `, target, {
    container: {
      attributes: {
        jslog: `${VisualLogging.pane("devices")}`
      }
    }
  });
};
var FIELD_LABELS = {
  "safe-area-left": () => i18nString(UIStrings.safeAreaLeft),
  "safe-area-top": () => i18nString(UIStrings.safeAreaTop),
  "safe-area-right": () => i18nString(UIStrings.safeAreaRight),
  "safe-area-bottom": () => i18nString(UIStrings.safeAreaBottom),
  "landscape-safe-area-left": () => i18nString(UIStrings.safeAreaLeft),
  "landscape-safe-area-top": () => i18nString(UIStrings.safeAreaTop),
  "landscape-safe-area-right": () => i18nString(UIStrings.safeAreaRight),
  "landscape-safe-area-bottom": () => i18nString(UIStrings.safeAreaBottom),
  "cutout-x": () => i18nString(UIStrings.cutoutX),
  "cutout-y": () => i18nString(UIStrings.cutoutY),
  "cutout-width": () => i18nString(UIStrings.cutoutWidth),
  "cutout-height": () => i18nString(UIStrings.cutoutHeight),
  "cutout-border-radius": () => i18nString(UIStrings.cutoutBorderRadius),
  "cutout-upper-radius": () => i18nString(UIStrings.cutoutUpperRadius),
  "cutout-lower-radius": () => i18nString(UIStrings.cutoutLowerRadius),
  "cutout-cx": () => i18nString(UIStrings.cutoutCenterX),
  "cutout-cy": () => i18nString(UIStrings.cutoutCenterY),
  "cutout-radius": () => i18nString(UIStrings.cutoutRadius)
};
var DevicesSettingsTab = class extends UI.Widget.VBox {
  #view;
  #viewOutput = {};
  #successMessage = "";
  #customDevices = [];
  #defaultDeviceLists = /* @__PURE__ */ new Map();
  #muteUpdate = false;
  #emulatedDevicesList;
  #editingDevice = null;
  #editingIndex = null;
  #isNewDevice = false;
  #editorValues = { ...EMPTY_EDITOR_VALUES };
  #clientHintsValue = {};
  #clientHintsMetaData;
  #showValidationErrors = false;
  #onAddCustomDeviceBound = this.#addCustomDevice.bind(this);
  #onToggleDeviceBound = this.#onToggleDevice.bind(this);
  #onBeginEditBound = this.#onBeginEditByIndex.bind(this);
  #onRemoveDeviceBound = this.#onRemoveDevice.bind(this);
  #onEditorInputBound = this.#onEditorInput.bind(this);
  #onClientHintsChangeBound = this.#onClientHintsChange.bind(this);
  #onCommitEditBound = this.commitEdit.bind(this);
  #onCancelEditBound = this.#cancelEdit.bind(this);
  constructor(view = DEFAULT_VIEW) {
    super();
    this.#view = view;
    this.#emulatedDevicesList = EmulationModel.EmulatedDevices.EmulatedDevicesList.instance();
    for (const category of EmulationModel.EmulatedDevices.CATEGORY_ORDER) {
      this.#defaultDeviceLists.set(category, {
        title: EmulationModel.EmulatedDevices.getCategoryTitle(category),
        hidden: false,
        devices: []
      });
    }
    this.#devicesUpdated();
  }
  performUpdate() {
    let editorState = null;
    if (this.#editingDevice !== null && this.#editingIndex !== null) {
      const showSafeAreaAndCutout = Boolean(Root.Runtime.hostConfig.devToolsMobileSafeAreaEmulation?.enabled);
      const validation = this.#validateEditor(showSafeAreaAndCutout);
      editorState = {
        index: this.#editingIndex,
        isNew: this.#isNewDevice,
        values: this.#editorValues,
        showSafeAreaAndCutout,
        clientHintsValue: this.#clientHintsValue,
        invalidFields: validation.invalidFields,
        isClientHintsInvalid: validation.isClientHintsInvalid,
        errorMessages: validation.errorMessages,
        hasErrors: validation.hasErrors,
        showValidationErrors: this.#showValidationErrors
      };
    }
    const viewInput = {
      customDevices: this.#customDevices,
      defaultDeviceGroups: [...this.#defaultDeviceLists.values()],
      editorState,
      successMessage: this.#successMessage,
      onAddCustomDevice: this.#onAddCustomDeviceBound,
      onToggleDevice: this.#onToggleDeviceBound,
      onBeginEdit: this.#onBeginEditBound,
      onRemoveDevice: this.#onRemoveDeviceBound,
      onEditorInput: this.#onEditorInputBound,
      onClientHintsChange: this.#onClientHintsChangeBound,
      onCommitEdit: this.#onCommitEditBound,
      onCancelEdit: this.#onCancelEditBound
    };
    this.#view(viewInput, this.#viewOutput, this.contentElement);
  }
  wasShown() {
    super.wasShown();
    this.#emulatedDevicesList.addEventListener(
      EmulationModel.EmulatedDevices.Events.CUSTOM_DEVICES_UPDATED,
      this.#devicesUpdated,
      this
    );
    this.#emulatedDevicesList.addEventListener(
      EmulationModel.EmulatedDevices.Events.STANDARD_DEVICES_UPDATED,
      this.#devicesUpdated,
      this
    );
    this.#devicesUpdated();
  }
  willHide() {
    super.willHide();
    this.#emulatedDevicesList.removeEventListener(
      EmulationModel.EmulatedDevices.Events.CUSTOM_DEVICES_UPDATED,
      this.#devicesUpdated,
      this
    );
    this.#emulatedDevicesList.removeEventListener(
      EmulationModel.EmulatedDevices.Events.STANDARD_DEVICES_UPDATED,
      this.#devicesUpdated,
      this
    );
  }
  #devicesUpdated() {
    if (this.#muteUpdate) {
      return;
    }
    this.#customDevices = this.#emulatedDevicesList.custom().slice();
    this.#cancelEdit();
    for (const group of this.#defaultDeviceLists.values()) {
      group.devices = [];
    }
    const standardDevices = this.#emulatedDevicesList.standard().slice();
    standardDevices.sort(EmulationModel.EmulatedDevices.EmulatedDevice.deviceComparator);
    for (const device of standardDevices) {
      const cat = EmulationModel.EmulatedDevices.deviceCategory(device);
      const group = this.#defaultDeviceLists.get(cat);
      if (group) {
        group.devices.push(device);
      }
    }
    for (const group of this.#defaultDeviceLists.values()) {
      group.hidden = group.devices.length === 0;
    }
    this.performUpdate();
  }
  #muteAndSaveDeviceList(custom) {
    this.#muteUpdate = true;
    if (custom) {
      this.#emulatedDevicesList.saveCustomDevices();
    } else {
      this.#emulatedDevicesList.saveStandardDevices();
    }
    this.#muteUpdate = false;
  }
  #onToggleDevice(device, custom, show) {
    device.setShow(show);
    this.#muteAndSaveDeviceList(custom);
    this.performUpdate();
  }
  #addCustomDevice() {
    const device = new EmulationModel.EmulatedDevices.EmulatedDevice();
    device.deviceScaleFactor = 0;
    device.horizontal.width = 700;
    device.horizontal.height = 400;
    device.vertical.width = 400;
    device.vertical.height = 700;
    device.userAgent = navigator.userAgent;
    this.beginEdit(device, this.#customDevices.length, true);
  }
  #onBeginEditByIndex(index) {
    const device = this.#customDevices[index];
    if (device) {
      this.beginEdit(device, index, false);
    }
  }
  #onRemoveDevice(index) {
    const device = this.#customDevices[index];
    if (device) {
      this.#emulatedDevicesList.removeCustomDevice(device);
    }
  }
  #cancelEdit() {
    if (this.#editingDevice === null && this.#editingIndex === null) {
      return;
    }
    this.#editingDevice = null;
    this.#editingIndex = null;
    this.#isNewDevice = false;
    this.#editorValues = { ...EMPTY_EDITOR_VALUES };
    this.#clientHintsMetaData = void 0;
    this.#clientHintsValue = {};
    this.#showValidationErrors = false;
    this.performUpdate();
  }
  #onEditorInput(field, value) {
    if (this.#editorValues[field] === value && this.#showValidationErrors) {
      return;
    }
    this.#editorValues[field] = value;
    this.#showValidationErrors = true;
    this.performUpdate();
  }
  #onClientHintsChange(metaData) {
    this.#clientHintsMetaData = metaData;
    this.#showValidationErrors = true;
    this.performUpdate();
  }
  #toNumericInputValue(value) {
    return value ? String(value) : "";
  }
  #verticalMode(device) {
    return device.modes.find((mode) => mode.orientation === EmulationModel.EmulatedDevices.Vertical) || null;
  }
  #horizontalMode(device) {
    return device.modes.find((mode) => mode.orientation === EmulationModel.EmulatedDevices.Horizontal) || null;
  }
  #editorIntegerValue(controlName) {
    return parseOptionalNonNegativeInteger(this.#editorValues[controlName]) ?? 0;
  }
  beginEdit(device, index = 0, isNew = false) {
    this.#editingDevice = device;
    this.#editingIndex = index;
    this.#isNewDevice = isNew;
    this.#showValidationErrors = false;
    let uaType;
    if (device.mobile()) {
      uaType = device.touch() ? EmulationModel.DeviceModeModel.UA.MOBILE : EmulationModel.DeviceModeModel.UA.MOBILE_NO_TOUCH;
    } else {
      uaType = device.touch() ? EmulationModel.DeviceModeModel.UA.DESKTOP_TOUCH : EmulationModel.DeviceModeModel.UA.DESKTOP;
    }
    const safeAreaInsets = this.#verticalMode(device)?.safeAreaInsets;
    const landscapeSafeAreaInsets = this.#horizontalMode(device)?.safeAreaInsets;
    const cutout = this.#verticalMode(device)?.cutout;
    this.#editorValues = {
      title: device.title,
      width: this.#toNumericInputValue(device.vertical.width),
      height: this.#toNumericInputValue(device.vertical.height),
      scale: this.#toNumericInputValue(device.deviceScaleFactor),
      "user-agent": device.userAgent,
      "ua-type": uaType,
      "safe-area-left": this.#toNumericInputValue(safeAreaInsets?.left || 0),
      "safe-area-top": this.#toNumericInputValue(safeAreaInsets?.top || 0),
      "safe-area-right": this.#toNumericInputValue(safeAreaInsets?.right || 0),
      "safe-area-bottom": this.#toNumericInputValue(safeAreaInsets?.bottom || 0),
      "landscape-safe-area-left": this.#toNumericInputValue(landscapeSafeAreaInsets?.left || 0),
      "landscape-safe-area-top": this.#toNumericInputValue(landscapeSafeAreaInsets?.top || 0),
      "landscape-safe-area-right": this.#toNumericInputValue(landscapeSafeAreaInsets?.right || 0),
      "landscape-safe-area-bottom": this.#toNumericInputValue(landscapeSafeAreaInsets?.bottom || 0),
      "cutout-shape": cutout?.shape || NO_CUSTOM_CUTOUT,
      "cutout-x": String(cutout?.x ?? ""),
      "cutout-y": String(cutout?.y ?? ""),
      "cutout-width": String(cutout?.width ?? ""),
      "cutout-height": String(cutout?.height ?? ""),
      "cutout-border-radius": String(cutout?.shape === EmulationModel.EmulatedDevices.CutoutShape.PILL ? cutout.borderRadius : ""),
      "cutout-upper-radius": String(cutout?.shape === EmulationModel.EmulatedDevices.CutoutShape.NOTCH ? cutout.upperRadius : ""),
      "cutout-lower-radius": String(cutout?.shape === EmulationModel.EmulatedDevices.CutoutShape.NOTCH ? cutout.lowerRadius : ""),
      "cutout-cx": String(cutout?.shape === EmulationModel.EmulatedDevices.CutoutShape.CIRCLE ? cutout.cx : ""),
      "cutout-cy": String(cutout?.shape === EmulationModel.EmulatedDevices.CutoutShape.CIRCLE ? cutout.cy : ""),
      "cutout-radius": String(cutout?.shape === EmulationModel.EmulatedDevices.CutoutShape.CIRCLE ? cutout.radius : "")
    };
    this.#clientHintsMetaData = device.userAgentMetadata || void 0;
    this.#clientHintsValue = { metaData: this.#clientHintsMetaData };
    this.performUpdate();
    this.#viewOutput.focusDeviceNameField?.();
  }
  commitEdit() {
    const device = this.#editingDevice;
    if (!device) {
      return;
    }
    const isNew = this.#isNewDevice;
    device.title = this.#editorValues.title.trim();
    device.vertical.width = this.#editorValues.width ? parseInt(this.#editorValues.width, 10) : 0;
    device.vertical.height = this.#editorValues.height ? parseInt(this.#editorValues.height, 10) : 0;
    device.horizontal.width = device.vertical.height;
    device.horizontal.height = device.vertical.width;
    device.deviceScaleFactor = this.#editorValues.scale ? parseFloat(this.#editorValues.scale) : 0;
    device.userAgent = this.#editorValues["user-agent"];
    device.modes = [];
    const verticalMode = {
      title: "",
      orientation: EmulationModel.EmulatedDevices.Vertical
    };
    if (Root.Runtime.hostConfig.devToolsMobileSafeAreaEmulation?.enabled) {
      const safeAreaInsets = this.#safeAreaInsetsFromValues("");
      if (safeAreaInsets) {
        verticalMode.safeAreaInsets = safeAreaInsets;
      }
      const cutout = this.#cutoutFromValues();
      if (cutout) {
        verticalMode.cutout = cutout;
      }
    }
    device.modes.push(verticalMode);
    const horizontalMode = {
      title: "",
      orientation: EmulationModel.EmulatedDevices.Horizontal
    };
    if (Root.Runtime.hostConfig.devToolsMobileSafeAreaEmulation?.enabled) {
      const landscapeSafeAreaInsets = this.#safeAreaInsetsFromValues("landscape-");
      if (landscapeSafeAreaInsets) {
        horizontalMode.safeAreaInsets = landscapeSafeAreaInsets;
      }
    }
    device.modes.push(horizontalMode);
    device.capabilities = [];
    const uaType = this.#editorValues["ua-type"];
    if (uaType === EmulationModel.DeviceModeModel.UA.MOBILE || uaType === EmulationModel.DeviceModeModel.UA.MOBILE_NO_TOUCH) {
      device.capabilities.push(EmulationModel.EmulatedDevices.Capability.MOBILE);
    }
    if (uaType === EmulationModel.DeviceModeModel.UA.MOBILE || uaType === EmulationModel.DeviceModeModel.UA.DESKTOP_TOUCH) {
      device.capabilities.push(EmulationModel.EmulatedDevices.Capability.TOUCH);
    }
    const userAgentControlValue = this.#clientHintsMetaData;
    const hasUserAgentOverride = device.userAgent.trim().length > 0;
    device.userAgentMetadata = null;
    if (hasUserAgentOverride && userAgentControlValue) {
      device.userAgentMetadata = {
        ...userAgentControlValue,
        mobile: uaType === EmulationModel.DeviceModeModel.UA.MOBILE || uaType === EmulationModel.DeviceModeModel.UA.MOBILE_NO_TOUCH
      };
    }
    this.#editingDevice = null;
    this.#editingIndex = null;
    this.#isNewDevice = false;
    this.#editorValues = { ...EMPTY_EDITOR_VALUES };
    this.#clientHintsMetaData = void 0;
    this.#clientHintsValue = {};
    this.#showValidationErrors = false;
    if (isNew) {
      this.#emulatedDevicesList.addCustomDevice(device);
    } else {
      this.#emulatedDevicesList.saveCustomDevices();
    }
    this.#successMessage = i18nString(UIStrings.deviceAddedOrUpdated, { PH1: device.title });
    this.performUpdate();
    this.#viewOutput.focusAddCustomButton?.();
  }
  #safeAreaInsetsFromValues(controlPrefix) {
    const left = this.#editorIntegerValue(`${controlPrefix}safe-area-left`);
    const top = this.#editorIntegerValue(`${controlPrefix}safe-area-top`);
    const right = this.#editorIntegerValue(`${controlPrefix}safe-area-right`);
    const bottom = this.#editorIntegerValue(`${controlPrefix}safe-area-bottom`);
    if (!left && !top && !right && !bottom) {
      return null;
    }
    return new EmulationModel.DeviceModeModel.Insets(left, top, right, bottom);
  }
  #cutoutFromValues() {
    const shape = this.#editorValues["cutout-shape"];
    const baseCutout = {
      x: this.#editorIntegerValue("cutout-x"),
      y: this.#editorIntegerValue("cutout-y"),
      width: this.#editorIntegerValue("cutout-width"),
      height: this.#editorIntegerValue("cutout-height")
    };
    switch (shape) {
      case EmulationModel.EmulatedDevices.CutoutShape.PILL:
        return {
          shape,
          ...baseCutout,
          borderRadius: this.#editorIntegerValue("cutout-border-radius")
        };
      case EmulationModel.EmulatedDevices.CutoutShape.NOTCH:
        return {
          shape,
          ...baseCutout,
          upperRadius: this.#editorIntegerValue("cutout-upper-radius"),
          lowerRadius: this.#editorIntegerValue("cutout-lower-radius")
        };
      case EmulationModel.EmulatedDevices.CutoutShape.CIRCLE:
        return {
          shape,
          ...baseCutout,
          cx: this.#editorIntegerValue("cutout-cx"),
          cy: this.#editorIntegerValue("cutout-cy"),
          radius: this.#editorIntegerValue("cutout-radius")
        };
      case EmulationModel.EmulatedDevices.CutoutShape.RECTANGLE:
        return { shape, ...baseCutout };
      default:
        return null;
    }
  }
  #validateEditor(showSafeAreaAndCutout) {
    const invalidFields = /* @__PURE__ */ new Set();
    const errorMessages = [];
    let hasErrors = false;
    const recordResult = (field, result) => {
      if (!result.valid) {
        hasErrors = true;
        invalidFields.add(field);
        if (result.errorMessage) {
          errorMessages.push(result.errorMessage);
        }
      }
    };
    const values = this.#editorValues;
    const nonNegativeIntegerValue = (controlName) => parseOptionalNonNegativeInteger(values[controlName]);
    const positiveIntegerValue = (controlName) => {
      const value = nonNegativeIntegerValue(controlName);
      return value && value > 0 ? value : null;
    };
    const requiredIntegerValue = (controlName) => {
      const value = values[controlName].trim();
      return value ? parseOptionalNonNegativeInteger(value) : null;
    };
    const controlLabel = (field) => FIELD_LABELS[field]?.() ?? "";
    const validateTitle = () => {
      const value = values.title.trim();
      if (value.length >= EmulationModel.DeviceModeModel.MaxDeviceNameLength) {
        return {
          valid: false,
          errorMessage: i18nString(
            UIStrings.deviceNameMustBeLessThanS,
            { PH1: EmulationModel.DeviceModeModel.MaxDeviceNameLength }
          )
        };
      }
      if (value.length === 0) {
        return { valid: false, errorMessage: i18nString(UIStrings.deviceNameCannotBeEmpty) };
      }
      return { valid: true };
    };
    const validateSafeArea = (controlPrefix, orientationLabel, widthControlName, heightControlName, field) => {
      const ownValue = parseOptionalNonNegativeInteger(values[field]);
      if (ownValue === null) {
        return {
          valid: false,
          errorMessage: i18nString(UIStrings.safeAreaValueMustBeInRange, {
            PH1: orientationLabel,
            PH2: controlLabel(field),
            PH3: EmulationModel.DeviceModeModel.MaxDeviceSize
          })
        };
      }
      const left = nonNegativeIntegerValue(`${controlPrefix}safe-area-left`);
      const top = nonNegativeIntegerValue(`${controlPrefix}safe-area-top`);
      const right = nonNegativeIntegerValue(`${controlPrefix}safe-area-right`);
      const bottom = nonNegativeIntegerValue(`${controlPrefix}safe-area-bottom`);
      const width = positiveIntegerValue(widthControlName);
      const height = positiveIntegerValue(heightControlName);
      if (field === `${controlPrefix}safe-area-right` && left !== null && right !== null && width !== null && left + right > width) {
        return {
          valid: false,
          errorMessage: i18nString(UIStrings.safeAreaHorizontalInsetsExceedWidth, { PH1: orientationLabel })
        };
      }
      if (field === `${controlPrefix}safe-area-bottom` && top !== null && bottom !== null && height !== null && top + bottom > height) {
        return {
          valid: false,
          errorMessage: i18nString(UIStrings.safeAreaVerticalInsetsExceedHeight, { PH1: orientationLabel })
        };
      }
      return { valid: true };
    };
    const isCutoutFieldActive = (shape) => {
      const selectedShape = values["cutout-shape"];
      return selectedShape !== NO_CUSTOM_CUTOUT && (shape === void 0 || selectedShape === shape);
    };
    const validateCutoutValue = (field, mustBePositive = false) => {
      const label = controlLabel(field);
      const value = values[field].trim();
      if (!value) {
        return { valid: false, errorMessage: i18nString(UIStrings.cutoutFieldRequired, { PH1: label }) };
      }
      const numericValue = parseOptionalNonNegativeInteger(value);
      if (numericValue === null) {
        return {
          valid: false,
          errorMessage: i18nString(UIStrings.cutoutValueMustBeInRange, {
            PH1: label,
            PH2: EmulationModel.DeviceModeModel.MaxDeviceSize
          })
        };
      }
      if (mustBePositive && numericValue === 0) {
        return { valid: false, errorMessage: i18nString(UIStrings.cutoutValueMustBePositiveInteger, { PH1: label }) };
      }
      return { valid: true };
    };
    recordResult("title", validateTitle());
    recordResult("width", EmulationModel.DeviceModeModel.DeviceModeModel.widthValidator(values.width));
    recordResult("height", EmulationModel.DeviceModeModel.DeviceModeModel.heightValidator(values.height));
    recordResult("scale", EmulationModel.DeviceModeModel.DeviceModeModel.scaleValidator(values.scale));
    if (showSafeAreaAndCutout) {
      const portraitLabel = i18nString(UIStrings.portraitSafeArea);
      for (const field of ["safe-area-left", "safe-area-top", "safe-area-right", "safe-area-bottom"]) {
        recordResult(field, validateSafeArea("", portraitLabel, "width", "height", field));
      }
      const landscapeLabel = i18nString(UIStrings.landscapeSafeArea);
      for (const field of [
        "landscape-safe-area-left",
        "landscape-safe-area-top",
        "landscape-safe-area-right",
        "landscape-safe-area-bottom"
      ]) {
        recordResult(field, validateSafeArea("landscape-", landscapeLabel, "height", "width", field));
      }
      recordResult("cutout-shape", { valid: true });
      recordResult("cutout-x", isCutoutFieldActive() ? validateCutoutValue("cutout-x") : { valid: true });
      recordResult("cutout-y", isCutoutFieldActive() ? validateCutoutValue("cutout-y") : { valid: true });
      if (!isCutoutFieldActive()) {
        recordResult("cutout-width", { valid: true });
      } else {
        const widthValidation = validateCutoutValue("cutout-width", true);
        if (!widthValidation.valid) {
          recordResult("cutout-width", widthValidation);
        } else {
          const cutoutX = requiredIntegerValue("cutout-x");
          const cutoutWidth = positiveIntegerValue("cutout-width");
          const width = positiveIntegerValue("width");
          if (width !== null && cutoutX !== null && cutoutWidth !== null && cutoutX + cutoutWidth > width) {
            recordResult(
              "cutout-width",
              { valid: false, errorMessage: i18nString(UIStrings.cutoutXAndWidthExceedDeviceWidth) }
            );
          } else {
            recordResult("cutout-width", { valid: true });
          }
        }
      }
      if (!isCutoutFieldActive()) {
        recordResult("cutout-height", { valid: true });
      } else {
        const heightValidation = validateCutoutValue("cutout-height", true);
        if (!heightValidation.valid) {
          recordResult("cutout-height", heightValidation);
        } else {
          const cutoutY = requiredIntegerValue("cutout-y");
          const cutoutHeight = positiveIntegerValue("cutout-height");
          const height = positiveIntegerValue("height");
          if (height !== null && cutoutY !== null && cutoutHeight !== null && cutoutY + cutoutHeight > height) {
            recordResult(
              "cutout-height",
              { valid: false, errorMessage: i18nString(UIStrings.cutoutYAndHeightExceedDeviceHeight) }
            );
          } else {
            recordResult("cutout-height", { valid: true });
          }
        }
      }
      recordResult(
        "cutout-border-radius",
        isCutoutFieldActive(EmulationModel.EmulatedDevices.CutoutShape.PILL) ? validateCutoutValue("cutout-border-radius") : { valid: true }
      );
      recordResult(
        "cutout-upper-radius",
        isCutoutFieldActive(EmulationModel.EmulatedDevices.CutoutShape.NOTCH) ? validateCutoutValue("cutout-upper-radius") : { valid: true }
      );
      recordResult(
        "cutout-lower-radius",
        isCutoutFieldActive(EmulationModel.EmulatedDevices.CutoutShape.NOTCH) ? validateCutoutValue("cutout-lower-radius") : { valid: true }
      );
      recordResult(
        "cutout-cx",
        isCutoutFieldActive(EmulationModel.EmulatedDevices.CutoutShape.CIRCLE) ? validateCutoutValue("cutout-cx") : { valid: true }
      );
      recordResult(
        "cutout-cy",
        isCutoutFieldActive(EmulationModel.EmulatedDevices.CutoutShape.CIRCLE) ? validateCutoutValue("cutout-cy") : { valid: true }
      );
      if (!isCutoutFieldActive(EmulationModel.EmulatedDevices.CutoutShape.CIRCLE)) {
        recordResult("cutout-radius", { valid: true });
      } else {
        const radiusValidation = validateCutoutValue("cutout-radius", true);
        if (!radiusValidation.valid) {
          recordResult("cutout-radius", radiusValidation);
        } else {
          const cutoutX = requiredIntegerValue("cutout-x");
          const cutoutY = requiredIntegerValue("cutout-y");
          const cutoutWidth = positiveIntegerValue("cutout-width");
          const cutoutHeight = positiveIntegerValue("cutout-height");
          const centerX = requiredIntegerValue("cutout-cx");
          const centerY = requiredIntegerValue("cutout-cy");
          const radius = positiveIntegerValue("cutout-radius");
          if (cutoutX !== null && cutoutY !== null && cutoutWidth !== null && cutoutHeight !== null && centerX !== null && centerY !== null && radius !== null && (centerX - radius < cutoutX || centerX + radius > cutoutX + cutoutWidth || centerY - radius < cutoutY || centerY + radius > cutoutY + cutoutHeight)) {
            recordResult(
              "cutout-radius",
              { valid: false, errorMessage: i18nString(UIStrings.circleMustFitCutoutBounds) }
            );
          } else {
            recordResult("cutout-radius", { valid: true });
          }
        }
      }
    }
    recordResult(
      "user-agent",
      values["user-agent"].trim().length > 0 ? { valid: true } : { valid: false, errorMessage: i18nString(UIStrings.userAgentStringCannotBeEmpty) }
    );
    recordResult("ua-type", { valid: true });
    let isClientHintsInvalid = false;
    const clientHintsResult = EmulationComponents.UserAgentClientHintsForm.UserAgentClientHintsForm.validateMetaData(
      this.#clientHintsMetaData
    );
    if (!clientHintsResult.valid) {
      hasErrors = true;
      isClientHintsInvalid = true;
      if (clientHintsResult.errorMessage) {
        errorMessages.push(clientHintsResult.errorMessage);
      }
    }
    return { invalidFields, isClientHintsInvalid, errorMessages, hasErrors };
  }
};
export {
  DevicesSettingsTab_exports as DevicesSettingsTab
};
//# sourceMappingURL=emulation.js.map
