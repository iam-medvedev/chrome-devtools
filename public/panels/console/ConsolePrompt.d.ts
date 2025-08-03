import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as AiCodeCompletion from '../../models/ai_code_completion/ai_code_completion.js';
import * as TextEditor from '../../ui/components/text_editor/text_editor.js';
import * as UI from '../../ui/legacy/legacy.js';
declare const ConsolePrompt_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends keyof EventTypes>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: keyof EventTypes): boolean;
    dispatchEventToListeners<T extends keyof EventTypes>(eventType: import("../../core/platform/TypescriptUtilities.js").NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & typeof UI.Widget.Widget;
export declare class ConsolePrompt extends ConsolePrompt_base {
    #private;
    private addCompletionsFromHistory;
    private historyInternal;
    private initialText;
    private editor;
    private readonly eagerPreviewElement;
    private textChangeThrottler;
    private requestPreviewBound;
    private requestPreviewCurrent;
    private readonly innerPreviewElement;
    private readonly promptIcon;
    private readonly iconThrottler;
    private readonly eagerEvalSetting;
    protected previewRequestForTest: Promise<void> | null;
    private highlightingNode;
    private aidaClient?;
    private aiCodeCompletion?;
    private placeholderCompartment;
    private teaserContainer?;
    private aiCodeCompletionSetting;
    constructor();
    private eagerSettingChanged;
    belowEditorElement(): Element;
    private onTextChanged;
    triggerAiCodeCompletion(): void;
    private requestPreview;
    willHide(): void;
    history(): TextEditor.AutocompleteHistory.AutocompleteHistory;
    clearAutocomplete(): void;
    moveCaretToEndOfPrompt(): void;
    clear(): void;
    text(): string;
    setAddCompletionsFromHistory(value: boolean): void;
    private editorKeymap;
    private runOnEscape;
    private enterWillEvaluate;
    showSelfXssWarning(): void;
    private handleEnter;
    private updatePromptIcon;
    private appendCommand;
    private evaluateCommandInConsole;
    private substituteNames;
    private editorUpdate;
    focus(): void;
    private setAiCodeCompletion;
    private onAiCodeCompletionSettingChanged;
    private detachAiCodeCompletionTeaser;
    private isAiCodeCompletionEnabled;
    private editorSetForTest;
    setAidaClientForTest(aidaClient: Host.AidaClient.AidaClient): void;
}
export declare const enum Events {
    TEXT_CHANGED = "TextChanged",
    CITATIONS_UPDATED = "CitationsUpdated"
}
export interface EventTypes {
    [Events.TEXT_CHANGED]: void;
    [Events.CITATIONS_UPDATED]: AiCodeCompletion.AiCodeCompletion.CitationsUpdatedEvent;
}
export {};
