// Copyright 2019 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
import * as UI from '../../ui/legacy/legacy.js';
import { html, render } from '../../ui/lit/lit.js';
import nodeStackTraceWidgetStyles from './nodeStackTraceWidget.css.js';
const UIStrings = {
    /**
     * @description Message displayed when no JavaScript stack trace is available for the DOM node in the Stack Trace widget of the Elements panel
     */
    noStackTraceAvailable: 'No stack trace available',
};
const str_ = i18n.i18n.registerUIStrings('panels/elements/NodeStackTraceWidget.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export const DEFAULT_VIEW = (input, _output, target) => {
    const { target: sdkTarget, linkifier, options } = input;
    // clang-format off
    render(html `
    <style>${nodeStackTraceWidgetStyles}</style>
    ${target && options.stackTrace ?
        html `<devtools-widget
                class="stack-trace"
                .widgetConfig=${UI.Widget.widgetConfig(Components.JSPresentationUtils.StackTracePreviewContent, { target: sdkTarget, linkifier, options })}>
              </devtools-widget>` :
        html `<div class="gray-info-message">${i18nString(UIStrings.noStackTraceAvailable)}</div>`}`, target);
    // clang-format on
};
export class NodeStackTraceWidget extends UI.ThrottledWidget.ThrottledWidget {
    #linkifier = new Components.Linkifier.Linkifier(MaxLengthForLinks);
    #view;
    constructor(view = DEFAULT_VIEW) {
        super(true /* isWebComponent */);
        this.#view = view;
    }
    wasShown() {
        super.wasShown();
        UI.Context.Context.instance().addFlavorChangeListener(SDK.DOMModel.DOMNode, this.update, this);
        this.update();
    }
    willHide() {
        UI.Context.Context.instance().removeFlavorChangeListener(SDK.DOMModel.DOMNode, this.update, this);
    }
    async doUpdate() {
        const node = UI.Context.Context.instance().flavor(SDK.DOMModel.DOMNode);
        const stackTrace = await node?.creationStackTrace() ?? undefined;
        const input = {
            target: node?.domModel().target(),
            linkifier: this.#linkifier,
            options: { stackTrace },
        };
        this.#view(input, {}, this.contentElement);
    }
}
export const MaxLengthForLinks = 40;
//# sourceMappingURL=NodeStackTraceWidget.js.map