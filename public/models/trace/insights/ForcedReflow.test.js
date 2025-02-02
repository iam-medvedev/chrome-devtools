// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { describeWithEnvironment } from '../../../testing/EnvironmentHelpers.js';
import { getInsightOrError } from '../../../testing/InsightHelpers.js';
import { TraceLoader } from '../../../testing/TraceLoader.js';
export async function processTrace(testContext, traceFile) {
    const { parsedTrace, insights } = await TraceLoader.traceEngine(testContext, traceFile);
    if (!insights) {
        throw new Error('No insights');
    }
    return { data: parsedTrace, insights };
}
describeWithEnvironment('ForcedReflow', function () {
    // Skip to re-open the tree
    it.skip('[crbug.com/392557418]: generates call stacks', async function () {
        const { data, insights } = await processTrace(this, 'forced-reflow.json.gz');
        assert.strictEqual(insights.size, 1);
        const insight = getInsightOrError('ForcedReflow', insights, data.Meta.navigationsByNavigationId.values().next().value);
        assert.strictEqual(insight.topLevelFunctionCallData?.topLevelFunctionCall.columnNumber, 25217);
        assert.strictEqual(insight.topLevelFunctionCallData?.topLevelFunctionCall.lineNumber, 6);
        assert.strictEqual(insight.topLevelFunctionCallData?.totalReflowTime, 26052);
        const callStack = insight.aggregatedBottomUpData[1];
        assert.strictEqual(callStack.bottomUpData.columnNumber, 137906);
        assert.strictEqual(callStack.bottomUpData.lineNumber, 6);
        assert.lengthOf(callStack.relatedEvents, 2);
    });
});
//# sourceMappingURL=ForcedReflow.test.js.map