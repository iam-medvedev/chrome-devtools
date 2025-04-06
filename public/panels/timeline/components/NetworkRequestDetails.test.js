// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { cleanTextContent } from '../../../testing/DOMHelpers.js';
import { describeWithMockConnection } from '../../../testing/MockConnection.js';
import { TraceLoader } from '../../../testing/TraceLoader.js';
import * as Components from '../../../ui/legacy/components/utils/utils.js';
import * as Timeline from '../timeline.js';
import * as TimelineComponents from './components.js';
describeWithMockConnection('NetworkRequestDetails', () => {
    it('renders the right details for a network event from Trace', async function () {
        const { parsedTrace } = await TraceLoader.traceEngine(this, 'lcp-web-font.json.gz');
        const entityMapper = new Timeline.Utils.EntityMapper.EntityMapper(parsedTrace);
        const networkRequests = parsedTrace.NetworkRequests.byTime;
        const cssRequest = networkRequests.find(request => {
            return request.args.data.url === 'https://chromedevtools.github.io/performance-stories/lcp-web-font/app.css';
        });
        if (!cssRequest) {
            throw new Error('Could not find expected network request.');
        }
        const details = new TimelineComponents.NetworkRequestDetails.NetworkRequestDetails(new Components.Linkifier.Linkifier());
        await details.setData(parsedTrace, cssRequest, Timeline.TargetForEvent.targetForEvent(parsedTrace, cssRequest), entityMapper);
        if (!details.shadowRoot) {
            throw new Error('Could not find expected element to test.');
        }
        const titleSwatch = details.shadowRoot.querySelector('.network-request-details-title div');
        // css request is in 'Css' category, which will use `--app-color-css: var(--ref-palette-purple60)` colour
        assert.strictEqual(titleSwatch?.style.backgroundColor, 'rgb(191, 103, 255)');
        const rowData = getRowDataForDetailsElement(details.shadowRoot);
        const durationInnerText = 'Duration 12.58 ms ' +
            'Queuing and connecting 1.83 ms ' +
            'Request sent and waiting 4.80 ms ' +
            'Content downloading 1.66 ms ' +
            'Waiting on main thread 4.29 ms';
        assert.deepEqual(rowData, [
            { title: undefined, value: 'chromedevtools.github.io/performance-stories/lcp-web-font/app.css' },
            { title: 'Request method', value: 'GET' },
            { title: 'Protocol', value: 'unknown' },
            { title: 'Priority', value: 'Highest' },
            { title: 'MIME type', value: 'text/css' },
            { title: 'Encoded data', value: '(from cache)' },
            { title: 'Decoded body', value: '96 B' },
            {
                title: 'Blocking',
                value: 'Render blocking',
            },
            { title: 'From cache', value: 'Yes' },
            { title: '3rd party', value: 'GitHub' },
            { title: undefined, value: durationInnerText },
            {
                title: 'Initiated by',
                value: 'chromedevtools.github.io/performance-stories/lcp-web-font/index.html',
            },
        ]);
    });
    it('renders the server timing details for a network event', async function () {
        const { parsedTrace } = await TraceLoader.traceEngine(this, 'server-timings.json.gz');
        const entityMapper = new Timeline.Utils.EntityMapper.EntityMapper(parsedTrace);
        const networkRequests = parsedTrace.NetworkRequests.byTime;
        const htmlRequest = networkRequests.find(request => {
            return request.args.data.url === 'https://node-server-tan.vercel.app/waste-time';
        });
        if (!htmlRequest) {
            throw new Error('Could not find expected network request.');
        }
        const details = new TimelineComponents.NetworkRequestDetails.NetworkRequestDetails(new Components.Linkifier.Linkifier());
        await details.setData(parsedTrace, htmlRequest, Timeline.TargetForEvent.targetForEvent(parsedTrace, htmlRequest), entityMapper);
        if (!details.shadowRoot) {
            throw new Error('Could not find expected element to test.');
        }
        const titleSwatch = details.shadowRoot.querySelector('.network-request-details-title div');
        assert.strictEqual(titleSwatch?.style.backgroundColor, 'rgb(76, 141, 246)');
        const rowData = getServerTimingDataDetailsElement(details.shadowRoot);
        assert.deepEqual(rowData, [
            [
                'Server timing',
                'Description',
                'Time',
            ],
            [
                'Topleveltask1',
                'Description of top level task 1',
                '1004.2932819999987',
            ],
            [
                'Secondleveltask1',
                'Description of second level task 1',
                '904.2932819999987',
            ],
            [
                'Topleveltask2',
                '-',
                '1000.0925859999988',
            ],
        ]);
    });
});
function getRowDataForDetailsElement(details) {
    return Array
        .from(details.querySelectorAll('.network-request-details-item, .network-request-details-row, .timing-rows'))
        .map(row => {
        const title = row.querySelector('.title')?.innerText;
        let value = cleanTextContent(row.querySelector('.value')?.innerText || '');
        if (!title && !value) {
            value = cleanTextContent(row.innerText || '');
        }
        return { title, value };
    });
}
function getServerTimingDataDetailsElement(details) {
    return Array.from(details.querySelectorAll('.server-timings > .value, .server-timing-column-header'))
        .map(row => cleanTextContent(row.innerText))
        .reduce((result, current, i) => {
        // group items by rows of three items
        const rowNumber = Math.floor(i / 3);
        const row = result[rowNumber] = result[rowNumber] || [];
        row.push(current);
        return result;
    }, []);
}
//# sourceMappingURL=NetworkRequestDetails.test.js.map