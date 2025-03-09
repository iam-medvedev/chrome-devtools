// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Workspace from '../../models/workspace/workspace.js';
import { cleanup, createAiAssistancePanel, createNetworkRequest, mockAidaClient, openHistoryContextMenu } from '../../testing/AiAssistanceHelpers.js';
import { findMenuItemWithLabel, getMenu } from '../../testing/ContextMenuHelpers.js';
import { createTarget, registerNoopActions, updateHostConfig } from '../../testing/EnvironmentHelpers.js';
import { expectCall } from '../../testing/ExpectStubCall.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import { createNetworkPanelForMockConnection } from '../../testing/NetworkHelpers.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Elements from '../elements/elements.js';
import * as Network from '../network/network.js';
import * as Sources from '../sources/sources.js';
import * as Timeline from '../timeline/timeline.js';
import * as TimelineUtils from '../timeline/utils/utils.js';
import * as AiAssistance from './ai_assistance.js';
const { urlString } = Platform.DevToolsPath;
describeWithMockConnection('AI Assistance Panel', () => {
    beforeEach(() => {
        registerNoopActions(['elements.toggle-element-search']);
        UI.Context.Context.instance().setFlavor(Elements.ElementsPanel.ElementsPanel, null);
        UI.Context.Context.instance().setFlavor(Network.NetworkPanel.NetworkPanel, null);
        UI.Context.Context.instance().setFlavor(Sources.SourcesPanel.SourcesPanel, null);
        UI.Context.Context.instance().setFlavor(Timeline.TimelinePanel.TimelinePanel, null);
        UI.Context.Context.instance().setFlavor(SDK.NetworkRequest.NetworkRequest, null);
        UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, null);
        UI.Context.Context.instance().setFlavor(TimelineUtils.AICallTree.AICallTree, null);
        UI.Context.Context.instance().setFlavor(Workspace.UISourceCode.UISourceCode, null);
    });
    afterEach(() => {
        cleanup();
    });
    describe('consent view', () => {
        it('should render consent view when the consent is not given before', async () => {
            const { view } = await createAiAssistancePanel();
            assert.strictEqual(view.input.state, "consent-view" /* AiAssistance.State.CONSENT_VIEW */);
        });
        it('should switch from consent view to chat view when enabling setting', async () => {
            const { view } = await createAiAssistancePanel();
            assert.strictEqual(view.input.state, "consent-view" /* AiAssistance.State.CONSENT_VIEW */);
            Common.Settings.moduleSetting('ai-assistance-enabled').set(true);
            assert.strictEqual((await view.nextInput).state, "chat-view" /* AiAssistance.State.CHAT_VIEW */);
        });
        it('should render chat view when the consent is given before', async () => {
            Common.Settings.moduleSetting('ai-assistance-enabled').set(true);
            const { view } = await createAiAssistancePanel();
            assert.strictEqual(view.input.state, "chat-view" /* AiAssistance.State.CHAT_VIEW */);
        });
        it('should render the consent view when the setting is disabled', async () => {
            Common.Settings.moduleSetting('ai-assistance-enabled').set(true);
            Common.Settings.moduleSetting('ai-assistance-enabled').setDisabled(true);
            const { view } = await createAiAssistancePanel();
            assert.strictEqual(view.input.state, "consent-view" /* AiAssistance.State.CONSENT_VIEW */);
            Common.Settings.moduleSetting('ai-assistance-enabled').setDisabled(false);
        });
        it('should render the consent view when blocked by age', async () => {
            Common.Settings.moduleSetting('ai-assistance-enabled').set(true);
            updateHostConfig({
                aidaAvailability: {
                    blockedByAge: true,
                },
                devToolsFreestyler: {
                    enabled: true,
                },
            });
            const { view } = await createAiAssistancePanel();
            assert.strictEqual(view.input.state, "consent-view" /* AiAssistance.State.CONSENT_VIEW */);
        });
        it('updates when the user logs in', async () => {
            Common.Settings.moduleSetting('ai-assistance-enabled').set(true);
            const { view, stubAidaCheckAccessPreconditions } = await createAiAssistancePanel({ aidaAvailability: "no-account-email" /* Host.AidaClient.AidaAccessPreconditions.NO_ACCOUNT_EMAIL */ });
            assert.strictEqual(view.input.state, "chat-view" /* AiAssistance.State.CHAT_VIEW */);
            assert.strictEqual(view.input.aidaAvailability, "no-account-email" /* Host.AidaClient.AidaAccessPreconditions.NO_ACCOUNT_EMAIL */);
            stubAidaCheckAccessPreconditions("available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */);
            Host.AidaClient.HostConfigTracker.instance().dispatchEventToListeners("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */);
            assert.strictEqual((await view.nextInput).state, "chat-view" /* AiAssistance.State.CHAT_VIEW */);
            assert.strictEqual(view.input.aidaAvailability, "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */);
        });
    });
    describe('rating', () => {
        it('should allow logging if configured', async () => {
            updateHostConfig({
                aidaAvailability: {
                    disallowLogging: false,
                },
            });
            const { aidaClient, view } = await createAiAssistancePanel();
            const aidaClientCall = expectCall(aidaClient.registerClientEvent);
            view.input.onFeedbackSubmit(0, "POSITIVE" /* Host.AidaClient.Rating.POSITIVE */);
            const [aidaClientEvent] = await aidaClientCall;
            assert.isFalse(aidaClientEvent.disable_user_content_logging);
        });
        it('should send POSITIVE rating to aida client when the user clicks on positive rating', async () => {
            updateHostConfig({
                aidaAvailability: {
                    enabled: true,
                    disallowLogging: true,
                }
            });
            const RPC_ID = 999;
            const { aidaClient, view } = await createAiAssistancePanel();
            const aidaClientCall = expectCall(aidaClient.registerClientEvent);
            view.input.onFeedbackSubmit(RPC_ID, "POSITIVE" /* Host.AidaClient.Rating.POSITIVE */);
            const [aidaClientEvent] = await aidaClientCall;
            assert.deepEqual(aidaClientEvent, {
                corresponding_aida_rpc_global_id: RPC_ID,
                do_conversation_client_event: {
                    user_feedback: {
                        sentiment: 'POSITIVE',
                        user_input: {
                            comment: undefined,
                        }
                    },
                },
                disable_user_content_logging: true,
            });
        });
        it('should send NEGATIVE rating to aida client when the user clicks on negative rating', async () => {
            updateHostConfig({
                aidaAvailability: {
                    enabled: true,
                    disallowLogging: true,
                }
            });
            const RPC_ID = 999;
            const { aidaClient, view } = await createAiAssistancePanel();
            const aidaClientCall = expectCall(aidaClient.registerClientEvent);
            view.input.onFeedbackSubmit(RPC_ID, "NEGATIVE" /* Host.AidaClient.Rating.NEGATIVE */);
            const [aidaClientEvent] = await aidaClientCall;
            assert.deepEqual(aidaClientEvent, {
                corresponding_aida_rpc_global_id: RPC_ID,
                do_conversation_client_event: {
                    user_feedback: {
                        sentiment: 'NEGATIVE',
                        user_input: {
                            comment: undefined,
                        }
                    },
                },
                disable_user_content_logging: true,
            });
        });
        it('should send feedback text with data', async () => {
            updateHostConfig({
                aidaAvailability: {
                    enabled: true,
                    disallowLogging: true,
                }
            });
            const feedback = 'This helped me a ton.';
            const RPC_ID = 999;
            const { aidaClient, view } = await createAiAssistancePanel();
            const aidaClientCall = expectCall(aidaClient.registerClientEvent);
            view.input.onFeedbackSubmit(RPC_ID, "POSITIVE" /* Host.AidaClient.Rating.POSITIVE */, feedback);
            const [aidaClientEvent] = await aidaClientCall;
            assert.deepEqual(aidaClientEvent, {
                corresponding_aida_rpc_global_id: RPC_ID,
                do_conversation_client_event: {
                    user_feedback: {
                        sentiment: 'POSITIVE',
                        user_input: {
                            comment: feedback,
                        }
                    },
                },
                disable_user_content_logging: true,
            });
        });
    });
    describe('contexts', () => {
        const tests = [
            {
                flavor: SDK.DOMModel.DOMNode,
                createContext: () => {
                    const node = sinon.createStubInstance(SDK.DOMModel.DOMNode, {
                        nodeType: Node.ELEMENT_NODE,
                    });
                    return new AiAssistance.NodeContext(node);
                },
                action: 'freestyler.elements-floating-button',
            },
            {
                flavor: SDK.NetworkRequest.NetworkRequest,
                createContext: () => {
                    return new AiAssistance.RequestContext(sinon.createStubInstance(SDK.NetworkRequest.NetworkRequest));
                },
                action: 'drjones.network-floating-button'
            },
            {
                flavor: TimelineUtils.AICallTree.AICallTree,
                createContext: () => {
                    return new AiAssistance.CallTreeContext(sinon.createStubInstance(TimelineUtils.AICallTree.AICallTree));
                },
                action: 'drjones.performance-panel-context'
            },
            {
                flavor: TimelineUtils.InsightAIContext.ActiveInsight,
                createContext: () => {
                    return new AiAssistance.InsightContext(sinon.createStubInstance(TimelineUtils.InsightAIContext.ActiveInsight));
                },
                action: 'drjones.performance-insight-context'
            },
            {
                flavor: Workspace.UISourceCode.UISourceCode,
                createContext: () => {
                    return new AiAssistance.FileContext(sinon.createStubInstance(Workspace.UISourceCode.UISourceCode));
                },
                action: 'drjones.sources-panel-context',
            }
        ];
        for (const test of tests) {
            it(`should use the selected ${test.flavor.name} context after the widget is shown`, async () => {
                const { panel, view } = await createAiAssistancePanel();
                const context = test.createContext();
                const contextItem = context.getItem();
                if (!contextItem) {
                    throw new Error('Context is not available');
                }
                UI.Context.Context.instance().setFlavor(test.flavor, contextItem);
                panel.handleAction(test.action);
                expect((await view.nextInput).selectedContext?.getItem()).equals(contextItem);
            });
            it(`should update the selected ${test.flavor.name} context whenever flavor changes`, async () => {
                const { panel, view } = await createAiAssistancePanel();
                panel.handleAction(test.action);
                assert.isNull((await view.nextInput).selectedContext);
                const context = test.createContext();
                const contextItem = context.getItem();
                if (!contextItem) {
                    throw new Error('Context is not available');
                }
                UI.Context.Context.instance().setFlavor(test.flavor, contextItem);
                UI.Context.Context.instance().setFlavor(test.flavor, contextItem);
                expect((await view.nextInput).selectedContext?.getItem()).equals(contextItem);
            });
            it(`should ignore ${test.flavor.name} flavor change after the panel was hidden`, async () => {
                const { view, panel } = await createAiAssistancePanel();
                assert.isNull(view.input.selectedContext);
                const callCount = view.callCount;
                panel.hideWidget();
                const context = test.createContext();
                const contextItem = context.getItem();
                if (!contextItem) {
                    throw new Error('Context is not available');
                }
                UI.Context.Context.instance().setFlavor(test.flavor, contextItem);
                assert.strictEqual(view.callCount, callCount);
            });
        }
        it('should set selected context to null when the change DOMNode flavor is not an ELEMENT_NODE', async () => {
            const { panel, view } = await createAiAssistancePanel();
            panel.handleAction('freestyler.elements-floating-button');
            assert.isNull((await view.nextInput).selectedContext);
            const node = sinon.createStubInstance(SDK.DOMModel.DOMNode, {
                nodeType: Node.COMMENT_NODE,
            });
            UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, node);
            assert.isNull((await view.nextInput).selectedContext);
        });
    });
    describe('toggle search element action', () => {
        let toggleSearchElementAction;
        beforeEach(() => {
            toggleSearchElementAction =
                UI.ActionRegistry.ActionRegistry.instance().getAction('elements.toggle-element-search');
            toggleSearchElementAction.setToggled(false);
        });
        it('should set inspectElementToggled when the widget is shown', async () => {
            const { view } = await createAiAssistancePanel();
            toggleSearchElementAction.setToggled(true);
            assert.isTrue((await view.nextInput).inspectElementToggled);
        });
        it('should update inspectElementToggled when the action is toggled', async () => {
            const { view } = await createAiAssistancePanel();
            assert.isFalse(view.input.inspectElementToggled);
            toggleSearchElementAction.setToggled(true);
            assert.isTrue((await view.nextInput).inspectElementToggled);
        });
        it('should not update toggleSearchElementAction when the widget is not shown', async () => {
            toggleSearchElementAction.setToggled(false);
            const { view, panel } = await createAiAssistancePanel();
            const callCount = view.callCount;
            panel.hideWidget();
            toggleSearchElementAction.setToggled(true);
            const uiSourceCode = sinon.createStubInstance(Workspace.UISourceCode.UISourceCode);
            UI.Context.Context.instance().setFlavor(Workspace.UISourceCode.UISourceCode, uiSourceCode);
            assert.strictEqual(view.callCount, callCount);
        });
    });
    describe('toolbar actions', () => {
        it('should show chrome-ai view on settings click', async () => {
            const stub = sinon.stub(UI.ViewManager.ViewManager.instance(), 'showView');
            const { view } = await createAiAssistancePanel();
            view.input.onSettingsClick();
            assert.isTrue(stub.calledWith('chrome-ai'));
        });
    });
    describe('history interactions', () => {
        it('should have empty messages after new chat', async () => {
            const { panel, view } = await createAiAssistancePanel({ aidaClient: mockAidaClient([[{ explanation: 'test' }]]) });
            panel.handleAction('freestyler.elements-floating-button');
            (await view.nextInput).onTextSubmit('test');
            assert.deepEqual((await view.nextInput).messages, [
                {
                    entity: "user" /* AiAssistance.ChatMessageEntity.USER */,
                    text: 'test',
                    imageInput: undefined,
                },
                {
                    answer: 'test',
                    entity: "model" /* AiAssistance.ChatMessageEntity.MODEL */,
                    rpcId: undefined,
                    suggestions: undefined,
                    steps: [],
                },
            ]);
            view.input.onNewChatClick();
            assert.deepEqual((await view.nextInput).messages, []);
        });
        it('should select default agent after new chat', async () => {
            updateHostConfig({
                devToolsFreestyler: {
                    enabled: true,
                },
            });
            const { panel, view } = await createAiAssistancePanel({ aidaClient: mockAidaClient([[{ explanation: 'test' }]]) });
            panel.handleAction('freestyler.elements-floating-button');
            await view.nextInput;
            UI.Context.Context.instance().setFlavor(Elements.ElementsPanel.ElementsPanel, sinon.createStubInstance(Elements.ElementsPanel.ElementsPanel));
            view.input.onTextSubmit('test');
            assert.deepEqual((await view.nextInput).messages, [
                {
                    entity: "user" /* AiAssistance.ChatMessageEntity.USER */,
                    text: 'test',
                    imageInput: undefined,
                },
                {
                    answer: 'test',
                    entity: "model" /* AiAssistance.ChatMessageEntity.MODEL */,
                    rpcId: undefined,
                    suggestions: undefined,
                    steps: [],
                },
            ]);
            view.input.onNewChatClick();
            assert.deepEqual((await view.nextInput).messages, []);
            assert.deepEqual(view.input.conversationType, "freestyler" /* AiAssistance.ConversationType.STYLING */);
        });
        it('should select the performance insights agent if it is enabled and the user has expanded an insight', async () => {
            updateHostConfig({
                devToolsAiAssistancePerformanceAgent: {
                    enabled: true,
                    insightsEnabled: true,
                },
            });
            const { panel, view } = await createAiAssistancePanel({ aidaClient: mockAidaClient([[{ explanation: 'test' }]]) });
            panel.handleAction('freestyler.elements-floating-button');
            (await view.nextInput).onTextSubmit('test');
            await view.nextInput;
            UI.Context.Context.instance().setFlavor(Timeline.TimelinePanel.TimelinePanel, sinon.createStubInstance(Timeline.TimelinePanel.TimelinePanel));
            UI.Context.Context.instance().setFlavor(Timeline.TimelinePanel.SelectedInsight, new Timeline.TimelinePanel.SelectedInsight({}));
            assert.deepEqual(view.input.messages, [
                {
                    entity: "user" /* AiAssistance.ChatMessageEntity.USER */,
                    text: 'test',
                    imageInput: undefined,
                },
                {
                    answer: 'test',
                    entity: "model" /* AiAssistance.ChatMessageEntity.MODEL */,
                    rpcId: undefined,
                    suggestions: undefined,
                    steps: [],
                },
            ]);
            view.input.onNewChatClick();
            assert.deepEqual((await view.nextInput).messages, []);
            assert.deepEqual(view.input.conversationType, "performance-insight" /* AiAssistance.ConversationType.PERFORMANCE_INSIGHT */);
        });
        it('should select the Dr Jones performance agent if insights are not enabled', async () => {
            updateHostConfig({
                devToolsAiAssistancePerformanceAgent: {
                    enabled: true,
                    insightsEnabled: false,
                },
            });
            const { panel, view } = await createAiAssistancePanel({ aidaClient: mockAidaClient([[{ explanation: 'test' }]]) });
            panel.handleAction('freestyler.elements-floating-button');
            (await view.nextInput).onTextSubmit('test');
            await view.nextInput;
            UI.Context.Context.instance().setFlavor(Timeline.TimelinePanel.TimelinePanel, sinon.createStubInstance(Timeline.TimelinePanel.TimelinePanel));
            assert.deepEqual(view.input.messages, [
                {
                    entity: "user" /* AiAssistance.ChatMessageEntity.USER */,
                    text: 'test',
                    imageInput: undefined,
                },
                {
                    answer: 'test',
                    entity: "model" /* AiAssistance.ChatMessageEntity.MODEL */,
                    rpcId: undefined,
                    suggestions: undefined,
                    steps: [],
                },
            ]);
            view.input.onNewChatClick();
            assert.deepEqual((await view.nextInput).messages, []);
            assert.deepEqual(view.input.conversationType, "drjones-performance" /* AiAssistance.ConversationType.PERFORMANCE */);
        });
        it('should switch agents and restore history', async () => {
            updateHostConfig({
                devToolsFreestyler: {
                    enabled: true,
                    multimodal: true,
                },
            });
            const { panel, view } = await createAiAssistancePanel({ aidaClient: mockAidaClient([[{ explanation: 'test' }], [{ explanation: 'test2' }]]) });
            panel.handleAction('freestyler.elements-floating-button');
            const imageInput = { inlineData: { data: 'imageinputbytes', mimeType: 'image/jpeg' } };
            (await view.nextInput).onTextSubmit('User question to Freestyler?', imageInput);
            assert.deepEqual((await view.nextInput).messages, [
                {
                    entity: "user" /* AiAssistance.ChatMessageEntity.USER */,
                    text: 'User question to Freestyler?',
                    imageInput,
                },
                {
                    answer: 'test',
                    entity: "model" /* AiAssistance.ChatMessageEntity.MODEL */,
                    rpcId: undefined,
                    suggestions: undefined,
                    steps: [],
                },
            ]);
            panel.handleAction('drjones.network-floating-button');
            (await view.nextInput).onTextSubmit('User question to DrJones?');
            assert.deepEqual((await view.nextInput).messages, [
                {
                    entity: "user" /* AiAssistance.ChatMessageEntity.USER */,
                    text: 'User question to DrJones?',
                    imageInput: undefined,
                },
                {
                    answer: 'test2',
                    entity: "model" /* AiAssistance.ChatMessageEntity.MODEL */,
                    rpcId: undefined,
                    suggestions: undefined,
                    steps: [],
                },
            ]);
            const contextMenu = getMenu(() => {
                view.input.onHistoryClick(new MouseEvent('click'));
            });
            const freestylerEntry = findMenuItemWithLabel(contextMenu.defaultSection(), 'User question to Freestyler?');
            assert.isDefined(freestylerEntry);
            contextMenu.invokeHandler(freestylerEntry.id());
            assert.isTrue((await view.nextInput).isReadOnly);
            assert.deepEqual(view.input.messages, [
                {
                    entity: "user" /* AiAssistance.ChatMessageEntity.USER */,
                    text: 'User question to Freestyler?',
                    imageInput,
                },
                {
                    answer: 'test',
                    entity: "model" /* AiAssistance.ChatMessageEntity.MODEL */,
                    rpcId: undefined,
                    suggestions: undefined,
                    steps: [],
                },
            ]);
        });
        it('should not save partial responses to conversation history', async () => {
            updateHostConfig({
                devToolsFreestyler: {
                    enabled: true,
                },
            });
            const addHistoryItemStub = sinon.stub(AiAssistance.Conversation.prototype, 'addHistoryItem');
            UI.Context.Context.instance().setFlavor(Elements.ElementsPanel.ElementsPanel, sinon.createStubInstance(Elements.ElementsPanel.ElementsPanel));
            const { view } = await createAiAssistancePanel({
                aidaClient: mockAidaClient([[
                        { explanation: 'ANSWER: partially started' }, { explanation: 'ANSWER: partially started and now it\'s finished' }
                    ]])
            });
            // Trigger running the conversation (observe that there are two answers: one partial, one complete)
            view.input.onTextSubmit('User question to Freestyler?');
            await view.nextInput;
            sinon.assert.calledWith(addHistoryItemStub, sinon.match({ type: 'answer', text: 'partially started and now it\'s finished' }));
            sinon.assert.neverCalledWith(addHistoryItemStub, sinon.match({ type: 'answer', text: 'partially started' }));
        });
        it('should switch agents and restore history and allow a single delete', async () => {
            updateHostConfig({
                devToolsFreestyler: {
                    enabled: true,
                },
            });
            const { panel, view } = await createAiAssistancePanel({
                aidaClient: mockAidaClient([
                    [{ explanation: 'test' }],
                    [{ explanation: 'test2' }],
                ]),
            });
            panel.handleAction('freestyler.elements-floating-button');
            (await view.nextInput).onTextSubmit('User question to Freestyler?');
            await view.nextInput;
            panel.handleAction('drjones.network-floating-button');
            (await view.nextInput).onTextSubmit('User question to DrJones?');
            const { contextMenu, id } = openHistoryContextMenu((await view.nextInput), 'User question to Freestyler?');
            assert.isDefined(id);
            contextMenu.invokeHandler(id);
            await view.nextInput;
            const stub = sinon.createStubInstance(AiAssistance.AiHistoryStorage);
            sinon.stub(AiAssistance.AiHistoryStorage, 'instance').returns(stub);
            view.input.onDeleteClick();
            assert.deepEqual((await view.nextInput).messages, []);
            assert.strictEqual(stub.deleteHistoryEntry.callCount, 1);
            assert.isString(stub.deleteHistoryEntry.lastCall.args[0]);
            const menuAfterDelete = openHistoryContextMenu(view.input, 'User question to Freestyler?');
            assert.isUndefined(menuAfterDelete.id);
        });
    });
    it('should have empty state after clear chat', async () => {
        const { panel, view } = await createAiAssistancePanel({
            aidaClient: mockAidaClient([[{ explanation: 'test' }]]),
        });
        panel.handleAction('freestyler.elements-floating-button');
        (await view.nextInput).onTextSubmit('test');
        assert.deepEqual((await view.nextInput).messages, [
            {
                entity: "user" /* AiAssistance.ChatMessageEntity.USER */,
                text: 'test',
                imageInput: undefined,
            },
            {
                answer: 'test',
                entity: "model" /* AiAssistance.ChatMessageEntity.MODEL */,
                rpcId: undefined,
                suggestions: undefined,
                steps: [],
            },
        ]);
        view.input.onDeleteClick();
        assert.deepEqual((await view.nextInput).messages, []);
        assert.isUndefined(view.input.conversationType);
    });
    it('should select default agent based on open panel after clearing the chat', async () => {
        updateHostConfig({
            devToolsFreestyler: {
                enabled: true,
            },
        });
        UI.Context.Context.instance().setFlavor(Elements.ElementsPanel.ElementsPanel, sinon.createStubInstance(Elements.ElementsPanel.ElementsPanel));
        const { panel, view } = await createAiAssistancePanel({ aidaClient: mockAidaClient([[{ explanation: 'test' }]]) });
        panel.handleAction('freestyler.elements-floating-button');
        (await view.nextInput).onTextSubmit('test');
        assert.deepEqual((await view.nextInput).messages, [
            {
                entity: "user" /* AiAssistance.ChatMessageEntity.USER */,
                text: 'test',
                imageInput: undefined,
            },
            {
                answer: 'test',
                entity: "model" /* AiAssistance.ChatMessageEntity.MODEL */,
                rpcId: undefined,
                suggestions: undefined,
                steps: [],
            },
        ]);
        view.input.onDeleteClick();
        assert.deepEqual((await view.nextInput).messages, []);
        assert.deepEqual(view.input.conversationType, "freestyler" /* AiAssistance.ConversationType.STYLING */);
    });
    it('should have empty state after clear chat history', async () => {
        const { panel, view } = await createAiAssistancePanel({ aidaClient: mockAidaClient([[{ explanation: 'test' }], [{ explanation: 'test2' }]]) });
        panel.handleAction('freestyler.elements-floating-button');
        (await view.nextInput).onTextSubmit('User question to Freestyler?');
        assert.deepEqual((await view.nextInput).messages, [
            {
                entity: "user" /* AiAssistance.ChatMessageEntity.USER */,
                text: 'User question to Freestyler?',
                imageInput: undefined,
            },
            {
                answer: 'test',
                entity: "model" /* AiAssistance.ChatMessageEntity.MODEL */,
                rpcId: undefined,
                suggestions: undefined,
                steps: [],
            },
        ]);
        panel.handleAction('drjones.network-floating-button');
        (await view.nextInput).onTextSubmit('User question to DrJones?');
        assert.deepEqual((await view.nextInput).messages, [
            {
                entity: "user" /* AiAssistance.ChatMessageEntity.USER */,
                text: 'User question to DrJones?',
                imageInput: undefined,
            },
            {
                answer: 'test2',
                entity: "model" /* AiAssistance.ChatMessageEntity.MODEL */,
                rpcId: undefined,
                suggestions: undefined,
                steps: [],
            },
        ]);
        let contextMenu = getMenu(() => {
            view.input.onHistoryClick(new MouseEvent('click'));
        });
        const clearAll = findMenuItemWithLabel(contextMenu.footerSection(), 'Clear local chats');
        assert.isDefined(clearAll);
        contextMenu.invokeHandler(clearAll.id());
        assert.deepEqual((await view.nextInput).messages, []);
        assert.isUndefined(view.input.conversationType);
        contextMenu.discard();
        contextMenu = getMenu(() => {
            view.input.onHistoryClick(new MouseEvent('click'));
        });
        const menuItem = findMenuItemWithLabel(contextMenu.defaultSection(), 'No past conversations');
        assert(menuItem);
    });
    describe('cross-origin', () => {
        beforeEach(async () => {
            createTarget();
            await createNetworkPanelForMockConnection();
        });
        afterEach(async () => {
            Network.NetworkPanel.NetworkPanel.instance().detach();
        });
        it('blocks input on cross origin requests', async () => {
            const networkRequest = createNetworkRequest({
                url: urlString `https://a.test`,
            });
            UI.Context.Context.instance().setFlavor(SDK.NetworkRequest.NetworkRequest, networkRequest);
            const { panel, view } = await createAiAssistancePanel({
                aidaClient: mockAidaClient([
                    [{ explanation: 'test' }],
                ])
            });
            panel.handleAction('drjones.network-floating-button');
            assert.isFalse((await view.nextInput).blockedByCrossOrigin);
            assert.strictEqual(view.input.selectedContext?.getItem(), networkRequest);
            // Send a query for https://a.test.
            panel.handleAction('drjones.network-floating-button');
            view.input.onTextSubmit('test');
            await view.nextInput;
            // Change context to https://b.test.
            const networkRequest2 = createNetworkRequest({
                url: urlString `https://b.test`,
            });
            UI.Context.Context.instance().setFlavor(SDK.NetworkRequest.NetworkRequest, networkRequest2);
            panel.handleAction('drjones.network-floating-button');
            assert.isTrue((await view.nextInput).blockedByCrossOrigin);
            assert.strictEqual(view.input.selectedContext?.getItem(), networkRequest2);
        });
        it('should be able to continue same-origin requests', async () => {
            updateHostConfig({
                devToolsFreestyler: {
                    enabled: true,
                },
            });
            const { panel, view } = await createAiAssistancePanel({
                aidaClient: mockAidaClient([[{ explanation: 'test' }], [{ explanation: 'test2' }]]),
            });
            UI.Context.Context.instance().setFlavor(Elements.ElementsPanel.ElementsPanel, sinon.createStubInstance(Elements.ElementsPanel.ElementsPanel));
            panel.handleAction('freestyler.elements-floating-button');
            view.input.onTextSubmit('test');
            assert.deepEqual((await view.nextInput).messages, [
                {
                    entity: "user" /* AiAssistance.ChatMessageEntity.USER */,
                    text: 'test',
                    imageInput: undefined,
                },
                {
                    answer: 'test',
                    entity: "model" /* AiAssistance.ChatMessageEntity.MODEL */,
                    rpcId: undefined,
                    suggestions: undefined,
                    steps: [],
                },
            ]);
            UI.Context.Context.instance().setFlavor(Elements.ElementsPanel.ElementsPanel, sinon.createStubInstance(Elements.ElementsPanel.ElementsPanel));
            panel.handleAction('freestyler.elements-floating-button');
            view.input.onTextSubmit('test2');
            assert.isFalse((await view.nextInput).isReadOnly);
            assert.deepEqual(view.input.messages, [
                {
                    entity: "user" /* AiAssistance.ChatMessageEntity.USER */,
                    text: 'test',
                    imageInput: undefined,
                },
                {
                    answer: 'test',
                    entity: "model" /* AiAssistance.ChatMessageEntity.MODEL */,
                    rpcId: undefined,
                    suggestions: undefined,
                    steps: [],
                },
                {
                    entity: "user" /* AiAssistance.ChatMessageEntity.USER */,
                    text: 'test2',
                    imageInput: undefined,
                },
                {
                    answer: 'test2',
                    entity: "model" /* AiAssistance.ChatMessageEntity.MODEL */,
                    rpcId: undefined,
                    suggestions: undefined,
                    steps: [],
                },
            ]);
        });
        it('blocks input on cross origin request, when the selected context is changed while the panel was hidden', async () => {
            const networkRequest = createNetworkRequest({
                url: urlString `https://a.test`,
            });
            UI.Context.Context.instance().setFlavor(SDK.NetworkRequest.NetworkRequest, networkRequest);
            const { panel, view } = await createAiAssistancePanel({
                aidaClient: mockAidaClient([
                    [{ explanation: 'test' }],
                ])
            });
            panel.handleAction('drjones.network-floating-button');
            assert.isFalse((await view.nextInput).blockedByCrossOrigin);
            assert.strictEqual(view.input.selectedContext?.getItem(), networkRequest);
            // Send a query for https://a.test.
            panel.handleAction('drjones.network-floating-button');
            view.input.onTextSubmit('test');
            await view.nextInput;
            // Hide the panel
            panel.hideWidget();
            // Change context to https://b.test.
            const networkRequest2 = createNetworkRequest({
                url: urlString `https://b.test`,
            });
            UI.Context.Context.instance().setFlavor(SDK.NetworkRequest.NetworkRequest, networkRequest2);
            // Show the widget again
            panel.showWidget();
            assert.isTrue((await view.nextInput).blockedByCrossOrigin);
            assert.strictEqual(view.input.selectedContext?.getItem(), networkRequest2);
        });
    });
    describe('auto agent selection for panels', () => {
        const tests = [
            {
                panel: Elements.ElementsPanel.ElementsPanel,
                expectedConversationType: "freestyler" /* AiAssistance.ConversationType.STYLING */,
                featureFlagName: 'devToolsFreestyler',
            },
            {
                panel: Network.NetworkPanel.NetworkPanel,
                expectedConversationType: "drjones-network-request" /* AiAssistance.ConversationType.NETWORK */,
                featureFlagName: 'devToolsAiAssistanceNetworkAgent',
            },
            {
                panel: Sources.SourcesPanel.SourcesPanel,
                expectedConversationType: "drjones-file" /* AiAssistance.ConversationType.FILE */,
                featureFlagName: 'devToolsAiAssistanceFileAgent',
            },
            {
                panel: Timeline.TimelinePanel.TimelinePanel,
                expectedConversationType: "drjones-performance" /* AiAssistance.ConversationType.PERFORMANCE */,
                featureFlagName: 'devToolsAiAssistancePerformanceAgent',
            }
        ];
        for (const test of tests) {
            it(`should select ${test.expectedConversationType} conversation when the panel ${test.panel.name} is opened`, async () => {
                updateHostConfig({
                    [test.featureFlagName]: {
                        enabled: true,
                    },
                });
                UI.Context.Context.instance().setFlavor(test.panel, sinon.createStubInstance(test.panel));
                const { view } = await createAiAssistancePanel({
                    aidaClient: mockAidaClient([[{ explanation: 'test' }]]),
                });
                assert.strictEqual(view.input.conversationType, test.expectedConversationType);
            });
            it(`should reset the conversation when ${test.panel.name} is closed and no other panels are open`, async () => {
                updateHostConfig({
                    [test.featureFlagName]: {
                        enabled: true,
                    },
                });
                UI.Context.Context.instance().setFlavor(test.panel, sinon.createStubInstance(test.panel));
                const { view } = await createAiAssistancePanel();
                assert.strictEqual(view.input.conversationType, test.expectedConversationType);
                UI.Context.Context.instance().setFlavor(test.panel, null);
                assert.isUndefined((await view.nextInput).conversationType);
            });
            it(`should render no conversation state if the ${test.panel.name} panel is changed and the feature is not enabled`, async () => {
                updateHostConfig({
                    [test.featureFlagName]: {
                        enabled: false,
                    },
                });
                UI.Context.Context.instance().setFlavor(test.panel, sinon.createStubInstance(test.panel));
                const { view } = await createAiAssistancePanel();
                assert.isUndefined(view.input.conversationType);
            });
        }
        describe('Performance Insight agent', () => {
            it('should select the PERFORMANCE_INSIGHT agent when the performance panel is open and insights are enabled and an insight is expanded', async () => {
                updateHostConfig({
                    devToolsAiAssistancePerformanceAgent: {
                        enabled: true,
                        insightsEnabled: true,
                    },
                });
                UI.Context.Context.instance().setFlavor(Timeline.TimelinePanel.TimelinePanel, sinon.createStubInstance(Timeline.TimelinePanel.TimelinePanel));
                UI.Context.Context.instance().setFlavor(Timeline.TimelinePanel.SelectedInsight, new Timeline.TimelinePanel.SelectedInsight({}));
                const { view } = await createAiAssistancePanel();
                assert.strictEqual(view.input.conversationType, "performance-insight" /* AiAssistance.ConversationType.PERFORMANCE_INSIGHT */);
            });
            it('should select the PERFORMANCE agent when the performance panel is open and insights are enabled but the user has not selected an insight', async () => {
                updateHostConfig({
                    devToolsAiAssistancePerformanceAgent: {
                        enabled: true,
                        insightsEnabled: true,
                    },
                });
                UI.Context.Context.instance().setFlavor(Timeline.TimelinePanel.TimelinePanel, sinon.createStubInstance(Timeline.TimelinePanel.TimelinePanel));
                UI.Context.Context.instance().setFlavor(Timeline.TimelinePanel.SelectedInsight, null);
                const { view } = await createAiAssistancePanel();
                assert.strictEqual(view.input.conversationType, "drjones-performance" /* AiAssistance.ConversationType.PERFORMANCE */);
            });
        });
    });
    it('erases previous partial response on blocked error', async () => {
        const { panel, view } = await createAiAssistancePanel({
            aidaClient: mockAidaClient([[{
                        explanation: 'This is the first part of the answer.',
                        metadata: { attributionMetadata: { attributionAction: Host.AidaClient.RecitationAction.BLOCK, citations: [] } }
                    }]]),
        });
        panel.handleAction('freestyler.elements-floating-button');
        view.input.onTextSubmit('test');
        assert.deepEqual((await view.nextInput).messages, [
            {
                entity: "user" /* AiAssistance.ChatMessageEntity.USER */,
                text: 'test',
                imageInput: undefined,
            },
            {
                answer: undefined,
                entity: "model" /* AiAssistance.ChatMessageEntity.MODEL */,
                rpcId: undefined,
                error: "block" /* AiAssistance.ErrorType.BLOCK */,
                steps: [],
            },
        ]);
    });
    describe('chat input', () => {
        describe('disabled state', () => {
            it('should be disabled when ai assistance enabled setting is disabled and show followTheSteps placeholder', async () => {
                Common.Settings.moduleSetting('ai-assistance-enabled').setDisabled(true);
                const { view } = await createAiAssistancePanel();
                assert.isTrue(view.input.isTextInputDisabled);
                assert.strictEqual(view.input.inputPlaceholder, 'Follow the steps above to ask a question');
                assert.strictEqual(view.input.disclaimerText, 'This is an experimental AI feature and won\'t always get it right.');
            });
            it('should be disabled when ai assistance setting is marked as false and show followTheSteps placeholder', async () => {
                Common.Settings.moduleSetting('ai-assistance-enabled').set(false);
                const { view } = await createAiAssistancePanel();
                assert.isTrue(view.input.isTextInputDisabled);
                assert.strictEqual(view.input.inputPlaceholder, 'Follow the steps above to ask a question');
                assert.strictEqual(view.input.disclaimerText, 'This is an experimental AI feature and won\'t always get it right.');
            });
            it('should be disabled when the user is blocked by age and show followTheSteps placeholder', async () => {
                Common.Settings.moduleSetting('ai-assistance-enabled').set(true);
                updateHostConfig({
                    aidaAvailability: {
                        blockedByAge: true,
                    },
                });
                const { view } = await createAiAssistancePanel();
                assert.isTrue(view.input.isTextInputDisabled);
                assert.strictEqual(view.input.inputPlaceholder, 'Follow the steps above to ask a question');
                assert.strictEqual(view.input.disclaimerText, 'This is an experimental AI feature and won\'t always get it right.');
            });
            it('should be disabled when Aida availability status is not AVAILABLE', async () => {
                Common.Settings.moduleSetting('ai-assistance-enabled').set(true);
                const { view } = await createAiAssistancePanel({ aidaAvailability: "no-internet" /* Host.AidaClient.AidaAccessPreconditions.NO_INTERNET */ });
                assert.isTrue(view.input.isTextInputDisabled);
            });
            it('should be disabled when the next message is blocked by cross origin and show crossOriginError placeholder', async () => {
                Common.Settings.moduleSetting('ai-assistance-enabled').set(true);
                const networkRequest = createNetworkRequest({
                    url: urlString `https://a.test`,
                });
                UI.Context.Context.instance().setFlavor(SDK.NetworkRequest.NetworkRequest, networkRequest);
                const { panel, view } = await createAiAssistancePanel({
                    aidaClient: mockAidaClient([
                        [{ explanation: 'test' }],
                    ]),
                });
                panel.handleAction('drjones.network-floating-button');
                assert.isFalse((await view.nextInput).blockedByCrossOrigin);
                assert.strictEqual(view.input.selectedContext?.getItem(), networkRequest);
                // Send a query for https://a.test.
                panel.handleAction('drjones.network-floating-button');
                view.input.onTextSubmit('test');
                await view.nextInput;
                // Change context to https://b.test.
                const networkRequest2 = createNetworkRequest({
                    url: urlString `https://b.test`,
                });
                UI.Context.Context.instance().setFlavor(SDK.NetworkRequest.NetworkRequest, networkRequest2);
                panel.handleAction('drjones.network-floating-button');
                assert.isTrue((await view.nextInput).blockedByCrossOrigin);
                assert.isTrue(view.input.isTextInputDisabled);
                assert.strictEqual(view.input.inputPlaceholder, 'To talk about data from another origin, start a new chat');
            });
            it('should be disabled when there is no selected context and show inputPlaceholderForStylingNoContext', async () => {
                updateHostConfig({
                    devToolsFreestyler: {
                        enabled: true,
                    },
                });
                Common.Settings.moduleSetting('ai-assistance-enabled').set(true);
                const { panel, view } = await createAiAssistancePanel({ aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */ });
                panel.handleAction('freestyler.elements-floating-button');
                assert.isNull((await view.nextInput).selectedContext);
                assert.isTrue(view.input.isTextInputDisabled);
                assert.strictEqual(view.input.inputPlaceholder, 'Select an element to ask a question');
            });
        });
        it('should disable the send button when the input is empty', async () => {
            Common.Settings.moduleSetting('ai-assistance-enabled').set(true);
            updateHostConfig({
                devToolsFreestyler: {
                    enabled: true,
                },
            });
            UI.Context.Context.instance().setFlavor(Elements.ElementsPanel.ElementsPanel, sinon.createStubInstance(Elements.ElementsPanel.ElementsPanel));
            const { panel, view } = await createAiAssistancePanel({ aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */ });
            panel.handleAction('freestyler.elements-floating-button');
            assert.isTrue((await view.nextInput).isTextInputEmpty);
            view.input.onTextInputChange('test');
            assert.isFalse((await view.nextInput).isTextInputEmpty);
            view.input.onTextInputChange('');
            assert.isTrue((await view.nextInput).isTextInputEmpty);
            view.input.onTextInputChange('test');
            assert.isFalse((await view.nextInput).isTextInputEmpty);
            view.input.onTextSubmit('test');
            assert.isTrue((await view.nextInput).isTextInputEmpty);
        });
    });
    describe('multimodal input', () => {
        let target;
        beforeEach(() => {
            target = createTarget();
        });
        function mockScreenshotModel() {
            const screenCaptureModel = target.model(SDK.ScreenCaptureModel.ScreenCaptureModel);
            assert.exists(screenCaptureModel);
            return {
                captureScreenshotStub: sinon.stub(screenCaptureModel, 'captureScreenshot').returns(Promise.resolve('imageInput')),
            };
        }
        it('multimodal related functions unavailable when multimodal is disabled', async () => {
            updateHostConfig({
                devToolsFreestyler: {
                    enabled: true,
                    multimodal: false,
                },
            });
            UI.Context.Context.instance().setFlavor(Elements.ElementsPanel.ElementsPanel, sinon.createStubInstance(Elements.ElementsPanel.ElementsPanel));
            const { view } = await createAiAssistancePanel();
            assert.isFalse(view.input.multimodalInputEnabled);
            assert.notExists(view.input.onTakeScreenshot);
            assert.notExists(view.input.onRemoveImageInput);
            assert.notExists(view.input.imageInput);
        });
        it('adds an image input and then removes it', async () => {
            const { captureScreenshotStub } = mockScreenshotModel();
            updateHostConfig({
                devToolsFreestyler: {
                    enabled: true,
                    multimodal: true,
                },
            });
            UI.Context.Context.instance().setFlavor(Elements.ElementsPanel.ElementsPanel, sinon.createStubInstance(Elements.ElementsPanel.ElementsPanel));
            const { view } = await createAiAssistancePanel();
            assert.isTrue(view.input.multimodalInputEnabled);
            view.input.onTakeScreenshot?.();
            assert.deepEqual((await view.nextInput).imageInput, { isLoading: false, data: 'imageInput' });
            expect(captureScreenshotStub.calledOnce);
            view.input.onRemoveImageInput?.();
            assert.notExists((await view.nextInput).imageInput);
        });
        it('sends image as input', async () => {
            updateHostConfig({
                devToolsFreestyler: {
                    enabled: true,
                    multimodal: true,
                },
            });
            UI.Context.Context.instance().setFlavor(Elements.ElementsPanel.ElementsPanel, sinon.createStubInstance(Elements.ElementsPanel.ElementsPanel));
            const { view } = await createAiAssistancePanel({ aidaClient: mockAidaClient([[{ explanation: 'test' }]]) });
            assert.isTrue(view.input.multimodalInputEnabled);
            view.input.onTextSubmit('test', { inlineData: { data: 'imageInput', mimeType: 'image/jpeg' } });
            assert.deepEqual((await view.nextInput).messages, [
                {
                    entity: "user" /* AiAssistance.ChatMessageEntity.USER */,
                    text: 'test',
                    imageInput: { inlineData: { data: 'imageInput', mimeType: 'image/jpeg' } }
                },
                {
                    answer: 'test',
                    entity: "model" /* AiAssistance.ChatMessageEntity.MODEL */,
                    rpcId: undefined,
                    suggestions: undefined,
                    steps: [],
                },
            ]);
        });
        it('image input should be removed when primary target changed', async () => {
            mockScreenshotModel();
            updateHostConfig({
                devToolsFreestyler: {
                    enabled: true,
                    multimodal: true,
                },
            });
            UI.Context.Context.instance().setFlavor(Elements.ElementsPanel.ElementsPanel, sinon.createStubInstance(Elements.ElementsPanel.ElementsPanel));
            const { view } = await createAiAssistancePanel();
            assert.isUndefined(view.input.imageInput);
            view.input.onTakeScreenshot?.();
            assert.exists((await view.nextInput).imageInput);
            const resourceTreeModel = target.model(SDK.ResourceTreeModel.ResourceTreeModel);
            resourceTreeModel?.dispatchEventToListeners(SDK.ResourceTreeModel.Events.PrimaryPageChanged, {
                frame: sinon.createStubInstance(SDK.ResourceTreeModel.ResourceTreeFrame),
                type: "Navigation" /* SDK.ResourceTreeModel.PrimaryPageChangeType.NAVIGATION */
            });
            assert.isUndefined((await view.nextInput).imageInput);
        });
    });
});
//# sourceMappingURL=AiAssistancePanel.test.js.map