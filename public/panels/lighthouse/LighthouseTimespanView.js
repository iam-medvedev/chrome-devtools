// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-imperative-dom-api */
import * as i18n from '../../core/i18n/i18n.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as UI from '../../ui/legacy/legacy.js';
import lighthouseDialogStyles from './lighthouseDialog.css.js';
const UIStrings = {
    /**
     * @description Header indicating that a Lighthouse timespan is starting. "Timespan" is a Lighthouse mode that analyzes user interactions over a period of time.
     */
    timespanStarting: 'Timespan starting…',
    /**
     * @description Header indicating that a Lighthouse timespan has started. "Timespan" is a Lighthouse mode that analyzes user interactions over a period of time. "interact with the page" is a call to action for the user to interact with the web page.
     */
    timespanStarted: 'Timespan started',
    /**
     * @description Call to action for the user to interact with the web page.
     */
    interactWithPage: 'Interact with the page.',
    /**
     * @description Label for a button that ends a Lighthouse timespan. "timespan" is a Lighthouse mode that analyzes user interactions over a period of time.
     */
    endTimespan: 'End timespan',
    /**
     * @description Label for a button that cancels a Lighthouse timespan.
     */
    cancel: 'Cancel',
};
const str_ = i18n.i18n.registerUIStrings('panels/lighthouse/LighthouseTimespanView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class TimespanView extends UI.Dialog.Dialog {
    panel;
    statusHeader;
    contentContainer;
    endButton;
    constructor(panel) {
        super();
        this.panel = panel;
        this.statusHeader = null;
        this.contentContainer = null;
        this.endButton = null;
        this.setDimmed(true);
        this.setCloseOnEscape(false);
        this.setOutsideClickCallback(event => event.consume(true));
        this.render();
    }
    show(dialogRenderElement) {
        this.reset();
        super.show(dialogRenderElement);
    }
    reset() {
        if (this.statusHeader && this.contentContainer && this.endButton) {
            this.statusHeader.textContent = i18nString(UIStrings.timespanStarting);
            this.contentContainer.textContent = '';
            this.endButton.disabled = true;
        }
    }
    ready() {
        if (this.statusHeader && this.contentContainer && this.endButton) {
            this.statusHeader.textContent = i18nString(UIStrings.timespanStarted);
            this.contentContainer.textContent = i18nString(UIStrings.interactWithPage);
            this.endButton.disabled = false;
            this.endButton.focus();
        }
    }
    render() {
        const dialogRoot = UI.UIUtils.createShadowRootWithCoreStyles(this.contentElement, { cssFile: lighthouseDialogStyles });
        this.endButton = UI.UIUtils.createTextButton(i18nString(UIStrings.endTimespan), this.endTimespan.bind(this), { variant: "primary" /* Buttons.Button.Variant.PRIMARY */, jslogContext: 'lighthouse.end-time-span', className: 'end-timespan' });
        const cancelButton = UI.UIUtils.createTextButton(i18nString(UIStrings.cancel), this.cancel.bind(this), {
            className: 'cancel',
            jslogContext: 'lighthouse.cancel',
        });
        const fragment = UI.Fragment.Fragment.build `
  <div class="lighthouse-view vbox">
  <span $="status-header" class="header"></span>
  <span $="call-to-action" class="lighthouse-dialog-text"></span>
  <div class="lighthouse-action-buttons hbox">
  ${cancelButton}
  ${this.endButton}
  </div>
  </div>
  `;
        this.statusHeader = fragment.$('status-header');
        this.contentContainer = fragment.$('call-to-action');
        dialogRoot.appendChild(fragment.element());
        this.setSizeBehavior("SetExactWidthMaxHeight" /* UI.GlassPane.SizeBehavior.SET_EXACT_WIDTH_MAX_HEIGHT */);
        this.setMaxContentSize(new UI.Geometry.Size(500, 400));
        this.reset();
    }
    async endTimespan() {
        await this.panel.handleTimespanEnd();
    }
    async cancel() {
        await this.panel.handleRunCancel();
    }
}
//# sourceMappingURL=LighthouseTimespanView.js.map