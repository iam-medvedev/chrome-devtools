// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright 2023 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.timeline-minimap {
  position: relative;
}

.timeline-sidebar-floating-icon {
  position: absolute;
  top: 5px;
  left: 10px;
  z-index: 999;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  box-shadow: var(--drop-shadow-depth-1);
  background: var(--sys-color-cdt-base-container);

  &:hover {
    background: var(--sys-color-base-container-elevated);
  }
}

.timeline-minimap .overview-strip {
  margin-top: 2px;
  justify-content: center;
}

.timeline-minimap .overview-strip .timeline-overview-strip-title {
  color: var(--sys-color-token-subtle);
  font-size: 10px;
  font-weight: bold;
  z-index: 100;
  background-color: var(--sys-color-cdt-base-container);
  padding: 0 4px;
  position: absolute;
  top: -2px;
  right: 0;
}

.timeline-minimap #timeline-overview-cpu-activity {
  flex-basis: 20px;
}

.timeline-minimap #timeline-overview-network {
  flex-basis: 8px;
}

.timeline-minimap #timeline-overview-filmstrip {
  flex-basis: 30px;
}

.timeline-minimap #timeline-overview-memory {
  flex-basis: 20px;
}

.timeline-minimap #timeline-overview-network::before,
.timeline-minimap #timeline-overview-cpu-activity::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-bottom: 1px solid var(--divider-line);
  z-index: -200;
}

.timeline-minimap .overview-strip .background {
  z-index: -10;
}

.timeline-minimap #timeline-overview-responsiveness {
  flex-basis: 5px;
  margin-top: 0 !important; /* stylelint-disable-line declaration-no-important */
}

.timeline-minimap #timeline-overview-input {
  flex-basis: 6px;
}

.timeline-minimap #timeline-overview-pane {
  flex: auto;
  position: relative;
  overflow: hidden;
}

.timeline-minimap #timeline-overview-container {
  display: flex;
  flex-direction: column;
  flex: none;
  position: relative;
  overflow: hidden;
}

.timeline-minimap #timeline-overview-container canvas {
  width: 100%;
  height: 100%;
}

.timeline-minimap-dim-highlight-svg {
  width: 100%;
  position: absolute;
  height: 100%;
}

.timeline-minimap .memory-graph-label {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 9px;
  color: var(--sys-color-token-subtle);
  white-space: nowrap;
  padding: 0 4px;
  background-color: var(--sys-color-cdt-base-container);
}

/*# sourceURL=timelineMiniMap.css */
`
};