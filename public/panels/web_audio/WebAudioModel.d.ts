import * as SDK from '../../core/sdk/sdk.js';
import type * as ProtocolProxyApi from '../../generated/protocol-proxy-api.js';
import type * as Protocol from '../../generated/protocol.js';
export declare class WebAudioModel extends SDK.SDKModel.SDKModel<EventTypes> implements ProtocolProxyApi.WebAudioDispatcher {
    private enabled;
    private readonly agent;
    constructor(target: SDK.Target.Target);
    private flushContexts;
    suspendModel(): Promise<void>;
    resumeModel(): Promise<void>;
    ensureEnabled(): void;
    contextCreated({ context }: Protocol.WebAudio.ContextCreatedEvent): void;
    contextWillBeDestroyed({ contextId }: Protocol.WebAudio.ContextWillBeDestroyedEvent): void;
    contextChanged({ context }: Protocol.WebAudio.ContextChangedEvent): void;
    audioListenerCreated({ listener }: Protocol.WebAudio.AudioListenerCreatedEvent): void;
    audioListenerWillBeDestroyed({ listenerId, contextId }: Protocol.WebAudio.AudioListenerWillBeDestroyedEvent): void;
    audioNodeCreated({ node }: Protocol.WebAudio.AudioNodeCreatedEvent): void;
    audioNodeWillBeDestroyed({ contextId, nodeId }: Protocol.WebAudio.AudioNodeWillBeDestroyedEvent): void;
    audioParamCreated({ param }: Protocol.WebAudio.AudioParamCreatedEvent): void;
    audioParamWillBeDestroyed({ contextId, nodeId, paramId }: Protocol.WebAudio.AudioParamWillBeDestroyedEvent): void;
    nodesConnected({ contextId, sourceId, destinationId, sourceOutputIndex, destinationInputIndex }: Protocol.WebAudio.NodesConnectedEvent): void;
    nodesDisconnected({ contextId, sourceId, destinationId, sourceOutputIndex, destinationInputIndex }: Protocol.WebAudio.NodesDisconnectedEvent): void;
    nodeParamConnected({ contextId, sourceId, destinationId, sourceOutputIndex }: Protocol.WebAudio.NodeParamConnectedEvent): void;
    nodeParamDisconnected({ contextId, sourceId, destinationId, sourceOutputIndex }: Protocol.WebAudio.NodeParamDisconnectedEvent): void;
    requestRealtimeData(contextId: Protocol.WebAudio.GraphObjectId): Promise<Protocol.WebAudio.ContextRealtimeData | null>;
}
export declare const enum Events {
    CONTEXT_CREATED = "ContextCreated",
    CONTEXT_DESTROYED = "ContextDestroyed",
    CONTEXT_CHANGED = "ContextChanged",
    MODEL_RESET = "ModelReset",
    MODEL_SUSPEND = "ModelSuspend",
    AUDIO_LISTENER_CREATED = "AudioListenerCreated",
    AUDIO_LISTENER_WILL_BE_DESTROYED = "AudioListenerWillBeDestroyed",
    AUDIO_NODE_CREATED = "AudioNodeCreated",
    AUDIO_NODE_WILL_BE_DESTROYED = "AudioNodeWillBeDestroyed",
    AUDIO_PARAM_CREATED = "AudioParamCreated",
    AUDIO_PARAM_WILL_BE_DESTROYED = "AudioParamWillBeDestroyed",
    NODES_CONNECTED = "NodesConnected",
    NODES_DISCONNECTED = "NodesDisconnected",
    NODE_PARAM_CONNECTED = "NodeParamConnected",
    NODE_PARAM_DISCONNECTED = "NodeParamDisconnected"
}
export type EventTypes = {
    [Events.CONTEXT_CREATED]: Protocol.WebAudio.BaseAudioContext;
    [Events.CONTEXT_DESTROYED]: Protocol.WebAudio.GraphObjectId;
    [Events.CONTEXT_CHANGED]: Protocol.WebAudio.BaseAudioContext;
    [Events.MODEL_RESET]: void;
    [Events.MODEL_SUSPEND]: void;
    [Events.AUDIO_LISTENER_CREATED]: Protocol.WebAudio.AudioListener;
    [Events.AUDIO_LISTENER_WILL_BE_DESTROYED]: Protocol.WebAudio.AudioListenerWillBeDestroyedEvent;
    [Events.AUDIO_NODE_CREATED]: Protocol.WebAudio.AudioNode;
    [Events.AUDIO_NODE_WILL_BE_DESTROYED]: Protocol.WebAudio.AudioNodeWillBeDestroyedEvent;
    [Events.AUDIO_PARAM_CREATED]: Protocol.WebAudio.AudioParam;
    [Events.AUDIO_PARAM_WILL_BE_DESTROYED]: Protocol.WebAudio.AudioParamWillBeDestroyedEvent;
    [Events.NODES_CONNECTED]: Protocol.WebAudio.NodesConnectedEvent;
    [Events.NODES_DISCONNECTED]: Protocol.WebAudio.NodesDisconnectedEvent;
    [Events.NODE_PARAM_CONNECTED]: Protocol.WebAudio.NodeParamConnectedEvent;
    [Events.NODE_PARAM_DISCONNECTED]: Protocol.WebAudio.NodeParamDisconnectedEvent;
};
