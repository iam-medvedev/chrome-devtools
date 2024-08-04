// Copyright (c) 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../../../core/host/host.js';
import * as UI from '../../../legacy/legacy.js';
import * as LitHtml from '../../../lit-html/lit-html.js';
import cssLengthStyles from './cssLength.css.js';
import { ValueChangedEvent } from './InlineEditorUtils.js';
const { render, html } = LitHtml;
export class DraggingFinishedEvent extends Event {
    static eventName = 'draggingfinished';
    constructor() {
        super(DraggingFinishedEvent.eventName, {});
    }
}
export var CSSLengthUnit;
(function (CSSLengthUnit) {
    // absolute units
    CSSLengthUnit["PIXEL"] = "px";
    CSSLengthUnit["CENTIMETER"] = "cm";
    CSSLengthUnit["MILLIMETER"] = "mm";
    CSSLengthUnit["QUARTERMILLIMETER"] = "Q";
    CSSLengthUnit["INCH"] = "in";
    CSSLengthUnit["PICA"] = "pc";
    CSSLengthUnit["POINT"] = "pt";
    // relative units
    CSSLengthUnit["CAP"] = "cap";
    CSSLengthUnit["CH"] = "ch";
    CSSLengthUnit["EM"] = "em";
    CSSLengthUnit["EX"] = "ex";
    CSSLengthUnit["IC"] = "ic";
    CSSLengthUnit["LH"] = "lh";
    CSSLengthUnit["RCAP"] = "rcap";
    CSSLengthUnit["RCH"] = "rch";
    CSSLengthUnit["REM"] = "rem";
    CSSLengthUnit["REX"] = "rex";
    CSSLengthUnit["RIC"] = "ric";
    CSSLengthUnit["RLH"] = "rlh";
    CSSLengthUnit["VB"] = "vb";
    CSSLengthUnit["VH"] = "vh";
    CSSLengthUnit["VI"] = "vi";
    CSSLengthUnit["VW"] = "vw";
    CSSLengthUnit["VMIN"] = "vmin";
    CSSLengthUnit["VMAX"] = "vmax";
})(CSSLengthUnit || (CSSLengthUnit = {}));
export const CSS_LENGTH_REGEX = new RegExp(`(?<value>[+-]?\\d*\\.?\\d+([Ee][+-]?\\d+)?)(?<unit>${Object.values(CSSLengthUnit).join('|')})`);
export class CSSLength extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-css-length`;
    shadow = this.attachShadow({ mode: 'open' });
    onDraggingValue = this.dragValue.bind(this);
    value = '';
    unit = CSSLengthUnit.PIXEL;
    isEditingSlot = false;
    isDraggingValue = false;
    #valueMousedownTime = 0;
    set data({ lengthText }) {
        const groups = lengthText.match(CSS_LENGTH_REGEX)?.groups;
        if (!groups) {
            throw new Error();
        }
        this.value = groups.value;
        this.unit = groups.unit;
        this.render();
    }
    connectedCallback() {
        this.shadow.adoptedStyleSheets = [cssLengthStyles];
    }
    dragValue(event) {
        event.preventDefault();
        event.stopPropagation();
        if (Date.now() - this.#valueMousedownTime <= 300) {
            // Delay drag callback by 300ms to prioritize click over drag.
            return;
        }
        this.isDraggingValue = true;
        const newValue = UI.UIUtils.createReplacementString(this.value, event);
        if (newValue) {
            this.value = newValue;
            this.dispatchEvent(new ValueChangedEvent(`${this.value}${this.unit}`));
            Host.userMetrics.swatchActivated(8 /* Host.UserMetrics.SwatchType.Length */);
            this.render();
        }
    }
    onValueMousedown(event) {
        if (event.button !== 0) {
            return;
        }
        this.#valueMousedownTime = Date.now();
        const targetDocument = event.target instanceof Node && event.target.ownerDocument;
        if (targetDocument) {
            targetDocument.addEventListener('mousemove', this.onDraggingValue, { capture: true });
            targetDocument.addEventListener('mouseup', (event) => {
                targetDocument.removeEventListener('mousemove', this.onDraggingValue, { capture: true });
                if (!this.isDraggingValue) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                this.isDraggingValue = false;
                this.dispatchEvent(new DraggingFinishedEvent());
            }, { once: true, capture: true });
        }
    }
    onValueMouseup() {
        if (!this.isDraggingValue) {
            this.isEditingSlot = true;
            this.render();
        }
    }
    render() {
        render(this.renderContent(), this.shadow, {
            host: this,
        });
    }
    renderContent() {
        if (this.isEditingSlot) {
            return html `<slot></slot>`;
        }
        // Disabled until https://crbug.com/1079231 is fixed.
        // clang-format off
        return html `
        <span class="value"
          @mousedown=${this.onValueMousedown}
          @mouseup=${this.onValueMouseup}
        >${this.value}</span>${this.unit}
      `;
        // clang-format on
    }
}
customElements.define('devtools-css-length', CSSLength);
//# sourceMappingURL=CSSLength.js.map