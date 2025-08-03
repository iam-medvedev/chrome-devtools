// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import * as SDK from './sdk.js';
const { getPhysicalAxisFromQueryAxis, getQueryAxisFromContainerType, PhysicalAxis, QueryAxis } = SDK.CSSContainerQuery;
describe('CSSContainerQuery', () => {
    describe('getQueryAxisFromContainerType', () => {
        it('gets the query axis of no container-type correctly', () => {
            assert.strictEqual(getQueryAxisFromContainerType(''), "" /* QueryAxis.NONE */);
            assert.strictEqual(getQueryAxisFromContainerType('normal'), "" /* QueryAxis.NONE */);
        });
        it('gets the query axis of an inline container query correctly', () => {
            assert.strictEqual(getQueryAxisFromContainerType('inline-size'), "inline-size" /* QueryAxis.INLINE */);
            assert.strictEqual(getQueryAxisFromContainerType('scroll-state inline-size'), "inline-size" /* QueryAxis.INLINE */);
        });
        it('gets the query axis of size container query correctly', () => {
            assert.strictEqual(getQueryAxisFromContainerType('size'), "size" /* QueryAxis.BOTH */);
            assert.strictEqual(getQueryAxisFromContainerType('scroll-state size'), "size" /* QueryAxis.BOTH */);
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
    describeWithMockConnection('Construction from protocol payload', () => {
        it('anchored()', () => {
            const target = createTarget();
            const cssModel = new SDK.CSSModel.CSSModel(target);
            const query = new SDK.CSSContainerQuery.CSSContainerQuery(cssModel, { queriesAnchored: true });
            assert.isTrue(query.queriesAnchored);
            assert.isUndefined(query.queriesScrollState);
        });
    });
});
//# sourceMappingURL=CSSContainerQuery.test.js.map