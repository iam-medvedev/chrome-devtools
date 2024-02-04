// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../../core/host/host.js';
import * as i18n from '../../../core/i18n/i18n.js';
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
    generating: 'Generating…',
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
    sources: 'Sources',
    /**
     * @description The title of the button that allows submitting positive
     * feedback about the console insight.
     */
    thumbUp: 'Thumb up',
    /**
     * @description The title of the button that allows submitting negative
     * feedback about the console insight.
     */
    thumbDown: 'Thumb down',
    /**
     * @description The title of the link that allows submitting more feedback.
     */
    submitFeedback: 'Submit feedback',
    /**
     * @description The title indicating the dogfood phase of the feature.
     */
    dogfood: 'Dogfood',
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
    disclaimer: 'The following data will be sent to Google servers to generate tailored tips and suggestions. It may be stored, reviewed by humans, or used to train AI models.',
    /**
     * @description The title of the button that records the consent of the user
     * to send the data to the backend.
     */
    consentButton: 'Continue',
    /**
     * @description The title of a link that allows the user to learn more about
     * the feature.
     */
    learnMore: 'Learn more',
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
    static litTagName = LitHtml.literal `devtools-console-insight`;
    #shadow = this.attachShadow({ mode: 'open' });
    #actionName = '';
    #promptBuilder;
    #insightProvider;
    #renderer = new MarkdownRenderer();
    // Main state.
    #state = {
        type: "loading" /* State.LOADING */,
        consentGiven: false,
    };
    // Rating sub-form state.
    #selectedRating;
    constructor(promptBuilder, insightProvider) {
        super();
        this.#promptBuilder = promptBuilder;
        this.#insightProvider = insightProvider;
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
    }
    set actionName(value) {
        this.#actionName = value;
        this.#render();
    }
    #transitionTo(newState) {
        const previousState = this.#state;
        this.#state = newState;
        if (newState.type !== previousState.type && previousState.type === "loading" /* State.LOADING */) {
            this.classList.add('loaded');
        }
        this.#render();
    }
    async update() {
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
            const { prompt, sources } = await this.#promptBuilder.buildPrompt();
            const explanation = await this.#insightProvider.getInsights(prompt);
            this.#transitionTo({
                type: "insight" /* State.INSIGHT */,
                tokens: Marked.Marked.lexer(explanation),
                explanation,
                sources,
            });
        }
        catch (err) {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightErrored);
            this.#transitionTo({
                type: "error" /* State.ERROR */,
                error: err.message,
            });
        }
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
          <${MarkdownView.MarkdownView.MarkdownView.litTagName}
            .data=${{ tokens: this.#state.tokens, renderer: this.#renderer }}>
          </${MarkdownView.MarkdownView.MarkdownView.litTagName}>
          <details style="--list-height: ${this.#state.sources.length * 20}px;">
            <summary>${i18nString(UIStrings.sources)}</summary>
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
            <p>${i18nString(UIStrings.disclaimer)} <x-link href=${DOGFOODINFO_URL} class="link">${i18nString(UIStrings.learnMore)}</x-link></p>
            <${ConsoleInsightSourcesList.litTagName} .sources=${this.#state.sources}>
            </${ConsoleInsightSourcesList.litTagName}>
          </main>
        `;
        }
        // clang-format on
    }
    #renderFooter() {
        // clang-format off
        switch (this.#state.type) {
            case "loading" /* State.LOADING */:
            case "error" /* State.ERROR */:
                return LitHtml.nothing;
            case "consent" /* State.CONSENT */:
                return html `<footer>
          <div class="filler">
          </div>
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
        <div class="dogfood-feedback">
          <${IconButton.Icon.Icon.litTagName} name="dog-paw"></${IconButton.Icon.Icon.litTagName}>
          <span>${i18nString(UIStrings.dogfood)} - <x-link href=${DOGFOODFEEDBACK_URL} class="link">${i18nString(UIStrings.submitFeedback)}</x-link></span>
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
                    title: i18nString(UIStrings.thumbUp),
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
                    title: i18nString(UIStrings.thumbDown),
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
            case "loading" /* State.LOADING */:
                return i18nString(UIStrings.generating);
            case "insight" /* State.INSIGHT */:
                return i18nString(UIStrings.insight);
            case "error" /* State.ERROR */:
                return i18nString(UIStrings.error);
            case "consent" /* State.CONSENT */:
                return this.#actionName;
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
            const icon = new IconButton.Icon.Icon();
            icon.data = { iconName: 'open-externally', color: 'var(--sys-color-primary)', width: '14px', height: '14px' };
            return html `<li><x-link class="link" title="${localizeType(item.type)} ${i18nString(UIStrings.opensInNewTab)}" href=${`data:text/plain,${encodeURIComponent(item.value)}`}>${localizeType(item.type)}${icon}</x-link></li>`;
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
            console.warn(`Markdown token type '${token.type}' not supported.`);
            return LitHtml.html ``;
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