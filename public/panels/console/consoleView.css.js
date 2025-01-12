// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright (C) 2006, 2007, 2008 Apple Inc.  All rights reserved.
 * Copyright (C) 2009 Anthony Ricaud <rik@webkit.org>
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1.  Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 * 2.  Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 * 3.  Neither the name of Apple Computer, Inc. ("Apple") nor the names of
 *     its contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE AND ITS CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL APPLE OR ITS CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

.console-view {
  background-color: var(--sys-color-cdt-base-container);
  overflow: hidden;

  --override-error-text-color: var(--sys-color-on-error-container);
  --message-corner-rounder-background: var(--sys-color-cdt-base-container);
}

.console-toolbar-container {
  display: flex;
  flex: none;
}

.console-main-toolbar {
  flex: 1 1 auto;
}

.console-toolbar-container > devtools-toolbar {
  background-color: var(--sys-color-cdt-base-container);
  border-bottom: 1px solid var(--sys-color-divider);
}

.console-view-fix-select-all {
  height: 0;
  overflow: hidden;
}

.console-settings-pane {
  display: grid;
  grid-template-columns: 50% 50%;
  flex: none;
  background-color: var(--sys-color-cdt-base-container);
  border-bottom: 1px solid var(--sys-color-divider);
}

#console-messages {
  flex: 1 1;
  overflow-y: auto;
  word-wrap: break-word;
  user-select: text;
  transform: translateZ(0);
  overflow-anchor: none;  /* Chrome-specific scroll-anchoring opt-out */
  background-color: var(--sys-color-cdt-base-container);
}

#console-prompt {
  clear: right;
  position: relative;
  margin: 0 22px 0 20px;
}

.console-prompt-editor-container {
  min-height: 21px;
}

.console-message,
.console-user-command {
  clear: right;
  position: relative;
  padding: 3px 22px 1px 0;
  margin-left: 24px;
  min-height: 17px;  /* Sync with ConsoleViewMessage.js */
  flex: auto;
  display: flex;
}

.console-message > * {
  flex: auto;
}

.console-timestamp {
  color: var(--sys-color-token-subtle);
  user-select: none;
  flex: none;
  margin-right: 5px;
}

.message-level-icon,
.command-result-icon {
  position: absolute;
  left: -17px;
  top: 2px;
  user-select: none;
}

.console-message-repeat-count {
  margin: 1.4px 0 0 10px;
  flex: none;
}

.repeated-message {
  margin-left: 4px;
}

.repeated-message .message-level-icon {
  display: none;
}

.console-message-stack-trace-toggle {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: -1px;
}

.console-error-level .repeated-message,
.console-warning-level .repeated-message,
.console-verbose-level .repeated-message,
.console-info-level .repeated-message {
  display: flex;
}

.console-info {
  color: var(--sys-color-token-subtle);
  font-style: italic;
  padding-bottom: 2px;
}

.console-group .console-group > .console-group-messages {
  margin-left: 16px;
}

.console-group-title.console-from-api {
  font-weight: bold;
}

.console-group-title .console-message {
  margin-left: 12px;
}

.expand-group-icon {
  user-select: none;
  flex: none;
  position: relative;
  left: 8px;
  top: 3px;
  margin-right: 2px;
}

.console-group-title .message-level-icon {
  display: none;
}

.console-message-repeat-count .expand-group-icon {
  position: static;
  color: var(--sys-color-cdt-base-container);
  margin-left: -1px;
}

.console-group {
  position: relative;
}

