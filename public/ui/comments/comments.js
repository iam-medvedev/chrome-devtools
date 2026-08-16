var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/ui/comments/CommentAnchorResolver.js
var CommentAnchorResolver_exports = {};
__export(CommentAnchorResolver_exports, {
  closestAcrossShadow: () => closestAcrossShadow,
  deepQuerySelector: () => deepQuerySelector,
  deepQuerySelectorAll: () => deepQuerySelectorAll,
  extractVeName: () => extractVeName,
  getSiblingIndex: () => getSiblingIndex,
  isElementVisible: () => isElementVisible,
  isNonEmptyItem: () => isNonEmptyItem,
  isTabTitle: () => isTabTitle,
  matchesVePath: () => matchesVePath,
  rematchCommentAnchor: () => rematchCommentAnchor,
  resolveCommentAnchor: () => resolveCommentAnchor,
  resolveCommentAnchorElement: () => resolveCommentAnchorElement
});
import * as CodeMirror from "./../../third_party/codemirror.next/codemirror.next.js";
import * as VisualLogging from "./../visual_logging/visual_logging.js";
var IGNORED_MINOR_CONTROLS = /* @__PURE__ */ new Set([
  VisualLogging.VisualElements.Action,
  VisualLogging.VisualElements.Toggle,
  VisualLogging.VisualElements.Close,
  VisualLogging.VisualElements.Expand,
  VisualLogging.VisualElements.ToggleSubpane,
  VisualLogging.VisualElements.Toolbar
]);
function closestAcrossShadow(element, selector) {
  let current = element;
  while (current) {
    if (current.matches(selector)) {
      return current;
    }
    current = current.parentElementOrShadowHost();
  }
  return null;
}
function isCodeMirrorEditor(element) {
  return element.classList.contains("cm-editor");
}
function isNonEmptyItem(element) {
  return element.deepTextContent().trim().length > 0;
}
function isTabTitle(element) {
  let current = element;
  while (current) {
    if (VisualLogging.needsLogging(current)) {
      try {
        const config = VisualLogging.getLoggingConfig(current);
        if (config.ve === VisualLogging.VisualElements.PanelTabHeader) {
          return true;
        }
      } catch {
      }
    }
    const role = current.getAttribute("role");
    if (role === "tab") {
      return true;
    }
    if (current.classList.contains("tab-element") || current.classList.contains("tab-header")) {
      return true;
    }
    current = current.parentElementOrShadowHost();
  }
  return false;
}
function resolveCodeMirrorLineInfo(element) {
  const cmEditor = element.closest(".cm-editor");
  if (!cmEditor) {
    return null;
  }
  const view = CodeMirror.EditorView.findFromDOM(cmEditor);
  if (!view) {
    throw new Error("Could not find CodeMirror EditorView from .cm-editor element");
  }
  const doc = view.state.doc;
  const gutterEl = element.closest(".cm-gutterElement");
  if (gutterEl) {
    const rawText = gutterEl.textContent?.trim() || "";
    if (rawText.length > 0 && /^\d+$/.test(rawText)) {
      const lineNum = parseInt(rawText, 10);
      if (lineNum > 0 && lineNum <= doc.lines) {
        const line = doc.line(lineNum);
        const textSignature = line.text.trim();
        return textSignature ? { lineNumber: line.number, textSignature } : null;
      }
    }
    return null;
  }
  const cmLine = element.classList.contains("cm-line") ? element : element.closest(".cm-line");
  if (cmLine) {
    try {
      const pos = view.posAtDOM(cmLine);
      const line = doc.lineAt(pos);
      const textSignature = line.text.trim();
      return textSignature ? { lineNumber: line.number, textSignature } : null;
    } catch {
      return null;
    }
  }
  return null;
}
function resolveCommentAnchorElement(element) {
  if (isTabTitle(element)) {
    return null;
  }
  const cmEditor = element.closest(".cm-editor");
  if (cmEditor) {
    const lineInfo = resolveCodeMirrorLineInfo(element);
    if (!lineInfo) {
      return null;
    }
    return cmEditor;
  }
  const domainElement = closestAcrossShadow(element, "[data-network-request-id], [data-backend-node-id]");
  if (domainElement) {
    return isNonEmptyItem(domainElement) ? domainElement : null;
  }
  let target = element;
  let fallbackCandidate = null;
  while (target) {
    if (VisualLogging.needsLogging(target)) {
      try {
        const config = VisualLogging.getLoggingConfig(target);
        if (config.ve === VisualLogging.VisualElements.TableRow || config.ve === VisualLogging.VisualElements.TreeItem) {
          return isNonEmptyItem(target) ? target : null;
        }
        if (!fallbackCandidate && !IGNORED_MINOR_CONTROLS.has(config.ve)) {
          fallbackCandidate = target;
        }
      } catch {
      }
    }
    target = target.parentElementOrShadowHost();
  }
  if (fallbackCandidate && isNonEmptyItem(fallbackCandidate)) {
    return fallbackCandidate;
  }
  return null;
}
function extractVeName(vePath) {
  return vePath.split(" > ").pop()?.split(":")[0]?.trim() || "";
}
function matchesVePath(element, vePath, targetVeName = extractVeName(vePath)) {
  if (!VisualLogging.needsLogging(element)) {
    return false;
  }
  const jslog = element.getAttribute("jslog");
  if (targetVeName && jslog) {
    const match = jslog.trim().match(/^([a-zA-Z0-9_-]+)/);
    if (!match || match[1] !== targetVeName) {
      return false;
    }
  }
  return VisualLogging.getVePath(element) === vePath;
}
function getSiblingIndex(element, vePath, root = element.ownerDocument || document) {
  const targetVeName = extractVeName(vePath);
  const allJslog = deepQuerySelectorAll(root, "[jslog]");
  let index = 0;
  for (const el of allJslog) {
    if (el === element) {
      return index;
    }
    if (matchesVePath(el, vePath, targetVeName)) {
      index++;
    }
  }
  return index;
}
function checkCodeMirrorLineMatch(editor, editorLineNumber, textSignature) {
  const view = CodeMirror.EditorView.findFromDOM(editor);
  if (!view) {
    return false;
  }
  const doc = view.state.doc;
  if (editorLineNumber <= 0 || editorLineNumber > doc.lines) {
    return false;
  }
  const line = doc.line(editorLineNumber);
  return line.text.trim() === textSignature;
}
function resolveCommentAnchor(element, root = element.ownerDocument || document) {
  const target = resolveCommentAnchorElement(element);
  if (!target) {
    return null;
  }
  const vePath = VisualLogging.getVePath(target);
  if (!vePath) {
    return null;
  }
  const isEditorTarget = isCodeMirrorEditor(target);
  let textSignature;
  let parentTextSignature;
  let editor;
  if (isEditorTarget) {
    const lineInfo = resolveCodeMirrorLineInfo(element);
    if (!lineInfo) {
      return null;
    }
    textSignature = lineInfo.textSignature;
    const filePath = target.getAttribute("data-file-path") ?? void 0;
    editor = { lineNumber: lineInfo.lineNumber, filePath };
  } else {
    textSignature = target.deepTextContent();
    const parentEl = target.parentElementOrShadowHost();
    parentTextSignature = parentEl ? parentEl.deepTextContent() : void 0;
  }
  const siblingIndex = getSiblingIndex(target, vePath, root);
  const networkRequestId = target.getAttribute("data-network-request-id") ?? void 0;
  const backendNodeIdStr = target.getAttribute("data-backend-node-id");
  const backendNodeId = backendNodeIdStr ? Number(backendNodeIdStr) : void 0;
  return {
    vePath,
    textSignature,
    parentTextSignature,
    siblingIndex,
    networkRequestId,
    backendNodeId,
    editor
  };
}
function deepQuerySelectorAll(root, selector, limit = Infinity) {
  const results = [];
  if (limit <= 0 || Number.isNaN(limit)) {
    return results;
  }
  function collectFromContainer(container) {
    if (container instanceof Element && container.shadowRoot) {
      if (collectFromContainer(container.shadowRoot)) {
        return true;
      }
    }
    let child = container.firstElementChild;
    while (child) {
      if (child.matches(selector)) {
        results.push(child);
        if (results.length >= limit) {
          return true;
        }
      }
      if (collectFromContainer(child)) {
        return true;
      }
      child = child.nextElementSibling;
    }
    return false;
  }
  collectFromContainer(root);
  return results;
}
function deepQuerySelector(root, selector) {
  return deepQuerySelectorAll(root, selector, 1)[0] ?? null;
}
function rematchCommentAnchor(comment, root = document, cachedJslogElements) {
  const { anchor } = comment;
  if (anchor.networkRequestId) {
    return deepQuerySelector(root, `[data-network-request-id="${CSS.escape(anchor.networkRequestId)}"]`);
  }
  if (anchor.backendNodeId !== void 0) {
    return deepQuerySelector(root, `[data-backend-node-id="${CSS.escape(String(anchor.backendNodeId))}"]`);
  }
  if (anchor.editor) {
    const { lineNumber, filePath } = anchor.editor;
    const cmEditors = cachedJslogElements ? cachedJslogElements.filter(isCodeMirrorEditor) : deepQuerySelectorAll(root, ".cm-editor");
    const matchingEditors = cmEditors.filter((cmEditor) => {
      if (filePath !== void 0 && cmEditor.getAttribute("data-file-path") !== filePath) {
        return false;
      }
      return VisualLogging.getVePath(cmEditor) === anchor.vePath;
    });
    for (const cmEditor of matchingEditors) {
      if (checkCodeMirrorLineMatch(cmEditor, lineNumber, anchor.textSignature)) {
        return cmEditor;
      }
    }
    return matchingEditors[0] ?? null;
  }
  const targetVeName = extractVeName(anchor.vePath);
  const allJslog = cachedJslogElements || deepQuerySelectorAll(root, "[jslog]");
  const candidates = allJslog.filter((el) => matchesVePath(el, anchor.vePath, targetVeName));
  if (candidates.length === 0) {
    return null;
  }
  if (candidates.length === 1) {
    return candidates[0];
  }
  let candidateList = candidates;
  if (anchor.textSignature !== void 0) {
    const textMatches = candidateList.filter((el) => el.deepTextContent() === anchor.textSignature);
    if (textMatches.length > 0) {
      candidateList = textMatches;
    }
  }
  if (candidateList.length === 1) {
    return candidateList[0];
  }
  if (anchor.parentTextSignature !== void 0) {
    const parentMatches = candidateList.filter((el) => {
      const parentEl = el.parentElementOrShadowHost();
      return parentEl?.deepTextContent() === anchor.parentTextSignature;
    });
    if (parentMatches.length > 0) {
      candidateList = parentMatches;
    }
  }
  if (candidateList.length === 1) {
    return candidateList[0];
  }
  if (anchor.siblingIndex !== void 0) {
    const siblingMatches = candidateList.filter((el) => candidates.indexOf(el) === anchor.siblingIndex);
    if (siblingMatches.length > 0) {
      candidateList = siblingMatches;
    }
  }
  return candidateList[0] || null;
}
function isElementVisible(element) {
  if (!element.isConnected) {
    return false;
  }
  if (!element.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true, contentVisibilityAuto: true })) {
    return false;
  }
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

