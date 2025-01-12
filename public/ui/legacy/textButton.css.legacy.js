// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright (c) 2014 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.text-button {
  margin: 2px;
  height: 24px;
  font-size: 12px;
  border: 1px solid var(--sys-color-tonal-outline);
  border-radius: 12px;
  padding: 0 12px;
  font-weight: 500;
  color: var(--sys-color-primary);
  background-color: var(--sys-color-cdt-base-container);
  flex: none;
  white-space: nowrap;
}

.text-button:disabled {
  opacity: 38%;
}

.text-button:not(:disabled):focus,
.text-button:not(:disabled):hover,
.text-button:not(:disabled):active {
  background-color: var(--sys-color-state-hover-on-subtle);
}

.text-button:not(:disabled, .primary-button):focus-visible {
  outline: 2px solid var(--sys-color-state-focus-ring);
  color: var(--sys-color-on-primary);
  background-color: var(--sys-color-cdt-base-container);
}

.text-button:not(:disabled, .running):focus,
.text-button:not(:disabled, .running):hover,
.text-button:not(:disabled, .running):active {
  color: var(--sys-color-primary);
}

.text-button.link-style,
.text-button.link-style:hover,
.text-button.link-style:active {
  background: none;
  border: none;
  outline: none;
  border-radius: 2px;
  margin: 0;
  padding: 0 !important; /* stylelint-disable-line declaration-no-important */
  font: inherit;
  cursor: pointer;
  height: unset;
}

.text-button.primary-button,
.text-button.primary-button:not(:disabled):focus {
  background-color: var(--sys-color-primary);
  border: none;
  color: var(--sys-color-on-primary);
}

.text-button.primary-button:not(:disabled):active {
  background-color: color-mix(in srgb, var(--sys-color-primary), var(--sys-color-state-ripple-primary) 32%);
  color: var(--sys-color-on-primary);
}

.text-button.primary-button:not(:disabled):hover {
  background-color: color-mix(in srgb, var(--sys-color-primary), var(--sys-color-state-hover-on-prominent) 6%);
  color: var(--sys-color-on-primary);
}

.text-button.primary-button:not(:disabled):focus-visible {
  background-color: var(--sys-color-primary);
  outline-offset: 2px;
  outline: 2px solid var(--sys-color-state-focus-ring);
  color: var(--sys-color-on-primary);
}

@media (forced-colors: active) {
  .text-button {
    background-color: ButtonFace;
    color: ButtonText;
    border-color: ButtonText;
  }

  .text-button:disabled {
    forced-color-adjust: none;
    opacity: 100%;
    background: ButtonFace;
    border-color: GrayText;
    color: GrayText;
  }

  .text-button:not(:disabled):focus-visible {
    forced-color-adjust: none;
    background-color: ButtonFace;
    color: Highlight !important; /* stylelint-disable-line declaration-no-important */
    border-color: Highlight;
    outline: 2px solid ButtonText;
    box-shadow: var(--legacy-focus-ring-active-shadow);
  }

  .text-button:not(:disabled):hover,
  .text-button:not(:disabled):active {
    forced-color-adjust: none;
    background-color: Highlight;
    color: HighlightText !important; /* stylelint-disable-line declaration-no-important */
    box-shadow: var(--sys-color-primary);
  }

  .text-button.primary-button {
    forced-color-adjust: none;
    background-color: Highlight;
    color: HighlightText;
    border: 1px solid Highlight;
  }

  .text-button.primary-button:not(:disabled):focus-visible {
    background-color: Highlight;
    color: HighlightText !important; /* stylelint-disable-line declaration-no-important */
    border-color: ButtonText;
  }

  .text-button.primary-button:not(:disabled):hover,
  .text-button.primary-button:not(:disabled):active {
    background-color: HighlightText;
    color: Highlight !important; /* stylelint-disable-line declaration-no-important */
    border-color: Highlight;
  }
}

/*# sourceURL=textButton.css */
`
};
