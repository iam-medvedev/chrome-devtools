// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TraceEngine from '../../models/trace/trace.js';
let instance = null;
export class AnnotationsManager {
    static instance(opts = { forceNew: null }) {
        const forceNew = Boolean(opts.forceNew);
        if (!instance || forceNew) {
            instance = new AnnotationsManager();
        }
        return instance;
    }
    static removeInstance() {
        instance = null;
    }
    constructor() {
    }
    /**
     * Builds all annotations and returns the object written into the 'annotations' trace file metada field.
     */
    getAnnotations() {
        const hashesOfSynteticEntries = [];
        const hiddenEntries = TraceEngine.EntriesFilter.EntriesFilter.maybeInstance()?.invisibleEntries();
        if (hiddenEntries) {
            for (const entry of hiddenEntries) {
                if (!TraceEngine.Types.TraceEvents.isProfileCall(entry)) {
                    hashesOfSynteticEntries.push(this.generateTraceEntryHash(entry));
                }
            }
        }
        return {
            hiddenRendererEventsHashes: hashesOfSynteticEntries,
            hiddenProfileCallsSampleIndexes: [],
            hiddenProfileCallsDepths: [],
        };
    }
    generateTraceEntryHash(entry) {
        if (!TraceEngine.Types.TraceEvents.isProfileCall(entry)) {
            return `${entry.cat},${entry.name},${entry.ph},${entry.pid},${entry.tid},${entry.ts},${entry.tts}`;
        }
        return '';
    }
}
//# sourceMappingURL=AnnotationsManager.js.map