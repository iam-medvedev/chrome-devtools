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
const UIStrings = {
    /**
     * @description Text to tell the user the estimated savings for this insight.
     * @example {401 ms} PH1
     */
    estimatedSavingsJustTime: 'Est savings: {PH1}',
    /**
     * @description Text to tell the user the estimated savings for this insight.
     * @example {112 kB} PH1
     */
    estimatedSavingsJustBytes: 'Est savings: {PH1}',
    /**
     * @description Text to tell the user the estimated savings for this insight.
     * @example {401 ms} PH1
     * @example {112 kB} PH2
     */
    estimatedSavingsTimingAndBytes: 'Est savings: {PH1} && {PH2}',
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
export class SidebarInsight extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-sidebar-insight`;
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
            return i18nString(UIStrings.estimatedSavingsJustTime, {
                PH1: timeString,
            });
        }
        if (bytesString) {
            return i18nString(UIStrings.estimatedSavingsJustBytes, {
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
        const output = LitHtml.html `
      <div class=${containerClasses}>
        <header @click=${this.#dispatchInsightToggle} jslog=${VisualLogging.action(`timeline.toggle-insight.${this.#insightInternalName}`).track({ click: true })}>
          ${this.#renderHoverIcon(this.#expanded)}
          <h3 class="insight-title">${this.#insightTitle}</h3>
          ${estimatedSavingsString ?
            LitHtml.html `
            <slot name="insight-savings" class="insight-savings">
              ${estimatedSavingsString}
            </slot>
          </div>`
            : LitHtml.nothing}
        </header>
        ${this.#expanded ? LitHtml.html `
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