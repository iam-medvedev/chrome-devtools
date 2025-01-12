// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright (c) 2014 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.overview-grid-window-selector {
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: var(--sys-color-state-ripple-primary);
  z-index: 250;
  pointer-events: none;
}

.overview-grid-window-resizer {
  position: absolute;
  top: 0;
  height: 19px;
  width: 10px;
  margin-left: -5px; /* half width (incl the border) */
  background-color: var(--sys-color-tonal-container);
  border: 1px solid var(--sys-color-tonal-outline);
  z-index: 500;
  border-radius: 3px;
}

/* Grip lines within the handle */
.overview-grid-window-resizer::before,
.overview-grid-window-resizer::after {
  content: "";
  width: 1px;
  background: var(--sys-color-primary);
  height: 7px;
  position: absolute;
  left: 2px;
  top: 5px;
  border-radius: 1px;
}

.overview-grid-window-resizer::after {
  left: 5px;
}

.overview-grid-window-resizer:focus-visible {
  background-color: var(--sys-color-state-focus-highlight);
}

.overview-grid-cursor-area {
  position: absolute;
  inset: 20px 0 0;
  z-index: 500;
  cursor: text;
}

.overview-grid-cursor-position {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--sys-color-primary);
  z-index: 500;
  pointer-events: none;
  visibility: hidden;
  overflow: hidden;
}

.window-curtain-left,
.window-curtain-right {
  background-color: var(--sys-color-state-ripple-primary);
  position: absolute;
  top: 0;
  height: 100%;
  z-index: 300;
  pointer-events: none;
  border: 2px none var(--sys-color-tonal-outline);
}

.window-curtain-left {
  left: 0;
  border-right-style: solid;
}

.window-curtain-right {
  right: 0;
  border-left-style: solid;
}

.create-breadcrumb-button-container {
  visibility: hidden;
  opacity: 0%;
  transition: opacity 100ms 250ms;
  display: flex;
  position: absolute;
  top: 15px;
  justify-content: center;
  z-index: 600;
  left: 0;
  right: 0;
}

.is-breadcrumb-button-visible {
  visibility: visible;
  opacity: 100%;
}

.create-breadcrumb-button-container.with-screenshots {
  /* We have more room when screenshots are enabled,
   * so push the button down slightly */
  top: 20px;
}

.create-breadcrumb-button {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  background: var(--sys-color-cdt-base-container);
  box-shadow: var(--drop-shadow-depth-3);
  border-radius: 50px;
  padding: 5px 10px;
  gap: 2px;
}

.create-breadcrumb-button:active {
  /* On minimap cursor changes to text to selected an area,
  * so keep it as default on the breadcrumb button */
  cursor: default;
}

.create-breadcrumb-button:hover {
  background: var(--sys-color-neutral-container);
}

@media (forced-colors: active) {
  .overview-grid-cursor-position {
    forced-color-adjust: none;
    background-color: Highlight;
  }

  .window-curtain-left,
  .window-curtain-right {
    background-color: transparent;
    border-color: ButtonText;
  }

  .overview-grid-window-resizer {
    background-color: ButtonText;
  }

  .overview-grid-window-resizer:hover,
  .overview-grid-window-resizer:active,
  .overview-grid-window-resizer:focus-visible {
    forced-color-adjust: none;
    background-color: Highlight;
  }
}

/*# sourceURL=overviewGrid.css */
`
};
