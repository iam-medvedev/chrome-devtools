// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from './sdk.js';
const { getPhysicalAxisFromQueryAxis, getQueryAxis, PhysicalAxis, QueryAxis } = SDK.CSSContainerQuery;
describe('CSSContainerQuery', () => {
    describe('getQueryAxis', () => {
        it('gets the query axis of no containment correctly', () => {
            assert.strictEqual(getQueryAxis(''), "" /* QueryAxis.NONE */);
            assert.strictEqual(getQueryAxis('style layout'), "" /* QueryAxis.NONE */);
        });
        it('gets the query axis of an inline container query correctly', () => {
            assert.strictEqual(getQueryAxis('inline-size layout style'), "inline-size" /* QueryAxis.INLINE */);
            assert.strictEqual(getQueryAxis('layout inline-size style inline-size'), "inline-size" /* QueryAxis.INLINE */);
        });
        it('gets the query axis of a block container query correctly', () => {
            assert.strictEqual(getQueryAxis('block-size layout style'), "block-size" /* QueryAxis.BLOCK */);
            assert.strictEqual(getQueryAxis('layout block-size style block-size'), "block-size" /* QueryAxis.BLOCK */);
        });
        it('gets the query axis of inline-block container query correctly', () => {
            assert.strictEqual(getQueryAxis('inline-size layout style block-size'), "size" /* QueryAxis.BOTH */);
            assert.strictEqual(getQueryAxis('layout size style'), "size" /* QueryAxis.BOTH */);
            assert.strictEqual(getQueryAxis('size'), "size" /* QueryAxis.BOTH */);
        });
    });
    describe('getPhysicalAxisFromQueryAxis', () => {
        it('gets the physical axis of no containment correctly', () => {
            assert.strictEqual(getPhysicalAxisFromQueryAxis("" /* QueryAxis.NONE */, 'horizontal-tb'), "" /* PhysicalAxis.NONE */);
            assert.strictEqual(getPhysicalAxisFromQueryAxis("" /* QueryAxis.NONE */, 'vertical-lr'), "" /* PhysicalAxis.NONE */);
            assert.strictEqual(getPhysicalAxisFromQueryAxis("" /* QueryAxis.NONE */, 'vertical-rl'), "" /* PhysicalAxis.NONE */);
        });
        it('gets the physical axis of horizontal containment correctly', () => {
            assert.strictEqual(getPhysicalAxisFromQueryAxis("inline-size" /* QueryAxis.INLINE */, 'horizontal-tb'), "Horizontal" /* PhysicalAxis.HORIZONTAL */);
            assert.strictEqual(getPhysicalAxisFromQueryAxis("block-size" /* QueryAxis.BLOCK */, 'vertical-lr'), "Horizontal" /* PhysicalAxis.HORIZONTAL */);
            assert.strictEqual(getPhysicalAxisFromQueryAxis("block-size" /* QueryAxis.BLOCK */, 'vertical-rl'), "Horizontal" /* PhysicalAxis.HORIZONTAL */);
        });
        it('gets the physical axis of vertical containment correctly', () => {
            assert.strictEqual(getPhysicalAxisFromQueryAxis("block-size" /* QueryAxis.BLOCK */, 'horizontal-tb'), "Vertical" /* PhysicalAxis.VERTICAL */);
            assert.strictEqual(getPhysicalAxisFromQueryAxis("inline-size" /* QueryAxis.INLINE */, 'vertical-lr'), "Vertical" /* PhysicalAxis.VERTICAL */);
            assert.strictEqual(getPhysicalAxisFromQueryAxis("inline-size" /* QueryAxis.INLINE */, 'vertical-rl'), "Vertical" /* PhysicalAxis.VERTICAL */);
        });
        it('gets the physical axis both-axes containment correctly', () => {
            assert.strictEqual(getPhysicalAxisFromQueryAxis("size" /* QueryAxis.BOTH */, 'horizontal-tb'), "Both" /* PhysicalAxis.BOTH */);
            assert.strictEqual(getPhysicalAxisFromQueryAxis("size" /* QueryAxis.BOTH */, 'vertical-lr'), "Both" /* PhysicalAxis.BOTH */);
            assert.strictEqual(getPhysicalAxisFromQueryAxis("size" /* QueryAxis.BOTH */, 'vertical-rl'), "Both" /* PhysicalAxis.BOTH */);
        });
    });
});
//# sourceMappingURL=CSSContainerQuery.test.js.map