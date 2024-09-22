// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Helpers from '../helpers/helpers.js';
import { InsightWarning } from './types.js';
export function deps() {
    return ['Meta', 'UserInteractions'];
}
export function generateInsight(parsedTrace, context) {
    // TODO(crbug.com/366049346)
    if (!context.navigation) {
        return { mobileOptimized: null };
    }
    const compositorEvents = parsedTrace.UserInteractions.beginCommitCompositorFrameEvents.filter(event => {
        if (event.args.frame !== context.frameId) {
            return false;
        }
        const navigation = Helpers.Trace.getNavigationForTraceEvent(event, context.frameId, parsedTrace.Meta.navigationsByFrameId);
        return navigation === context.navigation;
    });
    if (!compositorEvents.length) {
        // Trace doesn't have the data we need.
        return {
            mobileOptimized: null,
            warnings: [InsightWarning.NO_LAYOUT],
        };
    }
    const viewportEvent = parsedTrace.UserInteractions.parseMetaViewportEvents.find(event => {
        if (event.args.data.frame !== context.frameId) {
            return false;
        }
        const navigation = Helpers.Trace.getNavigationForTraceEvent(event, context.frameId, parsedTrace.Meta.navigationsByFrameId);
        return navigation === context.navigation;
    });
    // Returns true only if all events are mobile optimized.
    for (const event of compositorEvents) {
        if (!event.args.is_mobile_optimized) {
            return {
                mobileOptimized: false,
                viewportEvent,
            };
        }
    }
    return {
        mobileOptimized: true,
        viewportEvent,
    };
}
//# sourceMappingURL=Viewport.js.map