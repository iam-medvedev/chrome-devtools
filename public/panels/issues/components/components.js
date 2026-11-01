var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../../front_end/panels/issues/components/ElementsPanelLink.ts
var ElementsPanelLink_exports = {};
__export(ElementsPanelLink_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW,
  ElementsPanelLink: () => ElementsPanelLink
});
import * as UI from "../../../ui/legacy/legacy.js";
import { html, render } from "../../../ui/lit/lit.js";
import * as VisualLogging from "../../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/issues/components/elementsPanelLink.css.js
var elementsPanelLink_css_default = `/*
 * Copyright 2021 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

@scope to (devtools-widget > *) {
  .element-reveal-icon {
    display: inline-block;
    width: var(--sys-size-9);
    height: var(--sys-size-9);
    mask-image: var(--image-file-select-element);
    background-color: var(--icon-default);
    border: none;
    padding: 0;
  }
}

/*# sourceURL=${import.meta.resolve("././elementsPanelLink.css")} */`;

// ../../front_end/panels/issues/components/ElementsPanelLink.ts
var DEFAULT_VIEW = (input, _output, target) => {
  render(html`
    <style>${elementsPanelLink_css_default}</style>
    <button
      class="element-reveal-icon"
      jslog=${VisualLogging.link("elements-panel").track({ click: true })}
      @click=${input.onElementRevealIconClick}
      @mouseenter=${input.onElementRevealIconMouseEnter}
      @mouseleave=${input.onElementRevealIconMouseLeave}></button>
    `, target);
};
var ElementsPanelLink = class extends UI.Widget.Widget {
  #onElementRevealIconClick = () => {
  };
  #onElementRevealIconMouseEnter = () => {
  };
  #onElementRevealIconMouseLeave = () => {
  };
  #view;
  constructor(element, view = DEFAULT_VIEW) {
    super(element);
    this.#view = view;
  }
  wasShown() {
    super.wasShown();
    this.requestUpdate();
  }
  set onElementRevealIconClick(onElementRevealIconClick) {
    if (this.#onElementRevealIconClick === onElementRevealIconClick) {
      return;
    }
    this.#onElementRevealIconClick = onElementRevealIconClick;
    this.requestUpdate();
  }
  set onElementRevealIconMouseEnter(onElementRevealIconMouseEnter) {
    if (this.#onElementRevealIconMouseEnter === onElementRevealIconMouseEnter) {
      return;
    }
    this.#onElementRevealIconMouseEnter = onElementRevealIconMouseEnter;
    this.requestUpdate();
  }
  set onElementRevealIconMouseLeave(onElementRevealIconMouseLeave) {
    if (this.#onElementRevealIconMouseLeave === onElementRevealIconMouseLeave) {
      return;
    }
    this.#onElementRevealIconMouseLeave = onElementRevealIconMouseLeave;
    this.requestUpdate();
  }
  set data(data) {
    this.onElementRevealIconClick = data.onElementRevealIconClick;
    this.onElementRevealIconMouseEnter = data.onElementRevealIconMouseEnter;
    this.onElementRevealIconMouseLeave = data.onElementRevealIconMouseLeave;
  }
  performUpdate() {
    this.#view(
      {
        onElementRevealIconClick: this.#onElementRevealIconClick,
        onElementRevealIconMouseEnter: this.#onElementRevealIconMouseEnter,
        onElementRevealIconMouseLeave: this.#onElementRevealIconMouseLeave
      },
      void 0,
      this.contentElement
    );
  }
};

// ../../front_end/panels/issues/components/HideIssuesMenu.ts
var HideIssuesMenu_exports = {};
__export(HideIssuesMenu_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW2,
  HideIssuesMenu: () => HideIssuesMenu
});
import * as Common from "../../../core/common/common.js";
import * as i18n from "../../../core/i18n/i18n.js";
import * as Buttons from "../../../ui/components/buttons/buttons.js";
import * as UI2 from "../../../ui/legacy/legacy.js";
import { html as html2, render as render2 } from "../../../ui/lit/lit.js";

// gen/front_end/panels/issues/components/hideIssuesMenu.css.js
var hideIssuesMenu_css_default = `/*
 * Copyright 2021 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

@scope to (devtools-widget > *) {
  .hide-issues-menu-btn {
    position: relative;
    display: flex;
    background-color: transparent;
    flex: none;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0 calc(-1 * var(--sys-size-2)) 0 var(--sys-size-3);
    overflow: hidden;
    border-radius: 0;
    border: none;

    &:hover > devtools-icon {
      color: var(--icon-default-hover);
    }
  }
}

/*# sourceURL=${import.meta.resolve("././hideIssuesMenu.css")} */`;

// ../../front_end/panels/issues/components/HideIssuesMenu.ts
var UIStrings = {
  /**
   * @description Tooltip in the Issues panel for the three dots (options) menu button to hide issues.
   */
  tooltipTitle: "Hide issues"
};
var str_ = i18n.i18n.registerUIStrings("panels/issues/components/HideIssuesMenu.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var DEFAULT_VIEW2 = (input, _output, target) => {
  const onMenuOpen = (event) => {
    event.stopPropagation();
    const buttonElement = event.currentTarget;
    const contextMenu = new UI2.ContextMenu.ContextMenu(event, {
      x: buttonElement?.getBoundingClientRect().left,
      y: buttonElement?.getBoundingClientRect().bottom
    });
    contextMenu.headerSection().appendItem(
      input.menuItemLabel,
      () => input.menuItemAction(),
      { jslogContext: "toggle-similar-issues" }
    );
    void contextMenu.show();
  };
  const onKeydown = (event) => {
    if (event.key === "Enter" || event.key === "Space") {
      event.stopImmediatePropagation();
    }
  };
  render2(html2`
    <style>${hideIssuesMenu_css_default}</style>
    <devtools-button
      .data=${{ variant: Buttons.Button.Variant.ICON, iconName: "dots-vertical", title: i18nString(UIStrings.tooltipTitle) }}
      .jslogContext=${"hide-issues"}
      class="hide-issues-menu-btn"
      @click=${onMenuOpen}
      @keydown=${onKeydown}></devtools-button>
  `, target, { container: { classes: ["hide-issues-menu"] } });
};
var HideIssuesMenu = class extends UI2.Widget.Widget {
  #menuItemLabel = Common.UIString.LocalizedEmptyString;
  #menuItemAction = () => {
  };
  #view;
  constructor(element, view = DEFAULT_VIEW2) {
    super(element, { useShadowDom: "pure" });
    this.#view = view;
  }
  set menuItemLabel(menuItemLabel) {
    if (this.#menuItemLabel === menuItemLabel) {
      return;
    }
    this.#menuItemLabel = menuItemLabel;
    this.requestUpdate();
  }
  set menuItemAction(menuItemAction) {
    if (this.#menuItemAction === menuItemAction) {
      return;
    }
    this.#menuItemAction = menuItemAction;
    this.requestUpdate();
  }
  wasShown() {
    super.wasShown();
    this.requestUpdate();
  }
  performUpdate() {
    this.#view(
      {
        menuItemLabel: this.#menuItemLabel,
        menuItemAction: this.#menuItemAction
      },
      void 0,
      this.contentElement
    );
  }
};
export {
  ElementsPanelLink_exports as ElementsPanelLink,
  HideIssuesMenu_exports as HideIssuesMenu
};
//# sourceMappingURL=components.js.map
