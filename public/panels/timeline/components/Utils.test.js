// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { describeWithEnvironment } from '../../../testing/EnvironmentHelpers.js';
import { TraceLoader } from '../../../testing/TraceLoader.js';
import * as Utils from './Utils.js';
describeWithEnvironment('Utils', () => {
    describe('NumberWithUnit', () => {
        const { NumberWithUnit } = Utils;
        it('renders number with unit (formatMicroSecondsAsSeconds)', () => {
            const result = NumberWithUnit.formatMicroSecondsAsSeconds(100_000);
            assert.strictEqual(result.text, '0.10s');
            assert.strictEqual(result.element.textContent, '0.10s');
            assert.strictEqual(result.element.querySelector('.unit')?.textContent, 's');
        });
        it('renders number with unit (formatMicroSecondsAsMillisFixed)', () => {
            const result = NumberWithUnit.formatMicroSecondsAsMillisFixed(100_000);
            assert.strictEqual(result.text, '100ms');
            assert.strictEqual(result.element.textContent, '100ms');
            assert.strictEqual(result.element.querySelector('.unit')?.textContent, 'ms');
        });
        it('parse', () => {
            // en
            assert.deepEqual(NumberWithUnit.parse('100[s]()'), { firstPart: '100', unitPart: 's', lastPart: '' });
            assert.deepEqual(NumberWithUnit.parse('100 [s]()'), { firstPart: '100 ', unitPart: 's', lastPart: '' });
            // Decimal separators
            assert.deepEqual(NumberWithUnit.parse('100.123[ms]()'), { firstPart: '100.123', unitPart: 'ms', lastPart: '' });
            assert.deepEqual(NumberWithUnit.parse('100,2[s]()'), { firstPart: '100,2', unitPart: 's', lastPart: '' });
            // zh
            assert.deepEqual(NumberWithUnit.parse('100[毫秒]()'), { firstPart: '100', unitPart: '毫秒', lastPart: '' });
            // zh-Hans-CN-u-nu-hanidec
            assert.deepEqual(NumberWithUnit.parse('一〇〇[毫秒]()'), { firstPart: '一〇〇', unitPart: '毫秒', lastPart: '' });
            // ar-SA (RTL language, but the UIString still places the number first in the string)
            assert.deepEqual(NumberWithUnit.parse('١٠٠[ملي ثانية]()'), { firstPart: '١٠٠', unitPart: 'ملي ثانية', lastPart: '' });
            // ar
            assert.deepEqual(NumberWithUnit.parse('100[ملي ثانية]()'), { firstPart: '100', unitPart: 'ملي ثانية', lastPart: '' });
            // sw (only one that places unit first)
            assert.deepEqual(NumberWithUnit.parse('[Sek]()100'), { firstPart: '', unitPart: 'Sek', lastPart: '100' });
            assert.deepEqual(NumberWithUnit.parse('[Sek]() 100'), { firstPart: '', unitPart: 'Sek', lastPart: ' 100' });
            // error cases
            assert.deepEqual(NumberWithUnit.parse(''), null);
            assert.deepEqual(NumberWithUnit.parse('100s'), null);
            assert.deepEqual(NumberWithUnit.parse('100[s]('), null);
            assert.deepEqual(NumberWithUnit.parse('100[s]'), null);
            assert.deepEqual(NumberWithUnit.parse('100[s'), null);
            assert.deepEqual(NumberWithUnit.parse('100 s]('), null);
        });
    });
    describe('networkResourceCategory', function () {
        const { networkResourceCategory, NetworkCategory } = Utils;
        const { ResourceType } = Protocol.Network;
        const getCategory = networkResourceCategory;
        let req;
        before(async function () {
            const events = await TraceLoader.fixtureContents(this, 'load-simple.json.gz');
            const { parsedTrace } = await TraceLoader.executeTraceEngineOnFileContents(events);
            req = parsedTrace.NetworkRequests.byId.get('2648544.35');
        });
        function tweakRequest(mimeType, resourceType = "Other" /* Protocol.Network.ResourceType.Other */) {
            assert.exists(req);
            req.args.data.mimeType = mimeType;
            req.args.data.resourceType = resourceType;
            return req;
        }
        it('uses resource type when available', () => {
            assert.strictEqual(getCategory(tweakRequest('text/html', "Document" /* ResourceType.Document */)), NetworkCategory.DOC);
            assert.strictEqual(getCategory(tweakRequest('text/css', "Stylesheet" /* ResourceType.Stylesheet */)), NetworkCategory.CSS);
            assert.strictEqual(getCategory(tweakRequest('image/png', "Image" /* ResourceType.Image */)), NetworkCategory.IMG);
            assert.strictEqual(getCategory(tweakRequest('video/webm', "Media" /* ResourceType.Media */)), NetworkCategory.MEDIA);
            assert.strictEqual(getCategory(tweakRequest('font/woff2', "Font" /* ResourceType.Font */)), NetworkCategory.FONT);
            assert.strictEqual(getCategory(tweakRequest('text/javascript', "Script" /* ResourceType.Script */)), NetworkCategory.JS);
            assert.strictEqual(getCategory(tweakRequest('something/unknown', "WebSocket" /* ResourceType.WebSocket */)), NetworkCategory.JS);
            assert.strictEqual(getCategory(tweakRequest('something/unknown', "Other" /* ResourceType.Other */)), NetworkCategory.OTHER);
        });
        it('falls back to mime type for older traces', () => {
            assert.strictEqual(getCategory(tweakRequest('text/html')), NetworkCategory.DOC);
            assert.strictEqual(getCategory(tweakRequest('text/css')), NetworkCategory.CSS);
            assert.strictEqual(getCategory(tweakRequest('image/png')), NetworkCategory.IMG);
            assert.strictEqual(getCategory(tweakRequest('video/webm')), NetworkCategory.MEDIA);
            assert.strictEqual(getCategory(tweakRequest('font/woff2')), NetworkCategory.FONT);
            assert.strictEqual(getCategory(tweakRequest('text/javascript')), NetworkCategory.JS);
            assert.strictEqual(getCategory(tweakRequest('application/javascript')), NetworkCategory.JS);
            assert.strictEqual(getCategory(tweakRequest('application/wasm')), NetworkCategory.WASM);
            assert.strictEqual(getCategory(tweakRequest('application/x-font-woff')), NetworkCategory.FONT);
            assert.strictEqual(getCategory(tweakRequest('application/font-woff2')), NetworkCategory.FONT);
            assert.strictEqual(getCategory(tweakRequest('something/unknown')), NetworkCategory.OTHER);
        });
    });
});
//# sourceMappingURL=Utils.test.js.map