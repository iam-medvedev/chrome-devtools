// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Root from '../../../core/root/root.js';
import * as IconButton from '../../../ui/components/icon_button/icon_button.js';
import * as UI from '../../../ui/legacy/legacy.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import sidebarStyles from './sidebar.css.js';
const COLLAPSED_WIDTH = 40;
const DEFAULT_EXPANDED_WIDTH = 240;
export class SidebarWidget extends UI.SplitWidget.SplitWidget {
    #sidebarExpanded = false;
    #sidebarUI = new SidebarUI();
    constructor() {
        super(true /* isVertical */, false /* secondIsSidebar */, undefined /* settingName */, COLLAPSED_WIDTH);
        if (Root.Runtime.experiments.isEnabled("timeline-rpp-sidebar" /* Root.Runtime.ExperimentName.TIMELINE_SIDEBAR */)) {
            this.sidebarElement().append(this.#sidebarUI);
        }
        else {
            this.hideSidebar();
        }
        this.#sidebarUI.render(this.#sidebarExpanded);
        this.#sidebarUI.addEventListener('togglebuttonclick', () => {
            this.#sidebarExpanded = !this.#sidebarExpanded;
            if (this.#sidebarExpanded) {
                this.setResizable(true);
                this.forceSetSidebarWidth(DEFAULT_EXPANDED_WIDTH);
            }
            else {
                this.setResizable(false);
                this.forceSetSidebarWidth(COLLAPSED_WIDTH);
            }
            this.#sidebarUI.render(this.#sidebarExpanded);
        });
    }
}
export class SidebarUI extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-sidebar`;
    #shadow = this.attachShadow({ mode: 'open' });
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [sidebarStyles];
    }
    #toggleButtonClick() {
        this.dispatchEvent(new Event('togglebuttonclick'));
    }
    render(expanded) {
        const toggleIcon = expanded ? 'left-panel-close' : 'left-panel-open';
        // clang-format off
        const output = LitHtml.html `<div class=${LitHtml.Directives.classMap({
            sidebar: true,
            'is-expanded': expanded,
            'is-closed': !expanded,
        })}>
      <div class="tab-bar">
        <${IconButton.Icon.Icon.litTagName} name=${toggleIcon} @click=${this.#toggleButtonClick} class="sidebar-toggle-button">
        </${IconButton.Icon.Icon.litTagName}>
      </div>
    </div>`;
        // clang-format on
        LitHtml.render(output, this.#shadow, { host: this });
    }
}
customElements.define('devtools-performance-sidebar', SidebarUI);
//# sourceMappingURL=Sidebar.js.map