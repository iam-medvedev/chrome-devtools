// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import * as LegacyJavaScriptLib from '../../../third_party/legacy-javascript/legacy-javascript.js';
import * as Helpers from '../helpers/helpers.js';
import { estimateCompressionRatioForScript, metricSavingsForWastedBytes } from './Common.js';
import { InsightCategory, } from './types.js';
const { detectLegacyJavaScript } = LegacyJavaScriptLib.LegacyJavaScript;
export const UIStrings = {
    /**
     * @description Title of an insight that identifies polyfills for modern JavaScript features, and recommends their removal.
     */
    title: 'Legacy JavaScript',
    /**
     * @description Description of an insight that identifies polyfills for modern JavaScript features, and recommends their removal.
     */
    description: 'Legacy JavaScript',
};
const str_ = i18n.i18n.registerUIStrings('models/trace/insights/LegacyJavaScript.ts', UIStrings);
export const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
function finalize(partialModel) {
    const requests = [...partialModel.legacyJavaScriptResults.keys()].map(script => script.request).filter(e => !!e);
    return {
        insightKey: "LegacyJavaScript" /* InsightKeys.LEGACY_JAVASCRIPT */,
        strings: UIStrings,
        title: i18nString(UIStrings.title),
        description: i18nString(UIStrings.description),
        category: InsightCategory.ALL,
        state: requests.length ? 'fail' : 'pass',
        relatedEvents: [...new Set(requests)],
        ...partialModel,
    };
}
export function generateInsight(parsedTrace, context) {
    const scripts = parsedTrace.Scripts.scripts.filter(script => {
        if (!context.navigation) {
            return false;
        }
        if (script.frame !== context.frameId) {
            return false;
        }
        if (script.url?.startsWith('chrome-extension://')) {
            return false;
        }
        return Helpers.Timing.timestampIsInBounds(context.bounds, script.ts);
    });
    const legacyJavaScriptResults = new Map();
    const wastedBytesByRequestId = new Map();
    for (const script of scripts) {
        if (!script.content) {
            continue;
        }
        const result = detectLegacyJavaScript(script.content, script.sourceMap);
        legacyJavaScriptResults.set(script, result);
        if (script.request) {
            const compressionRatio = estimateCompressionRatioForScript(script);
            const transferSize = Math.round(result.estimatedByteSavings * compressionRatio);
            const requestId = script.request.args.data.requestId;
            wastedBytesByRequestId.set(requestId, transferSize);
        }
    }
    return finalize({
        legacyJavaScriptResults,
        metricSavings: metricSavingsForWastedBytes(wastedBytesByRequestId, context),
    });
}
//# sourceMappingURL=LegacyJavaScript.js.map