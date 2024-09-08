import type * as TraceModel from '../trace.js';
export declare function processTrace(testContext: Mocha.Suite | Mocha.Context | null, traceFile: string): Promise<{
    data: Readonly<TraceModel.Handlers.Types.EnabledHandlerDataWithMeta<typeof TraceModel.Handlers.ModelHandlers>>;
    insights: TraceModel.Insights.Types.TraceInsightData;
}>;
