// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/**
 * Given an event that the user has selected, this function returns all the
 * data of events and their initiators that need to be drawn on the flamechart.
 * The reason that this can return multiple InitiatorEntry objects is because we draw the
 * entire chain: for each, we see if it had an initiator, and
 * work backwards to draw each one, as well as the events initiated directly by the entry.
 */
export function initiatorsDataToDraw(parsedTrace, selectedEvent, hiddenEntries, expandableEntries) {
    const initiatorsData = [
        ...findInitiatorDataPredecessors(parsedTrace, selectedEvent, parsedTrace.Initiators.eventToInitiator),
        ...findInitiatorDataDirectSuccessors(selectedEvent, parsedTrace.Initiators.initiatorToEvents),
    ];
    // For each InitiatorData, call a function that makes sure that neither the initiator or initiated entry is hidden.
    // If they are, it will reassign the event or initiator to the closest ancestor.
    initiatorsData.forEach(initiatorData => getClosestVisibleInitiatorEntriesAncestors(initiatorData, expandableEntries, hiddenEntries, parsedTrace));
    return initiatorsData;
}
export function initiatorsDataToDrawForNetwork(parsedTrace, selectedEvent) {
    return findInitiatorDataPredecessors(parsedTrace, selectedEvent, parsedTrace.NetworkRequests.eventToInitiator);
}
function findInitiatorDataPredecessors(parsedTrace, selectedEvent, eventToInitiator) {
    const initiatorsData = [];
    let currentEvent = selectedEvent;
    const visited = new Set();
    visited.add(currentEvent);
    // Build event initiator data up to the selected one
    while (currentEvent) {
        const currentInitiator = eventToInitiator.get(currentEvent);
        if (currentInitiator) {
            if (visited.has(currentInitiator)) {
                break;
            }
            // Store the current initiator data, and then set the initiator to
            // be the current event, so we work back through the
            // trace and find the initiator of the initiator, and so
            // on...
            initiatorsData.push({ event: currentEvent, initiator: currentInitiator });
            currentEvent = currentInitiator;
            visited.add(currentEvent);
            continue;
        }
        const nodeForCurrentEvent = parsedTrace.Renderer.entryToNode.get(currentEvent);
        if (!nodeForCurrentEvent) {
            // Should not happen - if it does something odd is going
            // on so let's give up.
            currentEvent = null;
            break;
        }
        // Go up to the parent, and loop again.
        currentEvent = nodeForCurrentEvent.parent?.entry || null;
    }
    return initiatorsData;
}
function findInitiatorDataDirectSuccessors(selectedEvent, initiatorToEvents) {
    const initiatorsData = [];
    // Add all of the initiated events to the initiatorsData array.
    const eventsInitiatedByCurrent = initiatorToEvents.get(selectedEvent);
    if (eventsInitiatedByCurrent) {
        eventsInitiatedByCurrent.forEach(event => {
            initiatorsData.push({ event, initiator: selectedEvent });
        });
    }
    return initiatorsData;
}
/**
 * Given an InitiatorData object that contains an initiator and event, this function returns
 * the closest visible ancestors. We need to apply this to each initiatorData because
 * the actual initiator or initiated event might be hidden form the flame chart.
 * If neither entry is hidden, this function returns the initial initiatorData object.
 */
function getClosestVisibleInitiatorEntriesAncestors(initiatorData, expandableEntries, hiddenEntries, parsedTrace) {
    if (hiddenEntries.includes(initiatorData.event)) {
        let nextParent = parsedTrace.Renderer.entryToNode.get(initiatorData.event)?.parent;
        while (nextParent?.entry && !expandableEntries.includes(nextParent?.entry)) {
            nextParent = nextParent.parent ?? undefined;
        }
        initiatorData.event = nextParent?.entry ?? initiatorData.event;
        initiatorData.isEntryHidden = true;
    }
    if (hiddenEntries.includes(initiatorData.initiator)) {
        let nextParent = parsedTrace.Renderer.entryToNode.get(initiatorData.initiator)?.parent;
        while (nextParent?.entry && !expandableEntries.includes(nextParent?.entry)) {
            nextParent = nextParent.parent ?? undefined;
        }
        initiatorData.initiator = nextParent?.entry ?? initiatorData.initiator;
        initiatorData.isInitiatorHidden = true;
    }
    return initiatorData;
}
//# sourceMappingURL=Initiators.js.map