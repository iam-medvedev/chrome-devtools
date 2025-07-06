import '../../ui/legacy/legacy.js';
import * as Host from '../../core/host/host.js';
import * as AiAssistanceModel from '../../models/ai_assistance/ai_assistance.js';
import * as UI from '../../ui/legacy/legacy.js';
import { ChatView, type Props as ChatViewProps } from './components/ChatView.js';
interface ToolbarViewInput {
    onNewChatClick: () => void;
    populateHistoryMenu: (contextMenu: UI.ContextMenu.ContextMenu) => void;
    onDeleteClick: () => void;
    onHelpClick: () => void;
    onSettingsClick: () => void;
    showDeleteHistoryAction: boolean;
    showChatActions: boolean;
}
export type ViewInput = ChatViewProps & ToolbarViewInput;
export interface PanelViewOutput {
    chatView?: ChatView;
}
type View = (input: ViewInput, output: PanelViewOutput, target: HTMLElement) => void;
export declare class AiAssistancePanel extends UI.Panel.Panel {
    #private;
    private view;
    static panelName: string;
    constructor(view: View | undefined, { aidaClient, aidaAvailability, syncInfo }: {
        aidaClient: Host.AidaClient.AidaClient;
        aidaAvailability: Host.AidaClient.AidaAccessPreconditions;
        syncInfo: Host.InspectorFrontendHostAPI.SyncInformation;
    });
    static instance(opts?: {
        forceNew: boolean | null;
    } | undefined): Promise<AiAssistancePanel>;
    wasShown(): void;
    willHide(): void;
    performUpdate(): Promise<void>;
    handleAction(actionId: string): void;
    /**
     * Handles an external request using the given prompt and uses the
     * conversation type to use the correct agent. Note that the `selector` param
     * is contextual; for styling it is a literal CSS selector, but for
     * Performance Insights it is the name of the Insight that forms the
     * context of the conversation.
     */
    handleExternalRequest(prompt: string, conversationType: AiAssistanceModel.ConversationType, selector?: string): Promise<{
        response: string;
        devToolsLogs: object[];
    }>;
    handleExternalPerformanceInsightsRequest(prompt: string, insightTitle: string): Promise<{
        response: string;
        devToolsLogs: object[];
    }>;
    handleExternalStylingRequest(prompt: string, selector?: string): Promise<{
        response: string;
        devToolsLogs: object[];
    }>;
}
export declare class ActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(_context: UI.Context.Context, actionId: string): boolean;
}
export {};
