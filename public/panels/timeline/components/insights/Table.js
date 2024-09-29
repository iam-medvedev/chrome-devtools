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
    #insight;
    #state;
    #headers;
    #rows;
    #interactive = false;
    #currentHoverIndex = null;
    set data(data) {
        this.#insight = data.insight;
        this.#state = data.insight.sharedTableState;
        this.#headers = data.headers;
        this.#rows = data.rows;
        // If this table isn't interactive, don't attach mouse listeners or use CSS :hover.
        this.#interactive = this.#rows.some(row => row.overlays);
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets.push(tableStyles);
    }
    #onHoverRow(e) {
        if (!(e.target instanceof HTMLElement)) {
            return;
        }
        const rowEl = e.target.closest('tr');
        if (!rowEl || !rowEl.parentElement) {
            return;
        }
        const index = [...rowEl.parentElement.children].indexOf(rowEl);
        if (index === -1 || index === this.#currentHoverIndex) {
            return;
        }
        this.#currentHoverIndex = index;
        // Temporarily selects the row, but only if there is not already a sticky selection.
        this.#onSelectedRowChanged(rowEl, index, { isHover: true });
    }
    #onClickRow(e) {
        if (!(e.target instanceof HTMLElement)) {
            return;
        }
        const rowEl = e.target.closest('tr');
        if (!rowEl || !rowEl.parentElement) {
            return;
        }
        const index = [...rowEl.parentElement.children].indexOf(rowEl);
        if (index === -1) {
            return;
        }
        // Select the row and make it sticky.
        this.#onSelectedRowChanged(rowEl, index, { sticky: true });
    }
    #onMouseLeave() {
        this.#currentHoverIndex = null;
        // Unselect the row, unless it's sticky.
        this.#onSelectedRowChanged(null, null);
    }
    #onSelectedRowChanged(rowEl, rowIndex, opts = {}) {
        if (!this.#rows || !this.#state || !this.#insight) {
            return;
        }
        if (this.#state.selectionIsSticky && !opts.sticky) {
            return;
        }
        // Unselect a sticky-selection when clicking it for a second time.
        if (this.#state.selectionIsSticky && rowEl === this.#state.selectedRowEl) {
            rowEl = null;
            opts.sticky = false;
        }
        if (rowEl && rowIndex !== null) {
            const overlays = this.#rows[rowIndex].overlays;
            if (overlays) {
                this.#insight.toggleTemporaryOverlays(overlays, { updateTraceWindow: !opts.isHover });
            }
        }
        else {
            this.#insight.toggleTemporaryOverlays(null);
        }
        this.#state.selectedRowEl?.classList.remove('selected');
        rowEl?.classList.add('selected');
        this.#state.selectedRowEl = rowEl;
        this.#state.selectionIsSticky = opts.sticky ?? false;
    }
    async #render() {
        if (!this.#headers || !this.#rows) {
            return;
        }
        LitHtml.render(LitHtml.html `<table
          class=${LitHtml.Directives.classMap({
            interactive: this.#interactive,
        })}
          @mouseleave=${this.#interactive ? this.#onMouseLeave : null}>
        <thead>
          <tr>
          ${this.#headers.map(h => LitHtml.html `<th scope="col">${h}</th>`)}
          </tr>
        </thead>
        <tbody
          @mouseover=${this.#interactive ? this.#onHoverRow : null}
          @click=${this.#interactive ? this.#onClickRow : null}
        >
          ${this.#rows.map(row => {
            const rowsEls = row.values.map((value, i) => i === 0 ? LitHtml.html `<th scope="row">${value}</th>` : LitHtml.html `<td>${value}</td>`);
            return LitHtml.html `<tr>${rowsEls}</tr>`;
        })}
        </tbody>
      </div>`, this.#shadow, { host: this });
    }
}
customElements.define('devtools-performance-table', Table);
//# sourceMappingURL=Table.js.map