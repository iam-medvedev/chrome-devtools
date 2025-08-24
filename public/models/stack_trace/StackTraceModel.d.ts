import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import type * as StackTrace from './stack_trace.js';
import { type RawFrame } from './Trie.js';
/**
 * A stack trace translation function.
 *
 * Any implementation must return an array with the same length as `frames`.
 */
export type TranslateRawFrames = (frames: readonly RawFrame[], target: SDK.Target.Target) => Promise<Array<Array<Pick<StackTrace.StackTrace.Frame, 'url' | 'uiSourceCode' | 'name' | 'line' | 'column'>>>>;
/**
 * The {@link StackTraceModel} is a thin wrapper around a fragment trie.
 *
 * We want to store stack trace fragments per target so a SDKModel is the natural choice.
 */
export declare class StackTraceModel extends SDK.SDKModel.SDKModel<unknown> {
    #private;
    createFromProtocolRuntime(stackTrace: Protocol.Runtime.StackTrace, rawFramesToUIFrames: TranslateRawFrames): Promise<StackTrace.StackTrace.StackTrace>;
}
