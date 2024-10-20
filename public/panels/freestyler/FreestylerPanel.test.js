// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Trace from '../../models/trace/trace.js';
import * as Workspace from '../../models/workspace/workspace.js';
import { describeWithEnvironment, getGetHostConfigStub, registerNoopActions } from '../../testing/EnvironmentHelpers.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Freestyler from './freestyler.js';
function getTestAidaClient() {
    return {
        async *fetch() {
            yield { explanation: 'test', metadata: {}, completed: true };
        },
        registerClientEvent: sinon.spy(),
    };
}
function getTestSyncInfo() {
    return { isSyncActive: true };
}
async function drainMicroTasks() {
    await new Promise(resolve => setTimeout(resolve, 0));
}
describeWithEnvironment('FreestylerPanel', () => {
    let mockView;
    let panel;
    beforeEach(() => {
        mockView = sinon.stub();
        registerNoopActions(['elements.toggle-element-search']);
    });
    afterEach(() => {
        panel.detach();
    });
    describe('consent view', () => {
        it('should render consent view when the consent is not given before', async () => {
            panel = new Freestyler.FreestylerPanel(mockView, {
                aidaClient: getTestAidaClient(),
                aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                syncInfo: getTestSyncInfo(),
            });
            panel.markAsRoot();
            panel.show(document.body);
            sinon.assert.calledWith(mockView, sinon.match({ state: "consent-view" /* Freestyler.State.CONSENT_VIEW */ }));
        });
        it('should switch from consent view to chat view when enabling setting', async () => {
            panel = new Freestyler.FreestylerPanel(mockView, {
                aidaClient: getTestAidaClient(),
                aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                syncInfo: getTestSyncInfo(),
            });
            panel.markAsRoot();
            panel.show(document.body);
            sinon.assert.calledWith(mockView, sinon.match({ state: "consent-view" /* Freestyler.State.CONSENT_VIEW */ }));
            Common.Settings.moduleSetting('ai-assistance-enabled').set(true);
            sinon.assert.calledWith(mockView, sinon.match({ state: "chat-view" /* Freestyler.State.CHAT_VIEW */ }));
            await drainMicroTasks();
        });
        it('should render chat view when the consent is given before', async () => {
            Common.Settings.moduleSetting('ai-assistance-enabled').set(true);
            panel = new Freestyler.FreestylerPanel(mockView, {
                aidaClient: getTestAidaClient(),
                aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                syncInfo: getTestSyncInfo(),
            });
            panel.markAsRoot();
            panel.show(document.body);
            sinon.assert.calledWith(mockView, sinon.match({ state: "chat-view" /* Freestyler.State.CHAT_VIEW */ }));
        });
        it('should render the consent view when the setting is disabled', async () => {
            Common.Settings.moduleSetting('ai-assistance-enabled').set(true);
            Common.Settings.moduleSetting('ai-assistance-enabled').setDisabled(true);
            const chatUiStates = [];
            const viewStub = sinon.stub().callsFake(props => {
                chatUiStates.push(props.state);
            });
            panel = new Freestyler.FreestylerPanel(viewStub, {
                aidaClient: getTestAidaClient(),
                aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                syncInfo: getTestSyncInfo(),
            });
            panel.markAsRoot();
            panel.show(document.body);
            await drainMicroTasks();
            sinon.assert.calledWith(viewStub, sinon.match({ state: "consent-view" /* Freestyler.State.CONSENT_VIEW */ }));
            assert.isFalse(chatUiStates.includes("chat-view" /* Freestyler.State.CHAT_VIEW */));
            Common.Settings.moduleSetting('ai-assistance-enabled').setDisabled(false);
        });
        it('should render the consent view when blocked by age', async () => {
            Common.Settings.moduleSetting('ai-assistance-enabled').set(true);
            const stub = getGetHostConfigStub({
                aidaAvailability: {
                    blockedByAge: true,
                },
                devToolsFreestyler: {
                    enabled: true,
                },
            });
            panel = new Freestyler.FreestylerPanel(mockView, {
                aidaClient: getTestAidaClient(),
                aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                syncInfo: getTestSyncInfo(),
            });
            panel.markAsRoot();
            panel.show(document.body);
            sinon.assert.calledWith(mockView, sinon.match({ state: "consent-view" /* Freestyler.State.CONSENT_VIEW */ }));
            stub.restore();
        });
        it('updates when the user logs in', async () => {
            Common.Settings.moduleSetting('ai-assistance-enabled').set(true);
            panel = new Freestyler.FreestylerPanel(mockView, {
                aidaClient: getTestAidaClient(),
                aidaAvailability: "no-account-email" /* Host.AidaClient.AidaAccessPreconditions.NO_ACCOUNT_EMAIL */,
                syncInfo: getTestSyncInfo(),
            });
            panel.markAsRoot();
            panel.show(document.body);
            await drainMicroTasks();
            sinon.assert.calledWith(mockView, sinon.match({
                state: "chat-view" /* Freestyler.State.CHAT_VIEW */,
                aidaAvailability: "no-account-email" /* Host.AidaClient.AidaAccessPreconditions.NO_ACCOUNT_EMAIL */,
            }));
            mockView.reset();
            const stub = sinon.stub(Host.AidaClient.AidaClient, 'checkAccessPreconditions')
                .returns(Promise.resolve("available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */));
            Host.AidaClient.HostConfigTracker.instance().dispatchEventToListeners("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */);
            await drainMicroTasks();
            sinon.assert.calledWith(mockView, sinon.match({
                state: "chat-view" /* Freestyler.State.CHAT_VIEW */,
                aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
            }));
            stub.restore();
        });
    });
    describe('on rate click', () => {
        afterEach(() => {
            // @ts-expect-error global test variable
            setFreestylerServerSideLoggingEnabled(false);
        });
        it('renders a button linking to settings', () => {
            const stub = sinon.stub(UI.ViewManager.ViewManager.instance(), 'showView');
            panel = new Freestyler.FreestylerPanel(mockView, {
                aidaClient: getTestAidaClient(),
                aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                syncInfo: getTestSyncInfo(),
            });
            const toolbar = panel.contentElement.querySelector('.freestyler-right-toolbar');
            const button = toolbar.shadowRoot.querySelector('devtools-button[aria-label=\'Settings\']');
            assert.instanceOf(button, HTMLElement);
            button.click();
            assert.isTrue(stub.calledWith('chrome-ai'));
            stub.restore();
        });
        it('should allow logging if configured', () => {
            // @ts-expect-error global test variable
            setFreestylerServerSideLoggingEnabled(true);
            const stub = getGetHostConfigStub({
                aidaAvailability: {
                    disallowLogging: false,
                },
            });
            const aidaClient = getTestAidaClient();
            panel = new Freestyler.FreestylerPanel(mockView, {
                aidaClient,
                aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                syncInfo: getTestSyncInfo(),
            });
            panel.markAsRoot();
            panel.show(document.body);
            const callArgs = mockView.getCall(0)?.args[0];
            mockView.reset();
            callArgs.onFeedbackSubmit(0, "POSITIVE" /* Host.AidaClient.Rating.POSITIVE */);
            sinon.assert.match(aidaClient.registerClientEvent.firstCall.firstArg, sinon.match({
                disable_user_content_logging: false,
            }));
            stub.restore();
        });
        it('should send POSITIVE rating to aida client when the user clicks on positive rating', () => {
            const RPC_ID = 0;
            const aidaClient = getTestAidaClient();
            panel = new Freestyler.FreestylerPanel(mockView, {
                aidaClient,
                aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                syncInfo: getTestSyncInfo(),
            });
            panel.markAsRoot();
            panel.show(document.body);
            const callArgs = mockView.getCall(0).args[0];
            mockView.reset();
            callArgs.onFeedbackSubmit(RPC_ID, "POSITIVE" /* Host.AidaClient.Rating.POSITIVE */);
            sinon.assert.match(aidaClient.registerClientEvent.firstCall.firstArg, sinon.match({
                corresponding_aida_rpc_global_id: RPC_ID,
                do_conversation_client_event: {
                    user_feedback: {
                        sentiment: 'POSITIVE',
                    },
                },
                disable_user_content_logging: true,
            }));
        });
        it('should send NEGATIVE rating to aida client when the user clicks on positive rating', () => {
            const RPC_ID = 0;
            const aidaClient = getTestAidaClient();
            panel = new Freestyler.FreestylerPanel(mockView, {
                aidaClient,
                aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                syncInfo: getTestSyncInfo(),
            });
            panel.markAsRoot();
            panel.show(document.body);
            const callArgs = mockView.getCall(0).args[0];
            mockView.reset();
            callArgs.onFeedbackSubmit(RPC_ID, "NEGATIVE" /* Host.AidaClient.Rating.NEGATIVE */);
            sinon.assert.match(aidaClient.registerClientEvent.firstCall.firstArg, sinon.match({
                corresponding_aida_rpc_global_id: RPC_ID,
                do_conversation_client_event: {
                    user_feedback: {
                        sentiment: 'NEGATIVE',
                    },
                },
                disable_user_content_logging: true,
            }));
        });
        it('should send feedback text with data', () => {
            const RPC_ID = 0;
            const feedback = 'This helped me a ton.';
            const aidaClient = getTestAidaClient();
            panel = new Freestyler.FreestylerPanel(mockView, {
                aidaClient,
                aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                syncInfo: getTestSyncInfo(),
            });
            panel.markAsRoot();
            panel.show(document.body);
            const callArgs = mockView.getCall(0).args[0];
            mockView.reset();
            callArgs.onFeedbackSubmit(RPC_ID, "POSITIVE" /* Host.AidaClient.Rating.POSITIVE */, feedback);
            sinon.assert.match(aidaClient.registerClientEvent.firstCall.firstArg, sinon.match({
                corresponding_aida_rpc_global_id: RPC_ID,
                do_conversation_client_event: {
                    user_feedback: {
                        sentiment: 'POSITIVE',
                        user_input: {
                            comment: feedback,
                        },
                    },
                },
                disable_user_content_logging: true,
            }));
        });
    });
    describe('flavor change listeners', () => {
        describe('SDK.DOMModel.DOMNode flavor changes for selected element', () => {
            it('should set the selected element when the widget is shown', () => {
                UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, null);
                panel = new Freestyler.FreestylerPanel(mockView, {
                    aidaClient: getTestAidaClient(),
                    aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                    syncInfo: getTestSyncInfo(),
                });
                const node = sinon.createStubInstance(SDK.DOMModel.DOMNode, {
                    nodeType: Node.ELEMENT_NODE,
                });
                UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, node);
                panel.markAsRoot();
                panel.show(document.body);
                sinon.assert.calledWith(mockView, sinon.match({
                    selectedElement: node,
                }));
            });
            it('should update the selected element when the changed DOMNode flavor is an ELEMENT_NODE', () => {
                UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, null);
                panel = new Freestyler.FreestylerPanel(mockView, {
                    aidaClient: getTestAidaClient(),
                    aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                    syncInfo: getTestSyncInfo(),
                });
                panel.markAsRoot();
                panel.show(document.body);
                sinon.assert.calledWith(mockView, sinon.match({
                    selectedElement: null,
                }));
                const node = sinon.createStubInstance(SDK.DOMModel.DOMNode, {
                    nodeType: Node.ELEMENT_NODE,
                });
                UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, node);
                sinon.assert.calledWith(mockView, sinon.match({
                    selectedElement: node,
                }));
            });
            it('should set selected element to null when the change DOMNode flavor is not an ELEMENT_NODE', () => {
                UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, null);
                panel = new Freestyler.FreestylerPanel(mockView, {
                    aidaClient: getTestAidaClient(),
                    aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                    syncInfo: getTestSyncInfo(),
                });
                panel.markAsRoot();
                panel.show(document.body);
                sinon.assert.calledWith(mockView, sinon.match({
                    selectedElement: null,
                }));
                const node = sinon.createStubInstance(SDK.DOMModel.DOMNode, {
                    nodeType: Node.COMMENT_NODE,
                });
                UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, node);
                sinon.assert.calledWith(mockView, sinon.match({
                    selectedElement: null,
                }));
            });
            it('should not handle DOMNode flavor changes if the widget is not shown', () => {
                UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, null);
                panel = new Freestyler.FreestylerPanel(mockView, {
                    aidaClient: getTestAidaClient(),
                    aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                    syncInfo: getTestSyncInfo(),
                });
                const node = sinon.createStubInstance(SDK.DOMModel.DOMNode, {
                    nodeType: Node.ELEMENT_NODE,
                });
                UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, node);
                sinon.assert.notCalled(mockView);
            });
        });
        describe('SDK.NetworkRequest.NetworkRequest flavor changes for selected network request', () => {
            it('should set the selected network request when the widget is shown', () => {
                UI.Context.Context.instance().setFlavor(SDK.NetworkRequest.NetworkRequest, null);
                panel = new Freestyler.FreestylerPanel(mockView, {
                    aidaClient: getTestAidaClient(),
                    aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                    syncInfo: getTestSyncInfo(),
                });
                const networkRequest = sinon.createStubInstance(SDK.NetworkRequest.NetworkRequest);
                UI.Context.Context.instance().setFlavor(SDK.NetworkRequest.NetworkRequest, networkRequest);
                panel.markAsRoot();
                panel.show(document.body);
                sinon.assert.calledWith(mockView, sinon.match({
                    selectedNetworkRequest: networkRequest,
                }));
            });
            it('should set selected network request when the NetworkRequest flavor changes', () => {
                UI.Context.Context.instance().setFlavor(SDK.NetworkRequest.NetworkRequest, null);
                panel = new Freestyler.FreestylerPanel(mockView, {
                    aidaClient: getTestAidaClient(),
                    aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                    syncInfo: getTestSyncInfo(),
                });
                panel.markAsRoot();
                panel.show(document.body);
                sinon.assert.calledWith(mockView, sinon.match({
                    selectedNetworkRequest: null,
                }));
                const networkRequest = sinon.createStubInstance(SDK.NetworkRequest.NetworkRequest);
                UI.Context.Context.instance().setFlavor(SDK.NetworkRequest.NetworkRequest, networkRequest);
                sinon.assert.calledWith(mockView, sinon.match({
                    selectedNetworkRequest: networkRequest,
                }));
            });
            it('should not handle NetworkRequest flavor changes if the widget is not shown', () => {
                UI.Context.Context.instance().setFlavor(SDK.NetworkRequest.NetworkRequest, null);
                panel = new Freestyler.FreestylerPanel(mockView, {
                    aidaClient: getTestAidaClient(),
                    aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                    syncInfo: getTestSyncInfo(),
                });
                const networkRequest = sinon.createStubInstance(SDK.NetworkRequest.NetworkRequest);
                UI.Context.Context.instance().setFlavor(SDK.NetworkRequest.NetworkRequest, networkRequest);
                sinon.assert.notCalled(mockView);
            });
        });
        describe('Trace.Helpers.TreeHelpers.TraceEntryNodeForAI flavor changes for selected stack trace', () => {
            it('should set the selected stack trace when the widget is shown', () => {
                UI.Context.Context.instance().setFlavor(Trace.Helpers.TreeHelpers.TraceEntryNodeForAI, null);
                panel = new Freestyler.FreestylerPanel(mockView, {
                    aidaClient: getTestAidaClient(),
                    aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                    syncInfo: getTestSyncInfo(),
                });
                const traceEntryNode = {};
                UI.Context.Context.instance().setFlavor(Trace.Helpers.TreeHelpers.TraceEntryNodeForAI, traceEntryNode);
                panel.markAsRoot();
                panel.show(document.body);
                sinon.assert.calledWith(mockView, sinon.match({
                    selectedStackTrace: traceEntryNode,
                }));
            });
            it('should set selected stack trace when the TraceEntryNodeForAI flavor changes', () => {
                UI.Context.Context.instance().setFlavor(Trace.Helpers.TreeHelpers.TraceEntryNodeForAI, null);
                panel = new Freestyler.FreestylerPanel(mockView, {
                    aidaClient: getTestAidaClient(),
                    aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                    syncInfo: getTestSyncInfo(),
                });
                panel.markAsRoot();
                panel.show(document.body);
                sinon.assert.calledWith(mockView, sinon.match({
                    selectedStackTrace: null,
                }));
                const traceEntryNode = {};
                UI.Context.Context.instance().setFlavor(Trace.Helpers.TreeHelpers.TraceEntryNodeForAI, traceEntryNode);
                sinon.assert.calledWith(mockView, sinon.match({
                    selectedStackTrace: traceEntryNode,
                }));
            });
            it('should not handle TraceEntryNodeForAI flavor changes if the widget is not shown', () => {
                UI.Context.Context.instance().setFlavor(Trace.Helpers.TreeHelpers.TraceEntryNodeForAI, null);
                panel = new Freestyler.FreestylerPanel(mockView, {
                    aidaClient: getTestAidaClient(),
                    aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                    syncInfo: getTestSyncInfo(),
                });
                const traceEntryNode = {};
                UI.Context.Context.instance().setFlavor(Trace.Helpers.TreeHelpers.TraceEntryNodeForAI, traceEntryNode);
                sinon.assert.notCalled(mockView);
            });
        });
        describe('Workspace.UISourceCode.UISourceCode flavor changes for selected network request', () => {
            it('should set selected file when the widget is shown', () => {
                UI.Context.Context.instance().setFlavor(Workspace.UISourceCode.UISourceCode, null);
                panel = new Freestyler.FreestylerPanel(mockView, {
                    aidaClient: getTestAidaClient(),
                    aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                    syncInfo: getTestSyncInfo(),
                });
                const uiSourceCode = sinon.createStubInstance(Workspace.UISourceCode.UISourceCode);
                UI.Context.Context.instance().setFlavor(Workspace.UISourceCode.UISourceCode, uiSourceCode);
                panel.markAsRoot();
                panel.show(document.body);
                sinon.assert.calledWith(mockView, sinon.match({
                    selectedFile: uiSourceCode,
                }));
            });
            it('should set selected file when the UISourceCode flavor changes', () => {
                UI.Context.Context.instance().setFlavor(Workspace.UISourceCode.UISourceCode, null);
                panel = new Freestyler.FreestylerPanel(mockView, {
                    aidaClient: getTestAidaClient(),
                    aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                    syncInfo: getTestSyncInfo(),
                });
                panel.markAsRoot();
                panel.show(document.body);
                sinon.assert.calledWith(mockView, sinon.match({
                    selectedFile: null,
                }));
                const uiSourceCode = sinon.createStubInstance(Workspace.UISourceCode.UISourceCode);
                UI.Context.Context.instance().setFlavor(Workspace.UISourceCode.UISourceCode, uiSourceCode);
                sinon.assert.calledWith(mockView, sinon.match({
                    selectedFile: uiSourceCode,
                }));
            });
            it('should not handle NetworkRequest flavor changes if the widget is not shown', () => {
                UI.Context.Context.instance().setFlavor(Workspace.UISourceCode.UISourceCode, null);
                panel = new Freestyler.FreestylerPanel(mockView, {
                    aidaClient: getTestAidaClient(),
                    aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                    syncInfo: getTestSyncInfo(),
                });
                const uiSourceCode = sinon.createStubInstance(Workspace.UISourceCode.UISourceCode);
                UI.Context.Context.instance().setFlavor(Workspace.UISourceCode.UISourceCode, uiSourceCode);
                sinon.assert.notCalled(mockView);
            });
        });
    });
    describe('toggle search element action', () => {
        let toggleSearchElementAction;
        beforeEach(() => {
            toggleSearchElementAction =
                UI.ActionRegistry.ActionRegistry.instance().getAction('elements.toggle-element-search');
            toggleSearchElementAction.setToggled(false);
        });
        it('should set inspectElementToggled when the widget is shown', () => {
            panel = new Freestyler.FreestylerPanel(mockView, {
                aidaClient: getTestAidaClient(),
                aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                syncInfo: getTestSyncInfo(),
            });
            toggleSearchElementAction.setToggled(true);
            panel.markAsRoot();
            panel.show(document.body);
            sinon.assert.calledWith(mockView, sinon.match({
                inspectElementToggled: true,
            }));
        });
        it('should update inspectElementToggled when the action is toggled', () => {
            toggleSearchElementAction.setToggled(false);
            panel = new Freestyler.FreestylerPanel(mockView, {
                aidaClient: getTestAidaClient(),
                aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                syncInfo: getTestSyncInfo(),
            });
            panel.markAsRoot();
            panel.show(document.body);
            sinon.assert.calledWith(mockView, sinon.match({
                inspectElementToggled: false,
            }));
            toggleSearchElementAction.setToggled(true);
            sinon.assert.calledWith(mockView, sinon.match({
                inspectElementToggled: true,
            }));
        });
        it('should not update toggleSearchElementAction even after the action is toggled when the widget is not shown', () => {
            toggleSearchElementAction.setToggled(false);
            panel = new Freestyler.FreestylerPanel(mockView, {
                aidaClient: getTestAidaClient(),
                aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
                syncInfo: getTestSyncInfo(),
            });
            toggleSearchElementAction.setToggled(true);
            sinon.assert.notCalled(mockView);
        });
    });
});
//# sourceMappingURL=FreestylerPanel.test.js.map