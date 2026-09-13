var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../../front_end/panels/accessibility/AccessibilityAnnouncementRecordingListView.ts
var AccessibilityAnnouncementRecordingListView_exports = {};
__export(AccessibilityAnnouncementRecordingListView_exports, {
  AccessibilityAnnouncementRecordingListView: () => AccessibilityAnnouncementRecordingListView,
  DEFAULT_VIEW: () => DEFAULT_VIEW
});
import "../../ui/legacy/components/data_grid/data_grid.js";
import * as i18n3 from "../../core/i18n/i18n.js";
import * as UI2 from "../../ui/legacy/legacy.js";
import * as Lit from "../../ui/lit/lit.js";

// gen/front_end/panels/accessibility/accessibilityAnnouncementRecordingListView.css.js
var accessibilityAnnouncementRecordingListView_css_default = `/*
 * Copyright 2026 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  font-family: inherit;
  display: flex;
  flex-direction: column;
  flex: auto;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

@scope to (devtools-widget > *) {
  :scope {
    font-family: inherit;
    display: flex;
    flex-direction: column;
    flex: auto;
    height: 100%;
    overflow: hidden;
  }

  devtools-data-grid {
    font-family: inherit;
    flex: auto;
    height: 100%;
    border: none;
  }
}

/*# sourceURL=${import.meta.resolve("./accessibilityAnnouncementRecordingListView.css")} */`;

// ../../front_end/panels/accessibility/AccessibilityAnnouncementRecordingView.ts
var AccessibilityAnnouncementRecordingView_exports = {};
__export(AccessibilityAnnouncementRecordingView_exports, {
  AccessibilityAnnouncementRecordingView: () => AccessibilityAnnouncementRecordingView,
  AnnouncementApi: () => AnnouncementApi,
  BINDING_NAME: () => BINDING_NAME,
  INJECTED_SCRIPT_SOURCE: () => INJECTED_SCRIPT_SOURCE,
  TEARDOWN_SCRIPT_SOURCE: () => TEARDOWN_SCRIPT_SOURCE,
  checkForBlockedPayload: () => checkForBlockedPayload,
  injectedScript: () => injectedScript,
  teardownScript: () => teardownScript,
  validateAndSanitizeAnnouncement: () => validateAndSanitizeAnnouncement
});
import * as i18n from "../../core/i18n/i18n.js";
import * as SDK from "../../core/sdk/sdk.js";

// ../../front_end/panels/accessibility/AccessibilitySubPane.ts
var AccessibilitySubPane_exports = {};
__export(AccessibilitySubPane_exports, {
  AccessibilitySubPane: () => AccessibilitySubPane
});

// gen/front_end/ui/legacy/components/object_ui/objectValue.css.js
var objectValue_css_default = `/*
 * Copyright 2015 The Chromium Authors
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
  unicode-bidi: isolate;
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
  unicode-bidi: isolate;
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

// ../../front_end/panels/accessibility/AccessibilitySubPane.ts
import * as UI from "../../ui/legacy/legacy.js";

// gen/front_end/panels/accessibility/accessibilityNode.css.js
var accessibilityNode_css_default = `/*
 * Copyright 2017 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.widget.ax-subpane {
  overflow-x: hidden;
  user-select: text;
}

.ax-ignored-info {
  padding: var(--sys-size-4);
}

.ax-ignored-node-pane {
  flex: none;
}

.invalid {
  text-decoration: line-through;
}

span.ax-value-undefined {
  font-style: italic;
}

.ax-value-source-unused {
  opacity: 70%;
}

.ax-value-source-superseded,
.ax-value-source-invalid {
  text-decoration: line-through;
}

.tree-outline dt-icon-label {
  position: relative;
  left: -11px;
}

.tree-outline li {
  display: block;
  overflow-x: hidden;
  align-items: baseline;
}

.tree-outline li::before {
  content: "";
  width: var(--sys-size-7);
  display: inline-block;
  margin-bottom: calc(-1 * var(--sys-size-2));
  margin-right: 3px;
}

.tree-outline li.property {
  color: var(--sys-color-on-surface);
}

.tree-outline li.invalid {
  position: relative;
  left: calc(-1 * var(--sys-size-2));
}

.tree-outline dt-icon-label + .ax-name {
  margin-left: -11px;
}

.tree-outline li span {
  flex-shrink: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (forced-colors: active) {
  .ax-value-source-unused {
    opacity: 100%;
  }

  .tree-outline-disclosure:hover li.parent::before {
    background-color: ButtonText;
  }
}

/*# sourceURL=${import.meta.resolve("./accessibilityNode.css")} */`;

// gen/front_end/panels/accessibility/accessibilityProperties.css.js
var accessibilityProperties_css_default = `/*
 * Copyright 2015 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

@scope to (devtools-widget > *) {
.ax-name {
  color: var(--sys-color-token-attribute);
  flex-shrink: 0;
}

.ax-readable-name {
  flex-shrink: 0;
}

.ax-readable-string {
  font-style: italic;
}

.ax-value-string {
  color: var(--sys-color-token-property-special);
}

span.ax-internal-role {
  font-style: italic;
}

#source-order-warning {
  padding-bottom: 0;
  text-align: left;
}

.source-order-checkbox {
  margin: var(--sys-size-2) var(--sys-size-2) var(--sys-size-2) 5px;
}

.info-message-overflow {
  overflow-x: hidden;
  white-space: normal;
}
}

/*# sourceURL=${import.meta.resolve("./accessibilityProperties.css")} */`;

// ../../front_end/panels/accessibility/AccessibilitySubPane.ts
var AccessibilitySubPane = class extends UI.View.SimpleView {
  axNode;
  nodeInternal;
  constructor(options) {
    super(options);
    this.registerRequiredCSS(accessibilityProperties_css_default);
    this.axNode = null;
  }
  setAXNode(_axNode) {
  }
  node() {
    return this.nodeInternal || null;
  }
  setNode(node) {
    this.nodeInternal = node;
  }
  createInfo(textContent, ...classNames) {
    const info = new UI.EmptyWidget.EmptyWidget(textContent);
    if (classNames.length === 0) {
      classNames.push("gray-info-message");
    }
    info.element.classList.add(...classNames, "info-message-overflow");
    return info;
  }
  createTreeOutline() {
    const treeOutline = new UI.TreeOutline.TreeOutlineInShadow();
    treeOutline.registerRequiredCSS(accessibilityNode_css_default, accessibilityProperties_css_default, objectValue_css_default);
    treeOutline.element.classList.add("hidden");
    treeOutline.setHideOverflow(true);
    this.element.appendChild(treeOutline.element);
    return treeOutline;
  }
};

// ../../front_end/panels/accessibility/AccessibilityAnnouncementRecordingView.ts
var UIStrings = {
  /**
   * @description Title for the ARIA-Live and JS announcements recording tool
   */
  ariaLiveRecording: "Announcements recording"
};
var str_ = i18n.i18n.registerUIStrings("panels/accessibility/AccessibilityAnnouncementRecordingView.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var BINDING_NAME = "__announcementsRecorderBinding";
var AnnouncementApi = /* @__PURE__ */ ((AnnouncementApi2) => {
  AnnouncementApi2["ARIA_LIVE"] = "aria-live";
  AnnouncementApi2["JS_TRIGGERED"] = "js-triggered";
  return AnnouncementApi2;
})(AnnouncementApi || {});
function injectedScript(ariaLiveApi, jsTriggeredApi) {
  if (window.__announcementsRecorderBinding_loaded) {
    return;
  }
  const elementIdMap = /* @__PURE__ */ new WeakMap();
  let recordIdCounter = 0;
  function getOrCreateRecordId(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return "";
    }
    let id = elementIdMap.get(element);
    if (!id) {
      recordIdCounter++;
      id = String(recordIdCounter);
      elementIdMap.set(element, id);
    }
    return id;
  }
  function getParentOrHost(node) {
    if (!node) {
      return null;
    }
    if (node.parentElement) {
      return node.parentElement;
    }
    const root = node.getRootNode();
    if (root && root !== node && root instanceof ShadowRoot) {
      return root.host;
    }
    return null;
  }
  function checkVisibility(element) {
    if (!element) {
      return false;
    }
    try {
      return element.checkVisibility({
        checkOpacity: true,
        checkVisibilityCSS: true
      });
    } catch {
      return true;
    }
  }
  function isAncestorHidden(element) {
    let current = getParentOrHost(element);
    while (current) {
      if (current.getAttribute("aria-hidden") === "true") {
        return true;
      }
      if (!checkVisibility(current)) {
        return true;
      }
      current = getParentOrHost(current);
    }
    return false;
  }
  function patchAriaNotify(proto, name) {
    if (!proto || typeof proto !== "object") {
      return void 0;
    }
    if (!Object.isExtensible(proto) || Object.isFrozen(proto) || Object.isSealed(proto)) {
      throw new TypeError("Prototype object is non-extensible, frozen, or sealed");
    }
    const desc = Object.getOwnPropertyDescriptor(proto, name);
    if (desc && (!desc.writable && !desc.set)) {
      throw new TypeError("Property " + name + " is read-only");
    }
    const protoRecord = proto;
    const original = protoRecord[name];
    const wrapped = function(message, options) {
      const bindingFn = window.__announcementsRecorderBinding;
      if (typeof bindingFn === "function") {
        try {
          const announcement = {
            api: jsTriggeredApi,
            message: String(message || ""),
            politeness: options && options.politeness || "polite",
            elementId: getOrCreateRecordId(this),
            element: this.outerHTML || this.nodeName,
            stack: new Error().stack || "",
            time: Date.now()
          };
          bindingFn(JSON.stringify(announcement));
        } catch {
        }
      }
      if (typeof original === "function") {
        return original.apply(this, arguments);
      }
      return void 0;
    };
    Object.defineProperty(proto, name, {
      value: wrapped,
      writable: true,
      configurable: true,
      enumerable: desc ? desc.enumerable : false
    });
    if (protoRecord[name] !== wrapped) {
      throw new TypeError("Failed to override " + name + " on prototype");
    }
    return original;
  }
  let originalElementAriaNotify;
  let originalDocumentAriaNotify;
  let originalAttachShadow;
  try {
    originalElementAriaNotify = patchAriaNotify(Element.prototype, "ariaNotify");
    originalDocumentAriaNotify = patchAriaNotify(Document.prototype, "ariaNotify");
  } catch (e) {
    const bindingFn = window.__announcementsRecorderBinding;
    if (typeof bindingFn === "function") {
      try {
        const error = e;
        bindingFn(JSON.stringify({
          api: "blocked",
          reason: error && error.message ? String(error.message) : String(e)
        }));
      } catch {
      }
    }
  }
  function derivePoliteness(element) {
    const explicit = element.getAttribute("aria-live");
    if (explicit) {
      return explicit;
    }
    const role = element.getAttribute("role");
    if (role === "status" || role === "log") {
      return "polite";
    }
    if (role === "alert") {
      return "assertive";
    }
    return "off";
  }
  let lastRecordedId = null;
  let lastRecordedText = null;
  let lastRecordedPoliteness = null;
  let lastRecordedTime = 0;
  function recordLiveNode(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    const element = node;
    const politeness = derivePoliteness(element);
    if (politeness === "off") {
      return;
    }
    if (element.getAttribute("aria-hidden") === "true") {
      return;
    }
    if (!checkVisibility(element)) {
      return;
    }
    if (isAncestorHidden(element)) {
      return;
    }
    const text = (element.textContent || "").trim();
    if (!text) {
      return;
    }
    const elementId = getOrCreateRecordId(element);
    const now = Date.now();
    if (lastRecordedId === elementId && lastRecordedText === text && lastRecordedPoliteness === politeness && now - lastRecordedTime < 50) {
      return;
    }
    lastRecordedId = elementId;
    lastRecordedText = text;
    lastRecordedPoliteness = politeness;
    lastRecordedTime = now;
    const bindingFn = window.__announcementsRecorderBinding;
    if (typeof bindingFn === "function") {
      try {
        const announcement = {
          api: ariaLiveApi,
          message: text,
          politeness,
          elementId,
          element: element.outerHTML || element.nodeName,
          time: now
        };
        bindingFn(JSON.stringify(announcement));
      } catch {
      }
    }
  }
  const selector = '[aria-live], [role="status"], [role="alert"], [role="log"]';
  function findLiveParent(node) {
    let current = node;
    while (current) {
      if (current.nodeType === Node.ELEMENT_NODE) {
        const el = current;
        if (el.matches && el.matches(selector)) {
          return el;
        }
        if (el.closest) {
          const match = el.closest(selector);
          if (match) {
            return match;
          }
        }
      }
      current = getParentOrHost(current);
    }
    return null;
  }
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        const target = mutation.target;
        if (target && target.nodeType === Node.ELEMENT_NODE) {
          const liveParent = findLiveParent(target);
          if (liveParent) {
            recordLiveNode(liveParent);
          }
        }
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node;
            if (el.shadowRoot) {
              observeSubtree(el.shadowRoot);
              scanAndObserveShadowRoots(el.shadowRoot);
            }
            scanAndObserveShadowRoots(el);
            if (el.matches && el.matches(selector)) {
              recordLiveNode(el);
            }
            const children = el.querySelectorAll ? el.querySelectorAll(selector) : [];
            for (const child of children) {
              recordLiveNode(child);
            }
          }
        }
      } else if (mutation.type === "characterData") {
        const parent = mutation.target.parentElement || getParentOrHost(mutation.target);
        if (parent) {
          const liveParent = findLiveParent(parent);
          if (liveParent) {
            recordLiveNode(liveParent);
          }
        }
      } else if (mutation.type === "attributes") {
        const target = mutation.target;
        if (target && target.nodeType === Node.ELEMENT_NODE) {
          const liveTarget = findLiveParent(target);
          if (liveTarget) {
            recordLiveNode(liveTarget);
          }
        }
      }
    }
  });
  const observedRoots = /* @__PURE__ */ new WeakSet();
  function observeSubtree(root) {
    if (!root || observedRoots.has(root)) {
      return;
    }
    try {
      observer.observe(root, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ["aria-live", "aria-hidden", "hidden", "style", "class", "role"]
      });
      observedRoots.add(root);
    } catch {
    }
  }
  function scanAndObserveShadowRoots(node) {
    if (!node) {
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node;
      if (el.shadowRoot) {
        observeSubtree(el.shadowRoot);
        scanAndObserveShadowRoots(el.shadowRoot);
      }
    }
    const children = node.children || [];
    for (let i = 0; i < children.length; i++) {
      scanAndObserveShadowRoots(children[i]);
    }
  }
  const rootNode = document.body || document.documentElement;
  if (rootNode) {
    observeSubtree(rootNode);
    scanAndObserveShadowRoots(rootNode);
  }
  try {
    const origAttachShadow = Element.prototype.attachShadow;
    if (typeof origAttachShadow === "function") {
      originalAttachShadow = origAttachShadow;
      Element.prototype.attachShadow = function(init) {
        const shadow = origAttachShadow.apply(this, [init]);
        if (init && init.mode === "open") {
          observeSubtree(shadow);
        }
        return shadow;
      };
    }
  } catch {
  }
  window.__announcementsRecorderBinding_loaded = true;
  window.__announcementsRecorderBinding_cleanup = function() {
    observer.disconnect();
    if (originalElementAriaNotify) {
      try {
        Element.prototype["ariaNotify"] = originalElementAriaNotify;
      } catch {
      }
    }
    if (originalDocumentAriaNotify) {
      try {
        Document.prototype["ariaNotify"] = originalDocumentAriaNotify;
      } catch {
      }
    }
    if (originalAttachShadow) {
      try {
        Element.prototype.attachShadow = originalAttachShadow;
      } catch {
      }
    }
    delete window.__announcementsRecorderBinding_loaded;
    delete window.__announcementsRecorderBinding_cleanup;
  };
}
function teardownScript() {
  if (typeof window.__announcementsRecorderBinding_cleanup === "function") {
    window.__announcementsRecorderBinding_cleanup();
  }
}
var INJECTED_SCRIPT_SOURCE = `(${injectedScript.toString()})(${JSON.stringify("aria-live" /* ARIA_LIVE */)}, ${JSON.stringify("js-triggered" /* JS_TRIGGERED */)});`;
var TEARDOWN_SCRIPT_SOURCE = `(${teardownScript.toString()})();`;
function checkForBlockedPayload(payload) {
  if (typeof payload !== "string") {
    return null;
  }
  try {
    const parsed = JSON.parse(payload);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed) && parsed.api === "blocked") {
      return typeof parsed.reason === "string" ? parsed.reason : "";
    }
  } catch {
    return null;
  }
  return null;
}
function validateAndSanitizeAnnouncement(payload) {
  if (typeof payload !== "string") {
    return null;
  }
  let parsed;
  try {
    parsed = JSON.parse(payload);
  } catch {
    return null;
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return null;
  }
  const parsedObj = parsed;
  if (parsedObj.api !== "aria-live" /* ARIA_LIVE */ && parsedObj.api !== "js-triggered" /* JS_TRIGGERED */) {
    return null;
  }
  if (typeof parsedObj.message !== "string") {
    return null;
  }
  if (typeof parsedObj.politeness !== "string") {
    return null;
  }
  if (typeof parsedObj.element !== "string") {
    return null;
  }
  if (typeof parsedObj.time !== "number" || !Number.isFinite(parsedObj.time)) {
    return null;
  }
  let elementId = void 0;
  if ("elementId" in parsedObj) {
    if (typeof parsedObj.elementId !== "string") {
      return null;
    }
    elementId = parsedObj.elementId;
  }
  let stack = void 0;
  if ("stack" in parsedObj) {
    if (typeof parsedObj.stack !== "string") {
      return null;
    }
    stack = parsedObj.stack;
  }
  return {
    api: parsedObj.api,
    message: parsedObj.message,
    politeness: parsedObj.politeness,
    element: parsedObj.element,
    ...elementId !== void 0 ? { elementId } : {},
    ...stack !== void 0 ? { stack } : {},
    time: parsedObj.time
  };
}
var AccessibilityAnnouncementRecordingView = class extends AccessibilitySubPane {
  #announcements = [];
  #isRecording = false;
  #blockedTargets = /* @__PURE__ */ new Map();
  #scriptIdentifiers = /* @__PURE__ */ new Map();
  #targets = /* @__PURE__ */ new Set();
  #enabledTargets = /* @__PURE__ */ new Set();
  constructor() {
    super({
      title: i18nString(UIStrings.ariaLiveRecording),
      viewId: "aria-live-recording"
    });
    SDK.TargetManager.TargetManager.instance().observeTargets(this, { scoped: true });
  }
  wasShown() {
    super.wasShown();
    this.requestUpdate();
  }
  async targetAdded(target) {
    if (target.type() !== SDK.Target.Type.FRAME || this.#targets.has(target)) {
      return;
    }
    this.#targets.add(target);
    if (this.#isRecording) {
      await this.#enableTarget(target);
    }
  }
  async targetRemoved(target) {
    this.#targets.delete(target);
    this.#blockedTargets.delete(target);
    await this.#disableTarget(target);
  }
  async #enableTarget(target) {
    if (this.#enabledTargets.has(target)) {
      return;
    }
    this.#enabledTargets.add(target);
    const runtimeModel = target.model(SDK.RuntimeModel.RuntimeModel);
    if (!runtimeModel) {
      this.#enabledTargets.delete(target);
      return;
    }
    runtimeModel.addEventListener(SDK.RuntimeModel.Events.BindingCalled, this.#onBindingCalled, this);
    try {
      await runtimeModel.addBinding({
        name: BINDING_NAME
      });
      const pageAgent = target.pageAgent();
      const { identifier } = await pageAgent.invoke_addScriptToEvaluateOnNewDocument({
        source: INJECTED_SCRIPT_SOURCE,
        runImmediately: true
      });
      if (!this.#enabledTargets.has(target)) {
        try {
          await pageAgent.invoke_removeScriptToEvaluateOnNewDocument({ identifier });
        } catch {
        }
        return;
      }
      this.#scriptIdentifiers.set(target, identifier);
    } catch {
      await this.#disableTarget(target);
    }
  }
  #handleRecordingBlocked(target, blockedReason) {
    if (target) {
      this.#blockedTargets.set(target, blockedReason);
    }
    this.requestUpdate();
  }
  async #disableTarget(target) {
    if (!this.#enabledTargets.has(target)) {
      return;
    }
    this.#enabledTargets.delete(target);
    const runtimeModel = target.model(SDK.RuntimeModel.RuntimeModel);
    if (runtimeModel) {
      runtimeModel.removeEventListener(SDK.RuntimeModel.Events.BindingCalled, this.#onBindingCalled, this);
      try {
        await runtimeModel.removeBinding({
          name: BINDING_NAME
        });
      } catch {
      }
    }
    const identifier = this.#scriptIdentifiers.get(target);
    if (identifier) {
      try {
        await target.pageAgent().invoke_removeScriptToEvaluateOnNewDocument({
          identifier
        });
      } catch {
      }
      this.#scriptIdentifiers.delete(target);
    }
    try {
      const runtimeAgent = target.runtimeAgent();
      await runtimeAgent.invoke_evaluate({
        expression: TEARDOWN_SCRIPT_SOURCE,
        userGesture: false,
        awaitPromise: false
      });
    } catch {
    }
  }
  #onBindingCalled(event) {
    const { name, payload } = event.data;
    if (!this.#isRecording) {
      return;
    }
    if (name !== BINDING_NAME) {
      return;
    }
    const runtimeModel = event.source instanceof SDK.RuntimeModel.RuntimeModel ? event.source : null;
    const target = runtimeModel?.target() ?? null;
    const blockedReason = checkForBlockedPayload(payload);
    if (blockedReason !== null) {
      this.#handleRecordingBlocked(target, blockedReason);
      return;
    }
    const announcement = validateAndSanitizeAnnouncement(payload);
    if (!announcement) {
      return;
    }
    if (target) {
      announcement.target = target;
    }
    const last = this.#announcements[this.#announcements.length - 1];
    if (last && last.api === announcement.api && last.message === announcement.message && last.politeness === announcement.politeness && last.element === announcement.element && Math.abs(announcement.time - last.time) < 50) {
      return;
    }
    this.#announcements.push(announcement);
    this.requestUpdate();
  }
  async startRecording() {
    if (this.#isRecording) {
      return;
    }
    this.#isRecording = true;
    this.#blockedTargets.clear();
    for (const target of this.#targets) {
      await this.#enableTarget(target);
    }
    this.requestUpdate();
  }
  async stopRecording() {
    if (!this.#isRecording) {
      return;
    }
    this.#isRecording = false;
    for (const target of this.#targets) {
      await this.#disableTarget(target);
    }
    this.requestUpdate();
  }
  clearAnnouncements() {
    this.#announcements = [];
    this.requestUpdate();
  }
  announcementsForTest() {
    return [...this.#announcements];
  }
  blockedReasonForTargetForTest(target) {
    return this.#blockedTargets.get(target);
  }
  blockedTargetsForTest() {
    return new Map(this.#blockedTargets);
  }
  isRecordingForTest() {
    return this.#isRecording;
  }
};

// ../../front_end/panels/accessibility/AccessibilityAnnouncementRecordingListView.ts
var { html, render } = Lit;
var UIStrings2 = {
  /**
   * @description Column header for the announcement timestamp.
   */
  time: "Time",
  /**
   * @description Column header for the API type (DOM aria-live vs JS ariaNotify).
   */
  api: "API",
  /**
   * @description Column header for the politeness level (e.g. polite, assertive).
   */
  politeness: "Politeness",
  /**
   * @description Column header for the announcement message text.
   */
  message: "Message",
  /**
   * @description Value for DOM aria-live announcements in the API column.
   */
  ariaLive: "ARIA live",
  /**
   * @description Value for JS ariaNotify announcements in the API column.
   */
  jsTriggered: "JS-triggered",
  /**
   * @description Accessible title for the announcements data grid.
   */
  ariaLiveRecordingList: "Accessibility Announcements"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/accessibility/AccessibilityAnnouncementRecordingListView.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
var DEFAULT_VIEW = (input, _output, target) => {
  render(
    html`
    <style>${accessibilityAnnouncementRecordingListView_css_default}</style>
    <devtools-data-grid
      name=${i18nString2(UIStrings2.ariaLiveRecordingList)}
      striped
      class="flex-auto"
      @deselect=${input.onDeselect}>
      <table>
        <tr>
          <th id="time" sortable fixed width="110px" align="right">
            ${i18nString2(UIStrings2.time)}
          </th>
          <th id="api" sortable fixed width="110px">
            ${i18nString2(UIStrings2.api)}
          </th>
          <th id="politeness" sortable fixed width="90px">
            ${i18nString2(UIStrings2.politeness)}
          </th>
          <th id="message" sortable width="300px">
            ${i18nString2(UIStrings2.message)}
          </th>
        </tr>
        ${input.items.map((item) => {
      const timeString = new Date(item.time).toLocaleTimeString(i18n3.DevToolsLocale.DevToolsLocale.instance().locale);
      const apiDisplay = item.api === "js-triggered" /* JS_TRIGGERED */ ? i18nString2(UIStrings2.jsTriggered) : i18nString2(UIStrings2.ariaLive);
      return html`
            <tr
              ?selected=${item === input.selectedItem}
              @select=${() => input.onSelect(item)}>
              <td data-value=${item.time}>
                <span>${timeString}</span>
              </td>
              <td>${apiDisplay}</td>
              <td>${item.politeness}</td>
              <td title=${item.message}>
                ${item.message}
              </td>
            </tr>`;
    })}
      </table>
    </devtools-data-grid>`,
    target
  );
};
var AccessibilityAnnouncementRecordingListView = class extends UI2.Widget.VBox {
  #items = [];
  #selectedItem = null;
  #onSelect = null;
  #view;
  constructor(element, view = DEFAULT_VIEW) {
    super(element, { useShadowDom: true });
    this.#view = view;
  }
  wasShown() {
    super.wasShown();
    this.requestUpdate();
  }
  set items(items) {
    if (this.#items === items) {
      return;
    }
    this.#items = items;
    this.requestUpdate();
  }
  get items() {
    return this.#items;
  }
  set selectedItem(item) {
    if (this.#selectedItem === item) {
      return;
    }
    this.#selectedItem = item;
    this.requestUpdate();
  }
  get selectedItem() {
    return this.#selectedItem;
  }
  set onSelect(onSelect) {
    this.#onSelect = onSelect;
  }
  reset() {
    this.#items = [];
    this.#selectedItem = null;
    this.requestUpdate();
  }
  performUpdate() {
    const input = {
      items: this.#items,
      selectedItem: this.#selectedItem,
      onSelect: (item) => {
        this.selectedItem = item;
        this.#onSelect?.(item);
      },
      onDeselect: () => {
        this.selectedItem = null;
        this.#onSelect?.(null);
      }
    };
    this.#view(input, void 0, this.contentElement);
  }
};

// ../../front_end/panels/accessibility/AccessibilityNodeView.ts
var AccessibilityNodeView_exports = {};
__export(AccessibilityNodeView_exports, {
  AXNodeIgnoredReasonTreeElement: () => AXNodeIgnoredReasonTreeElement,
  AXNodePropertyTreeElement: () => AXNodePropertyTreeElement,
  AXNodePropertyTreePropertyElement: () => AXNodePropertyTreePropertyElement,
  AXNodeSubPane: () => AXNodeSubPane,
  AXRelatedNodeElement: () => AXRelatedNodeElement,
  AXRelatedNodeSourceTreeElement: () => AXRelatedNodeSourceTreeElement,
  AXValueSourceTreeElement: () => AXValueSourceTreeElement,
  StringProperties: () => StringProperties,
  TypeStyles: () => TypeStyles
});
import * as Common from "../../core/common/common.js";
import * as i18n7 from "../../core/i18n/i18n.js";
import * as SDK2 from "../../core/sdk/sdk.js";

// ../../front_end/generated/protocol.ts
var Accessibility;
((Accessibility2) => {
  let AXValueType;
  ((AXValueType2) => {
    AXValueType2["Boolean"] = "boolean";
    AXValueType2["Tristate"] = "tristate";
    AXValueType2["BooleanOrUndefined"] = "booleanOrUndefined";
    AXValueType2["Idref"] = "idref";
    AXValueType2["IdrefList"] = "idrefList";
    AXValueType2["Integer"] = "integer";
    AXValueType2["Node"] = "node";
    AXValueType2["NodeList"] = "nodeList";
    AXValueType2["Number"] = "number";
    AXValueType2["String"] = "string";
    AXValueType2["ComputedString"] = "computedString";
    AXValueType2["Token"] = "token";
    AXValueType2["TokenList"] = "tokenList";
    AXValueType2["DomRelation"] = "domRelation";
    AXValueType2["Role"] = "role";
    AXValueType2["InternalRole"] = "internalRole";
    AXValueType2["ValueUndefined"] = "valueUndefined";
  })(AXValueType = Accessibility2.AXValueType || (Accessibility2.AXValueType = {}));
  let AXValueSourceType;
  ((AXValueSourceType2) => {
    AXValueSourceType2["Attribute"] = "attribute";
    AXValueSourceType2["Implicit"] = "implicit";
    AXValueSourceType2["Style"] = "style";
    AXValueSourceType2["Contents"] = "contents";
    AXValueSourceType2["Placeholder"] = "placeholder";
    AXValueSourceType2["RelatedElement"] = "relatedElement";
  })(AXValueSourceType = Accessibility2.AXValueSourceType || (Accessibility2.AXValueSourceType = {}));
  let AXValueNativeSourceType;
  ((AXValueNativeSourceType2) => {
    AXValueNativeSourceType2["Description"] = "description";
    AXValueNativeSourceType2["Figcaption"] = "figcaption";
    AXValueNativeSourceType2["Label"] = "label";
    AXValueNativeSourceType2["Labelfor"] = "labelfor";
    AXValueNativeSourceType2["Labelwrapped"] = "labelwrapped";
    AXValueNativeSourceType2["Legend"] = "legend";
    AXValueNativeSourceType2["Rubyannotation"] = "rubyannotation";
    AXValueNativeSourceType2["Tablecaption"] = "tablecaption";
    AXValueNativeSourceType2["Title"] = "title";
    AXValueNativeSourceType2["Other"] = "other";
  })(AXValueNativeSourceType = Accessibility2.AXValueNativeSourceType || (Accessibility2.AXValueNativeSourceType = {}));
  let AXPropertyName;
  ((AXPropertyName2) => {
    AXPropertyName2["Actions"] = "actions";
    AXPropertyName2["Busy"] = "busy";
    AXPropertyName2["Disabled"] = "disabled";
    AXPropertyName2["Editable"] = "editable";
    AXPropertyName2["Focusable"] = "focusable";
    AXPropertyName2["Focused"] = "focused";
    AXPropertyName2["Hidden"] = "hidden";
    AXPropertyName2["HiddenRoot"] = "hiddenRoot";
    AXPropertyName2["Invalid"] = "invalid";
    AXPropertyName2["Keyshortcuts"] = "keyshortcuts";
    AXPropertyName2["Settable"] = "settable";
    AXPropertyName2["Roledescription"] = "roledescription";
    AXPropertyName2["Live"] = "live";
    AXPropertyName2["Atomic"] = "atomic";
    AXPropertyName2["Relevant"] = "relevant";
    AXPropertyName2["Root"] = "root";
    AXPropertyName2["Autocomplete"] = "autocomplete";
    AXPropertyName2["HasPopup"] = "hasPopup";
    AXPropertyName2["Level"] = "level";
    AXPropertyName2["Multiselectable"] = "multiselectable";
    AXPropertyName2["Orientation"] = "orientation";
    AXPropertyName2["Multiline"] = "multiline";
    AXPropertyName2["Readonly"] = "readonly";
    AXPropertyName2["Required"] = "required";
    AXPropertyName2["Valuemin"] = "valuemin";
    AXPropertyName2["Valuemax"] = "valuemax";
    AXPropertyName2["Valuetext"] = "valuetext";
    AXPropertyName2["Checked"] = "checked";
    AXPropertyName2["Expanded"] = "expanded";
    AXPropertyName2["Modal"] = "modal";
    AXPropertyName2["Pressed"] = "pressed";
    AXPropertyName2["Selected"] = "selected";
    AXPropertyName2["Activedescendant"] = "activedescendant";
    AXPropertyName2["Controls"] = "controls";
    AXPropertyName2["Describedby"] = "describedby";
    AXPropertyName2["Details"] = "details";
    AXPropertyName2["Errormessage"] = "errormessage";
    AXPropertyName2["Flowto"] = "flowto";
    AXPropertyName2["Labelledby"] = "labelledby";
    AXPropertyName2["Owns"] = "owns";
    AXPropertyName2["Url"] = "url";
    AXPropertyName2["ActiveFullscreenElement"] = "activeFullscreenElement";
    AXPropertyName2["ActiveModalDialog"] = "activeModalDialog";
    AXPropertyName2["ActiveAriaModalDialog"] = "activeAriaModalDialog";
    AXPropertyName2["AriaHiddenElement"] = "ariaHiddenElement";
    AXPropertyName2["AriaHiddenSubtree"] = "ariaHiddenSubtree";
    AXPropertyName2["EmptyAlt"] = "emptyAlt";
    AXPropertyName2["EmptyText"] = "emptyText";
    AXPropertyName2["InertElement"] = "inertElement";
    AXPropertyName2["InertSubtree"] = "inertSubtree";
    AXPropertyName2["LabelContainer"] = "labelContainer";
    AXPropertyName2["LabelFor"] = "labelFor";
    AXPropertyName2["NotRendered"] = "notRendered";
    AXPropertyName2["NotVisible"] = "notVisible";
    AXPropertyName2["PresentationalRole"] = "presentationalRole";
    AXPropertyName2["ProbablyPresentational"] = "probablyPresentational";
    AXPropertyName2["InactiveCarouselTabContent"] = "inactiveCarouselTabContent";
    AXPropertyName2["Uninteresting"] = "uninteresting";
  })(AXPropertyName = Accessibility2.AXPropertyName || (Accessibility2.AXPropertyName = {}));
})(Accessibility || (Accessibility = {}));
var Animation;
((Animation2) => {
  let AnimationType;
  ((AnimationType2) => {
    AnimationType2["CSSTransition"] = "CSSTransition";
    AnimationType2["CSSAnimation"] = "CSSAnimation";
    AnimationType2["WebAnimation"] = "WebAnimation";
  })(AnimationType = Animation2.AnimationType || (Animation2.AnimationType = {}));
})(Animation || (Animation = {}));
var Audits;
((Audits2) => {
  let CookieExclusionReason;
  ((CookieExclusionReason2) => {
    CookieExclusionReason2["ExcludeSameSiteUnspecifiedTreatedAsLax"] = "ExcludeSameSiteUnspecifiedTreatedAsLax";
    CookieExclusionReason2["ExcludeSameSiteNoneInsecure"] = "ExcludeSameSiteNoneInsecure";
    CookieExclusionReason2["ExcludeSameSiteLax"] = "ExcludeSameSiteLax";
    CookieExclusionReason2["ExcludeSameSiteStrict"] = "ExcludeSameSiteStrict";
    CookieExclusionReason2["ExcludeDomainNonASCII"] = "ExcludeDomainNonASCII";
    CookieExclusionReason2["ExcludeThirdPartyCookieBlockedInFirstPartySet"] = "ExcludeThirdPartyCookieBlockedInFirstPartySet";
    CookieExclusionReason2["ExcludeThirdPartyPhaseout"] = "ExcludeThirdPartyPhaseout";
    CookieExclusionReason2["ExcludePortMismatch"] = "ExcludePortMismatch";
    CookieExclusionReason2["ExcludeSchemeMismatch"] = "ExcludeSchemeMismatch";
  })(CookieExclusionReason = Audits2.CookieExclusionReason || (Audits2.CookieExclusionReason = {}));
  let CookieWarningReason;
  ((CookieWarningReason2) => {
    CookieWarningReason2["WarnSameSiteUnspecifiedCrossSiteContext"] = "WarnSameSiteUnspecifiedCrossSiteContext";
    CookieWarningReason2["WarnSameSiteNoneInsecure"] = "WarnSameSiteNoneInsecure";
    CookieWarningReason2["WarnSameSiteUnspecifiedLaxAllowUnsafe"] = "WarnSameSiteUnspecifiedLaxAllowUnsafe";
    CookieWarningReason2["WarnSameSiteStrictLaxDowngradeStrict"] = "WarnSameSiteStrictLaxDowngradeStrict";
    CookieWarningReason2["WarnSameSiteStrictCrossDowngradeStrict"] = "WarnSameSiteStrictCrossDowngradeStrict";
    CookieWarningReason2["WarnSameSiteStrictCrossDowngradeLax"] = "WarnSameSiteStrictCrossDowngradeLax";
    CookieWarningReason2["WarnSameSiteLaxCrossDowngradeStrict"] = "WarnSameSiteLaxCrossDowngradeStrict";
    CookieWarningReason2["WarnSameSiteLaxCrossDowngradeLax"] = "WarnSameSiteLaxCrossDowngradeLax";
    CookieWarningReason2["WarnAttributeValueExceedsMaxSize"] = "WarnAttributeValueExceedsMaxSize";
    CookieWarningReason2["WarnDomainNonASCII"] = "WarnDomainNonASCII";
    CookieWarningReason2["WarnThirdPartyPhaseout"] = "WarnThirdPartyPhaseout";
    CookieWarningReason2["WarnCrossSiteRedirectDowngradeChangesInclusion"] = "WarnCrossSiteRedirectDowngradeChangesInclusion";
    CookieWarningReason2["WarnDeprecationTrialMetadata"] = "WarnDeprecationTrialMetadata";
    CookieWarningReason2["WarnThirdPartyCookieHeuristic"] = "WarnThirdPartyCookieHeuristic";
  })(CookieWarningReason = Audits2.CookieWarningReason || (Audits2.CookieWarningReason = {}));
  let CookieOperation;
  ((CookieOperation2) => {
    CookieOperation2["SetCookie"] = "SetCookie";
    CookieOperation2["ReadCookie"] = "ReadCookie";
  })(CookieOperation = Audits2.CookieOperation || (Audits2.CookieOperation = {}));
  let InsightType;
  ((InsightType2) => {
    InsightType2["GitHubResource"] = "GitHubResource";
    InsightType2["GracePeriod"] = "GracePeriod";
    InsightType2["Heuristics"] = "Heuristics";
  })(InsightType = Audits2.InsightType || (Audits2.InsightType = {}));
  let PerformanceIssueType;
  ((PerformanceIssueType2) => {
    PerformanceIssueType2["DocumentCookie"] = "DocumentCookie";
  })(PerformanceIssueType = Audits2.PerformanceIssueType || (Audits2.PerformanceIssueType = {}));
  let MixedContentResolutionStatus;
  ((MixedContentResolutionStatus2) => {
    MixedContentResolutionStatus2["MixedContentBlocked"] = "MixedContentBlocked";
    MixedContentResolutionStatus2["MixedContentAutomaticallyUpgraded"] = "MixedContentAutomaticallyUpgraded";
    MixedContentResolutionStatus2["MixedContentWarning"] = "MixedContentWarning";
  })(MixedContentResolutionStatus = Audits2.MixedContentResolutionStatus || (Audits2.MixedContentResolutionStatus = {}));
  let MixedContentResourceType;
  ((MixedContentResourceType2) => {
    MixedContentResourceType2["Audio"] = "Audio";
    MixedContentResourceType2["Beacon"] = "Beacon";
    MixedContentResourceType2["CSPReport"] = "CSPReport";
    MixedContentResourceType2["Download"] = "Download";
    MixedContentResourceType2["EventSource"] = "EventSource";
    MixedContentResourceType2["Favicon"] = "Favicon";
    MixedContentResourceType2["Font"] = "Font";
    MixedContentResourceType2["Form"] = "Form";
    MixedContentResourceType2["Frame"] = "Frame";
    MixedContentResourceType2["Image"] = "Image";
    MixedContentResourceType2["Import"] = "Import";
    MixedContentResourceType2["JSON"] = "JSON";
    MixedContentResourceType2["Manifest"] = "Manifest";
    MixedContentResourceType2["Ping"] = "Ping";
    MixedContentResourceType2["PluginData"] = "PluginData";
    MixedContentResourceType2["PluginResource"] = "PluginResource";
    MixedContentResourceType2["Prefetch"] = "Prefetch";
    MixedContentResourceType2["Resource"] = "Resource";
    MixedContentResourceType2["Script"] = "Script";
    MixedContentResourceType2["ServiceWorker"] = "ServiceWorker";
    MixedContentResourceType2["SharedWorker"] = "SharedWorker";
    MixedContentResourceType2["SpeculationRules"] = "SpeculationRules";
    MixedContentResourceType2["Stylesheet"] = "Stylesheet";
    MixedContentResourceType2["Track"] = "Track";
    MixedContentResourceType2["Video"] = "Video";
    MixedContentResourceType2["Worker"] = "Worker";
    MixedContentResourceType2["XMLHttpRequest"] = "XMLHttpRequest";
    MixedContentResourceType2["XSLT"] = "XSLT";
  })(MixedContentResourceType = Audits2.MixedContentResourceType || (Audits2.MixedContentResourceType = {}));
  let BlockedByResponseReason;
  ((BlockedByResponseReason2) => {
    BlockedByResponseReason2["CoepFrameResourceNeedsCoepHeader"] = "CoepFrameResourceNeedsCoepHeader";
    BlockedByResponseReason2["CoopSandboxedIFrameCannotNavigateToCoopPage"] = "CoopSandboxedIFrameCannotNavigateToCoopPage";
    BlockedByResponseReason2["CorpNotSameOrigin"] = "CorpNotSameOrigin";
    BlockedByResponseReason2["CorpNotSameOriginAfterDefaultedToSameOriginByCoep"] = "CorpNotSameOriginAfterDefaultedToSameOriginByCoep";
    BlockedByResponseReason2["CorpNotSameOriginAfterDefaultedToSameOriginByDip"] = "CorpNotSameOriginAfterDefaultedToSameOriginByDip";
    BlockedByResponseReason2["CorpNotSameOriginAfterDefaultedToSameOriginByCoepAndDip"] = "CorpNotSameOriginAfterDefaultedToSameOriginByCoepAndDip";
    BlockedByResponseReason2["CorpNotSameSite"] = "CorpNotSameSite";
    BlockedByResponseReason2["SRIMessageSignatureMismatch"] = "SRIMessageSignatureMismatch";
  })(BlockedByResponseReason = Audits2.BlockedByResponseReason || (Audits2.BlockedByResponseReason = {}));
  let HeavyAdResolutionStatus;
  ((HeavyAdResolutionStatus2) => {
    HeavyAdResolutionStatus2["HeavyAdBlocked"] = "HeavyAdBlocked";
    HeavyAdResolutionStatus2["HeavyAdWarning"] = "HeavyAdWarning";
  })(HeavyAdResolutionStatus = Audits2.HeavyAdResolutionStatus || (Audits2.HeavyAdResolutionStatus = {}));
  let HeavyAdReason;
  ((HeavyAdReason2) => {
    HeavyAdReason2["NetworkTotalLimit"] = "NetworkTotalLimit";
    HeavyAdReason2["CpuTotalLimit"] = "CpuTotalLimit";
    HeavyAdReason2["CpuPeakLimit"] = "CpuPeakLimit";
  })(HeavyAdReason = Audits2.HeavyAdReason || (Audits2.HeavyAdReason = {}));
  let ContentSecurityPolicyViolationType;
  ((ContentSecurityPolicyViolationType2) => {
    ContentSecurityPolicyViolationType2["KInlineViolation"] = "kInlineViolation";
    ContentSecurityPolicyViolationType2["KEvalViolation"] = "kEvalViolation";
    ContentSecurityPolicyViolationType2["KURLViolation"] = "kURLViolation";
    ContentSecurityPolicyViolationType2["KSRIViolation"] = "kSRIViolation";
    ContentSecurityPolicyViolationType2["KTrustedTypesSinkViolation"] = "kTrustedTypesSinkViolation";
    ContentSecurityPolicyViolationType2["KTrustedTypesPolicyViolation"] = "kTrustedTypesPolicyViolation";
    ContentSecurityPolicyViolationType2["KWasmEvalViolation"] = "kWasmEvalViolation";
  })(ContentSecurityPolicyViolationType = Audits2.ContentSecurityPolicyViolationType || (Audits2.ContentSecurityPolicyViolationType = {}));
  let SharedArrayBufferIssueType;
  ((SharedArrayBufferIssueType2) => {
    SharedArrayBufferIssueType2["TransferIssue"] = "TransferIssue";
    SharedArrayBufferIssueType2["CreationIssue"] = "CreationIssue";
  })(SharedArrayBufferIssueType = Audits2.SharedArrayBufferIssueType || (Audits2.SharedArrayBufferIssueType = {}));
  let SharedDictionaryError;
  ((SharedDictionaryError2) => {
    SharedDictionaryError2["UseErrorCrossOriginNoCorsRequest"] = "UseErrorCrossOriginNoCorsRequest";
    SharedDictionaryError2["UseErrorDictionaryLoadFailure"] = "UseErrorDictionaryLoadFailure";
    SharedDictionaryError2["UseErrorMatchingDictionaryNotUsed"] = "UseErrorMatchingDictionaryNotUsed";
    SharedDictionaryError2["UseErrorUnexpectedContentDictionaryHeader"] = "UseErrorUnexpectedContentDictionaryHeader";
    SharedDictionaryError2["WriteErrorCossOriginNoCorsRequest"] = "WriteErrorCossOriginNoCorsRequest";
    SharedDictionaryError2["WriteErrorDisallowedBySettings"] = "WriteErrorDisallowedBySettings";
    SharedDictionaryError2["WriteErrorExpiredResponse"] = "WriteErrorExpiredResponse";
    SharedDictionaryError2["WriteErrorFeatureDisabled"] = "WriteErrorFeatureDisabled";
    SharedDictionaryError2["WriteErrorInsufficientResources"] = "WriteErrorInsufficientResources";
    SharedDictionaryError2["WriteErrorInvalidMatchField"] = "WriteErrorInvalidMatchField";
    SharedDictionaryError2["WriteErrorInvalidStructuredHeader"] = "WriteErrorInvalidStructuredHeader";
    SharedDictionaryError2["WriteErrorInvalidTTLField"] = "WriteErrorInvalidTTLField";
    SharedDictionaryError2["WriteErrorNavigationRequest"] = "WriteErrorNavigationRequest";
    SharedDictionaryError2["WriteErrorNoMatchField"] = "WriteErrorNoMatchField";
    SharedDictionaryError2["WriteErrorNonIntegerTTLField"] = "WriteErrorNonIntegerTTLField";
    SharedDictionaryError2["WriteErrorNonListMatchDestField"] = "WriteErrorNonListMatchDestField";
    SharedDictionaryError2["WriteErrorNonSecureContext"] = "WriteErrorNonSecureContext";
    SharedDictionaryError2["WriteErrorNonStringIdField"] = "WriteErrorNonStringIdField";
    SharedDictionaryError2["WriteErrorNonStringInMatchDestList"] = "WriteErrorNonStringInMatchDestList";
    SharedDictionaryError2["WriteErrorInvalidMatchDestList"] = "WriteErrorInvalidMatchDestList";
    SharedDictionaryError2["WriteErrorNonStringMatchField"] = "WriteErrorNonStringMatchField";
    SharedDictionaryError2["WriteErrorNonTokenTypeField"] = "WriteErrorNonTokenTypeField";
    SharedDictionaryError2["WriteErrorRequestAborted"] = "WriteErrorRequestAborted";
    SharedDictionaryError2["WriteErrorShuttingDown"] = "WriteErrorShuttingDown";
    SharedDictionaryError2["WriteErrorTooLongIdField"] = "WriteErrorTooLongIdField";
    SharedDictionaryError2["WriteErrorUnsupportedType"] = "WriteErrorUnsupportedType";
  })(SharedDictionaryError = Audits2.SharedDictionaryError || (Audits2.SharedDictionaryError = {}));
  let SRIMessageSignatureError;
  ((SRIMessageSignatureError2) => {
    SRIMessageSignatureError2["MissingSignatureHeader"] = "MissingSignatureHeader";
    SRIMessageSignatureError2["MissingSignatureInputHeader"] = "MissingSignatureInputHeader";
    SRIMessageSignatureError2["InvalidSignatureHeader"] = "InvalidSignatureHeader";
    SRIMessageSignatureError2["InvalidSignatureInputHeader"] = "InvalidSignatureInputHeader";
    SRIMessageSignatureError2["SignatureHeaderValueIsNotByteSequence"] = "SignatureHeaderValueIsNotByteSequence";
    SRIMessageSignatureError2["SignatureHeaderValueIsParameterized"] = "SignatureHeaderValueIsParameterized";
    SRIMessageSignatureError2["SignatureHeaderValueIsIncorrectLength"] = "SignatureHeaderValueIsIncorrectLength";
    SRIMessageSignatureError2["SignatureInputHeaderMissingLabel"] = "SignatureInputHeaderMissingLabel";
    SRIMessageSignatureError2["SignatureInputHeaderValueNotInnerList"] = "SignatureInputHeaderValueNotInnerList";
    SRIMessageSignatureError2["SignatureInputHeaderValueMissingComponents"] = "SignatureInputHeaderValueMissingComponents";
    SRIMessageSignatureError2["SignatureInputHeaderInvalidComponentType"] = "SignatureInputHeaderInvalidComponentType";
    SRIMessageSignatureError2["SignatureInputHeaderInvalidComponentName"] = "SignatureInputHeaderInvalidComponentName";
    SRIMessageSignatureError2["SignatureInputHeaderInvalidHeaderComponentParameter"] = "SignatureInputHeaderInvalidHeaderComponentParameter";
    SRIMessageSignatureError2["SignatureInputHeaderInvalidDerivedComponentParameter"] = "SignatureInputHeaderInvalidDerivedComponentParameter";
    SRIMessageSignatureError2["SignatureInputHeaderKeyIdLength"] = "SignatureInputHeaderKeyIdLength";
    SRIMessageSignatureError2["SignatureInputHeaderInvalidParameter"] = "SignatureInputHeaderInvalidParameter";
    SRIMessageSignatureError2["SignatureInputHeaderMissingRequiredParameters"] = "SignatureInputHeaderMissingRequiredParameters";
    SRIMessageSignatureError2["ValidationFailedSignatureExpired"] = "ValidationFailedSignatureExpired";
    SRIMessageSignatureError2["ValidationFailedInvalidLength"] = "ValidationFailedInvalidLength";
    SRIMessageSignatureError2["ValidationFailedSignatureMismatch"] = "ValidationFailedSignatureMismatch";
    SRIMessageSignatureError2["ValidationFailedIntegrityMismatch"] = "ValidationFailedIntegrityMismatch";
    SRIMessageSignatureError2["SignatureBaseUnknownDerivedComponent"] = "SignatureBaseUnknownDerivedComponent";
    SRIMessageSignatureError2["SignatureBaseMissingHeader"] = "SignatureBaseMissingHeader";
    SRIMessageSignatureError2["SignatureBaseInvalidUnencodedDigest"] = "SignatureBaseInvalidUnencodedDigest";
    SRIMessageSignatureError2["SignatureBaseUnsupportedComponent"] = "SignatureBaseUnsupportedComponent";
  })(SRIMessageSignatureError = Audits2.SRIMessageSignatureError || (Audits2.SRIMessageSignatureError = {}));
  let UnencodedDigestError;
  ((UnencodedDigestError2) => {
    UnencodedDigestError2["MalformedDictionary"] = "MalformedDictionary";
    UnencodedDigestError2["UnknownAlgorithm"] = "UnknownAlgorithm";
    UnencodedDigestError2["IncorrectDigestType"] = "IncorrectDigestType";
    UnencodedDigestError2["IncorrectDigestLength"] = "IncorrectDigestLength";
  })(UnencodedDigestError = Audits2.UnencodedDigestError || (Audits2.UnencodedDigestError = {}));
  let ConnectionAllowlistError;
  ((ConnectionAllowlistError2) => {
    ConnectionAllowlistError2["InvalidHeader"] = "InvalidHeader";
    ConnectionAllowlistError2["MoreThanOneList"] = "MoreThanOneList";
    ConnectionAllowlistError2["ItemNotInnerList"] = "ItemNotInnerList";
    ConnectionAllowlistError2["InvalidAllowlistItemType"] = "InvalidAllowlistItemType";
    ConnectionAllowlistError2["ReportingEndpointNotToken"] = "ReportingEndpointNotToken";
    ConnectionAllowlistError2["InvalidUrlPattern"] = "InvalidUrlPattern";
    ConnectionAllowlistError2["IFrameAttributeLoosensEmbeddingRequirement"] = "IFrameAttributeLoosensEmbeddingRequirement";
    ConnectionAllowlistError2["InvalidAllowConnectionAllowlistFrom"] = "InvalidAllowConnectionAllowlistFrom";
    ConnectionAllowlistError2["EmbeddingRequirementNotSatisfied"] = "EmbeddingRequirementNotSatisfied";
  })(ConnectionAllowlistError = Audits2.ConnectionAllowlistError || (Audits2.ConnectionAllowlistError = {}));
  let GenericIssueErrorType;
  ((GenericIssueErrorType2) => {
    GenericIssueErrorType2["FormLabelForNameError"] = "FormLabelForNameError";
    GenericIssueErrorType2["FormDuplicateIdForInputError"] = "FormDuplicateIdForInputError";
    GenericIssueErrorType2["FormInputWithNoLabelError"] = "FormInputWithNoLabelError";
    GenericIssueErrorType2["FormAutocompleteAttributeEmptyError"] = "FormAutocompleteAttributeEmptyError";
    GenericIssueErrorType2["FormEmptyIdAndNameAttributesForInputError"] = "FormEmptyIdAndNameAttributesForInputError";
    GenericIssueErrorType2["FormAriaLabelledByToNonExistingIdError"] = "FormAriaLabelledByToNonExistingIdError";
    GenericIssueErrorType2["FormInputAssignedAutocompleteValueToIdOrNameAttributeError"] = "FormInputAssignedAutocompleteValueToIdOrNameAttributeError";
    GenericIssueErrorType2["FormLabelHasNeitherForNorNestedInputError"] = "FormLabelHasNeitherForNorNestedInputError";
    GenericIssueErrorType2["FormLabelForMatchesNonExistingIdError"] = "FormLabelForMatchesNonExistingIdError";
    GenericIssueErrorType2["FormInputHasWrongButWellIntendedAutocompleteValueError"] = "FormInputHasWrongButWellIntendedAutocompleteValueError";
    GenericIssueErrorType2["ResponseWasBlockedByORB"] = "ResponseWasBlockedByORB";
    GenericIssueErrorType2["NavigationEntryMarkedSkippable"] = "NavigationEntryMarkedSkippable";
    GenericIssueErrorType2["BackUINavigationWouldSkipAd"] = "BackUINavigationWouldSkipAd";
    GenericIssueErrorType2["AutofillAndManualTextPolicyControlledFeaturesInfo"] = "AutofillAndManualTextPolicyControlledFeaturesInfo";
    GenericIssueErrorType2["AutofillPolicyControlledFeatureInfo"] = "AutofillPolicyControlledFeatureInfo";
    GenericIssueErrorType2["ManualTextPolicyControlledFeatureInfo"] = "ManualTextPolicyControlledFeatureInfo";
    GenericIssueErrorType2["FormModelContextParameterMissingTitleAndDescription"] = "FormModelContextParameterMissingTitleAndDescription";
    GenericIssueErrorType2["FormModelContextMissingToolName"] = "FormModelContextMissingToolName";
    GenericIssueErrorType2["FormModelContextMissingToolDescription"] = "FormModelContextMissingToolDescription";
    GenericIssueErrorType2["FormModelContextRequiredParameterMissingName"] = "FormModelContextRequiredParameterMissingName";
    GenericIssueErrorType2["FormModelContextParameterMissingName"] = "FormModelContextParameterMissingName";
  })(GenericIssueErrorType = Audits2.GenericIssueErrorType || (Audits2.GenericIssueErrorType = {}));
  let ClientHintIssueReason;
  ((ClientHintIssueReason2) => {
    ClientHintIssueReason2["MetaTagAllowListInvalidOrigin"] = "MetaTagAllowListInvalidOrigin";
    ClientHintIssueReason2["MetaTagModifiedHTML"] = "MetaTagModifiedHTML";
  })(ClientHintIssueReason = Audits2.ClientHintIssueReason || (Audits2.ClientHintIssueReason = {}));
  let FederatedAuthRequestIssueReason;
  ((FederatedAuthRequestIssueReason2) => {
    FederatedAuthRequestIssueReason2["ShouldEmbargo"] = "ShouldEmbargo";
    FederatedAuthRequestIssueReason2["TooManyRequests"] = "TooManyRequests";
    FederatedAuthRequestIssueReason2["WellKnownHttpNotFound"] = "WellKnownHttpNotFound";
    FederatedAuthRequestIssueReason2["WellKnownNoResponse"] = "WellKnownNoResponse";
    FederatedAuthRequestIssueReason2["WellKnownBlockedByConnectionAllowlist"] = "WellKnownBlockedByConnectionAllowlist";
    FederatedAuthRequestIssueReason2["WellKnownInvalidResponse"] = "WellKnownInvalidResponse";
    FederatedAuthRequestIssueReason2["WellKnownListEmpty"] = "WellKnownListEmpty";
    FederatedAuthRequestIssueReason2["WellKnownInvalidContentType"] = "WellKnownInvalidContentType";
    FederatedAuthRequestIssueReason2["ConfigNotInWellKnown"] = "ConfigNotInWellKnown";
    FederatedAuthRequestIssueReason2["WellKnownTooBig"] = "WellKnownTooBig";
    FederatedAuthRequestIssueReason2["ConfigHttpNotFound"] = "ConfigHttpNotFound";
    FederatedAuthRequestIssueReason2["ConfigNoResponse"] = "ConfigNoResponse";
    FederatedAuthRequestIssueReason2["ConfigBlockedByConnectionAllowlist"] = "ConfigBlockedByConnectionAllowlist";
    FederatedAuthRequestIssueReason2["ConfigInvalidResponse"] = "ConfigInvalidResponse";
    FederatedAuthRequestIssueReason2["ConfigInvalidContentType"] = "ConfigInvalidContentType";
    FederatedAuthRequestIssueReason2["IdpNotPotentiallyTrustworthy"] = "IdpNotPotentiallyTrustworthy";
    FederatedAuthRequestIssueReason2["DisabledInSettings"] = "DisabledInSettings";
    FederatedAuthRequestIssueReason2["DisabledInFlags"] = "DisabledInFlags";
    FederatedAuthRequestIssueReason2["ErrorFetchingSignin"] = "ErrorFetchingSignin";
    FederatedAuthRequestIssueReason2["InvalidSigninResponse"] = "InvalidSigninResponse";
    FederatedAuthRequestIssueReason2["AccountsHttpNotFound"] = "AccountsHttpNotFound";
    FederatedAuthRequestIssueReason2["AccountsNoResponse"] = "AccountsNoResponse";
    FederatedAuthRequestIssueReason2["AccountsBlockedByConnectionAllowlist"] = "AccountsBlockedByConnectionAllowlist";
    FederatedAuthRequestIssueReason2["AccountsInvalidResponse"] = "AccountsInvalidResponse";
    FederatedAuthRequestIssueReason2["AccountsListEmpty"] = "AccountsListEmpty";
    FederatedAuthRequestIssueReason2["AccountsInvalidContentType"] = "AccountsInvalidContentType";
    FederatedAuthRequestIssueReason2["IdTokenHttpNotFound"] = "IdTokenHttpNotFound";
    FederatedAuthRequestIssueReason2["IdTokenNoResponse"] = "IdTokenNoResponse";
    FederatedAuthRequestIssueReason2["IdTokenBlockedByConnectionAllowlist"] = "IdTokenBlockedByConnectionAllowlist";
    FederatedAuthRequestIssueReason2["IdTokenInvalidResponse"] = "IdTokenInvalidResponse";
    FederatedAuthRequestIssueReason2["IdTokenIdpErrorResponse"] = "IdTokenIdpErrorResponse";
    FederatedAuthRequestIssueReason2["IdTokenCrossSiteIdpErrorResponse"] = "IdTokenCrossSiteIdpErrorResponse";
    FederatedAuthRequestIssueReason2["IdTokenInvalidRequest"] = "IdTokenInvalidRequest";
    FederatedAuthRequestIssueReason2["IdTokenInvalidContentType"] = "IdTokenInvalidContentType";
    FederatedAuthRequestIssueReason2["ErrorIdToken"] = "ErrorIdToken";
    FederatedAuthRequestIssueReason2["Canceled"] = "Canceled";
    FederatedAuthRequestIssueReason2["RpPageNotVisible"] = "RpPageNotVisible";
    FederatedAuthRequestIssueReason2["SilentMediationFailure"] = "SilentMediationFailure";
    FederatedAuthRequestIssueReason2["NotSignedInWithIdp"] = "NotSignedInWithIdp";
    FederatedAuthRequestIssueReason2["MissingTransientUserActivation"] = "MissingTransientUserActivation";
    FederatedAuthRequestIssueReason2["ReplacedByActiveMode"] = "ReplacedByActiveMode";
    FederatedAuthRequestIssueReason2["RelyingPartyOriginIsOpaque"] = "RelyingPartyOriginIsOpaque";
    FederatedAuthRequestIssueReason2["TypeNotMatching"] = "TypeNotMatching";
    FederatedAuthRequestIssueReason2["UiDismissedNoEmbargo"] = "UiDismissedNoEmbargo";
    FederatedAuthRequestIssueReason2["CorsError"] = "CorsError";
    FederatedAuthRequestIssueReason2["SuppressedBySegmentationPlatform"] = "SuppressedBySegmentationPlatform";
    FederatedAuthRequestIssueReason2["PopupBlockedByConnectionAllowlist"] = "PopupBlockedByConnectionAllowlist";
  })(FederatedAuthRequestIssueReason = Audits2.FederatedAuthRequestIssueReason || (Audits2.FederatedAuthRequestIssueReason = {}));
  let FederatedAuthUserInfoRequestIssueReason;
  ((FederatedAuthUserInfoRequestIssueReason2) => {
    FederatedAuthUserInfoRequestIssueReason2["NotSameOrigin"] = "NotSameOrigin";
    FederatedAuthUserInfoRequestIssueReason2["NotIframe"] = "NotIframe";
    FederatedAuthUserInfoRequestIssueReason2["NotPotentiallyTrustworthy"] = "NotPotentiallyTrustworthy";
    FederatedAuthUserInfoRequestIssueReason2["NoAPIPermission"] = "NoApiPermission";
    FederatedAuthUserInfoRequestIssueReason2["NotSignedInWithIdp"] = "NotSignedInWithIdp";
    FederatedAuthUserInfoRequestIssueReason2["NoAccountSharingPermission"] = "NoAccountSharingPermission";
    FederatedAuthUserInfoRequestIssueReason2["InvalidConfigOrWellKnown"] = "InvalidConfigOrWellKnown";
    FederatedAuthUserInfoRequestIssueReason2["InvalidAccountsResponse"] = "InvalidAccountsResponse";
    FederatedAuthUserInfoRequestIssueReason2["NoReturningUserFromFetchedAccounts"] = "NoReturningUserFromFetchedAccounts";
  })(FederatedAuthUserInfoRequestIssueReason = Audits2.FederatedAuthUserInfoRequestIssueReason || (Audits2.FederatedAuthUserInfoRequestIssueReason = {}));
  let EmailVerificationRequestIssueReason;
  ((EmailVerificationRequestIssueReason2) => {
    EmailVerificationRequestIssueReason2["InvalidEmail"] = "InvalidEmail";
    EmailVerificationRequestIssueReason2["DnsFetchFailed"] = "DnsFetchFailed";
    EmailVerificationRequestIssueReason2["DnsInvalidRecord"] = "DnsInvalidRecord";
    EmailVerificationRequestIssueReason2["WellKnownHttpNotFound"] = "WellKnownHttpNotFound";
    EmailVerificationRequestIssueReason2["WellKnownNoResponse"] = "WellKnownNoResponse";
    EmailVerificationRequestIssueReason2["WellKnownInvalidResponse"] = "WellKnownInvalidResponse";
    EmailVerificationRequestIssueReason2["WellKnownListEmpty"] = "WellKnownListEmpty";
    EmailVerificationRequestIssueReason2["WellKnownInvalidContentType"] = "WellKnownInvalidContentType";
    EmailVerificationRequestIssueReason2["WellKnownMissingIssuanceEndpoint"] = "WellKnownMissingIssuanceEndpoint";
    EmailVerificationRequestIssueReason2["WellKnownIssuanceEndpointCrossOrigin"] = "WellKnownIssuanceEndpointCrossOrigin";
    EmailVerificationRequestIssueReason2["WellKnownUnsupportedSigningAlgorithm"] = "WellKnownUnsupportedSigningAlgorithm";
    EmailVerificationRequestIssueReason2["TokenHttpNotFound"] = "TokenHttpNotFound";
    EmailVerificationRequestIssueReason2["TokenNoResponse"] = "TokenNoResponse";
    EmailVerificationRequestIssueReason2["TokenInvalidResponse"] = "TokenInvalidResponse";
    EmailVerificationRequestIssueReason2["TokenInvalidContentType"] = "TokenInvalidContentType";
    EmailVerificationRequestIssueReason2["TokenMalformedSdJwt"] = "TokenMalformedSdJwt";
    EmailVerificationRequestIssueReason2["TokenInvalidSdJwt"] = "TokenInvalidSdJwt";
    EmailVerificationRequestIssueReason2["KeyBindingSigningFailed"] = "KeyBindingSigningFailed";
    EmailVerificationRequestIssueReason2["RpOriginIsOpaque"] = "RpOriginIsOpaque";
    EmailVerificationRequestIssueReason2["WellKnownMissingAccountsEndpoint"] = "WellKnownMissingAccountsEndpoint";
    EmailVerificationRequestIssueReason2["UserLoggedOut"] = "UserLoggedOut";
    EmailVerificationRequestIssueReason2["WellKnownAccountsEndpointCrossOrigin"] = "WellKnownAccountsEndpointCrossOrigin";
    EmailVerificationRequestIssueReason2["AccountsHttpNotFound"] = "AccountsHttpNotFound";
    EmailVerificationRequestIssueReason2["AccountsNoResponse"] = "AccountsNoResponse";
    EmailVerificationRequestIssueReason2["AccountsInvalidResponse"] = "AccountsInvalidResponse";
    EmailVerificationRequestIssueReason2["AccountsInvalidContentType"] = "AccountsInvalidContentType";
    EmailVerificationRequestIssueReason2["AccountsEmptyList"] = "AccountsEmptyList";
    EmailVerificationRequestIssueReason2["EmailVerificationWellKnownHttpNotFound"] = "EmailVerificationWellKnownHttpNotFound";
    EmailVerificationRequestIssueReason2["EmailVerificationWellKnownNoResponse"] = "EmailVerificationWellKnownNoResponse";
    EmailVerificationRequestIssueReason2["EmailVerificationWellKnownInvalidResponse"] = "EmailVerificationWellKnownInvalidResponse";
    EmailVerificationRequestIssueReason2["EmailVerificationWellKnownInvalidContentType"] = "EmailVerificationWellKnownInvalidContentType";
    EmailVerificationRequestIssueReason2["JwksHttpNotFound"] = "JwksHttpNotFound";
    EmailVerificationRequestIssueReason2["JwksInvalidResponse"] = "JwksInvalidResponse";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtUnsupportedHeaderAlg"] = "TokenVerificationSdJwtUnsupportedHeaderAlg";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtInvalidTyp"] = "TokenVerificationSdJwtInvalidTyp";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtMissingIss"] = "TokenVerificationSdJwtMissingIss";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtMissingIat"] = "TokenVerificationSdJwtMissingIat";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtMissingCnf"] = "TokenVerificationSdJwtMissingCnf";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtMissingEmail"] = "TokenVerificationSdJwtMissingEmail";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtInvalidIssuedAt"] = "TokenVerificationSdJwtInvalidIssuedAt";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtInvalidIssuer"] = "TokenVerificationSdJwtInvalidIssuer";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtJwksMissingKeys"] = "TokenVerificationSdJwtJwksMissingKeys";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtSignatureFailed"] = "TokenVerificationSdJwtSignatureFailed";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtInvalidEmailVerified"] = "TokenVerificationSdJwtInvalidEmailVerified";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtInvalidEmail"] = "TokenVerificationSdJwtInvalidEmail";
    EmailVerificationRequestIssueReason2["TokenVerificationSdJwtInvalidHolderKey"] = "TokenVerificationSdJwtInvalidHolderKey";
    EmailVerificationRequestIssueReason2["TokenVerificationKbInvalidTyp"] = "TokenVerificationKbInvalidTyp";
    EmailVerificationRequestIssueReason2["TokenVerificationKbMissingAud"] = "TokenVerificationKbMissingAud";
    EmailVerificationRequestIssueReason2["TokenVerificationKbMissingNonce"] = "TokenVerificationKbMissingNonce";
    EmailVerificationRequestIssueReason2["TokenVerificationKbMissingIat"] = "TokenVerificationKbMissingIat";
    EmailVerificationRequestIssueReason2["TokenVerificationKbMissingSdHash"] = "TokenVerificationKbMissingSdHash";
    EmailVerificationRequestIssueReason2["TokenVerificationKbInvalidIssuedAt"] = "TokenVerificationKbInvalidIssuedAt";
    EmailVerificationRequestIssueReason2["TokenVerificationKbInvalidAudience"] = "TokenVerificationKbInvalidAudience";
    EmailVerificationRequestIssueReason2["TokenVerificationKbInvalidNonce"] = "TokenVerificationKbInvalidNonce";
    EmailVerificationRequestIssueReason2["TokenVerificationKbInvalidSdHash"] = "TokenVerificationKbInvalidSdHash";
    EmailVerificationRequestIssueReason2["TokenVerificationKbMissingCnf"] = "TokenVerificationKbMissingCnf";
    EmailVerificationRequestIssueReason2["TokenVerificationKbSignatureFailed"] = "TokenVerificationKbSignatureFailed";
    EmailVerificationRequestIssueReason2["CrossOriginIframeNotSupported"] = "CrossOriginIframeNotSupported";
  })(EmailVerificationRequestIssueReason = Audits2.EmailVerificationRequestIssueReason || (Audits2.EmailVerificationRequestIssueReason = {}));
  let PartitioningBlobURLInfo;
  ((PartitioningBlobURLInfo2) => {
    PartitioningBlobURLInfo2["BlockedCrossPartitionFetching"] = "BlockedCrossPartitionFetching";
    PartitioningBlobURLInfo2["EnforceNoopenerForNavigation"] = "EnforceNoopenerForNavigation";
  })(PartitioningBlobURLInfo = Audits2.PartitioningBlobURLInfo || (Audits2.PartitioningBlobURLInfo = {}));
  let ElementAccessibilityIssueReason;
  ((ElementAccessibilityIssueReason2) => {
    ElementAccessibilityIssueReason2["DisallowedSelectChild"] = "DisallowedSelectChild";
    ElementAccessibilityIssueReason2["DisallowedOptGroupChild"] = "DisallowedOptGroupChild";
    ElementAccessibilityIssueReason2["NonPhrasingContentOptionChild"] = "NonPhrasingContentOptionChild";
    ElementAccessibilityIssueReason2["InteractiveContentOptionChild"] = "InteractiveContentOptionChild";
    ElementAccessibilityIssueReason2["InteractiveContentLegendChild"] = "InteractiveContentLegendChild";
    ElementAccessibilityIssueReason2["InteractiveContentSummaryDescendant"] = "InteractiveContentSummaryDescendant";
  })(ElementAccessibilityIssueReason = Audits2.ElementAccessibilityIssueReason || (Audits2.ElementAccessibilityIssueReason = {}));
  let StyleSheetLoadingIssueReason;
  ((StyleSheetLoadingIssueReason2) => {
    StyleSheetLoadingIssueReason2["LateImportRule"] = "LateImportRule";
    StyleSheetLoadingIssueReason2["RequestFailed"] = "RequestFailed";
  })(StyleSheetLoadingIssueReason = Audits2.StyleSheetLoadingIssueReason || (Audits2.StyleSheetLoadingIssueReason = {}));
  let PropertyRuleIssueReason;
  ((PropertyRuleIssueReason2) => {
    PropertyRuleIssueReason2["InvalidSyntax"] = "InvalidSyntax";
    PropertyRuleIssueReason2["InvalidInitialValue"] = "InvalidInitialValue";
    PropertyRuleIssueReason2["InvalidInherits"] = "InvalidInherits";
    PropertyRuleIssueReason2["InvalidName"] = "InvalidName";
  })(PropertyRuleIssueReason = Audits2.PropertyRuleIssueReason || (Audits2.PropertyRuleIssueReason = {}));
  let UserReidentificationIssueType;
  ((UserReidentificationIssueType2) => {
    UserReidentificationIssueType2["BlockedFrameNavigation"] = "BlockedFrameNavigation";
    UserReidentificationIssueType2["BlockedSubresource"] = "BlockedSubresource";
    UserReidentificationIssueType2["NoisedCanvasReadback"] = "NoisedCanvasReadback";
  })(UserReidentificationIssueType = Audits2.UserReidentificationIssueType || (Audits2.UserReidentificationIssueType = {}));
  let PermissionElementIssueType;
  ((PermissionElementIssueType2) => {
    PermissionElementIssueType2["InvalidType"] = "InvalidType";
    PermissionElementIssueType2["FencedFrameDisallowed"] = "FencedFrameDisallowed";
    PermissionElementIssueType2["CspFrameAncestorsMissing"] = "CspFrameAncestorsMissing";
    PermissionElementIssueType2["PermissionsPolicyBlocked"] = "PermissionsPolicyBlocked";
    PermissionElementIssueType2["PaddingRightUnsupported"] = "PaddingRightUnsupported";
    PermissionElementIssueType2["PaddingBottomUnsupported"] = "PaddingBottomUnsupported";
    PermissionElementIssueType2["InsetBoxShadowUnsupported"] = "InsetBoxShadowUnsupported";
    PermissionElementIssueType2["RequestInProgress"] = "RequestInProgress";
    PermissionElementIssueType2["UntrustedEvent"] = "UntrustedEvent";
    PermissionElementIssueType2["RegistrationFailed"] = "RegistrationFailed";
    PermissionElementIssueType2["TypeNotSupported"] = "TypeNotSupported";
    PermissionElementIssueType2["InvalidTypeActivation"] = "InvalidTypeActivation";
    PermissionElementIssueType2["SecurityChecksFailed"] = "SecurityChecksFailed";
    PermissionElementIssueType2["ActivationDisabled"] = "ActivationDisabled";
    PermissionElementIssueType2["GeolocationDeprecated"] = "GeolocationDeprecated";
    PermissionElementIssueType2["InvalidDisplayStyle"] = "InvalidDisplayStyle";
    PermissionElementIssueType2["NonOpaqueColor"] = "NonOpaqueColor";
    PermissionElementIssueType2["LowContrast"] = "LowContrast";
    PermissionElementIssueType2["FontSizeTooSmall"] = "FontSizeTooSmall";
    PermissionElementIssueType2["FontSizeTooLarge"] = "FontSizeTooLarge";
    PermissionElementIssueType2["InvalidSizeValue"] = "InvalidSizeValue";
    PermissionElementIssueType2["NonSecureContext"] = "NonSecureContext";
    PermissionElementIssueType2["MissingTransientUserActivation"] = "MissingTransientUserActivation";
  })(PermissionElementIssueType = Audits2.PermissionElementIssueType || (Audits2.PermissionElementIssueType = {}));
  let InspectorIssueCode;
  ((InspectorIssueCode2) => {
    InspectorIssueCode2["CookieIssue"] = "CookieIssue";
    InspectorIssueCode2["MixedContentIssue"] = "MixedContentIssue";
    InspectorIssueCode2["BlockedByResponseIssue"] = "BlockedByResponseIssue";
    InspectorIssueCode2["HeavyAdIssue"] = "HeavyAdIssue";
    InspectorIssueCode2["ContentSecurityPolicyIssue"] = "ContentSecurityPolicyIssue";
    InspectorIssueCode2["SharedArrayBufferIssue"] = "SharedArrayBufferIssue";
    InspectorIssueCode2["CorsIssue"] = "CorsIssue";
    InspectorIssueCode2["QuirksModeIssue"] = "QuirksModeIssue";
    InspectorIssueCode2["PartitioningBlobURLIssue"] = "PartitioningBlobURLIssue";
    InspectorIssueCode2["NavigatorUserAgentIssue"] = "NavigatorUserAgentIssue";
    InspectorIssueCode2["GenericIssue"] = "GenericIssue";
    InspectorIssueCode2["DeprecationIssue"] = "DeprecationIssue";
    InspectorIssueCode2["ClientHintIssue"] = "ClientHintIssue";
    InspectorIssueCode2["FederatedAuthRequestIssue"] = "FederatedAuthRequestIssue";
    InspectorIssueCode2["BounceTrackingIssue"] = "BounceTrackingIssue";
    InspectorIssueCode2["CookieDeprecationMetadataIssue"] = "CookieDeprecationMetadataIssue";
    InspectorIssueCode2["StylesheetLoadingIssue"] = "StylesheetLoadingIssue";
    InspectorIssueCode2["FederatedAuthUserInfoRequestIssue"] = "FederatedAuthUserInfoRequestIssue";
    InspectorIssueCode2["PropertyRuleIssue"] = "PropertyRuleIssue";
    InspectorIssueCode2["SharedDictionaryIssue"] = "SharedDictionaryIssue";
    InspectorIssueCode2["ElementAccessibilityIssue"] = "ElementAccessibilityIssue";
    InspectorIssueCode2["SRIMessageSignatureIssue"] = "SRIMessageSignatureIssue";
    InspectorIssueCode2["UnencodedDigestIssue"] = "UnencodedDigestIssue";
    InspectorIssueCode2["ConnectionAllowlistIssue"] = "ConnectionAllowlistIssue";
    InspectorIssueCode2["UserReidentificationIssue"] = "UserReidentificationIssue";
    InspectorIssueCode2["PermissionElementIssue"] = "PermissionElementIssue";
    InspectorIssueCode2["PerformanceIssue"] = "PerformanceIssue";
    InspectorIssueCode2["SelectivePermissionsInterventionIssue"] = "SelectivePermissionsInterventionIssue";
    InspectorIssueCode2["EmailVerificationRequestIssue"] = "EmailVerificationRequestIssue";
    InspectorIssueCode2["LazyLoadImageIssue"] = "LazyLoadImageIssue";
  })(InspectorIssueCode = Audits2.InspectorIssueCode || (Audits2.InspectorIssueCode = {}));
  let GetEncodedResponseRequestEncoding;
  ((GetEncodedResponseRequestEncoding2) => {
    GetEncodedResponseRequestEncoding2["Webp"] = "webp";
    GetEncodedResponseRequestEncoding2["Jpeg"] = "jpeg";
    GetEncodedResponseRequestEncoding2["Png"] = "png";
  })(GetEncodedResponseRequestEncoding = Audits2.GetEncodedResponseRequestEncoding || (Audits2.GetEncodedResponseRequestEncoding = {}));
})(Audits || (Audits = {}));
var Autofill;
((Autofill2) => {
  let FillingStrategy;
  ((FillingStrategy2) => {
    FillingStrategy2["AutocompleteAttribute"] = "autocompleteAttribute";
    FillingStrategy2["AutofillInferred"] = "autofillInferred";
  })(FillingStrategy = Autofill2.FillingStrategy || (Autofill2.FillingStrategy = {}));
})(Autofill || (Autofill = {}));
var BackgroundService;
((BackgroundService2) => {
  let ServiceName;
  ((ServiceName2) => {
    ServiceName2["BackgroundFetch"] = "backgroundFetch";
    ServiceName2["BackgroundSync"] = "backgroundSync";
    ServiceName2["PushMessaging"] = "pushMessaging";
    ServiceName2["Notifications"] = "notifications";
    ServiceName2["PaymentHandler"] = "paymentHandler";
    ServiceName2["PeriodicBackgroundSync"] = "periodicBackgroundSync";
  })(ServiceName = BackgroundService2.ServiceName || (BackgroundService2.ServiceName = {}));
})(BackgroundService || (BackgroundService = {}));
var BluetoothEmulation;
((BluetoothEmulation2) => {
  let CentralState;
  ((CentralState2) => {
    CentralState2["Absent"] = "absent";
    CentralState2["PoweredOff"] = "powered-off";
    CentralState2["PoweredOn"] = "powered-on";
  })(CentralState = BluetoothEmulation2.CentralState || (BluetoothEmulation2.CentralState = {}));
  let GATTOperationType;
  ((GATTOperationType2) => {
    GATTOperationType2["Connection"] = "connection";
    GATTOperationType2["Discovery"] = "discovery";
  })(GATTOperationType = BluetoothEmulation2.GATTOperationType || (BluetoothEmulation2.GATTOperationType = {}));
  let CharacteristicWriteType;
  ((CharacteristicWriteType2) => {
    CharacteristicWriteType2["WriteDefaultDeprecated"] = "write-default-deprecated";
    CharacteristicWriteType2["WriteWithResponse"] = "write-with-response";
    CharacteristicWriteType2["WriteWithoutResponse"] = "write-without-response";
  })(CharacteristicWriteType = BluetoothEmulation2.CharacteristicWriteType || (BluetoothEmulation2.CharacteristicWriteType = {}));
  let CharacteristicOperationType;
  ((CharacteristicOperationType2) => {
    CharacteristicOperationType2["Read"] = "read";
    CharacteristicOperationType2["Write"] = "write";
    CharacteristicOperationType2["SubscribeToNotifications"] = "subscribe-to-notifications";
    CharacteristicOperationType2["UnsubscribeFromNotifications"] = "unsubscribe-from-notifications";
  })(CharacteristicOperationType = BluetoothEmulation2.CharacteristicOperationType || (BluetoothEmulation2.CharacteristicOperationType = {}));
  let DescriptorOperationType;
  ((DescriptorOperationType2) => {
    DescriptorOperationType2["Read"] = "read";
    DescriptorOperationType2["Write"] = "write";
  })(DescriptorOperationType = BluetoothEmulation2.DescriptorOperationType || (BluetoothEmulation2.DescriptorOperationType = {}));
})(BluetoothEmulation || (BluetoothEmulation = {}));
var Browser;
((Browser2) => {
  let WindowState;
  ((WindowState2) => {
    WindowState2["Normal"] = "normal";
    WindowState2["Minimized"] = "minimized";
    WindowState2["Maximized"] = "maximized";
    WindowState2["Fullscreen"] = "fullscreen";
  })(WindowState = Browser2.WindowState || (Browser2.WindowState = {}));
  let PermissionType;
  ((PermissionType2) => {
    PermissionType2["Ar"] = "ar";
    PermissionType2["AudioCapture"] = "audioCapture";
    PermissionType2["AutomaticFullscreen"] = "automaticFullscreen";
    PermissionType2["BackgroundFetch"] = "backgroundFetch";
    PermissionType2["BackgroundSync"] = "backgroundSync";
    PermissionType2["CameraPanTiltZoom"] = "cameraPanTiltZoom";
    PermissionType2["CapturedSurfaceControl"] = "capturedSurfaceControl";
    PermissionType2["ClipboardReadWrite"] = "clipboardReadWrite";
    PermissionType2["ClipboardSanitizedWrite"] = "clipboardSanitizedWrite";
    PermissionType2["DisplayCapture"] = "displayCapture";
    PermissionType2["DurableStorage"] = "durableStorage";
    PermissionType2["Geolocation"] = "geolocation";
    PermissionType2["HandTracking"] = "handTracking";
    PermissionType2["IdleDetection"] = "idleDetection";
    PermissionType2["KeyboardLock"] = "keyboardLock";
    PermissionType2["LocalFonts"] = "localFonts";
    PermissionType2["LocalNetwork"] = "localNetwork";
    PermissionType2["LocalNetworkAccess"] = "localNetworkAccess";
    PermissionType2["LoopbackNetwork"] = "loopbackNetwork";
    PermissionType2["Midi"] = "midi";
    PermissionType2["MidiSysex"] = "midiSysex";
    PermissionType2["Nfc"] = "nfc";
    PermissionType2["Notifications"] = "notifications";
    PermissionType2["PaymentHandler"] = "paymentHandler";
    PermissionType2["PeriodicBackgroundSync"] = "periodicBackgroundSync";
    PermissionType2["PointerLock"] = "pointerLock";
    PermissionType2["ProtectedMediaIdentifier"] = "protectedMediaIdentifier";
    PermissionType2["Sensors"] = "sensors";
    PermissionType2["SmartCard"] = "smartCard";
    PermissionType2["SpeakerSelection"] = "speakerSelection";
    PermissionType2["StorageAccess"] = "storageAccess";
    PermissionType2["TopLevelStorageAccess"] = "topLevelStorageAccess";
    PermissionType2["VideoCapture"] = "videoCapture";
    PermissionType2["Vr"] = "vr";
    PermissionType2["WakeLockScreen"] = "wakeLockScreen";
    PermissionType2["WakeLockSystem"] = "wakeLockSystem";
    PermissionType2["WebAppInstallation"] = "webAppInstallation";
    PermissionType2["WebPrinting"] = "webPrinting";
    PermissionType2["WindowManagement"] = "windowManagement";
  })(PermissionType = Browser2.PermissionType || (Browser2.PermissionType = {}));
  let PermissionSetting;
  ((PermissionSetting2) => {
    PermissionSetting2["Granted"] = "granted";
    PermissionSetting2["Denied"] = "denied";
    PermissionSetting2["Prompt"] = "prompt";
  })(PermissionSetting = Browser2.PermissionSetting || (Browser2.PermissionSetting = {}));
  let BrowserCommandId;
  ((BrowserCommandId2) => {
    BrowserCommandId2["OpenTabSearch"] = "openTabSearch";
    BrowserCommandId2["CloseTabSearch"] = "closeTabSearch";
    BrowserCommandId2["OpenGlic"] = "openGlic";
  })(BrowserCommandId = Browser2.BrowserCommandId || (Browser2.BrowserCommandId = {}));
  let SetDownloadBehaviorRequestBehavior;
  ((SetDownloadBehaviorRequestBehavior2) => {
    SetDownloadBehaviorRequestBehavior2["Deny"] = "deny";
    SetDownloadBehaviorRequestBehavior2["Allow"] = "allow";
    SetDownloadBehaviorRequestBehavior2["AllowAndName"] = "allowAndName";
    SetDownloadBehaviorRequestBehavior2["Default"] = "default";
  })(SetDownloadBehaviorRequestBehavior = Browser2.SetDownloadBehaviorRequestBehavior || (Browser2.SetDownloadBehaviorRequestBehavior = {}));
  let DownloadProgressEventState;
  ((DownloadProgressEventState2) => {
    DownloadProgressEventState2["InProgress"] = "inProgress";
    DownloadProgressEventState2["Completed"] = "completed";
    DownloadProgressEventState2["Canceled"] = "canceled";
  })(DownloadProgressEventState = Browser2.DownloadProgressEventState || (Browser2.DownloadProgressEventState = {}));
})(Browser || (Browser = {}));
var CSS;
((CSS2) => {
  let StyleSheetOrigin;
  ((StyleSheetOrigin2) => {
    StyleSheetOrigin2["Injected"] = "injected";
    StyleSheetOrigin2["UserAgent"] = "user-agent";
    StyleSheetOrigin2["Inspector"] = "inspector";
    StyleSheetOrigin2["Regular"] = "regular";
  })(StyleSheetOrigin = CSS2.StyleSheetOrigin || (CSS2.StyleSheetOrigin = {}));
  let CSSRuleType;
  ((CSSRuleType2) => {
    CSSRuleType2["MediaRule"] = "MediaRule";
    CSSRuleType2["SupportsRule"] = "SupportsRule";
    CSSRuleType2["ContainerRule"] = "ContainerRule";
    CSSRuleType2["LayerRule"] = "LayerRule";
    CSSRuleType2["ScopeRule"] = "ScopeRule";
    CSSRuleType2["StyleRule"] = "StyleRule";
    CSSRuleType2["StartingStyleRule"] = "StartingStyleRule";
    CSSRuleType2["NavigationRule"] = "NavigationRule";
  })(CSSRuleType = CSS2.CSSRuleType || (CSS2.CSSRuleType = {}));
  let CSSMediaSource;
  ((CSSMediaSource2) => {
    CSSMediaSource2["MediaRule"] = "mediaRule";
    CSSMediaSource2["ImportRule"] = "importRule";
    CSSMediaSource2["LinkedSheet"] = "linkedSheet";
    CSSMediaSource2["InlineSheet"] = "inlineSheet";
  })(CSSMediaSource = CSS2.CSSMediaSource || (CSS2.CSSMediaSource = {}));
  let CSSAtRuleType;
  ((CSSAtRuleType2) => {
    CSSAtRuleType2["FontFace"] = "font-face";
    CSSAtRuleType2["FontFeatureValues"] = "font-feature-values";
    CSSAtRuleType2["FontPaletteValues"] = "font-palette-values";
    CSSAtRuleType2["CounterStyle"] = "counter-style";
  })(CSSAtRuleType = CSS2.CSSAtRuleType || (CSS2.CSSAtRuleType = {}));
  let CSSAtRuleSubsection;
  ((CSSAtRuleSubsection2) => {
    CSSAtRuleSubsection2["Swash"] = "swash";
    CSSAtRuleSubsection2["Annotation"] = "annotation";
    CSSAtRuleSubsection2["Ornaments"] = "ornaments";
    CSSAtRuleSubsection2["Stylistic"] = "stylistic";
    CSSAtRuleSubsection2["Styleset"] = "styleset";
    CSSAtRuleSubsection2["CharacterVariant"] = "character-variant";
  })(CSSAtRuleSubsection = CSS2.CSSAtRuleSubsection || (CSS2.CSSAtRuleSubsection = {}));
})(CSS || (CSS = {}));
var CacheStorage;
((CacheStorage2) => {
  let CachedResponseType;
  ((CachedResponseType2) => {
    CachedResponseType2["Basic"] = "basic";
    CachedResponseType2["Cors"] = "cors";
    CachedResponseType2["Default"] = "default";
    CachedResponseType2["Error"] = "error";
    CachedResponseType2["OpaqueResponse"] = "opaqueResponse";
    CachedResponseType2["OpaqueRedirect"] = "opaqueRedirect";
  })(CachedResponseType = CacheStorage2.CachedResponseType || (CacheStorage2.CachedResponseType = {}));
})(CacheStorage || (CacheStorage = {}));
var DOM;
((DOM2) => {
  let PseudoType;
  ((PseudoType2) => {
    PseudoType2["FirstLine"] = "first-line";
    PseudoType2["FirstLetter"] = "first-letter";
    PseudoType2["Checkmark"] = "checkmark";
    PseudoType2["Before"] = "before";
    PseudoType2["After"] = "after";
    PseudoType2["ExpandIcon"] = "expand-icon";
    PseudoType2["PickerIcon"] = "picker-icon";
    PseudoType2["InterestButton"] = "interest-button";
    PseudoType2["Marker"] = "marker";
    PseudoType2["Backdrop"] = "backdrop";
    PseudoType2["Column"] = "column";
    PseudoType2["Selection"] = "selection";
    PseudoType2["SearchText"] = "search-text";
    PseudoType2["TargetText"] = "target-text";
    PseudoType2["SpellingError"] = "spelling-error";
    PseudoType2["GrammarError"] = "grammar-error";
    PseudoType2["Highlight"] = "highlight";
    PseudoType2["FirstLineInherited"] = "first-line-inherited";
    PseudoType2["ScrollMarker"] = "scroll-marker";
    PseudoType2["ScrollMarkerGroup"] = "scroll-marker-group";
    PseudoType2["ScrollButton"] = "scroll-button";
    PseudoType2["Scrollbar"] = "scrollbar";
    PseudoType2["ScrollbarThumb"] = "scrollbar-thumb";
    PseudoType2["ScrollbarButton"] = "scrollbar-button";
    PseudoType2["ScrollbarTrack"] = "scrollbar-track";
    PseudoType2["ScrollbarTrackPiece"] = "scrollbar-track-piece";
    PseudoType2["ScrollbarCorner"] = "scrollbar-corner";
    PseudoType2["Resizer"] = "resizer";
    PseudoType2["InputListButton"] = "input-list-button";
    PseudoType2["ViewTransition"] = "view-transition";
    PseudoType2["ViewTransitionGroup"] = "view-transition-group";
    PseudoType2["ViewTransitionImagePair"] = "view-transition-image-pair";
    PseudoType2["ViewTransitionGroupChildren"] = "view-transition-group-children";
    PseudoType2["ViewTransitionOld"] = "view-transition-old";
    PseudoType2["ViewTransitionNew"] = "view-transition-new";
    PseudoType2["Placeholder"] = "placeholder";
    PseudoType2["FileSelectorButton"] = "file-selector-button";
    PseudoType2["DetailsContent"] = "details-content";
    PseudoType2["Picker"] = "picker";
    PseudoType2["SelectListbox"] = "select-listbox";
    PseudoType2["PermissionIcon"] = "permission-icon";
    PseudoType2["OverscrollAreaParent"] = "overscroll-area-parent";
    PseudoType2["OverscrollBackdrop"] = "overscroll-backdrop";
    PseudoType2["Skeleton"] = "skeleton";
  })(PseudoType = DOM2.PseudoType || (DOM2.PseudoType = {}));
  let ShadowRootType;
  ((ShadowRootType2) => {
    ShadowRootType2["UserAgent"] = "user-agent";
    ShadowRootType2["Open"] = "open";
    ShadowRootType2["Closed"] = "closed";
  })(ShadowRootType = DOM2.ShadowRootType || (DOM2.ShadowRootType = {}));
  let CompatibilityMode;
  ((CompatibilityMode2) => {
    CompatibilityMode2["QuirksMode"] = "QuirksMode";
    CompatibilityMode2["LimitedQuirksMode"] = "LimitedQuirksMode";
    CompatibilityMode2["NoQuirksMode"] = "NoQuirksMode";
  })(CompatibilityMode = DOM2.CompatibilityMode || (DOM2.CompatibilityMode = {}));
  let PhysicalAxes;
  ((PhysicalAxes2) => {
    PhysicalAxes2["Horizontal"] = "Horizontal";
    PhysicalAxes2["Vertical"] = "Vertical";
    PhysicalAxes2["Both"] = "Both";
  })(PhysicalAxes = DOM2.PhysicalAxes || (DOM2.PhysicalAxes = {}));
  let LogicalAxes;
  ((LogicalAxes2) => {
    LogicalAxes2["Inline"] = "Inline";
    LogicalAxes2["Block"] = "Block";
    LogicalAxes2["Both"] = "Both";
  })(LogicalAxes = DOM2.LogicalAxes || (DOM2.LogicalAxes = {}));
  let ScrollOrientation;
  ((ScrollOrientation2) => {
    ScrollOrientation2["Horizontal"] = "horizontal";
    ScrollOrientation2["Vertical"] = "vertical";
  })(ScrollOrientation = DOM2.ScrollOrientation || (DOM2.ScrollOrientation = {}));
  let EnableRequestIncludeWhitespace;
  ((EnableRequestIncludeWhitespace2) => {
    EnableRequestIncludeWhitespace2["None"] = "none";
    EnableRequestIncludeWhitespace2["All"] = "all";
  })(EnableRequestIncludeWhitespace = DOM2.EnableRequestIncludeWhitespace || (DOM2.EnableRequestIncludeWhitespace = {}));
  let GetElementByRelationRequestRelation;
  ((GetElementByRelationRequestRelation2) => {
    GetElementByRelationRequestRelation2["PopoverTarget"] = "PopoverTarget";
    GetElementByRelationRequestRelation2["InterestTarget"] = "InterestTarget";
    GetElementByRelationRequestRelation2["CommandFor"] = "CommandFor";
  })(GetElementByRelationRequestRelation = DOM2.GetElementByRelationRequestRelation || (DOM2.GetElementByRelationRequestRelation = {}));
})(DOM || (DOM = {}));
var DOMDebugger;
((DOMDebugger2) => {
  let DOMBreakpointType;
  ((DOMBreakpointType2) => {
    DOMBreakpointType2["SubtreeModified"] = "subtree-modified";
    DOMBreakpointType2["AttributeModified"] = "attribute-modified";
    DOMBreakpointType2["NodeRemoved"] = "node-removed";
  })(DOMBreakpointType = DOMDebugger2.DOMBreakpointType || (DOMDebugger2.DOMBreakpointType = {}));
  let CSPViolationType;
  ((CSPViolationType2) => {
    CSPViolationType2["TrustedtypeSinkViolation"] = "trustedtype-sink-violation";
    CSPViolationType2["TrustedtypePolicyViolation"] = "trustedtype-policy-violation";
  })(CSPViolationType = DOMDebugger2.CSPViolationType || (DOMDebugger2.CSPViolationType = {}));
})(DOMDebugger || (DOMDebugger = {}));
var DigitalCredentials;
((DigitalCredentials2) => {
  let VirtualWalletAction;
  ((VirtualWalletAction2) => {
    VirtualWalletAction2["Respond"] = "respond";
    VirtualWalletAction2["Decline"] = "decline";
    VirtualWalletAction2["Wait"] = "wait";
    VirtualWalletAction2["Clear"] = "clear";
  })(VirtualWalletAction = DigitalCredentials2.VirtualWalletAction || (DigitalCredentials2.VirtualWalletAction = {}));
})(DigitalCredentials || (DigitalCredentials = {}));
var Emulation;
((Emulation2) => {
  let ScreenOrientationType;
  ((ScreenOrientationType2) => {
    ScreenOrientationType2["PortraitPrimary"] = "portraitPrimary";
    ScreenOrientationType2["PortraitSecondary"] = "portraitSecondary";
    ScreenOrientationType2["LandscapePrimary"] = "landscapePrimary";
    ScreenOrientationType2["LandscapeSecondary"] = "landscapeSecondary";
  })(ScreenOrientationType = Emulation2.ScreenOrientationType || (Emulation2.ScreenOrientationType = {}));
  let DisplayFeatureOrientation;
  ((DisplayFeatureOrientation2) => {
    DisplayFeatureOrientation2["Vertical"] = "vertical";
    DisplayFeatureOrientation2["Horizontal"] = "horizontal";
  })(DisplayFeatureOrientation = Emulation2.DisplayFeatureOrientation || (Emulation2.DisplayFeatureOrientation = {}));
  let DevicePostureType;
  ((DevicePostureType2) => {
    DevicePostureType2["Continuous"] = "continuous";
    DevicePostureType2["Folded"] = "folded";
  })(DevicePostureType = Emulation2.DevicePostureType || (Emulation2.DevicePostureType = {}));
  let VirtualTimePolicy;
  ((VirtualTimePolicy2) => {
    VirtualTimePolicy2["Advance"] = "advance";
    VirtualTimePolicy2["Pause"] = "pause";
    VirtualTimePolicy2["PauseIfNetworkFetchesPending"] = "pauseIfNetworkFetchesPending";
  })(VirtualTimePolicy = Emulation2.VirtualTimePolicy || (Emulation2.VirtualTimePolicy = {}));
  let SensorType;
  ((SensorType2) => {
    SensorType2["AbsoluteOrientation"] = "absolute-orientation";
    SensorType2["Accelerometer"] = "accelerometer";
    SensorType2["AmbientLight"] = "ambient-light";
    SensorType2["Gravity"] = "gravity";
    SensorType2["Gyroscope"] = "gyroscope";
    SensorType2["LinearAcceleration"] = "linear-acceleration";
    SensorType2["Magnetometer"] = "magnetometer";
    SensorType2["RelativeOrientation"] = "relative-orientation";
  })(SensorType = Emulation2.SensorType || (Emulation2.SensorType = {}));
  let PressureSource;
  ((PressureSource2) => {
    PressureSource2["Cpu"] = "cpu";
  })(PressureSource = Emulation2.PressureSource || (Emulation2.PressureSource = {}));
  let PressureState;
  ((PressureState2) => {
    PressureState2["Nominal"] = "nominal";
    PressureState2["Fair"] = "fair";
    PressureState2["Serious"] = "serious";
    PressureState2["Critical"] = "critical";
  })(PressureState = Emulation2.PressureState || (Emulation2.PressureState = {}));
  let DisabledImageType;
  ((DisabledImageType2) => {
    DisabledImageType2["Avif"] = "avif";
    DisabledImageType2["Jxl"] = "jxl";
    DisabledImageType2["Webp"] = "webp";
  })(DisabledImageType = Emulation2.DisabledImageType || (Emulation2.DisabledImageType = {}));
  let SetDeviceMetricsOverrideRequestScrollbarType;
  ((SetDeviceMetricsOverrideRequestScrollbarType2) => {
    SetDeviceMetricsOverrideRequestScrollbarType2["Overlay"] = "overlay";
    SetDeviceMetricsOverrideRequestScrollbarType2["Default"] = "default";
  })(SetDeviceMetricsOverrideRequestScrollbarType = Emulation2.SetDeviceMetricsOverrideRequestScrollbarType || (Emulation2.SetDeviceMetricsOverrideRequestScrollbarType = {}));
  let SetDeviceMetricsOverrideRequestViewportMeta;
  ((SetDeviceMetricsOverrideRequestViewportMeta2) => {
    SetDeviceMetricsOverrideRequestViewportMeta2["Enable"] = "enable";
    SetDeviceMetricsOverrideRequestViewportMeta2["Default"] = "default";
  })(SetDeviceMetricsOverrideRequestViewportMeta = Emulation2.SetDeviceMetricsOverrideRequestViewportMeta || (Emulation2.SetDeviceMetricsOverrideRequestViewportMeta = {}));
  let SetEmitTouchEventsForMouseRequestConfiguration;
  ((SetEmitTouchEventsForMouseRequestConfiguration2) => {
    SetEmitTouchEventsForMouseRequestConfiguration2["Mobile"] = "mobile";
    SetEmitTouchEventsForMouseRequestConfiguration2["Desktop"] = "desktop";
  })(SetEmitTouchEventsForMouseRequestConfiguration = Emulation2.SetEmitTouchEventsForMouseRequestConfiguration || (Emulation2.SetEmitTouchEventsForMouseRequestConfiguration = {}));
  let SetEmulatedVisionDeficiencyRequestType;
  ((SetEmulatedVisionDeficiencyRequestType2) => {
    SetEmulatedVisionDeficiencyRequestType2["None"] = "none";
    SetEmulatedVisionDeficiencyRequestType2["BlurredVision"] = "blurredVision";
    SetEmulatedVisionDeficiencyRequestType2["ReducedContrast"] = "reducedContrast";
    SetEmulatedVisionDeficiencyRequestType2["Achromatopsia"] = "achromatopsia";
    SetEmulatedVisionDeficiencyRequestType2["Deuteranopia"] = "deuteranopia";
    SetEmulatedVisionDeficiencyRequestType2["Protanopia"] = "protanopia";
    SetEmulatedVisionDeficiencyRequestType2["Tritanopia"] = "tritanopia";
  })(SetEmulatedVisionDeficiencyRequestType = Emulation2.SetEmulatedVisionDeficiencyRequestType || (Emulation2.SetEmulatedVisionDeficiencyRequestType = {}));
  let SetCPUPerformanceOverrideRequestPerformanceTier;
  ((SetCPUPerformanceOverrideRequestPerformanceTier2) => {
    SetCPUPerformanceOverrideRequestPerformanceTier2["Unknown"] = "unknown";
    SetCPUPerformanceOverrideRequestPerformanceTier2["Low"] = "low";
    SetCPUPerformanceOverrideRequestPerformanceTier2["Mid"] = "mid";
    SetCPUPerformanceOverrideRequestPerformanceTier2["High"] = "high";
    SetCPUPerformanceOverrideRequestPerformanceTier2["Ultra"] = "ultra";
  })(SetCPUPerformanceOverrideRequestPerformanceTier = Emulation2.SetCPUPerformanceOverrideRequestPerformanceTier || (Emulation2.SetCPUPerformanceOverrideRequestPerformanceTier = {}));
})(Emulation || (Emulation = {}));
var Extensions;
((Extensions2) => {
  let StorageArea;
  ((StorageArea2) => {
    StorageArea2["Session"] = "session";
    StorageArea2["Local"] = "local";
    StorageArea2["Sync"] = "sync";
    StorageArea2["Managed"] = "managed";
  })(StorageArea = Extensions2.StorageArea || (Extensions2.StorageArea = {}));
})(Extensions || (Extensions = {}));
var FedCm;
((FedCm2) => {
  let LoginState;
  ((LoginState2) => {
    LoginState2["SignIn"] = "SignIn";
    LoginState2["SignUp"] = "SignUp";
  })(LoginState = FedCm2.LoginState || (FedCm2.LoginState = {}));
  let DialogType;
  ((DialogType2) => {
    DialogType2["AccountChooser"] = "AccountChooser";
    DialogType2["AutoReauthn"] = "AutoReauthn";
    DialogType2["ConfirmIdpLogin"] = "ConfirmIdpLogin";
    DialogType2["Error"] = "Error";
  })(DialogType = FedCm2.DialogType || (FedCm2.DialogType = {}));
  let DialogButton;
  ((DialogButton2) => {
    DialogButton2["ConfirmIdpLoginContinue"] = "ConfirmIdpLoginContinue";
    DialogButton2["ErrorGotIt"] = "ErrorGotIt";
    DialogButton2["ErrorMoreDetails"] = "ErrorMoreDetails";
  })(DialogButton = FedCm2.DialogButton || (FedCm2.DialogButton = {}));
  let AccountUrlType;
  ((AccountUrlType2) => {
    AccountUrlType2["TermsOfService"] = "TermsOfService";
    AccountUrlType2["PrivacyPolicy"] = "PrivacyPolicy";
  })(AccountUrlType = FedCm2.AccountUrlType || (FedCm2.AccountUrlType = {}));
})(FedCm || (FedCm = {}));
var Fetch;
((Fetch2) => {
  let RequestStage;
  ((RequestStage2) => {
    RequestStage2["Request"] = "Request";
    RequestStage2["Response"] = "Response";
  })(RequestStage = Fetch2.RequestStage || (Fetch2.RequestStage = {}));
  let AuthChallengeSource;
  ((AuthChallengeSource2) => {
    AuthChallengeSource2["Server"] = "Server";
    AuthChallengeSource2["Proxy"] = "Proxy";
  })(AuthChallengeSource = Fetch2.AuthChallengeSource || (Fetch2.AuthChallengeSource = {}));
  let AuthChallengeResponseResponse;
  ((AuthChallengeResponseResponse2) => {
    AuthChallengeResponseResponse2["Default"] = "Default";
    AuthChallengeResponseResponse2["CancelAuth"] = "CancelAuth";
    AuthChallengeResponseResponse2["ProvideCredentials"] = "ProvideCredentials";
  })(AuthChallengeResponseResponse = Fetch2.AuthChallengeResponseResponse || (Fetch2.AuthChallengeResponseResponse = {}));
})(Fetch || (Fetch = {}));
var HeadlessExperimental;
((HeadlessExperimental2) => {
  let ScreenshotParamsFormat;
  ((ScreenshotParamsFormat2) => {
    ScreenshotParamsFormat2["Jpeg"] = "jpeg";
    ScreenshotParamsFormat2["Png"] = "png";
    ScreenshotParamsFormat2["Webp"] = "webp";
  })(ScreenshotParamsFormat = HeadlessExperimental2.ScreenshotParamsFormat || (HeadlessExperimental2.ScreenshotParamsFormat = {}));
})(HeadlessExperimental || (HeadlessExperimental = {}));
var IndexedDB;
((IndexedDB2) => {
  let KeyType;
  ((KeyType2) => {
    KeyType2["Number"] = "number";
    KeyType2["String"] = "string";
    KeyType2["Date"] = "date";
    KeyType2["Array"] = "array";
  })(KeyType = IndexedDB2.KeyType || (IndexedDB2.KeyType = {}));
  let KeyPathType;
  ((KeyPathType2) => {
    KeyPathType2["Null"] = "null";
    KeyPathType2["String"] = "string";
    KeyPathType2["Array"] = "array";
  })(KeyPathType = IndexedDB2.KeyPathType || (IndexedDB2.KeyPathType = {}));
})(IndexedDB || (IndexedDB = {}));
var Input;
((Input2) => {
  let GestureSourceType;
  ((GestureSourceType2) => {
    GestureSourceType2["Default"] = "default";
    GestureSourceType2["Touch"] = "touch";
    GestureSourceType2["Mouse"] = "mouse";
  })(GestureSourceType = Input2.GestureSourceType || (Input2.GestureSourceType = {}));
  let MouseButton;
  ((MouseButton2) => {
    MouseButton2["None"] = "none";
    MouseButton2["Left"] = "left";
    MouseButton2["Middle"] = "middle";
    MouseButton2["Right"] = "right";
    MouseButton2["Back"] = "back";
    MouseButton2["Forward"] = "forward";
  })(MouseButton = Input2.MouseButton || (Input2.MouseButton = {}));
  let DispatchDragEventRequestType;
  ((DispatchDragEventRequestType2) => {
    DispatchDragEventRequestType2["DragEnter"] = "dragEnter";
    DispatchDragEventRequestType2["DragOver"] = "dragOver";
    DispatchDragEventRequestType2["Drop"] = "drop";
    DispatchDragEventRequestType2["DragCancel"] = "dragCancel";
  })(DispatchDragEventRequestType = Input2.DispatchDragEventRequestType || (Input2.DispatchDragEventRequestType = {}));
  let DispatchKeyEventRequestType;
  ((DispatchKeyEventRequestType2) => {
    DispatchKeyEventRequestType2["KeyDown"] = "keyDown";
    DispatchKeyEventRequestType2["KeyUp"] = "keyUp";
    DispatchKeyEventRequestType2["RawKeyDown"] = "rawKeyDown";
    DispatchKeyEventRequestType2["Char"] = "char";
  })(DispatchKeyEventRequestType = Input2.DispatchKeyEventRequestType || (Input2.DispatchKeyEventRequestType = {}));
  let DispatchMouseEventRequestType;
  ((DispatchMouseEventRequestType2) => {
    DispatchMouseEventRequestType2["MousePressed"] = "mousePressed";
    DispatchMouseEventRequestType2["MouseReleased"] = "mouseReleased";
    DispatchMouseEventRequestType2["MouseMoved"] = "mouseMoved";
    DispatchMouseEventRequestType2["MouseWheel"] = "mouseWheel";
  })(DispatchMouseEventRequestType = Input2.DispatchMouseEventRequestType || (Input2.DispatchMouseEventRequestType = {}));
  let DispatchMouseEventRequestPointerType;
  ((DispatchMouseEventRequestPointerType2) => {
    DispatchMouseEventRequestPointerType2["Mouse"] = "mouse";
    DispatchMouseEventRequestPointerType2["Pen"] = "pen";
  })(DispatchMouseEventRequestPointerType = Input2.DispatchMouseEventRequestPointerType || (Input2.DispatchMouseEventRequestPointerType = {}));
  let DispatchTouchEventRequestType;
  ((DispatchTouchEventRequestType2) => {
    DispatchTouchEventRequestType2["TouchStart"] = "touchStart";
    DispatchTouchEventRequestType2["TouchEnd"] = "touchEnd";
    DispatchTouchEventRequestType2["TouchMove"] = "touchMove";
    DispatchTouchEventRequestType2["TouchCancel"] = "touchCancel";
  })(DispatchTouchEventRequestType = Input2.DispatchTouchEventRequestType || (Input2.DispatchTouchEventRequestType = {}));
  let EmulateTouchFromMouseEventRequestType;
  ((EmulateTouchFromMouseEventRequestType2) => {
    EmulateTouchFromMouseEventRequestType2["MousePressed"] = "mousePressed";
    EmulateTouchFromMouseEventRequestType2["MouseReleased"] = "mouseReleased";
    EmulateTouchFromMouseEventRequestType2["MouseMoved"] = "mouseMoved";
    EmulateTouchFromMouseEventRequestType2["MouseWheel"] = "mouseWheel";
  })(EmulateTouchFromMouseEventRequestType = Input2.EmulateTouchFromMouseEventRequestType || (Input2.EmulateTouchFromMouseEventRequestType = {}));
})(Input || (Input = {}));
var LayerTree;
((LayerTree2) => {
  let ScrollRectType;
  ((ScrollRectType2) => {
    ScrollRectType2["RepaintsOnScroll"] = "RepaintsOnScroll";
    ScrollRectType2["TouchEventHandler"] = "TouchEventHandler";
    ScrollRectType2["WheelEventHandler"] = "WheelEventHandler";
  })(ScrollRectType = LayerTree2.ScrollRectType || (LayerTree2.ScrollRectType = {}));
})(LayerTree || (LayerTree = {}));
var Log;
((Log2) => {
  let LogEntrySource;
  ((LogEntrySource2) => {
    LogEntrySource2["XML"] = "xml";
    LogEntrySource2["Javascript"] = "javascript";
    LogEntrySource2["Network"] = "network";
    LogEntrySource2["Storage"] = "storage";
    LogEntrySource2["Appcache"] = "appcache";
    LogEntrySource2["Rendering"] = "rendering";
    LogEntrySource2["Security"] = "security";
    LogEntrySource2["Deprecation"] = "deprecation";
    LogEntrySource2["Worker"] = "worker";
    LogEntrySource2["Violation"] = "violation";
    LogEntrySource2["Intervention"] = "intervention";
    LogEntrySource2["Recommendation"] = "recommendation";
    LogEntrySource2["Other"] = "other";
  })(LogEntrySource = Log2.LogEntrySource || (Log2.LogEntrySource = {}));
  let LogEntryLevel;
  ((LogEntryLevel2) => {
    LogEntryLevel2["Verbose"] = "verbose";
    LogEntryLevel2["Info"] = "info";
    LogEntryLevel2["Warning"] = "warning";
    LogEntryLevel2["Error"] = "error";
  })(LogEntryLevel = Log2.LogEntryLevel || (Log2.LogEntryLevel = {}));
  let LogEntryCategory;
  ((LogEntryCategory2) => {
    LogEntryCategory2["Cors"] = "cors";
  })(LogEntryCategory = Log2.LogEntryCategory || (Log2.LogEntryCategory = {}));
  let ViolationSettingName;
  ((ViolationSettingName2) => {
    ViolationSettingName2["LongTask"] = "longTask";
    ViolationSettingName2["LongLayout"] = "longLayout";
    ViolationSettingName2["BlockedEvent"] = "blockedEvent";
    ViolationSettingName2["BlockedParser"] = "blockedParser";
    ViolationSettingName2["DiscouragedAPIUse"] = "discouragedAPIUse";
    ViolationSettingName2["Handler"] = "handler";
    ViolationSettingName2["RecurringHandler"] = "recurringHandler";
  })(ViolationSettingName = Log2.ViolationSettingName || (Log2.ViolationSettingName = {}));
})(Log || (Log = {}));
var Media;
((Media2) => {
  let PlayerMessageLevel;
  ((PlayerMessageLevel2) => {
    PlayerMessageLevel2["Error"] = "error";
    PlayerMessageLevel2["Warning"] = "warning";
    PlayerMessageLevel2["Info"] = "info";
    PlayerMessageLevel2["Debug"] = "debug";
  })(PlayerMessageLevel = Media2.PlayerMessageLevel || (Media2.PlayerMessageLevel = {}));
})(Media || (Media = {}));
var Memory;
((Memory2) => {
  let PressureLevel;
  ((PressureLevel2) => {
    PressureLevel2["Moderate"] = "moderate";
    PressureLevel2["Critical"] = "critical";
  })(PressureLevel = Memory2.PressureLevel || (Memory2.PressureLevel = {}));
})(Memory || (Memory = {}));
var Network;
((Network2) => {
  let ResourceType;
  ((ResourceType2) => {
    ResourceType2["Document"] = "Document";
    ResourceType2["Stylesheet"] = "Stylesheet";
    ResourceType2["Image"] = "Image";
    ResourceType2["Media"] = "Media";
    ResourceType2["Font"] = "Font";
    ResourceType2["Script"] = "Script";
    ResourceType2["TextTrack"] = "TextTrack";
    ResourceType2["XHR"] = "XHR";
    ResourceType2["Fetch"] = "Fetch";
    ResourceType2["Prefetch"] = "Prefetch";
    ResourceType2["EventSource"] = "EventSource";
    ResourceType2["WebSocket"] = "WebSocket";
    ResourceType2["Manifest"] = "Manifest";
    ResourceType2["SignedExchange"] = "SignedExchange";
    ResourceType2["Ping"] = "Ping";
    ResourceType2["CSPViolationReport"] = "CSPViolationReport";
    ResourceType2["Preflight"] = "Preflight";
    ResourceType2["FedCM"] = "FedCM";
    ResourceType2["Other"] = "Other";
  })(ResourceType = Network2.ResourceType || (Network2.ResourceType = {}));
  let ErrorReason;
  ((ErrorReason2) => {
    ErrorReason2["Failed"] = "Failed";
    ErrorReason2["Aborted"] = "Aborted";
    ErrorReason2["TimedOut"] = "TimedOut";
    ErrorReason2["AccessDenied"] = "AccessDenied";
    ErrorReason2["ConnectionClosed"] = "ConnectionClosed";
    ErrorReason2["ConnectionReset"] = "ConnectionReset";
    ErrorReason2["ConnectionRefused"] = "ConnectionRefused";
    ErrorReason2["ConnectionAborted"] = "ConnectionAborted";
    ErrorReason2["ConnectionFailed"] = "ConnectionFailed";
    ErrorReason2["NameNotResolved"] = "NameNotResolved";
    ErrorReason2["InternetDisconnected"] = "InternetDisconnected";
    ErrorReason2["AddressUnreachable"] = "AddressUnreachable";
    ErrorReason2["BlockedByClient"] = "BlockedByClient";
    ErrorReason2["BlockedByResponse"] = "BlockedByResponse";
  })(ErrorReason = Network2.ErrorReason || (Network2.ErrorReason = {}));
  let ConnectionType;
  ((ConnectionType2) => {
    ConnectionType2["None"] = "none";
    ConnectionType2["Cellular2g"] = "cellular2g";
    ConnectionType2["Cellular3g"] = "cellular3g";
    ConnectionType2["Cellular4g"] = "cellular4g";
    ConnectionType2["Bluetooth"] = "bluetooth";
    ConnectionType2["Ethernet"] = "ethernet";
    ConnectionType2["Wifi"] = "wifi";
    ConnectionType2["Wimax"] = "wimax";
    ConnectionType2["Other"] = "other";
  })(ConnectionType = Network2.ConnectionType || (Network2.ConnectionType = {}));
  let CookieSameSite;
  ((CookieSameSite2) => {
    CookieSameSite2["Strict"] = "Strict";
    CookieSameSite2["Lax"] = "Lax";
    CookieSameSite2["None"] = "None";
  })(CookieSameSite = Network2.CookieSameSite || (Network2.CookieSameSite = {}));
  let CookiePriority;
  ((CookiePriority2) => {
    CookiePriority2["Low"] = "Low";
    CookiePriority2["Medium"] = "Medium";
    CookiePriority2["High"] = "High";
  })(CookiePriority = Network2.CookiePriority || (Network2.CookiePriority = {}));
  let CookieSourceScheme;
  ((CookieSourceScheme2) => {
    CookieSourceScheme2["Unset"] = "Unset";
    CookieSourceScheme2["NonSecure"] = "NonSecure";
    CookieSourceScheme2["Secure"] = "Secure";
  })(CookieSourceScheme = Network2.CookieSourceScheme || (Network2.CookieSourceScheme = {}));
  let ResourcePriority;
  ((ResourcePriority2) => {
    ResourcePriority2["VeryLow"] = "VeryLow";
    ResourcePriority2["Low"] = "Low";
    ResourcePriority2["Medium"] = "Medium";
    ResourcePriority2["High"] = "High";
    ResourcePriority2["VeryHigh"] = "VeryHigh";
  })(ResourcePriority = Network2.ResourcePriority || (Network2.ResourcePriority = {}));
  let RenderBlockingBehavior;
  ((RenderBlockingBehavior2) => {
    RenderBlockingBehavior2["Blocking"] = "Blocking";
    RenderBlockingBehavior2["InBodyParserBlocking"] = "InBodyParserBlocking";
    RenderBlockingBehavior2["NonBlocking"] = "NonBlocking";
    RenderBlockingBehavior2["NonBlockingDynamic"] = "NonBlockingDynamic";
    RenderBlockingBehavior2["PotentiallyBlocking"] = "PotentiallyBlocking";
  })(RenderBlockingBehavior = Network2.RenderBlockingBehavior || (Network2.RenderBlockingBehavior = {}));
  let RequestReferrerPolicy;
  ((RequestReferrerPolicy2) => {
    RequestReferrerPolicy2["UnsafeUrl"] = "unsafe-url";
    RequestReferrerPolicy2["NoReferrerWhenDowngrade"] = "no-referrer-when-downgrade";
    RequestReferrerPolicy2["NoReferrer"] = "no-referrer";
    RequestReferrerPolicy2["Origin"] = "origin";
    RequestReferrerPolicy2["OriginWhenCrossOrigin"] = "origin-when-cross-origin";
    RequestReferrerPolicy2["SameOrigin"] = "same-origin";
    RequestReferrerPolicy2["StrictOrigin"] = "strict-origin";
    RequestReferrerPolicy2["StrictOriginWhenCrossOrigin"] = "strict-origin-when-cross-origin";
  })(RequestReferrerPolicy = Network2.RequestReferrerPolicy || (Network2.RequestReferrerPolicy = {}));
  let CertificateTransparencyCompliance;
  ((CertificateTransparencyCompliance2) => {
    CertificateTransparencyCompliance2["Unknown"] = "unknown";
    CertificateTransparencyCompliance2["NotCompliant"] = "not-compliant";
    CertificateTransparencyCompliance2["Compliant"] = "compliant";
  })(CertificateTransparencyCompliance = Network2.CertificateTransparencyCompliance || (Network2.CertificateTransparencyCompliance = {}));
  let BlockedReason;
  ((BlockedReason2) => {
    BlockedReason2["Other"] = "other";
    BlockedReason2["Csp"] = "csp";
    BlockedReason2["MixedContent"] = "mixed-content";
    BlockedReason2["Origin"] = "origin";
    BlockedReason2["Inspector"] = "inspector";
    BlockedReason2["Integrity"] = "integrity";
    BlockedReason2["SubresourceFilter"] = "subresource-filter";
    BlockedReason2["ContentType"] = "content-type";
    BlockedReason2["CoepFrameResourceNeedsCoepHeader"] = "coep-frame-resource-needs-coep-header";
    BlockedReason2["CoopSandboxedIframeCannotNavigateToCoopPage"] = "coop-sandboxed-iframe-cannot-navigate-to-coop-page";
    BlockedReason2["CorpNotSameOrigin"] = "corp-not-same-origin";
    BlockedReason2["CorpNotSameOriginAfterDefaultedToSameOriginByCoep"] = "corp-not-same-origin-after-defaulted-to-same-origin-by-coep";
    BlockedReason2["CorpNotSameOriginAfterDefaultedToSameOriginByDip"] = "corp-not-same-origin-after-defaulted-to-same-origin-by-dip";
    BlockedReason2["CorpNotSameOriginAfterDefaultedToSameOriginByCoepAndDip"] = "corp-not-same-origin-after-defaulted-to-same-origin-by-coep-and-dip";
    BlockedReason2["CorpNotSameSite"] = "corp-not-same-site";
    BlockedReason2["SriMessageSignatureMismatch"] = "sri-message-signature-mismatch";
  })(BlockedReason = Network2.BlockedReason || (Network2.BlockedReason = {}));
  let CorsError;
  ((CorsError2) => {
    CorsError2["DisallowedByMode"] = "DisallowedByMode";
    CorsError2["InvalidResponse"] = "InvalidResponse";
    CorsError2["WildcardOriginNotAllowed"] = "WildcardOriginNotAllowed";
    CorsError2["MissingAllowOriginHeader"] = "MissingAllowOriginHeader";
    CorsError2["MultipleAllowOriginValues"] = "MultipleAllowOriginValues";
    CorsError2["InvalidAllowOriginValue"] = "InvalidAllowOriginValue";
    CorsError2["AllowOriginMismatch"] = "AllowOriginMismatch";
    CorsError2["InvalidAllowCredentials"] = "InvalidAllowCredentials";
    CorsError2["CorsDisabledScheme"] = "CorsDisabledScheme";
    CorsError2["PreflightInvalidStatus"] = "PreflightInvalidStatus";
    CorsError2["PreflightDisallowedRedirect"] = "PreflightDisallowedRedirect";
    CorsError2["PreflightWildcardOriginNotAllowed"] = "PreflightWildcardOriginNotAllowed";
    CorsError2["PreflightMissingAllowOriginHeader"] = "PreflightMissingAllowOriginHeader";
    CorsError2["PreflightMultipleAllowOriginValues"] = "PreflightMultipleAllowOriginValues";
    CorsError2["PreflightInvalidAllowOriginValue"] = "PreflightInvalidAllowOriginValue";
    CorsError2["PreflightAllowOriginMismatch"] = "PreflightAllowOriginMismatch";
    CorsError2["PreflightInvalidAllowCredentials"] = "PreflightInvalidAllowCredentials";
    CorsError2["PreflightMissingAllowExternal"] = "PreflightMissingAllowExternal";
    CorsError2["PreflightInvalidAllowExternal"] = "PreflightInvalidAllowExternal";
    CorsError2["InvalidAllowMethodsPreflightResponse"] = "InvalidAllowMethodsPreflightResponse";
    CorsError2["InvalidAllowHeadersPreflightResponse"] = "InvalidAllowHeadersPreflightResponse";
    CorsError2["MethodDisallowedByPreflightResponse"] = "MethodDisallowedByPreflightResponse";
    CorsError2["HeaderDisallowedByPreflightResponse"] = "HeaderDisallowedByPreflightResponse";
    CorsError2["RedirectContainsCredentials"] = "RedirectContainsCredentials";
    CorsError2["InsecureLocalNetwork"] = "InsecureLocalNetwork";
    CorsError2["InvalidLocalNetworkAccess"] = "InvalidLocalNetworkAccess";
    CorsError2["NoCorsRedirectModeNotFollow"] = "NoCorsRedirectModeNotFollow";
    CorsError2["LocalNetworkAccessPermissionDenied"] = "LocalNetworkAccessPermissionDenied";
  })(CorsError = Network2.CorsError || (Network2.CorsError = {}));
  let ServiceWorkerResponseSource;
  ((ServiceWorkerResponseSource2) => {
    ServiceWorkerResponseSource2["CacheStorage"] = "cache-storage";
    ServiceWorkerResponseSource2["HttpCache"] = "http-cache";
    ServiceWorkerResponseSource2["FallbackCode"] = "fallback-code";
    ServiceWorkerResponseSource2["Network"] = "network";
  })(ServiceWorkerResponseSource = Network2.ServiceWorkerResponseSource || (Network2.ServiceWorkerResponseSource = {}));
  let TrustTokenParamsRefreshPolicy;
  ((TrustTokenParamsRefreshPolicy2) => {
    TrustTokenParamsRefreshPolicy2["UseCached"] = "UseCached";
    TrustTokenParamsRefreshPolicy2["Refresh"] = "Refresh";
  })(TrustTokenParamsRefreshPolicy = Network2.TrustTokenParamsRefreshPolicy || (Network2.TrustTokenParamsRefreshPolicy = {}));
  let TrustTokenOperationType;
  ((TrustTokenOperationType2) => {
    TrustTokenOperationType2["Issuance"] = "Issuance";
    TrustTokenOperationType2["Redemption"] = "Redemption";
    TrustTokenOperationType2["Signing"] = "Signing";
  })(TrustTokenOperationType = Network2.TrustTokenOperationType || (Network2.TrustTokenOperationType = {}));
  let AlternateProtocolUsage;
  ((AlternateProtocolUsage2) => {
    AlternateProtocolUsage2["AlternativeJobWonWithoutRace"] = "alternativeJobWonWithoutRace";
    AlternateProtocolUsage2["AlternativeJobWonRace"] = "alternativeJobWonRace";
    AlternateProtocolUsage2["MainJobWonRace"] = "mainJobWonRace";
    AlternateProtocolUsage2["MappingMissing"] = "mappingMissing";
    AlternateProtocolUsage2["Broken"] = "broken";
    AlternateProtocolUsage2["DnsAlpnH3JobWonWithoutRace"] = "dnsAlpnH3JobWonWithoutRace";
    AlternateProtocolUsage2["DnsAlpnH3JobWonRace"] = "dnsAlpnH3JobWonRace";
    AlternateProtocolUsage2["UnspecifiedReason"] = "unspecifiedReason";
  })(AlternateProtocolUsage = Network2.AlternateProtocolUsage || (Network2.AlternateProtocolUsage = {}));
  let ServiceWorkerRouterSource;
  ((ServiceWorkerRouterSource2) => {
    ServiceWorkerRouterSource2["Network"] = "network";
    ServiceWorkerRouterSource2["Cache"] = "cache";
    ServiceWorkerRouterSource2["FetchEvent"] = "fetch-event";
    ServiceWorkerRouterSource2["RaceNetworkAndFetchHandler"] = "race-network-and-fetch-handler";
    ServiceWorkerRouterSource2["RaceNetworkAndCache"] = "race-network-and-cache";
  })(ServiceWorkerRouterSource = Network2.ServiceWorkerRouterSource || (Network2.ServiceWorkerRouterSource = {}));
  let InitiatorType;
  ((InitiatorType2) => {
    InitiatorType2["Parser"] = "parser";
    InitiatorType2["Script"] = "script";
    InitiatorType2["Preload"] = "preload";
    InitiatorType2["SignedExchange"] = "SignedExchange";
    InitiatorType2["Preflight"] = "preflight";
    InitiatorType2["FedCM"] = "FedCM";
    InitiatorType2["Other"] = "other";
  })(InitiatorType = Network2.InitiatorType || (Network2.InitiatorType = {}));
  let SetCookieBlockedReason;
  ((SetCookieBlockedReason2) => {
    SetCookieBlockedReason2["SecureOnly"] = "SecureOnly";
    SetCookieBlockedReason2["SameSiteStrict"] = "SameSiteStrict";
    SetCookieBlockedReason2["SameSiteLax"] = "SameSiteLax";
    SetCookieBlockedReason2["SameSiteUnspecifiedTreatedAsLax"] = "SameSiteUnspecifiedTreatedAsLax";
    SetCookieBlockedReason2["SameSiteNoneInsecure"] = "SameSiteNoneInsecure";
    SetCookieBlockedReason2["UserPreferences"] = "UserPreferences";
    SetCookieBlockedReason2["ThirdPartyPhaseout"] = "ThirdPartyPhaseout";
    SetCookieBlockedReason2["ThirdPartyBlockedInFirstPartySet"] = "ThirdPartyBlockedInFirstPartySet";
    SetCookieBlockedReason2["SyntaxError"] = "SyntaxError";
    SetCookieBlockedReason2["SchemeNotSupported"] = "SchemeNotSupported";
    SetCookieBlockedReason2["OverwriteSecure"] = "OverwriteSecure";
    SetCookieBlockedReason2["InvalidDomain"] = "InvalidDomain";
    SetCookieBlockedReason2["InvalidPrefix"] = "InvalidPrefix";
    SetCookieBlockedReason2["UnknownError"] = "UnknownError";
    SetCookieBlockedReason2["SchemefulSameSiteStrict"] = "SchemefulSameSiteStrict";
    SetCookieBlockedReason2["SchemefulSameSiteLax"] = "SchemefulSameSiteLax";
    SetCookieBlockedReason2["SchemefulSameSiteUnspecifiedTreatedAsLax"] = "SchemefulSameSiteUnspecifiedTreatedAsLax";
    SetCookieBlockedReason2["NameValuePairExceedsMaxSize"] = "NameValuePairExceedsMaxSize";
    SetCookieBlockedReason2["DisallowedCharacter"] = "DisallowedCharacter";
    SetCookieBlockedReason2["NoCookieContent"] = "NoCookieContent";
  })(SetCookieBlockedReason = Network2.SetCookieBlockedReason || (Network2.SetCookieBlockedReason = {}));
  let CookieBlockedReason;
  ((CookieBlockedReason2) => {
    CookieBlockedReason2["SecureOnly"] = "SecureOnly";
    CookieBlockedReason2["NotOnPath"] = "NotOnPath";
    CookieBlockedReason2["DomainMismatch"] = "DomainMismatch";
    CookieBlockedReason2["SameSiteStrict"] = "SameSiteStrict";
    CookieBlockedReason2["SameSiteLax"] = "SameSiteLax";
    CookieBlockedReason2["SameSiteUnspecifiedTreatedAsLax"] = "SameSiteUnspecifiedTreatedAsLax";
    CookieBlockedReason2["SameSiteNoneInsecure"] = "SameSiteNoneInsecure";
    CookieBlockedReason2["UserPreferences"] = "UserPreferences";
    CookieBlockedReason2["ThirdPartyPhaseout"] = "ThirdPartyPhaseout";
    CookieBlockedReason2["ThirdPartyBlockedInFirstPartySet"] = "ThirdPartyBlockedInFirstPartySet";
    CookieBlockedReason2["UnknownError"] = "UnknownError";
    CookieBlockedReason2["SchemefulSameSiteStrict"] = "SchemefulSameSiteStrict";
    CookieBlockedReason2["SchemefulSameSiteLax"] = "SchemefulSameSiteLax";
    CookieBlockedReason2["SchemefulSameSiteUnspecifiedTreatedAsLax"] = "SchemefulSameSiteUnspecifiedTreatedAsLax";
    CookieBlockedReason2["NameValuePairExceedsMaxSize"] = "NameValuePairExceedsMaxSize";
    CookieBlockedReason2["PortMismatch"] = "PortMismatch";
    CookieBlockedReason2["SchemeMismatch"] = "SchemeMismatch";
    CookieBlockedReason2["AnonymousContext"] = "AnonymousContext";
  })(CookieBlockedReason = Network2.CookieBlockedReason || (Network2.CookieBlockedReason = {}));
  let CookieExemptionReason;
  ((CookieExemptionReason2) => {
    CookieExemptionReason2["None"] = "None";
    CookieExemptionReason2["UserSetting"] = "UserSetting";
    CookieExemptionReason2["EnterprisePolicy"] = "EnterprisePolicy";
    CookieExemptionReason2["StorageAccess"] = "StorageAccess";
    CookieExemptionReason2["TopLevelStorageAccess"] = "TopLevelStorageAccess";
    CookieExemptionReason2["Scheme"] = "Scheme";
    CookieExemptionReason2["SameSiteNoneCookiesInSandbox"] = "SameSiteNoneCookiesInSandbox";
  })(CookieExemptionReason = Network2.CookieExemptionReason || (Network2.CookieExemptionReason = {}));
  let AuthChallengeSource;
  ((AuthChallengeSource2) => {
    AuthChallengeSource2["Server"] = "Server";
    AuthChallengeSource2["Proxy"] = "Proxy";
  })(AuthChallengeSource = Network2.AuthChallengeSource || (Network2.AuthChallengeSource = {}));
  let AuthChallengeResponseResponse;
  ((AuthChallengeResponseResponse2) => {
    AuthChallengeResponseResponse2["Default"] = "Default";
    AuthChallengeResponseResponse2["CancelAuth"] = "CancelAuth";
    AuthChallengeResponseResponse2["ProvideCredentials"] = "ProvideCredentials";
  })(AuthChallengeResponseResponse = Network2.AuthChallengeResponseResponse || (Network2.AuthChallengeResponseResponse = {}));
  let SignedExchangeErrorField;
  ((SignedExchangeErrorField2) => {
    SignedExchangeErrorField2["SignatureSig"] = "signatureSig";
    SignedExchangeErrorField2["SignatureIntegrity"] = "signatureIntegrity";
    SignedExchangeErrorField2["SignatureCertUrl"] = "signatureCertUrl";
    SignedExchangeErrorField2["SignatureCertSha256"] = "signatureCertSha256";
    SignedExchangeErrorField2["SignatureValidityUrl"] = "signatureValidityUrl";
    SignedExchangeErrorField2["SignatureTimestamps"] = "signatureTimestamps";
  })(SignedExchangeErrorField = Network2.SignedExchangeErrorField || (Network2.SignedExchangeErrorField = {}));
  let DirectSocketDnsQueryType;
  ((DirectSocketDnsQueryType2) => {
    DirectSocketDnsQueryType2["Ipv4"] = "ipv4";
    DirectSocketDnsQueryType2["Ipv6"] = "ipv6";
  })(DirectSocketDnsQueryType = Network2.DirectSocketDnsQueryType || (Network2.DirectSocketDnsQueryType = {}));
  let LocalNetworkAccessRequestPolicy;
  ((LocalNetworkAccessRequestPolicy2) => {
    LocalNetworkAccessRequestPolicy2["Allow"] = "Allow";
    LocalNetworkAccessRequestPolicy2["BlockFromInsecureToMorePrivate"] = "BlockFromInsecureToMorePrivate";
    LocalNetworkAccessRequestPolicy2["WarnFromInsecureToMorePrivate"] = "WarnFromInsecureToMorePrivate";
    LocalNetworkAccessRequestPolicy2["PermissionBlock"] = "PermissionBlock";
    LocalNetworkAccessRequestPolicy2["PermissionWarn"] = "PermissionWarn";
  })(LocalNetworkAccessRequestPolicy = Network2.LocalNetworkAccessRequestPolicy || (Network2.LocalNetworkAccessRequestPolicy = {}));
  let IPAddressSpace;
  ((IPAddressSpace2) => {
    IPAddressSpace2["Loopback"] = "Loopback";
    IPAddressSpace2["Local"] = "Local";
    IPAddressSpace2["Public"] = "Public";
    IPAddressSpace2["Unknown"] = "Unknown";
  })(IPAddressSpace = Network2.IPAddressSpace || (Network2.IPAddressSpace = {}));
  let CrossOriginOpenerPolicyValue;
  ((CrossOriginOpenerPolicyValue2) => {
    CrossOriginOpenerPolicyValue2["SameOrigin"] = "SameOrigin";
    CrossOriginOpenerPolicyValue2["SameOriginAllowPopups"] = "SameOriginAllowPopups";
    CrossOriginOpenerPolicyValue2["RestrictProperties"] = "RestrictProperties";
    CrossOriginOpenerPolicyValue2["UnsafeNone"] = "UnsafeNone";
    CrossOriginOpenerPolicyValue2["SameOriginPlusCoep"] = "SameOriginPlusCoep";
    CrossOriginOpenerPolicyValue2["RestrictPropertiesPlusCoep"] = "RestrictPropertiesPlusCoep";
    CrossOriginOpenerPolicyValue2["NoopenerAllowPopups"] = "NoopenerAllowPopups";
  })(CrossOriginOpenerPolicyValue = Network2.CrossOriginOpenerPolicyValue || (Network2.CrossOriginOpenerPolicyValue = {}));
  let CrossOriginEmbedderPolicyValue;
  ((CrossOriginEmbedderPolicyValue2) => {
    CrossOriginEmbedderPolicyValue2["None"] = "None";
    CrossOriginEmbedderPolicyValue2["Credentialless"] = "Credentialless";
    CrossOriginEmbedderPolicyValue2["RequireCorp"] = "RequireCorp";
  })(CrossOriginEmbedderPolicyValue = Network2.CrossOriginEmbedderPolicyValue || (Network2.CrossOriginEmbedderPolicyValue = {}));
  let ContentSecurityPolicySource;
  ((ContentSecurityPolicySource2) => {
    ContentSecurityPolicySource2["HTTP"] = "HTTP";
    ContentSecurityPolicySource2["Meta"] = "Meta";
  })(ContentSecurityPolicySource = Network2.ContentSecurityPolicySource || (Network2.ContentSecurityPolicySource = {}));
  let ReportStatus;
  ((ReportStatus2) => {
    ReportStatus2["Queued"] = "Queued";
    ReportStatus2["Pending"] = "Pending";
    ReportStatus2["MarkedForRemoval"] = "MarkedForRemoval";
    ReportStatus2["Success"] = "Success";
  })(ReportStatus = Network2.ReportStatus || (Network2.ReportStatus = {}));
  let DeviceBoundSessionWithUsageUsage;
  ((DeviceBoundSessionWithUsageUsage2) => {
    DeviceBoundSessionWithUsageUsage2["NotInScope"] = "NotInScope";
    DeviceBoundSessionWithUsageUsage2["InScopeRefreshNotYetNeeded"] = "InScopeRefreshNotYetNeeded";
    DeviceBoundSessionWithUsageUsage2["InScopeRefreshNotAllowed"] = "InScopeRefreshNotAllowed";
    DeviceBoundSessionWithUsageUsage2["ProactiveRefreshNotPossible"] = "ProactiveRefreshNotPossible";
    DeviceBoundSessionWithUsageUsage2["ProactiveRefreshAttempted"] = "ProactiveRefreshAttempted";
    DeviceBoundSessionWithUsageUsage2["Deferred"] = "Deferred";
  })(DeviceBoundSessionWithUsageUsage = Network2.DeviceBoundSessionWithUsageUsage || (Network2.DeviceBoundSessionWithUsageUsage = {}));
  let DeviceBoundSessionUrlRuleRuleType;
  ((DeviceBoundSessionUrlRuleRuleType2) => {
    DeviceBoundSessionUrlRuleRuleType2["Exclude"] = "Exclude";
    DeviceBoundSessionUrlRuleRuleType2["Include"] = "Include";
  })(DeviceBoundSessionUrlRuleRuleType = Network2.DeviceBoundSessionUrlRuleRuleType || (Network2.DeviceBoundSessionUrlRuleRuleType = {}));
  let DeviceBoundSessionFetchResult;
  ((DeviceBoundSessionFetchResult2) => {
    DeviceBoundSessionFetchResult2["Success"] = "Success";
    DeviceBoundSessionFetchResult2["SigningKeyGenerationError"] = "SigningKeyGenerationError";
    DeviceBoundSessionFetchResult2["AttestationKeyGenerationError"] = "AttestationKeyGenerationError";
    DeviceBoundSessionFetchResult2["SigningError"] = "SigningError";
    DeviceBoundSessionFetchResult2["TransientSigningError"] = "TransientSigningError";
    DeviceBoundSessionFetchResult2["ServerRequestedTermination"] = "ServerRequestedTermination";
    DeviceBoundSessionFetchResult2["InvalidSessionId"] = "InvalidSessionId";
    DeviceBoundSessionFetchResult2["InvalidChallenge"] = "InvalidChallenge";
    DeviceBoundSessionFetchResult2["TooManyChallenges"] = "TooManyChallenges";
    DeviceBoundSessionFetchResult2["InvalidFetcherUrl"] = "InvalidFetcherUrl";
    DeviceBoundSessionFetchResult2["InvalidRefreshUrl"] = "InvalidRefreshUrl";
    DeviceBoundSessionFetchResult2["TransientHttpError"] = "TransientHttpError";
    DeviceBoundSessionFetchResult2["ScopeOriginSameSiteMismatch"] = "ScopeOriginSameSiteMismatch";
    DeviceBoundSessionFetchResult2["RefreshUrlSameSiteMismatch"] = "RefreshUrlSameSiteMismatch";
    DeviceBoundSessionFetchResult2["MismatchedSessionId"] = "MismatchedSessionId";
    DeviceBoundSessionFetchResult2["MissingScope"] = "MissingScope";
    DeviceBoundSessionFetchResult2["NoCredentials"] = "NoCredentials";
    DeviceBoundSessionFetchResult2["SubdomainRegistrationWellKnownUnavailable"] = "SubdomainRegistrationWellKnownUnavailable";
    DeviceBoundSessionFetchResult2["SubdomainRegistrationUnauthorized"] = "SubdomainRegistrationUnauthorized";
    DeviceBoundSessionFetchResult2["SubdomainRegistrationWellKnownMalformed"] = "SubdomainRegistrationWellKnownMalformed";
    DeviceBoundSessionFetchResult2["SessionProviderWellKnownUnavailable"] = "SessionProviderWellKnownUnavailable";
    DeviceBoundSessionFetchResult2["RelyingPartyWellKnownUnavailable"] = "RelyingPartyWellKnownUnavailable";
    DeviceBoundSessionFetchResult2["FederatedKeyThumbprintMismatch"] = "FederatedKeyThumbprintMismatch";
    DeviceBoundSessionFetchResult2["InvalidFederatedSessionUrl"] = "InvalidFederatedSessionUrl";
    DeviceBoundSessionFetchResult2["InvalidFederatedKey"] = "InvalidFederatedKey";
    DeviceBoundSessionFetchResult2["TooManyRelyingOriginLabels"] = "TooManyRelyingOriginLabels";
    DeviceBoundSessionFetchResult2["BoundCookieSetForbidden"] = "BoundCookieSetForbidden";
    DeviceBoundSessionFetchResult2["NetError"] = "NetError";
    DeviceBoundSessionFetchResult2["ProxyError"] = "ProxyError";
    DeviceBoundSessionFetchResult2["EmptySessionConfig"] = "EmptySessionConfig";
    DeviceBoundSessionFetchResult2["InvalidCredentialsConfig"] = "InvalidCredentialsConfig";
    DeviceBoundSessionFetchResult2["InvalidCredentialsType"] = "InvalidCredentialsType";
    DeviceBoundSessionFetchResult2["InvalidCredentialsEmptyName"] = "InvalidCredentialsEmptyName";
    DeviceBoundSessionFetchResult2["InvalidCredentialsCookie"] = "InvalidCredentialsCookie";
    DeviceBoundSessionFetchResult2["PersistentHttpError"] = "PersistentHttpError";
    DeviceBoundSessionFetchResult2["RegistrationAttemptedChallenge"] = "RegistrationAttemptedChallenge";
    DeviceBoundSessionFetchResult2["InvalidScopeOrigin"] = "InvalidScopeOrigin";
    DeviceBoundSessionFetchResult2["ScopeOriginContainsPath"] = "ScopeOriginContainsPath";
    DeviceBoundSessionFetchResult2["RefreshInitiatorNotString"] = "RefreshInitiatorNotString";
    DeviceBoundSessionFetchResult2["RefreshInitiatorInvalidHostPattern"] = "RefreshInitiatorInvalidHostPattern";
    DeviceBoundSessionFetchResult2["InvalidScopeSpecification"] = "InvalidScopeSpecification";
    DeviceBoundSessionFetchResult2["MissingScopeSpecificationType"] = "MissingScopeSpecificationType";
    DeviceBoundSessionFetchResult2["EmptyScopeSpecificationDomain"] = "EmptyScopeSpecificationDomain";
    DeviceBoundSessionFetchResult2["EmptyScopeSpecificationPath"] = "EmptyScopeSpecificationPath";
    DeviceBoundSessionFetchResult2["InvalidScopeSpecificationType"] = "InvalidScopeSpecificationType";
    DeviceBoundSessionFetchResult2["InvalidScopeIncludeSite"] = "InvalidScopeIncludeSite";
    DeviceBoundSessionFetchResult2["MissingScopeIncludeSite"] = "MissingScopeIncludeSite";
    DeviceBoundSessionFetchResult2["FederatedNotAuthorizedByProvider"] = "FederatedNotAuthorizedByProvider";
    DeviceBoundSessionFetchResult2["FederatedNotAuthorizedByRelyingParty"] = "FederatedNotAuthorizedByRelyingParty";
    DeviceBoundSessionFetchResult2["SessionProviderWellKnownMalformed"] = "SessionProviderWellKnownMalformed";
    DeviceBoundSessionFetchResult2["SessionProviderWellKnownHasProviderOrigin"] = "SessionProviderWellKnownHasProviderOrigin";
    DeviceBoundSessionFetchResult2["RelyingPartyWellKnownMalformed"] = "RelyingPartyWellKnownMalformed";
    DeviceBoundSessionFetchResult2["RelyingPartyWellKnownHasRelyingOrigins"] = "RelyingPartyWellKnownHasRelyingOrigins";
    DeviceBoundSessionFetchResult2["InvalidFederatedSessionProviderSessionMissing"] = "InvalidFederatedSessionProviderSessionMissing";
    DeviceBoundSessionFetchResult2["InvalidFederatedSessionWrongProviderOrigin"] = "InvalidFederatedSessionWrongProviderOrigin";
    DeviceBoundSessionFetchResult2["InvalidCredentialsCookieCreationTime"] = "InvalidCredentialsCookieCreationTime";
    DeviceBoundSessionFetchResult2["InvalidCredentialsCookieName"] = "InvalidCredentialsCookieName";
    DeviceBoundSessionFetchResult2["InvalidCredentialsCookieParsing"] = "InvalidCredentialsCookieParsing";
    DeviceBoundSessionFetchResult2["InvalidCredentialsCookieUnpermittedAttribute"] = "InvalidCredentialsCookieUnpermittedAttribute";
    DeviceBoundSessionFetchResult2["InvalidCredentialsCookieInvalidDomain"] = "InvalidCredentialsCookieInvalidDomain";
    DeviceBoundSessionFetchResult2["InvalidCredentialsCookiePrefix"] = "InvalidCredentialsCookiePrefix";
    DeviceBoundSessionFetchResult2["InvalidScopeRulePath"] = "InvalidScopeRulePath";
    DeviceBoundSessionFetchResult2["InvalidScopeRuleHostPattern"] = "InvalidScopeRuleHostPattern";
    DeviceBoundSessionFetchResult2["ScopeRuleOriginScopedHostPatternMismatch"] = "ScopeRuleOriginScopedHostPatternMismatch";
    DeviceBoundSessionFetchResult2["ScopeRuleSiteScopedHostPatternMismatch"] = "ScopeRuleSiteScopedHostPatternMismatch";
    DeviceBoundSessionFetchResult2["SigningQuotaExceeded"] = "SigningQuotaExceeded";
    DeviceBoundSessionFetchResult2["InvalidConfigJson"] = "InvalidConfigJson";
    DeviceBoundSessionFetchResult2["InvalidFederatedSessionProviderFailedToRestoreKey"] = "InvalidFederatedSessionProviderFailedToRestoreKey";
    DeviceBoundSessionFetchResult2["FailedToUnwrapKey"] = "FailedToUnwrapKey";
    DeviceBoundSessionFetchResult2["SessionDeletedDuringRefresh"] = "SessionDeletedDuringRefresh";
    DeviceBoundSessionFetchResult2["CrossOriginRegistrationSiteNotIncluded"] = "CrossOriginRegistrationSiteNotIncluded";
    DeviceBoundSessionFetchResult2["InvalidPreProvisionedKeyInitiatorMissing"] = "InvalidPreProvisionedKeyInitiatorMissing";
    DeviceBoundSessionFetchResult2["PreProvisionedKeyAccessNotGranted"] = "PreProvisionedKeyAccessNotGranted";
    DeviceBoundSessionFetchResult2["PreProvisionedKeyNotFound"] = "PreProvisionedKeyNotFound";
    DeviceBoundSessionFetchResult2["AttestationCertificationError"] = "AttestationCertificationError";
    DeviceBoundSessionFetchResult2["AttestationSigningError"] = "AttestationSigningError";
  })(DeviceBoundSessionFetchResult = Network2.DeviceBoundSessionFetchResult || (Network2.DeviceBoundSessionFetchResult = {}));
  let RefreshEventDetailsRefreshResult;
  ((RefreshEventDetailsRefreshResult2) => {
    RefreshEventDetailsRefreshResult2["Refreshed"] = "Refreshed";
    RefreshEventDetailsRefreshResult2["InitializedService"] = "InitializedService";
    RefreshEventDetailsRefreshResult2["Unreachable"] = "Unreachable";
    RefreshEventDetailsRefreshResult2["ServerError"] = "ServerError";
    RefreshEventDetailsRefreshResult2["FatalError"] = "FatalError";
    RefreshEventDetailsRefreshResult2["SigningQuotaExceeded"] = "SigningQuotaExceeded";
    RefreshEventDetailsRefreshResult2["RefreshedAsWaiter"] = "RefreshedAsWaiter";
    RefreshEventDetailsRefreshResult2["TransientSigningError"] = "TransientSigningError";
    RefreshEventDetailsRefreshResult2["InScopeRefreshNotYetNeeded"] = "InScopeRefreshNotYetNeeded";
  })(RefreshEventDetailsRefreshResult = Network2.RefreshEventDetailsRefreshResult || (Network2.RefreshEventDetailsRefreshResult = {}));
  let TerminationEventDetailsDeletionReason;
  ((TerminationEventDetailsDeletionReason2) => {
    TerminationEventDetailsDeletionReason2["Expired"] = "Expired";
    TerminationEventDetailsDeletionReason2["FailedToRestoreKey"] = "FailedToRestoreKey";
    TerminationEventDetailsDeletionReason2["FailedToUnwrapKey"] = "FailedToUnwrapKey";
    TerminationEventDetailsDeletionReason2["StoragePartitionCleared"] = "StoragePartitionCleared";
    TerminationEventDetailsDeletionReason2["ClearBrowsingData"] = "ClearBrowsingData";
    TerminationEventDetailsDeletionReason2["ServerRequested"] = "ServerRequested";
    TerminationEventDetailsDeletionReason2["InvalidSessionParams"] = "InvalidSessionParams";
    TerminationEventDetailsDeletionReason2["RefreshFatalError"] = "RefreshFatalError";
    TerminationEventDetailsDeletionReason2["DevTools"] = "DevTools";
    TerminationEventDetailsDeletionReason2["Replaced"] = "Replaced";
  })(TerminationEventDetailsDeletionReason = Network2.TerminationEventDetailsDeletionReason || (Network2.TerminationEventDetailsDeletionReason = {}));
  let ChallengeEventDetailsChallengeResult;
  ((ChallengeEventDetailsChallengeResult2) => {
    ChallengeEventDetailsChallengeResult2["Success"] = "Success";
    ChallengeEventDetailsChallengeResult2["NoSessionId"] = "NoSessionId";
    ChallengeEventDetailsChallengeResult2["NoSessionMatch"] = "NoSessionMatch";
    ChallengeEventDetailsChallengeResult2["CantSetBoundCookie"] = "CantSetBoundCookie";
  })(ChallengeEventDetailsChallengeResult = Network2.ChallengeEventDetailsChallengeResult || (Network2.ChallengeEventDetailsChallengeResult = {}));
  let TrustTokenOperationDoneEventStatus;
  ((TrustTokenOperationDoneEventStatus2) => {
    TrustTokenOperationDoneEventStatus2["Ok"] = "Ok";
    TrustTokenOperationDoneEventStatus2["InvalidArgument"] = "InvalidArgument";
    TrustTokenOperationDoneEventStatus2["MissingIssuerKeys"] = "MissingIssuerKeys";
    TrustTokenOperationDoneEventStatus2["FailedPrecondition"] = "FailedPrecondition";
    TrustTokenOperationDoneEventStatus2["ResourceExhausted"] = "ResourceExhausted";
    TrustTokenOperationDoneEventStatus2["AlreadyExists"] = "AlreadyExists";
    TrustTokenOperationDoneEventStatus2["ResourceLimited"] = "ResourceLimited";
    TrustTokenOperationDoneEventStatus2["Unauthorized"] = "Unauthorized";
    TrustTokenOperationDoneEventStatus2["BadResponse"] = "BadResponse";
    TrustTokenOperationDoneEventStatus2["InternalError"] = "InternalError";
    TrustTokenOperationDoneEventStatus2["UnknownError"] = "UnknownError";
    TrustTokenOperationDoneEventStatus2["FulfilledLocally"] = "FulfilledLocally";
    TrustTokenOperationDoneEventStatus2["SiteIssuerLimit"] = "SiteIssuerLimit";
  })(TrustTokenOperationDoneEventStatus = Network2.TrustTokenOperationDoneEventStatus || (Network2.TrustTokenOperationDoneEventStatus = {}));
})(Network || (Network = {}));
var Overlay;
((Overlay2) => {
  let LineStylePattern;
  ((LineStylePattern2) => {
    LineStylePattern2["Dashed"] = "dashed";
    LineStylePattern2["Dotted"] = "dotted";
  })(LineStylePattern = Overlay2.LineStylePattern || (Overlay2.LineStylePattern = {}));
  let ContrastAlgorithm;
  ((ContrastAlgorithm2) => {
    ContrastAlgorithm2["Aa"] = "aa";
    ContrastAlgorithm2["Aaa"] = "aaa";
    ContrastAlgorithm2["Apca"] = "apca";
  })(ContrastAlgorithm = Overlay2.ContrastAlgorithm || (Overlay2.ContrastAlgorithm = {}));
  let ColorFormat;
  ((ColorFormat2) => {
    ColorFormat2["Rgb"] = "rgb";
    ColorFormat2["Hsl"] = "hsl";
    ColorFormat2["Hwb"] = "hwb";
    ColorFormat2["Hex"] = "hex";
  })(ColorFormat = Overlay2.ColorFormat || (Overlay2.ColorFormat = {}));
  let DisplayCutoutShape;
  ((DisplayCutoutShape2) => {
    DisplayCutoutShape2["Pill"] = "pill";
    DisplayCutoutShape2["Notch"] = "notch";
    DisplayCutoutShape2["Circle"] = "circle";
    DisplayCutoutShape2["Rectangle"] = "rectangle";
  })(DisplayCutoutShape = Overlay2.DisplayCutoutShape || (Overlay2.DisplayCutoutShape = {}));
  let InspectMode;
  ((InspectMode2) => {
    InspectMode2["SearchForNode"] = "searchForNode";
    InspectMode2["SearchForUAShadowDOM"] = "searchForUAShadowDOM";
    InspectMode2["CaptureAreaScreenshot"] = "captureAreaScreenshot";
    InspectMode2["None"] = "none";
  })(InspectMode = Overlay2.InspectMode || (Overlay2.InspectMode = {}));
})(Overlay || (Overlay = {}));
var PWA;
((PWA2) => {
  let DisplayMode;
  ((DisplayMode2) => {
    DisplayMode2["Standalone"] = "standalone";
    DisplayMode2["Browser"] = "browser";
  })(DisplayMode = PWA2.DisplayMode || (PWA2.DisplayMode = {}));
})(PWA || (PWA = {}));
var Page;
((Page2) => {
  let AdFrameType;
  ((AdFrameType2) => {
    AdFrameType2["None"] = "none";
    AdFrameType2["Child"] = "child";
    AdFrameType2["Root"] = "root";
  })(AdFrameType = Page2.AdFrameType || (Page2.AdFrameType = {}));
  let AdFrameExplanation;
  ((AdFrameExplanation2) => {
    AdFrameExplanation2["ParentIsAd"] = "ParentIsAd";
    AdFrameExplanation2["CreatedByAdScript"] = "CreatedByAdScript";
    AdFrameExplanation2["MatchedBlockingRule"] = "MatchedBlockingRule";
  })(AdFrameExplanation = Page2.AdFrameExplanation || (Page2.AdFrameExplanation = {}));
  let SecureContextType;
  ((SecureContextType2) => {
    SecureContextType2["Secure"] = "Secure";
    SecureContextType2["SecureLocalhost"] = "SecureLocalhost";
    SecureContextType2["InsecureScheme"] = "InsecureScheme";
    SecureContextType2["InsecureAncestor"] = "InsecureAncestor";
  })(SecureContextType = Page2.SecureContextType || (Page2.SecureContextType = {}));
  let CrossOriginIsolatedContextType;
  ((CrossOriginIsolatedContextType2) => {
    CrossOriginIsolatedContextType2["Isolated"] = "Isolated";
    CrossOriginIsolatedContextType2["NotIsolated"] = "NotIsolated";
    CrossOriginIsolatedContextType2["NotIsolatedFeatureDisabled"] = "NotIsolatedFeatureDisabled";
  })(CrossOriginIsolatedContextType = Page2.CrossOriginIsolatedContextType || (Page2.CrossOriginIsolatedContextType = {}));
  let GatedAPIFeatures;
  ((GatedAPIFeatures2) => {
    GatedAPIFeatures2["SharedArrayBuffers"] = "SharedArrayBuffers";
    GatedAPIFeatures2["SharedArrayBuffersTransferAllowed"] = "SharedArrayBuffersTransferAllowed";
    GatedAPIFeatures2["PerformanceMeasureMemory"] = "PerformanceMeasureMemory";
    GatedAPIFeatures2["PerformanceProfile"] = "PerformanceProfile";
  })(GatedAPIFeatures = Page2.GatedAPIFeatures || (Page2.GatedAPIFeatures = {}));
  let PermissionsPolicyFeature;
  ((PermissionsPolicyFeature2) => {
    PermissionsPolicyFeature2["Accelerometer"] = "accelerometer";
    PermissionsPolicyFeature2["AllScreensCapture"] = "all-screens-capture";
    PermissionsPolicyFeature2["AmbientLightSensor"] = "ambient-light-sensor";
    PermissionsPolicyFeature2["AriaNotify"] = "aria-notify";
    PermissionsPolicyFeature2["Autofill"] = "autofill";
    PermissionsPolicyFeature2["Autoplay"] = "autoplay";
    PermissionsPolicyFeature2["Bluetooth"] = "bluetooth";
    PermissionsPolicyFeature2["BrowsingTopics"] = "browsing-topics";
    PermissionsPolicyFeature2["Camera"] = "camera";
    PermissionsPolicyFeature2["CapturedSurfaceControl"] = "captured-surface-control";
    PermissionsPolicyFeature2["ChDpr"] = "ch-dpr";
    PermissionsPolicyFeature2["ChDeviceMemory"] = "ch-device-memory";
    PermissionsPolicyFeature2["ChDownlink"] = "ch-downlink";
    PermissionsPolicyFeature2["ChEct"] = "ch-ect";
    PermissionsPolicyFeature2["ChPrefersColorScheme"] = "ch-prefers-color-scheme";
    PermissionsPolicyFeature2["ChPrefersReducedMotion"] = "ch-prefers-reduced-motion";
    PermissionsPolicyFeature2["ChPrefersReducedTransparency"] = "ch-prefers-reduced-transparency";
    PermissionsPolicyFeature2["ChRtt"] = "ch-rtt";
    PermissionsPolicyFeature2["ChSaveData"] = "ch-save-data";
    PermissionsPolicyFeature2["ChUa"] = "ch-ua";
    PermissionsPolicyFeature2["ChUaArch"] = "ch-ua-arch";
    PermissionsPolicyFeature2["ChUaBitness"] = "ch-ua-bitness";
    PermissionsPolicyFeature2["ChUaHighEntropyValues"] = "ch-ua-high-entropy-values";
    PermissionsPolicyFeature2["ChUaPlatform"] = "ch-ua-platform";
    PermissionsPolicyFeature2["ChUaModel"] = "ch-ua-model";
    PermissionsPolicyFeature2["ChUaMobile"] = "ch-ua-mobile";
    PermissionsPolicyFeature2["ChUaFormFactors"] = "ch-ua-form-factors";
    PermissionsPolicyFeature2["ChUaFullVersion"] = "ch-ua-full-version";
    PermissionsPolicyFeature2["ChUaFullVersionList"] = "ch-ua-full-version-list";
    PermissionsPolicyFeature2["ChUaPlatformVersion"] = "ch-ua-platform-version";
    PermissionsPolicyFeature2["ChUaWow64"] = "ch-ua-wow64";
    PermissionsPolicyFeature2["ChViewportHeight"] = "ch-viewport-height";
    PermissionsPolicyFeature2["ChViewportWidth"] = "ch-viewport-width";
    PermissionsPolicyFeature2["ChWidth"] = "ch-width";
    PermissionsPolicyFeature2["ClipboardRead"] = "clipboard-read";
    PermissionsPolicyFeature2["ClipboardWrite"] = "clipboard-write";
    PermissionsPolicyFeature2["ComputePressure"] = "compute-pressure";
    PermissionsPolicyFeature2["ControlledFrame"] = "controlled-frame";
    PermissionsPolicyFeature2["CrossOriginIsolated"] = "cross-origin-isolated";
    PermissionsPolicyFeature2["DeferredFetch"] = "deferred-fetch";
    PermissionsPolicyFeature2["DeferredFetchMinimal"] = "deferred-fetch-minimal";
    PermissionsPolicyFeature2["DeviceAttributes"] = "device-attributes";
    PermissionsPolicyFeature2["DigitalCredentialsCreate"] = "digital-credentials-create";
    PermissionsPolicyFeature2["DigitalCredentialsGet"] = "digital-credentials-get";
    PermissionsPolicyFeature2["DirectSockets"] = "direct-sockets";
    PermissionsPolicyFeature2["DirectSocketsMulticast"] = "direct-sockets-multicast";
    PermissionsPolicyFeature2["DisplayCapture"] = "display-capture";
    PermissionsPolicyFeature2["DocumentDomain"] = "document-domain";
    PermissionsPolicyFeature2["EncryptedMedia"] = "encrypted-media";
    PermissionsPolicyFeature2["ExecutionWhileOutOfViewport"] = "execution-while-out-of-viewport";
    PermissionsPolicyFeature2["ExecutionWhileNotRendered"] = "execution-while-not-rendered";
    PermissionsPolicyFeature2["FocusWithoutUserActivation"] = "focus-without-user-activation";
    PermissionsPolicyFeature2["Fullscreen"] = "fullscreen";
    PermissionsPolicyFeature2["Frobulate"] = "frobulate";
    PermissionsPolicyFeature2["Gamepad"] = "gamepad";
    PermissionsPolicyFeature2["Geolocation"] = "geolocation";
    PermissionsPolicyFeature2["Gyroscope"] = "gyroscope";
    PermissionsPolicyFeature2["Haptics"] = "haptics";
    PermissionsPolicyFeature2["Hid"] = "hid";
    PermissionsPolicyFeature2["IdentityCredentialsGet"] = "identity-credentials-get";
    PermissionsPolicyFeature2["IdleDetection"] = "idle-detection";
    PermissionsPolicyFeature2["InterestCohort"] = "interest-cohort";
    PermissionsPolicyFeature2["KeyboardMap"] = "keyboard-map";
    PermissionsPolicyFeature2["LanguageDetector"] = "language-detector";
    PermissionsPolicyFeature2["LanguageModel"] = "language-model";
    PermissionsPolicyFeature2["LocalFonts"] = "local-fonts";
    PermissionsPolicyFeature2["LocalNetwork"] = "local-network";
    PermissionsPolicyFeature2["LocalNetworkAccess"] = "local-network-access";
    PermissionsPolicyFeature2["LoopbackNetwork"] = "loopback-network";
    PermissionsPolicyFeature2["Magnetometer"] = "magnetometer";
    PermissionsPolicyFeature2["ManualText"] = "manual-text";
    PermissionsPolicyFeature2["MediaPlaybackWhileNotVisible"] = "media-playback-while-not-visible";
    PermissionsPolicyFeature2["Microphone"] = "microphone";
    PermissionsPolicyFeature2["Midi"] = "midi";
    PermissionsPolicyFeature2["OnDeviceSpeechRecognition"] = "on-device-speech-recognition";
    PermissionsPolicyFeature2["OtpCredentials"] = "otp-credentials";
    PermissionsPolicyFeature2["Payment"] = "payment";
    PermissionsPolicyFeature2["PictureInPicture"] = "picture-in-picture";
    PermissionsPolicyFeature2["PrivateStateTokenIssuance"] = "private-state-token-issuance";
    PermissionsPolicyFeature2["PrivateStateTokenRedemption"] = "private-state-token-redemption";
    PermissionsPolicyFeature2["PublickeyCredentialsCreate"] = "publickey-credentials-create";
    PermissionsPolicyFeature2["PublickeyCredentialsGet"] = "publickey-credentials-get";
    PermissionsPolicyFeature2["Rewriter"] = "rewriter";
    PermissionsPolicyFeature2["ScreenWakeLock"] = "screen-wake-lock";
    PermissionsPolicyFeature2["Serial"] = "serial";
    PermissionsPolicyFeature2["SharedStorage"] = "shared-storage";
    PermissionsPolicyFeature2["SharedStorageSelectUrl"] = "shared-storage-select-url";
    PermissionsPolicyFeature2["SmartCard"] = "smart-card";
    PermissionsPolicyFeature2["SpeakerSelection"] = "speaker-selection";
    PermissionsPolicyFeature2["StorageAccess"] = "storage-access";
    PermissionsPolicyFeature2["SubApps"] = "sub-apps";
    PermissionsPolicyFeature2["Summarizer"] = "summarizer";
    PermissionsPolicyFeature2["SyncXhr"] = "sync-xhr";
    PermissionsPolicyFeature2["Tools"] = "tools";
    PermissionsPolicyFeature2["Translator"] = "translator";
    PermissionsPolicyFeature2["Unload"] = "unload";
    PermissionsPolicyFeature2["Usb"] = "usb";
    PermissionsPolicyFeature2["UsbUnrestricted"] = "usb-unrestricted";
    PermissionsPolicyFeature2["VerticalScroll"] = "vertical-scroll";
    PermissionsPolicyFeature2["WebAppInstallation"] = "web-app-installation";
    PermissionsPolicyFeature2["Webnn"] = "webnn";
    PermissionsPolicyFeature2["WebPrinting"] = "web-printing";
    PermissionsPolicyFeature2["WebShare"] = "web-share";
    PermissionsPolicyFeature2["WindowManagement"] = "window-management";
    PermissionsPolicyFeature2["Writer"] = "writer";
    PermissionsPolicyFeature2["XrSpatialTracking"] = "xr-spatial-tracking";
  })(PermissionsPolicyFeature = Page2.PermissionsPolicyFeature || (Page2.PermissionsPolicyFeature = {}));
  let PermissionsPolicyBlockReason;
  ((PermissionsPolicyBlockReason2) => {
    PermissionsPolicyBlockReason2["Header"] = "Header";
    PermissionsPolicyBlockReason2["IframeAttribute"] = "IframeAttribute";
    PermissionsPolicyBlockReason2["InFencedFrameTree"] = "InFencedFrameTree";
    PermissionsPolicyBlockReason2["InIsolatedApp"] = "InIsolatedApp";
  })(PermissionsPolicyBlockReason = Page2.PermissionsPolicyBlockReason || (Page2.PermissionsPolicyBlockReason = {}));
  let OriginTrialTokenStatus;
  ((OriginTrialTokenStatus2) => {
    OriginTrialTokenStatus2["Success"] = "Success";
    OriginTrialTokenStatus2["NotSupported"] = "NotSupported";
    OriginTrialTokenStatus2["Insecure"] = "Insecure";
    OriginTrialTokenStatus2["Expired"] = "Expired";
    OriginTrialTokenStatus2["WrongOrigin"] = "WrongOrigin";
    OriginTrialTokenStatus2["InvalidSignature"] = "InvalidSignature";
    OriginTrialTokenStatus2["Malformed"] = "Malformed";
    OriginTrialTokenStatus2["WrongVersion"] = "WrongVersion";
    OriginTrialTokenStatus2["FeatureDisabled"] = "FeatureDisabled";
    OriginTrialTokenStatus2["TokenDisabled"] = "TokenDisabled";
    OriginTrialTokenStatus2["FeatureDisabledForUser"] = "FeatureDisabledForUser";
    OriginTrialTokenStatus2["UnknownTrial"] = "UnknownTrial";
  })(OriginTrialTokenStatus = Page2.OriginTrialTokenStatus || (Page2.OriginTrialTokenStatus = {}));
  let OriginTrialStatus;
  ((OriginTrialStatus2) => {
    OriginTrialStatus2["Enabled"] = "Enabled";
    OriginTrialStatus2["ValidTokenNotProvided"] = "ValidTokenNotProvided";
    OriginTrialStatus2["OSNotSupported"] = "OSNotSupported";
    OriginTrialStatus2["TrialNotAllowed"] = "TrialNotAllowed";
  })(OriginTrialStatus = Page2.OriginTrialStatus || (Page2.OriginTrialStatus = {}));
  let OriginTrialUsageRestriction;
  ((OriginTrialUsageRestriction2) => {
    OriginTrialUsageRestriction2["None"] = "None";
    OriginTrialUsageRestriction2["Subset"] = "Subset";
  })(OriginTrialUsageRestriction = Page2.OriginTrialUsageRestriction || (Page2.OriginTrialUsageRestriction = {}));
  let TransitionType;
  ((TransitionType2) => {
    TransitionType2["Link"] = "link";
    TransitionType2["Typed"] = "typed";
    TransitionType2["Address_bar"] = "address_bar";
    TransitionType2["Auto_bookmark"] = "auto_bookmark";
    TransitionType2["Auto_subframe"] = "auto_subframe";
    TransitionType2["Manual_subframe"] = "manual_subframe";
    TransitionType2["Generated"] = "generated";
    TransitionType2["Auto_toplevel"] = "auto_toplevel";
    TransitionType2["Form_submit"] = "form_submit";
    TransitionType2["Reload"] = "reload";
    TransitionType2["Keyword"] = "keyword";
    TransitionType2["Keyword_generated"] = "keyword_generated";
    TransitionType2["Other"] = "other";
  })(TransitionType = Page2.TransitionType || (Page2.TransitionType = {}));
  let DialogType;
  ((DialogType2) => {
    DialogType2["Alert"] = "alert";
    DialogType2["Confirm"] = "confirm";
    DialogType2["Prompt"] = "prompt";
    DialogType2["Beforeunload"] = "beforeunload";
  })(DialogType = Page2.DialogType || (Page2.DialogType = {}));
  let ClientNavigationReason;
  ((ClientNavigationReason2) => {
    ClientNavigationReason2["AnchorClick"] = "anchorClick";
    ClientNavigationReason2["FormSubmissionGet"] = "formSubmissionGet";
    ClientNavigationReason2["FormSubmissionPost"] = "formSubmissionPost";
    ClientNavigationReason2["HttpHeaderRefresh"] = "httpHeaderRefresh";
    ClientNavigationReason2["InitialFrameNavigation"] = "initialFrameNavigation";
    ClientNavigationReason2["MetaTagRefresh"] = "metaTagRefresh";
    ClientNavigationReason2["Other"] = "other";
    ClientNavigationReason2["PageBlockInterstitial"] = "pageBlockInterstitial";
    ClientNavigationReason2["Reload"] = "reload";
    ClientNavigationReason2["ScriptInitiated"] = "scriptInitiated";
  })(ClientNavigationReason = Page2.ClientNavigationReason || (Page2.ClientNavigationReason = {}));
  let ClientNavigationDisposition;
  ((ClientNavigationDisposition2) => {
    ClientNavigationDisposition2["CurrentTab"] = "currentTab";
    ClientNavigationDisposition2["NewTab"] = "newTab";
    ClientNavigationDisposition2["NewWindow"] = "newWindow";
    ClientNavigationDisposition2["Download"] = "download";
  })(ClientNavigationDisposition = Page2.ClientNavigationDisposition || (Page2.ClientNavigationDisposition = {}));
  let ReferrerPolicy;
  ((ReferrerPolicy2) => {
    ReferrerPolicy2["NoReferrer"] = "noReferrer";
    ReferrerPolicy2["NoReferrerWhenDowngrade"] = "noReferrerWhenDowngrade";
    ReferrerPolicy2["Origin"] = "origin";
    ReferrerPolicy2["OriginWhenCrossOrigin"] = "originWhenCrossOrigin";
    ReferrerPolicy2["SameOrigin"] = "sameOrigin";
    ReferrerPolicy2["StrictOrigin"] = "strictOrigin";
    ReferrerPolicy2["StrictOriginWhenCrossOrigin"] = "strictOriginWhenCrossOrigin";
    ReferrerPolicy2["UnsafeUrl"] = "unsafeUrl";
  })(ReferrerPolicy = Page2.ReferrerPolicy || (Page2.ReferrerPolicy = {}));
  let NavigationType;
  ((NavigationType2) => {
    NavigationType2["Navigation"] = "Navigation";
    NavigationType2["BackForwardCacheRestore"] = "BackForwardCacheRestore";
  })(NavigationType = Page2.NavigationType || (Page2.NavigationType = {}));
  let BackForwardCacheNotRestoredReason;
  ((BackForwardCacheNotRestoredReason2) => {
    BackForwardCacheNotRestoredReason2["NotPrimaryMainFrame"] = "NotPrimaryMainFrame";
    BackForwardCacheNotRestoredReason2["BackForwardCacheDisabled"] = "BackForwardCacheDisabled";
    BackForwardCacheNotRestoredReason2["RelatedActiveContentsExist"] = "RelatedActiveContentsExist";
    BackForwardCacheNotRestoredReason2["HTTPStatusNotOK"] = "HTTPStatusNotOK";
    BackForwardCacheNotRestoredReason2["SchemeNotHTTPOrHTTPS"] = "SchemeNotHTTPOrHTTPS";
    BackForwardCacheNotRestoredReason2["Loading"] = "Loading";
    BackForwardCacheNotRestoredReason2["WasGrantedMediaAccess"] = "WasGrantedMediaAccess";
    BackForwardCacheNotRestoredReason2["DisableForRenderFrameHostCalled"] = "DisableForRenderFrameHostCalled";
    BackForwardCacheNotRestoredReason2["DomainNotAllowed"] = "DomainNotAllowed";
    BackForwardCacheNotRestoredReason2["HTTPMethodNotGET"] = "HTTPMethodNotGET";
    BackForwardCacheNotRestoredReason2["SubframeIsNavigating"] = "SubframeIsNavigating";
    BackForwardCacheNotRestoredReason2["Timeout"] = "Timeout";
    BackForwardCacheNotRestoredReason2["CacheLimit"] = "CacheLimit";
    BackForwardCacheNotRestoredReason2["JavaScriptExecution"] = "JavaScriptExecution";
    BackForwardCacheNotRestoredReason2["RendererProcessKilled"] = "RendererProcessKilled";
    BackForwardCacheNotRestoredReason2["RendererProcessCrashed"] = "RendererProcessCrashed";
    BackForwardCacheNotRestoredReason2["SchedulerTrackedFeatureUsed"] = "SchedulerTrackedFeatureUsed";
    BackForwardCacheNotRestoredReason2["ConflictingBrowsingInstance"] = "ConflictingBrowsingInstance";
    BackForwardCacheNotRestoredReason2["CacheFlushed"] = "CacheFlushed";
    BackForwardCacheNotRestoredReason2["ServiceWorkerVersionActivation"] = "ServiceWorkerVersionActivation";
    BackForwardCacheNotRestoredReason2["SessionRestored"] = "SessionRestored";
    BackForwardCacheNotRestoredReason2["ServiceWorkerPostMessage"] = "ServiceWorkerPostMessage";
    BackForwardCacheNotRestoredReason2["EnteredBackForwardCacheBeforeServiceWorkerHostAdded"] = "EnteredBackForwardCacheBeforeServiceWorkerHostAdded";
    BackForwardCacheNotRestoredReason2["RenderFrameHostReused_SameSite"] = "RenderFrameHostReused_SameSite";
    BackForwardCacheNotRestoredReason2["RenderFrameHostReused_CrossSite"] = "RenderFrameHostReused_CrossSite";
    BackForwardCacheNotRestoredReason2["ServiceWorkerClaim"] = "ServiceWorkerClaim";
    BackForwardCacheNotRestoredReason2["IgnoreEventAndEvict"] = "IgnoreEventAndEvict";
    BackForwardCacheNotRestoredReason2["HaveInnerContents"] = "HaveInnerContents";
    BackForwardCacheNotRestoredReason2["TimeoutPuttingInCache"] = "TimeoutPuttingInCache";
    BackForwardCacheNotRestoredReason2["BackForwardCacheDisabledByLowMemory"] = "BackForwardCacheDisabledByLowMemory";
    BackForwardCacheNotRestoredReason2["BackForwardCacheDisabledByCommandLine"] = "BackForwardCacheDisabledByCommandLine";
    BackForwardCacheNotRestoredReason2["NetworkRequestDatAPIpeDrainedAsBytesConsumer"] = "NetworkRequestDatapipeDrainedAsBytesConsumer";
    BackForwardCacheNotRestoredReason2["NetworkRequestRedirected"] = "NetworkRequestRedirected";
    BackForwardCacheNotRestoredReason2["NetworkRequestTimeout"] = "NetworkRequestTimeout";
    BackForwardCacheNotRestoredReason2["NetworkExceedsBufferLimit"] = "NetworkExceedsBufferLimit";
    BackForwardCacheNotRestoredReason2["NavigationCancelledWhileRestoring"] = "NavigationCancelledWhileRestoring";
    BackForwardCacheNotRestoredReason2["NotMostRecentNavigationEntry"] = "NotMostRecentNavigationEntry";
    BackForwardCacheNotRestoredReason2["BackForwardCacheDisabledForPrerender"] = "BackForwardCacheDisabledForPrerender";
    BackForwardCacheNotRestoredReason2["UserAgentOverrideDiffers"] = "UserAgentOverrideDiffers";
    BackForwardCacheNotRestoredReason2["ForegroundCacheLimit"] = "ForegroundCacheLimit";
    BackForwardCacheNotRestoredReason2["ForwardCacheDisabled"] = "ForwardCacheDisabled";
    BackForwardCacheNotRestoredReason2["BrowsingInstanceNotSwapped"] = "BrowsingInstanceNotSwapped";
    BackForwardCacheNotRestoredReason2["BackForwardCacheDisabledForDelegate"] = "BackForwardCacheDisabledForDelegate";
    BackForwardCacheNotRestoredReason2["UnloadHandlerExistsInMainFrame"] = "UnloadHandlerExistsInMainFrame";
    BackForwardCacheNotRestoredReason2["UnloadHandlerExistsInSubFrame"] = "UnloadHandlerExistsInSubFrame";
    BackForwardCacheNotRestoredReason2["ServiceWorkerUnregistration"] = "ServiceWorkerUnregistration";
    BackForwardCacheNotRestoredReason2["CacheControlNoStore"] = "CacheControlNoStore";
    BackForwardCacheNotRestoredReason2["CacheControlNoStoreCookieModified"] = "CacheControlNoStoreCookieModified";
    BackForwardCacheNotRestoredReason2["CacheControlNoStoreHTTPOnlyCookieModified"] = "CacheControlNoStoreHTTPOnlyCookieModified";
    BackForwardCacheNotRestoredReason2["NoResponseHead"] = "NoResponseHead";
    BackForwardCacheNotRestoredReason2["Unknown"] = "Unknown";
    BackForwardCacheNotRestoredReason2["ActivationNavigationsDisallowedForBug1234857"] = "ActivationNavigationsDisallowedForBug1234857";
    BackForwardCacheNotRestoredReason2["ErrorDocument"] = "ErrorDocument";
    BackForwardCacheNotRestoredReason2["FencedFramesEmbedder"] = "FencedFramesEmbedder";
    BackForwardCacheNotRestoredReason2["CookieDisabled"] = "CookieDisabled";
    BackForwardCacheNotRestoredReason2["HTTPAuthRequired"] = "HTTPAuthRequired";
    BackForwardCacheNotRestoredReason2["CookieFlushed"] = "CookieFlushed";
    BackForwardCacheNotRestoredReason2["BroadcastChannelOnMessage"] = "BroadcastChannelOnMessage";
    BackForwardCacheNotRestoredReason2["WebViewSettingsChanged"] = "WebViewSettingsChanged";
    BackForwardCacheNotRestoredReason2["WebViewJavaScriptObjectChanged"] = "WebViewJavaScriptObjectChanged";
    BackForwardCacheNotRestoredReason2["WebViewMessageListenerInjected"] = "WebViewMessageListenerInjected";
    BackForwardCacheNotRestoredReason2["WebViewSafeBrowsingAllowlistChanged"] = "WebViewSafeBrowsingAllowlistChanged";
    BackForwardCacheNotRestoredReason2["WebViewDocumentStartJavascriptChanged"] = "WebViewDocumentStartJavascriptChanged";
    BackForwardCacheNotRestoredReason2["WebSocket"] = "WebSocket";
    BackForwardCacheNotRestoredReason2["WebTransport"] = "WebTransport";
    BackForwardCacheNotRestoredReason2["WebRTC"] = "WebRTC";
    BackForwardCacheNotRestoredReason2["MainResourceHasCacheControlNoStore"] = "MainResourceHasCacheControlNoStore";
    BackForwardCacheNotRestoredReason2["MainResourceHasCacheControlNoCache"] = "MainResourceHasCacheControlNoCache";
    BackForwardCacheNotRestoredReason2["SubresourceHasCacheControlNoStore"] = "SubresourceHasCacheControlNoStore";
    BackForwardCacheNotRestoredReason2["SubresourceHasCacheControlNoCache"] = "SubresourceHasCacheControlNoCache";
    BackForwardCacheNotRestoredReason2["ContainsPlugins"] = "ContainsPlugins";
    BackForwardCacheNotRestoredReason2["DocumentLoaded"] = "DocumentLoaded";
    BackForwardCacheNotRestoredReason2["OutstandingNetworkRequestOthers"] = "OutstandingNetworkRequestOthers";
    BackForwardCacheNotRestoredReason2["RequestedMIDIPermission"] = "RequestedMIDIPermission";
    BackForwardCacheNotRestoredReason2["RequestedAudioCapturePermission"] = "RequestedAudioCapturePermission";
    BackForwardCacheNotRestoredReason2["RequestedVideoCapturePermission"] = "RequestedVideoCapturePermission";
    BackForwardCacheNotRestoredReason2["RequestedBackForwardCacheBlockedSensors"] = "RequestedBackForwardCacheBlockedSensors";
    BackForwardCacheNotRestoredReason2["RequestedBackgroundWorkPermission"] = "RequestedBackgroundWorkPermission";
    BackForwardCacheNotRestoredReason2["BroadcastChannel"] = "BroadcastChannel";
    BackForwardCacheNotRestoredReason2["WebXR"] = "WebXR";
    BackForwardCacheNotRestoredReason2["SharedWorker"] = "SharedWorker";
    BackForwardCacheNotRestoredReason2["SharedWorkerMessage"] = "SharedWorkerMessage";
    BackForwardCacheNotRestoredReason2["SharedWorkerWithNoActiveClient"] = "SharedWorkerWithNoActiveClient";
    BackForwardCacheNotRestoredReason2["WebLocks"] = "WebLocks";
    BackForwardCacheNotRestoredReason2["WebLocksContention"] = "WebLocksContention";
    BackForwardCacheNotRestoredReason2["WebHID"] = "WebHID";
    BackForwardCacheNotRestoredReason2["WebBluetooth"] = "WebBluetooth";
    BackForwardCacheNotRestoredReason2["WebShare"] = "WebShare";
    BackForwardCacheNotRestoredReason2["RequestedStorageAccessGrant"] = "RequestedStorageAccessGrant";
    BackForwardCacheNotRestoredReason2["WebNfc"] = "WebNfc";
    BackForwardCacheNotRestoredReason2["OutstandingNetworkRequestFetch"] = "OutstandingNetworkRequestFetch";
    BackForwardCacheNotRestoredReason2["OutstandingNetworkRequestXHR"] = "OutstandingNetworkRequestXHR";
    BackForwardCacheNotRestoredReason2["AppBanner"] = "AppBanner";
    BackForwardCacheNotRestoredReason2["Printing"] = "Printing";
    BackForwardCacheNotRestoredReason2["WebDatabase"] = "WebDatabase";
    BackForwardCacheNotRestoredReason2["PictureInPicture"] = "PictureInPicture";
    BackForwardCacheNotRestoredReason2["SpeechRecognizer"] = "SpeechRecognizer";
    BackForwardCacheNotRestoredReason2["IdleManager"] = "IdleManager";
    BackForwardCacheNotRestoredReason2["PaymentManager"] = "PaymentManager";
    BackForwardCacheNotRestoredReason2["SpeechSynthesis"] = "SpeechSynthesis";
    BackForwardCacheNotRestoredReason2["KeyboardLock"] = "KeyboardLock";
    BackForwardCacheNotRestoredReason2["WebOTPService"] = "WebOTPService";
    BackForwardCacheNotRestoredReason2["OutstandingNetworkRequestDirectSocket"] = "OutstandingNetworkRequestDirectSocket";
    BackForwardCacheNotRestoredReason2["InjectedJavascript"] = "InjectedJavascript";
    BackForwardCacheNotRestoredReason2["InjectedStyleSheet"] = "InjectedStyleSheet";
    BackForwardCacheNotRestoredReason2["KeepaliveRequest"] = "KeepaliveRequest";
    BackForwardCacheNotRestoredReason2["IndexedDBEvent"] = "IndexedDBEvent";
    BackForwardCacheNotRestoredReason2["Dummy"] = "Dummy";
    BackForwardCacheNotRestoredReason2["JsNetworkRequestReceivedCacheControlNoStoreResource"] = "JsNetworkRequestReceivedCacheControlNoStoreResource";
    BackForwardCacheNotRestoredReason2["WebRTCUsedWithCCNS"] = "WebRTCUsedWithCCNS";
    BackForwardCacheNotRestoredReason2["WebTransportUsedWithCCNS"] = "WebTransportUsedWithCCNS";
    BackForwardCacheNotRestoredReason2["WebSocketUsedWithCCNS"] = "WebSocketUsedWithCCNS";
    BackForwardCacheNotRestoredReason2["SmartCard"] = "SmartCard";
    BackForwardCacheNotRestoredReason2["LiveMediaStreamTrack"] = "LiveMediaStreamTrack";
    BackForwardCacheNotRestoredReason2["UnloadHandler"] = "UnloadHandler";
    BackForwardCacheNotRestoredReason2["ParserAborted"] = "ParserAborted";
    BackForwardCacheNotRestoredReason2["ContentSecurityHandler"] = "ContentSecurityHandler";
    BackForwardCacheNotRestoredReason2["ContentWebAuthenticationAPI"] = "ContentWebAuthenticationAPI";
    BackForwardCacheNotRestoredReason2["ContentFileChooser"] = "ContentFileChooser";
    BackForwardCacheNotRestoredReason2["ContentSerial"] = "ContentSerial";
    BackForwardCacheNotRestoredReason2["ContentFileSystemAccess"] = "ContentFileSystemAccess";
    BackForwardCacheNotRestoredReason2["ContentMediaDevicesDispatcherHost"] = "ContentMediaDevicesDispatcherHost";
    BackForwardCacheNotRestoredReason2["ContentWebBluetooth"] = "ContentWebBluetooth";
    BackForwardCacheNotRestoredReason2["ContentWebUSB"] = "ContentWebUSB";
    BackForwardCacheNotRestoredReason2["ContentMediaSessionService"] = "ContentMediaSessionService";
    BackForwardCacheNotRestoredReason2["ContentScreenReader"] = "ContentScreenReader";
    BackForwardCacheNotRestoredReason2["ContentDiscarded"] = "ContentDiscarded";
    BackForwardCacheNotRestoredReason2["EmbedderPopupBlockerTabHelper"] = "EmbedderPopupBlockerTabHelper";
    BackForwardCacheNotRestoredReason2["EmbedderSafeBrowsingTriggeredPopupBlocker"] = "EmbedderSafeBrowsingTriggeredPopupBlocker";
    BackForwardCacheNotRestoredReason2["EmbedderSafeBrowsingThreatDetails"] = "EmbedderSafeBrowsingThreatDetails";
    BackForwardCacheNotRestoredReason2["EmbedderAppBannerManager"] = "EmbedderAppBannerManager";
    BackForwardCacheNotRestoredReason2["EmbedderDomDistillerViewerSource"] = "EmbedderDomDistillerViewerSource";
    BackForwardCacheNotRestoredReason2["EmbedderDomDistillerSelfDeletingRequestDelegate"] = "EmbedderDomDistillerSelfDeletingRequestDelegate";
    BackForwardCacheNotRestoredReason2["EmbedderOomInterventionTabHelper"] = "EmbedderOomInterventionTabHelper";
    BackForwardCacheNotRestoredReason2["EmbedderOfflinePage"] = "EmbedderOfflinePage";
    BackForwardCacheNotRestoredReason2["EmbedderChromePasswordManagerClientBindCredentialManager"] = "EmbedderChromePasswordManagerClientBindCredentialManager";
    BackForwardCacheNotRestoredReason2["EmbedderPermissionRequestManager"] = "EmbedderPermissionRequestManager";
    BackForwardCacheNotRestoredReason2["EmbedderModalDialog"] = "EmbedderModalDialog";
    BackForwardCacheNotRestoredReason2["EmbedderExtensions"] = "EmbedderExtensions";
    BackForwardCacheNotRestoredReason2["EmbedderExtensionMessaging"] = "EmbedderExtensionMessaging";
    BackForwardCacheNotRestoredReason2["EmbedderExtensionMessagingForOpenPort"] = "EmbedderExtensionMessagingForOpenPort";
    BackForwardCacheNotRestoredReason2["EmbedderExtensionSentMessageToCachedFrame"] = "EmbedderExtensionSentMessageToCachedFrame";
    BackForwardCacheNotRestoredReason2["EmbedderExtensionFrame"] = "EmbedderExtensionFrame";
    BackForwardCacheNotRestoredReason2["EmbedderPrivilegedWebContents"] = "EmbedderPrivilegedWebContents";
    BackForwardCacheNotRestoredReason2["RequestedByWebViewClient"] = "RequestedByWebViewClient";
    BackForwardCacheNotRestoredReason2["PostMessageByWebViewClient"] = "PostMessageByWebViewClient";
    BackForwardCacheNotRestoredReason2["CacheControlNoStoreDeviceBoundSessionTerminated"] = "CacheControlNoStoreDeviceBoundSessionTerminated";
    BackForwardCacheNotRestoredReason2["CacheLimitPrunedOnModerateMemoryPressure"] = "CacheLimitPrunedOnModerateMemoryPressure";
    BackForwardCacheNotRestoredReason2["CacheLimitPrunedOnCriticalMemoryPressure"] = "CacheLimitPrunedOnCriticalMemoryPressure";
  })(BackForwardCacheNotRestoredReason = Page2.BackForwardCacheNotRestoredReason || (Page2.BackForwardCacheNotRestoredReason = {}));
  let BackForwardCacheNotRestoredReasonType;
  ((BackForwardCacheNotRestoredReasonType2) => {
    BackForwardCacheNotRestoredReasonType2["SupportPending"] = "SupportPending";
    BackForwardCacheNotRestoredReasonType2["PageSupportNeeded"] = "PageSupportNeeded";
    BackForwardCacheNotRestoredReasonType2["Circumstantial"] = "Circumstantial";
  })(BackForwardCacheNotRestoredReasonType = Page2.BackForwardCacheNotRestoredReasonType || (Page2.BackForwardCacheNotRestoredReasonType = {}));
  let CaptureScreenshotRequestFormat;
  ((CaptureScreenshotRequestFormat2) => {
    CaptureScreenshotRequestFormat2["Jpeg"] = "jpeg";
    CaptureScreenshotRequestFormat2["Png"] = "png";
    CaptureScreenshotRequestFormat2["Webp"] = "webp";
  })(CaptureScreenshotRequestFormat = Page2.CaptureScreenshotRequestFormat || (Page2.CaptureScreenshotRequestFormat = {}));
  let CaptureSnapshotRequestFormat;
  ((CaptureSnapshotRequestFormat2) => {
    CaptureSnapshotRequestFormat2["MHTML"] = "mhtml";
  })(CaptureSnapshotRequestFormat = Page2.CaptureSnapshotRequestFormat || (Page2.CaptureSnapshotRequestFormat = {}));
  let PrintToPDFRequestTransferMode;
  ((PrintToPDFRequestTransferMode2) => {
    PrintToPDFRequestTransferMode2["ReturnAsBase64"] = "ReturnAsBase64";
    PrintToPDFRequestTransferMode2["ReturnAsStream"] = "ReturnAsStream";
  })(PrintToPDFRequestTransferMode = Page2.PrintToPDFRequestTransferMode || (Page2.PrintToPDFRequestTransferMode = {}));
  let SetDownloadBehaviorRequestBehavior;
  ((SetDownloadBehaviorRequestBehavior2) => {
    SetDownloadBehaviorRequestBehavior2["Deny"] = "deny";
    SetDownloadBehaviorRequestBehavior2["Allow"] = "allow";
    SetDownloadBehaviorRequestBehavior2["Default"] = "default";
  })(SetDownloadBehaviorRequestBehavior = Page2.SetDownloadBehaviorRequestBehavior || (Page2.SetDownloadBehaviorRequestBehavior = {}));
  let SetTouchEmulationEnabledRequestConfiguration;
  ((SetTouchEmulationEnabledRequestConfiguration2) => {
    SetTouchEmulationEnabledRequestConfiguration2["Mobile"] = "mobile";
    SetTouchEmulationEnabledRequestConfiguration2["Desktop"] = "desktop";
  })(SetTouchEmulationEnabledRequestConfiguration = Page2.SetTouchEmulationEnabledRequestConfiguration || (Page2.SetTouchEmulationEnabledRequestConfiguration = {}));
  let StartScreencastRequestFormat;
  ((StartScreencastRequestFormat2) => {
    StartScreencastRequestFormat2["Jpeg"] = "jpeg";
    StartScreencastRequestFormat2["Png"] = "png";
  })(StartScreencastRequestFormat = Page2.StartScreencastRequestFormat || (Page2.StartScreencastRequestFormat = {}));
  let SetWebLifecycleStateRequestState;
  ((SetWebLifecycleStateRequestState2) => {
    SetWebLifecycleStateRequestState2["Frozen"] = "frozen";
    SetWebLifecycleStateRequestState2["Active"] = "active";
  })(SetWebLifecycleStateRequestState = Page2.SetWebLifecycleStateRequestState || (Page2.SetWebLifecycleStateRequestState = {}));
  let SetSPCTransactionModeRequestMode;
  ((SetSPCTransactionModeRequestMode2) => {
    SetSPCTransactionModeRequestMode2["None"] = "none";
    SetSPCTransactionModeRequestMode2["AutoAccept"] = "autoAccept";
    SetSPCTransactionModeRequestMode2["AutoChooseToAuthAnotherWay"] = "autoChooseToAuthAnotherWay";
    SetSPCTransactionModeRequestMode2["AutoReject"] = "autoReject";
    SetSPCTransactionModeRequestMode2["AutoOptOut"] = "autoOptOut";
  })(SetSPCTransactionModeRequestMode = Page2.SetSPCTransactionModeRequestMode || (Page2.SetSPCTransactionModeRequestMode = {}));
  let SetRPHRegistrationModeRequestMode;
  ((SetRPHRegistrationModeRequestMode2) => {
    SetRPHRegistrationModeRequestMode2["None"] = "none";
    SetRPHRegistrationModeRequestMode2["AutoAccept"] = "autoAccept";
    SetRPHRegistrationModeRequestMode2["AutoReject"] = "autoReject";
  })(SetRPHRegistrationModeRequestMode = Page2.SetRPHRegistrationModeRequestMode || (Page2.SetRPHRegistrationModeRequestMode = {}));
  let FileChooserOpenedEventMode;
  ((FileChooserOpenedEventMode2) => {
    FileChooserOpenedEventMode2["SelectSingle"] = "selectSingle";
    FileChooserOpenedEventMode2["SelectMultiple"] = "selectMultiple";
  })(FileChooserOpenedEventMode = Page2.FileChooserOpenedEventMode || (Page2.FileChooserOpenedEventMode = {}));
  let FrameDetachedEventReason;
  ((FrameDetachedEventReason2) => {
    FrameDetachedEventReason2["Remove"] = "remove";
    FrameDetachedEventReason2["Swap"] = "swap";
  })(FrameDetachedEventReason = Page2.FrameDetachedEventReason || (Page2.FrameDetachedEventReason = {}));
  let FrameStartedNavigatingEventNavigationType;
  ((FrameStartedNavigatingEventNavigationType2) => {
    FrameStartedNavigatingEventNavigationType2["Reload"] = "reload";
    FrameStartedNavigatingEventNavigationType2["ReloadBypassingCache"] = "reloadBypassingCache";
    FrameStartedNavigatingEventNavigationType2["Restore"] = "restore";
    FrameStartedNavigatingEventNavigationType2["RestoreWithPost"] = "restoreWithPost";
    FrameStartedNavigatingEventNavigationType2["HistorySameDocument"] = "historySameDocument";
    FrameStartedNavigatingEventNavigationType2["HistoryDifferentDocument"] = "historyDifferentDocument";
    FrameStartedNavigatingEventNavigationType2["SameDocument"] = "sameDocument";
    FrameStartedNavigatingEventNavigationType2["DifferentDocument"] = "differentDocument";
  })(FrameStartedNavigatingEventNavigationType = Page2.FrameStartedNavigatingEventNavigationType || (Page2.FrameStartedNavigatingEventNavigationType = {}));
  let DownloadProgressEventState;
  ((DownloadProgressEventState2) => {
    DownloadProgressEventState2["InProgress"] = "inProgress";
    DownloadProgressEventState2["Completed"] = "completed";
    DownloadProgressEventState2["Canceled"] = "canceled";
  })(DownloadProgressEventState = Page2.DownloadProgressEventState || (Page2.DownloadProgressEventState = {}));
  let NavigatedWithinDocumentEventNavigationType;
  ((NavigatedWithinDocumentEventNavigationType2) => {
    NavigatedWithinDocumentEventNavigationType2["Fragment"] = "fragment";
    NavigatedWithinDocumentEventNavigationType2["HistoryAPI"] = "historyApi";
    NavigatedWithinDocumentEventNavigationType2["Other"] = "other";
  })(NavigatedWithinDocumentEventNavigationType = Page2.NavigatedWithinDocumentEventNavigationType || (Page2.NavigatedWithinDocumentEventNavigationType = {}));
})(Page || (Page = {}));
var Performance;
((Performance2) => {
  let EnableRequestTimeDomain;
  ((EnableRequestTimeDomain2) => {
    EnableRequestTimeDomain2["TimeTicks"] = "timeTicks";
    EnableRequestTimeDomain2["ThreadTicks"] = "threadTicks";
  })(EnableRequestTimeDomain = Performance2.EnableRequestTimeDomain || (Performance2.EnableRequestTimeDomain = {}));
  let SetTimeDomainRequestTimeDomain;
  ((SetTimeDomainRequestTimeDomain2) => {
    SetTimeDomainRequestTimeDomain2["TimeTicks"] = "timeTicks";
    SetTimeDomainRequestTimeDomain2["ThreadTicks"] = "threadTicks";
  })(SetTimeDomainRequestTimeDomain = Performance2.SetTimeDomainRequestTimeDomain || (Performance2.SetTimeDomainRequestTimeDomain = {}));
})(Performance || (Performance = {}));
var Preload;
((Preload2) => {
  let RuleSetErrorType;
  ((RuleSetErrorType2) => {
    RuleSetErrorType2["SourceIsNotJsonObject"] = "SourceIsNotJsonObject";
    RuleSetErrorType2["InvalidRulesSkipped"] = "InvalidRulesSkipped";
    RuleSetErrorType2["InvalidRulesetLevelTag"] = "InvalidRulesetLevelTag";
  })(RuleSetErrorType = Preload2.RuleSetErrorType || (Preload2.RuleSetErrorType = {}));
  let SpeculationAction;
  ((SpeculationAction2) => {
    SpeculationAction2["Prefetch"] = "Prefetch";
    SpeculationAction2["Prerender"] = "Prerender";
    SpeculationAction2["PrerenderUntilScript"] = "PrerenderUntilScript";
  })(SpeculationAction = Preload2.SpeculationAction || (Preload2.SpeculationAction = {}));
  let SpeculationTargetHint;
  ((SpeculationTargetHint2) => {
    SpeculationTargetHint2["Blank"] = "Blank";
    SpeculationTargetHint2["Self"] = "Self";
  })(SpeculationTargetHint = Preload2.SpeculationTargetHint || (Preload2.SpeculationTargetHint = {}));
  let PrerenderFinalStatus;
  ((PrerenderFinalStatus2) => {
    PrerenderFinalStatus2["Activated"] = "Activated";
    PrerenderFinalStatus2["Destroyed"] = "Destroyed";
    PrerenderFinalStatus2["LowEndDevice"] = "LowEndDevice";
    PrerenderFinalStatus2["InvalidSchemeRedirect"] = "InvalidSchemeRedirect";
    PrerenderFinalStatus2["InvalidSchemeNavigation"] = "InvalidSchemeNavigation";
    PrerenderFinalStatus2["NavigationRequestBlockedByCsp"] = "NavigationRequestBlockedByCsp";
    PrerenderFinalStatus2["MojoBinderPolicy"] = "MojoBinderPolicy";
    PrerenderFinalStatus2["RendererProcessCrashed"] = "RendererProcessCrashed";
    PrerenderFinalStatus2["RendererProcessKilled"] = "RendererProcessKilled";
    PrerenderFinalStatus2["Download"] = "Download";
    PrerenderFinalStatus2["TriggerDestroyed"] = "TriggerDestroyed";
    PrerenderFinalStatus2["NavigationNotCommitted"] = "NavigationNotCommitted";
    PrerenderFinalStatus2["NavigationBadHttpStatus"] = "NavigationBadHttpStatus";
    PrerenderFinalStatus2["ClientCertRequested"] = "ClientCertRequested";
    PrerenderFinalStatus2["NavigationRequestNetworkError"] = "NavigationRequestNetworkError";
    PrerenderFinalStatus2["CancelAllHostsForTesting"] = "CancelAllHostsForTesting";
    PrerenderFinalStatus2["DidFailLoad"] = "DidFailLoad";
    PrerenderFinalStatus2["Stop"] = "Stop";
    PrerenderFinalStatus2["SslCertificateError"] = "SslCertificateError";
    PrerenderFinalStatus2["LoginAuthRequested"] = "LoginAuthRequested";
    PrerenderFinalStatus2["UaChangeRequiresReload"] = "UaChangeRequiresReload";
    PrerenderFinalStatus2["BlockedByClient"] = "BlockedByClient";
    PrerenderFinalStatus2["AudioOutputDeviceRequested"] = "AudioOutputDeviceRequested";
    PrerenderFinalStatus2["MixedContent"] = "MixedContent";
    PrerenderFinalStatus2["TriggerBackgrounded"] = "TriggerBackgrounded";
    PrerenderFinalStatus2["MemoryLimitExceeded"] = "MemoryLimitExceeded";
    PrerenderFinalStatus2["DataSaverEnabled"] = "DataSaverEnabled";
    PrerenderFinalStatus2["TriggerUrlHasEffectiveUrl"] = "TriggerUrlHasEffectiveUrl";
    PrerenderFinalStatus2["ActivatedBeforeStarted"] = "ActivatedBeforeStarted";
    PrerenderFinalStatus2["InactivePageRestriction"] = "InactivePageRestriction";
    PrerenderFinalStatus2["StartFailed"] = "StartFailed";
    PrerenderFinalStatus2["TimeoutBackgrounded"] = "TimeoutBackgrounded";
    PrerenderFinalStatus2["CrossSiteRedirectInInitialNavigation"] = "CrossSiteRedirectInInitialNavigation";
    PrerenderFinalStatus2["CrossSiteNavigationInInitialNavigation"] = "CrossSiteNavigationInInitialNavigation";
    PrerenderFinalStatus2["SameSiteCrossOriginRedirectNotOptInInInitialNavigation"] = "SameSiteCrossOriginRedirectNotOptInInInitialNavigation";
    PrerenderFinalStatus2["SameSiteCrossOriginNavigationNotOptInInInitialNavigation"] = "SameSiteCrossOriginNavigationNotOptInInInitialNavigation";
    PrerenderFinalStatus2["ActivationNavigationParameterMismatch"] = "ActivationNavigationParameterMismatch";
    PrerenderFinalStatus2["ActivatedInBackground"] = "ActivatedInBackground";
    PrerenderFinalStatus2["EmbedderHostDisallowed"] = "EmbedderHostDisallowed";
    PrerenderFinalStatus2["ActivationNavigationDestroyedBeforeSuccess"] = "ActivationNavigationDestroyedBeforeSuccess";
    PrerenderFinalStatus2["TabClosedByUserGesture"] = "TabClosedByUserGesture";
    PrerenderFinalStatus2["TabClosedWithoutUserGesture"] = "TabClosedWithoutUserGesture";
    PrerenderFinalStatus2["PrimaryMainFrameRendererProcessCrashed"] = "PrimaryMainFrameRendererProcessCrashed";
    PrerenderFinalStatus2["PrimaryMainFrameRendererProcessKilled"] = "PrimaryMainFrameRendererProcessKilled";
    PrerenderFinalStatus2["ActivationFramePolicyNotCompatible"] = "ActivationFramePolicyNotCompatible";
    PrerenderFinalStatus2["PreloadingDisabled"] = "PreloadingDisabled";
    PrerenderFinalStatus2["BatterySaverEnabled"] = "BatterySaverEnabled";
    PrerenderFinalStatus2["ActivatedDuringMainFrameNavigation"] = "ActivatedDuringMainFrameNavigation";
    PrerenderFinalStatus2["PreloadingUnsupportedByWebContents"] = "PreloadingUnsupportedByWebContents";
    PrerenderFinalStatus2["CrossSiteRedirectInMainFrameNavigation"] = "CrossSiteRedirectInMainFrameNavigation";
    PrerenderFinalStatus2["CrossSiteNavigationInMainFrameNavigation"] = "CrossSiteNavigationInMainFrameNavigation";
    PrerenderFinalStatus2["SameSiteCrossOriginRedirectNotOptInInMainFrameNavigation"] = "SameSiteCrossOriginRedirectNotOptInInMainFrameNavigation";
    PrerenderFinalStatus2["SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation"] = "SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation";
    PrerenderFinalStatus2["MemoryPressureOnTrigger"] = "MemoryPressureOnTrigger";
    PrerenderFinalStatus2["MemoryPressureAfterTriggered"] = "MemoryPressureAfterTriggered";
    PrerenderFinalStatus2["PrerenderingDisabledByDevTools"] = "PrerenderingDisabledByDevTools";
    PrerenderFinalStatus2["SpeculationRuleRemoved"] = "SpeculationRuleRemoved";
    PrerenderFinalStatus2["ActivatedWithAuxiliaryBrowsingContexts"] = "ActivatedWithAuxiliaryBrowsingContexts";
    PrerenderFinalStatus2["MaxNumOfRunningEagerPrerendersExceeded"] = "MaxNumOfRunningEagerPrerendersExceeded";
    PrerenderFinalStatus2["MaxNumOfRunningNonEagerPrerendersExceeded"] = "MaxNumOfRunningNonEagerPrerendersExceeded";
    PrerenderFinalStatus2["MaxNumOfRunningEmbedderPrerendersExceeded"] = "MaxNumOfRunningEmbedderPrerendersExceeded";
    PrerenderFinalStatus2["PrerenderingUrlHasEffectiveUrl"] = "PrerenderingUrlHasEffectiveUrl";
    PrerenderFinalStatus2["RedirectedPrerenderingUrlHasEffectiveUrl"] = "RedirectedPrerenderingUrlHasEffectiveUrl";
    PrerenderFinalStatus2["ActivationUrlHasEffectiveUrl"] = "ActivationUrlHasEffectiveUrl";
    PrerenderFinalStatus2["JavaScriptInterfaceAdded"] = "JavaScriptInterfaceAdded";
    PrerenderFinalStatus2["JavaScriptInterfaceRemoved"] = "JavaScriptInterfaceRemoved";
    PrerenderFinalStatus2["AllPrerenderingCanceled"] = "AllPrerenderingCanceled";
    PrerenderFinalStatus2["WindowClosed"] = "WindowClosed";
    PrerenderFinalStatus2["SlowNetwork"] = "SlowNetwork";
    PrerenderFinalStatus2["OtherPrerenderedPageActivated"] = "OtherPrerenderedPageActivated";
    PrerenderFinalStatus2["V8OptimizerDisabled"] = "V8OptimizerDisabled";
    PrerenderFinalStatus2["PrerenderFailedDuringPrefetch"] = "PrerenderFailedDuringPrefetch";
    PrerenderFinalStatus2["BrowsingDataRemoved"] = "BrowsingDataRemoved";
    PrerenderFinalStatus2["PrerenderHostReused"] = "PrerenderHostReused";
    PrerenderFinalStatus2["FormSubmitWhenPrerendering"] = "FormSubmitWhenPrerendering";
    PrerenderFinalStatus2["CrossDocumentRestart"] = "CrossDocumentRestart";
  })(PrerenderFinalStatus = Preload2.PrerenderFinalStatus || (Preload2.PrerenderFinalStatus = {}));
  let PreloadingStatus;
  ((PreloadingStatus2) => {
    PreloadingStatus2["Pending"] = "Pending";
    PreloadingStatus2["Running"] = "Running";
    PreloadingStatus2["Ready"] = "Ready";
    PreloadingStatus2["Success"] = "Success";
    PreloadingStatus2["Failure"] = "Failure";
    PreloadingStatus2["NotSupported"] = "NotSupported";
  })(PreloadingStatus = Preload2.PreloadingStatus || (Preload2.PreloadingStatus = {}));
  let PrefetchStatus;
  ((PrefetchStatus2) => {
    PrefetchStatus2["PrefetchAllowed"] = "PrefetchAllowed";
    PrefetchStatus2["PrefetchFailedIneligibleRedirect"] = "PrefetchFailedIneligibleRedirect";
    PrefetchStatus2["PrefetchFailedInvalidRedirect"] = "PrefetchFailedInvalidRedirect";
    PrefetchStatus2["PrefetchFailedMIMENotSupported"] = "PrefetchFailedMIMENotSupported";
    PrefetchStatus2["PrefetchFailedNetError"] = "PrefetchFailedNetError";
    PrefetchStatus2["PrefetchFailedNon2XX"] = "PrefetchFailedNon2XX";
    PrefetchStatus2["PrefetchEvictedAfterBrowsingDataRemoved"] = "PrefetchEvictedAfterBrowsingDataRemoved";
    PrefetchStatus2["PrefetchEvictedAfterCandidateRemoved"] = "PrefetchEvictedAfterCandidateRemoved";
    PrefetchStatus2["PrefetchEvictedForNewerPrefetch"] = "PrefetchEvictedForNewerPrefetch";
    PrefetchStatus2["PrefetchHeldback"] = "PrefetchHeldback";
    PrefetchStatus2["PrefetchIneligibleRetryAfter"] = "PrefetchIneligibleRetryAfter";
    PrefetchStatus2["PrefetchIsPrivacyDecoy"] = "PrefetchIsPrivacyDecoy";
    PrefetchStatus2["PrefetchIsStale"] = "PrefetchIsStale";
    PrefetchStatus2["PrefetchNotEligibleBlockedByConnectionAllowlist"] = "PrefetchNotEligibleBlockedByConnectionAllowlist";
    PrefetchStatus2["PrefetchNotEligibleBrowserContextOffTheRecord"] = "PrefetchNotEligibleBrowserContextOffTheRecord";
    PrefetchStatus2["PrefetchNotEligibleCrossOrigin"] = "PrefetchNotEligibleCrossOrigin";
    PrefetchStatus2["PrefetchNotEligibleDataSaverEnabled"] = "PrefetchNotEligibleDataSaverEnabled";
    PrefetchStatus2["PrefetchNotEligibleExistingProxy"] = "PrefetchNotEligibleExistingProxy";
    PrefetchStatus2["PrefetchNotEligibleHostIsNonUnique"] = "PrefetchNotEligibleHostIsNonUnique";
    PrefetchStatus2["PrefetchNotEligibleNonDefaultStoragePartition"] = "PrefetchNotEligibleNonDefaultStoragePartition";
    PrefetchStatus2["PrefetchNotEligibleSameSiteCrossOriginPrefetchRequiredProxy"] = "PrefetchNotEligibleSameSiteCrossOriginPrefetchRequiredProxy";
    PrefetchStatus2["PrefetchNotEligibleSchemeIsNotHttps"] = "PrefetchNotEligibleSchemeIsNotHttps";
    PrefetchStatus2["PrefetchNotEligibleUserHasCookies"] = "PrefetchNotEligibleUserHasCookies";
    PrefetchStatus2["PrefetchNotEligibleUserHasServiceWorker"] = "PrefetchNotEligibleUserHasServiceWorker";
    PrefetchStatus2["PrefetchNotEligibleUserHasServiceWorkerNoFetchHandler"] = "PrefetchNotEligibleUserHasServiceWorkerNoFetchHandler";
    PrefetchStatus2["PrefetchNotEligibleRedirectFromServiceWorker"] = "PrefetchNotEligibleRedirectFromServiceWorker";
    PrefetchStatus2["PrefetchNotEligibleRedirectToServiceWorker"] = "PrefetchNotEligibleRedirectToServiceWorker";
    PrefetchStatus2["PrefetchNotEligibleBatterySaverEnabled"] = "PrefetchNotEligibleBatterySaverEnabled";
    PrefetchStatus2["PrefetchNotEligiblePreloadingDisabled"] = "PrefetchNotEligiblePreloadingDisabled";
    PrefetchStatus2["PrefetchNotFinishedInTime"] = "PrefetchNotFinishedInTime";
    PrefetchStatus2["PrefetchNotStarted"] = "PrefetchNotStarted";
    PrefetchStatus2["PrefetchNotUsedCookiesChanged"] = "PrefetchNotUsedCookiesChanged";
    PrefetchStatus2["PrefetchProxyNotAvailable"] = "PrefetchProxyNotAvailable";
    PrefetchStatus2["PrefetchResponseUsed"] = "PrefetchResponseUsed";
    PrefetchStatus2["PrefetchSuccessfulButNotUsed"] = "PrefetchSuccessfulButNotUsed";
    PrefetchStatus2["PrefetchNotUsedProbeFailed"] = "PrefetchNotUsedProbeFailed";
    PrefetchStatus2["PrefetchCancelledOnUserNavigation"] = "PrefetchCancelledOnUserNavigation";
  })(PrefetchStatus = Preload2.PrefetchStatus || (Preload2.PrefetchStatus = {}));
})(Preload || (Preload = {}));
var Security;
((Security2) => {
  let MixedContentType;
  ((MixedContentType2) => {
    MixedContentType2["Blockable"] = "blockable";
    MixedContentType2["OptionallyBlockable"] = "optionally-blockable";
    MixedContentType2["None"] = "none";
  })(MixedContentType = Security2.MixedContentType || (Security2.MixedContentType = {}));
  let SecurityState;
  ((SecurityState2) => {
    SecurityState2["Unknown"] = "unknown";
    SecurityState2["Neutral"] = "neutral";
    SecurityState2["Insecure"] = "insecure";
    SecurityState2["Secure"] = "secure";
    SecurityState2["Info"] = "info";
    SecurityState2["InsecureBroken"] = "insecure-broken";
  })(SecurityState = Security2.SecurityState || (Security2.SecurityState = {}));
  let SafetyTipStatus;
  ((SafetyTipStatus2) => {
    SafetyTipStatus2["BadReputation"] = "badReputation";
    SafetyTipStatus2["Lookalike"] = "lookalike";
  })(SafetyTipStatus = Security2.SafetyTipStatus || (Security2.SafetyTipStatus = {}));
  let CertificateErrorAction;
  ((CertificateErrorAction2) => {
    CertificateErrorAction2["Continue"] = "continue";
    CertificateErrorAction2["Cancel"] = "cancel";
  })(CertificateErrorAction = Security2.CertificateErrorAction || (Security2.CertificateErrorAction = {}));
})(Security || (Security = {}));
var ServiceWorker;
((ServiceWorker2) => {
  let ServiceWorkerVersionRunningStatus;
  ((ServiceWorkerVersionRunningStatus2) => {
    ServiceWorkerVersionRunningStatus2["Stopped"] = "stopped";
    ServiceWorkerVersionRunningStatus2["Starting"] = "starting";
    ServiceWorkerVersionRunningStatus2["Running"] = "running";
    ServiceWorkerVersionRunningStatus2["Stopping"] = "stopping";
  })(ServiceWorkerVersionRunningStatus = ServiceWorker2.ServiceWorkerVersionRunningStatus || (ServiceWorker2.ServiceWorkerVersionRunningStatus = {}));
  let ServiceWorkerVersionStatus;
  ((ServiceWorkerVersionStatus2) => {
    ServiceWorkerVersionStatus2["New"] = "new";
    ServiceWorkerVersionStatus2["Installing"] = "installing";
    ServiceWorkerVersionStatus2["Installed"] = "installed";
    ServiceWorkerVersionStatus2["Activating"] = "activating";
    ServiceWorkerVersionStatus2["Activated"] = "activated";
    ServiceWorkerVersionStatus2["Redundant"] = "redundant";
  })(ServiceWorkerVersionStatus = ServiceWorker2.ServiceWorkerVersionStatus || (ServiceWorker2.ServiceWorkerVersionStatus = {}));
  let ServiceWorkerRouterSourceType;
  ((ServiceWorkerRouterSourceType2) => {
    ServiceWorkerRouterSourceType2["Cache"] = "cache";
    ServiceWorkerRouterSourceType2["FetchEvent"] = "fetchEvent";
    ServiceWorkerRouterSourceType2["Network"] = "network";
    ServiceWorkerRouterSourceType2["RaceNetworkAndFetchHandler"] = "raceNetworkAndFetchHandler";
    ServiceWorkerRouterSourceType2["RaceNetworkAndCache"] = "raceNetworkAndCache";
    ServiceWorkerRouterSourceType2["SourceDict"] = "sourceDict";
  })(ServiceWorkerRouterSourceType = ServiceWorker2.ServiceWorkerRouterSourceType || (ServiceWorker2.ServiceWorkerRouterSourceType = {}));
})(ServiceWorker || (ServiceWorker = {}));
var SmartCardEmulation;
((SmartCardEmulation2) => {
  let ResultCode;
  ((ResultCode2) => {
    ResultCode2["Success"] = "success";
    ResultCode2["RemovedCard"] = "removed-card";
    ResultCode2["ResetCard"] = "reset-card";
    ResultCode2["UnpoweredCard"] = "unpowered-card";
    ResultCode2["UnresponsiveCard"] = "unresponsive-card";
    ResultCode2["UnsupportedCard"] = "unsupported-card";
    ResultCode2["ReaderUnavailable"] = "reader-unavailable";
    ResultCode2["SharingViolation"] = "sharing-violation";
    ResultCode2["NotTransacted"] = "not-transacted";
    ResultCode2["NoSmartcard"] = "no-smartcard";
    ResultCode2["ProtoMismatch"] = "proto-mismatch";
    ResultCode2["SystemCancelled"] = "system-cancelled";
    ResultCode2["NotReady"] = "not-ready";
    ResultCode2["Cancelled"] = "cancelled";
    ResultCode2["InsufficientBuffer"] = "insufficient-buffer";
    ResultCode2["InvalidHandle"] = "invalid-handle";
    ResultCode2["InvalidParameter"] = "invalid-parameter";
    ResultCode2["InvalidValue"] = "invalid-value";
    ResultCode2["NoMemory"] = "no-memory";
    ResultCode2["Timeout"] = "timeout";
    ResultCode2["UnknownReader"] = "unknown-reader";
    ResultCode2["UnsupportedFeature"] = "unsupported-feature";
    ResultCode2["NoReadersAvailable"] = "no-readers-available";
    ResultCode2["ServiceStopped"] = "service-stopped";
    ResultCode2["NoService"] = "no-service";
    ResultCode2["CommError"] = "comm-error";
    ResultCode2["InternalError"] = "internal-error";
    ResultCode2["ServerTooBusy"] = "server-too-busy";
    ResultCode2["Unexpected"] = "unexpected";
    ResultCode2["Shutdown"] = "shutdown";
    ResultCode2["UnknownCard"] = "unknown-card";
    ResultCode2["Unknown"] = "unknown";
  })(ResultCode = SmartCardEmulation2.ResultCode || (SmartCardEmulation2.ResultCode = {}));
  let ShareMode;
  ((ShareMode2) => {
    ShareMode2["Shared"] = "shared";
    ShareMode2["Exclusive"] = "exclusive";
    ShareMode2["Direct"] = "direct";
  })(ShareMode = SmartCardEmulation2.ShareMode || (SmartCardEmulation2.ShareMode = {}));
  let Disposition;
  ((Disposition2) => {
    Disposition2["LeaveCard"] = "leave-card";
    Disposition2["ResetCard"] = "reset-card";
    Disposition2["UnpowerCard"] = "unpower-card";
    Disposition2["EjectCard"] = "eject-card";
  })(Disposition = SmartCardEmulation2.Disposition || (SmartCardEmulation2.Disposition = {}));
  let ConnectionState;
  ((ConnectionState2) => {
    ConnectionState2["Absent"] = "absent";
    ConnectionState2["Present"] = "present";
    ConnectionState2["Swallowed"] = "swallowed";
    ConnectionState2["Powered"] = "powered";
    ConnectionState2["Negotiable"] = "negotiable";
    ConnectionState2["Specific"] = "specific";
  })(ConnectionState = SmartCardEmulation2.ConnectionState || (SmartCardEmulation2.ConnectionState = {}));
  let Protocol;
  ((Protocol2) => {
    Protocol2["T0"] = "t0";
    Protocol2["T1"] = "t1";
    Protocol2["Raw"] = "raw";
  })(Protocol = SmartCardEmulation2.Protocol || (SmartCardEmulation2.Protocol = {}));
})(SmartCardEmulation || (SmartCardEmulation = {}));
var Storage;
((Storage2) => {
  let StorageType;
  ((StorageType2) => {
    StorageType2["Cookies"] = "cookies";
    StorageType2["File_systems"] = "file_systems";
    StorageType2["Indexeddb"] = "indexeddb";
    StorageType2["Local_storage"] = "local_storage";
    StorageType2["Shader_cache"] = "shader_cache";
    StorageType2["Websql"] = "websql";
    StorageType2["Service_workers"] = "service_workers";
    StorageType2["Cache_storage"] = "cache_storage";
    StorageType2["Storage_buckets"] = "storage_buckets";
    StorageType2["All"] = "all";
    StorageType2["Other"] = "other";
  })(StorageType = Storage2.StorageType || (Storage2.StorageType = {}));
  let StorageBucketsDurability;
  ((StorageBucketsDurability2) => {
    StorageBucketsDurability2["Relaxed"] = "relaxed";
    StorageBucketsDurability2["Strict"] = "strict";
  })(StorageBucketsDurability = Storage2.StorageBucketsDurability || (Storage2.StorageBucketsDurability = {}));
})(Storage || (Storage = {}));
var SystemInfo;
((SystemInfo2) => {
  let SubsamplingFormat;
  ((SubsamplingFormat2) => {
    SubsamplingFormat2["Yuv420"] = "yuv420";
    SubsamplingFormat2["Yuv422"] = "yuv422";
    SubsamplingFormat2["Yuv444"] = "yuv444";
  })(SubsamplingFormat = SystemInfo2.SubsamplingFormat || (SystemInfo2.SubsamplingFormat = {}));
  let ImageType;
  ((ImageType2) => {
    ImageType2["Jpeg"] = "jpeg";
    ImageType2["Webp"] = "webp";
    ImageType2["Unknown"] = "unknown";
  })(ImageType = SystemInfo2.ImageType || (SystemInfo2.ImageType = {}));
})(SystemInfo || (SystemInfo = {}));
var Target2;
((Target3) => {
  let WindowState;
  ((WindowState2) => {
    WindowState2["Normal"] = "normal";
    WindowState2["Minimized"] = "minimized";
    WindowState2["Maximized"] = "maximized";
    WindowState2["Fullscreen"] = "fullscreen";
  })(WindowState = Target3.WindowState || (Target3.WindowState = {}));
})(Target2 || (Target2 = {}));
var Tracing;
((Tracing2) => {
  let TraceConfigRecordMode;
  ((TraceConfigRecordMode2) => {
    TraceConfigRecordMode2["RecordUntilFull"] = "recordUntilFull";
    TraceConfigRecordMode2["RecordContinuously"] = "recordContinuously";
    TraceConfigRecordMode2["RecordAsMuchAsPossible"] = "recordAsMuchAsPossible";
    TraceConfigRecordMode2["EchoToConsole"] = "echoToConsole";
  })(TraceConfigRecordMode = Tracing2.TraceConfigRecordMode || (Tracing2.TraceConfigRecordMode = {}));
  let StreamFormat;
  ((StreamFormat2) => {
    StreamFormat2["Json"] = "json";
    StreamFormat2["Proto"] = "proto";
  })(StreamFormat = Tracing2.StreamFormat || (Tracing2.StreamFormat = {}));
  let StreamCompression;
  ((StreamCompression2) => {
    StreamCompression2["None"] = "none";
    StreamCompression2["Gzip"] = "gzip";
  })(StreamCompression = Tracing2.StreamCompression || (Tracing2.StreamCompression = {}));
  let MemoryDumpLevelOfDetail;
  ((MemoryDumpLevelOfDetail2) => {
    MemoryDumpLevelOfDetail2["Background"] = "background";
    MemoryDumpLevelOfDetail2["Light"] = "light";
    MemoryDumpLevelOfDetail2["Detailed"] = "detailed";
  })(MemoryDumpLevelOfDetail = Tracing2.MemoryDumpLevelOfDetail || (Tracing2.MemoryDumpLevelOfDetail = {}));
  let TracingBackend;
  ((TracingBackend2) => {
    TracingBackend2["Auto"] = "auto";
    TracingBackend2["Chrome"] = "chrome";
    TracingBackend2["System"] = "system";
  })(TracingBackend = Tracing2.TracingBackend || (Tracing2.TracingBackend = {}));
  let StartRequestTransferMode;
  ((StartRequestTransferMode2) => {
    StartRequestTransferMode2["ReportEvents"] = "ReportEvents";
    StartRequestTransferMode2["ReturnAsStream"] = "ReturnAsStream";
  })(StartRequestTransferMode = Tracing2.StartRequestTransferMode || (Tracing2.StartRequestTransferMode = {}));
})(Tracing || (Tracing = {}));
var WebAudio;
((WebAudio2) => {
  let ContextType;
  ((ContextType2) => {
    ContextType2["Realtime"] = "realtime";
    ContextType2["Offline"] = "offline";
  })(ContextType = WebAudio2.ContextType || (WebAudio2.ContextType = {}));
  let ContextState;
  ((ContextState2) => {
    ContextState2["Suspended"] = "suspended";
    ContextState2["Running"] = "running";
    ContextState2["Closed"] = "closed";
    ContextState2["Interrupted"] = "interrupted";
  })(ContextState = WebAudio2.ContextState || (WebAudio2.ContextState = {}));
  let ChannelCountMode;
  ((ChannelCountMode2) => {
    ChannelCountMode2["ClampedMax"] = "clamped-max";
    ChannelCountMode2["Explicit"] = "explicit";
    ChannelCountMode2["Max"] = "max";
  })(ChannelCountMode = WebAudio2.ChannelCountMode || (WebAudio2.ChannelCountMode = {}));
  let ChannelInterpretation;
  ((ChannelInterpretation2) => {
    ChannelInterpretation2["Discrete"] = "discrete";
    ChannelInterpretation2["Speakers"] = "speakers";
  })(ChannelInterpretation = WebAudio2.ChannelInterpretation || (WebAudio2.ChannelInterpretation = {}));
  let AutomationRate;
  ((AutomationRate2) => {
    AutomationRate2["ARate"] = "a-rate";
    AutomationRate2["KRate"] = "k-rate";
  })(AutomationRate = WebAudio2.AutomationRate || (WebAudio2.AutomationRate = {}));
})(WebAudio || (WebAudio = {}));
var WebAuthn;
((WebAuthn2) => {
  let AuthenticatorProtocol;
  ((AuthenticatorProtocol2) => {
    AuthenticatorProtocol2["U2f"] = "u2f";
    AuthenticatorProtocol2["Ctap2"] = "ctap2";
  })(AuthenticatorProtocol = WebAuthn2.AuthenticatorProtocol || (WebAuthn2.AuthenticatorProtocol = {}));
  let Ctap2Version;
  ((Ctap2Version2) => {
    Ctap2Version2["Ctap2_0"] = "ctap2_0";
    Ctap2Version2["Ctap2_1"] = "ctap2_1";
    Ctap2Version2["Ctap2_2"] = "ctap2_2";
  })(Ctap2Version = WebAuthn2.Ctap2Version || (WebAuthn2.Ctap2Version = {}));
  let AuthenticatorTransport;
  ((AuthenticatorTransport2) => {
    AuthenticatorTransport2["Usb"] = "usb";
    AuthenticatorTransport2["Nfc"] = "nfc";
    AuthenticatorTransport2["Ble"] = "ble";
    AuthenticatorTransport2["Cable"] = "cable";
    AuthenticatorTransport2["Hybrid"] = "hybrid";
    AuthenticatorTransport2["SmartCard"] = "smart-card";
    AuthenticatorTransport2["Internal"] = "internal";
  })(AuthenticatorTransport = WebAuthn2.AuthenticatorTransport || (WebAuthn2.AuthenticatorTransport = {}));
})(WebAuthn || (WebAuthn = {}));
var WebMCP;
((WebMCP2) => {
  let InvocationStatus;
  ((InvocationStatus2) => {
    InvocationStatus2["Completed"] = "Completed";
    InvocationStatus2["Canceled"] = "Canceled";
    InvocationStatus2["Error"] = "Error";
  })(InvocationStatus = WebMCP2.InvocationStatus || (WebMCP2.InvocationStatus = {}));
})(WebMCP || (WebMCP = {}));
var Debugger;
((Debugger2) => {
  let ScopeType;
  ((ScopeType2) => {
    ScopeType2["Global"] = "global";
    ScopeType2["Local"] = "local";
    ScopeType2["With"] = "with";
    ScopeType2["Closure"] = "closure";
    ScopeType2["Catch"] = "catch";
    ScopeType2["Block"] = "block";
    ScopeType2["Script"] = "script";
    ScopeType2["Eval"] = "eval";
    ScopeType2["Module"] = "module";
    ScopeType2["WasmExpressionStack"] = "wasm-expression-stack";
  })(ScopeType = Debugger2.ScopeType || (Debugger2.ScopeType = {}));
  let BreakLocationType;
  ((BreakLocationType2) => {
    BreakLocationType2["DebuggerStatement"] = "debuggerStatement";
    BreakLocationType2["Call"] = "call";
    BreakLocationType2["Return"] = "return";
  })(BreakLocationType = Debugger2.BreakLocationType || (Debugger2.BreakLocationType = {}));
  let ScriptLanguage;
  ((ScriptLanguage2) => {
    ScriptLanguage2["JavaScript"] = "JavaScript";
    ScriptLanguage2["WebAssembly"] = "WebAssembly";
  })(ScriptLanguage = Debugger2.ScriptLanguage || (Debugger2.ScriptLanguage = {}));
  let DebugSymbolsType;
  ((DebugSymbolsType2) => {
    DebugSymbolsType2["SourceMap"] = "SourceMap";
    DebugSymbolsType2["EmbeddedDWARF"] = "EmbeddedDWARF";
    DebugSymbolsType2["ExternalDWARF"] = "ExternalDWARF";
  })(DebugSymbolsType = Debugger2.DebugSymbolsType || (Debugger2.DebugSymbolsType = {}));
  let ContinueToLocationRequestTargetCallFrames;
  ((ContinueToLocationRequestTargetCallFrames2) => {
    ContinueToLocationRequestTargetCallFrames2["Any"] = "any";
    ContinueToLocationRequestTargetCallFrames2["Current"] = "current";
  })(ContinueToLocationRequestTargetCallFrames = Debugger2.ContinueToLocationRequestTargetCallFrames || (Debugger2.ContinueToLocationRequestTargetCallFrames = {}));
  let RestartFrameRequestMode;
  ((RestartFrameRequestMode2) => {
    RestartFrameRequestMode2["StepInto"] = "StepInto";
  })(RestartFrameRequestMode = Debugger2.RestartFrameRequestMode || (Debugger2.RestartFrameRequestMode = {}));
  let SetInstrumentationBreakpointRequestInstrumentation;
  ((SetInstrumentationBreakpointRequestInstrumentation2) => {
    SetInstrumentationBreakpointRequestInstrumentation2["BeforeScriptExecution"] = "beforeScriptExecution";
    SetInstrumentationBreakpointRequestInstrumentation2["BeforeScriptWithSourceMapExecution"] = "beforeScriptWithSourceMapExecution";
  })(SetInstrumentationBreakpointRequestInstrumentation = Debugger2.SetInstrumentationBreakpointRequestInstrumentation || (Debugger2.SetInstrumentationBreakpointRequestInstrumentation = {}));
  let SetPauseOnExceptionsRequestState;
  ((SetPauseOnExceptionsRequestState2) => {
    SetPauseOnExceptionsRequestState2["None"] = "none";
    SetPauseOnExceptionsRequestState2["Caught"] = "caught";
    SetPauseOnExceptionsRequestState2["Uncaught"] = "uncaught";
    SetPauseOnExceptionsRequestState2["All"] = "all";
  })(SetPauseOnExceptionsRequestState = Debugger2.SetPauseOnExceptionsRequestState || (Debugger2.SetPauseOnExceptionsRequestState = {}));
  let SetScriptSourceResponseStatus;
  ((SetScriptSourceResponseStatus2) => {
    SetScriptSourceResponseStatus2["Ok"] = "Ok";
    SetScriptSourceResponseStatus2["CompileError"] = "CompileError";
    SetScriptSourceResponseStatus2["BlockedByActiveGenerator"] = "BlockedByActiveGenerator";
    SetScriptSourceResponseStatus2["BlockedByActiveFunction"] = "BlockedByActiveFunction";
    SetScriptSourceResponseStatus2["BlockedByTopLevelEsModuleChange"] = "BlockedByTopLevelEsModuleChange";
  })(SetScriptSourceResponseStatus = Debugger2.SetScriptSourceResponseStatus || (Debugger2.SetScriptSourceResponseStatus = {}));
  let PausedEventReason;
  ((PausedEventReason2) => {
    PausedEventReason2["Ambiguous"] = "ambiguous";
    PausedEventReason2["Assert"] = "assert";
    PausedEventReason2["CSPViolation"] = "CSPViolation";
    PausedEventReason2["DebugCommand"] = "debugCommand";
    PausedEventReason2["DOM"] = "DOM";
    PausedEventReason2["EventListener"] = "EventListener";
    PausedEventReason2["Exception"] = "exception";
    PausedEventReason2["Instrumentation"] = "instrumentation";
    PausedEventReason2["OOM"] = "OOM";
    PausedEventReason2["Other"] = "other";
    PausedEventReason2["PromiseRejection"] = "promiseRejection";
    PausedEventReason2["XHR"] = "XHR";
    PausedEventReason2["Step"] = "step";
  })(PausedEventReason = Debugger2.PausedEventReason || (Debugger2.PausedEventReason = {}));
})(Debugger || (Debugger = {}));
var Runtime;
((Runtime3) => {
  let SerializationOptionsSerialization;
  ((SerializationOptionsSerialization2) => {
    SerializationOptionsSerialization2["Deep"] = "deep";
    SerializationOptionsSerialization2["Json"] = "json";
    SerializationOptionsSerialization2["IdOnly"] = "idOnly";
  })(SerializationOptionsSerialization = Runtime3.SerializationOptionsSerialization || (Runtime3.SerializationOptionsSerialization = {}));
  let DeepSerializedValueType;
  ((DeepSerializedValueType2) => {
    DeepSerializedValueType2["Undefined"] = "undefined";
    DeepSerializedValueType2["Null"] = "null";
    DeepSerializedValueType2["String"] = "string";
    DeepSerializedValueType2["Number"] = "number";
    DeepSerializedValueType2["Boolean"] = "boolean";
    DeepSerializedValueType2["Bigint"] = "bigint";
    DeepSerializedValueType2["Regexp"] = "regexp";
    DeepSerializedValueType2["Date"] = "date";
    DeepSerializedValueType2["Symbol"] = "symbol";
    DeepSerializedValueType2["Array"] = "array";
    DeepSerializedValueType2["Object"] = "object";
    DeepSerializedValueType2["Function"] = "function";
    DeepSerializedValueType2["Map"] = "map";
    DeepSerializedValueType2["Set"] = "set";
    DeepSerializedValueType2["Weakmap"] = "weakmap";
    DeepSerializedValueType2["Weakset"] = "weakset";
    DeepSerializedValueType2["Error"] = "error";
    DeepSerializedValueType2["Proxy"] = "proxy";
    DeepSerializedValueType2["Promise"] = "promise";
    DeepSerializedValueType2["Typedarray"] = "typedarray";
    DeepSerializedValueType2["Arraybuffer"] = "arraybuffer";
    DeepSerializedValueType2["Node"] = "node";
    DeepSerializedValueType2["Window"] = "window";
    DeepSerializedValueType2["Generator"] = "generator";
  })(DeepSerializedValueType = Runtime3.DeepSerializedValueType || (Runtime3.DeepSerializedValueType = {}));
  let RemoteObjectType;
  ((RemoteObjectType2) => {
    RemoteObjectType2["Object"] = "object";
    RemoteObjectType2["Function"] = "function";
    RemoteObjectType2["Undefined"] = "undefined";
    RemoteObjectType2["String"] = "string";
    RemoteObjectType2["Number"] = "number";
    RemoteObjectType2["Boolean"] = "boolean";
    RemoteObjectType2["Symbol"] = "symbol";
    RemoteObjectType2["Bigint"] = "bigint";
  })(RemoteObjectType = Runtime3.RemoteObjectType || (Runtime3.RemoteObjectType = {}));
  let RemoteObjectSubtype;
  ((RemoteObjectSubtype2) => {
    RemoteObjectSubtype2["Array"] = "array";
    RemoteObjectSubtype2["Null"] = "null";
    RemoteObjectSubtype2["Node"] = "node";
    RemoteObjectSubtype2["Regexp"] = "regexp";
    RemoteObjectSubtype2["Date"] = "date";
    RemoteObjectSubtype2["Map"] = "map";
    RemoteObjectSubtype2["Set"] = "set";
    RemoteObjectSubtype2["Weakmap"] = "weakmap";
    RemoteObjectSubtype2["Weakset"] = "weakset";
    RemoteObjectSubtype2["Iterator"] = "iterator";
    RemoteObjectSubtype2["Generator"] = "generator";
    RemoteObjectSubtype2["Error"] = "error";
    RemoteObjectSubtype2["Proxy"] = "proxy";
    RemoteObjectSubtype2["Promise"] = "promise";
    RemoteObjectSubtype2["Typedarray"] = "typedarray";
    RemoteObjectSubtype2["Arraybuffer"] = "arraybuffer";
    RemoteObjectSubtype2["Dataview"] = "dataview";
    RemoteObjectSubtype2["Webassemblymemory"] = "webassemblymemory";
    RemoteObjectSubtype2["Wasmvalue"] = "wasmvalue";
    RemoteObjectSubtype2["Deferredmodule"] = "deferredmodule";
    RemoteObjectSubtype2["Trustedtype"] = "trustedtype";
  })(RemoteObjectSubtype = Runtime3.RemoteObjectSubtype || (Runtime3.RemoteObjectSubtype = {}));
  let ObjectPreviewType;
  ((ObjectPreviewType2) => {
    ObjectPreviewType2["Object"] = "object";
    ObjectPreviewType2["Function"] = "function";
    ObjectPreviewType2["Undefined"] = "undefined";
    ObjectPreviewType2["String"] = "string";
    ObjectPreviewType2["Number"] = "number";
    ObjectPreviewType2["Boolean"] = "boolean";
    ObjectPreviewType2["Symbol"] = "symbol";
    ObjectPreviewType2["Bigint"] = "bigint";
  })(ObjectPreviewType = Runtime3.ObjectPreviewType || (Runtime3.ObjectPreviewType = {}));
  let ObjectPreviewSubtype;
  ((ObjectPreviewSubtype2) => {
    ObjectPreviewSubtype2["Array"] = "array";
    ObjectPreviewSubtype2["Null"] = "null";
    ObjectPreviewSubtype2["Node"] = "node";
    ObjectPreviewSubtype2["Regexp"] = "regexp";
    ObjectPreviewSubtype2["Date"] = "date";
    ObjectPreviewSubtype2["Map"] = "map";
    ObjectPreviewSubtype2["Set"] = "set";
    ObjectPreviewSubtype2["Weakmap"] = "weakmap";
    ObjectPreviewSubtype2["Weakset"] = "weakset";
    ObjectPreviewSubtype2["Iterator"] = "iterator";
    ObjectPreviewSubtype2["Generator"] = "generator";
    ObjectPreviewSubtype2["Error"] = "error";
    ObjectPreviewSubtype2["Proxy"] = "proxy";
    ObjectPreviewSubtype2["Promise"] = "promise";
    ObjectPreviewSubtype2["Typedarray"] = "typedarray";
    ObjectPreviewSubtype2["Arraybuffer"] = "arraybuffer";
    ObjectPreviewSubtype2["Dataview"] = "dataview";
    ObjectPreviewSubtype2["Webassemblymemory"] = "webassemblymemory";
    ObjectPreviewSubtype2["Wasmvalue"] = "wasmvalue";
    ObjectPreviewSubtype2["Deferredmodule"] = "deferredmodule";
    ObjectPreviewSubtype2["Trustedtype"] = "trustedtype";
  })(ObjectPreviewSubtype = Runtime3.ObjectPreviewSubtype || (Runtime3.ObjectPreviewSubtype = {}));
  let PropertyPreviewType;
  ((PropertyPreviewType2) => {
    PropertyPreviewType2["Object"] = "object";
    PropertyPreviewType2["Function"] = "function";
    PropertyPreviewType2["Undefined"] = "undefined";
    PropertyPreviewType2["String"] = "string";
    PropertyPreviewType2["Number"] = "number";
    PropertyPreviewType2["Boolean"] = "boolean";
    PropertyPreviewType2["Symbol"] = "symbol";
    PropertyPreviewType2["Accessor"] = "accessor";
    PropertyPreviewType2["Bigint"] = "bigint";
  })(PropertyPreviewType = Runtime3.PropertyPreviewType || (Runtime3.PropertyPreviewType = {}));
  let PropertyPreviewSubtype;
  ((PropertyPreviewSubtype2) => {
    PropertyPreviewSubtype2["Array"] = "array";
    PropertyPreviewSubtype2["Null"] = "null";
    PropertyPreviewSubtype2["Node"] = "node";
    PropertyPreviewSubtype2["Regexp"] = "regexp";
    PropertyPreviewSubtype2["Date"] = "date";
    PropertyPreviewSubtype2["Map"] = "map";
    PropertyPreviewSubtype2["Set"] = "set";
    PropertyPreviewSubtype2["Weakmap"] = "weakmap";
    PropertyPreviewSubtype2["Weakset"] = "weakset";
    PropertyPreviewSubtype2["Iterator"] = "iterator";
    PropertyPreviewSubtype2["Generator"] = "generator";
    PropertyPreviewSubtype2["Error"] = "error";
    PropertyPreviewSubtype2["Proxy"] = "proxy";
    PropertyPreviewSubtype2["Promise"] = "promise";
    PropertyPreviewSubtype2["Typedarray"] = "typedarray";
    PropertyPreviewSubtype2["Arraybuffer"] = "arraybuffer";
    PropertyPreviewSubtype2["Dataview"] = "dataview";
    PropertyPreviewSubtype2["Webassemblymemory"] = "webassemblymemory";
    PropertyPreviewSubtype2["Wasmvalue"] = "wasmvalue";
    PropertyPreviewSubtype2["Deferredmodule"] = "deferredmodule";
    PropertyPreviewSubtype2["Trustedtype"] = "trustedtype";
  })(PropertyPreviewSubtype = Runtime3.PropertyPreviewSubtype || (Runtime3.PropertyPreviewSubtype = {}));
  let ConsoleAPICalledEventType;
  ((ConsoleAPICalledEventType2) => {
    ConsoleAPICalledEventType2["Log"] = "log";
    ConsoleAPICalledEventType2["Debug"] = "debug";
    ConsoleAPICalledEventType2["Info"] = "info";
    ConsoleAPICalledEventType2["Error"] = "error";
    ConsoleAPICalledEventType2["Warning"] = "warning";
    ConsoleAPICalledEventType2["Dir"] = "dir";
    ConsoleAPICalledEventType2["DirXML"] = "dirxml";
    ConsoleAPICalledEventType2["Table"] = "table";
    ConsoleAPICalledEventType2["Trace"] = "trace";
    ConsoleAPICalledEventType2["Clear"] = "clear";
    ConsoleAPICalledEventType2["StartGroup"] = "startGroup";
    ConsoleAPICalledEventType2["StartGroupCollapsed"] = "startGroupCollapsed";
    ConsoleAPICalledEventType2["EndGroup"] = "endGroup";
    ConsoleAPICalledEventType2["Assert"] = "assert";
    ConsoleAPICalledEventType2["Profile"] = "profile";
    ConsoleAPICalledEventType2["ProfileEnd"] = "profileEnd";
    ConsoleAPICalledEventType2["Count"] = "count";
    ConsoleAPICalledEventType2["TimeEnd"] = "timeEnd";
  })(ConsoleAPICalledEventType = Runtime3.ConsoleAPICalledEventType || (Runtime3.ConsoleAPICalledEventType = {}));
})(Runtime || (Runtime = {}));

// ../../front_end/panels/accessibility/AccessibilityNodeView.ts
import * as uiI18n from "../../ui/i18n/i18n.js";
import * as UI3 from "../../ui/legacy/legacy.js";
import { render as render2 } from "../../ui/lit/lit.js";
import * as VisualLogging from "../../ui/visual_logging/visual_logging.js";
import * as PanelsCommon from "../common/common.js";

// ../../front_end/panels/accessibility/AccessibilityStrings.ts
var AccessibilityStrings_exports = {};
__export(AccessibilityStrings_exports, {
  AXAttributes: () => AXAttributes,
  AXNativeSourceTypes: () => AXNativeSourceTypes,
  AXSourceTypes: () => AXSourceTypes
});
import * as i18n5 from "../../core/i18n/i18n.js";
var UIStrings3 = {
  /**
   * @description Text to indicate something is not enabled.
   */
  disabled: "Disabled",
  /**
   * @description Tooltip text that appears when hovering over the 'Disabled' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  ifTrueThisElementCurrentlyCannot: "If `true`, this element currently can\u2019t be interacted with",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  invalidUserEntry: "Invalid user entry",
  /**
   * @description Tooltip text that appears when hovering over the 'Invalid user entry' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  ifTrueThisElementsUserentered: "If `true`, this element\u2019s user-entered value doesn\u2019t conform to validation requirement",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  editable: "Editable",
  /**
   * @description Tooltip text that appears when hovering over the 'Editable' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  ifAndHowThisElementCanBeEdited: "If and how this element can be edited",
  /**
   * @description Adjective. Describes whether the currently selected HTML element of the page can receive focus at all (e.g. can the selected element receive user keyboard input).
   *             Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  focusable: "Focusable",
  /**
   * @description Tooltip text that appears when hovering over the 'Focusable' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  ifTrueThisElementCanReceiveFocus: "If `true`, this element can receive focus",
  /**
   * @description Adjective. Describes whether the currently selected HTML element of the page is focused (e.g. the selected element receives user keyboard input).
   *             Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  focused: "Focused",
  /**
   * @description Tooltip text that appears when hovering over the 'Focused' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  ifTrueThisElementCurrentlyHas: "If `true`, this element currently has focus",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  canSetValue: "Can set value",
  /**
   * @description Tooltip text that appears when hovering over the 'Can set value' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  whetherTheValueOfThisElementCan: "Whether the value of this element can be set",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in
   * the Accessibility tab of the Elements panel. A live region is an area of the webpage which is
   * dynamic and changes frequently.
   */
  liveRegion: "Live region",
  /**
   * @description Tooltip text that appears when hovering over the 'Live region' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  whetherAndWhatPriorityOfLive: "Whether and what priority of live updates may be expected for this element",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in
   * the Accessibility tab of the Elements panel when inspecting an element with aria-relevant set.
   */
  atomicLiveRegions: "Atomic (live regions)",
  /**
   * @description Tooltip text that appears when hovering over the 'Atomic (live regions)' attribute
   * name under the computed properties section in the Accessibility tab of the Elements panel. When
   * a node within a live region changes, the entire live region can be presented to the user, or
   * just the nodes within the region that actually changed.
   */
  ifThisElementMayReceiveLive: "If this element may receive live updates, whether the entire live region should be presented to the user on changes, or only changed nodes",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in
   * the Accessibility tab of the Elements panel when inspecting an element with aria-relevant set.
   */
  relevantLiveRegions: "Relevant (live regions)",
  /**
   * @description Tooltip text that appears when hovering over the 'Relevant (live regions)' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  ifThisElementMayReceiveLiveUpdates: "If this element may receive live updates, what type of updates should trigger a notification",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in
   * the Accessibility tab of the Elements panel. Indicates that the aria-busy attribute is set for
   * the element, which means the element is being modified and assistive technologies like screen
   * readers may want to wait until the area is no longer live/busy before exposing it to the user.
   */
  busyLiveRegions: "`Busy` (live regions)",
  /**
   * @description Tooltip text that appears when hovering over the 'Busy (live regions)' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  whetherThisElementOrItsSubtree: "Whether this element or its subtree are currently being updated (and thus may be in an inconsistent state)",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in
   * the Accessibility tab of the Elements panel. A live region is a section of the DOM graph which
   * is dynamic in nature and will change regularly. The live region root is the node in the graph
   * which is a parent of all nodes in the live region.
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
   */
  liveRegionRoot: "Live region root",
  /**
   * @description Tooltip text that appears when hovering over the 'Live region root' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  ifThisElementMayReceiveLiveUpdatesThe: "If this element may receive live updates, the root element of the containing live region",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  hasAutocomplete: "Has autocomplete",
  /**
   * @description Tooltip text that appears when hovering over the 'Has autocomplete' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  whetherAndWhatTypeOfAutocomplete: "Whether and what type of autocomplete suggestions are currently provided by this element",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  hasPopup: "Has popup",
  /**
   * @description Tooltip text that appears when hovering over the 'Has popup' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  whetherThisElementHasCausedSome: "Whether this element has caused some kind of pop-up (such as a menu) to appear",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  level: "Level",
  /**
   * @description Tooltip text that appears when hovering over the 'Level' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  theHierarchicalLevelOfThis: "The hierarchical level of this element",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  multiselectable: "Multi-selectable",
  /**
   * @description Tooltip text that appears when hovering over the 'Multi-selectable' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  whetherAUserMaySelectMoreThanOne: "Whether a user may select more than one option from this widget",
  /**
   * @description Text for the orientation of something.
   */
  orientation: "Orientation",
  /**
   * @description Tooltip text that appears when hovering over the 'Orientation' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  whetherThisLinearElements: "Whether this linear element\u2019s orientation is horizontal or vertical",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  multiline: "Multi-line",
  /**
   * @description Tooltip text that appears when hovering over the 'Multi-line' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  whetherThisTextBoxMayHaveMore: "Whether this text box may have more than one line",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  readonlyString: "Read-only",
  /**
   * @description Tooltip text that appears when hovering over the 'Read-only' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  ifTrueThisElementMayBeInteracted: "If `true`, this element may be interacted with, but its value can\u2019t be changed",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  requiredString: "Required",
  /**
   * @description Tooltip text that appears when hovering over the 'Required' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  whetherThisElementIsARequired: "Whether this element is a required field in a form",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  minimumValue: "Minimum value",
  /**
   * @description Tooltip text that appears when hovering over the 'Minimum value' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  forARangeWidgetTheMinimumAllowed: "For a range widget, the minimum allowed value",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  maximumValue: "Maximum value",
  /**
   * @description Tooltip text that appears when hovering over the 'Maximum value' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  forARangeWidgetTheMaximumAllowed: "For a range widget, the maximum allowed value",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  valueDescription: "Value description",
  /**
   * @description Tooltip text that appears when hovering over the 'Value description' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  aHumanreadableVersionOfTheValue: "A human-readable version of the value of a range widget (where necessary)",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  checked: "Checked",
  /**
   * @description Tooltip text that appears when hovering over the 'Checked' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  whetherThisCheckboxRadioButtonOr: "Whether this checkbox, radio button or tree item is checked, unchecked, or mixed (for example, has both checked and unchecked children)",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  expanded: "Expanded",
  /**
   * @description Tooltip text that appears when hovering over the 'Expanded' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  whetherThisElementOrAnother: "Whether this element, or another grouping element it controls, is expanded",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  pressed: "Pressed",
  /**
   * @description Tooltip text that appears when hovering over the 'Pressed' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  whetherThisToggleButtonIs: "Whether this toggle button is currently in a pressed state",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  selectedString: "Selected",
  /**
   * @description Tooltip text that appears when hovering over the 'Selected' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  whetherTheOptionRepresentedBy: "Whether the option represented by this element is currently selected",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  activeDescendant: "Active descendant",
  /**
   * @description Tooltip text that appears when hovering over the 'Active descendant' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  theDescendantOfThisElementWhich: "The descendant of this element that is active; that is, the element to which focus should be delegated",
  /**
   * @description Tooltip text that appears when hovering over the 'Flows to' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  elementToWhichTheUserMayChooseTo: "Element to which the user may choose to navigate after this one, instead of the next element in the DOM order",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  controls: "Controls",
  /**
   * @description Tooltip text that appears when hovering over the 'Controls' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  elementOrElementsWhoseContentOr: "Element or elements whose content or presence is controlled by this widget",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  describedBy: "Described by",
  /**
   * @description Tooltip text that appears when hovering over the 'Described by' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  elementOrElementsWhichFormThe: "Element or elements that form the description of this element",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  labeledBy: "Labeled by",
  /**
   * @description Tooltip text that appears when hovering over the 'Labeled by' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  elementOrElementsWhichMayFormThe: "Element or elements that may form the name of this element",
  /**
   * @description Tooltip text that appears when hovering over the 'Owns' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  elementOrElementsWhichShouldBe: "Element or elements that should be considered descendants of this element, despite not being descendants in the DOM",
  /**
   * @description Tooltip text that appears when hovering over the 'Name' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  theComputedNameOfThisElement: "The computed name of this element",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  role: "Role",
  /**
   * @description Tooltip text that appears when hovering over the 'Role' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  indicatesThePurposeOfThisElement: "Indicates the purpose of this element, such as a user interface idiom for a widget, or structural role within a document",
  /**
   * @description Text for the value of something.
   */
  value: "Value",
  /**
   * @description Tooltip text that appears when hovering over the 'Value' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  theValueOfThisElementThisMayBe: "The value of this element; this may be user-provided or developer-provided, depending on the element",
  /**
   * @description Text for viewing the help options.
   */
  help: "Help",
  /**
   * @description Tooltip text that appears when hovering over the 'Help' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  theComputedHelpTextForThis: "The computed help text for this element",
  /**
   * @description Text for the description of something.
   */
  description: "Description",
  /**
   * @description Tooltip text that appears when hovering over the 'Description' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  theAccessibleDescriptionForThis: "The accessible description for this element",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  fromAttribute: "From attribute",
  /**
   * @description Tooltip text that appears when hovering over the 'From attribute' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  valueFromAttribute: "Value from attribute",
  /**
   * @description The source of an accessibility attribute that appears under the computed properties
   * section in the Accessibility tab of the Elements panel. If the source is implicit, that means
   * it was never specified by the user but instead is present because it is the default value.
   */
  implicit: "Implicit",
  /**
   * @description Tooltip text that appears when hovering over the 'Implicit' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  implicitValue: "Implicit value",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  fromStyle: "From style",
  /**
   * @description Tooltip text that appears when hovering over the 'From style' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  valueFromStyle: "Value from style",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  contents: "Contents",
  /**
   * @description Tooltip text that appears when hovering over the 'Contents' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  valueFromElementContents: "Value from element contents",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  fromPlaceholderAttribute: "From placeholder attribute",
  /**
   * @description Tooltip text that appears when hovering over the 'From placeholder attribute' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  valueFromPlaceholderAttribute: "Value from placeholder attribute",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  relatedElement: "Related element",
  /**
   * @description Tooltip text that appears when hovering over the 'Related element' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  valueFromRelatedElement: "Value from related element",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in
   * the Accessibility tab of the Elements panel. Indicates that this element got assigned this
   * attribute because there is a related caption, hence it received it from the caption. 'caption'
   * is part of the ARIA API and should not be translated.
   */
  fromCaption: "From `caption`",
  /**
   * @description Tooltip text that appears when hovering over the 'From caption' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  valueFromFigcaptionElement: "Value from `figcaption` element",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in
   * the Accessibility tab of the Elements panel. Indicates that this element got assigned this
   * attribute because there is a related description, hence it received it from the description.
   * 'description' is part of the ARIA API and should not be translated.
   */
  fromDescription: "From `description`",
  /**
   * @description Tooltip text that appears when hovering over the 'From description' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  valueFromDescriptionElement: "Value from `description` element",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in
   * the Accessibility tab of the Elements panel. Indicates that this element got assigned this
   * attribute because there is a related label, hence it received it from the label. 'label'
   * is part of the ARIA API and should not be translated.
   */
  fromLabel: "From `label`",
  /**
   * @description Tooltip text that appears when hovering over the 'From label' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  valueFromLabelElement: "Value from `label` element",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in
   * the Accessibility tab of the Elements panel. Indicates that this element got assigned this
   * attribute because there is a related label, hence it received it from the label. 'label (for)'
   * is part of the ARIA API and should not be translated. label (for) is just a different type of
   * label.
   */
  fromLabelFor: "From `label` (`for=` attribute)",
  /**
   * @description Tooltip text that appears when hovering over the 'From label (for)' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  valueFromLabelElementWithFor: "Value from `label` element with `for=` attribute",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in
   * the Accessibility tab of the Elements panel. Indicates that this element got assigned this
   * attribute because there is a related label which wraps (encompasses, surrounds) this element,
   * hence it received it from the label. 'wrapped' is not part of the ARIA API, and should be
   * translated.
   */
  fromLabelWrapped: "From `label` (wrapped)",
  /**
   * @description Tooltip text that appears when hovering over the 'From label (wrapped)' attribute
   * name under the computed properties section in the Accessibility tab of the Elements panel.
   * Indicates that there is a label element wrapping (surrounding) this element.
   */
  valueFromLabelElementWrapped: "Value from a wrapping `label` element",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in
   * the Accessibility tab of the Elements panel. Indicates that this element got assigned this
   * attribute because there is a related legend, hence it received it from the legend. 'legend' is
   * part of the ARIA API and should not be translated.
   */
  fromLegend: "From `legend`",
  /**
   * @description Tooltip text that appears when hovering over the 'From legend' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  valueFromLegendElement: "Value from `legend` element",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  fromRubyAnnotation: "From ruby annotation",
  /**
   * @description Tooltip text that appears when hovering over the 'From ruby annotation' attribute name under the computed properties section in the Accessibility tab of the Elements panel. Indicates that the value was taken from a plain HTML ruby tag (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby).
   */
  valueFromNativeHtmlRuby: "Value from plain HTML ruby annotation",
  /**
   * @description Tooltip text that appears when hovering over the 'From caption' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  valueFromTableCaption: "Value from `table` `caption`",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in
   * the Accessibility tab of the Elements panel.
   */
  fromTitle: "From title",
  /**
   * @description Tooltip text that appears when hovering over the 'From title' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  valueFromTitleAttribute: "Value from title attribute",
  /**
   * @description Accessibility attribute name that appears under the computed properties section in the Accessibility tab of the Elements panel.
   */
  fromNativeHtml: "From native HTML",
  /**
   * @description Tooltip text that appears when hovering over the 'From native HTML' attribute name under the computed properties section in the Accessibility tab of the Elements panel.
   */
  valueFromNativeHtmlUnknownSource: "Value from native HTML (unknown source)"
};
var str_3 = i18n5.i18n.registerUIStrings("panels/accessibility/AccessibilityStrings.ts", UIStrings3);
var i18nLazyString = i18n5.i18n.getLazilyComputedLocalizedString.bind(void 0, str_3);
var AXAttributes = {
  disabled: {
    name: i18nLazyString(UIStrings3.disabled),
    description: i18nLazyString(UIStrings3.ifTrueThisElementCurrentlyCannot),
    group: "AXGlobalStates"
  },
  invalid: {
    name: i18nLazyString(UIStrings3.invalidUserEntry),
    description: i18nLazyString(UIStrings3.ifTrueThisElementsUserentered),
    group: "AXGlobalStates"
  },
  editable: { name: i18nLazyString(UIStrings3.editable), description: i18nLazyString(UIStrings3.ifAndHowThisElementCanBeEdited) },
  focusable: {
    name: i18nLazyString(UIStrings3.focusable),
    description: i18nLazyString(UIStrings3.ifTrueThisElementCanReceiveFocus)
  },
  focused: { name: i18nLazyString(UIStrings3.focused), description: i18nLazyString(UIStrings3.ifTrueThisElementCurrentlyHas) },
  settable: {
    name: i18nLazyString(UIStrings3.canSetValue),
    description: i18nLazyString(UIStrings3.whetherTheValueOfThisElementCan)
  },
  live: {
    name: i18nLazyString(UIStrings3.liveRegion),
    description: i18nLazyString(UIStrings3.whetherAndWhatPriorityOfLive),
    group: "AXLiveRegionAttributes"
  },
  atomic: {
    name: i18nLazyString(UIStrings3.atomicLiveRegions),
    description: i18nLazyString(UIStrings3.ifThisElementMayReceiveLive),
    group: "AXLiveRegionAttributes"
  },
  relevant: {
    name: i18nLazyString(UIStrings3.relevantLiveRegions),
    description: i18nLazyString(UIStrings3.ifThisElementMayReceiveLiveUpdates),
    group: "AXLiveRegionAttributes"
  },
  busy: {
    name: i18nLazyString(UIStrings3.busyLiveRegions),
    description: i18nLazyString(UIStrings3.whetherThisElementOrItsSubtree),
    group: "AXLiveRegionAttributes"
  },
  root: {
    name: i18nLazyString(UIStrings3.liveRegionRoot),
    description: i18nLazyString(UIStrings3.ifThisElementMayReceiveLiveUpdatesThe),
    group: "AXLiveRegionAttributes"
  },
  autocomplete: {
    name: i18nLazyString(UIStrings3.hasAutocomplete),
    description: i18nLazyString(UIStrings3.whetherAndWhatTypeOfAutocomplete),
    group: "AXWidgetAttributes"
  },
  haspopup: {
    name: i18nLazyString(UIStrings3.hasPopup),
    description: i18nLazyString(UIStrings3.whetherThisElementHasCausedSome),
    group: "AXWidgetAttributes"
  },
  level: {
    name: i18nLazyString(UIStrings3.level),
    description: i18nLazyString(UIStrings3.theHierarchicalLevelOfThis),
    group: "AXWidgetAttributes"
  },
  multiselectable: {
    name: i18nLazyString(UIStrings3.multiselectable),
    description: i18nLazyString(UIStrings3.whetherAUserMaySelectMoreThanOne),
    group: "AXWidgetAttributes"
  },
  orientation: {
    name: i18nLazyString(UIStrings3.orientation),
    description: i18nLazyString(UIStrings3.whetherThisLinearElements),
    group: "AXWidgetAttributes"
  },
  multiline: {
    name: i18nLazyString(UIStrings3.multiline),
    description: i18nLazyString(UIStrings3.whetherThisTextBoxMayHaveMore),
    group: "AXWidgetAttributes"
  },
  readonly: {
    name: i18nLazyString(UIStrings3.readonlyString),
    description: i18nLazyString(UIStrings3.ifTrueThisElementMayBeInteracted),
    group: "AXWidgetAttributes"
  },
  required: {
    name: i18nLazyString(UIStrings3.requiredString),
    description: i18nLazyString(UIStrings3.whetherThisElementIsARequired),
    group: "AXWidgetAttributes"
  },
  valuemin: {
    name: i18nLazyString(UIStrings3.minimumValue),
    description: i18nLazyString(UIStrings3.forARangeWidgetTheMinimumAllowed),
    group: "AXWidgetAttributes"
  },
  valuemax: {
    name: i18nLazyString(UIStrings3.maximumValue),
    description: i18nLazyString(UIStrings3.forARangeWidgetTheMaximumAllowed),
    group: "AXWidgetAttributes"
  },
  valuetext: {
    name: i18nLazyString(UIStrings3.valueDescription),
    description: i18nLazyString(UIStrings3.aHumanreadableVersionOfTheValue),
    group: "AXWidgetAttributes"
  },
  checked: {
    name: i18nLazyString(UIStrings3.checked),
    description: i18nLazyString(UIStrings3.whetherThisCheckboxRadioButtonOr),
    group: "AXWidgetStates"
  },
  expanded: {
    name: i18nLazyString(UIStrings3.expanded),
    description: i18nLazyString(UIStrings3.whetherThisElementOrAnother),
    group: "AXWidgetStates"
  },
  pressed: {
    name: i18nLazyString(UIStrings3.pressed),
    description: i18nLazyString(UIStrings3.whetherThisToggleButtonIs),
    group: "AXWidgetStates"
  },
  selected: {
    name: i18nLazyString(UIStrings3.selectedString),
    description: i18nLazyString(UIStrings3.whetherTheOptionRepresentedBy),
    group: "AXWidgetStates"
  },
  activedescendant: {
    name: i18nLazyString(UIStrings3.activeDescendant),
    description: i18nLazyString(UIStrings3.theDescendantOfThisElementWhich),
    group: "AXRelationshipAttributes"
  },
  flowto: {
    name: i18n5.i18n.lockedLazyString("Flows to"),
    description: i18nLazyString(UIStrings3.elementToWhichTheUserMayChooseTo),
    group: "AXRelationshipAttributes"
  },
  controls: {
    name: i18nLazyString(UIStrings3.controls),
    description: i18nLazyString(UIStrings3.elementOrElementsWhoseContentOr),
    group: "AXRelationshipAttributes"
  },
  describedby: {
    name: i18nLazyString(UIStrings3.describedBy),
    description: i18nLazyString(UIStrings3.elementOrElementsWhichFormThe),
    group: "AXRelationshipAttributes"
  },
  labelledby: {
    name: i18nLazyString(UIStrings3.labeledBy),
    description: i18nLazyString(UIStrings3.elementOrElementsWhichMayFormThe),
    group: "AXRelationshipAttributes"
  },
  owns: {
    name: i18n5.i18n.lockedLazyString("Owns"),
    description: i18nLazyString(UIStrings3.elementOrElementsWhichShouldBe),
    group: "AXRelationshipAttributes"
  },
  name: {
    name: i18n5.i18n.lockedLazyString("Name"),
    description: i18nLazyString(UIStrings3.theComputedNameOfThisElement),
    group: "Default"
  },
  role: {
    name: i18nLazyString(UIStrings3.role),
    description: i18nLazyString(UIStrings3.indicatesThePurposeOfThisElement),
    group: "Default"
  },
  value: {
    name: i18nLazyString(UIStrings3.value),
    description: i18nLazyString(UIStrings3.theValueOfThisElementThisMayBe),
    group: "Default"
  },
  help: {
    name: i18nLazyString(UIStrings3.help),
    description: i18nLazyString(UIStrings3.theComputedHelpTextForThis),
    group: "Default"
  },
  description: {
    name: i18nLazyString(UIStrings3.description),
    description: i18nLazyString(UIStrings3.theAccessibleDescriptionForThis),
    group: "Default"
  }
};
var AXSourceTypes = {
  attribute: { name: i18nLazyString(UIStrings3.fromAttribute), description: i18nLazyString(UIStrings3.valueFromAttribute) },
  implicit: {
    name: i18nLazyString(UIStrings3.implicit),
    description: i18nLazyString(UIStrings3.implicitValue)
  },
  style: { name: i18nLazyString(UIStrings3.fromStyle), description: i18nLazyString(UIStrings3.valueFromStyle) },
  contents: { name: i18nLazyString(UIStrings3.contents), description: i18nLazyString(UIStrings3.valueFromElementContents) },
  placeholder: {
    name: i18nLazyString(UIStrings3.fromPlaceholderAttribute),
    description: i18nLazyString(UIStrings3.valueFromPlaceholderAttribute)
  },
  relatedElement: { name: i18nLazyString(UIStrings3.relatedElement), description: i18nLazyString(UIStrings3.valueFromRelatedElement) }
};
var AXNativeSourceTypes = {
  description: {
    name: i18nLazyString(UIStrings3.fromDescription),
    description: i18nLazyString(UIStrings3.valueFromDescriptionElement)
  },
  figcaption: { name: i18nLazyString(UIStrings3.fromCaption), description: i18nLazyString(UIStrings3.valueFromFigcaptionElement) },
  label: { name: i18nLazyString(UIStrings3.fromLabel), description: i18nLazyString(UIStrings3.valueFromLabelElement) },
  labelfor: {
    name: i18nLazyString(UIStrings3.fromLabelFor),
    description: i18nLazyString(UIStrings3.valueFromLabelElementWithFor)
  },
  labelwrapped: {
    name: i18nLazyString(UIStrings3.fromLabelWrapped),
    description: i18nLazyString(UIStrings3.valueFromLabelElementWrapped)
  },
  legend: { name: i18nLazyString(UIStrings3.fromLegend), description: i18nLazyString(UIStrings3.valueFromLegendElement) },
  rubyannotation: {
    name: i18nLazyString(UIStrings3.fromRubyAnnotation),
    description: i18nLazyString(UIStrings3.valueFromNativeHtmlRuby)
  },
  tablecaption: { name: i18nLazyString(UIStrings3.fromCaption), description: i18nLazyString(UIStrings3.valueFromTableCaption) },
  title: { name: i18nLazyString(UIStrings3.fromTitle), description: i18nLazyString(UIStrings3.valueFromTitleAttribute) },
  other: {
    name: i18nLazyString(UIStrings3.fromNativeHtml),
    description: i18nLazyString(UIStrings3.valueFromNativeHtmlUnknownSource)
  }
};

// ../../front_end/panels/accessibility/AccessibilityNodeView.ts
var UIStrings4 = {
  /**
   * @description Text in the computed properties view under the Accessibility tab in the Elements panel.
   */
  computedProperties: "Computed properties",
  /**
   * @description Text in the Accessibility tab in the Elements panel.
   */
  noAccessibilityNode: "No accessibility node",
  /**
   * @description Text in the Accessibility tab in the Elements panel.
   */
  accessibilityNodeNotExposed: "Accessibility node not exposed",
  /**
   * @description Text in the Accessibility tab in the Elements panel.
   */
  invalidSource: "Invalid source",
  /**
   * @description Text in the Accessibility tab in the Elements panel.
   */
  notSpecified: "Not specified",
  /**
   * @description Text in the Accessibility tab in the Elements panel.
   */
  noNodeWithThisId: "No node with this ID",
  /**
   * @description Text that appears in the Accessibility tab in the Elements panel when an element is covered by a modal or pop-up window.
   */
  elementIsHiddenBy: "Element is hidden by active modal dialog:\xA0",
  /**
   * @description Text that appears in the Accessibility tab in the Elements panel when an element is hidden by another accessibility tree.
   */
  elementIsHiddenByChildTree: "Element is hidden by child tree:\xA0",
  /**
   * @description Reason in the Accessibility tab in the Elements panel.
   */
  ancestorChildrenAreAll: "Ancestor\u2019s children are all presentational:\xA0",
  /**
   * @description Reason in the Accessibility tab in the Elements panel.
   * @example {aria-hidden} PH1
   */
  elementIsPlaceholder: "Element is {PH1}.",
  /**
   * @description Reason in the Accessibility tab in the Elements panel.
   * @example {aria-hidden} PH1
   * @example {true} PH2
   */
  placeholderIsPlaceholderOnAncestor: "{PH1} is {PH2} on ancestor:\xA0",
  /**
   * @description Text in the Accessibility tab in the Elements panel.
   */
  elementHasEmptyAltText: "Element has empty alt text",
  /**
   * @description Reason in the Accessibility tab in the Elements panel.
   */
  noTextContent: "No text content",
  /**
   * @description Reason in the Accessibility tab in the Elements panel.
   */
  elementIsInert: "Element is `inert`",
  /**
   * @description Reason in the Accessibility tab in the Elements panel.
   */
  elementIsInAnInertSubTree: "Element is in an `inert` subtree from\xA0",
  /**
   * @description Reason in the Accessibility tab in the Elements panel.
   */
  elementsInheritsPresentational: "Element inherits presentational role from\xA0",
  /**
   * @description Reason in the Accessibility tab in the Elements panel.
   */
  partOfLabelElement: "Part of label element:\xA0",
  /**
   * @description Reason in the Accessibility tab in the Elements panel.
   */
  labelFor: "Label for\xA0",
  /**
   * @description Reason in the Accessibility tab in the Elements panel.
   */
  elementIsNotRendered: "Element is not rendered",
  /**
   * @description Reason in the Accessibility tab in the Elements panel.
   */
  elementIsNotVisible: "Element is not visible",
  /**
   * @description Reason in the Accessibility tab in the Elements panel. Indicates the
   * ARIA role for this element, which will always have the format 'role=', but with different roles
   * (which are not translated). https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
   * @example {role=link} PH1
   */
  elementHasPlaceholder: "Element has {PH1}.",
  /**
   * @description Reason in the Accessibility tab in the Elements panel.
   */
  elementIsPresentational: "Element is presentational",
  /**
   * @description Reason in the Accessibility tab in the Elements panel. Here
   * 'interesting' is from the perspective of the accessibility engine in Chrome. A non-interesting
   * element doesn't have any special accessibility considerations.
   */
  elementNotInteresting: "Element not interesting for accessibility"
};
var str_4 = i18n7.i18n.registerUIStrings("panels/accessibility/AccessibilityNodeView.ts", UIStrings4);
var i18nString3 = i18n7.i18n.getLocalizedString.bind(void 0, str_4);
var AXNodeSubPane = class extends AccessibilitySubPane {
  axNode;
  noNodeInfo;
  ignoredInfo;
  treeOutline;
  ignoredReasonsTree;
  constructor() {
    super({
      title: i18nString3(UIStrings4.computedProperties),
      viewId: "computed-properties",
      jslog: `${VisualLogging.section("computed-properties")}`
    });
    this.registerRequiredCSS(accessibilityNode_css_default);
    this.axNode = null;
    this.contentElement.classList.add("ax-subpane");
    this.noNodeInfo = this.createInfo(i18nString3(UIStrings4.noAccessibilityNode));
    this.ignoredInfo = this.createInfo(i18nString3(UIStrings4.accessibilityNodeNotExposed), "ax-ignored-info", "hidden");
    this.treeOutline = this.createTreeOutline();
    this.ignoredReasonsTree = this.createTreeOutline();
    this.element.classList.add("accessibility-computed");
    this.treeOutline.setFocusable(true);
  }
  setAXNode(axNode) {
    if (this.axNode === axNode) {
      return;
    }
    this.axNode = axNode;
    const treeOutline = this.treeOutline;
    treeOutline.removeChildren();
    const ignoredReasons = this.ignoredReasonsTree;
    ignoredReasons.removeChildren();
    if (!axNode) {
      treeOutline.element.classList.add("hidden");
      this.ignoredInfo.element.classList.add("hidden");
      ignoredReasons.element.classList.add("hidden");
      this.noNodeInfo.element.classList.remove("hidden");
      this.element.classList.add("ax-ignored-node-pane");
      return;
    }
    if (axNode.ignored()) {
      let addIgnoredReason = function(property) {
        ignoredReasons.appendChild(
          new AXNodeIgnoredReasonTreeElement(property, axNode)
        );
      };
      this.noNodeInfo.element.classList.add("hidden");
      treeOutline.element.classList.add("hidden");
      this.element.classList.add("ax-ignored-node-pane");
      this.ignoredInfo.element.classList.remove("hidden");
      ignoredReasons.element.classList.remove("hidden");
      const ignoredReasonsArray = axNode.ignoredReasons();
      for (const reason of ignoredReasonsArray) {
        addIgnoredReason(reason);
      }
      if (!ignoredReasons.firstChild()) {
        ignoredReasons.element.classList.add("hidden");
      }
      return;
    }
    this.element.classList.remove("ax-ignored-node-pane");
    this.ignoredInfo.element.classList.add("hidden");
    ignoredReasons.element.classList.add("hidden");
    this.noNodeInfo.element.classList.add("hidden");
    treeOutline.element.classList.remove("hidden");
    function addProperty(property) {
      treeOutline.appendChild(
        new AXNodePropertyTreePropertyElement(property, axNode)
      );
    }
    for (const property of axNode.coreProperties()) {
      addProperty(property);
    }
    const role = axNode.role();
    if (role) {
      const roleProperty = {
        name: SDK2.AccessibilityModel.CoreAxPropertyName.ROLE,
        value: role
      };
      addProperty(roleProperty);
    }
    for (const property of axNode.properties()) {
      addProperty(property);
    }
    const firstNode = treeOutline.firstChild();
    if (firstNode) {
      firstNode.select(
        /* omitFocus= */
        true,
        /* selectedByUser= */
        false
      );
    }
  }
  setNode(node) {
    super.setNode(node);
    this.axNode = null;
  }
};
var AXNodePropertyTreeElement = class _AXNodePropertyTreeElement extends UI3.TreeOutline.TreeElement {
  axNode;
  constructor(axNode) {
    super("");
    this.axNode = axNode;
  }
  static createSimpleValueElement(type, value) {
    let valueElement;
    if (!type || type === Accessibility.AXValueType.ValueUndefined || type === Accessibility.AXValueType.ComputedString) {
      valueElement = document.createElement("span");
    } else {
      valueElement = document.createElement("span");
      valueElement.classList.add("monospace");
    }
    let valueText;
    const isStringProperty = type && StringProperties.has(type);
    if (isStringProperty) {
      valueText = '"' + value.replace(/\n/g, "\u21B5") + '"';
    } else {
      valueText = String(value);
    }
    if (type && type in TypeStyles) {
      valueElement.classList.add(TypeStyles[type]);
    }
    valueElement.setTextContentTruncatedIfNeeded(valueText || "");
    UI3.Tooltip.Tooltip.install(valueElement, String(value) || "");
    return valueElement;
  }
  static createExclamationMark(tooltip) {
    const exclamationElement = UI3.UIUtils.createIconLabel({ iconName: "warning-filled", color: "var(--icon-warning)" });
    UI3.Tooltip.Tooltip.install(exclamationElement, tooltip);
    return exclamationElement;
  }
  appendNameElement(name) {
    const nameElement = document.createElement("span");
    if (name in AXAttributes) {
      const attribute = AXAttributes[name];
      nameElement.textContent = attribute.name();
      UI3.Tooltip.Tooltip.install(nameElement, attribute.description());
      nameElement.classList.add("ax-readable-name");
    } else {
      nameElement.textContent = name;
      nameElement.classList.add("ax-name");
      nameElement.classList.add("monospace");
    }
    this.listItemElement.appendChild(nameElement);
  }
  appendValueElement(value) {
    if (value.type === Accessibility.AXValueType.Idref || value.type === Accessibility.AXValueType.Node || value.type === Accessibility.AXValueType.IdrefList || value.type === Accessibility.AXValueType.NodeList) {
      this.appendRelatedNodeListValueElement(value);
      return;
    }
    if (value.sources) {
      const sources = value.sources;
      for (let i = 0; i < sources.length; i++) {
        const source = sources[i];
        const child = new AXValueSourceTreeElement(source, this.axNode);
        this.appendChild(child);
      }
      this.expand();
    }
    const element = _AXNodePropertyTreeElement.createSimpleValueElement(value.type, String(value.value));
    this.listItemElement.appendChild(element);
  }
  appendRelatedNode(relatedNode, _index) {
    const deferredNode = new SDK2.DOMModel.DeferredDOMNode(this.axNode.accessibilityModel().target(), relatedNode.backendDOMNodeId);
    const nodeTreeElement = new AXRelatedNodeSourceTreeElement({ deferredNode }, relatedNode);
    this.appendChild(nodeTreeElement);
  }
  appendRelatedNodeInline(relatedNode) {
    const deferredNode = new SDK2.DOMModel.DeferredDOMNode(this.axNode.accessibilityModel().target(), relatedNode.backendDOMNodeId);
    const linkedNode = new AXRelatedNodeElement({ deferredNode });
    this.listItemElement.appendChild(linkedNode.render());
  }
  appendRelatedNodeListValueElement(value) {
    if (value.relatedNodes?.length === 1 && !value.value) {
      this.appendRelatedNodeInline(value.relatedNodes[0]);
      return;
    }
    if (value.relatedNodes) {
      value.relatedNodes.forEach(this.appendRelatedNode, this);
    }
    if (value.relatedNodes && value.relatedNodes.length <= 3) {
      this.expand();
    } else {
      this.collapse();
    }
  }
};
var TypeStyles = {
  attribute: "ax-value-string",
  boolean: "object-value-boolean",
  booleanOrUndefined: "object-value-boolean",
  computedString: "ax-readable-string",
  idref: "ax-value-string",
  idrefList: "ax-value-string",
  integer: "object-value-number",
  internalRole: "ax-internal-role",
  number: "ax-value-number",
  role: "ax-role",
  string: "ax-value-string",
  tristate: "object-value-boolean",
  valueUndefined: "ax-value-undefined"
};
var StringProperties = /* @__PURE__ */ new Set([
  Accessibility.AXValueType.String,
  Accessibility.AXValueType.ComputedString,
  Accessibility.AXValueType.IdrefList,
  Accessibility.AXValueType.Idref
]);
var AXNodePropertyTreePropertyElement = class extends AXNodePropertyTreeElement {
  property;
  toggleOnClick;
  constructor(property, axNode) {
    super(axNode);
    this.property = property;
    this.toggleOnClick = true;
    this.listItemElement.classList.add("property");
  }
  onattach() {
    this.update();
  }
  update() {
    this.listItemElement.removeChildren();
    this.appendNameElement(this.property.name);
    this.listItemElement.createChild("span", "separator").textContent = ":\xA0";
    this.appendValueElement(this.property.value);
  }
};
var AXValueSourceTreeElement = class extends AXNodePropertyTreeElement {
  source;
  constructor(source, axNode) {
    super(axNode);
    this.source = source;
  }
  onattach() {
    this.update();
  }
  appendRelatedNodeWithIdref(relatedNode, idref) {
    const deferredNode = new SDK2.DOMModel.DeferredDOMNode(this.axNode.accessibilityModel().target(), relatedNode.backendDOMNodeId);
    const nodeTreeElement = new AXRelatedNodeSourceTreeElement({ deferredNode, idref }, relatedNode);
    this.appendChild(nodeTreeElement);
  }
  appendIDRefValueElement(value) {
    if (value.value === null) {
      return;
    }
    const relatedNodes = value.relatedNodes || [];
    if (value.value === "") {
      for (const node of relatedNodes) {
        const idref = node.idref || "";
        this.appendRelatedNodeWithIdref(node, idref);
      }
      return;
    }
    const idrefs = value.value.trim().split(/\s+/);
    for (const idref of idrefs) {
      const matchingNode = relatedNodes.find((node) => node.idref === idref);
      if (matchingNode) {
        this.appendRelatedNodeWithIdref(matchingNode, idref);
      } else if (idrefs.length === 1) {
        this.listItemElement.appendChild(new AXRelatedNodeElement({ idref }).render());
      } else {
        this.appendChild(new AXRelatedNodeSourceTreeElement({ idref }));
      }
    }
  }
  appendRelatedNodeListValueElement(value) {
    const relatedNodes = value.relatedNodes;
    const numNodes = relatedNodes ? relatedNodes.length : 0;
    if (value.type === Accessibility.AXValueType.IdrefList || value.type === Accessibility.AXValueType.Idref) {
      this.appendIDRefValueElement(value);
    } else {
      super.appendRelatedNodeListValueElement(value);
    }
    if (numNodes <= 3) {
      this.expand();
    } else {
      this.collapse();
    }
  }
  appendSourceNameElement(source) {
    const nameElement = document.createElement("span");
    const type = source.type;
    switch (type) {
      case Accessibility.AXValueSourceType.Attribute:
      case Accessibility.AXValueSourceType.Placeholder:
      case Accessibility.AXValueSourceType.RelatedElement:
        if (source.nativeSource) {
          const nativeSource = source.nativeSource;
          nameElement.textContent = AXNativeSourceTypes[nativeSource].name();
          UI3.Tooltip.Tooltip.install(nameElement, AXNativeSourceTypes[nativeSource].description());
          nameElement.classList.add("ax-readable-name");
          break;
        }
        nameElement.textContent = source.attribute || null;
        nameElement.classList.add("ax-name");
        nameElement.classList.add("monospace");
        break;
      default:
        if (type in AXSourceTypes) {
          nameElement.textContent = AXSourceTypes[type].name();
          UI3.Tooltip.Tooltip.install(nameElement, AXSourceTypes[type].description());
          nameElement.classList.add("ax-readable-name");
        } else {
          console.warn(type, "not in AXSourceTypes");
          nameElement.textContent = type;
        }
    }
    this.listItemElement.appendChild(nameElement);
  }
  update() {
    this.listItemElement.removeChildren();
    if (this.source.invalid) {
      const exclamationMark = AXNodePropertyTreeElement.createExclamationMark(i18nString3(UIStrings4.invalidSource));
      this.listItemElement.appendChild(exclamationMark);
      this.listItemElement.classList.add("ax-value-source-invalid");
    } else if (this.source.superseded) {
      this.listItemElement.classList.add("ax-value-source-unused");
    }
    this.appendSourceNameElement(this.source);
    this.listItemElement.createChild("span", "separator").textContent = ":\xA0";
    if (this.source.attributeValue) {
      this.appendValueElement(this.source.attributeValue);
      UI3.UIUtils.createTextChild(this.listItemElement, "\xA0");
    } else if (this.source.nativeSourceValue) {
      this.appendValueElement(this.source.nativeSourceValue);
      UI3.UIUtils.createTextChild(this.listItemElement, "\xA0");
      if (this.source.value) {
        this.appendValueElement(this.source.value);
      }
    } else if (this.source.value) {
      this.appendValueElement(this.source.value);
    } else {
      const valueElement = AXNodePropertyTreeElement.createSimpleValueElement(
        Accessibility.AXValueType.ValueUndefined,
        i18nString3(UIStrings4.notSpecified)
      );
      this.listItemElement.appendChild(valueElement);
      this.listItemElement.classList.add("ax-value-source-unused");
    }
    if (this.source.value && this.source.superseded) {
      this.listItemElement.classList.add("ax-value-source-superseded");
    }
  }
};
var AXRelatedNodeSourceTreeElement = class extends UI3.TreeOutline.TreeElement {
  value;
  axRelatedNodeElement;
  constructor(node, value) {
    super("");
    this.value = value;
    this.axRelatedNodeElement = new AXRelatedNodeElement(node);
    this.selectable = true;
  }
  onattach() {
    this.listItemElement.appendChild(this.axRelatedNodeElement.render());
    if (!this.value) {
      return;
    }
    if (this.value.text) {
      this.listItemElement.appendChild(AXNodePropertyTreeElement.createSimpleValueElement(
        Accessibility.AXValueType.ComputedString,
        this.value.text
      ));
    }
  }
  onenter() {
    this.axRelatedNodeElement.revealNode();
    return true;
  }
};
var AXRelatedNodeElement = class {
  deferredNode;
  idref;
  constructor(node) {
    this.deferredNode = node.deferredNode;
    this.idref = node.idref;
  }
  render() {
    const element = document.createElement("span");
    if (this.deferredNode) {
      const valueElement = document.createElement("span");
      element.appendChild(valueElement);
      void this.deferredNode.resolvePromise().then((node) => {
        if (!node) {
          return;
        }
        render2(
          PanelsCommon.DOMLinkifier.Linkifier.instance().linkify(node, {
            preventKeyboardFocus: true
          }),
          valueElement
        );
      });
    } else if (this.idref) {
      element.classList.add("invalid");
      const valueElement = AXNodePropertyTreeElement.createExclamationMark(i18nString3(UIStrings4.noNodeWithThisId));
      UI3.UIUtils.createTextChild(valueElement, this.idref);
      element.appendChild(valueElement);
    }
    return element;
  }
  /**
   * Attempts to cause the node referred to by the related node to be selected in the tree.
   */
  revealNode() {
    if (this.deferredNode) {
      void this.deferredNode.resolvePromise().then((node) => Common.Revealer.reveal(node));
    }
  }
};
var AXNodeIgnoredReasonTreeElement = class _AXNodeIgnoredReasonTreeElement extends AXNodePropertyTreeElement {
  property;
  toggleOnClick;
  reasonElement;
  constructor(property, axNode) {
    super(axNode);
    this.property = property;
    this.axNode = axNode;
    this.toggleOnClick = true;
    this.selectable = false;
  }
  static createReasonElement(reason, axNode) {
    let reasonElement = null;
    switch (reason) {
      case "activeModalDialog":
        reasonElement = uiI18n.getFormatLocalizedString(str_4, UIStrings4.elementIsHiddenBy, {});
        break;
      case "hiddenByChildTree":
        reasonElement = uiI18n.getFormatLocalizedString(str_4, UIStrings4.elementIsHiddenByChildTree, {});
        break;
      case "ancestorIsLeafNode":
        reasonElement = uiI18n.getFormatLocalizedString(str_4, UIStrings4.ancestorChildrenAreAll, {});
        break;
      case "ariaHiddenElement": {
        const ariaHiddenSpan = document.createElement("span", { is: "source-code" }).textContent = "aria-hidden";
        reasonElement = uiI18n.getFormatLocalizedString(str_4, UIStrings4.elementIsPlaceholder, { PH1: ariaHiddenSpan });
        break;
      }
      case "ariaHiddenSubtree": {
        const ariaHiddenSpan = document.createElement("span", { is: "source-code" }).textContent = "aria-hidden";
        const trueSpan = document.createElement("span", { is: "source-code" }).textContent = "true";
        reasonElement = uiI18n.getFormatLocalizedString(
          str_4,
          UIStrings4.placeholderIsPlaceholderOnAncestor,
          { PH1: ariaHiddenSpan, PH2: trueSpan }
        );
        break;
      }
      case "emptyAlt":
        reasonElement = uiI18n.getFormatLocalizedString(str_4, UIStrings4.elementHasEmptyAltText, {});
        break;
      case "emptyText":
        reasonElement = uiI18n.getFormatLocalizedString(str_4, UIStrings4.noTextContent, {});
        break;
      case "inertElement":
        reasonElement = uiI18n.getFormatLocalizedString(str_4, UIStrings4.elementIsInert, {});
        break;
      case "inertSubtree":
        reasonElement = uiI18n.getFormatLocalizedString(str_4, UIStrings4.elementIsInAnInertSubTree, {});
        break;
      case "inheritsPresentation":
        reasonElement = uiI18n.getFormatLocalizedString(str_4, UIStrings4.elementsInheritsPresentational, {});
        break;
      case "labelContainer":
        reasonElement = uiI18n.getFormatLocalizedString(str_4, UIStrings4.partOfLabelElement, {});
        break;
      case "labelFor":
        reasonElement = uiI18n.getFormatLocalizedString(str_4, UIStrings4.labelFor, {});
        break;
      case "notRendered":
        reasonElement = uiI18n.getFormatLocalizedString(str_4, UIStrings4.elementIsNotRendered, {});
        break;
      case "notVisible":
        reasonElement = uiI18n.getFormatLocalizedString(str_4, UIStrings4.elementIsNotVisible, {});
        break;
      case "presentationalRole": {
        const role = axNode?.role()?.value || "";
        const rolePresentationSpan = document.createElement("span", { is: "source-code" }).textContent = "role=" + role;
        reasonElement = uiI18n.getFormatLocalizedString(str_4, UIStrings4.elementHasPlaceholder, { PH1: rolePresentationSpan });
        break;
      }
      case "probablyPresentational":
        reasonElement = uiI18n.getFormatLocalizedString(str_4, UIStrings4.elementIsPresentational, {});
        break;
      case "uninteresting":
        reasonElement = uiI18n.getFormatLocalizedString(str_4, UIStrings4.elementNotInteresting, {});
        break;
    }
    if (reasonElement) {
      reasonElement.classList.add("ax-reason");
    }
    return reasonElement;
  }
  onattach() {
    this.listItemElement.removeChildren();
    this.reasonElement = _AXNodeIgnoredReasonTreeElement.createReasonElement(this.property.name, this.axNode);
    if (this.reasonElement) {
      this.listItemElement.appendChild(this.reasonElement);
    }
    const value = this.property.value;
    if (value.type === Accessibility.AXValueType.Idref) {
      this.appendRelatedNodeListValueElement(value);
    }
  }
};

// ../../front_end/panels/accessibility/AccessibilitySidebarView.ts
var AccessibilitySidebarView_exports = {};
__export(AccessibilitySidebarView_exports, {
  AccessibilitySidebarView: () => AccessibilitySidebarView
});
import "../../ui/components/switch/switch.js";
import * as i18n13 from "../../core/i18n/i18n.js";
import * as Root from "../../core/root/root.js";
import * as SDK4 from "../../core/sdk/sdk.js";
import * as UI5 from "../../ui/legacy/legacy.js";
import * as Lit3 from "../../ui/lit/lit.js";

// gen/front_end/panels/accessibility/accessibilitySidebarView.css.js
var accessibilitySidebarView_css_default = `/*
 * Copyright 2026 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.accessibility-toggle-container {
  padding: var(--sys-size-6) 18px;
  border-bottom: var(--sys-size-1) solid var(--sys-color-divider);
}

/*# sourceURL=${import.meta.resolve("./accessibilitySidebarView.css")} */`;

// ../../front_end/panels/accessibility/ARIAAttributesView.ts
var ARIAAttributesView_exports = {};
__export(ARIAAttributesView_exports, {
  ARIAAttributesPane: () => ARIAAttributesPane,
  DEFAULT_VIEW: () => DEFAULT_VIEW2
});
import * as i18n9 from "../../core/i18n/i18n.js";
import * as Platform from "../../core/platform/platform.js";
import * as SDK3 from "../../core/sdk/sdk.js";
import * as UI4 from "../../ui/legacy/legacy.js";
import * as Lit2 from "../../ui/lit/lit.js";
import * as VisualLogging2 from "../../ui/visual_logging/visual_logging.js";

// ../../front_end/panels/accessibility/ARIAMetadata.ts
var ARIAMetadata_exports = {};
__export(ARIAMetadata_exports, {
  ARIAMetadata: () => ARIAMetadata,
  Attribute: () => Attribute,
  ariaMetadata: () => ariaMetadata
});

// ../../front_end/generated/ARIAProperties.ts
var config = {
  "attributes": [
    {
      "isGlobal": true,
      "name": "aria-actions",
      "preventedOnRoles": [
        "caption",
        "code",
        "definition",
        "deletion",
        "emphasis",
        "generic",
        "insertion",
        "mark",
        "paragraph",
        "strong",
        "subscript",
        "suggestion",
        "superscript",
        "term",
        "time"
      ],
      "type": "IDREF_list"
    },
    {
      "name": "aria-activedescendant",
      "supportedOnRoles": [
        "application",
        "combobox",
        "composite",
        "grid",
        "group",
        "listbox",
        "menu",
        "menubar",
        "radiogroup",
        "row",
        "searchbox",
        "select",
        "spinbutton",
        "tablist",
        "textbox",
        "toolbar",
        "tree",
        "treegrid"
      ],
      "type": "IDREF"
    },
    {
      "default": "false",
      "isGlobal": true,
      "name": "aria-atomic",
      "type": "boolean"
    },
    {
      "default": "none",
      "enum": [
        "inline",
        "list",
        "both",
        "none"
      ],
      "name": "aria-autocomplete",
      "supportedOnRoles": [
        "combobox",
        "searchbox",
        "textbox"
      ],
      "type": "token"
    },
    {
      "isGlobal": true,
      "name": "aria-braillelabel",
      "preventedOnRoles": [
        "caption",
        "code",
        "definition",
        "deletion",
        "emphasis",
        "generic",
        "insertion",
        "mark",
        "none",
        "paragraph",
        "strong",
        "subscript",
        "suggestion",
        "superscript",
        "term",
        "time"
      ],
      "type": "string"
    },
    {
      "isGlobal": true,
      "name": "aria-brailleroledescription",
      "preventedOnRoles": [
        "generic"
      ],
      "type": "string"
    },
    {
      "default": "false",
      "isGlobal": true,
      "name": "aria-busy",
      "type": "boolean"
    },
    {
      "default": "undefined",
      "enum": [
        "true",
        "false",
        "mixed",
        "undefined"
      ],
      "name": "aria-checked",
      "supportedOnRoles": [
        "checkbox",
        "menuitemcheckbox",
        "menuitemradio",
        "option",
        "radio",
        "switch",
        "treeitem"
      ],
      "type": "token"
    },
    {
      "name": "aria-colcount",
      "supportedOnRoles": [
        "grid",
        "table",
        "treegrid"
      ],
      "type": "integer"
    },
    {
      "name": "aria-colindex",
      "supportedOnRoles": [
        "cell",
        "columnheader",
        "gridcell",
        "row",
        "rowheader"
      ],
      "type": "integer"
    },
    {
      "name": "aria-colindextext",
      "supportedOnRoles": [
        "cell",
        "columnheader",
        "gridcell",
        "rowheader"
      ],
      "type": "string"
    },
    {
      "name": "aria-colspan",
      "supportedOnRoles": [
        "cell",
        "columnheader",
        "rowheader"
      ],
      "type": "integer"
    },
    {
      "isGlobal": true,
      "name": "aria-controls",
      "type": "IDREF_list"
    },
    {
      "default": "false",
      "enum": [
        "page",
        "step",
        "location",
        "date",
        "time",
        "true",
        "false"
      ],
      "isGlobal": true,
      "name": "aria-current",
      "type": "token"
    },
    {
      "isGlobal": true,
      "name": "aria-describedby",
      "type": "IDREF_list"
    },
    {
      "isGlobal": true,
      "name": "aria-description",
      "type": "string"
    },
    {
      "isGlobal": true,
      "name": "aria-details",
      "type": "IDREF"
    },
    {
      "default": "false",
      "name": "aria-disabled",
      "supportedOnRoles": [
        "application",
        "button",
        "checkbox",
        "columnheader",
        "combobox",
        "composite",
        "grid",
        "gridcell",
        "group",
        "input",
        "link",
        "listbox",
        "menu",
        "menubar",
        "menuitem",
        "menuitemcheckbox",
        "menuitemradio",
        "option",
        "radio",
        "radiogroup",
        "row",
        "rowheader",
        "scrollbar",
        "searchbox",
        "select",
        "separator",
        "slider",
        "spinbutton",
        "switch",
        "tab",
        "tablist",
        "textbox",
        "toolbar",
        "tree",
        "treegrid",
        "treeitem"
      ],
      "type": "boolean"
    },
    {
      "name": "aria-errormessage",
      "supportedOnRoles": [
        "application",
        "checkbox",
        "columnheader",
        "combobox",
        "gridcell",
        "listbox",
        "radiogroup",
        "rowheader",
        "searchbox",
        "slider",
        "spinbutton",
        "switch",
        "textbox",
        "tree",
        "treegrid"
      ],
      "type": "IDREF"
    },
    {
      "default": "undefined",
      "enum": [
        "true",
        "false",
        "undefined"
      ],
      "name": "aria-expanded",
      "supportedOnRoles": [
        "application",
        "button",
        "checkbox",
        "columnheader",
        "combobox",
        "gridcell",
        "link",
        "menuitem",
        "menuitemcheckbox",
        "menuitemradio",
        "row",
        "rowheader",
        "switch",
        "tab",
        "treeitem"
      ],
      "type": "token"
    },
    {
      "isGlobal": true,
      "name": "aria-flowto",
      "type": "IDREF_list"
    },
    {
      "default": "false",
      "enum": [
        "false",
        "true",
        "menu",
        "listbox",
        "tree",
        "grid",
        "dialog"
      ],
      "name": "aria-haspopup",
      "supportedOnRoles": [
        "application",
        "button",
        "columnheader",
        "combobox",
        "gridcell",
        "link",
        "menuitem",
        "menuitemcheckbox",
        "menuitemradio",
        "rowheader",
        "searchbox",
        "slider",
        "tab",
        "textbox",
        "treeitem"
      ],
      "type": "token"
    },
    {
      "default": "undefined",
      "enum": [
        "true",
        "false",
        "undefined"
      ],
      "isGlobal": true,
      "name": "aria-hidden",
      "type": "token"
    },
    {
      "default": "false",
      "enum": [
        "grammar",
        "false",
        "spelling",
        "true"
      ],
      "name": "aria-invalid",
      "supportedOnRoles": [
        "application",
        "checkbox",
        "columnheader",
        "combobox",
        "gridcell",
        "listbox",
        "radiogroup",
        "rowheader",
        "searchbox",
        "slider",
        "spinbutton",
        "switch",
        "textbox",
        "tree",
        "treegrid"
      ],
      "type": "token"
    },
    {
      "isGlobal": true,
      "name": "aria-keyshortcuts",
      "type": "string"
    },
    {
      "isGlobal": true,
      "name": "aria-label",
      "preventedOnRoles": [
        "caption",
        "code",
        "definition",
        "deletion",
        "emphasis",
        "generic",
        "insertion",
        "mark",
        "none",
        "paragraph",
        "strong",
        "subscript",
        "suggestion",
        "superscript",
        "term",
        "time"
      ],
      "type": "string"
    },
    {
      "isGlobal": true,
      "name": "aria-labelledby",
      "preventedOnRoles": [
        "caption",
        "code",
        "definition",
        "deletion",
        "emphasis",
        "generic",
        "insertion",
        "mark",
        "none",
        "paragraph",
        "strong",
        "subscript",
        "suggestion",
        "superscript",
        "term",
        "time"
      ],
      "type": "IDREF_list"
    },
    {
      "isGlobal": true,
      "name": "aria-labeledby",
      "preventedOnRoles": [
        "caption",
        "code",
        "definition",
        "deletion",
        "emphasis",
        "generic",
        "insertion",
        "mark",
        "none",
        "paragraph",
        "strong",
        "subscript",
        "suggestion",
        "superscript",
        "term",
        "time"
      ],
      "type": "IDREF_list"
    },
    {
      "name": "aria-level",
      "supportedOnRoles": [
        "comment",
        "heading",
        "row",
        "treeitem"
      ],
      "type": "integer"
    },
    {
      "default": "undefined",
      "enum": [
        "off",
        "polite",
        "assertive",
        "undefined"
      ],
      "isGlobal": true,
      "name": "aria-live",
      "type": "token"
    },
    {
      "default": "false",
      "name": "aria-modal",
      "supportedOnRoles": [
        "alertdialog",
        "dialog"
      ],
      "type": "boolean"
    },
    {
      "default": "false",
      "name": "aria-multiline",
      "supportedOnRoles": [
        "searchbox",
        "textbox"
      ],
      "type": "boolean"
    },
    {
      "default": "false",
      "name": "aria-multiselectable",
      "supportedOnRoles": [
        "grid",
        "listbox",
        "tablist",
        "tree",
        "treegrid"
      ],
      "type": "boolean"
    },
    {
      "default": "undefined",
      "enum": [
        "horizontal",
        "undefined",
        "vertical"
      ],
      "name": "aria-orientation",
      "supportedOnRoles": [
        "listbox",
        "menu",
        "menubar",
        "radiogroup",
        "scrollbar",
        "select",
        "separator",
        "slider",
        "tablist",
        "toolbar",
        "tree",
        "treegrid"
      ],
      "type": "token"
    },
    {
      "isGlobal": true,
      "name": "aria-owns",
      "type": "IDREF_list"
    },
    {
      "name": "aria-placeholder",
      "supportedOnRoles": [
        "searchbox",
        "textbox"
      ],
      "type": "string"
    },
    {
      "name": "aria-posinset",
      "supportedOnRoles": [
        "article",
        "comment",
        "listitem",
        "menuitem",
        "menuitemcheckbox",
        "menuitemradio",
        "option",
        "radio",
        "row",
        "tab",
        "treeitem"
      ],
      "type": "integer"
    },
    {
      "default": "undefined",
      "enum": [
        "true",
        "false",
        "mixed",
        "undefined"
      ],
      "name": "aria-pressed",
      "supportedOnRoles": [
        "button"
      ],
      "type": "token"
    },
    {
      "default": "false",
      "name": "aria-readonly",
      "supportedOnRoles": [
        "checkbox",
        "columnheader",
        "combobox",
        "grid",
        "gridcell",
        "listbox",
        "radiogroup",
        "rowheader",
        "searchbox",
        "slider",
        "spinbutton",
        "switch",
        "textbox",
        "treegrid"
      ],
      "type": "boolean"
    },
    {
      "default": "additions text",
      "enum": [
        "additions",
        "removals",
        "text",
        "all"
      ],
      "isGlobal": true,
      "name": "aria-relevant",
      "type": "token_list"
    },
    {
      "default": "false",
      "name": "aria-required",
      "supportedOnRoles": [
        "checkbox",
        "columnheader",
        "combobox",
        "gridcell",
        "listbox",
        "radiogroup",
        "rowheader",
        "searchbox",
        "spinbutton",
        "switch",
        "textbox",
        "tree",
        "treegrid"
      ],
      "type": "boolean"
    },
    {
      "isGlobal": true,
      "name": "aria-roledescription",
      "preventedOnRoles": [
        "generic"
      ],
      "type": "string"
    },
    {
      "name": "aria-rowcount",
      "supportedOnRoles": [
        "grid",
        "table",
        "treegrid"
      ],
      "type": "integer"
    },
    {
      "name": "aria-rowindex",
      "supportedOnRoles": [
        "cell",
        "columnheader",
        "gridcell",
        "row",
        "rowheader"
      ],
      "type": "integer"
    },
    {
      "name": "aria-rowindextext",
      "supportedOnRoles": [
        "cell",
        "columnheader",
        "gridcell",
        "row",
        "rowheader"
      ],
      "type": "string"
    },
    {
      "name": "aria-rowspan",
      "supportedOnRoles": [
        "cell",
        "columnheader",
        "rowheader"
      ],
      "type": "integer"
    },
    {
      "default": "undefined",
      "enum": [
        "true",
        "false",
        "undefined"
      ],
      "name": "aria-selected",
      "supportedOnRoles": [
        "columnheader",
        "gridcell",
        "option",
        "row",
        "rowheader",
        "tab",
        "treeitem"
      ],
      "type": "token"
    },
    {
      "name": "aria-setsize",
      "supportedOnRoles": [
        "article",
        "comment",
        "listitem",
        "menuitem",
        "menuitemcheckbox",
        "menuitemradio",
        "option",
        "radio",
        "row",
        "tab",
        "treeitem"
      ],
      "type": "integer"
    },
    {
      "default": "none",
      "enum": [
        "ascending",
        "descending",
        "none",
        "other"
      ],
      "name": "aria-sort",
      "supportedOnRoles": [
        "columnheader",
        "rowheader"
      ],
      "type": "token"
    },
    {
      "name": "aria-valuemax",
      "supportedOnRoles": [
        "meter",
        "progressbar",
        "scrollbar",
        "separator",
        "slider",
        "spinbutton"
      ],
      "type": "decimal"
    },
    {
      "name": "aria-valuemin",
      "supportedOnRoles": [
        "meter",
        "progressbar",
        "scrollbar",
        "separator",
        "slider",
        "spinbutton"
      ],
      "type": "decimal"
    },
    {
      "name": "aria-valuenow",
      "supportedOnRoles": [
        "meter",
        "progressbar",
        "scrollbar",
        "separator",
        "slider",
        "spinbutton"
      ],
      "type": "decimal"
    },
    {
      "name": "aria-valuetext",
      "supportedOnRoles": [
        "meter",
        "progressbar",
        "scrollbar",
        "separator",
        "slider",
        "spinbutton"
      ],
      "type": "string"
    }
  ],
  "metadata": {
    "attrsNullNamespace": true,
    "export": "CORE_EXPORT",
    "namespace": "HTML",
    "namespacePrefix": "xhtml",
    "namespaceURI": "http://www.w3.org/1999/xhtml"
  },
  "roles": [
    {
      "implicitValues": {
        "aria-atomic": "true",
        "aria-live": "assertive"
      },
      "name": "alert",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "internalRoles": [
        "kAlertDialog"
      ],
      "name": "alertdialog",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "alert",
        "dialog"
      ]
    },
    {
      "name": "application",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "structure"
      ]
    },
    {
      "name": "article",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "document"
      ]
    },
    {
      "internalRoles": [
        "kBanner",
        "kHeader"
      ],
      "name": "banner",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "name": "blockquote",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "childrenPresentational": true,
      "internalRoles": [
        "kButton",
        "kToggleButton",
        "kPopUpButton"
      ],
      "name": "button",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "command"
      ]
    },
    {
      "name": "caption",
      "nameFrom": [
        "prohibited"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "name": "cell",
      "nameFrom": [
        "contents",
        "author"
      ],
      "scope": "row",
      "superclasses": [
        "section"
      ]
    },
    {
      "implicitValues": {
        "aria-checked": false
      },
      "internalRoles": [
        "kCheckBox"
      ],
      "name": "checkbox",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "requiredAttributes": [
        "aria-checked"
      ],
      "superclasses": [
        "input"
      ]
    },
    {
      "name": "code",
      "nameFrom": [
        "prohibited"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "internalRoles": [
        "kColumnHeader"
      ],
      "name": "columnheader",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "scope": [
        "row"
      ],
      "superclasses": [
        "gridcell",
        "sectionhead",
        "widget"
      ]
    },
    {
      "implicitValues": {
        "aria-expanded": "false",
        "aria-haspopup": "listbox"
      },
      "internalRoles": [
        "kComboBoxGrouping",
        "kComboBoxMenuButton",
        "kComboBoxSelect",
        "kTextFieldWithComboBox"
      ],
      "mustContain": [
        "textbox"
      ],
      "name": "combobox",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "requiredAttributes": [
        "aria-controls",
        "aria-expanded"
      ],
      "superclasses": [
        "select"
      ]
    },
    {
      "name": "comment",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "abstract": true,
      "name": "command",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "widget"
      ]
    },
    {
      "name": "complementary",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "abstract": true,
      "name": "composite",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "widget"
      ]
    },
    {
      "internalRoles": [
        "kContentInfo",
        "kFooter"
      ],
      "name": "contentinfo",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "name": "definition",
      "nameFrom": [
        "prohibited"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "internalRoles": [
        "kContentDeletion"
      ],
      "name": "deletion",
      "nameFrom": [
        "prohibited"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "name": "dialog",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "window"
      ]
    },
    {
      "deprecated": true,
      "internalRoles": [
        "kList"
      ],
      "name": "directory",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "list"
      ]
    },
    {
      "name": "document",
      "nameFrom": [
        "author"
      ],
      "nameRequired": false,
      "superclasses": [
        "structure"
      ]
    },
    {
      "name": "emphasis",
      "nameFrom": [
        "prohibited"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "mustContain": [
        "article"
      ],
      "name": "feed",
      "nameFrom": [
        "author"
      ],
      "nameRequired": false,
      "superclasses": [
        "list"
      ]
    },
    {
      "name": "figure",
      "nameFrom": [
        "author"
      ],
      "nameRequired": false,
      "superclasses": [
        "section"
      ]
    },
    {
      "name": "form",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "landmark"
      ]
    },
    {
      "internalRoles": [
        "kGenericContainer",
        "kSectionWithoutName"
      ],
      "name": "generic",
      "nameFrom": [
        "prohibited"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "mustContain": [
        "row"
      ],
      "name": "grid",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "composite",
        "table"
      ]
    },
    {
      "internalRoles": [
        "kGridCell"
      ],
      "name": "gridcell",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "scope": [
        "row"
      ],
      "superclasses": [
        "cell",
        "widget"
      ]
    },
    {
      "internalRoles": [
        "kGroup",
        "kDetails"
      ],
      "name": "group",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "implicitValues": {
        "aria-level": "2"
      },
      "name": "heading",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "sectionhead"
      ]
    },
    {
      "internalRoles": [
        "kImage"
      ],
      "name": "image",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "childrenPresentational": true,
      "deprecated": true,
      "internalRoles": [
        "kImage"
      ],
      "name": "img",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "section"
      ]
    },
    {
      "internalRoles": [
        "kContentInsertion"
      ],
      "name": "insertion",
      "nameFrom": [
        "prohibited"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "abstract": true,
      "name": "input",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "widget"
      ]
    },
    {
      "abstract": true,
      "name": "landmark",
      "nameFrom": [
        "author"
      ],
      "nameRequired": false,
      "superclasses": [
        "section"
      ]
    },
    {
      "name": "link",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "command"
      ]
    },
    {
      "implicitValues": {
        "aria-orientation": "vertical"
      },
      "internalRoles": [
        "kList"
      ],
      "mustContain": [
        "listitem"
      ],
      "name": "list",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "implicitValues": {
        "aria-orientation": "vertical"
      },
      "internalRoles": [
        "kListBox"
      ],
      "mustContain": [
        "option"
      ],
      "name": "listbox",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "select"
      ]
    },
    {
      "internalRoles": [
        "kListItem"
      ],
      "name": "listitem",
      "nameFrom": [
        "author"
      ],
      "scope": [
        "group",
        "list"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "implicitValues": {
        "aria-live": "polite"
      },
      "name": "log",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "section"
      ]
    },
    {
      "name": "main",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "name": "mark",
      "nameFrom": [
        "prohibited"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "name": "marquee",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "section"
      ]
    },
    {
      "childrenPresentational": true,
      "name": "math",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "section"
      ]
    },
    {
      "implicitValues": {
        "aria-orientation": "vertical"
      },
      "mustContain": [
        "group",
        "menuitemradio",
        "menuitem",
        "menuitemcheckbox",
        "menuitemradio"
      ],
      "name": "menu",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "select"
      ]
    },
    {
      "implicitValues": {
        "aria-orientation": "horizontal"
      },
      "internalRoles": [
        "kMenuBar"
      ],
      "mustContain": [
        "menuitem",
        "menuitemradio",
        "menuitemcheckbox"
      ],
      "name": "menubar",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "menu"
      ]
    },
    {
      "internalRoles": [
        "kMenuItem"
      ],
      "name": "menuitem",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "scope": [
        "group",
        "menu",
        "menubar"
      ],
      "superclasses": [
        "command"
      ]
    },
    {
      "childrenPresentational": true,
      "implicitValues": {
        "aria-checked": false
      },
      "internalRoles": [
        "kMenuItemCheckBox"
      ],
      "name": "menuitemcheckbox",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "scope": [
        "menu",
        "menubar"
      ],
      "superclasses": [
        "checkbox",
        "menuitem"
      ]
    },
    {
      "childrenPresentational": true,
      "implicitValues": {
        "aria-checked": false
      },
      "internalRoles": [
        "kMenuItemRadio"
      ],
      "name": "menuitemradio",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "scope": [
        "menu",
        "menubar",
        "group"
      ],
      "superclasses": [
        "menuitemcheckbox",
        "radio"
      ]
    },
    {
      "implicitValues": {
        "aria-valuemax": "100",
        "aria-valuemin": "0"
      },
      "name": "meter",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "structure"
      ]
    },
    {
      "name": "navigation",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "internalRoles": [
        "kNone"
      ],
      "name": "none",
      "nameFrom": [
        "prohibited"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "name": "note",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "childrenPresentational": true,
      "implicitValues": {
        "aria-selected": "false"
      },
      "internalRoles": [
        "kListBoxOption",
        "kMenuListOption"
      ],
      "name": "option",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "requiredAttributes": [
        "aria-selected"
      ],
      "scope": [
        "listbox"
      ],
      "superclasses": [
        "input"
      ]
    },
    {
      "name": "paragraph",
      "nameFrom": [
        "prohibited"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "deprecated": true,
      "internalRoles": [
        "kNone"
      ],
      "name": "presentation",
      "superclasses": [
        "structure"
      ]
    },
    {
      "childrenPresentational": true,
      "implicitValues": {
        "aria-valuemax": "100",
        "aria-valuemin": "0"
      },
      "internalRoles": [
        "kProgressIndicator"
      ],
      "name": "progressbar",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "range"
      ]
    },
    {
      "childrenPresentational": true,
      "implicitValues": {
        "aria-checked": "false"
      },
      "internalRoles": [
        "kRadioButton"
      ],
      "name": "radio",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "requiredAttributes": [
        "aria-checked"
      ],
      "superclasses": [
        "input"
      ]
    },
    {
      "internalRoles": [
        "kRadioGroup"
      ],
      "mustContain": [
        "radio"
      ],
      "name": "radiogroup",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "select"
      ]
    },
    {
      "abstract": true,
      "name": "range",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "widget"
      ]
    },
    {
      "name": "region",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "landmark"
      ]
    },
    {
      "abstract": true,
      "name": "roletype"
    },
    {
      "mustContain": [
        "cell",
        "columnheader",
        "gridcell",
        "rowheader"
      ],
      "name": "row",
      "nameFrom": [
        "contents",
        "author"
      ],
      "scope": [
        "grid",
        "rowgroup",
        "table",
        "treegrid"
      ],
      "superclasses": [
        "group",
        "widget"
      ]
    },
    {
      "internalRoles": [
        "kRowGroup"
      ],
      "mustContain": [
        "row"
      ],
      "name": "rowgroup",
      "nameFrom": [
        "author"
      ],
      "scope": [
        "grid",
        "table",
        "treegrid"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "internalRoles": [
        "kRowHeader"
      ],
      "name": "rowheader",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "scope": [
        "row"
      ],
      "superclasses": [
        "cell",
        "gridcell",
        "sectionhead"
      ]
    },
    {
      "childrenPresentational": true,
      "implicitValues": {
        "aria-orientation": "vertical",
        "aria-valuemax": "100",
        "aria-valuemin": "0"
      },
      "internalRoles": [
        "kScrollBar"
      ],
      "name": "scrollbar",
      "nameFrom": [
        "author"
      ],
      "nameRequired": false,
      "requiredAttributes": [
        "aria-controls",
        "aria-orientation",
        "aria-valuemax",
        "aria-valuemin",
        "aria-valuenow"
      ],
      "superclasses": [
        "range"
      ]
    },
    {
      "name": "search",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "internalRoles": [
        "kSearchBox"
      ],
      "name": "searchbox",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "textbox"
      ]
    },
    {
      "abstract": true,
      "name": "section",
      "superclasses": [
        "structure"
      ]
    },
    {
      "abstract": true,
      "name": "sectionhead",
      "nameFrom": [
        "contents",
        "author"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "abstract": true,
      "name": "select",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "composite",
        "group"
      ]
    },
    {
      "implicitValues": {
        "aria-orientation": "horizontal",
        "aria-valuemax": "100",
        "aria-valuemin": "0"
      },
      "internalRoles": [
        "kSplitter"
      ],
      "name": "separator",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "childrenPresentational": true,
      "implicitValues": {
        "aria-orientation": "horizontal",
        "aria-valuemax": "100",
        "aria-valuemin": "0"
      },
      "name": "slider",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "requiredAttributes": [
        "aria-valuemax",
        "aria-valuemin",
        "aria-valuenow"
      ],
      "superclasses": [
        "input",
        "range"
      ]
    },
    {
      "internalRoles": [
        "kSpinButton"
      ],
      "name": "spinbutton",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "requiredAttributes": [
        "aria-valuemax",
        "aria-valuemin",
        "aria-valuenow"
      ],
      "superclasses": [
        "composite",
        "input",
        "range"
      ]
    },
    {
      "implicitValues": {
        "aria-atomic": "true",
        "aria-live": "polite"
      },
      "name": "status",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "name": "strong",
      "nameFrom": [
        "prohibited"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "abstract": true,
      "name": "structure",
      "superclasses": [
        "roletype"
      ]
    },
    {
      "name": "subscript",
      "nameFrom": [
        "prohibited"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "name": "suggestion",
      "nameFrom": [
        "prohibited"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "name": "superscript",
      "nameFrom": [
        "prohibited"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "childrenPresentational": true,
      "implicitValues": {
        "aria-checked": "false"
      },
      "name": "switch",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "requiredAttributes": [
        "aria-checked"
      ],
      "superclasses": [
        "checkbox"
      ]
    },
    {
      "childrenPresentational": true,
      "implicitValues": {
        "aria-selected": "false"
      },
      "name": "tab",
      "nameFrom": [
        "contents",
        "author"
      ],
      "scope": [
        "tablist"
      ],
      "superclasses": [
        "sectionhead",
        "widget"
      ]
    },
    {
      "mustContain": [
        "row"
      ],
      "name": "table",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "section"
      ]
    },
    {
      "implicitValues": {
        "aria-orientation": "horizontal"
      },
      "internalRoles": [
        "kTabList"
      ],
      "mustContain": [
        "tab"
      ],
      "name": "tablist",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "composite"
      ]
    },
    {
      "internalRoles": [
        "kTabPanel"
      ],
      "name": "tabpanel",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "section"
      ]
    },
    {
      "name": "term",
      "nameFrom": [
        "prohibited"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "name": "time",
      "nameFrom": [
        "prohibited"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "internalRoles": [
        "kTextField"
      ],
      "name": "textbox",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "input"
      ]
    },
    {
      "name": "timer",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "status"
      ]
    },
    {
      "implicitValues": {
        "aria-orientation": "horizontal"
      },
      "name": "toolbar",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "group"
      ]
    },
    {
      "name": "tooltip",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "section"
      ]
    },
    {
      "implicitValues": {
        "aria-orientation": "vertical"
      },
      "mustContain": [
        "group",
        "treeitem"
      ],
      "name": "tree",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "select"
      ]
    },
    {
      "internalRoles": [
        "kTreeGrid"
      ],
      "mustContain": [
        "row"
      ],
      "name": "treegrid",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "grid",
        "tree"
      ]
    },
    {
      "internalRoles": [
        "kTreeItem"
      ],
      "name": "treeitem",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "scope": [
        "group",
        "tree"
      ],
      "superclasses": [
        "listitem",
        "option"
      ]
    },
    {
      "abstract": true,
      "name": "widget",
      "superclasses": [
        "roletype"
      ]
    },
    {
      "abstract": true,
      "name": "window",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "roletype"
      ]
    },
    {
      "internalRoles": [
        "kSectionFooter"
      ],
      "name": "sectionfooter",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "contentinfo"
      ]
    },
    {
      "internalRoles": [
        "kSectionHeader"
      ],
      "name": "sectionheader",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "banner"
      ]
    },
    {
      "internalRoles": [
        "kDocAbstract"
      ],
      "name": "doc-abstract",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "internalRoles": [
        "kDocAcknowledgments"
      ],
      "name": "doc-acknowledgments",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "internalRoles": [
        "kDocAfterword"
      ],
      "name": "doc-afterword",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "internalRoles": [
        "kDocAppendix"
      ],
      "name": "doc-appendix",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "internalRoles": [
        "kDocBackLink"
      ],
      "name": "doc-backlink",
      "nameFrom": [
        "contents",
        "author"
      ],
      "superclasses": [
        "link"
      ]
    },
    {
      "internalRoles": [
        "kDocBiblioEntry"
      ],
      "name": "doc-biblioentry",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "listitem"
      ]
    },
    {
      "internalRoles": [
        "kDocBibliography"
      ],
      "name": "doc-bibliography",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "internalRoles": [
        "kDocBiblioRef"
      ],
      "name": "doc-biblioref",
      "nameFrom": [
        "contents",
        "author"
      ],
      "superclasses": [
        "link"
      ]
    },
    {
      "internalRoles": [
        "kDocChapter"
      ],
      "name": "doc-chapter",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "internalRoles": [
        "kDocColophon"
      ],
      "name": "doc-colophon",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "internalRoles": [
        "kDocConclusion"
      ],
      "name": "doc-conclusion",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "internalRoles": [
        "kDocCover"
      ],
      "name": "doc-cover",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "img"
      ]
    },
    {
      "internalRoles": [
        "kDocCredit"
      ],
      "name": "doc-credit",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "internalRoles": [
        "kDocCredits"
      ],
      "name": "doc-credits",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "internalRoles": [
        "kDocDedication"
      ],
      "name": "doc-dedication",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "internalRoles": [
        "kDocEndnote"
      ],
      "name": "doc-endnote",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "listitem"
      ]
    },
    {
      "internalRoles": [
        "kDocEndnotes"
      ],
      "name": "doc-endnotes",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "internalRoles": [
        "kDocEpigraph"
      ],
      "name": "doc-epigraph",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "internalRoles": [
        "kDocEpilogue"
      ],
      "name": "doc-epilogue",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "internalRoles": [
        "kDocErrata"
      ],
      "name": "doc-errata",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "internalRoles": [
        "kDocExample"
      ],
      "name": "doc-example",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "internalRoles": [
        "kDocFootnote"
      ],
      "name": "doc-footnote",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "internalRoles": [
        "kDocForeword"
      ],
      "name": "doc-foreword",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "internalRoles": [
        "kDocGlossary"
      ],
      "name": "doc-glossary",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "internalRoles": [
        "kDocGlossRef"
      ],
      "name": "doc-glossref",
      "nameFrom": [
        "contents",
        "author"
      ],
      "superclasses": [
        "link"
      ]
    },
    {
      "internalRoles": [
        "kDocIndex"
      ],
      "name": "doc-index",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "navigation"
      ]
    },
    {
      "internalRoles": [
        "kDocIntroduction"
      ],
      "name": "doc-introduction",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "internalRoles": [
        "kDocNoteRef"
      ],
      "name": "doc-noteref",
      "nameFrom": [
        "contents",
        "author"
      ],
      "superclasses": [
        "link"
      ]
    },
    {
      "internalRoles": [
        "kDocNotice"
      ],
      "name": "doc-notice",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "note"
      ]
    },
    {
      "internalRoles": [
        "kDocPageBreak"
      ],
      "name": "doc-pagebreak",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "separator"
      ]
    },
    {
      "internalRoles": [
        "kDocPageFooter"
      ],
      "name": "doc-pagefooter",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "contentinfo"
      ]
    },
    {
      "internalRoles": [
        "kDocPageHeader"
      ],
      "name": "doc-pageheader",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "banner"
      ]
    },
    {
      "internalRoles": [
        "kDocPageList"
      ],
      "name": "doc-pagelist",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "navigation"
      ]
    },
    {
      "internalRoles": [
        "kDocPart"
      ],
      "name": "doc-part",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "internalRoles": [
        "kDocPreface"
      ],
      "name": "doc-preface",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "internalRoles": [
        "kDocPrologue"
      ],
      "name": "doc-prologue",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "internalRoles": [
        "kDocPullquote"
      ],
      "name": "doc-pullquote",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "internalRoles": [
        "kDocQna"
      ],
      "name": "doc-qna",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "internalRoles": [
        "kDocSubtitle"
      ],
      "name": "doc-subtitle",
      "nameFrom": [
        "contents",
        "author"
      ],
      "superclasses": [
        "sectionhead"
      ]
    },
    {
      "internalRoles": [
        "kDocTip"
      ],
      "name": "doc-tip",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "note"
      ]
    },
    {
      "internalRoles": [
        "kDocToc"
      ],
      "name": "doc-toc",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "navigation"
      ]
    },
    {
      "internalRoles": [
        "kGraphicsDocument"
      ],
      "name": "graphics-document",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "document"
      ]
    },
    {
      "internalRoles": [
        "kGraphicsObject"
      ],
      "name": "graphics-object",
      "nameFrom": [
        "contents",
        "author"
      ],
      "superclasses": [
        "group"
      ]
    },
    {
      "internalRoles": [
        "kGraphicsSymbol"
      ],
      "name": "graphics-symbol",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "img"
      ]
    }
  ]
};

// ../../front_end/panels/accessibility/ARIAMetadata.ts
var ARIAMetadata = class {
  attributes;
  roleNames;
  constructor(config2) {
    this.attributes = /* @__PURE__ */ new Map();
    this.roleNames = [];
    if (config2) {
      this.initialize(config2);
    }
  }
  initialize(config2) {
    const attributes = config2["attributes"];
    const booleanEnum = ["true", "false"];
    for (const attributeConfig of attributes) {
      if (attributeConfig.type === "boolean") {
        attributeConfig.enum = booleanEnum;
      }
      this.attributes.set(attributeConfig.name, new Attribute(attributeConfig));
    }
    this.roleNames = config2["roles"].map((roleConfig) => roleConfig.name);
  }
  valuesForProperty(property) {
    const attribute = this.attributes.get(property);
    if (attribute) {
      return attribute.getEnum();
    }
    if (property === "role") {
      return this.roleNames;
    }
    return [];
  }
};
var instance;
function ariaMetadata() {
  if (!instance) {
    instance = new ARIAMetadata(config || null);
  }
  return instance;
}
var Attribute = class {
  enum;
  constructor(config2) {
    this.enum = [];
    if (config2.enum) {
      this.enum = config2.enum;
    }
  }
  getEnum() {
    return this.enum;
  }
};

// ../../front_end/panels/accessibility/ARIAAttributesView.ts
var UIStrings5 = {
  /**
   * @description Text in the ARIA attributes view under the Accessibility tab in the Elements panel.
   */
  ariaAttributes: "ARIA attributes",
  /**
   * @description Text in the ARIA attributes view under the Accessibility tab in the Elements panel.
   */
  noAriaAttributes: "No ARIA attributes"
};
var str_5 = i18n9.i18n.registerUIStrings("panels/accessibility/ARIAAttributesView.ts", UIStrings5);
var i18nString4 = i18n9.i18n.getLocalizedString.bind(void 0, str_5);
var { render: render3, html: html2 } = Lit2;
var { widget } = UI4.Widget;
var DEFAULT_VIEW2 = (input, output, target) => {
  const MAX_CONTENT_LENGTH = 1e4;
  const onStartEditing = (attribute, e) => {
    e.consume(true);
    input.onStartEditing(attribute);
  };
  const propertyCompletions = (attribute) => {
    const values = input.propertyCompletions.get(attribute);
    if (!values?.length) {
      return Lit2.nothing;
    }
    return html2`<datalist id=completions>
      ${values.map((value) => html2`<option>${value}</option>`)}
    </datalist>`;
  };
  render3(
    // clang-format off
    input.attributes.length === 0 ? html2`
          <style>${accessibilityProperties_css_default}</style>
          <devtools-widget
            ${widget(UI4.EmptyWidget.EmptyWidget, { text: i18nString4(UIStrings5.noAriaAttributes) })}
            class="gray-info-message info-message-overflow"></devtools-widget>` : html2`<devtools-tree
           hide-overflow
           .template=${html2`
             <ul role="tree">
              ${input.attributes?.map((attribute) => html2`
                <li role="treeitem" jslog=${VisualLogging2.treeItem("aria-attribute")}>
                  <style>${accessibilityProperties_css_default}</style>
                  <span class="ax-name monospace" @mousedown=${onStartEditing.bind(null, attribute)}>
                    ${attribute.name}
                  </span>
                  <span class="separator" @mousedown=${onStartEditing.bind(null, attribute)}>${":\xA0"}</span>
                  <devtools-prompt
                    completions=completions
                    class="monospace"
                    value=${attribute.value}
                    @mousedown=${onStartEditing.bind(null, attribute)}
                    .completionTimeout=${0}
                    ?editing=${input.attributeBeingEdited === attribute}
                    @commit=${(e) => input.onCommitEditing(attribute, e.detail)}
                    @cancel=${() => input.onCancelEditing(attribute)}>
                      ${Platform.StringUtilities.trimMiddle(attribute.value, MAX_CONTENT_LENGTH)}
                      ${propertyCompletions(attribute)}
                  </devtools-prompt>
                </li>`)}
             </ul>
           `}></devtools-tree>`,
    // clang-format on
    target,
    {
      container: {
        attributes: {
          jslog: `${VisualLogging2.section("aria-attributes")}`,
          ...input.backendNodeId ? { "data-backend-node-id": `${input.backendNodeId}` } : {},
          ...input.targetId ? { "data-target-id": `${input.targetId}` } : {}
        }
      }
    }
  );
};
var ARIAAttributesPane = class extends AccessibilitySubPane {
  #view;
  #attributeBeingEdited = null;
  constructor(view = DEFAULT_VIEW2) {
    super({
      title: i18nString4(UIStrings5.ariaAttributes),
      viewId: "aria-attributes",
      useShadowDom: "pure"
    });
    this.#view = view;
  }
  setNode(node) {
    super.setNode(node);
    this.requestUpdate();
  }
  performUpdate() {
    const onStartEditing = (attribute) => {
      this.#attributeBeingEdited = attribute;
      this.requestUpdate();
    };
    const onCancelEditing = (attribute) => {
      if (attribute === this.#attributeBeingEdited) {
        this.#attributeBeingEdited = null;
      }
      this.requestUpdate();
    };
    const onCommitEditing = (attribute, result) => {
      const node = this.node();
      if (node && attribute.value !== result) {
        node.setAttributeValue(attribute.name, result);
      }
      if (attribute === this.#attributeBeingEdited) {
        this.#attributeBeingEdited = null;
      }
      this.requestUpdate();
    };
    const attributes = this.node()?.attributes()?.filter((attribute) => this.isARIAAttribute(attribute)) ?? [];
    const propertyCompletions = new Map(attributes.map((attribute) => [attribute, ariaMetadata().valuesForProperty(attribute.name)]));
    const input = {
      attributeBeingEdited: this.#attributeBeingEdited,
      attributes,
      onStartEditing,
      onCommitEditing,
      onCancelEditing,
      propertyCompletions,
      backendNodeId: this.node()?.backendNodeId(),
      targetId: this.node()?.domModel().target().id()
    };
    this.#view(input, {}, this.contentElement);
  }
  isARIAAttribute(attribute) {
    return SDK3.DOMModel.ARIA_ATTRIBUTES.has(attribute.name);
  }
};

// ../../front_end/panels/accessibility/SourceOrderView.ts
import "../../ui/legacy/legacy.js";
import * as i18n11 from "../../core/i18n/i18n.js";
import { html as html3, nothing as nothing2, render as render4 } from "../../ui/lit/lit.js";
import * as VisualLogging3 from "../../ui/visual_logging/visual_logging.js";
var UIStrings6 = {
  /**
   * @description Name of a feature that allows the developer to view the contents of the page in the
   * 'source order' (the order in which the HTML elements show up in the source code) under the
   * Accessibility tab in the Elements panel.
   */
  sourceOrderViewer: "Source order viewer",
  /**
   * @description Text in the source order viewer under the Accessibility tab of the Elements panel shown when the selected node has no child elements.
   */
  noSourceOrderInformation: "No source order information available",
  /**
   * @description Text in the source order viewer under the Accessibility tab of the Elements panel shown when the selected node has many child elements.
   */
  thereMayBeADelayInDisplaying: "There may be a delay in displaying source order for elements with many children",
  /**
   * @description Checkbox label in the source order viewer under the Accessibility tab of the Elements panel. Source order
   * means the order in which the HTML elements show up in the source code.
   */
  showSourceOrder: "Show source order"
};
var str_6 = i18n11.i18n.registerUIStrings("panels/accessibility/SourceOrderView.ts", UIStrings6);
var i18nString5 = i18n11.i18n.getLocalizedString.bind(void 0, str_6);
var MAX_CHILD_ELEMENTS_THRESHOLD = 300;
var DEFAULT_VIEW3 = (input, _output, target) => {
  function onShowSourceOrderChanged(event) {
    const checkbox = event.currentTarget;
    input.onShowSourceOrderChanged(checkbox.checked);
    event.consume();
  }
  render4(html3`
    ${input.showSourceOrder === void 0 ? html3`
        <div class="gray-info-message info-message-overflow">
          ${i18nString5(UIStrings6.noSourceOrderInformation)}
        </div>
      ` : html3`
      ${input.childCount >= MAX_CHILD_ELEMENTS_THRESHOLD ? html3`
          <div class="gray-info-message info-message-overflow"
                id="source-order-warning">
            ${i18nString5(UIStrings6.thereMayBeADelayInDisplaying)}
          </div>
        ` : nothing2}
      <devtools-checkbox class="source-order-checkbox"
                          jslog=${VisualLogging3.toggle().track({ click: true })}
                          ?checked=${input.showSourceOrder}
                          @change=${onShowSourceOrderChanged}>
        ${i18nString5(UIStrings6.showSourceOrder)}
      </devtools-checkbox>
      `}
  `, target, { container: { attributes: { jslog: `${VisualLogging3.section("source-order-viewer")}` } } });
};
var SourceOrderPane = class extends AccessibilitySubPane {
  #childCount = 0;
  #showSourceOrder = void 0;
  #view;
  constructor(view = DEFAULT_VIEW3) {
    super({
      title: i18nString5(UIStrings6.sourceOrderViewer),
      viewId: "source-order-viewer",
      useShadowDom: "pure"
    });
    this.#view = view;
  }
  async setNodeAsync(node) {
    if (this.nodeInternal && this.#showSourceOrder) {
      this.nodeInternal.domModel().overlayModel().hideSourceOrderInOverlay();
    }
    super.setNode(node);
    this.#childCount = this.nodeInternal?.childNodeCount() ?? 0;
    if (!this.nodeInternal || !this.#childCount) {
      this.#showSourceOrder = void 0;
    } else {
      if (!this.nodeInternal.children()) {
        await this.nodeInternal.getSubtree(1, false);
      }
      const children = this.nodeInternal.children();
      if (!children.some((child) => child.nodeType() === Node.ELEMENT_NODE)) {
        this.#showSourceOrder = void 0;
      } else if (this.#showSourceOrder === void 0) {
        this.#showSourceOrder = false;
      }
      if (this.#showSourceOrder) {
        this.nodeInternal.domModel().overlayModel().highlightSourceOrderInOverlay(this.nodeInternal);
      }
    }
    this.requestUpdate();
  }
  async performUpdate() {
    const onShowSourceOrderChanged = (showSourceOrder) => {
      if (!this.nodeInternal) {
        this.#showSourceOrder = void 0;
        return;
      }
      if (showSourceOrder) {
        this.nodeInternal.domModel().overlayModel().highlightSourceOrderInOverlay(this.nodeInternal);
      } else {
        this.nodeInternal.domModel().overlayModel().hideSourceOrderInOverlay();
      }
      this.#showSourceOrder = showSourceOrder;
    };
    const input = {
      childCount: this.#childCount,
      showSourceOrder: this.#showSourceOrder,
      onShowSourceOrderChanged
    };
    const output = void 0;
    this.#view(input, output, this.contentElement);
  }
};

// ../../front_end/panels/accessibility/AccessibilitySidebarView.ts
var { html: html4, render: render5 } = Lit3;
var UIStrings7 = {
  /**
   * @description Text for a toggle to turn on the accessibility tree view.
   */
  showAccessibilityTree: "Show accessibility tree"
};
var str_7 = i18n13.i18n.registerUIStrings("panels/accessibility/AccessibilitySidebarView.ts", UIStrings7);
var i18nString6 = i18n13.i18n.getLocalizedString.bind(void 0, str_7);
var accessibilitySidebarViewInstance;
var AccessibilitySidebarView = class _AccessibilitySidebarView extends UI5.Widget.VBox {
  #node;
  #axNode;
  skipNextPullNode;
  sidebarPaneStack;
  ariaSubPane;
  axNodeSubPane;
  sourceOrderSubPane;
  announcementsRecordingSubPane;
  toggleContainer;
  toggleAction;
  constructor() {
    super();
    this.registerRequiredCSS(accessibilitySidebarView_css_default);
    this.element.classList.add("accessibility-sidebar-view");
    this.#node = null;
    this.#axNode = null;
    this.skipNextPullNode = false;
    this.sidebarPaneStack = UI5.ViewManager.ViewManager.instance().createStackLocation();
    this.toggleContainer = document.createElement("div");
    this.toggleContainer.classList.add("accessibility-toggle-container");
    this.element.appendChild(this.toggleContainer);
    this.toggleAction = UI5.ActionRegistry.ActionRegistry.instance().getAction("elements.toggle-a11y-tree");
    this.toggleAction.addEventListener(UI5.ActionRegistration.Events.TOGGLED, this.updateToggle, this);
    this.updateToggle();
    this.ariaSubPane = new ARIAAttributesPane();
    void this.sidebarPaneStack.showView(this.ariaSubPane);
    this.axNodeSubPane = new AXNodeSubPane();
    void this.sidebarPaneStack.showView(this.axNodeSubPane);
    this.sourceOrderSubPane = new SourceOrderPane();
    void this.sidebarPaneStack.showView(this.sourceOrderSubPane);
    if (Boolean(Root.Runtime.hostConfig.devToolsAriaLiveRecording?.enabled)) {
      this.announcementsRecordingSubPane = new AccessibilityAnnouncementRecordingView();
      void this.sidebarPaneStack.showView(this.announcementsRecordingSubPane);
    }
    this.sidebarPaneStack.widget().show(this.element);
    UI5.Context.Context.instance().addFlavorChangeListener(SDK4.DOMModel.DOMNode, this.pullNode, this);
    this.pullNode();
  }
  static instance(opts) {
    if (!accessibilitySidebarViewInstance || opts?.forceNew) {
      accessibilitySidebarViewInstance = new _AccessibilitySidebarView();
    }
    return accessibilitySidebarViewInstance;
  }
  node() {
    return this.#node;
  }
  axNode() {
    return this.#axNode;
  }
  setNode(node, fromAXTree) {
    this.skipNextPullNode = Boolean(fromAXTree);
    this.#node = node;
    this.requestUpdate();
  }
  accessibilityNodeCallback(axNode) {
    if (!axNode) {
      return;
    }
    this.#axNode = axNode;
    if (axNode.isDOMNode()) {
      void this.sidebarPaneStack.showView(this.ariaSubPane, this.axNodeSubPane);
    } else {
      this.sidebarPaneStack.removeView(this.ariaSubPane);
    }
    this.axNodeSubPane.setAXNode(axNode);
  }
  async performUpdate() {
    const node = this.node();
    this.axNodeSubPane.setNode(node);
    this.ariaSubPane.setNode(node);
    void this.sourceOrderSubPane.setNodeAsync(node);
    if (!node) {
      return;
    }
    const accessibilityModel = node.domModel().target().model(SDK4.AccessibilityModel.AccessibilityModel);
    if (!accessibilityModel) {
      return;
    }
    await accessibilityModel.requestPartialAXTree(node);
    this.accessibilityNodeCallback(accessibilityModel.axNodeForDOMNode(node));
  }
  wasShown() {
    super.wasShown();
    void this.performUpdate();
    SDK4.TargetManager.TargetManager.instance().addModelListener(
      SDK4.DOMModel.DOMModel,
      SDK4.DOMModel.Events.AttrModified,
      this.onNodeChange,
      this,
      { scoped: true }
    );
    SDK4.TargetManager.TargetManager.instance().addModelListener(
      SDK4.DOMModel.DOMModel,
      SDK4.DOMModel.Events.AttrRemoved,
      this.onNodeChange,
      this,
      { scoped: true }
    );
    SDK4.TargetManager.TargetManager.instance().addModelListener(
      SDK4.DOMModel.DOMModel,
      SDK4.DOMModel.Events.CharacterDataModified,
      this.onNodeChange,
      this,
      { scoped: true }
    );
    SDK4.TargetManager.TargetManager.instance().addModelListener(
      SDK4.DOMModel.DOMModel,
      SDK4.DOMModel.Events.ChildNodeCountUpdated,
      this.onNodeChange,
      this,
      { scoped: true }
    );
  }
  willHide() {
    super.willHide();
    SDK4.TargetManager.TargetManager.instance().removeModelListener(
      SDK4.DOMModel.DOMModel,
      SDK4.DOMModel.Events.AttrModified,
      this.onNodeChange,
      this
    );
    SDK4.TargetManager.TargetManager.instance().removeModelListener(
      SDK4.DOMModel.DOMModel,
      SDK4.DOMModel.Events.AttrRemoved,
      this.onNodeChange,
      this
    );
    SDK4.TargetManager.TargetManager.instance().removeModelListener(
      SDK4.DOMModel.DOMModel,
      SDK4.DOMModel.Events.CharacterDataModified,
      this.onNodeChange,
      this
    );
    SDK4.TargetManager.TargetManager.instance().removeModelListener(
      SDK4.DOMModel.DOMModel,
      SDK4.DOMModel.Events.ChildNodeCountUpdated,
      this.onNodeChange,
      this
    );
  }
  pullNode() {
    if (this.skipNextPullNode) {
      this.skipNextPullNode = false;
      return;
    }
    this.setNode(UI5.Context.Context.instance().flavor(SDK4.DOMModel.DOMNode));
  }
  updateToggle() {
    const isToggled = this.toggleAction.toggled();
    this.sidebarPaneStack.notifyVisibilityChanged(isToggled);
    render5(
      html4`
      <div style="display: flex; align-items: center; gap: 8px;">
        <devtools-switch
          role="switch"
          aria-label=${i18nString6(UIStrings7.showAccessibilityTree)}
          .checked=${isToggled}
          .label=${i18nString6(UIStrings7.showAccessibilityTree)}
          .jslogContext=${"elements.toggle-a11y-tree"}
          @switchchange=${this.onToggleChange}
        ></devtools-switch>
        <span style="color: var(--sys-color-on-surface);">${i18nString6(UIStrings7.showAccessibilityTree)}</span>
      </div>
    `,
      this.toggleContainer,
      { host: this }
    );
  }
  onToggleChange(_event) {
    void this.toggleAction.execute();
  }
  onNodeChange(event) {
    if (!this.node()) {
      return;
    }
    const data = event.data;
    const node = data instanceof SDK4.DOMModel.DOMNode ? data : data.node;
    if (this.node() !== node) {
      return;
    }
    this.requestUpdate();
  }
};
export {
  ARIAAttributesView_exports as ARIAAttributesView,
  ARIAMetadata_exports as ARIAMetadata,
  AccessibilityAnnouncementRecordingListView_exports as AccessibilityAnnouncementRecordingListView,
  AccessibilityAnnouncementRecordingView_exports as AccessibilityAnnouncementRecordingView,
  AccessibilityNodeView_exports as AccessibilityNodeView,
  AccessibilitySidebarView_exports as AccessibilitySidebarView,
  AccessibilityStrings_exports as AccessibilityStrings,
  AccessibilitySubPane_exports as AccessibilitySubPane
};
//# sourceMappingURL=accessibility.js.map
