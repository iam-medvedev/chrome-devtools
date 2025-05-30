// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default `/*
 * Copyright 2022 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  flex-grow: 1;
  padding: 6px;
}

.row {
  display: flex;
  flex-direction: row;
  color: var(--sys-color-token-property-special);
  font-family: var(--monospace-font-family);
  font-size: var(--monospace-font-size);
  align-items: center;
  line-height: 24px;
}

.row devtools-button {
  line-height: 1;
  margin-left: 0.1em;
}

.row devtools-button:nth-of-type(1) {
  margin-left: 0.8em;
}

.padded {
  margin-left: 2em;
}

.separator {
  margin-right: 0.5em;
  color: var(--sys-color-on-surface);
}

.editable {
  cursor: text;
  color: var(--sys-color-on-surface);
  overflow-wrap: break-word;
  min-height: 18px;
  line-height: 18px;
  min-width: 0.5em;
  background: transparent;
  border: none;
  outline: none;
  display: inline-block;
}

.editable.red {
  color: var(--sys-color-token-property-special);
}

.editable:hover,
.editable:focus {
  border: 1px solid var(--sys-color-neutral-outline);
  border-radius: 2px;
}

.row .inline-button {
  opacity: 0%;
  visibility: hidden;
  transition: opacity 200ms;
}

.row:focus-within .inline-button:not([hidden]),
.row:hover .inline-button:not([hidden]) {
  opacity: 100%;
  visibility: visible;
}

.center-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.centered {
  margin: 1em;
  max-width: 300px;
  text-align: center;
}

.error-header {
  font-weight: bold;
  margin-bottom: 1em;
}

.error-body {
  line-height: 1.5em;
  color: var(--sys-color-token-subtle);
}

.add-block {
  margin-top: 3px;
}

.header-name,
.header-value {
  min-width: min-content;
}

.link {
  color: var(--sys-color-primary);
  text-decoration: underline;
  cursor: pointer;
  outline-offset: 2px;
  padding: 0;
}

.learn-more-row {
  line-height: 24px;
}

/*# sourceURL=${import.meta.resolve('./HeadersView.css')} */`;