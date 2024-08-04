// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as ComponentHelpers from '../../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import sidebarInsightStyles from './sidebarInsight.css.js';
export class InsightActivated extends Event {
    name;
    navigationId;
    createOverlayFn;
    static eventName = 'insightactivated';
    constructor(name, navigationId, createOverlayFn) {
        super(InsightActivated.eventName, { bubbles: true, composed: true });
        this.name = name;
        this.navigationId = navigationId;
        this.createOverlayFn = createOverlayFn;
    }
}
export class InsightDeactivated extends Event {
    static eventName = 'insightdeactivated';
    constructor() {
        super(InsightDeactivated.eventName, { bubbles: true, composed: true });
    }
}
export class SidebarInsight extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-sidebar-insight`;
    #shadow = this.attachShadow({ mode: 'open' });
    #boundRender = this.#render.bind(this);
    #insightTitle = '';
    #expanded = false;
    set data(data) {
        this.#insightTitle = data.title;
        this.#expanded = data.expanded;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [sidebarInsightStyles];
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    #dispatchInsightToggle() {
        this.dispatchEvent(new CustomEvent('insighttoggleclick'));
    }
    #render() {
        let output;
        if (!this.#expanded) {
            output = LitHtml.html `
        <div class="insight closed">
          <header @click=${this.#dispatchInsightToggle}>
            <h3 class="insight-title">${this.#insightTitle}</h3>
          </header>
        </div>`;
        }
        else {
            output = LitHtml.html `
        <div class="insight">
          <header @click=${this.#dispatchInsightToggle}>
            <h3 class="insight-title">${this.#insightTitle}</h3>
          </header>
          <div class="insight-body">
            <slot name="insight-description"></slot>
            <slot name="insight-content"></slot>
          </div>
        </div>`;
        }
        LitHtml.render(output, this.#shadow, { host: this });
    }
}
customElements.define('devtools-performance-sidebar-insight', SidebarInsight);
//# sourceMappingURL=SidebarInsight.js.map