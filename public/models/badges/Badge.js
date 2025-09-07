// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
export var BadgeAction;
(function (BadgeAction) {
    BadgeAction["CSS_RULE_MODIFIED"] = "css-rule-modified";
    BadgeAction["PERFORMANCE_INSIGHT_CLICKED"] = "performance-insight-clicked";
})(BadgeAction || (BadgeAction = {}));
export class Badge {
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
        // We don't reactivate a badge that's triggered before.
        if (this.#triggeredBefore) {
            return;
        }
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
    }
}
//# sourceMappingURL=Badge.js.map