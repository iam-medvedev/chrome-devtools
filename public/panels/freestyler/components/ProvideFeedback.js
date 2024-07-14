// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../../core/host/host.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as Input from '../../../ui/components/input/input.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import provideFeedbackStyles from './provideFeedback.css.js';
/*
  * TODO(nvitkov): b/346933425
  * Temporary string that should not be translated
  * as they may change often during development.
  */
const TempUIStrings = {
    /**
     * @description The title of the button that allows submitting positive
     * feedback about the response for freestyler.
     */
    thumbsUp: 'Thumbs up',
    /**
     * @description The title of the button that allows submitting negative
     * feedback about the response for freestyler.
     */
    thumbsDown: 'Thumbs down',
    /**
     * @description The placeholder text for the feedback input.
     */
    provideFeedbackPlaceholder: 'Provide additional feedback',
    /**
     * @description The disclaimer text that tells the user what will be shared
     * and what will be stored.
     */
    disclaimer: 'Feedback submitted will also include your conversation.',
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
};
// const str_ = i18n.i18n.registerUIStrings('panels/freestyler/components/AiRatings.ts', UIStrings);
// const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
/* eslint-disable  rulesdir/l10n_i18nString_call_only_with_uistrings */
const i18nString = i18n.i18n.lockedString;
export class ProvideFeedback extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-provide-feedback`;
    #shadow = this.attachShadow({ mode: 'open' });
    #props;
    #showFeedbackForm = false;
    #currentRating;
    constructor(props) {
        super();
        this.#props = props;
    }
    set props(props) {
        this.#props = props;
        this.#render();
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [provideFeedbackStyles, Input.textInputStyles];
        this.#render();
    }
    #handleRateClick(rating) {
        if (this.#currentRating) {
            return;
        }
        this.#currentRating = rating;
        this.#showFeedbackForm = true;
        this.#props.onRateClick(this.#currentRating);
        this.#render();
    }
    #handleClose = () => {
        this.#showFeedbackForm = false;
        this.#render();
    };
    #handleSubmit = (ev) => {
        ev.preventDefault();
        const input = this.#shadow.querySelector('.feedback-input');
        if (!this.#currentRating || !input || !input.value) {
            return;
        }
        this.#props.onFeedbackSubmit(input.value);
        this.#showFeedbackForm = false;
        this.#render();
    };
    #renderButtons() {
        // clang-format off
        return LitHtml.html `
      <${Buttons.Button.Button.litTagName}
        .data=${{
            variant: "icon" /* Buttons.Button.Variant.ICON */,
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            iconName: 'thumb-up',
            active: this.#currentRating === "POSITIVE" /* Host.AidaClient.Rating.POSITIVE */,
            disabled: this.#currentRating && this.#currentRating !== "POSITIVE" /* Host.AidaClient.Rating.POSITIVE */,
            title: i18nString(TempUIStrings.thumbsUp),
            jslogContext: 'thumbs-up',
        }}
        @click=${() => this.#handleRateClick("POSITIVE" /* Host.AidaClient.Rating.POSITIVE */)}
      ></${Buttons.Button.Button.litTagName}>
      <${Buttons.Button.Button.litTagName}
        .data=${{
            variant: "icon" /* Buttons.Button.Variant.ICON */,
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            iconName: 'thumb-down',
            active: this.#currentRating === "NEGATIVE" /* Host.AidaClient.Rating.NEGATIVE */,
            disabled: this.#currentRating && this.#currentRating !== "NEGATIVE" /* Host.AidaClient.Rating.NEGATIVE */,
            title: i18nString(TempUIStrings.thumbsDown),
            jslogContext: 'thumbs-down',
        }}
        @click=${() => this.#handleRateClick("NEGATIVE" /* Host.AidaClient.Rating.NEGATIVE */)}
      ></${Buttons.Button.Button.litTagName}>
    `;
        // clang-format on
    }
    #renderFeedbackForm() {
        // clang-format off
        return LitHtml.html `
      <form class="feedback" @submit=${this.#handleSubmit}>
        <div class="feedback-header">
          <h4 class="feedback-title">${i18nString(TempUIStrings.whyThisRating)}</h4>
          <${Buttons.Button.Button.litTagName}
            aria-label=${i18nString(TempUIStrings.close)}
            @click=${this.#handleClose}
            .data=${{
            variant: "icon" /* Buttons.Button.Variant.ICON */,
            iconName: 'cross',
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            title: i18nString(TempUIStrings.close),
            jslogContext: 'close',
        }}
          ></${Buttons.Button.Button.litTagName}>
        </div>
        <input
          type="text"
          class="devtools-text-input feedback-input"
          placeholder=${i18nString(TempUIStrings.provideFeedbackPlaceholder)}
        >
        <span class="feedback-disclaimer">${i18nString(TempUIStrings.disclaimer)}</span>
        <${Buttons.Button.Button.litTagName}
        aria-label=${i18nString(TempUIStrings.submit)}
        .data=${{
            type: 'submit',
            variant: "outlined" /* Buttons.Button.Variant.OUTLINED */,
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            title: i18nString(TempUIStrings.submit),
            jslogContext: 'send',
        }}
        >${i18nString(TempUIStrings.submit)}</${Buttons.Button.Button.litTagName}>
      </div>
    `;
        // clang-format on
    }
    #render() {
        // clang-format off
        LitHtml.render(LitHtml.html `
        <div class="rate-buttons">
          ${this.#renderButtons()}
          ${this.#showFeedbackForm
            ? this.#renderFeedbackForm()
            : LitHtml.nothing}
        </div>`, this.#shadow, { host: this });
        // clang-format on
    }
}
customElements.define('devtools-provide-feedback', ProvideFeedback);
//# sourceMappingURL=ProvideFeedback.js.map