// gen/front_end/ui/comments/CommentOverlayManager.js
var CommentOverlayManager_exports = {};
__export(CommentOverlayManager_exports, {
  CommentOverlayManager: () => CommentOverlayManager
});
import * as Common from "./../../core/common/common.js";
import * as CommentManager from "./../../models/comment_manager/comment_manager.js";
var CommentOverlayManager = class extends Common.ObjectWrapper.ObjectWrapper {
  #commentManager;
  #liveNodeCache = /* @__PURE__ */ new WeakMap();
  #observedThreads = /* @__PURE__ */ new WeakSet();
  #intersectionObserver;
  #hoverData = null;
  #pinPositions = [];
  #highlightRects = [];
  #clickListener;
  #hoverListener;
  #suppressListener;
  #clickContainer;
  #hoverEventTypes = [
    "mouseover",
    "mouseout",
    "mouseenter",
    "mouseleave",
    "pointerover",
    "pointerout",
    "mousemove"
  ];
  #suppressEventTypes = [
    "mousedown",
    "pointerdown",
    "mouseup",
    "pointerup",
    "dblclick"
  ];
  #scrollListener;
  #scrollTarget;
  #scrollRafId;
  #devToolsResizeObserver;
  #resizeRafId;
  #mutationObserver;
  #rematchTimeoutId;
  constructor(commentManager) {
    super();
    this.#commentManager = commentManager;
    this.#commentManager.addEventListener("CommentThreadsChanged", () => {
      this.#updatePositions();
    }, this);
    this.#commentManager.addEventListener("CommentModeChanged", ({ data: active }) => {
      if (!active) {
        this.#setHoverHighlight(null);
      }
      document.body.style.cursor = active ? "crosshair" : "";
    }, this);
  }
  get commentManager() {
    return this.#commentManager;
  }
  /**
   * Lazily creates an IntersectionObserver that monitors the visibility and viewport intersection
   * of elements with active comment anchors.
   *
   * As anchored DOM nodes scroll in or out of visible viewport regions or virtualized lists,
   * the observer triggers position recalculations to ensure comment pins and highlights are
   * positioned accurately or hidden when out of view.
   */
  #getIntersectionObserver() {
    if (!this.#intersectionObserver) {
      this.#intersectionObserver = new IntersectionObserver(() => {
        this.#updatePositions();
      });
    }
    return this.#intersectionObserver;
  }
  setCommentMode(active) {
    this.#commentManager.setCommentMode(active);
  }
  isCommentMode() {
    return this.#commentManager.isCommentMode();
  }
  #setHoverHighlight(data) {
    if (data === null && this.#hoverData === null) {
      return;
    }
    if (data && this.#hoverData && data.top === this.#hoverData.top && data.left === this.#hoverData.left && data.width === this.#hoverData.width && data.height === this.#hoverData.height && data.visible === this.#hoverData.visible) {
      return;
    }
    this.#hoverData = data;
    this.dispatchEventToListeners("HoverHighlightChanged", data);
  }
  getHoverHighlight() {
    return this.#hoverData;
  }
  getPinPositions() {
    return this.#pinPositions;
  }
  getHighlightRects() {
    return this.#highlightRects;
  }
  handleElementClick(element, commentText = "New comment") {
    if (!this.isCommentMode()) {
      return null;
    }
    return this.createComment(element, commentText, "DEVELOPER");
  }
  createComment(element, text, author = "DEVELOPER", changes) {
    const anchorEl = resolveCommentAnchorElement(element);
    const anchor = resolveCommentAnchor(element);
    if (!anchor || !anchorEl) {
      return null;
    }
    const thread = this.#commentManager.createCommentThread(anchor, text, author, changes);
    this.#liveNodeCache.set(thread, anchorEl);
    const observer = this.#getIntersectionObserver();
    observer.observe(anchorEl);
    this.#observedThreads.add(anchorEl);
    this.#updatePositions();
    return thread;
  }
  getCommentThread(id) {
    return this.#commentManager.getCommentThread(id);
  }
  getCommentThreads() {
    return this.#commentManager.getCommentThreads();
  }
  removeCommentThread(id) {
    const thread = this.#commentManager.getCommentThread(id);
    if (!thread) {
      return;
    }
    const el = this.#liveNodeCache.get(thread);
    this.#liveNodeCache.delete(thread);
    if (el && this.#intersectionObserver) {
      let isElementStillObserved = false;
      for (const remainingThread of this.#commentManager.getCommentThreads()) {
        if (remainingThread.id !== id && this.#liveNodeCache.get(remainingThread) === el) {
          isElementStillObserved = true;
          break;
        }
      }
      if (!isElementStillObserved) {
        this.#intersectionObserver.unobserve(el);
        this.#observedThreads.delete(el);
      }
    }
    this.#commentManager.removeCommentThread(id);
  }
  /**
   * Rematches stored comments to live DOM nodes across dynamic container updates.
   *
   * Pre-queries [jslog] elements once across the container to avoid redundant deep DOM traversals
   * during batch rematching, and cleans up unobserved IntersectionObserver nodes in O(N) time.
   */
  #rematchAllComments(root = document) {
    const jslogElements = deepQuerySelectorAll(root, "[jslog]");
    const oldElements = /* @__PURE__ */ new Set();
    const newElements = /* @__PURE__ */ new Set();
    for (const thread of this.#commentManager.getCommentThreads()) {
      const oldEl = this.#liveNodeCache.get(thread);
      if (oldEl) {
        oldElements.add(oldEl);
      }
      const el = rematchCommentAnchor(thread, root, jslogElements);
      if (el) {
        this.#liveNodeCache.set(thread, el);
        newElements.add(el);
      } else {
        this.#liveNodeCache.delete(thread);
      }
    }
    if (this.#intersectionObserver) {
      for (const oldEl of oldElements) {
        if (!newElements.has(oldEl)) {
          this.#intersectionObserver.unobserve(oldEl);
          this.#observedThreads.delete(oldEl);
        }
      }
    }
    this.#updatePositions();
  }
  #updatePositions() {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const newPins = [];
    const newHighlights = [];
    const elementPinCounts = /* @__PURE__ */ new Map();
    for (const thread of this.#commentManager.getCommentThreads()) {
      const el = this.#liveNodeCache.get(thread) || null;
      if (!el || !el.isConnected) {
        continue;
      }
      const observer = this.#getIntersectionObserver();
      if (!this.#observedThreads.has(el)) {
        observer.observe(el);
        this.#observedThreads.add(el);
      }
      if (!isElementVisible(el)) {
        continue;
      }
      const rect = el.getBoundingClientRect();
      const offsetIndex = elementPinCounts.get(el) || 0;
      elementPinCounts.set(el, offsetIndex + 1);
      const offsetY = offsetIndex * 26;
      newPins.push({
        id: thread.id,
        top: scrollY + rect.top - 12 + offsetY,
        left: scrollX + rect.right - 12,
        visible: true
      });
      newHighlights.push({
        id: thread.id,
        top: scrollY + rect.top,
        left: scrollX + rect.left,
        width: rect.width,
        height: rect.height,
        visible: true
      });
    }
    this.#pinPositions = newPins;
    this.#highlightRects = newHighlights;
    this.dispatchEventToListeners("PositionsUpdated", {
      pins: newPins,
      highlights: newHighlights
    });
  }
  /**
   * Initializes event listeners and lifecycle observers across the target DOM container.
   *
   * Sets up:
   * - Capturing click, hover, and interaction suppression handlers to coordinate comment placement.
   * - A capturing scroll listener on the window to track scrolling across nested subpanes.
   * - A ResizeObserver to recalculate overlay coordinates when DevTools panels or drawers are resized.
   * - A MutationObserver to automatically rematch existing comment anchors when the DOM re-renders.
   */
  start(rootOrOptions, defaultText = "New comment") {
    let root;
    let scrollTarget;
    let resizeTarget;
    let text = defaultText;
    if (rootOrOptions && !(rootOrOptions instanceof Document) && !(rootOrOptions instanceof Element)) {
      root = rootOrOptions.root;
      scrollTarget = rootOrOptions.scrollTarget;
      resizeTarget = rootOrOptions.resizeTarget;
      text = rootOrOptions.defaultText ?? defaultText;
    } else if (rootOrOptions) {
      root = rootOrOptions;
    }
    root = root || document;
    scrollTarget = scrollTarget || (root instanceof Document ? root.defaultView || window : window);
    resizeTarget = resizeTarget || (root instanceof Document ? root.body || root.documentElement : root);
    this.stop();
    this.#installClickListener(root, text);
    this.#installScrollListener(scrollTarget);
    this.#installResizeObserver(resizeTarget);
    this.#installMutationObserver(root);
  }
  /**
   * Stops and detaches all active listeners and observers without clearing comment threads.
   */
  stop() {
    this.#removeClickListener();
    this.#removeScrollListener();
    this.#removeResizeObserver();
    this.#removeMutationObserver();
  }
  /**
   * Sets up capturing click, hover, and pointer interaction listeners on the container.
   *
   * When Comment Mode is active:
   * - Clicks on anchorable elements create new comment threads and consume the click event,
   *   preventing normal DevTools UI triggers such as node selection or navigation.
   * - Pointer and mouse press events are suppressed to prevent accidental text selections or drag interactions.
   * - Hover events compute and display a real-time preview highlight over the candidate anchor element.
   */
  #installClickListener(container = document, defaultText = "New comment") {
    this.#removeClickListener();
    this.#clickContainer = container;
    this.#clickListener = (event) => {
      if (!this.isCommentMode()) {
        return;
      }
      const composedTarget = event.composedPath()[0];
      const target = composedTarget instanceof Element ? composedTarget : event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const thread = this.handleElementClick(target, defaultText);
      if (thread) {
        event.consume(true);
      }
    };
    this.#suppressListener = (event) => {
      if (!this.isCommentMode()) {
        return;
      }
      const composedTarget = event.composedPath()[0];
      const target = composedTarget instanceof Element ? composedTarget : event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const anchorEl = resolveCommentAnchorElement(target);
      if (anchorEl) {
        event.consume(true);
      }
    };
    this.#hoverListener = (event) => {
      if (!this.isCommentMode()) {
        this.#setHoverHighlight(null);
        return;
      }
      const composedTarget = event.composedPath()[0];
      const target = composedTarget instanceof Element ? composedTarget : event.target;
      if (!(target instanceof Element)) {
        this.#setHoverHighlight(null);
        return;
      }
      const isLeaveEvent = event.type === "mouseout" || event.type === "mouseleave" || event.type === "pointerout";
      const anchorEl = resolveCommentAnchorElement(target);
      if (isLeaveEvent) {
        const relatedTarget = event.relatedTarget;
        if (anchorEl && relatedTarget instanceof Node && anchorEl.contains(relatedTarget)) {
          event.consume(true);
          return;
        }
        this.#setHoverHighlight(null);
        if (anchorEl) {
          event.consume(true);
        }
        return;
      }
      if (anchorEl) {
        const cmLine = target.closest(".cm-line");
        const highlightTarget = cmLine && anchorEl.classList.contains("cm-editor") ? cmLine : anchorEl;
        const rect = highlightTarget.getBoundingClientRect();
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        this.#setHoverHighlight({
          top: scrollY + rect.top,
          left: scrollX + rect.left,
          width: rect.width,
          height: rect.height,
          visible: true
        });
        event.consume(true);
      } else {
        this.#setHoverHighlight(null);
      }
    };
    container.addEventListener("click", this.#clickListener, { capture: true });
    for (const type of this.#suppressEventTypes) {
      container.addEventListener(type, this.#suppressListener, { capture: true });
    }
    for (const type of this.#hoverEventTypes) {
      container.addEventListener(type, this.#hoverListener, { capture: true });
    }
  }
  #removeClickListener() {
    if (this.#clickContainer) {
      if (this.#clickListener) {
        this.#clickContainer.removeEventListener("click", this.#clickListener, { capture: true });
      }
      if (this.#suppressListener) {
        for (const type of this.#suppressEventTypes) {
          this.#clickContainer.removeEventListener(type, this.#suppressListener, { capture: true });
        }
      }
      if (this.#hoverListener) {
        for (const type of this.#hoverEventTypes) {
          this.#clickContainer.removeEventListener(type, this.#hoverListener, { capture: true });
        }
      }
      this.#clickListener = void 0;
      this.#suppressListener = void 0;
      this.#hoverListener = void 0;
      this.#clickContainer = void 0;
    }
  }
  /**
   * Registers a capturing scroll listener on the window or target container.
   *
   * Because DevTools contains multiple independently scrolling subpanes (such as the Elements tree,
   * Sources editor, and Network list), a capturing listener on the top-level window catches scroll
   * events anywhere in the tree and schedules a throttled position update using requestAnimationFrame.
   */
  #installScrollListener(target = window) {
    this.#removeScrollListener();
    this.#scrollTarget = target;
    this.#scrollListener = () => {
      this.#setHoverHighlight(null);
      if (this.#scrollRafId !== void 0) {
        cancelAnimationFrame(this.#scrollRafId);
      }
      this.#scrollRafId = requestAnimationFrame(() => {
        this.#scrollRafId = void 0;
        this.#updatePositions();
      });
    };
    target.addEventListener("scroll", this.#scrollListener, { capture: true, passive: true });
  }
  #removeScrollListener() {
    if (this.#scrollTarget && this.#scrollListener) {
      this.#scrollTarget.removeEventListener("scroll", this.#scrollListener, { capture: true });
      this.#scrollListener = void 0;
      this.#scrollTarget = void 0;
    }
    if (this.#scrollRafId !== void 0) {
      cancelAnimationFrame(this.#scrollRafId);
      this.#scrollRafId = void 0;
    }
  }
  /**
   * Observes dimensions of the root element to react to layout changes.
   *
   * Resizing DevTools windows, adjusting drawer splitters, or toggling sidebars alters the bounding
   * boxes of anchored elements. The observer ensures overlay pins and highlight boxes are updated
   * whenever container dimensions change.
   */
  #installResizeObserver(element = document.body) {
    this.#removeResizeObserver();
    this.#devToolsResizeObserver = new ResizeObserver(() => {
      this.#setHoverHighlight(null);
      if (this.#resizeRafId !== void 0) {
        cancelAnimationFrame(this.#resizeRafId);
      }
      this.#resizeRafId = requestAnimationFrame(() => {
        this.#resizeRafId = void 0;
        this.#updatePositions();
      });
    });
    this.#devToolsResizeObserver.observe(element);
  }
  #removeResizeObserver() {
    if (this.#devToolsResizeObserver) {
      this.#devToolsResizeObserver.disconnect();
      this.#devToolsResizeObserver = void 0;
    }
    if (this.#resizeRafId !== void 0) {
      cancelAnimationFrame(this.#resizeRafId);
      this.#resizeRafId = void 0;
    }
  }
  /**
   * Debounces rematching of comments across dynamic DOM updates.
   */
  #scheduleRematch(root = document) {
    if (this.#rematchTimeoutId) {
      clearTimeout(this.#rematchTimeoutId);
    }
    this.#rematchTimeoutId = setTimeout(() => {
      this.#rematchTimeoutId = void 0;
      this.#rematchAllComments(root);
    }, 250);
  }
  /**
   * Monitors DOM tree additions, removals, and attribute mutations across the container.
   *
   * DevTools inspector panes dynamically re-render items when expanding trees, filtering results,
   * or updating state. By observing child list mutations and key domain attributes (`jslog`,
   * `data-network-request-id`, `data-backend-node-id`, `aria-expanded`), the manager schedules a
   * debounced rematch so comments remain bound to their corresponding live DOM elements.
   */
  #installMutationObserver(root = document) {
    this.#removeMutationObserver();
    this.#mutationObserver = new MutationObserver(() => {
      this.#scheduleRematch(root);
    });
    const targetNode = root instanceof Document ? root.body || root.documentElement : root;
    this.#mutationObserver.observe(targetNode, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["jslog", "data-network-request-id", "data-backend-node-id", "aria-expanded"]
    });
  }
  #removeMutationObserver() {
    if (this.#mutationObserver) {
      this.#mutationObserver.disconnect();
      this.#mutationObserver = void 0;
    }
    if (this.#rematchTimeoutId) {
      clearTimeout(this.#rematchTimeoutId);
      this.#rematchTimeoutId = void 0;
    }
  }
  /**
   * Fully resets the manager by disabling comment mode, disconnecting all observers and listeners,
   * and purging all active comment threads and overlay data.
   */
  clear() {
    this.#commentManager.clear();
    this.stop();
    this.#intersectionObserver?.disconnect();
    this.#intersectionObserver = void 0;
    this.#observedThreads = /* @__PURE__ */ new WeakSet();
    this.#pinPositions = [];
    this.#highlightRects = [];
    this.#updatePositions();
  }
};

