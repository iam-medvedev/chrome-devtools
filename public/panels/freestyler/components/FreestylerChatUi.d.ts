import * as Host from '../../../core/host/host.js';
import type * as SDK from '../../../core/sdk/sdk.js';
import * as Marked from '../../../third_party/marked/marked.js';
import * as MarkdownView from '../../../ui/components/markdown_view/markdown_view.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import { type ContextDetail, ErrorType } from '../AiAgent.js';
export interface Step {
    isLoading: boolean;
    thought?: string;
    title?: string;
    code?: string;
    output?: string;
    canceled?: boolean;
    sideEffect?: ConfirmSideEffectDialog;
    contextDetails?: ContextDetail[];
}
interface ConfirmSideEffectDialog {
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
    steps: Step[];
    suggestions?: string[];
    answer?: string;
    error?: ErrorType;
    rpcId?: number;
}
export type ChatMessage = UserChatMessage | ModelChatMessage;
export declare const enum State {
    CONSENT_VIEW = "consent-view",
    CHAT_VIEW = "chat-view"
}
export declare const enum AgentType {
    FREESTYLER = "freestyler",
    DRJONES_NETWORK_REQUEST = "drjones-network-request"
}
export interface Props {
    onTextSubmit: (text: string) => void;
    onInspectElementClick: () => void;
    onFeedbackSubmit: (rpcId: number, rate: Host.AidaClient.Rating, feedback?: string) => void;
    onCancelClick: () => void;
    onSelectedNetworkRequestClick: () => void | Promise<void>;
    inspectElementToggled: boolean;
    state: State;
    aidaAvailability: Host.AidaClient.AidaAccessPreconditions;
    messages: ChatMessage[];
    selectedElement: SDK.DOMModel.DOMNode | null;
    selectedNetworkRequest: SDK.NetworkRequest.NetworkRequest | null;
    isLoading: boolean;
    canShowFeedbackForm: boolean;
    userInfo: Pick<Host.InspectorFrontendHostAPI.SyncInformation, 'accountImage' | 'accountFullName'>;
    agentType: AgentType;
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
    restoreScrollPosition(): void;
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
