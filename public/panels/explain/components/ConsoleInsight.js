// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../../core/host/host.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as SDK from '../../../core/sdk/sdk.js';
import * as Marked from '../../../third_party/marked/marked.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as IconButton from '../../../ui/components/icon_button/icon_button.js';
import * as MarkdownView from '../../../ui/components/markdown_view/markdown_view.js';
import * as UI from '../../../ui/legacy/legacy.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import { SourceType } from '../PromptBuilder.js';
import styles from './consoleInsight.css.js';
import listStyles from './consoleInsightSourcesList.css.js';
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
    generating: 'Coming up with an explanation…',
    /**
     * @description The header that indicates that the content shown is a console
     * insight.
     */
    insight: 'Insight',
    /**
     * @description The title of the a button that closes the insight pane.
     */
    closeInsight: 'Close insight',
    /**
     * @description The title of the list of source data that was used to generate the insight.
     */
    inputData: 'Data used to create this insight',
    /**
     * @description The title of the button that allows submitting positive
     * feedback about the console insight.
     */
    thumbsUp: 'Thumbs up',
    /**
     * @description The title of the button that allows submitting negative
     * feedback about the console insight.
     */
    thumbsDown: 'Thumbs down',
    /**
     * @description The title of the link that allows submitting more feedback.
     */
    submitFeedback: 'Submit feedback',
    /**
     * @description The text of the header inside the console insight pane when there was an error generating an insight.
     */
    error: 'Something went wrong…',
    /**
     * @description Label for screenreaders that is added to the end of the link
     * title to indicate that the link will be opened in a new tab.
     */
    opensInNewTab: '(opens in a new tab)',
    /**
     * @description The legal disclaimer for using the Console Insights feature.
     */
    disclaimer: 'The following data will be sent to Google to find an explanation for the console message. They may be reviewed by humans and used to improve products.',
    /**
     * @description The title of the button that records the consent of the user
     * to send the data to the backend.
     */
    consentButton: 'Continue',
    /**
     * @description The title of a link that allows the user to learn more about
     * the feature.
     */
    learnMore: 'Learn more about AI in DevTools',
    /**
     * @description The title of the message when the console insight is not available for some reason.
     */
    notAvailable: 'Console insights is not available',
    /**
     * @description The error message when the user is not logged in into Chrome.
     */
    notLoggedIn: 'This feature is only available if you are signed into Chrome with your Google account.',
    /**
     * @description The error message when the user is not logged in into Chrome.
     */
    syncIsOff: 'This feature is only available if you have Chrome sync turned on.',
    /**
     * @description The title of the button that opens Chrome settings.
     */
    goToSettings: 'Go to settings',
    /**
     * @description Fine print to set expectations for users.
     */
    finePrint: 'This is an experimental AI insights tool and won’t always get it right.',
    /**
     * @description Message shown when the user is offline.
     */
    offline: 'Internet connection is currently not available.',
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
const DOGFOODFEEDBACK_URL = 'http://go/console-insights-experiment-general-feedback';
const DOGFOODINFO_URL = 'http://go/console-insights-experiment';
function buildRatingFormLink(rating, comment, explanation, consoleMessage, stackTrace, relatedCode, networkData) {
    const params = rating === 'Negative' ? {
        'entry.1465663861': rating,
        'entry.1232404632': explanation,
        'entry.37285503': stackTrace,
        'entry.542010749': consoleMessage,
        'entry.420621380': relatedCode,
        'entry.822323774': networkData,
    } :
        {
            'entry.1465663861': rating,
            'entry.1805879004': explanation,
            'entry.720239045': stackTrace,
            'entry.623054399': consoleMessage,
            'entry.1520357991': relatedCode,
            'entry.1966708581': networkData,
        };
    return `http://go/console-insights-experiment-rating?usp=pp_url&${Object.keys(params)
        .map(param => {
        return `${param}=${encodeURIComponent(params[param])}`;
    })
        .join('&')}`;
}
export class ConsoleInsight extends HTMLElement {
    static async create(promptBuilder, insightProvider, actionTitle) {
        const syncData = await new Promise(resolve => {
            Host.InspectorFrontendHost.InspectorFrontendHostInstance.getSyncInformation(syncInfo => {
                resolve(syncInfo);
            });
        });
        return new ConsoleInsight(promptBuilder, insightProvider, actionTitle, syncData);
    }
    static litTagName = LitHtml.literal `devtools-console-insight`;
    #shadow = this.attachShadow({ mode: 'open' });
    #actionTitle = '';
    #promptBuilder;
    #insightProvider;
    #renderer = new MarkdownRenderer();
    // Main state.
    #state;
    // Rating sub-form state.
    #selectedRating;
    constructor(promptBuilder, insightProvider, actionTitle, syncInfo) {
        super();
        this.#promptBuilder = promptBuilder;
        this.#insightProvider = insightProvider;
        this.#actionTitle = actionTitle ?? '';
        this.#state = {
            type: "not-logged-in" /* State.NOT_LOGGED_IN */,
        };
        if (syncInfo?.accountEmail && syncInfo.isSyncActive) {
            this.#state = {
                type: "loading" /* State.LOADING */,
                consentGiven: false,
            };
        }
        else if (!syncInfo?.accountEmail) {
            this.#state = {
                type: "not-logged-in" /* State.NOT_LOGGED_IN */,
            };
        }
        else if (!syncInfo?.isSyncActive) {
            this.#state = {
                type: "sync-is-off" /* State.SYNC_IS_OFF */,
            };
        }
        if (!navigator.onLine) {
            this.#state = {
                type: "offline" /* State.OFFLINE */,
            };
        }
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
        this.tabIndex = 0;
        this.focus();
        // Measure the height of the element after an animation. `--actual-height` can
        // be used as the `from` value for the subsequent animation.
        this.addEventListener('animationend', () => {
            this.style.setProperty('--actual-height', `${this.offsetHeight}px`);
        });
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [styles];
        this.classList.add('opening');
        void this.#generateInsightIfNeeded();
    }
    #transitionTo(newState) {
        const previousState = this.#state;
        this.#state = newState;
        if (newState.type !== previousState.type && previousState.type === "loading" /* State.LOADING */) {
            this.classList.add('loaded');
        }
        this.#render();
    }
    async #generateInsightIfNeeded() {
        if (this.#state.type !== "loading" /* State.LOADING */) {
            return;
        }
        if (this.#state.consentGiven) {
            return;
        }
        const { sources } = await this.#promptBuilder.buildPrompt();
        this.#transitionTo({
            type: "consent" /* State.CONSENT */,
            sources,
        });
    }
    #onClose() {
        this.dispatchEvent(new CloseEvent());
        this.classList.add('closing');
    }
    #openFeedbackFrom() {
        if (this.#state.type !== "insight" /* State.INSIGHT */) {
            throw new Error('Unexpected state');
        }
        const link = buildRatingFormLink(this.#selectedRating ? 'Positive' : 'Negative', this.#shadow.querySelector('textarea')?.value || '', this.#state.explanation, this.#state.sources.filter(s => s.type === SourceType.MESSAGE).map(s => s.value).join('\n'), this.#state.sources.filter(s => s.type === SourceType.STACKTRACE).map(s => s.value).join('\n'), this.#state.sources.filter(s => s.type === SourceType.RELATED_CODE).map(s => s.value).join('\n'), this.#state.sources.filter(s => s.type === SourceType.NETWORK_REQUEST).map(s => s.value).join('\n'));
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(link);
    }
    #onRating(event) {
        this.#selectedRating = event.target.dataset.rating === 'true';
        if (this.#selectedRating) {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightRatedPositive);
        }
        else {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightRatedNegative);
        }
        this.#openFeedbackFrom();
    }
    async #onConsent() {
        this.#transitionTo({
            type: "loading" /* State.LOADING */,
            consentGiven: true,
        });
        try {
            const { sources, explanation } = await this.#getInsight();
            const tokens = this.#validateMarkdown(explanation);
            const valid = tokens !== false;
            this.#transitionTo({
                type: "insight" /* State.INSIGHT */,
                tokens: valid ? tokens : [],
                validMarkdown: valid,
                explanation,
                sources,
            });
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
    async #getInsight() {
        try {
            const { prompt, sources } = await this.#promptBuilder.buildPrompt();
            const explanation = await this.#insightProvider.getInsights(prompt);
            return { sources, explanation };
        }
        catch (err) {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightErroredApi);
            throw err;
        }
    }
    #onGoToSettings() {
        const rootTarget = SDK.TargetManager.TargetManager.instance().rootTarget();
        if (rootTarget === null) {
            return;
        }
        const url = 'chrome://settings';
        void rootTarget.targetAgent().invoke_createTarget({ url }).then(result => {
            if (result.getError()) {
                Host.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(url);
            }
        });
    }
    #renderMain() {
        // clang-format off
        switch (this.#state.type) {
            case "loading" /* State.LOADING */:
                return html `<main>
            <div role="presentation" class="loader" style="clip-path: url('#clipPath');">
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
        <main>
          ${this.#state.validMarkdown ? html `<${MarkdownView.MarkdownView.MarkdownView.litTagName}
              .data=${{ tokens: this.#state.tokens, renderer: this.#renderer }}>
            </${MarkdownView.MarkdownView.MarkdownView.litTagName}>` : this.#state.explanation}
          <details style="--list-height: ${this.#state.sources.length * 20}px;">
            <summary>${i18nString(UIStrings.inputData)}</summary>
            <${ConsoleInsightSourcesList.litTagName} .sources=${this.#state.sources}>
            </${ConsoleInsightSourcesList.litTagName}>
          </details>
        </main>`;
            case "error" /* State.ERROR */:
                return html `
        <main>
          <div class="error">${this.#state.error}</div>
        </main>`;
            case "consent" /* State.CONSENT */:
                return html `
          <main>
            <p>${i18nString(UIStrings.disclaimer)}</p>
            <${ConsoleInsightSourcesList.litTagName} .sources=${this.#state.sources}>
            </${ConsoleInsightSourcesList.litTagName}>
          </main>
        `;
            case "not-logged-in" /* State.NOT_LOGGED_IN */:
                return html `
          <main>
            <div class="error">${i18nString(UIStrings.notLoggedIn)}</div>
          </main>`;
            case "sync-is-off" /* State.SYNC_IS_OFF */:
                return html `
          <main>
            <div class="error">${i18nString(UIStrings.syncIsOff)}</div>
          </main>`;
            case "offline" /* State.OFFLINE */:
                return html `
          <main>
            <div class="error">${i18nString(UIStrings.offline)}</div>
          </main>`;
        }
        // clang-format on
    }
    #renderFooter() {
        // clang-format off
        switch (this.#state.type) {
            case "loading" /* State.LOADING */:
            case "error" /* State.ERROR */:
            case "offline" /* State.OFFLINE */:
                return LitHtml.nothing;
            case "not-logged-in" /* State.NOT_LOGGED_IN */:
            case "sync-is-off" /* State.SYNC_IS_OFF */:
                return html `<footer>
        <div class="filler"></div>
        <div>
          <${Buttons.Button.Button.litTagName}
            @click=${this.#onGoToSettings}
            .data=${{
                    variant: "primary" /* Buttons.Button.Variant.PRIMARY */,
                }}
          >
            ${UIStrings.goToSettings}
          </${Buttons.Button.Button.litTagName}>
        </div>
      </footer>`;
            case "consent" /* State.CONSENT */:
                return html `<footer>
          <div class="disclaimer">
            <span>${i18nString(UIStrings.finePrint)}</span>
            <span><x-link href=${DOGFOODINFO_URL} class="link">${i18nString(UIStrings.learnMore)}</x-link></span>
          </div>
          <div class="filler"></div>
          <div>
            <${Buttons.Button.Button.litTagName}
              class="consent-button"
              @click=${this.#onConsent}
              .data=${{
                    variant: "primary" /* Buttons.Button.Variant.PRIMARY */,
                    iconName: 'lightbulb-spark',
                }}
            >
              ${UIStrings.consentButton}
            </${Buttons.Button.Button.litTagName}>
          </div>
        </footer>`;
            case "insight" /* State.INSIGHT */:
                return html `<footer>
        <div class="disclaimer">
          <span>${i18nString(UIStrings.finePrint)}</span>
          <span><x-link href=${DOGFOODINFO_URL} class="link">${i18nString(UIStrings.learnMore)}</x-link> - <x-link href=${DOGFOODFEEDBACK_URL} class="link">${i18nString(UIStrings.submitFeedback)}</x-link></span>
        </div>
        <div class="filler"></div>
        <div class="rating">
          <${Buttons.Button.Button.litTagName}
            data-rating=${'true'}
            .data=${{
                    variant: "round" /* Buttons.Button.Variant.ROUND */,
                    size: "SMALL" /* Buttons.Button.Size.SMALL */,
                    iconName: 'thumb-up',
                    active: this.#selectedRating,
                    title: i18nString(UIStrings.thumbsUp),
                }}
            @click=${this.#onRating}
          ></${Buttons.Button.Button.litTagName}>
          <${Buttons.Button.Button.litTagName}
            data-rating=${'false'}
            .data=${{
                    variant: "round" /* Buttons.Button.Variant.ROUND */,
                    size: "SMALL" /* Buttons.Button.Size.SMALL */,
                    iconName: 'thumb-down',
                    active: this.#selectedRating !== undefined && !this.#selectedRating,
                    title: i18nString(UIStrings.thumbsDown),
                }}
            @click=${this.#onRating}
          ></${Buttons.Button.Button.litTagName}>
        </div>

      </footer>`;
        }
        // clang-format on
    }
    #getHeader() {
        switch (this.#state.type) {
            case "sync-is-off" /* State.SYNC_IS_OFF */:
            case "not-logged-in" /* State.NOT_LOGGED_IN */:
            case "offline" /* State.OFFLINE */:
                return i18nString(UIStrings.notAvailable);
            case "loading" /* State.LOADING */:
                return i18nString(UIStrings.generating);
            case "insight" /* State.INSIGHT */:
                return i18nString(UIStrings.insight);
            case "error" /* State.ERROR */:
                return i18nString(UIStrings.error);
            case "consent" /* State.CONSENT */:
                return this.#actionTitle;
        }
    }
    #render() {
        // clang-format off
        render(html `
      <div class="wrapper">
        <header>
          <div class="filler">
            <h2>
              ${this.#getHeader()}
            </h2>
          </div>
          <div>
            <${Buttons.Button.Button.litTagName}
              .data=${{
            variant: "round" /* Buttons.Button.Variant.ROUND */,
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            iconName: 'cross',
            title: i18nString(UIStrings.closeInsight),
        }}
              jslog=${VisualLogging.close().track({ click: true })}
              @click=${this.#onClose}
            ></${Buttons.Button.Button.litTagName}>
          </div>
        </header>
        ${this.#renderMain()}
        ${this.#renderFooter()}
      </div>
    `, this.#shadow, {
            host: this,
        });
        // clang-format on
    }
}
class ConsoleInsightSourcesList extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-console-insight-sources-list`;
    #shadow = this.attachShadow({ mode: 'open' });
    #sources = [];
    constructor() {
        super();
        this.#shadow.adoptedStyleSheets = [listStyles];
    }
    #render() {
        // clang-format off
        render(html `
      <ul>
        ${Directives.repeat(this.#sources, item => item.value, item => {
            return html `<li><x-link class="link" title="${localizeType(item.type)} ${i18nString(UIStrings.opensInNewTab)}" href=${`data:text/plain,${encodeURIComponent(item.value)}`}>
            ${localizeType(item.type)}
            <${IconButton.Icon.Icon.litTagName} name="open-externally">
            </${IconButton.Icon.Icon.litTagName}>
          </x-link></li>`;
        })}
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
}
ComponentHelpers.CustomElements.defineComponent('devtools-console-insight', ConsoleInsight);
ComponentHelpers.CustomElements.defineComponent('devtools-console-insight-sources-list', ConsoleInsightSourcesList);
export class MarkdownRenderer extends MarkdownView.MarkdownView.MarkdownLitRenderer {
    renderToken(token) {
        const template = this.templateForToken(token);
        if (template === null) {
            return LitHtml.html `${token.raw}`;
        }
        return template;
    }
    templateForToken(token) {
        switch (token.type) {
            case 'heading':
                return html `<strong>${this.renderText(token)}</strong>`;
            case 'link':
            case 'image':
                return LitHtml.html `${UI.XLink.XLink.create(token.href, token.text, undefined, undefined, 'token')}`;
        }
        return super.templateForToken(token);
    }
}
//# sourceMappingURL=ConsoleInsight.js.map