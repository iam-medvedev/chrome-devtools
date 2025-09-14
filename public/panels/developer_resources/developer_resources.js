var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/developer_resources/DeveloperResourcesView.js
var DeveloperResourcesView_exports = {};
__export(DeveloperResourcesView_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW2,
  DeveloperResourcesRevealer: () => DeveloperResourcesRevealer,
  DeveloperResourcesView: () => DeveloperResourcesView
});
import "./../../ui/legacy/legacy.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as Platform2 from "./../../core/platform/platform.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
import { html as html2, render as render2 } from "./../../ui/lit/lit.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/developer_resources/DeveloperResourcesListView.js
import "./../../ui/legacy/components/data_grid/data_grid.js";
import * as Host from "./../../core/host/host.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as Platform from "./../../core/platform/platform.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as TextUtils from "./../../models/text_utils/text_utils.js";
import * as UI from "./../../ui/legacy/legacy.js";
import { Directives, html, nothing, render } from "./../../ui/lit/lit.js";

// gen/front_end/panels/developer_resources/developerResourcesListView.css.js
var developerResourcesListView_css_default = `/*
 * Copyright 2020 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */
@scope to (devtools-widget > *) {
  .data-grid {
    border: none;
  }

  ::part(url-outer) {
    width: 100%;
    display: inline-flex;
    justify-content: flex-start;
  }

  ::part(filter-highlight) {
    font-weight: bold;
  }

  ::part(url-prefix) {
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  ::part(url-suffix) {
    flex: none;
  }
}

/*# sourceURL=${import.meta.resolve("./developerResourcesListView.css")} */`;

