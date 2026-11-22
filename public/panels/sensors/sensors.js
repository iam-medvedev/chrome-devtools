var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../../front_end/panels/sensors/LocationsSettingsTab.ts
var LocationsSettingsTab_exports = {};
__export(LocationsSettingsTab_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW,
  LocationsSettingsTab: () => LocationsSettingsTab,
  locationsSettingsTabStyles: () => locationsSettingsTab_css_default,
  renderEditorView: () => renderEditorView,
  renderLocationDialog: () => renderLocationDialog,
  validateAccuracy: () => validateAccuracy,
  validateLatitude: () => validateLatitude,
  validateLocale: () => validateLocale,
  validateLongitude: () => validateLongitude,
  validateTimezoneId: () => validateTimezoneId,
  validateTitle: () => validateTitle
});
import "../../ui/kit/kit.js";
import "../../ui/components/lists/lists.js";
import * as Common from "../../core/common/common.js";
import * as i18n from "../../core/i18n/i18n.js";
import * as SDK from "../../core/sdk/sdk.js";
import * as Buttons from "../../ui/components/buttons/buttons.js";
import * as UI from "../../ui/legacy/legacy.js";
import { Directives, html, nothing, render } from "../../ui/lit/lit.js";
import * as SettingsUI from "../../ui/settings/settings.js";
import * as VisualLogging from "../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/sensors/locationsSettingsTab.css.js
var locationsSettingsTab_css_default = `/*
 * Copyright 2018 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

devtools-button.add-locations-button:not(:first-child),
.add-locations-button {
  margin-bottom: var(--sys-size-5);
  border: none;
}

devtools-list.locations-list,
.locations-list {
  margin-top: var(--sys-size-3);
  flex: auto;
  display: flex;
  border: var(--sys-size-1) solid var(--sys-color-divider);
}

.locations-list-item {
  padding: var(--sys-size-2) var(--sys-size-4);
  height: var(--sys-size-12);
  display: flex;
  align-items: center;
  position: relative;
  flex: auto 1 1;
}

.locations-list-text {
  white-space: nowrap;
  text-overflow: ellipsis;
  flex-basis: var(--sys-size-24);
  user-select: none;
  color: var(--sys-color-on-surface);
  position: relative;
  overflow: hidden;
}

.locations-list-title {
  text-align: start;
}

.locations-list-title-text {
  overflow: hidden;
  flex: auto;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.locations-list-separator {
  flex: 0 0 var(--sys-size-1);
  background-color: var(--sys-color-divider);
  height: var(--sys-size-13);
  margin: 0 var(--sys-size-3);
}

.settings-card-container-wrapper {
  scrollbar-gutter: stable;
  padding: var(--sys-size-8) 0;
  overflow: auto;
  position: absolute;
  inset: var(--sys-size-8) 0 0;
}

.settings-card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sys-size-9);
}

.location-dialog-content {
  padding: var(--sys-size-6);
  display: flex;
  flex-direction: column;
  gap: var(--sys-size-6);
  width: var(--sys-size-33);
  min-width: var(--sys-size-33);
}

.editor-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sys-size-5) var(--sys-size-6);
}

.editor-field-full-width {
  grid-column: 1 / -1;
}

.editor-field {
  display: flex;
  flex-direction: column;
  gap: var(--sys-size-2);
}

.editor-field-label {
  color: var(--sys-color-on-surface);
  font-size: var(--sys-size-6);
  font-weight: var(--ref-typeface-weight-medium);
}

.editor-field input {
  width: 100%;
  box-sizing: border-box;
  padding: var(--sys-size-3) var(--sys-size-4);
  height: var(--sys-size-11);
  border: var(--sys-size-1) solid var(--sys-color-neutral-outline);
  border-radius: var(--sys-size-2);
  outline: none;
}

.editor-field.has-error input {
  border-color: var(--sys-color-error);
}

.editor-field-error {
  color: var(--sys-color-error);
  font-size: var(--sys-size-6);
  overflow-wrap: break-word;
}

.dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: var(--sys-size-3);
  margin-top: var(--sys-size-3);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-title {
  font-size: var(--sys-size-7);
  font-weight: var(--ref-typeface-weight-medium);
  color: var(--sys-color-on-surface);
}

.dialog-close-button {
  flex-shrink: 0;
}

/*# sourceURL=${import.meta.resolve("./locationsSettingsTab.css")} */`;

