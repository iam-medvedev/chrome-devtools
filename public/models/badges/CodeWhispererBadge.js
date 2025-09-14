// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { Badge } from './Badge.js';
const CODE_WHISPERER_BADGE_IMAGE_URI = new URL('../../Images/code-whisperer-badge.svg', import.meta.url).toString();
export class CodeWhispererBadge extends Badge {
    name = 'profiles/me/awards/developers.google.com%2Fprofile%2Fbadges%2Factivity%2Fchrome-devtools%2Fcode-whisperer';
    title = 'Code Whisperer';
    imageUri = CODE_WHISPERER_BADGE_IMAGE_URI;
    interestedActions = [
    // TODO(ergunsh): Instrument related actions.
    ];
    handleAction(_action) {
        this.trigger();
    }
}
//# sourceMappingURL=CodeWhispererBadge.js.map