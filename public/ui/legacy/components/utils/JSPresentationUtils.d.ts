import * as SDK from '../../../../core/sdk/sdk.js';
import type * as Protocol from '../../../../generated/protocol.js';
import * as UI from '../../legacy.js';
import { Linkifier } from './Linkifier.js';
export declare function buildStackTraceRows(stackTrace: Protocol.Runtime.StackTrace, target: SDK.Target.Target | null, linkifier: Linkifier, tabStops: boolean | undefined, updateCallback?: (arg0: Array<StackTraceRegularRow | StackTraceAsyncRow>) => void, showColumnNumber?: boolean): Array<StackTraceRegularRow | StackTraceAsyncRow>;
export interface Options {
    stackTrace?: Protocol.Runtime.StackTrace;
    tabStops?: boolean;
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
export declare class StackTracePreviewContent extends UI.Widget.Widget {
    #private;
    constructor(element?: HTMLElement, target?: SDK.Target.Target, linkifier?: Linkifier, options?: Options);
    performUpdate(): void;
    get linkElements(): readonly HTMLElement[];
    set target(target: SDK.Target.Target | undefined);
    set linkifier(linkifier: Linkifier);
    set options(options: Options);
}