// gen/front_end/panels/developer_resources/DeveloperResourcesListView.js
var { ref } = Directives;
var UIStrings = {
  /**
   * @description Text for the status of something
   */
  status: "Status",
  /**
   * @description Text for web URLs
   */
  url: "URL",
  /**
   * @description Text for the initiator of something
   */
  initiator: "Initiator",
  /**
   * @description Text in Coverage List View of the Coverage tab
   */
  totalBytes: "Total Bytes",
  /**
   * @description Column header. The column contains the time it took to load a resource.
   */
  duration: "Duration",
  /**
   * @description Text for errors
   */
  error: "Error",
  /**
   * @description Title for the Developer resources tab
   */
  developerResources: "Developer resources",
  /**
   * @description Text for a context menu entry
   */
  copyUrl: "Copy URL",
  /**
   * @description Text for a context menu entry. Command to copy a URL to the clipboard. The initiator
   * of a request is the entity that caused this request to be sent.
   */
  copyInitiatorUrl: "Copy initiator URL",
  /**
   * @description Text for the status column of a list view
   */
  pending: "pending",
  /**
   * @description Text for the status column of a list view
   */
  success: "success",
  /**
   * @description Text for the status column of a list view
   */
  failure: "failure",
  /**
   * @description Accessible text for the value in bytes in memory allocation.
   */
  sBytes: "{n, plural, =1 {# byte} other {# bytes}}",
  /**
   * @description Number of resource(s) match
   */
  numberOfResourceMatch: "{n, plural, =1 {# resource matches} other {# resources match}}",
  /**
   * @description No resource matches
   */
  noResourceMatches: "No resource matches"
};
var str_ = i18n.i18n.registerUIStrings("panels/developer_resources/DeveloperResourcesListView.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var { withThousandsSeparator } = Platform.NumberUtilities;
var DEFAULT_VIEW = (input, _output, target) => {
  render(html`
      <style>${developerResourcesListView_css_default}</style>
      <devtools-data-grid name=${i18nString(UIStrings.developerResources)} striped class="flex-auto"
         .filters=${input.filters} @contextmenu=${input.onContextMenu} @selected=${input.onSelect}>
        <table>
          <tr>
            <th id="status" sortable fixed width="60px">
              ${i18nString(UIStrings.status)}
            </th>
            <th id="url" sortable width="250px">
              ${i18nString(UIStrings.url)}
            </th>
            <th id="initiator" sortable width="80px">
              ${i18nString(UIStrings.initiator)}
            </th>
            <th id="size" sortable fixed width="80px" align="right">
              ${i18nString(UIStrings.totalBytes)}
            </th>
            <th id="duration" sortable fixed width="80px" align="right">
              ${i18nString(UIStrings.duration)}
            </th>
            <th id="error-message" sortable width="200px">
              ${i18nString(UIStrings.error)}
            </th>
          </tr>
          ${input.items.map((item, index) => {
    const splitURL = /^(.*)(\/[^/]*)$/.exec(item.url);
    return html`
            <tr selected=${item === input.selectedItem || nothing}
                data-url=${item.url ?? nothing}
                data-initiator-url=${item.initiator.initiatorUrl ?? nothing}
                data-index=${index}>
              <td>${item.success === true ? i18nString(UIStrings.success) : item.success === false ? i18nString(UIStrings.failure) : i18nString(UIStrings.pending)}</td>
              <td title=${item.url} aria-label=${item.url}>
                <div aria-hidden="true" part="url-outer"
                     ${ref((e) => input.highlight(e, item.url, "url"))}>
                  <div part="url-prefix">${splitURL ? splitURL[1] : item.url}</div>
                  <div part="url-suffix">${splitURL ? splitURL[2] : ""}</div>
                </div>
              </td>
              <td title=${item.initiator.initiatorUrl || ""}
                  aria-label=${item.initiator.initiatorUrl || ""}
                  @mouseenter=${() => input.onInitiatorMouseEnter(item.initiator.frameId)}
                  @mouseleave=${input.onInitiatorMouseLeave}
              >${item.initiator.initiatorUrl || ""}</td>
              <td aria-label=${item.size !== null ? i18nString(UIStrings.sBytes, { n: item.size }) : nothing}
                  data-value=${item.size ?? nothing}>${item.size !== null ? html`<span>${withThousandsSeparator(item.size)}</span>` : ""}</td>
              <td aria-label=${item.duration !== null ? i18n.TimeUtilities.millisToString(item.duration) : nothing}
                  data-value=${item.duration ?? nothing}>${item.duration !== null ? html`<span>${i18n.TimeUtilities.millisToString(item.duration)}</span>` : ""}</td>
              <td class="error-message">
                ${item.errorMessage ? html`
                <span ${ref((e) => input.highlight(e, item.errorMessage, "error-message"))}>
                  ${item.errorMessage}
                </span>` : nothing}
              </td>
            </tr>`;
  })}
          </table>
        </devtools-data-grid>`, target);
};
var DeveloperResourcesListView = class extends UI.Widget.VBox {
  #items = [];
  #selectedItem = null;
  #onSelect = null;
  #view;
  #filters = [];
  constructor(element, view = DEFAULT_VIEW) {
    super(element, { useShadowDom: true });
    this.#view = view;
  }
  set selectedItem(item) {
    this.#selectedItem = item;
    this.requestUpdate();
  }
  set onSelect(onSelect) {
    this.#onSelect = onSelect;
  }
  #populateContextMenu(contextMenu, element) {
    const url = element.dataset.url;
    if (url) {
      contextMenu.clipboardSection().appendItem(i18nString(UIStrings.copyUrl), () => {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(url);
      }, { jslogContext: "copy-url" });
    }
    const initiatorUrl = element.dataset.initiatorUrl;
    if (initiatorUrl) {
      contextMenu.clipboardSection().appendItem(i18nString(UIStrings.copyInitiatorUrl), () => {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(initiatorUrl);
      }, { jslogContext: "copy-initiator-url" });
    }
  }
  set items(items) {
    this.#items = [...items];
    this.requestUpdate();
  }
  reset() {
    this.items = [];
    this.requestUpdate();
  }
  set filters(filters) {
    this.#filters = filters;
    this.requestUpdate();
    void this.updateComplete.then(() => {
      const numberOfResourceMatch = Number(this.contentElement.querySelector("devtools-data-grid")?.getAttribute("aria-rowcount")) ?? 0;
      let resourceMatch = "";
      if (numberOfResourceMatch === 0) {
        resourceMatch = i18nString(UIStrings.noResourceMatches);
      } else {
        resourceMatch = i18nString(UIStrings.numberOfResourceMatch, { n: numberOfResourceMatch });
      }
      UI.ARIAUtils.LiveAnnouncer.alert(resourceMatch);
    });
  }
  performUpdate() {
    const input = {
      items: this.#items,
      selectedItem: this.#selectedItem,
      filters: this.#filters,
      highlight: this.#highlight.bind(this),
      onContextMenu: (e) => {
        if (e.detail?.element) {
          this.#populateContextMenu(e.detail.menu, e.detail.element);
        }
      },
      onSelect: (e) => {
        this.#selectedItem = e.detail ? this.#items[Number(e.detail.dataset.index)] : null;
        this.#onSelect?.(this.#selectedItem);
      },
      onInitiatorMouseEnter: (frameId) => {
        const frame = frameId ? SDK.FrameManager.FrameManager.instance().getFrame(frameId) : null;
        if (frame) {
          void frame.highlight();
        }
      },
      onInitiatorMouseLeave: () => {
        SDK.OverlayModel.OverlayModel.hideDOMNodeHighlight();
      }
    };
    const output = {};
    this.#view(input, output, this.contentElement);
  }
  #highlight(element, textContent, columnId) {
    if (!element || !textContent) {
      return;
    }
    const highlightContainers = new Set([...element.querySelectorAll(".filter-highlight")].map((e) => e.parentElement));
    for (const container of highlightContainers) {
      container.textContent = container.textContent;
    }
    const filter = this.#filters.find((filter2) => filter2.key?.split(",")?.includes(columnId));
    if (!filter?.regex) {
      return;
    }
    const matches = filter.regex.exec(element.textContent ?? "");
    if (!matches?.length) {
      return;
    }
    const range = new TextUtils.TextRange.SourceRange(matches.index, matches[0].length);
    UI.UIUtils.highlightRangesWithStyleClass(element, [range], "filter-highlight");
    for (const el of element.querySelectorAll(".filter-highlight")) {
      el.setAttribute("part", "filter-highlight");
    }
  }
};

