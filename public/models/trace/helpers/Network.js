// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
export function isSyntheticNetworkRequestEventRenderBlocking(traceEventData) {
    return traceEventData.args.data.renderBlocking !== 'non_blocking';
}
//# sourceMappingURL=Network.js.map