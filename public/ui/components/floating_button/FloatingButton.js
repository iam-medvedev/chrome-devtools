// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as LitHtml from '../../lit-html/lit-html.js';
import * as IconButton from '../icon_button/icon_button.js';
import floatingButtonStyles from './floatingButton.css.js';
export class FloatingButton extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-floating-button`;
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
        LitHtml.render(LitHtml.html `<button class="floating-button" .disabled=${this.#data.disabled}><${IconButton.Icon.Icon.litTagName} class="icon" name=${this.#data.iconName}></${IconButton.Icon.Icon.litTagName}></button>`, this.#shadow, { host: this });
        // clang-format on
    }
}
customElements.define('devtools-floating-button', FloatingButton);
//# sourceMappingURL=FloatingButton.js.map