// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as TraceEngine from '../../models/trace/trace.js';
import * as ThemeSupport from '../../ui/legacy/theme_support/theme_support.js';
import { buildGroupStyle, buildTrackHeader, getFormattedTime } from './AppenderUtils.js';
const UIStrings = {
    /**
     *@description Text in Timeline Flame Chart Data Provider of the Performance panel
     */
    gpu: 'GPU',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/GPUTrackAppender.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class GPUTrackAppender {
    appenderName = 'GPU';
    #compatibilityBuilder;
    #traceParsedData;
    constructor(compatibilityBuilder, traceParsedData) {
        this.#compatibilityBuilder = compatibilityBuilder;
        this.#traceParsedData = traceParsedData;
    }
    /**
     * Appends into the flame chart data the data corresponding to the
     * GPU track.
     * @param trackStartLevel the horizontal level of the flame chart events where
     * the track's events will start being appended.
     * @param expanded wether the track should be rendered expanded.
     * @returns the first available level to append more data after having
     * appended the track's events.
     */
    appendTrackAtLevel(trackStartLevel, expanded) {
        const gpuEvents = this.#traceParsedData.GPU.mainGPUThreadTasks;
        if (gpuEvents.length === 0) {
            return trackStartLevel;
        }
        this.#appendTrackHeaderAtLevel(trackStartLevel, expanded);
        return this.#compatibilityBuilder.appendEventsAtLevel(gpuEvents, trackStartLevel, this);
    }
    /**
     * Adds into the flame chart data the header corresponding to the
     * GPU track. A header is added in the shape of a group in the
     * flame chart data. A group has a predefined style and a reference
     * to the definition of the legacy track (which should be removed
     * in the future).
     * @param currentLevel the flame chart level at which the header is
     * appended.
     * @param expanded wether the track should be rendered expanded.
     */
    #appendTrackHeaderAtLevel(currentLevel, expanded) {
        const style = buildGroupStyle({ collapsible: false });
        const group = buildTrackHeader("gpu" /* VisualLoggingTrackName.GPU */, currentLevel, i18nString(UIStrings.gpu), style, /* selectable= */ true, expanded);
        this.#compatibilityBuilder.registerTrackForGroup(group, this);
    }
    /*
      ------------------------------------------------------------------------------------
       The following methods  are invoked by the flame chart renderer to query features about
       events on rendering.
      ------------------------------------------------------------------------------------
    */
    /**
     * Gets the color an event added by this appender should be rendered with.
     */
    colorForEvent(event) {
        if (!TraceEngine.Types.TraceEvents.isTraceEventGPUTask(event)) {
            throw new Error(`Unexpected GPU Task: The event's type is '${event.name}'`);
        }
        return ThemeSupport.ThemeSupport.instance().getComputedValue('--app-color-painting');
    }
    /**
     * Gets the title an event added by this appender should be rendered with.
     */
    titleForEvent(event) {
        if (TraceEngine.Types.TraceEvents.isTraceEventGPUTask(event)) {
            return 'GPU';
        }
        return event.name;
    }
    /**
     * Returns the info shown when an event added by this appender
     * is hovered in the timeline.
     */
    highlightedEntryInfo(event) {
        const title = this.titleForEvent(event);
        return { title, formattedTime: getFormattedTime(event.dur) };
    }
}
//# sourceMappingURL=GPUTrackAppender.js.map