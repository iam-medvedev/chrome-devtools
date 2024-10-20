import '../../../ui/components/spinners/spinners.js';
import './ProvideFeedback.js';
import * as Host from '../../../core/host/host.js';
import type * as SDK from '../../../core/sdk/sdk.js';
import * as Trace from '../../../models/trace/trace.js';
import type * as Workspace from '../../../models/workspace/workspace.js';
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
    rpcId?: number;
}
export type ChatMessage = UserChatMessage | ModelChatMessage;
export declare const enum State {
    CONSENT_VIEW = "consent-view",
    CHAT_VIEW = "chat-view"
}
export declare const enum AgentType {
    FREESTYLER = "freestyler",
    DRJONES_FILE = "drjones-file",
    DRJONES_NETWORK_REQUEST = "drjones-network-request",
    DRJONES_PERFORMANCE = "drjones-performance"
}
export interface Props {
    onTextSubmit: (text: string) => void;
    onInspectElementClick: () => void;
    onFeedbackSubmit: (rpcId: number, rate: Host.AidaClient.Rating, feedback?: string) => void;
    onCancelClick: () => void;
    onSelectedNetworkRequestClick: () => void | Promise<void>;
    onSelectedFileRequestClick: () => void | Promise<void>;
    inspectElementToggled: boolean;
    state: State;
    aidaAvailability: Host.AidaClient.AidaAccessPreconditions;
    messages: ChatMessage[];
    selectedElement: SDK.DOMModel.DOMNode | null;
    selectedFile: Workspace.UISourceCode.UISourceCode | null;
    selectedNetworkRequest: SDK.NetworkRequest.NetworkRequest | null;
    selectedStackTrace: Trace.Helpers.TreeHelpers.TraceEntryNodeForAI | null;
    isLoading: boolean;
    canShowFeedbackForm: boolean;
    userInfo: Pick<Host.InspectorFrontendHostAPI.SyncInformation, 'accountImage' | 'accountFullName'>;
    agentType?: AgentType;
}
declare class MarkdownRendererWithCodeBlock extends MarkdownView.MarkdownView.MarkdownInsightRenderer {
    templateForToken(token: Marked.Marked.MarkedToken): LitHtml.TemplateResult | null;
}
export declare class FreestylerChatUi extends HTMLElement {
    #private;
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
