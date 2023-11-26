// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TraceEngine from '../../../models/trace/trace.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as IconButton from '../../../ui/components/icon_button/icon_button.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import { flattenBreadcrumbs } from './Breadcrumbs.js';
import breadcrumbsUIStyles from './breadcrumbsUI.css.js';
const { render, html } = LitHtml;
export class BreadcrumbRemovedEvent extends Event {
    breadcrumb;
    static eventName = 'breadcrumbremoved';
    constructor(breadcrumb) {
        super(BreadcrumbRemovedEvent.eventName);
        this.breadcrumb = breadcrumb;
    }
}
export class BreadcrumbsUI extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-breadcrumbs-ui`;
    #shadow = this.attachShadow({ mode: 'open' });
    #boundRender = this.#render.bind(this);
    #traceWindow = {
        min: TraceEngine.Types.Timing.MicroSeconds(0),
        max: TraceEngine.Types.Timing.MicroSeconds(0),
        range: TraceEngine.Types.Timing.MicroSeconds(0),
    };
    #breadcrumb = { window: this.#traceWindow, child: null };
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [breadcrumbsUIStyles];
    }
    set data(data) {
        this.#breadcrumb = data.breadcrumb;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    #removeBreadcrumb(breadcrumb) {
        this.dispatchEvent(new BreadcrumbRemovedEvent(breadcrumb));
    }
    #renderElement(breadcrumb, index) {
        // clang-format off
        return html `
          <div class="breadcrumb" @click=${() => this.#removeBreadcrumb(breadcrumb)}>
           <span class="${(index !== 0 && breadcrumb.child === null) ? 'last-breadcrumb' : ''} range">
            ${(index === 0) ?
            `Full range (${(breadcrumb.window.range).toFixed(2)}ms)` :
            `${(breadcrumb.window.range).toFixed(2)}ms`}
            </span>
          </div>
          ${breadcrumb.child !== null ?
            html `
            <${IconButton.Icon.Icon.litTagName} .data=${{
                iconName: 'chevron-right',
                color: 'var(--icon-default)',
                width: '16px',
                height: '16px',
            }}>`
            : ''}
      `;
    }
    #render() {
        const output = html `
      <div class="breadcrumbs">
      ${flattenBreadcrumbs(this.#breadcrumb).map((breadcrumb, index) => this.#renderElement(breadcrumb, index))}
      </div>`;
        render(output, this.#shadow, { host: this });
    }
}
ComponentHelpers.CustomElements.defineComponent('devtools-breadcrumbs-ui', BreadcrumbsUI);
//# sourceMappingURL=BreadcrumbsUI.js.map