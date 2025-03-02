// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright 2021 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  --code-background-color: var(--sys-color-surface4);
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes expand {
  from { height: 0; }
  to { height: auto; }
}

.animating {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 0.4s steps(40, end);
}

devtools-code-block.animating {
  animation: expand 0.1s linear;
}

.pending {
  display: none !important; /* stylelint-disable-line declaration-no-important */
}

.message {
  line-height: 18px;
  font-size: 12px;
  color: var(--sys-color-on-surface);
  user-select: text;
}

.message p {
  margin: 0;
}

.message p:not(:first-child) {
  margin-block-start: 2px;
}

.message p:not(:last-child) {
  margin-bottom: 10px;
}

.message ul {
  list-style-type: none;
  padding-inline-start: var(--sys-size-8);
}

.message ul ul {
  padding-inline-start: 19px;
}

.message li {
  margin-top: 8px;
  display: list-item;
  list-style-type: disc;
}

.message code {
  color: var(--sys-color-on-surface);
  font-size: 11px;
  user-select: text;
  cursor: text;
  /* This is still using design tokens because \\'--code-background-color\\' is defined with them by default */
  /* stylelint-disable-next-line plugin/use_theme_colors */
  background-color: var(--code-background-color);
  border-radius: 2px;
  padding: 1px 3px;
}

devtools-code-block {
  margin-bottom: var(--sys-size-5);
}

.citation {
  text-decoration: underline;
  color: var(--sys-color-primary);
  background-color: transparent;
  cursor: pointer;
  outline-offset: var(--sys-size-2);
  border: none;
  padding: 0;
  font-size: 10px;
  font-family: var(--default-font-family);
}

h1.insight, h2.insight, h3.insight, h4.insight, h5.insight, h6.insight {
  font: var(--sys-typescale-body4-bold);
  margin: var(--sys-size-1) 0 10px;
}

/*# sourceURL=${import.meta.resolve('./markdownView.css')} */
`
};