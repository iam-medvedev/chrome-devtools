// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../icon_button/icon_button.js';
import * as Common from '../../../core/common/common.js';
import * as LitHtml from '../../lit-html/lit-html.js';
import settingDeprecationWarning from './settingDeprecationWarning.css.js';
const { html } = LitHtml;
export class SettingDeprecationWarning extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [settingDeprecationWarning];
    }
    set data(data) {
        this.#render(data);
    }
    #render({ disabled, warning, experiment }) {
        const iconData = { iconName: 'info', color: 'var(--icon-default)', width: '16px' };
        const classes = { clickable: false };
        let onclick;
        if (disabled && experiment) {
            classes.clickable = true;
            onclick = () => {
                void Common.Revealer.reveal(experiment);
            };
        }
        LitHtml.render(html `<devtools-icon class=${LitHtml.Directives.classMap(classes)} .data=${iconData} title=${warning} @click=${onclick}></devtools-icon>`, this.#shadow, { host: this });
    }
}
customElements.define('devtools-setting-deprecation-warning', SettingDeprecationWarning);
//# sourceMappingURL=SettingDeprecationWarning.js.map