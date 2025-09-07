// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Badges from './badges.js';
class TestBadge extends Badges.Badge {
    name = 'badges/test-badge';
    title = 'test-badge-title';
    interestedActions = [
        Badges.BadgeAction.PERFORMANCE_INSIGHT_CLICKED,
    ];
    handleAction() {
        this.trigger();
    }
}
describe('Badge', () => {
    let badgeActionEventTarget;
    let testBadge;
    let handleActionSpy;
    let dispatchBadgeTriggeredEventStub;
    beforeEach(() => {
        badgeActionEventTarget = new Common.ObjectWrapper.ObjectWrapper();
        handleActionSpy = sinon.spy(TestBadge.prototype, 'handleAction');
        dispatchBadgeTriggeredEventStub = sinon.stub();
        testBadge = new TestBadge({
            dispatchBadgeTriggeredEvent: dispatchBadgeTriggeredEventStub,
            badgeActionEventTarget,
        });
    });
    it('events received for interestedActions trigger `handleAction`', () => {
        testBadge.activate();
        badgeActionEventTarget.dispatchEventToListeners(Badges.BadgeAction.PERFORMANCE_INSIGHT_CLICKED);
        sinon.assert.calledOnce(handleActionSpy);
    });
    it('events received for unrelated actions does not trigger `handleAction`', () => {
        testBadge.activate();
        badgeActionEventTarget.dispatchEventToListeners(Badges.BadgeAction.CSS_RULE_MODIFIED);
        sinon.assert.notCalled(handleActionSpy);
    });
    it('calling `activate` more than one time only adds event listeners once', () => {
        testBadge.activate();
        testBadge.activate();
        badgeActionEventTarget.dispatchEventToListeners(Badges.BadgeAction.PERFORMANCE_INSIGHT_CLICKED);
        sinon.assert.calledOnce(handleActionSpy);
    });
    it('calling `deactivate` removes event listeners from the badgeActionEventTarget', () => {
        testBadge.activate();
        badgeActionEventTarget.dispatchEventToListeners(Badges.BadgeAction.PERFORMANCE_INSIGHT_CLICKED);
        sinon.assert.calledOnce(handleActionSpy);
        handleActionSpy.resetHistory();
        testBadge.deactivate();
        badgeActionEventTarget.dispatchEventToListeners(Badges.BadgeAction.PERFORMANCE_INSIGHT_CLICKED);
        sinon.assert.notCalled(handleActionSpy);
    });
    it('events received more than once only calls `dispatchBadgeTriggeredEvent` once', () => {
        testBadge.activate();
        badgeActionEventTarget.dispatchEventToListeners(Badges.BadgeAction.PERFORMANCE_INSIGHT_CLICKED);
        badgeActionEventTarget.dispatchEventToListeners(Badges.BadgeAction.PERFORMANCE_INSIGHT_CLICKED);
        sinon.assert.calledOnce(dispatchBadgeTriggeredEventStub);
    });
});
//# sourceMappingURL=Badge.test.js.map