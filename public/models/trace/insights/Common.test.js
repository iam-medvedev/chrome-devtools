// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { describeWithEnvironment } from '../../../testing/EnvironmentHelpers.js';
import { getFirstOrError, processTrace } from '../../../testing/InsightHelpers.js';
import * as Insights from './insights.js';
const { calculateMetricWeightsForSorting, estimateCompressedContentSize } = Insights.Common;
describeWithEnvironment('Common', function () {
    describe('calculateMetricWeightsForSorting', () => {
        async function process(testContext, traceFile) {
            const { data, insights, metadata } = await processTrace(testContext, traceFile);
            if (!metadata) {
                throw new Error('missing metadata');
            }
            const firstNav = getFirstOrError(data.Meta.navigationsByNavigationId.values());
            if (!firstNav.args.data?.navigationId) {
                throw new Error('expected navigationId');
            }
            const insightSetKey = firstNav.args.data.navigationId;
            const insightSet = insights.get(insightSetKey);
            if (!insightSet) {
                throw new Error('missing insight set');
            }
            // Clone so it may be modified.
            const clonedMetadata = structuredClone(metadata);
            return { insightSet, metadata: clonedMetadata };
        }
        it('returns default weights when there is no field data', async () => {
            const { insightSet, metadata } = await process(this, 'image-delivery.json.gz');
            // No field data defaults to even split of weights.
            metadata.cruxFieldData = undefined;
            let weights = calculateMetricWeightsForSorting(insightSet, metadata);
            assert.deepEqual(weights, { lcp: 1 / 3, inp: 1 / 3, cls: 1 / 3 });
            metadata.cruxFieldData = [];
            weights = calculateMetricWeightsForSorting(insightSet, metadata);
            assert.deepEqual(weights, { lcp: 1 / 3, inp: 1 / 3, cls: 1 / 3 });
        });
        it('returns weights based on field data', async () => {
            const { insightSet, metadata } = await process(this, 'image-delivery.json.gz');
            const weights = calculateMetricWeightsForSorting(insightSet, metadata);
            assert.deepEqual(weights, { lcp: 0.48649783990559314, inp: 0.48649783990559314, cls: 0.027004320188813675 });
        });
    });
    describe('#estimateCompressedContentSize', () => {
        const estimate = estimateCompressedContentSize;
        const encoding = [{ name: 'Content-Encoding', value: 'gzip' }];
        const makeRequest = (partial) => {
            const request = {
                args: {
                    data: {
                        encodedDataLength: partial.transferSize ?? 0,
                        decodedBodyLength: partial.resourceSize ?? 0,
                        resourceType: partial.resourceType,
                        responseHeaders: partial.responseHeaders ?? [],
                    }
                },
            };
            return request;
        };
        it('should estimate by resource type compression ratio when no network info available', () => {
            assert.strictEqual(estimate(undefined, 1000, "Stylesheet" /* Protocol.Network.ResourceType.Stylesheet */), 200);
            assert.strictEqual(estimate(undefined, 1000, "Script" /* Protocol.Network.ResourceType.Script */), 330);
            assert.strictEqual(estimate(undefined, 1000, "Document" /* Protocol.Network.ResourceType.Document */), 330);
            assert.strictEqual(estimate(undefined, 1000, "Other" /* Protocol.Network.ResourceType.Other */), 500);
        });
        it('should return transferSize when asset matches and is encoded', () => {
            const resourceType = "Stylesheet" /* Protocol.Network.ResourceType.Stylesheet */;
            const request = makeRequest({ transferSize: 1234, resourceType, responseHeaders: encoding });
            const result = estimate(request, 10000, resourceType);
            assert.strictEqual(result, 1234);
        });
        it('should return resourceSize when asset matches and is not encoded', () => {
            const resourceType = "Stylesheet" /* Protocol.Network.ResourceType.Stylesheet */;
            const request = makeRequest({ transferSize: 1235, resourceSize: 1234, resourceType, responseHeaders: [] });
            const result = estimate(request, 10000, resourceType);
            assert.strictEqual(result, 1234);
        });
        // Ex: JS script embedded in HTML response.
        it('should estimate by network compression ratio when asset does not match', () => {
            const resourceType = "Other" /* Protocol.Network.ResourceType.Other */;
            const request = makeRequest({ resourceSize: 2000, transferSize: 1000, resourceType, responseHeaders: encoding });
            const result = estimate(request, 100, "Script" /* Protocol.Network.ResourceType.Script */);
            assert.strictEqual(result, 50);
        });
        it('should not error when missing resource size', () => {
            const resourceType = "Other" /* Protocol.Network.ResourceType.Other */;
            const request = makeRequest({ transferSize: 1000, resourceType, responseHeaders: [] });
            const result = estimate(request, 100, "Script" /* Protocol.Network.ResourceType.Script */);
            assert.strictEqual(result, 100);
        });
        it('should not error when resource size is 0', () => {
            const resourceType = "Other" /* Protocol.Network.ResourceType.Other */;
            const request = makeRequest({ transferSize: 1000, resourceSize: 0, resourceType, responseHeaders: [] });
            const result = estimate(request, 100, "Script" /* Protocol.Network.ResourceType.Script */);
            assert.strictEqual(result, 100);
        });
    });
});
//# sourceMappingURL=Common.test.js.map