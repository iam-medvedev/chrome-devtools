// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2021 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  white-space: pre;
  overflow: hidden;
  display: flex;
}

input {
  font-size: 14px;
}

.prefix {
  flex: none;
  color: var(--sys-color-primary);
}

.text-prompt-input {
  flex: auto;
  position: relative;
}

.text-prompt-input input {
  width: 100%;
  border: none;
  outline: none;
  position: absolute;
  left: 0;
  padding: 0;
  z-index: 2;
  background-color: transparent;
}

.text-prompt-input .suggestion {
  color: var(--sys-color-state-disabled);
  position: absolute;
  left: 0;
  z-index: 1;
}

/*# sourceURL=textPrompt.css */
`);

export default styles;
