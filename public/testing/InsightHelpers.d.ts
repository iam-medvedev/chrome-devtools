import * as Trace from '../models/trace/trace.js';
export declare function createContextForNavigation(navigation: Trace.Types.Events.NavigationStart, frameId: string): Trace.Insights.Types.InsightSetContextWithNavigation;
export declare function getInsight<Key extends keyof Trace.Insights.Types.InsightResults>(insightKey: Key, insights: Trace.Insights.Types.TraceInsightSets, navigation?: Trace.Types.Events.NavigationStart): Trace.Insights.Types.InsightResults[Key];
export declare function getFirstOrError<T>(iterator: IterableIterator<T>): T;
export declare function getFirst<T>(iterator: IterableIterator<T>): T | undefined;
