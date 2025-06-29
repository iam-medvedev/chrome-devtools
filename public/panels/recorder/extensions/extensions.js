var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/recorder/extensions/ExtensionManager.js
var ExtensionManager_exports = {};
__export(ExtensionManager_exports, {
  ExtensionManager: () => ExtensionManager
});
import * as Common from "./../../../core/common/common.js";
import * as Extensions from "./../../../models/extensions/extensions.js";
var instance = null;
var ExtensionManager = class _ExtensionManager extends Common.ObjectWrapper.ObjectWrapper {
  static instance() {
    if (!instance) {
      instance = new _ExtensionManager();
    }
    return instance;
  }
  #views = /* @__PURE__ */ new Map();
  constructor() {
    super();
    this.attach();
  }
  attach() {
    const pluginManager = Extensions.RecorderPluginManager.RecorderPluginManager.instance();
    pluginManager.addEventListener("pluginAdded", this.#handlePlugin);
    pluginManager.addEventListener("pluginRemoved", this.#handlePlugin);
    pluginManager.addEventListener("viewRegistered", this.#handleView);
    for (const descriptor of pluginManager.views()) {
      this.#handleView({ data: descriptor });
    }
  }
  detach() {
    const pluginManager = Extensions.RecorderPluginManager.RecorderPluginManager.instance();
    pluginManager.removeEventListener("pluginAdded", this.#handlePlugin);
    pluginManager.removeEventListener("pluginRemoved", this.#handlePlugin);
    pluginManager.removeEventListener("viewRegistered", this.#handleView);
    this.#views.clear();
  }
  extensions() {
    return Extensions.RecorderPluginManager.RecorderPluginManager.instance().plugins();
  }
  getView(descriptorId) {
    const view = this.#views.get(descriptorId);
    if (!view) {
      throw new Error("View not found");
    }
    return view;
  }
  #handlePlugin = () => {
    this.dispatchEventToListeners("extensionsUpdated", this.extensions());
  };
  #handleView = (event) => {
    const descriptor = event.data;
    if (!this.#views.has(descriptor.id)) {
      this.#views.set(descriptor.id, new ExtensionIframe(descriptor));
    }
  };
};
var ExtensionIframe = class {
  #descriptor;
  #iframe;
  #isShowing = false;
  #isLoaded = false;
  constructor(descriptor) {
    this.#descriptor = descriptor;
    this.#iframe = document.createElement("iframe");
    this.#iframe.src = descriptor.pagePath;
    this.#iframe.onload = this.#onIframeLoad;
  }
  #onIframeLoad = () => {
    this.#isLoaded = true;
    if (this.#isShowing) {
      this.#descriptor.onShown();
    }
  };
  show() {
    if (this.#isShowing) {
      return;
    }
    this.#isShowing = true;
    if (this.#isLoaded) {
      this.#descriptor.onShown();
    }
  }
  hide() {
    if (!this.#isShowing) {
      return;
    }
    this.#isShowing = false;
    this.#isLoaded = false;
    this.#descriptor.onHidden();
  }
  frame() {
    return this.#iframe;
  }
};
export {
  ExtensionManager_exports as ExtensionManager
};
//# sourceMappingURL=extensions.js.map
