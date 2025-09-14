// gen/front_end/models/badges/Badge.js
import * as Common from "./../../core/common/common.js";
var BadgeAction;
(function(BadgeAction2) {
  BadgeAction2["GDP_SIGN_UP_COMPLETE"] = "gdp-sign-up-complete";
  BadgeAction2["RECEIVE_BADGES_SETTING_ENABLED"] = "receive-badges-setting-enabled";
  BadgeAction2["CSS_RULE_MODIFIED"] = "css-rule-modified";
  BadgeAction2["DOM_ELEMENT_OR_ATTRIBUTE_EDITED"] = "dom-element-or-attribute-edited";
  BadgeAction2["MODERN_DOM_BADGE_CLICKED"] = "modern-dom-badge-clicked";
  BadgeAction2["PERFORMANCE_INSIGHT_CLICKED"] = "performance-insight-clicked";
})(BadgeAction || (BadgeAction = {}));
var Badge = class {
  #onTriggerBadge;
  #badgeActionEventTarget;
  #eventListeners = [];
  #triggeredBefore = false;
  isStarterBadge = false;
  constructor(context) {
    this.#onTriggerBadge = context.onTriggerBadge;
    this.#badgeActionEventTarget = context.badgeActionEventTarget;
  }
  trigger() {
    if (this.#triggeredBefore) {
      return;
    }
    this.#triggeredBefore = true;
    this.deactivate();
    this.#onTriggerBadge(this);
  }
  activate() {
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
    this.#triggeredBefore = false;
  }
};

// gen/front_end/models/badges/SpeedsterBadge.js
var SPEEDSTER_BADGE_URI = new URL("../../Images/speedster-badge.svg", import.meta.url).toString();
var SpeedsterBadge = class extends Badge {
  name = "profiles/me/awards/developers.google.com%2Fprofile%2Fbadges%2Factivity%2Fchrome-devtools%2Fspeedster";
  title = "Speedster";
  interestedActions = [
    BadgeAction.PERFORMANCE_INSIGHT_CLICKED
  ];
  imageUri = SPEEDSTER_BADGE_URI;
  handleAction(_action) {
    this.trigger();
  }
};

// gen/front_end/models/badges/StarterBadge.js
var STARTER_BADGE_IMAGE_URI = new URL("../../Images/devtools-user-badge.svg", import.meta.url).toString();
var StarterBadge = class extends Badge {
  isStarterBadge = true;
  name = "profiles/me/awards/developers.google.com%2Fprofile%2Fbadges%2Factivity%2Fchrome-devtools%2Fchrome-devtools-user";
  title = "Chrome DevTools User";
  imageUri = STARTER_BADGE_IMAGE_URI;
  // TODO(ergunsh): Add remaining non-trivial event definitions
  interestedActions = [
    BadgeAction.GDP_SIGN_UP_COMPLETE,
    BadgeAction.RECEIVE_BADGES_SETTING_ENABLED,
    BadgeAction.CSS_RULE_MODIFIED,
    BadgeAction.DOM_ELEMENT_OR_ATTRIBUTE_EDITED
  ];
  handleAction(_action) {
    this.trigger();
  }
};

// gen/front_end/models/badges/UserBadges.js
import * as Common2 from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";

// gen/front_end/models/badges/AiExplorerBadge.js
var AI_EXPLORER_BADGE_URI = new URL("../../Images/ai-explorer-badge.svg", import.meta.url).toString();
var AiExplorerBadge = class extends Badge {
  name = "profiles/me/awards/developers.google.com%2Fprofile%2Fbadges%2Factivity%2Fchrome-devtools%2Fai-explorer";
  title = "AI Explorer";
  imageUri = AI_EXPLORER_BADGE_URI;
  interestedActions = [
    // TODO(ergunsh): Instrument related actions.
  ];
  handleAction(_action) {
    this.trigger();
  }
};

