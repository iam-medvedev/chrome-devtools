import * as Host from '../../../core/host/host.js';
import type * as Platform from '../../../core/platform/platform.js';
import type * as SDK from '../../../core/sdk/sdk.js';
import * as Marked from '../../../third_party/marked/marked.js';
import * as MarkdownView from '../../../ui/components/markdown_view/markdown_view.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import { type ActionStepData, type CommonStepData } from '../FreestylerAgent.js';
export declare const DOGFOOD_INFO: Platform.DevToolsPath.UrlString;
interface ConfirmSideEffectDialog {
    code: string;
    onAnswer: (result: boolean) => void;
}
export declare const enum ChatMessageEntity {
    MODEL = "model",
    USER = "user"
}
export interface UserChatMessage {
    entity: ChatMessageEntity.USER;
    text: string;
}
export interface ModelChatMessage {
    entity: ChatMessageEntity.MODEL;
    suggestingFix: boolean;
    steps: Array<ActionStepData | CommonStepData>;
    rpcId?: number;
}
export type ChatMessage = UserChatMessage | ModelChatMessage;
export declare const enum State {
    CONSENT_VIEW = "consent-view",
    CHAT_VIEW = "chat-view"
}
export interface Props {
    onTextSubmit: (text: string) => void;
    onInspectElementClick: () => void;
    onFeedbackSubmit: (rpcId: number, rate: Host.AidaClient.Rating, feedback?: string) => void;
    onAcceptConsentClick: () => void;
    onCancelClick: () => void;
    onFixThisIssueClick: () => void;
    inspectElementToggled: boolean;
    state: State;
    aidaAvailability: Host.AidaClient.AidaAccessPreconditions;
    messages: ChatMessage[];
    selectedNode: SDK.DOMModel.DOMNode | null;
    isLoading: boolean;
    canShowFeedbackForm: boolean;
    confirmSideEffectDialog?: ConfirmSideEffectDialog;
}
declare class MarkdownRendererWithCodeBlock extends MarkdownView.MarkdownView.MarkdownInsightRenderer {
    templateForToken(token: Marked.Marked.Token): LitHtml.TemplateResult | null;
}
export declare class FreestylerChatUi extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    constructor(props: Props);
    set props(props: Props);
    connectedCallback(): void;
    focusTextInput(): void;
    scrollToLastMessage(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-freestyler-chat-ui': FreestylerChatUi;
    }
}
export declare const FOR_TEST: {
    MarkdownRendererWithCodeBlock: typeof MarkdownRendererWithCodeBlock;
};
export {};
