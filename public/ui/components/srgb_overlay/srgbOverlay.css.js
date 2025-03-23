// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssText: `/*
 * Copyright 2023 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.gamut-line {
  /* We want to show 50% white color in all themes since this is drawn over a color rectangle */
  stroke: color-mix(in srgb, var(--ref-palette-neutral100) 50%, transparent); /* stylelint-disable-line plugin/use_theme_colors */
  fill: none;
}

.label {
  position: absolute;
  bottom: 3px;
  margin-right: 5px;
  /* We want to show 50% white color in all themes since this is drawn over a color rectangle */
  color: color-mix(in srgb, var(--ref-palette-neutral100) 50%, transparent); /* stylelint-disable-line plugin/use_theme_colors */
}

/*# sourceURL=${import.meta.resolve('./srgbOverlay.css')} */
`
};