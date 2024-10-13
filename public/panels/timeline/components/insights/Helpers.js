// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../../../ui/components/markdown_view/markdown_view.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as Marked from '../../../../third_party/marked/marked.js';
import * as ComponentHelpers from '../../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../../../ui/visual_logging/visual_logging.js';
import sidebarInsightStyles from './sidebarInsight.css.js';
import * as SidebarInsight from './SidebarInsight.js';
import { Category } from './types.js';
const { html } = LitHtml;
export function shouldRenderForCategory(options) {
    return options.activeCategory === Category.ALL || options.activeCategory === options.insightCategory;
}
export function insightIsActive(options) {
    const active = options.activeInsight && options.activeInsight.name === options.insightName &&
        options.activeInsight.insightSetKey === options.insightSetKey;
    return Boolean(active);
}
// TODO(crbug.com/371615739): BaseInsight, SidebarInsight should be combined.
// This is an abstract base class so the component naming rules do not apply.
export class BaseInsight extends HTMLElement {
    // So we can use the TypeScript BaseInsight class without getting warnings
    // about litTagName. Every child should overrwrite this.
    static litTagName = LitHtml.literal ``;
    shadow = this.attachShadow({ mode: 'open' });
    data = {
        insights: null,
        parsedTrace: null,
        insightSetKey: null,
        activeInsight: null,
        activeCategory: Category.ALL,
    };
    // eslint-disable-next-line rulesdir/no_bound_component_methods
    #boundRender = this.#baseRender.bind(this);
    sharedTableState = {
        selectedRowEl: null,
        selectionIsSticky: false,
    };
    #initialOverlays = null;
    #hasRegisteredRelatedEvents = false;
    scheduleRender() {
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    connectedCallback() {
        this.shadow.adoptedStyleSheets.push(sidebarInsightStyles);
        this.setAttribute('jslog', `${VisualLogging.section(`timeline.insights.${this.internalName}`)}`);
        // Used for unit test purposes when querying the DOM.
        this.dataset.insightName = this.internalName;
        // TODO(crbug.com/371615739): this should be moved to model/trace/insights
        if (!this.#hasRegisteredRelatedEvents) {
            this.#hasRegisteredRelatedEvents = true;
            const events = this.getRelatedEvents();
            if (events.length) {
                this.dispatchEvent(new SidebarInsight.InsightProvideRelatedEvents(this.userVisibleTitle, events, this.#dispatchInsightActivatedEvent.bind(this)));
            }
        }
    }
    set insights(insights) {
        this.data.insights = insights;
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
    set activeInsight(activeInsight) {
        this.data.activeInsight = activeInsight;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    set activeCategory(activeCategory) {
        this.data.activeCategory = activeCategory;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    onSidebarClick() {
        if (this.isActive()) {
            this.dispatchEvent(new SidebarInsight.InsightDeactivated());
            return;
        }
        this.#dispatchInsightActivatedEvent();
    }
    #dispatchInsightActivatedEvent() {
        if (!this.data.insightSetKey) {
            // Shouldn't happen, but needed to satisfy TS.
            return;
        }
        this.sharedTableState.selectedRowEl?.classList.remove('selected');
        this.sharedTableState.selectedRowEl = null;
        this.sharedTableState.selectionIsSticky = false;
        this.dispatchEvent(new SidebarInsight.InsightActivated(this.internalName, this.data.insightSetKey, this.getInitialOverlays()));
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
        if (!this.isActive()) {
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
    // Should be overrided by subclasses.
    getRelatedEvents() {
        return [];
    }
    #baseRender() {
        this.render();
        if (this.isActive()) {
            requestAnimationFrame(() => requestAnimationFrame(() => this.scrollIntoViewIfNeeded()));
        }
    }
    isActive() {
        return insightIsActive({
            activeInsight: this.data.activeInsight,
            insightName: this.internalName,
            insightSetKey: this.data.insightSetKey,
        });
    }
    getInsightSetUrl() {
        const url = this.data.insights?.get(this.data.insightSetKey ?? '')?.url;
        Platform.TypeScriptUtilities.assertNotNullOrUndefined(url, 'Expected url for insight set');
        return new URL(url);
    }
}
/**
 * Returns a rendered MarkdownView component.
 *
 * This should not be used for markdown that is not guaranteed to be valid.
 */
export function md(markdown) {
    const tokens = Marked.Marked.lexer(markdown);
    return html `<devtools-markdown-view
    .data=${{ tokens }}>
  </devtools-markdown-view>`;
}
//# sourceMappingURL=Helpers.js.map