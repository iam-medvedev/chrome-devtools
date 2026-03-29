// Copyright 2024 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../core/host/host.js';
import { renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import { setupSettingsHooks } from '../../testing/SettingsHelpers.js';
import * as LegacyUI from './legacy.js';
const InspectorView = LegacyUI.InspectorView.InspectorView;
const { DockState } = LegacyUI.DockController;
describeWithEnvironment('InspectorView', () => {
    setupSettingsHooks();
    function createInspectorViewWithDockState(dockState) {
        const dockController = LegacyUI.DockController.DockController.instance({ forceNew: true, canDock: true });
        dockController.setDockSide(dockState);
        const inspectorView = InspectorView.instance({ forceNew: true });
        inspectorView.markAsRoot();
        renderElementIntoDOM(inspectorView);
        return { inspectorView, dockController };
    }
    beforeEach(() => {
        // `setIsDocked` resolves async and leaves elements in the body after the test is finished.
        sinon.stub(Host.InspectorFrontendHost.InspectorFrontendHostInstance, 'setIsDocked');
    });
    describe('reload required warnings', () => {
        it('displays both debugged tab and devtools reload warnings independently', () => {
            const { inspectorView } = createInspectorViewWithDockState("bottom" /* DockState.BOTTOM */);
            inspectorView.displayDebuggedTabReloadRequiredWarning('Debugged tab reload required');
            inspectorView.displayReloadRequiredWarning('DevTools reload required');
            // The infobars are added to a flex-none div within the content element.
            // We expect two children in that div.
            const infoBarDiv = inspectorView.contentElement.querySelector('.flex-none');
            assert.exists(infoBarDiv);
            assert.strictEqual(infoBarDiv.childElementCount, 2);
            const firstInfobar = infoBarDiv.children[0];
            const secondInfobar = infoBarDiv.children[1];
            assert.exists(firstInfobar.shadowRoot);
            assert.exists(secondInfobar.shadowRoot);
            const firstLabel = firstInfobar.shadowRoot.querySelector('.infobar-info-text');
            const secondLabel = secondInfobar.shadowRoot.querySelector('.infobar-info-text');
            assert.exists(firstLabel);
            assert.exists(secondLabel);
            assert.strictEqual(firstLabel.textContent, 'Debugged tab reload required');
            assert.strictEqual(secondLabel.textContent, 'DevTools reload required');
        });
    });
    describe('Chrome restart required warnings', () => {
        function assertShowsOnlyChromeRestartWarning(inspectorView) {
            const infoBarDiv = inspectorView.contentElement.querySelector('.flex-none');
            assert.exists(infoBarDiv);
            assert.strictEqual(infoBarDiv.childElementCount, 1);
            const infobar = infoBarDiv.children[0];
            assert.exists(infobar.shadowRoot);
            const label = infobar.shadowRoot.querySelector('.infobar-info-text');
            assert.exists(label);
            assert.strictEqual(label.textContent, 'Chrome restart required');
        }
        it('displays Chrome restart warning', () => {
            const { inspectorView } = createInspectorViewWithDockState("bottom" /* DockState.BOTTOM */);
            inspectorView.displayChromeRestartRequiredWarning('Chrome restart required');
            assertShowsOnlyChromeRestartWarning(inspectorView);
        });
        it('hides reload warning when Chrome restart warning is displayed', () => {
            const { inspectorView } = createInspectorViewWithDockState("bottom" /* DockState.BOTTOM */);
            inspectorView.displayReloadRequiredWarning('Reload required');
            inspectorView.displayChromeRestartRequiredWarning('Chrome restart required');
            assertShowsOnlyChromeRestartWarning(inspectorView);
        });
        it('does not display reload warning when Chrome restart warning is already displayed', () => {
            const { inspectorView } = createInspectorViewWithDockState("bottom" /* DockState.BOTTOM */);
            inspectorView.displayChromeRestartRequiredWarning('Chrome restart required');
            inspectorView.displayReloadRequiredWarning('Reload required');
            assertShowsOnlyChromeRestartWarning(inspectorView);
        });
    });
    describe('action delegate', () => {
        it('main.toggle-drawer shows drawer when hidden', () => {
            const { inspectorView } = createInspectorViewWithDockState("bottom" /* DockState.BOTTOM */);
            assert.isFalse(inspectorView.drawerVisible());
            const delegate = new LegacyUI.InspectorView.ActionDelegate();
            delegate.handleAction({}, 'main.toggle-drawer');
            assert.isTrue(inspectorView.drawerVisible());
            assert.isFalse(inspectorView.isDrawerMinimized());
        });
    });
});
//# sourceMappingURL=InspectorView.test.js.map