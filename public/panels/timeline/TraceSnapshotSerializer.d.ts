import * as Trace from '../../models/trace/trace.js';
import { type TimelineInvariants } from './TimelineInvariants.js';
export type JsonValue = string | number | boolean | null | JsonValue[] | JsonObject;
export interface JsonObject {
    [key: string]: JsonValue;
}
/** Deterministic summary of a single flame chart data provider (main or network). */
export interface FlameChartSnapshot {
    /** Entry count, max stack depth, total duration in microseconds, and selected group name. */
    summary: string;
    /** Distinct font strings referenced by `entryFont(i)`, indexed as `font0`, `font1`, etc. */
    fonts: string[];
    /** One summary line per `PerfUI.FlameChart.Group` (nesting, visibility, entry and tree-event counts). */
    groups: string[];
    /** Sorted `TimelineFlameChartMarker` start offsets and colors. */
    markers: string[];
    /** Per-track equivalence-class signatures collapsing entries that share level and visual styling. */
    levels: Record<string, string[]>;
    /** Recorded canvas operations (`decorateEntry` and `getDrawOverride`) keyed by archetype appearance. */
    drawings: Record<string, string>;
    /** Initiator-to-initiated flow arrows produced by `buildFlowForInitiator(i)`. */
    initiators: JsonValue;
    /** Per-track `groupTreeEvents(group)` event IDs (main flame chart only). */
    treeEvents?: Record<string, JsonValue>;
    /** Rendered popover text for one representative entry per `(track, eventName, decorations)` tuple. */
    popovers?: Record<string, string>;
    /** Active `EntriesFilter` hidden/expandable entry modifications (main flame chart only). */
    modifications?: Trace.Types.File.Modifications['entriesModifications'] | null;
}
/** Complete snapshot of a single trace across invariants, trace engine, flame charts, and details/tree views. */
export interface TraceSnapshot {
    /** Structural invariant violations (empty arrays when all invariants hold). */
    invariants: TimelineInvariants;
    /** Formatted trace/network/extension summaries and insight models/overlays. */
    engine: {
        summary: string;
        insights: JsonObject;
    };
    /** Main and network flame chart snapshots. */
    flamechart: {
        main: FlameChartSnapshot;
        network: FlameChartSnapshot;
    };
    /** Details pane rows per event name and Bottom-up / Call Tree / Event Log / 1P-3P tree rows. */
    ui: {
        details: JsonObject;
        trees: JsonObject;
    };
}
export interface SnapshotOptions {
    /** Collections larger than this keep their size and head items. Pass Infinity for a full dump. */
    collectionLimit?: number;
}
/**
 * Captures a deterministic `TraceSnapshot` from a parsed trace, exercising the trace engine insights,
 * main and network flame chart providers, canvas entry rendering, details pane, tree views, and structural invariants.
 */
export declare function captureTraceSnapshot(parsedTrace: Trace.TraceModel.ParsedTrace, { collectionLimit }?: SnapshotOptions): Promise<TraceSnapshot>;
