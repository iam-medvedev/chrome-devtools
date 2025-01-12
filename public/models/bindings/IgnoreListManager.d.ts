import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Workspace from '../workspace/workspace.js';
import type { DebuggerWorkspaceBinding } from './DebuggerWorkspaceBinding.js';
export interface IgnoreListGeneralRules {
    isContentScript?: boolean;
    isKnownThirdParty?: boolean;
    isCurrentlyIgnoreListed?: boolean;
}
export declare class IgnoreListManager implements SDK.TargetManager.SDKModelObserver<SDK.DebuggerModel.DebuggerModel> {
    #private;
    private constructor();
    static instance(opts?: {
        forceNew: boolean | null;
        debuggerWorkspaceBinding: DebuggerWorkspaceBinding | null;
    }): IgnoreListManager;
    static removeInstance(): void;
    addChangeListener(listener: () => void): void;
    removeChangeListener(listener: () => void): void;
    modelAdded(debuggerModel: SDK.DebuggerModel.DebuggerModel): void;
    modelRemoved(debuggerModel: SDK.DebuggerModel.DebuggerModel): void;
    private isContentScript;
    private onExecutionContextCreated;
    private onExecutionContextDestroyed;
    private clearCacheIfNeeded;
    private getSkipStackFramesPatternSetting;
    private setIgnoreListPatterns;
    private updateIgnoredExecutionContexts;
    private getGeneralRulesForUISourceCode;
    isUserOrSourceMapIgnoreListedUISourceCode(uiSourceCode: Workspace.UISourceCode.UISourceCode): boolean;
    isUserIgnoreListedURL(url: Platform.DevToolsPath.UrlString | null, options?: IgnoreListGeneralRules): boolean;
    getFirstMatchedRegex(url: Platform.DevToolsPath.UrlString): RegExp | null;
    private sourceMapAttached;
    private sourceMapDetached;
    private updateScriptRanges;
    private uiSourceCodeURL;
    canIgnoreListUISourceCode(uiSourceCode: Workspace.UISourceCode.UISourceCode): boolean;
    ignoreListUISourceCode(uiSourceCode: Workspace.UISourceCode.UISourceCode): void;
    unIgnoreListUISourceCode(uiSourceCode: Workspace.UISourceCode.UISourceCode): void;
    get enableIgnoreListing(): boolean;
    set enableIgnoreListing(value: boolean);
    get skipContentScripts(): boolean;
    get skipAnonymousScripts(): boolean;
    get automaticallyIgnoreListKnownThirdPartyScripts(): boolean;
    ignoreListContentScripts(): void;
    unIgnoreListContentScripts(): void;
    ignoreListAnonymousScripts(): void;
    unIgnoreListAnonymousScripts(): void;
    ignoreListThirdParty(): void;
    unIgnoreListThirdParty(): void;
    ignoreListURL(url: Platform.DevToolsPath.UrlString): void;
    addRegexToIgnoreList(regexValue: string, disabledForUrl?: Platform.DevToolsPath.UrlString): void;
    unIgnoreListURL(url: Platform.DevToolsPath.UrlString | null, options?: IgnoreListGeneralRules): void;
    private removeIgnoreListPattern;
    private ignoreListHasPattern;
    private patternChanged;
    private patternChangeFinishedForTests;
    private urlToRegExpString;
    getIgnoreListURLContextMenuItems(uiSourceCode: Workspace.UISourceCode.UISourceCode): Array<{
        text: string;
        callback: () => void;
        jslogContext: string;
    }>;
    private getIgnoreListGeneralContextMenuItems;
    getIgnoreListFolderContextMenuItems(url: Platform.DevToolsPath.UrlString, options?: IgnoreListGeneralRules): Array<{
        text: string;
        callback: () => void;
        jslogContext: string;
    }>;
}
export interface SourceRange {
    lineNumber: number;
    columnNumber: number;
}
