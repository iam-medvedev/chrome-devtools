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
  margin: var(--sys-size-6) 0;
  border-radius: var(--sys-shape-corner-extra-small);
  overflow: hidden;
  border: var(--sys-size-1) solid var(--sys-color-divider);
  background-color: var(--sys-color-base);

  &.closed {
    background-color: var(--sys-color-surface3);
    border: none;
  }

  header {
    padding: var(--sys-size-5) var(--sys-size-6);

    h3 {
      font: var(--sys-typescale-body4-medium);
    }
  }
}

.insight-hover-icon {
  position: absolute;
  top: var(--sys-size-5);
  right: var(--sys-size-5);
  border: none;
  width: var(--sys-size-9);
  user-select: none;
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

.insight-description,
.insight-body,
.insight-title {
  user-select: text;
}

.insight-body {
  padding: 0 var(--sys-size-6) var(--sys-size-5) var(--sys-size-6);
}

.insight-section {
  padding: var(--sys-size-5) 0;
}

.insight-description:not(:empty) {
  padding-bottom: var(--sys-size-5);
}

.insight-description:not(:empty),
.insight-section:not(:last-child) {
  border-bottom: var(--sys-size-1) solid var(--sys-color-divider);
}

.insight-title {
  color: var(--sys-color-on-base);
  margin-block: 3px;
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
  padding-block: var(--sys-size-3);
  display: flex;
  align-items: center;
}

.element-img {
  max-width: 20%;
  max-height: 20%;
  padding-inline: var(--sys-size-3);
}

.element-img-details {
  font: var(--sys-typescale-body4-regular);
  display: flex;
  flex-direction: column;

  .element-img-details-size {
    color: var(--color-text-secondary);
  }
}

::slotted(*) {
  font: var(--sys-typescale-body4-regular);
}

.insight-savings {
  font-weight: var(--ref-typeface-weight-bold);
  color: var(--sys-color-green);
}

ul.insight-icon-results {
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--sys-size-3);

    span {
      /* push the text down to align slightly better with the icons */
      padding-top: 2px;
    }
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

.lcp-element {
  display: inline-flex;
  align-items: center;
}

.insight-results:not(:last-child) {
  border-bottom: var(--sys-size-1) solid var(--sys-color-divider);
  padding-bottom: var(--sys-size-5);
}

.lcp-element:not(:empty) {
  padding: inherit;
}

/*# sourceURL=sidebarInsight.css */
`);

export default styles;
