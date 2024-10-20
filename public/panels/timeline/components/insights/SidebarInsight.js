// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as Buttons from '../../../../ui/components/buttons/buttons.js';
import * as ComponentHelpers from '../../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../../../ui/visual_logging/visual_logging.js';
import { md } from './Helpers.js';
import sidebarInsightStyles from './sidebarInsight.css.js';
const { html } = LitHtml;
const UIStrings = {
    /**
     * @description Text to tell the user the estimated time or size savings for this insight. "&" means "and" - space is limited to prefer abbreviated terms if possible. Text will still fit if not short, it just won't look very good, so using no abbreviations is fine if necessary.
     * @example {401 ms} PH1
     * @example {112 kB} PH1
     */
    estimatedSavings: 'Est savings: {PH1}',
    /**
     * @description Text to tell the user the estimated time and size savings for this insight. "&" means "and", "Est" means "Estimated" - space is limited to prefer abbreviated terms if possible. Text will still fit if not short, it just won't look very good, so using no abbreviations is fine if necessary.
     * @example {401 ms} PH1
     * @example {112 kB} PH2
     */
    estimatedSavingsTimingAndBytes: 'Est savings: {PH1} & {PH2}',
    /**
     * @description Used for screen-readers as a label on the button to expand an insight to view details
     * @example {LCP by phase} PH1
     */
    viewDetails: 'View details for {PH1}',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/SidebarInsight.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class InsightActivated extends Event {
    name;
    insightSetKey;
    overlays;
    static eventName = 'insightactivated';
    constructor(name, insightSetKey, overlays) {
        super(InsightActivated.eventName, { bubbles: true, composed: true });
        this.name = name;
        this.insightSetKey = insightSetKey;
        this.overlays = overlays;
    }
}
export class InsightDeactivated extends Event {
    static eventName = 'insightdeactivated';
    constructor() {
        super(InsightDeactivated.eventName, { bubbles: true, composed: true });
    }
}
export class InsightSetHovered extends Event {
    bounds;
    static eventName = 'insightsethovered';
    constructor(bounds) {
        super(InsightSetHovered.eventName, { bubbles: true, composed: true });
        this.bounds = bounds;
    }
}
export class InsightSetZoom extends Event {
    bounds;
    static eventName = 'insightsetzoom';
    constructor(bounds) {
        super(InsightSetZoom.eventName, { bubbles: true, composed: true });
        this.bounds = bounds;
    }
}
export class InsightProvideOverlays extends Event {
    overlays;
    options;
    static eventName = 'insightprovideoverlays';
    constructor(overlays, options) {
        super(InsightProvideOverlays.eventName, { bubbles: true, composed: true });
        this.overlays = overlays;
        this.options = options;
    }
}
export class InsightProvideRelatedEvents extends Event {
    label;
    events;
    activateInsight;
    static eventName = 'insightproviderelatedevents';
    constructor(label, events, activateInsight) {
        super(InsightProvideRelatedEvents.eventName, { bubbles: true, composed: true });
        this.label = label;
        this.events = events;
        this.activateInsight = activateInsight;
    }
}
export class SidebarInsight extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #boundRender = this.#render.bind(this);
    #insightTitle = '';
    #insightDescription = '';
    #insightInternalName = '';
    #expanded = false;
    #estimatedSavingsTime = undefined;
    #estimatedSavingsBytes = undefined;
    set data(data) {
        this.#insightTitle = data.title;
        this.#insightDescription = data.description;
        this.#insightInternalName = data.internalName;
        this.#expanded = data.expanded;
        this.#estimatedSavingsTime = data.estimatedSavingsTime;
        this.#estimatedSavingsBytes = data.estimatedSavingsBytes;
        // Used for testing.
        this.dataset.insightTitle = data.title;
        if (data.expanded) {
            this.dataset.insightExpanded = '';
        }
        else {
            delete this.dataset.insightExpanded;
        }
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
        return html `
      <div class=${containerClasses} inert>
        <devtools-button .data=${{
            variant: "icon" /* Buttons.Button.Variant.ICON */,
            iconName: 'chevron-down',
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
        }}
      ></devtools-button>
      </div>

    `;
        // clang-format on
    }
    /**
     * Ensure that if the user presses enter or space on a header, we treat it
     * like a click and toggle the insight.
     */
    #handleHeaderKeyDown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.stopPropagation();
            this.#dispatchInsightToggle();
        }
    }
    #getEstimatedSavingsString() {
        let timeString, bytesString;
        if (this.#estimatedSavingsTime !== undefined && this.#estimatedSavingsTime > 0) {
            timeString = i18n.TimeUtilities.millisToString(this.#estimatedSavingsTime);
        }
        if (this.#estimatedSavingsBytes !== undefined && this.#estimatedSavingsBytes > 0) {
            bytesString = Platform.NumberUtilities.bytesToString(this.#estimatedSavingsBytes);
        }
        if (timeString && bytesString) {
            return i18nString(UIStrings.estimatedSavingsTimingAndBytes, {
                PH1: timeString,
                PH2: bytesString,
            });
        }
        if (timeString) {
            return i18nString(UIStrings.estimatedSavings, {
                PH1: timeString,
            });
        }
        if (bytesString) {
            return i18nString(UIStrings.estimatedSavings, {
                PH1: bytesString,
            });
        }
        return null;
    }
    #render() {
        const containerClasses = LitHtml.Directives.classMap({
            insight: true,
            closed: !this.#expanded,
        });
        const estimatedSavingsString = this.#getEstimatedSavingsString();
        // clang-format off
        const output = html `
      <div class=${containerClasses}>
        <header @click=${this.#dispatchInsightToggle}
          @keydown=${this.#handleHeaderKeyDown}
          jslog=${VisualLogging.action(`timeline.toggle-insight.${this.#insightInternalName}`).track({ click: true })}
          tabIndex="0"
          role="button"
          aria-expanded=${this.#expanded}
          aria-label=${i18nString(UIStrings.viewDetails, { PH1: this.#insightTitle })}
        >
          ${this.#renderHoverIcon(this.#expanded)}
          <h3 class="insight-title">${this.#insightTitle}</h3>
          ${estimatedSavingsString ?
            html `
            <slot name="insight-savings" class="insight-savings">
              ${estimatedSavingsString}
            </slot>
          </div>`
            : LitHtml.nothing}
        </header>
        ${this.#expanded ? html `
          <div class="insight-body">
            <div class="insight-description">${this.#insightDescription ? md(this.#insightDescription) : LitHtml.nothing}</div>
            <div class="insight-content">
              <slot name="insight-content"></slot>
            </div>
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