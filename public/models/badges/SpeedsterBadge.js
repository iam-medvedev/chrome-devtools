// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { Badge, BadgeAction } from './Badge.js';
export class SpeedsterBadge extends Badge {
    name = 'awards/speedster';
    title = 'Speedster';
    interestedActions = [BadgeAction.PERFORMANCE_INSIGHT_CLICKED];
    handleAction(_action) {
        this.trigger();
    }
}
//# sourceMappingURL=SpeedsterBadge.js.map