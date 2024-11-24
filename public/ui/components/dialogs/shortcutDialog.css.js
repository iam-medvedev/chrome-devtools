// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2023 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.keybinds-category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--sys-size-6) var(--sys-size-5) var(--sys-size-8);
}

.keybinds-category-header-text {
  font-size: var(--sys-typescale-body3-size);
  font-weight: var(--ref-typeface-weight-medium);
}

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

.keybinds-list-text {
  font-size: var(--sys-typescale-body4-size);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  user-select: none;
  color: var(--sys-color-on-surface);
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
  padding: 0 var(--sys-size-8);
  gap: var(--sys-size-3);
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

/*# sourceURL=shortcutDialog.css */
`);

export default styles;
