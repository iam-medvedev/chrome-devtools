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
     * @description Category of event listener breakpoints for Ad Auction Worklet events.
     */
    auctionWorklet: 'Ad auction worklet',
    /**
     * @description Category of event listener breakpoints for animation events.
     */
    animation: 'Animation',
    /**
     * @description Screen reader description of a hit breakpoint in the Sources panel.
     */
    breakpointHit: 'breakpoint hit',
    /**
     * @description Category of event listener breakpoints for canvas events.
     */
    canvas: 'Canvas',
    /**
     * @description Category of event listener breakpoints for clipboard events.
     */
    clipboard: 'Clipboard',
    /**
     * @description Noun. Describes a group of DOM events (such as 'select' and 'submit') in this context.
     */
    control: 'Control',
    /**
     * @description Category of event listener breakpoints for device events.
     */
    device: 'Device',
    /**
     * @description Category of event listener breakpoints for DOM mutation events.
     */
    domMutation: 'DOM mutation',
    /**
     * @description Category of event listener breakpoints for drag and drop events.
     */
    dragDrop: 'Drag / drop',
    /**
     * @description Category of event listener breakpoints for geolocation events.
     */
    geolocation: 'Geolocation',
    /**
     * @description Category of event listener breakpoints for keyboard events.
     */
    keyboard: 'Keyboard',
    /**
     * @description Category of event listener breakpoints for load events.
     */
    load: 'Load',
    /**
     * @description Category of event listener breakpoints for media events.
     */
    media: 'Media',
    /**
     * @description Category of event listener breakpoints for mouse events.
     */
    mouse: 'Mouse',
    /**
     * @description Category of event listener breakpoints for notification events.
     */
    notification: 'Notification',
    /**
     * @description Category of event listener breakpoints for parse events.
     */
    parse: 'Parse',
    /**
     * @description Category of event listener breakpoints for picture-in-picture events.
     */
    pictureinpicture: 'Picture-in-picture',
    /**
     * @description Category of event listener breakpoints for pointer events.
     */
    pointer: 'Pointer',
    /**
     * @description Category of event listener breakpoints for script events.
     */
    script: 'Script',
    /**
     * @description Category of event listener breakpoints for timer events.
     */
    timer: 'Timer',
    /**
     * @description Category of event listener breakpoints for touch events.
     */
    touch: 'Touch',
    /**
     * @description Category of event listener breakpoints for Trusted Type violations.
     */
    trustedTypeViolations: '`Trusted Type` violations',
    /**
     * @description Category of event listener breakpoints for WebAudio events.
     */
    webaudio: 'WebAudio',
    /**
     * @description Category of event listener breakpoints for window events.
     */
    window: 'Window',
    /**
     * @description Category of event listener breakpoints for worker events.
     */
    worker: 'Worker',
    /**
     * @description Category of event listener breakpoints for XHR events.
     */
    xhr: 'XHR',
};
const str_ = i18n.i18n.registerUIStrings('panels/browser_debugger/CategorizedBreakpointsSidebarPane.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(undefined, str_);
const { html, render } = Lit;
const { ifExpanded } = UI.TreeOutline;
export const DEFAULT_VIEW = (input, output, target) => {
    const shouldExpandCategory = (breakpoints) => Boolean(input.filterText) || (input.highlightedItem && breakpoints.includes(input.highlightedItem)) ||
        breakpoints.some(breakpoint => breakpoint.enabled());
    const filterRegex = input.filterText ? new RegExp(Platform.StringUtilities.escapeForRegExp(input.filterText), 'i') : null;
    const filter = (breakpoint) => !filterRegex ||
        Boolean(Sources.CategorizedBreakpointL10n.getLocalizedBreakpointName(breakpoint.name).match(filterRegex)) ||
        breakpoint === input.highlightedItem;
    const filteredCategories = input.sortedCategoryNames.values()
        .map(category => {
        const breakpoints = input.categories.get(category);
        if (filterRegex && getLocalizedCategory(category).match(filterRegex)) {
            return [category, breakpoints];
        }
        return [category, breakpoints?.filter(filter)];
    })
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
              @expand=${() => input.onExpandCollapse()}
              role="treeitem"
              jslog-context=${category}
              aria-checked=${breakpoints.some(breakpoint => breakpoint.enabled())
        ? breakpoints.some(breakpoint => !breakpoint.enabled()) ? 'mixed' : true
        : false}
              ?open=${shouldExpandCategory(breakpoints)}>
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
            <ul role="group">
              ${ifExpanded(html `${breakpoints.map(breakpoint => html `
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
                </li>`)}`)}
            </ul>
          </li>`)}
      </ul>`}>
    </devtools-tree>`, target, { container: { attributes: { jslog: input.jslog } } });
    // clang-format on
};
export class CategorizedBreakpointsSidebarPane extends UI.Widget.VBox {
    #viewId;
    #jslog;
    // A layout test reaches into this
    categories = new Map();
    #sortedCategories;
    #highlightedItem = null;
    #filterText = null;
    #view;
    #selectedItem = null;
    constructor(breakpoints, jslog, viewId, view = DEFAULT_VIEW) {
        super({ useShadowDom: 'pure' });
        this.#view = view;
        this.#jslog = jslog;
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
            jslog: this.#jslog,
            onFilterChanged: this.#onFilterChanged.bind(this),
            onBreakpointChange: this.onBreakpointChanged.bind(this),
            onItemSelected: this.#onItemSelected.bind(this),
            onSpaceKeyDown: this.#onSpaceKeyDown.bind(this),
            sortedCategoryNames: this.#sortedCategories,
            categories: this.categories,
            highlightedItem: this.#highlightedItem,
            onExpandCollapse: () => {
                this.requestUpdate();
            },
        };
        this.#view(input, undefined, this.contentElement);
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