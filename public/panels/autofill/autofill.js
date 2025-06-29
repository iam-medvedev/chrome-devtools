var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/autofill/AutofillView.js
var AutofillView_exports = {};
__export(AutofillView_exports, {
  AutofillView: () => AutofillView,
  i18nString: () => i18nString
});
import "./../../ui/components/adorners/adorners.js";
import "./../../ui/legacy/components/data_grid/data_grid.js";
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as AutofillManager from "./../../models/autofill_manager/autofill_manager.js";
import * as ComponentHelpers from "./../../ui/components/helpers/helpers.js";
import * as LegacyWrapper from "./../../ui/components/legacy_wrapper/legacy_wrapper.js";
import * as UI from "./../../ui/legacy/legacy.js";
import * as Lit from "./../../ui/lit/lit.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/autofill/autofillView.css.js
var autofillView_css_default = `/*
 * Copyright (c) 2023 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

main {
  height: 100%;
}

.header {
  display: flex;
  border-bottom: 1px solid var(--sys-color-divider);
  width: 100%;
}

.placeholder-container {
  height: calc(100% - 29px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.address {
  padding: 10px;
  margin-right: auto;
}

.filled-fields-grid {
  border-top: 1px solid var(--sys-color-divider);
  box-sizing: border-box;
}

.content-container {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.grid-wrapper {
  flex-grow: 1;
}

devtools-data-grid {
  border: none;
  height: 100%;
}

.checkbox-label {
  display: flex;
  align-items: center;
}

.right-to-left {
  border-bottom: 1px solid var(--sys-color-divider);
  display: flex;
  flex-flow: row-reverse wrap;
  justify-content: flex-end;
}

.label-container {
  padding: 5px;
  display: flex;
  align-items: flex-start;
}

.top-left-corner {
  border-bottom: 1px solid var(--sys-color-divider);
  display: flex;
  padding: 5px;
  gap: 10px;
}

.matches-filled-field {
  background-color: var(--sys-color-tonal-container);
}

.highlighted {
  background-color: var(--sys-color-state-focus-select);
}

.link {
  color: var(--sys-color-primary);
  text-decoration-line: underline;
}

.feedback {
  margin: auto 5px auto auto;
  font-size: var(--sys-typescale-body4-size);
}

/*# sourceURL=${import.meta.resolve("./autofillView.css")} */`;

