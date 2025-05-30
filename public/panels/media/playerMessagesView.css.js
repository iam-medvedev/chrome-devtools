// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default `/*
 * Copyright 2020 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */
.media-messages-header {
  background-color: var(--sys-color-cdt-base-container);
  border-bottom: 1px solid var(--sys-color-divider);
  min-height: 26px;
}

.media-messages-body {
  overflow-y: scroll;
}

.media-messages-level-dropdown-element {
  height: 18px;
  line-height: 18px;
}

.media-messages-level-dropdown-text {
  float: left;
}

.media-messages-level-dropdown-checkbox {
  float: left;
  width: 18px;
  height: 100%;
  padding-left: 2px;
}

.media-messages-message-container {
  margin: 4px;
  font-size: 14px;
  line-height: 18px;
  padding: 4px;
  user-select: text;
}

.media-messages-message-container + .media-messages-message-container {
  border-top: 1px solid var(--sys-color-divider);

  &.media-message-warning,
  &.media-message-error {
    border: none;
  }
}

.media-message-warning {
  border-radius: 5px;
  background-color: var(--sys-color-surface-yellow);
  color: var(--sys-color-on-surface-yellow);
}

.media-message-error {
  border-radius: 5px;
  background-color: var(--sys-color-surface-error);
  color: var(--sys-color-on-surface-error);
}

.media-messages-message-filtered {
  display: none;
}

.media-messages-message-unselected {
  display: none;
}

.status-error-box {
  font-family: monospace;
  border: 1px solid var(--sys-color-error-outline);
  border-radius: 5px;
  padding: 4px;
}

.status-error-field-label {
  padding-right: 10px;
  color: var(--sys-color-token-subtle);
}

.status-error-field-labeled {
  display: flex;
}

/*# sourceURL=${import.meta.resolve('./playerMessagesView.css')} */`;