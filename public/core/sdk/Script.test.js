// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import sinon from 'sinon';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import { MockCDPConnection } from '../../testing/MockCDPConnection.js';
import { TestUniverse } from '../../testing/TestUniverse.js';
import * as TextUtils from '../text_utils/text_utils.js';
import * as SDK from './sdk.js';
describeWithEnvironment('Script', () => {
    let universe;
    let connection;
    beforeEach(() => {
        universe = new TestUniverse();
        connection = new MockCDPConnection();
    });
    describe('originalContentProvider', () => {
        it('doesn\'t strip //# sourceURL annotations', async () => {
            const target = universe.createTarget({ connection });
            const debuggerModel = target.model(SDK.DebuggerModel.DebuggerModel);
            const url = 'webpack:///src/foo.js';
            const scriptId = '1';
            const scriptSource = `
console.log("foo");
//# sourceURL=${url}
`;
            connection.dispatchEvent('Debugger.scriptParsed', {
                scriptId,
                url,
                startLine: 2,
                startColumn: 14,
                endLine: 5,
                endColumn: 0,
                executionContextId: 1,
                hash: '',
                buildId: '',
                hasSourceURL: true,
            }, undefined);
            connection.setSuccessHandler('Debugger.getScriptSource', () => {
                return {
                    scriptSource,
                };
            });
            const script = debuggerModel.scriptForId(scriptId);
            const content = await script.originalContentProvider().requestContentData();
            assert.instanceOf(content, TextUtils.ContentData.ContentData);
            assert.strictEqual(content.text, scriptSource);
        });
    });
    describe('editSource', () => {
        function setupEditTest(scriptId, scriptSource = '') {
            const target = universe.createTarget({ connection });
            const model = target.model(SDK.DebuggerModel.DebuggerModel);
            connection.dispatchEvent('Debugger.scriptParsed', {
                scriptId: scriptId,
                url: 'https://example.com/test.js',
                startLine: 0,
                startColumn: 0,
                endLine: 2,
                endColumn: 0,
                executionContextId: 1,
                hash: '',
                buildId: '',
                hasSourceURL: false,
            }, undefined);
            connection.setSuccessHandler('Debugger.getScriptSource', () => {
                return {
                    scriptSource,
                };
            });
            const script = model.scriptForId(scriptId);
            return { script, target, model };
        }
        it('does not invoke the backend when new content and old content match', async () => {
            const { script } = setupEditTest('1', 'console.log("foo")');
            connection.setHandler('Debugger.setScriptSource', () => {
                throw new Error('Debugger.setScriptSource must not be called');
            });
            const { status } = await script.editSource('console.log("foo")');
            assert.strictEqual(status, "Ok" /* Protocol.Debugger.SetScriptSourceResponseStatus.Ok */);
        });
        it('updates the source content when the live edit succeeds', async () => {
            const { script } = setupEditTest('1', 'console.log("foo")');
            connection.setSuccessHandler('Debugger.setScriptSource', () => {
                return {
                    status: "Ok" /* Protocol.Debugger.SetScriptSourceResponseStatus.Ok */,
                };
            });
            const newContent = 'console.log("bar")';
            const { status } = await script.editSource(newContent);
            assert.strictEqual(status, "Ok" /* Protocol.Debugger.SetScriptSourceResponseStatus.Ok */);
            const contentData = await script.requestContentData();
            assert.instanceOf(contentData, TextUtils.ContentData.ContentData);
            assert.strictEqual(contentData.text, newContent);
        });
        it('does not update the source content when the live edit fails', async () => {
            const scriptContent = 'console.log("foo")';
            const { script } = setupEditTest('1', scriptContent);
            connection.setSuccessHandler('Debugger.setScriptSource', () => {
                return {
                    status: "CompileError" /* Protocol.Debugger.SetScriptSourceResponseStatus.CompileError */,
                };
            });
            const { status } = await script.editSource('console.log("bar")');
            assert.strictEqual(status, "CompileError" /* Protocol.Debugger.SetScriptSourceResponseStatus.CompileError */);
            const contentData = await script.requestContentData();
            assert.instanceOf(contentData, TextUtils.ContentData.ContentData);
            assert.strictEqual(contentData.text, scriptContent);
        });
        it('throws an error for protocol failures', done => {
            const { script, target } = setupEditTest('1', 'console.log("foo")');
            sinon.stub(target.debuggerAgent(), 'invoke_setScriptSource').returns(Promise.resolve({
                status: undefined, // Make TS happy.
                getError: () => 'setScriptSource failed for some reason',
            }));
            script.editSource('console.log("bar")')
                .then(() => {
                assert.fail('expected "editSource" to throw an exception!');
            })
                .catch(() => done());
        });
        it('fires an event on the DebuggerModel after returning from the backend', async () => {
            const { script, model } = setupEditTest('1', 'console.log("foo")');
            connection.setSuccessHandler('Debugger.setScriptSource', () => {
                return {
                    status: "Ok" /* Protocol.Debugger.SetScriptSourceResponseStatus.Ok */,
                };
            });
            const newContent = 'console.log("bar")';
            const eventPromise = model.once(SDK.DebuggerModel.Events.ScriptSourceWasEdited);
            void script.editSource(newContent);
            const { script: eventScript, status } = await eventPromise;
            assert.strictEqual(eventScript, script);
            assert.strictEqual(status, "Ok" /* Protocol.Debugger.SetScriptSourceResponseStatus.Ok */);
        });
    });
});
//# sourceMappingURL=Script.test.js.map