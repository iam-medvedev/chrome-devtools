// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../../../ui/components/markdown_view/markdown_view.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Buttons from '../../../../ui/components/buttons/buttons.js';
import * as ComponentHelpers from '../../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../../../ui/visual_logging/visual_logging.js';
import baseInsightComponentStyles from './baseInsightComponent.css.js';
import { md } from './Helpers.js';
import * as SidebarInsight from './SidebarInsight.js';
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
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/BaseInsightComponent.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class BaseInsightComponent extends HTMLElement {
    // So we can use the TypeScript BaseInsight class without getting warnings
    // about litTagName. Every child should overrwrite this.
    static litTagName = LitHtml.literal ``;
    #shadowRoot = this.attachShadow({ mode: 'open' });
    #selected = false;
    #model = null;
    get model() {
        return this.#model;
    }
    data = {
        parsedTrace: null,
        insightSetKey: null,
    };
    // eslint-disable-next-line rulesdir/no_bound_component_methods
    #boundRender = this.render.bind(this);
    sharedTableState = {
        selectedRowEl: null,
        selectionIsSticky: false,
    };
    #initialOverlays = null;
    scheduleRender() {
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    connectedCallback() {
        this.#shadowRoot.adoptedStyleSheets.push(baseInsightComponentStyles);
        this.setAttribute('jslog', `${VisualLogging.section(`timeline.insights.${this.internalName}`)}`);
        // Used for unit test purposes when querying the DOM.
        this.dataset.insightName = this.internalName;
    }
    set selected(selected) {
        if (!this.#selected && selected) {
            this.dispatchEvent(new SidebarInsight.InsightProvideOverlays(this.getInitialOverlays(), { updateTraceWindow: true }));
        }
        this.#selected = selected;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    get selected() {
        return this.#selected;
    }
    set model(model) {
        this.#model = model;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    set parsedTrace(parsedTrace) {
        this.data.parsedTrace = parsedTrace;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    set insightSetKey(insightSetKey) {
        this.data.insightSetKey = insightSetKey;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    #dispatchInsightToggle() {
        if (this.#selected) {
            this.dispatchEvent(new SidebarInsight.InsightDeactivated());
            return;
        }
        if (!this.data.insightSetKey) {
            // Shouldn't happen, but needed to satisfy TS.
            return;
        }
        this.sharedTableState.selectedRowEl?.classList.remove('selected');
        this.sharedTableState.selectedRowEl = null;
        this.sharedTableState.selectionIsSticky = false;
        this.dispatchEvent(new SidebarInsight.InsightActivated(this.model, this.data.insightSetKey));
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
    /**
     * Replaces the initial insight overlays with the ones provided.
     *
     * If `overlays` is null, reverts back to the initial overlays.
     *
     * This allows insights to provide an initial set of overlays,
     * and later temporarily replace all of those insights with a different set.
     * This enables the hover/click table interactions.
     */
    toggleTemporaryOverlays(overlays, options) {
        if (!this.#selected) {
            return;
        }
        this.dispatchEvent(new SidebarInsight.InsightProvideOverlays(overlays ?? this.getInitialOverlays(), options));
    }
    getInitialOverlays() {
        if (this.#initialOverlays) {
            return this.#initialOverlays;
        }
        this.#initialOverlays = this.createOverlays();
        return this.#initialOverlays;
    }
    getEstimatedSavingsTime() {
        return null;
    }
    getEstimatedSavingsBytes() {
        return null;
    }
    #getEstimatedSavingsString() {
        const savingsTime = this.getEstimatedSavingsTime();
        const savingsBytes = this.getEstimatedSavingsBytes();
        let timeString, bytesString;
        if (savingsTime) {
            timeString = i18n.TimeUtilities.millisToString(savingsTime);
        }
        if (savingsBytes) {
            bytesString = i18n.ByteUtilities.bytesToString(savingsBytes);
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
    renderWithContent(content) {
        if (content === LitHtml.nothing || !this.#model) {
            LitHtml.render(LitHtml.nothing, this.#shadowRoot, { host: this });
            return;
        }
        const containerClasses = LitHtml.Directives.classMap({
            insight: true,
            closed: !this.#selected,
        });
        const estimatedSavingsString = this.#getEstimatedSavingsString();
        // clang-format off
        const output = html `
      <div class=${containerClasses}>
        <header @click=${this.#dispatchInsightToggle}
          @keydown=${this.#handleHeaderKeyDown}
          jslog=${VisualLogging.action(`timeline.toggle-insight.${this.internalName}`).track({ click: true })}
          tabIndex="0"
          role="button"
          aria-expanded=${this.#selected}
          aria-label=${i18nString(UIStrings.viewDetails, { PH1: this.#model.title })}
        >
          ${this.#renderHoverIcon(this.#selected)}
          <h3 class="insight-title">${this.#model?.title}</h3>
          ${estimatedSavingsString ?
            html `
            <slot name="insight-savings" class="insight-savings">
              ${estimatedSavingsString}
            </slot>
          </div>`
            : LitHtml.nothing}
        </header>
        ${this.#selected ? html `
          <div class="insight-body">
            <div class="insight-description">${md(this.#model.description)}</div>
            <div class="insight-content">${content}</div>
          </div>`
            : LitHtml.nothing}
      </div>
    `;
        // clang-format on
        LitHtml.render(output, this.#shadowRoot, { host: this });
        if (this.#selected) {
            requestAnimationFrame(() => requestAnimationFrame(() => this.scrollIntoViewIfNeeded()));
        }
    }
}
//# sourceMappingURL=BaseInsightComponent.js.map