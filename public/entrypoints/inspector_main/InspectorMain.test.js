// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as ProtocolClient from '../../core/protocol_client/protocol_client.js';
import * as Root from '../../core/root/root.js';
import * as SDK from '../../core/sdk/sdk.js';
import { createTarget, getGetHostConfigStub, stubNoopSettings, } from '../../testing/EnvironmentHelpers.js';
import { expectCall } from '../../testing/ExpectStubCall.js';
import { describeWithMockConnection, setMockConnectionResponseHandler, } from '../../testing/MockConnection.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as InspectorMain from './inspector_main.js';
describeWithMockConnection('FocusDebuggeeActionDelegate', () => {
    it('uses main frame', async () => {
        const tabTarget = createTarget({ type: SDK.Target.Type.TAB });
        createTarget({ parentTarget: tabTarget, subtype: 'prerender' });
        const frameTarget = createTarget({ parentTarget: tabTarget });
        const delegate = new InspectorMain.InspectorMain.FocusDebuggeeActionDelegate();
        const bringToFront = sinon.spy(frameTarget.pageAgent(), 'invoke_bringToFront');
        delegate.handleAction({}, 'foo');
        assert.isTrue(bringToFront.calledOnce);
    });
});
describeWithMockConnection('InspectorMainImpl', () => {
    const DEBUGGER_ID = 'debuggerId';
    const runForTabTarget = async () => {
        const inspectorMain = InspectorMain.InspectorMain.InspectorMainImpl.instance({ forceNew: true });
        const runPromise = inspectorMain.run();
        const rootTarget = SDK.TargetManager.TargetManager.instance().rootTarget();
        SDK.TargetManager.TargetManager.instance().createTarget('someTargetID', 'someName', SDK.Target.Type.FRAME, rootTarget, undefined);
        await runPromise;
    };
    beforeEach(() => {
        sinon.stub(ProtocolClient.InspectorBackend.Connection, 'setFactory');
    });
    describe('comparingBrowserSettingWithCookieControlSetting', () => {
        // Before the tests, we need to add these settings to allow the InspectorMain.run to work
        beforeEach(async () => {
            Common.Settings.registerSettingExtension({
                settingName: 'auto-attach-to-created-pages',
                settingType: "boolean" /* Common.Settings.SettingType.BOOLEAN */,
                defaultValue: false,
            });
            Common.Settings.registerSettingExtension({
                settingName: 'network.ad-blocking-enabled',
                settingType: "boolean" /* Common.Settings.SettingType.BOOLEAN */,
                defaultValue: false,
            });
            Common.Settings.registerSettingExtension({
                settingName: 'emulate-page-focus',
                settingType: "boolean" /* Common.Settings.SettingType.BOOLEAN */,
                defaultValue: false,
            });
            const storage = Common.Settings.Settings.instance().localStorage;
            Common.Settings.Settings.instance({ forceNew: true, syncedStorage: storage, globalStorage: storage, localStorage: storage });
        });
        function setBrowserConfig(thirdPartyCookieRestrictionEnabled, thirdPartyCookieMetadataEnabled, thirdPartyCookieHeuristicsEnabled, managedBlockThirdPartyCookies) {
            getGetHostConfigStub({
                thirdPartyCookieControls: {
                    thirdPartyCookieRestrictionEnabled,
                    thirdPartyCookieHeuristicsEnabled,
                    thirdPartyCookieMetadataEnabled,
                    managedBlockThirdPartyCookies,
                },
                devToolsPrivacyUI: { enabled: true }
            });
        }
        function setDevtoolsCookieControls(cookieControlOverrideEnabled, gracePeriodMitigationEnabled, heuristicMitigationEnabled) {
            Common.Settings.Settings.instance().createSetting('cookie-control-override-enabled', cookieControlOverrideEnabled);
            Common.Settings.Settings.instance().createSetting('grace-period-mitigation-disabled', !gracePeriodMitigationEnabled);
            Common.Settings.Settings.instance().createSetting('heuristic-mitigation-disabled', !heuristicMitigationEnabled);
        }
        it('does not show infobar when enterpirse is blocking third-party cookies', async () => {
            const restrictThirdPartyCookies = true;
            const gracePeriodEnabled = true;
            const heuristicsEnabled = true;
            const enterpriseBlocksThirdPartyCookies = true;
            setBrowserConfig(restrictThirdPartyCookies, gracePeriodEnabled, heuristicsEnabled, enterpriseBlocksThirdPartyCookies);
            setDevtoolsCookieControls(restrictThirdPartyCookies, gracePeriodEnabled, heuristicsEnabled);
            const reloadRequiredInfobarSpy = sinon.spy(UI.InspectorView.InspectorView.instance(), 'displayDebuggedTabReloadRequiredWarning');
            const inspectorMain = InspectorMain.InspectorMain.InspectorMainImpl.instance({ forceNew: true });
            await inspectorMain.run();
            assert.isTrue(reloadRequiredInfobarSpy.notCalled);
        });
        it('does not show infobar when control setting is undefined', async () => {
            const restrictThirdPartyCookies = true;
            const gracePeriodEnabled = true;
            const heuristicsEnabled = true;
            setBrowserConfig(restrictThirdPartyCookies, gracePeriodEnabled, heuristicsEnabled);
            const reloadRequiredInfobarSpy = sinon.spy(UI.InspectorView.InspectorView.instance(), 'displayDebuggedTabReloadRequiredWarning');
            const inspectorMain = InspectorMain.InspectorMain.InspectorMainImpl.instance({ forceNew: true });
            await inspectorMain.run();
            assert.isTrue(reloadRequiredInfobarSpy.notCalled);
        });
        it('does not show infobar when control settings match browser settings', async () => {
            const restrictThirdPartyCookies = true;
            const gracePeriodEnabled = true;
            const heuristicsEnabled = true;
            setBrowserConfig(restrictThirdPartyCookies, gracePeriodEnabled, heuristicsEnabled);
            setDevtoolsCookieControls(restrictThirdPartyCookies, gracePeriodEnabled, heuristicsEnabled);
            const reloadRequiredInfobarSpy = sinon.spy(UI.InspectorView.InspectorView.instance(), 'displayDebuggedTabReloadRequiredWarning');
            const inspectorMain = InspectorMain.InspectorMain.InspectorMainImpl.instance({ forceNew: true });
            await inspectorMain.run();
            assert.isTrue(reloadRequiredInfobarSpy.notCalled);
        });
        it('shows infobar when cookie control override differs from browser setting', async () => {
            const restrictThirdPartyCookies = true;
            const gracePeriodEnabled = true;
            const heuristicsEnabled = true;
            setBrowserConfig(restrictThirdPartyCookies, gracePeriodEnabled, heuristicsEnabled);
            setDevtoolsCookieControls(!restrictThirdPartyCookies, gracePeriodEnabled, heuristicsEnabled);
            const reloadRequiredInfobarSpy = sinon.spy(UI.InspectorView.InspectorView.instance(), 'displayDebuggedTabReloadRequiredWarning');
            const inspectorMain = InspectorMain.InspectorMain.InspectorMainImpl.instance({ forceNew: true });
            await inspectorMain.run();
            assert.isTrue(reloadRequiredInfobarSpy.calledOnce);
        });
        it('shows infobar when a mitigation override differs from browser setting', async () => {
            const restrictThirdPartyCookies = true;
            const gracePeriodEnabled = true;
            const heuristicsEnabled = true;
            setBrowserConfig(restrictThirdPartyCookies, gracePeriodEnabled, heuristicsEnabled);
            setDevtoolsCookieControls(restrictThirdPartyCookies, !gracePeriodEnabled, heuristicsEnabled);
            const reloadRequiredInfobarSpy = sinon.spy(UI.InspectorView.InspectorView.instance(), 'displayDebuggedTabReloadRequiredWarning');
            const inspectorMain = InspectorMain.InspectorMain.InspectorMainImpl.instance({ forceNew: true });
            await inspectorMain.run();
            assert.isTrue(reloadRequiredInfobarSpy.calledOnce);
        });
    });
    describe('withNoopSettings', () => {
        beforeEach(() => {
            stubNoopSettings();
            getGetHostConfigStub({ devToolsPrivacyUI: { enabled: false } });
        });
        it('continues only after primary page target is available', async () => {
            Root.Runtime.Runtime.setQueryParamForTesting('targetType', 'tab');
            const inspectorMain = InspectorMain.InspectorMain.InspectorMainImpl.instance({ forceNew: true });
            let finished = false;
            inspectorMain.run()
                .then(() => {
                finished = true;
            })
                .catch(e => {
                throw e;
            });
            await new Promise(resolve => setTimeout(resolve, 0));
            assert.isFalse(finished);
            const rootTarget = SDK.TargetManager.TargetManager.instance().rootTarget();
            SDK.TargetManager.TargetManager.instance().createTarget('someTargetID', 'someName', SDK.Target.Type.FRAME, rootTarget, undefined);
            await new Promise(resolve => setTimeout(resolve, 0));
            assert.isTrue(finished);
        });
        it('sets main target type to Node if v8only query param present', async () => {
            const inspectorMain = InspectorMain.InspectorMain.InspectorMainImpl.instance({ forceNew: true });
            Root.Runtime.Runtime.setQueryParamForTesting('v8only', 'true');
            assert.notExists(SDK.TargetManager.TargetManager.instance().rootTarget());
            await inspectorMain.run();
            assert.strictEqual(SDK.TargetManager.TargetManager.instance().rootTarget()?.type(), SDK.Target.Type.NODE);
            Root.Runtime.Runtime.setQueryParamForTesting('v8only', '');
        });
        it('sets main target type to Tab if targetType=tab query param present', async () => {
            Root.Runtime.Runtime.setQueryParamForTesting('targetType', 'tab');
            assert.notExists(SDK.TargetManager.TargetManager.instance().rootTarget());
            await runForTabTarget();
            assert.strictEqual(SDK.TargetManager.TargetManager.instance().rootTarget()?.type(), SDK.Target.Type.TAB);
            Root.Runtime.Runtime.setQueryParamForTesting('targetType', '');
        });
        it('sets main target type to Frame by default', async () => {
            const inspectorMain = InspectorMain.InspectorMain.InspectorMainImpl.instance({ forceNew: true });
            assert.notExists(SDK.TargetManager.TargetManager.instance().rootTarget());
            await inspectorMain.run();
            assert.strictEqual(SDK.TargetManager.TargetManager.instance().rootTarget()?.type(), SDK.Target.Type.FRAME);
        });
        it('creates main target waiting for debugger if the main target is frame and panel is sources', async () => {
            const inspectorMain = InspectorMain.InspectorMain.InspectorMainImpl.instance({ forceNew: true });
            Root.Runtime.Runtime.setQueryParamForTesting('panel', 'sources');
            assert.notExists(SDK.TargetManager.TargetManager.instance().rootTarget());
            const waitForDebugger = sinon.spy();
            const debuggerPause = sinon.spy();
            setMockConnectionResponseHandler('Page.waitForDebugger', waitForDebugger);
            setMockConnectionResponseHandler('Debugger.enable', () => ({ debuggerId: DEBUGGER_ID }));
            setMockConnectionResponseHandler('Debugger.pause', debuggerPause);
            await inspectorMain.run();
            assert.isTrue(waitForDebugger.calledOnce);
            assert.isTrue(debuggerPause.calledOnce);
            Root.Runtime.Runtime.setQueryParamForTesting('panel', '');
        });
        it('wait for Debugger.enable before calling Debugger.pause', async () => {
            const inspectorMain = InspectorMain.InspectorMain.InspectorMainImpl.instance({ forceNew: true });
            Root.Runtime.Runtime.setQueryParamForTesting('panel', 'sources');
            assert.notExists(SDK.TargetManager.TargetManager.instance().rootTarget());
            const debuggerPause = sinon.stub();
            setMockConnectionResponseHandler('Debugger.pause', debuggerPause);
            const debuggerPauseCalled = expectCall(debuggerPause);
            let debuggerEnable = (_) => { };
            setMockConnectionResponseHandler('Debugger.enable', () => new Promise(resolve => {
                debuggerEnable = resolve;
            }));
            assert.notExists(SDK.TargetManager.TargetManager.instance().rootTarget());
            const result = inspectorMain.run();
            assert.isFalse(debuggerPause.called);
            debuggerEnable({ debuggerId: DEBUGGER_ID, getError: () => undefined });
            await Promise.all([debuggerPauseCalled, result]);
            assert.isTrue(debuggerPause.calledOnce);
            Root.Runtime.Runtime.setQueryParamForTesting('panel', '');
        });
        it('frontend correctly registers if Debugger.enable fails', async () => {
            const inspectorMain = InspectorMain.InspectorMain.InspectorMainImpl.instance({ forceNew: true });
            assert.notExists(SDK.TargetManager.TargetManager.instance().rootTarget());
            setMockConnectionResponseHandler('Debugger.enable', () => ({ getError: () => 'Debugger.enable failed' }));
            await inspectorMain.run();
            const target = SDK.TargetManager.TargetManager.instance().rootTarget();
            assert.isNotNull(target);
            const debuggerModel = target.model(SDK.DebuggerModel.DebuggerModel);
            assert.isFalse(debuggerModel.debuggerEnabled());
        });
        it('calls Runtime.runIfWaitingForDebugger for Node target', async () => {
            Root.Runtime.Runtime.setQueryParamForTesting('v8only', 'true');
            const inspectorMain = InspectorMain.InspectorMain.InspectorMainImpl.instance({ forceNew: true });
            const runIfWaitingForDebugger = sinon.spy();
            setMockConnectionResponseHandler('Runtime.runIfWaitingForDebugger', runIfWaitingForDebugger);
            await inspectorMain.run();
            assert.isTrue(runIfWaitingForDebugger.calledOnce);
            Root.Runtime.Runtime.setQueryParamForTesting('v8only', '');
        });
        it('calls Runtime.runIfWaitingForDebugger for frame target', async () => {
            const inspectorMain = InspectorMain.InspectorMain.InspectorMainImpl.instance({ forceNew: true });
            const runIfWaitingForDebugger = sinon.spy();
            setMockConnectionResponseHandler('Runtime.runIfWaitingForDebugger', runIfWaitingForDebugger);
            await inspectorMain.run();
            assert.isTrue(runIfWaitingForDebugger.calledOnce);
        });
        it('does not call Runtime.runIfWaitingForDebugger for Tab target', async () => {
            Root.Runtime.Runtime.setQueryParamForTesting('targetType', 'tab');
            const runIfWaitingForDebugger = sinon.spy();
            setMockConnectionResponseHandler('Runtime.runIfWaitingForDebugger', runIfWaitingForDebugger);
            await runForTabTarget();
            assert.isFalse(runIfWaitingForDebugger.called);
            Root.Runtime.Runtime.setQueryParamForTesting('targetType', '');
        });
        it('sets frame target to "main"', async () => {
            const inspectorMain = InspectorMain.InspectorMain.InspectorMainImpl.instance({ forceNew: true });
            const runIfWaitingForDebugger = sinon.spy();
            setMockConnectionResponseHandler('Runtime.runIfWaitingForDebugger', runIfWaitingForDebugger);
            await inspectorMain.run();
            assert.strictEqual(SDK.TargetManager.TargetManager.instance().rootTarget()?.name(), 'Main');
        });
        it('sets tab target to "tab"', async () => {
            Root.Runtime.Runtime.setQueryParamForTesting('targetType', 'tab');
            const runIfWaitingForDebugger = sinon.spy();
            setMockConnectionResponseHandler('Runtime.runIfWaitingForDebugger', runIfWaitingForDebugger);
            await runForTabTarget();
            assert.strictEqual(SDK.TargetManager.TargetManager.instance().rootTarget()?.name(), 'Tab');
            Root.Runtime.Runtime.setQueryParamForTesting('targetType', '');
        });
        it('sets main frame target to "main"', async () => {
            Root.Runtime.Runtime.setQueryParamForTesting('targetType', 'tab');
            const inspectorMain = InspectorMain.InspectorMain.InspectorMainImpl.instance({ forceNew: true });
            const runIfWaitingForDebugger = sinon.spy();
            setMockConnectionResponseHandler('Runtime.runIfWaitingForDebugger', runIfWaitingForDebugger);
            const runPromise = inspectorMain.run();
            const prerenderTarget = createTarget({ parentTarget: SDK.TargetManager.TargetManager.instance().rootTarget() || undefined, subtype: 'prerender' });
            const mainFrameTarget = createTarget({ parentTarget: SDK.TargetManager.TargetManager.instance().rootTarget() || undefined });
            await runPromise;
            assert.notStrictEqual(prerenderTarget.name(), 'Main');
            assert.strictEqual(mainFrameTarget.name(), 'Main');
            Root.Runtime.Runtime.setQueryParamForTesting('targetType', '');
        });
    });
});
//# sourceMappingURL=InspectorMain.test.js.map