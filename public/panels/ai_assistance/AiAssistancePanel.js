// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../ui/legacy/legacy.js';
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Root from '../../core/root/root.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as AiAssistanceModel from '../../models/ai_assistance/ai_assistance.js';
import * as Workspace from '../../models/workspace/workspace.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import * as ElementsPanel from '../elements/elements.js';
import * as NetworkForward from '../network/forward/forward.js';
import * as NetworkPanel from '../network/network.js';
import * as SourcesPanel from '../sources/sources.js';
import * as TimelinePanel from '../timeline/timeline.js';
import * as TimelineUtils from '../timeline/utils/utils.js';
import aiAssistancePanelStyles from './aiAssistancePanel.css.js';
import { ChatView } from './components/ChatView.js';
import { isAiAssistancePatchingEnabled } from './PatchWidget.js';
const { html } = Lit;
const AI_ASSISTANCE_SEND_FEEDBACK = 'https://crbug.com/364805393';
const AI_ASSISTANCE_HELP = 'https://developer.chrome.com/docs/devtools/ai-assistance';
const SCREENSHOT_QUALITY = 100;
const SHOW_LOADING_STATE_TIMEOUT = 100;
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
    /**
     * @description Placeholder text for an inactive text field. When active, it's used for the user's input to the GenAI assistance.
     */
    followTheSteps: 'Follow the steps above to ask a question',
    /**
     *@description Disclaimer text right after the chat input.
     */
    inputDisclaimerForEmptyState: 'This is an experimental AI feature and won\'t always get it right.',
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
    /**
     * @description Placeholder text for the input shown when the conversation is blocked because a cross-origin context was selected.
     */
    crossOriginError: 'To talk about data from another origin, start a new chat',
    /**
     *@description Placeholder text for the chat UI input.
     */
    inputPlaceholderForStyling: 'Ask a question about the selected element',
    /**
     *@description Placeholder text for the chat UI input.
     */
    inputPlaceholderForNetwork: 'Ask a question about the selected network request',
    /**
     *@description Placeholder text for the chat UI input.
     */
    inputPlaceholderForFile: 'Ask a question about the selected file',
    /**
     *@description Placeholder text for the chat UI input.
     */
    inputPlaceholderForPerformance: 'Ask a question about the selected item and its call tree',
    /**
     *@description Placeholder text for the chat UI input when there is no context selected.
     */
    inputPlaceholderForStylingNoContext: 'Select an element to ask a question',
    /**
     *@description Placeholder text for the chat UI input when there is no context selected.
     */
    inputPlaceholderForNetworkNoContext: 'Select a network request to ask a question',
    /**
     *@description Placeholder text for the chat UI input when there is no context selected.
     */
    inputPlaceholderForFileNoContext: 'Select a file to ask a question',
    /**
     *@description Placeholder text for the chat UI input when there is no context selected.
     */
    inputPlaceholderForPerformanceNoContext: 'Select an item to ask a question',
    /**
     *@description Placeholder text for the chat UI input.
     */
    inputPlaceholderForPerformanceInsights: 'Ask a question about the selected performance insight',
    /**
     *@description Placeholder text for the chat UI input.
     */
    inputPlaceholderForPerformanceInsightsNoContext: 'Select a performance insight to ask a question',
    /**
     *@description Disclaimer text right after the chat input.
     */
    inputDisclaimerForStyling: 'Chat messages and any data the inspected page can access via Web APIs are sent to Google and may be seen by human reviewers to improve this feature. This is an experimental AI feature and won’t always get it right.',
    /**
     *@description Disclaimer text right after the chat input.
     */
    inputDisclaimerForStylingEnterpriseNoLogging: 'Chat messages and any data the inspected page can access via Web APIs are sent to Google. The content you submit and that is generated by this feature will not be used to improve Google’s AI models. This is an experimental AI feature and won’t always get it right.',
    /**
     *@description Disclaimer text right after the chat input.
     */
    inputDisclaimerForNetwork: 'Chat messages and the selected network request are sent to Google and may be seen by human reviewers to improve this feature. This is an experimental AI feature and won’t always get it right.',
    /**
     *@description Disclaimer text right after the chat input.
     */
    inputDisclaimerForNetworkEnterpriseNoLogging: 'Chat messages and the selected network request are sent to Google. The content you submit and that is generated by this feature will not be used to improve Google’s AI models. This is an experimental AI feature and won’t always get it right.',
    /**
     *@description Disclaimer text right after the chat input.
     */
    inputDisclaimerForFile: 'Chat messages and the selected file are sent to Google and may be seen by human reviewers to improve this feature. This is an experimental AI feature and won\'t always get it right.',
    /**
     *@description Disclaimer text right after the chat input.
     */
    inputDisclaimerForFileEnterpriseNoLogging: 'Chat messages and the selected file are sent to Google. The content you submit and that is generated by this feature will not be used to improve Google’s AI models. This is an experimental AI feature and won’t always get it right.',
    /**
     *@description Disclaimer text right after the chat input.
     */
    inputDisclaimerForPerformance: 'Chat messages and trace data from your performance trace are sent to Google and may be seen by human reviewers to improve this feature. This is an experimental AI feature and won\'t always get it right.',
    /**
     *@description Disclaimer text right after the chat input.
     */
    inputDisclaimerForPerformanceEnterpriseNoLogging: 'Chat messages and data from your performance trace are sent to Google. The content you submit and that is generated by this feature will not be used to improve Google’s AI models. This is an experimental AI feature and won’t always get it right.',
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
async function getEmptyStateSuggestions(context, conversationType) {
    if (context) {
        const specialSuggestions = await context.getSuggestions();
        if (specialSuggestions) {
            return specialSuggestions;
        }
    }
    if (!conversationType) {
        return [];
    }
    switch (conversationType) {
        case "freestyler" /* AiAssistanceModel.ConversationType.STYLING */:
            return [
                'What can you help me with?',
                'Why isn’t this element visible?',
                'How do I center this element?',
            ];
        case "drjones-file" /* AiAssistanceModel.ConversationType.FILE */:
            return [
                'What does this script do?',
                'Is the script optimized for performance?',
                'Does the script handle user input safely?',
            ];
        case "drjones-network-request" /* AiAssistanceModel.ConversationType.NETWORK */:
            return [
                'Why is this network request taking so long?',
                'Are there any security headers present?',
                'Why is the request failing?',
            ];
        case "drjones-performance" /* AiAssistanceModel.ConversationType.PERFORMANCE */:
            return [
                'Identify performance issues in this call tree',
                'Where is most of the time being spent in this call tree?',
                'How can I reduce the time of this call tree?',
            ];
        case "performance-insight" /* AiAssistanceModel.ConversationType.PERFORMANCE_INSIGHT */:
            // TODO(b/405925760): Define these.
            return ['Help me optimize my LCP', 'Help me optimize my INP', 'For now'];
    }
}
function toolbarView(input) {
    // clang-format off
    return html `
    <div class="toolbar-container" role="toolbar" .jslogContext=${VisualLogging.toolbar()}>
      <devtools-toolbar class="freestyler-left-toolbar" role="presentation">
        <devtools-button
          title=${i18nString(UIStrings.newChat)}
          aria-label=${i18nString(UIStrings.newChat)}
          .iconName=${'plus'}
          .jslogContext=${'freestyler.new-chat'}
          .variant=${"toolbar" /* Buttons.Button.Variant.TOOLBAR */}
          @click=${input.onNewChatClick}></devtools-button>
        <div class="toolbar-divider"></div>
        <devtools-button
          title=${i18nString(UIStrings.history)}
          aria-label=${i18nString(UIStrings.history)}
          .iconName=${'history'}
          .jslogContext=${'freestyler.history'}
          .variant=${"toolbar" /* Buttons.Button.Variant.TOOLBAR */}
          @click=${input.onHistoryClick}></devtools-button>
        ${input.isDeleteHistoryButtonVisible
        ? html `<devtools-button
              title=${i18nString(UIStrings.deleteChat)}
              aria-label=${i18nString(UIStrings.deleteChat)}
              .iconName=${'bin'}
              .jslogContext=${'freestyler.delete'}
              .variant=${"toolbar" /* Buttons.Button.Variant.TOOLBAR */}
              @click=${input.onDeleteClick}></devtools-button>`
        : Lit.nothing}
      </devtools-toolbar>
      <devtools-toolbar class="freestyler-right-toolbar" role="presentation">
        <x-link
          class="toolbar-feedback-link devtools-link"
          title=${UIStrings.sendFeedback}
          href=${AI_ASSISTANCE_SEND_FEEDBACK}
          jslog=${VisualLogging.link().track({ click: true, keydown: 'Enter|Space' }).context('freestyler.send-feedback')}
        >${UIStrings.sendFeedback}</x-link>
        <div class="toolbar-divider"></div>
        <devtools-button
          title=${i18nString(UIStrings.help)}
          aria-label=${i18nString(UIStrings.help)}
          .iconName=${'help'}
          .jslogContext=${'freestyler.help'}
          .variant=${"toolbar" /* Buttons.Button.Variant.TOOLBAR */}
          @click=${input.onHelpClick}></devtools-button>
        <devtools-button
          title=${i18nString(UIStrings.settings)}
          aria-label=${i18nString(UIStrings.settings)}
          .iconName=${'gear'}
          .jslogContext=${'freestyler.settings'}
          .variant=${"toolbar" /* Buttons.Button.Variant.TOOLBAR */}
          @click=${input.onSettingsClick}></devtools-button>
      </devtools-toolbar>
    </div>
  `;
    // clang-format on
}
function defaultView(input, output, target) {
    // clang-format off
    Lit.render(html `
    ${toolbarView(input)}
    <div class="chat-container">
      <devtools-ai-chat-view .props=${input} ${Lit.Directives.ref((el) => {
        if (!el || !(el instanceof ChatView)) {
            return;
        }
        output.chatView = el;
    })}></devtools-ai-chat-view>
    </div>
  `, target, { host: input });
    // clang-format on
}
function createNodeContext(node) {
    if (!node) {
        return null;
    }
    return new AiAssistanceModel.NodeContext(node);
}
function createFileContext(file) {
    if (!file) {
        return null;
    }
    return new AiAssistanceModel.FileContext(file);
}
function createRequestContext(request) {
    if (!request) {
        return null;
    }
    return new AiAssistanceModel.RequestContext(request);
}
function createCallTreeContext(callTree) {
    if (!callTree) {
        return null;
    }
    return new AiAssistanceModel.CallTreeContext(callTree);
}
function createPerfInsightContext(insight) {
    if (!insight) {
        return null;
    }
    return new AiAssistanceModel.InsightContext(insight);
}
function agentToConversationType(agent) {
    if (agent instanceof AiAssistanceModel.StylingAgent) {
        return "freestyler" /* AiAssistanceModel.ConversationType.STYLING */;
    }
    if (agent instanceof AiAssistanceModel.NetworkAgent) {
        return "drjones-network-request" /* AiAssistanceModel.ConversationType.NETWORK */;
    }
    if (agent instanceof AiAssistanceModel.FileAgent) {
        return "drjones-file" /* AiAssistanceModel.ConversationType.FILE */;
    }
    if (agent instanceof AiAssistanceModel.PerformanceAgent) {
        return "drjones-performance" /* AiAssistanceModel.ConversationType.PERFORMANCE */;
    }
    if (agent instanceof AiAssistanceModel.PerformanceInsightsAgent) {
        return "performance-insight" /* AiAssistanceModel.ConversationType.PERFORMANCE_INSIGHT */;
    }
    throw new Error('Provided agent does not have a corresponding conversation type');
}
let panelInstance;
export class AiAssistancePanel extends UI.Panel.Panel {
    view;
    static panelName = 'freestyler';
    #toggleSearchElementAction;
    #aidaClient;
    #viewOutput = {};
    #serverSideLoggingEnabled = isAiAssistanceServerSideLoggingEnabled();
    #aiAssistanceEnabledSetting;
    #changeManager = new AiAssistanceModel.ChangeManager();
    #mutex = new Common.Mutex.Mutex();
    #conversationAgent;
    #conversation;
    #historicalConversations = [];
    #selectedFile = null;
    #selectedElement = null;
    #selectedCallTree = null;
    #selectedPerformanceInsight = null;
    #selectedRequest = null;
    // Messages displayed in the `ChatView` component.
    #messages = [];
    // Indicates whether the new conversation context is blocked due to cross-origin restrictions.
    // This happens when the conversation's context has a different
    // origin than the selected context.
    #blockedByCrossOrigin = false;
    // Whether the UI should show loading or not.
    #isLoading = false;
    // Selected conversation context. The reason we keep this as a
    // state field rather than using `#getConversationContext` is that,
    // there is a case where the context differs from the selectedElement (or other selected context type).
    // Specifically, it allows restoring the previous context when a new selection is cross-origin.
    // See `#onContextSelectionChanged` for details.
    #selectedContext = null;
    // Stores the availability status of the `AidaClient` and the reason for unavailability, if any.
    #aidaAvailability;
    // Info of the currently logged in user.
    #userInfo;
    #imageInput;
    // Used to disable send button when there is not text input.
    #isTextInputEmpty = true;
    constructor(view = defaultView, { aidaClient, aidaAvailability, syncInfo }) {
        super(AiAssistancePanel.panelName);
        this.view = view;
        this.registerRequiredCSS(aiAssistancePanelStyles);
        this.#aiAssistanceEnabledSetting = this.#getAiAssistanceEnabledSetting();
        this.#toggleSearchElementAction =
            UI.ActionRegistry.ActionRegistry.instance().getAction('elements.toggle-element-search');
        this.#aidaClient = aidaClient;
        this.#aidaAvailability = aidaAvailability;
        this.#userInfo = {
            accountImage: syncInfo.accountImage,
            accountFullName: syncInfo.accountFullName,
        };
        this.#historicalConversations = AiAssistanceModel.AiHistoryStorage.instance().getHistory().map(item => {
            return new AiAssistanceModel.Conversation(item.type, item.history, item.id, true);
        });
    }
    #getChatUiState() {
        const blockedByAge = Root.Runtime.hostConfig.aidaAvailability?.blockedByAge === true;
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
    #createAgent(conversationType) {
        const options = {
            aidaClient: this.#aidaClient,
            serverSideLoggingEnabled: this.#serverSideLoggingEnabled,
        };
        let agent;
        switch (conversationType) {
            case "freestyler" /* AiAssistanceModel.ConversationType.STYLING */: {
                agent = new AiAssistanceModel.StylingAgent({
                    ...options,
                    changeManager: this.#changeManager,
                });
                if (isAiAssistanceStylingWithFunctionCallingEnabled()) {
                    agent = new AiAssistanceModel.StylingAgentWithFunctionCalling({
                        ...options,
                        changeManager: this.#changeManager,
                    });
                }
                break;
            }
            case "drjones-network-request" /* AiAssistanceModel.ConversationType.NETWORK */: {
                agent = new AiAssistanceModel.NetworkAgent(options);
                break;
            }
            case "drjones-file" /* AiAssistanceModel.ConversationType.FILE */: {
                agent = new AiAssistanceModel.FileAgent(options);
                break;
            }
            case "drjones-performance" /* AiAssistanceModel.ConversationType.PERFORMANCE */: {
                agent = new AiAssistanceModel.PerformanceAgent(options);
                break;
            }
            case "performance-insight" /* AiAssistanceModel.ConversationType.PERFORMANCE_INSIGHT */: {
                agent = new AiAssistanceModel.PerformanceInsightsAgent(options);
                break;
            }
        }
        return agent;
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
        // If there already is an agent and if it is not empty,
        // we don't automatically change the agent. In addition to this,
        // we don't change the current agent when there is a message in flight.
        if ((this.#conversationAgent && this.#conversation && !this.#conversation.isEmpty) || this.#isLoading) {
            return;
        }
        const { hostConfig } = Root.Runtime;
        const isElementsPanelVisible = Boolean(UI.Context.Context.instance().flavor(ElementsPanel.ElementsPanel.ElementsPanel));
        const isNetworkPanelVisible = Boolean(UI.Context.Context.instance().flavor(NetworkPanel.NetworkPanel.NetworkPanel));
        const isSourcesPanelVisible = Boolean(UI.Context.Context.instance().flavor(SourcesPanel.SourcesPanel.SourcesPanel));
        const isPerformancePanelVisible = Boolean(UI.Context.Context.instance().flavor(TimelinePanel.TimelinePanel.TimelinePanel));
        // Check if the user has an insight expanded in the performance panel sidebar.
        // If they have, we default to the Insights agent; otherwise we fallback to
        // the regular Performance agent.
        // Note that we do not listen to this flavor changing; this code is here to
        // ensure that by default we do not pick the Insights agent if the user has
        // just imported a trace and not done anything else. It doesn't make sense
        // to select the Insights AI agent in that case.
        const userHasExpandedPerfInsight = Boolean(UI.Context.Context.instance().flavor(TimelinePanel.TimelinePanel.SelectedInsight));
        let targetConversationType = undefined;
        if (isElementsPanelVisible && hostConfig.devToolsFreestyler?.enabled) {
            targetConversationType = "freestyler" /* AiAssistanceModel.ConversationType.STYLING */;
        }
        else if (isNetworkPanelVisible && hostConfig.devToolsAiAssistanceNetworkAgent?.enabled) {
            targetConversationType = "drjones-network-request" /* AiAssistanceModel.ConversationType.NETWORK */;
        }
        else if (isSourcesPanelVisible && hostConfig.devToolsAiAssistanceFileAgent?.enabled) {
            targetConversationType = "drjones-file" /* AiAssistanceModel.ConversationType.FILE */;
        }
        else if (isPerformancePanelVisible && hostConfig.devToolsAiAssistancePerformanceAgent?.enabled &&
            hostConfig.devToolsAiAssistancePerformanceAgent?.insightsEnabled && userHasExpandedPerfInsight) {
            targetConversationType = "performance-insight" /* AiAssistanceModel.ConversationType.PERFORMANCE_INSIGHT */;
        }
        else if (isPerformancePanelVisible && hostConfig.devToolsAiAssistancePerformanceAgent?.enabled) {
            targetConversationType = "drjones-performance" /* AiAssistanceModel.ConversationType.PERFORMANCE */;
        }
        if (this.#conversation?.type === targetConversationType) {
            // The above if makes sure even if we have an active agent it's empty
            // So we can just reuse it
            return;
        }
        const agent = targetConversationType ? this.#createAgent(targetConversationType) : undefined;
        this.#updateConversationState(agent);
    }
    #updateConversationState(input) {
        const agent = input instanceof AiAssistanceModel.AiAgent ? input : undefined;
        const conversation = input instanceof AiAssistanceModel.Conversation ? input : undefined;
        if (this.#conversationAgent !== agent) {
            // Cancel any previous conversation
            this.#cancel();
            this.#messages = [];
            this.#isLoading = false;
            this.#conversation?.archiveConversation();
            this.#conversationAgent = agent;
            // If we get a new agent we need to
            // create a new conversation along side it
            if (agent) {
                this.#conversation = new AiAssistanceModel.Conversation(agentToConversationType(agent), [], agent.id, false);
                this.#historicalConversations.push(this.#conversation);
            }
        }
        if (!agent) {
            this.#conversation = undefined;
            // We need to run doConversation separately
            this.#messages = [];
            // If a no new agent is provided
            // but conversation is
            // update with history conversation
            if (conversation) {
                this.#conversation = conversation;
            }
        }
        if (!this.#conversationAgent && !this.#conversation) {
            this.#selectDefaultAgentIfNeeded();
        }
        this.#onContextSelectionChanged();
        this.requestUpdate();
    }
    wasShown() {
        super.wasShown();
        this.#viewOutput.chatView?.restoreScrollPosition();
        this.#viewOutput.chatView?.focusTextInput();
        void this.#handleAidaAvailabilityChange();
        this.#selectedElement =
            createNodeContext(selectedElementFilter(UI.Context.Context.instance().flavor(SDK.DOMModel.DOMNode)));
        this.#selectedRequest =
            createRequestContext(UI.Context.Context.instance().flavor(SDK.NetworkRequest.NetworkRequest));
        this.#selectedCallTree =
            createCallTreeContext(UI.Context.Context.instance().flavor(TimelineUtils.AICallTree.AICallTree));
        this.#selectedPerformanceInsight =
            createPerfInsightContext(UI.Context.Context.instance().flavor(TimelineUtils.InsightAIContext.ActiveInsight));
        this.#selectedFile = createFileContext(UI.Context.Context.instance().flavor(Workspace.UISourceCode.UISourceCode));
        this.#updateConversationState(this.#conversationAgent);
        this.#aiAssistanceEnabledSetting?.addChangeListener(this.requestUpdate, this);
        Host.AidaClient.HostConfigTracker.instance().addEventListener("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */, this.#handleAidaAvailabilityChange);
        this.#toggleSearchElementAction.addEventListener("Toggled" /* UI.ActionRegistration.Events.TOGGLED */, this.requestUpdate, this);
        UI.Context.Context.instance().addFlavorChangeListener(SDK.DOMModel.DOMNode, this.#handleDOMNodeFlavorChange);
        UI.Context.Context.instance().addFlavorChangeListener(SDK.NetworkRequest.NetworkRequest, this.#handleNetworkRequestFlavorChange);
        UI.Context.Context.instance().addFlavorChangeListener(TimelineUtils.AICallTree.AICallTree, this.#handleTraceEntryNodeFlavorChange);
        UI.Context.Context.instance().addFlavorChangeListener(Workspace.UISourceCode.UISourceCode, this.#handleUISourceCodeFlavorChange);
        UI.Context.Context.instance().addFlavorChangeListener(TimelineUtils.InsightAIContext.ActiveInsight, this.#handlePerfInsightFlavorChange);
        UI.Context.Context.instance().addFlavorChangeListener(ElementsPanel.ElementsPanel.ElementsPanel, this.#selectDefaultAgentIfNeeded, this);
        UI.Context.Context.instance().addFlavorChangeListener(NetworkPanel.NetworkPanel.NetworkPanel, this.#selectDefaultAgentIfNeeded, this);
        UI.Context.Context.instance().addFlavorChangeListener(SourcesPanel.SourcesPanel.SourcesPanel, this.#selectDefaultAgentIfNeeded, this);
        UI.Context.Context.instance().addFlavorChangeListener(TimelinePanel.TimelinePanel.TimelinePanel, this.#selectDefaultAgentIfNeeded, this);
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.AttrModified, this.#handleDOMNodeAttrChange, this);
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.AttrRemoved, this.#handleDOMNodeAttrChange, this);
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.ResourceTreeModel.ResourceTreeModel, SDK.ResourceTreeModel.Events.PrimaryPageChanged, this.#onPrimaryPageChanged, this);
        Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistancePanelOpened);
    }
    willHide() {
        this.#aiAssistanceEnabledSetting?.removeChangeListener(this.requestUpdate, this);
        Host.AidaClient.HostConfigTracker.instance().removeEventListener("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */, this.#handleAidaAvailabilityChange);
        this.#toggleSearchElementAction.removeEventListener("Toggled" /* UI.ActionRegistration.Events.TOGGLED */, this.requestUpdate, this);
        UI.Context.Context.instance().removeFlavorChangeListener(SDK.DOMModel.DOMNode, this.#handleDOMNodeFlavorChange);
        UI.Context.Context.instance().removeFlavorChangeListener(SDK.NetworkRequest.NetworkRequest, this.#handleNetworkRequestFlavorChange);
        UI.Context.Context.instance().removeFlavorChangeListener(TimelineUtils.AICallTree.AICallTree, this.#handleTraceEntryNodeFlavorChange);
        UI.Context.Context.instance().removeFlavorChangeListener(TimelineUtils.InsightAIContext.ActiveInsight, this.#handlePerfInsightFlavorChange);
        UI.Context.Context.instance().removeFlavorChangeListener(Workspace.UISourceCode.UISourceCode, this.#handleUISourceCodeFlavorChange);
        UI.Context.Context.instance().removeFlavorChangeListener(ElementsPanel.ElementsPanel.ElementsPanel, this.#selectDefaultAgentIfNeeded, this);
        UI.Context.Context.instance().removeFlavorChangeListener(NetworkPanel.NetworkPanel.NetworkPanel, this.#selectDefaultAgentIfNeeded, this);
        UI.Context.Context.instance().removeFlavorChangeListener(SourcesPanel.SourcesPanel.SourcesPanel, this.#selectDefaultAgentIfNeeded, this);
        UI.Context.Context.instance().removeFlavorChangeListener(TimelinePanel.TimelinePanel.TimelinePanel, this.#selectDefaultAgentIfNeeded, this);
        SDK.TargetManager.TargetManager.instance().removeModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.AttrModified, this.#handleDOMNodeAttrChange, this);
        SDK.TargetManager.TargetManager.instance().removeModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.AttrRemoved, this.#handleDOMNodeAttrChange, this);
        SDK.TargetManager.TargetManager.instance().removeModelListener(SDK.ResourceTreeModel.ResourceTreeModel, SDK.ResourceTreeModel.Events.PrimaryPageChanged, this.#onPrimaryPageChanged, this);
    }
    #handleAidaAvailabilityChange = async () => {
        const currentAidaAvailability = await Host.AidaClient.AidaClient.checkAccessPreconditions();
        if (currentAidaAvailability !== this.#aidaAvailability) {
            this.#aidaAvailability = currentAidaAvailability;
            const syncInfo = await new Promise(resolve => Host.InspectorFrontendHost.InspectorFrontendHostInstance.getSyncInformation(resolve));
            this.#userInfo = {
                accountImage: syncInfo.accountImage,
                accountFullName: syncInfo.accountFullName,
            };
            this.requestUpdate();
        }
    };
    #handleDOMNodeFlavorChange = (ev) => {
        if (this.#selectedElement?.getItem() === ev.data) {
            return;
        }
        this.#selectedElement = createNodeContext(selectedElementFilter(ev.data));
        this.#updateConversationState(this.#conversationAgent);
    };
    #handleDOMNodeAttrChange = (ev) => {
        if (this.#selectedElement?.getItem() === ev.data.node) {
            if (ev.data.name === 'class' || ev.data.name === 'id') {
                this.requestUpdate();
            }
        }
    };
    #handleNetworkRequestFlavorChange = (ev) => {
        if (this.#selectedRequest?.getItem() === ev.data) {
            return;
        }
        this.#selectedRequest = Boolean(ev.data) ? new AiAssistanceModel.RequestContext(ev.data) : null;
        this.#updateConversationState(this.#conversationAgent);
    };
    #handleTraceEntryNodeFlavorChange = (ev) => {
        if (this.#selectedCallTree?.getItem() === ev.data) {
            return;
        }
        this.#selectedCallTree = Boolean(ev.data) ? new AiAssistanceModel.CallTreeContext(ev.data) : null;
        this.#updateConversationState(this.#conversationAgent);
    };
    #handlePerfInsightFlavorChange = (ev) => {
        if (this.#selectedPerformanceInsight?.getItem() === ev.data) {
            return;
        }
        this.#selectedPerformanceInsight = Boolean(ev.data) ? new AiAssistanceModel.InsightContext(ev.data) : null;
        this.#updateConversationState(this.#conversationAgent);
    };
    #handleUISourceCodeFlavorChange = (ev) => {
        const newFile = ev.data;
        if (!newFile) {
            return;
        }
        if (this.#selectedFile?.getItem() === newFile) {
            return;
        }
        this.#selectedFile = new AiAssistanceModel.FileContext(ev.data);
        this.#updateConversationState(this.#conversationAgent);
    };
    #onPrimaryPageChanged() {
        if (!this.#imageInput) {
            return;
        }
        this.#imageInput = undefined;
        this.requestUpdate();
    }
    #getChangeSummary() {
        if (!isAiAssistancePatchingEnabled() || !this.#conversationAgent || this.#conversation?.isReadOnly) {
            return;
        }
        return this.#changeManager.formatChangesForPatching(this.#conversationAgent.id, /* includeSourceLocation= */ true);
    }
    async performUpdate() {
        const emptyStateSuggestions = await getEmptyStateSuggestions(this.#selectedContext, this.#conversation?.type);
        this.view({
            state: this.#getChatUiState(),
            blockedByCrossOrigin: this.#blockedByCrossOrigin,
            aidaAvailability: this.#aidaAvailability,
            isLoading: this.#isLoading,
            messages: this.#messages,
            selectedContext: this.#selectedContext,
            conversationType: this.#conversation?.type,
            isReadOnly: this.#conversation?.isReadOnly ?? false,
            changeSummary: this.#getChangeSummary(),
            inspectElementToggled: this.#toggleSearchElementAction.toggled(),
            userInfo: this.#userInfo,
            canShowFeedbackForm: this.#serverSideLoggingEnabled,
            multimodalInputEnabled: isAiAssistanceMultimodalInputEnabled() &&
                this.#conversation?.type === "freestyler" /* AiAssistanceModel.ConversationType.STYLING */,
            imageInput: this.#imageInput,
            isDeleteHistoryButtonVisible: Boolean(this.#conversation && !this.#conversation.isEmpty),
            isTextInputDisabled: this.#isTextInputDisabled(),
            emptyStateSuggestions,
            inputPlaceholder: this.#getChatInputPlaceholder(),
            disclaimerText: this.#getDisclaimerText(),
            isTextInputEmpty: this.#isTextInputEmpty,
            changeManager: this.#changeManager,
            onNewChatClick: this.#handleNewChatRequest.bind(this),
            onHistoryClick: this.#onHistoryClicked.bind(this),
            onDeleteClick: this.#onDeleteClicked.bind(this),
            onHelpClick: () => {
                UI.UIUtils.openInNewTab(AI_ASSISTANCE_HELP);
            },
            onSettingsClick: () => {
                void UI.ViewManager.ViewManager.instance().showView('chrome-ai');
            },
            onTextSubmit: async (text, imageInput) => {
                this.#imageInput = undefined;
                this.#isTextInputEmpty = true;
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceQuerySubmitted);
                await this.#startConversation(text, imageInput);
            },
            onInspectElementClick: this.#handleSelectElementClick.bind(this),
            onFeedbackSubmit: this.#handleFeedbackSubmit.bind(this),
            onCancelClick: this.#cancel.bind(this),
            onContextClick: this.#handleContextClick.bind(this),
            onNewConversation: this.#handleNewChatRequest.bind(this),
            onTakeScreenshot: isAiAssistanceMultimodalInputEnabled() ? this.#handleTakeScreenshot.bind(this) : undefined,
            onRemoveImageInput: isAiAssistanceMultimodalInputEnabled() ? this.#handleRemoveImageInput.bind(this) :
                undefined,
            onTextInputChange: this.#handleTextInputChange.bind(this),
        }, this.#viewOutput, this.contentElement);
    }
    #handleSelectElementClick() {
        void this.#toggleSearchElementAction.execute();
    }
    #isTextInputDisabled() {
        // If the `aiAssistanceSetting` is not enabled
        // or if the user is blocked by age, the text input is disabled.
        const aiAssistanceSetting = this.#aiAssistanceEnabledSetting?.getIfNotDisabled();
        const isBlockedByAge = Root.Runtime.hostConfig.aidaAvailability?.blockedByAge === true;
        if (!aiAssistanceSetting || isBlockedByAge) {
            return true;
        }
        // If the Aida is not available, the text input is disabled.
        const isAidaAvailable = this.#aidaAvailability === "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */;
        if (!isAidaAvailable) {
            return true;
        }
        // If sending a new message is blocked by cross origin context
        // the text input is disabled.
        if (this.#blockedByCrossOrigin) {
            return true;
        }
        // If there is no current agent if there is no selected context
        // the text input is disabled.
        if (!this.#conversation || !this.#selectedContext) {
            return true;
        }
        return false;
    }
    #getChatInputPlaceholder() {
        const state = this.#getChatUiState();
        if (state === "consent-view" /* ChatViewState.CONSENT_VIEW */ || !this.#conversation) {
            return i18nString(UIStrings.followTheSteps);
        }
        if (this.#blockedByCrossOrigin) {
            return lockedString(UIStringsNotTranslate.crossOriginError);
        }
        switch (this.#conversation.type) {
            case "freestyler" /* AiAssistanceModel.ConversationType.STYLING */:
                return this.#selectedContext ? lockedString(UIStringsNotTranslate.inputPlaceholderForStyling) :
                    lockedString(UIStringsNotTranslate.inputPlaceholderForStylingNoContext);
            case "drjones-file" /* AiAssistanceModel.ConversationType.FILE */:
                return this.#selectedContext ? lockedString(UIStringsNotTranslate.inputPlaceholderForFile) :
                    lockedString(UIStringsNotTranslate.inputPlaceholderForFileNoContext);
            case "drjones-network-request" /* AiAssistanceModel.ConversationType.NETWORK */:
                return this.#selectedContext ? lockedString(UIStringsNotTranslate.inputPlaceholderForNetwork) :
                    lockedString(UIStringsNotTranslate.inputPlaceholderForNetworkNoContext);
            case "drjones-performance" /* AiAssistanceModel.ConversationType.PERFORMANCE */:
                return this.#selectedContext ? lockedString(UIStringsNotTranslate.inputPlaceholderForPerformance) :
                    lockedString(UIStringsNotTranslate.inputPlaceholderForPerformanceNoContext);
            case "performance-insight" /* AiAssistanceModel.ConversationType.PERFORMANCE_INSIGHT */:
                return this.#selectedContext ?
                    lockedString(UIStringsNotTranslate.inputPlaceholderForPerformanceInsights) :
                    lockedString(UIStringsNotTranslate.inputPlaceholderForPerformanceInsightsNoContext);
        }
    }
    #getDisclaimerText() {
        const state = this.#getChatUiState();
        if (state === "consent-view" /* ChatViewState.CONSENT_VIEW */ || !this.#conversation || this.#conversation.isReadOnly) {
            return i18nString(UIStrings.inputDisclaimerForEmptyState);
        }
        const noLogging = Root.Runtime.hostConfig.aidaAvailability?.enterprisePolicyValue ===
            Root.Runtime.GenAiEnterprisePolicyValue.ALLOW_WITHOUT_LOGGING;
        switch (this.#conversation.type) {
            case "freestyler" /* AiAssistanceModel.ConversationType.STYLING */:
                if (noLogging) {
                    return lockedString(UIStringsNotTranslate.inputDisclaimerForStylingEnterpriseNoLogging);
                }
                return lockedString(UIStringsNotTranslate.inputDisclaimerForStyling);
            case "drjones-file" /* AiAssistanceModel.ConversationType.FILE */:
                if (noLogging) {
                    return lockedString(UIStringsNotTranslate.inputDisclaimerForFileEnterpriseNoLogging);
                }
                return lockedString(UIStringsNotTranslate.inputDisclaimerForFile);
            case "drjones-network-request" /* AiAssistanceModel.ConversationType.NETWORK */:
                if (noLogging) {
                    return lockedString(UIStringsNotTranslate.inputDisclaimerForNetworkEnterpriseNoLogging);
                }
                return lockedString(UIStringsNotTranslate.inputDisclaimerForNetwork);
            // It is deliberate that both Performance agents use the same disclaimer
            // text and this has been approved by Privacy.
            case "drjones-performance" /* AiAssistanceModel.ConversationType.PERFORMANCE */:
            case "performance-insight" /* AiAssistanceModel.ConversationType.PERFORMANCE_INSIGHT */:
                if (noLogging) {
                    return lockedString(UIStringsNotTranslate.inputDisclaimerForPerformanceEnterpriseNoLogging);
                }
                return lockedString(UIStringsNotTranslate.inputDisclaimerForPerformance);
        }
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
        const context = this.#selectedContext;
        if (context instanceof AiAssistanceModel.RequestContext) {
            const requestLocation = NetworkForward.UIRequestLocation.UIRequestLocation.tab(context.getItem(), "headers-component" /* NetworkForward.UIRequestLocation.UIRequestTabs.HEADERS_COMPONENT */);
            return Common.Revealer.reveal(requestLocation);
        }
        if (context instanceof AiAssistanceModel.FileContext) {
            return Common.Revealer.reveal(context.getItem().uiLocation(0, 0));
        }
        if (context instanceof AiAssistanceModel.CallTreeContext) {
            const item = context.getItem();
            const event = item.selectedNode?.event ?? item.rootNode.event;
            const trace = new SDK.TraceObject.RevealableEvent(event);
            return Common.Revealer.reveal(trace);
        }
        // Node picker is using linkifier.
    }
    handleAction(actionId) {
        if (this.#isLoading) {
            // If running some queries already, focus the input with the abort
            // button and do nothing.
            this.#viewOutput.chatView?.focusTextInput();
            return;
        }
        let targetConversationType;
        switch (actionId) {
            case 'freestyler.elements-floating-button': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceOpenedFromElementsPanelFloatingButton);
                targetConversationType = "freestyler" /* AiAssistanceModel.ConversationType.STYLING */;
                break;
            }
            case 'freestyler.element-panel-context': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceOpenedFromElementsPanel);
                targetConversationType = "freestyler" /* AiAssistanceModel.ConversationType.STYLING */;
                break;
            }
            case 'drjones.network-floating-button': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceOpenedFromNetworkPanelFloatingButton);
                targetConversationType = "drjones-network-request" /* AiAssistanceModel.ConversationType.NETWORK */;
                break;
            }
            case 'drjones.network-panel-context': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceOpenedFromNetworkPanel);
                targetConversationType = "drjones-network-request" /* AiAssistanceModel.ConversationType.NETWORK */;
                break;
            }
            case 'drjones.performance-panel-context': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceOpenedFromPerformancePanel);
                targetConversationType = "drjones-performance" /* AiAssistanceModel.ConversationType.PERFORMANCE */;
                break;
            }
            case 'drjones.performance-insight-context': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceOpenedFromPerformanceInsight);
                targetConversationType = "performance-insight" /* AiAssistanceModel.ConversationType.PERFORMANCE_INSIGHT */;
                break;
            }
            case 'drjones.sources-floating-button': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceOpenedFromSourcesPanelFloatingButton);
                targetConversationType = "drjones-file" /* AiAssistanceModel.ConversationType.FILE */;
                break;
            }
            case 'drjones.sources-panel-context': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceOpenedFromSourcesPanel);
                targetConversationType = "drjones-file" /* AiAssistanceModel.ConversationType.FILE */;
                break;
            }
        }
        if (!targetConversationType) {
            return;
        }
        let agent = this.#conversationAgent;
        if (!this.#conversation || !this.#conversationAgent || this.#conversation.type !== targetConversationType ||
            this.#conversation?.isEmpty || targetConversationType === "drjones-performance" /* AiAssistanceModel.ConversationType.PERFORMANCE */) {
            agent = this.#createAgent(targetConversationType);
        }
        this.#updateConversationState(agent);
        this.#viewOutput.chatView?.focusTextInput();
    }
    #onHistoryClicked(event) {
        const target = event.target;
        const clientRect = target?.getBoundingClientRect();
        const contextMenu = new UI.ContextMenu.ContextMenu(event, {
            useSoftMenu: true,
            x: clientRect?.left,
            y: clientRect?.bottom,
        });
        for (const conversation of [...this.#historicalConversations].reverse()) {
            if (conversation.isEmpty) {
                continue;
            }
            const title = conversation.title;
            if (!title) {
                continue;
            }
            contextMenu.defaultSection().appendCheckboxItem(title, () => {
                void this.#openConversation(conversation);
            }, { checked: (this.#conversation === conversation) });
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
        this.#historicalConversations = [];
        void AiAssistanceModel.AiHistoryStorage.instance().deleteAll();
        this.#updateConversationState();
    }
    #onDeleteClicked() {
        if (!this.#conversation) {
            return;
        }
        this.#historicalConversations =
            this.#historicalConversations.filter(conversation => conversation !== this.#conversation);
        void AiAssistanceModel.AiHistoryStorage.instance().deleteHistoryEntry(this.#conversation.id);
        this.#updateConversationState();
        UI.ARIAUtils.alert(i18nString(UIStrings.chatDeleted));
    }
    async #openConversation(conversation) {
        if (this.#conversation === conversation) {
            return;
        }
        this.#updateConversationState(conversation);
        await this.#doConversation(conversation.history);
    }
    #handleNewChatRequest() {
        this.#updateConversationState();
        UI.ARIAUtils.alert(i18nString(UIStrings.newChatCreated));
    }
    async #handleTakeScreenshot() {
        const mainTarget = SDK.TargetManager.TargetManager.instance().primaryPageTarget();
        if (!mainTarget) {
            throw new Error('Could not find main target');
        }
        const model = mainTarget.model(SDK.ScreenCaptureModel.ScreenCaptureModel);
        if (!model) {
            throw new Error('Could not find model');
        }
        const showLoadingTimeout = setTimeout(() => {
            this.#imageInput = { isLoading: true };
            this.requestUpdate();
        }, SHOW_LOADING_STATE_TIMEOUT);
        const bytes = await model.captureScreenshot("jpeg" /* Protocol.Page.CaptureScreenshotRequestFormat.Jpeg */, SCREENSHOT_QUALITY, "fromViewport" /* SDK.ScreenCaptureModel.ScreenshotMode.FROM_VIEWPORT */);
        clearTimeout(showLoadingTimeout);
        if (bytes) {
            this.#imageInput = { isLoading: false, data: bytes };
            this.requestUpdate();
            void this.updateComplete.then(() => {
                this.#viewOutput.chatView?.focusTextInput();
            });
        }
    }
    #handleRemoveImageInput() {
        this.#imageInput = undefined;
        this.requestUpdate();
        void this.updateComplete.then(() => {
            this.#viewOutput.chatView?.focusTextInput();
        });
    }
    #handleTextInputChange(value) {
        const disableSubmit = !value;
        if (disableSubmit !== this.#isTextInputEmpty) {
            this.#isTextInputEmpty = disableSubmit;
            void this.requestUpdate();
        }
    }
    #runAbortController = new AbortController();
    #cancel() {
        this.#runAbortController.abort();
        this.#runAbortController = new AbortController();
    }
    #onContextSelectionChanged(contextToRestore) {
        if (!this.#conversationAgent) {
            this.#blockedByCrossOrigin = false;
            return;
        }
        const currentContext = contextToRestore ?? this.#getConversationContext();
        this.#selectedContext = currentContext;
        if (!currentContext) {
            this.#blockedByCrossOrigin = false;
            return;
        }
        this.#blockedByCrossOrigin = !currentContext.isOriginAllowed(this.#conversationAgent.origin);
    }
    #getConversationContext() {
        if (!this.#conversation) {
            return null;
        }
        let context;
        switch (this.#conversation.type) {
            case "freestyler" /* AiAssistanceModel.ConversationType.STYLING */:
                context = this.#selectedElement;
                break;
            case "drjones-file" /* AiAssistanceModel.ConversationType.FILE */:
                context = this.#selectedFile;
                break;
            case "drjones-network-request" /* AiAssistanceModel.ConversationType.NETWORK */:
                context = this.#selectedRequest;
                break;
            case "drjones-performance" /* AiAssistanceModel.ConversationType.PERFORMANCE */:
                context = this.#selectedCallTree;
                break;
            case "performance-insight" /* AiAssistanceModel.ConversationType.PERFORMANCE_INSIGHT */:
                context = this.#selectedPerformanceInsight;
                break;
        }
        return context;
    }
    async #startConversation(text, imageInput) {
        if (!this.#conversationAgent) {
            return;
        }
        // Cancel any previous in-flight conversation.
        this.#cancel();
        const signal = this.#runAbortController.signal;
        const context = this.#getConversationContext();
        // If a different context is provided, it must be from the same origin.
        if (context && !context.isOriginAllowed(this.#conversationAgent.origin)) {
            // This error should not be reached. If it happens, some
            // invariants do not hold anymore.
            throw new Error('cross-origin context data should not be included');
        }
        const image = isAiAssistanceMultimodalInputEnabled() ? imageInput : undefined;
        const imageId = image ? crypto.randomUUID() : undefined;
        const runner = this.#conversationAgent.run(text, {
            signal,
            selected: context,
        }, image, imageId);
        UI.ARIAUtils.alert(lockedString(UIStringsNotTranslate.answerLoading));
        await this.#doConversation(this.#saveResponsesToCurrentConversation(runner));
        UI.ARIAUtils.alert(lockedString(UIStringsNotTranslate.answerReady));
    }
    async *#saveResponsesToCurrentConversation(items) {
        const currentConversation = this.#conversation;
        for await (const data of items) {
            // We don't want to save partial responses to the conversation history.
            if (data.type !== "answer" /* AiAssistanceModel.ResponseType.ANSWER */ || data.complete) {
                void currentConversation?.addHistoryItem(data);
            }
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
            this.#isLoading = true;
            for await (const data of items) {
                step.sideEffect = undefined;
                switch (data.type) {
                    case "user-query" /* AiAssistanceModel.ResponseType.USER_QUERY */: {
                        this.#messages.push({
                            entity: "user" /* ChatMessageEntity.USER */,
                            text: data.query,
                            imageInput: data.imageInput,
                        });
                        systemMessage = {
                            entity: "model" /* ChatMessageEntity.MODEL */,
                            steps: [],
                        };
                        this.#messages.push(systemMessage);
                        break;
                    }
                    case "querying" /* AiAssistanceModel.ResponseType.QUERYING */: {
                        step = { isLoading: true };
                        if (!systemMessage.steps.length) {
                            systemMessage.steps.push(step);
                        }
                        break;
                    }
                    case "context" /* AiAssistanceModel.ResponseType.CONTEXT */: {
                        step.title = data.title;
                        step.contextDetails = data.details;
                        step.isLoading = false;
                        commitStep();
                        break;
                    }
                    case "title" /* AiAssistanceModel.ResponseType.TITLE */: {
                        step.title = data.title;
                        commitStep();
                        break;
                    }
                    case "thought" /* AiAssistanceModel.ResponseType.THOUGHT */: {
                        step.isLoading = false;
                        step.thought = data.thought;
                        commitStep();
                        break;
                    }
                    case "suggestions" /* AiAssistanceModel.ResponseType.SUGGESTIONS */: {
                        systemMessage.suggestions = data.suggestions;
                        break;
                    }
                    case "side-effect" /* AiAssistanceModel.ResponseType.SIDE_EFFECT */: {
                        step.isLoading = false;
                        step.code ??= data.code;
                        step.sideEffect = {
                            onAnswer: (result) => {
                                data.confirm(result);
                                step.sideEffect = undefined;
                                this.requestUpdate();
                            },
                        };
                        commitStep();
                        break;
                    }
                    case "action" /* AiAssistanceModel.ResponseType.ACTION */: {
                        step.isLoading = false;
                        step.code ??= data.code;
                        step.output ??= data.output;
                        step.canceled = data.canceled;
                        commitStep();
                        break;
                    }
                    case "answer" /* AiAssistanceModel.ResponseType.ANSWER */: {
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
                    case "error" /* AiAssistanceModel.ResponseType.ERROR */: {
                        systemMessage.error = data.error;
                        systemMessage.rpcId = undefined;
                        const lastStep = systemMessage.steps.at(-1);
                        if (lastStep) {
                            // Mark the last step as cancelled to make the UI feel better.
                            if (data.error === "abort" /* AiAssistanceModel.ErrorType.ABORT */) {
                                lastStep.canceled = true;
                                // If error happens while the step is still loading remove it.
                            }
                            else if (lastStep.isLoading) {
                                systemMessage.steps.pop();
                            }
                        }
                        if (data.error === "block" /* AiAssistanceModel.ErrorType.BLOCK */) {
                            systemMessage.answer = undefined;
                        }
                    }
                }
                // Commit update intermediated step when not
                // in read only mode.
                if (!this.#conversation?.isReadOnly) {
                    this.requestUpdate();
                    // This handles scrolling to the bottom for live conversations when:
                    // * User submits the query & the context step is shown.
                    // * There is a side effect dialog  shown.
                    if (data.type === "context" /* AiAssistanceModel.ResponseType.CONTEXT */ ||
                        data.type === "side-effect" /* AiAssistanceModel.ResponseType.SIDE_EFFECT */) {
                        this.#viewOutput.chatView?.scrollToBottom();
                    }
                }
            }
            this.#isLoading = false;
            this.requestUpdate();
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
            case 'drjones.performance-insight-context':
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
function isAiAssistanceMultimodalInputEnabled() {
    return Boolean(Root.Runtime.hostConfig.devToolsFreestyler?.multimodal);
}
function isAiAssistanceServerSideLoggingEnabled() {
    return !Root.Runtime.hostConfig.aidaAvailability?.disallowLogging;
}
function isAiAssistanceStylingWithFunctionCallingEnabled() {
    return Boolean(Root.Runtime.hostConfig.devToolsFreestyler?.functionCalling);
}
//# sourceMappingURL=AiAssistancePanel.js.map