// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright 2017 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.dom-breakpoints-container {
  overflow: auto;
}

.breakpoint-list {
  padding-bottom: 3px;
}

.breakpoint-list .dom-breakpoint > div {
  overflow: hidden;
  text-overflow: ellipsis;
}

.breakpoint-entry {
  display: flex;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 2px 0;
}

.breakpoint-entry:focus-visible {
  background-color: var(--sys-color-tonal-container);
}

.breakpoint-hit {
  background-color: var(--sys-color-neutral-container);
  color: var(--sys-color-on-surface);
}

@media (forced-colors: active) {
  .breakpoint-entry:focus-visible,
  .breakpoint-list .breakpoint-entry:hover {
    forced-color-adjust: none;
    background-color: Highlight;
  }

  .breakpoint-entry:focus-visible *,
  .breakpoint-list .breakpoint-entry:hover * {
    color: HighlightText;
  }
}

/*# sourceURL=${import.meta.resolve('./domBreakpointsSidebarPane.css')} */
`
};