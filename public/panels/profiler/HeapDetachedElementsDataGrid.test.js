// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import * as SDK from '../../core/sdk/sdk.js';
import { setupLocaleHooks } from '../../testing/LocaleHelpers.js';
import { TestUniverse } from '../../testing/TestUniverse.js';
import * as Profiler from './profiler.js';
describe('HeapDetachedElementsDataGridNode', () => {
    setupLocaleHooks();
    let domModel;
    beforeEach(() => {
        const universe = new TestUniverse();
        const target = universe.createTarget();
        domModel = target.model(SDK.DOMModel.DOMModel);
    });
    function createDetachedElementInfo() {
        return {
            treeNode: {
                nodeId: 1,
                backendNodeId: 1,
                nodeType: Node.ELEMENT_NODE,
                nodeName: 'DIV',
                localName: 'div',
                nodeValue: '',
                childNodeCount: 1,
                children: [
                    {
                        nodeId: 2,
                        backendNodeId: 2,
                        nodeType: Node.TEXT_NODE,
                        nodeName: '#text',
                        localName: '',
                        nodeValue: 'foo',
                    },
                ],
            },
            retainedNodeIds: [1, 2],
        };
    }
    it('renders node count cell declaratively', () => {
        const node = new Profiler.HeapDetachedElementsDataGrid.HeapDetachedElementsDataGridNode(createDetachedElementInfo(), domModel);
        const cell = node.createCell('detached-node-count');
        assert.strictEqual(cell.textContent, '2');
    });
    it('renders detached node cell with devtools-widget declaratively', () => {
        const node = new Profiler.HeapDetachedElementsDataGrid.HeapDetachedElementsDataGridNode(createDetachedElementInfo(), domModel);
        const cell = node.createCell('detached-node');
        const widget = cell.querySelector('devtools-widget');
        assert.isNotNull(widget);
    });
});
//# sourceMappingURL=HeapDetachedElementsDataGrid.test.js.map