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

.settings-experiments-block {
  padding: 0 var(--sys-size-6) var(--sys-size-5) var(--sys-size-4);
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
}

.experiments-filter label {
  padding-bottom: 0;
}

.settings-select {
  align-items: center;
  display: grid;
  row-gap: var(--sys-size-3);
}

div:has(.settings-select) + div:has(.settings-select) {
  padding-top: var(--sys-size-5);
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

.settings-card-container-wrapper {
  scrollbar-gutter: stable;
  padding-bottom: var(--sys-size-8);
  overflow: auto;
  position: absolute;
  inset: var(--sys-size-8) 0 0;
}

.settings-card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sys-size-9);
}

.settings-multicolumn-card-container {
  column-width: var(--sys-size-32);
  column-gap: var(--sys-size-11);

  > * + * {
    margin-top: var(--sys-size-8);
  }

  > devtools-button {
    margin-left: var(--sys-size-5);
  }
}

.settings-card-container-wrapper select {
  margin-left: 10px;
  width: var(--sys-size-28);
}

.settings-card-container-wrapper setting-checkbox { /* stylelint-disable-line selector-type-no-unknown */
  min-height: var(--sys-size-13);
  position: relative;
  left: calc(var(--sys-size-4) * -1);
}

.settings-experiment {
  margin: 0;
  min-height: var(--sys-size-13);
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

.experiments-warning-subsection {
  display: flex;
  align-items: center;

  > devtools-icon {
    color: var(--sys-color-orange-bright);
    margin-right: var(--sys-size-4);
  }
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
