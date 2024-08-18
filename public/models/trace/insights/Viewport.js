// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Helpers from '../helpers/helpers.js';
import { InsightWarning } from './types.js';
export function deps() {
    return ['Meta', 'UserInteractions'];
}
export function generateInsight(traceParsedData, context) {
    const compositorEvents = traceParsedData.UserInteractions.beginCommitCompositorFrameEvents.filter(event => {
        if (event.args.frame !== context.frameId) {
            return false;
        }
        const navigation = Helpers.Trace.getNavigationForTraceEvent(event, context.frameId, traceParsedData.Meta.navigationsByFrameId);
        if (navigation?.args.data?.navigationId !== context.navigationId) {
            return false;
        }
        return true;
    });
    if (!compositorEvents.length) {
        // Trace doesn't have the data we need.
        return {
            mobileOptimized: null,
            warnings: [InsightWarning.NO_LAYOUT],
        };
    }
    const viewportEvent = traceParsedData.UserInteractions.parseMetaViewportEvents.find(event => {
        if (event.args.data.frame !== context.frameId) {
            return false;
        }
        const navigation = Helpers.Trace.getNavigationForTraceEvent(event, context.frameId, traceParsedData.Meta.navigationsByFrameId);
        if (navigation?.args.data?.navigationId !== context.navigationId) {
            return false;
        }
        return true;
    });
    const content = viewportEvent?.args.data.content;
    const nodeId = viewportEvent?.args.data.node_id;
    // Returns true only if all events are mobile optimized.
    for (const event of compositorEvents) {
        if (!event.args.is_mobile_optimized) {
            return {
                mobileOptimized: false,
                content,
                nodeId,
            };
        }
    }
    return {
        mobileOptimized: true,
        content,
        nodeId,
    };
}
//# sourceMappingURL=Viewport.js.map