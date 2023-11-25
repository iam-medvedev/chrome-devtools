import * as Platform from '../../../core/platform/platform.js';
// Cache film strips based on:
// 1. The trace parsed data object
// 2. The start time.
const filmStripCache = new Map();
export function fromTraceData(traceData, customZeroTime) {
    const frames = [];
    const zeroTime = typeof customZeroTime !== 'undefined' ? customZeroTime : traceData.Meta.traceBounds.min;
    const spanTime = traceData.Meta.traceBounds.range;
    const fromCache = filmStripCache.get(traceData)?.get(zeroTime);
    if (fromCache) {
        return fromCache;
    }
    for (const screenshot of traceData.Screenshots) {
        if (screenshot.ts < zeroTime) {
            continue;
        }
        const frame = {
            index: frames.length,
            screenshotEvent: screenshot,
            screenshotAsString: screenshot.args.snapshot,
        };
        frames.push(frame);
    }
    const result = {
        zeroTime,
        spanTime,
        frames: Array.from(frames),
    };
    const cachedForData = Platform.MapUtilities.getWithDefault(filmStripCache, traceData, () => new Map());
    cachedForData.set(zeroTime, result);
    return result;
}
export function frameClosestToTimestamp(filmStrip, searchTimestamp) {
    const closestFrameIndexBeforeTimestamp = Platform.ArrayUtilities.nearestIndexFromEnd(filmStrip.frames, frame => frame.screenshotEvent.ts < searchTimestamp);
    if (closestFrameIndexBeforeTimestamp === null) {
        return null;
    }
    return filmStrip.frames[closestFrameIndexBeforeTimestamp];
}
//# sourceMappingURL=FilmStrip.js.map