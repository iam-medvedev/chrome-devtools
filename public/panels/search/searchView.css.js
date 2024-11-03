// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2014 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.search-drawer-header {
  align-items: center;
  flex-shrink: 0;
  overflow: hidden;
  display: inline-flex;
  min-width: 150px;

  .search-container {
    border-bottom: 1px solid var(--sys-color-divider);
    display: flex;
    height: 100%;
    align-items: center;
    flex-grow: 1;
  }

  .toolbar-item-search {
    flex-grow: 1;
    box-shadow: inset 0 0 0 2px transparent;
    box-sizing: border-box;
    height: var(--sys-size-11);
    margin-left: var(--sys-size-3);
    padding: 0 var(--sys-size-2) 0 var(--sys-size-5);
    border-radius: 100px;
    position: relative;
    display: flex;
    align-items: center;
    background-color: var(--sys-color-cdt-base);

    &:has(input:focus) {
      box-shadow: inset 0 0 0 2px var(--sys-color-state-focus-ring);
    }

    &:has(input:hover)::before {
      content: "";
      box-sizing: inherit;
      height: 100%;
      width: 100%;
      position: absolute;
      border-radius: 100px;
      left: 0;
      background-color: var(--sys-color-state-hover-on-subtle);
    }

    & > devtools-icon {
      color: var(--sys-color-on-surface-subtle);
      width: var(--sys-size-8);
      height: var(--sys-size-8);
      margin-right: var(--sys-size-3);
    }

    & > devtools-button:last-child {
      margin-right: var(--sys-size-4);
    }
  }

  .search-toolbar-input {
    appearance: none;
    color: var(--sys-color-on-surface);
    background-color: transparent;
    border: 0;
    z-index: 1;
    flex: 1;

    &::placeholder {
      color: var(--sys-color-on-surface-subtle);
    }

    &:placeholder-shown + .clear-button {
      display: none;
    }

    &::-webkit-search-cancel-button {
      display: none;
    }
  }
}

.search-toolbar {
  background-color: var(--sys-color-cdt-base-container);
  border-bottom: 1px solid var(--sys-color-divider);
}

.search-toolbar-summary {
  background-color: var(--sys-color-cdt-base-container);
  border-top: 1px solid var(--sys-color-divider);
  padding-left: 5px;
  flex: 0 0 19px;
  display: flex;
  padding-right: 5px;
}

.search-toolbar-summary .search-message {
  padding-top: 2px;
  padding-left: 1ex;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.search-view .search-results {
  overflow-y: auto;
  display: flex;
  flex: auto;
}

.search-view .search-results > div {
  flex: auto;
}

/*# sourceURL=searchView.css */
`);

export default styles;
