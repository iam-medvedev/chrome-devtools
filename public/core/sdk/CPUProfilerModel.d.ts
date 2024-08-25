import type * as ProtocolProxyApi from '../../generated/protocol-proxy-api.js';
import type * as Protocol from '../../generated/protocol.js';
import { DebuggerModel, Location } from './DebuggerModel.js';
import { type RuntimeModel } from './RuntimeModel.js';
import { type Target } from './Target.js';
import { SDKModel } from './SDKModel.js';
export declare class CPUProfilerModel extends SDKModel<EventTypes> implements ProtocolProxyApi.ProfilerDispatcher {
    #private;
    readonly registeredConsoleProfileMessages: ProfileFinishedData[];
    constructor(target: Target);
    runtimeModel(): RuntimeModel;
    debuggerModel(): DebuggerModel;
    consoleProfileStarted({ id, location, title }: Protocol.Profiler.ConsoleProfileStartedEvent): void;
    consoleProfileFinished({ id, location, profile, title }: Protocol.Profiler.ConsoleProfileFinishedEvent): void;
    private createEventDataFrom;
    isRecordingProfile(): boolean;
    startRecording(): Promise<unknown>;
    stopRecording(): Promise<Protocol.Profiler.Profile | null>;
    startPreciseCoverage(jsCoveragePerBlock: boolean, preciseCoverageDeltaUpdateCallback: ((arg0: number, arg1: string, arg2: Array<Protocol.Profiler.ScriptCoverage>) => Promise<void>) | null): Promise<unknown>;
    takePreciseCoverage(): Promise<{
        timestamp: number;
        coverage: Array<Protocol.Profiler.ScriptCoverage>;
    }>;
    stopPreciseCoverage(): Promise<unknown>;
    preciseCoverageDeltaUpdate({ timestamp, occasion, result }: Protocol.Profiler.PreciseCoverageDeltaUpdateEvent): void;
}
export declare const enum Events {
    CONSOLE_PROFILE_STARTED = "ConsoleProfileStarted",
    CONSOLE_PROFILE_FINISHED = "ConsoleProfileFinished"
}
export type EventTypes = {
    [Events.CONSOLE_PROFILE_STARTED]: EventData;
    [Events.CONSOLE_PROFILE_FINISHED]: ProfileFinishedData;
};
export interface EventData {
    id: string;
    scriptLocation: Location;
    title: string;
    cpuProfilerModel: CPUProfilerModel;
}
export interface ProfileFinishedData extends EventData {
    cpuProfile: Protocol.Profiler.Profile;
}
