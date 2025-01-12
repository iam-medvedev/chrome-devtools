// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2020 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.report-content-box {
  overflow: initial;
}

.report-field-name {
  flex: 0 0 200px;
}

.report-field-value {
  user-select: text;
  display: flex;
}

.report-field .inline-name {
  color: var(--sys-color-state-disabled);
  padding-left: 2ex;
  user-select: none;
  white-space: pre-line;
}

.report-field .inline-name::after {
  content: ":\\A0";
}

.report-field .inline-comment {
  color: var(--sys-color-token-subtle);
  padding-left: 1ex;
  white-space: pre-line;
}

.report-field .inline-comment::before {
  content: "(";
}

.report-field .inline-comment::after {
  content: ")";
}

.report-field .inline-span {
  color: var(--sys-color-token-subtle);
  padding-left: 1ex;
  white-space: pre-line;
}

.report-field-value-link {
  display: inline-block;
}

.icon-link.devtools-link {
  background-color: var(--sys-color-primary);
  vertical-align: sub;
}

.frame-details-container {
  overflow: auto;
}

.frame-details-report-container {
  min-width: 550px;
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
}

/*# sourceURL=openedWindowDetailsView.css */
`);

export default styles;