// gen/front_end/ui/comments/CommentsOverlayWidget.js
var CommentsOverlayWidget_exports = {};
__export(CommentsOverlayWidget_exports, {
  ActionDelegate: () => ActionDelegate,
  CommentsOverlayWidget: () => CommentsOverlayWidget
});
import * as Root from "./../../core/root/root.js";
import * as CommentManager2 from "./../../models/comment_manager/comment_manager.js";
import * as UI from "./../legacy/legacy.js";
import * as Lit from "./../lit/lit.js";

// gen/front_end/ui/comments/commentsOverlay.css.js
var commentsOverlay_css_default = `/*
 * Copyright 2026 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

@scope to (devtools-widget > *) {
  :scope,
  .comments-overlay-container {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 999990;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }

  .comment-pin {
    position: absolute;
    pointer-events: auto;
    cursor: pointer;
    font-size: 24px;
    line-height: 24px;
    filter: drop-shadow(0 2px 5px rgb(0 0 0 / 35%));
    user-select: none;
    transition: transform 0.1s ease;
  }

  .comment-pin:hover {
    transform: scale(1.15);
  }

  .comment-anchor-highlight {
    position: absolute;
    pointer-events: none;
    border: 2px dashed var(--sys-color-primary);
    background-color: color-mix(in srgb, var(--sys-color-primary), transparent 90%);
    box-sizing: border-box;
  }

  .comment-hover-highlight {
    position: absolute;
    pointer-events: none;
    border: 2px solid var(--sys-color-primary);
    background-color: color-mix(in srgb, var(--sys-color-primary), transparent 85%);
    box-sizing: border-box;
  }
}

/*# sourceURL=${import.meta.resolve("./commentsOverlay.css")} */`;

