// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2017 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.watch-expression-delete-button {
  position: absolute;
  opacity: 0%;
  right: 0;

  .watch-expression-title:hover & {
    opacity: 100%;
  }

  .watch-expression-title:focus-within & {
    opacity: 100%;
  }
}

:host-context(.-theme-with-dark-background) .watch-expression-delete-button {
  /* This is a workaround due to a sprite with hardcoded color.
     It should no longer be necessary after we update icons. */
  filter: brightness(1.5);
}

.watch-expressions {
  min-height: 26px;
}

.watch-expression-title {
  white-space: nowrap;
  line-height: 20px;
  display: flex;
}

.watch-expression-title:hover {
  padding-right: 26px;
}

.watch-expression-object-header .watch-expression-title {
  margin-left: 1px;
}

.watch-expression {
  position: relative;
  flex: auto;
  min-height: 20px;
}

.watch-expression .name {
  color: var(--sys-color-purple);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex-shrink: 1000000;
  min-width: 2em;
}

.watch-expression-error {
  color: var(--sys-color-error);
}

.watch-expressions-separator {
  flex-shrink: 0;
  flex-grow: 0;
}

.watch-expression .value {
  white-space: nowrap;
  display: inline;
  overflow: hidden;
  padding-left: 4px;
  text-overflow: ellipsis;
  flex-shrink: 1;
}

.watch-expression .text-prompt {
  text-overflow: clip;
  overflow: hidden;
  white-space: nowrap;
  padding-left: 4px;
  min-height: 18px;
  line-height: 18px;
  user-select: text;
}

.watch-expression-text-prompt-proxy {
  margin: 2px 12px 2px -4px;
  padding-bottom: 3px;
}

.watch-expression-header {
  flex: auto;
  margin-left: -16px;
  padding-left: 15px;
}

li.watch-expression-tree-item {
  padding-left: 4px;
}

li.watch-expression-tree-item.selected {
  background: var(--sys-color-neutral-container);
}

li.watch-expression-tree-item.selected:focus {
  background: var(--sys-color-tonal-container);
}

li.watch-expression-tree-item.selected:focus-within:focus-visible {
  background: var(--sys-color-tonal-container);
}

.watch-expression-header:focus-visible {
  background: var(--sys-color-tonal-container);
}

li.watch-expression-editing::before {
  background-color: transparent;
}

@media (forced-colors: active) {
  .watch-expression-title:hover .watch-expression-delete-button,
  .watch-expressions .dimmed {
    opacity: 100%;
  }

  li.watch-expression-tree-item * {
    forced-color-adjust: none;
    color: ButtonText;
  }

  li.watch-expression-tree-item:hover {
    forced-color-adjust: none;
    background-color: Highlight;
  }

  li.watch-expression-tree-item:hover * {
    color: HighlightText;
  }

  li.watch-expression-tree-item:hover .watch-expression-delete-button {
    background-color: HighlightText;
  }
}

/*# sourceURL=watchExpressionsSidebarPane.css */
`);

export default styles;
