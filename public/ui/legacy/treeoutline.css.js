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

:host {
  flex: 1 1 auto;
  padding: 2px 0 0;
}

.tree-outline-disclosure:not(.tree-outline-disclosure-hide-overflow) {
  min-width: 100%;
  display: inline-block;
}

.tree-outline {
  padding: 0 0 4px 4px;
  margin: 0;
  z-index: 0;
  position: relative;
}

.tree-outline:focus-visible {
  box-shadow: 0 0 0 2px var(--sys-color-state-focus-ring) inset;
}

.tree-outline li .selection {
  display: none;
  z-index: -1;
  margin-left: -10000px;
}

.tree-outline:not(.hide-selection-when-blurred) li.selected {
  color: var(--sys-color-on-surface-subtle);
}

.tree-outline:not(.hide-selection-when-blurred) li.selected .selection {
  display: block;
  background-color: var(--sys-color-neutral-container);
}

.tree-outline:not(.hide-selection-when-blurred) li.elements-drag-over .selection {
  display: block;
  margin-top: -2px;
  border-top: 2px solid;
  border-top-color: var(--sys-color-tonal-container);
}

.tree-outline li:hover:not(:has(dt-checkbox)) .selection {
  display: block;
  background-color: var(--sys-color-state-hover-on-subtle);
}

.tree-outline:not(.hide-selection-when-blurred) li.hovered:not(.selected) .selection {
  display: block;
  left: 3px;
  right: 3px;
  background-color: var(--sys-color-state-hover-on-subtle);
  border-radius: 5px;
}

.tree-outline:not(.hide-selection-when-blurred) li.in-clipboard .highlight {
  outline: 1px dotted var(--sys-color-neutral-outline);
}

ol.tree-outline:not(.hide-selection-when-blurred) li.selected:focus .selection {
  background-color: var(--sys-color-tonal-container);
}

ol.tree-outline,
.tree-outline ol {
  list-style-type: none;
}

.tree-outline ol {
  padding-left: 12px;
}

.tree-outline li {
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  display: flex;
  align-items: center;
  min-height: 16px;
}

ol.tree-outline:not(.hide-selection-when-blurred) li.selected:focus {
  color: var(--sys-color-on-tonal-container);

  & ::selection {
    background-color: var(--sys-color-state-focus-select);
  }

  & *:not(devtools-icon) {
    color: inherit;
  }
}

.tree-outline li .icons-container {
  align-self: center;
  display: flex;
  align-items: center;
}

.tree-outline li .leading-icons {
  margin-right: 4px;
}

.tree-outline li .trailing-icons {
  margin-left: 4px;
}

.tree-outline li::before {
  user-select: none;
  mask-image: var(--image-file-arrow-collapse);
  background-color: var(--icon-default);
  content: "\\A0\\A0";
  text-shadow: none;
  margin-top: calc(-1 * var(--sys-size-2));
  height: var(--sys-size-8);
  width: var(--sys-size-8);
}

.tree-outline li:not(.parent)::before {
  background-color: transparent;
}

.tree-outline li.parent.expanded::before {
  mask-image: var(--image-file-arrow-drop-down);
}

.tree-outline ol.children {
  display: none;
}

.tree-outline ol.children.expanded {
  display: block;
}

.tree-outline.tree-outline-dense li {
  margin-top: 1px;
  min-height: 12px;
}

.tree-outline.tree-outline-dense li.parent {
  margin-top: 0;
}

.tree-outline.tree-outline-dense li.parent::before {
  top: 0;
}

.tree-outline.tree-outline-dense ol {
  padding-left: 10px;
}

.tree-outline.hide-selection-when-blurred .selected:focus-visible {
  background: var(--sys-color-state-focus-highlight);
  border-radius: 2px;
}

.tree-outline-disclosure:not(.tree-outline-disclosure-hide-overflow) .tree-outline.hide-selection-when-blurred .selected:focus-visible {
  width: fit-content;
  padding-right: 3px;
}

/* Navigation tree variant */
.tree-outline.tree-variant-navigation {
  padding: var(--sys-size-3) 0 var(--sys-size-3) var(--sys-size-3);
}

