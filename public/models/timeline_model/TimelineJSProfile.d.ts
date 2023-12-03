import type * as Protocol from '../../generated/protocol.js';
import * as TraceEngine from '../trace/trace.js';
export declare class TimelineJSProfileProcessor {
    static isNativeRuntimeFrame(frame: Protocol.Runtime.CallFrame): boolean;
    static nativeGroup(nativeName: string): string | null;
    static createFakeTraceFromCpuProfile(profile: any, tid: number, injectPageEvent: boolean, name?: string | null): TraceEngine.TracingManager.EventPayload[];
}
export declare namespace TimelineJSProfileProcessor {
    enum NativeGroups {
        Compile = "Compile",
        Parse = "Parse"
    }
}
