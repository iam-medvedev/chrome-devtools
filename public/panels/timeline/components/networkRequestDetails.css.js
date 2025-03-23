// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssText: `/*
 * Copyright (c) 2024 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.network-request-details-title {
  font-size: 13px;
  padding: 8px;
  display: flex;
  align-items: center;
}

.network-request-details-title > div {
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  border: 1px solid var(--sys-color-divider);
  display: inline-block;
  margin-right: 4px;
}

.network-request-details-content {
  border-bottom: 1px solid var(--sys-color-divider);
}

.network-request-details-cols {
  display: flex;
}

:host {
  display: contents; /* needed to avoid a floating border when scrolling */
}

.network-request-details-col {
  flex: 1;
}

.network-request-details-row {
  padding: 0 10px;
  min-height: min-content;
}

.title {
  color: var(--sys-color-token-subtle);
  overflow: hidden;
  padding-right: 10px;
  display: inline-block;
  vertical-align: top;
}

.value {
  display: inline-block;
  user-select: text;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0 3px;
}

.devtools-link,
.timeline-link {
  color: var(--text-link);
  text-decoration: underline;
  outline-offset: 2px;
  padding: 0;
  text-align: left;

  .elements-disclosure & {
    color: var(--text-link);
  }

  devtools-icon {
    vertical-align: baseline;
    color: var(--sys-color-primary);
  }

  :focus .selected & devtools-icon {
    color: var(--sys-color-tonal-container);
  }

  &:focus-visible {
    outline-width: unset;
  }

  &.invalid-link {
    color: var(--text-disabled);
    text-decoration: none;
  }

  &:not(.devtools-link-prevent-click, .invalid-link) {
    cursor: pointer;
  }

  @media (forced-colors: active) {
    &:not(.devtools-link-prevent-click) {
      forced-color-adjust: none;
      color: linktext;
    }

    &:focus-visible {
      background: Highlight;
      color: HighlightText;
    }
  }
}

.text-button.link-style,
.text-button.link-style:hover,
.text-button.link-style:active {
  background: none;
  border: none;
  font: inherit;
}

.timing-rows {
  width: fit-content;
}

/*# sourceURL=${import.meta.resolve('./networkRequestDetails.css')} */
`
};