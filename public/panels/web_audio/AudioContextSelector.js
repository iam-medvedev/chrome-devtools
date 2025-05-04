// Copyright 2019 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-imperative-dom-api */
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as UI from '../../ui/legacy/legacy.js';
const UIStrings = {
    /**
     *@description Text that shows there is no recording
     */
    noRecordings: '(no recordings)',
    /**
     *@description Label prefix for an audio context selection
     *@example {realtime (1e03ec)} PH1
     */
    audioContextS: 'Audio context: {PH1}',
};
const str_ = i18n.i18n.registerUIStrings('panels/web_audio/AudioContextSelector.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class AudioContextSelector extends Common.ObjectWrapper.ObjectWrapper {
    placeholderText;
    selectElement;
    items;
    toolbarItemInternal;
    constructor() {
        super();
        this.placeholderText = i18nString(UIStrings.noRecordings);
        this.items = new UI.ListModel.ListModel();
        this.selectElement = document.createElement('select');
        this.toolbarItemInternal = new UI.Toolbar.ToolbarItem(this.selectElement);
        this.toolbarItemInternal.setTitle(i18nString(UIStrings.audioContextS, { PH1: this.placeholderText }));
        this.selectElement.addEventListener('change', this.onSelectionChanged.bind(this));
        this.selectElement.disabled = true;
        this.addPlaceholderOption();
        this.items.addEventListener("ItemsReplaced" /* UI.ListModel.Events.ITEMS_REPLACED */, this.onListItemReplaced, this);
    }
    addPlaceholderOption() {
        const placeholderOption = UI.Fragment.html `
    <option value="" hidden>${this.placeholderText}</option>`;
        this.selectElement.appendChild(placeholderOption);
    }
    onListItemReplaced() {
        this.selectElement.removeChildren();
        if (this.items.length === 0) {
            this.addPlaceholderOption();
            this.selectElement.disabled = true;
            this.onSelectionChanged();
            return;
        }
        for (const context of this.items) {
            const option = UI.Fragment.html `
    <option value=${context.contextId}>${this.titleFor(context)}</option>`;
            this.selectElement.appendChild(option);
        }
        this.selectElement.disabled = false;
        this.onSelectionChanged();
    }
    contextCreated({ data: context }) {
        this.items.insert(this.items.length, context);
        this.onListItemReplaced();
    }
    contextDestroyed({ data: contextId }) {
        const index = this.items.findIndex(context => context.contextId === contextId);
        if (index !== -1) {
            this.items.remove(index);
            this.onListItemReplaced();
        }
    }
    contextChanged({ data: changedContext }) {
        const index = this.items.findIndex(context => context.contextId === changedContext.contextId);
        if (index !== -1) {
            this.items.replace(index, changedContext);
            this.onListItemReplaced();
        }
    }
    selectedContext() {
        const selectedValue = this.selectElement.value;
        if (!selectedValue) {
            return null;
        }
        return this.items.find(context => context.contextId === selectedValue) || null;
    }
    onSelectionChanged() {
        const selectedContext = this.selectedContext();
        if (selectedContext) {
            this.toolbarItemInternal.setTitle(i18nString(UIStrings.audioContextS, { PH1: this.titleFor(selectedContext) }));
        }
        else {
            this.toolbarItemInternal.setTitle(i18nString(UIStrings.audioContextS, { PH1: this.placeholderText }));
        }
        this.dispatchEventToListeners("ContextSelected" /* Events.CONTEXT_SELECTED */, selectedContext);
    }
    itemSelected(item) {
        if (!item) {
            return;
        }
        this.selectElement.value = item.contextId;
        this.onSelectionChanged();
    }
    reset() {
        this.items.replaceAll([]);
        this.onListItemReplaced();
    }
    titleFor(context) {
        return `${context.contextType} (${context.contextId.substr(-6)})`;
    }
    toolbarItem() {
        return this.toolbarItemInternal;
    }
}
//# sourceMappingURL=AudioContextSelector.js.map