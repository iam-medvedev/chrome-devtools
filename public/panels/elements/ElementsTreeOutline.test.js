// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection, } from '../../testing/MockConnection.js';
import * as Elements from './elements.js';
describeWithMockConnection('ElementsTreeOutline', () => {
    let target;
    let model;
    let treeOutline;
    beforeEach(() => {
        target = createTarget();
        treeOutline = new Elements.ElementsTreeOutline.ElementsTreeOutline(/* omitRootDOMNode */ true);
        treeOutline.wireToDOMModel(target.model(SDK.DOMModel.DOMModel));
        const modelBeforeAssertion = target.model(SDK.DOMModel.DOMModel);
        assert.exists(modelBeforeAssertion);
        model = modelBeforeAssertion;
    });
    afterEach(() => {
        target.dispose('NO_REASON');
    });
    it('should include the ::checkmark pseudo element', () => {
        const optionNode = SDK.DOMModel.DOMNode.create(model, null, false, {
            nodeId: 1,
            backendNodeId: 1,
            nodeType: Node.ELEMENT_NODE,
            nodeName: 'option',
            localName: 'option',
            nodeValue: 'An Option',
            childNodeCount: 1,
            pseudoElements: [{
                    parentId: 1,
                    nodeId: 2,
                    backendNodeId: 2,
                    nodeType: Node.ELEMENT_NODE,
                    pseudoType: "checkmark" /* Protocol.DOM.PseudoType.Checkmark */,
                    pseudoIdentifier: '::checkmark',
                    nodeName: '::checkmark',
                    localName: '::checkmark',
                    nodeValue: '*',
                }],
        });
        assert.isNotNull(optionNode);
        const checkmarkNode = optionNode.checkmarkPseudoElement();
        assert.isNotNull(checkmarkNode);
        treeOutline.rootDOMNode = optionNode;
        assert.isNotNull(treeOutline.findTreeElement(checkmarkNode));
    });
    it('should include the ::picker-icon pseudo element', () => {
        const selectNode = SDK.DOMModel.DOMNode.create(model, null, false, {
            nodeId: 1,
            backendNodeId: 1,
            nodeType: Node.ELEMENT_NODE,
            nodeName: 'select',
            localName: 'select',
            nodeValue: 'A Select',
            childNodeCount: 1,
            pseudoElements: [{
                    parentId: 1,
                    nodeId: 2,
                    backendNodeId: 2,
                    nodeType: Node.ELEMENT_NODE,
                    pseudoType: "picker-icon" /* Protocol.DOM.PseudoType.PickerIcon */,
                    pseudoIdentifier: '::picker-icon',
                    nodeName: '::picker-icon',
                    localName: '::picker-icon',
                    nodeValue: '^',
                }],
        });
        assert.isNotNull(selectNode);
        const pickerIconNode = selectNode.pickerIconPseudoElement();
        assert.isNotNull(pickerIconNode);
        treeOutline.rootDOMNode = selectNode;
        assert.isNotNull(treeOutline.findTreeElement(pickerIconNode));
    });
});
//# sourceMappingURL=ElementsTreeOutline.test.js.map