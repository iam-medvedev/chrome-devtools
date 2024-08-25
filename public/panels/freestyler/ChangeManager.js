// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
export const AI_ASSISTANT_CSS_CLASS_NAME = 'ai-assistant-change';
/**
 * Keeps track of changes done by Freestyler. Currently, it is primarily
 * for stylesheet generation based on all changes.
 */
export class ChangeManager {
    #changes = [];
    addChange(change) {
        this.#changes.push(change);
    }
    buildStyleSheet() {
        return `.${AI_ASSISTANT_CSS_CLASS_NAME} {
${this.#changes
            .map(change => {
            return `  ${change.selector}& {
    ${change.styles}
  }`;
        })
            .join('\n')}
}`;
    }
}
//# sourceMappingURL=ChangeManager.js.map