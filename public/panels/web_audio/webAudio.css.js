// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2019 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  overflow: hidden;
}

.web-audio-toolbar-container {
  background-color: var(--sys-color-cdt-base-container);
  border-bottom: 1px solid var(--sys-color-divider);
  min-height: fit-content;
}

.web-audio-toolbar {
  display: inline-block;
}

.web-audio-landing-page {
  position: absolute;
  background-color: var(--sys-color-cdt-base-container);
  justify-content: center;
  align-items: center;
  overflow: auto;
  font-size: 13px;
  color: var(--sys-color-on-surface);
}

.web-audio-landing-page > div {
  max-width: 500px;
  margin: 10px;
}

.web-audio-landing-page > div > p {
  flex: none;
  white-space: pre-line;
}

.web-audio-content-container {
  overflow-y: auto;
}

.web-audio-details-container {
  min-height: fit-content;
}

.web-audio-summary-container {
  flex-shrink: 0;
}

.context-detail-container {
  flex: none;
  display: flex;
  background-color: var(--sys-color-cdt-base-container);
  flex-direction: column;
}

.context-detail-header {
  border-bottom: 1px solid var(--sys-color-divider);
  padding: 12px 24px;
  margin-bottom: 10px;
}

.context-detail-title {
  font-size: 15px;
  font-weight: 400;
}

.context-detail-subtitle {
  font-size: 12px;
  margin-top: 10px;
  user-select: text;
}

.context-detail-row {
  flex-direction: row;
  display: flex;
  line-height: 18px;
  padding-left: 24px;
}

.context-detail-row-entry:not(:empty) {
  color: var(--sys-color-token-subtle);
  overflow: hidden;
  width: 130px;
}

.context-detail-row-value {
  user-select: text;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.context-summary-container {
  flex: 0 0 27px;
  line-height: 27px;
  padding-left: 5px;
  background-color: var(--sys-color-cdt-base-container);
  border-top: 1px solid var(--sys-color-divider);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.context-summary-container span {
  margin-right: 6px;
}

/*# sourceURL=webAudio.css */
`);

export default styles;
