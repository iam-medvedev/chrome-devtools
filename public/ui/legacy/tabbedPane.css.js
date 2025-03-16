// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright (C) 2006, 2007, 2008 Apple Inc.  All rights reserved.
 * Copyright (C) 2009 Anthony Ricaud <rik@webkit.org>
 * Copyright (C) 2011 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY GOOGLE INC. AND ITS CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GOOGLE INC.
 * OR ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

.tabbed-pane {
  flex: auto;
  overflow: hidden;
}

.tabbed-pane-content {
  position: relative;
  overflow: auto;
  flex: auto;
  display: flex;
  flex-direction: column;
}

.tabbed-pane-content.has-no-tabs {
  background-color: var(--sys-color-cdt-base-container);
}

.tabbed-pane-placeholder {
  text-align: center;
  align-content: center;

  .sources-placeholder {
    display: inline-block;
  }
}

.tabbed-pane-placeholder-row {
  max-width: var(--sys-size-32);
  min-width: var(--sys-size-28);
  margin: 0 var(--sys-size-8);

  &.workspace {
    line-height: 18px;
    display: inline-flex;
    align-items: center;
    border: var(--sys-size-2) dashed var(--sys-color-divider);
    padding: var(--sys-size-8);
    border-radius: var(--sys-shape-corner-medium);
    margin: var(--sys-size-8) var(--sys-size-8) var(--sys-size-11);

    > .icon-container {
      flex-shrink: 0;
      width: var(--sys-size-13);
      height: var(--sys-size-13);
      background: var(--sys-color-tonal-container);
      align-content: center;
      border-radius: var(--sys-shape-corner-full);
      margin-right: var(--sys-size-8);

      > devtools-icon {
        color: var(--sys-color-on-tonal-container);
      }
    }
  }

  &.shortcuts-list {
    padding: 0 var(--sys-size-6);

    .shortcut-line {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: var(--sys-size-10);
      padding: var(--sys-size-4) 0;

      &:not(:last-child) {
        border-bottom: var(--sys-size-1) solid var(--sys-color-divider);
      }

      .shortcuts {
        display: flex;
        flex-direction: row;
        gap: var(--sys-size-4);
        align-items: center;
      }

      .keybinds-key {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        height: var(--sys-size-11);
        min-width: var(--sys-size-11);
        font: var(--sys-typescale-body5-medium);
        white-space: nowrap;
        border-radius: var(--sys-shape-corner-small);
        background: var(--sys-color-tonal-container);
        padding: 0 var(--sys-size-4);
      }

      & button {
        margin-inline: 0;
      }
    }
  }

  & button {
    cursor: pointer;
    color: var(--text-link);
    background: transparent;
    border: none;
    padding: 0;
    text-decoration: underline;
    margin-inline: var(--sys-size-3);
    text-align: left;

    &:focus-visible {
      outline: 2px solid var(--sys-color-state-focus-ring);
      outline-offset: 2px;
      border-radius: 2px;
    }
  }
}

.tabbed-pane-header {
  display: flex;
  flex: 0 0 27px;
  border-bottom: 1px solid var(--sys-color-divider);
  overflow: visible;
  width: 100%;
  background-color: var(--app-color-toolbar-background);

  & > * {
    cursor: initial;
  }
}

.tabbed-pane-header-contents {
  flex: auto;
  pointer-events: none;
  margin-left: 0;
  position: relative;
  cursor: default;
}

.tabbed-pane-header-contents > * {
  pointer-events: initial;
}

.tabbed-pane-header-tab-icon {
  min-width: 14px;
  display: flex;
  align-items: center;
  margin-right: var(--sys-size-2);
}

.tabbed-pane-header-tab-suffix-element {
  height: var(--sys-size-8);
  width: var(--sys-size-8);
  padding-left: var(--sys-size-2);
  align-content: center;

  &:has(.badge) {
    width: 17px;
    margin-left: var(--sys-size-2);
  }

  &:has(.status-dot) {
    width: 9px;
  }
}

.badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: var(--sys-size-7);
  min-width: var(--sys-size-7);
  width: fit-content;
  padding: 0 var(--sys-size-3);
  line-height: var(--sys-size-7);
  border-radius: var(--sys-shape-corner-full);
  margin-left: var(--sys-size-2);
  background-color: var(--sys-color-primary);
  color: var(--sys-color-on-primary);
  font-size: var(--sys-typescale-body5-size);
  font-weight: var(--ref-typeface-weight-bold);

  &.primary {
    background: var(--sys-color-cdt-base-container);
    color: var(--sys-color-primary);
    border: var(--sys-size-1) solid var(--sys-color-primary);
    font-weight: normal;
  }
}

