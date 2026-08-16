// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import { html, render } from '../../ui/lit/lit.js';
import { AffectedResourcesView } from './AffectedResourcesView.js';
const UIStrings = {
    /**
     * @description Label for the the number of affected `Potentially-tracking Sites` associated with a
     *DevTools issue. In this context, `tracking` refers to bounce tracking and `Site` is equivalent
     *to eTLD+1.
     *See https://github.com/privacycg/nav-tracking-mitigations/blob/main/bounce-tracking-explainer.md
     *and https://developer.mozilla.org/en-US/docs/Glossary/eTLD.
     */
    nTrackingSites: '{n, plural, =1 {1 potentially tracking website} other {# potentially tracking websites}}',
};
const str_ = i18n.i18n.registerUIStrings('panels/issues/AffectedTrackingSitesView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export function defaultView(input, output, target) {
    render(html `
      <tbody>
        ${input.trackingSites.map(site => html `
          <tr class="affected-resource-directive">
            <td class="affected-resource-cell" title=${site}>${site}</td>
          </tr>
        `)}
      </tbody>
    `, target);
}
export class AffectedTrackingSitesView extends AffectedResourcesView {
    #view = defaultView;
    getResourceNameWithCount(count) {
        return i18nString(UIStrings.nTrackingSites, { n: count });
    }
    update() {
        const trackingSites = Array.from(this.issue.getBounceTrackingSites());
        this.#view({ trackingSites }, {}, this.affectedResources);
        this.updateAffectedResourceCount(trackingSites.length);
    }
}
//# sourceMappingURL=AffectedTrackingSitesView.js.map