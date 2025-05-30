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

.combined-diff-view {
  display: flex;
  flex-direction: column;
  gap: var(--sys-size-5);
  height: 100%;
  background-color: var(--sys-color-surface3);
  overflow: auto;

  details {
    flex-shrink: 0;
    border-radius: 12px;

    &.selected {
      outline: var(--sys-size-2) solid var(--sys-color-divider-on-tonal-container);
    }

    summary {
      background-color: var(--sys-color-surface1);
      border-radius: var(--sys-shape-corner-medium-small);
      height: var(--sys-size-12);
      padding: var(--sys-size-3);
      font: var(--sys-typescale-body5-bold);
      display: flex;
      justify-content: space-between;
      gap: var(--sys-size-2);

      &:focus-visible {
        outline: var(--sys-size-2) solid var(--sys-color-state-focus-ring);
        /* Prevents outline clipping by drawing it inside the element's bounds instead of outside. */
        outline-offset: calc(-1 * var(--sys-size-2));
      }

      .summary-left {
        display: flex;
        align-items: center;
        min-width: 0;
        flex-grow: 0;

        .file-name-link {
          margin-left: var(--sys-size-5);
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          text-wrap-mode: nowrap;
          border: none;
          background: none;
          font: inherit;
          padding: 0;

          &:hover {
            color: var(--sys-color-primary);
            text-decoration: underline;
            cursor: pointer;
          }

          &:focus-visible {
            outline: var(--sys-size-2) solid var(--sys-color-state-focus-ring);
            outline-offset: var(--sys-size-2);
          }
        }

        devtools-icon {
          transform: rotate(270deg);
        }

        devtools-file-source-icon {
          height: var(--sys-size-8);
          width: var(--sys-size-8);
          flex-shrink: 0;
        }
      }

      .summary-right {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        gap: var(--sys-size-2);
        padding-right: var(--sys-size-4);

        .copied {
          font: var(--sys-typescale-body5-regular);
        }
      }

      &::marker {
        content: '';
      }
    }

    .diff-view-container {
      overflow-x: auto;
      background-color: var(--sys-color-cdt-base-container);
      border-bottom-left-radius: var(--sys-shape-corner-medium-small);
      border-bottom-right-radius: var(--sys-shape-corner-medium-small);
    }

    &[open] {
      summary {
        border-radius: 0;
        border-top-left-radius: var(--sys-shape-corner-medium-small);
        border-top-right-radius: var(--sys-shape-corner-medium-small);

        devtools-icon {
          transform: rotate(0deg);
        }
      }
    }
  }
}

/*# sourceURL=${import.meta.resolve('./combinedDiffView.css')} */`;