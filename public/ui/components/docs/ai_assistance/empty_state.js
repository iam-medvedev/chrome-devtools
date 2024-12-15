// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../../../core/host/host.js';
import * as AiAssistance from '../../../../panels/ai_assistance/ai_assistance.js';
import * as FrontendHelpers from '../../../../testing/EnvironmentHelpers.js';
import * as ComponentHelpers from '../../helpers/helpers.js';
await ComponentHelpers.ComponentServerSetup.setup();
await FrontendHelpers.initializeGlobalVars();
const noop = () => { };
const component = new AiAssistance.ChatView({
    onTextSubmit: noop,
    onInspectElementClick: noop,
    onFeedbackSubmit: noop,
    onCancelClick: noop,
    onContextClick: noop,
    onNewConversation: noop,
    inspectElementToggled: false,
    state: "chat-view" /* AiAssistance.State.CHAT_VIEW */,
    aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
    messages: [],
    selectedContext: new AiAssistance.NodeContext({}),
    agentType: "freestyler" /* AiAssistance.AgentType.STYLING */,
    isLoading: false,
    canShowFeedbackForm: false,
    userInfo: {},
    blockedByCrossOrigin: false,
    isReadOnly: false,
    stripLinks: false,
});
document.getElementById('container')?.appendChild(component);
//# sourceMappingURL=empty_state.js.map