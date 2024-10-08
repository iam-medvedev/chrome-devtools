import * as Common from '../../core/common/common.js';
import type * as SDK from '../../core/sdk/sdk.js';
import { type BuildOptions } from './Log.js';
export declare class Writer {
    static write(stream: Common.StringOutputStream.OutputStream, requests: SDK.NetworkRequest.NetworkRequest[], options: BuildOptions, progress: Common.Progress.Progress): Promise<void>;
    static harStringForRequests(requests: SDK.NetworkRequest.NetworkRequest[], options: BuildOptions, compositeProgress: Common.Progress.CompositeProgress): Promise<string>;
    static writeToStream(stream: Common.StringOutputStream.OutputStream, compositeProgress: Common.Progress.CompositeProgress, fileContent: string): Promise<void>;
}
export declare const jsonIndent = 2;
export declare const chunkSize = 100000;
