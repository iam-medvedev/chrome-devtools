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

.message {
  line-height: 18px;
  font-size: 12px;
  color: var(--override-markdown-view-message-color, --sys-color-token-subtle);
  margin-bottom: 4px;
  user-select: text;
}

.message p {
  margin-bottom: 10px;
  margin-block-start: 2px;
}

.message ul {
  list-style-type: none;
  padding-inline-start: 1em;
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
  background-color: var(--code-background-color); /* stylelint-disable-line plugin/use_theme_colors */
  border-radius: 2px;
  padding: 1px 3px;
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
