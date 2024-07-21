// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Types from '../types/types.js';
// Due to the way that DevTools throttling works we cannot see if server response took less than ~570ms.
// We set our failure threshold to 600ms to avoid those false positives but we want devs to shoot for 100ms.
const TOO_SLOW_THRESHOLD_MS = 600;
const TARGET_MS = 100;
export function deps() {
    return ['Meta', 'NetworkRequests'];
}
function getServerTiming(request) {
    const timing = request.args.data.timing;
    if (!timing) {
        return null;
    }
    return Types.Timing.MilliSeconds(Math.round(timing.receiveHeadersStart - timing.sendEnd));
}
export function generateInsight(traceParsedData, context) {
    const documentRequest = traceParsedData.NetworkRequests.byTime.find(req => req.args.data.requestId === context.navigationId);
    if (!documentRequest) {
        throw new Error('missing document request');
    }
    const serverResponseTime = getServerTiming(documentRequest);
    if (serverResponseTime === null) {
        throw new Error('missing document request timing');
    }
    let overallSavingsMs = 0;
    if (serverResponseTime > TOO_SLOW_THRESHOLD_MS) {
        overallSavingsMs = Math.max(serverResponseTime - TARGET_MS, 0);
    }
    const redirectDuration = Math.round(documentRequest.args.data.syntheticData.redirectionDuration / 1000);
    overallSavingsMs += redirectDuration;
    const metricSavings = {
        FCP: overallSavingsMs,
        LCP: overallSavingsMs,
    };
    return {
        serverResponseTime,
        redirectDuration: Types.Timing.MilliSeconds(redirectDuration),
        metricSavings,
    };
}
//# sourceMappingURL=DocumentLatency.js.map