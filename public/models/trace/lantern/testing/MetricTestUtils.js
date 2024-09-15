// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TraceModel from '../../trace.js';
import * as Lantern from '../lantern.js';
function toLanternTrace(traceEvents) {
    return {
        traceEvents: traceEvents,
    };
}
async function runTraceEngine(trace) {
    const processor = TraceModel.Processor.TraceProcessor.createWithAllHandlers();
    await processor.parse(trace.traceEvents);
    if (!processor.traceParsedData) {
        throw new Error('No data');
    }
    return processor.traceParsedData;
}
async function getComputationDataFromFixture({ trace, settings, url }) {
    settings = settings ?? {};
    if (!settings.throttlingMethod) {
        settings.throttlingMethod = 'simulate';
    }
    const traceEngineData = await runTraceEngine(trace);
    const requests = TraceModel.LanternComputationData.createNetworkRequests(trace, traceEngineData);
    const networkAnalysis = Lantern.Core.NetworkAnalyzer.analyze(requests);
    const frameId = traceEngineData.Meta.mainFrameId;
    const navigationId = traceEngineData.Meta.mainFrameNavigations[0].args.data?.navigationId;
    if (!navigationId) {
        throw new Error('no navigation id found');
    }
    return {
        simulator: Lantern.Simulation.Simulator.createSimulator({ ...settings, networkAnalysis }),
        graph: TraceModel.LanternComputationData.createGraph(requests, trace, traceEngineData, url),
        processedNavigation: TraceModel.LanternComputationData.createProcessedNavigation(traceEngineData, frameId, navigationId),
    };
}
export { toLanternTrace, runTraceEngine, getComputationDataFromFixture, };
//# sourceMappingURL=MetricTestUtils.js.map