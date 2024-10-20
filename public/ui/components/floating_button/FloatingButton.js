// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../icon_button/icon_button.js';
import * as LitHtml from '../../lit-html/lit-html.js';
import floatingButtonStyles from './floatingButton.css.js';
const { html } = LitHtml;
export class FloatingButton extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #data;
    constructor(data) {
        super();
        this.#data = data;
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [floatingButtonStyles];
        this.#render();
    }
    set data(floatingButtonData) {
        this.#data = floatingButtonData;
    }
    #render() {
        // Disabled until https://crbug.com/1079231 is fixed.
        // clang-format off
        LitHtml.render(html `<button class="floating-button" .disabled=${Boolean(this.#data.disabled)}><devtools-icon class="icon" name=${this.#data.iconName}></devtools-icon></button>`, this.#shadow, { host: this });
        // clang-format on
    }
}
customElements.define('devtools-floating-button', FloatingButton);
//# sourceMappingURL=FloatingButton.js.map