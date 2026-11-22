// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import { AffectedElementsView } from './AffectedElementsView.js';
const UIStrings = {
    /**
     * @description Label in the Issues panel for the number of affected permission elements.
     */
    nElements: '{n, plural, =1 {# element} other {# elements}}',
};
const str_ = i18n.i18n.registerUIStrings('panels/issues/AffectedPermissionElementsView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class AffectedPermissionElementsView extends AffectedElementsView {
    update() {
        this.requestResolver.clear();
        const elements = [];
        for (const issue of this.issue.getPermissionElementIssues()) {
            elements.push(...issue.elements());
        }
        this.appendAffectedElements(elements);
    }
    getResourceNameWithCount(count) {
        return i18nString(UIStrings.nElements, { n: count });
    }
}
//# sourceMappingURL=AffectedPermissionElementsView.js.map