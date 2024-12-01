// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2024 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  display: block;
}

:host * {
  box-sizing: border-box;
}

devtools-dialog {
  --override-transparent: color-mix(in sRGB, var(--color-background) 80%, transparent);
}

.title {
  font-size: var(--sys-typescale-headline4-size);
  line-height: var(--sys-typescale-headline4-line-height);
  font-weight: var(--ref-typeface-weight-medium);
  margin: 0;
}

.section-title {
  font-size: var(--sys-typescale-headline5-size);
  line-height: var(--sys-typescale-headline5-line-height);
  font-weight: var(--ref-typeface-weight-medium);
  margin: 0;
}

.privacy-disclosure {
  margin: 8px 0;
}

.url-override {
  margin: 8px 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: max-content;
}

details > summary {
  font-size: var(--sys-typescale-body4-size);
  line-height: var(--sys-typescale-body4-line-height);
  font-weight: var(--ref-typeface-weight-medium);
}

.content {
  max-width: 360px;
  padding: 16px 4px 18px;
  box-sizing: border-box;
}

.open-button-section {
  display: flex;
  flex-direction: row;
}

.origin-mapping-grid {
  border: 1px solid var(--sys-color-divider);
  margin-top: 8px;
}

.origin-mapping-description {
  margin-bottom: 8px;
}

.origin-mapping-button-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6px;
}

.config-button {
  margin-left: auto;
}

.advanced-section-contents {
  margin: 4px 0 14px;
}

.buttons-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 6px;
  gap: 8px;
}

input[type="checkbox"] {
  height: 12px;
  width: 12px;
  min-height: 12px;
  min-width: 12px;
  margin: 6px;
}

input[type="text"][disabled] {
  color: var(--sys-color-state-disabled);
}

.warning {
  margin: 2px 8px;
  color: var(--color-error-text);
}

x-link { /* stylelint-disable-line selector-type-no-unknown */
  color: var(--sys-color-primary);
  text-decoration-line: underline;
}

.divider {
  margin: 10px 0;
  border: none;
  border-top: 1px solid var(--sys-color-divider);
}

/*# sourceURL=fieldSettingsDialog.css */
`);

export default styles;
