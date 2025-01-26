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

* {
  box-sizing: border-box;
  /* This is required for correct sizing of flex items because we rely
     * on an old version of the flexbox spec. */

  min-width: 0;
  min-height: 0;
}

:root {
  height: 100%;
  overflow: hidden;
  /* stylelint-disable-next-line property-no-unknown */
  interpolate-size: allow-keywords;
  /**
   * NOTE: please don't add to these colours!
   * We are migrating to a new set of theme colors (see below for details) and over time these colors will be deprecated / removed.
   * Chat to jacktfranklin@ or petermueller@ if you have questions.
   * https://crbug.com/1122511
   */
  --legacy-accent-color: #1a73e8;
  --legacy-accent-fg-color: #1a73e8;
  --legacy-accent-color-hover: #3b86e8;
  --legacy-accent-fg-color-hover: #1567d3;
  --legacy-active-control-bg-color: #5a5a5a;
  --legacy-focus-bg-color: hsl(214deg 40% 92%);
  --legacy-focus-ring-inactive-shadow-color: #e0e0e0;
  --legacy-input-validation-error: #db1600;
  --legacy-toolbar-hover-bg-color: #eaeaea;
  --legacy-selection-fg-color: #fff;
  --legacy-selection-bg-color: var(--legacy-accent-color);
  --legacy-selection-inactive-fg-color: #5a5a5a;
  --legacy-selection-inactive-bg-color: #dadada;
  --legacy-divider-border: 1px solid var(--sys-color-divider);
  --legacy-focus-ring-inactive-shadow: 0 0 0 1px var(--legacy-focus-ring-inactive-shadow-color);
  --legacy-focus-ring-active-shadow: 0 0 0 1px var(--legacy-accent-color);
  --legacy-item-selection-bg-color: #cfe8fc;
  --legacy-item-selection-inactive-bg-color: #e0e0e0;
  --monospace-font-size: 10px;
  --monospace-font-family: monospace;
  --source-code-font-size: 11px;
  --source-code-font-family: monospace;
  --sys-motion-duration-short4: 200ms;
  --sys-motion-duration-medium2: 300ms;
  --sys-motion-duration-long2: 500ms;
  --sys-motion-easing-emphasized: cubic-bezier(0.2, 0, 0, 1);
  --sys-motion-easing-emphasized-decelerate: cubic-bezier(0.05, 0.7, 0.1, 1);
  --sys-motion-easing-emphasized-accelerate: cubic-bezier(0.2, 0, 0, 1);

  /* This will be overridden by the platform-X classes that get
   * added to the html tag on load, but is here as a safe
   * fallback */
  --default-font-family: ".SFNSDisplay-Regular", "Helvetica Neue", "Lucida Grande", sans-serif;
}

.theme-with-dark-background {
  /**
   * Inherit the native form control colors when using a dark theme.
   * Override them using CSS variables if needed.
   */
  color-scheme: dark;
  /**
   * NOTE: please don't add to these colours!
   * We are migrating to a new set of theme colors (see below for details) and over time these colors will be deprecated / removed.
   * Chat to jacktfranklin@ or petermueller@ if you have questions.
   * https://crbug.com/1122511
   */
  --legacy-accent-color: #0e639c;
  --legacy-accent-fg-color: #ccc;
  --legacy-accent-fg-color-hover: #fff;
  --legacy-accent-color-hover: rgb(17 119 187);
  --legacy-active-control-bg-color: #cdcdcd;
  --legacy-focus-bg-color: hsl(214deg 19% 27%);
  --legacy-focus-ring-inactive-shadow-color: #5a5a5a;
  --legacy-toolbar-hover-bg-color: #202020;
  --legacy-selection-fg-color: #cdcdcd;
  --legacy-selection-inactive-fg-color: #cdcdcd;
  --legacy-selection-inactive-bg-color: hsl(0deg 0% 28%);
  --legacy-focus-ring-inactive-shadow: 0 0 0 1px var(--legacy-focus-ring-inactive-shadow-color);
  --legacy-item-selection-bg-color: hsl(207deg 88% 22%);
  --legacy-item-selection-inactive-bg-color: #454545;
}

body {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  margin: 0;
  cursor: default;
  font-family: var(--default-font-family);
  font-size: 12px;
  tab-size: 4;
  user-select: none;
  color: var(--sys-color-on-surface);
  background: var(--sys-color-cdt-base-container);
}

