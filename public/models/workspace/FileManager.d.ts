import * as Common from '../../core/common/common.js';
import type * as Platform from '../../core/platform/platform.js';
export interface SaveCallbackParam {
    fileSystemPath?: Platform.DevToolsPath.RawPathString | Platform.DevToolsPath.UrlString;
}
export declare class FileManager extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    #private;
    private constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    }): FileManager;
    /**
     * {@link FileManager.close | close} *must* be called, for the InspectorFrontendHostStub case, to complete the saving.
     */
    save(url: Platform.DevToolsPath.RawPathString | Platform.DevToolsPath.UrlString, content: string, forceSaveAs: boolean, isBase64: boolean): Promise<SaveCallbackParam | null>;
    /**
     * Used in web tests
     */
    private savedURL;
    append(url: Platform.DevToolsPath.RawPathString | Platform.DevToolsPath.UrlString, content: string): void;
    close(url: Platform.DevToolsPath.RawPathString | Platform.DevToolsPath.UrlString): void;
    /**
     * Used in web tests
     */
    private appendedToURL;
}
export declare const enum Events {
    APPENDED_TO_URL = "AppendedToURL"
}
export interface EventTypes {
    [Events.APPENDED_TO_URL]: string;
}
