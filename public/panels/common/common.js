// gen/front_end/panels/common/common.prebundle.js
import * as Host2 from "./../../core/host/host.js";
import * as i18n9 from "./../../core/i18n/i18n.js";
import * as Buttons2 from "./../../ui/components/buttons/buttons.js";
import * as UI5 from "./../../ui/legacy/legacy.js";

// gen/front_end/panels/common/common.css.js
var common_css_default = `/*
 * Copyright 2025 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.type-to-allow-dialog {
  width: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    font: var(--sys-typescale-body2-medium);
    margin: var(--sys-size-5) var(--sys-size-5) var(--sys-size-5) var(--sys-size-8);
  }

  .title {
    padding-top: var(--sys-size-3);
  }

  .dialog-close-button {
    margin: var(--sys-size-3);
    z-index: 1;
  }

  .message,
  .text-input {
    margin: 0 var(--sys-size-8);
  }

  .text-input {
    margin-top: var(--sys-size-5);
  }

  .button {
    text-align: right;
    margin: var(--sys-size-6) var(--sys-size-8) var(--sys-size-8) var(--sys-size-8);
    gap: var(--sys-size-5);
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
  }

  .button button {
    min-width: var(--sys-size-19);
  }
}

/*# sourceURL=${import.meta.resolve("./common.css")} */`;

// gen/front_end/panels/common/AiCodeCompletionTeaser.js
import * as Common from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as Root from "./../../core/root/root.js";
import * as Snackbars from "./../../ui/components/snackbars/snackbars.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
import { html as html2, nothing, render as render2 } from "./../../ui/lit/lit.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/common/aiCodeCompletionTeaser.css.js
var aiCodeCompletionTeaser_css_default = `/*
 * Copyright 2025 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

@scope to (devtools-widget > *) {
    .ai-code-completion-teaser-screen-reader-only {
        position: absolute;
        overflow: hidden;
        clip-path: rect(0 0 0 0);
        height: var(--sys-size-1);
        width: var(--sys-size-1);
        margin: -1 * var(--sys-size-1);;
        padding: 0;
        border: 0;
    }

    .ai-code-completion-teaser {
        padding-left: var(--sys-size-3);
        line-height: normal;
        pointer-events: all;
        align-items: center;
        font-style: italic;

        .ai-code-completion-teaser-dismiss {
            text-decoration: underline;
            cursor: pointer;
        }

        .ai-code-completion-teaser-action {
            display: inline-flex;
            gap: var(--sys-size-2);

            span {
                border: var(--sys-size-1) solid var(--sys-color-neutral-outline);
                border-radius: var(--sys-shape-corner-extra-small);
                padding: 0 var(--sys-size-3);
            }
        }
    }
}

/*# sourceURL=${import.meta.resolve("./aiCodeCompletionTeaser.css")} */`;

// gen/front_end/panels/common/FreDialog.js
import * as i18n from "./../../core/i18n/i18n.js";
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as UI from "./../../ui/legacy/legacy.js";
import * as Lit from "./../../ui/lit/lit.js";

// gen/front_end/panels/common/freDialog.css.js
var freDialog_css_default = `/*
 * Copyright 2025 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */


.fre-disclaimer {
  width: var(--sys-size-33);
  padding: var(--sys-size-9);

  header {
    display: flex;
    gap: var(--sys-size-8);
    margin-bottom: var(--sys-size-6);
    align-items: center;

    h2 {
      margin: 0;
      color: var(--sys-color-on-surface);
      font: var(--sys-typescale-headline5);
    }

    .header-icon-container {
      background: linear-gradient(
        135deg,
        var(--sys-color-gradient-primary),
        var(--sys-color-gradient-tertiary)
      );
      border-radius: var(--sys-size-4);
      min-height: var(--sys-size-14);
      min-width: var(--sys-size-14);
      display: flex;
      align-items: center;
      justify-content: center;

      devtools-icon {
        width: var(--sys-size-9);
        height: var(--sys-size-9);
      }
    }
  }

  .reminder-container {
    border-radius: var(--sys-size-6);
    background-color: var(--sys-color-surface4);
    padding: var(--sys-size-9);

    h3 {
      color: var(--sys-color-on-surface);
      font: var(--sys-typescale-body4-medium);
      margin: 0;
    }

    .reminder-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--sys-size-5);
      margin-top: var(--sys-size-6);
      font: var(--sys-typescale-body5-regular);

      devtools-icon.reminder-icon {
        width: var(--sys-size-8);
        height: var(--sys-size-8);
      }

      .link {
        color: var(--sys-color-primary);
        text-decoration-line: underline;
      }
    }
  }

  footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: var(--sys-size-8);
    min-width: var(--sys-size-28);

    .right-buttons {
      display: flex;
      gap: var(--sys-size-5);
    }
  }
}

/*# sourceURL=${import.meta.resolve("./freDialog.css")} */`;

