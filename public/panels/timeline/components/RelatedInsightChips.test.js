// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { dispatchClickEvent, getCleanTextContentFromElements, renderElementIntoDOM, } from '../../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../../testing/EnvironmentHelpers.js';
import * as Coordinator from '../../../ui/components/render_coordinator/render_coordinator.js';
import * as Components from './components.js';
const coordinator = Coordinator.RenderCoordinator.RenderCoordinator.instance();
describeWithEnvironment('RelatedInsightChips', () => {
    // Event doesn't matter, so let's keep this test quick and avoid parsing a trace.
    const FAKE_EVENT = {};
    it('renders nothing if the event has no insights', async () => {
        const component = new Components.RelatedInsightChips.RelatedInsightChips();
        renderElementIntoDOM(component);
        component.activeEvent = FAKE_EVENT;
        component.eventToRelatedInsightsMap = new Map();
        await coordinator.done();
        assert.isOk(component.shadowRoot);
        assert.strictEqual(component.shadowRoot.childElementCount, 0);
    });
    it('renders a chip for each insight the given event is associated with', async () => {
        const relatedInsight = {
            insightLabel: 'Some fake insight',
            activateInsight: () => { },
        };
        const relatedMap = new Map();
        relatedMap.set(FAKE_EVENT, [relatedInsight]);
        const component = new Components.RelatedInsightChips.RelatedInsightChips();
        renderElementIntoDOM(component);
        component.activeEvent = FAKE_EVENT;
        component.eventToRelatedInsightsMap = relatedMap;
        await coordinator.done();
        assert.isOk(component.shadowRoot);
        const chips = component.shadowRoot.querySelectorAll('li.insight-chip');
        assert.lengthOf(chips, 1);
        const text = getCleanTextContentFromElements(chips[0], 'button .insight-label');
        assert.deepEqual(text, ['Some fake insight']);
    });
    it('calls the activateInsight function when the insight is clicked', async () => {
        const activateStub = sinon.stub();
        const relatedInsight = {
            insightLabel: 'Some fake insight',
            activateInsight: () => activateStub(),
        };
        const relatedMap = new Map();
        relatedMap.set(FAKE_EVENT, [relatedInsight]);
        const component = new Components.RelatedInsightChips.RelatedInsightChips();
        renderElementIntoDOM(component);
        component.activeEvent = FAKE_EVENT;
        component.eventToRelatedInsightsMap = relatedMap;
        await coordinator.done();
        assert.isOk(component.shadowRoot);
        const button = component.shadowRoot.querySelector('button');
        assert.isOk(button);
        dispatchClickEvent(button);
        assert.isTrue(activateStub.called);
    });
});
//# sourceMappingURL=RelatedInsightChips.test.js.map