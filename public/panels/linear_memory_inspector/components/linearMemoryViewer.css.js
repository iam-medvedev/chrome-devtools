// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright 2021 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  flex: auto;
  display: flex;
  min-height: 20px;
}

.view {
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  background: var(--sys-color-cdt-base-container);
  outline: none;
}

.row {
  display: flex;
  height: 20px;
  align-items: center;
}

.cell {
  text-align: center;
  border: 1px solid transparent;
  border-radius: 2px;

  &.focused-area {
    background-color: var(--sys-color-tonal-container);
    color: var(--sys-color-on-tonal-container);
  }

  &.selected {
    border-color: var(--sys-color-state-focus-ring);
    color: var(--sys-color-on-tonal-container);
    background-color: var(--sys-color-state-focus-select);
  }
}

.byte-cell {
  min-width: 21px;
  color: var(--sys-color-on-surface);
}

.byte-group-margin {
  margin-left: var(--byte-group-margin);
}

.text-cell {
  min-width: 14px;
  color: var(--sys-color-on-surface-subtle);
}

.address {
  color: var(--sys-color-state-disabled);
}

.address.selected {
  font-weight: bold;
  color: var(--sys-color-on-surface);
}

.divider {
  width: 1px;
  height: inherit;
  background-color: var(--sys-color-divider);
  margin: 0 4px;
}

.highlight-area {
  background-color: var(--sys-color-surface-variant);
}

/*# sourceURL=linearMemoryViewer.css */
`
};