// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Platform from '../../../core/platform/platform.js';
import * as Helpers from '../helpers/helpers.js';
import * as Types from '../types/types.js';
export function deps() {
    return ['Meta', 'Animations', 'LayoutShifts', 'NetworkRequests'];
}
/**
 * Each failure reason is represented by a bit flag. The bit shift operator '<<' is used to define
 * which bit corresponds to each failure reason.
 * https://source.chromium.org/search?q=f:compositor_animations.h%20%22enum%20FailureReason%22
 * @type {{flag: number, failure: AnimationFailureReasons}[]}
 */
const ACTIONABLE_FAILURE_REASONS = [
    {
        flag: 1 << 0,
        failure: "ACCELERATED_ANIMATIONS_DISABLED" /* AnimationFailureReasons.ACCELERATED_ANIMATIONS_DISABLED */,
    },
    {
        flag: 1 << 1,
        failure: "EFFECT_SUPPRESSED_BY_DEVTOOLS" /* AnimationFailureReasons.EFFECT_SUPPRESSED_BY_DEVTOOLS */,
    },
    {
        flag: 1 << 2,
        failure: "INVALID_ANIMATION_OR_EFFECT" /* AnimationFailureReasons.INVALID_ANIMATION_OR_EFFECT */,
    },
    {
        flag: 1 << 3,
        failure: "EFFECT_HAS_UNSUPPORTED_TIMING_PARAMS" /* AnimationFailureReasons.EFFECT_HAS_UNSUPPORTED_TIMING_PARAMS */,
    },
    {
        flag: 1 << 4,
        failure: "EFFECT_HAS_NON_REPLACE_COMPOSITE_MODE" /* AnimationFailureReasons.EFFECT_HAS_NON_REPLACE_COMPOSITE_MODE */,
    },
    {
        flag: 1 << 5,
        failure: "TARGET_HAS_INVALID_COMPOSITING_STATE" /* AnimationFailureReasons.TARGET_HAS_INVALID_COMPOSITING_STATE */,
    },
    {
        flag: 1 << 6,
        failure: "TARGET_HAS_INCOMPATIBLE_ANIMATIONS" /* AnimationFailureReasons.TARGET_HAS_INCOMPATIBLE_ANIMATIONS */,
    },
    {
        flag: 1 << 7,
        failure: "TARGET_HAS_CSS_OFFSET" /* AnimationFailureReasons.TARGET_HAS_CSS_OFFSET */,
    },
    // The failure 1 << 8 is marked as obsolete in Blink
    {
        flag: 1 << 9,
        failure: "ANIMATION_AFFECTS_NON_CSS_PROPERTIES" /* AnimationFailureReasons.ANIMATION_AFFECTS_NON_CSS_PROPERTIES */,
    },
    {
        flag: 1 << 10,
        failure: "TRANSFORM_RELATED_PROPERTY_CANNOT_BE_ACCELERATED_ON_TARGET" /* AnimationFailureReasons.TRANSFORM_RELATED_PROPERTY_CANNOT_BE_ACCELERATED_ON_TARGET */,
    },
    {
        flag: 1 << 11,
        failure: "TRANSFROM_BOX_SIZE_DEPENDENT" /* AnimationFailureReasons.TRANSFROM_BOX_SIZE_DEPENDENT */,
    },
    {
        flag: 1 << 12,
        failure: "FILTER_RELATED_PROPERTY_MAY_MOVE_PIXELS" /* AnimationFailureReasons.FILTER_RELATED_PROPERTY_MAY_MOVE_PIXELS */,
    },
    {
        flag: 1 << 13,
        failure: "UNSUPPORTED_CSS_PROPERTY" /* AnimationFailureReasons.UNSUPPORTED_CSS_PROPERTY */,
    },
    // The failure 1 << 14 is marked as obsolete in Blink
    {
        flag: 1 << 15,
        failure: "MIXED_KEYFRAME_VALUE_TYPES" /* AnimationFailureReasons.MIXED_KEYFRAME_VALUE_TYPES */,
    },
    {
        flag: 1 << 16,
        failure: "TIMELINE_SOURCE_HAS_INVALID_COMPOSITING_STATE" /* AnimationFailureReasons.TIMELINE_SOURCE_HAS_INVALID_COMPOSITING_STATE */,
    },
    {
        flag: 1 << 17,
        failure: "ANIMATION_HAS_NO_VISIBLE_CHANGE" /* AnimationFailureReasons.ANIMATION_HAS_NO_VISIBLE_CHANGE */,
    },
    {
        flag: 1 << 18,
        failure: "AFFECTS_IMPORTANT_PROPERTY" /* AnimationFailureReasons.AFFECTS_IMPORTANT_PROPERTY */,
    },
    {
        flag: 1 << 19,
        failure: "SVG_TARGET_HAS_INDEPENDENT_TRANSFORM_PROPERTY" /* AnimationFailureReasons.SVG_TARGET_HAS_INDEPENDENT_TRANSFORM_PROPERTY */,
    },
];
// 500ms window.
// Use this window to consider events and requests that may have caused a layout shift.
const ROOT_CAUSE_WINDOW = Helpers.Timing.secondsToMicroseconds(Types.Timing.Seconds(0.5));
/**
 * Returns if an event happens within the root cause window, before the target event.
 *          ROOT_CAUSE_WINDOW               v target event
 *        |------------------------|=======================
 */
