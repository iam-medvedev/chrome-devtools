import type * as Protocol from '../../generated/protocol.js';
import * as Trace from '../trace/trace.js';
export declare class TimelineJSProfileProcessor {
    static isNativeRuntimeFrame(frame: Protocol.Runtime.CallFrame): boolean;
    static nativeGroup(nativeName: string): string | null;
    static createFakeTraceFromCpuProfile(profile: Protocol.Profiler.Profile, tid: Trace.Types.Events.ThreadID): Trace.Types.Events.Event[];
}
export declare namespace TimelineJSProfileProcessor {
    const enum NativeGroups {
        COMPILE = "Compile",
        PARSE = "Parse"
    }
}