// gen/front_end/panels/common/FreDialog.js
var { html, Directives: { ifDefined } } = Lit;
var UIStrings = {
  /**
   * @description Header text for the feature reminder dialog.
   */
  thingsToConsider: "Things to consider",
  /**
   * @description Text for the learn more button in the feature reminder dialog.
   */
  learnMore: "Learn more",
  /**
   * @description Text for the cancel button in the feature reminder dialog.
   */
  cancel: "Cancel",
  /**
   * @description Text for the got it button in the feature reminder dialog.
   */
  gotIt: "Got it"
};
var str_ = i18n.i18n.registerUIStrings("panels/common/FreDialog.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var FreDialog = class {
  static show({ header, reminderItems, onLearnMoreClick, ariaLabel, learnMoreButtonTitle, learnMoreButtonAriaLabel }) {
    const dialog = new UI.Dialog.Dialog();
    if (ariaLabel) {
      dialog.setAriaLabel(ariaLabel);
    }
    const result = Promise.withResolvers();
    Lit.render(html`
      <div class="fre-disclaimer">
        <style>
          ${freDialog_css_default}
        </style>
        <header>
          <div class="header-icon-container">
            <devtools-icon name=${header.iconName}></devtools-icon>
          </div>
          <h2 tabindex="-1">
            ${header.text}
          </h2>
        </header>
        <main class="reminder-container">
          <h3>${i18nString(UIStrings.thingsToConsider)}</h3>
          ${reminderItems.map((reminderItem) => html`
            <div class="reminder-item">
              <devtools-icon class="reminder-icon" name=${reminderItem.iconName}></devtools-icon>
              <span>${reminderItem.content}</span>
            </div>
          `)}
        </main>
        <footer>
          <devtools-button
            @click=${onLearnMoreClick}
            .jslogContext=${"fre-disclaimer.learn-more"}
            .variant=${"outlined"}
            aria-label=${ifDefined(learnMoreButtonAriaLabel)}>
            ${learnMoreButtonTitle ?? i18nString(UIStrings.learnMore)}
          </devtools-button>
          <div class="right-buttons">
            <devtools-button
              @click=${() => {
      result.resolve(false);
      dialog.hide();
    }}
              .jslogContext=${"fre-disclaimer.cancel"}
              .variant=${"tonal"}>
              ${i18nString(UIStrings.cancel)}
            </devtools-button>
            <devtools-button
              @click=${() => {
      result.resolve(true);
      dialog.hide();
    }}
              .jslogContext=${"fre-disclaimer.continue"}
              .variant=${"primary"}>
              ${i18nString(UIStrings.gotIt)}
            </devtools-button>
          </div>
        </footer>
      </div>`, dialog.contentElement);
    dialog.setOutsideClickCallback((ev) => {
      ev.consume(true);
      dialog.hide();
      result.resolve(false);
    });
    dialog.setOnHideCallback(() => {
      result.resolve(false);
    });
    dialog.setSizeBehavior(
      "MeasureContent"
      /* UI.GlassPane.SizeBehavior.MEASURE_CONTENT */
    );
    dialog.setDimmed(true);
    dialog.show();
    return result.promise;
  }
  constructor() {
  }
};