.console-message-wrapper {
  display: flex;
  flex-direction: column;
  margin: 4px;
  border-radius: 5px;

  /* Console ANSI color */
  --console-color-black: #000;
  --console-color-red: #a00;
  --console-color-green: #0a0;
  --console-color-yellow: #a50;
  --console-color-blue: #00a;
  --console-color-magenta: #a0a;
  --console-color-cyan: #0aa;
  --console-color-gray: #aaa;
  --console-color-darkgray: #555;
  --console-color-lightred: #f55;
  --console-color-lightgreen: #5f5;
  --console-color-lightyellow: #ff5;
  --console-color-lightblue: #55f;
  --console-color-ightmagenta: #f5f;
  --console-color-lightcyan: #5ff;
  --console-color-white: #fff;

  &:focus {
    background-color: var(--sys-color-tonal-container);

    & ::selection {
      background-color: var(--sys-color-state-focus-select);
    }
  }
}

.console-row-wrapper {
  display: flex;
  flex-direction: row;
}

.theme-with-dark-background .console-message-wrapper {
  /* Dark theme console ANSI color */
  --console-color-red: rgb(237 78 76);
  --console-color-green: rgb(1 200 1);
  --console-color-yellow: rgb(210 192 87);
  --console-color-blue: rgb(39 116 240);
  --console-color-magenta: rgb(161 66 244);
  --console-color-cyan: rgb(18 181 203);
  --console-color-gray: rgb(207 208 208);
  --console-color-darkgray: rgb(137 137 137);
  --console-color-lightred: rgb(242 139 130);
  --console-color-lightgreen: rgb(161 247 181);
  --console-color-lightyellow: rgb(221 251 85);
  --console-color-lightblue: rgb(102 157 246);
  --console-color-lightmagenta: rgb(214 112 214);
  --console-color-lightcyan: rgb(132 240 255);
}

.console-message-wrapper.console-warning-level + .console-message-wrapper,
.console-message-wrapper.console-error-level + .console-message-wrapper {
  & .console-message::before,
  & .console-user-command::before {
    display: none !important; /* stylelint-disable-line declaration-no-important */
  }
}

.console-message-wrapper:not(.console-error-level, .console-warning-level) {
  & .console-message::before,
  & .console-user-command::before {
    width: calc(100% - 25px);
    content: "";
    display: block;
    position: absolute;
    top: -2px;
    border-top: 1px solid var(--sys-color-divider);
  }

  &:first-of-type .console-message::before,
  &:first-of-type .console-user-command::before {
    display: none;
  }
}

.console-message-wrapper.console-adjacent-user-command-result:not(.console-error-level, .console-warning-level) {
  border-top-width: 0;
}

.console-message-wrapper:focus + .console-message-wrapper {
  border-top-color: transparent;
}

.console-message-wrapper.console-adjacent-user-command-result:not(.console-error-level, .console-warning-level):focus {
  border-top-width: 1px;
}

.console-message-wrapper.console-adjacent-user-command-result:not(.console-error-level, .console-warning-level):focus .console-message {
  padding-top: 2px;
  min-height: 16px;
}

.console-message-wrapper.console-adjacent-user-command-result:not(.console-error-level, .console-warning-level):focus .command-result-icon {
  top: 3px;
}

.console-message-wrapper .nesting-level-marker {
  width: 14px;
  flex: 0 0 auto;
  position: relative;
  margin-bottom: -1px;
  margin-top: -1px;
  background-color: var(--sys-color-cdt-base-container);
}

.console-message-wrapper .nesting-level-marker + .console-message::after {
  position: absolute;
  left: -30px;
  top: 0;
  width: 6px;
  height: 100%;
  box-sizing: border-box;
  background-color: var(--sys-color-surface-yellow);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  content: "";
}

.console-error-level {
  background-color: var(--sys-color-surface-error);

  --message-corner-rounder-background: var(--sys-color-surface-error);
}

.console-warning-level {
  background-color: var(--sys-color-surface-yellow);

  --message-corner-rounder-background: var(--sys-color-surface-yellow);
}

.console-view-object-properties-section {
  padding: 0;
  position: relative;
  vertical-align: baseline;
  color: inherit;
  display: inline-block;
  overflow-wrap: break-word;
  max-width: 100%;
}

.info-note {
  background-color: var(--sys-color-tonal-container);
}

.info-note::before {
  content: "i";
}