// gen/front_end/ui/comments/CommentsOverlayWidget.js
var { html, render, nothing, Directives: { styleMap } } = Lit;
var DEFAULT_VIEW = (input, _output, target) => {
  render(html`
    <style>${commentsOverlay_css_default}</style>
    <div class="comments-overlay-container">
      ${input.hoverHighlight && input.hoverHighlight.visible ? html`
        <div
          class="comment-hover-highlight"
          style=${styleMap({
    top: `${input.hoverHighlight.top}px`,
    left: `${input.hoverHighlight.left}px`,
    width: `${input.hoverHighlight.width}px`,
    height: `${input.hoverHighlight.height}px`
  })}>
        </div>
      ` : nothing}
      ${input.highlights.map((h) => h.visible ? html`
        <div
          class="comment-anchor-highlight"
          data-comment-id=${h.id}
          style=${styleMap({
    top: `${h.top}px`,
    left: `${h.left}px`,
    width: `${h.width}px`,
    height: `${h.height}px`
  })}>
        </div>
      ` : nothing)}
      ${input.pins.map((p) => p.visible ? html`
        <div
          class="comment-pin"
          data-comment-id=${p.id}
          style=${styleMap({
    top: `${p.top}px`,
    left: `${p.left}px`
  })}
          @click=${() => input.onPinClick(p.id)}>
          💬
        </div>
      ` : nothing)}
    </div>
  `, target);
};
var CommentsOverlayWidget = class extends UI.Widget.Widget {
  #view;
  #commentManager;
  #commentOverlayManager;
  constructor(element, commentManager, view = DEFAULT_VIEW) {
    super(element, { useShadowDom: false });
    this.#view = view;
    this.#commentManager = commentManager;
    this.#commentOverlayManager = new CommentOverlayManager(this.#commentManager);
  }
  setOverlayManagerForTest(overlayManager) {
    this.#commentOverlayManager = overlayManager;
  }
  wasShown() {
    super.wasShown();
    this.#commentOverlayManager.start();
    this.#commentOverlayManager.addEventListener("PositionsUpdated", this.#onStateChanged, this);
    this.#commentOverlayManager.addEventListener("HoverHighlightChanged", this.#onStateChanged, this);
    this.#commentManager.addEventListener("CommentThreadsChanged", this.#onStateChanged, this);
    this.#commentManager.addEventListener("CommentModeChanged", this.#onCommentModeChanged, this);
    this.requestUpdate();
  }
  willHide() {
    this.#commentOverlayManager.stop();
    this.#commentOverlayManager.removeEventListener("PositionsUpdated", this.#onStateChanged, this);
    this.#commentOverlayManager.removeEventListener("HoverHighlightChanged", this.#onStateChanged, this);
    this.#commentManager.removeEventListener("CommentThreadsChanged", this.#onStateChanged, this);
    this.#commentManager.removeEventListener("CommentModeChanged", this.#onCommentModeChanged, this);
    super.willHide();
  }
  #onCommentModeChanged(event) {
    const isModeActive = event.data;
    const action = UI.ActionRegistry.ActionRegistry.instance().getAction("comments.toggle-comment-mode");
    action?.setToggled(isModeActive);
    this.requestUpdate();
  }
  #onStateChanged() {
    this.requestUpdate();
  }
  #handlePinClick = (_threadId) => {
  };
  performUpdate() {
    const viewInput = {
      pins: this.#commentOverlayManager.getPinPositions(),
      highlights: this.#commentOverlayManager.getHighlightRects(),
      hoverHighlight: this.#commentOverlayManager.getHoverHighlight(),
      commentMode: this.#commentManager.isCommentMode(),
      onPinClick: this.#handlePinClick
    };
    this.#view(viewInput, void 0, this.contentElement);
  }
};
var widgetInstance = null;
var ActionDelegate = class {
  #commentManager;
  constructor(commentManager) {
    this.#commentManager = commentManager ?? Root.DevToolsContext.globalInstance().get(CommentManager2.CommentManager.CommentManager);
  }
  handleAction(_context, actionId) {
    if (actionId === "comments.toggle-comment-mode") {
      if (!widgetInstance) {
        widgetInstance = new CommentsOverlayWidget(void 0, this.#commentManager);
        widgetInstance.markAsRoot();
        widgetInstance.show(document.body);
      }
      this.#commentManager.setCommentMode(!this.#commentManager.isCommentMode());
      return true;
    }
    return false;
  }
};
export {
  CommentAnchorResolver_exports as CommentAnchorResolver,
  CommentOverlayManager_exports as CommentOverlayManager,
  CommentsOverlayWidget_exports as CommentsOverlayWidget
};
//# sourceMappingURL=comments.js.map