// gen/front_end/panels/common/AiCodeCompletionTeaser.js
var UIStringsNotTranslate = {
  /**
   * @description Text for `ctrl` key.
   */
  ctrl: "ctrl",
  /**
   * @description Text for `cmd` key.
   */
  cmd: "cmd",
  /**
   * @description Text for `i` key.
   */
  i: "i",
  /**
   * @description Text for `x` key.
   */
  x: "x",
  /**
   * @description Text for dismissing teaser.
   */
  dontShowAgain: "Don't show again",
  /**
   * @description Text for teaser to turn on code suggestions.
   */
  toTurnOnCodeSuggestions: "to turn on code suggestions.",
  /**
   * @description Text for snackbar notification on dismissing the teaser.
   */
  turnOnCodeSuggestionsAtAnyTimeInSettings: "Turn on code suggestions at any time in Settings",
  /**
   * @description Text for snackbar action button to manage settings.
   */
  manage: "Manage",
  /**
   * @description The footer disclaimer that links to more information
   * about the AI feature.
   */
  learnMore: "Learn more about AI code completion",
  /**
   * @description Header text for the AI-powered suggestions disclaimer dialog.
   */
  freDisclaimerHeader: "Code faster with AI-powered suggestions",
  /**
   * @description First disclaimer item text for the fre dialog.
   */
  freDisclaimerTextAiWontAlwaysGetItRight: "This feature uses AI and won\u2019t always get it right",
  /**
   * @description Second disclaimer item text for the fre dialog.
   */
  freDisclaimerTextPrivacy: "To generate code suggestions, your console input, the history of your current console session, the currently inspected CSS, and the contents of the currently open file are shared with Google. This data may be seen by human reviewers to improve this feature.",
  /**
   * @description Second disclaimer item text for the fre dialog when enterprise logging is off.
   */
  freDisclaimerTextPrivacyNoLogging: "To generate code suggestions, your console input, the history of your current console session, the currently inspected CSS, and the contents of the currently open file are shared with Google. This data will not be used to improve Google\u2019s AI models. Your organization may change these settings at any time.",
  /**
   * @description Third disclaimer item text for the fre dialog.
   */
  freDisclaimerTextUseWithCaution: "Use generated code snippets with caution",
  /**
   *@description Text for ARIA label for the teaser.
   */
  press: "Press",
  /**
   *@description Text for ARIA label for the teaser.
   */
  toDisableCodeSuggestions: "to disable code suggestions."
};
var lockedString = i18n3.i18n.lockedString;
var CODE_SNIPPET_WARNING_URL = "https://support.google.com/legal/answer/13505487";
var DEFAULT_VIEW = (input, _output, target) => {
  if (input.aidaAvailability !== "available") {
    render2(nothing, target);
    return;
  }
  const cmdOrCtrl = Host.Platform.isMac() ? lockedString(UIStringsNotTranslate.cmd) : lockedString(UIStringsNotTranslate.ctrl);
  const teaserAriaLabel = lockedString(UIStringsNotTranslate.press) + " " + cmdOrCtrl + " " + lockedString(UIStringsNotTranslate.i) + " " + lockedString(UIStringsNotTranslate.toTurnOnCodeSuggestions) + " " + lockedString(UIStringsNotTranslate.press) + " " + cmdOrCtrl + " " + lockedString(UIStringsNotTranslate.x) + " " + lockedString(UIStringsNotTranslate.toDisableCodeSuggestions);
  render2(html2`
          <style>${aiCodeCompletionTeaser_css_default}</style>
          <div class="ai-code-completion-teaser-screen-reader-only">${teaserAriaLabel}</div>
          <div class="ai-code-completion-teaser" aria-hidden="true">
            <span class="ai-code-completion-teaser-action">
              <span>${cmdOrCtrl}</span>
              <span>${lockedString(UIStringsNotTranslate.i)}</span>
            </span>
            </span>&nbsp;${lockedString(UIStringsNotTranslate.toTurnOnCodeSuggestions)}&nbsp;
            <span role="button" class="ai-code-completion-teaser-dismiss" @click=${input.onDismiss}
              jslog=${VisualLogging.action("ai-code-completion-teaser.dismiss").track({ click: true })}>
                ${lockedString(UIStringsNotTranslate.dontShowAgain)}
            </span>
          </div>
        `, target);
};
var AiCodeCompletionTeaser = class extends UI2.Widget.Widget {
  #view;
  #aidaAvailability = "no-account-email";
  #boundOnAidaAvailabilityChange;
  #onDetach;
  // Whether the user completed first run experience dialog or not.
  #aiCodeCompletionFreCompletedSetting = Common.Settings.Settings.instance().createSetting("ai-code-completion-enabled", false);
  // Whether the user dismissed the teaser or not.
  #aiCodeCompletionTeaserDismissedSetting = Common.Settings.Settings.instance().createSetting("ai-code-completion-teaser-dismissed", false);
  #noLogging;
  // Whether the enterprise setting is `ALLOW_WITHOUT_LOGGING` or not.
  constructor(config, view) {
    super();
    this.markAsExternallyManaged();
    this.#onDetach = config.onDetach;
    this.#view = view ?? DEFAULT_VIEW;
    this.#boundOnAidaAvailabilityChange = this.#onAidaAvailabilityChange.bind(this);
    this.#noLogging = Root.Runtime.hostConfig.aidaAvailability?.enterprisePolicyValue === Root.Runtime.GenAiEnterprisePolicyValue.ALLOW_WITHOUT_LOGGING;
    this.requestUpdate();
  }
  #showReminderSnackbar() {
    Snackbars.Snackbar.Snackbar.show({
      message: lockedString(UIStringsNotTranslate.turnOnCodeSuggestionsAtAnyTimeInSettings),
      actionProperties: {
        label: lockedString(UIStringsNotTranslate.manage),
        onClick: () => {
          void UI2.ViewManager.ViewManager.instance().showView("chrome-ai");
        }
      },
      closable: true
    });
  }
  async #onAidaAvailabilityChange() {
    const currentAidaAvailability = await Host.AidaClient.AidaClient.checkAccessPreconditions();
    if (currentAidaAvailability !== this.#aidaAvailability) {
      this.#aidaAvailability = currentAidaAvailability;
      this.requestUpdate();
    }
  }
  onAction = async (event) => {
    event.preventDefault();
    const result = await FreDialog.show({
      header: { iconName: "smart-assistant", text: lockedString(UIStringsNotTranslate.freDisclaimerHeader) },
      reminderItems: [
        {
          iconName: "psychiatry",
          content: lockedString(UIStringsNotTranslate.freDisclaimerTextAiWontAlwaysGetItRight)
        },
        {
          iconName: "google",
          content: this.#noLogging ? lockedString(UIStringsNotTranslate.freDisclaimerTextPrivacyNoLogging) : lockedString(UIStringsNotTranslate.freDisclaimerTextPrivacy)
        },
        {
          iconName: "warning",
          // clang-format off
          content: html2`<x-link
            href=${CODE_SNIPPET_WARNING_URL}
            class="link devtools-link"
            jslog=${VisualLogging.link("code-snippets-explainer.ai-code-completion-teaser").track({
            click: true
          })}
          >${lockedString(UIStringsNotTranslate.freDisclaimerTextUseWithCaution)}</x-link>`
          // clang-format on
        }
      ],
      onLearnMoreClick: () => {
        void UI2.ViewManager.ViewManager.instance().showView("chrome-ai");
      },
      ariaLabel: lockedString(UIStringsNotTranslate.freDisclaimerHeader),
      learnMoreButtonAriaLabel: lockedString(UIStringsNotTranslate.learnMore)
    });
    if (result) {
      this.#aiCodeCompletionFreCompletedSetting.set(true);
      this.detach();
    } else {
      this.requestUpdate();
    }
  };
  onDismiss = (event) => {
    event.preventDefault();
    this.#aiCodeCompletionTeaserDismissedSetting.set(true);
    this.#showReminderSnackbar();
    this.detach();
  };
  performUpdate() {
    const output = {};
    this.#view({
      aidaAvailability: this.#aidaAvailability,
      onAction: this.onAction,
      onDismiss: this.onDismiss
    }, output, this.contentElement);
  }
  wasShown() {
    super.wasShown();
    Host.AidaClient.HostConfigTracker.instance().addEventListener("aidaAvailabilityChanged", this.#boundOnAidaAvailabilityChange);
    void this.#onAidaAvailabilityChange();
  }
  willHide() {
    super.willHide();
    Host.AidaClient.HostConfigTracker.instance().removeEventListener("aidaAvailabilityChanged", this.#boundOnAidaAvailabilityChange);
  }
  onDetach() {
    this.#onDetach();
  }
};

// gen/front_end/panels/common/AiCodeCompletionDisclaimer.js
import "./../../ui/components/spinners/spinners.js";
import "./../../ui/components/tooltips/tooltips.js";
import * as i18n5 from "./../../core/i18n/i18n.js";
import * as Root2 from "./../../core/root/root.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
import { Directives, html as html3, nothing as nothing2, render as render3 } from "./../../ui/lit/lit.js";
import * as VisualLogging2 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/common/aiCodeCompletionDisclaimer.css.js
var aiCodeCompletionDisclaimer_css_default = `/*
 * Copyright 2025 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

@scope to (devtools-widget > *) {
    /* stylelint-disable-next-line no-invalid-position-declaration */
    display: flex;

    .ai-code-completion-disclaimer {
        gap: 5px;
        display: flex;
        flex-shrink: 0;

        span.link {
            color: var(--sys-color-on-surface-subtle);

            &:focus-visible {
                outline: var(--sys-size-2) solid var(--sys-color-state-focus-ring);
                outline-offset: 0;
                border-radius: var(--sys-shape-corner-extra-small);
            }
        }

        devtools-spinner {
            margin-top: var(--sys-size-2);
            padding: var(--sys-size-1);
            height: var(--sys-size-6);
            width: var(--sys-size-6);
        }

        devtools-tooltip:popover-open {
            display: flex;
            flex-direction: column;
            align-items: center;

            .disclaimer-tooltip-container {
                padding: var(--sys-size-4) 0;
                max-width: var(--sys-size-30);
                white-space: normal;

                .tooltip-text {
                    color: var(--sys-color-on-surface-subtle);
                    padding: 0 var(--sys-size-5);
                    align-items: flex-start;
                    gap: 10px;
                }

                .link {
                    margin: var(--sys-size-5) var(--sys-size-8) 0 var(--sys-size-5);
                    display: inline-block;
                }
            }
        }
    }
}

/*# sourceURL=${import.meta.resolve("./aiCodeCompletionDisclaimer.css")} */`;

// gen/front_end/panels/common/AiCodeCompletionDisclaimer.js
var UIStringsNotTranslate2 = {
  /**
   * @description Disclaimer text for AI code completion
   */
  relevantData: "Relevant data",
  /**
   * @description Disclaimer text for AI code completion
   */
  isSentToGoogle: "is sent to Google",
  /**
   * @description Text for tooltip shown on hovering over "Relevant Data" in the disclaimer text for AI code completion.
   */
  tooltipDisclaimerTextForAiCodeCompletion: "To generate code suggestions, your console input and the history of your current console session are shared with Google. This data may be seen by human reviewers to improve this feature.",
  /**
   * @description Text for tooltip shown on hovering over "Relevant Data" in the disclaimer text for AI code completion.
   */
  tooltipDisclaimerTextForAiCodeCompletionNoLogging: "To generate code suggestions, your console input and the history of your current console session are shared with Google. This data will not be used to improve Google\u2019s AI models.",
  /**
   * @description Text for tooltip button which redirects to AI settings
   */
  manageInSettings: "Manage in settings",
  /**
   *@description Text announced when request is sent to AIDA and the spinner is loading
   */
  dataIsBeingSentToGoogle: "Data is being sent to Google"
};
var lockedString2 = i18n5.i18n.lockedString;
var DEFAULT_SUMMARY_TOOLBAR_VIEW = (input, output, target) => {
  if (!input.disclaimerTooltipId) {
    render3(nothing2, target);
    return;
  }
  render3(html3`
        <style>${aiCodeCompletionDisclaimer_css_default}</style>
        <div class="ai-code-completion-disclaimer"><devtools-spinner
          .active=${false}
          ${Directives.ref((el) => {
    if (el instanceof HTMLElement) {
      output.setLoading = (isLoading) => {
        el.toggleAttribute("active", isLoading);
      };
    }
  })}></devtools-spinner>
          <span
              tabIndex="0"
              class="link"
              role="link"
              jslog=${VisualLogging2.link("open-ai-settings").track({
    click: true
  })}
              aria-details=${input.disclaimerTooltipId}
              aria-describedby=${input.disclaimerTooltipId}
              @click=${() => {
    void UI3.ViewManager.ViewManager.instance().showView("chrome-ai");
  }}
          >${lockedString2(UIStringsNotTranslate2.relevantData)}</span>${lockedString2(UIStringsNotTranslate2.isSentToGoogle)}
          <devtools-tooltip
              id=${input.disclaimerTooltipId}
              variant=${"rich"}
              jslogContext=${"ai-code-completion-disclaimer"}
              ${Directives.ref((el) => {
    if (el instanceof HTMLElement) {
      output.hideTooltip = () => {
        el.hidePopover();
      };
    }
  })}>
            <div class="disclaimer-tooltip-container"><div class="tooltip-text">
                ${input.noLogging ? lockedString2(UIStringsNotTranslate2.tooltipDisclaimerTextForAiCodeCompletionNoLogging) : lockedString2(UIStringsNotTranslate2.tooltipDisclaimerTextForAiCodeCompletion)}
                </div>
                <span
                    class="link"
                    role="link"
                    jslog=${VisualLogging2.link("open-ai-settings").track({
    click: true
  })}
                    @click=${input.onManageInSettingsTooltipClick}
                >${lockedString2(UIStringsNotTranslate2.manageInSettings)}</span></div></devtools-tooltip>
          </div>
        `, target);
};
var MINIMUM_LOADING_STATE_TIMEOUT = 1e3;
var AiCodeCompletionDisclaimer = class extends UI3.Widget.Widget {
  #view;
  #viewOutput = {};
  #disclaimerTooltipId;
  #noLogging;
  // Whether the enterprise setting is `ALLOW_WITHOUT_LOGGING` or not.
  #loading = false;
  #loadingStartTime = 0;
  #spinnerLoadingTimeout;
  constructor(element, view = DEFAULT_SUMMARY_TOOLBAR_VIEW) {
    super(element);
    this.markAsExternallyManaged();
    this.#noLogging = Root2.Runtime.hostConfig.aidaAvailability?.enterprisePolicyValue === Root2.Runtime.GenAiEnterprisePolicyValue.ALLOW_WITHOUT_LOGGING;
    this.#view = view;
  }
  set disclaimerTooltipId(disclaimerTooltipId) {
    this.#disclaimerTooltipId = disclaimerTooltipId;
    this.requestUpdate();
  }
  set loading(loading) {
    if (!loading && !this.#loading) {
      return;
    }
    if (loading) {
      if (!this.#loading) {
        this.#viewOutput.setLoading?.(true);
        UI3.ARIAUtils.LiveAnnouncer.status(lockedString2(UIStringsNotTranslate2.dataIsBeingSentToGoogle));
      }
      if (this.#spinnerLoadingTimeout) {
        clearTimeout(this.#spinnerLoadingTimeout);
        this.#spinnerLoadingTimeout = void 0;
      }
      this.#loadingStartTime = performance.now();
      this.#loading = true;
    } else {
      this.#loading = false;
      const duration = performance.now() - this.#loadingStartTime;
      const remainingTime = Math.max(MINIMUM_LOADING_STATE_TIMEOUT - duration, 0);
      this.#spinnerLoadingTimeout = window.setTimeout(() => {
        this.#viewOutput.setLoading?.(false);
        this.#spinnerLoadingTimeout = void 0;
      }, remainingTime);
    }
  }
  #onManageInSettingsTooltipClick() {
    this.#viewOutput.hideTooltip?.();
    void UI3.ViewManager.ViewManager.instance().showView("chrome-ai");
  }
  performUpdate() {
    this.#view({
      disclaimerTooltipId: this.#disclaimerTooltipId,
      noLogging: this.#noLogging,
      onManageInSettingsTooltipClick: this.#onManageInSettingsTooltipClick.bind(this)
    }, this.#viewOutput, this.contentElement);
  }
};

