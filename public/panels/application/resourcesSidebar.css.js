// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright 2016 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.tree-outline {
  li.storage-group-list-item,
  li.storage-group-list-item:not(:has(dt-checkbox)) {
    padding: 0 var(--sys-size-8) 0 var(--sys-size-3);

    &::before {
      display: none;
    }

    &:hover .selection,
    &:active .selection::before {
      background-color: transparent;
    }

    & + ol {
      padding-left: 0;
    }
  }

  li.storage-group-list-item:not(:first-child) {
    margin-top: var(--sys-size-6);
  }
}

.icons-container devtools-icon.red-icon {
  color: var(--icon-error);
}

.icons-container devtools-icon.warn-icon {
  color: var(--icon-warning);
}

devtools-icon.navigator-file-tree-item {
  color: var(--icon-file-default);
}

devtools-icon.navigator-folder-tree-item {
  color: var(--icon-folder-primary);
}

devtools-icon.navigator-script-tree-item {
  color: var(--icon-file-script);
}

devtools-icon.navigator-stylesheet-tree-item {
  color: var(--icon-file-styles);
}

devtools-icon.navigator-image-tree-item,
devtools-icon.navigator-font-tree-item {
  color: var(--icon-file-image);
}

.window-closed .tree-element-title {
  text-decoration: line-through;
}

/*# sourceURL=resourcesSidebar.css */
`
};