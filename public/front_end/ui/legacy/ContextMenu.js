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
import * as VisualLogging from '../visual_logging/visual_logging.js';
import { ActionRegistry } from './ActionRegistry.js';
import { ShortcutRegistry } from './ShortcutRegistry.js';
import { SoftContextMenu } from './SoftContextMenu.js';
import { deepElementFromEvent } from './UIUtils.js';
export class Item {
    typeInternal;
    label;
    disabled;
    checked;
    contextMenu;
    idInternal;
    customElement;
    shortcut;
    #tooltip;
    #jslogContext;
    constructor(contextMenu, type, label, disabled, checked, tooltip, jslogContext) {
        this.typeInternal = type;
        this.label = label;
        this.disabled = disabled;
        this.checked = checked;
        this.contextMenu = contextMenu;
        this.idInternal = undefined;
        this.#tooltip = tooltip;
        if (type === 'item' || type === 'checkbox') {
            this.idInternal = contextMenu ? contextMenu.nextId() : 0;
        }
        this.#jslogContext = jslogContext;
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
                    enabled: !this.disabled,
                    checked: undefined,
                    subItems: undefined,
                    tooltip: this.#tooltip,
                    jslogContext: this.#jslogContext,
                };
                if (this.customElement) {
                    result.element = this.customElement;
                }
                if (this.shortcut) {
                    result.shortcut = this.shortcut;
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
                    enabled: !this.disabled,
                    subItems: undefined,
                    tooltip: this.#tooltip,
                    jslogContext: this.#jslogContext,
                };
                if (this.customElement) {
                    result.element = this.customElement;
                }
                return result;
            }
        }
        throw new Error('Invalid item type:' + this.typeInternal);
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
        const item = new Item(this.contextMenu, 'item', label, options?.disabled, undefined, options?.tooltip, options?.jslogContext);
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
        const item = new Item(this.contextMenu, 'item', undefined, undefined, undefined, undefined, jslogContext);
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
        const result = this.appendItem(label, action.execute.bind(action), { jslogContext: actionId });
        const shortcut = ShortcutRegistry.instance().shortcutTitleForAction(actionId);
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
    appendCheckboxItem(label, handler, checked, disabled, additionalElement, tooltip, jslogContext) {
        const item = new Item(this.contextMenu, 'checkbox', label, disabled, checked, tooltip, jslogContext);
        this.items.push(item);
        if (this.contextMenu) {
            this.contextMenu.setHandler(item.id(), handler);
        }
        if (additionalElement) {
            item.customElement = additionalElement;
        }
        return item;
    }
}
export class SubMenu extends Item {
    sections;
    sectionList;
    constructor(contextMenu, label, disabled, jslogContext) {
        super(contextMenu, 'subMenu', label, disabled, undefined, undefined, jslogContext);
        this.sections = new Map();
        this.sectionList = [];
    }
    init() {
        ContextMenu.groupWeights.forEach(name => this.section(name));
    }
    section(name) {
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
    footerSection() {
        return this.section('footer');
    }
    buildDescriptor() {
        const result = {
            type: 'subMenu',
            label: this.label,
            enabled: !this.disabled,
            subItems: [],
            id: undefined,
            checked: undefined,
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
            if (!itemLocation || !itemLocation.startsWith(location + '/')) {
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
    static uniqueSectionName = 0;
}
export class ContextMenu extends SubMenu {
    contextMenu;
    defaultSectionInternal;
    pendingPromises;
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
    constructor(event, options = {}) {
        super(null);
        const mouseEvent = event;
        this.contextMenu = this;
        super.init();
        this.defaultSectionInternal = this.defaultSection();
        this.pendingPromises = [];
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
        const target = deepElementFromEvent(event);
        if (target) {
            this.appendApplicableItems(target);
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
        const loadedProviders = await Promise.all(this.pendingPromises);
        // After loading all providers, the contextmenu might be hidden again, so bail out.
        if (ContextMenu.pendingMenu !== this) {
            return;
        }
        ContextMenu.pendingMenu = null;
        for (let i = 0; i < loadedProviders.length; ++i) {
            const providers = loadedProviders[i];
            const target = this.pendingTargets[i];
            for (const provider of providers) {
                provider.appendApplicableItems(this.event, this, target);
            }
        }
        this.pendingPromises = [];
        this.pendingTargets = [];
        this.innerShow();
    }
    discard() {
        if (this.softMenu) {
            this.softMenu.discard();
        }
    }
    registerLoggablesWithin(descriptors, parent) {
        const loggables = [];
        for (const descriptor of descriptors) {
            if (descriptor.jslogContext) {
                if (descriptor.type === 'checkbox') {
                    VisualLogging.registerLoggable(descriptor, `${VisualLogging.toggle().track({ click: true }).context(descriptor.jslogContext)}`, parent || descriptors);
                }
                else if (descriptor.type === 'item') {
                    VisualLogging.registerLoggable(descriptor, `${VisualLogging.action().track({ click: true }).context(descriptor.jslogContext)}`, parent || descriptors);
                }
                else if (descriptor.type !== 'subMenu') {
                    VisualLogging.registerLoggable(descriptor, `${VisualLogging.item().context(descriptor.jslogContext)}`, parent || descriptors);
                }
                loggables.push(descriptor);
                if (descriptor.subItems) {
                    loggables.push(...this.registerLoggablesWithin(descriptor.subItems, descriptor));
                }
            }
        }
        return loggables;
    }
    innerShow() {
        const menuObject = this.buildMenuDescriptors();
        if (!this.eventTarget) {
            return;
        }
        const ownerDocument = this.eventTarget.ownerDocument;
        if (this.useSoftMenu || ContextMenu.useSoftMenu ||
            Host.InspectorFrontendHost.InspectorFrontendHostInstance.isHostedMode()) {
            this.softMenu = new SoftContextMenu(menuObject, this.itemSelected.bind(this), this.keepOpen, undefined, this.onSoftMenuClosed);
            // let soft context menu focus on the first item when the event is triggered by a non-mouse event
            // add another check of button value to differentiate mouse event with 'shift + f10' keyboard event
            const isMouseEvent = this.event.pointerType === 'mouse' && this.event.button >= 0;
            this.softMenu.setFocusOnTheFirstItem(!isMouseEvent);
            this.softMenu.show(ownerDocument, new AnchorBox(this.x, this.y, 0, 0));
            if (this.contextMenuLabel) {
                this.softMenu.setContextMenuElementLabel(this.contextMenuLabel);
            }
        }
        else {
            Host.InspectorFrontendHost.InspectorFrontendHostInstance.showContextMenuAtPoint(this.x, this.y, menuObject, ownerDocument);
            function listenToEvents() {
                Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(Host.InspectorFrontendHostAPI.Events.ContextMenuCleared, this.menuCleared, this);
                Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(Host.InspectorFrontendHostAPI.Events.ContextMenuItemSelected, this.onItemSelected, this);
            }
            VisualLogging.registerLoggable(menuObject, `${VisualLogging.menu()}`, null);
            const loggables = this.registerLoggablesWithin(menuObject);
            if (loggables.length) {
                void VisualLogging.logImpressions(loggables);
            }
            this.openHostedMenu = menuObject;
            // showContextMenuAtPoint call above synchronously issues a clear event for previous context menu (if any),
            // so we skip it before subscribing to the clear event.
            queueMicrotask(listenToEvents.bind(this));
        }
    }
    setContextMenuLabel(label) {
        this.contextMenuLabel = label;
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
    buildMenuDescriptors() {
        return super.buildDescriptor().subItems;
    }
    onItemSelected(event) {
        this.itemSelected(event.data);
    }
    itemSelected(id) {
        const handler = this.handlers.get(id);
        if (handler) {
            handler.call(this);
        }
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
            if (item && item.jslogContext) {
                void VisualLogging.logClick(item, new MouseEvent('click'));
            }
        }
        this.menuCleared();
    }
    menuCleared() {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.removeEventListener(Host.InspectorFrontendHostAPI.Events.ContextMenuCleared, this.menuCleared, this);
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.removeEventListener(Host.InspectorFrontendHostAPI.Events.ContextMenuItemSelected, this.onItemSelected, this);
        this.openHostedMenu = null;
        if (!this.keepOpen) {
            this.onSoftMenuClosed?.();
        }
    }
    containsTarget(target) {
        return this.pendingTargets.indexOf(target) >= 0;
    }
    appendApplicableItems(target) {
        this.pendingPromises.push(loadApplicableRegisteredProviders(target));
        this.pendingTargets.push(target);
    }
    markAsMenuItemCheckBox() {
        if (this.softMenu) {
            this.softMenu.markAsMenuItemCheckBox();
        }
    }
    static pendingMenu = null;
    static useSoftMenu = false;
    // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
    // eslint-disable-next-line @typescript-eslint/naming-convention
    static groupWeights = ['header', 'new', 'reveal', 'edit', 'clipboard', 'debug', 'view', 'default', 'override', 'save', 'footer'];
}
const registeredProviders = [];
export function registerProvider(registration) {
    registeredProviders.push(registration);
}
async function loadApplicableRegisteredProviders(target) {
    return Promise.all(registeredProviders.filter(isProviderApplicableToContextTypes).map(registration => registration.loadProvider()));
    function isProviderApplicableToContextTypes(providerRegistration) {
        if (!Root.Runtime.Runtime.isDescriptorEnabled({ experiment: providerRegistration.experiment, condition: undefined })) {
            return false;
        }
        if (!providerRegistration.contextTypes) {
            return true;
        }
        for (const contextType of providerRegistration.contextTypes()) {
            // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
            // @ts-expect-error
            if (target instanceof contextType) {
                return true;
            }
        }
        return false;
    }
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
// TODO(crbug.com/1167717): Make this a const enum again
// eslint-disable-next-line rulesdir/const_enum
export var ItemLocation;
(function (ItemLocation) {
    ItemLocation["DEVICE_MODE_MENU_SAVE"] = "deviceModeMenu/save";
    ItemLocation["MAIN_MENU"] = "mainMenu";
    ItemLocation["MAIN_MENU_DEFAULT"] = "mainMenu/default";
    ItemLocation["MAIN_MENU_FOOTER"] = "mainMenu/footer";
    ItemLocation["MAIN_MENU_HELP_DEFAULT"] = "mainMenuHelp/default";
    ItemLocation["NAVIGATOR_MENU_DEFAULT"] = "navigatorMenu/default";
    ItemLocation["TIMELINE_MENU_OPEN"] = "timelineMenu/open";
})(ItemLocation || (ItemLocation = {}));
//# sourceMappingURL=ContextMenu.js.map