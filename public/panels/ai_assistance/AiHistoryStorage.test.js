// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as AiAssistance from './ai_assistance.js';
describe('AiHistoryStorage', () => {
    const agent1 = {
        id: 'id1',
        type: "freestyler" /* AiAssistance.ConversationType.STYLING */,
        history: [],
    };
    const agent2 = {
        id: 'id2',
        type: "drjones-file" /* AiAssistance.ConversationType.FILE */,
        history: [],
    };
    const agent3 = {
        id: 'id3',
        type: "drjones-network-request" /* AiAssistance.ConversationType.NETWORK */,
        history: [],
    };
    beforeEach(() => {
        let data = {};
        const dummyStorage = new Common.Settings.SettingsStorage({}, {
            get(setting) {
                return Promise.resolve(data[setting]);
            },
            set(setting, value) {
                data[setting] = value;
            },
            clear() {
                data = {};
            },
            remove(setting) {
                delete data[setting];
            },
            register(_setting) { },
        });
        Common.Settings.Settings.instance({
            forceNew: true,
            syncedStorage: dummyStorage,
            globalStorage: dummyStorage,
            localStorage: dummyStorage,
        });
    });
    function getStorage() {
        return AiAssistance.AiHistoryStorage.instance(true);
    }
    it('should create and retrieve history entry', async () => {
        const storage = getStorage();
        await storage.upsertHistoryEntry(agent1);
        assert.deepEqual(storage.getHistory(), [{
                id: 'id1',
                type: 'freestyler',
                history: [],
            }]);
        await storage.upsertHistoryEntry(agent2);
        assert.deepEqual(storage.getHistory(), [
            {
                id: 'id1',
                type: 'freestyler',
                history: [],
            },
            {
                id: 'id2',
                type: 'drjones-file',
                history: [],
            },
        ]);
    });
    it('should update history entries correctly', async () => {
        const storage = getStorage();
        await storage.upsertHistoryEntry(agent1);
        await storage.upsertHistoryEntry(agent2);
        await storage.upsertHistoryEntry({
            ...agent1,
            history: [
                {
                    type: "user-query" /* AiAssistance.ResponseType.USER_QUERY */,
                    query: 'text',
                },
            ],
        });
        assert.deepEqual(storage.getHistory(), [
            {
                id: 'id1',
                type: 'freestyler',
                history: [
                    {
                        type: "user-query" /* AiAssistance.ResponseType.USER_QUERY */,
                        query: 'text',
                    },
                ],
            },
            {
                id: 'id2',
                type: 'drjones-file',
                history: [],
            },
        ]);
        await storage.upsertHistoryEntry(agent3);
        assert.deepEqual(storage.getHistory(), [
            {
                id: 'id1',
                type: 'freestyler',
                history: [
                    {
                        type: "user-query" /* AiAssistance.ResponseType.USER_QUERY */,
                        query: 'text',
                    },
                ],
            },
            {
                id: 'id2',
                type: 'drjones-file',
                history: [],
            },
            {
                id: 'id3',
                type: 'drjones-network-request',
                history: [],
            },
        ]);
    });
    it('should delete a single entry', async () => {
        const storage = getStorage();
        await storage.upsertHistoryEntry(agent1);
        await storage.upsertHistoryEntry(agent2);
        await storage.upsertHistoryEntry(agent3);
        await storage.deleteHistoryEntry('id2');
        assert.deepEqual(storage.getHistory(), [
            {
                id: 'id1',
                type: 'freestyler',
                history: [],
            },
            {
                id: 'id3',
                type: 'drjones-network-request',
                history: [],
            },
        ]);
    });
    it('should delete all entries', async () => {
        const storage = getStorage();
        await storage.upsertHistoryEntry(agent1);
        await storage.upsertHistoryEntry(agent2);
        await storage.upsertHistoryEntry(agent3);
        await storage.deleteAll();
        assert.deepEqual(storage.getHistory(), []);
    });
});
//# sourceMappingURL=AiHistoryStorage.test.js.map