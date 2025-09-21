// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as Badges from '../../models/badges/badges.js';
import { renderElementIntoDOM, } from '../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import { createViewFunctionStub } from '../../testing/ViewFunctionHelpers.js';
import * as PanelCommon from './common.js';
class TestBadge extends Badges.Badge {
    name = 'testBadge';
    title = 'title';
    imageUri = 'image-uri';
    interestedActions = [];
    handleAction() {
        throw new Error('Method not implemented.');
    }
}
class TestStarterBadge extends Badges.Badge {
    name = 'testStarterBadge';
    title = 'starterBadgeTitle';
    imageUri = 'starter-badge-image-uri';
    isStarterBadge = true;
    interestedActions = [];
    handleAction() {
        throw new Error('Method not implemented.');
    }
}
function createMockBadge(badgeCtor) {
    return new badgeCtor({
        onTriggerBadge: () => { },
        badgeActionEventTarget: new Common.ObjectWrapper.ObjectWrapper(),
    });
}
function assertMessageIncludes(messageInput, textToInclude) {
    let actualText;
    if (messageInput instanceof HTMLElement) {
        actualText = messageInput.textContent;
    }
    else {
        actualText = messageInput;
    }
    assert.include(actualText, textToInclude);
}
describeWithEnvironment('BadgeNotification', () => {
    async function createWidget(properties) {
        const view = createViewFunctionStub(PanelCommon.BadgeNotification);
        const widget = new PanelCommon.BadgeNotification(undefined, view);
        widget.message = properties?.message ?? 'Test message';
        widget.imageUri = properties?.imageUri ?? 'test.png';
        widget.actions = properties?.actions ?? [];
        renderElementIntoDOM(widget, { allowMultipleChildren: true });
        widget.requestUpdate();
        await view.nextInput;
        return { view, widget };
    }
    it('invokes action callback on click', async () => {
        const action1Spy = sinon.spy();
        const { view, widget } = await createWidget({ actions: [{ label: 'Action 1', onClick: action1Spy }] });
        view.input.actions[0].onClick();
        sinon.assert.calledOnce(action1Spy);
        widget.detach();
    });
    it('is removed on close click', async () => {
        const { view, widget } = await createWidget();
        assert.isTrue(document.body.contains(widget.element));
        view.input.onDismissClick();
        assert.isFalse(document.body.contains(widget.element));
        widget.detach();
    });
    it('presents an activity-based badge', async () => {
        const { view, widget } = await createWidget();
        const badge = createMockBadge(TestBadge);
        await widget.present(badge);
        const input = await view.nextInput;
        assert.strictEqual(input.imageUri, badge.imageUri);
        assert.lengthOf(input.actions, 2);
        assert.strictEqual(input.actions[0].label, 'Manage settings');
        assert.strictEqual(input.actions[1].label, 'View profile');
        assertMessageIncludes(input.message, 'It’s been added to your Developer Profile.');
        widget.detach();
    });
    it('presents a starter badge as an activity-based badge if the user has a profile and has enabled badges', async () => {
        sinon.stub(Host.GdpClient.GdpClient.instance(), 'getProfile').resolves({});
        sinon.stub(Badges.UserBadges.instance(), 'isReceiveBadgesSettingEnabled').returns(true);
        const { view, widget } = await createWidget();
        const badge = createMockBadge(TestStarterBadge);
        await widget.present(badge);
        const input = await view.nextInput;
        // Should fall back to the activity-based badge flow.
        assert.strictEqual(input.imageUri, 'starter-badge-image-uri');
        assert.lengthOf(input.actions, 2);
        assert.strictEqual(input.actions[0].label, 'Manage settings');
        assert.strictEqual(input.actions[1].label, 'View profile');
        assertMessageIncludes(input.message, 'It’s been added to your Developer Profile.');
        widget.detach();
    });
    it('presents a starter badge with an opt-in message if the user has a profile but has disabled badges', async () => {
        sinon.stub(Host.GdpClient.GdpClient.instance(), 'getProfile').resolves({});
        sinon.stub(Badges.UserBadges.instance(), 'isReceiveBadgesSettingEnabled').returns(false);
        const { view, widget } = await createWidget();
        const badge = createMockBadge(TestStarterBadge);
        await widget.present(badge);
        const input = await view.nextInput;
        assert.strictEqual(input.imageUri, badge.imageUri);
        assert.lengthOf(input.actions, 2);
        assert.strictEqual(input.actions[0].label, 'Remind me later');
        assert.strictEqual(input.actions[1].label, 'Turn on badges');
        assertMessageIncludes(input.message, 'Turn on badges to claim it.');
        widget.detach();
    });
    it('presents a starter badge with a create profile message if the user does not have a profile', async () => {
        sinon.stub(Host.GdpClient.GdpClient.instance(), 'getProfile').resolves(null);
        const { view, widget } = await createWidget();
        const badge = createMockBadge(TestStarterBadge);
        await widget.present(badge);
        const input = await view.nextInput;
        assert.strictEqual(input.imageUri, badge.imageUri);
        assert.lengthOf(input.actions, 2);
        assert.strictEqual(input.actions[0].label, 'Remind me later');
        assert.strictEqual(input.actions[1].label, 'Create profile');
        assertMessageIncludes(input.message, 'Create a profile to claim your badge.');
        widget.detach();
    });
    describe('dismissing', () => {
        it('a starter badge notification calls `dismissStarterBadge`', async () => {
            const dismissStarterBadgeSpy = sinon.spy(Badges.UserBadges.instance(), 'dismissStarterBadge');
            const { view, widget } = await createWidget();
            const badge = createMockBadge(TestStarterBadge);
            await widget.present(badge);
            await view.nextInput;
            view.input.onDismissClick();
            sinon.assert.calledOnce(dismissStarterBadgeSpy);
            assert.isFalse(document.body.contains(widget.element));
            widget.detach();
        });
        it('a non-starter badge notification does not call `dismissStarterBadge`', async () => {
            const dismissStarterBadgeSpy = sinon.spy(Badges.UserBadges.instance(), 'dismissStarterBadge');
            const { view, widget } = await createWidget();
            const badge = createMockBadge(TestBadge);
            await widget.present(badge);
            await view.nextInput;
            view.input.onDismissClick();
            sinon.assert.notCalled(dismissStarterBadgeSpy);
            assert.isFalse(document.body.contains(widget.element));
            widget.detach();
        });
    });
    describe('auto-closing', () => {
        let clock;
        beforeEach(() => {
            clock = sinon.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
        });
        afterEach(() => {
            clock.restore();
        });
        it('a starter badge notification calls `snoozeStarterBadge`', async () => {
            const snoozeStarterBadgeSpy = sinon.spy(Badges.UserBadges.instance(), 'snoozeStarterBadge');
            const { widget } = await createWidget();
            const badge = createMockBadge(TestStarterBadge);
            await widget.present(badge);
            await clock.tickAsync(30000);
            sinon.assert.calledOnce(snoozeStarterBadgeSpy);
            assert.isFalse(document.body.contains(widget.element));
        });
        it('a non-starter badge notification does not call `snoozeStarterBadge`', async () => {
            const snoozeStarterBadgeSpy = sinon.spy(Badges.UserBadges.instance(), 'snoozeStarterBadge');
            const { widget } = await createWidget();
            const badge = createMockBadge(TestBadge);
            await widget.present(badge);
            await clock.tickAsync(30000);
            sinon.assert.notCalled(snoozeStarterBadgeSpy);
            assert.isFalse(document.body.contains(widget.element));
        });
        it('is cancelled if the widget is detached manually', async () => {
            const snoozeStarterBadgeSpy = sinon.spy(Badges.UserBadges.instance(), 'snoozeStarterBadge');
            const { widget } = await createWidget();
            const badge = createMockBadge(TestStarterBadge);
            await widget.present(badge);
            widget.detach();
            await clock.tickAsync(30000);
            sinon.assert.notCalled(snoozeStarterBadgeSpy);
        });
    });
    it('snoozes the badge when "Remind me later" is clicked', async () => {
        sinon.stub(Host.GdpClient.GdpClient.instance(), 'getProfile').resolves(null);
        const snoozeStarterBadgeSpy = sinon.spy(Badges.UserBadges.instance(), 'snoozeStarterBadge');
        const { view, widget } = await createWidget();
        const badge = createMockBadge(TestStarterBadge);
        await widget.present(badge);
        const input = await view.nextInput;
        const remindMeLaterAction = input.actions.find(action => action.label === 'Remind me later');
        remindMeLaterAction.onClick();
        sinon.assert.calledOnce(snoozeStarterBadgeSpy);
        assert.isFalse(document.body.contains(widget.element));
    });
});
//# sourceMappingURL=BadgeNotification.test.js.map