.tree-outline.tree-variant-navigation li,
.tree-outline.hide-selection-when-blurred.tree-variant-navigation li {
  height: var(--sys-size-10);
  margin-right: var(--sys-size-3);
  padding-right: var(--sys-size-3);
  padding-left: 6px;

  &::before {
    flex-shrink: 0;
    overflow: hidden;
    margin-right: 3px;
    margin-left: -3px;
  }

  & .selection {
    border-radius: 0 var(--sys-shape-corner-full) var(--sys-shape-corner-full) 0;
  }

  &.selected:focus .selection {
    display: block;
    background-color: var(--app-color-navigation-drawer-background-selected);
  }

  & .leading-icons {
    margin-right: var(--sys-size-4);
    overflow: hidden;
  }

  & .tree-element-title {
    height: inherit;
    flex-shrink: 100;
    overflow: hidden;
    text-overflow: ellipsis;
    align-content: center;
  }
}

.theme-with-dark-background,
:host-context(.theme-with-dark-background) {
  & .tree-variant-navigation li.selected:focus,
  .tree-variant-navigation li.selected:focus devtools-icon {
    color: var(--app-color-navigation-drawer-label-selected);

    --override-file-source-icon-color: var(--app-color-navigation-drawer-label-selected);
  }
}

ol.tree-outline.tree-variant-navigation:not(.hide-selection-when-blurred) li.selected:focus .selection {
  background-color: var(--app-color-navigation-drawer-background-selected);
}

@media (forced-colors: active) {
  .tree-outline-disclosure li.parent::before,
  .tree-outline:not(.hide-selection-when-blurred) li.parent:not(.selected)::before {
    forced-color-adjust: none;
    background-color: ButtonText;
  }

  .tree-outline li devtools-icon {
    forced-color-adjust: none;
    color: ButtonText;
  }

  .tree-outline-disclosure li.parent:hover:not(.selected)::before,
  .tree-outline:not(.hide-selection-when-blurred) li.parent:hover:not(.selected)::before {
    background-color: ButtonText;
  }

  .tree-outline:not(.hide-selection-when-blurred) li.selected .selection {
    forced-color-adjust: none;
    background-color: ButtonText;
  }

  ol.tree-outline:not(.hide-selection-when-blurred) li.selected:focus .selection,
  .tree-outline.hide-selection-when-blurred .selected:focus-visible {
    forced-color-adjust: none;
    background-color: Highlight;
  }

  ol.tree-outline.tree-variant-navigation li.selected {
    &.selected,
    &.selected:focus {
      & .selection {
        forced-color-adjust: none;
        background-color: ButtonText;
      }
    }
  }

  ol.tree-outline:not(.hide-selection-when-blurred) li.parent.selected::before,
  ol.tree-outline:not(.hide-selection-when-blurred) li.parent.selected:focus::before,
  .tree-outline.hide-selection-when-blurred .selected:focus-visible::before {
    background-color: HighlightText;
  }

  .tree-outline li:not(.parent)::before,
  .tree-outline li:not(.parent):hover::before,
  .tree-outline.hide-selection-when-blurred .selected:focus-visible:not(.parent)::before {
    forced-color-adjust: none;
    background-color: transparent;
  }

  .tree-outline:not(.hide-selection-when-blurred) devtools-icon,
  .tree-outline.hide-selection-when-blurred devtools-icon {
    color: ButtonText;
  }

  .tree-outline li.selected devtools-icon,
  .tree-outline li.selected:focus devtools-icon {
    color: HighlightText !important; /* stylelint-disable-line declaration-no-important */
  }

  ol.tree-outline:not(.hide-selection-when-blurred) li.selected,
  .tree-outline:not(.hide-selection-when-blurred) li.selected .tree-element-title,
  .tree-outline:not(.hide-selection-when-blurred) li.selected:focus,
  .tree-outline:not(.hide-selection-when-blurred) li:focus-visible .tree-element-title,
  .tree-outline:not(.hide-selection-when-blurred) li.selected:focus .tree-element-title,
  .tree-outline:not(.hide-selection-when-blurred) li.selected span,
  .tree-outline.hide-selection-when-blurred .selected:focus-visible span {
    forced-color-adjust: none;
    color: HighlightText;
  }

  .tree-outline:not(.hide-selection-when-blurred) li.selected:focus-visible devtools-adorner,
  .tree-outline.hide-selection-when-blurred li.selected:focus-visible devtools-adorner {
    --override-adorner-background-color: Highlight;
    --override-adorner-border-color: HighlightText;
  }
}

/*# sourceURL=treeoutline.css */
`
};