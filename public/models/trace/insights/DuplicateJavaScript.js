// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import * as Extras from '../extras/extras.js';
import * as Helpers from '../helpers/helpers.js';
import { InsightCategory, } from './types.js';
export const UIStrings = {
    /**
     * @description Title of an insight that identifies multiple copies of the same JavaScript sources, and recommends removing the duplication.
     */
    title: 'Duplicate JavaScript',
    /**
     * @description Description of an insight that identifies multiple copies of the same JavaScript sources, and recommends removing the duplication.
     */
    description: 'Remove large, duplicate JavaScript modules from bundles to reduce unnecessary bytes consumed by network activity.',
};
const str_ = i18n.i18n.registerUIStrings('models/trace/insights/DuplicateJavaScript.ts', UIStrings);
export const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
function finalize(partialModel) {
    const requests = [...partialModel.duplication.values().flatMap(array => array.map(v => v.script.request))].filter(e => !!e); // eslint-disable-line no-implicit-coercion
    return {
        insightKey: "DuplicateJavaScript" /* InsightKeys.DUPLICATE_JAVASCRIPT */,
        strings: UIStrings,
        title: i18nString(UIStrings.title),
        description: i18nString(UIStrings.description),
        category: InsightCategory.LCP,
        state: Boolean(partialModel.duplication.values().next().value) ? 'fail' : 'pass',
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
        return Helpers.Timing.timestampIsInBounds(context.bounds, script.ts);
    });
    const duplication = Extras.ScriptDuplication.computeScriptDuplication({ scripts });
    return finalize({ duplication });
}
//# sourceMappingURL=DuplicateJavaScript.js.map