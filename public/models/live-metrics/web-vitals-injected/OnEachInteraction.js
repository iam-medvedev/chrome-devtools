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
        buffered: false,
    });
    eventObserver.observe({
        type: 'event',
        durationThreshold: 0,
        // Interaction events can only be stored to the buffer if their duration is >=104ms.
        // https://www.w3.org/TR/event-timing/#sec-events-exposed
        //
        // This means we can only collect a subset of interactions that happen before this observer is started.
        // To avoid confusion, we only collect interactions that after this observer has started.
        // Note: This DOES NOT affect the collection for the INP metric and so INP will still be restored from the buffer.
        buffered: false,
    });
}
//# sourceMappingURL=OnEachInteraction.js.map