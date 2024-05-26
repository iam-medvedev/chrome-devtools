export declare const enum State {
    CONSENT_VIEW = "consent",
    CHAT_VIEW = "chat"
}
export type Props = {
    onTextSubmit: (text: string) => void;
    onAcceptPrivacyNotice: () => void;
    state: State;
};
export declare class FreestylerChatUi extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    constructor(props: Props);
    set props(props: Props);
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-freestyler-chat-ui': FreestylerChatUi;
    }
}
