// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TraceEngine from '../../../models/trace/trace.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as IconButton from '../../../ui/components/icon_button/icon_button.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import { RemoveAnnotation } from './Sidebar.js';
import sidebarAnnotationsTabStyles from './sidebarAnnotationsTab.css.js';
export class SidebarAnnotationsTab extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-sidebar-annotations`;
    #shadow = this.attachShadow({ mode: 'open' });
    #boundRender = this.#render.bind(this);
    #annotations = [];
    set annotations(annotations) {
        this.#annotations = annotations;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [sidebarAnnotationsTabStyles];
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    #renderAnnotation(annotation) {
        const entryName = TraceEngine.Types.TraceEvents.isProfileCall(annotation.entry) ?
            annotation.entry.callFrame.functionName :
            annotation.entry.name;
        return LitHtml.html `
      <div class="annotation-container">
        <div class="annotation">
          <span class="entry-name">
            ${entryName}
          </span>
          <span class="label">
          ${annotation.label}
          </span>
        </div>
        <${IconButton.Icon.Icon.litTagName} class="bin-icon" .data=${{
            iconName: 'bin',
            color: 'var(--icon-default)',
            width: '20px',
            height: '20px',
        }} @click=${() => {
            this.dispatchEvent(new RemoveAnnotation(annotation));
        }}>
      </div>
    `;
    }
    #render() {
        // clang-format off
        LitHtml.render(LitHtml.html `
              <span class="annotations">
                ${this.#annotations.map(annotation => this.#renderAnnotation(annotation))}
              </span>`, this.#shadow, { host: this });
        // clang-format on
    }
}
customElements.define('devtools-performance-sidebar-annotations', SidebarAnnotationsTab);
//# sourceMappingURL=SidebarAnnotationsTab.js.map