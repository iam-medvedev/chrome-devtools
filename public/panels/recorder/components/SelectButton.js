// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-lit-render-outside-of-view */
import '../../../ui/components/menus/menus.js';
import * as Platform from '../../../core/platform/platform.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
// eslint-disable-next-line rulesdir/es-modules-import
import inspectorCommonStylesRaw from '../../../ui/legacy/inspectorCommon.css.js';
import * as Lit from '../../../ui/lit/lit.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import * as Models from '../models/models.js';
import selectButtonStylesRaw from './selectButton.css.js';
/* eslint-disable rulesdir/no-adopted-style-sheets --
 * TODO(crbug.com/391381439): Fully migrate off of Constructable Stylesheets.
 **/
const inspectorCommonStyles = new CSSStyleSheet();
inspectorCommonStyles.replaceSync(inspectorCommonStylesRaw);
const selectButtonStyles = new CSSStyleSheet();
selectButtonStyles.replaceSync(selectButtonStylesRaw);
const { html, Directives: { ifDefined, classMap } } = Lit;
export class SelectButtonClickEvent extends Event {
    value;
    static eventName = 'selectbuttonclick';
    constructor(value) {
        super(SelectButtonClickEvent.eventName, { bubbles: true, composed: true });
        this.value = value;
    }
}
export class SelectMenuSelectedEvent extends Event {
    value;
    static eventName = 'selectmenuselected';
    constructor(value) {
        super(SelectMenuSelectedEvent.eventName, { bubbles: true, composed: true });
        this.value = value;
    }
}
export class SelectButton extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #props = {
        disabled: false,
        value: '',
        items: [],
        buttonLabel: '',
        groups: [],
        variant: "primary" /* Variant.PRIMARY */,
    };
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [inspectorCommonStyles, selectButtonStyles];
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    get disabled() {
        return this.#props.disabled;
    }
    set disabled(disabled) {
        this.#props.disabled = disabled;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    get items() {
        return this.#props.items;
    }
    set items(items) {
        this.#props.items = items;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    set buttonLabel(buttonLabel) {
        this.#props.buttonLabel = buttonLabel;
    }
    set groups(groups) {
        this.#props.groups = groups;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    get value() {
        return this.#props.value;
    }
    set value(value) {
        this.#props.value = value;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    get variant() {
        return this.#props.variant;
    }
    set variant(variant) {
        this.#props.variant = variant;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    set action(value) {
        this.#props.action = value;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    #handleClick(ev) {
        ev.stopPropagation();
        this.dispatchEvent(new SelectButtonClickEvent(this.#props.value));
    }
    #handleSelectMenuSelect(evt) {
        if (evt.target instanceof HTMLSelectElement) {
            this.dispatchEvent(new SelectMenuSelectedEvent(evt.target.value));
            void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
        }
    }
    #renderSelectItem(item, selectedItem) {
        const selected = item.value === selectedItem.value;
        // clang-format off
        return html `
      <option
      .title=${item.label()}
      value=${item.value}
      ?selected=${selected}
      jslog=${VisualLogging.item(Platform.StringUtilities.toKebabCase(item.value)).track({ click: true })}
      >${(selected && item.buttonLabel) ? item.buttonLabel() : item.label()}</option>
    `;
        // clang-format on
    }
    #renderSelectGroup(group, selectedItem) {
        // clang-format off
        return html `
      <optgroup label=${group.name}>
        ${group.items.map(item => this.#renderSelectItem(item, selectedItem))}
      </optgroup>
    `;
        // clang-format on
    }
    #getTitle(label) {
        return this.#props.action ? Models.Tooltip.getTooltipForActions(label, this.#props.action) : '';
    }
    #render = () => {
        const hasGroups = Boolean(this.#props.groups.length);
        const items = hasGroups ? this.#props.groups.flatMap(group => group.items) : this.#props.items;
        const selectedItem = items.find(item => item.value === this.#props.value) || items[0];
        if (!selectedItem) {
            return;
        }
        const classes = {
            primary: this.#props.variant === "primary" /* Variant.PRIMARY */,
            secondary: this.#props.variant === "outlined" /* Variant.OUTLINED */,
        };
        const buttonVariant = this.#props.variant === "outlined" /* Variant.OUTLINED */ ? "outlined" /* Buttons.Button.Variant.OUTLINED */ : "primary" /* Buttons.Button.Variant.PRIMARY */;
        const menuLabel = selectedItem.buttonLabel ? selectedItem.buttonLabel() : selectedItem.label();
        // clang-format off
        Lit.render(html `
      <div class="select-button" title=${ifDefined(this.#getTitle(menuLabel))}>
      <select
      class=${classMap(classes)}
      ?disabled=${this.#props.disabled}
      jslog=${VisualLogging.dropDown('network-conditions').track({ change: true })}
      @change=${this.#handleSelectMenuSelect}>
        ${hasGroups
            ? this.#props.groups.map(group => this.#renderSelectGroup(group, selectedItem))
            : this.#props.items.map(item => this.#renderSelectItem(item, selectedItem))}
    </select>
        ${selectedItem
            ? html `
        <devtools-button
            .disabled=${this.#props.disabled}
            .variant=${buttonVariant}
            .iconName=${selectedItem.buttonIconName}
            @click=${this.#handleClick}>
            ${this.#props.buttonLabel}
        </devtools-button>`
            : ''}
      </div>`, this.#shadow, { host: this });
        // clang-format on
    };
}
customElements.define('devtools-select-button', SelectButton);
//# sourceMappingURL=SelectButton.js.map