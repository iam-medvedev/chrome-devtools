// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import * as Platform from '../../../core/platform/platform.js';
import * as CrUXManager from '../../../models/crux-manager/crux-manager.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import metricCardStyles from './metricCard.css.js';
import { renderCompareText, renderDetailedCompareText } from './MetricCompareStrings.js';
import metricValueStyles from './metricValueStyles.css.js';
import { CLS_THRESHOLDS, INP_THRESHOLDS, LCP_THRESHOLDS, rateMetric, renderMetricValue, } from './Utils.js';
const { html, nothing } = LitHtml;
const UIStrings = {
    /**
     * @description Title of a report section for the largest contentful paint metric.
     */
    lcpTitle: 'Largest Contentful Paint (LCP)',
    /**
     * @description Title of a report section for the cumulative layout shift metric.
     */
    clsTitle: 'Cumulative Layout Shift (CLS)',
    /**
     * @description Title of a report section for the interaction to next paint metric.
     */
    inpTitle: 'Interaction to Next Paint (INP)',
    /**
     * @description Label for a metric value that was measured in the local environment.
     */
    localValue: 'Local',
    /**
     * @description Label for the 75th percentile of a metric according to data collected from real users in the field.
     */
    field75thPercentile: 'Field 75th Percentile',
    /**
     * @description Text label for values that are classified as "good".
     */
    good: 'Good',
    /**
     * @description Text label for values that are classified as "needs improvement".
     */
    needsImprovement: 'Needs improvement',
    /**
     * @description Text label for values that are classified as "poor".
     */
    poor: 'Poor',
    /**
     * @description Text label for a range of values that are less than or equal to a certain value.
     * @example {500 ms} PH1
     */
    leqRange: '(≤{PH1})',
    /**
     * @description Text label for a range of values that are between two values.
     * @example {500 ms} PH1
     * @example {800 ms} PH2
     */
    betweenRange: '({PH1}-{PH2})',
    /**
     * @description Text label for a range of values that are greater than a certain value.
     * @example {500 ms} PH1
     */
    gtRange: '(>{PH1})',
    /**
     * @description Text for a percentage value in the live metrics view.
     * @example {13} PH1
     */
    percentage: '{PH1}%',
    /**
     * @description Text instructing the user to interact with the page because a user interaction is required to measure Interaction to Next Paint (INP).
     */
    interactToMeasure: 'Interact with the page to measure INP.',
    /**
     * @description Label for a tooltip that provides more details.
     */
    viewCardDetails: 'View card details',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/MetricCard.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class MetricCard extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-metric-card`;
    #shadow = this.attachShadow({ mode: 'open' });
    constructor() {
        super();
        this.#render();
    }
    #tooltipEl;
    #data = {
        metric: 'LCP',
    };
    set data(data) {
        this.#data = data;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [metricCardStyles, metricValueStyles];
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    #hideTooltipOnEsc = (event) => {
        if (Platform.KeyboardUtilities.isEscKey(event)) {
            event.stopPropagation();
            this.#hideTooltip();
        }
    };
    #hideTooltipOnMouseLeave(event) {
        const target = event.target;
        if (target?.hasFocus()) {
            return;
        }
        this.#hideTooltip();
    }
    #hideTooltipOnFocusOut(event) {
        const target = event.target;
        if (target?.hasFocus()) {
            return;
        }
        const relatedTarget = event.relatedTarget;
        if (relatedTarget instanceof Node && target.contains(relatedTarget)) {
            // `focusout` bubbles so we should get another event once focus leaves `relatedTarget`
            return;
        }
        this.#hideTooltip();
    }
    #hideTooltip() {
        const tooltipEl = this.#tooltipEl;
        if (!tooltipEl) {
            return;
        }
        document.body.removeEventListener('keydown', this.#hideTooltipOnEsc);
        tooltipEl.style.left = '';
        tooltipEl.style.maxWidth = '';
        tooltipEl.style.display = 'none';
    }
    #showTooltip() {
        const tooltipEl = this.#tooltipEl;
        if (!tooltipEl || tooltipEl.style.display === 'block') {
            return;
        }
        document.body.addEventListener('keydown', this.#hideTooltipOnEsc);
        tooltipEl.style.display = 'block';
        const container = this.#data.tooltipContainer;
        if (!container) {
            return;
        }
        const containerBox = container.getBoundingClientRect();
        tooltipEl.style.setProperty('--tooltip-container-width', `${Math.round(containerBox.width)}px`);
        requestAnimationFrame(() => {
            let offset = 0;
            const tooltipBox = tooltipEl.getBoundingClientRect();
            const rightDiff = tooltipBox.right - containerBox.right;
            const leftDiff = tooltipBox.left - containerBox.left;
            if (leftDiff < 0) {
                offset = Math.round(leftDiff);
            }
            else if (rightDiff > 0) {
                offset = Math.round(rightDiff);
            }
            tooltipEl.style.left = `calc(50% - ${offset}px)`;
        });
    }
    #getCompareThreshold() {
        switch (this.#data.metric) {
            case 'LCP':
                return 1000;
            case 'CLS':
                return 0.1;
            case 'INP':
                return 200;
        }
    }
    #getTitle() {
        switch (this.#data.metric) {
            case 'LCP':
                return i18nString(UIStrings.lcpTitle);
            case 'CLS':
                return i18nString(UIStrings.clsTitle);
            case 'INP':
                return i18nString(UIStrings.inpTitle);
        }
    }
    #getThresholds() {
        switch (this.#data.metric) {
            case 'LCP':
                return LCP_THRESHOLDS;
            case 'CLS':
                return CLS_THRESHOLDS;
            case 'INP':
                return INP_THRESHOLDS;
        }
    }
    #getFormatFn() {
        switch (this.#data.metric) {
            case 'LCP':
                return v => i18n.TimeUtilities.millisToString(v);
            case 'CLS':
                return v => v === 0 ? '0' : v.toFixed(2);
            case 'INP':
                return v => i18n.TimeUtilities.millisToString(v);
        }
    }
    #getLocalValue() {
        const { localValue } = this.#data;
        if (localValue === undefined) {
            return;
        }
        return localValue;
    }
    #getFieldValue() {
        let { fieldValue } = this.#data;
        if (fieldValue === undefined) {
            return;
        }
        if (typeof fieldValue === 'string') {
            fieldValue = Number(fieldValue);
        }
        if (!Number.isFinite(fieldValue)) {
            return;
        }
        return fieldValue;
    }
    #getCompareRating() {
        const localValue = this.#getLocalValue();
        const fieldValue = this.#getFieldValue();
        if (localValue === undefined || fieldValue === undefined) {
            return;
        }
        const thresholds = this.#getThresholds();
        const localRating = rateMetric(localValue, thresholds);
        const fieldRating = rateMetric(fieldValue, thresholds);
        // It's not worth highlighting a significant difference when both #s
        // are rated "good"
        if (localRating === 'good' && fieldRating === 'good') {
            return 'similar';
        }
        const compareThreshold = this.#getCompareThreshold();
        if (localValue - fieldValue > compareThreshold) {
            return 'worse';
        }
        if (fieldValue - localValue > compareThreshold) {
            return 'better';
        }
        return 'similar';
    }
    #renderCompareString() {
        const localValue = this.#getLocalValue();
        if (localValue === undefined) {
            if (this.#data.metric === 'INP') {
                return html `
          <div class="compare-text">${i18nString(UIStrings.interactToMeasure)}</div>
        `;
            }
            return LitHtml.nothing;
        }
        const compare = this.#getCompareRating();
        const rating = rateMetric(localValue, this.#getThresholds());
        const valueEl = renderMetricValue(this.#getMetricValueLogContext(true), localValue, this.#getThresholds(), this.#getFormatFn(), { dim: true });
        // clang-format off
        return html `
      <div class="compare-text">
        ${renderCompareText({
            metric: this.#data.metric,
            rating,
            compare,
            localValue: valueEl,
        })}
      </div>
    `;
        // clang-format on
    }
    #getMetricValueLogContext(isLocal) {
        return `timeline.landing.${isLocal ? 'local' : 'field'}-${this.#data.metric.toLowerCase()}`;
    }
    #renderDetailedCompareString() {
        const localValue = this.#getLocalValue();
        if (localValue === undefined) {
            if (this.#data.metric === 'INP') {
                return html `
          <div class="detailed-compare-text">${i18nString(UIStrings.interactToMeasure)}</div>
        `;
            }
            return LitHtml.nothing;
        }
        const localRating = rateMetric(localValue, this.#getThresholds());
        const fieldValue = this.#getFieldValue();
        const fieldRating = fieldValue !== undefined ? rateMetric(fieldValue, this.#getThresholds()) : undefined;
        const localValueEl = renderMetricValue(this.#getMetricValueLogContext(true), localValue, this.#getThresholds(), this.#getFormatFn(), { dim: true });
        const fieldValueEl = renderMetricValue(this.#getMetricValueLogContext(false), fieldValue, this.#getThresholds(), this.#getFormatFn(), { dim: true });
        // clang-format off
        return html `
      <div class="detailed-compare-text">${renderDetailedCompareText({
            metric: this.#data.metric,
            localRating,
            fieldRating,
            localValue: localValueEl,
            fieldValue: fieldValueEl,
            percent: this.#getPercentLabelForRating(localRating),
        })}</div>
    `;
        // clang-format on
    }
    #bucketIndexForRating(rating) {
        switch (rating) {
            case 'good':
                return 0;
            case 'needs-improvement':
                return 1;
            case 'poor':
                return 2;
        }
    }
    #getBarWidthForRating(rating) {
        const histogram = this.#data.histogram;
        const density = histogram?.[this.#bucketIndexForRating(rating)].density || 0;
        const percent = Math.round(density * 100);
        return `${percent}%`;
    }
    #getPercentLabelForRating(rating) {
        const histogram = this.#data.histogram;
        if (histogram === undefined) {
            return '-';
        }
        // A missing density value should be interpreted as 0%
        const density = histogram[this.#bucketIndexForRating(rating)].density || 0;
        const percent = Math.round(density * 100);
        return i18nString(UIStrings.percentage, { PH1: percent });
    }
    #renderFieldHistogram() {
        const fieldEnabled = CrUXManager.CrUXManager.instance().getConfigSetting().get().enabled;
        const format = this.#getFormatFn();
        const thresholds = this.#getThresholds();
        // clang-format off
        const goodLabel = html `
      <div class="bucket-label">
        <span>${i18nString(UIStrings.good)}</span>
        <span class="bucket-range">${i18nString(UIStrings.leqRange, { PH1: format(thresholds[0]) })}</span>
      </div>
    `;
        const needsImprovementLabel = html `
      <div class="bucket-label">
        <span>${i18nString(UIStrings.needsImprovement)}</span>
        <span class="bucket-range">${i18nString(UIStrings.betweenRange, { PH1: format(thresholds[0]), PH2: format(thresholds[1]) })}</span>
      </div>
    `;
        const poorLabel = html `
      <div class="bucket-label">
        <span>${i18nString(UIStrings.poor)}</span>
        <span class="bucket-range">${i18nString(UIStrings.gtRange, { PH1: format(thresholds[1]) })}</span>
      </div>
    `;
        // clang-format on
        if (!fieldEnabled) {
            return html `
        <div class="bucket-summaries">
          ${goodLabel}
          ${needsImprovementLabel}
          ${poorLabel}
        </div>
      `;
        }
        // clang-format off
        return html `
      <div class="bucket-summaries histogram">
        ${goodLabel}
        <div class="histogram-bar good-bg" style="width: ${this.#getBarWidthForRating('good')}"></div>
        <div class="histogram-percent">${this.#getPercentLabelForRating('good')}</div>
        ${needsImprovementLabel}
        <div class="histogram-bar needs-improvement-bg" style="width: ${this.#getBarWidthForRating('needs-improvement')}"></div>
        <div class="histogram-percent">${this.#getPercentLabelForRating('needs-improvement')}</div>
        ${poorLabel}
        <div class="histogram-bar poor-bg" style="width: ${this.#getBarWidthForRating('poor')}"></div>
        <div class="histogram-percent">${this.#getPercentLabelForRating('poor')}</div>
      </div>
    `;
        // clang-format on
    }
    #render = () => {
        const fieldEnabled = CrUXManager.CrUXManager.instance().getConfigSetting().get().enabled;
        // clang-format off
        const output = html `
      <div class="metric-card">
        <h3 class="title">
          ${this.#getTitle()}
        </h3>
        <div tabindex="0" class="metric-values-section"
          @mouseenter=${this.#showTooltip}
          @mouseleave=${this.#hideTooltipOnMouseLeave}
          @focusin=${this.#showTooltip}
          @focusout=${this.#hideTooltipOnFocusOut}
          aria-describedby="tooltip"
        >
          <div class="metric-source-block">
            <div class="metric-source-value" id="local-value">${renderMetricValue(this.#getMetricValueLogContext(true), this.#getLocalValue(), this.#getThresholds(), this.#getFormatFn())}</div>
            ${fieldEnabled ? html `<div class="metric-source-label">${i18nString(UIStrings.localValue)}</div>` : nothing}
          </div>
          ${fieldEnabled ? html `
            <div class="metric-source-block">
              <div class="metric-source-value" id="field-value">${renderMetricValue(this.#getMetricValueLogContext(false), this.#getFieldValue(), this.#getThresholds(), this.#getFormatFn())}</div>
              <div class="metric-source-label">${i18nString(UIStrings.field75thPercentile)}</div>
            </div>
          ` : nothing}
          <div
            id="tooltip"
            class="tooltip"
            role="tooltip"
            aria-label=${i18nString(UIStrings.viewCardDetails)}
            on-render=${ComponentHelpers.Directives.nodeRenderedCallback(node => {
            this.#tooltipEl = node;
        })}
          >
            ${this.#renderDetailedCompareString()}
            <hr class="divider">
            ${this.#renderFieldHistogram()}
          </div>
        </div>
        ${fieldEnabled ? html `<hr class="divider">` : nothing}
        ${this.#renderCompareString()}
        <slot name="extra-info"><slot>
      </div>
    `;
        LitHtml.render(output, this.#shadow, { host: this });
    };
}
customElements.define('devtools-metric-card', MetricCard);
//# sourceMappingURL=MetricCard.js.map