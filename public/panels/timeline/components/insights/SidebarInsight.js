// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Buttons from '../../../../ui/components/buttons/buttons.js';
import * as ComponentHelpers from '../../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../../../ui/visual_logging/visual_logging.js';
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
    #renderHoverIcon(insightIsActive) {
        // clang-format off
        const containerClasses = LitHtml.Directives.classMap({
            'insight-hover-icon': true,
            active: insightIsActive,
        });
        return LitHtml.html `
      <div class=${containerClasses} aria-hidden="true">
        <${Buttons.Button.Button.litTagName} .data=${{
            variant: "icon" /* Buttons.Button.Variant.ICON */,
            iconName: 'chevron-down',
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
        }}
      ></${Buttons.Button.Button.litTagName}>
      </div>

    `;
        // clang-format on
    }
    #render() {
        const containerClasses = LitHtml.Directives.classMap({
            insight: true,
            closed: !this.#expanded,
        });
        // clang-format off
        const output = LitHtml.html `
      <div class=${containerClasses}>
        <header @click=${this.#dispatchInsightToggle} jslog=${VisualLogging.action('timeline.toggle-insight').track({ click: true })}>
          ${this.#renderHoverIcon(this.#expanded)}
          <h3 class="insight-title">${this.#insightTitle}</h3>
        </header>
        ${this.#expanded ? LitHtml.html `
          <div class="insight-body">
            <slot name="insight-description"></slot>
            <slot name="insight-content"></slot>
          </div>`
            : LitHtml.nothing}
      </div>
    `;
        // clang-format on
        LitHtml.render(output, this.#shadow, { host: this });
    }
}
customElements.define('devtools-performance-sidebar-insight', SidebarInsight);
//# sourceMappingURL=SidebarInsight.js.map