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
/* eslint-disable rulesdir/no-imperative-dom-api */
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as TextUtils from '../../models/text_utils/text_utils.js';
import * as SourceFrame from '../../ui/legacy/components/source_frame/source_frame.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import { BinaryResourceView } from './BinaryResourceView.js';
const UIStrings = {
    /**
     *@description Text in Request Response View of the Network panel if no preview can be shown
     */
    noPreview: 'Nothing to preview',
    /**
     *@description Text in Request Response View of the Network panel
     */
    thisRequestHasNoResponseData: 'This request has no response data available',
    /**
     *@description Text in Request Preview View of the Network panel
     */
    failedToLoadResponseData: 'Failed to load response data',
};
const str_ = i18n.i18n.registerUIStrings('panels/network/RequestResponseView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class RequestResponseView extends UI.Widget.VBox {
    request;
    contentViewPromise;
    constructor(request) {
        super();
        this.element.classList.add('request-view');
        this.element.setAttribute('jslog', `${VisualLogging.pane('response').track({ resize: true })}`);
        this.request = request;
        this.contentViewPromise = null;
    }
    static #sourceViewForRequest(request, contentData) {
        let sourceView = requestToSourceView.get(request);
        if (sourceView !== undefined) {
            return sourceView;
        }
        let mimeType;
        // If the main document is of type JSON (or any JSON subtype), do not use the more generic canonical MIME type,
        // which would prevent the JSON from being pretty-printed. See https://crbug.com/406900
        if (Common.ResourceType.ResourceType.simplifyContentType(request.mimeType) === 'application/json') {
            mimeType = request.mimeType;
        }
        else {
            mimeType = request.resourceType().canonicalMimeType() || request.mimeType;
        }
        const isWasm = contentData.mimeType === 'application/wasm';
        const isMinified = isWasm || !contentData.isTextContent ? false : TextUtils.TextUtils.isMinified(contentData.content().text);
        const mediaType = Common.ResourceType.ResourceType.mediaTypeForMetrics(mimeType, request.resourceType().isFromSourceMap(), isMinified, false, false);
        Host.userMetrics.networkPanelResponsePreviewOpened(mediaType);
        if (contentData.isTextContent || isWasm) {
            // Note: Even though WASM is binary data, the source view will disassemble it and show a text representation.
            sourceView = SourceFrame.ResourceSourceFrame.ResourceSourceFrame.createSearchableView(request, mimeType);
        }
        else {
            sourceView = new BinaryResourceView(contentData, request.url(), request.resourceType());
        }
        requestToSourceView.set(request, sourceView);
        return sourceView;
    }
    wasShown() {
        void this.doShowPreview();
    }
    doShowPreview() {
        if (!this.contentViewPromise) {
            this.contentViewPromise = this.showPreview();
        }
        return this.contentViewPromise;
    }
    async showPreview() {
        const responseView = await this.createPreview();
        responseView.show(this.element);
        return responseView;
    }
    async createPreview() {
        const contentData = await this.request.requestStreamingContent();
        if (TextUtils.StreamingContentData.isError(contentData)) {
            return new UI.EmptyWidget.EmptyWidget(i18nString(UIStrings.failedToLoadResponseData), contentData.error);
        }
        const sourceView = RequestResponseView.#sourceViewForRequest(this.request, contentData);
        if (!sourceView || this.request.statusCode === 204) {
            return new UI.EmptyWidget.EmptyWidget(i18nString(UIStrings.noPreview), i18nString(UIStrings.thisRequestHasNoResponseData));
        }
        return sourceView;
    }
    async revealPosition(position) {
        const view = await this.doShowPreview();
        if (view instanceof SourceFrame.ResourceSourceFrame.SearchableContainer) {
            void view.revealPosition(position);
        }
    }
}
const requestToSourceView = new WeakMap();
//# sourceMappingURL=RequestResponseView.js.map