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
  max-width: var(--sys-size-35);
  width: 100%;
}

.card {
  break-inside: avoid;
  min-width: var(--sys-size-31);
  margin: var(--sys-size-3) var(--sys-size-6) var(--sys-size-5) var(--sys-size-5);
  flex: 1;
}

.heading-wrapper {
  display: flex;
  white-space: nowrap;
  margin-bottom: var(--sys-size-5);
}

.heading {
  color: var(--sys-color-on-surface);
  font: var(--sys-typescale-body2-medium);
}

.heading-icon {
  margin-right: var(--sys-size-3);
}

slot[name="heading-suffix"]::slotted(*) {
  margin-left: auto;
}

.content-container {
  border-radius: var(--sys-shape-corner-small);
  box-shadow: var(--sys-elevation-level2);
  display: flex;
  flex-direction: column;
  background: var(--app-color-card-background);
}

slot[name="content"]::slotted(*) {
  padding: var(--sys-size-4) var(--sys-size-6);
}

slot[name="content"]::slotted(*:not(:first-child)) {
  border-top: var(--sys-size-1) solid var(--app-color-card-divider);
}

/*# sourceURL=card.css */
`
};