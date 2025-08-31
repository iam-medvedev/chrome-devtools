// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
export class AgentFocus {
    static full(parsedTrace, insights, traceMetadata) {
        // Currently only support a single insight set. Pick the first one with a navigation.
        const insightSet = [...insights.values()].filter(insightSet => insightSet.navigation).at(0) ?? null;
        return new AgentFocus({
            type: 'full',
            parsedTrace,
            insightSet,
            traceMetadata,
        });
    }
    static fromInsight(parsedTrace, insight, insightSetBounds) {
        return new AgentFocus({
            type: 'insight',
            parsedTrace,
            insight,
            insightSetBounds,
        });
    }
    static fromCallTree(callTree) {
        return new AgentFocus({ type: 'call-tree', parsedTrace: callTree.parsedTrace, callTree });
    }
    #data;
    constructor(data) {
        this.#data = data;
    }
    get data() {
        return this.#data;
    }
}
export function getPerformanceAgentFocusFromModel(model) {
    const parsedTrace = model.parsedTrace();
    const insights = model.traceInsights();
    const traceMetadata = model.metadata();
    if (!insights || !parsedTrace || !traceMetadata) {
        return null;
    }
    return AgentFocus.full(parsedTrace, insights, traceMetadata);
}
//# sourceMappingURL=AIContext.js.map