// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as LitHtml from '../../lit-html/lit-html.js';
import * as VisualLogging from '../../visual_logging/visual_logging.js';
import * as IconButton from '../icon_button/icon_button.js';
import buttonStyles from './button.css.legacy.js';
export class Button extends HTMLElement {
    static formAssociated = true;
    static litTagName = LitHtml.literal `devtools-button`;
    #shadow = this.attachShadow({ mode: 'open', delegatesFocus: true });
    #boundOnClick = this.#onClick.bind(this);
    #props = {
        size: "REGULAR" /* Size.REGULAR */,
        variant: "primary" /* Variant.PRIMARY */,
        toggleOnClick: true,
        disabled: false,
        active: false,
        spinner: false,
        type: 'button',
        longClickable: false,
    };
    #internals = this.attachInternals();
    #slotRef = LitHtml.Directives.createRef();
    constructor() {
        super();
        this.setAttribute('role', 'presentation');
        this.addEventListener('click', this.#boundOnClick, true);
        // TODO(crbug.com/359141904): Ideally we would be using
        // adopted style sheets for installing css styles, but this
        // currently throws an error when sharing the styles across
        // multiple documents. This is a workaround.
        const styleElement = document.createElement('style');
        styleElement.textContent = buttonStyles.cssContent;
        this.#shadow.appendChild(styleElement);
    }
    /**
     * Perfer using the .data= setter instead of setting the individual properties
     * for increased type-safety.
     */
    set data(data) {
        this.#props.variant = data.variant;
        this.#props.iconUrl = data.iconUrl;
        this.#props.iconName = data.iconName;
        this.#props.toggledIconName = data.toggledIconName;
        this.#props.toggleOnClick = data.toggleOnClick !== undefined ? data.toggleOnClick : true;
        this.#props.size = "REGULAR" /* Size.REGULAR */;
        if ('size' in data && data.size) {
            this.#props.size = data.size;
        }
        this.#props.active = Boolean(data.active);
        this.#props.spinner = Boolean('spinner' in data ? data.spinner : false);
        this.#props.type = 'button';
        if ('type' in data && data.type) {
            this.#props.type = data.type;
        }
        this.#props.toggled = data.toggled;
        this.#props.toggleType = data.toggleType;
        this.#props.checked = data.checked;
        this.#props.disabled = Boolean(data.disabled);
        this.#props.title = data.title;
        this.#props.jslogContext = data.jslogContext;
        this.#props.longClickable = data.longClickable;
        this.#render();
    }
    set iconUrl(iconUrl) {
        this.#props.iconUrl = iconUrl;
        this.#render();
    }
    set iconName(iconName) {
        this.#props.iconName = iconName;
        this.#render();
    }
    set toggledIconName(toggledIconName) {
        this.#props.toggledIconName = toggledIconName;
        this.#render();
    }
    set toggleType(toggleType) {
        this.#props.toggleType = toggleType;
        this.#render();
    }
    set variant(variant) {
        this.#props.variant = variant;
        this.#render();
    }
    set size(size) {
        this.#props.size = size;
        this.#render();
    }
    set reducedFocusRing(reducedFocusRing) {
        this.#props.reducedFocusRing = reducedFocusRing;
        this.#render();
    }
    set type(type) {
        this.#props.type = type;
        this.#render();
    }
    set title(title) {
        this.#props.title = title;
        this.#render();
    }
    set disabled(disabled) {
        this.#setDisabledProperty(disabled);
        this.#render();
    }
    set toggleOnClick(toggleOnClick) {
        this.#props.toggleOnClick = toggleOnClick;
        this.#render();
    }
    set toggled(toggled) {
        this.#props.toggled = toggled;
        this.#render();
    }
    get toggled() {
        return Boolean(this.#props.toggled);
    }
    set checked(checked) {
        this.#props.checked = checked;
        this.#render();
    }
    set pressed(pressed) {
        this.#props.pressed = pressed;
        this.#render();
    }
    set active(active) {
        this.#props.active = active;
        this.#render();
    }
    get active() {
        return this.#props.active;
    }
    set spinner(spinner) {
        this.#props.spinner = spinner;
        this.#render();
    }
    get jslogContext() {
        return this.#props.jslogContext;
    }
    set jslogContext(jslogContext) {
        this.#props.jslogContext = jslogContext;
        this.#render();
    }
    set longClickable(longClickable) {
        this.#props.longClickable = longClickable;
        this.#render();
    }
    #setDisabledProperty(disabled) {
        this.#props.disabled = disabled;
        this.#render();
    }
    focus() {
        this.#shadow.querySelector('button')?.focus();
    }
    connectedCallback() {
        this.#render();
    }
    #onClick(event) {
        if (this.#props.disabled) {
            event.stopPropagation();
            event.preventDefault();
            return;
        }
        if (this.form && this.#props.type === 'submit') {
            event.preventDefault();
            this.form.dispatchEvent(new SubmitEvent('submit', {
                submitter: this,
            }));
        }
        if (this.form && this.#props.type === 'reset') {
            event.preventDefault();
            this.form.reset();
        }
        if (this.#props.toggleOnClick && this.#props.variant === "icon_toggle" /* Variant.ICON_TOGGLE */ && this.#props.iconName) {
            this.toggled = !this.#props.toggled;
        }
    }
    #isToolbarVariant() {
        return this.#props.variant === "toolbar" /* Variant.TOOLBAR */ || this.#props.variant === "primary_toolbar" /* Variant.PRIMARY_TOOLBAR */;
    }
    #render() {
        const nodes = this.#slotRef.value?.assignedNodes();
        const isEmpty = !Boolean(nodes?.length);
        if (!this.#props.variant) {
            throw new Error('Button requires a variant to be defined');
        }
        if (this.#isToolbarVariant()) {
            if (!this.#props.iconUrl && !this.#props.iconName) {
                throw new Error('Toolbar button requires an icon');
            }
            if (!isEmpty) {
                throw new Error('Toolbar button does not accept children');
            }
        }
        if (this.#props.variant === "icon" /* Variant.ICON */) {
            if (!this.#props.iconUrl && !this.#props.iconName) {
                throw new Error('Icon button requires an icon');
            }
            if (!isEmpty) {
                throw new Error('Icon button does not accept children');
            }
        }
        if (this.#props.iconName && this.#props.iconUrl) {
            throw new Error('Both iconName and iconUrl are provided.');
        }
        const hasIcon = Boolean(this.#props.iconUrl) || Boolean(this.#props.iconName);
        const classes = {
            primary: this.#props.variant === "primary" /* Variant.PRIMARY */,
            tonal: this.#props.variant === "tonal" /* Variant.TONAL */,
            outlined: this.#props.variant === "outlined" /* Variant.OUTLINED */,
            text: this.#props.variant === "text" /* Variant.TEXT */,
            toolbar: this.#isToolbarVariant(),
            'primary-toolbar': this.#props.variant === "primary_toolbar" /* Variant.PRIMARY_TOOLBAR */,
            icon: this.#props.variant === "icon" /* Variant.ICON */ || this.#props.variant === "icon_toggle" /* Variant.ICON_TOGGLE */ ||
                this.#props.variant === "adorner_icon" /* Variant.ADORNER_ICON */,
            'primary-toggle': this.#props.toggleType === "primary-toggle" /* ToggleType.PRIMARY */,
            'red-toggle': this.#props.toggleType === "red-toggle" /* ToggleType.RED */,
            toggled: Boolean(this.#props.toggled),
            checked: Boolean(this.#props.checked),
            'text-with-icon': hasIcon && !isEmpty,
            'only-icon': hasIcon && isEmpty,
            micro: this.#props.size === "MICRO" /* Size.MICRO */,
            small: Boolean(this.#props.size === "SMALL" /* Size.SMALL */),
            'reduced-focus-ring': Boolean(this.#props.reducedFocusRing),
            active: this.#props.active,
        };
        const spinnerClasses = {
            primary: this.#props.variant === "primary" /* Variant.PRIMARY */,
            outlined: this.#props.variant === "outlined" /* Variant.OUTLINED */,
            disabled: Boolean(this.#props.disabled),
            spinner: true,
        };
        const jslog = this.#props.jslogContext && VisualLogging.action().track({ click: true }).context(this.#props.jslogContext);
        // clang-format off
        LitHtml.render(LitHtml.html `
        <button title=${LitHtml.Directives.ifDefined(this.#props.title)} .disabled=${this.#props.disabled} class=${LitHtml.Directives.classMap(classes)} aria-pressed=${LitHtml.Directives.ifDefined(this.#props.pressed)} jslog=${LitHtml.Directives.ifDefined(jslog)}>
          ${hasIcon
            ? LitHtml.html `
                <${IconButton.Icon.Icon.litTagName} name=${this.#props.toggled ? this.#props.toggledIconName : this.#props.iconName || this.#props.iconUrl}>
                </${IconButton.Icon.Icon.litTagName}>`
            : ''}
          ${this.#props.longClickable ? LitHtml.html `<${IconButton.Icon.Icon.litTagName} name=${'triangle-bottom-right'} class="long-click">
          </${IconButton.Icon.Icon.litTagName}>`
            : ''}
          ${this.#props.spinner ? LitHtml.html `<span class=${LitHtml.Directives.classMap(spinnerClasses)}></span>` : ''}
          <slot @slotchange=${this.#render} ${LitHtml.Directives.ref(this.#slotRef)}></slot>
        </button>
      `, this.#shadow, { host: this });
        // clang-format on
    }
    // Based on https://web.dev/more-capable-form-controls/ to make custom elements form-friendly.
    // Form controls usually expose a "value" property.
    get value() {
        return this.#props.value || '';
    }
    set value(value) {
        this.#props.value = value;
    }
    // The following properties and methods aren't strictly required,
    // but browser-level form controls provide them. Providing them helps
    // ensure consistency with browser-provided controls.
    get form() {
        return this.#internals.form;
    }
    get name() {
        return this.getAttribute('name');
    }
    get type() {
        return this.#props.type;
    }
    get validity() {
        return this.#internals.validity;
    }
    get validationMessage() {
        return this.#internals.validationMessage;
    }
    get willValidate() {
        return this.#internals.willValidate;
    }
    checkValidity() {
        return this.#internals.checkValidity();
    }
    reportValidity() {
        return this.#internals.reportValidity();
    }
}
customElements.define('devtools-button', Button);
//# sourceMappingURL=Button.js.map