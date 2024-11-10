// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2016 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.has-ignorable-error .webkit-css-property {
  color: inherit;
}

.tree-outline {
  padding: 0;
}

.tree-outline li {
  margin-left: 12px;
  padding-left: 22px;
  white-space: normal;
  text-overflow: ellipsis;
  cursor: auto;
  display: block;

  &::before {
    display: none;
  }

  .webkit-css-property {
    margin-left: -22px; /* outdent the first line of longhand properties (in an expanded shorthand) to compensate for the "padding-left" shift in .tree-outline li */
  }

  &.not-parsed-ok {
    margin-left: 0;

    .exclamation-mark {
      display: inline-block;
      position: relative;
      width: 11px;
      height: 10px;
      margin: 0 7px 0 0;
      top: 1px;
      left: -36px; /* outdent to compensate for the top-level property indent */
      user-select: none;
      cursor: default;
      z-index: 1;
      mask: var(--image-file-warning-filled) center / 14px no-repeat;
      background-color: var(--icon-warning);
    }

    &.has-ignorable-error .exclamation-mark {
      background-color: unset;
    }
  }

  &.filter-match {
    background-color: var(--sys-color-tonal-container);
  }

  &.editing {
    margin-left: 10px;
    text-overflow: clip;
  }

  &.editing-sub-part {
    padding: 3px 6px 8px 18px;
    margin: -1px -6px -8px;
    text-overflow: clip;
  }

  &.child-editing {
    word-wrap: break-word !important; /* stylelint-disable-line declaration-no-important */
    white-space: normal !important; /* stylelint-disable-line declaration-no-important */
    padding-left: 0;
  }

  .info {
    padding-top: 4px;
    padding-bottom: 3px;
  }
}

.tree-outline > li {
  padding-left: 38px;
  clear: both;
  min-height: 14px;

  .webkit-css-property {
    margin-left: -38px; /* outdent the first line of the top-level properties to compensate for the "padding-left" shift in .tree-outline > li */
  }

  &.child-editing {
    .text-prompt {
      white-space: pre-wrap;
    }

    .webkit-css-property {
      margin-left: 0;
    }
  }
}

ol:not(.tree-outline) {
  display: none;
  margin: 0;
  padding-inline-start: 12px;
  list-style: none;
}

ol.expanded {
  display: block;
}

.enabled-button {
  visibility: hidden;
  float: left;
  font-size: 10px;
  margin: 0;
  vertical-align: top;
  position: relative;
  z-index: 1;
  width: 18px;
  left: -40px; /* original -2px + (-38px) to compensate for the first line outdent */
  top: 0.5px;
  height: 13px;
}

input.enabled-button.small {
  &:hover::after,
  &:active::before {
    left: 3px;
  }
}

.overloaded:not(.has-ignorable-error, .invalid-property-value),
.inactive:not(.invalid-property-value),
.disabled,
.not-parsed-ok:not(.has-ignorable-error, .invalid-property-value),
.not-parsed-ok.invalid-property-value .value {
  text-decoration: line-through;
}

.implicit,
.inherited,
.inactive-property {
  opacity: 50%;
}

.changed {
  background-color: var(--sys-color-tertiary-container);

  &::after {
    content: "";
    position: absolute;
    left: -4px;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: var(--sys-color-tertiary);
  }
}

.copy {
  display: none;

  .changed:hover & {
    position: absolute;
    right: -4px;
    top: 0;
    bottom: 0;
    margin: auto;
    display: inline-block;
    cursor: pointer;
    transform: scale(0.9);
  }
}

.hint-wrapper {
  align-items: center;
  display: inline-block;
  margin-left: 3px;
  max-height: 13px;
  max-width: 13px;
  vertical-align: middle;
}

.hint {
  cursor: pointer;
  display: block;
  position: relative;
  left: -1.5px;
  top: -1.5px;
}

.has-ignorable-error {
  color: var(--sys-color-state-disabled);
}

:host-context(.no-affect) .tree-outline li {
  opacity: 50%;

  &.editing {
    opacity: 100%;
  }
}

:host-context(.styles-panel-hovered:not(.read-only)) .webkit-css-property:hover,
:host-context(.styles-panel-hovered:not(.read-only)) .value:hover {
  text-decoration: underline;
  cursor: default;
}

.styles-name-value-separator {
  display: inline-block;
  width: 14px;
  text-decoration: inherit;
  white-space: pre;
}

.styles-clipboard-only {
  display: inline-block;
  width: 0;
  opacity: 0%;
  pointer-events: none;
  white-space: pre;

  .tree-outline li.child-editing & {
    display: none;
  }
}

.styles-pane-button {
  height: 15px;
  margin: 0 0 0 6px;
  position: absolute;
  top: -1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
/* Matched styles */

:host-context(.matched-styles) .tree-outline li {
  margin-left: 0 !important; /* stylelint-disable-line declaration-no-important */
}

.expand-icon {
  user-select: none;
  margin-left: -6px;
  margin-right: 2px;
  margin-bottom: -4px;

  .tree-outline li:not(.parent) & {
    display: none;
  }
}

:host-context(.matched-styles:not(.read-only):hover) li:not(.child-editing) .enabled-button,
:host-context(.matched-styles:not(.read-only)) .tree-outline li.disabled:not(.child-editing) .enabled-button {
  visibility: visible;
}

:host-context(.matched-styles) ol.expanded {
  margin-left: 16px;
}

.devtools-link-styled-trim {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 80%;
  vertical-align: bottom;
}

devtools-css-angle,
devtools-css-length {
  display: inline-block;
}

devtools-icon.open-in-animations-panel {
  position: relative;
  transform: scale(0.7);
  margin: -5px -2px -3px -4px;
  user-select: none;
  color: var(--icon-css);
  cursor: default;

  &:hover {
    color: var(--icon-css-hover);
  }
}

/*# sourceURL=stylePropertiesTreeOutline.css */
`);

export default styles;
