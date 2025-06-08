import * as Trace from '../../trace.js';
import * as Lantern from '../lantern.js';
declare function toLanternTrace(traceEvents: readonly Trace.Types.Events.Event[]): Lantern.Types.Trace;
declare function runTrace(context: Mocha.Suite | Mocha.Context, trace: Lantern.Types.Trace): Promise<Readonly<Trace.Handlers.Types.EnabledHandlerDataWithMeta<typeof Trace.Handlers.ModelHandlers>>>;
declare function getComputationDataFromFixture(context: Mocha.Suite | Mocha.Context, { trace, settings, url }: {
    trace: Lantern.Types.Trace;
    settings?: Lantern.Types.Simulation.Settings;
    url?: Lantern.Types.Simulation.URL;
}): Promise<{
    simulator: Trace.Lantern.Simulation.Simulator<any>;
    graph: Trace.Lantern.Graph.Node<Trace.Types.Events.SyntheticNetworkRequest>;
    processedNavigation: Trace.Lantern.Types.Simulation.ProcessedNavigation;
}>;
export { getComputationDataFromFixture, runTrace, toLanternTrace, };
