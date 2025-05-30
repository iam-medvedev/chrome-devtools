// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default `/*
 * Copyright 2017 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.chart-viewport-v-scroll {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  z-index: 200;
  padding-left: 1px;
}

.chart-viewport-v-scroll.always-show-scrollbar {
  overflow-y: scroll;
}
/* force non overlay scrollbars for Mac */

:host-context(.platform-mac) .chart-viewport-v-scroll {
  right: 2px;
  top: 3px;
  bottom: 3px;
}

:host-context(.platform-mac) ::-webkit-scrollbar {
  width: 8px;
}

:host-context(.platform-mac) ::-webkit-scrollbar-thumb {
  background-color: var(--color-scrollbar-mac);
  border-radius: 50px;
}

:host-context(.platform-mac) .chart-viewport-v-scroll:hover::-webkit-scrollbar-thumb {
  background-color: var(--color-scrollbar-mac-hover);
}
/* force non overlay scrollbars for Aura Overlay Scrollbar enabled */

:host-context(.overlay-scrollbar-enabled) ::-webkit-scrollbar {
  width: 10px;
}

:host-context(.overlay-scrollbar-enabled) ::-webkit-scrollbar-thumb {
  background-color: var(--color-scrollbar-other);
}

:host-context(.overlay-scrollbar-enabled) .chart-viewport-v-scroll:hover::-webkit-scrollbar-thumb {
  background-color: var(--color-scrollbar-other-hover);
}

.chart-viewport-selection-overlay {
  position: absolute;
  z-index: 100;
  background-color: var(--sys-color-state-ripple-primary);
  border-color: var(--sys-color-primary);
  border-width: 0 1px;
  border-style: solid;
  pointer-events: none;
  top: 0;
  bottom: 0;
  text-align: center;
}

.chart-viewport-selection-overlay .time-span {
  white-space: nowrap;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}

/*# sourceURL=${import.meta.resolve('./chartViewport.css')} */`;