// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Platform from '../../../../core/platform/platform.js';
import * as SDK from '../../../../core/sdk/sdk.js';
import { assertGridContents } from '../../../../testing/DataGridHelpers.js';
import { renderElementIntoDOM, } from '../../../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../../../testing/EnvironmentHelpers.js';
import * as RenderCoordinator from '../../../../ui/components/render_coordinator/render_coordinator.js';
import * as PreloadingComponents from './components.js';
const { urlString } = Platform.DevToolsPath;
async function renderPreloadingMismatchedHeadersGrid(data) {
    const component = new PreloadingComponents.PreloadingMismatchedHeadersGrid.PreloadingMismatchedHeadersGrid();
    component.data = data;
    renderElementIntoDOM(component);
    assert.isNotNull(component.shadowRoot);
    await RenderCoordinator.done();
    return component;
}
async function testPreloadingMismatchedHeadersGrid(receivedMismatchedHeaders, rowExpected) {
    const data = {
        action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
        key: {
            loaderId: 'loaderId:1',
            action: "Prerender" /* Protocol.Preload.SpeculationAction.Prerender */,
            url: urlString `https://example.com/prerendered.html`,
        },
        pipelineId: 'pipelineId:1',
        status: "Failure" /* SDK.PreloadingModel.PreloadingStatus.FAILURE */,
        prerenderStatus: "ActivationNavigationParameterMismatch" /* Protocol.Preload.PrerenderFinalStatus.ActivationNavigationParameterMismatch */,
        disallowedMojoInterface: null,
        mismatchedHeaders: receivedMismatchedHeaders,
        ruleSetIds: ['ruleSetId:1'],
        nodeIds: [1],
    };
    const component = await renderPreloadingMismatchedHeadersGrid(data);
    assert.isNotNull(component.shadowRoot);
    assertGridContents(component, ['Header name', 'Value in initial navigation', 'Value in activation navigation'], rowExpected);
}
describeWithEnvironment('PreloadingMismatchedHeadersGrid', () => {
    it('one mismatched header without missing', async () => {
        await testPreloadingMismatchedHeadersGrid([
            {
                headerName: 'sec-ch-ua-platform',
                initialValue: 'Linux',
                activationValue: 'Android',
            },
        ], [
            ['sec-ch-ua-platform', 'Linux', 'Android'],
        ]);
    });
    it('one mismatched header with an initial value missing', async () => {
        await testPreloadingMismatchedHeadersGrid([
            {
                headerName: 'sec-ch-ua-platform',
                initialValue: undefined,
                activationValue: 'Android',
            },
        ], [
            ['sec-ch-ua-platform', '(missing)', 'Android'],
        ]);
    });
    it('one mismatched header with an activation missing', async () => {
        await testPreloadingMismatchedHeadersGrid([
            {
                headerName: 'sec-ch-ua-platform',
                initialValue: 'Linux',
                activationValue: undefined,
            },
        ], [
            ['sec-ch-ua-platform', 'Linux', '(missing)'],
        ]);
    });
    it('multiple mismatched header with one of the value missing', async () => {
        await testPreloadingMismatchedHeadersGrid([
            {
                headerName: 'sec-ch-ua',
                initialValue: '"Not_A Brand";v="8", "Chromium";v="120"',
                activationValue: undefined,
            },
            {
                headerName: 'sec-ch-ua-mobile',
                initialValue: '?0',
                activationValue: '?1',
            },
        ], [
            ['sec-ch-ua', '"Not_A Brand";v="8", "Chromium";v="120"', '(missing)'],
            ['sec-ch-ua-mobile', '?0', '?1'],
        ]);
    });
    it('multiple mismatched header with one of each value missing', async () => {
        await testPreloadingMismatchedHeadersGrid([
            {
                headerName: 'sec-ch-ua',
                initialValue: '"Not_A Brand";v="8", "Chromium";v="120"',
                activationValue: undefined,
            },
            {
                headerName: 'sec-ch-ua-mobile',
                initialValue: undefined,
                activationValue: '?1',
            },
            {
                headerName: 'sec-ch-ua-platform',
                initialValue: 'Linux',
                activationValue: undefined,
            },
        ], [
            ['sec-ch-ua', '"Not_A Brand";v="8", "Chromium";v="120"', '(missing)'],
            ['sec-ch-ua-mobile', '(missing)', '?1'],
            ['sec-ch-ua-platform', 'Linux', '(missing)'],
        ]);
    });
});
//# sourceMappingURL=PreloadingMismatchedHeadersGrid.test.js.map