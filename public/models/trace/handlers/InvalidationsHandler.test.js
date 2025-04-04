// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { TraceLoader } from '../../../testing/TraceLoader.js';
import * as Trace from '../trace.js';
function invalidationDataForTestAssertion(invalidation) {
    return {
        nodeId: invalidation.args.data.nodeId,
        nodeName: invalidation.args.data.nodeName,
        reason: invalidation.args.data.reason,
        stackTrace: invalidation.args.data.stackTrace,
    };
}
describe('InvalidationsHandler', () => {
    beforeEach(() => {
        Trace.Handlers.ModelHandlers.Invalidations.reset();
    });
    it('finds the right invalidators for a layout where attributes have been changed', async function () {
        const events = await TraceLoader.rawEvents(this, 'style-invalidation-change-attribute.json.gz');
        for (const event of events) {
            Trace.Handlers.ModelHandlers.Invalidations.handleEvent(event);
        }
        await Trace.Handlers.ModelHandlers.Invalidations.finalize();
        const data = Trace.Handlers.ModelHandlers.Invalidations.data();
        // Find the Layout event that we want to test - we are testing
        // the layout that happens after button click that happened in
        // the trace.
        const updateLayoutTreeEvent = events.find(event => {
            return Trace.Types.Events.isUpdateLayoutTree(event) &&
                event.args.beginData?.stackTrace?.[0].functionName === 'testFuncs.changeAttributeAndDisplay';
        });
        if (!updateLayoutTreeEvent) {
            throw new Error('Could not find UpdateLayoutTree event.');
        }
        const invalidations = data.invalidationsForEvent.get(updateLayoutTreeEvent)?.map(invalidationDataForTestAssertion) ?? [];
        assert.deepEqual(invalidations, [
            {
                nodeId: 107,
                nodeName: 'BUTTON id=\'changeAttributeAndDisplay\'',
                reason: 'PseudoClass',
                stackTrace: undefined,
            },
            {
                nodeId: 110,
                nodeName: 'DIV id=\'testElementFour\'',
                reason: undefined,
                stackTrace: [
                    {
                        columnNumber: 46,
                        functionName: 'testFuncs.changeAttributeAndDisplay',
                        lineNumber: 45,
                        scriptId: '86',
                        url: 'https://chromedevtools.github.io/performance-stories/style-invalidations/app.js',
                    },
                ],
            },
            {
                nodeId: 110,
                nodeName: 'DIV id=\'testElementFour\'',
                reason: 'StyleInvalidator',
                stackTrace: [
                    {
                        columnNumber: 46,
                        functionName: 'testFuncs.changeAttributeAndDisplay',
                        lineNumber: 45,
                        scriptId: '86',
                        url: 'https://chromedevtools.github.io/performance-stories/style-invalidations/app.js',
                    },
                ],
            },
            {
                nodeId: 110,
                nodeName: 'DIV id=\'testElementFour\'',
                reason: 'Attribute',
                stackTrace: [
                    {
                        columnNumber: 46,
                        functionName: 'testFuncs.changeAttributeAndDisplay',
                        lineNumber: 45,
                        scriptId: '86',
                        url: 'https://chromedevtools.github.io/performance-stories/style-invalidations/app.js',
                    },
                ],
            },
            {
                nodeId: 111,
                nodeName: 'DIV id=\'testElementFive\'',
                reason: undefined,
                stackTrace: [
                    {
                        columnNumber: 46,
                        functionName: 'testFuncs.changeAttributeAndDisplay',
                        lineNumber: 46,
                        scriptId: '86',
                        url: 'https://chromedevtools.github.io/performance-stories/style-invalidations/app.js',
                    },
                ],
            },
            {
                nodeId: 111,
                nodeName: 'DIV id=\'testElementFive\'',
                reason: 'StyleInvalidator',
                stackTrace: [
                    {
                        columnNumber: 46,
                        functionName: 'testFuncs.changeAttributeAndDisplay',
                        lineNumber: 46,
                        scriptId: '86',
                        url: 'https://chromedevtools.github.io/performance-stories/style-invalidations/app.js',
                    },
                ],
            },
            {
                nodeId: 111,
                nodeName: 'DIV id=\'testElementFive\'',
                reason: 'Attribute',
                stackTrace: [
                    {
                        columnNumber: 46,
                        functionName: 'testFuncs.changeAttributeAndDisplay',
                        lineNumber: 46,
                        scriptId: '86',
                        url: 'https://chromedevtools.github.io/performance-stories/style-invalidations/app.js',
                    },
                ],
            },
            {
                nodeId: 110,
                nodeName: 'DIV id=\'testElementFour\'',
                reason: 'Element has pending invalidation list',
                stackTrace: undefined,
            },
            {
                nodeId: 111,
                nodeName: 'DIV id=\'testElementFive\'',
                reason: 'Element has pending invalidation list',
                stackTrace: undefined,
            },
        ]);
    });
    it('limits the number of kept invalidations per event', async function () {
        const events = await TraceLoader.rawEvents(this, 'over-20-invalidations-per-event.json.gz');
        Trace.Handlers.ModelHandlers.Invalidations.handleUserConfig({
            ...Trace.Types.Configuration.defaults(),
            maxInvalidationEventsPerEvent: 5,
        });
        for (const event of events) {
            Trace.Handlers.ModelHandlers.Invalidations.handleEvent(event);
        }
        await Trace.Handlers.ModelHandlers.Invalidations.finalize();
        const data = Trace.Handlers.ModelHandlers.Invalidations.data();
        // Find the UpdateLayoutEvent that had 26 invalidations
        const layoutEvent = Array.from(data.invalidationCountForEvent.entries())
            .filter(entry => {
            const [, count] = entry;
            return count === 26;
        })
            .map(entry => entry[0])
            .at(0);
        assert.isOk(layoutEvent);
        const invalidations = data.invalidationsForEvent.get(layoutEvent);
        assert.isOk(invalidations);
        // We know there are 26 invalidation events, but the handler only kept the last 5 as per the config we passed in.
        assert.lengthOf(invalidations, 5);
    });
});
//# sourceMappingURL=InvalidationsHandler.test.js.map