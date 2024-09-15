// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../../core/host/host.js';
import * as LitHtml from '../../lit-html/lit-html.js';
import * as VisualLogging from '../../visual_logging/visual_logging.js';
import * as Buttons from '../buttons/buttons.js';
import * as Input from '../input/input.js';
import settingCheckboxStyles from './settingCheckbox.css.js';
import { SettingDeprecationWarning } from './SettingDeprecationWarning.js';
/**
 * A simple checkbox that is backed by a boolean setting.
 */
export class SettingCheckbox extends HTMLElement {
    static litTagName = LitHtml.literal `setting-checkbox`;
    #shadow = this.attachShadow({ mode: 'open' });
    #setting;
    #changeListenerDescriptor;
    #textOverride;
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [Input.checkboxStyles, settingCheckboxStyles];
    }
    set data(data) {
        if (this.#changeListenerDescriptor && this.#setting) {
            this.#setting.removeChangeListener(this.#changeListenerDescriptor.listener);
        }
        this.#setting = data.setting;
        this.#textOverride = data.textOverride;
        this.#changeListenerDescriptor = this.#setting.addChangeListener(() => {
            this.#render();
        });
        this.#render();
    }
    icon() {
        if (!this.#setting) {
            return undefined;
        }
        if (this.#setting.deprecation) {
            return LitHtml.html `<${SettingDeprecationWarning.litTagName} .data=${this.#setting.deprecation}></${SettingDeprecationWarning.litTagName}>`;
        }
        const learnMore = this.#setting.learnMore();
        if (learnMore) {
            const jslog = VisualLogging.link()
                .track({ click: true, keydown: 'Enter|Space' })
                .context(this.#setting.name + '-documentation');
            return LitHtml.html `<${Buttons.Button.Button.litTagName} .iconName=${'help'} .size=${"SMALL" /* Buttons.Button.Size.SMALL */} .variant=${"icon" /* Buttons.Button.Variant.ICON */} .title=${learnMore.tooltip()} jslog=${jslog} @click=${() => Host.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(learnMore.url)} class="learn-more"></${Buttons.Button.Button.litTagName}>`;
        }
        return undefined;
    }
    #render() {
        if (!this.#setting) {
            throw new Error('No "Setting" object provided for rendering');
        }
        const icon = this.icon();
        const reason = this.#setting.disabledReason() ?
            LitHtml.html `
      <${Buttons.Button.Button.litTagName} class="disabled-reason" .iconName=${'info'} .variant=${"icon" /* Buttons.Button.Variant.ICON */} .size=${"SMALL" /* Buttons.Button.Size.SMALL */} title=${this.#setting.disabledReason()} @click=${onclick}></${Buttons.Button.Button.litTagName}>
    ` :
            LitHtml.nothing;
        LitHtml.render(LitHtml.html `
      <p>
        <label>
          <input
            type="checkbox"
            .checked=${this.#setting.disabledReason() ? false : this.#setting.get()}
            ?disabled=${this.#setting.disabled()}
            @change=${this.#checkboxChanged}
            jslog=${VisualLogging.toggle().track({ click: true }).context(this.#setting.name)}
            aria-label=${this.#setting.title()}
          />
          ${this.#textOverride || this.#setting.title()}${reason}
        </label>
        ${icon}
      </p>`, this.#shadow, { host: this });
    }
    #checkboxChanged(e) {
        this.#setting?.set(e.target.checked);
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: false,
        }));
    }
}
customElements.define('setting-checkbox', SettingCheckbox);
//# sourceMappingURL=SettingCheckbox.js.map