// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { Badge } from './Badge.js';
const AI_EXPLORER_BADGE_URI = new URL('../../Images/ai-explorer-badge.svg', import.meta.url).toString();
export class AiExplorerBadge extends Badge {
    name = 'profiles/me/awards/developers.google.com%2Fprofile%2Fbadges%2Factivity%2Fchrome-devtools%2Fai-explorer';
    title = 'AI Explorer';
    imageUri = AI_EXPLORER_BADGE_URI;
    interestedActions = [
    // TODO(ergunsh): Instrument related actions.
    ];
    handleAction(_action) {
        this.trigger();
    }
}
//# sourceMappingURL=AiExplorerBadge.js.map