.console-view-object-properties-section:not(.expanded) .info-note {
  display: none;
}

.console-system-type.console-info-level {
  color: var(--sys-color-primary);
}

#console-messages .link {
  cursor: pointer;
  text-decoration: underline;
}

#console-messages .link,
#console-messages .devtools-link:not(.invalid-link) {
  color: var(--sys-color-primary);
  word-break: break-all;
}

#console-messages .devtools-link:focus-visible {
  background-color: transparent;
}

#console-messages .resource-links {
  margin-top: -1px;
  margin-bottom: -2px;
}

.console-object-preview {
  white-space: normal;
  word-wrap: break-word;
  font-style: italic;
}

.console-object-preview .name {
  flex-shrink: 0;
}

.console-message-text {
  .object-value-node {
    display: inline-block;
  }

  .object-value-string,
  .object-value-regexp,
  .object-value-symbol {
    white-space: pre-wrap;
    word-break: break-all;
  }

  .formatted-stack-frame:has(.ignore-list-link) {
    display: var(--display-ignored-formatted-stack-frame);
    opacity: 60%;

    /* Subsequent builtin stack frames are also treated as ignored */
    & + .formatted-builtin-stack-frame {
      display: var(--display-ignored-formatted-stack-frame);
      opacity: 60%;
    }
  }
}

.console-message-stack-trace-wrapper {
  --override-display-stack-preview-toggle-link: none;

  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  &:has(div > .stack-preview-container.show-hidden-rows) {
    --display-ignored-formatted-stack-frame: inherit;
  }

  &:has(.formatted-stack-frame .ignore-list-link):has(.formatted-stack-frame .devtools-link:not(.ignore-list-link)) {
    /* If there are ignored frames and unignored frames, then we want
    to enable the show more/less links. To do that we override some
    variables to always display the structured stack trace, but possibly
    only the links at the bottom of it, as we share its show more/less links. */
    --override-display-stack-preview-toggle-link: table-row;
    --override-display-stack-preview-hidden-div: block;

    &:not(:has(div > .stack-preview-container.show-hidden-rows)) {
      --display-ignored-formatted-stack-frame: none;
    }
  }

  & > .hidden-stack-trace {
    /* Always hide the body of the structured stack trace if this class
    is set, but we may still show it for the Show more/less links at the bottom. */
    display: var(--override-display-stack-preview-hidden-div, none);

    --override-display-stack-preview-tbody: none;
  }
}

.repeated-message .console-message-stack-trace-toggle,
.repeated-message > .console-message-text {
  flex: 1;
}

.console-warning-level .console-message-text {
  color: var(--sys-color-on-surface-yellow);
}

.console-error-level .console-message-text,
.console-error-level .console-view-object-properties-section {
  color: var(--override-error-text-color) !important; /* stylelint-disable-line declaration-no-important */
}

.console-message-formatted-table {
  clear: both;
}

.console-message .source-code {
  line-height: 1.2;
}

.console-message-anchor {
  float: right;
  text-align: right;
  max-width: 100%;
  margin-left: 4px;
}

.console-message-badge {
  float: right;
  margin-left: 4px;
}

.console-message-nowrap-below,
.console-message-nowrap-below div,
.console-message-nowrap-below span {
  white-space: nowrap !important; /* stylelint-disable-line declaration-no-important */
}

.object-state-note {
  display: inline-block;
  width: 11px;
  height: 11px;
  color: var(--sys-color-on-tonal-container);
  text-align: center;
  border-radius: 3px;
  line-height: 13px;
  margin: 0 6px;
  font-size: 9px;
}

.console-object {
  white-space: pre-wrap;
  word-break: break-all;
}

.console-message-stack-trace-wrapper > * {
  flex: none;
}

.console-message-expand-icon {
  margin-bottom: -4px;
}

.console-searchable-view {
  max-height: 100%;
}

.console-view-pinpane {
  flex: none;
  max-height: 50%;
}

