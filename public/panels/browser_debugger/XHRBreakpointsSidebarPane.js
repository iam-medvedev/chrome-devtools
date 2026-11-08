// Copyright 2015 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as UI from '../../ui/legacy/legacy.js';
import { Directives, html, nothing, render } from '../../ui/lit/lit.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import xhrBreakpointsSidebarPaneStyles from './xhrBreakpointsSidebarPane.css.js';
const { classMap, ifDefined, repeat } = Directives;
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
// clang-format off
export const DEFAULT_VIEW = (input, _output, target) => {
    const isEmpty = input.breakpoints.length === 0 && !input.isAdding;
    const renderBreakpointItem = (item) => {
        const isEditing = item.isEditing;
        const isHit = item.isHit;
        const commit = (e) => {
            input.onEditCommit(item.url, e.detail);
        };
        const cancel = () => {
            input.onEditCancel(item.url);
        };
        const onKeyDown = (event) => {
            let handled = false;
            if (event.key === ' ') {
                input.onBreakpointCheckboxChange(item.url);
                handled = true;
            }
            else if ((event.key === 'Enter' && !event.isComposing) || event.key === 'F2') {
                input.onStartEditing(item.url);
                handled = true;
            }
            else if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Home' || event.key === 'End') {
                input.onBreakpointNavigate(item.url, event.key);
                handled = true;
            }
            if (handled) {
                event.consume(true);
            }
        };
        return html `
      <div role="listitem"
           jslog=${VisualLogging.item().track({
            click: true,
            dblclick: true,
            resize: true,
            keydown: 'ArrowUp|ArrowDown|PageUp|PageDown|Enter|Space',
        })}>
        <div class=${classMap({ 'breakpoint-entry': true, 'breakpoint-hit': isHit })}
             role="checkbox"
             aria-checked=${item.enabled ? 'true' : 'false'}
             aria-label=${item.title}
             aria-description=${ifDefined(isHit ? i18nString(UIStrings.breakpointHit) : undefined)}
             tabindex=${item.isFocused && !isEditing ? '0' : '-1'}
             ?autofocus=${item.isFocused && !isEditing && !input.isAdding}
             @click=${(event) => {
            if (event.target === event.currentTarget) {
                input.onBreakpointClick(item.url);
            }
        }}
             @contextmenu=${(event) => input.onBreakpointContextMenu(item.url, event)}
             @keydown=${onKeyDown}>
          <devtools-checkbox
              class="cursor-auto"
              aria-hidden="true"
              .checked=${item.enabled}
              .small=${true}
              .title=${item.title}
              @click=${(e) => e.stopPropagation()}
              @change=${() => input.onBreakpointCheckboxChange(item.url)}
              @dblclick=${() => input.onStartEditing(item.url)}
              tabindex="-1"
              jslog=${VisualLogging.toggle().track({ click: true })}>
            <devtools-prompt
                value=${item.url}
                render-as-block
                ?editing=${isEditing}
                ?autofocus=${isEditing}
                aria-label=${item.url ? i18nString(UIStrings.urlBreakpoint) : i18nString(UIStrings.anyXhrOrFetch)}
                class=${classMap({ 'breakpoint-condition-input': isEditing })}
                jslog=${VisualLogging.value('condition').track({ change: true })}
                @commit=${commit}
                @cancel=${cancel}>
              ${item.title}
            </devtools-prompt>
          </devtools-checkbox>
        </div>
      </div>
    `;
    };
    render(html `
      <style>${xhrBreakpointsSidebarPaneStyles}</style>
      <div class="breakpoint-list"
           role="list"
           aria-label=${i18nString(UIStrings.xhrfetchBreakpoints)}
           ?hidden=${isEmpty}>
        ${input.isAdding ? html `
          <p class="breakpoint-condition" jslog=${VisualLogging.value('condition').track({ change: true })}>
            ${i18nString(UIStrings.breakWhenUrlContains)}
            <devtools-prompt
                value=""
                render-as-block
                ?editing=${true}
                ?autofocus=${true}
                aria-label=${i18nString(UIStrings.urlBreakpoint)}
                class="breakpoint-condition-input"
                @commit=${(e) => input.onAddCommit(e.detail)}
                @cancel=${input.onAddCancel}>
            </devtools-prompt>
          </p>
        ` : nothing}
        ${repeat(input.breakpoints, item => item.url, renderBreakpointItem)}
      </div>
      <div class="gray-info-message"
           tabindex="-1"
           ?autofocus=${isEmpty}
           @contextmenu=${input.onEmptyContextMenu}
           ?hidden=${!isEmpty}>
        ${i18nString(UIStrings.noBreakpoints)}
      </div>
    `, target, {
        container: {
            attributes: {
                jslog: `${VisualLogging.section('source.xhr-breakpoints')}`,
            },
        },
    });
};
// clang-format on
let xhrBreakpointsSidebarPaneInstance = null;
export class XHRBreakpointsSidebarPane extends UI.Widget.VBox {
    #breakpoints = [];
    #view;
    #hitBreakpoint;
    #editingBreakpoint = null;
    #focusedBreakpoint = null;
    #isAddingBreakpoint = false;
    constructor(view = DEFAULT_VIEW) {
        super({
            useShadowDom: 'pure',
            delegatesFocus: true,
        });
        this.#view = view;
        this.#restoreBreakpoints();
        this.update();
        this.performUpdate();
    }
    static instance(opts = { forceNew: null }) {
        const { forceNew, view } = opts;
        if (!xhrBreakpointsSidebarPaneInstance || forceNew) {
            xhrBreakpointsSidebarPaneInstance = new XHRBreakpointsSidebarPane(view);
        }
        return xhrBreakpointsSidebarPaneInstance;
    }
    static removeInstance() {
        xhrBreakpointsSidebarPaneInstance = null;
    }
    toolbarItems() {
        // clang-format off
        return html `
      <devtools-button .data=${{
            variant: "toolbar" /* Buttons.Button.Variant.TOOLBAR */,
            iconName: 'plus',
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            title: i18nString(UIStrings.addXhrfetchBreakpoint),
            jslogContext: 'sources.add-xhr-fetch-breakpoint',
        }}
        @click=${() => {
            void this.addButtonClicked();
        }}></devtools-button>
    `;
        // clang-format on
    }
    async addButtonClicked() {
        this.#isAddingBreakpoint = true;
        this.performUpdate();
        await UI.ViewManager.ViewManager.instance().showView('sources.xhr-breakpoints');
    }
    setBreakpoint(breakKeyword, enabled) {
        if (enabled !== undefined) {
            SDK.DOMDebuggerModel.DOMDebuggerManager.instance().addXHRBreakpoint(breakKeyword, enabled);
        }
        if (!this.#breakpoints.includes(breakKeyword)) {
            this.#breakpoints.push(breakKeyword);
            this.#breakpoints.sort(Platform.ArrayUtilities.DEFAULT_COMPARATOR);
        }
        this.#synchronizeFocusedBreakpoint();
        this.performUpdate();
    }
    #restoreBreakpoints() {
        const breakpoints = SDK.DOMDebuggerModel.DOMDebuggerManager.instance().xhrBreakpoints();
        for (const url of breakpoints.keys()) {
            if (!this.#breakpoints.includes(url)) {
                this.#breakpoints.push(url);
            }
        }
        this.#breakpoints.sort(Platform.ArrayUtilities.DEFAULT_COMPARATOR);
        this.#synchronizeFocusedBreakpoint();
    }
    get focusedBreakpoint() {
        return this.#focusedBreakpoint;
    }
    set focusedBreakpoint(url) {
        if (this.#focusedBreakpoint === url) {
            return;
        }
        this.#focusedBreakpoint = url;
        this.#synchronizeFocusedBreakpoint();
        this.requestUpdate();
    }
    #synchronizeFocusedBreakpoint() {
        if (this.#focusedBreakpoint && !this.#breakpoints.includes(this.#focusedBreakpoint)) {
            this.#focusedBreakpoint = null;
        }
        if (!this.#focusedBreakpoint && this.#breakpoints.length > 0) {
            this.#focusedBreakpoint = (this.#hitBreakpoint && this.#breakpoints.includes(this.#hitBreakpoint)) ?
                this.#hitBreakpoint :
                this.#breakpoints[0];
        }
    }
    #addBreakpoint(url, enabled = true) {
        SDK.DOMDebuggerModel.DOMDebuggerManager.instance().addXHRBreakpoint(url, enabled);
        this.setBreakpoint(url);
    }
    #removeBreakpoint(url) {
        SDK.DOMDebuggerModel.DOMDebuggerManager.instance().removeXHRBreakpoint(url);
        const index = this.#breakpoints.indexOf(url);
        if (index >= 0) {
            this.#breakpoints.splice(index, 1);
        }
        this.#synchronizeFocusedBreakpoint();
        this.performUpdate();
    }
    #removeAllBreakpoints() {
        for (const url of [...this.#breakpoints]) {
            this.#removeBreakpoint(url);
        }
    }
    #toggleBreakpoint(url) {
        const hadFocus = this.hasFocus();
        const current = SDK.DOMDebuggerModel.DOMDebuggerManager.instance().xhrBreakpoints().get(url) ?? false;
        SDK.DOMDebuggerModel.DOMDebuggerManager.instance().toggleXHRBreakpoint(url, !current);
        this.#focusedBreakpoint = url;
        this.performUpdate();
        if (hadFocus) {
            this.focus();
        }
    }
    #startEditing(url) {
        this.#editingBreakpoint = url;
        this.#focusedBreakpoint = url;
        this.performUpdate();
    }
    #onBreakpointNavigate(url, direction) {
        const index = this.#breakpoints.indexOf(url);
        let newIndex = index;
        if (direction === 'ArrowUp') {
            newIndex = Math.max(0, index - 1);
        }
        else if (direction === 'ArrowDown') {
            newIndex = Math.min(this.#breakpoints.length - 1, index + 1);
        }
        else if (direction === 'Home') {
            newIndex = 0;
        }
        else if (direction === 'End') {
            newIndex = this.#breakpoints.length - 1;
        }
        if (newIndex >= 0 && newIndex < this.#breakpoints.length) {
            this.focusedBreakpoint = this.#breakpoints[newIndex];
            void this.updateComplete.then(() => {
                const entry = this.contentElement.querySelectorAll('.breakpoint-entry')[newIndex];
                entry?.focus();
                entry?.scrollIntoView({ block: 'nearest' });
            });
        }
    }
    #onBreakpointContextMenu(url, event) {
        this.#focusedBreakpoint = url;
        const contextMenu = new UI.ContextMenu.ContextMenu(event);
        const removeAllTitle = i18nString(UIStrings.removeAllBreakpoints);
        contextMenu.defaultSection().appendItem(i18nString(UIStrings.addBreakpoint), () => {
            void this.addButtonClicked();
        }, { jslogContext: 'sources.add-xhr-fetch-breakpoint' });
        contextMenu.defaultSection().appendItem(i18nString(UIStrings.removeBreakpoint), () => {
            this.#removeBreakpoint(url);
        }, { jslogContext: 'sources.remove-xhr-fetch-breakpoint' });
        contextMenu.defaultSection().appendItem(removeAllTitle, () => {
            this.#removeAllBreakpoints();
        }, { jslogContext: 'sources.remove-all-xhr-fetch-breakpoints' });
        void contextMenu.show();
    }
    #onEmptyContextMenu(event) {
        const contextMenu = new UI.ContextMenu.ContextMenu(event);
        contextMenu.defaultSection().appendItem(i18nString(UIStrings.addBreakpoint), () => {
            void this.addButtonClicked();
        }, { jslogContext: 'sources.add-xhr-fetch-breakpoint' });
        void contextMenu.show();
    }
    flavorChanged(_object) {
        this.update();
    }
    wasShown() {
        super.wasShown();
        this.update();
        this.performUpdate();
    }
    update() {
        const details = UI.Context.Context.instance().flavor(SDK.DebuggerModel.DebuggerPausedDetails);
        if (!details || details.reason !== "XHR" /* Protocol.Debugger.PausedEventReason.XHR */) {
            if (this.#hitBreakpoint) {
                this.#hitBreakpoint = undefined;
                this.performUpdate();
            }
            return;
        }
        const url = details.auxData?.['breakpointURL'];
        this.#hitBreakpoint = url;
        if (this.#breakpoints.includes(url)) {
            void UI.ViewManager.ViewManager.instance().showView('sources.xhr-breakpoints');
        }
        this.performUpdate();
    }
    performUpdate() {
        this.#synchronizeFocusedBreakpoint();
        const xhrBreakpoints = SDK.DOMDebuggerModel.DOMDebuggerManager.instance().xhrBreakpoints();
        const breakpointItems = this.#breakpoints.map(url => {
            const enabled = xhrBreakpoints.get(url) ?? false;
            const title = url ? i18nString(UIStrings.urlContainsS, { PH1: url }) : i18nString(UIStrings.anyXhrOrFetch);
            return {
                url,
                enabled,
                title,
                isHit: url === this.#hitBreakpoint,
                isFocused: url === this.#focusedBreakpoint,
                isEditing: url === this.#editingBreakpoint,
            };
        });
        const viewInput = {
            isAdding: this.#isAddingBreakpoint,
            breakpoints: breakpointItems,
            onAddCommit: (newUrl) => {
                this.#isAddingBreakpoint = false;
                this.#addBreakpoint(newUrl, true);
                this.focusedBreakpoint = newUrl;
                this.performUpdate();
            },
            onAddCancel: () => {
                this.#isAddingBreakpoint = false;
                this.performUpdate();
            },
            onBreakpointClick: (url) => {
                this.focusedBreakpoint = url;
                this.#toggleBreakpoint(url);
            },
            onBreakpointCheckboxChange: (url) => {
                this.#toggleBreakpoint(url);
            },
            onBreakpointContextMenu: (url, event) => {
                this.#onBreakpointContextMenu(url, event);
            },
            onBreakpointNavigate: (url, direction) => {
                this.#onBreakpointNavigate(url, direction);
            },
            onStartEditing: (url) => {
                this.#startEditing(url);
            },
            onEditCommit: (oldUrl, newUrl) => {
                this.#editingBreakpoint = null;
                const enabled = SDK.DOMDebuggerModel.DOMDebuggerManager.instance().xhrBreakpoints().get(oldUrl) ?? true;
                this.#removeBreakpoint(oldUrl);
                this.#addBreakpoint(newUrl, enabled);
                this.#focusedBreakpoint = newUrl;
                this.performUpdate();
                this.focus();
            },
            onEditCancel: (_url) => {
                this.#editingBreakpoint = null;
                this.performUpdate();
                this.focus();
            },
            onEmptyContextMenu: (event) => {
                this.#onEmptyContextMenu(event);
            },
        };
        this.#view(viewInput, undefined, this.contentElement);
    }
}
//# sourceMappingURL=XHRBreakpointsSidebarPane.js.map