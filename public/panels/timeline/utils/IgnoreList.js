// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Bindings from '../../../models/bindings/bindings.js';
import * as Trace from '../../../models/trace/trace.js';
import { SourceMapsResolver } from './SourceMapsResolver.js';
export function isIgnoreListedEntry(entry) {
    if (!Trace.Types.Events.isProfileCall(entry)) {
        return false;
    }
    const rawUrl = entry.callFrame.url;
    const sourceMappedData = SourceMapsResolver.resolvedCodeLocationForEntry(entry);
    const resolvedUrl = sourceMappedData?.devtoolsLocation?.uiSourceCode.url();
    return resolvedUrl ? isIgnoreListedURL(resolvedUrl) : isIgnoreListedURL(rawUrl);
}
export function isIgnoreListedURL(url) {
    return Bindings.IgnoreListManager.IgnoreListManager.instance().isUserIgnoreListedURL(url);
}
//# sourceMappingURL=IgnoreList.js.map