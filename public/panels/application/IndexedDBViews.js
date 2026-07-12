// Copyright 2012 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable @devtools/no-imperative-dom-api */
import '../../ui/components/report_view/report_view.js';
import '../../ui/legacy/legacy.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as DataGrid from '../../ui/legacy/components/data_grid/data_grid.js';
import * as ObjectUI from '../../ui/legacy/components/object_ui/object_ui.js';
import * as UI from '../../ui/legacy/legacy.js';
import { html, nothing, render } from '../../ui/lit/lit.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import * as ApplicationComponents from './components/components.js';
import indexedDBViewsStyles from './indexedDBViews.css.js';
const UIStrings = {
    /**
     * @description Text in Indexed DBViews of the Application panel
     */
    version: 'Version',
    /**
     * @description Text in Indexed DBViews of the Application panel
     */
    objectStores: 'Object stores',
    /**
     * @description Text of button in Indexed DBViews of the Application panel
     */
    deleteDatabase: 'Delete database',
    /**
     * @description Text of button in Indexed DBViews of the Application panel
     */
    refreshDatabase: 'Refresh database',
    /**
     * @description Text in Application panel IndexedDB delete confirmation dialog
     * @example {msb} PH1
     */
    confirmDeleteDatabase: 'Delete "{PH1}" database?',
    /**
     * @description Explanation text in Application panel IndexedDB delete confirmation dialog
     */
    databaseWillBeRemoved: 'The selected database and contained data will be removed.',
    /**
     * @description Title of the confirmation dialog in the IndexedDB tab of the Application panel
     *              that the user is about to clear an object store and this cannot be undone.
     * @example {table1} PH1
     */
    confirmClearObjectStore: 'Clear "{PH1}" object store?',
    /**
     * @description Description in the confirmation dialog in the IndexedDB tab of the Application
     *              panel that the user is about to clear an object store and this cannot be undone.
     */
    objectStoreWillBeCleared: 'The data contained in the selected object store will be removed.',
    /**
     * @description Text in Indexed DBViews of the Application panel
     */
    idb: 'IDB',
    /**
     * @description Text to refresh the page
     */
    refresh: 'Refresh',
    /**
     * @description Tooltip text that appears when hovering over the delete button in the Indexed DBViews of the Application panel
     */
    deleteSelected: 'Delete selected',
    /**
     * @description Tooltip text that appears when hovering over the clear button in the Indexed DBViews of the Application panel
     */
    clearObjectStore: 'Clear object store',
    /**
     * @description Text in Indexed DBViews of the Application panel
     */
    dataMayBeStale: 'Data may be stale',
    /**
     * @description Title of needs refresh in indexed dbviews of the application panel
     */
    someEntriesMayHaveBeenModified: 'Some entries may have been modified',
    /**
     * @description Text in DOMStorage Items View of the Application panel
     */
    keyString: 'Key',
    /**
     * @description Text in Indexed DBViews of the Application panel
     */
    primaryKey: 'Primary key',
    /**
     * @description Text for the value of something
     */
    valueString: 'Value',
    /**
     * @description Data grid name for Indexed DB data grids
     */
    indexedDb: 'Indexed DB',
    /**
     * @description Text in Indexed DBViews of the Application panel
     */
    keyPath: 'Key path: ',
    /**
     * @description Tooltip text that appears when hovering over the triangle left button in the Indexed DBViews of the Application panel
     */
    showPreviousPage: 'Show previous page',
    /**
     * @description Tooltip text that appears when hovering over the triangle right button in the Indexed DBViews of the Application panel
     */
    showNextPage: 'Show next page',
    /**
     * @description Text in Indexed DBViews of the Application panel
     */
    filterByKey: 'Filter by key (show keys greater or equal to)',
    /**
     * @description Text in Context menu for expanding objects in IndexedDB tables
     */
    expandRecursively: 'Expand Recursively',
    /**
     * @description Text in Context menu for collapsing objects in IndexedDB tables
     */
    collapse: 'Collapse',
    /**
     * @description Span text content in Indexed DBViews of the Application panel
     * @example {2} PH1
     */
    totalEntriesS: 'Total entries: {PH1}',
    /**
     * @description Text in Indexed DBViews of the Application panel
     * @example {2} PH1
     */
    keyGeneratorValueS: 'Key generator value: {PH1}',
};
const str_ = i18n.i18n.registerUIStrings('panels/application/IndexedDBViews.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class IDBDatabaseView extends ApplicationComponents.StorageMetadataView.StorageMetadataView {
    model;
    database;
    constructor(model, database) {
        super();
        this.model = model;
        this.setShowOnlyBucket(true);
        if (database) {
            this.update(database);
        }
    }
    getTitle() {
        return this.database?.databaseId.name;
    }
    async renderReportContent() {
        if (!this.database) {
            return nothing;
        }
        return html `
      ${await super.renderReportContent()}
      ${this.key(i18nString(UIStrings.version))}
      ${this.value(this.database.version.toString())}
      ${this.key(i18nString(UIStrings.objectStores))}
      ${this.value(this.database.objectStores.size.toString())}
      <devtools-report-divider></devtools-report-divider>
      <devtools-report-section>
      <devtools-button
          aria-label=${i18nString(UIStrings.deleteDatabase)}
          .variant=${"outlined" /* Buttons.Button.Variant.OUTLINED */}
          @click=${this.deleteDatabase}
          jslog=${VisualLogging.action('delete-database').track({
            click: true,
        })}>
        ${i18nString(UIStrings.deleteDatabase)}
      </devtools-button>&nbsp;
      <devtools-button
          aria-label=${i18nString(UIStrings.refreshDatabase)}
          .variant=${"outlined" /* Buttons.Button.Variant.OUTLINED */}
          @click=${this.refreshDatabaseButtonClicked}
          jslog=${VisualLogging.action('refresh-database').track({
            click: true,
        })}>
        ${i18nString(UIStrings.refreshDatabase)}
      </devtools-button>
      </devtools-report-section>
      `;
    }
    refreshDatabaseButtonClicked() {
        this.model.refreshDatabase(this.database.databaseId);
    }
    update(database) {
        this.database = database;
        const bucketInfo = this.model.target()
            .model(SDK.StorageBucketsModel.StorageBucketsModel)
            ?.getBucketByName(database.databaseId.storageBucket.storageKey, database.databaseId.storageBucket.name);
        if (bucketInfo) {
            this.setStorageBucket(bucketInfo);
        }
        else {
            this.setStorageKey(database.databaseId.storageBucket.storageKey);
        }
        void this.render().then(() => this.updatedForTests());
    }
    updatedForTests() {
        // Sniffed in tests.
    }
    async deleteDatabase() {
        const ok = await UI.UIUtils.ConfirmDialog.show(i18nString(UIStrings.databaseWillBeRemoved), i18nString(UIStrings.confirmDeleteDatabase, { PH1: this.database.databaseId.name }), this, { jslogContext: 'delete-database-confirmation' });
        if (ok) {
            void this.model.deleteDatabase(this.database.databaseId);
        }
    }
    wasShown() {
        super.wasShown();
    }
}
customElements.define('devtools-idb-database-view', IDBDatabaseView);
export class IDBDataView extends UI.View.SimpleView {
    model;
    databaseId;
    isIndex;
    refreshObjectStoreCallback;
    clearingObjectStore;
    pageSize;
    skipCount;
    // Used in Web Tests
    entries;
    #hasMore = false;
    #selectedRowNumber = -1;
    #needsRefreshVisible = false;
    #clearButtonEnabled = true;
    #metadata = null;
    #lastRenderedEntries = null;
    #keyFilter = '';
    objectStore;
    index;
    dataGrid;
    lastPageSize;
    lastSkipCount;
    // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lastKey;
    constructor(model, databaseId, objectStore, index, refreshObjectStoreCallback) {
        super({
            title: i18nString(UIStrings.idb),
            viewId: 'idb',
            jslog: `${VisualLogging.pane('indexed-db-data-view')}`,
        });
        this.registerRequiredCSS(indexedDBViewsStyles);
        this.registerRequiredCSS(DataGrid.dataGridStyles);
        this.model = model;
        this.databaseId = databaseId;
        this.isIndex = Boolean(index);
        this.refreshObjectStoreCallback = refreshObjectStoreCallback;
        this.element.classList.add('indexed-db-data-view', 'storage-view');
        this.clearingObjectStore = false;
        this.pageSize = 50;
        this.skipCount = 0;
        this.entries = [];
        this.update(objectStore, index);
    }
    createDataGrid() {
        const keyPath = this.isIndex && this.index ? this.index.keyPath : this.objectStore.keyPath;
        const columns = [];
        columns.push({
            id: 'number',
            title: '#',
            sortable: false,
            width: '50px',
        });
        columns.push({
            id: 'key',
            titleDOMFragment: this.keyColumnHeaderFragment(i18nString(UIStrings.keyString), keyPath),
            sortable: false,
        });
        if (this.isIndex) {
            columns.push({
                id: 'primary-key',
                titleDOMFragment: this.keyColumnHeaderFragment(i18nString(UIStrings.primaryKey), this.objectStore.keyPath),
                sortable: false,
            });
        }
        const title = i18nString(UIStrings.valueString);
        columns.push({
            id: 'value',
            title,
            sortable: false,
        });
        const dataGrid = new DataGrid.DataGrid.DataGridImpl({
            displayName: i18nString(UIStrings.indexedDb),
            columns,
            deleteCallback: this.deleteButtonClicked.bind(this),
            refreshCallback: this.updateData.bind(this, true),
        });
        dataGrid.setStriped(true);
        dataGrid.addEventListener("SelectedNode" /* DataGrid.DataGrid.Events.SELECTED_NODE */, event => {
            const node = event.data;
            this.#selectedRowNumber = node.data['number'];
            this.performUpdate();
        }, this);
        dataGrid.addEventListener("DeselectedNode" /* DataGrid.DataGrid.Events.DESELECTED_NODE */, () => {
            this.#selectedRowNumber = -1;
            this.performUpdate();
        }, this);
        return dataGrid;
    }
    keyColumnHeaderFragment(prefix, keyPath) {
        const keyColumnHeaderFragment = document.createDocumentFragment();
        // eslint-disable-next-line @devtools/no-lit-render-outside-of-view
        render(this.renderKeyColumnHeader(prefix, keyPath), keyColumnHeaderFragment);
        return keyColumnHeaderFragment;
    }
    renderKeyColumnHeader(prefix, keyPath) {
        if (keyPath === undefined || keyPath === null || keyPath === '') {
            return html `${prefix}`;
        }
        return html `
      ${prefix} (${i18nString(UIStrings.keyPath)}${Array.isArray(keyPath) ?
            html `[${keyPath.map((path, i) => html `${i > 0 ? ', ' : ''}${this.renderKeyPathString(path)}`)}]` :
            this.renderKeyPathString(keyPath)})`;
    }
    renderKeyPathString(keyPathString) {
        return html `"<span class="source-code indexed-db-key-path">${keyPathString}</span>"`;
    }
    renderToolbar() {
        // clang-format off
        return html `
      <devtools-toolbar class="data-view-toolbar" jslog=${VisualLogging.toolbar()}>
        <devtools-button
          class="toolbar-button"
          .iconName=${'refresh'}
          .title=${i18nString(UIStrings.refresh)}
          jslog=${VisualLogging.action('refresh').track({ click: true })}
          @click=${() => this.refreshButtonClicked()}
          .variant=${"toolbar" /* Buttons.Button.Variant.TOOLBAR */}
        ></devtools-button>
        <devtools-button
          class="toolbar-button"
          .iconName=${'clear'}
          .title=${i18nString(UIStrings.clearObjectStore)}
          jslog=${VisualLogging.action('clear-all').track({ click: true })}
          @click=${() => this.clearButtonClicked()}
          .disabled=${this.isIndex || !this.#clearButtonEnabled}
          .variant=${"toolbar" /* Buttons.Button.Variant.TOOLBAR */}>
        </devtools-button>
        <devtools-button
          class="toolbar-button"
          .iconName=${'bin'}
          .title=${i18nString(UIStrings.deleteSelected)}
          jslog=${VisualLogging.action('delete-selected').track({ click: true })}
          @click=${() => this.deleteButtonClicked(null)}
          .disabled=${!this.dataGrid || this.dataGrid.rootNode().children.length === 0 || this.#selectedRowNumber === -1}
          .variant=${"toolbar" /* Buttons.Button.Variant.TOOLBAR */}>
        </devtools-button>

        <div class="toolbar-divider"></div>

        <devtools-button
          class="toolbar-button"
          .iconName=${'triangle-left'}
          .title=${i18nString(UIStrings.showPreviousPage)}
          .disabled=${this.skipCount <= 0}
          @click=${() => this.pageBackButtonClicked()}
          .variant=${"toolbar" /* Buttons.Button.Variant.TOOLBAR */}>
        </devtools-button>
        <devtools-button
          class="toolbar-button"
          .iconName=${'triangle-right'}
          .title=${i18nString(UIStrings.showNextPage)}
          .disabled=${!this.#hasMore}
          @click=${() => this.pageForwardButtonClicked()}
          .variant=${"toolbar" /* Buttons.Button.Variant.TOOLBAR */}>
        </devtools-button>

        <devtools-toolbar-input
          type="filter"
          placeholder=${i18nString(UIStrings.filterByKey)}
          class="key-filter-input"
          .value=${this.#keyFilter}
          @change=${(e) => {
            this.#keyFilter = e.detail;
            this.updateData(false);
        }}>
        </devtools-toolbar-input>

        ${this.#needsRefreshVisible ? html `
          <div class="toolbar-divider"></div>
          <div class="toolbar-item stale-data-warning" title=${i18nString(UIStrings
            .someEntriesMayHaveBeenModified)}>
            <devtools-icon name="warning" class="warning-icon"></devtools-icon>
            <span>${i18nString(UIStrings.dataMayBeStale)}</span>
          </div>
        ` : nothing}
      </devtools-toolbar>`;
        // clang-format on
    }
    pageBackButtonClicked() {
        this.skipCount = Math.max(0, this.skipCount - this.pageSize);
        this.updateData(false);
    }
    pageForwardButtonClicked() {
        this.skipCount = this.skipCount + this.pageSize;
        this.updateData(false);
    }
    populateContextMenu(contextMenu, gridNode) {
        const node = gridNode;
        const value = node.data['value'];
        if (value && value.hasChildren) {
            const cell = node.element().querySelector('.value-column');
            if (cell) {
                const widgetElement = cell.firstElementChild;
                if (widgetElement) {
                    const widget = UI.Widget.Widget.get(widgetElement);
                    if (widget instanceof ObjectPropertiesSectionWidget) {
                        const objectUi = widget.objectPropertiesSection;
                        if (objectUi) {
                            contextMenu.revealSection().appendItem(i18nString(UIStrings.expandRecursively), () => {
                                void objectUi.objectTreeElement().expandRecursively();
                            }, { jslogContext: 'expand-recursively' });
                            contextMenu.revealSection().appendItem(i18nString(UIStrings.collapse), () => {
                                objectUi.objectTreeElement().collapse();
                            }, { jslogContext: 'collapse' });
                        }
                    }
                }
            }
        }
    }
    refreshData() {
        this.updateData(true);
    }
    update(objectStore = null, index = null) {
        if (!objectStore) {
            return;
        }
        this.objectStore = objectStore;
        this.index = index;
        if (this.dataGrid) {
            this.dataGrid.asWidget().detach();
        }
        this.dataGrid = this.createDataGrid();
        this.dataGrid.setRowContextMenuCallback(this.populateContextMenu.bind(this));
        this.skipCount = 0;
        this.updateData(true);
        this.performUpdate();
    }
    // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parseKey(keyString) {
        let result;
        try {
            result = JSON.parse(keyString);
        }
        catch {
            result = keyString;
        }
        return result;
    }
    updateData(force) {
        const key = this.parseKey(this.#keyFilter);
        const pageSize = this.pageSize;
        let skipCount = this.skipCount;
        const selected = this.#selectedRowNumber !== -1 ? this.#selectedRowNumber : 0;
        this.#selectedRowNumber = Math.max(selected, this.skipCount); // Page forward should select top entry
        if (!force && this.lastKey === key && this.lastPageSize === pageSize && this.lastSkipCount === skipCount) {
            return;
        }
        if (this.lastKey !== key || this.lastPageSize !== pageSize) {
            skipCount = 0;
            this.skipCount = 0;
        }
        this.lastKey = key;
        this.lastPageSize = pageSize;
        this.lastSkipCount = skipCount;
        function callback(entries, hasMore) {
            this.entries = entries;
            this.#hasMore = hasMore;
            this.#needsRefreshVisible = false;
            this.performUpdate();
            this.updatedDataForTests();
        }
        const idbKeyRange = key ? window.IDBKeyRange.lowerBound(key) : null;
        if (this.isIndex && this.index) {
            this.model.loadIndexData(this.databaseId, this.objectStore.name, this.index.name, idbKeyRange, skipCount, pageSize, callback.bind(this));
        }
        else {
            this.model.loadObjectStoreData(this.databaseId, this.objectStore.name, idbKeyRange, skipCount, pageSize, callback.bind(this));
        }
        void this.model.getMetadata(this.databaseId, this.objectStore).then(metadata => {
            this.#metadata = metadata;
            this.performUpdate();
        });
    }
    populateDataGrid() {
        if (this.entries === this.#lastRenderedEntries) {
            return;
        }
        this.dataGrid.rootNode().removeChildren();
        let selectedNode = null;
        for (let i = 0; i < this.entries.length; ++i) {
            // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = {};
            data['number'] = i + this.skipCount;
            data['key'] = this.entries[i].key;
            data['primary-key'] = this.entries[i].primaryKey;
            data['value'] = this.entries[i].value;
            const node = new IDBDataGridNode(data);
            this.dataGrid.rootNode().appendChild(node);
            if (data['number'] <= this.#selectedRowNumber) {
                selectedNode = node;
            }
        }
        this.#lastRenderedEntries = this.entries;
        if (selectedNode) {
            selectedNode.select();
        }
        else {
            this.#selectedRowNumber = -1;
        }
    }
    renderSummaryBar() {
        const metadata = this.#metadata;
        if (!metadata) {
            return nothing;
        }
        // clang-format off
        return html `
      <div class="object-store-summary-bar">
        <span>${i18nString(UIStrings.totalEntriesS, { PH1: String(metadata.entriesCount) })}</span>
        ${this.objectStore.autoIncrement ? html `
          <span class="separator">\u2758</span>
          <span>${i18nString(UIStrings.keyGeneratorValueS, { PH1: String(metadata.keyGeneratorValue) })}</span>`
            : nothing}
      </div>`;
        // clang-format on
    }
    updatedDataForTests() {
        // Sniffed in tests.
    }
    refreshButtonClicked() {
        this.updateData(true);
    }
    async clearButtonClicked() {
        const ok = await UI.UIUtils.ConfirmDialog.show(i18nString(UIStrings.objectStoreWillBeCleared), i18nString(UIStrings.confirmClearObjectStore, { PH1: this.objectStore.name }), this.element, { jslogContext: 'clear-object-store-confirmation' });
        if (ok) {
            this.#clearButtonEnabled = false;
            this.performUpdate();
            this.clearingObjectStore = true;
            await this.model.clearObjectStore(this.databaseId, this.objectStore.name);
            this.clearingObjectStore = false;
            this.#clearButtonEnabled = true;
            this.performUpdate();
            this.updateData(true);
        }
    }
    markNeedsRefresh() {
        // We expect that calling clearObjectStore() will cause the backend to send us an update.
        if (this.clearingObjectStore) {
            return;
        }
        this.#needsRefreshVisible = true;
        this.performUpdate();
    }
    async resolveArrayKey(key) {
        const { properties } = await key.getOwnProperties(false /* generatePreview */);
        if (!properties) {
            return [];
        }
        const result = [];
        const propertyPromises = properties.filter(property => !isNaN(Number(property.name))).map(async (property) => {
            const value = property.value;
            if (!value) {
                return;
            }
            let propertyValue;
            if (value.subtype === 'array') {
                propertyValue = await this.resolveArrayKey(value);
            }
            else {
                propertyValue = value.value;
            }
            result[Number(property.name)] = propertyValue;
        });
        await Promise.all(propertyPromises);
        return result;
    }
    async deleteButtonClicked(node) {
        if (!node) {
            node = this.dataGrid.selectedNode;
            if (!node) {
                return;
            }
        }
        const key = (this.isIndex ? node.data['primary-key'] : node.data.key);
        const keyValue = key.subtype === 'array' ? await this.resolveArrayKey(key) : key.value;
        await this.model.deleteEntries(this.databaseId, this.objectStore.name, window.IDBKeyRange.only(keyValue));
        this.refreshObjectStoreCallback();
    }
    clear() {
        this.entries = [];
        this.performUpdate();
    }
    performUpdate() {
        this.populateDataGrid();
        // clang-format off
        // eslint-disable-next-line @devtools/no-lit-render-outside-of-view
        render(html `
      ${this.renderToolbar()}
      <div class="data-grid-container">
        ${this.dataGrid ? this.dataGrid.element : nothing}
      </div>
      ${this.renderSummaryBar()}
    `, this.element);
        // clang-format on
    }
    wasShown() {
        super.wasShown();
        this.dataGrid?.wasShown();
    }
    willHide() {
        super.willHide();
        this.dataGrid?.willHide();
    }
    elementsToRestoreScrollPositionsFor() {
        if (this.dataGrid) {
            return [this.dataGrid.scrollContainer];
        }
        return [];
    }
    onResize() {
        super.onResize();
        this.dataGrid?.onResize();
    }
}
class ObjectPropertiesSectionWidget extends UI.Widget.Widget {
    #value = null;
    #objectPropSection = null;
    set value(value) {
        if (this.#value === value) {
            return;
        }
        this.#value = value;
        this.requestUpdate();
    }
    get objectPropertiesSection() {
        return this.#objectPropSection;
    }
    performUpdate() {
        const value = this.#value;
        if (!value) {
            this.contentElement.removeChildren();
            this.#objectPropSection = null;
            return;
        }
        this.contentElement.removeChildren();
        this.#objectPropSection = ObjectUI.ObjectPropertiesSection.ObjectPropertiesSection.defaultObjectPropertiesSection(value, undefined /* linkifier */, true /* skipProto */, true /* readOnly */);
        if (value.hasChildren) {
            this.contentElement.appendChild(this.#objectPropSection.element);
        }
        else {
            this.contentElement.appendChild(this.#objectPropSection.titleElement);
        }
    }
}
export class IDBDataGridNode extends DataGrid.DataGrid.DataGridNode {
    selectable;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(data) {
        super(data, false);
        this.selectable = true;
    }
    createCell(columnIdentifier) {
        const cell = super.createCell(columnIdentifier);
        const value = this.data[columnIdentifier];
        switch (columnIdentifier) {
            case 'value':
            case 'key':
            case 'primary-key': {
                cell.removeChildren();
                const widget = new ObjectPropertiesSectionWidget();
                widget.value = value;
                widget.show(cell, null, true);
                break;
            }
        }
        return cell;
    }
}
//# sourceMappingURL=IndexedDBViews.js.map