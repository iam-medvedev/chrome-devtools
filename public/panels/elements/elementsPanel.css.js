// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssText: `/*
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

#main-content {
  position: relative;
  flex: 1 1;
}

#elements-content {
  overflow: auto;
  padding: 2px 0 0;
  height: 100%;
}

.style-panes-wrapper {
  overflow: hidden scroll;
  background-color: var(--sys-color-cdt-base-container);

  & > div:not(:last-child) {
    border-bottom: 1px solid var(--sys-color-divider);
  }
}

#elements-content:not(.elements-wrap) > div {
  display: inline-block;
  min-width: 100%;
}

#elements-crumbs {
  background-color: var(--sys-color-cdt-base-container);
  border-top: 1px solid var(--sys-color-divider);
  overflow: hidden;
  width: 100%;
}

devtools-adorner-settings-pane {
  margin-bottom: 10px;
  border-bottom: 1px solid var(--sys-color-divider);
  overflow: auto;
}

devtools-tree-outline {
  overflow: auto;
}

.axtree-button {
  position: absolute;
  top: var(--sys-size-8);
  right: var(--sys-size-9);
  background-color: var(--sys-color-cdt-base-container);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  border-radius: var(--sys-shape-corner-full);
  box-shadow: var(--sys-elevation-level1);
}

/*# sourceURL=${import.meta.resolve('./elementsPanel.css')} */
`
};