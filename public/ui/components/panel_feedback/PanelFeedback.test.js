// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assertShadowRoot, renderElementIntoDOM } from '../../../../test/unittests/front_end/helpers/DOMHelpers.js';
import { describeWithLocale } from '../../../../test/unittests/front_end/helpers/EnvironmentHelpers.js';
import * as Coordinator from '../render_coordinator/render_coordinator.js';
import * as PanelFeedback from './panel_feedback.js';
const coordinator = Coordinator.RenderCoordinator.RenderCoordinator.instance();
describeWithLocale('Panel Feedback', () => {
    async function renderFeedbackComponent() {
        const component = new PanelFeedback.PanelFeedback.PanelFeedback();
        component.data = {
            feedbackUrl: 'https://feedbackurl.com',
            quickStartUrl: 'https://quickstarturl.com',
            quickStartLinkText: 'quick start link text',
        };
        renderElementIntoDOM(component);
        await coordinator.done();
        return component;
    }
    it('uses the correct href for the feedback x-link', async () => {
        const component = await renderFeedbackComponent();
        assertShadowRoot(component.shadowRoot);
        // Note that whilst they aren't HTMLAnchorElements, it is good enough for
        // this test as all we need is a type that has an `href` attribute.
        const allXLinks = Array.from(component.shadowRoot.querySelectorAll('x-link'));
        const feedbackXLink = allXLinks.find(link => link.innerText === 'Send us your feedback.');
        assert.strictEqual(feedbackXLink?.href, 'https://feedbackurl.com/');
    });
    it('uses the correct href for the quick start x-link', async () => {
        const component = await renderFeedbackComponent();
        assertShadowRoot(component.shadowRoot);
        // Note that whilst they aren't HTMLAnchorElements, it is good enough for
        // this test as all we need is a type that has an `href` attribute.
        const allXLinks = Array.from(component.shadowRoot.querySelectorAll('x-link'));
        const quickstartXLink = allXLinks.find(link => link.innerText === 'quick start link text');
        assert.strictEqual(quickstartXLink?.href, 'https://quickstarturl.com/');
    });
});
//# sourceMappingURL=PanelFeedback.test.js.map