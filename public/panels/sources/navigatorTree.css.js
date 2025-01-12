// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright (C) 2006, 2007, 2008 Apple Inc.  All rights reserved.
 * Copyright (C) 2009 Anthony Ricaud <rik@webkit.org>
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1.  Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 * 2.  Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 * 3.  Neither the name of Apple Computer, Inc. ("Apple") nor the names of
 *     its contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE AND ITS CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL APPLE OR ITS CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

.is-ignore-listed {
  .tree-element-title,
  .leading-icons {
    opacity: 40%;
  }
}

.tree-outline li {
  min-height: 20px;
}

.tree-outline li:hover:not(.selected) .selection {
  display: block;
  background-color: var(--sys-color-state-hover-on-subtle);
}

.navigator-fs-folder-tree-item devtools-icon {
  color: var(--icon-folder-workspace);
}

.navigator-fs-tree-item devtools-icon {
  color: var(--icon-file-authored);
}

.navigator-nw-folder-tree-item devtools-icon {
  color: var(--icon-folder-deployed);
}

.navigator-sm-script-tree-item devtools-icon,
.navigator-script-tree-item devtools-icon,
.navigator-snippet-tree-item devtools-icon {
  color: var(--icon-file-script);
}

.navigator-file-tree-item .ai-button-container {
  display: none;
  position: absolute;
  z-index: 999;
  right: var(--sys-size-3);
}

.navigator-file-tree-item:hover .ai-button-container {
  display: inline-flex;
}

.navigator-file-tree-item devtools-icon.dot::before {
  width: 7px;
  height: 7px;
  top: 12px;
  left: 11px;
}

.navigator-file-tree-item:hover:not(.force-white-icons) devtools-icon.dot::before {
  outline-color: var(--icon-gap-hover);
}

.navigator-file-tree-item.selected:not(.force-white-icons) devtools-icon.dot::before {
  outline-color: var(--icon-gap-inactive);
}

.navigator-file-tree-item.selected.force-white-icons devtools-icon.dot::before {
  outline-color: var(--icon-gap-focus-selected);
}

.navigator-sm-stylesheet-tree-item devtools-icon,
.navigator-stylesheet-tree-item devtools-icon {
  color: var(--icon-file-styles);
}

.navigator-image-tree-item devtools-icon,
.navigator-font-tree-item devtools-icon {
  color: var(--icon-file-image);
}

.navigator-nw-folder-tree-item.is-from-source-map devtools-icon {
  color: var(--icon-folder-authored);
}

.navigator-fs-tree-item:not(.has-mapped-files, .selected) > :not(.selection),
.navigator-fs-folder-tree-item:not(.has-mapped-files, .selected) > :not(.selection) {
  color: var(--sys-color-on-surface-subtle);
  opacity: 40%;

  & devtools-icon {
    color: var(--sys-color-on-surface-subtle);
  }
}

.tree-outline:not(:has(.navigator-deployed-tree-item)) .navigator-sm-folder-tree-item .tree-element-title,
.tree-outline:not(:has(.navigator-deployed-tree-item)) .navigator-sm-script-tree-item .tree-element-title,
.tree-outline:not(:has(.navigator-deployed-tree-item)) .navigator-sm-stylesheet-tree-item .tree-element-title {
  font-style: italic;
}

@media (forced-colors: active) {
  .tree-outline li .leading-icons devtools-icon {
    color: ButtonText;
  }

  .tree-outline li:hover:not(.selected) .selection,
  .tree-outline li:hover:not(:has(dt-checkbox)) .selection {
    forced-color-adjust: none;
    background-color: Highlight;
  }

  .tree-outline:not(.hide-selection-when-blurred) li.parent:hover:not(.selected)::before {
    background-color: HighlightText;
  }

  .tree-outline:not(.hide-selection-when-blurred) li:hover:not(.selected) devtools-icon,
  .tree-outline li:not(.selected):hover .tree-element-title {
    forced-color-adjust: none;
    color: HighlightText;
  }

  .navigator-fs-tree-item:not(.has-mapped-files, .selected) > :not(.selection),
  .navigator-fs-folder-tree-item:not(.has-mapped-files, .selected) > :not(.selection),
  .is-ignore-listed {
    filter: none;
    opacity: 100%;
  }
}

/*# sourceURL=navigatorTree.css */
`);

export default styles;
