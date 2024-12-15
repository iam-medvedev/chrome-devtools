import * as Trace from '../models/trace/trace.js';
export declare function processTrace(testContext: Mocha.Suite | Mocha.Context | null, traceFile: string): Promise<{
    data: Readonly<Trace.Handlers.Types.EnabledHandlerDataWithMeta<typeof Trace.Handlers.ModelHandlers>>;
    insights: Trace.Insights.Types.TraceInsightSets;
    metadata: Trace.Types.File.MetaData | null;
}>;
export declare function createContextForNavigation(parsedTrace: Trace.Handlers.Types.ParsedTrace, navigation: Trace.Types.Events.NavigationStart, frameId: string): Trace.Insights.Types.InsightSetContextWithNavigation;
export declare function getInsightOrError<InsightName extends keyof Trace.Insights.Types.InsightModels>(insightName: InsightName, insights: Trace.Insights.Types.TraceInsightSets, navigation?: Trace.Types.Events.NavigationStart): Trace.Insights.Types.InsightModels[InsightName];
export declare function getFirstOrError<T>(iterator: IterableIterator<T>): T;
export declare function getFirst<T>(iterator: IterableIterator<T>): T | undefined;
