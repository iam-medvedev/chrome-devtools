// ../../front_end/models/trace/lantern/testing/MetricTestUtils.ts
import * as Trace from "../../trace.js";
import * as Lantern from "../lantern.js";
function toLanternTrace(traceEvents) {
  return {
    traceEvents
  };
}
async function runTraceProcessor(_context, trace) {
  const processor = Trace.Processor.TraceProcessor.createWithAllHandlers();
  await processor.parse(trace.traceEvents, { isCPUProfile: false, isFreshRecording: true });
  if (!processor.data) {
    throw new Error("No data");
  }
  return processor.data;
}
async function getComputationDataFromFixture(context, { trace, settings, url }) {
  settings = settings ?? {};
  if (!settings.throttlingMethod) {
    settings.throttlingMethod = "simulate";
  }
  const data = await runTraceProcessor(context, trace);
  const requests = Trace.LanternComputationData.createNetworkRequests(trace, data);
  const networkAnalysis = Lantern.Core.NetworkAnalyzer.analyze(requests);
  if (!networkAnalysis) {
    throw new Error("no networkAnalysis");
  }
  const frameId = data.Meta.mainFrameId;
  const navigation = data.Meta.mainFrameNavigations[0];
  if (!navigation) {
    throw new Error("no navigation found");
  }
  const simulator = Lantern.Simulation.Simulator.createSimulator({ ...settings, networkAnalysis });
  const graph = Trace.LanternComputationData.createGraph(requests, trace, data, url);
  const processedNavigation = Trace.LanternComputationData.createProcessedNavigation(data, frameId, navigation);
  return {
    simulator,
    graph,
    processedNavigation
  };
}
export {
  getComputationDataFromFixture,
  runTraceProcessor as runTrace,
  toLanternTrace
};
//# sourceMappingURL=testing.js.map
