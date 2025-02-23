import '../../../ui/components/spinners/spinners.js';
import * as Host from '../../../core/host/host.js';
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
    imageInput?: Host.AidaClient.Part;
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
    onTextSubmit: (text: string, imageInput?: Host.AidaClient.Part) => void;
    onInspectElementClick: () => void;
    onFeedbackSubmit: (rpcId: Host.AidaClient.RpcGlobalId, rate: Host.AidaClient.Rating, feedback?: string) => void;
    onCancelClick: () => void;
    onContextClick: () => void;
    onNewConversation: () => void;
    onCancelCrossOriginChat?: () => void;
    onTakeScreenshot?: () => void;
    onRemoveImageInput?: () => void;
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
    changeSummary?: string;
    patchSuggestion?: string;
    patchSuggestionLoading?: boolean;
    projectName?: string;
    multimodalInputEnabled?: boolean;
    imageInput?: string;
    onApplyToWorkspace?: () => void;
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
export {};
