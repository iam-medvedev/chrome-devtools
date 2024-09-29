// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
export const EVENT_BINDING_NAME = '__chromium_devtools_metrics_reporter';
export const INTERNAL_KILL_SWITCH = '__chromium_devtools_kill_live_metrics';
/**
 * An interaction can have multiple associated `PerformanceEventTiming`s.
 * The `interactionId` available on `PerformanceEventTiming` isn't guaranteed to be unique. (e.g. a `keyup` event issued long after a `keydown` event will have the same `interactionId`).
 * Double-keying with the start time of the longest entry should uniquely identify each interaction.
 */
export function getUniqueInteractionId(entries) {
    const longestEntry = entries.reduce((prev, curr) => {
        if (prev.duration === curr.duration) {
            return prev.startTime < curr.startTime ? prev : curr;
        }
        return prev.duration > curr.duration ? prev : curr;
    });
    return `interaction-${longestEntry.interactionId}-${longestEntry.startTime}`;
}
//# sourceMappingURL=spec.js.map