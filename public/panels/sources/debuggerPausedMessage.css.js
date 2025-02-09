// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright 2016 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.paused-status {
  margin: 6px;
  padding: 4px 10px;
  border-radius: 10px;
  background-color: var(--sys-color-yellow-container);
  color: var(--sys-color-on-yellow-container);
}

.paused-status.error-reason {
  background-color: var(--sys-color-surface-error);
  color: var(--sys-color-on-surface-error);
}

.status-main {
  padding-left: 18px;
  position: relative;
}

.status-sub:not(:empty) {
  padding-left: 15px;
  padding-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.paused-status.error-reason .status-sub {
  color: var(--sys-color-error);
  line-height: 11px;
  max-height: 27px;
  user-select: text;
}

devtools-icon {
  position: absolute;
  left: -1px;
  top: -1px;
}

/*# sourceURL=${import.meta.resolve('./debuggerPausedMessage.css')} */
`
};