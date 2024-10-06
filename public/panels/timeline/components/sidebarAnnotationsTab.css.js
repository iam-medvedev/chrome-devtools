// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2024 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  display: block;
  height: 100%;
}

.annotations {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
}

.visibility-setting {
  margin-top: auto;
}

.annotation-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .delete-button {
    visibility: hidden;
    border: none;
    background: none;
  }

  &:hover,
  &:focus-within {
    background-color: var(--sys-color-neutral-container);

    button.delete-button {
      visibility: visible;
    }
  }
}

.annotation {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  word-break: break-word;
  padding: var(--sys-size-8) 0;
  gap: 6px;
}

.annotation-identifier {
  padding: 4px 8px;
  border-radius: 10px;
  font-weight: bold;

  &.time-range {
    background-color: var(--app-color-performance-sidebar-time-range);
    color: var(--app-color-performance-sidebar-label-text-light);
  }
}

.entries-link {
  display: flex;
  flex-wrap: wrap;
  row-gap: 2px;
  align-items: center;
}

.label {
  font-size: larger;
}

.annotation-tutorial-container {
  padding: 10px;
}

.tutorial-card {
  display: block;
  position: relative;
  margin: 10px 0;
  padding: 10px;
  border-radius: var(--sys-shape-corner-extra-small);
  overflow: hidden;
  border: 1px solid var(--sys-color-divider);
  background-color: var(--sys-color-base);
}

.tutorial-image {
  display: flex;
  justify-content: center;

  & > img {
    max-width: 100%;
    height: auto;
  }
}

.tutorial-title,
.tutorial-description {
  margin: 5px 0;
}

/*# sourceURL=sidebarAnnotationsTab.css */
`);

export default styles;
