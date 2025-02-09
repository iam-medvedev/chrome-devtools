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
    version: 75,
    header: 'What\'s new in DevTools 134',
    markdownLinks: [
        {
            key: 'privacy-and-security',
            link: 'https://developer.chrome.com/blog/new-in-devtools-134/#privacy-and-security',
        },
        {
            key: 'calibrated-cpu-throttling',
            link: 'https://developer.chrome.com/blog/new-in-devtools-134/#calibrated-cpu-throttling',
        },
        {
            key: 'perf-third-party',
            link: 'https://developer.chrome.com/blog/new-in-devtools-134/#perf-third-party',
        },
    ],
    videoLinks: [
        {
            description: 'See also the highlights from Chrome 130-132',
            link: 'https://www.youtube.com/watch?v=kzDUe-f4gac',
            type: "WhatsNew" /* VideoType.WHATS_NEW */,
        },
    ],
    link: 'https://developer.chrome.com/blog/new-in-devtools-134/',
};
//# sourceMappingURL=ReleaseNoteText.js.map