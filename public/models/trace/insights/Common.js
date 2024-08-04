// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Helpers from '../helpers/helpers.js';
export function findLCPRequest(traceData, context, lcpEvent) {
    const lcpNodeId = lcpEvent.args.data?.nodeId;
    if (!lcpNodeId) {
        throw new Error('no lcp node id');
    }
    const imagePaint = traceData.LargestImagePaint.get(lcpNodeId);
    if (!imagePaint) {
        return null;
    }
    const lcpUrl = imagePaint.args.data?.imageUrl;
    if (!lcpUrl) {
        throw new Error('no lcp url');
    }
    // Look for the LCP request.
    const lcpRequest = traceData.NetworkRequests.byTime.find(req => {
        const nav = Helpers.Trace.getNavigationForTraceEvent(req, context.frameId, traceData.Meta.navigationsByFrameId);
        return (nav?.args.data?.navigationId === context.navigationId) && (req.args.data.url === lcpUrl);
    });
    if (!lcpRequest) {
        throw new Error('no lcp request found');
    }
    return lcpRequest;
}
//# sourceMappingURL=Common.js.map