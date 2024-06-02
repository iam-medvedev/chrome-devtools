// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2022 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  display: inline-flex;
  vertical-align: middle;
}

:host(.hidden) {
  display: none;
}

.expand-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 14px;
  height: 10px;
  margin: 0 2px;
  border: 1px solid var(--override-adorner-border-color, var(--sys-color-tonal-outline));
  border-radius: 10px;
  background: var(--override-adorner-background-color, var(--sys-color-cdt-base-container));
  padding: 0;
  position: relative;

  &:hover::after,
  &:active::before {
    content: "";
    height: 100%;
    width: 100%;
    border-radius: inherit;
    position: absolute;
    top: 0;
    left: 0;
  }

  &:hover::after {
    background-color: var(--sys-color-state-hover-on-subtle);
  }

  &:active::before {
    background-color: var(--sys-color-state-ripple-neutral-on-subtle);
  }
}

.dot {
  height: var(--sys-size-2);
  width: var(--sys-size-2);
  background: var(--sys-color-primary);
  border-radius: 50%;
}

.dot + .dot {
  margin-left: 1px;
}

/*# sourceURL=elementsTreeExpandButton.css */
`);

export default styles;
