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
    version: 145,
    header: 'What\'s new in DevTools 145',
    markdownLinks: [
        {
            key: 'soft-navigations',
            link: 'https://developer.chrome.com/blog/new-in-devtools-145/#soft-navigations',
        },
        {
            key: 'render-blocking',
            link: 'https://developer.chrome.com/blog/new-in-devtools-145/#render-blocking',
        },
        {
            key: 'mcp-server',
            link: 'https://developer.chrome.com/blog/new-in-devtools-145/#mcp-server',
        },
    ],
    videoLinks: [
        {
            description: 'See past highlights from Chrome 142-144',
            link: 'https://www.youtube.com/watch?v=2rOeZ98AOb8',
            type: "WhatsNew" /* VideoType.WHATS_NEW */,
        },
    ],
    link: 'https://developer.chrome.com/blog/new-in-devtools-145/',
};
//# sourceMappingURL=ReleaseNoteText.js.map