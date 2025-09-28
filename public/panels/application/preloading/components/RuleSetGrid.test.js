// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Platform from '../../../../core/platform/platform.js';
import { assertGridContents } from '../../../../testing/DataGridHelpers.js';
import { renderElementIntoDOM } from '../../../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../../../testing/EnvironmentHelpers.js';
import * as RenderCoordinator from '../../../../ui/components/render_coordinator/render_coordinator.js';
import * as PreloadingComponents from './components.js';
const { urlString } = Platform.DevToolsPath;
async function assertRenderResult(rowsInput, headerExpected, rowsExpected) {
    const component = new PreloadingComponents.RuleSetGrid.RuleSetGrid();
    component.style.display = 'block';
    component.style.width = '640px';
    component.style.height = '480px';
    component.update(rowsInput);
    renderElementIntoDOM(component);
    await RenderCoordinator.done();
    return assertGridContents(component, headerExpected, rowsExpected);
}
describeWithEnvironment('RuleSetGrid', () => {
    it('renders grid', async () => {
        await assertRenderResult({
            rows: [{
                    ruleSet: {
                        id: 'ruleSetId:0.1',
                        loaderId: 'loaderId:1',
                        sourceText: `
{
  "prefetch":[
    {
      "source": "list",
      "urls": ["/prefetched.html"]
    }
  ]
}
`,
                    },
                    preloadsStatusSummary: '1 Not triggered, 2 Ready, 3 Failure',
                }],
            pageURL: urlString `https://example.com/`,
        }, ['Rule set', 'Status'], [
            ['example.com/', '1 Not triggered, 2 Ready, 3 Failure'],
        ]);
    });
    it('renders tag instead of url correctly', async () => {
        await assertRenderResult({
            rows: [{
                    ruleSet: {
                        id: 'ruleSetId:0.1',
                        loaderId: 'loaderId:1',
                        tag: 'tag1',
                        sourceText: `
{
  "tag": "tag1",
  "prefetch":[
    {
      "source": "list",
      "urls": ["/prefetched.html"]
    }
  ]
}
`,
                    },
                    preloadsStatusSummary: '1 Not triggered, 2 Ready, 3 Failure',
                }],
            pageURL: urlString `https://example.com/`,
        }, ['Rule set', 'Status'], [
            ['\"tag1\"', '1 Not triggered, 2 Ready, 3 Failure'],
        ]);
    });
    it('shows short url for out-of-document speculation rules', async () => {
        await assertRenderResult({
            rows: [{
                    ruleSet: {
                        id: 'ruleSetId:0.1',
                        loaderId: 'loaderId:1',
                        sourceText: `
{
  "prefetch":[
    {
      "source": "list",
      "urls": ["/prefetched.html"]
    }
  ]
}
`,
                        url: 'https://example.com/assets/speculation-rules.json',
                    },
                    preloadsStatusSummary: '1 Not triggered, 2 Ready, 3 Failure',
                }],
            pageURL: urlString `https://example.com/`,
        }, ['Rule set', 'Status'], [
            ['example.com/assets/speculation-rules.json', '1 Not triggered, 2 Ready, 3 Failure'],
        ]);
    });
    it('shows error counts', async () => {
        await assertRenderResult({
            rows: [
                {
                    ruleSet: {
                        id: 'ruleSetId:0.1',
                        loaderId: 'loaderId:1',
                        sourceText: `
{
  "prefetch":[
    {
      "source": "list-typo",
      "urls": ["/prefetched.html"]
    }
  ]
}
`,
                        errorType: "InvalidRulesSkipped" /* Protocol.Preload.RuleSetErrorType.InvalidRulesSkipped */,
                        errorMessage: 'fake error message',
                    },
                    preloadsStatusSummary: '1 Not triggered, 2 Ready, 3 Failure',
                },
                {
                    ruleSet: {
                        id: 'ruleSetId:0.1',
                        loaderId: 'loaderId:1',
                        sourceText: `
{"invalidJson"
`,
                        errorType: "SourceIsNotJsonObject" /* Protocol.Preload.RuleSetErrorType.SourceIsNotJsonObject */,
                        errorMessage: 'fake error message',
                    },
                    preloadsStatusSummary: '',
                },
                {
                    ruleSet: {
                        id: 'ruleSetId:0.2',
                        loaderId: 'loaderId:1',
                        tag: 'マイルール',
                        sourceText: `
{
  "prefetch": [
    {
      "source": "list",
      "urls": ["/prefetched.html"]
    }
  ],
  "tag": "マイルール"
}
`,
                        errorType: "InvalidRulesetLevelTag" /* Protocol.Preload.RuleSetErrorType.InvalidRulesetLevelTag */,
                        errorMessage: 'Tag value is invalid: must be ASCII printable.',
                    },
                    preloadsStatusSummary: '',
                },
            ],
            pageURL: urlString `https://example.com/`,
        }, ['Rule set', 'Status'], [
            ['example.com/', '1 error 1 Not triggered, 2 Ready, 3 Failure'],
            ['example.com/', '1 error'],
            ['example.com/', '1 error'],
        ]);
    });
});
//# sourceMappingURL=RuleSetGrid.test.js.map