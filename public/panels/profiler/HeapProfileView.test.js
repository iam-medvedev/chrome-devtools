// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import sinon from 'sinon';
import * as SDK from '../../core/sdk/sdk.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
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
        const text = popover.deepInnerText();
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
                        columnNumber: 0
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
    it('updates selected size text on range change', () => {
        const mockHeader = createMockHeader();
        const view = new Profiler.HeapProfileView.HeapProfileView(mockHeader);
        const setSelectionRangeStub = sinon.stub(view, 'setSelectionRange');
        view.onIdsRangeChanged({ data: { minId: 0, maxId: 10, size: 999 } });
        sinon.assert.calledWith(setSelectionRangeStub, 0, 10);
        assert.include(view.selectedSizeText.text(), 'Selected size:');
        assert.include(view.selectedSizeText.text(), '999');
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
        view.viewSelectComboBox.setSelectedIndex(2);
        view.changeView();
        assert.strictEqual(view.visibleView, view.dataGrid.asWidget());
        // Change to FLAME
        view.viewSelectComboBox.setSelectedIndex(0);
        view.changeView();
        assert.strictEqual(view.visibleView, view.flameChart);
    });
});
//# sourceMappingURL=HeapProfileView.test.js.map