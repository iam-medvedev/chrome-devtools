// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import sinon from 'sinon';
import * as SDK from '../../core/sdk/sdk.js';
import { renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { createTarget, describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import { expectCall } from '../../testing/ExpectStubCall.js';
import * as Emulation from './emulation.js';
describeWithEnvironment('MediaQueryInspector', () => {
    let target;
    let inspector;
    beforeEach(() => {
        const tabTarget = createTarget({ type: SDK.Target.Type.TAB });
        createTarget({ parentTarget: tabTarget, subtype: 'prerender' });
        target = createTarget({ parentTarget: tabTarget });
    });
    afterEach(() => {
        inspector.detach();
    });
    it('renders media queries', async () => {
        inspector = new Emulation.MediaQueryInspector.MediaQueryInspector();
        inspector.getWidthCallback = () => 42;
        inspector.setWidthCallback = (_) => { };
        renderElementIntoDOM(inspector);
        await inspector.updateComplete;
        assert.lengthOf(inspector.contentElement.querySelectorAll('.media-inspector-marker'), 0);
        const cssModel = target.model(SDK.CSSModel.CSSModel);
        assert.exists(cssModel);
        const CSS_MEDIA = {
            text: 'foo',
            source: "mediaRule" /* Protocol.CSS.CSSMediaSource.MediaRule */,
            mediaList: [{ expressions: [{ value: 42, computedLength: 42, unit: 'UNIT', feature: 'max-width' }], active: true }],
        };
        sinon.stub(cssModel, 'getMediaQueries').resolves([new SDK.CSSMedia.CSSMedia(cssModel, CSS_MEDIA)]);
        const workScheduled = expectCall(sinon.stub(inspector.mediaThrottler, 'schedule'));
        cssModel.dispatchEventToListeners(SDK.CSSModel.Events.StyleSheetAdded, {});
        const [work] = await workScheduled;
        await work();
        await inspector.updateComplete;
        assert.lengthOf(inspector.contentElement.querySelectorAll('.media-inspector-marker'), 1);
    });
});
//# sourceMappingURL=MediaQueryInspector.test.js.map