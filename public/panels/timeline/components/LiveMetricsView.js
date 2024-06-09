// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../core/common/common.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as LiveMetrics from '../../../models/live-metrics/live-metrics.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import liveMetricsViewStyles from './liveMetricsView.css.js';
const { html, nothing, Directives } = LitHtml;
const { until, classMap } = Directives;
export class LiveMetricsNextSteps extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-live-metrics-next-steps`;
    #shadow = this.attachShadow({ mode: 'open' });
    constructor() {
        super();
        this.#render();
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [liveMetricsViewStyles];
    }
    #render() {
        const output = html `
      <div class="next-steps">
        <h3>Next steps</h3>
      </div>
    `;
        LitHtml.render(output, this.#shadow, { host: this });
    }
}
export class LiveMetricsView extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-live-metrics-view`;
    #shadow = this.attachShadow({ mode: 'open' });
    #liveMetrics = new LiveMetrics.LiveMetrics();
    #lcpValue;
    #clsValue;
    #inpValue;
    constructor() {
        super();
        this.#render();
    }
    #onReset = () => {
        this.#lcpValue = undefined;
        this.#clsValue = undefined;
        this.#inpValue = undefined;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    };
    #onLcpChange = (event) => {
        this.#lcpValue = event.data;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    };
    #onClsChange = (event) => {
        this.#clsValue = event.data;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    };
    #onInpChange = (event) => {
        this.#inpValue = event.data;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    };
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [liveMetricsViewStyles];
        this.#liveMetrics.addEventListener("reset" /* LiveMetrics.Events.Reset */, this.#onReset);
        this.#liveMetrics.addEventListener("lcp_changed" /* LiveMetrics.Events.LCPChanged */, this.#onLcpChange);
        this.#liveMetrics.addEventListener("cls_changed" /* LiveMetrics.Events.CLSChanged */, this.#onClsChange);
        this.#liveMetrics.addEventListener("inp_changed" /* LiveMetrics.Events.INPChanged */, this.#onInpChange);
    }
    disconnectedCallback() {
        this.#liveMetrics.removeEventListener("reset" /* LiveMetrics.Events.Reset */, this.#onReset);
        this.#liveMetrics.removeEventListener("lcp_changed" /* LiveMetrics.Events.LCPChanged */, this.#onLcpChange);
        this.#liveMetrics.removeEventListener("cls_changed" /* LiveMetrics.Events.CLSChanged */, this.#onClsChange);
        this.#liveMetrics.removeEventListener("inp_changed" /* LiveMetrics.Events.INPChanged */, this.#onInpChange);
    }
    #renderLiveLcp(lcpValue) {
        const title = 'Largest Contentful Paint (LCP)';
        if (!lcpValue) {
            return this.#renderLiveMetric(title);
        }
        return this.#renderLiveMetric(title, i18n.TimeUtilities.millisToString(lcpValue.value), lcpValue.rating, lcpValue?.node);
    }
    #renderLiveCls(clsValue) {
        const title = 'Cumulative Layout Shift (CLS)';
        if (!clsValue) {
            return this.#renderLiveMetric(title);
        }
        return this.#renderLiveMetric(title, clsValue.value === 0 ? '0' : clsValue.value.toFixed(3), clsValue.rating);
    }
    #renderLiveInp(inpValue) {
        const title = 'Interaction to Next Paint (INP)';
        if (!inpValue) {
            return this.#renderLiveMetric(title);
        }
        return this.#renderLiveMetric(title, i18n.TimeUtilities.millisToString(inpValue.value), inpValue.rating, inpValue.node);
    }
    #renderLiveMetric(title, valueStr, rating, node) {
        const ratingClass = rating || 'waiting';
        // clang-format off
        return html `
      <div class="metric-card">
        <div class="metric-card-title">${title}</div>
        <div class=${classMap({
            'metric-card-value': true,
            [ratingClass]: true,
        })}>
          ${valueStr || '-'}
        </div>
        <div class="metric-card-element">
          ${node ? html `
              <div class="metric-card-section-title">Related node</div>
              <div>${until(Common.Linkifier.Linkifier.linkify(node))}</div>`
            : nothing}
        </div>
      </div>
    `;
        // clang-format on
    }
    #render = () => {
        const output = html `
      <div class="live-metrics">
        <h3>Local and Field Metrics</h3>
        <div class="metric-cards">
          <div>
            ${this.#renderLiveLcp(this.#lcpValue)}
          </div>
          <div>
            ${this.#renderLiveCls(this.#clsValue)}
          </div>
          <div>
            ${this.#renderLiveInp(this.#inpValue)}
          </div>
        </div>
        <h3>Interactions</h3>
      </div>
    `;
        LitHtml.render(output, this.#shadow, { host: this });
    };
}
customElements.define('devtools-live-metrics-view', LiveMetricsView);
customElements.define('devtools-live-metrics-next-steps', LiveMetricsNextSteps);
//# sourceMappingURL=LiveMetricsView.js.map