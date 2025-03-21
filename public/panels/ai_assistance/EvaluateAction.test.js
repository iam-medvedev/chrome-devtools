// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import { describeWithRealConnection, getExecutionContext } from '../../testing/RealConnection.js';
import * as EvaluateAction from './EvaluateAction.js';
describe('FreestylerEvaluateAction', () => {
    describe('error handling', () => {
        function executeWithResult(mockResult, pausedOnBreakpoint = false) {
            const executionContextStub = sinon.createStubInstance(SDK.RuntimeModel.ExecutionContext);
            executionContextStub.debuggerModel = sinon.createStubInstance(SDK.DebuggerModel.DebuggerModel);
            if (pausedOnBreakpoint) {
                executionContextStub.debuggerModel.selectedCallFrame = () => {
                    return sinon.createStubInstance(SDK.DebuggerModel.CallFrame);
                };
            }
            executionContextStub.callFunctionOn.resolves(mockResult);
            executionContextStub.runtimeModel = sinon.createStubInstance(SDK.RuntimeModel.RuntimeModel);
            return EvaluateAction.EvaluateAction.execute('', [], executionContextStub, { throwOnSideEffect: false });
        }
        function mockRemoteObject(overrides = {}) {
            return sinon.createStubInstance(SDK.RemoteObject.RemoteObject, {
                ...(overrides.className ? { className: overrides.className } : null),
                ...(overrides.subtype ? { subtype: overrides.subtype } : null),
                ...(overrides.type ? { type: overrides.type } : null),
                ...(overrides.value ? { value: overrides.value } : null),
                ...(overrides.preview ? { preview: overrides.preview } : null),
            });
        }
        function mockExceptionDetails({ description }) {
            return {
                exceptionId: 3,
                text: 'SyntaxError',
                lineNumber: 3,
                columnNumber: 3,
                exception: { type: "string" /* Protocol.Runtime.RemoteObjectType.String */, description },
            };
        }
        beforeEach(() => {
            sinon.restore();
        });
        it('should serialize a CDP error as a string', async () => {
            assert.strictEqual(await executeWithResult({ error: 'errorMessage' }), 'Error: errorMessage');
        });
        it('should throw an ExecutionError when the debugger is paused', async () => {
            assert.strictEqual(await executeWithResult({ error: 'errorMessage' }, true), 'Error: Cannot evaluate JavaScript because the execution is paused on a breakpoint.');
        });
        it('should throw an ExecutionError with the description of the exception if response included exception details', async () => {
            assert.strictEqual(await executeWithResult({
                object: mockRemoteObject(),
                exceptionDetails: mockExceptionDetails({ description: 'Error description' }),
            }), 'Error: Error description');
        });
        it('should throw a SideEffectError when the resulted exception starts with possible side effect error', async () => {
            try {
                await executeWithResult({
                    object: mockRemoteObject(),
                    exceptionDetails: mockExceptionDetails({ description: 'EvalError: Possible side-effect in debug-evaluate' }),
                });
                assert.fail('not reachable');
            }
            catch (err) {
                assert.instanceOf(err, EvaluateAction.SideEffectError);
                assert.strictEqual(err.message, 'EvalError: Possible side-effect in debug-evaluate');
            }
        });
    });
    describeWithRealConnection('serialization', () => {
        async function executionContextForTest() {
            const targetManager = SDK.TargetManager.TargetManager.instance();
            const target = targetManager.rootTarget();
            const runtimeModel = target.model(SDK.RuntimeModel.RuntimeModel);
            return await getExecutionContext(runtimeModel);
        }
        async function executeForTest(action, throwOnSideEffect = false) {
            const functionDeclaration = `async function ($0) {
  try {
    ${action}
    ;
    return ((typeof data !== "undefined") ? data : undefined);
  } catch (error) {
    return error;
  }
}`;
            return await EvaluateAction.EvaluateAction.execute(functionDeclaration, [], await executionContextForTest(), { throwOnSideEffect });
        }
        it('should serialize primitive values correctly', async () => {
            assert.strictEqual(await executeForTest('const data = "string"'), '\'string\'');
            assert.strictEqual(await executeForTest('const data = 999n'), '999n');
            assert.strictEqual(await executeForTest('const data = true'), 'true');
            assert.strictEqual(await executeForTest('const data = undefined'), 'undefined');
            assert.strictEqual(await executeForTest('const data = 42'), '42');
            assert.strictEqual(await executeForTest('const data = Symbol("sym")'), 'Symbol(sym)');
        });
        describe('HTMLElement', () => {
            it('should work with plain nodes', async () => {
                const serializedElement = await executeForTest(`
          const el = document.createElement('div');

          const data = el;
        `);
                assert.strictEqual(serializedElement, '"<div></div>"');
            });
            it('should serialize node with classes', async () => {
                const serializedElement = await executeForTest(`
          const el = document.createElement('div');
          el.classList.add('section');
          el.classList.add('section-main');

          const data = el;
        `);
                assert.strictEqual(serializedElement, '"<div class=\\"section section-main\\"></div>"');
            });
            it('should serialize node with id', async () => {
                const serializedElement = await executeForTest(`
          const el = document.createElement('div');
          el.id = 'promotion-section';

          const data = el;
        `);
                assert.strictEqual(serializedElement, '"<div id=\\"promotion-section\\"></div>"');
            });
            it('should serialize node with class and id', async () => {
                const serializedElement = await executeForTest(`
          const el = document.createElement('div');
          el.id = 'promotion-section';
          el.classList.add('section');

          const data = el;
        `);
                assert.strictEqual(serializedElement, '"<div id=\\"promotion-section\\" class=\\"section\\"></div>"');
            });
            it('should serialize node with children', async () => {
                const serializedElement = await executeForTest(`
          const el = document.createElement('div');
          const p = document.createElement('p');
          el.appendChild(p);

          const data = el;
        `);
                assert.strictEqual(serializedElement, '"<div>...</div>"');
            });
        });
        it('should serialize arrays correctly', async () => {
            assert.strictEqual(await executeForTest('const data = []'), '[]');
            assert.strictEqual(await executeForTest('const data = [1]'), '[1]');
            assert.strictEqual(await executeForTest('const data = [1, 2]'), '[1,2]');
            assert.strictEqual(await executeForTest('const data = [{key: 1}]'), '[{"key":1}]');
        });
        it('should serialize objects correctly', async () => {
            assert.strictEqual(await executeForTest('const object = {key: "str"}; const data = object;'), '{"key":"str"}');
            assert.strictEqual(await executeForTest('const object = {key: "str", secondKey: "str2"}; const data = object;'), '{"key":"str","secondKey":"str2"}');
            assert.strictEqual(await executeForTest('const object = {key: 1}; const data = object;'), '{"key":1}');
        });
        it('should not continue serializing cycles', async () => {
            assert.strictEqual(await executeForTest(`
        const obj = { a: 1 };
        obj.itself = obj;
        const data = obj;
      `), '{"a":1,"itself":"(cycle)"}');
        });
        it('should not include number keys for CSSStyleDeclaration', async () => {
            const result = await executeForTest('const data = getComputedStyle(document.body)');
            const parsedResult = JSON.parse(result);
            assert.isUndefined(parsedResult[0]);
        });
        it('should not trigger a side-effect for returning data', async () => {
            assert.deepEqual(await executeForTest('const data = {}', true), '{}');
        });
        it('should not trigger a side-effect on errors', async () => {
            assert.deepEqual(await executeForTest('throw new Error("test")', true), 'Error: test');
        });
        it('should not trigger a side-effect on syntax errors', async () => {
            assert.deepEqual(await executeForTest('const data = {;', true), 'Error: SyntaxError: Unexpected token \';\'');
        });
    });
});
//# sourceMappingURL=EvaluateAction.test.js.map