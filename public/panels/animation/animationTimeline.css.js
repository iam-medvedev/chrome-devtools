// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
const styles = new CSSStyleSheet();
styles.replaceSync(
`/*
 * Copyright (c) 2015 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  overflow: hidden;

  --timeline-controls-width: 150px;
}

.animation-node-row {
  width: 100%;
  display: flex;
  border-bottom: 1px dashed var(--sys-color-divider);
}

.animation-node-description {
  padding-left: 8px;
  overflow: hidden;
  position: relative;
  background-color: var(--sys-color-cdt-base-container);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  white-space: nowrap;
  flex: 0 0 var(--timeline-controls-width);
}

.animation-node-description > * {
  flex: 0 0 auto;
}

.animation-timeline-row {
  height: 32px;
  position: relative;
}

path.animation-keyframe {
  fill-opacity: 0.2;
}

.animation-node-selected path.animation-keyframe,
svg.animation-ui g:first-child:hover path.animation-keyframe {
  fill-opacity: 0.4;
}

line.animation-line {
  stroke-width: 2px;
  stroke-linecap: round;
  fill: none;
}

line.animation-delay-line {
  stroke-width: 2px;
  stroke-dasharray: 6, 4;
}

line.animation-delay-line.animation-fill {
  stroke-dasharray: none;
}

circle.animation-keyframe-point {
  fill: var(--sys-color-cdt-base-container);
}

circle.animation-endpoint,
circle.animation-keyframe-point {
  stroke-width: 2px;
  transition: transform 100ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale(1);
  transform-box: fill-box;
  transform-origin: 50% 50%;
}

circle.animation-endpoint:active,
circle.animation-keyframe-point:active {
  transform: scale(1);
}

.animation-ui circle.animation-endpoint:hover,
.animation-ui circle.animation-keyframe-point:hover {
  transform: scale(1.2);
}

.animation-name {
  position: absolute;
  top: 8px;
  color: var(--sys-color-on-surface);
  text-align: center;
  margin-left: -8px;
  white-space: nowrap;
}

.animation-timeline-toolbar-container {
  display: flex;
  background-color: var(--sys-color-cdt-base-container);
  border-bottom: 1px solid var(--sys-color-divider);
  flex: 0 0 auto;
}

.animation-timeline-toolbar {
  display: inline-block;
}

.animation-timeline-header {
  height: 28px;
  border-bottom: 1px solid var(--sys-color-divider);
  flex-shrink: 0;
  display: flex;
}

.animation-timeline-header::after {
  content: "";
  height: calc(100% - 48px - 28px);
  position: absolute;
  width: var(--timeline-controls-width);
  left: 0;
  margin-top: 28px;
  background-color: var(--sys-color-cdt-base-container);
  z-index: 0;
  border-right: 1px solid var(--sys-color-divider);
}

.animation-controls {
  flex: 0 0 var(--timeline-controls-width);
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding-right: 8px;
}

.animation-timeline-current-time {
  flex: 0 0 auto;
  line-height: 28px;
  margin-right: 5px;
}

.animation-grid-header {
  flex: 1 0 auto;
  z-index: 2;
}

.animation-grid-header.has-selected-group {
  cursor: pointer;
}

.animation-timeline-buffer,
.animation-timeline-buffer-hint {
  height: 48px;
  flex: 0 0 auto;
  border-bottom: 1px solid var(--sys-color-divider);
  display: flex;
  padding: 0 2px;
}

.animation-timeline-buffer:empty,
.animation-timeline-buffer-hint {
  display: none;
}

.animation-timeline-buffer:empty ~ .animation-timeline-buffer-hint {
  align-items: center;
  justify-content: center;
  font-size: 14px;
  z-index: 101;
  display: flex;
}

.animation-time-overlay {
  background-color: var(--sys-color-on-surface);
  opacity: 5%;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
}

.animation-timeline-end > .animation-time-overlay {
  visibility: hidden;
}

.animation-scrubber {
  opacity: 100%;
  position: absolute;
  left: 10px;
  height: 100%;
  width: 100%;
  top: 28px;
  border-left: 1px solid var(--sys-color-error);
  z-index: 2;
}

.animation-scrubber-line {
  width: 11px;
  background: linear-gradient(to right, transparent 5px, var(--sys-color-error) 5px, var(--sys-color-error) 6px, transparent 6px);
  position: absolute;
  top: -28px;
  height: 28px;
  left: -6px;
  padding: 0 5px;
  z-index: 3;
}

.animation-scrubber-head {
  width: 7px;
  height: 7px;
  transform: rotate(45deg);
  background: var(--sys-color-error);
  position: absolute;
  left: 2px;
  top: 1px;
  z-index: 4;
}

.grid-overflow-wrapper {
  position: absolute;
  left: calc(var(--timeline-controls-width) - 10px);
  top: 76px;
  z-index: 1;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

svg.animation-timeline-grid {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

rect.animation-timeline-grid-line {
  fill: var(--sys-color-divider);
}

.animation-timeline-row > svg.animation-ui {
  position: absolute;
}

.animation-node-timeline {
  flex-grow: 1;
}

.animation-node-description > div {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  max-height: 100%;
}

.animation-node-removed {
  filter: saturate(0);
  cursor: not-allowed;
}

svg.animation-ui g:first-child {
  opacity: 100%;
}

svg.animation-ui circle:focus-visible,
svg.animation-ui path:focus-visible {
  outline: 2px solid -webkit-focus-ring-color;
}

.animation-tail-iterations {
  opacity: 50%;
}

.animation-keyframe-step line {
  stroke-width: 2;
  stroke-opacity: 0.3;
}

text.animation-timeline-grid-label {
  font-size: 10px;
  fill: var(--sys-color-token-subtle);
  text-anchor: middle;
}

.animation-timeline-rows,
.animation-timeline-rows-hint {
  flex-grow: 1;
  overflow-y: auto;
  z-index: 1;
  overflow-x: hidden;
}

.animation-timeline-rows-hint {
  display: none;
}

.animation-timeline-buffer:not(:empty) ~ .animation-timeline-rows:empty {
  flex-grow: 0;
}

.animation-timeline-buffer:not(:empty) ~ .animation-timeline-rows:empty ~ .animation-timeline-rows-hint {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: var(--timeline-controls-width);
  padding: 10px;
}

.toolbar.animation-controls-toolbar {
  flex: 0 0 auto;
}

.animation-node-row.animation-node-selected {
  background-color: var(--sys-color-state-ripple-primary);
}

.animation-node-selected > .animation-node-description {
  background-color: var(--sys-color-tonal-container);
}

.animation-buffer-preview {
  height: 40px;
  margin: 4px 2px;
  background-color: var(--sys-color-neutral-container);
  border: 1px solid transparent;
  border-radius: 2px;
  flex: 1 1;
  padding: 4px;
  max-width: 100px;
  animation: newGroupAnim 200ms;
  position: relative;
}

.animation-buffer-preview-animation {
  width: 100%;
  height: 100%;
  border-radius: 2px 0 0 2px;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--sys-color-tonal-container);
  opacity: 0%;
  border-right: 1px solid var(--sys-color-divider);
}

.animation-buffer-preview:focus-visible {
  outline: -webkit-focus-ring-color auto 5px;
}

.animation-buffer-preview:not(.selected):focus-visible,
.animation-buffer-preview:not(.selected):hover {
  background-color: var(--sys-color-surface-variant);
}

.animation-buffer-preview.selected {
  background-color: var(--sys-color-tonal-container);
}

.animation-paused {
  align-items: center;
  justify-content: center;
  display: none;
}

.animation-paused::before,
.animation-paused::after {
  content: "";
  background: var(--sys-color-cdt-base-container);
  width: 7px;
  height: 20px;
  border-radius: 2px;
  margin: 2px;
  border: 1px solid var(--sys-color-divider);
}

.animation-buffer-preview.paused .animation-paused {
  display: flex;
}

.animation-buffer-preview > svg > line {
  stroke-width: 1px;
}

.animation-buffer-preview.selected > svg > line {
  stroke: var(--sys-color-on-tonal-container) !important; /* stylelint-disable-line declaration-no-important */
}

@keyframes newGroupAnim {
  from {
    clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%);
  }

  to {
    clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%);
  }
}

.animation-playback-rate-control {
  margin: 4px 0 4px 2px;
  display: flex;
  width: 120px;
}

.animation-playback-rate-button {
  border: 1px solid var(--sys-color-tonal-outline);
  color: var(--sys-color-on-surface);
  display: inline-block;
  margin-right: -1px;
  padding: 1px 4px;
  background-color: transparent;
  flex: 1 0 auto;
  text-align: center;
}

.animation-playback-rate-button:first-child {
  border-radius: 4px 0 0 4px;
}

.animation-playback-rate-button:last-child {
  border-radius: 0 4px 4px 0;
}

.animation-playback-rate-button.selected {
  color: var(--sys-color-on-tonal-container);
  background-color: var(--sys-color-tonal-container);
  border-color: var(--sys-color-tonal-container);
  z-index: 1;
}

.animation-playback-rate-button.selected:focus-visible {
  color: var(--sys-color-on-surface);
}

.animation-playback-rate-button:focus-visible {
  outline: 2px solid var(--sys-color-primary);
  outline-offset: 2px;
}

.animation-playback-rate-button:not(.selected):hover {
  background: var(--sys-color-state-hover-on-subtle);
}

.animation-remove-button {
  position: absolute;
  top: -3px;
  right: -3px;
  background: var(--sys-color-token-subtle);
  border-radius: 12px;
  height: 16px;
  width: 16px;
  align-items: center;
  font-size: 10px;
  justify-content: center;
  z-index: 100;
  display: none;
  font-weight: 700;
  color: var(--sys-color-cdt-base-container);
}

.animation-remove-button:hover {
  background: var(--sys-color-on-surface);
}

.animation-buffer-preview:hover .animation-remove-button {
  display: flex;
}

.timeline-controls-resizer {
  position: absolute;
  width: 6px;
  height: 100%;
  left: var(--timeline-controls-width);
  top: 104px;
  z-index: 3;
  /* We put this a bit to the left of the line to allow dragging
  the delay point of the keyframes */
  margin-left: -4px;
}

@media (forced-colors: active) {
  .animation-playback-rate-button.selected,
  .animation-playback-rate-button.selected:first-child,
  .animation-playback-rate-button.selected:first-child:focus-visible,
  .animation-playback-rate-button:focus-visible {
    forced-color-adjust: none;
    color: HighlightText;
    background-color: Highlight;
  }

  .animation-node-description:focus-visible {
    background-color: var(--sys-color-cdt-base-container);
    forced-color-adjust: none;
  }

  .monospace {
    forced-color-adjust: auto;
  }
}

/*# sourceURL=animationTimeline.css */
`);

export default styles;
