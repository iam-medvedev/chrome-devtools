// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../ui/legacy/components/data_grid/data_grid.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
import accessibilityAnnouncementRecordingListViewStyles from './accessibilityAnnouncementRecordingListView.css.js';
const { html, render } = Lit;
const UIStrings = {
    /**
     * @description Column header for the announcement timestamp.
     */
    time: 'Time',
    /**
     * @description Column header for the API type (DOM aria-live vs JS ariaNotify).
     */
    api: 'API',
    /**
     * @description Column header for the politeness level (e.g. polite, assertive).
     */
    politeness: 'Politeness',
    /**
     * @description Column header for the announcement message text.
     */
    message: 'Message',
    /**
     * @description Value for DOM aria-live announcements in the API column.
     */
    ariaLive: 'ARIA live',
    /**
     * @description Value for JS ariaNotify announcements in the API column.
     */
    jsTriggered: 'JS-triggered',
    /**
     * @description Accessible title for the announcements data grid.
     */
    ariaLiveRecordingList: 'Accessibility Announcements',
};
const str_ = i18n.i18n.registerUIStrings('panels/accessibility/AccessibilityAnnouncementRecordingListView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export const DEFAULT_VIEW = (input, _output, target) => {
    // clang-format off
    render(html `
    <style>${accessibilityAnnouncementRecordingListViewStyles}</style>
    <devtools-data-grid
      name=${i18nString(UIStrings.ariaLiveRecordingList)}
      striped
      class="flex-auto"
      @deselect=${input.onDeselect}>
      <table>
        <tr>
          <th id="time" sortable fixed width="110px" align="right">
            ${i18nString(UIStrings.time)}
          </th>
          <th id="api" sortable fixed width="110px">
            ${i18nString(UIStrings.api)}
          </th>
          <th id="politeness" sortable fixed width="90px">
            ${i18nString(UIStrings.politeness)}
          </th>
          <th id="message" sortable width="300px">
            ${i18nString(UIStrings.message)}
          </th>
        </tr>
        ${input.items.map(item => {
        const timeString = new Date(item.time).toLocaleTimeString(i18n.DevToolsLocale.DevToolsLocale.instance().locale);
        const apiDisplay = item.api === "js-triggered" /* AnnouncementApi.JS_TRIGGERED */ ?
            i18nString(UIStrings.jsTriggered) :
            i18nString(UIStrings.ariaLive);
        return html `
            <tr
              ?selected=${item === input.selectedItem}
              @select=${() => input.onSelect(item)}>
              <td data-value=${item.time}>
                <span>${timeString}</span>
              </td>
              <td>${apiDisplay}</td>
              <td>${item.politeness}</td>
              <td title=${item.message}>
                ${item.message}
              </td>
            </tr>`;
    })}
      </table>
    </devtools-data-grid>`, target);
    // clang-format on
};
export class AccessibilityAnnouncementRecordingListView extends UI.Widget.VBox {
    #items = [];
    #selectedItem = null;
    #onSelect = null;
    #view;
    constructor(element, view = DEFAULT_VIEW) {
        super(element, { useShadowDom: true });
        this.#view = view;
    }
    wasShown() {
        super.wasShown();
        this.requestUpdate();
    }
    set items(items) {
        if (this.#items === items) {
            return;
        }
        this.#items = items;
        this.requestUpdate();
    }
    get items() {
        return this.#items;
    }
    set selectedItem(item) {
        if (this.#selectedItem === item) {
            return;
        }
        this.#selectedItem = item;
        this.requestUpdate();
    }
    get selectedItem() {
        return this.#selectedItem;
    }
    set onSelect(onSelect) {
        this.#onSelect = onSelect;
    }
    reset() {
        this.#items = [];
        this.#selectedItem = null;
        this.requestUpdate();
    }
    performUpdate() {
        const input = {
            items: this.#items,
            selectedItem: this.#selectedItem,
            onSelect: (item) => {
                this.selectedItem = item;
                this.#onSelect?.(item);
            },
            onDeselect: () => {
                this.selectedItem = null;
                this.#onSelect?.(null);
            },
        };
        this.#view(input, undefined, this.contentElement);
    }
}
//# sourceMappingURL=AccessibilityAnnouncementRecordingListView.js.map