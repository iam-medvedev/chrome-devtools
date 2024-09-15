import * as TraceModel from '../../trace.js';
import * as Lantern from '../lantern.js';
declare function toLanternTrace(traceEvents: readonly TraceModel.Types.TraceEvents.TraceEventData[]): Lantern.Types.Trace;
declare function runTraceEngine(trace: Lantern.Types.Trace): Promise<Readonly<TraceModel.Handlers.Types.EnabledHandlerDataWithMeta<typeof TraceModel.Handlers.ModelHandlers>>>;
declare function getComputationDataFromFixture({ trace, settings, url }: {
    trace: Lantern.Types.Trace;
    settings?: Lantern.Types.Simulation.Settings;
    url?: Lantern.Types.Simulation.URL;
}): Promise<{
    simulator: TraceModel.Lantern.Simulation.Simulator<any>;
    graph: TraceModel.Lantern.Graph.Node<TraceModel.Types.TraceEvents.SyntheticNetworkRequest>;
    processedNavigation: TraceModel.Lantern.Types.Simulation.ProcessedNavigation;
}>;
export { toLanternTrace, runTraceEngine, getComputationDataFromFixture, };
