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

:host {
  overflow: hidden;
}

.header {
  padding: 0 0 6px;
  border-bottom: 1px solid var(--sys-color-divider);
  font-size: 18px;
  font-weight: normal;
  flex: none;
}

.add-conditions-button {
  flex: none;
  margin: 10px 5px;
  min-width: 140px;
  align-self: flex-start;
}

.conditions-list {
  min-width: 640px;
  flex: auto;
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
  flex: 0 0 80px;
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
  flex: auto;
  align-items: flex-start;
}

.conditions-list-title-text {
  flex: auto;
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
}

.conditions-edit-row input {
  &[type="checkbox"] {
    display: block;
    margin: auto;
    top: 6px;
  }

  &:not([type="checkbox"]) {
    width: 100%;
    text-align: inherit;
  }
}

.conditions-edit-optional {
  position: absolute;
  bottom: -20px;
  right: 0;
  color: var(--sys-color-state-disabled);
}

.editor-buttons {
  margin-top: 10px;
}

/*# sourceURL=throttlingSettingsTab.css */
`);

export default styles;
