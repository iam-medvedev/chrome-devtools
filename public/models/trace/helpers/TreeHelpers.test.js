// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { getEventsIn, makeCompleteEvent, makeProfileCall, prettyPrint, } from '../../../testing/TraceHelpers.js';
import * as Trace from '../trace.js';
describe('TreeHelpers', () => {
    describe('treify', () => {
        it('can build a hierarchy of events without filters', async () => {
            /**
             * |------------- Task A -------------||-- Task E --|
             *  |-- Task B --||-- Task D --|
             *   |- Task C -|
             */
            const data = [
                makeCompleteEvent('A', 0, 10), // 0..10
                makeCompleteEvent('B', 1, 3), // 1..4
                makeCompleteEvent('D', 5, 3), // 5..8
                makeCompleteEvent('C', 2, 1), // 2..3
                makeCompleteEvent('E', 11, 3), // 11..14
            ];
            Trace.Helpers.Trace.sortTraceEventsInPlace(data);
            const { tree } = Trace.Helpers.TreeHelpers.treify(data, { filter: { has: () => true } });
            assert.strictEqual(tree.maxDepth, 3, 'Got the correct tree max depth');
            const rootsEvents = [...tree.roots].map(n => n ? n.entry : null);
            assert.deepEqual(rootsEvents.map(e => e ? { name: e.name, ts: e.ts, dur: e.dur } : null), [
                { name: 'A', ts: 0, dur: 10 },
                { name: 'E', ts: 11, dur: 3 },
            ]);
            const nodeA = [...tree.roots].at(0);
            const nodeE = [...tree.roots].at(1);
            if (!nodeA || !nodeE) {
                assert(false, 'Root nodes were not found');
                return;
            }
            const childrenOfA = getEventsIn(nodeA.children.values());
            assert.deepEqual(childrenOfA.map(e => e ? { name: e.name, ts: e.ts, dur: e.dur } : null), [
                { name: 'B', ts: 1, dur: 3 },
                { name: 'D', ts: 5, dur: 3 },
            ]);
            const childrenOfE = getEventsIn(nodeE.children.values());
            assert.deepEqual(childrenOfE, []);
            const nodeB = [...nodeA.children].at(0);
            const nodeD = [...nodeA.children].at(1);
            if (!nodeB || !nodeD) {
                assert(false, 'Child nodes were not found');
                return;
            }
            const childrenOfB = getEventsIn(nodeB.children.values());
            assert.deepEqual(childrenOfB.map(e => e ? { name: e.name, ts: e.ts, dur: e.dur } : null), [
                { name: 'C', ts: 2, dur: 1 },
            ]);
            const childrenOfD = getEventsIn(nodeD.children.values());
            assert.deepEqual(childrenOfD, []);
            const nodeC = [...nodeB.children].at(0);
            if (!nodeC) {
                assert(false, 'Child nodes were not found');
                return;
            }
            const childrenOfC = getEventsIn(nodeC.children.values());
            assert.deepEqual(childrenOfC, []);
        });
        it('can build a hierarchy of events with filters', async () => {
            /**
             * |------------- Task A -------------||-- ?????? --|
             *  |-- ?????? --||-- Task D --|
             *   |- ?????? -|
             */
            const data = [
                makeCompleteEvent('A', 0, 10), // 0..10
                makeCompleteEvent('B', 1, 3), // 1..4
                makeCompleteEvent('D', 5, 3), // 5..8
                makeCompleteEvent('C', 2, 1), // 2..3
                makeCompleteEvent('E', 11, 3), // 11..14
            ];
            Trace.Helpers.Trace.sortTraceEventsInPlace(data);
            const filter = new Set(['A', 'D']);
            const { tree } = Trace.Helpers.TreeHelpers.treify(data, { filter });
            assert.strictEqual(tree.maxDepth, 2, 'Got the correct tree max depth');
            const rootsEvents = [...tree.roots].map(n => n.entry);
            assert.deepEqual(rootsEvents.map(e => e ? { name: e.name, ts: e.ts, dur: e.dur } : null), [
                { name: 'A', ts: 0, dur: 10 },
            ]);
            const nodeA = [...tree.roots].at(0);
            if (!nodeA) {
                assert(false, 'Root nodes were not found');
                return;
            }
            const childrenOfA = getEventsIn(nodeA.children.values());
            assert.deepEqual(childrenOfA.map(e => e ? { name: e.name, ts: e.ts, dur: e.dur } : null), [
                { name: 'D', ts: 5, dur: 3 },
            ]);
            const nodeD = [...nodeA.children].at(0);
            if (!nodeD) {
                assert(false, 'Child nodes were not found');
                return;
            }
            const childrenOfD = getEventsIn(nodeD.children.values());
            assert.deepEqual(childrenOfD, []);
        });
        it('can build a hierarchy of events that start and end close to each other', async () => {
            /**
             * |------------- Task A -------------||-- Task E --|
             * |-- Task B --||-- Task D --|
             *   |- Task C -|
             */
            const data = [
                makeCompleteEvent('A', 0, 10), // 0..10
                makeCompleteEvent('B', 0, 3), // 0..3 (starts same time as A)
                makeCompleteEvent('D', 3, 3), // 3..6 (starts when B finishes)
                makeCompleteEvent('C', 2, 1), // 2..3 (finishes when B finishes)
                makeCompleteEvent('E', 10, 3), // 10..13 (starts when A finishes)
            ];
            Trace.Helpers.Trace.sortTraceEventsInPlace(data);
            const { tree } = Trace.Helpers.TreeHelpers.treify(data, { filter: { has: () => true } });
            assert.strictEqual(tree.maxDepth, 3, 'Got the correct tree max depth');
            const rootsEvents = [...tree.roots].map(n => n.entry);
            assert.deepEqual(rootsEvents.map(e => e ? { name: e.name, ts: e.ts, dur: e.dur } : null), [
                { name: 'A', ts: 0, dur: 10 },
                { name: 'E', ts: 10, dur: 3 },
            ]);
            const nodeA = [...tree.roots].at(0);
            const nodeE = [...tree.roots].at(1);
            if (!nodeA || !nodeE) {
                assert(false, 'Root nodes were not found');
                return;
            }
            const childrenOfA = getEventsIn(nodeA.children.values());
            assert.deepEqual(childrenOfA.map(e => e ? { name: e.name, ts: e.ts, dur: e.dur } : null), [
                { name: 'B', ts: 0, dur: 3 },
                { name: 'D', ts: 3, dur: 3 },
            ]);
            const childrenOfE = getEventsIn(nodeE.children.values());
            assert.deepEqual(childrenOfE, []);
            const nodeB = [...nodeA.children].at(0);
            const nodeD = [...nodeA.children].at(1);
            if (!nodeB || !nodeD) {
                assert(false, 'Child nodes were not found');
                return;
            }
            const childrenOfB = getEventsIn(nodeB.children.values());
            assert.deepEqual(childrenOfB.map(e => e ? { name: e.name, ts: e.ts, dur: e.dur } : null), [
                { name: 'C', ts: 2, dur: 1 },
            ]);
            const childrenOfD = getEventsIn(nodeD.children.values());
            assert.deepEqual(childrenOfD, []);
            const nodeC = [...nodeB.children].at(0);
            if (!nodeC) {
                assert(false, 'Child nodes were not found');
                return;
            }
            const childrenOfC = getEventsIn(nodeC.children.values());
            assert.deepEqual(childrenOfC, []);
        });
        it('correctly calculates the total and self times of a hierarchy of events', async () => {
            /**
             * |------------- Task A -------------||-- Task E --|
             * |-- Task B --||-- Task D --|
             *   |- Task C -|
             */
            const data = [
                makeCompleteEvent('A', 0, 10), // 0..10
                makeCompleteEvent('B', 0, 3), // 0..3 (starts same time as A)
                makeCompleteEvent('D', 3, 3), // 3..6 (starts when B finishes)
                makeCompleteEvent('C', 2, 1), // 2..3 (finishes when B finishes)
                makeCompleteEvent('E', 10, 3), // 10..13 (starts when A finishes)
            ];
            Trace.Helpers.Trace.sortTraceEventsInPlace(data);
            const { tree } = Trace.Helpers.TreeHelpers.treify(data, { filter: { has: () => true } });
            const nodeA = [...tree.roots].at(0);
            const nodeE = [...tree.roots].at(1);
            if (!nodeA || !nodeE) {
                assert(false, 'Root nodes were not found');
                return;
            }
            const taskA = nodeA.entry;
            const taskE = nodeE.entry;
            const nodeD = [...nodeA.children].at(1);
            const nodeB = [...nodeA.children].at(0);
            if (!nodeB || !nodeD) {
                assert(false, 'Child nodes were not found');
                return;
            }
            const taskD = nodeD.entry;
            const taskB = nodeB.entry;
            const nodeC = [...nodeB.children].at(0);
            if (!nodeC) {
                assert(false, 'Child nodes were not found');
                return;
            }
            const taskC = nodeC.entry;
            const taskCTotalTime = taskC.dur;
            if (taskCTotalTime === undefined) {
                assert.fail('Total time for task was not found');
                return;
            }
            assert.strictEqual(taskCTotalTime, Trace.Types.Timing.MicroSeconds(1));
            assert.strictEqual(nodeC.selfTime, taskCTotalTime);
            const taskBTotalTime = taskB.dur;
            if (taskBTotalTime === undefined) {
                assert.fail('Total time for task was not found');
                return;
            }
            assert.strictEqual(taskBTotalTime, Trace.Types.Timing.MicroSeconds(3));
            assert.strictEqual(nodeB.selfTime, Trace.Types.Timing.MicroSeconds(taskBTotalTime - taskCTotalTime));
            const taskDTotalTime = taskD.dur;
            if (taskDTotalTime === undefined) {
                assert.fail('Total time for task was not found');
                return;
            }
            assert.strictEqual(taskDTotalTime, Trace.Types.Timing.MicroSeconds(3));
            assert.strictEqual(nodeD.selfTime, taskDTotalTime);
            const taskATotalTime = taskA.dur;
            if (taskATotalTime === undefined) {
                assert.fail('Total time for task was not found');
                return;
            }
            assert.strictEqual(taskATotalTime, Trace.Types.Timing.MicroSeconds(10));
            assert.strictEqual(nodeA.selfTime, Trace.Types.Timing.MicroSeconds(taskATotalTime - taskBTotalTime - taskDTotalTime));
            const taskETotalTime = taskE.dur;
            if (taskETotalTime === undefined) {
                assert.fail('Total time for task was not found');
                return;
            }
            assert.strictEqual(taskETotalTime, Trace.Types.Timing.MicroSeconds(3));
            assert.strictEqual(nodeD.selfTime, taskETotalTime);
        });
        describe('building hierarchies trace events and profile calls', () => {
            it('builds a hierarchy from trace events and profile calls', async () => {
                const evaluateScript = makeCompleteEvent("EvaluateScript" /* Trace.Types.Events.Name.EVALUATE_SCRIPT */, 0, 500);
                const v8Run = makeCompleteEvent('v8.run', 10, 490);
                const parseFunction = makeCompleteEvent('V8.ParseFunction', 12, 1);
                const traceEvents = [evaluateScript, v8Run, parseFunction];
                const profileCalls = [makeProfileCall('a', 100, 200), makeProfileCall('b', 300, 200)];
                const allEntries = Trace.Helpers.Trace.mergeEventsInOrder(traceEvents, profileCalls);
                const { tree } = Trace.Helpers.TreeHelpers.treify(allEntries, { filter: { has: () => true } });
                assert.strictEqual(prettyPrint(tree), `
-EvaluateScript [0.5ms]
  -v8.run [0.49ms]
    -V8.ParseFunction [0.001ms]
    -ProfileCall (a) [0.2ms]
    -ProfileCall (b) [0.2ms]`);
            });
            it('builds a hierarchy from only profile calls', async () => {
                const allEntries = [
                    makeProfileCall('a', 100, 200),
                    makeProfileCall('b', 300, 200),
                    makeProfileCall('c', 300, 200),
                    makeProfileCall('d', 400, 100),
                ];
                const { tree } = Trace.Helpers.TreeHelpers.treify(allEntries, { filter: { has: () => true } });
                assert.strictEqual(prettyPrint(tree), `
-ProfileCall (a) [0.2ms]
-ProfileCall (b) [0.2ms]
  -ProfileCall (c) [0.2ms]
    -ProfileCall (d) [0.1ms]`);
            });
        });
    });
    describe('walking trees', () => {
        it('walkEntireTree walks the entire tree and visits all the roots as well as all children', async () => {
            /**
             * |------------- Task A -------------||-- Task E --|
             *  |-- Task B --||-- Task D --|
             *   |- Task C -|
             */
            const data = [
                makeCompleteEvent('A', 0, 10), // 0..10
                makeCompleteEvent('B', 1, 3), // 1..4
                makeCompleteEvent('D', 5, 3), // 5..8
                makeCompleteEvent('C', 2, 1), // 2..3
                makeCompleteEvent('E', 11, 3), // 11..14
            ];
            Trace.Helpers.Trace.sortTraceEventsInPlace(data);
            const { tree, entryToNode } = Trace.Helpers.TreeHelpers.treify(data, { filter: { has: () => true } });
            const callOrder = [];
            function onEntryStart(entry) {
                callOrder.push({ type: 'START', entryName: entry.name });
            }
            function onEntryEnd(entry) {
                callOrder.push({ type: 'END', entryName: entry.name });
            }
            Trace.Helpers.TreeHelpers.walkEntireTree(entryToNode, tree, onEntryStart, onEntryEnd);
            assert.deepEqual(callOrder, [
                { type: 'START', entryName: 'A' },
                { type: 'START', entryName: 'B' },
                { type: 'START', entryName: 'C' },
                { type: 'END', entryName: 'C' },
                { type: 'END', entryName: 'B' },
                { type: 'START', entryName: 'D' },
                { type: 'END', entryName: 'D' },
                { type: 'END', entryName: 'A' },
                { type: 'START', entryName: 'E' },
                { type: 'END', entryName: 'E' },
            ]);
        });
        it('walkEntireTree can take a trace window and will only run for events in that window', async () => {
            /**
             *                | min: 5 - max 10| <<<< custom trace window
             * |------------- Task A -------------||-- Task E --|
             *  |-- Task B --||-- Task D --|
             *   |- Task C -|
             */
            const data = [
                makeCompleteEvent('A', 0, 10), // 0..10
                makeCompleteEvent('B', 1, 3), // 1..4
                makeCompleteEvent('D', 5, 3), // 5..8
                makeCompleteEvent('C', 2, 1), // 2..3
                makeCompleteEvent('E', 11, 3), // 11..14
            ];
            Trace.Helpers.Trace.sortTraceEventsInPlace(data);
            const { tree, entryToNode } = Trace.Helpers.TreeHelpers.treify(data, { filter: { has: () => true } });
            const callOrder = [];
            function onEntryStart(entry) {
                callOrder.push({ type: 'START', entryName: entry.name });
            }
            function onEntryEnd(entry) {
                callOrder.push({ type: 'END', entryName: entry.name });
            }
            Trace.Helpers.TreeHelpers.walkEntireTree(entryToNode, tree, onEntryStart, onEntryEnd, {
                min: Trace.Types.Timing.MicroSeconds(5),
                max: Trace.Types.Timing.MicroSeconds(10),
                range: Trace.Types.Timing.MicroSeconds(5),
            });
            assert.deepEqual(callOrder, [
                { type: 'START', entryName: 'A' },
                { type: 'START', entryName: 'D' },
                { type: 'END', entryName: 'D' },
                { type: 'END', entryName: 'A' },
            ]);
        });
        it('walkTreeFromEntry walks the tree down and then back up and calls onEntryStart and onEntryEnd', async () => {
            /**
             * |------------- Task A -------------||-- Task E --|
             *  |-- Task B --||-- Task D --|
             *   |- Task C -|
             */
            const data = [
                makeCompleteEvent('A', 0, 10), // 0..10
                makeCompleteEvent('B', 1, 3), // 1..4
                makeCompleteEvent('D', 5, 3), // 5..8
                makeCompleteEvent('C', 2, 1), // 2..3
                makeCompleteEvent('E', 11, 3), // 11..14
            ];
            Trace.Helpers.Trace.sortTraceEventsInPlace(data);
            const { tree, entryToNode } = Trace.Helpers.TreeHelpers.treify(data, { filter: { has: () => true } });
            const callOrder = [];
            function onEntryStart(entry) {
                callOrder.push({ type: 'START', entryName: entry.name });
            }
            function onEntryEnd(entry) {
                callOrder.push({ type: 'END', entryName: entry.name });
            }
            const rootNode = Array.from(tree.roots).at(0);
            if (!rootNode) {
                throw new Error('Could not find root node');
            }
            assert.strictEqual(rootNode.entry.name, 'A');
            Trace.Helpers.TreeHelpers.walkTreeFromEntry(entryToNode, rootNode.entry, onEntryStart, onEntryEnd);
            assert.deepEqual(callOrder, [
                { type: 'START', entryName: 'A' },
                { type: 'START', entryName: 'B' },
                { type: 'START', entryName: 'C' },
                { type: 'END', entryName: 'C' },
                { type: 'END', entryName: 'B' },
                { type: 'START', entryName: 'D' },
                { type: 'END', entryName: 'D' },
                { type: 'END', entryName: 'A' },
            ]);
        });
    });
    describe('canBuildTreesFromEvents', () => {
        it('returns true if no pair of events (e1, e2) exists such that e1 overlaps with e2 without one fully containing the other', () => {
            const data = [
                makeCompleteEvent('a', 0, 100),
                makeCompleteEvent('b', 0, 50),
                makeCompleteEvent('c', 0, 25),
                makeCompleteEvent('d', 26, 24),
                makeCompleteEvent('e', 51, 49),
                makeCompleteEvent('f', 51, 24),
                makeCompleteEvent('g', 76, 24),
            ];
            assert.isTrue(Trace.Helpers.TreeHelpers.canBuildTreesFromEvents(data));
        });
        it('returns false if a pair of events (e1, e2) exists such that e1 overlaps with e2 without one fully containing the other', () => {
            const data = [
                makeCompleteEvent('a', 0, 100),
                makeCompleteEvent('b', 0, 50),
                makeCompleteEvent('c', 0, 25),
                // d overlaps with b but isn't fully contained by it.
                makeCompleteEvent('d', 26, 50),
                makeCompleteEvent('e', 51, 49),
                makeCompleteEvent('f', 51, 24),
                makeCompleteEvent('g', 76, 24),
            ];
            assert.isFalse(Trace.Helpers.TreeHelpers.canBuildTreesFromEvents(data));
        });
    });
    describe('buildTreesFromEventsForAI', () => {
        it('returns the trace entry tree starting from the root task, highlighting the selected event', () => {
            const evaluateScript = makeCompleteEvent("EvaluateScript" /* Trace.Types.Events.Name.EVALUATE_SCRIPT */, 0, 500);
            const v8Run = makeCompleteEvent('v8.run', 10, 490);
            const parseFunction = makeCompleteEvent('V8.ParseFunction', 12, 1);
            const traceEvents = [evaluateScript, v8Run, parseFunction];
            const profileCalls = [makeProfileCall('a', 100, 200), makeProfileCall('b', 300, 200)];
            // Roughly this looks like:
            // 0                                          500
            // |------------- EvaluateScript -------------|
            //  |-        v8.run                         -|
            //    |--|   |-    a   -||-          b        |
            //      ^ V8.ParseFunction
            const allEntries = Trace.Helpers.Trace.mergeEventsInOrder(traceEvents, profileCalls);
            const { tree, entryToNode } = Trace.Helpers.TreeHelpers.treify(allEntries, { filter: { has: () => true } });
            const rootNode = entryToNode.get(evaluateScript);
            // Select something from the middle.
            const selectedNode = entryToNode.get(v8Run);
            assert.strictEqual(tree.roots.size, 1);
            assert.exists(rootNode);
            assert.exists(selectedNode);
            const aiNodeTree = Trace.Helpers.TreeHelpers.AINode.fromEntryNode(selectedNode, () => true);
            const v8RunNode = Trace.Helpers.TreeHelpers.AINode.getSelectedNodeWithinTree(aiNodeTree);
            assert.exists(aiNodeTree);
            assert.exists(v8RunNode);
            // First check the serialization as a while.
            assert.deepEqual(JSON.parse(JSON.stringify(aiNodeTree)), {
                name: 'EvaluateScript',
                dur: 0.5,
                self: 0,
                children: [{
                        selected: true,
                        name: 'v8.run',
                        dur: 0.5,
                        self: 0.1,
                        children: [
                            { name: 'V8.ParseFunction', dur: 0, self: 0 },
                            { name: 'a', url: '', dur: 0.2, self: 0.2 },
                            { name: 'b', url: '', dur: 0.2, self: 0.2 },
                        ],
                    }],
            });
            // Now we can make sure the pre-serialized data is also correct.
            assert.strictEqual(v8RunNode.name, 'v8.run');
            assert.strictEqual(v8RunNode.selected, true);
            assert.strictEqual(v8RunNode.duration, 0.49);
            assert.strictEqual(v8RunNode.children?.length, 3);
            assert.strictEqual(aiNodeTree.name, 'EvaluateScript');
            assert.strictEqual(aiNodeTree.selected, undefined);
            assert.strictEqual(aiNodeTree.duration, 0.5);
            assert.strictEqual(aiNodeTree.children?.length, 1);
            const parseFnAINode = v8RunNode.children?.at(0);
            assert.exists(v8RunNode);
            assert.strictEqual(parseFnAINode.name, 'V8.ParseFunction');
            assert.strictEqual(parseFnAINode.selected, undefined);
            assert.strictEqual(parseFnAINode.duration, 0.001);
            assert.strictEqual(parseFnAINode.children, undefined);
        });
    });
});
//# sourceMappingURL=TreeHelpers.test.js.map