/* Default fonts */
.platform-linux {
  --default-font-family: "Google Sans Text", "Google Sans", system-ui, sans-serif;
}

.platform-mac {
  --default-font-family: system-ui, sans-serif;
}

.platform-windows {
  --default-font-family: system-ui, sans-serif;
}

:focus {
  outline-width: 0;
}

/* Monospace font per platform configuration */
.platform-mac,
:host-context(.platform-mac) {
  --monospace-font-size: 11px;
  --monospace-font-family: monospace;
  --source-code-font-size: 11px;
  --source-code-font-family: monospace;
}

.platform-windows,
:host-context(.platform-windows) {
  --monospace-font-size: 12px;
  --monospace-font-family: monospace;
  --source-code-font-size: 12px;
  --source-code-font-family: monospace;
}

.platform-linux,
:host-context(.platform-linux) {
  --monospace-font-size: 11px;
  --monospace-font-family: "Noto Sans Mono", "DejaVu Sans Mono", monospace;
  --source-code-font-size: 11px;
  --source-code-font-family: "Noto Sans Mono", "DejaVu Sans Mono", monospace;
}

.monospace {
  font-family: var(--monospace-font-family);
  font-size: var(--monospace-font-size) !important; /* stylelint-disable-line declaration-no-important */
}

.source-code {
  font-family: var(--source-code-font-family);
  font-size: var(--source-code-font-size) !important; /* stylelint-disable-line declaration-no-important */
  white-space: pre-wrap;
}

.source-code .devtools-link.text-button {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

img {
  -webkit-user-drag: none;
}

iframe,
a img {
  border: none;
}

.fill {
  position: absolute;
  inset: 0;
}

iframe.fill {
  width: 100%;
  height: 100%;
}

.widget {
  position: relative;
  flex: auto;
  contain: style;
}

.hbox {
  display: flex;
  flex-direction: row !important; /* stylelint-disable-line declaration-no-important */
  position: relative;
}

.vbox {
  display: flex;
  flex-direction: column !important; /* stylelint-disable-line declaration-no-important */
  position: relative;
}

.view-container > devtools-toolbar {
  border-bottom: 1px solid var(--sys-color-divider);
}

.flex-auto {
  flex: auto;
}

.flex-none {
  flex: none;
}

.flex-centered {
  display: flex;
  align-items: center;
  justify-content: center;
}

.overflow-auto {
  overflow: auto;
  background-color: var(--sys-color-cdt-base-container);
}

iframe.widget {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
}

.hidden {
  display: none !important; /* stylelint-disable-line declaration-no-important */
}

.highlighted-search-result {
  border-radius: 1px;
  background-color: var(--sys-color-yellow-container);
  outline: 1px solid var(--sys-color-yellow-container);
}

.link {
  cursor: pointer;
  text-decoration: underline;
  color: var(--sys-color-primary);
  outline-offset: 2px;
}

button,
input,
select {
  /* Form elements do not automatically inherit font style from ancestors. */
  font-family: inherit;
  font-size: inherit;
}

select option,
select optgroup,
input {
  background-color: var(--sys-color-cdt-base-container);
}

input {
  color: inherit;

  &[type="checkbox"] {
    position: relative;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover::after,
    &:active::before {
      content: "";
      height: 24px;
      width: 24px;
      border-radius: var(--sys-shape-corner-full);
      position: absolute;
    }

    &:not(.-theme-preserve) {
      accent-color: var(--sys-color-primary-bright);
      color: var(--sys-color-on-primary);
    }

    &:not(:disabled):hover::after {
      background-color: var(--sys-color-state-hover-on-subtle);
    }

    &:not(:disabled):active::before {
      background-color: var(--sys-color-state-ripple-neutral-on-subtle);
    }

    &:not(:disabled):focus-visible::before {
      content: "";
      height: 15px;
      width: 15px;
      border-radius: 5px;
      position: absolute;
      border: 2px solid var(--sys-color-state-focus-ring);
    }

    &.small:hover::after,
    &.small:active::before {
      height: 12px;
      width: 12px;
      border-radius: 2px;
    }
  }
}

input::placeholder {
  --override-input-placeholder-color: rgb(0 0 0 / 54%);

  color: var(--override-input-placeholder-color);
}

.theme-with-dark-background input::placeholder,
:host-context(.theme-with-dark-background) input::placeholder {
  --override-input-placeholder-color: rgb(230 230 230 / 54%);
}

.harmony-input:not([type]),
.harmony-input[type="number"],
.harmony-input[type="text"] {
  padding: 3px 6px;
  height: 24px;
  border: 1px solid var(--sys-color-neutral-outline);
  border-radius: 4px;

  &.error-input,
  &:invalid {
    border-color: var(--sys-color-error);
  }

  &:not(.error-input, :invalid):focus {
    border-color: var(--sys-color-state-focus-ring);
  }

  &:not(.error-input, :invalid):hover:not(:focus) {
    background: var(--sys-color-state-hover-on-subtle);
  }
}

/* Radio inputs */
input[type="radio"] {
  height: 17px;
  width: 17px;
  min-width: 17px;
  border-radius: 8px;
  vertical-align: sub;
  margin: 0 5px 5px 0;
  accent-color: var(--sys-color-primary-bright);
  color: var(--sys-color-on-primary);

  &:focus {
    box-shadow: var(--legacy-focus-ring-active-shadow);
  }
}

@media (forced-colors: active) {
  input[type="radio"] {
    --gradient-start: ButtonFace;
    --gradient-end: ButtonFace;

    &:checked {
      --gradient-start: Highlight;
      --gradient-end: Highlight;
    }
  }
}

/* Range inputs */
input[type="range"] {
  appearance: none;
  margin: 0;
  padding: 0;
  height: 10px;
  width: 88px;
  outline: none;
  background: none;
}

input[type="range"]::-webkit-slider-thumb,
.-theme-preserve {
  appearance: none;
  margin: 0;
  padding: 0;
  border: 0;
  width: 12px;
  height: 12px;
  margin-top: -5px;
  border-radius: 50%;
  background-color: var(--sys-color-primary);
}

input[type="range"]::-webkit-slider-runnable-track {
  appearance: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 2px;
  background-color: var(--sys-color-surface-variant);
}

input[type="range"]:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 2px var(--sys-color-inverse-primary);
}

