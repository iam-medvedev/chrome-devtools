// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import sinon from 'sinon';
import * as SDK from '../../../core/sdk/sdk.js';
import * as Models from '../models/models.js';
export class TestExtension {
    #name;
    #origin;
    #mediaType;
    #sourceMapSuffix;
    constructor(name, origin = 'chrome-extension://ext-a', mediaType = 'text/javascript', sourceMapSuffix = '') {
        this.#name = name;
        this.#origin = origin;
        this.#mediaType = mediaType;
        this.#sourceMapSuffix = sourceMapSuffix;
    }
    getName() {
        return this.#name;
    }
    getOrigin() {
        return this.#origin;
    }
    getMediaType() {
        return this.#mediaType;
    }
    stringify(recording) {
        return Promise.resolve(`${this.#name}:${JSON.stringify(recording)}${this.#sourceMapSuffix}`);
    }
    stringifyStep(step) {
        return Promise.resolve(`${this.#name}:${JSON.stringify(step)}`);
    }
    getCapabilities() {
        return ['export'];
    }
    replay(_recording) {
    }
}
export const createCustomStep = () => ({
    type: Models.Schema.StepType.CustomStep,
    name: 'dummy step',
    parameters: {},
});
export const installMocksForRecordingPlayer = () => {
    const listeners = new Map();
    const on = sinon.stub().callsFake((event, listener) => {
        listeners.set(event, (listeners.get(event) ?? new Set()).add(listener));
    });
    const off = sinon.stub().callsFake((event, listener) => {
        listeners.get(event)?.delete(listener);
    });
    const emit = (event, data) => {
        for (const listener of [...(listeners.get(event) ?? [])]) {
            listener(data);
        }
    };
    const tabSessionListeners = new Set();
    const tabChildTargets = [];
    const tabSession = {
        target: () => ({ _childTargets: () => tabChildTargets }),
        on: (_event, listener) => tabSessionListeners.add(listener),
        off: (_event, listener) => tabSessionListeners.delete(listener),
    };
    const client = { send: sinon.stub().resolves(), on, off, detached: false, parentSession: () => tabSession };
    const mainFrame = { _id: 'main-frame', client, url: () => '', goto: sinon.stub().resolves() };
    const frames = [mainFrame];
    const page = {
        _client: () => client,
        on,
        off,
        frames: () => frames,
        mainFrame: () => mainFrame,
        evaluate: () => '',
        url() {
            return '';
        },
        bringToFront() {
            return Promise.resolve();
        },
        setDefaultTimeout() { },
        goto: sinon.stub().resolves(),
    };
    const pages = [page];
    const targets = [];
    const browserListeners = new Map();
    const waitForTarget = sinon.stub().callsFake(async (predicate, options) => {
        const match = targets.find(predicate);
        if (match) {
            return match;
        }
        const signal = options?.signal;
        if (!signal) {
            throw new Error('Mock target not found');
        }
        // Wait for the target until the caller stops the wait.
        return await new Promise((_resolve, reject) => {
            signal.addEventListener('abort', () => reject(new Error('The wait for the mock target was aborted')));
        });
    });
    const blockPageInput = sinon.stub();
    const mock = {
        page,
        connection: { blockPageInput },
        browser: {
            pages: () => Promise.resolve(pages),
            waitForTarget,
            on: (event, listener) => {
                browserListeners.set(event, (browserListeners.get(event) ?? new Set()).add(listener));
            },
            off: (event, listener) => {
                browserListeners.get(event)?.delete(listener);
            },
            disconnect: () => sinon.stub().resolves(),
        },
    };
    sinon.stub(Models.RecordingPlayer.RecordingPlayer, 'connectPuppeteer').resolves(mock);
    return {
        send: client.send,
        blockPageInput,
        tabSession,
        tabChildTargets,
        mainFrame,
        frames,
        pages,
        targets,
        waitForTarget,
        emitTargetCreated: target => {
            for (const listener of [...(browserListeners.get('targetcreated') ?? [])]) {
                listener(target);
            }
        },
        emitRequestPaused: event => emit('Fetch.requestPaused', event),
        emitFrameNavigated: frame => emit('framenavigated', frame),
        emitSessionAttached: session => emit('sessionattached', session),
        emitPrerenderSessionAttached: session => {
            for (const listener of [...tabSessionListeners]) {
                listener(session);
            }
        },
    };
};
export const installMocksForTargetManager = () => {
    const stub = {
        suspendAllTargets: sinon.stub().resolves(),
        resumeAllTargets: sinon.stub().resolves(),
        primaryPageTarget: sinon.stub().returns({
            targetAgent: sinon.stub().returns({}),
        }),
    };
    sinon.stub(SDK.TargetManager.TargetManager, 'instance')
        .callsFake(() => stub);
};
//# sourceMappingURL=RecorderHelpers.js.map