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
  border-radius: 3px;
  width: fit-content;
  display: flex;
  align-items: center;
  background-color: var(--override-menu-background-color, var(--sys-color-cdt-base-container));
}

:host([has-open-dialog]) {
  background-color: var(--override-menu-active-background-color, var(--sys-color-neutral-container));
}

#container {
  list-style-type: none;
  margin-top: var(--sys-size-4);
  padding: 0;
  width: fit-content;
  display: block;
}

#container:focus {
  outline: none;
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

/*# sourceURL=${import.meta.resolve('./menu.css')} */
`
};