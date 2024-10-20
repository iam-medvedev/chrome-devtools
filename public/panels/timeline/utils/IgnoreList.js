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
    const script = sourceMappedData?.script;
    const uiSourceCode = sourceMappedData?.devtoolsLocation?.uiSourceCode;
    const resolvedUrl = uiSourceCode?.url();
    const isKnownThirdParty = uiSourceCode?.isKnownThirdParty();
    const isContentScript = script?.isContentScript();
    const ignoreListOptions = { isContentScript, isKnownThirdParty };
    const urlToUse = resolvedUrl || rawUrl;
    return isIgnoreListedURL(urlToUse, ignoreListOptions);
}
export function isIgnoreListedURL(url, options) {
    return Bindings.IgnoreListManager.IgnoreListManager.instance().isUserIgnoreListedURL(url, options);
}
//# sourceMappingURL=IgnoreList.js.map