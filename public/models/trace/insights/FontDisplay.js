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
    const fonts = [];
    for (const event of parsedTrace.LayoutShifts.beginRemoteFontLoadEvents) {
        if (!Helpers.Timing.eventIsInBounds(event, context.bounds)) {
            continue;
        }
        const requestId = `${event.pid}.${event.args.id}`;
        const request = parsedTrace.NetworkRequests.byId.get(requestId);
        if (!request) {
            continue;
        }
        const display = event.args.display;
        let wastedTime = Types.Timing.MilliSeconds(0);
        if (/^(block|fallback|auto)$/.test(display)) {
            const wastedTimeMicro = Types.Timing.MicroSeconds(request.args.data.syntheticData.finishTime - request.args.data.syntheticData.sendStartTime);
            // TODO(crbug.com/352244504): should really end at the time of the next Commit trace event.
            wastedTime = Platform.NumberUtilities.floor(Helpers.Timing.microSecondsToMilliseconds(wastedTimeMicro), 1 / 5);
            // All browsers wait for no more than 3s.
            wastedTime = Math.min(wastedTime, 3000);
        }
        fonts.push({
            request,
            display,
            wastedTime,
        });
    }
    fonts.sort((a, b) => b.wastedTime - a.wastedTime);
    return {
        fonts,
    };
}
//# sourceMappingURL=FontDisplay.js.map