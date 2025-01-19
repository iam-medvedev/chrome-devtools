// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import * as Handlers from '../handlers/handlers.js';
import * as Helpers from '../helpers/helpers.js';
import * as Types from '../types/types.js';
import { InsightCategory } from './types.js';
const UIStrings = {
    /**
     * @description Title of an insight that recommends reducing the size of the DOM tree as a means to improve page responsiveness. "DOM" is an acronym and should not be translated.
     */
    title: 'Optimize DOM size',
    /**
     * @description Description of an insight that recommends reducing the size of the DOM tree as a means to improve page responsiveness. "DOM" is an acronym and should not be translated. "layout reflows" are when the browser will recompute the layout of content on the page.
     */
    description: 'A large DOM can increase the duration of style calculations and layout reflows, impacting page responsiveness. A large DOM will also increase memory usage. [Learn how to avoid an excessive DOM size](https://developer.chrome.com/docs/lighthouse/performance/dom-size/).',
};
const str_ = i18n.i18n.registerUIStrings('models/trace/insights/DOMSize.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const DOM_UPDATE_LIMIT = 800;
export function deps() {
    return ['Renderer', 'AuctionWorklets', 'DOMStats'];
}
function finalize(partialModel) {
    const relatedEvents = [...partialModel.largeLayoutUpdates, ...partialModel.largeStyleRecalcs];
    return {
        title: i18nString(UIStrings.title),
        description: i18nString(UIStrings.description),
        category: InsightCategory.INP,
        shouldShow: relatedEvents.length > 0,
        ...partialModel,
        relatedEvents,
    };
}
export function generateInsight(parsedTrace, context) {
    const isWithinContext = (event) => Helpers.Timing.eventIsInBounds(event, context.bounds);
    const mainTid = context.navigation?.tid;
    const largeLayoutUpdates = [];
    const largeStyleRecalcs = [];
    const threads = Handlers.Threads.threadsInRenderer(parsedTrace.Renderer, parsedTrace.AuctionWorklets);
    for (const thread of threads) {
        if (thread.type !== "MAIN_THREAD" /* Handlers.Threads.ThreadType.MAIN_THREAD */) {
            continue;
        }
        if (mainTid === undefined) {
            // We won't have a specific thread ID to reference if the context does not have a navigation.
            // In this case, we'll just filter out any OOPIFs threads.
            if (!thread.processIsOnMainFrame) {
                continue;
            }
        }
        else if (thread.tid !== mainTid) {
            continue;
        }
        const rendererThread = parsedTrace.Renderer.processes.get(thread.pid)?.threads.get(thread.tid);
        if (!rendererThread) {
            continue;
        }
        const { entries, layoutEvents, updateLayoutTreeEvents } = rendererThread;
        if (!entries.length) {
            continue;
        }
        const first = entries[0];
        const last = entries[entries.length - 1];
        const timeRange = Helpers.Timing.traceWindowFromMicroSeconds(first.ts, Types.Timing.MicroSeconds(last.ts + (last.dur ?? 0)));
        if (!Helpers.Timing.boundsIncludeTimeRange({ timeRange, bounds: context.bounds })) {
            continue;
        }
        for (const event of layoutEvents) {
            if (!isWithinContext(event)) {
                continue;
            }
            const { dirtyObjects } = event.args.beginData;
            if (dirtyObjects > DOM_UPDATE_LIMIT) {
                largeLayoutUpdates.push(event);
            }
        }
        for (const event of updateLayoutTreeEvents) {
            if (!isWithinContext(event)) {
                continue;
            }
            const { elementCount } = event.args;
            if (elementCount > DOM_UPDATE_LIMIT) {
                largeStyleRecalcs.push(event);
            }
        }
    }
    const domStatsEvents = parsedTrace.DOMStats.domStatsByFrameId.get(context.frameId)?.filter(isWithinContext) ?? [];
    let maxDOMStats;
    for (const domStats of domStatsEvents) {
        if (!maxDOMStats || domStats.args.data.totalElements > maxDOMStats.args.data.totalElements) {
            maxDOMStats = domStats;
        }
    }
    return finalize({
        largeLayoutUpdates,
        largeStyleRecalcs,
        maxDOMStats,
    });
}
//# sourceMappingURL=DOMSize.js.map