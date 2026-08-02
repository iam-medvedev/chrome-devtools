// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import * as SDK from '../../core/sdk/sdk.js';
import { MockCDPConnection } from '../../testing/MockCDPConnection.js';
import { mockResourceTree } from '../../testing/ResourceTreeHelpers.js';
import { setupSettingsHooks } from '../../testing/SettingsHelpers.js';
import { TestUniverse } from '../../testing/TestUniverse.js';
import * as Spec from './web-vitals-injected/spec/spec.js';
describe('LiveMetrics', () => {
    setupSettingsHooks();
    let liveMetrics;
    let primaryTarget;
    let connection;
    beforeEach(async () => {
        const universe = new TestUniverse();
        connection = new MockCDPConnection([]);
        mockResourceTree(connection);
        const tabTarget = universe.createTarget({ type: SDK.Target.Type.TAB, connection });
        primaryTarget = universe.createTarget({
            parentTarget: tabTarget,
            type: SDK.Target.Type.FRAME,
        });
        liveMetrics = universe.liveMetrics;
        await liveMetrics.enable();
    });
    describe('prerender navigation', () => {
        it('resets metrics on prerender activation', async () => {
            liveMetrics.setStatusForTesting({
                lcp: {
                    value: 100,
                    subparts: {
                        timeToFirstByte: 0,
                        resourceLoadDelay: 0,
                        resourceLoadTime: 0,
                        elementRenderDelay: 0,
                    },
                },
                cls: { value: 0.1, clusterShiftIds: [] },
                inp: {
                    value: 50,
                    subparts: { inputDelay: 0, processingDuration: 0, presentationDelay: 0 },
                    interactionId: 'interaction-1-1',
                },
                interactions: new Map([['interaction-1-1', { interactionId: 'interaction-1-1' }]]),
                layoutShifts: [{ score: 0.1 }],
            });
            const resourceTreeModel = primaryTarget.model(SDK.ResourceTreeModel.ResourceTreeModel);
            assert.exists(resourceTreeModel?.mainFrame);
            resourceTreeModel.dispatchEventToListeners(SDK.ResourceTreeModel.Events.PrimaryPageChanged, {
                frame: resourceTreeModel.mainFrame,
                type: "Activation" /* SDK.ResourceTreeModel.PrimaryPageChangeType.ACTIVATION */,
            });
            assert.isUndefined(liveMetrics.lcpValue);
            assert.isUndefined(liveMetrics.clsValue);
            assert.isUndefined(liveMetrics.inpValue);
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
            subparts: {
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
        it('ignores reset events from default context (main world)', async () => {
            const resourceTreeModel = primaryTarget.model(SDK.ResourceTreeModel.ResourceTreeModel);
            assert.exists(resourceTreeModel?.mainFrame);
            // Create a default context with same frame ID
            const defaultExecutionContextId = 10;
            runtimeModel.executionContextCreated({
                id: defaultExecutionContextId,
                uniqueId: 'default-context',
                origin: 'https://example.com',
                name: '', // default context has empty name
                auxData: {
                    isDefault: true,
                    frameId: resourceTreeModel.mainFrame.id,
                },
            });
            // Track evaluate calls
            const evalExpressions = [];
            connection.setSuccessHandler('Runtime.evaluate', params => {
                evalExpressions.push(params.expression);
                return {
                    result: {
                        type: 'undefined',
                    },
                };
            });
            // Emit reset from default context
            await emitBindingCalled(defaultExecutionContextId, { name: 'reset' });
            // Try to emit LCP from that default context - should be ignored because reset was ignored
            await emitBindingCalled(defaultExecutionContextId, {
                name: 'LCP',
                value: 100,
                subparts: {
                    timeToFirstByte: 0,
                    resourceLoadDelay: 0,
                    resourceLoadTime: 0,
                    elementRenderDelay: 0,
                },
                startedHidden: false,
                nodeIndex: 1,
            });
            // Since the context was ignored, we should NOT have resolved node (which calls evaluate)
            assert.lengthOf(evalExpressions, 0);
            assert.isUndefined(liveMetrics.lcpValue);
        });
        it('prevents code injection via nodeIndex in LCP', async () => {
            // Emit reset from valid context to set lastResetContextId
            await emitBindingCalled(primaryExecutionContextId, { name: 'reset' });
            // Track evaluate calls
            const evalExpressions = [];
            connection.setSuccessHandler('Runtime.evaluate', params => {
                evalExpressions.push(params.expression);
                return {
                    result: {
                        type: 'undefined',
                    },
                };
            });
            // Emit LCP with malicious nodeIndex string (allowed because payload is unknown)
            await emitBindingCalled(primaryExecutionContextId, {
                name: 'LCP',
                value: 100,
                subparts: {
                    timeToFirstByte: 0,
                    resourceLoadDelay: 0,
                    resourceLoadTime: 0,
                    elementRenderDelay: 0,
                },
                startedHidden: false,
                nodeIndex: '0); alert(1); (0',
            });
            // The evaluate should not be called because it fails Number.isInteger validation
            assert.lengthOf(evalExpressions, 0);
        });
        it('prevents code injection in logInteractionScripts', async () => {
            // Emit reset from valid context to set lastResetContextId
            await emitBindingCalled(primaryExecutionContextId, { name: 'reset' });
            // Track evaluate calls
            const evalExpressions = [];
            connection.setSuccessHandler('Runtime.evaluate', params => {
                evalExpressions.push(params.expression);
                return {
                    result: {
                        type: 'undefined',
                    },
                };
            });
            const interaction = {
                interactionId: 'interaction-1-1',
                interactionType: 'pointer\'); alert(1); (//', // Malicious type
                eventNames: ['click'],
                duration: 100,
                startTime: 0,
                subparts: { inputDelay: 10, processingDuration: 80, presentationDelay: 10 },
                longAnimationFrameTimings: [],
            };
            const success = await liveMetrics.logInteractionScripts(interaction);
            assert.isTrue(success);
            assert.lengthOf(evalExpressions, 1);
            const expr = evalExpressions[0];
            // The interactionType should be safely stringified and concatenated
            assert.include(expr, '\' + "pointer\'); alert(1); (//" + \' interaction\')');
            assert.notInclude(expr, '100ms pointer\'); alert(1); (// interaction');
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
        it('dispatches status events with navigationType', () => {
            let statusEvent = null;
            liveMetrics.addEventListener("status" /* LiveMetrics.Events.STATUS */, event => {
                statusEvent = event.data;
            });
            liveMetrics.setStatusForTesting({
                interactions: new Map(),
                layoutShifts: [],
                navigationType: 'soft-navigation',
            });
            assert.exists(statusEvent);
            assert.strictEqual(statusEvent.navigationType, 'soft-navigation');
            assert.strictEqual(liveMetrics.navigationType, 'soft-navigation');
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
                subparts: { inputDelay: 10, processingDuration: 80, presentationDelay: 10 },
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