// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default `/*
 * Copyright 2024 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

* {
  box-sizing: border-box;
}

:host {
  container-type: inline-size;
  container-name: ai-settings;
}

.shared-disclaimer {
  background: linear-gradient(135deg, var(--sys-color-gradient-primary), var(--sys-color-gradient-tertiary));
  border-radius: var(--sys-size-5);
  padding: var(--sys-size-9) var(--sys-size-11);
  max-width: var(--sys-size-35);
  min-width: var(--sys-size-28);

  h2 {
    font: var(--sys-typescale-headline5);
    margin: 0 0 var(--sys-size-6);
  }
}

.disclaimer-list-header {
  font: var(--sys-typescale-body5-medium);
  margin: 0;
}

.disclaimer-list {
  padding: var(--sys-size-6) 0 0;
  display: grid;
  grid-template-columns: var(--sys-size-12) auto;
  gap: var(--sys-size-6) 0;
  line-height: var(--sys-typescale-body5-line-height);
}

.settings-container {
  display: grid;
  grid-template-columns: 1fr auto auto;
  border-radius: var(--sys-size-5);
  box-shadow: var(--sys-elevation-level2);
  margin: var(--sys-size-11) 0 var(--sys-size-4);
  line-height: var(--sys-typescale-body5-line-height);
  min-width: var(--sys-size-28);
  max-width: var(--sys-size-35);
  background-color: var(--app-color-card-background);
}

.accordion-header {
  display: grid;
  grid-template-columns: auto 1fr auto;

  &:hover {
    background-color: var(--sys-color-state-hover-on-subtle);
  }
}

.icon-container,
.dropdown {
  padding: 0 var(--sys-size-8);
}

.toggle-container {
  padding: 0 var(--sys-size-8) 0 var(--sys-size-9);

  &:hover {
    background-color: var(--sys-color-state-hover-on-subtle);
  }
}

.expansion-grid {
  padding: var(--sys-size-4) var(--sys-size-8) var(--sys-size-6);
  display: grid;
  grid-template-columns: var(--sys-size-9) auto;
  gap: var(--sys-size-6) var(--sys-size-8);
  line-height: var(--sys-typescale-body5-line-height);
  color: var(--sys-color-on-surface-subtle);
}

.expansion-grid-whole-row {
  grid-column: span 2;
  font-weight: var(--ref-typeface-weight-medium);
  color: var(--sys-color-on-surface);
  padding-top: var(--sys-size-4);
  margin: 0;
  font-size: inherit;
}

.setting-description {
  color: var(--sys-color-on-surface-subtle);
}

.centered {
  display: grid;
  place-content: center;
}

.setting-card {
  padding: var(--sys-size-6) 0;

  h2 {
    margin: 0;
    font: inherit;
  }
}

.divider {
  margin: var(--sys-size-5) 0;
  border-left: var(--sys-size-1) solid var(--sys-color-divider);
}

.accordion-header ~ .accordion-header,
.divider ~ .divider,
.toggle-container ~ .toggle-container {
  border-top: var(--sys-size-1) solid var(--sys-color-divider);
}

.whole-row {
  grid-column: span 5;
  overflow: hidden;
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--sys-motion-duration-short4) ease-in;
}

.whole-row.open {
  grid-template-rows: 1fr;
}

.overflow-hidden {
  overflow: hidden;
}

.link,
.devtools-link {
  color: var(--sys-color-primary);
  text-decoration: underline;
  cursor: pointer;
  outline-offset: var(--sys-size-2);
  padding: 0;
  font-weight: var(--ref-typeface-weight-regular);
}

.padded {
  padding: var(--sys-size-2) 0;
}

.settings-container-wrapper {
  position: absolute;
  inset: var(--sys-size-8) 0 0;
  overflow: auto;
  padding: var(--sys-size-3) var(--sys-size-6) var(--sys-size-6);
  display: flex;
  flex-direction: column;
}

@container ai-settings (min-width: 480px) {
  .settings-container-wrapper {
    align-items: center;
  }
}

header {
  font-size: var(--sys-typescale-headline3-size);
  font-weight: var(--ref-typeface-weight-regular);
}

.disabled-explainer {
  background-color: var(--sys-color-surface-yellow);
  border-radius: var(--sys-shape-corner-medium-small);
  margin-top: var(--sys-size-11);
  padding: var(--sys-size-6) var(--sys-size-11) var(--sys-size-8);
  width: 100%;
  max-width: var(--sys-size-35);
  min-width: var(--sys-size-28);
  color: var(--sys-color-yellow);
}

.disabled-explainer-row {
  display: flex;
  gap: var(--sys-size-6);
  margin-top: var(--sys-size-4);
}

/*# sourceURL=${import.meta.resolve('./aiSettingsTab.css')} */`;