// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as LitHtml from '../../lit-html/lit-html.js';
import switchStyles from './switch.css.js';
export class SwitchChangeEvent extends Event {
    checked;
    static eventName = 'switchchange';
    constructor(checked) {
        super(SwitchChangeEvent.eventName);
        this.checked = checked;
    }
}
export class Switch extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-switch`;
    #shadow = this.attachShadow({ mode: 'open' });
    #checked = false;
    #disabled = false;
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [switchStyles];
        this.#render();
    }
    set checked(isChecked) {
        this.#checked = isChecked;
        this.#render();
    }
    get checked() {
        return this.#checked;
    }
    set disabled(isDisabled) {
        this.#disabled = isDisabled;
        this.#render();
    }
    get disabled() {
        return this.#disabled;
    }
    #handleChange = (ev) => {
        this.#checked = ev.target.checked;
        this.dispatchEvent(new SwitchChangeEvent(this.#checked));
    };
    #render() {
        /* eslint-disable rulesdir/inject_checkbox_styles */
        // clang-format off
        LitHtml.render(LitHtml.html `
    <label role="button">
      <input type="checkbox"
        @change=${this.#handleChange}
        ?disabled=${this.#disabled}
        ?checked=${this.#checked}>
      <span class="slider"></span>
    </label>
    `, this.#shadow, { host: this });
        // clang-format on
        /* eslint-enable rulesdir/inject_checkbox_styles */
    }
}
customElements.define('devtools-switch', Switch);
//# sourceMappingURL=SwitchImpl.js.map