input[type="range"]:disabled::-webkit-slider-thumb {
  background-color: var(--sys-color-state-disabled);
}

@media (forced-colors: active) {
  input[type="range"] {
    forced-color-adjust: none;
  }
}

.highlighted-search-result.current-search-result {
  /* Note: this value is used in light & dark mode */
  --override-current-search-result-background-color: rgb(255 127 0 / 80%);

  border-radius: 1px;
  padding: 1px;
  margin: -1px;
  background-color: var(--override-current-search-result-background-color);
}

.dimmed {
  opacity: 60%;
}

.editing {
  box-shadow: var(--drop-shadow);
  background-color: var(--sys-color-cdt-base-container);
  text-overflow: clip !important; /* stylelint-disable-line declaration-no-important */
  padding-left: 2px;
  margin-left: -2px;
  padding-right: 2px;
  margin-right: -2px;
  margin-bottom: -1px;
  padding-bottom: 1px;
  opacity: 100% !important; /* stylelint-disable-line declaration-no-important */
}

.editing,
.editing * {
  color: var(--sys-color-on-surface) !important; /* stylelint-disable-line declaration-no-important */
  text-decoration: none !important; /* stylelint-disable-line declaration-no-important */
}

/* Combo boxes */

select {
  appearance: none;
  user-select: none;
  height: var(--sys-size-11);
  border: var(--sys-size-1) solid var(--sys-color-neutral-outline);
  border-radius: var(--sys-shape-corner-extra-small);
  color: var(--sys-color-on-surface);
  font: inherit;
  margin: 0;
  outline: none;
  padding: 0 var(--sys-size-9) 0 var(--sys-size-5);
  background-image: var(--combobox-dropdown-arrow);
  background-color: transparent;
  background-position: right center;
  background-repeat: no-repeat;

  &:disabled {
    opacity: 100%;
    border-color: transparent;
    color: var(--sys-color-state-disabled);
    background-color: var(--sys-color-state-disabled-container);
    pointer-events: none;;
  }

  &:enabled {
    &:hover {
      background-color: var(--sys-color-state-hover-on-subtle);
    }

    &:active {
      background-color: var(--sys-color-state-ripple-neutral-on-subtle);
    }

    &:hover:active {
      /* stylelint-disable plugin/use_theme_colors */
      background:
        var(--combobox-dropdown-arrow),
        linear-gradient(var(--sys-color-state-hover-on-subtle), var(--sys-color-state-hover-on-subtle)),
        linear-gradient(var(--sys-color-state-ripple-neutral-on-subtle), var(--sys-color-state-ripple-neutral-on-subtle));
      /* stylelint-enable plugin/use_theme_colors */
      background-position: right center;
      background-repeat: no-repeat;
    }

    &:focus {
      outline: var(--sys-size-2) solid var(--sys-color-state-focus-ring);
      outline-offset: -1px;
    }
  }
}

