// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection, dispatchEvent, } from '../../testing/MockConnection.js';
import { assertNotNullOrUndefined } from '../platform/platform.js';
import * as SDK from './sdk.js';
describeWithMockConnection('PreloadingModel', () => {
    it('adds and deletes rule sets and preloeading attempts', async () => {
        const target = createTarget();
        const model = target.model(SDK.PreloadingModel.PreloadingModel);
        assertNotNullOrUndefined(model);
        assert.deepEqual(model.getAllRuleSets(), []);
        dispatchEvent(target, 'Page.frameNavigated', {
            frame: {
                id: 'frameId:1',
                loaderId: 'loaderId:1',
                url: 'https://example.com/',
                domainAndRegistry: 'example.com',
                securityOrigin: 'https://example.com/',
                mimeType: 'text/html',
                secureContextType: "Secure" /* Protocol.Page.SecureContextType.Secure */,
                crossOriginIsolatedContextType: "Isolated" /* Protocol.Page.CrossOriginIsolatedContextType.Isolated */,
                gatedAPIFeatures: [],
            },
        });
        dispatchEvent(target, 'Preload.ruleSetUpdated', {
            ruleSet: {
                id: 'ruleSetId:1',
                loaderId: 'loaderId:1',
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
            loaderId: 'loaderId:1',
            preloadingAttemptSources: [
                {
                    key: {
                        loaderId: 'loaderId:1',
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
                loaderId: 'loaderId:1',
                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                url: 'https://example.com/subresource.js',
            },
            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.Running */,
            requestId: 'requestId:1',
        });
        assert.deepEqual(model.getAllRuleSets(), [
            {
                id: 'ruleSetId:1',
                value: {
                    id: 'ruleSetId:1',
                    loaderId: 'loaderId:1',
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
        assert.deepEqual(model.getPreloadingAttempts(null), [
            {
                id: 'loaderId:1:Prefetch:https://example.com/subresource.js:undefined',
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId: 'loaderId:1',
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource.js',
                    },
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.Running */,
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
                loaderId: 'loaderId:1',
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
            loaderId: 'loaderId:1',
            preloadingAttemptSources: [
                {
                    key: {
                        loaderId: 'loaderId:1',
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource.js',
                    },
                    ruleSetIds: ['ruleSetId:1'],
                    nodeIds: [1],
                },
                {
                    key: {
                        loaderId: 'loaderId:1',
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
                loaderId: 'loaderId:1',
                action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                url: 'https://example.com/page.html',
            },
            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.Running */,
        });
        assert.deepEqual(model.getAllRuleSets(), [
            {
                id: 'ruleSetId:1',
                value: {
                    id: 'ruleSetId:1',
                    loaderId: 'loaderId:1',
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
                    loaderId: 'loaderId:1',
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
        assert.deepEqual(model.getPreloadingAttempts(null), [
            {
                id: 'loaderId:1:Prefetch:https://example.com/subresource.js:undefined',
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId: 'loaderId:1',
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource.js',
                    },
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.Running */,
                    prefetchStatus: null,
                    requestId: 'requestId:1',
                    ruleSetIds: ['ruleSetId:1'],
                    nodeIds: [1],
                },
            },
            {
                id: 'loaderId:1:Prerender:https://example.com/page.html:undefined',
                value: {
                    action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                    key: {
                        loaderId: 'loaderId:1',
                        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                        url: 'https://example.com/page.html',
                    },
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.Running */,
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
            loaderId: 'loaderId:1',
            preloadingAttemptSources: [
                {
                    key: {
                        loaderId: 'loaderId:1',
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
                loaderId: 'loaderId:1',
                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                url: 'https://example.com/subresource.js',
            },
            status: "Failure" /* SDK.PreloadingModel.PreloadingStatus.Failure */,
            requestId: 'requestId:1',
        });
        assert.deepEqual(model.getAllRuleSets(), [
            {
                id: 'ruleSetId:2',
                value: {
                    id: 'ruleSetId:2',
                    loaderId: 'loaderId:1',
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
        assert.deepEqual(model.getPreloadingAttempts(null), [
            {
                id: 'loaderId:1:Prefetch:https://example.com/subresource.js:undefined',
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId: 'loaderId:1',
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource.js',
                    },
                    status: "Failure" /* SDK.PreloadingModel.PreloadingStatus.Failure */,
                    prefetchStatus: null,
                    requestId: 'requestId:1',
                    // Note that current implementation doesn't show associated
                    // rule sets when preloading is cancelled by rule sets
                    // deletion. One can treat this case special, i.e. associated
                    // rule sets decreasing one to zero, and show the last rule
                    // set.
                    //
                    // TODO(https://crbug.com/1410709): Consider the above case.
                    ruleSetIds: [],
                    nodeIds: [],
                },
            },
            {
                id: 'loaderId:1:Prerender:https://example.com/page.html:undefined',
                value: {
                    action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                    key: {
                        loaderId: 'loaderId:1',
                        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
                        url: 'https://example.com/page.html',
                    },
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.Running */,
                    prerenderStatus: null,
                    disallowedMojoInterface: null,
                    mismatchedHeaders: null,
                    ruleSetIds: ['ruleSetId:2'],
                    nodeIds: [2],
                },
            },
        ]);
    });
    it('registers preloeading attempt with status NotTriggered', async () => {
        const target = createTarget();
        const model = target.model(SDK.PreloadingModel.PreloadingModel);
        assertNotNullOrUndefined(model);
        assert.deepEqual(model.getAllRuleSets(), []);
        dispatchEvent(target, 'Page.frameNavigated', {
            frame: {
                id: 'frameId:1',
                loaderId: 'loaderId:1',
                url: 'https://example.com/',
                domainAndRegistry: 'example.com',
                securityOrigin: 'https://example.com/',
                mimeType: 'text/html',
                secureContextType: "Secure" /* Protocol.Page.SecureContextType.Secure */,
                crossOriginIsolatedContextType: "Isolated" /* Protocol.Page.CrossOriginIsolatedContextType.Isolated */,
                gatedAPIFeatures: [],
            },
        });
        dispatchEvent(target, 'Preload.ruleSetUpdated', {
            ruleSet: {
                id: 'ruleSetId:1',
                loaderId: 'loaderId:1',
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
            loaderId: 'loaderId:1',
            preloadingAttemptSources: [
                {
                    key: {
                        loaderId: 'loaderId:1',
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource.js',
                    },
                    ruleSetIds: ['ruleSetId:1'],
                    nodeIds: [1],
                },
            ],
        });
        assert.deepEqual(model.getPreloadingAttempts(null), [
            {
                id: 'loaderId:1:Prefetch:https://example.com/subresource.js:undefined',
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId: 'loaderId:1',
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource.js',
                    },
                    status: "NotTriggered" /* SDK.PreloadingModel.PreloadingStatus.NotTriggered */,
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
        assertNotNullOrUndefined(model);
        assert.deepEqual(model.getAllRuleSets(), []);
        assert.deepEqual(model.getPreloadingAttempts(null), []);
        dispatchEvent(target, 'Page.frameNavigated', {
            frame: {
                id: 'frameId:1',
                loaderId: 'loaderId:1',
                url: 'https://example.com/',
                domainAndRegistry: 'example.com',
                securityOrigin: 'https://example.com/',
                mimeType: 'text/html',
                secureContextType: "Secure" /* Protocol.Page.SecureContextType.Secure */,
                crossOriginIsolatedContextType: "Isolated" /* Protocol.Page.CrossOriginIsolatedContextType.Isolated */,
                gatedAPIFeatures: [],
            },
        });
        dispatchEvent(target, 'Preload.ruleSetUpdated', {
            ruleSet: {
                id: 'ruleSetId:1',
                loaderId: 'loaderId:1',
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
            loaderId: 'loaderId:1',
            preloadingAttemptSources: [
                {
                    key: {
                        loaderId: 'loaderId:1',
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
                loaderId: 'loaderId:1',
                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                url: 'https://example.com/subresource1.js',
            },
            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.Running */,
        });
        dispatchEvent(target, 'Page.frameNavigated', {
            frame: {
                id: 'frameId:2',
                loaderId: 'loaderId:2',
                url: 'https://example.com/index2.html',
                domainAndRegistry: 'example.com',
                securityOrigin: 'https://example.com/',
                mimeType: 'text/html',
                secureContextType: "Secure" /* Protocol.Page.SecureContextType.Secure */,
                crossOriginIsolatedContextType: "Isolated" /* Protocol.Page.CrossOriginIsolatedContextType.Isolated */,
                gatedAPIFeatures: [],
            },
        });
        dispatchEvent(target, 'Preload.ruleSetUpdated', {
            ruleSet: {
                id: 'ruleSetId:2',
                loaderId: 'loaderId:2',
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
            loaderId: 'loaderId:2',
            preloadingAttemptSources: [
                {
                    key: {
                        loaderId: 'loaderId:2',
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
                loaderId: 'loaderId:2',
                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                url: 'https://example.com/subresource2.js',
            },
            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.Running */,
            requestId: 'requestId:1',
        });
        assert.deepEqual(model.getAllRuleSets(), [
            {
                id: 'ruleSetId:2',
                value: {
                    id: 'ruleSetId:2',
                    loaderId: 'loaderId:2',
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
        assert.deepEqual(model.getPreloadingAttempts(null), [
            {
                id: 'loaderId:2:Prefetch:https://example.com/subresource2.js:undefined',
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId: 'loaderId:2',
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource2.js',
                    },
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.Running */,
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
        assertNotNullOrUndefined(model);
        assert.deepEqual(model.getAllRuleSets(), []);
        assert.deepEqual(model.getPreloadingAttempts(null), []);
        dispatchEvent(target, 'Page.frameNavigated', {
            frame: {
                id: 'frameId:1',
                loaderId: 'loaderId:1',
                url: 'https://example.com/',
                domainAndRegistry: 'example.com',
                securityOrigin: 'https://example.com/',
                mimeType: 'text/html',
                secureContextType: "Secure" /* Protocol.Page.SecureContextType.Secure */,
                crossOriginIsolatedContextType: "Isolated" /* Protocol.Page.CrossOriginIsolatedContextType.Isolated */,
                gatedAPIFeatures: [],
            },
        });
        dispatchEvent(target, 'Preload.ruleSetUpdated', {
            ruleSet: {
                id: 'ruleSetId:1',
                loaderId: 'loaderId:1',
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
                loaderId: 'loaderId:1',
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
            loaderId: 'loaderId:1',
            preloadingAttemptSources: [
                {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId: 'loaderId:1',
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource12.js',
                    },
                    ruleSetIds: ['ruleSetId:1', 'ruleSetId:2'],
                    nodeIds: [1, 2],
                },
                {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId: 'loaderId:1',
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
                loaderId: 'loaderId:1',
                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                url: 'https://example.com/subresource12.js',
            },
            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.Running */,
            requestId: 'requestId:1',
        });
        dispatchEvent(target, 'Preload.prefetchStatusUpdated', {
            key: {
                loaderId: 'loaderId:1',
                action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                url: 'https://example.com/subresource2.js',
            },
            status: "Running" /* SDK.PreloadingModel.PreloadingStatus.Running */,
            requestId: 'requestId:2',
        });
        assert.deepEqual(model.getPreloadingAttempts(null), [
            {
                id: 'loaderId:1:Prefetch:https://example.com/subresource12.js:undefined',
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId: 'loaderId:1',
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource12.js',
                    },
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.Running */,
                    prefetchStatus: null,
                    requestId: 'requestId:1',
                    ruleSetIds: ['ruleSetId:1', 'ruleSetId:2'],
                    nodeIds: [1, 2],
                },
            },
            {
                id: 'loaderId:1:Prefetch:https://example.com/subresource2.js:undefined',
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId: 'loaderId:1',
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource2.js',
                    },
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.Running */,
                    prefetchStatus: null,
                    requestId: 'requestId:2',
                    ruleSetIds: ['ruleSetId:2'],
                    nodeIds: [2],
                },
            },
        ]);
        assert.deepEqual(model.getPreloadingAttempts('ruleSetId:1'), [
            {
                id: 'loaderId:1:Prefetch:https://example.com/subresource12.js:undefined',
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId: 'loaderId:1',
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource12.js',
                    },
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.Running */,
                    prefetchStatus: null,
                    requestId: 'requestId:1',
                    ruleSetIds: ['ruleSetId:1', 'ruleSetId:2'],
                    nodeIds: [1, 2],
                },
            },
        ]);
        assert.deepEqual(model.getPreloadingAttempts('ruleSetId:2'), [
            {
                id: 'loaderId:1:Prefetch:https://example.com/subresource12.js:undefined',
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId: 'loaderId:1',
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource12.js',
                    },
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.Running */,
                    prefetchStatus: null,
                    requestId: 'requestId:1',
                    ruleSetIds: ['ruleSetId:1', 'ruleSetId:2'],
                    nodeIds: [1, 2],
                },
            },
            {
                id: 'loaderId:1:Prefetch:https://example.com/subresource2.js:undefined',
                value: {
                    action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                    key: {
                        loaderId: 'loaderId:1',
                        action: "Prefetch" /* Protocol.Preload.SpeculationAction.Prefetch */,
                        url: 'https://example.com/subresource2.js',
                    },
                    status: "Running" /* SDK.PreloadingModel.PreloadingStatus.Running */,
                    prefetchStatus: null,
                    requestId: 'requestId:2',
                    ruleSetIds: ['ruleSetId:2'],
                    nodeIds: [2],
                },
            },
        ]);
    });
});
//# sourceMappingURL=PreloadingModel.test.js.map