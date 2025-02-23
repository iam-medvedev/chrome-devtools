// Copyright 2016 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as IconButton from '../../ui/components/icon_button/icon_button.js';
import * as DataGrid from '../../ui/legacy/components/data_grid/data_grid.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as ThemeSupport from '../../ui/legacy/theme_support/theme_support.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import { NetworkRequestNode } from './NetworkDataGridNode.js';
import { NetworkManageCustomHeadersView } from './NetworkManageCustomHeadersView.js';
import { NetworkWaterfallColumn } from './NetworkWaterfallColumn.js';
import { RequestInitiatorView } from './RequestInitiatorView.js';
const UIStrings = {
    /**
     *@description Data grid name for Network Log data grids
     */
    networkLog: 'Network Log',
    /**
     *@description Inner element text content in Network Log View Columns of the Network panel
     */
    waterfall: 'Waterfall',
    /**
     *@description A context menu item in the Network Log View Columns of the Network panel
     */
    responseHeaders: 'Response Headers',
    /**
     *@description Text in Network Log View Columns of the Network panel
     */
    manageHeaderColumns: 'Manage Header Columns…',
    /**
     *@description Text for the start time of an activity
     */
    startTime: 'Start Time',
    /**
     *@description Text in Network Log View Columns of the Network panel
     */
    responseTime: 'Response Time',
    /**
     *@description Text in Network Log View Columns of the Network panel
     */
    endTime: 'End Time',
    /**
     *@description Text in Network Log View Columns of the Network panel
     */
    totalDuration: 'Total Duration',
    /**
     *@description Text for the latency of a task
     */
    latency: 'Latency',
    /**
     *@description Text for the name of something
     */
    name: 'Name',
    /**
     *@description Text that refers to a file path
     */
    path: 'Path',
    /**
     *@description Text in Timeline UIUtils of the Performance panel
     */
    url: 'Url',
    /**
     *@description Text for one or a group of functions
     */
    method: 'Method',
    /**
     *@description Text for the status of something
     */
    status: 'Status',
    /**
     *@description Generic label for any text
     */
    text: 'Text',
    /**
     *@description Text for security or network protocol
     */
    protocol: 'Protocol',
    /**
     *@description Text in Network Log View Columns of the Network panel
     */
    scheme: 'Scheme',
    /**
     *@description Text for the domain of a website
     */
    domain: 'Domain',
    /**
     *@description Text in Network Log View Columns of the Network panel
     */
    remoteAddress: 'Remote Address',
    /**
     *@description Text that refers to some types
     */
    type: 'Type',
    /**
     *@description Text for the initiator of something
     */
    initiator: 'Initiator',
    /**
     *@description Column header in the Network log view of the Network panel
     */
    hasOverrides: 'Has overrides',
    /**
     *@description Column header in the Network log view of the Network panel
     */
    initiatorAddressSpace: 'Initiator Address Space',
    /**
     *@description Text for web cookies
     */
    cookies: 'Cookies',
    /**
     *@description Text in Network Log View Columns of the Network panel
     */
    setCookies: 'Set Cookies',
    /**
     *@description Text for the size of something
     */
    size: 'Size',
    /**
     *@description Text in Network Log View Columns of the Network panel
     */
    content: 'Content',
    /**
     *@description Noun that refers to a duration in milliseconds.
     */
    time: 'Time',
    /**
     *@description Text to show the priority of an item
     */
    priority: 'Priority',
    /**
     *@description Text in Network Log View Columns of the Network panel
     */
    connectionId: 'Connection ID',
    /**
     *@description Text in Network Log View Columns of the Network panel
     */
    remoteAddressSpace: 'Remote Address Space',
};
const str_ = i18n.i18n.registerUIStrings('panels/network/NetworkLogViewColumns.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(undefined, str_);
export class NetworkLogViewColumns {
    networkLogView;
    persistentSettings;
    networkLogLargeRowsSetting;
    eventDividers;
    eventDividersShown;
    gridMode;
    columns;
    waterfallRequestsAreStale;
    waterfallScrollerWidthIsStale;
    popupLinkifier;
    calculatorsMap;
    lastWheelTime;
    dataGridInternal;
    splitWidget;
    waterfallColumn;
    activeScroller;
    dataGridScroller;
    waterfallScroller;
    waterfallScrollerContent;
    waterfallHeaderElement;
    waterfallColumnSortIcon;
    activeWaterfallSortId;
    popoverHelper;
    hasScrollerTouchStarted;
    scrollerTouchStartPos;
    constructor(networkLogView, timeCalculator, durationCalculator, networkLogLargeRowsSetting) {
        this.networkLogView = networkLogView;
        this.persistentSettings = Common.Settings.Settings.instance().createSetting('network-log-columns', {});
        this.networkLogLargeRowsSetting = networkLogLargeRowsSetting;
        this.networkLogLargeRowsSetting.addChangeListener(this.updateRowsSize, this);
        this.eventDividers = new Map();
        this.eventDividersShown = false;
        this.gridMode = true;
        this.columns = [];
        this.waterfallRequestsAreStale = false;
        this.waterfallScrollerWidthIsStale = true;
        this.popupLinkifier = new Components.Linkifier.Linkifier();
        this.calculatorsMap = new Map();
        this.calculatorsMap.set("Time" /* CalculatorTypes.TIME */, timeCalculator);
        this.calculatorsMap.set("Duration" /* CalculatorTypes.DURATION */, durationCalculator);
        this.lastWheelTime = 0;
        this.setupDataGrid();
        this.setupWaterfall();
        ThemeSupport.ThemeSupport.instance().addEventListener(ThemeSupport.ThemeChangeEvent.eventName, () => {
            this.scheduleRefresh();
        });
    }
    static convertToDataGridDescriptor(columnConfig) {
        const title = columnConfig.title instanceof Function ? columnConfig.title() : columnConfig.title;
        return {
            id: columnConfig.id,
            title,
            sortable: columnConfig.sortable,
            align: columnConfig.align,
            nonSelectable: columnConfig.nonSelectable,
            weight: columnConfig.weight,
            allowInSortByEvenWhenHidden: columnConfig.allowInSortByEvenWhenHidden,
        };
    }
    wasShown() {
        this.updateRowsSize();
    }
    willHide() {
        if (this.popoverHelper) {
            this.popoverHelper.hidePopover();
        }
    }
    reset() {
        if (this.popoverHelper) {
            this.popoverHelper.hidePopover();
        }
        this.eventDividers.clear();
    }
    setupDataGrid() {
        const defaultColumns = DEFAULT_COLUMNS;
        const defaultColumnConfig = DEFAULT_COLUMN_CONFIG;
        this.columns = [];
        for (const currentConfigColumn of defaultColumns) {
            const descriptor = Object.assign({}, defaultColumnConfig, currentConfigColumn);
            const columnConfig = descriptor;
            columnConfig.id = columnConfig.id;
            if (columnConfig.subtitle) {
                const title = columnConfig.title instanceof Function ? columnConfig.title() : columnConfig.title;
                const subtitle = columnConfig.subtitle instanceof Function ? columnConfig.subtitle() : columnConfig.subtitle;
                columnConfig.titleDOMFragment = this.makeHeaderFragment(title, subtitle);
            }
            this.columns.push(columnConfig);
        }
        this.loadCustomColumnsAndSettings();
        this.popoverHelper = new UI.PopoverHelper.PopoverHelper(this.networkLogView.element, this.getPopoverRequest.bind(this), 'network.initiator-stacktrace');
        this.popoverHelper.setHasPadding(true);
        this.popoverHelper.setTimeout(300, 300);
        this.dataGridInternal = new DataGrid.SortableDataGrid.SortableDataGrid(({
            displayName: i18nString(UIStrings.networkLog),
            columns: this.columns.map(NetworkLogViewColumns.convertToDataGridDescriptor),
            deleteCallback: undefined,
            refreshCallback: undefined,
        }));
        this.dataGridInternal.element.addEventListener('mousedown', event => {
            if (!this.dataGridInternal.selectedNode && event.button) {
                event.consume();
            }
        }, true);
        this.dataGridScroller = this.dataGridInternal.scrollContainer;
        this.updateColumns();
        this.dataGridInternal.addEventListener("SortingChanged" /* DataGrid.DataGrid.Events.SORTING_CHANGED */, this.sortHandler, this);
        this.dataGridInternal.setHeaderContextMenuCallback(this.innerHeaderContextMenu.bind(this));
        this.activeWaterfallSortId = WaterfallSortIds.StartTime;
        this.dataGridInternal.markColumnAsSortedBy(INITIAL_SORT_COLUMN, DataGrid.DataGrid.Order.Ascending);
        this.splitWidget = new UI.SplitWidget.SplitWidget(true, true, 'network-panel-split-view-waterfall', 200);
        const widget = this.dataGridInternal.asWidget();
        widget.setMinimumSize(150, 0);
        this.splitWidget.setMainWidget(widget);
    }
    setupWaterfall() {
        this.waterfallColumn = new NetworkWaterfallColumn(this.networkLogView.calculator());
        this.waterfallColumn.element.addEventListener('contextmenu', handleContextMenu.bind(this));
        this.waterfallColumn.element.addEventListener('wheel', this.onMouseWheel.bind(this, false), { passive: true });
        this.waterfallColumn.element.addEventListener('touchstart', this.onTouchStart.bind(this));
        this.waterfallColumn.element.addEventListener('touchmove', this.onTouchMove.bind(this));
        this.waterfallColumn.element.addEventListener('touchend', this.onTouchEnd.bind(this));
        this.dataGridScroller.addEventListener('wheel', this.onMouseWheel.bind(this, true), true);
        this.dataGridScroller.addEventListener('touchstart', this.onTouchStart.bind(this));
        this.dataGridScroller.addEventListener('touchmove', this.onTouchMove.bind(this));
        this.dataGridScroller.addEventListener('touchend', this.onTouchEnd.bind(this));
        this.waterfallScroller = this.waterfallColumn.contentElement.createChild('div', 'network-waterfall-v-scroll');
        this.waterfallScrollerContent = this.waterfallScroller.createChild('div', 'network-waterfall-v-scroll-content');
        this.dataGridInternal.addEventListener("PaddingChanged" /* DataGrid.DataGrid.Events.PADDING_CHANGED */, () => {
            this.waterfallScrollerWidthIsStale = true;
            this.syncScrollers();
        });
        this.dataGridInternal.addEventListener("ViewportCalculated" /* DataGrid.ViewportDataGrid.Events.VIEWPORT_CALCULATED */, this.redrawWaterfallColumn.bind(this));
        this.createWaterfallHeader();
        this.waterfallColumn.contentElement.classList.add('network-waterfall-view');
        this.waterfallColumn.setMinimumSize(100, 0);
        this.splitWidget.setSidebarWidget(this.waterfallColumn);
        this.switchViewMode(false);
        function handleContextMenu(ev) {
            const event = ev;
            const node = this.waterfallColumn.getNodeFromPoint(event.offsetX, event.offsetY);
            if (!node) {
                return;
            }
            const request = node.request();
            if (!request) {
                return;
            }
            const contextMenu = new UI.ContextMenu.ContextMenu(event);
            this.networkLogView.handleContextMenuForRequest(contextMenu, request);
            void contextMenu.show();
        }
    }
    onMouseWheel(shouldConsume, ev) {
        if (shouldConsume) {
            ev.consume(true);
        }
        const event = ev;
        const hasRecentWheel = Date.now() - this.lastWheelTime < 80;
        this.activeScroller.scrollBy({ top: event.deltaY, behavior: hasRecentWheel ? 'auto' : 'smooth' });
        this.syncScrollers();
        this.lastWheelTime = Date.now();
    }
    onTouchStart(ev) {
        const event = ev;
        this.hasScrollerTouchStarted = true;
        this.scrollerTouchStartPos = event.changedTouches[0].pageY;
    }
    onTouchMove(ev) {
        if (!this.hasScrollerTouchStarted) {
            return;
        }
        const event = ev;
        const currentPos = event.changedTouches[0].pageY;
        const delta = this.scrollerTouchStartPos - currentPos;
        this.activeScroller.scrollBy({ top: delta, behavior: 'auto' });
        this.syncScrollers();
        this.scrollerTouchStartPos = currentPos;
    }
    onTouchEnd() {
        this.hasScrollerTouchStarted = false;
    }
    syncScrollers() {
        if (!this.waterfallColumn.isShowing()) {
            return;
        }
        this.waterfallScrollerContent.style.height =
            this.dataGridScroller.scrollHeight - this.dataGridInternal.headerHeight() + 'px';
        this.updateScrollerWidthIfNeeded();
        this.dataGridScroller.scrollTop = this.waterfallScroller.scrollTop;
    }
    updateScrollerWidthIfNeeded() {
        if (this.waterfallScrollerWidthIsStale) {
            this.waterfallScrollerWidthIsStale = false;
            this.waterfallColumn.setRightPadding(this.waterfallScroller.offsetWidth - this.waterfallScrollerContent.offsetWidth);
        }
    }
    redrawWaterfallColumn() {
        if (!this.waterfallRequestsAreStale) {
            this.updateScrollerWidthIfNeeded();
            this.waterfallColumn.update(this.activeScroller.scrollTop, this.eventDividersShown ? this.eventDividers : undefined);
            return;
        }
        this.syncScrollers();
        const nodes = this.networkLogView.flatNodesList();
        this.waterfallColumn.update(this.activeScroller.scrollTop, this.eventDividers, nodes);
    }
    createWaterfallHeader() {
        this.waterfallHeaderElement = this.waterfallColumn.contentElement.createChild('div', 'network-waterfall-header');
        this.waterfallHeaderElement.setAttribute('jslog', `${VisualLogging.tableHeader('waterfall').track({ click: true })}`);
        this.waterfallHeaderElement.addEventListener('click', waterfallHeaderClicked.bind(this));
        this.waterfallHeaderElement.addEventListener('contextmenu', event => {
            const contextMenu = new UI.ContextMenu.ContextMenu(event);
            this.innerHeaderContextMenu(contextMenu);
            void contextMenu.show();
        });
        this.waterfallHeaderElement.createChild('div', 'hover-layer');
        const innerElement = this.waterfallHeaderElement.createChild('div');
        innerElement.textContent = i18nString(UIStrings.waterfall);
        this.waterfallColumnSortIcon = new IconButton.Icon.Icon();
        this.waterfallColumnSortIcon.className = 'sort-order-icon';
        this.waterfallHeaderElement.createChild('div', 'sort-order-icon-container')
            .appendChild(this.waterfallColumnSortIcon);
        function waterfallHeaderClicked() {
            const sortOrders = DataGrid.DataGrid.Order;
            const wasSortedByWaterfall = this.dataGridInternal.sortColumnId() === 'waterfall';
            const wasSortedAscending = this.dataGridInternal.isSortOrderAscending();
            const sortOrder = wasSortedByWaterfall && wasSortedAscending ? sortOrders.Descending : sortOrders.Ascending;
            this.dataGridInternal.markColumnAsSortedBy('waterfall', sortOrder);
            this.sortHandler();
        }
    }
    setCalculator(x) {
        this.waterfallColumn.setCalculator(x);
    }
    scheduleRefresh() {
        this.waterfallColumn.scheduleDraw();
    }
    updateRowsSize() {
        const largeRows = Boolean(this.networkLogLargeRowsSetting.get());
        this.dataGridInternal.element.classList.toggle('small', !largeRows);
        this.dataGridInternal.scheduleUpdate();
        this.waterfallScrollerWidthIsStale = true;
        this.waterfallColumn.setRowHeight(largeRows ? 41 : 21);
        this.waterfallScroller.classList.toggle('small', !largeRows);
        this.waterfallHeaderElement.classList.toggle('small', !largeRows);
        // Request an animation frame because under certain conditions
        // (see crbug.com/1019723) this.waterfallScroller.offsetTop does
        // not return the value it's supposed to return as of the applied
        // css classes.
        window.requestAnimationFrame(() => {
            this.waterfallColumn.setHeaderHeight(this.waterfallScroller.offsetTop);
            this.waterfallColumn.scheduleDraw();
        });
    }
    show(element) {
        this.splitWidget.show(element);
    }
    setHidden(value) {
        UI.ARIAUtils.setHidden(this.splitWidget.element, value);
    }
    dataGrid() {
        return this.dataGridInternal;
    }
    sortByCurrentColumn() {
        this.sortHandler();
    }
    sortHandler() {
        const columnId = this.dataGridInternal.sortColumnId();
        this.networkLogView.removeAllNodeHighlights();
        this.waterfallRequestsAreStale = true;
        if (columnId === 'waterfall') {
            if (this.dataGridInternal.sortOrder() === DataGrid.DataGrid.Order.Ascending) {
                this.waterfallColumnSortIcon.name = 'triangle-up';
            }
            else {
                this.waterfallColumnSortIcon.name = 'triangle-down';
            }
            this.waterfallColumnSortIcon.hidden = false;
            const sortFunction = NetworkRequestNode.RequestPropertyComparator.bind(null, this.activeWaterfallSortId);
            this.dataGridInternal.sortNodes(sortFunction, !this.dataGridInternal.isSortOrderAscending());
            this.dataGridSortedForTest();
            return;
        }
        this.waterfallColumnSortIcon.hidden = true;
        this.waterfallColumnSortIcon.name = null;
        const columnConfig = this.columns.find(columnConfig => columnConfig.id === columnId);
        if (!columnConfig?.sortingFunction) {
            return;
        }
        const sortingFunction = columnConfig.sortingFunction;
        if (!sortingFunction) {
            return;
        }
        this.dataGridInternal.sortNodes(sortingFunction, !this.dataGridInternal.isSortOrderAscending());
        this.dataGridSortedForTest();
    }
    dataGridSortedForTest() {
    }
    updateColumns() {
        if (!this.dataGridInternal) {
            return;
        }
        const visibleColumns = new Set();
        if (this.gridMode) {
            for (const columnConfig of this.columns) {
                if (columnConfig.id === 'waterfall') {
                    this.setWaterfallVisibility(columnConfig.visible);
                }
                else if (columnConfig.visible) {
                    visibleColumns.add(columnConfig.id);
                }
            }
        }
        else {
            // Find the first visible column from the path group
            const visibleColumn = this.columns.find(c => c.hideableGroup === 'path' && c.visible);
            if (visibleColumn) {
                visibleColumns.add(visibleColumn.id);
            }
            else {
                // This should not happen because inside a hideableGroup
                // there should always be at least one column visible
                // This is just in case.
                visibleColumns.add('name');
            }
            this.setWaterfallVisibility(false);
        }
        this.dataGridInternal.setColumnsVisibility(visibleColumns);
    }
    switchViewMode(gridMode) {
        if (this.gridMode === gridMode) {
            return;
        }
        this.gridMode = gridMode;
        this.updateColumns();
        this.updateRowsSize();
    }
    toggleColumnVisibility(columnConfig) {
        this.loadCustomColumnsAndSettings();
        columnConfig.visible = !columnConfig.visible;
        this.saveColumnsSettings();
        this.updateColumns();
        this.updateRowsSize();
    }
    setWaterfallVisibility(visible) {
        if (!this.splitWidget) {
            return;
        }
        this.networkLogView.element.classList.toggle('has-waterfall', visible);
        if (visible) {
            this.splitWidget.showBoth();
            this.activeScroller = this.waterfallScroller;
            this.waterfallScroller.scrollTop = this.dataGridScroller.scrollTop;
            this.dataGridInternal.setScrollContainer(this.waterfallScroller);
        }
        else {
            this.networkLogView.removeAllNodeHighlights();
            this.splitWidget.hideSidebar();
            this.activeScroller = this.dataGridScroller;
            this.dataGridInternal.setScrollContainer(this.dataGridScroller);
        }
    }
    saveColumnsSettings() {
        const saveableSettings = {};
        for (const columnConfig of this.columns) {
            saveableSettings[columnConfig.id] = { visible: columnConfig.visible, title: columnConfig.title };
        }
        this.persistentSettings.set(saveableSettings);
    }
    loadCustomColumnsAndSettings() {
        const savedSettings = this.persistentSettings.get();
        const columnIds = Object.keys(savedSettings);
        for (const columnId of columnIds) {
            const setting = savedSettings[columnId];
            let columnConfig = this.columns.find(columnConfig => columnConfig.id === columnId);
            if (!columnConfig && setting.title) {
                columnConfig = this.addCustomHeader(setting.title, columnId) || undefined;
            }
            if (columnConfig && columnConfig.hideable && typeof setting.visible === 'boolean') {
                columnConfig.visible = Boolean(setting.visible);
            }
            if (columnConfig && typeof setting.title === 'string') {
                columnConfig.title = setting.title;
            }
        }
    }
    makeHeaderFragment(title, subtitle) {
        const fragment = document.createDocumentFragment();
        UI.UIUtils.createTextChild(fragment, title);
        const subtitleDiv = fragment.createChild('div', 'network-header-subtitle');
        UI.UIUtils.createTextChild(subtitleDiv, subtitle);
        return fragment;
    }
    innerHeaderContextMenu(contextMenu) {
        const columnConfigs = this.columns.filter(columnConfig => columnConfig.hideable);
        const nonResponseHeaders = columnConfigs.filter(columnConfig => !columnConfig.isResponseHeader);
        const hideableGroups = new Map();
        const nonResponseHeadersWithoutGroup = [];
        // Sort columns into their groups
        for (const columnConfig of nonResponseHeaders) {
            if (!columnConfig.hideableGroup) {
                nonResponseHeadersWithoutGroup.push(columnConfig);
            }
            else {
                const name = columnConfig.hideableGroup;
                let hideableGroup = hideableGroups.get(name);
                if (!hideableGroup) {
                    hideableGroup = [];
                    hideableGroups.set(name, hideableGroup);
                }
                hideableGroup.push(columnConfig);
            }
        }
        // Add all the groups first
        for (const group of hideableGroups.values()) {
            const visibleColumns = group.filter(columnConfig => columnConfig.visible);
            for (const columnConfig of group) {
                // Make sure that at least one item in every group is enabled
                const disabled = visibleColumns.length === 1 && visibleColumns[0] === columnConfig;
                const title = columnConfig.title instanceof Function ? columnConfig.title() : columnConfig.title;
                contextMenu.headerSection().appendCheckboxItem(title, this.toggleColumnVisibility.bind(this, columnConfig), { checked: columnConfig.visible, disabled, jslogContext: columnConfig.id });
            }
            contextMenu.headerSection().appendSeparator();
        }
        // Add normal columns not belonging to any group
        for (const columnConfig of nonResponseHeadersWithoutGroup) {
            const title = columnConfig.title instanceof Function ? columnConfig.title() : columnConfig.title;
            contextMenu.headerSection().appendCheckboxItem(title, this.toggleColumnVisibility.bind(this, columnConfig), { checked: columnConfig.visible, jslogContext: columnConfig.id });
        }
        const responseSubMenu = contextMenu.footerSection().appendSubMenuItem(i18nString(UIStrings.responseHeaders), false, 'response-headers');
        const responseHeaders = columnConfigs.filter(columnConfig => columnConfig.isResponseHeader);
        for (const columnConfig of responseHeaders) {
            const title = columnConfig.title instanceof Function ? columnConfig.title() : columnConfig.title;
            responseSubMenu.defaultSection().appendCheckboxItem(title, this.toggleColumnVisibility.bind(this, columnConfig), { checked: columnConfig.visible, jslogContext: columnConfig.id });
        }
        responseSubMenu.footerSection().appendItem(i18nString(UIStrings.manageHeaderColumns), this.manageCustomHeaderDialog.bind(this), { jslogContext: 'manage-header-columns' });
        const waterfallSortIds = WaterfallSortIds;
        const waterfallSubMenu = contextMenu.footerSection().appendSubMenuItem(i18nString(UIStrings.waterfall), false, 'waterfall');
        waterfallSubMenu.defaultSection().appendCheckboxItem(i18nString(UIStrings.startTime), setWaterfallMode.bind(this, waterfallSortIds.StartTime), { checked: this.activeWaterfallSortId === waterfallSortIds.StartTime, jslogContext: 'start-time' });
        waterfallSubMenu.defaultSection().appendCheckboxItem(i18nString(UIStrings.responseTime), setWaterfallMode.bind(this, waterfallSortIds.ResponseTime), { checked: this.activeWaterfallSortId === waterfallSortIds.ResponseTime, jslogContext: 'response-time' });
        waterfallSubMenu.defaultSection().appendCheckboxItem(i18nString(UIStrings.endTime), setWaterfallMode.bind(this, waterfallSortIds.EndTime), { checked: this.activeWaterfallSortId === waterfallSortIds.EndTime, jslogContext: 'end-time' });
        waterfallSubMenu.defaultSection().appendCheckboxItem(i18nString(UIStrings.totalDuration), setWaterfallMode.bind(this, waterfallSortIds.Duration), { checked: this.activeWaterfallSortId === waterfallSortIds.Duration, jslogContext: 'total-duration' });
        waterfallSubMenu.defaultSection().appendCheckboxItem(i18nString(UIStrings.latency), setWaterfallMode.bind(this, waterfallSortIds.Latency), { checked: this.activeWaterfallSortId === waterfallSortIds.Latency, jslogContext: 'latency' });
        function setWaterfallMode(sortId) {
            let calculator = this.calculatorsMap.get("Time" /* CalculatorTypes.TIME */);
            const waterfallSortIds = WaterfallSortIds;
            if (sortId === waterfallSortIds.Duration || sortId === waterfallSortIds.Latency) {
                calculator = this.calculatorsMap.get("Duration" /* CalculatorTypes.DURATION */);
            }
            this.networkLogView.setCalculator(calculator);
            this.activeWaterfallSortId = sortId;
            this.dataGridInternal.markColumnAsSortedBy('waterfall', DataGrid.DataGrid.Order.Ascending);
            this.sortHandler();
        }
    }
    manageCustomHeaderDialog() {
        const customHeaders = [];
        for (const columnConfig of this.columns) {
            const title = columnConfig.title instanceof Function ? columnConfig.title() : columnConfig.title;
            if (columnConfig.isResponseHeader) {
                customHeaders.push({ title, editable: columnConfig.isCustomHeader });
            }
        }
        const manageCustomHeaders = new NetworkManageCustomHeadersView(customHeaders, headerTitle => Boolean(this.addCustomHeader(headerTitle)), this.changeCustomHeader.bind(this), this.removeCustomHeader.bind(this));
        const dialog = new UI.Dialog.Dialog('manage-custom-headers');
        manageCustomHeaders.show(dialog.contentElement);
        dialog.setSizeBehavior("MeasureContent" /* UI.GlassPane.SizeBehavior.MEASURE_CONTENT */);
        dialog.show(this.networkLogView.element);
    }
    removeCustomHeader(headerId) {
        headerId = headerId.toLowerCase();
        const index = this.columns.findIndex(columnConfig => columnConfig.id === headerId);
        if (index === -1) {
            return false;
        }
        this.columns.splice(index, 1);
        this.dataGridInternal.removeColumn(headerId);
        this.saveColumnsSettings();
        this.updateColumns();
        return true;
    }
    addCustomHeader(headerTitle, headerId, index) {
        if (!headerId) {
            headerId = headerTitle.toLowerCase();
        }
        if (index === undefined) {
            index = this.columns.length - 1;
        }
        const currentColumnConfig = this.columns.find(columnConfig => columnConfig.id === headerId);
        if (currentColumnConfig) {
            return null;
        }
        const columnConfigBase = Object.assign({}, DEFAULT_COLUMN_CONFIG, {
            id: headerId,
            title: headerTitle,
            isResponseHeader: true,
            isCustomHeader: true,
            visible: true,
            sortingFunction: NetworkRequestNode.ResponseHeaderStringComparator.bind(null, headerId),
        });
        // Split out the column config from the typed version, as doing it in a single assignment causes
        // issues with Closure compiler.
        const columnConfig = columnConfigBase;
        this.columns.splice(index, 0, columnConfig);
        if (this.dataGridInternal) {
            this.dataGridInternal.addColumn(NetworkLogViewColumns.convertToDataGridDescriptor(columnConfig), index);
        }
        this.saveColumnsSettings();
        this.updateColumns();
        return columnConfig;
    }
    changeCustomHeader(oldHeaderId, newHeaderTitle, newHeaderId) {
        if (!newHeaderId) {
            newHeaderId = newHeaderTitle.toLowerCase();
        }
        oldHeaderId = oldHeaderId.toLowerCase();
        const oldIndex = this.columns.findIndex(columnConfig => columnConfig.id === oldHeaderId);
        const oldColumnConfig = this.columns[oldIndex];
        const currentColumnConfig = this.columns.find(columnConfig => columnConfig.id === newHeaderId);
        if (!oldColumnConfig || (currentColumnConfig && oldHeaderId !== newHeaderId)) {
            return false;
        }
        this.removeCustomHeader(oldHeaderId);
        this.addCustomHeader(newHeaderTitle, newHeaderId, oldIndex);
        return true;
    }
    getPopoverRequest(event) {
        if (!this.gridMode) {
            return null;
        }
        const hoveredNode = this.networkLogView.hoveredNode();
        if (!hoveredNode || !event.target) {
            return null;
        }
        const anchor = event.target.enclosingNodeOrSelfWithClass('network-script-initiated');
        if (!anchor) {
            return null;
        }
        const request = hoveredNode.request();
        if (!request) {
            return null;
        }
        return {
            box: anchor.boxInWindow(),
            show: async (popover) => {
                this.popupLinkifier.addEventListener("liveLocationUpdated" /* Components.Linkifier.Events.LIVE_LOCATION_UPDATED */, () => {
                    popover.setSizeBehavior("MeasureContent" /* UI.GlassPane.SizeBehavior.MEASURE_CONTENT */);
                });
                const content = RequestInitiatorView.createStackTracePreview((request), this.popupLinkifier, false);
                if (!content) {
                    return false;
                }
                popover.contentElement.appendChild(content.element);
                return true;
            },
            hide: this.popupLinkifier.reset.bind(this.popupLinkifier),
        };
    }
    addEventDividers(times, className) {
        // TODO(allada) Remove this and pass in the color.
        let color = 'transparent';
        switch (className) {
            case 'network-dcl-divider':
                color = ThemeSupport.ThemeSupport.instance().getComputedValue('--sys-color-blue');
                break;
            case 'network-load-divider':
                color = ThemeSupport.ThemeSupport.instance().getComputedValue('--sys-color-error');
                break;
            default:
                return;
        }
        const currentTimes = this.eventDividers.get(color) || [];
        this.eventDividers.set(color, currentTimes.concat(times));
        this.networkLogView.scheduleRefresh();
    }
    hideEventDividers() {
        this.eventDividersShown = true;
        this.redrawWaterfallColumn();
    }
    showEventDividers() {
        this.eventDividersShown = false;
        this.redrawWaterfallColumn();
    }
    selectFilmStripFrame(time) {
        this.eventDividers.set(FILM_STRIP_DIVIDER_COLOR, [time]);
        this.redrawWaterfallColumn();
    }
    clearFilmStripFrame() {
        this.eventDividers.delete(FILM_STRIP_DIVIDER_COLOR);
        this.redrawWaterfallColumn();
    }
}
const INITIAL_SORT_COLUMN = 'waterfall';
const DEFAULT_COLUMN_CONFIG = {
    subtitle: null,
    visible: false,
    weight: 6,
    sortable: true,
    hideable: true,
    hideableGroup: null,
    nonSelectable: false,
    isResponseHeader: false,
    isCustomHeader: false,
    allowInSortByEvenWhenHidden: false,
};
const DEFAULT_COLUMNS = [
    {
        id: 'name',
        title: i18nLazyString(UIStrings.name),
        subtitle: i18nLazyString(UIStrings.path),
        visible: true,
        weight: 20,
        hideable: true,
        hideableGroup: 'path',
        sortingFunction: NetworkRequestNode.NameComparator,
    },
    {
        id: 'path',
        title: i18nLazyString(UIStrings.path),
        hideable: true,
        hideableGroup: 'path',
        sortingFunction: NetworkRequestNode.RequestPropertyComparator.bind(null, 'pathname'),
    },
    {
        id: 'url',
        title: i18nLazyString(UIStrings.url),
        hideable: true,
        hideableGroup: 'path',
        sortingFunction: NetworkRequestNode.RequestURLComparator,
    },
    {
        id: 'method',
        title: i18nLazyString(UIStrings.method),
        sortingFunction: NetworkRequestNode.RequestPropertyComparator.bind(null, 'requestMethod'),
    },
    {
        id: 'status',
        title: i18nLazyString(UIStrings.status),
        visible: true,
        subtitle: i18nLazyString(UIStrings.text),
        sortingFunction: NetworkRequestNode.RequestPropertyComparator.bind(null, 'statusCode'),
    },
    {
        id: 'protocol',
        title: i18nLazyString(UIStrings.protocol),
        sortingFunction: NetworkRequestNode.RequestPropertyComparator.bind(null, 'protocol'),
    },
    {
        id: 'scheme',
        title: i18nLazyString(UIStrings.scheme),
        sortingFunction: NetworkRequestNode.RequestPropertyComparator.bind(null, 'scheme'),
    },
    {
        id: 'domain',
        title: i18nLazyString(UIStrings.domain),
        sortingFunction: NetworkRequestNode.RequestPropertyComparator.bind(null, 'domain'),
    },
    {
        id: 'remote-address',
        title: i18nLazyString(UIStrings.remoteAddress),
        weight: 10,
        align: "right" /* DataGrid.DataGrid.Align.RIGHT */,
        sortingFunction: NetworkRequestNode.RemoteAddressComparator,
    },
    {
        id: 'remote-address-space',
        title: i18nLazyString(UIStrings.remoteAddressSpace),
        visible: false,
        weight: 10,
        sortingFunction: NetworkRequestNode.RemoteAddressSpaceComparator,
    },
    {
        id: 'type',
        title: i18nLazyString(UIStrings.type),
        visible: true,
        sortingFunction: NetworkRequestNode.TypeComparator,
    },
    {
        id: 'initiator',
        title: i18nLazyString(UIStrings.initiator),
        visible: true,
        weight: 10,
        sortingFunction: NetworkRequestNode.InitiatorComparator,
    },
    {
        id: 'initiator-address-space',
        title: i18nLazyString(UIStrings.initiatorAddressSpace),
        visible: false,
        weight: 10,
        sortingFunction: NetworkRequestNode.InitiatorAddressSpaceComparator,
    },
    {
        id: 'cookies',
        title: i18nLazyString(UIStrings.cookies),
        align: "right" /* DataGrid.DataGrid.Align.RIGHT */,
        sortingFunction: NetworkRequestNode.RequestCookiesCountComparator,
    },
    {
        id: 'set-cookies',
        title: i18nLazyString(UIStrings.setCookies),
        align: "right" /* DataGrid.DataGrid.Align.RIGHT */,
        sortingFunction: NetworkRequestNode.ResponseCookiesCountComparator,
    },
    {
        id: 'size',
        title: i18nLazyString(UIStrings.size),
        visible: true,
        subtitle: i18nLazyString(UIStrings.content),
        align: "right" /* DataGrid.DataGrid.Align.RIGHT */,
        sortingFunction: NetworkRequestNode.SizeComparator,
    },
    {
        id: 'time',
        title: i18nLazyString(UIStrings.time),
        visible: true,
        subtitle: i18nLazyString(UIStrings.latency),
        align: "right" /* DataGrid.DataGrid.Align.RIGHT */,
        sortingFunction: NetworkRequestNode.RequestPropertyComparator.bind(null, 'duration'),
    },
    { id: 'priority', title: i18nLazyString(UIStrings.priority), sortingFunction: NetworkRequestNode.PriorityComparator },
    {
        id: 'connection-id',
        title: i18nLazyString(UIStrings.connectionId),
        sortingFunction: NetworkRequestNode.RequestPropertyComparator.bind(null, 'connectionId'),
    },
    {
        id: 'cache-control',
        isResponseHeader: true,
        title: i18n.i18n.lockedLazyString('Cache-Control'),
        sortingFunction: NetworkRequestNode.ResponseHeaderStringComparator.bind(null, 'cache-control'),
    },
    {
        id: 'connection',
        isResponseHeader: true,
        title: i18n.i18n.lockedLazyString('Connection'),
        sortingFunction: NetworkRequestNode.ResponseHeaderStringComparator.bind(null, 'connection'),
    },
    {
        id: 'content-encoding',
        isResponseHeader: true,
        title: i18n.i18n.lockedLazyString('Content-Encoding'),
        sortingFunction: NetworkRequestNode.ResponseHeaderStringComparator.bind(null, 'content-encoding'),
    },
    {
        id: 'content-length',
        isResponseHeader: true,
        title: i18n.i18n.lockedLazyString('Content-Length'),
        align: "right" /* DataGrid.DataGrid.Align.RIGHT */,
        sortingFunction: NetworkRequestNode.ResponseHeaderNumberComparator.bind(null, 'content-length'),
    },
    {
        id: 'etag',
        isResponseHeader: true,
        title: i18n.i18n.lockedLazyString('ETag'),
        sortingFunction: NetworkRequestNode.ResponseHeaderStringComparator.bind(null, 'etag'),
    },
    {
        id: 'has-overrides',
        title: i18nLazyString(UIStrings.hasOverrides),
        sortingFunction: NetworkRequestNode.ResponseHeaderStringComparator.bind(null, 'has-overrides'),
    },
    {
        id: 'keep-alive',
        isResponseHeader: true,
        title: i18n.i18n.lockedLazyString('Keep-Alive'),
        sortingFunction: NetworkRequestNode.ResponseHeaderStringComparator.bind(null, 'keep-alive'),
    },
    {
        id: 'last-modified',
        isResponseHeader: true,
        title: i18n.i18n.lockedLazyString('Last-Modified'),
        sortingFunction: NetworkRequestNode.ResponseHeaderDateComparator.bind(null, 'last-modified'),
    },
    {
        id: 'server',
        isResponseHeader: true,
        title: i18n.i18n.lockedLazyString('Server'),
        sortingFunction: NetworkRequestNode.ResponseHeaderStringComparator.bind(null, 'server'),
    },
    {
        id: 'vary',
        isResponseHeader: true,
        title: i18n.i18n.lockedLazyString('Vary'),
        sortingFunction: NetworkRequestNode.ResponseHeaderStringComparator.bind(null, 'vary'),
    },
    // This header is a placeholder to let datagrid know that it can be sorted by this column, but never shown.
    {
        id: 'waterfall',
        title: i18nLazyString(UIStrings.waterfall),
        allowInSortByEvenWhenHidden: true,
    },
];
const FILM_STRIP_DIVIDER_COLOR = '#fccc49';
var WaterfallSortIds;
(function (WaterfallSortIds) {
    /* eslint-disable @typescript-eslint/naming-convention -- Used by web_tests. */
    WaterfallSortIds["StartTime"] = "startTime";
    WaterfallSortIds["ResponseTime"] = "responseReceivedTime";
    WaterfallSortIds["EndTime"] = "endTime";
    WaterfallSortIds["Duration"] = "duration";
    WaterfallSortIds["Latency"] = "latency";
    /* eslint-enable @typescript-eslint/naming-convention */
})(WaterfallSortIds || (WaterfallSortIds = {}));
//# sourceMappingURL=NetworkLogViewColumns.js.map