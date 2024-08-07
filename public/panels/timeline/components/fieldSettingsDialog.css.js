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

:host * {
  box-sizing: border-box;
}

devtools-dialog {
  --override-transparent: rgb(0 0 0 / 50%);
}

.title {
  font-size: var(--sys-typescale-headline4-size);
  line-height: var(--sys-typescale-headline4-line-height);
  font-weight: var(--ref-typeface-weight-medium);
}

.section-title {
  font-size: var(--sys-typescale-headline5-size);
  line-height: var(--sys-typescale-headline5-line-height);
  font-weight: var(--ref-typeface-weight-medium);
}

details > summary {
  font-size: var(--sys-typescale-body4-size);
  line-height: var(--sys-typescale-body4-line-height);
  font-weight: var(--ref-typeface-weight-medium);
}

.content {
  max-width: 500px;
  padding: 16px;
}

.buttons-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
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

label {
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
}

.warning {
  color: var(--color-error-text);
}

/*# sourceURL=fieldSettingsDialog.css */
`);

export default styles;
