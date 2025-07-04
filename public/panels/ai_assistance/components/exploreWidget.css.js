// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default `/*
 * Copyright 2025 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.ai-assistance-explore-container {
  &,
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto 0;
  font: var(--sys-typescale-headline4);
  gap: var(--sys-size-8);
  padding: var(--sys-size-3);
  overflow: auto;
  scrollbar-gutter: stable both-edges;

  .link {
    padding: 0;
    margin: 0 3px;
  }

  .header {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    justify-self: center;
    gap: var(--sys-size-4);

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--sys-size-14);
      width: var(--sys-size-14);
      border-radius: var(--sys-shape-corner-small);
      background: linear-gradient(
        135deg,
        var(--sys-color-gradient-primary),
        var(--sys-color-gradient-tertiary)
      );
    }

    h1 {
      font: var(--sys-typescale-headline4);
    }

    p {
      text-align: center;
      font: var(--sys-typescale-body4-regular);
    }

    .link {
      font: var(--sys-typescale-body4-regular);
    }
  }

  .content {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: var(--sys-size-5);
    align-items: center;
    justify-content: center;
    justify-self: center;
  }

  .feature-card {
    display: flex;
    padding: var(--sys-size-4) var(--sys-size-6);
    gap: 10px;
    background-color: var(--sys-color-surface2);
    border-radius: var(--sys-shape-corner-medium-small);
    width: 100%;
    align-items: center;

    .feature-card-icon {
      min-width: var(--sys-size-12);
      min-height: var(--sys-size-12);
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--sys-color-tonal-container);
      border-radius: var(--sys-shape-corner-full);

      devtools-icon {
        width: 18px;
        height: 18px;
      }
    }

    .feature-card-content {
      h3 {
        font: var(--sys-typescale-body3-medium);
      }

      p {
        font: var(--sys-typescale-body4-regular);
        line-height: 18px;
      }
    }
  }
}

.ai-assistance-explore-footer {
  flex-shrink: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: var(--sys-size-3);
  font: var(--sys-typescale-body5-regular);
  border-top: 1px solid var(--sys-color-divider);
  text-wrap: balance;
  text-align: center;

  p {
    margin: 0;
    padding: 0;
  }
}

/*# sourceURL=${import.meta.resolve('././components/exploreWidget.css')} */`;