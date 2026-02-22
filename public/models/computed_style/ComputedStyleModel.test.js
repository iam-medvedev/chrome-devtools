// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import { createTarget, stubNoopSettings } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import { getMatchedStyles } from '../../testing/StyleHelpers.js';
import * as ComputedStyle from './computed_style.js';
function createNode(target, { nodeId }) {
    const domModel = target.model(SDK.DOMModel.DOMModel);
    assert.exists(domModel);
    const node = SDK.DOMModel.DOMNode.create(domModel, null, false, {
        nodeId,
        backendNodeId: 2,
        nodeType: Node.ELEMENT_NODE,
        nodeName: 'div',
        localName: 'div',
        nodeValue: '',
    });
    return node;
}
describeWithMockConnection('ComputedStyleModel', () => {
    let target;
    let computedStyleModel;
    let domNode1;
    beforeEach(() => {
        stubNoopSettings();
        target = createTarget();
        domNode1 = createNode(target, { nodeId: 1 });
        const cssModel = target.model(SDK.CSSModel.CSSModel);
        sinon.stub(ComputedStyle.ComputedStyleModel.ComputedStyleModel.prototype, 'cssModel').returns(cssModel);
        computedStyleModel = new ComputedStyle.ComputedStyleModel.ComputedStyleModel();
    });
    afterEach(() => { });
    it('listens to events on the CSS Model when there is a node given', async () => {
        const cssModel = domNode1.domModel().cssModel();
        assert.isOk(cssModel);
        const listenerSpy = sinon.spy(cssModel, 'addEventListener');
        computedStyleModel.node = domNode1;
        // Feels silly to assert each individual call; but assert 1 to verify that
        // code path was executed as expected.
        sinon.assert.calledWith(listenerSpy, SDK.CSSModel.Events.StyleSheetAdded);
    });
    it('does not listen to events when there is no node given', async () => {
        const cssModel = domNode1.domModel().cssModel();
        assert.isOk(cssModel);
        const listenerSpy = sinon.spy(SDK.CSSModel.CSSModel.prototype, 'addEventListener');
        computedStyleModel.node = null;
        sinon.assert.callCount(listenerSpy, 0);
    });
    it('emits the CSS_MODEL_CHANGED event when there is a change', async () => {
        const cssModel = domNode1.domModel().cssModel();
        assert.isOk(cssModel);
        computedStyleModel.node = domNode1;
        const modelChangedListener = sinon.spy();
        computedStyleModel.addEventListener("CSSModelChanged" /* ComputedStyle.ComputedStyleModel.Events.CSS_MODEL_CHANGED */, event => modelChangedListener(event.data));
        const FAKE_CSS_STYLESHEET_HEADER = {};
        cssModel.dispatchEventToListeners(SDK.CSSModel.Events.StyleSheetAdded, FAKE_CSS_STYLESHEET_HEADER);
        sinon.assert.calledOnceWithExactly(modelChangedListener, FAKE_CSS_STYLESHEET_HEADER);
    });
    it('emits the COMPUTED_STYLE_CHANGED event when the node ID matches', async () => {
        const cssModel = domNode1.domModel().cssModel();
        assert.isOk(cssModel);
        computedStyleModel.node = domNode1;
        const computedStyleListener = sinon.spy();
        computedStyleModel.addEventListener("ComputedStyleChanged" /* ComputedStyle.ComputedStyleModel.Events.COMPUTED_STYLE_CHANGED */, computedStyleListener);
        cssModel.dispatchEventToListeners(SDK.CSSModel.Events.ComputedStyleUpdated, { nodeId: domNode1.id });
        sinon.assert.callCount(computedStyleListener, 1);
    });
    it('does not emit the COMPUTED_STYLE_CHANGED event if the Node ID is different', async () => {
        const cssModel = domNode1.domModel().cssModel();
        assert.isOk(cssModel);
        computedStyleModel.node = domNode1;
        const computedStyleListener = sinon.spy();
        computedStyleModel.addEventListener("ComputedStyleChanged" /* ComputedStyle.ComputedStyleModel.Events.COMPUTED_STYLE_CHANGED */, computedStyleListener);
        cssModel.dispatchEventToListeners(SDK.CSSModel.Events.ComputedStyleUpdated, { nodeId: (domNode1.id + 1) });
        sinon.assert.callCount(computedStyleListener, 0);
    });
    it('fetchMatchedCascade returns null for matchedStyles if the node does not match', async () => {
        const cssModel = domNode1.domModel().cssModel();
        assert.isOk(cssModel);
        computedStyleModel.node = domNode1;
        const domNode2 = createNode(target, { nodeId: 2 });
        const mockMatchedStylesForNode2 = await getMatchedStyles({
            node: domNode2,
        });
        const cachedMatchedCascadeForNodeStub = sinon.stub(cssModel, 'cachedMatchedCascadeForNode').resolves(mockMatchedStylesForNode2);
        const matchedStyles = await computedStyleModel.fetchMatchedCascade();
        sinon.assert.calledOnce(cachedMatchedCascadeForNodeStub);
        assert.isNull(matchedStyles);
    });
    it('fetchComputedStyle returns null if the node has become outdated', async () => {
        const cssModel = domNode1.domModel().cssModel();
        assert.isOk(cssModel);
        computedStyleModel.node = domNode1;
        const domNode2 = createNode(target, { nodeId: 2 });
        // We need to control when this promise resolves, hence using callsFake and
        // providing the promise manually.
        const computedStylePromise = Promise.withResolvers();
        const getComputedStyleStub = sinon.stub(cssModel, 'getComputedStyle').callsFake(() => {
            return computedStylePromise.promise;
        });
        // To emulate this scenario we need to:
        // 1. Set the node to ID=1, and make the fetchComputedStyle() call.
        const stylesPromise = computedStyleModel.fetchComputedStyle();
        // 2. Before that resolves, set the node to ID = 2
        computedStyleModel.node = domNode2;
        // 3. Resolve the getComputedStyle promise, at which point the node check
        //    will see that the nodes are different.
        const mockComputedStyle = new Map([['color', 'red']]);
        computedStylePromise.resolve(mockComputedStyle);
        const styles = await stylesPromise;
        sinon.assert.calledOnce(getComputedStyleStub);
        assert.isNull(styles);
    });
});
//# sourceMappingURL=ComputedStyleModel.test.js.map