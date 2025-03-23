import * as Trace from '../trace.js';
export interface PerformanceAPIExtensionTestData {
    detail: {
        devtools?: Trace.Types.Extensions.ExtensionDataPayload;
    };
    name: string;
    ts: number;
    dur?: number;
}
export interface ConsoleAPIExtensionTestData {
    name: string;
    start?: string | number;
    end?: string | number;
    track?: string;
    trackGroup?: string;
    color?: string;
    ts: number;
}
export declare function createTraceExtensionDataFromPerformanceAPITestInput(extensionData: PerformanceAPIExtensionTestData[]): Promise<Trace.Handlers.ModelHandlers.ExtensionTraceData.ExtensionTraceData>;
