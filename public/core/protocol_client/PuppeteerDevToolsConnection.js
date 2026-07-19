// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Hardcoded string literals corresponding to Puppeteer's CDPSessionEvent.SessionAttached ('sessionattached')
// and CDPSessionEvent.SessionDetached ('sessiondetached'). We redeclare these strings directly so we can use
// `import type * as Puppeteer` and avoid importing Puppeteer runtime JavaScript.
const SESSION_ATTACHED = 'sessionattached';
const SESSION_DETACHED = 'sessiondetached';
/**
 * This class makes a puppeteer connection look like DevTools CDPConnection.
 *
 * Since we connect "root" DevTools targets to specific pages, we scope everything to a puppeteer CDP session.
 *
 * We don't have to recursively listen for 'sessionattached' as the "root" CDP session sees all child session attached
 * events, regardless how deeply nested they are.
 */
export class PuppeteerDevToolsConnection {
    #connection;
    #observers = new Set();
    #sessionEventHandlers = new Map();
    constructor(session) {
        const connection = session.connection();
        if (!connection) {
            throw new Error('CDPSession has no connection');
        }
        this.#connection = connection;
        session.on(SESSION_ATTACHED, this.#startForwardingCdpEvents.bind(this));
        session.on(SESSION_DETACHED, this.#stopForwardingCdpEvents.bind(this));
        this.#startForwardingCdpEvents(session);
    }
    send(method, params, sessionId) {
        if (sessionId === undefined) {
            throw new Error('Attempting to send on the root session. This must not happen');
        }
        const session = this.#connection.session(sessionId);
        if (!session) {
            throw new Error('Unknown session ' + sessionId);
        }
        /* eslint-disable @typescript-eslint/no-explicit-any */
        return session.send(method, params).then(result => ({ result })).catch(error => ({
            error: {
                code: error.code ?? -32000,
                message: error.message ||
                    String(error),
            },
        }));
        /* eslint-enable @typescript-eslint/no-explicit-any */
    }
    observe(observer) {
        this.#observers.add(observer);
    }
    unobserve(observer) {
        this.#observers.delete(observer);
    }
    #startForwardingCdpEvents(session) {
        const handler = this.#handleEvent.bind(this, session.id());
        this.#sessionEventHandlers.set(session.id(), handler);
        session.on('*', handler);
    }
    #stopForwardingCdpEvents(session) {
        const handler = this.#sessionEventHandlers.get(session.id());
        if (handler) {
            session.off('*', handler);
            this.#sessionEventHandlers.delete(session.id());
        }
    }
    #handleEvent(sessionId, type, event) {
        if (typeof type === 'string' && type !== SESSION_ATTACHED && type !== SESSION_DETACHED) {
            this.#observers.forEach(observer => observer.onEvent({
                method: type,
                sessionId,
                params: event,
            }));
        }
    }
}
//# sourceMappingURL=PuppeteerDevToolsConnection.js.map