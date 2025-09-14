// Copyright 2015 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-lit-render-outside-of-view */
import '../../../components/icon_button/icon_button.js';
import { html, render } from '../../../lit/lit.js';
import cssShadowSwatchStyles from './cssShadowSwatch.css.js';
export class CSSShadowSwatch extends HTMLElement {
    #icon;
    #model;
    constructor(model) {
        super();
        this.#model = model;
        // clang-format off
        render(html `
        <style>${cssShadowSwatchStyles}</style>
        <devtools-icon tabindex=-1 name="shadow" class="shadow-swatch-icon"></devtools-icon>`, this, { host: this });
        // clang-format on
        this.#icon = this.querySelector('devtools-icon');
    }
    model() {
        return this.#model;
    }
    iconElement() {
        return this.#icon;
    }
}
customElements.define('css-shadow-swatch', CSSShadowSwatch);
//# sourceMappingURL=Swatches.js.map