var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/browser_debugger/CategorizedBreakpointsSidebarPane.js
var CategorizedBreakpointsSidebarPane_exports = {};
__export(CategorizedBreakpointsSidebarPane_exports, {
  CategorizedBreakpointsSidebarPane: () => CategorizedBreakpointsSidebarPane,
  DEFAULT_VIEW: () => DEFAULT_VIEW
});
import * as i18n from "./../../core/i18n/i18n.js";
import * as Platform from "./../../core/platform/platform.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as Sources from "./../sources/sources.js";
import * as UI from "./../../ui/legacy/legacy.js";
import * as Lit from "./../../ui/lit/lit.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/browser_debugger/categorizedBreakpointsSidebarPane.css.js
var categorizedBreakpointsSidebarPane_css_default = `/*
 * Copyright 2016 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  margin: 0;
  padding: 2px 4px;
  min-height: 18px;
}

.tree-outline {
  padding: 0;
}

.tree-outline li {
  margin-left: 14px;
  user-select: text;
}

.tree-outline li.parent {
  margin-left: 1px;
}

.tree-outline li:not(.parent)::before {
  display: none;
}

.breakpoint-hit {
  background-color: var(--sys-color-yellow-container);
  color: var(--sys-color-on-yellow-container);
}

.breakpoint-hit-marker {
  background-color: var(--sys-color-yellow-container);
  border-right: 3px solid var(--sys-color-yellow-outline);
  color: var(--sys-color-on-yellow-container);
  height: 100%;
  left: 0;
  margin-left: -30px;
  position: absolute;
  right: -4px;
  z-index: -1;
}

devtools-checkbox.source-code {
  max-width: 100%;
}

/*# sourceURL=${import.meta.resolve("./categorizedBreakpointsSidebarPane.css")} */`;

