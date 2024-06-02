// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as WebVitals from '../../../third_party/web-vitals/web-vitals.js';
import * as Spec from './spec/spec.js';
const { onLCP, onCLS, onINP } = WebVitals.Attribution;
function sendEventToDevTools(event) {
    const payload = JSON.stringify(event);
    window[Spec.EVENT_BINDING_NAME](payload);
}
const nodeList = [];
function establishNodeIndex(node) {
    const index = nodeList.length;
    nodeList.push(node);
    return index;
}
/**
 * The data sent over the event binding needs to be JSON serializable, so we
 * can't send DOM nodes directly. Instead we create an ID for each node (see
 * `establishNodeIndex`) that we can later use to retrieve a remote object
 * for that node.
 *
 * This function is used by `Runtime.evaluate` calls to get a remote object
 * for the specified index.
 */
window.getNodeForIndex = (index) => {
    return nodeList[index];
};
function inIframe() {
    try {
        return window.self !== window.top;
    }
    catch {
        return true;
    }
}
function initialize() {
    // `Page.addScriptToEvaluateOnNewDocument` will create a script that runs
    // in all frames. We only want metrics from the main frame so the filter
    // has to be here.
    if (inIframe()) {
        return;
    }
    sendEventToDevTools({ name: 'reset' });
    onLCP(metric => {
        const event = {
            name: 'LCP',
            value: metric.value,
            rating: metric.rating,
        };
        const element = metric.attribution.lcpEntry?.element;
        if (element) {
            event.nodeIndex = establishNodeIndex(element);
        }
        sendEventToDevTools(event);
    }, { reportAllChanges: true });
    onCLS(metric => {
        const event = {
            name: 'CLS',
            value: metric.value,
            rating: metric.rating,
        };
        sendEventToDevTools(event);
    }, { reportAllChanges: true });
    onINP(metric => {
        const event = {
            name: 'INP',
            value: metric.value,
            rating: metric.rating,
            interactionType: metric.attribution.interactionType,
        };
        const element = metric.attribution.interactionTargetElement;
        if (element) {
            event.nodeIndex = establishNodeIndex(element);
        }
        sendEventToDevTools(event);
    }, { reportAllChanges: true });
}
initialize();
//# sourceMappingURL=web-vitals-injected.js.map