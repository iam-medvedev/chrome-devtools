// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as MarkdownView from '../../ui/components/markdown_view/markdown_view.js';
let registeredLinks = false;
export function setReleaseNoteForTest(testReleaseNote) {
    releaseNote = testReleaseNote;
}
export function getReleaseNote() {
    if (!registeredLinks) {
        for (const { key, link } of releaseNote.markdownLinks) {
            MarkdownView.MarkdownLinksMap.markdownLinks.set(key, link);
        }
        registeredLinks = true;
    }
    return releaseNote;
}
let releaseNote = {
    version: 79,
    header: 'What\'s new in DevTools 138 Beta',
    markdownLinks: [
        {
            key: 'crbug1',
            link: 'https://issues.chromium.org/issues/420862341',
        },
        {
            key: 'crbug2',
            link: 'https://issues.chromium.org/issues/420862838',
        },
        {
            key: 'crbug3',
            link: 'https://issues.chromium.org/issues/420870269',
        },
    ],
    videoLinks: [
        {
            description: 'See past highlights from Chrome 137',
            link: 'https://developer.chrome.com/blog/new-in-devtools-137',
            type: "WhatsNew" /* VideoType.WHATS_NEW */,
        },
    ],
    link: 'https://issues.chromium.org/hotlists/7004254',
};
//# sourceMappingURL=ReleaseNoteText.js.map