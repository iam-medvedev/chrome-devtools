// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright (c) 2015 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.settings-window-main {
  color: var(--sys-color-on-surface);
  background-color: var(--sys-color-cdt-base-container);
}

.settings-content {
  overflow-y: auto;
  overflow-x: hidden;
  margin: 8px 8px 8px 0;
  padding: 0 4px;
  flex: auto;
}

.settings-container {
  width: 100%;
  column-width: 288px;
}

.settings-block {
  display: block;
  padding-bottom: 9px;
  width: 288px;
  break-inside: avoid;
}

.settings-tab.settings-container {
  column-width: 308px;
}

.settings-tab .settings-block {
  margin-left: 20px;
}

.settings-line {
  padding-bottom: 5px;
  margin-bottom: 5px;
}

.settings-key-cell {
  display: inline-block;
  width: 153px;
  white-space: nowrap;
  text-align: right;
  vertical-align: middle;
  padding-right: 6px;
}

.settings-cell {
  display: inline-block;
  width: 135px;
  vertical-align: middle;
}

.settings-section-title {
  font-size: 120%;
  text-align: left;
}

.settings-combine-keys {
  margin: 0 0.3em;
  font-size: 9px;
}

fieldset {
  margin: 0;
  padding: 0;
  border: none;
}

.experiments-filter {
  padding-top: 1px;
  display: flex;
  align-items: center;
}

label {
  padding-right: 8px;
  padding-bottom: 8px;
}

.experiments-filter label {
  padding-bottom: 0;
}

.settings-tab p {
  margin: 6px 0;
}

.settings-block p p {
  padding-left: 30px;
}

.settings-select {
  align-items: center;
  display: grid;
}

.settings-experiments-warning-subsection-warning {
  color: var(--sys-color-error);
}

.settings-experiments-warning-subsection-message {
  color: inherit;
}

.settings-content input[type="checkbox"] {
  margin: 1px 7px 1px 2px;
}

.settings-window-label-element {
  flex: none;
}

.settings-window-title {
  display: flex;
  align-items: center;
  font-size: var(--sys-size-9);
  color: var(--sys-color-on-surface);
  margin: var(--sys-size-8) var(--sys-size-7);

  &::before {
    content: "";
    width: var(--sys-size-9);
    height: var(--sys-size-9);
    margin-right: var(--sys-size-6);
    background-image: var(--image-file-devtools);
  }
}

.settings-container-wrapper {
  position: absolute;
  top: 31px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  padding-top: 9px;
  border-top: 1px solid var(--sys-color-divider);
}

.settings-card-container-wrapper {
  padding-top: var(--sys-size-8);
  overflow: auto;
  scrollbar-width: thin;
}

@media (max-width: 1000px) {
  .settings-card-container-wrapper {
    position: absolute;
    top: var(--sys-size-8);
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }
}

.settings-card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sys-size-9);
}

.settings-tab.settings-content {
  margin: 0;
  padding: 0;
}

.settings-tab-container {
  flex: auto;
  overflow: hidden;
}

.settings-tab-container header {
  padding: 0 0 6px;
}

#experiments-tab-content .settings-container {
  column-width: auto;
}

#experiments-tab-content .settings-block {
  width: auto;
  margin-left: 0;
  margin-right: 10px;
}

.settings-tab-container header > h1 {
  font-size: 18px;
  font-weight: normal;
  margin: 0;
  padding-bottom: 3px;
  white-space: nowrap;
}

.settings-tab .settings-section-title {
  margin-left: -20px;
  color: var(--sys-color-on-surface-subtle);
}

.settings-tab select {
  margin-left: 10px;
  width: 80%;
}

.settings-experiment {
  display: grid;
  grid-template-columns: auto min-content auto 1fr;

  & .devtools-link {
    display: flex !important; /* stylelint-disable-line declaration-no-important */
    align-items: center;
  }
}

devtools-button.link-icon {
  cursor: pointer;
}

.experiment-label {
  margin-right: 2px;
}

.settings-experiment-unstable {
  color: var(--sys-color-token-subtle);
}

.settings-experiment .feedback-link {
  color: var(--sys-color-primary);
  text-decoration-line: underline;
  margin-left: 4px;
}

.tabbed-pane-content slot::slotted(.widget) {
  /* '!important' in order to overwrite the slotted widget's 'overflow-auto' class.
  This prevents the focus-ring of selectable elements from being cut off. */
  overflow: visible !important; /* stylelint-disable-line declaration-no-important */
}

@media (forced-colors: active) {
  .settings-window-title {
    color: canvastext;
  }

  .tabbed-pane-header-tab {
    background: ButtonFace;
  }

  .tabbed-pane-header-tab-title {
    color: canvastext;
  }
}

@media (forced-colors: active) and (prefers-color-scheme: dark) {
  .tabbed-pane-header-tab.selected {
    background: ButtonFace;
  }

  .tabbed-pane-header-tab.selected .tabbed-pane-header-tab-title {
    color: HighlightText;
  }
}

/*# sourceURL=settingsScreen.css */
`);

export default styles;
