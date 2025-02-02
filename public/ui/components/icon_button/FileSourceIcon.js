// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { html, render } from '../../lit/lit.js';
import fileSourceIconStyles from './fileSourceIcon.css.js';
import { create } from './Icon.js';
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
        let iconStyles = [];
        if (this.#hasDotBadge) {
            iconStyles = this.#isDotPurple ? ['dot', 'purple'] : ['dot', 'green'];
        }
        if (this.#contentType) {
            iconStyles.push(this.#contentType);
        }
        const icon = create(this.#iconType, iconStyles.join(' '));
        // clang-format off
        render(html `<style>${fileSourceIconStyles.cssContent}</style>${icon}`, this.#shadow, {
            host: this,
        });
        // clang-format on
    }
}
customElements.define('devtools-file-source-icon', FileSourceIcon);
//# sourceMappingURL=FileSourceIcon.js.map