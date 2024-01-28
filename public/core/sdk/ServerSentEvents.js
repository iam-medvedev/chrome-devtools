// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { ContentData } from './ContentData.js';
import { NetworkManager } from './NetworkManager.js';
import { Events } from './NetworkRequest.js';
import { ServerSentEventsParser } from './ServerSentEventsProtocol.js';
/**
 * Server sent events only arrive via CDP (Explicit Network.eventSourceMessageReceived) when
 * the page uses "EventSource" in the code.
 *
 * If the page manually uses 'fetch' or XHR we have to do the protocol parsing
 * ourselves.
 *
 * `ServerSentEvents` is a small helper class that manages this distinction for a specific
 * request, stores the event data and sends out "EventSourceMessageAdded" events for a request.
 */
export class ServerSentEvents {
    #request;
    #parser;
    // In the case where we parse the events ourselves we use the time of the last 'dataReceived'
    // event for all the events that come out of the corresponding chunk of data.
    #lastDataReceivedTime = 0;
    #eventSourceMessages = [];
    constructor(request, parseFromStreamedData) {
        this.#request = request;
        // Only setup parsing if we don't get the events over CDP directly.
        if (parseFromStreamedData) {
            this.#lastDataReceivedTime = request.pseudoWallTime(request.startTime);
            this.#parser = new ServerSentEventsParser(this.#onParserEvent.bind(this), request.charset() ?? undefined);
            void NetworkManager.streamResponseBody(this.#request).then(contentData => {
                if (!ContentData.isError(contentData)) {
                    // Partial data is always base64 encoded.
                    void this.#parser?.addBase64Chunk(contentData.base64);
                }
            });
        }
    }
    get eventSourceMessages() {
        return this.#eventSourceMessages;
    }
    /** Forwarded Network.dataReceived events */
    dataReceived(data, time) {
        this.#lastDataReceivedTime = this.#request.pseudoWallTime(time);
        void this.#parser?.addBase64Chunk(data);
    }
    /** Forwarded Network.eventSourceMessage received */
    onProtocolEventSourceMessageReceived(eventName, data, eventId, time) {
        this.#recordMessageAndDispatchEvent({
            eventName,
            eventId,
            data,
            time,
        });
    }
    #onParserEvent(eventName, data, eventId) {
        this.#recordMessageAndDispatchEvent({
            eventName,
            eventId,
            data,
            time: this.#lastDataReceivedTime,
        });
    }
    #recordMessageAndDispatchEvent(message) {
        this.#eventSourceMessages.push(message);
        this.#request.dispatchEventToListeners(Events.EventSourceMessageAdded, message);
    }
}
//# sourceMappingURL=ServerSentEvents.js.map