// gen/front_end/panels/common/common.prebundle.js
import * as Host2 from "./../../core/host/host.js";
import * as i18n7 from "./../../core/i18n/i18n.js";
import * as Buttons2 from "./../../ui/components/buttons/buttons.js";
import * as UI4 from "./../../ui/legacy/legacy.js";

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

.ai-code-completion-teaser {
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
   *@description Header text for the feature reminder dialog.
   */
  thingsToConsider: "Things to consider",
  /**
   *@description Text for the learn more button in the feature reminder dialog.
   */
  learnMore: "Learn more",
  /**
   *@description Text for the cancel button in the feature reminder dialog.
   */
  cancel: "Cancel",
  /**
   *@description Text for the got it button in the feature reminder dialog.
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
   *@description Text for `ctrl` key.
   */
  ctrl: "ctrl",
  /**
   *@description Text for `cmd` key.
   */
  cmd: "cmd",
  /**
   *@description Text for `i` key.
   */
  i: "i",
  /**
   *@description Text for dismissing teaser.
   */
  dontShowAgain: "Don't show again",
  /**
   *@description Text for teaser to turn on code suggestions.
   */
  toTurnOnCodeSuggestions: "to turn on code suggestions.",
  /**
   *@description Text for snackbar notification on dismissing the teaser.
   */
  turnOnCodeSuggestionsAtAnyTimeInSettings: "Turn on code suggestions at any time in Settings",
  /**
   *@description Text for snackbar action button to manage settings.
   */
  manage: "Manage",
  /**
   *@description The footer disclaimer that links to more information
   * about the AI feature.
   */
  learnMore: "Learn more about AI code completion",
  /**
   *@description Header text for the AI-powered suggestions disclaimer dialog.
   */
  freDisclaimerHeader: "Code faster with AI-powered suggestions",
  /**
   *@description First disclaimer item text for the fre dialog.
   */
  freDisclaimerTextAiWontAlwaysGetItRight: "This feature uses AI and won\u2019t always get it right",
  /**
   *@description Second disclaimer item text for the fre dialog.
   */
  freDisclaimerTextPrivacy: "To generate code suggestions, your console input, the history of your current console session, and the contents of the currently open file are shared with Google. This data may be seen by human reviewers to improve this feature.",
  /**
   *@description Second disclaimer item text for the fre dialog when enterprise logging is off.
   */
  freDisclaimerTextPrivacyNoLogging: "To generate code suggestions, your console input, the history of your current console session, and the contents of the currently open file are shared with Google. This data will not be used to improve Google\u2019s AI models. Your organization may change these settings at any time.",
  /**
   *@description Third disclaimer item text for the fre dialog.
   */
  freDisclaimerTextUseWithCaution: "Use generated code snippets with caution"
};
var lockedString = i18n3.i18n.lockedString;
var CODE_SNIPPET_WARNING_URL = "https://support.google.com/legal/answer/13505487";
var DEFAULT_VIEW = (input, _output, target) => {
  if (input.aidaAvailability !== "available") {
    render2(nothing, target, { host: input });
    return;
  }
  const cmdOrCtrl = Host.Platform.isMac() ? lockedString(UIStringsNotTranslate.cmd) : lockedString(UIStringsNotTranslate.ctrl);
  render2(html2`
          <style>${aiCodeCompletionTeaser_css_default}</style>
          <div class="ai-code-completion-teaser">
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
        `, target, { host: input });
};
var AiCodeCompletionTeaser = class extends UI2.Widget.Widget {
  #view;
  #aidaAvailability = "no-account-email";
  #boundOnAidaAvailabilityChange;
  #onDetach;
  // Whether the user completed first run experience dialog or not.
  #aiCodeCompletionFreCompletedSetting = Common.Settings.Settings.instance().createSetting("ai-code-completion-fre-completed", false);
  // Whether the user dismissed the teaser or not.
  #aiCodeCompletionTeaserDismissedSetting = Common.Settings.Settings.instance().createSetting("ai-code-completion-teaser-dismissed", false);
  #noLogging;
  // Whether the enterprise setting is `ALLOW_WITHOUT_LOGGING` or not.
  constructor(config, view) {
    super();
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
  #onKeyDown = async (event) => {
    const keyboardEvent = event;
    if (UI2.KeyboardShortcut.KeyboardShortcut.eventHasCtrlEquivalentKey(keyboardEvent)) {
      if (keyboardEvent.key === "i") {
        keyboardEvent.consume(true);
        await this.onAction(event);
        void VisualLogging.logKeyDown(event.currentTarget, event, "ai-code-completion-teaser.fre");
      } else if (keyboardEvent.key === "x") {
        keyboardEvent.consume(true);
        this.onDismiss(event);
        void VisualLogging.logKeyDown(event.currentTarget, event, "ai-code-completion-teaser.dismiss");
      }
    }
  };
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
    document.body.addEventListener("keydown", this.#onKeyDown);
    Host.AidaClient.HostConfigTracker.instance().addEventListener("aidaAvailabilityChanged", this.#boundOnAidaAvailabilityChange);
    void this.#onAidaAvailabilityChange();
  }
  willHide() {
    document.body.removeEventListener("keydown", this.#onKeyDown);
    Host.AidaClient.HostConfigTracker.instance().removeEventListener("aidaAvailabilityChanged", this.#boundOnAidaAvailabilityChange);
  }
  onDetach() {
    this.#onDetach();
  }
};

// gen/front_end/panels/common/AiCodeCompletionSummaryToolbar.js
import "./../../ui/components/tooltips/tooltips.js";
import * as i18n5 from "./../../core/i18n/i18n.js";
import * as Root2 from "./../../core/root/root.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
import { Directives, html as html3, nothing as nothing2, render as render3 } from "./../../ui/lit/lit.js";
import * as VisualLogging2 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/common/aiCodeCompletionSummaryToolbar.css.js
var aiCodeCompletionSummaryToolbar_css_default = `/*
 * Copyright 2025 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.ai-code-completion-summary-toolbar {
  display: flex;
  border-top: var(--sys-size-1) solid var(--sys-color-divider);
  background-color: var(--sys-color-cdt-base-container);
  padding: var(--sys-size-2) var(--sys-size-5);
  align-items: center;
  gap: var(--sys-size-5);
  flex-shrink: 0;
  color: var(--sys-color-on-surface-subtle);

  span.link {
    color: var(--sys-color-on-surface-subtle);
  }

  .ai-code-completion-disclaimer {
    border-right: var(--sys-size-1) solid var(--sys-color-divider);
    padding-right: var(--sys-size-5);
  }

  .ai-code-completion-recitation-notice {
    span.link {
      padding-left: var(--sys-size-3);
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

        x-link {
            color: var(--sys-color-primary);
            text-decoration: underline;
        }
    }

    .disclaimer-tooltip-container {
      padding: var(--sys-size-4) 0;
      max-width: var(--sys-size-30);

      .tooltip-text {
        color: var(--sys-color-on-surface-subtle);
        padding: 0 var(--sys-size-5);
        align-items: flex-start;
        gap: 10px;
      }

      .link {
        padding: var(--sys-size-5) var(--sys-size-8) 0 var(--sys-size-5);
      }
    }
  }
}

/*# sourceURL=${import.meta.resolve("./aiCodeCompletionSummaryToolbar.css")} */`;

// gen/front_end/panels/common/AiCodeCompletionSummaryToolbar.js
var UIStrings2 = {
  /**
   *@description Disclaimer text for AI code completion
   */
  relevantData: "Relevant data",
  /**
   * @description Disclaimer text for AI code completion
   */
  isSentToGoogle: "is sent to Google",
  /**
   *@description Text for tooltip shown on hovering over "Relevant Data" in the disclaimer text for AI code completion.
   */
  tooltipDisclaimerTextForAiCodeCompletion: "To generate code suggestions, your console input and the history of your current console session are shared with Google. This data may be seen by human reviewers to improve this feature.",
  /**
   *@description Text for tooltip shown on hovering over "Relevant Data" in the disclaimer text for AI code completion.
   */
  tooltipDisclaimerTextForAiCodeCompletionNoLogging: "To generate code suggestions, your console input and the history of your current console session are shared with Google. This data will not be used to improve Google\u2019s AI models.",
  /**
   *@description Text for tooltip button which redirects to AI settings
   */
  manageInSettings: "Manage in settings",
  /**
   *@description Text for recitation notice
   */
  generatedCodeMayBeSubjectToALicense: "Generated code may be subject to a license.",
  /**
   *@description Text for citations
   */
  viewSources: "View Sources"
};
var lockedString2 = i18n5.i18n.lockedString;
var DEFAULT_SUMMARY_TOOLBAR_VIEW = (input, output, target) => {
  output.tooltipRef = output.tooltipRef ?? Directives.createRef();
  const viewSourcesSpan = input.citations && input.citations.length > 0 ? html3`<span class="link" role="link" aria-details=${input.citationsTooltipId}>
            ${lockedString2(UIStrings2.viewSources)}&nbsp;${lockedString2("(" + input.citations.length + ")")}</span>` : nothing2;
  const viewSourcesTooltip = input.citations && input.citations.length > 0 ? html3`<devtools-tooltip
                id=${input.citationsTooltipId}
                variant=${"rich"}
                jslogContext=${input.panelName + ".ai-code-completion-citations"}
            ><div class="citations-tooltip-container">
                ${Directives.repeat(input.citations, (citation) => html3`<x-link
                    href=${citation}
                    jslog=${VisualLogging2.link(input.panelName + ".ai-code-completion-citations.citation-link").track({
    click: true
  })}>${citation}</x-link>`)}</div></devtools-tooltip>` : nothing2;
  render3(html3`
        <style>${aiCodeCompletionSummaryToolbar_css_default}</style>
        <div class="ai-code-completion-summary-toolbar">
            <div class="ai-code-completion-disclaimer">
                <span
                    class="link"
                    role="link"
                    jslog=${VisualLogging2.link("open-ai-settings").track({
    click: true
  })}
                    aria-details=${input.disclaimerTooltipId}
                    @click=${() => {
    void UI3.ViewManager.ViewManager.instance().showView("chrome-ai");
  }}
                >${lockedString2(UIStrings2.relevantData)}</span>&nbsp;${lockedString2(UIStrings2.isSentToGoogle)}
                <devtools-tooltip
                    id=${input.disclaimerTooltipId}
                    variant=${"rich"}
                    jslogContext=${input.panelName + ".ai-code-completion-disclaimer"}
                    ${Directives.ref(output.tooltipRef)}
                ><div class="disclaimer-tooltip-container">
                    <div class="tooltip-text">
                      ${input.noLogging ? lockedString2(UIStrings2.tooltipDisclaimerTextForAiCodeCompletionNoLogging) : lockedString2(UIStrings2.tooltipDisclaimerTextForAiCodeCompletion)}
                    </div>
                    <div
                        class="link"
                        role="link"
                        jslog=${VisualLogging2.link("open-ai-settings").track({
    click: true
  })}
                        @click=${input.onManageInSettingsTooltipClick}
                    >${lockedString2(UIStrings2.manageInSettings)}</div></div></devtools-tooltip>
            </div>
            <div class="ai-code-completion-recitation-notice">${lockedString2(UIStrings2.generatedCodeMayBeSubjectToALicense)}
                ${viewSourcesSpan}
                ${viewSourcesTooltip}
            </div>
        </div>
        `, target, { host: input });
};
var AiCodeCompletionSummaryToolbar = class extends UI3.Widget.Widget {
  #view;
  #viewOutput = {};
  #disclaimerTooltipId;
  #citationsTooltipId;
  #panelName;
  #citations = [];
  #noLogging;
  // Whether the enterprise setting is `ALLOW_WITHOUT_LOGGING` or not.
  constructor(disclaimerTooltipId, citationsTooltipId, panelName, view) {
    super();
    this.#disclaimerTooltipId = disclaimerTooltipId;
    this.#citationsTooltipId = citationsTooltipId;
    this.#panelName = panelName;
    this.#noLogging = Root2.Runtime.hostConfig.aidaAvailability?.enterprisePolicyValue === Root2.Runtime.GenAiEnterprisePolicyValue.ALLOW_WITHOUT_LOGGING;
    this.#view = view ?? DEFAULT_SUMMARY_TOOLBAR_VIEW;
    this.requestUpdate();
  }
  #onManageInSettingsTooltipClick() {
    this.#viewOutput.tooltipRef?.value?.hidePopover();
    void UI3.ViewManager.ViewManager.instance().showView("chrome-ai");
  }
  updateCitations(citations) {
    citations.forEach((citation) => {
      if (!this.#citations.includes(citation)) {
        this.#citations.push(citation);
      }
    });
    this.requestUpdate();
  }
  clearCitations() {
    this.#citations = [];
    this.requestUpdate();
  }
  performUpdate() {
    this.#view({
      disclaimerTooltipId: this.#disclaimerTooltipId,
      citations: this.#citations,
      citationsTooltipId: this.#citationsTooltipId,
      panelName: this.#panelName,
      noLogging: this.#noLogging,
      onManageInSettingsTooltipClick: this.#onManageInSettingsTooltipClick.bind(this)
    }, this.#viewOutput, this.contentElement);
  }
};

// gen/front_end/panels/common/common.prebundle.js
var UIStrings3 = {
  /**
   *@description Text for the cancel button in the dialog.
   */
  cancel: "Cancel",
  /**
   *@description Text for the allow button in the "type to allow" dialog.
   */
  allow: "Allow"
};
var str_2 = i18n7.i18n.registerUIStrings("panels/common/common.ts", UIStrings3);
var i18nString2 = i18n7.i18n.getLocalizedString.bind(void 0, str_2);
var TypeToAllowDialog = class {
  static async show(options) {
    const dialog = new UI4.Dialog.Dialog(options.jslogContext.dialog);
    dialog.setMaxContentSize(new UI4.Geometry.Size(504, 340));
    dialog.setSizeBehavior(
      "SetExactWidthMaxHeight"
      /* UI.GlassPane.SizeBehavior.SET_EXACT_WIDTH_MAX_HEIGHT */
    );
    dialog.setDimmed(true);
    const shadowRoot = UI4.UIUtils.createShadowRootWithCoreStyles(dialog.contentElement, { cssFile: common_css_default });
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
      const input = UI4.UIUtils.createInput("text-input", "text", options.jslogContext.input);
      input.placeholder = options.inputPlaceholder;
      content.appendChild(input);
      const buttonsBar = content.createChild("div", "button");
      const cancelButton = UI4.UIUtils.createTextButton(i18nString2(UIStrings3.cancel), () => resolve(false), { jslogContext: "cancel" });
      const allowButton = UI4.UIUtils.createTextButton(i18nString2(UIStrings3.allow), () => {
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
  AiCodeCompletionSummaryToolbar,
  AiCodeCompletionTeaser,
  FreDialog,
  TypeToAllowDialog
};
//# sourceMappingURL=common.js.map
