// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../../../core/host/host.js';
import * as Freestyler from '../../../../panels/freestyler/freestyler.js';
import * as FrontendHelpers from '../../../../testing/EnvironmentHelpers.js';
import * as ComponentHelpers from '../../helpers/helpers.js';
await ComponentHelpers.ComponentServerSetup.setup();
await FrontendHelpers.initializeGlobalVars();
const noop = () => { };
const component = new Freestyler.FreestylerChatUi({
    onTextSubmit: noop,
    onInspectElementClick: noop,
    onRateClick: noop,
    onFeedbackSubmit: noop,
    onAcceptConsentClick: noop,
    onCancelClick: noop,
    onFixThisIssueClick: noop,
    inspectElementToggled: false,
    state: "chat-view" /* Freestyler.State.CHAT_VIEW */,
    aidaAvailability: Host.AidaClient.AidaAvailability.AVAILABLE,
    messages: [],
    selectedNode: {},
    isLoading: false,
});
document.getElementById('container')?.appendChild(component);
//# sourceMappingURL=empty_state.js.map