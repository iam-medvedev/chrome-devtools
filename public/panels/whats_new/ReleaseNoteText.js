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
    version: 81,
    header: 'What\'s new in DevTools 140',
    markdownLinks: [
        {
            key: 'ai-insights',
            link: 'https://developer.chrome.com/blog/new-in-devtools-140/#ai-insights',
        },
        {
            key: 'save-data',
            link: 'https://developer.chrome.com/blog/new-in-devtools-140/#save-data',
        },
        {
            key: 'debug-css',
            link: 'https://developer.chrome.com/blog/new-in-devtools-138#debug-css-values',
        },
    ],
    videoLinks: [
        {
            description: 'See past highlights from Chrome 139',
            link: 'https://developer.chrome.com/blog/new-in-devtools-139',
            type: "WhatsNew" /* VideoType.WHATS_NEW */,
        },
    ],
    link: 'https://developer.chrome.com/blog/new-in-devtools-140/',
};
//# sourceMappingURL=ReleaseNoteText.js.map