// Copyright 2024 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import { afterEach, beforeEach, describe, it } from 'mocha';
import sinon from 'sinon';
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import { renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import { setupLocaleHooks } from '../../testing/LocaleHelpers.js';
import { setupRuntimeHooks } from '../../testing/RuntimeHelpers.js';
import { setupSettingsHooks } from '../../testing/SettingsHelpers.js';
import { TestUniverse } from '../../testing/TestUniverse.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as ThemeSupport from '../../ui/legacy/theme_support/theme_support.js';
import * as SettingsUI from '../../ui/settings/settings.js';
import * as Emulation from './emulation.js';
describeWithEnvironment('AdvancedApp', () => {
    afterEach(() => {
        Emulation.AdvancedApp.AdvancedApp.removeInstance();
    });
    it('updates colors node link on ColorThemeChanged', async () => {
        const advancedApp = Emulation.AdvancedApp.AdvancedApp.instance(new TestUniverse());
        assert.exists(advancedApp);
        const fetchColorsSpy = sinon.spy(ThemeSupport.ThemeSupport.instance(), 'fetchColorsAndApplyHostTheme');
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.dispatchEventToListeners(Host.InspectorFrontendHostAPI.Events.ColorThemeChanged);
        sinon.assert.called(fetchColorsSpy);
    });
});
describeWithEnvironment('AdvancedApp docking', () => {
    setupLocaleHooks();
    setupSettingsHooks();
    setupRuntimeHooks();
    const { DockState } = UI.DockController;
    // Holds the callbacks passed to `setIsDocked` until the test lets the embedder respond.
    let pendingSetIsDockedResponses;
    // Stands in for the toolbox window that the AdvancedApp opens when DevTools is undocked.
    let toolboxFrame;
    function respondToSetIsDocked() {
        for (const respond of pendingSetIsDockedResponses.splice(0)) {
            respond();
        }
    }
    /**
     * The toolbox entrypoint (device_mode_emulation_frame.ts) loads the DOM extensions into the toolbox realm.
     * Do the same for the iframe by copying them over from this realm.
     */
    function installDOMExtensions(frameWindow) {
        const frameRealm = frameWindow;
        const prototypes = [
            [Node.prototype, frameRealm.Node.prototype],
            [Element.prototype, frameRealm.Element.prototype],
            [DocumentFragment.prototype, frameRealm.DocumentFragment.prototype],
            [Event.prototype, frameRealm.Event.prototype],
        ];
        for (const [prototype, framePrototype] of prototypes) {
            for (const name of Object.getOwnPropertyNames(prototype)) {
                const descriptor = Object.getOwnPropertyDescriptor(prototype, name);
                if (!(name in framePrototype) && descriptor) {
                    Object.defineProperty(framePrototype, name, descriptor);
                }
            }
        }
    }
    beforeEach(() => {
        UI.ActionRegistration.registerActionExtension({
            actionId: 'emulation.toggle-device-mode',
            category: "" /* UI.ActionRegistration.ActionCategory.NONE */,
        });
        UI.ZoomManager.ZoomManager.instance({
            forceNew: true,
            win: window,
            frontendHost: Host.InspectorFrontendHost.InspectorFrontendHostInstance,
        });
        pendingSetIsDockedResponses = [];
        sinon.stub(Host.InspectorFrontendHost.InspectorFrontendHostInstance, 'setIsDocked')
            .callsFake((_isDocked, callback) => pendingSetIsDockedResponses.push(callback));
        toolboxFrame = document.createElement('iframe');
        renderElementIntoDOM(toolboxFrame);
        assert.exists(toolboxFrame.contentWindow);
        installDOMExtensions(toolboxFrame.contentWindow);
        sinon.stub(window, 'open').returns(toolboxFrame.contentWindow);
    });
    afterEach(() => {
        const bodies = [document.body, toolboxFrame.contentDocument?.body].filter(body => body !== undefined);
        for (const rootView of bodies.flatMap(body => [...body.querySelectorAll(':scope > .root-view')])) {
            UI.Widget.Widget.get(rootView)?.detach();
        }
        Emulation.AdvancedApp.AdvancedApp.removeInstance();
        Emulation.InspectedPagePlaceholder.InspectedPagePlaceholder.instance({ forceNew: true });
        UI.ActionRegistration.maybeRemoveActionExtension('emulation.toggle-device-mode');
    });
    /**
     * Presents the AdvancedApp, docked to the right by default.
     */
    function presentApp() {
        const dockController = UI.DockController.DockController.instance({ forceNew: true, canDock: true });
        const app = Emulation.AdvancedApp.AdvancedApp.instance(new TestUniverse());
        dockController.initialize();
        app.presentUI(document);
        respondToSetIsDocked();
        return { dockController, app };
    }
    function getRootSplitWidget() {
        const rootSplitWidget = UI.InspectorView.InspectorView.instance().parentWidget();
        assert.instanceOf(rootSplitWidget, UI.SplitWidget.SplitWidget);
        return rootSplitWidget;
    }
    function findDeviceModeView(doc) {
        for (const element of doc.body.querySelectorAll('*')) {
            const widget = UI.Widget.Widget.get(element);
            if (widget instanceof Emulation.DeviceModeView.DeviceModeView) {
                return widget;
            }
        }
        return null;
    }
    /**
     * Presses the pointer on `element` and releases it again, and reports whether a resizer started a drag.
     */
    function startsResize(element) {
        const pointerDown = new PointerEvent('pointerdown', { bubbles: true, cancelable: true, button: 0 });
        element.dispatchEvent(pointerDown);
        element.ownerDocument.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, button: 0 }));
        return pointerDown.defaultPrevented;
    }
    /**
     * Presents the AdvancedApp docked to the right, after it was undocked once so that the toolbox is loaded.
     */
    async function presentAppWithLoadedToolbox() {
        const { dockController, app } = presentApp();
        await UI.Widget.Widget.allUpdatesComplete;
        dockController.setDockSide("undocked" /* DockState.UNDOCKED */);
        const toolboxDocument = toolboxFrame.contentDocument;
        assert.exists(toolboxDocument);
        app.deviceModeEmulationFrameLoaded(toolboxDocument);
        respondToSetIsDocked();
        dockController.setDockSide("right" /* DockState.RIGHT */);
        respondToSetIsDocked();
        await UI.Widget.Widget.allUpdatesComplete;
        const rootSplitWidget = getRootSplitWidget();
        assert.strictEqual(rootSplitWidget.showMode(), "Both" /* UI.SplitWidget.ShowMode.BOTH */);
        return { dockController, rootSplitWidget };
    }
    it('shows the inspector view after undocking and docking again in quick succession', async () => {
        const { dockController, rootSplitWidget } = await presentAppWithLoadedToolbox();
        dockController.setDockSide("undocked" /* DockState.UNDOCKED */);
        dockController.setDockSide("bottom" /* DockState.BOTTOM */);
        respondToSetIsDocked();
        assert.strictEqual(rootSplitWidget.showMode(), "Both" /* UI.SplitWidget.ShowMode.BOTH */);
        assert.isTrue(UI.InspectorView.InspectorView.instance().isShowing());
    });
    it('only shows the inspector view after docking and undocking again in quick succession', async () => {
        const { dockController, rootSplitWidget } = await presentAppWithLoadedToolbox();
        dockController.setDockSide("undocked" /* DockState.UNDOCKED */);
        respondToSetIsDocked();
        dockController.setDockSide("right" /* DockState.RIGHT */);
        dockController.setDockSide("undocked" /* DockState.UNDOCKED */);
        respondToSetIsDocked();
        // The device mode view lives in the toolbox window, so the inspector view must take up the whole DevTools window.
        assert.strictEqual(rootSplitWidget.showMode(), "OnlySidebar" /* UI.SplitWidget.ShowMode.ONLY_SIDEBAR */);
        assert.isTrue(UI.InspectorView.InspectorView.instance().isShowing());
    });
    const DOCKED_LAYOUTS = [
        { dockSide: "right" /* DockState.RIGHT */, isVertical: true, isSidebarSecond: true },
        { dockSide: "left" /* DockState.LEFT */, isVertical: true, isSidebarSecond: false },
        { dockSide: "bottom" /* DockState.BOTTOM */, isVertical: false, isSidebarSecond: true },
    ];
    for (const { dockSide, isVertical, isSidebarSecond } of DOCKED_LAYOUTS) {
        it(`shows the device mode view next to the inspector view when docked to ${dockSide}`, async () => {
            const { dockController } = presentApp();
            if (dockSide !== "bottom" /* DockState.BOTTOM */) {
                dockController.setDockSide("bottom" /* DockState.BOTTOM */);
                respondToSetIsDocked();
            }
            dockController.setDockSide(dockSide);
            respondToSetIsDocked();
            await UI.Widget.Widget.allUpdatesComplete;
            const rootSplitWidget = getRootSplitWidget();
            assert.strictEqual(rootSplitWidget.isVertical(), isVertical);
            assert.strictEqual(rootSplitWidget.isSidebarSecond(), isSidebarSecond);
            assert.strictEqual(rootSplitWidget.showMode(), "Both" /* UI.SplitWidget.ShowMode.BOTH */);
            assert.isTrue(rootSplitWidget.isResizable());
            assert.isTrue(UI.InspectorView.InspectorView.instance().isShowing());
            const deviceModeView = findDeviceModeView(document);
            assert.exists(deviceModeView);
            assert.isTrue(deviceModeView.isShowing());
            assert.isTrue(rootSplitWidget.mainWidget()?.element.contains(deviceModeView.element));
        });
        it(`uses the tab header as a resizer only when docked to bottom (docked to ${dockSide})`, () => {
            const { dockController } = presentApp();
            const topResizerElement = UI.InspectorView.InspectorView.instance().topResizerElement();
            if (dockSide !== "bottom" /* DockState.BOTTOM */) {
                dockController.setDockSide("bottom" /* DockState.BOTTOM */);
                respondToSetIsDocked();
                assert.isTrue(startsResize(topResizerElement));
            }
            dockController.setDockSide(dockSide);
            respondToSetIsDocked();
            assert.strictEqual(startsResize(topResizerElement), dockSide === "bottom" /* DockState.BOTTOM */);
        });
    }
    it('only shows the inspector view when undocked before the toolbox is loaded', async () => {
        const { dockController } = presentApp();
        await UI.Widget.Widget.allUpdatesComplete;
        dockController.setDockSide("undocked" /* DockState.UNDOCKED */);
        respondToSetIsDocked();
        const rootSplitWidget = getRootSplitWidget();
        assert.strictEqual(rootSplitWidget.showMode(), "OnlySidebar" /* UI.SplitWidget.ShowMode.ONLY_SIDEBAR */);
        assert.isFalse(rootSplitWidget.isResizable());
        assert.isTrue(UI.InspectorView.InspectorView.instance().isShowing());
        assert.isFalse(startsResize(UI.InspectorView.InspectorView.instance().topResizerElement()));
        assert.isNull(findDeviceModeView(document));
        const toolboxDocument = toolboxFrame.contentDocument;
        assert.exists(toolboxDocument);
        assert.isNull(findDeviceModeView(toolboxDocument));
    });
    it('moves the device mode view into the toolbox when undocked', () => {
        const { dockController, app } = presentApp();
        dockController.setDockSide("undocked" /* DockState.UNDOCKED */);
        const toolboxDocument = toolboxFrame.contentDocument;
        assert.exists(toolboxDocument);
        app.deviceModeEmulationFrameLoaded(toolboxDocument);
        respondToSetIsDocked();
        const rootSplitWidget = getRootSplitWidget();
        assert.strictEqual(rootSplitWidget.showMode(), "OnlySidebar" /* UI.SplitWidget.ShowMode.ONLY_SIDEBAR */);
        assert.isFalse(rootSplitWidget.isResizable());
        assert.isNull(findDeviceModeView(document));
        const deviceModeView = findDeviceModeView(toolboxDocument);
        assert.exists(deviceModeView);
        assert.isTrue(deviceModeView.isShowing());
    });
    it('moves the device mode view back from the toolbox when docked again', async () => {
        const { rootSplitWidget } = await presentAppWithLoadedToolbox();
        const toolboxDocument = toolboxFrame.contentDocument;
        assert.exists(toolboxDocument);
        assert.isNull(findDeviceModeView(toolboxDocument));
        const deviceModeView = findDeviceModeView(document);
        assert.exists(deviceModeView);
        assert.isTrue(deviceModeView.isShowing());
        assert.isTrue(rootSplitWidget.mainWidget()?.element.contains(deviceModeView.element));
    });
    it('does not set the inspected page bounds when starting undocked', () => {
        Common.Settings.Settings.instance()
            .resolve(SettingsUI.MainSettings.currentDockStateSettingDescriptor)
            .set("undocked" /* DockState.UNDOCKED */);
        const setInspectedPageBounds = sinon.stub(Host.InspectorFrontendHost.InspectorFrontendHostInstance, 'setInspectedPageBounds');
        presentApp();
        sinon.assert.notCalled(setInspectedPageBounds);
        assert.strictEqual(getRootSplitWidget().showMode(), "OnlySidebar" /* UI.SplitWidget.ShowMode.ONLY_SIDEBAR */);
        assert.isNull(findDeviceModeView(document));
    });
    it('does not set the inspected page bounds while the dock side changes', () => {
        const setInspectedPageBounds = sinon.stub(Host.InspectorFrontendHost.InspectorFrontendHostInstance, 'setInspectedPageBounds');
        const { dockController } = presentApp();
        sinon.assert.called(setInspectedPageBounds);
        setInspectedPageBounds.resetHistory();
        dockController.setDockSide("bottom" /* DockState.BOTTOM */);
        Emulation.InspectedPagePlaceholder.InspectedPagePlaceholder.instance().update();
        sinon.assert.notCalled(setInspectedPageBounds);
        respondToSetIsDocked();
        sinon.assert.called(setInspectedPageBounds);
    });
    it('focuses the inspector view when presented', () => {
        presentApp();
        assert.isTrue(UI.InspectorView.InspectorView.instance().hasFocus());
    });
    describe('view input', () => {
        function createApp() {
            const dockController = UI.DockController.DockController.instance({ forceNew: true, canDock: true });
            const view = sinon.spy(() => { });
            const toolboxView = sinon.spy(() => { });
            const app = new Emulation.AdvancedApp.AdvancedApp(new TestUniverse(), view, toolboxView);
            dockController.initialize();
            app.presentUI(document);
            respondToSetIsDocked();
            return { dockController, app, view, toolboxView };
        }
        function loadToolbox(app) {
            const toolboxDocument = toolboxFrame.contentDocument;
            assert.exists(toolboxDocument);
            app.deviceModeEmulationFrameLoaded(toolboxDocument);
        }
        function lastInput(view) {
            return view.lastCall.args[0];
        }
        it('renders the docked layout for each dock side', () => {
            const { dockController, view, toolboxView } = createApp();
            const { deviceModeView } = lastInput(view);
            assert.instanceOf(deviceModeView, Emulation.DeviceModeView.DeviceModeView);
            assert.deepEqual(lastInput(view), {
                direction: 'column',
                sidebarPosition: 'second',
                show: 'both',
                dockSide: "right" /* DockState.RIGHT */,
                topResizerEnabled: false,
                deviceModeView,
            });
            dockController.setDockSide("left" /* DockState.LEFT */);
            assert.deepEqual(lastInput(view), {
                direction: 'column',
                sidebarPosition: 'first',
                show: 'both',
                dockSide: "left" /* DockState.LEFT */,
                topResizerEnabled: false,
                deviceModeView,
            });
            dockController.setDockSide("bottom" /* DockState.BOTTOM */);
            assert.deepEqual(lastInput(view), {
                direction: 'row',
                sidebarPosition: 'second',
                show: 'both',
                dockSide: "bottom" /* DockState.BOTTOM */,
                topResizerEnabled: true,
                deviceModeView,
            });
            sinon.assert.notCalled(toolboxView);
        });
        it('leaves the device mode view detached when starting undocked', () => {
            Common.Settings.Settings.instance()
                .resolve(SettingsUI.MainSettings.currentDockStateSettingDescriptor)
                .set("undocked" /* DockState.UNDOCKED */);
            const { view, toolboxView } = createApp();
            assert.deepEqual(lastInput(view), {
                direction: 'row',
                sidebarPosition: 'second',
                show: 'sidebar',
                dockSide: "bottom" /* DockState.BOTTOM */,
                topResizerEnabled: false,
                deviceModeView: null,
            });
            sinon.assert.notCalled(toolboxView);
        });
        it('detaches the device mode view from the DevTools window while the toolbox loads', () => {
            const { dockController, view, toolboxView } = createApp();
            dockController.setDockSide("undocked" /* DockState.UNDOCKED */);
            respondToSetIsDocked();
            assert.deepInclude(lastInput(view), { show: 'sidebar', topResizerEnabled: false, deviceModeView: null });
            sinon.assert.notCalled(toolboxView);
        });
        it('moves the device mode view to the toolbox once it is loaded', () => {
            const { dockController, app, view, toolboxView } = createApp();
            const { deviceModeView } = lastInput(view);
            dockController.setDockSide("undocked" /* DockState.UNDOCKED */);
            loadToolbox(app);
            assert.deepInclude(lastInput(view), { show: 'sidebar', topResizerEnabled: false, deviceModeView: null });
            sinon.assert.calledWith(toolboxView.lastCall, { deviceModeView });
            // The DevTools window releases the device mode view before the toolbox picks it up.
            assert.isTrue(view.lastCall.calledBefore(toolboxView.lastCall));
        });
        it('only shows the device mode view right before undocking with a loaded toolbox', () => {
            const { dockController, app, view, toolboxView } = createApp();
            const { deviceModeView } = lastInput(view);
            dockController.setDockSide("undocked" /* DockState.UNDOCKED */);
            loadToolbox(app);
            respondToSetIsDocked();
            dockController.setDockSide("right" /* DockState.RIGHT */);
            respondToSetIsDocked();
            view.resetHistory();
            toolboxView.resetHistory();
            dockController.setDockSide("undocked" /* DockState.UNDOCKED */);
            // Before the dock side changes, the inspector view is hidden to mimic the undocked layout.
            assert.deepInclude(view.firstCall.args[0], { show: 'main', deviceModeView });
            assert.deepInclude(lastInput(view), { show: 'sidebar', topResizerEnabled: false, deviceModeView: null });
            sinon.assert.calledWith(toolboxView.lastCall, { deviceModeView });
            // When undocking, the DevTools window releases the device mode view before the toolbox picks it up.
            assert.isTrue(view.lastCall.calledBefore(toolboxView.lastCall));
        });
        it('waits for the embedder before showing the inspector view when docking with a loaded toolbox', () => {
            const { dockController, app, view, toolboxView } = createApp();
            const { deviceModeView } = lastInput(view);
            dockController.setDockSide("undocked" /* DockState.UNDOCKED */);
            loadToolbox(app);
            respondToSetIsDocked();
            view.resetHistory();
            toolboxView.resetHistory();
            dockController.setDockSide("bottom" /* DockState.BOTTOM */);
            assert.deepInclude(lastInput(view), { show: 'main', deviceModeView });
            sinon.assert.calledWith(toolboxView.lastCall, { deviceModeView: null });
            // When docking back, the toolbox releases the device mode view before the DevTools window picks it up.
            assert.isTrue(toolboxView.lastCall.calledBefore(view.lastCall));
            respondToSetIsDocked();
            assert.deepEqual(lastInput(view), {
                direction: 'row',
                sidebarPosition: 'second',
                show: 'both',
                dockSide: "bottom" /* DockState.BOTTOM */,
                topResizerEnabled: true,
                deviceModeView,
            });
        });
        it('docks to the latest dock side when undocking and docking again in quick succession', () => {
            const { dockController, app, view } = createApp();
            dockController.setDockSide("undocked" /* DockState.UNDOCKED */);
            loadToolbox(app);
            respondToSetIsDocked();
            dockController.setDockSide("right" /* DockState.RIGHT */);
            respondToSetIsDocked();
            dockController.setDockSide("undocked" /* DockState.UNDOCKED */);
            dockController.setDockSide("left" /* DockState.LEFT */);
            respondToSetIsDocked();
            assert.deepInclude(lastInput(view), { show: 'both', dockSide: "left" /* DockState.LEFT */, sidebarPosition: 'first', topResizerEnabled: false });
        });
    });
    describe('DEFAULT_VIEW', () => {
        async function renderView(input, target) {
            const container = target ?? renderElementIntoDOM(new UI.Widget.VBox(), { allowMultipleChildren: true });
            Emulation.AdvancedApp.DEFAULT_VIEW({
                direction: 'column',
                sidebarPosition: 'second',
                show: 'both',
                dockSide: "right" /* DockState.RIGHT */,
                topResizerEnabled: false,
                deviceModeView: null,
                ...input,
            }, undefined, container.contentElement);
            // The split view picks up its slotted widgets on `slotchange`.
            await UI.Widget.Widget.allUpdatesComplete;
            return { splitWidget: getRootSplitWidget(), target: container };
        }
        it('renders the device mode view and the inspector view side by side', async () => {
            const deviceModeView = new Emulation.DeviceModeView.DeviceModeView();
            const { splitWidget } = await renderView({ deviceModeView });
            assert.isTrue(splitWidget.isVertical());
            assert.isTrue(splitWidget.isSidebarSecond());
            assert.strictEqual(splitWidget.showMode(), "Both" /* UI.SplitWidget.ShowMode.BOTH */);
            assert.strictEqual(splitWidget.sidebarWidget(), UI.InspectorView.InspectorView.instance());
            assert.isTrue(splitWidget.mainWidget()?.element.contains(deviceModeView.element));
        });
        it('renders the inspector view below the page when docked to bottom', async () => {
            const { splitWidget } = await renderView({ direction: 'row', sidebarPosition: 'second', dockSide: "bottom" /* DockState.BOTTOM */ });
            assert.isFalse(splitWidget.isVertical());
            assert.isTrue(splitWidget.isSidebarSecond());
        });
        it('detaches the device mode view synchronously when deviceModeView becomes null', async () => {
            const deviceModeView = new Emulation.DeviceModeView.DeviceModeView();
            const { target } = await renderView({ deviceModeView });
            assert.isTrue(deviceModeView.isShowing());
            const { splitWidget } = await renderView({ show: 'sidebar', dockSide: "undocked" /* DockState.UNDOCKED */, deviceModeView: null }, target);
            assert.strictEqual(splitWidget.showMode(), "OnlySidebar" /* UI.SplitWidget.ShowMode.ONLY_SIDEBAR */);
            assert.isFalse(deviceModeView.isShowing());
            assert.isNull(deviceModeView.parentWidget());
            assert.strictEqual(splitWidget.sidebarWidget(), UI.InspectorView.InspectorView.instance());
        });
        it('toggles the inspector view tab header as a resizer via topResizerEnabled', async () => {
            const { target } = await renderView({ direction: 'row', dockSide: "bottom" /* DockState.BOTTOM */, topResizerEnabled: true });
            const topResizerElement = UI.InspectorView.InspectorView.instance().topResizerElement();
            assert.isTrue(startsResize(topResizerElement));
            await renderView({ direction: 'column', dockSide: "right" /* DockState.RIGHT */, topResizerEnabled: false }, target);
            assert.isFalse(startsResize(topResizerElement));
        });
        const RESIZER_TRANSFORMS = [
            { dockSide: "right" /* DockState.RIGHT */, transform: 'matrix(1, 0, 0, 1, 2, 0)' },
            { dockSide: "left" /* DockState.LEFT */, transform: 'matrix(1, 0, 0, 1, -2, 0)' },
            { dockSide: "bottom" /* DockState.BOTTOM */, transform: 'none' },
        ];
        for (const { dockSide, transform } of RESIZER_TRANSFORMS) {
            it(`offsets the resizer towards the inspected page when docked to ${dockSide}`, async () => {
                const { splitWidget } = await renderView({ dockSide });
                assert.strictEqual(getComputedStyle(splitWidget.resizerElement()).transform, transform);
            });
        }
    });
});
//# sourceMappingURL=AdvancedApp.test.js.map