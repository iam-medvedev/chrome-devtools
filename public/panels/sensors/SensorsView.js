// Copyright 2015 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as Geometry from '../../ui/geometry/geometry.js';
import * as SettingsUI from '../../ui/legacy/components/settings_ui/settings_ui.js';
import * as UI from '../../ui/legacy/legacy.js';
import { Directives, html, render } from '../../ui/lit/lit.js';
import * as SettingUIRegistration from '../../ui/settings/settings.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import * as MobileThrottling from '../mobile_throttling/mobile_throttling.js';
import sensorsStyles from './sensors.css.js';
const UIStrings = {
    /**
     * @description Title for a group of cities.
     */
    location: 'Location',
    /**
     * @description An option that appears in a drop-down to stop the GPS location of the user from being overridden.
     */
    noOverride: 'No override',
    /**
     * @description Title of a section that contains overrides for the user's GPS location.
     */
    overrides: 'Overrides',
    /**
     * @description Text of button in the Sensors view, takes the user to the Locations settings tab
     * where they can enter or edit custom locations.
     */
    manage: 'Manage',
    /**
     * @description Aria-label for location manage button in the Sensors view.
     */
    manageTheListOfLocations: 'Manage the list of locations',
    /**
     * @description Option in a drop-down input for selecting the GPS location of the user. As an
     * alternative to selecting a location from the list, the user can select this option and they are
     * prompted to enter the details for a new custom location.
     */
    other: 'Other…',
    /**
     * @description Title of a section in a drop-down input that contains error locations, for example, to select
     * a location override that says the location is not available. A noun.
     */
    error: 'Error',
    /**
     * @description A type of override where the geographic location of the user is not available.
     */
    locationUnavailable: 'Location unavailable',
    /**
     * @description Tooltip text telling the user how to change the value of a latitude/longitude input
     * text box. Several shortcuts are provided for convenience. The placeholder can be different
     * keyboard keys, depending on the user's settings.
     * @example {Ctrl} PH1
     */
    adjustWithMousewheelOrUpdownKeys: 'Adjust with mousewheel or up/down keys. {PH1}: ±10, Shift: ±1, Alt: ±0.01.',
    /**
     * @description Label for latitude of a GPS location.
     */
    latitude: 'Latitude',
    /**
     * @description Label for longitude of a GPS location.
     */
    longitude: 'Longitude',
    /**
     * @description Label for the ID of a timezone for a particular location.
     */
    timezoneId: 'Timezone ID',
    /**
     * @description Label for the locale relevant to a custom location.
     */
    locale: 'Locale',
    /**
     * @description Label for accuracy of a GPS location.
     */
    accuracy: 'Accuracy',
    /**
     * @description Label for the orientation of a user's device, for example, tilt in 3D space.
     */
    orientation: 'Orientation',
    /**
     * @description Option that when chosen, turns off device orientation override.
     */
    off: 'Off',
    /**
     * @description Option that when chosen, allows the user to enter a custom orientation for the device, for example, tilt in 3D space.
     */
    customOrientation: 'Custom orientation',
    /**
     * @description Warning to the user they should enable the device orientation override, in order to
     * enable this input which allows them to interactively select orientation by dragging a 3D phone
     * model.
     */
    enableOrientationToRotate: 'Enable orientation to rotate',
    /**
     * @description Text telling the user how to use an input which allows them to interactively select
     * orientation by dragging a 3D phone model.
     */
    shiftdragHorizontallyToRotate: 'Shift+drag horizontally to rotate around the y-axis',
    /**
     * @description Message in the Sensors view that is alerted (for screen readers) when the device orientation setting is changed.
     * @example {180} PH1
     * @example {-90} PH2
     * @example {0} PH3
     */
    deviceOrientationSetToAlphaSBeta: 'Device orientation set to alpha: {PH1}, beta: {PH2}, gamma: {PH3}',
    /**
     * @description Text of orientation reset button in the Sensors view of the Device toolbar.
     */
    reset: 'Reset',
    /**
     * @description Aria-label for orientation reset button in the Sensors view. Command.
     */
    resetDeviceOrientation: 'Reset device orientation',
    /**
     * @description Description of the Touch select in the Sensors view.
     */
    forcesTouchInsteadOfClick: 'Forces touch instead of click',
    /**
     * @description Description of the Emulate Idle State select in the Sensors view.
     */
    forcesSelectedIdleStateEmulation: 'Forces selected idle state emulation',
    /**
     * @description Description of the Emulate CPU Performance Tier select in the Sensors view.
     */
    forcesSelectedCpuPerformanceTierEmulation: 'Forces CPU performance tier emulation',
    /**
     * @description Option value for no CPU Performance override with default value
     * @example {Tier 3: HIGH} PH1
     */
    cpuPerformanceNoOverrideWithDefault: 'No override ({PH1})',
    /**
     * @description Description of the Emulate CPU Pressure State select in the Sensors view.
     */
    forcesSelectedPressureStateEmulation: 'Forces selected pressure state emulation',
    /**
     * @description Title for a group of configuration options in a drop-down input.
     */
    presets: 'Presets',
    /**
     * @description Drop-down input option for the orientation of a device in 3D space.
     */
    portrait: 'Portrait',
    /**
     * @description Drop-down input option for the orientation of a device in 3D space.
     */
    portraitUpsideDown: 'Portrait upside down',
    /**
     * @description Drop-down input option for the orientation of a device in 3D space.
     */
    landscapeLeft: 'Landscape left',
    /**
     * @description Drop-down input option for the orientation of a device in 3D space.
     */
    landscapeRight: 'Landscape right',
    /**
     * @description Drop-down input option for the orientation of a device in 3D space. Noun indicating
     * the display of the device is pointing up.
     */
    displayUp: 'Display up',
    /**
     * @description Drop-down input option for the orientation of a device in 3D space. Noun indicating
     * the display of the device is pointing down.
     */
    displayDown: 'Display down',
    /**
     * @description Label for one dimension of device orientation that the user can override.
     */
    alpha: '\u03B1 (alpha)',
    /**
     * @description Label for one dimension of device orientation that the user can override.
     */
    beta: '\u03B2 (beta)',
    /**
     * @description Label for one dimension of device orientation that the user can override.
     */
    gamma: '\u03B3 (gamma)',
};
const str_ = i18n.i18n.registerUIStrings('panels/sensors/SensorsView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const { classMap, live, styleMap } = Directives;
const { widget } = UI.Widget;
function selectInputContent(event) {
    event.currentTarget.select();
}
/** Reports the name and the value of the input that dispatched `event`, if the value is valid. */
function applyValidInput(event, onChange) {
    const input = event.currentTarget;
    if (input.checkValidity()) {
        onChange(input.name, input.value.trim());
    }
}
/**
 * Applies the value of the input that dispatched `event` on Enter. For number inputs the value is
 * also adjusted with the up/down keys, in steps that are scaled by `multiplier`.
 */
function stepOrApplyInput(event, onChange, multiplier = 1) {
    const input = event.currentTarget;
    if (event.key === 'Enter' && !event.isComposing) {
        applyValidInput(event, onChange);
        event.preventDefault();
        return;
    }
    if (input.type !== 'number') {
        return;
    }
    const value = UI.UIUtils.modifiedFloatNumber(parseFloat(input.value), event, multiplier);
    if (value === null) {
        return;
    }
    const prevValue = input.value;
    input.value = String(value);
    if (input.checkValidity()) {
        onChange(input.name, input.value.trim());
    }
    else {
        // If ArrowUp/ArrowDown adjusts the value out of bounds, we reset it.
        input.value = prevValue;
    }
    event.preventDefault();
}
/** Maps the position of a mouse event to a point on a virtual sphere around the center of `stage`. */
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
/** Starts a drag of the orientation stage. The handlers are read from `input` for every drag. */
function startStageDrag(event, input) {
    const stage = event.currentTarget;
    UI.UIUtils.elementDragStart(stage, event => {
        if (!input.onStageDragStart(calculateRadiusVector(stage, event))) {
            return false;
        }
        event.consume(true);
        return true;
    }, event => {
        event.consume(true);
        input.onStageDrag(calculateRadiusVector(stage, event), event.shiftKey);
    }, null, '-webkit-grabbing', event);
}
function renderLocationSection(input, output) {
    // clang-format off
    return html `
    <label class="sensors-group-title" id="location-select-label" for="location-select">${i18nString(UIStrings.location)}</label>
    <div class="geo-fields">
      <select
        id="location-select"
        @change=${(event) => input.onLocationSelectChange(event.currentTarget.value)}
        jslog=${VisualLogging.dropDown().track({ change: true })}
      >
        <option value=${NonPresetOptions.NoOverride} .selected=${live(input.selectedLocationIndex === 0)} jslog=${VisualLogging.item('no-override')}>${i18nString(UIStrings.noOverride)}</option>
        <optgroup label=${i18nString(UIStrings.overrides)}>
          ${input.customLocations.map((customLocation, i) => html `
            <option value=${JSON.stringify(customLocation)} .selected=${live(input.selectedLocationIndex === i + 1)} jslog=${VisualLogging.item('custom')}>${customLocation.title}</option>
          `)}
        </optgroup>
        <option value=${NonPresetOptions.Custom} .selected=${live(input.selectedLocationIndex === input.customLocations.length + 1)} jslog=${VisualLogging.item('other')}>${i18nString(UIStrings.other)}</option>
        <optgroup label=${i18nString(UIStrings.error)}>
          <option value=${NonPresetOptions.Unavailable} .selected=${live(input.selectedLocationIndex === input.customLocations.length + 2)} jslog=${VisualLogging.item('unavailable')}>${i18nString(UIStrings.locationUnavailable)}</option>
        </optgroup>
      </select>
      <devtools-button
        .variant=${"outlined" /* Buttons.Button.Variant.OUTLINED */}
        class="manage-locations"
        @click=${input.onManageLocations}
        aria-label=${i18nString(UIStrings.manageTheListOfLocations)}
        jslog=${VisualLogging.action('sensors.manage-locations').track({ click: true })}
      >
        ${i18nString(UIStrings.manage)}
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
            jslog=${VisualLogging.textField('latitude').track({ change: true })}
            ${Directives.ref((el) => { output.focusLatitudeInput = el ? () => el.focus() : undefined; })}
            @change=${(event) => applyValidInput(event, input.onLocationFieldChange)}
            @keydown=${(event) => stepOrApplyInput(event, input.onLocationFieldChange, 0.1)}
            @focus=${selectInputContent}
          >
          <label class="latlong-title" for="latitude-input">${i18nString(UIStrings.latitude)}</label>
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
            jslog=${VisualLogging.textField('longitude').track({ change: true })}
            @change=${(event) => applyValidInput(event, input.onLocationFieldChange)}
            @keydown=${(event) => stepOrApplyInput(event, input.onLocationFieldChange, 0.1)}
            @focus=${selectInputContent}
          >
          <label class="latlong-title" for="longitude-input">${i18nString(UIStrings.longitude)}</label>
        </div>
        <div class="latlong-group">
          <input
            id="timezone-input"
            type="text"
            pattern=".*[a-zA-Z].*"
            .value=${input.location.timezoneId}
            name="timezone"
            jslog=${VisualLogging.textField('timezone').track({ change: true })}
            @change=${(event) => applyValidInput(event, input.onLocationFieldChange)}
            @keydown=${(event) => stepOrApplyInput(event, input.onLocationFieldChange)}
            @focus=${selectInputContent}
          >
          <label class="timezone-title" for="timezone-input">${i18nString(UIStrings.timezoneId)}</label>
          <div class="timezone-error">${input.timezoneError}</div>
        </div>
        <div class="latlong-group">
          <input
            id="locale-input"
            type="text"
            pattern=".*[a-zA-Z]{2}.*"
            .value=${input.location.locale}
            name="locale"
            jslog=${VisualLogging.textField('locale').track({ change: true })}
            @change=${(event) => applyValidInput(event, input.onLocationFieldChange)}
            @keydown=${(event) => stepOrApplyInput(event, input.onLocationFieldChange)}
            @focus=${selectInputContent}
          >
          <label class="locale-title" for="locale-input">${i18nString(UIStrings.locale)}</label>
          <div class="locale-error">${input.localeError}</div>
        </div>
        <div class="latlong-group">
          <!-- @ts-ignore -->
          <input
            id="accuracy-input"
            type="number"
            min="0"
            step="any"
            .value=${String(input.location.accuracy || SDK.EmulationModel.Location.DEFAULT_ACCURACY)}
            name="accuracy"
            jslog=${VisualLogging.textField('accuracy').track({ change: true })}
            @change=${(event) => applyValidInput(event, input.onLocationFieldChange)}
            @keydown=${(event) => stepOrApplyInput(event, input.onLocationFieldChange)}
            @focus=${selectInputContent}
          >
          <label class="accuracy-title" for="accuracy-input">${i18nString(UIStrings.accuracy)}</label>
        </div>
      </fieldset>
    </div>
  `;
    // clang-format on
}
function renderDeviceOrientationSection(input, output) {
    const orientationOffOption = {
        title: i18nString(UIStrings.off),
        orientation: NonPresetOptions.NoOverride,
        jslogContext: 'off',
    };
    const customOrientationOption = {
        title: i18nString(UIStrings.customOrientation),
        orientation: NonPresetOptions.Custom,
    };
    const orientationGroups = [{
            title: i18nString(UIStrings.presets),
            value: [
                { title: i18nString(UIStrings.portrait), orientation: '[0, 90, 0]', jslogContext: 'portrait' },
                {
                    title: i18nString(UIStrings.portraitUpsideDown),
                    orientation: '[180, -90, 0]',
                    jslogContext: 'portrait-upside-down',
                },
                { title: i18nString(UIStrings.landscapeLeft), orientation: '[90, 0, -90]', jslogContext: 'landscape-left' },
                { title: i18nString(UIStrings.landscapeRight), orientation: '[90, -180, -90]', jslogContext: 'landscape-right' },
                { title: i18nString(UIStrings.displayUp), orientation: '[0, 0, 0]', jslogContext: 'display-up' },
                { title: i18nString(UIStrings.displayDown), orientation: '[0, -180, 0]', jslogContext: 'displayUp-down' },
            ],
        }];
    // The angles are not rounded in the state, only when they are shown in the inputs.
    const roundAngle = (angle) => String(Math.round(angle * 10000) / 10000);
    // clang-format off
    return html `
      <label class="sensors-group-title" for="orientation-select">${i18nString(UIStrings.orientation)}</label>
      <div class="orientation-content">
        <div class="orientation-fields">
          <select
            id="orientation-select"
            @change=${(event) => input.onOrientationSelectChange(event.currentTarget.value)}
            jslog=${VisualLogging.dropDown().track({ change: true })}
          >
            <option value=${orientationOffOption.orientation} .selected=${live(input.selectedOrientation === orientationOffOption.orientation)} jslog=${VisualLogging.item(orientationOffOption.jslogContext)}>${orientationOffOption.title}</option>
            <option value=${customOrientationOption.orientation} .selected=${live(input.selectedOrientation === customOrientationOption.orientation)} jslog=${VisualLogging.item('custom')}>${customOrientationOption.title}</option>
            ${orientationGroups.map(group => html `
              <optgroup label=${group.title}>
                ${group.value.map(preset => html `
                  <option value=${preset.orientation} .selected=${live(input.selectedOrientation === preset.orientation)} jslog=${VisualLogging.item(preset.jslogContext)}>${preset.title}</option>
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
                  ${Directives.ref((el) => { output.focusAlphaInput = el ? () => el.focus() : undefined; })}
                  @change=${(event) => applyValidInput(event, input.onOrientationFieldChange)}
                  @keydown=${(event) => stepOrApplyInput(event, input.onOrientationFieldChange)}
                  @focus=${selectInputContent}
                >
                <label for="alpha-input">${i18nString(UIStrings.alpha)}</label>
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
                <label for="beta-input">${i18nString(UIStrings.beta)}</label>
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
                <label for="gamma-input">${i18nString(UIStrings.gamma)}</label>
              </div>
              <devtools-button
                .variant=${"outlined" /* Buttons.Button.Variant.OUTLINED */}
                class="orientation-reset-button"
                type="reset"
                aria-label=${i18nString(UIStrings.resetDeviceOrientation)}
                @click=${input.onOrientationReset}
                jslog=${VisualLogging.action('sensors.reset-device-orientiation').track({ click: true })}
              >
                ${i18nString(UIStrings.reset)}
              </devtools-button>
            </div>
          </fieldset>
        </div>
        <div
          class="orientation-stage ${classMap({ disabled: !input.orientationOverrideEnabled, 'is-animating': input.animateOrientation })}"
          title=${input.orientationOverrideEnabled ? i18nString(UIStrings.shiftdragHorizontallyToRotate) :
        i18nString(UIStrings.enableOrientationToRotate)}
          jslog=${VisualLogging.preview().track({ drag: true })}
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
    // clang-format on
}
// clang-format off
const DEFAULT_VIEW = (input, output, target) => {
    render(html `
    <style>${sensorsStyles}</style>
    <div class="sensors-view">
      <section class="sensors-group" jslog=${VisualLogging.section('location')}>
        ${renderLocationSection(input, output)}
      </section>
      <div class="panel-section-separator"></div>
      <section class="sensors-group" jslog=${VisualLogging.section('device-orientation')}>
        ${renderDeviceOrientationSection(input, output)}
      </section>
      <div class="panel-section-separator"></div>
      <div class="touch-section">
        ${SettingsUI.SettingsUI.renderControlForSetting(input.touchSetting, i18nString(UIStrings.forcesTouchInsteadOfClick))}
      </div>
      <div class="panel-section-separator"></div>
      <div class="idle-section">
        ${SettingsUI.SettingsUI.renderControlForSetting(input.idleDetectionSetting, i18nString(UIStrings.forcesSelectedIdleStateEmulation))}
      </div>
      <div class="panel-section-separator"></div>
      ${widget(MobileThrottling.ThrottlingManager.HardwareConcurrencySelector)}
      <div class="panel-section-separator"></div>
      <div class="pressure-section">
        ${SettingsUI.SettingsUI.renderControlForSetting(input.cpuPressureSetting, i18nString(UIStrings.forcesSelectedPressureStateEmulation))}
      </div>
      <div class="panel-section-separator"></div>
      <div class="cpu-performance-section">
        ${SettingsUI.SettingsUI.renderSettingSelect(input.cpuPerformanceSetting, i18nString(UIStrings.forcesSelectedCpuPerformanceTierEmulation), false, new Map([['no-override', input.cpuPerformanceNoOverrideLabel]]))}
      </div>
      <div class="panel-section-separator"></div>
    </div>`, target, {
        container: { attributes: { jslog: `${VisualLogging.panel('sensors').track({ resize: true })}` } },
    });
};
export class SensorsView extends UI.Widget.VBox {
    static INJECT = [Common.Settings.Settings, SDK.TargetManager.TargetManager, SDK.CPUThrottlingManager.CPUThrottlingManager];
    #view;
    #output = {};
    #locationSetting;
    #location;
    #locationOverrideEnabled;
    // Whether "Other…" is selected, even if the location matches one of the custom locations.
    #customLocationSelected = false;
    #customLocationsSetting;
    #timezoneError = '';
    #localeError = '';
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
    constructor(element, [settings, targetManager, cpuThrottlingManager], view = DEFAULT_VIEW) {
        super(element, { useShadowDom: 'pure' });
        this.#view = view;
        this.#settings = settings;
        this.#targetManager = targetManager;
        this.#cpuThrottlingManager = cpuThrottlingManager;
        this.#locationSetting = settings.createSetting('emulation.location-override', '');
        this.#location = SDK.EmulationModel.Location.parseSetting(this.#locationSetting.get());
        this.#locationOverrideEnabled = false;
        this.#customLocationsSetting =
            settings.resolve(SettingUIRegistration.EmulationSettings.emulationLocationsSettingDescriptor);
        this.#deviceOrientationSetting = settings.createSetting('emulation.device-orientation-override', '');
        this.#deviceOrientation = SDK.EmulationModel.DeviceOrientation.parseSetting(this.#deviceOrientationSetting.get());
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
            modifierKeyMessage: i18nString(UIStrings.adjustWithMousewheelOrUpdownKeys, { PH1: Host.Platform.isMac() ? '\u2318' : 'Ctrl' }),
            onManageLocations: () => Common.Revealer.reveal(this.#customLocationsSetting),
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
            touchSetting: this.#settings.resolve(SDK.SDKSettings.touchSettingDescriptor),
            idleDetectionSetting: this.#settings.resolve(SDK.SDKSettings.idleDetectionSettingDescriptor),
            cpuPressureSetting: this.#settings.resolve(SDK.SDKSettings.cpuPressureSettingDescriptor),
            cpuPerformanceSetting: this.#settings.resolve(SDK.SDKSettings.cpuPerformanceSettingDescriptor),
            cpuPerformanceNoOverrideLabel: this.#cpuPerformanceNoOverrideLabel(),
        };
        this.#view(input, this.#output, this.contentElement);
        if (this.isShowing()) {
            if (this.#inputToFocus === 'latitude') {
                this.#output.focusLatitudeInput?.();
            }
            else if (this.#inputToFocus === 'alpha') {
                this.#output.focusAlphaInput?.();
            }
        }
        this.#inputToFocus = undefined;
    }
    /** @returns the index of the selected option of the location select. */
    #selectedLocationIndex(customLocations) {
        const location = this.#location;
        let selectedIndex = 0;
        if (this.#locationOverrideEnabled) {
            if (location.unavailable) {
                selectedIndex = customLocations.length + 2;
            }
            else if (this.#customLocationSelected) {
                selectedIndex = customLocations.length + 1;
            }
            else {
                selectedIndex = customLocations.length + 1;
                for (const [i, customLocation] of customLocations.entries()) {
                    if (location.latitude === customLocation.lat && location.longitude === customLocation.long &&
                        location.timezoneId === customLocation.timezoneId && location.locale === customLocation.locale) {
                        selectedIndex = i + 1;
                        break;
                    }
                }
            }
        }
        return selectedIndex;
    }
    #locationSelectChanged(value) {
        this.#timezoneError = '';
        this.#localeError = '';
        this.#customLocationSelected = value === NonPresetOptions.Custom;
        this.#inputToFocus = value === NonPresetOptions.Custom ? 'latitude' : undefined;
        if (value === NonPresetOptions.NoOverride) {
            this.#locationOverrideEnabled = false;
            this.#location = SDK.EmulationModel.Location.parseSetting('');
        }
        else if (value === NonPresetOptions.Custom || value === NonPresetOptions.Unavailable) {
            this.#locationOverrideEnabled = true;
            // Keep the values that are shown in the inputs.
            const { latitude, longitude, timezoneId, locale, accuracy } = this.#location;
            this.#location = new SDK.EmulationModel.Location(latitude, longitude, timezoneId, locale, accuracy, value === NonPresetOptions.Unavailable);
        }
        else {
            this.#locationOverrideEnabled = true;
            const coordinates = JSON.parse(value);
            this.#location = new SDK.EmulationModel.Location(coordinates.lat, coordinates.long, coordinates.timezoneId, coordinates.locale, coordinates.accuracy || SDK.EmulationModel.Location.DEFAULT_ACCURACY, false);
        }
        this.#applyLocation();
        this.requestUpdate();
    }
    #applyLocationUserInput(name, value) {
        // Only the changed input is read, the other values are taken from the current location.
        const { latitude, longitude, timezoneId: timezone, locale, accuracy } = this.#location;
        const values = {
            latitude: String(latitude),
            longitude: String(longitude),
            timezone,
            locale,
            accuracy: String(accuracy),
            [name]: value,
        };
        const location = SDK.EmulationModel.Location.parseUserInput(values.latitude, values.longitude, values.timezone, values.locale, values.accuracy);
        if (!location) {
            return;
        }
        this.#timezoneError = '';
        this.#localeError = '';
        this.#customLocationSelected = true;
        this.#location = location;
        this.#applyLocation();
        this.requestUpdate();
    }
    #applyLocation() {
        if (this.#locationOverrideEnabled) {
            this.#locationSetting.set(this.#location.toSetting());
        }
        else {
            this.#locationSetting.set('');
        }
        for (const emulationModel of this.#targetManager.models(SDK.EmulationModel.EmulationModel)) {
            emulationModel.emulateLocation(this.#locationOverrideEnabled ? this.#location : null).catch(err => {
                switch (err.type) {
                    case 'emulation-set-timezone': {
                        this.#timezoneError = err.message;
                        break;
                    }
                    case 'emulation-set-locale': {
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
        this.#cpuThrottlingManager.addEventListener("CpuPerformanceTierChanged" /* SDK.CPUThrottlingManager.Events.CPU_PERFORMANCE_TIER_CHANGED */, this.requestUpdate, this);
        this.#cpuThrottlingManager.addEventListener("RateChanged" /* SDK.CPUThrottlingManager.Events.RATE_CHANGED */, this.requestUpdate, this);
        this.#customLocationsSetting.addChangeListener(this.requestUpdate, this);
        this.requestUpdate();
    }
    willHide() {
        super.willHide();
        this.#customLocationsSetting.removeChangeListener(this.requestUpdate, this);
        this.#cpuThrottlingManager.removeEventListener("CpuPerformanceTierChanged" /* SDK.CPUThrottlingManager.Events.CPU_PERFORMANCE_TIER_CHANGED */, this.requestUpdate, this);
        this.#cpuThrottlingManager.removeEventListener("RateChanged" /* SDK.CPUThrottlingManager.Events.RATE_CHANGED */, this.requestUpdate, this);
        // A pending update is cancelled when the widget is detached. Don't focus when it is shown again.
        this.#inputToFocus = undefined;
    }
    #cpuPerformanceNoOverrideLabel() {
        // Helper function to retrieve the tier labels (i18n) from the settings.
        const options = SettingUIRegistration.SettingUIRegistration.maybeResolve(SDK.SDKSettings.cpuPerformanceSettingDescriptor)
            ?.options ??
            [];
        const getOptionTitle = (value) => {
            const opt = options.find(o => o.value === value);
            if (!opt) {
                return '';
            }
            return opt.title;
        };
        // Helper function to return a fallback title, to be used if the above fails.
        const getFallbackTitle = (tier) => {
            return `Tier ${SDK.CPUThrottlingManager.tierToNumber(tier)}: ${tier.toUpperCase()}`;
        };
        // Compute the text of the "no-override" option using the calculated tier.
        const calculatedTier = this.#cpuThrottlingManager.calculatedCPUPerformanceTier();
        if (calculatedTier !== undefined) {
            const tierTitle = getOptionTitle(calculatedTier) || getFallbackTitle(calculatedTier);
            return i18nString(UIStrings.cpuPerformanceNoOverrideWithDefault, { PH1: tierTitle });
        }
        return getOptionTitle('no-override') || 'No override';
    }
    #orientationSelectChanged(value) {
        this.#selectedOrientation = value;
        this.#inputToFocus = value === NonPresetOptions.Custom ? 'alpha' : undefined;
        this.#deviceOrientationOverrideEnabled = value !== NonPresetOptions.NoOverride;
        // Setting the device orientation schedules an update of the view.
        if (value === NonPresetOptions.NoOverride) {
            this.#applyDeviceOrientation();
            this.requestUpdate();
        }
        else if (value === NonPresetOptions.Custom) {
            this.#resetDeviceOrientation();
        }
        else {
            const parsedValue = JSON.parse(value);
            this.#deviceOrientation =
                new SDK.EmulationModel.DeviceOrientation(parsedValue[0], parsedValue[1], parsedValue[2]);
            this.#setDeviceOrientation(this.#deviceOrientation, "selectPreset" /* DeviceOrientationModificationSource.SELECT_PRESET */);
        }
    }
    #applyDeviceOrientation() {
        if (this.#deviceOrientationOverrideEnabled) {
            this.#deviceOrientationSetting.set(this.#deviceOrientation.toSetting());
        }
        for (const emulationModel of this.#targetManager.models(SDK.EmulationModel.EmulationModel)) {
            void emulationModel.emulateDeviceOrientation(this.#deviceOrientationOverrideEnabled ? this.#deviceOrientation :
                null);
        }
    }
    #applyDeviceOrientationUserInput(name, value) {
        const { alpha, beta, gamma } = this.#deviceOrientation;
        const values = { alpha: String(alpha), beta: String(beta), gamma: String(gamma), [name]: value };
        this.#selectedOrientation = NonPresetOptions.Custom;
        this.#setDeviceOrientation(SDK.EmulationModel.DeviceOrientation.parseUserInput(values.alpha, values.beta, values.gamma), "userInput" /* DeviceOrientationModificationSource.USER_INPUT */);
    }
    #resetDeviceOrientation() {
        this.#selectedOrientation = '[0, 90, 0]';
        this.#setDeviceOrientation(new SDK.EmulationModel.DeviceOrientation(0, 90, 0), "resetButton" /* DeviceOrientationModificationSource.RESET_BUTTON */);
    }
    #setDeviceOrientation(deviceOrientation, modificationSource) {
        if (!deviceOrientation) {
            return;
        }
        const animate = modificationSource !== "userDrag" /* DeviceOrientationModificationSource.USER_DRAG */;
        this.#deviceOrientation = deviceOrientation;
        this.#setBoxOrientation(animate);
        this.#applyDeviceOrientation();
        this.requestUpdate();
        UI.ARIAUtils.LiveAnnouncer.alert(i18nString(UIStrings.deviceOrientationSetToAlphaSBeta, { PH1: deviceOrientation.alpha, PH2: deviceOrientation.beta, PH3: deviceOrientation.gamma }));
    }
    #setBoxOrientation(animate) {
        this.#animateOrientation = animate;
        // It is important to explain the multiple conversions happening here. A
        // few notes on coordinate spaces first:
        // 1. The CSS coordinate space is left-handed. X and Y are parallel to the
        //    screen, and Z is perpendicular to the screen. X is positive to the
        //    right, Y is positive downwards and Z increases towards the viewer.
        //    See https://drafts.csswg.org/css-transforms-2/#transform-rendering
        //    for more information.
        // 2. The Device Orientation coordinate space is right-handed. X and Y are
        //    parallel to the screen, and Z is perpenticular to the screen. X is
        //    positive to the right, Y is positive upwards and Z increases towards
        //    the viewer. See
        //    https://w3c.github.io/deviceorientation/#deviceorientation for more
        //    information.
        // 3. Additionally, the phone model we display is rotated +90 degrees in
        //    the X axis in the CSS coordinate space (i.e. when all angles are 0 we
        //    cannot see its screen in DevTools).
        //
        // |this.#boxMatrix| is set in the Device Orientation coordinate space
        // because it represents the phone model we show users and also because the
        // calculations in Geometry.EulerAngles assume this coordinate space (so
        // we apply the rotations in the Z-X'-Y'' order).
        // The CSS transforms, on the other hand, are done in the CSS coordinate
        // space, so we need to convert 2) to 1) while keeping 3) in mind. We can
        // cover 3) by swapping the Y and Z axes, and 2) by inverting the X axis.
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
        }
        else {
            axis = Geometry.crossProduct(this.#mouseDownVector, mouseMoveVector);
            angle = Geometry.calculateAngle(this.#mouseDownVector, mouseMoveVector);
        }
        // See the comment in #setBoxOrientation() for a longer explanation about
        // the CSS coordinate space, the Device Orientation coordinate space and
        // the conversions we make. |axis| and |angle| are in the CSS coordinate
        // space, while |this.#originalBoxMatrix| is rotated and in the Device
        // Orientation coordinate space, which is why we swap Y and Z and invert X.
        const currentMatrix = new DOMMatrixReadOnly().rotateAxisAngle(-axis.x, axis.z, axis.y, angle).multiply(this.#originalBoxMatrix);
        const eulerAngles = Geometry.EulerAngles.fromDeviceOrientationRotationMatrix(currentMatrix);
        const newOrientation = new SDK.EmulationModel.DeviceOrientation(eulerAngles.alpha, eulerAngles.beta, eulerAngles.gamma);
        this.#selectedOrientation = NonPresetOptions.Custom;
        this.#setDeviceOrientation(newOrientation, "userDrag" /* DeviceOrientationModificationSource.USER_DRAG */);
    }
    #onBoxDragStart(mouseDownVector) {
        if (!this.#deviceOrientationOverrideEnabled) {
            return false;
        }
        this.#mouseDownVector = mouseDownVector;
        this.#originalBoxMatrix = this.#boxMatrix;
        return true;
    }
}
var DeviceOrientationModificationSource;
(function (DeviceOrientationModificationSource) {
    DeviceOrientationModificationSource["USER_INPUT"] = "userInput";
    DeviceOrientationModificationSource["USER_DRAG"] = "userDrag";
    DeviceOrientationModificationSource["RESET_BUTTON"] = "resetButton";
    DeviceOrientationModificationSource["SELECT_PRESET"] = "selectPreset";
})(DeviceOrientationModificationSource || (DeviceOrientationModificationSource = {}));
const NonPresetOptions = {
    NoOverride: 'noOverride',
    Custom: 'custom',
    Unavailable: 'unavailable',
};
const ShiftDragOrientationSpeed = 16;
//# sourceMappingURL=SensorsView.js.map