function isInRootCauseWindow(event, targetEvent) {
    const eventEnd = event.dur ? event.ts + event.dur : event.ts;
    return eventEnd < targetEvent.ts && eventEnd >= targetEvent.ts - ROOT_CAUSE_WINDOW;
}
export function getNonCompositedFailure(animationEvent) {
    const failures = [];
    const beginEvent = animationEvent.args.data.beginEvent;
    const instantEvents = animationEvent.args.data.instantEvents || [];
    /**
     * Animation events containing composite information are ASYNC_NESTABLE_INSTANT ('n').
     * An animation may also contain multiple 'n' events, so we look through those with useful non-composited data.
     */
    for (const event of instantEvents) {
        const failureMask = event.args.data.compositeFailed;
        const unsupportedProperties = event.args.data.unsupportedProperties;
        if (!failureMask) {
            continue;
        }
        const failureReasons = ACTIONABLE_FAILURE_REASONS.filter(reason => failureMask & reason.flag).map(reason => reason.failure);
        const failure = {
            name: beginEvent.args.data.displayName,
            failureReasons,
            unsupportedProperties,
            animation: animationEvent,
        };
        failures.push(failure);
    }
    return failures;
}
function getNonCompositedFailureRootCauses(animationEvents, prePaintEvents, shiftsByPrePaint, rootCausesByShift) {
    const allAnimationFailures = [];
    for (const animation of animationEvents) {
        /**
         * Animation events containing composite information are ASYNC_NESTABLE_INSTANT ('n').
         * An animation may also contain multiple 'n' events, so we look through those with useful non-composited data.
         */
        const failures = getNonCompositedFailure(animation);
        if (!failures) {
            continue;
        }
        allAnimationFailures.push(...failures);
        const nextPrePaint = getNextEvent(prePaintEvents, animation);
        // If no following prePaint, this is not a root cause.
        if (!nextPrePaint) {
            continue;
        }
        // If the animation event is outside the ROOT_CAUSE_WINDOW, it could not be a root cause.
        if (!isInRootCauseWindow(animation, nextPrePaint)) {
            continue;
        }
        const shifts = shiftsByPrePaint.get(nextPrePaint);
        // if no layout shift(s), this is not a root cause.
        if (!shifts) {
            continue;
        }
        for (const shift of shifts) {
            const rootCausesForShift = rootCausesByShift.get(shift);
            if (!rootCausesForShift) {
                throw new Error('Unaccounted shift');
            }
            rootCausesForShift.nonCompositedAnimations.push(...failures);
        }
    }
    return allAnimationFailures;
}
/**
 * Given an array of layout shift and PrePaint events, returns a mapping from
 * PrePaint events to layout shifts dispatched within it.
 */
