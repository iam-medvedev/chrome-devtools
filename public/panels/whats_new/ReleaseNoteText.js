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
    version: 144,
    header: 'What\'s new in DevTools 144',
    markdownLinks: [
        {
            key: 'request-conditions',
            link: 'https://developer.chrome.com/blog/new-in-devtools-144/#request-conditions',
        },
        {
            key: 'mcp-server',
            link: 'https://developer.chrome.com/blog/new-in-devtools-144/#mcp-server',
        },
        {
            key: 'adopted-stylesheets',
            link: 'https://developer.chrome.com/blog/new-in-devtools-144/#adopted-stylesheets',
        },
    ],
    videoLinks: [
        {
            description: 'See past highlights from Chrome 144',
            link: 'https://developer.chrome.com/blog/new-in-devtools-144',
            type: "WhatsNew" /* VideoType.WHATS_NEW */,
        },
    ],
    link: 'https://developer.chrome.com/blog/new-in-devtools-144/',
};
//# sourceMappingURL=ReleaseNoteText.js.map