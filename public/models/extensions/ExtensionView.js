/*
 * Copyright (C) 2012 Google Inc. All rights reserved.
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
import * as Lit from '../../ui/lit/lit.js';
const { render, html, Directives: { ref } } = Lit;
const DEFAULT_VIEW = (input, output, target) => {
    // clang-format off
    render(html `<iframe
    ${ref(element => { output.iframe = element; })}
    src=${input.src}
    class=${input.className}
    @load=${input.onLoad}></iframe>`, target);
    // clang-format on
};
export class ExtensionView extends UI.Widget.Widget {
    #server;
    #id;
    #src;
    #className;
    #iframe;
    #frameIndex;
    #view;
    constructor(server, id, src, className, view = DEFAULT_VIEW) {
        super();
        this.#view = view;
        this.#server = server;
        this.#src = src;
        this.#className = className;
        this.#id = id;
        this.setHideOnDetach(); // Override
        void this.performUpdate();
    }
    performUpdate() {
        const output = {};
        this.#view({
            src: this.#src,
            className: this.#className,
            onLoad: this.onLoad.bind(this),
        }, output, this.element);
        if (output.iframe) {
            this.#iframe = output.iframe;
        }
    }
    wasShown() {
        super.wasShown();
        if (typeof this.#frameIndex === 'number') {
            this.#server.notifyViewShown(this.#id, this.#frameIndex);
        }
    }
    willHide() {
        if (typeof this.#frameIndex === 'number') {
            this.#server.notifyViewHidden(this.#id);
        }
    }
    onLoad() {
        if (!this.#iframe) {
            return;
        }
        const frames = window.frames;
        this.#frameIndex = Array.prototype.indexOf.call(frames, this.#iframe.contentWindow);
        if (this.isShowing()) {
            this.#server.notifyViewShown(this.#id, this.#frameIndex);
        }
    }
}
export class ExtensionNotifierView extends UI.Widget.VBox {
    server;
    id;
    constructor(server, id) {
        super();
        this.server = server;
        this.id = id;
    }
    wasShown() {
        this.server.notifyViewShown(this.id);
    }
    willHide() {
        this.server.notifyViewHidden(this.id);
    }
}
//# sourceMappingURL=ExtensionView.js.map