@media (forced-colors: active) and (prefers-color-scheme: light) {
  :root,
  .theme-with-dark-background,
  :host-context(.theme-with-dark-background) {
    --combobox-dropdown-arrow: var(--image-file-arrow-drop-down-light);
  }
}

@media (forced-colors: active) and (prefers-color-scheme: dark) {
  :root,
  .theme-with-dark-background,
  :host-context(.theme-with-dark-background) {
    --combobox-dropdown-arrow: var(--image-file-arrow-drop-down-dark);
  }
}

.chrome-select-label {
  margin: 0 var(--sys-size-10);
  flex: none;

  p p {
    margin-top: 0;
    color: var(--sys-color-token-subtle);
  }

  .reload-warning {
    margin-left: var(--sys-size-5);
  }
}

/* This class is used outside of the settings screen in the "Renderer" and
   "Sensors" panel. As such we need to override their style globally */
.settings-select {
  margin: 0;
}

select optgroup,
select option {
  background-color: var(--sys-color-cdt-base-container);
  color: var(--sys-color-on-surface);
}

.gray-info-message {
  text-align: center;
  font-style: italic;
  padding: 6px;
  color: var(--sys-color-token-subtle);
  white-space: nowrap;
}

/* General empty state styles */
.empty-state {
  margin: var(--sys-size-5);
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  min-height: fit-content;
  min-width: fit-content;

  > * {
    max-width: var(--sys-size-29);
  }

  .header {
    font: var(--sys-typescale-headline5);
    margin-bottom: var(--sys-size-3);
  }

  .description {
    font: var(--sys-typescale-body4-regular);
    color: var(--sys-color-on-surface-subtle);

    > x-link {  /* stylelint-disable-line selector-type-no-unknown */
      margin-left: var(--sys-size-3);
    }
  }
}

dt-icon-label {
  flex: none;
}

.full-widget-dimmed-banner a {
  color: inherit;
}

.full-widget-dimmed-banner {
  color: var(--sys-color-token-subtle);
  background-color: var(--sys-color-cdt-base-container);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  position: absolute;
  inset: 0;
  font-size: 13px;
  overflow: auto;
  z-index: 500;
}

.dot::before {
  content: var(--image-file-empty);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  outline: 1px solid var(--icon-gap-default);
  left: 9px;
  position: absolute;
  top: 9px;
  z-index: 1;
}

.green::before {
  background-color: var(--sys-color-green-bright);
}

.purple::before {
  background-color: var(--sys-color-purple-bright);
}

.expandable-inline-button {
  background-color: var(--sys-color-cdt-base-container);
  color: var(--sys-color-on-surface);
  cursor: pointer;
  border-radius: 3px;
}

.undisplayable-text,
.expandable-inline-button {
  border: none;
  padding: 1px 3px;
  margin: 0 2px;
  font-size: 11px;
  font-family: sans-serif;
  white-space: nowrap;
  display: inline-block;
}

.undisplayable-text::after,
.expandable-inline-button::after {
  content: attr(data-text);
}

.undisplayable-text {
  color: var(--sys-color-state-disabled);
  font-style: italic;
}

.expandable-inline-button:hover,
.expandable-inline-button:focus-visible {
  background-color: var(--sys-color-state-hover-on-subtle);
}

.expandable-inline-button:focus-visible {
  background-color: var(--sys-color-state-focus-highlight);
}

::selection {
  background-color: var(--sys-color-state-text-highlight);
  color: var(--sys-color-state-on-text-highlight);
}

