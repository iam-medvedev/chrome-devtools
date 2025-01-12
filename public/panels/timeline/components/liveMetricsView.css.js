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

.container {
  /* stylelint-disable-next-line property-no-unknown */
  container-type: inline-size;
  height: 100%;
  font-size: var(--sys-typescale-body4-size);
  line-height: var(--sys-typescale-body4-line-height);
  font-weight: var(--ref-typeface-weight-regular);
  user-select: text;
}

.live-metrics-view {
  --min-main-area-size: 60%;

  background-color: var(--sys-color-cdt-base-container);
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.live-metrics,
.next-steps {
  padding: 16px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}

.live-metrics {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.next-steps {
  flex: 0 0 336px;
  box-sizing: border-box;
  border: none;
  border-left: 1px solid var(--sys-color-divider);
}

/* stylelint-disable-next-line at-rule-no-unknown */
@container (max-width: 650px) {
  .live-metrics-view {
    flex-direction: column;
  }

  .next-steps {
    flex-basis: 40%;
    border: none;
    border-top: 1px solid var(--sys-color-divider);
  }
}

.metric-cards {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  width: 100%;
}

.section-title {
  font-size: var(--sys-typescale-headline4-size);
  line-height: var(--sys-typescale-headline4-line-height);
  font-weight: var(--ref-typeface-weight-medium);
  margin: 0;
  margin-bottom: 10px;
}

.settings-card {
  border-radius: var(--sys-shape-corner-small);
  padding: 14px 16px 16px;
  background-color: var(--sys-color-surface3);
  margin-bottom: 16px;
}

.record-action-card {
  border-radius: var(--sys-shape-corner-small);
  padding: 12px 16px 12px 12px;
  background-color: var(--sys-color-surface3);
  margin-bottom: 16px;
}

.card-title {
  font-size: var(--sys-typescale-headline5-size);
  line-height: var(--sys-typescale-headline5-line-height);
  font-weight: var(--ref-typeface-weight-medium);
  margin: 0;
}

.settings-card .card-title {
  margin-bottom: 4px;
}

.device-toolbar-description {
  margin-bottom: 12px;
  display: flex;
}

.network-cache-setting {
  display: inline-block;
  max-width: max-content;
}

.throttling-recommendation-value {
  font-weight: var(--ref-typeface-weight-medium);
}

.related-info {
  text-wrap: nowrap;
  margin-top: 8px;
  display: flex;
}

.related-info-label {
  font-weight: var(--ref-typeface-weight-medium);
  margin-right: 4px;
}

.related-info-link {
  background-color: var(--sys-color-cdt-base-container);
  border-radius: 2px;
  padding: 0 2px;
  min-width: 0;
}

.local-field-link {
  margin-top: 8px;
}

.logs-section {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  flex: 1 0 300px;
  overflow: auto;
  max-height: max-content;

  --app-color-toolbar-background: transparent;
}

.logs-section-header {
  display: flex;
  align-items: center;
}

.interactions-clear {
  margin-left: 4px;
  vertical-align: sub;
}

.log {
  padding: 0;
  margin: 0;
  overflow: auto;
}

.log-item {
  border: none;
  border-bottom: 1px solid var(--sys-color-divider);

  &.highlight {
    animation: highlight-fadeout 2s;
  }
}

.interaction {
  --phase-table-margin: 120px;
  --details-indicator-width: 18px;

  summary {
    display: flex;
    align-items: center;
    padding: 7px 4px;

    &::before {
      content: " ";
      height: 14px;
      width: var(--details-indicator-width);
      mask-image: var(--image-file-triangle-right);
      background-color: var(--icon-default);
      flex-shrink: 0;
    }
  }

  details[open] summary::before {
    mask-image: var(--image-file-triangle-down);
  }
}

.interaction-type {
  font-weight: var(--ref-typeface-weight-medium);
  width: calc(var(--phase-table-margin) - var(--details-indicator-width));
  flex-shrink: 0;
}

.interaction-inp-chip {
  background-color: var(--sys-color-yellow-bright);
  color: var(--sys-color-on-yellow);
  padding: 0 2px;
}

.interaction-node {
  flex-grow: 1;
  margin-right: 32px;
  min-width: 0;
}

.interaction-info {
  width: var(--sys-typescale-body4-line-height);
  height: var(--sys-typescale-body4-line-height);
  margin-right: 6px;
}

.interaction-duration {
  text-align: end;
  width: max-content;
  flex-shrink: 0;
  font-weight: var(--ref-typeface-weight-medium);
}

.layout-shift {
  display: flex;
  align-items: flex-start;
}

.layout-shift-score {
  margin-right: 16px;
  padding: 7px 0;
  width: 150px;
  box-sizing: border-box;
}

.layout-shift-nodes {
  flex: 1;
  min-width: 0;
}

.layout-shift-node {
  border-bottom: 1px solid var(--sys-color-divider);
  padding: 7px 0;

  &:last-child {
    border: none;
  }
}

.record-action {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.shortcut-label {
  width: max-content;
  flex-shrink: 0;
}

.field-data-option {
  margin: 8px 0;
  max-width: 100%;
}

.field-setup-buttons {
  margin-top: 14px;
}

.field-data-message {
  margin-bottom: 12px;
}

.field-data-warning {
  margin-top: 4px;
  color: var(--sys-color-error);
  font-size: var(--sys-typescale-body4-size);
  line-height: var(--sys-typescale-body4-line-height);
  display: flex;

  &::before {
    content: " ";
    width: var(--sys-typescale-body4-line-height);
    height: var(--sys-typescale-body4-line-height);
    mask-size: var(--sys-typescale-body4-line-height);
    mask-image: var(--image-file-warning);
    background-color: var(--sys-color-error);
    margin-right: 4px;
    flex-shrink: 0;
  }
}

.collection-period-range {
  font-weight: var(--ref-typeface-weight-medium);
}

x-link { /* stylelint-disable-line selector-type-no-unknown */
  color: var(--sys-color-primary);
  text-decoration-line: underline;
}

.environment-option {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.environment-recs-list {
  margin: 0;
  padding-left: 20px;
}

.environment-rec {
  font-weight: var(--ref-typeface-weight-medium);
}

.link-to-log {
  padding: unset;
  background: unset;
  border: unset;
  font: inherit;
  color: var(--sys-color-primary);
  text-decoration: underline;
  cursor: pointer;
}

@keyframes highlight-fadeout {
  from {
    background-color: var(--sys-color-yellow-container);
  }

  to {
    background-color: transparent;
  }
}

.phase-table {
  border-top: 1px solid var(--sys-color-divider);
  padding: 7px 4px;
  margin-left: var(--phase-table-margin);
}

.phase-table-row {
  display: flex;
  justify-content: space-between;
}

.phase-table-header-row {
  font-weight: var(--ref-typeface-weight-medium);
  margin-bottom: 4px;
}

.log-extra-details-button {
  padding: unset;
  background: unset;
  border: unset;
  font: inherit;
  color: var(--sys-color-primary);
  text-decoration: underline;
  cursor: pointer;
}

.node-view {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: var(--sys-typescale-body4-size);
  line-height: var(--sys-typescale-body4-line-height);
  font-weight: var(--ref-typeface-weight-regular);
  user-select: text;

  main {
    width: 300px;
    max-width: 100%;
    text-align: center;

    .section-title {
      margin-bottom: 4px;
    }
  }
}

.node-description {
  margin-bottom: 12px;
}

/*# sourceURL=liveMetricsView.css */
`);

export default styles;
