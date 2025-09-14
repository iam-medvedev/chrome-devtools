// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { clearAllMockConnectionResponseHandlers, clearMockConnectionResponseHandler, describeWithMockConnection, dispatchEvent, setMockConnectionResponseHandler, } from '../../testing/MockConnection.js';
import * as SDK from './sdk.js';
const noop = () => { };
const QUALITY = 80;
const MAX_WIDTH = 10;
const MAX_HEIGHT = 20;
const EVERY_NTH_FRAME = 2;
async function expectStartScreencastCalled(action) {
    clearMockConnectionResponseHandler('Page.startScreencast');
    const startScreencastCalledPromise = Promise.withResolvers();
    setMockConnectionResponseHandler('Page.startScreencast', (request) => {
        startScreencastCalledPromise.resolve(request);
        return {};
    });
    const response = await action();
    return {
        cdpRequest: await startScreencastCalledPromise.promise,
        actionResult: response,
    };
}
async function expectStopScreencastCaled(action) {
    clearMockConnectionResponseHandler('Page.stopScreencast');
    const stopScreencastCalledPromise = Promise.withResolvers();
    setMockConnectionResponseHandler('Page.stopScreencast', () => {
        stopScreencastCalledPromise.resolve();
        return {};
    });
    const response = await action();
    return { actionResult: response };
}
async function startMockScreencast(screenCaptureModel, { format = "jpeg" /* Protocol.Page.StartScreencastRequestFormat.Jpeg */, quality = QUALITY, maxWidth = MAX_WIDTH, maxHeight = MAX_HEIGHT, everyNthFrame = EVERY_NTH_FRAME, onFrame = noop, onVisibilityChanged = noop, } = {}) {
    const { cdpRequest, actionResult: id, } = await expectStartScreencastCalled(() => {
        return screenCaptureModel.startScreencast(format, quality, maxWidth, maxHeight, everyNthFrame, onFrame, onVisibilityChanged);
    });
    return {
        id,
        cdpRequest,
    };
}
async function stopMockScreencast(screenCaptureModel, { id }) {
    await expectStopScreencastCaled(() => {
        screenCaptureModel.stopScreencast(id);
    });
}
describeWithMockConnection('ScreenCaptureModel', () => {
    let target;
    let screenCaptureModel;
    beforeEach(() => {
        target = createTarget();
        const model = target.model(SDK.ScreenCaptureModel.ScreenCaptureModel);
        assert.exists(model);
        screenCaptureModel = model;
    });
    afterEach(() => {
        clearAllMockConnectionResponseHandlers();
    });
    describe('Screencasting', () => {
        describe('only one screencast operation', () => {
            it('startScreencast should start screen casting', async () => {
                const { cdpRequest } = await startMockScreencast(screenCaptureModel, {
                    format: "jpeg" /* Protocol.Page.StartScreencastRequestFormat.Jpeg */,
                    quality: 1,
                    maxWidth: 2,
                    maxHeight: 3,
                    everyNthFrame: 4,
                });
                assert.deepEqual(cdpRequest, {
                    format: "jpeg" /* Protocol.Page.StartScreencastRequestFormat.Jpeg */,
                    quality: 1,
                    maxWidth: 2,
                    maxHeight: 3,
                    everyNthFrame: 4
                });
            });
            it('stopScreencast should stop screen casting', async () => {
                const { id } = await startMockScreencast(screenCaptureModel);
                await stopMockScreencast(screenCaptureModel, { id });
            });
            it('stopScreencast throws an error for trying to stop screencast when there are no screencast operations in progress', async () => {
                try {
                    await stopMockScreencast(screenCaptureModel, { id: 42 });
                    assert.fail('Expected `stopScreencast` to throw');
                }
                catch (err) {
                    assert.strictEqual(err.message, 'There is no screencast operation to stop.');
                }
            });
            it('stopScreencast throws an error for trying to stop a different screencast than what is being in progress right now', async () => {
                await startMockScreencast(screenCaptureModel);
                try {
                    await stopMockScreencast(screenCaptureModel, { id: 42 });
                    assert.fail('Expected `stopScreencast` to throw');
                }
                catch (err) {
                    assert.strictEqual(err.message, 'Trying to stop a screencast operation that is not being served right now.');
                }
            });
        });
        describe('multiple screencast operations', () => {
            beforeEach(() => {
                setMockConnectionResponseHandler('Page.stopScreencast', () => ({}));
            });
            it('second call to startScreencast stops the ongoing screencasting', async () => {
                await startMockScreencast(screenCaptureModel);
                // Stop screencast is called for the initial call before starting a new screencast.
                await expectStopScreencastCaled(async () => {
                    await startMockScreencast(screenCaptureModel);
                });
            });
            it('only the last operation receives the callbacks', async () => {
                const initialFrameCallback = sinon.stub();
                const initialVisibilityChangeCallback = sinon.stub();
                const lastFrameCallback = sinon.stub();
                const lastVisibilityChangeCallback = sinon.stub();
                await startMockScreencast(screenCaptureModel, { onFrame: initialFrameCallback, onVisibilityChanged: initialVisibilityChangeCallback });
                await startMockScreencast(screenCaptureModel, { onFrame: lastFrameCallback, onVisibilityChanged: lastVisibilityChangeCallback });
                dispatchEvent(target, 'Page.screencastFrame', {});
                dispatchEvent(target, 'Page.screencastVisibilityChanged', {});
                sinon.assert.notCalled(initialFrameCallback);
                sinon.assert.notCalled(initialVisibilityChangeCallback);
                sinon.assert.calledOnce(lastFrameCallback);
                sinon.assert.calledOnce(lastVisibilityChangeCallback);
            });
            it('after the last operation is stopped, the previous one continues to receive callbacks', async () => {
                const initialFrameCallback = sinon.stub();
                const initialVisibilityChangeCallback = sinon.stub();
                const lastFrameCallback = sinon.stub();
                const lastVisibilityChangeCallback = sinon.stub();
                await startMockScreencast(screenCaptureModel, { onFrame: initialFrameCallback, onVisibilityChanged: initialVisibilityChangeCallback });
                const { id } = await startMockScreencast(screenCaptureModel, { onFrame: lastFrameCallback, onVisibilityChanged: lastVisibilityChangeCallback });
                await stopMockScreencast(screenCaptureModel, { id });
                dispatchEvent(target, 'Page.screencastFrame', {});
                dispatchEvent(target, 'Page.screencastVisibilityChanged', {});
                sinon.assert.calledOnce(initialFrameCallback);
                sinon.assert.calledOnce(initialVisibilityChangeCallback);
                sinon.assert.notCalled(lastFrameCallback);
                sinon.assert.notCalled(lastVisibilityChangeCallback);
            });
        });
    });
});
//# sourceMappingURL=ScreenCaptureModel.test.js.map