// gen/front_end/panels/browser_debugger/CategorizedBreakpointsSidebarPane.js
var UIStrings = {
  /**
   * @description Category of breakpoints
   */
  auctionWorklet: "Ad Auction Worklet",
  /**
   * @description Text that refers to the animation of the web page
   */
  animation: "Animation",
  /**
   * @description Screen reader description of a hit breakpoint in the Sources panel
   */
  breakpointHit: "breakpoint hit",
  /**
   * @description Text in DOMDebugger Model
   */
  canvas: "Canvas",
  /**
   * @description Text in DOMDebugger Model
   */
  clipboard: "Clipboard",
  /**
   * @description Noun. Describes a group of DOM events (such as 'select' and 'submit') in this context.
   */
  control: "Control",
  /**
   * @description Text that refers to device such as a phone
   */
  device: "Device",
  /**
   * @description Text in DOMDebugger Model
   */
  domMutation: "DOM Mutation",
  /**
   * @description Text in DOMDebugger Model
   */
  dragDrop: "Drag / drop",
  /**
   * @description Title for a group of cities
   */
  geolocation: "Geolocation",
  /**
   * @description Text in DOMDebugger Model
   */
  keyboard: "Keyboard",
  /**
   * @description Text to load something
   */
  load: "Load",
  /**
   * @description Text that appears on a button for the media resource type filter.
   */
  media: "Media",
  /**
   * @description Text in DOMDebugger Model
   */
  mouse: "Mouse",
  /**
   * @description Text in DOMDebugger Model
   */
  notification: "Notification",
  /**
   * @description Text to parse something
   */
  parse: "Parse",
  /**
   * @description Text in DOMDebugger Model
   */
  pictureinpicture: "Picture-in-Picture",
  /**
   * @description Text in DOMDebugger Model
   */
  pointer: "Pointer",
  /**
   * @description Label for a group of JavaScript files
   */
  script: "Script",
  /**
   * @description Category of breakpoints
   */
  sharedStorageWorklet: "Shared Storage Worklet",
  /**
   * @description Text in DOMDebugger Model
   */
  timer: "Timer",
  /**
   * @description Text for the touch type to simulate on a device
   */
  touch: "Touch",
  /**
   * @description Title for a category of breakpoints on Trusted Type violations
   */
  trustedTypeViolations: "Trusted Type Violations",
  /**
   * @description Title of the WebAudio tool
   */
  webaudio: "WebAudio",
  /**
   * @description Text in DOMDebugger Model
   */
  window: "Window",
  /**
   * @description Text for the service worker type.
   */
  worker: "Worker",
  /**
   * @description Text that appears on a button for the xhr resource type filter.
   */
  xhr: "XHR"
};
var str_ = i18n.i18n.registerUIStrings("panels/browser_debugger/CategorizedBreakpointsSidebarPane.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var { html, render } = Lit;
var { ifExpanded } = UI.TreeOutline;
var DEFAULT_VIEW = (input, output, target) => {
  const shouldExpandCategory = (breakpoints) => Boolean(input.filterText) || input.highlightedItem && breakpoints.includes(input.highlightedItem) || breakpoints.some((breakpoint) => breakpoint.enabled());
  const filterRegex = input.filterText ? new RegExp(Platform.StringUtilities.escapeForRegExp(input.filterText), "i") : null;
  const filter = (breakpoint) => !filterRegex || Boolean(Sources.CategorizedBreakpointL10n.getLocalizedBreakpointName(breakpoint.name).match(filterRegex)) || breakpoint === input.highlightedItem;
  const filteredCategories = input.sortedCategoryNames.values().map((category) => {
    const breakpoints = input.categories.get(category);
    if (filterRegex && getLocalizedCategory(category).match(filterRegex)) {
      return [category, breakpoints];
    }
    return [category, breakpoints?.filter(filter)];
  }).filter((filteredCategory) => Boolean(filteredCategory[1]?.length)).toArray();
  const onCheckboxClicked = (event, target2) => {
    const eventTarget = event.target;
    if (!(eventTarget instanceof UI.UIUtils.CheckboxLabel)) {
      return;
    }
    const enabled = eventTarget.checked;
    if (target2 instanceof SDK.CategorizedBreakpoint.CategorizedBreakpoint) {
      input.onBreakpointChange(target2, enabled);
    } else {
      input.categories.get(target2)?.forEach((breakpoint) => input.onBreakpointChange(breakpoint, enabled));
    }
  };
  const classes = (breakpoint) => Lit.Directives.classMap({
    small: true,
    "source-code": true,
    "breakpoint-hit": input.highlightedItem === breakpoint
  });
  const onKeyDown = (e) => {
    if (e.key === " ") {
      input.onSpaceKeyDown();
      e.preventDefault();
    }
  };
  render(
    // clang-format off
    html`
    <devtools-toolbar jslog=${VisualLogging.toolbar()}>
      <devtools-toolbar-input
        type="filter"
        @change=${(e) => input.onFilterChanged(e.detail)}
        style="flex: 1;"
        ></devtools-toolbar-input>
    </devtools-toolbar>
    <devtools-tree autofocus @keydown=${onKeyDown} .template=${html`
      <ul role="tree">
        ${filteredCategories.map(([category, breakpoints]) => html`
          <li @select=${() => input.onItemSelected(category)}
              @expand=${() => input.onExpandCollapse()}
              role="treeitem"
              jslog-context=${category}
              aria-checked=${breakpoints.some((breakpoint) => breakpoint.enabled()) ? breakpoints.some((breakpoint) => !breakpoint.enabled()) ? "mixed" : true : false}
              ?open=${shouldExpandCategory(breakpoints)}>
            <style>${categorizedBreakpointsSidebarPane_css_default}</style>
            <devtools-checkbox
              class="small"
              tabIndex=-1
              title=${getLocalizedCategory(category)}
              ?indeterminate=${breakpoints.some((breakpoint) => !breakpoint.enabled()) && breakpoints.some((breakpoint) => breakpoint.enabled())}
              ?checked=${!breakpoints.some((breakpoint) => !breakpoint.enabled())}
              @change=${(e) => onCheckboxClicked(e, category)}
            >${getLocalizedCategory(category)}</devtools-checkbox>
            <ul role="group">
              ${ifExpanded(html`${breakpoints.map((breakpoint) => html`
                <li @select=${() => input.onItemSelected(breakpoint)}
                    role="treeitem"
                    aria-checked=${breakpoint.enabled()}
                    jslog-context=${Platform.StringUtilities.toKebabCase(breakpoint.name)}>
                  <div ?hidden=${breakpoint !== input.highlightedItem} class="breakpoint-hit-marker"></div>
                  <devtools-checkbox
                    class=${classes(breakpoint)}
                    tabIndex=-1
                    title=${Sources.CategorizedBreakpointL10n.getLocalizedBreakpointName(breakpoint.name)}
                    ?checked=${breakpoint.enabled()}
                    aria-description=${breakpoint === input.highlightedItem ? i18nString(UIStrings.breakpointHit) : Lit.nothing}
                    @change=${(e) => onCheckboxClicked(e, breakpoint)}
                  >${Sources.CategorizedBreakpointL10n.getLocalizedBreakpointName(breakpoint.name)}</devtools-checkbox>
                </li>`)}`)}
            </ul>
          </li>`)}
      </ul>`}>
    </devtools-tree>`,
    target
  );
};
var CategorizedBreakpointsSidebarPane = class extends UI.Widget.VBox {
  #viewId;
  // A layout test reaches into this
  categories = /* @__PURE__ */ new Map();
  #sortedCategories;
  #highlightedItem = null;
  #filterText = null;
  #view;
  #selectedItem = null;
  constructor(breakpoints, jslog, viewId, view = DEFAULT_VIEW) {
    super({ useShadowDom: true, jslog });
    this.#view = view;
    this.#viewId = viewId;
    for (const breakpoint of breakpoints) {
      let categorizedBreakpoints = this.categories.get(breakpoint.category());
      if (!categorizedBreakpoints) {
        categorizedBreakpoints = [];
        this.categories.set(breakpoint.category(), categorizedBreakpoints);
      }
      categorizedBreakpoints.push(breakpoint);
    }
    this.#sortedCategories = [...this.categories.keys()].sort((a, b) => {
      const categoryA = getLocalizedCategory(a);
      const categoryB = getLocalizedCategory(b);
      return categoryA.localeCompare(categoryB, i18n.DevToolsLocale.DevToolsLocale.instance().locale);
    });
    SDK.TargetManager.TargetManager.instance().addModelListener(SDK.DebuggerModel.DebuggerModel, SDK.DebuggerModel.Events.DebuggerPaused, this.update, this);
    SDK.TargetManager.TargetManager.instance().addModelListener(SDK.DebuggerModel.DebuggerModel, SDK.DebuggerModel.Events.DebuggerResumed, this.update, this);
    UI.Context.Context.instance().addFlavorChangeListener(SDK.Target.Target, this.update, this);
    this.requestUpdate();
  }
  getBreakpointFromPausedDetails(_details) {
    return null;
  }
  update() {
    const target = UI.Context.Context.instance().flavor(SDK.Target.Target);
    const debuggerModel = target ? target.model(SDK.DebuggerModel.DebuggerModel) : null;
    const details = debuggerModel ? debuggerModel.debuggerPausedDetails() : null;
    const breakpoint = details && this.getBreakpointFromPausedDetails(details);
    this.#highlightedItem = breakpoint;
    if (!breakpoint) {
      return;
    }
    void UI.ViewManager.ViewManager.instance().showView(this.#viewId);
    this.requestUpdate();
  }
  #onFilterChanged(filterText) {
    this.#filterText = filterText;
    this.requestUpdate();
  }
  #onItemSelected(item2) {
    this.#selectedItem = item2;
  }
  #onSpaceKeyDown() {
    const selected = this.#selectedItem;
    if (!selected) {
      return;
    }
    if (selected instanceof SDK.CategorizedBreakpoint.CategorizedBreakpoint) {
      this.onBreakpointChanged(selected, !selected.enabled());
    } else {
      const breakpoints = this.categories.get(selected);
      if (breakpoints) {
        const newEnabled = breakpoints.some((bp) => !bp.enabled());
        breakpoints.forEach((bp) => this.onBreakpointChanged(bp, newEnabled));
      }
    }
  }
  onBreakpointChanged(breakpoint, enabled) {
    breakpoint.setEnabled(enabled);
    this.requestUpdate();
  }
  performUpdate() {
    const input = {
      filterText: this.#filterText,
      onFilterChanged: this.#onFilterChanged.bind(this),
      onBreakpointChange: this.onBreakpointChanged.bind(this),
      onItemSelected: this.#onItemSelected.bind(this),
      onSpaceKeyDown: this.#onSpaceKeyDown.bind(this),
      sortedCategoryNames: this.#sortedCategories,
      categories: this.categories,
      highlightedItem: this.#highlightedItem,
      onExpandCollapse: () => {
        this.requestUpdate();
      }
    };
    this.#view(input, void 0, this.contentElement);
  }
};
var LOCALIZED_CATEGORIES = {
  [
    "animation"
    /* SDK.CategorizedBreakpoint.Category.ANIMATION */
  ]: i18nLazyString(UIStrings.animation),
  [
    "auction-worklet"
    /* SDK.CategorizedBreakpoint.Category.AUCTION_WORKLET */
  ]: i18nLazyString(UIStrings.auctionWorklet),
  [
    "canvas"
    /* SDK.CategorizedBreakpoint.Category.CANVAS */
  ]: i18nLazyString(UIStrings.canvas),
  [
    "clipboard"
    /* SDK.CategorizedBreakpoint.Category.CLIPBOARD */
  ]: i18nLazyString(UIStrings.clipboard),
  [
    "control"
    /* SDK.CategorizedBreakpoint.Category.CONTROL */
  ]: i18nLazyString(UIStrings.control),
  [
    "device"
    /* SDK.CategorizedBreakpoint.Category.DEVICE */
  ]: i18nLazyString(UIStrings.device),
  [
    "dom-mutation"
    /* SDK.CategorizedBreakpoint.Category.DOM_MUTATION */
  ]: i18nLazyString(UIStrings.domMutation),
  [
    "drag-drop"
    /* SDK.CategorizedBreakpoint.Category.DRAG_DROP */
  ]: i18nLazyString(UIStrings.dragDrop),
  [
    "geolocation"
    /* SDK.CategorizedBreakpoint.Category.GEOLOCATION */
  ]: i18nLazyString(UIStrings.geolocation),
  [
    "keyboard"
    /* SDK.CategorizedBreakpoint.Category.KEYBOARD */
  ]: i18nLazyString(UIStrings.keyboard),
  [
    "load"
    /* SDK.CategorizedBreakpoint.Category.LOAD */
  ]: i18nLazyString(UIStrings.load),
  [
    "media"
    /* SDK.CategorizedBreakpoint.Category.MEDIA */
  ]: i18nLazyString(UIStrings.media),
  [
    "mouse"
    /* SDK.CategorizedBreakpoint.Category.MOUSE */
  ]: i18nLazyString(UIStrings.mouse),
  [
    "notification"
    /* SDK.CategorizedBreakpoint.Category.NOTIFICATION */
  ]: i18nLazyString(UIStrings.notification),
  [
    "parse"
    /* SDK.CategorizedBreakpoint.Category.PARSE */
  ]: i18nLazyString(UIStrings.parse),
  [
    "picture-in-picture"
    /* SDK.CategorizedBreakpoint.Category.PICTURE_IN_PICTURE */
  ]: i18nLazyString(UIStrings.pictureinpicture),
  [
    "pointer"
    /* SDK.CategorizedBreakpoint.Category.POINTER */
  ]: i18nLazyString(UIStrings.pointer),
  [
    "script"
    /* SDK.CategorizedBreakpoint.Category.SCRIPT */
  ]: i18nLazyString(UIStrings.script),
  [
    "shared-storage-worklet"
    /* SDK.CategorizedBreakpoint.Category.SHARED_STORAGE_WORKLET */
  ]: i18nLazyString(UIStrings.sharedStorageWorklet),
  [
    "timer"
    /* SDK.CategorizedBreakpoint.Category.TIMER */
  ]: i18nLazyString(UIStrings.timer),
  [
    "touch"
    /* SDK.CategorizedBreakpoint.Category.TOUCH */
  ]: i18nLazyString(UIStrings.touch),
  [
    "trusted-type-violation"
    /* SDK.CategorizedBreakpoint.Category.TRUSTED_TYPE_VIOLATION */
  ]: i18nLazyString(UIStrings.trustedTypeViolations),
  [
    "web-audio"
    /* SDK.CategorizedBreakpoint.Category.WEB_AUDIO */
  ]: i18nLazyString(UIStrings.webaudio),
  [
    "window"
    /* SDK.CategorizedBreakpoint.Category.WINDOW */
  ]: i18nLazyString(UIStrings.window),
  [
    "worker"
    /* SDK.CategorizedBreakpoint.Category.WORKER */
  ]: i18nLazyString(UIStrings.worker),
  [
    "xhr"
    /* SDK.CategorizedBreakpoint.Category.XHR */
  ]: i18nLazyString(UIStrings.xhr)
};
function getLocalizedCategory(category) {
  return LOCALIZED_CATEGORIES[category]();
}

