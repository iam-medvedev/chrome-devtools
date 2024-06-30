// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../../core/sdk/sdk.js';
import * as CrUXManager from '../../../models/crux-manager/crux-manager.js';
import * as LiveMetrics from '../../../models/live-metrics/live-metrics.js';
import { renderElementIntoDOM } from '../../../testing/DOMHelpers.js';
import { createTarget } from '../../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../../testing/MockConnection.js';
import * as Coordinator from '../../../ui/components/render_coordinator/render_coordinator.js';
import * as Components from './components.js';
const coordinator = Coordinator.RenderCoordinator.RenderCoordinator.instance();
describeWithMockConnection('LiveMetricsView', () => {
    beforeEach(async () => {
        LiveMetrics.LiveMetrics.instance({ forceNew: true });
        CrUXManager.CrUXManager.instance({ forceNew: true });
    });
    it('should show LCP value', async () => {
        const view = new Components.LiveMetricsView.LiveMetricsView();
        renderElementIntoDOM(view);
        LiveMetrics.LiveMetrics.instance().dispatchEventToListeners("status" /* LiveMetrics.Events.Status */, {
            lcp: { value: 100, rating: 'good' },
            interactions: [],
        });
        await coordinator.done();
        const metricEl = view.shadowRoot?.querySelector('#lcp');
        const metricValueEl = metricEl.querySelector('.local-metric-value');
        assert.strictEqual(metricValueEl.className, 'local-metric-value good');
        assert.strictEqual(metricValueEl.innerText, '100 ms');
    });
    it('should show CLS value', async () => {
        const view = new Components.LiveMetricsView.LiveMetricsView();
        renderElementIntoDOM(view);
        LiveMetrics.LiveMetrics.instance().dispatchEventToListeners("status" /* LiveMetrics.Events.Status */, {
            cls: { value: 1.34294789234, rating: 'needs-improvement' },
            interactions: [],
        });
        await coordinator.done();
        const metricEl = view.shadowRoot?.querySelector('#cls');
        const metricValueEl = metricEl.querySelector('.local-metric-value');
        assert.strictEqual(metricValueEl.className, 'local-metric-value needs-improvement');
        assert.strictEqual(metricValueEl.innerText, '1.343');
    });
    it('should show INP value', async () => {
        const view = new Components.LiveMetricsView.LiveMetricsView();
        renderElementIntoDOM(view);
        LiveMetrics.LiveMetrics.instance().dispatchEventToListeners("status" /* LiveMetrics.Events.Status */, { inp: { value: 2000, rating: 'poor' }, interactions: [] });
        await coordinator.done();
        const metricEl = view.shadowRoot?.querySelector('#inp');
        const metricValueEl = metricEl.querySelector('.local-metric-value');
        assert.strictEqual(metricValueEl.className, 'local-metric-value poor');
        assert.strictEqual(metricValueEl.innerText, '2.00 s');
    });
    it('should show empty metric', async () => {
        const view = new Components.LiveMetricsView.LiveMetricsView();
        renderElementIntoDOM(view);
        await coordinator.done();
        const metricEl = view.shadowRoot?.querySelector('#inp');
        const metricValueEl = metricEl.querySelector('.local-metric-value');
        assert.strictEqual(metricValueEl.className.trim(), 'local-metric-value waiting');
        assert.strictEqual(metricValueEl.innerText, '-');
    });
    it('should show interactions', async () => {
        const view = new Components.LiveMetricsView.LiveMetricsView();
        renderElementIntoDOM(view);
        LiveMetrics.LiveMetrics.instance().dispatchEventToListeners("status" /* LiveMetrics.Events.Status */, {
            interactions: [
                { duration: 500, rating: 'poor', interactionType: 'pointer' },
                { duration: 30, rating: 'good', interactionType: 'keyboard' },
            ],
        });
        await coordinator.done();
        const interactionsListEl = view.shadowRoot?.querySelector('.interactions-list');
        const interactionsEls = interactionsListEl.querySelectorAll('.interaction');
        assert.lengthOf(interactionsEls, 2);
        const typeEl1 = interactionsEls[0].querySelector('.interaction-type');
        assert.strictEqual(typeEl1.textContent, 'pointer');
        const durationEl1 = interactionsEls[0].querySelector('.interaction-duration');
        assert.strictEqual(durationEl1.textContent, '500 ms');
        assert.strictEqual(durationEl1.className, 'interaction-duration poor');
        const typeEl2 = interactionsEls[1].querySelector('.interaction-type');
        assert.strictEqual(typeEl2.textContent, 'keyboard');
        const durationEl2 = interactionsEls[1].querySelector('.interaction-duration');
        assert.strictEqual(durationEl2.textContent, '30 ms');
        assert.strictEqual(durationEl2.className, 'interaction-duration good');
    });
    describe('field data', () => {
        let target;
        let mockFieldData;
        beforeEach(async () => {
            CrUXManager.CrUXManager.instance().getAutomaticSetting().set(false);
            const tabTarget = createTarget({ type: SDK.Target.Type.Tab });
            target = createTarget({ parentTarget: tabTarget });
            mockFieldData = {
                'origin-ALL': null,
                'origin-DESKTOP': null,
                'origin-PHONE': null,
                'origin-TABLET': null,
                'url-ALL': null,
                'url-DESKTOP': null,
                'url-PHONE': null,
                'url-TABLET': null,
            };
            sinon.stub(CrUXManager.CrUXManager.instance(), 'getFieldDataForCurrentPage').callsFake(async () => mockFieldData);
        });
        it('should show when requested manually', async () => {
            mockFieldData['url-ALL'] = {
                record: {
                    key: {
                        url: 'https://example.com',
                    },
                    metrics: {
                        'largest_contentful_paint': {
                            histogram: [
                                { start: 0, end: 2500, density: 0.5 },
                                { start: 2500, end: 4000, density: 0.3 },
                                { start: 4000, density: 0.2 },
                            ],
                            percentiles: { p75: 1000 },
                        },
                        'cumulative_layout_shift': {
                            histogram: [
                                { start: 0, end: 0.1, density: 0.1 },
                                { start: 0.1, end: 0.25, density: 0.1 },
                                { start: 0.25, density: 0.8 },
                            ],
                            percentiles: { p75: 0.25 },
                        },
                    },
                    collectionPeriod: {
                        firstDate: { year: 2024, month: 1, day: 1 },
                        lastDate: { year: 2024, month: 1, day: 29 },
                    },
                },
            };
            const view = new Components.LiveMetricsView.LiveMetricsView();
            renderElementIntoDOM(view);
            const fieldDataCard = view.shadowRoot?.querySelector('#field-setup');
            fieldDataCard.querySelector('button').click();
            await coordinator.done();
            const lcpFieldEl = view.shadowRoot?.querySelector('#lcp .field-data');
            assert.strictEqual(lcpFieldEl.innerText, '50%\n30%\n20%');
            const clsFieldEl = view.shadowRoot?.querySelector('#cls .field-data');
            assert.strictEqual(clsFieldEl.innerText, '10%\n10%\n80%');
            const inpFieldEl = view.shadowRoot?.querySelector('#inp .field-data');
            assert.isNull(inpFieldEl);
        });
        it('should show when requested automatically', async () => {
            CrUXManager.CrUXManager.instance().getAutomaticSetting().set(true);
            const view = new Components.LiveMetricsView.LiveMetricsView();
            renderElementIntoDOM(view);
            await coordinator.done();
            mockFieldData['url-ALL'] = {
                record: {
                    key: {
                        url: 'https://example.com',
                    },
                    metrics: {
                        'largest_contentful_paint': {
                            histogram: [
                                { start: 0, end: 2500, density: 0.5 },
                                { start: 2500, end: 4000, density: 0.3 },
                                { start: 4000, density: 0.2 },
                            ],
                            percentiles: { p75: 1000 },
                        },
                        'cumulative_layout_shift': {
                            histogram: [
                                { start: 0, end: 0.1, density: 0.1 },
                                { start: 0.1, end: 0.25, density: 0.1 },
                                { start: 0.25, density: 0.8 },
                            ],
                            percentiles: { p75: 0.25 },
                        },
                    },
                    collectionPeriod: {
                        firstDate: { year: 2024, month: 1, day: 1 },
                        lastDate: { year: 2024, month: 1, day: 29 },
                    },
                },
            };
            target.model(SDK.ResourceTreeModel.ResourceTreeModel)
                ?.dispatchEventToListeners(SDK.ResourceTreeModel.Events.FrameNavigated, {
                url: 'https://example.com',
                isPrimaryFrame: () => true,
            });
            await coordinator.done();
            const lcpFieldEl = view.shadowRoot?.querySelector('#lcp .field-data');
            assert.strictEqual(lcpFieldEl.innerText, '50%\n30%\n20%');
            const clsFieldEl = view.shadowRoot?.querySelector('#cls .field-data');
            assert.strictEqual(clsFieldEl.innerText, '10%\n10%\n80%');
            const inpFieldEl = view.shadowRoot?.querySelector('#inp .field-data');
            assert.isNull(inpFieldEl);
        });
        it('should make initial request on render when set to automatic', async () => {
            CrUXManager.CrUXManager.instance().getAutomaticSetting().set(true);
            mockFieldData['url-ALL'] = {
                record: {
                    key: {
                        url: 'https://example.com',
                    },
                    metrics: {
                        'largest_contentful_paint': {
                            histogram: [
                                { start: 0, end: 2500, density: 0.5 },
                                { start: 2500, end: 4000, density: 0.3 },
                                { start: 4000, density: 0.2 },
                            ],
                            percentiles: { p75: 1000 },
                        },
                        'cumulative_layout_shift': {
                            histogram: [
                                { start: 0, end: 0.1, density: 0.1 },
                                { start: 0.1, end: 0.25, density: 0.1 },
                                { start: 0.25, density: 0.8 },
                            ],
                            percentiles: { p75: 0.25 },
                        },
                    },
                    collectionPeriod: {
                        firstDate: { year: 2024, month: 1, day: 1 },
                        lastDate: { year: 2024, month: 1, day: 29 },
                    },
                },
            };
            const view = new Components.LiveMetricsView.LiveMetricsView();
            renderElementIntoDOM(view);
            await coordinator.done();
            const lcpFieldEl = view.shadowRoot?.querySelector('#lcp .field-data');
            assert.strictEqual(lcpFieldEl.innerText, '50%\n30%\n20%');
            const clsFieldEl = view.shadowRoot?.querySelector('#cls .field-data');
            assert.strictEqual(clsFieldEl.innerText, '10%\n10%\n80%');
            const inpFieldEl = view.shadowRoot?.querySelector('#inp .field-data');
            assert.isNull(inpFieldEl);
        });
    });
});
//# sourceMappingURL=LiveMetricsView.test.js.map