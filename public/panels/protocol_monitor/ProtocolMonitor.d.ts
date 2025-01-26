import '../../ui/legacy/legacy.js';
import '../../ui/legacy/components/data_grid/data_grid.js';
import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as TextUtils from '../../models/text_utils/text_utils.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type Command, JSONEditor, type Parameter } from './JSONEditor.js';
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
    filters: TextUtils.TextUtils.ParsedFilter[];
    onRecord: (e: Event) => void;
    onClear: () => void;
    onSave: () => void;
    onSelect: (e: CustomEvent<HTMLElement | null>) => void;
    onContextMenu: (e: CustomEvent<{
        menu: UI.ContextMenu.ContextMenu;
        element: HTMLElement;
    }>) => void;
    textFilterUI: UI.Toolbar.ToolbarInput;
    showHideSidebarButton: UI.Toolbar.ToolbarButton;
    commandInput: UI.Toolbar.ToolbarInput;
    selector: UI.Toolbar.ToolbarComboBox;
}
export interface ViewOutput {
}
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
declare const ProtocolMonitorDataGrid_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends keyof EventTypes>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: keyof EventTypes): boolean;
    dispatchEventToListeners<T extends keyof EventTypes>(eventType: Platform.TypeScriptUtilities.NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & typeof UI.Widget.VBox;
export declare class ProtocolMonitorDataGrid extends ProtocolMonitorDataGrid_base {
    #private;
    private started;
    private startTime;
    private readonly messageForId;
    private readonly filterParser;
    private readonly suggestionBuilder;
    private readonly textFilterUI;
    readonly selector: UI.Toolbar.ToolbarComboBox;
    constructor(splitWidget: UI.SplitWidget.SplitWidget, view?: View);
    performUpdate(): void;
    onCommandSend(command: string, parameters: object, target?: string): void;
    wasShown(): void;
    private setRecording;
    private targetToString;
    private messageReceived;
    private messageSent;
    private saveAsFile;
}
export declare class ProtocolMonitorImpl extends UI.Widget.VBox {
    #private;
    constructor();
}
export declare class CommandAutocompleteSuggestionProvider {
    #private;
    constructor(maxHistorySize?: number);
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
export declare const enum Events {
    COMMAND_SENT = "CommandSent",
    COMMAND_CHANGE = "CommandChange"
}
export interface EventTypes {
    [Events.COMMAND_SENT]: Command;
    [Events.COMMAND_CHANGE]: Command;
}
declare const EditorWidget_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends keyof EventTypes>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: keyof EventTypes): boolean;
    dispatchEventToListeners<T extends keyof EventTypes>(eventType: Platform.TypeScriptUtilities.NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & typeof UI.Widget.VBox;
export declare class EditorWidget extends EditorWidget_base {
    readonly jsonEditor: JSONEditor;
    constructor();
}
export declare function parseCommandInput(input: string): {
    command: string;
    parameters: {
        [paramName: string]: unknown;
    };
};
export {};
