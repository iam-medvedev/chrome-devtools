import * as Trace from '../models/trace/trace.js';
export declare function createContextForNavigation(parsedTrace: Trace.Handlers.Types.ParsedTrace, navigation: Trace.Types.Events.NavigationStart, frameId: string): Trace.Insights.Types.InsightSetContextWithNavigation;
export declare function getInsightOrError<InsightName extends keyof Trace.Insights.Types.InsightResults>(insightName: InsightName, insights: Trace.Insights.Types.TraceInsightSets, navigation?: Trace.Types.Events.NavigationStart): Trace.Insights.Types.InsightResults[InsightName];
export declare function getFirstOrError<T>(iterator: IterableIterator<T>): T;
export declare function getFirst<T>(iterator: IterableIterator<T>): T | undefined;