function getShiftsByPrePaintEvents(layoutShifts, prePaintEvents) {
    // Maps from PrePaint events to LayoutShifts that occured in each one.
    const shiftsByPrePaint = new Map();
    // Associate all shifts to their corresponding PrePaint.
    for (const prePaintEvent of prePaintEvents) {
        const firstShiftIndex = Platform.ArrayUtilities.nearestIndexFromBeginning(layoutShifts, shift => shift.ts >= prePaintEvent.ts);
        if (firstShiftIndex === null) {
            // No layout shifts registered after this PrePaint start. Continue.
            continue;
        }
        for (let i = firstShiftIndex; i < layoutShifts.length; i++) {
            const shift = layoutShifts[i];
            if (shift.ts >= prePaintEvent.ts && shift.ts <= prePaintEvent.ts + prePaintEvent.dur) {
                const shiftsInPrePaint = Platform.MapUtilities.getWithDefault(shiftsByPrePaint, prePaintEvent, () => []);
                shiftsInPrePaint.push(shift);
            }
            if (shift.ts > prePaintEvent.ts + prePaintEvent.dur) {
                // Reached all layoutShifts of this PrePaint. Break out to continue with the next prePaint event.
                break;
            }
        }
    }
    return shiftsByPrePaint;
}
/**
 * Given a source event list, this returns the first event of that list that directly follows the target event.
 */
function getNextEvent(sourceEvents, targetEvent) {
    const index = Platform.ArrayUtilities.nearestIndexFromBeginning(sourceEvents, source => source.ts > targetEvent.ts + (targetEvent.dur || 0));
    // No PrePaint event registered after this event
    if (index === null) {
        return undefined;
    }
    return sourceEvents[index];
}
/**
 * An Iframe is considered a root cause if the iframe event occurs before a prePaint event
 * and within this prePaint event a layout shift(s) occurs.
 */
function getIframeRootCauses(iframeCreatedEvents, prePaintEvents, shiftsByPrePaint, rootCausesByShift, domLoadingEvents) {
    for (const iframeEvent of iframeCreatedEvents) {
        const nextPrePaint = getNextEvent(prePaintEvents, iframeEvent);
        // If no following prePaint, this is not a root cause.
        if (!nextPrePaint) {
            continue;
        }
        const shifts = shiftsByPrePaint.get(nextPrePaint);
        // if no layout shift(s), this is not a root cause.
        if (!shifts) {
            continue;
        }
        for (const shift of shifts) {
            const rootCausesForShift = rootCausesByShift.get(shift);
            if (!rootCausesForShift) {
                throw new Error('Unaccounted shift');
            }
            // Look for the first dom event that occurs within the bounds of the iframe event.
            // This contains the frame id.
            const domEvent = domLoadingEvents.find(e => {
                const maxIframe = Types.Timing.MicroSeconds(iframeEvent.ts + (iframeEvent.dur ?? 0));
                return e.ts >= iframeEvent.ts && e.ts <= maxIframe;
            });
            if (domEvent && domEvent.args.frame) {
                rootCausesForShift.iframeIds.push(domEvent.args.frame);
            }
        }
    }
    return rootCausesByShift;
}
/**
 * An unsized image is considered a root cause if its PaintImage can be correlated to a
 * layout shift. We can correlate PaintImages with unsized images by their matching nodeIds.
 *                           X      <- layout shift
 *              |----------------|
 *                    ^ PrePaint event   |-----|
 *                                          ^ PaintImage
 */
function getUnsizedImageRootCauses(unsizedImageEvents, paintImageEvents, shiftsByPrePaint, rootCausesByShift) {
    shiftsByPrePaint.forEach((shifts, prePaint) => {
        const paintImage = getNextEvent(paintImageEvents, prePaint);
        // The unsized image corresponds to this PaintImage.
        const matchingNode = unsizedImageEvents.find(unsizedImage => unsizedImage.args.data.nodeId === paintImage?.args.data.nodeId);
        if (!matchingNode) {
            return;
        }
        // The unsized image is a potential root cause of all the shifts of this prePaint.
        for (const shift of shifts) {
            const rootCausesForShift = rootCausesByShift.get(shift);
            if (!rootCausesForShift) {
                throw new Error('Unaccounted shift');
            }
            rootCausesForShift.unsizedImages.push(matchingNode.args.data.nodeId);
        }
    });
    return rootCausesByShift;
}
/**
 * A font request is considered a root cause if the request occurs before a prePaint event
 * and within this prePaint event a layout shift(s) occurs. Additionally, this font request should
 * happen within the ROOT_CAUSE_WINDOW of the prePaint event.
 */
