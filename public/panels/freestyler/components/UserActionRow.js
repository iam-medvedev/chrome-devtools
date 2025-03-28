// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../core/common/common.js';
import * as Host from '../../../core/host/host.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as Input from '../../../ui/components/input/input.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import userActionRowStyles from './userActionRow.css.js';
const { html } = LitHtml;
/*
* Strings that don't need to be translated at this time.
*/
const UIStringsNotTranslate = {
    /**
     * @description The title of the button that allows submitting positive
     * feedback about the response for AI assistance.
     */
    thumbsUp: 'Good response',
    /**
     * @description The title of the button that allows submitting negative
     * feedback about the response for AI assistance.
     */
    thumbsDown: 'Bad response',
    /**
     * @description The placeholder text for the feedback input.
     */
    provideFeedbackPlaceholder: 'Provide additional feedback',
    /**
     * @description The disclaimer text that tells the user what will be shared
     * and what will be stored.
     */
    disclaimer: 'Submitted feedback will also include your conversation',
    /**
     * @description The button text for the action of submitting feedback.
     */
    submit: 'Submit',
    /**
     * @description The header of the feedback form asking.
     */
    whyThisRating: 'Why did you choose this rating? (optional)',
    /**
     * @description The button text for the action that hides the feedback form.
     */
    close: 'Close',
    /**
     * @description The title of the button that opens a page to report a legal
     * issue with the AI assistance message.
     */
    report: 'Report legal issue',
    /**
     * @description The title of the button for scrolling to see next suggestions
     */
    scrollToNext: 'Scroll to next suggestions',
    /**
     * @description The title of the button for scrolling to see previous suggestions
     */
    scrollToPrevious: 'Scroll to previous suggestions',
};
const lockedString = i18n.i18n.lockedString;
const REPORT_URL = 'https://support.google.com/legal/troubleshooter/1114905?hl=en#ts=1115658%2C13380504';
const SCROLL_ROUNDING_OFFSET = 1;
export class UserActionRow extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #props;
    #isShowingFeedbackForm = false;
    #currentRating;
    #isSubmitButtonDisabled = true;
    #suggestionsScrollContainerRef = LitHtml.Directives.createRef();
    #suggestionsLeftScrollButtonContainerRef = LitHtml.Directives.createRef();
    #suggestionsRightScrollButtonContainerRef = LitHtml.Directives.createRef();
    #suggestionsResizeObserver = new ResizeObserver(() => this.#handleSuggestionsScrollOrResize());
    #suggestionsEvaluateLayoutThrottler = new Common.Throttler.Throttler(50);
    constructor(props) {
        super();
        this.#props = props;
    }
    set props(props) {
        this.#props = props;
        this.#render();
        this.#evaluateSuggestionsLayout();
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [userActionRowStyles, Input.textInputStyles];
        this.#render();
        this.#evaluateSuggestionsLayout();
        if (this.#suggestionsScrollContainerRef.value) {
            this.#suggestionsResizeObserver.observe(this.#suggestionsScrollContainerRef.value);
        }
    }
    disconnectedCallback() {
        this.#suggestionsResizeObserver.disconnect();
    }
    #handleSuggestionsScrollOrResize = () => {
        void this.#suggestionsEvaluateLayoutThrottler.schedule(() => {
            this.#evaluateSuggestionsLayout();
            return Promise.resolve();
        });
    };
    #scrollSuggestionsScrollContainer = (direction) => {
        const suggestionsScrollContainer = this.#suggestionsScrollContainerRef.value;
        if (!suggestionsScrollContainer) {
            return;
        }
        suggestionsScrollContainer.scroll({
            top: 0,
            left: direction === 'left' ? suggestionsScrollContainer.scrollLeft - suggestionsScrollContainer.clientWidth :
                suggestionsScrollContainer.scrollLeft + suggestionsScrollContainer.clientWidth,
            behavior: 'smooth',
        });
    };
    #handleRateClick(rating) {
        if (this.#currentRating === rating) {
            this.#currentRating = undefined;
            this.#isShowingFeedbackForm = false;
            // This effectively reset the user rating
            this.#props.onFeedbackSubmit("SENTIMENT_UNSPECIFIED" /* Host.AidaClient.Rating.SENTIMENT_UNSPECIFIED */);
            this.#render();
            return;
        }
        this.#currentRating = rating;
        this.#isShowingFeedbackForm = this.#props.canShowFeedbackForm;
        this.#props.onFeedbackSubmit(this.#currentRating);
        this.#render();
    }
    #handleClose = () => {
        this.#isShowingFeedbackForm = false;
        this.#isSubmitButtonDisabled = true;
        this.#render();
    };
    #handleSubmit = (ev) => {
        ev.preventDefault();
        const input = this.#shadow.querySelector('.feedback-input');
        if (!this.#currentRating || !input || !input.value) {
            return;
        }
        this.#props.onFeedbackSubmit(this.#currentRating, input.value);
        this.#isShowingFeedbackForm = false;
        this.#isSubmitButtonDisabled = true;
        this.#render();
    };
    #handleReportClick = () => {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(REPORT_URL);
    };
    #renderButtons() {
        // clang-format off
        const rateButtons = html `
      <devtools-button
          .data=${{
            variant: "icon" /* Buttons.Button.Variant.ICON */,
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            iconName: 'thumb-up',
            toggledIconName: 'thumb-up-filled',
            toggled: this.#currentRating === "POSITIVE" /* Host.AidaClient.Rating.POSITIVE */,
            toggleType: "primary-toggle" /* Buttons.Button.ToggleType.PRIMARY */,
            title: lockedString(UIStringsNotTranslate.thumbsUp),
            jslogContext: 'thumbs-up',
        }}
          @click=${() => this.#handleRateClick("POSITIVE" /* Host.AidaClient.Rating.POSITIVE */)}
        ></devtools-button>
        <devtools-button
          .data=${{
            variant: "icon" /* Buttons.Button.Variant.ICON */,
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            iconName: 'thumb-down',
            toggledIconName: 'thumb-down-filled',
            toggled: this.#currentRating === "NEGATIVE" /* Host.AidaClient.Rating.NEGATIVE */,
            toggleType: "primary-toggle" /* Buttons.Button.ToggleType.PRIMARY */,
            title: lockedString(UIStringsNotTranslate.thumbsDown),
            jslogContext: 'thumbs-down',
        }}
          @click=${() => this.#handleRateClick("NEGATIVE" /* Host.AidaClient.Rating.NEGATIVE */)}
        ></devtools-button>
        <div class="vertical-separator"></div>`;
        // clang-format off
        // clang-format off
        return html `
    <div class="rate-buttons">
      ${this.#props.showRateButtons ? rateButtons : LitHtml.nothing}
      <devtools-button
        .data=${{
            variant: "icon" /* Buttons.Button.Variant.ICON */,
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            title: lockedString(UIStringsNotTranslate.report),
            iconName: 'report',
            jslogContext: 'report',
        }}
        @click=${this.#handleReportClick}
      ></devtools-button>
    </div>`;
        // clang-format on
    }
    #handleInputChange = (event) => {
        const value = event.target.value;
        const disableSubmit = !value;
        if (disableSubmit !== this.#isSubmitButtonDisabled) {
            this.#isSubmitButtonDisabled = disableSubmit;
            this.#render();
        }
    };
    #evaluateSuggestionsLayout = () => {
        const suggestionsScrollContainer = this.#suggestionsScrollContainerRef.value;
        const leftScrollButtonContainer = this.#suggestionsLeftScrollButtonContainerRef.value;
        const rightScrollButtonContainer = this.#suggestionsRightScrollButtonContainerRef.value;
        if (!suggestionsScrollContainer || !leftScrollButtonContainer || !rightScrollButtonContainer) {
            return;
        }
        const shouldShowLeftButton = suggestionsScrollContainer.scrollLeft > SCROLL_ROUNDING_OFFSET;
        const shouldShowRightButton = suggestionsScrollContainer.scrollLeft + suggestionsScrollContainer.offsetWidth + SCROLL_ROUNDING_OFFSET <
            suggestionsScrollContainer.scrollWidth;
        leftScrollButtonContainer.classList.toggle('hidden', !shouldShowLeftButton);
        rightScrollButtonContainer.classList.toggle('hidden', !shouldShowRightButton);
    };
    #renderFeedbackForm() {
        if (!this.#isShowingFeedbackForm) {
            return LitHtml.nothing;
        }
        // clang-format off
        return html `
      <form class="feedback-form" @submit=${this.#handleSubmit}>
        <div class="feedback-header">
          <h4 class="feedback-title">${lockedString(UIStringsNotTranslate.whyThisRating)}</h4>
          <devtools-button
            aria-label=${lockedString(UIStringsNotTranslate.close)}
            @click=${this.#handleClose}
            .data=${{
            variant: "icon" /* Buttons.Button.Variant.ICON */,
            iconName: 'cross',
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            title: lockedString(UIStringsNotTranslate.close),
            jslogContext: 'close',
        }}
          ></devtools-button>
        </div>
        <input
          type="text"
          class="devtools-text-input feedback-input"
          @input=${this.#handleInputChange}
          placeholder=${lockedString(UIStringsNotTranslate.provideFeedbackPlaceholder)}
          jslog=${VisualLogging.textField('feedback').track({ keydown: 'Enter' })}
        >
        <span class="feedback-disclaimer">${lockedString(UIStringsNotTranslate.disclaimer)}</span>
        <div>
          <devtools-button
          aria-label=${lockedString(UIStringsNotTranslate.submit)}
          .data=${{
            type: 'submit',
            disabled: this.#isSubmitButtonDisabled,
            variant: "outlined" /* Buttons.Button.Variant.OUTLINED */,
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            title: lockedString(UIStringsNotTranslate.submit),
            jslogContext: 'send',
        }}
          >${lockedString(UIStringsNotTranslate.submit)}</devtools-button>
        </div>
      </div>
    </form>
    `;
        // clang-format on
    }
    #renderSuggestions() {
        if (!this.#props.suggestions) {
            return LitHtml.nothing;
        }
        // clang-format off
        return html `<div class="suggestions-container">
      <div class="scroll-button-container left hidden" ${LitHtml.Directives.ref(this.#suggestionsLeftScrollButtonContainerRef)}>
        <devtools-button
          class='scroll-button'
          .data=${{
            variant: "icon" /* Buttons.Button.Variant.ICON */,
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            iconName: 'chevron-left',
            title: lockedString(UIStringsNotTranslate.scrollToPrevious),
            jslogContext: 'chevron-left',
        }}
          @click=${() => this.#scrollSuggestionsScrollContainer('left')}
        ></devtools-button>
      </div>
      <div class="suggestions-scroll-container" @scroll=${this.#handleSuggestionsScrollOrResize} ${LitHtml.Directives.ref(this.#suggestionsScrollContainerRef)}>
        ${this.#props.suggestions?.map(suggestion => html `<devtools-button
          class='suggestion'
          .data=${{
            variant: "outlined" /* Buttons.Button.Variant.OUTLINED */,
            title: suggestion,
            jslogContext: 'suggestion',
        }}
          @click=${() => this.#props.handleSuggestionClick(suggestion)}
        >${suggestion}</devtools-button>`)}
      </div>
      <div class="scroll-button-container right hidden" ${LitHtml.Directives.ref(this.#suggestionsRightScrollButtonContainerRef)}>
        <devtools-button
          class='scroll-button'
          .data=${{
            variant: "icon" /* Buttons.Button.Variant.ICON */,
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            iconName: 'chevron-right',
            title: lockedString(UIStringsNotTranslate.scrollToNext),
            jslogContext: 'chevron-right',
        }}
          @click=${() => this.#scrollSuggestionsScrollContainer('right')}
        ></devtools-button>
      </div>
    </div>`;
        // clang-format on
    }
    #render() {
        // clang-format off
        LitHtml.render(html `
        <div class="feedback">
          ${this.#renderButtons()}
          ${this.#renderSuggestions()}
        </div>
        ${this.#renderFeedbackForm()}
      `, this.#shadow, { host: this });
        // clang-format on
    }
}
customElements.define('devtools-user-action-row', UserActionRow);
//# sourceMappingURL=UserActionRow.js.map