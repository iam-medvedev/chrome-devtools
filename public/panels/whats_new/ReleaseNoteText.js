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
    version: 77,
    header: 'What\'s new in DevTools 136',
    markdownLinks: [
        {
            key: 'perf-insights',
            link: 'https://developer.chrome.com/blog/new-in-devtools-136/#perf-insights',
        },
        {
            key: 'click-to-highlight',
            link: 'https://developer.chrome.com/blog/new-in-devtools-136/#click-to-highlight',
        },
        {
            key: 'cookies-filter',
            link: 'https://developer.chrome.com/blog/new-in-devtools-136/#cookies-filter',
        },
    ],
    videoLinks: [
        {
            description: 'See the highlights from Chrome 136',
            link: 'https://developer.chrome.com/blog/new-in-devtools-136',
            type: "WhatsNew" /* VideoType.WHATS_NEW */,
        },
    ],
    link: 'https://developer.chrome.com/blog/new-in-devtools-136/',
};
//# sourceMappingURL=ReleaseNoteText.js.map