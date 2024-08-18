// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// IMPORTANT: this file is auto generated. Please do not edit this file.
/* istanbul ignore file */
export default {
  cssContent: `/*
 * Copyright 2021 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

/**
* Design: http://go/cdt-design-button
*/
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/**
* Reset default UA styles for focused elements.
* The button styles below explicitly implement custom focus styles.
*/
*:focus,
*:focus-visible,
:host(:focus),
:host(:focus-visible) {
  outline: none;
}

:host {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
}

/* This specific nesting is incompatible with what stylelint requires as ordering of the rules. */
/* stylelint-disable no-descending-specificity */

button {
  --hover-layer-color: var(--sys-color-state-hover-on-subtle);
  --active-layer-color: var(--sys-color-state-ripple-neutral-on-subtle);
  --button-border-size: 1px;
  --button-height: var(--sys-size-11);
  --button-width: fit-content;

  align-items: center;
  background: transparent;
  border-radius: var(--sys-shape-corner-full);
  display: inline-flex;
  position: relative;
  font-size: var(--sys-typescale-body4-size);
  font-weight: var(--ref-typeface-weight-medium);
  line-height: var(--sys-typescale-body4-line-height);
  height: var(--button-height);
  justify-content: center;
  padding: 0 var(--sys-size-6);
  white-space: nowrap;
  width: var(--button-width);

  &.primary-toggle {
    --toggle-color: var(--sys-color-primary-bright);
  }

  &.red-toggle {
    --toggle-color: var(--sys-color-error-bright);
  }

  devtools-icon {
    width: var(--icon-size);
    height: var(--icon-size);
  }

  &.toolbar,
  &.icon,
  &.only-icon {
    --button-height: 26px;
    --button-width: 26px;
    --icon-size: var(--sys-size-9);

    padding: 0;
    border: none;
    overflow: hidden;

    &.small {
      --button-height: var(--sys-size-9);
      --button-width: var(--sys-size-9);
      --icon-size: var(--sys-size-8);
    }

    &.toggled devtools-icon {
      color: var(--toggle-color); /* stylelint-disable-line plugin/use_theme_colors */

      &.long-click {
        color: var(--icon-default);
      }
    }

    &.checked devtools-icon {
      color: var(--toggle-color); /* stylelint-disable-line plugin/use_theme_colors */

      &::after {
        content: "";
        width: var(--sys-size-3);
        height: var(--sys-size-3);
        border-radius: var(--sys-shape-corner-full);
        background-color: var(--sys-color-primary-bright);
        position: absolute;
        top: var(--dot-toggle-top);
        left: var(--dot-toggle-left);
      }
    }

    devtools-icon.long-click {
      position: absolute;
      top: 2px;
      left: 3px;
    }
  }

  &.primary {
    --hover-layer-color: var(--sys-color-state-hover-on-prominent);
    --active-layer-color: var(--sys-color-state-ripple-primary);

    border: var(--button-border-size) solid var(--sys-color-primary);
    background: var(--sys-color-primary);
    color: var(--sys-color-on-primary);

    devtools-icon {
      color: var(--sys-color-on-primary);
    }
  }

  &.tonal {
    border: none;
    background: var(--sys-color-tonal-container);
    color: var(--sys-color-on-tonal-container);

    devtools-icon {
      color: var(--sys-color-on-tonal-container);
    }
  }

  &.primary-toolbar {
    devtools-icon {
      color: var(--icon-primary);
    }
  }

  &.text {
    border: none;
    color: var(--sys-color-primary);

    devtools-icon {
      color: var(--icon-primary);
    }
  }

  &.text-with-icon {
    padding-left: var(--sys-size-4);

    devtools-icon {
      width: var(--sys-size-9);
      height: var(--sys-size-9);
      margin-right: var(--sys-size-2);
    }
  }

  &.outlined {
    border: var(--button-border-size) solid var(--sys-color-tonal-outline);
    background: transparent;
    color: var(--sys-color-primary);

    devtools-icon {
      color: var(--icon-primary);
    }

    &.micro {
      --button-height: var(--sys-size-7);

      padding: 0 var(--sys-size-5);
      font-size: var(--sys-typescale-body4-size);
      font-weight: var(--ref-typeface-weight-medium);
      line-height: var(--sys-typescale-body4-line-height);

      &:not(.icon):has(devtools-icon) {
        padding-left: var(--sys-size-3);
      }

      &:not(.icon) devtools-icon {
        height: var(--sys-size-6);
        width: var(--sys-size-6);
      }
    }
  }

  &:disabled {
    pointer-events: none;
    color: var(--sys-color-state-disabled);

    &.primary {
      border: var(--button-border-size) solid var(--sys-color-state-disabled-container);
      background: var(--sys-color-state-disabled-container);
    }

    &.tonal {
      border: var(--button-border-size) solid var(--sys-color-state-disabled-container);
      background: var(--sys-color-state-disabled-container);
    }

    &.outlined {
      border: var(--button-border-size) solid var(--sys-color-state-disabled-container);
    }

    &.toolbar,
    &.icon {
      background: transparent;
    }

    devtools-icon {
      color: var(--icon-disabled);
    }
  }

  &:not(.icon):not(.toolbar).only-icon {
    width: 100%;
    padding: 0;

    &.small {
      width: var(--button-height);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--sys-color-state-focus-ring);
    outline-offset: 2px;
    z-index: 1;

    &.toolbar,
    &.icon {
      outline-offset: -2px;
    }
  }

  &:has(.spinner) {
    padding-left: var(--sys-size-4);
  }

  &:hover::after {
    content: "";
    height: 100%;
    width: 100%;
    border-radius: inherit;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--hover-layer-color); /* stylelint-disable-line plugin/use_theme_colors */

    &.primary {
      border: var(--button-border-size) solid color-mix(in sRGB, var(--sys-color-primary), var(--sys-color-state-hover-on-prominent) 6%);
    }

    &.tonal {
      background: color-mix(in sRGB, var(--sys-color-tonal-container), var(--sys-color-state-hover-on-subtle));
    }

    &.toobar {
      devtools-icon {
        color: var(--icon-default-hover);
      }
    }
  }

  &:active::before,
  &.active::before {
    content: "";
    height: 100%;
    width: 100%;
    border-radius: inherit;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--active-layer-color); /* stylelint-disable-line plugin/use_theme_colors */

    &.primary {
      border: var(--button-border-size) solid color-mix(in sRGB, var(--sys-color-primary), var(--sys-color-state-ripple-primary) 32%);
    }

    &.tonal {
      background: color-mix(in sRGB, var(--sys-color-tonal-container), var(--sys-color-state-ripple-primary) 50%);
    }

    &.toolbar {
      devtools-icon {
        color: var(--icon-toggled);
      }
    }
  }
}
/* stylelint-enable no-descending-specificity */

.spinner {
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  border: 2px solid var(--sys-color-cdt-base-container);
  animation: spinner-animation 1s linear infinite;
  border-right-color: transparent;
  margin-right: 4px;

  &.outlined {
    border: 2px solid var(--sys-color-primary);
    border-right-color: transparent;
  }

  &.disabled {
    border: 2px solid var(--sys-color-state-disabled);
    border-right-color: transparent;
  }
}

@keyframes spinner-animation {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

/*# sourceURL=button.css */
`
};
