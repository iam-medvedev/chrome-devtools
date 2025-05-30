// Copyright (c) 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-imperative-dom-api */
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Sources from '../../panels/sources/sources.js';
import * as UI from '../../ui/legacy/legacy.js';
import categorizedBreakpointsSidebarPaneStyles from './categorizedBreakpointsSidebarPane.css.js';
const UIStrings = {
    /**
     * @description Category of breakpoints
     */
    auctionWorklet: 'Ad Auction Worklet',
    /**
     *@description Text that refers to the animation of the web page
     */
    animation: 'Animation',
    /**
     *@description Screen reader description of a hit breakpoint in the Sources panel
     */
    breakpointHit: 'breakpoint hit',
    /**
     *@description Text in DOMDebugger Model
     */
    canvas: 'Canvas',
    /**
     *@description Text in DOMDebugger Model
     */
    clipboard: 'Clipboard',
    /**
     * @description Noun. Describes a group of DOM events (such as 'select' and 'submit') in this context.
     */
    control: 'Control',
    /**
     *@description Text that refers to device such as a phone
     */
    device: 'Device',
    /**
     *@description Text in DOMDebugger Model
     */
    domMutation: 'DOM Mutation',
    /**
     *@description Text in DOMDebugger Model
     */
    dragDrop: 'Drag / drop',
    /**
     *@description Title for a group of cities
     */
    geolocation: 'Geolocation',
    /**
     *@description Text in DOMDebugger Model
     */
    keyboard: 'Keyboard',
    /**
     *@description Text to load something
     */
    load: 'Load',
    /**
     *@description Text that appears on a button for the media resource type filter.
     */
    media: 'Media',
    /**
     *@description Text in DOMDebugger Model
     */
    mouse: 'Mouse',
    /**
     *@description Text in DOMDebugger Model
     */
    notification: 'Notification',
    /**
     *@description Text to parse something
     */
    parse: 'Parse',
    /**
     *@description Text in DOMDebugger Model
     */
    pictureinpicture: 'Picture-in-Picture',
    /**
     *@description Text in DOMDebugger Model
     */
    pointer: 'Pointer',
    /**
     *@description Label for a group of JavaScript files
     */
    script: 'Script',
    /**
     *@description Category of breakpoints
     */
    sharedStorageWorklet: 'Shared Storage Worklet',
    /**
     *@description Text in DOMDebugger Model
     */
    timer: 'Timer',
    /**
     *@description Text for the touch type to simulate on a device
     */
    touch: 'Touch',
    /**
     *@description Title for a category of breakpoints on Trusted Type violations
     */
    trustedTypeViolations: 'Trusted Type Violations',
    /**
     *@description Title of the WebAudio tool
     */
    webaudio: 'WebAudio',
    /**
     *@description Text in DOMDebugger Model
     */
    window: 'Window',
    /**
     *@description Text for the service worker type.
     */
    worker: 'Worker',
    /**
     *@description Text that appears on a button for the xhr resource type filter.
     */
    xhr: 'XHR',
};
const str_ = i18n.i18n.registerUIStrings('panels/browser_debugger/CategorizedBreakpointsSidebarPane.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(undefined, str_);
export class CategorizedBreakpointsSidebarPane extends UI.Widget.VBox {
    #categoriesTreeOutline;
    #viewId;
    #detailsPausedReason;
    #categories;
    #breakpoints;
    #highlightedElement;
    constructor(breakpoints, viewId, detailsPausedReason) {
        super(true);
        this.#categoriesTreeOutline = new UI.TreeOutline.TreeOutlineInShadow();
        this.#categoriesTreeOutline.registerRequiredCSS(categorizedBreakpointsSidebarPaneStyles);
        this.#categoriesTreeOutline.setShowSelectionOnKeyboardFocus(/* show */ true);
        this.contentElement.appendChild(this.#categoriesTreeOutline.element);
        this.#viewId = viewId;
        this.#detailsPausedReason = detailsPausedReason;
        const categories = new Set(breakpoints.map(bp => bp.category()));
        const sortedCategories = [...categories].sort((a, b) => {
            const categoryA = getLocalizedCategory(a);
            const categoryB = getLocalizedCategory(b);
            return categoryA.localeCompare(categoryB, i18n.DevToolsLocale.DevToolsLocale.instance().locale);
        });
        this.#categories = new Map();
        for (const category of sortedCategories) {
            this.createCategory(category);
        }
        if (sortedCategories.length > 0) {
            const firstCategory = this.#categories.get(sortedCategories[0]);
            if (firstCategory) {
                firstCategory.element.select();
            }
        }
        this.#breakpoints = new Map();
        for (const breakpoint of breakpoints) {
            this.createBreakpoint(breakpoint);
        }
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.DebuggerModel.DebuggerModel, SDK.DebuggerModel.Events.DebuggerPaused, this.update, this);
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.DebuggerModel.DebuggerModel, SDK.DebuggerModel.Events.DebuggerResumed, this.update, this);
        UI.Context.Context.instance().addFlavorChangeListener(SDK.Target.Target, this.update, this);
    }
    get categories() {
        return this.#categories;
    }
    get breakpoints() {
        return this.#breakpoints;
    }
    focus() {
        this.#categoriesTreeOutline.forceSelect();
    }
    handleSpaceKeyEventOnBreakpoint(event, breakpoint) {
        if (event && event.key === ' ') {
            if (breakpoint) {
                breakpoint.checkbox.click();
            }
            event.consume(true);
        }
    }
    createCategory(name) {
        const labelNode = UI.UIUtils.CheckboxLabel.create(getLocalizedCategory(name), undefined, undefined, name, /* small */ true);
        labelNode.addEventListener('click', this.categoryCheckboxClicked.bind(this, name), true);
        labelNode.tabIndex = -1;
        const treeElement = new UI.TreeOutline.TreeElement(labelNode, undefined, name);
        treeElement.listItemElement.addEventListener('keydown', event => {
            this.handleSpaceKeyEventOnBreakpoint(event, this.#categories.get(name));
        });
        labelNode.addEventListener('keydown', event => {
            treeElement.listItemElement.focus();
            this.handleSpaceKeyEventOnBreakpoint(event, this.#categories.get(name));
        });
        UI.ARIAUtils.setChecked(treeElement.listItemElement, false);
        this.#categoriesTreeOutline.appendChild(treeElement);
        this.#categories.set(name, { element: treeElement, checkbox: labelNode });
    }
    createBreakpoint(breakpoint) {
        const labelNode = UI.UIUtils.CheckboxLabel.create(Sources.CategorizedBreakpointL10n.getLocalizedBreakpointName(breakpoint.name), undefined, undefined, Platform.StringUtilities.toKebabCase(breakpoint.name), /* small */ true);
        labelNode.classList.add('source-code', 'breakpoint');
        labelNode.addEventListener('click', this.breakpointCheckboxClicked.bind(this, breakpoint), true);
        labelNode.tabIndex = -1;
        const treeElement = new UI.TreeOutline.TreeElement(labelNode, undefined, Platform.StringUtilities.toKebabCase(breakpoint.name));
        treeElement.listItemElement.addEventListener('keydown', event => {
            this.handleSpaceKeyEventOnBreakpoint(event, this.#breakpoints.get(breakpoint));
        });
        labelNode.addEventListener('keydown', event => {
            treeElement.listItemElement.focus();
            this.handleSpaceKeyEventOnBreakpoint(event, this.#breakpoints.get(breakpoint));
        });
        UI.ARIAUtils.setChecked(treeElement.listItemElement, false);
        treeElement.listItemElement.createChild('div', 'breakpoint-hit-marker');
        const category = this.#categories.get(breakpoint.category());
        if (category) {
            category.element.appendChild(treeElement);
        }
        // Better to return that to produce a side-effect
        this.#breakpoints.set(breakpoint, { element: treeElement, checkbox: labelNode });
    }
    getBreakpointFromPausedDetails(_details) {
        return null;
    }
    update() {
        const target = UI.Context.Context.instance().flavor(SDK.Target.Target);
        const debuggerModel = target ? target.model(SDK.DebuggerModel.DebuggerModel) : null;
        const details = debuggerModel ? debuggerModel.debuggerPausedDetails() : null;
        if (!details || details.reason !== this.#detailsPausedReason || !details.auxData) {
            if (this.#highlightedElement) {
                UI.ARIAUtils.setDescription(this.#highlightedElement, '');
                this.#highlightedElement.classList.remove('breakpoint-hit');
                this.#highlightedElement = undefined;
            }
            return;
        }
        const breakpoint = this.getBreakpointFromPausedDetails(details);
        if (!breakpoint) {
            return;
        }
        void UI.ViewManager.ViewManager.instance().showView(this.#viewId);
        const category = this.#categories.get(breakpoint.category());
        if (category) {
            category.element.expand();
        }
        const matchingBreakpoint = this.#breakpoints.get(breakpoint);
        if (matchingBreakpoint) {
            this.#highlightedElement = matchingBreakpoint.element.listItemElement;
            UI.ARIAUtils.setDescription(this.#highlightedElement, i18nString(UIStrings.breakpointHit));
            this.#highlightedElement.classList.add('breakpoint-hit');
        }
    }
    // Probably can be kept although eventListener does not call this._breakpointCheckboxClicke
    categoryCheckboxClicked(category) {
        const item = this.#categories.get(category);
        if (!item) {
            return;
        }
        const enabled = item.checkbox.checked;
        UI.ARIAUtils.setChecked(item.element.listItemElement, enabled);
        for (const [breakpoint, treeItem] of this.#breakpoints) {
            if (breakpoint.category() === category) {
                const matchingBreakpoint = this.#breakpoints.get(breakpoint);
                if (matchingBreakpoint) {
                    matchingBreakpoint.checkbox.checked = enabled;
                    this.toggleBreakpoint(breakpoint, enabled);
                    UI.ARIAUtils.setChecked(treeItem.element.listItemElement, enabled);
                }
            }
        }
    }
    toggleBreakpoint(breakpoint, enabled) {
        breakpoint.setEnabled(enabled);
    }
    breakpointCheckboxClicked(breakpoint) {
        const item = this.#breakpoints.get(breakpoint);
        if (!item) {
            return;
        }
        this.toggleBreakpoint(breakpoint, item.checkbox.checked);
        UI.ARIAUtils.setChecked(item.element.listItemElement, item.checkbox.checked);
        // Put the rest in a separate function
        let hasEnabled = false;
        let hasDisabled = false;
        for (const other of this.#breakpoints.keys()) {
            if (other.category() === breakpoint.category()) {
                if (other.enabled()) {
                    hasEnabled = true;
                }
                else {
                    hasDisabled = true;
                }
            }
        }
        const category = this.#categories.get(breakpoint.category());
        if (!category) {
            return;
        }
        category.checkbox.checked = hasEnabled;
        category.checkbox.indeterminate = hasEnabled && hasDisabled;
        if (category.checkbox.indeterminate) {
            UI.ARIAUtils.setCheckboxAsIndeterminate(category.element.listItemElement);
        }
        else {
            UI.ARIAUtils.setChecked(category.element.listItemElement, hasEnabled);
        }
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