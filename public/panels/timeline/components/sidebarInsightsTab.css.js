// Copyright 2025 The Chromium Authors. All rights reserved.
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
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
}

.insight-sets-wrapper {
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1; /* so it fills the available vertical height in the sidebar */

  details {
    flex-grow: 0;
  }

  details[open] {
    flex-grow: 1;
    border-bottom: 1px solid var(--sys-color-divider);
  }

  summary {
    background-color: var(--sys-color-surface2);
    border-bottom: 1px solid var(--sys-color-divider);
    overflow: hidden;
    padding: 2px 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    font: var(--sys-typescale-body4-medium);
    display: flex;
    align-items: center;

    &:focus {
      background-color: var(--sys-color-tonal-container);
    }

    &::marker {
      color: var(--sys-color-on-surface-subtle);
      font-size: 11px;
      line-height: 1;
    }

    /* make sure the first summary has a top border */
    details:first-child & {
      border-top: 1px solid var(--sys-color-divider);
    }
  }
}

.zoom-button {
  margin-left: auto;
}

.zoom-icon {
  visibility: hidden;

  &.active devtools-button {
    visibility: visible;
  }
}

.dropdown-icon {
  &.active devtools-button {
    transform: rotate(90deg);
  }
}

.feedback-wrapper {
  position: relative;
  padding: var(--sys-size-6);

  .tooltip {
    visibility: hidden;
    transition-property: visibility;
    position: absolute;
    bottom: 35px; /* height of button + a little extra padding */
    width: 90%;
    max-width: 300px;
    left: var(--sys-size-6);
    z-index: 1;
    box-sizing: border-box;
    padding: var(--sys-size-5) var(--sys-size-6);
    border-radius: var(--sys-shape-corner-small);
    background-color: var(--sys-color-cdt-base-container);
    box-shadow: var(--drop-shadow-depth-3);
  }

  devtools-button:hover + .tooltip {
    visibility: visible;
  }
}

/*# sourceURL=sidebarInsightsTab.css */
`);

export default styles;