// ../../front_end/panels/sensors/LocationsSettingsTab.ts
var { createRef, ref } = Directives;
var UIStrings = {
  /**
   * @description Title in the Locations settings tab, where custom geographic locations that the user
   * has entered are stored.
   */
  locations: "Locations",
  /**
   * @description Label for the name of a geographic location that the user has entered.
   */
  locationName: "Location name",
  /**
   * @description Abbreviation of latitude in the Locations settings tab of the Device toolbar.
   */
  lat: "Lat",
  /**
   * @description Abbreviation of longitude in the Locations settings tab of the Device toolbar.
   */
  long: "Long",
  /**
   * @description Text in the Sensors view of the Device toolbar.
   */
  timezoneId: "Timezone ID",
  /**
   * @description Label for text input for the locale of a particular location.
   */
  locale: "Locale",
  /**
   * @description Label for text input for the latitude of a GPS position.
   */
  latitude: "Latitude",
  /**
   * @description Label for text input for the longitude of a GPS position.
   */
  longitude: "Longitude",
  /**
   * @description Label for text input for the accuracy of a GPS position.
   */
  accuracy: "Accuracy",
  /**
   * @description Error message in the Locations settings tab that declares the location name input must not be empty.
   */
  locationNameCannotBeEmpty: "Location name can\u2019t be empty",
  /**
   * @description Error message in the Locations settings tab that declares the maximum length of the location name.
   * @example {50} PH1
   */
  locationNameMustBeLessThanS: "Location name must be less than {PH1} characters",
  /**
   * @description Error message in the Locations settings tab that declares that the value for the latitude input must be a number.
   */
  latitudeMustBeANumber: "Latitude must be a number",
  /**
   * @description Error message in the Locations settings tab that declares the minimum value for the latitude input.
   * @example {-90} PH1
   */
  latitudeMustBeGreaterThanOrEqual: "Latitude must be greater than or equal to {PH1}",
  /**
   * @description Error message in the Locations settings tab that declares the maximum value for the latitude input.
   * @example {90} PH1
   */
  latitudeMustBeLessThanOrEqualToS: "Latitude must be less than or equal to {PH1}",
  /**
   * @description Error message in the Locations settings tab that declares that the value for the longitude input must be a number.
   */
  longitudeMustBeANumber: "Longitude must be a number",
  /**
   * @description Error message in the Locations settings tab that declares the minimum value for the longitude input.
   * @example {-180} PH1
   */
  longitudeMustBeGreaterThanOr: "Longitude must be greater than or equal to {PH1}",
  /**
   * @description Error message in the Locations settings tab that declares the maximum value for the longitude input.
   * @example {180} PH1
   */
  longitudeMustBeLessThanOrEqualTo: "Longitude must be less than or equal to {PH1}",
  /**
   * @description Error message in the Locations settings tab that declares timezone ID input invalid.
   */
  timezoneIdMustContainAlphabetic: "Timezone ID must contain alphabetic characters",
  /**
   * @description Error message in the Locations settings tab that declares locale input invalid.
   */
  localeMustContainAlphabetic: "Locale must contain alphabetic characters",
  /**
   * @description Error message in the Locations settings tab that declares that the value for the accuracy input must be a number.
   */
  accuracyMustBeANumber: "Accuracy must be a number",
  /**
   * @description Error message in the Locations settings tab that declares the minimum value for the accuracy input.
   * @example {0} PH1
   */
  accuracyMustBeGreaterThanOrEqual: "Accuracy must be greater than or equal to {PH1}",
  /**
   * @description Text of add locations button in the Locations settings tab of the Device toolbar.
   */
  addLocation: "Add location",
  /**
   * @description Title for the dialog when editing an existing location in the Locations settings tab.
   */
  editLocation: "Edit location",
  /**
   * @description Label for button to save location changes.
   */
  save: "Save",
  /**
   * @description Label for button to cancel location edits.
   */
  cancel: "Cancel",
  /**
   * @description Label for button to close the location dialog.
   */
  close: "Close"
};
var str_ = i18n.i18n.registerUIStrings("panels/sensors/LocationsSettingsTab.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
function renderItemView(location) {
  return html`
    <div class="locations-list-item">
      <div class="locations-list-text locations-list-title">
        <div class="locations-list-title-text" title=${location.title}>${location.title}</div>
      </div>
      <div class="locations-list-separator"></div>
      <div class="locations-list-text">${location.lat}</div>
      <div class="locations-list-separator"></div>
      <div class="locations-list-text">${location.long}</div>
      <div class="locations-list-separator"></div>
      <div class="locations-list-text">${location.timezoneId}</div>
      <div class="locations-list-separator"></div>
      <div class="locations-list-text">${location.locale}</div>
      <div class="locations-list-separator"></div>
      <div class="locations-list-text">${location.accuracy ?? SDK.EmulationModel.Location.DEFAULT_ACCURACY}</div>
    </div>`;
}
function renderEditorView(controls, errors) {
  return html`
    <div class="editor-grid">
      <div class="editor-field editor-field-full-width ${errors?.title ? "has-error" : ""}">
        <label class="editor-field-label" for="location-title">${i18nString(UIStrings.locationName)}</label>
        ${controls.titleInput}
        ${errors?.title ? html`<div class="editor-field-error" role="alert">${errors.title}</div>` : nothing}
      </div>
      <div class="editor-field ${errors?.lat ? "has-error" : ""}">
        <label class="editor-field-label" for="location-lat">${i18nString(UIStrings.lat)}</label>
        ${controls.latInput}
        ${errors?.lat ? html`<div class="editor-field-error" role="alert">${errors.lat}</div>` : nothing}
      </div>
      <div class="editor-field ${errors?.long ? "has-error" : ""}">
        <label class="editor-field-label" for="location-long">${i18nString(UIStrings.long)}</label>
        ${controls.longInput}
        ${errors?.long ? html`<div class="editor-field-error" role="alert">${errors.long}</div>` : nothing}
      </div>
      <div class="editor-field ${errors?.timezoneId ? "has-error" : ""}">
        <label class="editor-field-label" for="location-timezone">${i18nString(UIStrings.timezoneId)}</label>
        ${controls.timezoneIdInput}
        ${errors?.timezoneId ? html`<div class="editor-field-error" role="alert">${errors.timezoneId}</div>` : nothing}
      </div>
      <div class="editor-field ${errors?.locale ? "has-error" : ""}">
        <label class="editor-field-label" for="location-locale">${i18nString(UIStrings.locale)}</label>
        ${controls.localeInput}
        ${errors?.locale ? html`<div class="editor-field-error" role="alert">${errors.locale}</div>` : nothing}
      </div>
      <div class="editor-field editor-field-full-width ${errors?.accuracy ? "has-error" : ""}">
        <label class="editor-field-label" for="location-accuracy">${i18nString(UIStrings.accuracy)}</label>
        ${controls.accuracyInput}
        ${errors?.accuracy ? html`<div class="editor-field-error" role="alert">${errors.accuracy}</div>` : nothing}
      </div>
    </div>
  `;
}
function renderLocationDialog(input) {
  const titleInputRef = createRef();
  const latInputRef = createRef();
  const longInputRef = createRef();
  const timezoneIdInputRef = createRef();
  const localeInputRef = createRef();
  const accuracyInputRef = createRef();
  const handleSave = () => {
    const title = titleInputRef.value?.value.trim() ?? "";
    const latStr = latInputRef.value?.value.trim() ?? "";
    const longStr = longInputRef.value?.value.trim() ?? "";
    const timezoneId = timezoneIdInputRef.value?.value.trim() ?? "";
    const locale = localeInputRef.value?.value.trim() ?? "";
    const accuracyStr = accuracyInputRef.value?.value.trim() ?? "";
    const titleError = validateTitle(title);
    const latError = validateLatitude(latStr);
    const longError = validateLongitude(longStr);
    const tzError = validateTimezoneId(timezoneId);
    const localeError = validateLocale(locale);
    const accuracyError = validateAccuracy(accuracyStr);
    if (titleError || latError || longError || tzError || localeError || accuracyError) {
      input.onValidateErrors({
        title: titleError,
        lat: latError,
        long: longError,
        timezoneId: tzError,
        locale: localeError,
        accuracy: accuracyError
      });
      return;
    }
    input.onSave({
      title,
      lat: latStr ? parseFloat(latStr) : 0,
      long: longStr ? parseFloat(longStr) : 0,
      timezoneId,
      locale,
      accuracy: accuracyStr ? parseFloat(accuracyStr) : SDK.EmulationModel.Location.DEFAULT_ACCURACY
    });
  };
  const editorControls = {
    titleInput: html`<input id="location-title" aria-label=${i18nString(UIStrings.locationName)} type="text" placeholder=${i18nString(UIStrings.locationName)} .value=${input.location.title} ${ref(titleInputRef)}>`,
    latInput: html`<input id="location-lat" aria-label=${i18nString(UIStrings.lat)} type="text" placeholder=${i18nString(UIStrings.latitude)} .value=${String(input.location.lat)} ${ref(latInputRef)}>`,
    longInput: html`<input id="location-long" aria-label=${i18nString(UIStrings.long)} type="text" placeholder=${i18nString(UIStrings.longitude)} .value=${String(input.location.long)} ${ref(longInputRef)}>`,
    timezoneIdInput: html`<input id="location-timezone" aria-label=${i18nString(UIStrings.timezoneId)} type="text" placeholder=${i18nString(UIStrings.timezoneId)} .value=${input.location.timezoneId} ${ref(timezoneIdInputRef)}>`,
    localeInput: html`<input id="location-locale" aria-label=${i18nString(UIStrings.locale)} type="text" placeholder=${i18nString(UIStrings.locale)} .value=${input.location.locale} ${ref(localeInputRef)}>`,
    accuracyInput: html`<input id="location-accuracy" aria-label=${i18nString(UIStrings.accuracy)} type="text" placeholder=${i18nString(UIStrings.accuracy)} .value=${String(input.location.accuracy ?? SDK.EmulationModel.Location.DEFAULT_ACCURACY)} ${ref(accuracyInputRef)}>`
  };
  const dialogContent = html`
    <style>${locationsSettingsTab_css_default}</style>
      <div class="location-dialog-content">
      <div class="dialog-header">
        <span class="dialog-title">${input.isNew ? i18nString(UIStrings.addLocation) : i18nString(UIStrings.editLocation)}</span>
        <devtools-button
          class="dialog-close-button"
          .iconName=${"cross"}
          .variant=${Buttons.Button.Variant.ICON}
          .title=${i18nString(UIStrings.close)}
          .jslogContext=${"dialog-close"}
          @click=${input.onCancel}
          aria-label=${i18nString(UIStrings.close)}>
        </devtools-button>
      </div>
        ${renderEditorView(editorControls, input.errors)}
        <div class="dialog-buttons">
          <devtools-button
            class="save-button"
            .variant=${Buttons.Button.Variant.PRIMARY}
            @click=${handleSave}>
            ${i18nString(UIStrings.save)}
          </devtools-button>
          <devtools-button
            class="cancel-button"
            .variant=${Buttons.Button.Variant.OUTLINED}
            @click=${input.onCancel}>
            ${i18nString(UIStrings.cancel)}
          </devtools-button>
        </div>
      </div>
  `;
  return html`
    <style>${locationsSettingsTab_css_default}</style>
    <devtools-widget
      class="location-dialog-widget"
      ${UI.Widget.widget(UI.Dialog.DialogWidget, {
    open: true,
    jslogContext: "location-dialog",
    dialogStack: true,
    content: dialogContent
  })}
      @hidden=${input.onCancel}>
    </devtools-widget>
  `;
}
var DEFAULT_VIEW = (input, _output, target) => {
  render(html`
    <style>${locationsSettingsTab_css_default}</style>
    <div class="settings-card-container-wrapper">
      <div class="settings-card-container">
        <devtools-card .heading=${i18nString(UIStrings.locations)}>
          <div>
            ${input.locations.length > 0 ? html`
              <devtools-list
                class="locations-list square-corners"
                .editable=${true}
                .deletable=${true}
                @edit=${(e) => input.onEditLocation(e.detail.index)}
                @delete=${(e) => input.onRemoveLocation(e.detail.index)}>
                ${input.locations.map((location) => renderItemView(location))}
              </devtools-list>
            ` : nothing}
          </div>
          <devtools-button
            class="add-locations-button"
            .variant=${Buttons.Button.Variant.OUTLINED}
            .iconName=${"plus"}
            .jslogContext=${"emulation.add-location"}
            @click=${input.onAddLocation}>
            ${i18nString(UIStrings.addLocation)}
          </devtools-button>
        </devtools-card>
      </div>
    </div>
    ${input.activeDialog ? renderLocationDialog(input.activeDialog) : nothing}
  `, target, { container: { attributes: { jslog: `${VisualLogging.pane("emulation-locations")}` } } });
};
var LocationsSettingsTab = class extends UI.Widget.VBox {
  customSetting;
  #view;
  #activeDialogState;
  constructor(element, view = DEFAULT_VIEW) {
    super(element, {
      useShadowDom: true
    });
    this.#view = view;
    this.customSetting = Common.Settings.Settings.instance().resolve(SettingsUI.EmulationSettings.emulationLocationsSettingDescriptor);
    const list = this.customSetting.get().map((location) => replaceLocationTitles(location, this.customSetting.defaultValue));
    function replaceLocationTitles(location, defaultValues) {
      if (!location.title) {
        const replacement = defaultValues.find(
          (defaultLocation) => defaultLocation.lat === location.lat && defaultLocation.long === location.long && defaultLocation.timezoneId === location.timezoneId && defaultLocation.locale === location.locale
        );
        if (!replacement) {
          console.error("Could not determine a location setting title");
        } else {
          return replacement;
        }
      }
      return location;
    }
    this.customSetting.set(list);
    this.customSetting.addChangeListener(this.locationsUpdated, this);
  }
  wasShown() {
    super.wasShown();
    this.locationsUpdated();
  }
  performUpdate() {
    let activeDialogInput;
    if (this.#activeDialogState) {
      const state = this.#activeDialogState;
      activeDialogInput = {
        location: state.location,
        isNew: state.isNew,
        errors: state.errors,
        onSave: (updatedLocation) => this.saveDialog(updatedLocation),
        onCancel: () => this.closeDialog(),
        onValidateErrors: (errors) => this.updateDialogErrors(errors)
      };
    }
    const viewInput = {
      locations: this.customSetting.get(),
      onAddLocation: () => this.addButtonClicked(),
      onEditLocation: (index) => this.editLocationClicked(index),
      onRemoveLocation: (index) => this.removeLocationClicked(index),
      activeDialog: activeDialogInput
    };
    this.#view(viewInput, void 0, this.contentElement);
  }
  locationsUpdated() {
    this.requestUpdate();
  }
  addButtonClicked() {
    this.#activeDialogState = {
      location: {
        title: "",
        lat: 0,
        long: 0,
        timezoneId: "",
        locale: "",
        accuracy: SDK.EmulationModel.Location.DEFAULT_ACCURACY
      },
      isNew: true
    };
    this.requestUpdate();
  }
  editLocationClicked(index) {
    const list = this.customSetting.get();
    const location = list[index];
    if (!location) {
      return;
    }
    this.#activeDialogState = {
      location: { ...location },
      isNew: false,
      index
    };
    this.requestUpdate();
  }
  removeLocationClicked(index) {
    const list = this.customSetting.get();
    list.splice(index, 1);
    this.customSetting.set(list);
  }
  saveDialog(updatedLocation) {
    if (!this.#activeDialogState) {
      return;
    }
    const list = this.customSetting.get();
    if (this.#activeDialogState.isNew) {
      list.push(updatedLocation);
    } else if (this.#activeDialogState.index !== void 0) {
      list[this.#activeDialogState.index] = updatedLocation;
    }
    this.#activeDialogState = void 0;
    this.customSetting.set(list);
  }
  closeDialog() {
    this.#activeDialogState = void 0;
    this.requestUpdate();
  }
  updateDialogErrors(errors) {
    if (this.#activeDialogState) {
      this.#activeDialogState.errors = errors;
      this.requestUpdate();
    }
  }
};
function validateTitle(value) {
  const maxLength = 50;
  const trimmedValue = value.trim();
  if (!trimmedValue.length) {
    return i18nString(UIStrings.locationNameCannotBeEmpty);
  }
  if (trimmedValue.length > maxLength) {
    return i18nString(UIStrings.locationNameMustBeLessThanS, { PH1: maxLength });
  }
  return null;
}
function validateLatitude(value) {
  const minLat = -90;
  const maxLat = 90;
  const trimmedValue = value.trim();
  const parsedValue = Number(trimmedValue);
  if (!trimmedValue) {
    return null;
  }
  if (Number.isNaN(parsedValue)) {
    return i18nString(UIStrings.latitudeMustBeANumber);
  }
  if (parsedValue < minLat) {
    return i18nString(UIStrings.latitudeMustBeGreaterThanOrEqual, { PH1: minLat });
  }
  if (parsedValue > maxLat) {
    return i18nString(UIStrings.latitudeMustBeLessThanOrEqualToS, { PH1: maxLat });
  }
  return null;
}
function validateLongitude(value) {
  const minLong = -180;
  const maxLong = 180;
  const trimmedValue = value.trim();
  const parsedValue = Number(trimmedValue);
  if (!trimmedValue) {
    return null;
  }
  if (Number.isNaN(parsedValue)) {
    return i18nString(UIStrings.longitudeMustBeANumber);
  }
  if (parsedValue < minLong) {
    return i18nString(UIStrings.longitudeMustBeGreaterThanOr, { PH1: minLong });
  }
  if (parsedValue > maxLong) {
    return i18nString(UIStrings.longitudeMustBeLessThanOrEqualTo, { PH1: maxLong });
  }
  return null;
}
function validateTimezoneId(value) {
  const trimmedValue = value.trim();
  if (trimmedValue === "" || /[a-zA-Z]/.test(trimmedValue)) {
    return null;
  }
  return i18nString(UIStrings.timezoneIdMustContainAlphabetic);
}
function validateLocale(value) {
  const trimmedValue = value.trim();
  if (trimmedValue === "" || /[a-zA-Z]{2}/.test(trimmedValue)) {
    return null;
  }
  return i18nString(UIStrings.localeMustContainAlphabetic);
}
function validateAccuracy(value) {
  const minAccuracy = 0;
  const trimmedValue = value.trim();
  const parsedValue = Number(trimmedValue);
  if (!trimmedValue) {
    return null;
  }
  if (Number.isNaN(parsedValue)) {
    return i18nString(UIStrings.accuracyMustBeANumber);
  }
  if (parsedValue < minAccuracy) {
    return i18nString(UIStrings.accuracyMustBeGreaterThanOrEqual, { PH1: minAccuracy });
  }
  return null;
}

