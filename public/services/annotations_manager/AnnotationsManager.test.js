// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TraceEngine from '../../models/trace/trace.js';
import * as TraceBounds from '../../services/trace_bounds/trace_bounds.js';
import { TraceLoader } from '../../testing/TraceLoader.js';
import * as AnnotationsManager from './annotations_manager.js';
function getMainThread(data) {
    let mainThread = null;
    for (const [, process] of data.processes) {
        for (const [, thread] of process.threads) {
            if (thread.name === 'CrRendererMain') {
                mainThread = thread;
                break;
            }
        }
    }
    if (!mainThread) {
        throw new Error('Could not find main thread.');
    }
    return mainThread;
}
function findFirstEntry(allEntries, predicate) {
    const entry = allEntries.find(entry => predicate(entry));
    if (!entry) {
        throw new Error('Could not find expected entry.');
    }
    return entry;
}
const baseTraceWindow = {
    min: TraceEngine.Types.Timing.MicroSeconds(0),
    max: TraceEngine.Types.Timing.MicroSeconds(10_000),
    range: TraceEngine.Types.Timing.MicroSeconds(10_000),
};
describe('AnnotationsManager', () => {
    it('correctly generates an entry hash', async function () {
        const data = await TraceLoader.traceEngine(null, 'basic-stack.json.gz');
        const boundsManager = TraceBounds.TraceBounds.BoundsManager.instance({ forceNew: true }).resetWithNewBounds(baseTraceWindow);
        const annotationsManager = AnnotationsManager.AnnotationsManager.AnnotationsManager.maybeInstance({ entryToNodeMap: data.Renderer.entryToNode, wholeTraceBounds: boundsManager.state()?.micro.entireTraceBounds });
        if (!annotationsManager) {
            throw new Error('Manager does not exist.');
        }
        const mainThread = getMainThread(data.Renderer);
        assert.exists(annotationsManager);
        // Find first 'Timer Fired' entry in the trace
        const timerFireEntry = findFirstEntry(mainThread.entries, entry => {
            return entry.name === 'TimerFire';
        });
        const entryHash = annotationsManager.getEntryIndex(timerFireEntry);
        assert.strictEqual(3649, entryHash);
    });
});
//# sourceMappingURL=AnnotationsManager.test.js.map