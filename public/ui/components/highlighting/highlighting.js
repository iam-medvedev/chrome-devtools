var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/ui/components/highlighting/HighlightManager.js
var HighlightManager_exports = {};
__export(HighlightManager_exports, {
  CURRENT_HIGHLIGHT_REGISTRY: () => CURRENT_HIGHLIGHT_REGISTRY,
  HIGHLIGHT_REGISTRY: () => HIGHLIGHT_REGISTRY,
  HighlightManager: () => HighlightManager,
  RangeWalker: () => RangeWalker
});
var RangeWalker = class {
  root;
  #offset = 0;
  #treeWalker;
  #eof;
  constructor(root) {
    this.root = root;
    this.#treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    this.#eof = !this.#treeWalker.firstChild();
  }
  #next() {
    this.#offset += this.#treeWalker.currentNode.textContent?.length ?? 0;
    this.#eof = !this.#treeWalker.nextNode();
    return !this.#eof;
  }
  #goToPosition(offset) {
    if (offset < this.#offset || this.#eof) {
      return null;
    }
    while (offset > this.#offset + (this.#treeWalker.currentNode.textContent?.length ?? 0)) {
      if (!this.#next()) {
        return null;
      }
    }
    return this.#treeWalker.currentNode;
  }
  nextRange(start, length) {
    if (length <= 0 || this.#eof) {
      return null;
    }
    const startNode = this.#goToPosition(start);
    if (!startNode) {
      return null;
    }
    const offsetInStartNode = start - this.#offset;
    const endNode = this.#goToPosition(start + length);
    if (!endNode) {
      return null;
    }
    const offsetInEndNode = start + length - this.#offset;
    const range = new Range();
    range.setStart(startNode, offsetInStartNode);
    range.setEnd(endNode, offsetInEndNode);
    return range;
  }
};
var HIGHLIGHT_REGISTRY = "highlighted-search-result";
var CURRENT_HIGHLIGHT_REGISTRY = "current-search-result";
var highlightManagerInstance;
var HighlightManager = class _HighlightManager {
  #highlights = new Highlight();
  #currentHighlights = new Highlight();
  constructor() {
    CSS.highlights.set(HIGHLIGHT_REGISTRY, this.#highlights);
    CSS.highlights.set(CURRENT_HIGHLIGHT_REGISTRY, this.#currentHighlights);
  }
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!highlightManagerInstance || forceNew) {
      highlightManagerInstance = new _HighlightManager();
    }
    return highlightManagerInstance;
  }
  addHighlights(ranges) {
    ranges.forEach(this.addHighlight.bind(this));
  }
  removeHighlights(ranges) {
    ranges.forEach(this.removeHighlight.bind(this));
  }
  addCurrentHighlight(range) {
    this.#currentHighlights.add(range);
  }
  addCurrentHighlights(ranges) {
    ranges.forEach(this.addCurrentHighlight.bind(this));
  }
  addHighlight(range) {
    this.#highlights.add(range);
  }
  removeHighlight(range) {
    this.#highlights.delete(range);
    this.#currentHighlights.delete(range);
  }
  highlightOrderedTextRanges(root, sourceRanges, isCurrent = false) {
    const rangeWalker = new RangeWalker(root);
    const ranges = sourceRanges.map((range) => rangeWalker.nextRange(range.offset, range.length)).filter((r) => r !== null && !r.collapsed);
    if (isCurrent) {
      this.addCurrentHighlights(ranges);
    } else {
      this.addHighlights(ranges);
    }
    return ranges;
  }
};
export {
  HighlightManager_exports as HighlightManager
};
//# sourceMappingURL=highlighting.js.map
