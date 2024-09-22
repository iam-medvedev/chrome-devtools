// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Buttons from '../../../../ui/components/buttons/buttons.js';
import * as ComponentHelpers from '../../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../../../ui/visual_logging/visual_logging.js';
import sidebarInsightStyles from './sidebarInsight.css.js';
const UIStrings = {
    /**
     * @description Text to tell the user the estimated savings for this insight.
     * @example {401ms} PH1
     */
    estimatedSavings: 'Est savings: {PH1}',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/SidebarInsight.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
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
export class NavigationBoundsHovered extends Event {
    bounds;
    static eventName = 'navigationhovered';
    constructor(bounds) {
        super(NavigationBoundsHovered.eventName, { bubbles: true, composed: true });
        this.bounds = bounds;
    }
}
export class InsightOverlayOverride extends Event {
    overlays;
    static eventName = 'insightoverlayoverride';
    constructor(overlays) {
        super(InsightOverlayOverride.eventName, { bubbles: true, composed: true });
        this.overlays = overlays;
    }
}
export class SidebarInsight extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-sidebar-insight`;
    #shadow = this.attachShadow({ mode: 'open' });
    #boundRender = this.#render.bind(this);
    #insightTitle = '';
    #expanded = false;
    #estimatedSavings = undefined;
    set data(data) {
        this.#insightTitle = data.title;
        this.#expanded = data.expanded;
        this.#estimatedSavings = data.estimatedSavings;
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
          ${this.#estimatedSavings && this.#estimatedSavings > 0 ?
            LitHtml.html `
            <slot name="insight-savings" class="insight-savings">
              ${i18nString(UIStrings.estimatedSavings, { PH1: i18n.TimeUtilities.millisToString(this.#estimatedSavings) })}
            </slot>
          </div>`
            : LitHtml.nothing}
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