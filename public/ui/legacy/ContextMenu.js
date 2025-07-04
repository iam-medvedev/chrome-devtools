/*
 * Copyright (C) 2009 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import * as Host from '../../core/host/host.js';
import * as Root from '../../core/root/root.js';
import * as Buttons from '../components/buttons/buttons.js';
import { html, render } from '../lit/lit.js';
import * as VisualLogging from '../visual_logging/visual_logging.js';
import { ActionRegistry } from './ActionRegistry.js';
import { ShortcutRegistry } from './ShortcutRegistry.js';
import { SoftContextMenu } from './SoftContextMenu.js';
import { deepElementFromEvent } from './UIUtils.js';
export class Item {
    typeInternal;
    label;
    accelerator;
    previewFeature;
    disabled;
    checked;
    isDevToolsPerformanceMenuItem;
    contextMenu;
    idInternal;
    customElement;
    shortcut;
    #tooltip;
    jslogContext;
    constructor(contextMenu, type, label, isPreviewFeature, disabled, checked, accelerator, tooltip, jslogContext) {
        this.typeInternal = type;
        this.label = label;
        this.previewFeature = Boolean(isPreviewFeature);
        this.accelerator = accelerator;
        this.disabled = disabled;
        this.checked = checked;
        this.isDevToolsPerformanceMenuItem = false;
        this.contextMenu = contextMenu;
        this.idInternal = undefined;
        this.#tooltip = tooltip;
        if (type === 'item' || type === 'checkbox') {
            this.idInternal = contextMenu ? contextMenu.nextId() : 0;
        }
        this.jslogContext = jslogContext;
    }
    id() {
        if (this.idInternal === undefined) {
            throw new Error('Tried to access a ContextMenu Item ID but none was set.');
        }
        return this.idInternal;
    }
    type() {
        return this.typeInternal;
    }
    isPreviewFeature() {
        return this.previewFeature;
    }
    isEnabled() {
        return !this.disabled;
    }
    setEnabled(enabled) {
        this.disabled = !enabled;
    }
    buildDescriptor() {
        switch (this.typeInternal) {
            case 'item': {
                const result = {
                    type: 'item',
                    id: this.idInternal,
                    label: this.label,
                    isExperimentalFeature: this.previewFeature,
                    enabled: !this.disabled,
                    checked: undefined,
                    subItems: undefined,
                    tooltip: this.#tooltip,
                    jslogContext: this.jslogContext,
                };
                if (this.customElement) {
                    result.element = this.customElement;
                }
                if (this.shortcut) {
                    result.shortcut = this.shortcut;
                }
                if (this.accelerator) {
                    result.accelerator = this.accelerator;
                    if (this.isDevToolsPerformanceMenuItem) {
                        result.isDevToolsPerformanceMenuItem = true;
                    }
                }
                return result;
            }
            case 'separator': {
                return {
                    type: 'separator',
                    id: undefined,
                    label: undefined,
                    enabled: undefined,
                    checked: undefined,
                    subItems: undefined,
                };
            }
            case 'checkbox': {
                const result = {
                    type: 'checkbox',
                    id: this.idInternal,
                    label: this.label,
                    checked: Boolean(this.checked),
                    isExperimentalFeature: this.previewFeature,
                    enabled: !this.disabled,
                    subItems: undefined,
                    tooltip: this.#tooltip,
                    jslogContext: this.jslogContext,
                };
                if (this.customElement) {
                    result.element = this.customElement;
                }
                return result;
            }
        }
        throw new Error('Invalid item type:' + this.typeInternal);
    }
    setAccelerator(key, modifiers) {
        const modifierSum = modifiers.reduce((result, modifier) => result + ShortcutRegistry.instance().devToolsToChromeModifier(modifier), 0);
        this.accelerator = { keyCode: key.code, modifiers: modifierSum };
    }
    // This influences whether accelerators will be shown for native menus on Mac.
    // Use this ONLY for performance menus and ONLY where accelerators are critical
    // for a smooth user journey and heavily context dependent.
    setIsDevToolsPerformanceMenuItem(isDevToolsPerformanceMenuItem) {
        this.isDevToolsPerformanceMenuItem = isDevToolsPerformanceMenuItem;
    }
    setShortcut(shortcut) {
        this.shortcut = shortcut;
    }
}
export class Section {
    contextMenu;
    items;
    constructor(contextMenu) {
        this.contextMenu = contextMenu;
        this.items = [];
    }
    appendItem(label, handler, options) {
        const item = new Item(this.contextMenu, 'item', label, options?.isPreviewFeature, options?.disabled, undefined, options?.accelerator, options?.tooltip, options?.jslogContext);
        if (options?.additionalElement) {
            item.customElement = options?.additionalElement;
        }
        this.items.push(item);
        if (this.contextMenu) {
            this.contextMenu.setHandler(item.id(), handler);
        }
        return item;
    }
    appendCustomItem(element, jslogContext) {
        const item = new Item(this.contextMenu, 'item', undefined, undefined, undefined, undefined, undefined, undefined, jslogContext);
        item.customElement = element;
        this.items.push(item);
        return item;
    }
    appendSeparator() {
        const item = new Item(this.contextMenu, 'separator');
        this.items.push(item);
        return item;
    }
    appendAction(actionId, label, optional) {
        if (optional && !ActionRegistry.instance().hasAction(actionId)) {
            return;
        }
        const action = ActionRegistry.instance().getAction(actionId);
        if (!label) {
            label = action.title();
        }
        const result = this.appendItem(label, action.execute.bind(action), {
            disabled: !action.enabled(),
            jslogContext: actionId,
        });
        const shortcut = ShortcutRegistry.instance().shortcutTitleForAction(actionId);
        const keyAndModifier = ShortcutRegistry.instance().keyAndModifiersForAction(actionId);
        if (keyAndModifier) {
            result.setAccelerator(keyAndModifier.key, [keyAndModifier.modifier]);
        }
        if (shortcut) {
            result.setShortcut(shortcut);
        }
    }
    appendSubMenuItem(label, disabled, jslogContext) {
        const item = new SubMenu(this.contextMenu, label, disabled, jslogContext);
        item.init();
        this.items.push(item);
        return item;
    }
    appendCheckboxItem(label, handler, options) {
        const item = new Item(this.contextMenu, 'checkbox', label, options?.experimental, options?.disabled, options?.checked, undefined, options?.tooltip, options?.jslogContext);
        this.items.push(item);
        if (this.contextMenu) {
            this.contextMenu.setHandler(item.id(), handler);
        }
        if (options?.additionalElement) {
            item.customElement = options.additionalElement;
        }
        return item;
    }
}
export class SubMenu extends Item {
    sections;
    sectionList;
    constructor(contextMenu, label, disabled, jslogContext) {
        super(contextMenu, 'subMenu', label, undefined, disabled, undefined, undefined, undefined, jslogContext);
        this.sections = new Map();
        this.sectionList = [];
    }
    init() {
        ContextMenu.groupWeights.forEach(name => this.section(name));
    }
    section(name) {
        if (!name) {
            name = 'default';
        }
        let section = name ? this.sections.get(name) : null;
        if (!section) {
            section = new Section(this.contextMenu);
            if (name) {
                this.sections.set(name, section);
                this.sectionList.push(section);
            }
            else {
                this.sectionList.splice(ContextMenu.groupWeights.indexOf('default'), 0, section);
            }
        }
        return section;
    }
    headerSection() {
        return this.section('header');
    }
    newSection() {
        return this.section('new');
    }
    revealSection() {
        return this.section('reveal');
    }
    clipboardSection() {
        return this.section('clipboard');
    }
    editSection() {
        return this.section('edit');
    }
    debugSection() {
        return this.section('debug');
    }
    viewSection() {
        return this.section('view');
    }
    defaultSection() {
        return this.section('default');
    }
    overrideSection() {
        return this.section('override');
    }
    saveSection() {
        return this.section('save');
    }
    annotationSection() {
        return this.section('annotation');
    }
    footerSection() {
        return this.section('footer');
    }
    buildDescriptor() {
        const result = {
            type: 'subMenu',
            label: this.label,
            accelerator: this.accelerator,
            isDevToolsPerformanceMenuItem: this.accelerator ? this.isDevToolsPerformanceMenuItem : undefined,
            isExperimentalFeature: this.previewFeature,
            enabled: !this.disabled,
            subItems: [],
            id: undefined,
            checked: undefined,
            jslogContext: this.jslogContext,
        };
        const nonEmptySections = this.sectionList.filter(section => Boolean(section.items.length));
        for (const section of nonEmptySections) {
            for (const item of section.items) {
                if (!result.subItems) {
                    result.subItems = [];
                }
                result.subItems.push(item.buildDescriptor());
            }
            if (section !== nonEmptySections[nonEmptySections.length - 1]) {
                if (!result.subItems) {
                    result.subItems = [];
                }
                result.subItems.push({
                    type: 'separator',
                    id: undefined,
                    subItems: undefined,
                    checked: undefined,
                    enabled: undefined,
                    label: undefined,
                });
            }
        }
        return result;
    }
    appendItemsAtLocation(location) {
        const items = getRegisteredItems();
        items.sort((firstItem, secondItem) => {
            const order1 = firstItem.order || 0;
            const order2 = secondItem.order || 0;
            return order1 - order2;
        });
        for (const item of items) {
            if (item.experiment && !Root.Runtime.experiments.isEnabled(item.experiment)) {
                continue;
            }
            const itemLocation = item.location;
            const actionId = item.actionId;
            if (!itemLocation?.startsWith(location + '/')) {
                continue;
            }
            const section = itemLocation.substr(location.length + 1);
            if (!section || section.includes('/')) {
                continue;
            }
            if (actionId) {
                this.section(section).appendAction(actionId);
            }
        }
    }
}
const MENU_ITEM_HEIGHT_FOR_LOGGING = 20;
const MENU_ITEM_WIDTH_FOR_LOGGING = 200;
export class ContextMenu extends SubMenu {
    contextMenu;
    pendingTargets;
    event;
    useSoftMenu;
    keepOpen;
    x;
    y;
    onSoftMenuClosed;
    handlers;
    idInternal;
    softMenu;
    contextMenuLabel;
    openHostedMenu;
    eventTarget;
    loggableParent = null;
    constructor(event, options = {}) {
        super(null);
        const mouseEvent = event;
        this.contextMenu = this;
        super.init();
        this.pendingTargets = [];
        this.event = mouseEvent;
        this.eventTarget = this.event.target;
        this.useSoftMenu = Boolean(options.useSoftMenu);
        this.keepOpen = Boolean(options.keepOpen);
        this.x = options.x === undefined ? mouseEvent.x : options.x;
        this.y = options.y === undefined ? mouseEvent.y : options.y;
        this.onSoftMenuClosed = options.onSoftMenuClosed;
        this.handlers = new Map();
        this.idInternal = 0;
        this.openHostedMenu = null;
        let target = (deepElementFromEvent(event) || event.target);
        if (target) {
            this.appendApplicableItems(target);
            while (target instanceof Element && !target.hasAttribute('jslog')) {
                target = target.parentElementOrShadowHost() ?? null;
            }
            if (target instanceof Element) {
                this.loggableParent = target;
            }
        }
    }
    static initialize() {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(Host.InspectorFrontendHostAPI.Events.SetUseSoftMenu, setUseSoftMenu);
        function setUseSoftMenu(event) {
            ContextMenu.useSoftMenu = event.data;
        }
    }
    static installHandler(doc) {
        doc.body.addEventListener('contextmenu', handler, false);
        function handler(event) {
            const contextMenu = new ContextMenu(event);
            void contextMenu.show();
        }
    }
    nextId() {
        return this.idInternal++;
    }
    isHostedMenuOpen() {
        return Boolean(this.openHostedMenu);
    }
    getItems() {
        return this.softMenu?.getItems() || [];
    }
    setChecked(item, checked) {
        this.softMenu?.setChecked(item, checked);
    }
    async show() {
        ContextMenu.pendingMenu = this;
        this.event.consume(true);
        const loadedProviders = await Promise.all(this.pendingTargets.map(async (target) => {
            const providers = await loadApplicableRegisteredProviders(target);
            return { target, providers };
        }));
        // After loading all providers, the contextmenu might be hidden again, so bail out.
        if (ContextMenu.pendingMenu !== this) {
            return;
        }
        ContextMenu.pendingMenu = null;
        for (const { target, providers } of loadedProviders) {
            for (const provider of providers) {
                provider.appendApplicableItems(this.event, this, target);
            }
        }
        this.pendingTargets = [];
        this.innerShow();
    }
    discard() {
        if (this.softMenu) {
            this.softMenu.discard();
        }
    }
    registerLoggablesWithin(descriptors, parent) {
        for (const descriptor of descriptors) {
            if (descriptor.jslogContext) {
                if (descriptor.type === 'checkbox') {
                    VisualLogging.registerLoggable(descriptor, `${VisualLogging.toggle().track({ click: true }).context(descriptor.jslogContext)}`, parent || descriptors, new DOMRect(0, 0, MENU_ITEM_WIDTH_FOR_LOGGING, MENU_ITEM_HEIGHT_FOR_LOGGING));
                }
                else if (descriptor.type === 'item') {
                    VisualLogging.registerLoggable(descriptor, `${VisualLogging.action().track({ click: true }).context(descriptor.jslogContext)}`, parent || descriptors, new DOMRect(0, 0, MENU_ITEM_WIDTH_FOR_LOGGING, MENU_ITEM_HEIGHT_FOR_LOGGING));
                }
                else if (descriptor.type === 'subMenu') {
                    VisualLogging.registerLoggable(descriptor, `${VisualLogging.item().context(descriptor.jslogContext)}`, parent || descriptors, new DOMRect(0, 0, MENU_ITEM_WIDTH_FOR_LOGGING, MENU_ITEM_HEIGHT_FOR_LOGGING));
                }
                if (descriptor.subItems) {
                    this.registerLoggablesWithin(descriptor.subItems, descriptor);
                }
            }
        }
    }
    innerShow() {
        if (!this.eventTarget) {
            return;
        }
        const menuObject = this.buildMenuDescriptors();
        const ownerDocument = this.eventTarget.ownerDocument;
        if (this.useSoftMenu || ContextMenu.useSoftMenu ||
            Host.InspectorFrontendHost.InspectorFrontendHostInstance.isHostedMode()) {
            this.softMenu = new SoftContextMenu(menuObject, this.itemSelected.bind(this), this.keepOpen, undefined, this.onSoftMenuClosed, this.loggableParent);
            // let soft context menu focus on the first item when the event is triggered by a non-mouse event
            // add another check of button value to differentiate mouse event with 'shift + f10' keyboard event
            const isMouseEvent = this.event.pointerType === 'mouse' && this.event.button >= 0;
            this.softMenu.setFocusOnTheFirstItem(!isMouseEvent);
            this.softMenu.show((ownerDocument), new AnchorBox(this.x, this.y, 0, 0));
            if (this.contextMenuLabel) {
                this.softMenu.setContextMenuElementLabel(this.contextMenuLabel);
            }
        }
        else {
            Host.InspectorFrontendHost.InspectorFrontendHostInstance.showContextMenuAtPoint(this.x, this.y, menuObject, (ownerDocument));
            function listenToEvents() {
                Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(Host.InspectorFrontendHostAPI.Events.ContextMenuCleared, this.menuCleared, this);
                Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(Host.InspectorFrontendHostAPI.Events.ContextMenuItemSelected, this.onItemSelected, this);
            }
            VisualLogging.registerLoggable(menuObject, `${VisualLogging.menu()}`, this.loggableParent, new DOMRect(0, 0, MENU_ITEM_WIDTH_FOR_LOGGING, MENU_ITEM_HEIGHT_FOR_LOGGING * menuObject.length));
            this.registerLoggablesWithin(menuObject);
            this.openHostedMenu = menuObject;
            // showContextMenuAtPoint call above synchronously issues a clear event for previous context menu (if any),
            // so we skip it before subscribing to the clear event.
            queueMicrotask(listenToEvents.bind(this));
        }
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    setHandler(id, handler) {
        if (handler) {
            this.handlers.set(id, handler);
        }
    }
    invokeHandler(id) {
        const handler = this.handlers.get(id);
        if (handler) {
            handler.call(this);
        }
    }
    buildMenuDescriptors() {
        return super.buildDescriptor().subItems;
    }
    onItemSelected(event) {
        this.itemSelected(event.data);
    }
    itemSelected(id) {
        this.invokeHandler(id);
        if (this.openHostedMenu) {
            const itemWithId = (items, id) => {
                for (const item of items) {
                    if (item.id === id) {
                        return item;
                    }
                    const subitem = item.subItems && itemWithId(item.subItems, id);
                    if (subitem) {
                        return subitem;
                    }
                }
                return null;
            };
            const item = itemWithId(this.openHostedMenu, id);
            if (item?.jslogContext) {
                void VisualLogging.logClick(item, new MouseEvent('click'));
            }
        }
        this.menuCleared();
    }
    menuCleared() {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.removeEventListener(Host.InspectorFrontendHostAPI.Events.ContextMenuCleared, this.menuCleared, this);
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.removeEventListener(Host.InspectorFrontendHostAPI.Events.ContextMenuItemSelected, this.onItemSelected, this);
        if (this.openHostedMenu) {
            void VisualLogging.logResize(this.openHostedMenu, new DOMRect(0, 0, 0, 0));
        }
        this.openHostedMenu = null;
        if (!this.keepOpen) {
            this.onSoftMenuClosed?.();
        }
    }
    /**
     * Appends the `target` to the list of pending targets for which context menu providers
     * will be loaded when showing the context menu. If the `target` was already appended
     * before, it just ignores this call.
     *
     * @param target an object for which we can have registered menu item providers.
     */
    appendApplicableItems(target) {
        if (this.pendingTargets.includes(target)) {
            return;
        }
        this.pendingTargets.push(target);
    }
    markAsMenuItemCheckBox() {
        if (this.softMenu) {
            this.softMenu.markAsMenuItemCheckBox();
        }
    }
    static pendingMenu = null;
    static useSoftMenu = false;
    static groupWeights = [
        'header', 'new', 'reveal', 'edit', 'clipboard', 'debug', 'view', 'default', 'override', 'save', 'annotation',
        'footer'
    ];
}
/* eslint-disable rulesdir/no-lit-render-outside-of-view */
/**
 * @attr soft-menu - Whether to use the soft menu implementation.
 * @attr keep-open - Whether the menu should stay open after an item is clicked.
 * @attr icon-name - Name of the icon to display on the button.
 * @attr disabled - Whether the menu button is disabled
 * @attr jslogContext - The jslog context for the button.
 *
 * @prop {Function} populateMenuCall - Callback function to populate the menu.
 * @prop {Boolean} softMenu - Reflects the `"soft-menu"` attribute.
 * @prop {Boolean} keepOpen -Reflects the `"keep-open"` attribute.
 * @prop {String} iconName - Reflects the `"icon-name"` attribute.
 * @prop {Boolean} disabled - Reflects the `"disabled"` attribute.
 * @prop {String} jslogContext - Reflects the `"jslogContext"` attribute.
 */
