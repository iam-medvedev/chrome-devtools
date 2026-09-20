import { type ConsoleAPIExtensionTestData, type PerformanceAPIExtensionTestData } from '../../../testing/TraceHelpersCore.js';
import * as Trace from '../trace.js';
export declare function createEventDataFromTestInput(extensionData: Array<PerformanceAPIExtensionTestData | ConsoleAPIExtensionTestData>): Promise<Trace.Handlers.ModelHandlers.UserTimings.UserTimingsData>;
