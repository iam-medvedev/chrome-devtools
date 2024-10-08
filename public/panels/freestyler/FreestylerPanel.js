// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as NetworkForward from '../../panels/network/forward/forward.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as LitHtml from '../../ui/lit-html/lit-html.js';
import { ResponseType } from './AiAgent.js';
import { ChangeManager } from './ChangeManager.js';
import { FreestylerChatUi, } from './components/FreestylerChatUi.js';
import { DrJonesNetworkAgent, } from './DrJonesNetworkAgent.js';
import { FreestylerAgent } from './FreestylerAgent.js';
import freestylerPanelStyles from './freestylerPanel.css.js';
// Bug for the send feed back link
// const AI_ASSISTANCE_SEND_FEEDBACK = 'https://crbug.com/364805393' as Platform.DevToolsPath.UrlString;
const AI_ASSISTANCE_HELP = 'https://goo.gle/devtools-ai-assistance';
/*
* Strings that don't need to be translated at this time.
*/
const UIStringsNotTranslate = {
    /**
     *@description AI assistance UI text for clearing messages.
     */
    clearMessages: 'Clear messages',
    /**
     *@description AI assistance UI tooltip text for the help button.
     */
    help: 'Help',
    /**
     *@description AI assistant UI tooltip text for the settings button (gear icon).
     */
    settings: 'Settings',
};
const lockedString = i18n.i18n.lockedString;
// TODO(ergunsh): Use the WidgetElement instead of separately creating the toolbar.
function createToolbar(target, { onClearClick }) {
    const toolbarContainer = target.createChild('div', 'freestyler-toolbar-container');
    const leftToolbar = new UI.Toolbar.Toolbar('', toolbarContainer);
    const rightToolbar = new UI.Toolbar.Toolbar('freestyler-right-toolbar', toolbarContainer);
    const clearButton = new UI.Toolbar.ToolbarButton(lockedString(UIStringsNotTranslate.clearMessages), 'clear', undefined, 'freestyler.clear');
    clearButton.addEventListener("Click" /* UI.Toolbar.ToolbarButton.Events.CLICK */, onClearClick);
    leftToolbar.appendToolbarItem(clearButton);
    rightToolbar.appendSeparator();
    const helpButton = new UI.Toolbar.ToolbarButton(lockedString(UIStringsNotTranslate.help), 'help', undefined, 'freestyler.help');
    helpButton.addEventListener("Click" /* UI.Toolbar.ToolbarButton.Events.CLICK */, () => {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(AI_ASSISTANCE_HELP);
    });
    rightToolbar.appendToolbarItem(helpButton);
    const settingsButton = new UI.Toolbar.ToolbarButton(lockedString(UIStringsNotTranslate.settings), 'gear', undefined, 'freestyler.settings');
    settingsButton.addEventListener("Click" /* UI.Toolbar.ToolbarButton.Events.CLICK */, () => {
        void UI.ViewManager.ViewManager.instance().showView('chrome-ai');
    });
    rightToolbar.appendToolbarItem(settingsButton);
}
function defaultView(input, output, target) {
    // clang-format off
    LitHtml.render(LitHtml.html `
    <${FreestylerChatUi.litTagName} .props=${input} ${LitHtml.Directives.ref((el) => {
        if (!el || !(el instanceof FreestylerChatUi)) {
            return;
        }
        output.freestylerChatUi = el;
    })}></${FreestylerChatUi.litTagName}>
  `, target, { host: input }); // eslint-disable-line rulesdir/lit_html_host_this
    // clang-format on
}
let freestylerPanelInstance;
export class FreestylerPanel extends UI.Panel.Panel {
    view;
    static panelName = 'freestyler';
    #toggleSearchElementAction;
    #selectedElement;
    #selectedNetworkRequest;
    #contentContainer;
    #aidaClient;
    #freestylerAgent;
    #drJonesNetworkAgent;
    #viewProps;
    #viewOutput = {};
    #serverSideLoggingEnabled = isFreestylerServerSideLoggingEnabled();
    #freestylerEnabledSetting;
    #changeManager = new ChangeManager();
    constructor(view = defaultView, { aidaClient, aidaAvailability, syncInfo }) {
        super(FreestylerPanel.panelName);
        this.view = view;
        this.#freestylerEnabledSetting = this.#getFreestylerEnabledSetting();
        createToolbar(this.contentElement, { onClearClick: this.#clearMessages.bind(this) });
        this.#toggleSearchElementAction =
            UI.ActionRegistry.ActionRegistry.instance().getAction('elements.toggle-element-search');
        this.#aidaClient = aidaClient;
        this.#contentContainer = this.contentElement.createChild('div', 'freestyler-chat-ui-container');
        const selectedElementFilter = (maybeNode) => {
            if (maybeNode) {
                return maybeNode.nodeType() === Node.ELEMENT_NODE ? maybeNode : null;
            }
            return null;
        };
        this.#selectedElement = selectedElementFilter(UI.Context.Context.instance().flavor(SDK.DOMModel.DOMNode));
        this.#selectedNetworkRequest = UI.Context.Context.instance().flavor(SDK.NetworkRequest.NetworkRequest);
        this.#viewProps = {
            state: this.#freestylerEnabledSetting?.getIfNotDisabled() ? "chat-view" /* FreestylerChatUiState.CHAT_VIEW */ :
                "consent-view" /* FreestylerChatUiState.CONSENT_VIEW */,
            aidaAvailability,
            messages: [],
            inspectElementToggled: this.#toggleSearchElementAction.toggled(),
            selectedElement: this.#selectedElement,
            selectedNetworkRequest: this.#selectedNetworkRequest,
            isLoading: false,
            onTextSubmit: this.#startConversation.bind(this),
            onInspectElementClick: this.#handleSelectElementClick.bind(this),
            onFeedbackSubmit: this.#handleFeedbackSubmit.bind(this),
            onCancelClick: this.#cancel.bind(this),
            onSelectedNetworkRequestClick: this.#handleSelectedNetworkRequestClick.bind(this),
            canShowFeedbackForm: this.#serverSideLoggingEnabled,
            userInfo: {
                accountImage: syncInfo.accountImage,
                accountFullName: syncInfo.accountFullName,
            },
            agentType: "freestyler" /* AgentType.FREESTYLER */,
        };
        this.#toggleSearchElementAction.addEventListener("Toggled" /* UI.ActionRegistration.Events.TOGGLED */, ev => {
            this.#viewProps.inspectElementToggled = ev.data;
            this.doUpdate();
        });
        this.#freestylerAgent = this.#createFreestylerAgent();
        this.#drJonesNetworkAgent = this.#createDrJonesNetworkAgent();
        UI.Context.Context.instance().addFlavorChangeListener(SDK.DOMModel.DOMNode, ev => {
            if (this.#viewProps.selectedElement === ev.data) {
                return;
            }
            this.#viewProps.selectedElement = selectedElementFilter(ev.data);
            this.doUpdate();
        });
        UI.Context.Context.instance().addFlavorChangeListener(SDK.NetworkRequest.NetworkRequest, ev => {
            if (this.#viewProps.selectedNetworkRequest === ev.data) {
                return;
            }
            this.#viewProps.selectedNetworkRequest = Boolean(ev.data) ? ev.data : null;
            this.doUpdate();
        });
        this.doUpdate();
    }
    #getFreestylerEnabledSetting() {
        try {
            return Common.Settings.moduleSetting('freestyler-enabled');
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
    #createDrJonesNetworkAgent() {
        return new DrJonesNetworkAgent({
            aidaClient: this.#aidaClient,
            serverSideLoggingEnabled: this.#serverSideLoggingEnabled,
        });
    }
    static async instance(opts = { forceNew: null }) {
        const { forceNew } = opts;
        if (!freestylerPanelInstance || forceNew) {
            const aidaAvailability = await Host.AidaClient.AidaClient.checkAccessPreconditions();
            const aidaClient = new Host.AidaClient.AidaClient();
            const syncInfo = await new Promise(resolve => Host.InspectorFrontendHost.InspectorFrontendHostInstance.getSyncInformation(syncInfo => resolve(syncInfo)));
            freestylerPanelInstance = new FreestylerPanel(defaultView, { aidaClient, aidaAvailability, syncInfo });
        }
        return freestylerPanelInstance;
    }
    wasShown() {
        this.registerCSSFiles([freestylerPanelStyles]);
        this.#viewOutput.freestylerChatUi?.restoreScrollPosition();
        this.#viewOutput.freestylerChatUi?.focusTextInput();
        this.#freestylerEnabledSetting?.addChangeListener(this.#handleFreestylerEnabledSettingChanged, this);
    }
    willHide() {
        this.#freestylerEnabledSetting?.removeChangeListener(this.#handleFreestylerEnabledSettingChanged, this);
    }
    #handleFreestylerEnabledSettingChanged() {
        this.#viewProps.state =
            this.#freestylerEnabledSetting?.get() ? "chat-view" /* FreestylerChatUiState.CHAT_VIEW */ : "consent-view" /* FreestylerChatUiState.CONSENT_VIEW */;
        this.doUpdate();
    }
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
            case 'drjones.network-panel-context': {
                // TODO(samiyac): Add UMA
                this.#viewOutput.freestylerChatUi?.focusTextInput();
                this.#viewProps.agentType = "drjones-network-request" /* AgentType.DRJONES_NETWORK_REQUEST */;
                this.doUpdate();
                break;
            }
            case 'drjones.performance-panel-context': {
                // TODO(samiyac): Add actions and UMA
                break;
            }
            case 'drjones.sources-panel-context': {
                // TODO(samiyac): Add actions and UMA
                break;
            }
        }
    }
    #clearMessages() {
        this.#viewProps.messages = [];
        this.#viewProps.isLoading = false;
        this.#freestylerAgent = this.#createFreestylerAgent();
        this.#drJonesNetworkAgent = this.#createDrJonesNetworkAgent();
        this.#cancel();
        this.doUpdate();
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
            runner = this.#freestylerAgent.run(text, { signal, selectedElement: this.#viewProps.selectedElement });
        }
        else if (this.#viewProps.agentType === "drjones-network-request" /* AgentType.DRJONES_NETWORK_REQUEST */) {
            runner =
                this.#drJonesNetworkAgent.run(text, { signal, selectedNetworkRequest: this.#viewProps.selectedNetworkRequest });
        }
        if (!runner) {
            return;
        }
        let step = { isLoading: true };
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
                    step.contextDetails = data.contextDetails;
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
                    systemMessage.suggestions = [];
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
    }
}
export class ActionDelegate {
    handleAction(_context, actionId) {
        switch (actionId) {
            case 'freestyler.elements-floating-button':
            case 'freestyler.element-panel-context':
            case 'drjones.network-panel-context':
            case 'drjones.performance-panel-context':
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