// gen/front_end/panels/common/AiCodeCompletionSummaryToolbar.js
import "./../../ui/components/spinners/spinners.js";
import "./../../ui/components/tooltips/tooltips.js";
import * as i18n7 from "./../../core/i18n/i18n.js";
import * as UI4 from "./../../ui/legacy/legacy.js";
import { Directives as Directives2, html as html4, nothing as nothing3, render as render4 } from "./../../ui/lit/lit.js";
import * as VisualLogging3 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/common/aiCodeCompletionSummaryToolbar.css.js
var aiCodeCompletionSummaryToolbar_css_default = `/*
 * Copyright 2025 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

@scope to (devtools-widget > *) {
  .ai-code-completion-summary-toolbar {
    display: flex;
    height: 26px;
    background-color: var(--sys-color-cdt-base-container);
    padding: var(--sys-size-2) var(--sys-size-5);
    align-items: center;
    gap: var(--sys-size-5);
    flex-shrink: 0;
    color: var(--sys-color-on-surface-subtle);

    &:not(.has-top-border) {
      border-top: var(--sys-size-1) solid var(--sys-color-divider);
    }

    devtools-widget.disclaimer-widget {
      flex: none;
    }

    span.link {
      color: var(--sys-color-on-surface-subtle);
      /* Inside the code mirror editor, the cursor and text-decoration styling need to be provided explicitly */
      cursor: pointer;
      text-decoration: underline;

      &:focus-visible {
        outline: var(--sys-size-2) solid var(--sys-color-state-focus-ring);
        outline-offset: 0;
        border-radius: var(--sys-shape-corner-extra-small);
      }
    }

    .ai-code-completion-recitation-notice {
      white-space: nowrap;

      span.link {
        padding-left: var(--sys-size-3);
      }
    }

    &.has-disclaimer .ai-code-completion-recitation-notice {
      padding-left: var(--sys-size-5);
      border-left: var(--sys-size-1) solid var(--sys-color-divider);
    }

    @media (width < 545px) {
      &.has-disclaimer.has-recitation-notice {
        height: 46px;
        flex-direction: column;
        align-items: flex-start;

        .ai-code-completion-disclaimer {
          height: 26px;
          margin-bottom: -3px;
          margin-top: var(--sys-size-2);
          flex-shrink: 1;
        }

        .ai-code-completion-recitation-notice {
          height: 26px;
          padding-left: 0;
          border-left: 0;
          margin-top: -3px;
        }
      }
    }

    devtools-tooltip:popover-open {
        display: flex;
        flex-direction: column;
        align-items: center;

        .citations-tooltip-container {
            display: inline-flex;
            padding: var(--sys-size-4) var(--sys-size-5);
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: var(--sys-size-2);
            white-space: normal;

            x-link {
                color: var(--sys-color-primary);
                text-decoration: underline;

              &:focus-visible {
                outline: var(--sys-size-2) solid var(--sys-color-state-focus-ring);
                outline-offset: 0;
                border-radius: var(--sys-shape-corner-extra-small);
              }
          }
      }
    }
  }
}

/*# sourceURL=${import.meta.resolve("./aiCodeCompletionSummaryToolbar.css")} */`;

