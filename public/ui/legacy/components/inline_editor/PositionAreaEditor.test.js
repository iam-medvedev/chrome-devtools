// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import sinon from 'sinon';
import { assertScreenshot, renderElementIntoDOM } from '../../../../testing/DOMHelpers.js';
import { setupLocaleHooks } from '../../../../testing/LocaleHelpers.js';
import { createViewFunctionStub } from '../../../../testing/ViewFunctionHelpers.js';
import * as InlineEditor from './inline_editor.js';
const { Mode, Axis, parsePositionArea, stringifyPositionArea, } = InlineEditor.PositionAreaEditor;
describe('PositionAreaEditor', () => {
    setupLocaleHooks();
    describe('parsePositionArea', () => {
        it('parses single physical keywords', () => {
            assert.deepEqual(parsePositionArea('top'), {
                first: { start: 0, end: 0, mode: "physical" /* Mode.PHYSICAL */, self: false },
                second: { start: 0, end: 2, mode: "physical" /* Mode.PHYSICAL */, self: false },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
            assert.deepEqual(parsePositionArea('bottom'), {
                first: { start: 2, end: 2, mode: "physical" /* Mode.PHYSICAL */, self: false },
                second: { start: 0, end: 2, mode: "physical" /* Mode.PHYSICAL */, self: false },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
            assert.deepEqual(parsePositionArea('left'), {
                first: { start: 0, end: 0, mode: "physical" /* Mode.PHYSICAL */, self: false },
                second: { start: 0, end: 2, mode: "physical" /* Mode.PHYSICAL */, self: false },
                primaryAxis: "inline" /* Axis.INLINE */,
            });
            assert.deepEqual(parsePositionArea('right'), {
                first: { start: 2, end: 2, mode: "physical" /* Mode.PHYSICAL */, self: false },
                second: { start: 0, end: 2, mode: "physical" /* Mode.PHYSICAL */, self: false },
                primaryAxis: "inline" /* Axis.INLINE */,
            });
            assert.deepEqual(parsePositionArea('span-top'), {
                first: { start: 0, end: 1, mode: "physical" /* Mode.PHYSICAL */, self: false },
                second: { start: 0, end: 2, mode: "physical" /* Mode.PHYSICAL */, self: false },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
            assert.deepEqual(parsePositionArea('span-right'), {
                first: { start: 1, end: 2, mode: "physical" /* Mode.PHYSICAL */, self: false },
                second: { start: 0, end: 2, mode: "physical" /* Mode.PHYSICAL */, self: false },
                primaryAxis: "inline" /* Axis.INLINE */,
            });
        });
        it('parses center and span-all shortcuts', () => {
            assert.deepEqual(parsePositionArea('center'), {
                first: { start: 1, end: 1, mode: "auto" /* Mode.AUTO */, self: false },
                second: { start: 1, end: 1, mode: "auto" /* Mode.AUTO */, self: false },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
            assert.deepEqual(parsePositionArea('span-all'), {
                first: { start: 0, end: 2, mode: "auto" /* Mode.AUTO */, self: false },
                second: { start: 0, end: 2, mode: "auto" /* Mode.AUTO */, self: false },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
            assert.deepEqual(parsePositionArea('start'), {
                first: { start: 0, end: 0, mode: "auto" /* Mode.AUTO */, self: false },
                second: { start: 0, end: 0, mode: "auto" /* Mode.AUTO */, self: false },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
        });
        it('parses two physical keywords preserving authored order', () => {
            assert.deepEqual(parsePositionArea('top left'), {
                first: { start: 0, end: 0, mode: "physical" /* Mode.PHYSICAL */, self: false },
                second: { start: 0, end: 0, mode: "physical" /* Mode.PHYSICAL */, self: false },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
            assert.deepEqual(parsePositionArea('left top'), {
                first: { start: 0, end: 0, mode: "physical" /* Mode.PHYSICAL */, self: false },
                second: { start: 0, end: 0, mode: "physical" /* Mode.PHYSICAL */, self: false },
                primaryAxis: "inline" /* Axis.INLINE */,
            });
            assert.deepEqual(parsePositionArea('bottom center'), {
                first: { start: 2, end: 2, mode: "physical" /* Mode.PHYSICAL */, self: false },
                second: { start: 1, end: 1, mode: "physical" /* Mode.PHYSICAL */, self: false },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
            assert.deepEqual(parsePositionArea('center right'), {
                first: { start: 1, end: 1, mode: "physical" /* Mode.PHYSICAL */, self: false },
                second: { start: 2, end: 2, mode: "physical" /* Mode.PHYSICAL */, self: false },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
            assert.deepEqual(parsePositionArea('span-bottom span-left'), {
                first: { start: 1, end: 2, mode: "physical" /* Mode.PHYSICAL */, self: false },
                second: { start: 0, end: 1, mode: "physical" /* Mode.PHYSICAL */, self: false },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
        });
        it('parses coordinate keywords', () => {
            assert.deepEqual(parsePositionArea('y-start x-end'), {
                first: { start: 0, end: 0, mode: "coordinate" /* Mode.COORDINATE */, self: false },
                second: { start: 2, end: 2, mode: "coordinate" /* Mode.COORDINATE */, self: false },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
            assert.deepEqual(parsePositionArea('span-x-start y-end'), {
                first: { start: 0, end: 1, mode: "coordinate" /* Mode.COORDINATE */, self: false },
                second: { start: 2, end: 2, mode: "coordinate" /* Mode.COORDINATE */, self: false },
                primaryAxis: "inline" /* Axis.INLINE */,
            });
        });
        it('parses logical keywords', () => {
            assert.deepEqual(parsePositionArea('block-start inline-end'), {
                first: { start: 0, end: 0, mode: "logical" /* Mode.LOGICAL */, self: false },
                second: { start: 2, end: 2, mode: "logical" /* Mode.LOGICAL */, self: false },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
            assert.deepEqual(parsePositionArea('inline-start span-block-end'), {
                first: { start: 0, end: 0, mode: "logical" /* Mode.LOGICAL */, self: false },
                second: { start: 1, end: 2, mode: "logical" /* Mode.LOGICAL */, self: false },
                primaryAxis: "inline" /* Axis.INLINE */,
            });
            assert.deepEqual(parsePositionArea('block-end'), {
                first: { start: 2, end: 2, mode: "logical" /* Mode.LOGICAL */, self: false },
                second: { start: 0, end: 2, mode: "logical" /* Mode.LOGICAL */, self: false },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
        });
        it('parses auto keywords', () => {
            assert.deepEqual(parsePositionArea('start end'), {
                first: { start: 0, end: 0, mode: "auto" /* Mode.AUTO */, self: false },
                second: { start: 2, end: 2, mode: "auto" /* Mode.AUTO */, self: false },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
            assert.deepEqual(parsePositionArea('span-start center'), {
                first: { start: 0, end: 1, mode: "auto" /* Mode.AUTO */, self: false },
                second: { start: 1, end: 1, mode: "auto" /* Mode.AUTO */, self: false },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
        });
        it('parses self-* keywords', () => {
            assert.deepEqual(parsePositionArea('self-block-start self-inline-end'), {
                first: { start: 0, end: 0, mode: "logical" /* Mode.LOGICAL */, self: true },
                second: { start: 2, end: 2, mode: "logical" /* Mode.LOGICAL */, self: true },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
            assert.deepEqual(parsePositionArea('self-y-start self-x-end'), {
                first: { start: 0, end: 0, mode: "coordinate" /* Mode.COORDINATE */, self: true },
                second: { start: 2, end: 2, mode: "coordinate" /* Mode.COORDINATE */, self: true },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
            assert.deepEqual(parsePositionArea('self-start self-end'), {
                first: { start: 0, end: 0, mode: "auto" /* Mode.AUTO */, self: true },
                second: { start: 2, end: 2, mode: "auto" /* Mode.AUTO */, self: true },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
        });
        it('parses mixed axis modes', () => {
            assert.deepEqual(parsePositionArea('top inline-end'), {
                first: { start: 0, end: 0, mode: "physical" /* Mode.PHYSICAL */, self: false },
                second: { start: 2, end: 2, mode: "logical" /* Mode.LOGICAL */, self: false },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
            assert.deepEqual(parsePositionArea('block-start right'), {
                first: { start: 0, end: 0, mode: "logical" /* Mode.LOGICAL */, self: false },
                second: { start: 2, end: 2, mode: "physical" /* Mode.PHYSICAL */, self: false },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
            assert.deepEqual(parsePositionArea('top self-end'), {
                first: { start: 0, end: 0, mode: "physical" /* Mode.PHYSICAL */, self: false },
                second: { start: 2, end: 2, mode: "auto" /* Mode.AUTO */, self: true },
                primaryAxis: "block" /* Axis.BLOCK */,
            });
        });
        it('returns null for invalid inputs', () => {
            assert.isNull(parsePositionArea(''));
            assert.isNull(parsePositionArea('none'));
            assert.isNull(parsePositionArea('top left right'));
            assert.isNull(parsePositionArea('invalid-token'));
            assert.isNull(parsePositionArea('top bottom'));
            assert.isNull(parsePositionArea('left right'));
        });
    });
    describe('stringifyPositionArea', () => {
        it('stringifies simple keywords and shortcuts', () => {
            const top = parsePositionArea('top');
            assert.exists(top);
            assert.strictEqual(stringifyPositionArea(top), 'top');
            const center = parsePositionArea('center');
            assert.exists(center);
            assert.strictEqual(stringifyPositionArea(center), 'center');
            const spanAll = parsePositionArea('span-all');
            assert.exists(spanAll);
            assert.strictEqual(stringifyPositionArea(spanAll), 'span-all');
            const topSpanLeft = parsePositionArea('top span-left');
            assert.exists(topSpanLeft);
            assert.strictEqual(stringifyPositionArea(topSpanLeft), 'top span-left');
            const bottomRight = parsePositionArea('bottom right');
            assert.exists(bottomRight);
            assert.strictEqual(stringifyPositionArea(bottomRight), 'bottom right');
            const centerAll = parsePositionArea('center span-all');
            assert.exists(centerAll);
            assert.strictEqual(stringifyPositionArea(centerAll), 'center span-all');
            const start = parsePositionArea('start');
            assert.exists(start);
            assert.strictEqual(stringifyPositionArea(start), 'start');
        });
        it('stringifies logical keywords', () => {
            const blockStartInlineEnd = parsePositionArea('block-start inline-end');
            assert.exists(blockStartInlineEnd);
            assert.strictEqual(stringifyPositionArea(blockStartInlineEnd), 'block-start inline-end');
        });
    });
    describe('presenter', () => {
        it('sets tabIndex on contentElement when shown', () => {
            const editor = new InlineEditor.PositionAreaEditor.PositionAreaEditor();
            editor.wasShown();
            assert.strictEqual(editor.contentElement.tabIndex, 0);
        });
        it('performs synchronous update when shown', () => {
            const view = createViewFunctionStub(InlineEditor.PositionAreaEditor.PositionAreaEditor);
            const editor = new InlineEditor.PositionAreaEditor.PositionAreaEditor(undefined, view);
            const area = parsePositionArea('top left');
            editor.area = area ?? undefined;
            editor.wasShown();
            assert.isTrue(view.callCount > 0);
            assert.strictEqual(view.input.area, area);
        });
        it('updates view input when setting area', async () => {
            const view = createViewFunctionStub(InlineEditor.PositionAreaEditor.PositionAreaEditor);
            const editor = new InlineEditor.PositionAreaEditor.PositionAreaEditor(undefined, view);
            editor.wasShown();
            const area = parsePositionArea('top left');
            assert.exists(area);
            editor.area = area;
            await view.nextInput;
            assert.strictEqual(editor.area, area);
            assert.strictEqual(view.input.area, area);
        });
        it('handles selection with SelectStart and SelectEnd', async () => {
            const view = createViewFunctionStub(InlineEditor.PositionAreaEditor.PositionAreaEditor);
            const editor = new InlineEditor.PositionAreaEditor.PositionAreaEditor(undefined, view);
            editor.area = parsePositionArea('top left') ?? undefined;
            editor.wasShown();
            await editor.updateComplete;
            const changeSpy = sinon.spy();
            editor.addEventListener("positionAreaChanged" /* InlineEditor.PositionAreaEditor.Events.POSITION_AREA_CHANGED */, changeSpy);
            view.input.onSelectStart(0, 0);
            view.input.onSelectEnd(2, 2);
            assert.exists(editor.area);
            assert.strictEqual(stringifyPositionArea(editor.area), 'span-all');
            sinon.assert.called(changeSpy);
        });
        it('handles selection with SelectStart, Select, and SelectEnd', async () => {
            const view = createViewFunctionStub(InlineEditor.PositionAreaEditor.PositionAreaEditor);
            const editor = new InlineEditor.PositionAreaEditor.PositionAreaEditor(undefined, view);
            editor.area = parsePositionArea('top left') ?? undefined;
            editor.wasShown();
            await editor.updateComplete;
            const changeSpy = sinon.spy();
            editor.addEventListener("positionAreaChanged" /* InlineEditor.PositionAreaEditor.Events.POSITION_AREA_CHANGED */, changeSpy);
            view.input.onSelectStart(0, 0);
            view.input.onSelect(1, 0);
            assert.exists(editor.area);
            assert.strictEqual(stringifyPositionArea(editor.area), 'top span-left');
            view.input.onSelectEnd(2, 0);
            assert.exists(editor.area);
            assert.strictEqual(stringifyPositionArea(editor.area), 'top');
            sinon.assert.called(changeSpy);
        });
        it('restores original area on cancelled selection (SelectStart, SelectEnd(undefined))', async () => {
            const view = createViewFunctionStub(InlineEditor.PositionAreaEditor.PositionAreaEditor);
            const editor = new InlineEditor.PositionAreaEditor.PositionAreaEditor(undefined, view);
            const initialArea = parsePositionArea('top left') ?? undefined;
            editor.area = initialArea;
            editor.wasShown();
            await editor.updateComplete;
            view.input.onSelectStart(1, 1);
            assert.exists(editor.area);
            assert.strictEqual(stringifyPositionArea(editor.area), 'center');
            view.input.onSelectEnd(undefined, undefined);
            assert.exists(editor.area);
            assert.strictEqual(stringifyPositionArea(editor.area), 'top left');
        });
    });
    describe('DEFAULT_VIEW screenshot', () => {
        it('renders the view', async () => {
            const target = document.createElement('div');
            renderElementIntoDOM(target, { includeCommonStyles: true });
            const area = parsePositionArea('top span-left');
            assert.exists(area);
            InlineEditor.PositionAreaEditor.DEFAULT_VIEW({
                area,
                onSelectStart: () => { },
                onSelect: () => { },
                onSelectEnd: () => { },
                onModeChange: () => { },
                onSelfChange: () => { },
            }, undefined, target);
            await assertScreenshot('inline_editor/position_area_editor.png');
        });
    });
    it('correctly transitions between axis classes', async () => {
        const view = createViewFunctionStub(InlineEditor.PositionAreaEditor.PositionAreaEditor);
        const editor = new InlineEditor.PositionAreaEditor.PositionAreaEditor(undefined, view);
        const physicalInline = ['left', 'right', 'span-left', 'span-right'];
        const coordinateInline = ['x-start', 'x-end', 'span-x-start', 'span-x-end'];
        const coordinateInlineSelf = ['self-x-start', 'self-x-end', 'span-self-x-start', 'span-self-x-end'];
        const physicalBlock = ['top', 'bottom', 'span-top', 'span-bottom'];
        const coordinateBlock = ['y-start', 'y-end', 'span-y-start', 'span-y-end'];
        const coordinateBlockSelf = ['self-y-start', 'self-y-end', 'span-self-y-start', 'span-self-y-end'];
        const logicalBlock = ['block-start', 'block-end', 'span-block-start', 'span-block-end'];
        const logicalInline = ['inline-start', 'inline-end', 'span-inline-start', 'span-inline-end'];
        const logicalBlockSelf = ['self-block-start', 'self-block-end', 'span-self-block-start', 'span-self-block-end'];
        const logicalInlineSelf = ['self-inline-start', 'self-inline-end', 'span-self-inline-start', 'span-self-inline-end'];
        const auto = ['start', 'end', 'span-start', 'span-end'];
        const autoSelf = ['self-start', 'self-end', 'span-self-start', 'span-self-end'];
        function checkMode(axis, current, mode, expected) {
            for (const keyword of [0, 1, 2, 3]) {
                const area = parsePositionArea(`${current[0][keyword]} ${current[1][keyword]}`);
                assert.exists(area);
                editor.area = area;
                // Intentionally using performUpdate instead of requestUpdate. Otherwise each helper would take 4 animation
                // frames, which would make this test take around 15s.
                editor.performUpdate();
                view.input.onModeChange(axis, mode);
                editor.performUpdate();
                assert.exists(view.input.area);
                const expectedFirst = expected[0][keyword];
                const expectedSecond = expected[1][keyword];
                assert.strictEqual(stringifyPositionArea(view.input.area), expectedFirst === expectedSecond ? expectedFirst : `${expectedFirst} ${expectedSecond}`);
                if (current[0] !== current[1]) {
                    const flippedArea = parsePositionArea(`${current[1][keyword]} ${current[0][keyword]}`);
                    assert.exists(flippedArea);
                    editor.area = flippedArea;
                    editor.performUpdate();
                    view.input.onModeChange(axis, mode);
                    editor.performUpdate();
                    assert.exists(view.input.area);
                    assert.strictEqual(stringifyPositionArea(view.input.area), expectedSecond === expectedFirst ? expectedSecond : `${expectedSecond} ${expectedFirst}`);
                }
            }
        }
        function checkSelf(axis, current, self, expected) {
            for (const keyword of [0, 1, 2, 3]) {
                const area = parsePositionArea(`${current[0][keyword]} ${current[1][keyword]}`);
                assert.exists(area);
                editor.area = area;
                editor.performUpdate();
                view.input.onSelfChange(axis, self);
                editor.performUpdate();
                assert.exists(view.input.area);
                const expectedFirst = expected[0][keyword];
                const expectedSecond = expected[1][keyword];
                assert.strictEqual(stringifyPositionArea(view.input.area), expectedFirst === expectedSecond ? expectedFirst : `${expectedFirst} ${expectedSecond}`);
                if (current[0] !== current[1]) {
                    const flippedArea = parsePositionArea(`${current[1][keyword]} ${current[0][keyword]}`);
                    assert.exists(flippedArea);
                    editor.area = flippedArea;
                    editor.performUpdate();
                    view.input.onSelfChange(axis, self);
                    editor.performUpdate();
                    assert.exists(view.input.area);
                    assert.strictEqual(stringifyPositionArea(view.input.area), expectedSecond === expectedFirst ? expectedSecond : `${expectedSecond} ${expectedFirst}`);
                }
            }
        }
        // [physical, physical] + coordinate = [coordinate, physical] / [physical, coordinate]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [physicalInline, physicalBlock], "coordinate" /* InlineEditor.PositionAreaEditor.Mode.COORDINATE */, [coordinateInline, physicalBlock]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [physicalInline, physicalBlock], "coordinate" /* InlineEditor.PositionAreaEditor.Mode.COORDINATE */, [physicalInline, coordinateBlock]);
        // [coordinate, physical] + physical = [physical, physical]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [coordinateInline, physicalBlock], "physical" /* InlineEditor.PositionAreaEditor.Mode.PHYSICAL */, [physicalInline, physicalBlock]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [physicalInline, coordinateBlock], "physical" /* InlineEditor.PositionAreaEditor.Mode.PHYSICAL */, [physicalInline, physicalBlock]);
        // [coordinate/s, physical] + physical = [physical, physical]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [coordinateInlineSelf, physicalBlock], "physical" /* InlineEditor.PositionAreaEditor.Mode.PHYSICAL */, [physicalInline, physicalBlock]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [physicalInline, coordinateBlockSelf], "physical" /* InlineEditor.PositionAreaEditor.Mode.PHYSICAL */, [physicalInline, physicalBlock]);
        // [physical, physical] + logical = [logical, logical]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [physicalInline, physicalBlock], "logical" /* InlineEditor.PositionAreaEditor.Mode.LOGICAL */, [logicalInline, logicalBlock]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [physicalInline, physicalBlock], "logical" /* InlineEditor.PositionAreaEditor.Mode.LOGICAL */, [logicalInline, logicalBlock]);
        // [coordinate, physical] + logical = [logical, logical]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [coordinateInline, physicalBlock], "logical" /* InlineEditor.PositionAreaEditor.Mode.LOGICAL */, [logicalInline, logicalBlock]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [physicalInline, coordinateBlock], "logical" /* InlineEditor.PositionAreaEditor.Mode.LOGICAL */, [logicalInline, logicalBlock]);
        // [coordinate/s, physical] + logical = [logical/s, logical/s]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [coordinateInlineSelf, physicalBlock], "logical" /* InlineEditor.PositionAreaEditor.Mode.LOGICAL */, [logicalInlineSelf, logicalBlockSelf]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [physicalInline, coordinateBlockSelf], "logical" /* InlineEditor.PositionAreaEditor.Mode.LOGICAL */, [logicalInlineSelf, logicalBlockSelf]);
        // [coordinate, physical] + auto = [auto, auto]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [coordinateInline, physicalBlock], "auto" /* InlineEditor.PositionAreaEditor.Mode.AUTO */, [auto, auto]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [physicalInline, coordinateBlock], "auto" /* InlineEditor.PositionAreaEditor.Mode.AUTO */, [auto, auto]);
        // [coordinate/s, physical] + auto = [auto/s, auto/s]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [coordinateInlineSelf, physicalBlock], "auto" /* InlineEditor.PositionAreaEditor.Mode.AUTO */, [autoSelf, autoSelf]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [physicalInline, coordinateBlockSelf], "auto" /* InlineEditor.PositionAreaEditor.Mode.AUTO */, [autoSelf, autoSelf]);
        // [logical, logical] + physical = [physical, physical]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [logicalInline, logicalBlock], "physical" /* InlineEditor.PositionAreaEditor.Mode.PHYSICAL */, [physicalInline, physicalBlock]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [logicalInline, logicalBlock], "physical" /* InlineEditor.PositionAreaEditor.Mode.PHYSICAL */, [physicalInline, physicalBlock]);
        // [logical/s, logical/s] + physical = [physical, coordinate/s] / [coordinate/s, physical]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [logicalInlineSelf, logicalBlockSelf], "physical" /* InlineEditor.PositionAreaEditor.Mode.PHYSICAL */, [physicalInline, coordinateBlockSelf]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [logicalInlineSelf, logicalBlockSelf], "physical" /* InlineEditor.PositionAreaEditor.Mode.PHYSICAL */, [coordinateInlineSelf, physicalBlock]);
        // [auto, auto] + physical = [physical, physical]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [auto, auto], "physical" /* InlineEditor.PositionAreaEditor.Mode.PHYSICAL */, [physicalBlock, physicalInline]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [auto, auto], "physical" /* InlineEditor.PositionAreaEditor.Mode.PHYSICAL */, [physicalBlock, physicalInline]);
        // [auto/s, auto/s] + physical = [coordinate/s, physical] / [physical, coordinate/s]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [autoSelf, autoSelf], "physical" /* InlineEditor.PositionAreaEditor.Mode.PHYSICAL */, [coordinateBlockSelf, physicalInline]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [autoSelf, autoSelf], "physical" /* InlineEditor.PositionAreaEditor.Mode.PHYSICAL */, [physicalBlock, coordinateInlineSelf]);
        // [logical, logical] + coordinate = [coordinate, coordinate]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [logicalInline, logicalBlock], "coordinate" /* InlineEditor.PositionAreaEditor.Mode.COORDINATE */, [coordinateInline, coordinateBlock]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [logicalInline, logicalBlock], "coordinate" /* InlineEditor.PositionAreaEditor.Mode.COORDINATE */, [coordinateInline, coordinateBlock]);
        // [logical/s, logical/s] + coordinate = [coordinate/s, coordinate/s]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [logicalInlineSelf, logicalBlockSelf], "coordinate" /* InlineEditor.PositionAreaEditor.Mode.COORDINATE */, [coordinateInlineSelf, coordinateBlockSelf]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [logicalInlineSelf, logicalBlockSelf], "coordinate" /* InlineEditor.PositionAreaEditor.Mode.COORDINATE */, [coordinateInlineSelf, coordinateBlockSelf]);
        // [auto, auto] + coordinate = [coordinate, coordinate]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [auto, auto], "coordinate" /* InlineEditor.PositionAreaEditor.Mode.COORDINATE */, [coordinateBlock, coordinateInline]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [auto, auto], "coordinate" /* InlineEditor.PositionAreaEditor.Mode.COORDINATE */, [coordinateBlock, coordinateInline]);
        // [auto/s, auto/s] + coordinate = [coordinate/s, coordinate/s]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [autoSelf, autoSelf], "coordinate" /* InlineEditor.PositionAreaEditor.Mode.COORDINATE */, [coordinateBlockSelf, coordinateInlineSelf]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [autoSelf, autoSelf], "coordinate" /* InlineEditor.PositionAreaEditor.Mode.COORDINATE */, [coordinateBlockSelf, coordinateInlineSelf]);
        // [logical, logical] + auto = [auto, auto]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [logicalInline, logicalBlock], "auto" /* InlineEditor.PositionAreaEditor.Mode.AUTO */, [auto, auto]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [logicalInline, logicalBlock], "auto" /* InlineEditor.PositionAreaEditor.Mode.AUTO */, [auto, auto]);
        // [logical/s, logical/s] + auto = [auto/s, auto/s]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [logicalInlineSelf, logicalBlockSelf], "auto" /* InlineEditor.PositionAreaEditor.Mode.AUTO */, [autoSelf, autoSelf]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [logicalInlineSelf, logicalBlockSelf], "auto" /* InlineEditor.PositionAreaEditor.Mode.AUTO */, [autoSelf, autoSelf]);
        // [auto, auto] + logical = [logical, logical]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [auto, auto], "logical" /* InlineEditor.PositionAreaEditor.Mode.LOGICAL */, [logicalBlock, logicalInline]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [auto, auto], "logical" /* InlineEditor.PositionAreaEditor.Mode.LOGICAL */, [logicalBlock, logicalInline]);
        // [auto/s, auto/s] + logical = [logical/s, logical/s]
        checkMode("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [autoSelf, autoSelf], "logical" /* InlineEditor.PositionAreaEditor.Mode.LOGICAL */, [logicalBlockSelf, logicalInlineSelf]);
        checkMode("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [autoSelf, autoSelf], "logical" /* InlineEditor.PositionAreaEditor.Mode.LOGICAL */, [logicalBlockSelf, logicalInlineSelf]);
        // physical + self = coordinate/s
        checkSelf("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [physicalInline, physicalBlock], true, [coordinateInlineSelf, physicalBlock]);
        checkSelf("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [physicalInline, physicalBlock], true, [physicalInline, coordinateBlockSelf]);
        // physical + !self = physical
        checkSelf("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [physicalInline, physicalBlock], false, [physicalInline, physicalBlock]);
        checkSelf("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [physicalInline, physicalBlock], false, [physicalInline, physicalBlock]);
        // coordinate + self = coordinate/s
        checkSelf("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [coordinateInline, physicalBlock], true, [coordinateInlineSelf, physicalBlock]);
        checkSelf("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [physicalInline, coordinateBlock], true, [physicalInline, coordinateBlockSelf]);
        // logical + self = logical/s
        checkSelf("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [logicalInline, logicalBlock], true, [logicalInlineSelf, logicalBlockSelf]);
        checkSelf("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [logicalInline, logicalBlock], true, [logicalInlineSelf, logicalBlockSelf]);
        // auto + self = auto/s
        checkSelf("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [auto, auto], true, [autoSelf, autoSelf]);
        checkSelf("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [auto, auto], true, [autoSelf, autoSelf]);
        // coordinate/s + !self = coordinate
        checkSelf("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [coordinateInlineSelf, coordinateBlockSelf], false, [coordinateInline, coordinateBlockSelf]);
        checkSelf("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [coordinateInlineSelf, coordinateBlockSelf], false, [coordinateInlineSelf, coordinateBlock]);
        // logical/s + !self = logical
        checkSelf("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [logicalInlineSelf, logicalBlockSelf], false, [logicalInline, logicalBlock]);
        checkSelf("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [logicalInlineSelf, logicalBlockSelf], false, [logicalInline, logicalBlock]);
        // auto/s + !self = auto
        checkSelf("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, [autoSelf, autoSelf], false, [auto, auto]);
        checkSelf("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, [autoSelf, autoSelf], false, [auto, auto]);
        await editor.updateComplete;
    });
    it('updates generic keyword mode to match the other dimension when mode changes', async () => {
        const view = createViewFunctionStub(InlineEditor.PositionAreaEditor.PositionAreaEditor);
        const editor = new InlineEditor.PositionAreaEditor.PositionAreaEditor(undefined, view);
        // Initial: "top center"
        const topCenter = parsePositionArea('top center');
        assert.exists(topCenter);
        editor.area = topCenter;
        editor.performUpdate();
        // Switch block mode to logical: center should also change to logical
        view.input.onModeChange("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, "logical" /* InlineEditor.PositionAreaEditor.Mode.LOGICAL */);
        editor.performUpdate();
        assert.exists(view.input.area);
        assert.strictEqual(stringifyPositionArea(view.input.area), 'block-start center');
        const blockAxis = view.input.area.primaryAxis === "block" /* Axis.BLOCK */ ? view.input.area.first : view.input.area.second;
        const inlineAxis = view.input.area.primaryAxis === "inline" /* Axis.INLINE */ ? view.input.area.first : view.input.area.second;
        assert.strictEqual(blockAxis.mode, "logical" /* InlineEditor.PositionAreaEditor.Mode.LOGICAL */);
        assert.strictEqual(inlineAxis.mode, "logical" /* InlineEditor.PositionAreaEditor.Mode.LOGICAL */);
        // Selecting top right corner should now yield "block-start inline-end"
        view.input.onSelectStart(2, 0);
        view.input.onSelectEnd(2, 0);
        editor.performUpdate();
        assert.exists(view.input.area);
        assert.strictEqual(stringifyPositionArea(view.input.area), 'block-start inline-end');
        // Generic block axis with non-generic inline axis: "center left"
        const centerLeft = parsePositionArea('center left');
        assert.exists(centerLeft);
        editor.area = centerLeft;
        editor.performUpdate();
        view.input.onModeChange("inline" /* InlineEditor.PositionAreaEditor.Axis.INLINE */, "logical" /* InlineEditor.PositionAreaEditor.Mode.LOGICAL */);
        editor.performUpdate();
        assert.exists(view.input.area);
        assert.strictEqual(stringifyPositionArea(view.input.area), 'center inline-start');
        const blockAxis2 = view.input.area.primaryAxis === "block" /* Axis.BLOCK */ ? view.input.area.first : view.input.area.second;
        const inlineAxis2 = view.input.area.primaryAxis === "inline" /* Axis.INLINE */ ? view.input.area.first : view.input.area.second;
        assert.strictEqual(blockAxis2.mode, "logical" /* InlineEditor.PositionAreaEditor.Mode.LOGICAL */);
        assert.strictEqual(inlineAxis2.mode, "logical" /* InlineEditor.PositionAreaEditor.Mode.LOGICAL */);
        // Both axes generic: "center"
        const center = parsePositionArea('center');
        assert.exists(center);
        editor.area = center;
        editor.performUpdate();
        view.input.onModeChange("block" /* InlineEditor.PositionAreaEditor.Axis.BLOCK */, "logical" /* InlineEditor.PositionAreaEditor.Mode.LOGICAL */);
        editor.performUpdate();
        assert.exists(view.input.area);
        const blockAxis3 = view.input.area.primaryAxis === "block" /* Axis.BLOCK */ ? view.input.area.first : view.input.area.second;
        const inlineAxis3 = view.input.area.primaryAxis === "inline" /* Axis.INLINE */ ? view.input.area.first : view.input.area.second;
        assert.strictEqual(blockAxis3.mode, "logical" /* InlineEditor.PositionAreaEditor.Mode.LOGICAL */);
        assert.strictEqual(inlineAxis3.mode, "logical" /* InlineEditor.PositionAreaEditor.Mode.LOGICAL */);
        view.input.onSelectStart(2, 0);
        view.input.onSelectEnd(2, 0);
        editor.performUpdate();
        assert.exists(view.input.area);
        assert.strictEqual(stringifyPositionArea(view.input.area), 'block-start inline-end');
    });
});
//# sourceMappingURL=PositionAreaEditor.test.js.map