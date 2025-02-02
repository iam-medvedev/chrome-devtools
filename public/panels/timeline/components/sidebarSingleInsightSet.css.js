// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright 2024 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  display: block;
  padding: 5px 10px;
}

.metrics {
  display: grid;
  align-items: end;
  grid-template-columns: repeat(3, 1fr) 0.5fr;
  grid-row-gap: 5px;
}

.row-border {
  grid-column: 1/5;
  border-top: var(--sys-size-1) solid var(--sys-color-divider);
}

.row-label {
  visibility: hidden;
  font-size: var(--sys-size-7);
}

.metrics--field .row-label {
  visibility: visible;
}

.metrics-row {
  display: contents;
}

.metric {
  flex: 1;
  user-select: text;
  cursor: pointer;
  /* metric container is a button for a11y reasons, so remove default styles
   * */
  background: none;
  border: none;
  padding: 0;
  display: block;
  text-align: left;
}

.metric-value {
  font-size: var(--sys-size-10);
}

.metric-value-bad {
  color: var(--app-color-performance-bad);
}

.metric-value-ok {
  color: var(--app-color-performance-ok);
}

.metric-value-good {
  color: var(--app-color-performance-good);
}

.metric-score-unclassified {
  color: var(--sys-color-token-subtle);
}

.metric-label {
  font: var(--sys-typescale-body4-medium);
}

.number-with-unit {
  white-space: nowrap;

  .unit {
    font-size: 14px;
    padding: 0 1px;
  }
}

.passed-insights-section {
  margin-top: var(--sys-size-5);

  summary {
    font-weight: var(--ref-typeface-weight-medium);
  }
}

.field-mismatch-notice {
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  background-color: var(--sys-color-surface3);
  margin: var(--sys-size-6) 0;
  border-radius: var(--sys-shape-corner-extra-small);
  border: var(--sys-size-1) solid var(--sys-color-divider);

  h3 {
    margin-block: 3px;
    font: var(--sys-typescale-body4-medium);
    color: var(--sys-color-on-base);
    padding: var(--sys-size-5) var(--sys-size-6) 0 var(--sys-size-6);
  }

  .field-mismatch-notice__body {
    padding: var(--sys-size-3) var(--sys-size-6) var(--sys-size-5) var(--sys-size-6);
  }

  button {
    padding: 5px;
    background: unset;
    border: unset;
    font: inherit;
    color: var(--sys-color-primary);
    text-decoration: underline;
    cursor: pointer;
  }
}

/*# sourceURL=sidebarSingleInsightSet.css */
`
};