// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { createCustomStep, installMocksForRecordingPlayer, installMocksForTargetManager, } from '../testing/RecorderHelpers.js';
import * as Models from './models.js';
describe('RecordingPlayer', () => {
    let recordingPlayer;
    beforeEach(() => {
        installMocksForTargetManager();
        installMocksForRecordingPlayer();
    });
    afterEach(() => {
        recordingPlayer.disposeForTesting();
    });
    it('should emit `Step` event before executing in every step', async () => {
        recordingPlayer = new Models.RecordingPlayer.RecordingPlayer({
            title: 'test',
            steps: [
                createCustomStep(),
                createCustomStep(),
                createCustomStep(),
            ],
        }, {
            speed: "normal" /* Models.RecordingPlayer.PlayRecordingSpeed.NORMAL */,
            breakpointIndexes: new Set(),
        });
        const stepEventHandlerStub = sinon.stub().callsFake(async ({ data: { resolve } }) => {
            resolve();
        });
        recordingPlayer.addEventListener("Step" /* Models.RecordingPlayer.Events.STEP */, stepEventHandlerStub);
        await recordingPlayer.play();
        assert.lengthOf(stepEventHandlerStub.getCalls(), 3);
    });
    describe('Step by step execution', () => {
        it('should stop execution before executing a step that has a breakpoint', async () => {
            recordingPlayer = new Models.RecordingPlayer.RecordingPlayer({
                title: 'test',
                steps: [
                    createCustomStep(),
                    createCustomStep(),
                    createCustomStep(),
                ],
            }, {
                speed: "normal" /* Models.RecordingPlayer.PlayRecordingSpeed.NORMAL */,
                breakpointIndexes: new Set([1]),
            });
            const stepEventHandlerStub = sinon.stub().callsFake(async ({ data: { resolve } }) => {
                resolve();
            });
            const stopEventPromise = new Promise(resolve => {
                recordingPlayer.addEventListener("Stop" /* Models.RecordingPlayer.Events.STOP */, () => {
                    resolve();
                });
            });
            recordingPlayer.addEventListener("Step" /* Models.RecordingPlayer.Events.STEP */, stepEventHandlerStub);
            void recordingPlayer.play();
            await stopEventPromise;
            assert.lengthOf(stepEventHandlerStub.getCalls(), 2);
        });
        it('should `stepOver` execute only the next step after breakpoint and stop', async () => {
            recordingPlayer = new Models.RecordingPlayer.RecordingPlayer({
                title: 'test',
                steps: [
                    createCustomStep(),
                    createCustomStep(),
                    createCustomStep(),
                    createCustomStep(),
                ],
            }, {
                speed: "normal" /* Models.RecordingPlayer.PlayRecordingSpeed.NORMAL */,
                breakpointIndexes: new Set([1]),
            });
            const stepEventHandlerStub = sinon.stub().callsFake(async ({ data: { resolve } }) => {
                resolve();
            });
            let stopEventPromise = new Promise(resolve => {
                recordingPlayer.addEventListener("Stop" /* Models.RecordingPlayer.Events.STOP */, () => {
                    resolve();
                    stopEventPromise = new Promise(nextResolve => {
                        recordingPlayer.addEventListener("Stop" /* Models.RecordingPlayer.Events.STOP */, () => {
                            nextResolve();
                        }, { once: true });
                    });
                }, { once: true });
            });
            recordingPlayer.addEventListener("Step" /* Models.RecordingPlayer.Events.STEP */, stepEventHandlerStub);
            void recordingPlayer.play();
            await stopEventPromise;
            assert.lengthOf(stepEventHandlerStub.getCalls(), 2);
            recordingPlayer.stepOver();
            await stopEventPromise;
            assert.lengthOf(stepEventHandlerStub.getCalls(), 3);
        });
        it('should `continue` execute until the next breakpoint', async () => {
            recordingPlayer = new Models.RecordingPlayer.RecordingPlayer({
                title: 'test',
                steps: [
                    createCustomStep(),
                    createCustomStep(),
                    createCustomStep(),
                    createCustomStep(),
                    createCustomStep(),
                ],
            }, {
                speed: "normal" /* Models.RecordingPlayer.PlayRecordingSpeed.NORMAL */,
                breakpointIndexes: new Set([1, 3]),
            });
            const stepEventHandlerStub = sinon.stub().callsFake(async ({ data: { resolve } }) => {
                resolve();
            });
            let stopEventPromise = new Promise(resolve => {
                recordingPlayer.addEventListener("Stop" /* Models.RecordingPlayer.Events.STOP */, () => {
                    resolve();
                    stopEventPromise = new Promise(nextResolve => {
                        recordingPlayer.addEventListener("Stop" /* Models.RecordingPlayer.Events.STOP */, () => {
                            nextResolve();
                        }, { once: true });
                    });
                }, { once: true });
            });
            recordingPlayer.addEventListener("Step" /* Models.RecordingPlayer.Events.STEP */, stepEventHandlerStub);
            void recordingPlayer.play();
            await stopEventPromise;
            assert.lengthOf(stepEventHandlerStub.getCalls(), 2);
            recordingPlayer.continue();
            await stopEventPromise;
            assert.lengthOf(stepEventHandlerStub.getCalls(), 4);
        });
        it('should `continue` execute until the end if there is no later breakpoints', async () => {
            recordingPlayer = new Models.RecordingPlayer.RecordingPlayer({
                title: 'test',
                steps: [
                    createCustomStep(),
                    createCustomStep(),
                    createCustomStep(),
                    createCustomStep(),
                    createCustomStep(),
                ],
            }, {
                speed: "normal" /* Models.RecordingPlayer.PlayRecordingSpeed.NORMAL */,
                breakpointIndexes: new Set([1]),
            });
            const stepEventHandlerStub = sinon.stub().callsFake(async ({ data: { resolve } }) => {
                resolve();
            });
            let stopEventPromise = new Promise(resolve => {
                recordingPlayer.addEventListener("Stop" /* Models.RecordingPlayer.Events.STOP */, () => {
                    resolve();
                    stopEventPromise = new Promise(nextResolve => {
                        recordingPlayer.addEventListener("Stop" /* Models.RecordingPlayer.Events.STOP */, () => {
                            nextResolve();
                        }, { once: true });
                    });
                }, { once: true });
            });
            const doneEventPromise = new Promise(resolve => {
                recordingPlayer.addEventListener("Done" /* Models.RecordingPlayer.Events.DONE */, () => {
                    resolve();
                }, { once: true });
            });
            recordingPlayer.addEventListener("Step" /* Models.RecordingPlayer.Events.STEP */, stepEventHandlerStub);
            void recordingPlayer.play();
            await stopEventPromise;
            assert.lengthOf(stepEventHandlerStub.getCalls(), 2);
            recordingPlayer.continue();
            await doneEventPromise;
            assert.lengthOf(stepEventHandlerStub.getCalls(), 5);
        });
    });
});
//# sourceMappingURL=RecordingPlayer.test.js.map