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

.paused-message {
  align-self: center;
  width: fit-content;
}

.scripts-debug-toolbar {
  position: absolute;
  top: 0;
  width: 100%;
  background-color: var(--app-color-toolbar-background);
  border-bottom: 1px solid var(--sys-color-divider);
  overflow: hidden;
  z-index: 1;
}

.scripts-debug-toolbar-drawer {
  flex: 0 0 52px;
  transition: margin-top 0.1s ease-in-out;
  margin-top: -26px;
  padding-top: 25px;
  background-color: var(--sys-color-cdt-base-container);
  overflow: hidden;
  white-space: nowrap;
}

.scripts-debug-toolbar-drawer.expanded {
  margin-top: 0;
}

.scripts-debug-toolbar-drawer > dt-checkbox {
  display: none;
  padding-left: 3px;
  height: 28px;
}

.scripts-debug-toolbar-drawer.expanded > dt-checkbox {
  display: flex;
}

.cursor-auto {
  cursor: auto;
}

.navigator-tabbed-pane {
  background-color: var(--sys-color-cdt-base-container);
}

/*# sourceURL=sourcesPanel.css */
`);

export default styles;
