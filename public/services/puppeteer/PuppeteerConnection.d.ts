import type * as ProtocolClient from '../../core/protocol_client/protocol_client.js';
import type { ProtocolMapping } from '../../generated/protocol-mapping.js';
import type * as Protocol from '../../generated/protocol.js';
import * as puppeteer from '../../third_party/puppeteer/puppeteer.js';
/**
 * This class serves as a puppeteer.Connection while sending/receiving CDP messages
 * over DevTools' own SessionRouter.
 *
 * The only oddity is that we attached to a concrete target with a sessionId but make
 * it look to puppeteer like it's the default session (no session ID).
 *
 * Since we see all CDPEvents, we filter out the ones whose session we don't know about.
 */
export declare class PuppeteerConnectionAdapter extends puppeteer.Connection implements ProtocolClient.CDPConnection.CDPConnectionObserver {
    #private;
    constructor(connection: ProtocolClient.CDPConnection.CDPConnection, sessionId: Protocol.Target.SessionID);
    _rawSend(_callbacks: unknown, method: string | number | symbol, params: unknown, sessionId?: string, _options?: unknown): Promise<any>;
    onEvent<T extends keyof ProtocolMapping.Events>(event: ProtocolClient.CDPConnection.CDPEvent<T>): void;
    onDisconnect(): void;
    dispose(): void;
}
export declare class PuppeteerConnectionHelper {
    static connectPuppeteerToConnectionViaTab(options: {
        connection: ProtocolClient.CDPConnection.CDPConnection;
        targetId: Protocol.Target.TargetID;
        sessionId: Protocol.Target.SessionID;
        isPageTargetCallback: (targetInfo: Protocol.Target.TargetInfo) => boolean;
    }): Promise<{
        page: puppeteer.Page | null;
        browser: puppeteer.Browser;
        puppeteerConnection: puppeteer.Connection;
    }>;
}
