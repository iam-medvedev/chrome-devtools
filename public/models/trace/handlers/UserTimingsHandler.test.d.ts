import { type ConsoleAPIExtensionTestData, type PerformanceAPIExtensionTestData } from '../../../testing/TraceHelpers.js';
import * as Trace from '../trace.js';
export declare function createEventDataFromTestInput(extensionData: Array<PerformanceAPIExtensionTestData | ConsoleAPIExtensionTestData>): Promise<Trace.Handlers.ModelHandlers.UserTimings.UserTimingsData>;
