import * as Trace from '../../trace.js';
import * as Lantern from '../lantern.js';
declare function toLanternTrace(traceEvents: readonly Trace.Types.Events.Event[]): Lantern.Types.Trace;
export interface ComputationData {
    simulator: Lantern.Simulation.Simulator<unknown>;
    graph: Lantern.Graph.Node<Trace.Types.Events.SyntheticNetworkRequest>;
    processedNavigation: Lantern.Types.Simulation.ProcessedNavigation;
}
declare function runTraceProcessor(_context: Mocha.Suite | Mocha.Context, trace: Lantern.Types.Trace): Promise<Trace.Handlers.Types.EnabledHandlerDataWithMeta<typeof Trace.Handlers.ModelHandlers>>;
declare function getComputationDataFromFixture(context: Mocha.Suite | Mocha.Context, { trace, settings, url }: {
    trace: Lantern.Types.Trace;
    settings?: Lantern.Types.Simulation.Settings;
    url?: Lantern.Types.Simulation.URL;
}): Promise<ComputationData>;
export { getComputationDataFromFixture, runTraceProcessor as runTrace, toLanternTrace, };