// gen/front_end/panels/developer_resources/developerResourcesView.css.js
var developerResourcesView_css_default = `/*
 * Copyright 2020 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

@scope to (devtools-widget > *) {
  :scope {
    overflow: hidden;
  }

  .developer-resource-view-toolbar-container {
    display: flex;
    border-bottom: 1px solid var(--sys-color-divider);
    flex: 0 0 auto;
  }

  .developer-resource-view-toolbar {
    width: 100%;
  }

  .developer-resource-view-toolbar-summary {
    background-color: var(--sys-color-cdt-base-container);
    border-top: 1px solid var(--sys-color-divider);
    padding-left: 5px;
    flex: 0 0 19px;
    display: flex;
    padding-right: 5px;
  }

  .developer-resource-view-toolbar-summary .developer-resource-view-message {
    padding-top: 2px;
    padding-left: 1ex;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .developer-resource-view-results {
    overflow-y: auto;
    display: flex;
    flex: auto;
  }
}

/*# sourceURL=${import.meta.resolve("./developerResourcesView.css")} */`;

// gen/front_end/panels/developer_resources/DeveloperResourcesView.js
var { widgetConfig } = UI2.Widget;
var { bindToSetting } = UI2.SettingsUI;
var UIStrings2 = {
  /**
   * @description Placeholder for a search field in a toolbar
   */
  filterByText: "Filter by URL and error",
  /**
   * @description Tooltip for a checkbox in the toolbar of the developer resources view. The
   * inspected target is the webpage that DevTools is debugging/inspecting/attached to.
   */
  loadHttpsDeveloperResources: "Load `HTTP(S)` developer resources through the website you inspect, not through DevTools",
  /**
   * @description Text for a checkbox in the toolbar of the developer resources view. The target is
   * the webpage that DevTools is debugging/inspecting/attached to. This setting makes it so
   * developer resources are requested from the webpage itself, and not from the DevTools
   * application.
   */
  enableLoadingThroughTarget: "Load through website",
  /**
   * @description Text for resources load status
   * @example {1} PH1
   * @example {1} PH2
   */
  resourcesCurrentlyLoading: "{PH1} resources, {PH2} currently loading",
  /**
   * @description Status text that appears to tell the developer how many resources were loaded in
   * total. Resources are files related to the webpage.
   */
  resources: "{n, plural, =1 {# resource} other {# resources}}"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/developer_resources/DeveloperResourcesView.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
var DeveloperResourcesRevealer = class {
  async reveal(resourceInitiatorKey) {
    const loader = SDK2.PageResourceLoader.PageResourceLoader.instance();
    const resource = loader.getResourcesLoaded().get(resourceInitiatorKey.key);
    if (resource) {
      await UI2.ViewManager.ViewManager.instance().showView("developer-resources");
      const developerResourcesView = await UI2.ViewManager.ViewManager.instance().view("developer-resources").widget();
      return await developerResourcesView.select(resource);
    }
  }
};
var DEFAULT_VIEW2 = (input, _output, target) => {
  render2(html2`
    <style>
      ${developerResourcesView_css_default}
    </style>
    <div class="vbox flex-auto" jslog=${VisualLogging.panel("developer-resources").track({ resize: true })}>
      <div class="developer-resource-view-toolbar-container" jslog=${VisualLogging.toolbar()}
          role="toolbar">
        <devtools-toolbar class="developer-resource-view-toolbar" role="presentation">
          <devtools-toolbar-input type="filter" placeholder=${i18nString2(UIStrings2.filterByText)}
              @change=${input.onFilterChanged} style="flex-grow:1">
          </devtools-toolbar-input>
          <devtools-checkbox
              title=${i18nString2(UIStrings2.loadHttpsDeveloperResources)}
              ${bindToSetting(SDK2.PageResourceLoader.getLoadThroughTargetSetting())}>
            ${i18nString2(UIStrings2.enableLoadingThroughTarget)}
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
          ${input.numLoading > 0 ? i18nString2(UIStrings2.resourcesCurrentlyLoading, { PH1: input.numResources, PH2: input.numLoading }) : i18nString2(UIStrings2.resources, { n: input.numResources })}
         </div>
      </div>
    </div>`, target);
};
var DeveloperResourcesView = class extends UI2.ThrottledWidget.ThrottledWidget {
  #loader;
  #view;
  #selectedItem = null;
  #filters = [];
  constructor(view = DEFAULT_VIEW2) {
    super(true);
    this.#view = view;
    this.#loader = SDK2.PageResourceLoader.PageResourceLoader.instance();
    this.#loader.addEventListener("Update", this.update, this);
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
      numLoading: loading
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
    const textFilterRegExp = text ? Platform2.StringUtilities.createPlainTextSearchRegex(text, "i") : null;
    if (textFilterRegExp) {
      this.#filters = [
        { key: "url,error-message", regex: textFilterRegExp, negative: false }
      ];
    } else {
      this.#filters = [];
    }
    this.update();
  }
};
export {
  DeveloperResourcesView_exports as DeveloperResourcesView
};
//# sourceMappingURL=developer_resources.js.map
