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

.live-metrics,
.next-steps {
  padding: 8px 16px;
  background-color: var(--sys-color-cdt-base-container);
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.metric-cards {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  width: 100%;
}

.section-title {
  text-wrap: nowrap;
  font-size: 14px;
  font-weight: bold;
}

.metric-card {
  border: 1px solid var(--sys-color-divider);
  border-radius: 4px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: var(--color-background-elevation-1);
}

.metric-card-title {
  text-wrap: nowrap;
  font-size: 12px;
  font-weight: bold;
}

.metric-card-section-title {
  margin-top: 8px;
  text-wrap: nowrap;
  font-size: 12px;
  font-weight: bold;
}

.metric-card-value {
  text-wrap: nowrap;
  font-size: 26px;
}

.good {
  color: var(--color-tertiary-bright);
}

.needs-improvement {
  color: var(--color-orange-bright);
}

.poor {
  color: var(--color-error-bright);
}

.metric-card-element {
  overflow: hidden;
}

.interactions-list {
  padding: 0;
  overflow: auto;
  flex-grow: 1;
  min-height: 100px;
}

.interaction {
  display: flex;
  align-items: center;
  gap: 32px;
}

.interaction-type {
  font-weight: bold;
  width: 60px;
  flex-shrink: 0;
}

.interaction-node {
  overflow: hidden;
  flex-grow: 1;
}

.interaction-duration {
  text-align: end;
  width: max-content;
  flex-shrink: 0;
}

.divider {
  grid-column: 1/-1;
  width: 100%;
  border: 0;
  border-bottom: 1px solid var(--sys-color-divider);
  margin: 4px 0;
}

/*# sourceURL=liveMetricsView.css */
`);

export default styles;
