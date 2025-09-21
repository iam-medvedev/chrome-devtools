import { TraceLoader } from '../../testing/TraceLoader.js';
import * as SDK from './sdk.js';
describe('EnhancedTracesParser', () => {
    let enhancedTracesParser;
    const target1 = {
        targetId: '21D58E83A5C17916277166140F6A464B',
        type: 'page',
        pid: 8050,
        url: 'http://localhost:8080/index.html',
    };
    const target2 = {
        targetId: '3E1717BE677B75D0536E292E00D6A34A',
        type: 'iframe',
        pid: 8051,
        url: 'http://localhost:8080/test.html',
    };
    const target3 = {
        targetId: '6A7611591E1EBABAACBAB2B23F0AEC93',
        type: 'iframe',
        pid: 8052,
        url: 'test1',
    };
    const executionContext1 = {
        id: 1,
        origin: 'http://localhost:8080',
        v8Context: 'example context 1',
        name: 'http://localhost:8080',
        uniqueId: 'example context 1-12345',
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
        name: 'http://localhost:8080',
        uniqueId: 'example context 2-12345',
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
        name: 'http://localhost:8080',
        uniqueId: 'example context 3-6789',
        auxData: {
            frameId: '3E1717BE677B75D0536E292E00D6A34A',
            isDefault: true,
            type: 'type',
        },
        isolate: '6789',
    };
    const executionContext4 = {
        id: 1,
        origin: '',
        v8Context: '',
        name: '',
        uniqueId: '6A7611591E1EBABAACBAB2B23F0AEC93-1357',
        auxData: {
            frameId: '6A7611591E1EBABAACBAB2B23F0AEC93',
            isDefault: false,
            type: 'type',
        },
        isolate: '1357',
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
        buildId: '',
        isModule: false,
        url: 'http://localhost:8080/index.html',
        hasSourceURL: false,
        sourceURL: '',
        sourceMapURL: 'http://localhost:8080/source.map.json',
        length: 13,
        pid: 8050,
        sourceText: 'source text 1',
        executionContextAuxData: {
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
        buildId: '',
        isModule: false,
        url: 'http://localhost:8080/index.html',
        hasSourceURL: false,
        sourceURL: '',
        sourceMapURL: undefined,
        length: 13,
        pid: 8050,
        sourceText: 'source text 2',
        executionContextAuxData: {
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
        buildId: '',
        isModule: false,
        url: 'http://localhost:8080/index.html',
        hasSourceURL: false,
        sourceURL: '',
        sourceMapURL: undefined,
        length: 13,
        pid: 8051,
        sourceText: 'source text 3',
        executionContextAuxData: {
            frameId: '3E1717BE677B75D0536E292E00D6A34A',
            isDefault: true,
            type: 'type',
        },
    };
    const script4 = {
        scriptId: '3',
        isolate: '12345',
        executionContextId: 1,
        startLine: 0,
        startColumn: 0,
        endLine: 1,
        endColumn: 10,
        hash: '',
        buildId: '',
        isModule: false,
        url: 'http://localhost:8080/index.html',
        hasSourceURL: false,
        sourceURL: '',
        sourceMapURL: 'http://localhost:8080/source.map.json',
        pid: 8050,
        executionContextAuxData: {
            frameId: '21D58E83A5C17916277166140F6A464B',
            isDefault: true,
            type: 'type',
        },
    };
    const script5 = {
        scriptId: '4',
        isolate: '12345',
        executionContextId: 1,
        startLine: 0,
        startColumn: 0,
        endLine: 1,
        endColumn: 10,
        hash: '',
        buildId: '',
        isModule: false,
        url: 'http://localhost:8080/index.html',
        hasSourceURL: false,
        sourceURL: '',
        sourceMapURL: 'http://localhost:8080/source.map.json',
        pid: 8050,
        executionContextAuxData: {
            frameId: '21D58E83A5C17916277166140F6A464B',
            isDefault: true,
            type: 'type',
        },
    };
    const script6 = {
        scriptId: '1',
        isolate: '1357',
        executionContextId: 1,
        startLine: 0,
        startColumn: 0,
        endLine: 1,
        endColumn: 10,
        hash: '',
        buildId: '',
        isModule: false,
        url: 'http://localhost:8080/index.html',
        hasSourceURL: false,
        sourceURL: '',
        sourceMapURL: 'http://localhost:8080/source.map.json',
        pid: 8052,
    };
    beforeEach(async function () {
        const events = await TraceLoader.rawEvents(this, 'enhanced-traces.json.gz');
        enhancedTracesParser =
            new SDK.EnhancedTracesParser.EnhancedTracesParser({ traceEvents: events, metadata: {} });
    });
    it('captures correct targets', async function () {
        const data = enhancedTracesParser.data();
        const targets = [];
        for (const hydrationData of data) {
            const target = hydrationData.target;
            targets.push(target);
            if (target.pid === 8050) {
                assert.deepEqual(target, target1);
            }
            else if (target.pid === 8051) {
                assert.deepEqual(target, target2);
            }
            else if (target.pid === 8052) {
                assert.deepEqual(target, target3);
            }
        }
        assert.lengthOf(targets, 3);
    });
    it('captures execution context info', async function () {
        const data = enhancedTracesParser.data();
        let executionContexts = [];
        for (const hydrationData of data) {
            executionContexts = [...executionContexts, ...hydrationData.executionContexts];
        }
        assert.lengthOf(executionContexts, 4);
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
        const data = enhancedTracesParser.data();
        let scripts = [];
        for (const hydrationData of data) {
            scripts = [...scripts, ...hydrationData.scripts];
        }
        assert.lengthOf(scripts, 6);
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
    it('groups contexts and scripts under the right target', async function () {
        const data = enhancedTracesParser.data();
        for (const hydrationData of data) {
            const target = hydrationData.target;
            const executionContexts = hydrationData.executionContexts;
            const scripts = hydrationData.scripts;
            if (target.pid === 8050) {
                assert.lengthOf(executionContexts, 2);
                for (const executionContext of executionContexts) {
                    // We should be able to get the correct execution context without specifying isolate
                    // as the contexts and scripts are grouped under its respective target already.
                    if (executionContext.id === 1) {
                        assert.deepEqual(executionContext, executionContext1);
                    }
                    else if (executionContext.id === 2) {
                        assert.deepEqual(executionContext, executionContext2);
                    }
                }
                assert.lengthOf(scripts, 4);
                for (const script of scripts) {
                    if (script.scriptId === '1') {
                        assert.deepEqual(script, script1);
                    }
                    else if (script.scriptId === '2') {
                        assert.deepEqual(script, script2);
                    }
                    else if (script.scriptId === '3') {
                        // This script should be grouped under this target given the clue from FunctionCall
                        // trace event.
                        assert.deepEqual(script, script4);
                    }
                    else if (script.scriptId === '4') {
                        // This script should be grouped under this target given the execution context @
                        // isoalte info.
                        assert.deepEqual(script, script5);
                    }
                }
            }
            else if (target.pid === 8051) {
                assert.lengthOf(executionContexts, 1);
                assert.lengthOf(scripts, 1);
                assert.deepEqual(executionContexts[0], executionContext3);
                assert.deepEqual(scripts[0], script3);
            }
            else if (target.pid === 8052) {
                assert.lengthOf(executionContexts, 1);
                assert.lengthOf(scripts, 1);
                assert.deepEqual(executionContexts[0], executionContext4);
                // This script should be grouped under this target given the PID info.
                assert.deepEqual(scripts[0], script6);
            }
        }
    });
});
//# sourceMappingURL=EnhancedTracesParser.test.js.map