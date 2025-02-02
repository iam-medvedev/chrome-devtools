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

.add-conditions-button {
  margin: var(--sys-size-5) 0;
  border: none;
}

.conditions-list {
  flex: auto;

  &:has(.list-item) {
    margin-top: var(--sys-size-3);
  }
}

.conditions-list-item {
  padding: 3px 5px;
  height: 30px;
  display: flex;
  align-items: center;
  position: relative;
  flex: auto 1 1;
}

.conditions-list-text {
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 0 0 60px;
  user-select: none;
  color: var(--sys-color-on-surface);
  text-align: center;
  position: relative;

  & > input {
    scroll-margin-left: 5px;
  }
}

.conditions-list-text:last-child {
  flex-basis: 100px;
  text-align: left;
}

.conditions-list-title {
  text-align: start;
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
}

.conditions-list-title-text {
  flex: auto;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.conditions-list-separator {
  flex: 0 0 1px;
  background-color: var(--sys-color-divider);
  height: 30px;
  margin: 0 4px;
}

.conditions-list-separator-invisible {
  visibility: hidden;
  height: 100% !important; /* stylelint-disable-line declaration-no-important */
}

.conditions-edit-row {
  flex: none;
  display: flex;
  flex-direction: row;
  margin: 6px 5px;

  .conditions-list-title-text {
    white-space: unset;
  }
}

.conditions-edit-row input {
  &[type="checkbox"] {
    margin: auto;
    top: 6px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:not([type="checkbox"]) {
    width: 100%;
    text-align: inherit;
  }
}

.conditions-edit-optional {
  margin-top: var(--sys-size-5);
  color: var(--sys-color-on-surface-subtle);
}

.editor-buttons {
  margin-top: 10px;
}

.settings-card-container-wrapper {
  scrollbar-gutter: stable;
  padding: var(--sys-size-8) 0;
  overflow: auto;
  position: absolute;
  inset: var(--sys-size-8) 0 0;
}

.settings-card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sys-size-9);
}

.cpu-preset-section {
  padding: 14px;
  display: flex;
  justify-content: space-between;
}

.cpu-preset-result.not-calibrated {
  font-style: italic;
}

.cpu-preset-calibrate {
  flex-direction: column;
  gap: 14px;
}

.cpu-preset-calibrate .button-container {
  display: flex;
  gap: 10px;
}

.cpu-preset-calibrate .text-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.text-with-icon {
  display: flex;
  align-items: center;
  gap: 5px;
}

/*# sourceURL=throttlingSettingsTab.css */
`
};