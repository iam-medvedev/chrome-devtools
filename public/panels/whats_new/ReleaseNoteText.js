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
    version: 156,
    header: 'New in DevTools (November 2026)',
    markdownLinks: [
        {
            key: 'mcp',
            link: 'https://developer.chrome.com/blog/new-in-devtools-november-2026/#mcp',
        },
        {
            key: 'sources',
            link: 'https://developer.chrome.com/blog/new-in-devtools-november-2026/#sources',
        },
        {
            key: 'web-install-manifest-diagnosti',
            link: 'https://developer.chrome.com/blog/new-in-devtools-november-2026/#web-install-manifest-diagnosti',
        },
    ],
    videoLinks: [],
    link: 'https://developer.chrome.com/blog/new-in-devtools-november-2026/',
};
//# sourceMappingURL=ReleaseNoteText.js.map