// gen/front_end/panels/common/AiCodeCompletionSummaryToolbar.js
var UIStringsNotTranslate3 = {
  /**
   * @description Text for recitation notice
   */
  generatedCodeMayBeSubjectToALicense: "Generated code may be subject to a license.",
  /**
   * @description Text for citations
   */
  viewSources: "View Sources"
};
var lockedString3 = i18n7.i18n.lockedString;
var DEFAULT_SUMMARY_TOOLBAR_VIEW2 = (input, _output, target) => {
  const toolbarClasses = Directives2.classMap({
    "ai-code-completion-summary-toolbar": true,
    "has-disclaimer": Boolean(input.disclaimerTooltipId),
    "has-recitation-notice": Boolean(input.citations && input.citations.size > 0),
    "has-top-border": input.hasTopBorder
  });
  const disclaimer = input.disclaimerTooltipId ? html4`<devtools-widget
            .widgetConfig=${UI4.Widget.widgetConfig(AiCodeCompletionDisclaimer, {
    disclaimerTooltipId: input.disclaimerTooltipId,
    loading: input.loading
  })} class="disclaimer-widget"></devtools-widget>` : nothing3;
  const recitationNotice = input.citations && input.citations.size > 0 ? html4`<div class="ai-code-completion-recitation-notice">
                ${lockedString3(UIStringsNotTranslate3.generatedCodeMayBeSubjectToALicense)}
                <span class="link"
                    role="link"
                    aria-details=${input.citationsTooltipId}
                    aria-describedby=${input.citationsTooltipId}
                    tabIndex="0">
                  ${lockedString3(UIStringsNotTranslate3.viewSources)}&nbsp;${lockedString3("(" + input.citations.size + ")")}
                </span>
                <devtools-tooltip
                    id=${input.citationsTooltipId}
                    variant=${"rich"}
                    jslogContext=${"ai-code-completion-citations"}
                ><div class="citations-tooltip-container">
                    ${Directives2.repeat(input.citations, (citation) => html4`<x-link
                        tabIndex="0"
                        href=${citation}
                        jslog=${VisualLogging3.link("ai-code-completion-citations.citation-link").track({
    click: true
  })}>${citation}</x-link>`)}</div></devtools-tooltip>
            </div>` : nothing3;
  render4(html4`
        <style>${aiCodeCompletionSummaryToolbar_css_default}</style>
        <div class=${toolbarClasses}>
          ${disclaimer}
          ${recitationNotice}
        </div>
        `, target);
};
var AiCodeCompletionSummaryToolbar = class extends UI4.Widget.Widget {
  #view;
  #disclaimerTooltipId;
  #citationsTooltipId;
  #citations = /* @__PURE__ */ new Set();
  #loading = false;
  #hasTopBorder = false;
  constructor(props, view) {
    super();
    this.#disclaimerTooltipId = props.disclaimerTooltipId;
    this.#citationsTooltipId = props.citationsTooltipId;
    this.#hasTopBorder = props.hasTopBorder ?? false;
    this.#view = view ?? DEFAULT_SUMMARY_TOOLBAR_VIEW2;
    this.requestUpdate();
  }
  setLoading(loading) {
    this.#loading = loading;
    this.requestUpdate();
  }
  updateCitations(citations) {
    citations.forEach((citation) => this.#citations.add(citation));
    this.requestUpdate();
  }
  clearCitations() {
    this.#citations.clear();
    this.requestUpdate();
  }
  performUpdate() {
    this.#view({
      disclaimerTooltipId: this.#disclaimerTooltipId,
      citations: this.#citations,
      citationsTooltipId: this.#citationsTooltipId,
      loading: this.#loading,
      hasTopBorder: this.#hasTopBorder
    }, void 0, this.contentElement);
  }
};

