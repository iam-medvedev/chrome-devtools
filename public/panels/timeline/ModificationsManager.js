// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import * as Trace from '../../models/trace/trace.js';
import * as TimelineComponents from '../../panels/timeline/components/components.js';
import { EntriesFilter } from './EntriesFilter.js';
import { EventsSerializer } from './EventsSerializer.js';
import * as Overlays from './overlays/overlays.js';
const modificationsManagerByTraceIndex = [];
let activeManager;
// Event dispatched after an annotation was added, removed or updated.
// The event argument is the Overlay that needs to be created,removed
// or updated by `Overlays.ts` and the action that needs to be applied to it.
export class AnnotationModifiedEvent extends Event {
    overlay;
    action;
    static eventName = 'annotationmodifiedevent';
    constructor(overlay, action) {
        super(AnnotationModifiedEvent.eventName);
        this.overlay = overlay;
        this.action = action;
    }
}
export class ModificationsManager extends EventTarget {
    #entriesFilter;
    #timelineBreadcrumbs;
    #modifications = null;
    #parsedTrace;
    #eventsSerializer;
    #overlayForAnnotation;
    #annotationsHiddenSetting;
    /**
     * Gets the ModificationsManager instance corresponding to a trace
     * given its index used in Model#traces. If no index is passed gets
     * the manager instance for the last trace. If no instance is found,
     * throws.
     */
    static activeManager() {
        return activeManager;
    }
    static reset() {
        modificationsManagerByTraceIndex.length = 0;
        activeManager = null;
    }
    /**
     * Initializes a ModificationsManager instance for a parsed trace or changes the active manager for an existing one.
     * This needs to be called if and a trace has been parsed or switched to.
     */
    static initAndActivateModificationsManager(traceModel, traceIndex) {
        // If a manager for a given index has already been created, active it.
        if (modificationsManagerByTraceIndex[traceIndex]) {
            if (activeManager === modificationsManagerByTraceIndex[traceIndex]) {
                return activeManager;
            }
            activeManager = modificationsManagerByTraceIndex[traceIndex];
            ModificationsManager.activeManager()?.applyModificationsIfPresent();
        }
        const parsedTrace = traceModel.parsedTrace(traceIndex);
        if (!parsedTrace) {
            throw new Error('ModificationsManager was initialized without a corresponding trace data');
        }
        const traceBounds = parsedTrace.Meta.traceBounds;
        const traceEvents = traceModel.rawTraceEvents(traceIndex);
        if (!traceEvents) {
            throw new Error('ModificationsManager was initialized without a corresponding raw trace events array');
        }
        const syntheticEventsManager = traceModel.syntheticTraceEventsManager(traceIndex);
        if (!syntheticEventsManager) {
            throw new Error('ModificationsManager was initialized without a corresponding SyntheticEventsManager');
        }
        const metadata = traceModel.metadata(traceIndex);
        const newModificationsManager = new ModificationsManager({
            parsedTrace,
            traceBounds,
            rawTraceEvents: traceEvents,
            modifications: metadata?.modifications,
            syntheticEvents: syntheticEventsManager.getSyntheticTraces(),
        });
        modificationsManagerByTraceIndex[traceIndex] = newModificationsManager;
        activeManager = newModificationsManager;
        ModificationsManager.activeManager()?.applyModificationsIfPresent();
        return this.activeManager();
    }
    constructor({ parsedTrace, traceBounds, modifications }) {
        super();
        const entryToNodeMap = new Map([...parsedTrace.Samples.entryToNode, ...parsedTrace.Renderer.entryToNode]);
        this.#entriesFilter = new EntriesFilter(entryToNodeMap);
        // Create first breadcrumb from the initial full window
        this.#timelineBreadcrumbs = new TimelineComponents.Breadcrumbs.Breadcrumbs(traceBounds);
        this.#modifications = modifications || null;
        this.#parsedTrace = parsedTrace;
        this.#eventsSerializer = new EventsSerializer();
        // This method is also called in SidebarAnnotationsTab, but calling this multiple times doesn't recreate the setting.
        // Instead, after the second call, the cached setting is returned.
        this.#annotationsHiddenSetting = Common.Settings.Settings.instance().moduleSetting('annotations-hidden');
        // TODO: Assign annotations loaded from the trace file
        this.#overlayForAnnotation = new Map();
    }
    getEntriesFilter() {
        return this.#entriesFilter;
    }
    getTimelineBreadcrumbs() {
        return this.#timelineBreadcrumbs;
    }
    createAnnotation(newAnnotation, loadedFromFile = false) {
        // If a label already exists on an entry and a user is trying to create a new one, start editing an existing label instead.
        if (newAnnotation.type === 'ENTRY_LABEL') {
            const overlay = this.#findLabelOverlayForEntry(newAnnotation.entry);
            if (overlay) {
                this.dispatchEvent(new AnnotationModifiedEvent(overlay, 'EnterLabelEditState'));
                return;
            }
        }
        // If the new annotation created was not loaded from the file, set the annotations visibility setting to true. That way we make sure
        // the annotations are on when a new one is created.
        if (!loadedFromFile) {
            // Time range annotation could also be used to check the length of a selection in the timeline. Therefore, only set the annotations
            // hidden to true if annotations label is added. This is done in OverlaysImpl.
            if (newAnnotation.type !== 'TIME_RANGE') {
                this.#annotationsHiddenSetting.set(false);
            }
        }
        const newOverlay = this.#createOverlayFromAnnotation(newAnnotation);
        this.#overlayForAnnotation.set(newAnnotation, newOverlay);
        this.dispatchEvent(new AnnotationModifiedEvent(newOverlay, 'Add'));
    }
    #findLabelOverlayForEntry(entry) {
        for (const [annotation, overlay] of this.#overlayForAnnotation.entries()) {
            if (annotation.type === 'ENTRY_LABEL' && annotation.entry === entry) {
                return overlay;
            }
        }
        return null;
    }
    #createOverlayFromAnnotation(annotation) {
        switch (annotation.type) {
            case 'ENTRY_LABEL':
                return {
                    type: 'ENTRY_LABEL',
                    entry: annotation.entry,
                    label: annotation.label,
                };
            case 'TIME_RANGE':
                return {
                    type: 'TIME_RANGE',
                    label: annotation.label,
                    showDuration: true,
                    bounds: annotation.bounds,
                };
            case 'ENTRIES_LINK':
                return {
                    type: 'ENTRIES_LINK',
                    entryFrom: annotation.entryFrom,
                    entryTo: annotation.entryTo,
                };
            default:
                Platform.assertNever(annotation, 'Overlay for provided annotation cannot be created');
        }
    }
    removeAnnotation(removedAnnotation) {
        const overlayToRemove = this.#overlayForAnnotation.get(removedAnnotation);
        if (!overlayToRemove) {
            console.warn('Overlay for deleted Annotation does not exist');
            return;
        }
        this.#overlayForAnnotation.delete(removedAnnotation);
        this.dispatchEvent(new AnnotationModifiedEvent(overlayToRemove, 'Remove'));
    }
    removeAnnotationOverlay(removedOverlay) {
        const annotationForRemovedOverlay = this.getAnnotationByOverlay(removedOverlay);
        if (!annotationForRemovedOverlay) {
            console.warn('Annotation for deleted Overlay does not exist');
            return;
        }
        this.#overlayForAnnotation.delete(annotationForRemovedOverlay);
        this.dispatchEvent(new AnnotationModifiedEvent(removedOverlay, 'Remove'));
    }
    updateAnnotation(updatedAnnotation) {
        const overlay = this.#overlayForAnnotation.get(updatedAnnotation);
        if (overlay && Overlays.Overlays.isTimeRangeLabel(overlay) &&
            Trace.Types.File.isTimeRangeAnnotation(updatedAnnotation)) {
            overlay.label = updatedAnnotation.label;
            overlay.bounds = updatedAnnotation.bounds;
            this.dispatchEvent(new AnnotationModifiedEvent(overlay, 'UpdateTimeRange'));
        }
        else if (overlay && Overlays.Overlays.isEntriesLink(overlay) &&
            Trace.Types.File.isEntriesLinkAnnotation(updatedAnnotation)) {
            overlay.entryFrom = updatedAnnotation.entryFrom;
            overlay.entryTo = updatedAnnotation.entryTo;
            this.dispatchEvent(new AnnotationModifiedEvent(overlay, 'UpdateLinkToEntry'));
        }
        else {
            console.error('Annotation could not be updated');
        }
    }
    updateAnnotationOverlay(updatedOverlay) {
        const annotationForUpdatedOverlay = this.getAnnotationByOverlay(updatedOverlay);
        if (!annotationForUpdatedOverlay) {
            console.warn('Annotation for updated Overlay does not exist');
            return;
        }
        if ((updatedOverlay.type === 'ENTRY_LABEL' && annotationForUpdatedOverlay.type === 'ENTRY_LABEL') ||
            (updatedOverlay.type === 'TIME_RANGE' && annotationForUpdatedOverlay.type === 'TIME_RANGE')) {
            this.#annotationsHiddenSetting.set(false);
            annotationForUpdatedOverlay.label = updatedOverlay.label;
        }
        this.dispatchEvent(new AnnotationModifiedEvent(updatedOverlay, 'UpdateLabel'));
    }
    getAnnotationByOverlay(overlay) {
        for (const [annotation, currOverlay] of this.#overlayForAnnotation.entries()) {
            if (currOverlay === overlay) {
                return annotation;
            }
        }
        return null;
    }
    getAnnotations() {
        return [...this.#overlayForAnnotation.keys()];
    }
    getOverlays() {
        return [...this.#overlayForAnnotation.values()];
    }
    /**
     * Builds all modifications into a serializable object written into
     * the 'modifications' trace file metadata field.
     */
    toJSON() {
        const hiddenEntries = this.#entriesFilter.invisibleEntries()
            .map(entry => this.#eventsSerializer.keyForEvent(entry))
            .filter(entry => entry !== null);
        const expandableEntries = this.#entriesFilter.expandableEntries()
            .map(entry => this.#eventsSerializer.keyForEvent(entry))
            .filter(entry => entry !== null);
        this.#modifications = {
            entriesModifications: {
                hiddenEntries,
                expandableEntries,
            },
            initialBreadcrumb: this.#timelineBreadcrumbs.initialBreadcrumb,
            annotations: this.#annotationsJSON(),
        };
        return this.#modifications;
    }
    #annotationsJSON() {
        const annotations = this.getAnnotations();
        const entryLabelsSerialized = [];
        const labelledTimeRangesSerialized = [];
        const linksBetweenEntriesSerialized = [];
        for (let i = 0; i < annotations.length; i++) {
            const currAnnotation = annotations[i];
            if (Trace.Types.File.isEntryLabelAnnotation(currAnnotation)) {
                const serializedEvent = this.#eventsSerializer.keyForEvent(currAnnotation.entry);
                if (serializedEvent) {
                    entryLabelsSerialized.push({
                        entry: serializedEvent,
                        label: currAnnotation.label,
                    });
                }
            }
            else if (Trace.Types.File.isTimeRangeAnnotation(currAnnotation)) {
                labelledTimeRangesSerialized.push({
                    bounds: currAnnotation.bounds,
                    label: currAnnotation.label,
                });
            }
            else if (Trace.Types.File.isEntriesLinkAnnotation(currAnnotation)) {
                // Only save the links between entries that are fully created and have the entry that it is pointing to set
                if (currAnnotation.entryTo) {
                    const serializedFromEvent = this.#eventsSerializer.keyForEvent(currAnnotation.entryFrom);
                    const serializedToEvent = this.#eventsSerializer.keyForEvent(currAnnotation.entryTo);
                    if (serializedFromEvent && serializedToEvent) {
                        linksBetweenEntriesSerialized.push({
                            entryFrom: serializedFromEvent,
                            entryTo: serializedToEvent,
                        });
                    }
                }
            }
        }
        return {
            entryLabels: entryLabelsSerialized,
            labelledTimeRanges: labelledTimeRangesSerialized,
            linksBetweenEntries: linksBetweenEntriesSerialized,
        };
    }
    applyModificationsIfPresent() {
        if (!this.#modifications || !this.#modifications.annotations) {
            return;
        }
        const hiddenEntries = this.#modifications.entriesModifications.hiddenEntries;
        const expandableEntries = this.#modifications.entriesModifications.expandableEntries;
        this.#timelineBreadcrumbs.setInitialBreadcrumbFromLoadedModifications(this.#modifications.initialBreadcrumb);
        this.#applyEntriesFilterModifications(hiddenEntries, expandableEntries);
        this.#applyStoredAnnotations(this.#modifications.annotations);
    }
    #applyStoredAnnotations(annotations) {
        try {
            // Assign annotations to an empty array if they don't exist to not
            // break the traces that were saved before those annotations were implemented
            const entryLabels = annotations.entryLabels ?? [];
            entryLabels.forEach(entryLabel => {
                this.createAnnotation({
                    type: 'ENTRY_LABEL',
                    entry: this.#eventsSerializer.eventForKey(entryLabel.entry, this.#parsedTrace),
                    label: entryLabel.label,
                }, true);
            });
            const timeRanges = annotations.labelledTimeRanges ?? [];
            timeRanges.forEach(timeRange => {
                this.createAnnotation({
                    type: 'TIME_RANGE',
                    bounds: timeRange.bounds,
                    label: timeRange.label,
                }, true);
            });
            const linksBetweenEntries = annotations.linksBetweenEntries ?? [];
            linksBetweenEntries.forEach(linkBetweenEntries => {
                this.createAnnotation({
                    type: 'ENTRIES_LINK',
                    entryFrom: this.#eventsSerializer.eventForKey(linkBetweenEntries.entryFrom, this.#parsedTrace),
                    entryTo: this.#eventsSerializer.eventForKey(linkBetweenEntries.entryTo, this.#parsedTrace),
                }, true);
            });
        }
        catch (err) {
            // This function is wrapped in a try/catch just in case we get any incoming
            // trace files with broken event keys. Shouldn't happen of course, but if
            // it does, we can discard all the data and then continue loading the
            // trace, rather than have the panel entirely break. This also prevents any
            // issue where we accidentally break the event serializer and break people
            // loading traces; let's at least make sure they can load the panel, even
            // if their annotations are gone.
            console.warn('Failed to apply stored annotations', err);
        }
    }
    #applyEntriesFilterModifications(hiddenEntriesKeys, expandableEntriesKeys) {
        try {
            const hiddenEntries = hiddenEntriesKeys.map(key => this.#eventsSerializer.eventForKey(key, this.#parsedTrace));
            const expandableEntries = expandableEntriesKeys.map(key => this.#eventsSerializer.eventForKey(key, this.#parsedTrace));
            this.#entriesFilter.setHiddenAndExpandableEntries(hiddenEntries, expandableEntries);
        }
        catch (err) {
            console.warn('Failed to apply entriesFilter modifications', err);
            // If there was some invalid data, let's just back out and clear it
            // entirely. This is better than applying a subset of all the hidden
            // entries, which could cause an odd state in the flamechart.
            this.#entriesFilter.setHiddenAndExpandableEntries([], []);
        }
    }
}
//# sourceMappingURL=ModificationsManager.js.map