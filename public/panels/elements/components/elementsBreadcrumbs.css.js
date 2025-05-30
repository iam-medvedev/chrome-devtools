// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default `/*
 * Copyright 2021 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  --override-node-text-label-color: var(--sys-color-token-tag);
  --override-node-text-class-color: var(--sys-color-token-attribute);
  --override-node-text-id-color: var(--sys-color-token-attribute);
  --override-node-text-multiple-descriptors-id: var(--sys-color-on-surface);
  --override-node-text-multiple-descriptors-class: var(--sys-color-token-property);
}

.crumbs {
  display: inline-flex;
  align-items: stretch;
  width: 100%;
  overflow: hidden;
  pointer-events: auto;
  cursor: default;
  white-space: nowrap;
  position: relative;
  background: var(--sys-color-cdt-base-container);
  font-size: inherit;
  font-family: inherit;
}

.crumbs-window {
  flex-grow: 2;
  overflow: hidden;
}

.crumbs-scroll-container {
  display: inline-flex;
  margin: 0;
  padding: 0;
}

.crumb {
  display: block;
  padding: 0 7px;
  line-height: 23px;
  white-space: nowrap;
}

.overflow {
  padding: 0 5px;
  font-weight: bold;
  display: block;
  border: none;
  flex-grow: 0;
  flex-shrink: 0;
  text-align: center;
  background-color: var(--sys-color-cdt-base-container);
  color: var(--sys-color-token-subtle);
  margin: 1px;
  outline: 1px solid var(--sys-color-neutral-outline);
}

.overflow.hidden {
  display: none;
}

.overflow:disabled {
  opacity: 50%;
}

.overflow:focus {
  outline-color: var(--sys-color-primary);
}

.overflow:not(:disabled):hover {
  background-color: var(--sys-color-state-hover-on-subtle);
  color: var(--sys-color-on-surface);
}

.crumb-link {
  text-decoration: none;
  color: inherit;
}

.crumb:hover {
  background: var(--sys-color-state-hover-on-subtle);
}

.crumb.selected {
  background: var(--sys-color-tonal-container);
}

.crumb:focus {
  outline: var(--sys-color-primary) auto 1px;
}

/*# sourceURL=${import.meta.resolve('./elementsBreadcrumbs.css')} */`;