// ../../front_end/panels/sensors/SensorsView.ts
var SensorsView_exports = {};
__export(SensorsView_exports, {
  SensorsView: () => SensorsView
});
import * as Common2 from "../../core/common/common.js";
import * as Host from "../../core/host/host.js";
import * as i18n3 from "../../core/i18n/i18n.js";
import * as SDK2 from "../../core/sdk/sdk.js";
import * as Buttons2 from "../../ui/components/buttons/buttons.js";
import * as Geometry from "../../ui/geometry/geometry.js";
import * as SettingsUI2 from "../../ui/legacy/components/settings_ui/settings_ui.js";
import * as UI2 from "../../ui/legacy/legacy.js";
import { Directives as Directives2, html as html2, render as render2 } from "../../ui/lit/lit.js";
import * as SettingUIRegistration from "../../ui/settings/settings.js";
import * as VisualLogging2 from "../../ui/visual_logging/visual_logging.js";
import * as MobileThrottling from "../mobile_throttling/mobile_throttling.js";

// gen/front_end/panels/sensors/sensors.css.js
var sensors_css_default = `/*
 * Copyright 2015 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.sensors-view {
  padding: var(--sys-size-6);
  display: block;
}

.sensors-view input {
  width: 100%;
  max-width: 120px;
  margin: -5px 10px 0 0;
  text-align: end;
}

.sensors-view input[readonly] {
  background-color: var(--sys-color-neutral-container);
}

.sensors-view fieldset {
  border: none;
  padding: 10px 0;
  flex: 0 0 auto;
  margin: 0;
}

.sensors-view fieldset[disabled] {
  opacity: 50%;
}

.orientation-axis-input-container input {
  max-width: 120px;
}

.sensors-view input:focus::-webkit-input-placeholder {
  color: transparent !important; /* stylelint-disable-line declaration-no-important */
}

.sensors-view select {
  width: 200px;
}

.sensors-group-title {
  width: var(--sys-size-19);
  line-height: var(--sys-typescale-body1-line-height);
}

.sensors-group {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.manage-locations {
  margin-left: var(--sys-size-4);
}

.geo-fields {
  flex: 2 0 200px;
}

.latlong-group {
  display: flex;
  margin-bottom: 10px;
}

.latlong-title {
  width: 70px;
}

.timezone-error,
.locale-error {
  margin-left: 10px;
  color: var(--legacy-input-validation-error);
}

/* Device Orientation */

.orientation-content {
  display: flex;
  flex-wrap: wrap;
}

.orientation-fields {
  margin-right: 10px;
}

.orientation-stage {
  --override-gradient-color-1: var(--ref-palette-cyan95);
  --override-gradient-color-2: var(--ref-palette-cyan90);

  perspective: 700px;
  perspective-origin: 50% 50%;
  width: var(--sys-size-23);
  height: 150px;
  background: linear-gradient(var(--override-gradient-color-1) 0%, var(--override-gradient-color-1) 64%, var(--override-gradient-color-2) 64%, var(--override-gradient-color-1) 100%);
  transition: 0.2s ease opacity, 0.2s ease filter;
  overflow: hidden;
  margin-bottom: 10px;
  cursor: grab;
}

.theme-with-dark-background .orientation-stage,
:host-context(.theme-with-dark-background) .orientation-stage {
  --override-gradient-color-1: var(--ref-palette-cyan10);
  --override-gradient-color-2: var(--ref-palette-cyan30);
}

.orientation-stage.disabled {
  filter: grayscale();
  opacity: 50%;
}

.orientation-element,
.orientation-element::before,
.orientation-element::after {
  position: absolute;
  box-sizing: border-box;
  transform-style: preserve-3d;
  background: no-repeat;
  background-size: cover;
  backface-visibility: hidden;
}

.orientation-box {
  width: 62px;
  height: 122px;
  inset: 0;
  margin: auto;
  transform: rotate3d(1, 0, 0, 90deg);
}

.orientation-layer {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.orientation-box.is-animating,
.is-animating .orientation-layer {
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.orientation-front,
.orientation-back {
  width: 62px;
  height: 122px;
  border-radius: var(--sys-shape-corner-small);
}

.orientation-front {
  background-image: var(--image-file-accelerometer-front);
}

.orientation-back {
  transform: rotateY(180deg) translateZ(8px);
  background-image: var(--image-file-accelerometer-back);
}

.orientation-left,
.orientation-right {
  width: var(--sys-size-5);
  height: 106px;
  top: var(--sys-size-5);
  background-position: center center;
}

.orientation-left {
  left: calc(-1 * var(--sys-size-5));
  transform-origin: right center;
  transform: rotateY(-90deg);
  background-image: var(--image-file-accelerometer-left);
}

.orientation-right {
  right: calc(-1 * var(--sys-size-5));
  transform-origin: left center;
  transform: rotateY(90deg);
  background-image: var(--image-file-accelerometer-right);
}

.orientation-left::before,
.orientation-left::after,
.orientation-right::before,
.orientation-right::after {
  content: "";
  width: var(--sys-size-5);
  height: var(--sys-size-4);
}

.orientation-left::before,
.orientation-left::after {
  background-image: var(--image-file-accelerometer-left);
}

.orientation-right::before,
.orientation-right::after {
  background-image: var(--image-file-accelerometer-right);
}

.orientation-left::before,
.orientation-right::before {
  top: calc(-1 * var(--sys-size-4));
  transform-origin: center bottom;
  transform: rotateX(26deg);
  background-position: center top;
}

.orientation-left::after,
.orientation-right::after {
  bottom: calc(-1 * var(--sys-size-4));
  transform-origin: center top;
  transform: rotateX(-25deg);
  background-position: center bottom;
}

.orientation-top,
.orientation-bottom {
  width: 50px;
  height: var(--sys-size-5);
  left: var(--sys-size-5);
  background-position: center center;
}

.orientation-top {
  top: calc(-1 * var(--sys-size-5));
  transform-origin: center bottom;
  transform: rotateX(90deg);
  background-image: var(--image-file-accelerometer-top);
}

.orientation-bottom {
  bottom: calc(-1 * var(--sys-size-5));
  transform-origin: center top;
  transform: rotateX(-90deg);
  background-image: var(--image-file-accelerometer-bottom);
}

.orientation-top::before,
.orientation-top::after,
.orientation-bottom::before,
.orientation-bottom::after {
  content: "";
  width: var(--sys-size-5);
  height: var(--sys-size-5);
}

.orientation-top::before,
.orientation-top::after {
  background-image: var(--image-file-accelerometer-top);
}

.orientation-bottom::before,
.orientation-bottom::after {
  background-image: var(--image-file-accelerometer-bottom);
}

.orientation-top::before,
.orientation-bottom::before {
  left: calc(-1 * var(--sys-size-4));
  transform-origin: right center;
  transform: rotateY(-26deg);
  background-position: left center;
}

.orientation-top::after,
.orientation-bottom::after {
  right: calc(-1 * var(--sys-size-4));
  transform-origin: left center;
  transform: rotateY(26deg);
  background-position: right center;
}

.orientation-axis-input-container {
  margin-bottom: 10px;
}

.orientation-reset-button {
  min-width: var(--sys-size-19);
}

fieldset.device-orientation-override-section {
  margin: 0;
  display: flex;
}

.panel-section-separator {
  height: var(--sys-size-1);
  margin-bottom: var(--sys-size-9);
  margin-left: calc(-1 * var(--sys-size-6));
  margin-right: calc(-1 * var(--sys-size-6));
  background: var(--sys-color-divider);
}

button.text-button {
  margin: var(--sys-size-3) 0 0 10px;
}

@media (forced-colors: active) {
  .sensors-view fieldset[disabled] {
    opacity: 100%;
  }
}

.chrome-select-label {
  margin-bottom: var(--sys-size-8);
}

/*# sourceURL=${import.meta.resolve("./sensors.css")} */`;

