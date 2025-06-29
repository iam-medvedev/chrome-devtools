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
    version: 80,
    header: 'What\'s new in DevTools 139',
    markdownLinks: [
        {
            key: 'reliable-devtools',
            link: 'https://developer.chrome.com/blog/new-in-devtools-139/#reliable-devtools',
        },
        {
            key: 'multimodal-input',
            link: 'https://developer.chrome.com/blog/new-in-devtools-139/#multimodal-input',
        },
        {
            key: 'from-elements',
            link: 'https://developer.chrome.com/docs/devtools/ai-assistance/styling#from_the_elements_panel',
        },
        {
            key: 'element-context',
            link: 'https://developer.chrome.com/docs/devtools/ai-assistance/styling#conversation_context',
        },
        {
            key: 'devtools-io',
            link: 'https://developer.chrome.com/blog/new-in-devtools-137',
        },
        {
            key: 'ai-styling',
            link: 'https://developer.chrome.com/blog/new-in-devtools-137#ai-styling',
        },
        {
            key: 'ai-insights',
            link: 'https://developer.chrome.com/blog/new-in-devtools-137#ai-insights',
        },
        {
            key: 'ai-annotations',
            link: 'https://developer.chrome.com/blog/new-in-devtools-137#ai-annotations',
        },
    ],
    videoLinks: [
        {
            description: 'See past highlights from Chrome 138',
            link: 'https://developer.chrome.com/blog/new-in-devtools-138',
            type: "WhatsNew" /* VideoType.WHATS_NEW */,
        },
    ],
    link: 'https://developer.chrome.com/blog/new-in-devtools-139/',
};
//# sourceMappingURL=ReleaseNoteText.js.map