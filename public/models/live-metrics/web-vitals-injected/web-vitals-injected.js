// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as WebVitals from '../../../third_party/web-vitals/web-vitals.js';
import * as OnEachInteraction from './OnEachInteraction.js';
import * as Spec from './spec/spec.js';
const { onLCP, onCLS, onINP } = WebVitals.Attribution;
const { onEachInteraction } = OnEachInteraction;
const windowListeners = [];
const documentListeners = [];
const observers = [];
const originalWindowAddListener = Window.prototype.addEventListener;
Window.prototype.addEventListener = function (...args) {
    windowListeners.push(args);
    return originalWindowAddListener.call(this, ...args);
};
const originalDocumentAddListener = Document.prototype.addEventListener;
Document.prototype.addEventListener = function (...args) {
    documentListeners.push(args);
    return originalDocumentAddListener.call(this, ...args);
};
class InternalPerformanceObserver extends PerformanceObserver {
    constructor(...args) {
        super(...args);
        observers.push(this);
    }
}
globalThis.PerformanceObserver = InternalPerformanceObserver;
let killed = false;
/**
 * This is a hack solution to remove any listeners that were added by web-vitals.js
 * or additional services in this bundle. Once this function is called, the execution
 * context should be considered dead and a new one will need to be created for live metrics
 * to be served again.
 */
window[Spec.INTERNAL_KILL_SWITCH] = () => {
    if (killed) {
        return;
    }
    for (const observer of observers) {
        observer.disconnect();
    }
    for (const args of windowListeners) {
        window.removeEventListener(...args);
    }
    for (const args of documentListeners) {
        document.removeEventListener(...args);
    }
    killed = true;
};
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
function initialize() {
    sendEventToDevTools({ name: 'reset' });
    // We want to treat bfcache navigations like a standard navigations, so emit
    // a reset event when bfcache is restored.
    //
    // Metric functions will also re-emit their values using this listener's callback.
    // To ensure this event is fired before those values are emitted, register this
    // callback before any others.
    WebVitals.onBFCacheRestore(() => {
        sendEventToDevTools({ name: 'reset' });
    });
    onLCP(metric => {
        const event = {
            name: 'LCP',
            value: metric.value,
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
        };
        sendEventToDevTools(event);
    }, { reportAllChanges: true });
    onINP(metric => {
        const event = {
            name: 'INP',
            value: metric.value,
            interactionType: metric.attribution.interactionType,
        };
        const element = metric.attribution.interactionTargetElement;
        if (element) {
            event.nodeIndex = establishNodeIndex(element);
        }
        sendEventToDevTools(event);
    }, { reportAllChanges: true });
    onEachInteraction(interaction => {
        const event = {
            name: 'Interaction',
            duration: interaction.value,
            interactionId: interaction.attribution.interactionId,
            interactionType: interaction.attribution.interactionType,
        };
        const node = interaction.attribution.interactionTargetElement;
        if (node) {
            event.nodeIndex = establishNodeIndex(node);
        }
        sendEventToDevTools(event);
    });
}
initialize();
//# sourceMappingURL=web-vitals-injected.js.map