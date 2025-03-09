import '../../ui/legacy/legacy.js';
import '../../ui/legacy/components/data_grid/data_grid.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as TextUtils from '../../models/text_utils/text_utils.js';
import * as UI from '../../ui/legacy/legacy.js';
import { JSONEditor, type Parameter } from './JSONEditor.js';
export declare const buildProtocolMetadata: (domains: Iterable<ProtocolDomain>) => Map<string, {
    parameters: Parameter[];
    description: string;
    replyArgs: string[];
}>;
export interface Message {
    id?: number;
    method: string;
    error?: Object;
    result?: Object;
    params?: Object;
    requestTime: number;
    elapsedTime?: number;
    sessionId?: string;
    target?: SDK.Target.Target;
}
export interface LogMessage {
    id?: number;
    domain: string;
    method: string;
    params: Object;
    type: 'send' | 'recv';
}
export interface ProtocolDomain {
    readonly domain: string;
    readonly metadata: {
        [commandName: string]: {
            parameters: Parameter[];
            description: string;
            replyArgs: string[];
        };
    };
}
export interface ViewInput {
    messages: Message[];
    selectedMessage?: Message;
    sidebarVisible: boolean;
    command: string;
    commandSuggestions: string[];
    filterKeys: string[];
    filter: string;
    parseFilter: (filter: string) => TextUtils.TextUtils.ParsedFilter[];
    onRecord: (e: Event) => void;
    onClear: () => void;
    onSave: () => void;
    onSplitChange: (e: CustomEvent<string>) => void;
    onSelect: (e: CustomEvent<HTMLElement | null>) => void;
    onContextMenu: (e: CustomEvent<{
        menu: UI.ContextMenu.ContextMenu;
        element: HTMLElement;
    }>) => void;
    onFilterChanged: (e: CustomEvent<string>) => void;
    onCommandChange: (e: CustomEvent<string>) => void;
    onCommandSubmitted: (e: CustomEvent<string>) => void;
    onTargetChange: (e: Event) => void;
    onToggleSidebar: (e: Event) => void;
    targets: SDK.Target.Target[];
    selectedTargetId: string;
}
export interface ViewOutput {
    editorWidget: JSONEditor;
}
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare class ProtocolMonitorImpl extends UI.Panel.Panel {
    #private;
    private started;
    private startTime;
    private readonly messageForId;
    private readonly filterParser;
    constructor(view?: View);
    performUpdate(): void;
    onCommandSend(command: string, parameters: object, target?: string): void;
    wasShown(): void;
    private setRecording;
    private targetToString;
    private messageReceived;
    private messageSent;
    private saveAsFile;
}
export declare class CommandAutocompleteSuggestionProvider {
    #private;
    constructor(maxHistorySize?: number);
    allSuggestions(): string[];
    buildTextPromptCompletions: (expression: string, prefix: string, force?: boolean) => Promise<UI.SuggestBox.Suggestions>;
    addEntry(value: string): void;
}
export declare class InfoWidget extends UI.Widget.VBox {
    private readonly tabbedPane;
    request: {
        [x: string]: unknown;
    } | undefined;
    response: {
        [x: string]: unknown;
    } | undefined;
    type: 'sent' | 'received' | undefined;
    selectedTab: 'request' | 'response' | undefined;
    constructor(element: HTMLElement);
    performUpdate(): void;
}
export declare function parseCommandInput(input: string): {
    command: string;
    parameters: {
        [paramName: string]: unknown;
    };
};
