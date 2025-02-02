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
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 5px;
  background: linear-gradient(180deg, rgb(255 125 210 / 0%) 0%, rgb(255 125 210 / 15%) 85%); /* stylelint-disable-line plugin/use_theme_colors */
  border-color: var(--ref-palette-pink55);
  border-width: 0 1px 5px;
  border-style: solid;
  pointer-events: none;
}

.range-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  box-sizing: border-box;
  pointer-events: all;
  user-select: none;
  color: var(--sys-color-pink);

  &.labelHidden {
    /* Have to use this not display: none so it maintains its width */
    user-select: none;
    pointer-events: none;
    visibility: hidden;
  }

  &.offScreenLeft {
    align-items: flex-start;
    text-align: left;
  }

  &.offScreenRight {
    align-items: flex-end;
    text-align: right;
  }
}

.label-text {
  /*
  * The width priority is min-width > max-width > width
  * When the range itself is smaller that 70px, expand 100% to fill the whole width.
  * When the range is wider, only expand the textfield to over 70px
  * if it's needed to fit the label text.
  */
  width: 100%;
  max-width: 70px;
  min-width: fit-content;
  text-overflow: ellipsis;
  overflow: hidden;
  overflow-wrap: break-word;
  word-break: break-word;
  margin-bottom: 3px;
  display: -webkit-box;
  white-space: break-spaces;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.label-text[contenteditable="true"] {
  outline: none;
  box-shadow: 0 0 0 1px var(--ref-palette-pink55);
}

/*# sourceURL=timeRangeOverlay.css */
`
};