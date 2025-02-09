// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright 2022 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  display: inline;
}

.editable {
  cursor: text;
  overflow-wrap: anywhere;
  min-height: 18px;
  line-height: 18px;
  min-width: 0.5em;
  background: transparent;
  border: none;
  border-radius: 4px;
  outline: none;
  display: inline-block;
  font-family: var(--monospace-font-family);
  font-size: var(--monospace-font-size);

  &:hover {
    border: 1px solid var(--sys-color-neutral-outline);
  }

  &:focus {
    border: 1px solid var(--sys-color-state-focus-ring);
  }
}

.editable::selection {
  color: var(--sys-color-on-tonal-container);
  background-color: var(--sys-color-tonal-container);
}

/*# sourceURL=${import.meta.resolve('./EditableSpan.css')} */
`
};