export class MenuButton extends HTMLElement {
    static observedAttributes = ['icon-name', 'disabled'];
    #shadow = this.attachShadow({ mode: 'open' });
    #triggerTimeoutId;
    #populateMenuCall;
    /**
     * Sets the callback function used to populate the context menu when the button is clicked.
     * @param {Function} populateCall - A function that takes a `ContextMenu` instance and adds items to it.
     */
    set populateMenuCall(populateCall) {
        this.#populateMenuCall = populateCall;
    }
    /**
     * Reflects the `soft-menu` attribute. If true, uses the `SoftContextMenu` implementation.
     * @default false
     */
    get softMenu() {
        return Boolean(this.getAttribute('soft-menu'));
    }
    set softMenu(softMenu) {
        this.toggleAttribute('soft-menu', softMenu);
    }
    /**
     * Reflects the `keep-open` attribute. If true, the menu stays open after an item click.
     * @default false
     */
    get keepOpen() {
        return Boolean(this.getAttribute('keep-open'));
    }
    set keepOpen(keepOpen) {
        this.toggleAttribute('keep-open', keepOpen);
    }
    /**
     * Reflects the `icon-name` attribute. Sets the icon to display on the button.
     */
    set iconName(iconName) {
        this.setAttribute('icon-name', iconName);
    }
    get iconName() {
        return this.getAttribute('icon-name');
    }
    /**
     * Reflects the `jslogContext` attribute. Sets the visual logging context for the button.
     */
    set jslogContext(jslogContext) {
        this.setAttribute('jslog', VisualLogging.dropDown(jslogContext).track({ click: true }).toString());
    }
    get jslogContext() {
        return this.getAttribute('jslogContext');
    }
    /**
     * Reflects the `disabled` attribute. If true, the button is disabled and cannot be clicked.
     * @default false
     */
    get disabled() {
        return this.hasAttribute('disabled');
    }
    set disabled(disabled) {
        this.toggleAttribute('disabled', disabled);
    }
    /**
     * Creates and shows the `ContextMenu`. It calls the `populateMenuCall`
     * callback to fill the menu with items before displaying it relative to the button.
     * Manages the `aria-expanded` state.
     * @param {Event} event - The event that triggered the menu
     */
    #openMenu(event) {
        this.#triggerTimeoutId = undefined;
        if (!this.#populateMenuCall) {
            return;
        }
        const button = this.#shadow.querySelector('devtools-button');
        const contextMenu = new ContextMenu(event, {
            useSoftMenu: this.softMenu,
            keepOpen: this.keepOpen,
            x: this.getBoundingClientRect().right,
            y: this.getBoundingClientRect().top + this.offsetHeight,
            // Without adding a delay, pointer events will be un-ignored too early, and a single click causes
            // the context menu to be closed and immediately re-opened on Windows (https://crbug.com/339560549).
            onSoftMenuClosed: () => setTimeout(() => button?.removeAttribute('aria-expanded'), 50),
        });
        this.#populateMenuCall(contextMenu);
        button?.setAttribute('aria-expanded', 'true');
        void contextMenu.show();
    }
    /**
     * Handles the click event on the button. It clears any pending trigger timeout
     * and immediately calls the `openMenu` method to show the context menu.
     * @param {Event} event - The click event.
     */
    #triggerContextMenu(event) {
        const triggerTimeout = 50;
        if (!this.#triggerTimeoutId) {
            this.#triggerTimeoutId = window.setTimeout(this.#openMenu.bind(this, event), triggerTimeout);
        }
    }
    attributeChangedCallback(_, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.#render();
        }
    }
    connectedCallback() {
        this.#render();
    }
    #render() {
        if (!this.iconName) {
            throw new Error('<devtools-menu-button> expects an icon.');
        }
        // clang-format off
        render(html `
        <devtools-button .disabled=${this.disabled}
                         .iconName=${this.iconName}
                         .variant=${"icon" /* Buttons.Button.Variant.ICON */}
                         .title=${this.title}
                         aria-haspopup='menu'
                         @click=${this.#triggerContextMenu}>
        </devtools-button>`, this.#shadow, { host: this });
        // clang-format on
    }
}
customElements.define('devtools-menu-button', MenuButton);
const registeredProviders = [];
export function registerProvider(registration) {
    registeredProviders.push(registration);
}
async function loadApplicableRegisteredProviders(target) {
    const providers = [];
    for (const providerRegistration of registeredProviders) {
        if (!Root.Runtime.Runtime.isDescriptorEnabled({ experiment: providerRegistration.experiment, condition: undefined })) {
            continue;
        }
        if (providerRegistration.contextTypes) {
            for (const contextType of providerRegistration.contextTypes()) {
                if (target instanceof contextType) {
                    providers.push(await providerRegistration.loadProvider());
                }
            }
        }
    }
    return providers;
}
const registeredItemsProviders = [];
export function registerItem(registration) {
    registeredItemsProviders.push(registration);
}
export function maybeRemoveItem(registration) {
    const itemIndex = registeredItemsProviders.findIndex(item => item.actionId === registration.actionId && item.location === registration.location);
    if (itemIndex < 0) {
        return false;
    }
    registeredItemsProviders.splice(itemIndex, 1);
    return true;
}
function getRegisteredItems() {
    return registeredItemsProviders;
}
//# sourceMappingURL=ContextMenu.js.map