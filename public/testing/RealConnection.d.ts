import * as SDK from '../core/sdk/sdk.js';
/** @deprecated Migrate to `describeWithMockConnection`, e2e tests or web test if needed */
export declare function describeWithRealConnection(title: string, fn: (this: Mocha.Suite) => void): void;
export declare namespace describeWithRealConnection {
    var only: (title: string, fn: (this: Mocha.Suite) => void) => void;
}
export declare function flushRealConnectionSuits(): void;
export declare function getExecutionContext(runtimeModel: SDK.RuntimeModel.RuntimeModel): Promise<SDK.RuntimeModel.ExecutionContext>;
