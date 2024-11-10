// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Types from '../types/types.js';
import { data as metaData } from './MetaHandler.js';
import { data as networkRequestsData } from './NetworkRequestsHandler.js';
/**
 * If the LCP resource was an image, and that image was fetched over the
 * network, we want to be able to find the network request in order to construct
 * the critical path for an LCP image.
 * Within the trace file there are `LargestImagePaint::Candidate` events.
 * Within their data object, they contain a `DOMNodeId` property, which maps to
 * the DOM Node ID for that image.
 *
 * This id maps exactly to the `data.nodeId` property that a
 * `LargestContentfulPaint::Candidate` will have. So, when we find an image
 * paint candidate, we can store it, keying it on the node ID.
 * Then, when it comes to finding the network request for an LCP image, we can
 *
 * use the nodeId from the LCP candidate to find the image candidate. That image
 * candidate also contains a `imageUrl` property, which will have the full URL
 * to the image.
 **/
const imageByDOMNodeId = new Map();
const lcpRequestByNavigation = new Map();
const lcpPaintEventByNavigation = new Map();
let currentNavigation;
export function reset() {
    imageByDOMNodeId.clear();
    lcpRequestByNavigation.clear();
    lcpPaintEventByNavigation.clear();
    currentNavigation = null;
}
export function handleEvent(event) {
    if (Types.Events.isNavigationStart(event)) {
        currentNavigation = event;
        return;
    }
    if (!Types.Events.isLargestImagePaintCandidate(event)) {
        return;
    }
    if (!event.args.data) {
        return;
    }
    imageByDOMNodeId.set(event.args.data.DOMNodeId, event);
    lcpPaintEventByNavigation.set(currentNavigation, event);
}
export async function finalize() {
    const requests = networkRequestsData().byTime;
    const traceBounds = metaData().traceBounds;
    for (const [navigation, event] of lcpPaintEventByNavigation) {
        const lcpUrl = event.args.data?.imageUrl;
        if (!lcpUrl) {
            continue;
        }
        const startTime = navigation?.ts ?? traceBounds.min;
        const endTime = event.ts;
        let lcpRequest;
        for (const request of requests) {
            if (request.ts < startTime) {
                continue;
            }
            if (request.ts >= endTime) {
                break;
            }
            if (request.args.data.url === lcpUrl || request.args.data.redirects.some(r => r.url === lcpUrl)) {
                lcpRequest = request;
                break;
            }
        }
        if (lcpRequest) {
            lcpRequestByNavigation.set(navigation, lcpRequest);
        }
    }
}
export function data() {
    return { imageByDOMNodeId, lcpRequestByNavigation };
}
export function deps() {
    return ['Meta', 'NetworkRequests'];
}
//# sourceMappingURL=LargestImagePaintHandler.js.map