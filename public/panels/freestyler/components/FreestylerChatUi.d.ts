import * as Host from '../../../core/host/host.js';
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
    CONSENT_VIEW = "consent-view",
    CHAT_VIEW = "chat-view"
}
export declare const enum Rating {
    POSITIVE = "positive",
    NEGATIVE = "negative"
}
export type Props = {
    onTextSubmit: (text: string) => void;
    onInspectElementClick: () => void;
    onRateClick: (rpcId: number, rate: Rating) => void;
    onAcceptConsentClick: () => void;
    inspectElementToggled: boolean;
    state: State;
    aidaAvailability: Host.AidaClient.AidaAvailability;
    messages: ChatMessage[];
    selectedNode: SDK.DOMModel.DOMNode | null;
    isLoading: boolean;
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
