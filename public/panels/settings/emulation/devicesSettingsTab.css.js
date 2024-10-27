// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2015 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.device-card-content {
  padding-left: 0;
  padding-right: 0;
}

.list {
  border: none;
}

#custom-device-add-button {
  padding: var(--sys-size-5) var(--sys-size-6);
}

.devices-settings-tab .devices-button-row {
  flex: none;
  display: flex;

  devtools-button {
    margin: 4px 0 0 5px;
  }
}

.devices-settings-tab .devices-list {
  width: min(350px, 100%);
  margin-top: 10px;
}

.devices-list-item {
  padding: var(--sys-size-3) var(--sys-size-7);
  height: var(--sys-size-13);
  display: flex;
  align-items: center;
  flex: auto 1 1;
  overflow: hidden;
  color: var(--sys-color-on-surface);
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.devices-list-checkbox {
  height: 12px;
  width: 12px;
  margin: 2px 5px 2px 2px;
  flex: none;
  pointer-events: none;
}

.devices-list-checkbox:focus {
  outline: auto 5px -webkit-focus-ring-color;
}

.device-name {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.devices-edit-fields {
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-left: 4px;
  margin-bottom: 5px;
}

.devices-edit-fields b {
  margin-top: 8px;
  margin-bottom: 0;
}

.devices-edit-client-hints-heading {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
}
/* Don't want the bottom margin in the specific case of the folding one;
 * it messes with alignment with the arrow (which is a ::before) and  it's
 * spaced reasonably without it anyway
 */
li .devices-edit-client-hints-heading {
  margin-bottom: 0;
}

.devices-edit-client-hints-heading b {
  margin-inline-end: 2px;
}

.devices-edit-client-hints-heading .help-icon {
  margin-left: 2px;
  margin-right: 2px;
  vertical-align: middle;
}

.devices-edit-client-hints-heading a:focus {
  box-shadow: var(--sys-color-state-focus-ring);
}

.devices-edit-fields input {
  flex: auto;
  margin: 8px 5px 0;
}

li.devices-edit-client-hints-field {
  /* Cancel out padding from treeview's .tree-outline ol */
  left: -12px;
}

.devices-edit-client-hints-field input {
  flex: auto;
  margin: 8px 5px 0;
}

.devices-edit-fields .device-edit-fixed {
  flex: 0 0 140px;
}

.devices-edit-fields select {
  margin: 8px 5px 0;
}

/*# sourceURL=devicesSettingsTab.css */
`);

export default styles;
