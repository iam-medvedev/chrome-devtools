// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright 2022 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  display: block;
}

.row {
  display: flex;
  line-height: 20px;
  padding-left: 8px;
  gap: 12px;
  user-select: text;
}

.row.header-editable {
  font-family: var(--monospace-font-family);
  font-size: var(--monospace-font-size);
}

.header-name {
  color: var(--sys-color-on-surface);
  font-weight: 400;
  width: 30%;
  min-width: 160px;
  max-width: 240px;
  flex-shrink: 0;
  text-transform: capitalize;
  overflow-wrap: break-word;
}

.header-name,
.header-value {
  &::selection {
    color: var(--sys-color-on-tonal-container);
    background-color: var(--sys-color-tonal-container);
  }
}

.header-name.pseudo-header {
  text-transform: none;
}

.header-editable .header-name {
  color: var(--sys-color-token-property-special);
}

.row.header-deleted .header-name {
  color: var(--sys-color-token-subtle);
}

.header-value {
  display: flex;
  overflow-wrap: anywhere;
  margin-inline-end: 14px;
}

.header-badge-text {
  font-variant: small-caps;
  font-weight: 500;
  white-space: pre-wrap;
  word-break: break-all;
  text-transform: none;
}

.header-badge {
  display: inline;
  background-color: var(--sys-color-error);
  color: var(--sys-color-on-error);
  border-radius: 100vh;
  padding-left: 6px;
  padding-right: 6px;
}

.call-to-action {
  background-color: var(--sys-color-neutral-container);
  padding: 8px;
  border-radius: 5px;
  margin: 4px;
}

.call-to-action-body {
  padding: 6px 0;
  margin-left: 9.5px;
  border-left: 2px solid var(--issue-color-yellow);
  padding-left: 18px;
  line-height: 20px;
}

.call-to-action .explanation {
  font-weight: bold;
}

.call-to-action code {
  font-size: 90%;
}

.call-to-action .example .comment::before {
  content: " — ";
}

.link,
.devtools-link {
  color: var(--sys-color-primary);
  text-decoration: underline;
  cursor: pointer;
  outline-offset: 2px;
}

.explanation .link {
  font-weight: normal;
}

.inline-icon {
  vertical-align: middle;
}

.row-flex-icon {
  margin: 2px 5px 0;
}

.header-value code {
  display: block;
  white-space: pre-wrap;
  font-size: 90%;
  color: var(--sys-color-token-subtle);
}

x-link .inline-icon { /* stylelint-disable-line selector-type-no-unknown */
  padding-right: 3px;
}

.header-highlight {
  background-color: var(--sys-color-yellow-container);
}

.header-warning {
  color: var(--sys-color-error);
}

.header-overridden {
  background-color: var(--sys-color-tertiary-container);
  border-left: 3px solid var(--sys-color-tertiary);
  padding-left: 5px;
}

.header-deleted {
  background-color: var(--sys-color-surface-error);
  border-left: 3px solid var(--sys-color-error-bright);
  color: var(--sys-color-token-subtle);
  text-decoration: line-through;
}

.header-highlight.header-overridden {
  background-color: var(--sys-color-yellow-container);
  border-left: 3px solid var(--sys-color-tertiary);
  padding-left: 5px;
}

.inline-button {
  vertical-align: middle;
}

.row .inline-button {
  opacity: 0%;
  visibility: hidden;
  transition: opacity 200ms;
  padding-left: 2px;
}

.row.header-overridden:focus-within .inline-button,
.row.header-overridden:hover .inline-button {
  opacity: 100%;
  visibility: visible;
}

.row:hover .inline-button.enable-editing {
  opacity: 100%;
  visibility: visible;
}

.flex-right {
  margin-left: auto;
}

.flex-columns {
  flex-direction: column;
}

/*# sourceURL=HeaderSectionRow.css */
`
};