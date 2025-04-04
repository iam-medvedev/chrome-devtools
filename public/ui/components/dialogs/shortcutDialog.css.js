// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssText: `/*
 * Copyright 2023 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.keybinds-list {
  display: flex;
  flex-direction: column;
  /* overwrite default\\'margin\\' and \\'padding\\' for the <ul> element */
  margin: 0;
  padding: 0;
}

.keybinds-list-item {
  display: grid;
  align-items: baseline;
  justify-content: space-between;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr var(--sys-size-11) 1fr;
  border-bottom: var(--sys-size-1) solid var(--sys-color-divider);
  padding: var(--sys-size-4) 0;

  &:last-of-type {
    border-bottom: unset;
  }

  .keybinds-list-title {
    grid-row: 1/1;
  }

  .shortcuts-for-actions {
    grid-area: auto / 3 / auto / span 1;
  }
}

.keys-container {
  display: flex;
  gap: var(--sys-size-3);
}

.shortcuts-for-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--sys-size-3);
}

.nav-radio-buttons {
  display: flex;
  flex-direction: column;
  border-bottom: var(--sys-size-1) solid var(--sys-color-divider);
  padding-bottom: var(--sys-size-5);

  & label {
    display: flex;
    font: var(--sys-typescale-body3-regular);
    gap: var(--sys-size-2);
  }
}

.keybinds-key {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: var(--sys-size-4);
  min-width: var(--sys-size-11);
  height: var(--sys-size-11);
  font: var(--sys-typescale-body5-medium);
  white-space: nowrap;
  border-radius: var(--sys-shape-corner-small);
  background: var(--sys-color-tonal-container);
}

/*# sourceURL=${import.meta.resolve('./shortcutDialog.css')} */
`
};