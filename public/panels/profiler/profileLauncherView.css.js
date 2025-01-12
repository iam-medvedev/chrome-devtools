// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2018 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.profile-launcher-view {
  overflow: auto;
}

.profile-launcher-view-content {
  margin: 10px 16px;
  flex: auto 1 0;

  & h1 {
    font: var(--sys-typescale-headline4);
    margin: 6px 0 10px;
  }

  & label {
    font: var(--sys-typescale-body3-regular);
  }

  & p {
    color: var(--sys-color-token-subtle);
    margin-top: var(--sys-size-1);
    margin-left: var(--sys-size-10);

    & > dt-checkbox {
      display: flex;
    }
  }

  .profile-launcher-view-content button.text-button.running,
  .profile-launcher-view-content button.text-button.running:focus {
    color: var(--sys-color-error);
  }

  & > div {
    flex: auto 0 0;
  }

  & > .profile-isolate-selector-block {
    flex: auto 1 0;
    overflow: hidden;
  }
}

.profile-launcher-target-list {
  margin-bottom: 6px;
  border: 1px solid var(--sys-color-divider);
  flex: 150px 1 0;
}

.profile-launcher-target-list-container {
  overflow: auto;
}

.profile-memory-usage-item {
  min-width: 100%;
  width: max-content;
  padding: 4px;
  line-height: 16px;
}

.profile-isolate-selector-block > .profile-memory-usage-item {
  margin-left: 1px;
  margin-bottom: 4px;
  font-weight: bolder;
}

.profile-memory-usage-item.selected {
  background-color: var(--sys-color-neutral-container);
}

.profile-memory-usage-item:focus {
  background-color: var(--sys-color-tonal-container);
}

.profile-launcher-target-list .profile-memory-usage-item:hover:not(.selected) {
  background-color: var(--sys-color-state-hover-on-subtle);
}

.javascript-vm-instances-list {
  width: max-content;
  min-width: 100%;
}

.javascript-vm-instances-list:focus .profile-memory-usage-item.selected {
  background-color: var(--sys-color-tonal-container);
}

.profile-memory-usage-item > div {
  flex-shrink: 0;
  margin-right: 12px;
}

.profile-memory-usage-item-size {
  width: 60px;
  text-align: right;
}

.profile-memory-usage-item-trend {
  min-width: 5em;
  color: var(--sys-color-tertiary);
}

.profile-memory-usage-item-trend.increasing {
  color: var(--sys-color-error);
}

.profile-launcher-buttons {
  flex-wrap: wrap;
  column-gap: 8px;
}

@media (forced-colors: active) {
  .profile-memory-usage-item {
    forced-color-adjust: none;
    border-left-color: transparent;
  }

  .profile-memory-usage-item-trend,
  .profile-memory-usage-item-trend.increasing,
  .profile-launcher-view-content button.running {
    color: ButtonText;
  }

  .javascript-vm-instances-list .profile-memory-usage-item:hover:not(.selected) {
    background-color: Highlight;
    color: HighlightText;
  }

  .javascript-vm-instances-list .profile-memory-usage-item.selected .profile-memory-usage-item-trend,
  .javascript-vm-instances-list .profile-memory-usage-item.selected .profile-memory-usage-item-trend.increasing {
    color: ButtonFace;
  }

  .javascript-vm-instances-list .profile-memory-usage-item:hover:not(.selected) .profile-memory-usage-item-trend,
  .javascript-vm-instances-list .profile-memory-usage-item:hover:not(.selected) .profile-memory-usage-item-trend.increasing {
    background-color: Highlight;
    color: HighlightText;
  }

  .javascript-vm-instances-list .profile-memory-usage-item.selected {
    background-color: ButtonText;
    border-color: Highlight;
    color: ButtonFace;
  }

  .javascript-vm-instances-list:focus .profile-memory-usage-item.selected,
  .javascript-vm-instances-list:focus-visible .profile-memory-usage-item.selected {
    background-color: Highlight;
    border-color: ButtonText;
    color: HighlightText;
  }
}

/*# sourceURL=profileLauncherView.css */
`);

export default styles;