button.link {
  border: none;
  background: none;
  padding: 3px;
}

button.link:focus-visible {
  outline: 2px solid var(--sys-color-state-focus-ring);
  outline-offset: 2px;
  border-radius: var(--sys-shape-corner-full);
}

.theme-with-dark-background button.link:focus-visible,
:host-context(.theme-with-dark-background) button.link:focus-visible {
  --override-link-focus-background-color: rgb(230 230 230 / 8%);
}

@media (forced-colors: active) {
  .dimmed,
  select:disabled {
    opacity: 100%;
  }

  .harmony-input:not([type]),
  .harmony-input[type="number"],
  .harmony-input[type="text"] {
    border: 1px solid ButtonText;
  }

  .harmony-input:not([type]):focus,
  .harmony-input[type="number"]:focus,
  .harmony-input[type="text"]:focus {
    border: 1px solid Highlight;
  }
}
/* search input with customized styling */
input.custom-search-input::-webkit-search-cancel-button {
  appearance: none;
  width: 16px;
  height: 15px;
  margin-right: 0;
  opacity: 70%;
  mask-image: var(--image-file-cross-circle-filled);
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: 99%;
  background-color: var(--icon-default);
}

input.custom-search-input::-webkit-search-cancel-button:hover {
  opacity: 99%;
}
/* loading spinner */
.spinner::before {
  display: block;
  width: var(--dimension, 24px);
  height: var(--dimension, 24px);
  border: var(--override-spinner-size, 3px) solid var(--override-spinner-color, var(--sys-color-token-subtle));
  border-radius: 12px;
  clip: rect(0, var(--clip-size, 15px), var(--clip-size, 15px), 0);
  content: "";
  position: absolute;
  animation: spinner-animation 1s linear infinite;
  box-sizing: border-box;
}

@keyframes spinner-animation {
  from { transform: rotate(0); }
  to { transform: rotate(360deg); }
}
/** Adorner */
.adorner-container {
  display: inline-flex;
  vertical-align: middle;
}

.adorner-container.hidden {
  display: none;
}

.adorner-container devtools-adorner {
  margin-left: 3px;
}

:host-context(.theme-with-dark-background) devtools-adorner {
  --override-adorner-border-color: var(--sys-color-tonal-outline);
  --override-adorner-focus-border-color: var(--sys-color-state-focus-ring);
  --override-adorner-active-background-color: var(--sys-color-state-riple-neutral-on-subtle);
}

/* General panel styles */
.panel {
  display: flex;
  overflow: hidden;
  position: absolute;
  inset: 0;
  z-index: 0;
  background-color: var(--sys-color-cdt-base-container);
}

.panel-sidebar {
  overflow-x: hidden;
  background-color: var(--sys-color-cdt-base-container);
}

iframe.extension {
  flex: auto;
  width: 100%;
  height: 100%;
}

iframe.panel.extension {
  display: block;
  height: 100%;
}

@media (forced-colors: active) {
  :root {
    --legacy-accent-color: Highlight;
    --legacy-focus-ring-inactive-shadow-color: ButtonText;
  }
}

