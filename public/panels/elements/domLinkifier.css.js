// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2018 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  display: inline;
}

.node-link {
  cursor: pointer;
  display: inline;
  pointer-events: auto;
  outline-offset: 2px;

  /* If the element has lots of classes, don't let the label get too wide */
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: min(100%, 550px);

  &:focus-visible {
    outline-width: unset;
  }

  &.dynamic-link:hover {
    text-decoration: underline;
  }
}

.node-label-name {
  color: var(--sys-color-token-property-special);

  .dynamic-link & {
    color: var(--text-link);
  }
}

.node-label-class,
.node-label-pseudo {
  color: var(--sys-color-token-attribute);
}

/*# sourceURL=domLinkifier.css */
`);

export default styles;
