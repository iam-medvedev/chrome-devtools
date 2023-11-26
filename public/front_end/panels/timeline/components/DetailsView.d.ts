import * as TraceEngine from '../../../models/trace/trace.js';
export declare function buildWarningElementsForEvent(event: TraceEngine.Types.TraceEvents.TraceEventData, traceParsedData: TraceEngine.Handlers.Types.TraceParseData): HTMLSpanElement[];
export interface DetailRow {
    key: string;
    value: string;
}
export declare function buildRowsForWebSocketEvent(event: TraceEngine.Types.TraceEvents.TraceEventWebSocketCreate | TraceEngine.Types.TraceEvents.TraceEventWebSocketDestroy | TraceEngine.Types.TraceEvents.TraceEventWebSocketSendHandshakeRequest | TraceEngine.Types.TraceEvents.TraceEventWebSocketReceiveHandshakeResponse, traceParsedData: TraceEngine.Handlers.Types.TraceParseData): readonly DetailRow[];
