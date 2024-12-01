// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Workspace from '../../models/workspace/workspace.js';
import * as ElementsPanel from '../../panels/elements/elements.js';
import * as NetworkForward from '../../panels/network/forward/forward.js';
import * as NetworkPanel from '../../panels/network/network.js';
import * as SourcesPanel from '../../panels/sources/sources.js';
import * as TimelinePanel from '../../panels/timeline/timeline.js';
import * as TimelineUtils from '../../panels/timeline/utils/utils.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as LitHtml from '../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import { AiHistoryStorage, } from './AiHistoryStorage.js';
import { ChangeManager } from './ChangeManager.js';
import { FreestylerChatUi, } from './components/FreestylerChatUi.js';
import { DrJonesFileAgent, FileContext, } from './DrJonesFileAgent.js';
import { DrJonesNetworkAgent, RequestContext, } from './DrJonesNetworkAgent.js';
import { CallTreeContext, DrJonesPerformanceAgent } from './DrJonesPerformanceAgent.js';
import { FreestylerAgent, NodeContext } from './FreestylerAgent.js';
import freestylerPanelStyles from './freestylerPanel.css.js';
const { html } = LitHtml;
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
const str_ = i18n.i18n.registerUIStrings('panels/freestyler/FreestylerPanel.ts', UIStrings);
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
    LitHtml.render(html `
    <devtools-freestyler-chat-ui .props=${input} ${LitHtml.Directives.ref((el) => {
        if (!el || !(el instanceof FreestylerChatUi)) {
            return;
        }
        output.freestylerChatUi = el;
    })}></devtools-freestyler-chat-ui>
  `, target, { host: input }); // eslint-disable-line rulesdir/lit_html_host_this
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
let freestylerPanelInstance;
export class FreestylerPanel extends UI.Panel.Panel {
    view;
    static panelName = 'freestyler';
    #toggleSearchElementAction;
    #contentContainer;
    #aidaClient;
    #viewProps;
    #viewOutput = {};
    #serverSideLoggingEnabled = isFreestylerServerSideLoggingEnabled();
    #freestylerEnabledSetting;
    #changeManager = new ChangeManager();
    #newChatButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.newChat), 'plus', undefined, 'freestyler.new-chat');
    #historyEntriesButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.history), 'history', undefined, 'freestyler.history');
    #deleteHistoryEntryButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.deleteChat), 'bin', undefined, 'freestyler.delete');
    #agents = new Set();
    #currentAgent;
    #previousSameOriginContext;
    #selectedFile = null;
    #selectedElement = null;
    #selectedCallTree = null;
    #selectedRequest = null;
    constructor(view = defaultView, { aidaClient, aidaAvailability, syncInfo }) {
        super(FreestylerPanel.panelName);
        this.view = view;
        this.#freestylerEnabledSetting = this.#getAiAssistanceEnabledSetting();
        this.#createToolbar();
        this.#toggleSearchElementAction =
            UI.ActionRegistry.ActionRegistry.instance().getAction('elements.toggle-element-search');
        this.#aidaClient = aidaClient;
        this.#contentContainer = this.contentElement.createChild('div', 'freestyler-chat-ui-container');
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
        for (const historyEntry of AiHistoryStorage.instance().getHistory()) {
            this.#createAgent(historyEntry.type, historyEntry);
        }
    }
    #createToolbar() {
        const toolbarContainer = this.contentElement.createChild('div', 'freestyler-toolbar-container');
        toolbarContainer.setAttribute('jslog', VisualLogging.toolbar().toString());
        const leftToolbar = new UI.Toolbar.Toolbar('freestyler-left-toolbar', toolbarContainer);
        const rightToolbar = new UI.Toolbar.Toolbar('freestyler-right-toolbar', toolbarContainer);
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
        return (this.#freestylerEnabledSetting?.getIfNotDisabled() && !blockedByAge) ? "chat-view" /* FreestylerChatUiState.CHAT_VIEW */ :
            "consent-view" /* FreestylerChatUiState.CONSENT_VIEW */;
    }
    #getAiAssistanceEnabledSetting() {
        try {
            return Common.Settings.moduleSetting('ai-assistance-enabled');
        }
        catch {
            return;
        }
    }
    #createAgent(agentType, history) {
        const options = {
            aidaClient: this.#aidaClient,
            serverSideLoggingEnabled: this.#serverSideLoggingEnabled,
        };
        let agent;
        switch (agentType) {
            case "freestyler" /* AgentType.FREESTYLER */: {
                agent = new FreestylerAgent({
                    ...options,
                    changeManager: this.#changeManager,
                });
                break;
            }
            case "drjones-network-request" /* AgentType.DRJONES_NETWORK_REQUEST */: {
                agent = new DrJonesNetworkAgent(options);
                break;
            }
            case "drjones-file" /* AgentType.DRJONES_FILE */: {
                agent = new DrJonesFileAgent(options);
                break;
            }
            case "drjones-performance" /* AgentType.DRJONES_PERFORMANCE */: {
                agent = new DrJonesPerformanceAgent(options);
                break;
            }
        }
        if (history) {
            agent.populateHistoryFromStorage(history);
        }
        this.#agents.add(agent);
        return agent;
    }
    #updateToolbarState() {
        this.#deleteHistoryEntryButton.setVisible(Boolean(this.#currentAgent && !this.#currentAgent.isEmpty));
    }
    static async instance(opts = { forceNew: null }) {
        const { forceNew } = opts;
        if (!freestylerPanelInstance || forceNew) {
            const aidaClient = new Host.AidaClient.AidaClient();
            const syncInfoPromise = new Promise(resolve => Host.InspectorFrontendHost.InspectorFrontendHostInstance.getSyncInformation(resolve));
            const [aidaAvailability, syncInfo] = await Promise.all([Host.AidaClient.AidaClient.checkAccessPreconditions(), syncInfoPromise]);
            freestylerPanelInstance = new FreestylerPanel(defaultView, { aidaClient, aidaAvailability, syncInfo });
        }
        return freestylerPanelInstance;
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
            targetAgentType = "freestyler" /* AgentType.FREESTYLER */;
        }
        else if (isNetworkPanelVisible && config.devToolsAiAssistanceNetworkAgent?.enabled) {
            targetAgentType = "drjones-network-request" /* AgentType.DRJONES_NETWORK_REQUEST */;
        }
        else if (isSourcesPanelVisible && config.devToolsAiAssistanceFileAgent?.enabled) {
            targetAgentType = "drjones-file" /* AgentType.DRJONES_FILE */;
        }
        else if (isPerformancePanelVisible && config.devToolsAiAssistancePerformanceAgent?.enabled) {
            targetAgentType = "drjones-performance" /* AgentType.DRJONES_PERFORMANCE */;
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
            this.#viewProps.isLoading = false;
            this.#viewProps.isReadOnly = this.#currentAgent?.isHistoryEntry ?? false;
        }
        this.#onContextSelectionChanged();
        void this.doUpdate();
    }
    wasShown() {
        this.registerCSSFiles([freestylerPanelStyles]);
        this.#viewOutput.freestylerChatUi?.restoreScrollPosition();
        this.#viewOutput.freestylerChatUi?.focusTextInput();
        this.#selectDefaultAgentIfNeeded();
        void this.#handleAidaAvailabilityChange();
        void this
            .#handleFreestylerEnabledSettingChanged(); // If the setting was switched on/off while the FreestylerPanel was not shown.
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
        this.#freestylerEnabledSetting?.addChangeListener(this.#handleFreestylerEnabledSettingChanged, this);
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
        Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistancePanelOpened);
    }
    willHide() {
        this.#freestylerEnabledSetting?.removeChangeListener(this.#handleFreestylerEnabledSettingChanged, this);
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
    #handleFreestylerEnabledSettingChanged = () => {
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
            this.#viewOutput.freestylerChatUi?.focusTextInput();
            return;
        }
        let targetAgentType;
        switch (actionId) {
            case 'freestyler.elements-floating-button': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.FreestylerOpenedFromElementsPanelFloatingButton);
                targetAgentType = "freestyler" /* AgentType.FREESTYLER */;
                break;
            }
            case 'freestyler.element-panel-context': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.FreestylerOpenedFromElementsPanel);
                targetAgentType = "freestyler" /* AgentType.FREESTYLER */;
                break;
            }
            case 'drjones.network-floating-button': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.DrJonesOpenedFromNetworkPanelFloatingButton);
                targetAgentType = "drjones-network-request" /* AgentType.DRJONES_NETWORK_REQUEST */;
                break;
            }
            case 'drjones.network-panel-context': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.DrJonesOpenedFromNetworkPanel);
                targetAgentType = "drjones-network-request" /* AgentType.DRJONES_NETWORK_REQUEST */;
                break;
            }
            case 'drjones.performance-panel-context': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.DrJonesOpenedFromPerformancePanel);
                targetAgentType = "drjones-performance" /* AgentType.DRJONES_PERFORMANCE */;
                break;
            }
            case 'drjones.sources-floating-button': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.DrJonesOpenedFromSourcesPanelFloatingButton);
                targetAgentType = "drjones-file" /* AgentType.DRJONES_FILE */;
                break;
            }
            case 'drjones.sources-panel-context': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.DrJonesOpenedFromSourcesPanel);
                targetAgentType = "drjones-file" /* AgentType.DRJONES_FILE */;
                break;
            }
        }
        if (!targetAgentType) {
            return;
        }
        let agent = this.#currentAgent;
        if (!this.#currentAgent || this.#currentAgent.type !== targetAgentType || this.#currentAgent.isHistoryEntry ||
            targetAgentType === "drjones-performance" /* AgentType.DRJONES_PERFORMANCE */) {
            agent = this.#createAgent(targetAgentType);
        }
        this.#updateAgentState(agent);
        this.#viewOutput.freestylerChatUi?.focusTextInput();
    }
    #onHistoryClicked(event) {
        const boundingRect = this.#historyEntriesButton.element.getBoundingClientRect();
        const contextMenu = new UI.ContextMenu.ContextMenu(event, {
            x: boundingRect.left,
            y: boundingRect.bottom,
            useSoftMenu: true,
        });
        for (const agent of [...this.#agents].reverse()) {
            if (agent.isEmpty) {
                continue;
            }
            const title = agent.title;
            if (!title) {
                continue;
            }
            contextMenu.defaultSection().appendItem(title, () => {
                void this.#switchAgent(agent);
            });
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
        this.#agents = new Set();
        void AiHistoryStorage.instance().deleteAll();
        this.#updateAgentState();
    }
    #onDeleteClicked() {
        if (this.#currentAgent) {
            this.#agents.delete(this.#currentAgent);
            void AiHistoryStorage.instance().deleteHistoryEntry(this.#currentAgent.id);
        }
        this.#updateAgentState();
        this.#selectDefaultAgentIfNeeded();
        UI.ARIAUtils.alert(i18nString(UIStrings.chatDeleted));
    }
    async #switchAgent(agent) {
        if (this.#currentAgent === agent) {
            return;
        }
        this.#updateAgentState(agent);
        this.#viewProps.isReadOnly = true;
        await this.#doConversation(agent.runFromHistory());
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
            this.#viewProps.requiresNewConversation = false;
            return;
        }
        this.#viewProps.blockedByCrossOrigin = !currentContext.isOriginAllowed(this.#currentAgent.origin);
        if (!this.#viewProps.blockedByCrossOrigin) {
            this.#previousSameOriginContext = currentContext;
        }
        if (this.#viewProps.blockedByCrossOrigin && this.#previousSameOriginContext) {
            this.#viewProps.onCancelCrossOriginChat = this.#handleCrossOriginChatCancellation.bind(this);
        }
        this.#viewProps.requiresNewConversation = this.#currentAgent.type === "drjones-performance" /* AgentType.DRJONES_PERFORMANCE */ &&
            Boolean(this.#currentAgent.context) && this.#currentAgent.context !== currentContext;
        this.#viewProps.stripLinks = this.#viewProps.agentType === "drjones-performance" /* AgentType.DRJONES_PERFORMANCE */;
    }
    #getConversationContext() {
        if (!this.#currentAgent) {
            return null;
        }
        let context;
        switch (this.#currentAgent.type) {
            case "freestyler" /* AgentType.FREESTYLER */:
                context = this.#selectedElement;
                break;
            case "drjones-file" /* AgentType.DRJONES_FILE */:
                context = this.#selectedFile;
                break;
            case "drjones-network-request" /* AgentType.DRJONES_NETWORK_REQUEST */:
                context = this.#selectedRequest;
                break;
            case "drjones-performance" /* AgentType.DRJONES_PERFORMANCE */:
                context = this.#selectedCallTree;
                break;
        }
        return context;
    }
    async #startConversation(text) {
        if (!this.#currentAgent) {
            return;
        }
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
        await this.#doConversation(runner);
        UI.ARIAUtils.alert(lockedString(UIStringsNotTranslate.answerReady));
    }
    async #doConversation(generator) {
        let systemMessage = {
            entity: "model" /* ChatMessageEntity.MODEL */,
            steps: [],
        };
        let step = { isLoading: true };
        this.#viewProps.isLoading = true;
        for await (const data of generator) {
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
                    if (systemMessage.steps.at(-1) !== step) {
                        systemMessage.steps.push(step);
                    }
                    break;
                }
                case "title" /* ResponseType.TITLE */: {
                    step.title = data.title;
                    if (systemMessage.steps.at(-1) !== step) {
                        systemMessage.steps.push(step);
                    }
                    break;
                }
                case "thought" /* ResponseType.THOUGHT */: {
                    step.isLoading = false;
                    step.thought = data.thought;
                    if (systemMessage.steps.at(-1) !== step) {
                        systemMessage.steps.push(step);
                    }
                    break;
                }
                case "side-effect" /* ResponseType.SIDE_EFFECT */: {
                    step.isLoading = false;
                    step.code = data.code;
                    step.sideEffect = {
                        onAnswer: data.confirm,
                    };
                    if (systemMessage.steps.at(-1) !== step) {
                        systemMessage.steps.push(step);
                    }
                    break;
                }
                case "action" /* ResponseType.ACTION */: {
                    step.isLoading = false;
                    step.code = data.code;
                    step.output = data.output;
                    step.canceled = data.canceled;
                    if (systemMessage.steps.at(-1) !== step) {
                        systemMessage.steps.push(step);
                    }
                    break;
                }
                case "answer" /* ResponseType.ANSWER */: {
                    systemMessage.suggestions = data.suggestions;
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
            void this.doUpdate();
            // This handles scrolling to the bottom for live conversations when:
            // * User submits the query & the context step is shown.
            // * There is a side effect dialog  shown.
            if (!this.#viewProps.isReadOnly &&
                (data.type === "context" /* ResponseType.CONTEXT */ || data.type === "side-effect" /* ResponseType.SIDE_EFFECT */)) {
                this.#viewOutput.freestylerChatUi?.scrollToBottom();
            }
        }
        this.#viewProps.isLoading = false;
        this.#viewOutput.freestylerChatUi?.finishTextAnimations();
        void this.doUpdate();
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
                    const view = UI.ViewManager.ViewManager.instance().view(FreestylerPanel.panelName);
                    if (view) {
                        await UI.ViewManager.ViewManager.instance().showView(FreestylerPanel.panelName);
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
function setFreestylerServerSideLoggingEnabled(enabled) {
    if (enabled) {
        localStorage.setItem('freestyler_enableServerSideLogging', 'true');
    }
    else {
        localStorage.setItem('freestyler_enableServerSideLogging', 'false');
    }
}
function isFreestylerServerSideLoggingEnabled() {
    const config = Common.Settings.Settings.instance().getHostConfig();
    if (config.aidaAvailability?.disallowLogging) {
        return false;
    }
    return localStorage.getItem('freestyler_enableServerSideLogging') !== 'false';
}
// @ts-ignore
globalThis.setFreestylerServerSideLoggingEnabled = setFreestylerServerSideLoggingEnabled;
//# sourceMappingURL=FreestylerPanel.js.map