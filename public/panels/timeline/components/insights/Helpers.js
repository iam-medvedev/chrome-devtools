// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Platform from '../../../../core/platform/platform.js';
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
        parsedTrace: null,
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
    isActive() {
        return insightIsActive({
            activeInsight: this.data.activeInsight,
            insightName: this.internalName,
            insightSetKey: this.data.insightSetKey,
        });
    }
}
// TODO(crbug.com/368170718): consider better treatments for shortening URLs.
export function shortenUrl(url) {
    const maxLength = 20;
    // TODO(crbug.com/368170718): This is something that should only be done if the origin is the same
    // as the insight set's origin.
    const elideOrigin = false;
    if (elideOrigin) {
        try {
            url = new URL(url).pathname;
        }
        catch {
        }
    }
    if (url.length <= maxLength) {
        return url;
    }
    return Platform.StringUtilities.trimMiddle(url.split('/').at(-1) ?? '', maxLength);
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
export class EventReferenceClick extends Event {
    event;
    static eventName = 'eventreferenceclick';
    constructor(event) {
        super(EventReferenceClick.eventName, { bubbles: true, composed: true });
        this.event = event;
    }
}
class EventRef extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-event-ref`;
    #shadow = this.attachShadow({ mode: 'open' });
    #boundRender = this.#render.bind(this);
    #baseInsight = null;
    #text = null;
    #event = null;
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [sidebarInsightStyles];
    }
    set text(text) {
        this.#text = text;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    set baseInsight(baseInsight) {
        this.#baseInsight = baseInsight;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    set event(event) {
        this.#event = event;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    #render() {
        if (!this.#baseInsight || !this.#text || !this.#event) {
            return;
        }
        // clang-format off
        LitHtml.render(LitHtml.html `
      <span class=devtools-link @click=${(e) => {
            e.stopPropagation();
            if (this.#baseInsight && this.#event) {
                this.#baseInsight.dispatchEvent(new EventReferenceClick(this.#event));
            }
        }}>${this.#text}</span>
    `, this.#shadow, { host: this });
        // clang-format on
    }
}
export function eventRef(baseInsight, event, text) {
    return LitHtml.html `<${EventRef.litTagName}
    .baseInsight=${baseInsight}
    .event=${event}
    .text=${text}
  ></${EventRef.litTagName}>`;
}
customElements.define('devtools-performance-event-ref', EventRef);
//# sourceMappingURL=Helpers.js.map