import { TraceLoader } from '../../testing/TraceLoader.js';
import * as EnhancedTraces from './EnhancedTracesParser.js';
describe('EnhancedTracesParser', () => {
    let enhancedTracesParser;
    const target1 = {
        targetId: '21D58E83A5C17916277166140F6A464B',
        type: 'page',
        isolate: '12345',
        pid: 8050,
        url: 'http://localhost:8080/index.html',
    };
    const target2 = {
        targetId: '3E1717BE677B75D0536E292E00D6A34A',
        type: 'page',
        isolate: '6789',
        pid: 8051,
        url: 'http://localhost:8080/index.html',
    };
    const executionContext1 = {
        id: 1,
        origin: 'http://localhost:8080',
        v8Context: 'example context 1',
        auxData: {
            frameId: '21D58E83A5C17916277166140F6A464B',
            isDefault: true,
            type: 'type',
        },
        isolate: '12345',
    };
    const executionContext2 = {
        id: 2,
        origin: 'http://localhost:8080',
        v8Context: 'example context 2',
        auxData: {
            frameId: '21D58E83A5C17916277166140F6A464B',
            isDefault: true,
            type: 'type',
        },
        isolate: '12345',
    };
    const executionContext3 = {
        id: 1,
        origin: 'http://localhost:8080',
        v8Context: 'example context 3',
        auxData: {
            frameId: '3E1717BE677B75D0536E292E00D6A34A',
            isDefault: true,
            type: 'type',
        },
        isolate: '6789',
    };
    const script1 = {
        scriptId: '1',
        isolate: '12345',
        executionContextId: 1,
        startLine: 0,
        startColumn: 0,
        endLine: 1,
        endColumn: 10,
        hash: '',
        isModule: false,
        url: 'http://localhost:8080/index.html',
        hasSourceUrl: false,
        sourceMapUrl: 'http://localhost:8080/source',
        length: 13,
        sourceText: 'source text 1',
        auxData: {
            frameId: '21D58E83A5C17916277166140F6A464B',
            isDefault: true,
            type: 'type',
        },
    };
    const script2 = {
        scriptId: '2',
        isolate: '12345',
        executionContextId: 2,
        startLine: 0,
        startColumn: 0,
        endLine: 1,
        endColumn: 10,
        hash: '',
        isModule: false,
        url: 'http://localhost:8080/index.html',
        hasSourceUrl: false,
        sourceMapUrl: undefined,
        length: 13,
        sourceText: 'source text 2',
        auxData: {
            frameId: '21D58E83A5C17916277166140F6A464B',
            isDefault: true,
            type: 'type',
        },
    };
    const script3 = {
        scriptId: '1',
        isolate: '6789',
        executionContextId: 1,
        startLine: 0,
        startColumn: 0,
        endLine: 1,
        endColumn: 10,
        hash: '',
        isModule: false,
        url: 'http://localhost:8080/index.html',
        hasSourceUrl: false,
        sourceMapUrl: undefined,
        length: 13,
        sourceText: 'source text 3',
        auxData: {
            frameId: '3E1717BE677B75D0536E292E00D6A34A',
            isDefault: true,
            type: 'type',
        },
    };
    beforeEach(async function () {
        const events = await TraceLoader.rawEvents(this, 'enhanced-traces.json.gz');
        enhancedTracesParser = new EnhancedTraces.EnhancedTracesParser(events);
    });
    it('captures targets from target rundown events', async function () {
        const data = enhancedTracesParser.data().data;
        const targets = [];
        for (const target of data.keys()) {
            targets.push(target);
            if (target.pid === 8050) {
                assert.deepEqual(target, target1);
            }
            else if (target.pid === 8051) {
                assert.deepEqual(target, target2);
            }
        }
        assert.strictEqual(targets.length, 2);
    });
    it('captures execution context info', async function () {
        const data = enhancedTracesParser.data().data;
        let executionContexts = [];
        for (const target of data.keys()) {
            const contextsAndScripts = data.get(target);
            if (contextsAndScripts) {
                executionContexts = [...executionContexts, ...contextsAndScripts[0]];
            }
            else {
                assert.fail('Contexts and Scripts should not be null or undefined');
            }
        }
        assert.strictEqual(executionContexts.length, 3);
        for (const executionContext of executionContexts) {
            if (executionContext.id === 1 && executionContext.isolate === '12345') {
                assert.deepEqual(executionContext, executionContext1);
            }
            else if (executionContext.id === 2 && executionContext.isolate === '12345') {
                assert.deepEqual(executionContext, executionContext2);
            }
            else if (executionContext.id === 1 && executionContext.isolate === '6789') {
                assert.deepEqual(executionContext, executionContext3);
            }
        }
    });
    it('captures script info and source text', async function () {
        const data = enhancedTracesParser.data().data;
        let scripts = [];
        for (const target of data.keys()) {
            const contextsAndScripts = data.get(target);
            if (contextsAndScripts) {
                scripts = [...scripts, ...contextsAndScripts[1]];
            }
            else {
                assert.fail('Contexts and Scripts should not be null or undefined');
            }
        }
        assert.strictEqual(scripts.length, 3);
        for (const script of scripts) {
            if (script.scriptId === '1' && script.isolate === '12345') {
                assert.deepEqual(script, script1);
            }
            else if (script.scriptId === '2' && script.isolate === '12345') {
                assert.deepEqual(script, script2);
            }
            else if (script.scriptId === '1' && script.isolate === '6789') {
                assert.deepEqual(script, script3);
            }
        }
    });
    it('grouped contexts and scripts under the right target', async function () {
        const data = enhancedTracesParser.data().data;
        for (const target of data.keys()) {
            const contextsAndScripts = data.get(target);
            if (contextsAndScripts) {
                const executionContexts = contextsAndScripts[0];
                const scripts = contextsAndScripts[1];
                if (target.pid === 8050) {
                    assert.strictEqual(executionContexts.length, 2);
                    for (const executionContext of executionContexts) {
                        // We should be able to get the correct execution context without specifying isolate
                        // as the contexts and scripts are grouped under its repsective target already.
                        if (executionContext.id === 1) {
                            assert.deepEqual(executionContext, executionContext1);
                        }
                        else if (executionContext.id === 2) {
                            assert.deepEqual(executionContext, executionContext2);
                        }
                    }
                    assert.strictEqual(scripts.length, 2);
                    for (const script of scripts) {
                        if (script.scriptId === '1') {
                            assert.deepEqual(script, script1);
                        }
                        else if (script.scriptId === '2') {
                            assert.deepEqual(script, script2);
                        }
                    }
                }
                else if (target.pid === 8051) {
                    assert.strictEqual(executionContexts.length, 1);
                    assert.strictEqual(scripts.length, 1);
                    assert.deepEqual(executionContexts[0], executionContext3);
                    assert.deepEqual(scripts[0], script3);
                }
            }
            else {
                assert.fail('Contexts and Scripts should not be null or undefined');
            }
        }
    });
});
//# sourceMappingURL=EnhancedTracesParser.test.js.map