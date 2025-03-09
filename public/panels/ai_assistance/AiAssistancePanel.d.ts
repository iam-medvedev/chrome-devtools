import '../../ui/legacy/legacy.js';
import * as Host from '../../core/host/host.js';
import * as UI from '../../ui/legacy/legacy.js';
import { ChatView, type Props as ChatViewProps } from './components/ChatView.js';
interface ToolbarViewInput {
    onNewChatClick: () => void;
    onHistoryClick: (event: MouseEvent) => void;
    onDeleteClick: () => void;
    onHelpClick: () => void;
    onSettingsClick: () => void;
    isDeleteHistoryButtonVisible: boolean;
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
}
export declare class ActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(_context: UI.Context.Context, actionId: string): boolean;
}
export {};
