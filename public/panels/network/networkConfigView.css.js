// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright (c) 2015 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.network-config {
  padding: 12px;
  display: block;
}

.network-config-group {
  display: flex;
  padding-bottom: 10px;
  flex-wrap: wrap;
  flex: 0 0 auto;
  min-height: 30px;
}

.network-config-title {
  margin-right: 16px;
  width: 130px;
}

.network-config-fields {
  flex: 2 0 200px;
}

.network-config-fields span:first-of-type,
.network-config-fields .network-config-accepted-encoding-custom {
  padding: 3px 0;
}

.panel-section-separator {
  height: 1px;
  margin-bottom: 10px;
  background: var(--sys-color-divider);
}
/* Disable cache */

.network-config-disable-cache {
  line-height: 28px;
  border-top: none;
  padding-top: 0;
}

.network-config-input-validation-error {
  color: var(--sys-color-error);
  margin: 5px 0;
}

.network-config-input-validation-error:empty {
  display: none;
}
/* Network throttling */

.network-config-throttling .chrome-select {
  width: 100%;
  max-width: 250px;
}

.network-config-throttling > .network-config-title {
  line-height: 24px;
}
/* User agent */

.network-config-ua > .network-config-title {
  line-height: 20px;
}

.network-config-ua span[is="dt-radio"].checked > * {
  display: none;
}

.network-config-ua input {
  display: block;
  width: calc(100% - 20px);
}

.network-config-ua input[type="text"],
.network-config-ua .chrome-select {
  margin-top: 8px;
}

.network-config-ua .chrome-select {
  width: calc(100% - 20px);
  max-width: 250px;
}

.network-config-ua span[is="dt-radio"] {
  display: block;
}

.network-config-ua-custom {
  padding-bottom: 8px;

  input,
  devtools-user-agent-client-hints-form {
    opacity: 38%;
    pointer-events: none;
  }

  &.checked input,
  &.checked devtools-user-agent-client-hints-form {
    opacity: revert;
    pointer-events: revert;
  }
}

devtools-user-agent-client-hints-form {
  display: block;
  margin-top: 14px;
  width: min(100%, 400px);
}

.status-text {
  padding: 10px;
  color: var(--sys-color-tertiary);
}

/*# sourceURL=networkConfigView.css */
`);

export default styles;
