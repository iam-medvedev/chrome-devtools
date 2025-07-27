var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/console/ConsoleContextSelector.js
var ConsoleContextSelector_exports = {};
__export(ConsoleContextSelector_exports, {
  ConsoleContextSelector: () => ConsoleContextSelector
});
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as Platform from "./../../core/platform/platform.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as UI from "./../../ui/legacy/legacy.js";

// gen/front_end/panels/console/consoleContextSelector.css.js
var consoleContextSelector_css_default = `/*
 * Copyright 2017 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  padding: 2px 1px 2px 2px;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  height: 36px;
  justify-content: center;
  overflow-y: auto;
}

.title {
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 0;
}

.badge {
  pointer-events: none;
  margin-right: 4px;
  display: inline-block;
  height: 15px;
}

.subtitle {
  color: var(--sys-color-token-subtle);
  margin-right: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 0;
}

:host(.highlighted) .subtitle {
  color: inherit;
}

/*# sourceURL=${import.meta.resolve("./consoleContextSelector.css")} */`;

// gen/front_end/panels/console/ConsoleContextSelector.js
var UIStrings = {
  /**
   *@description Title of toolbar item in console context selector of the console panel
   */
  javascriptContextNotSelected: "JavaScript context: Not selected",
  /**
   *@description Text in Console Context Selector of the Console panel
   */
  extension: "Extension",
  /**
   *@description Text in Console Context Selector of the Console panel
   *@example {top} PH1
   */
  javascriptContextS: "JavaScript context: {PH1}"
};
var str_ = i18n.i18n.registerUIStrings("panels/console/ConsoleContextSelector.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var ConsoleContextSelector = class {
  items;
  dropDown;
  toolbarItemInternal;
  constructor() {
    this.items = new UI.ListModel.ListModel();
    this.dropDown = new UI.SoftDropDown.SoftDropDown(this.items, this, "javascript-context");
    this.dropDown.setRowHeight(36);
    this.toolbarItemInternal = new UI.Toolbar.ToolbarItem(this.dropDown.element);
    this.toolbarItemInternal.setEnabled(false);
    this.toolbarItemInternal.setTitle(i18nString(UIStrings.javascriptContextNotSelected));
    this.items.addEventListener("ItemsReplaced", () => this.toolbarItemInternal.setEnabled(Boolean(this.items.length)));
    this.toolbarItemInternal.element.classList.add("toolbar-has-dropdown");
    SDK.TargetManager.TargetManager.instance().addModelListener(SDK.RuntimeModel.RuntimeModel, SDK.RuntimeModel.Events.ExecutionContextCreated, this.onExecutionContextCreated, this, { scoped: true });
    SDK.TargetManager.TargetManager.instance().addModelListener(SDK.RuntimeModel.RuntimeModel, SDK.RuntimeModel.Events.ExecutionContextChanged, this.onExecutionContextChanged, this, { scoped: true });
    SDK.TargetManager.TargetManager.instance().addModelListener(SDK.RuntimeModel.RuntimeModel, SDK.RuntimeModel.Events.ExecutionContextDestroyed, this.onExecutionContextDestroyed, this, { scoped: true });
    SDK.TargetManager.TargetManager.instance().addModelListener(SDK.ResourceTreeModel.ResourceTreeModel, SDK.ResourceTreeModel.Events.FrameNavigated, this.frameNavigated, this, { scoped: true });
    UI.Context.Context.instance().addFlavorChangeListener(SDK.RuntimeModel.ExecutionContext, this.executionContextChangedExternally, this);
    UI.Context.Context.instance().addFlavorChangeListener(SDK.DebuggerModel.CallFrame, this.callFrameSelectedInUI, this);
    SDK.TargetManager.TargetManager.instance().observeModels(SDK.RuntimeModel.RuntimeModel, this, { scoped: true });
    SDK.TargetManager.TargetManager.instance().addModelListener(SDK.DebuggerModel.DebuggerModel, SDK.DebuggerModel.Events.CallFrameSelected, this.callFrameSelectedInModel, this);
  }
  toolbarItem() {
    return this.toolbarItemInternal;
  }
  highlightedItemChanged(_from, to, fromElement, toElement) {
    SDK.OverlayModel.OverlayModel.hideDOMNodeHighlight();
    if (to && to.frameId) {
      const frame = SDK.FrameManager.FrameManager.instance().getFrame(to.frameId);
      if (frame && !frame.isOutermostFrame()) {
        void frame.highlight();
      }
    }
    if (fromElement) {
      fromElement.classList.remove("highlighted");
    }
    if (toElement) {
      toElement.classList.add("highlighted");
    }
  }
  titleFor(executionContext) {
    const target = executionContext.target();
    const maybeLabel = executionContext.label();
    let label = maybeLabel ? target.decorateLabel(maybeLabel) : "";
    if (executionContext.frameId) {
      const resourceTreeModel = target.model(SDK.ResourceTreeModel.ResourceTreeModel);
      const frame = resourceTreeModel?.frameForId(executionContext.frameId);
      if (frame) {
        label = label || frame.displayName();
      }
    }
    label = label || executionContext.origin;
    return label;
  }
  depthFor(executionContext) {
    let target = executionContext.target();
    let depth = 0;
    if (!executionContext.isDefault) {
      depth++;
    }
    if (executionContext.frameId) {
      let frame = SDK.FrameManager.FrameManager.instance().getFrame(executionContext.frameId);
      while (frame) {
        frame = frame.parentFrame();
        if (frame) {
          depth++;
          target = frame.resourceTreeModel().target();
        }
      }
    }
    let targetDepth = 0;
    let parentTarget = target.parentTarget();
    while (parentTarget && target.type() !== SDK.Target.Type.ServiceWorker) {
      targetDepth++;
      target = parentTarget;
      parentTarget = target.parentTarget();
    }
    depth += targetDepth;
    return depth;
  }
  executionContextCreated(executionContext) {
    this.items.insertWithComparator(executionContext, executionContext.runtimeModel.executionContextComparator());
    if (executionContext === UI.Context.Context.instance().flavor(SDK.RuntimeModel.ExecutionContext)) {
      this.dropDown.selectItem(executionContext);
    }
  }
  onExecutionContextCreated(event) {
    const executionContext = event.data;
    this.executionContextCreated(executionContext);
  }
  onExecutionContextChanged(event) {
    const executionContext = event.data;
    if (this.items.indexOf(executionContext) === -1) {
      return;
    }
    this.executionContextDestroyed(executionContext);
    this.executionContextCreated(executionContext);
  }
  executionContextDestroyed(executionContext) {
    const index = this.items.indexOf(executionContext);
    if (index === -1) {
      return;
    }
    this.items.remove(index);
  }
  onExecutionContextDestroyed(event) {
    const executionContext = event.data;
    this.executionContextDestroyed(executionContext);
  }
  executionContextChangedExternally({ data: executionContext }) {
    if (executionContext && !SDK.TargetManager.TargetManager.instance().isInScope(executionContext.target())) {
      return;
    }
    this.dropDown.selectItem(executionContext);
  }
  isTopContext(executionContext) {
    if (!executionContext?.isDefault) {
      return false;
    }
    const resourceTreeModel = executionContext.target().model(SDK.ResourceTreeModel.ResourceTreeModel);
    const frame = executionContext.frameId && resourceTreeModel?.frameForId(executionContext.frameId);
    if (!frame) {
      return false;
    }
    return frame.isOutermostFrame();
  }
  hasTopContext() {
    return this.items.some((executionContext) => this.isTopContext(executionContext));
  }
  modelAdded(runtimeModel) {
    runtimeModel.executionContexts().forEach(this.executionContextCreated, this);
  }
  modelRemoved(runtimeModel) {
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (this.items.at(i).runtimeModel === runtimeModel) {
        this.executionContextDestroyed(this.items.at(i));
      }
    }
  }
  createElementForItem(item2) {
    const element = document.createElement("div");
    const shadowRoot = UI.UIUtils.createShadowRootWithCoreStyles(element, { cssFile: consoleContextSelector_css_default });
    const title = shadowRoot.createChild("div", "title");
    UI.UIUtils.createTextChild(title, Platform.StringUtilities.trimEndWithMaxLength(this.titleFor(item2), 100));
    const subTitle = shadowRoot.createChild("div", "subtitle");
    UI.UIUtils.createTextChild(subTitle, this.subtitleFor(item2));
    element.style.paddingLeft = 8 + this.depthFor(item2) * 15 + "px";
    return element;
  }
  subtitleFor(executionContext) {
    const target = executionContext.target();
    let frame = null;
    if (executionContext.frameId) {
      const resourceTreeModel = target.model(SDK.ResourceTreeModel.ResourceTreeModel);
      frame = resourceTreeModel?.frameForId(executionContext.frameId) ?? null;
    }
    if (Common.ParsedURL.schemeIs(executionContext.origin, "chrome-extension:")) {
      return i18nString(UIStrings.extension);
    }
    const sameTargetParentFrame = frame?.sameTargetParentFrame();
    if (!frame || !sameTargetParentFrame || sameTargetParentFrame.securityOrigin !== executionContext.origin) {
      const url = Common.ParsedURL.ParsedURL.fromString(executionContext.origin);
      if (url) {
        return url.domain();
      }
    }
    if (frame?.securityOrigin) {
      const domain = new Common.ParsedURL.ParsedURL(frame.securityOrigin).domain();
      if (domain) {
        return domain;
      }
    }
    return "IFrame";
  }
  isItemSelectable(item2) {
    const callFrame = item2.debuggerModel.selectedCallFrame();
    const callFrameContext = callFrame?.script.executionContext();
    return !callFrameContext || item2 === callFrameContext;
  }
  itemSelected(item2) {
    this.toolbarItemInternal.element.classList.toggle("highlight", !this.isTopContext(item2) && this.hasTopContext());
    const title = item2 ? i18nString(UIStrings.javascriptContextS, { PH1: this.titleFor(item2) }) : i18nString(UIStrings.javascriptContextNotSelected);
    this.toolbarItemInternal.setTitle(title);
    UI.Context.Context.instance().setFlavor(SDK.RuntimeModel.ExecutionContext, item2);
  }
  callFrameSelectedInUI() {
    const callFrame = UI.Context.Context.instance().flavor(SDK.DebuggerModel.CallFrame);
    const callFrameContext = callFrame?.script.executionContext();
    if (callFrameContext) {
      UI.Context.Context.instance().setFlavor(SDK.RuntimeModel.ExecutionContext, callFrameContext);
    }
  }
  callFrameSelectedInModel(event) {
    const debuggerModel = event.data;
    for (const executionContext of this.items) {
      if (executionContext.debuggerModel === debuggerModel) {
        this.dropDown.refreshItem(executionContext);
      }
    }
  }
  frameNavigated(event) {
    const frame = event.data;
    const runtimeModel = frame.resourceTreeModel().target().model(SDK.RuntimeModel.RuntimeModel);
    if (!runtimeModel) {
      return;
    }
    for (const executionContext of runtimeModel.executionContexts()) {
      if (frame.id === executionContext.frameId) {
        this.dropDown.refreshItem(executionContext);
      }
    }
  }
};

// gen/front_end/panels/console/ConsoleFilter.js
var ConsoleFilter_exports = {};
__export(ConsoleFilter_exports, {
  ConsoleFilter: () => ConsoleFilter,
  FilterType: () => FilterType
});
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as TextUtils from "./../../models/text_utils/text_utils.js";
var ConsoleFilter = class _ConsoleFilter {
  name;
  parsedFilters;
  executionContext;
  levelsMask;
  constructor(name, parsedFilters, executionContext, levelsMask) {
    this.name = name;
    this.parsedFilters = parsedFilters;
    this.executionContext = executionContext;
    this.levelsMask = levelsMask || _ConsoleFilter.defaultLevelsFilterValue();
  }
  static allLevelsFilterValue() {
    const result = {};
    const logLevels = {
      Verbose: "verbose",
      Info: "info",
      Warning: "warning",
      Error: "error"
    };
    for (const name of Object.values(logLevels)) {
      result[name] = true;
    }
    return result;
  }
  static defaultLevelsFilterValue() {
    const result = _ConsoleFilter.allLevelsFilterValue();
    result[
      "verbose"
      /* Protocol.Log.LogEntryLevel.Verbose */
    ] = false;
    return result;
  }
  static singleLevelMask(level) {
    const result = {};
    result[level] = true;
    return result;
  }
  clone() {
    const parsedFilters = this.parsedFilters.map(TextUtils.TextUtils.FilterParser.cloneFilter);
    const levelsMask = Object.assign({}, this.levelsMask);
    return new _ConsoleFilter(this.name, parsedFilters, this.executionContext, levelsMask);
  }
  shouldBeVisible(viewMessage) {
    const message = viewMessage.consoleMessage();
    if (this.executionContext && (this.executionContext.runtimeModel !== message.runtimeModel() || this.executionContext.id !== message.getExecutionContextId())) {
      return false;
    }
    if (message.type === SDK2.ConsoleModel.FrontendMessageType.Command || message.type === SDK2.ConsoleModel.FrontendMessageType.Result || message.type === "endGroup") {
      return true;
    }
    if (message.level && !this.levelsMask[message.level]) {
      return false;
    }
    return this.applyFilter(viewMessage) || this.parentGroupHasMatch(viewMessage.consoleGroup());
  }
  // A message is visible if there is a match in any of the parent groups' titles.
  parentGroupHasMatch(viewMessage) {
    if (viewMessage === null) {
      return false;
    }
    return this.applyFilter(viewMessage) || this.parentGroupHasMatch(viewMessage.consoleGroup());
  }
  applyFilter(viewMessage) {
    const message = viewMessage.consoleMessage();
    for (const filter of this.parsedFilters) {
      if (!filter.key) {
        if (filter.regex && viewMessage.matchesFilterRegex(filter.regex) === filter.negative) {
          return false;
        }
        if (filter.text && viewMessage.matchesFilterText(filter.text) === filter.negative) {
          return false;
        }
      } else {
        switch (filter.key) {
          case FilterType.Context: {
            if (!passesFilter(
              filter,
              message.context,
              false
              /* exactMatch */
            )) {
              return false;
            }
            break;
          }
          case FilterType.Source: {
            const sourceNameForMessage = message.source ? SDK2.ConsoleModel.MessageSourceDisplayName.get(message.source) : message.source;
            if (!passesFilter(
              filter,
              sourceNameForMessage,
              true
              /* exactMatch */
            )) {
              return false;
            }
            break;
          }
          case FilterType.Url: {
            if (!passesFilter(
              filter,
              message.url,
              false
              /* exactMatch */
            )) {
              return false;
            }
            break;
          }
        }
      }
    }
    return true;
    function passesFilter(filter, value, exactMatch) {
      if (!filter.text) {
        return Boolean(value) === filter.negative;
      }
      if (!value) {
        return !filter.text === !filter.negative;
      }
      const filterText = filter.text.toLowerCase();
      const lowerCaseValue = value.toLowerCase();
      if (exactMatch && lowerCaseValue === filterText === filter.negative) {
        return false;
      }
      if (!exactMatch && lowerCaseValue.includes(filterText) === filter.negative) {
        return false;
      }
      return true;
    }
  }
};
var FilterType;
(function(FilterType2) {
  FilterType2["Context"] = "context";
  FilterType2["Source"] = "source";
  FilterType2["Url"] = "url";
})(FilterType || (FilterType = {}));

// gen/front_end/panels/console/ConsoleFormat.js
var ConsoleFormat_exports = {};
__export(ConsoleFormat_exports, {
  format: () => format,
  updateStyle: () => updateStyle
});
import * as Common2 from "./../../core/common/common.js";
var ANSI_COLORS = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "gray"];
var ANSI_BRIGHT_COLORS = ["darkgray", "lightred", "lightgreen", "lightyellow", "lightblue", "lightmagenta", "lightcyan", "white"];
var format = (fmt, args) => {
  const tokens = [];
  const currentStyle = /* @__PURE__ */ new Map();
  function addTextDecoration(value) {
    const textDecoration = currentStyle.get("text-decoration") ?? "";
    if (!textDecoration.includes(value)) {
      currentStyle.set("text-decoration", `${textDecoration} ${value}`);
    }
  }
  function removeTextDecoration(value) {
    const textDecoration = currentStyle.get("text-decoration")?.replace(` ${value}`, "");
    if (textDecoration) {
      currentStyle.set("text-decoration", textDecoration);
    } else {
      currentStyle.delete("text-decoration");
    }
  }
  function addStringToken(value) {
    if (!value) {
      return;
    }
    if (tokens.length && tokens[tokens.length - 1].type === "string") {
      tokens[tokens.length - 1].value += value;
      return;
    }
    tokens.push({ type: "string", value });
  }
  let argIndex = 0;
  const re = /%([%_Oocsdfi])|\x1B\[([\d;]*)m/;
  for (let match = re.exec(fmt); match !== null; match = re.exec(fmt)) {
    addStringToken(match.input.substring(0, match.index));
    let substitution = void 0;
    const specifier = match[1];
    switch (specifier) {
      case "%":
        addStringToken("%");
        substitution = "";
        break;
      case "s":
        if (argIndex < args.length) {
          const { description } = args[argIndex++];
          substitution = description ?? "";
        }
        break;
      case "c":
        if (argIndex < args.length) {
          const type = "style";
          const value = args[argIndex++].description ?? "";
          tokens.push({ type, value });
          substitution = "";
        }
        break;
      case "o":
      case "O":
        if (argIndex < args.length) {
          const type = specifier === "O" ? "generic" : "optimal";
          const value = args[argIndex++];
          tokens.push({ type, value });
          substitution = "";
        }
        break;
      case "_":
        if (argIndex < args.length) {
          argIndex++;
          substitution = "";
        }
        break;
      case "d":
      case "f":
      case "i":
        if (argIndex < args.length) {
          const { value } = args[argIndex++];
          substitution = typeof value !== "number" ? NaN : value;
          if (specifier !== "f") {
            substitution = Math.floor(substitution);
          }
        }
        break;
      case void 0: {
        const codes = (match[2] || "0").split(";").map((code) => code ? parseInt(code, 10) : 0);
        while (codes.length) {
          const code = codes.shift();
          switch (code) {
            case 0:
              currentStyle.clear();
              break;
            case 1:
              currentStyle.set("font-weight", "bold");
              break;
            case 2:
              currentStyle.set("font-weight", "lighter");
              break;
            case 3:
              currentStyle.set("font-style", "italic");
              break;
            case 4:
              addTextDecoration("underline");
              break;
            case 9:
              addTextDecoration("line-through");
              break;
            case 22:
              currentStyle.delete("font-weight");
              break;
            case 23:
              currentStyle.delete("font-style");
              break;
            case 24:
              removeTextDecoration("underline");
              break;
            case 29:
              removeTextDecoration("line-through");
              break;
            case 38:
            case 48:
              if (codes.shift() === 2) {
                const r = codes.shift() ?? 0, g = codes.shift() ?? 0, b = codes.shift() ?? 0;
                currentStyle.set(code === 38 ? "color" : "background-color", `rgb(${r},${g},${b})`);
              }
              break;
            case 39:
            case 49:
              currentStyle.delete(code === 39 ? "color" : "background-color");
              break;
            case 53:
              addTextDecoration("overline");
              break;
            case 55:
              removeTextDecoration("overline");
              break;
            default: {
              const color = ANSI_COLORS[code - 30] ?? ANSI_BRIGHT_COLORS[code - 90];
              if (color !== void 0) {
                currentStyle.set("color", `var(--console-color-${color})`);
              } else {
                const background = ANSI_COLORS[code - 40] ?? ANSI_BRIGHT_COLORS[code - 100];
                if (background !== void 0) {
                  currentStyle.set("background-color", `var(--console-color-${background})`);
                }
              }
              break;
            }
          }
        }
        const value = [...currentStyle.entries()].map(([key, val]) => `${key}:${val.trimStart()}`).join(";");
        const type = "style";
        tokens.push({ type, value });
        substitution = "";
        break;
      }
    }
    if (substitution === void 0) {
      addStringToken(match[0]);
      substitution = "";
    }
    fmt = substitution + match.input.substring(match.index + match[0].length);
  }
  addStringToken(fmt);
  return { tokens, args: args.slice(argIndex) };
};
var updateStyle = (currentStyle, styleToAdd) => {
  const ALLOWED_PROPERTY_PREFIXES = ["background", "border", "color", "font", "line", "margin", "padding", "text"];
  const URL_REGEX = /url\([\'\"]?([^\)]*)/g;
  currentStyle.clear();
  const buffer = document.createElement("span");
  buffer.setAttribute("style", styleToAdd);
  for (const property of buffer.style) {
    if (!ALLOWED_PROPERTY_PREFIXES.some((prefix) => property.startsWith(prefix) || property.startsWith(`-webkit-${prefix}`))) {
      continue;
    }
    const value = buffer.style.getPropertyValue(property);
    const potentialUrls = [...value.matchAll(URL_REGEX)].map((match) => match[1]);
    if (potentialUrls.some((potentialUrl) => !Common2.ParsedURL.schemeIs(potentialUrl, "data:"))) {
      continue;
    }
    currentStyle.set(property, {
      value,
      priority: buffer.style.getPropertyPriority(property)
    });
  }
};

// gen/front_end/panels/console/ConsolePinPane.js
var ConsolePinPane_exports = {};
__export(ConsolePinPane_exports, {
  ConsolePin: () => ConsolePin,
  ConsolePinPane: () => ConsolePinPane
});
import * as Common3 from "./../../core/common/common.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as Root from "./../../core/root/root.js";
import * as SDK3 from "./../../core/sdk/sdk.js";
import * as CodeMirror from "./../../third_party/codemirror.next/codemirror.next.js";
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as TextEditor from "./../../ui/components/text_editor/text_editor.js";
import * as ObjectUI from "./../../ui/legacy/components/object_ui/object_ui.js";

// gen/front_end/ui/legacy/components/object_ui/objectValue.css.js
var objectValue_css_default = `/*
 * Copyright 2015 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.value.object-value-node:hover {
  background-color: var(--sys-color-state-hover-on-subtle);
}

.object-value-function-prefix,
.object-value-boolean {
  color: var(--sys-color-token-attribute-value);
}

.object-value-function {
  font-style: italic;
}

.object-value-function.linkified:hover {
  --override-linkified-hover-background: rgb(0 0 0 / 10%);

  background-color: var(--override-linkified-hover-background);
  cursor: pointer;
}

.theme-with-dark-background .object-value-function.linkified:hover,
:host-context(.theme-with-dark-background) .object-value-function.linkified:hover {
  --override-linkified-hover-background: rgb(230 230 230 / 10%);
}

.object-value-number {
  color: var(--sys-color-token-attribute-value);
}

.object-value-bigint {
  color: var(--sys-color-token-comment);
}

.object-value-string,
.object-value-regexp,
.object-value-symbol {
  white-space: pre;
  unicode-bidi: -webkit-isolate;
  color: var(--sys-color-token-property-special);
}

.object-value-node {
  position: relative;
  vertical-align: baseline;
  color: var(--sys-color-token-variable);
  white-space: nowrap;
}

.object-value-null,
.object-value-undefined {
  color: var(--sys-color-state-disabled);
}

.object-value-unavailable {
  color: var(--sys-color-token-tag);
}

.object-value-calculate-value-button:hover {
  text-decoration: underline;
}

.object-properties-section-custom-section {
  display: inline-flex;
  flex-direction: column;
}

.theme-with-dark-background .object-value-number,
:host-context(.theme-with-dark-background) .object-value-number,
.theme-with-dark-background .object-value-boolean,
:host-context(.theme-with-dark-background) .object-value-boolean {
  --override-primitive-dark-mode-color: hsl(252deg 100% 75%);

  color: var(--override-primitive-dark-mode-color);
}

.object-properties-section .object-description {
  color: var(--sys-color-token-subtle);
}

.value .object-properties-preview {
  white-space: nowrap;
}

.name {
  color: var(--sys-color-token-tag);
  flex-shrink: 0;
}

.object-properties-preview .name {
  color: var(--sys-color-token-subtle);
}

@media (forced-colors: active) {
  .object-value-calculate-value-button:hover {
    forced-color-adjust: none;
    color: Highlight;
  }
}

/*# sourceURL=${import.meta.resolve("./objectValue.css")} */`;

// gen/front_end/panels/console/ConsolePinPane.js
import * as UI2 from "./../../ui/legacy/legacy.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/console/consolePinPane.css.js
var consolePinPane_css_default = `/*
 * Copyright 2018 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.close-button {
  position: absolute;
  top: var(--sys-size-4);
  left: var(--sys-size-2);
}

.console-pins {
  max-height: 200px;
  overflow-y: auto;
  background: var(--sys-color-cdt-base-container);

  --override-error-text-color: var(--sys-color-on-error-container);
}

.console-pins:not(:empty) {
  border-bottom: 1px solid var(--sys-color-divider);
}

.console-pin {
  position: relative;
  user-select: text;
  flex: none;
  padding: 2px 0 6px 24px;
}

.console-pin:not(:last-child) {
  border-bottom: 1px solid var(--sys-color-divider);
}

.console-pin.error-level:not(:focus-within) {
  background-color: var(--sys-color-surface-error);
  color: var(--override-error-text-color);
}

.console-pin:not(:last-child).error-level:not(:focus-within) {
  border-top: 1px solid var(--sys-color-error-outline);
  border-bottom: 1px solid var(--sys-color-error-outline);
  margin-top: -1px;
}

.console-pin-name {
  margin-left: -5px;
  margin-bottom: 1px;
  height: auto;
}

.console-pin-name,
.console-pin-preview {
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-height: 13px;
}

.console-pin-preview {
  overflow: hidden;
}

.console-pin-name:focus-within {
  background: var(--sys-color-cdt-base-container);
  border-radius: 4px;
  border: 1px solid var(--sys-color-state-focus-ring);
}

.console-pin:focus-within .console-pin-preview,
.console-pin-name:not(:focus-within, :hover) {
  opacity: 60%;
}

/*# sourceURL=${import.meta.resolve("./consolePinPane.css")} */`;

// gen/front_end/panels/console/ConsolePinPane.js
var UIStrings2 = {
  /**
   *@description A context menu item in the Console Pin Pane of the Console panel
   */
  removeExpression: "Remove expression",
  /**
   *@description A context menu item in the Console Pin Pane of the Console panel
   */
  removeAllExpressions: "Remove all expressions",
  /**
   *@description Screen reader label for delete button on a non-blank live expression
   *@example {document} PH1
   */
  removeExpressionS: "Remove expression: {PH1}",
  /**
   *@description Screen reader label for delete button on a blank live expression
   */
  removeBlankExpression: "Remove blank expression",
  /**
   *@description Text in Console Pin Pane of the Console panel
   */
  liveExpressionEditor: "Live expression editor",
  /**
   *@description Text in Console Pin Pane of the Console panel
   */
  expression: "Expression",
  /**
   *@description Side effect label title in Console Pin Pane of the Console panel
   */
  evaluateAllowingSideEffects: "Evaluate, allowing side effects",
  /**
   *@description Text of a DOM element in Console Pin Pane of the Console panel
   */
  notAvailable: "not available"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/console/ConsolePinPane.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
var elementToConsolePin = /* @__PURE__ */ new WeakMap();
var ConsolePinPane = class extends UI2.ThrottledWidget.ThrottledWidget {
  liveExpressionButton;
  focusOut;
  pins;
  pinsSetting;
  constructor(liveExpressionButton, focusOut) {
    super(true, 250);
    this.liveExpressionButton = liveExpressionButton;
    this.focusOut = focusOut;
    this.registerRequiredCSS(consolePinPane_css_default, objectValue_css_default);
    this.contentElement.classList.add("console-pins", "monospace");
    this.contentElement.addEventListener("contextmenu", this.contextMenuEventFired.bind(this), false);
    this.contentElement.setAttribute("jslog", `${VisualLogging.pane("console-pins")}`);
    this.pins = /* @__PURE__ */ new Set();
    this.pinsSetting = Common3.Settings.Settings.instance().createLocalSetting("console-pins", []);
    for (const expression of this.pinsSetting.get()) {
      this.addPin(expression);
    }
  }
  willHide() {
    super.willHide();
    for (const pin of this.pins) {
      pin.setHovered(false);
    }
  }
  savePins() {
    const toSave = Array.from(this.pins).map((pin) => pin.expression());
    this.pinsSetting.set(toSave);
  }
  contextMenuEventFired(event) {
    const contextMenu = new UI2.ContextMenu.ContextMenu(event);
    const target = UI2.UIUtils.deepElementFromEvent(event);
    if (target) {
      const targetPinElement = target.enclosingNodeOrSelfWithClass("console-pin");
      if (targetPinElement) {
        const targetPin = elementToConsolePin.get(targetPinElement);
        if (targetPin) {
          contextMenu.editSection().appendItem(i18nString2(UIStrings2.removeExpression), this.removePin.bind(this, targetPin), { jslogContext: "remove-expression" });
          targetPin.appendToContextMenu(contextMenu);
        }
      }
    }
    contextMenu.editSection().appendItem(i18nString2(UIStrings2.removeAllExpressions), this.removeAllPins.bind(this), { jslogContext: "remove-all-expressions" });
    void contextMenu.show();
  }
  removeAllPins() {
    for (const pin of this.pins) {
      this.removePin(pin);
    }
  }
  removePin(pin) {
    pin.element().remove();
    const newFocusedPin = this.focusedPinAfterDeletion(pin);
    this.pins.delete(pin);
    this.savePins();
    if (newFocusedPin) {
      void newFocusedPin.focus();
    } else {
      this.liveExpressionButton.focus();
    }
  }
  addPin(expression, userGesture) {
    const pin = new ConsolePin(expression, this, this.focusOut);
    this.contentElement.appendChild(pin.element());
    this.pins.add(pin);
    this.savePins();
    if (userGesture) {
      void pin.focus();
    }
    this.update();
  }
  focusedPinAfterDeletion(deletedPin) {
    const pinArray = Array.from(this.pins);
    for (let i = 0; i < pinArray.length; i++) {
      if (pinArray[i] === deletedPin) {
        if (pinArray.length === 1) {
          return null;
        }
        if (i === pinArray.length - 1) {
          return pinArray[i - 1];
        }
        return pinArray[i + 1];
      }
    }
    return null;
  }
  async doUpdate() {
    if (!this.pins.size || !this.isShowing()) {
      return;
    }
    if (this.isShowing()) {
      this.update();
    }
    const updatePromises = Array.from(this.pins, (pin) => pin.updatePreview());
    await Promise.all(updatePromises);
    this.updatedForTest();
  }
  updatedForTest() {
  }
};
var ConsolePin = class {
  pinPane;
  focusOut;
  pinElement;
  pinPreview;
  lastResult;
  lastExecutionContext;
  editor;
  committedExpression;
  hovered;
  lastNode;
  deletePinIcon;
  constructor(expression, pinPane, focusOut) {
    this.pinPane = pinPane;
    this.focusOut = focusOut;
    this.deletePinIcon = new Buttons.Button.Button();
    this.deletePinIcon.data = {
      variant: "icon",
      iconName: "cross",
      size: "MICRO"
      /* Buttons.Button.Size.MICRO */
    };
    this.deletePinIcon.classList.add("close-button");
    this.deletePinIcon.setAttribute("jslog", `${VisualLogging.close().track({ click: true })}`);
    this.deletePinIcon.tabIndex = 0;
    if (expression.length) {
      UI2.ARIAUtils.setLabel(this.deletePinIcon, i18nString2(UIStrings2.removeExpressionS, { PH1: expression }));
    } else {
      UI2.ARIAUtils.setLabel(this.deletePinIcon, i18nString2(UIStrings2.removeBlankExpression));
    }
    self.onInvokeElement(this.deletePinIcon, (event) => {
      pinPane.removePin(this);
      event.consume(true);
    });
    const fragment = UI2.Fragment.Fragment.build`
  <div class='console-pin'>
  ${this.deletePinIcon}
  <div class='console-pin-name' $='name' jslog="${VisualLogging.textField().track({
      change: true
    })}"></div>
  <div class='console-pin-preview' $='preview'></div>
  </div>`;
    this.pinElement = fragment.element();
    this.pinPreview = fragment.$("preview");
    const nameElement = fragment.$("name");
    UI2.Tooltip.Tooltip.install(nameElement, expression);
    elementToConsolePin.set(this.pinElement, this);
    this.lastResult = null;
    this.lastExecutionContext = null;
    this.committedExpression = expression;
    this.hovered = false;
    this.lastNode = null;
    this.editor = this.createEditor(expression, nameElement);
    this.pinPreview.addEventListener("mouseenter", this.setHovered.bind(this, true), false);
    this.pinPreview.addEventListener("mouseleave", this.setHovered.bind(this, false), false);
    this.pinPreview.addEventListener("click", (event) => {
      if (this.lastNode) {
        void Common3.Revealer.reveal(this.lastNode);
        event.consume();
      }
    }, false);
    nameElement.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.consume();
      }
    });
  }
  createEditor(doc, parent) {
    const extensions = [
      CodeMirror.EditorView.contentAttributes.of({ "aria-label": i18nString2(UIStrings2.liveExpressionEditor) }),
      CodeMirror.EditorView.lineWrapping,
      CodeMirror.javascript.javascriptLanguage,
      TextEditor.Config.showCompletionHint,
      CodeMirror.placeholder(i18nString2(UIStrings2.expression)),
      CodeMirror.keymap.of([
        {
          key: "Escape",
          run: (view) => {
            view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: this.committedExpression } });
            this.focusOut();
            return true;
          }
        },
        {
          key: "Enter",
          run: () => {
            this.focusOut();
            return true;
          }
        },
        {
          key: "Mod-Enter",
          run: () => {
            this.focusOut();
            return true;
          }
        },
        {
          key: "Tab",
          run: (view) => {
            if (CodeMirror.completionStatus(this.editor.state) !== null) {
              return false;
            }
            view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: this.committedExpression } });
            this.focusOut();
            return true;
          }
        },
        {
          key: "Shift-Tab",
          run: (view) => {
            if (CodeMirror.completionStatus(this.editor.state) !== null) {
              return false;
            }
            view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: this.committedExpression } });
            this.editor.blur();
            this.deletePinIcon.focus();
            return true;
          }
        }
      ]),
      CodeMirror.EditorView.domEventHandlers({ blur: (_e, view) => this.onBlur(view) }),
      TextEditor.Config.baseConfiguration(doc),
      TextEditor.Config.closeBrackets.instance(),
      TextEditor.Config.autocompletion.instance()
    ];
    if (Root.Runtime.Runtime.queryParam("noJavaScriptCompletion") !== "true") {
      extensions.push(TextEditor.JavaScript.completion());
    }
    const editor = new TextEditor.TextEditor.TextEditor(CodeMirror.EditorState.create({ doc, extensions }));
    parent.appendChild(editor);
    return editor;
  }
  onBlur(editor) {
    const text = editor.state.doc.toString();
    const trimmedText = text.trim();
    this.committedExpression = trimmedText;
    this.pinPane.savePins();
    if (this.committedExpression.length) {
      UI2.ARIAUtils.setLabel(this.deletePinIcon, i18nString2(UIStrings2.removeExpressionS, { PH1: this.committedExpression }));
    } else {
      UI2.ARIAUtils.setLabel(this.deletePinIcon, i18nString2(UIStrings2.removeBlankExpression));
    }
    editor.dispatch({
      selection: { anchor: trimmedText.length },
      changes: trimmedText !== text ? { from: 0, to: text.length, insert: trimmedText } : void 0
    });
  }
  setHovered(hovered) {
    if (this.hovered === hovered) {
      return;
    }
    this.hovered = hovered;
    if (!hovered && this.lastNode) {
      SDK3.OverlayModel.OverlayModel.hideDOMNodeHighlight();
    }
  }
  expression() {
    return this.committedExpression;
  }
  element() {
    return this.pinElement;
  }
  async focus() {
    const editor = this.editor;
    editor.editor.focus();
    editor.dispatch({ selection: { anchor: editor.state.doc.length } });
  }
  appendToContextMenu(contextMenu) {
    if (this.lastResult && !("error" in this.lastResult) && this.lastResult.object) {
      contextMenu.appendApplicableItems(this.lastResult.object);
      this.lastResult = null;
    }
  }
  async updatePreview() {
    if (!this.editor) {
      return;
    }
    const text = TextEditor.Config.contentIncludingHint(this.editor.editor);
    const isEditing = this.pinElement.hasFocus();
    const throwOnSideEffect = isEditing && text !== this.committedExpression;
    const timeout = throwOnSideEffect ? 250 : void 0;
    const executionContext = UI2.Context.Context.instance().flavor(SDK3.RuntimeModel.ExecutionContext);
    const { preview, result } = await ObjectUI.JavaScriptREPL.JavaScriptREPL.evaluateAndBuildPreview(
      text,
      throwOnSideEffect,
      true,
      timeout,
      !isEditing,
      "live-expression",
      true,
      true
      /* silent */
    );
    if (this.lastResult && this.lastExecutionContext) {
      this.lastExecutionContext.runtimeModel.releaseEvaluationResult(this.lastResult);
    }
    this.lastResult = result || null;
    this.lastExecutionContext = executionContext || null;
    const previewText = preview.deepTextContent();
    if (!previewText || previewText !== this.pinPreview.deepTextContent()) {
      this.pinPreview.removeChildren();
      if (result && SDK3.RuntimeModel.RuntimeModel.isSideEffectFailure(result)) {
        const sideEffectLabel = this.pinPreview.createChild("span", "object-value-calculate-value-button");
        sideEffectLabel.textContent = "(\u2026)";
        UI2.Tooltip.Tooltip.install(sideEffectLabel, i18nString2(UIStrings2.evaluateAllowingSideEffects));
      } else if (previewText) {
        this.pinPreview.appendChild(preview);
      } else if (!isEditing) {
        UI2.UIUtils.createTextChild(this.pinPreview, i18nString2(UIStrings2.notAvailable));
      }
      UI2.Tooltip.Tooltip.install(this.pinPreview, previewText);
    }
    let node = null;
    if (result && !("error" in result) && result.object.type === "object" && result.object.subtype === "node") {
      node = result.object;
    }
    if (this.hovered) {
      if (node) {
        SDK3.OverlayModel.OverlayModel.highlightObjectAsDOMNode(node);
      } else if (this.lastNode) {
        SDK3.OverlayModel.OverlayModel.hideDOMNodeHighlight();
      }
    }
    this.lastNode = node || null;
    const isError = result && !("error" in result) && result.exceptionDetails && !SDK3.RuntimeModel.RuntimeModel.isSideEffectFailure(result);
    this.pinElement.classList.toggle("error-level", Boolean(isError));
  }
};

