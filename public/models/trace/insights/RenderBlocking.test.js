// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { describeWithEnvironment } from '../../../testing/EnvironmentHelpers.js';
import { getInsight } from '../../../testing/InsightHelpers.js';
import { TraceLoader } from '../../../testing/TraceLoader.js';
import { Types } from './insights.js';
export async function processTrace(testContext, traceFile) {
    const { parsedTrace, insights } = await TraceLoader.traceEngine(testContext, traceFile);
    if (!insights) {
        throw new Error('No insights');
    }
    return { data: parsedTrace, insights };
}
describeWithEnvironment('RenderBlockingRequests', function () {
    it('finds render blocking requests', async () => {
        const { data, insights } = await processTrace(this, 'load-simple.json.gz');
        assert.deepStrictEqual([...insights.keys()], [Types.NO_NAVIGATION, '0BCFC23BC7D7BEDC9F93E912DCCEC1DA']);
        const insight = getInsight('RenderBlocking', insights, data.Meta.navigationsByNavigationId.values().next().value);
        assert.strictEqual(insight.renderBlockingRequests.length, 2);
        assert.deepEqual(insight.renderBlockingRequests.map(r => r.args.data.url), [
            'https://fonts.googleapis.com/css2?family=Orelega+One&display=swap',
            'http://localhost:8080/styles.css',
        ]);
    });
    it('returns a warning if navigation does not have a first paint event', async () => {
        const { data, insights } = await processTrace(this, 'user-timings.json.gz');
        assert.strictEqual(insights.size, 1);
        const insight = getInsight('RenderBlocking', insights, data.Meta.navigationsByNavigationId.values().next().value);
        assert.strictEqual(insight.renderBlockingRequests.length, 0);
        assert.strictEqual(insight.warnings?.length, 1);
        assert.strictEqual(insight.warnings?.[0], 'NO_FP');
    });
    it('considers only the navigation specified by the context', async () => {
        const { data, insights } = await processTrace(this, 'multiple-navigations-render-blocking.json.gz');
        assert.deepStrictEqual([...insights.keys()], [Types.NO_NAVIGATION, '8671F33ECE0C8DBAEFBC2F9A2D1D6107', '1AE2016BBCC48AA090FDAE2CBBA01900']);
        const navigations = Array.from(data.Meta.navigationsByNavigationId.values());
        const insight = getInsight('RenderBlocking', insights, navigations[0]);
        assert(insight.renderBlockingRequests.length > 0, 'no render blocking requests found');
        assert(insight.renderBlockingRequests.every(r => r.args.data.syntheticData.sendStartTime > navigations[0].ts), 'a result is not contained by the nav bounds');
        assert(insight.renderBlockingRequests.every(r => r.args.data.syntheticData.finishTime < navigations[1].ts), 'a result is not contained by the nav bounds');
    });
    it('considers navigations separately', async () => {
        const { data, insights } = await processTrace(this, 'multiple-navigations-render-blocking.json.gz');
        assert.strictEqual(insights.size, 3);
        const navigations = Array.from(data.Meta.navigationsByNavigationId.values());
        const insightOne = getInsight('RenderBlocking', insights);
        const insightTwo = getInsight('RenderBlocking', insights, navigations[0]);
        const insightThree = getInsight('RenderBlocking', insights, navigations[1]);
        assert.deepStrictEqual(insightOne.renderBlockingRequests.map(r => r.args.data.requestId), []);
        assert.deepStrictEqual(insightTwo.renderBlockingRequests.map(r => r.args.data.requestId), ['99116.2']);
        assert.deepStrictEqual(insightThree.renderBlockingRequests.map(r => r.args.data.requestId), ['99116.5']);
    });
    it('considers only the frame specified by the context', async () => {
        const { data, insights } = await processTrace(this, 'render-blocking-in-iframe.json.gz');
        assert.strictEqual(insights.size, 1);
        const navigations = Array.from(data.Meta.navigationsByNavigationId.values());
        const insight = getInsight('RenderBlocking', insights, navigations[0]);
        assert(insight.renderBlockingRequests.length > 0, 'no render blocking requests found');
        assert(insight.renderBlockingRequests.every(r => r.args.data.frame === data.Meta.mainFrameId), 'a result is not from the main frame');
    });
    it('ignores blocking request after first paint', async () => {
        const { data, insights } = await processTrace(this, 'parser-blocking-after-paint.json.gz');
        assert.strictEqual(insights.size, 1);
        const insight = getInsight('RenderBlocking', insights, data.Meta.navigationsByNavigationId.values().next().value);
        assert.strictEqual(insight.renderBlockingRequests.length, 0);
    });
    it('correctly handles body parser blocking requests', async () => {
        const { data, insights } = await processTrace(this, 'render-blocking-body.json.gz');
        assert.strictEqual(insights.size, 1);
        const insight = getInsight('RenderBlocking', insights, data.Meta.navigationsByNavigationId.values().next().value);
        assert.deepStrictEqual(insight.renderBlockingRequests.map(r => r.args.data.url), [
            'http://localhost:8080/render-blocking/style.css',
            'http://localhost:8080/render-blocking/script.js?beforeImage',
        ]);
    });
    it('estimates savings with Lantern (image LCP)', async () => {
        const { data, insights } = await processTrace(this, 'lantern/render-blocking/trace.json.gz');
        assert.strictEqual(insights.size, 1);
        const insight = getInsight('RenderBlocking', insights, data.Meta.navigationsByNavigationId.values().next().value);
        assert.deepStrictEqual(insight.metricSavings, {
            FCP: 2250,
            LCP: 0,
        });
        assert.exists(insight.requestIdToWastedMs);
        const urlToWastedMs = [...insight.requestIdToWastedMs].map(([requestId, wastedMs]) => {
            const url = insight.renderBlockingRequests.find(r => r.args.data.requestId === requestId)?.args.data.url;
            return [url, wastedMs];
        });
        assert.deepStrictEqual(urlToWastedMs, [
            ['http://localhost:50049/style.css', 2254],
            ['http://localhost:50049/script.js', 304],
        ]);
    });
    it('estimates savings with Lantern (text LCP)', async () => {
        const { data, insights } = await processTrace(this, 'lantern/typescript-angular/trace.json.gz');
        assert.strictEqual(insights.size, 1);
        const insight = getInsight('RenderBlocking', insights, data.Meta.navigationsByNavigationId.values().next().value);
        assert.deepStrictEqual(insight.metricSavings, {
            FCP: 13,
            LCP: 13,
        });
        assert.exists(insight.requestIdToWastedMs);
        const urlToWastedMs = [...insight.requestIdToWastedMs].map(([requestId, wastedMs]) => {
            const url = insight.renderBlockingRequests.find(r => r.args.data.requestId === requestId)?.args.data.url;
            return [url, wastedMs];
        });
        assert.deepStrictEqual(urlToWastedMs, [
            ['http://[::]:8000/typescript-angular/node_modules/todomvc-common/base.css', 153],
            ['http://[::]:8000/typescript-angular/node_modules/todomvc-app-css/index.css', 303],
            ['http://[::]:8000/typescript-angular/node_modules/todomvc-common/base.js', 303],
            ['http://[::]:8000/typescript-angular/node_modules/angular/angular.js', 303],
            ['http://[::]:8000/typescript-angular/js/Application.js', 303],
        ]);
    });
});
//# sourceMappingURL=RenderBlocking.test.js.map