// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssText: `/*
 * Copyright 2024 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.list {
  max-height: 200px;
}

.list-item:has(.origin-mapping-row.header) {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--sys-color-cdt-base-container);
}

.origin-mapping-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  /* Needs to be 30px because list items have a min height of 30px */
  height: 30px;
}

.origin-mapping-row.header {
  font-weight: var(--ref-typeface-weight-medium);
  border-bottom: 1px solid var(--sys-color-divider);
}

.origin-mapping-cell {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 4px;
  border-right: 1px solid var(--sys-color-divider);
}

.origin-warning-icon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
  color: var(--icon-warning);
}

.origin {
  text-overflow: ellipsis;
  overflow-x: hidden;
}

.origin-mapping-cell:last-child {
  border: none;
}

.origin-mapping-editor {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 12px 8px;
  gap: 12px;
}

.origin-mapping-editor label {
  flex: 1;
  font-weight: var(--ref-typeface-weight-medium);
}

.origin-mapping-editor input {
  margin-top: 4px;
  width: 100%;
}

/*# sourceURL=${import.meta.resolve('./originMap.css')} */
`
};