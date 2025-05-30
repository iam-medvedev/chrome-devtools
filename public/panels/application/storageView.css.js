// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default `/*
 * Copyright 2016 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.report-row {
  display: flex;
  align-items: center;
  white-space: normal;

  &:has(.quota-override-error:empty) {
    margin: 0;
  }
}

.clear-storage-button .report-row {
  display: flex;
}

.link {
  margin-left: 10px;
  display: none;
}

.report-row:hover .link {
  display: inline;
}

.quota-override-editor-with-button {
  align-items: baseline;
  display: flex;
}

.quota-override-notification-editor {
  border: solid 1px var(--sys-color-neutral-outline);
  border-radius: 4px;
  display: flex;
  flex: auto;
  margin-right: 4px;
  max-width: 200px;
  min-width: 50px;
  min-height: 19px;
  padding-left: 4px;

  &:focus {
    border-color: var(--sys-color-state-focus-ring);
  }

  &:hover:not(:focus) {
    background-color: var(--sys-color-state-hover-on-subtle);
  }
}

.quota-override-error:not(:empty) {
  padding-top: 10px;
  color: var(--sys-color-error);
}

.usage-breakdown-row {
  min-width: fit-content;
}

.clear-storage-container {
  overflow: auto;
}

.clear-storage-header {
  min-width: 400px;
}

.report-content-box {
  overflow: initial;
}

.include-third-party-cookies {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 10px;
}

/*# sourceURL=${import.meta.resolve('./storageView.css')} */`;