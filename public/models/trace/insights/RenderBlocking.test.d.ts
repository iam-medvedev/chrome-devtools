import * as Trace from '../../trace/trace.js';
export declare function processTrace(testContext: Mocha.Suite | Mocha.Context | null, traceFile: string): Promise<{
    data: Readonly<Trace.Handlers.Types.EnabledHandlerDataWithMeta<typeof Trace.Handlers.ModelHandlers>>;
    insights: Trace.Insights.Types.TraceInsightSets;
}>;
