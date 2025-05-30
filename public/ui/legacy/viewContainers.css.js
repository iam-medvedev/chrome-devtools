// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default `/*
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

.expandable-view-title {
  display: flex;
  align-items: center;
  background-color: var(--sys-color-surface2);
  height: 22px;
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid transparent;
}

.expandable-view-title.expanded,
.expandable-view-title:last-child {
  border-bottom: 1px solid var(--sys-color-divider);
}

.expandable-view-title devtools-toolbar {
  margin-top: -3px;
}

.expandable-view-title > devtools-toolbar {
  position: absolute;
  right: 0;
  top: 0;
}

.expandable-view-title:not(.expanded) devtools-toolbar {
  display: none;
}

.title-expand-icon {
  margin-right: 2px;
  margin-bottom: -2px;
}

.expandable-view-title:focus-visible {
  background-color: var(--sys-color-state-focus-highlight);
}

@media (forced-colors: active) {
  .expandable-view-title:focus-visible {
    forced-color-adjust: none;
    color: HighlightText;
    background-color: Highlight;
    box-shadow: 0 0 0 2px Highlight inset;
  }

  .expandable-view-title:focus-visible .title-expand-icon {
    color: HighlightText;
  }
}

/*# sourceURL=${import.meta.resolve('./viewContainers.css')} */`;