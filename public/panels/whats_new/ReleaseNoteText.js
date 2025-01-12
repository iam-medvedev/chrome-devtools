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
    version: 74,
    header: 'What\'s new in DevTools 133',
    markdownLinks: [
        {
            key: 'persistent-chat-history',
            link: 'https://developer.chrome.com/blog/new-in-devtools-133/#persistent-chat-history',
        },
        {
            key: 'perf-nav',
            link: 'https://developer.chrome.com/blog/new-in-devtools-133/#perf-nav',
        },
        {
            key: 'perf-image-delivery',
            link: 'https://developer.chrome.com/blog/new-in-devtools-133/#perf-image-delivery',
        },
    ],
    videoLinks: [
        {
            description: 'Highlights of updates from Chrome 130-132',
            link: 'https://www.youtube.com/watch?v=kzDUe-f4gac',
            type: "WhatsNew" /* VideoType.WHATS_NEW */,
        },
    ],
    link: 'https://developer.chrome.com/blog/new-in-devtools-133/',
};
//# sourceMappingURL=ReleaseNoteText.js.map