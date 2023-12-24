// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TextUtils from '../../models/text_utils/text_utils.js';
/**
 * This class is a small wrapper around either raw binary or text data.
 * As the binary data can actually contain textual data, we also store the
 * resource type, MIME type, and if applicable, the charset.
 *
 * This information should be generally kept together, as interpreting text
 * from raw bytes requires an encoding.
 *
 * Note that we only rarely have to decode text ourselves in the frontend,
 * this is mostly handled by the backend. There are cases though (e.g. SVG,
 * or streaming response content) where we receive text data in
 * binary (base64-encoded) form.
 *
 * The class only implements decoding. We currently don't have a use-case
 * to re-encode text into base64 bytes using a specified charset.
 */
export class ContentData {
    resourceType;
    // We need mimeType on top of `resourceType` so we can turn this content into a data URL.
    mimeType;
    #charset;
    #contentAsBase64;
    #contentAsText;
    constructor(data, isBase64, resourceType, mimeType, charset) {
        this.resourceType = resourceType;
        this.mimeType = mimeType;
        this.#charset = charset;
        if (isBase64) {
            this.#contentAsBase64 = data;
        }
        else {
            this.#contentAsText = data;
        }
    }
    /**
     * Returns the data as base64.
     *
     * @throws if this `ContentData` was constructed from text content.
     */
    get base64() {
        if (this.#contentAsBase64 === undefined) {
            throw new Error('Encoding text content as base64 is not supported');
        }
        return this.#contentAsBase64;
    }
    /**
     * Returns the content as text. If this `ContentData` was constructed with base64
     * encoded bytes, it will use the provided charset to attempt to decode the bytes.
     *
     * @throws if `resourceType` is not a text type.
     */
    get text() {
        if (this.#contentAsText !== undefined) {
            return this.#contentAsText;
        }
        if (!this.resourceType.isTextType()) {
            throw new Error('Cannot interpret binary data as text');
        }
        const charset = this.#charset ?? 'utf-8';
        const binaryString = window.atob(this.#contentAsBase64);
        const bytes = Uint8Array.from(binaryString, m => m.codePointAt(0));
        this.#contentAsText = new TextDecoder(charset).decode(bytes);
        return this.#contentAsText;
    }
    asDataUrl() {
        // To keep with existing behavior we prefer to return the content
        // encoded if that is how this ContentData was constructed with.
        if (this.#contentAsBase64 !== undefined) {
            return TextUtils.ContentProvider.contentAsDataURL(this.#contentAsBase64, this.mimeType ?? '', true, this.#charset ?? null);
        }
        return TextUtils.ContentProvider.contentAsDataURL(this.text, this.mimeType ?? '', false);
    }
    /**
     * @deprecated Used during migration from `DeferredContent` to `ContentData`.
     */
    asDeferedContent() {
        // To keep with existing behavior we prefer to return the content
        // encoded if that is how this ContentData was constructed with.
        if (this.#contentAsBase64 !== undefined) {
            return { content: this.#contentAsBase64, isEncoded: true };
        }
        return { content: this.text, isEncoded: false };
    }
    /**
     * @deprecated Used during migration from `NetworkRequest.ContentData` to `ContentData`.
     */
    asLegacyContentData() {
        // To keep with existing behavior we prefer to return the content
        // encoded if that is how this ContentData was constructed with.
        if (this.#contentAsBase64 !== undefined) {
            return { error: null, content: this.#contentAsBase64, encoded: true };
        }
        return { error: null, content: this.text, encoded: false };
    }
    static isError(contentDataOrError) {
        return 'error' in contentDataOrError;
    }
    /**
     * @deprecated Used during migration from `DeferredContent` to `ContentData`.
     */
    static asDeferredContent(contentDataOrError) {
        if (ContentData.isError(contentDataOrError)) {
            return { error: contentDataOrError.error, content: null, isEncoded: false };
        }
        return contentDataOrError.asDeferedContent();
    }
    /**
     * @deprecated Used during migration from `DeferredContent` to `ContentData`.
     */
    static asLegacyContentData(contentDataOrError) {
        if (ContentData.isError(contentDataOrError)) {
            return { error: contentDataOrError.error, content: null, encoded: false };
        }
        return contentDataOrError.asLegacyContentData();
    }
}
//# sourceMappingURL=ContentData.js.map