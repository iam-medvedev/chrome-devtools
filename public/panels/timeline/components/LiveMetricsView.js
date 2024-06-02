// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../core/common/common.js';
import * as LiveMetrics from '../../../models/live-metrics/live-metrics.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
const { html, nothing, Directives } = LitHtml;
const { until } = Directives;
export class LiveMetricsView extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-live-metrics-view`;
    #shadow = this.attachShadow({ mode: 'open' });
    #liveMetrics = new LiveMetrics.LiveMetrics();
    #lcpValue;
    #clsValue;
    #inpValue;
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
    #renderLcpData(lcpValue) {
        return html `
      <div class="lcp-data">
        <span>LCP: ${Math.round(lcpValue.value)}</span>
        ${lcpValue.node ? until(Common.Linkifier.Linkifier.linkify(lcpValue.node)) : nothing}
      </div>
    `;
    }
    #render = () => {
        const output = html `
      <div class="live-lcp">
        ${this.#lcpValue ? this.#renderLcpData(this.#lcpValue) : nothing}
      </div>
      <div class="live-cls">
        ${this.#clsValue ? html `<div class="cls-data">CLS: ${this.#clsValue.value.toFixed(3)}</div>` : nothing}
      </div>
      <div class="live-inp">
        ${this.#inpValue ? html `<div class="inp-data">INP: ${this.#inpValue.value}</div>` : nothing}
      </div>
    `;
        LitHtml.render(output, this.#shadow, { host: this });
    };
}
customElements.define('devtools-live-metrics-view', LiveMetricsView);
//# sourceMappingURL=LiveMetricsView.js.map