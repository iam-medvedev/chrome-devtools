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
    version: 148,
    header: 'What\'s new in DevTools 148',
    markdownLinks: [
        {
            key: 'extension-debugging',
            link: 'https://developer.chrome.com/blog/new-in-devtools-148/#extension-debugging',
        },
        {
            key: 'sort-network-requests',
            link: 'https://developer.chrome.com/blog/new-in-devtools-148/#sort-network-requests',
        },
        {
            key: 'accessibility-tree',
            link: 'https://developer.chrome.com/blog/new-in-devtools-148/#accessibility-tree',
        }
    ],
    videoLinks: [],
    link: 'https://developer.chrome.com/blog/new-in-devtools-148/',
};
//# sourceMappingURL=ReleaseNoteText.js.map