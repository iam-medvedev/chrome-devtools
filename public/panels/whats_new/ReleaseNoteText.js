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
    version: 83,
    header: 'What\'s new in DevTools 142',
    markdownLinks: [
        {
            key: 'perf-ai-agent',
            link: 'https://developer.chrome.com/blog/new-in-devtools-142/#perf-ai-agent',
        },
        {
            key: 'ai-code-completion',
            link: 'https://developer.chrome.com/blog/new-in-devtools-142/#ai-code-completion',
        },
        {
            key: 'gdp',
            link: 'https://developer.chrome.com/blog/new-in-devtools-142/#gdp',
        },
        {
            key: 'ai-main-button',
            link: 'https://developer.chrome.com/blog/new-in-devtools-142/#ai-main-button',
        },
    ],
    videoLinks: [
        {
            description: 'See past highlights from Chrome 141',
            link: 'https://developer.chrome.com/blog/new-in-devtools-141',
            type: "WhatsNew" /* VideoType.WHATS_NEW */,
        },
    ],
    link: 'https://developer.chrome.com/blog/new-in-devtools-142/',
};
//# sourceMappingURL=ReleaseNoteText.js.map