// gen/front_end/panels/browser_debugger/CSPViolationBreakpointsSidebarPane.js
var CSPViolationBreakpointsSidebarPane_exports = {};
__export(CSPViolationBreakpointsSidebarPane_exports, {
  CSPViolationBreakpointsSidebarPane: () => CSPViolationBreakpointsSidebarPane
});
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as VisualLogging2 from "./../../ui/visual_logging/visual_logging.js";
var CSPViolationBreakpointsSidebarPane = class extends CategorizedBreakpointsSidebarPane {
  constructor() {
    const breakpoints = SDK2.DOMDebuggerModel.DOMDebuggerManager.instance().cspViolationBreakpoints();
    super(breakpoints, `${VisualLogging2.section("sources.csp-violation-breakpoints")}`, "sources.csp-violation-breakpoints");
  }
  getBreakpointFromPausedDetails(details) {
    const breakpointType = details.auxData?.["violationType"] ? details.auxData["violationType"] : "";
    const breakpoints = SDK2.DOMDebuggerModel.DOMDebuggerManager.instance().cspViolationBreakpoints();
    const breakpoint = breakpoints.find((x) => x.type() === breakpointType);
    return breakpoint ? breakpoint : null;
  }
  onBreakpointChanged(breakpoint, enabled) {
    super.onBreakpointChanged(breakpoint, enabled);
    SDK2.DOMDebuggerModel.DOMDebuggerManager.instance().updateCSPViolationBreakpoints();
  }
};

// gen/front_end/panels/browser_debugger/DOMBreakpointsSidebarPane.js
var DOMBreakpointsSidebarPane_exports = {};
__export(DOMBreakpointsSidebarPane_exports, {
  ContextMenuProvider: () => ContextMenuProvider,
  DEFAULT_VIEW: () => DEFAULT_VIEW2,
  DOMBreakpointsSidebarPane: () => DOMBreakpointsSidebarPane
});
import * as Common from "./../../core/common/common.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as SDK3 from "./../../core/sdk/sdk.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
import * as Lit2 from "./../../ui/lit/lit.js";
import * as VisualLogging3 from "./../../ui/visual_logging/visual_logging.js";
import * as PanelsCommon from "./../common/common.js";
import * as Sources2 from "./../sources/sources.js";

// gen/front_end/panels/browser_debugger/domBreakpointsSidebarPane.css.js
var domBreakpointsSidebarPane_css_default = `/*
 * Copyright 2017 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

@scope to (devtools-widget > *) {
  :scope {
    overflow: auto;
  }

  .monospace {
    font-family: var(--monospace-font-family);
    font-size: var(--monospace-font-size);
  }

  .dom-breakpoints-container {
    flex-grow: 1;
  }

  .breakpoint-list {
    padding: 0 0 3px;
    list-style-type: none;
    margin: 0;
  }

  .breakpoint-list .dom-breakpoint > div {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .breakpoint-entry {
    display: flex;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 2px 0;
  }

  .breakpoint-entry:focus-visible {
    background-color: var(--sys-color-tonal-container);
  }

  .breakpoint-hit {
    background-color: var(--sys-color-neutral-container);
    color: var(--sys-color-on-surface);
  }

  .placeholder {
    display: flex;
    height: 100%;
    justify-content: center;
  }

  .gray-info-message {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
}

:host-context(.sources.panel) .empty-view-scroller {
  display: none;
}

:host-context(.elements.panel) .placeholder .gray-info-message {
  display: none;
}

@media (forced-colors: active) {
  @scope to (devtools-widget > *) {
    .breakpoint-entry:focus-visible,
    .breakpoint-list .breakpoint-entry:hover {
      forced-color-adjust: none;
      background-color: Highlight;
    }

    .breakpoint-entry:focus-visible *,
    .breakpoint-list .breakpoint-entry:hover * {
      color: HighlightText;
    }
  }
}

/*# sourceURL=${import.meta.resolve("./domBreakpointsSidebarPane.css")} */`;

