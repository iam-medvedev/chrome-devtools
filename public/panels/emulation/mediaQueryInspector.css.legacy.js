// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright 2015 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */
/* Media query bars */

.media-inspector-view {
  height: 50px;
}

.media-inspector-marker-container {
  height: 14px;
  margin: 2px 0;
  position: relative;
}

.media-inspector-bar {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  pointer-events: none;
  position: absolute;
  inset: 0;
}

.media-inspector-marker {
  flex: none;
  pointer-events: auto;
  margin: 1px 0;
  white-space: nowrap;
  z-index: auto;
  position: relative;
}

.media-inspector-marker-spacer {
  flex: auto;
}

.media-inspector-marker:hover {
  margin: -1px 0;
  opacity: 100%;
}

.media-inspector-marker-min-width {
  flex: auto;
  background-color: var(--sys-color-yellow-container);
  border-right: 2px solid var(--sys-color-yellow-bright);
  border-left: 2px solid var(--sys-color-yellow-bright);

  &:hover {
    background-color: color-mix(in srgb, var(--sys-color-yellow-container), var(--sys-color-yellow-bright) 30%);
  }
}

.media-inspector-marker-min-width-right {
  border-left: 2px solid var(--sys-color-yellow-bright);
}

.media-inspector-marker-min-width-left {
  border-right: 2px solid var(--sys-color-yellow-bright);
}

.media-inspector-marker-min-max-width {
  background-color: var(--sys-color-tertiary-container);
  border-left: 2px solid var(--sys-color-tertiary);
  border-right: 2px solid var(--sys-color-tertiary);
}

.media-inspector-marker-min-max-width:hover {
  z-index: 1;
}

.media-inspector-marker-max-width {
  background-color: var(--sys-color-inverse-primary);
  border-right: 2px solid var(--sys-color-primary-bright);
  border-left: 2px solid var(--sys-color-primary-bright);
}

/* Clear background colors when query is not active and not hovering */

.media-inspector-marker-inactive .media-inspector-marker-min-width:not(:hover) {
  background-color: var(--sys-color-surface-yellow);
}

.media-inspector-marker-inactive .media-inspector-marker-min-max-width:not(:hover) {
  background-color: color-mix(in srgb, var(--sys-color-tertiary-container), var(--sys-color-cdt-base-container) 30%);
}

.media-inspector-marker-inactive .media-inspector-marker-max-width:not(:hover) {
  background-color: var(--sys-color-tonal-container);
}

/* Media query labels */

.media-inspector-marker-label-container {
  position: absolute;
  z-index: 1;
}

.media-inspector-marker:not(:hover) .media-inspector-marker-label-container {
  display: none;
}

.media-inspector-marker-label-container-left {
  left: -2px;
}

.media-inspector-marker-label-container-right {
  right: -2px;
}

.media-inspector-marker-label {
  color: var(--sys-color-on-surface);
  position: absolute;
  top: 1px;
  bottom: 0;
  font-size: 12px;
  pointer-events: none;
}

.media-inspector-label-right {
  right: 4px;
}

.media-inspector-label-left {
  left: 4px;
}

/*# sourceURL=mediaQueryInspector.css */
`
};