// gen/front_end/panels/console/ConsoleSidebar.js
var ConsoleSidebar_exports = {};
__export(ConsoleSidebar_exports, {
  ConsoleSidebar: () => ConsoleSidebar,
  FilterTreeElement: () => FilterTreeElement,
  URLGroupTreeElement: () => URLGroupTreeElement
});
import * as Common4 from "./../../core/common/common.js";
import * as i18n5 from "./../../core/i18n/i18n.js";
import * as SDK4 from "./../../core/sdk/sdk.js";
import * as IconButton from "./../../ui/components/icon_button/icon_button.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
import * as VisualLogging2 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/console/consoleSidebar.css.js
var consoleSidebar_css_default = `/*
 * Copyright (c) 2017 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  overflow: auto;
}

.count {
  flex: none;
  margin: 0 var(--sys-size-3);
}

devtools-icon {
  &[name="cross-circle"] {
    color: var(--sys-color-error-bright);
  }

  &[name="warning"] {
    color: var(--icon-warning);
  }

  &[name="info"] {
    color: var(--icon-info);
  }
}

.tree-element-title {
  flex-grow: 1;
}

/*# sourceURL=${import.meta.resolve("./consoleSidebar.css")} */`;

// gen/front_end/panels/console/ConsoleSidebar.js
var UIStrings3 = {
  /**
   * @description Filter name in Console Sidebar of the Console panel. This is shown when we fail to
   * parse a URL when trying to display console messages from each URL separately. This might be
   * because the console message does not come from any particular URL. This should be translated as
   * a term that indicates 'not one of the other URLs listed here'.
   */
  other: "<other>",
  /**
   *@description Text in Console Sidebar of the Console panel to show how many user messages exist.
   */
  dUserMessages: "{n, plural, =0 {No user messages} =1 {# user message} other {# user messages}}",
  /**
   *@description Text in Console Sidebar of the Console panel to show how many messages exist.
   */
  dMessages: "{n, plural, =0 {No messages} =1 {# message} other {# messages}}",
  /**
   *@description Text in Console Sidebar of the Console panel to show how many errors exist.
   */
  dErrors: "{n, plural, =0 {No errors} =1 {# error} other {# errors}}",
  /**
   *@description Text in Console Sidebar of the Console panel to show how many warnings exist.
   */
  dWarnings: "{n, plural, =0 {No warnings} =1 {# warning} other {# warnings}}",
  /**
   *@description Text in Console Sidebar of the Console panel to show how many info messages exist.
   */
  dInfo: "{n, plural, =0 {No info} =1 {# info} other {# info}}",
  /**
   *@description Text in Console Sidebar of the Console panel to show how many verbose messages exist.
   */
  dVerbose: "{n, plural, =0 {No verbose} =1 {# verbose} other {# verbose}}"
};
var str_3 = i18n5.i18n.registerUIStrings("panels/console/ConsoleSidebar.ts", UIStrings3);
var i18nString3 = i18n5.i18n.getLocalizedString.bind(void 0, str_3);
var ConsoleSidebar = class extends Common4.ObjectWrapper.eventMixin(UI3.Widget.VBox) {
  tree;
  selectedTreeElement;
  treeElements;
  constructor() {
    super(true);
    this.setMinimumSize(125, 0);
    this.tree = new UI3.TreeOutline.TreeOutlineInShadow(
      "NavigationTree"
      /* UI.TreeOutline.TreeVariant.NAVIGATION_TREE */
    );
    this.tree.addEventListener(UI3.TreeOutline.Events.ElementSelected, this.selectionChanged.bind(this));
    this.tree.registerRequiredCSS(consoleSidebar_css_default);
    this.tree.hideOverflow();
    this.contentElement.setAttribute("jslog", `${VisualLogging2.pane("sidebar").track({ resize: true })}`);
    this.contentElement.appendChild(this.tree.element);
    this.selectedTreeElement = null;
    this.treeElements = [];
    const selectedFilterSetting = Common4.Settings.Settings.instance().createSetting("console.sidebar-selected-filter", null);
    const consoleAPIParsedFilters = [{
      key: FilterType.Source,
      text: Common4.Console.FrontendMessageSource.ConsoleAPI,
      negative: false,
      regex: void 0
    }];
    this.appendGroup("message", [], ConsoleFilter.allLevelsFilterValue(), IconButton.Icon.create("list"), selectedFilterSetting);
    this.appendGroup("user message", consoleAPIParsedFilters, ConsoleFilter.allLevelsFilterValue(), IconButton.Icon.create("profile"), selectedFilterSetting);
    this.appendGroup("error", [], ConsoleFilter.singleLevelMask(
      "error"
      /* Protocol.Log.LogEntryLevel.Error */
    ), IconButton.Icon.create("cross-circle"), selectedFilterSetting);
    this.appendGroup("warning", [], ConsoleFilter.singleLevelMask(
      "warning"
      /* Protocol.Log.LogEntryLevel.Warning */
    ), IconButton.Icon.create("warning"), selectedFilterSetting);
    this.appendGroup("info", [], ConsoleFilter.singleLevelMask(
      "info"
      /* Protocol.Log.LogEntryLevel.Info */
    ), IconButton.Icon.create("info"), selectedFilterSetting);
    this.appendGroup("verbose", [], ConsoleFilter.singleLevelMask(
      "verbose"
      /* Protocol.Log.LogEntryLevel.Verbose */
    ), IconButton.Icon.create("bug"), selectedFilterSetting);
    const selectedTreeElementName = selectedFilterSetting.get();
    const defaultTreeElement = this.treeElements.find((x) => x.name() === selectedTreeElementName) || this.treeElements[0];
    defaultTreeElement.select();
  }
  appendGroup(name, parsedFilters, levelsMask, icon, selectedFilterSetting) {
    const filter = new ConsoleFilter(name, parsedFilters, null, levelsMask);
    const treeElement = new FilterTreeElement(filter, icon, selectedFilterSetting);
    this.tree.appendChild(treeElement);
    this.treeElements.push(treeElement);
  }
  clear() {
    for (const treeElement of this.treeElements) {
      treeElement.clear();
    }
  }
  onMessageAdded(viewMessage) {
    for (const treeElement of this.treeElements) {
      treeElement.onMessageAdded(viewMessage);
    }
  }
  shouldBeVisible(viewMessage) {
    if (this.selectedTreeElement instanceof ConsoleSidebarTreeElement) {
      return this.selectedTreeElement.filter().shouldBeVisible(viewMessage);
    }
    return true;
  }
  selectionChanged(event) {
    this.selectedTreeElement = event.data;
    this.dispatchEventToListeners(
      "FilterSelected"
      /* Events.FILTER_SELECTED */
    );
  }
};
var ConsoleSidebarTreeElement = class extends UI3.TreeOutline.TreeElement {
  filterInternal;
  constructor(title, filter) {
    super(title);
    this.filterInternal = filter;
  }
  filter() {
    return this.filterInternal;
  }
};
var URLGroupTreeElement = class extends ConsoleSidebarTreeElement {
  countElement;
  messageCount;
  constructor(filter) {
    super(filter.name, filter);
    this.countElement = this.listItemElement.createChild("span", "count");
    const icon = IconButton.Icon.create("document");
    this.setLeadingIcons([icon]);
    this.messageCount = 0;
  }
  incrementAndUpdateCounter() {
    this.messageCount++;
    this.countElement.textContent = `${this.messageCount}`;
  }
};
var stringForFilterSidebarItemMap = /* @__PURE__ */ new Map([
  ["user message", UIStrings3.dUserMessages],
  ["message", UIStrings3.dMessages],
  ["error", UIStrings3.dErrors],
  ["warning", UIStrings3.dWarnings],
  ["info", UIStrings3.dInfo],
  ["verbose", UIStrings3.dVerbose]
]);
var FilterTreeElement = class extends ConsoleSidebarTreeElement {
  selectedFilterSetting;
  urlTreeElements;
  messageCount;
  uiStringForFilterCount;
  constructor(filter, icon, selectedFilterSetting) {
    super(filter.name, filter);
    this.uiStringForFilterCount = stringForFilterSidebarItemMap.get(filter.name) || "";
    this.selectedFilterSetting = selectedFilterSetting;
    this.urlTreeElements = /* @__PURE__ */ new Map();
    this.setLeadingIcons([icon]);
    this.messageCount = 0;
    this.updateCounter();
  }
  clear() {
    this.urlTreeElements.clear();
    this.removeChildren();
    this.messageCount = 0;
    this.updateCounter();
  }
  name() {
    return this.filterInternal.name;
  }
  onselect(selectedByUser) {
    this.selectedFilterSetting.set(this.filterInternal.name);
    return super.onselect(selectedByUser);
  }
  updateCounter() {
    this.title = this.updateGroupTitle(this.messageCount);
    this.setExpandable(Boolean(this.childCount()));
  }
  updateGroupTitle(messageCount) {
    if (this.uiStringForFilterCount) {
      return i18nString3(this.uiStringForFilterCount, { n: messageCount });
    }
    return "";
  }
  onMessageAdded(viewMessage) {
    const message = viewMessage.consoleMessage();
    const shouldIncrementCounter = message.type !== SDK4.ConsoleModel.FrontendMessageType.Command && message.type !== SDK4.ConsoleModel.FrontendMessageType.Result && !message.isGroupMessage();
    if (!this.filterInternal.shouldBeVisible(viewMessage) || !shouldIncrementCounter) {
      return;
    }
    const child = this.childElement(message.url);
    child.incrementAndUpdateCounter();
    this.messageCount++;
    this.updateCounter();
  }
  childElement(url) {
    const urlValue = url || null;
    let child = this.urlTreeElements.get(urlValue);
    if (child) {
      return child;
    }
    const filter = this.filterInternal.clone();
    const parsedURL = urlValue ? Common4.ParsedURL.ParsedURL.fromString(urlValue) : null;
    if (urlValue) {
      filter.name = parsedURL ? parsedURL.displayName : urlValue;
    } else {
      filter.name = i18nString3(UIStrings3.other);
    }
    filter.parsedFilters.push({ key: FilterType.Url, text: urlValue, negative: false, regex: void 0 });
    child = new URLGroupTreeElement(filter);
    if (urlValue) {
      child.tooltip = urlValue;
    }
    this.urlTreeElements.set(urlValue, child);
    this.appendChild(child);
    return child;
  }
};

// gen/front_end/panels/console/ConsoleViewport.js
var ConsoleViewport_exports = {};
__export(ConsoleViewport_exports, {
  ConsoleViewport: () => ConsoleViewport
});
import * as Platform3 from "./../../core/platform/platform.js";
import * as Components2 from "./../../ui/legacy/components/utils/utils.js";
import * as UI5 from "./../../ui/legacy/legacy.js";

// gen/front_end/panels/console/ConsoleViewMessage.js
var ConsoleViewMessage_exports = {};
__export(ConsoleViewMessage_exports, {
  ConsoleCommand: () => ConsoleCommand,
  ConsoleCommandResult: () => ConsoleCommandResult,
  ConsoleGroupViewMessage: () => ConsoleGroupViewMessage,
  ConsoleTableMessageView: () => ConsoleTableMessageView,
  ConsoleViewMessage: () => ConsoleViewMessage,
  MaxLengthForLinks: () => MaxLengthForLinks,
  concatErrorDescriptionAndIssueSummary: () => concatErrorDescriptionAndIssueSummary,
  getLongStringVisibleLength: () => getLongStringVisibleLength,
  getMaxTokenizableStringLength: () => getMaxTokenizableStringLength,
  getMessageForElement: () => getMessageForElement,
  setLongStringVisibleLength: () => setLongStringVisibleLength,
  setMaxTokenizableStringLength: () => setMaxTokenizableStringLength
});
import * as Common6 from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n7 from "./../../core/i18n/i18n.js";
import * as Platform2 from "./../../core/platform/platform.js";
import * as Root2 from "./../../core/root/root.js";
import * as SDK5 from "./../../core/sdk/sdk.js";
import * as Bindings from "./../../models/bindings/bindings.js";
import * as Logs from "./../../models/logs/logs.js";
import * as TextUtils3 from "./../../models/text_utils/text_utils.js";
import * as Workspace from "./../../models/workspace/workspace.js";
import * as Buttons2 from "./../../ui/components/buttons/buttons.js";
import * as CodeHighlighter from "./../../ui/components/code_highlighter/code_highlighter.js";
import * as IconButton2 from "./../../ui/components/icon_button/icon_button.js";
import * as IssueCounter from "./../../ui/components/issue_counter/issue_counter.js";
import * as RequestLinkIcon from "./../../ui/components/request_link_icon/request_link_icon.js";
import * as DataGrid from "./../../ui/legacy/components/data_grid/data_grid.js";
import * as ObjectUI2 from "./../../ui/legacy/components/object_ui/object_ui.js";
import * as Components from "./../../ui/legacy/components/utils/utils.js";
import * as UI4 from "./../../ui/legacy/legacy.js";
import * as VisualLogging3 from "./../../ui/visual_logging/visual_logging.js";
import * as Security from "./../security/security.js";

// gen/front_end/panels/console/consoleView.css.js
var consoleView_css_default = `/*
 * Copyright (C) 2006, 2007, 2008 Apple Inc.  All rights reserved.
 * Copyright (C) 2009 Anthony Ricaud <rik@webkit.org>
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1.  Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 * 2.  Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 * 3.  Neither the name of Apple Computer, Inc. ("Apple") nor the names of
 *     its contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE AND ITS CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL APPLE OR ITS CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

.console-view {
  background-color: var(--sys-color-cdt-base-container);
  overflow: hidden;

  --override-error-text-color: var(--sys-color-on-error-container);
  --message-corner-rounder-background: var(--sys-color-cdt-base-container);
}

.console-toolbar-container {
  display: flex;
  flex: none;
}

.console-main-toolbar {
  flex: 1 1 auto;
}

.console-sidebar-levels-info {
  margin-left: var(--sys-size-3);
  width: var(--sys-size-8);
  height: var(--sys-size-8);
}

#console-issues-counter {
  margin-top: 0;
}

.console-toolbar-container > devtools-toolbar {
  background-color: var(--sys-color-cdt-base-container);
  border-bottom: 1px solid var(--sys-color-divider);
}

.console-view-fix-select-all {
  height: 0;
  overflow: hidden;
}

.console-settings-pane {
  display: grid;
  grid-template-columns: 50% 50%;
  flex: none;
  background-color: var(--sys-color-cdt-base-container);
  border-bottom: 1px solid var(--sys-color-divider);
}

#console-messages {
  flex: 1 1;
  overflow-y: auto;
  word-wrap: break-word;
  user-select: text;
  transform: translateZ(0);
  overflow-anchor: none;  /* Chrome-specific scroll-anchoring opt-out */
  background-color: var(--sys-color-cdt-base-container);
}

#console-prompt {
  clear: right;
  position: relative;
  margin: 0 22px 0 20px;
}

.console-prompt-editor-container {
  min-height: 21px;
}

.console-message,
.console-user-command {
  clear: right;
  position: relative;
  padding: 3px 22px 1px 0;
  margin-left: 24px;
  min-height: 17px;  /* Sync with ConsoleViewMessage.js */
  flex: auto;
  display: flex;
}

.console-message > * {
  flex: auto;
}

.console-timestamp {
  color: var(--sys-color-token-subtle);
  user-select: none;
  flex: none;
  margin-right: 5px;
}

.message-level-icon,
.command-result-icon {
  position: absolute;
  left: -17px;
  top: 2px;
  user-select: none;
}

.console-message-repeat-count {
  margin: 1.4px 0 0 10px;
  flex: none;
}

.repeated-message {
  margin-left: 4px;
}

.repeated-message .message-level-icon {
  display: none;
}

.console-message-stack-trace-toggle {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: -1px;
}

.console-error-level .repeated-message,
.console-warning-level .repeated-message,
.console-verbose-level .repeated-message,
.console-info-level .repeated-message {
  display: flex;
}

.console-info {
  color: var(--sys-color-token-subtle);
  font-style: italic;
  padding-bottom: 2px;
}

.console-group .console-group > .console-group-messages {
  margin-left: 16px;
}

.console-group-title.console-from-api {
  font-weight: bold;
}

.console-group-title .console-message {
  margin-left: 12px;
}

.expand-group-icon {
  user-select: none;
  flex: none;
  position: relative;
  left: 8px;
  top: 3px;
  margin-right: 2px;
}

.console-group-title .message-level-icon {
  display: none;
}

.console-message-repeat-count .expand-group-icon {
  position: static;
  color: var(--sys-color-cdt-base-container);
  margin-left: -1px;
}

.console-group {
  position: relative;
}

.console-message-wrapper {
  display: flex;
  flex-direction: column;
  margin: 4px;
  border-radius: 5px;

  /* Console ANSI color */
  --console-color-black: #000;
  --console-color-red: #a00;
  --console-color-green: #0a0;
  --console-color-yellow: #a50;
  --console-color-blue: #00a;
  --console-color-magenta: #a0a;
  --console-color-cyan: #0aa;
  --console-color-gray: #aaa;
  --console-color-darkgray: #555;
  --console-color-lightred: #f55;
  --console-color-lightgreen: #5f5;
  --console-color-lightyellow: #ff5;
  --console-color-lightblue: #55f;
  --console-color-ightmagenta: #f5f;
  --console-color-lightcyan: #5ff;
  --console-color-white: #fff;

  &:focus {
    background-color: var(--sys-color-tonal-container);

    & ::selection {
      background-color: var(--sys-color-state-focus-select);
      color: currentcolor;
    }
  }
}

.console-row-wrapper {
  display: flex;
  flex-direction: row;
}

.theme-with-dark-background .console-message-wrapper {
  /* Dark theme console ANSI color */
  --console-color-red: rgb(237 78 76);
  --console-color-green: rgb(1 200 1);
  --console-color-yellow: rgb(210 192 87);
  --console-color-blue: rgb(39 116 240);
  --console-color-magenta: rgb(161 66 244);
  --console-color-cyan: rgb(18 181 203);
  --console-color-gray: rgb(207 208 208);
  --console-color-darkgray: rgb(137 137 137);
  --console-color-lightred: rgb(242 139 130);
  --console-color-lightgreen: rgb(161 247 181);
  --console-color-lightyellow: rgb(221 251 85);
  --console-color-lightblue: rgb(102 157 246);
  --console-color-lightmagenta: rgb(214 112 214);
  --console-color-lightcyan: rgb(132 240 255);
}

.console-message-wrapper.console-warning-level + .console-message-wrapper,
.console-message-wrapper.console-error-level + .console-message-wrapper {
  & .console-message::before,
  & .console-user-command::before {
    display: none !important; /* stylelint-disable-line declaration-no-important */
  }
}

.console-message-wrapper:not(.console-error-level, .console-warning-level) {
  & .console-message::before,
  & .console-user-command::before {
    width: calc(100% - 25px);
    content: "";
    display: block;
    position: absolute;
    top: -2px;
    border-top: 1px solid var(--sys-color-divider);
  }

  &:first-of-type .console-message::before,
  &:first-of-type .console-user-command::before {
    display: none;
  }
}

.console-message-wrapper.console-adjacent-user-command-result:not(.console-error-level, .console-warning-level) {
  border-top-width: 0;
}

.console-message-wrapper:focus + .console-message-wrapper {
  border-top-color: transparent;
}

.console-message-wrapper.console-adjacent-user-command-result:not(.console-error-level, .console-warning-level):focus {
  border-top-width: 1px;
}

.console-message-wrapper.console-adjacent-user-command-result:not(.console-error-level, .console-warning-level):focus .console-message {
  padding-top: 2px;
  min-height: 16px;
}

.console-message-wrapper.console-adjacent-user-command-result:not(.console-error-level, .console-warning-level):focus .command-result-icon {
  top: 3px;
}

.console-message-wrapper .nesting-level-marker {
  width: 14px;
  flex: 0 0 auto;
  position: relative;
  margin-bottom: -1px;
  margin-top: -1px;
  background-color: var(--sys-color-cdt-base-container);
}

.console-message-wrapper .nesting-level-marker + .console-message::after {
  position: absolute;
  left: -30px;
  top: 0;
  width: 6px;
  height: 100%;
  box-sizing: border-box;
  background-color: var(--sys-color-surface-yellow);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  content: "";
}

.console-error-level {
  background-color: var(--sys-color-surface-error);

  --message-corner-rounder-background: var(--sys-color-surface-error);
}

.console-warning-level {
  background-color: var(--sys-color-surface-yellow);

  --message-corner-rounder-background: var(--sys-color-surface-yellow);
}

.console-view-object-properties-section {
  padding: 0;
  position: relative;
  vertical-align: baseline;
  color: inherit;
  display: inline-block;
  overflow-wrap: break-word;
  max-width: 100%;
}

.info-note {
  background-color: var(--sys-color-tonal-container);
}

.info-note::before {
  content: "i";
}

.console-view-object-properties-section:not(.expanded) .info-note {
  display: none;
}

.console-system-type.console-info-level {
  color: var(--sys-color-primary);
}

#console-messages .link {
  cursor: pointer;
  text-decoration: underline;
}

#console-messages .link,
#console-messages .devtools-link:not(.invalid-link) {
  color: var(--sys-color-primary);
  word-break: break-all;
}

#console-messages .devtools-link:focus-visible {
  background-color: transparent;
}

#console-messages .resource-links {
  margin-top: -1px;
  margin-bottom: -2px;
}

.console-object-preview {
  white-space: normal;
  word-wrap: break-word;
  font-style: italic;
}

.console-object-preview .name {
  flex-shrink: 0;
}

.console-message-text {
  .object-value-node {
    display: inline-block;
  }

  .object-value-string,
  .object-value-regexp,
  .object-value-symbol {
    white-space: pre-wrap;
    word-break: break-all;
  }

  .formatted-stack-frame:has(.ignore-list-link) {
    display: var(--display-ignored-formatted-stack-frame);
    opacity: 60%;

    /* Subsequent builtin stack frames are also treated as ignored */
    & + .formatted-builtin-stack-frame {
      display: var(--display-ignored-formatted-stack-frame);
      opacity: 60%;
    }
  }
}

.console-message-stack-trace-wrapper {
  --override-display-stack-preview-toggle-link: none;

  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  &:has(div > .stack-preview-container.show-hidden-rows) {
    --display-ignored-formatted-stack-frame: inherit;
  }

  &:has(.formatted-stack-frame .ignore-list-link):has(.formatted-stack-frame .devtools-link:not(.ignore-list-link)) {
    /* If there are ignored frames and unignored frames, then we want
    to enable the show more/less links. To do that we override some
    variables to always display the structured stack trace, but possibly
    only the links at the bottom of it, as we share its show more/less links. */
    --override-display-stack-preview-toggle-link: table-row;
    --override-display-stack-preview-hidden-div: block;

    &:not(:has(div > .stack-preview-container.show-hidden-rows)) {
      --display-ignored-formatted-stack-frame: none;
    }
  }

  & > .hidden-stack-trace {
    /* Always hide the body of the structured stack trace if this class
    is set, but we may still show it for the Show more/less links at the bottom. */
    display: var(--override-display-stack-preview-hidden-div, none);

    --override-display-stack-preview-tbody: none;
  }
}

.repeated-message .console-message-stack-trace-toggle,
.repeated-message > .console-message-text {
  flex: 1;
}

.console-warning-level .console-message-text {
  color: var(--sys-color-on-surface-yellow);
}

.console-error-level .console-message-text,
.console-error-level .console-view-object-properties-section {
  color: var(--override-error-text-color) !important; /* stylelint-disable-line declaration-no-important */
}

.console-message-formatted-table {
  clear: both;
}

.console-message .source-code {
  line-height: 1.2;
}

.console-message-anchor {
  float: right;
  text-align: right;
  max-width: 100%;
  margin-left: 4px;
}

.cookie-report-anchor {
  margin-top: -3px;
  margin-bottom: -5px;
}

.console-message-nowrap-below,
.console-message-nowrap-below div,
.console-message-nowrap-below span {
  white-space: nowrap !important; /* stylelint-disable-line declaration-no-important */
}

.object-state-note {
  display: inline-block;
  width: 11px;
  height: 11px;
  color: var(--sys-color-on-tonal-container);
  text-align: center;
  border-radius: 3px;
  line-height: 13px;
  margin: 0 6px;
  font-size: 9px;
}

.console-object {
  white-space: pre-wrap;
  word-break: break-all;
}

.console-message-stack-trace-wrapper > * {
  flex: none;
}

.console-message-expand-icon {
  margin-bottom: -4px;
}

.console-searchable-view {
  max-height: 100%;
}

.console-view-pinpane {
  flex: none;
  max-height: 50%;
}

/* We are setting width and height to 0px to essentially hide the html element on the UI but visible to the screen reader.
 This html element is used by screen readers when console messages are filtered, instead of screen readers reading
 contents of the filtered messages we only want the screen readers to read the count of filtered messages. */
.message-count {
  width: 0;
  height: 0;
}

devtools-console-insight {
  margin: 9px 22px 11px 24px;
}

.hover-button {
  --width: 24px;

  align-items: center;
  border-radius: 50%;
  border: none;
  /* todo: extract to global styles and make it work with dark mode. */
  box-shadow: 0 1px 3px 1px rgb(0 0 0 / 15%), 0 1px 2px 0 rgb(0 0 0 / 30%); /* stylelint-disable-line plugin/use_theme_colors */
  box-sizing: border-box;
  background-color: var(--sys-color-tonal-container);
  color: var(--sys-color-on-tonal-container);
  font: var(--sys-typescale-body4-medium);
  height: var(--width);
  justify-content: center;
  margin: 0;
  max-height: var(--width);
  max-width: var(--width);
  min-height: var(--width);
  min-width: var(--width);
  overflow: hidden;
  padding: var(--sys-size-3) var(--sys-size-4);
  position: absolute;
  right: 6px;
  display: none;
  width: var(--width);
  z-index: 1;

  .theme-with-dark-background & {
    border: 1px solid var(--sys-color-neutral-outline);
    background-color: var(--sys-color-primary);
    color: var(--sys-color-on-primary);
  }

  & devtools-icon {
    box-sizing: border-box;
    flex-shrink: 0;
    height: var(--sys-size-8);
    min-height: var(--sys-size-8);
    min-width: var(--sys-size-8);
    width: var(--sys-size-8);

    --devtools-icon-color: var(--sys-color-on-tonal-container);
  }

  .theme-with-dark-background & devtools-icon {
    --devtools-icon-color: var(--sys-color-on-primary);
  }
}

.hover-button:focus,
.hover-button:hover {
  border-radius: 4px;
  max-width: 200px;
  transition:
    max-width var(--sys-motion-duration-short4) var(--sys-motion-easing-emphasized),
    border-radius 50ms linear;
  width: fit-content;
  gap: var(--sys-size-3);
}

.hover-button:focus-visible {
  outline: 2px solid var(--sys-color-primary);
  outline-offset: 2px;
}

.button-label {
  display: block;
  overflow: hidden;
  white-space: nowrap;

  & div {
    display: inline-block;
    vertical-align: -1px;
  }
}

.console-message-wrapper:not(.has-insight) {
  &:hover,
  &:focus,
  &.console-selected {
    .hover-button {
      display: flex;

      &:focus,
      &:hover {
        display: inline-flex;
      }
    }
  }
}

@media (forced-colors: active) {
  .console-message-expand-icon,
  .console-warning-level .expand-group-icon {
    forced-color-adjust: none;
    color: ButtonText;
  }

  .console-message-wrapper:focus,
  .console-message-wrapper:focus:last-of-type {
    forced-color-adjust: none;
    background-color: Highlight;
    border-top-color: Highlight;
    border-bottom-color: Highlight;
  }

  .console-message-wrapper:focus *,
  .console-message-wrapper:focus:last-of-type *,
  .console-message-wrapper:focus .devtools-link,
  .console-message-wrapper:focus:last-of-type .devtools-link {
    color: HighlightText !important; /* stylelint-disable-line declaration-no-important */
  }

  #console-messages .devtools-link,
  #console-messages .devtools-link:hover {
    color: linktext;
  }

  #console-messages .link:focus-visible,
  #console-messages .devtools-link:focus-visible {
    background: Highlight;
    color: HighlightText;
  }

  .console-message-wrapper:focus devtools-icon {
    color: HighlightText;
  }

  .console-message-wrapper.console-error-level:focus,
  .console-message-wrapper.console-error-level:focus:last-of-type {
    --override-error-text-color: HighlightText;
  }
}

/*# sourceURL=${import.meta.resolve("./consoleView.css")} */`;

