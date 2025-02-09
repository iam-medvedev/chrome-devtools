// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright 2023 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  border: 1px solid var(--sys-color-neutral-outline);
  border-radius: var(--sys-shape-corner-extra-small);
  width: fit-content;
  display: flex;
  align-items: center;
  background-color: var(--sys-color-cdt-base-container);
}

:host([has-open-dialog]) {
  outline: var(--sys-size-2) solid var(--sys-color-state-focus-ring);
  background:
    linear-gradient(var(--sys-color-state-hover-on-subtle), var(--sys-color-state-hover-on-subtle)),
    linear-gradient(var(--sys-color-state-ripple-neutral-on-subtle), var(--sys-color-state-ripple-neutral-on-subtle));
}

button {
  background: none;
}

#side-button {
  border: 1px solid var(--sys-color-neutral-outline);
  border-radius: 3px 0 0 3px;
  border-right: none;
  height: 100%;
  position: relative;
  padding: var(--override-select-button-padding);
}

button:disabled {
  pointer-events: none;
}

@keyframes slideIn {
  from {
    transform: var(--translate-dialog);
    opacity: 0%;
  }

  to {
    transform: none;
    opacity: 100%;
  }
}

/*# sourceURL=${import.meta.resolve('./selectMenu.css')} */
`
};