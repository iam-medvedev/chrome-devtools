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
    version: 78,
    header: 'What\'s new in DevTools 137',
    markdownLinks: [
        {
            key: 'ai-annotations',
            link: 'https://developer.chrome.com/blog/new-in-devtools-137/#ai-annotations',
        },
        {
            key: 'ai-insights',
            link: 'https://developer.chrome.com/blog/new-in-devtools-137/#ai-insights',
        },
        {
            key: 'new-perf-insights',
            link: 'https://developer.chrome.com/blog/new-in-devtools-137/#new-perf-insights',
        },
    ],
    videoLinks: [
        {
            description: 'See the highlights from Chrome 137',
            link: 'https://developer.chrome.com/blog/new-in-devtools-137',
            type: "WhatsNew" /* VideoType.WHATS_NEW */,
        },
    ],
    link: 'https://developer.chrome.com/blog/new-in-devtools-137/',
};
//# sourceMappingURL=ReleaseNoteText.js.map