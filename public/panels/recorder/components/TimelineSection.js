// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-lit-render-outside-of-view */
import * as Lit from '../../../ui/lit/lit.js';
import timelineSectionStyles from './timelineSection.css.js';
const { html } = Lit;
export class TimelineSection extends HTMLElement {
    #isEndOfGroup = false;
    #isStartOfGroup = false;
    #isFirstSection = false;
    #isLastSection = false;
    #isSelected = false;
    #shadowRoot = this.attachShadow({ mode: 'open' });
    set data(data) {
        this.#isFirstSection = data.isFirstSection;
        this.#isLastSection = data.isLastSection;
        this.#isEndOfGroup = data.isEndOfGroup;
        this.#isStartOfGroup = data.isStartOfGroup;
        this.#isSelected = data.isSelected;
        this.#render();
    }
    connectedCallback() {
        this.#render();
    }
    #render() {
        const classes = {
            'timeline-section': true,
            'is-end-of-group': this.#isEndOfGroup,
            'is-start-of-group': this.#isStartOfGroup,
            'is-first-section': this.#isFirstSection,
            'is-last-section': this.#isLastSection,
            'is-selected': this.#isSelected,
        };
        // clang-format off
        Lit.render(html `
      <style>${timelineSectionStyles}</style>
      <div class=${Lit.Directives.classMap(classes)}>
        <div class="icon"><slot name="icon"></slot></div>
        <svg width="24" height="100%" class="bar">
          <rect class="line" x="7" y="0" width="2" height="100%" />
        </svg>
        <slot></slot>
      </div>
    `, this.#shadowRoot, { host: this });
        // clang-format on
    }
}
customElements.define('devtools-timeline-section', TimelineSection);
//# sourceMappingURL=TimelineSection.js.map