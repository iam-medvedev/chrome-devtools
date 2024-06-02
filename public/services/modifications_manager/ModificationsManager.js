// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TraceEngine from '../../models/trace/trace.js';
import * as TimelineComponents from '../../panels/timeline/components/components.js';
let instance = null;
export class ModificationsManager {
    /**
     * An Array with all trace entries.
     * We save modifications into the trace file by saving their id in the allEntries Array.
     **/
    #allEntries;
    #entriesFilter;
    #timelineBreadcrumbs;
    /**
     * A new instance is create each time a trace is recorded or loaded from a file.
     * Both entryToNodeMap and wholeTraceBounds are mandatory to support all modifications and if one of them
     * is not present, something has gone wrong so let's load the trace without the modifications support.
     **/
    static maybeInstance(opts = { entryToNodeMap: null, wholeTraceBounds: null }) {
        if (opts.entryToNodeMap && opts.wholeTraceBounds) {
            instance = new ModificationsManager(opts.entryToNodeMap, opts.wholeTraceBounds);
        }
        return instance;
    }
    static removeInstance() {
        instance = null;
    }
    constructor(entryToNodeMap, wholeTraceBounds) {
        this.#entriesFilter = new TraceEngine.EntriesFilter.EntriesFilter(entryToNodeMap);
        this.#timelineBreadcrumbs = new TimelineComponents.Breadcrumbs.Breadcrumbs(wholeTraceBounds);
        this.#allEntries = Array.from(entryToNodeMap.keys());
    }
    getEntriesFilter() {
        return this.#entriesFilter;
    }
    getTimelineBreadcrumbs() {
        return this.#timelineBreadcrumbs;
    }
    getEntryIndex(entry) {
        return this.#allEntries.indexOf(entry);
    }
    /**
     * Builds all modifications and returns the object written into the 'modifications' trace file metada field.
     */
    getModifications() {
        const indexesOfSynteticEntries = [];
        const hiddenEntries = this.#entriesFilter.invisibleEntries();
        if (hiddenEntries) {
            for (const entry of hiddenEntries) {
                indexesOfSynteticEntries.push(this.getEntryIndex(entry));
            }
        }
        const indexesOfModifiedEntries = [];
        const modifiedEntries = this.#entriesFilter.expandableEntries();
        if (modifiedEntries) {
            for (const entry of modifiedEntries) {
                indexesOfModifiedEntries.push(this.getEntryIndex(entry));
            }
        }
        return {
            entriesFilterModifications: {
                hiddenEntriesIndexes: indexesOfSynteticEntries,
                expandableEntriesIndexes: indexesOfModifiedEntries,
            },
            initialBreadcrumb: this.#timelineBreadcrumbs.initialBreadcrumb,
        };
    }
    applyModifications(modifications) {
        this.applyEntriesFilterModifications(modifications.entriesFilterModifications.hiddenEntriesIndexes, modifications.entriesFilterModifications.expandableEntriesIndexes);
        this.#timelineBreadcrumbs.setInitialBreadcrumbFromLoadedModifications(modifications.initialBreadcrumb);
    }
    applyEntriesFilterModifications(hiddenEntriesIndexes, expandableEntriesIndexes) {
        // Build the hidden events array by getting the entries by their index in the allEntries array.
        const hiddenEntries = [];
        hiddenEntriesIndexes.map(hiddenEntryHash => {
            const hiddenEntry = this.#allEntries[hiddenEntryHash];
            if (hiddenEntry) {
                hiddenEntries.push(hiddenEntry);
            }
        });
        const expandableEntries = [];
        expandableEntriesIndexes.map(hiddenEntryHash => {
            const expandableEntry = this.#allEntries[hiddenEntryHash];
            if (expandableEntry) {
                expandableEntries.push(expandableEntry);
            }
        });
        this.#entriesFilter.setHiddenAndExpandableEntries(hiddenEntries, expandableEntries);
    }
}
//# sourceMappingURL=ModificationsManager.js.map