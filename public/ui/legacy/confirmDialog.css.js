// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright (c) 2017 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.widget {
  padding: 20px;
  box-sizing: border-box;
  max-width: 400px;
  overflow: hidden;
}

/* Center-align text in the message class */
.message {
  text-align: center;
}

.message,
.button {
  font-size: larger;
  white-space: pre;
  margin: 10px 0;
}

/* Center-align text and added margin to the button class */
.button {
  text-align: center;
  margin-top: 20px;
  display: flex;
  flex-direction: row-reverse;
  gap: var(--sys-size-6);
}

/* Ensure the button has a minimum width */
.button button {
  min-width: 100px; /* Increased minimum width for better appearance */
}

.reason {
  color: var(--sys-color-error);
  margin-top: 10px; /* Added top margin for better spacing */
}

/* Added white-space property to handle text overflow */
.message span {
  white-space: normal;
  word-wrap: break-word; /* Allow long words to break and wrap to the next line */
  max-width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px;
  margin: 0;
}

/*# sourceURL=confirmDialog.css */
`);

export default styles;
