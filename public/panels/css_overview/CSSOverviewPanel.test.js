// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection, } from '../../testing/MockConnection.js';
import { createViewFunctionStub } from '../../testing/ViewFunctionHelpers.js';
import * as CSSOverview from './css_overview.js';
describeWithMockConnection('CSSOverviewPanel', () => {
    let target;
    beforeEach(async () => {
        const tabTaget = createTarget({ type: SDK.Target.Type.TAB });
        createTarget({ parentTarget: tabTaget, subtype: 'prerender' });
        target = createTarget({ parentTarget: tabTaget });
    });
    it('reacts to start event and sends completion event', async () => {
        const view = createViewFunctionStub(CSSOverview.CSSOverviewPanel.CSSOverviewPanel);
        new CSSOverview.CSSOverviewPanel.CSSOverviewPanel(view);
        sinon.stub(target.runtimeAgent(), 'invoke_evaluate').resolves({
            result: {},
        });
        sinon.stub(target.domsnapshotAgent(), 'invoke_captureSnapshot').resolves({
            documents: [],
        });
        sinon.stub(target.cssAgent(), 'invoke_getMediaQueries').resolves({
            medias: [],
        });
        view.input.onStartCapture();
        assert.strictEqual((await view.nextInput).state, 'completed');
    });
});
//# sourceMappingURL=CSSOverviewPanel.test.js.map