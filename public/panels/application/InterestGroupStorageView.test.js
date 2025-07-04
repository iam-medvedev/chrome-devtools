// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { raf } from '../../testing/DOMHelpers.js';
import { expectCall } from '../../testing/ExpectStubCall.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import * as Resources from './application.js';
var View = Resources.InterestGroupStorageView;
const events = [
    {
        accessTime: 0,
        type: "bid" /* Protocol.Storage.InterestGroupAccessType.Bid */,
        ownerOrigin: 'https://owner1.com',
        name: 'cars',
    },
    {
        accessTime: 10,
        type: "join" /* Protocol.Storage.InterestGroupAccessType.Join */,
        ownerOrigin: 'https://owner2.com',
        name: 'trucks',
    },
];
class InterestGroupDetailsGetter {
    async getInterestGroupDetails(owner, name) {
        return {
            ownerOrigin: owner,
            name,
            expirationTime: 2,
            joiningOrigin: 'https://joiner.com',
            trustedBiddingSignalsKeys: [],
            ads: [],
            adComponents: [],
        };
    }
}
class InterestGroupDetailsGetterFails {
    async getInterestGroupDetails(_owner, _name) {
        return null;
    }
}
describeWithMockConnection('InterestGroupStorageView', () => {
    it('records events', () => {
        const view = new View.InterestGroupStorageView(new InterestGroupDetailsGetter());
        events.forEach(event => {
            view.addEvent(event);
        });
        assert.deepEqual(view.getEventsForTesting(), events);
    });
    it('ignores duplicates', () => {
        const view = new View.InterestGroupStorageView(new InterestGroupDetailsGetter());
        events.forEach(event => {
            view.addEvent(event);
        });
        view.addEvent(events[0]);
        assert.deepEqual(view.getEventsForTesting(), events);
    });
    it('initially has placeholder sidebar', () => {
        const view = new View.InterestGroupStorageView(new InterestGroupDetailsGetter());
        assert.notDeepEqual(view.sidebarWidget()?.constructor.name, 'SearchableView');
        const placeholder = view.sidebarWidget()?.contentElement;
        assert.deepEqual(placeholder?.textContent, 'No interest group selectedSelect any interest group event to display the group\'s current state');
    });
    it('updates sidebarWidget upon receiving cellFocusedEvent when InterestGroupGetter succeeds', async function () {
        const view = new View.InterestGroupStorageView(new InterestGroupDetailsGetter());
        events.forEach(event => {
            view.addEvent(event);
        });
        const grid = view.getInterestGroupGridForTesting();
        const spy = sinon.spy(view, 'setSidebarWidget');
        sinon.assert.notCalled(spy);
        grid.dispatchEvent(new CustomEvent('select', { detail: events[0] }));
        await raf();
        sinon.assert.calledOnce(spy);
        assert.deepEqual(view.sidebarWidget()?.constructor.name, 'SearchableView');
    });
    it('Clears sidebarWidget upon receiving cellFocusedEvent on an additionalBid-type events', async function () {
        if (this.timeout() > 0) {
            this.timeout(10000);
        }
        for (const eventType of ["additionalBid" /* Protocol.Storage.InterestGroupAccessType.AdditionalBid */,
            "additionalBidWin" /* Protocol.Storage.InterestGroupAccessType.AdditionalBidWin */,
            "topLevelAdditionalBid" /* Protocol.Storage.InterestGroupAccessType.TopLevelAdditionalBid */]) {
            const view = new View.InterestGroupStorageView(new InterestGroupDetailsGetter());
            events.forEach(event => {
                view.addEvent(event);
            });
            const grid = view.getInterestGroupGridForTesting();
            const sideBarUpdateDone = expectCall(sinon.stub(view, 'sidebarUpdatedForTesting'));
            const spy = sinon.spy(view, 'setSidebarWidget');
            sinon.assert.notCalled(spy);
            grid.dispatchEvent(new CustomEvent('select', { detail: { ...events[0], type: eventType } }));
            await sideBarUpdateDone;
            sinon.assert.calledOnce(spy);
            assert.notDeepEqual(view.sidebarWidget()?.constructor.name, 'SearchableView');
            assert.isTrue(view.sidebarWidget()?.contentElement.firstChild?.textContent?.includes('No details'));
        }
    });
    it('updates sidebarWidget upon receiving cellFocusedEvent when InterestGroupDetailsGetter failsupdates sidebarWidget upon receiving cellFocusedEvent when InterestGroupDetailsGetter fails', async function () {
        if (this.timeout() > 0) {
            this.timeout(10000);
        }
        const view = new View.InterestGroupStorageView(new InterestGroupDetailsGetterFails());
        events.forEach(event => {
            view.addEvent(event);
        });
        const grid = view.getInterestGroupGridForTesting();
        const spy = sinon.spy(view, 'setSidebarWidget');
        sinon.assert.notCalled(spy);
        grid.dispatchEvent(new CustomEvent('select', { detail: events[0] }));
        await raf();
        sinon.assert.calledOnce(spy);
        assert.notDeepEqual(view.sidebarWidget()?.constructor.name, 'SearchableView');
        assert.isTrue(view.sidebarWidget()?.contentElement.firstChild?.textContent?.includes('No details'));
    });
    it('clears sidebarWidget upon clearEvents', async function () {
        const view = new View.InterestGroupStorageView(new InterestGroupDetailsGetter());
        events.forEach(event => {
            view.addEvent(event);
        });
        const grid = view.getInterestGroupGridForTesting();
        const spy = sinon.spy(view, 'setSidebarWidget');
        sinon.assert.notCalled(spy);
        grid.dispatchEvent(new CustomEvent('select', { detail: events[0] }));
        await raf();
        sinon.assert.calledOnce(spy);
        assert.deepEqual(view.sidebarWidget()?.constructor.name, 'SearchableView');
        view.clearEvents();
        sinon.assert.calledTwice(spy);
        assert.notDeepEqual(view.sidebarWidget()?.constructor.name, 'SearchableView');
        assert.isTrue(view.sidebarWidget()?.contentElement.textContent?.includes('No interest group selectedSelect any interest group event to display the group\'s current state'));
    });
});
//# sourceMappingURL=InterestGroupStorageView.test.js.map