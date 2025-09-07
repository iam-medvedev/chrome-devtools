// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import { SpeedsterBadge } from './SpeedsterBadge.js';
import { StarterBadge } from './StarterBadge.js';
let userBadgesInstance = undefined;
export class UserBadges extends Common.ObjectWrapper.ObjectWrapper {
    #badgeActionEventTarget = new Common.ObjectWrapper.ObjectWrapper();
    #receiveBadgesSetting;
    #allBadges;
    static BADGE_REGISTRY = [
        StarterBadge,
        SpeedsterBadge,
    ];
    constructor() {
        super();
        this.#receiveBadgesSetting = Common.Settings.Settings.instance().moduleSetting('receive-gdp-badges');
        this.#receiveBadgesSetting.addChangeListener(this.#reconcileBadges, this);
        this.#allBadges =
            UserBadges.BADGE_REGISTRY.map(badgeCtor => new badgeCtor({
                dispatchBadgeTriggeredEvent: this.#dispatchBadgeTriggeredEvent.bind(this),
                badgeActionEventTarget: this.#badgeActionEventTarget,
            }));
    }
    static instance({ forceNew } = { forceNew: false }) {
        if (!userBadgesInstance || forceNew) {
            userBadgesInstance = new UserBadges();
        }
        return userBadgesInstance;
    }
    async initialize() {
        return await this.#reconcileBadges();
    }
    recordAction(action) {
        // `Common.ObjectWrapper.ObjectWrapper` does not allow passing unions to
        // the `dispatchEventToListeners` and `action` in this case is a union.
        // We want to support listening to specific actions here, that's why we suppress
        // the TypeScript errors. This is safe to do so since every `BadgeAction`
        // is a valid event type and all events are typed as void.
        // @ts-expect-error
        this.#badgeActionEventTarget.dispatchEventToListeners(action);
    }
    #dispatchBadgeTriggeredEvent(badge) {
        this.dispatchEventToListeners("BadgeTriggered" /* Events.BADGE_TRIGGERED */, badge);
    }
    #deactivateAllBadges() {
        this.#allBadges.forEach(badge => {
            badge.deactivate();
        });
    }
    // TODO(ergunsh): Implement starter badge dismissal, snooze count & timestamp checks.
    // TODO(ergunsh): Implement checking for previously awarded badges.
    async #reconcileBadges() {
        const syncInfo = await new Promise(resolve => Host.InspectorFrontendHost.InspectorFrontendHostInstance.getSyncInformation(resolve));
        // If the user is not signed in, do not activate any badges.
        if (!syncInfo.accountEmail) {
            this.#deactivateAllBadges();
            return;
        }
        const [gdpProfile, isEligibleToCreateProfile] = await Promise.all([
            Host.GdpClient.GdpClient.instance().getProfile(),
            Host.GdpClient.GdpClient.instance().isEligibleToCreateProfile(),
        ]);
        // User does not have a GDP profile & not eligible to create one.
        // So, we don't activate any badges for them.
        if (!gdpProfile && !isEligibleToCreateProfile) {
            this.#deactivateAllBadges();
            return;
        }
        const receiveBadgesSettingEnabled = Boolean(this.#receiveBadgesSetting?.get());
        for (const badge of this.#allBadges) {
            const shouldActivateStarterBadge = badge.isStarterBadge && isEligibleToCreateProfile;
            const shouldActivateActivityBasedBadge = !badge.isStarterBadge && Boolean(gdpProfile) && receiveBadgesSettingEnabled;
            if (shouldActivateStarterBadge || shouldActivateActivityBasedBadge) {
                badge.activate();
            }
            else {
                badge.deactivate();
            }
        }
        this.reconcileBadgesFinishedForTest();
    }
    reconcileBadgesFinishedForTest() {
    }
}
//# sourceMappingURL=UserBadges.js.map