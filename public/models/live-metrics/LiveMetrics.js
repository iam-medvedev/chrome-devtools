// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Spec from './web-vitals-injected/spec/spec.js';
const LIVE_METRICS_WORLD_NAME = 'live_metrics_world';
class InjectedScript {
    static #injectedScript;
    static async get() {
        if (!this.#injectedScript) {
            const url = new URL('./web-vitals-injected/web-vitals-injected.generated.js', import.meta.url);
            const result = await fetch(url);
            this.#injectedScript = await result.text();
        }
        return this.#injectedScript;
    }
}
export class LiveMetrics extends Common.ObjectWrapper.ObjectWrapper {
    #target;
    #scriptIdentifier;
    constructor() {
        super();
        SDK.TargetManager.TargetManager.instance().observeTargets(this);
    }
    /**
     * DOM nodes can't be sent over a runtime binding, so we have to retrieve
     * them separately.
     */
    async #resolveDomNode(index, executionContextId) {
        if (!this.#target) {
            return null;
        }
        const runtimeModel = this.#target.model(SDK.RuntimeModel.RuntimeModel);
        if (!runtimeModel) {
            return null;
        }
        const domModel = this.#target.model(SDK.DOMModel.DOMModel);
        if (!domModel) {
            return null;
        }
        const { result } = await this.#target.runtimeAgent().invoke_evaluate({
            expression: `window.getNodeForIndex(${index})`,
            contextId: executionContextId,
        });
        if (!result) {
            return null;
        }
        const remoteObject = runtimeModel.createRemoteObject(result);
        return domModel.pushObjectAsNodeToFrontend(remoteObject);
    }
    async #onBindingCalled(event) {
        const { data } = event;
        if (data.name !== Spec.EVENT_BINDING_NAME) {
            return;
        }
        const webVitalsEvent = JSON.parse(data.payload);
        switch (webVitalsEvent.name) {
            case 'LCP': {
                const lcpEvent = {
                    value: webVitalsEvent.value,
                    rating: webVitalsEvent.rating,
                };
                if (webVitalsEvent.nodeIndex !== undefined) {
                    const node = await this.#resolveDomNode(webVitalsEvent.nodeIndex, data.executionContextId);
                    if (node) {
                        lcpEvent.node = node;
                    }
                }
                this.dispatchEventToListeners("lcp_changed" /* Events.LCPChanged */, lcpEvent);
                break;
            }
            case 'CLS': {
                this.dispatchEventToListeners("cls_changed" /* Events.CLSChanged */, {
                    value: webVitalsEvent.value,
                    rating: webVitalsEvent.rating,
                });
                break;
            }
            case 'INP': {
                const inpEvent = {
                    value: webVitalsEvent.value,
                    rating: webVitalsEvent.rating,
                    interactionType: webVitalsEvent.interactionType,
                };
                if (webVitalsEvent.nodeIndex !== undefined) {
                    const node = await this.#resolveDomNode(webVitalsEvent.nodeIndex, data.executionContextId);
                    if (node) {
                        inpEvent.node = node;
                    }
                }
                this.dispatchEventToListeners("inp_changed" /* Events.INPChanged */, inpEvent);
                break;
            }
            case 'reset': {
                this.dispatchEventToListeners("reset" /* Events.Reset */);
                break;
            }
        }
    }
    targetAdded(target) {
        if (target !== SDK.TargetManager.TargetManager.instance().primaryPageTarget()) {
            return;
        }
        void this.enable(target);
    }
    targetRemoved(target) {
        if (target !== SDK.TargetManager.TargetManager.instance().primaryPageTarget()) {
            return;
        }
        void this.disable();
    }
    async enable(target) {
        if (this.#target) {
            return;
        }
        const runtimeModel = target.model(SDK.RuntimeModel.RuntimeModel);
        if (!runtimeModel) {
            return;
        }
        runtimeModel.addEventListener(SDK.RuntimeModel.Events.BindingCalled, this.#onBindingCalled, this);
        await runtimeModel.addBinding({
            name: Spec.EVENT_BINDING_NAME,
            executionContextName: LIVE_METRICS_WORLD_NAME,
        });
        const source = await InjectedScript.get();
        const { identifier } = await target.pageAgent().invoke_addScriptToEvaluateOnNewDocument({
            source,
            worldName: LIVE_METRICS_WORLD_NAME,
            runImmediately: true,
        });
        this.#scriptIdentifier = identifier;
        this.#target = target;
    }
    async disable() {
        if (!this.#target) {
            return;
        }
        const runtimeModel = this.#target.model(SDK.RuntimeModel.RuntimeModel);
        if (!runtimeModel) {
            return;
        }
        if (this.#scriptIdentifier) {
            await this.#target.pageAgent().invoke_removeScriptToEvaluateOnNewDocument({
                identifier: this.#scriptIdentifier,
            });
        }
        await runtimeModel.removeBinding({
            name: Spec.EVENT_BINDING_NAME,
        });
        runtimeModel.removeEventListener(SDK.RuntimeModel.Events.BindingCalled, this.#onBindingCalled, this);
        this.#target = undefined;
    }
}
//# sourceMappingURL=LiveMetrics.js.map