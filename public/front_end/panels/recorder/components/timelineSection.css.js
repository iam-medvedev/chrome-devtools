// Copyright 2023 The Chromium Authors. All rights reserved.
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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: inherit;
}

.timeline-section {
  position: relative;
  padding: 16px 0 16px 40px;
  margin-left: 8px;

  --override-color-recording-successful-text: #36a854;
  --override-color-recording-successful-background: #e6f4ea;
}

.overlay {
  position: absolute;
  width: 100vw;
  height: 100%;
  /* Offset of 32px for spacing and 80px for screenshot */
  left: calc(-32px - 80px);
  top: 0;
  z-index: -1;
  pointer-events: none;
}

/* stylelint-disable-next-line at-rule-no-unknown */
@container (max-width: 400px) {
  .overlay {
    /* Offset of 32px for spacing */
    left: -32px;
  }
}

:hover .overlay {
  background: var(--sys-color-state-hover-on-subtle);
}

.is-selected .overlay {
  background: var(--sys-color-tonal-container);
}

:host-context(.is-stopped) .overlay {
  background: var(--sys-color-state-ripple-primary);
  outline: 1px solid var(--sys-color-state-focus-ring);
  z-index: 4;
}

.is-start-of-group {
  padding-top: 28px;
}

.is-end-of-group {
  padding-bottom: 24px;
}

.icon {
  position: absolute;
  left: 4px;
  transform: translateX(-50%);
  z-index: 2;
}

.bar {
  position: absolute;
  left: 4px;
  display: block;
  transform: translateX(-50%);
  top: 18px;
  height: calc(100% + 8px);
  z-index: 1; /* We want this to be below of \\'.overlay\\' for stopped case */
}

.bar .background {
  fill: var(--sys-color-state-hover-on-subtle);
}

.bar .line {
  fill: var(--sys-color-primary);
}

.is-first-section .bar {
  top: 32px;
  height: calc(100% - 8px);
  display: none;
}

.is-first-section:not(.is-last-section) .bar {
  display: block;
}

.is-last-section .bar .line {
  display: none;
}

.is-last-section .bar .background {
  display: none;
}

:host-context(.is-error) .bar .line {
  fill: var(--sys-color-error);
}

:host-context(.is-error) .bar .background {
  fill: var(--sys-color-error-container);
}

:host-context(.was-successful) .bar .background {
  animation: flash-background 2s;
}

:host-context(.was-successful) .bar .line {
  animation: flash-line 2s;
}

@keyframes flash-background {
  25% {
    fill: var(--override-color-recording-successful-background);
  }

  75% {
    fill: var(--override-color-recording-successful-background);
  }
}

@keyframes flash-line {
  25% {
    fill: var(--override-color-recording-successful-text);
  }

  75% {
    fill: var(--override-color-recording-successful-text);
  }
}

/*# sourceURL=timelineSection.css */
`);

export default styles;
