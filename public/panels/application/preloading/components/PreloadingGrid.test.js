// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Platform from '../../../../core/platform/platform.js';
import * as SDK from '../../../../core/sdk/sdk.js';
import { describeWithEnvironment } from '../../../../testing/EnvironmentHelpers.js';
import { createViewFunctionStub } from '../../../../testing/ViewFunctionHelpers.js';
import * as PreloadingComponents from './components.js';
const { urlString } = Platform.DevToolsPath;
async function setupWidget() {
    const view = createViewFunctionStub(PreloadingComponents.PreloadingGrid.PreloadingGrid);
    const widget = new PreloadingComponents.PreloadingGrid.PreloadingGrid(view);
    await view.nextInput;
    return { widget, view };
}
async function assertRenderResult(rowsInput) {
    const { widget, view } = await setupWidget();
    widget.rows = rowsInput.rows;
    widget.pageURL = rowsInput.pageURL;
    await view.nextInput;
    assert.strictEqual(rowsInput.rows, view.input.rows);
    assert.strictEqual(rowsInput.pageURL, view.input.pageURL);
}
describeWithEnvironment('PreloadingGrid', () => {
    it('renders grid', async () => {
        await assertRenderResult({
            rows: [{
                    id: 'id',
                    pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([{
                            action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                            key: {
                                loaderId: 'loaderId:1',
                                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                                url: urlString `https://example.com/prefetched.html`,
                            },
                            pipelineId: 'pipelineId:1',
                            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                            prefetchStatus: null,
                            requestId: 'requestId:1',
                            ruleSetIds: ['ruleSetId:0.1'],
                            nodeIds: [1],
                        }]),
                    ruleSets: [
                        {
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
                    ],
                }],
            pageURL: urlString `https://example.com/`,
        });
    });
    it('renders tag instead of url correctly', async () => {
        await assertRenderResult({
            rows: [{
                    id: 'id',
                    pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([{
                            action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                            key: {
                                loaderId: 'loaderId:1',
                                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                                url: urlString `https://example.com/prefetched.html`,
                            },
                            pipelineId: 'pipelineId:1',
                            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                            prefetchStatus: null,
                            requestId: 'requestId:1',
                            ruleSetIds: ['ruleSetId:0.1'],
                            nodeIds: [1],
                        }]),
                    ruleSets: [{
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
                        }],
                }],
            pageURL: urlString `https://example.com/`,
        });
    });
    it('shows full URL for cross-origin preloading', async () => {
        await assertRenderResult({
            rows: [{
                    id: 'id',
                    pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([{
                            action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                            key: {
                                loaderId: 'loaderId:1',
                                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                                url: urlString `https://cross-origin.example.com/prefetched.html`,
                            },
                            pipelineId: 'pipelineId:1',
                            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                            prefetchStatus: null,
                            requestId: 'requestId:1',
                            ruleSetIds: ['ruleSetId:0.1'],
                            nodeIds: [1],
                        }]),
                    ruleSets: [
                        {
                            id: 'ruleSetId:0.1',
                            loaderId: 'loaderId:1',
                            sourceText: `
{
  "prefetch":[
    {
      "source": "list",
      "urls": ["https://cross-origin.example.com/prefetched.html"]
    }
  ]
}
`,
                        },
                    ],
                }],
            pageURL: urlString `https://example.com/`,
        });
    });
    it('shows filename for out-of-document speculation rules', async () => {
        await assertRenderResult({
            rows: [{
                    id: 'id',
                    pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([{
                            action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                            key: {
                                loaderId: 'loaderId:1',
                                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                                url: urlString `https://example.com/prefetched.html`,
                            },
                            pipelineId: 'pipelineId:1',
                            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                            prefetchStatus: null,
                            requestId: 'requestId:1',
                            ruleSetIds: ['ruleSetId:0.1'],
                            nodeIds: [],
                        }]),
                    ruleSets: [
                        {
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
                    ],
                }],
            pageURL: urlString `https://example.com/`,
        });
    });
    it('shows the only first speculation rules', async () => {
        await assertRenderResult({
            rows: [
                {
                    id: 'id',
                    pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([{
                            action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                            key: {
                                loaderId: 'loaderId:1',
                                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                                url: urlString `https://example.com/rule-set-missing.html`,
                            },
                            pipelineId: 'pipelineId:1',
                            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                            prefetchStatus: null,
                            requestId: 'requestId:1',
                            ruleSetIds: ['ruleSetId:0.1'],
                            nodeIds: [1],
                        }]),
                    ruleSets: [],
                },
                {
                    id: 'id',
                    pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([{
                            action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                            key: {
                                loaderId: 'loaderId:1',
                                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                                url: urlString `https://example.com/multiple-rule-sets.html`,
                            },
                            pipelineId: 'pipelineId:2',
                            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                            prefetchStatus: null,
                            requestId: 'requestId:2',
                            ruleSetIds: ['ruleSetId:0.2', 'ruleSetId:0.3'],
                            nodeIds: [1],
                        }]),
                    ruleSets: [
                        {
                            id: 'ruleSetId:0.2',
                            loaderId: 'loaderId:1',
                            sourceText: `
{
  "prefetch":[
    {
      "source": "list",
      "urls": ["/multiple-rule-sets.html"]
    }
  ]
}
`,
                        },
                        {
                            id: 'ruleSetId:0.3',
                            loaderId: 'loaderId:1',
                            sourceText: `
{
  "prefetch":[
    {
      "source": "list",
      "urls": ["/multiple-rule-sets.html"]
    }
  ]
}
`,
                            url: 'https://example.com/assets/speculation-rules.json',
                        },
                    ],
                },
            ],
            pageURL: urlString `https://example.com/`,
        });
    });
    it('shows composed status for failure', async () => {
        await assertRenderResult({
            rows: [{
                    id: 'id',
                    pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([{
                            action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                            key: {
                                loaderId: 'loaderId:1',
                                action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                                url: urlString `https://example.com/prerendered.html`,
                            },
                            pipelineId: 'pipelineId:1',
                            status: "Failure" /* SDK.PreloadingModel.PreloadingStatus.FAILURE */,
                            prerenderStatus: "MojoBinderPolicy" /* Protocol.Preload.PrerenderFinalStatus.MojoBinderPolicy */,
                            disallowedMojoInterface: 'device.mojom.GamepadMonitor',
                            mismatchedHeaders: null,
                            ruleSetIds: ['ruleSetId:0.1'],
                            nodeIds: [1],
                        }]),
                    ruleSets: [
                        {
                            id: 'ruleSetId:0.1',
                            loaderId: 'loaderId:1',
                            sourceText: `
{
  "prerender":[
    {
      "source": "list",
      "urls": ["/prerendered.html"]
    }
  ]
}
`,
                        },
                    ],
                }],
            pageURL: urlString `https://example.com/`,
        });
    });
    it('shows a warning if a prerender fallbacks to prefetch', async () => {
        await assertRenderResult({
            rows: [{
                    id: 'id',
                    pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([
                        {
                            action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                            key: {
                                loaderId: 'loaderId:1',
                                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                                url: urlString `https://example.com/prerendered.html`,
                            },
                            pipelineId: 'pipelineId:1',
                            status: "Success" /* SDK.PreloadingModel.PreloadingStatus.SUCCESS */,
                            prefetchStatus: "PrefetchResponseUsed" /* Protocol.Preload.PrefetchStatus.PrefetchResponseUsed */,
                            requestId: 'requestId:1',
                            ruleSetIds: ['ruleSetId:0.1'],
                            nodeIds: [1],
                        },
                        {
                            action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                            key: {
                                loaderId: 'loaderId:1',
                                action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                                url: urlString `https://example.com/prerendered.html`,
                            },
                            pipelineId: 'pipelineId:1',
                            status: "Failure" /* SDK.PreloadingModel.PreloadingStatus.FAILURE */,
                            prerenderStatus: "MojoBinderPolicy" /* Protocol.Preload.PrerenderFinalStatus.MojoBinderPolicy */,
                            disallowedMojoInterface: 'device.mojom.GamepadMonitor',
                            mismatchedHeaders: null,
                            ruleSetIds: ['ruleSetId:0.1'],
                            nodeIds: [1],
                        },
                    ]),
                    ruleSets: [
                        {
                            id: 'ruleSetId:0.1',
                            loaderId: 'loaderId:1',
                            sourceText: `
{
  "prerender":[
    {
      "source": "list",
      "urls": ["/prerendered.html"]
    }
  ]
}
`,
                        },
                    ],
                }],
            pageURL: urlString `https://example.com/`,
        });
    });
    it('shows failure if both prefetch and prerender failed', async () => {
        await assertRenderResult({
            rows: [{
                    id: 'id',
                    pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([
                        {
                            action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                            key: {
                                loaderId: 'loaderId:1',
                                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                                url: urlString `https://example.com/prerendered.html`,
                            },
                            pipelineId: 'pipelineId:1',
                            status: "Failure" /* SDK.PreloadingModel.PreloadingStatus.FAILURE */,
                            prefetchStatus: "PrefetchFailedNon2XX" /* Protocol.Preload.PrefetchStatus.PrefetchFailedNon2XX */,
                            requestId: 'requestId:1',
                            ruleSetIds: ['ruleSetId:0.1'],
                            nodeIds: [1],
                        },
                        {
                            action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                            key: {
                                loaderId: 'loaderId:1',
                                action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                                url: urlString `https://example.com/prerendered.html`,
                            },
                            pipelineId: 'pipelineId:1',
                            status: "Failure" /* SDK.PreloadingModel.PreloadingStatus.FAILURE */,
                            prerenderStatus: "PrerenderFailedDuringPrefetch" /* Protocol.Preload.PrerenderFinalStatus.PrerenderFailedDuringPrefetch */,
                            disallowedMojoInterface: null,
                            mismatchedHeaders: null,
                            ruleSetIds: ['ruleSetId:0.1'],
                            nodeIds: [1],
                        },
                    ]),
                    ruleSets: [
                        {
                            id: 'ruleSetId:0.1',
                            loaderId: 'loaderId:1',
                            sourceText: `
{
  "prerender":[
    {
      "source": "list",
      "urls": ["/prerendered.html"]
    }
  ]
}
`,
                        },
                    ],
                }],
            pageURL: urlString `https://example.com/`,
        });
    });
});
//# sourceMappingURL=PreloadingGrid.test.js.map