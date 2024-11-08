// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Platform from '../platform/platform.js';
import { getLocalizedString, registerUIStrings } from './i18nImpl.js';
const UIStrings = {
    /**
     *@description μs is the short form of micro-seconds and the placeholder is a number
     * The shortest form or abbreviation of micro-seconds should be used, as there is
     * limited room in this UI.
     *@example {2} PH1
     */
    fmms: '{PH1} μs',
    /**
     *@description ms is the short form of milli-seconds and the placeholder is a decimal number
     * The shortest form or abbreviation of milli-seconds should be used, as there is
     * limited room in this UI.
     *@example {2.14} PH1
     */
    fms: '{PH1} ms',
    /**
     *@description s is short for seconds and the placeholder is a decimal number
     * The shortest form or abbreviation of seconds should be used, as there is
     * limited room in this UI.
     *@example {2.14} PH1
     */
    fs: '{PH1} s',
    /**
     *@description min is short for minutes and the placeholder is a decimal number
     *@example {2.2} PH1
     */
    fmin: '{PH1} min',
    /**
     *@description hrs is short for hours and the placeholder is a decimal number
     *@example {2.2} PH1
     */
    fhrs: '{PH1} hrs',
    /**
     *@description days formatting and the placeholder is a decimal number
     *@example {2.2} PH1
     */
    fdays: '{PH1} days',
    /**
     *@description describes a number of milliseconds (the unit should not abbreviated)
     *@example {2.14} PH1
     */
    fmsExpanded: '{PH1} milliseconds',
};
const str_ = registerUIStrings('core/i18n/time-utilities.ts', UIStrings);
const i18nString = getLocalizedString.bind(undefined, str_);
export const preciseMillisToString = function (ms, precision) {
    precision = precision || 0;
    return i18nString(UIStrings.fms, { PH1: ms.toFixed(precision) });
};
export function formatMicroSecondsTime(time) {
    return millisToString(Platform.Timing.microSecondsToMilliSeconds(time), true);
}
export function formatMicroSecondsAsMillisFixed(time, fractionDigits = 0) {
    const milliseconds = Platform.Timing.microSecondsToMilliSeconds(time);
    return i18nString(UIStrings.fms, { PH1: milliseconds.toFixed(fractionDigits) });
}
export function formatMicroSecondsAsMillisFixedExpanded(time, fractionDigits = 0) {
    const milliseconds = Platform.Timing.microSecondsToMilliSeconds(time);
    return i18nString(UIStrings.fmsExpanded, { PH1: milliseconds.toFixed(fractionDigits) });
}
export function formatMicroSecondsAsSeconds(time) {
    const milliseconds = Platform.Timing.microSecondsToMilliSeconds(time);
    const seconds = Platform.Timing.milliSecondsToSeconds(milliseconds);
    return i18nString(UIStrings.fs, { PH1: (seconds).toFixed(2) });
}
export const millisToString = function (ms, higherResolution) {
    if (!isFinite(ms)) {
        return '-';
    }
    if (higherResolution && ms < 0.1) {
        return i18nString(UIStrings.fmms, { PH1: (ms * 1000).toFixed(0) });
    }
    if (higherResolution && ms < 1000) {
        return i18nString(UIStrings.fms, { PH1: (ms).toFixed(2) });
    }
    if (ms < 1000) {
        return i18nString(UIStrings.fms, { PH1: (ms).toFixed(0) });
    }
    const seconds = ms / 1000;
    if (seconds < 60) {
        return i18nString(UIStrings.fs, { PH1: (seconds).toFixed(2) });
    }
    const minutes = seconds / 60;
    if (minutes < 60) {
        return i18nString(UIStrings.fmin, { PH1: (minutes).toFixed(1) });
    }
    const hours = minutes / 60;
    if (hours < 24) {
        return i18nString(UIStrings.fhrs, { PH1: (hours).toFixed(1) });
    }
    const days = hours / 24;
    return i18nString(UIStrings.fdays, { PH1: (days).toFixed(1) });
};
export const secondsToString = function (seconds, higherResolution) {
    if (!isFinite(seconds)) {
        return '-';
    }
    return millisToString(seconds * 1000, higherResolution);
};
//# sourceMappingURL=time-utilities.js.map