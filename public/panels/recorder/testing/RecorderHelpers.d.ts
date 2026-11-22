import sinon from 'sinon';
import type * as Extensions from '../extensions/extensions.js';
import * as Models from '../models/models.js';
export declare class TestExtension implements Extensions.ExtensionManager.Extension {
    #private;
    constructor(name: string, origin?: string, mediaType?: string | undefined, sourceMapSuffix?: string);
    getName(): string;
    getOrigin(): string;
    getMediaType(): string | undefined;
    stringify(recording: Object): Promise<string>;
    stringifyStep(step: Object): Promise<string>;
    getCapabilities(): Array<'replay' | 'export'>;
    replay(_recording: Object): void;
}
export interface ClientMock {
    send(): sinon.SinonStub;
}
export declare const createCustomStep: () => Models.Schema.Step;
export interface MockFrame {
    _id: string;
    client: {
        send: sinon.SinonStub;
        on: sinon.SinonStub;
        off: sinon.SinonStub;
        detached?: boolean;
        parentSession?: () => unknown;
    };
    url: () => string;
    goto?: sinon.SinonStub;
}
export interface MockPage {
    _client: () => MockFrame['client'];
    on: sinon.SinonStub;
    off: sinon.SinonStub;
    frames: () => MockFrame[];
    mainFrame: () => MockFrame;
    evaluate: () => string;
    url: () => string;
    bringToFront: () => Promise<void>;
    setDefaultTimeout: () => void;
    close?: sinon.SinonStub;
    isClosed?: () => boolean;
    goto?: sinon.SinonStub;
}
export interface MockTarget {
    url: () => string;
    page: () => Promise<MockPage | null>;
}
export interface RecordingPlayerMocks {
    /** The `send` method of the CDP session of the mock page. */
    send: sinon.SinonStub;
    /** The `blockPageInput` method of the mock Puppeteer connection. */
    blockPageInput: sinon.SinonStub;
    /** The tab session, which is the parent of the CDP session of the mock page. */
    tabSession: unknown;
    /** The child targets of the tab target, for example prerender targets. */
    tabChildTargets: unknown[];
    mainFrame: MockFrame;
    frames: MockFrame[];
    pages: MockPage[];
    targets: MockTarget[];
    /** The `waitForTarget` method of the mock browser. */
    waitForTarget: sinon.SinonStub;
    /** Sends a `targetcreated` event to the listeners of the mock browser. */
    emitTargetCreated(target: MockTarget): void;
    /** Sends a `Fetch.requestPaused` event to the listeners of the CDP session. */
    emitRequestPaused(event: {
        requestId: string;
        frameId: string;
        request: {
            url: string;
        };
        responseStatusCode?: number;
        responseHeaders?: Array<{
            name: string;
            value: string;
        }>;
    }): void;
    /** Sends a `framenavigated` event to the listeners of the mock page. */
    emitFrameNavigated(frame: unknown): void;
    /** Sends a `sessionattached` event to the listeners of the CDP session. */
    emitSessionAttached(session: unknown): void;
    /** Sends a `sessionattached` event to the listeners of the tab session, as for a prerendered page. */
    emitPrerenderSessionAttached(session: unknown): void;
}
export declare const installMocksForRecordingPlayer: () => RecordingPlayerMocks;
export declare const installMocksForTargetManager: () => void;
