// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import { html, render } from '../../ui/lit/lit.js';
import { AffectedResourcesView, renderElementCell } from './AffectedResourcesView.js';
const UIStrings = {
    /**
     * @description Label in the Issues panel for the number of affected elements for lazy-load image issues.
     */
    nElements: '{n, plural, =1 {# element} other {# elements}}',
};
const str_ = i18n.i18n.registerUIStrings('panels/issues/AffectedLazyLoadImagesView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export const DEFAULT_VIEW = (input, _output, target) => {
    // clang-format off
    render(html `
    ${input.elements.map(element => html `<tr>${renderElementCell(element)}</tr>`)}
  `, target);
    // clang-format on
};
export class AffectedLazyLoadImagesView extends AffectedResourcesView {
    #view;
    constructor(parent, issue, jslogContext, view = DEFAULT_VIEW) {
        super(parent, issue, jslogContext);
        this.#view = view;
    }
    update() {
        this.requestResolver.clear();
        this.#render();
    }
    getResourceNameWithCount(count) {
        return i18nString(UIStrings.nElements, { n: count });
    }
    #render() {
        const issues = this.issue.getLazyLoadImageIssues();
        const issueCategory = this.issue.getCategory();
        let count = 0;
        const elements = [];
        for (const issue of issues) {
            count += issue.elementCount();
            for (const element of issue.elements()) {
                elements.push(this.createElementCellData(element, issueCategory));
            }
        }
        this.updateAffectedResourceCount(count);
        this.#view({ elements }, undefined, this.affectedResources);
    }
}
//# sourceMappingURL=AffectedLazyLoadImagesView.js.map