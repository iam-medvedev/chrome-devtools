// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assertScreenshot, renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
describeWithEnvironment('LighthouseStartView', () => {
    let lighthouse;
    beforeEach(async () => {
        lighthouse = await import('./lighthouse.js');
    });
    it('renders correctly', async () => {
        const controller = {
            getFlags: () => ({ mode: 'navigation' }),
            recomputePageAuditability: () => { },
        };
        const panel = {
            handleTimespanStart: () => { },
            handleCompleteRun: () => { },
        };
        const view = new lighthouse.LighthouseStartView.StartView(controller, panel);
        renderElementIntoDOM(view);
        await assertScreenshot('lighthouse/LighthouseStartView.png');
    });
});
//# sourceMappingURL=LighthouseStartView.test.js.map