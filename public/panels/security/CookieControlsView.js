// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../ui/components/switch/switch.js';
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as Input from '../../ui/components/input/input.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as LitHtml from '../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import cookieControlsViewStyles from './cookieControlsView.css.js';
const { render, html } = LitHtml;
const UIStrings = {
    /**
     *@description Title in the view's header for the controls tool in the Privacy & Security panel
     */
    viewTitle: 'Controls',
    /**
     *@description Explanation in the view's header about the purpose of this controls tool
     */
    viewExplanation: 'Test how this site will perform if a user chooses to restrict third-party cookies in Chrome',
    /**
     *@description Title in the card within the controls tool
     */
    cardTitle: 'Temporarily restrict third-party cookies',
    /**
     *@description Disclaimer beneath the card title to tell the user that the controls will only persist while devtools is open
     */
    cardDisclaimer: 'Only when DevTools is open',
    /**
     *@description Message as part of the banner that prompts the user to reload the page to see the changes take effect. This appears when the user makes any change within the tool
     */
    siteReloadMessage: 'To apply your updated controls, reload the page',
    /**
     *@description Title of controls section. These are exceptions that the user will be able to override to test their site
     */
    exceptions: 'Exceptions',
    /**
     *@description Explanation of what exceptions are in this context
     */
    exceptionsExplanation: 'Scenarios that grant access to third-party cookies',
    /**
     *@description Title for the grace period exception control
     */
    gracePeriodTitle: 'Third-party cookie grace period',
    /**
     *@description Explanation of the grace period and a link to learn more
     *@example {grace period} PH1
     */
    gracePeriodExplanation: 'If this site or a site embedded on it is enrolled in the {PH1}, then the site can access third-party cookies',
    /**
     *@description Text used for link within the gracePeriodExplanation to let the user learn more about the grace period
     */
    gracePeriod: 'grace period',
    /**
     *@description Title for the heuristic exception control
     */
    heuristicTitle: 'Heuristics based exception',
    /**
     *@description Explanation of the heuristics with a link to learn more about the scenarios in which they apply
     *@example {predefined scenarios} PH1
     */
    heuristicExplanation: 'In {PH1} like pop-ups or redirects, a site embedded on this site can access third-party cookies',
    /**
     *@description Text used for link within the heuristicExplanation to let the user learn more about the heuristic exception
     */
    scenarios: 'predefined scenarios',
    /**
     *@description Note at the bottom of the controls tool telling the user that their organization has an enterprise policy that controls cookies. This may disable the tool
     */
    enterpriseDisclaimer: 'Your organization manages third-party cookie access for this site',
    /**
     *@description Tooltip that appears when the user hovers over the card's enterprise icon
     */
    enterpriseTooltip: 'This setting is managed by your organization',
    /**
      +*@description Button with the enterpise disclaimer that takes the user to the relevant enterprise cookie chrome setting
     */
    viewDetails: 'View details',
};
const str_ = i18n.i18n.registerUIStrings('panels/security/CookieControlsView.ts', UIStrings);
export const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export const i18nFormatString = i18n.i18n.getFormatLocalizedString.bind(undefined, str_);
export class CookieControlsView extends UI.Widget.VBox {
    #view;
    constructor(element, view = (input, output, target) => {
        // TODO(crbug.com/365737493): Determine whether the enterprise is present based on UI bindings
        const enterprisePresent = false;
        const toggleSetting = Common.Settings.Settings.instance().moduleSetting('cookie-control-override-enabled');
        const gracePeriodSetting = Common.Settings.Settings.instance().moduleSetting('grace-period-mitigation-disabled');
        const heuristicSetting = Common.Settings.Settings.instance().moduleSetting('heuristic-mitigation-disabled');
        // clang-format off
        const cardHeader = html `
      <div class="card-header">
        <div class="lhs">
          <div class="text">
            <div class="card-title">${i18nString(UIStrings.cardTitle)}</div>
            <div class="body">${i18nString(UIStrings.cardDisclaimer)}</div>
          </div>
          ${enterprisePresent ? html `
            <devtools-icon
              .name=${'domain'}
              ${LitHtml.Directives.ref((el) => {
            UI.Tooltip.Tooltip.install(el, i18nString(UIStrings.enterpriseTooltip));
        })}>
            </devtools-icon>` : LitHtml.nothing}
        </div>
        <div>
          <devtools-switch
            .checked=${Boolean(toggleSetting.get())}
            .disabled=${enterprisePresent}
            @switchchange=${(e) => {
            input.inputChanged(e.target.checked, toggleSetting);
        }}>
          </devtools-switch>
        </div>
      </div>
    `;
        const gracePeriodControl = html `
      <div class="card-row">
        <label class='checkbox-label'>
          <input type='checkbox'
            ?disabled=${enterprisePresent || !Boolean(toggleSetting.get())}
            ?checked=${!Boolean(gracePeriodSetting.get())}
            @change=${(e) => {
            input.inputChanged(!e.target.checked, gracePeriodSetting);
        }}
          >
          <div class="text">
            <div class="body">${i18nString(UIStrings.gracePeriodTitle)}</div>
            <div class="body">
              ${i18nFormatString(UIStrings.gracePeriodExplanation, {
            PH1: enterprisePresent ? i18nString(UIStrings.gracePeriod) : UI.Fragment.html `<x-link class="x-link" href="https://developers.google.com/privacy-sandbox/cookies/temporary-exceptions/grace-period" jslog=${VisualLogging.link('grace-period-link').track({ click: true })}>${i18nString(UIStrings.gracePeriod)}</x-link>`,
        })}
            </div>
          </div>
        </label>
      </div>
    `;
        const heuristicControl = html `
      <div class="card-row">
        <label class='checkbox-label'>
          <input type='checkbox'
            ?disabled=${enterprisePresent || !Boolean(toggleSetting.get())}
            ?checked=${!Boolean(heuristicSetting.get())}
            @change=${(e) => {
            input.inputChanged(!e.target.checked, heuristicSetting);
        }}
          >
          <div class="text">
            <div class="body">${i18nString(UIStrings.heuristicTitle)}</div>
            <div class="body">
              ${i18nFormatString(UIStrings.heuristicExplanation, {
            PH1: enterprisePresent ? i18nString(UIStrings.scenarios) : UI.Fragment.html `<x-link class="x-link" href="https://developers.google.com/privacy-sandbox/cookies/temporary-exceptions/heuristics-based-exceptions" jslog=${VisualLogging.link('heuristic-link').track({ click: true })}>${i18nString(UIStrings.scenarios)}</x-link>`,
        })}
            </div>
          </div>
        </label>
      </div>
    `;
        const enterpriseDisclaimer = html `
      <div class="enterprise">
        <div class="text body">${i18nString(UIStrings.enterpriseDisclaimer)}</div>
        <devtools-icon
          .name=${'domain'}
        ></devtools-icon>
        <devtools-button
          @click=${input.openChromeCookieSettings}
          aria-label="View details"
          .variant=${"outlined" /* Buttons.Button.Variant.OUTLINED */}
          jslog=${VisualLogging.action('view-details').track({ click: true })}>
            ${i18nString(UIStrings.viewDetails)}
        </devtools-button>
      </div>
    `;
        render(html `
      <div class="overflow-auto">
        <div class="controls">
          <div class="header">
            <div class="title">${i18nString(UIStrings.viewTitle)}</div>
            <div class="body">${i18nString(UIStrings.viewExplanation)}</div>
          </div>
          <devtools-card>
            <div slot="content" class=${enterprisePresent ? 'card enterprise-disabled' : 'card'}>
              ${cardHeader}
              <div>
                <div class="card-row text">
                  <div class="card-row-title">${i18nString(UIStrings.exceptions)}</div>
                  <div class="body">${i18nString(UIStrings.exceptionsExplanation)}</div>
                </div>
                ${gracePeriodControl}
                ${heuristicControl}
              </div>
            </div>
          </devtools-card>
          ${enterprisePresent ? enterpriseDisclaimer : LitHtml.nothing}
        </div>
      </div>
    `, target, { host: this });
        // clang-format on
    }) {
        super(true, undefined, element);
        this.#view = view;
        this.update();
    }
    async doUpdate() {
        this.#view(this, this, this.contentElement);
    }
    inputChanged(newValue, setting) {
        setting.set(newValue);
        UI.InspectorView.InspectorView.instance().displayDebuggedTabReloadRequiredWarning(i18nString(UIStrings.siteReloadMessage));
        this.update();
    }
    openChromeCookieSettings() {
        const rootTarget = SDK.TargetManager.TargetManager.instance().rootTarget();
        if (rootTarget === null) {
            return;
        }
        const url = 'chrome://settings/cookies';
        void rootTarget.targetAgent().invoke_createTarget({ url }).then(result => {
            if (result.getError()) {
                Host.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(url);
            }
        });
    }
    wasShown() {
        super.wasShown();
        this.registerCSSFiles([Input.checkboxStyles, cookieControlsViewStyles]);
    }
}
//# sourceMappingURL=CookieControlsView.js.map