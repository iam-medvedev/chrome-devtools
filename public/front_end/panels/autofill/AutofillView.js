// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Adorners from '../../ui/components/adorners/adorners.js';
import * as DataGrid from '../../ui/components/data_grid/data_grid.js';
import * as ComponentHelpers from '../../ui/components/helpers/helpers.js';
import * as LegacyWrapper from '../../ui/components/legacy_wrapper/legacy_wrapper.js';
import * as LitHtml from '../../ui/lit-html/lit-html.js';
import autofillViewStyles from './autofillView.css.js';
const UIStrings = {
    /**
     * @description Title placeholder text when no Autofill data is available.
     */
    noDataAvailable: 'No Autofill event detected',
    /**
     * @description Column header for column containing form field values
     */
    value: 'Value',
    /**
     * @description Column header for column containing the predicted autofill categories
     */
    predictedAutofillValue: 'Predicted autofill value',
    /**
     * @description Column header for column containing the name/label/id of form fields
     */
    formField: 'Form field',
    /**
     * @description Tooltip for an adorner for form fields which have an autocomplete attribute
     * (http://go/mdn/HTML/Attributes/autocomplete)
     */
    autocompleteAttribute: 'Autocomplete attribute',
    /**
     * @description Abbreviation of 'attribute'. Text content of an adorner for form fields which
     * have an autocomplete attribute (http://go/mdn/HTML/Attributes/autocomplete)
     */
    attr: 'attr',
    /**
     * @description Tooltip for an adorner for form fields which don't have an autocomplete attribute
     * (http://go/mdn/HTML/Attributes/autocomplete) and for which Chrome used heuristics to deduce
     * the form field's autocomplete category.
     */
    inferredByHeuristics: 'Inferred by heuristics',
    /**
     * @description Abbreviation of 'heuristics'. Text content of an adorner for form fields which
     * don't have an autocomplete attribute (http://go/mdn/HTML/Attributes/autocomplete) and for
     * which Chrome used heuristics to deduce the form field's autocomplete category.
     */
    heur: 'heur',
};
const str_ = i18n.i18n.registerUIStrings('panels/autofill/AutofillView.ts', UIStrings);
export const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class AutofillView extends LegacyWrapper.LegacyWrapper.WrappableComponent {
    static litTagName = LitHtml.literal `devtools-autofill-view`;
    #shadow = this.attachShadow({ mode: 'open' });
    #renderBound = this.#render.bind(this);
    #addressUi = { addressFields: [] };
    #filledFields = [];
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [autofillViewStyles];
        SDK.TargetManager.TargetManager.instance().observeModels(SDK.AutofillModel.AutofillModel, this, { scoped: true });
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.ResourceTreeModel.ResourceTreeModel, SDK.ResourceTreeModel.Events.PrimaryPageChanged, this.#onPrimaryPageChanged, this);
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
    }
    #onPrimaryPageChanged() {
        this.#addressUi = { addressFields: [] };
        this.#filledFields = [];
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
    }
    #addressFormFilled({ data }) {
        ({ addressUi: this.#addressUi, filledFields: this.#filledFields } = data.event);
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#renderBound);
    }
    async #render() {
        if (!ComponentHelpers.ScheduledRender.isScheduledRender(this)) {
            throw new Error('AutofillView render was not scheduled');
        }
        if (!this.#addressUi.addressFields.length && !this.#filledFields.length) {
            // Disabled until https://crbug.com/1079231 is fixed.
            // clang-format off
            LitHtml.render(LitHtml.html `
        <div class="placeholder-container">
          <div class="placeholder">${i18nString(UIStrings.noDataAvailable)}</h1>
        </div>
      `, this.#shadow, { host: this });
            // clang-format on
            return;
        }
        // Disabled until https://crbug.com/1079231 is fixed.
        // clang-format off
        LitHtml.render(LitHtml.html `
      <div class="content-container">
        ${this.#renderAddressUi()}
        ${this.#renderFilledFields()}
      </div>
    `, this.#shadow, { host: this });
        // clang-format on
    }
    #renderAddressUi() {
        if (!this.#addressUi.addressFields.length) {
            return LitHtml.nothing;
        }
        return LitHtml.html `
      <div class="address">
        ${this.#addressUi.addressFields.map(fields => this.#renderAddressRow(fields))}
      </div>
    `;
    }
    #renderAddressRow(fields) {
        return LitHtml.html `
      <div>${fields.fields.map(field => field.value).join(' ')}</div>
    `;
    }
    #renderFilledFields() {
        if (!this.#filledFields.length) {
            return LitHtml.nothing;
        }
        const gridData = {
            columns: [
                {
                    id: 'name',
                    title: i18nString(UIStrings.formField),
                    widthWeighting: 50,
                    hideable: false,
                    visible: true,
                    sortable: true,
                },
                {
                    id: 'autofillType',
                    title: i18nString(UIStrings.predictedAutofillValue),
                    widthWeighting: 50,
                    hideable: false,
                    visible: true,
                    sortable: true,
                },
                {
                    id: 'value',
                    title: i18nString(UIStrings.value),
                    widthWeighting: 50,
                    hideable: false,
                    visible: true,
                    sortable: true,
                },
            ],
            rows: this.#buildReportRows(),
            striped: true,
        };
        // Disabled until https://crbug.com/1079231 is fixed.
        // clang-format off
        return LitHtml.html `
      <div class="grid-wrapper">
        <${DataGrid.DataGridController.DataGridController.litTagName} class="filled-fields-grid" .data=${gridData}>
        </${DataGrid.DataGridController.DataGridController.litTagName}>
      </div>
    `;
        // clang-format on
    }
    #buildReportRows() {
        return this.#filledFields.map(field => {
            const fieldName = field.name || `#${field.id}`;
            return {
                cells: [
                    { columnId: 'name', value: `${fieldName} (${field.htmlType})` },
                    {
                        columnId: 'autofillType',
                        value: field.autofillType,
                        renderer: () => this.#autofillTypeRenderer(field.autofillType, field.fillingStrategy),
                    },
                    { columnId: 'value', value: `"${field.value}"` },
                ],
            };
        });
    }
    #autofillTypeRenderer(autofillType, fillingStrategy) {
        const adornerContent = document.createElement('span');
        let adornerTitle = '';
        switch (fillingStrategy) {
            case "autocompleteAttribute" /* Protocol.Autofill.FillingStrategy.AutocompleteAttribute */:
                adornerContent.textContent = i18nString(UIStrings.attr);
                adornerTitle = i18nString(UIStrings.autocompleteAttribute);
                break;
            case "autofillInferred" /* Protocol.Autofill.FillingStrategy.AutofillInferred */:
                adornerContent.textContent = i18nString(UIStrings.heur);
                adornerTitle = i18nString(UIStrings.inferredByHeuristics);
        }
        // Disabled until https://crbug.com/1079231 is fixed.
        // clang-format off
        return LitHtml.html `
      ${autofillType}
      ${adornerContent.textContent ? LitHtml.html `
          <${Adorners.Adorner.Adorner.litTagName} title=${adornerTitle} .data=${{ name: fillingStrategy, content: adornerContent }}>
        ` : LitHtml.nothing}
    `;
        // clang-format on
    }
    modelAdded(model) {
        model.addEventListener(SDK.AutofillModel.Events.AddressFormFilled, this.#addressFormFilled, this);
    }
    modelRemoved(model) {
        model.removeEventListener(SDK.AutofillModel.Events.AddressFormFilled, this.#addressFormFilled, this);
    }
}
ComponentHelpers.CustomElements.defineComponent('devtools-autofill-view', AutofillView);
//# sourceMappingURL=AutofillView.js.map