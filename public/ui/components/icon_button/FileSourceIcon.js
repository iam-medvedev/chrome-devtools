// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-lit-render-outside-of-view */
import './IconButton.js';
import { Directives, html, render } from '../../lit/lit.js';
import fileSourceIconStyles from './fileSourceIcon.css.js';
const { classMap } = Directives;
export class FileSourceIcon extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #iconType;
    #contentType;
    #hasDotBadge;
    #isDotPurple;
    constructor(iconType) {
        super();
        this.#iconType = iconType;
    }
    set data(data) {
        this.#contentType = data.contentType;
        this.#hasDotBadge = data.hasDotBadge;
        this.#isDotPurple = data.isDotPurple;
        this.#render();
    }
    get data() {
        return {
            contentType: this.#contentType,
            hasDotBadge: this.#hasDotBadge,
            isDotPurple: this.#isDotPurple,
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
        // clang-format off
        render(html `<style>${fileSourceIconStyles.cssText}</style><devtools-icon .name=${this.#iconType} class=${iconClasses}></devtools-icon>`, this.#shadow, {
            host: this,
        });
        // clang-format on
    }
}
customElements.define('devtools-file-source-icon', FileSourceIcon);
//# sourceMappingURL=FileSourceIcon.js.map