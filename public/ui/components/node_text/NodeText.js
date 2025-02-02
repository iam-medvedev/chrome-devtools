// Copyright (c) 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Lit from '../../../ui/lit/lit.js';
import nodeTextStylesRaw from './nodeText.css.js';
// TODO(crbug.com/391381439): Fully migrate off of constructed style sheets.
const nodeTextStyles = new CSSStyleSheet();
nodeTextStyles.replaceSync(nodeTextStylesRaw.cssContent);
const { render, html } = Lit;
export class NodeText extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #nodeTitle = '';
    #nodeId = '';
    #nodeClasses = [];
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [nodeTextStyles];
    }
    set data(data) {
        this.#nodeTitle = data.nodeTitle;
        this.#nodeId = data.nodeId;
        this.#nodeClasses = data.nodeClasses;
        this.#render();
    }
    #render() {
        const hasId = Boolean(this.#nodeId);
        const hasNodeClasses = Boolean(this.#nodeClasses && this.#nodeClasses.length > 0);
        const parts = [
            html `<span class="node-label-name">${this.#nodeTitle}</span>`,
        ];
        if (this.#nodeId) {
            const classes = Lit.Directives.classMap({
                'node-label-id': true,
                'node-multiple-descriptors': hasNodeClasses,
            });
            parts.push(html `<span class=${classes}>#${CSS.escape(this.#nodeId)}</span>`);
        }
        if (this.#nodeClasses && this.#nodeClasses.length > 0) {
            const text = this.#nodeClasses.map(c => `.${CSS.escape(c)}`).join('');
            const classes = Lit.Directives.classMap({
                'node-label-class': true,
                'node-multiple-descriptors': hasId,
            });
            parts.push(html `<span class=${classes}>${text}</span>`);
        }
        // Disabled until https://crbug.com/1079231 is fixed.
        // clang-format off
        render(html `
      ${parts}
    `, this.#shadow, {
            host: this,
        });
        // clang-format on
    }
}
customElements.define('devtools-node-text', NodeText);
//# sourceMappingURL=NodeText.js.map