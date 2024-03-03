// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../core/host/host.js';
import { assertNotNullOrUndefined } from '../../core/platform/platform.js';
import { getLoggingState } from './LoggingState.js';
export async function logImpressions(loggables) {
    const impressions = await Promise.all(loggables.map(async (loggable) => {
        const loggingState = getLoggingState(loggable);
        assertNotNullOrUndefined(loggingState);
        const impression = { id: loggingState.veid, type: loggingState.config.ve };
        if (loggingState.parent) {
            impression.parent = loggingState.parent.veid;
        }
        const context = await loggingState.context(loggable);
        if (context) {
            impression.context = context;
        }
        if (loggingState.size) {
            impression.width = loggingState.size.width;
            impression.height = loggingState.size.height;
        }
        return impression;
    }));
    if (impressions.length) {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.recordImpression({ impressions });
    }
}
export async function logResize(loggable, size, resizeLogThrottler) {
    const loggingState = getLoggingState(loggable);
    if (!loggingState) {
        return;
    }
    loggingState.size = size;
    const resizeEvent = { veid: loggingState.veid, width: loggingState.size.width, height: loggingState.size.height };
    if (resizeLogThrottler) {
        await resizeLogThrottler.schedule(async () => {
            Host.InspectorFrontendHost.InspectorFrontendHostInstance.recordResize(resizeEvent);
        });
    }
    else {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.recordResize(resizeEvent);
    }
}
export async function logClick(loggable, event, options) {
    const loggingState = getLoggingState(loggable);
    if (!loggingState) {
        return;
    }
    const button = event instanceof MouseEvent ? event.button : 0;
    const clickEvent = { veid: loggingState.veid, mouseButton: button, doubleClick: Boolean(options?.doubleClick) };
    const context = await loggingState.context(event);
    if (context) {
        clickEvent.context = context;
    }
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.recordClick(clickEvent);
}
export const logHover = (hoverLogThrottler) => async (event) => {
    const loggingState = getLoggingState(event.currentTarget);
    assertNotNullOrUndefined(loggingState);
    const hoverEvent = { veid: loggingState.veid };
    const contextPromise = loggingState.context(event);
    await hoverLogThrottler.schedule(async () => {
        const context = await contextPromise;
        if (context) {
            hoverEvent.context = context;
        }
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.recordHover(hoverEvent);
    });
};
export const logDrag = (dragLogThrottler) => async (event) => {
    const loggingState = getLoggingState(event.currentTarget);
    assertNotNullOrUndefined(loggingState);
    const dragEvent = { veid: loggingState.veid };
    const contextPromise = loggingState.context(event);
    await dragLogThrottler.schedule(async () => {
        const context = await contextPromise;
        if (context) {
            dragEvent.context = context;
        }
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.recordDrag(dragEvent);
    });
};
export async function logChange(event) {
    const loggingState = getLoggingState(event.currentTarget);
    assertNotNullOrUndefined(loggingState);
    const changeEvent = { veid: loggingState.veid };
    const context = await loggingState.context(event);
    if (context) {
        changeEvent.context = context;
    }
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.recordChange(changeEvent);
}
export const logKeyDown = (codes, keyboardLogThrottler) => async (event) => {
    if (!(event instanceof KeyboardEvent)) {
        return;
    }
    if (codes.length && !codes.includes(event.code)) {
        return;
    }
    const loggingState = getLoggingState(event.currentTarget);
    assertNotNullOrUndefined(loggingState);
    const keyDownEvent = { veid: loggingState.veid };
    const context = await loggingState.context(event);
    if (context) {
        keyDownEvent.context = context;
    }
    await keyboardLogThrottler.schedule(async () => {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.recordKeyDown(keyDownEvent);
    });
};
//# sourceMappingURL=LoggingEvents.js.map