var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../../front_end/ui/components/menus/Menu.ts
var Menu_exports = {};
__export(Menu_exports, {
  Menu: () => Menu,
  MenuCloseRequest: () => MenuCloseRequest,
  MenuGroup: () => MenuGroup,
  MenuItem: () => MenuItem,
  MenuItemSelectedEvent: () => MenuItemSelectedEvent
});
import * as Platform from "../../../core/platform/platform.js";
import * as ComponentHelpers from "../helpers/helpers.js";
import * as RenderCoordinator from "../render_coordinator/render_coordinator.js";
import * as Lit from "../../lit/lit.js";
import * as VisualLogging from "../../visual_logging/visual_logging.js";
import * as Dialogs from "../dialogs/dialogs.js";

// gen/front_end/ui/components/menus/menu.css.js
var menu_css_default = `/*
 * Copyright 2023 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  border-radius: 3px;
  width: fit-content;
  display: flex;
  align-items: center;
  background-color: var(--override-menu-background-color, var(--sys-color-cdt-base-container));
}

:host([has-open-dialog]) {
  background-color: var(--override-menu-active-background-color, var(--sys-color-neutral-container));
}

* {
  font-family: inherit;
}

#container {
  list-style-type: none;
  margin-top: var(--sys-size-4);
  padding: 0;
  width: fit-content;
  display: block;
}

#container:focus {
  outline: none;
}

@keyframes slideIn {
  from {
    transform: var(--translate-dialog);
    opacity: 0%;
  }

  to {
    transform: none;
    opacity: 100%;
  }
}

/*# sourceURL=${import.meta.resolve("./menu.css")} */`;

// gen/front_end/ui/components/menus/menuGroup.css.js
var menuGroup_css_default = `/*
 * Copyright 2023 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.menu-group-label {
  font-size: var(--sys-typescale-body4-size);
  line-height: var(--sys-typescale-body4-line-height);
  position: relative;
  color: var(--sys-color-token-subtle);
  display: block;
}

/*# sourceURL=${import.meta.resolve("./menuGroup.css")} */`;

// gen/front_end/ui/components/menus/menuItem.css.js
var menuItem_css_default = `/*
 * Copyright 2023 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.menu-item {
  padding: var(--sys-size-3) 0 var(--sys-size-3) var(--sys-size-9);
  font-size: var(--sys-typescale-body4-size);
  line-height: var(--sys-typescale-body4-line-height);
  position: relative;
  display: block;
  color: var(--sys-color-on-surface);
}

.menu-item:focus {
  outline: none;
}

:host(.no-checkmark) .menu-item {
  padding-left: 0;
}

:host(:not(:first-child)) .menu-item {
  border-top: var(--override-divider-line);
}

:host-context(devtools-menu-group) .menu-item {
  padding: var(--sys-size-3) 0 var(--sys-size-3) var(--sys-size-9);
}

* {
  font-family: inherit;
}

.is-selected-item::before {
  content: "";
  position: absolute;
  left: var(--sys-size-2);
  top: 50%;
  transform: translateY(-50%);
  display: inline-block;
  mask-repeat: no-repeat;
  mask-position: center;
  width: calc(var(--menu-checkmark-width) - 10px);
  height: var(--menu-checkmark-height);
  mask-image: var(--selected-item-check);
  background: var(--sys-color-token-subtle);
}

.is-disabled-item {
  opacity: 60%;
}

:host(:hover:not(.prevents-close)) .menu-item::after,
:host(:focus-visible:not(.prevents-close)) .menu-item::after {
  content: "";
  height: 100%;
  width: calc(100% + 2* var(--sys-size-8));
  border-radius: inherit;
  position: absolute;
  top: 0;
  left: calc(-1 * var(--sys-size-8));
  background-color: var(--sys-color-state-hover-on-subtle);
}

:host(:focus) {
  outline: none;
}

:host(:focus-visible:not(.prevents-close)) .menu-item::after {
  outline: var(--sys-size-2) solid var(--sys-color-state-focus-ring);
  outline-offset: calc(-1 * var(--sys-size-2));
}

@media (forced-colors: active) {
  :host(:focus-visible:not(.prevents-close)) .menu-item::after {
    outline-color: Highlight;
  }
}

/*# sourceURL=${import.meta.resolve("./menuItem.css")} */`;

