// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright 2023 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: inherit;
}

.control {
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.control[disabled] {
  filter: grayscale(100%);
  cursor: auto;
}

.icon {
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--sys-color-error-bright);
  margin-bottom: 8px;
  position: relative;
  transition: background 200ms;
  place-content: center center;
  align-items: center;
}

.icon::before {
  --override-white: #fff;

  box-sizing: border-box;
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  border: 1px solid var(--override-white);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--override-white);
}

.icon.square::before {
  border-radius: 0;
}

.icon.circle::before {
  border-radius: 50%;
}

.icon:hover {
  background: color-mix(in srgb, var(--sys-color-error-bright), var(--sys-color-state-hover-on-prominent) 10%);
}

.icon:active {
  background: color-mix(in srgb, var(--sys-color-error-bright), var(--sys-color-state-ripple-neutral-on-prominent) 16%);
}

.control[disabled] .icon:hover {
  background: var(--sys-color-error);
}

.label {
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.02em;
  color: var(--sys-color-on-surface);
}

/*# sourceURL=${import.meta.resolve('./controlButton.css')} */
`
};