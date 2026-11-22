/** Result returned to `scripts/trace/snapshots/capture.ts` for each trace fixture or corpus file. */
export type CaptureOutcome = {
    kind: 'snapshot';
    json: string;
} | {
    kind: 'skipped';
    reason: string;
} | {
    kind: 'error';
    message: string;
};
export type CaptureTrace = (fixture: string, isCorpus: boolean, collectionLimit: number) => Promise<CaptureOutcome>;
/**
 * Installs a reusable per-page `CaptureTrace` runner that initializes and tears down DevTools test globals around
 * each trace so state cannot leak across sequential captures on the same worker page.
 */
export declare function installTraceSnapshotHarness(): Promise<CaptureTrace>;
