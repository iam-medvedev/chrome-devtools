// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Platform from '../../../../core/platform/platform.js';
import * as SDK from '../../../../core/sdk/sdk.js';
import { describeWithEnvironment } from '../../../../testing/EnvironmentHelpers.js';
import { createViewFunctionStub } from '../../../../testing/ViewFunctionHelpers.js';
import * as PreloadingComponents from './components.js';
const { urlString } = Platform.DevToolsPath;
describeWithEnvironment('PreloadingDetailsReportView', () => {
    it('renders place holder if not selected', async () => {
        const data = null;
        const view = createViewFunctionStub(PreloadingComponents.PreloadingDetailsReportView.PreloadingDetailsReportView);
        const detailsReportView = new PreloadingComponents.PreloadingDetailsReportView.PreloadingDetailsReportView(view);
        detailsReportView.data = data;
        const input = await view.nextInput;
        assert.deepEqual(input.data, data);
        assert.isFunction(input.onRevealRuleSet);
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
        const view = createViewFunctionStub(PreloadingComponents.PreloadingDetailsReportView.PreloadingDetailsReportView);
        const detailsReportView = new PreloadingComponents.PreloadingDetailsReportView.PreloadingDetailsReportView(view);
        detailsReportView.data = data;
        const input = await view.nextInput;
        assert.deepEqual(input.data, data);
        assert.isFunction(input.onRevealRuleSet);
    });
});
//# sourceMappingURL=PreloadingDetailsReportView.test.js.map