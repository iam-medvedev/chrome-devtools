/*
 * Copyright (C) 2012 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
const uiSourceCodeToAttributionMap = new WeakMap();
const projectToTargetMap = new WeakMap();
let networkProjectManagerInstance;
export class NetworkProjectManager extends Common.ObjectWrapper.ObjectWrapper {
    constructor() {
        super();
    }
    static instance({ forceNew } = { forceNew: false }) {
        if (!networkProjectManagerInstance || forceNew) {
            networkProjectManagerInstance = new NetworkProjectManager();
        }
        return networkProjectManagerInstance;
    }
}
export class NetworkProject {
    static resolveFrame(uiSourceCode, frameId) {
        const target = NetworkProject.targetForUISourceCode(uiSourceCode);
        const resourceTreeModel = target?.model(SDK.ResourceTreeModel.ResourceTreeModel);
        return resourceTreeModel ? resourceTreeModel.frameForId(frameId) : null;
    }
    static setInitialFrameAttribution(uiSourceCode, frameId) {
        if (!frameId) {
            return;
        }
        const frame = NetworkProject.resolveFrame(uiSourceCode, frameId);
        if (!frame) {
            return;
        }
        const attribution = new Map();
        attribution.set(frameId, { frame, count: 1 });
        uiSourceCodeToAttributionMap.set(uiSourceCode, attribution);
    }
    static cloneInitialFrameAttribution(fromUISourceCode, toUISourceCode) {
        const fromAttribution = uiSourceCodeToAttributionMap.get(fromUISourceCode);
        if (!fromAttribution) {
            return;
        }
        const toAttribution = new Map();
        for (const frameId of fromAttribution.keys()) {
            const value = fromAttribution.get(frameId);
            if (typeof value !== 'undefined') {
                toAttribution.set(frameId, { frame: value.frame, count: value.count });
            }
        }
        uiSourceCodeToAttributionMap.set(toUISourceCode, toAttribution);
    }
    static addFrameAttribution(uiSourceCode, frameId) {
        const frame = NetworkProject.resolveFrame(uiSourceCode, frameId);
        if (!frame) {
            return;
        }
        const frameAttribution = uiSourceCodeToAttributionMap.get(uiSourceCode);
        if (!frameAttribution) {
            return;
        }
        const attributionInfo = frameAttribution.get(frameId) || { frame, count: 0 };
        attributionInfo.count += 1;
        frameAttribution.set(frameId, attributionInfo);
        if (attributionInfo.count !== 1) {
            return;
        }
        const data = { uiSourceCode, frame };
        NetworkProjectManager.instance().dispatchEventToListeners("FrameAttributionAdded" /* Events.FRAME_ATTRIBUTION_ADDED */, data);
    }
    static removeFrameAttribution(uiSourceCode, frameId) {
        const frameAttribution = uiSourceCodeToAttributionMap.get(uiSourceCode);
        if (!frameAttribution) {
            return;
        }
        const attributionInfo = frameAttribution.get(frameId);
        console.assert(Boolean(attributionInfo), 'Failed to remove frame attribution for url: ' + uiSourceCode.url());
        if (!attributionInfo) {
            return;
        }
        attributionInfo.count -= 1;
        if (attributionInfo.count > 0) {
            return;
        }
        frameAttribution.delete(frameId);
        const data = { uiSourceCode, frame: attributionInfo.frame };
        NetworkProjectManager.instance().dispatchEventToListeners("FrameAttributionRemoved" /* Events.FRAME_ATTRIBUTION_REMOVED */, data);
    }
    static targetForUISourceCode(uiSourceCode) {
        return projectToTargetMap.get(uiSourceCode.project()) || null;
    }
    static setTargetForProject(project, target) {
        projectToTargetMap.set(project, target);
    }
    static getTargetForProject(project) {
        return projectToTargetMap.get(project) || null;
    }
    static framesForUISourceCode(uiSourceCode) {
        const target = NetworkProject.targetForUISourceCode(uiSourceCode);
        const resourceTreeModel = target?.model(SDK.ResourceTreeModel.ResourceTreeModel);
        const attribution = uiSourceCodeToAttributionMap.get(uiSourceCode);
        if (!resourceTreeModel || !attribution) {
            return [];
        }
        const frames = Array.from(attribution.keys()).map(frameId => resourceTreeModel.frameForId(frameId));
        return frames.filter(frame => !!frame);
    }
}
//# sourceMappingURL=NetworkProject.js.map