// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
export var BadgeAction;
(function (BadgeAction) {
    BadgeAction["GDP_SIGN_UP_COMPLETE"] = "gdp-sign-up-complete";
    BadgeAction["RECEIVE_BADGES_SETTING_ENABLED"] = "receive-badges-setting-enabled";
    BadgeAction["CSS_RULE_MODIFIED"] = "css-rule-modified";
    BadgeAction["DOM_ELEMENT_OR_ATTRIBUTE_EDITED"] = "dom-element-or-attribute-edited";
    BadgeAction["MODERN_DOM_BADGE_CLICKED"] = "modern-dom-badge-clicked";
    // TODO(ergunsh): Instrument performance insight clicks.
    BadgeAction["PERFORMANCE_INSIGHT_CLICKED"] = "performance-insight-clicked";
})(BadgeAction || (BadgeAction = {}));
export class Badge {
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
        // The event listeners are already registered, we don't re-register them.
        if (this.#eventListeners.length > 0) {
            return;
        }
        this.#eventListeners =
            this.interestedActions.map(actionType => this.#badgeActionEventTarget.addEventListener(actionType, () => {
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
}
//# sourceMappingURL=Badge.js.map