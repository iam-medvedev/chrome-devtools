// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-lit-render-outside-of-view */
import '../../../ui/legacy/legacy.js';
import * as Common from '../../../core/common/common.js';
import * as i18n from '../../../core/i18n/i18n.js';
import { html, nothing, render } from '../../../ui/lit/lit.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import CSSPropertyDocsViewStyles from './cssPropertyDocsView.css.js';
const UIStrings = {
    /**
     *@description Text for button that redirects to CSS property documentation.
     */
    learnMore: 'Learn more',
    /**
     *@description Text for a checkbox to turn off the CSS property documentation.
     */
    dontShow: 'Don\'t show',
};
const str_ = i18n.i18n.registerUIStrings('panels/elements/components/CSSPropertyDocsView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class CSSPropertyDocsView extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #cssProperty;
    constructor(cssProperty) {
        super();
        this.#cssProperty = cssProperty;
        this.#render();
    }
    #dontShowChanged(e) {
        const showDocumentation = !e.target.checked;
        Common.Settings.Settings.instance()
            .moduleSetting('show-css-property-documentation-on-hover')
            .set(showDocumentation);
    }
    #render() {
        const description = this.#cssProperty.description;
        const link = this.#cssProperty.references?.[0].url;
        // Disabled until https://crbug.com/1079231 is fixed.
        // clang-format off
        render(html `
      <style>${CSSPropertyDocsViewStyles}</style>
      <div class="docs-popup-wrapper">
        ${description ? html `
          <div id="description">
            ${description}
          </div>
        ` : nothing}
        ${link ? html `
          <div class="docs-popup-section footer">
            <x-link
              id="learn-more"
              href=${link}
              class="clickable underlined unbreakable-text"
            >
              ${i18nString(UIStrings.learnMore)}
            </x-link>
            <devtools-checkbox
              @change=${this.#dontShowChanged}
              jslog=${VisualLogging.toggle('css-property-doc').track({ change: true })}>
              ${i18nString(UIStrings.dontShow)}
            </devtools-checkbox>
          </div>
        ` : nothing}
      </div>
    `, this.#shadow, {
            host: this,
        });
        // clang-format on
    }
}
customElements.define('devtools-css-property-docs-view', CSSPropertyDocsView);
//# sourceMappingURL=CSSPropertyDocsView.js.map