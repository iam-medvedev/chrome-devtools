// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { createTarget, stubNoopSettings, } from '../../../test/unittests/front_end/helpers/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../../test/unittests/front_end/helpers/MockConnection.js';
import * as Common from '../../core/common/common.js';
import { assertNotNullOrUndefined } from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Elements from '../elements/elements.js';
import * as Animation from './animation.js';
const { assert } = chai;
const cancelAllPendingRaf = () => {
    let rafId = window.requestAnimationFrame(() => { });
    while (rafId--) {
        window.cancelAnimationFrame(rafId);
    }
};
describeWithMockConnection('AnimationTimeline', () => {
    let target;
    let view;
    beforeEach(() => {
        Common.Linkifier.registerLinkifier({
            contextTypes() {
                return [SDK.DOMModel.DOMNode];
            },
            async loadLinkifier() {
                return Elements.DOMLinkifier.Linkifier.instance();
            },
        });
        stubNoopSettings();
        target = createTarget();
    });
    afterEach(() => {
        cancelAllPendingRaf();
        view.detach();
    });
    const updatesUiOnEvent = (inScope) => async () => {
        SDK.TargetManager.TargetManager.instance().setScopeTarget(inScope ? target : null);
        const model = target.model(Animation.AnimationModel.AnimationModel);
        assertNotNullOrUndefined(model);
        view = Animation.AnimationTimeline.AnimationTimeline.instance({ forceNew: true });
        view.markAsRoot();
        view.show(document.body);
        await new Promise(resolve => setTimeout(resolve, 0));
        const previewContainer = view.contentElement.querySelector('.animation-timeline-buffer');
        model.animationStarted({
            id: 'id',
            name: 'name',
            pausedState: false,
            playState: 'playState',
            playbackRate: 1,
            startTime: 42,
            currentTime: 43,
            type: "CSSAnimation" /* Protocol.Animation.AnimationType.CSSAnimation */,
            source: {
                delay: 0,
                duration: 1001,
                backendNodeId: 42,
            },
        });
        assert.strictEqual(previewContainer.querySelectorAll('.animation-buffer-preview').length, inScope ? 1 : 0);
    };
    it('updates UI on in scope animation group start', updatesUiOnEvent(true));
    it('does not update UI on out of scope animation group start', updatesUiOnEvent(false));
    describe('resizing time controls', () => {
        it('updates --timeline-controls-width and calls onResize', async () => {
            view = Animation.AnimationTimeline.AnimationTimeline.instance({ forceNew: true });
            view.markAsRoot();
            view.show(document.body);
            const onResizeStub = sinon.stub(view, 'onResize');
            await new Promise(resolve => setTimeout(resolve, 0));
            const resizer = view.contentElement.querySelector('.timeline-controls-resizer');
            assertNotNullOrUndefined(resizer);
            const initialWidth = view.element.style.getPropertyValue('--timeline-controls-width');
            assert.strictEqual(initialWidth, '150px');
            const resizerRect = resizer.getBoundingClientRect();
            resizer.dispatchEvent(new PointerEvent('pointerdown', {
                clientX: resizerRect.x + resizerRect.width / 2,
                clientY: resizerRect.y + resizerRect.height / 2,
            }));
            resizer.ownerDocument.dispatchEvent(new PointerEvent('pointermove', {
                buttons: 1,
                clientX: (resizerRect.x + resizerRect.width / 2) + 20,
                clientY: resizerRect.y + resizerRect.height / 2,
            }));
            resizer.ownerDocument.dispatchEvent(new PointerEvent('pointerup'));
            const afterResizeWidth = view.element.style.getPropertyValue('--timeline-controls-width');
            assert.notStrictEqual(initialWidth, afterResizeWidth);
            assert.isTrue(onResizeStub.calledOnce);
        });
    });
    describe('Animation group nodes are removed', () => {
        let domModel;
        let animationModel;
        let contentDocument;
        let waitForAnimationGroupSelected;
        beforeEach(() => {
            view = Animation.AnimationTimeline.AnimationTimeline.instance({ forceNew: true });
            view.markAsRoot();
            view.show(document.body);
            waitForAnimationGroupSelected =
                new Promise(r => sinon.stub(view, 'animationGroupSelectedForTest').callsFake(r));
            const model = target.model(Animation.AnimationModel.AnimationModel);
            assertNotNullOrUndefined(model);
            animationModel = model;
            const modelForDom = target.model(SDK.DOMModel.DOMModel);
            assertNotNullOrUndefined(modelForDom);
            domModel = modelForDom;
            contentDocument = SDK.DOMModel.DOMDocument.create(domModel, null, false, {
                nodeId: 0,
                backendNodeId: 0,
                nodeType: Node.DOCUMENT_NODE,
                nodeName: '#document',
                localName: 'document',
                nodeValue: '',
            });
            animationModel.animationStarted({
                id: 'animation-id',
                name: 'animation-name',
                pausedState: false,
                playState: 'running',
                playbackRate: 1,
                startTime: 42,
                currentTime: 0,
                type: "CSSAnimation" /* Protocol.Animation.AnimationType.CSSAnimation */,
                source: {
                    delay: 0,
                    endDelay: 0,
                    duration: 10000,
                    backendNodeId: 42,
                },
            });
        });
        describe('when the animation group is already selected', () => {
            it('should hide scrubber, disable control button and make current time empty', async () => {
                const domNode = SDK.DOMModel.DOMNode.create(domModel, contentDocument, false, {
                    nodeId: 1,
                    backendNodeId: 1,
                    nodeType: Node.ELEMENT_NODE,
                    nodeName: 'div',
                    localName: 'div',
                    nodeValue: '',
                });
                sinon.stub(SDK.DOMModel.DeferredDOMNode.prototype, 'resolvePromise').resolves(domNode);
                const preview = view.element.shadowRoot?.querySelector('.animation-buffer-preview');
                assertNotNullOrUndefined(preview);
                preview.click();
                await waitForAnimationGroupSelected;
                const gridHeader = view.element.shadowRoot?.querySelector('.animation-grid-header');
                assertNotNullOrUndefined(gridHeader);
                assert.isTrue(gridHeader.classList.contains('scrubber-enabled'));
                const scrubber = view.element.shadowRoot?.querySelector('.animation-scrubber');
                assertNotNullOrUndefined(scrubber);
                assert.isFalse(scrubber.classList.contains('hidden'));
                const controlButton = view.element.shadowRoot?.querySelector('.animation-controls-toolbar')
                    ?.shadowRoot?.querySelector('.toolbar-button');
                assertNotNullOrUndefined(controlButton);
                assert.isFalse(controlButton.disabled);
                const currentTime = view.element.shadowRoot?.querySelector('.animation-timeline-current-time');
                assertNotNullOrUndefined(currentTime);
                domModel.dispatchEventToListeners(SDK.DOMModel.Events.NodeRemoved, { node: domNode, parent: contentDocument });
                assert.isFalse(gridHeader.classList.contains('scrubber-enabled'));
                assert.isTrue(scrubber.classList.contains('hidden'));
                assert.isTrue(controlButton.disabled);
                assert.isTrue(currentTime.textContent === '');
            });
            it('should mark the animation node as removed in the NodeUI', async () => {
                const domNode = SDK.DOMModel.DOMNode.create(domModel, contentDocument, false, {
                    nodeId: 1,
                    backendNodeId: 1,
                    nodeType: Node.ELEMENT_NODE,
                    nodeName: 'div',
                    localName: 'div',
                    nodeValue: '',
                });
                sinon.stub(SDK.DOMModel.DeferredDOMNode.prototype, 'resolvePromise').resolves(domNode);
                const preview = view.element.shadowRoot?.querySelector('.animation-buffer-preview');
                assertNotNullOrUndefined(preview);
                preview.click();
                await waitForAnimationGroupSelected;
                // Wait for the animation group to be fully selected and scrubber enabled.
                const gridHeader = view.element.shadowRoot?.querySelector('.animation-grid-header');
                assertNotNullOrUndefined(gridHeader);
                assert.isTrue(gridHeader.classList.contains('scrubber-enabled'));
                const animationNodeRow = view.element.shadowRoot?.querySelector('.animation-node-row');
                assertNotNullOrUndefined(animationNodeRow);
                assert.isFalse(animationNodeRow.classList.contains('animation-node-removed'));
                domModel.dispatchEventToListeners(SDK.DOMModel.Events.NodeRemoved, { node: domNode, parent: contentDocument });
                assert.isTrue(animationNodeRow.classList.contains('animation-node-removed'));
            });
        });
        describe('when the animation group is not selected and the nodes are removed', () => {
            it('should scrubber be hidden, control button be disabled and current time be empty', async () => {
                // Owner document is null for the resolved deferred nodes that are already removed from the DOM.
                const domNode = SDK.DOMModel.DOMNode.create(domModel, null, false, {
                    nodeId: 1,
                    backendNodeId: 1,
                    nodeType: Node.ELEMENT_NODE,
                    nodeName: 'div',
                    localName: 'div',
                    nodeValue: '',
                });
                sinon.stub(SDK.DOMModel.DeferredDOMNode.prototype, 'resolvePromise').resolves(domNode);
                const preview = view.element.shadowRoot?.querySelector('.animation-buffer-preview');
                assertNotNullOrUndefined(preview);
                preview.click();
                await waitForAnimationGroupSelected;
                const gridHeader = view.element.shadowRoot?.querySelector('.animation-grid-header');
                assertNotNullOrUndefined(gridHeader);
                assert.isFalse(gridHeader.classList.contains('scrubber-enabled'));
                const scrubber = view.element.shadowRoot?.querySelector('.animation-scrubber');
                assertNotNullOrUndefined(scrubber);
                assert.isTrue(scrubber.classList.contains('hidden'));
                const controlButton = view.element.shadowRoot?.querySelector('.animation-controls-toolbar')
                    ?.shadowRoot?.querySelector('.toolbar-button');
                assertNotNullOrUndefined(controlButton);
                assert.isTrue(controlButton.disabled);
                const currentTime = view.element.shadowRoot?.querySelector('.animation-timeline-current-time');
                assertNotNullOrUndefined(currentTime);
                assert.isTrue(currentTime.textContent === '');
            });
        });
    });
});
//# sourceMappingURL=AnimationTimeline.test.js.map