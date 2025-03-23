// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Helpers from '../helpers/helpers.js';
import * as Types from '../types/types.js';
import * as TraceFilter from './TraceFilter.js';
import * as TraceTree from './TraceTree.js';
/**
 *
 * Returns Main frame main thread events.
 * These events are inline with the ones used by selectedEvents() of TimelineTreeViews
 */
function collectMainThreadActivity(parsedTrace) {
    // TODO: Note b/402658800 could be an issue here.
    const mainFrameMainThread = parsedTrace.Renderer.processes.values()
        .find(p => {
        const url = p.url ?? '';
        // Frame url checked a la CompatibilityTracksAppenders's addThreadAppenders
        return p.isOnMainFrame && !url.startsWith('about:') && !url.startsWith('chrome:');
    })
        ?.threads.values()
        .find(t => t.name === 'CrRendererMain');
    if (!mainFrameMainThread) {
        return [];
    }
    return mainFrameMainThread.entries;
}
/**
 * @param networkRequests Won't be filtered by trace bounds, so callers should ensure it is filtered.
 */
export function summarizeThirdParties(parsedTrace, traceBounds) {
    const mainThreadEvents = collectMainThreadActivity(parsedTrace).sort(Helpers.Trace.eventTimeComparator);
    const node = getBottomUpTree(mainThreadEvents, parsedTrace, traceBounds);
    const summaries = summarizeBottomUp(node, parsedTrace);
    return summaries;
}
function summarizeBottomUp(thirdPartyBottomUp, parsedTrace) {
    const summaryForEntity = new Map();
    const summaries = [];
    // Our top nodes are the 3P entities.
    // Tree nodes are built lazily, .children() is essential, it triggers the
    // construction of the root node's child nodes.
    const topNodes = [...thirdPartyBottomUp.children().values()].flat();
    for (const node of topNodes) {
        if (node.id === '') {
            continue;
        }
        const entity = parsedTrace.Renderer.entityMappings.entityByEvent.get(node.event);
        if (!entity) {
            continue;
        }
        const summary = {
            transferSize: node.transferSize,
            mainThreadTime: Types.Timing.Milli(node.selfTime),
            // Lets use the mapper events as our source of events, since we use the main thread to construct
            // the bottom up tree. The mapper will give us all related events.
            relatedEvents: parsedTrace.Renderer.entityMappings.eventsByEntity.get(entity) ?? [],
            entity,
        };
        summaryForEntity.set(entity, summary);
        summaries.push(summary);
    }
    return summaries;
}
function getBottomUpTree(mainThreadEvents, parsedTrace, tracebounds) {
    const mappings = parsedTrace.Renderer.entityMappings;
    const groupingFunction = (event) => {
        const entity = mappings?.entityByEvent.get(event);
        return entity?.name ?? '';
    };
    // Use the same filtering as front_end/panels/timeline/TimelineTreeView.ts.
    const visibleEvents = Helpers.Trace.VISIBLE_TRACE_EVENT_TYPES.values().toArray();
    const filter = new TraceFilter.VisibleEventsFilter(visibleEvents.concat(["SyntheticNetworkRequest" /* Types.Events.Name.SYNTHETIC_NETWORK_REQUEST */]));
    // The bottom up root node handles all the "in Tracebounds" checks we need for the insight.
    const startTime = Helpers.Timing.microToMilli(tracebounds.min);
    const endTime = Helpers.Timing.microToMilli(tracebounds.max);
    const node = new TraceTree.BottomUpRootNode(mainThreadEvents, {
        textFilter: new TraceFilter.ExclusiveNameFilter([]),
        filters: [filter],
        startTime,
        endTime,
        eventGroupIdCallback: groupingFunction,
        calculateTransferSize: true,
        // Ensure we group by 3P alongside eventID for correct 3P grouping.
        forceGroupIdCallback: true,
    });
    return node;
}
//# sourceMappingURL=ThirdParties.js.map