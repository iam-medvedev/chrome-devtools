// Copyright (c) 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../i18n/i18n.js';
import * as EnhancedTraces from './EnhancedTracesParser.js';
const UIStrings = {
    /**
     * @description Text that appears when no source text is available for the given script
     */
    noSourceText: 'No source text available',
};
const str_ = i18n.i18n.registerUIStrings('core/sdk/RehydratingConnection.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class RehydratingConnection {
    rehydratingConnectionState = 1 /* RehydratingConnectionState.UNINITIALIZED */;
    onDisconnect = null;
    onMessage = null;
    traceEvents = [];
    sessions = new Map();
    static rehydratingConnectionInstance = null;
    constructor() {
    }
    static instance() {
        if (!this.rehydratingConnectionInstance) {
            this.rehydratingConnectionInstance = new RehydratingConnection();
        }
        return this.rehydratingConnectionInstance;
    }
    async startHydration(logPayload) {
        // OnMessage should've been set before hydration, and the connection should
        // be initialized and not hydrated already.
        if (!this.onMessage || this.rehydratingConnectionState !== 2 /* RehydratingConnectionState.INITIALIZED */) {
            return false;
        }
        const payload = JSON.parse(logPayload);
        if (!('traceEvents' in payload)) {
            console.error('RehydratingConnection failed to initialize due to missing trace events in payload');
            return false;
        }
        this.traceEvents = payload.traceEvents;
        const enhancedTracesParser = new EnhancedTraces.EnhancedTracesParser(this.traceEvents);
        const dataPerTarget = enhancedTracesParser.data();
        let sessionId = 0;
        // Set up default rehydrating session.
        this.sessions.set(sessionId, new RehydratingSessionBase(this));
        for (const [target, [executionContexts, scripts]] of dataPerTarget.entries()) {
            this.postToFrontend({
                method: 'Target.targetCreated',
                params: {
                    targetInfo: {
                        targetId: target.targetId,
                        type: target.type,
                        title: target.url,
                        url: target.url,
                        attached: false,
                        canAccessOpener: false,
                    },
                },
            });
            // Create new session associated to the target created and send
            // Target.attachedToTarget to frontend.
            sessionId += 1;
            this.sessions.set(sessionId, new RehydratingSession(sessionId, target, executionContexts, scripts, this));
        }
        this.rehydratingConnectionState = 3 /* RehydratingConnectionState.REHYDRATED */;
        return true;
    }
    setOnMessage(onMessage) {
        this.onMessage = onMessage;
        this.rehydratingConnectionState = 2 /* RehydratingConnectionState.INITIALIZED */;
    }
    setOnDisconnect(onDisconnect) {
        this.onDisconnect = onDisconnect;
    }
    // The function "sendRawMessage" is typically devtools front-end
    // sending message to the backend via CDP. In this case, given that Rehydrating
    // connection is an emulation of devtool back-end, sendRawMessage here
    // is in fact rehydrating connection directly handling and acting on the
    // receieved message.
    sendRawMessage(message) {
        if (typeof message === 'string') {
            message = JSON.parse(message);
        }
        const data = message;
        if (typeof data.sessionId !== 'undefined') {
            const session = this.sessions.get(data.sessionId);
            if (session) {
                session.handleFrontendMessageAsFakeCDPAgent(data);
            }
            else {
                console.error('Invalid SessionId: ' + data.sessionId);
            }
        }
        else {
            this.sessions.get(0)?.handleFrontendMessageAsFakeCDPAgent(data);
        }
    }
    // Posting rehydrating connection's message/response
    // to devtools frontend through debugger protocol.
    postToFrontend(arg) {
        if (this.onMessage) {
            this.onMessage(arg);
        }
        else {
            // onMessage should be set before the connection is rehydrated
            console.error('onMessage was not initialized');
        }
    }
    disconnect() {
        return Promise.reject();
    }
}
// Default rehydrating session with default responses.
class RehydratingSessionBase {
    connection = null;
    constructor(connection) {
        this.connection = connection;
    }
    sendMessageToFrontend(payload) {
        requestAnimationFrame(() => {
            if (this.connection) {
                this.connection.postToFrontend(payload);
            }
        });
    }
    handleFrontendMessageAsFakeCDPAgent(data) {
        // Send default response in default session.
        this.sendMessageToFrontend({
            id: data.id,
            result: {},
        });
    }
}
export class RehydratingSession extends RehydratingSessionBase {
    sessionId;
    target;
    executionContexts = [];
    scripts = [];
    constructor(sessionId, target, executionContexts, scripts, connection) {
        super(connection);
        this.sessionId = sessionId;
        this.target = target;
        this.executionContexts = executionContexts;
        this.scripts = scripts;
        this.sessionAttachToTarget();
    }
    sendMessageToFrontend(payload, attachSessionId = true) {
        // Attach the session's Id to the message.
        if (this.sessionId !== 0 && attachSessionId) {
            payload.sessionId = this.sessionId;
        }
        super.sendMessageToFrontend(payload);
    }
    handleFrontendMessageAsFakeCDPAgent(data) {
        switch (data.method) {
            case 'Runtime.enable':
                this.handleRuntimeEnabled(data.id);
                break;
            case 'Debugger.enable':
                this.handleDebuggerEnable(data.id);
                break;
            case 'Debugger.getScriptSource':
                if (data.params) {
                    const params = data.params;
                    this.handleDebuggerGetScriptSource(data.id, params.scriptId);
                }
                break;
            default:
                this.sendMessageToFrontend({
                    id: data.id,
                    result: {},
                });
                break;
        }
    }
    sessionAttachToTarget() {
        this.sendMessageToFrontend({
            method: 'Target.attachedToTarget',
            params: {
                sessionId: this.sessionId,
                waitingForDebugger: false,
                targetInfo: {
                    targetId: this.target.targetId,
                    type: this.target.type,
                    title: this.target.url,
                    url: this.target.url,
                    attached: true,
                    canAccessOpener: false,
                },
            },
        }, 
        /* attachSessionId */ false);
    }
    // Runtime.Enable indicates that Runtime domain is flushing the event to communicate
    // the current state with the backend. In rehydrating connection, we made up the artificial
    // execution context to support the rehydrated session.
    handleRuntimeEnabled(id) {
        for (const executionContext of this.executionContexts) {
            executionContext.name = executionContext.origin;
            this.sendMessageToFrontend({
                method: 'Runtime.executionContextCreated',
                params: {
                    context: executionContext,
                },
            });
        }
        this.sendMessageToFrontend({
            id,
            result: {},
        });
    }
    handleDebuggerGetScriptSource(id, scriptId) {
        const script = this.scripts.find(script => script.scriptId === scriptId);
        if (!script) {
            console.error('No script for id: ' + scriptId);
            return;
        }
        this.sendMessageToFrontend({
            id,
            result: {
                scriptSource: typeof script.sourceText === 'undefined' ? i18nString(UIStrings.noSourceText) : script.sourceText,
            },
        });
    }
    // Debugger.Enable indicates that Debugger domain is flushing the event to communicate
    // the current state with the backend. In rehydrating connection, we made up the artificial
    // script parsed event to communicate the current script state and respond with a mock
    // debugger id.
    handleDebuggerEnable(id) {
        for (const script of this.scripts) {
            this.sendMessageToFrontend({
                method: 'Debugger.scriptParsed',
                params: script,
            });
        }
        const mockDebuggerId = '7777777777777777777.8888888888888888888';
        this.sendMessageToFrontend({
            id,
            result: {
                debuggerId: mockDebuggerId,
            },
        });
    }
}
//# sourceMappingURL=RehydratingConnection.js.map