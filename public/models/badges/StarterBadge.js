// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { Badge, BadgeAction } from './Badge.js';
export class StarterBadge extends Badge {
    isStarterBadge = true;
    name = 'awards/chrome-devtools-user';
    title = 'Chrome DevTools User';
    // TODO(ergunsh): Add remaining non-trivial event definitions
    interestedActions = [
        BadgeAction.CSS_RULE_MODIFIED,
    ];
    handleAction(_action) {
        this.trigger();
    }
}
//# sourceMappingURL=StarterBadge.js.map