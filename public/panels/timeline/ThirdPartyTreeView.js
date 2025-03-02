// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as Trace from '../../models/trace/trace.js';
import * as DataGrid from '../../ui/legacy/components/data_grid/data_grid.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import * as TimelineTreeView from './TimelineTreeView.js';
import * as Utils from './utils/utils.js';
const UIStrings = {
    /**
     *@description Unattributed text for an unattributed entity.
     */
    unattributed: '[unattributed]',
    /**
     *@description Title for the name of either 1st or 3rd Party entities.
     */
    firstOrThirdPartyName: '1st / 3rd party',
    /**
     *@description Title referencing transfer size.
     */
    transferSize: 'Transfer size',
    /**
     *@description Title referencing main thread time.
     */
    mainThreadTime: 'Main thread time',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/ThirdPartyTreeView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class ThirdPartyTreeViewWidget extends TimelineTreeView.TimelineTreeView {
    #thirdPartySummaries = null;
    // By default the TimelineTreeView will auto-select the first row
    // when the grid is refreshed but for the ThirdParty view we only
    // want to do this when the user hovers.
    autoSelectFirstChildOnRefresh = false;
    constructor() {
        super();
        this.element.setAttribute('jslog', `${VisualLogging.pane('third-party-tree').track({ hover: true })}`);
        this.init();
        this.dataGrid.markColumnAsSortedBy('self', DataGrid.DataGrid.Order.Descending);
        this.dataGrid.setResizeMethod("nearest" /* DataGrid.DataGrid.ResizeMethod.NEAREST */);
        /**
         * By default data grids always expand when arrowing.
         * For 3P table, we don't use this feature.
         */
        this.dataGrid.expandNodesWhenArrowing = false;
    }
    buildTree() {
        const parsedTrace = this.parsedTrace();
        const entityMapper = this.entityMapper();
        if (!parsedTrace || !entityMapper) {
            return new Trace.Extras.TraceTree.BottomUpRootNode([], {
                textFilter: this.textFilter(),
                filters: this.filtersWithoutTextFilter(),
                startTime: this.startTime,
                endTime: this.endTime,
                eventGroupIdCallback: this.groupingFunction.bind(this),
            });
        }
        // const events = this.#thirdPartySummaries.entityByEvent.keys();
        const relatedEvents = this.selectedEvents().sort(Trace.Helpers.Trace.eventTimeComparator);
        // The filters for this view are slightly different; we want to use the set
        // of visible event types, but also include network events, which by
        // default are not in the set of visible entries (as they are not shown on
        // the main flame chart).
        const filter = new Trace.Extras.TraceFilter.VisibleEventsFilter(Utils.EntryStyles.visibleTypes().concat(["SyntheticNetworkRequest" /* Trace.Types.Events.Name.SYNTHETIC_NETWORK_REQUEST */]));
        const node = new Trace.Extras.TraceTree.BottomUpRootNode(relatedEvents, {
            textFilter: this.textFilter(),
            filters: [filter],
            startTime: this.startTime,
            endTime: this.endTime,
            eventGroupIdCallback: this.groupingFunction.bind(this),
            calculateTransferSize: true,
        });
        return node;
    }
    /**
     * Third party tree view doesn't require the select feature, as this expands the node.
     */
    selectProfileNode() {
        return;
    }
    groupingFunction(event) {
        const entity = this.entityMapper()?.entityForEvent(event);
        if (!entity) {
            return '';
        }
        return entity.name;
    }
    populateColumns(columns) {
        columns.push({
            id: 'site',
            title: i18nString(UIStrings.firstOrThirdPartyName),
            // It's important that this width is the `.widget.vbox.timeline-tree-view` max-width (550)
            // minus the two fixed sizes below. (550-100-105) == 345
            width: '345px',
            // And with this column not-fixed-width and resizingMethod NEAREST, the name-column will appropriately flex.
            sortable: true,
        }, {
            id: 'transfer-size',
            title: i18nString(UIStrings.transferSize),
            width: '100px', // Mostly so there's room for the header plus sorting triangle
            fixedWidth: true,
            sortable: true,
        }, {
            id: 'self',
            title: i18nString(UIStrings.mainThreadTime),
            width: '120px', // Mostly to fit large self-time/main thread time plus devtools-button
            fixedWidth: true,
            sortable: true,
        });
    }
    populateToolbar() {
        return;
    }
    compareTransferSize(a, b) {
        const nodeA = a;
        const nodeB = b;
        const transferA = nodeA.profileNode.transferSize ?? 0;
        const transferB = nodeB.profileNode.transferSize ?? 0;
        return transferA - transferB;
    }
    sortingChanged() {
        const columnId = this.dataGrid.sortColumnId();
        if (!columnId) {
            return;
        }
        let sortFunction;
        switch (columnId) {
            case 'transfer-size':
                sortFunction = this.compareTransferSize.bind(this);
                break;
            default:
                sortFunction = super.getSortingFunction(columnId);
                break;
        }
        if (sortFunction) {
            this.dataGrid.sortNodes(sortFunction, !this.dataGrid.isSortOrderAscending());
        }
    }
    displayInfoForGroupNode(node) {
        const color = 'gray';
        const unattributed = i18nString(UIStrings.unattributed);
        const id = typeof node.id === 'symbol' ? undefined : node.id;
        // This `undefined` is [unattributed]
        // TODO(paulirish,aixba): Improve attribution to reduce amount of items in [unattributed].
        const domainName = id ? this.entityMapper()?.entityForEvent(node.event)?.name || id : undefined;
        return { name: domainName || unattributed, color, icon: undefined };
    }
    extractThirdPartySummary(node) {
        if (!this.#thirdPartySummaries) {
            return { transferSize: 0 };
        }
        const entity = this.#thirdPartySummaries.entityByEvent.get(node.event);
        if (!entity) {
            return { transferSize: 0 };
        }
        const summary = this.#thirdPartySummaries.summaries.byEntity.get(entity);
        if (!summary) {
            return { transferSize: 0 };
        }
        return { transferSize: summary.transferSize };
    }
    nodeIsFirstParty(node) {
        const mapper = this.entityMapper();
        if (!mapper) {
            return false;
        }
        const firstParty = mapper.firstPartyEntity();
        return firstParty === mapper.entityForEvent(node.event);
    }
    nodeIsExtension(node) {
        const mapper = this.entityMapper();
        if (!mapper) {
            return false;
        }
        const entity = mapper.entityForEvent(node.event);
        return Boolean(entity) && entity?.category === 'Chrome Extension';
    }
}
export class ThirdPartyTreeElement extends UI.Widget.WidgetElement {
    #treeView;
    set treeView(treeView) {
        this.#treeView = treeView;
    }
    constructor() {
        super();
        this.style.display = 'contents';
    }
    createWidget() {
        const containerWidget = new UI.Widget.Widget(false, undefined, this);
        containerWidget.contentElement.style.display = 'contents';
        if (this.#treeView) {
            this.#treeView.show(containerWidget.contentElement);
        }
        return containerWidget;
    }
}
customElements.define('devtools-performance-third-party-tree-view', ThirdPartyTreeElement);
//# sourceMappingURL=ThirdPartyTreeView.js.map