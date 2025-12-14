// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Platform from '../../core/platform/platform.js';
import { assertScreenshot } from '../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import { renderWidgetInVbox, } from '../../testing/TraceHelpers.js';
import * as Coverage from './coverage.js';
const { urlString } = Platform.DevToolsPath;
function makeItem(url, type, size, unusedSize) {
    const usedSize = size - unusedSize;
    return {
        url,
        type,
        size,
        usedSize,
        unusedSize,
        usedPercentage: size > 0 ? usedSize / size : 0,
        unusedPercentage: size > 0 ? unusedSize / size : 0,
        sources: [],
        isContentScript: false,
    };
}
describeWithEnvironment('CoverageListView', () => {
    it('basic rendering', async () => {
        const view = new Coverage.CoverageListView.CoverageListView();
        renderWidgetInVbox(view);
        view.coverageInfo = [
            makeItem(urlString `https://example.com/index.html`, 2 /* Coverage.CoverageModel.CoverageType.JAVA_SCRIPT */, 100, 10),
            makeItem(urlString `https://example.com/index.html?query=foo`, 4 /* Coverage.CoverageModel.CoverageType.JAVA_SCRIPT_PER_FUNCTION */, 100, 0),
            makeItem(urlString `https://example.com/index.html?query=baz`, 1 /* Coverage.CoverageModel.CoverageType.CSS */, 100, 50),
            makeItem(urlString `https://example.com/index.html?query=bar`, 2 /* Coverage.CoverageModel.CoverageType.JAVA_SCRIPT */, 100, 50),
        ];
        await view.updateComplete;
        view.focus();
        await assertScreenshot('coverage/basic.png');
    });
});
//# sourceMappingURL=CoverageListView.test.js.map