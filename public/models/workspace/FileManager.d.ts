import * as Common from '../../core/common/common.js';
import type * as Platform from '../../core/platform/platform.js';
interface SaveCallbackParam {
    fileSystemPath?: Platform.DevToolsPath.RawPathString | Platform.DevToolsPath.UrlString;
}
export declare class FileManager extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    private readonly saveCallbacks;
    private constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    }): FileManager;
    save(url: Platform.DevToolsPath.RawPathString | Platform.DevToolsPath.UrlString, content: string, forceSaveAs: boolean, isBase64: boolean): Promise<SaveCallbackParam | null>;
    private savedURL;
    private canceledSavedURL;
    append(url: Platform.DevToolsPath.RawPathString | Platform.DevToolsPath.UrlString, content: string): void;
    close(url: Platform.DevToolsPath.RawPathString | Platform.DevToolsPath.UrlString): void;
    private appendedToURL;
}
export declare const enum Events {
    APPENDED_TO_URL = "AppendedToURL"
}
export interface EventTypes {
    [Events.APPENDED_TO_URL]: string;
}
export {};
