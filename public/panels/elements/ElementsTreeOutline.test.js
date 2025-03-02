// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Root from '../../core/root/root.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection, } from '../../testing/MockConnection.js';
import { MockIssuesModel } from '../../testing/MockIssuesModel.js';
import * as Elements from './elements.js';
describeWithMockConnection('ElementsTreeOutline', () => {
    let target;
    let model;
    let treeOutline;
    beforeEach(() => {
        target = createTarget();
        Root.Runtime.experiments.enableForTest("highlight-errors-elements-panel" /* Root.Runtime.ExperimentName.HIGHLIGHT_ERRORS_ELEMENTS_PANEL */);
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
    it('should add an element-related issue to the relevant tree element', async () => {
        const divNodePayload = {
            nodeId: 2,
            parentId: 1,
            backendNodeId: 2,
            nodeType: Node.ELEMENT_NODE,
            nodeName: 'DIV',
            childNodeCount: 0,
            localName: 'div',
            nodeValue: 'A div',
        };
        const rootNode = SDK.DOMModel.DOMNode.create(model, null, false, {
            nodeId: 1,
            backendNodeId: 1,
            nodeType: Node.ELEMENT_NODE,
            nodeName: 'BODY',
            localName: 'body',
            nodeValue: 'Body',
            childNodeCount: 1,
            children: [divNodePayload],
        });
        assert.isNotNull(rootNode);
        treeOutline.rootDOMNode = rootNode;
        const divNode = rootNode.children()[0];
        assert.isNotNull(divNode);
        const treeElement = treeOutline.findTreeElement(divNode);
        assert.isNotNull(treeElement);
        const deferredDOMNodeStub = sinon.stub(SDK.DOMModel.DeferredDOMNode.prototype, 'resolvePromise').resolves(divNode);
        const issuesManager = IssuesManager.IssuesManager.IssuesManager.instance();
        const mockModel = new MockIssuesModel([]);
        // Test that generic issue can be added to the tree element.
        {
            const inspectorIssue = {
                code: "GenericIssue" /* Protocol.Audits.InspectorIssueCode.GenericIssue */,
                details: {
                    genericIssueDetails: {
                        errorType: "FormLabelForNameError" /* Protocol.Audits.GenericIssueErrorType.FormLabelForNameError */,
                        frameId: 'main',
                        violatingNodeId: 2,
                    },
                },
            };
            const issue = IssuesManager.GenericIssue.GenericIssue.fromInspectorIssue(mockModel, inspectorIssue)[0];
            issuesManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.ISSUE_ADDED */, { issuesModel: mockModel, issue });
            await deferredDOMNodeStub();
            const tagElement = treeElement.listItemElement.getElementsByClassName('webkit-html-tag-name')[0];
            assert.isTrue(tagElement.classList.contains('violating-element'));
            // Reset tag to prepare for subsequent tests.
            tagElement.classList.remove('violating-element');
        }
        // Test that <select> issue can be added to the tree element.
        {
            const inspectorIssue = {
                code: "SelectElementAccessibilityIssue" /* Protocol.Audits.InspectorIssueCode.SelectElementAccessibilityIssue */,
                details: {
                    selectElementAccessibilityIssueDetails: {
                        nodeId: 2,
                        selectElementAccessibilityIssueReason: "DisallowedSelectChild" /* Protocol.Audits.SelectElementAccessibilityIssueReason.DisallowedSelectChild */,
                        hasDisallowedAttributes: false,
                    },
                },
            };
            const issue = IssuesManager.SelectElementAccessibilityIssue.SelectElementAccessibilityIssue.fromInspectorIssue(mockModel, inspectorIssue)[0];
            issuesManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.ISSUE_ADDED */, { issuesModel: mockModel, issue });
            await deferredDOMNodeStub();
            const tagElement = treeElement.listItemElement.getElementsByClassName('webkit-html-tag-name')[0];
            assert.isTrue(tagElement.classList.contains('violating-element'));
            // Reset tag to prepare for subsequent tests.
            tagElement.classList.remove('violating-element');
        }
        // Test that non-supported issue won't be added to the tree element.
        {
            const inspectorIssue = {
                code: "ContentSecurityPolicyIssue" /* Protocol.Audits.InspectorIssueCode.ContentSecurityPolicyIssue */,
                details: {},
            };
            const issue = IssuesManager.ContentSecurityPolicyIssue.ContentSecurityPolicyIssue.fromInspectorIssue(mockModel, inspectorIssue)[0];
            issuesManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.ISSUE_ADDED */, { issuesModel: mockModel, issue });
            await deferredDOMNodeStub();
            const tagElement = treeElement.listItemElement.getElementsByClassName('webkit-html-tag-name')[0];
            assert.isFalse(tagElement.classList.contains('violating-element'));
        }
    });
});
//# sourceMappingURL=ElementsTreeOutline.test.js.map