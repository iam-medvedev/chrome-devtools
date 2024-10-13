// Copyright (c) 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TextUtils from '../../models/text_utils/text_utils.js';
import * as LinearMemoryInspector from '../linear_memory_inspector/linear_memory_inspector.js';
/**
 * Adapter for the linear memory inspector that can show a {@link StreamingContentData}.
 */
export class RequestBinaryResponseView extends LinearMemoryInspector.LinearMemoryInspectorPane.LinearMemoryInspectorView {
    #streamingContentData;
    #memory;
    constructor(streamingContentData) {
        const adapter = new ContentDataLazyArrayAdapter();
        super(adapter, /* address */ 0, 'tabId is unused here', /* hideValueInspector */ true);
        this.#memory = adapter;
        this.#streamingContentData = streamingContentData;
        this.refreshData();
    }
    wasShown() {
        this.refreshData();
        this.#streamingContentData.addEventListener("ChunkAdded" /* TextUtils.StreamingContentData.Events.CHUNK_ADDED */, this.refreshData, this);
        // No need to call super.wasShown() as we call super.refreshData() ourselves.
    }
    willHide() {
        super.willHide();
        this.#streamingContentData.removeEventListener("ChunkAdded" /* TextUtils.StreamingContentData.Events.CHUNK_ADDED */, this.refreshData, this);
    }
    refreshData() {
        this.#memory.updateWithContentData(this.#streamingContentData.content());
        super.refreshData();
    }
}
/**
 * A small helper class that serves as the holder for the current content of a
 * {@link StreamingContentData} in the form of a Uint8Array.
 *
 * We can't implement the {@link LazyUint8Array} interface directly on
 * {@link RequestBinaryResponseView} as we can't pass "this" to the "super" constructor.
 * So this class acts as a small container cell instead.
 */
class ContentDataLazyArrayAdapter {
    #memory = new Uint8Array([0]);
    updateWithContentData(contentData) {
        const binaryString = window.atob(contentData.base64);
        this.#memory = Uint8Array.from(binaryString, m => m.codePointAt(0));
    }
    getRange(start, end) {
        return Promise.resolve(this.#memory.slice(start, end));
    }
    length() {
        return this.#memory.length;
    }
}
//# sourceMappingURL=RequestBinaryResponseView.js.map