// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/**
 * Copyright 2017 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.styles-section {
  min-height: 18px;
  white-space: nowrap;
  user-select: text;
  border-bottom: 1px solid var(--sys-color-divider);
  position: relative;
  overflow: hidden;
  padding: 2px 2px 4px 4px;

  &:last-child {
    border-bottom: none;
  }

  &.has-open-popover {
    z-index: 1;
  }

  &.read-only {
    background-color: var(--sys-color-cdt-base-container);
    font-style: italic;
  }

  &:focus-visible,
  &.read-only:focus-visible {
    background-color: var(--sys-color-state-focus-highlight);
  }

  .simple-selector.filter-match {
    background-color: var(--sys-color-tonal-container);
    color: var(--sys-color-on-surface);
  }

  .devtools-link {
    user-select: none;
  }

  .styles-section-subtitle devtools-icon {
    margin-bottom: -4px;
  }

  .styles-section-subtitle .devtools-link {
    color: var(--sys-color-on-surface);
    text-decoration-color: var(--sys-color-neutral-bright);
    outline-offset: 0;
  }

  .selector,
  .try-rule-selector-element,
  .ancestor-rule-list,
  .ancestor-closing-braces {
    color: var(--app-color-element-sidebar-subtitle);
  }

  .ancestor-rule-list,
  .styles-section-title {
    overflow-wrap: break-word;
    white-space: normal;
  }

  .ancestor-rule-list devtools-css-query {
    display: block;
  }

  .simple-selector.selector-matches,
  &.keyframe-key {
    color: var(--sys-color-on-surface);
  }

  .style-properties {
    margin: 0;
    padding: 2px 4px 0 0;
    list-style: none;
    clear: both;
    display: flex;
  }

  &.matched-styles .style-properties {
    padding-left: 0;
  }

  & span.simple-selector:hover {
    text-decoration: var(--override-styles-section-text-hover-text-decoration);
    cursor: var(--override-styles-section-text-hover-cursor);
  }

  &.styles-panel-hovered:not(.read-only),
  &.styles-panel-hovered:not(.read-only) devtools-css-query {
    --override-styles-section-text-hover-text-decoration: underline;
    --override-styles-section-text-hover-cursor: default;
  }
}

.sidebar-pane-closing-brace {
  clear: both;
}

.styles-section-subtitle {
  color: var(--sys-color-token-subtle);
  float: right;
  padding: var(--sys-size-2) var(--sys-size-2) 0 var(--sys-size-8);
  max-width: 100%;
  height: 15px;
  margin-bottom: -1px;
}

.styles-section-subtitle * {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
}

.sidebar-pane-open-brace,
.sidebar-pane-closing-brace {
  color: var(--sys-color-on-surface);
}

@keyframes styles-element-state-pane-slidein {
  from {
    margin-top: -60px;
  }

  to {
    margin-top: 0;
  }
}

@keyframes styles-element-state-pane-slideout {
  from {
    margin-top: 0;
  }

  to {
    margin-top: -60px;
  }
}

.styles-sidebar-toolbar-pane {
  position: relative;
  animation-duration: 0.1s;
  animation-direction: normal;
}

.styles-sidebar-toolbar-pane-container {
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.styles-selector {
  cursor: text;
}

/* TODO(changhaohan): restructure this in relation to stylePropertiesTreeOutline.css. */
.styles-clipboard-only {
  display: inline-block;
  width: 0;
  opacity: 0%;
  pointer-events: none;
  white-space: pre;
}

.styles-sidebar-pane-toolbar-container {
  flex-shrink: 0;
  overflow: hidden;
  position: sticky;
  top: 0;
  background-color: var(--sys-color-cdt-base-container);
  z-index: 2;
}

.styles-sidebar-pane-toolbar {
  border-bottom: 1px solid var(--sys-color-divider);
}

.styles-pane-toolbar {
  width: 100%;
}

.font-toolbar-hidden {
  visibility: hidden;
}

.sidebar-separator {
  background-color: var(--sys-color-surface2);
  padding: 0 5px;
  border-bottom: 1px solid var(--sys-color-divider);
  color: var(--sys-color-on-surface-subtle);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 22px;

  > span.monospace {
    max-width: 180px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
    margin-left: 2px;
  }

  &.layer-separator {
    display: flex;
  }

  &.empty-section {
    border-bottom: none;
  }
}

.sidebar-pane-section-toolbar {
  position: absolute;
  right: 0;
  bottom: -1px;
  z-index: 0;

  &.new-rule-toolbar {
    visibility: hidden;
    margin-bottom: 5px;

    --toolbar-height: 16px;
  }

  &.shifted-toolbar {
    padding-right: 32px;
  }
}

.styles-pane:not(.is-editing-style) .styles-section.matched-styles:not(.read-only):hover .sidebar-pane-section-toolbar.new-rule-toolbar {
  visibility: visible;
}

.styles-show-all {
  padding: 4px;
  margin-left: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: -webkit-fill-available;
}

@media (forced-colors: active) {
  .sidebar-pane-section-toolbar {
    forced-color-adjust: none;
    border-color: 1px solid ButtonText;
    background-color: ButtonFace;
  }

  .styles-section {
    &:focus-visible,
    &.read-only:focus-visible {
      forced-color-adjust: none;
      background-color: Highlight;
    }

    .styles-section-subtitle {
      .devtools-link {
        color: linktext;
        text-decoration-color: linktext;

        &:focus-visible {
          color: HighlightText;
        }
      }
    }

    &:focus-visible *,
    &.read-only:focus-visible *,
    &:focus-visible .styles-section-subtitle .devtools-link {
      color: HighlightText;
      text-decoration-color: HighlightText;
    }

    &:focus-visible .sidebar-pane-section-toolbar {
      background-color: ButtonFace;
    }

    &:focus-visible {
      --webkit-css-property-color: HighlightText;
    }
  }
}

.spinner::before {
  --dimension: 24px;

  margin-top: 2em;
  left: calc(50% - var(--dimension) / 2);
}

.section-block-expand-icon {
  margin-bottom: -4px;
}

/*# sourceURL=stylesSidebarPane.css */
`
};