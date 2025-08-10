/**
 * Provides snapshot testing for karma unit tests.
 * See README.md for more.
 *
 * Note: karma.conf.ts implements the server logic (see snapshotTesterFactory).
 */
export declare class SnapshotTester {
    #private;
    constructor(meta: ImportMeta);
    load(): Promise<void>;
    assert(context: Mocha.Context, actual: string): void;
    finish(): Promise<void>;
}