// gen/front_end/panels/browser_debugger/DOMBreakpointsSidebarPane.js
var UIStrings2 = {
  /**
   * @description Header text to indicate there are no breakpoints
   */
  noBreakpoints: "No DOM breakpoints",
  /**
   * @description DOM breakpoints description that shows if no DOM breakpoints are set
   */
  domBreakpointsDescription: "DOM breakpoints pause on the code that changes a DOM node or its children.",
  /**
   * @description Accessibility label for the DOM breakpoints list in the Sources panel
   */
  domBreakpointsList: "DOM Breakpoints list",
  /**
   * @description Text with two placeholders separated by a colon
   * @example {Node removed} PH1
   * @example {div#id1} PH2
   */
  sS: "{PH1}: {PH2}",
  /**
   * @description Text with three placeholders separated by a colon and a comma
   * @example {Node removed} PH1
   * @example {div#id1} PH2
   * @example {checked} PH3
   */
  sSS: "{PH1}: {PH2}, {PH3}",
  /**
   * @description Text exposed to screen readers on checked items.
   */
  checked: "checked",
  /**
   * @description Accessible text exposed to screen readers when the screen reader encounters an unchecked checkbox.
   */
  unchecked: "unchecked",
  /**
   * @description Accessibility label for hit breakpoints in the Sources panel.
   * @example {checked} PH1
   */
  sBreakpointHit: "{PH1} breakpoint hit",
  /**
   * @description Screen reader description of a hit breakpoint in the Sources panel
   */
  breakpointHit: "breakpoint hit",
  /**
   * @description A context menu item in the DOM Breakpoints sidebar that reveals the node on which the current breakpoint is set.
   */
  revealDomNodeInElementsPanel: "Reveal DOM node in Elements panel",
  /**
   * @description Text to remove a breakpoint
   */
  removeBreakpoint: "Remove breakpoint",
  /**
   * @description A context menu item in the DOMBreakpoints Sidebar Pane of the JavaScript Debugging pane in the Sources panel or the DOM Breakpoints pane in the Elements panel
   */
  removeAllDomBreakpoints: "Remove all DOM breakpoints",
  /**
   * @description Text in DOMBreakpoints Sidebar Pane of the JavaScript Debugging pane in the Sources panel or the DOM Breakpoints pane in the Elements panel
   */
  subtreeModified: "Subtree modified",
  /**
   * @description Text in DOMBreakpoints Sidebar Pane of the JavaScript Debugging pane in the Sources panel or the DOM Breakpoints pane in the Elements panel
   */
  attributeModified: "Attribute modified",
  /**
   * @description Text in DOMBreakpoints Sidebar Pane of the JavaScript Debugging pane in the Sources panel or the DOM Breakpoints pane in the Elements panel
   */
  nodeRemoved: "Node removed",
  /**
   * @description Entry in context menu of the elements pane, allowing developers to select a DOM
   * breakpoint for the element that they have right-clicked on. Short for the action 'set a
   * breakpoint on this DOM Element'. A breakpoint pauses the website when the code reaches a
   * specified line, or when a specific action happen (in this case, when the DOM Element is
   * modified).
   */
  breakOn: "Break on",
  /**
   * @description Screen reader description for removing a DOM breakpoint.
   */
  breakpointRemoved: "Breakpoint removed",
  /**
   * @description Screen reader description for setting a DOM breakpoint.
   */
  breakpointSet: "Breakpoint set"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/browser_debugger/DOMBreakpointsSidebarPane.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
var i18nLazyString2 = i18n3.i18n.getLazilyComputedLocalizedString.bind(void 0, str_2);
var DOM_BREAKPOINT_DOCUMENTATION_URL = "https://developer.chrome.com/docs/devtools/javascript/breakpoints#dom";
var { html: html2, render: render2, Directives: Directives2 } = Lit2;
var DEFAULT_VIEW2 = (input, _output, target) => {
  const hasBreakpoints = input.breakpoints.length > 0;
  render2(html2`
      <style>${domBreakpointsSidebarPane_css_default}</style>
      <div class="dom-breakpoints-container" jslog=${VisualLogging3.section("sources.dom-breakpoints").track({ resize: true })}>
        ${hasBreakpoints ? html2`<ul class="breakpoint-list"
              aria-label=${i18nString2(UIStrings2.domBreakpointsList)}>
            ${input.breakpoints.map((item2) => {
    const { breakpoint } = item2;
    const checkedStateText = breakpoint.enabled ? i18nString2(UIStrings2.checked) : i18nString2(UIStrings2.unchecked);
    const linkified = PanelsCommon.DOMLinkifier.Linkifier.instance().linkify(breakpoint.node, { preventKeyboardFocus: true, tooltip: void 0 });
    return html2`
                <li class=${`breakpoint-entry ${item2.isHighlighted ? "breakpoint-hit" : ""}`}
                    tabindex=${item2.isFocused ? "0" : "-1"}
                    @click=${() => input.onBreakpointClick(breakpoint)}
                    @contextmenu=${(e) => input.onBreakpointContextMenu(breakpoint, e)}
                    @keydown=${(e) => input.onBreakpointKeyDown(breakpoint, e)}
                    aria-label=${i18nString2(UIStrings2.sSS, { PH1: item2.label, PH2: linkified.deepTextContent(), PH3: checkedStateText })}
                    aria-description=${item2.isHighlighted ? i18nString2(UIStrings2.sBreakpointHit, { PH1: checkedStateText }) : checkedStateText}
                    jslog=${VisualLogging3.domBreakpoint().context(breakpoint.type).track({ keydown: "ArrowUp|ArrowDown|PageUp|PageDown" })}>
                  <devtools-checkbox
                    class="checkbox-label"
                    .checked=${breakpoint.enabled}
                    @click=${(e) => e.stopPropagation()}
                    @change=${() => input.onBreakpointCheckboxClick(breakpoint)}
                    tabindex="-1"
                    aria-label=${i18nString2(UIStrings2.sS, { PH1: item2.label, PH2: linkified.deepTextContent() })}
                    aria-description=${Directives2.ifDefined(item2.isHighlighted ? i18nString2(UIStrings2.breakpointHit) : void 0)}
                    jslog=${VisualLogging3.toggle().track({ click: true })}>
                  </devtools-checkbox>
                  <div class="dom-breakpoint">
                    <code class="monospace" style="display: block;">${linkified}</code>
                    <div>${item2.label}</div>
                  </div>
                </li>`;
  })}
          </ul>` : html2`<div class="placeholder">
            <div class="gray-info-message">${i18nString2(UIStrings2.noBreakpoints)}</div>
            <devtools-widget .widgetConfig=${UI2.Widget.widgetConfig(UI2.EmptyWidget.EmptyWidget, {
    header: i18nString2(UIStrings2.noBreakpoints),
    text: i18nString2(UIStrings2.domBreakpointsDescription),
    link: DOM_BREAKPOINT_DOCUMENTATION_URL
  })}></devtools-widget>
          </div>`}
      </div>
    `, target);
};
var domBreakpointsSidebarPaneInstance;
var DOMBreakpointsSidebarPane = class _DOMBreakpointsSidebarPane extends UI2.Widget.VBox {
  #breakpoints = [];
  #highlightedBreakpoint = null;
  #focusedBreakpoint = null;
  #view;
  set highlightedBreakpoint(breakpoint) {
    this.#highlightedBreakpoint = breakpoint;
    this.requestUpdate();
  }
  set focusedBreakpoint(breakpoint) {
    if (this.#focusedBreakpoint === breakpoint) {
      return;
    }
    this.#focusedBreakpoint = breakpoint;
    this.#synchronizeFocusedBreakpoint();
    this.requestUpdate();
  }
  #synchronizeFocusedBreakpoint() {
    if (this.#focusedBreakpoint && !this.#breakpoints.includes(this.#focusedBreakpoint)) {
      this.#focusedBreakpoint = null;
    }
    if (!this.#focusedBreakpoint && this.#breakpoints.length > 0) {
      this.#focusedBreakpoint = this.#breakpoints[0];
    }
  }
  constructor(view = DEFAULT_VIEW2) {
    super({ useShadowDom: true });
    this.#view = view;
    SDK3.TargetManager.TargetManager.instance().addModelListener(SDK3.DOMDebuggerModel.DOMDebuggerModel, "DOMBreakpointAdded", this.breakpointAdded, this);
    SDK3.TargetManager.TargetManager.instance().addModelListener(SDK3.DOMDebuggerModel.DOMDebuggerModel, "DOMBreakpointToggled", this.breakpointToggled, this);
    SDK3.TargetManager.TargetManager.instance().addModelListener(SDK3.DOMDebuggerModel.DOMDebuggerModel, "DOMBreakpointsRemoved", this.breakpointsRemoved, this);
    for (const domDebuggerModel of SDK3.TargetManager.TargetManager.instance().models(SDK3.DOMDebuggerModel.DOMDebuggerModel)) {
      domDebuggerModel.retrieveDOMBreakpoints();
      for (const breakpoint of domDebuggerModel.domBreakpoints()) {
        this.addBreakpoint(breakpoint);
      }
    }
    this.update();
  }
  static instance() {
    if (!domBreakpointsSidebarPaneInstance) {
      domBreakpointsSidebarPaneInstance = new _DOMBreakpointsSidebarPane();
    }
    return domBreakpointsSidebarPaneInstance;
  }
  performUpdate() {
    const input = {
      breakpoints: this.#breakpoints.map((breakpoint) => ({
        breakpoint,
        label: BreakpointTypeLabels.get(breakpoint.type)?.() ?? "",
        isHighlighted: breakpoint === this.#highlightedBreakpoint,
        isFocused: breakpoint === this.#focusedBreakpoint
      })),
      onBreakpointClick: this.onBreakpointClick.bind(this),
      onBreakpointCheckboxClick: this.onBreakpointCheckboxClick.bind(this),
      onBreakpointContextMenu: this.onBreakpointContextMenu.bind(this),
      onBreakpointKeyDown: this.onBreakpointKeyDown.bind(this)
    };
    this.#view(input, void 0, this.contentElement);
  }
  onBreakpointClick(breakpoint) {
    this.focusedBreakpoint = breakpoint;
  }
  onBreakpointKeyDown(breakpoint, event) {
    const keyboardEvent = event;
    if (keyboardEvent.key === " ") {
      this.onBreakpointCheckboxClick(breakpoint);
      keyboardEvent.consume(true);
    } else if (keyboardEvent.key === "ArrowUp" || keyboardEvent.key === "ArrowDown") {
      const index = this.#breakpoints.indexOf(breakpoint);
      const newIndex = keyboardEvent.key === "ArrowUp" ? index - 1 : index + 1;
      if (newIndex >= 0 && newIndex < this.#breakpoints.length) {
        this.focusedBreakpoint = this.#breakpoints[newIndex];
        void this.updateComplete.then(() => {
          const entry = this.contentElement.querySelectorAll(".breakpoint-entry")[newIndex];
          entry.focus();
        });
        keyboardEvent.consume(true);
      }
    }
  }
  breakpointAdded(event) {
    this.addBreakpoint(event.data);
  }
  breakpointToggled(_event) {
    this.requestUpdate();
  }
  breakpointsRemoved(event) {
    const breakpoints = event.data;
    for (const breakpoint of breakpoints) {
      const index = this.#breakpoints.indexOf(breakpoint);
      if (index >= 0) {
        this.#breakpoints.splice(index, 1);
      }
    }
    this.#synchronizeFocusedBreakpoint();
    this.requestUpdate();
  }
  addBreakpoint(breakpoint) {
    if (this.#breakpoints.includes(breakpoint)) {
      return;
    }
    this.#breakpoints.push(breakpoint);
    this.#breakpoints.sort((breakpointA, breakpointB) => {
      if (breakpointA.type > breakpointB.type) {
        return -1;
      }
      if (breakpointA.type < breakpointB.type) {
        return 1;
      }
      return 0;
    });
    this.#synchronizeFocusedBreakpoint();
    this.requestUpdate();
  }
  onBreakpointContextMenu(breakpoint, event) {
    this.focusedBreakpoint = breakpoint;
    const contextMenu = new UI2.ContextMenu.ContextMenu(event);
    contextMenu.defaultSection().appendItem(i18nString2(UIStrings2.revealDomNodeInElementsPanel), () => Common.Revealer.reveal(breakpoint.node), { jslogContext: "reveal-in-elements" });
    contextMenu.defaultSection().appendItem(i18nString2(UIStrings2.removeBreakpoint), () => {
      breakpoint.domDebuggerModel.removeDOMBreakpoint(breakpoint.node, breakpoint.type);
    }, { jslogContext: "remove-breakpoint" });
    contextMenu.defaultSection().appendItem(i18nString2(UIStrings2.removeAllDomBreakpoints), () => {
      breakpoint.domDebuggerModel.removeAllDOMBreakpoints();
    }, { jslogContext: "remove-all-dom-breakpoints" });
    void contextMenu.show();
  }
  onBreakpointCheckboxClick(breakpoint) {
    this.focusedBreakpoint = breakpoint;
    breakpoint.domDebuggerModel.toggleDOMBreakpoint(breakpoint, !breakpoint.enabled);
  }
  flavorChanged(_object) {
    this.update();
  }
  update() {
    const details = UI2.Context.Context.instance().flavor(SDK3.DebuggerModel.DebuggerPausedDetails);
    this.highlightedBreakpoint = null;
    if (!details?.auxData || details.reason !== "DOM") {
      return;
    }
    const domDebuggerModel = details.debuggerModel.target().model(SDK3.DOMDebuggerModel.DOMDebuggerModel);
    if (!domDebuggerModel) {
      return;
    }
    const data = domDebuggerModel.resolveDOMBreakpointData(details.auxData);
    if (!data) {
      return;
    }
    for (const breakpoint of this.#breakpoints) {
      if (breakpoint.node === data.node && breakpoint.type === data.type) {
        this.highlightedBreakpoint = breakpoint;
        this.focusedBreakpoint = breakpoint;
      }
    }
    if (this.#highlightedBreakpoint) {
      void UI2.ViewManager.ViewManager.instance().showView("sources.dom-breakpoints");
    }
  }
};
var BreakpointTypeLabels = /* @__PURE__ */ new Map([
  ["subtree-modified", i18nLazyString2(UIStrings2.subtreeModified)],
  ["attribute-modified", i18nLazyString2(UIStrings2.attributeModified)],
  ["node-removed", i18nLazyString2(UIStrings2.nodeRemoved)]
]);
var ContextMenuProvider = class {
  appendApplicableItems(_event, contextMenu, node) {
    if (node.pseudoType()) {
      return;
    }
    const domDebuggerModel = node.domModel().target().model(SDK3.DOMDebuggerModel.DOMDebuggerModel);
    if (!domDebuggerModel) {
      return;
    }
    function toggleBreakpoint(type) {
      if (!domDebuggerModel) {
        return;
      }
      const label = Sources2.DebuggerPausedMessage.BreakpointTypeNouns.get(type);
      const labelString = label ? label() : "";
      if (domDebuggerModel.hasDOMBreakpoint(node, type)) {
        domDebuggerModel.removeDOMBreakpoint(node, type);
        UI2.ARIAUtils.LiveAnnouncer.alert(`${i18nString2(UIStrings2.breakpointRemoved)}: ${labelString}`);
      } else {
        domDebuggerModel.setDOMBreakpoint(node, type);
        UI2.ARIAUtils.LiveAnnouncer.alert(`${i18nString2(UIStrings2.breakpointSet)}: ${labelString}`);
      }
    }
    const breakpointsMenu = contextMenu.debugSection().appendSubMenuItem(i18nString2(UIStrings2.breakOn), false, "break-on");
    const allBreakpointTypes = {
      SubtreeModified: "subtree-modified",
      AttributeModified: "attribute-modified",
      NodeRemoved: "node-removed"
    };
    for (const type of Object.values(allBreakpointTypes)) {
      const label = Sources2.DebuggerPausedMessage.BreakpointTypeNouns.get(type);
      if (label) {
        breakpointsMenu.defaultSection().appendCheckboxItem(label(), toggleBreakpoint.bind(null, type), { checked: domDebuggerModel.hasDOMBreakpoint(node, type), jslogContext: type });
      }
    }
  }
};

