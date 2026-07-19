// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import * as Extensions from './extensions/extensions.js';
import extensionViewStyles from './extensionView.css.js';
const { html } = Lit;
const UIStrings = {
    /**
     * @description The button label that closes the panel that shows the extension content inside the Recorder panel.
     */
    closeView: 'Close',
    /**
     * @description The label that indicates that the content shown is provided by a browser extension.
     */
    extension: 'Content provided by a browser extension',
};
const str_ = i18n.i18n.registerUIStrings('panels/recorder/ExtensionView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export const DEFAULT_VIEW = (input, output, target) => {
    const { descriptor, iframe } = input;
    // clang-format off
    Lit.render(html `
      <style>${extensionViewStyles}</style>
      <div class="extension-view">
        <header>
          <div class="title">
            <devtools-icon
              class="icon"
              title=${i18nString(UIStrings.extension)}
              name="extension">
            </devtools-icon>
            ${descriptor.title}
          </div>
          <devtools-button
            title=${i18nString(UIStrings.closeView)}
            jslog=${VisualLogging.close().track({ click: true })}
            .data=${{
        variant: "icon" /* Buttons.Button.Variant.ICON */,
        size: "SMALL" /* Buttons.Button.Size.SMALL */,
        iconName: 'cross',
    }}
            @click=${output.closeView}
          ></devtools-button>
        </header>
        <main>
          ${iframe}
        </main>
    </div>
  `, target, { container: { attributes: { jslog: VisualLogging.section('extension-view') } } });
    // clang-format on
};
export class ExtensionView extends UI.Widget.VBox {
    #descriptor;
    #view;
    #onClose;
    #viewOutput = {
        closeView: () => {
            this.#onClose?.();
        },
    };
    set onClose(callback) {
        this.#onClose = callback;
    }
    constructor(element, view = DEFAULT_VIEW) {
        super(element, { useShadowDom: true });
        this.#view = view;
    }
    get descriptor() {
        return this.#descriptor;
    }
    set descriptor(descriptor) {
        this.#descriptor = descriptor;
        if (descriptor) {
            Extensions.ExtensionManager.ExtensionManager.instance().getView(descriptor.id).show();
        }
        this.requestUpdate();
    }
    willHide() {
        super.willHide();
        if (this.#descriptor) {
            Extensions.ExtensionManager.ExtensionManager.instance().getView(this.#descriptor.id).hide();
        }
    }
    performUpdate() {
        if (!this.#descriptor) {
            return;
        }
        const iframe = Extensions.ExtensionManager.ExtensionManager.instance().getView(this.#descriptor.id).frame();
        this.#view({ descriptor: this.#descriptor, iframe }, this.#viewOutput, this.contentElement);
    }
}
//# sourceMappingURL=ExtensionView.js.map