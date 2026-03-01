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
    version: 146,
    header: 'What\'s new in DevTools 146',
    markdownLinks: [
        {
            key: 'mcp-server',
            link: 'https://developer.chrome.com/blog/new-in-devtools-146/#mcp-server',
        },
        {
            key: 'console-history',
            link: 'https://developer.chrome.com/blog/new-in-devtools-146/#console-history',
        },
        {
            key: 'adopted-stylesheets',
            link: 'https://developer.chrome.com/blog/new-in-devtools-146/#adopted-stylesheets',
        },
    ],
    videoLinks: [],
    link: 'https://developer.chrome.com/blog/new-in-devtools-146/',
};
//# sourceMappingURL=ReleaseNoteText.js.map