// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-lit-render-outside-of-view */
import * as i18n from '../../../core/i18n/i18n.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import * as Lit from '../../lit/lit.js';
import * as Buttons from '../buttons/buttons.js';
import snackbarStyles from './snackbar.css.js';
const { html } = Lit;
const UIStrings = {
    /**
     * @description Title for close button
     */
    dismiss: 'Dismiss',
};
const str_ = i18n.i18n.registerUIStrings('ui/components/snackbars/Snackbar.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export const DEFAULT_AUTO_DISMISS_MS = 5000;
const LONG_ACTION_THRESHOLD = 15;
/**
 * @attr dismiss-timeout - Timeout in ms after which the snackbar is dismissed.
 * @attr message - The message to display in the snackbar.
 * @attr closable - If true, the snackbar will have a dismiss button. This cancels the auto dismiss behavior.
 * @attr action-button-label - The label for the action button.
 * @attr action-button-title - The title for the action button.
 *
 * @prop {Number} dismissTimeout - reflects the `"dismiss-timeout"` attribute.
 * @prop {String} message - reflects the `"message"` attribute.
 * @prop {Boolean} closable - reflects the `"closable"` attribute.
 * @prop {String} actionButtonLabel - reflects the `"action-button-label"` attribute.
 * @prop {String} actionButtonTitle - reflects the `"action-button-title"` attribute.
 * @prop {Function} actionButtonClickHandler - Function to be triggered when action button is clicked.
 */
export class Snackbar extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #timeout = null;
    #isLongAction = false;
    #actionButtonClickHandler;
    /**
     * Reflects the `dismiss-timeout` attribute. Sets the message to be displayed on the snackbar.
     */
    get dismissTimeout() {
        return this.hasAttribute('dismiss-timeout') ? Number(this.getAttribute('dismiss-timeout')) :
            DEFAULT_AUTO_DISMISS_MS;
    }
    set dismissTimeout(dismissMs) {
        this.setAttribute('dismiss-timeout', dismissMs.toString());
    }
    /**
     * Reflects the `message` attribute. Sets the message to be displayed on the snackbar.
     */
    get message() {
        return this.getAttribute('message');
    }
    set message(message) {
        this.setAttribute('message', message);
    }
    /**
     * Reflects the `closable` attribute. If true, the snackbar will have a button to close the toast.
     * @default false
     */
    get closable() {
        return this.hasAttribute('closable');
    }
    set closable(closable) {
        this.toggleAttribute('closable', closable);
    }
    /**
     * Reflects the `action-button-label` attribute. Sets the title of the action button.
     */
    get actionButtonLabel() {
        return this.getAttribute('action-button-label');
    }
    set actionButtonLabel(actionButtonLabel) {
        this.setAttribute('action-button-label', actionButtonLabel);
    }
    /**
     * Reflects the `action-button-title` attribute. Sets the aria label of the action button.
     */
    get actionButtonTitle() {
        return this.getAttribute('action-button-title');
    }
    set actionButtonTitle(actionButtonTitle) {
        this.setAttribute('action-button-title', actionButtonTitle);
    }
    /**
     * Sets the function to be triggered when the action button is clicked.
     * @param {Function} actionButtonClickHandler
     */
    set actionButtonClickHandler(actionButtonClickHandler) {
        this.#actionButtonClickHandler = actionButtonClickHandler;
    }
    constructor(properties) {
        super();
        this.message = properties.message;
        if (properties.closable) {
            this.closable = properties.closable;
        }
        if (properties.actionProperties) {
            this.actionButtonLabel = properties.actionProperties.label;
            this.#actionButtonClickHandler = properties.actionProperties.onClick;
            if (properties.actionProperties.title) {
                this.actionButtonTitle = properties.actionProperties.title;
            }
        }
    }
    static show(properties) {
        const snackbar = new Snackbar(properties);
        snackbar.#show();
        return snackbar;
    }
    #show() {
        document.body.appendChild(this);
        if (this.#timeout) {
            window.clearTimeout(this.#timeout);
        }
        if (!this.closable) {
            this.#timeout = window.setTimeout(() => {
                this.#close();
            }, this.dismissTimeout);
        }
    }
    #close() {
        if (this.#timeout) {
            window.clearTimeout(this.#timeout);
        }
        this.remove();
    }
    #onActionButtonClickHandler(event) {
        if (this.#actionButtonClickHandler) {
            event.preventDefault();
            this.#actionButtonClickHandler();
            this.#close();
        }
    }
    connectedCallback() {
        if (this.actionButtonLabel) {
            this.#isLongAction = this.actionButtonLabel.length > LONG_ACTION_THRESHOLD;
        }
        this.role = 'alert';
        const containerCls = Lit.Directives.classMap({
            container: true,
            'long-action': Boolean(this.#isLongAction),
            closable: Boolean(this.closable),
        });
        // clang-format off
        const actionButton = this.actionButtonLabel ? html `<devtools-button
        class="snackbar-button"
        @click=${this.#onActionButtonClickHandler}
        jslog=${VisualLogging.action('snackbar.action').track({ click: true })}
        .variant=${"text" /* Buttons.Button.Variant.TEXT */}
        .title=${this.actionButtonTitle ?? ''}
        .inverseColorTheme=${true}
    >${this.actionButtonLabel}</devtools-button>` : Lit.nothing;
        const crossButton = this.closable ? html `<devtools-button
        class="dismiss snackbar-button"
        @click=${this.#close}
        jslog=${VisualLogging.action('snackbar.dismiss').track({ click: true })}
        aria-label=${i18nString(UIStrings.dismiss)}
        .iconName=${'cross'}
        .variant=${"icon" /* Buttons.Button.Variant.ICON */}
        .title=${i18nString(UIStrings.dismiss)}
        .inverseColorTheme=${true}
    ></devtools-button>` : Lit.nothing;
        Lit.render(html `
        <style>${snackbarStyles}</style>
        <div class=${containerCls}>
            <div class="label-container">
                <div class="message">${this.message}</div>
                ${!this.#isLongAction ? actionButton : Lit.nothing}
                ${crossButton}
            </div>
            ${this.#isLongAction ? html `<div class="long-action-container">${actionButton}</div>` : Lit.nothing}
        </div>
    `, this.#shadow, { host: this });
        // clang-format on
    }
}
customElements.define('devtools-snackbar', Snackbar);
//# sourceMappingURL=Snackbar.js.map