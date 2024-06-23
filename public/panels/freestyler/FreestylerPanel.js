// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as LitHtml from '../../ui/lit-html/lit-html.js';
import { ChatMessageEntity, FreestylerChatUi, } from './components/FreestylerChatUi.js';
import { FreestylerAgent, Step } from './FreestylerAgent.js';
import freestylerPanelStyles from './freestylerPanel.css.js';
/*
  * TODO(nvitkov): b/346933425
  * Temporary string that should not be translated
  * as they may change often during development.
  */
const TempUIStrings = {
    /**
     *@description Freestyler UI text for clearing messages.
     */
    clearMessages: 'Clear messages',
    /**
     *@description Freestyler UI text for sending feedback.
     */
    sendFeedback: 'Send feedback',
    /**
     *@description Freestyelr UI text for the help button.
     */
    help: 'Help',
};
// TODO(nvitkov): b/346933425
// const str_ = i18n.i18n.registerUIStrings('panels/freestyler/FreestylerPanel.ts', UIStrings);
// const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
/* eslint-disable  rulesdir/l10n_i18nString_call_only_with_uistrings */
const i18nString = i18n.i18n.lockedString;
// TODO(ergunsh): Use the WidgetElement instead of separately creating the toolbar.
function createToolbar(target, { onClearClick }) {
    const toolbarContainer = target.createChild('div', 'freestyler-toolbar-container');
    const leftToolbar = new UI.Toolbar.Toolbar('', toolbarContainer);
    const rightToolbar = new UI.Toolbar.Toolbar('freestyler-right-toolbar', toolbarContainer);
    const clearButton = new UI.Toolbar.ToolbarButton(i18nString(TempUIStrings.clearMessages), 'clear', undefined, 'freestyler.clear');
    clearButton.addEventListener("Click" /* UI.Toolbar.ToolbarButton.Events.Click */, onClearClick);
    leftToolbar.appendToolbarItem(clearButton);
    rightToolbar.appendSeparator();
    const feedbackButton = new UI.Toolbar.ToolbarButton(i18nString(TempUIStrings.sendFeedback), 'bug', undefined, 'freestyler.feedback');
    const helpButton = new UI.Toolbar.ToolbarButton(i18nString(TempUIStrings.help), 'help', undefined, 'freestyler.help');
    rightToolbar.appendToolbarItem(feedbackButton);
    rightToolbar.appendToolbarItem(helpButton);
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
    #selectedNode;
    #contentContainer;
    #aidaClient;
    #agent;
    #viewProps;
    #viewOutput = {};
    #consentViewAcceptedSetting = Common.Settings.Settings.instance().createLocalSetting('freestyler-dogfood-consent-onboarding-finished', false);
    constructor(view = defaultView, { aidaClient, aidaAvailability }) {
        super(FreestylerPanel.panelName);
        this.view = view;
        createToolbar(this.contentElement, { onClearClick: this.#clearMessages.bind(this) });
        this.#toggleSearchElementAction =
            UI.ActionRegistry.ActionRegistry.instance().getAction('elements.toggle-element-search');
        this.#aidaClient = aidaClient;
        this.#contentContainer = this.contentElement.createChild('div', 'freestyler-chat-ui-container');
        this.#agent = new FreestylerAgent({ aidaClient: this.#aidaClient });
        this.#selectedNode = UI.Context.Context.instance().flavor(SDK.DOMModel.DOMNode);
        this.#viewProps = {
            state: this.#consentViewAcceptedSetting.get() ? "chat-view" /* FreestylerChatUiState.CHAT_VIEW */ :
                "consent-view" /* FreestylerChatUiState.CONSENT_VIEW */,
            aidaAvailability,
            messages: [],
            inspectElementToggled: this.#toggleSearchElementAction.toggled(),
            selectedNode: this.#selectedNode,
            isLoading: false,
            onTextSubmit: this.#handleTextSubmit.bind(this),
            onInspectElementClick: this.#handleSelectElementClick.bind(this),
            onRateClick: this.#handleRateClick.bind(this),
            onAcceptConsentClick: this.#handleAcceptConsentClick.bind(this),
        };
        this.#toggleSearchElementAction.addEventListener("Toggled" /* UI.ActionRegistration.Events.Toggled */, ev => {
            this.#viewProps.inspectElementToggled = ev.data;
            this.doUpdate();
        });
        UI.Context.Context.instance().addFlavorChangeListener(SDK.DOMModel.DOMNode, ev => {
            if (this.#viewProps.selectedNode === ev.data) {
                return;
            }
            this.#viewProps.selectedNode = ev.data;
            this.#agent.resetHistory();
            this.#clearMessages();
            this.doUpdate();
        });
        this.doUpdate();
    }
    static async instance(opts = { forceNew: null }) {
        const { forceNew } = opts;
        if (!freestylerPanelInstance || forceNew) {
            const aidaAvailability = await Host.AidaClient.AidaClient.getAidaClientAvailability();
            const aidaClient = new Host.AidaClient.AidaClient();
            freestylerPanelInstance = new FreestylerPanel(defaultView, { aidaClient, aidaAvailability });
        }
        return freestylerPanelInstance;
    }
    wasShown() {
        this.registerCSSFiles([freestylerPanelStyles]);
        this.#viewOutput.freestylerChatUi?.focusTextInput();
    }
    doUpdate() {
        this.view(this.#viewProps, this.#viewOutput, this.#contentContainer);
    }
    #handleSelectElementClick() {
        void this.#toggleSearchElementAction.execute();
    }
    #handleRateClick() {
        // TODO(348145480): Handle this -- e.g. there be dragons.
    }
    #handleAcceptConsentClick() {
        this.#consentViewAcceptedSetting.set(true);
        this.#viewProps.state = "chat-view" /* FreestylerChatUiState.CHAT_VIEW */;
        this.doUpdate();
    }
    handleAction(actionId) {
        switch (actionId) {
            case 'freestyler.element-panel-context': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.FreestylerOpenedFromElementsPanel);
                this.#clearMessages();
                break;
            }
            case 'freestyler.style-tab-context': {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.FreestylerOpenedFromStylesTab);
                this.#clearMessages();
                break;
            }
        }
    }
    // TODO(ergunsh): Handle cancelling agent run.
    #clearMessages() {
        this.#viewProps.messages = [];
        this.#agent.resetHistory();
        this.doUpdate();
    }
    async #handleTextSubmit(text) {
        this.#viewProps.messages.push({
            entity: ChatMessageEntity.USER,
            text,
        });
        this.#viewProps.isLoading = true;
        const systemMessage = {
            entity: ChatMessageEntity.MODEL,
            steps: [],
        };
        this.#viewProps.messages.push(systemMessage);
        this.doUpdate();
        for await (const data of this.#agent.run(text)) {
            if (data.step === Step.ANSWER || data.step === Step.ERROR) {
                this.#viewProps.isLoading = false;
            }
            // There can be multiple steps from the same call from the agent.
            // We want to show `rate answer` buttons for the full response.
            // That's why we're removing the `rpcId` from the previous step
            // if there is a new incoming step from the call with the same rpcId.
            const lastStep = systemMessage.steps.at(-1);
            if (lastStep && lastStep.rpcId !== undefined && lastStep.rpcId === data.rpcId) {
                delete lastStep.rpcId;
            }
            systemMessage.steps.push(data);
            this.doUpdate();
        }
    }
}
export class ActionDelegate {
    handleAction(_context, actionId) {
        switch (actionId) {
            case 'freestyler.element-panel-context':
            case 'freestyler.style-tab-context': {
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
//# sourceMappingURL=FreestylerPanel.js.map