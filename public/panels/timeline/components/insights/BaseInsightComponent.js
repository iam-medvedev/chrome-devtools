// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../../../ui/components/markdown_view/markdown_view.js';
import * as Common from '../../../../core/common/common.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Root from '../../../../core/root/root.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Buttons from '../../../../ui/components/buttons/buttons.js';
import * as ComponentHelpers from '../../../../ui/components/helpers/helpers.js';
import * as UI from '../../../../ui/legacy/legacy.js';
import * as Lit from '../../../../ui/lit/lit.js';
import * as VisualLogging from '../../../../ui/visual_logging/visual_logging.js';
import { md } from '../../utils/Helpers.js';
import * as Utils from '../../utils/utils.js';
import baseInsightComponentStylesRaw from './baseInsightComponent.css.js';
import * as SidebarInsight from './SidebarInsight.js';
// TODO(crbug.com/391381439): Fully migrate off of constructed style sheets.
const baseInsightComponentStyles = new CSSStyleSheet();
baseInsightComponentStyles.replaceSync(baseInsightComponentStylesRaw.cssContent);
const { html } = Lit;
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
    static litTagName = Lit.StaticHtml.literal ``;
    shadow = this.attachShadow({ mode: 'open' });
    #selected = false;
    #model = null;
    #parsedTrace = null;
    #insightsAskAiEnabled = false;
    get model() {
        return this.#model;
    }
    data = {
        bounds: null,
        insightSetKey: null,
    };
    #boundRender = this.#render.bind(this);
    sharedTableState = {
        selectedRowEl: null,
        selectionIsSticky: false,
    };
    #initialOverlays = null;
    scheduleRender() {
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    connectedCallback() {
        this.shadow.adoptedStyleSheets.push(baseInsightComponentStyles);
        this.setAttribute('jslog', `${VisualLogging.section(`timeline.insights.${this.internalName}`)}`);
        // Used for unit test purposes when querying the DOM.
        this.dataset.insightName = this.internalName;
        const { devToolsAiAssistancePerformanceAgent } = Root.Runtime.hostConfig;
        this.#insightsAskAiEnabled =
            Boolean(devToolsAiAssistancePerformanceAgent?.enabled && devToolsAiAssistancePerformanceAgent?.insightsEnabled);
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
    set insightSetKey(insightSetKey) {
        this.data.insightSetKey = insightSetKey;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    get bounds() {
        return this.data.bounds;
    }
    set bounds(bounds) {
        this.data.bounds = bounds;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    set parsedTrace(parsedTrace) {
        this.#parsedTrace = parsedTrace;
    }
    #dispatchInsightToggle() {
        if (this.#selected) {
            this.dispatchEvent(new SidebarInsight.InsightDeactivated());
            UI.Context.Context.instance().setFlavor(Utils.InsightAIContext.ActiveInsight, null);
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
        const containerClasses = Lit.Directives.classMap({
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
    #render() {
        if (!this.model) {
            return;
        }
        this.#renderWithContent();
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
    renderNode(backendNodeId, fallbackText) {
        const fallback = fallbackText ?? Lit.nothing;
        if (!this.#parsedTrace) {
            return html `${fallback}`;
        }
        const domNodePromise = Trace.Extras.FetchNodes.domNodeForBackendNodeID(this.#parsedTrace, backendNodeId).then((node) => {
            if (!node) {
                return fallback;
            }
            return Common.Linkifier.Linkifier.linkify(node);
        });
        return html `${Lit.Directives.until(domNodePromise, fallback)}`;
    }
    #askAIButtonClick() {
        if (!this.#model || !this.#parsedTrace) {
            return;
        }
        // matches the one in ai_assistance-meta.ts
        const actionId = 'drjones.performance-insight-context';
        if (!UI.ActionRegistry.ActionRegistry.instance().hasAction(actionId)) {
            return;
        }
        const context = new Utils.InsightAIContext.ActiveInsight(this.#model, this.#parsedTrace);
        UI.Context.Context.instance().setFlavor(Utils.InsightAIContext.ActiveInsight, context);
        // Trigger the AI Assistance panel to open.
        const action = UI.ActionRegistry.ActionRegistry.instance().getAction(actionId);
        void action.execute();
    }
    #renderInsightContent(insightModel) {
        if (!this.#selected) {
            return Lit.nothing;
        }
        // Only render the insight body content if it is selected.
        // To avoid re-rendering triggered from elsewhere.
        const content = this.renderContent();
        // clang-format off
        return html `
      <div class="insight-body">
        <div class="insight-description">${md(insightModel.description)}</div>
        <div class="insight-content">${content}</div>
        ${this.#insightsAskAiEnabled ? html `
          <devtools-button data-ask-ai @click=${this.#askAIButtonClick}>Ask AI (placeholder UX)</devtools-button>
        ` : Lit.nothing}
      </div>`;
        // clang-format on
    }
    #renderWithContent() {
        if (!this.#model) {
            Lit.render(Lit.nothing, this.shadow, { host: this });
            return;
        }
        const containerClasses = Lit.Directives.classMap({
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
            : Lit.nothing}
        </header>
        ${this.#renderInsightContent(this.#model)}
      </div>
    `;
        // clang-format on
        Lit.render(output, this.shadow, { host: this });
        if (this.#selected) {
            requestAnimationFrame(() => requestAnimationFrame(() => this.scrollIntoViewIfNeeded()));
        }
    }
}
//# sourceMappingURL=BaseInsightComponent.js.map