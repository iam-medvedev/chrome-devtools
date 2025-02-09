// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Lit from '../../lit/lit.js';
import tooltipStyles from './tooltip.css.js';
const { html } = Lit;
/**
 * @attr id - Id of the tooltip. Used for searching an anchor element with aria-describedby.
 * @attr hover-delay - Hover length in ms before the tooltip is shown and hidden.
 * @attr variant - Variant of the tooltip, `"simple"` for strings only, inverted background,
 *                 `"rich"` for interactive content, background according to theme's surface.
 * @prop {String} id - reflects the `"id"` attribute.
 * @prop {Number} hoverDelay - reflects the `"hover-delay"` attribute.
 * @prop {String} variant - reflects the `"variant"` attribute.
 */
export class Tooltip extends HTMLElement {
    static observedAttributes = ['id', 'variant'];
    #shadow = this.attachShadow({ mode: 'open' });
    #anchor = null;
    #timeout = null;
    get hoverDelay() {
        return this.hasAttribute('hover-delay') ? Number(this.getAttribute('hover-delay')) : 200;
    }
    set hoverDelay(delay) {
        this.setAttribute('hover-delay', delay.toString());
    }
    get variant() {
        return this.getAttribute('variant') === 'rich' ? 'rich' : 'simple';
    }
    set variant(variant) {
        this.setAttribute('variant', variant);
    }
    attributeChangedCallback(name) {
        if (name === 'id') {
            this.#removeEventListeners();
            this.#attachToAnchor();
        }
    }
    connectedCallback() {
        this.#attachToAnchor();
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'tooltip');
        }
        this.setAttribute('popover', 'manual');
        // clang-format off
        Lit.render(html `
      <style>${tooltipStyles.cssContent}</style>
      <!-- Wrapping it into a container, so that the tooltip doesn't disappear when the mouse moves from the anchor to the tooltip. -->
      <div class="container">
        <slot></slot>
      </div>
    `, this.#shadow, { host: this });
        // clang-format on
    }
    disconnectedCallback() {
        this.#removeEventListeners();
    }
    showTooltip = () => {
        if (this.#timeout) {
            window.clearTimeout(this.#timeout);
        }
        this.#timeout = window.setTimeout(() => {
            this.showPopover();
        }, this.hoverDelay);
    };
    hideTooltip = (event) => {
        if (this.#timeout) {
            window.clearTimeout(this.#timeout);
        }
        // Don't hide a rich tooltip when hovering over the tooltip itself.
        if (this.variant === 'rich' && event.relatedTarget === this) {
            return;
        }
        this.#timeout = window.setTimeout(() => {
            this.hidePopover();
        }, this.hoverDelay);
    };
    #preventDefault(event) {
        event.preventDefault();
    }
    #removeEventListeners() {
        if (this.#anchor) {
            this.#anchor.removeEventListener('mouseenter', this.showTooltip);
            this.#anchor.removeEventListener('mouseleave', this.hideTooltip);
            this.#anchor.removeEventListener('click', this.#preventDefault);
            this.removeEventListener('mouseleave', this.hideTooltip);
        }
    }
    #attachToAnchor() {
        const id = this.getAttribute('id');
        if (!id) {
            throw new Error('<devtools-tooltip> must have an id.');
        }
        const anchor = this.getRootNode().querySelector(`[aria-describedby="${id}"]`);
        if (!anchor) {
            throw new Error(`No anchor for tooltip with id ${id} found.`);
        }
        if (!(anchor instanceof HTMLElement)) {
            throw new Error('Anchor must be an HTMLElement.');
        }
        const anchorName = `--${id}-anchor`;
        anchor.style.anchorName = anchorName;
        anchor.setAttribute('popovertarget', id);
        this.style.positionAnchor = anchorName;
        this.#anchor = anchor;
        this.#anchor.addEventListener('mouseenter', this.showTooltip);
        this.#anchor.addEventListener('mouseleave', this.hideTooltip);
        // By default the anchor with a popovertarget would toggle the popover on click.
        this.#anchor.addEventListener('click', this.#preventDefault);
        this.addEventListener('mouseleave', this.hideTooltip);
    }
}
customElements.define('devtools-tooltip', Tooltip);
//# sourceMappingURL=Tooltip.js.map