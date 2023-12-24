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
    #breadcrumb = null;
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
    #scrollLastCrumbIntoView() {
        const container = this.#shadow.querySelector('.breadcrumbs');
        if (!container) {
            return;
        }
        requestAnimationFrame(() => {
            // If the width of all the elements is greater than the width of the
            // container, we need to scroll the last element into view.
            if (container.scrollWidth - container.clientWidth > 0) {
                requestAnimationFrame(() => {
                    // For some unknown reason, if we scroll after one rAF, the values
                    // are slightly off by a few pixels which means that the element does
                    // not get properly scrolled fully into view. Therefore we wait for a
                    // second rAF, at which point the values are correct and this will
                    // scroll the container fully to ensure the last breadcrumb is fully
                    // visible.
                    container.scrollLeft = container.scrollWidth - container.clientWidth;
                });
            }
        });
    }
    #renderElement(breadcrumb, index) {
        const breadcrumbRange = TraceEngine.Helpers.Timing.microSecondsToMilliseconds(breadcrumb.window.range);
        // clang-format off
        return html `
          <div class="breadcrumb" @click=${() => this.#removeBreadcrumb(breadcrumb)}>
           <span class="${(index !== 0 && breadcrumb.child === null) ? 'last-breadcrumb' : ''} range">
            ${(index === 0) ?
            `Full range (${breadcrumbRange.toFixed(2)}ms)` :
            `${breadcrumbRange.toFixed(2)}ms`}
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
        // clang-format on
    }
    #render() {
        // clang-format off
        const output = html `
      ${this.#breadcrumb === null ? html `` : html `<div class="breadcrumbs">
        ${flattenBreadcrumbs(this.#breadcrumb).map((breadcrumb, index) => this.#renderElement(breadcrumb, index))}
      </div>`}
    `;
        // clang-format on
        render(output, this.#shadow, { host: this });
        if (this.#breadcrumb?.child) {
            // If we have >1 crumbs, ensure the last one is visible by scrolling the container.
            this.#scrollLastCrumbIntoView();
        }
    }
}
ComponentHelpers.CustomElements.defineComponent('devtools-breadcrumbs-ui', BreadcrumbsUI);
//# sourceMappingURL=BreadcrumbsUI.js.map