/* Toolbar styles */
devtools-toolbar {
  & > * {
    position: relative;
    display: flex;
    background-color: transparent;
    flex: none;
    align-items: center;
    justify-content: center;
    height: var(--toolbar-height);
    border: none;
    white-space: pre;
    overflow: hidden;
    max-width: 100%;
    color: var(--icon-default);

    /* Some toolbars have a different cursor on hover (for example, resizeable
     * ones which can be clicked + dragged to move). But we want to make sure
     * by default each toolbar item shows the default cursor, because you
     * cannot click + drag on the item to resize the toolbar container, you
     * have to click + drag only on empty space. See crbug.com/371838044 for
     * an example. */
    cursor: default;

    & .devtools-link {
      color: var(--icon-default);
    }
  }

  & > :not(select) {
    padding: 0;
  }

  & > devtools-issue-counter {
    margin-top: -4px;
    padding-left: 1px;
  }

  devtools-adorner.fix-perf-icon {
    --override-adorner-text-color: transparent;
    --override-adorner-border-color: transparent;
    --override-adorner-background-color: transparent;
  }

  devtools-issue-counter.main-toolbar {
    margin-left: 1px;
    margin-right: 1px;
  }

  .toolbar-dropdown-arrow {
    pointer-events: none;
    flex: none;
    top: 2px;
  }

  .toolbar-button.dark-text .toolbar-dropdown-arrow {
    color: var(--sys-color-on-surface);
  }

  /* Toolbar item */

  .toolbar-button {
    white-space: nowrap;
    overflow: hidden;
    min-width: 28px;
    background: transparent;
    border-radius: 0;

    &[aria-haspopup="true"][aria-expanded="true"] {
      pointer-events: none;
    }
  }

  .toolbar-item-search {
    min-width: 5.2em;
    max-width: 300px;
    flex: 1 1 auto;
    justify-content: start;
    overflow: revert;
  }

  .toolbar-text {
    margin: 0 5px;
    flex: none;
    color: var(--ui-text);
  }

  .toolbar-text:empty {
    margin: 0;
  }

  .toolbar-has-dropdown {
    justify-content: space-between;
    height: var(--sys-size-9);
    padding: 0 var(--sys-size-2) 0 var(--sys-size-4);
    margin: 0 var(--sys-size-2);
    gap: var(--sys-size-2);
    border-radius: var(--sys-shape-corner-extra-small);

    &:hover::after,
    &:active::before {
      content: "";
      height: 100%;
      width: 100%;
      border-radius: inherit;
      position: absolute;
      top: 0;
      left: 0;
    }

    &:hover::after {
      background-color: var(--sys-color-state-hover-on-subtle);
    }

    &:active::before {
      background-color: var(--sys-color-state-ripple-neutral-on-subtle);
    }

    &:focus-visible {
      outline: var(--sys-size-2) solid var(--sys-color-state-focus-ring);
    }

    &[disabled] {
      pointer-events: none;
      background-color: var(--sys-color-state-disabled-container);
      color: var(--sys-color-state-disabled);
    }
  }

  .toolbar-has-dropdown-shrinkable {
    flex-shrink: 1;
  }

  .toolbar-has-dropdown .toolbar-text {
    margin: 0;
    text-overflow: ellipsis;
    flex: auto;
    overflow: hidden;
    text-align: right;
  }

  .toolbar-button:not(.toolbar-has-dropdown):focus-visible::before {
    position: absolute;
    inset: 2px;
    background-color: var(--sys-color-state-focus-highlight);
    border-radius: 2px;
    content: "";
    /* This ::before rule serves as a background for an element.
    Setting z-index to make sure it's always below the content. */
    z-index: -1;
  }

  .toolbar-glyph {
    flex: none;
  }
  /* Button */

  .toolbar-button:disabled {
    opacity: 50%;
  }

  .toolbar-button.copied-to-clipboard::after {
    content: attr(data-content);
    position: fixed;
    margin-top: calc(2 * var(--toolbar-height));
    padding: 3px 5px;
    color: var(--sys-color-token-subtle);
    background: var(--sys-color-cdt-base-container);
    animation: 2s fade-out;
    font-weight: normal;
    border: 1px solid var(--sys-color-divider);
    border-radius: 3px;
  }

  .toolbar-button.toolbar-state-on .toolbar-glyph {
    color: var(--icon-toggled);
  }

  .toolbar-state-on.toolbar-toggle-with-dot .toolbar-text::after {
    content: "";
    position: absolute;
    bottom: 2px;
    background-color: var(--sys-color-primary-bright);
    width: 4.5px;
    height: 4.5px;
    border: 2px solid var(--override-toolbar-background-color, --sys-color-cdt-base-container);
    border-radius: 50%;
    right: 0;
  }

  .toolbar-button.toolbar-state-on.toolbar-toggle-with-red-color .toolbar-glyph,
  .toolbar-button.toolbar-state-off.toolbar-default-with-red-color .toolbar-glyph {
    color: var(--icon-error) !important; /* stylelint-disable-line declaration-no-important */
  }

  .toolbar-button:not(.toolbar-has-glyph, .toolbar-has-dropdown, .largeicon-menu, .toolbar-button-secondary) {
    font-weight: bold;
  }

  .toolbar-button.dark-text .toolbar-text {
    color: var(--sys-color-on-surface) !important;  /* stylelint-disable-line declaration-no-important */
  }

  .toolbar-button.toolbar-state-on .toolbar-text {
    color: var(--sys-color-primary);
  }

  .toolbar-button.toolbar-state-on:enabled:active .toolbar-text {
    color: var(--sys-color-primary-bright);
  }

  .toolbar-button:enabled:hover:not(:active) .toolbar-glyph {
    color: var(--sys-color-on-surface);
  }

  .toolbar-button:enabled:hover:not(:active) .toolbar-text {
    color: var(--sys-color-on-surface);
  }

  .toolbar-button.toolbar-state-on:enabled:hover:not(:active) .toolbar-glyph {
    color: var(--sys-color-primary);
  }

  .toolbar-button.toolbar-state-on:enabled:hover:not(:active) .toolbar-text {
    color: var(--sys-color-primary);
  }

  /* Checkbox */

  & > dt-checkbox {
    padding: 0 5px 0 0;
  }

  /* Select */

  & > select {
    height: var(--sys-size-9);
    min-width: var(--sys-size-14);
  }

  /* Input */

  .toolbar-input {
    box-shadow: inset 0 0 0 2px transparent;
    box-sizing: border-box;
    width: 120px;
    height: var(--sys-size-9);
    padding: 0 var(--sys-size-2) 0 var(--sys-size-5);
    margin: 1px 3px;
    border-radius: 100px;
    min-width: 35px;
    position: relative;

    &.focused {
      box-shadow: inset 0 0 0 2px var(--sys-color-state-focus-ring);
    }

    &:not(:has(devtools-button:hover), .disabled):hover {
      background-color: var(--sys-color-state-hover-on-subtle);
    }

    &::before {
      content: "";
      box-sizing: inherit;
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      background: var(--sys-color-cdt-base);
      z-index: -1;
    }

    & > devtools-icon {
      color: var(--sys-color-on-surface-subtle);
      width: var(--sys-size-8);
      height: var(--sys-size-8);
      margin-right: var(--sys-size-3);
    }

    &.disabled > devtools-icon {
      color: var(--sys-color-state-disabled);
    }
  }

  .toolbar-filter .toolbar-input-clear-button {
    margin-right: var(--sys-size-4);
  }

  .toolbar-input-empty .toolbar-input-clear-button {
    display: none;
  }

  .toolbar-prompt-proxy {
    flex: 1;
  }

  .toolbar-input-prompt {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    cursor: auto;
    color: var(--sys-color-on-surface);
  }
  /* Separator */

  .toolbar-divider {
    background-color: var(--sys-color-divider);
    width: 1px;
    margin: 5px 4px;
    height: 16px;
  }

  .toolbar-spacer {
    flex: auto;
  }

  .toolbar-button.emulate-active {
    background-color: var(--sys-color-surface-variant);
  }

  &:not([floating]) > :last-child:not(:first-child, select) {
    flex-shrink: 1;
    justify-content: left;
  }

  &:not([floating]) > .toolbar-button:last-child:not(:first-child, select) {
    justify-content: left;
    margin-right: 2px;
  }

  & > .highlight::before {
    content: "";
    position: absolute;
    inset: 2px;
    border-radius: 2px;
    background: var(--sys-color-neutral-container);
    z-index: -1;
  }

  & > .highlight:focus-visible {
    background: var(--sys-color-tonal-container);

    & > .title {
      color: var(--sys-color-on-tonal-container);
    }
  }

  devtools-icon.leading-issue-icon {
    margin: 0 7px;
  }

  @media (forced-colors: active) {
    .toolbar-button:disabled {
      opacity: 100%;
      color: Graytext;
    }

    devtools-toolbar > *,
    .toolbar-text {
      color: ButtonText;
    }

    .toolbar-button:disabled .toolbar-text {
      color: Graytext;
    }

    devtools-toolbar > select:disabled {
      opacity: 100%;
      color: Graytext;
    }

    .toolbar-button.toolbar-state-on .toolbar-glyph {
      forced-color-adjust: none;
      color: Highlight;
    }

    .toolbar-button.toolbar-state-on .toolbar-text {
      forced-color-adjust: none;
      color: Highlight;
    }

    .toolbar-button:enabled:hover:not(:active) .toolbar-text,
    .toolbar-button:enabled:focus:not(:active) .toolbar-text {
      color: HighlightText;
    }

    .toolbar-button:disabled devtools-icon {
      color: GrayText;
    }

    .toolbar-button:disabled .toolbar-glyph {
      color: GrayText;
    }

    .toolbar-button:enabled.hover:not(:active) .toolbar-glyph {
      forced-color-adjust: none;
      color: Highlight;
    }

    .toolbar-button:enabled:hover .toolbar-glyph,
    .toolbar-button:enabled:focus .toolbar-glyph,
    .toolbar-button:enabled:hover:not(:active) .toolbar-glyph,
    .toolbar-button:enabled:hover devtools-icon,
    .toolbar-button:enabled:focus devtools-icon {
      color: HighlightText;
    }

    .toolbar-input {
      forced-color-adjust: none;
      background: canvas;
      box-shadow: var(--legacy-focus-ring-inactive-shadow);
    }

    .toolbar-input.focused,
    .toolbar-input:not(.toolbar-input-empty) {
      forced-color-adjust: none;
      background: canvas;
      box-shadow: var(--legacy-focus-ring-active-shadow);
    }

    .toolbar-input:hover {
      box-shadow: var(--legacy-focus-ring-active-shadow);
    }

    devtools-toolbar .devtools-link {
      color: linktext;
    }

    .toolbar-has-dropdown {
      forced-color-adjust: none;
      background: ButtonFace;
      color: ButtonText;
    }
  }
}

