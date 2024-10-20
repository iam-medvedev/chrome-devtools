// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../../ui/components/spinners/spinners.js';
import * as Common from '../../../core/common/common.js';
import * as Host from '../../../core/host/host.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as SDK from '../../../core/sdk/sdk.js';
import * as Marked from '../../../third_party/marked/marked.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as Input from '../../../ui/components/input/input.js';
import * as MarkdownView from '../../../ui/components/markdown_view/markdown_view.js';
import * as UI from '../../../ui/legacy/legacy.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import { SourceType } from '../PromptBuilder.js';
import styles from './consoleInsight.css.js';
import listStyles from './consoleInsightSourcesList.css.js';
// Note: privacy and legal notices are not localized so far.
const UIStrings = {
    /**
     * @description The title of the insight source "Console message".
     */
    consoleMessage: 'Console message',
    /**
     * @description The title of the insight source "Stacktrace".
     */
    stackTrace: 'Stacktrace',
    /**
     * @description The title of the insight source "Network request".
     */
    networkRequest: 'Network request',
    /**
     * @description The title of the insight source "Related code".
     */
    relatedCode: 'Related code',
    /**
     * @description The title that is shown while the insight is being generated.
     */
    generating: 'Generating explanation…',
    /**
     * @description The header that indicates that the content shown is a console
     * insight.
     */
    insight: 'Explanation',
    /**
     * @description The title of the a button that closes the insight pane.
     */
    closeInsight: 'Close explanation',
    /**
     * @description The title of the list of source data that was used to generate the insight.
     */
    inputData: 'Data used to understand this message',
    /**
     * @description The title of the button that allows submitting positive
     * feedback about the console insight.
     */
    goodResponse: 'Good response',
    /**
     * @description The title of the button that allows submitting negative
     * feedback about the console insight.
     */
    badResponse: 'Bad response',
    /**
     * @description The title of the button that opens a page to report a legal
     * issue with the console insight.
     */
    report: 'Report legal issue',
    /**
     * @description The text of the header inside the console insight pane when there was an error generating an insight.
     */
    error: 'DevTools has encountered an error',
    /**
     * @description The message shown when an error has been encountered.
     */
    errorBody: 'Something went wrong. Try again.',
    /**
     * @description Label for screenreaders that is added to the end of the link
     * title to indicate that the link will be opened in a new tab.
     */
    opensInNewTab: '(opens in a new tab)',
    /**
     * @description The title of a link that allows the user to learn more about
     * the feature.
     */
    learnMore: 'Learn more',
    /**
     * @description The error message when the user is not logged in into Chrome.
     */
    notLoggedIn: 'This feature is only available when you sign into Chrome with your Google account.',
    /**
     * @description The title of the button that opens Chrome settings.
     */
    updateSettings: 'Update Settings',
    /**
     * @description The header shown when the internet connection is not
     * available.
     */
    offlineHeader: 'DevTools can’t reach the internet',
    /**
     * @description Message shown when the user is offline.
     */
    offline: 'Check your internet connection and try again.',
    /**
     * @description The message shown if the user is not logged in.
     */
    signInToUse: 'Sign in to use this feature',
    /**
     * @description The title of the button that searches for the console
     * insight using a search engine instead of using console insights.
     */
    search: 'Use search instead',
    /**
     * @description Shown to the user when the network request data is not
     * available and a page reload might populate it.
     */
    reloadRecommendation: 'Reload the page to capture related network request data for this message in order to create a better insight.',
    /**
     * @description Shown to the user when they need to enable the console insights feature in settings in order to use it.
     * @example {Console insights in Settings} PH1
     */
    turnOnInSettings: 'Turn on {PH1} to receive AI assistance for understanding and addressing console warnings and errors.',
    /**
     * @description Text for a link to Chrome DevTools Settings.
     */
    settingsLink: '`Console insights` in Settings',
};
const str_ = i18n.i18n.registerUIStrings('panels/explain/components/ConsoleInsight.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const { render, html, Directives } = LitHtml;
export class CloseEvent extends Event {
    static eventName = 'close';
    constructor() {
        super(CloseEvent.eventName, { composed: true, bubbles: true });
    }
}
function localizeType(sourceType) {
    switch (sourceType) {
        case SourceType.MESSAGE:
            return i18nString(UIStrings.consoleMessage);
        case SourceType.STACKTRACE:
            return i18nString(UIStrings.stackTrace);
        case SourceType.NETWORK_REQUEST:
            return i18nString(UIStrings.networkRequest);
        case SourceType.RELATED_CODE:
            return i18nString(UIStrings.relatedCode);
    }
}
const TERMS_OF_SERVICE_URL = 'https://policies.google.com/terms';
const PRIVACY_POLICY_URL = 'https://policies.google.com/privacy';
const CODE_SNIPPET_WARNING_URL = 'https://support.google.com/legal/answer/13505487';
const LEARNMORE_URL = 'https://goo.gle/devtools-console-messages-ai';
const REPORT_URL = 'https://support.google.com/legal/troubleshooter/1114905?hl=en#ts=1115658%2C13380504';
const CHROME_SETTINGS_URL = 'chrome://settings';
export class ConsoleInsight extends HTMLElement {
    static async create(promptBuilder, aidaClient) {
        const aidaAvailability = await Host.AidaClient.AidaClient.checkAccessPreconditions();
        return new ConsoleInsight(promptBuilder, aidaClient, aidaAvailability);
    }
    #shadow = this.attachShadow({ mode: 'open' });
    #promptBuilder;
    #aidaClient;
    #renderer = new MarkdownView.MarkdownView.MarkdownInsightRenderer();
    // Main state.
    #state;
    // Rating sub-form state.
    #selectedRating;
    #consoleInsightsEnabledSetting;
    #aidaAvailability;
    #boundOnAidaAvailabilityChange;
    constructor(promptBuilder, aidaClient, aidaAvailability) {
        super();
        this.#promptBuilder = promptBuilder;
        this.#aidaClient = aidaClient;
        this.#aidaAvailability = aidaAvailability;
        this.#consoleInsightsEnabledSetting = this.#getConsoleInsightsEnabledSetting();
        this.#state = this.#getStateFromAidaAvailability();
        this.#boundOnAidaAvailabilityChange = this.#onAidaAvailabilityChange.bind(this);
        this.#render();
        // Stop keyboard event propagation to avoid Console acting on the events
        // inside the insight component.
        this.addEventListener('keydown', e => {
            e.stopPropagation();
        });
        this.addEventListener('keyup', e => {
            e.stopPropagation();
        });
        this.addEventListener('keypress', e => {
            e.stopPropagation();
        });
        this.addEventListener('click', e => {
            e.stopPropagation();
        });
        this.focus();
    }
    #getStateFromAidaAvailability() {
        switch (this.#aidaAvailability) {
            case "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */: {
                // Allows skipping the consent reminder if the user enabled the feature via settings in the current session
                const skipReminder = Common.Settings.Settings.instance()
                    .createSetting('console-insights-skip-reminder', false, "Session" /* Common.Settings.SettingStorageType.SESSION */)
                    .get();
                return {
                    type: "loading" /* State.LOADING */,
                    consentOnboardingCompleted: this.#getOnboardingCompletedSetting().get() || skipReminder,
                };
            }
            case "no-account-email" /* Host.AidaClient.AidaAccessPreconditions.NO_ACCOUNT_EMAIL */:
                return {
                    type: "not-logged-in" /* State.NOT_LOGGED_IN */,
                };
            case "sync-is-paused" /* Host.AidaClient.AidaAccessPreconditions.SYNC_IS_PAUSED */:
                return {
                    type: "sync-is-paused" /* State.SYNC_IS_PAUSED */,
                };
            case "no-internet" /* Host.AidaClient.AidaAccessPreconditions.NO_INTERNET */:
                return {
                    type: "offline" /* State.OFFLINE */,
                };
        }
    }
    // off -> entrypoints are shown, and point to the AI setting panel where the setting can be turned on
    // on -> entrypoints are shown, and console insights can be generated
    #getConsoleInsightsEnabledSetting() {
        try {
            return Common.Settings.moduleSetting('console-insights-enabled');
        }
        catch {
            return;
        }
    }
    // off -> consent reminder is shown, unless the 'console-insights-enabled'-setting has been enabled in the current DevTools session
    // on -> no consent reminder shown
    #getOnboardingCompletedSetting() {
        return Common.Settings.Settings.instance().createLocalSetting('console-insights-onboarding-finished', false);
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [styles, Input.checkboxStyles];
        this.classList.add('opening');
        this.#consoleInsightsEnabledSetting?.addChangeListener(this.#onConsoleInsightsSettingChanged, this);
        const blockedByAge = Common.Settings.Settings.instance().getHostConfig().aidaAvailability?.blockedByAge === true;
        if (this.#state.type === "loading" /* State.LOADING */ && this.#consoleInsightsEnabledSetting?.getIfNotDisabled() === true &&
            !blockedByAge && this.#state.consentOnboardingCompleted) {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.GeneratingInsightWithoutDisclaimer);
        }
        Host.AidaClient.HostConfigTracker.instance().addEventListener("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */, this.#boundOnAidaAvailabilityChange);
        // If AIDA availability has changed while the component was disconnected, we need to update.
        void this.#onAidaAvailabilityChange();
        // The setting might have been turned on/off while the component was disconnected.
        // Update the state, unless the current state is already terminal (`INSIGHT` or `ERROR`).
        if (this.#state.type !== "insight" /* State.INSIGHT */ && this.#state.type !== "error" /* State.ERROR */) {
            this.#state = this.#getStateFromAidaAvailability();
        }
        void this.#generateInsightIfNeeded();
    }
    disconnectedCallback() {
        this.#consoleInsightsEnabledSetting?.removeChangeListener(this.#onConsoleInsightsSettingChanged, this);
        Host.AidaClient.HostConfigTracker.instance().removeEventListener("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */, this.#boundOnAidaAvailabilityChange);
    }
    async #onAidaAvailabilityChange() {
        const currentAidaAvailability = await Host.AidaClient.AidaClient.checkAccessPreconditions();
        if (currentAidaAvailability !== this.#aidaAvailability) {
            this.#aidaAvailability = currentAidaAvailability;
            this.#state = this.#getStateFromAidaAvailability();
            void this.#generateInsightIfNeeded();
        }
    }
    #onConsoleInsightsSettingChanged() {
        if (this.#consoleInsightsEnabledSetting?.getIfNotDisabled() === true) {
            this.#getOnboardingCompletedSetting().set(true);
        }
        if (this.#state.type === "setting-is-not-true" /* State.SETTING_IS_NOT_TRUE */ &&
            this.#consoleInsightsEnabledSetting?.getIfNotDisabled() === true) {
            this.#transitionTo({
                type: "loading" /* State.LOADING */,
                consentOnboardingCompleted: true,
            });
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightsOptInTeaserConfirmedInSettings);
            void this.#generateInsightIfNeeded();
        }
        if (this.#state.type === "consent-reminder" /* State.CONSENT_REMINDER */ &&
            this.#consoleInsightsEnabledSetting?.getIfNotDisabled() === false) {
            this.#transitionTo({
                type: "loading" /* State.LOADING */,
                consentOnboardingCompleted: false,
            });
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightsReminderTeaserAbortedInSettings);
            void this.#generateInsightIfNeeded();
        }
    }
    #transitionTo(newState) {
        const previousState = this.#state;
        this.#state = newState;
        this.#render();
        if (newState.type !== previousState.type) {
            this.#focusHeader();
        }
    }
    async #generateInsightIfNeeded() {
        if (this.#state.type !== "loading" /* State.LOADING */) {
            return;
        }
        const blockedByAge = Common.Settings.Settings.instance().getHostConfig().aidaAvailability?.blockedByAge === true;
        if (this.#consoleInsightsEnabledSetting?.getIfNotDisabled() !== true || blockedByAge) {
            this.#transitionTo({
                type: "setting-is-not-true" /* State.SETTING_IS_NOT_TRUE */,
            });
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightsOptInTeaserShown);
            return;
        }
        if (!this.#state.consentOnboardingCompleted) {
            const { sources, isPageReloadRecommended } = await this.#promptBuilder.buildPrompt();
            this.#transitionTo({
                type: "consent-reminder" /* State.CONSENT_REMINDER */,
                sources,
                isPageReloadRecommended,
            });
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightsReminderTeaserShown);
            return;
        }
        await this.#generateInsight();
    }
    #onClose() {
        if (this.#state.type === "consent-reminder" /* State.CONSENT_REMINDER */) {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightsReminderTeaserCanceled);
        }
        this.shadowRoot?.addEventListener('animationend', () => {
            this.dispatchEvent(new CloseEvent());
        }, { once: true });
        this.classList.add('closing');
    }
    #onRating(event) {
        if (this.#state.type !== "insight" /* State.INSIGHT */) {
            throw new Error('Unexpected state');
        }
        if (this.#state.metadata?.rpcGlobalId === undefined) {
            throw new Error('RPC Id not in metadata');
        }
        // If it was rated, do not record again.
        if (this.#selectedRating !== undefined) {
            return;
        }
        this.#selectedRating = event.target.dataset.rating === 'true';
        this.#render();
        if (this.#selectedRating) {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightRatedPositive);
        }
        else {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightRatedNegative);
        }
        const disallowLogging = Common.Settings.Settings.instance().getHostConfig().aidaAvailability?.disallowLogging ?? true;
        void this.#aidaClient.registerClientEvent({
            corresponding_aida_rpc_global_id: this.#state.metadata.rpcGlobalId,
            disable_user_content_logging: disallowLogging,
            do_conversation_client_event: {
                user_feedback: {
                    sentiment: this.#selectedRating ? "POSITIVE" /* Host.AidaClient.Rating.POSITIVE */ : "NEGATIVE" /* Host.AidaClient.Rating.NEGATIVE */,
                },
            },
        });
    }
    #onReport() {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(REPORT_URL);
    }
    #onSearch() {
        const query = this.#promptBuilder.getSearchQuery();
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.openSearchResultsInNewTab(query);
    }
    async #onConsentReminderConfirmed() {
        this.#getOnboardingCompletedSetting().set(true);
        this.#transitionTo({
            type: "loading" /* State.LOADING */,
            consentOnboardingCompleted: true,
        });
        Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightsReminderTeaserConfirmed);
        await this.#generateInsight();
    }
    async #generateInsight() {
        try {
            for await (const { sources, isPageReloadRecommended, explanation, metadata, completed } of this.#getInsight()) {
                const tokens = this.#validateMarkdown(explanation);
                const valid = tokens !== false;
                this.#transitionTo({
                    type: "insight" /* State.INSIGHT */,
                    tokens: valid ? tokens : [],
                    validMarkdown: valid,
                    explanation,
                    sources,
                    metadata,
                    isPageReloadRecommended,
                    completed,
                });
            }
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightGenerated);
        }
        catch (err) {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightErrored);
            this.#transitionTo({
                type: "error" /* State.ERROR */,
                error: err.message,
            });
        }
    }
    /**
     * Validates the markdown by trying to render it.
     */
    #validateMarkdown(text) {
        try {
            const tokens = Marked.Marked.lexer(text);
            for (const token of tokens) {
                this.#renderer.renderToken(token);
            }
            return tokens;
        }
        catch {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightErroredMarkdown);
            return false;
        }
    }
    async *#getInsight() {
        const { prompt, sources, isPageReloadRecommended } = await this.#promptBuilder.buildPrompt();
        try {
            for await (const response of this.#aidaClient.fetch(Host.AidaClient.AidaClient.buildConsoleInsightsRequest(prompt))) {
                yield { sources, isPageReloadRecommended, ...response };
            }
        }
        catch (err) {
            if (err.message === 'Server responded: permission denied') {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightErroredPermissionDenied);
            }
            else if (err.message.startsWith('Cannot send request:')) {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightErroredCannotSend);
            }
            else if (err.message.startsWith('Request failed:')) {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightErroredRequestFailed);
            }
            else if (err.message.startsWith('Cannot parse chunk:')) {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightErroredCannotParseChunk);
            }
            else if (err.message === 'Unknown chunk result') {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightErroredUnknownChunk);
            }
            else if (err.message.startsWith('Server responded:')) {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightErroredApi);
            }
            else {
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightErroredOther);
            }
            throw err;
        }
    }
    #onGoToChromeSettings() {
        const rootTarget = SDK.TargetManager.TargetManager.instance().rootTarget();
        if (rootTarget === null) {
            return;
        }
        const url = CHROME_SETTINGS_URL;
        void rootTarget.targetAgent().invoke_createTarget({ url }).then(result => {
            if (result.getError()) {
                Host.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(url);
            }
        });
    }
    #focusHeader() {
        this.addEventListener('animationend', () => {
            this.#shadow.querySelector('header h2')?.focus();
        }, { once: true });
    }
    #renderSearchButton() {
        // clang-format off
        return html `<devtools-button
      @click=${this.#onSearch}
      class="search-button"
      .data=${{
            variant: "outlined" /* Buttons.Button.Variant.OUTLINED */,
            jslogContext: 'search',
        }}
    >
      ${i18nString(UIStrings.search)}
    </devtools-button>`;
        // clang-format on
    }
    #renderLearnMoreAboutInsights() {
        // clang-format off
        return html `<x-link href=${LEARNMORE_URL} class="link" jslog=${VisualLogging.link('learn-more').track({ click: true })}>
      ${i18nString(UIStrings.learnMore)}
    </x-link>`;
        // clang-format on
    }
    #renderMain() {
        const jslog = `${VisualLogging.section(this.#state.type).track({ resize: true })}`;
        // clang-format off
        switch (this.#state.type) {
            case "loading" /* State.LOADING */:
                return html `<main jslog=${jslog}>
            <div role="presentation" aria-label="Loading" class="loader" style="clip-path: url('#clipPath');">
              <svg width="100%" height="64">
                <clipPath id="clipPath">
                  <rect x="0" y="0" width="100%" height="16" rx="8"></rect>
                  <rect x="0" y="24" width="100%" height="16" rx="8"></rect>
                  <rect x="0" y="48" width="100%" height="16" rx="8"></rect>
                </clipPath>
              </svg>
            </div>
          </main>`;
            case "insight" /* State.INSIGHT */:
                return html `
        <main jslog=${jslog}>
          ${this.#state.validMarkdown ? html `<devtools-markdown-view
              .data=${{ tokens: this.#state.tokens, renderer: this.#renderer }}>
            </devtools-markdown-view>` : this.#state.explanation}
          <details style="--list-height: ${(this.#state.sources.length + (this.#state.isPageReloadRecommended ? 1 : 0)) * 20}px;" jslog=${VisualLogging.expand('sources').track({ click: true })}>
            <summary>${i18nString(UIStrings.inputData)}</summary>
            <devtools-console-insight-sources-list .sources=${this.#state.sources} .isPageReloadRecommended=${this.#state.isPageReloadRecommended}>
            </devtools-console-insight-sources-list>
          </details>
          <div class="buttons">
            ${this.#renderSearchButton()}
          </div>
        </main>`;
            case "error" /* State.ERROR */:
                return html `
        <main jslog=${jslog}>
          <div class="error">${i18nString(UIStrings.errorBody)}</div>
        </main>`;
            case "consent-reminder" /* State.CONSENT_REMINDER */:
                return html `
          <main class="reminder-container" jslog=${jslog}>
            <h3>Things to consider</h3>
            <div class="reminder-items">
              <div>
                <devtools-icon .data=${{
                    iconName: 'google',
                    width: 'var(--sys-size-8)',
                    height: 'var(--sys-size-8)',
                }}>
                </devtools-icon>
              </div>
              <div>The console message, associated stack trace, related source code, and the associated network headers are sent to Google to generate explanations. This data may be seen by human reviewers to improve this feature. Avoid sharing sensitive or personal information.</div>
              <div>
                <devtools-icon .data=${{
                    iconName: 'policy',
                    width: 'var(--sys-size-8)',
                    height: 'var(--sys-size-8)',
                }}>
                </devtools-icon>
              </div>
              <div>Use of this feature is subject to the
                <x-link
                  href=${TERMS_OF_SERVICE_URL}
                  class="link"
                  jslog=${VisualLogging.link('terms-of-service.console-insights').track({ click: true })}
                >Google Terms of Service</x-link>
                and
                <x-link
                  href=${PRIVACY_POLICY_URL}
                  class="link"
                  jslog=${VisualLogging.link('privacy-policy.console-insights').track({ click: true })}
                >Google Privacy Policy</x-link>
              </div>
              <div>
                <devtools-icon .data=${{
                    iconName: 'warning',
                    width: 'var(--sys-size-8)',
                    height: 'var(--sys-size-8)',
                }}>
                </devtools-icon>
              </div>
              <div>
                <x-link
                  href=${CODE_SNIPPET_WARNING_URL}
                  class="link"
                  jslog=${VisualLogging.link('code-snippets-explainer.console-insights').track({ click: true })}
                >Use generated code snippets with caution</x-link>
              </div>
            </div>
          </main>
        `;
            case "setting-is-not-true" /* State.SETTING_IS_NOT_TRUE */: {
                const settingsLink = document.createElement('button');
                settingsLink.textContent = i18nString(UIStrings.settingsLink);
                settingsLink.classList.add('link');
                UI.ARIAUtils.markAsLink(settingsLink);
                settingsLink.addEventListener('click', () => {
                    Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightsOptInTeaserSettingsLinkClicked);
                    void UI.ViewManager.ViewManager.instance().showView('chrome-ai');
                });
                settingsLink.setAttribute('jslog', `${VisualLogging.action('open-ai-settings').track({ click: true })}`);
                return html `<main class="opt-in-teaser" jslog=${jslog}>
          <div class="badge">
            <devtools-icon .data=${{
                    iconName: 'lightbulb-spark',
                    width: 'var(--sys-size-8)',
                    height: 'var(--sys-size-8)',
                }}>
            </devtools-icon>
          </div>
          <div>
            ${i18n.i18n.getFormatLocalizedString(str_, UIStrings.turnOnInSettings, { PH1: settingsLink })}
            ${this.#renderLearnMoreAboutInsights()}
          </div>
        </main>`;
            }
            case "not-logged-in" /* State.NOT_LOGGED_IN */:
            case "sync-is-paused" /* State.SYNC_IS_PAUSED */:
                return html `
          <main jslog=${jslog}>
            <div class="error">${i18nString(UIStrings.notLoggedIn)}</div>
          </main>`;
            case "offline" /* State.OFFLINE */:
                return html `
          <main jslog=${jslog}>
            <div class="error">${i18nString(UIStrings.offline)}</div>
          </main>`;
        }
        // clang-format on
    }
    #renderDisclaimer() {
        // clang-format off
        return html `<span>
      AI tools may generate inaccurate info that doesn't represent Google's views. Data sent to Google may be seen by human reviewers to improve this feature.
      <button class="link" role="link" @click=${() => UI.ViewManager.ViewManager.instance().showView('chrome-ai')}
        jslog=${VisualLogging.action('open-ai-settings').track({ click: true })}
      >Open settings</button>
      or
      <x-link href=${LEARNMORE_URL} class="link" jslog=${VisualLogging.link('learn-more').track({ click: true })}>learn more</x-link>
    </span>`;
        // clang-format on
    }
    #renderFooter() {
        const showThumbsUpDownButtons = !(Common.Settings.Settings.instance().getHostConfig().aidaAvailability?.disallowLogging ?? true);
        const disclaimer = this.#renderDisclaimer();
        // clang-format off
        switch (this.#state.type) {
            case "loading" /* State.LOADING */:
            case "setting-is-not-true" /* State.SETTING_IS_NOT_TRUE */:
                return LitHtml.nothing;
            case "error" /* State.ERROR */:
            case "offline" /* State.OFFLINE */:
                return html `<footer jslog=${VisualLogging.section('footer')}>
          <div class="disclaimer">
            ${disclaimer}
          </div>
        </footer>`;
            case "not-logged-in" /* State.NOT_LOGGED_IN */:
            case "sync-is-paused" /* State.SYNC_IS_PAUSED */:
                return html `<footer jslog=${VisualLogging.section('footer')}>
        <div class="filler"></div>
        <div>
          <devtools-button
            @click=${this.#onGoToChromeSettings}
            .data=${{
                    variant: "primary" /* Buttons.Button.Variant.PRIMARY */,
                    jslogContext: 'update-settings',
                }}
          >
            ${UIStrings.updateSettings}
          </devtools-button>
        </div>
      </footer>`;
            case "consent-reminder" /* State.CONSENT_REMINDER */:
                return html `<footer jslog=${VisualLogging.section('footer')}>
          <div class="filler"></div>
          <div class="buttons">
            <devtools-button
              @click=${() => {
                    Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightsReminderTeaserSettingsLinkClicked);
                    void UI.ViewManager.ViewManager.instance().showView('chrome-ai');
                }}
              .data=${{
                    variant: "tonal" /* Buttons.Button.Variant.TONAL */,
                    jslogContext: 'settings',
                    title: 'Settings',
                }}
            >
              Settings
            </devtools-button>
            <devtools-button
              class='continue-button'
              @click=${this.#onConsentReminderConfirmed}
              .data=${{
                    variant: "primary" /* Buttons.Button.Variant.PRIMARY */,
                    jslogContext: 'continue',
                    title: 'continue',
                }}
              >
              Continue
            </devtools-button>
          </div>
        </footer>`;
            case "insight" /* State.INSIGHT */:
                return html `<footer jslog=${VisualLogging.section('footer')}>
        <div class="disclaimer">
          ${disclaimer}
        </div>
        <div class="filler"></div>
        <div class="rating">
          ${showThumbsUpDownButtons ? html `
            <devtools-button
              data-rating=${'true'}
              .data=${{
                    variant: "icon" /* Buttons.Button.Variant.ICON */,
                    size: "SMALL" /* Buttons.Button.Size.SMALL */,
                    iconName: 'thumb-up',
                    active: this.#selectedRating !== undefined && this.#selectedRating,
                    title: i18nString(UIStrings.goodResponse),
                    jslogContext: 'thumbs-up',
                }}
              @click=${this.#onRating}
            ></devtools-button>
            <devtools-button
              data-rating=${'false'}
              .data=${{
                    variant: "icon" /* Buttons.Button.Variant.ICON */,
                    size: "SMALL" /* Buttons.Button.Size.SMALL */,
                    iconName: 'thumb-down',
                    active: this.#selectedRating !== undefined && !this.#selectedRating,
                    title: i18nString(UIStrings.badResponse),
                    jslogContext: 'thumbs-down',
                }}
              @click=${this.#onRating}
            ></devtools-button>
          ` : LitHtml.nothing}
          <devtools-button
            .data=${{
                    variant: "icon" /* Buttons.Button.Variant.ICON */,
                    size: "SMALL" /* Buttons.Button.Size.SMALL */,
                    iconName: 'report',
                    title: i18nString(UIStrings.report),
                    jslogContext: 'report',
                }}
            @click=${this.#onReport}
          ></devtools-button>
        </div>

      </footer>`;
        }
        // clang-format on
    }
    #getHeader() {
        switch (this.#state.type) {
            case "not-logged-in" /* State.NOT_LOGGED_IN */:
            case "sync-is-paused" /* State.SYNC_IS_PAUSED */:
                return i18nString(UIStrings.signInToUse);
            case "offline" /* State.OFFLINE */:
                return i18nString(UIStrings.offlineHeader);
            case "loading" /* State.LOADING */:
                return i18nString(UIStrings.generating);
            case "insight" /* State.INSIGHT */:
                return i18nString(UIStrings.insight);
            case "error" /* State.ERROR */:
                return i18nString(UIStrings.error);
            case "consent-reminder" /* State.CONSENT_REMINDER */:
                return 'Understand console messages with AI';
            case "setting-is-not-true" /* State.SETTING_IS_NOT_TRUE */:
                return ''; // not reached
        }
    }
    #renderSpinner() {
        // clang-format off
        if (this.#state.type === "insight" /* State.INSIGHT */ && !this.#state.completed) {
            return html `<devtools-spinner></devtools-spinner>`;
        }
        return LitHtml.nothing;
        // clang-format on
    }
    #renderHeader() {
        if (this.#state.type === "setting-is-not-true" /* State.SETTING_IS_NOT_TRUE */) {
            return LitHtml.nothing;
        }
        const hasIcon = this.#state.type === "consent-reminder" /* State.CONSENT_REMINDER */;
        // clang-format off
        return html `
      <header>
        ${hasIcon ? html `
          <div class="header-icon-container">
            <devtools-icon .data=${{
            iconName: 'lightbulb-spark',
            width: '18px',
            height: '18px',
        }}>
            </devtools-icon>
          </div>`
            : LitHtml.nothing}
        <div class="filler">
          <h2 tabindex="-1">
            ${this.#getHeader()}
          </h2>
          ${this.#renderSpinner()}
        </div>
        <div class="close-button">
          <devtools-button
            .data=${{
            variant: "icon" /* Buttons.Button.Variant.ICON */,
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            iconName: 'cross',
            title: i18nString(UIStrings.closeInsight),
        }}
            jslog=${VisualLogging.close().track({ click: true })}
            @click=${this.#onClose}
          ></devtools-button>
        </div>
      </header>
    `;
        // clang-format on
    }
    #render() {
        // clang-format off
        render(html `
      <div class="wrapper" jslog=${VisualLogging.pane('console-insights').track({ resize: true })}>
        <div class="animation-wrapper">
          ${this.#renderHeader()}
          ${this.#renderMain()}
          ${this.#renderFooter()}
        </div>
      </div>
    `, this.#shadow, {
            host: this,
        });
        // clang-format on
    }
}
class ConsoleInsightSourcesList extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #sources = [];
    #isPageReloadRecommended = false;
    constructor() {
        super();
        this.#shadow.adoptedStyleSheets = [listStyles, Input.checkboxStyles];
    }
    #render() {
        // clang-format off
        render(html `
      <ul>
        ${Directives.repeat(this.#sources, item => item.value, item => {
            return html `<li><x-link class="link" title="${localizeType(item.type)} ${i18nString(UIStrings.opensInNewTab)}" href="data:text/plain,${encodeURIComponent(item.value)}" jslog=${VisualLogging.link('source-' + item.type).track({ click: true })}>
            <devtools-icon name="open-externally"></devtools-icon>
            ${localizeType(item.type)}
          </x-link></li>`;
        })}
        ${this.#isPageReloadRecommended ? html `<li class="source-disclaimer">
          <devtools-icon name="warning"></devtools-icon>
          ${i18nString(UIStrings.reloadRecommendation)}</li>` : LitHtml.nothing}
      </ul>
    `, this.#shadow, {
            host: this,
        });
        // clang-format on
    }
    set sources(values) {
        this.#sources = values;
        this.#render();
    }
    set isPageReloadRecommended(isPageReloadRecommended) {
        this.#isPageReloadRecommended = isPageReloadRecommended;
        this.#render();
    }
}
customElements.define('devtools-console-insight', ConsoleInsight);
customElements.define('devtools-console-insight-sources-list', ConsoleInsightSourcesList);
//# sourceMappingURL=ConsoleInsight.js.map