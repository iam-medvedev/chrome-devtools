// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
export function onEachInteraction(callback) {
    const eventObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const interactions = new Map();
        const performanceEventTimings = entries.filter((entry) => 'interactionId' in entry)
            .filter(entry => entry.interactionId);
        for (const entry of performanceEventTimings) {
            const interaction = interactions.get(entry.interactionId) || [];
            interaction.push(entry);
            interactions.set(entry.interactionId, interaction);
        }
        // Will report as a single interaction even if parts are in separate frames.
        // Consider splitting by animation frame.
        for (const [interactionId, interaction] of interactions.entries()) {
            const longestEntry = interaction.reduce((prev, curr) => prev.duration >= curr.duration ? prev : curr);
            const value = longestEntry.duration;
            const firstEntryWithTarget = interaction.find(entry => entry.target);
            callback({
                attribution: {
                    interactionTargetElement: firstEntryWithTarget?.target ?? null,
                    interactionTime: longestEntry.startTime,
                    interactionType: longestEntry.name.startsWith('key') ? 'keyboard' : 'pointer',
                    interactionId,
                },
                entries: interaction,
                value,
            });
        }
    });
    eventObserver.observe({
        type: 'first-input',
        buffered: true,
    });
    eventObserver.observe({
        type: 'event',
        durationThreshold: 0,
        buffered: true,
    });
}
//# sourceMappingURL=OnEachInteraction.js.map