.status-dot {
  height: var(--sys-size-4);
  width: var(--sys-size-4);
  border-radius: var(--sys-shape-corner-full);
  background-color: var(--sys-color-purple-bright);
  margin-left: var(--sys-size-1);
  justify-self: center;
  position: relative;
  top: 0.75px;
}

.tabbed-pane-header-tab {
  font: var(--sys-typescale-body4-medium);
  color: var(--sys-color-on-surface-subtle);
  height: var(--sys-size-12);
  float: left;
  padding: 0 10px;
  white-space: nowrap;
  cursor: default;
  display: flex;
  align-items: center;
}

.tabbed-pane-header-tab.closeable {
  padding-right: var(--sys-size-3);
}

.tabbed-pane-header-tab devtools-icon.dot::before {
  outline-color: var(--icon-gap-toolbar);
}

.tabbed-pane-header-tab:hover devtools-icon.dot::before {
  outline-color: var(--icon-gap-toolbar-hover);
}

.tabbed-pane-header-tab:not(.vertical-tab-layout):hover,
.tabbed-pane-shadow .tabbed-pane-header-tab:focus-visible {
  color: var(--sys-color-on-surface);
  background-color: var(--sys-color-state-hover-on-subtle);
}

.tabbed-pane-header-tab-title {
  text-overflow: ellipsis;
  overflow: hidden;
}

.tabbed-pane-header-tab.measuring {
  visibility: hidden;
}

.tabbed-pane-header-tab.selected {
  border-bottom: none;
  color: var(--sys-color-primary);
}

.tabbed-pane-header-tab.selected.dragging {
  --override-dragging-box-shadow-color: rgb(0 0 0 / 37%);

  position: relative;
  box-shadow: 0 1px 4px 0 var(--override-dragging-box-shadow-color);
  background-color: var(--app-color-toolbar-background);
}

.theme-with-dark-background .tabbed-pane-header-tab.dragging,
:host-context(.theme-with-dark-background) .tabbed-pane-header-tab.dragging {
  --override-dragging-box-shadow-color: rgb(230 230 230 / 37%);
}

.tabbed-pane-header-tab .tabbed-pane-close-button {
  visibility: hidden;
}

.tabbed-pane-header-tab:hover .tabbed-pane-close-button,
.tabbed-pane-header-tab.selected .tabbed-pane-close-button {
  visibility: visible;
}

.tabbed-pane-header-tabs-drop-down-container {
  float: left;
  opacity: 80%;
  display: flex;
  align-items: center;
  height: 100%;
}

.tabbed-pane-header-tabs-drop-down-container > .chevron-icon:hover,
.tabbed-pane-header-tabs-drop-down-container > .chevron-icon:focus-visible {
  color: var(--icon-default-hover);
}

.tabbed-pane-header-tabs-drop-down-container:hover,
.tabbed-pane-header-tabs-drop-down-container:focus-visible {
  background-color: var(--sys-color-state-hover-on-subtle);
}

.tabbed-pane-header-tabs-drop-down-container.measuring {
  visibility: hidden;
}

.tabbed-pane-header-tabs-drop-down-container:active {
  opacity: 80%;
}
/* Web page style */

.tabbed-pane-shadow.vertical-tab-layout {
  flex-direction: row !important; /* stylelint-disable-line declaration-no-important */
}

.tabbed-pane-shadow.vertical-tab-layout .tabbed-pane-header {
  background-color: transparent;
  border: none transparent !important; /* stylelint-disable-line declaration-no-important */
  width: auto;
  flex: 0 0 auto;
  flex-direction: column;
  padding-top: 5px;
  overflow: hidden;
}

.tabbed-pane-shadow.vertical-tab-layout .tabbed-pane-content {
  padding-top: var(--sys-size-10);
  overflow-x: hidden;
}

.tabbed-pane-shadow.vertical-tab-layout .tabbed-pane-header-contents {
  margin: 0;
  flex: none;
}

.tabbed-pane-shadow.vertical-tab-layout .tabbed-pane-header-tabs {
  display: flex;
  flex-direction: column;
  width: var(--sys-size-24);
  margin-right: var(--sys-size-5);
}

