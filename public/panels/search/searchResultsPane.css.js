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

:host {
  padding: 0;
  margin: 0;
  overflow-y: auto;
}

.tree-outline {
  padding: 0;
}

.tree-outline ol {
  padding: 0;
}

.tree-outline li {
  height: 16px;
}

li.search-result {
  cursor: pointer;
  font-size: 12px;
  margin-top: 8px;
  padding: 2px 0 2px 4px;
  word-wrap: normal;
  white-space: pre;
}

li.search-result:hover {
  background-color: var(--sys-color-state-hover-on-subtle);
}

li.search-result .search-result-file-name {
  color: var(--sys-color-on-surface);
  flex: 1 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

li.search-result .search-result-matches-count {
  color: var(--sys-color-token-subtle);
  margin: 0 8px;
}

li.search-result.expanded .search-result-matches-count {
  display: none;
}

li.show-more-matches {
  color: var(--sys-color-on-surface);
  cursor: pointer;
  margin: 8px 0 0 -4px;
}

li.show-more-matches:hover {
  text-decoration: underline;
}

li.search-match {
  margin: 2px 0;
  word-wrap: normal;
  white-space: pre;
}

li.search-match.selected:focus-visible {
  background: var(--sys-color-tonal-container);
}

li.search-match::before {
  display: none;
}

li.search-match .search-match-line-number {
  color: var(--sys-color-token-subtle);
  text-align: right;
  vertical-align: top;
  word-break: normal;
  padding: 2px 4px 2px 6px;
  margin-right: 5px;
}

.tree-outline .devtools-link {
  text-decoration: none;
  display: block;
  flex: auto;
}

li.search-match .search-match-content {
  color: var(--sys-color-on-surface);
}

ol.children.expanded {
  padding-bottom: 4px;
}

li.search-match .link-style.search-match-link {
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 9px;
  text-align: left;
}

.search-result-qualifier {
  color: var(--sys-color-token-subtle);
}

.search-result-dash {
  color: var(--sys-color-surface-variant);
  margin: 0 4px;
}

/*# sourceURL=${import.meta.resolve('./searchResultsPane.css')} */
`
};