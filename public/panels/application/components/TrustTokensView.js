// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../../ui/components/icon_button/icon_button.js';
import '../../../ui/legacy/components/data_grid/data_grid.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as SDK from '../../../core/sdk/sdk.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as LegacyWrapper from '../../../ui/components/legacy_wrapper/legacy_wrapper.js';
import * as RenderCoordinator from '../../../ui/components/render_coordinator/render_coordinator.js';
import * as Lit from '../../../ui/lit/lit.js';
import trustTokensViewStylesRaw from './trustTokensView.css.js';
// TODO(crbug.com/391381439): Fully migrate off of constructed style sheets.
const trustTokensViewStyles = new CSSStyleSheet();
trustTokensViewStyles.replaceSync(trustTokensViewStylesRaw.cssContent);
const { html } = Lit;
const UIStrings = {
    /**
     *@description Text for the issuer of an item
     */
    issuer: 'Issuer',
    /**
     *@description Column header for Trust Token table
     */
    storedTokenCount: 'Stored token count',
    /**
     *@description Hover text for an info icon in the Private State Token panel
     */
    allStoredTrustTokensAvailableIn: 'All stored private state tokens available in this browser instance.',
    /**
     * @description Text shown instead of a table when the table would be empty.
     */
    noTrustTokensStored: 'No private state tokens are currently stored.',
    /**
     * @description Each row in the Private State Token table has a delete button. This is the text shown
     * when hovering over this button. The placeholder is a normal URL, indicating the site which
     * provided the Private State Tokens that will be deleted when the button is clicked.
     * @example {https://google.com} PH1
     */
    deleteTrustTokens: 'Delete all stored private state tokens issued by {PH1}.',
    /**
     * @description Heading label for a view. Previously known as 'Trust Tokens'.
     */
    trustTokens: 'Private state tokens',
};
const str_ = i18n.i18n.registerUIStrings('panels/application/components/TrustTokensView.ts', UIStrings);
export const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
/** Fetch the Trust Token data regularly from the backend while the panel is open */
const REFRESH_INTERVAL_MS = 1000;
export class TrustTokensView extends LegacyWrapper.LegacyWrapper.WrappableComponent {
    #shadow = this.attachShadow({ mode: 'open' });
    #deleteClickHandler(issuerOrigin) {
        const mainTarget = SDK.TargetManager.TargetManager.instance().primaryPageTarget();
        void mainTarget?.storageAgent().invoke_clearTrustTokens({ issuerOrigin });
    }
    connectedCallback() {
        this.wrapper?.contentElement.classList.add('vbox');
        this.#shadow.adoptedStyleSheets = [trustTokensViewStyles];
        void this.render();
    }
    async render() {
        const mainTarget = SDK.TargetManager.TargetManager.instance().primaryPageTarget();
        if (!mainTarget) {
            return;
        }
        const { tokens } = await mainTarget.storageAgent().invoke_getTrustTokens();
        tokens.sort((a, b) => a.issuerOrigin.localeCompare(b.issuerOrigin));
        await RenderCoordinator.write('Render TrustTokensView', () => {
            // clang-format off
            Lit.render(html `
        <div>
          <span class="heading">${i18nString(UIStrings.trustTokens)}</span>
          <devtools-icon name="info" title=${i18nString(UIStrings.allStoredTrustTokensAvailableIn)}></devtools-icon>
          ${this.#renderGridOrNoDataMessage(tokens)}
        </div>
      `, this.#shadow, { host: this });
            // clang-format on
            if (this.isConnected) {
                setTimeout(() => this.render(), REFRESH_INTERVAL_MS);
            }
        });
    }
    #renderGridOrNoDataMessage(tokens) {
        if (tokens.length === 0) {
            return html `<div class="no-tt-message">${i18nString(UIStrings.noTrustTokensStored)}</div>`;
        }
        // clang-format off
        return html `
      <devtools-data-grid striped inline>
        <table>
          <tr>
            <th id="issuer" weight="10" sortable>${i18nString(UIStrings.issuer)}</th>
            <th id="count" weight="5" sortable>${i18nString(UIStrings.storedTokenCount)}</th>
            <th id="delete-button" weight="1" sortable></th>
          </tr>
          ${tokens.filter(token => token.count > 0)
            .map(token => html `
              <tr>
                <td>${removeTrailingSlash(token.issuerOrigin)}</td>
                <td>${token.count}</td>
                <td>
                  <devtools-button .iconName=${'bin'}
                                   .jslogContext=${'delete-all'}
                                   .size=${"SMALL" /* Buttons.Button.Size.SMALL */}
                                   .title=${i18nString(UIStrings.deleteTrustTokens, { PH1: removeTrailingSlash(token.issuerOrigin) })}
                                   .variant=${"icon" /* Buttons.Button.Variant.ICON */}
                                   @click=${this.#deleteClickHandler.bind(this, removeTrailingSlash(token.issuerOrigin))}></devtools-button>
                </td>
              </tr>
            `)}
        </table>
      </devtools-data-grid>
    `;
        // clang-format on
    }
}
function removeTrailingSlash(s) {
    return s.replace(/\/$/, '');
}
customElements.define('devtools-trust-tokens-storage-view', TrustTokensView);
//# sourceMappingURL=TrustTokensView.js.map