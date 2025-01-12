// Copyright 2025 The Chromium Authors. All rights reserved.
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

.overflow-auto {
  height: 100%;
}

.controls {
  display: flex;
  flex-direction: column;
  padding: var(--sys-size-5) var(--sys-size-8) var(--sys-size-5) var(--sys-size-5);
  min-width: var(--sys-size-33);
}

.header {
  padding-left: var(--sys-size-5);
}

.title {
  font: var(--sys-typescale-headline4);
}

.card {
  display: flex;
  flex-direction: column;
  padding: var(--sys-size-6) var(--sys-size-8);
  gap: var(--sys-size-6);

  &.enterprise-disabled {
    color: var(--sys-color-token-subtle);
  }
}

.card-header {
  display: flex;
  align-items: center;
}

.card-header > .lhs {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: var(--sys-size-9);

  & > devtools-icon {
    height: var(--sys-size-11);
    width: var(--sys-size-11);
  }
}

.text {
  display: flex;
  flex-direction: column;
  gap: var(--sys-size-2);
}

.card-title {
  font: var(--sys-typescale-headline5);
}

.body {
  font: var(--sys-typescale-body4-regular);
}

.checkbox-label {
  gap: var(--sys-size-8);
  display: flex;
  align-items: center;
}

.card-row {
  padding-top: var(--sys-size-4);
  padding-bottom: var(--sys-size-4);
  padding-left: var(--sys-size-8);
}

.card-row-title {
  font: var(--sys-typescale-body4-medium);
}

.x-link {
  color: var(--sys-color-primary);
  text-decoration-line: underline;
  cursor: pointer;
}

.enterprise {
  display: flex;
  flex-direction: row;
  gap: var(--sys-size-9);
  padding: var(--sys-size-6) var(--sys-size-8) var(--sys-size-6) var(--sys-size-11);
  align-items: center;
}

input[type="checkbox"] {
  flex-shrink: 0;
}

/*# sourceURL=cookieControlsView.css */
`);

export default styles;