.tabbed-pane-shadow.vertical-tab-layout .tabbed-pane-header-tab {
  height: var(--size-12, 28px);
  padding: 0 var(--size-8, 16px) 0 var(--size-7, 14px);
  border-radius: 0 100px 100px 0;
  color: var(--sys-color-on-surface);
  position: relative;

  & > .tabbed-pane-header-tab-icon devtools-icon {
    margin: 0;
    margin-right: var(--sys-size-6);
  }

  &.selected {
    color: var(--app-color-navigation-drawer-label-selected);
    background-color: var(--app-color-navigation-drawer-background-selected);

    & > .tabbed-pane-header-tab-icon devtools-icon {
      color: var(--app-color-navigation-drawer-label-selected);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--sys-color-state-focus-ring);
  }

  &:active::before {
    background-color: var(--sys-color-state-ripple-neutral-on-subtle);
    content: "";
    height: 100%;
    width: 100%;
    border-radius: inherit;
    position: absolute;
    top: 0;
    left: 0;
  }
}

.tabbed-pane-tab-slider {
  height: 3px;
  position: absolute;
  bottom: -1px;
  background-color: var(--sys-color-primary);
  border-radius: var(--sys-shape-corner-full) var(--sys-shape-corner-full) 0 0;
  left: 0;
  transform-origin: 0 100%;
  transition: transform 150ms cubic-bezier(0, 0, 0.2, 1);
  visibility: hidden;
}

@media (-webkit-min-device-pixel-ratio: 1.1) {
  .tabbed-pane-tab-slider {
    border-top: none;
  }
}

.tabbed-pane-tab-slider.enabled {
  visibility: visible;
}

.tabbed-pane-header-tab.disabled {
  opacity: 50%;
  pointer-events: none;
}

.tabbed-pane-left-toolbar {
  margin-right: -4px;
  flex: none;
}

.tabbed-pane-right-toolbar {
  margin-left: -4px;
  flex: none;
}

.preview-icon {
  --override-tabbed-pane-preview-icon-color: var(--icon-default);

  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: var(--sys-size-2);
  flex-shrink: 0;
}

@media (forced-colors: active) {
  .tabbed-pane-tab-slider {
    forced-color-adjust: none;
    background-color: Highlight;
  }

  .tabbed-pane-header {
    forced-color-adjust: none;
    border-bottom: 1px solid transparent;
    background-color: ButtonFace;
  }

  .tabbed-pane-header-contents .tabbed-pane-header-tabs .tabbed-pane-header-tab {
    background: ButtonFace;
    color: ButtonText;
  }

  .tabbed-pane-header-tabs .tabbed-pane-header-tab:hover,
  .tabbed-pane-header-tabs .tabbed-pane-shadow .tabbed-pane-header-tab:focus-visible {
    background-color: Highlight;
    color: HighlightText;
  }

  .tabbed-pane-header-tab .tabbed-pane-header-tab-title {
    color: inherit;
  }

  .tabbed-pane-header-contents .tabbed-pane-header-tabs .tabbed-pane-header-tab.selected,
  .tabbed-pane-header-contents .tabbed-pane-header-tabs .tabbed-pane-header-tab.selected:focus-visible {
    background-color: Highlight;
    color: HighlightText;
  }

  .tabbed-pane-header-tab:hover .tabbed-pane-close-button,
  .tabbed-pane-shadow .tabbed-pane-header-tab:focus-visible .tabbed-pane-close-button {
    color: HighlightText;
  }

  .tabbed-pane-header-tabs-drop-down-container {
    opacity: 100%;
  }

  .tabbed-pane-header-tabs-drop-down-container:hover,
  .tabbed-pane-header-tabs-drop-down-container:focus-visible {
    background-color: Highlight;
  }

  .tabbed-pane-header-tabs-drop-down-container > .chevron-icon {
    color: ButtonText;
  }

  .tabbed-pane-header-tabs-drop-down-container:hover > .chevron-icon,
  .tabbed-pane-header-tabs-drop-down-container:focus-visible > .chevron-icon {
    color: HighlightText;
  }

  .tabbed-pane-header-tabs .tabbed-pane-header-tab .preview-icon {
    --override-tabbed-pane-preview-icon-color: ButtonText;
  }

  .tabbed-pane-header-tab.selected .preview-icon,
  .tabbed-pane-header-tab:hover .preview-icon {
    --override-tabbed-pane-preview-icon-color: HighlightText;
  }

  .close-button {
    --tabbed-pane-close-icon-color: ButtonText;

    forced-color-adjust: none;
  }

  .close-button:hover,
  .close-button:active {
    --tabbed-pane-close-icon-color: HighlightText;

    background-color: Highlight;
  }

  .selected .close-button {
    --tabbed-pane-close-icon-color: HighlightText;
  }
}

/*# sourceURL=${import.meta.resolve('./tabbedPane.css')} */
`
};