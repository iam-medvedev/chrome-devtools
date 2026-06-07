// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import { assertScreenshot, renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
describeWithEnvironment('LighthouseStartView', () => {
    let lighthouse;
    beforeEach(async () => {
        lighthouse = await import('./lighthouse.js');
    });
    function createStartView() {
        const controller = {
            getFlags: () => ({ mode: 'navigation' }),
            recomputePageAuditability: () => { },
        };
        const panel = {
            handleTimespanStart: () => { },
            handleCompleteRun: () => { },
        };
        return new lighthouse.LighthouseStartView.StartView(controller, panel);
    }
    it('renders correctly', async () => {
        const view = createStartView();
        renderElementIntoDOM(view, { includeCommonStyles: true });
        await assertScreenshot('lighthouse/LighthouseStartView.png');
    });
    it('renders the title as a level-1 heading for accessibility', () => {
        const view = createStartView();
        renderElementIntoDOM(view);
        const heading = view.contentElement.querySelector('h1.lighthouse-title');
        assert.isOk(heading);
        assert.strictEqual(heading.textContent?.trim(), 'Generate a Lighthouse report');
    });
});
//# sourceMappingURL=LighthouseStartView.test.js.map