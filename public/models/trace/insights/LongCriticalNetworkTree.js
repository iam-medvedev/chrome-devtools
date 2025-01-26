// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import { InsightCategory } from './types.js';
const UIStrings = {
    /**
     * @description Title of an insight that recommends avoiding chaining critical requests.
     */
    title: 'Long critical network tree',
    /**
     * @description Description of an insight that recommends avoiding chaining critical requests.
     */
    description: '[Avoid chaining critical requests](https://developer.chrome.com/docs/lighthouse/performance/critical-request-chains) by reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load.',
};
const str_ = i18n.i18n.registerUIStrings('models/trace/insights/LongCriticalNetworkTree.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export function deps() {
    return ['NetworkRequests'];
}
function finalize(partialModel) {
    return {
        title: i18nString(UIStrings.title),
        description: i18nString(UIStrings.description),
        category: InsightCategory.LCP,
        shouldShow: partialModel.longChains.length > 0,
        ...partialModel,
    };
}
export function generateInsight(_parsedTrace, _context) {
    return finalize({
        longChains: [],
    });
}
//# sourceMappingURL=LongCriticalNetworkTree.js.map