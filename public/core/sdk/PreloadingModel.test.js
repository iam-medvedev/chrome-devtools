// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection, dispatchEvent, } from '../../testing/MockConnection.js';
import { getMainFrame, navigate } from '../../testing/ResourceTreeHelpers.js';
import * as Platform from '../platform/platform.js';
import * as SDK from './sdk.js';
const { urlString } = Platform.DevToolsPath;
describeWithMockConnection('PreloadingModel', () => {
    it('adds and deletes rule sets and preloading attempts', async () => {
        const target = createTarget();
        const model = target.model(SDK.PreloadingModel.PreloadingModel);
        assert.exists(model);
        assert.deepEqual(model.getAllRuleSets(), []);
        const loaderId = getMainFrame(target).loaderId;
        dispatchEvent(target, 'Preload.ruleSetUpdated', {
            ruleSet: {
                id: 'ruleSetId:1',
                loaderId,
                sourceText: `
{
  "prefetch":[
    {
      "source": "list",
      "urls": ["/subresource.js"]
    }
  ]
}
`,
            },
        });
        dispatchEvent(target, 'Preload.preloadingAttemptSourcesUpdated', {
            loaderId,
            preloadingAttemptSources: [
                {
                    key: {
                        loaderId,
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource.js',
                    },
                    ruleSetIds: ['ruleSetId:1'],
                    nodeIds: [1],
                },
            ],
        });
        dispatchEvent(target, 'Preload.prefetchStatusUpdated', {
            key: {
                loaderId,
                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                url: 'https://example.com/subresource.js',
            },
            pipelineId: 'pipelineId:1',
            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
            requestId: 'requestId:1',
        });
        assert.deepEqual(model.getAllRuleSets(), [
            {
                id: 'ruleSetId:1',
                value: {
                    id: 'ruleSetId:1',
                    loaderId,
                    sourceText: `
{
  "prefetch":[
    {
      "source": "list",
      "urls": ["/subresource.js"]
    }
  ]
}
`,
                },
            },
        ]);
        assert.deepEqual(model.getRepresentativePreloadingAttempts(null), [
            {
                id: `${loaderId}:Prefetch:https://example.com/subresource.js:undefined`,
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId,
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: urlString `https://example.com/subresource.js`,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                    prefetchStatus: null,
                    requestId: 'requestId:1',
                    ruleSetIds: ['ruleSetId:1'],
                    nodeIds: [1],
                },
            },
        ]);
        dispatchEvent(target, 'Preload.ruleSetUpdated', {
            ruleSet: {
                id: 'ruleSetId:2',
                loaderId,
                sourceText: `
{
  "prerender":[
    {
      "source": "list",
      "urls": ["/page.html"]
    }
  ]
}
`,
            },
        });
        dispatchEvent(target, 'Preload.preloadingAttemptSourcesUpdated', {
            loaderId,
            preloadingAttemptSources: [
                {
                    key: {
                        loaderId,
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource.js',
                    },
                    ruleSetIds: ['ruleSetId:1'],
                    nodeIds: [1],
                },
                {
                    key: {
                        loaderId,
                        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                        url: 'https://example.com/page.html',
                    },
                    ruleSetIds: ['ruleSetId:2'],
                    nodeIds: [2],
                },
            ],
        });
        dispatchEvent(target, 'Preload.prerenderStatusUpdated', {
            key: {
                loaderId,
                action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                url: 'https://example.com/page.html',
            },
            pipelineId: 'pipelineId:2',
            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
        });
        assert.deepEqual(model.getAllRuleSets(), [
            {
                id: 'ruleSetId:1',
                value: {
                    id: 'ruleSetId:1',
                    loaderId,
                    sourceText: `
{
  "prefetch":[
    {
      "source": "list",
      "urls": ["/subresource.js"]
    }
  ]
}
`,
                },
            },
            {
                id: 'ruleSetId:2',
                value: {
                    id: 'ruleSetId:2',
                    loaderId,
                    sourceText: `
{
  "prerender":[
    {
      "source": "list",
      "urls": ["/page.html"]
    }
  ]
}
`,
                },
            },
        ]);
        assert.deepEqual(model.getRepresentativePreloadingAttempts(null), [
            {
                id: `${loaderId}:Prefetch:https://example.com/subresource.js:undefined`,
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId,
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: urlString `https://example.com/subresource.js`,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                    prefetchStatus: null,
                    requestId: 'requestId:1',
                    ruleSetIds: ['ruleSetId:1'],
                    nodeIds: [1],
                },
            },
            {
                id: `${loaderId}:Prerender:https://example.com/page.html:undefined`,
                value: {
                    action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                    key: {
                        loaderId,
                        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                        url: urlString `https://example.com/page.html`,
                    },
                    pipelineId: 'pipelineId:2',
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                    prerenderStatus: null,
                    disallowedMojoInterface: null,
                    mismatchedHeaders: null,
                    ruleSetIds: ['ruleSetId:2'],
                    nodeIds: [2],
                },
            },
        ]);
        dispatchEvent(target, 'Preload.ruleSetRemoved', {
            id: 'ruleSetId:1',
        });
        dispatchEvent(target, 'Preload.preloadingAttemptSourcesUpdated', {
            loaderId,
            preloadingAttemptSources: [
                {
                    key: {
                        loaderId,
                        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                        url: 'https://example.com/page.html',
                    },
                    ruleSetIds: ['ruleSetId:2'],
                    nodeIds: [2],
                },
            ],
        });
        dispatchEvent(target, 'Preload.prefetchStatusUpdated', {
            key: {
                loaderId,
                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                url: 'https://example.com/subresource.js',
            },
            pipelineId: 'pipelineId:1',
            status: "Failure" /* SDK.PreloadingModel.PreloadingStatus.FAILURE */,
            prefetchStatus: "PrefetchEvictedAfterCandidateRemoved" /* Protocol.Preload.PrefetchStatus.PrefetchEvictedAfterCandidateRemoved */,
            requestId: 'requestId:1',
        });
        assert.deepEqual(model.getAllRuleSets(), [
            {
                id: 'ruleSetId:2',
                value: {
                    id: 'ruleSetId:2',
                    loaderId,
                    sourceText: `
{
  "prerender":[
    {
      "source": "list",
      "urls": ["/page.html"]
    }
  ]
}
`,
                },
            },
        ]);
        assert.deepEqual(model.getRepresentativePreloadingAttempts(null), [
            {
                id: `${loaderId}:Prerender:https://example.com/page.html:undefined`,
                value: {
                    action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                    key: {
                        loaderId,
                        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                        url: urlString `https://example.com/page.html`,
                    },
                    pipelineId: 'pipelineId:2',
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                    prerenderStatus: null,
                    disallowedMojoInterface: null,
                    mismatchedHeaders: null,
                    ruleSetIds: ['ruleSetId:2'],
                    nodeIds: [2],
                },
            },
        ]);
    });
    it('registers preloading attempt with status NotTriggered', async () => {
        const target = createTarget();
        const model = target.model(SDK.PreloadingModel.PreloadingModel);
        assert.exists(model);
        assert.deepEqual(model.getAllRuleSets(), []);
        const loaderId = getMainFrame(target).loaderId;
        dispatchEvent(target, 'Preload.ruleSetUpdated', {
            ruleSet: {
                id: 'ruleSetId:1',
                loaderId,
                sourceText: `
{
  "prefetch":[
    {
      "source": "list",
      "urls": ["/subresource.js"]
    }
  ]
}
`,
            },
        });
        dispatchEvent(target, 'Preload.preloadingAttemptSourcesUpdated', {
            loaderId,
            preloadingAttemptSources: [
                {
                    key: {
                        loaderId,
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource.js',
                    },
                    ruleSetIds: ['ruleSetId:1'],
                    nodeIds: [1],
                },
            ],
        });
        assert.deepEqual(model.getRepresentativePreloadingAttempts(null), [
            {
                id: `${loaderId}:Prefetch:https://example.com/subresource.js:undefined`,
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId,
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: urlString `https://example.com/subresource.js`,
                    },
                    pipelineId: null,
                    status: "NotTriggered" /* SDK.PreloadingModel.PreloadingStatus.NOT_TRIGGERED */,
                    prefetchStatus: null,
                    // Invalid request id
                    requestId: '',
                    ruleSetIds: ['ruleSetId:1'],
                    nodeIds: [1],
                },
            },
        ]);
    });
    it('clears rule sets and preloading attempts for previous pages', async () => {
        const target = createTarget();
        const model = target.model(SDK.PreloadingModel.PreloadingModel);
        assert.exists(model);
        assert.deepEqual(model.getAllRuleSets(), []);
        assert.deepEqual(model.getRepresentativePreloadingAttempts(null), []);
        let loaderId = getMainFrame(target).loaderId;
        dispatchEvent(target, 'Preload.ruleSetUpdated', {
            ruleSet: {
                id: 'ruleSetId:1',
                loaderId,
                sourceText: `
{
  "prefetch": [
    {
      "source": "list",
      "urls": ["/subresource1.js"]
    }
  ]
}
`,
            },
        });
        dispatchEvent(target, 'Preload.preloadingAttemptSourcesUpdated', {
            loaderId,
            preloadingAttemptSources: [
                {
                    key: {
                        loaderId,
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource1.js',
                    },
                    ruleSetIds: ['ruleSetId:1'],
                    nodeIds: [1],
                },
            ],
        });
        dispatchEvent(target, 'Preload.prefetchStatusUpdated', {
            key: {
                loaderId,
                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                url: 'https://example.com/subresource1.js',
            },
            pipelineId: 'pipelineId:1',
            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
        });
        loaderId = 'loaderId:2';
        navigate(getMainFrame(target), { loaderId });
        dispatchEvent(target, 'Preload.ruleSetUpdated', {
            ruleSet: {
                id: 'ruleSetId:2',
                loaderId,
                sourceText: `
{
  "prefetch": [
    {
      "source": "list",
      "urls": ["/subresource2.js"]
    }
  ]
}
`,
            },
        });
        dispatchEvent(target, 'Preload.preloadingAttemptSourcesUpdated', {
            loaderId,
            preloadingAttemptSources: [
                {
                    key: {
                        loaderId,
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource2.js',
                    },
                    ruleSetIds: ['ruleSetId:2'],
                    nodeIds: [2],
                },
            ],
        });
        dispatchEvent(target, 'Preload.prefetchStatusUpdated', {
            key: {
                loaderId,
                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                url: 'https://example.com/subresource2.js',
            },
            pipelineId: 'pipelineId:1',
            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
            requestId: 'requestId:1',
        });
        assert.deepEqual(model.getAllRuleSets(), [
            {
                id: 'ruleSetId:2',
                value: {
                    id: 'ruleSetId:2',
                    loaderId,
                    sourceText: `
{
  "prefetch": [
    {
      "source": "list",
      "urls": ["/subresource2.js"]
    }
  ]
}
`,
                },
            },
        ]);
        assert.deepEqual(model.getRepresentativePreloadingAttempts(null), [
            {
                id: `${loaderId}:Prefetch:https://example.com/subresource2.js:undefined`,
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId,
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: urlString `https://example.com/subresource2.js`,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                    prefetchStatus: null,
                    requestId: 'requestId:1',
                    ruleSetIds: ['ruleSetId:2'],
                    nodeIds: [2],
                },
            },
        ]);
    });
    it('filters preloading attempts by rule set id', async () => {
        const target = createTarget();
        const model = target.model(SDK.PreloadingModel.PreloadingModel);
        assert.exists(model);
        assert.deepEqual(model.getAllRuleSets(), []);
        assert.deepEqual(model.getRepresentativePreloadingAttempts(null), []);
        const loaderId = getMainFrame(target).loaderId;
        dispatchEvent(target, 'Preload.ruleSetUpdated', {
            ruleSet: {
                id: 'ruleSetId:1',
                loaderId,
                sourceText: `
{
  "prefetch": [
    {
      "source": "list",
      "urls": ["/subresource12.js"]
    }
  ]
}
`,
            },
        });
        dispatchEvent(target, 'Preload.ruleSetUpdated', {
            ruleSet: {
                id: 'ruleSetId:2',
                loaderId,
                sourceText: `
{
  "prefetch": [
    {
      "source": "list",
      "urls": ["/subresource12.js", "/subresource2.js"]
    }
  ]
}
`,
            },
        });
        dispatchEvent(target, 'Preload.preloadingAttemptSourcesUpdated', {
            loaderId,
            preloadingAttemptSources: [
                {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId,
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource12.js',
                    },
                    ruleSetIds: ['ruleSetId:1', 'ruleSetId:2'],
                    nodeIds: [1, 2],
                },
                {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId,
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource2.js',
                    },
                    ruleSetIds: ['ruleSetId:2'],
                    nodeIds: [2],
                },
            ],
        });
        dispatchEvent(target, 'Preload.prefetchStatusUpdated', {
            key: {
                loaderId,
                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                url: 'https://example.com/subresource12.js',
            },
            pipelineId: 'pipelineId:1',
            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
            requestId: 'requestId:1',
        });
        dispatchEvent(target, 'Preload.prefetchStatusUpdated', {
            key: {
                loaderId,
                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                url: 'https://example.com/subresource2.js',
            },
            pipelineId: 'pipelineId:2',
            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
            requestId: 'requestId:2',
        });
        assert.deepEqual(model.getRepresentativePreloadingAttempts(null), [
            {
                id: `${loaderId}:Prefetch:https://example.com/subresource12.js:undefined`,
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId,
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: urlString `https://example.com/subresource12.js`,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                    prefetchStatus: null,
                    requestId: 'requestId:1',
                    ruleSetIds: ['ruleSetId:1', 'ruleSetId:2'],
                    nodeIds: [1, 2],
                },
            },
            {
                id: `${loaderId}:Prefetch:https://example.com/subresource2.js:undefined`,
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId,
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: urlString `https://example.com/subresource2.js`,
                    },
                    pipelineId: 'pipelineId:2',
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                    prefetchStatus: null,
                    requestId: 'requestId:2',
                    ruleSetIds: ['ruleSetId:2'],
                    nodeIds: [2],
                },
            },
        ]);
        assert.deepEqual(model.getRepresentativePreloadingAttempts('ruleSetId:1'), [
            {
                id: `${loaderId}:Prefetch:https://example.com/subresource12.js:undefined`,
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId,
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: urlString `https://example.com/subresource12.js`,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                    prefetchStatus: null,
                    requestId: 'requestId:1',
                    ruleSetIds: ['ruleSetId:1', 'ruleSetId:2'],
                    nodeIds: [1, 2],
                },
            },
        ]);
        assert.deepEqual(model.getRepresentativePreloadingAttempts('ruleSetId:2'), [
            {
                id: `${loaderId}:Prefetch:https://example.com/subresource12.js:undefined`,
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId,
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: urlString `https://example.com/subresource12.js`,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                    prefetchStatus: null,
                    requestId: 'requestId:1',
                    ruleSetIds: ['ruleSetId:1', 'ruleSetId:2'],
                    nodeIds: [1, 2],
                },
            },
            {
                id: `${loaderId}:Prefetch:https://example.com/subresource2.js:undefined`,
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId,
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: urlString `https://example.com/subresource2.js`,
                    },
                    pipelineId: 'pipelineId:2',
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                    prefetchStatus: null,
                    requestId: 'requestId:2',
                    ruleSetIds: ['ruleSetId:2'],
                    nodeIds: [2],
                },
            },
        ]);
    });
    it('regards attempts with strongest action as representative', async () => {
        const target = createTarget();
        const model = target.model(SDK.PreloadingModel.PreloadingModel);
        assert.exists(model);
        assert.deepEqual(model.getAllRuleSets(), []);
        assert.deepEqual(model.getRepresentativePreloadingAttempts(null), []);
        const loaderId = getMainFrame(target).loaderId;
        dispatchEvent(target, 'Preload.ruleSetUpdated', {
            ruleSet: {
                id: 'ruleSetId:1',
                loaderId,
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
        });
        dispatchEvent(target, 'Preload.preloadingAttemptSourcesUpdated', {
            loaderId,
            preloadingAttemptSources: [
                {
                    action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                    key: {
                        loaderId,
                        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                        url: 'https://example.com/prerendered.html',
                    },
                    ruleSetIds: ['ruleSetId:1'],
                    nodeIds: [1],
                },
            ],
        });
        assert.deepEqual(model.getRepresentativePreloadingAttempts(null), [
            {
                id: `${loaderId}:Prerender:https://example.com/prerendered.html:undefined`,
                value: {
                    action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                    key: {
                        loaderId,
                        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                        url: urlString `https://example.com/prerendered.html`,
                    },
                    pipelineId: null,
                    status: "NotTriggered" /* SDK.PreloadingModel.PreloadingStatus.NOT_TRIGGERED */,
                    prerenderStatus: null,
                    disallowedMojoInterface: null,
                    mismatchedHeaders: null,
                    ruleSetIds: ['ruleSetId:1'],
                    nodeIds: [1],
                },
            },
        ]);
        dispatchEvent(target, 'Preload.prefetchStatusUpdated', {
            key: {
                loaderId,
                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                url: 'https://example.com/prerendered.html',
            },
            pipelineId: 'pipelineId:1',
            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
            requestId: 'requestId:1',
        });
        // Here, we get two different attemtps, which should sit in the same pipeline actually.
        // It is because
        //
        // - The `NOT_TRIGGERED` entry is synthesized from
        //   `Preload.preloadingAttemptSourcesUpdated` event.
        // - It is associated with the following entry for *prerender*, not prefetch.
        //
        // We admit the phenomenon as prefetch and prerender are triggered simultaneously and we don't
        // expect the duration is very short that these entries are shown.
        assert.deepEqual(model.getRepresentativePreloadingAttempts(null), [
            {
                id: `${loaderId}:Prerender:https://example.com/prerendered.html:undefined`,
                value: {
                    action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                    key: {
                        loaderId,
                        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                        url: urlString `https://example.com/prerendered.html`,
                    },
                    pipelineId: null,
                    status: "NotTriggered" /* SDK.PreloadingModel.PreloadingStatus.NOT_TRIGGERED */,
                    prerenderStatus: null,
                    disallowedMojoInterface: null,
                    mismatchedHeaders: null,
                    ruleSetIds: ['ruleSetId:1'],
                    nodeIds: [1],
                },
            },
            {
                id: `${loaderId}:Prefetch:https://example.com/prerendered.html:undefined`,
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId,
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: urlString `https://example.com/prerendered.html`,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                    prefetchStatus: null,
                    requestId: 'requestId:1',
                    ruleSetIds: [],
                    nodeIds: [],
                },
            },
        ]);
        dispatchEvent(target, 'Preload.prerenderStatusUpdated', {
            key: {
                loaderId,
                action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                url: 'https://example.com/prerendered.html',
            },
            pipelineId: 'pipelineId:1',
            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
        });
        // Converges to an entry.
        assert.deepEqual(model.getRepresentativePreloadingAttempts(null), [
            {
                id: `${loaderId}:Prerender:https://example.com/prerendered.html:undefined`,
                value: {
                    action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                    key: {
                        loaderId,
                        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                        url: urlString `https://example.com/prerendered.html`,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.RUNNING */,
                    prerenderStatus: null,
                    disallowedMojoInterface: null,
                    mismatchedHeaders: null,
                    ruleSetIds: ['ruleSetId:1'],
                    nodeIds: [1],
                },
            },
        ]);
        dispatchEvent(target, 'Preload.prefetchStatusUpdated', {
            key: {
                loaderId,
                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                url: 'https://example.com/prerendered.html',
            },
            pipelineId: 'pipelineId:1',
            status: "Success" /* SDK.PreloadingModel.PreloadingStatus.SUCCESS */,
            requestId: 'requestId:1',
        });
        dispatchEvent(target, 'Preload.prerenderStatusUpdated', {
            key: {
                loaderId,
                action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                url: 'https://example.com/prerendered.html',
            },
            pipelineId: 'pipelineId:1',
            status: "Failure" /* SDK.PreloadingModel.PreloadingStatus.FAILURE */,
            prerenderStatus: "MojoBinderPolicy" /* Protocol.Preload.PrerenderFinalStatus.MojoBinderPolicy */,
            disallowedMojoInterface: 'device.mojom.GamepadMonitor',
        });
        // The prerender is the representative of the pipeline even if it failed.
        assert.deepEqual(model.getRepresentativePreloadingAttempts(null), [
            {
                id: `${loaderId}:Prerender:https://example.com/prerendered.html:undefined`,
                value: {
                    action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                    key: {
                        loaderId,
                        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                        url: urlString `https://example.com/prerendered.html`,
                    },
                    pipelineId: 'pipelineId:1',
                    status: "Failure" /* SDK.PreloadingModel.PreloadingStatus.FAILURE */,
                    prerenderStatus: "MojoBinderPolicy" /* Protocol.Preload.PrerenderFinalStatus.MojoBinderPolicy */,
                    disallowedMojoInterface: 'device.mojom.GamepadMonitor',
                    mismatchedHeaders: null,
                    ruleSetIds: ['ruleSetId:1'],
                    nodeIds: [1],
                },
            },
        ]);
    });
});
//# sourceMappingURL=PreloadingModel.test.js.map