// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Platform from '../../../core/platform/platform.js';
import * as Helpers from '../helpers/helpers.js';
import * as Types from '../types/types.js';
export function deps() {
    return ['Meta', 'NetworkRequests', 'LayoutShifts'];
}
export function generateInsight(parsedTrace, context) {
    // TODO(b/366049346) make this work w/o a navigation.
    if (!context.navigation) {
        return { fonts: [] };
    }
    const remoteFontLoadEvents = [];
    for (const event of parsedTrace.LayoutShifts.beginRemoteFontLoadEvents) {
        const navigation = Helpers.Trace.getNavigationForTraceEvent(event, context.frameId, parsedTrace.Meta.navigationsByFrameId);
        if (navigation === context.navigation) {
            remoteFontLoadEvents.push(event);
        }
    }
    const fonts = [];
    for (const event of remoteFontLoadEvents) {
        const requestId = `${event.pid}.${event.args.id}`;
        const request = parsedTrace.NetworkRequests.byId.get(requestId);
        if (!request) {
            continue;
        }
        const display = event.args.display;
        let wastedTime = Types.Timing.MilliSeconds(0);
        if (/^(block|fallback|auto)$/.test(display)) {
            const wastedTimeMicro = Types.Timing.MicroSeconds(request.args.data.syntheticData.finishTime - request.args.data.syntheticData.sendStartTime);
            wastedTime = Platform.NumberUtilities.floor(Helpers.Timing.microSecondsToMilliseconds(wastedTimeMicro), 1 / 5);
        }
        fonts.push({
            request,
            display,
            wastedTime,
        });
    }
    return {
        fonts,
    };
}
//# sourceMappingURL=FontDisplay.js.map