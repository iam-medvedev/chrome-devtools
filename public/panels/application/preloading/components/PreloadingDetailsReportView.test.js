// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import sinon from 'sinon';
import * as Platform from '../../../../core/platform/platform.js';
import * as SDK from '../../../../core/sdk/sdk.js';
import * as Logs from '../../../../models/logs/logs.js';
import { assertScreenshot, getCleanTextContentFromElements, renderElementIntoDOM, } from '../../../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../../../testing/EnvironmentHelpers.js';
import * as PreloadingComponents from './components.js';
const { urlString } = Platform.DevToolsPath;
const zip2 = (xs, ys) => {
    assert.strictEqual(xs.length, ys.length);
    return Array.from(xs.map((_, i) => [xs[i], ys[i]]));
};
const renderPreloadingDetailsReportView = async (data, renderOptions) => {
    const component = new PreloadingComponents.PreloadingDetailsReportView.PreloadingDetailsReportView();
    component.data = data;
    renderElementIntoDOM(component, renderOptions);
    await component.updateComplete;
    assert.isNotNull(component.contentElement);
    return component;
};
// Note that testing Inspect/Activate buttons requires setup for targets.
// These are tested in test/unittests/front_end/panels/application/preloading/PreloadingView.test.ts.
describeWithEnvironment('PreloadingDetailsReportView', () => {
    it('renders place holder if not selected', async () => {
        const data = null;
        const component = await renderPreloadingDetailsReportView(data);
        assert.isNotNull(component.contentElement);
        const placeholder = component.contentElement.querySelector('.empty-state');
        assert.include(placeholder?.textContent, 'Select an element for more details');
    });
    it('renders prerendering details', async () => {
        const url = urlString `https://example.com/prerendered.html`;
        const data = {
            pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([
                {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId: 'loaderId',
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url,
                        targetHint: undefined,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Success" /* SDK.PreloadingModel.PreloadingStatus.SUCCESS */,
                    prefetchStatus: "PrefetchResponseUsed" /* Protocol.Preload.PrefetchStatus.PrefetchResponseUsed */,
                    requestId: 'requestId:1',
                    ruleSetIds: ['ruleSetId'],
                    nodeIds: [1],
                },
                {
                    action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                    key: {
                        loaderId: 'loaderId',
                        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                        url,
                        targetHint: undefined,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                    prerenderStatus: null,
                    disallowedMojoInterface: null,
                    mismatchedHeaders: null,
                    ruleSetIds: ['ruleSetId'],
                    nodeIds: [1],
                },
            ]),
            ruleSets: [
                {
                    id: 'ruleSetId',
                    loaderId: 'loaderId',
                    sourceText: `
{
  "prefetch": [
    {
      "source": "list",
      "urls": ["/subresource.js"]
    }
  ]
}
`,
                },
            ],
            pageURL: urlString `https://example.com/`,
        };
        const component = await renderPreloadingDetailsReportView(data);
        const report = component.contentElement.querySelector('devtools-report');
        const keys = getCleanTextContentFromElements(report, 'devtools-report-key');
        const values = getCleanTextContentFromElements(report, 'devtools-report-value');
        assert.deepEqual(zip2(keys, values), [
            ['URL', url],
            ['Action', 'Prerender'],
            ['Status', 'Speculative load is running.'],
            ['Rule set', 'example.com/'],
        ]);
    });
    it('renders prerendering details with form submission', async () => {
        const url = urlString `https://example.com/prerendered.html`;
        const data = {
            pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([
                {
                    action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                    key: {
                        loaderId: 'loaderId',
                        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                        url,
                        formSubmission: true,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                    prerenderStatus: null,
                    disallowedMojoInterface: null,
                    mismatchedHeaders: null,
                    ruleSetIds: ['ruleSetId'],
                    nodeIds: [1],
                },
            ]),
            ruleSets: [],
            pageURL: urlString `https://example.com/`,
        };
        const report = await renderPreloadingDetailsReportView(data);
        assert.isTrue(report.contentElement.textContent?.includes('Form submissionYes'));
    });
    it('renders prerendering details with target hint blank', async () => {
        const url = urlString `https://example.com/prerendered.html`;
        const data = {
            pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([
                {
                    action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                    key: {
                        loaderId: 'loaderId',
                        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                        url,
                        targetHint: "Blank" /* Protocol.Preload.SpeculationTargetHint.Blank */,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                    prerenderStatus: null,
                    disallowedMojoInterface: null,
                    mismatchedHeaders: null,
                    ruleSetIds: ['ruleSetId'],
                    nodeIds: [1],
                },
            ]),
            ruleSets: [
                {
                    id: 'ruleSetId',
                    loaderId: 'loaderId',
                    sourceText: `
{
  "prerender": [
    {
      "source": "list",
      "urls": ["prerendered.html"]
    }
  ]
}
`,
                },
            ],
            pageURL: urlString `https://example.com/`,
        };
        const component = await renderPreloadingDetailsReportView(data);
        const report = component.contentElement.querySelector('devtools-report');
        const keys = getCleanTextContentFromElements(report, 'devtools-report-key');
        const values = getCleanTextContentFromElements(report, 'devtools-report-value');
        assert.deepEqual(zip2(keys, values), [
            ['URL', url],
            ['Action', 'Prerender'],
            ['Status', 'Speculative load is running.'],
            ['Target hint', '_blank'],
            ['Rule set', 'example.com/'],
        ]);
    });
    it('renders prerendering details with target hint self', async () => {
        const url = urlString `https://example.com/prerendered.html`;
        const data = {
            pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([
                {
                    action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                    key: {
                        loaderId: 'loaderId',
                        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                        url,
                        targetHint: "Self" /* Protocol.Preload.SpeculationTargetHint.Self */,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                    prerenderStatus: null,
                    disallowedMojoInterface: null,
                    mismatchedHeaders: null,
                    ruleSetIds: ['ruleSetId'],
                    nodeIds: [1],
                },
            ]),
            ruleSets: [
                {
                    id: 'ruleSetId',
                    loaderId: 'loaderId',
                    sourceText: `
{
  "prerender": [
    {
      "source": "list",
      "urls": ["prerendered.html"]
    }
  ]
}
`,
                },
            ],
            pageURL: urlString `https://example.com/`,
        };
        const component = await renderPreloadingDetailsReportView(data);
        const report = component.contentElement.querySelector('devtools-report');
        const keys = getCleanTextContentFromElements(report, 'devtools-report-key');
        const values = getCleanTextContentFromElements(report, 'devtools-report-value');
        assert.deepEqual(zip2(keys, values), [
            ['URL', url],
            ['Action', 'Prerender'],
            ['Status', 'Speculative load is running.'],
            ['Target hint', '_self'],
            ['Rule set', 'example.com/'],
        ]);
    });
    // Prerender2FallbackPrefetchSpecRules disabled case.
    it('doesn\'t render (automatically fell back to prefetch) if prerender alone', async () => {
        const url = urlString `https://example.com/prerendered.html`;
        const data = {
            pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([{
                    action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                    key: {
                        loaderId: 'loaderId',
                        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                        url,
                        targetHint: undefined,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                    prerenderStatus: null,
                    disallowedMojoInterface: null,
                    mismatchedHeaders: null,
                    ruleSetIds: ['ruleSetId'],
                    nodeIds: [1],
                }]),
            ruleSets: [
                {
                    id: 'ruleSetId',
                    loaderId: 'loaderId',
                    sourceText: `
{
  "prefetch": [
    {
      "source": "list",
      "urls": ["/subresource.js"]
    }
  ]
}
`,
                },
            ],
            pageURL: urlString `https://example.com/`,
        };
        const component = await renderPreloadingDetailsReportView(data);
        const report = component.contentElement.querySelector('devtools-report');
        const keys = getCleanTextContentFromElements(report, 'devtools-report-key');
        const values = getCleanTextContentFromElements(report, 'devtools-report-value');
        assert.deepEqual(zip2(keys, values), [
            ['URL', url],
            ['Action', 'Prerender'],
            ['Status', 'Speculative load is running.'],
            ['Rule set', 'example.com/'],
        ]);
    });
    // TODO(https://crbug.com/1317959): Add cancelled reason once
    // finalStatus and disallowedApiMethod added to prerenderStatusUpdated.
    it('renders prerendering details with cancelled reason', async () => {
        const url = urlString `https://example.com/prerendered.html`;
        const data = {
            pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([
                {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId: 'loaderId',
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url,
                        targetHint: undefined,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Success" /* SDK.PreloadingModel.PreloadingStatus.SUCCESS */,
                    prefetchStatus: "PrefetchResponseUsed" /* Protocol.Preload.PrefetchStatus.PrefetchResponseUsed */,
                    requestId: 'requestId:1',
                    ruleSetIds: ['ruleSetId'],
                    nodeIds: [1],
                },
                {
                    action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                    key: {
                        loaderId: 'loaderId',
                        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                        url,
                        targetHint: undefined,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Failure" /* SDK.PreloadingModel.PreloadingStatus.FAILURE */,
                    prerenderStatus: "MojoBinderPolicy" /* Protocol.Preload.PrerenderFinalStatus.MojoBinderPolicy */,
                    disallowedMojoInterface: 'device.mojom.GamepadMonitor',
                    mismatchedHeaders: null,
                    ruleSetIds: ['ruleSetId'],
                    nodeIds: [1],
                },
            ]),
            ruleSets: [
                {
                    id: 'ruleSetId',
                    loaderId: 'loaderId',
                    sourceText: `
{
  "prefetch": [
    {
      "source": "list",
      "urls": ["/subresource.js"]
    }
  ]
}
`,
                },
            ],
            pageURL: urlString `https://example.com/`,
        };
        const component = await renderPreloadingDetailsReportView(data);
        const report = component.contentElement.querySelector('devtools-report');
        const keys = getCleanTextContentFromElements(report, 'devtools-report-key');
        const values = getCleanTextContentFromElements(report, 'devtools-report-value');
        assert.deepEqual(zip2(keys, values), [
            ['URL', url],
            ['Action', 'Prerender (automatically fell back to prefetch)'],
            ['Status', 'Speculative load failed, but fallback to prefetch succeeded.'],
            [
                'Failure reason',
                'The prerendered page used a forbidden JavaScript API that is currently not supported. (Internal Mojo interface: device.mojom.GamepadMonitor)',
            ],
            ['Rule set', 'example.com/'],
        ]);
    });
    it('renders prefetch details with cancelled reason', async () => {
        const fakeRequestResolver = {
            waitFor: (_requestId) => {
                return Promise.reject();
            },
        };
        const url = urlString `https://example.com/prefetch.html`;
        const data = {
            pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([{
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId: 'loaderId',
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url,
                        targetHint: undefined,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Failure" /* SDK.PreloadingModel.PreloadingStatus.FAILURE */,
                    prefetchStatus: "PrefetchFailedNon2XX" /* Protocol.Preload.PrefetchStatus.PrefetchFailedNon2XX */,
                    requestId: 'requestId:1',
                    ruleSetIds: ['ruleSetId'],
                    nodeIds: [1],
                }]),
            ruleSets: [
                {
                    id: 'ruleSetId',
                    loaderId: 'loaderId',
                    sourceText: `
{
  "prefetch": [
    {
      "source": "list",
      "urls": ["/subresource.js"]
    }
  ]
}
`,
                },
            ],
            pageURL: urlString `https://example.com/`,
            requestResolver: fakeRequestResolver,
        };
        const component = await renderPreloadingDetailsReportView(data);
        const report = component.contentElement.querySelector('devtools-report');
        const keys = getCleanTextContentFromElements(report, 'devtools-report-key');
        const values = getCleanTextContentFromElements(report, 'devtools-report-value');
        assert.deepEqual(zip2(keys, values), [
            ['URL', ''],
            ['Action', 'Prefetch'],
            ['Status', 'Speculative load failed.'],
            ['Failure reason', 'The prefetch failed because of a non-2xx HTTP response status code.'],
            ['Rule set', 'example.com/'],
        ]);
    });
    it('renders prefetch details with status code for non-2xx', async () => {
        const fakeRequestResolver = {
            waitFor: (_requestId) => {
                return Promise.reject();
            },
        };
        const requestId = 'requestId:1';
        sinon.stub(Logs.NetworkLog.NetworkLog.instance(), 'requestsForId').withArgs(requestId).returns([
            { statusCode: 404 },
        ]);
        const url = urlString `https://example.com/prefetch.html`;
        const data = {
            pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([{
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId: 'loaderId',
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url,
                        targetHint: undefined,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Failure" /* SDK.PreloadingModel.PreloadingStatus.FAILURE */,
                    prefetchStatus: "PrefetchFailedNon2XX" /* Protocol.Preload.PrefetchStatus.PrefetchFailedNon2XX */,
                    requestId,
                    ruleSetIds: ['ruleSetId'],
                    nodeIds: [1],
                }]),
            ruleSets: [
                {
                    id: 'ruleSetId',
                    loaderId: 'loaderId',
                    sourceText: `
{
  "prefetch": [
    {
      "source": "list",
      "urls": ["/subresource.js"]
    }
  ]
}
`,
                },
            ],
            pageURL: urlString `https://example.com/`,
            requestResolver: fakeRequestResolver,
        };
        const component = await renderPreloadingDetailsReportView(data);
        const report = component.contentElement.querySelector('devtools-report');
        const keys = getCleanTextContentFromElements(report, 'devtools-report-key');
        const values = getCleanTextContentFromElements(report, 'devtools-report-value');
        assert.deepEqual(zip2(keys, values), [
            ['URL', ''],
            ['Action', 'Prefetch'],
            ['Status', 'Speculative load failed.'],
            ['Failure reason', 'The prefetch failed because of a non-2xx HTTP response status code (404).'],
            ['Rule set', 'example.com/'],
        ]);
    });
    it('renders prerender details with status code for non-2xx', async () => {
        const url = urlString `https://example.com/prerendered.html`;
        const fakeRequest = { statusCode: 404 };
        const fakeNetworkManager = { requestForLoaderId: () => fakeRequest };
        const fakeFrame = {
            loaderId: 'loaderId',
            resourceTreeModel: () => ({
                target: () => ({
                    model: () => fakeNetworkManager,
                }),
            }),
        };
        sinon.stub(SDK.ResourceTreeModel.ResourceTreeModel, 'frames').returns([fakeFrame]);
        const data = {
            pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([{
                    action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                    key: {
                        loaderId: 'loaderId',
                        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                        url,
                        targetHint: undefined,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Failure" /* SDK.PreloadingModel.PreloadingStatus.FAILURE */,
                    prerenderStatus: "NavigationBadHttpStatus" /* Protocol.Preload.PrerenderFinalStatus.NavigationBadHttpStatus */,
                    disallowedMojoInterface: null,
                    mismatchedHeaders: null,
                    ruleSetIds: ['ruleSetId'],
                    nodeIds: [1],
                }]),
            ruleSets: [
                {
                    id: 'ruleSetId',
                    loaderId: 'loaderId',
                    sourceText: `
{
  "prerender": [
    {
      "source": "list",
      "urls": ["/prerendered.html"]
    }
  ]
}
`,
                },
            ],
            pageURL: urlString `https://example.com/`,
        };
        const component = await renderPreloadingDetailsReportView(data);
        const report = component.contentElement.querySelector('devtools-report');
        const keys = getCleanTextContentFromElements(report, 'devtools-report-key');
        const values = getCleanTextContentFromElements(report, 'devtools-report-value');
        assert.deepEqual(zip2(keys, values), [
            ['URL', url],
            ['Action', 'Prerender'],
            ['Status', 'Speculative load failed.'],
            ['Failure reason', 'The prerendering navigation failed because of a non-2xx HTTP response status code (404).'],
            ['Rule set', 'example.com/'],
        ]);
    });
    it('renders prefetch details with out-of-document Speculation Rules', async () => {
        const fakeRequestResolver = {
            waitFor: (_requestId) => {
                return Promise.reject();
            },
        };
        const url = urlString `https://example.com/prefetch.html`;
        const data = {
            pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([{
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId: 'loaderId',
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url,
                        targetHint: undefined,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Ready" /* SDK.PreloadingModel.PreloadingStatus.READY */,
                    prefetchStatus: null,
                    requestId: 'requestId:1',
                    ruleSetIds: ['ruleSetId'],
                    nodeIds: [1],
                }]),
            ruleSets: [
                {
                    id: 'ruleSetId',
                    loaderId: 'loaderId',
                    sourceText: `
{
  "prefetch": [
    {
      "source": "list",
      "urls": ["/subresource.js"]
    }
  ]
}
`,
                    url: 'https://example.com/speculation-rules.json',
                },
            ],
            pageURL: urlString `https://example.com/`,
            requestResolver: fakeRequestResolver,
        };
        const component = await renderPreloadingDetailsReportView(data);
        const report = component.contentElement.querySelector('devtools-report');
        const keys = getCleanTextContentFromElements(report, 'devtools-report-key');
        const values = getCleanTextContentFromElements(report, 'devtools-report-value');
        assert.deepEqual(zip2(keys, values), [
            ['URL', ''],
            ['Action', 'Prefetch'],
            ['Status', 'Speculative load finished and the result is ready for the next navigation.'],
            ['Rule set', 'example.com/speculation-rules.json'],
        ]);
    });
    it('renders non triggered prefetch details without request link icon', async () => {
        const fakeRequestResolver = {
            waitFor: (_requestId) => {
                return Promise.reject();
            },
        };
        const url = urlString `https://example.com/prefetch.html`;
        const data = {
            pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([{
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId: 'loaderId',
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url,
                        targetHint: undefined,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "NotTriggered" /* SDK.PreloadingModel.PreloadingStatus.NOT_TRIGGERED */,
                    prefetchStatus: "PrefetchNotStarted" /* Protocol.Preload.PrefetchStatus.PrefetchNotStarted */,
                    requestId: 'requestId:1',
                    ruleSetIds: ['ruleSetId'],
                    nodeIds: [1],
                }]),
            ruleSets: [
                {
                    id: 'ruleSetId',
                    loaderId: 'loaderId',
                    sourceText: `
{
  "prefetch": [
    {
      "source": "list",
      "urls": ["/subresource.js"]
    }
  ]
}
`,
                },
            ],
            pageURL: urlString `https://example.com/`,
            requestResolver: fakeRequestResolver,
        };
        const component = await renderPreloadingDetailsReportView(data);
        const report = component.contentElement.querySelector('devtools-report');
        const keys = getCleanTextContentFromElements(report, 'devtools-report-key');
        const values = getCleanTextContentFromElements(report, 'devtools-report-value');
        const requestLinkIcon = report.querySelector('devtools-request-link-icon');
        assert.deepEqual(zip2(keys, values), [
            ['URL', url],
            ['Action', 'Prefetch'],
            ['Status', 'Speculative load attempt is not yet triggered.'],
            ['Rule set', 'example.com/'],
        ]);
        assert.isNull(requestLinkIcon);
    });
    it('renders prerender-until-script details', async () => {
        const url = urlString `https://example.com/prerendered.html`;
        const data = {
            pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([
                {
                    action: "PrerenderUntilScript" /* Protocol.Preload.SpeculationAction.PrerenderUntilScript */,
                    key: {
                        loaderId: 'loaderId',
                        action: "PrerenderUntilScript" /* Protocol.Preload.SpeculationAction.PrerenderUntilScript */,
                        url,
                        targetHint: undefined,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                    prerenderStatus: null,
                    disallowedMojoInterface: null,
                    mismatchedHeaders: null,
                    ruleSetIds: ['ruleSetId'],
                    nodeIds: [1],
                },
            ]),
            ruleSets: [
                {
                    id: 'ruleSetId',
                    loaderId: 'loaderId',
                    sourceText: `
{
  "prerender_until_script": [
    {
      "source": "list",
      "urls": ["/prerendered.html"],
      "until": "script"
    }
  ]
}
`,
                },
            ],
            pageURL: urlString `https://example.com/`,
        };
        const component = await renderPreloadingDetailsReportView(data);
        const report = component.contentElement.querySelector('devtools-report');
        const keys = getCleanTextContentFromElements(report, 'devtools-report-key');
        const values = getCleanTextContentFromElements(report, 'devtools-report-value');
        assert.deepEqual(zip2(keys, values), [
            ['URL', url],
            ['Action', 'Prerender until script'],
            ['Status', 'Speculative load is running.'],
            ['Rule set', 'example.com/'],
        ]);
    });
    it('renders a screenshot of prerendering details', async () => {
        const url = urlString `https://example.com/prerendered.html`;
        const data = {
            pipeline: SDK.PreloadingModel.PreloadPipeline.newFromAttemptsForTesting([
                {
                    action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                    key: {
                        loaderId: 'loaderId',
                        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                        url,
                        targetHint: undefined,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                    prerenderStatus: null,
                    disallowedMojoInterface: null,
                    mismatchedHeaders: null,
                    ruleSetIds: ['ruleSetId'],
                    nodeIds: [1],
                },
            ]),
            ruleSets: [
                {
                    id: 'ruleSetId',
                    loaderId: 'loaderId',
                    sourceText: `
{
  "prerender": [
    {
      "source": "list",
      "urls": ["prerendered.html"]
    }
  ]
}
`,
                },
            ],
            pageURL: urlString `https://example.com/`,
        };
        await renderPreloadingDetailsReportView(data, { includeCommonStyles: true });
        await assertScreenshot('preloading/details_report.png');
    });
});
//# sourceMappingURL=PreloadingDetailsReportView.test.js.map