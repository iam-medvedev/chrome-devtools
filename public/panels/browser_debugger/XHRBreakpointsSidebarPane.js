// Copyright 2015 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable @devtools/no-imperative-dom-api */
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as UI from '../../ui/legacy/legacy.js';
import { Directives, html, render } from '../../ui/lit/lit.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import xhrBreakpointsSidebarPaneStyles from './xhrBreakpointsSidebarPane.css.js';
const { classMap, ifDefined, ref } = Directives;
const UIStrings = {
    /**
     * @description Title of the XHR/fetch breakpoints sidebar in the Sources panel.
     */
    xhrfetchBreakpoints: 'XHR/fetch breakpoints',
    /**
     * @description Text to indicate there are no XHR/fetch breakpoints.
     */
    noBreakpoints: 'No breakpoints',
    /**
     * @description Label for a button in the Sources panel that opens the input field to create a new XHR/fetch breakpoint.
     */
    addXhrfetchBreakpoint: 'Add XHR/fetch breakpoint',
    /**
     * @description Context menu item to add an XHR/fetch breakpoint.
     */
    addBreakpoint: 'Add breakpoint',
    /**
     * @description Text preceding the input field to add an XHR/fetch breakpoint in the Sources panel.
     */
    breakWhenUrlContains: 'Break when URL contains:',
    /**
     * @description Accessible label for XHR/fetch breakpoint text input.
     */
    urlBreakpoint: 'URL breakpoint',
    /**
     * @description Label for an XHR/fetch breakpoint targeting a specific URL in the Sources panel.
     * @example {example.com} PH1
     */
    urlContainsS: 'URL contains "{PH1}"',
    /**
     * @description Label for an XHR/fetch breakpoint matching any XHR or fetch request in the Sources panel.
     */
    anyXhrOrFetch: 'Any XHR or fetch',
    /**
     * @description Screen reader description of a hit breakpoint in the Sources panel.
     */
    breakpointHit: 'breakpoint hit',
    /**
     * @description Context menu item to remove all XHR/fetch breakpoints.
     */
    removeAllBreakpoints: 'Remove all breakpoints',
    /**
     * @description Context menu item to remove an XHR/fetch breakpoint.
     */
    removeBreakpoint: 'Remove breakpoint',
};
const str_ = i18n.i18n.registerUIStrings('panels/browser_debugger/XHRBreakpointsSidebarPane.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const containerToBreakpointEntry = new WeakMap();
let xhrBreakpointsSidebarPaneInstance = null;
export class XHRBreakpointsSidebarPane extends UI.Widget.VBox {
    #breakpoints;
    #list;
    #emptyElement;
    #breakpointElements;
    #addButton;
    #hitBreakpoint;
    #editingBreakpoint = null;
    constructor() {
        super({
            jslog: `${VisualLogging.section('source.xhr-breakpoints')}`,
            useShadowDom: true,
        });
        this.registerRequiredCSS(xhrBreakpointsSidebarPaneStyles);
        this.#breakpoints = new UI.ListModel.ListModel();
        this.#list = new UI.ListControl.ListControl(this.#breakpoints, this, UI.ListControl.ListMode.NonViewport);
        this.contentElement.appendChild(this.#list.element);
        this.#list.element.classList.add('breakpoint-list', 'hidden');
        UI.ARIAUtils.markAsList(this.#list.element);
        UI.ARIAUtils.setLabel(this.#list.element, i18nString(UIStrings.xhrfetchBreakpoints));
        this.#emptyElement = this.contentElement.createChild('div', 'gray-info-message');
        this.#emptyElement.textContent = i18nString(UIStrings.noBreakpoints);
        this.#breakpointElements = new Map();
        this.#addButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.addXhrfetchBreakpoint), 'plus', undefined, 'sources.add-xhr-fetch-breakpoint');
        this.#addButton.setSize("SMALL" /* Buttons.Button.Size.SMALL */);
        this.#addButton.addEventListener("Click" /* UI.Toolbar.ToolbarButton.Events.CLICK */, () => {
            void this.addButtonClicked();
        });
        this.#emptyElement.addEventListener('contextmenu', this.emptyElementContextMenu.bind(this), true);
        this.#emptyElement.tabIndex = -1;
        this.restoreBreakpoints();
        this.update();
    }
    static instance() {
        if (!xhrBreakpointsSidebarPaneInstance) {
            xhrBreakpointsSidebarPaneInstance = new XHRBreakpointsSidebarPane();
        }
        return xhrBreakpointsSidebarPaneInstance;
    }
    static removeInstance() {
        xhrBreakpointsSidebarPaneInstance = null;
    }
    toolbarItems() {
        return [this.#addButton];
    }
    emptyElementContextMenu(event) {
        const contextMenu = new UI.ContextMenu.ContextMenu(event);
        contextMenu.defaultSection().appendItem(i18nString(UIStrings.addBreakpoint), this.addButtonClicked.bind(this), { jslogContext: 'sources.add-xhr-fetch-breakpoint' });
        void contextMenu.show();
    }
    async addButtonClicked() {
        await UI.ViewManager.ViewManager.instance().showView('sources.xhr-breakpoints');
        const inputElementContainer = document.createElement('p');
        inputElementContainer.classList.add('breakpoint-condition');
        inputElementContainer.setAttribute('jslog', `${VisualLogging.value('condition').track({ change: true })}`);
        this.addListElement(inputElementContainer, this.#list.element.firstChild);
        const commit = (e) => {
            const newText = e.detail;
            this.removeListElement(inputElementContainer);
            SDK.DOMDebuggerModel.DOMDebuggerManager.instance().addXHRBreakpoint(newText, true);
            this.setBreakpoint(newText);
            this.update();
        };
        const cancel = () => {
            this.removeListElement(inputElementContainer);
            this.update();
        };
        // clang-format off
        /* eslint-disable-next-line @devtools/no-lit-render-outside-of-view */
        render(html `
        ${i18nString(UIStrings.breakWhenUrlContains)}
        <devtools-prompt
            value=""
            render-as-block
            ?editing=${true}
            aria-label=${i18nString(UIStrings.urlBreakpoint)}
            class="breakpoint-condition-input"
            @commit=${commit}
            @cancel=${cancel}>
        </devtools-prompt>
      `, inputElementContainer);
        // clang-format on
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
        }
        else {
            this.#breakpoints.insertWithComparator(breakKeyword, Platform.ArrayUtilities.DEFAULT_COMPARATOR);
        }
        if (!this.#list.selectedItem() || !this.hasFocus()) {
            this.#list.selectItem(this.#breakpoints.at(0));
        }
    }
    createElementForItem(item) {
        const listItemElement = document.createElement('div');
        UI.ARIAUtils.markAsListitem(listItemElement);
        const enabled = SDK.DOMDebuggerModel.DOMDebuggerManager.instance().xhrBreakpoints().get(item) || false;
        const title = item ? i18nString(UIStrings.urlContainsS, { PH1: item }) : i18nString(UIStrings.anyXhrOrFetch);
        const commit = (e) => {
            if (this.#editingBreakpoint !== item) {
                return;
            }
            const newText = e.detail;
            this.#editingBreakpoint = null;
            this.#removeBreakpoint(item);
            this.#addBreakpoint(newText, enabled);
            this.#list.selectItem(newText);
            this.focus();
        };
        const cancel = () => {
            if (this.#editingBreakpoint !== item) {
                return;
            }
            this.#editingBreakpoint = null;
            this.#list.refreshItem(item);
            this.focus();
        };
        // clang-format off
        /* eslint-disable-next-line @devtools/no-lit-render-outside-of-view */
        render(html `
        <div class=${classMap({ 'breakpoint-entry': true, 'breakpoint-hit': item === this.#hitBreakpoint })}
             role="checkbox"
             aria-checked=${enabled ? 'true' : 'false'}
             aria-label=${title}
             aria-description=${ifDefined(item === this.#hitBreakpoint ? i18nString(UIStrings.breakpointHit) : undefined)}
             tabindex=${item === this.#list.selectedItem() ? '0' : '-1'}
             ?autofocus=${item === this.#list.selectedItem()}
             ${ref((el) => {
            if (el instanceof HTMLElement) {
                containerToBreakpointEntry.set(listItemElement, el);
                this.#breakpointElements.set(item, listItemElement);
            }
        })}
             @click=${(event) => {
            if (event.target === event.currentTarget) {
                this.checkboxClicked(item, enabled);
            }
        }}
             @contextmenu=${(e) => this.contextMenu(item, e)}
             @keydown=${(event) => {
            let handled = false;
            if (event.key === ' ') {
                this.checkboxClicked(item, enabled);
                handled = true;
            }
            else if (event.key === 'Enter') {
                this.#startEditing(item);
                handled = true;
            }
            if (handled) {
                event.consume(true);
            }
        }}>
          <devtools-checkbox
              class="cursor-auto"
              aria-hidden="true"
              .checked=${enabled}
              .small=${true}
              .title=${title}
              @click=${(e) => e.stopPropagation()}
              @change=${() => this.checkboxClicked(item, enabled)}
              @dblclick=${() => this.#startEditing(item)}
              tabindex="-1"
              jslog=${VisualLogging.toggle().track({ click: true })}>
            <devtools-prompt
                value=${item}
                render-as-block
                ?editing=${item === this.#editingBreakpoint}
                aria-label=${title}
                class=${classMap({ 'breakpoint-condition-input': item === this.#editingBreakpoint })}
                jslog=${VisualLogging.value('condition').track({ change: true })}
                @commit=${commit}
                @cancel=${cancel}>
              ${title}
            </devtools-prompt>
          </devtools-checkbox>
        </div>
      `, listItemElement);
        // clang-format on
        listItemElement.setAttribute('jslog', `${VisualLogging.item().track({
            click: true,
            dblclick: true,
            resize: true,
            keydown: 'ArrowUp|ArrowDown|PageUp|PageDown|Enter|Space',
        })}`);
        return listItemElement;
    }
    selectedItemChanged(_from, _to, fromElement, toElement) {
        if (fromElement) {
            const breakpointEntryElement = containerToBreakpointEntry.get(fromElement);
            if (!breakpointEntryElement) {
                throw new Error('Expected breakpoint entry to be found for an element');
            }
            breakpointEntryElement.tabIndex = -1;
        }
        if (toElement) {
            const breakpointEntryElement = containerToBreakpointEntry.get(toElement);
            if (!breakpointEntryElement) {
                throw new Error('Expected breakpoint entry to be found for an element');
            }
            const prompt = _to === this.#editingBreakpoint ? toElement.querySelector('devtools-prompt') : null;
            this.setDefaultFocusedElement(prompt || breakpointEntryElement);
            breakpointEntryElement.tabIndex = 0;
            if (this.hasFocus()) {
                if (prompt) {
                    prompt.focus();
                    return;
                }
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
        this.#emptyElement.classList.add('hidden');
        this.#list.element.classList.remove('hidden');
    }
    removeListElement(element) {
        this.#list.element.removeChild(element);
        if (!this.#list.element.firstElementChild) {
            this.#emptyElement.classList.remove('hidden');
            this.#list.element.classList.add('hidden');
        }
    }
    #addBreakpoint(url, enabled = true) {
        SDK.DOMDebuggerModel.DOMDebuggerManager.instance().addXHRBreakpoint(url, enabled);
        this.setBreakpoint(url);
    }
    #removeBreakpoint(url) {
        SDK.DOMDebuggerModel.DOMDebuggerManager.instance().removeXHRBreakpoint(url);
        this.removeBreakpoint(url);
    }
    #removeAllBreakpoints() {
        for (const url of this.#breakpointElements.keys()) {
            this.#removeBreakpoint(url);
        }
        this.update();
    }
    #toggleBreakpoint(url, checked) {
        SDK.DOMDebuggerModel.DOMDebuggerManager.instance().toggleXHRBreakpoint(url, checked);
        this.#list.refreshItem(url);
        this.#list.selectItem(url);
    }
    contextMenu(breakKeyword, event) {
        const contextMenu = new UI.ContextMenu.ContextMenu(event);
        const removeAllTitle = i18nString(UIStrings.removeAllBreakpoints);
        contextMenu.defaultSection().appendItem(i18nString(UIStrings.addBreakpoint), this.addButtonClicked.bind(this), { jslogContext: 'sources.add-xhr-fetch-breakpoint' });
        contextMenu.defaultSection().appendItem(i18nString(UIStrings.removeBreakpoint), this.#removeBreakpoint.bind(this, breakKeyword), { jslogContext: 'sources.remove-xhr-fetch-breakpoint' });
        contextMenu.defaultSection().appendItem(removeAllTitle, this.#removeAllBreakpoints.bind(this), { jslogContext: 'sources.remove-all-xhr-fetch-breakpoints' });
        void contextMenu.show();
    }
    checkboxClicked(breakKeyword, checked) {
        const hadFocus = this.hasFocus();
        this.#toggleBreakpoint(breakKeyword, !checked);
        if (hadFocus) {
            this.focus();
        }
    }
    #startEditing(item) {
        this.#editingBreakpoint = item;
        this.#list.refreshItem(item);
    }
    flavorChanged(_object) {
        this.update();
    }
    update() {
        const isEmpty = this.#breakpoints.length === 0;
        this.#list.element.classList.toggle('hidden', isEmpty);
        this.#emptyElement.classList.toggle('hidden', !isEmpty);
        const details = UI.Context.Context.instance().flavor(SDK.DebuggerModel.DebuggerPausedDetails);
        if (!details || details.reason !== "XHR" /* Protocol.Debugger.PausedEventReason.XHR */) {
            if (this.#hitBreakpoint) {
                const oldHitBreakpoint = this.#hitBreakpoint;
                this.#hitBreakpoint = undefined;
                if (this.#breakpoints.indexOf(oldHitBreakpoint) >= 0) {
                    this.#list.refreshItem(oldHitBreakpoint);
                }
            }
            return;
        }
        const url = details.auxData?.['breakpointURL'];
        this.#hitBreakpoint = url;
        if (this.#breakpoints.indexOf(url) < 0) {
            return;
        }
        this.#list.refreshItem(url);
        void UI.ViewManager.ViewManager.instance().showView('sources.xhr-breakpoints');
    }
    restoreBreakpoints() {
        const breakpoints = SDK.DOMDebuggerModel.DOMDebuggerManager.instance().xhrBreakpoints();
        for (const url of breakpoints.keys()) {
            this.setBreakpoint(url);
        }
    }
}
//# sourceMappingURL=XHRBreakpointsSidebarPane.js.map