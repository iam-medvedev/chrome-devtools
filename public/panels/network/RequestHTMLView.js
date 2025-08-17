/*
 * Copyright (C) 2011 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import * as UI from '../../ui/legacy/legacy.js';
import { html, nothing, render } from '../../ui/lit/lit.js';
import requestHTMLViewStyles from './requestHTMLView.css.js';
export const DEFAULT_VIEW = (input, _output, target) => {
    // Forbid to run JavaScript and set unique origin.
    // clang-format off
    render(html `
    <style>${requestHTMLViewStyles}</style>
    <div class="html request-view widget vbox">
      ${input.dataURL ? html `
        <!-- @ts-ignore -->
        <iframe class="html-preview-frame" sandbox
          csp="default-src 'none';img-src data:;style-src 'unsafe-inline'" src=${input.dataURL}
          tabindex="-1" role="presentation"></iframe>` : nothing}
    </div>`, target);
    // clang-format on
};
export class RequestHTMLView extends UI.Widget.VBox {
    #dataURL;
    #view;
    constructor(dataURL, view = DEFAULT_VIEW) {
        super({ useShadowDom: true });
        this.#dataURL = dataURL;
        this.#view = view;
    }
    static create(contentData) {
        const dataURL = contentData.asDataUrl();
        return dataURL ? new RequestHTMLView(dataURL) : null;
    }
    wasShown() {
        super.wasShown();
        this.requestUpdate();
    }
    willHide() {
        this.requestUpdate();
    }
    performUpdate() {
        this.#view({ dataURL: this.#dataURL }, {}, this.contentElement);
    }
}
//# sourceMappingURL=RequestHTMLView.js.map