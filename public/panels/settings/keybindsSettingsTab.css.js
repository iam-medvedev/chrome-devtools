// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2020 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

header {
  padding: 0 0 6px;
  border-bottom: 1px solid var(--sys-color-divider);
  flex: none;
  margin-bottom: 25px;
}

h1 {
  font-size: 18px;
  font-weight: normal;
  padding-bottom: 3px;
  margin: 0;
}

[role="list"] {
  overflow: auto;

  > * {
    min-width: 300px;
  }
}

.keybinds-key {
  padding: 0.1em 0.6em;
  border: 1px solid var(--sys-color-neutral-outline);
  font-size: 11px;
  background-color: var(--sys-color-neutral-container);
  color: var(--sys-color-on-surface);
  box-shadow: var(--box-shadow-outline-color);
  border-radius: 3px;
  display: inline-block;
  margin: 0 0.1em;
  text-shadow: 0 1px 0 var(--sys-color-cdt-base-container);
  line-height: 1.5;
  white-space: nowrap;
}

.keybinds-list-item {
  min-height: 30px;
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(30px, auto));
  grid-template-columns: 1fr 30px 2fr 30px 30px;
  flex: auto 1 1;
}

.keybinds-list-item:focus-visible {
  background-color: var(--sys-color-tonal-container);
}

.keybinds-list-item:not(.keybinds-category-header) {
  padding: 4px 0 4px 20px;
  border-radius: 7px;
}

.keybinds-list-item:not(.keybinds-category-header):last-child {
  margin-bottom: 5px;
}

.keybinds-list-item.keybinds-editing {
  background-color: var(--sys-color-neutral-container);
}

.keybinds-list-text.keybinds-action-name {
  padding-top: 7px;
  grid-row: 1 / 3;
}

.keybinds-shortcut,
.keybinds-info {
  grid-row: auto;
  grid-column: 3 / span 1;
}

.keybinds-shortcut.devtools-link {
  align-items: center;
  margin-left: 3px;
}

.keybinds-shortcut .devtools-link {
  padding: 4px 0;
}

.keybinds-info .devtools-link {
  padding-top: 6px;
}

.keybinds-error {
  color: var(--sys-color-error);
}

.keybinds-list-item.keybinds-editing .keybinds-shortcut {
  display: flex;
}

.keybinds-modified {
  grid-column: 2 / span 1;
  margin-top: 2px;
}

.keybinds-list-item button {
  border: none;
  padding: 0;
  background: transparent;
}

.keybinds-list-item button:hover devtools-icon {
  color: var(--icon-default-hover);
}

.keybinds-list-item button:focus-visible {
  background-color: var(--sys-color-tonal-container);
}

.keybinds-list-item button[disabled] {
  opacity: 40%;
}

.keybinds-confirm-button {
  grid-column: -2 / span 1;
}

.keybinds-cancel-button {
  grid-column: -1 / span 1;
}

.keybinds-edit-button {
  display: none;
  grid-row: 1 / span 1;
  grid-column: 4 / span 1;
}

.keybinds-list-item:not(.keybinds-editing):hover .keybinds-edit-button,
.keybinds-list-item:not(.keybinds-editing):focus-within .keybinds-edit-button {
  display: inline-block;
}

.keybinds-list-text {
  padding: 3px 0;
  user-select: none;
  color: var(--sys-color-on-surface);
  text-align: start;
  position: relative;
  margin-right: 0;
}

.keybinds-category-header {
  font-weight: bold;
  line-height: 30px;
  white-space: nowrap;
}

.keybinds-category-header:not(:nth-child(2)) {
  border-top: 1px solid var(--sys-color-divider);
}

.keybinds-list-item:not(.keybinds-category-header):hover,
.keybinds-list-item:not(.keybinds-editing):focus-within {
  background: var(--sys-color-state-hover-on-subtle);
}

.keybinds-set-select {
  text-align: right;
  margin-bottom: 25px;
}

.keybinds-set-select label p {
  display: inline;
  color: var(--sys-color-on-surface);
}

.keybinds-set-select select {
  margin-left: 6px;
}

button.text-button {
  width: fit-content;
  align-self: flex-end;
}

.keybinds-list-text input {
  margin: 0 2px;
}

.keybinds-list-text:has(.keybinds-delete-button) {
  grid-column: 3 / -1;
}

.docs-link.devtools-link {
  align-self: flex-start;
  min-height: 2em;
  line-height: 2em;
  margin-bottom: 4px;
}

.keybinds-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: fit-content;
  margin-top: 10px;
}

/*# sourceURL=keybindsSettingsTab.css */
`);

export default styles;
