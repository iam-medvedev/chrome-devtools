// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import sinon from 'sinon';
import * as SDK from '../../core/sdk/sdk.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import { html, render } from '../../ui/lit/lit.js';
import * as Profiler from './profiler.js';
describeWithEnvironment('HeapFlameChartDataProvider', () => {
    it('prepares popover element', () => {
        const mockProfile = {
            root: {
                functionName: 'root',
                self: 0,
                total: 100,
                children: [
                    {
                        functionName: 'child1',
                        self: 10,
                        total: 50,
                        children: [],
                        callFrame: {
                            functionName: 'child1',
                            scriptId: '1',
                            url: 'test.js',
                            lineNumber: 10,
                            columnNumber: 0,
                        },
                    },
                ],
                callFrame: {
                    functionName: 'root',
                    scriptId: '0',
                    url: '',
                    lineNumber: 0,
                    columnNumber: 0,
                },
            },
        };
        const mockHeapProfilerModel = sinon.createStubInstance(SDK.HeapProfilerModel.HeapProfilerModel);
        const dataProvider = new Profiler.HeapProfileView.HeapFlameChartDataProvider(mockProfile, mockHeapProfilerModel);
        dataProvider.calculateTimelineData();
        const popover = dataProvider.preparePopoverElement(1);
        assert.isNotNull(popover);
        const container = document.createElement('div');
        render(html `${popover}`, container);
        const text = container.deepInnerText();
        assert.include(text, 'Name');
        assert.include(text, 'child1');
        assert.include(text, 'Self size');
        assert.include(text, '10');
        assert.include(text, 'Total size');
        assert.include(text, '50');
        assert.include(text, 'URL');
        assert.include(text, 'test.js');
    });
});
describeWithEnvironment('HeapProfileView', () => {
    function createMockHeader() {
        return {
            profileType: () => ({
                hasTemporaryView: () => false,
                addEventListener: () => ({}),
                removeEventListener: () => { },
            }),
            heapProfilerModel: () => null,
            protocolProfile: () => ({
                head: {
                    callFrame: {
                        functionName: 'root',
                        scriptId: '0',
                        url: '',
                        lineNumber: 0,
                        columnNumber: 0,
                    },
                    children: [],
                    selfSize: 0,
                    id: 0,
                },
                samples: [],
                startTime: 0,
                endTime: 0,
                nodes: [],
            }),
        };
    }
    it('returns correct column headers', () => {
        const mockHeader = createMockHeader();
        const view = new Profiler.HeapProfileView.HeapProfileView(mockHeader);
        assert.strictEqual(view.columnHeader('self'), 'Self size');
        assert.strictEqual(view.columnHeader('total'), 'Total size');
        assert.strictEqual(view.columnHeader('unknown'), '');
    });
    it('updates selected size text on range change', async () => {
        const mockHeader = createMockHeader();
        const view = new Profiler.HeapProfileView.HeapProfileView(mockHeader);
        const setSelectionRangeStub = sinon.stub(view, 'setSelectionRange');
        view.onIdsRangeChanged({ data: { minId: 0, maxId: 10, size: 999 } });
        sinon.assert.calledWith(setSelectionRangeStub, 0, 10);
        const template = await view.toolbarItems();
        const container = document.createElement('div');
        render(template, container);
        assert.include(container.textContent, 'Selected size:');
        assert.include(container.textContent, '999');
    });
    it('updates profile statistics on stats update', () => {
        const mockHeader = createMockHeader();
        const view = new Profiler.HeapProfileView.HeapProfileView(mockHeader);
        const setSamplesSpy = sinon.spy(view.timelineOverview, 'setSamples');
        const mockProfile = {
            samples: [
                { ordinal: 1, size: 100, nodeId: 1 },
            ],
        };
        view.onStatsUpdate({ data: mockProfile });
        sinon.assert.called(setSamplesSpy);
        const samples = setSamplesSpy.firstCall.args[0];
        assert.strictEqual(samples.sizes[0], 100);
    });
    it('changes view correctly', () => {
        const mockHeader = createMockHeader();
        const view = new Profiler.HeapProfileView.HeapProfileView(mockHeader);
        // Initial view should be HEAVY
        assert.strictEqual(view.viewType.get(), "Heavy" /* Profiler.HeapProfileView.ViewTypes.HEAVY */);
        // Change to TREE
        view.viewType.set("Tree" /* Profiler.HeapProfileView.ViewTypes.TREE */);
        view.changeView();
        assert.isDefined(view.profileDataGridTree);
        // Change to FLAME
        view.viewType.set("Flame" /* Profiler.HeapProfileView.ViewTypes.FLAME */);
        view.changeView();
    });
    it('displays pageFunction and anonymous functions in the tree', async () => {
        const mockHeader = {
            profileType: () => ({
                hasTemporaryView: () => false,
                addEventListener: () => ({}),
                removeEventListener: () => { },
            }),
            heapProfilerModel: () => null,
            protocolProfile: () => ({
                head: {
                    callFrame: {
                        functionName: 'root',
                        scriptId: '0',
                        url: '',
                        lineNumber: 0,
                        columnNumber: 0,
                    },
                    selfSize: 0,
                    id: 0,
                    children: [{
                            callFrame: {
                                functionName: 'pageFunction',
                                scriptId: '1',
                                url: 'test.js',
                                lineNumber: 1,
                                columnNumber: 1,
                            },
                            selfSize: 0,
                            id: 1,
                            children: [{
                                    callFrame: {
                                        functionName: '(anonymous)',
                                        scriptId: '1',
                                        url: 'test.js',
                                        lineNumber: 2,
                                        columnNumber: 1,
                                    },
                                    selfSize: 1000000,
                                    id: 2,
                                    children: [],
                                }],
                        }],
                },
                samples: [],
                startTime: 0,
                endTime: 0,
                nodes: [],
            }),
        };
        const view = new Profiler.HeapProfileView.HeapProfileView(mockHeader);
        // Test TREE view
        view.viewType.set("Tree" /* Profiler.HeapProfileView.ViewTypes.TREE */);
        view.changeView();
        let tree = view.profileDataGridTree;
        assert.isNotNull(tree);
        let children = tree.children;
        assert.lengthOf(children, 1);
        const pageFunctionNode = children[0];
        assert.strictEqual(pageFunctionNode.functionName, 'pageFunction');
        assert.strictEqual(pageFunctionNode.url, 'test.js');
        pageFunctionNode.populate();
        const pageFunctionChildren = pageFunctionNode.children;
        assert.lengthOf(pageFunctionChildren, 1);
        const anonymousNode = pageFunctionChildren[0];
        assert.strictEqual(anonymousNode.functionName, '(anonymous)');
        assert.strictEqual(anonymousNode.url, 'test.js');
        // Test HEAVY view
        view.viewType.set("Heavy" /* Profiler.HeapProfileView.ViewTypes.HEAVY */);
        view.changeView();
        tree = view.profileDataGridTree;
        assert.isNotNull(tree);
        children = tree.children;
        const anonymousNodeHeavy = children.find(node => node.functionName === '(anonymous)');
        assert.isDefined(anonymousNodeHeavy);
        assert.strictEqual(anonymousNodeHeavy.url, 'test.js');
        anonymousNodeHeavy.populate();
        const anonymousChildrenHeavy = anonymousNodeHeavy.children;
        const pageFunctionNodeHeavy = anonymousChildrenHeavy.find(node => node.functionName === 'pageFunction');
        assert.isDefined(pageFunctionNodeHeavy);
    });
});
//# sourceMappingURL=HeapProfileView.test.js.map