// gen/front_end/panels/autofill/AutofillView.js
var { html, render, Directives: { styleMap } } = Lit;
var { FillingStrategy } = Protocol.Autofill;
var UIStrings = {
  /**
   * @description Text shown when there is no data on autofill available.
   */
  noAutofill: "No autofill detected",
  /**
   * @description Explanation for how to populate the autofill panel with data. Shown when there is
   * no data available.
   */
  toStartDebugging: "To start debugging autofill, use Chrome's autofill menu to fill an address form.",
  /**
   * @description Column header for column containing form field values
   */
  value: "Value",
  /**
   * @description Column header for column containing the predicted autofill categories
   */
  predictedAutofillValue: "Predicted autofill value",
  /**
   * @description Column header for column containing the name/label/id of form fields
   */
  formField: "Form field",
  /**
   * @description Tooltip for an adorner for form fields which have an autocomplete attribute
   * (http://go/mdn/HTML/Attributes/autocomplete)
   */
  autocompleteAttribute: "Autocomplete attribute",
  /**
   * @description Abbreviation of 'attribute'. Text content of an adorner for form fields which
   * have an autocomplete attribute (http://go/mdn/HTML/Attributes/autocomplete)
   */
  attr: "attr",
  /**
   * @description Tooltip for an adorner for form fields which don't have an autocomplete attribute
   * (http://go/mdn/HTML/Attributes/autocomplete) and for which Chrome used heuristics to deduce
   * the form field's autocomplete category.
   */
  inferredByHeuristics: "Inferred by heuristics",
  /**
   * @description Abbreviation of 'heuristics'. Text content of an adorner for form fields which
   * don't have an autocomplete attribute (http://go/mdn/HTML/Attributes/autocomplete) and for
   * which Chrome used heuristics to deduce the form field's autocomplete category.
   */
  heur: "heur",
  /**
   * @description Label for checkbox in the Autofill panel. If checked, this panel will open
   * automatically whenever a form is being autofilled.
   */
  autoShow: "Automatically open this panel",
  /**
   * @description Label for checkbox in the Autofill panel. If checked, test addresses will be added to the Autofill popup.
   */
  showTestAddressesInAutofillMenu: "Show test addresses in autofill menu",
  /**
   * @description Tooltip text for a checkbox label in the Autofill panel. If checked, this panel
   * will open automatically whenever a form is being autofilled.
   */
  autoShowTooltip: "Open the autofill panel automatically when an autofill activity is detected.",
  /**
   * @description Aria text for the section of the autofill view containing a preview of the autofilled address.
   */
  addressPreview: "Address preview",
  /**
   * @description Aria text for the section of the autofill view containing the info about the autofilled form fields.
   */
  formInspector: "Form inspector",
  /**
   *@description Link text for a hyperlink to more documentation
   */
  learnMore: "Learn more",
  /**
   *@description Link text for a hyperlink to webpage for leaving user feedback
   */
  sendFeedback: "Send feedback"
};
var AUTOFILL_INFO_URL = "https://goo.gle/devtools-autofill-panel";
var AUTOFILL_FEEDBACK_URL = "https://crbug.com/329106326";
var str_ = i18n.i18n.registerUIStrings("panels/autofill/AutofillView.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var AutofillView = class extends LegacyWrapper.LegacyWrapper.WrappableComponent {
  #shadow = this.attachShadow({ mode: "open" });
  #autoOpenViewSetting;
  #showTestAddressesInAutofillMenuSetting;
  #address = "";
  #filledFields = [];
  #matches = [];
  #highlightedMatches = [];
  constructor() {
    super();
    this.#autoOpenViewSetting = Common.Settings.Settings.instance().createSetting("auto-open-autofill-view-on-event", true);
    this.#showTestAddressesInAutofillMenuSetting = Common.Settings.Settings.instance().createSetting("show-test-addresses-in-autofill-menu-on-event", false);
  }
  connectedCallback() {
    const autofillManager = AutofillManager.AutofillManager.AutofillManager.instance();
    const formFilledEvent = autofillManager.getLastFilledAddressForm();
    if (formFilledEvent) {
      ({
        address: this.#address,
        filledFields: this.#filledFields,
        matches: this.#matches
      } = formFilledEvent);
    }
    autofillManager.addEventListener("AddressFormFilled", this.#onAddressFormFilled, this);
    SDK.TargetManager.TargetManager.instance().addModelListener(SDK.ResourceTreeModel.ResourceTreeModel, SDK.ResourceTreeModel.Events.PrimaryPageChanged, this.#onPrimaryPageChanged, this);
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  #onPrimaryPageChanged() {
    this.#address = "";
    this.#filledFields = [];
    this.#matches = [];
    this.#highlightedMatches = [];
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  #onAddressFormFilled({ data }) {
    ({
      address: this.#address,
      filledFields: this.#filledFields,
      matches: this.#matches
    } = data);
    this.#highlightedMatches = [];
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  async #render() {
    if (!ComponentHelpers.ScheduledRender.isScheduledRender(this)) {
      throw new Error("AutofillView render was not scheduled");
    }
    if (!this.#address && !this.#filledFields.length) {
      render(html`
        <style>${autofillView_css_default}</style>
        <style>${UI.inspectorCommonStyles}</style>
        <main>
          <div class="top-left-corner">
            <devtools-checkbox
                ?checked=${this.#showTestAddressesInAutofillMenuSetting.get()}
                title=${i18nString(UIStrings.showTestAddressesInAutofillMenu)}
                @change=${this.#onShowTestAddressesInAutofillMenuChanged.bind(this)}
                jslog=${VisualLogging.toggle(this.#showTestAddressesInAutofillMenuSetting.name).track({ change: true })}>
              ${i18nString(UIStrings.showTestAddressesInAutofillMenu)}
            </devtools-checkbox>
            <devtools-checkbox
                title=${i18nString(UIStrings.autoShowTooltip)}
                ?checked=${this.#autoOpenViewSetting.get()}
                @change=${this.#onAutoOpenCheckboxChanged.bind(this)}
                jslog=${VisualLogging.toggle(this.#autoOpenViewSetting.name).track({ change: true })}>
              ${i18nString(UIStrings.autoShow)}
            </devtools-checkbox>
            <x-link href=${AUTOFILL_FEEDBACK_URL} class="feedback link" jslog=${VisualLogging.link("feedback").track({ click: true })}>${i18nString(UIStrings.sendFeedback)}</x-link>
          </div>
          <div class="placeholder-container" jslog=${VisualLogging.pane("autofill-empty")}>
            <div class="empty-state">
              <span class="empty-state-header">${i18nString(UIStrings.noAutofill)}</span>
              <div class="empty-state-description">
                <span>${i18nString(UIStrings.toStartDebugging)}</span>
                <x-link href=${AUTOFILL_INFO_URL} class="link" jslog=${VisualLogging.link("learn-more").track({ click: true })}>${i18nString(UIStrings.learnMore)}</x-link>
              </div>
            </div>
          </div>
        </main>
      `, this.#shadow, { host: this });
      return;
    }
    render(html`
      <style>${autofillView_css_default}</style>
      <style>${UI.inspectorCommonStyles}</style>
      <main>
        <div class="content-container" jslog=${VisualLogging.pane("autofill")}>
          <div class="right-to-left" role="region" aria-label=${i18nString(UIStrings.addressPreview)}>
            <div class="header">
              <div class="label-container">
                <devtools-checkbox
                    title=${i18nString(UIStrings.showTestAddressesInAutofillMenu)}
                    ?checked=${this.#showTestAddressesInAutofillMenuSetting.get()}
                    @change=${this.#onShowTestAddressesInAutofillMenuChanged.bind(this)}
                    jslog=${VisualLogging.toggle(this.#showTestAddressesInAutofillMenuSetting.name).track({ change: true })}
                  >${i18nString(UIStrings.showTestAddressesInAutofillMenu)}
                </devtools-checkbox>
              </div>
              <div class="label-container">
                <devtools-checkbox
                    title=${i18nString(UIStrings.autoShowTooltip)}
                    ?checked=${this.#autoOpenViewSetting.get()}
                    @change=${this.#onAutoOpenCheckboxChanged.bind(this)}
                    jslog=${VisualLogging.toggle(this.#autoOpenViewSetting.name).track({ change: true })}
                  >${i18nString(UIStrings.autoShow)}
                </devtools-checkbox>
              </div>
              <x-link href=${AUTOFILL_FEEDBACK_URL} class="feedback link" jslog=${VisualLogging.link("feedback").track({ click: true })}>${i18nString(UIStrings.sendFeedback)}</x-link>
            </div>
            ${this.#renderAddress()}
          </div>
          ${this.#renderFilledFields()}
        </div>
      </main>
    `, this.#shadow, { host: this });
  }
  #onAutoOpenCheckboxChanged(e) {
    const { checked } = e.target;
    this.#autoOpenViewSetting.set(checked);
  }
  #onShowTestAddressesInAutofillMenuChanged(e) {
    const { checked } = e.target;
    this.#showTestAddressesInAutofillMenuSetting.set(checked);
    AutofillManager.AutofillManager.AutofillManager.instance().onShowAutofillTestAddressesSettingsChanged();
  }
  #renderAddress() {
    if (!this.#address) {
      return Lit.nothing;
    }
    const createSpan = (startIndex, endIndex) => {
      const textContentLines = this.#address.substring(startIndex, endIndex).split("\n");
      const templateLines = textContentLines.map((line, i) => i === textContentLines.length - 1 ? line : html`${line}<br>`);
      const hasMatches = this.#matches.some((match) => match.startIndex <= startIndex && match.endIndex > startIndex);
      if (!hasMatches) {
        return html`<span>${templateLines}</span>`;
      }
      const spanClasses = Lit.Directives.classMap({
        "matches-filled-field": hasMatches,
        highlighted: this.#highlightedMatches.some((match) => match.startIndex <= startIndex && match.endIndex > startIndex)
      });
      return html`
        <span
          class=${spanClasses}
          @mouseenter=${() => this.#onSpanMouseEnter(startIndex)}
          @mouseleave=${this.#onSpanMouseLeave}
          jslog=${VisualLogging.item("matched-address-item").track({ hover: true })}
        >${templateLines}</span>`;
    };
    const spans = [];
    const matchIndices = /* @__PURE__ */ new Set([0, this.#address.length]);
    for (const match of this.#matches) {
      matchIndices.add(match.startIndex);
      matchIndices.add(match.endIndex);
    }
    const sortedMatchIndices = Array.from(matchIndices).sort((a, b) => a - b);
    for (let i = 0; i < sortedMatchIndices.length - 1; i++) {
      spans.push(createSpan(sortedMatchIndices[i], sortedMatchIndices[i + 1]));
    }
    return html`
      <div class="address">
        ${spans}
      </div>
    `;
  }
  #onSpanMouseEnter(startIndex) {
    this.#highlightedMatches = this.#matches.filter((match) => match.startIndex <= startIndex && match.endIndex > startIndex);
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  #onSpanMouseLeave() {
    this.#highlightedMatches = [];
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  #renderFilledFields() {
    if (!this.#filledFields.length) {
      return Lit.nothing;
    }
    const highlightedGridRows = new Set(this.#highlightedMatches.map((match) => match.filledFieldIndex));
    return html`
      <div class="grid-wrapper" role="region" aria-label=${i18nString(UIStrings.formInspector)}>
        <devtools-data-grid
          striped
          class="filled-fields-grid"
        >
          <table>
            <tr>
              <th id="name" weight="50" sortable>${i18nString(UIStrings.formField)}</th>
              <th id="autofill-type" weight="50" sortable>${i18nString(UIStrings.predictedAutofillValue)}</th>
              <th id="value" weight="50" sortable>${i18nString(UIStrings.value)}</th>
            </tr>
            ${this.#filledFields.map((field, index) => html`
                <tr style=${styleMap({
      "font-family": "var(--monospace-font-family)",
      "font-size": "var(--monospace-font-size)",
      "background-color": highlightedGridRows.has(index) ? "var(--sys-color-state-hover-on-subtle)" : null
    })}
                  @mouseenter=${() => this.#onGridRowMouseEnter(index)}
                  @mouseleave=${this.#onGridRowMouseLeave.bind(this)}
                >
                  <td>${field.name || `#${field.id}`} (${field.htmlType})</td>
                  <td>
                      ${field.autofillType}
                      ${field.fillingStrategy === "autocompleteAttribute" ? html`<devtools-adorner title=${i18nString(UIStrings.autocompleteAttribute)} .data=${{ name: field.fillingStrategy }}>
                              <span>${i18nString(UIStrings.attr)}</span>
                            </devtools-adorner>` : field.fillingStrategy === "autofillInferred" ? html`<devtools-adorner title=${i18nString(UIStrings.inferredByHeuristics)} .data=${{ name: field.fillingStrategy }}>
                              <span>${i18nString(UIStrings.heur)}</span>
                            </devtools-adorner>` : Lit.nothing}
                  </td>
                  <td>"${field.value}"</td>
                </tr>`)}
          </table>
        </devtools-data-grid>
      </div>
    `;
  }
  #onGridRowMouseEnter(rowIndex) {
    this.#highlightedMatches = this.#matches.filter((match) => match.filledFieldIndex === rowIndex);
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    const backendNodeId = this.#filledFields[rowIndex].fieldId;
    const target = SDK.FrameManager.FrameManager.instance().getFrame(this.#filledFields[rowIndex].frameId)?.resourceTreeModel().target();
    if (target) {
      const deferredNode = new SDK.DOMModel.DeferredDOMNode(target, backendNodeId);
      const domModel = target.model(SDK.DOMModel.DOMModel);
      if (deferredNode && domModel) {
        domModel.overlayModel().highlightInOverlay({ deferredNode }, "all");
      }
    }
  }
  #onGridRowMouseLeave() {
    this.#highlightedMatches = [];
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    SDK.OverlayModel.OverlayModel.hideDOMNodeHighlight();
  }
};
customElements.define("devtools-autofill-view", AutofillView);
export {
  AutofillView_exports as AutofillView
};
//# sourceMappingURL=autofill.js.map