// gen/front_end/panels/browser_debugger/EventListenerBreakpointsSidebarPane.js
var EventListenerBreakpointsSidebarPane_exports = {};
__export(EventListenerBreakpointsSidebarPane_exports, {
  EventListenerBreakpointsSidebarPane: () => EventListenerBreakpointsSidebarPane
});
import * as SDK4 from "./../../core/sdk/sdk.js";
import * as VisualLogging4 from "./../../ui/visual_logging/visual_logging.js";
var eventListenerBreakpointsSidebarPaneInstance;
var EventListenerBreakpointsSidebarPane = class _EventListenerBreakpointsSidebarPane extends CategorizedBreakpointsSidebarPane {
  constructor() {
    let breakpoints = SDK4.DOMDebuggerModel.DOMDebuggerManager.instance().eventListenerBreakpoints();
    const nonDomBreakpoints = SDK4.EventBreakpointsModel.EventBreakpointsManager.instance().eventListenerBreakpoints();
    breakpoints = breakpoints.concat(nonDomBreakpoints);
    super(breakpoints, `${VisualLogging4.section("sources.event-listener-breakpoints")}`, "sources.event-listener-breakpoints");
  }
  static instance() {
    if (!eventListenerBreakpointsSidebarPaneInstance) {
      eventListenerBreakpointsSidebarPaneInstance = new _EventListenerBreakpointsSidebarPane();
    }
    return eventListenerBreakpointsSidebarPaneInstance;
  }
  getBreakpointFromPausedDetails(details) {
    const auxData = details.auxData;
    if (!auxData) {
      return null;
    }
    const domBreakpoint2 = auxData && SDK4.DOMDebuggerModel.DOMDebuggerManager.instance().resolveEventListenerBreakpoint(auxData);
    if (domBreakpoint2) {
      return domBreakpoint2;
    }
    return SDK4.EventBreakpointsModel.EventBreakpointsManager.instance().resolveEventListenerBreakpoint(auxData);
  }
};

