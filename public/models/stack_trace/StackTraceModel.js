// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import { AsyncFragmentImpl, FragmentImpl, FrameImpl, StackTraceImpl } from './StackTraceImpl.js';
import { Trie } from './Trie.js';
/**
 * The {@link StackTraceModel} is a thin wrapper around a fragment trie.
 *
 * We want to store stack trace fragments per target so a SDKModel is the natural choice.
 */
export class StackTraceModel extends SDK.SDKModel.SDKModel {
    #trie = new Trie();
    /** @returns the {@link StackTraceModel} for the target, or the model for the primaryPageTarget when passing null/undefined */
    static #modelForTarget(target) {
        const model = (target ?? SDK.TargetManager.TargetManager.instance().primaryPageTarget())?.model(StackTraceModel);
        if (!model) {
            throw new Error('Unable to find StackTraceModel');
        }
        return model;
    }
    async createFromProtocolRuntime(stackTrace, rawFramesToUIFrames) {
        const translatePromises = [];
        const fragment = this.#createFragment(stackTrace.callFrames);
        translatePromises.push(this.#translateFragment(fragment, rawFramesToUIFrames));
        const asyncFragments = [];
        const debuggerModel = this.target().model(SDK.DebuggerModel.DebuggerModel);
        if (debuggerModel) {
            for await (const { stackTrace: asyncStackTrace, target } of debuggerModel.iterateAsyncParents(stackTrace)) {
                const model = StackTraceModel.#modelForTarget(target);
                const asyncFragment = model.#createFragment(asyncStackTrace.callFrames);
                translatePromises.push(model.#translateFragment(asyncFragment, rawFramesToUIFrames));
                asyncFragments.push(new AsyncFragmentImpl(asyncStackTrace.description ?? '', asyncFragment));
            }
        }
        await Promise.all(translatePromises);
        return new StackTraceImpl(fragment, asyncFragments);
    }
    #createFragment(frames) {
        return FragmentImpl.getOrCreate(this.#trie.insert(frames));
    }
    async #translateFragment(fragment, rawFramesToUIFrames) {
        const rawFrames = fragment.node.getCallStack().map(node => node.rawFrame).toArray();
        const uiFrames = await rawFramesToUIFrames(rawFrames, this.target());
        console.assert(rawFrames.length === uiFrames.length, 'Broken rawFramesToUIFrames implementation');
        let i = 0;
        for (const node of fragment.node.getCallStack()) {
            node.frames = uiFrames[i++].map(frame => new FrameImpl(frame.url, frame.uiSourceCode, frame.name, frame.line, frame.column));
        }
    }
}
SDK.SDKModel.SDKModel.register(StackTraceModel, { capabilities: 0 /* SDK.Target.Capability.NONE */, autostart: false });
//# sourceMappingURL=StackTraceModel.js.map