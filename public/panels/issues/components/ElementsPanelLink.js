// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as UI from '../../../ui/legacy/legacy.js';
import { html, render } from '../../../ui/lit/lit.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import elementsPanelLinkStyles from './elementsPanelLink.css.js';
export const DEFAULT_VIEW = (input, _output, target) => {
    // clang-format off
    render(html `
    <style>${elementsPanelLinkStyles}</style>
    <button
      class="element-reveal-icon"
      jslog=${VisualLogging.link('elements-panel').track({ click: true })}
      @click=${input.onElementRevealIconClick}
      @mouseenter=${input.onElementRevealIconMouseEnter}
      @mouseleave=${input.onElementRevealIconMouseLeave}></button>
    `, target);
    // clang-format on
};
export class ElementsPanelLink extends UI.Widget.Widget {
    #onElementRevealIconClick = () => { };
    #onElementRevealIconMouseEnter = () => { };
    #onElementRevealIconMouseLeave = () => { };
    #view;
    constructor(element, view = DEFAULT_VIEW) {
        super(element);
        this.#view = view;
    }
    wasShown() {
        super.wasShown();
        this.requestUpdate();
    }
    set onElementRevealIconClick(onElementRevealIconClick) {
        if (this.#onElementRevealIconClick === onElementRevealIconClick) {
            return;
        }
        this.#onElementRevealIconClick = onElementRevealIconClick;
        this.requestUpdate();
    }
    set onElementRevealIconMouseEnter(onElementRevealIconMouseEnter) {
        if (this.#onElementRevealIconMouseEnter === onElementRevealIconMouseEnter) {
            return;
        }
        this.#onElementRevealIconMouseEnter = onElementRevealIconMouseEnter;
        this.requestUpdate();
    }
    set onElementRevealIconMouseLeave(onElementRevealIconMouseLeave) {
        if (this.#onElementRevealIconMouseLeave === onElementRevealIconMouseLeave) {
            return;
        }
        this.#onElementRevealIconMouseLeave = onElementRevealIconMouseLeave;
        this.requestUpdate();
    }
    set data(data) {
        this.onElementRevealIconClick = data.onElementRevealIconClick;
        this.onElementRevealIconMouseEnter = data.onElementRevealIconMouseEnter;
        this.onElementRevealIconMouseLeave = data.onElementRevealIconMouseLeave;
    }
    performUpdate() {
        this.#view({
            onElementRevealIconClick: this.#onElementRevealIconClick,
            onElementRevealIconMouseEnter: this.#onElementRevealIconMouseEnter,
            onElementRevealIconMouseLeave: this.#onElementRevealIconMouseLeave,
        }, undefined, this.contentElement);
    }
}
//# sourceMappingURL=ElementsPanelLink.js.map