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
    version: 73,
    header: 'What\'s new in DevTools 132',
    markdownLinks: [
        {
            key: 'ai-assistance',
            link: 'https://developer.chrome.com/blog/new-in-devtools-132/#ai-assistance',
        },
        {
            key: 'chat-history',
            link: 'https://developer.chrome.com/blog/new-in-devtools-132/#chat-history',
        },
        {
            key: 'interaction-phases',
            link: 'https://developer.chrome.com/blog/new-in-devtools-132/#interaction-phases',
        },
    ],
    videoLinks: [
        {
            description: 'Highlights from the Chrome 132 update',
            link: 'https://developer.chrome.com/blog/new-in-devtools-132/',
            type: "WhatsNew" /* VideoType.WHATS_NEW */,
        },
    ],
    link: 'https://developer.chrome.com/blog/new-in-devtools-132/',
};
//# sourceMappingURL=ReleaseNoteText.js.map