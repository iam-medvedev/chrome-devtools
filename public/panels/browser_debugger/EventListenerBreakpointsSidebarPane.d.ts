import * as SDK from '../../core/sdk/sdk.js';
import { CategorizedBreakpointsSidebarPane } from './CategorizedBreakpointsSidebarPane.js';
export declare class EventListenerBreakpointsSidebarPane extends CategorizedBreakpointsSidebarPane {
    #private;
    constructor(eventBreakpointsManager: SDK.EventBreakpointsModel.EventBreakpointsManager);
    getBreakpointFromPausedDetails(details: SDK.DebuggerModel.DebuggerPausedDetails): SDK.CategorizedBreakpoint.CategorizedBreakpoint | null;
}
