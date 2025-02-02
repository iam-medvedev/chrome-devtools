// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../../ui/components/icon_button/icon_button.js';
import { html, nothing, render } from '../../lit/lit.js';
import cardStylesRaw from './card.css.js';
// TODO(crbug.com/391381439): Fully migrate off of constructed style sheets.
const cardStyles = new CSSStyleSheet();
cardStyles.replaceSync(cardStylesRaw.cssContent);
export class Card extends HTMLElement {
    #heading;
    #headingIconName;
    #headingSuffix;
    #content = [];
    #shadow = this.attachShadow({ mode: 'open' });
    set data(data) {
        this.#heading = data.heading;
        this.#headingIconName = data.headingIconName;
        this.#content.forEach(content => content.remove());
        data.content.forEach(content => {
            content.slot = 'content';
            this.append(content);
        });
        this.#content = data.content;
        this.#headingSuffix?.remove();
        if (data.headingSuffix) {
            this.#headingSuffix = data.headingSuffix;
            data.headingSuffix.slot = 'heading-suffix';
            this.append(data.headingSuffix);
        }
        this.#render();
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [cardStyles];
        this.#render();
    }
    #render() {
        // clang-format off
        render(html `
    <div class="card">
      <div class="heading-wrapper">
        ${this.#headingIconName ? html `<devtools-icon class="heading-icon" name=${this.#headingIconName}></devtools-icon>` : nothing}
        <div role="heading" aria-level="2" class="heading">${this.#heading}</div>
        <slot name="heading-suffix"></slot>
      </div>
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