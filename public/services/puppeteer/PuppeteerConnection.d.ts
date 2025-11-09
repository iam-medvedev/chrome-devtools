import type * as ProtocolClient from '../../core/protocol_client/protocol_client.js';
import type * as Protocol from '../../generated/protocol.js';
import * as puppeteer from '../../third_party/puppeteer/puppeteer.js';
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