function getFontRootCauses(networkRequests, prePaintEvents, shiftsByPrePaint, rootCausesByShift) {
    const fontRequests = networkRequests.filter(req => req.args.data.resourceType === 'Font' && req.args.data.mimeType.startsWith('font'));
    for (const req of fontRequests) {
        const nextPrePaint = getNextEvent(prePaintEvents, req);
        if (!nextPrePaint) {
            continue;
        }
        // If the req is outside the ROOT_CAUSE_WINDOW, it could not be a root cause.
        if (!isInRootCauseWindow(req, nextPrePaint)) {
            continue;
        }
        // Get the shifts that belong to this prepaint
        const shifts = shiftsByPrePaint.get(nextPrePaint);
        // if no layout shift(s) in this prePaint, the request is not a root cause.
        if (!shifts) {
            continue;
        }
        // Include the root cause to the shifts in this prePaint.
        for (const shift of shifts) {
            const rootCausesForShift = rootCausesByShift.get(shift);
            if (!rootCausesForShift) {
                throw new Error('Unaccounted shift');
            }
            rootCausesForShift.fontRequests.push(req);
        }
    }
    return rootCausesByShift;
}
export function generateInsight(parsedTrace, context) {
    const isWithinContext = (event) => Helpers.Timing.eventIsInBounds(event, context.bounds);
    const compositeAnimationEvents = parsedTrace.Animations.animations.filter(isWithinContext);
    const iframeEvents = parsedTrace.LayoutShifts.renderFrameImplCreateChildFrameEvents.filter(isWithinContext);
    const networkRequests = parsedTrace.NetworkRequests.byTime.filter(isWithinContext);
    const domLoadingEvents = parsedTrace.LayoutShifts.domLoadingEvents.filter(isWithinContext);
    const unsizedImageEvents = parsedTrace.LayoutShifts.layoutImageUnsizedEvents.filter(isWithinContext);
    const clusterKey = context.navigation ? context.navigationId : Types.Events.NO_NAVIGATION;
    const clusters = parsedTrace.LayoutShifts.clustersByNavigationId.get(clusterKey) ?? [];
    const clustersByScore = clusters.toSorted((a, b) => b.clusterCumulativeScore - a.clusterCumulativeScore);
    const worstCluster = clustersByScore.at(0);
    const layoutShifts = clusters.flatMap(cluster => cluster.events);
    const prePaintEvents = parsedTrace.LayoutShifts.prePaintEvents.filter(isWithinContext);
    const paintImageEvents = parsedTrace.LayoutShifts.paintImageEvents.filter(isWithinContext);
    // Get root causes.
    const rootCausesByShift = new Map();
    const shiftsByPrePaint = getShiftsByPrePaintEvents(layoutShifts, prePaintEvents);
    for (const shift of layoutShifts) {
        rootCausesByShift.set(shift, { iframeIds: [], fontRequests: [], nonCompositedAnimations: [], unsizedImages: [] });
    }
    // Populate root causes for rootCausesByShift.
    getIframeRootCauses(iframeEvents, prePaintEvents, shiftsByPrePaint, rootCausesByShift, domLoadingEvents);
    getFontRootCauses(networkRequests, prePaintEvents, shiftsByPrePaint, rootCausesByShift);
    getUnsizedImageRootCauses(unsizedImageEvents, paintImageEvents, shiftsByPrePaint, rootCausesByShift);
    const animationFailures = getNonCompositedFailureRootCauses(compositeAnimationEvents, prePaintEvents, shiftsByPrePaint, rootCausesByShift);
    const relatedEvents = [...layoutShifts];
    if (worstCluster) {
        relatedEvents.push(worstCluster);
    }
    return {
        relatedEvents,
        animationFailures,
        shifts: rootCausesByShift,
        clusters,
        worstCluster,
    };
}
//# sourceMappingURL=CumulativeLayoutShift.js.map