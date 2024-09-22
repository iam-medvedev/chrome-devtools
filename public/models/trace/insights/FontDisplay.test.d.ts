export declare function processTrace(testContext: Mocha.Suite | Mocha.Context | null, traceFile: string): Promise<{
    data: Readonly<import("../handlers/types.js").EnabledHandlerDataWithMeta<typeof import("../handlers/ModelHandlers.js")>>;
    insights: import("./types.js").TraceInsightSets;
}>;
