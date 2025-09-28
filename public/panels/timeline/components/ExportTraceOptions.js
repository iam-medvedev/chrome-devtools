// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-lit-render-outside-of-view */
var _a;
import '../../../ui/components/tooltips/tooltips.js';
import '../../../ui/components/buttons/buttons.js';
import * as Common from '../../../core/common/common.js';
import * as Host from '../../../core/host/host.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as Root from '../../../core/root/root.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as Dialogs from '../../../ui/components/dialogs/dialogs.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as UI from '../../../ui/legacy/legacy.js';
import * as Lit from '../../../ui/lit/lit.js';
import exportTraceOptionsStyles from './exportTraceOptions.css.js';
const { html } = Lit;
const UIStrings = {
    /**
     * @description Text title for the Save performance trace dialog.
     */
    exportTraceOptionsDialogTitle: 'Save performance trace ',
    /**
     * @description Tooltip for the Save performance trace dialog.
     */
    showExportTraceOptionsDialogTitle: 'Save trace…',
    /**
     * @description Text for the include script content option.
     */
    includeScriptContent: 'Include script content',
    /**
     * @description Text for the include script source maps option.
     */
    includeSourcemap: 'Include script source maps',
    /**
     * @description Text for the include annotations option.
     */
    includeAnnotations: 'Include annotations',
    /**
     * @description Text for the compression option.
     */
    shouldCompress: 'Compress with gzip',
    /**
     * @description Text for the save trace button
     */
    saveButtonTitle: 'Save',
    /**
     * @description Title for the information icon showing more information about an option
     */
    moreInfoTitle: 'More information',
    /**
     * @description Text shown in the information pop-up next to the "Include script content" option.
     */
    scriptContentPrivacyInfo: 'Includes the full content of all loaded scripts (except extensions).',
    /**
     * @description Text shown in the information pop-up next to the "Include script sourcemaps" option.
     */
    sourceMapsContentPrivacyInfo: 'Includes available source maps, which may expose authored code.'
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/ExportTraceOptions.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const checkboxesWithInfoDialog = new Set(['script-content', 'script-source-maps']);
export class ExportTraceOptions extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #data = null;
    static #includeAnnotationsSettingString = 'export-performance-trace-include-annotations';
    static #includeScriptContentSettingString = 'export-performance-trace-include-scripts';
    static #includeSourceMapsSettingString = 'export-performance-trace-include-sourcemaps';
    static #shouldCompressSettingString = 'export-performance-trace-should-compress';
    #includeAnnotationsSetting = Common.Settings.Settings.instance().createSetting(_a.#includeAnnotationsSettingString, true, "Session" /* Common.Settings.SettingStorageType.SESSION */);
    #includeScriptContentSetting = Common.Settings.Settings.instance().createSetting(_a.#includeScriptContentSettingString, false, "Session" /* Common.Settings.SettingStorageType.SESSION */);
    #includeSourceMapsSetting = Common.Settings.Settings.instance().createSetting(_a.#includeSourceMapsSettingString, false, "Session" /* Common.Settings.SettingStorageType.SESSION */);
    #shouldCompressSetting = Common.Settings.Settings.instance().createSetting(_a.#shouldCompressSettingString, true, "Synced" /* Common.Settings.SettingStorageType.SYNCED */);
    #state = {
        dialogState: "collapsed" /* Dialogs.Dialog.DialogState.COLLAPSED */,
        includeAnnotations: this.#includeAnnotationsSetting.get(),
        includeScriptContent: this.#includeScriptContentSetting.get(),
        includeSourceMaps: this.#includeSourceMapsSetting.get(),
        shouldCompress: this.#shouldCompressSetting.get(),
    };
    #includeAnnotationsCheckbox = UI.UIUtils.CheckboxLabel.create(
    /* title*/ i18nString(UIStrings.includeAnnotations), /* checked*/ this.#state.includeAnnotations, 
    /* subtitle*/ undefined, 
    /* jslogContext*/ 'timeline.export-trace-options.annotations-checkbox');
    #includeScriptContentCheckbox = UI.UIUtils.CheckboxLabel.create(
    /* title*/ i18nString(UIStrings.includeScriptContent), /* checked*/ this.#state.includeScriptContent, 
    /* subtitle*/ undefined, 
    /* jslogContext*/ 'timeline.export-trace-options.script-content-checkbox');
    #includeSourceMapsCheckbox = UI.UIUtils.CheckboxLabel.create(
    /* title*/ i18nString(UIStrings.includeSourcemap), /* checked*/ this.#state.includeSourceMaps, 
    /* subtitle*/ undefined, 
    /* jslogContext*/ 'timeline.export-trace-options.source-maps-checkbox');
    #shouldCompressCheckbox = UI.UIUtils.CheckboxLabel.create(
    /* title*/ i18nString(UIStrings.shouldCompress), /* checked*/ this.#state.shouldCompress, 
    /* subtitle*/ undefined, 
    /* jslogContext*/ 'timeline.export-trace-options.should-compress-checkbox');
    set data(data) {
        this.#data = data;
        this.#scheduleRender();
    }
    set state(state) {
        this.#state = state;
        this.#includeAnnotationsSetting.set(state.includeAnnotations);
        this.#includeScriptContentSetting.set(state.includeScriptContent);
        this.#includeSourceMapsSetting.set(state.includeSourceMaps);
        this.#shouldCompressSetting.set(state.shouldCompress);
        this.#scheduleRender();
    }
    get state() {
        return this.#state;
    }
    updateContentVisibility(options) {
        const showIncludeScriptContentCheckbox = Root.Runtime.experiments.isEnabled("timeline-enhanced-traces" /* Root.Runtime.ExperimentName.TIMELINE_ENHANCED_TRACES */);
        const showIncludeSourceMapCheckbox = Root.Runtime.experiments.isEnabled("timeline-compiled-sources" /* Root.Runtime.ExperimentName.TIMELINE_COMPILED_SOURCES */);
        const newState = Object.assign({}, this.#state, {
            displayAnnotationsCheckbox: options.annotationsExist,
            displayScriptContentCheckbox: showIncludeScriptContentCheckbox,
            displaySourceMapsCheckbox: showIncludeSourceMapCheckbox
        });
        this.state = newState;
    }
    #scheduleRender() {
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    #checkboxOptionChanged(checkboxWithLabel, checked) {
        const newState = Object.assign({}, this.#state, { dialogState: "expanded" /* Dialogs.Dialog.DialogState.EXPANDED */ });
        switch (checkboxWithLabel) {
            case this.#includeAnnotationsCheckbox: {
                newState.includeAnnotations = checked;
                break;
            }
            case this.#includeScriptContentCheckbox: {
                newState.includeScriptContent = checked;
                // if the `Include Script` is checked off, cascade the change to `Include Script Source`
                if (!newState.includeScriptContent) {
                    newState.includeSourceMaps = false;
                }
                break;
            }
            case this.#includeSourceMapsCheckbox: {
                newState.includeSourceMaps = checked;
                break;
            }
            case this.#shouldCompressCheckbox: {
                newState.shouldCompress = checked;
                break;
            }
        }
        this.state = newState;
    }
    #renderCheckbox(checkboxId, checkboxWithLabel, title, checked) {
        UI.Tooltip.Tooltip.install(checkboxWithLabel, title);
        checkboxWithLabel.ariaLabel = title;
        checkboxWithLabel.checked = checked;
        checkboxWithLabel.addEventListener('change', this.#checkboxOptionChanged.bind(this, checkboxWithLabel, !checked), false);
        // Disable the includeSourceMapsSetting when the includeScriptContentSetting is also disabled.
        this.#includeSourceMapsCheckbox.disabled = !this.#state.includeScriptContent;
        // clang-format off
        return html `
        <div class='export-trace-options-row'>
          ${checkboxWithLabel}

          ${checkboxesWithInfoDialog.has(checkboxId) ? html `
            <devtools-button
              aria-details=${`export-trace-tooltip-${checkboxId}`}
              class="pen-icon"
              .title=${UIStrings.moreInfoTitle}
              .iconName=${'info'}
              .variant=${"icon" /* Buttons.Button.Variant.ICON */}
              ></devtools-button>
            ` : Lit.nothing}
        </div>
      `;
        // clang-format on
    }
    #renderInfoTooltip(checkboxId) {
        if (!checkboxesWithInfoDialog.has(checkboxId)) {
            return Lit.nothing;
        }
        return html `
    <devtools-tooltip
      variant="rich"
      id=${`export-trace-tooltip-${checkboxId}`}
    >
      <div class="info-tooltip-container">
      <p>
        ${checkboxId === 'script-content' ? i18nString(UIStrings.scriptContentPrivacyInfo) : Lit.nothing}
        ${checkboxId === 'script-source-maps' ? i18nString(UIStrings.sourceMapsContentPrivacyInfo) : Lit.nothing}
      </p>
      </div>
    </devtools-tooltip>`;
    }
    #render() {
        if (!ComponentHelpers.ScheduledRender.isScheduledRender(this)) {
            throw new Error('Export trace options dialog render was not scheduled');
        }
        // clang-format off
        const output = html `
      <style>${exportTraceOptionsStyles}</style>
      <devtools-button-dialog class="export-trace-dialog"
      @click=${this.#onButtonDialogClick.bind(this)}
      .data=${{
            openOnRender: false,
            jslogContext: 'timeline.export-trace-options',
            variant: "toolbar" /* Buttons.Button.Variant.TOOLBAR */,
            iconName: 'download',
            disabled: !this.#data?.buttonEnabled,
            iconTitle: i18nString(UIStrings.showExportTraceOptionsDialogTitle),
            horizontalAlignment: "auto" /* Dialogs.Dialog.DialogHorizontalAlignment.AUTO */,
            closeButton: false,
            dialogTitle: i18nString(UIStrings.exportTraceOptionsDialogTitle),
            state: this.#state.dialogState,
        }}>
        <div class='export-trace-options-content'>
          ${this.#state.displayAnnotationsCheckbox ? this.#renderCheckbox('annotations', this.#includeAnnotationsCheckbox, i18nString(UIStrings.includeAnnotations), this.#state.includeAnnotations) : ''}
          ${this.#state.displayScriptContentCheckbox ? this.#renderCheckbox('script-content', this.#includeScriptContentCheckbox, i18nString(UIStrings.includeScriptContent), this.#state.includeScriptContent) : ''}
          ${this.#state.displayScriptContentCheckbox && this.#state.displaySourceMapsCheckbox ? this.#renderCheckbox('script-source-maps', this.#includeSourceMapsCheckbox, i18nString(UIStrings.includeSourcemap), this.#state.includeSourceMaps) : ''}
          ${this.#renderCheckbox('compress-with-gzip', this.#shouldCompressCheckbox, i18nString(UIStrings.shouldCompress), this.#state.shouldCompress)}
          <div class='export-trace-options-row'><div class='export-trace-blank'></div><devtools-button
                  class="setup-button"
                  data-export-button
                  @click=${this.#onExportClick.bind(this)}
                  .data=${{
            variant: "primary" /* Buttons.Button.Variant.PRIMARY */,
            title: i18nString(UIStrings.saveButtonTitle),
        }}
                >${i18nString(UIStrings.saveButtonTitle)}</devtools-button>
                </div>
        </div>
      </devtools-button-dialog>

      ${this.#state.displayScriptContentCheckbox ? this.#renderInfoTooltip('script-content') : Lit.nothing}
      ${this.#state.displayScriptContentCheckbox && this.#state.displaySourceMapsCheckbox ? this.#renderInfoTooltip('script-source-maps') : Lit.nothing}
    `;
        // clang-format on
        Lit.render(output, this.#shadow, { host: this });
    }
    async #onButtonDialogClick() {
        this.state = Object.assign({}, this.#state, { dialogState: "expanded" /* Dialogs.Dialog.DialogState.EXPANDED */ });
    }
    async #onExportCallback() {
        // Calls passed onExport function with current settings.
        await this.#data?.onExport({
            includeScriptContent: this.#state.includeScriptContent,
            includeSourceMaps: this.#state.includeSourceMaps,
            // Note: this also includes track configuration ...
            addModifications: this.#state.includeAnnotations,
            shouldCompress: this.#state.shouldCompress,
        });
        Host.userMetrics.actionTaken(Host.UserMetrics.Action.PerfPanelTraceExported);
    }
    async #onExportClick() {
        // Handles save button click that lived inside the dialog.
        // Exports trace and collapses dialog.
        await this.#onExportCallback();
        this.state = Object.assign({}, this.#state, { dialogState: "collapsed" /* Dialogs.Dialog.DialogState.COLLAPSED */ });
    }
}
_a = ExportTraceOptions;
customElements.define('devtools-perf-export-trace-options', ExportTraceOptions);
//# sourceMappingURL=ExportTraceOptions.js.map