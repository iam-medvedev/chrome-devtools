// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Marked from '../../../../third_party/marked/marked.js';
import * as ComponentHelpers from '../../../../ui/components/helpers/helpers.js';
import * as MarkdownView from '../../../../ui/components/markdown_view/markdown_view.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import sidebarInsightStyles from './sidebarInsight.css.js';
import * as SidebarInsight from './SidebarInsight.js';
import { InsightsCategories } from './types.js';
export function shouldRenderForCategory(options) {
    return options.activeCategory === InsightsCategories.ALL || options.activeCategory === options.insightCategory;
}
export function insightIsActive(options) {
    const active = options.activeInsight && options.activeInsight.name === options.insightName &&
        options.activeInsight.navigationId === options.insightNavigationId;
    return Boolean(active);
}
// This is an abstract base class so the component naming rules do not apply.
// eslint-disable-next-line rulesdir/check_component_naming
export class BaseInsight extends HTMLElement {
    shadow = this.attachShadow({ mode: 'open' });
    data = {
        insights: null,
        navigationId: null,
        activeInsight: null,
        activeCategory: InsightsCategories.ALL,
    };
    #boundRender = this.render.bind(this);
    scheduleRender() {
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    connectedCallback() {
        this.shadow.adoptedStyleSheets.push(sidebarInsightStyles);
    }
    set insights(insights) {
        this.data.insights = insights;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    set navigationId(navigationId) {
        this.data.navigationId = navigationId;
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
        if (!this.data.navigationId) {
            // Shouldn't happen, but needed to satisfy TS.
            return;
        }
        this.dispatchEvent(new SidebarInsight.InsightActivated(this.internalName, this.data.navigationId, this.createOverlays.bind(this)));
    }
    isActive() {
        return insightIsActive({
            activeInsight: this.data.activeInsight,
            insightName: this.internalName,
            insightNavigationId: this.data.navigationId,
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