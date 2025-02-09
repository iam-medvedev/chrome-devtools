// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright 2016 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.tree-outline {
  padding-left: 0;
}

.tree-outline > ol {
  padding-bottom: 5px;
  border-bottom: solid 1px var(--sys-color-divider);
}

.tree-outline > .parent {
  user-select: none;
  font-weight: bold;
  color: var(--sys-color-on-surface);
  margin-top: -1px;
  display: flex;
  align-items: center;
  height: 26px;
}

.tree-outline li {
  display: block;
  padding-left: 5px;
  line-height: 20px;
}

.tree-outline li:not(.parent) {
  margin-left: 10px;
}

.tree-outline li:not(.parent)::before {
  display: none;
}

.tree-outline .caution {
  margin-left: 4px;
  display: inline-block;
  font-weight: bold;
}

.tree-outline li.expanded .header-count {
  display: none;
}

.tree-outline li .headers-title-left {
  min-width: 50%;
  display: flex;
  justify-content: space-between;
}

.tree-outline li .header-toggle {
  display: none;
}

.tree-outline li .status-from-cache {
  color: var(--sys-color-token-subtle);
}

.tree-outline li.expanded .header-toggle {
  display: inline;
  margin-left: 30px;
  font-weight: normal;
  color: var(--sys-color-on-surface);
}

.tree-outline li .header-toggle:hover {
  color: var(--sys-color-token-subtle);
  cursor: pointer;
}

.tree-outline .header-name {
  color: var(--sys-color-token-subtle);
  display: inline-block;
  margin-right: 0.25em;
  font-weight: bold;
  vertical-align: top;
  white-space: pre-wrap;
}

.tree-outline .header-separator {
  user-select: none;
}

.tree-outline .header-badge-text {
  font-variant: small-caps;
  font-weight: 500;
  white-space: pre-wrap;
  word-break: break-all;
}

.tree-outline .header-warning {
  color: var(--sys-color-error);
}

.tree-outline .header-badge {
  display: inline;
  margin-right: 0.75em;
  background-color: var(--sys-color-error);
  color: var(--sys-color-on-error);
  border-radius: 100vh;
  padding-left: 6px;
  padding-right: 6px;
}

.tree-outline .header-value {
  display: inline;
  margin-right: 1em;
  white-space: pre-wrap;
  word-break: break-all;
  margin-top: 1px;
}

.tree-outline .call-to-action {
  background-color: var(--sys-color-neutral-container);
  padding: 8px;
  border-radius: 5px;
  margin: 4px;
}

.tree-outline .selected .call-to-action {
  background-color: transparent;
  padding: 8px;
  border-radius: 5px;
  margin: 4px;
}

.tree-outline .call-to-action-body {
  padding: 6px 0;
  margin-left: 9.5px;
  border-left: 2px solid var(--sys-color-yellow-bright);
  padding-left: 18px;
}

.tree-outline .call-to-action .explanation {
  font-weight: bold;
}

.tree-outline .call-to-action code {
  font-size: 90%;
}

.tree-outline .call-to-action .example .comment::before {
  content: " — ";
}

.tree-outline .empty-request-header {
  color: var(--sys-color-state-disabled);
}

.request-headers-show-more-button {
  border: none;
  border-radius: 3px;
  display: inline-block;
  font-size: 12px;
  font-family: sans-serif;
  cursor: pointer;
  margin: 0 4px;
  padding: 2px 4px;
}

.request-headers-caution {
  display: flex;
  gap: 6px;
  margin-right: 20px;
  padding: 8px;
  background-color: var(--sys-color-neutral-container);
  border-radius: 5px;
}

.header-highlight {
  background-color: var(--sys-color-state-focus-highlight);
}

.header-highlight:focus {
  background-color: var(--sys-color-state-ripple-primary);
}

.x-client-data-details {
  padding-left: 10px;
}

@media (forced-colors: active) {
  :host-context(.request-headers-tree) ol.tree-outline:not(.hide-selection-when-blurred) li.selected:focus {
    background: Highlight;
  }

  :host-context(.request-headers-tree) ol.tree-outline:not(.hide-selection-when-blurred) li::before {
    background-color: ButtonText;
  }

  :host-context(.request-headers-tree) ol.tree-outline:not(.hide-selection-when-blurred) li.selected.parent::before {
    background-color: HighlightText;
  }

  :host-context(.request-headers-tree) ol.tree-outline:not(.hide-selection-when-blurred) li.selected *,
  :host-context(.request-headers-tree) ol.tree-outline:not(.hide-selection-when-blurred) li.selected.parent,
  :host-context(.request-headers-tree) ol.tree-outline:not(.hide-selection-when-blurred) li.selected.parent span,
  :host-context(.request-headers-tree) ol.tree-outline:not(.hide-selection-when-blurred) li.selected:focus .status-from-cache {
    color: HighlightText;
  }
}

.header-decode-error {
  color: var(--sys-color-error);
}

.headers-title {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-right: 5px;
}

.tree-outline li .headers-link {
  display: none;
}

.tree-outline li.expanded .headers-link {
  display: inline;
  color: var(--sys-color-on-surface);
}

/*# sourceURL=${import.meta.resolve('./requestHeadersTree.css')} */
`
};