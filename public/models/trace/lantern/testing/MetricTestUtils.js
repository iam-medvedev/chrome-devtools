// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Unsure why this lint is failing, given `lantern/metrics/SpeedIndex.test.ts` does the same
// and is fine. Maybe `*.test.*` files are excluded from this rule?
// eslint-disable-next-line rulesdir/es-modules-import
import * as TraceLoader from '../../../../testing/TraceLoader.js';
import * as Trace from '../../trace.js';
import * as Lantern from '../lantern.js';
function toLanternTrace(traceEvents) {
    return {
        traceEvents: traceEvents,
    };
}
async function runTrace(context, trace) {
    TraceLoader.TraceLoader.setTestTimeout(context);
    const processor = Trace.Processor.TraceProcessor.createWithAllHandlers();
    await processor.parse(trace.traceEvents, { isCPUProfile: false, isFreshRecording: true });
    if (!processor.parsedTrace) {
        throw new Error('No data');
    }
    return processor.parsedTrace;
}
async function getComputationDataFromFixture(context, { trace, settings, url }) {
    settings = settings ?? {};
    if (!settings.throttlingMethod) {
        settings.throttlingMethod = 'simulate';
    }
    const parsedTrace = await runTrace(context, trace);
    const requests = Trace.LanternComputationData.createNetworkRequests(trace, parsedTrace);
    const networkAnalysis = Lantern.Core.NetworkAnalyzer.analyze(requests);
    if (!networkAnalysis) {
        throw new Error('no networkAnalysis');
    }
    const frameId = parsedTrace.Meta.mainFrameId;
    const navigationId = parsedTrace.Meta.mainFrameNavigations[0].args.data?.navigationId;
    if (!navigationId) {
        throw new Error('no navigation id found');
    }
    return {
        simulator: Lantern.Simulation.Simulator.createSimulator({ ...settings, networkAnalysis }),
        graph: Trace.LanternComputationData.createGraph(requests, trace, parsedTrace, url),
        processedNavigation: Trace.LanternComputationData.createProcessedNavigation(parsedTrace, frameId, navigationId),
    };
}
export { getComputationDataFromFixture, runTrace, toLanternTrace, };
//# sourceMappingURL=MetricTestUtils.js.map