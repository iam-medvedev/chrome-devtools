// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as EnvironmentHelpers from '../../../../../test/unittests/front_end/helpers/EnvironmentHelpers.js';
import * as TraceLoader from '../../../../../test/unittests/front_end/helpers/TraceLoader.js';
import * as TraceEngine from '../../../../models/trace/trace.js';
import * as Timeline from '../../../../panels/timeline/timeline.js';
import * as ComponentSetup from '../../helpers/helpers.js';
await EnvironmentHelpers.initializeGlobalVars();
await ComponentSetup.ComponentServerSetup.setup();
const container = document.querySelector('div.container');
if (!container) {
    throw new Error('could not find container');
}
const params = new URLSearchParams(window.location.search);
const fileName = (params.get('trace') || 'web-dev') + '.json.gz';
const customStartWindowTime = params.get('windowStart');
const customEndWindowTime = params.get('windowEnd');
async function renderMiniMap(containerSelector, options) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        throw new Error('could not find container');
    }
    const models = await TraceLoader.TraceLoader.allModels(null, fileName);
    const mainThread = TraceEngine.Handlers.Threads
        .threadsInRenderer(models.traceParsedData.Renderer, models.traceParsedData.AuctionWorklets)
        .find(t => t.type === "MAIN_THREAD" /* TraceEngine.Handlers.Threads.ThreadType.MAIN_THREAD */);
    if (!mainThread) {
        throw new Error('Could not find main thread.');
    }
    const zoomedWindow = TraceEngine.Extras.MainThreadActivity.calculateWindow(models.traceParsedData.Meta.traceBounds, mainThread.entries);
    const zoomedWindowMilli = TraceEngine.Helpers.Timing.traceWindowMilliSeconds(zoomedWindow);
    models.performanceModel.setWindow({
        left: zoomedWindowMilli.min,
        right: zoomedWindowMilli.max,
    });
    const minimap = new Timeline.TimelineMiniMap.TimelineMiniMap();
    minimap.activateBreadcrumbs();
    minimap.markAsRoot();
    minimap.show(container);
    const bounds = TraceEngine.Helpers.Timing.traceWindowMilliSeconds(models.traceParsedData.Meta.traceBounds);
    minimap.setBounds(TraceEngine.Types.Timing.MilliSeconds(bounds.min), TraceEngine.Types.Timing.MilliSeconds(bounds.max));
    minimap.setData({
        traceParsedData: models.traceParsedData,
        settings: {
            showMemory: options.showMemory,
            showScreenshots: true,
        },
    });
    if (customStartWindowTime && customEndWindowTime) {
        minimap.setWindowTimes(Number(customStartWindowTime), Number(customEndWindowTime));
    }
    else {
        minimap.setWindowTimes(models.performanceModel.window().left, models.performanceModel.window().right);
    }
}
await renderMiniMap('.container', { showMemory: false });
await renderMiniMap('.container-with-memory', { showMemory: true });
//# sourceMappingURL=overview.js.map