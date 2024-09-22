// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Helpers from '../helpers/helpers.js';
/**
 * Finds a network request given a navigation context and URL.
 * Considers redirects.
 */
export function findRequest(parsedTrace, context, url) {
    const request = parsedTrace.NetworkRequests.byTime.find(req => {
        const urlMatch = req.args.data.url === url || req.args.data.redirects.some(r => r.url === url);
        if (!urlMatch) {
            return false;
        }
        const nav = Helpers.Trace.getNavigationForTraceEvent(req, context.frameId, parsedTrace.Meta.navigationsByFrameId);
        return nav === context.navigation;
    });
    return request ?? null;
}
export function findLCPRequest(parsedTrace, context, lcpEvent) {
    const lcpNodeId = lcpEvent.args.data?.nodeId;
    if (!lcpNodeId) {
        throw new Error('no lcp node id');
    }
    const imagePaint = parsedTrace.LargestImagePaint.get(lcpNodeId);
    if (!imagePaint) {
        return null;
    }
    const lcpUrl = imagePaint.args.data?.imageUrl;
    if (!lcpUrl) {
        throw new Error('no lcp url');
    }
    const lcpRequest = findRequest(parsedTrace, context, lcpUrl);
    if (!lcpRequest) {
        throw new Error('no lcp request found');
    }
    return lcpRequest;
}
//# sourceMappingURL=Common.js.map