@keyframes fade-out {
  from {
    opacity: 100%;
  }

  to {
    opacity: 0%;
  }
}

/* Syntax highlighting */
.webkit-css-property {
  color: var(--webkit-css-property-color, var(--sys-color-token-property-special)); /* stylelint-disable-line plugin/use_theme_colors */ /* See: crbug.com/1152736 for color variable migration. */
}

.webkit-html-comment {
  color: var(--sys-color-token-comment);
}

.webkit-html-tag {
  color: var(--sys-color-token-tag);
}

.webkit-html-tag-name,
.webkit-html-close-tag-name {
  /* Keep this in sync with view-source.css (.webkit-html-tag) */
  color: var(--sys-color-token-tag);
}

.webkit-html-pseudo-element {
  /* This one is non-standard. */
  color: var(--sys-color-token-pseudo-element);
}

.webkit-html-js-node,
.webkit-html-css-node {
  color: var(--text-primary);
  white-space: pre-wrap;
}

.webkit-html-text-node {
  color: var(--text-primary);
  unicode-bidi: -webkit-isolate;
}

.webkit-html-entity-value {
  /* This one is non-standard. */
  background-color: rgb(0 0 0 / 15%); /* stylelint-disable-line plugin/use_theme_colors */
  /* See: crbug.com/1152736 for color variable migration. */
  unicode-bidi: -webkit-isolate;
}

