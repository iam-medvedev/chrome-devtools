// Copyright 2019 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TextUtils from '../../../../models/text_utils/text_utils.js';
import { ResourceSourceFrame } from './ResourceSourceFrame.js';
import { StreamingContentHexView } from './StreamingContentHexView.js';
export class BinaryResourceViewFactory {
    streamingContent;
    contentUrl;
    resourceType;
    arrayPromise;
    hexPromise;
    utf8Promise;
    constructor(content, contentUrl, resourceType) {
        this.streamingContent = content;
        this.contentUrl = contentUrl;
        this.resourceType = resourceType;
        this.arrayPromise = null;
        this.hexPromise = null;
        this.utf8Promise = null;
    }
    async fetchContentAsArray() {
        if (!this.arrayPromise) {
            this.arrayPromise = new Promise(async (resolve) => {
                const fetchResponse = await fetch('data:;base64,' + this.streamingContent.content().base64);
                resolve(new Uint8Array(await fetchResponse.arrayBuffer()));
            });
        }
        return await this.arrayPromise;
    }
    async hex() {
        if (!this.hexPromise) {
            this.hexPromise = new Promise(async (resolve) => {
                const content = await this.fetchContentAsArray();
                const hexString = BinaryResourceViewFactory.uint8ArrayToHexString(content);
                resolve(hexString);
            });
        }
        return this.hexPromise;
    }
    base64() {
        return this.streamingContent.content().base64;
    }
    async utf8() {
        if (!this.utf8Promise) {
            this.utf8Promise = new Promise(async (resolve) => {
                const content = await this.fetchContentAsArray();
                const utf8String = new TextDecoder('utf8').decode(content);
                resolve(utf8String);
            });
        }
        return this.utf8Promise;
    }
    createBase64View() {
        return new ResourceSourceFrame(TextUtils.StaticContentProvider.StaticContentProvider.fromString(this.contentUrl, this.resourceType, this.streamingContent.content().base64), this.resourceType.canonicalMimeType(), { lineNumbers: false, lineWrapping: true });
    }
    createHexView() {
        return new StreamingContentHexView(this.streamingContent);
    }
    createUtf8View() {
        const utf8fn = () => this.utf8().then(str => new TextUtils.ContentData.ContentData(str, /* isBase64 */ false, 'text/plain'));
        const utf8ContentProvider = new TextUtils.StaticContentProvider.StaticContentProvider(this.contentUrl, this.resourceType, utf8fn);
        return new ResourceSourceFrame(utf8ContentProvider, this.resourceType.canonicalMimeType(), { lineNumbers: true, lineWrapping: true });
    }
    static uint8ArrayToHexString(uint8Array) {
        let output = '';
        for (let i = 0; i < uint8Array.length; i++) {
            output += BinaryResourceViewFactory.numberToHex(uint8Array[i], 2);
        }
        return output;
    }
    static numberToHex(number, padding) {
        let hex = number.toString(16);
        while (hex.length < padding) {
            hex = '0' + hex;
        }
        return hex;
    }
}
//# sourceMappingURL=BinaryResourceViewFactory.js.map