import * as SDK from '../../core/sdk/sdk.js';
export declare class ExecutionError extends Error {
}
export declare class SideEffectError extends Error {
}
export interface Options {
    throwOnSideEffect: boolean;
}
export declare class FreestylerEvaluateAction {
    static execute(functionDeclaration: string, args: Array<SDK.RemoteObject.RemoteObject>, executionContext: SDK.RuntimeModel.ExecutionContext, { throwOnSideEffect }: Options): Promise<string>;
}
