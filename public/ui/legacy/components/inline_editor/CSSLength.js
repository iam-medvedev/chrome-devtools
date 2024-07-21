// Copyright (c) 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../../../core/host/host.js';
import * as LitHtml from '../../../lit-html/lit-html.js';
import cssLengthStyles from './cssLength.css.js';
import { parseText } from './CSSLengthUtils.js';
import { ValueChangedEvent } from './InlineEditorUtils.js';
const { render, html, Directives: { classMap } } = LitHtml;
export class DraggingFinishedEvent extends Event {
    static eventName = 'draggingfinished';
    constructor() {
        super(DraggingFinishedEvent.eventName, {});
    }
}
const DefaultLength = {
    value: 0,
    unit: "px" /* LengthUnit.PIXEL */,
};
export class CSSLength extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-css-length`;
    shadow = this.attachShadow({ mode: 'open' });
    onDraggingValue = this.dragValue.bind(this);
    length = DefaultLength;
    overloaded = false;
    isEditingSlot = false;
    isDraggingValue = false;
    currentMouseClientX = 0;
    #valueMousedownTime = 0;
    set data(data) {
        const parsedResult = parseText(data.lengthText);
        if (!parsedResult) {
            return;
        }
        this.length = parsedResult;
        this.overloaded = data.overloaded;
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
        let displacement = event.clientX - this.currentMouseClientX;
        this.currentMouseClientX = event.clientX;
        if (event.shiftKey) {
            displacement *= 10;
        }
        if (event.altKey) {
            displacement *= 0.1;
        }
        this.length.value = this.length.value + displacement;
        this.dispatchEvent(new ValueChangedEvent(`${this.length.value}${this.length.unit}`));
        Host.userMetrics.swatchActivated(8 /* Host.UserMetrics.SwatchType.Length */);
        this.render();
    }
    onValueMousedown(event) {
        if (event.button !== 0) {
            return;
        }
        this.#valueMousedownTime = Date.now();
        this.currentMouseClientX = event.clientX;
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
        const classes = {
            'css-length': true,
            'overloaded': this.overloaded,
        };
        // Disabled until https://crbug.com/1079231 is fixed.
        // clang-format off
        render(html `
      <div class=${classMap(classes)}>
        ${this.renderContent()}
      </div>
    `, this.shadow, {
            host: this,
        });
        // clang-format on
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
        >${this.length.value}</span>${this.length.unit}
      `;
        // clang-format on
    }
}
customElements.define('devtools-css-length', CSSLength);
//# sourceMappingURL=CSSLength.js.map