// gen/front_end/panels/common/common.prebundle.js
var UIStrings2 = {
  /**
   * @description Text for the cancel button in the dialog.
   */
  cancel: "Cancel",
  /**
   * @description Text for the allow button in the "type to allow" dialog.
   */
  allow: "Allow"
};
var str_2 = i18n9.i18n.registerUIStrings("panels/common/common.ts", UIStrings2);
var i18nString2 = i18n9.i18n.getLocalizedString.bind(void 0, str_2);
var TypeToAllowDialog = class {
  static async show(options) {
    const dialog = new UI5.Dialog.Dialog(options.jslogContext.dialog);
    dialog.setMaxContentSize(new UI5.Geometry.Size(504, 340));
    dialog.setSizeBehavior(
      "SetExactWidthMaxHeight"
      /* UI.GlassPane.SizeBehavior.SET_EXACT_WIDTH_MAX_HEIGHT */
    );
    dialog.setDimmed(true);
    const shadowRoot = UI5.UIUtils.createShadowRootWithCoreStyles(dialog.contentElement, { cssFile: common_css_default });
    const content = shadowRoot.createChild("div", "type-to-allow-dialog");
    const result = await new Promise((resolve) => {
      const header = content.createChild("div", "header");
      header.createChild("div", "title").textContent = options.header;
      const closeButton = header.createChild("dt-close-button", "dialog-close-button");
      closeButton.setTabbable(true);
      self.onInvokeElement(closeButton, (event) => {
        dialog.hide();
        event.consume(true);
        resolve(false);
      });
      closeButton.setSize(
        "SMALL"
        /* Buttons.Button.Size.SMALL */
      );
      content.createChild("div", "message").textContent = options.message;
      const input = UI5.UIUtils.createInput("text-input", "text", options.jslogContext.input);
      input.placeholder = options.inputPlaceholder;
      content.appendChild(input);
      const buttonsBar = content.createChild("div", "button");
      const cancelButton = UI5.UIUtils.createTextButton(i18nString2(UIStrings2.cancel), () => resolve(false), { jslogContext: "cancel" });
      const allowButton = UI5.UIUtils.createTextButton(i18nString2(UIStrings2.allow), () => {
        resolve(input.value === options.typePhrase);
      }, {
        jslogContext: "confirm",
        variant: "primary"
        /* Buttons.Button.Variant.PRIMARY */
      });
      allowButton.disabled = true;
      buttonsBar.appendChild(allowButton);
      buttonsBar.appendChild(cancelButton);
      input.addEventListener("input", () => {
        allowButton.disabled = !Boolean(input.value);
      }, false);
      input.addEventListener("paste", (e) => e.preventDefault());
      input.addEventListener("drop", (e) => e.preventDefault());
      dialog.setOutsideClickCallback((event) => {
        event.consume();
        resolve(false);
      });
      dialog.show();
      Host2.userMetrics.actionTaken(Host2.UserMetrics.Action.SelfXssWarningDialogShown);
    });
    dialog.hide();
    return result;
  }
};
export {
  AiCodeCompletionDisclaimer,
  AiCodeCompletionSummaryToolbar,
  AiCodeCompletionTeaser,
  FreDialog,
  TypeToAllowDialog
};
//# sourceMappingURL=common.js.map
