// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Trace from '../models/trace/trace.js';
import { TraceLoader } from './TraceLoader.js';
export async function processTrace(context, traceFile) {
    const { parsedTrace, insights, metadata } = await TraceLoader.traceEngine(context, traceFile);
    if (!insights) {
        throw new Error('No insights');
    }
    return { data: parsedTrace, insights, metadata };
}
export function createContextForNavigation(parsedTrace, navigation, frameId) {
    if (!navigation.args.data?.navigationId) {
        throw new Error('expected navigationId');
    }
    const navigationIndex = parsedTrace.Meta.mainFrameNavigations.indexOf(navigation);
    if (navigationIndex === -1) {
        throw new Error('unexpected navigation');
    }
    const min = navigation.ts;
    const max = navigationIndex + 1 < parsedTrace.Meta.mainFrameNavigations.length ?
        parsedTrace.Meta.mainFrameNavigations[navigationIndex + 1].ts :
        parsedTrace.Meta.traceBounds.max;
    const bounds = Trace.Helpers.Timing.traceWindowFromMicroSeconds(min, max);
    return {
        bounds,
        frameId,
        navigation,
        navigationId: navigation.args.data?.navigationId,
    };
}
export function getInsightOrError(insightName, insights, navigation) {
    let key;
    if (navigation) {
        if (!navigation.args.data?.navigationId) {
            throw new Error('expected navigationId');
        }
        key = navigation.args.data.navigationId;
    }
    else {
        key = Trace.Types.Events.NO_NAVIGATION;
    }
    const insightSets = insights.get(key);
    if (!insightSets) {
        throw new Error(`Could not find Insights for navigation ${key}. If you are trying to load an Insight for a particular navigation, you must supply it as an argument to \`getInsightOrError\``);
    }
    const insight = insightSets.model[insightName];
    if (insight instanceof Error) {
        throw insight;
    }
    return insight;
}
export function getFirstOrError(iterator) {
    const result = iterator.next();
    if (result.done || result.value === undefined) {
        throw new Error('iterator has zero values');
    }
    return result.value;
}
export function getFirst(iterator) {
    return iterator.next().value;
}
//# sourceMappingURL=InsightHelpers.js.map