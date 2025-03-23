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
    const agent4 = {
        id: 'id4',
        type: "freestyler" /* AiAssistance.ConversationType.STYLING */,
        history: [
            {
                type: "user-query" /* AiAssistance.ResponseType.USER_QUERY */,
                query: 'text',
                imageId: 'image-id1',
                imageInput: undefined,
            },
            {
                type: "answer" /* AiAssistance.ResponseType.ANSWER */,
                text: 'answer',
                complete: true,
            },
            {
                type: "user-query" /* AiAssistance.ResponseType.USER_QUERY */,
                query: 'text',
                imageId: 'image-id2',
                imageInput: undefined,
            },
        ],
    };
    const serializedImage1 = {
        id: 'image-id1',
        data: 'imageInput',
        mimeType: 'image/jpeg',
    };
    const serializedImage2 = {
        id: 'image-id2',
        data: 'imageInput',
        mimeType: 'image/jpeg',
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
    function getStorage(maxStorageSize) {
        return AiAssistance.AiHistoryStorage.instance({ forceNew: true, maxStorageSize });
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
        assert.deepEqual(storage.getImageHistory(), []);
        await storage.upsertImage(serializedImage1);
        await storage.upsertImage(serializedImage2);
        await storage.upsertHistoryEntry(agent4);
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
            {
                id: 'id4',
                type: 'freestyler',
                history: [
                    {
                        type: "user-query" /* AiAssistance.ResponseType.USER_QUERY */,
                        query: 'text',
                        imageId: 'image-id1',
                        imageInput: undefined,
                    },
                    {
                        type: "answer" /* AiAssistance.ResponseType.ANSWER */,
                        text: 'answer',
                        complete: true,
                    },
                    {
                        type: "user-query" /* AiAssistance.ResponseType.USER_QUERY */,
                        query: 'text',
                        imageId: 'image-id2',
                        imageInput: undefined,
                    },
                ],
            },
        ]);
        assert.deepEqual(storage.getImageHistory(), [
            {
                id: 'image-id1',
                data: 'imageInput',
                mimeType: 'image/jpeg',
            },
            {
                id: 'image-id2',
                data: 'imageInput',
                mimeType: 'image/jpeg',
            }
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
    it('should delete image history entry', async () => {
        const storage = getStorage();
        await storage.upsertHistoryEntry(agent1);
        await storage.upsertHistoryEntry(agent2);
        await storage.upsertHistoryEntry(agent3);
        await storage.upsertImage(serializedImage1);
        await storage.upsertImage(serializedImage2);
        await storage.upsertHistoryEntry(agent4);
        await storage.deleteHistoryEntry('id4');
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
            {
                id: 'id3',
                type: 'drjones-network-request',
                history: [],
            },
        ]);
        assert.deepEqual(storage.getImageHistory(), []);
    });
    it('should delete all entries', async () => {
        const storage = getStorage();
        await storage.upsertHistoryEntry(agent1);
        await storage.upsertHistoryEntry(agent2);
        await storage.upsertHistoryEntry(agent3);
        await storage.upsertImage(serializedImage1);
        await storage.upsertImage(serializedImage2);
        await storage.upsertHistoryEntry(agent4);
        await storage.deleteAll();
        assert.deepEqual(storage.getHistory(), []);
        assert.deepEqual(storage.getImageHistory(), []);
    });
    it('should limit the amount of stored images', async () => {
        const MAX_STORAGE_SIZE = 2;
        const storage = getStorage(MAX_STORAGE_SIZE);
        await storage.upsertImage({
            id: 'image-id1',
            data: '1',
            mimeType: 'image/jpeg',
        });
        await storage.upsertHistoryEntry(agent1);
        await storage.upsertImage({
            id: 'image-id2',
            data: '2',
            mimeType: 'image/jpeg',
        });
        await storage.upsertImage({
            id: 'image-id3',
            data: '3',
            mimeType: 'image/jpeg',
        });
        await storage.upsertHistoryEntry(agent2);
        await storage.upsertImage({
            id: 'image-id4',
            data: '4',
            mimeType: 'image/jpeg',
        });
        await storage.upsertHistoryEntry(agent3);
        const imageHistory = storage.getImageHistory();
        const imageData1 = imageHistory.find(item => item.id === 'image-id1');
        const imageData2 = imageHistory.find(item => item.id === 'image-id2');
        const imageData3 = imageHistory.find(item => item.id === 'image-id3');
        const imageData4 = imageHistory.find(item => item.id === 'image-id4');
        assert.notExists(imageData1);
        assert.notExists(imageData2);
        assert.deepEqual(imageData3, {
            id: 'image-id3',
            data: '3',
            mimeType: 'image/jpeg',
        });
        assert.deepEqual(imageData4, {
            id: 'image-id4',
            data: '4',
            mimeType: 'image/jpeg',
        });
    });
    describe('Conversation', () => {
        describe('title', () => {
            it('should return undefined if there is not USER_QUERY entry in history', () => {
                const conversation = new AiAssistance.Conversation("freestyler" /* AiAssistance.ConversationType.STYLING */, []);
                assert.isUndefined(conversation.title);
            });
            it('should return full title if the first USER_QUERY is less than 80 characters', () => {
                const conversation = new AiAssistance.Conversation("freestyler" /* AiAssistance.ConversationType.STYLING */, [{
                        type: "user-query" /* AiAssistance.ResponseType.USER_QUERY */,
                        query: 'this is less than 80',
                    }]);
                assert.strictEqual(conversation.title, 'this is less than 80');
            });
            it('should return first 80 characters of the title with ellipis if the first USER_QUERY is more than 80 characters', () => {
                const conversation = new AiAssistance.Conversation("freestyler" /* AiAssistance.ConversationType.STYLING */, [
                    {
                        type: "user-query" /* AiAssistance.ResponseType.USER_QUERY */,
                        query: 'this is more than 80 characters because I\'m just going to keep typing words and words and words until it\'s really, really long, see?',
                    }
                ]);
                assert.strictEqual(conversation.title, 'this is more than 80 characters because I\'m just going to keep typing words and …');
            });
        });
        describe('addHistoryItem', () => {
            const historyItem1 = {
                type: "user-query" /* AiAssistance.ResponseType.USER_QUERY */,
                query: 'text',
                imageInput: {
                    inlineData: {
                        data: '1',
                        mimeType: 'image/jpeg',
                    }
                },
                imageId: 'image-id1',
            };
            const historyItem2 = {
                type: "user-query" /* AiAssistance.ResponseType.USER_QUERY */,
                query: 'text',
                imageInput: {
                    inlineData: {
                        data: '2',
                        mimeType: 'image/jpeg',
                    }
                },
                imageId: 'image-id2',
            };
            it('should store images and text conversation separately', async () => {
                const storage = getStorage();
                sinon.stub(AiAssistance.AiHistoryStorage, 'instance').returns(storage);
                const conversation1 = new AiAssistance.Conversation("freestyler" /* AiAssistance.ConversationType.STYLING */, [], 'id1', false);
                await conversation1.addHistoryItem(historyItem1);
                const conversation2 = new AiAssistance.Conversation("freestyler" /* AiAssistance.ConversationType.STYLING */, [], 'id2', false);
                await conversation2.addHistoryItem(historyItem2);
                const imageHistory = storage.getImageHistory();
                assert.lengthOf(imageHistory, 2);
                assert.deepEqual(imageHistory[0], {
                    id: 'image-id1',
                    data: '1',
                    mimeType: 'image/jpeg',
                });
                assert.deepEqual(imageHistory[1], {
                    id: 'image-id2',
                    data: '2',
                    mimeType: 'image/jpeg',
                });
                const historyWithoutImages = storage.getHistory();
                assert.lengthOf(historyWithoutImages, 2);
                assert.deepEqual(historyWithoutImages[0], {
                    id: 'id1',
                    type: "freestyler" /* AiAssistance.ConversationType.STYLING */,
                    history: [{
                            type: "user-query" /* AiAssistance.ResponseType.USER_QUERY */,
                            query: 'text',
                            imageId: 'image-id1',
                        }]
                });
                assert.deepEqual(historyWithoutImages[1], {
                    id: 'id2',
                    type: "freestyler" /* AiAssistance.ConversationType.STYLING */,
                    history: [{
                            type: "user-query" /* AiAssistance.ResponseType.USER_QUERY */,
                            query: 'text',
                            imageInput: undefined,
                            imageId: 'image-id2',
                        }]
                });
            });
            it('should have empty image data for image not present in history', async () => {
                const MAX_STORAGE_SIZE = 1;
                const storage = getStorage(MAX_STORAGE_SIZE);
                sinon.stub(AiAssistance.AiHistoryStorage, 'instance').returns(storage);
                const conversation1 = new AiAssistance.Conversation("freestyler" /* AiAssistance.ConversationType.STYLING */, [], 'id1', false);
                await conversation1.addHistoryItem(historyItem1);
                const conversation2 = new AiAssistance.Conversation("freestyler" /* AiAssistance.ConversationType.STYLING */, [], 'id2', false);
                await conversation2.addHistoryItem(historyItem2);
                const imageHistory = storage.getImageHistory();
                assert.lengthOf(imageHistory, 1);
                const historyWithoutImages = storage.getHistory();
                assert.lengthOf(historyWithoutImages, 2);
                const conversationFromHistory = historyWithoutImages.map(item => {
                    return new AiAssistance.Conversation(item.type, item.history, item.id, true);
                });
                assert.lengthOf(conversationFromHistory, 2);
                assert.deepEqual(conversationFromHistory[0].history, [{
                        type: "user-query" /* AiAssistance.ResponseType.USER_QUERY */,
                        query: 'text',
                        imageInput: {
                            inlineData: {
                                data: AiAssistance.NOT_FOUND_IMAGE_DATA,
                                mimeType: 'image/jpeg',
                            }
                        },
                        imageId: 'image-id1',
                    }]);
                assert.deepEqual(conversationFromHistory[1].history, [{
                        type: "user-query" /* AiAssistance.ResponseType.USER_QUERY */,
                        query: 'text',
                        imageInput: {
                            inlineData: {
                                data: '2',
                                mimeType: 'image/jpeg',
                            }
                        },
                        imageId: 'image-id2',
                    }]);
            });
        });
    });
});
//# sourceMappingURL=AiHistoryStorage.test.js.map