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

:host {
  devtools-icon.document {
    color: var(--override-file-source-icon-color, var(--icon-default));
  }

  devtools-icon.script,
  devtools-icon.sm-script,
  devtools-icon.snippet {
    color: var(--override-file-source-icon-color, var(--icon-file-script));
  }

  devtools-icon.stylesheet,
  devtools-icon.sm-stylesheet {
    color: var(--override-file-source-icon-color, var(--icon-file-styles));
  }

  devtools-icon.image,
  devtools-icon.font {
    color: var(--override-file-source-icon-color, var(--icon-file-image));
  }

  devtools-icon.dot::before {
    content: var(--image-file-empty);
    width: 7px;
    height: 7px;
    border-radius: 50%;
    outline: var(--sys-size-1) solid var(--icon-gap-focus-selected);
    top: 12px;
    left: 11px;
    position: absolute;
    z-index: 1;
  }

  devtools-icon.purple.dot::before {
    background-color: var(--sys-color-purple-bright);
  }

  devtools-icon.green.dot::before {
    background-color: var(--sys-color-green-bright);
  }
}

/*# sourceURL=fileSourceIcon.css */
`);

export default styles;
