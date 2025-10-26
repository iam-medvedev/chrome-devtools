// Copyright 2024 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Unsure why this lint is failing, given `lantern/metrics/SpeedIndex.test.ts` does the same
// and is fine. Maybe `*.test.*` files are excluded from this rule?
// eslint-disable-next-line @devtools/es-modules-import
import * as TraceLoader from '../../../../testing/TraceLoader.js';
import * as Trace from '../../trace.js';
import * as Lantern from '../lantern.js';
function toLanternTrace(traceEvents) {
    return {
        traceEvents: traceEvents,
    };
}
async function runTraceProcessor(context, trace) {
    TraceLoader.TraceLoader.setTestTimeout(context);
    const processor = Trace.Processor.TraceProcessor.createWithAllHandlers();
    await processor.parse(trace.traceEvents, { isCPUProfile: false, isFreshRecording: true });
    if (!processor.data) {
        throw new Error('No data');
    }
    return processor.data;
}
async function getComputationDataFromFixture(context, { trace, settings, url }) {
    settings = settings ?? {};
    if (!settings.throttlingMethod) {
        settings.throttlingMethod = 'simulate';
    }
    const data = await runTraceProcessor(context, trace);
    const requests = Trace.LanternComputationData.createNetworkRequests(trace, data);
    const networkAnalysis = Lantern.Core.NetworkAnalyzer.analyze(requests);
    if (!networkAnalysis) {
        throw new Error('no networkAnalysis');
    }
    const frameId = data.Meta.mainFrameId;
    const navigationId = data.Meta.mainFrameNavigations[0].args.data?.navigationId;
    if (!navigationId) {
        throw new Error('no navigation id found');
    }
    return {
        simulator: Lantern.Simulation.Simulator.createSimulator({ ...settings, networkAnalysis }),
        graph: Trace.LanternComputationData.createGraph(requests, trace, data, url),
        processedNavigation: Trace.LanternComputationData.createProcessedNavigation(data, frameId, navigationId),
    };
}
export { getComputationDataFromFixture, runTraceProcessor as runTrace, toLanternTrace, };
//# sourceMappingURL=MetricTestUtils.js.map