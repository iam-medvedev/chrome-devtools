// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../../ui/components/menus/menus.js';
import * as Common from '../../../core/common/common.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as Dialogs from '../../../ui/components/dialogs/dialogs.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as UI from '../../../ui/legacy/legacy.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import ignoreListSettingStyles from './ignoreListSetting.css.js';
const { html } = LitHtml;
const UIStrings = {
    /**
     * @description Text title for the button to open the ignore list setting.
     */
    showIgnoreListSettingDialog: 'Show ignore list setting dialog',
    /**
     * @description Text title for ignore list setting.
     */
    ignoreList: 'Ignore list',
    /**
     * @description Text description for ignore list setting.
     */
    ignoreListDescription: 'Add these exclusion rules would simplify the flame chart.',
    /**
     *@description Pattern title in Framework Ignore List Settings Tab of the Settings
     *@example {ad.*?} regex
     */
    ignoreScriptsWhoseNamesMatchS: 'Ignore scripts whose names match \'\'{regex}\'\'',
    /**
     *@description Label for the button to remove an regex
     *@example {ad.*?} regex
     */
    removeRegex: 'Remove the regex: \'\'{regex}\'\'',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/IgnoreListSetting.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class IgnoreListSetting extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #renderBound = this.#render.bind(this);
    #ignoreListEnabled = Common.Settings.Settings.instance().moduleSetting('enable-ignore-listing');
    #regexPatterns = this.#getSkipStackFramesPatternSetting().getAsArray();
    constructor() {
        super();
        Common.Settings.Settings.instance()
            .moduleSetting('skip-stack-frames-pattern')
            .addChangeListener(this.#scheduleRender.bind(this));
        Common.Settings.Settings.instance()
            .moduleSetting('enable-ignore-listing')
            .addChangeListener(this.#scheduleRender.bind(this));
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [ignoreListSettingStyles];
        this.#scheduleRender();
    }
    #scheduleRender() {
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
    }
    #getSkipStackFramesPatternSetting() {
        return Common.Settings.Settings.instance().moduleSetting('skip-stack-frames-pattern');
    }
    #onRegexEnableToggled(regex, checkbox) {
        regex.disabled = !checkbox.checkboxElement.checked;
        // Technically we don't need to call the set function, because the regex is a reference, so it changed the setting
        // value directly.
        // But we need to call the set function to trigger the setting change event. which is needed by view update of flame
        // chart.
        this.#getSkipStackFramesPatternSetting().setAsArray(this.#regexPatterns);
        // There is no need to update this component, since the only UI change is this checkbox, which is already done by
        // the user.
    }
    #removeRegexByIndex(index) {
        this.#regexPatterns.splice(index, 1);
        this.#getSkipStackFramesPatternSetting().setAsArray(this.#regexPatterns);
    }
    #renderItem(regex, index) {
        const checkboxWithLabel = UI.UIUtils.CheckboxLabel.create(regex.pattern, !regex.disabled, /* subtitle*/ undefined, /* jslogContext*/ 'timeline.ignore-list-pattern');
        const helpText = i18nString(UIStrings.ignoreScriptsWhoseNamesMatchS, { regex: regex.pattern });
        UI.Tooltip.Tooltip.install(checkboxWithLabel, helpText);
        checkboxWithLabel.checkboxElement.ariaLabel = helpText;
        checkboxWithLabel.checkboxElement.addEventListener('change', this.#onRegexEnableToggled.bind(this, regex, checkboxWithLabel), false);
        // clang-format off
        return html `
      <div class='regex-row'>
        ${checkboxWithLabel}
        <devtools-button
            @click=${this.#removeRegexByIndex.bind(this, index)}
            .data=${{
            variant: "icon" /* Buttons.Button.Variant.ICON */,
            iconName: 'bin',
            title: i18nString(UIStrings.removeRegex, { regex: regex.pattern }),
            jslogContext: 'timeline.ignore-list-pattern.remove',
        }}></devtools-button>
      </div>
    `;
        // clang-format on
    }
    #render() {
        if (!ComponentHelpers.ScheduledRender.isScheduledRender(this)) {
            throw new Error('Ignore List setting dialog render was not scheduled');
        }
        // clang-format off
        const output = html `
      <devtools-button-dialog .data=${{
            openOnRender: false,
            jslogContext: 'timeline.ignore-list',
            variant: "toolbar" /* Buttons.Button.Variant.TOOLBAR */,
            iconName: 'compress',
            disabled: !this.#ignoreListEnabled.get(),
            iconTitle: i18nString(UIStrings.showIgnoreListSettingDialog),
            horizontalAlignment: "auto" /* Dialogs.Dialog.DialogHorizontalAlignment.AUTO */,
            closeButton: true,
            dialogTitle: i18nString(UIStrings.ignoreList),
        }}>
        <div class='ignore-list-setting-content'>
          <div class='ignore-list-setting-description'>${i18nString(UIStrings.ignoreListDescription)}</div>
          ${this.#regexPatterns.map(this.#renderItem.bind(this))}
        </div>
      </devtools-button-dialog>
    `;
        // clang-format on
        LitHtml.render(output, this.#shadow, { host: this });
    }
}
customElements.define('devtools-perf-ignore-list-setting', IgnoreListSetting);
//# sourceMappingURL=IgnoreListSetting.js.map