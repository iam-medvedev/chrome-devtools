// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { raf } from '../../testing/DOMHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import * as Resources from './application.js';
var View = Resources.SharedStorageEventsView;
describeWithMockConnection('SharedStorageEventsView', () => {
    const TEST_ORIGIN_A = 'http://a.test';
    const TEST_SITE_A = TEST_ORIGIN_A;
    const TEST_ORIGIN_B = 'http://b.test';
    const TEST_SITE_B = TEST_ORIGIN_B;
    const TEST_ORIGIN_C = 'http://c.test';
    const TEST_SITE_C = TEST_ORIGIN_C;
    const ID_A = 'AA';
    const ID_B = 'BB';
    const EMPTY_ID = '';
    const EVENTS = [
        {
            accessTime: 0,
            method: "append" /* Protocol.Storage.SharedStorageAccessMethod.Append */,
            mainFrameId: ID_A,
            ownerOrigin: TEST_ORIGIN_A,
            ownerSite: TEST_SITE_A,
            params: { key: 'key0', value: 'value0' },
            scope: "window" /* Protocol.Storage.SharedStorageAccessScope.Window */,
        },
        {
            accessTime: 10,
            method: "get" /* Protocol.Storage.SharedStorageAccessMethod.Get */,
            mainFrameId: ID_A,
            ownerOrigin: TEST_ORIGIN_A,
            ownerSite: TEST_SITE_A,
            params: { key: 'key0' },
            scope: "sharedStorageWorklet" /* Protocol.Storage.SharedStorageAccessScope.SharedStorageWorklet */,
        },
        {
            accessTime: 15,
            method: "length" /* Protocol.Storage.SharedStorageAccessMethod.Length */,
            mainFrameId: ID_A,
            ownerOrigin: TEST_ORIGIN_B,
            ownerSite: TEST_SITE_B,
            params: {},
            scope: "sharedStorageWorklet" /* Protocol.Storage.SharedStorageAccessScope.SharedStorageWorklet */,
        },
        {
            accessTime: 20,
            method: "clear" /* Protocol.Storage.SharedStorageAccessMethod.Clear */,
            mainFrameId: ID_A,
            ownerOrigin: TEST_ORIGIN_B,
            ownerSite: TEST_SITE_B,
            params: {},
            scope: "window" /* Protocol.Storage.SharedStorageAccessScope.Window */,
        },
        {
            accessTime: 100,
            method: "set" /* Protocol.Storage.SharedStorageAccessMethod.Set */,
            mainFrameId: ID_A,
            ownerOrigin: TEST_ORIGIN_C,
            ownerSite: TEST_SITE_C,
            params: { key: 'key0', value: 'value1', ignoreIfPresent: true },
            scope: "sharedStorageWorklet" /* Protocol.Storage.SharedStorageAccessScope.SharedStorageWorklet */,
        },
        {
            accessTime: 150,
            method: "remainingBudget" /* Protocol.Storage.SharedStorageAccessMethod.RemainingBudget */,
            mainFrameId: ID_A,
            ownerOrigin: TEST_ORIGIN_C,
            ownerSite: TEST_SITE_C,
            params: {},
            scope: "sharedStorageWorklet" /* Protocol.Storage.SharedStorageAccessScope.SharedStorageWorklet */,
        },
    ];
    const MULTI_PAGE_EVENTS = [
        {
            accessTime: 0,
            method: "append" /* Protocol.Storage.SharedStorageAccessMethod.Append */,
            mainFrameId: ID_A,
            ownerOrigin: TEST_ORIGIN_A,
            ownerSite: TEST_SITE_A,
            params: { key: 'key0', value: 'value0' },
            scope: "window" /* Protocol.Storage.SharedStorageAccessScope.Window */,
        },
        {
            accessTime: 10,
            method: "get" /* Protocol.Storage.SharedStorageAccessMethod.Get */,
            mainFrameId: ID_B,
            ownerOrigin: TEST_ORIGIN_A,
            ownerSite: TEST_SITE_A,
            params: { key: 'key0' },
            scope: "sharedStorageWorklet" /* Protocol.Storage.SharedStorageAccessScope.SharedStorageWorklet */,
        },
        {
            accessTime: 15,
            method: "length" /* Protocol.Storage.SharedStorageAccessMethod.Length */,
            mainFrameId: ID_A,
            ownerOrigin: TEST_ORIGIN_B,
            ownerSite: TEST_SITE_B,
            params: {},
            scope: "sharedStorageWorklet" /* Protocol.Storage.SharedStorageAccessScope.SharedStorageWorklet */,
        },
        {
            accessTime: 20,
            method: "clear" /* Protocol.Storage.SharedStorageAccessMethod.Clear */,
            mainFrameId: EMPTY_ID,
            ownerOrigin: TEST_ORIGIN_B,
            ownerSite: TEST_SITE_B,
            params: {},
            scope: "window" /* Protocol.Storage.SharedStorageAccessScope.Window */,
        },
        {
            accessTime: 100,
            method: "set" /* Protocol.Storage.SharedStorageAccessMethod.Set */,
            mainFrameId: EMPTY_ID,
            ownerOrigin: TEST_ORIGIN_C,
            ownerSite: TEST_SITE_C,
            params: { key: 'key0', value: 'value1', ignoreIfPresent: true },
            scope: "sharedStorageWorklet" /* Protocol.Storage.SharedStorageAccessScope.SharedStorageWorklet */,
        },
        {
            accessTime: 150,
            method: "remainingBudget" /* Protocol.Storage.SharedStorageAccessMethod.RemainingBudget */,
            mainFrameId: ID_B,
            ownerOrigin: TEST_ORIGIN_C,
            ownerSite: TEST_SITE_C,
            params: {},
            scope: "sharedStorageWorklet" /* Protocol.Storage.SharedStorageAccessScope.SharedStorageWorklet */,
        },
    ];
    const PAGE_A_EVENTS = [
        {
            accessTime: 0,
            method: "append" /* Protocol.Storage.SharedStorageAccessMethod.Append */,
            mainFrameId: ID_A,
            ownerOrigin: TEST_ORIGIN_A,
            ownerSite: TEST_SITE_A,
            params: { key: 'key0', value: 'value0' },
            scope: "window" /* Protocol.Storage.SharedStorageAccessScope.Window */,
        },
        {
            accessTime: 15,
            method: "length" /* Protocol.Storage.SharedStorageAccessMethod.Length */,
            mainFrameId: ID_A,
            ownerOrigin: TEST_ORIGIN_B,
            ownerSite: TEST_SITE_B,
            params: {},
            scope: "sharedStorageWorklet" /* Protocol.Storage.SharedStorageAccessScope.SharedStorageWorklet */,
        },
    ];
    it('records events', () => {
        const view = new View.SharedStorageEventsView();
        view.setDefaultIdForTesting(ID_A);
        for (const event of EVENTS) {
            view.addEvent(event);
        }
        assert.deepEqual(view.getEventsForTesting(), EVENTS);
    });
    it('ignores duplicates', () => {
        const view = new View.SharedStorageEventsView();
        view.setDefaultIdForTesting(ID_A);
        for (const event of EVENTS) {
            view.addEvent(event);
        }
        view.addEvent(EVENTS[0]);
        assert.deepEqual(view.getEventsForTesting(), EVENTS);
    });
    it('initially has placeholder sidebar', () => {
        const view = new View.SharedStorageEventsView();
        assert.notDeepEqual(view.sidebarWidget()?.constructor.name, 'SearchableView');
        assert.deepEqual(view.sidebarWidget()?.contentElement.firstChild?.textContent, 'No shared storage event selected');
    });
    it('updates sidebarWidget upon receiving cellFocusedEvent', async () => {
        const view = new View.SharedStorageEventsView();
        view.setDefaultIdForTesting(ID_A);
        for (const event of EVENTS) {
            view.addEvent(event);
        }
        const grid = view.getSharedStorageAccessGridForTesting();
        // Use a spy to assert that the sidebar preview pane gets updated when expected.
        const spy = sinon.spy(view, 'setSidebarWidget');
        sinon.assert.notCalled(spy);
        grid.dispatchEvent(new CustomEvent('select', { detail: EVENTS[0] }));
        await raf();
        sinon.assert.calledOnce(spy);
        assert.deepEqual(view.sidebarWidget()?.constructor.name, 'SearchableView');
    });
    it('clears sidebarWidget upon clearEvents', async () => {
        const view = new View.SharedStorageEventsView();
        view.setDefaultIdForTesting(ID_A);
        for (const event of EVENTS) {
            view.addEvent(event);
        }
        const grid = view.getSharedStorageAccessGridForTesting();
        // Use a spy to assert that the sidebar preview pane gets updated when expected.
        const spy = sinon.spy(view, 'setSidebarWidget');
        sinon.assert.notCalled(spy);
        grid.dispatchEvent(new CustomEvent('select', { detail: EVENTS[0] }));
        await raf();
        sinon.assert.calledOnce(spy);
        assert.deepEqual(view.sidebarWidget()?.constructor.name, 'SearchableView');
        view.clearEvents();
        sinon.assert.calledTwice(spy);
        assert.notDeepEqual(view.sidebarWidget()?.constructor.name, 'SearchableView');
        assert.deepEqual(view.sidebarWidget()?.contentElement.firstChild?.textContent, 'No shared storage event selected');
    });
    it('records events only from the target page', () => {
        const view = new View.SharedStorageEventsView();
        view.setDefaultIdForTesting(ID_A);
        for (const event of MULTI_PAGE_EVENTS) {
            view.addEvent(event);
        }
        assert.deepEqual(view.getEventsForTesting(), PAGE_A_EVENTS);
    });
});
//# sourceMappingURL=SharedStorageEventsView.test.js.map