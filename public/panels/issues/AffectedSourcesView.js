// Copyright 2021 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
import { html, render } from '../../ui/lit/lit.js';
import { AffectedResourcesView } from './AffectedResourcesView.js';
export const DEFAULT_VIEW = (input, _output, target) => {
    // clang-format off
    render(html `
    ${input.sources.map(source => html `
      <tr class="affected-resource-source">
        <td>
          ${Components.Linkifier.Linkifier.renderLinkifiedUrl(source.url, {
        columnNumber: source.columnNumber,
        lineNumber: source.lineNumber,
        tabStop: true,
        showColumnNumber: false,
        jslogContext: 'source-location',
    })}
        </td>
      </tr>
    `)}
  `, target);
    // clang-format on
};
const UIStrings = {
    /**
     * @description Label in the Issues panel for the number of affected source
     * code locations.
     */
    nSources: '{n, plural, =1 {# source} other {# sources}}',
};
const str_ = i18n.i18n.registerUIStrings('panels/issues/AffectedSourcesView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class AffectedSourcesView extends AffectedResourcesView {
    #view;
    constructor(parent, issue, jslogContext, view = DEFAULT_VIEW) {
        super(parent, issue, jslogContext);
        this.#view = view;
    }
    #appendAffectedSources(affectedSources) {
        const sources = Array.from(affectedSources);
        this.#view({ sources }, undefined, this.affectedResources);
        this.updateAffectedResourceCount(sources.length);
    }
    getResourceNameWithCount(count) {
        return i18nString(UIStrings.nSources, { n: count });
    }
    clear() {
        this.requestResolver.clear();
        this.#view({ sources: [] }, undefined, this.affectedResources);
    }
    update() {
        this.requestResolver.clear();
        this.#appendAffectedSources(this.issue.sources());
    }
}
//# sourceMappingURL=AffectedSourcesView.js.map