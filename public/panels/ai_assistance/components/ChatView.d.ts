import '../../../ui/components/spinners/spinners.js';
import './UserActionRow.js';
import * as Host from '../../../core/host/host.js';
import * as Marked from '../../../third_party/marked/marked.js';
import * as MarkdownView from '../../../ui/components/markdown_view/markdown_view.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import { AgentType, type ContextDetail, type ConversationContext, ErrorType } from '../agents/AiAgent.js';
export interface Step {
    isLoading: boolean;
    thought?: string;
    title?: string;
    code?: string;
    output?: string;
    canceled?: boolean;
    sideEffect?: ConfirmSideEffectDialog;
    contextDetails?: [ContextDetail, ...ContextDetail[]];
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
    suggestions?: [string, ...string[]];
    answer?: string;
    error?: ErrorType;
    rpcId?: Host.AidaClient.RpcGlobalId;
}
export type ChatMessage = UserChatMessage | ModelChatMessage;
export declare const enum State {
    CONSENT_VIEW = "consent-view",
    CHAT_VIEW = "chat-view"
}
export interface Props {
    onTextSubmit: (text: string) => void;
    onInspectElementClick: () => void;
    onFeedbackSubmit: (rpcId: Host.AidaClient.RpcGlobalId, rate: Host.AidaClient.Rating, feedback?: string) => void;
    onCancelClick: () => void;
    onContextClick: () => void | Promise<void>;
    onNewConversation: () => void;
    onCancelCrossOriginChat?: () => void;
    inspectElementToggled: boolean;
    state: State;
    aidaAvailability: Host.AidaClient.AidaAccessPreconditions;
    messages: ChatMessage[];
    selectedContext: ConversationContext<unknown> | null;
    isLoading: boolean;
    canShowFeedbackForm: boolean;
    userInfo: Pick<Host.InspectorFrontendHostAPI.SyncInformation, 'accountImage' | 'accountFullName'>;
    agentType?: AgentType;
    isReadOnly: boolean;
    blockedByCrossOrigin: boolean;
    stripLinks: boolean;
}
declare class MarkdownRendererWithCodeBlock extends MarkdownView.MarkdownView.MarkdownInsightRenderer {
    #private;
    constructor(opts?: {
        stripLinks?: boolean;
    });
    templateForToken(token: Marked.Marked.MarkedToken): LitHtml.TemplateResult | null;
}
export declare class ChatView extends HTMLElement {
    #private;
    constructor(props: Props);
    set props(props: Props);
    connectedCallback(): void;
    disconnectedCallback(): void;
    focusTextInput(): void;
    restoreScrollPosition(): void;
    finishTextAnimations(): void;
    scrollToBottom(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-ai-chat-view': ChatView;
    }
}
export declare const FOR_TEST: {
    MarkdownRendererWithCodeBlock: typeof MarkdownRendererWithCodeBlock;
};
export {};
