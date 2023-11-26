// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright (C) 2011 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY GOOGLE INC. AND ITS CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GOOGLE INC.
 * OR ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

.shadow-split-widget {
  display: flex;
  overflow: hidden;
}

.shadow-split-widget-contents {
  display: flex;
  position: relative;
  flex-direction: column;
  contain: layout size style;
}

.shadow-split-widget-sidebar {
  flex: none;
}

.shadow-split-widget-main,
.shadow-split-widget-sidebar.maximized {
  flex: auto;
}

.shadow-split-widget.hbox > .shadow-split-widget-resizer {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 6px;
  z-index: 4000;
}

.shadow-split-widget.vbox > .shadow-split-widget-resizer {
  position: absolute;
  left: 0;
  right: 0;
  height: 6px;
  z-index: 4000;
}

.shadow-split-widget.vbox > .shadow-split-widget-sidebar.no-default-splitter {
  border: 0 !important; /* stylelint-disable-line declaration-no-important */
}

.shadow-split-widget.vbox > .shadow-split-widget-sidebar:not(.maximized) {
  border: 0;
  border-top: 1px solid var(--sys-color-divider);
}

.shadow-split-widget.hbox > .shadow-split-widget-sidebar:not(.maximized) {
  border: 0;
  border-left: 1px solid var(--sys-color-divider);
}

.shadow-split-widget.vbox > .shadow-split-widget-sidebar:first-child:not(.maximized) {
  border: 0;
  border-bottom: 1px solid var(--sys-color-divider);
}

.shadow-split-widget.hbox > .shadow-split-widget-sidebar:first-child:not(.maximized) {
  border: 0;
  border-right: 1px solid var(--sys-color-divider);
}

:host-context(.disable-resizer-for-elements-hack) .shadow-split-widget-resizer {
  pointer-events: none;
}
`
};
