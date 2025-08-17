var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/models/stack_trace/StackTraceImpl.js
var StackTraceImpl_exports = {};
__export(StackTraceImpl_exports, {
  AsyncFragmentImpl: () => AsyncFragmentImpl,
  FragmentImpl: () => FragmentImpl,
  FrameImpl: () => FrameImpl,
  StackTraceImpl: () => StackTraceImpl
});
import * as Common from "./../../core/common/common.js";
var StackTraceImpl = class extends Common.ObjectWrapper.ObjectWrapper {
  syncFragment;
  asyncFragments;
  constructor(syncFragment, asyncFragments) {
    super();
    this.syncFragment = syncFragment;
    this.asyncFragments = asyncFragments;
    syncFragment.stackTraces.add(this);
    this.asyncFragments.forEach((asyncFragment) => asyncFragment.fragment.stackTraces.add(this));
  }
};
var FragmentImpl = class _FragmentImpl {
  node;
  stackTraces = /* @__PURE__ */ new Set();
  /**
   * Fragments are deduplicated based on the node.
   *
   * In turn, each fragment can be part of multiple stack traces.
   */
  static getOrCreate(node) {
    if (!node.fragment) {
      node.fragment = new _FragmentImpl(node);
    }
    return node.fragment;
  }
  constructor(node) {
    this.node = node;
  }
  get frames() {
    throw new Error("Not implemented");
  }
};
var AsyncFragmentImpl = class {
  description;
  fragment;
  constructor(description, fragment) {
    this.description = description;
    this.fragment = fragment;
  }
  get frames() {
    return this.fragment.frames;
  }
};
var FrameImpl = class {
  url;
  uiSourceCode;
  name;
  line;
  column;
  constructor(url, uiSourceCode, name, line, column) {
    this.url = url;
    this.uiSourceCode = uiSourceCode;
    this.name = name;
    this.line = line;
    this.column = column;
  }
};

// gen/front_end/models/stack_trace/Trie.js
var Trie_exports = {};
__export(Trie_exports, {
  FrameNode: () => FrameNode,
  Trie: () => Trie,
  compareRawFrames: () => compareRawFrames
});
var FrameNode = class {
  parent;
  children = [];
  rawFrame;
  frames = [];
  fragment;
  constructor(rawFrame, parent) {
    this.rawFrame = rawFrame;
    this.parent = parent;
  }
  /**
   * Produces the ancestor chain. Including `this` but excluding the `RootFrameNode`.
   */
  *getCallStack() {
    for (let node = this; node.parent; node = node.parent) {
      yield node;
    }
  }
};
var Trie = class {
  #root = { parent: null, children: [] };
  /**
   * Most sources produce stack traces in "top-to-bottom" order, so that is what this method expects.
   *
   * @returns The {@link FrameNode} corresponding to the top-most stack frame.
   */
  insert(frames) {
    if (frames.length === 0) {
      throw new Error("Trie.insert called with an empty frames array.");
    }
    let currentNode = this.#root;
    for (let i = frames.length - 1; i >= 0; --i) {
      currentNode = this.#insert(currentNode, frames[i]);
    }
    return currentNode;
  }
  /**
   * Inserts `rawFrame` into the children of the provided node if not already there.
   *
   * @returns the child node corresponding to `rawFrame`.
   */
  #insert(node, rawFrame) {
    let i = 0;
    for (; i < node.children.length; ++i) {
      const maybeChild = node.children[i];
      const child = maybeChild instanceof WeakRef ? maybeChild.deref() : maybeChild;
      if (!child) {
        continue;
      }
      const compareResult = compareRawFrames(child.rawFrame, rawFrame);
      if (compareResult === 0) {
        return child;
      }
      if (compareResult > 0) {
        break;
      }
    }
    const newNode = new FrameNode(rawFrame, node);
    if (node.parent) {
      node.children.splice(i, 0, newNode);
    } else {
      node.children.splice(i, 0, new WeakRef(newNode));
    }
    return newNode;
  }
};
function compareRawFrames(a, b) {
  const scriptIdCompare = (a.scriptId ?? "").localeCompare(b.scriptId ?? "");
  if (scriptIdCompare !== 0) {
    return scriptIdCompare;
  }
  const urlCompare = (a.url ?? "").localeCompare(b.url ?? "");
  if (urlCompare !== 0) {
    return urlCompare;
  }
  const nameCompare = (a.functionName ?? "").localeCompare(b.functionName ?? "");
  if (nameCompare !== 0) {
    return nameCompare;
  }
  if (a.lineNumber !== b.lineNumber) {
    return a.lineNumber - b.lineNumber;
  }
  return a.columnNumber - b.columnNumber;
}
export {
  StackTraceImpl_exports as StackTraceImpl,
  Trie_exports as Trie
};
//# sourceMappingURL=stack_trace_impl.js.map