// gen/front_end/panels/browser_debugger/ObjectEventListenersSidebarPane.js
var ObjectEventListenersSidebarPane_exports = {};
__export(ObjectEventListenersSidebarPane_exports, {
  ActionDelegate: () => ActionDelegate,
  ObjectEventListenersSidebarPane: () => ObjectEventListenersSidebarPane,
  objectGroupName: () => objectGroupName
});
import * as SDK5 from "./../../core/sdk/sdk.js";
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
import * as VisualLogging5 from "./../../ui/visual_logging/visual_logging.js";
import * as EventListeners from "./../event_listeners/event_listeners.js";
var ObjectEventListenersSidebarPane = class _ObjectEventListenersSidebarPane extends UI3.Widget.VBox {
  #lastRequestedContext;
  // TODO(bmeurer): This is only public for web tests.
  eventListenersView;
  constructor() {
    super();
    this.contentElement.setAttribute("jslog", `${VisualLogging5.section("sources.global-listeners")}`);
    this.eventListenersView = new EventListeners.EventListenersView.EventListenersView();
    this.eventListenersView.changeCallback = this.requestUpdate.bind(this);
    this.eventListenersView.enableDefaultTreeFocus = true;
    this.eventListenersView.show(this.element);
    this.setDefaultFocusedChild(this.eventListenersView);
    this.requestUpdate();
  }
  toolbarItems() {
    const refreshButton = UI3.Toolbar.Toolbar.createActionButton("browser-debugger.refresh-global-event-listeners");
    refreshButton.setSize(
      "SMALL"
      /* Buttons.Button.Size.SMALL */
    );
    return [refreshButton];
  }
  async performUpdate() {
    if (this.#lastRequestedContext) {
      this.#lastRequestedContext.runtimeModel.releaseObjectGroup(objectGroupName);
      this.#lastRequestedContext = void 0;
    }
    const windowObjects = [];
    const executionContext = UI3.Context.Context.instance().flavor(SDK5.RuntimeModel.ExecutionContext);
    if (executionContext) {
      this.#lastRequestedContext = executionContext;
      const result = await executionContext.evaluate(
        {
          expression: "self",
          objectGroup: objectGroupName,
          includeCommandLineAPI: false,
          silent: true,
          returnByValue: false,
          generatePreview: false
        },
        /* userGesture */
        false,
        /* awaitPromise */
        false
      );
      if (!("error" in result) && !result.exceptionDetails) {
        windowObjects.push(result.object);
      }
    }
    await this.eventListenersView.addObjects(windowObjects);
  }
  wasShown() {
    super.wasShown();
    UI3.Context.Context.instance().addFlavorChangeListener(SDK5.RuntimeModel.ExecutionContext, this.requestUpdate, this);
    UI3.Context.Context.instance().setFlavor(_ObjectEventListenersSidebarPane, this);
  }
  willHide() {
    UI3.Context.Context.instance().setFlavor(_ObjectEventListenersSidebarPane, null);
    UI3.Context.Context.instance().removeFlavorChangeListener(SDK5.RuntimeModel.ExecutionContext, this.requestUpdate, this);
    super.willHide();
    if (this.#lastRequestedContext) {
      this.#lastRequestedContext.runtimeModel.releaseObjectGroup(objectGroupName);
      this.#lastRequestedContext = void 0;
    }
  }
};
var ActionDelegate = class {
  handleAction(context, actionId) {
    switch (actionId) {
      case "browser-debugger.refresh-global-event-listeners": {
        const eventListenersSidebarPane = context.flavor(ObjectEventListenersSidebarPane);
        if (eventListenersSidebarPane) {
          eventListenersSidebarPane.requestUpdate();
          return true;
        }
        return false;
      }
    }
    return false;
  }
};
var objectGroupName = "object-event-listeners-sidebar-pane";

// gen/front_end/panels/browser_debugger/XHRBreakpointsSidebarPane.js
var XHRBreakpointsSidebarPane_exports = {};
__export(XHRBreakpointsSidebarPane_exports, {
  XHRBreakpointsSidebarPane: () => XHRBreakpointsSidebarPane
});
import * as i18n5 from "./../../core/i18n/i18n.js";
import * as SDK6 from "./../../core/sdk/sdk.js";
import * as Buttons2 from "./../../ui/components/buttons/buttons.js";
import * as UI4 from "./../../ui/legacy/legacy.js";
import * as VisualLogging6 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/browser_debugger/xhrBreakpointsSidebarPane.css.js
var xhrBreakpointsSidebarPane_css_default = `/*
 * Copyright 2017 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.breakpoint-list {
  padding-bottom: 3px;
}

.breakpoint-list .editing.being-edited {
  overflow: hidden;
  white-space: nowrap;
}

.breakpoint-condition {
  display: block;
  margin: 4px 8px 4px 23px;
}

.breakpoint-condition-input {
  display: block;
  margin-left: 0;
  margin-right: 0;
  border: 1px solid var(--sys-color-neutral-outline);
  border-radius: 4px;

  &:focus {
    outline: 5px auto var(--sys-color-tonal-outline);
    box-shadow: none;
  }
}

.breakpoint-entry {
  white-space: nowrap;
  padding: 2px 0;
}

.breakpoint-list .breakpoint-entry:focus-visible {
  background-color: var(--sys-color-tonal-container);
}

.breakpoint-entry devtools-checkbox {
  max-width: 100%;
}

.breakpoint-hit {
  background-color: var(--sys-color-yellow-container);
  border-right: 3px solid var(--sys-color-yellow-outline);
  color: var(--sys-color-on-yellow-container);
}

@media (forced-colors: active) {
  .breakpoint-list .breakpoint-entry:hover,
  .breakpoint-list .breakpoint-entry:focus-visible {
    forced-color-adjust: none;
    background-color: Highlight;
  }

  .breakpoint-list .breakpoint-entry:hover *,
  .breakpoint-list .breakpoint-entry:focus-visible * {
    color: HighlightText;
  }
}

/*# sourceURL=${import.meta.resolve("./xhrBreakpointsSidebarPane.css")} */`;

