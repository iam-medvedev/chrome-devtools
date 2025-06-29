// gen/front_end/panels/common/common.prebundle.js
import * as Host from "./../../core/host/host.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as UI from "./../../ui/legacy/legacy.js";
import * as Lit from "./../../ui/lit/lit.js";

// gen/front_end/panels/common/common.css.js
var common_css_default = `/*
 * Copyright 2025 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */


.fre-disclaimer {
  width: var(--sys-size-33);
  padding: var(--sys-size-9);

  header {
    display: flex;
    gap: var(--sys-size-8);
    margin-bottom: var(--sys-size-6);
    align-items: center;

    h2 {
      margin: 0;
      color: var(--sys-color-on-surface);
      font: var(--sys-typescale-headline5);
    }

    .header-icon-container {
      background: linear-gradient(
        135deg,
        var(--sys-color-gradient-primary),
        var(--sys-color-gradient-tertiary)
      );
      border-radius: var(--sys-size-4);
      min-height: var(--sys-size-14);
      min-width: var(--sys-size-14);
      display: flex;
      align-items: center;
      justify-content: center;

      devtools-icon {
        width: var(--sys-size-9);
        height: var(--sys-size-9);
      }
    }
  }

  .reminder-container {
    border-radius: var(--sys-size-6);
    background-color: var(--sys-color-surface4);
    padding: var(--sys-size-9);

    h3 {
      color: var(--sys-color-on-surface);
      font: var(--sys-typescale-body4-medium);
      margin: 0;
    }

    .reminder-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--sys-size-5);
      margin-top: var(--sys-size-6);
      font: var(--sys-typescale-body5-regular);

      devtools-icon.reminder-icon {
        width: var(--sys-size-8);
        height: var(--sys-size-8);
      }

      .link {
        color: var(--sys-color-primary);
        text-decoration-line: underline;
      }
    }
  }

  footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: var(--sys-size-8);
    min-width: var(--sys-size-28);

    .right-buttons {
      display: flex;
      gap: var(--sys-size-5);
    }
  }
}

.type-to-allow-dialog {
  width: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    font: var(--sys-typescale-body2-medium);
    margin: var(--sys-size-5) var(--sys-size-5) var(--sys-size-5) var(--sys-size-8);
  }

  .title {
    padding-top: var(--sys-size-3);
  }

  .dialog-close-button {
    margin: var(--sys-size-3);
    z-index: 1;
  }

  .message,
  .text-input {
    margin: 0 var(--sys-size-8);
  }

  .text-input {
    margin-top: var(--sys-size-5);
  }

  .button {
    text-align: right;
    margin: var(--sys-size-6) var(--sys-size-8) var(--sys-size-8) var(--sys-size-8);
    gap: var(--sys-size-5);
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
  }

  .button button {
    min-width: var(--sys-size-19);
  }
}

/*# sourceURL=${import.meta.resolve("./common.css")} */`;

