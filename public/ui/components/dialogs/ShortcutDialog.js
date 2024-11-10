// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import shortcutDialogStyles from './shortcutDialog.css.js';
const { html } = LitHtml;
const UIStrings = {
    /**
     * @description Title of question mark button for the shortcuts dialog.
     */
    showShortcutTitle: 'Show shortcuts',
    /**
     * @description Title of the keyboard shortcuts help menu.
     */
    dialogTitle: 'Keyboard shortcuts',
    /**
     * @description Title of close button for the shortcuts dialog.
     */
    close: 'Close',
};
const str_ = i18n.i18n.registerUIStrings('ui/components/dialogs/ShortcutDialog.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class ShowDialog extends Event {
    static eventName = 'showdialog';
    constructor() {
        super(ShowDialog.eventName);
    }
}
export class ShortcutDialog extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #renderBound = this.#render.bind(this);
    #dialog = null;
    #showButton = null;
    #shortcuts = [];
    #openOnRender = false;
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [shortcutDialogStyles];
    }
    set data(data) {
        this.#shortcuts = data.shortcuts;
        if (data.open) {
            this.#openOnRender = data.open;
        }
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
    }
    #showDialog() {
        if (!this.#dialog) {
            throw new Error('Dialog not found');
        }
        void this.#dialog.setDialogVisible(true);
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
        this.dispatchEvent(new ShowDialog());
    }
    #closeDialog(evt) {
        if (!this.#dialog) {
            throw new Error('Dialog not found');
        }
        void this.#dialog.setDialogVisible(false);
        if (evt) {
            evt.stopImmediatePropagation();
        }
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
    }
    #getKeysFromBinding(binding) {
        return binding.split(/[\s+]+/).map(word => word.trim()); // Split on one or more spaces or + symbols
    }
    #render() {
        if (!ComponentHelpers.ScheduledRender.isScheduledRender(this)) {
            throw new Error('Shortcut dialog render was not scheduled');
        }
        // clang-format off
        LitHtml.render(html `
      <devtools-button
        @click=${this.#showDialog}
        on-render=${ComponentHelpers.Directives.nodeRenderedCallback(node => {
            this.#showButton = node;
        })}
        .data=${{
            variant: "toolbar" /* Buttons.Button.Variant.TOOLBAR */,
            iconName: 'help',
            title: i18nString(UIStrings.showShortcutTitle),
        }}
      ></devtools-button>
      <devtools-dialog
        class="shortcuts-dialog"
        @clickoutsidedialog=${this.#closeDialog}
        .origin=${() => {
            if (!this.#showButton) {
                throw new Error('Button not found');
            }
            return this.#showButton;
        }}
        .position=${"bottom" /* DialogVerticalPosition.BOTTOM */}
        .horizontalAlignment=${"right" /* DialogHorizontalAlignment.RIGHT */}
        .jslogContext=${'shortcuts'}
        on-render=${ComponentHelpers.Directives.nodeRenderedCallback(node => {
            this.#dialog = node;
        })}
      >
        <div class="keybinds-category-header">
          <span class="keybinds-category-header-text">${i18nString(UIStrings.dialogTitle)}</span>
          <devtools-button
            @click=${this.#closeDialog}
            .data=${{
            variant: "toolbar" /* Buttons.Button.Variant.TOOLBAR */,
            iconName: 'cross',
            title: i18nString(UIStrings.close),
        }}
            jslog=${VisualLogging.close().track({ click: true })}
          ></devtools-button>
        </div>
        <ul class="keybinds-list">
          ${this.#shortcuts.map(shortcut => html `
              <li class="keybinds-list-item">
                <div>${shortcut.title}</div>
                ${shortcut.bindings.map(binding => {
            return html `
                  <div class="keys-container">
                    ${this.#getKeysFromBinding(binding).map(key => html `
                        <span class="keybinds-key">${key}</span>
                    `)}
                  </div>
                `;
        })}
              </li>`)}
        </ul>
      </devtools-dialog>
      `, this.#shadow, { host: this });
        // clang-format on
        if (this.#openOnRender) {
            this.#showDialog();
            this.#openOnRender = false;
        }
    }
}
customElements.define('devtools-shortcut-dialog', ShortcutDialog);
//# sourceMappingURL=ShortcutDialog.js.map