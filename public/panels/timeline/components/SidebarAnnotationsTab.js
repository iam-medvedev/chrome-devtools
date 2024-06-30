// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import sidebarAnnotationsTabStyles from './sidebarAnnotationsTab.css.js';
export class SidebarAnnotationsTab extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-sidebar-annotations`;
    #shadow = this.attachShadow({ mode: 'open' });
    #boundRender = this.#render.bind(this);
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [sidebarAnnotationsTabStyles];
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    #render() {
        // clang-format off
        LitHtml.render(LitHtml.html `
            <span class="annotations">
                Annotations coming soon!
            </span>`, this.#shadow, { host: this });
        // clang-format on
    }
}
customElements.define('devtools-performance-sidebar-annotations', SidebarAnnotationsTab);
//# sourceMappingURL=SidebarAnnotationsTab.js.map