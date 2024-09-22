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

.timeline-details-chip-decorative-title {
  border: var(--sys-size-1) solid var(--sys-color-primary);
  border-radius: var(--sys-shape-corner-extra-small);
  display: flex;
  margin-top: var(--sys-size-5);
  margin-left: var(--sys-size-4);
  padding: var(--sys-size-3);
  width: max-content;

  .insight-keyword {
    color: var(--sys-color-primary);
    padding-inline: inherit;
  }
}

.layout-shift-details-title {
  padding: var(--sys-size-5);
  display: flex;
  align-items: center;

  .layout-shift-event-chip {
    background-color: var(--app-color-rendering);
    width: var(--sys-size-6);
    height: var(--sys-size-6);
    border: var(--sys-size-1) solid var(--sys-color-divider);
    display: inline-block;
    margin-right: var(--sys-size-3);
  }
}

.layout-shift-details-table {
  width: 90%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: var(--sys-size-5);
  margin-left: var(--sys-size-5);
  text-align: left;

  .table-title th {
    font-weight: var(--ref-typeface-weight-medium);
    border-block: var(--sys-size-1) solid var(--sys-color-divider);
    padding: 0;
  }

  .culprit-types tr,
  .culprits tr {
    border-bottom: var(--sys-size-1) solid var(--sys-color-divider);
    border-spacing: 0;
  }
}

.devtools-link {
  cursor: pointer;
  text-decoration: underline;
  color: var(--sys-color-primary);
}

.devtools-link.invalid-link {
  color: var(--sys-color-state-disabled);
}

/*# sourceURL=layoutShiftDetails.css */
`);

export default styles;