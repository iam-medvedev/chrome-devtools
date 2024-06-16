import type * as SDK from '../../../core/sdk/sdk.js';
import { type StepData } from '../FreestylerAgent.js';
export declare enum ChatMessageEntity {
    MODEL = "model",
    USER = "user"
}
export type ChatMessage = {
    entity: ChatMessageEntity.USER;
    text: string;
} | {
    entity: ChatMessageEntity.MODEL;
    steps: StepData[];
};
export declare const enum State {
    CHAT_VIEW = "chat-view",
    CHAT_VIEW_LOADING = "chat-view-loading"
}
export type Props = {
    onTextSubmit: (text: string) => void;
    onInspectElementClick: () => void;
    inspectElementToggled: boolean;
    state: State;
    messages: ChatMessage[];
    selectedNode: SDK.DOMModel.DOMNode | null;
};
export declare class FreestylerChatUi extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    constructor(props: Props);
    set props(props: Props);
    connectedCallback(): void;
    focusTextInput(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-freestyler-chat-ui': FreestylerChatUi;
    }
}
