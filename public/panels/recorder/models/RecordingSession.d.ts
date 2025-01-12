import * as Common from '../../../core/common/common.js';
import * as SDK from '../../../core/sdk/sdk.js';
import { type SelectorType, type UserFlow } from './Schema.js';
export declare class RecordingSession extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    #private;
    constructor(target: SDK.Target.Target, opts: {
        title: string;
        selectorTypesToRecord: SelectorType[];
        selectorAttribute?: string;
    });
    /**
     * @returns - A deep copy of the session's current user flow.
     */
    cloneUserFlow(): UserFlow;
    /**
     * Overwrites the session's current user flow with the given one.
     *
     * This method will not dispatch an `recordingupdated` event.
     */
    overwriteUserFlow(flow: Readonly<UserFlow>): void;
    start(): Promise<void>;
    stop(): Promise<void>;
}
export declare const enum Events {
    RECORDING_UPDATED = "recordingupdated",
    RECORDING_STOPPED = "recordingstopped"
}
interface EventTypes {
    [Events.RECORDING_UPDATED]: UserFlow;
    [Events.RECORDING_STOPPED]: UserFlow;
}
export {};
