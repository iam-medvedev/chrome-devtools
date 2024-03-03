/// <reference types="mocha" />
import * as SDK from '../core/sdk/sdk.js';
export interface StaticTestsLoadedEvent {
    hasOnly: boolean;
}
export declare let markStaticTestsLoaded: (event: StaticTestsLoadedEvent) => void;
export declare function describeWithRealConnection(title: string, fn: (this: Mocha.Suite) => void): void;
export declare namespace describeWithRealConnection {
    var only: (title: string, fn: (this: Mocha.Suite) => void) => void;
}
export declare function getExecutionContext(runtimeModel: SDK.RuntimeModel.RuntimeModel): Promise<SDK.RuntimeModel.ExecutionContext>;
