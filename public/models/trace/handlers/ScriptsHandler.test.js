// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { TraceLoader } from '../../../testing/TraceLoader.js';
import * as Trace from '../trace.js';
describe('ScriptsHandler', () => {
    beforeEach(async function () {
        Trace.Handlers.ModelHandlers.Meta.reset();
        Trace.Handlers.ModelHandlers.NetworkRequests.reset();
        Trace.Handlers.ModelHandlers.Scripts.reset();
        const events = await TraceLoader.rawEvents(this, 'enhanced-traces.json.gz');
        for (const event of events) {
            Trace.Handlers.ModelHandlers.Meta.handleEvent(event);
            Trace.Handlers.ModelHandlers.NetworkRequests.handleEvent(event);
            Trace.Handlers.ModelHandlers.Scripts.handleEvent(event);
        }
        await Trace.Handlers.ModelHandlers.Meta.finalize();
        await Trace.Handlers.ModelHandlers.NetworkRequests.finalize();
        await Trace.Handlers.ModelHandlers.Scripts.finalize({
            async resolveSourceMap(params) {
                // Don't need to actually make a source map.
                return { test: params.sourceMapUrl };
            }
        });
    });
    afterEach(() => {
        Trace.Handlers.ModelHandlers.Scripts.reset();
    });
    it('collects scripts contents', async function () {
        const data = Trace.Handlers.ModelHandlers.Scripts.data();
        assert.deepEqual([...data.scripts], [
            {
                isolate: '12345',
                scriptId: '1',
                frame: '21D58E83A5C17916277166140F6A464B',
                request: undefined,
                ts: 50442438976,
                url: 'http://localhost:8080/index.html',
                content: 'source text 1',
                sourceMapUrl: 'http://localhost:8080/source.map.json',
                sourceMap: { test: 'http://localhost:8080/source.map.json' }
            },
            {
                isolate: '12345',
                scriptId: '2',
                frame: '21D58E83A5C17916277166140F6A464B',
                request: undefined,
                ts: 50442438976,
                url: 'http://localhost:8080/index.html',
                content: 'source text 2'
            },
            {
                isolate: '6789',
                scriptId: '1',
                frame: '3E1717BE677B75D0536E292E00D6A34A',
                content: ' text ',
                request: undefined,
                ts: 50442438976,
                url: 'http://localhost:8080/index.html',
            }
        ]);
    });
});
//# sourceMappingURL=ScriptsHandler.test.js.map