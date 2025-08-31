import { type PerformanceAPIExtensionTestData } from '../../../testing/TraceHelpers.js';
import * as Trace from '../trace.js';
export declare function createTraceExtensionDataFromPerformanceAPITestInput(extensionData: PerformanceAPIExtensionTestData[]): Promise<Trace.Handlers.ModelHandlers.ExtensionTraceData.ExtensionTraceData>;
