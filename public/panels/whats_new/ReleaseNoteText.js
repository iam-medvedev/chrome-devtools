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
    version: 150,
    header: 'What’s new in DevTools 150',
    markdownLinks: [
        {
            key: 'devtools-for-agents',
            link: 'https://developer.chrome.com/blog/new-in-devtools-149/#devtools-for-agents',
        },
        {
            key: 'ai-assistance',
            link: 'https://developer.chrome.com/blog/new-in-devtools-149/#ai-assistance',
        },
        {
            key: 'css-container-function',
            link: 'https://developer.chrome.com/blog/new-in-devtools-149/#css-container-function',
        }
    ],
    videoLinks: [
        {
            description: 'See all highlights from Chrome 148-150',
            link: 'https://developer.chrome.com/blog/new-in-devtools-150',
            type: "WhatsNew" /* VideoType.WHATS_NEW */,
        },
    ],
    link: 'https://developer.chrome.com/blog/new-in-devtools-150/',
};
//# sourceMappingURL=ReleaseNoteText.js.map