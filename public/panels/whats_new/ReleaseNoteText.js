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
    version: 149,
    header: 'What’s new in DevTools 149',
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
            key: 'css-code-completion',
            link: 'https://developer.chrome.com/blog/new-in-devtools-149/#css-code-completion',
        }
    ],
    videoLinks: [],
    link: 'https://developer.chrome.com/blog/new-in-devtools-149/',
};
//# sourceMappingURL=ReleaseNoteText.js.map