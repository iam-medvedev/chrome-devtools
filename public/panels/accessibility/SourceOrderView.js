// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../ui/legacy/legacy.js';
import * as i18n from '../../core/i18n/i18n.js';
import { html, nothing, render } from '../../ui/lit/lit.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import { AccessibilitySubPane } from './AccessibilitySubPane.js';
const UIStrings = {
    /**
     * @description Name of a tool which allows the developer to view the contents of the page in the
     * 'source order' (the order in which the HTML elements show up in the source code). In the
     * Accessibility panel.
     */
    sourceOrderViewer: 'Source Order Viewer',
    /**
     *@description Text in Source Order Viewer of the Accessibility panel shown when the selected node has no child elements
     */
    noSourceOrderInformation: 'No source order information available',
    /**
     *@description Text in Source Order Viewer of the Accessibility panel shown when the selected node has many child elements
     */
    thereMayBeADelayInDisplaying: 'There may be a delay in displaying source order for elements with many children',
    /**
     * @description Checkbox label in Source Order Viewer of the Accessibility panel. Source order
     * means the order in which the HTML elements show up in the source code.
     */
    showSourceOrder: 'Show source order',
};
const str_ = i18n.i18n.registerUIStrings('panels/accessibility/SourceOrderView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const MAX_CHILD_ELEMENTS_THRESHOLD = 300;
const DEFAULT_VIEW = (input, _output, target) => {
    function onShowSourceOrderChanged(event) {
        const checkbox = event.currentTarget;
        input.onShowSourceOrderChanged(checkbox.checked);
        event.consume();
    }
    // clang-format off
    render(html `
    <div jslog=${VisualLogging.section('source-order-viewer')}>
      ${input.showSourceOrder === undefined
        ? html `
          <div class="gray-info-message info-message-overflow">
            ${i18nString(UIStrings.noSourceOrderInformation)}
          </div>
        `
        : html `
        ${input.childCount >= MAX_CHILD_ELEMENTS_THRESHOLD
            ? html `
            <div class="gray-info-message info-message-overflow"
                 id="source-order-warning">
              ${i18nString(UIStrings.thereMayBeADelayInDisplaying)}
            </div>
          `
            : nothing}
        <devtools-checkbox class="source-order-checkbox"
                           jslog=${VisualLogging.toggle().track({ click: true })}
                           ?checked=${input.showSourceOrder}
                           @change=${onShowSourceOrderChanged}>
          ${i18nString(UIStrings.showSourceOrder)}
        </devtools-checkbox>
        `}
    </div>
  `, target, { host: input });
    // clang-format on
};
export class SourceOrderPane extends AccessibilitySubPane {
    #childCount = 0;
    #showSourceOrder = undefined;
    #view;
    constructor(view = DEFAULT_VIEW) {
        super(i18nString(UIStrings.sourceOrderViewer));
        this.#view = view;
    }
    async setNodeAsync(node) {
        if (this.nodeInternal && this.#showSourceOrder) {
            this.nodeInternal.domModel().overlayModel().hideSourceOrderInOverlay();
        }
        super.setNode(node);
        this.#childCount = this.nodeInternal?.childNodeCount() ?? 0;
        if (!this.nodeInternal || !this.#childCount) {
            this.#showSourceOrder = undefined;
        }
        else {
            if (!this.nodeInternal.children()) {
                await this.nodeInternal.getSubtree(1, false);
            }
            const children = this.nodeInternal.children();
            if (!children.some(child => child.nodeType() === Node.ELEMENT_NODE)) {
                this.#showSourceOrder = undefined;
            }
            else if (this.#showSourceOrder === undefined) {
                this.#showSourceOrder = false;
            }
            if (this.#showSourceOrder) {
                this.nodeInternal.domModel().overlayModel().highlightSourceOrderInOverlay(this.nodeInternal);
            }
        }
        this.requestUpdate();
    }
    async performUpdate() {
        const onShowSourceOrderChanged = (showSourceOrder) => {
            if (!this.nodeInternal) {
                this.#showSourceOrder = undefined;
                return;
            }
            if (showSourceOrder) {
                this.nodeInternal.domModel().overlayModel().highlightSourceOrderInOverlay(this.nodeInternal);
            }
            else {
                this.nodeInternal.domModel().overlayModel().hideSourceOrderInOverlay();
            }
            this.#showSourceOrder = showSourceOrder;
        };
        const input = {
            childCount: this.#childCount,
            showSourceOrder: this.#showSourceOrder,
            onShowSourceOrderChanged,
        };
        const output = undefined;
        this.#view(input, output, this.contentElement);
    }
}
//# sourceMappingURL=SourceOrderView.js.map