// gen/front_end/panels/console/ErrorStackParser.js
var ErrorStackParser_exports = {};
__export(ErrorStackParser_exports, {
  augmentErrorStackWithScriptIds: () => augmentErrorStackWithScriptIds,
  parseSourcePositionsFromErrorStack: () => parseSourcePositionsFromErrorStack
});
import * as Common5 from "./../../core/common/common.js";
function parseSourcePositionsFromErrorStack(runtimeModel, stack) {
  if (!(/\n\s*at\s/.test(stack) || stack.startsWith("SyntaxError:"))) {
    return null;
  }
  const debuggerModel = runtimeModel.debuggerModel();
  const baseURL = runtimeModel.target().inspectedURL();
  const lines = stack.split("\n");
  const linkInfos = [];
  for (const line of lines) {
    const match = /^\s*at\s(async\s)?/.exec(line);
    if (!match) {
      if (linkInfos.length && linkInfos[linkInfos.length - 1].isCallFrame) {
        return null;
      }
      linkInfos.push({ line });
      continue;
    }
    const isCallFrame = true;
    let left = match[0].length;
    let right = line.length;
    let enclosedInBraces = false;
    while (line[right - 1] === ")") {
      right--;
      enclosedInBraces = true;
      do {
        left = line.indexOf("(", left);
        if (left < 0) {
          return null;
        }
        left++;
        if (!line.substring(left).startsWith("eval at ")) {
          break;
        }
        left += 8;
        right = line.lastIndexOf(", ", right) - 1;
        if (right < 0) {
          return null;
        }
      } while (true);
    }
    const linkCandidate = line.substring(left, right);
    const splitResult = Common5.ParsedURL.ParsedURL.splitLineAndColumn(linkCandidate);
    if (splitResult.url === "<anonymous>") {
      if (linkInfos.length && linkInfos[linkInfos.length - 1].isCallFrame && !linkInfos[linkInfos.length - 1].link) {
        linkInfos[linkInfos.length - 1].line += `
${line}`;
      } else {
        linkInfos.push({ line, isCallFrame });
      }
      continue;
    }
    let url = parseOrScriptMatch(debuggerModel, splitResult.url);
    if (!url && Common5.ParsedURL.ParsedURL.isRelativeURL(splitResult.url)) {
      url = parseOrScriptMatch(debuggerModel, Common5.ParsedURL.ParsedURL.completeURL(baseURL, splitResult.url));
    }
    if (!url) {
      return null;
    }
    linkInfos.push({
      line,
      isCallFrame,
      link: {
        url,
        prefix: line.substring(0, left),
        suffix: line.substring(right),
        enclosedInBraces,
        lineNumber: splitResult.lineNumber,
        columnNumber: splitResult.columnNumber
      }
    });
  }
  return linkInfos;
}
function parseOrScriptMatch(debuggerModel, url) {
  if (!url) {
    return null;
  }
  if (Common5.ParsedURL.ParsedURL.isValidUrlString(url)) {
    return url;
  }
  if (debuggerModel.scriptsForSourceURL(url).length) {
    return url;
  }
  const fileUrl = new URL(url, "file://");
  if (debuggerModel.scriptsForSourceURL(fileUrl.href).length) {
    return fileUrl.href;
  }
  return null;
}
function augmentErrorStackWithScriptIds(parsedFrames, protocolStackTrace) {
  for (const parsedFrame of parsedFrames) {
    const protocolFrame = protocolStackTrace.callFrames.find((frame) => framesMatch(parsedFrame, frame));
    if (protocolFrame && parsedFrame.link) {
      parsedFrame.link.scriptId = protocolFrame.scriptId;
    }
  }
}
function framesMatch(parsedFrame, protocolFrame) {
  if (!parsedFrame.link) {
    return false;
  }
  const { url, lineNumber, columnNumber } = parsedFrame.link;
  return url === protocolFrame.url && lineNumber === protocolFrame.lineNumber && columnNumber === protocolFrame.columnNumber;
}

