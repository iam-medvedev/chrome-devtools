// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import { renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import * as Elements from './elements.js';
describeWithMockConnection('AdoptedStyleSheetTreeElement highlighting', () => {
    let domModel;
    let treeOutline;
    let containerNode;
    let shadowRootNode;
    let shadowRootTreeElement;
    const sheetId = 'sheet-id';
    beforeEach(async () => {
        const target = createTarget();
        domModel = target.model(SDK.DOMModel.DOMModel);
        const containerPayload = {
            nodeId: 1,
            backendNodeId: 2,
            nodeType: Node.ELEMENT_NODE,
            nodeName: 'DIV',
            localName: 'div',
            nodeValue: '',
            attributes: [],
            childNodeCount: 0,
            shadowRoots: [{
                    nodeId: 3,
                    backendNodeId: 4,
                    parentId: 1,
                    nodeType: Node.DOCUMENT_FRAGMENT_NODE,
                    shadowRootType: "open" /* Protocol.DOM.ShadowRootType.Open */,
                    adoptedStyleSheets: [sheetId],
                    nodeName: 'SHADOW-ROOT',
                    localName: '#shadow-root',
                    nodeValue: '',
                }],
        };
        containerNode = SDK.DOMModel.DOMNode.create(domModel, null, false, containerPayload);
        shadowRootNode = containerNode.shadowRoots()[0];
        treeOutline = new Elements.ElementsTreeOutline.ElementsTreeOutline();
        treeOutline.wireToDOMModel(domModel);
        const containerTreeElement = new Elements.ElementsTreeElement.ElementsTreeElement(containerNode);
        shadowRootTreeElement = new Elements.ElementsTreeElement.ElementsTreeElement(shadowRootNode);
        containerTreeElement.appendChild(shadowRootTreeElement);
        treeOutline.setVisible(true);
        renderElementIntoDOM(treeOutline.element);
        containerTreeElement.expand();
    });
    afterEach(() => {
        treeOutline.removeChildren();
        treeOutline.setVisible(false);
    });
    it('edits an adopted style sheet', async () => {
        const adoptedSheet = shadowRootNode.adoptedStyleSheetsForNode[0];
        const initialCSS = '/* comment */';
        let resolveWaitForText;
        const waitForText = new Promise(resolve => {
            resolveWaitForText = resolve;
        })
            .then(() => { })
            .then(() => { });
        const getStyleSheetTextStub = sinon.stub(adoptedSheet.cssModel, 'getStyleSheetText');
        getStyleSheetTextStub.onFirstCall().resolves(initialCSS);
        getStyleSheetTextStub.onSecondCall().callsFake(() => new Promise(resolve => {
            resolve(initialCSS);
            resolveWaitForText(null);
        }));
        adoptedSheet.cssModel.styleSheetAdded({
            styleSheetId: sheetId,
            frameId: '',
            sourceURL: '',
            title: '',
            origin: "regular" /* Protocol.CSS.StyleSheetOrigin.Regular */,
            disabled: false,
            isInline: false,
            isMutable: true,
            isConstructed: true,
            startLine: 0,
            startColumn: 0,
            endLine: 0,
            endColumn: initialCSS.length,
            length: initialCSS.length,
            loadingFailed: false,
        });
        const adoptedStyleSheetSetTreeElement = new Elements.AdoptedStyleSheetTreeElement.AdoptedStyleSheetSetTreeElement([adoptedSheet]);
        shadowRootTreeElement.appendChild(adoptedStyleSheetSetTreeElement);
        await shadowRootTreeElement.onpopulate();
        shadowRootTreeElement.expand();
        assert.strictEqual(shadowRootTreeElement.childCount(), 1);
        assert.strictEqual(shadowRootTreeElement.children()[0], adoptedStyleSheetSetTreeElement);
        await adoptedStyleSheetSetTreeElement.onpopulate();
        adoptedStyleSheetSetTreeElement.expand();
        assert.strictEqual(adoptedStyleSheetSetTreeElement.childCount(), 1);
        const adoptedStyleSheetTreeElement = adoptedStyleSheetSetTreeElement.children()[0];
        await adoptedStyleSheetTreeElement.onpopulate();
        adoptedStyleSheetTreeElement.expand();
        assert.strictEqual(adoptedStyleSheetTreeElement.childCount(), 1);
        const adoptedStyleSheetContentsTreeElement = adoptedStyleSheetTreeElement.children()[0];
        const setTextStub = sinon.stub(adoptedSheet.cssModel, 'setStyleSheetText').resolves(null);
        await adoptedStyleSheetContentsTreeElement.onpopulate();
        const textElementDOM = adoptedStyleSheetContentsTreeElement.listItemElement.querySelector('.webkit-html-text-node');
        assert.exists(textElementDOM);
        // Start editing by calling ondblclick
        const event = new MouseEvent('dblclick', { bubbles: true, cancelable: true });
        Object.defineProperty(event, 'target', { value: textElementDOM });
        assert.isFalse(adoptedStyleSheetContentsTreeElement.ondblclick(event));
        await waitForText;
        sinon.assert.calledTwice(getStyleSheetTextStub);
        assert.isTrue(adoptedStyleSheetContentsTreeElement.isEditing());
        assert.strictEqual(textElementDOM.textContent, initialCSS);
        // The inplace editor is now active on textElementDOM.
        const newCSS = '.foo { color: red; }';
        textElementDOM.textContent = newCSS;
        // The commit is triggered by blur or enter.
        textElementDOM.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        assert.isFalse(adoptedStyleSheetContentsTreeElement.isEditing());
        sinon.assert.calledOnce(setTextStub);
        sinon.assert.calledWith(setTextStub, sheetId, newCSS, false);
    });
});
//# sourceMappingURL=AdoptedStyleSheetTreeElement.test.js.map