// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-lit-render-outside-of-view */
import '../icon_button/icon_button.js';
import * as Lit from '../../lit/lit.js';
import floatingButtonStylesRaw from './floatingButton.css.js';
/* eslint-disable rulesdir/no-adopted-style-sheets --
 * TODO(crbug.com/391381439): Fully migrate off of Constructable Stylesheets.
 **/
const floatingButtonStyles = new CSSStyleSheet();
floatingButtonStyles.replaceSync(floatingButtonStylesRaw.cssText);
const { html, Directives: { ifDefined } } = Lit;
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
        Lit.render(html `<button class="floating-button" title=${ifDefined(this.#data.title)} .disabled=${Boolean(this.#data.disabled)}><devtools-icon class="icon" name=${this.#data.iconName}></devtools-icon></button>`, this.#shadow, { host: this });
        // clang-format on
    }
}
customElements.define('devtools-floating-button', FloatingButton);
//# sourceMappingURL=FloatingButton.js.map