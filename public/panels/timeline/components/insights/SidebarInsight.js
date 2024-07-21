// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as ComponentHelpers from '../../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import sidebarInsightStyles from './sidebarInsight.css.js';
export class SidebarInsight extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-sidebar-insight`;
    #shadow = this.attachShadow({ mode: 'open' });
    #boundRender = this.#render.bind(this);
    #insightTitle = '';
    #expanded = false;
    set data(data) {
        this.#insightTitle = data.title;
        this.#expanded = data.expanded;
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [sidebarInsightStyles];
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    #render() {
        let output;
        if (!this.#expanded) {
            output = LitHtml.html `
        <div class="insight closed">
            <h3 class="insight-title">${this.#insightTitle}</h3>
        </div>`;
        }
        else {
            output = LitHtml.html `
        <div class="insight">
            <h3 class="insight-title">${this.#insightTitle}</h3>
            <slot name="insight-description"></slot>
            <slot name="insight-content"></slot>
        </div>`;
        }
        LitHtml.render(output, this.#shadow, { host: this });
    }
}
customElements.define('devtools-performance-sidebar-insight', SidebarInsight);
//# sourceMappingURL=SidebarInsight.js.map