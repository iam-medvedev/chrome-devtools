// Copyright 2024 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as MarkdownView from '../../ui/components/markdown_view/markdown_view.js';
let registeredLinks = false;
export var VideoType;
(function (VideoType) {
    VideoType["WHATS_NEW"] = "WhatsNew";
    VideoType["DEVTOOLS_TIPS"] = "DevtoolsTips";
    VideoType["OTHER"] = "Other";
})(VideoType || (VideoType = {}));
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
    version: 152,
    header: 'What’s new in DevTools 152',
    markdownLinks: [
        {
            key: 'devtools-for-agents',
            link: 'https://developer.chrome.com/blog/new-in-devtools-152/#devtools-for-agents',
        },
        {
            key: 'performance',
            link: 'https://developer.chrome.com/blog/new-in-devtools-152/#performance',
        },
        {
            key: 'nested-selectors',
            link: 'https://developer.chrome.com/blog/new-in-devtools-152/#nested-selectors',
        },
    ],
    videoLinks: [],
    link: 'https://developer.chrome.com/blog/new-in-devtools-152/',
};
//# sourceMappingURL=ReleaseNoteText.js.map