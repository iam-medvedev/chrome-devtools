import type * as Trace from '../../models/trace/trace.js';
type ExtensionData = Trace.Handlers.ModelHandlers.ExtensionTraceData.ExtensionTraceData;
/**
 * This class abstracts the source of extension data out by providing a
 * single access point to the performance panel for extension data.
 */
export declare class ExtensionDataGatherer {
    #private;
    static instance(): ExtensionDataGatherer;
    static removeInstance(): void;
    /**
     * Gets the data provided by extensions.
     */
    getExtensionData(): ExtensionData;
    saveCurrentModelData(): void;
    modelChanged(parsedTrace: Trace.Handlers.Types.ParsedTrace | null): void;
}
export {};
