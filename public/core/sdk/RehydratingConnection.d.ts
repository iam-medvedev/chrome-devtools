import type * as ProtocolClient from '../protocol_client/protocol_client.js';
import type { ProtocolMessage, RehydratingExecutionContext, RehydratingScript, RehydratingTarget, ServerMessage } from './RehydratingObject.js';
export interface RehydratingConnectionInterface {
    postToFrontend: (arg: ServerMessage) => void;
}
export declare const enum RehydratingConnectionState {
    UNINITIALIZED = 1,
    INITIALIZED = 2,
    REHYDRATED = 3
}
export declare class RehydratingConnection implements ProtocolClient.InspectorBackend.Connection {
    #private;
    rehydratingConnectionState: RehydratingConnectionState;
    onDisconnect: ((arg0: string) => void) | null;
    onMessage: ((arg0: Object) => void) | null;
    traceEvents: unknown[];
    sessions: Map<number, RehydratingSessionBase>;
    constructor();
    startHydration(logPayload: string): Promise<boolean>;
    setOnMessage(onMessage: (arg0: (Object | string)) => void): void;
    setOnDisconnect(onDisconnect: (arg0: string) => void): void;
    sendRawMessage(message: string | object): void;
    postToFrontend(arg: ServerMessage): void;
    disconnect(): Promise<void>;
}
declare class RehydratingSessionBase {
    connection: RehydratingConnectionInterface | null;
    constructor(connection: RehydratingConnectionInterface);
    sendMessageToFrontend(payload: ServerMessage): void;
    handleFrontendMessageAsFakeCDPAgent(data: ProtocolMessage): void;
}
export declare class RehydratingSession extends RehydratingSessionBase {
    sessionId: number;
    target: RehydratingTarget;
    executionContexts: RehydratingExecutionContext[];
    scripts: RehydratingScript[];
    constructor(sessionId: number, target: RehydratingTarget, executionContexts: RehydratingExecutionContext[], scripts: RehydratingScript[], connection: RehydratingConnectionInterface);
    sendMessageToFrontend(payload: ServerMessage, attachSessionId?: boolean): void;
    handleFrontendMessageAsFakeCDPAgent(data: ProtocolMessage): void;
    private sessionAttachToTarget;
    private handleRuntimeEnabled;
    private handleDebuggerGetScriptSource;
    private handleDebuggerEnable;
}
export {};
