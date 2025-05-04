// Copyright 2019 The Chromium Authors. All rights reserved.
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
     *@description Message displayed when no JavaScript stack trace is available for the DOM node in the Stack Trace widget of the Elements panel
     */
    noStackTraceAvailable: 'No stack trace available',
};
const str_ = i18n.i18n.registerUIStrings('panels/elements/NodeStackTraceWidget.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export const DEFAULT_VIEW = (input, _output, target) => {
    // clang-format off
    render(html `
    <style>${nodeStackTraceWidgetStyles.cssText}</style>
    ${input.stackTracePreview ?
        html `<div class="stack-trace">${input.stackTracePreview}</div>` :
        html `<div class="gray-info-message">${i18nString(UIStrings.noStackTraceAvailable)}</div>`}`, target, { host: input });
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
        const creationStackTrace = node ? await node.creationStackTrace() : null;
        const stackTracePreview = node && creationStackTrace ?
            Components.JSPresentationUtils
                .buildStackTracePreviewContents(node.domModel().target(), this.#linkifier, { stackTrace: creationStackTrace, tabStops: undefined })
                .element :
            null;
        const input = {
            stackTracePreview,
        };
        this.#view(input, {}, this.contentElement);
    }
}
export const MaxLengthForLinks = 40;
//# sourceMappingURL=NodeStackTraceWidget.js.map