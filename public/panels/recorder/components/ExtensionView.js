// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../../ui/legacy/legacy.js';
import * as VisualLogging from '../../../../front_end/ui/visual_logging/visual_logging.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as IconButton from '../../../ui/components/icon_button/icon_button.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import * as Extensions from '../extensions/extensions.js';
import extensionViewStyles from './extensionView.css.js';
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
const str_ = i18n.i18n.registerUIStrings('panels/recorder/components/ExtensionView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class ClosedEvent extends Event {
    static eventName = 'recorderextensionviewclosed';
    constructor() {
        super(ClosedEvent.eventName, { bubbles: true, composed: true });
    }
}
export class ExtensionView extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-recorder-extension-view`;
    #shadow = this.attachShadow({ mode: 'open' });
    #descriptor;
    constructor() {
        super();
        this.setAttribute('jslog', `${VisualLogging.section().context('extension-view')}`);
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [extensionViewStyles];
        this.#render();
    }
    disconnectedCallback() {
        if (!this.#descriptor) {
            return;
        }
        Extensions.ExtensionManager.ExtensionManager.instance().getView(this.#descriptor.id).hide();
    }
    set descriptor(descriptor) {
        this.#descriptor = descriptor;
        this.#render();
        Extensions.ExtensionManager.ExtensionManager.instance().getView(descriptor.id).show();
    }
    #closeView() {
        this.dispatchEvent(new ClosedEvent());
    }
    #render() {
        if (!this.#descriptor) {
            return;
        }
        const iframe = Extensions.ExtensionManager.ExtensionManager.instance().getView(this.#descriptor.id).frame();
        // clang-format off
        LitHtml.render(LitHtml.html `
        <div class="extension-view">
          <header>
            <div class="title">
              <${IconButton.Icon.Icon.litTagName}
                class="icon"
                title=${i18nString(UIStrings.extension)}
                name="extension">
              </${IconButton.Icon.Icon.litTagName}>
              ${this.#descriptor.title}
            </div>
            <${Buttons.Button.Button.litTagName}
              title=${i18nString(UIStrings.closeView)}
              .jslogContext=${'close-view'}
              .data=${{
            variant: "round" /* Buttons.Button.Variant.ROUND */,
            size: "TINY" /* Buttons.Button.Size.TINY */,
            iconName: 'cross',
        }}
              @click=${this.#closeView}
            ></${Buttons.Button.Button.litTagName}>
          </header>
          <main>
            ${iframe}
          <main>
      </div>
    `, this.#shadow, { host: this });
        // clang-format on
    }
}
ComponentHelpers.CustomElements.defineComponent('devtools-recorder-extension-view', ExtensionView);
//# sourceMappingURL=ExtensionView.js.map