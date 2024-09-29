// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Marked from '../../../../third_party/marked/marked.js';
import * as ComponentHelpers from '../../../../ui/components/helpers/helpers.js';
import * as MarkdownView from '../../../../ui/components/markdown_view/markdown_view.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../../../ui/visual_logging/visual_logging.js';
import sidebarInsightStyles from './sidebarInsight.css.js';
import * as SidebarInsight from './SidebarInsight.js';
import { Category } from './types.js';
export function shouldRenderForCategory(options) {
    return options.activeCategory === Category.ALL || options.activeCategory === options.insightCategory;
}
export function insightIsActive(options) {
    const active = options.activeInsight && options.activeInsight.name === options.insightName &&
        options.activeInsight.insightSetKey === options.insightSetKey;
    return Boolean(active);
}
// This is an abstract base class so the component naming rules do not apply.
// eslint-disable-next-line rulesdir/check_component_naming
export class BaseInsight extends HTMLElement {
    shadow = this.attachShadow({ mode: 'open' });
    data = {
        insights: null,
        insightSetKey: null,
        activeInsight: null,
        activeCategory: Category.ALL,
    };
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
        this.shadow.adoptedStyleSheets.push(sidebarInsightStyles);
        this.setAttribute('jslog', `${VisualLogging.section(`timeline.insights.${this.internalName}`)}`);
        // Used for unit test purposes when querying the DOM.
        this.dataset.insightName = this.internalName;
    }
    set insights(insights) {
        this.data.insights = insights;
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
        if (!options) {
            options = { updateTraceWindow: true };
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
    isActive() {
        return insightIsActive({
            activeInsight: this.data.activeInsight,
            insightName: this.internalName,
            insightSetKey: this.data.insightSetKey,
        });
    }
}
/**
 * Returns a rendered MarkdownView component.
 *
 * This should not be used for markdown that is not guaranteed to be valid.
 */
export function md(markdown) {
    const tokens = Marked.Marked.lexer(markdown);
    return LitHtml.html `<${MarkdownView.MarkdownView.MarkdownView.litTagName}
    .data=${{ tokens }}>
  </${MarkdownView.MarkdownView.MarkdownView.litTagName}>`;
}
//# sourceMappingURL=Helpers.js.map