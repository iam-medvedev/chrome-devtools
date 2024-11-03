// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright 2023 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  height: var(--sys-size-9);
  width: 100%;
  display: block;
}

.show {
  display: block;
  font-size: 12px;
  color: var(--sys-color-on-surface);
  height: 100%;
  width: 100%;
  border: none;
  border-radius: var(--sys-shape-corner-extra-small);
  padding: 0 var(--sys-size-4) 0 var(--sys-size-5);

  &:hover {
    background-color: var(--sys-color-state-hover-on-subtle);
  }

  &:active {
    background-color: var(--sys-color-state-ripple-neutral-on-subtle);
  }

  &:hover:active {
    background:
      linear-gradient(var(--sys-color-state-hover-on-subtle), var(--sys-color-state-hover-on-subtle)),
      linear-gradient(var(--sys-color-state-ripple-neutral-on-subtle), var(--sys-color-state-ripple-neutral-on-subtle));
  }

  &:focus-visible {
    outline: var(--sys-size-2) solid var(--sys-color-state-focus-ring);
    outline-offset: -1px;
  }
}

#button-label-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

#label {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: fit-content;
  height: 100%;
}

#label[witharrow].single-arrow {
  padding: 0;
}

#label[witharrow] {
  padding: 0 10px 0 0;
  text-align: left;
}

.single-arrow + span#arrow {
  margin: 0;
}

#arrow {
  mask-image: var(--deploy-menu-arrow);
  -webkit-mask-position-y: center;
  margin-left: 5px;
  width: 14px;
  flex-shrink: 0;
  height: 14px;
  display: inline-block;
  mask-repeat: no-repeat;
  background-color: var(--sys-color-on-surface-subtle);
}

.single-arrow {
  border-radius: 0 3px 3px 0;
  border: var(--sys-size-1) solid var(--sys-color-neutral-outline);
  height: 100%;
  aspect-ratio: 1 / 1;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  background: none;
}

button[disabled] {
  color: var(--sys-color-state-disabled);
  background-color: var(--sys-color-state-disabled-container);

  #arrow {
    background-color: var(--sys-color-state-disabled);
  }
}

/*# sourceURL=selectMenuButton.css */
`);

export default styles;
