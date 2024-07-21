// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TraceEngine from '../../models/trace/trace.js';
import * as TimelineComponents from '../../panels/timeline/components/components.js';
import { EventsSerializer } from './EventsSerializer.js';
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
    #traceParsedData;
    #eventsSerializer;
    #overlayForAnnotation;
    /**
     * Gets the ModificationsManager instance corresponding to a trace
     * given its index used in Model#traces. If no index is passed gets
     * the manager instance for the last trace. If no instance is found,
     * throws.
     */
    static activeManager() {
        return activeManager;
    }
    /**
     * Initializes a ModificationsManager instance for a parsed trace or changes the active manager for an existing one.
     * This needs to be called if and a trace has been parsed or switched to.
     */
    static initAndActivateModificationsManager(traceModel, traceIndex) {
        // If a manager for a given index has already been created, active it.
        if (modificationsManagerByTraceIndex[traceIndex]) {
            activeManager = modificationsManagerByTraceIndex[traceIndex];
            ModificationsManager.activeManager()?.applyModificationsIfPresent();
        }
        const traceParsedData = traceModel.traceParsedData(traceIndex);
        if (!traceParsedData) {
            throw new Error('ModificationsManager was initialized without a corresponding trace data');
        }
        const traceBounds = traceParsedData.Meta.traceBounds;
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
            traceParsedData,
            traceBounds,
            rawTraceEvents: traceEvents,
            modifications: metadata?.modifications,
            syntheticEvents: syntheticEventsManager.getSyntheticTraceEvents(),
        });
        modificationsManagerByTraceIndex[traceIndex] = newModificationsManager;
        activeManager = newModificationsManager;
        ModificationsManager.activeManager()?.applyModificationsIfPresent();
        return this.activeManager();
    }
    constructor({ traceParsedData, traceBounds, modifications }) {
        super();
        const entryToNodeMap = new Map([...traceParsedData.Samples.entryToNode, ...traceParsedData.Renderer.entryToNode]);
        this.#entriesFilter = new TraceEngine.EntriesFilter.EntriesFilter(entryToNodeMap);
        this.#timelineBreadcrumbs = new TimelineComponents.Breadcrumbs.Breadcrumbs(traceBounds);
        this.#modifications = modifications || null;
        this.#traceParsedData = traceParsedData;
        this.#eventsSerializer = new EventsSerializer();
        // TODO: Assign annotations loaded from the trace file
        this.#overlayForAnnotation = new Map();
    }
    getEntriesFilter() {
        return this.#entriesFilter;
    }
    getTimelineBreadcrumbs() {
        return this.#timelineBreadcrumbs;
    }
    createAnnotation(newAnnotation) {
        const newOverlay = {
            type: 'ENTRY_LABEL',
            entry: newAnnotation.entry,
            label: newAnnotation.label,
        };
        this.#overlayForAnnotation.set(newAnnotation, newOverlay);
        // TODO: When we have more annotations, check the annotation type and create the appropriate one
        this.dispatchEvent(new AnnotationModifiedEvent(newOverlay, 'Add'));
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
        const annotationForRemovedOverlay = this.#getAnnotationByOverlay(removedOverlay);
        if (!annotationForRemovedOverlay) {
            console.warn('Annotation for deleted Overlay does not exist');
            return;
        }
        this.#overlayForAnnotation.delete(annotationForRemovedOverlay);
        this.dispatchEvent(new AnnotationModifiedEvent(removedOverlay, 'Remove'));
    }
    updateAnnotationOverlay(updatedOverlay) {
        const annotationForUpdatedOverlay = this.#getAnnotationByOverlay(updatedOverlay);
        if (!annotationForUpdatedOverlay) {
            console.warn('Annotation for updated Overlay does not exist');
            return;
        }
        if (updatedOverlay.type === 'ENTRY_LABEL') {
            annotationForUpdatedOverlay.label = updatedOverlay.label;
        }
        this.dispatchEvent(new AnnotationModifiedEvent(updatedOverlay, 'UpdateLabel'));
    }
    #getAnnotationByOverlay(overlay) {
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
                hiddenEntries: hiddenEntries,
                expandableEntries: expandableEntries,
            },
            initialBreadcrumb: this.#timelineBreadcrumbs.initialBreadcrumb,
            annotations: this.#annotationsJSON(),
        };
        return this.#modifications;
    }
    #annotationsJSON() {
        const annotations = this.getAnnotations();
        const entryLabelsSerialized = [];
        for (let i = 0; i < annotations.length; i++) {
            if (annotations[i].type === 'ENTRY_LABEL') {
                const serializedEvent = this.#eventsSerializer.keyForEvent(annotations[i].entry);
                if (serializedEvent) {
                    entryLabelsSerialized.push({
                        entry: serializedEvent,
                        label: annotations[i].label,
                    });
                }
            }
        }
        return {
            entryLabels: entryLabelsSerialized,
        };
    }
    applyModificationsIfPresent() {
        const modifications = this.#modifications;
        if (!modifications || !modifications.annotations) {
            return;
        }
        const hiddenEntries = modifications.entriesModifications.hiddenEntries;
        const expandableEntries = modifications.entriesModifications.expandableEntries;
        this.#applyEntriesFilterModifications(hiddenEntries, expandableEntries);
        this.#timelineBreadcrumbs.setInitialBreadcrumbFromLoadedModifications(modifications.initialBreadcrumb);
        const entryLabels = modifications.annotations.entryLabels;
        entryLabels.forEach(entryLabel => {
            this.createAnnotation({
                type: 'ENTRY_LABEL',
                entry: this.#eventsSerializer.eventForKey(entryLabel.entry, this.#traceParsedData),
                label: entryLabel.label,
            });
        });
    }
    #applyEntriesFilterModifications(hiddenEntriesKeys, expandableEntriesKeys) {
        const hiddenEntries = hiddenEntriesKeys.map(key => this.#eventsSerializer.eventForKey(key, this.#traceParsedData));
        const expandableEntries = expandableEntriesKeys.map(key => this.#eventsSerializer.eventForKey(key, this.#traceParsedData));
        this.#entriesFilter.setHiddenAndExpandableEntries(hiddenEntries, expandableEntries);
    }
}
//# sourceMappingURL=ModificationsManager.js.map