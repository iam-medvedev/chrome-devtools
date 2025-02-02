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

.timespan-breakdown-overlay-section {
  border: solid;
  border-color: var(--sys-color-on-surface);
  border-width: 4px 1px 0;
  align-content: flex-start;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  background-image: linear-gradient(180deg, var(--sys-color-on-primary), transparent);
  height: 90%;
  box-sizing: border-box;
  padding-top: var(--sys-size-2);

  :host(.is-below) & {
    border-top-width: 0;
    border-bottom-width: 4px;
    align-content: flex-end; /* anchor the text at the bottom */
    padding-bottom: var(--sys-size-2);
    padding-top: 0;

    /* re-order so the timestamp is below label */
    .timespan-breakdown-overlay-label {
      display: flex;
      flex-direction: column-reverse;
    }
  }
}

:host {
  display: flex;
  overflow: hidden;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  max-height: 100px;

  /* Ensure that the first & last sections always have the left/right border */
  /* (disable stylelint because we need the !important to override border
   * styles below + keeping them here is clearer to read) */
  .timespan-breakdown-overlay-section:first-child {
    border-left-width: 1px !important; /* stylelint-disable-line declaration-no-important */
  }

  .timespan-breakdown-overlay-section:last-child {
    border-right-width: 1px !important; /* stylelint-disable-line declaration-no-important */
  }
}

:host(.is-below) {
  align-items: flex-start;
}

/* Depending on if the number of sections is odd or even, we alternate the
 * heights of the even/odd sections. We do this to ensure that the first item
 * is never a "high" item, because that looks a bit clunky. */
:host(.odd-number-of-sections) {
  .timespan-breakdown-overlay-section:nth-child(even) {
    height: 100%;
  }

  .timespan-breakdown-overlay-section:nth-child(odd) {
    border-left-width: 0;
    border-right-width: 0;
  }
}

:host(.even-number-of-sections) {
  .timespan-breakdown-overlay-section:nth-child(odd) {
    height: 100%;
  }

  .timespan-breakdown-overlay-section:nth-child(even) {
    border-left-width: 0;
    border-right-width: 0;
  }
}

.timespan-breakdown-overlay-label {
  font-family: var(--default-font-family);
  font-size: var(--sys-typescale-body2-size);
  line-height: var(--sys-typescale-body4-line-height);
  font-weight: var(--ref-typeface-weight-medium);
  color: var(--sys-color-on-surface);
  text-align: center;
  box-sizing: border-box;
  width: max-content;
  padding: 0 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;

  .duration-text {
    font-size: var(--sys-typescale-body4-size);
    text-overflow: ellipsis;
    overflow: hidden;
    text-wrap: nowrap;
    display: block;
  }

  .discovery-time-ms {
    font-weight: var(--ref-typeface-weight-bold);
  }

  &.labelHidden {
    /* Have to use this not display: none so it maintains its width */
    user-select: none;
    pointer-events: none;
    visibility: hidden;
  }

  &.labelTruncated {
    /* This means the label will show the text that fits with an ellipsis for
     * the overflow */
    max-width: 100%;
  }

  &.offScreenLeft {
    text-align: left;
  }

  &.offScreenRight {
    text-align: right;
  }
}

/*# sourceURL=timespanBreakdownOverlay.css */
`
};