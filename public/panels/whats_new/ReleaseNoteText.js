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
    version: 143,
    header: 'What\'s new in DevTools 143',
    markdownLinks: [
        {
            key: 'mcp-server',
            link: 'https://developer.chrome.com/blog/new-in-devtools-143/#mcp-server',
        },
        {
            key: 'trace-sharing',
            link: 'https://developer.chrome.com/blog/new-in-devtools-143/#trace-sharing',
        },
        {
            key: 'starting-style',
            link: 'https://developer.chrome.com/blog/new-in-devtools-143/#starting-style',
        },
    ],
    videoLinks: [],
    link: 'https://developer.chrome.com/blog/new-in-devtools-143/',
};
//# sourceMappingURL=ReleaseNoteText.js.map