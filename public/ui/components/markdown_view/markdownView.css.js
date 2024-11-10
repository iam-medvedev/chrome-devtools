// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
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

.animating {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 0.3s steps(40, end);
}

.pending {
  display: none !important; /* stylelint-disable-line declaration-no-important */
}

.message {
  line-height: 18px;
  font-size: 12px;
  color: var(--override-markdown-view-message-color, --sys-color-token-subtle);
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

.devtools-link {
  color: var(--sys-color-primary);
  outline-offset: 2px;
  text-decoration: none;
}

.devtools-link:hover {
  text-decoration: underline;
}

/*# sourceURL=markdownView.css */
`);

export default styles;
