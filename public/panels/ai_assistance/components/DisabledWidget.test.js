// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../../core/host/host.js';
import { assertScreenshot, renderElementIntoDOM } from '../../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../../testing/EnvironmentHelpers.js';
import * as AiAssistance from '../ai_assistance.js';
describeWithEnvironment('ChatView', () => {
    function renderViewForScreenshots(aidaAvailability, hostConfig) {
        const target = document.createElement('div');
        target.style.maxWidth = '420px';
        target.style.maxHeight = '600px';
        target.style.padding = '12px';
        renderElementIntoDOM(target);
        AiAssistance.DisabledWidget.DEFAULT_VIEW({
            aidaAvailability,
            hostConfig,
        }, {}, target);
    }
    it('shows render consent view correctly', async () => {
        renderViewForScreenshots("available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */, {
            devToolsAiAssistancePerformanceAgent: {
                enabled: true,
            }
        });
        await assertScreenshot('ai_assistance/components/consent-view.png');
    });
    it('shows render disable correctly', async () => {
        renderViewForScreenshots("no-account-email" /* Host.AidaClient.AidaAccessPreconditions.NO_ACCOUNT_EMAIL */, {
            devToolsAiAssistancePerformanceAgent: {
                enabled: true,
            }
        });
        await assertScreenshot('ai_assistance/components/disable-view.png');
    });
});
//# sourceMappingURL=DisabledWidget.test.js.map