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
const messages = [
    {
        entity: "user" /* AiAssistance.ChatMessageEntity.USER */,
        text: 'Explain the line wrapping behavior of this element.',
    },
    {
        entity: "model" /* AiAssistance.ChatMessageEntity.MODEL */,
        steps: [
            {
                isLoading: false,
                title: 'Checking element styles',
                thought: 'I need to check the element\'s `white-space` and `overflow-wrap` properties to understand its line wrapping behavior.',
                code: 'const data = {\n  whiteSpace: window.getComputedStyle($0).whiteSpace,\n  overflowWrap: window.getComputedStyle($0).overflowWrap\n};',
                output: '{"whiteSpace":"break-spaces","overflowWrap":"anywhere"}',
            },
        ],
        answer: '# Explanation\n\n## Before\n\nA little bit text here\n\n## Next\n\nThe element\'s line wrapping behavior is determined by the following CSS properties:\n\n* **`white-space: break-spaces;`**: This property tells the browser to preserve spaces and newlines within the text and to break lines at these points, as well as at normal word boundaries.\n\n* **`overflow-wrap: anywhere;`**: This property allows the browser to break lines within words if necessary to prevent overflow. This is useful for long words or URLs that might otherwise extend beyond the container\'s width.\n\nHere\'s an example of how these properties work together:\n\n\n`````\ncss\n.element {\n  white-space: break-spaces;\n  overflow-wrap: anywhere;\n}\n`````\n\n\nWith these properties, the text within the element will wrap at spaces, newlines, and within words if necessary to fit within the container.',
        rpcId: -5412527540357623608,
    },
];
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
    messages,
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
//# sourceMappingURL=basic.js.map