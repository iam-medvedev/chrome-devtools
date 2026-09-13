// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import * as SDK from '../../../core/sdk/sdk.js';
import * as Trace from '../../../models/trace/trace.js';
import { createTarget, describeWithEnvironment } from '../../../testing/EnvironmentHelpers.js';
import { MockCDPConnection } from '../../../testing/MockCDPConnection.js';
import { defaultTraceEvent, makeCompleteEvent, makeInstantEvent } from '../../../testing/TraceHelpers.js';
import * as Utils from './utils.js';
describeWithEnvironment('EntryNodes', function () {
    const dummyParsedTrace = {};
    describe('nodeIdsForEvent', () => {
        it('identifies node ids for a Layout event', () => {
            const layoutEvent = {
                ...makeCompleteEvent("Layout" /* Trace.Types.Events.Name.LAYOUT */, 0, 1000),
                name: "Layout" /* Trace.Types.Events.Name.LAYOUT */,
                args: {
                    beginData: {
                        frame: 'main-frame',
                        dirtyObjects: 1,
                        totalObjects: 1,
                        partialLayout: false,
                    },
                    endData: {
                        layoutRoots: [{
                                nodeId: 2,
                                depth: 1,
                                quads: [],
                            }],
                    },
                },
            };
            const nodeIds = Utils.EntryNodes.nodeIdsForEvent(dummyParsedTrace, layoutEvent);
            assert.deepEqual(Array.from(nodeIds), [2]);
        });
        it('identifies node ids for a LayoutShift event', () => {
            const rawLayoutShift = {
                ...makeInstantEvent("LayoutShift" /* Trace.Types.Events.Name.LAYOUT_SHIFT */, 0),
                name: "LayoutShift" /* Trace.Types.Events.Name.LAYOUT_SHIFT */,
                args: {
                    frame: 'main-frame',
                    data: {
                        cumulative_score: 0.1,
                        frame_max_distance: 10,
                        had_recent_input: false,
                        impacted_nodes: [
                            { node_id: 193, new_rect: [0, 0, 0, 0], old_rect: [0, 0, 0, 0] },
                            { node_id: 195, new_rect: [0, 0, 0, 0], old_rect: [0, 0, 0, 0] },
                            { node_id: 178, new_rect: [0, 0, 0, 0], old_rect: [0, 0, 0, 0] },
                            { node_id: 189, new_rect: [0, 0, 0, 0], old_rect: [0, 0, 0, 0] },
                            { node_id: 188, new_rect: [0, 0, 0, 0], old_rect: [0, 0, 0, 0] },
                        ],
                        is_main_frame: true,
                        overall_max_distance: 10,
                        region_rects: [],
                        score: 0.1,
                        weighted_score_delta: 0.1,
                    },
                },
            };
            const layoutShiftEvent = {
                ...rawLayoutShift,
                name: "SyntheticLayoutShift" /* Trace.Types.Events.Name.SYNTHETIC_LAYOUT_SHIFT */,
                rawSourceEvent: rawLayoutShift,
                _tag: 'SyntheticEntryTag',
                parsedData: {
                    screenshots: { before: null, after: null },
                    cumulativeWeightedScoreInWindow: 0.1,
                    sessionWindowData: { cumulativeWindowScore: 0.1, id: 0 },
                },
                args: {
                    frame: 'main-frame',
                    data: {
                        ...rawLayoutShift.args.data,
                        rawEvent: rawLayoutShift,
                    },
                },
            };
            const nodeIds = Utils.EntryNodes.nodeIdsForEvent(dummyParsedTrace, layoutShiftEvent);
            assert.deepEqual(Array.from(nodeIds), [
                193,
                195,
                178,
                189,
                188,
            ]);
        });
        it('identifies node ids for a Paint event', () => {
            const paintEvent = {
                ...makeCompleteEvent("Paint" /* Trace.Types.Events.Name.PAINT */, 0, 1000),
                name: "Paint" /* Trace.Types.Events.Name.PAINT */,
                args: {
                    data: {
                        clip: [],
                        frame: 'main-frame',
                        layerId: 1,
                        nodeId: 75,
                    },
                },
            };
            const nodeIds = Utils.EntryNodes.nodeIdsForEvent(dummyParsedTrace, paintEvent);
            assert.deepEqual(Array.from(nodeIds), [75]);
        });
        it('identifies node ids for a PaintImage event', () => {
            const paintImageEvent = {
                ...makeCompleteEvent("PaintImage" /* Trace.Types.Events.Name.PAINT_IMAGE */, 0, 1000),
                name: "PaintImage" /* Trace.Types.Events.Name.PAINT_IMAGE */,
                args: {
                    data: {
                        ...defaultTraceEvent,
                        nodeId: 107,
                        url: 'https://example.com/image.png',
                        x: 0,
                        y: 0,
                        width: 100,
                        height: 100,
                        srcWidth: 100,
                        srcHeight: 100,
                        isCSS: false,
                    },
                },
            };
            const nodeIds = Utils.EntryNodes.nodeIdsForEvent(dummyParsedTrace, paintImageEvent);
            assert.deepEqual(Array.from(nodeIds), [107]);
        });
        it('identifies node ids for a ScrollLayer event', () => {
            const scrollLayerEvent = {
                ...makeCompleteEvent("ScrollLayer" /* Trace.Types.Events.Name.SCROLL_LAYER */, 0, 1000),
                name: "ScrollLayer" /* Trace.Types.Events.Name.SCROLL_LAYER */,
                args: {
                    data: {
                        ...defaultTraceEvent,
                        frame: 'main-frame',
                        nodeId: 4,
                    },
                },
            };
            const nodeIds = Utils.EntryNodes.nodeIdsForEvent(dummyParsedTrace, scrollLayerEvent);
            assert.deepEqual(Array.from(nodeIds), [4]);
        });
        it('identifies node ids for a DecodeImage event', () => {
            const decodeImageEvent = {
                ...makeCompleteEvent("Decode Image" /* Trace.Types.Events.Name.DECODE_IMAGE */, 0, 1000),
                name: "Decode Image" /* Trace.Types.Events.Name.DECODE_IMAGE */,
                args: {
                    imageType: 'png',
                },
            };
            const paintImageEvent = {
                ...makeCompleteEvent("PaintImage" /* Trace.Types.Events.Name.PAINT_IMAGE */, 0, 1000),
                name: "PaintImage" /* Trace.Types.Events.Name.PAINT_IMAGE */,
                args: {
                    data: {
                        ...defaultTraceEvent,
                        nodeId: 240,
                        url: 'https://example.com/image.png',
                        x: 0,
                        y: 0,
                        width: 100,
                        height: 100,
                        srcWidth: 100,
                        srcHeight: 100,
                        isCSS: false,
                    },
                },
            };
            const parsedTrace = {
                data: {
                    ImagePainting: {
                        paintImageForEvent: new Map([[decodeImageEvent, paintImageEvent]]),
                    },
                },
            };
            const nodeIds = Utils.EntryNodes.nodeIdsForEvent(parsedTrace, decodeImageEvent);
            assert.deepEqual(Array.from(nodeIds), [240]);
        });
        it('identifies node ids for a DrawLazyPixelRef event', () => {
            const drawLazyPixelRefEvent = {
                ...makeInstantEvent("Draw LazyPixelRef" /* Trace.Types.Events.Name.DRAW_LAZY_PIXEL_REF */, 0),
                name: "Draw LazyPixelRef" /* Trace.Types.Events.Name.DRAW_LAZY_PIXEL_REF */,
                args: {
                    LazyPixelRef: 1,
                },
            };
            const paintImageEvent = {
                ...makeCompleteEvent("PaintImage" /* Trace.Types.Events.Name.PAINT_IMAGE */, 0, 1000),
                name: "PaintImage" /* Trace.Types.Events.Name.PAINT_IMAGE */,
                args: {
                    data: {
                        ...defaultTraceEvent,
                        nodeId: 212,
                        url: 'https://example.com/image.png',
                        x: 0,
                        y: 0,
                        width: 100,
                        height: 100,
                        srcWidth: 100,
                        srcHeight: 100,
                        isCSS: false,
                    },
                },
            };
            const parsedTrace = {
                data: {
                    ImagePainting: {
                        paintImageByDrawLazyPixelRef: new Map([[1, paintImageEvent]]),
                    },
                },
            };
            const nodeIds = Utils.EntryNodes.nodeIdsForEvent(parsedTrace, drawLazyPixelRefEvent);
            assert.deepEqual(Array.from(nodeIds), [212]);
        });
        it('identifies node ids for a MarkLCP event', () => {
            const lcpCandidateEvent = {
                ...makeInstantEvent("largestContentfulPaint::Candidate" /* Trace.Types.Events.Name.MARK_LCP_CANDIDATE */, 0),
                name: "largestContentfulPaint::Candidate" /* Trace.Types.Events.Name.MARK_LCP_CANDIDATE */,
                ph: "R" /* Trace.Types.Events.Phase.MARK */,
                args: {
                    frame: 'main-frame-id',
                    data: {
                        candidateIndex: 1,
                        isOutermostMainFrame: true,
                        isMainFrame: true,
                        navigationId: 'nav-id',
                        nodeId: 209,
                        loadingAttr: '',
                    },
                },
            };
            const nodeIds = Utils.EntryNodes.nodeIdsForEvent(dummyParsedTrace, lcpCandidateEvent);
            assert.deepEqual(Array.from(nodeIds), [209]);
        });
    });
    describe('relatedDomNodesForEvent', () => {
        function nodeId(x) {
            return x;
        }
        function backendNodeId(x) {
            return x;
        }
        it('returns the related DOM nodes', async () => {
            const layoutEvent = {
                ...makeCompleteEvent("Layout" /* Trace.Types.Events.Name.LAYOUT */, 0, 1000),
                name: "Layout" /* Trace.Types.Events.Name.LAYOUT */,
                args: {
                    beginData: {
                        frame: 'main-frame',
                        dirtyObjects: 1,
                        totalObjects: 1,
                        partialLayout: false,
                    },
                    endData: {
                        layoutRoots: [{
                                nodeId: 2,
                                depth: 1,
                                quads: [],
                            }],
                    },
                },
            };
            const nodeIds = Utils.EntryNodes.nodeIdsForEvent(dummyParsedTrace, layoutEvent);
            assert.deepEqual(Array.from(nodeIds), [2]);
            const connection = new MockCDPConnection();
            // Create a mock target, dom model, document and node, using the ID of 2 to match with the event above
            const target = createTarget({ connection });
            const domModel = target.model(SDK.DOMModel.DOMModel);
            assert.exists(domModel);
            const documentNode = { nodeId: nodeId(1) };
            const domNode = new SDK.DOMModel.DOMNode(domModel);
            domNode.id = nodeId(2);
            // Set related CDP methods responses to return our mock document and node.
            connection.setSuccessHandler('DOM.pushNodesByBackendIdsToFrontend', () => ({ nodeIds: [domNode.id] }));
            connection.setSuccessHandler('DOM.getDocument', () => ({ root: documentNode }));
            // Register the mock document and node in DOMModel, these use the mock responses set above.
            await domModel.requestDocument();
            domModel.registerNode(domNode);
            const result = await Utils.EntryNodes.relatedDOMNodesForEvent(dummyParsedTrace, layoutEvent);
            assert.isNotNull(result);
            const entries = Array.from(result.entries());
            assert.deepEqual(entries, [[backendNodeId(2), domNode]]);
        });
    });
});
//# sourceMappingURL=EntryNodes.test.js.map