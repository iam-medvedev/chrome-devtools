// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../ui/legacy/legacy.js';
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Workspace from '../../models/workspace/workspace.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import * as ElementsPanel from '../elements/elements.js';
import * as NetworkForward from '../network/forward/forward.js';
import * as NetworkPanel from '../network/network.js';
import * as SourcesPanel from '../sources/sources.js';
import * as TimelinePanel from '../timeline/timeline.js';
import * as TimelineUtils from '../timeline/utils/utils.js';
import { FileAgent, FileContext, } from './agents/FileAgent.js';
import { NetworkAgent, RequestContext, } from './agents/NetworkAgent.js';
import { CallTreeContext, PerformanceAgent } from './agents/PerformanceAgent.js';
import { NodeContext, StylingAgent, StylingAgentWithFunctionCalling } from './agents/StylingAgent.js';
import aiAssistancePanelStyles from './aiAssistancePanel.css.js';
import { AiHistoryStorage, Conversation } from './AiHistoryStorage.js';
import { ChangeManager } from './ChangeManager.js';
import { ChatView, } from './components/ChatView.js';
const { html } = Lit;
const AI_ASSISTANCE_SEND_FEEDBACK = 'https://crbug.com/364805393';
const AI_ASSISTANCE_HELP = 'https://goo.gle/devtools-ai-assistance';
const UIStrings = {
    /**
     *@description AI assistance UI text creating a new chat.
     */
    newChat: 'New chat',
    /**
     *@description AI assistance UI tooltip text for the help button.
     */
    help: 'Help',
    /**
     *@description AI assistant UI tooltip text for the settings button (gear icon).
     */
    settings: 'Settings',
    /**
     *@description AI assistant UI tooltip sending feedback.
     */
    sendFeedback: 'Send feedback',
    /**
     *@description Announcement text for screen readers when a new chat is created.
     */
    newChatCreated: 'New chat created',
    /**
     *@description Announcement text for screen readers when the chat is deleted.
     */
    chatDeleted: 'Chat deleted',
    /**
     *@description AI assistance UI text creating selecting a history entry.
     */
    history: 'History',
    /**
     *@description AI assistance UI text deleting the current chat session from local history.
     */
    deleteChat: 'Delete local chat',
    /**
     *@description AI assistance UI text that deletes all local history entries.
     */
    clearChatHistory: 'Clear local chats',
    /**
     *@description AI assistance UI text explains that he user had no pas conversations.
     */
    noPastConversations: 'No past conversations',
};
/*
* Strings that don't need to be translated at this time.
*/
const UIStringsNotTranslate = {
    /**
     *@description Announcement text for screen readers when the conversation starts.
     */
    answerLoading: 'Answer loading',
    /**
     *@description Announcement text for screen readers when the answer comes.
     */
    answerReady: 'Answer ready',
};
const str_ = i18n.i18n.registerUIStrings('panels/ai_assistance/AiAssistancePanel.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const lockedString = i18n.i18n.lockedString;
function selectedElementFilter(maybeNode) {
    if (maybeNode) {
        return maybeNode.nodeType() === Node.ELEMENT_NODE ? maybeNode : null;
    }
    return null;
}
function defaultView(input, output, target) {
    // clang-format off
    Lit.render(html `
    <devtools-ai-chat-view .props=${input} ${Lit.Directives.ref((el) => {
        if (!el || !(el instanceof ChatView)) {
            return;
        }
        output.chatView = el;
    })}></devtools-ai-chat-view>
  `, target, { host: input });
    // clang-format on
}
function createNodeContext(node) {
    if (!node) {
        return null;
    }
    return new NodeContext(node);
}
function createFileContext(file) {
    if (!file) {
        return null;
    }
    return new FileContext(file);
}
function createRequestContext(request) {
    if (!request) {
        return null;
    }
    return new RequestContext(request);
}
function createCallTreeContext(callTree) {
    if (!callTree) {
        return null;
    }
    return new CallTreeContext(callTree);
}
function agentTypeToConversationType(type) {
    switch (type) {
        case "freestyler" /* AgentType.STYLING */:
            return "freestyler" /* ConversationType.STYLING */;
        case "drjones-network-request" /* AgentType.NETWORK */:
            return "drjones-network-request" /* ConversationType.NETWORK */;
        case "drjones-file" /* AgentType.FILE */:
            return "drjones-file" /* ConversationType.FILE */;
        case "drjones-performance" /* AgentType.PERFORMANCE */:
            return "drjones-performance" /* ConversationType.PERFORMANCE */;
        case "patch" /* AgentType.PATCH */:
            throw new Error('PATCH AgentType does not have a corresponding ConversationType.');
    }
}
let panelInstance;
export class AiAssistancePanel extends UI.Panel.Panel {
    view;
    static panelName = 'freestyler';
    #toggleSearchElementAction;
    #contentContainer;
    #aidaClient;
    #viewProps;
    #viewOutput = {};
    #serverSideLoggingEnabled = isAiAssistanceServerSideLoggingEnabled();
    #aiAssistanceEnabledSetting;
    #changeManager = new ChangeManager();
    #mutex = new Common.Mutex.Mutex();
    #newChatButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.newChat), 'plus', undefined, 'freestyler.new-chat');
    #historyEntriesButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.history), 'history', undefined, 'freestyler.history');
    #deleteHistoryEntryButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.deleteChat), 'bin', undefined, 'freestyler.delete');
    #currentAgent;
    #currentConversation;
    #conversations = [];
    #previousSameOriginContext;
    #selectedFile = null;
    #selectedElement = null;
    #selectedCallTree = null;
    #selectedRequest = null;
    constructor(view = defaultView, { aidaClient, aidaAvailability, syncInfo }) {
        super(AiAssistancePanel.panelName);
        this.view = view;
        this.registerRequiredCSS(aiAssistancePanelStyles);
        this.#aiAssistanceEnabledSetting = this.#getAiAssistanceEnabledSetting();
        this.#createToolbar();
        this.#toggleSearchElementAction =
            UI.ActionRegistry.ActionRegistry.instance().getAction('elements.toggle-element-search');
        this.#aidaClient = aidaClient;
        this.#contentContainer = this.contentElement.createChild('div', 'chat-container');
        this.#viewProps = {
            state: this.#getChatUiState(),
            aidaAvailability,
            messages: [],
            inspectElementToggled: this.#toggleSearchElementAction.toggled(),
            isLoading: false,
            onTextSubmit: (text) => {
                void this.#startConversation(text);
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceQuerySubmitted);
            },
            onInspectElementClick: this.#handleSelectElementClick.bind(this),
            onFeedbackSubmit: this.#handleFeedbackSubmit.bind(this),
            onCancelClick: this.#cancel.bind(this),
            onContextClick: this.#handleContextClick.bind(this),
            onNewConversation: this.#handleNewChatRequest.bind(this),
            canShowFeedbackForm: this.#serverSideLoggingEnabled,
            userInfo: {
                accountImage: syncInfo.accountImage,
                accountFullName: syncInfo.accountFullName,
            },
            selectedContext: null,
            blockedByCrossOrigin: false,
            stripLinks: false,
            isReadOnly: false,
        };
        this.#conversations = AiHistoryStorage.instance().getHistory().map(item => Conversation.fromSerialized(item));
    }
    #createToolbar() {
        const toolbarContainer = this.contentElement.createChild('div', 'toolbar-container');
        toolbarContainer.setAttribute('jslog', VisualLogging.toolbar().toString());
        toolbarContainer.role = 'toolbar';
        const leftToolbar = toolbarContainer.createChild('devtools-toolbar', 'freestyler-left-toolbar');
        leftToolbar.role = 'presentation';
        const rightToolbar = toolbarContainer.createChild('devtools-toolbar', 'freestyler-right-toolbar');
        rightToolbar.role = 'presentation';
        this.#newChatButton.addEventListener("Click" /* UI.Toolbar.ToolbarButton.Events.CLICK */, this.#handleNewChatRequest.bind(this));
        leftToolbar.appendToolbarItem(this.#newChatButton);
        leftToolbar.appendSeparator();
        this.#historyEntriesButton.addEventListener("Click" /* UI.Toolbar.ToolbarButton.Events.CLICK */, event => {
            this.#onHistoryClicked(event.data);
        });
        leftToolbar.appendToolbarItem(this.#historyEntriesButton);
        this.#deleteHistoryEntryButton.addEventListener("Click" /* UI.Toolbar.ToolbarButton.Events.CLICK */, this.#onDeleteClicked.bind(this));
        leftToolbar.appendToolbarItem(this.#deleteHistoryEntryButton);
        const link = UI.XLink.XLink.create(AI_ASSISTANCE_SEND_FEEDBACK, i18nString(UIStrings.sendFeedback), undefined, undefined, 'freestyler.send-feedback');
        link.style.setProperty('display', null);
        link.style.setProperty('color', 'var(--sys-color-primary)');
        link.style.setProperty('margin', '0 var(--sys-size-3)');
        link.style.setProperty('height', 'calc(100% - 6px)');
        const linkItem = new UI.Toolbar.ToolbarItem(link);
        rightToolbar.appendToolbarItem(linkItem);
        rightToolbar.appendSeparator();
        const helpButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.help), 'help', undefined, 'freestyler.help');
        helpButton.addEventListener("Click" /* UI.Toolbar.ToolbarButton.Events.CLICK */, () => {
            Host.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(AI_ASSISTANCE_HELP);
        });
        rightToolbar.appendToolbarItem(helpButton);
        const settingsButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.settings), 'gear', undefined, 'freestyler.settings');
        settingsButton.addEventListener("Click" /* UI.Toolbar.ToolbarButton.Events.CLICK */, () => {
            void UI.ViewManager.ViewManager.instance().showView('chrome-ai');
        });
        rightToolbar.appendToolbarItem(settingsButton);
    }
    #getChatUiState() {
        const config = Common.Settings.Settings.instance().getHostConfig();
        const blockedByAge = config.aidaAvailability?.blockedByAge === true;
        return (this.#aiAssistanceEnabledSetting?.getIfNotDisabled() && !blockedByAge) ? "chat-view" /* ChatViewState.CHAT_VIEW */ :
            "consent-view" /* ChatViewState.CONSENT_VIEW */;
    }
    #getAiAssistanceEnabledSetting() {
        try {
            return Common.Settings.moduleSetting('ai-assistance-enabled');
        }
        catch {
            return;
        }
    }
    #createAgent(agentType) {
        const options = {
            aidaClient: this.#aidaClient,
            serverSideLoggingEnabled: this.#serverSideLoggingEnabled,
        };
        let agent;
        switch (agentType) {
            case "freestyler" /* AgentType.STYLING */: {
                agent = new StylingAgent({
                    ...options,
                    changeManager: this.#changeManager,
                });
                if (isAiAssistanceStylingWithFunctionCallingEnabled()) {
                    agent = new StylingAgentWithFunctionCalling({
                        ...options,
                        changeManager: this.#changeManager,
                    });
                }
                break;
            }
            case "drjones-network-request" /* AgentType.NETWORK */: {
                agent = new NetworkAgent(options);
                break;
            }
            case "drjones-file" /* AgentType.FILE */: {
                agent = new FileAgent(options);
                break;
            }
            case "drjones-performance" /* AgentType.PERFORMANCE */: {
                agent = new PerformanceAgent(options);
                break;
            }
            case "patch" /* AgentType.PATCH */: {
                throw new Error('AI Assistance does not support direct usage of the patch agent');
            }
        }
        return agent;
    }
    #updateToolbarState() {
        this.#deleteHistoryEntryButton.setVisible(Boolean(this.#currentConversation && !this.#currentConversation.isEmpty));
    }
    static async instance(opts = { forceNew: null }) {
        const { forceNew } = opts;
        if (!panelInstance || forceNew) {
            const aidaClient = new Host.AidaClient.AidaClient();
            const syncInfoPromise = new Promise(resolve => Host.InspectorFrontendHost.InspectorFrontendHostInstance.getSyncInformation(resolve));
            const [aidaAvailability, syncInfo] = await Promise.all([Host.AidaClient.AidaClient.checkAccessPreconditions(), syncInfoPromise]);
            panelInstance = new AiAssistancePanel(defaultView, { aidaClient, aidaAvailability, syncInfo });
        }
        return panelInstance;
    }
    // We select the default agent based on the open panels if
    // there isn't any active conversation.
    #selectDefaultAgentIfNeeded() {
        // If there already is an agent and not it is not empty,
        // we don't automatically change the agent.
        if (this.#currentAgent && !this.#currentAgent.isEmpty) {
            return;
        }
        const config = Common.Settings.Settings.instance().getHostConfig();
        const isElementsPanelVisible = Boolean(UI.Context.Context.instance().flavor(ElementsPanel.ElementsPanel.ElementsPanel));
        const isNetworkPanelVisible = Boolean(UI.Context.Context.instance().flavor(NetworkPanel.NetworkPanel.NetworkPanel));
        const isSourcesPanelVisible = Boolean(UI.Context.Context.instance().flavor(SourcesPanel.SourcesPanel.SourcesPanel));
        const isPerformancePanelVisible = Boolean(UI.Context.Context.instance().flavor(TimelinePanel.TimelinePanel.TimelinePanel));
        let targetAgentType = undefined;
        if (isElementsPanelVisible && config.devToolsFreestyler?.enabled) {
            targetAgentType = "freestyler" /* AgentType.STYLING */;
        }
        else if (isNetworkPanelVisible && config.devToolsAiAssistanceNetworkAgent?.enabled) {
            targetAgentType = "drjones-network-request" /* AgentType.NETWORK */;
        }
        else if (isSourcesPanelVisible && config.devToolsAiAssistanceFileAgent?.enabled) {
            targetAgentType = "drjones-file" /* AgentType.FILE */;
        }
        else if (isPerformancePanelVisible && config.devToolsAiAssistancePerformanceAgent?.enabled) {
            targetAgentType = "drjones-performance" /* AgentType.PERFORMANCE */;
        }
        const agent = targetAgentType ? this.#createAgent(targetAgentType) : undefined;
        this.#updateAgentState(agent);
    }
    #updateAgentState(agent) {
        if (this.#currentAgent !== agent) {
            this.#cancel();
            this.#currentAgent = agent;
            this.#viewProps.agentType = this.#currentAgent?.type;
            this.#viewProps.messages = [];
            this.#viewProps.changeSummary = undefined;
            this.#viewProps.isLoading = false;
            if (this.#currentAgent?.type) {
                this.#currentConversation =
                    new Conversation(agentTypeToConversationType(this.#currentAgent.type), [], agent?.id, false);
                this.#conversations.push(this.#currentConversation);
                this.#viewProps.isReadOnly = false;
            }
        }
        this.#onContextSelectionChanged();
        void this.doUpdate();
    }
    wasShown() {
        super.wasShown();
        this.#viewOutput.chatView?.restoreScrollPosition();
        this.#viewOutput.chatView?.focusTextInput();
        this.#selectDefaultAgentIfNeeded();
        void this.#handleAidaAvailabilityChange();
        void this
            .#handleAiAssistanceEnabledSettingChanged(); // If the setting was switched on/off while the AiAssistancePanel was not shown.
        this.#selectedElement =
            createNodeContext(selectedElementFilter(UI.Context.Context.instance().flavor(SDK.DOMModel.DOMNode))),
            this.#selectedRequest =
                createRequestContext(UI.Context.Context.instance().flavor(SDK.NetworkRequest.NetworkRequest)),
            this.#selectedCallTree =
                createCallTreeContext(UI.Context.Context.instance().flavor(TimelineUtils.AICallTree.AICallTree)),
            this.#selectedFile = createFileContext(UI.Context.Context.instance().flavor(Workspace.UISourceCode.UISourceCode)),
            this.#viewProps = {
                ...this.#viewProps,
                agentType: this.#currentAgent?.type,
                inspectElementToggled: this.#toggleSearchElementAction.toggled(),
                selectedContext: this.#getConversationContext(),
            };
        void this.doUpdate();
        this.#aiAssistanceEnabledSetting?.addChangeListener(this.#handleAiAssistanceEnabledSettingChanged, this);
        Host.AidaClient.HostConfigTracker.instance().addEventListener("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */, this.#handleAidaAvailabilityChange);
        this.#toggleSearchElementAction.addEventListener("Toggled" /* UI.ActionRegistration.Events.TOGGLED */, this.#handleSearchElementActionToggled);
        UI.Context.Context.instance().addFlavorChangeListener(SDK.DOMModel.DOMNode, this.#handleDOMNodeFlavorChange);
        UI.Context.Context.instance().addFlavorChangeListener(SDK.NetworkRequest.NetworkRequest, this.#handleNetworkRequestFlavorChange);
        UI.Context.Context.instance().addFlavorChangeListener(TimelineUtils.AICallTree.AICallTree, this.#handleTraceEntryNodeFlavorChange);
        UI.Context.Context.instance().addFlavorChangeListener(Workspace.UISourceCode.UISourceCode, this.#handleUISourceCodeFlavorChange);
        UI.Context.Context.instance().addFlavorChangeListener(ElementsPanel.ElementsPanel.ElementsPanel, this.#selectDefaultAgentIfNeeded, this);
        UI.Context.Context.instance().addFlavorChangeListener(NetworkPanel.NetworkPanel.NetworkPanel, this.#selectDefaultAgentIfNeeded, this);
        UI.Context.Context.instance().addFlavorChangeListener(SourcesPanel.SourcesPanel.SourcesPanel, this.#selectDefaultAgentIfNeeded, this);
        UI.Context.Context.instance().addFlavorChangeListener(TimelinePanel.TimelinePanel.TimelinePanel, this.#selectDefaultAgentIfNeeded, this);
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.AttrModified, this.#handleDOMNodeAttrChange, this);
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.AttrRemoved, this.#handleDOMNodeAttrChange, this);
        Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistancePanelOpened);
    }
    willHide() {
        this.#aiAssistanceEnabledSetting?.removeChangeListener(this.#handleAiAssistanceEnabledSettingChanged, this);
        Host.AidaClient.HostConfigTracker.instance().removeEventListener("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */, this.#handleAidaAvailabilityChange);
        this.#toggleSearchElementAction.removeEventListener("Toggled" /* UI.ActionRegistration.Events.TOGGLED */, this.#handleSearchElementActionToggled);
        UI.Context.Context.instance().removeFlavorChangeListener(SDK.DOMModel.DOMNode, this.#handleDOMNodeFlavorChange);
        UI.Context.Context.instance().removeFlavorChangeListener(SDK.NetworkRequest.NetworkRequest, this.#handleNetworkRequestFlavorChange);
        UI.Context.Context.instance().removeFlavorChangeListener(TimelineUtils.AICallTree.AICallTree, this.#handleTraceEntryNodeFlavorChange);
        UI.Context.Context.instance().removeFlavorChangeListener(Workspace.UISourceCode.UISourceCode, this.#handleUISourceCodeFlavorChange);
        UI.Context.Context.instance().removeFlavorChangeListener(ElementsPanel.ElementsPanel.ElementsPanel, this.#selectDefaultAgentIfNeeded, this);
        UI.Context.Context.instance().removeFlavorChangeListener(NetworkPanel.NetworkPanel.NetworkPanel, this.#selectDefaultAgentIfNeeded, this);
        UI.Context.Context.instance().removeFlavorChangeListener(SourcesPanel.SourcesPanel.SourcesPanel, this.#selectDefaultAgentIfNeeded, this);
        UI.Context.Context.instance().removeFlavorChangeListener(TimelinePanel.TimelinePanel.TimelinePanel, this.#selectDefaultAgentIfNeeded, this);
        SDK.TargetManager.TargetManager.instance().removeModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.AttrModified, this.#handleDOMNodeAttrChange, this);
        SDK.TargetManager.TargetManager.instance().removeModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.AttrRemoved, this.#handleDOMNodeAttrChange, this);
    }
    #handleAidaAvailabilityChange = async () => {
        const currentAidaAvailability = await Host.AidaClient.AidaClient.checkAccessPreconditions();
        if (currentAidaAvailability !== this.#viewProps.aidaAvailability) {
            this.#viewProps.aidaAvailability = currentAidaAvailability;
            const syncInfo = await new Promise(resolve => Host.InspectorFrontendHost.InspectorFrontendHostInstance.getSyncInformation(resolve));
            this.#viewProps.userInfo = {
                accountImage: syncInfo.accountImage,
                accountFullName: syncInfo.accountFullName,
            };
            this.#viewProps.state = this.#getChatUiState();
            void this.doUpdate();
        }
    };
    #handleSearchElementActionToggled = (ev) => {
        if (this.#viewProps.inspectElementToggled === ev.data) {
            return;
        }
        this.#viewProps.inspectElementToggled = ev.data;
        void this.doUpdate();
    };
    #handleDOMNodeFlavorChange = (ev) => {
        if (this.#selectedElement?.getItem() === ev.data) {
            return;
        }
        this.#selectedElement = createNodeContext(selectedElementFilter(ev.data));
        this.#updateAgentState(this.#currentAgent);
    };
    #handleDOMNodeAttrChange = (ev) => {
        if (this.#selectedElement?.getItem() === ev.data.node) {
            if (ev.data.name === 'class' || ev.data.name === 'id') {
                void this.doUpdate();
            }
        }
    };
    #handleNetworkRequestFlavorChange = (ev) => {
        if (this.#selectedRequest?.getItem() === ev.data) {
            return;
        }
        this.#selectedRequest = Boolean(ev.data) ? new RequestContext(ev.data) : null;
        this.#updateAgentState(this.#currentAgent);
    };
    #handleTraceEntryNodeFlavorChange = (ev) => {
        if (this.#selectedCallTree?.getItem() === ev.data) {
            return;
        }
        this.#selectedCallTree = Boolean(ev.data) ? new CallTreeContext(ev.data) : null;
        this.#updateAgentState(this.#currentAgent);
    };
    #handleUISourceCodeFlavorChange = (ev) => {
        const newFile = ev.data;
        if (!newFile) {
            return;
        }
        if (this.#selectedFile?.getItem() === newFile) {
            return;
        }
        this.#selectedFile = new FileContext(ev.data);
        this.#updateAgentState(this.#currentAgent);
    };
    #handleAiAssistanceEnabledSettingChanged = () => {
        const nextChatUiState = this.#getChatUiState();
        if (this.#viewProps.state === nextChatUiState) {
            return;
        }
        this.#viewProps.state = nextChatUiState;
        void this.doUpdate();
    };
    async doUpdate() {
        this.#updateToolbarState();
        this.view(this.#viewProps, this.#viewOutput, this.#contentContainer);
    }
    #handleSelectElementClick() {
        void this.#toggleSearchElementAction.execute();
    }
    #handleFeedbackSubmit(rpcId, rating, feedback) {
        void this.#aidaClient.registerClientEvent({
            corresponding_aida_rpc_global_id: rpcId,
            disable_user_content_logging: !this.#serverSideLoggingEnabled,
            do_conversation_client_event: {
                user_feedback: {
                    sentiment: rating,
                    user_input: {
                        comment: feedback,
                    },
                },
            },
        });
    }
    #handleContextClick() {
        const context = this.#viewProps.selectedContext;
        if (context instanceof RequestContext) {
            const requestLocation = NetworkForward.UIRequestLocation.UIRequestLocation.tab(context.getItem(), "headers-component" /* NetworkForward.UIRequestLocation.UIRequestTabs.HEADERS_COMPONENT */);
            return Common.Revealer.reveal(requestLocation);
        }
        if (context instanceof FileContext) {
            return Common.Revealer.reveal(context.getItem().uiLocation(0, 0));
        }
        if (context instanceof CallTreeContext) {
            const trace = new SDK.TraceObject.RevealableEvent(context.getItem().selectedNode.event);
            return Common.Revealer.reveal(trace);
        }
        // Node picker is using linkifier.
    }
    handleAction(actionId) {
        if (this.#viewProps.isLoading) {
            // If running some queries already, focus the input with the abort
            // button and do nothing.
            this.#viewOutput.chatView?.focusTextInput();
            return;
        }
        let targetAgentType;
        switch (actionId) {
            case 'freestyler.elements-floating-button': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceOpenedFromElementsPanelFloatingButton);
                targetAgentType = "freestyler" /* AgentType.STYLING */;
                break;
            }
            case 'freestyler.element-panel-context': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceOpenedFromElementsPanel);
                targetAgentType = "freestyler" /* AgentType.STYLING */;
                break;
            }
            case 'drjones.network-floating-button': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceOpenedFromNetworkPanelFloatingButton);
                targetAgentType = "drjones-network-request" /* AgentType.NETWORK */;
                break;
            }
            case 'drjones.network-panel-context': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceOpenedFromNetworkPanel);
                targetAgentType = "drjones-network-request" /* AgentType.NETWORK */;
                break;
            }
            case 'drjones.performance-panel-context': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceOpenedFromPerformancePanel);
                targetAgentType = "drjones-performance" /* AgentType.PERFORMANCE */;
                break;
            }
            case 'drjones.sources-floating-button': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceOpenedFromSourcesPanelFloatingButton);
                targetAgentType = "drjones-file" /* AgentType.FILE */;
                break;
            }
            case 'drjones.sources-panel-context': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceOpenedFromSourcesPanel);
                targetAgentType = "drjones-file" /* AgentType.FILE */;
                break;
            }
        }
        if (!targetAgentType) {
            return;
        }
        let agent = this.#currentAgent;
        if (!this.#currentConversation || !this.#currentAgent || this.#currentAgent.type !== targetAgentType ||
            this.#currentConversation?.isEmpty || targetAgentType === "drjones-performance" /* AgentType.PERFORMANCE */) {
            agent = this.#createAgent(targetAgentType);
        }
        this.#updateAgentState(agent);
        this.#viewOutput.chatView?.focusTextInput();
    }
    #onHistoryClicked(event) {
        const boundingRect = this.#historyEntriesButton.element.getBoundingClientRect();
        const contextMenu = new UI.ContextMenu.ContextMenu(event, {
            x: boundingRect.left,
            y: boundingRect.bottom,
            useSoftMenu: true,
        });
        for (const conversation of [...this.#conversations].reverse()) {
            if (conversation.isEmpty) {
                continue;
            }
            const title = conversation.title;
            if (!title) {
                continue;
            }
            contextMenu.defaultSection().appendCheckboxItem(title, () => {
                void this.#openConversation(conversation);
            }, { checked: (this.#currentConversation === conversation) });
        }
        const historyEmpty = contextMenu.defaultSection().items.length === 0;
        if (historyEmpty) {
            contextMenu.defaultSection().appendItem(i18nString(UIStrings.noPastConversations), () => { }, {
                disabled: true,
            });
        }
        contextMenu.footerSection().appendItem(i18nString(UIStrings.clearChatHistory), () => {
            this.#clearHistory();
        }, {
            disabled: historyEmpty,
        });
        void contextMenu.show();
    }
    #clearHistory() {
        this.#conversations = [];
        this.#currentConversation = undefined;
        void AiHistoryStorage.instance().deleteAll();
        this.#updateAgentState();
    }
    #onDeleteClicked() {
        if (this.#currentAgent) {
            this.#conversations = this.#conversations.filter(conversation => conversation !== this.#currentConversation);
            this.#currentConversation = undefined;
            void AiHistoryStorage.instance().deleteHistoryEntry(this.#currentAgent.id);
        }
        this.#updateAgentState();
        this.#selectDefaultAgentIfNeeded();
        UI.ARIAUtils.alert(i18nString(UIStrings.chatDeleted));
    }
    async #openConversation(conversation) {
        if (this.#currentConversation === conversation) {
            return;
        }
        this.#currentConversation = conversation;
        this.#viewProps.messages = [];
        this.#viewProps.isReadOnly = this.#currentConversation?.isReadOnly ?? false;
        await this.#doConversation(conversation.history);
    }
    #handleNewChatRequest() {
        this.#updateAgentState();
        this.#selectDefaultAgentIfNeeded();
        UI.ARIAUtils.alert(i18nString(UIStrings.newChatCreated));
    }
    #handleCrossOriginChatCancellation() {
        if (this.#previousSameOriginContext) {
            this.#onContextSelectionChanged(this.#previousSameOriginContext);
            void this.doUpdate();
        }
    }
    #runAbortController = new AbortController();
    #cancel() {
        this.#runAbortController.abort();
        this.#viewProps.isLoading = false;
        void this.doUpdate();
    }
    #onContextSelectionChanged(contextToRestore) {
        if (!this.#currentAgent) {
            this.#viewProps.blockedByCrossOrigin = false;
            return;
        }
        const currentContext = contextToRestore ?? this.#getConversationContext();
        this.#viewProps.selectedContext = currentContext;
        if (!currentContext) {
            this.#viewProps.blockedByCrossOrigin = false;
            return;
        }
        this.#viewProps.blockedByCrossOrigin = !currentContext.isOriginAllowed(this.#currentAgent.origin);
        if (!this.#viewProps.blockedByCrossOrigin) {
            this.#previousSameOriginContext = currentContext;
        }
        if (this.#viewProps.blockedByCrossOrigin && this.#previousSameOriginContext) {
            this.#viewProps.onCancelCrossOriginChat = this.#handleCrossOriginChatCancellation.bind(this);
        }
        this.#viewProps.stripLinks = this.#viewProps.agentType === "drjones-performance" /* AgentType.PERFORMANCE */;
    }
    #getConversationContext() {
        if (!this.#currentAgent) {
            return null;
        }
        let context;
        switch (this.#currentAgent.type) {
            case "freestyler" /* AgentType.STYLING */:
                context = this.#selectedElement;
                break;
            case "drjones-file" /* AgentType.FILE */:
                context = this.#selectedFile;
                break;
            case "drjones-network-request" /* AgentType.NETWORK */:
                context = this.#selectedRequest;
                break;
            case "drjones-performance" /* AgentType.PERFORMANCE */:
                context = this.#selectedCallTree;
                break;
            case "patch" /* AgentType.PATCH */:
                throw new Error('AI Assistance does not support direct usage of the patch agent');
        }
        return context;
    }
    async #startConversation(text) {
        if (!this.#currentAgent) {
            return;
        }
        // Cancel any previous in-flight conversation.
        this.#cancel();
        this.#runAbortController = new AbortController();
        const signal = this.#runAbortController.signal;
        const context = this.#getConversationContext();
        // If a different context is provided, it must be from the same origin.
        if (context && !context.isOriginAllowed(this.#currentAgent.origin)) {
            // This error should not be reached. If it happens, some
            // invariants do not hold anymore.
            throw new Error('cross-origin context data should not be included');
        }
        const runner = this.#currentAgent.run(text, {
            signal,
            selected: context,
        });
        UI.ARIAUtils.alert(lockedString(UIStringsNotTranslate.answerLoading));
        await this.#doConversation(this.#saveResponsesToCurrentConversation(runner));
        UI.ARIAUtils.alert(lockedString(UIStringsNotTranslate.answerReady));
    }
    async *#saveResponsesToCurrentConversation(items) {
        for await (const data of items) {
            this.#currentConversation?.addHistoryItem(data);
            yield data;
        }
    }
    async #doConversation(items) {
        const release = await this.#mutex.acquire();
        try {
            let systemMessage = {
                entity: "model" /* ChatMessageEntity.MODEL */,
                steps: [],
            };
            let step = { isLoading: true };
            /**
             * Commits the step to props only if necessary.
             */
            function commitStep() {
                if (systemMessage.steps.at(-1) !== step) {
                    systemMessage.steps.push(step);
                }
            }
            this.#viewProps.isLoading = true;
            for await (const data of items) {
                step.sideEffect = undefined;
                switch (data.type) {
                    case "user-query" /* ResponseType.USER_QUERY */: {
                        this.#viewProps.messages.push({
                            entity: "user" /* ChatMessageEntity.USER */,
                            text: data.query,
                        });
                        systemMessage = {
                            entity: "model" /* ChatMessageEntity.MODEL */,
                            steps: [],
                        };
                        this.#viewProps.messages.push(systemMessage);
                        break;
                    }
                    case "querying" /* ResponseType.QUERYING */: {
                        step = { isLoading: true };
                        if (!systemMessage.steps.length) {
                            systemMessage.steps.push(step);
                        }
                        break;
                    }
                    case "context" /* ResponseType.CONTEXT */: {
                        step.title = data.title;
                        step.contextDetails = data.details;
                        step.isLoading = false;
                        commitStep();
                        break;
                    }
                    case "title" /* ResponseType.TITLE */: {
                        step.title = data.title;
                        commitStep();
                        break;
                    }
                    case "thought" /* ResponseType.THOUGHT */: {
                        step.isLoading = false;
                        step.thought = data.thought;
                        commitStep();
                        break;
                    }
                    case "suggestions" /* ResponseType.SUGGESTIONS */: {
                        systemMessage.suggestions = data.suggestions;
                        break;
                    }
                    case "side-effect" /* ResponseType.SIDE_EFFECT */: {
                        step.isLoading = false;
                        step.code ??= data.code;
                        step.sideEffect = {
                            onAnswer: data.confirm,
                        };
                        commitStep();
                        break;
                    }
                    case "action" /* ResponseType.ACTION */: {
                        step.isLoading = false;
                        step.code ??= data.code;
                        step.output ??= data.output;
                        step.canceled = data.canceled;
                        if (isAiAssistancePatchingEnabled() && this.#currentAgent && !this.#currentConversation?.isReadOnly) {
                            this.#viewProps.changeSummary = this.#changeManager.formatChanges(this.#currentAgent.id);
                        }
                        commitStep();
                        break;
                    }
                    case "answer" /* ResponseType.ANSWER */: {
                        systemMessage.suggestions ??= data.suggestions;
                        systemMessage.answer = data.text;
                        systemMessage.rpcId = data.rpcId;
                        // When there is an answer without any thinking steps, we don't want to show the thinking step.
                        if (systemMessage.steps.length === 1 && systemMessage.steps[0].isLoading) {
                            systemMessage.steps.pop();
                        }
                        step.isLoading = false;
                        break;
                    }
                    case "error" /* ResponseType.ERROR */: {
                        systemMessage.error = data.error;
                        systemMessage.rpcId = undefined;
                        const lastStep = systemMessage.steps.at(-1);
                        if (lastStep) {
                            // Mark the last step as cancelled to make the UI feel better.
                            if (data.error === "abort" /* ErrorType.ABORT */) {
                                lastStep.canceled = true;
                                // If error happens while the step is still loading remove it.
                            }
                            else if (lastStep.isLoading) {
                                systemMessage.steps.pop();
                            }
                        }
                        if (data.error === "block" /* ErrorType.BLOCK */) {
                            systemMessage.answer = undefined;
                        }
                    }
                }
                // Commit update intermediated step when not
                // in read only mode.
                if (!this.#viewProps.isReadOnly) {
                    void this.doUpdate();
                    // This handles scrolling to the bottom for live conversations when:
                    // * User submits the query & the context step is shown.
                    // * There is a side effect dialog  shown.
                    if (data.type === "context" /* ResponseType.CONTEXT */ || data.type === "side-effect" /* ResponseType.SIDE_EFFECT */) {
                        this.#viewOutput.chatView?.scrollToBottom();
                    }
                }
            }
            this.#viewProps.isLoading = false;
            this.#viewOutput.chatView?.finishTextAnimations();
            void this.doUpdate();
        }
        finally {
            release();
        }
    }
}
export class ActionDelegate {
    handleAction(_context, actionId) {
        switch (actionId) {
            case 'freestyler.elements-floating-button':
            case 'freestyler.element-panel-context':
            case 'drjones.network-floating-button':
            case 'drjones.network-panel-context':
            case 'drjones.performance-panel-context':
            case 'drjones.sources-floating-button':
            case 'drjones.sources-panel-context': {
                void (async () => {
                    const view = UI.ViewManager.ViewManager.instance().view(AiAssistancePanel.panelName);
                    if (view) {
                        await UI.ViewManager.ViewManager.instance().showView(AiAssistancePanel.panelName);
                        const widget = (await view.widget());
                        widget.handleAction(actionId);
                    }
                })();
                return true;
            }
        }
        return false;
    }
}
function isAiAssistancePatchingEnabled() {
    const config = Common.Settings.Settings.instance().getHostConfig();
    return Boolean(config.devToolsFreestyler?.patching);
}
function isAiAssistanceServerSideLoggingEnabled() {
    const config = Common.Settings.Settings.instance().getHostConfig();
    return !config.aidaAvailability?.disallowLogging;
}
function isAiAssistanceStylingWithFunctionCallingEnabled() {
    const config = Common.Settings.Settings.instance().getHostConfig();
    return Boolean(config.devToolsFreestyler?.functionCalling);
}
//# sourceMappingURL=AiAssistancePanel.js.map