// Copyright 2015 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Sources from '../../panels/sources/sources.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import categorizedBreakpointsSidebarPaneStyles from './categorizedBreakpointsSidebarPane.css.js';
const UIStrings = {
    /**
     * @description Category of breakpoints
     */
    auctionWorklet: 'Ad Auction Worklet',
    /**
     * @description Text that refers to the animation of the web page
     */
    animation: 'Animation',
    /**
     * @description Screen reader description of a hit breakpoint in the Sources panel
     */
    breakpointHit: 'breakpoint hit',
    /**
     * @description Text in DOMDebugger Model
     */
    canvas: 'Canvas',
    /**
     * @description Text in DOMDebugger Model
     */
    clipboard: 'Clipboard',
    /**
     * @description Noun. Describes a group of DOM events (such as 'select' and 'submit') in this context.
     */
    control: 'Control',
    /**
     * @description Text that refers to device such as a phone
     */
    device: 'Device',
    /**
     * @description Text in DOMDebugger Model
     */
    domMutation: 'DOM Mutation',
    /**
     * @description Text in DOMDebugger Model
     */
    dragDrop: 'Drag / drop',
    /**
     * @description Title for a group of cities
     */
    geolocation: 'Geolocation',
    /**
     * @description Text in DOMDebugger Model
     */
    keyboard: 'Keyboard',
    /**
     * @description Text to load something
     */
    load: 'Load',
    /**
     * @description Text that appears on a button for the media resource type filter.
     */
    media: 'Media',
    /**
     * @description Text in DOMDebugger Model
     */
    mouse: 'Mouse',
    /**
     * @description Text in DOMDebugger Model
     */
    notification: 'Notification',
    /**
     * @description Text to parse something
     */
    parse: 'Parse',
    /**
     * @description Text in DOMDebugger Model
     */
    pictureinpicture: 'Picture-in-Picture',
    /**
     * @description Text in DOMDebugger Model
     */
    pointer: 'Pointer',
    /**
     * @description Label for a group of JavaScript files
     */
    script: 'Script',
    /**
     * @description Category of breakpoints
     */
    sharedStorageWorklet: 'Shared Storage Worklet',
    /**
     * @description Text in DOMDebugger Model
     */
    timer: 'Timer',
    /**
     * @description Text for the touch type to simulate on a device
     */
    touch: 'Touch',
    /**
     * @description Title for a category of breakpoints on Trusted Type violations
     */
    trustedTypeViolations: 'Trusted Type Violations',
    /**
     * @description Title of the WebAudio tool
     */
    webaudio: 'WebAudio',
    /**
     * @description Text in DOMDebugger Model
     */
    window: 'Window',
    /**
     * @description Text for the service worker type.
     */
    worker: 'Worker',
    /**
     * @description Text that appears on a button for the xhr resource type filter.
     */
    xhr: 'XHR',
};
const str_ = i18n.i18n.registerUIStrings('panels/browser_debugger/CategorizedBreakpointsSidebarPane.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(undefined, str_);
const { html, render } = Lit;
export const DEFAULT_VIEW = (input, output, target) => {
    const shouldExpandCategory = (breakpoints) => Boolean(input.filterText) || (input.highlightedItem && breakpoints.includes(input.highlightedItem)) ||
        breakpoints.some(breakpoint => breakpoint.enabled());
    const filter = (breakpoint) => !input.filterText ||
        Boolean(Sources.CategorizedBreakpointL10n.getLocalizedBreakpointName(breakpoint.name).match(input.filterText)) ||
        breakpoint === input.highlightedItem;
    const filteredCategories = input.sortedCategoryNames.values()
        .map(category => [category, input.categories.get(category)?.filter(filter)])
        .filter((filteredCategory) => Boolean(filteredCategory[1]?.length))
        .toArray();
    const onCheckboxClicked = (event, target) => {
        const eventTarget = event.target;
        if (!(eventTarget instanceof UI.UIUtils.CheckboxLabel)) {
            return;
        }
        const enabled = eventTarget.checked;
        if (target instanceof SDK.CategorizedBreakpoint.CategorizedBreakpoint) {
            input.onBreakpointChange(target, enabled);
        }
        else {
            input.categories.get(target)?.forEach(breakpoint => input.onBreakpointChange(breakpoint, enabled));
        }
    };
    const classes = (breakpoint) => Lit.Directives.classMap({
        small: true,
        'source-code': true,
        'breakpoint-hit': input.highlightedItem === breakpoint,
    });
    const onExpand = (category, { detail: { expanded } }) => {
        const breakpoints = category && input.categories.get(category);
        if (!breakpoints) {
            return;
        }
        if (shouldExpandCategory(breakpoints)) {
            // Basically ignore expand/collapse when the category is expanded by default.
            return;
        }
        if (expanded) {
            output.userExpandedCategories.add(category);
        }
        else {
            output.userExpandedCategories.delete(category);
        }
    };
    const onKeyDown = (e) => {
        if (e.key === ' ') {
            input.onSpaceKeyDown();
            e.preventDefault();
        }
    };
    render(
    // clang-format off
    html `
    <devtools-toolbar jslog=${VisualLogging.toolbar()}>
      <devtools-toolbar-input
        type="filter"
        @change=${(e) => input.onFilterChanged(e.detail)}
        style="flex: 1;"
        ></devtools-toolbar-input>
    </devtools-toolbar>
    <devtools-tree autofocus @keydown=${onKeyDown} .template=${html `
      <ul role="tree">
        ${filteredCategories.map(([category, breakpoints]) => html `
          <li @select=${() => input.onItemSelected(category)}
              @expand=${(e) => onExpand(category, e)}
              role="treeitem"
              jslog-context=${category}
              aria-checked=${breakpoints.some(breakpoint => breakpoint.enabled())
        ? breakpoints.some(breakpoint => !breakpoint.enabled()) ? 'mixed' : true
        : false}>
            <style>${categorizedBreakpointsSidebarPaneStyles}</style>
            <devtools-checkbox
              class="small"
              tabIndex=-1
              title=${getLocalizedCategory(category)}
              ?indeterminate=${breakpoints.some(breakpoint => !breakpoint.enabled()) &&
        breakpoints.some(breakpoint => breakpoint.enabled())}
              ?checked=${!breakpoints.some(breakpoint => !breakpoint.enabled())}
              @change=${(e) => onCheckboxClicked(e, category)}
            >${getLocalizedCategory(category)}</devtools-checkbox>
            <ul
                role="group"
                ?hidden=${!shouldExpandCategory(breakpoints) && !input.userExpandedCategories.has(category)}>
              ${breakpoints.map(breakpoint => html `
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
                  aria-description=${breakpoint === input.highlightedItem ? i18nString(UIStrings.breakpointHit)
        : Lit.nothing}
                  @change=${(e) => onCheckboxClicked(e, breakpoint)}
                >${Sources.CategorizedBreakpointL10n.getLocalizedBreakpointName(breakpoint.name)}</devtools-checkbox>
              </li>`)}
            </ul>
          </li>`)}
      </ul>`}>
    </devtools-tree>`, target);
    // clang-format on
};
export class CategorizedBreakpointsSidebarPane extends UI.Widget.VBox {
    #viewId;
    // A layout test reaches into this
    categories = new Map();
    #sortedCategories;
    #highlightedItem = null;
    #filterText = null;
    #view;
    #userExpandedCategories = new Set();
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
    #onItemSelected(item) {
        this.#selectedItem = item;
    }
    #onSpaceKeyDown() {
        const selected = this.#selectedItem;
        if (!selected) {
            return;
        }
        if (selected instanceof SDK.CategorizedBreakpoint.CategorizedBreakpoint) {
            this.onBreakpointChanged(selected, !selected.enabled());
        }
        else {
            const breakpoints = this.categories.get(selected);
            if (breakpoints) {
                const newEnabled = breakpoints.some(bp => !bp.enabled());
                breakpoints.forEach(bp => this.onBreakpointChanged(bp, newEnabled));
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
            userExpandedCategories: this.#userExpandedCategories,
        };
        const output = {
            userExpandedCategories: this.#userExpandedCategories,
        };
        this.#view(input, output, this.contentElement);
    }
}
const LOCALIZED_CATEGORIES = {
    ["animation" /* SDK.CategorizedBreakpoint.Category.ANIMATION */]: i18nLazyString(UIStrings.animation),
    ["auction-worklet" /* SDK.CategorizedBreakpoint.Category.AUCTION_WORKLET */]: i18nLazyString(UIStrings.auctionWorklet),
    ["canvas" /* SDK.CategorizedBreakpoint.Category.CANVAS */]: i18nLazyString(UIStrings.canvas),
    ["clipboard" /* SDK.CategorizedBreakpoint.Category.CLIPBOARD */]: i18nLazyString(UIStrings.clipboard),
    ["control" /* SDK.CategorizedBreakpoint.Category.CONTROL */]: i18nLazyString(UIStrings.control),
    ["device" /* SDK.CategorizedBreakpoint.Category.DEVICE */]: i18nLazyString(UIStrings.device),
    ["dom-mutation" /* SDK.CategorizedBreakpoint.Category.DOM_MUTATION */]: i18nLazyString(UIStrings.domMutation),
    ["drag-drop" /* SDK.CategorizedBreakpoint.Category.DRAG_DROP */]: i18nLazyString(UIStrings.dragDrop),
    ["geolocation" /* SDK.CategorizedBreakpoint.Category.GEOLOCATION */]: i18nLazyString(UIStrings.geolocation),
    ["keyboard" /* SDK.CategorizedBreakpoint.Category.KEYBOARD */]: i18nLazyString(UIStrings.keyboard),
    ["load" /* SDK.CategorizedBreakpoint.Category.LOAD */]: i18nLazyString(UIStrings.load),
    ["media" /* SDK.CategorizedBreakpoint.Category.MEDIA */]: i18nLazyString(UIStrings.media),
    ["mouse" /* SDK.CategorizedBreakpoint.Category.MOUSE */]: i18nLazyString(UIStrings.mouse),
    ["notification" /* SDK.CategorizedBreakpoint.Category.NOTIFICATION */]: i18nLazyString(UIStrings.notification),
    ["parse" /* SDK.CategorizedBreakpoint.Category.PARSE */]: i18nLazyString(UIStrings.parse),
    ["picture-in-picture" /* SDK.CategorizedBreakpoint.Category.PICTURE_IN_PICTURE */]: i18nLazyString(UIStrings.pictureinpicture),
    ["pointer" /* SDK.CategorizedBreakpoint.Category.POINTER */]: i18nLazyString(UIStrings.pointer),
    ["script" /* SDK.CategorizedBreakpoint.Category.SCRIPT */]: i18nLazyString(UIStrings.script),
    ["shared-storage-worklet" /* SDK.CategorizedBreakpoint.Category.SHARED_STORAGE_WORKLET */]: i18nLazyString(UIStrings.sharedStorageWorklet),
    ["timer" /* SDK.CategorizedBreakpoint.Category.TIMER */]: i18nLazyString(UIStrings.timer),
    ["touch" /* SDK.CategorizedBreakpoint.Category.TOUCH */]: i18nLazyString(UIStrings.touch),
    ["trusted-type-violation" /* SDK.CategorizedBreakpoint.Category.TRUSTED_TYPE_VIOLATION */]: i18nLazyString(UIStrings.trustedTypeViolations),
    ["web-audio" /* SDK.CategorizedBreakpoint.Category.WEB_AUDIO */]: i18nLazyString(UIStrings.webaudio),
    ["window" /* SDK.CategorizedBreakpoint.Category.WINDOW */]: i18nLazyString(UIStrings.window),
    ["worker" /* SDK.CategorizedBreakpoint.Category.WORKER */]: i18nLazyString(UIStrings.worker),
    ["xhr" /* SDK.CategorizedBreakpoint.Category.XHR */]: i18nLazyString(UIStrings.xhr),
};
function getLocalizedCategory(category) {
    return LOCALIZED_CATEGORIES[category]();
}
//# sourceMappingURL=CategorizedBreakpointsSidebarPane.js.map