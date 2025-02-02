// Copyright (c) 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../../core/common/common.js';
import * as Platform from '../../../../core/platform/platform.js';
import { html, render } from '../../../lit/lit.js';
import * as VisualLogging from '../../../visual_logging/visual_logging.js';
import colorMixSwatchStylesRaw from './colorMixSwatch.css.js';
// TODO(crbug.com/391381439): Fully migrate off of constructed style sheets.
const colorMixSwatchStyles = new CSSStyleSheet();
colorMixSwatchStyles.replaceSync(colorMixSwatchStylesRaw.cssContent);
export class ColorMixSwatch extends Common.ObjectWrapper.eventMixin(HTMLElement) {
    shadow = this.attachShadow({ mode: 'open' });
    colorMixText = ''; // color-mix(in srgb, hotpink, white)
    firstColorText = ''; // hotpink
    secondColorText = ''; // white
    #registerPopoverCallback;
    constructor() {
        super();
        this.shadow.adoptedStyleSheets = [
            colorMixSwatchStyles,
        ];
    }
    get icon() {
        return this.shadow.firstElementChild;
    }
    mixedColor() {
        const colorText = this.icon?.computedStyleMap().get('color')?.toString() ?? null;
        return colorText ? Common.Color.parse(colorText) : null;
    }
    setFirstColor(text) {
        // We need to replace `colorMixText` because it is the CSS for the
        // the middle section where we actually show the mixed colors.
        // So, when a color changed, we need to update colorMixText to
        // reflect the new color (not the old one).
        if (this.firstColorText) {
            this.colorMixText = this.colorMixText.replace(this.firstColorText, text);
        }
        this.firstColorText = text;
        this.dispatchEventToListeners("colorChanged" /* Events.COLOR_CHANGED */, { text: this.colorMixText });
        this.#render();
    }
    setSecondColor(text) {
        // We need to replace from the last to handle the same colors case
        // i.e. replacing the second color of `color-mix(in srgb, red 50%, red 10%)`
        // to `blue` should result in `color-mix(in srgb, red 50%, blue 10%)`.
        if (this.secondColorText) {
            this.colorMixText = Platform.StringUtilities.replaceLast(this.colorMixText, this.secondColorText, text);
        }
        this.secondColorText = text;
        this.dispatchEventToListeners("colorChanged" /* Events.COLOR_CHANGED */, { text: this.colorMixText });
        this.#render();
    }
    setColorMixText(text) {
        this.colorMixText = text;
        this.dispatchEventToListeners("colorChanged" /* Events.COLOR_CHANGED */, { text: this.colorMixText });
        this.#render();
    }
    setRegisterPopoverCallback(callback) {
        this.#registerPopoverCallback = callback;
        callback(this);
    }
    getText() {
        return this.colorMixText;
    }
    #render() {
        if (!this.colorMixText || !this.firstColorText || !this.secondColorText) {
            render(this.colorMixText, this.shadow, { host: this });
            return;
        }
        // Disabled until https://crbug.com/1079231 is fixed.
        // clang-format off
        // Note that we use a <slot> with a default value here to display the color text. Consumers of this component are
        // free to append any content to replace what is being shown here.
        // Note also that whitespace between nodes is removed on purpose to avoid pushing these elements apart. Do not
        // re-format the HTML code.
        render(html `<div class="swatch-icon" jslog=${VisualLogging.cssColorMix()} style="--color: ${this.colorMixText}">
        <span class="swatch swatch-left" id="swatch-1" style="--color: ${this.firstColorText}"></span>
        <span class="swatch swatch-right" id="swatch-2" style="--color: ${this.secondColorText}"></span>
        <span class="swatch swatch-mix" id="mix-result" style="--color: ${this.colorMixText}"></span>
      </div><slot>${this.colorMixText}</slot>`, this.shadow, { host: this });
        // clang-format on
        this.#registerPopoverCallback && this.#registerPopoverCallback(this);
    }
}
customElements.define('devtools-color-mix-swatch', ColorMixSwatch);
//# sourceMappingURL=ColorMixSwatch.js.map