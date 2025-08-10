// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import * as UI from './legacy.js';
describeWithEnvironment('ViewManager', () => {
    let viewManager;
    let locationResolver;
    class MockLocationResolver {
        locations = new Map();
        resolveLocation(locationName) {
            return this.locations.get(locationName)?.location ?? null;
        }
        createLocation(panelName, initialVisibility, defaultTab) {
            const location = viewManager.createTabbedLocation(() => {
                this.locations.get(panelName).isShown = initialVisibility;
            }, panelName, false, true, defaultTab);
            this.locations.set(panelName, { location, isShown: initialVisibility });
            sinon.stub(location.tabbedPane(), 'isShowing').callsFake(() => this.locations.get(panelName)?.isShown ?? false);
        }
        setPanelVisibility(panelName, isShown) {
            const mock = this.locations.get(panelName);
            if (!mock) {
                return;
            }
            mock.isShown = isShown;
            mock.location.tabbedPane().dispatchEventToListeners(UI.TabbedPane.Events.PaneVisibilityChanged, { isVisible: isShown });
        }
    }
    function startListeningForViewVisibilityUpdates() {
        const events = [];
        const listener = viewManager.addEventListener("ViewVisibilityChanged" /* UI.ViewManager.Events.VIEW_VISIBILITY_CHANGED */, event => events.push(event));
        return {
            finishAndGetEvents() {
                viewManager.removeEventListener("ViewVisibilityChanged" /* UI.ViewManager.Events.VIEW_VISIBILITY_CHANGED */, listener.listener);
                return events;
            },
        };
    }
    beforeEach(() => {
        UI.ViewManager.resetViewRegistration();
        locationResolver = new MockLocationResolver();
        UI.ViewManager.registerLocationResolver({
            name: "panel" /* UI.ViewManager.ViewLocationValues.PANEL */,
            category: "PANEL" /* UI.ViewManager.ViewLocationCategory.PANEL */,
            async loadResolver() {
                return locationResolver;
            },
        });
        UI.ViewManager.registerLocationResolver({
            name: "drawer-view" /* UI.ViewManager.ViewLocationValues.DRAWER_VIEW */,
            category: "DRAWER" /* UI.ViewManager.ViewLocationCategory.DRAWER */,
            async loadResolver() {
                return locationResolver;
            },
        });
        const testViews = [
            { id: 'view-1', location: "panel" /* UI.ViewManager.ViewLocationValues.PANEL */ },
            { id: 'view-2', location: "panel" /* UI.ViewManager.ViewLocationValues.PANEL */ },
            { id: 'view-3', location: "panel" /* UI.ViewManager.ViewLocationValues.PANEL */ },
            { id: 'drawer-view-1', location: "drawer-view" /* UI.ViewManager.ViewLocationValues.DRAWER_VIEW */ }
        ];
        for (const { id, location } of testViews) {
            UI.ViewManager.registerViewExtension({
                id,
                location,
                commandPrompt: () => i18n.i18n.lockedString(id),
                title: () => i18n.i18n.lockedString(id),
                async loadView() {
                    return new UI.Widget.Widget();
                },
            });
        }
        viewManager = UI.ViewManager.ViewManager.instance({ forceNew: true });
        locationResolver.createLocation("panel" /* UI.ViewManager.ViewLocationValues.PANEL */, true, 'view-1');
        locationResolver.createLocation("drawer-view" /* UI.ViewManager.ViewLocationValues.DRAWER_VIEW */, false, undefined);
    });
    it('correctly reports initial visibility', async () => {
        assert.isTrue(viewManager.isViewVisible('view-1'), 'view-1 should be visible');
        assert.isFalse(viewManager.isViewVisible('view-2'), 'view-2 should not be visible');
        assert.isFalse(viewManager.isViewVisible('drawer-view-1'), 'drawer-view should not be visible');
    });
    it('correctly reports visibility after switching view', async () => {
        await viewManager.showView('view-2');
        assert.isFalse(viewManager.isViewVisible('view-1'), 'view-1 should not be visible after switching');
        assert.isTrue(viewManager.isViewVisible('view-2'), 'view-2 should be visible after switching');
    });
    it('returns false for a non-existent view', () => {
        assert.isFalse(viewManager.isViewVisible('non-existent-view'));
    });
    it('emits single event when a view is shown', async () => {
        const eventListener = startListeningForViewVisibilityUpdates();
        await viewManager.showView('drawer-view-1');
        const events = eventListener.finishAndGetEvents();
        assert.lengthOf(events, 1);
        const eventData = events[0].data;
        assert.strictEqual(eventData.location, "drawer-view" /* UI.ViewManager.ViewLocationValues.DRAWER_VIEW */);
        assert.strictEqual(eventData.revealedViewId, 'drawer-view-1');
        assert.isUndefined(eventData.hiddenViewId);
    });
    it('emits single event when switching between views', async () => {
        const eventListener = startListeningForViewVisibilityUpdates();
        await viewManager.showView('view-2');
        const events = eventListener.finishAndGetEvents();
        assert.lengthOf(events, 1);
        const eventData = events[0].data;
        assert.strictEqual(eventData.location, "panel" /* UI.ViewManager.ViewLocationValues.PANEL */);
        assert.strictEqual(eventData.revealedViewId, 'view-2');
        assert.strictEqual(eventData.hiddenViewId, 'view-1');
    });
    it('correctly dispatches events to multiple listeners', async () => {
        const promise1 = viewManager.once("ViewVisibilityChanged" /* UI.ViewManager.Events.VIEW_VISIBILITY_CHANGED */);
        const promise2 = viewManager.once("ViewVisibilityChanged" /* UI.ViewManager.Events.VIEW_VISIBILITY_CHANGED */);
        await viewManager.showView('view-2');
        const eventsData = await Promise.all([promise1, promise2]);
        for (const eventData of eventsData) {
            assert.strictEqual(eventData.location, "panel" /* UI.ViewManager.ViewLocationValues.PANEL */);
            assert.strictEqual(eventData.revealedViewId, 'view-2');
            assert.strictEqual(eventData.hiddenViewId, 'view-1');
        }
    });
    it('correctly reports visibility when panel is hidden', async () => {
        await viewManager.showView('drawer-view-1');
        locationResolver.setPanelVisibility("drawer-view" /* UI.ViewManager.ViewLocationValues.DRAWER_VIEW */, false);
        assert.isFalse(viewManager.isViewVisible('drawer-view-1'), 'drawer-view-1 should not be visible');
    });
    it('correctly dispatches event when panel is hidden', async () => {
        const eventListener = startListeningForViewVisibilityUpdates();
        locationResolver.setPanelVisibility("panel" /* UI.ViewManager.ViewLocationValues.PANEL */, false);
        const events = eventListener.finishAndGetEvents();
        assert.lengthOf(events, 1);
        assert.strictEqual(events[0].data.location, "panel" /* UI.ViewManager.ViewLocationValues.PANEL */);
        assert.isUndefined(events[0].data.revealedViewId);
        assert.strictEqual(events[0].data.hiddenViewId, 'view-1');
    });
    it('correctly dispatches event when panel is shown again', async () => {
        locationResolver.setPanelVisibility("panel" /* UI.ViewManager.ViewLocationValues.PANEL */, false);
        const eventListener = startListeningForViewVisibilityUpdates();
        locationResolver.setPanelVisibility("panel" /* UI.ViewManager.ViewLocationValues.PANEL */, true);
        const events = eventListener.finishAndGetEvents();
        assert.lengthOf(events, 1);
        assert.strictEqual(events[0].data.location, "panel" /* UI.ViewManager.ViewLocationValues.PANEL */);
        assert.strictEqual(events[0].data.revealedViewId, 'view-1');
        assert.isUndefined(events[0].data.hiddenViewId);
    });
    describe('createTabbedLocation', () => {
        it('remembers closeable views in the `closeable-tabs` setting', async () => {
            const tabbedLocation = viewManager.createTabbedLocation(() => { }, '');
            const closeableView = new UI.View.SimpleView({
                title: i18n.i18n.lockedString('Closable view'),
                viewId: 'closeable-view',
            });
            sinon.stub(closeableView, 'isCloseable').returns(true);
            await tabbedLocation.showView(closeableView);
            assert.propertyVal(Common.Settings.Settings.instance().settingForTest('closeable-tabs').get(), 'closeable-view', true, 'Closeable views must be recorded in `closeable-tabs` while they are shown');
        });
        it('removes closeable views from the `closeable-tabs` setting when they are closed', async () => {
            const tabbedLocation = viewManager.createTabbedLocation(() => { }, '');
            const closeableView = new UI.View.SimpleView({
                title: i18n.i18n.lockedString('Closable view'),
                viewId: 'closeable-view',
            });
            sinon.stub(closeableView, 'isCloseable').returns(true);
            await tabbedLocation.showView(closeableView);
            tabbedLocation.removeView(closeableView);
            assert.notPropertyVal(Common.Settings.Settings.instance().settingForTest('closeable-tabs').get(), 'closeable-view', true, 'Closeable views must be removed from `closeable-tabs` when they are closed');
        });
        it('does not include transient views in the `closeable-tabs` setting', async () => {
            const tabbedLocation = viewManager.createTabbedLocation(() => { }, '');
            const closeableView = new UI.View.SimpleView({
                title: i18n.i18n.lockedString('Transient view'),
                viewId: 'transient-view',
            });
            sinon.stub(closeableView, 'isTransient').returns(true);
            await tabbedLocation.showView(closeableView);
            assert.notProperty(Common.Settings.Settings.instance().settingForTest('closeable-tabs').get(), 'transient-view', 'Transient views must never be included in `closeable-tabs`');
        });
    });
});
//# sourceMappingURL=ViewManager.test.js.map