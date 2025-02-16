// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
export class Conversation {
    static fromSerialized(serialized) {
        return new Conversation(serialized.type, serialized.history, serialized.id, true);
    }
    id;
    history;
    type;
    isReadOnly;
    constructor(type, data = [], id = crypto.randomUUID(), isReadOnly = true) {
        this.type = type;
        this.history = data;
        this.id = id;
        this.isReadOnly = isReadOnly;
    }
    get title() {
        return this.history
            .filter(response => {
            return response.type === "user-query" /* ResponseType.USER_QUERY */;
        })
            .at(0)
            ?.query;
    }
    get isEmpty() {
        return this.history.length === 0;
    }
    addHistoryItem(item) {
        if (item.type === "user-query" /* ResponseType.USER_QUERY */) {
            const historyItem = { ...item, imageInput: undefined };
            this.history.push(historyItem);
        }
        else {
            this.history.push(item);
        }
        void AiHistoryStorage.instance().upsertHistoryEntry(this.serialize());
    }
    serialize() {
        return {
            id: this.id,
            history: this.history,
            type: this.type,
        };
    }
}
let instance = null;
export class AiHistoryStorage {
    #historySetting;
    #mutex = new Common.Mutex.Mutex();
    constructor() {
        // This should not throw as we should be creating the setting in the `-meta.ts` file
        this.#historySetting = Common.Settings.Settings.instance().createSetting('ai-assistance-history-entries', []);
    }
    clearForTest() {
        this.#historySetting.set([]);
    }
    async upsertHistoryEntry(agentEntry) {
        const release = await this.#mutex.acquire();
        try {
            const history = structuredClone(await this.#historySetting.forceGet());
            const historyEntryIndex = history.findIndex(entry => entry.id === agentEntry.id);
            if (historyEntryIndex !== -1) {
                history[historyEntryIndex] = agentEntry;
            }
            else {
                history.push(agentEntry);
            }
            this.#historySetting.set(history);
        }
        finally {
            release();
        }
    }
    async deleteHistoryEntry(id) {
        const release = await this.#mutex.acquire();
        try {
            const history = structuredClone(await this.#historySetting.forceGet());
            this.#historySetting.set(history.filter(entry => entry.id !== id));
        }
        finally {
            release();
        }
    }
    async deleteAll() {
        const release = await this.#mutex.acquire();
        try {
            this.#historySetting.set([]);
        }
        finally {
            release();
        }
    }
    getHistory() {
        return structuredClone(this.#historySetting.get());
    }
    static instance(forceNew = false) {
        if (!instance || forceNew) {
            instance = new AiHistoryStorage();
        }
        return instance;
    }
}
//# sourceMappingURL=AiHistoryStorage.js.map