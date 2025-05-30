// Copyright (c) 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../../ui/components/icon_button/icon_button.js';
import '../../../ui/legacy/components/inline_editor/inline_editor.js';
/* eslint-disable rulesdir/no-lit-render-outside-of-view */
import * as i18n from '../../../core/i18n/i18n.js';
import * as Lit from '../../../ui/lit/lit.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import anchorFunctionLinkSwatchStyles from './anchorFunctionLinkSwatch.css.js';
const UIStrings = {
    /**
     *@description Title in the styles tab for the icon button for jumping to the anchor node.
     */
    jumpToAnchorNode: 'Jump to anchor node',
    /**
     *@description Text displayed in a tooltip shown when hovering over a CSS property value references a name that's not
     *             defined and can't be linked to.
     *@example {--my-linkable-name} PH1
     */
    sIsNotDefined: '{PH1} is not defined',
};
const str_ = i18n.i18n.registerUIStrings('panels/elements/components/AnchorFunctionLinkSwatch.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const { render, html } = Lit;
// clang-format on
export class AnchorFunctionLinkSwatch extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #data;
    constructor(data) {
        super();
        this.#data = data;
    }
    dataForTest() {
        return this.#data;
    }
    connectedCallback() {
        this.render();
    }
    set data(data) {
        this.#data = data;
        this.render();
    }
    #handleIconClick(ev) {
        ev.stopPropagation();
        this.#data.onLinkActivate();
    }
    render() {
        if (!this.#data.identifier && !this.#data.anchorNode) {
            return;
        }
        if (this.#data.identifier) {
            render(
            // clang-format off
            html `<style>${anchorFunctionLinkSwatchStyles}</style>
               <devtools-link-swatch
                @mouseenter=${this.#data.onMouseEnter}
                @mouseleave=${this.#data.onMouseLeave}
                .data=${{
                text: this.#data.identifier,
                tooltip: this.#data.anchorNode ? undefined :
                    { title: i18nString(UIStrings.sIsNotDefined, { PH1: this.#data.identifier }) },
                isDefined: Boolean(this.#data.anchorNode),
                jslogContext: 'anchor-link',
                onLinkActivate: this.#data.onLinkActivate,
            }}
                ></devtools-link-swatch>${this.#data.needsSpace ? ' ' : ''}`, 
            // clang-format on
            this.#shadow, { host: this });
        }
        else {
            // clang-format off
            render(html `<style>${anchorFunctionLinkSwatchStyles}</style>
                  <devtools-icon
                   role='button'
                   title=${i18nString(UIStrings.jumpToAnchorNode)}
                   class='icon-link'
                   name='open-externally'
                   jslog=${VisualLogging.action('jump-to-anchor-node').track({ click: true })}
                   @mouseenter=${this.#data.onMouseEnter}
                   @mouseleave=${this.#data.onMouseLeave}
                   @mousedown=${(ev) => ev.stopPropagation()}
                   @click=${this.#handleIconClick}
                  ></devtools-icon>${this.#data.needsSpace ? ' ' : ''}`, this.#shadow, { host: this });
            // clang-format on
        }
    }
}
customElements.define('devtools-anchor-function-link-swatch', AnchorFunctionLinkSwatch);
//# sourceMappingURL=AnchorFunctionLinkSwatch.js.map