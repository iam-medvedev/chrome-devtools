// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2023 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  --override-transparent: rgb(0 0 0 / 0%);

  display: var(--dialog-display);
}

dialog::backdrop {
  background: var(--override-transparent);
}

dialog {
  background: var(--override-transparent);
  border: none;
  border-radius: 4px;
  top: var(--dialog-top);
  padding: var(--dialog-padding);
  left: var(--dialog-left);
  right: var(--dialog-right);
  margin: var(--dialog-margin);
  margin-left: var(--dialog-margin-left, 0);
  margin-bottom: var(--dialog-margin-bottom);
  animation-name: slideIn;
  animation-duration: 100ms;
  animation-timing-function: cubic-bezier(0, 0, 0.3, 1);
  overflow: hidden;
}

dialog:focus,
dialog:focus-visible {
  outline: none;
}

#content {
  min-width: var(--content-min-width);
  background: var(--color-background-elevation-dark-only);
  border-radius: 4px;
  padding-top: var(--content-padding-top);
  padding-bottom: var(--content-padding-bottom);
  box-shadow: var(--override-content-box-shadow);
  max-height: var(--dialog-max-height);
  max-width: var(--dialog-max-width);
  overflow: auto;
  outline: none;
  clip-path: polygon(var(--content-clip-path));
}

#content-wrap {
  filter: drop-shadow(0 1px 2px rgb(60 64 67 / 30%)) drop-shadow(0 2px 0 rgb(60 64 67 / 15%));
}

@keyframes slideIn {
  from {
    transform: translateY(var(--dialog-offset-y));
    opacity: 0%;
  }

  to {
    opacity: 100%;
  }
}

/*# sourceURL=dialog.css */
`);

export default styles;