// gen/front_end/panels/console/ConsoleViewMessage.js
var UIStrings4 = {
  /**
   * @description Message element text content in Console View Message of the Console panel. Shown
   * when the user tried to run console.clear() but the 'Preserve log' option is enabled, which stops
   * the log from being cleared.
   */
  consoleclearWasPreventedDueTo: "`console.clear()` was prevented due to 'Preserve log'",
  /**
   * @description Text shown in the Console panel after the user has cleared the console, which
   * removes all messages from the console so that it is empty.
   */
  consoleWasCleared: "Console was cleared",
  /**
   *@description Message element title in Console View Message of the Console panel
   *@example {Ctrl+L} PH1
   */
  clearAllMessagesWithS: "Clear all messages with {PH1}",
  /**
   *@description Message prefix in Console View Message of the Console panel
   */
  assertionFailed: "Assertion failed: ",
  /**
   *@description Message text in Console View Message of the Console panel
   *@example {console.log(1)} PH1
   */
  violationS: "`[Violation]` {PH1}",
  /**
   *@description Message text in Console View Message of the Console panel
   *@example {console.log(1)} PH1
   */
  interventionS: "`[Intervention]` {PH1}",
  /**
   *@description Message text in Console View Message of the Console panel
   *@example {console.log(1)} PH1
   */
  deprecationS: "`[Deprecation]` {PH1}",
  /**
   *@description Note title in Console View Message of the Console panel
   */
  thisValueWillNotBeCollectedUntil: "This value will not be collected until console is cleared.",
  /**
   *@description Note title in Console View Message of the Console panel
   */
  thisValueWasEvaluatedUponFirst: "This value was evaluated upon first expanding. It may have changed since then.",
  /**
   *@description Note title in Console View Message of the Console panel
   */
  functionWasResolvedFromBound: "Function was resolved from bound function.",
  /**
   * @description Shown in the Console panel when an exception is thrown when trying to access a
   * property on an object. Should be translated.
   */
  exception: "<exception>",
  /**
   *@description Text to indicate an item is a warning
   */
  warning: "Warning",
  /**
   *@description Text for errors
   */
  error: "Error",
  /**
   * @description Accessible label for an icon. The icon is used to mark console messages that
   * originate from a logpoint. Logpoints are special breakpoints that log a user-provided JavaScript
   * expression to the DevTools console.
   */
  logpoint: "Logpoint",
  /**
   * @description Accessible label for an icon. The icon is used to mark console messages that
   * originate from conditional breakpoints.
   */
  cndBreakpoint: "Conditional Breakpoint",
  /**
   * @description Announced by the screen reader to indicate how many times a particular message in
   * the console was repeated.
   */
  repeatS: "{n, plural, =1 {Repeated # time} other {Repeated # times}}",
  /**
   * @description Announced by the screen reader to indicate how many times a particular warning
   * message in the console was repeated.
   */
  warningS: "{n, plural, =1 {Warning, Repeated # time} other {Warning, Repeated # times}}",
  /**
   * @description Announced by the screen reader to indicate how many times a particular error
   * message in the console was repeated.
   */
  errorS: "{n, plural, =1 {Error, Repeated # time} other {Error, Repeated # times}}",
  /**
   *@description Text appended to grouped console messages that are related to URL requests
   */
  url: "<URL>",
  /**
   *@description Text appended to grouped console messages about tasks that took longer than N ms
   */
  tookNms: "took <N>ms",
  /**
   *@description Text appended to grouped console messages about tasks that are related to some DOM event
   */
  someEvent: "<some> event",
  /**
   *@description Text appended to grouped console messages about tasks that are related to a particular milestone
   */
  Mxx: " M<XX>",
  /**
   *@description Text appended to grouped console messages about tasks that are related to autofill completions
   */
  attribute: "<attribute>",
  /**
   *@description Text for the index of something
   */
  index: "(index)",
  /**
   *@description Text for the value of something
   */
  value: "Value",
  /**
   *@description Title of the Console tool
   */
  console: "Console",
  /**
   *@description Message to indicate a console message with a stack table is expanded
   */
  stackMessageExpanded: "Stack table expanded",
  /**
   *@description Message to indicate a console message with a stack table is collapsed
   */
  stackMessageCollapsed: "Stack table collapsed",
  /**
   *@description Message to offer insights for a console error message
   */
  explainThisError: "Understand this error",
  /**
   *@description Message to offer insights for a console warning message
   */
  explainThisWarning: "Understand this warning",
  /**
   *@description Message to offer insights for a console message
   */
  explainThisMessage: "Understand this message",
  /**
   *@description Message to offer insights for a console error message
   */
  explainThisErrorWithAI: "Understand this error. Powered by AI.",
  /**
   *@description Message to offer insights for a console warning message
   */
  explainThisWarningWithAI: "Understand this warning. Powered by AI.",
  /**
   *@description Message to offer insights for a console message
   */
  explainThisMessageWithAI: "Understand this message. Powered by AI",
  /**
   *@description Tooltip shown when user hovers over the cookie icon to explain that the button will bring the user to the cookie report
   */
  SeeIssueInCookieReport: "Click to open privacy and security panel and show third-party cookie report"
};
var str_4 = i18n7.i18n.registerUIStrings("panels/console/ConsoleViewMessage.ts", UIStrings4);
var i18nString4 = i18n7.i18n.getLocalizedString.bind(void 0, str_4);
var elementToMessage = /* @__PURE__ */ new WeakMap();
var getMessageForElement = (element) => {
  return elementToMessage.get(element);
};
var concatErrorDescriptionAndIssueSummary = (description, issueSummary) => {
  const pos = description.indexOf("\n");
  const prefix = pos === -1 ? description : description.substring(0, pos);
  const suffix = pos === -1 ? "" : description.substring(pos);
  description = `${prefix}. ${issueSummary}${suffix}`;
  return description;
};
var defaultConsoleRowHeight = 19;
var parameterToRemoteObject = (runtimeModel) => (parameter) => {
  if (parameter instanceof SDK5.RemoteObject.RemoteObject) {
    return parameter;
  }
  if (!runtimeModel) {
    return SDK5.RemoteObject.RemoteObject.fromLocalObject(parameter);
  }
  if (typeof parameter === "object") {
    return runtimeModel.createRemoteObject(parameter);
  }
  return runtimeModel.createRemoteObjectFromPrimitiveValue(parameter);
};
var EXPLAIN_HOVER_ACTION_ID = "explain.console-message.hover";
var EXPLAIN_CONTEXT_ERROR_ACTION_ID = "explain.console-message.context.error";
var EXPLAIN_CONTEXT_WARNING_ACTION_ID = "explain.console-message.context.warning";
var EXPLAIN_CONTEXT_OTHER_ACTION_ID = "explain.console-message.context.other";
var hoverButtonObserver = new IntersectionObserver((results) => {
  for (const result of results) {
    if (result.intersectionRatio > 0) {
      Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightHoverButtonShown);
    }
  }
});
var ConsoleViewMessage = class _ConsoleViewMessage {
  message;
  linkifier;
  repeatCountInternal;
  closeGroupDecorationCount;
  consoleGroupInternal;
  selectableChildren;
  messageResized;
  // The wrapper that contains consoleRowWrapper and other elements in a column.
  elementInternal;
  // The element that wraps console message elements in a row.
  consoleRowWrapper = null;
  previewFormatter;
  searchRegexInternal;
  messageIcon;
  traceExpanded;
  expandTrace;
  anchorElement;
  contentElementInternal;
  nestingLevelMarkers;
  searchHighlightNodes;
  searchHighlightNodeChanges;
  isVisibleInternal;
  cachedHeight;
  messagePrefix;
  timestampElement;
  inSimilarGroup;
  similarGroupMarker;
  lastInSimilarGroup;
  groupKeyInternal;
  repeatCountElement;
  requestResolver;
  issueResolver;
  #adjacentUserCommandResult = false;
  /** Formatting Error#stack is asynchronous. Allow tests to wait for the result */
  #formatErrorStackPromiseForTest = Promise.resolve();
  constructor(consoleMessage, linkifier, requestResolver, issueResolver, onResize) {
    this.message = consoleMessage;
    this.linkifier = linkifier;
    this.requestResolver = requestResolver;
    this.issueResolver = issueResolver;
    this.repeatCountInternal = 1;
    this.closeGroupDecorationCount = 0;
    this.selectableChildren = [];
    this.messageResized = onResize;
    this.elementInternal = null;
    this.previewFormatter = new ObjectUI2.RemoteObjectPreviewFormatter.RemoteObjectPreviewFormatter();
    this.searchRegexInternal = null;
    this.messageIcon = null;
    this.traceExpanded = false;
    this.expandTrace = null;
    this.anchorElement = null;
    this.contentElementInternal = null;
    this.nestingLevelMarkers = null;
    this.searchHighlightNodes = [];
    this.searchHighlightNodeChanges = [];
    this.isVisibleInternal = false;
    this.cachedHeight = 0;
    this.messagePrefix = "";
    this.timestampElement = null;
    this.inSimilarGroup = false;
    this.similarGroupMarker = null;
    this.lastInSimilarGroup = false;
    this.groupKeyInternal = "";
    this.repeatCountElement = null;
    this.consoleGroupInternal = null;
  }
  setInsight(insight) {
    this.elementInternal?.querySelector("devtools-console-insight")?.remove();
    this.elementInternal?.append(insight);
    this.elementInternal?.classList.toggle("has-insight", true);
    insight.addEventListener("close", () => {
      Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightClosed);
      this.elementInternal?.classList.toggle("has-insight", false);
      this.elementInternal?.removeChild(insight);
    }, { once: true });
  }
  element() {
    return this.toMessageElement();
  }
  wasShown() {
    this.isVisibleInternal = true;
  }
  onResize() {
  }
  willHide() {
    this.isVisibleInternal = false;
    this.cachedHeight = this.element().offsetHeight;
  }
  isVisible() {
    return this.isVisibleInternal;
  }
  fastHeight() {
    if (this.cachedHeight) {
      return this.cachedHeight;
    }
    return this.approximateFastHeight();
  }
  approximateFastHeight() {
    return defaultConsoleRowHeight;
  }
  consoleMessage() {
    return this.message;
  }
  formatErrorStackPromiseForTest() {
    return this.#formatErrorStackPromiseForTest;
  }
  buildMessage() {
    let messageElement;
    let messageText = this.message.messageText;
    if (this.message.source === Common6.Console.FrontendMessageSource.ConsoleAPI) {
      switch (this.message.type) {
        case "trace":
          messageElement = this.format(this.message.parameters || ["console.trace"]);
          break;
        case "clear":
          messageElement = document.createElement("span");
          messageElement.classList.add("console-info");
          if (Common6.Settings.Settings.instance().moduleSetting("preserve-console-log").get()) {
            messageElement.textContent = i18nString4(UIStrings4.consoleclearWasPreventedDueTo);
          } else {
            messageElement.textContent = i18nString4(UIStrings4.consoleWasCleared);
          }
          UI4.Tooltip.Tooltip.install(messageElement, i18nString4(UIStrings4.clearAllMessagesWithS, {
            PH1: String(UI4.ShortcutRegistry.ShortcutRegistry.instance().shortcutTitleForAction("console.clear"))
          }));
          break;
        case "dir": {
          const obj = this.message.parameters ? this.message.parameters[0] : void 0;
          const args = ["%O", obj];
          messageElement = this.format(args);
          break;
        }
        case "profile":
        case "profileEnd":
          messageElement = this.format([messageText]);
          break;
        default: {
          if (this.message.type === "assert") {
            this.messagePrefix = i18nString4(UIStrings4.assertionFailed);
          }
          if (this.message.parameters && this.message.parameters.length === 1) {
            const parameter = this.message.parameters[0];
            if (typeof parameter !== "string" && parameter.type === "string") {
              messageElement = this.tryFormatAsError(parameter.value);
            }
          }
          const args = this.message.parameters || [messageText];
          messageElement = messageElement || this.format(args);
        }
      }
    } else if (this.message.source === "network") {
      messageElement = this.formatAsNetworkRequest() || this.format([messageText]);
    } else {
      const messageInParameters = this.message.parameters && messageText === this.message.parameters[0];
      if (this.message.source === "violation") {
        messageText = i18nString4(UIStrings4.violationS, { PH1: messageText });
      } else if (this.message.source === "intervention") {
        messageText = i18nString4(UIStrings4.interventionS, { PH1: messageText });
      } else if (this.message.source === "deprecation") {
        messageText = i18nString4(UIStrings4.deprecationS, { PH1: messageText });
      }
      const args = this.message.parameters || [messageText];
      if (messageInParameters) {
        args[0] = messageText;
      }
      messageElement = this.format(args);
    }
    messageElement.classList.add("console-message-text");
    const formattedMessage = document.createElement("span");
    formattedMessage.classList.add("source-code");
    this.anchorElement = this.buildMessageAnchor();
    if (this.anchorElement) {
      formattedMessage.appendChild(this.anchorElement);
    }
    formattedMessage.appendChild(messageElement);
    return formattedMessage;
  }
  formatAsNetworkRequest() {
    const request = Logs.NetworkLog.NetworkLog.requestForConsoleMessage(this.message);
    if (!request) {
      return null;
    }
    const messageElement = document.createElement("span");
    if (this.message.level === "error") {
      UI4.UIUtils.createTextChild(messageElement, request.requestMethod + " ");
      const linkElement = Components.Linkifier.Linkifier.linkifyRevealable(request, request.url(), request.url(), void 0, void 0, "network-request");
      linkElement.tabIndex = -1;
      this.selectableChildren.push({ element: linkElement, forceSelect: () => linkElement.focus() });
      messageElement.appendChild(linkElement);
      if (request.failed) {
        UI4.UIUtils.createTextChildren(messageElement, " ", request.localizedFailDescription || "");
      }
      if (request.statusCode !== 0) {
        UI4.UIUtils.createTextChildren(messageElement, " ", String(request.statusCode));
      }
      const statusText = request.getInferredStatusText();
      if (statusText) {
        UI4.UIUtils.createTextChildren(messageElement, " (", statusText, ")");
      }
    } else {
      const messageText = this.message.messageText;
      const fragment = this.linkifyWithCustomLinkifier(messageText, (text, url, lineNumber, columnNumber) => {
        const linkElement = url === request.url() ? Components.Linkifier.Linkifier.linkifyRevealable(request, url, request.url(), void 0, void 0, "network-request") : Components.Linkifier.Linkifier.linkifyURL(url, { text, lineNumber, columnNumber });
        linkElement.tabIndex = -1;
        this.selectableChildren.push({ element: linkElement, forceSelect: () => linkElement.focus() });
        return linkElement;
      });
      messageElement.appendChild(fragment);
    }
    return messageElement;
  }
  createAffectedResourceLinks() {
    const elements = [];
    const requestId = this.message.getAffectedResources()?.requestId;
    if (requestId) {
      const icon = new RequestLinkIcon.RequestLinkIcon.RequestLinkIcon();
      icon.classList.add("resource-links");
      icon.data = {
        affectedRequest: { requestId },
        requestResolver: this.requestResolver,
        displayURL: false
      };
      elements.push(icon);
    }
    const issueId = this.message.getAffectedResources()?.issueId;
    if (issueId) {
      const icon = new IssueCounter.IssueLinkIcon.IssueLinkIcon();
      icon.classList.add("resource-links");
      icon.data = { issueId, issueResolver: this.issueResolver };
      elements.push(icon);
    }
    return elements;
  }
  #appendCookieReportButtonToElem(elem) {
    const button = new Buttons2.Button.Button();
    button.data = {
      size: "SMALL",
      variant: "icon",
      iconName: "cookie",
      jslogContext: "privacy",
      title: i18nString4(UIStrings4.SeeIssueInCookieReport)
    };
    button.addEventListener("click", () => {
      void Common6.Revealer.reveal(new Security.CookieReportView.CookieReportView());
    });
    elem.appendChild(button);
  }
  #getLinkifierMetric() {
    const request = Logs.NetworkLog.NetworkLog.requestForConsoleMessage(this.message);
    if (request?.resourceType().isStyleSheet()) {
      return Host.UserMetrics.Action.StyleSheetInitiatorLinkClicked;
    }
    return void 0;
  }
  buildMessageAnchor() {
    const runtimeModel = this.message.runtimeModel();
    if (!runtimeModel) {
      return null;
    }
    const linkify = ({ stackFrameWithBreakpoint, scriptId, stackTrace, url, line, column }) => {
      const userMetric = this.#getLinkifierMetric();
      if (stackFrameWithBreakpoint) {
        return this.linkifier.maybeLinkifyConsoleCallFrame(runtimeModel.target(), stackFrameWithBreakpoint, {
          inlineFrameIndex: 0,
          revealBreakpoint: true,
          userMetric
        });
      }
      if (scriptId) {
        return this.linkifier.linkifyScriptLocation(runtimeModel.target(), scriptId, url || Platform2.DevToolsPath.EmptyUrlString, line, { columnNumber: column, inlineFrameIndex: 0, userMetric });
      }
      if (stackTrace?.callFrames.length) {
        return this.linkifier.linkifyStackTraceTopFrame(runtimeModel.target(), stackTrace);
      }
      if (url && url !== "undefined") {
        return this.linkifier.linkifyScriptLocation(
          runtimeModel.target(),
          /* scriptId */
          null,
          url,
          line,
          { columnNumber: column, inlineFrameIndex: 0, userMetric }
        );
      }
      return null;
    };
    if (this.message.isCookieReportIssue && Root2.Runtime.hostConfig.devToolsPrivacyUI?.enabled) {
      const anchorWrapperElement = document.createElement("span");
      anchorWrapperElement.classList.add("console-message-anchor", "cookie-report-anchor");
      this.#appendCookieReportButtonToElem(anchorWrapperElement);
      UI4.UIUtils.createTextChild(anchorWrapperElement, " ");
      return anchorWrapperElement;
    }
    const anchorElement = linkify(this.message);
    if (anchorElement) {
      anchorElement.tabIndex = -1;
      this.selectableChildren.push({
        element: anchorElement,
        forceSelect: () => anchorElement.focus()
      });
      const anchorWrapperElement = document.createElement("span");
      anchorWrapperElement.classList.add("console-message-anchor");
      anchorWrapperElement.appendChild(anchorElement);
      for (const element of this.createAffectedResourceLinks()) {
        UI4.UIUtils.createTextChild(anchorWrapperElement, " ");
        anchorWrapperElement.append(element);
      }
      UI4.UIUtils.createTextChild(anchorWrapperElement, " ");
      return anchorWrapperElement;
    }
    return null;
  }
  buildMessageWithStackTrace(runtimeModel) {
    const icon = IconButton2.Icon.create("triangle-right", "console-message-expand-icon");
    const { stackTraceElement, contentElement, messageElement, clickableElement, toggleElement } = this.buildMessageHelper(runtimeModel.target(), this.message.stackTrace, icon);
    const DEBOUNCE_MS = 300;
    let debounce;
    this.expandTrace = (expand) => {
      if (expand) {
        debounce = window.setTimeout(() => {
          Host.userMetrics.actionTaken(Host.UserMetrics.Action.TraceExpanded);
        }, DEBOUNCE_MS);
      } else {
        clearTimeout(debounce);
      }
      icon.name = expand ? "triangle-down" : "triangle-right";
      stackTraceElement.classList.toggle("hidden-stack-trace", !expand);
      const stackTableState = expand ? i18nString4(UIStrings4.stackMessageExpanded) : i18nString4(UIStrings4.stackMessageCollapsed);
      UI4.ARIAUtils.setLabel(contentElement, `${messageElement.textContent} ${stackTableState}`);
      UI4.ARIAUtils.LiveAnnouncer.alert(stackTableState);
      UI4.ARIAUtils.setExpanded(clickableElement, expand);
      this.traceExpanded = expand;
    };
    const toggleStackTrace = (event) => {
      if (UI4.UIUtils.isEditing() || contentElement.hasSelection()) {
        return;
      }
      this.expandTrace && this.expandTrace(stackTraceElement.classList.contains("hidden-stack-trace"));
      event.consume();
    };
    clickableElement.addEventListener("click", toggleStackTrace, false);
    if (this.message.type === "trace" && Common6.Settings.Settings.instance().moduleSetting("console-trace-expand").get()) {
      this.expandTrace(true);
    }
    toggleElement._expandStackTraceForTest = this.expandTrace.bind(this, true);
    return toggleElement;
  }
  buildMessageWithIgnoreLinks() {
    const { toggleElement } = this.buildMessageHelper(null, void 0, null);
    return toggleElement;
  }
  buildMessageHelper(target, stackTrace, icon) {
    const toggleElement = document.createElement("div");
    toggleElement.classList.add("console-message-stack-trace-toggle");
    const contentElement = toggleElement.createChild("div", "console-message-stack-trace-wrapper");
    const messageElement = this.buildMessage();
    const clickableElement = contentElement.createChild("div");
    UI4.ARIAUtils.setExpanded(clickableElement, false);
    if (icon) {
      clickableElement.appendChild(icon);
    }
    clickableElement.tabIndex = -1;
    clickableElement.appendChild(messageElement);
    const stackTraceElement = contentElement.createChild("div");
    const stackTracePreview = Components.JSPresentationUtils.buildStackTracePreviewContents(target, this.linkifier, { stackTrace, tabStops: void 0, widthConstrained: true });
    stackTraceElement.appendChild(stackTracePreview.element);
    for (const linkElement of stackTracePreview.links) {
      this.selectableChildren.push({ element: linkElement, forceSelect: () => linkElement.focus() });
    }
    stackTraceElement.classList.add("hidden-stack-trace");
    UI4.ARIAUtils.setLabel(contentElement, `${messageElement.textContent} ${i18nString4(UIStrings4.stackMessageCollapsed)}`);
    UI4.ARIAUtils.markAsGroup(stackTraceElement);
    return { stackTraceElement, contentElement, messageElement, clickableElement, toggleElement };
  }
  format(rawParameters) {
    const formattedResult = document.createElement("span");
    if (this.messagePrefix) {
      formattedResult.createChild("span").textContent = this.messagePrefix;
    }
    if (!rawParameters.length) {
      return formattedResult;
    }
    let parameters = rawParameters.map(parameterToRemoteObject(this.message.runtimeModel()));
    const shouldFormatMessage = SDK5.RemoteObject.RemoteObject.type(parameters[0]) === "string" && (this.message.type !== SDK5.ConsoleModel.FrontendMessageType.Result || this.message.level === "error");
    if (shouldFormatMessage) {
      parameters = this.formatWithSubstitutionString(parameters[0].description, parameters.slice(1), formattedResult);
      if (parameters.length) {
        UI4.UIUtils.createTextChild(formattedResult, " ");
      }
    }
    for (let i = 0; i < parameters.length; ++i) {
      if (shouldFormatMessage && parameters[i].type === "string") {
        formattedResult.appendChild(this.linkifyStringAsFragment(parameters[i].description || ""));
      } else {
        formattedResult.appendChild(this.formatParameter(parameters[i], false, true));
      }
      if (i < parameters.length - 1) {
        UI4.UIUtils.createTextChild(formattedResult, " ");
      }
    }
    return formattedResult;
  }
  formatParameter(output, forceObjectFormat, includePreview) {
    if (output.customPreview()) {
      return new ObjectUI2.CustomPreviewComponent.CustomPreviewComponent(output).element;
    }
    const outputType = forceObjectFormat ? "object" : output.subtype || output.type;
    let element;
    switch (outputType) {
      case "error":
        element = this.formatParameterAsError(output);
        break;
      case "function":
        element = this.formatParameterAsFunction(output, includePreview);
        break;
      case "array":
      case "arraybuffer":
      case "blob":
      case "dataview":
      case "generator":
      case "iterator":
      case "map":
      case "object":
      case "promise":
      case "proxy":
      case "set":
      case "typedarray":
      case "wasmvalue":
      case "weakmap":
      case "weakset":
      case "webassemblymemory":
        element = this.formatParameterAsObject(output, includePreview);
        break;
      case "node":
        element = output.isNode() ? this.formatParameterAsNode(output) : this.formatParameterAsObject(output, false);
        break;
      case "trustedtype":
        element = this.formatParameterAsObject(output, false);
        break;
      case "string":
        element = this.formatParameterAsString(output);
        break;
      case "boolean":
      case "date":
      case "null":
      case "number":
      case "regexp":
      case "symbol":
      case "undefined":
      case "bigint":
        element = this.formatParameterAsValue(output);
        break;
      default:
        element = this.formatParameterAsValue(output);
        console.error(`Tried to format remote object of unknown type ${outputType}.`);
    }
    element.classList.add(`object-value-${outputType}`);
    element.classList.add("source-code");
    return element;
  }
  formatParameterAsValue(obj) {
    const result = document.createElement("span");
    const description = obj.description || "";
    if (description.length > getMaxTokenizableStringLength()) {
      const propertyValue = new ObjectUI2.ObjectPropertiesSection.ExpandableTextPropertyValue(document.createElement("span"), description, getLongStringVisibleLength());
      result.appendChild(propertyValue.element);
    } else {
      UI4.UIUtils.createTextChild(result, description);
    }
    result.addEventListener("contextmenu", this.contextMenuEventFired.bind(this, obj), false);
    return result;
  }
  formatParameterAsTrustedType(obj) {
    const result = document.createElement("span");
    const trustedContentSpan = document.createElement("span");
    trustedContentSpan.appendChild(this.formatParameterAsString(obj));
    trustedContentSpan.classList.add("object-value-string");
    UI4.UIUtils.createTextChild(result, `${obj.className} `);
    result.appendChild(trustedContentSpan);
    return result;
  }
  formatParameterAsObject(obj, includePreview) {
    const titleElement = document.createElement("span");
    titleElement.classList.add("console-object");
    if (includePreview && obj.preview) {
      titleElement.classList.add("console-object-preview");
      this.previewFormatter.appendObjectPreview(
        titleElement,
        obj.preview,
        false
        /* isEntry */
      );
      ObjectUI2.ObjectPropertiesSection.ObjectPropertiesSection.appendMemoryIcon(titleElement, obj);
    } else if (obj.type === "function") {
      const functionElement = titleElement.createChild("span");
      void ObjectUI2.ObjectPropertiesSection.ObjectPropertiesSection.formatObjectAsFunction(obj, functionElement, false);
      titleElement.classList.add("object-value-function");
    } else if (obj.subtype === "trustedtype") {
      titleElement.appendChild(this.formatParameterAsTrustedType(obj));
    } else {
      UI4.UIUtils.createTextChild(titleElement, obj.description || "");
    }
    if (!obj.hasChildren || obj.customPreview()) {
      return titleElement;
    }
    const note = titleElement.createChild("span", "object-state-note info-note");
    if (this.message.type === SDK5.ConsoleModel.FrontendMessageType.QueryObjectResult) {
      UI4.Tooltip.Tooltip.install(note, i18nString4(UIStrings4.thisValueWillNotBeCollectedUntil));
    } else {
      UI4.Tooltip.Tooltip.install(note, i18nString4(UIStrings4.thisValueWasEvaluatedUponFirst));
    }
    const section = new ObjectUI2.ObjectPropertiesSection.ObjectPropertiesSection(obj, titleElement, this.linkifier);
    section.element.classList.add("console-view-object-properties-section");
    section.enableContextMenu();
    section.setShowSelectionOnKeyboardFocus(true, true);
    this.selectableChildren.push(section);
    section.addEventListener(UI4.TreeOutline.Events.ElementAttached, this.messageResized);
    section.addEventListener(UI4.TreeOutline.Events.ElementExpanded, this.messageResized);
    section.addEventListener(UI4.TreeOutline.Events.ElementCollapsed, this.messageResized);
    return section.element;
  }
  formatParameterAsFunction(originalFunction, includePreview) {
    const result = document.createElement("span");
    void SDK5.RemoteObject.RemoteFunction.objectAsFunction(originalFunction).targetFunction().then(formatTargetFunction.bind(this));
    return result;
    function formatTargetFunction(targetFunction) {
      const functionElement = document.createElement("span");
      const promise = ObjectUI2.ObjectPropertiesSection.ObjectPropertiesSection.formatObjectAsFunction(targetFunction, functionElement, true, includePreview);
      result.appendChild(functionElement);
      if (targetFunction !== originalFunction) {
        const note = result.createChild("span", "object-state-note info-note");
        UI4.Tooltip.Tooltip.install(note, i18nString4(UIStrings4.functionWasResolvedFromBound));
      }
      result.addEventListener("contextmenu", this.contextMenuEventFired.bind(this, originalFunction), false);
      void promise.then(() => this.formattedParameterAsFunctionForTest());
    }
  }
  formattedParameterAsFunctionForTest() {
  }
  contextMenuEventFired(obj, event) {
    const contextMenu = new UI4.ContextMenu.ContextMenu(event);
    contextMenu.appendApplicableItems(obj);
    void contextMenu.show();
  }
  renderPropertyPreviewOrAccessor(object, property, propertyPath) {
    if (property.type === "accessor") {
      return this.formatAsAccessorProperty(object, propertyPath.map((property2) => property2.name.toString()), false);
    }
    return this.previewFormatter.renderPropertyPreview(property.type, "subtype" in property ? property.subtype : void 0, null, property.value);
  }
  formatParameterAsNode(remoteObject) {
    const result = document.createElement("span");
    const domModel = remoteObject.runtimeModel().target().model(SDK5.DOMModel.DOMModel);
    if (!domModel) {
      return result;
    }
    void domModel.pushObjectAsNodeToFrontend(remoteObject).then(async (node) => {
      if (!node) {
        result.appendChild(this.formatParameterAsObject(remoteObject, false));
        return;
      }
      const renderResult = await UI4.UIUtils.Renderer.render(node);
      if (renderResult) {
        if (renderResult.tree) {
          this.selectableChildren.push(renderResult.tree);
          renderResult.tree.addEventListener(UI4.TreeOutline.Events.ElementAttached, this.messageResized);
          renderResult.tree.addEventListener(UI4.TreeOutline.Events.ElementExpanded, this.messageResized);
          renderResult.tree.addEventListener(UI4.TreeOutline.Events.ElementCollapsed, this.messageResized);
        }
        result.appendChild(renderResult.node);
      } else {
        result.appendChild(this.formatParameterAsObject(remoteObject, false));
      }
      this.formattedParameterAsNodeForTest();
    });
    return result;
  }
  formattedParameterAsNodeForTest() {
  }
  formatParameterAsString(output) {
    const description = output.description ?? "";
    const text = Platform2.StringUtilities.formatAsJSLiteral(description);
    const result = document.createElement("span");
    result.addEventListener("contextmenu", this.contextMenuEventFired.bind(this, output), false);
    result.appendChild(this.linkifyStringAsFragment(text));
    return result;
  }
  formatParameterAsError(output) {
    const result = document.createElement("span");
    const formatErrorStack = async (errorObj, includeCausedByPrefix) => {
      const error = SDK5.RemoteObject.RemoteError.objectAsError(errorObj);
      const [details, cause] = await Promise.all([error.exceptionDetails(), error.cause()]);
      let errorElement = this.tryFormatAsError(error.errorStack, details);
      if (!errorElement) {
        errorElement = document.createElement("span");
        errorElement.append(this.linkifyStringAsFragment(error.errorStack));
      }
      if (includeCausedByPrefix) {
        const causeElement = document.createElement("div");
        causeElement.append("Caused by: ", errorElement);
        result.appendChild(causeElement);
      } else {
        result.appendChild(errorElement);
      }
      if (cause && cause.subtype === "error") {
        await formatErrorStack(
          cause,
          /* includeCausedByPrefix */
          true
        );
      } else if (cause && cause.type === "string") {
        const stringCauseElement = document.createElement("div");
        stringCauseElement.append(`Caused by: ${cause.value}`);
        result.append(stringCauseElement);
      }
    };
    this.#formatErrorStackPromiseForTest = formatErrorStack(
      output,
      /* includeCausedByPrefix */
      false
    );
    return result;
  }
  formatAsArrayEntry(output) {
    return this.previewFormatter.renderPropertyPreview(output.type, output.subtype, output.className, output.description);
  }
  formatAsAccessorProperty(object, propertyPath, isArrayEntry) {
    const rootElement = ObjectUI2.ObjectPropertiesSection.ObjectPropertyTreeElement.createRemoteObjectAccessorPropertySpan(object, propertyPath, onInvokeGetterClick.bind(this));
    function onInvokeGetterClick(result) {
      const wasThrown = result.wasThrown;
      const object2 = result.object;
      if (!object2) {
        return;
      }
      rootElement.removeChildren();
      if (wasThrown) {
        const element = rootElement.createChild("span");
        element.textContent = i18nString4(UIStrings4.exception);
        UI4.Tooltip.Tooltip.install(element, object2.description);
      } else if (isArrayEntry) {
        rootElement.appendChild(this.formatAsArrayEntry(object2));
      } else {
        const maxLength = 100;
        const type = object2.type;
        const subtype = object2.subtype;
        let description = "";
        if (type !== "function" && object2.description) {
          if (type === "string" || subtype === "regexp" || subtype === "trustedtype") {
            description = Platform2.StringUtilities.trimMiddle(object2.description, maxLength);
          } else {
            description = Platform2.StringUtilities.trimEndWithMaxLength(object2.description, maxLength);
          }
        }
        rootElement.appendChild(this.previewFormatter.renderPropertyPreview(type, subtype, object2.className, description));
      }
    }
    return rootElement;
  }
  formatWithSubstitutionString(formatString, parameters, formattedResult) {
    const currentStyle = /* @__PURE__ */ new Map();
    const { tokens, args } = format(formatString, parameters);
    for (const token of tokens) {
      switch (token.type) {
        case "generic": {
          formattedResult.append(this.formatParameter(
            token.value,
            true,
            false
            /* includePreview */
          ));
          break;
        }
        case "optimal": {
          formattedResult.append(this.formatParameter(
            token.value,
            false,
            true
            /* includePreview */
          ));
          break;
        }
        case "string": {
          if (currentStyle.size === 0) {
            formattedResult.append(this.linkifyStringAsFragment(token.value));
          } else {
            const lines = token.value.split("\n");
            for (let i = 0; i < lines.length; i++) {
              if (i > 0) {
                formattedResult.append(document.createElement("br"));
              }
              const wrapper = document.createElement("span");
              wrapper.style.setProperty("contain", "paint");
              wrapper.style.setProperty("display", "inline-block");
              wrapper.style.setProperty("max-width", "100%");
              wrapper.appendChild(this.linkifyStringAsFragment(lines[i]));
              for (const [property, { value, priority }] of currentStyle) {
                wrapper.style.setProperty(property, value, priority);
              }
              formattedResult.append(wrapper);
            }
          }
          break;
        }
        case "style":
          updateStyle(currentStyle, token.value);
          break;
      }
    }
    return args;
  }
  matchesFilterRegex(regexObject) {
    regexObject.lastIndex = 0;
    const contentElement = this.contentElement();
    const anchorText = this.anchorElement ? this.anchorElement.deepTextContent() : "";
    return Boolean(anchorText) && regexObject.test(anchorText.trim()) || regexObject.test(contentElement.deepTextContent().slice(anchorText.length));
  }
  matchesFilterText(filter) {
    const text = this.contentElement().deepTextContent();
    return text.toLowerCase().includes(filter.toLowerCase());
  }
  updateTimestamp() {
    if (!this.contentElementInternal) {
      return;
    }
    if (Common6.Settings.Settings.instance().moduleSetting("console-timestamps-enabled").get()) {
      if (!this.timestampElement) {
        this.timestampElement = document.createElement("span");
        this.timestampElement.classList.add("console-timestamp");
      }
      this.timestampElement.textContent = UI4.UIUtils.formatTimestamp(this.message.timestamp, false) + " ";
      UI4.Tooltip.Tooltip.install(this.timestampElement, UI4.UIUtils.formatTimestamp(this.message.timestamp, true));
      this.contentElementInternal.insertBefore(this.timestampElement, this.contentElementInternal.firstChild);
    } else if (this.timestampElement) {
      this.timestampElement.remove();
      this.timestampElement = null;
    }
  }
  nestingLevel() {
    let nestingLevel = 0;
    for (let group = this.consoleGroup(); group !== null; group = group.consoleGroup()) {
      nestingLevel++;
    }
    return nestingLevel;
  }
  setConsoleGroup(group) {
    this.consoleGroupInternal = group;
  }
  clearConsoleGroup() {
    this.consoleGroupInternal = null;
  }
  consoleGroup() {
    return this.consoleGroupInternal;
  }
  setInSimilarGroup(inSimilarGroup, isLast) {
    this.inSimilarGroup = inSimilarGroup;
    this.lastInSimilarGroup = inSimilarGroup && Boolean(isLast);
    if (this.similarGroupMarker && !inSimilarGroup) {
      this.similarGroupMarker.remove();
      this.similarGroupMarker = null;
    } else if (this.elementInternal && !this.similarGroupMarker && inSimilarGroup) {
      this.similarGroupMarker = document.createElement("div");
      this.similarGroupMarker.classList.add("nesting-level-marker");
      this.consoleRowWrapper?.insertBefore(this.similarGroupMarker, this.consoleRowWrapper.firstChild);
      this.similarGroupMarker.classList.toggle("group-closed", this.lastInSimilarGroup);
    }
  }
  isLastInSimilarGroup() {
    return Boolean(this.inSimilarGroup) && Boolean(this.lastInSimilarGroup);
  }
  resetCloseGroupDecorationCount() {
    if (!this.closeGroupDecorationCount) {
      return;
    }
    this.closeGroupDecorationCount = 0;
    this.updateCloseGroupDecorations();
  }
  incrementCloseGroupDecorationCount() {
    ++this.closeGroupDecorationCount;
    this.updateCloseGroupDecorations();
  }
  updateCloseGroupDecorations() {
    if (!this.nestingLevelMarkers) {
      return;
    }
    for (let i = 0, n = this.nestingLevelMarkers.length; i < n; ++i) {
      const marker = this.nestingLevelMarkers[i];
      marker.classList.toggle("group-closed", n - i <= this.closeGroupDecorationCount);
    }
  }
  focusedChildIndex() {
    if (!this.selectableChildren.length) {
      return -1;
    }
    return this.selectableChildren.findIndex((child) => child.element.hasFocus());
  }
  onKeyDown(event) {
    if (UI4.UIUtils.isEditing() || !this.elementInternal || !this.elementInternal.hasFocus() || this.elementInternal.hasSelection()) {
      return;
    }
    if (this.maybeHandleOnKeyDown(event)) {
      event.consume(true);
    }
  }
  maybeHandleOnKeyDown(event) {
    const focusedChildIndex = this.focusedChildIndex();
    const isWrapperFocused = focusedChildIndex === -1;
    if (this.expandTrace && isWrapperFocused) {
      if (event.key === "ArrowLeft" && this.traceExpanded || event.key === "ArrowRight" && !this.traceExpanded) {
        this.expandTrace(!this.traceExpanded);
        return true;
      }
    }
    if (!this.selectableChildren.length) {
      return false;
    }
    if (event.key === "ArrowLeft") {
      this.elementInternal && this.elementInternal.focus();
      return true;
    }
    if (event.key === "ArrowRight") {
      if (isWrapperFocused && this.selectNearestVisibleChild(0)) {
        return true;
      }
    }
    if (event.key === "ArrowUp") {
      const firstVisibleChild = this.nearestVisibleChild(0);
      if (this.selectableChildren[focusedChildIndex] === firstVisibleChild && firstVisibleChild) {
        this.elementInternal && this.elementInternal.focus();
        return true;
      }
      if (this.selectNearestVisibleChild(
        focusedChildIndex - 1,
        true
        /* backwards */
      )) {
        return true;
      }
    }
    if (event.key === "ArrowDown") {
      if (isWrapperFocused && this.selectNearestVisibleChild(0)) {
        return true;
      }
      if (!isWrapperFocused && this.selectNearestVisibleChild(focusedChildIndex + 1)) {
        return true;
      }
    }
    return false;
  }
  selectNearestVisibleChild(fromIndex, backwards) {
    const nearestChild = this.nearestVisibleChild(fromIndex, backwards);
    if (nearestChild) {
      nearestChild.forceSelect();
      return true;
    }
    return false;
  }
  nearestVisibleChild(fromIndex, backwards) {
    const childCount = this.selectableChildren.length;
    if (fromIndex < 0 || fromIndex >= childCount) {
      return null;
    }
    const direction = backwards ? -1 : 1;
    let index = fromIndex;
    while (!this.selectableChildren[index].element.offsetParent) {
      index += direction;
      if (index < 0 || index >= childCount) {
        return null;
      }
    }
    return this.selectableChildren[index];
  }
  focusLastChildOrSelf() {
    if (this.elementInternal && !this.selectNearestVisibleChild(
      this.selectableChildren.length - 1,
      true
      /* backwards */
    )) {
      this.elementInternal.focus();
    }
  }
  setContentElement(element) {
    console.assert(!this.contentElementInternal, "Cannot set content element twice");
    this.contentElementInternal = element;
  }
  getContentElement() {
    return this.contentElementInternal;
  }
  contentElement() {
    if (this.contentElementInternal) {
      return this.contentElementInternal;
    }
    const contentElement = document.createElement("div");
    contentElement.classList.add("console-message");
    if (this.messageIcon) {
      contentElement.appendChild(this.messageIcon);
    }
    this.contentElementInternal = contentElement;
    const runtimeModel = this.message.runtimeModel();
    let formattedMessage;
    const shouldIncludeTrace = Boolean(this.message.stackTrace) && (this.message.source === "network" || this.message.source === "violation" || this.message.level === "error" || this.message.level === "warning" || this.message.type === "trace");
    if (runtimeModel && shouldIncludeTrace) {
      formattedMessage = this.buildMessageWithStackTrace(runtimeModel);
    } else {
      formattedMessage = this.buildMessageWithIgnoreLinks();
    }
    contentElement.appendChild(formattedMessage);
    this.updateTimestamp();
    return this.contentElementInternal;
  }
  toMessageElement() {
    if (this.elementInternal) {
      return this.elementInternal;
    }
    this.elementInternal = document.createElement("div");
    this.elementInternal.tabIndex = -1;
    this.elementInternal.addEventListener("keydown", this.onKeyDown.bind(this));
    this.updateMessageElement();
    this.elementInternal.classList.toggle("console-adjacent-user-command-result", this.#adjacentUserCommandResult);
    return this.elementInternal;
  }
  updateMessageElement() {
    if (!this.elementInternal) {
      return;
    }
    this.elementInternal.className = "console-message-wrapper";
    this.elementInternal.setAttribute("jslog", `${VisualLogging3.item("console-message").track({
      click: true,
      keydown: "ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Enter|Space|Home|End"
    })}`);
    this.elementInternal.removeChildren();
    this.consoleRowWrapper = this.elementInternal.createChild("div");
    this.consoleRowWrapper.classList.add("console-row-wrapper");
    if (this.message.isGroupStartMessage()) {
      this.elementInternal.classList.add("console-group-title");
    }
    if (this.message.source === Common6.Console.FrontendMessageSource.ConsoleAPI) {
      this.elementInternal.classList.add("console-from-api");
    }
    if (this.inSimilarGroup) {
      this.similarGroupMarker = this.consoleRowWrapper.createChild("div", "nesting-level-marker");
      this.similarGroupMarker.classList.toggle("group-closed", this.lastInSimilarGroup);
    }
    this.nestingLevelMarkers = [];
    for (let i = 0; i < this.nestingLevel(); ++i) {
      this.nestingLevelMarkers.push(this.consoleRowWrapper.createChild("div", "nesting-level-marker"));
    }
    this.updateCloseGroupDecorations();
    elementToMessage.set(this.elementInternal, this);
    switch (this.message.level) {
      case "verbose":
        this.elementInternal.classList.add("console-verbose-level");
        UI4.ARIAUtils.setLabel(this.elementInternal, this.text);
        break;
      case "info":
        this.elementInternal.classList.add("console-info-level");
        if (this.message.type === SDK5.ConsoleModel.FrontendMessageType.System) {
          this.elementInternal.classList.add("console-system-type");
        }
        UI4.ARIAUtils.setLabel(this.elementInternal, this.text);
        break;
      case "warning":
        this.elementInternal.classList.add("console-warning-level");
        this.elementInternal.role = "log";
        UI4.ARIAUtils.setLabel(this.elementInternal, this.text);
        break;
      case "error":
        this.elementInternal.classList.add("console-error-level");
        this.elementInternal.role = "log";
        UI4.ARIAUtils.setLabel(this.elementInternal, this.text);
        break;
    }
    this.updateMessageIcon();
    if (this.shouldRenderAsWarning()) {
      this.elementInternal.classList.add("console-warning-level");
    }
    this.consoleRowWrapper.appendChild(this.contentElement());
    if (UI4.ActionRegistry.ActionRegistry.instance().hasAction(EXPLAIN_HOVER_ACTION_ID) && this.shouldShowInsights()) {
      Host.userMetrics.actionTaken(Host.UserMetrics.Action.InsightConsoleMessageShown);
      this.consoleRowWrapper.append(this.#createHoverButton());
    }
    if (this.repeatCountInternal > 1) {
      this.showRepeatCountElement();
    }
  }
  shouldShowInsights() {
    if (this.message.source === Common6.Console.FrontendMessageSource.ConsoleAPI && this.message.stackTrace?.callFrames[0]?.url === "") {
      return false;
    }
    if (this.message.messageText === "" || this.message.source === Common6.Console.FrontendMessageSource.SELF_XSS) {
      return false;
    }
    return this.message.level === "error" || this.message.level === "warning";
  }
  getExplainLabel() {
    if (this.message.level === "error") {
      return i18nString4(UIStrings4.explainThisError);
    }
    if (this.message.level === "warning") {
      return i18nString4(UIStrings4.explainThisWarning);
    }
    return i18nString4(UIStrings4.explainThisMessage);
  }
  #getExplainAriaLabel() {
    if (this.message.level === "error") {
      return i18nString4(UIStrings4.explainThisErrorWithAI);
    }
    if (this.message.level === "warning") {
      return i18nString4(UIStrings4.explainThisWarningWithAI);
    }
    return i18nString4(UIStrings4.explainThisMessageWithAI);
  }
  getExplainActionId() {
    if (this.message.level === "error") {
      return EXPLAIN_CONTEXT_ERROR_ACTION_ID;
    }
    if (this.message.level === "warning") {
      return EXPLAIN_CONTEXT_WARNING_ACTION_ID;
    }
    return EXPLAIN_CONTEXT_OTHER_ACTION_ID;
  }
  #createHoverButton() {
    const icon = new IconButton2.Icon.Icon();
    icon.data = {
      iconName: "lightbulb-spark",
      color: "var(--devtools-icon-color)",
      width: "16px",
      height: "16px"
    };
    const button = document.createElement("button");
    button.append(icon);
    button.onclick = (event) => {
      event.stopPropagation();
      UI4.Context.Context.instance().setFlavor(_ConsoleViewMessage, this);
      const action2 = UI4.ActionRegistry.ActionRegistry.instance().getAction(EXPLAIN_HOVER_ACTION_ID);
      void action2.execute();
    };
    const label = document.createElement("div");
    label.classList.add("button-label");
    const text = document.createElement("div");
    text.innerText = this.getExplainLabel();
    label.append(text);
    button.append(label);
    button.classList.add("hover-button");
    button.ariaLabel = this.#getExplainAriaLabel();
    button.tabIndex = 0;
    button.setAttribute("jslog", `${VisualLogging3.action(EXPLAIN_HOVER_ACTION_ID).track({ click: true })}`);
    hoverButtonObserver.observe(button);
    return button;
  }
  shouldRenderAsWarning() {
    return (this.message.level === "verbose" || this.message.level === "info") && (this.message.source === "violation" || this.message.source === "deprecation" || this.message.source === "intervention" || this.message.source === "recommendation");
  }
  updateMessageIcon() {
    if (this.messageIcon) {
      this.messageIcon.remove();
      this.messageIcon = null;
    }
    let color = "";
    let iconName = "";
    let accessibleName = "";
    if (this.message.level === "warning") {
      color = "var(--icon-warning)";
      iconName = "warning-filled";
      accessibleName = i18nString4(UIStrings4.warning);
    } else if (this.message.level === "error") {
      color = "var(--icon-error)";
      iconName = "cross-circle-filled";
      accessibleName = i18nString4(UIStrings4.error);
    } else if (this.message.originatesFromLogpoint) {
      iconName = "console-logpoint";
      accessibleName = i18nString4(UIStrings4.logpoint);
    } else if (this.message.originatesFromConditionalBreakpoint) {
      iconName = "console-conditional-breakpoint";
      accessibleName = i18nString4(UIStrings4.cndBreakpoint);
    }
    if (!iconName) {
      return;
    }
    this.messageIcon = new IconButton2.Icon.Icon();
    this.messageIcon.data = {
      iconName,
      color,
      width: "14px",
      height: "14px"
    };
    this.messageIcon.classList.add("message-level-icon");
    if (this.contentElementInternal) {
      this.contentElementInternal.insertBefore(this.messageIcon, this.contentElementInternal.firstChild);
    }
    UI4.ARIAUtils.setLabel(this.messageIcon, accessibleName);
  }
  setAdjacentUserCommandResult(adjacentUserCommandResult) {
    this.#adjacentUserCommandResult = adjacentUserCommandResult;
    this.elementInternal?.classList.toggle("console-adjacent-user-command-result", this.#adjacentUserCommandResult);
  }
  repeatCount() {
    return this.repeatCountInternal || 1;
  }
  resetIncrementRepeatCount() {
    this.repeatCountInternal = 1;
    if (!this.repeatCountElement) {
      return;
    }
    this.repeatCountElement.remove();
    if (this.contentElementInternal) {
      this.contentElementInternal.classList.remove("repeated-message");
    }
    this.repeatCountElement = null;
  }
  incrementRepeatCount() {
    this.repeatCountInternal++;
    this.showRepeatCountElement();
  }
  setRepeatCount(repeatCount) {
    this.repeatCountInternal = repeatCount;
    this.showRepeatCountElement();
  }
  showRepeatCountElement() {
    if (!this.elementInternal) {
      return;
    }
    if (!this.repeatCountElement) {
      this.repeatCountElement = document.createElement("dt-small-bubble");
      this.repeatCountElement.classList.add("console-message-repeat-count");
      switch (this.message.level) {
        case "warning":
          this.repeatCountElement.type = "warning";
          break;
        case "error":
          this.repeatCountElement.type = "error";
          break;
        case "verbose":
          this.repeatCountElement.type = "verbose";
          break;
        default:
          this.repeatCountElement.type = "info";
      }
      if (this.shouldRenderAsWarning()) {
        this.repeatCountElement.type = "warning";
      }
      this.consoleRowWrapper?.insertBefore(this.repeatCountElement, this.contentElementInternal);
      this.contentElement().classList.add("repeated-message");
    }
    this.repeatCountElement.textContent = `${this.repeatCountInternal}`;
    let accessibleName;
    if (this.message.level === "warning") {
      accessibleName = i18nString4(UIStrings4.warningS, { n: this.repeatCountInternal });
    } else if (this.message.level === "error") {
      accessibleName = i18nString4(UIStrings4.errorS, { n: this.repeatCountInternal });
    } else {
      accessibleName = i18nString4(UIStrings4.repeatS, { n: this.repeatCountInternal });
    }
    UI4.ARIAUtils.setLabel(this.repeatCountElement, accessibleName);
  }
  get text() {
    return this.message.messageText;
  }
  toExportString() {
    const lines = [];
    const nodes = this.contentElement().childTextNodes();
    const messageContent = nodes.map(Components.Linkifier.Linkifier.untruncatedNodeText).join("");
    for (let i = 0; i < this.repeatCount(); ++i) {
      lines.push(messageContent);
    }
    return lines.join("\n");
  }
  toMessageTextString() {
    const root = this.contentElement();
    const consoleText = root.querySelector(".console-message-text");
    if (consoleText) {
      return consoleText.deepTextContent().trim();
    }
    return this.consoleMessage().messageText;
  }
  setSearchRegex(regex) {
    if (this.searchHighlightNodeChanges?.length) {
      UI4.UIUtils.revertDomChanges(this.searchHighlightNodeChanges);
    }
    this.searchRegexInternal = regex;
    this.searchHighlightNodes = [];
    this.searchHighlightNodeChanges = [];
    if (!this.searchRegexInternal) {
      return;
    }
    const text = this.contentElement().deepTextContent();
    let match;
    this.searchRegexInternal.lastIndex = 0;
    const sourceRanges = [];
    while ((match = this.searchRegexInternal.exec(text)) && match[0]) {
      sourceRanges.push(new TextUtils3.TextRange.SourceRange(match.index, match[0].length));
    }
    if (sourceRanges.length) {
      this.searchHighlightNodes = UI4.UIUtils.highlightSearchResults(this.contentElement(), sourceRanges, this.searchHighlightNodeChanges);
    }
  }
  searchRegex() {
    return this.searchRegexInternal;
  }
  searchCount() {
    return this.searchHighlightNodes.length;
  }
  searchHighlightNode(index) {
    return this.searchHighlightNodes[index];
  }
  async getInlineFrames(debuggerModel, url, lineNumber, columnNumber) {
    const debuggerWorkspaceBinding = Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance();
    const projects = Workspace.Workspace.WorkspaceImpl.instance().projects();
    const uiSourceCodes = projects.map((project) => project.uiSourceCodeForURL(url)).flat().filter((f) => !!f);
    const scripts = uiSourceCodes.map((uiSourceCode) => debuggerWorkspaceBinding.scriptsForUISourceCode(uiSourceCode)).flat();
    if (scripts.length) {
      const location = new SDK5.DebuggerModel.Location(debuggerModel, scripts[0].scriptId, lineNumber || 0, columnNumber);
      const functionInfo = await debuggerWorkspaceBinding.pluginManager.getFunctionInfo(scripts[0], location);
      return functionInfo && "frames" in functionInfo ? functionInfo : { frames: [] };
    }
    return { frames: [] };
  }
  // Expand inline stack frames in the formatted error in the stackTrace element, inserting new elements before the
  // insertBefore anchor.
  async expandInlineStackFrames(debuggerModel, prefix, suffix, url, lineNumber, columnNumber, stackTrace, insertBefore) {
    const { frames } = await this.getInlineFrames(debuggerModel, url, lineNumber, columnNumber);
    if (!frames.length) {
      return false;
    }
    for (let f = 0; f < frames.length; ++f) {
      const { name } = frames[f];
      const formattedLine = document.createElement("span");
      formattedLine.appendChild(this.linkifyStringAsFragment(`${prefix} ${name} (`));
      const scriptLocationLink = this.linkifier.linkifyScriptLocation(debuggerModel.target(), null, url, lineNumber, { columnNumber, inlineFrameIndex: f });
      scriptLocationLink.tabIndex = -1;
      this.selectableChildren.push({ element: scriptLocationLink, forceSelect: () => scriptLocationLink.focus() });
      formattedLine.appendChild(scriptLocationLink);
      formattedLine.appendChild(this.linkifyStringAsFragment(suffix));
      formattedLine.classList.add("formatted-stack-frame");
      stackTrace.insertBefore(formattedLine, insertBefore);
    }
    return true;
  }
  createScriptLocationLinkForSyntaxError(debuggerModel, exceptionDetails) {
    const { scriptId, lineNumber, columnNumber } = exceptionDetails;
    if (!scriptId) {
      return;
    }
    const url = exceptionDetails.url || debuggerModel.scriptForId(scriptId)?.sourceURL;
    if (!url) {
      return;
    }
    const scriptLocationLink = this.linkifier.linkifyScriptLocation(debuggerModel.target(), exceptionDetails.scriptId || null, url, lineNumber, {
      columnNumber,
      inlineFrameIndex: 0,
      showColumnNumber: true
    });
    scriptLocationLink.tabIndex = -1;
    return scriptLocationLink;
  }
  tryFormatAsError(string, exceptionDetails) {
    const runtimeModel = this.message.runtimeModel();
    if (!runtimeModel) {
      return null;
    }
    const issueSummary = exceptionDetails?.exceptionMetaData?.issueSummary;
    if (typeof issueSummary === "string") {
      string = concatErrorDescriptionAndIssueSummary(string, issueSummary);
    }
    const linkInfos = parseSourcePositionsFromErrorStack(runtimeModel, string);
    if (!linkInfos?.length) {
      return null;
    }
    if (exceptionDetails?.stackTrace) {
      augmentErrorStackWithScriptIds(linkInfos, exceptionDetails.stackTrace);
    }
    const debuggerModel = runtimeModel.debuggerModel();
    const formattedResult = document.createElement("span");
    for (let i = 0; i < linkInfos.length; ++i) {
      const newline = i < linkInfos.length - 1 ? "\n" : "";
      const { line, link, isCallFrame } = linkInfos[i];
      if (!link && exceptionDetails && line.startsWith("SyntaxError")) {
        formattedResult.appendChild(this.linkifyStringAsFragment(line));
        const maybeScriptLocation = this.createScriptLocationLinkForSyntaxError(debuggerModel, exceptionDetails);
        if (maybeScriptLocation) {
          formattedResult.append(" (at ");
          formattedResult.appendChild(maybeScriptLocation);
          formattedResult.append(")");
        }
        formattedResult.append(newline);
        continue;
      }
      if (!isCallFrame) {
        formattedResult.appendChild(this.linkifyStringAsFragment(`${line}${newline}`));
        continue;
      }
      const formattedLine = document.createElement("span");
      if (!link) {
        formattedLine.appendChild(this.linkifyStringAsFragment(`${line}${newline}`));
        formattedLine.classList.add("formatted-builtin-stack-frame");
        formattedResult.appendChild(formattedLine);
        continue;
      }
      const suffix = `${link.suffix}${newline}`;
      formattedLine.appendChild(this.linkifyStringAsFragment(link.prefix));
      const scriptLocationLink = this.linkifier.linkifyScriptLocation(debuggerModel.target(), link.scriptId || null, link.url, link.lineNumber, {
        columnNumber: link.columnNumber,
        inlineFrameIndex: 0,
        showColumnNumber: true
      });
      scriptLocationLink.tabIndex = -1;
      this.selectableChildren.push({ element: scriptLocationLink, forceSelect: () => scriptLocationLink.focus() });
      formattedLine.appendChild(scriptLocationLink);
      formattedLine.appendChild(this.linkifyStringAsFragment(suffix));
      formattedLine.classList.add("formatted-stack-frame");
      formattedResult.appendChild(formattedLine);
      if (!link.enclosedInBraces) {
        continue;
      }
      const prefixWithoutFunction = link.prefix.substring(0, link.prefix.lastIndexOf(" ", link.prefix.length - 3));
      const selectableChildIndex = this.selectableChildren.length - 1;
      void this.expandInlineStackFrames(debuggerModel, prefixWithoutFunction, suffix, link.url, link.lineNumber, link.columnNumber, formattedResult, formattedLine).then((modified) => {
        if (modified) {
          formattedResult.removeChild(formattedLine);
          this.selectableChildren.splice(selectableChildIndex, 1);
        }
      });
    }
    return formattedResult;
  }
  linkifyWithCustomLinkifier(string, linkifier) {
    if (string.length > getMaxTokenizableStringLength()) {
      const propertyValue = new ObjectUI2.ObjectPropertiesSection.ExpandableTextPropertyValue(document.createElement("span"), string, getLongStringVisibleLength());
      const fragment = document.createDocumentFragment();
      fragment.appendChild(propertyValue.element);
      return fragment;
    }
    const container = document.createDocumentFragment();
    const tokens = _ConsoleViewMessage.tokenizeMessageText(string);
    let isBlob = false;
    for (const token of tokens) {
      if (!token.text) {
        continue;
      }
      if (isBlob) {
        token.text = `blob:${token.text}`;
        isBlob = !isBlob;
      }
      if (token.text === "'blob:" && token === tokens[0]) {
        isBlob = true;
        token.text = "'";
      }
      switch (token.type) {
        case "url": {
          const realURL = token.text.startsWith("www.") ? "http://" + token.text : token.text;
          const splitResult = Common6.ParsedURL.ParsedURL.splitLineAndColumn(realURL);
          const sourceURL = Common6.ParsedURL.ParsedURL.removeWasmFunctionInfoFromURL(splitResult.url);
          let linkNode;
          if (splitResult) {
            linkNode = linkifier(token.text, sourceURL, splitResult.lineNumber, splitResult.columnNumber);
          } else {
            linkNode = linkifier(token.text, Platform2.DevToolsPath.EmptyUrlString);
          }
          container.appendChild(linkNode);
          break;
        }
        default:
          container.appendChild(document.createTextNode(token.text));
          break;
      }
    }
    return container;
  }
  linkifyStringAsFragment(string) {
    return this.linkifyWithCustomLinkifier(string, (text, url, lineNumber, columnNumber) => {
      const options = { text, lineNumber, columnNumber };
      const linkElement = Components.Linkifier.Linkifier.linkifyURL(url, options);
      linkElement.tabIndex = -1;
      this.selectableChildren.push({ element: linkElement, forceSelect: () => linkElement.focus() });
      return linkElement;
    });
  }
  static tokenizeMessageText(string) {
    const { tokenizerRegexes: tokenizerRegexes2, tokenizerTypes: tokenizerTypes2 } = getOrCreateTokenizers();
    if (string.length > getMaxTokenizableStringLength()) {
      return [{ text: string, type: void 0 }];
    }
    const results = TextUtils3.TextUtils.Utils.splitStringByRegexes(string, tokenizerRegexes2);
    return results.map((result) => ({ text: result.value, type: tokenizerTypes2[result.regexIndex] }));
  }
  groupKey() {
    if (!this.groupKeyInternal) {
      this.groupKeyInternal = this.message.groupCategoryKey() + ":" + this.groupTitle();
    }
    return this.groupKeyInternal;
  }
  groupTitle() {
    const tokens = _ConsoleViewMessage.tokenizeMessageText(this.message.messageText);
    const result = tokens.reduce((acc, token) => {
      let text = token.text;
      if (token.type === "url") {
        text = i18nString4(UIStrings4.url);
      } else if (token.type === "time") {
        text = i18nString4(UIStrings4.tookNms);
      } else if (token.type === "event") {
        text = i18nString4(UIStrings4.someEvent);
      } else if (token.type === "milestone") {
        text = i18nString4(UIStrings4.Mxx);
      } else if (token.type === "autofill") {
        text = i18nString4(UIStrings4.attribute);
      }
      return acc + text;
    }, "");
    return result.replace(/[%]o/g, "");
  }
};
var tokenizerRegexes = null;
var tokenizerTypes = null;
function getOrCreateTokenizers() {
  if (!tokenizerRegexes || !tokenizerTypes) {
    const controlCodes = "\\u0000-\\u0020\\u007f-\\u009f";
    const linkStringRegex = new RegExp("(?:[a-zA-Z][a-zA-Z0-9+.-]{2,}:\\/\\/|data:|www\\.)[^\\s" + controlCodes + '"]{2,}[^\\s' + controlCodes + `"')}\\],:;.!?]`, "u");
    const pathLineRegex = /(?:\/[\w\.-]*)+\:[\d]+/;
    const timeRegex = /took [\d]+ms/;
    const eventRegex = /'\w+' event/;
    const milestoneRegex = /\sM[6-7]\d/;
    const autofillRegex = /\(suggested: \"[\w-]+\"\)/;
    const handlers = /* @__PURE__ */ new Map();
    handlers.set(linkStringRegex, "url");
    handlers.set(pathLineRegex, "url");
    handlers.set(timeRegex, "time");
    handlers.set(eventRegex, "event");
    handlers.set(milestoneRegex, "milestone");
    handlers.set(autofillRegex, "autofill");
    tokenizerRegexes = Array.from(handlers.keys());
    tokenizerTypes = Array.from(handlers.values());
    return { tokenizerRegexes, tokenizerTypes };
  }
  return { tokenizerRegexes, tokenizerTypes };
}
var ConsoleGroupViewMessage = class extends ConsoleViewMessage {
  collapsedInternal;
  expandGroupIcon;
  onToggle;
  groupEndMessageInternal;
  constructor(consoleMessage, linkifier, requestResolver, issueResolver, onToggle, onResize) {
    console.assert(consoleMessage.isGroupStartMessage());
    super(consoleMessage, linkifier, requestResolver, issueResolver, onResize);
    this.collapsedInternal = consoleMessage.type === "startGroupCollapsed";
    this.expandGroupIcon = null;
    this.onToggle = onToggle;
    this.groupEndMessageInternal = null;
  }
  setCollapsed(collapsed) {
    this.collapsedInternal = collapsed;
    if (this.expandGroupIcon) {
      this.expandGroupIcon.name = this.collapsedInternal ? "triangle-right" : "triangle-down";
    }
    this.onToggle.call(null);
  }
  collapsed() {
    return this.collapsedInternal;
  }
  maybeHandleOnKeyDown(event) {
    const focusedChildIndex = this.focusedChildIndex();
    if (focusedChildIndex === -1) {
      if (event.key === "ArrowLeft" && !this.collapsedInternal || event.key === "ArrowRight" && this.collapsedInternal) {
        this.setCollapsed(!this.collapsedInternal);
        return true;
      }
    }
    return super.maybeHandleOnKeyDown(event);
  }
  toMessageElement() {
    let element = this.elementInternal || null;
    if (!element) {
      element = super.toMessageElement();
      const iconType = this.collapsedInternal ? "triangle-right" : "triangle-down";
      this.expandGroupIcon = IconButton2.Icon.create(iconType, "expand-group-icon");
      this.contentElement().tabIndex = -1;
      if (this.repeatCountElement) {
        this.repeatCountElement.insertBefore(this.expandGroupIcon, this.repeatCountElement.firstChild);
      } else {
        this.consoleRowWrapper?.insertBefore(this.expandGroupIcon, this.contentElementInternal);
      }
      element.addEventListener("click", () => this.setCollapsed(!this.collapsedInternal));
    }
    return element;
  }
  showRepeatCountElement() {
    super.showRepeatCountElement();
    if (this.repeatCountElement && this.expandGroupIcon) {
      this.repeatCountElement.insertBefore(this.expandGroupIcon, this.repeatCountElement.firstChild);
    }
  }
  messagesHidden() {
    if (this.collapsed()) {
      return true;
    }
    const parent = this.consoleGroup();
    return Boolean(parent?.messagesHidden());
  }
  setGroupEnd(viewMessage) {
    if (viewMessage.consoleMessage().type !== "endGroup") {
      throw new Error("Invalid console message as group end");
    }
    if (this.groupEndMessageInternal !== null) {
      throw new Error("Console group already has an end");
    }
    this.groupEndMessageInternal = viewMessage;
  }
  groupEnd() {
    return this.groupEndMessageInternal;
  }
};
var ConsoleCommand = class extends ConsoleViewMessage {
  formattedCommand;
  constructor(consoleMessage, linkifier, requestResolver, issueResolver, onResize) {
    super(consoleMessage, linkifier, requestResolver, issueResolver, onResize);
    this.formattedCommand = null;
  }
  contentElement() {
    const contentElement = this.getContentElement();
    if (contentElement) {
      return contentElement;
    }
    const newContentElement = document.createElement("div");
    this.setContentElement(newContentElement);
    newContentElement.classList.add("console-user-command");
    const userCommandIcon = new IconButton2.Icon.Icon();
    userCommandIcon.data = { iconName: "chevron-right", color: "var(--icon-default)", width: "16px", height: "16px" };
    userCommandIcon.classList.add("command-result-icon");
    newContentElement.appendChild(userCommandIcon);
    elementToMessage.set(newContentElement, this);
    this.formattedCommand = document.createElement("span");
    this.formattedCommand.classList.add("source-code");
    this.formattedCommand.textContent = Platform2.StringUtilities.replaceControlCharacters(this.text);
    newContentElement.appendChild(this.formattedCommand);
    if (this.formattedCommand.textContent.length < MaxLengthToIgnoreHighlighter) {
      void CodeHighlighter.CodeHighlighter.highlightNode(this.formattedCommand, "text/javascript").then(this.updateSearch.bind(this));
    } else {
      this.updateSearch();
    }
    this.updateTimestamp();
    return newContentElement;
  }
  updateSearch() {
    this.setSearchRegex(this.searchRegex());
  }
};
var ConsoleCommandResult = class extends ConsoleViewMessage {
  contentElement() {
    const element = super.contentElement();
    if (!element.classList.contains("console-user-command-result")) {
      element.classList.add("console-user-command-result");
      if (this.consoleMessage().level === "info") {
        const icon = new IconButton2.Icon.Icon();
        icon.data = { iconName: "chevron-left-dot", color: "var(--icon-default)", width: "16px", height: "16px" };
        icon.classList.add("command-result-icon");
        element.insertBefore(icon, element.firstChild);
      }
    }
    return element;
  }
};
var ConsoleTableMessageView = class extends ConsoleViewMessage {
  dataGrid;
  constructor(consoleMessage, linkifier, requestResolver, issueResolver, onResize) {
    super(consoleMessage, linkifier, requestResolver, issueResolver, onResize);
    console.assert(
      consoleMessage.type === "table"
      /* Protocol.Runtime.ConsoleAPICalledEventType.Table */
    );
    this.dataGrid = null;
  }
  wasShown() {
    if (this.dataGrid) {
      this.dataGrid.updateWidths();
    }
    super.wasShown();
  }
  onResize() {
    if (!this.isVisible()) {
      return;
    }
    if (this.dataGrid) {
      this.dataGrid.onResize();
    }
  }
  contentElement() {
    const contentElement = this.getContentElement();
    if (contentElement) {
      return contentElement;
    }
    const newContentElement = document.createElement("div");
    newContentElement.classList.add("console-message");
    if (this.messageIcon) {
      newContentElement.appendChild(this.messageIcon);
    }
    this.setContentElement(newContentElement);
    newContentElement.appendChild(this.buildTableMessage());
    this.updateTimestamp();
    return newContentElement;
  }
  buildTableMessage() {
    const formattedMessage = document.createElement("span");
    formattedMessage.classList.add("source-code");
    this.anchorElement = this.buildMessageAnchor();
    if (this.anchorElement) {
      formattedMessage.appendChild(this.anchorElement);
    }
    const table = this.message.parameters?.length ? this.message.parameters[0] : null;
    if (!table) {
      return this.buildMessage();
    }
    const actualTable = parameterToRemoteObject(this.message.runtimeModel())(table);
    if (!actualTable?.preview) {
      return this.buildMessage();
    }
    const rawValueColumnSymbol = Symbol("rawValueColumn");
    const columnNames = [];
    const preview = actualTable.preview;
    const rows = [];
    for (let i = 0; i < preview.properties.length; ++i) {
      const rowProperty = preview.properties[i];
      let rowSubProperties;
      if (rowProperty.valuePreview?.properties.length) {
        rowSubProperties = rowProperty.valuePreview.properties;
      } else if (rowProperty.value || rowProperty.value === "") {
        rowSubProperties = [{ name: rawValueColumnSymbol, type: rowProperty.type, value: rowProperty.value }];
      } else {
        continue;
      }
      const rowValue = /* @__PURE__ */ new Map();
      const maxColumnsToRender = 20;
      for (let j = 0; j < rowSubProperties.length; ++j) {
        const cellProperty = rowSubProperties[j];
        let columnRendered = columnNames.indexOf(cellProperty.name) !== -1;
        if (!columnRendered) {
          if (columnNames.length === maxColumnsToRender) {
            continue;
          }
          columnRendered = true;
          columnNames.push(cellProperty.name);
        }
        if (columnRendered) {
          const cellElement = this.renderPropertyPreviewOrAccessor(actualTable, cellProperty, [rowProperty, cellProperty]);
          cellElement.classList.add("console-message-nowrap-below");
          rowValue.set(cellProperty.name, cellElement);
        }
      }
      rows.push({ rowName: rowProperty.name, rowValue });
    }
    const flatValues = [];
    for (const { rowName, rowValue } of rows) {
      flatValues.push(rowName);
      for (let j = 0; j < columnNames.length; ++j) {
        flatValues.push(rowValue.get(columnNames[j]));
      }
    }
    columnNames.unshift(i18nString4(UIStrings4.index));
    const columnDisplayNames = columnNames.map((name) => name === rawValueColumnSymbol ? i18nString4(UIStrings4.value) : name.toString());
    if (flatValues.length) {
      this.dataGrid = DataGrid.SortableDataGrid.SortableDataGrid.create(columnDisplayNames, flatValues, i18nString4(UIStrings4.console));
      if (this.dataGrid) {
        this.dataGrid.setStriped(true);
        this.dataGrid.setFocusable(false);
        const formattedResult = document.createElement("span");
        formattedResult.classList.add("console-message-text");
        const tableElement = formattedResult.createChild("div", "console-message-formatted-table");
        const dataGridContainer = tableElement.createChild("span");
        tableElement.appendChild(this.formatParameter(actualTable, true, false));
        const shadowRoot = dataGridContainer.attachShadow({ mode: "open" });
        const dataGridWidget = this.dataGrid.asWidget();
        dataGridWidget.markAsRoot();
        dataGridWidget.show(shadowRoot);
        dataGridWidget.registerRequiredCSS(consoleView_css_default, objectValue_css_default);
        formattedMessage.appendChild(formattedResult);
        this.dataGrid.renderInline();
      }
    }
    return formattedMessage;
  }
  approximateFastHeight() {
    const table = this.message.parameters?.[0];
    if (table && typeof table !== "string" && table.preview) {
      return defaultConsoleRowHeight * table.preview.properties.length;
    }
    return defaultConsoleRowHeight;
  }
};
var MaxLengthToIgnoreHighlighter = 1e4;
var MaxLengthForLinks = 40;
var maxTokenizableStringLength = 1e4;
var longStringVisibleLength = 5e3;
var getMaxTokenizableStringLength = () => {
  return maxTokenizableStringLength;
};
var setMaxTokenizableStringLength = (length) => {
  maxTokenizableStringLength = length;
};
var getLongStringVisibleLength = () => {
  return longStringVisibleLength;
};
var setLongStringVisibleLength = (length) => {
  longStringVisibleLength = length;
};

// gen/front_end/panels/console/ConsoleViewport.js
var ConsoleViewport = class {
  element;
  topGapElement;
  topGapElementActive;
  contentElementInternal;
  bottomGapElement;
  bottomGapElementActive;
  provider;
  virtualSelectedIndex;
  firstActiveIndex;
  lastActiveIndex;
  renderedItems;
  anchorSelection;
  headSelection;
  itemCount;
  cumulativeHeights;
  muteCopyHandler;
  observer;
  observerConfig;
  stickToBottomInternal;
  selectionIsBackward;
  lastSelectedElement;
  cachedProviderElements;
  constructor(provider) {
    this.element = document.createElement("div");
    this.element.style.overflow = "auto";
    this.topGapElement = this.element.createChild("div");
    this.topGapElement.style.height = "0px";
    this.topGapElement.style.color = "transparent";
    this.topGapElementActive = false;
    this.contentElementInternal = this.element.createChild("div");
    this.bottomGapElement = this.element.createChild("div");
    this.bottomGapElement.style.height = "0px";
    this.bottomGapElement.style.color = "transparent";
    this.bottomGapElementActive = false;
    this.topGapElement.textContent = "\uFEFF";
    this.bottomGapElement.textContent = "\uFEFF";
    UI5.ARIAUtils.setHidden(this.topGapElement, true);
    UI5.ARIAUtils.setHidden(this.bottomGapElement, true);
    this.provider = provider;
    this.element.addEventListener("scroll", this.onScroll.bind(this), false);
    this.element.addEventListener("copy", this.onCopy.bind(this), false);
    this.element.addEventListener("dragstart", this.onDragStart.bind(this), false);
    this.contentElementInternal.addEventListener("focusin", this.onFocusIn.bind(this), false);
    this.contentElementInternal.addEventListener("focusout", this.onFocusOut.bind(this), false);
    this.contentElementInternal.addEventListener("keydown", this.onKeyDown.bind(this), false);
    this.virtualSelectedIndex = -1;
    this.contentElementInternal.tabIndex = -1;
    this.firstActiveIndex = -1;
    this.lastActiveIndex = -1;
    this.renderedItems = [];
    this.anchorSelection = null;
    this.headSelection = null;
    this.itemCount = 0;
    this.cumulativeHeights = new Int32Array(0);
    this.muteCopyHandler = false;
    this.observer = new MutationObserver(this.refresh.bind(this));
    this.observerConfig = { childList: true, subtree: true };
    this.stickToBottomInternal = false;
    this.selectionIsBackward = false;
  }
  stickToBottom() {
    return this.stickToBottomInternal;
  }
  setStickToBottom(value) {
    this.stickToBottomInternal = value;
    if (this.stickToBottomInternal) {
      this.observer.observe(this.contentElementInternal, this.observerConfig);
    } else {
      this.observer.disconnect();
    }
  }
  hasVirtualSelection() {
    return this.virtualSelectedIndex !== -1;
  }
  copyWithStyles() {
    this.muteCopyHandler = true;
    this.element.ownerDocument.execCommand("copy");
    this.muteCopyHandler = false;
  }
  onCopy(event) {
    if (this.muteCopyHandler) {
      return;
    }
    const text = this.selectedText();
    if (!text) {
      return;
    }
    event.preventDefault();
    if (this.selectionContainsTable()) {
      this.copyWithStyles();
    } else if (event.clipboardData) {
      event.clipboardData.setData("text/plain", text);
    }
  }
  onFocusIn(event) {
    const renderedIndex = this.renderedItems.findIndex((item2) => item2.element().isSelfOrAncestor(event.target));
    if (renderedIndex !== -1) {
      this.virtualSelectedIndex = this.firstActiveIndex + renderedIndex;
    }
    let focusLastChild = false;
    if (this.virtualSelectedIndex === -1 && this.isOutsideViewport(event.relatedTarget) && event.target === this.contentElementInternal && this.itemCount) {
      focusLastChild = true;
      this.virtualSelectedIndex = this.itemCount - 1;
      this.refresh();
      this.scrollItemIntoView(this.virtualSelectedIndex);
    }
    this.updateFocusedItem(focusLastChild);
  }
  onFocusOut(event) {
    if (this.isOutsideViewport(event.relatedTarget)) {
      this.virtualSelectedIndex = -1;
    }
    this.updateFocusedItem();
  }
  isOutsideViewport(element) {
    return element !== null && !element.isSelfOrDescendant(this.contentElementInternal);
  }
  onDragStart(event) {
    const text = this.selectedText();
    if (!text) {
      return false;
    }
    if (event.dataTransfer) {
      event.dataTransfer.clearData();
      event.dataTransfer.setData("text/plain", text);
      event.dataTransfer.effectAllowed = "copy";
    }
    return true;
  }
  onKeyDown(event) {
    if (UI5.UIUtils.isEditing() || !this.itemCount || event.shiftKey) {
      return;
    }
    let isArrowUp = false;
    switch (event.key) {
      case "ArrowUp":
        if (this.virtualSelectedIndex > 0) {
          isArrowUp = true;
          this.virtualSelectedIndex--;
        } else {
          return;
        }
        break;
      case "ArrowDown":
        if (this.virtualSelectedIndex < this.itemCount - 1) {
          this.virtualSelectedIndex++;
        } else {
          return;
        }
        break;
      case "Home":
        this.virtualSelectedIndex = 0;
        break;
      case "End":
        this.virtualSelectedIndex = this.itemCount - 1;
        break;
      default:
        return;
    }
    event.consume(true);
    this.scrollItemIntoView(this.virtualSelectedIndex);
    this.updateFocusedItem(isArrowUp);
  }
  updateFocusedItem(focusLastChild) {
    const selectedElement = this.renderedElementAt(this.virtualSelectedIndex);
    const changed = this.lastSelectedElement !== selectedElement;
    const containerHasFocus = this.contentElementInternal === Platform3.DOMUtilities.deepActiveElement(this.element.ownerDocument);
    if (this.lastSelectedElement && changed) {
      this.lastSelectedElement.classList.remove("console-selected");
    }
    if (selectedElement && (focusLastChild || changed || containerHasFocus) && this.element.hasFocus()) {
      selectedElement.classList.add("console-selected");
      const consoleViewMessage = getMessageForElement(selectedElement);
      if (consoleViewMessage) {
        UI5.Context.Context.instance().setFlavor(ConsoleViewMessage, consoleViewMessage);
      }
      if (focusLastChild) {
        this.setStickToBottom(false);
        this.renderedItems[this.virtualSelectedIndex - this.firstActiveIndex].focusLastChildOrSelf();
      } else if (!selectedElement.hasFocus()) {
        selectedElement.focus({ preventScroll: true });
      }
    }
    if (this.itemCount && !this.contentElementInternal.hasFocus()) {
      this.contentElementInternal.tabIndex = 0;
    } else {
      this.contentElementInternal.tabIndex = -1;
    }
    this.lastSelectedElement = selectedElement;
  }
  contentElement() {
    return this.contentElementInternal;
  }
  invalidate() {
    delete this.cachedProviderElements;
    this.itemCount = this.provider.itemCount();
    if (this.virtualSelectedIndex > this.itemCount - 1) {
      this.virtualSelectedIndex = this.itemCount - 1;
    }
    this.rebuildCumulativeHeights();
    this.refresh();
  }
  providerElement(index) {
    if (!this.cachedProviderElements) {
      this.cachedProviderElements = new Array(this.itemCount);
    }
    let element = this.cachedProviderElements[index];
    if (!element) {
      element = this.provider.itemElement(index);
      this.cachedProviderElements[index] = element;
    }
    return element;
  }
  rebuildCumulativeHeights() {
    const firstActiveIndex = this.firstActiveIndex;
    const lastActiveIndex = this.lastActiveIndex;
    let height = 0;
    this.cumulativeHeights = new Int32Array(this.itemCount);
    for (let i = 0; i < this.itemCount; ++i) {
      if (firstActiveIndex <= i && i - firstActiveIndex < this.renderedItems.length && i <= lastActiveIndex) {
        height += this.renderedItems[i - firstActiveIndex].element().offsetHeight;
      } else {
        height += this.provider.fastHeight(i);
      }
      this.cumulativeHeights[i] = height;
    }
  }
  rebuildCumulativeHeightsIfNeeded() {
    let totalCachedHeight = 0;
    let totalMeasuredHeight = 0;
    for (let i = 0; i < this.renderedItems.length; ++i) {
      const cachedItemHeight = this.cachedItemHeight(this.firstActiveIndex + i);
      const measuredHeight = this.renderedItems[i].element().offsetHeight;
      if (Math.abs(cachedItemHeight - measuredHeight) > 1) {
        this.rebuildCumulativeHeights();
        return;
      }
      totalMeasuredHeight += measuredHeight;
      totalCachedHeight += cachedItemHeight;
      if (Math.abs(totalCachedHeight - totalMeasuredHeight) > 1) {
        this.rebuildCumulativeHeights();
        return;
      }
    }
  }
  cachedItemHeight(index) {
    return index === 0 ? this.cumulativeHeights[0] : this.cumulativeHeights[index] - this.cumulativeHeights[index - 1];
  }
  isSelectionBackwards(selection) {
    if (!selection?.rangeCount || !selection.anchorNode || !selection.focusNode) {
      return false;
    }
    const range = document.createRange();
    range.setStart(selection.anchorNode, selection.anchorOffset);
    range.setEnd(selection.focusNode, selection.focusOffset);
    return range.collapsed;
  }
  createSelectionModel(itemIndex, node, offset) {
    return { item: itemIndex, node, offset };
  }
  updateSelectionModel(selection) {
    const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
    if (!range || (!selection || selection.isCollapsed) || !this.element.hasSelection()) {
      this.headSelection = null;
      this.anchorSelection = null;
      return false;
    }
    let firstSelectedIndex = Number.MAX_VALUE;
    let lastSelectedIndex = -1;
    let hasVisibleSelection = false;
    for (let i = 0; i < this.renderedItems.length; ++i) {
      if (range.intersectsNode(this.renderedItems[i].element())) {
        const index = i + this.firstActiveIndex;
        firstSelectedIndex = Math.min(firstSelectedIndex, index);
        lastSelectedIndex = Math.max(lastSelectedIndex, index);
        hasVisibleSelection = true;
      }
    }
    const topOverlap = range.intersectsNode(this.topGapElement) && this.topGapElementActive;
    const bottomOverlap = range.intersectsNode(this.bottomGapElement) && this.bottomGapElementActive;
    if (!topOverlap && !bottomOverlap && !hasVisibleSelection) {
      this.headSelection = null;
      this.anchorSelection = null;
      return false;
    }
    if (!this.anchorSelection || !this.headSelection) {
      this.anchorSelection = this.createSelectionModel(0, this.element, 0);
      this.headSelection = this.createSelectionModel(this.itemCount - 1, this.element, this.element.children.length);
      this.selectionIsBackward = false;
    }
    const isBackward = this.isSelectionBackwards(selection);
    const startSelection = this.selectionIsBackward ? this.headSelection : this.anchorSelection;
    const endSelection = this.selectionIsBackward ? this.anchorSelection : this.headSelection;
    let firstSelected = null;
    let lastSelected = null;
    if (hasVisibleSelection) {
      firstSelected = this.createSelectionModel(firstSelectedIndex, range.startContainer, range.startOffset);
      lastSelected = this.createSelectionModel(lastSelectedIndex, range.endContainer, range.endOffset);
    }
    if (topOverlap && bottomOverlap && hasVisibleSelection) {
      firstSelected = firstSelected && firstSelected.item < startSelection.item ? firstSelected : startSelection;
      lastSelected = lastSelected && lastSelected.item > endSelection.item ? lastSelected : endSelection;
    } else if (!hasVisibleSelection) {
      firstSelected = startSelection;
      lastSelected = endSelection;
    } else if (topOverlap) {
      firstSelected = isBackward ? this.headSelection : this.anchorSelection;
    } else if (bottomOverlap) {
      lastSelected = isBackward ? this.anchorSelection : this.headSelection;
    }
    if (isBackward) {
      this.anchorSelection = lastSelected;
      this.headSelection = firstSelected;
    } else {
      this.anchorSelection = firstSelected;
      this.headSelection = lastSelected;
    }
    this.selectionIsBackward = isBackward;
    return true;
  }
  restoreSelection(selection) {
    if (!selection || !this.anchorSelection || !this.headSelection) {
      return;
    }
    const clampSelection = (selection2, isSelectionBackwards) => {
      if (this.firstActiveIndex <= selection2.item && selection2.item <= this.lastActiveIndex) {
        return { element: selection2.node, offset: selection2.offset };
      }
      const element = selection2.item < this.firstActiveIndex ? this.topGapElement : this.bottomGapElement;
      return { element, offset: isSelectionBackwards ? 1 : 0 };
    };
    const { element: anchorElement, offset: anchorOffset } = clampSelection(this.anchorSelection, Boolean(this.selectionIsBackward));
    const { element: headElement, offset: headOffset } = clampSelection(this.headSelection, !this.selectionIsBackward);
    selection.setBaseAndExtent(anchorElement, anchorOffset, headElement, headOffset);
  }
  selectionContainsTable() {
    if (!this.anchorSelection || !this.headSelection) {
      return false;
    }
    const start = this.selectionIsBackward ? this.headSelection.item : this.anchorSelection.item;
    const end = this.selectionIsBackward ? this.anchorSelection.item : this.headSelection.item;
    for (let i = start; i <= end; i++) {
      const element = this.providerElement(i);
      if (element && element.consoleMessage().type === "table") {
        return true;
      }
    }
    return false;
  }
  refresh() {
    this.observer.disconnect();
    this.innerRefresh();
    if (this.stickToBottomInternal) {
      this.observer.observe(this.contentElementInternal, this.observerConfig);
    }
  }
  innerRefresh() {
    if (!this.visibleHeight()) {
      return;
    }
    if (!this.itemCount) {
      for (let i = 0; i < this.renderedItems.length; ++i) {
        this.renderedItems[i].willHide();
      }
      this.renderedItems = [];
      this.contentElementInternal.removeChildren();
      this.topGapElement.style.height = "0px";
      this.bottomGapElement.style.height = "0px";
      this.firstActiveIndex = -1;
      this.lastActiveIndex = -1;
      this.updateFocusedItem();
      return;
    }
    const selection = this.element.getComponentSelection();
    const shouldRestoreSelection = this.updateSelectionModel(selection);
    const visibleFrom = this.element.scrollTop;
    const visibleHeight = this.visibleHeight();
    const activeHeight = visibleHeight * 2;
    this.rebuildCumulativeHeightsIfNeeded();
    if (this.stickToBottomInternal) {
      this.firstActiveIndex = Math.max(this.itemCount - Math.ceil(activeHeight / this.provider.minimumRowHeight()), 0);
      this.lastActiveIndex = this.itemCount - 1;
    } else {
      this.firstActiveIndex = Math.max(Platform3.ArrayUtilities.lowerBound(this.cumulativeHeights, visibleFrom + 1 - (activeHeight - visibleHeight) / 2, Platform3.ArrayUtilities.DEFAULT_COMPARATOR), 0);
      this.lastActiveIndex = this.firstActiveIndex + Math.ceil(activeHeight / this.provider.minimumRowHeight()) - 1;
      this.lastActiveIndex = Math.min(this.lastActiveIndex, this.itemCount - 1);
    }
    const topGapHeight = this.cumulativeHeights[this.firstActiveIndex - 1] || 0;
    const bottomGapHeight = this.cumulativeHeights[this.cumulativeHeights.length - 1] - this.cumulativeHeights[this.lastActiveIndex];
    function prepare() {
      this.topGapElement.style.height = topGapHeight + "px";
      this.bottomGapElement.style.height = bottomGapHeight + "px";
      this.topGapElementActive = Boolean(topGapHeight);
      this.bottomGapElementActive = Boolean(bottomGapHeight);
      this.contentElementInternal.style.setProperty("height", "10000000px");
    }
    this.partialViewportUpdate(prepare.bind(this));
    this.contentElementInternal.style.removeProperty("height");
    if (shouldRestoreSelection) {
      this.restoreSelection(selection);
    }
    if (this.stickToBottomInternal) {
      this.element.scrollTop = 1e7;
    }
  }
  partialViewportUpdate(prepare) {
    const itemsToRender = /* @__PURE__ */ new Set();
    for (let i = this.firstActiveIndex; i <= this.lastActiveIndex; ++i) {
      const providerElement = this.providerElement(i);
      console.assert(Boolean(providerElement), "Expected provider element to be defined");
      if (providerElement) {
        itemsToRender.add(providerElement);
      }
    }
    const willBeHidden = this.renderedItems.filter((item2) => !itemsToRender.has(item2));
    for (let i = 0; i < willBeHidden.length; ++i) {
      willBeHidden[i].willHide();
    }
    prepare();
    let hadFocus = false;
    for (let i = 0; i < willBeHidden.length; ++i) {
      hadFocus = hadFocus || willBeHidden[i].element().hasFocus();
      willBeHidden[i].element().remove();
    }
    const wasShown = [];
    let anchor = this.contentElementInternal.firstChild;
    for (const viewportElement of itemsToRender) {
      const element = viewportElement.element();
      if (element !== anchor) {
        const shouldCallWasShown = !element.parentElement;
        if (shouldCallWasShown) {
          wasShown.push(viewportElement);
        }
        this.contentElementInternal.insertBefore(element, anchor);
      } else {
        anchor = anchor.nextSibling;
      }
    }
    for (let i = 0; i < wasShown.length; ++i) {
      wasShown[i].wasShown();
    }
    this.renderedItems = Array.from(itemsToRender);
    if (hadFocus) {
      this.contentElementInternal.focus();
    }
    this.updateFocusedItem();
  }
  selectedText() {
    this.updateSelectionModel(this.element.getComponentSelection());
    if (!this.headSelection || !this.anchorSelection) {
      return null;
    }
    let startSelection = null;
    let endSelection = null;
    if (this.selectionIsBackward) {
      startSelection = this.headSelection;
      endSelection = this.anchorSelection;
    } else {
      startSelection = this.anchorSelection;
      endSelection = this.headSelection;
    }
    const textLines = [];
    for (let i = startSelection.item; i <= endSelection.item; ++i) {
      const providerElement = this.providerElement(i);
      console.assert(Boolean(providerElement));
      if (!providerElement) {
        continue;
      }
      const element = providerElement.element();
      const lineContent = element.childTextNodes().map(Components2.Linkifier.Linkifier.untruncatedNodeText).join("");
      textLines.push(lineContent);
    }
    const endProviderElement = this.providerElement(endSelection.item);
    const endSelectionElement = endProviderElement?.element();
    if (endSelectionElement && endSelection.node?.isSelfOrDescendant(endSelectionElement)) {
      const itemTextOffset = this.textOffsetInNode(endSelectionElement, endSelection.node, endSelection.offset);
      if (textLines.length > 0) {
        textLines[textLines.length - 1] = textLines[textLines.length - 1].substring(0, itemTextOffset);
      }
    }
    const startProviderElement = this.providerElement(startSelection.item);
    const startSelectionElement = startProviderElement?.element();
    if (startSelectionElement && startSelection.node?.isSelfOrDescendant(startSelectionElement)) {
      const itemTextOffset = this.textOffsetInNode(startSelectionElement, startSelection.node, startSelection.offset);
      textLines[0] = textLines[0].substring(itemTextOffset);
    }
    return textLines.join("\n");
  }
  textOffsetInNode(itemElement, selectionNode, offset) {
    const textContentLength = selectionNode.textContent ? selectionNode.textContent.length : 0;
    if (selectionNode.nodeType !== Node.TEXT_NODE) {
      if (offset < selectionNode.childNodes.length) {
        selectionNode = selectionNode.childNodes.item(offset);
        offset = 0;
      } else {
        offset = textContentLength;
      }
    }
    let chars = 0;
    let node = itemElement;
    while ((node = node.traverseNextNode(itemElement)) && node !== selectionNode) {
      if (node.nodeType !== Node.TEXT_NODE || node.parentNode && (node.parentNode.nodeName === "STYLE" || node.parentNode.nodeName === "SCRIPT" || node.parentNode.nodeName === "#document-fragment")) {
        continue;
      }
      chars += Components2.Linkifier.Linkifier.untruncatedNodeText(node).length;
    }
    const untruncatedContainerLength = Components2.Linkifier.Linkifier.untruncatedNodeText(selectionNode).length;
    if (offset > 0 && untruncatedContainerLength !== textContentLength) {
      offset = untruncatedContainerLength;
    }
    return chars + offset;
  }
  onScroll(_event) {
    this.refresh();
  }
  firstVisibleIndex() {
    if (!this.cumulativeHeights.length) {
      return -1;
    }
    this.rebuildCumulativeHeightsIfNeeded();
    return Platform3.ArrayUtilities.lowerBound(this.cumulativeHeights, this.element.scrollTop + 1, Platform3.ArrayUtilities.DEFAULT_COMPARATOR);
  }
  lastVisibleIndex() {
    if (!this.cumulativeHeights.length) {
      return -1;
    }
    this.rebuildCumulativeHeightsIfNeeded();
    const scrollBottom = this.element.scrollTop + this.element.clientHeight;
    const right = this.itemCount - 1;
    return Platform3.ArrayUtilities.lowerBound(this.cumulativeHeights, scrollBottom, Platform3.ArrayUtilities.DEFAULT_COMPARATOR, void 0, right);
  }
  renderedElementAt(index) {
    if (index === -1 || index < this.firstActiveIndex || index > this.lastActiveIndex) {
      return null;
    }
    return this.renderedItems[index - this.firstActiveIndex].element();
  }
  scrollItemIntoView(index, makeLast) {
    const firstVisibleIndex = this.firstVisibleIndex();
    const lastVisibleIndex = this.lastVisibleIndex();
    if (index > firstVisibleIndex && index < lastVisibleIndex) {
      return;
    }
    if (index === lastVisibleIndex && this.cumulativeHeights[index] <= this.element.scrollTop + this.visibleHeight()) {
      return;
    }
    if (makeLast) {
      this.forceScrollItemToBeLast(index);
    } else if (index <= firstVisibleIndex) {
      this.forceScrollItemToBeFirst(index);
    } else if (index >= lastVisibleIndex) {
      this.forceScrollItemToBeLast(index);
    }
  }
  forceScrollItemToBeFirst(index) {
    console.assert(index >= 0 && index < this.itemCount, "Cannot scroll item at invalid index");
    this.setStickToBottom(false);
    this.rebuildCumulativeHeightsIfNeeded();
    this.element.scrollTop = index > 0 ? this.cumulativeHeights[index - 1] : 0;
    if (UI5.UIUtils.isScrolledToBottom(this.element)) {
      this.setStickToBottom(true);
    }
    this.refresh();
    const renderedElement = this.renderedElementAt(index);
    if (renderedElement) {
      renderedElement.scrollIntoView(
        true
        /* alignTop */
      );
    }
  }
  forceScrollItemToBeLast(index) {
    console.assert(index >= 0 && index < this.itemCount, "Cannot scroll item at invalid index");
    this.setStickToBottom(false);
    this.rebuildCumulativeHeightsIfNeeded();
    this.element.scrollTop = this.cumulativeHeights[index] - this.visibleHeight();
    if (UI5.UIUtils.isScrolledToBottom(this.element)) {
      this.setStickToBottom(true);
    }
    this.refresh();
    const renderedElement = this.renderedElementAt(index);
    if (renderedElement) {
      renderedElement.scrollIntoView(
        false
        /* alignTop */
      );
    }
  }
  visibleHeight() {
    return this.element.offsetHeight;
  }
};

// gen/front_end/panels/console/ConsolePrompt.js
var ConsolePrompt_exports = {};
__export(ConsolePrompt_exports, {
  ConsolePrompt: () => ConsolePrompt
});
import * as Common8 from "./../../core/common/common.js";
import * as Host3 from "./../../core/host/host.js";
import * as i18n11 from "./../../core/i18n/i18n.js";
import * as Root4 from "./../../core/root/root.js";
import * as SDK7 from "./../../core/sdk/sdk.js";
import * as AiCodeCompletion from "./../../models/ai_code_completion/ai_code_completion.js";
import * as Formatter from "./../../models/formatter/formatter.js";
import * as SourceMapScopes from "./../../models/source_map_scopes/source_map_scopes.js";
import * as CodeMirror2 from "./../../third_party/codemirror.next/codemirror.next.js";
import * as IconButton4 from "./../../ui/components/icon_button/icon_button.js";
import * as TextEditor3 from "./../../ui/components/text_editor/text_editor.js";
import * as ObjectUI3 from "./../../ui/legacy/components/object_ui/object_ui.js";
import * as UI8 from "./../../ui/legacy/legacy.js";
import * as VisualLogging6 from "./../../ui/visual_logging/visual_logging.js";
import { AiCodeCompletionTeaser } from "./../common/common.js";

// gen/front_end/panels/console/ConsolePanel.js
var ConsolePanel_exports = {};
__export(ConsolePanel_exports, {
  ConsolePanel: () => ConsolePanel,
  ConsoleRevealer: () => ConsoleRevealer,
  WrapperView: () => WrapperView
});
import * as UI7 from "./../../ui/legacy/legacy.js";
import * as VisualLogging5 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/console/ConsoleView.js
var ConsoleView_exports = {};
__export(ConsoleView_exports, {
  ActionDelegate: () => ActionDelegate,
  ConsoleView: () => ConsoleView,
  ConsoleViewFilter: () => ConsoleViewFilter
});
import "./../../ui/legacy/legacy.js";
import * as Common7 from "./../../core/common/common.js";
import * as Host2 from "./../../core/host/host.js";
import * as i18n9 from "./../../core/i18n/i18n.js";
import * as Platform4 from "./../../core/platform/platform.js";
import * as Root3 from "./../../core/root/root.js";
import * as SDK6 from "./../../core/sdk/sdk.js";
import * as Bindings2 from "./../../models/bindings/bindings.js";
import * as IssuesManager from "./../../models/issues_manager/issues_manager.js";
import * as Logs2 from "./../../models/logs/logs.js";
import * as TextUtils5 from "./../../models/text_utils/text_utils.js";
import * as CodeHighlighter3 from "./../../ui/components/code_highlighter/code_highlighter.js";
import * as IconButton3 from "./../../ui/components/icon_button/icon_button.js";
import * as IssueCounter2 from "./../../ui/components/issue_counter/issue_counter.js";
import * as Components3 from "./../../ui/legacy/components/utils/utils.js";
import * as UI6 from "./../../ui/legacy/legacy.js";
import * as VisualLogging4 from "./../../ui/visual_logging/visual_logging.js";
var UIStrings5 = {
  /**
   *@description Label for button which links to Issues tab, specifying how many issues there are.
   */
  issuesWithColon: "{n, plural, =0 {No Issues} =1 {# Issue:} other {# Issues:}}",
  /**
   *@description Text for the tooltip of the issue counter toolbar item
   */
  issueToolbarTooltipGeneral: "Some problems no longer generate console messages, but are surfaced in the issues tab.",
  /**
   * @description Text for the tooltip of the issue counter toolbar item. The placeholder indicates how many issues
   * there are in the Issues tab broken down by kind.
   * @example {1 page error, 2 breaking changes} issueEnumeration
   */
  issueToolbarClickToView: "Click to view {issueEnumeration}",
  /**
   * @description Text for the tooltip of the issue counter toolbar item. The placeholder indicates how many issues
   * there are in the Issues tab broken down by kind.
   */
  issueToolbarClickToGoToTheIssuesTab: "Click to go to the issues tab",
  /**
   *@description Text in Console View of the Console panel
   */
  findStringInLogs: "Find string in logs",
  /**
   *@description Tooltip text that appears when hovering over the largeicon settings gear in show settings pane setting in console view of the console panel
   */
  consoleSettings: "Console settings",
  /**
   *@description Title of a setting under the Console category that can be invoked through the Command Menu
   */
  groupSimilarMessagesInConsole: "Group similar messages in console",
  /**
   *@description Title of a setting under the Console category that can be invoked through the Command Menu
   */
  showCorsErrorsInConsole: "Show `CORS` errors in console",
  /**
   * @description Tooltip for the the console sidebar toggle in the Console panel. Command to
   * open/show the sidebar.
   */
  showConsoleSidebar: "Show console sidebar",
  /**
   * @description Tooltip for the the console sidebar toggle in the Console panel. Command to
   * open/show the sidebar.
   */
  hideConsoleSidebar: "Hide console sidebar",
  /**
   * @description Screen reader announcement when the sidebar is shown in the Console panel.
   */
  consoleSidebarShown: "Console sidebar shown",
  /**
   * @description Screen reader announcement when the sidebar is hidden in the Console panel.
   */
  consoleSidebarHidden: "Console sidebar hidden",
  /**
   *@description Tooltip text that appears on the setting to preserve log when hovering over the item
   */
  doNotClearLogOnPageReload: "Do not clear log on page reload / navigation",
  /**
   *@description Text to preserve the log after refreshing
   */
  preserveLog: "Preserve log",
  /**
   *@description Text in Console View of the Console panel
   */
  hideNetwork: "Hide network",
  /**
   *@description Tooltip text that appears on the setting when hovering over it in Console View of the Console panel
   */
  onlyShowMessagesFromTheCurrentContext: "Only show messages from the current context (`top`, `iframe`, `worker`, extension)",
  /**
   *@description Alternative title text of a setting in Console View of the Console panel
   */
  selectedContextOnly: "Selected context only",
  /**
   *@description Description of a setting that controls whether XMLHttpRequests are logged in the console.
   */
  logXMLHttpRequests: "Log XMLHttpRequests",
  /**
   *@description Tooltip text that appears on the setting when hovering over it in Console View of the Console panel
   */
  eagerlyEvaluateTextInThePrompt: "Eagerly evaluate text in the prompt",
  /**
   *@description Description of a setting that controls whether text typed in the console should be autocompleted from commands executed in the local console history.
   */
  autocompleteFromHistory: "Autocomplete from history",
  /**
   *@description Description of a setting that controls whether user activation is triggered by evaluation'.
   */
  treatEvaluationAsUserActivation: "Treat evaluation as user activation",
  /**
   * @description Text in Console View of the Console panel, indicating that a number of console
   * messages have been hidden.
   */
  sHidden: "{n, plural, =1 {# hidden} other {# hidden}}",
  /**
   *@description Alert message for screen readers when the console is cleared
   */
  consoleCleared: "Console cleared",
  /**
   *@description Text in Console View of the Console panel
   *@example {index.js} PH1
   */
  hideMessagesFromS: "Hide messages from {PH1}",
  /**
   *@description Text to save content as a specific file type
   */
  saveAs: "Save as\u2026",
  /**
   *@description Text to copy Console log to clipboard
   */
  copyConsole: "Copy console",
  /**
   *@description A context menu item in the Console View of the Console panel
   */
  copyVisibleStyledSelection: "Copy visible styled selection",
  /**
   *@description Text to replay an XHR request
   */
  replayXhr: "Replay XHR",
  /**
   *@description Text to indicate DevTools is writing to a file
   */
  writingFile: "Writing file\u2026",
  /**
   *@description Text to indicate the searching is in progress
   */
  searching: "Searching\u2026",
  /**
   *@description Text in Console View of the Console panel
   */
  egEventdCdnUrlacom: "e.g. `/eventd/ -cdn url:a.com`",
  /**
   *@description Sdk console message message level verbose of level Labels in Console View of the Console panel
   */
  verbose: "Verbose",
  /**
   *@description Sdk console message message level info of level Labels in Console View of the Console panel
   */
  info: "Info",
  /**
   *@description Sdk console message message level warning of level Labels in Console View of the Console panel
   */
  warnings: "Warnings",
  /**
   *@description Text for errors
   */
  errors: "Errors",
  /**
   * @description Tooltip text of the info icon shown next to the filter drop down
   *              in the Console panels main toolbar when the sidebar is active.
   */
  overriddenByFilterSidebar: "Log levels are controlled by the console sidebar.",
  /**
   *@description Text in Console View of the Console panel
   */
  customLevels: "Custom levels",
  /**
   *@description Text in Console View of the Console panel
   *@example {Warnings} PH1
   */
  sOnly: "{PH1} only",
  /**
   *@description Text in Console View of the Console panel
   */
  allLevels: "All levels",
  /**
   *@description Text in Console View of the Console panel
   */
  defaultLevels: "Default levels",
  /**
   *@description Text in Console View of the Console panel
   */
  hideAll: "Hide all",
  /**
   *@description Title of level menu button in console view of the console panel
   *@example {All levels} PH1
   */
  logLevelS: "Log level: {PH1}",
  /**
   *@description A context menu item in the Console View of the Console panel
   */
  default: "Default",
  /**
   *@description Text summary to indicate total number of messages in console for accessibility/screen readers.
   *@example {5} PH1
   */
  filteredMessagesInConsole: "{PH1} messages in console"
};
var str_5 = i18n9.i18n.registerUIStrings("panels/console/ConsoleView.ts", UIStrings5);
var i18nString5 = i18n9.i18n.getLocalizedString.bind(void 0, str_5);
var consoleViewInstance;
var MIN_HISTORY_LENGTH_FOR_DISABLING_SELF_XSS_WARNING = 5;
var ConsoleView = class _ConsoleView extends UI6.Widget.VBox {
  searchableViewInternal;
  sidebar;
  isSidebarOpen;
  filter;
  consoleToolbarContainer;
  splitWidget;
  contentsElement;
  visibleViewMessages;
  hiddenByFilterCount;
  shouldBeHiddenCache;
  lastShownHiddenByFilterCount;
  currentMatchRangeIndex;
  searchRegex;
  groupableMessages;
  groupableMessageTitle;
  shortcuts;
  regexMatchRanges;
  consoleContextSelector;
  filterStatusText;
  showSettingsPaneSetting;
  showSettingsPaneButton;
  progressToolbarItem;
  groupSimilarSetting;
  showCorsErrorsSetting;
  timestampsSetting;
  consoleHistoryAutocompleteSetting;
  selfXssWarningDisabledSetting;
  pinPane;
  viewport;
  messagesElement;
  messagesCountElement;
  viewportThrottler;
  pendingBatchResize;
  onMessageResizedBound;
  promptElement;
  linkifier;
  consoleMessages;
  consoleGroupStarts;
  prompt;
  immediatelyFilterMessagesForTest;
  maybeDirtyWhileMuted;
  scheduledRefreshPromiseForTest;
  needsFullUpdate;
  buildHiddenCacheTimeout;
  searchShouldJumpBackwards;
  searchProgressIndicator;
  innerSearchTimeoutId;
  muteViewportUpdates;
  waitForScrollTimeout;
  issueCounter;
  pendingSidebarMessages = [];
  userHasOpenedSidebarAtLeastOnce = false;
  issueToolbarThrottle;
  requestResolver = new Logs2.RequestResolver.RequestResolver();
  issueResolver = new IssuesManager.IssueResolver.IssueResolver();
  #isDetached = false;
  #onIssuesCountUpdateBound = this.#onIssuesCountUpdate.bind(this);
  constructor(viewportThrottlerTimeout) {
    super();
    this.setMinimumSize(0, 35);
    this.registerRequiredCSS(consoleView_css_default, objectValue_css_default, CodeHighlighter3.codeHighlighterStyles);
    this.searchableViewInternal = new UI6.SearchableView.SearchableView(this, null);
    this.searchableViewInternal.element.classList.add("console-searchable-view");
    this.searchableViewInternal.setPlaceholder(i18nString5(UIStrings5.findStringInLogs));
    this.searchableViewInternal.setMinimalSearchQuerySize(0);
    this.sidebar = new ConsoleSidebar();
    this.sidebar.addEventListener("FilterSelected", this.onFilterChanged.bind(this));
    this.isSidebarOpen = false;
    this.filter = new ConsoleViewFilter(this.onFilterChanged.bind(this));
    this.consoleToolbarContainer = this.element.createChild("div", "console-toolbar-container");
    this.consoleToolbarContainer.role = "toolbar";
    this.splitWidget = new UI6.SplitWidget.SplitWidget(true, false, "console.sidebar.width", 100);
    this.splitWidget.setMainWidget(this.searchableViewInternal);
    this.splitWidget.setSidebarWidget(this.sidebar);
    this.splitWidget.show(this.element);
    this.splitWidget.hideSidebar();
    this.splitWidget.enableShowModeSaving();
    this.isSidebarOpen = this.splitWidget.showMode() === "Both";
    this.filter.setLevelMenuOverridden(this.isSidebarOpen);
    this.splitWidget.addEventListener("ShowModeChanged", (event) => {
      this.isSidebarOpen = event.data === "Both";
      if (this.isSidebarOpen) {
        if (!this.userHasOpenedSidebarAtLeastOnce) {
          Host2.userMetrics.actionTaken(Host2.UserMetrics.Action.ConsoleSidebarOpened);
          this.userHasOpenedSidebarAtLeastOnce = true;
        }
        this.pendingSidebarMessages.forEach((message) => {
          this.sidebar.onMessageAdded(message);
        });
        this.pendingSidebarMessages = [];
      }
      this.filter.setLevelMenuOverridden(this.isSidebarOpen);
      this.onFilterChanged();
    });
    this.contentsElement = this.searchableViewInternal.element;
    this.element.classList.add("console-view");
    this.visibleViewMessages = [];
    this.hiddenByFilterCount = 0;
    this.shouldBeHiddenCache = /* @__PURE__ */ new Set();
    this.groupableMessages = /* @__PURE__ */ new Map();
    this.groupableMessageTitle = /* @__PURE__ */ new Map();
    this.shortcuts = /* @__PURE__ */ new Map();
    this.regexMatchRanges = [];
    this.consoleContextSelector = new ConsoleContextSelector();
    this.filterStatusText = new UI6.Toolbar.ToolbarText();
    this.filterStatusText.element.classList.add("dimmed");
    this.showSettingsPaneSetting = Common7.Settings.Settings.instance().createSetting("console-show-settings-toolbar", false);
    this.showSettingsPaneButton = new UI6.Toolbar.ToolbarSettingToggle(this.showSettingsPaneSetting, "gear", i18nString5(UIStrings5.consoleSettings), "gear-filled");
    this.showSettingsPaneButton.element.setAttribute("jslog", `${VisualLogging4.toggleSubpane("console-settings").track({ click: true })}`);
    this.progressToolbarItem = new UI6.Toolbar.ToolbarItem(document.createElement("div"));
    this.groupSimilarSetting = Common7.Settings.Settings.instance().moduleSetting("console-group-similar");
    this.groupSimilarSetting.addChangeListener(() => this.updateMessageList());
    this.showCorsErrorsSetting = Common7.Settings.Settings.instance().moduleSetting("console-shows-cors-errors");
    this.showCorsErrorsSetting.addChangeListener(() => this.updateMessageList());
    const toolbar2 = this.consoleToolbarContainer.createChild("devtools-toolbar", "console-main-toolbar");
    toolbar2.setAttribute("jslog", `${VisualLogging4.toolbar()}`);
    toolbar2.role = "presentation";
    toolbar2.wrappable = true;
    toolbar2.appendToolbarItem(this.splitWidget.createShowHideSidebarButton(i18nString5(UIStrings5.showConsoleSidebar), i18nString5(UIStrings5.hideConsoleSidebar), i18nString5(UIStrings5.consoleSidebarShown), i18nString5(UIStrings5.consoleSidebarHidden), "console-sidebar"));
    toolbar2.appendToolbarItem(UI6.Toolbar.Toolbar.createActionButton("console.clear"));
    toolbar2.appendSeparator();
    toolbar2.appendToolbarItem(this.consoleContextSelector.toolbarItem());
    toolbar2.appendSeparator();
    const liveExpressionButton = UI6.Toolbar.Toolbar.createActionButton("console.create-pin");
    toolbar2.appendToolbarItem(liveExpressionButton);
    toolbar2.appendSeparator();
    toolbar2.appendToolbarItem(this.filter.textFilterUI);
    toolbar2.appendToolbarItem(this.filter.levelMenuButton);
    toolbar2.appendToolbarItem(this.filter.levelMenuButtonInfo);
    toolbar2.appendToolbarItem(this.progressToolbarItem);
    toolbar2.appendSeparator();
    this.issueCounter = new IssueCounter2.IssueCounter.IssueCounter();
    this.issueCounter.id = "console-issues-counter";
    this.issueCounter.setAttribute("jslog", `${VisualLogging4.counter("issues").track({ click: true })}`);
    const issuesToolbarItem = new UI6.Toolbar.ToolbarItem(this.issueCounter);
    this.issueCounter.data = {
      clickHandler: () => {
        Host2.userMetrics.issuesPanelOpenedFrom(
          2
          /* Host.UserMetrics.IssueOpener.STATUS_BAR_ISSUES_COUNTER */
        );
        void UI6.ViewManager.ViewManager.instance().showView("issues-pane");
      },
      issuesManager: IssuesManager.IssuesManager.IssuesManager.instance(),
      accessibleName: i18nString5(UIStrings5.issueToolbarTooltipGeneral),
      displayMode: "OmitEmpty"
    };
    toolbar2.appendToolbarItem(issuesToolbarItem);
    toolbar2.appendSeparator();
    toolbar2.appendToolbarItem(this.filterStatusText);
    toolbar2.appendToolbarItem(this.showSettingsPaneButton);
    const monitoringXHREnabledSetting = Common7.Settings.Settings.instance().moduleSetting("monitoring-xhr-enabled");
    this.timestampsSetting = Common7.Settings.Settings.instance().moduleSetting("console-timestamps-enabled");
    this.consoleHistoryAutocompleteSetting = Common7.Settings.Settings.instance().moduleSetting("console-history-autocomplete");
    this.selfXssWarningDisabledSetting = Common7.Settings.Settings.instance().createSetting(
      "disable-self-xss-warning",
      false,
      "Synced"
      /* Common.Settings.SettingStorageType.SYNCED */
    );
    const settingsPane = this.contentsElement.createChild("div", "console-settings-pane");
    UI6.ARIAUtils.setLabel(settingsPane, i18nString5(UIStrings5.consoleSettings));
    UI6.ARIAUtils.markAsGroup(settingsPane);
    const consoleEagerEvalSetting = Common7.Settings.Settings.instance().moduleSetting("console-eager-eval");
    const preserveConsoleLogSetting = Common7.Settings.Settings.instance().moduleSetting("preserve-console-log");
    const userActivationEvalSetting = Common7.Settings.Settings.instance().moduleSetting("console-user-activation-eval");
    settingsPane.append(UI6.SettingsUI.createSettingCheckbox(i18nString5(UIStrings5.hideNetwork), this.filter.hideNetworkMessagesSetting, this.filter.hideNetworkMessagesSetting.title()), UI6.SettingsUI.createSettingCheckbox(i18nString5(UIStrings5.logXMLHttpRequests), monitoringXHREnabledSetting), UI6.SettingsUI.createSettingCheckbox(i18nString5(UIStrings5.preserveLog), preserveConsoleLogSetting, i18nString5(UIStrings5.doNotClearLogOnPageReload)), UI6.SettingsUI.createSettingCheckbox(consoleEagerEvalSetting.title(), consoleEagerEvalSetting, i18nString5(UIStrings5.eagerlyEvaluateTextInThePrompt)), UI6.SettingsUI.createSettingCheckbox(i18nString5(UIStrings5.selectedContextOnly), this.filter.filterByExecutionContextSetting, i18nString5(UIStrings5.onlyShowMessagesFromTheCurrentContext)), UI6.SettingsUI.createSettingCheckbox(this.consoleHistoryAutocompleteSetting.title(), this.consoleHistoryAutocompleteSetting, i18nString5(UIStrings5.autocompleteFromHistory)), UI6.SettingsUI.createSettingCheckbox(this.groupSimilarSetting.title(), this.groupSimilarSetting, i18nString5(UIStrings5.groupSimilarMessagesInConsole)), UI6.SettingsUI.createSettingCheckbox(userActivationEvalSetting.title(), userActivationEvalSetting, i18nString5(UIStrings5.treatEvaluationAsUserActivation)), UI6.SettingsUI.createSettingCheckbox(this.showCorsErrorsSetting.title(), this.showCorsErrorsSetting, i18nString5(UIStrings5.showCorsErrorsInConsole)));
    if (!this.showSettingsPaneSetting.get()) {
      settingsPane.classList.add("hidden");
    }
    this.showSettingsPaneSetting.addChangeListener(() => settingsPane.classList.toggle("hidden", !this.showSettingsPaneSetting.get()));
    this.pinPane = new ConsolePinPane(liveExpressionButton, () => this.prompt.focus());
    this.pinPane.element.classList.add("console-view-pinpane");
    this.pinPane.show(this.contentsElement);
    this.viewport = new ConsoleViewport(this);
    this.viewport.setStickToBottom(true);
    this.viewport.contentElement().classList.add("console-group", "console-group-messages");
    this.contentsElement.appendChild(this.viewport.element);
    this.messagesElement = this.viewport.element;
    this.messagesElement.id = "console-messages";
    this.messagesElement.classList.add("monospace");
    this.messagesElement.addEventListener("click", this.messagesClicked.bind(this), false);
    ["paste", "clipboard-paste", "drop"].forEach((type) => {
      this.messagesElement.addEventListener(type, this.messagesPasted.bind(this), true);
    });
    this.messagesCountElement = this.consoleToolbarContainer.createChild("div", "message-count");
    UI6.ARIAUtils.markAsPoliteLiveRegion(this.messagesCountElement, false);
    this.viewportThrottler = new Common7.Throttler.Throttler(viewportThrottlerTimeout);
    this.pendingBatchResize = false;
    this.onMessageResizedBound = (e) => {
      void this.onMessageResized(e);
    };
    this.promptElement = this.messagesElement.createChild("div", "source-code");
    this.promptElement.id = "console-prompt";
    const selectAllFixer = this.messagesElement.createChild("div", "console-view-fix-select-all");
    selectAllFixer.textContent = ".";
    UI6.ARIAUtils.setHidden(selectAllFixer, true);
    this.registerShortcuts();
    this.messagesElement.addEventListener("contextmenu", this.handleContextMenuEvent.bind(this), false);
    const throttler = new Common7.Throttler.Throttler(100);
    const refilterMessages = () => throttler.schedule(async () => this.onFilterChanged());
    this.linkifier = new Components3.Linkifier.Linkifier(MaxLengthForLinks);
    this.linkifier.addEventListener("liveLocationUpdated", refilterMessages);
    this.consoleMessages = [];
    this.consoleGroupStarts = [];
    this.prompt = new ConsolePrompt();
    this.prompt.show(this.promptElement);
    this.prompt.element.addEventListener("keydown", this.promptKeyDown.bind(this), true);
    this.prompt.addEventListener("TextChanged", this.promptTextChanged, this);
    this.messagesElement.addEventListener("keydown", this.messagesKeyDown.bind(this), false);
    this.prompt.element.addEventListener("focusin", () => {
      if (this.isScrolledToBottom()) {
        this.viewport.setStickToBottom(true);
      }
    });
    this.consoleHistoryAutocompleteSetting.addChangeListener(this.consoleHistoryAutocompleteChanged, this);
    this.consoleHistoryAutocompleteChanged();
    this.updateFilterStatus();
    this.timestampsSetting.addChangeListener(this.consoleTimestampsSettingChanged, this);
    this.registerWithMessageSink();
    UI6.Context.Context.instance().addFlavorChangeListener(SDK6.RuntimeModel.ExecutionContext, this.executionContextChanged, this);
    this.messagesElement.addEventListener("mousedown", (event) => this.updateStickToBottomOnPointerDown(event.button === 2), false);
    this.messagesElement.addEventListener("mouseup", this.updateStickToBottomOnPointerUp.bind(this), false);
    this.messagesElement.addEventListener("mouseleave", this.updateStickToBottomOnPointerUp.bind(this), false);
    this.messagesElement.addEventListener("wheel", this.updateStickToBottomOnWheel.bind(this), false);
    this.messagesElement.addEventListener("touchstart", this.updateStickToBottomOnPointerDown.bind(this, false), false);
    this.messagesElement.addEventListener("touchend", this.updateStickToBottomOnPointerUp.bind(this), false);
    this.messagesElement.addEventListener("touchcancel", this.updateStickToBottomOnPointerUp.bind(this), false);
    SDK6.TargetManager.TargetManager.instance().addModelListener(SDK6.ConsoleModel.ConsoleModel, SDK6.ConsoleModel.Events.ConsoleCleared, this.consoleCleared, this, { scoped: true });
    SDK6.TargetManager.TargetManager.instance().addModelListener(SDK6.ConsoleModel.ConsoleModel, SDK6.ConsoleModel.Events.MessageAdded, this.onConsoleMessageAdded, this, { scoped: true });
    SDK6.TargetManager.TargetManager.instance().addModelListener(SDK6.ConsoleModel.ConsoleModel, SDK6.ConsoleModel.Events.MessageUpdated, this.onConsoleMessageUpdated, this, { scoped: true });
    SDK6.TargetManager.TargetManager.instance().addModelListener(SDK6.ConsoleModel.ConsoleModel, SDK6.ConsoleModel.Events.CommandEvaluated, this.commandEvaluated, this, { scoped: true });
    SDK6.TargetManager.TargetManager.instance().observeModels(SDK6.ConsoleModel.ConsoleModel, this, { scoped: true });
    const issuesManager = IssuesManager.IssuesManager.IssuesManager.instance();
    this.issueToolbarThrottle = new Common7.Throttler.Throttler(100);
    issuesManager.addEventListener("IssuesCountUpdated", this.#onIssuesCountUpdateBound);
  }
  static instance(opts) {
    if (!consoleViewInstance || opts?.forceNew) {
      consoleViewInstance = new _ConsoleView(opts?.viewportThrottlerTimeout ?? 50);
    }
    return consoleViewInstance;
  }
  static clearConsole() {
    SDK6.ConsoleModel.ConsoleModel.requestClearMessages();
  }
  #onIssuesCountUpdate() {
    void this.issueToolbarThrottle.schedule(async () => this.updateIssuesToolbarItem());
    this.issuesCountUpdatedForTest();
  }
  issuesCountUpdatedForTest() {
  }
  modelAdded(model) {
    model.messages().forEach(this.addConsoleMessage, this);
  }
  modelRemoved(model) {
    if (!Common7.Settings.Settings.instance().moduleSetting("preserve-console-log").get() && model.target().outermostTarget() === model.target()) {
      this.consoleCleared();
    }
  }
  onFilterChanged() {
    this.filter.currentFilter.levelsMask = this.isSidebarOpen ? ConsoleFilter.allLevelsFilterValue() : this.filter.messageLevelFiltersSetting.get();
    this.cancelBuildHiddenCache();
    if (this.immediatelyFilterMessagesForTest) {
      for (const viewMessage of this.consoleMessages) {
        this.computeShouldMessageBeVisible(viewMessage);
      }
      this.updateMessageList();
      return;
    }
    this.buildHiddenCache(0, this.consoleMessages.slice());
  }
  setImmediatelyFilterMessagesForTest() {
    this.immediatelyFilterMessagesForTest = true;
  }
  searchableView() {
    return this.searchableViewInternal;
  }
  clearHistory() {
    this.prompt.history().clear();
  }
  consoleHistoryAutocompleteChanged() {
    this.prompt.setAddCompletionsFromHistory(this.consoleHistoryAutocompleteSetting.get());
  }
  itemCount() {
    return this.visibleViewMessages.length;
  }
  itemElement(index) {
    return this.visibleViewMessages[index];
  }
  fastHeight(index) {
    return this.visibleViewMessages[index].fastHeight();
  }
  minimumRowHeight() {
    return 16;
  }
  registerWithMessageSink() {
    Common7.Console.Console.instance().messages().forEach(this.addSinkMessage, this);
    Common7.Console.Console.instance().addEventListener("messageAdded", ({ data: message }) => {
      this.addSinkMessage(message);
    }, this);
  }
  addSinkMessage(message) {
    let level = "verbose";
    switch (message.level) {
      case "info":
        level = "info";
        break;
      case "error":
        level = "error";
        break;
      case "warning":
        level = "warning";
        break;
    }
    const source = message.source || "other";
    const consoleMessage = new SDK6.ConsoleModel.ConsoleMessage(null, source, level, message.text, { type: SDK6.ConsoleModel.FrontendMessageType.System, timestamp: message.timestamp });
    this.addConsoleMessage(consoleMessage);
  }
  consoleTimestampsSettingChanged() {
    this.updateMessageList();
    this.consoleMessages.forEach((viewMessage) => viewMessage.updateTimestamp());
    this.groupableMessageTitle.forEach((viewMessage) => viewMessage.updateTimestamp());
  }
  executionContextChanged() {
    this.prompt.clearAutocomplete();
  }
  willHide() {
    this.hidePromptSuggestBox();
  }
  wasShown() {
    super.wasShown();
    if (this.#isDetached) {
      const issuesManager = IssuesManager.IssuesManager.IssuesManager.instance();
      issuesManager.addEventListener("IssuesCountUpdated", this.#onIssuesCountUpdateBound);
    }
    this.#isDetached = false;
    this.updateIssuesToolbarItem();
    this.viewport.refresh();
  }
  focus() {
    if (this.viewport.hasVirtualSelection()) {
      this.viewport.contentElement().focus();
    } else {
      this.focusPrompt();
    }
  }
  focusPrompt() {
    if (!this.prompt.hasFocus()) {
      const oldStickToBottom = this.viewport.stickToBottom();
      const oldScrollTop = this.viewport.element.scrollTop;
      this.prompt.focus();
      this.viewport.setStickToBottom(oldStickToBottom);
      this.viewport.element.scrollTop = oldScrollTop;
    }
  }
  restoreScrollPositions() {
    if (this.viewport.stickToBottom()) {
      this.immediatelyScrollToBottom();
    } else {
      super.restoreScrollPositions();
    }
  }
  onResize() {
    this.scheduleViewportRefresh();
    this.hidePromptSuggestBox();
    if (this.viewport.stickToBottom()) {
      this.immediatelyScrollToBottom();
    }
    for (let i = 0; i < this.visibleViewMessages.length; ++i) {
      this.visibleViewMessages[i].onResize();
    }
  }
  hidePromptSuggestBox() {
    this.prompt.clearAutocomplete();
  }
  async invalidateViewport() {
    this.updateIssuesToolbarItem();
    if (this.muteViewportUpdates) {
      this.maybeDirtyWhileMuted = true;
      return;
    }
    if (this.needsFullUpdate) {
      this.updateMessageList();
      delete this.needsFullUpdate;
    } else {
      this.viewport.invalidate();
    }
    return;
  }
  onDetach() {
    this.#isDetached = true;
    const issuesManager = IssuesManager.IssuesManager.IssuesManager.instance();
    issuesManager.removeEventListener("IssuesCountUpdated", this.#onIssuesCountUpdateBound);
  }
  updateIssuesToolbarItem() {
    if (this.#isDetached) {
      return;
    }
    const manager = IssuesManager.IssuesManager.IssuesManager.instance();
    const issueEnumeration = IssueCounter2.IssueCounter.getIssueCountsEnumeration(manager);
    const issuesTitleGotoIssues = manager.numberOfIssues() === 0 ? i18nString5(UIStrings5.issueToolbarClickToGoToTheIssuesTab) : i18nString5(UIStrings5.issueToolbarClickToView, { issueEnumeration });
    const issuesTitleGeneral = i18nString5(UIStrings5.issueToolbarTooltipGeneral);
    const issuesTitle = `${issuesTitleGeneral} ${issuesTitleGotoIssues}`;
    UI6.Tooltip.Tooltip.install(this.issueCounter, issuesTitle);
    this.issueCounter.data = {
      ...this.issueCounter.data,
      leadingText: i18nString5(UIStrings5.issuesWithColon, { n: manager.numberOfIssues() }),
      accessibleName: issuesTitle
    };
  }
  scheduleViewportRefresh() {
    if (this.muteViewportUpdates) {
      this.maybeDirtyWhileMuted = true;
      return;
    }
    this.scheduledRefreshPromiseForTest = this.viewportThrottler.schedule(this.invalidateViewport.bind(this));
  }
  getScheduledRefreshPromiseForTest() {
    return this.scheduledRefreshPromiseForTest;
  }
  immediatelyScrollToBottom() {
    this.viewport.setStickToBottom(true);
    this.promptElement.scrollIntoView(true);
  }
  updateFilterStatus() {
    if (this.hiddenByFilterCount === this.lastShownHiddenByFilterCount) {
      return;
    }
    this.filterStatusText.setText(i18nString5(UIStrings5.sHidden, { n: this.hiddenByFilterCount }));
    this.filterStatusText.setVisible(Boolean(this.hiddenByFilterCount));
    this.lastShownHiddenByFilterCount = this.hiddenByFilterCount;
  }
  onConsoleMessageAdded(event) {
    const message = event.data;
    this.addConsoleMessage(message);
  }
  addConsoleMessage(message) {
    const viewMessage = this.createViewMessage(message);
    consoleMessageToViewMessage.set(message, viewMessage);
    if (message.type === SDK6.ConsoleModel.FrontendMessageType.Command || message.type === SDK6.ConsoleModel.FrontendMessageType.Result) {
      const lastMessage = this.consoleMessages[this.consoleMessages.length - 1];
      const newTimestamp = lastMessage && messagesSortedBySymbol.get(lastMessage) || 0;
      messagesSortedBySymbol.set(viewMessage, newTimestamp);
    } else {
      messagesSortedBySymbol.set(viewMessage, viewMessage.consoleMessage().timestamp);
    }
    let insertAt;
    if (!this.consoleMessages.length || timeComparator(viewMessage, this.consoleMessages[this.consoleMessages.length - 1]) > 0) {
      insertAt = this.consoleMessages.length;
    } else {
      insertAt = Platform4.ArrayUtilities.upperBound(this.consoleMessages, viewMessage, timeComparator);
    }
    const insertedInMiddle = insertAt < this.consoleMessages.length;
    this.consoleMessages.splice(insertAt, 0, viewMessage);
    if (message.type === SDK6.ConsoleModel.FrontendMessageType.Command) {
      this.prompt.history().pushHistoryItem(message.messageText);
      if (this.prompt.history().length() >= MIN_HISTORY_LENGTH_FOR_DISABLING_SELF_XSS_WARNING && !this.selfXssWarningDisabledSetting.get()) {
        this.selfXssWarningDisabledSetting.set(true);
      }
    } else if (message.type !== SDK6.ConsoleModel.FrontendMessageType.Result) {
      const consoleGroupStartIndex = Platform4.ArrayUtilities.upperBound(this.consoleGroupStarts, viewMessage, timeComparator) - 1;
      if (consoleGroupStartIndex >= 0) {
        const currentGroup = this.consoleGroupStarts[consoleGroupStartIndex];
        addToGroup(viewMessage, currentGroup);
      }
      if (message.isGroupStartMessage()) {
        insertAt = Platform4.ArrayUtilities.upperBound(this.consoleGroupStarts, viewMessage, timeComparator);
        this.consoleGroupStarts.splice(insertAt, 0, viewMessage);
      }
    }
    this.filter.onMessageAdded(message);
    if (this.isSidebarOpen) {
      this.sidebar.onMessageAdded(viewMessage);
    } else {
      this.pendingSidebarMessages.push(viewMessage);
    }
    let shouldGoIntoGroup = false;
    const shouldGroupSimilar = this.groupSimilarSetting.get();
    if (message.isGroupable()) {
      const groupKey = viewMessage.groupKey();
      shouldGoIntoGroup = shouldGroupSimilar && this.groupableMessages.has(groupKey);
      let list = this.groupableMessages.get(groupKey);
      if (!list) {
        list = [];
        this.groupableMessages.set(groupKey, list);
      }
      list.push(viewMessage);
    }
    this.computeShouldMessageBeVisible(viewMessage);
    if (!shouldGoIntoGroup && !insertedInMiddle) {
      this.appendMessageToEnd(
        viewMessage,
        !shouldGroupSimilar
        /* crbug.com/1082963: prevent collapse of same messages when "Group similar" is false */
      );
      this.updateFilterStatus();
      this.searchableViewInternal.updateSearchMatchesCount(this.regexMatchRanges.length);
    } else {
      this.needsFullUpdate = true;
    }
    this.scheduleViewportRefresh();
    this.consoleMessageAddedForTest(viewMessage);
    function addToGroup(viewMessage2, currentGroup) {
      const currentEnd = currentGroup.groupEnd();
      if (currentEnd !== null) {
        if (timeComparator(viewMessage2, currentEnd) > 0) {
          const parent = currentGroup.consoleGroup();
          if (parent === null) {
            return;
          }
          addToGroup(viewMessage2, parent);
          return;
        }
      }
      if (viewMessage2.consoleMessage().type === "endGroup") {
        currentGroup.setGroupEnd(viewMessage2);
      } else {
        viewMessage2.setConsoleGroup(currentGroup);
      }
    }
    function timeComparator(viewMessage1, viewMessage2) {
      return (messagesSortedBySymbol.get(viewMessage1) || 0) - (messagesSortedBySymbol.get(viewMessage2) || 0);
    }
  }
  onConsoleMessageUpdated(event) {
    const message = event.data;
    const viewMessage = consoleMessageToViewMessage.get(message);
    if (viewMessage) {
      viewMessage.updateMessageElement();
      this.computeShouldMessageBeVisible(viewMessage);
      this.updateMessageList();
    }
  }
  consoleMessageAddedForTest(_viewMessage) {
  }
  shouldMessageBeVisible(viewMessage) {
    return !this.shouldBeHiddenCache.has(viewMessage);
  }
  computeShouldMessageBeVisible(viewMessage) {
    if (this.filter.shouldBeVisible(viewMessage) && (!this.isSidebarOpen || this.sidebar.shouldBeVisible(viewMessage))) {
      this.shouldBeHiddenCache.delete(viewMessage);
    } else {
      this.shouldBeHiddenCache.add(viewMessage);
    }
  }
  appendMessageToEnd(viewMessage, preventCollapse) {
    if (viewMessage.consoleMessage().category === "cors" && !this.showCorsErrorsSetting.get()) {
      return;
    }
    const lastMessage = this.visibleViewMessages[this.visibleViewMessages.length - 1];
    if (viewMessage.consoleMessage().type === "endGroup") {
      if (lastMessage) {
        const group = lastMessage.consoleGroup();
        if (group && !group.messagesHidden()) {
          lastMessage.incrementCloseGroupDecorationCount();
        }
      }
      return;
    }
    if (!this.shouldMessageBeVisible(viewMessage)) {
      this.hiddenByFilterCount++;
      return;
    }
    if (!preventCollapse && this.tryToCollapseMessages(viewMessage, this.visibleViewMessages[this.visibleViewMessages.length - 1])) {
      return;
    }
    const originatingMessage = viewMessage.consoleMessage().originatingMessage();
    const adjacent = Boolean(originatingMessage && lastMessage?.consoleMessage() === originatingMessage);
    viewMessage.setAdjacentUserCommandResult(adjacent);
    const currentGroup = viewMessage.consoleGroup();
    showGroup(currentGroup, this.visibleViewMessages);
    const shouldShowMessage = !currentGroup?.messagesHidden();
    if (shouldShowMessage) {
      this.visibleViewMessages.push(viewMessage);
      this.searchMessage(this.visibleViewMessages.length - 1);
    }
    this.messageAppendedForTests();
    function showGroup(currentGroup2, visibleViewMessages) {
      if (currentGroup2 === null) {
        return;
      }
      if (visibleViewMessages.includes(currentGroup2)) {
        return;
      }
      const parentGroup = currentGroup2.consoleGroup();
      if (parentGroup) {
        showGroup(parentGroup, visibleViewMessages);
      }
      visibleViewMessages.push(currentGroup2);
    }
  }
  messageAppendedForTests() {
  }
  createViewMessage(message) {
    switch (message.type) {
      case SDK6.ConsoleModel.FrontendMessageType.Command:
        return new ConsoleCommand(message, this.linkifier, this.requestResolver, this.issueResolver, this.onMessageResizedBound);
      case SDK6.ConsoleModel.FrontendMessageType.Result:
        return new ConsoleCommandResult(message, this.linkifier, this.requestResolver, this.issueResolver, this.onMessageResizedBound);
      case "startGroupCollapsed":
      case "startGroup":
        return new ConsoleGroupViewMessage(message, this.linkifier, this.requestResolver, this.issueResolver, this.updateMessageList.bind(this), this.onMessageResizedBound);
      case "table":
        return new ConsoleTableMessageView(message, this.linkifier, this.requestResolver, this.issueResolver, this.onMessageResizedBound);
      default:
        return new ConsoleViewMessage(message, this.linkifier, this.requestResolver, this.issueResolver, this.onMessageResizedBound);
    }
  }
  async onMessageResized(event) {
    const treeElement = event.data;
    if (this.pendingBatchResize || !treeElement.treeOutline) {
      return;
    }
    this.pendingBatchResize = true;
    await Promise.resolve();
    const treeOutlineElement = treeElement.treeOutline.element;
    this.viewport.setStickToBottom(this.isScrolledToBottom());
    if (treeOutlineElement.offsetHeight <= this.messagesElement.offsetHeight) {
      treeOutlineElement.scrollIntoViewIfNeeded();
    }
    this.pendingBatchResize = false;
  }
  consoleCleared() {
    const hadFocus = this.viewport.element.hasFocus();
    this.cancelBuildHiddenCache();
    this.currentMatchRangeIndex = -1;
    this.consoleMessages = [];
    this.groupableMessages.clear();
    this.groupableMessageTitle.clear();
    this.sidebar.clear();
    this.pendingSidebarMessages = [];
    this.updateMessageList();
    this.hidePromptSuggestBox();
    this.viewport.setStickToBottom(true);
    this.linkifier.reset();
    this.filter.clear();
    this.requestResolver.clear();
    this.consoleGroupStarts = [];
    if (hadFocus) {
      this.prompt.focus();
    }
    UI6.ARIAUtils.LiveAnnouncer.alert(i18nString5(UIStrings5.consoleCleared));
  }
  handleContextMenuEvent(event) {
    const contextMenu = new UI6.ContextMenu.ContextMenu(event);
    const eventTarget = event.target;
    if (eventTarget.isSelfOrDescendant(this.promptElement)) {
      void contextMenu.show();
      return;
    }
    const sourceElement = eventTarget.enclosingNodeOrSelfWithClass("console-message-wrapper");
    const consoleViewMessage = sourceElement && getMessageForElement(sourceElement);
    const consoleMessage = consoleViewMessage ? consoleViewMessage.consoleMessage() : null;
    if (consoleViewMessage) {
      UI6.Context.Context.instance().setFlavor(ConsoleViewMessage, consoleViewMessage);
    }
    if (consoleMessage && !consoleViewMessage?.element()?.matches(".has-insight") && consoleViewMessage?.shouldShowInsights()) {
      contextMenu.headerSection().appendAction(
        consoleViewMessage?.getExplainActionId(),
        void 0,
        /* optional=*/
        true
      );
    }
    if (consoleMessage && consoleMessage.url) {
      const menuTitle = i18nString5(UIStrings5.hideMessagesFromS, { PH1: new Common7.ParsedURL.ParsedURL(consoleMessage.url).displayName });
      contextMenu.headerSection().appendItem(menuTitle, this.filter.addMessageURLFilter.bind(this.filter, consoleMessage.url), { jslogContext: "hide-messages-from" });
    }
    contextMenu.defaultSection().appendAction("console.clear");
    contextMenu.defaultSection().appendAction("console.clear.history");
    contextMenu.saveSection().appendItem(i18nString5(UIStrings5.copyConsole), this.copyConsole.bind(this), { jslogContext: "copy-console" });
    contextMenu.saveSection().appendItem(i18nString5(UIStrings5.saveAs), this.saveConsole.bind(this), { jslogContext: "save-as" });
    if (this.element.hasSelection()) {
      contextMenu.clipboardSection().appendItem(i18nString5(UIStrings5.copyVisibleStyledSelection), this.viewport.copyWithStyles.bind(this.viewport), { jslogContext: "copy-visible-styled-selection" });
    }
    if (consoleMessage) {
      const request = Logs2.NetworkLog.NetworkLog.requestForConsoleMessage(consoleMessage);
      if (request && SDK6.NetworkManager.NetworkManager.canReplayRequest(request)) {
        contextMenu.debugSection().appendItem(i18nString5(UIStrings5.replayXhr), SDK6.NetworkManager.NetworkManager.replayRequest.bind(null, request), { jslogContext: "replay-xhr" });
      }
    }
    void contextMenu.show();
  }
  async saveConsole() {
    const url = SDK6.TargetManager.TargetManager.instance().scopeTarget().inspectedURL();
    const parsedURL = Common7.ParsedURL.ParsedURL.fromString(url);
    const filename = Platform4.StringUtilities.sprintf("%s-%d.log", parsedURL ? parsedURL.host : "console", Date.now());
    const stream = new Bindings2.FileUtils.FileOutputStream();
    const progressIndicator = new UI6.ProgressIndicator.ProgressIndicator();
    progressIndicator.setTitle(i18nString5(UIStrings5.writingFile));
    progressIndicator.setTotalWork(this.itemCount());
    const chunkSize = 350;
    if (!await stream.open(filename)) {
      return;
    }
    this.progressToolbarItem.element.appendChild(progressIndicator.element);
    let messageIndex = 0;
    while (messageIndex < this.itemCount() && !progressIndicator.isCanceled()) {
      const messageContents = [];
      let i;
      for (i = 0; i < chunkSize && i + messageIndex < this.itemCount(); ++i) {
        const message = this.itemElement(messageIndex + i);
        messageContents.push(message.toExportString());
      }
      messageIndex += i;
      await stream.write(messageContents.join("\n") + "\n");
      progressIndicator.setWorked(messageIndex);
    }
    void stream.close();
    progressIndicator.done();
  }
  async copyConsole() {
    const messageContents = [];
    for (let i = 0; i < this.itemCount(); i++) {
      const message = this.itemElement(i);
      messageContents.push(message.toExportString());
    }
    Host2.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(messageContents.join("\n") + "\n");
  }
  tryToCollapseMessages(viewMessage, lastMessage) {
    const timestampsShown = this.timestampsSetting.get();
    if (!timestampsShown && lastMessage && !viewMessage.consoleMessage().isGroupMessage() && viewMessage.consoleMessage().type !== SDK6.ConsoleModel.FrontendMessageType.Command && viewMessage.consoleMessage().type !== SDK6.ConsoleModel.FrontendMessageType.Result && viewMessage.consoleMessage().isEqual(lastMessage.consoleMessage())) {
      lastMessage.incrementRepeatCount();
      if (viewMessage.isLastInSimilarGroup()) {
        lastMessage.setInSimilarGroup(true, true);
      }
      return true;
    }
    return false;
  }
  buildHiddenCache(startIndex, viewMessages) {
    const startTime = Date.now();
    let i;
    for (i = startIndex; i < viewMessages.length; ++i) {
      this.computeShouldMessageBeVisible(viewMessages[i]);
      if (i % 10 === 0 && Date.now() - startTime > 12) {
        break;
      }
    }
    if (i === viewMessages.length) {
      this.updateMessageList();
      return;
    }
    this.buildHiddenCacheTimeout = this.element.window().requestAnimationFrame(this.buildHiddenCache.bind(this, i + 1, viewMessages));
  }
  cancelBuildHiddenCache() {
    this.shouldBeHiddenCache.clear();
    if (this.buildHiddenCacheTimeout) {
      this.element.window().cancelAnimationFrame(this.buildHiddenCacheTimeout);
      delete this.buildHiddenCacheTimeout;
    }
  }
  updateMessageList() {
    this.regexMatchRanges = [];
    this.hiddenByFilterCount = 0;
    for (const visibleViewMessage of this.visibleViewMessages) {
      visibleViewMessage.resetCloseGroupDecorationCount();
      visibleViewMessage.resetIncrementRepeatCount();
    }
    this.visibleViewMessages = [];
    if (this.groupSimilarSetting.get()) {
      this.addGroupableMessagesToEnd();
    } else {
      for (const consoleMessage of this.consoleMessages) {
        consoleMessage.setInSimilarGroup(false);
        if (consoleMessage.consoleMessage().isGroupable()) {
          consoleMessage.clearConsoleGroup();
        }
        this.appendMessageToEnd(
          consoleMessage,
          true
          /* crbug.com/1082963: prevent collaps`e of same messages when "Group similar" is false */
        );
      }
    }
    this.updateFilterStatus();
    this.searchableViewInternal.updateSearchMatchesCount(this.regexMatchRanges.length);
    this.jumpToMatch(this.currentMatchRangeIndex);
    this.viewport.invalidate();
    this.messagesCountElement.setAttribute("aria-label", i18nString5(UIStrings5.filteredMessagesInConsole, { PH1: this.visibleViewMessages.length }));
  }
  addGroupableMessagesToEnd() {
    const alreadyAdded = /* @__PURE__ */ new Set();
    const processedGroupKeys = /* @__PURE__ */ new Set();
    for (const viewMessage of this.consoleMessages) {
      const message = viewMessage.consoleMessage();
      if (alreadyAdded.has(message)) {
        continue;
      }
      if (!message.isGroupable()) {
        this.appendMessageToEnd(viewMessage);
        alreadyAdded.add(message);
        continue;
      }
      const key = viewMessage.groupKey();
      const viewMessagesInGroup = this.groupableMessages.get(key);
      if (!viewMessagesInGroup || viewMessagesInGroup.length < 5) {
        viewMessage.setInSimilarGroup(false);
        this.appendMessageToEnd(viewMessage);
        alreadyAdded.add(message);
        continue;
      }
      if (processedGroupKeys.has(key)) {
        continue;
      }
      if (!viewMessagesInGroup.find((x) => this.shouldMessageBeVisible(x))) {
        for (const viewMessageInGroup of viewMessagesInGroup) {
          alreadyAdded.add(viewMessageInGroup.consoleMessage());
        }
        processedGroupKeys.add(key);
        continue;
      }
      let startGroupViewMessage = this.groupableMessageTitle.get(key);
      if (!startGroupViewMessage) {
        const startGroupMessage = new SDK6.ConsoleModel.ConsoleMessage(null, message.source, message.level, viewMessage.groupTitle(), {
          type: "startGroupCollapsed"
          /* Protocol.Runtime.ConsoleAPICalledEventType.StartGroupCollapsed */
        });
        startGroupViewMessage = this.createViewMessage(startGroupMessage);
        this.groupableMessageTitle.set(key, startGroupViewMessage);
      }
      startGroupViewMessage.setRepeatCount(viewMessagesInGroup.length);
      this.appendMessageToEnd(startGroupViewMessage);
      for (const viewMessageInGroup of viewMessagesInGroup) {
        viewMessageInGroup.setInSimilarGroup(true, viewMessagesInGroup[viewMessagesInGroup.length - 1] === viewMessageInGroup);
        viewMessageInGroup.setConsoleGroup(startGroupViewMessage);
        this.appendMessageToEnd(viewMessageInGroup, true);
        alreadyAdded.add(viewMessageInGroup.consoleMessage());
      }
      const endGroupMessage = new SDK6.ConsoleModel.ConsoleMessage(null, message.source, message.level, message.messageText, {
        type: "endGroup"
        /* Protocol.Runtime.ConsoleAPICalledEventType.EndGroup */
      });
      this.appendMessageToEnd(this.createViewMessage(endGroupMessage));
    }
  }
  messagesClicked(event) {
    const target = event.target;
    if (!this.messagesElement.hasSelection()) {
      const clickedOutsideMessageList = target === this.messagesElement || this.prompt.belowEditorElement().isSelfOrAncestor(target);
      if (clickedOutsideMessageList) {
        this.prompt.moveCaretToEndOfPrompt();
        this.focusPrompt();
      }
    }
  }
  messagesKeyDown(event) {
    const keyEvent = event;
    const hasActionModifier = keyEvent.ctrlKey || keyEvent.altKey || keyEvent.metaKey;
    if (hasActionModifier || keyEvent.key.length !== 1 || UI6.UIUtils.isEditing() || this.messagesElement.hasSelection()) {
      return;
    }
    this.prompt.moveCaretToEndOfPrompt();
    this.focusPrompt();
  }
  messagesPasted(event) {
    if (!Root3.Runtime.Runtime.queryParam("isChromeForTesting") && !Root3.Runtime.Runtime.queryParam("disableSelfXssWarnings") && !this.selfXssWarningDisabledSetting.get()) {
      event.preventDefault();
      this.prompt.showSelfXssWarning();
    }
    if (UI6.UIUtils.isEditing()) {
      return;
    }
    this.prompt.focus();
  }
  registerShortcuts() {
    this.shortcuts.set(UI6.KeyboardShortcut.KeyboardShortcut.makeKey("u", UI6.KeyboardShortcut.Modifiers.Ctrl.value), this.clearPromptBackwards.bind(this));
  }
  clearPromptBackwards(e) {
    this.prompt.clear();
    void VisualLogging4.logKeyDown(e.currentTarget, e, "clear-prompt");
  }
  promptKeyDown(event) {
    const keyboardEvent = event;
    if (keyboardEvent.key === "PageUp") {
      this.updateStickToBottomOnWheel();
      return;
    }
    const shortcut = UI6.KeyboardShortcut.KeyboardShortcut.makeKeyFromEvent(keyboardEvent);
    const handler = this.shortcuts.get(shortcut);
    if (handler) {
      handler(keyboardEvent);
      keyboardEvent.preventDefault();
    }
  }
  printResult(result, originatingConsoleMessage, exceptionDetails) {
    if (!result) {
      return;
    }
    const level = Boolean(exceptionDetails) ? "error" : "info";
    let message;
    if (!exceptionDetails) {
      message = new SDK6.ConsoleModel.ConsoleMessage(result.runtimeModel(), "javascript", level, "", { type: SDK6.ConsoleModel.FrontendMessageType.Result, parameters: [result] });
    } else {
      message = SDK6.ConsoleModel.ConsoleMessage.fromException(result.runtimeModel(), exceptionDetails, SDK6.ConsoleModel.FrontendMessageType.Result, void 0, void 0);
    }
    message.setOriginatingMessage(originatingConsoleMessage);
    result.runtimeModel().target().model(SDK6.ConsoleModel.ConsoleModel)?.addMessage(message);
  }
  commandEvaluated(event) {
    const { data } = event;
    this.printResult(data.result, data.commandMessage, data.exceptionDetails);
  }
  elementsToRestoreScrollPositionsFor() {
    return [this.messagesElement];
  }
  onSearchCanceled() {
    this.cleanupAfterSearch();
    for (const message of this.visibleViewMessages) {
      message.setSearchRegex(null);
    }
    this.currentMatchRangeIndex = -1;
    this.regexMatchRanges = [];
    this.searchRegex = null;
    this.viewport.refresh();
  }
  performSearch(searchConfig, shouldJump, jumpBackwards) {
    this.onSearchCanceled();
    this.searchableViewInternal.updateSearchMatchesCount(0);
    this.searchRegex = searchConfig.toSearchRegex(true).regex;
    this.regexMatchRanges = [];
    this.currentMatchRangeIndex = -1;
    if (shouldJump) {
      this.searchShouldJumpBackwards = Boolean(jumpBackwards);
    }
    this.searchProgressIndicator = new UI6.ProgressIndicator.ProgressIndicator();
    this.searchProgressIndicator.setTitle(i18nString5(UIStrings5.searching));
    this.searchProgressIndicator.setTotalWork(this.visibleViewMessages.length);
    this.progressToolbarItem.element.appendChild(this.searchProgressIndicator.element);
    this.innerSearch(0);
  }
  cleanupAfterSearch() {
    delete this.searchShouldJumpBackwards;
    if (this.innerSearchTimeoutId) {
      clearTimeout(this.innerSearchTimeoutId);
      delete this.innerSearchTimeoutId;
    }
    if (this.searchProgressIndicator) {
      this.searchProgressIndicator.done();
      delete this.searchProgressIndicator;
    }
  }
  searchFinishedForTests() {
  }
  innerSearch(index) {
    delete this.innerSearchTimeoutId;
    if (this.searchProgressIndicator?.isCanceled()) {
      this.cleanupAfterSearch();
      return;
    }
    const startTime = Date.now();
    for (; index < this.visibleViewMessages.length && Date.now() - startTime < 100; ++index) {
      this.searchMessage(index);
    }
    this.searchableViewInternal.updateSearchMatchesCount(this.regexMatchRanges.length);
    if (typeof this.searchShouldJumpBackwards !== "undefined" && this.regexMatchRanges.length) {
      this.jumpToMatch(this.searchShouldJumpBackwards ? -1 : 0);
      delete this.searchShouldJumpBackwards;
    }
    if (index === this.visibleViewMessages.length) {
      this.cleanupAfterSearch();
      window.setTimeout(this.searchFinishedForTests.bind(this), 0);
      return;
    }
    this.innerSearchTimeoutId = window.setTimeout(this.innerSearch.bind(this, index), 100);
    if (this.searchProgressIndicator) {
      this.searchProgressIndicator.setWorked(index);
    }
  }
  searchMessage(index) {
    const message = this.visibleViewMessages[index];
    message.setSearchRegex(this.searchRegex);
    for (let i = 0; i < message.searchCount(); ++i) {
      this.regexMatchRanges.push({ messageIndex: index, matchIndex: i });
    }
  }
  jumpToNextSearchResult() {
    this.jumpToMatch(this.currentMatchRangeIndex + 1);
  }
  jumpToPreviousSearchResult() {
    this.jumpToMatch(this.currentMatchRangeIndex - 1);
  }
  supportsCaseSensitiveSearch() {
    return true;
  }
  supportsRegexSearch() {
    return true;
  }
  jumpToMatch(index) {
    if (!this.regexMatchRanges.length) {
      return;
    }
    let matchRange;
    if (this.currentMatchRangeIndex >= 0) {
      matchRange = this.regexMatchRanges[this.currentMatchRangeIndex];
      const message2 = this.visibleViewMessages[matchRange.messageIndex];
      message2.searchHighlightNode(matchRange.matchIndex).classList.remove(UI6.UIUtils.highlightedCurrentSearchResultClassName);
    }
    index = Platform4.NumberUtilities.mod(index, this.regexMatchRanges.length);
    this.currentMatchRangeIndex = index;
    this.searchableViewInternal.updateCurrentMatchIndex(index);
    matchRange = this.regexMatchRanges[index];
    const message = this.visibleViewMessages[matchRange.messageIndex];
    const highlightNode = message.searchHighlightNode(matchRange.matchIndex);
    highlightNode.classList.add(UI6.UIUtils.highlightedCurrentSearchResultClassName);
    this.viewport.scrollItemIntoView(matchRange.messageIndex);
    highlightNode.scrollIntoViewIfNeeded();
  }
  updateStickToBottomOnPointerDown(isRightClick) {
    this.muteViewportUpdates = !isRightClick;
    this.viewport.setStickToBottom(false);
    if (this.waitForScrollTimeout) {
      clearTimeout(this.waitForScrollTimeout);
      delete this.waitForScrollTimeout;
    }
  }
  updateStickToBottomOnPointerUp() {
    if (!this.muteViewportUpdates) {
      return;
    }
    this.waitForScrollTimeout = window.setTimeout(updateViewportState.bind(this), 200);
    function updateViewportState() {
      this.muteViewportUpdates = false;
      if (this.isShowing()) {
        this.viewport.setStickToBottom(this.isScrolledToBottom());
      }
      if (this.maybeDirtyWhileMuted) {
        this.scheduleViewportRefresh();
        delete this.maybeDirtyWhileMuted;
      }
      delete this.waitForScrollTimeout;
      this.updateViewportStickinessForTest();
    }
  }
  updateViewportStickinessForTest() {
  }
  updateStickToBottomOnWheel() {
    this.updateStickToBottomOnPointerDown();
    this.updateStickToBottomOnPointerUp();
  }
  promptTextChanged() {
    const oldStickToBottom = this.viewport.stickToBottom();
    const willStickToBottom = this.isScrolledToBottom();
    this.viewport.setStickToBottom(willStickToBottom);
    if (willStickToBottom && !oldStickToBottom) {
      this.scheduleViewportRefresh();
    }
    this.promptTextChangedForTest();
  }
  promptTextChangedForTest() {
  }
  isScrolledToBottom() {
    const distanceToPromptEditorBottom = this.messagesElement.scrollHeight - this.messagesElement.scrollTop - this.messagesElement.clientHeight - this.prompt.belowEditorElement().offsetHeight;
    return distanceToPromptEditorBottom <= 2;
  }
};
globalThis.Console = globalThis.Console || {};
globalThis.Console.ConsoleView = ConsoleView;
var ConsoleViewFilter = class _ConsoleViewFilter {
  filterChanged;
  messageLevelFiltersSetting;
  hideNetworkMessagesSetting;
  filterByExecutionContextSetting;
  suggestionBuilder;
  textFilterUI;
  textFilterSetting;
  filterParser;
  currentFilter;
  levelLabels;
  levelMenuButton;
  levelMenuButtonInfo;
  constructor(filterChangedCallback) {
    this.filterChanged = filterChangedCallback;
    this.messageLevelFiltersSetting = _ConsoleViewFilter.levelFilterSetting();
    this.hideNetworkMessagesSetting = Common7.Settings.Settings.instance().moduleSetting("hide-network-messages");
    this.filterByExecutionContextSetting = Common7.Settings.Settings.instance().moduleSetting("selected-context-filter-enabled");
    this.messageLevelFiltersSetting.addChangeListener(this.onFilterChanged.bind(this));
    this.hideNetworkMessagesSetting.addChangeListener(this.onFilterChanged.bind(this));
    this.filterByExecutionContextSetting.addChangeListener(this.onFilterChanged.bind(this));
    UI6.Context.Context.instance().addFlavorChangeListener(SDK6.RuntimeModel.ExecutionContext, this.onFilterChanged, this);
    const filterKeys = Object.values(FilterType);
    this.suggestionBuilder = new UI6.FilterSuggestionBuilder.FilterSuggestionBuilder(filterKeys);
    this.textFilterUI = new UI6.Toolbar.ToolbarFilter(void 0, 1, 1, i18nString5(UIStrings5.egEventdCdnUrlacom), this.suggestionBuilder.completions.bind(this.suggestionBuilder), true);
    this.textFilterSetting = Common7.Settings.Settings.instance().createSetting("console.text-filter", "");
    if (this.textFilterSetting.get()) {
      this.textFilterUI.setValue(this.textFilterSetting.get());
    }
    this.textFilterUI.addEventListener("TextChanged", () => {
      this.textFilterSetting.set(this.textFilterUI.value());
      this.onFilterChanged();
    });
    this.filterParser = new TextUtils5.TextUtils.FilterParser(filterKeys);
    this.currentFilter = new ConsoleFilter("", [], null, this.messageLevelFiltersSetting.get());
    this.updateCurrentFilter();
    this.levelLabels = /* @__PURE__ */ new Map([
      ["verbose", i18nString5(UIStrings5.verbose)],
      ["info", i18nString5(UIStrings5.info)],
      ["warning", i18nString5(UIStrings5.warnings)],
      ["error", i18nString5(UIStrings5.errors)]
    ]);
    this.levelMenuButton = new UI6.Toolbar.ToolbarMenuButton(this.appendLevelMenuItems.bind(this), void 0, void 0, "log-level");
    const levelMenuButtonInfoIcon = IconButton3.Icon.create("info", "console-sidebar-levels-info");
    levelMenuButtonInfoIcon.title = i18nString5(UIStrings5.overriddenByFilterSidebar);
    this.levelMenuButtonInfo = new UI6.Toolbar.ToolbarItem(levelMenuButtonInfoIcon);
    this.levelMenuButtonInfo.setVisible(false);
    this.updateLevelMenuButtonText();
    this.messageLevelFiltersSetting.addChangeListener(this.updateLevelMenuButtonText.bind(this));
  }
  onMessageAdded(message) {
    if (message.type === SDK6.ConsoleModel.FrontendMessageType.Command || message.type === SDK6.ConsoleModel.FrontendMessageType.Result || message.isGroupMessage()) {
      return;
    }
    if (message.context) {
      this.suggestionBuilder.addItem(FilterType.Context, message.context);
    }
    if (message.source) {
      this.suggestionBuilder.addItem(FilterType.Source, message.source);
    }
    if (message.url) {
      this.suggestionBuilder.addItem(FilterType.Url, message.url);
    }
  }
  setLevelMenuOverridden(overridden) {
    this.levelMenuButton.setEnabled(!overridden);
    this.levelMenuButtonInfo.setVisible(overridden);
    if (overridden) {
      this.levelMenuButton.setText(i18nString5(UIStrings5.customLevels));
    } else {
      this.updateLevelMenuButtonText();
    }
  }
  static levelFilterSetting() {
    return Common7.Settings.Settings.instance().createSetting("message-level-filters", ConsoleFilter.defaultLevelsFilterValue());
  }
  updateCurrentFilter() {
    const parsedFilters = this.filterParser.parse(this.textFilterUI.value());
    for (const { key } of parsedFilters) {
      switch (key) {
        case FilterType.Context:
          Host2.userMetrics.actionTaken(Host2.UserMetrics.Action.ConsoleFilterByContext);
          break;
        case FilterType.Source:
          Host2.userMetrics.actionTaken(Host2.UserMetrics.Action.ConsoleFilterBySource);
          break;
        case FilterType.Url:
          Host2.userMetrics.actionTaken(Host2.UserMetrics.Action.ConsoleFilterByUrl);
          break;
      }
    }
    if (this.hideNetworkMessagesSetting.get()) {
      parsedFilters.push({ key: FilterType.Source, text: "network", negative: true, regex: void 0 });
    }
    this.currentFilter.executionContext = this.filterByExecutionContextSetting.get() ? UI6.Context.Context.instance().flavor(SDK6.RuntimeModel.ExecutionContext) : null;
    this.currentFilter.parsedFilters = parsedFilters;
    this.currentFilter.levelsMask = this.messageLevelFiltersSetting.get();
  }
  onFilterChanged() {
    this.updateCurrentFilter();
    this.filterChanged();
  }
  updateLevelMenuButtonText() {
    let isAll = true;
    let isDefault = true;
    const allValue = ConsoleFilter.allLevelsFilterValue();
    const defaultValue = ConsoleFilter.defaultLevelsFilterValue();
    let text = null;
    const levels = this.messageLevelFiltersSetting.get();
    const allLevels = {
      Verbose: "verbose",
      Info: "info",
      Warning: "warning",
      Error: "error"
    };
    for (const name of Object.values(allLevels)) {
      isAll = isAll && levels[name] === allValue[name];
      isDefault = isDefault && levels[name] === defaultValue[name];
      if (levels[name]) {
        text = text ? i18nString5(UIStrings5.customLevels) : i18nString5(UIStrings5.sOnly, { PH1: String(this.levelLabels.get(name)) });
      }
    }
    if (isAll) {
      text = i18nString5(UIStrings5.allLevels);
    } else if (isDefault) {
      text = i18nString5(UIStrings5.defaultLevels);
    } else {
      text = text || i18nString5(UIStrings5.hideAll);
    }
    this.levelMenuButton.element.classList.toggle("warning", !isAll && !isDefault);
    this.levelMenuButton.setText(text);
    this.levelMenuButton.setTitle(i18nString5(UIStrings5.logLevelS, { PH1: text }));
  }
  appendLevelMenuItems(contextMenu) {
    const setting = this.messageLevelFiltersSetting;
    const levels = setting.get();
    contextMenu.headerSection().appendItem(i18nString5(UIStrings5.default), () => setting.set(ConsoleFilter.defaultLevelsFilterValue()), { jslogContext: "default" });
    for (const [level, levelText] of this.levelLabels.entries()) {
      contextMenu.defaultSection().appendCheckboxItem(levelText, toggleShowLevel.bind(null, level), { checked: levels[level], jslogContext: level });
    }
    function toggleShowLevel(level) {
      levels[level] = !levels[level];
      setting.set(levels);
    }
  }
  addMessageURLFilter(url) {
    if (!url) {
      return;
    }
    const suffix = this.textFilterUI.value() ? ` ${this.textFilterUI.value()}` : "";
    this.textFilterUI.setValue(`-url:${url}${suffix}`);
    this.textFilterSetting.set(this.textFilterUI.value());
    this.onFilterChanged();
  }
  shouldBeVisible(viewMessage) {
    return this.currentFilter.shouldBeVisible(viewMessage);
  }
  clear() {
    this.suggestionBuilder.clear();
  }
  reset() {
    this.messageLevelFiltersSetting.set(ConsoleFilter.defaultLevelsFilterValue());
    this.filterByExecutionContextSetting.set(false);
    this.hideNetworkMessagesSetting.set(false);
    this.textFilterUI.setValue("");
    this.onFilterChanged();
  }
};
var ActionDelegate = class {
  handleAction(_context, actionId) {
    switch (actionId) {
      case "console.toggle":
        if (ConsoleView.instance().hasFocus() && UI6.InspectorView.InspectorView.instance().drawerVisible()) {
          UI6.InspectorView.InspectorView.instance().closeDrawer();
          return true;
        }
        Host2.InspectorFrontendHost.InspectorFrontendHostInstance.bringToFront();
        Common7.Console.Console.instance().show();
        ConsoleView.instance().focusPrompt();
        return true;
      case "console.clear":
        ConsoleView.clearConsole();
        return true;
      case "console.clear.history":
        ConsoleView.instance().clearHistory();
        return true;
      case "console.create-pin":
        ConsoleView.instance().pinPane.addPin(
          "",
          true
          /* userGesture */
        );
        return true;
    }
    return false;
  }
};
var messagesSortedBySymbol = /* @__PURE__ */ new WeakMap();
var consoleMessageToViewMessage = /* @__PURE__ */ new WeakMap();

// gen/front_end/panels/console/ConsolePanel.js
var consolePanelInstance;
var ConsolePanel = class _ConsolePanel extends UI7.Panel.Panel {
  view;
  constructor() {
    super("console");
    this.view = ConsoleView.instance();
  }
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!consolePanelInstance || forceNew) {
      consolePanelInstance = new _ConsolePanel();
    }
    return consolePanelInstance;
  }
  static updateContextFlavor() {
    const consoleView = _ConsolePanel.instance().view;
    UI7.Context.Context.instance().setFlavor(ConsoleView, consoleView.isShowing() ? consoleView : null);
  }
  wasShown() {
    super.wasShown();
    const wrapper = wrapperViewInstance;
    if (wrapper?.isShowing()) {
      UI7.InspectorView.InspectorView.instance().setDrawerMinimized(true);
    }
    this.view.show(this.element);
    _ConsolePanel.updateContextFlavor();
  }
  willHide() {
    super.willHide();
    UI7.InspectorView.InspectorView.instance().setDrawerMinimized(false);
    if (wrapperViewInstance) {
      wrapperViewInstance.showViewInWrapper();
    }
    _ConsolePanel.updateContextFlavor();
  }
  searchableView() {
    return ConsoleView.instance().searchableView();
  }
};
var wrapperViewInstance = null;
var WrapperView = class _WrapperView extends UI7.Widget.VBox {
  view;
  constructor() {
    super();
    this.view = ConsoleView.instance();
    this.element.setAttribute("jslog", `${VisualLogging5.panel("console").track({ resize: true })}`);
  }
  static instance() {
    if (!wrapperViewInstance) {
      wrapperViewInstance = new _WrapperView();
    }
    return wrapperViewInstance;
  }
  wasShown() {
    if (!ConsolePanel.instance().isShowing()) {
      this.showViewInWrapper();
    } else {
      UI7.InspectorView.InspectorView.instance().setDrawerMinimized(true);
    }
    ConsolePanel.updateContextFlavor();
  }
  willHide() {
    UI7.InspectorView.InspectorView.instance().setDrawerMinimized(false);
    ConsolePanel.updateContextFlavor();
  }
  showViewInWrapper() {
    this.view.show(this.element);
  }
};
var ConsoleRevealer = class {
  async reveal(_object) {
    const consoleView = ConsoleView.instance();
    if (consoleView.isShowing()) {
      consoleView.focus();
      return;
    }
    await UI7.ViewManager.ViewManager.instance().showView("console-view");
  }
};

// gen/front_end/panels/console/consolePrompt.css.js
var consolePrompt_css_default = `/*
 * Copyright 2018 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

#console-prompt .CodeMirror {
  padding: 3px 0 1px;
}

#console-prompt .CodeMirror-line {
  padding-top: 0;
}

#console-prompt .CodeMirror-lines {
  padding-top: 0;
}

#console-prompt .console-prompt-icon {
  position: absolute;
  left: -13px;
  top: 2px;
  user-select: none;
}

.console-eager-preview {
  padding-bottom: 2px;
  opacity: 60%;
  position: relative;
}

.console-eager-inner-preview {
  text-overflow: ellipsis;
  overflow: hidden;
  margin-left: 4px;
  height: 100%;
  white-space: nowrap;
}

.preview-result-icon {
  position: absolute;
  left: -13px;
  top: -1px;
}

.console-eager-inner-preview:empty,
.console-eager-inner-preview:empty + .preview-result-icon {
  opacity: 0%;
}

.console-prompt-icon.console-prompt-incomplete {
  opacity: 65%;
}

/*# sourceURL=${import.meta.resolve("./consolePrompt.css")} */`;

// gen/front_end/panels/console/ConsolePrompt.js
var { Direction } = TextEditor3.TextEditorHistory;
var UIStrings6 = {
  /**
   *@description Text in Console Prompt of the Console panel
   */
  consolePrompt: "Console prompt",
  /**
   *@description Warning shown to users when pasting text into the DevTools console.
   *@example {allow pasting} PH1
   */
  selfXssWarning: "Warning: Don\u2019t paste code into the DevTools Console that you don\u2019t understand or haven\u2019t reviewed yourself. This could allow attackers to steal your identity or take control of your computer. Please type \u2018{PH1}\u2019 below and press Enter to allow pasting.",
  /**
   *@description Text a user needs to type in order to confirm that they are aware of the danger of pasting code into the DevTools console.
   */
  allowPasting: "allow pasting"
};
var str_6 = i18n11.i18n.registerUIStrings("panels/console/ConsolePrompt.ts", UIStrings6);
var i18nString6 = i18n11.i18n.getLocalizedString.bind(void 0, str_6);
var ConsolePrompt = class extends Common8.ObjectWrapper.eventMixin(UI8.Widget.Widget) {
  addCompletionsFromHistory;
  historyInternal;
  initialText;
  editor;
  eagerPreviewElement;
  textChangeThrottler;
  requestPreviewBound;
  requestPreviewCurrent = 0;
  innerPreviewElement;
  promptIcon;
  iconThrottler;
  eagerEvalSetting;
  previewRequestForTest;
  highlightingNode;
  // The CodeMirror state field that controls whether the argument hints are showing.
  // If they are, the escape key will clear them. However, if they aren't, then the
  // console drawer should be hidden as a whole.
  #argumentHintsState;
  #editorHistory;
  #selfXssWarningShown = false;
  #javaScriptCompletionCompartment = new CodeMirror2.Compartment();
  aidaClient;
  aiCodeCompletion;
  placeholderCompartment = new CodeMirror2.Compartment();
  teaserContainer;
  aiCodeCompletionThrottler;
  aiCodeCompletionSetting = Common8.Settings.Settings.instance().createSetting("ai-code-completion-fre-completed", false);
  #getJavaScriptCompletionExtensions() {
    if (this.#selfXssWarningShown) {
      return [];
    }
    if (Root4.Runtime.Runtime.queryParam("noJavaScriptCompletion") !== "true") {
      return [
        CodeMirror2.javascript.javascript(),
        TextEditor3.JavaScript.completion()
      ];
    }
    return [CodeMirror2.javascript.javascriptLanguage];
  }
  #updateJavaScriptCompletionCompartment() {
    const extensions = this.#getJavaScriptCompletionExtensions();
    const effects = this.#javaScriptCompletionCompartment.reconfigure(extensions);
    this.editor.dispatch({ effects });
  }
  constructor() {
    super();
    this.registerRequiredCSS(consolePrompt_css_default);
    this.addCompletionsFromHistory = true;
    this.historyInternal = new TextEditor3.AutocompleteHistory.AutocompleteHistory(Common8.Settings.Settings.instance().createLocalSetting("console-history", []));
    this.initialText = "";
    this.eagerPreviewElement = document.createElement("div");
    this.eagerPreviewElement.classList.add("console-eager-preview");
    this.textChangeThrottler = new Common8.Throttler.Throttler(150);
    this.requestPreviewBound = this.requestPreview.bind(this);
    this.innerPreviewElement = this.eagerPreviewElement.createChild("div", "console-eager-inner-preview");
    const previewIcon = new IconButton4.Icon.Icon();
    previewIcon.data = { iconName: "chevron-left-dot", color: "var(--icon-default)", width: "16px", height: "16px" };
    previewIcon.classList.add("preview-result-icon");
    this.eagerPreviewElement.appendChild(previewIcon);
    const editorContainerElement = this.element.createChild("div", "console-prompt-editor-container");
    this.element.appendChild(this.eagerPreviewElement);
    this.promptIcon = new IconButton4.Icon.Icon();
    this.promptIcon.data = { iconName: "chevron-right", color: "var(--icon-action)", width: "16px", height: "16px" };
    this.promptIcon.classList.add("console-prompt-icon");
    this.element.appendChild(this.promptIcon);
    this.iconThrottler = new Common8.Throttler.Throttler(0);
    this.eagerEvalSetting = Common8.Settings.Settings.instance().moduleSetting("console-eager-eval");
    this.eagerEvalSetting.addChangeListener(this.eagerSettingChanged.bind(this));
    this.eagerPreviewElement.classList.toggle("hidden", !this.eagerEvalSetting.get());
    this.element.tabIndex = 0;
    this.previewRequestForTest = null;
    this.highlightingNode = false;
    const argumentHints = TextEditor3.JavaScript.argumentHints();
    this.#argumentHintsState = argumentHints[0];
    const autocompleteOnEnter = TextEditor3.Config.DynamicSetting.bool("console-autocomplete-on-enter", [], TextEditor3.Config.conservativeCompletion);
    const extensions = [
      CodeMirror2.keymap.of(this.editorKeymap()),
      CodeMirror2.EditorView.updateListener.of((update) => this.editorUpdate(update)),
      argumentHints,
      autocompleteOnEnter.instance(),
      TextEditor3.Config.showCompletionHint,
      TextEditor3.Config.baseConfiguration(this.initialText),
      TextEditor3.Config.autocompletion.instance(),
      CodeMirror2.javascript.javascriptLanguage.data.of({
        autocomplete: (context) => this.addCompletionsFromHistory ? this.#editorHistory.historyCompletions(context) : null
      }),
      CodeMirror2.EditorView.contentAttributes.of({ "aria-label": i18nString6(UIStrings6.consolePrompt) }),
      CodeMirror2.EditorView.lineWrapping,
      CodeMirror2.autocompletion({ aboveCursor: true }),
      this.#javaScriptCompletionCompartment.of(this.#getJavaScriptCompletionExtensions())
    ];
    if (this.isAiCodeCompletionEnabled()) {
      this.teaserContainer = document.createElement("div");
      const teaser = new AiCodeCompletionTeaser();
      teaser.show(this.teaserContainer, void 0, true);
      extensions.push(TextEditor3.Config.aiAutoCompleteSuggestion, this.placeholderCompartment.of(CodeMirror2.placeholder(this.teaserContainer)));
    }
    const doc = this.initialText;
    const editorState = CodeMirror2.EditorState.create({ doc, extensions });
    this.editor = new TextEditor3.TextEditor.TextEditor(editorState);
    this.editor.addEventListener("keydown", (event) => {
      if (event.defaultPrevented) {
        event.stopPropagation();
      }
    });
    editorContainerElement.appendChild(this.editor);
    this.#editorHistory = new TextEditor3.TextEditorHistory.TextEditorHistory(this.editor, this.historyInternal);
    if (this.hasFocus()) {
      this.focus();
    }
    this.element.removeAttribute("tabindex");
    this.editorSetForTest();
    Host3.userMetrics.panelLoaded("console", "DevTools.Launch.Console");
    this.element.setAttribute("jslog", `${VisualLogging6.textField("console-prompt").track({
      change: true,
      keydown: "Enter|ArrowUp|ArrowDown|PageUp"
    })}`);
    if (this.isAiCodeCompletionEnabled()) {
      this.aiCodeCompletionSetting.addChangeListener(this.onAiCodeCompletionSettingChanged.bind(this));
      this.onAiCodeCompletionSettingChanged();
    }
  }
  eagerSettingChanged() {
    const enabled = this.eagerEvalSetting.get();
    this.eagerPreviewElement.classList.toggle("hidden", !enabled);
    if (enabled) {
      void this.requestPreview();
    }
  }
  belowEditorElement() {
    return this.eagerPreviewElement;
  }
  onTextChanged(docContentChanged) {
    if (this.eagerEvalSetting.get()) {
      const asSoonAsPossible = !TextEditor3.Config.contentIncludingHint(this.editor.editor);
      this.previewRequestForTest = this.textChangeThrottler.schedule(
        this.requestPreviewBound,
        asSoonAsPossible ? "AsSoonAsPossible" : "Default"
        /* Common.Throttler.Scheduling.DEFAULT */
      );
    }
    if (docContentChanged && this.aiCodeCompletion && this.isAiCodeCompletionEnabled()) {
      this.triggerAiCodeCompletion();
    }
    this.updatePromptIcon();
    this.dispatchEventToListeners(
      "TextChanged"
      /* Events.TEXT_CHANGED */
    );
  }
  triggerAiCodeCompletion() {
    const { doc, selection } = this.editor.state;
    const query = doc.toString();
    const cursor = selection.main.head;
    const currentExecutionContext = UI8.Context.Context.instance().flavor(SDK7.RuntimeModel.ExecutionContext);
    let prefix = query.substring(0, cursor);
    if (currentExecutionContext) {
      const consoleModel = currentExecutionContext.target().model(SDK7.ConsoleModel.ConsoleModel);
      if (consoleModel) {
        let lastMessage = "";
        let consoleMessages = "";
        for (const message of consoleModel.messages()) {
          if (message.type !== SDK7.ConsoleModel.FrontendMessageType.Command || message.messageText === lastMessage) {
            continue;
          }
          lastMessage = message.messageText;
          consoleMessages = consoleMessages + message.messageText + "\n\n";
        }
        prefix = consoleMessages + prefix;
      }
    }
    let suffix = query.substring(cursor);
    if (suffix === "") {
      suffix = "\n";
    }
    this.aiCodeCompletion?.onTextChanged(prefix, suffix);
  }
  async requestPreview() {
    const id = ++this.requestPreviewCurrent;
    const text = TextEditor3.Config.contentIncludingHint(this.editor.editor).trim();
    const executionContext = UI8.Context.Context.instance().flavor(SDK7.RuntimeModel.ExecutionContext);
    const { preview, result } = await ObjectUI3.JavaScriptREPL.JavaScriptREPL.evaluateAndBuildPreview(
      text,
      true,
      true,
      500
      /* timeout */
    );
    if (this.requestPreviewCurrent !== id) {
      return;
    }
    this.innerPreviewElement.removeChildren();
    if (preview.deepTextContent() !== TextEditor3.Config.contentIncludingHint(this.editor.editor).trim()) {
      this.innerPreviewElement.appendChild(preview);
    }
    if (result && "object" in result && result.object && result.object.subtype === "node") {
      this.highlightingNode = true;
      SDK7.OverlayModel.OverlayModel.highlightObjectAsDOMNode(result.object);
    } else if (this.highlightingNode) {
      this.highlightingNode = false;
      SDK7.OverlayModel.OverlayModel.hideDOMNodeHighlight();
    }
    if (result && executionContext) {
      executionContext.runtimeModel.releaseEvaluationResult(result);
    }
  }
  willHide() {
    super.willHide();
    if (this.highlightingNode) {
      this.highlightingNode = false;
      SDK7.OverlayModel.OverlayModel.hideDOMNodeHighlight();
    }
  }
  history() {
    return this.historyInternal;
  }
  clearAutocomplete() {
    CodeMirror2.closeCompletion(this.editor.editor);
  }
  moveCaretToEndOfPrompt() {
    this.editor.dispatch({
      selection: CodeMirror2.EditorSelection.cursor(this.editor.state.doc.length)
    });
  }
  clear() {
    this.editor.dispatch({
      changes: { from: 0, to: this.editor.state.doc.length }
    });
  }
  text() {
    return this.editor.state.doc.toString();
  }
  setAddCompletionsFromHistory(value) {
    this.addCompletionsFromHistory = value;
  }
  editorKeymap() {
    const keymap3 = [
      { key: "ArrowUp", run: () => this.#editorHistory.moveHistory(
        -1
        /* Direction.BACKWARD */
      ) },
      { key: "ArrowDown", run: () => this.#editorHistory.moveHistory(
        1
        /* Direction.FORWARD */
      ) },
      { mac: "Ctrl-p", run: () => this.#editorHistory.moveHistory(-1, true) },
      { mac: "Ctrl-n", run: () => this.#editorHistory.moveHistory(1, true) },
      {
        key: "Escape",
        run: () => this.runOnEscape()
      },
      {
        key: "Ctrl-Enter",
        run: () => {
          void this.handleEnter(
            /* forceEvaluate */
            true
          );
          return true;
        }
      },
      {
        key: "Enter",
        run: () => {
          void this.handleEnter();
          return true;
        },
        shift: CodeMirror2.insertNewlineAndIndent
      }
    ];
    if (this.isAiCodeCompletionEnabled()) {
      keymap3.push({
        key: "Tab",
        run: () => {
          return TextEditor3.Config.acceptAiAutoCompleteSuggestion(this.editor.editor);
        }
      });
    }
    return keymap3;
  }
  runOnEscape() {
    if (TextEditor3.JavaScript.closeArgumentsHintsTooltip(this.editor.editor, this.#argumentHintsState)) {
      return true;
    }
    if (this.aiCodeCompletion && TextEditor3.Config.setAiAutoCompleteSuggestion) {
      this.editor.dispatch({
        effects: TextEditor3.Config.setAiAutoCompleteSuggestion.of(null)
      });
      return true;
    }
    return false;
  }
  async enterWillEvaluate(forceEvaluate) {
    const { doc, selection } = this.editor.state;
    if (!doc.length) {
      return false;
    }
    if (forceEvaluate || selection.main.head < doc.length) {
      return true;
    }
    const currentExecutionContext = UI8.Context.Context.instance().flavor(SDK7.RuntimeModel.ExecutionContext);
    const isExpressionComplete = await TextEditor3.JavaScript.isExpressionComplete(doc.toString());
    if (currentExecutionContext !== UI8.Context.Context.instance().flavor(SDK7.RuntimeModel.ExecutionContext)) {
      return false;
    }
    return isExpressionComplete;
  }
  showSelfXssWarning() {
    Common8.Console.Console.instance().warn(i18nString6(UIStrings6.selfXssWarning, { PH1: i18nString6(UIStrings6.allowPasting) }), Common8.Console.FrontendMessageSource.SELF_XSS);
    this.#selfXssWarningShown = true;
    Host3.userMetrics.actionTaken(Host3.UserMetrics.Action.SelfXssWarningConsoleMessageShown);
    this.#updateJavaScriptCompletionCompartment();
  }
  async handleEnter(forceEvaluate) {
    if (this.#selfXssWarningShown && this.text() === i18nString6(UIStrings6.allowPasting)) {
      Common8.Console.Console.instance().log(this.text());
      this.editor.dispatch({
        changes: { from: 0, to: this.editor.state.doc.length },
        scrollIntoView: true
      });
      Common8.Settings.Settings.instance().createSetting(
        "disable-self-xss-warning",
        false,
        "Synced"
        /* Common.Settings.SettingStorageType.SYNCED */
      ).set(true);
      this.#selfXssWarningShown = false;
      Host3.userMetrics.actionTaken(Host3.UserMetrics.Action.SelfXssAllowPastingInConsole);
      this.#updateJavaScriptCompletionCompartment();
      return;
    }
    if (await this.enterWillEvaluate(forceEvaluate)) {
      this.appendCommand(this.text(), true);
      TextEditor3.JavaScript.closeArgumentsHintsTooltip(this.editor.editor, this.#argumentHintsState);
      this.editor.dispatch({
        changes: { from: 0, to: this.editor.state.doc.length },
        scrollIntoView: true
      });
      if (this.teaserContainer) {
        this.editor.dispatch({
          effects: this.placeholderCompartment.reconfigure([])
        });
        this.teaserContainer = void 0;
      }
    } else if (this.editor.state.doc.length) {
      CodeMirror2.insertNewlineAndIndent(this.editor.editor);
    } else {
      this.editor.dispatch({ scrollIntoView: true });
    }
  }
  updatePromptIcon() {
    void this.iconThrottler.schedule(async () => {
      this.promptIcon.classList.toggle("console-prompt-incomplete", !await this.enterWillEvaluate());
    });
  }
  appendCommand(text, useCommandLineAPI) {
    const currentExecutionContext = UI8.Context.Context.instance().flavor(SDK7.RuntimeModel.ExecutionContext);
    if (currentExecutionContext) {
      const executionContext = currentExecutionContext;
      const consoleModel = executionContext.target().model(SDK7.ConsoleModel.ConsoleModel);
      if (consoleModel) {
        const message = consoleModel.addCommandMessage(executionContext, text);
        const expression = ObjectUI3.JavaScriptREPL.JavaScriptREPL.wrapObjectLiteral(text);
        void this.evaluateCommandInConsole(executionContext, message, expression, useCommandLineAPI);
        if (ConsolePanel.instance().isShowing()) {
          Host3.userMetrics.actionTaken(Host3.UserMetrics.Action.CommandEvaluatedInConsolePanel);
        }
      }
    }
  }
  async evaluateCommandInConsole(executionContext, message, expression, useCommandLineAPI) {
    const callFrame = executionContext.debuggerModel.selectedCallFrame();
    if (callFrame?.script.isJavaScript()) {
      const nameMap = await SourceMapScopes.NamesResolver.allVariablesInCallFrame(callFrame);
      expression = await this.substituteNames(expression, nameMap);
    }
    await executionContext.target().model(SDK7.ConsoleModel.ConsoleModel)?.evaluateCommandInConsole(executionContext, message, expression, useCommandLineAPI);
  }
  async substituteNames(expression, mapping) {
    try {
      return await Formatter.FormatterWorkerPool.formatterWorkerPool().javaScriptSubstitute(expression, mapping);
    } catch {
      return expression;
    }
  }
  editorUpdate(update) {
    if (update.docChanged || CodeMirror2.selectedCompletion(update.state) !== CodeMirror2.selectedCompletion(update.startState)) {
      const docContentChanged = update.state.doc !== update.startState.doc;
      this.onTextChanged(docContentChanged);
    } else if (update.selectionSet) {
      this.updatePromptIcon();
    }
  }
  focus() {
    this.editor.focus();
  }
  setAiCodeCompletion() {
    if (!this.aidaClient) {
      this.aidaClient = new Host3.AidaClient.AidaClient();
    }
    this.aiCodeCompletionThrottler = new Common8.Throttler.Throttler(3e3);
    this.aiCodeCompletion = new AiCodeCompletion.AiCodeCompletion.AiCodeCompletion({ aidaClient: this.aidaClient }, this.editor, this.aiCodeCompletionThrottler);
  }
  onAiCodeCompletionSettingChanged() {
    if (this.aiCodeCompletionSetting.get() && this.isAiCodeCompletionEnabled()) {
      this.setAiCodeCompletion();
    } else if (this.aiCodeCompletion) {
      this.aiCodeCompletion = void 0;
    }
  }
  isAiCodeCompletionEnabled() {
    return Boolean(Root4.Runtime.hostConfig.devToolsAiCodeCompletion?.enabled);
  }
  editorSetForTest() {
  }
  setAidaClientForTest(aidaClient) {
    this.aidaClient = aidaClient;
  }
};
export {
  ConsoleContextSelector_exports as ConsoleContextSelector,
  ConsoleFilter_exports as ConsoleFilter,
  ConsoleFormat_exports as ConsoleFormat,
  ConsolePanel_exports as ConsolePanel,
  ConsolePinPane_exports as ConsolePinPane,
  ConsolePrompt_exports as ConsolePrompt,
  ConsoleSidebar_exports as ConsoleSidebar,
  ConsoleView_exports as ConsoleView,
  ConsoleViewMessage_exports as ConsoleViewMessage,
  ConsoleViewport_exports as ConsoleViewport,
  ErrorStackParser_exports as ErrorStackParser
};
//# sourceMappingURL=console.js.map
