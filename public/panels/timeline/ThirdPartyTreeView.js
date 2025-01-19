// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as Trace from '../../models/trace/trace.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import * as TimelineTreeView from './TimelineTreeView.js';
const UIStrings = {
    /**
     *@description Unattributed text for an unattributed entity.
     */
    unattributed: '[unattributed]',
    /**
     *@description Title for the name of either 1st or 3rd Party entities.
     */
    firstOrThirdPartyName: '1st / 3rd Party',
    /**
     *@description Title referencing transfer size.
     */
    transferSize: 'Transfer size',
    /**
     *@description Title referencing self time.
     */
    selfTime: 'Self time',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/ThirdPartyTreeView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class ThirdPartyTreeViewWidget extends TimelineTreeView.TimelineTreeView {
    #thirdPartySummaries = null;
    constructor() {
        super();
        this.element.setAttribute('jslog', `${VisualLogging.pane('third-party-tree').track({ hover: true })}`);
        this.init();
    }
    buildTree() {
        const parsedTrace = this.parsedTrace();
        const entityMapper = this.entityMapper();
        if (!parsedTrace || !entityMapper) {
            return new Trace.Extras.TraceTree.BottomUpRootNode([], this.textFilter(), this.filtersWithoutTextFilter(), this.startTime, this.endTime, this.groupingFunction());
        }
        // Update summaries.
        const min = Trace.Helpers.Timing.millisecondsToMicroseconds(this.startTime);
        const max = Trace.Helpers.Timing.millisecondsToMicroseconds(this.endTime);
        const bounds = { max, min, range: Trace.Types.Timing.MicroSeconds(max - min) };
        this.#thirdPartySummaries =
            Trace.Extras.ThirdParties.getSummariesAndEntitiesWithMapping(parsedTrace, bounds, entityMapper.mappings());
        const events = this.#thirdPartySummaries?.entityByEvent.keys();
        const relatedEvents = Array.from(events ?? []);
        return new Trace.Extras.TraceTree.BottomUpRootNode(relatedEvents, this.textFilter(), this.filtersWithoutTextFilter(), this.startTime, this.endTime, this.groupingFunction());
    }
    groupingFunction() {
        return this.domainByEvent.bind(this);
    }
    domainByEvent(event) {
        const parsedTrace = this.parsedTrace();
        if (!parsedTrace) {
            return '';
        }
        const entityMappings = this.entityMapper();
        if (!entityMappings) {
            return '';
        }
        const entity = entityMappings.entityForEvent(event);
        if (!entity) {
            return '';
        }
        return entity.name;
    }
    populateColumns(columns) {
        columns.push({
            id: 'site',
            title: i18nString(UIStrings.firstOrThirdPartyName),
            width: '100px',
            fixedWidth: true,
            sortable: true,
        }, {
            id: 'transfer-size',
            title: i18nString(UIStrings.transferSize),
            width: '80px',
            fixedWidth: true,
            sortable: true,
        }, {
            id: 'self',
            title: i18nString(UIStrings.selfTime),
            width: '80px',
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
        const transferA = this.extractThirdPartySummary(nodeA.profileNode).transferSize ?? 0;
        const transferB = this.extractThirdPartySummary(nodeB.profileNode).transferSize ?? 0;
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
    onHover(node) {
        const entityMappings = this.entityMapper();
        if (!entityMappings || !node?.event) {
            return;
        }
        const nodeEntity = entityMappings.entityForEvent(node.event);
        if (!nodeEntity) {
            return;
        }
        const eventsForEntity = entityMappings.eventsForEntity(nodeEntity);
        this.dispatchEventToListeners("ThirdPartyRowHovered" /* TimelineTreeView.TimelineTreeView.Events.THIRD_PARTY_ROW_HOVERED */, eventsForEntity);
    }
    displayInfoForGroupNode(node) {
        const color = 'gray';
        const unattributed = i18nString(UIStrings.unattributed);
        const id = typeof node.id === 'symbol' ? undefined : node.id;
        const domainName = id ? this.domainByEvent(node.event) : undefined;
        return { name: domainName || unattributed, color, icon: undefined };
    }
    extractThirdPartySummary(node) {
        if (!this.#thirdPartySummaries) {
            return { transferSize: 0, mainThreadTime: Trace.Types.Timing.MicroSeconds(0) };
        }
        const entity = this.#thirdPartySummaries.entityByEvent.get(node.event);
        if (!entity) {
            return { transferSize: 0, mainThreadTime: Trace.Types.Timing.MicroSeconds(0) };
        }
        const summary = this.#thirdPartySummaries.summaries.byEntity.get(entity);
        if (!summary) {
            return { transferSize: 0, mainThreadTime: Trace.Types.Timing.MicroSeconds(0) };
        }
        return { transferSize: summary.transferSize, mainThreadTime: summary.mainThreadTime };
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
export class ThirdPartyTreeView extends UI.Widget.WidgetElement {
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
customElements.define('devtools-performance-third-party-tree-view', ThirdPartyTreeView);
//# sourceMappingURL=ThirdPartyTreeView.js.map