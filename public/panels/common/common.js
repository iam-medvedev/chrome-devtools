// gen/front_end/panels/common/common.prebundle.js
import * as Host5 from "./../../core/host/host.js";
import * as i18n13 from "./../../core/i18n/i18n.js";
import * as Geometry2 from "./../../models/geometry/geometry.js";
import * as Buttons4 from "./../../ui/components/buttons/buttons.js";
import * as UI7 from "./../../ui/legacy/legacy.js";

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
  static show({ header, reminderItems, onLearnMoreClick, ariaLabel, learnMoreButtonText, learnMoreButtonAriaLabel }) {
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
            .title=${learnMoreButtonAriaLabel ?? i18nString(UIStrings.learnMore)}
            aria-label=${ifDefined(learnMoreButtonAriaLabel)}>
            ${learnMoreButtonText ?? i18nString(UIStrings.learnMore)}
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
import * as Host2 from "./../../core/host/host.js";
import * as i18n5 from "./../../core/i18n/i18n.js";
import * as Geometry from "./../../models/geometry/geometry.js";
import * as Buttons2 from "./../../ui/components/buttons/buttons.js";
import * as Snackbars2 from "./../../ui/components/snackbars/snackbars.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
import { html as html3, render as render3 } from "./../../ui/lit/lit.js";
import * as VisualLogging2 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/common/gdpSignUpDialog.css.js
var gdpSignUpDialog_css_default = `/*
 * Copyright 2025 The Chromium Authors. All rights reserved.
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
        font: var(--sys-typescale-headline5);
        color: var(--sys-color-on-surface);
        display: flex;
        align-items: center;
        margin: 0;
    }

    .gdp-sign-up-dialog-header::before {
        content: '';
        background-image: var(--image-file-gdp-logo-standalone);
        display: inline-block;
        width: 34px;
        height: 15px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin-right: var(--sys-size-6);
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
   * @description Heading of the Google Developer Program sign up dialog.
   */
  gdpSignUp: "Google Developer Program",
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
  designedForSuccessBody: "Grow your skills, build with AI, and showcase your achievements",
  /**
   * @description Title for the second section of the GDP sign up dialog.
   */
  keepUpdated: "Keep me updated",
  /**
   * @description Body for the second section of the GDP sign up dialog.
   */
  keepUpdatedBody: "The latest DevTools features, event invites, and tailored insights directly in your inbox",
  /**
   * @description Title for the third section of the GDP sign up dialog.
   */
  thingsToConsider: "Things to consider",
  /**
   * @description Body for the third section of the GDP sign up dialog.
   * @example {Content Policy} PH1
   * @example {Terms of Service} PH2
   * @example {Privacy Policy} PH3
   */
  thingsToConsiderBody: "By creating a Developer Profile, you agree to the\xA0{PH1}. Google\u2019s\xA0{PH2}\xA0and\xA0{PH3}\xA0apply to your use of this service. The name on your Google Account and your interests will be used in your Google Developer Profile. Your name may appear where you contribute and can be changed at any time.",
  /**
   * @description Button text for learning more about the Google Developer Program.
   */
  learnMore: "Learn more",
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
      <h2 class="gdp-sign-up-dialog-header">${i18nString2(UIStrings2.gdpSignUp)}</h2>
      <div class="main-content">
        <div class="section">
          <div class="icon-container">
            <devtools-icon name="trophy"></devtools-icon>
          </div>
          <div class="text-container">
            <h3 class="section-title">${i18nString2(UIStrings2.designedForSuccess)}</h3>
            <div class="section-text">${i18nString2(UIStrings2.designedForSuccessBody)}</div>
          </div>
        </div>
        <div class="section">
          <div class="icon-container">
            <devtools-icon name="mark-email-unread"></devtools-icon>
          </div>
          <div class="text-container">
            <h3 class="section-title">${i18nString2(UIStrings2.keepUpdated)}</h3>
            <div class="section-text">${i18nString2(UIStrings2.keepUpdatedBody)}</div>
          </div>
          <div class="switch-container">
            <devtools-switch
            .checked=${input.keepMeUpdated}
            @switchchange=${(e) => input.onKeepMeUpdatedChange(e.checked)}
            jslog=${VisualLogging2.toggle("gdp.signup.keep-me-updated").track({ click: true })}
            aria-label=${i18nString2(UIStrings2.keepUpdated)}
          >
            </devtools-switch>
          </div>
          </div>
        <div class="section">
          <div class="icon-container">
            <devtools-icon name="google"></devtools-icon>
          </div>
          <div class="text-container">
            <h3 class="section-title">${i18nString2(UIStrings2.thingsToConsider)}</h3>
            <div class="section-text">${i18n5.i18n.getFormatLocalizedString(str_2, UIStrings2.thingsToConsiderBody, {
    PH1: UI3.XLink.XLink.create(CONTENT_POLICY_URL, i18nString2(UIStrings2.contentPolicy), "link", void 0, "gdp.content-policy"),
    PH2: UI3.XLink.XLink.create(TERMS_OF_SERVICE_URL, i18nString2(UIStrings2.termsOfService), "link", void 0, "gdp.terms-of-service"),
    PH3: UI3.XLink.XLink.create(PRIVACY_POLICY_URL, i18nString2(UIStrings2.privacyPolicy), "link", void 0, "gdp.privacy-policy")
  })}</div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <devtools-button
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
            .jslogContext=${"gdp.sign-up"}
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
  constructor(options, view) {
    super();
    this.#dialog = options.dialog;
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
  static show() {
    const dialog = new UI3.Dialog.Dialog();
    dialog.setAriaLabel(i18nString2(UIStrings2.gdpDialogAriaLabel));
    dialog.setMaxContentSize(new Geometry.Size(384, 500));
    dialog.setSizeBehavior(
      "SetExactWidthMaxHeight"
      /* UI.GlassPane.SizeBehavior.SET_EXACT_WIDTH_MAX_HEIGHT */
    );
    dialog.setDimmed(true);
    new _GdpSignUpDialog({ dialog }).show(dialog.contentElement);
    dialog.show();
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
import * as VisualLogging3 from "./../../ui/visual_logging/visual_logging.js";

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
var lockedString2 = i18n7.i18n.lockedString;
var DEFAULT_SUMMARY_TOOLBAR_VIEW = (input, output, target) => {
  if (input.aidaAvailability !== "available" || !input.disclaimerTooltipId) {
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
  })}></devtools-spinner>
          <span
              tabIndex="0"
              class="link"
              role="link"
              jslog=${VisualLogging3.link("open-ai-settings").track({
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
                    jslog=${VisualLogging3.link("open-ai-settings").track({
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
import * as VisualLogging4 from "./../../ui/visual_logging/visual_logging.js";

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
  const disclaimer = input.disclaimerTooltipId ? html5`<devtools-widget
            .widgetConfig=${UI5.Widget.widgetConfig(AiCodeCompletionDisclaimer, {
    disclaimerTooltipId: input.disclaimerTooltipId,
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
                        jslog=${VisualLogging4.link("ai-code-completion-citations.citation-link").track({
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
  #citationsTooltipId;
  #citations = /* @__PURE__ */ new Set();
  #loading = false;
  #hasTopBorder = false;
  #aidaAvailability;
  #boundOnAidaAvailabilityChange;
  constructor(props, view) {
    super();
    this.#disclaimerTooltipId = props.disclaimerTooltipId;
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
import * as i18n11 from "./../../core/i18n/i18n.js";
import * as Buttons3 from "./../../ui/components/buttons/buttons.js";
import * as UI6 from "./../../ui/legacy/legacy.js";
import * as Lit2 from "./../../ui/lit/lit.js";
import * as VisualLogging5 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/common/badgeNotification.css.js
var badgeNotification_css_default = `/*
 * Copyright 2025 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

@scope to (devtools-widget > *) {
  :scope {
    position: fixed;
    bottom: var(--sys-size-5);
    left: var(--sys-size-5);
    z-index: 9999;
    /* subtract var(--sys-size-5) * 2 so that there is equal space on the left and on the right in small screens */
    max-width: calc(100% - 2 * var(--sys-size-5));
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    width: var(--sys-size-33);
    background: var(--sys-color-inverse-surface);
    box-shadow: var(--sys-elevation-level3);
    border-radius: var(--sys-shape-corner-small);
    font: var(--sys-typescale-body4-medium);
    animation: slideIn 100ms cubic-bezier(0, 0, 0.3, 1);
    box-sizing: border-box;
    max-width: 100%;
    padding: var(--sys-size-5) var(--sys-size-6) var(--sys-size-6) var(--sys-size-6);
  }

  .long-action-container {
    margin-left: auto;
  }

  .label-container {
    display: flex;
    width: 100%;
    align-items: center;
    gap: var(--sys-size-5);
  }

  .badge-image {
    margin-right: var(--sys-size-6);
    width: 42px;
    height: 42px;
    border-radius: var(--sys-shape-corner-full);
    background: var(--sys-color-surface);
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
  dismiss: "Dismiss"
};
var str_3 = i18n11.i18n.registerUIStrings("panels/common/BadgeNotification.ts", UIStrings3);
var i18nString3 = i18n11.i18n.getLocalizedString.bind(void 0, str_3);
var DEFAULT_VIEW3 = (input, _output, target) => {
  const actionButtons = input.actions.map((property) => {
    return html6`<devtools-button
        class="notification-button"
        @click=${() => property.onClick()}
        jslog=${VisualLogging5.action(property.jslogContext).track({ click: true })}
        .variant=${"text"}
        .title=${property.title ?? ""}
        .inverseColorTheme=${true}
    >${property.label}</devtools-button>`;
  });
  const crossButton = html6`<devtools-button
        class="dismiss notification-button"
        @click=${input.onCloseClick}
        jslog=${VisualLogging5.action("badge-notification.dismiss").track({ click: true })}
        aria-label=${i18nString3(UIStrings3.dismiss)}
        .iconName=${"cross"}
        .variant=${"icon"}
        .title=${i18nString3(UIStrings3.dismiss)}
        .inverseColorTheme=${true}
    ></devtools-button>`;
  render6(html6`
    <style>${badgeNotification_css_default}</style>
    <div class="container">
        <div class="label-container">
            <img class="badge-image" src=${input.imageUri}>
            <div class="message">${input.message}</div>
            ${crossButton}
        </div>
        <div class="long-action-container">${actionButtons}</div>
    </div>
  `, target);
};
var BadgeNotification = class _BadgeNotification extends UI6.Widget.Widget {
  message = html6``;
  imageUri = "";
  actions = [];
  #view;
  constructor(element, view = DEFAULT_VIEW3) {
    super(element);
    this.#view = view;
  }
  static show(properties) {
    const widget = new _BadgeNotification();
    widget.message = properties.message;
    widget.imageUri = properties.imageUri;
    widget.actions = properties.actions;
    widget.show(UI6.InspectorView.InspectorView.instance().element);
    return widget;
  }
  #close = () => {
    this.detach();
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
      onCloseClick: this.#close
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
    const dialog = new UI7.Dialog.Dialog(options.jslogContext.dialog);
    dialog.setMaxContentSize(new Geometry2.Size(504, 340));
    dialog.setSizeBehavior(
      "SetExactWidthMaxHeight"
      /* UI.GlassPane.SizeBehavior.SET_EXACT_WIDTH_MAX_HEIGHT */
    );
    dialog.setDimmed(true);
    const shadowRoot = UI7.UIUtils.createShadowRootWithCoreStyles(dialog.contentElement, { cssFile: common_css_default });
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
      dialog.setOutsideClickCallback((event) => {
        event.consume();
        resolve(false);
      });
      dialog.show();
      Host5.userMetrics.actionTaken(Host5.UserMetrics.Action.SelfXssWarningDialogShown);
    });
    dialog.hide();
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
