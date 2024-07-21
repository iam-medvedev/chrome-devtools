// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../core/common/common.js';
import * as Dialogs from '../../../ui/components/dialogs/dialogs.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as IconButton from '../../../ui/components/icon_button/icon_button.js';
import * as Menus from '../../../ui/components/menus/menus.js';
import * as UI from '../../../ui/legacy/legacy.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import sidebarStyles from './sidebar.css.js';
import * as SidebarAnnotationsTab from './SidebarAnnotationsTab.js';
import { SidebarSingleNavigation } from './SidebarSingleNavigation.js';
const DEFAULT_EXPANDED_WIDTH = 240;
export const DEFAULT_SIDEBAR_TAB = "Insights" /* SidebarTabsName.INSIGHTS */;
export var InsightsCategories;
(function (InsightsCategories) {
    InsightsCategories["ALL"] = "All";
    InsightsCategories["INP"] = "INP";
    InsightsCategories["LCP"] = "LCP";
    InsightsCategories["CLS"] = "CLS";
    InsightsCategories["OTHER"] = "Other";
})(InsightsCategories || (InsightsCategories = {}));
export class ToggleSidebarInsights extends Event {
    static eventName = 'toggleinsightclick';
    constructor() {
        super(ToggleSidebarInsights.eventName, { bubbles: true, composed: true });
    }
}
export class RemoveAnnotation extends Event {
    removedAnnotation;
    static eventName = 'removeannotation';
    constructor(removedAnnotation) {
        super(RemoveAnnotation.eventName, { bubbles: true, composed: true });
        this.removedAnnotation = removedAnnotation;
    }
}
export class SidebarWidget extends Common.ObjectWrapper.eventMixin(UI.SplitWidget.SplitWidget) {
    #sidebarUI = new SidebarUI();
    constructor() {
        super(true /* isVertical */, false /* secondIsSidebar */, undefined /* settingName */, DEFAULT_EXPANDED_WIDTH);
        this.sidebarElement().append(this.#sidebarUI);
        this.#sidebarUI.addEventListener('closebuttonclick', () => {
            this.dispatchEventToListeners("SidebarCollapseClick" /* WidgetEvents.SidebarCollapseClick */, {});
        });
    }
    updateContentsOnExpand() {
        this.#sidebarUI.onWidgetShow();
    }
    setAnnotationsTabContent(updatedAnnotations) {
        this.#sidebarUI.annotations = updatedAnnotations;
    }
    setTraceParsedData(traceParsedData) {
        this.#sidebarUI.traceParsedData = traceParsedData;
    }
    setInsights(insights) {
        this.#sidebarUI.insights = insights;
    }
}
export class SidebarUI extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-sidebar`;
    #shadow = this.attachShadow({ mode: 'open' });
    #activeTab = DEFAULT_SIDEBAR_TAB;
    #selectedCategory = InsightsCategories.ALL;
    #traceParsedData;
    #insights = null;
    #annotations = [];
    #renderBound = this.#render.bind(this);
    /**
     * When a trace has multiple navigations, we show an accordion with each
     * navigation in. You can only have one of these open at any time, and we
     * track it via this ID.
     */
    #activeNavigationId = null;
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [sidebarStyles];
    }
    onWidgetShow() {
        // Called when the SidebarWidget is expanded in order to render. Because
        // this happens distinctly from any data being passed in, we need to expose
        // a method to allow the widget to let us know when to render. This also
        // matters because this is when we can update the underline below the
        // active tab, now that the sidebar is visible and has width.
        this.#render();
    }
    set annotations(annotations) {
        this.#annotations = annotations;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
    }
    set insights(insights) {
        if (insights === this.#insights) {
            return;
        }
        this.#insights = insights;
        // Reset toggled insights.
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
    }
    set traceParsedData(traceParsedData) {
        if (this.#traceParsedData === traceParsedData) {
            // If this is the same trace, do not re-render.
            return;
        }
        this.#traceParsedData = traceParsedData;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
    }
    #closeButtonClick() {
        this.dispatchEvent(new Event('closebuttonclick'));
    }
    #onTabHeaderClicked(activeTab) {
        if (activeTab === this.#activeTab) {
            return;
        }
        this.#activeTab = activeTab;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
    }
    #renderHeader() {
        // clang-format off
        return LitHtml.html `
      <div class="tabs-header">
        <input
          type="button"
          value=${"Insights" /* SidebarTabsName.INSIGHTS */}
          ?active=${this.#activeTab === "Insights" /* SidebarTabsName.INSIGHTS */}
          @click=${() => this.#onTabHeaderClicked("Insights" /* SidebarTabsName.INSIGHTS */)}>
        <input
          type="button"
          value=${"Annotations" /* SidebarTabsName.ANNOTATIONS */}
          ?active=${this.#activeTab === "Annotations" /* SidebarTabsName.ANNOTATIONS */}
          @click=${() => this.#onTabHeaderClicked("Annotations" /* SidebarTabsName.ANNOTATIONS */)}>
      </div>
    `;
        // clang-format on
    }
    #onTargetSelected(event) {
        this.#selectedCategory = event.itemValue;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
    }
    #renderInsightsTabContent() {
        const navigations = this.#traceParsedData?.Meta.mainFrameNavigations ?? [];
        const hasMultipleNavigations = navigations.length > 1;
        // clang-format off
        return LitHtml.html `
      <${Menus.SelectMenu.SelectMenu.litTagName}
            class="target-select-menu"
            @selectmenuselected=${this.#onTargetSelected}
            .showDivider=${true}
            .showArrow=${true}
            .sideButton=${false}
            .showSelectedItem=${true}
            .showConnector=${false}
            .position=${"bottom" /* Dialogs.Dialog.DialogVerticalPosition.BOTTOM */}
            .buttonTitle=${this.#selectedCategory}
            jslog=${VisualLogging.dropDown('timeline.sidebar-insights-category-select').track({ click: true })}
          >
          ${Object.values(InsightsCategories).map(insightsCategory => {
            return LitHtml.html `
              <${Menus.Menu.MenuItem.litTagName} .value=${insightsCategory}>
                ${insightsCategory}
              </${Menus.Menu.MenuItem.litTagName}>
            `;
        })}
      </${Menus.SelectMenu.SelectMenu.litTagName}>

      ${navigations.map(navigation => {
            const id = navigation.args.data?.navigationId;
            const url = navigation.args.data?.documentLoaderURL;
            if (!id || !url) {
                return LitHtml.nothing;
            }
            const data = {
                traceParsedData: this.#traceParsedData ?? null,
                insights: this.#insights,
                navigationId: id,
                activeCategory: this.#selectedCategory,
            };
            const contents = LitHtml.html `
          <${SidebarSingleNavigation.litTagName} .data=${data}>
          </${SidebarSingleNavigation.litTagName}>
        `;
            if (hasMultipleNavigations) {
                return LitHtml.html `<div class="multi-nav-container">
            <details ?open=${id === this.#activeNavigationId} class="navigation-wrapper"><summary @click=${this.#navigationClicked(id)}>${url}</summary>${contents}</details>
            </div>`;
            }
            return contents;
        })}
    `;
        // clang-format on
    }
    #navigationClicked(id) {
        return (event) => {
            event.preventDefault();
            this.#activeNavigationId = id;
            void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
        };
    }
    #renderContent() {
        switch (this.#activeTab) {
            case "Insights" /* SidebarTabsName.INSIGHTS */:
                return this.#renderInsightsTabContent();
            case "Annotations" /* SidebarTabsName.ANNOTATIONS */:
                return LitHtml.html `
        <${SidebarAnnotationsTab.SidebarAnnotationsTab.litTagName} .annotations=${this.#annotations}></${SidebarAnnotationsTab.SidebarAnnotationsTab.litTagName}>
      `;
            default:
                return null;
        }
    }
    #updateActiveIndicatorPosition() {
        const insightsTabHeaderElement = this.#shadow.querySelector('.tabs-header input:nth-child(1)');
        const annotationTabHeaderElement = this.#shadow.querySelector('.tabs-header input:nth-child(2)');
        const tabSliderElement = this.#shadow.querySelector('.tab-slider');
        if (insightsTabHeaderElement && annotationTabHeaderElement && tabSliderElement) {
            const insightsTabHeaderWidth = insightsTabHeaderElement.getBoundingClientRect().width;
            const annotationTabHeaderWidth = annotationTabHeaderElement.getBoundingClientRect().width;
            switch (this.#activeTab) {
                case "Insights" /* SidebarTabsName.INSIGHTS */:
                    tabSliderElement.style.left = '0';
                    tabSliderElement.style.width = `${insightsTabHeaderWidth}px`;
                    return;
                case "Annotations" /* SidebarTabsName.ANNOTATIONS */:
                    tabSliderElement.style.left = `${insightsTabHeaderWidth}px`;
                    tabSliderElement.style.width = `${annotationTabHeaderWidth}px`;
                    return;
            }
        }
    }
    #render() {
        // clang-format off
        const output = LitHtml.html `<div class="sidebar">
      <div class="tab-bar">
        ${this.#renderHeader()}
        <${IconButton.Icon.Icon.litTagName}
          name='left-panel-close'
          @click=${this.#closeButtonClick}
          class="sidebar-toggle-button"
          jslog=${VisualLogging.action('timeline.sidebar-close').track({ click: true })}
        ></${IconButton.Icon.Icon.litTagName}>
      </div>
      <div class="tab-slider"></div>
      <div class="tab-headers-bottom-line"></div>
      <div class="sidebar-body">${this.#renderContent()}</div>
    </div>`;
        // clang-format on
        LitHtml.render(output, this.#shadow, { host: this });
        this.#updateActiveIndicatorPosition();
    }
}
customElements.define('devtools-performance-sidebar', SidebarUI);
//# sourceMappingURL=Sidebar.js.map