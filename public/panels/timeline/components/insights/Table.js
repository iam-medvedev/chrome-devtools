// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as ComponentHelpers from '../../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import tableStyles from './table.css.js';
export class Table extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-table`;
    #shadow = this.attachShadow({ mode: 'open' });
    #boundRender = this.#render.bind(this);
    #headers;
    #rows;
    set data(data) {
        this.#headers = data.headers;
        this.#rows = data.rows;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets.push(tableStyles);
    }
    async #render() {
        if (!this.#headers || !this.#rows) {
            return;
        }
        LitHtml.render(LitHtml.html `<table>
        <thead>
          <tr>
          ${this.#headers.map(h => LitHtml.html `<th scope="col">${h}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${this.#rows.map(row => {
            const rowsEls = row.map((value, i) => i === 0 ? LitHtml.html `<th scope="row">${value}</th>` : LitHtml.html `<td>${value}</td>`);
            return LitHtml.html `<tr>${rowsEls}</tr>`;
        })}
        </tbody>
      </div>`, this.#shadow, { host: this });
    }
}
customElements.define('devtools-performance-table', Table);
//# sourceMappingURL=Table.js.map