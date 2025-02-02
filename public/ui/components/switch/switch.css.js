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
  position: relative;
  display: inline-block;
  width: 26px;
  height: var(--sys-size-8);
}

input {
  opacity: 0%;
  width: 0;
  height: 0;
}

.slider {
  box-sizing: border-box;
  position: absolute;
  cursor: pointer;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--sys-color-surface-variant);
  border: 1px solid var(--sys-color-outline);
  border-radius: var(--sys-shape-corner-full);
  transition: background-color 80ms linear;
}

.slider::before {
  position: absolute;
  content: "";
  height: var(--sys-size-5);
  width: var(--sys-size-5);
  border-radius: var(--sys-shape-corner-full);
  top: calc(50% - 4px);
  left: 3px;
  background-color: var(--sys-color-outline);
  transition:
    transform 80ms linear,
    background-color 80ms linear,
    width 80ms linear,
    height 80ms linear,
    top 80ms linear,
    left 80ms linear;
}

input:focus-visible + .slider {
  outline: 2px solid var(--sys-color-state-focus-ring);
  outline-offset: 2px;
}

input:checked {
  & + .slider {
    background-color: var(--sys-color-primary);
    border: 1px solid var(--sys-color-primary);
  }

  & + .slider::before {
    left: 11px;
    height: var(--sys-size-6);
    width: var(--sys-size-6);
    top: calc(50% - 6px);
    background-color: var(--sys-color-on-primary);
  }
}

input:disabled:not(:checked) {
  & + .slider {
    background-color: transparent;
    border-color: var(--sys-color-state-disabled);
  }

  & + .slider::before {
    background-color: var(--sys-color-state-disabled);
  }
}

input:disabled:checked {
  & + .slider {
    background-color: var(--sys-color-state-disabled-container);
    border-color: transparent;
  }

  & + .slider::before {
    background-color: var(--sys-color-surface);
  }
}

@media (forced-colors: active) {
  .slider::before,
  input:checked + .slider::before {
    background-color: ButtonText;
  }

  input:disabled:not(:checked) + .slider,
  input:disabled:checked + .slider {
    background-color: transparent;
    border-color: GrayText;
  }

  input:disabled:not(:checked) + .slider::before,
  input:disabled:checked + .slider::before {
    background-color: GrayText;
  }
}

/*# sourceURL=switch.css */
`
};