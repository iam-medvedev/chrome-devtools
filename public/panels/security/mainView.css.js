// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright 2015 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.devtools-link {
  display: inline-block;
}

.security-main-view {
  overflow: hidden auto;
  background-color: var(--sys-color-cdt-base-container);
}

.security-main-view > div {
  flex-shrink: 0;
}

.security-summary-section-title {
  font-size: 15px;
  margin: 12px 16px;
  user-select: text;
}

.lock-spectrum {
  margin: 8px 16px;
  display: flex;
  align-items: flex-start;
}

.security-summary .lock-icon {
  flex: none;
  width: 16px;
  height: 16px;
  margin: 0;
}
/* Separate the middle icon from the other two. */

.security-summary .lock-icon-neutral {
  margin: 0 16px;
}

.security-summary:not(.security-summary-secure) .lock-icon-secure,
.security-summary:not(.security-summary-neutral) .lock-icon-neutral,
.security-summary:not(.security-summary-insecure) .lock-icon-insecure,
.security-summary:not(.security-summary-insecure-broken) .lock-icon-insecure-broken {
  color: var(--sys-color-state-disabled);
}

@media (forced-colors: active) {
  .security-summary-neutral .lock-icon-neutral {
    color: Highlight;
  }

  .security-summary:not(.security-summary-secure) .lock-icon-secure,
  .security-summary:not(.security-summary-neutral) .lock-icon-neutral,
  .security-summary:not(.security-summary-insecure) .lock-icon-insecure,
  .security-summary:not(.security-summary-insecure-broken) .lock-icon-insecure-broken {
    color: canvastext;
  }
}

.triangle-pointer-container {
  margin: 8px 24px 0;
  padding: 0;
}

.triangle-pointer-wrapper {
  /* Defaults for dynamic properties. */
  transform: translateX(0);
  transition: transform 0.3s;
}

.triangle-pointer {
  width: 12px;
  height: 12px;
  margin-bottom: -6px;
  margin-left: -6px;
  transform: rotate(-45deg);
  border-style: solid;
  border-width: 1px 1px 0 0;
  background: var(--sys-color-cdt-base-container);
  border-color: var(--sys-color-neutral-outline);
}

.security-summary-secure .triangle-pointer-wrapper {
  transform: translateX(0);
}

.security-summary-neutral .triangle-pointer-wrapper {
  transform: translateX(32px);
}

.security-summary-insecure .triangle-pointer-wrapper {
  transform: translateX(64px);
}

.security-summary-insecure-broken .triangle-pointer-wrapper {
  transform: translateX(64px);
}

.security-summary-text {
  padding: 16px 24px;
  border-style: solid;
  border-width: 1px 0;
  font-size: 15px;
  background: var(--sys-color-cdt-base-container);
  border-color: var(--sys-color-neutral-outline);
  user-select: text;
}

.security-summary-secure .triangle-pointer,
.security-summary-secure .security-summary-text,
.security-explanation-title-secure {
  color: var(--sys-color-green);
}

.security-summary-insecure-broken .triangle-pointer,
.security-summary-insecure-broken .security-summary-text,
.security-explanation-title-neutral,
.security-explanation-title-insecure,
.security-explanation-title-insecure-broken {
  color: var(--sys-color-error);
}

.security-explanation-list {
  padding-bottom: 16px;
}

.security-explanation-list:empty {
  border-bottom: none;
  padding: 0;
}

.security-explanations-main {
  margin-top: -5px;
  background-color: var(--sys-color-cdt-base-container);
  border-bottom: 1px solid var(--sys-color-divider);
}

.security-explanations-extra {
  background-color: transparent;
}

.security-explanation {
  padding: 11px;
  display: flex;
  white-space: nowrap;
  border: none;
  color: var(--sys-color-token-subtle);
}

.security-explanation-text {
  flex: auto;
  white-space: normal;
  max-width: 400px;
}

.origin-button {
  margin-top: var(--sys-size-4);
}

.security-explanation .security-property {
  flex: none;
  width: 16px;
  height: 16px;
  margin-right: 16px;
}

.security-explanation-title {
  color: var(--sys-color-token-subtle);
  margin-top: 1px;
  margin-bottom: 8px;
}

.security-mixed-content {
  margin-top: 8px;
}

.security-explanation-recommendations {
  padding-inline-start: 16px;
}

.security-explanation-recommendations > li {
  margin-bottom: 4px;
}

/*# sourceURL=${import.meta.resolve('./mainView.css')} */
`
};