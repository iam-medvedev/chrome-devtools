// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { describeWithEnvironment, } from '../../testing/EnvironmentHelpers.js';
import * as Freestyler from './freestyler.js';
describeWithEnvironment('Freestyler.AiHistoryStorage', () => {
    const agent1 = {
        id: 'id1',
        type: "freestyler" /* Freestyler.AgentType.FREESTYLER */,
        history: [],
    };
    const agent2 = {
        id: 'id2',
        type: "drjones-file" /* Freestyler.AgentType.DRJONES_FILE */,
        history: [],
    };
    const agent3 = {
        id: 'id3',
        type: "drjones-network-request" /* Freestyler.AgentType.DRJONES_NETWORK_REQUEST */,
        history: [],
    };
    afterEach(() => {
        Freestyler.AiHistoryStorage.instance().clearForTest();
    });
    it('should create and retrieve history entry', async () => {
        const storage = Freestyler.AiHistoryStorage.instance();
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
        const storage = Freestyler.AiHistoryStorage.instance();
        await storage.upsertHistoryEntry(agent1);
        await storage.upsertHistoryEntry(agent2);
        await storage.upsertHistoryEntry({
            ...agent1,
            history: [
                {
                    type: "user-query" /* Freestyler.ResponseType.USER_QUERY */,
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
                        type: "user-query" /* Freestyler.ResponseType.USER_QUERY */,
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
                        type: "user-query" /* Freestyler.ResponseType.USER_QUERY */,
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
        const storage = Freestyler.AiHistoryStorage.instance();
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
        const storage = Freestyler.AiHistoryStorage.instance();
        await storage.upsertHistoryEntry(agent1);
        await storage.upsertHistoryEntry(agent2);
        await storage.upsertHistoryEntry(agent3);
        await storage.deleteAll();
        assert.deepEqual(storage.getHistory(), []);
    });
});
//# sourceMappingURL=AiHistoryStorage.test.js.map