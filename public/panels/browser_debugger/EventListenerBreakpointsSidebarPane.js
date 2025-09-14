// Copyright 2015 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import { CategorizedBreakpointsSidebarPane } from './CategorizedBreakpointsSidebarPane.js';
let eventListenerBreakpointsSidebarPaneInstance;
export class EventListenerBreakpointsSidebarPane extends CategorizedBreakpointsSidebarPane {
    constructor() {
        let breakpoints = SDK.DOMDebuggerModel.DOMDebuggerManager.instance().eventListenerBreakpoints();
        const nonDomBreakpoints = SDK.EventBreakpointsModel.EventBreakpointsManager.instance().eventListenerBreakpoints();
        breakpoints = breakpoints.concat(nonDomBreakpoints);
        super(breakpoints, `${VisualLogging.section('sources.event-listener-breakpoints')}`, 'sources.event-listener-breakpoints');
    }
    static instance() {
        if (!eventListenerBreakpointsSidebarPaneInstance) {
            eventListenerBreakpointsSidebarPaneInstance = new EventListenerBreakpointsSidebarPane();
        }
        return eventListenerBreakpointsSidebarPaneInstance;
    }
    getBreakpointFromPausedDetails(details) {
        const auxData = details.auxData;
        if (!auxData) {
            return null;
        }
        const domBreakpoint = auxData && SDK.DOMDebuggerModel.DOMDebuggerManager.instance().resolveEventListenerBreakpoint(auxData);
        if (domBreakpoint) {
            return domBreakpoint;
        }
        return SDK.EventBreakpointsModel.EventBreakpointsManager.instance().resolveEventListenerBreakpoint(auxData);
    }
}
//# sourceMappingURL=EventListenerBreakpointsSidebarPane.js.map