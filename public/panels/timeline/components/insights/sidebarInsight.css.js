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

.insight {
  display: block;
  position: relative;
  width: auto;
  height: auto;
  margin: 10px 0;
  border-radius: var(--sys-shape-corner-extra-small);
  overflow: hidden;
  border: 1px solid var(--sys-color-divider);
  background-color: var(--sys-color-base);

  &.closed {
    background-color: var(--sys-color-surface3);
    border: none;
  }

  header {
    padding: 10px;

    h3 {
      font: var(--sys-typescale-body4-medium);
    }
  }
}

.insight-hover-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  width: var(--sys-size-9);
  height: var(--sys-size-9);
  box-shadow: var(--sys-elevation-level1);
  border-radius: var(--sys-shape-corner-full);
  background: var(--sys-color-cdt-base-container);
  opacity: 0%;
  transition: opacity 0.2s ease;

  .insight:hover & {
    opacity: 100%;
  }

  devtools-button {
    transition: transform 0.2s ease;
  }

  &.active devtools-button {
    transform: rotate(180deg);
  }
}

.insight-body {
  padding: 0 10px;
}

.insight-title {
  color: var(--sys-color-on-base);
  margin-block: 3px;
}

.table-container dl {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.table-container dt {
  padding: 3px;
}

.table-container dd {
  display: grid;
  justify-items: end;
  margin-inline-start: auto;
}

.insight-description {
  border-bottom: 1px solid var(--sys-color-divider);
  padding-bottom: 10px;
}

.link {
  color: var(--sys-color-primary);
}

.dl-title {
  font-weight: bold;
}

dd.dl-title {
  text-align: right;
}

.dl-value {
  font-weight: bold;
}

.metric-value-bad {
  color: var(--app-color-performance-bad);
}

.metric-value-good {
  color: var(--app-color-performance-good);
}

.insight-entry {
  font: var(--sys-typescale-body4-medium);
  padding-block: 2px;
  display: flex;
  align-items: center;
}

.insight-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding-block: 10px;
}

.element-img {
  max-width: 90%;
}

.element-img-details {
  font: var(--sys-typescale-body4-regular);

  .element-img-details-size {
    color: var(--color-text-secondary);
  }
}

::slotted(*) {
  font: var(--sys-typescale-body4-regular);
}

.insight-savings {
  font-weight: var(--ref-typeface-weight-bold);
}

ul.insight-icon-results {
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 4px;

    span {
      /* push the text down to align slightly better with the icons */
      padding-top: 2px;
    }
  }
}

/*# sourceURL=sidebarInsight.css */
`);

export default styles;