.webkit-html-doctype {
  /* Keep this in sync with view-source.css (.webkit-html-doctype) */
  color: var(--text-secondary);
  /* See: crbug.com/1152736 for color variable migration. */
}

.webkit-html-attribute-name {
  /* Keep this in sync with view-source.css (.webkit-html-attribute-name) */
  color: var(--sys-color-token-attribute);
  unicode-bidi: -webkit-isolate;
}

.webkit-html-attribute-value {
  /* Keep this in sync with view-source.css (.webkit-html-attribute-value) */
  color: var(--sys-color-token-attribute-value);
  unicode-bidi: -webkit-isolate;
  word-break: break-all;
}

.devtools-link {
  color: var(--text-link);
  text-decoration: underline;
  outline-offset: 2px;

  .elements-disclosure & {
    color: var(--text-link);
  }

  devtools-icon {
    vertical-align: baseline;
    color: var(--sys-color-primary);
  }

  :focus .selected & devtools-icon {
    color: var(--sys-color-tonal-container);
  }

  &:focus-visible {
    outline-width: unset;
  }

  &.invalid-link {
    color: var(--text-disabled);
    text-decoration: none;
  }

  &:not(.devtools-link-prevent-click, .invalid-link) {
    cursor: pointer;
  }

  @media (forced-colors: active) {
    &:not(.devtools-link-prevent-click) {
      forced-color-adjust: none;
      color: linktext;
    }

    &:focus-visible {
      background: Highlight;
      color: HighlightText;
    }
  }
}

/*# sourceURL=inspectorCommon.css */
`
};