// gen/front_end/panels/common/common.prebundle.js
var { html } = Lit;
var UIStrings = {
  /**
   *@description Header text for the feature reminder dialog.
   */
  thingsToConsider: "Things to consider",
  /**
   *@description Text for the learn more button in the feature reminder dialog.
   */
  learnMore: "Learn more",
  /**
   *@description Text for the cancel button in the feature reminder dialog.
   */
  cancel: "Cancel",
  /**
   *@description Text for the cancel button in the "type to allow" dialog.
   */
  allow: "Allow",
  /**
   *@description Text for the got it button in the feature reminder dialog.
   */
  gotIt: "Got it"
};
var str_ = i18n.i18n.registerUIStrings("panels/common/common.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var FreDialog = class {
  static show({ header, reminderItems, onLearnMoreClick, ariaLabel, learnMoreButtonTitle }) {
    const dialog = new UI.Dialog.Dialog();
    if (ariaLabel) {
      dialog.setAriaLabel(ariaLabel);
    }
    const result = Promise.withResolvers();
    Lit.render(html`
      <div class="fre-disclaimer">
        <style>
          ${common_css_default}
        </style>
        <header>
          <div class="header-icon-container">
            <devtools-icon name=${header.iconName}></devtools-icon>
          </div>
          <h2 tabindex="-1">
            ${header.text}
          </h2>
        </header>
        <main class="reminder-container">
          <h3>${i18nString(UIStrings.thingsToConsider)}</h3>
          ${reminderItems.map((reminderItem) => html`
            <div class="reminder-item">
              <devtools-icon class="reminder-icon" name=${reminderItem.iconName}></devtools-icon>
              <span>${reminderItem.content}</span>
            </div>
          `)}
        </main>
        <footer>
          <devtools-button
            @click=${onLearnMoreClick}
            .jslogContext=${"fre-disclaimer.learn-more"}
            .variant=${"outlined"}>
            ${learnMoreButtonTitle ?? i18nString(UIStrings.learnMore)}
          </devtools-button>
          <div class="right-buttons">
            <devtools-button
              @click=${() => {
      result.resolve(false);
      dialog.hide();
    }}
              .jslogContext=${"fre-disclaimer.cancel"}
              .variant=${"tonal"}>
              ${i18nString(UIStrings.cancel)}
            </devtools-button>
            <devtools-button
              @click=${() => {
      result.resolve(true);
      dialog.hide();
    }}
              .jslogContext=${"fre-disclaimer.continue"}
              .variant=${"primary"}>
              ${i18nString(UIStrings.gotIt)}
            </devtools-button>
          </div>
        </footer>
      </div>`, dialog.contentElement);
    dialog.setOutsideClickCallback((ev) => {
      ev.consume(true);
      dialog.hide();
      result.resolve(false);
    });
    dialog.setOnHideCallback(() => {
      result.resolve(false);
    });
    dialog.setSizeBehavior(
      "MeasureContent"
      /* UI.GlassPane.SizeBehavior.MEASURE_CONTENT */
    );
    dialog.setDimmed(true);
    dialog.show();
    return result.promise;
  }
  constructor() {
  }
};
var TypeToAllowDialog = class {
  static async show(options) {
    const dialog = new UI.Dialog.Dialog(options.jslogContext.dialog);
    dialog.setMaxContentSize(new UI.Geometry.Size(504, 340));
    dialog.setSizeBehavior(
      "SetExactWidthMaxHeight"
      /* UI.GlassPane.SizeBehavior.SET_EXACT_WIDTH_MAX_HEIGHT */
    );
    dialog.setDimmed(true);
    const shadowRoot = UI.UIUtils.createShadowRootWithCoreStyles(dialog.contentElement, { cssFile: common_css_default });
    const content = shadowRoot.createChild("div", "type-to-allow-dialog");
    const result = await new Promise((resolve) => {
      const header = content.createChild("div", "header");
      header.createChild("div", "title").textContent = options.header;
      const closeButton = header.createChild("dt-close-button", "dialog-close-button");
      closeButton.setTabbable(true);
      self.onInvokeElement(closeButton, (event) => {
        dialog.hide();
        event.consume(true);
        resolve(false);
      });
      closeButton.setSize(
        "SMALL"
        /* Buttons.Button.Size.SMALL */
      );
      content.createChild("div", "message").textContent = options.message;
      const input = UI.UIUtils.createInput("text-input", "text", options.jslogContext.input);
      input.placeholder = options.inputPlaceholder;
      content.appendChild(input);
      const buttonsBar = content.createChild("div", "button");
      const cancelButton = UI.UIUtils.createTextButton(i18nString(UIStrings.cancel), () => resolve(false), { jslogContext: "cancel" });
      const allowButton = UI.UIUtils.createTextButton(i18nString(UIStrings.allow), () => {
        resolve(input.value === options.typePhrase);
      }, {
        jslogContext: "confirm",
        variant: "primary"
        /* Buttons.Button.Variant.PRIMARY */
      });
      allowButton.disabled = true;
      buttonsBar.appendChild(allowButton);
      buttonsBar.appendChild(cancelButton);
      input.addEventListener("input", () => {
        allowButton.disabled = !Boolean(input.value);
      }, false);
      input.addEventListener("paste", (e) => e.preventDefault());
      input.addEventListener("drop", (e) => e.preventDefault());
      dialog.setOutsideClickCallback((event) => {
        event.consume();
        resolve(false);
      });
      dialog.show();
      Host.userMetrics.actionTaken(Host.UserMetrics.Action.SelfXssWarningDialogShown);
    });
    dialog.hide();
    return result;
  }
};
export {
  FreDialog,
  TypeToAllowDialog
};
//# sourceMappingURL=common.js.map
