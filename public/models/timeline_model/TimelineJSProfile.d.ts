import type * as Protocol from '../../generated/protocol.js';
import type * as CPUProfile from '../cpu_profile/cpu_profile.js';
import * as TraceEngine from '../trace/trace.js';
export declare class TimelineJSProfileProcessor {
    /**
     * Creates a synthetic instant trace event for each sample in a
     * profile.
     * Each sample contains its stack trace under its args.data property.
     * The stack trace is extracted from a CPUProfileModel instance
     * which contains the call hierarchy.
     */
    static generateConstructedEventsFromCpuProfileDataModel(jsProfileModel: CPUProfile.CPUProfileDataModel.CPUProfileDataModel, thread: TraceEngine.Legacy.Thread): TraceEngine.Legacy.Event[];
    static isJSSampleEvent(e: TraceEngine.Legacy.Event): boolean;
    /**
     * Creates the full call hierarchy, with durations, composed of trace
     * events and JavaScript function calls.
     *
     * Because JavaScript profiles come in the shape of samples with no
     * duration, JS function call durations are deduced using the timings
     * of subsequent equal samples and surrounding trace events.
     *
     * @param events merged ordered array of trace events and synthetic
     * "instant" events representing samples.
     * @param config flags to customize the shown events.
     * @returns the input event array with the new synthetic events
     * representing call frames.
     */
    static generateJSFrameEvents(events: TraceEngine.Legacy.Event[], config: {
        showAllEvents: boolean;
        showRuntimeCallStats: boolean;
        isDataOriginCpuProfile: boolean;
    }): TraceEngine.Legacy.Event[];
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
