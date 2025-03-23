import '../../../ui/components/spinners/spinners.js';
import * as Host from '../../../core/host/host.js';
import type * as Platform from '../../../core/platform/platform.js';
import * as AiAssistanceModel from '../../../models/ai_assistance/ai_assistance.js';
export interface Step {
    isLoading: boolean;
    thought?: string;
    title?: string;
    code?: string;
    output?: string;
    canceled?: boolean;
    sideEffect?: ConfirmSideEffectDialog;
    contextDetails?: [AiAssistanceModel.ContextDetail, ...AiAssistanceModel.ContextDetail[]];
}
interface ConfirmSideEffectDialog {
    onAnswer: (result: boolean) => void;
}
export declare const enum ChatMessageEntity {
    MODEL = "model",
    USER = "user"
}
export type ImageInputData = {
    isLoading: true;
} | {
    isLoading: false;
    data: string;
};
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
    error?: AiAssistanceModel.ErrorType;
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
    onTakeScreenshot?: () => void;
    onRemoveImageInput?: () => void;
    onTextInputChange: (input: string) => void;
    inspectElementToggled: boolean;
    state: State;
    aidaAvailability: Host.AidaClient.AidaAccessPreconditions;
    messages: ChatMessage[];
    selectedContext: AiAssistanceModel.ConversationContext<unknown> | null;
    isLoading: boolean;
    canShowFeedbackForm: boolean;
    userInfo: Pick<Host.InspectorFrontendHostAPI.SyncInformation, 'accountImage' | 'accountFullName'>;
    conversationType?: AiAssistanceModel.ConversationType;
    isReadOnly: boolean;
    blockedByCrossOrigin: boolean;
    changeSummary?: string;
    patchSuggestion?: string;
    patchSuggestionLoading?: boolean;
    projectName?: string;
    multimodalInputEnabled?: boolean;
    imageInput?: ImageInputData;
    onApplyToWorkspace?: () => void;
    isTextInputDisabled: boolean;
    emptyStateSuggestions: string[];
    inputPlaceholder: Platform.UIString.LocalizedString;
    disclaimerText: Platform.UIString.LocalizedString;
    isTextInputEmpty: boolean;
}
export declare class ChatView extends HTMLElement {
    #private;
    constructor(props: Props);
    set props(props: Props);
    connectedCallback(): void;
    disconnectedCallback(): void;
    focusTextInput(): void;
    restoreScrollPosition(): void;
    scrollToBottom(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-ai-chat-view': ChatView;
    }
}
export {};