// ../../front_end/ui/components/menus/Menu.ts
var { html, Directives: { ref } } = Lit;
var selectedItemCheckmark = new URL("../../../Images/checkmark.svg", import.meta.url).toString();
var Menu = class extends HTMLElement {
  #shadow = this.attachShadow({ mode: "open" });
  #dialog = null;
  #itemIsFocused = false;
  #props = {
    origin: null,
    open: false,
    position: Dialogs.Dialog.DialogVerticalPosition.AUTO,
    showDivider: false,
    showSelectedItem: true,
    horizontalAlignment: Dialogs.Dialog.DialogHorizontalAlignment.AUTO,
    getConnectorCustomXPosition: null
  };
  get origin() {
    return this.#props.origin;
  }
  set origin(origin) {
    this.#props.origin = origin;
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  get open() {
    return this.#props.open;
  }
  set open(open) {
    if (open === this.open) {
      return;
    }
    this.#props.open = open;
    this.toggleAttribute("has-open-dialog", this.open);
    void this.#getDialog().setDialogVisible(this.open);
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  get position() {
    return this.#props.position;
  }
  set position(position) {
    this.#props.position = position;
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  get showDivider() {
    return this.#props.showDivider;
  }
  set showDivider(showDivider) {
    this.#props.showDivider = showDivider;
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  get showSelectedItem() {
    return this.#props.showSelectedItem;
  }
  set showSelectedItem(showSelectedItem) {
    this.#props.showSelectedItem = showSelectedItem;
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  get horizontalAlignment() {
    return this.#props.horizontalAlignment;
  }
  set horizontalAlignment(horizontalAlignment) {
    this.#props.horizontalAlignment = horizontalAlignment;
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  get getConnectorCustomXPosition() {
    return this.#props.getConnectorCustomXPosition;
  }
  set getConnectorCustomXPosition(connectorXPosition) {
    this.#props.getConnectorCustomXPosition = connectorXPosition;
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  connectedCallback() {
    void RenderCoordinator.write(() => {
      this.style.setProperty("--selected-item-check", `url(${selectedItemCheckmark})`);
      this.style.setProperty("--menu-checkmark-width", this.#props.showSelectedItem ? "26px" : "0px");
      this.style.setProperty("--menu-checkmark-height", this.#props.showSelectedItem ? "12px" : "0px");
      const dividerLine = this.showDivider ? "1px var(--divider-line) solid" : "none";
      this.style.setProperty("--override-divider-line", dividerLine);
    });
  }
  #getDialog() {
    if (!this.#dialog) {
      throw new Error("Dialog not found");
    }
    return this.#dialog;
  }
  async #dialogDeployed() {
    await RenderCoordinator.write(() => {
      this.setAttribute("has-open-dialog", "has-open-dialog");
      const container = this.#shadow.querySelector("#container");
      if (!(container instanceof HTMLElement)) {
        return;
      }
      container.focus();
    });
  }
  #focusFirstItem() {
    this.#getFirstItem().focus();
  }
  #getFirstItem() {
    const defaultSlot = this.#shadow.querySelector("slot");
    const items = defaultSlot?.assignedElements();
    let firstItem = items[0];
    if (firstItem instanceof HTMLSlotElement) {
      firstItem = firstItem?.assignedElements()[0];
    }
    if (firstItem instanceof MenuGroup) {
      const groupDefaultSlot = firstItem.shadowRoot?.querySelector("slot");
      firstItem = groupDefaultSlot?.assignedElements()[0];
    }
    if (firstItem instanceof HTMLElement) {
      return firstItem;
    }
    throw new Error("First item not found");
  }
  #handleItemClick(evt) {
    const path = evt.composedPath();
    evt.stopPropagation();
    if (path.find((element) => element instanceof HTMLInputElement)) {
      return;
    }
    const item = evt.composedPath().find((element) => element instanceof MenuItem);
    if (!(item instanceof MenuItem)) {
      return;
    }
    if (item.disabled) {
      return;
    }
    this.#updateSelectedValue(item);
  }
  #handleDialogKeyDown(evt) {
    const key = evt.key;
    evt.stopImmediatePropagation();
    let item = evt.target;
    const path = evt.composedPath();
    const shouldFocusFirstItem = key === Platform.KeyboardUtilities.ArrowKey.DOWN || key === Platform.KeyboardUtilities.ArrowKey.RIGHT;
    if (!this.#itemIsFocused && shouldFocusFirstItem) {
      this.#focusFirstItem();
      this.#itemIsFocused = true;
      return;
    }
    if (!this.#itemIsFocused && key === Platform.KeyboardUtilities.ArrowKey.UP) {
      this.#focusLastItem();
      this.#itemIsFocused = true;
      return;
    }
    if (!(item instanceof MenuItem)) {
      item = path.find((element) => element instanceof MenuItem);
      if (!(item instanceof MenuItem)) {
        return;
      }
    }
    if (Platform.KeyboardUtilities.keyIsArrowKey(key)) {
      this.#handleArrowKeyNavigation(key, item);
    } else if (key === "Home") {
      this.#handleHomeKeyDown(item);
    } else if (key === "End") {
      this.#focusLastItem();
    } else if (key === "Enter" || evt.code === "Space") {
      this.#updateSelectedValue(item);
    } else if (key === "Escape") {
      evt.preventDefault();
      this.#closeDialog();
    }
  }
  #updateSelectedValue(item) {
    if (item.value === "") {
      return;
    }
    this.dispatchEvent(new MenuItemSelectedEvent(item.value));
    if (item.preventMenuCloseOnSelection) {
      return;
    }
    this.#closeDialog();
  }
  #handleArrowKeyNavigation(key, currentItem) {
    let nextSibling = currentItem;
    if (key === Platform.KeyboardUtilities.ArrowKey.DOWN) {
      nextSibling = currentItem.nextElementSibling;
      if (nextSibling === null && currentItem.parentElement instanceof MenuGroup) {
        nextSibling = this.#firstItemInNextGroup(currentItem);
      }
    } else if (key === Platform.KeyboardUtilities.ArrowKey.UP) {
      nextSibling = currentItem.previousElementSibling;
      if (nextSibling === null && currentItem.parentElement instanceof MenuGroup) {
        nextSibling = this.#lastItemInPreviousGroup(currentItem);
      }
    }
    if (nextSibling instanceof MenuItem) {
      nextSibling.focus();
    }
  }
  #firstItemInNextGroup(currentItem) {
    const parentElement = currentItem.parentElement;
    if (!(parentElement instanceof MenuGroup)) {
      return null;
    }
    const parentNextSibling = parentElement.nextElementSibling;
    if (parentNextSibling instanceof MenuItem) {
      return parentNextSibling;
    }
    if (!(parentNextSibling instanceof MenuGroup)) {
      return null;
    }
    for (const child of parentNextSibling.children) {
      if (child instanceof MenuItem) {
        return child;
      }
    }
    return null;
  }
  #lastItemInPreviousGroup(currentItem) {
    const parentElement = currentItem.parentElement;
    if (!(parentElement instanceof MenuGroup)) {
      return null;
    }
    const parentPreviousSibling = parentElement.previousElementSibling;
    if (parentPreviousSibling instanceof MenuItem) {
      return parentPreviousSibling;
    }
    if (!(parentPreviousSibling instanceof MenuGroup)) {
      return null;
    }
    if (parentPreviousSibling.lastElementChild instanceof MenuItem) {
      return parentPreviousSibling.lastElementChild;
    }
    return null;
  }
  #handleHomeKeyDown(currentItem) {
    let topMenuPart = currentItem;
    if (currentItem.parentElement instanceof MenuGroup) {
      topMenuPart = currentItem.parentElement;
    }
    while (topMenuPart?.previousElementSibling) {
      topMenuPart = topMenuPart?.previousElementSibling;
    }
    if (topMenuPart instanceof MenuItem) {
      topMenuPart.focus();
      return;
    }
    for (const child of topMenuPart.children) {
      if (child instanceof MenuItem) {
        child.focus();
        return;
      }
    }
  }
  #focusLastItem() {
    const currentItem = this.#getFirstItem();
    let lastMenuPart = currentItem;
    if (currentItem.parentElement instanceof MenuGroup) {
      lastMenuPart = currentItem.parentElement;
    }
    while (lastMenuPart?.nextElementSibling) {
      lastMenuPart = lastMenuPart?.nextElementSibling;
    }
    if (lastMenuPart instanceof MenuItem) {
      lastMenuPart.focus();
      return;
    }
    if (lastMenuPart instanceof MenuGroup && lastMenuPart.lastElementChild instanceof MenuItem) {
      lastMenuPart.lastElementChild.focus();
    }
  }
  #closeDialog(evt) {
    if (evt) {
      evt.stopImmediatePropagation();
    }
    this.dispatchEvent(new MenuCloseRequest());
    void this.#getDialog().setDialogVisible(false);
    this.#itemIsFocused = false;
  }
  async #render() {
    if (!ComponentHelpers.ScheduledRender.isScheduledRender(this)) {
      throw new Error("Menu render was not scheduled");
    }
    Lit.render(html`
      <style>${menu_css_default}</style>
      <devtools-dialog
        @clickoutsidedialog=${this.#closeDialog}
        @forceddialogclose=${this.#closeDialog}
        .position=${this.position}
        .origin=${this.origin}
        .dialogShownCallback=${this.#dialogDeployed.bind(this)}
        .horizontalAlignment=${this.horizontalAlignment}
        .getConnectorCustomXPosition=${this.getConnectorCustomXPosition}
        ${ref((el) => {
      if (el instanceof HTMLElement) {
        this.#dialog = el;
      }
    })}
        >
        <span id="container" role="menu" tabIndex="0" @keydown=${this.#handleDialogKeyDown} jslog=${VisualLogging.menu().track({ resize: true, keydown: "Escape" })}>
          <slot @click=${this.#handleItemClick}>
          </slot>
        </span>
      </devtools-dialog>
    `, this.#shadow, { host: this });
  }
};
var MenuItem = class extends HTMLElement {
  #shadow = this.attachShadow({ mode: "open" });
  connectedCallback() {
    this.tabIndex = 0;
    this.setAttribute("role", "menuitem");
    this.setAttribute("aria-selected", String(this.#props.selected));
  }
  #props = {
    value: "",
    preventMenuCloseOnSelection: false,
    selected: false,
    disabled: false
  };
  get preventMenuCloseOnSelection() {
    return this.#props.preventMenuCloseOnSelection;
  }
  set preventMenuCloseOnSelection(preventMenuCloseOnSelection) {
    this.#props.preventMenuCloseOnSelection = preventMenuCloseOnSelection;
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  get value() {
    return this.#props.value;
  }
  set value(value) {
    this.#props.value = value;
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  get selected() {
    return this.#props.selected;
  }
  set selected(selected) {
    this.#props.selected = selected;
    this.setAttribute("aria-selected", String(selected));
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  get disabled() {
    return this.#props.disabled;
  }
  set disabled(disabled) {
    this.#props.disabled = disabled;
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  async #render() {
    if (!ComponentHelpers.ScheduledRender.isScheduledRender(this)) {
      throw new Error("MenuItem render was not scheduled");
    }
    Lit.render(html`
      <style>${menuItem_css_default}</style>
      <span class=${Lit.Directives.classMap({
      "menu-item": true,
      "is-selected-item": this.selected,
      "is-disabled-item": this.disabled,
      "prevents-close": this.preventMenuCloseOnSelection
    })}
      >
        <slot></slot>
      </span>
    `, this.#shadow, { host: this });
  }
};
var MenuGroup = class extends HTMLElement {
  #shadow = this.attachShadow({ mode: "open" });
  #props = {
    name: null
  };
  get name() {
    return this.#props.name;
  }
  set name(name) {
    this.#props.name = name;
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  async #render() {
    if (!ComponentHelpers.ScheduledRender.isScheduledRender(this)) {
      throw new Error("MenuGroup render was not scheduled");
    }
    Lit.render(html`
      <style>${menuGroup_css_default}</style>
      <span class="menu-group">
        <span class="menu-group-label">${this.name}</span>
        <slot></slot>
      </span>
    `, this.#shadow, { host: this });
  }
};
customElements.define("devtools-menu", Menu);
customElements.define("devtools-menu-item", MenuItem);
customElements.define("devtools-menu-group", MenuGroup);
var MenuItemSelectedEvent = class _MenuItemSelectedEvent extends Event {
  constructor(itemValue) {
    super(_MenuItemSelectedEvent.eventName, { bubbles: true, composed: true });
    this.itemValue = itemValue;
  }
  itemValue;
  static eventName = "menuitemselected";
};
var MenuCloseRequest = class _MenuCloseRequest extends Event {
  static eventName = "menucloserequest";
  constructor() {
    super(_MenuCloseRequest.eventName, { bubbles: true, composed: true });
  }
};
export {
  Menu_exports as Menu
};
//# sourceMappingURL=menus.js.map
