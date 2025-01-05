// Copyright 2024 The Chromium Authors. All rights reserved.
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

.resources-toolbar {
  border-top: 1px solid var(--sys-color-divider);
  background-color: var(--sys-color-cdt-base-container);
}

.top-resources-toolbar {
  border-bottom: 1px solid var(--sys-color-divider);
  background-color: var(--sys-color-cdt-base-container);
}

.resources.panel .status {
  float: right;
  height: 16px;
  margin-top: 1px;
  margin-left: 4px;
  line-height: 1em;
}

.storage-view {
  display: flex;
  overflow: hidden;
}

.storage-view .data-grid:not(.inline) {
  border: none;
  flex: auto;
}

.storage-view .storage-table-error {
  color: var(--sys-color-error);
  font-size: 24px;
  font-weight: bold;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.storage-view.query {
  padding: 2px 0;
  overflow: hidden overlay;
}

.storage-view .filter-bar {
  border-top: none;
  border-bottom: 1px solid var(--sys-color-divider);
}

.database-query-group-messages {
  overflow-y: auto;
}

.database-query-prompt-container {
  position: relative;
  padding: 1px 22px 1px 24px;
  min-height: 16px;
}

.database-query-prompt {
  white-space: pre-wrap;
}

.prompt-icon {
  position: absolute;
  display: block;
  left: 7px;
  top: 9px;
  margin-top: -7px;
  user-select: none;
}

.database-user-query .prompt-icon {
  margin-top: -10px;
}

.database-query-prompt-container .prompt-icon {
  top: 6px;
}

.database-user-query {
  position: relative;
  border-bottom: 1px solid var(--sys-color-divider);
  padding: 1px 22px 1px 24px;
  min-height: 16px;
  flex-shrink: 0;
}

.database-user-query:focus-visible {
  background-color: var(--sys-color-state-focus-highlight);
}

.database-query-text {
  color: var(--sys-color-primary-bright);
  user-select: text;
}

.database-query-result {
  position: relative;
  padding: 1px 22px;
  min-height: 16px;
  margin-left: -22px;
  padding-right: 0;
}

.database-query-result.error {
  color: var(--sys-color-token-property-special);
  user-select: text;
}

.database-query-result.error .prompt-icon {
  margin-top: -9px;
}

.resources-sidebar {
  padding: 0;
  overflow-x: auto;
  background-color: var(--sys-color-cdt-base-container);
}

/*# sourceURL=resourcesPanel.css */
`);

export default styles;