// ../../front_end/panels/sensors/SensorsView.ts
var UIStrings2 = {
  /**
   * @description Title for a group of cities.
   */
  location: "Location",
  /**
   * @description An option that appears in a drop-down to stop the GPS location of the user from being overridden.
   */
  noOverride: "No override",
  /**
   * @description Title of a section that contains overrides for the user's GPS location.
   */
  overrides: "Overrides",
  /**
   * @description Text of button in the Sensors view, takes the user to the Locations settings tab
   * where they can enter or edit custom locations.
   */
  manage: "Manage",
  /**
   * @description Aria-label for location manage button in the Sensors view.
   */
  manageTheListOfLocations: "Manage the list of locations",
  /**
   * @description Option in a drop-down input for selecting the GPS location of the user. As an
   * alternative to selecting a location from the list, the user can select this option and they are
   * prompted to enter the details for a new custom location.
   */
  other: "Other\u2026",
  /**
   * @description Title of a section in a drop-down input that contains error locations, for example, to select
   * a location override that says the location is not available. A noun.
   */
  error: "Error",
  /**
   * @description A type of override where the geographic location of the user is not available.
   */
  locationUnavailable: "Location unavailable",
  /**
   * @description Tooltip text telling the user how to change the value of a latitude/longitude input
   * text box. Several shortcuts are provided for convenience. The placeholder can be different
   * keyboard keys, depending on the user's settings.
   * @example {Ctrl} PH1
   */
  adjustWithMousewheelOrUpdownKeys: "Adjust with mousewheel or up/down keys. {PH1}: \xB110, Shift: \xB11, Alt: \xB10.01.",
  /**
   * @description Label for latitude of a GPS location.
   */
  latitude: "Latitude",
  /**
   * @description Label for longitude of a GPS location.
   */
  longitude: "Longitude",
  /**
   * @description Label for the ID of a timezone for a particular location.
   */
  timezoneId: "Timezone ID",
  /**
   * @description Label for the locale relevant to a custom location.
   */
  locale: "Locale",
  /**
   * @description Label for accuracy of a GPS location.
   */
  accuracy: "Accuracy",
  /**
   * @description Label for the orientation of a user's device, for example, tilt in 3D space.
   */
  orientation: "Orientation",
  /**
   * @description Option that when chosen, turns off device orientation override.
   */
  off: "Off",
  /**
   * @description Option that when chosen, allows the user to enter a custom orientation for the device, for example, tilt in 3D space.
   */
  customOrientation: "Custom orientation",
  /**
   * @description Warning to the user they should enable the device orientation override, in order to
   * enable this input which allows them to interactively select orientation by dragging a 3D phone
   * model.
   */
  enableOrientationToRotate: "Enable orientation to rotate",
  /**
   * @description Text telling the user how to use an input which allows them to interactively select
   * orientation by dragging a 3D phone model.
   */
  shiftdragHorizontallyToRotate: "Shift+drag horizontally to rotate around the y-axis",
  /**
   * @description Message in the Sensors view that is alerted (for screen readers) when the device orientation setting is changed.
   * @example {180} PH1
   * @example {-90} PH2
   * @example {0} PH3
   */
  deviceOrientationSetToAlphaSBeta: "Device orientation set to alpha: {PH1}, beta: {PH2}, gamma: {PH3}",
  /**
   * @description Text of orientation reset button in the Sensors view of the Device toolbar.
   */
  reset: "Reset",
  /**
   * @description Aria-label for orientation reset button in the Sensors view. Command.
   */
  resetDeviceOrientation: "Reset device orientation",
  /**
   * @description Description of the Touch select in the Sensors view.
   */
  forcesTouchInsteadOfClick: "Forces touch instead of click",
  /**
   * @description Description of the Emulate Idle State select in the Sensors view.
   */
  forcesSelectedIdleStateEmulation: "Forces selected idle state emulation",
  /**
   * @description Description of the Emulate CPU Performance Tier select in the Sensors view.
   */
  forcesSelectedCpuPerformanceTierEmulation: "Forces CPU performance tier emulation",
  /**
   * @description Option value for no CPU Performance override with default value
   * @example {Tier 3: HIGH} PH1
   */
  cpuPerformanceNoOverrideWithDefault: "No override ({PH1})",
  /**
   * @description Description of the Emulate CPU Pressure State select in the Sensors view.
   */
  forcesSelectedPressureStateEmulation: "Forces selected pressure state emulation",
  /**
   * @description Title for a group of configuration options in a drop-down input.
   */
  presets: "Presets",
  /**
   * @description Drop-down input option for the orientation of a device in 3D space.
   */
  portrait: "Portrait",
  /**
   * @description Drop-down input option for the orientation of a device in 3D space.
   */
  portraitUpsideDown: "Portrait upside down",
  /**
   * @description Drop-down input option for the orientation of a device in 3D space.
   */
  landscapeLeft: "Landscape left",
  /**
   * @description Drop-down input option for the orientation of a device in 3D space.
   */
  landscapeRight: "Landscape right",
  /**
   * @description Drop-down input option for the orientation of a device in 3D space. Noun indicating
   * the display of the device is pointing up.
   */
  displayUp: "Display up",
  /**
   * @description Drop-down input option for the orientation of a device in 3D space. Noun indicating
   * the display of the device is pointing down.
   */
  displayDown: "Display down",
  /**
   * @description Label for one dimension of device orientation that the user can override.
   */
  alpha: "\u03B1 (alpha)",
  /**
   * @description Label for one dimension of device orientation that the user can override.
   */
  beta: "\u03B2 (beta)",
  /**
   * @description Label for one dimension of device orientation that the user can override.
   */
  gamma: "\u03B3 (gamma)"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/sensors/SensorsView.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
var { classMap, live, styleMap } = Directives2;
var { widget } = UI2.Widget;
function selectInputContent(event) {
  event.currentTarget.select();
}
function applyValidInput(event, onChange) {
  const input = event.currentTarget;
  if (input.checkValidity()) {
    onChange(input.name, input.value.trim());
  }
}
function stepOrApplyInput(event, onChange, multiplier = 1) {
  const input = event.currentTarget;
  if (event.key === "Enter" && !event.isComposing) {
    applyValidInput(event, onChange);
    event.preventDefault();
    return;
  }
  if (input.type !== "number") {
    return;
  }
  const value = UI2.UIUtils.modifiedFloatNumber(parseFloat(input.value), event, multiplier);
  if (value === null) {
    return;
  }
  const prevValue = input.value;
  input.value = String(value);
  if (input.checkValidity()) {
    onChange(input.name, input.value.trim());
  } else {
    input.value = prevValue;
  }
  event.preventDefault();
}
function calculateRadiusVector(stage, event) {
  const rect = stage.getBoundingClientRect();
  const radius = Math.max(rect.width, rect.height) / 2;
  const sphereX = (event.x - rect.left - rect.width / 2) / radius;
  const sphereY = (event.y - rect.top - rect.height / 2) / radius;
  const sqrSum = sphereX * sphereX + sphereY * sphereY;
  if (sqrSum > 0.5) {
    return new Geometry.Vector(sphereX, sphereY, 0.5 / Math.sqrt(sqrSum));
  }
  return new Geometry.Vector(sphereX, sphereY, Math.sqrt(1 - sqrSum));
}
function startStageDrag(event, input) {
  const stage = event.currentTarget;
  UI2.UIUtils.elementDragStart(
    stage,
    (event2) => {
      if (!input.onStageDragStart(calculateRadiusVector(stage, event2))) {
        return false;
      }
      event2.consume(true);
      return true;
    },
    (event2) => {
      event2.consume(true);
      input.onStageDrag(calculateRadiusVector(stage, event2), event2.shiftKey);
    },
    null,
    "-webkit-grabbing",
    event
  );
}
function renderLocationSection(input, output) {
  return html2`
    <label class="sensors-group-title" id="location-select-label" for="location-select">${i18nString2(UIStrings2.location)}</label>
    <div class="geo-fields">
      <select
        id="location-select"
        @change=${(event) => input.onLocationSelectChange(event.currentTarget.value)}
        jslog=${VisualLogging2.dropDown().track({ change: true })}
      >
        <option value=${NonPresetOptions.NoOverride} .selected=${live(input.selectedLocationIndex === 0)} jslog=${VisualLogging2.item("no-override")}>${i18nString2(UIStrings2.noOverride)}</option>
        <optgroup label=${i18nString2(UIStrings2.overrides)}>
          ${input.customLocations.map((customLocation, i) => html2`
            <option value=${JSON.stringify(customLocation)} .selected=${live(input.selectedLocationIndex === i + 1)} jslog=${VisualLogging2.item("custom")}>${customLocation.title}</option>
          `)}
        </optgroup>
        <option value=${NonPresetOptions.Custom} .selected=${live(input.selectedLocationIndex === input.customLocations.length + 1)} jslog=${VisualLogging2.item("other")}>${i18nString2(UIStrings2.other)}</option>
        <optgroup label=${i18nString2(UIStrings2.error)}>
          <option value=${NonPresetOptions.Unavailable} .selected=${live(input.selectedLocationIndex === input.customLocations.length + 2)} jslog=${VisualLogging2.item("unavailable")}>${i18nString2(UIStrings2.locationUnavailable)}</option>
        </optgroup>
      </select>
      <devtools-button
        .variant=${Buttons2.Button.Variant.OUTLINED}
        class="manage-locations"
        @click=${input.onManageLocations}
        aria-label=${i18nString2(UIStrings2.manageTheListOfLocations)}
        jslog=${VisualLogging2.action("sensors.manage-locations").track({ click: true })}
      >
        ${i18nString2(UIStrings2.manage)}
      </devtools-button>
      <fieldset
        id="location-override-section"
        ?disabled=${!input.locationOverrideEnabled}
      >
        <div class="latlong-group">
          <!-- @ts-ignore -->
          <input
            id="latitude-input"
            type="number"
            min="-90"
            max="90"
            step="any"
            required
            .value=${String(input.location.latitude)}
            name="latitude"
            title=${input.modifierKeyMessage}
            jslog=${VisualLogging2.textField("latitude").track({ change: true })}
            ${Directives2.ref((el) => {
    output.focusLatitudeInput = el ? () => el.focus() : void 0;
  })}
            @change=${(event) => applyValidInput(event, input.onLocationFieldChange)}
            @keydown=${(event) => stepOrApplyInput(event, input.onLocationFieldChange, 0.1)}
            @focus=${selectInputContent}
          >
          <label class="latlong-title" for="latitude-input">${i18nString2(UIStrings2.latitude)}</label>
        </div>
        <div class="latlong-group">
          <!-- @ts-ignore -->
          <input
            id="longitude-input"
            type="number"
            min="-180"
            max="180"
            step="any"
            required
            .value=${String(input.location.longitude)}
            name="longitude"
            title=${input.modifierKeyMessage}
            jslog=${VisualLogging2.textField("longitude").track({ change: true })}
            @change=${(event) => applyValidInput(event, input.onLocationFieldChange)}
            @keydown=${(event) => stepOrApplyInput(event, input.onLocationFieldChange, 0.1)}
            @focus=${selectInputContent}
          >
          <label class="latlong-title" for="longitude-input">${i18nString2(UIStrings2.longitude)}</label>
        </div>
        <div class="latlong-group">
          <input
            id="timezone-input"
            type="text"
            pattern=".*[a-zA-Z].*"
            .value=${input.location.timezoneId}
            name="timezone"
            jslog=${VisualLogging2.textField("timezone").track({ change: true })}
            @change=${(event) => applyValidInput(event, input.onLocationFieldChange)}
            @keydown=${(event) => stepOrApplyInput(event, input.onLocationFieldChange)}
            @focus=${selectInputContent}
          >
          <label class="timezone-title" for="timezone-input">${i18nString2(UIStrings2.timezoneId)}</label>
          <div class="timezone-error">${input.timezoneError}</div>
        </div>
        <div class="latlong-group">
          <input
            id="locale-input"
            type="text"
            pattern=".*[a-zA-Z]{2}.*"
            .value=${input.location.locale}
            name="locale"
            jslog=${VisualLogging2.textField("locale").track({ change: true })}
            @change=${(event) => applyValidInput(event, input.onLocationFieldChange)}
            @keydown=${(event) => stepOrApplyInput(event, input.onLocationFieldChange)}
            @focus=${selectInputContent}
          >
          <label class="locale-title" for="locale-input">${i18nString2(UIStrings2.locale)}</label>
          <div class="locale-error">${input.localeError}</div>
        </div>
        <div class="latlong-group">
          <!-- @ts-ignore -->
          <input
            id="accuracy-input"
            type="number"
            min="0"
            step="any"
            .value=${String(input.location.accuracy || SDK2.EmulationModel.Location.DEFAULT_ACCURACY)}
            name="accuracy"
            jslog=${VisualLogging2.textField("accuracy").track({ change: true })}
            @change=${(event) => applyValidInput(event, input.onLocationFieldChange)}
            @keydown=${(event) => stepOrApplyInput(event, input.onLocationFieldChange)}
            @focus=${selectInputContent}
          >
          <label class="accuracy-title" for="accuracy-input">${i18nString2(UIStrings2.accuracy)}</label>
        </div>
      </fieldset>
    </div>
  `;
}
function renderDeviceOrientationSection(input, output) {
  const orientationOffOption = {
    title: i18nString2(UIStrings2.off),
    orientation: NonPresetOptions.NoOverride,
    jslogContext: "off"
  };
  const customOrientationOption = {
    title: i18nString2(UIStrings2.customOrientation),
    orientation: NonPresetOptions.Custom
  };
  const orientationGroups = [{
    title: i18nString2(UIStrings2.presets),
    value: [
      { title: i18nString2(UIStrings2.portrait), orientation: "[0, 90, 0]", jslogContext: "portrait" },
      {
        title: i18nString2(UIStrings2.portraitUpsideDown),
        orientation: "[180, -90, 0]",
        jslogContext: "portrait-upside-down"
      },
      { title: i18nString2(UIStrings2.landscapeLeft), orientation: "[90, 0, -90]", jslogContext: "landscape-left" },
      { title: i18nString2(UIStrings2.landscapeRight), orientation: "[90, -180, -90]", jslogContext: "landscape-right" },
      { title: i18nString2(UIStrings2.displayUp), orientation: "[0, 0, 0]", jslogContext: "display-up" },
      { title: i18nString2(UIStrings2.displayDown), orientation: "[0, -180, 0]", jslogContext: "displayUp-down" }
    ]
  }];
  const roundAngle = (angle) => String(Math.round(angle * 1e4) / 1e4);
  return html2`
      <label class="sensors-group-title" for="orientation-select">${i18nString2(UIStrings2.orientation)}</label>
      <div class="orientation-content">
        <div class="orientation-fields">
          <select
            id="orientation-select"
            @change=${(event) => input.onOrientationSelectChange(event.currentTarget.value)}
            jslog=${VisualLogging2.dropDown().track({ change: true })}
          >
            <option value=${orientationOffOption.orientation} .selected=${live(input.selectedOrientation === orientationOffOption.orientation)} jslog=${VisualLogging2.item(orientationOffOption.jslogContext)}>${orientationOffOption.title}</option>
            <option value=${customOrientationOption.orientation} .selected=${live(input.selectedOrientation === customOrientationOption.orientation)} jslog=${VisualLogging2.item("custom")}>${customOrientationOption.title}</option>
            ${orientationGroups.map((group) => html2`
              <optgroup label=${group.title}>
                ${group.value.map((preset) => html2`
                  <option value=${preset.orientation} .selected=${live(input.selectedOrientation === preset.orientation)} jslog=${VisualLogging2.item(preset.jslogContext)}>${preset.title}</option>
                `)}
              </optgroup>
            `)}
          </select>
          <fieldset
            class="device-orientation-override-section"
            ?disabled=${!input.orientationOverrideEnabled}
          >
            <div class="orientation-inputs-cell">
              <div class="orientation-axis-input-container">
                <!-- @ts-ignore -->
                <input
                  id="alpha-input"
                  type="number"
                  min="0"
                  max="359.9999"
                  step="any"
                  required
                  .value=${roundAngle(input.orientation.alpha)}
                  name="alpha"
                  ${Directives2.ref((el) => {
    output.focusAlphaInput = el ? () => el.focus() : void 0;
  })}
                  @change=${(event) => applyValidInput(event, input.onOrientationFieldChange)}
                  @keydown=${(event) => stepOrApplyInput(event, input.onOrientationFieldChange)}
                  @focus=${selectInputContent}
                >
                <label for="alpha-input">${i18nString2(UIStrings2.alpha)}</label>
              </div>
              <div class="orientation-axis-input-container">
                <!-- @ts-ignore -->
                <input
                  id="beta-input"
                  type="number"
                  min="-180"
                  max="179.9999"
                  step="any"
                  required
                  .value=${roundAngle(input.orientation.beta)}
                  name="beta"
                  @change=${(event) => applyValidInput(event, input.onOrientationFieldChange)}
                  @keydown=${(event) => stepOrApplyInput(event, input.onOrientationFieldChange)}
                  @focus=${selectInputContent}
                >
                <label for="beta-input">${i18nString2(UIStrings2.beta)}</label>
              </div>
              <div class="orientation-axis-input-container">
                <!-- @ts-ignore -->
                <input
                  id="gamma-input"
                  type="number"
                  min="-90"
                  max="89.9999"
                  step="any"
                  required
                  .value=${roundAngle(input.orientation.gamma)}
                  name="gamma"
                  @change=${(event) => applyValidInput(event, input.onOrientationFieldChange)}
                  @keydown=${(event) => stepOrApplyInput(event, input.onOrientationFieldChange)}
                  @focus=${selectInputContent}
                >
                <label for="gamma-input">${i18nString2(UIStrings2.gamma)}</label>
              </div>
              <devtools-button
                .variant=${Buttons2.Button.Variant.OUTLINED}
                class="orientation-reset-button"
                type="reset"
                aria-label=${i18nString2(UIStrings2.resetDeviceOrientation)}
                @click=${input.onOrientationReset}
                jslog=${VisualLogging2.action("sensors.reset-device-orientiation").track({ click: true })}
              >
                ${i18nString2(UIStrings2.reset)}
              </devtools-button>
            </div>
          </fieldset>
        </div>
        <div
          class="orientation-stage ${classMap({ disabled: !input.orientationOverrideEnabled, "is-animating": input.animateOrientation })}"
          title=${input.orientationOverrideEnabled ? i18nString2(UIStrings2.shiftdragHorizontallyToRotate) : i18nString2(UIStrings2.enableOrientationToRotate)}
          jslog=${VisualLogging2.preview().track({ drag: true })}
          @pointerdown=${(event) => startStageDrag(event, input)}
        >
          <div class="orientation-layer" style=${styleMap({ transform: `rotateY(${input.orientation.alpha}deg) rotateX(${-input.orientation.beta}deg) rotateZ(${input.orientation.gamma}deg)` })}>
            <section
              class="orientation-box orientation-element"
            >
              <section class="orientation-front orientation-element"></section>
              <section class="orientation-top orientation-element"></section>
              <section class="orientation-back orientation-element"></section>
              <section class="orientation-left orientation-element"></section>
              <section class="orientation-right orientation-element"></section>
              <section class="orientation-bottom orientation-element"></section>
            </section>
          </div>
        </div>
      </div>
    `;
}
var DEFAULT_VIEW2 = (input, output, target) => {
  render2(html2`
    <style>${sensors_css_default}</style>
    <div class="sensors-view">
      <section class="sensors-group" jslog=${VisualLogging2.section("location")}>
        ${renderLocationSection(input, output)}
      </section>
      <div class="panel-section-separator"></div>
      <section class="sensors-group" jslog=${VisualLogging2.section("device-orientation")}>
        ${renderDeviceOrientationSection(input, output)}
      </section>
      <div class="panel-section-separator"></div>
      <div class="touch-section">
        ${SettingsUI2.SettingsUI.renderControlForSetting(
    input.touchSetting,
    i18nString2(UIStrings2.forcesTouchInsteadOfClick)
  )}
      </div>
      <div class="panel-section-separator"></div>
      <div class="idle-section">
        ${SettingsUI2.SettingsUI.renderControlForSetting(
    input.idleDetectionSetting,
    i18nString2(UIStrings2.forcesSelectedIdleStateEmulation)
  )}
      </div>
      <div class="panel-section-separator"></div>
      ${widget(MobileThrottling.ThrottlingManager.HardwareConcurrencySelector)}
      <div class="panel-section-separator"></div>
      <div class="pressure-section">
        ${SettingsUI2.SettingsUI.renderControlForSetting(
    input.cpuPressureSetting,
    i18nString2(UIStrings2.forcesSelectedPressureStateEmulation)
  )}
      </div>
      <div class="panel-section-separator"></div>
      <div class="cpu-performance-section">
        ${SettingsUI2.SettingsUI.renderSettingSelect(
    input.cpuPerformanceSetting,
    i18nString2(UIStrings2.forcesSelectedCpuPerformanceTierEmulation),
    false,
    /* @__PURE__ */ new Map([["no-override", input.cpuPerformanceNoOverrideLabel]])
  )}
      </div>
      <div class="panel-section-separator"></div>
    </div>`, target, {
    container: { attributes: { jslog: `${VisualLogging2.panel("sensors").track({ resize: true })}` } }
  });
};
var SensorsView = class extends UI2.Widget.VBox {
  static INJECT = [Common2.Settings.Settings, SDK2.TargetManager.TargetManager, SDK2.CPUThrottlingManager.CPUThrottlingManager];
  #view;
  #output = {};
  #locationSetting;
  #location;
  #locationOverrideEnabled;
  // Whether "Other…" is selected, even if the location matches one of the custom locations.
  #customLocationSelected = false;
  #customLocationsSetting;
  #timezoneError = "";
  #localeError = "";
  #deviceOrientationSetting;
  #deviceOrientation;
  #deviceOrientationOverrideEnabled;
  #selectedOrientation = NonPresetOptions.NoOverride;
  #animateOrientation = false;
  // The input to focus after the next update. Set when a custom location or orientation is selected.
  #inputToFocus;
  #boxMatrix;
  #mouseDownVector;
  #originalBoxMatrix;
  #settings;
  #targetManager;
  #cpuThrottlingManager;
  constructor(element, [settings, targetManager, cpuThrottlingManager], view = DEFAULT_VIEW2) {
    super(element, { useShadowDom: "pure" });
    this.#view = view;
    this.#settings = settings;
    this.#targetManager = targetManager;
    this.#cpuThrottlingManager = cpuThrottlingManager;
    this.#locationSetting = settings.createSetting("emulation.location-override", "");
    this.#location = SDK2.EmulationModel.Location.parseSetting(this.#locationSetting.get());
    this.#locationOverrideEnabled = false;
    this.#customLocationsSetting = settings.resolve(SettingUIRegistration.EmulationSettings.emulationLocationsSettingDescriptor);
    this.#deviceOrientationSetting = settings.createSetting("emulation.device-orientation-override", "");
    this.#deviceOrientation = SDK2.EmulationModel.DeviceOrientation.parseSetting(this.#deviceOrientationSetting.get());
    this.#deviceOrientationOverrideEnabled = false;
    this.#setBoxOrientation(false);
  }
  performUpdate() {
    const customLocations = this.#customLocationsSetting.get();
    const input = {
      location: this.#location,
      locationOverrideEnabled: this.#locationOverrideEnabled,
      customLocations,
      selectedLocationIndex: this.#selectedLocationIndex(customLocations),
      timezoneError: this.#timezoneError,
      localeError: this.#localeError,
      modifierKeyMessage: i18nString2(UIStrings2.adjustWithMousewheelOrUpdownKeys, { PH1: Host.Platform.isMac() ? "\u2318" : "Ctrl" }),
      onManageLocations: () => Common2.Revealer.reveal(this.#customLocationsSetting),
      onLocationSelectChange: this.#locationSelectChanged.bind(this),
      onLocationFieldChange: this.#applyLocationUserInput.bind(this),
      orientation: this.#deviceOrientation,
      orientationOverrideEnabled: this.#deviceOrientationOverrideEnabled,
      selectedOrientation: this.#selectedOrientation,
      animateOrientation: this.#animateOrientation,
      onOrientationSelectChange: this.#orientationSelectChanged.bind(this),
      onOrientationFieldChange: this.#applyDeviceOrientationUserInput.bind(this),
      onOrientationReset: this.#resetDeviceOrientation.bind(this),
      onStageDragStart: this.#onBoxDragStart.bind(this),
      onStageDrag: this.#onBoxDrag.bind(this),
      touchSetting: this.#settings.resolve(SDK2.SDKSettings.touchSettingDescriptor),
      idleDetectionSetting: this.#settings.resolve(SDK2.SDKSettings.idleDetectionSettingDescriptor),
      cpuPressureSetting: this.#settings.resolve(SDK2.SDKSettings.cpuPressureSettingDescriptor),
      cpuPerformanceSetting: this.#settings.resolve(SDK2.SDKSettings.cpuPerformanceSettingDescriptor),
      cpuPerformanceNoOverrideLabel: this.#cpuPerformanceNoOverrideLabel()
    };
    this.#view(input, this.#output, this.contentElement);
    if (this.isShowing()) {
      if (this.#inputToFocus === "latitude") {
        this.#output.focusLatitudeInput?.();
      } else if (this.#inputToFocus === "alpha") {
        this.#output.focusAlphaInput?.();
      }
    }
    this.#inputToFocus = void 0;
  }
  /** @returns the index of the selected option of the location select. */
  #selectedLocationIndex(customLocations) {
    const location = this.#location;
    let selectedIndex = 0;
    if (this.#locationOverrideEnabled) {
      if (location.unavailable) {
        selectedIndex = customLocations.length + 2;
      } else if (this.#customLocationSelected) {
        selectedIndex = customLocations.length + 1;
      } else {
        selectedIndex = customLocations.length + 1;
        for (const [i, customLocation] of customLocations.entries()) {
          if (location.latitude === customLocation.lat && location.longitude === customLocation.long && location.timezoneId === customLocation.timezoneId && location.locale === customLocation.locale) {
            selectedIndex = i + 1;
            break;
          }
        }
      }
    }
    return selectedIndex;
  }
  #locationSelectChanged(value) {
    this.#timezoneError = "";
    this.#localeError = "";
    this.#customLocationSelected = value === NonPresetOptions.Custom;
    this.#inputToFocus = value === NonPresetOptions.Custom ? "latitude" : void 0;
    if (value === NonPresetOptions.NoOverride) {
      this.#locationOverrideEnabled = false;
      this.#location = SDK2.EmulationModel.Location.parseSetting("");
    } else if (value === NonPresetOptions.Custom || value === NonPresetOptions.Unavailable) {
      this.#locationOverrideEnabled = true;
      const { latitude, longitude, timezoneId, locale, accuracy } = this.#location;
      this.#location = new SDK2.EmulationModel.Location(
        latitude,
        longitude,
        timezoneId,
        locale,
        accuracy,
        value === NonPresetOptions.Unavailable
      );
    } else {
      this.#locationOverrideEnabled = true;
      const coordinates = JSON.parse(value);
      this.#location = new SDK2.EmulationModel.Location(
        coordinates.lat,
        coordinates.long,
        coordinates.timezoneId,
        coordinates.locale,
        coordinates.accuracy || SDK2.EmulationModel.Location.DEFAULT_ACCURACY,
        false
      );
    }
    this.#applyLocation();
    this.requestUpdate();
  }
  #applyLocationUserInput(name, value) {
    const { latitude, longitude, timezoneId: timezone, locale, accuracy } = this.#location;
    const values = {
      latitude: String(latitude),
      longitude: String(longitude),
      timezone,
      locale,
      accuracy: String(accuracy),
      [name]: value
    };
    const location = SDK2.EmulationModel.Location.parseUserInput(
      values.latitude,
      values.longitude,
      values.timezone,
      values.locale,
      values.accuracy
    );
    if (!location) {
      return;
    }
    this.#timezoneError = "";
    this.#localeError = "";
    this.#customLocationSelected = true;
    this.#location = location;
    this.#applyLocation();
    this.requestUpdate();
  }
  #applyLocation() {
    if (this.#locationOverrideEnabled) {
      this.#locationSetting.set(this.#location.toSetting());
    } else {
      this.#locationSetting.set("");
    }
    for (const emulationModel of this.#targetManager.models(SDK2.EmulationModel.EmulationModel)) {
      emulationModel.emulateLocation(this.#locationOverrideEnabled ? this.#location : null).catch((err) => {
        switch (err.type) {
          case "emulation-set-timezone": {
            this.#timezoneError = err.message;
            break;
          }
          case "emulation-set-locale": {
            this.#localeError = err.message;
            break;
          }
        }
        this.requestUpdate();
      });
    }
  }
  wasShown() {
    super.wasShown();
    this.#cpuThrottlingManager.addEventListener(
      SDK2.CPUThrottlingManager.Events.CPU_PERFORMANCE_TIER_CHANGED,
      this.requestUpdate,
      this
    );
    this.#cpuThrottlingManager.addEventListener(SDK2.CPUThrottlingManager.Events.RATE_CHANGED, this.requestUpdate, this);
    this.#customLocationsSetting.addChangeListener(this.requestUpdate, this);
    this.requestUpdate();
  }
  willHide() {
    super.willHide();
    this.#customLocationsSetting.removeChangeListener(this.requestUpdate, this);
    this.#cpuThrottlingManager.removeEventListener(
      SDK2.CPUThrottlingManager.Events.CPU_PERFORMANCE_TIER_CHANGED,
      this.requestUpdate,
      this
    );
    this.#cpuThrottlingManager.removeEventListener(
      SDK2.CPUThrottlingManager.Events.RATE_CHANGED,
      this.requestUpdate,
      this
    );
    this.#inputToFocus = void 0;
  }
  #cpuPerformanceNoOverrideLabel() {
    const options = SettingUIRegistration.SettingUIRegistration.maybeResolve(SDK2.SDKSettings.cpuPerformanceSettingDescriptor)?.options ?? [];
    const getOptionTitle = (value) => {
      const opt = options.find((o) => o.value === value);
      if (!opt) {
        return "";
      }
      return opt.title;
    };
    const getFallbackTitle = (tier) => {
      return `Tier ${SDK2.CPUThrottlingManager.tierToNumber(tier)}: ${tier.toUpperCase()}`;
    };
    const calculatedTier = this.#cpuThrottlingManager.calculatedCPUPerformanceTier();
    if (calculatedTier !== void 0) {
      const tierTitle = getOptionTitle(calculatedTier) || getFallbackTitle(calculatedTier);
      return i18nString2(UIStrings2.cpuPerformanceNoOverrideWithDefault, { PH1: tierTitle });
    }
    return getOptionTitle("no-override") || "No override";
  }
  #orientationSelectChanged(value) {
    this.#selectedOrientation = value;
    this.#inputToFocus = value === NonPresetOptions.Custom ? "alpha" : void 0;
    this.#deviceOrientationOverrideEnabled = value !== NonPresetOptions.NoOverride;
    if (value === NonPresetOptions.NoOverride) {
      this.#applyDeviceOrientation();
      this.requestUpdate();
    } else if (value === NonPresetOptions.Custom) {
      this.#resetDeviceOrientation();
    } else {
      const parsedValue = JSON.parse(value);
      this.#deviceOrientation = new SDK2.EmulationModel.DeviceOrientation(parsedValue[0], parsedValue[1], parsedValue[2]);
      this.#setDeviceOrientation(this.#deviceOrientation, "selectPreset" /* SELECT_PRESET */);
    }
  }
  #applyDeviceOrientation() {
    if (this.#deviceOrientationOverrideEnabled) {
      this.#deviceOrientationSetting.set(this.#deviceOrientation.toSetting());
    }
    for (const emulationModel of this.#targetManager.models(SDK2.EmulationModel.EmulationModel)) {
      void emulationModel.emulateDeviceOrientation(this.#deviceOrientationOverrideEnabled ? this.#deviceOrientation : null);
    }
  }
  #applyDeviceOrientationUserInput(name, value) {
    const { alpha, beta, gamma } = this.#deviceOrientation;
    const values = { alpha: String(alpha), beta: String(beta), gamma: String(gamma), [name]: value };
    this.#selectedOrientation = NonPresetOptions.Custom;
    this.#setDeviceOrientation(
      SDK2.EmulationModel.DeviceOrientation.parseUserInput(values.alpha, values.beta, values.gamma),
      "userInput" /* USER_INPUT */
    );
  }
  #resetDeviceOrientation() {
    this.#selectedOrientation = "[0, 90, 0]";
    this.#setDeviceOrientation(
      new SDK2.EmulationModel.DeviceOrientation(0, 90, 0),
      "resetButton" /* RESET_BUTTON */
    );
  }
  #setDeviceOrientation(deviceOrientation, modificationSource) {
    if (!deviceOrientation) {
      return;
    }
    const animate = modificationSource !== "userDrag" /* USER_DRAG */;
    this.#deviceOrientation = deviceOrientation;
    this.#setBoxOrientation(animate);
    this.#applyDeviceOrientation();
    this.requestUpdate();
    UI2.ARIAUtils.LiveAnnouncer.alert(i18nString2(
      UIStrings2.deviceOrientationSetToAlphaSBeta,
      { PH1: deviceOrientation.alpha, PH2: deviceOrientation.beta, PH3: deviceOrientation.gamma }
    ));
  }
  #setBoxOrientation(animate) {
    this.#animateOrientation = animate;
    const { alpha, beta, gamma } = this.#deviceOrientation;
    this.#boxMatrix = new DOMMatrixReadOnly().rotate(0, 0, alpha).rotate(beta, 0, 0).rotate(0, gamma, 0);
  }
  #onBoxDrag(mouseMoveVector, shiftKey) {
    if (!this.#mouseDownVector) {
      return;
    }
    let axis, angle;
    if (shiftKey) {
      axis = new Geometry.Vector(0, 0, 1);
      angle = (mouseMoveVector.x - this.#mouseDownVector.x) * ShiftDragOrientationSpeed;
    } else {
      axis = Geometry.crossProduct(this.#mouseDownVector, mouseMoveVector);
      angle = Geometry.calculateAngle(this.#mouseDownVector, mouseMoveVector);
    }
    const currentMatrix = new DOMMatrixReadOnly().rotateAxisAngle(-axis.x, axis.z, axis.y, angle).multiply(this.#originalBoxMatrix);
    const eulerAngles = Geometry.EulerAngles.fromDeviceOrientationRotationMatrix(currentMatrix);
    const newOrientation = new SDK2.EmulationModel.DeviceOrientation(eulerAngles.alpha, eulerAngles.beta, eulerAngles.gamma);
    this.#selectedOrientation = NonPresetOptions.Custom;
    this.#setDeviceOrientation(newOrientation, "userDrag" /* USER_DRAG */);
  }
  #onBoxDragStart(mouseDownVector) {
    if (!this.#deviceOrientationOverrideEnabled) {
      return false;
    }
    this.#mouseDownVector = mouseDownVector;
    this.#originalBoxMatrix = this.#boxMatrix;
    return true;
  }
};
var NonPresetOptions = {
  NoOverride: "noOverride",
  Custom: "custom",
  Unavailable: "unavailable"
};
var ShiftDragOrientationSpeed = 16;
export {
  LocationsSettingsTab_exports as LocationsSettingsTab,
  SensorsView_exports as SensorsView
};
//# sourceMappingURL=sensors.js.map
