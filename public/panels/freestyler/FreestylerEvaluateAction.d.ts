import type * as SDK from '../../core/sdk/sdk.js';
export declare class ExecutionError extends Error {
}
export declare class FreestylerEvaluateAction {
    static execute(code: string, executionContext: SDK.RuntimeModel.ExecutionContext): Promise<string>;
}
