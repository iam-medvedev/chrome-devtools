export declare function processTrace(context: Mocha.Suite | Mocha.Context, traceFile: string): Promise<{
    data: Readonly<import("../handlers/types.js").EnabledHandlerDataWithMeta<typeof import("../handlers/ModelHandlers.js")>>;
    insights: import("./types.js").TraceInsightSets;
}>;
