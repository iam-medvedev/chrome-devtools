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
  padding: var(--sys-size-3) 0;
}

.tree-outline-disclosure {
  width: 100%;
}

/* Icon-related changes */
li .icon {
  width: 20px;
  height: 20px;
  margin-right: var(--sys-size-6);
  flex: none;
}

/* Heap profiles and CPU profiles */
.heap-snapshot-sidebar-tree-item .icon,
.profile-sidebar-tree-item .icon {
  mask-image: var(--image-file-heap-snapshot);
  background: var(--icon-default);
}

.profile-group-sidebar-tree-item .icon {
  mask-image: var(--image-file-heap-snapshots);
  background: var(--icon-default);
}

li.small .icon {
  width: 16px;
  height: 16px;
}

li.wait .icon {
  content: none;
}

li devtools-button {
  min-width: var(--sys-size-12);
  visibility: hidden;
}

/* Tree outline overrides */
.heap-snapshot-sidebar-tree-item:not(:hover) devtools-button {
  visibility: hidden;
}

.heap-snapshot-sidebar-tree-item.wait .icon {
  mask-image: unset;
  background-color: inherit;
}

.heap-snapshot-sidebar-tree-item.small .icon {
  mask-image: var(--image-file-heap-snapshots);
  background: var(--icon-default);
}

.profile-sidebar-tree-item.small .icon {
  mask-image: var(--image-file-heap-snapshots);
  background: var(--icon-default);
}

.tree-outline li:not(.parent)::before {
  content: none;
}

ol.tree-outline {
  flex: auto;
  padding: 0;
}

.tree-outline li {
  height: var(--sys-size-12);
  padding-left: var(--sys-size-7);
  margin-right: var(--sys-size-5);
  color: var(--sys-color-on-surface);

  & .leading-icons {
    margin-right: var(--sys-size-6);
    flex: none;
  }

  & .selection {
    border-radius: 0 100px 100px 0;
  }
}

.tree-outline .profile-launcher-view-tree-item,
.tree-outline li.profiles-tree-section + .children > li {
  border-radius: 0 100px 100px 0;
  position: relative;

  &.selected {
    background-color: var(--app-color-navigation-drawer-background-selected);
    color: var(--app-color-navigation-drawer-label-selected);

    & devtools-icon {
      color: var(--app-color-navigation-drawer-label-selected);
    }

    & > .icon:not(.spinner) {
      background-color: var(--app-color-navigation-drawer-label-selected);
    }
  }

  &:active::before {
    background-color: var(--sys-color-state-ripple-neutral-on-subtle);
    mask-image: none;
    content: "";
    height: 100%;
    width: 100%;
    border-radius: inherit;
    position: absolute;
    top: 0;
    left: 0;
  }

  &:focus-visible {
    box-shadow: inset 0 0 0 2px var(--sys-color-state-focus-ring);
  }
}

.tree-outline li.profiles-tree-section {
  margin-top: var(--sys-size-6);
  line-height: var(--sys-size-8);

  &:hover:not(:has(dt-checkbox)) .selection {
    background-color: transparent;
  }
}

.tree-outline li.profiles-tree-section::before {
  display: none;
}

.tree-outline ol {
  overflow: hidden;
  padding: 0;
}

/* Generic items styling */

li.wait .spinner::before {
  --dimension: 20px;

  margin: 0;
}

li.wait.small .spinner::before {
  --dimension: 14px;
  --clip-size: 9px;
  --override-spinner-size: 2px;

  margin: 1px;
}

li.wait.selected .spinner::before {
  --override-spinner-color: var(--ref-palette-neutral100);
}

@keyframes spinner-animation {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

li.small {
  height: 20px;
}

li .titles {
  display: inline-flex;
  padding-right: var(--sys-size-5);
}

li .titles > .title-container {
  z-index: 1;
  overflow: hidden;
}

li .titles > .title-container:has(:not(.editing)) {
  text-overflow: ellipsis;
}

li .titles > .title-container .title.editing {
  display: flex;
  overflow: hidden;
  margin-inline: 0;
  padding-inline: 0;
}

li.small .titles {
  top: 2px;
  line-height: normal;
}

li:not(.small) .title::after {
  content: "\\A";
  white-space: pre;
}

li .subtitle {
  text-overflow: ellipsis;
  overflow: hidden;
  margin-left: var(--sys-size-3);
}

li.small .subtitle {
  display: none;
}

li.selected:hover devtools-button {
  visibility: visible;
  margin-left: auto;
}

@media (forced-colors: active) {
  .tree-outline li,
  .tree-outline li.profiles-tree-section,
  .tree-outline li:hover .tree-element-title {
    forced-color-adjust: none;
    color: ButtonText;
    text-shadow: unset;
  }

  .tree-outline .profile-launcher-view-tree-item,
  .tree-outline li.profiles-tree-section + .children > li {
    &.selected {
      background-color: Highlight;
      color: HighlightText;

      & devtools-icon {
        color: HighlightText;
      }

      & > .icon:not(.spinner) {
        background-color: HighlightText;
      }
    }
  }
}

/*# sourceURL=profilesSidebarTree.css */
`
};