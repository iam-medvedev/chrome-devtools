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

:host {
    position: fixed;
    bottom: var(--sys-size-5);
    left: var(--sys-size-5);
    z-index: 9999;
    /* subtract var(--sys-size-5) * 2 so that there is equal space on the left and on the right in small screens */
    max-width: calc(100% - 2 * var(--sys-size-5));

    .container {
        display: flex;
        align-items: center;
        overflow: hidden;
        width: var(--sys-size-31);
        padding: var(--sys-size-6);
        background: var(--sys-color-inverse-surface);
        box-shadow: var(--sys-elevation-level3);
        border-radius: var(--sys-shape-corner-small);
        font: var(--sys-typescale-body4-medium);
        animation: slideIn 100ms cubic-bezier(0, 0, 0.3, 1);
        box-sizing: border-box;
        max-width: 100%;

        &.closable {
            padding: var(--sys-size-5) var(--sys-size-5) var(--sys-size-5) var(--sys-size-6);

            &.long-action {
                padding: var(--sys-size-5) var(--sys-size-6) var(--sys-size-6) var(--sys-size-6);
            }
        }

        &.long-action {
            flex-direction: column;
            align-items: flex-start;

            .long-action-container {
                margin-left: auto;
            }
        }

        .label-container {
            display: flex;
            width: 100%;
            align-items: center;
            gap: var(--sys-size-5);

            .message {
                width: 100%;
                color: var(--sys-color-inverse-on-surface);
                flex: 1 0 0;
                text-wrap: pretty;
                user-select: text;
            }
        }

        devtools-button.dismiss {
            padding: 3px;
        }
    }
}

 @keyframes slideIn {
    from {
        transform: translateY(var(--sys-size-5));
        opacity: 0%;
    }

    to {
        opacity: 100%;
    }
}

/*# sourceURL=${import.meta.resolve('./snackbar.css')} */`;