// Copyright (c) 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-lit-render-outside-of-view */
/* eslint-disable rulesdir/no-imperative-dom-api */
import * as IconButton from '../../../components/icon_button/icon_button.js';
import { html, render } from '../../../lit/lit.js';
import * as VisualLogging from '../../../visual_logging/visual_logging.js';
import * as UI from '../../legacy.js';
import bezierSwatchStyles from './bezierSwatch.css.js';
import cssShadowSwatchStyles from './cssShadowSwatch.css.js';
export class BezierSwatch extends HTMLElement {
    #icon;
    #text;
    constructor() {
        super();
        const root = UI.UIUtils.createShadowRootWithCoreStyles(this, { cssFile: bezierSwatchStyles });
        this.#icon = IconButton.Icon.create('bezier-curve-filled', 'bezier-swatch-icon');
        this.#icon.setAttribute('jslog', `${VisualLogging.showStyleEditor('bezier')}`);
        root.appendChild(this.#icon);
        this.#text = document.createElement('span');
        root.createChild('slot');
    }
    static create() {
        return document.createElement('devtools-bezier-swatch');
    }
    bezierText() {
        return this.#text.textContent || '';
    }
    setBezierText(text) {
        if (!this.#text.parentElement) {
            this.append(this.#text);
        }
        this.#text.textContent = text;
    }
    hideText(hide) {
        this.#text.hidden = hide;
    }
    iconElement() {
        return this.#icon;
    }
}
customElements.define('devtools-bezier-swatch', BezierSwatch);
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