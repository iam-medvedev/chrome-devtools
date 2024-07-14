// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Handlers from './handlers/handlers.js';
import * as Insights from './insights/insights.js';
import * as Lantern from './lantern/lantern.js';
import * as LanternComputationData from './LanternComputationData.js';
import * as Types from './types/types.js';
export class TraceParseProgressEvent extends Event {
    data;
    static eventName = 'traceparseprogress';
    constructor(data, init = { bubbles: true }) {
        super(TraceParseProgressEvent.eventName, init);
        this.data = data;
    }
}
export class TraceProcessor extends EventTarget {
    // We force the Meta handler to be enabled, so the TraceHandlers type here is
    // the model handlers the user passes in and the Meta handler.
    #traceHandlers;
    #status = "IDLE" /* Status.IDLE */;
    #modelConfiguration = Types.Configuration.defaults();
    #data = null;
    #insights = null;
    static createWithAllHandlers() {
        return new TraceProcessor(Handlers.ModelHandlers, Types.Configuration.defaults());
    }
    static getEnabledInsightRunners(traceParsedData) {
        const enabledInsights = {};
        for (const [name, insight] of Object.entries(Insights.InsightRunners)) {
            const deps = insight.deps();
            if (deps.some(dep => !traceParsedData[dep])) {
                continue;
            }
            Object.assign(enabledInsights, { [name]: insight });
        }
        return enabledInsights;
    }
    constructor(traceHandlers, modelConfiguration) {
        super();
        this.#verifyHandlers(traceHandlers);
        this.#traceHandlers = {
            Meta: Handlers.ModelHandlers.Meta,
            ...traceHandlers,
        };
        if (modelConfiguration) {
            this.#modelConfiguration = modelConfiguration;
        }
        this.#passConfigToHandlers();
    }
    #passConfigToHandlers() {
        for (const handler of Object.values(this.#traceHandlers)) {
            // Bit of an odd double check, but without this TypeScript refuses to let
            // you call the function as it thinks it might be undefined.
            if ('handleUserConfig' in handler && handler.handleUserConfig) {
                handler.handleUserConfig(this.#modelConfiguration);
            }
        }
    }
    /**
     * When the user passes in a set of handlers, we want to ensure that we have all
     * the required handlers. Handlers can depend on other handlers, so if the user
     * passes in FooHandler which depends on BarHandler, they must also pass in
     * BarHandler too. This method verifies that all dependencies are met, and
     * throws if not.
     **/
    #verifyHandlers(providedHandlers) {
        // Tiny optimisation: if the amount of provided handlers matches the amount
        // of handlers in the Handlers.ModelHandlers object, that means that the
        // user has passed in every handler we have. So therefore they cannot have
        // missed any, and there is no need to iterate through the handlers and
        // check the dependencies.
        if (Object.keys(providedHandlers).length === Object.keys(Handlers.ModelHandlers).length) {
            return;
        }
        const requiredHandlerKeys = new Set();
        for (const [handlerName, handler] of Object.entries(providedHandlers)) {
            requiredHandlerKeys.add(handlerName);
            const deps = 'deps' in handler ? handler.deps() : [];
            for (const depName of deps) {
                requiredHandlerKeys.add(depName);
            }
        }
        const providedHandlerKeys = new Set(Object.keys(providedHandlers));
        // We always force the Meta handler to be enabled when creating the
        // Processor, so if it is missing from the set the user gave us that is OK,
        // as we will have enabled it anyway.
        requiredHandlerKeys.delete('Meta');
        for (const requiredKey of requiredHandlerKeys) {
            if (!providedHandlerKeys.has(requiredKey)) {
                throw new Error(`Required handler ${requiredKey} not provided.`);
            }
        }
    }
    reset() {
        if (this.#status === "PARSING" /* Status.PARSING */) {
            throw new Error('Trace processor can\'t reset while parsing.');
        }
        const handlers = Object.values(this.#traceHandlers);
        for (const handler of handlers) {
            handler.reset();
        }
        this.#data = null;
        this.#insights = null;
        this.#status = "IDLE" /* Status.IDLE */;
    }
    async parse(traceEvents, freshRecording = false) {
        if (this.#status !== "IDLE" /* Status.IDLE */) {
            throw new Error(`Trace processor can't start parsing when not idle. Current state: ${this.#status}`);
        }
        try {
            this.#status = "PARSING" /* Status.PARSING */;
            await this.#computeTraceParsedData(traceEvents, freshRecording);
            if (this.#data) {
                this.#computeInsights(this.#data, traceEvents);
            }
            this.#status = "FINISHED_PARSING" /* Status.FINISHED_PARSING */;
        }
        catch (e) {
            this.#status = "ERRORED_WHILE_PARSING" /* Status.ERRORED_WHILE_PARSING */;
            throw e;
        }
    }
    /**
     * Run all the handlers and set the result to `#data`.
     */
    async #computeTraceParsedData(traceEvents, freshRecording) {
        /**
         * We want to yield regularly to maintain responsiveness. If we yield too often, we're wasting idle time.
         * We could do this by checking `performance.now()` regularly, but it's an expensive call in such a hot loop.
         * `eventsPerChunk` is an approximated proxy metric.
         * But how big a chunk? We're aiming for long tasks that are no smaller than 100ms and not bigger than 200ms.
         * It's CPU dependent, so it should be calibrated on oldish hardware.
         * Illustration of a previous change to `eventsPerChunk`: https://imgur.com/wzp8BnR
         */
        const eventsPerChunk = 50_000;
        // Convert to array so that we are able to iterate all handlers multiple times.
        const sortedHandlers = [...sortHandlers(this.#traceHandlers).values()];
        // Reset.
        for (const handler of sortedHandlers) {
            handler.reset();
        }
        // Initialize.
        for (const handler of sortedHandlers) {
            handler.initialize?.(freshRecording);
        }
        // Handle each event.
        for (let i = 0; i < traceEvents.length; ++i) {
            // Every so often we take a break just to render.
            if (i % eventsPerChunk === 0 && i) {
                // Take the opportunity to provide status update events.
                this.dispatchEvent(new TraceParseProgressEvent({ index: i, total: traceEvents.length }));
                // TODO(paulirish): consider using `scheduler.yield()` or `scheduler.postTask(() => {}, {priority: 'user-blocking'})`
                await new Promise(resolve => setTimeout(resolve, 0));
            }
            const event = traceEvents[i];
            for (let j = 0; j < sortedHandlers.length; ++j) {
                sortedHandlers[j].handleEvent(event);
            }
        }
        // Finalize.
        for (const handler of sortedHandlers) {
            if (handler.finalize) {
                // Yield to the UI because finalize() calls can be expensive
                // TODO(jacktfranklin): consider using `scheduler.yield()` or `scheduler.postTask(() => {}, {priority: 'user-blocking'})`
                await new Promise(resolve => setTimeout(resolve, 0));
                await handler.finalize();
            }
        }
        // Handlers that depend on other handlers do so via .data(), which used to always
        // return a shallow clone of its internal data structures. However, that pattern
        // easily results in egregious amounts of allocation. Now .data() does not do any
        // cloning, and it happens here instead so that users of the trace processor may
        // still assume that the parsed data is theirs.
        // See: crbug/41484172
        const shallowClone = (value, recurse = true) => {
            if (value instanceof Map) {
                return new Map(value);
            }
            if (value instanceof Set) {
                return new Set(value);
            }
            if (Array.isArray(value)) {
                return [...value];
            }
            if (typeof value === 'object' && value && recurse) {
                const obj = {};
                for (const [key, v] of Object.entries(value)) {
                    obj[key] = shallowClone(v, false);
                }
                return obj;
            }
            return value;
        };
        const traceParsedData = {};
        for (const [name, handler] of Object.entries(this.#traceHandlers)) {
            const data = shallowClone(handler.data());
            Object.assign(traceParsedData, { [name]: data });
        }
        this.#data = traceParsedData;
    }
    get traceParsedData() {
        if (this.#status !== "FINISHED_PARSING" /* Status.FINISHED_PARSING */) {
            return null;
        }
        return this.#data;
    }
    get insights() {
        if (this.#status !== "FINISHED_PARSING" /* Status.FINISHED_PARSING */) {
            return null;
        }
        return this.#insights;
    }
    #createLanternContext(traceParsedData, traceEvents) {
        // Check for required handlers.
        if (!traceParsedData.NetworkRequests || !traceParsedData.Workers || !traceParsedData.PageLoadMetrics) {
            return;
        }
        if (!traceParsedData.NetworkRequests.byTime.length) {
            throw new Lantern.Core.LanternError('No network requests found in trace');
        }
        // Lantern.Types.TraceEvent and Types.TraceEvents.TraceEventData represent the same
        // object - a trace event - but one is more flexible than the other. It should be safe to cast between them.
        const trace = {
            traceEvents: traceEvents,
        };
        const requests = LanternComputationData.createNetworkRequests(trace, traceParsedData);
        const graph = LanternComputationData.createGraph(requests, trace, traceParsedData);
        const processedNavigation = LanternComputationData.createProcessedNavigation(traceParsedData);
        const networkAnalysis = Lantern.Core.NetworkAnalyzer.analyze(requests);
        const simulator = Lantern.Simulation.Simulator.createSimulator({
            networkAnalysis,
            throttlingMethod: 'simulate',
        });
        const computeData = { graph, simulator, processedNavigation };
        const fcpResult = Lantern.Metrics.FirstContentfulPaint.compute(computeData);
        const lcpResult = Lantern.Metrics.LargestContentfulPaint.compute(computeData, { fcpResult });
        const interactiveResult = Lantern.Metrics.Interactive.compute(computeData, { lcpResult });
        const tbtResult = Lantern.Metrics.TotalBlockingTime.compute(computeData, { fcpResult, interactiveResult });
        const metrics = {
            firstContentfulPaint: fcpResult,
            interactive: interactiveResult,
            largestContentfulPaint: lcpResult,
            totalBlockingTime: tbtResult,
        };
        return { graph, simulator, metrics };
    }
    /**
     * Run all the insights and set the result to `#insights`.
     */
    #computeInsights(traceParsedData, traceEvents) {
        this.#insights = new Map();
        const enabledInsightRunners = TraceProcessor.getEnabledInsightRunners(traceParsedData);
        // The lantern sub-context is optional on NavigationInsightContext, so not setting it is OK.
        // This is also a hedge against an error inside Lantern resulting in breaking the entire performance panel.
        // Additionally, many trace fixtures are too old to be processed by Lantern.
        // TODO(crbug.com/313905799): should be created and scoped per-navigation.
        let lantern;
        try {
            lantern = this.#createLanternContext(traceParsedData, traceEvents);
        }
        catch (e) {
            // Don't allow an error in constructing the Lantern graphs to break the rest of the trace processor.
            // Log unexpected errors, but suppress anything that occurs from a trace being too old.
            // Otherwise tests using old fixtures become way too noisy.
            const expectedErrors = [
                'mainDocumentRequest not found',
                'missing metric scores for main frame',
                'missing metric: FCP',
                'missing metric: LCP',
                'No network requests found in trace',
                'Trace is too old',
            ];
            if (!(e instanceof Lantern.Core.LanternError)) {
                // If this wasn't a managed LanternError, the stack trace is likely needed for debugging.
                console.error(e);
            }
            else if (!expectedErrors.some(err => e.message === err)) {
                // To reduce noise from tests, only print errors that are not expected to occur because a trace is
                // too old (for which there is no single check).
                console.error(e.message);
            }
        }
        for (const nav of traceParsedData.Meta.mainFrameNavigations) {
            if (!nav.args.frame || !nav.args.data?.navigationId) {
                continue;
            }
            const context = {
                frameId: nav.args.frame,
                navigationId: nav.args.data.navigationId,
                lantern,
            };
            const navInsightData = {};
            for (const [name, insight] of Object.entries(enabledInsightRunners)) {
                let insightResult;
                try {
                    insightResult = insight.generateInsight(traceParsedData, context);
                }
                catch (err) {
                    insightResult = err;
                }
                Object.assign(navInsightData, { [name]: insightResult });
            }
            this.#insights.set(context.navigationId, navInsightData);
        }
    }
}
/**
 * Some Handlers need data provided by others. Dependencies of a handler handler are
 * declared in the `deps` field.
 * @returns A map from trace event handler name to trace event hander whose entries
 * iterate in such a way that each handler is visited after its dependencies.
 */
export function sortHandlers(traceHandlers) {
    const sortedMap = new Map();
    const visited = new Set();
    const visitHandler = (handlerName) => {
        if (sortedMap.has(handlerName)) {
            return;
        }
        if (visited.has(handlerName)) {
            let stackPath = '';
            for (const handler of visited) {
                if (stackPath || handler === handlerName) {
                    stackPath += `${handler}->`;
                }
            }
            stackPath += handlerName;
            throw new Error(`Found dependency cycle in trace event handlers: ${stackPath}`);
        }
        visited.add(handlerName);
        const handler = traceHandlers[handlerName];
        if (!handler) {
            return;
        }
        const deps = handler.deps?.();
        if (deps) {
            deps.forEach(visitHandler);
        }
        sortedMap.set(handlerName, handler);
    };
    for (const handlerName of Object.keys(traceHandlers)) {
        visitHandler(handlerName);
    }
    return sortedMap;
}
//# sourceMappingURL=Processor.js.map