// gen/front_end/panels/browser_debugger/XHRBreakpointsSidebarPane.js
var UIStrings3 = {
  /**
   * @description Title of the 'XHR/fetch Breakpoints' tool in the bottom sidebar of the Sources tool
   */
  xhrfetchBreakpoints: "XHR/fetch Breakpoints",
  /**
   * @description Text to indicate there are no breakpoints
   */
  noBreakpoints: "No breakpoints",
  /**
   * @description Label for a button in the Sources panel that opens the input field to create a new XHR/fetch breakpoint.
   */
  addXhrfetchBreakpoint: "Add XHR/fetch breakpoint",
  /**
   * @description Text to add a breakpoint
   */
  addBreakpoint: "Add breakpoint",
  /**
   * @description Input element container text content in XHRBreakpoints Sidebar Pane of the JavaScript Debugging pane in the Sources panel or the DOM Breakpoints pane in the Elements panel
   */
  breakWhenUrlContains: "Break when URL contains:",
  /**
   * @description Accessible label for XHR/fetch breakpoint text input
   */
  urlBreakpoint: "URL Breakpoint",
  /**
   * @description Text in XHRBreakpoints Sidebar Pane of the JavaScript Debugging pane in the Sources panel or the DOM Breakpoints pane in the Elements panel
   * @example {example.com} PH1
   */
  urlContainsS: 'URL contains "{PH1}"',
  /**
   * @description Text in XHRBreakpoints Sidebar Pane of the JavaScript Debugging pane in the Sources panel or the DOM Breakpoints pane in the Elements panel
   */
  anyXhrOrFetch: "Any XHR or fetch",
  /**
   * @description Screen reader description of a hit breakpoint in the Sources panel
   */
  breakpointHit: "breakpoint hit",
  /**
   * @description Text to remove all breakpoints
   */
  removeAllBreakpoints: "Remove all breakpoints",
  /**
   * @description Text to remove a breakpoint
   */
  removeBreakpoint: "Remove breakpoint"
};
var str_3 = i18n5.i18n.registerUIStrings("panels/browser_debugger/XHRBreakpointsSidebarPane.ts", UIStrings3);
var i18nString3 = i18n5.i18n.getLocalizedString.bind(void 0, str_3);
var containerToBreakpointEntry = /* @__PURE__ */ new WeakMap();
var breakpointEntryToCheckbox = /* @__PURE__ */ new WeakMap();
var xhrBreakpointsSidebarPaneInstance;
var XHRBreakpointsSidebarPane = class _XHRBreakpointsSidebarPane extends UI4.Widget.VBox {
  #breakpoints;
  #list;
  #emptyElement;
  #breakpointElements;
  #addButton;
  // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #hitBreakpoint;
  constructor() {
    super({
      jslog: `${VisualLogging6.section("source.xhr-breakpoints")}`,
      useShadowDom: true
    });
    this.registerRequiredCSS(xhrBreakpointsSidebarPane_css_default);
    this.#breakpoints = new UI4.ListModel.ListModel();
    this.#list = new UI4.ListControl.ListControl(this.#breakpoints, this, UI4.ListControl.ListMode.NonViewport);
    this.contentElement.appendChild(this.#list.element);
    this.#list.element.classList.add("breakpoint-list", "hidden");
    UI4.ARIAUtils.markAsList(this.#list.element);
    UI4.ARIAUtils.setLabel(this.#list.element, i18nString3(UIStrings3.xhrfetchBreakpoints));
    this.#emptyElement = this.contentElement.createChild("div", "gray-info-message");
    this.#emptyElement.textContent = i18nString3(UIStrings3.noBreakpoints);
    this.#breakpointElements = /* @__PURE__ */ new Map();
    this.#addButton = new UI4.Toolbar.ToolbarButton(i18nString3(UIStrings3.addXhrfetchBreakpoint), "plus", void 0, "sources.add-xhr-fetch-breakpoint");
    this.#addButton.setSize(
      "SMALL"
      /* Buttons.Button.Size.SMALL */
    );
    this.#addButton.addEventListener("Click", () => {
      void this.addButtonClicked();
    });
    this.#emptyElement.addEventListener("contextmenu", this.emptyElementContextMenu.bind(this), true);
    this.#emptyElement.tabIndex = -1;
    this.restoreBreakpoints();
    this.update();
  }
  static instance() {
    if (!xhrBreakpointsSidebarPaneInstance) {
      xhrBreakpointsSidebarPaneInstance = new _XHRBreakpointsSidebarPane();
    }
    return xhrBreakpointsSidebarPaneInstance;
  }
  toolbarItems() {
    return [this.#addButton];
  }
  emptyElementContextMenu(event) {
    const contextMenu = new UI4.ContextMenu.ContextMenu(event);
    contextMenu.defaultSection().appendItem(i18nString3(UIStrings3.addBreakpoint), this.addButtonClicked.bind(this), { jslogContext: "sources.add-xhr-fetch-breakpoint" });
    void contextMenu.show();
  }
  async addButtonClicked() {
    await UI4.ViewManager.ViewManager.instance().showView("sources.xhr-breakpoints");
    const inputElementContainer = document.createElement("p");
    inputElementContainer.classList.add("breakpoint-condition");
    inputElementContainer.textContent = i18nString3(UIStrings3.breakWhenUrlContains);
    inputElementContainer.setAttribute("jslog", `${VisualLogging6.value("condition").track({ change: true })}`);
    const inputElement = inputElementContainer.createChild("span", "breakpoint-condition-input");
    UI4.ARIAUtils.setLabel(inputElement, i18nString3(UIStrings3.urlBreakpoint));
    this.addListElement(inputElementContainer, this.#list.element.firstChild);
    const commit = (_element, newText) => {
      this.removeListElement(inputElementContainer);
      SDK6.DOMDebuggerModel.DOMDebuggerManager.instance().addXHRBreakpoint(newText, true);
      this.setBreakpoint(newText);
      this.update();
    };
    const cancel = () => {
      this.removeListElement(inputElementContainer);
      this.update();
    };
    const config = new UI4.InplaceEditor.Config(commit, cancel, void 0);
    UI4.InplaceEditor.InplaceEditor.startEditing(inputElement, config);
  }
  heightForItem(_item) {
    return 0;
  }
  isItemSelectable(_item) {
    return true;
  }
  setBreakpoint(breakKeyword) {
    if (this.#breakpoints.indexOf(breakKeyword) !== -1) {
      this.#list.refreshItem(breakKeyword);
    } else {
      this.#breakpoints.insertWithComparator(breakKeyword, (a, b) => {
        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
        return 0;
      });
    }
    if (!this.#list.selectedItem() || !this.hasFocus()) {
      this.#list.selectItem(this.#breakpoints.at(0));
    }
  }
  createElementForItem(item2) {
    const listItemElement = document.createElement("div");
    UI4.ARIAUtils.markAsListitem(listItemElement);
    const element = listItemElement.createChild("div", "breakpoint-entry");
    containerToBreakpointEntry.set(listItemElement, element);
    const enabled = SDK6.DOMDebuggerModel.DOMDebuggerManager.instance().xhrBreakpoints().get(item2) || false;
    UI4.ARIAUtils.markAsCheckbox(element);
    UI4.ARIAUtils.setChecked(element, enabled);
    element.addEventListener("contextmenu", this.contextMenu.bind(this, item2), true);
    const title = item2 ? i18nString3(UIStrings3.urlContainsS, { PH1: item2 }) : i18nString3(UIStrings3.anyXhrOrFetch);
    const checkbox = UI4.UIUtils.CheckboxLabel.create(
      title,
      enabled,
      void 0,
      void 0,
      /* small */
      true
    );
    UI4.ARIAUtils.setHidden(checkbox, true);
    UI4.ARIAUtils.setLabel(element, title);
    element.appendChild(checkbox);
    checkbox.addEventListener("click", this.checkboxClicked.bind(this, item2, enabled), false);
    element.addEventListener("click", (event) => {
      if (event.target === element) {
        this.checkboxClicked(item2, enabled);
      }
    }, false);
    breakpointEntryToCheckbox.set(element, checkbox);
    checkbox.tabIndex = -1;
    element.tabIndex = -1;
    if (item2 === this.#list.selectedItem()) {
      element.tabIndex = 0;
      this.setDefaultFocusedElement(element);
    }
    element.addEventListener("keydown", (event) => {
      let handled = false;
      if (event.key === " ") {
        this.checkboxClicked(item2, enabled);
        handled = true;
      } else if (event.key === "Enter") {
        this.labelClicked(item2);
        handled = true;
      }
      if (handled) {
        event.consume(true);
      }
    });
    if (item2 === this.#hitBreakpoint) {
      element.classList.add("breakpoint-hit");
      UI4.ARIAUtils.setDescription(element, i18nString3(UIStrings3.breakpointHit));
    }
    checkbox.classList.add("cursor-auto");
    checkbox.addEventListener("dblclick", this.labelClicked.bind(this, item2), false);
    this.#breakpointElements.set(item2, listItemElement);
    listItemElement.setAttribute("jslog", `${VisualLogging6.item().track({
      click: true,
      dblclick: true,
      resize: true,
      keydown: "ArrowUp|ArrowDown|PageUp|PageDown|Enter|Space"
    })}`);
    return listItemElement;
  }
  selectedItemChanged(_from, _to, fromElement, toElement) {
    if (fromElement) {
      const breakpointEntryElement = containerToBreakpointEntry.get(fromElement);
      if (!breakpointEntryElement) {
        throw new Error("Expected breakpoint entry to be found for an element");
      }
      breakpointEntryElement.tabIndex = -1;
    }
    if (toElement) {
      const breakpointEntryElement = containerToBreakpointEntry.get(toElement);
      if (!breakpointEntryElement) {
        throw new Error("Expected breakpoint entry to be found for an element");
      }
      this.setDefaultFocusedElement(breakpointEntryElement);
      breakpointEntryElement.tabIndex = 0;
      if (this.hasFocus()) {
        breakpointEntryElement.focus();
      }
    }
  }
  updateSelectedItemARIA(_fromElement, _toElement) {
    return true;
  }
  removeBreakpoint(breakKeyword) {
    const index = this.#breakpoints.indexOf(breakKeyword);
    if (index >= 0) {
      this.#breakpoints.remove(index);
    }
    this.#breakpointElements.delete(breakKeyword);
    this.update();
  }
  addListElement(element, beforeNode) {
    this.#list.element.insertBefore(element, beforeNode);
    this.#emptyElement.classList.add("hidden");
    this.#list.element.classList.remove("hidden");
  }
  removeListElement(element) {
    this.#list.element.removeChild(element);
    if (!this.#list.element.firstElementChild) {
      this.#emptyElement.classList.remove("hidden");
      this.#list.element.classList.add("hidden");
    }
  }
  contextMenu(breakKeyword, event) {
    const contextMenu = new UI4.ContextMenu.ContextMenu(event);
    function removeBreakpoint() {
      SDK6.DOMDebuggerModel.DOMDebuggerManager.instance().removeXHRBreakpoint(breakKeyword);
      this.removeBreakpoint(breakKeyword);
    }
    function removeAllBreakpoints() {
      for (const url of this.#breakpointElements.keys()) {
        SDK6.DOMDebuggerModel.DOMDebuggerManager.instance().removeXHRBreakpoint(url);
        this.removeBreakpoint(url);
      }
      this.update();
    }
    const removeAllTitle = i18nString3(UIStrings3.removeAllBreakpoints);
    contextMenu.defaultSection().appendItem(i18nString3(UIStrings3.addBreakpoint), this.addButtonClicked.bind(this), { jslogContext: "sources.add-xhr-fetch-breakpoint" });
    contextMenu.defaultSection().appendItem(i18nString3(UIStrings3.removeBreakpoint), removeBreakpoint.bind(this), { jslogContext: "sources.remove-xhr-fetch-breakpoint" });
    contextMenu.defaultSection().appendItem(removeAllTitle, removeAllBreakpoints.bind(this), { jslogContext: "sources.remove-all-xhr-fetch-breakpoints" });
    void contextMenu.show();
  }
  checkboxClicked(breakKeyword, checked) {
    const hadFocus = this.hasFocus();
    SDK6.DOMDebuggerModel.DOMDebuggerManager.instance().toggleXHRBreakpoint(breakKeyword, !checked);
    this.#list.refreshItem(breakKeyword);
    this.#list.selectItem(breakKeyword);
    if (hadFocus) {
      this.focus();
    }
  }
  labelClicked(breakKeyword) {
    const element = this.#breakpointElements.get(breakKeyword);
    const inputElement = document.createElement("span");
    inputElement.classList.add("breakpoint-condition");
    inputElement.textContent = breakKeyword;
    inputElement.setAttribute("jslog", `${VisualLogging6.value("condition").track({ change: true })}`);
    if (element) {
      this.#list.element.insertBefore(inputElement, element);
      element.classList.add("hidden");
    }
    const commit = (inputElement2, newText, _oldText, element2) => {
      this.removeListElement(inputElement2);
      SDK6.DOMDebuggerModel.DOMDebuggerManager.instance().removeXHRBreakpoint(breakKeyword);
      this.removeBreakpoint(breakKeyword);
      let enabled = true;
      if (element2) {
        const breakpointEntryElement = containerToBreakpointEntry.get(element2);
        const checkboxElement = breakpointEntryElement ? breakpointEntryToCheckbox.get(breakpointEntryElement) : void 0;
        if (checkboxElement) {
          enabled = checkboxElement.checked;
        }
      }
      SDK6.DOMDebuggerModel.DOMDebuggerManager.instance().addXHRBreakpoint(newText, enabled);
      this.setBreakpoint(newText);
      this.#list.selectItem(newText);
      this.focus();
    };
    const cancel = (inputElement2, element2) => {
      this.removeListElement(inputElement2);
      if (element2) {
        element2.classList.remove("hidden");
      }
      this.focus();
    };
    const config = new UI4.InplaceEditor.Config(commit, cancel, element);
    UI4.InplaceEditor.InplaceEditor.startEditing(inputElement, config);
  }
  flavorChanged(_object) {
    this.update();
  }
  update() {
    const isEmpty = this.#breakpoints.length === 0;
    this.#list.element.classList.toggle("hidden", isEmpty);
    this.#emptyElement.classList.toggle("hidden", !isEmpty);
    const details = UI4.Context.Context.instance().flavor(SDK6.DebuggerModel.DebuggerPausedDetails);
    if (!details || details.reason !== "XHR") {
      if (this.#hitBreakpoint) {
        const oldHitBreakpoint = this.#hitBreakpoint;
        this.#hitBreakpoint = void 0;
        if (this.#breakpoints.indexOf(oldHitBreakpoint) >= 0) {
          this.#list.refreshItem(oldHitBreakpoint);
        }
      }
      return;
    }
    const url = details.auxData?.["breakpointURL"];
    this.#hitBreakpoint = url;
    if (this.#breakpoints.indexOf(url) < 0) {
      return;
    }
    this.#list.refreshItem(url);
    void UI4.ViewManager.ViewManager.instance().showView("sources.xhr-breakpoints");
  }
  restoreBreakpoints() {
    const breakpoints = SDK6.DOMDebuggerModel.DOMDebuggerManager.instance().xhrBreakpoints();
    for (const url of breakpoints.keys()) {
      this.setBreakpoint(url);
    }
  }
};
export {
  CSPViolationBreakpointsSidebarPane_exports as CSPViolationBreakpointsSidebarPane,
  CategorizedBreakpointsSidebarPane_exports as CategorizedBreakpointsSidebarPane,
  DOMBreakpointsSidebarPane_exports as DOMBreakpointsSidebarPane,
  EventListenerBreakpointsSidebarPane_exports as EventListenerBreakpointsSidebarPane,
  ObjectEventListenersSidebarPane_exports as ObjectEventListenersSidebarPane,
  XHRBreakpointsSidebarPane_exports as XHRBreakpointsSidebarPane
};
//# sourceMappingURL=browser_debugger.js.map
