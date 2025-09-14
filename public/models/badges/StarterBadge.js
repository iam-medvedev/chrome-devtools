// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { Badge, BadgeAction } from './Badge.js';
const STARTER_BADGE_IMAGE_URI = new URL('../../Images/devtools-user-badge.svg', import.meta.url).toString();
export class StarterBadge extends Badge {
    isStarterBadge = true;
    name = 'profiles/me/awards/developers.google.com%2Fprofile%2Fbadges%2Factivity%2Fchrome-devtools%2Fchrome-devtools-user';
    title = 'Chrome DevTools User';
    imageUri = STARTER_BADGE_IMAGE_URI;
    // TODO(ergunsh): Add remaining non-trivial event definitions
    interestedActions = [
        BadgeAction.GDP_SIGN_UP_COMPLETE,
        BadgeAction.RECEIVE_BADGES_SETTING_ENABLED,
        BadgeAction.CSS_RULE_MODIFIED,
        BadgeAction.DOM_ELEMENT_OR_ATTRIBUTE_EDITED,
    ];
    handleAction(_action) {
        this.trigger();
    }
}
//# sourceMappingURL=StarterBadge.js.map