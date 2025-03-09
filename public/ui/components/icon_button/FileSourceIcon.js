// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './IconButton.js';
import { Directives, html, render } from '../../lit/lit.js';
import fileSourceIconStyles from './fileSourceIcon.css.js';
const { classMap, styleMap } = Directives;
export class FileSourceIcon extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #iconType;
    #contentType;
    #hasDotBadge;
    #isDotPurple;
    #width;
    #height;
    constructor(iconType) {
        super();
        this.#iconType = iconType;
    }
    set data(data) {
        this.#contentType = data.contentType;
        this.#hasDotBadge = data.hasDotBadge;
        this.#isDotPurple = data.isDotPurple;
        this.#width = data.width;
        this.#height = data.height;
        if (this.#width !== undefined) {
            this.style.width = `${this.#width}px`;
        }
        if (this.#height !== undefined) {
            this.style.height = `${this.#height}px`;
        }
        this.#render();
    }
    get data() {
        return {
            contentType: this.#contentType,
            hasDotBadge: this.#hasDotBadge,
            isDotPurple: this.#isDotPurple,
            width: this.#width,
            height: this.#height,
        };
    }
    connectedCallback() {
        this.#render();
    }
    #render() {
        const iconClasses = classMap({
            dot: Boolean(this.#hasDotBadge),
            purple: Boolean(this.#hasDotBadge && this.#isDotPurple),
            green: Boolean(this.#hasDotBadge && !this.#isDotPurple),
            ...(this.#contentType ? { [this.#contentType]: this.#contentType } : null)
        });
        const iconStyles = styleMap({
            width: this.#width ? `${this.#width}px` : undefined,
            height: this.#height ? `${this.#height}px` : undefined,
        });
        // clang-format off
        render(html `<style>${fileSourceIconStyles.cssContent}</style><devtools-icon .name=${this.#iconType} class=${iconClasses} style=${iconStyles}></devtools-icon>`, this.#shadow, {
            host: this,
        });
        // clang-format on
    }
}
customElements.define('devtools-file-source-icon', FileSourceIcon);
//# sourceMappingURL=FileSourceIcon.js.map