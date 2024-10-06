import * as Trace from '../trace.js';
export type ExtensionTestData = {
    detail: {
        devtools?: Trace.Types.Extensions.ExtensionDataPayload;
    };
    name: string;
    ts: number;
    dur?: number;
};
export declare function createTraceExtensionDataFromTestInput(extensionData: ExtensionTestData[]): Promise<Trace.Handlers.ModelHandlers.ExtensionTraceData.ExtensionTraceData>;