/* We are setting width and height to 0px to essentially hide the html element on the UI but visible to the screen reader.
 This html element is used by screen readers when console messages are filtered, instead of screen readers reading
 contents of the filtered messages we only want the screen readers to read the count of filtered messages. */
.message-count {
  width: 0;
  height: 0;
}

devtools-console-insight {
  margin: 9px 22px 11px 24px;
}

.hover-button {
  --width: 24px;

  align-items: center;
  background-color: var(--sys-color-cdt-base-container);
  border-radius: 50%;
  border: none;
  /* todo: extract to global styles and make it work with dark mode. */
  box-shadow: 0 1px 3px 1px rgb(0 0 0 / 15%), 0 1px 2px 0 rgb(0 0 0 / 30%); /* stylelint-disable-line plugin/use_theme_colors */
  box-sizing: border-box;
  color: var(--sys-color-on-surface);
  font: var(--sys-typescale-body4-medium);
  height: var(--width);
  justify-content: center;
  margin: 0;
  max-height: var(--width);
  max-width: var(--width);
  min-height: var(--width);
  min-width: var(--width);
  overflow: hidden;
  padding: var(--sys-size-3) var(--sys-size-4);
  position: absolute;
  right: 6px;
  display: none;
  width: var(--width);
}

.hover-button:focus,
.hover-button:hover {
  border-radius: 4px;
  max-width: 200px;
  transition:
    max-width var(--sys-motion-duration-short4) var(--sys-motion-easing-emphasized),
    border-radius 50ms linear;
  width: fit-content;
  gap: var(--sys-size-3);
}

.hover-button:focus-visible {
  outline: 2px solid var(--sys-color-primary);
  outline-offset: 2px;
}

.hover-button devtools-icon {
  box-sizing: border-box;
  flex-shrink: 0;
  height: 16px;
  min-height: 16px;
  min-width: 16px;
  width: 16px;
}

.button-label {
  display: block;
  overflow: hidden;
  white-space: nowrap;

  & div {
    display: inline-block;
    vertical-align: -1px;
  }
}

.button-label .badge {
  background: linear-gradient(135deg, var(--sys-color-gradient-primary), var(--sys-color-gradient-tertiary));
  border-radius: var(--sys-size-3);
  font-size: 9px;
  font-weight: var(--ref-typeface-weight-bold);
  line-height: 9px;
  padding: var(--sys-size-3);
  margin-left: var(--sys-size-4);
  vertical-align: 0;
}

.console-message-wrapper:not(.has-insight) {
  &:hover,
  &:focus,
  &.console-selected {
    .hover-button {
      display: flex;

      &:focus,
      &:hover {
        display: inline-flex;
      }
    }
  }
}

@media (forced-colors: active) {
  .console-message-expand-icon,
  .console-warning-level .expand-group-icon {
    forced-color-adjust: none;
    color: ButtonText;
  }

  .console-message-wrapper:focus,
  .console-message-wrapper:focus:last-of-type {
    forced-color-adjust: none;
    background-color: Highlight;
    border-top-color: Highlight;
    border-bottom-color: Highlight;
  }

  .console-message-wrapper:focus *,
  .console-message-wrapper:focus:last-of-type *,
  .console-message-wrapper:focus .devtools-link,
  .console-message-wrapper:focus:last-of-type .devtools-link {
    color: HighlightText !important; /* stylelint-disable-line declaration-no-important */
  }

  #console-messages .devtools-link,
  #console-messages .devtools-link:hover {
    color: linktext;
  }

  #console-messages .link:focus-visible,
  #console-messages .devtools-link:focus-visible {
    background: Highlight;
    color: HighlightText;
  }

  .console-message-wrapper:focus devtools-icon {
    color: HighlightText;
  }

  .console-message-wrapper.console-error-level:focus,
  .console-message-wrapper.console-error-level:focus:last-of-type {
    --override-error-text-color: HighlightText;
  }
}

/*# sourceURL=consoleView.css */
`);

export default styles;
