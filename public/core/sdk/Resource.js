// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TextUtils from '../../models/text_utils/text_utils.js';
import * as Common from '../common/common.js';
import * as Platform from '../platform/platform.js';
import { ContentData } from './ContentData.js';
import { Events } from './NetworkRequest.js';
export class Resource {
    #resourceTreeModel;
    #requestInternal;
    #urlInternal;
    #documentURLInternal;
    #frameIdInternal;
    #loaderIdInternal;
    #type;
    #mimeTypeInternal;
    #isGeneratedInternal;
    #lastModifiedInternal;
    #contentSizeInternal;
    #contentInternal;
    #contentEncodedInternal;
    #pendingContentCallbacks;
    #parsedURLInternal;
    #contentRequested;
    constructor(resourceTreeModel, request, url, documentURL, frameId, loaderId, type, mimeType, lastModified, contentSize) {
        this.#resourceTreeModel = resourceTreeModel;
        this.#requestInternal = request;
        this.url = url;
        this.#documentURLInternal = documentURL;
        this.#frameIdInternal = frameId;
        this.#loaderIdInternal = loaderId;
        this.#type = type || Common.ResourceType.resourceTypes.Other;
        this.#mimeTypeInternal = mimeType;
        this.#isGeneratedInternal = false;
        this.#lastModifiedInternal = lastModified && Platform.DateUtilities.isValid(lastModified) ? lastModified : null;
        this.#contentSizeInternal = contentSize;
        this.#pendingContentCallbacks = [];
        if (this.#requestInternal && !this.#requestInternal.finished) {
            this.#requestInternal.addEventListener(Events.FinishedLoading, this.requestFinished, this);
        }
    }
    lastModified() {
        if (this.#lastModifiedInternal || !this.#requestInternal) {
            return this.#lastModifiedInternal;
        }
        const lastModifiedHeader = this.#requestInternal.responseLastModified();
        const date = lastModifiedHeader ? new Date(lastModifiedHeader) : null;
        this.#lastModifiedInternal = date && Platform.DateUtilities.isValid(date) ? date : null;
        return this.#lastModifiedInternal;
    }
    contentSize() {
        if (typeof this.#contentSizeInternal === 'number' || !this.#requestInternal) {
            return this.#contentSizeInternal;
        }
        return this.#requestInternal.resourceSize;
    }
    get request() {
        return this.#requestInternal;
    }
    get url() {
        return this.#urlInternal;
    }
    set url(x) {
        this.#urlInternal = x;
        this.#parsedURLInternal = new Common.ParsedURL.ParsedURL(x);
    }
    get parsedURL() {
        return this.#parsedURLInternal;
    }
    get documentURL() {
        return this.#documentURLInternal;
    }
    get frameId() {
        return this.#frameIdInternal;
    }
    get loaderId() {
        return this.#loaderIdInternal;
    }
    get displayName() {
        return this.#parsedURLInternal ? this.#parsedURLInternal.displayName : '';
    }
    resourceType() {
        return this.#requestInternal ? this.#requestInternal.resourceType() : this.#type;
    }
    get mimeType() {
        return this.#requestInternal ? this.#requestInternal.mimeType : this.#mimeTypeInternal;
    }
    get content() {
        return this.#contentInternal;
    }
    get isGenerated() {
        return this.#isGeneratedInternal;
    }
    set isGenerated(val) {
        this.#isGeneratedInternal = val;
    }
    contentURL() {
        return this.#urlInternal;
    }
    contentType() {
        if (this.resourceType() === Common.ResourceType.resourceTypes.Document &&
            this.mimeType.indexOf('javascript') !== -1) {
            return Common.ResourceType.resourceTypes.Script;
        }
        return this.resourceType();
    }
    async requestContent() {
        if (typeof this.#contentInternal !== 'undefined') {
            return {
                content: this.#contentInternal,
                isEncoded: this.#contentEncodedInternal,
            };
        }
        return new Promise(resolve => {
            this.#pendingContentCallbacks.push(resolve);
            if (!this.#requestInternal || this.#requestInternal.finished) {
                void this.innerRequestContent();
            }
        });
    }
    canonicalMimeType() {
        return this.contentType().canonicalMimeType() || this.mimeType;
    }
    async searchInContent(query, caseSensitive, isRegex) {
        if (!this.frameId) {
            return [];
        }
        if (this.request) {
            return this.request.searchInContent(query, caseSensitive, isRegex);
        }
        const result = await this.#resourceTreeModel.target().pageAgent().invoke_searchInResource({ frameId: this.frameId, url: this.url, query, caseSensitive, isRegex });
        return TextUtils.TextUtils.performSearchInSearchMatches(result.result || [], query, caseSensitive, isRegex);
    }
    async populateImageSource(image) {
        const { content } = await this.requestContent();
        const encoded = this.#contentEncodedInternal;
        image.src =
            TextUtils.ContentProvider.contentAsDataURL(content, this.#mimeTypeInternal, encoded) || this.#urlInternal;
    }
    requestFinished() {
        if (this.#requestInternal) {
            this.#requestInternal.removeEventListener(Events.FinishedLoading, this.requestFinished, this);
        }
        if (this.#pendingContentCallbacks.length) {
            void this.innerRequestContent();
        }
    }
    async innerRequestContent() {
        if (this.#contentRequested) {
            return;
        }
        this.#contentRequested = true;
        let loadResult = null;
        if (this.request) {
            const contentData = await this.request.contentData();
            if (!ContentData.isError(contentData)) {
                const { isEncoded, content } = contentData.asDeferedContent();
                this.#contentInternal = content;
                this.#contentEncodedInternal = isEncoded;
                loadResult = { content: content ?? '', isEncoded };
            }
        }
        if (!loadResult) {
            const response = await this.#resourceTreeModel.target().pageAgent().invoke_getResourceContent({ frameId: this.frameId, url: this.url });
            const protocolError = response.getError();
            if (protocolError) {
                this.#contentInternal = null;
                loadResult = { content: null, error: protocolError, isEncoded: false };
            }
            else {
                this.#contentInternal = response.content;
                loadResult = { content: response.content, isEncoded: response.base64Encoded };
            }
            this.#contentEncodedInternal = response.base64Encoded;
        }
        if (this.#contentInternal === null) {
            this.#contentEncodedInternal = false;
        }
        for (const callback of this.#pendingContentCallbacks.splice(0)) {
            callback(loadResult);
        }
        this.#contentRequested = undefined;
    }
    hasTextContent() {
        if (this.#type.isTextType()) {
            return true;
        }
        if (this.#type === Common.ResourceType.resourceTypes.Other) {
            return Boolean(this.#contentInternal) && !this.#contentEncodedInternal;
        }
        return false;
    }
    frame() {
        return this.#frameIdInternal ? this.#resourceTreeModel.frameForId(this.#frameIdInternal) : null;
    }
    statusCode() {
        return this.#requestInternal ? this.#requestInternal.statusCode : 0;
    }
}
//# sourceMappingURL=Resource.js.map