// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-imperative-dom-api */
/* eslint-disable rulesdir/no-lit-render-outside-of-view */
import * as Host from '../../../core/host/host.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as Persistence from '../../../models/persistence/persistence.js';
import * as TextUtils from '../../../models/text_utils/text_utils.js';
import * as Workspace from '../../../models/workspace/workspace.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as UI from '../../../ui/legacy/legacy.js';
import * as Lit from '../../../ui/lit/lit.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import headersViewStyles from './HeadersView.css.js';
const { html } = Lit;
const UIStrings = {
    /**
     *@description The title of a button that adds a field to input a header in the editor form.
     */
    addHeader: 'Add a header',
    /**
     *@description The title of a button that removes a field to input a header in the editor form.
     */
    removeHeader: 'Remove this header',
    /**
     *@description The title of a button that removes a section for defining header overrides in the editor form.
     */
    removeBlock: 'Remove this \'`ApplyTo`\'-section',
    /**
     *@description Error message for files which cannot not be parsed.
     *@example {.headers} PH1
     */
    errorWhenParsing: 'Error when parsing \'\'{PH1}\'\'.',
    /**
     *@description Explainer for files which cannot be parsed.
     *@example {.headers} PH1
     */
    parsingErrorExplainer: 'This is most likely due to a syntax error in \'\'{PH1}\'\'. Try opening this file in an external editor to fix the error or delete the file and re-create the override.',
    /**
     *@description Button text for a button which adds an additional header override rule.
     */
    addOverrideRule: 'Add override rule',
    /**
     *@description Text which is a hyperlink to more documentation
     */
    learnMore: 'Learn more',
};
const str_ = i18n.i18n.registerUIStrings('panels/sources/components/HeadersView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const DEFAULT_HEADER_VALUE = 'header value';
const getDefaultHeaderName = (i) => `header-name-${i}`;
export class HeadersView extends UI.View.SimpleView {
    #headersViewComponent = new HeadersViewComponent();
    #uiSourceCode;
    constructor(uiSourceCode) {
        super(i18n.i18n.lockedString('HeadersView'));
        this.element.setAttribute('jslog', `${VisualLogging.pane('headers-view')}`);
        this.#uiSourceCode = uiSourceCode;
        this.#uiSourceCode.addEventListener(Workspace.UISourceCode.Events.WorkingCopyChanged, this.#onWorkingCopyChanged, this);
        this.#uiSourceCode.addEventListener(Workspace.UISourceCode.Events.WorkingCopyCommitted, this.#onWorkingCopyCommitted, this);
        this.element.appendChild(this.#headersViewComponent);
        void this.#setInitialData();
    }
    async #setInitialData() {
        const contentDataOrError = await this.#uiSourceCode.requestContentData();
        this.#setComponentData(TextUtils.ContentData.ContentData.textOr(contentDataOrError, ''));
    }
    #setComponentData(content) {
        let parsingError = false;
        let headerOverrides = [];
        content = content || '[]';
        try {
            headerOverrides = JSON.parse(content);
            if (!headerOverrides.every(Persistence.NetworkPersistenceManager.isHeaderOverride)) {
                throw new Error('Type mismatch after parsing');
            }
        }
        catch {
            console.error('Failed to parse', this.#uiSourceCode.url(), 'for locally overriding headers.');
            parsingError = true;
        }
        this.#headersViewComponent.data = {
            headerOverrides,
            uiSourceCode: this.#uiSourceCode,
            parsingError,
        };
    }
    #onWorkingCopyChanged() {
        this.#setComponentData(this.#uiSourceCode.workingCopy());
    }
    #onWorkingCopyCommitted() {
        this.#setComponentData(this.#uiSourceCode.workingCopy());
    }
    getComponent() {
        return this.#headersViewComponent;
    }
    dispose() {
        this.#uiSourceCode.removeEventListener(Workspace.UISourceCode.Events.WorkingCopyChanged, this.#onWorkingCopyChanged, this);
        this.#uiSourceCode.removeEventListener(Workspace.UISourceCode.Events.WorkingCopyCommitted, this.#onWorkingCopyCommitted, this);
    }
}
export class HeadersViewComponent extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #headerOverrides = [];
    #uiSourceCode = null;
    #parsingError = false;
    #focusElement = null;
    #textOnFocusIn = '';
    constructor() {
        super();
        this.#shadow.addEventListener('focusin', this.#onFocusIn.bind(this));
        this.#shadow.addEventListener('focusout', this.#onFocusOut.bind(this));
        this.#shadow.addEventListener('click', this.#onClick.bind(this));
        this.#shadow.addEventListener('input', this.#onInput.bind(this));
        this.#shadow.addEventListener('keydown', this.#onKeyDown.bind(this));
        this.#shadow.addEventListener('paste', this.#onPaste.bind(this));
        this.addEventListener('contextmenu', this.#onContextMenu.bind(this));
    }
    set data(data) {
        this.#headerOverrides = data.headerOverrides;
        this.#uiSourceCode = data.uiSourceCode;
        this.#parsingError = data.parsingError;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    // 'Enter' key should not create a new line in the contenteditable. Focus
    // on the next contenteditable instead.
    #onKeyDown(event) {
        const target = event.target;
        if (!target.matches('.editable')) {
            return;
        }
        const keyboardEvent = event;
        if (target.matches('.header-name') && target.innerText === '' &&
            (keyboardEvent.key === 'Enter' || keyboardEvent.key === 'Tab')) {
            // onFocusOut will remove the header -> blur instead of focusing on next editable
            event.preventDefault();
            target.blur();
        }
        else if (keyboardEvent.key === 'Enter') {
            event.preventDefault();
            target.blur();
            this.#focusNext(target);
        }
        else if (keyboardEvent.key === 'Escape') {
            event.consume();
            target.innerText = this.#textOnFocusIn;
            target.blur();
            this.#onChange(target);
        }
    }
    #focusNext(target) {
        const elements = Array.from(this.#shadow.querySelectorAll('.editable'));
        const idx = elements.indexOf(target);
        if (idx !== -1 && idx + 1 < elements.length) {
            elements[idx + 1].focus();
        }
    }
    #selectAllText(target) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(target);
        selection?.removeAllRanges();
        selection?.addRange(range);
    }
    #onFocusIn(event) {
        const target = event.target;
        if (target.matches('.editable')) {
            this.#selectAllText(target);
            this.#textOnFocusIn = target.innerText;
        }
    }
    #onFocusOut(event) {
        const target = event.target;
        if (target.innerText === '') {
            const rowElement = target.closest('.row');
            const blockIndex = Number(rowElement.dataset.blockIndex);
            const headerIndex = Number(rowElement.dataset.headerIndex);
            if (target.matches('.apply-to')) {
                target.innerText = '*';
                this.#headerOverrides[blockIndex].applyTo = '*';
                this.#onHeadersChanged();
            }
            else if (target.matches('.header-name')) {
                this.#removeHeader(blockIndex, headerIndex);
            }
        }
        // clear selection
        const selection = window.getSelection();
        selection?.removeAllRanges();
        this.#uiSourceCode?.commitWorkingCopy();
    }
    #onContextMenu(event) {
        if (!this.#uiSourceCode) {
            return;
        }
        const contextMenu = new UI.ContextMenu.ContextMenu(event);
        contextMenu.appendApplicableItems(this.#uiSourceCode);
        void contextMenu.show();
    }
    #generateNextHeaderName(headers) {
        const takenNames = new Set(headers.map(header => header.name));
        let idx = 1;
        while (takenNames.has(getDefaultHeaderName(idx))) {
            idx++;
        }
        return getDefaultHeaderName(idx);
    }
    #onClick(event) {
        const target = event.target;
        const rowElement = target.closest('.row');
        const blockIndex = Number(rowElement?.dataset.blockIndex || 0);
        const headerIndex = Number(rowElement?.dataset.headerIndex || 0);
        if (target.matches('.add-header')) {
            this.#headerOverrides[blockIndex].headers.splice(headerIndex + 1, 0, { name: this.#generateNextHeaderName(this.#headerOverrides[blockIndex].headers), value: DEFAULT_HEADER_VALUE });
            this.#focusElement = { blockIndex, headerIndex: headerIndex + 1 };
            this.#onHeadersChanged();
        }
        else if (target.matches('.remove-header')) {
            this.#removeHeader(blockIndex, headerIndex);
        }
        else if (target.matches('.add-block')) {
            this.#headerOverrides.push({ applyTo: '*', headers: [{ name: getDefaultHeaderName(1), value: DEFAULT_HEADER_VALUE }] });
            this.#focusElement = { blockIndex: this.#headerOverrides.length - 1 };
            this.#onHeadersChanged();
        }
        else if (target.matches('.remove-block')) {
            this.#headerOverrides.splice(blockIndex, 1);
            this.#onHeadersChanged();
        }
    }
    #isDeletable(blockIndex, headerIndex) {
        const isOnlyDefaultHeader = headerIndex === 0 && this.#headerOverrides[blockIndex].headers.length === 1 &&
            this.#headerOverrides[blockIndex].headers[headerIndex].name === getDefaultHeaderName(1) &&
            this.#headerOverrides[blockIndex].headers[headerIndex].value === DEFAULT_HEADER_VALUE;
        return !isOnlyDefaultHeader;
    }
    #removeHeader(blockIndex, headerIndex) {
        this.#headerOverrides[blockIndex].headers.splice(headerIndex, 1);
        if (this.#headerOverrides[blockIndex].headers.length === 0) {
            this.#headerOverrides[blockIndex].headers.push({ name: this.#generateNextHeaderName(this.#headerOverrides[blockIndex].headers), value: DEFAULT_HEADER_VALUE });
        }
        this.#onHeadersChanged();
    }
    #onInput(event) {
        this.#onChange(event.target);
    }
    #onChange(target) {
        const rowElement = target.closest('.row');
        const blockIndex = Number(rowElement.dataset.blockIndex);
        const headerIndex = Number(rowElement.dataset.headerIndex);
        if (target.matches('.header-name')) {
            this.#headerOverrides[blockIndex].headers[headerIndex].name = target.innerText;
            this.#onHeadersChanged();
        }
        if (target.matches('.header-value')) {
            this.#headerOverrides[blockIndex].headers[headerIndex].value = target.innerText;
            this.#onHeadersChanged();
        }
        if (target.matches('.apply-to')) {
            this.#headerOverrides[blockIndex].applyTo = target.innerText;
            this.#onHeadersChanged();
        }
    }
    #onHeadersChanged() {
        this.#uiSourceCode?.setWorkingCopy(JSON.stringify(this.#headerOverrides, null, 2));
        Host.userMetrics.actionTaken(Host.UserMetrics.Action.HeaderOverrideHeadersFileEdited);
    }
    #onPaste(event) {
        const clipboardEvent = event;
        event.preventDefault();
        if (clipboardEvent.clipboardData) {
            const text = clipboardEvent.clipboardData.getData('text/plain');
            const range = this.#shadow.getSelection()?.getRangeAt(0);
            if (!range) {
                return;
            }
            range.deleteContents();
            const textNode = document.createTextNode(text);
            range.insertNode(textNode);
            range.selectNodeContents(textNode);
            range.collapse(false);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
            this.#onChange(event.target);
        }
    }
    #render() {
        if (!ComponentHelpers.ScheduledRender.isScheduledRender(this)) {
            throw new Error('HeadersView render was not scheduled');
        }
        if (this.#parsingError) {
            const fileName = this.#uiSourceCode?.name() || '.headers';
            // clang-format off
            Lit.render(html `
        <style>${headersViewStyles}</style>
        <div class="center-wrapper">
          <div class="centered">
            <div class="error-header">${i18nString(UIStrings.errorWhenParsing, { PH1: fileName })}</div>
            <div class="error-body">${i18nString(UIStrings.parsingErrorExplainer, { PH1: fileName })}</div>
          </div>
        </div>
      `, this.#shadow, { host: this });
            // clang-format on
            return;
        }
        // clang-format off
        Lit.render(html `
      <style>${headersViewStyles}</style>
      ${this.#headerOverrides.map((headerOverride, blockIndex) => html `
          ${this.#renderApplyToRow(headerOverride.applyTo, blockIndex)}
          ${headerOverride.headers.map((header, headerIndex) => html `
              ${this.#renderHeaderRow(header, blockIndex, headerIndex)}
            `)}
        `)}
      <devtools-button
          .variant=${"outlined" /* Buttons.Button.Variant.OUTLINED */}
          .jslogContext=${'headers-view.add-override-rule'}
          class="add-block">
        ${i18nString(UIStrings.addOverrideRule)}
      </devtools-button>
      <div class="learn-more-row">
        <x-link
            href="https://goo.gle/devtools-override"
            class="link"
            jslog=${VisualLogging.link('learn-more').track({ click: true })}>${i18nString(UIStrings.learnMore)}</x-link>
      </div>
    `, this.#shadow, { host: this });
        // clang-format on
        if (this.#focusElement) {
            let focusElement = null;
            if (this.#focusElement.headerIndex) {
                focusElement = this.#shadow.querySelector(`[data-block-index="${this.#focusElement.blockIndex}"][data-header-index="${this.#focusElement.headerIndex}"] .header-name`);
            }
            else {
                focusElement = this.#shadow.querySelector(`[data-block-index="${this.#focusElement.blockIndex}"] .apply-to`);
            }
            if (focusElement) {
                focusElement.focus();
            }
            this.#focusElement = null;
        }
    }
    #renderApplyToRow(pattern, blockIndex) {
        // clang-format off
        return html `
      <div class="row" data-block-index=${blockIndex}
           jslog=${VisualLogging.treeItem(pattern === '*' ? pattern : undefined)}>
        <div>${i18n.i18n.lockedString('Apply to')}</div>
        <div class="separator">:</div>
        ${this.#renderEditable(pattern, 'apply-to')}
        <devtools-button
        title=${i18nString(UIStrings.removeBlock)}
        .size=${"SMALL" /* Buttons.Button.Size.SMALL */}
        .iconName=${'bin'}
        .iconWidth=${'14px'}
        .iconHeight=${'14px'}
        .variant=${"icon" /* Buttons.Button.Variant.ICON */}
        .jslogContext=${'headers-view.remove-apply-to-section'}
        class="remove-block inline-button"
      ></devtools-button>
      </div>
    `;
        // clang-format on
    }
    #renderHeaderRow(header, blockIndex, headerIndex) {
        // clang-format off
        return html `
      <div class="row padded" data-block-index=${blockIndex} data-header-index=${headerIndex}
           jslog=${VisualLogging.treeItem(header.name).parent('headers-editor-row-parent')}>
        ${this.#renderEditable(header.name, 'header-name red', true)}
        <div class="separator">:</div>
        ${this.#renderEditable(header.value, 'header-value')}
        <devtools-button
          title=${i18nString(UIStrings.addHeader)}
          .size=${"SMALL" /* Buttons.Button.Size.SMALL */}
          .iconName=${'plus'}
          .variant=${"icon" /* Buttons.Button.Variant.ICON */}
          .jslogContext=${'headers-view.add-header'}
          class="add-header inline-button"
        ></devtools-button>
        <devtools-button
          title=${i18nString(UIStrings.removeHeader)}
          .size=${"SMALL" /* Buttons.Button.Size.SMALL */}
          .iconName=${'bin'}
          .variant=${"icon" /* Buttons.Button.Variant.ICON */}
          ?hidden=${!this.#isDeletable(blockIndex, headerIndex)}
          .jslogContext=${'headers-view.remove-header'}
          class="remove-header inline-button"
        ></devtools-button>
      </div>
    `;
        // clang-format on
    }
    #renderEditable(value, className, isKey) {
        // This uses Lit's `live`-directive, so that when checking whether to
        // update during re-render, `value` is compared against the actual live DOM
        // value of the contenteditable element and not the potentially outdated
        // value from the previous render.
        // clang-format off
        const jslog = isKey ? VisualLogging.key() : VisualLogging.value();
        return html `<span jslog=${jslog.track({ change: true, keydown: 'Enter|Escape|Tab', click: true })}
                              contenteditable="true"
                              class="editable ${className}"
                              tabindex="0"
                              .innerText=${Lit.Directives.live(value)}></span>`;
        // clang-format on
    }
}
VisualLogging.registerParentProvider('headers-editor-row-parent', (e) => {
    while (e.previousElementSibling?.classList?.contains('padded')) {
        e = e.previousElementSibling;
    }
    return e.previousElementSibling || undefined;
});
customElements.define('devtools-sources-headers-view', HeadersViewComponent);
//# sourceMappingURL=HeadersView.js.map