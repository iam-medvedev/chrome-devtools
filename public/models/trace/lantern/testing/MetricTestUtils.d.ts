import * as TraceModel from '../../trace.js';
import * as Lantern from '../lantern.js';
declare function loadTrace(context: Mocha.Context | Mocha.Suite | null, name: string): Promise<Lantern.Types.Trace>;
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
export { loadTrace, runTraceEngine, getComputationDataFromFixture, };
