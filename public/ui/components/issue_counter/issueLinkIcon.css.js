// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright 2021 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  display: inline-block;
  white-space: nowrap;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
}

:host([hidden]) {
  display: none;
}

button {
  border: none;
  background: transparent;
  margin: 0;
  padding: 0;

  &.link {
    cursor: pointer;

    & > span {
      color: var(--sys-color-primary);
    }
  }
}

devtools-icon {
  width: 16px;
  height: 16px;
  vertical-align: middle;

  &[name="issue-cross-filled"] {
    color: var(--icon-error);
  }

  &[name="issue-exclamation-filled"] {
    color: var(--icon-warning);
  }

  &[name="issue-text-filled"] {
    color: var(--icon-info);
  }
}

@media (forced-colors: active) {
  devtools-icon {
    color: ButtonText;
  }
}

/*# sourceURL=${import.meta.resolve('./issueLinkIcon.css')} */
`
};