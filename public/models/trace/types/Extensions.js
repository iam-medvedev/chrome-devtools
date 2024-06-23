// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const extensionPalette = [
    'primary',
    'primary-light',
    'primary-dark',
    'secondary',
    'secondary-light',
    'secondary-dark',
    'tertiary',
    'tertiary-light',
    'tertiary-dark',
    'error',
];
export function colorIsValid(color) {
    return extensionPalette.includes(color);
}
export function isExtensionPayloadMarker(payload) {
    return payload.metadata.dataType === "marker" /* ExtensionEntryType.MARKER */;
}
export function isExtensionPayloadFlameChartEntry(payload) {
    const hasTrack = 'track' in payload && Boolean(payload.track);
    return payload.metadata.dataType === "track-entry" /* ExtensionEntryType.TRACK_ENTRY */ && hasTrack;
}
export function isSyntheticExtensionEntry(entry) {
    return entry.cat === 'devtools.extension';
}
//# sourceMappingURL=Extensions.js.map