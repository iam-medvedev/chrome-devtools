// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import { beforeEach, it } from 'mocha';
import sinon from 'sinon';
import * as SDK from '../../core/sdk/sdk.js';
import { createTarget, describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import * as UI from '../../ui/legacy/legacy.js';
describeWithEnvironment('LighthousePanel', () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    let Lighthouse;
    let target;
    let resourceTreeModelNavigate;
    let protocolService;
    let controller;
    const URL = 'http://example.com';
    const LH_REPORT = {
        lhr: {
            finalDisplayedUrl: URL,
            configSettings: {},
            audits: {},
            categories: { _: { auditRefs: [], id: '' } },
            lighthouseVersion: '',
            userAgent: '',
            fetchTime: 0,
            environment: { benchmarkIndex: 0 },
            i18n: { rendererFormattedStrings: {} },
        },
    };
    beforeEach(async () => {
        Lighthouse = await import('./lighthouse.js');
        Lighthouse.LighthouseController.clearSettingsCacheForTest();
        const tabTarget = createTarget({ type: SDK.Target.Type.TAB });
        createTarget({ parentTarget: tabTarget, subtype: 'prerender' });
        target = createTarget({ parentTarget: tabTarget });
        sinon.stub(target.pageAgent(), 'invoke_getNavigationHistory').resolves({
            currentIndex: 0,
            entries: [{ url: URL }],
            getError: () => null,
        });
        const resourceTreeModel = target.model(SDK.ResourceTreeModel.ResourceTreeModel);
        assert.exists(resourceTreeModel);
        resourceTreeModelNavigate = sinon.stub(resourceTreeModel, 'navigate').resolves();
        sinon.stub(resourceTreeModel, 'addEventListener')
            .callThrough()
            .withArgs(SDK.ResourceTreeModel.Events.Load, sinon.match.any)
            .callsArgWithAsync(1, { resourceTreeModel, loadTime: 0 })
            .returns({});
        protocolService = new Lighthouse.LighthouseProtocolService.ProtocolService();
        sinon.stub(protocolService, 'attach').resolves();
        sinon.stub(protocolService, 'detach').resolves();
        sinon.stub(protocolService, 'collectLighthouseResults').resolves(LH_REPORT);
        controller = new Lighthouse.LighthouseController.LighthouseController(protocolService);
        sinon.stub(controller, 'getFlags').returns({ formFactor: 'desktop', mode: 'navigation' });
    });
    it('restores the original URL when done', async () => {
        const instance = Lighthouse.LighthousePanel.LighthousePanel.instance({ forceNew: true, protocolService, controller });
        void instance.handleCompleteRun();
        await new Promise(resolve => resourceTreeModelNavigate.withArgs(URL).callsFake(() => {
            resolve();
            return Promise.resolve();
        }));
    });
    it('stores the report in the UI Context when done', async () => {
        const context = UI.Context.Context.instance();
        const instance = Lighthouse.LighthousePanel.LighthousePanel.instance({ forceNew: true, protocolService, controller });
        assert.isNull(context.flavor(Lighthouse.LighthousePanel.ActiveLighthouseReport));
        await instance.handleCompleteRun();
        assert.instanceOf(context.flavor(Lighthouse.LighthousePanel.ActiveLighthouseReport), Lighthouse.LighthousePanel.ActiveLighthouseReport);
    });
    it('waits for main target to load before linkifying', async () => {
        const instance = Lighthouse.LighthousePanel.LighthousePanel.instance({ forceNew: true, protocolService, controller });
        void instance.handleCompleteRun();
        await new Promise(resolve => sinon.stub(Lighthouse.LighthouseReportRenderer.LighthouseReportRenderer, 'linkifyNodeDetails')
            .callsFake((_) => {
            resolve();
            return Promise.resolve();
        }));
    });
    it('can receive an external request and trigger a recording', async () => {
        const REPORT_JSON = {};
        sinon.stub(Lighthouse.LighthousePanel.LighthousePanel.prototype, 'handleCompleteRun').callsFake(() => {
            return Promise.resolve({ status: 'completed', report: REPORT_JSON });
        });
        const viewManager = UI.ViewManager.ViewManager.instance();
        const showViewStub = sinon.stub(viewManager, 'showView');
        const result = await Lighthouse.LighthousePanel.LighthousePanel.executeLighthouseRecording();
        sinon.assert.calledOnceWithExactly(showViewStub, 'lighthouse');
        assert.deepEqual(result, { status: 'completed', report: REPORT_JSON });
    });
    it('returns the report when the run completes', async () => {
        const instance = Lighthouse.LighthousePanel.LighthousePanel.instance({ forceNew: true, protocolService, controller });
        const result = await instance.handleCompleteRun();
        assert.deepEqual(result, { status: 'completed', report: LH_REPORT.lhr });
    });
    it('returns a cancelled result when the user cancels the run', async () => {
        protocolService.collectLighthouseResults
            .rejects(new Lighthouse.LighthouseProtocolService.CancelledError());
        const instance = Lighthouse.LighthousePanel.LighthousePanel.instance({ forceNew: true, protocolService, controller });
        const result = await instance.handleCompleteRun();
        assert.deepEqual(result, { status: 'cancelled' });
    });
    it('returns a failed result when the run fails to start, and can run again afterwards', async () => {
        protocolService.attach.onFirstCall().rejects(new Error('attach failed'));
        const instance = Lighthouse.LighthousePanel.LighthousePanel.instance({ forceNew: true, protocolService, controller });
        const failedResult = await instance.handleCompleteRun();
        assert.deepEqual(failedResult, { status: 'failed' });
        const secondResult = await instance.handleCompleteRun();
        assert.deepEqual(secondResult, { status: 'completed', report: LH_REPORT.lhr });
    });
    it('can select a specific report', async () => {
        const instance = Lighthouse.LighthousePanel.LighthousePanel.instance({ forceNew: true, protocolService, controller });
        await instance.handleCompleteRun();
        const secondReport = {
            ...LH_REPORT.lhr,
            fetchTime: 100,
        };
        protocolService.collectLighthouseResults.resolves({
            lhr: secondReport,
        });
        await instance.handleCompleteRun();
        const context = UI.Context.Context.instance();
        assert.strictEqual(context.flavor(Lighthouse.LighthousePanel.ActiveLighthouseReport)?.report, secondReport);
        instance.selectReport(LH_REPORT.lhr);
        assert.strictEqual(context.flavor(Lighthouse.LighthousePanel.ActiveLighthouseReport)?.report, LH_REPORT.lhr);
    });
});
//# sourceMappingURL=LighthousePanel.test.js.map