// gen/front_end/models/badges/CodeWhispererBadge.js
var CODE_WHISPERER_BADGE_IMAGE_URI = new URL("../../Images/code-whisperer-badge.svg", import.meta.url).toString();
var CodeWhispererBadge = class extends Badge {
  name = "profiles/me/awards/developers.google.com%2Fprofile%2Fbadges%2Factivity%2Fchrome-devtools%2Fcode-whisperer";
  title = "Code Whisperer";
  imageUri = CODE_WHISPERER_BADGE_IMAGE_URI;
  interestedActions = [
    // TODO(ergunsh): Instrument related actions.
  ];
  handleAction(_action) {
    this.trigger();
  }
};

// gen/front_end/models/badges/DOMDetectiveBadge.js
var DOM_DETECTIVE_BADGE_IMAGE_URI = new URL("../../Images/dom-detective-badge.svg", import.meta.url).toString();
var DOMDetectiveBadge = class extends Badge {
  name = "profiles/me/awards/developers.google.com%2Fprofile%2Fbadges%2Factivity%2Fchrome-devtools%2Fdom-detective";
  title = "DOM Detective";
  imageUri = DOM_DETECTIVE_BADGE_IMAGE_URI;
  interestedActions = [
    BadgeAction.MODERN_DOM_BADGE_CLICKED
  ];
  handleAction(_action) {
    this.trigger();
  }
};

// gen/front_end/models/badges/UserBadges.js
var userBadgesInstance = void 0;
var UserBadges = class _UserBadges extends Common2.ObjectWrapper.ObjectWrapper {
  #badgeActionEventTarget = new Common2.ObjectWrapper.ObjectWrapper();
  #receiveBadgesSetting;
  #allBadges;
  static BADGE_REGISTRY = [
    StarterBadge,
    SpeedsterBadge,
    DOMDetectiveBadge,
    CodeWhispererBadge,
    AiExplorerBadge
  ];
  constructor() {
    super();
    this.#receiveBadgesSetting = Common2.Settings.Settings.instance().moduleSetting("receive-gdp-badges");
    this.#receiveBadgesSetting.addChangeListener(this.#reconcileBadges, this);
    this.#allBadges = _UserBadges.BADGE_REGISTRY.map((badgeCtor) => new badgeCtor({
      onTriggerBadge: this.#onTriggerBadge.bind(this),
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
  async #onTriggerBadge(badge) {
    let shouldAwardBadge = false;
    if (!badge.isStarterBadge) {
      shouldAwardBadge = true;
    } else {
      const gdpProfile = await Host.GdpClient.GdpClient.instance().getProfile();
      const receiveBadgesSettingEnabled = Boolean(this.#receiveBadgesSetting.get());
      if (gdpProfile && receiveBadgesSettingEnabled) {
        shouldAwardBadge = true;
      }
    }
    if (shouldAwardBadge) {
      const result = await Host.GdpClient.GdpClient.instance().createAward({ name: badge.name });
      if (!result) {
        return;
      }
    }
    this.dispatchEventToListeners("BadgeTriggered", badge);
  }
  #deactivateAllBadges() {
    this.#allBadges.forEach((badge) => {
      badge.deactivate();
    });
  }
  // TODO(ergunsh): Implement starter badge dismissal, snooze count & timestamp checks.
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
    let awardedBadgeNames = null;
    if (gdpProfile) {
      awardedBadgeNames = await Host.GdpClient.GdpClient.instance().getAwardedBadgeNames({ names: this.#allBadges.map((badge) => badge.name) });
      if (!awardedBadgeNames) {
        this.#deactivateAllBadges();
        return;
      }
    }
    const receiveBadgesSettingEnabled = Boolean(this.#receiveBadgesSetting.get());
    for (const badge of this.#allBadges) {
      if (awardedBadgeNames?.has(badge.name)) {
        badge.deactivate();
        continue;
      }
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
  isReceiveBadgesSettingEnabled() {
    return Boolean(this.#receiveBadgesSetting.get());
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
