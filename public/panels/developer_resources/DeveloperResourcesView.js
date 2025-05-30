// Copyright (c) 2016 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../ui/legacy/legacy.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
import { html, render } from '../../ui/lit/lit.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import { DeveloperResourcesListView } from './DeveloperResourcesListView.js';
import developerResourcesViewStyles from './developerResourcesView.css.js';
const { widgetConfig } = UI.Widget;
const { bindToSetting } = UI.SettingsUI;
const UIStrings = {
    /**
     *@description Placeholder for a search field in a toolbar
     */
    filterByText: 'Filter by URL and error',
    /**
     * @description Tooltip for a checkbox in the toolbar of the developer resources view. The
     * inspected target is the webpage that DevTools is debugging/inspecting/attached to.
     */
    loadHttpsDeveloperResources: 'Load `HTTP(S)` developer resources through the website you inspect, not through DevTools',
    /**
     * @description Text for a checkbox in the toolbar of the developer resources view. The target is
     * the webpage that DevTools is debugging/inspecting/attached to. This setting makes it so
     * developer resources are requested from the webpage itself, and not from the DevTools
     * application.
     */
    enableLoadingThroughTarget: 'Load through website',
    /**
     *@description Text for resources load status
     *@example {1} PH1
     *@example {1} PH2
     */
    resourcesCurrentlyLoading: '{PH1} resources, {PH2} currently loading',
    /**
     * @description Status text that appears to tell the developer how many resources were loaded in
     * total. Resources are files related to the webpage.
     */
    resources: '{n, plural, =1 {# resource} other {# resources}}',
};
const str_ = i18n.i18n.registerUIStrings('panels/developer_resources/DeveloperResourcesView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class DeveloperResourcesRevealer {
    async reveal(resourceInitiatorKey) {
        const loader = SDK.PageResourceLoader.PageResourceLoader.instance();
        const resource = loader.getResourcesLoaded().get(resourceInitiatorKey.key);
        if (resource) {
            await UI.ViewManager.ViewManager.instance().showView('developer-resources');
            const developerResourcesView = await UI.ViewManager.ViewManager.instance().view('developer-resources').widget();
            return await developerResourcesView.select(resource);
        }
    }
}
export const DEFAULT_VIEW = (input, _output, target) => {
    // clang-format off
    render(html `
    <style>
      ${developerResourcesViewStyles}
    </style>
    <div class="vbox flex-auto" jslog=${VisualLogging.panel('developer-resources').track({ resize: true })}>
      <div class="developer-resource-view-toolbar-container" jslog=${VisualLogging.toolbar()}
          role="toolbar">
        <devtools-toolbar class="developer-resource-view-toolbar" role="presentation">
          <devtools-toolbar-input type="filter" placeholder=${i18nString(UIStrings.filterByText)}
              @change=${input.onFilterChanged} style="flex-grow:1">
          </devtools-toolbar-input>
          <devtools-checkbox
              title=${i18nString(UIStrings.loadHttpsDeveloperResources)}
              ${bindToSetting(SDK.PageResourceLoader.getLoadThroughTargetSetting())}>
            ${i18nString(UIStrings.enableLoadingThroughTarget)}
          </devtools-checkbox>
        </devtools-toolbar>
      </div>
      <div class="developer-resource-view-results">
        <devtools-widget
          .widgetConfig=${widgetConfig(DeveloperResourcesListView, {
        items: input.items,
        selectedItem: input.selectedItem,
        onSelect: input.onSelect,
        filters: input.filters
    })}>
        </devtools-widget>
      </div>
      <div class="developer-resource-view-toolbar-summary">
        <div class="developer-resource-view-message">
          ${input.numLoading > 0 ?
        i18nString(UIStrings.resourcesCurrentlyLoading, { PH1: input.numResources, PH2: input.numLoading }) :
        i18nString(UIStrings.resources, { n: input.numResources })}
         </div>
      </div>
    </div>`, target, { host: input });
    // clang-format on
};
export class DeveloperResourcesView extends UI.ThrottledWidget.ThrottledWidget {
    #loader;
    #view;
    #selectedItem = null;
    #filters = [];
    constructor(view = DEFAULT_VIEW) {
        super(true);
        this.#view = view;
        this.#loader = SDK.PageResourceLoader.PageResourceLoader.instance();
        this.#loader.addEventListener("Update" /* SDK.PageResourceLoader.Events.UPDATE */, this.update, this);
        this.update();
    }
    async doUpdate() {
        const { loading, resources } = this.#loader.getScopedNumberOfResources();
        const input = {
            onFilterChanged: (e) => {
                this.onFilterChanged(e.detail);
            },
            items: this.#loader.getResourcesLoaded().values(),
            selectedItem: this.#selectedItem,
            onSelect: (item) => {
                this.#selectedItem = item;
            },
            filters: this.#filters,
            numResources: resources,
            numLoading: loading,
        };
        const output = {};
        this.#view(input, output, this.contentElement);
    }
    async select(resource) {
        await this.lastUpdatePromise;
        this.#selectedItem = resource;
        this.update();
    }
    async selectedItem() {
        await this.lastUpdatePromise;
        return this.#selectedItem;
    }
    onFilterChanged(text) {
        const textFilterRegExp = text ? Platform.StringUtilities.createPlainTextSearchRegex(text, 'i') : null;
        if (textFilterRegExp) {
            this.#filters = [
                { key: 'url,error-message', regex: textFilterRegExp, negative: false },
            ];
        }
        else {
            this.#filters = [];
        }
        this.update();
    }
}
//# sourceMappingURL=DeveloperResourcesView.js.map