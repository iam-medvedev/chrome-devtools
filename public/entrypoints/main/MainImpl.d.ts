import * as ProtocolClient from '../../core/protocol_client/protocol_client.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class MainImpl {
    #private;
    constructor();
    static time(label: string): void;
    static timeEnd(label: string): void;
    requestAndRegisterLocaleData(): Promise<void>;
    createSettings(prefs: Record<string, string>): void;
    readyForTest(): Promise<void>;
    static instanceForTest: MainImpl | null;
}
export declare class ZoomActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(_context: UI.Context.Context, actionId: string): boolean;
}
export declare class SearchActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(_context: UI.Context.Context, actionId: string): boolean;
}
export declare class MainMenuItem implements UI.Toolbar.Provider {
    #private;
    constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    }): MainMenuItem;
    item(): UI.Toolbar.ToolbarItem | null;
}
export declare class SettingsButtonProvider implements UI.Toolbar.Provider {
    #private;
    private constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    }): SettingsButtonProvider;
    item(): UI.Toolbar.ToolbarItem | null;
}
export declare class PauseListener {
    #private;
    constructor();
}
export declare function sendOverProtocol(method: ProtocolClient.InspectorBackend.QualifiedName, params: Object | null): Promise<unknown[] | null>;
export declare class ReloadActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(_context: UI.Context.Context, actionId: string): boolean;
}
type ExternalRequestInput = {
    kind: 'LIVE_STYLE_DEBUGGER';
    args: {
        prompt: string;
        selector: string;
    };
} | {
    kind: 'PERFORMANCE_RELOAD_GATHER_INSIGHTS';
} | {
    kind: 'PERFORMANCE_ANALYZE_INSIGHT';
    args: {
        insightTitle: string;
        prompt: string;
    };
} | {
    kind: 'NETWORK_DEBUGGER';
    args: {
        requestUrl: string;
        prompt: string;
    };
};
interface ExternalRequestResponse {
    response: string;
    devToolsLogs: object[];
}
export declare function handleExternalRequest(input: ExternalRequestInput): Promise<ExternalRequestResponse>;
export {};
