// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as LitHtml from '../../ui/lit-html/lit-html.js';
import { FreestylerChatUi, } from './components/FreestylerChatUi.js';
import freestylerPanelStyles from './freestylerPanel.css.js';
const UIStrings = {
    /**
     *@description Freestyler UI text for clearing messages.
     */
    clearMessages: 'Clear messages',
    /**
     *@description Freestyler UI text for creating a new chat messages.
     */
    createChat: 'Create chat',
    /**
     *@description Freestyler UI text for sending feedback.
     */
    sendFeedback: 'Send feedback',
};
const str_ = i18n.i18n.registerUIStrings('panels/freestyler/FreestylerPanel.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
// TODO(ergunsh): Use the WidgetElement instead of separately creating the toolbar.
function createToolbar(target) {
    const toolbarContainer = target.createChild('div', 'freestyler-toolbar-container');
    const leftToolbar = new UI.Toolbar.Toolbar('', toolbarContainer);
    const rightToolbar = new UI.Toolbar.Toolbar('freestyler-right-toolbar', toolbarContainer);
    const addButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.createChat), 'plus', undefined, 'freestyler.add');
    const clearButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.clearMessages), 'clear', undefined, 'freestyler.clear');
    leftToolbar.appendToolbarItem(addButton);
    leftToolbar.appendSeparator();
    leftToolbar.appendToolbarItem(clearButton);
    rightToolbar.appendSeparator();
    const feedbackButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.sendFeedback), 'bug', undefined, 'freestyler.feedback');
    const helpButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.sendFeedback), 'help', undefined, 'freestyler.help');
    rightToolbar.appendToolbarItem(feedbackButton);
    rightToolbar.appendToolbarItem(helpButton);
}
function defaultView(input, output, target) {
    // clang-format off
    LitHtml.render(LitHtml.html `
    <${FreestylerChatUi.litTagName} .props=${{
        onTextSubmit: input.onTextSubmit,
        onAcceptPrivacyNotice: input.onAcceptPrivacyNotice,
        state: input.state,
    }} >
    </${FreestylerChatUi.litTagName}>
  `, target, { host: input }); // eslint-disable-line rulesdir/lit_html_host_this
    // clang-format on
}
let freestylerPanelInstance;
export class FreestylerPanel extends UI.Panel.Panel {
    view;
    #contentContainer;
    state = "consent" /* FreestylerChatUiState.CONSENT_VIEW */;
    constructor(view = defaultView) {
        super('freestyler');
        this.view = view;
        createToolbar(this.contentElement);
        this.#contentContainer = this.contentElement.createChild('div', 'freestyler-chat-ui-container');
        this.doUpdate();
    }
    static instance(opts = { forceNew: null }) {
        const { forceNew } = opts;
        if (!freestylerPanelInstance || forceNew) {
            freestylerPanelInstance = new FreestylerPanel();
        }
        return freestylerPanelInstance;
    }
    wasShown() {
        this.registerCSSFiles([freestylerPanelStyles]);
    }
    doUpdate() {
        this.view(this, this, this.#contentContainer);
    }
    onTextSubmit = () => {
        // TODO(ergunsh): Handle submit here.
    };
    onAcceptPrivacyNotice = () => {
        this.state = "chat" /* FreestylerChatUiState.CHAT_VIEW */;
        this.doUpdate();
    };
}
//# sourceMappingURL=FreestylerPanel.js.map