// gen/front_end/panels/common/common.prebundle.js
import * as Host6 from "./../../core/host/host.js";
import * as i18n13 from "./../../core/i18n/i18n.js";
import * as Geometry2 from "./../../models/geometry/geometry.js";
import * as Buttons4 from "./../../ui/components/buttons/buttons.js";
import * as UI7 from "./../../ui/legacy/legacy.js";

// gen/front_end/panels/common/common.css.js
var common_css_default = `/*
 * Copyright 2025 The Chromium Authors
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
 * Copyright 2025 The Chromium Authors
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
        line-height: var(--sys-size-7);
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

        .new-badge {
            font-style: normal;
            display: inline-block;
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
 * Copyright 2025 The Chromium Authors
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
  static show({ header, reminderItems, onLearnMoreClick, ariaLabel, learnMoreButtonText, learnMoreButtonAriaLabel }) {
    const dialog2 = new UI.Dialog.Dialog();
    if (ariaLabel) {
      dialog2.setAriaLabel(ariaLabel);
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
            .title=${learnMoreButtonAriaLabel ?? i18nString(UIStrings.learnMore)}
            aria-label=${ifDefined(learnMoreButtonAriaLabel)}>
            ${learnMoreButtonText ?? i18nString(UIStrings.learnMore)}
          </devtools-button>
          <div class="right-buttons">
            <devtools-button
              @click=${() => {
      result.resolve(false);
      dialog2.hide();
    }}
              .jslogContext=${"fre-disclaimer.cancel"}
              .variant=${"tonal"}>
              ${i18nString(UIStrings.cancel)}
            </devtools-button>
            <devtools-button
              @click=${() => {
      result.resolve(true);
      dialog2.hide();
    }}
              .jslogContext=${"fre-disclaimer.continue"}
              .variant=${"primary"}>
              ${i18nString(UIStrings.gotIt)}
            </devtools-button>
          </div>
        </footer>
      </div>`, dialog2.contentElement);
    dialog2.setOutsideClickCallback((ev) => {
      ev.consume(true);
      dialog2.hide();
      result.resolve(false);
    });
    dialog2.setOnHideCallback(() => {
      result.resolve(false);
    });
    dialog2.setSizeBehavior(
      "MeasureContent"
      /* UI.GlassPane.SizeBehavior.MEASURE_CONTENT */
    );
    dialog2.setDimmed(true);
    dialog2.show();
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
var PROMOTION_ID = "ai-code-completion";
var DEFAULT_VIEW = (input, _output, target) => {
  if (input.aidaAvailability !== "available") {
    render2(nothing, target);
    return;
  }
  const cmdOrCtrl = Host.Platform.isMac() ? lockedString(UIStringsNotTranslate.cmd) : lockedString(UIStringsNotTranslate.ctrl);
  const teaserAriaLabel = lockedString(UIStringsNotTranslate.press) + " " + cmdOrCtrl + " " + lockedString(UIStringsNotTranslate.i) + " " + lockedString(UIStringsNotTranslate.toTurnOnCodeSuggestions) + " " + lockedString(UIStringsNotTranslate.press) + " " + cmdOrCtrl + " " + lockedString(UIStringsNotTranslate.x) + " " + lockedString(UIStringsNotTranslate.toDisableCodeSuggestions);
  const newBadge = UI2.UIUtils.maybeCreateNewBadge(PROMOTION_ID);
  const newBadgeTemplate = newBadge ? html2`&nbsp;${newBadge}` : nothing;
  render2(html2`
          <style>${aiCodeCompletionTeaser_css_default}</style>
          <style>@scope to (devtools-widget > *) { ${UI2.inspectorCommonStyles} }</style>
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
            ${newBadgeTemplate}
          </div>
        `, target);
};
var AiCodeCompletionTeaser = class extends UI2.Widget.Widget {
  #view;
  #aidaAvailability;
  #boundOnAidaAvailabilityChange;
  #boundOnAiCodeCompletionSettingChanged;
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
    this.#boundOnAiCodeCompletionSettingChanged = this.#onAiCodeCompletionSettingChanged.bind(this);
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
  #onAiCodeCompletionSettingChanged() {
    if (this.#aiCodeCompletionFreCompletedSetting.get() || this.#aiCodeCompletionTeaserDismissedSetting.get()) {
      this.detach();
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
    this.#aiCodeCompletionFreCompletedSetting.addChangeListener(this.#boundOnAiCodeCompletionSettingChanged);
    this.#aiCodeCompletionTeaserDismissedSetting.addChangeListener(this.#boundOnAiCodeCompletionSettingChanged);
    void this.#onAidaAvailabilityChange();
  }
  willHide() {
    super.willHide();
    Host.AidaClient.HostConfigTracker.instance().removeEventListener("aidaAvailabilityChanged", this.#boundOnAidaAvailabilityChange);
    this.#aiCodeCompletionFreCompletedSetting.removeChangeListener(this.#boundOnAiCodeCompletionSettingChanged);
    this.#aiCodeCompletionTeaserDismissedSetting.removeChangeListener(this.#boundOnAiCodeCompletionSettingChanged);
  }
  onDetach() {
    this.#onDetach();
  }
};

// gen/front_end/panels/common/GdpSignUpDialog.js
import "./../../ui/components/switch/switch.js";
import * as Common2 from "./../../core/common/common.js";
import * as Host2 from "./../../core/host/host.js";
import * as i18n5 from "./../../core/i18n/i18n.js";
import * as Badges from "./../../models/badges/badges.js";
import * as Geometry from "./../../models/geometry/geometry.js";
import * as Buttons2 from "./../../ui/components/buttons/buttons.js";
import * as Snackbars2 from "./../../ui/components/snackbars/snackbars.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
import { html as html3, render as render3 } from "./../../ui/lit/lit.js";

// gen/front_end/panels/common/gdpSignUpDialog.css.js
var gdpSignUpDialog_css_default = `/*
 * Copyright 2025 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

@scope to (devtools-widget > *) {
    :scope {
        width: 100%;
        box-shadow: none;
        padding: var(--sys-size-8);
    }

    .gdp-sign-up-dialog-header {
        background-image: var(--image-file-gdp-logo-light);
        height: 20px;
        background-repeat: no-repeat;
        background-size: contain;
        margin: 0;

        &:focus-visible {
            outline: 2px solid var(--sys-color-state-focus-ring);
        }
    }

    :host-context(.theme-with-dark-background) & .gdp-sign-up-dialog-header {
        background-image: var(--image-file-gdp-logo-dark);
    }

    .main-content {
        display: flex;
        flex-direction: column;
        margin: var(--sys-size-6) 0;
        gap: var(--sys-size-3);
    }

    .section {
        display: flex;
        gap: var(--sys-size-6);
        padding: 12px 16px 12px 12px;
        background-color: var(--sys-color-surface4);
        align-self: stretch;
    }

    .icon-container {
        flex-shrink: 0;
    }

    .section:first-child {
        border-top-left-radius: var(--sys-shape-corner-medium-small);
        border-top-right-radius: var(--sys-shape-corner-medium-small);
    }

    .section:last-child {
        border-bottom-left-radius: var(--sys-shape-corner-medium-small);
        border-bottom-right-radius: var(--sys-shape-corner-medium-small);
    }

    .section .icon-container devtools-icon {
        width: var(--sys-size-8);
        height: var(--sys-size-8);
    }

    .text-container {
        display: flex;
        flex-direction: column;
    }

    .section-title {
        margin: 0;
        font: var(--sys-typescale-body4-medium);
        color: var(--sys-color-on-surface);
    }

    .section-text {
        font: var(--sys-typescale-body4-regular);
        color: var(--sys-color-on-surface-subtle);
        line-height: 18px;
    }

    .switch-container {
        display: flex;
        align-items: center;
        flex-shrink: 0;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .right-buttons {
        display: flex;
        gap: var(--sys-size-5);
    }
}

/*# sourceURL=${import.meta.resolve("./gdpSignUpDialog.css")} */`;

// gen/front_end/panels/common/GdpSignUpDialog.js
var UIStrings2 = {
  /**
   * @description Aria label for the Google Developer Program sign up dialog
   */
  gdpDialogAriaLabel: "Google Developer Program sign up dialog",
  /**
   *
   * @description Button text for canceling GDP sign up.
   */
  cancel: "Cancel",
  /**
   * @description Button text for confirming GDP sign up.
   */
  signUp: "Sign up",
  /**
   * @description Title for the first section of the GDP sign up dialog.
   */
  designedForSuccess: "Designed for your success",
  /**
   * @description Body for the first section of the GDP sign up dialog.
   */
  designedForSuccessBody: "Grow your skills, build with AI, and earn badges you can showcase in your developer profile",
  /**
   * @description Title for the second section of the GDP sign up dialog.
   */
  keepUpdated: "Keep me updated",
  /**
   * @description Body for the second section of the GDP sign up dialog.
   */
  keepUpdatedBody: "The latest DevTools features, event invites, and tailored insights land directly in your inbox",
  /**
   * @description Title for the third section of the GDP sign up dialog.
   */
  tailorProfile: "Tailor your profile",
  /**
   * @description Body for the third section of the GDP sign up dialog.
   */
  tailorProfileBody: "The name on your Google Account and your interests will be used in your Google Developer Profile. Your name may appear where you contribute and can be changed at any time.",
  /**
   * @description Body for the third section of the GDP sign up dialog.
   * @example {Content Policy} PH1
   * @example {Terms of Service} PH2
   * @example {Privacy Policy} PH3
   */
  tailorProfileBodyDisclaimer: "By creating a Developer Profile, you agree to the\xA0{PH1}. Google\u2019s\xA0{PH2}\xA0and\xA0{PH3}\xA0apply to your use of this service.",
  /**
   * @description Button text for learning more about the Google Developer Program.
   */
  learnMore: "Learn more",
  /**
   * @description Accessible text for learning more about the Google Developer Program.
   */
  learnMoreAccessibleText: "Learn more about the Google Developer Program",
  /**
   * @description Link text for Content Policy.
   */
  contentPolicy: "Content Policy",
  /**
   * @description Link text for Terms of Service.
   */
  termsOfService: "Terms of Service",
  /**
   * @description Link text for Privacy Policy.
   */
  privacyPolicy: "Privacy Policy",
  /**
   * @description Error message shown in a snackbar when GDP sign up fails.
   */
  signUpFailed: "Your Google Developer Program profile couldn\u2019t be created. Please try again later."
};
var str_2 = i18n5.i18n.registerUIStrings("panels/common/GdpSignUpDialog.ts", UIStrings2);
var i18nString2 = i18n5.i18n.getLocalizedString.bind(void 0, str_2);
var TERMS_OF_SERVICE_URL = "https://policies.google.com/terms";
var PRIVACY_POLICY_URL = "https://policies.google.com/privacy";
var CONTENT_POLICY_URL = "https://developers.google.com/profile/content-policy";
var GDP_PROGRAM_URL = "https://developers.google.com/program";
var DEFAULT_VIEW2 = (input, _output, target) => {
  render3(html3`
      <style>${gdpSignUpDialog_css_default}</style>
      <div class="gdp-sign-up-dialog-header" role="img" aria-label="Google Developer Program"></div>
      <div class="main-content">
        <div class="section">
          <div class="icon-container">
            <devtools-icon name="trophy"></devtools-icon>
          </div>
          <div class="text-container">
            <h2 class="section-title">${i18nString2(UIStrings2.designedForSuccess)}</h2>
            <div class="section-text">${i18nString2(UIStrings2.designedForSuccessBody)}</div>
          </div>
        </div>
        <div class="section">
          <div class="icon-container">
            <devtools-icon name="mark-email-unread"></devtools-icon>
          </div>
          <div class="text-container">
            <h2 class="section-title">${i18nString2(UIStrings2.keepUpdated)}</h2>
            <div class="section-text">${i18nString2(UIStrings2.keepUpdatedBody)}</div>
          </div>
          <div class="switch-container">
            <devtools-switch
            .checked=${input.keepMeUpdated}
            .jslogContext=${"keep-me-updated"}
            .label=${i18nString2(UIStrings2.keepUpdated)}
            @switchchange=${(e) => input.onKeepMeUpdatedChange(e.checked)}
          >
            </devtools-switch>
          </div>
          </div>
        <div class="section">
          <div class="icon-container">
            <devtools-icon name="google"></devtools-icon>
          </div>
          <div class="text-container">
            <h2 class="section-title">${i18nString2(UIStrings2.tailorProfile)}</h2>
            <div class="section-text">
              <div>${i18nString2(UIStrings2.tailorProfileBody)}</div><br/>
              <div>${i18n5.i18n.getFormatLocalizedString(str_2, UIStrings2.tailorProfileBodyDisclaimer, {
    PH1: UI3.XLink.XLink.create(CONTENT_POLICY_URL, i18nString2(UIStrings2.contentPolicy), "link", void 0, "content-policy"),
    PH2: UI3.XLink.XLink.create(TERMS_OF_SERVICE_URL, i18nString2(UIStrings2.termsOfService), "link", void 0, "terms-of-service"),
    PH3: UI3.XLink.XLink.create(PRIVACY_POLICY_URL, i18nString2(UIStrings2.privacyPolicy), "link", void 0, "privacy-policy")
  })}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <devtools-button
          aria-label=${i18nString2(UIStrings2.learnMoreAccessibleText)}
          .title=${i18nString2(UIStrings2.learnMoreAccessibleText)}
          .variant=${"outlined"}
          .jslogContext=${"learn-more"}
          @click=${() => UI3.UIUtils.openInNewTab(GDP_PROGRAM_URL)}>${i18nString2(UIStrings2.learnMore)}</devtools-button>
        <div class="right-buttons">
          <devtools-button
            .variant=${"tonal"}
            .jslogContext=${"cancel"}
            @click=${input.onCancelClick}>${i18nString2(UIStrings2.cancel)}</devtools-button>
          <devtools-button
            .variant=${"primary"}
            .jslogContext=${"sign-up"}
            .spinner=${input.isSigningUp}
            .disabled=${input.isSigningUp}
            @click=${input.onSignUpClick}>${i18nString2(UIStrings2.signUp)}</devtools-button>
        </div>
      </div>
    `, target);
};
var GdpSignUpDialog = class _GdpSignUpDialog extends UI3.Widget.VBox {
  #view;
  #dialog;
  #keepMeUpdated = false;
  #isSigningUp = false;
  #onSuccess;
  #onCancel;
  constructor(options, view) {
    super();
    this.#dialog = options.dialog;
    this.#onSuccess = options.onSuccess;
    this.#onCancel = options.onCancel;
    this.#view = view ?? DEFAULT_VIEW2;
    this.requestUpdate();
  }
  async #onSignUpClick() {
    this.#isSigningUp = true;
    this.requestUpdate();
    const syncInfo = await new Promise((resolve) => Host2.InspectorFrontendHost.InspectorFrontendHostInstance.getSyncInformation(resolve));
    const user = syncInfo.accountFullName ?? "";
    const emailPreference = this.#keepMeUpdated ? Host2.GdpClient.EmailPreference.ENABLED : Host2.GdpClient.EmailPreference.DISABLED;
    const result = await Host2.GdpClient.GdpClient.instance().createProfile({ user, emailPreference });
    if (result) {
      Common2.Settings.Settings.instance().moduleSetting("receive-gdp-badges").set(true);
      await Badges.UserBadges.instance().initialize();
      Badges.UserBadges.instance().recordAction(Badges.BadgeAction.GDP_SIGN_UP_COMPLETE);
      this.#onSuccess?.();
      this.#dialog.hide();
    } else {
      Snackbars2.Snackbar.Snackbar.show({ message: i18nString2(UIStrings2.signUpFailed) }, this.#dialog.contentElement);
      this.#isSigningUp = false;
      this.requestUpdate();
    }
  }
  performUpdate() {
    const viewInput = {
      onSignUpClick: this.#onSignUpClick.bind(this),
      onCancelClick: () => {
        this.#dialog.hide();
        this.#onCancel?.();
      },
      keepMeUpdated: this.#keepMeUpdated,
      onKeepMeUpdatedChange: (value) => {
        this.#keepMeUpdated = value;
        this.requestUpdate();
      },
      isSigningUp: this.#isSigningUp
    };
    this.#view(viewInput, void 0, this.contentElement);
  }
  static show({ onSuccess, onCancel } = {}) {
    const dialog2 = new UI3.Dialog.Dialog("gdp-sign-up-dialog");
    dialog2.setAriaLabel(i18nString2(UIStrings2.gdpDialogAriaLabel));
    dialog2.setMaxContentSize(new Geometry.Size(384, 500));
    dialog2.setSizeBehavior(
      "SetExactWidthMaxHeight"
      /* UI.GlassPane.SizeBehavior.SET_EXACT_WIDTH_MAX_HEIGHT */
    );
    dialog2.setDimmed(true);
    new _GdpSignUpDialog({ dialog: dialog2, onSuccess, onCancel }).show(dialog2.contentElement);
    dialog2.show(
      void 0,
      /* stack */
      true
    );
  }
};

// gen/front_end/panels/common/AiCodeCompletionDisclaimer.js
import "./../../ui/components/spinners/spinners.js";
import "./../../ui/components/tooltips/tooltips.js";
import * as Host3 from "./../../core/host/host.js";
import * as i18n7 from "./../../core/i18n/i18n.js";
import * as Root2 from "./../../core/root/root.js";
import * as UI4 from "./../../ui/legacy/legacy.js";
import { Directives, html as html4, nothing as nothing2, render as render4 } from "./../../ui/lit/lit.js";
import * as VisualLogging2 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/common/aiCodeCompletionDisclaimer.css.js
var aiCodeCompletionDisclaimer_css_default = `/*
 * Copyright 2025 The Chromium Authors
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
   * Text for tooltip shown on hovering over spinner.
   */
  tooltipTextForSpinner: "Shows when data is being sent to Google to generate code suggestions",
  /**
   * @description Text for tooltip button which redirects to AI settings
   */
  manageInSettings: "Manage in settings",
  /**
   *@description Text announced when request is sent to AIDA and the spinner is loading
   */
  dataIsBeingSentToGoogle: "Data is being sent to Google"
};
var lockedString2 = i18n7.i18n.lockedString;
var DEFAULT_SUMMARY_TOOLBAR_VIEW = (input, output, target) => {
  if (input.aidaAvailability !== "available" || !input.disclaimerTooltipId || !input.spinnerTooltipId) {
    render4(nothing2, target);
    return;
  }
  render4(html4`
        <style>${aiCodeCompletionDisclaimer_css_default}</style>
        <div class="ai-code-completion-disclaimer"><devtools-spinner
          .active=${false}
          ${Directives.ref((el) => {
    if (el instanceof HTMLElement) {
      output.setLoading = (isLoading) => {
        el.toggleAttribute("active", isLoading);
      };
    }
  })}
          aria-details=${input.spinnerTooltipId}
          aria-describedby=${input.spinnerTooltipId}></devtools-spinner>
          <devtools-tooltip
              id=${input.spinnerTooltipId}
              variant=${"rich"}
              jslogContext=${"ai-code-completion-spinner-tooltip"}>
          <div class="disclaimer-tooltip-container"><div class="tooltip-text">
            ${lockedString2(UIStringsNotTranslate2.tooltipTextForSpinner)}
          </div></div></devtools-tooltip>
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
    void UI4.ViewManager.ViewManager.instance().showView("chrome-ai");
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
                    tabIndex="0"
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
var AiCodeCompletionDisclaimer = class extends UI4.Widget.Widget {
  #view;
  #viewOutput = {};
  #spinnerTooltipId;
  #disclaimerTooltipId;
  #noLogging;
  // Whether the enterprise setting is `ALLOW_WITHOUT_LOGGING` or not.
  #loading = false;
  #loadingStartTime = 0;
  #spinnerLoadingTimeout;
  #aidaAvailability;
  #boundOnAidaAvailabilityChange;
  constructor(element, view = DEFAULT_SUMMARY_TOOLBAR_VIEW) {
    super(element);
    this.markAsExternallyManaged();
    this.#noLogging = Root2.Runtime.hostConfig.aidaAvailability?.enterprisePolicyValue === Root2.Runtime.GenAiEnterprisePolicyValue.ALLOW_WITHOUT_LOGGING;
    this.#boundOnAidaAvailabilityChange = this.#onAidaAvailabilityChange.bind(this);
    this.#view = view;
  }
  set disclaimerTooltipId(disclaimerTooltipId) {
    this.#disclaimerTooltipId = disclaimerTooltipId;
    this.requestUpdate();
  }
  set spinnerTooltipId(spinnerTooltipId) {
    this.#spinnerTooltipId = spinnerTooltipId;
    this.requestUpdate();
  }
  set loading(loading) {
    if (!loading && !this.#loading) {
      return;
    }
    if (loading) {
      if (!this.#loading) {
        this.#viewOutput.setLoading?.(true);
        UI4.ARIAUtils.LiveAnnouncer.status(lockedString2(UIStringsNotTranslate2.dataIsBeingSentToGoogle));
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
  async #onAidaAvailabilityChange() {
    const currentAidaAvailability = await Host3.AidaClient.AidaClient.checkAccessPreconditions();
    if (currentAidaAvailability !== this.#aidaAvailability) {
      this.#aidaAvailability = currentAidaAvailability;
      this.requestUpdate();
    }
  }
  #onManageInSettingsTooltipClick() {
    this.#viewOutput.hideTooltip?.();
    void UI4.ViewManager.ViewManager.instance().showView("chrome-ai");
  }
  performUpdate() {
    this.#view({
      disclaimerTooltipId: this.#disclaimerTooltipId,
      spinnerTooltipId: this.#spinnerTooltipId,
      noLogging: this.#noLogging,
      aidaAvailability: this.#aidaAvailability,
      onManageInSettingsTooltipClick: this.#onManageInSettingsTooltipClick.bind(this)
    }, this.#viewOutput, this.contentElement);
  }
  wasShown() {
    super.wasShown();
    Host3.AidaClient.HostConfigTracker.instance().addEventListener("aidaAvailabilityChanged", this.#boundOnAidaAvailabilityChange);
    void this.#onAidaAvailabilityChange();
  }
  willHide() {
    super.willHide();
    Host3.AidaClient.HostConfigTracker.instance().removeEventListener("aidaAvailabilityChanged", this.#boundOnAidaAvailabilityChange);
  }
};

// gen/front_end/panels/common/AiCodeCompletionSummaryToolbar.js
import "./../../ui/components/spinners/spinners.js";
import "./../../ui/components/tooltips/tooltips.js";
import * as Host4 from "./../../core/host/host.js";
import * as i18n9 from "./../../core/i18n/i18n.js";
import * as UI5 from "./../../ui/legacy/legacy.js";
import { Directives as Directives2, html as html5, nothing as nothing3, render as render5 } from "./../../ui/lit/lit.js";
import * as VisualLogging3 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/common/aiCodeCompletionSummaryToolbar.css.js
var aiCodeCompletionSummaryToolbar_css_default = `/*
 * Copyright 2025 The Chromium Authors
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
var lockedString3 = i18n9.i18n.lockedString;
var DEFAULT_SUMMARY_TOOLBAR_VIEW2 = (input, _output, target) => {
  if (input.aidaAvailability !== "available") {
    render5(nothing3, target);
    return;
  }
  const toolbarClasses = Directives2.classMap({
    "ai-code-completion-summary-toolbar": true,
    "has-disclaimer": Boolean(input.disclaimerTooltipId),
    "has-recitation-notice": Boolean(input.citations && input.citations.size > 0),
    "has-top-border": input.hasTopBorder
  });
  const disclaimer = input.disclaimerTooltipId && input.spinnerTooltipId ? html5`<devtools-widget
            .widgetConfig=${UI5.Widget.widgetConfig(AiCodeCompletionDisclaimer, {
    disclaimerTooltipId: input.disclaimerTooltipId,
    spinnerTooltipId: input.spinnerTooltipId,
    loading: input.loading
  })} class="disclaimer-widget"></devtools-widget>` : nothing3;
  const recitationNotice = input.citations && input.citations.size > 0 ? html5`<div class="ai-code-completion-recitation-notice">
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
                    ${Directives2.repeat(input.citations, (citation) => html5`<x-link
                        tabIndex="0"
                        href=${citation}
                        jslog=${VisualLogging3.link("ai-code-completion-citations.citation-link").track({
    click: true
  })}>${citation}</x-link>`)}</div></devtools-tooltip>
            </div>` : nothing3;
  render5(html5`
        <style>${aiCodeCompletionSummaryToolbar_css_default}</style>
        <div class=${toolbarClasses}>
          ${disclaimer}
          ${recitationNotice}
        </div>
        `, target);
};
var AiCodeCompletionSummaryToolbar = class extends UI5.Widget.Widget {
  #view;
  #disclaimerTooltipId;
  #spinnerTooltipId;
  #citationsTooltipId;
  #citations = /* @__PURE__ */ new Set();
  #loading = false;
  #hasTopBorder = false;
  #aidaAvailability;
  #boundOnAidaAvailabilityChange;
  constructor(props, view) {
    super();
    this.#disclaimerTooltipId = props.disclaimerTooltipId;
    this.#spinnerTooltipId = props.spinnerTooltipId;
    this.#citationsTooltipId = props.citationsTooltipId;
    this.#hasTopBorder = props.hasTopBorder ?? false;
    this.#boundOnAidaAvailabilityChange = this.#onAidaAvailabilityChange.bind(this);
    this.#view = view ?? DEFAULT_SUMMARY_TOOLBAR_VIEW2;
    this.requestUpdate();
  }
  async #onAidaAvailabilityChange() {
    const currentAidaAvailability = await Host4.AidaClient.AidaClient.checkAccessPreconditions();
    if (currentAidaAvailability !== this.#aidaAvailability) {
      this.#aidaAvailability = currentAidaAvailability;
      this.requestUpdate();
    }
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
      spinnerTooltipId: this.#spinnerTooltipId,
      citations: this.#citations,
      citationsTooltipId: this.#citationsTooltipId,
      loading: this.#loading,
      hasTopBorder: this.#hasTopBorder,
      aidaAvailability: this.#aidaAvailability
    }, void 0, this.contentElement);
  }
  wasShown() {
    super.wasShown();
    Host4.AidaClient.HostConfigTracker.instance().addEventListener("aidaAvailabilityChanged", this.#boundOnAidaAvailabilityChange);
    void this.#onAidaAvailabilityChange();
  }
  willHide() {
    super.willHide();
    Host4.AidaClient.HostConfigTracker.instance().removeEventListener("aidaAvailabilityChanged", this.#boundOnAidaAvailabilityChange);
  }
};

// gen/front_end/panels/common/BadgeNotification.js
import * as Common3 from "./../../core/common/common.js";
import * as Host5 from "./../../core/host/host.js";
import * as i18n11 from "./../../core/i18n/i18n.js";
import * as Badges2 from "./../../models/badges/badges.js";
import * as WindowBoundsService from "./../../services/window_bounds/window_bounds.js";
import * as Buttons3 from "./../../ui/components/buttons/buttons.js";
import * as UI6 from "./../../ui/legacy/legacy.js";
import * as Lit2 from "./../../ui/lit/lit.js";
import * as VisualLogging4 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/common/badgeNotification.css.js
var badgeNotification_css_default = `/*
 * Copyright 2025 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

@scope to (devtools-widget > *) {
  :scope {
    position: fixed;
    z-index: 9999;
    /* subtract var(--sys-size-5) * 2 so that there is equal space on the left and on the right in small screens */
    max-width: calc(100% - 2 * var(--sys-size-5));
  }

  .container {
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 485px;
    background: var(--sys-color-inverse-surface);
    box-shadow: var(--sys-elevation-level3);
    border-radius: var(--sys-shape-corner-small);
    font: var(--sys-typescale-body4-regular);
    animation: slideIn 100ms cubic-bezier(0, 0, 0.3, 1);
    box-sizing: border-box;
    max-width: 100%;
    padding: var(--sys-size-5) var(--sys-size-6) var(--sys-size-6) var(--sys-size-6);
  }

  .action-and-text-container {
    display: flex;
    flex-direction: column;
    gap: var(--sys-size-3);
  }

  .long-action-container {
    margin-left: auto;
    /*
    * Buttons have a 24px total height, which includes padding for the hover area.
    * We apply a -3px vertical margin to compensate for this extra space.
    * This ensures the component aligns based on the visual text height,
    * not the full clickable bounding box.
    */
    margin-block: -3px;
  }

  .label-container {
    display: flex;
    width: 100%;
    align-items: center;
    padding-block: var(--sys-size-3);
    line-height: 18px;
  }

  .badge-container {
    margin-right: 10px;
    min-width: 64px;
    height: 64px;
  }

  .badge-image {
    width: 100%;
    height: 100%;
    border-radius: var(--sys-shape-corner-full);
  }

  .badge-link {
    color: var(--sys-color-inverse-primary);
  }

  .message {
    width: 100%;
    color: var(--sys-color-inverse-on-surface);
    flex: 1 0 0;
    text-wrap: pretty;
    user-select: text;
  }

  devtools-button.dismiss {
    padding: 3px;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(var(--sys-size-5));
    opacity: 0%;
  }

  to {
    opacity: 100%;
  }
}

/*# sourceURL=${import.meta.resolve("./badgeNotification.css")} */`;

// gen/front_end/panels/common/BadgeNotification.js
var { html: html6, render: render6 } = Lit2;
var UIStrings3 = {
  /**
   * @description Title for close button
   */
  close: "Close",
  /**
   * @description Activity based badge award notification text
   * @example {Badge Title} PH1
   */
  activityBasedBadgeAwardMessage: "You earned the {PH1} badge! It\u2019s been added to your Developer Profile.",
  /**
   * @description Action title for navigating to the badge settings in Google Developer Profile section
   */
  manageSettings: "Manage settings",
  /**
   * @description Action title for opening the Google Developer Program profile page of the user in a new tab
   */
  viewProfile: "View profile",
  /**
   * @description Starter badge award notification text when the user has a Google Developer Program profile but did not enable receiving badges in DevTools yet
   * @example {Badge Title} PH1
   * @example {Google Developer Program link} PH2
   */
  starterBadgeAwardMessageSettingDisabled: "You earned the {PH1} badge for the {PH2}! Turn on badges to claim it.",
  /**
   * @description Starter badge award notification text when the user does not have a Google Developer Program profile.
   * @example {Badge Title} PH1
   * @example {Google Developer Program link} PH2
   */
  starterBadgeAwardMessageNoGdpProfile: "You earned the {PH1} badge for the {PH2}! Create a profile to claim your badge.",
  /**
   * @description Action title for snoozing the starter badge.
   */
  remindMeLater: "Remind me later",
  /**
   * @description Action title for enabling the "Receive badges" setting
   */
  receiveBadges: "Turn on badges",
  /**
   * @description Action title for creating a Google Developer Program profle
   */
  createProfile: "Create profile"
};
var str_3 = i18n11.i18n.registerUIStrings("panels/common/BadgeNotification.ts", UIStrings3);
var i18nString3 = i18n11.i18n.getLocalizedString.bind(void 0, str_3);
var i18nFormatString = i18n11.i18n.getFormatLocalizedString.bind(void 0, str_3);
var lockedString4 = i18n11.i18n.lockedString;
var LEFT_OFFSET = 5;
var BOTTOM_OFFSET = 5;
var AUTO_CLOSE_TIME_IN_MS = 3e4;
var DEFAULT_VIEW3 = (input, _output, target) => {
  const actionButtons = input.actions.map((property) => {
    return html6`<devtools-button
        class="notification-button"
        @click=${() => property.onClick()}
        jslog=${VisualLogging4.action(property.jslogContext).track({ click: true })}
        .variant=${"text"}
        .title=${property.title ?? ""}
        .inverseColorTheme=${true}
    >${property.label}</devtools-button>`;
  });
  const crossButton = html6`<devtools-button
        class="dismiss notification-button"
        @click=${input.onDismissClick}
        jslog=${VisualLogging4.action("badge-notification.dismiss").track({ click: true })}
        aria-label=${i18nString3(UIStrings3.close)}
        .iconName=${"cross"}
        .variant=${"icon"}
        .title=${i18nString3(UIStrings3.close)}
        .inverseColorTheme=${true}
    ></devtools-button>`;
  render6(html6`
    <style>${badgeNotification_css_default}</style>
    <div class="container" jslog=${VisualLogging4.dialog("badge-notification")}>
      <div class="badge-container" jslog=${VisualLogging4.item(input.jslogContext)}>
        <img class="badge-image" role="presentation" src=${input.imageUri}>
      </div>
      <div class="action-and-text-container">
        <div class="label-container">
            <div class="message">${input.message}</div>
            ${crossButton}
        </div>
        <div class="long-action-container">${actionButtons}</div>
      </div>
    </div>
  `, target);
};
function revealBadgeSettings() {
  void Common3.Revealer.reveal(Common3.Settings.moduleSetting("receive-gdp-badges"));
}
var BadgeNotification = class extends UI6.Widget.Widget {
  jslogContext = "";
  message = "";
  imageUri = "";
  actions = [];
  isStarterBadge = false;
  #autoCloseTimeout;
  #view;
  constructor(element, view = DEFAULT_VIEW3) {
    super(element);
    this.#view = view;
    this.contentElement.role = "alert";
    this.markAsRoot();
  }
  async present(badge) {
    if (badge.isStarterBadge) {
      await this.#presentStarterBadge(badge);
    } else {
      this.#presentActivityBasedBadge(badge);
    }
  }
  #positionNotification() {
    const boundingRect = this.contentElement.getBoundingClientRect();
    const container = WindowBoundsService.WindowBoundsService.WindowBoundsServiceImpl.instance().getDevToolsBoundingElement();
    this.contentElement.positionAt(LEFT_OFFSET, container.clientHeight - boundingRect.height - BOTTOM_OFFSET, container);
  }
  #show(properties) {
    this.message = properties.message;
    this.imageUri = properties.imageUri;
    this.actions = properties.actions;
    this.isStarterBadge = properties.isStarterBadge;
    this.jslogContext = properties.jslogContext;
    this.requestUpdate();
    this.show(document.body);
    void this.updateComplete.then(() => {
      this.#positionNotification();
    });
    if (this.#autoCloseTimeout) {
      window.clearTimeout(this.#autoCloseTimeout);
    }
    this.#autoCloseTimeout = window.setTimeout(this.#onAutoClose, AUTO_CLOSE_TIME_IN_MS);
  }
  async #presentStarterBadge(badge) {
    const getProfileResponse = await Host5.GdpClient.GdpClient.instance().getProfile();
    if (!getProfileResponse) {
      return;
    }
    const hasGdpProfile = Boolean(getProfileResponse.profile);
    const receiveBadgesSettingEnabled = Badges2.UserBadges.instance().isReceiveBadgesSettingEnabled();
    const googleDeveloperProgramLink = UI6.XLink.XLink.create("https://developers.google.com/program", lockedString4("Google Developer Program"), "badge-link", void 0, "program-link");
    if (hasGdpProfile && receiveBadgesSettingEnabled) {
      this.#presentActivityBasedBadge(badge);
      return;
    }
    if (hasGdpProfile && !receiveBadgesSettingEnabled) {
      this.#show({
        message: i18nFormatString(UIStrings3.starterBadgeAwardMessageSettingDisabled, { PH1: badge.title, PH2: googleDeveloperProgramLink }),
        jslogContext: badge.jslogContext,
        actions: [
          {
            label: i18nString3(UIStrings3.remindMeLater),
            jslogContext: "remind-me-later",
            onClick: () => {
              this.detach();
              Badges2.UserBadges.instance().snoozeStarterBadge();
            }
          },
          {
            label: i18nString3(UIStrings3.receiveBadges),
            jslogContext: "receive-badges",
            onClick: () => {
              this.detach();
              revealBadgeSettings();
            }
          }
        ],
        imageUri: badge.imageUri,
        isStarterBadge: true
      });
      return;
    }
    this.#show({
      message: i18nFormatString(UIStrings3.starterBadgeAwardMessageNoGdpProfile, { PH1: badge.title, PH2: googleDeveloperProgramLink }),
      jslogContext: badge.jslogContext,
      actions: [
        {
          label: i18nString3(UIStrings3.remindMeLater),
          jslogContext: "remind-me-later",
          onClick: () => {
            this.detach();
            Badges2.UserBadges.instance().snoozeStarterBadge();
          }
        },
        {
          label: i18nString3(UIStrings3.createProfile),
          jslogContext: "create-profile",
          onClick: () => {
            this.detach();
            GdpSignUpDialog.show({
              // We want to consider cancelling from the starter badge as a "snooze" for starter badge.
              onCancel: () => Badges2.UserBadges.instance().snoozeStarterBadge()
            });
          }
        }
      ],
      imageUri: badge.imageUri,
      isStarterBadge: true
    });
  }
  #presentActivityBasedBadge(badge) {
    this.#show({
      message: i18nString3(UIStrings3.activityBasedBadgeAwardMessage, { PH1: badge.title }),
      jslogContext: badge.jslogContext,
      actions: [
        {
          label: i18nString3(UIStrings3.manageSettings),
          jslogContext: "manage-settings",
          onClick: () => {
            this.detach();
            revealBadgeSettings();
          }
        },
        {
          label: i18nString3(UIStrings3.viewProfile),
          jslogContext: "view-profile",
          onClick: () => {
            UI6.UIUtils.openInNewTab(Host5.GdpClient.GOOGLE_DEVELOPER_PROGRAM_PROFILE_LINK);
          }
        }
      ],
      imageUri: badge.imageUri,
      isStarterBadge: badge.isStarterBadge
    });
  }
  onDetach() {
    window.clearTimeout(this.#autoCloseTimeout);
  }
  #onDismissClick = () => {
    this.detach();
    if (this.isStarterBadge) {
      Badges2.UserBadges.instance().dismissStarterBadge();
    }
  };
  #onAutoClose = () => {
    this.detach();
    if (this.isStarterBadge) {
      Badges2.UserBadges.instance().snoozeStarterBadge();
    }
  };
  wasShown() {
    super.wasShown();
    this.requestUpdate();
  }
  performUpdate() {
    const viewInput = {
      message: this.message,
      imageUri: this.imageUri,
      actions: this.actions,
      isStarterBadge: this.isStarterBadge,
      onDismissClick: this.#onDismissClick,
      jslogContext: this.jslogContext
    };
    this.#view(viewInput, void 0, this.contentElement);
  }
};

// gen/front_end/panels/common/common.prebundle.js
var UIStrings4 = {
  /**
   * @description Text for the cancel button in the dialog.
   */
  cancel: "Cancel",
  /**
   * @description Text for the allow button in the "type to allow" dialog.
   */
  allow: "Allow"
};
var str_4 = i18n13.i18n.registerUIStrings("panels/common/common.ts", UIStrings4);
var i18nString4 = i18n13.i18n.getLocalizedString.bind(void 0, str_4);
var TypeToAllowDialog = class {
  static async show(options) {
    const dialog2 = new UI7.Dialog.Dialog(options.jslogContext.dialog);
    dialog2.setMaxContentSize(new Geometry2.Size(504, 340));
    dialog2.setSizeBehavior(
      "SetExactWidthMaxHeight"
      /* UI.GlassPane.SizeBehavior.SET_EXACT_WIDTH_MAX_HEIGHT */
    );
    dialog2.setDimmed(true);
    const shadowRoot = UI7.UIUtils.createShadowRootWithCoreStyles(dialog2.contentElement, { cssFile: common_css_default });
    const content = shadowRoot.createChild("div", "type-to-allow-dialog");
    const result = await new Promise((resolve) => {
      const header = content.createChild("div", "header");
      header.createChild("div", "title").textContent = options.header;
      const closeButton = header.createChild("dt-close-button", "dialog-close-button");
      closeButton.setTabbable(true);
      self.onInvokeElement(closeButton, (event) => {
        dialog2.hide();
        event.consume(true);
        resolve(false);
      });
      closeButton.setSize(
        "SMALL"
        /* Buttons.Button.Size.SMALL */
      );
      content.createChild("div", "message").textContent = options.message;
      const input = UI7.UIUtils.createInput("text-input", "text", options.jslogContext.input);
      input.placeholder = options.inputPlaceholder;
      content.appendChild(input);
      const buttonsBar = content.createChild("div", "button");
      const cancelButton = UI7.UIUtils.createTextButton(i18nString4(UIStrings4.cancel), () => resolve(false), { jslogContext: "cancel" });
      const allowButton = UI7.UIUtils.createTextButton(i18nString4(UIStrings4.allow), () => {
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
      dialog2.setOutsideClickCallback((event) => {
        event.consume();
        resolve(false);
      });
      dialog2.show();
      Host6.userMetrics.actionTaken(Host6.UserMetrics.Action.SelfXssWarningDialogShown);
    });
    dialog2.hide();
    return result;
  }
};
export {
  AiCodeCompletionDisclaimer,
  AiCodeCompletionSummaryToolbar,
  AiCodeCompletionTeaser,
  BadgeNotification,
  FreDialog,
  GdpSignUpDialog,
  TypeToAllowDialog
};
//# sourceMappingURL=common.js.map
