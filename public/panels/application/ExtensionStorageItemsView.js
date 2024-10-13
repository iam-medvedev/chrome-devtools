// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/*
 * Copyright (C) 2008 Nokia Inc.  All rights reserved.
 * Copyright (C) 2013 Samsung Electronics. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as TextUtils from '../../models/text_utils/text_utils.js';
import * as DataGrid from '../../ui/legacy/components/data_grid/data_grid.js';
import * as SourceFrame from '../../ui/legacy/components/source_frame/source_frame.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import { StorageItemsView } from './StorageItemsView.js';
const UIStrings = {
    /**
     *@description Text in ExtensionStorage Items View of the Application panel
     */
    extensionStorage: 'Extension Storage',
    /**
     *@description Text in ExtensionStorage Items View of the Application panel
     */
    key: 'Key',
    /**
     *@description Text for the value of something
     */
    value: 'Value',
    /**
     *@description Name for the "Extension Storage Items" table that shows the content of the extension Storage.
     */
    extensionStorageItems: 'Extension Storage Items',
    /**
     *@description Text for announcing that the "Extension Storage Items" table was cleared, that is, all
     * entries were deleted.
     */
    extensionStorageItemsCleared: 'Extension Storage Items cleared',
    /**
     *@description Text for announcing a Extension Storage key/value item has been deleted
     */
    extensionStorageItemDeleted: 'The storage item was deleted.',
};
const str_ = i18n.i18n.registerUIStrings('panels/application/ExtensionStorageItemsView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class ExtensionStorageItemsView extends StorageItemsView {
    #extensionStorage;
    #grid;
    extensionStorageItemsDispatcher;
    constructor(extensionStorage) {
        super(i18nString(UIStrings.extensionStorage), 'extensionStoragePanel');
        this.#extensionStorage = extensionStorage;
        this.element.setAttribute('jslog', `${VisualLogging.pane().context('extension-storage-data')}`);
        this.element.classList.add('storage-view', 'table');
        this.extensionStorageItemsDispatcher =
            new Common.ObjectWrapper.ObjectWrapper();
        this.#grid = this.#createGrid();
        this.refreshItems();
    }
    get #isEditable() {
        // The managed storage area is always read only, since it exposes values
        // set by enterprise policy.
        return this.#extensionStorage.storageArea !== "managed" /* Protocol.Extensions.StorageArea.Managed */;
    }
    #createGrid() {
        const columns = [
            { id: 'key', title: i18nString(UIStrings.key), sortable: true, editable: true, longText: true, weight: 50 },
            { id: 'value', title: i18nString(UIStrings.value), sortable: false, editable: true, longText: true, weight: 50 },
        ];
        const grid = new DataGrid.DataGridWithPreview.DataGridWithPreview('extension-storage', this.element, columns, {
            refreshItems: this.refreshItems.bind(this),
            edit: this.#isEditable ? {
                removeItem: async (key) => {
                    await this.#extensionStorage.removeItem(key);
                    this.refreshItems();
                },
                setItem: async (key, value) => {
                    await this.#extensionStorage.setItem(key, value);
                    this.refreshItems();
                },
            } :
                undefined,
            createPreview: this.#createPreview.bind(this),
            setCanDeleteSelected: canSelect => {
                if (!this.#isEditable) {
                    return;
                }
                this.setCanDeleteSelected(canSelect);
            },
        }, {
            title: i18nString(UIStrings.extensionStorageItems),
            itemDeleted: i18nString(UIStrings.extensionStorageItemDeleted),
            itemsCleared: i18nString(UIStrings.extensionStorageItemsCleared),
        });
        grid.showPreview(null, null);
        return grid;
    }
    #createPreview(key, value) {
        const url = 'extension-storage://' + this.#extensionStorage.extensionId + '/' + this.#extensionStorage.storageArea +
            '/preview/' + key;
        const provider = TextUtils.StaticContentProvider.StaticContentProvider.fromString(url, Common.ResourceType.resourceTypes.XHR, value);
        return SourceFrame.PreviewFactory.PreviewFactory.createPreview(provider, 'text/plain');
    }
    setStorage(extensionStorage) {
        this.#extensionStorage = extensionStorage;
        // When changing storage area, recreate the grid. This is needed as
        // DataGridImpl does not currently changing from editable to non-editable
        // after creation.
        this.#grid.detach();
        this.#grid = this.#createGrid();
        this.refreshItems();
    }
    #extensionStorageItemsCleared() {
        if (!this.isShowing()) {
            return;
        }
        this.#grid.clearItems();
    }
    deleteSelectedItem() {
        if (!this.#isEditable) {
            return;
        }
        this.#grid.deleteSelectedItem();
    }
    refreshItems() {
        const filteredItems = (item) => `${item[0]} ${item[1]}`;
        void this.#extensionStorage.getItems().then(items => {
            const itemsArray = Object.entries(items).map(([key, value]) => [key, typeof value === 'string' ? value : JSON.stringify(value)]);
            items && this.#grid.showItems(this.filter(itemsArray, filteredItems));
            this.extensionStorageItemsDispatcher.dispatchEventToListeners("ItemsRefreshed" /* ExtensionStorageItemsDispatcher.Events.ITEMS_REFRESHED */);
        });
    }
    deleteAllItems() {
        if (!this.#isEditable) {
            return;
        }
        this.#extensionStorage.clear().then(() => {
            this.#extensionStorageItemsCleared();
        }, () => {
            throw new Error('Unable to clear storage.');
        });
    }
    getEntriesForTesting() {
        return this.#grid.dataGridForTesting.rootNode().children.filter(node => node.data.key).map(node => node.data);
    }
}
//# sourceMappingURL=ExtensionStorageItemsView.js.map