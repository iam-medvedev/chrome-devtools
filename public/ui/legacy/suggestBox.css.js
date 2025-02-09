// Copyright 2025 The Chromium Authors. All rights reserved.
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
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

:host {
  display: flex;
  flex: auto;
}

.suggest-box {
  flex: auto;
  background-color: var(--sys-color-cdt-base-container);
  pointer-events: auto;
  margin-left: -3px;
  box-shadow: var(--drop-shadow);
  overflow-x: hidden;
}

.suggest-box-content-item {
  padding: 1px 0 1px 1px;
  margin: 0;
  border: 1px solid transparent;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.suggest-box-content-item.secondary {
  background-color: var(--sys-color-neutral-container);
  justify-content: normal;
}

.suggestion-title {
  overflow: hidden;
  text-overflow: ellipsis;
}

.suggestion-title span {
  white-space: pre;
}

.suggestion-subtitle {
  flex: auto;
  text-align: right;
  color: var(--sys-color-token-subtle);
  margin-right: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.suggest-box-content-item devtools-icon {
  color: var(--sys-color-on-surface-subtle);
  margin-right: 1px;
}

.suggest-box-content-item .query {
  font-weight: bold;
}

.suggest-box-content-item .spacer {
  display: inline-block;
  width: 20px;
}

.suggest-box-content-item.selected {
  background-color: var(--sys-color-tonal-container);
}

.suggest-box-content-item.selected .suggestion-subtitle,
.suggest-box-content-item.selected > span {
  color: var(--sys-color-on-tonal-container);
}

.suggest-box-content-item:hover:not(.selected) {
  background-color: var(--sys-color-state-hover-on-subtle);
}

@media (forced-colors: active) {
  .suggest-box-content-item.selected {
    forced-color-adjust: none;
    background-color: Highlight;
  }

  .suggest-box-content-item.selected > span {
    color: HighlightText;
  }
}

/*# sourceURL=${import.meta.resolve('./suggestBox.css')} */
`
};