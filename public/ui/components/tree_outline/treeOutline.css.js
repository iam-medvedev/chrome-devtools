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
  --list-group-padding: 16px;
}

li {
  border: 2px solid transparent;
  list-style: none;
  text-overflow: ellipsis;
  min-height: 12px;
}

.compact {
  border: 0;
}

.tree-item:hover {
  background-color: var(--sys-color-state-hover-on-subtle);
}

.tree-node-key {
  white-space: var(--override-key-whitespace-wrapping);
  /* Override the default |min-width: auto| to avoid overflows of flex items */
  min-width: 0;
  flex-grow: 1;
}

.arrow-icon {
  display: block;
  user-select: none;
  mask-image: var(--image-file-triangle-right);
  background-color: var(--icon-default);
  content: "";
  text-shadow: none;
  height: 14px;
  width: 14px;
  overflow: hidden;
  flex: none;
  transition: transform 200ms;
}

ul {
  margin: 0;
  padding: 0;
}

ul[role="group"] {
  padding-left: var(--list-group-padding);
}

li:not(.parent) > .arrow-and-key-wrapper > .arrow-icon {
  mask-size: 0;
}

li.parent.expanded > .arrow-and-key-wrapper > .arrow-icon {
  transform: rotate(90deg);
}

li.is-top-level {
  border-top: var(--override-top-node-border);
}

li.is-top-level:last-child {
  border-bottom: var(--override-top-node-border);
}

:host([animated]) li:not(.is-top-level) {
  animation-name: slideIn;
  animation-duration: 150ms;
  animation-timing-function: cubic-bezier(0, 0, 0.3, 1);
  animation-fill-mode: forwards;
}

@keyframes slideIn {
  from {
    transform: translateY(-5px);
    opacity: 0%;
  }

  to {
    transform: none;
    opacity: 100%;
  }
}

.arrow-and-key-wrapper {
  display: flex;
  align-content: center;
  align-items: center;
}

[role="treeitem"]:focus {
  outline: 0;
}

ul[role="tree"]:focus-within [role="treeitem"].selected > .arrow-and-key-wrapper {
  /* stylelint-disable-next-line color-named */
  background-color: var(--sys-color-tonal-container);
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.inline-icon {
  vertical-align: sub;
}

@media (forced-colors: active) {
  .arrow-icon {
    background-color: ButtonText;
  }

  ul[role="tree"]:focus-within [role="treeitem"].selected {
    outline: solid 1px ButtonText;
  }
}

/*# sourceURL=treeOutline.css */
`);

export default styles;
