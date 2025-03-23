// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssText: `/*
 * Copyright 2024 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.layout-shift-details-title,
.cluster-details-title {
  padding-bottom: var(--sys-size-5);
  display: flex;
  align-items: center;

  .layout-shift-event-title,
  .cluster-event-title {
    background-color: var(--app-color-rendering);
    width: var(--sys-size-6);
    height: var(--sys-size-6);
    border: var(--sys-size-1) solid var(--sys-color-divider);
    display: inline-block;
    margin-right: var(--sys-size-3);
  }
}

.layout-shift-details-table {
  font: var(--sys-typescale-body4-regular);
  margin-bottom: var(--sys-size-4);
  text-align: left;
  border-block: var(--sys-size-1) solid var(--sys-color-divider);
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;

  th,
  td {
    padding-right: var(--sys-size-4);
    min-width: var(--sys-size-20);
    max-width: var(--sys-size-28);
  }
}

.table-title {
  th {
    font: var(--sys-typescale-body4-medium);
  }

  tr {
    border-bottom: var(--sys-size-1) solid var(--sys-color-divider);
  }
}

/** TODO: This is duplicated in sidebarInsights.css. Should make a component. */
.timeline-link {
  cursor: pointer;
  text-decoration: underline;
  color: var(--sys-color-primary);
  /* for a11y reasons this is a button, so we have to remove some default
   * styling */
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  text-align: left;
}

.timeline-link.invalid-link {
  color: var(--sys-color-state-disabled);
}

.details-row {
  display: flex;
  min-height: var(--sys-size-9);
}

.title {
  color: var(--sys-color-token-subtle);
  overflow: hidden;
  padding-right: var(--sys-size-5);
  display: inline-block;
  vertical-align: top;
}

.culprit {
  display: inline-flex;
  flex-direction: row;
  gap: var(--sys-size-3);
}

.value {
  display: inline-block;
  user-select: text;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0 var(--sys-size-3);
}

.layout-shift-summary-details,
.layout-shift-cluster-summary-details {
  font: var(--sys-typescale-body4-regular);
  display: flex;
  flex-direction: column;
  column-gap: var(--sys-size-4);
  padding: var(--sys-size-6) var(--sys-size-6) 0 var(--sys-size-6);
}

.culprits {
  display: flex;
  flex-direction: column;
}

.shift-row:not(:last-child) {
  border-bottom: var(--sys-size-1) solid var(--sys-color-divider);
}

.total-row {
  font: var(--sys-typescale-body4-medium);
}

/*# sourceURL=${import.meta.resolve('./layoutShiftDetails.css')} */
`
};