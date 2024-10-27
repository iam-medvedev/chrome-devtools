// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as LitHtml from '../../lit-html/lit-html.js';
import cardStyles from './card.css.js';
const { html } = LitHtml;
export class Card extends HTMLElement {
    #heading;
    #content = [];
    #shadow = this.attachShadow({ mode: 'open' });
    set data(data) {
        this.#heading = data.heading;
        this.#content.forEach(content => content.remove());
        data.content.forEach(content => {
            content.slot = 'content';
            this.append(content);
        });
        this.#content = data.content;
        this.#render();
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [cardStyles];
        this.#render();
    }
    #render() {
        // clang-format off
        LitHtml.render(html `
    <div class="card">
      <div role="heading" aria-level="2" class="heading">${this.#heading}</div>
      <slot name="content" class='content-container'></slot>
    </div>
    `, this.#shadow, {
            host: this,
        });
        // clang-format on
    }
}
customElements.define('devtools-card', Card);
//# sourceMappingURL=Card.js.map