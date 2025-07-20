// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
export class AgentFocus {
    static fromInsight(insight) {
        return new AgentFocus({
            type: 'insight',
            parsedTrace: insight.parsedTrace,
            insight: insight.insight,
            insightSetBounds: insight.insightSetBounds
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
//# sourceMappingURL=AIContext.js.map