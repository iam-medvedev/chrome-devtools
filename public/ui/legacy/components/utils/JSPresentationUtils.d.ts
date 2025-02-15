import * as SDK from '../../../../core/sdk/sdk.js';
import type * as Protocol from '../../../../generated/protocol.js';
import { Linkifier } from './Linkifier.js';
export declare function buildStackTraceRows(stackTrace: Protocol.Runtime.StackTrace, target: SDK.Target.Target | null, linkifier: Linkifier, tabStops: boolean | undefined, updateCallback?: (arg0: Array<StackTraceRegularRow | StackTraceAsyncRow>) => void, showColumnNumber?: boolean): Array<StackTraceRegularRow | StackTraceAsyncRow>;
export declare function buildStackTracePreviewContents(target: SDK.Target.Target | null, linkifier: Linkifier, options?: Options): {
    element: HTMLElement;
    links: HTMLElement[];
};
export interface Options {
    stackTrace: Protocol.Runtime.StackTrace | undefined;
    tabStops: boolean | undefined;
    widthConstrained?: boolean;
    showColumnNumber?: boolean;
}
export interface StackTraceRegularRow {
    functionName: string;
    link: HTMLElement | null;
}
export interface StackTraceAsyncRow {
    asyncDescription: string;
}
