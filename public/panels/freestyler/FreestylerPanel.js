// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Trace from '../../models/trace/trace.js';
import * as Workspace from '../../models/workspace/workspace.js';
import * as NetworkForward from '../../panels/network/forward/forward.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as LitHtml from '../../ui/lit-html/lit-html.js';
import { ResponseType } from './AiAgent.js';
import { ChangeManager } from './ChangeManager.js';
import { FreestylerChatUi, } from './components/FreestylerChatUi.js';
import { DrJonesFileAgent, } from './DrJonesFileAgent.js';
import { DrJonesNetworkAgent, } from './DrJonesNetworkAgent.js';
import { DrJonesPerformanceAgent } from './DrJonesPerformanceAgent.js';
import { FreestylerAgent } from './FreestylerAgent.js';
import freestylerPanelStyles from './freestylerPanel.css.js';
const { html } = LitHtml;
const AI_ASSISTANCE_SEND_FEEDBACK = 'https://crbug.com/364805393';
const AI_ASSISTANCE_HELP = 'https://goo.gle/devtools-ai-assistance';
const UIStrings = {
    /**
     *@description AI assistance UI text for clearing the chat.
     */
    clearChat: 'Clear chat',
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
     *@description Announcement text for screen readers when the chat is cleared.
     */
    chatCleared: 'Chat cleared',
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
// TODO(ergunsh): Use the WidgetElement instead of separately creating the toolbar.
function createToolbar(target, { onClearClick }) {
    const toolbarContainer = target.createChild('div', 'freestyler-toolbar-container');
    const leftToolbar = new UI.Toolbar.Toolbar('', toolbarContainer);
    const rightToolbar = new UI.Toolbar.Toolbar('freestyler-right-toolbar', toolbarContainer);
    const clearButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.clearChat), 'clear', undefined, 'freestyler.clear');
    clearButton.addEventListener("Click" /* UI.Toolbar.ToolbarButton.Events.CLICK */, onClearClick);
    leftToolbar.appendToolbarItem(clearButton);
    const link = UI.XLink.XLink.create(AI_ASSISTANCE_SEND_FEEDBACK, i18nString(UIStrings.sendFeedback), undefined, undefined, 'freestyler.send-feedback');
    link.style.setProperty('display', null);
    link.style.setProperty('text-decoration', 'none');
    link.style.setProperty('padding', '0 var(--sys-size-3)');
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
let freestylerPanelInstance;
export class FreestylerPanel extends UI.Panel.Panel {
    view;
    static panelName = 'freestyler';
    #toggleSearchElementAction;
    #contentContainer;
    #aidaClient;
    #freestylerAgent;
    #drJonesFileAgent;
    #drJonesNetworkAgent;
    #drJonesPerformanceAgent;
    #viewProps;
    #viewOutput = {};
    #serverSideLoggingEnabled = isFreestylerServerSideLoggingEnabled();
    #freestylerEnabledSetting;
    #changeManager = new ChangeManager();
    constructor(view = defaultView, { aidaClient, aidaAvailability, syncInfo }) {
        super(FreestylerPanel.panelName);
        this.view = view;
        this.#freestylerEnabledSetting = this.#getAiAssistanceEnabledSetting();
        createToolbar(this.contentElement, { onClearClick: this.#clearMessages.bind(this) });
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
            onTextSubmit: this.#startConversation.bind(this),
            onInspectElementClick: this.#handleSelectElementClick.bind(this),
            onFeedbackSubmit: this.#handleFeedbackSubmit.bind(this),
            onCancelClick: this.#cancel.bind(this),
            onSelectedNetworkRequestClick: this.#handleSelectedNetworkRequestClick.bind(this),
            onSelectedFileRequestClick: this.#handleSelectedFileClick.bind(this),
            canShowFeedbackForm: this.#serverSideLoggingEnabled,
            userInfo: {
                accountImage: syncInfo.accountImage,
                accountFullName: syncInfo.accountFullName,
            },
            selectedElement: null,
            selectedFile: null,
            selectedNetworkRequest: null,
            selectedStackTrace: null,
        };
        this.#freestylerAgent = this.#createFreestylerAgent();
        this.#drJonesFileAgent = this.#createDrJonesFileAgent();
        this.#drJonesNetworkAgent = this.#createDrJonesNetworkAgent();
        this.#drJonesPerformanceAgent = this.#createDrJonesPerformanceAgent();
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
    #createFreestylerAgent() {
        return new FreestylerAgent({
            aidaClient: this.#aidaClient,
            changeManager: this.#changeManager,
            serverSideLoggingEnabled: this.#serverSideLoggingEnabled,
        });
    }
    #createDrJonesFileAgent() {
        return new DrJonesFileAgent({
            aidaClient: this.#aidaClient,
            serverSideLoggingEnabled: this.#serverSideLoggingEnabled,
        });
    }
    #createDrJonesNetworkAgent() {
        return new DrJonesNetworkAgent({
            aidaClient: this.#aidaClient,
            serverSideLoggingEnabled: this.#serverSideLoggingEnabled,
        });
    }
    #createDrJonesPerformanceAgent() {
        return new DrJonesPerformanceAgent({
            aidaClient: this.#aidaClient,
            serverSideLoggingEnabled: this.#serverSideLoggingEnabled,
        });
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
    wasShown() {
        this.registerCSSFiles([freestylerPanelStyles]);
        this.#viewOutput.freestylerChatUi?.restoreScrollPosition();
        this.#viewOutput.freestylerChatUi?.focusTextInput();
        void this.#handleAidaAvailabilityChange();
        void this
            .#handleFreestylerEnabledSettingChanged(); // If the setting was switched on/off while the FreestylerPanel was not shown.
        this.#viewProps = {
            ...this.#viewProps,
            inspectElementToggled: this.#toggleSearchElementAction.toggled(),
            selectedElement: selectedElementFilter(UI.Context.Context.instance().flavor(SDK.DOMModel.DOMNode)),
            selectedNetworkRequest: UI.Context.Context.instance().flavor(SDK.NetworkRequest.NetworkRequest),
            selectedStackTrace: UI.Context.Context.instance().flavor(Trace.Helpers.TreeHelpers.TraceEntryNodeForAI),
            selectedFile: UI.Context.Context.instance().flavor(Workspace.UISourceCode.UISourceCode),
        };
        this.doUpdate();
        this.#freestylerEnabledSetting?.addChangeListener(this.#handleFreestylerEnabledSettingChanged, this);
        Host.AidaClient.HostConfigTracker.instance().addEventListener("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */, this.#handleAidaAvailabilityChange);
        this.#toggleSearchElementAction.addEventListener("Toggled" /* UI.ActionRegistration.Events.TOGGLED */, this.#handleSearchElementActionToggled);
        UI.Context.Context.instance().addFlavorChangeListener(SDK.DOMModel.DOMNode, this.#handleDOMNodeFlavorChange);
        UI.Context.Context.instance().addFlavorChangeListener(SDK.NetworkRequest.NetworkRequest, this.#handleNetworkRequestFlavorChange);
        UI.Context.Context.instance().addFlavorChangeListener(Trace.Helpers.TreeHelpers.TraceEntryNodeForAI, this.#handleTraceEntryNodeFlavorChange);
        UI.Context.Context.instance().addFlavorChangeListener(Workspace.UISourceCode.UISourceCode, this.#handleUISourceCodeFlavorChange);
    }
    willHide() {
        this.#freestylerEnabledSetting?.removeChangeListener(this.#handleFreestylerEnabledSettingChanged, this);
        Host.AidaClient.HostConfigTracker.instance().removeEventListener("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */, this.#handleAidaAvailabilityChange);
        this.#toggleSearchElementAction.removeEventListener("Toggled" /* UI.ActionRegistration.Events.TOGGLED */, this.#handleSearchElementActionToggled);
        UI.Context.Context.instance().removeFlavorChangeListener(SDK.DOMModel.DOMNode, this.#handleDOMNodeFlavorChange);
        UI.Context.Context.instance().removeFlavorChangeListener(SDK.NetworkRequest.NetworkRequest, this.#handleNetworkRequestFlavorChange);
        UI.Context.Context.instance().removeFlavorChangeListener(Trace.Helpers.TreeHelpers.TraceEntryNodeForAI, this.#handleTraceEntryNodeFlavorChange);
        UI.Context.Context.instance().removeFlavorChangeListener(Workspace.UISourceCode.UISourceCode, this.#handleUISourceCodeFlavorChange);
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
            this.doUpdate();
        }
    };
    #handleSearchElementActionToggled = (ev) => {
        if (this.#viewProps.inspectElementToggled === ev.data) {
            return;
        }
        this.#viewProps.inspectElementToggled = ev.data;
        this.doUpdate();
    };
    #handleDOMNodeFlavorChange = (ev) => {
        if (this.#viewProps.selectedElement === ev.data) {
            return;
        }
        this.#viewProps.selectedElement = selectedElementFilter(ev.data);
        this.doUpdate();
    };
    #handleNetworkRequestFlavorChange = (ev) => {
        if (this.#viewProps.selectedNetworkRequest === ev.data) {
            return;
        }
        this.#viewProps.selectedNetworkRequest = Boolean(ev.data) ? ev.data : null;
        this.doUpdate();
    };
    #handleTraceEntryNodeFlavorChange = (ev) => {
        if (this.#viewProps.selectedStackTrace === ev.data) {
            return;
        }
        this.#viewProps.selectedStackTrace = Boolean(ev.data) ? ev.data : null;
        this.doUpdate();
    };
    #handleUISourceCodeFlavorChange = (ev) => {
        if (this.#viewProps.selectedFile === ev.data) {
            return;
        }
        this.#viewProps.selectedFile = Boolean(ev.data) ? ev.data : null;
        this.doUpdate();
    };
    #handleFreestylerEnabledSettingChanged = () => {
        const nextChatUiState = this.#getChatUiState();
        if (this.#viewProps.state === nextChatUiState) {
            return;
        }
        this.#viewProps.state = nextChatUiState;
        this.doUpdate();
    };
    doUpdate() {
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
    #handleSelectedNetworkRequestClick() {
        if (this.#viewProps.selectedNetworkRequest) {
            const requestLocation = NetworkForward.UIRequestLocation.UIRequestLocation.tab(this.#viewProps.selectedNetworkRequest, "headers-component" /* NetworkForward.UIRequestLocation.UIRequestTabs.HEADERS_COMPONENT */);
            return Common.Revealer.reveal(requestLocation);
        }
    }
    #handleSelectedFileClick() {
        if (this.#viewProps.selectedFile) {
            return Common.Revealer.reveal(this.#viewProps.selectedFile.uiLocation(0, 0));
        }
    }
    handleAction(actionId) {
        switch (actionId) {
            case 'freestyler.elements-floating-button': {
                this.#viewOutput.freestylerChatUi?.focusTextInput();
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.FreestylerOpenedFromElementsPanelFloatingButton);
                this.#viewProps.agentType = "freestyler" /* AgentType.FREESTYLER */;
                this.doUpdate();
                break;
            }
            case 'freestyler.element-panel-context': {
                this.#viewOutput.freestylerChatUi?.focusTextInput();
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.FreestylerOpenedFromElementsPanel);
                this.#viewProps.agentType = "freestyler" /* AgentType.FREESTYLER */;
                this.doUpdate();
                break;
            }
            case 'drjones.network-floating-button': {
                this.#viewOutput.freestylerChatUi?.focusTextInput();
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.DrJonesOpenedFromNetworkPanelFloatingButton);
                this.#viewProps.agentType = "drjones-network-request" /* AgentType.DRJONES_NETWORK_REQUEST */;
                this.doUpdate();
                break;
            }
            case 'drjones.network-panel-context': {
                this.#viewOutput.freestylerChatUi?.focusTextInput();
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.DrJonesOpenedFromNetworkPanel);
                this.#viewProps.agentType = "drjones-network-request" /* AgentType.DRJONES_NETWORK_REQUEST */;
                this.doUpdate();
                break;
            }
            case 'drjones.performance-panel-context': {
                this.#viewOutput.freestylerChatUi?.focusTextInput();
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.DrJonesOpenedFromPerformancePanel);
                this.#viewProps.agentType = "drjones-performance" /* AgentType.DRJONES_PERFORMANCE */;
                this.doUpdate();
                break;
            }
            case 'drjones.sources-floating-button': {
                this.#viewOutput.freestylerChatUi?.focusTextInput();
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.DrJonesOpenedFromSourcesPanelFloatingButton);
                this.#viewProps.agentType = "drjones-file" /* AgentType.DRJONES_FILE */;
                this.doUpdate();
                break;
            }
            case 'drjones.sources-panel-context': {
                this.#viewOutput.freestylerChatUi?.focusTextInput();
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.DrJonesOpenedFromSourcesPanel);
                this.#viewProps.agentType = "drjones-file" /* AgentType.DRJONES_FILE */;
                this.doUpdate();
                break;
            }
        }
    }
    #clearMessages() {
        this.#viewProps.messages = [];
        this.#viewProps.isLoading = false;
        this.#freestylerAgent = this.#createFreestylerAgent();
        this.#drJonesFileAgent = this.#createDrJonesFileAgent();
        this.#drJonesNetworkAgent = this.#createDrJonesNetworkAgent();
        this.#cancel();
        this.doUpdate();
        UI.ARIAUtils.alert(i18nString(UIStrings.chatCleared));
    }
    #runAbortController = new AbortController();
    #cancel() {
        this.#runAbortController.abort();
        this.#runAbortController = new AbortController();
        this.#viewProps.isLoading = false;
        this.doUpdate();
    }
    async #startConversation(text) {
        this.#viewProps.messages.push({
            entity: "user" /* ChatMessageEntity.USER */,
            text,
        });
        this.#viewProps.isLoading = true;
        const systemMessage = {
            entity: "model" /* ChatMessageEntity.MODEL */,
            steps: [],
        };
        this.#viewProps.messages.push(systemMessage);
        this.doUpdate();
        this.#runAbortController = new AbortController();
        const signal = this.#runAbortController.signal;
        let runner;
        if (this.#viewProps.agentType === "freestyler" /* AgentType.FREESTYLER */) {
            runner = this.#freestylerAgent.run(text, { signal, selected: this.#viewProps.selectedElement });
        }
        else if (this.#viewProps.agentType === "drjones-file" /* AgentType.DRJONES_FILE */) {
            runner = this.#drJonesFileAgent.run(text, { signal, selected: this.#viewProps.selectedFile });
        }
        else if (this.#viewProps.agentType === "drjones-network-request" /* AgentType.DRJONES_NETWORK_REQUEST */) {
            runner = this.#drJonesNetworkAgent.run(text, { signal, selected: this.#viewProps.selectedNetworkRequest });
        }
        else if (this.#viewProps.agentType === "drjones-performance" /* AgentType.DRJONES_PERFORMANCE */) {
            runner = this.#drJonesPerformanceAgent.run(text, { signal, selected: this.#viewProps.selectedStackTrace });
        }
        if (!runner) {
            return;
        }
        let step = { isLoading: true };
        UI.ARIAUtils.alert(lockedString(UIStringsNotTranslate.answerLoading));
        for await (const data of runner) {
            step.sideEffect = undefined;
            switch (data.type) {
                case ResponseType.QUERYING: {
                    step = { isLoading: true };
                    if (!systemMessage.steps.length) {
                        systemMessage.steps.push(step);
                    }
                    break;
                }
                case ResponseType.CONTEXT: {
                    step.title = data.title;
                    step.contextDetails = data.details;
                    step.isLoading = false;
                    if (systemMessage.steps.at(-1) !== step) {
                        systemMessage.steps.push(step);
                    }
                    break;
                }
                case ResponseType.TITLE: {
                    step.title = data.title;
                    if (systemMessage.steps.at(-1) !== step) {
                        systemMessage.steps.push(step);
                    }
                    break;
                }
                case ResponseType.THOUGHT: {
                    step.isLoading = false;
                    step.thought = data.thought;
                    if (systemMessage.steps.at(-1) !== step) {
                        systemMessage.steps.push(step);
                    }
                    break;
                }
                case ResponseType.SIDE_EFFECT: {
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
                case ResponseType.ACTION: {
                    step.isLoading = false;
                    step.code = data.code;
                    step.output = data.output;
                    step.canceled = data.canceled;
                    if (systemMessage.steps.at(-1) !== step) {
                        systemMessage.steps.push(step);
                    }
                    break;
                }
                case ResponseType.ANSWER: {
                    systemMessage.suggestions = data.suggestions;
                    systemMessage.answer = data.text;
                    systemMessage.rpcId = data.rpcId;
                    // When there is an answer without any thinking steps, we don't want to show the thinking step.
                    if (systemMessage.steps.length === 1 && systemMessage.steps[0].isLoading) {
                        systemMessage.steps.pop();
                    }
                    step.isLoading = false;
                    this.#viewProps.isLoading = false;
                    break;
                }
                case ResponseType.ERROR: {
                    systemMessage.error = data.error;
                    systemMessage.rpcId = undefined;
                    this.#viewProps.isLoading = false;
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
                }
            }
            this.doUpdate();
            this.#viewOutput.freestylerChatUi?.scrollToLastMessage();
        }
        UI.ARIAUtils.alert(lockedString(UIStringsNotTranslate.answerReady));
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