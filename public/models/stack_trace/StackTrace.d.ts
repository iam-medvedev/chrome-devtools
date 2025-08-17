import type * as Common from '../../core/common/common.js';
import type * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import type * as Workspace from '../workspace/workspace.js';
export interface Factory {
    createFromProtocolRuntime(stackTrace: Protocol.Runtime.StackTrace, target: SDK.Target.Target): Promise<StackTrace>;
}
export interface StackTrace extends Common.EventTarget.EventTarget<EventTypes> {
    readonly syncFragment: Fragment;
    readonly asyncFragments: readonly AsyncFragment[];
}
export interface Fragment {
    readonly frames: readonly Frame[];
}
export interface AsyncFragment extends Fragment {
    readonly description: string;
}
export interface Frame {
    readonly url?: string;
    readonly uiSourceCode?: Workspace.UISourceCode.UISourceCode;
    readonly name?: string;
    readonly line: number;
    readonly column: number;
}
export declare const enum Events {
    UPDATED = "UPDATED"
}
export interface EventTypes {
    [Events.UPDATED]: void;
}
