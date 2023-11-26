// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import { assertNotNullOrUndefined } from '../../core/platform/platform.js';
import * as Coordinator from '../components/render_coordinator/render_coordinator.js';
import { getDomState, isVisible } from './DomState.js';
import { debugString, getLoggingConfig } from './LoggingConfig.js';
import { logChange, logClick, logDrag, logHover, logImpressions, logKeyDown } from './LoggingEvents.js';
import { getOrCreateLoggingState } from './LoggingState.js';
const PROCESS_DOM_INTERVAL = 500;
const KEYBOARD_LOG_INTERVAL = 3000;
const HOVER_LOG_INTERVAL = 1000;
const DRAG_LOG_INTERVAL = 500;
let domProcessingThrottler;
let keyboardLogThrottler;
let hoverLogThrottler;
let dragLogThrottler;
let bodyMutationObserver;
function observeMutations(root) {
    const mutationObserver = new MutationObserver(scheduleProcessDom);
    mutationObserver.observe(root, { attributes: true, childList: true, subtree: true });
    return mutationObserver;
}
export async function startLogging(options) {
    domProcessingThrottler = options?.domProcessingThrottler || new Common.Throttler.Throttler(PROCESS_DOM_INTERVAL);
    keyboardLogThrottler = options?.keyboardLogThrottler || new Common.Throttler.Throttler(KEYBOARD_LOG_INTERVAL);
    hoverLogThrottler = options?.hoverLogThrottler || new Common.Throttler.Throttler(HOVER_LOG_INTERVAL);
    dragLogThrottler = options?.dragLogThrottler || new Common.Throttler.Throttler(DRAG_LOG_INTERVAL);
    if (['interactive', 'complete'].includes(document.readyState)) {
        await processDom();
    }
    document.addEventListener('visibilitychange', scheduleProcessDom);
    document.addEventListener('scroll', scheduleProcessDom);
    bodyMutationObserver = observeMutations(document.body);
}
export function stopLogging() {
    document.removeEventListener('visibilitychange', scheduleProcessDom);
    document.removeEventListener('scroll', scheduleProcessDom);
    bodyMutationObserver?.disconnect();
    bodyMutationObserver = null;
    const { shadowRoots } = getDomState();
    for (const shadowRoot of shadowRoots) {
        observedShadowRoots.get(shadowRoot)?.disconnect();
    }
}
function scheduleProcessDom() {
    void domProcessingThrottler.schedule(() => Coordinator.RenderCoordinator.RenderCoordinator.instance().read('processDomForLogging', processDom));
}
const observedShadowRoots = new WeakMap();
function observeMutationsInShadowRoots(shadowRoots) {
    for (const shadowRoot of shadowRoots) {
        if (!observedShadowRoots.has(shadowRoot)) {
            const observer = observeMutations(shadowRoot);
            observedShadowRoots.set(shadowRoot, observer);
        }
    }
}
let veDebuggingEnabled = false;
let debugPopover = null;
function setVeDebuggingEnabled(enabled) {
    veDebuggingEnabled = enabled;
    if (enabled && !debugPopover) {
        debugPopover = document.createElement('div');
        debugPopover.style.position = 'absolute';
        debugPopover.style.bottom = '100px';
        debugPopover.style.left = '100px';
        debugPopover.style.background = 'black';
        debugPopover.style.color = 'white';
        debugPopover.style.zIndex = '100000';
        document.body.appendChild(debugPopover);
    }
}
// @ts-ignore
globalThis.setVeDebuggingEnabled = setVeDebuggingEnabled;
async function processDom() {
    if (document.hidden) {
        return;
    }
    const startTime = performance.now();
    const { loggables, shadowRoots } = getDomState();
    const visibleElements = [];
    const viewportRect = new DOMRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);
    observeMutationsInShadowRoots(shadowRoots);
    for (const { element, parent } of loggables) {
        const loggingState = getOrCreateLoggingState(element, getLoggingConfig(element), parent);
        if (!loggingState.impressionLogged) {
            if (isVisible(element, viewportRect)) {
                visibleElements.push(element);
                loggingState.impressionLogged = true;
            }
        }
        if (!loggingState.processed) {
            if (loggingState.config.track?.has('click')) {
                element.addEventListener('click', e => logClick(e.currentTarget, e), { capture: true });
            }
            if (loggingState.config.track?.has('dblclick')) {
                element.addEventListener('dblclick', e => logClick(e.currentTarget, e, { doubleClick: true }), { capture: true });
            }
            const trackHover = loggingState.config.track?.has('hover');
            if (trackHover) {
                element.addEventListener('mouseover', logHover(hoverLogThrottler), { capture: true });
                const cancelLogging = () => Promise.resolve();
                element.addEventListener('mouseout', () => hoverLogThrottler.schedule(cancelLogging), { capture: true });
            }
            const trackDrag = loggingState.config.track?.has('drag');
            if (trackDrag) {
                element.addEventListener('pointerdown', logDrag(dragLogThrottler), { capture: true });
                const cancelLogging = () => Promise.resolve();
                element.addEventListener('pointerup', () => dragLogThrottler.schedule(cancelLogging), { capture: true });
            }
            if (loggingState.config.track?.has('change')) {
                element.addEventListener('change', logChange, { capture: true });
            }
            const trackKeyDown = loggingState.config.track?.has('keydown');
            const codes = loggingState.config.track?.get('keydown')?.split(',') || [];
            if (trackKeyDown) {
                element.addEventListener('keydown', logKeyDown(codes, keyboardLogThrottler), { capture: true });
            }
            loggingState.processed = true;
        }
        if (veDebuggingEnabled && !loggingState.processedForDebugging) {
            element.style.outline = 'solid 1px red';
            element.addEventListener('mouseenter', () => {
                assertNotNullOrUndefined(debugPopover);
                debugPopover.style.display = 'block';
                const pathToRoot = [loggingState];
                let ancestor = loggingState.parent;
                while (ancestor) {
                    pathToRoot.push(ancestor);
                    ancestor = ancestor.parent;
                }
                debugPopover.innerHTML = pathToRoot.map(s => debugString(s.config)).join('<br>');
            }, { capture: true });
            element.addEventListener('mouseleave', () => {
                assertNotNullOrUndefined(debugPopover);
                debugPopover.style.display = 'none';
            }, { capture: true });
            loggingState.processedForDebugging = true;
        }
    }
    await logImpressions(visibleElements);
    Host.userMetrics.visualLoggingProcessingDone(performance.now() - startTime);
}
//# sourceMappingURL=LoggingDriver.js.map