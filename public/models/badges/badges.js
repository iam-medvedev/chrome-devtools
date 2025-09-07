// gen/front_end/models/badges/Badge.js
import * as Common from "./../../core/common/common.js";
var BadgeAction;
(function(BadgeAction2) {
  BadgeAction2["CSS_RULE_MODIFIED"] = "css-rule-modified";
  BadgeAction2["PERFORMANCE_INSIGHT_CLICKED"] = "performance-insight-clicked";
})(BadgeAction || (BadgeAction = {}));
var Badge = class {
  #dispatchBadgeTriggeredEvent;
  #badgeActionEventTarget;
  #eventListeners = [];
  #triggeredBefore = false;
  isStarterBadge = false;
  constructor(context) {
    this.#dispatchBadgeTriggeredEvent = context.dispatchBadgeTriggeredEvent;
    this.#badgeActionEventTarget = context.badgeActionEventTarget;
  }
  trigger() {
    if (this.#triggeredBefore) {
      return;
    }
    this.#triggeredBefore = true;
    this.deactivate();
    this.#dispatchBadgeTriggeredEvent(this);
  }
  activate() {
    if (this.#triggeredBefore) {
      return;
    }
    if (this.#eventListeners.length > 0) {
      return;
    }
    this.#eventListeners = this.interestedActions.map((actionType) => this.#badgeActionEventTarget.addEventListener(actionType, () => {
      this.handleAction(actionType);
    }, this));
  }
  deactivate() {
    if (!this.#eventListeners.length) {
      return;
    }
    Common.EventTarget.removeEventListeners(this.#eventListeners);
    this.#eventListeners = [];
  }
};

// gen/front_end/models/badges/SpeedsterBadge.js
var SpeedsterBadge = class extends Badge {
  name = "awards/speedster";
  title = "Speedster";
  interestedActions = [BadgeAction.PERFORMANCE_INSIGHT_CLICKED];
  handleAction(_action) {
    this.trigger();
  }
};

// gen/front_end/models/badges/StarterBadge.js
var StarterBadge = class extends Badge {
  isStarterBadge = true;
  name = "awards/chrome-devtools-user";
  title = "Chrome DevTools User";
  // TODO(ergunsh): Add remaining non-trivial event definitions
  interestedActions = [
    BadgeAction.CSS_RULE_MODIFIED
  ];
  handleAction(_action) {
    this.trigger();
  }
};

// gen/front_end/models/badges/UserBadges.js
import * as Common2 from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
var userBadgesInstance = void 0;
var UserBadges = class _UserBadges extends Common2.ObjectWrapper.ObjectWrapper {
  #badgeActionEventTarget = new Common2.ObjectWrapper.ObjectWrapper();
  #receiveBadgesSetting;
  #allBadges;
  static BADGE_REGISTRY = [
    StarterBadge,
    SpeedsterBadge
  ];
  constructor() {
    super();
    this.#receiveBadgesSetting = Common2.Settings.Settings.instance().moduleSetting("receive-gdp-badges");
    this.#receiveBadgesSetting.addChangeListener(this.#reconcileBadges, this);
    this.#allBadges = _UserBadges.BADGE_REGISTRY.map((badgeCtor) => new badgeCtor({
      dispatchBadgeTriggeredEvent: this.#dispatchBadgeTriggeredEvent.bind(this),
      badgeActionEventTarget: this.#badgeActionEventTarget
    }));
  }
  static instance({ forceNew } = { forceNew: false }) {
    if (!userBadgesInstance || forceNew) {
      userBadgesInstance = new _UserBadges();
    }
    return userBadgesInstance;
  }
  async initialize() {
    return await this.#reconcileBadges();
  }
  recordAction(action) {
    this.#badgeActionEventTarget.dispatchEventToListeners(action);
  }
  #dispatchBadgeTriggeredEvent(badge) {
    this.dispatchEventToListeners("BadgeTriggered", badge);
  }
  #deactivateAllBadges() {
    this.#allBadges.forEach((badge) => {
      badge.deactivate();
    });
  }
  // TODO(ergunsh): Implement starter badge dismissal, snooze count & timestamp checks.
  // TODO(ergunsh): Implement checking for previously awarded badges.
  async #reconcileBadges() {
    const syncInfo = await new Promise((resolve) => Host.InspectorFrontendHost.InspectorFrontendHostInstance.getSyncInformation(resolve));
    if (!syncInfo.accountEmail) {
      this.#deactivateAllBadges();
      return;
    }
    const [gdpProfile, isEligibleToCreateProfile] = await Promise.all([
      Host.GdpClient.GdpClient.instance().getProfile(),
      Host.GdpClient.GdpClient.instance().isEligibleToCreateProfile()
    ]);
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
      } else {
        badge.deactivate();
      }
    }
    this.reconcileBadgesFinishedForTest();
  }
  reconcileBadgesFinishedForTest() {
  }
};
export {
  Badge,
  BadgeAction,
  SpeedsterBadge,
  StarterBadge,
  UserBadges
};
//# sourceMappingURL=badges.js.map
