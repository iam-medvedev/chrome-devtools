// Copyright 2024 The Chromium Authors
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
    version: 82,
    header: 'What\'s new in DevTools 141',
    markdownLinks: [
        {
            key: 'ai-insight',
            link: 'https://developer.chrome.com/blog/new-in-devtools-141/#ai-insight',
        },
        {
            key: 'ai-chat-export',
            link: 'https://developer.chrome.com/blog/new-in-devtools-141/#ai-chat-export',
        },
        {
            key: 'ipp',
            link: 'https://developer.chrome.com/blog/new-in-devtools-141/#ipp',
        },
    ],
    videoLinks: [
        {
            description: 'See past highlights from Chrome 140',
            link: 'https://developer.chrome.com/blog/new-in-devtools-140',
            type: "WhatsNew" /* VideoType.WHATS_NEW */,
        },
    ],
    link: 'https://developer.chrome.com/blog/new-in-devtools-141/',
};
//# sourceMappingURL=ReleaseNoteText.js.map