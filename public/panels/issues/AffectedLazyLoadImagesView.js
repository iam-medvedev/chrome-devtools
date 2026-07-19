// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import { html, render } from '../../ui/lit/lit.js';
import { AffectedResourcesView } from './AffectedResourcesView.js';
const UIStrings = {
    /**
     * @description Noun for singular or plural number of affected element resource indication in issue view.
     */
    nElements: '{n, plural, =1 {# element} other {# elements}}',
};
const str_ = i18n.i18n.registerUIStrings('panels/issues/AffectedLazyLoadImagesView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export const DEFAULT_VIEW = async (input, _output, target) => {
    const templates = [];
    for (const issue of input.issues) {
        for (const element of issue.elements()) {
            templates.push(html `<tr>
        ${await input.createElementCell(element, input.issueCategory)}
      </tr>`);
        }
    }
    render(html `${templates}`, target);
};
export class AffectedLazyLoadImagesView extends AffectedResourcesView {
    #view;
    constructor(parent, issue, jslogContext, view = DEFAULT_VIEW) {
        super(parent, issue, jslogContext);
        this.#view = view;
    }
    update() {
        this.requestResolver.clear();
        void this.#render();
    }
    getResourceNameWithCount(count) {
        return i18nString(UIStrings.nElements, { n: count });
    }
    async #render() {
        const issues = this.issue.getLazyLoadImageIssues();
        let count = 0;
        for (const issue of issues) {
            count += issue.elementCount();
        }
        this.updateAffectedResourceCount(count);
        const input = {
            issues,
            issueCategory: this.issue.getCategory(),
            createElementCell: this.createElementCell.bind(this),
        };
        await this.#view(input, {}, this.affectedResources);
    }
}
//# sourceMappingURL=AffectedLazyLoadImagesView.js.map