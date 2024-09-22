// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// TODO: move to ui/components/node_link?
import * as Common from '../../../../core/common/common.js';
import * as SDK from '../../../../core/sdk/sdk.js';
import * as ComponentHelpers from '../../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
export class NodeLink extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-node-link`;
    #shadow = this.attachShadow({ mode: 'open' });
    #boundRender = this.#render.bind(this);
    #backendNodeId;
    #options;
    set data(data) {
        this.#backendNodeId = data.backendNodeId;
        this.#options = data.options;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    async #linkify() {
        // TODO: consider using `Trace.Extras.FetchNodes.extractRelatedDOMNodesFromEvent`, which
        // requires parsedTrace.
        if (this.#backendNodeId === undefined) {
            return;
        }
        const mainTarget = SDK.TargetManager.TargetManager.instance().primaryPageTarget();
        if (!mainTarget) {
            return;
        }
        const domModel = mainTarget.model(SDK.DOMModel.DOMModel);
        if (!domModel) {
            return;
        }
        const backendNodeIds = new Set([this.#backendNodeId]);
        const domNodesMap = await domModel.pushNodesByBackendIdsToFrontend(backendNodeIds);
        if (!domNodesMap) {
            return;
        }
        const node = domNodesMap.get(this.#backendNodeId);
        if (!node) {
            return;
        }
        // TODO: it'd be nice if we could specify what attributes to render,
        // ex for the Viewport insight: <meta content="..."> (instead of just <meta>)
        return Common.Linkifier.Linkifier.linkify(node, this.#options);
    }
    async #render() {
        const relatedNodeEl = await this.#linkify();
        LitHtml.render(LitHtml.html `<div class='node-link'>
        ${relatedNodeEl}
      </div>`, this.#shadow, { host: this });
    }
}
customElements.define('devtools-performance-node-link', NodeLink);
//# sourceMappingURL=NodeLink.js.map