// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../core/host/host.js';
import * as Console from '../console/console.js';
import { ConsoleInsight } from './components/ConsoleInsight.js';
import { InsightProvider } from './InsightProvider.js';
import { PromptBuilder } from './PromptBuilder.js';
export class ActionDelegate {
    handleAction(context, actionId) {
        switch (actionId) {
            case 'explain.consoleMessage:context':
            case 'explain.console-message.context.error':
            case 'explain.console-message.context.warning':
            case 'explain.console-message.context.other':
            case 'explain.console-message.hover': {
                const consoleViewMessage = context.flavor(Console.ConsoleViewMessage.ConsoleViewMessage);
                if (consoleViewMessage) {
                    if (actionId.startsWith('explain.consoleMessage:context')) {
                        Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightRequestedViaContextMenu);
                    }
                    else if (actionId === 'explain.console-message.hover') {
                        Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightRequestedViaHoverButton);
                    }
                    const insight = new ConsoleInsight(new PromptBuilder(consoleViewMessage), new InsightProvider());
                    consoleViewMessage.setInsight(insight);
                    void insight.update();
                    return true;
                }
                return false;
            }
        }
        return false;
    }
}
//# sourceMappingURL=ActionDelegate.js.map