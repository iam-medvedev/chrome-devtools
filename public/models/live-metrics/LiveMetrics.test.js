// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import * as SDK from '../../core/sdk/sdk.js';
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import * as LiveMetrics from './live-metrics.js';
import * as Spec from './web-vitals-injected/spec/spec.js';
describeWithMockConnection('LiveMetrics', () => {
    let liveMetrics;
    let primaryTarget;
    let tabTarget;
    beforeEach(() => {
        tabTarget = createTarget({ type: SDK.Target.Type.TAB });
        primaryTarget = createTarget({
            parentTarget: tabTarget,
            type: SDK.Target.Type.FRAME,
        });
        liveMetrics = LiveMetrics.LiveMetrics.instance({ forceNew: true });
    });
    describe('prerender navigation', () => {
        it('handles target removal gracefully', async () => {
            await liveMetrics.targetRemoved(primaryTarget);
            assert.strictEqual(liveMetrics.interactions.size, 0);
            assert.lengthOf(liveMetrics.layoutShifts, 0);
        });
        it('re-enables on a new target after target removal', async () => {
            await liveMetrics.targetRemoved(primaryTarget);
            const newPrimaryTarget = createTarget({
                parentTarget: tabTarget,
                type: SDK.Target.Type.FRAME,
            });
            await liveMetrics.targetAdded(newPrimaryTarget);
            assert.isUndefined(liveMetrics.lcpValue);
            assert.isUndefined(liveMetrics.clsValue);
            assert.isUndefined(liveMetrics.inpValue);
        });
        it('handles rapid target swap during prerender activation', async () => {
            const removePromise = liveMetrics.targetRemoved(primaryTarget);
            const prerenderTarget = createTarget({
                parentTarget: tabTarget,
                type: SDK.Target.Type.FRAME,
            });
            await removePromise;
            await liveMetrics.targetAdded(prerenderTarget);
            assert.strictEqual(liveMetrics.interactions.size, 0);
            assert.lengthOf(liveMetrics.layoutShifts, 0);
        });
    });
    describe('binding events', () => {
        let runtimeModel;
        let primaryExecutionContextId;
        let childFrameExecutionContextId;
        beforeEach(async () => {
            await liveMetrics.targetAdded(primaryTarget);
            const runtimeModelFromTarget = primaryTarget.model(SDK.RuntimeModel.RuntimeModel);
            assert.exists(runtimeModelFromTarget);
            runtimeModel = runtimeModelFromTarget;
            const resourceTreeModel = primaryTarget.model(SDK.ResourceTreeModel.ResourceTreeModel);
            assert.exists(resourceTreeModel?.mainFrame);
            primaryExecutionContextId = 1;
            childFrameExecutionContextId = 2;
            runtimeModel.executionContextCreated({
                id: primaryExecutionContextId,
                uniqueId: 'primary-context',
                origin: 'https://example.com',
                name: 'DevTools Performance Metrics',
                auxData: {
                    isDefault: false,
                    frameId: resourceTreeModel.mainFrame.id,
                },
            });
            runtimeModel.executionContextCreated({
                id: childFrameExecutionContextId,
                uniqueId: 'child-context',
                origin: 'https://example.com',
                name: 'DevTools Performance Metrics',
                auxData: {
                    isDefault: false,
                    frameId: 'child-frame-id',
                },
            });
        });
        const lcpEvent = (value) => ({
            name: 'LCP',
            value: value,
            phases: {
                timeToFirstByte: 0,
                resourceLoadDelay: 0,
                resourceLoadTime: 0,
                elementRenderDelay: 0,
            },
            startedHidden: false,
        });
        const emitBindingCalled = async (executionContextId, payload) => {
            runtimeModel.bindingCalled({
                name: Spec.EVENT_BINDING_NAME,
                payload: JSON.stringify(payload),
                executionContextId,
            });
            await Promise.resolve();
            await Promise.resolve();
        };
        it('ignores non-primary frame events', async () => {
            await emitBindingCalled(primaryExecutionContextId, { name: 'reset' });
            await emitBindingCalled(primaryExecutionContextId, lcpEvent(111));
            assert.strictEqual(liveMetrics.lcpValue?.value, 111);
            await emitBindingCalled(childFrameExecutionContextId, { name: 'reset' });
            await emitBindingCalled(childFrameExecutionContextId, lcpEvent(999));
            assert.strictEqual(liveMetrics.lcpValue?.value, 111);
        });
    });
    describe('status updates', () => {
        it('dispatches status events', () => {
            let statusReceived = false;
            liveMetrics.addEventListener("status" /* LiveMetrics.Events.STATUS */, () => {
                statusReceived = true;
            });
            liveMetrics.setStatusForTesting({
                interactions: new Map(),
                layoutShifts: [],
            });
            assert.isTrue(statusReceived);
        });
        it('clears interactions via clearInteractions', () => {
            const interactionId = 'interaction-1-1';
            const interaction = {
                interactionId,
                interactionType: 'pointer',
                eventNames: ['click'],
                duration: 100,
                startTime: 0,
                nextPaintTime: 100,
                phases: { inputDelay: 10, processingDuration: 80, presentationDelay: 10 },
                longAnimationFrameTimings: [],
            };
            liveMetrics.setStatusForTesting({
                interactions: new Map([[interactionId, interaction]]),
                layoutShifts: [],
            });
            assert.strictEqual(liveMetrics.interactions.size, 1);
            liveMetrics.clearInteractions();
            assert.strictEqual(liveMetrics.interactions.size, 0);
        });
        it('clears layout shifts via clearLayoutShifts', () => {
            liveMetrics.setStatusForTesting({
                interactions: new Map(),
                layoutShifts: [
                    { score: 0.1, uniqueLayoutShiftId: 'layout-shift-1-1', affectedNodeRefs: [] },
                ],
            });
            assert.lengthOf(liveMetrics.layoutShifts, 1);
            liveMetrics.clearLayoutShifts();
            assert.lengthOf(liveMetrics.layoutShifts, 0);
        });
    });
});
//# sourceMappingURL=LiveMetrics.test.js.map