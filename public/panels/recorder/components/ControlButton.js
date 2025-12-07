// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as UI from '../../../ui/legacy/legacy.js';
import * as Lit from '../../../ui/lit/lit.js';
import controlButtonStyles from './controlButton.css.js';
const { html } = Lit;
export const DEFAULT_VIEW = (input, _output, target) => {
    const { label, shape, disabled, onClick } = input;
    const handleClickEvent = (event) => {
        if (disabled) {
            event.stopPropagation();
            event.preventDefault();
        }
        else {
            onClick(event);
        }
    };
    // clang-format off
    Lit.render(html `
    <style>${controlButtonStyles}</style>
    <button
        @click=${handleClickEvent}
        .disabled=${disabled}
        class="control">
      <div class="icon ${shape}"></div>
      <div class="label">${label}</div>
    </button>
  `, target);
    // clang-format on
};
export class ControlButton extends UI.Widget.Widget {
    #label = '';
    #shape = 'square';
    #disabled = false;
    #onClick = () => { };
    #view;
    constructor(element, view) {
        super(element, { useShadowDom: true, classes: ['flex-none'] });
        this.#view = view || DEFAULT_VIEW;
    }
    set label(label) {
        this.#label = label;
        this.requestUpdate();
    }
    set shape(shape) {
        this.#shape = shape;
        this.requestUpdate();
    }
    set disabled(disabled) {
        this.#disabled = disabled;
        this.requestUpdate();
    }
    set onClick(onClick) {
        this.#onClick = onClick;
        this.requestUpdate();
    }
    performUpdate() {
        this.#view({
            label: this.#label,
            shape: this.#shape,
            disabled: this.#disabled,
            onClick: this.#onClick,
        }, {}, this.contentElement);
    }
}
//# sourceMappingURL=ControlButton.js.map