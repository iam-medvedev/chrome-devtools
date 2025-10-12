var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/models/extensions/ExtensionAPI.js
var ExtensionAPI_exports = {};
self.injectedExtensionAPI = function(extensionInfo, inspectedTabId, themeName, keysToForward, testHook, injectedScriptId, targetWindowForTest) {
  const keysToForwardSet = new Set(keysToForward);
  const chrome = window.chrome || {};
  const devtools_descriptor = Object.getOwnPropertyDescriptor(chrome, "devtools");
  if (devtools_descriptor) {
    return;
  }
  let userAction = false;
  let userRecorderAction = false;
  function EventSinkImpl(type, customDispatch) {
    this._type = type;
    this._listeners = [];
    this._customDispatch = customDispatch;
  }
  EventSinkImpl.prototype = {
    addListener: function(callback) {
      if (typeof callback !== "function") {
        throw new Error("addListener: callback is not a function");
      }
      if (this._listeners.length === 0) {
        extensionServer.sendRequest({ command: "subscribe", type: this._type });
      }
      this._listeners.push(callback);
      extensionServer.registerHandler("notify-" + this._type, this._dispatch.bind(this));
    },
    removeListener: function(callback) {
      const listeners = this._listeners;
      for (let i = 0; i < listeners.length; ++i) {
        if (listeners[i] === callback) {
          listeners.splice(i, 1);
          break;
        }
      }
      if (this._listeners.length === 0) {
        extensionServer.sendRequest({ command: "unsubscribe", type: this._type });
      }
    },
    _fire: function(..._vararg) {
      const listeners = this._listeners.slice();
      for (let i = 0; i < listeners.length; ++i) {
        listeners[i].apply(null, Array.from(arguments));
      }
    },
    _dispatch: function(request) {
      if (this._customDispatch) {
        this._customDispatch.call(this, request);
      } else {
        this._fire.apply(this, request.arguments);
      }
    }
  };
  function Constructor(ctor) {
    return ctor;
  }
  function InspectorExtensionAPI() {
    this.inspectedWindow = new (Constructor(InspectedWindow))();
    this.panels = new (Constructor(Panels))();
    this.network = new (Constructor(Network))();
    this.languageServices = new (Constructor(LanguageServicesAPI))();
    this.recorder = new (Constructor(RecorderServicesAPI))();
    this.performance = new (Constructor(Performance))();
    defineDeprecatedProperty(this, "webInspector", "resources", "network");
  }
  function Network() {
    function dispatchRequestEvent(message) {
      const request = message.arguments[1];
      request.__proto__ = new (Constructor(Request))(message.arguments[0]);
      this._fire(request);
    }
    this.onRequestFinished = new (Constructor(EventSink))("network-request-finished", dispatchRequestEvent);
    defineDeprecatedProperty(this, "network", "onFinished", "onRequestFinished");
    this.onNavigated = new (Constructor(EventSink))(
      "inspected-url-changed"
      /* PrivateAPI.Events.InspectedURLChanged */
    );
  }
  Network.prototype = {
    getHAR: function(callback) {
      function callbackWrapper(response) {
        const result = response;
        const entries = result?.entries || [];
        for (let i = 0; i < entries.length; ++i) {
          entries[i].__proto__ = new (Constructor(Request))(entries[i]._requestId);
          delete entries[i]._requestId;
        }
        callback?.(result);
      }
      extensionServer.sendRequest({
        command: "getHAR"
        /* PrivateAPI.Commands.GetHAR */
      }, callback && callbackWrapper);
    },
    addRequestHeaders: function(headers) {
      extensionServer.sendRequest({ command: "addRequestHeaders", headers, extensionId: window.location.hostname });
    }
  };
  function RequestImpl(id) {
    this._id = id;
  }
  RequestImpl.prototype = {
    getContent: function(callback) {
      function callbackWrapper(response) {
        const { content, encoding } = response;
        callback?.(content, encoding);
      }
      extensionServer.sendRequest({ command: "getRequestContent", id: this._id }, callback && callbackWrapper);
    }
  };
  function Panels() {
    const panels = {
      elements: new ElementsPanel(),
      sources: new SourcesPanel(),
      network: new (Constructor(NetworkPanel))()
    };
    function panelGetter(name) {
      return panels[name];
    }
    for (const panel in panels) {
      Object.defineProperty(this, panel, { get: panelGetter.bind(null, panel), enumerable: true });
    }
  }
  Panels.prototype = {
    create: function(title, _icon, page, callback) {
      const id = "extension-panel-" + extensionServer.nextObjectId();
      extensionServer.sendRequest({ command: "createPanel", id, title, page }, callback && (() => callback.call(this, new (Constructor(ExtensionPanel2))(id))));
    },
    setOpenResourceHandler: function(callback, urlScheme) {
      const hadHandler = extensionServer.hasHandler(
        "open-resource"
        /* PrivateAPI.Events.OpenResource */
      );
      function callbackWrapper(message) {
        userAction = true;
        try {
          const { resource, lineNumber, columnNumber } = message;
          callback.call(null, new (Constructor(Resource))(resource), lineNumber, columnNumber);
        } finally {
          userAction = false;
        }
      }
      if (!callback) {
        extensionServer.unregisterHandler(
          "open-resource"
          /* PrivateAPI.Events.OpenResource */
        );
      } else {
        extensionServer.registerHandler("open-resource", callbackWrapper);
      }
      if (hadHandler === !callback) {
        extensionServer.sendRequest({ command: "setOpenResourceHandler", handlerPresent: Boolean(callback), urlScheme });
      }
    },
    setThemeChangeHandler: function(callback) {
      const hadHandler = extensionServer.hasHandler(
        "host-theme-change"
        /* PrivateAPI.Events.ThemeChange */
      );
      function callbackWrapper(message) {
        const { themeName: themeName2 } = message;
        chrome.devtools.panels.themeName = themeName2;
        callback.call(null, themeName2);
      }
      if (!callback) {
        extensionServer.unregisterHandler(
          "host-theme-change"
          /* PrivateAPI.Events.ThemeChange */
        );
      } else {
        extensionServer.registerHandler("host-theme-change", callbackWrapper);
      }
      if (hadHandler === !callback) {
        extensionServer.sendRequest({ command: "setThemeChangeHandler", handlerPresent: Boolean(callback) });
      }
    },
    openResource: function(url, lineNumber, columnNumber, _callback) {
      const callbackArg = extractCallbackArgument(arguments);
      const columnNumberArg = typeof columnNumber === "number" ? columnNumber : 0;
      extensionServer.sendRequest({ command: "openResource", url, lineNumber, columnNumber: columnNumberArg }, callbackArg);
    },
    get SearchAction() {
      return {
        CancelSearch: "cancelSearch",
        PerformSearch: "performSearch",
        NextSearchResult: "nextSearchResult",
        PreviousSearchResult: "previousSearchResult"
      };
    }
  };
  function ExtensionViewImpl(id) {
    this._id = id;
    function dispatchShowEvent(message) {
      const frameIndex = message.arguments[0];
      if (typeof frameIndex === "number") {
        this._fire(window.parent.frames[frameIndex]);
      } else {
        this._fire();
      }
    }
    if (id) {
      this.onShown = new (Constructor(EventSink))("view-shown-" + id, dispatchShowEvent);
      this.onHidden = new (Constructor(EventSink))("view-hidden," + id);
    }
  }
  function PanelWithSidebarImpl(hostPanelName) {
    ExtensionViewImpl.call(this, null);
    this._hostPanelName = hostPanelName;
    this.onSelectionChanged = new (Constructor(EventSink))("panel-objectSelected-" + hostPanelName);
  }
  PanelWithSidebarImpl.prototype = {
    createSidebarPane: function(title, callback) {
      const id = "extension-sidebar-" + extensionServer.nextObjectId();
      function callbackWrapper() {
        callback?.(new (Constructor(ExtensionSidebarPane2))(id));
      }
      extensionServer.sendRequest({ command: "createSidebarPane", panel: this._hostPanelName, id, title }, callback && callbackWrapper);
    },
    __proto__: ExtensionViewImpl.prototype
  };
  function RecorderServicesAPIImpl() {
    this._plugins = /* @__PURE__ */ new Map();
  }
  async function registerRecorderExtensionPluginImpl(plugin, pluginName, mediaType) {
    if (this._plugins.has(plugin)) {
      throw new Error(`Tried to register plugin '${pluginName}' twice`);
    }
    const channel = new MessageChannel();
    const port = channel.port1;
    this._plugins.set(plugin, port);
    port.onmessage = ({ data }) => {
      const { requestId } = data;
      dispatchMethodCall(data).then((result) => port.postMessage({ requestId, result })).catch((error) => port.postMessage({ requestId, error: { message: error.message } }));
    };
    async function dispatchMethodCall(request) {
      switch (request.method) {
        case "stringify":
          return await plugin.stringify(request.parameters.recording);
        case "stringifyStep":
          return await plugin.stringifyStep(request.parameters.step);
        case "replay":
          try {
            userAction = true;
            userRecorderAction = true;
            return plugin.replay(request.parameters.recording);
          } finally {
            userAction = false;
            userRecorderAction = false;
          }
        default:
          throw new Error(`'${request.method}' is not recognized`);
      }
    }
    const capabilities = [];
    if ("stringify" in plugin && "stringifyStep" in plugin) {
      capabilities.push("export");
    }
    if ("replay" in plugin) {
      capabilities.push("replay");
    }
    await new Promise((resolve) => {
      extensionServer.sendRequest({
        command: "registerRecorderExtensionPlugin",
        pluginName,
        mediaType,
        capabilities,
        port: channel.port2
      }, () => resolve(), [channel.port2]);
    });
  }
  RecorderServicesAPIImpl.prototype = {
    registerRecorderExtensionPlugin: registerRecorderExtensionPluginImpl,
    unregisterRecorderExtensionPlugin: async function(plugin) {
      const port = this._plugins.get(plugin);
      if (!port) {
        throw new Error("Tried to unregister a plugin that was not previously registered");
      }
      this._plugins.delete(plugin);
      port.postMessage({
        event: "unregisteredRecorderExtensionPlugin"
        /* PrivateAPI.RecorderExtensionPluginEvents.UnregisteredRecorderExtensionPlugin */
      });
      port.close();
    },
    createView: async function(title, pagePath) {
      const id = "recorder-extension-view-" + extensionServer.nextObjectId();
      await new Promise((resolve) => {
        extensionServer.sendRequest({ command: "createRecorderView", id, title, pagePath }, resolve);
      });
      return new (Constructor(RecorderView))(id);
    }
  };
  function LanguageServicesAPIImpl() {
    this._plugins = /* @__PURE__ */ new Map();
  }
  LanguageServicesAPIImpl.prototype = {
    registerLanguageExtensionPlugin: async function(plugin, pluginName, supportedScriptTypes) {
      if (this._plugins.has(plugin)) {
        throw new Error(`Tried to register plugin '${pluginName}' twice`);
      }
      const channel = new MessageChannel();
      const port = channel.port1;
      this._plugins.set(plugin, port);
      port.onmessage = ({ data }) => {
        const { requestId } = data;
        console.time(`${requestId}: ${data.method}`);
        dispatchMethodCall(data).then((result) => port.postMessage({ requestId, result })).catch((error) => port.postMessage({ requestId, error: { message: error.message } })).finally(() => console.timeEnd(`${requestId}: ${data.method}`));
      };
      function dispatchMethodCall(request) {
        switch (request.method) {
          case "addRawModule":
            return plugin.addRawModule(request.parameters.rawModuleId, request.parameters.symbolsURL, request.parameters.rawModule);
          case "removeRawModule":
            return plugin.removeRawModule(request.parameters.rawModuleId);
          case "sourceLocationToRawLocation":
            return plugin.sourceLocationToRawLocation(request.parameters.sourceLocation);
          case "rawLocationToSourceLocation":
            return plugin.rawLocationToSourceLocation(request.parameters.rawLocation);
          case "getScopeInfo":
            return plugin.getScopeInfo(request.parameters.type);
          case "listVariablesInScope":
            return plugin.listVariablesInScope(request.parameters.rawLocation);
          case "getFunctionInfo":
            return plugin.getFunctionInfo(request.parameters.rawLocation);
          case "getInlinedFunctionRanges":
            return plugin.getInlinedFunctionRanges(request.parameters.rawLocation);
          case "getInlinedCalleesRanges":
            return plugin.getInlinedCalleesRanges(request.parameters.rawLocation);
          case "getMappedLines":
            if ("getMappedLines" in plugin) {
              return plugin.getMappedLines(request.parameters.rawModuleId, request.parameters.sourceFileURL);
            }
            return Promise.resolve(void 0);
          case "formatValue":
            if ("evaluate" in plugin && plugin.evaluate) {
              return plugin.evaluate(request.parameters.expression, request.parameters.context, request.parameters.stopId);
            }
            return Promise.resolve(void 0);
          case "getProperties":
            if ("getProperties" in plugin && plugin.getProperties) {
              return plugin.getProperties(request.parameters.objectId);
            }
            if (!("evaluate" in plugin && plugin.evaluate)) {
              return Promise.resolve(void 0);
            }
            break;
          case "releaseObject":
            if ("releaseObject" in plugin && plugin.releaseObject) {
              return plugin.releaseObject(request.parameters.objectId);
            }
            break;
        }
        throw new Error(`Unknown language plugin method ${request.method}`);
      }
      await new Promise((resolve) => {
        extensionServer.sendRequest({
          command: "registerLanguageExtensionPlugin",
          pluginName,
          port: channel.port2,
          supportedScriptTypes
        }, () => resolve(), [channel.port2]);
      });
    },
    unregisterLanguageExtensionPlugin: async function(plugin) {
      const port = this._plugins.get(plugin);
      if (!port) {
        throw new Error("Tried to unregister a plugin that was not previously registered");
      }
      this._plugins.delete(plugin);
      port.postMessage({
        event: "unregisteredLanguageExtensionPlugin"
        /* PrivateAPI.LanguageExtensionPluginEvents.UnregisteredLanguageExtensionPlugin */
      });
      port.close();
    },
    getWasmLinearMemory: async function(offset, length, stopId) {
      const result = await new Promise((resolve) => extensionServer.sendRequest({ command: "getWasmLinearMemory", offset, length, stopId }, resolve));
      if (Array.isArray(result)) {
        return new Uint8Array(result).buffer;
      }
      return new ArrayBuffer(0);
    },
    getWasmLocal: async function(local, stopId) {
      return await new Promise((resolve) => extensionServer.sendRequest({ command: "getWasmLocal", local, stopId }, resolve));
    },
    getWasmGlobal: async function(global, stopId) {
      return await new Promise((resolve) => extensionServer.sendRequest({ command: "getWasmGlobal", global, stopId }, resolve));
    },
    getWasmOp: async function(op, stopId) {
      return await new Promise((resolve) => extensionServer.sendRequest({ command: "getWasmOp", op, stopId }, resolve));
    },
    reportResourceLoad: function(resourceUrl, status) {
      return new Promise((resolve) => extensionServer.sendRequest({
        command: "reportResourceLoad",
        extensionId: window.location.origin,
        resourceUrl,
        status
      }, resolve));
    }
  };
  function NetworkPanelImpl() {
  }
  NetworkPanelImpl.prototype = {
    show: function(options) {
      return new Promise((resolve) => extensionServer.sendRequest({ command: "showNetworkPanel", filter: options?.filter }, () => resolve()));
    }
  };
  function PerformanceImpl() {
    function dispatchProfilingStartedEvent() {
      this._fire();
    }
    function dispatchProfilingStoppedEvent() {
      this._fire();
    }
    this.onProfilingStarted = new (Constructor(EventSink))("profiling-started-", dispatchProfilingStartedEvent);
    this.onProfilingStopped = new (Constructor(EventSink))("profiling-stopped-", dispatchProfilingStoppedEvent);
  }
  function declareInterfaceClass(implConstructor) {
    return function(...args) {
      const impl = { __proto__: implConstructor.prototype };
      implConstructor.apply(impl, args);
      populateInterfaceClass(this, impl);
    };
  }
  function defineDeprecatedProperty(object, className, oldName, newName) {
    let warningGiven = false;
    function getter() {
      if (!warningGiven) {
        console.warn(className + "." + oldName + " is deprecated. Use " + className + "." + newName + " instead");
        warningGiven = true;
      }
      return object[newName];
    }
    object.__defineGetter__(oldName, getter);
  }
  function extractCallbackArgument(args) {
    const lastArgument = args[args.length - 1];
    return typeof lastArgument === "function" ? lastArgument : void 0;
  }
  const LanguageServicesAPI = declareInterfaceClass(LanguageServicesAPIImpl);
  const RecorderServicesAPI = declareInterfaceClass(RecorderServicesAPIImpl);
  const Performance = declareInterfaceClass(PerformanceImpl);
  const Button = declareInterfaceClass(ButtonImpl);
  const EventSink = declareInterfaceClass(EventSinkImpl);
  const ExtensionPanel2 = declareInterfaceClass(ExtensionPanelImpl);
  const RecorderView = declareInterfaceClass(RecorderViewImpl);
  const ExtensionSidebarPane2 = declareInterfaceClass(ExtensionSidebarPaneImpl);
  const PanelWithSidebarClass = declareInterfaceClass(PanelWithSidebarImpl);
  const Request = declareInterfaceClass(RequestImpl);
  const Resource = declareInterfaceClass(ResourceImpl);
  const NetworkPanel = declareInterfaceClass(NetworkPanelImpl);
  class ElementsPanel extends Constructor(PanelWithSidebarClass) {
    constructor() {
      super("elements");
    }
  }
  class SourcesPanel extends Constructor(PanelWithSidebarClass) {
    constructor() {
      super("sources");
    }
  }
  function ExtensionPanelImpl(id) {
    ExtensionViewImpl.call(this, id);
    this.onSearch = new (Constructor(EventSink))("panel-search-" + id);
  }
  ExtensionPanelImpl.prototype = {
    createStatusBarButton: function(iconPath, tooltipText, disabled) {
      const id = "button-" + extensionServer.nextObjectId();
      extensionServer.sendRequest({
        command: "createToolbarButton",
        panel: this._id,
        id,
        icon: iconPath,
        tooltip: tooltipText,
        disabled: Boolean(disabled)
      });
      return new (Constructor(Button))(id);
    },
    show: function() {
      if (!userAction) {
        return;
      }
      extensionServer.sendRequest({ command: "showPanel", id: this._id });
    },
    __proto__: ExtensionViewImpl.prototype
  };
  function RecorderViewImpl(id) {
    ExtensionViewImpl.call(this, id);
  }
  RecorderViewImpl.prototype = {
    show: function() {
      if (!userAction || !userRecorderAction) {
        return;
      }
      extensionServer.sendRequest({ command: "showRecorderView", id: this._id });
    },
    __proto__: ExtensionViewImpl.prototype
  };
  function ExtensionSidebarPaneImpl(id) {
    ExtensionViewImpl.call(this, id);
  }
  ExtensionSidebarPaneImpl.prototype = {
    setHeight: function(height) {
      extensionServer.sendRequest({ command: "setSidebarHeight", id: this._id, height });
    },
    setExpression: function(expression, rootTitle, evaluateOptions, _callback) {
      extensionServer.sendRequest({
        command: "setSidebarContent",
        id: this._id,
        expression,
        rootTitle,
        evaluateOnPage: true,
        evaluateOptions: typeof evaluateOptions === "object" ? evaluateOptions : {}
      }, extractCallbackArgument(arguments));
    },
    setObject: function(jsonObject, rootTitle, callback) {
      extensionServer.sendRequest({
        command: "setSidebarContent",
        id: this._id,
        expression: jsonObject,
        rootTitle
      }, callback);
    },
    setPage: function(page) {
      extensionServer.sendRequest({ command: "setSidebarPage", id: this._id, page });
    },
    __proto__: ExtensionViewImpl.prototype
  };
  function ButtonImpl(id) {
    this._id = id;
    this.onClicked = new (Constructor(EventSink))("button-clicked-" + id);
  }
  ButtonImpl.prototype = {
    update: function(iconPath, tooltipText, disabled) {
      extensionServer.sendRequest({
        command: "updateButton",
        id: this._id,
        icon: iconPath,
        tooltip: tooltipText,
        disabled: Boolean(disabled)
      });
    }
  };
  function InspectedWindow() {
    function dispatchResourceEvent(message) {
      const resourceData = message.arguments[0];
      this._fire(new (Constructor(Resource))(resourceData));
    }
    function dispatchResourceContentEvent(message) {
      const resourceData = message.arguments[0];
      this._fire(new (Constructor(Resource))(resourceData), message.arguments[1]);
    }
    this.onResourceAdded = new (Constructor(EventSink))("resource-added", dispatchResourceEvent);
    this.onResourceContentCommitted = new (Constructor(EventSink))("resource-content-committed", dispatchResourceContentEvent);
  }
  InspectedWindow.prototype = {
    reload: function(optionsOrUserAgent) {
      let options = null;
      if (typeof optionsOrUserAgent === "object") {
        options = optionsOrUserAgent;
      } else if (typeof optionsOrUserAgent === "string") {
        options = { userAgent: optionsOrUserAgent };
        console.warn("Passing userAgent as string parameter to inspectedWindow.reload() is deprecated. Use inspectedWindow.reload({ userAgent: value}) instead.");
      }
      extensionServer.sendRequest({ command: "Reload", options });
    },
    eval: function(expression, evaluateOptions) {
      const callback = extractCallbackArgument(arguments);
      function callbackWrapper(result) {
        const { isError, isException, value } = result;
        if (isError || isException) {
          callback?.(void 0, result);
        } else {
          callback?.(value);
        }
      }
      extensionServer.sendRequest({
        command: "evaluateOnInspectedPage",
        expression,
        evaluateOptions: typeof evaluateOptions === "object" ? evaluateOptions : void 0
      }, callback && callbackWrapper);
      return null;
    },
    getResources: function(callback) {
      function wrapResource(resourceData) {
        return new (Constructor(Resource))(resourceData);
      }
      function callbackWrapper(resources) {
        callback?.(resources.map(wrapResource));
      }
      extensionServer.sendRequest({
        command: "getPageResources"
        /* PrivateAPI.Commands.GetPageResources */
      }, callback && callbackWrapper);
    }
  };
  function ResourceImpl(resourceData) {
    this._url = resourceData.url;
    this._type = resourceData.type;
    this._buildId = resourceData.buildId;
  }
  ResourceImpl.prototype = {
    get url() {
      return this._url;
    },
    get type() {
      return this._type;
    },
    get buildId() {
      return this._buildId;
    },
    getContent: function(callback) {
      function callbackWrapper(response) {
        const { content, encoding } = response;
        callback?.(content, encoding);
      }
      extensionServer.sendRequest({ command: "getResourceContent", url: this._url }, callback && callbackWrapper);
    },
    setContent: function(content, commit, callback) {
      extensionServer.sendRequest({ command: "setResourceContent", url: this._url, content, commit }, callback);
    },
    setFunctionRangesForScript: function(ranges) {
      return new Promise((resolve, reject) => extensionServer.sendRequest({
        command: "setFunctionRangesForScript",
        scriptUrl: this._url,
        ranges
      }, (response) => {
        const result = response;
        if (result.isError) {
          reject(result);
        } else {
          resolve();
        }
      }));
    },
    attachSourceMapURL: function(sourceMapURL) {
      return new Promise((resolve, reject) => extensionServer.sendRequest({ command: "attachSourceMapToResource", contentUrl: this._url, sourceMapURL }, (response) => {
        const result = response;
        if (result.isError) {
          reject(new Error(result.description));
        } else {
          resolve();
        }
      }));
    }
  };
  function getTabId() {
    return inspectedTabId;
  }
  let keyboardEventRequestQueue = [];
  let forwardTimer = null;
  function forwardKeyboardEvent(event) {
    const focused = document.activeElement;
    if (focused) {
      const isInput = focused.nodeName === "INPUT" || focused.nodeName === "TEXTAREA" || focused.isContentEditable;
      if (isInput && !(event.ctrlKey || event.altKey || event.metaKey)) {
        return;
      }
    }
    let modifiers = 0;
    if (event.shiftKey) {
      modifiers |= 1;
    }
    if (event.ctrlKey) {
      modifiers |= 2;
    }
    if (event.altKey) {
      modifiers |= 4;
    }
    if (event.metaKey) {
      modifiers |= 8;
    }
    const num = event.keyCode & 255 | modifiers << 8;
    if (!keysToForwardSet.has(num)) {
      return;
    }
    event.preventDefault();
    const requestPayload = {
      eventType: event.type,
      ctrlKey: event.ctrlKey,
      altKey: event.altKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey,
      // @ts-expect-error keyIdentifier is a deprecated non-standard property that typescript doesn't know about.
      keyIdentifier: event.keyIdentifier,
      key: event.key,
      code: event.code,
      location: event.location,
      keyCode: event.keyCode
    };
    keyboardEventRequestQueue.push(requestPayload);
    if (!forwardTimer) {
      forwardTimer = window.setTimeout(forwardEventQueue, 0);
    }
  }
  function forwardEventQueue() {
    forwardTimer = null;
    extensionServer.sendRequest({ command: "_forwardKeyboardEvent", entries: keyboardEventRequestQueue });
    keyboardEventRequestQueue = [];
  }
  document.addEventListener("keydown", forwardKeyboardEvent, false);
  function ExtensionServerClient(targetWindow) {
    this._callbacks = {};
    this._handlers = {};
    this._lastRequestId = 0;
    this._lastObjectId = 0;
    this.registerHandler("callback", this._onCallback.bind(this));
    const channel = new MessageChannel();
    this._port = channel.port1;
    this._port.addEventListener("message", this._onMessage.bind(this), false);
    this._port.start();
    targetWindow.postMessage("registerExtension", "*", [channel.port2]);
  }
  ExtensionServerClient.prototype = {
    sendRequest: function(message, callback, transfers) {
      if (typeof callback === "function") {
        message.requestId = this._registerCallback(callback);
      }
      this._port.postMessage(message, transfers);
    },
    hasHandler: function(command) {
      return Boolean(this._handlers[command]);
    },
    registerHandler: function(command, handler) {
      this._handlers[command] = handler;
    },
    unregisterHandler: function(command) {
      delete this._handlers[command];
    },
    nextObjectId: function() {
      return injectedScriptId.toString() + "_" + ++this._lastObjectId;
    },
    _registerCallback: function(callback) {
      const id = ++this._lastRequestId;
      this._callbacks[id] = callback;
      return id;
    },
    _onCallback: function(request) {
      if (request.requestId in this._callbacks) {
        const callback = this._callbacks[request.requestId];
        delete this._callbacks[request.requestId];
        callback(request.result);
      }
    },
    _onMessage: function(event) {
      const request = event.data;
      const handler = this._handlers[request.command];
      if (handler) {
        handler.call(this, request);
      }
    }
  };
  function populateInterfaceClass(interfaze, implementation) {
    for (const member in implementation) {
      if (member.charAt(0) === "_") {
        continue;
      }
      let descriptor = null;
      for (let owner = implementation; owner && !descriptor; owner = owner.__proto__) {
        descriptor = Object.getOwnPropertyDescriptor(owner, member);
      }
      if (!descriptor) {
        continue;
      }
      if (typeof descriptor.value === "function") {
        interfaze[member] = descriptor.value.bind(implementation);
      } else if (typeof descriptor.get === "function") {
        interfaze.__defineGetter__(member, descriptor.get.bind(implementation));
      } else {
        Object.defineProperty(interfaze, member, descriptor);
      }
    }
  }
  const extensionServer = new (Constructor(ExtensionServerClient))(targetWindowForTest || window.parent);
  const coreAPI = new (Constructor(InspectorExtensionAPI))();
  Object.defineProperty(chrome, "devtools", { value: {}, enumerable: true });
  chrome.devtools.inspectedWindow = {};
  Object.defineProperty(chrome.devtools.inspectedWindow, "tabId", { get: getTabId });
  chrome.devtools.inspectedWindow.__proto__ = coreAPI.inspectedWindow;
  chrome.devtools.network = coreAPI.network;
  chrome.devtools.panels = coreAPI.panels;
  chrome.devtools.panels.themeName = themeName;
  chrome.devtools.languageServices = coreAPI.languageServices;
  chrome.devtools.recorder = coreAPI.recorder;
  chrome.devtools.performance = coreAPI.performance;
  if (extensionInfo.exposeExperimentalAPIs !== false) {
    chrome.experimental = chrome.experimental || {};
    chrome.experimental.devtools = chrome.experimental.devtools || {};
    const properties = Object.getOwnPropertyNames(coreAPI);
    for (let i = 0; i < properties.length; ++i) {
      const descriptor = Object.getOwnPropertyDescriptor(coreAPI, properties[i]);
      if (descriptor) {
        Object.defineProperty(chrome.experimental.devtools, properties[i], descriptor);
      }
    }
    chrome.experimental.devtools.inspectedWindow = chrome.devtools.inspectedWindow;
  }
  if (extensionInfo.exposeWebInspectorNamespace) {
    window.webInspector = coreAPI;
  }
  testHook(extensionServer, coreAPI);
};
self.buildExtensionAPIInjectedScript = function(extensionInfo, inspectedTabId, themeName, keysToForward, testHook) {
  const argumentsJSON = [extensionInfo, inspectedTabId || null, themeName, keysToForward].map((_) => JSON.stringify(_)).join(",");
  if (!testHook) {
    testHook = () => {
    };
  }
  return "(function(injectedScriptId){ (" + self.injectedExtensionAPI.toString() + ")(" + argumentsJSON + "," + testHook + ", injectedScriptId);})";
};

// gen/front_end/models/extensions/ExtensionEndpoint.js
var ExtensionEndpoint_exports = {};
__export(ExtensionEndpoint_exports, {
  ExtensionEndpoint: () => ExtensionEndpoint
});
var ExtensionEndpoint = class {
  port;
  nextRequestId = 0;
  pendingRequests;
  constructor(port) {
    this.port = port;
    this.port.onmessage = this.onResponse.bind(this);
    this.pendingRequests = /* @__PURE__ */ new Map();
  }
  sendRequest(method, parameters) {
    return new Promise((resolve, reject) => {
      const requestId = this.nextRequestId++;
      this.pendingRequests.set(requestId, { resolve, reject });
      this.port.postMessage({ requestId, method, parameters });
    });
  }
  disconnect() {
    for (const { reject } of this.pendingRequests.values()) {
      reject(new Error("Extension endpoint disconnected"));
    }
    this.pendingRequests.clear();
    this.port.close();
  }
  onResponse({ data }) {
    if ("event" in data) {
      this.handleEvent(data);
      return;
    }
    const { requestId, result, error } = data;
    const pendingRequest = this.pendingRequests.get(requestId);
    if (!pendingRequest) {
      console.error(`No pending request ${requestId}`);
      return;
    }
    this.pendingRequests.delete(requestId);
    if (error) {
      pendingRequest.reject(new Error(error.message));
    } else {
      pendingRequest.resolve(result);
    }
  }
  handleEvent(_event) {
    throw new Error("handleEvent is not implemented");
  }
};

// gen/front_end/models/extensions/ExtensionPanel.js
var ExtensionPanel_exports = {};
__export(ExtensionPanel_exports, {
  ExtensionButton: () => ExtensionButton,
  ExtensionPanel: () => ExtensionPanel,
  ExtensionSidebarPane: () => ExtensionSidebarPane
});
import "./../../ui/legacy/legacy.js";
import * as Platform from "./../../core/platform/platform.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as UI2 from "./../../ui/legacy/legacy.js";

// gen/front_end/models/extensions/ExtensionView.js
var ExtensionView_exports = {};
__export(ExtensionView_exports, {
  ExtensionNotifierView: () => ExtensionNotifierView,
  ExtensionView: () => ExtensionView
});
import * as UI from "./../../ui/legacy/legacy.js";
import * as Lit from "./../../ui/lit/lit.js";
var { render, html, Directives: { ref } } = Lit;
var DEFAULT_VIEW = (input, output, target) => {
  render(html`<iframe
    ${ref((element) => {
    output.iframe = element;
  })}
    src=${input.src}
    class=${input.className}
    @load=${input.onLoad}></iframe>`, target);
};
var ExtensionView = class extends UI.Widget.Widget {
  #server;
  #id;
  #src;
  #className;
  #iframe;
  #frameIndex;
  #view;
  constructor(server, id, src, className, view = DEFAULT_VIEW) {
    super();
    this.#view = view;
    this.#server = server;
    this.#src = src;
    this.#className = className;
    this.#id = id;
    this.setHideOnDetach();
    void this.performUpdate();
  }
  performUpdate() {
    const output = {};
    this.#view({
      src: this.#src,
      className: this.#className,
      onLoad: this.onLoad.bind(this)
    }, output, this.element);
    if (output.iframe) {
      this.#iframe = output.iframe;
    }
  }
  wasShown() {
    super.wasShown();
    if (typeof this.#frameIndex === "number") {
      this.#server.notifyViewShown(this.#id, this.#frameIndex);
    }
  }
  willHide() {
    super.willHide();
    if (typeof this.#frameIndex === "number") {
      this.#server.notifyViewHidden(this.#id);
    }
  }
  onLoad() {
    if (!this.#iframe) {
      return;
    }
    const frames = window.frames;
    this.#frameIndex = Array.prototype.indexOf.call(frames, this.#iframe.contentWindow);
    if (this.isShowing()) {
      this.#server.notifyViewShown(this.#id, this.#frameIndex);
    }
  }
};
var ExtensionNotifierView = class extends UI.Widget.VBox {
  server;
  id;
  constructor(server, id) {
    super();
    this.server = server;
    this.id = id;
  }
  wasShown() {
    super.wasShown();
    this.server.notifyViewShown(this.id);
  }
  willHide() {
    super.willHide();
    this.server.notifyViewHidden(this.id);
  }
};

// gen/front_end/models/extensions/ExtensionPanel.js
var ExtensionPanel = class extends UI2.Panel.Panel {
  server;
  id;
  panelToolbar;
  #searchableView;
  constructor(server, panelName, id, pageURL) {
    super(panelName);
    this.server = server;
    this.id = id;
    this.setHideOnDetach();
    this.panelToolbar = this.element.createChild("devtools-toolbar", "hidden");
    this.#searchableView = new UI2.SearchableView.SearchableView(this, null);
    this.#searchableView.show(this.element);
    const extensionView = new ExtensionView(server, this.id, pageURL, "extension");
    extensionView.show(this.#searchableView.element);
  }
  addToolbarItem(item) {
    this.panelToolbar.classList.remove("hidden");
    this.panelToolbar.appendToolbarItem(item);
  }
  onSearchCanceled() {
    this.server.notifySearchAction(
      this.id,
      "cancelSearch"
      /* ExtensionAPI.PrivateAPI.Panels.SearchAction.CancelSearch */
    );
    this.#searchableView.updateSearchMatchesCount(0);
  }
  searchableView() {
    return this.#searchableView;
  }
  performSearch(searchConfig, _shouldJump, _jumpBackwards) {
    const query = searchConfig.query;
    this.server.notifySearchAction(this.id, "performSearch", query);
  }
  jumpToNextSearchResult() {
    this.server.notifySearchAction(
      this.id,
      "nextSearchResult"
      /* ExtensionAPI.PrivateAPI.Panels.SearchAction.NextSearchResult */
    );
  }
  jumpToPreviousSearchResult() {
    this.server.notifySearchAction(
      this.id,
      "previousSearchResult"
      /* ExtensionAPI.PrivateAPI.Panels.SearchAction.PreviousSearchResult */
    );
  }
  supportsCaseSensitiveSearch() {
    return false;
  }
  supportsWholeWordSearch() {
    return false;
  }
  supportsRegexSearch() {
    return false;
  }
};
var ExtensionButton = class {
  id;
  #toolbarButton;
  constructor(server, id, iconURL, tooltip, disabled) {
    this.id = id;
    this.#toolbarButton = new UI2.Toolbar.ToolbarButton("", "");
    this.#toolbarButton.addEventListener("Click", server.notifyButtonClicked.bind(server, this.id));
    this.update(iconURL, tooltip, disabled);
  }
  update(iconURL, tooltip, disabled) {
    if (typeof iconURL === "string") {
      this.#toolbarButton.setBackgroundImage(iconURL);
    }
    if (typeof tooltip === "string") {
      this.#toolbarButton.setTitle(tooltip);
    }
    if (typeof disabled === "boolean") {
      this.#toolbarButton.setEnabled(!disabled);
    }
  }
  toolbarButton() {
    return this.#toolbarButton;
  }
};
var ExtensionSidebarPane = class extends UI2.View.SimpleView {
  #panelName;
  server;
  #id;
  extensionView;
  objectPropertiesView;
  constructor(server, panelName, title, id) {
    const viewId = Platform.StringUtilities.toKebabCase(title);
    super({ title, viewId });
    this.element.classList.add("fill");
    this.#panelName = panelName;
    this.server = server;
    this.#id = id;
  }
  id() {
    return this.#id;
  }
  panelName() {
    return this.#panelName;
  }
  setObject(object, title, callback) {
    this.createObjectPropertiesView();
    this.#setObject(SDK.RemoteObject.RemoteObject.fromLocalObject(object), title, callback);
  }
  setExpression(expression, title, evaluateOptions, securityOrigin, callback) {
    this.createObjectPropertiesView();
    this.server.evaluate(expression, true, false, evaluateOptions, securityOrigin, this.onEvaluate.bind(this, title, callback));
  }
  setPage(url) {
    if (this.objectPropertiesView) {
      this.objectPropertiesView.detach();
      delete this.objectPropertiesView;
    }
    if (this.extensionView) {
      this.extensionView.detach(true);
    }
    this.extensionView = new ExtensionView(this.server, this.#id, url, "extension fill");
    this.extensionView.show(this.element);
    if (!this.element.style.height) {
      this.setHeight("150px");
    }
  }
  setHeight(height) {
    this.element.style.height = height;
  }
  onEvaluate(title, callback, error, result, _wasThrown) {
    if (error) {
      callback(error.toString());
    } else if (!result) {
      callback();
    } else {
      this.#setObject(result, title, callback);
    }
  }
  createObjectPropertiesView() {
    if (this.objectPropertiesView) {
      return;
    }
    if (this.extensionView) {
      this.extensionView.detach(true);
      delete this.extensionView;
    }
    this.objectPropertiesView = new ExtensionNotifierView(this.server, this.#id);
    this.objectPropertiesView.show(this.element);
  }
  #setObject(object, title, callback) {
    const objectPropertiesView = this.objectPropertiesView;
    if (!objectPropertiesView) {
      callback("operation cancelled");
      return;
    }
    objectPropertiesView.element.removeChildren();
    void UI2.UIUtils.Renderer.render(object, { title, editable: false, expand: true }).then((result) => {
      if (!result) {
        callback();
        return;
      }
      objectPropertiesView.element.appendChild(result.element);
      callback();
    });
  }
};

// gen/front_end/models/extensions/ExtensionServer.js
var ExtensionServer_exports = {};
__export(ExtensionServer_exports, {
  ExtensionServer: () => ExtensionServer,
  ExtensionStatus: () => ExtensionStatus,
  HostsPolicy: () => HostsPolicy,
  RevealableNetworkRequestFilter: () => RevealableNetworkRequestFilter
});
import * as Common2 from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as Platform2 from "./../../core/platform/platform.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as Logs from "./../logs/logs.js";
import * as Components from "./../../ui/legacy/components/utils/utils.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
import * as ThemeSupport from "./../../ui/legacy/theme_support/theme_support.js";
import * as Bindings2 from "./../bindings/bindings.js";
import * as HAR from "./../har/har.js";
import * as TextUtils from "./../text_utils/text_utils.js";
import * as Workspace from "./../workspace/workspace.js";

// gen/front_end/models/extensions/HostUrlPattern.js
var HostUrlPattern_exports = {};
__export(HostUrlPattern_exports, {
  HostUrlPattern: () => HostUrlPattern
});
function parseScheme(pattern) {
  const SCHEME_SEPARATOR = "://";
  const schemeEnd = pattern.indexOf(SCHEME_SEPARATOR);
  if (schemeEnd < 0) {
    return void 0;
  }
  const scheme = pattern.substr(0, schemeEnd).toLowerCase();
  const validSchemes = [
    "*",
    "http",
    "https",
    "ftp",
    "chrome",
    "chrome-extension"
    // Chromium additionally defines the following schemes, but these aren't relevant for host url patterns:
    /* 'file', 'filesystem', 'ws', 'wss', 'data', 'uuid-in-package'*/
  ];
  if (!validSchemes.includes(scheme)) {
    return void 0;
  }
  return { scheme, hostPattern: pattern.substr(schemeEnd + SCHEME_SEPARATOR.length) };
}
function defaultPort(scheme) {
  switch (scheme) {
    case "http":
      return "80";
    case "https":
      return "443";
    case "ftp":
      return "25";
  }
  return void 0;
}
function parseHostAndPort(pattern, scheme) {
  const pathnameStart = pattern.indexOf("/");
  if (pathnameStart >= 0) {
    const path = pattern.substr(pathnameStart);
    if (path !== "/*" && path !== "/") {
      return void 0;
    }
    pattern = pattern.substr(0, pathnameStart);
  }
  const PORT_WILDCARD = ":*";
  if (pattern.endsWith(PORT_WILDCARD)) {
    pattern = pattern.substr(0, pattern.length - PORT_WILDCARD.length);
  }
  if (pattern.endsWith(":")) {
    return void 0;
  }
  const SUBDOMAIN_WILDCARD = "*.";
  let asUrl;
  try {
    asUrl = new URL(pattern.startsWith(SUBDOMAIN_WILDCARD) ? `http://${pattern.substr(SUBDOMAIN_WILDCARD.length)}` : `http://${pattern}`);
  } catch {
    return void 0;
  }
  if (asUrl.pathname !== "/") {
    return void 0;
  }
  if (asUrl.hostname.endsWith(".")) {
    asUrl.hostname = asUrl.hostname.substr(0, asUrl.hostname.length - 1);
  }
  if (asUrl.hostname !== "%2A" && asUrl.hostname.includes("%2A")) {
    return void 0;
  }
  const httpPort = defaultPort("http");
  if (!httpPort) {
    return void 0;
  }
  const port = pattern.endsWith(`:${httpPort}`) ? httpPort : asUrl.port === "" ? "*" : asUrl.port;
  const schemesWithPort = ["http", "https", "ftp"];
  if (port !== "*" && !schemesWithPort.includes(scheme)) {
    return void 0;
  }
  const host = asUrl.hostname !== "%2A" ? pattern.startsWith("*.") ? `*.${asUrl.hostname}` : asUrl.hostname : "*";
  return {
    host,
    port
  };
}
var HostUrlPattern = class _HostUrlPattern {
  pattern;
  static parse(pattern) {
    if (pattern === "<all_urls>") {
      return new _HostUrlPattern({ matchesAll: true });
    }
    const parsedScheme = parseScheme(pattern);
    if (!parsedScheme) {
      return void 0;
    }
    const { scheme, hostPattern } = parsedScheme;
    const parsedHost = parseHostAndPort(hostPattern, scheme);
    if (!parsedHost) {
      return void 0;
    }
    const { host, port } = parsedHost;
    return new _HostUrlPattern({ scheme, host, port, matchesAll: false });
  }
  constructor(pattern) {
    this.pattern = pattern;
  }
  get scheme() {
    return this.pattern.matchesAll ? "*" : this.pattern.scheme;
  }
  get host() {
    return this.pattern.matchesAll ? "*" : this.pattern.host;
  }
  get port() {
    return this.pattern.matchesAll ? "*" : this.pattern.port;
  }
  matchesAllUrls() {
    return this.pattern.matchesAll;
  }
  matchesUrl(url) {
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch {
      return false;
    }
    if (this.matchesAllUrls()) {
      return true;
    }
    const scheme = parsedUrl.protocol.substr(0, parsedUrl.protocol.length - 1);
    const port = parsedUrl.port || defaultPort(scheme);
    return this.matchesScheme(scheme) && this.matchesHost(parsedUrl.hostname) && (!port || this.matchesPort(port));
  }
  matchesScheme(scheme) {
    if (this.pattern.matchesAll) {
      return true;
    }
    if (this.pattern.scheme === "*") {
      return scheme === "http" || scheme === "https";
    }
    return this.pattern.scheme === scheme;
  }
  matchesHost(host) {
    if (this.pattern.matchesAll) {
      return true;
    }
    if (this.pattern.host === "*") {
      return true;
    }
    let normalizedHost = new URL(`http://${host}`).hostname;
    if (normalizedHost.endsWith(".")) {
      normalizedHost = normalizedHost.substr(0, normalizedHost.length - 1);
    }
    if (this.pattern.host.startsWith("*.")) {
      return normalizedHost === this.pattern.host.substr(2) || normalizedHost.endsWith(this.pattern.host.substr(1));
    }
    return this.pattern.host === normalizedHost;
  }
  matchesPort(port) {
    if (this.pattern.matchesAll) {
      return true;
    }
    return this.pattern.port === "*" || this.pattern.port === port;
  }
};

// gen/front_end/models/extensions/LanguageExtensionEndpoint.js
var LanguageExtensionEndpoint_exports = {};
__export(LanguageExtensionEndpoint_exports, {
  LanguageExtensionEndpoint: () => LanguageExtensionEndpoint
});
import * as Bindings from "./../bindings/bindings.js";
var LanguageExtensionEndpointImpl = class extends ExtensionEndpoint {
  plugin;
  constructor(plugin, port) {
    super(port);
    this.plugin = plugin;
  }
  handleEvent({ event }) {
    switch (event) {
      case "unregisteredLanguageExtensionPlugin": {
        this.disconnect();
        const { pluginManager } = Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance();
        pluginManager.removePlugin(this.plugin);
        break;
      }
    }
  }
};
var LanguageExtensionEndpoint = class {
  supportedScriptTypes;
  endpoint;
  extensionOrigin;
  allowFileAccess;
  name;
  constructor(allowFileAccess, extensionOrigin, name, supportedScriptTypes, port) {
    this.name = name;
    this.extensionOrigin = extensionOrigin;
    this.supportedScriptTypes = supportedScriptTypes;
    this.endpoint = new LanguageExtensionEndpointImpl(this, port);
    this.allowFileAccess = allowFileAccess;
  }
  canAccessURL(url) {
    try {
      return !url || this.allowFileAccess || new URL(url).protocol !== "file:";
    } catch {
      return true;
    }
  }
  handleScript(script) {
    try {
      if (!this.canAccessURL(script.contentURL()) || script.hasSourceURL && !this.canAccessURL(script.sourceURL) || script.debugSymbols?.externalURL && !this.canAccessURL(script.debugSymbols.externalURL)) {
        return false;
      }
    } catch {
      return false;
    }
    const language = script.scriptLanguage();
    return language !== null && script.debugSymbols !== null && language === this.supportedScriptTypes.language && this.supportedScriptTypes.symbol_types.includes(script.debugSymbols.type);
  }
  createPageResourceLoadInitiator() {
    return {
      target: null,
      frameId: null,
      extensionId: this.extensionOrigin,
      initiatorUrl: this.extensionOrigin
    };
  }
  /**
   * Notify the plugin about a new script
   */
  addRawModule(rawModuleId, symbolsURL, rawModule) {
    if (!this.canAccessURL(symbolsURL) || !this.canAccessURL(rawModule.url)) {
      return Promise.resolve([]);
    }
    return this.endpoint.sendRequest("addRawModule", { rawModuleId, symbolsURL, rawModule });
  }
  /**
   * Notifies the plugin that a script is removed.
   */
  removeRawModule(rawModuleId) {
    return this.endpoint.sendRequest("removeRawModule", { rawModuleId });
  }
  /**
   * Find locations in raw modules from a location in a source file
   */
  sourceLocationToRawLocation(sourceLocation) {
    return this.endpoint.sendRequest("sourceLocationToRawLocation", { sourceLocation });
  }
  /**
   * Find locations in source files from a location in a raw module
   */
  rawLocationToSourceLocation(rawLocation) {
    return this.endpoint.sendRequest("rawLocationToSourceLocation", { rawLocation });
  }
  getScopeInfo(type) {
    return this.endpoint.sendRequest("getScopeInfo", { type });
  }
  /**
   * List all variables in lexical scope at a given location in a raw module
   */
  listVariablesInScope(rawLocation) {
    return this.endpoint.sendRequest("listVariablesInScope", { rawLocation });
  }
  /**
   * List all function names (including inlined frames) at location
   */
  getFunctionInfo(rawLocation) {
    return this.endpoint.sendRequest("getFunctionInfo", { rawLocation });
  }
  /**
   * Find locations in raw modules corresponding to the inline function
   *  that rawLocation is in.
   */
  getInlinedFunctionRanges(rawLocation) {
    return this.endpoint.sendRequest("getInlinedFunctionRanges", { rawLocation });
  }
  /**
   * Find locations in raw modules corresponding to inline functions
   *  called by the function or inline frame that rawLocation is in.
   */
  getInlinedCalleesRanges(rawLocation) {
    return this.endpoint.sendRequest("getInlinedCalleesRanges", { rawLocation });
  }
  async getMappedLines(rawModuleId, sourceFileURL) {
    return await this.endpoint.sendRequest("getMappedLines", { rawModuleId, sourceFileURL });
  }
  async evaluate(expression, context, stopId) {
    return await this.endpoint.sendRequest("formatValue", { expression, context, stopId });
  }
  getProperties(objectId) {
    return this.endpoint.sendRequest("getProperties", { objectId });
  }
  releaseObject(objectId) {
    return this.endpoint.sendRequest("releaseObject", { objectId });
  }
};

// gen/front_end/models/extensions/RecorderExtensionEndpoint.js
var RecorderExtensionEndpoint_exports = {};
__export(RecorderExtensionEndpoint_exports, {
  RecorderExtensionEndpoint: () => RecorderExtensionEndpoint
});

// gen/front_end/models/extensions/RecorderPluginManager.js
var RecorderPluginManager_exports = {};
__export(RecorderPluginManager_exports, {
  RecorderPluginManager: () => RecorderPluginManager
});
import * as Common from "./../../core/common/common.js";
var instance = null;
var RecorderPluginManager = class _RecorderPluginManager extends Common.ObjectWrapper.ObjectWrapper {
  #plugins = /* @__PURE__ */ new Set();
  #views = /* @__PURE__ */ new Map();
  static instance() {
    if (!instance) {
      instance = new _RecorderPluginManager();
    }
    return instance;
  }
  addPlugin(plugin) {
    this.#plugins.add(plugin);
    this.dispatchEventToListeners("pluginAdded", plugin);
  }
  removePlugin(plugin) {
    this.#plugins.delete(plugin);
    this.dispatchEventToListeners("pluginRemoved", plugin);
  }
  plugins() {
    return Array.from(this.#plugins.values());
  }
  registerView(descriptor) {
    this.#views.set(descriptor.id, descriptor);
    this.dispatchEventToListeners("viewRegistered", descriptor);
  }
  views() {
    return Array.from(this.#views.values());
  }
  getViewDescriptor(id) {
    return this.#views.get(id);
  }
  showView(id) {
    const descriptor = this.#views.get(id);
    if (!descriptor) {
      throw new Error(`View with id ${id} is not found.`);
    }
    this.dispatchEventToListeners("showViewRequested", descriptor);
  }
};

// gen/front_end/models/extensions/RecorderExtensionEndpoint.js
var RecorderExtensionEndpoint = class extends ExtensionEndpoint {
  name;
  mediaType;
  capabilities;
  constructor(name, port, capabilities, mediaType) {
    super(port);
    this.name = name;
    this.mediaType = mediaType;
    this.capabilities = capabilities;
  }
  getName() {
    return this.name;
  }
  getCapabilities() {
    return this.capabilities;
  }
  getMediaType() {
    return this.mediaType;
  }
  handleEvent({ event }) {
    switch (event) {
      case "unregisteredRecorderExtensionPlugin": {
        this.disconnect();
        RecorderPluginManager.instance().removePlugin(this);
        break;
      }
      default:
        throw new Error(`Unrecognized Recorder extension endpoint event: ${event}`);
    }
  }
  /**
   * In practice, `recording` is a UserFlow[1], but we avoid defining this type on the
   * API in order to prevent dependencies between Chrome and puppeteer. Extensions
   * are responsible for working out potential compatibility issues.
   *
   * [1]: https://github.com/puppeteer/replay/blob/main/src/Schema.ts#L245
   */
  stringify(recording) {
    return this.sendRequest("stringify", { recording });
  }
  /**
   * In practice, `step` is a Step[1], but we avoid defining this type on the
   * API in order to prevent dependencies between Chrome and puppeteer. Extensions
   * are responsible for working out compatibility issues.
   *
   * [1]: https://github.com/puppeteer/replay/blob/main/src/Schema.ts#L243
   */
  stringifyStep(step) {
    return this.sendRequest("stringifyStep", { step });
  }
  /**
   * In practice, `recording` is a UserFlow[1], but we avoid defining this type on the
   * API in order to prevent dependencies between Chrome and puppeteer. Extensions
   * are responsible for working out potential compatibility issues.
   *
   * [1]: https://github.com/puppeteer/replay/blob/main/src/Schema.ts#L245
   */
  replay(recording) {
    return this.sendRequest("replay", { recording });
  }
};

// gen/front_end/models/extensions/ExtensionServer.js
var extensionOrigins = /* @__PURE__ */ new WeakMap();
var kPermittedSchemes = ["http:", "https:", "file:", "data:", "chrome-extension:", "about:"];
var extensionServerInstance;
var HostsPolicy = class _HostsPolicy {
  runtimeAllowedHosts;
  runtimeBlockedHosts;
  static create(policy) {
    const runtimeAllowedHosts = [];
    const runtimeBlockedHosts = [];
    if (policy) {
      for (const pattern of policy.runtimeAllowedHosts) {
        const parsedPattern = HostUrlPattern.parse(pattern);
        if (!parsedPattern) {
          return null;
        }
        runtimeAllowedHosts.push(parsedPattern);
      }
      for (const pattern of policy.runtimeBlockedHosts) {
        const parsedPattern = HostUrlPattern.parse(pattern);
        if (!parsedPattern) {
          return null;
        }
        runtimeBlockedHosts.push(parsedPattern);
      }
    }
    return new _HostsPolicy(runtimeAllowedHosts, runtimeBlockedHosts);
  }
  constructor(runtimeAllowedHosts, runtimeBlockedHosts) {
    this.runtimeAllowedHosts = runtimeAllowedHosts;
    this.runtimeBlockedHosts = runtimeBlockedHosts;
  }
  isAllowedOnURL(inspectedURL) {
    if (!inspectedURL) {
      return this.runtimeBlockedHosts.length === 0;
    }
    if (this.runtimeBlockedHosts.some((pattern) => pattern.matchesUrl(inspectedURL)) && !this.runtimeAllowedHosts.some((pattern) => pattern.matchesUrl(inspectedURL))) {
      return false;
    }
    return true;
  }
};
var RegisteredExtension = class {
  name;
  hostsPolicy;
  allowFileAccess;
  openResourceScheme = null;
  constructor(name, hostsPolicy, allowFileAccess) {
    this.name = name;
    this.hostsPolicy = hostsPolicy;
    this.allowFileAccess = allowFileAccess;
  }
  isAllowedOnTarget(inspectedURL) {
    if (!inspectedURL) {
      inspectedURL = SDK2.TargetManager.TargetManager.instance().primaryPageTarget()?.inspectedURL();
    }
    if (!inspectedURL) {
      return false;
    }
    if (this.openResourceScheme && inspectedURL.startsWith(this.openResourceScheme)) {
      return true;
    }
    if (!ExtensionServer.canInspectURL(inspectedURL)) {
      return false;
    }
    if (!this.hostsPolicy.isAllowedOnURL(inspectedURL)) {
      return false;
    }
    if (!this.allowFileAccess) {
      let parsedURL;
      try {
        parsedURL = new URL(inspectedURL);
      } catch {
        return false;
      }
      return parsedURL.protocol !== "file:";
    }
    return true;
  }
};
var RevealableNetworkRequestFilter = class {
  filter;
  constructor(filter) {
    this.filter = filter;
  }
};
var ExtensionServer = class _ExtensionServer extends Common2.ObjectWrapper.ObjectWrapper {
  clientObjects;
  handlers;
  subscribers;
  subscriptionStartHandlers;
  subscriptionStopHandlers;
  extraHeaders;
  requests;
  requestIds;
  lastRequestId;
  registeredExtensions;
  status;
  #sidebarPanes;
  extensionsEnabled;
  inspectedTabId;
  extensionAPITestHook;
  themeChangeHandlers = /* @__PURE__ */ new Map();
  #pendingExtensions = [];
  constructor() {
    super();
    this.clientObjects = /* @__PURE__ */ new Map();
    this.handlers = /* @__PURE__ */ new Map();
    this.subscribers = /* @__PURE__ */ new Map();
    this.subscriptionStartHandlers = /* @__PURE__ */ new Map();
    this.subscriptionStopHandlers = /* @__PURE__ */ new Map();
    this.extraHeaders = /* @__PURE__ */ new Map();
    this.requests = /* @__PURE__ */ new Map();
    this.requestIds = /* @__PURE__ */ new Map();
    this.lastRequestId = 0;
    this.registeredExtensions = /* @__PURE__ */ new Map();
    this.status = new ExtensionStatus();
    this.#sidebarPanes = [];
    this.extensionsEnabled = true;
    this.registerHandler("addRequestHeaders", this.onAddRequestHeaders.bind(this));
    this.registerHandler("createPanel", this.onCreatePanel.bind(this));
    this.registerHandler("createSidebarPane", this.onCreateSidebarPane.bind(this));
    this.registerHandler("createToolbarButton", this.onCreateToolbarButton.bind(this));
    this.registerHandler("evaluateOnInspectedPage", this.onEvaluateOnInspectedPage.bind(this));
    this.registerHandler("_forwardKeyboardEvent", this.onForwardKeyboardEvent.bind(this));
    this.registerHandler("getHAR", this.onGetHAR.bind(this));
    this.registerHandler("getPageResources", this.onGetPageResources.bind(this));
    this.registerHandler("getRequestContent", this.onGetRequestContent.bind(this));
    this.registerHandler("getResourceContent", this.onGetResourceContent.bind(this));
    this.registerHandler("Reload", this.onReload.bind(this));
    this.registerHandler("setOpenResourceHandler", this.onSetOpenResourceHandler.bind(this));
    this.registerHandler("setThemeChangeHandler", this.onSetThemeChangeHandler.bind(this));
    this.registerHandler("setResourceContent", this.onSetResourceContent.bind(this));
    this.registerHandler("attachSourceMapToResource", this.onAttachSourceMapToResource.bind(this));
    this.registerHandler("setSidebarHeight", this.onSetSidebarHeight.bind(this));
    this.registerHandler("setSidebarContent", this.onSetSidebarContent.bind(this));
    this.registerHandler("setSidebarPage", this.onSetSidebarPage.bind(this));
    this.registerHandler("showPanel", this.onShowPanel.bind(this));
    this.registerHandler("subscribe", this.onSubscribe.bind(this));
    this.registerHandler("openResource", this.onOpenResource.bind(this));
    this.registerHandler("unsubscribe", this.onUnsubscribe.bind(this));
    this.registerHandler("updateButton", this.onUpdateButton.bind(this));
    this.registerHandler("registerLanguageExtensionPlugin", this.registerLanguageExtensionEndpoint.bind(this));
    this.registerHandler("getWasmLinearMemory", this.onGetWasmLinearMemory.bind(this));
    this.registerHandler("getWasmGlobal", this.onGetWasmGlobal.bind(this));
    this.registerHandler("getWasmLocal", this.onGetWasmLocal.bind(this));
    this.registerHandler("getWasmOp", this.onGetWasmOp.bind(this));
    this.registerHandler("registerRecorderExtensionPlugin", this.registerRecorderExtensionEndpoint.bind(this));
    this.registerHandler("reportResourceLoad", this.onReportResourceLoad.bind(this));
    this.registerHandler("setFunctionRangesForScript", this.onSetFunctionRangesForScript.bind(this));
    this.registerHandler("createRecorderView", this.onCreateRecorderView.bind(this));
    this.registerHandler("showRecorderView", this.onShowRecorderView.bind(this));
    this.registerHandler("showNetworkPanel", this.onShowNetworkPanel.bind(this));
    window.addEventListener("message", this.onWindowMessage, false);
    const existingTabId = window.DevToolsAPI?.getInspectedTabId?.();
    if (existingTabId) {
      this.setInspectedTabId({ data: existingTabId });
    }
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(Host.InspectorFrontendHostAPI.Events.SetInspectedTabId, this.setInspectedTabId, this);
    this.initExtensions();
    ThemeSupport.ThemeSupport.instance().addEventListener(ThemeSupport.ThemeChangeEvent.eventName, this.#onThemeChange);
  }
  get isEnabledForTest() {
    return this.extensionsEnabled;
  }
  dispose() {
    ThemeSupport.ThemeSupport.instance().removeEventListener(ThemeSupport.ThemeChangeEvent.eventName, this.#onThemeChange);
    SDK2.TargetManager.TargetManager.instance().removeEventListener("InspectedURLChanged", this.inspectedURLChanged, this);
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.removeEventListener(Host.InspectorFrontendHostAPI.Events.SetInspectedTabId, this.setInspectedTabId, this);
    window.removeEventListener("message", this.onWindowMessage, false);
  }
  #onThemeChange = () => {
    const themeName = ThemeSupport.ThemeSupport.instance().themeName();
    for (const port of this.themeChangeHandlers.values()) {
      port.postMessage({ command: "host-theme-change", themeName });
    }
  };
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!extensionServerInstance || forceNew) {
      extensionServerInstance?.dispose();
      extensionServerInstance = new _ExtensionServer();
    }
    return extensionServerInstance;
  }
  initializeExtensions() {
    if (this.inspectedTabId !== null) {
      Host.InspectorFrontendHost.InspectorFrontendHostInstance.setAddExtensionCallback(this.addExtension.bind(this));
    }
  }
  hasExtensions() {
    return Boolean(this.registeredExtensions.size);
  }
  notifySearchAction(panelId, action, searchString) {
    this.postNotification("panel-search-" + panelId, [action, searchString]);
  }
  notifyViewShown(identifier, frameIndex) {
    this.postNotification("view-shown-" + identifier, [frameIndex]);
  }
  notifyViewHidden(identifier) {
    this.postNotification("view-hidden," + identifier, []);
  }
  notifyButtonClicked(identifier) {
    this.postNotification("button-clicked-" + identifier, []);
  }
  profilingStarted() {
    this.postNotification("profiling-started-", []);
  }
  profilingStopped() {
    this.postNotification("profiling-stopped-", []);
  }
  registerLanguageExtensionEndpoint(message, _shared_port) {
    if (message.command !== "registerLanguageExtensionPlugin") {
      return this.status.E_BADARG("command", `expected ${"registerLanguageExtensionPlugin"}`);
    }
    const { pluginManager } = Bindings2.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance();
    const { pluginName, port, supportedScriptTypes: { language, symbol_types } } = message;
    const symbol_types_array = Array.isArray(symbol_types) && symbol_types.every((e) => typeof e === "string") ? symbol_types : [];
    const extensionOrigin = this.getExtensionOrigin(_shared_port);
    const registration = this.registeredExtensions.get(extensionOrigin);
    if (!registration) {
      throw new Error("Received a message from an unregistered extension");
    }
    const endpoint = new LanguageExtensionEndpoint(registration.allowFileAccess, extensionOrigin, pluginName, { language, symbol_types: symbol_types_array }, port);
    pluginManager.addPlugin(endpoint);
    return this.status.OK();
  }
  async loadWasmValue(expectValue, convert, expression, stopId) {
    const { pluginManager } = Bindings2.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance();
    const callFrame = pluginManager.callFrameForStopId(stopId);
    if (!callFrame) {
      return this.status.E_BADARG("stopId", "Unknown stop id");
    }
    const result = await callFrame.debuggerModel.agent.invoke_evaluateOnCallFrame({
      callFrameId: callFrame.id,
      expression,
      silent: true,
      returnByValue: !expectValue,
      generatePreview: expectValue,
      throwOnSideEffect: true
    });
    if (!result.exceptionDetails && !result.getError()) {
      return convert(result.result);
    }
    return this.status.E_FAILED("Failed");
  }
  async onGetWasmLinearMemory(message) {
    if (message.command !== "getWasmLinearMemory") {
      return this.status.E_BADARG("command", `expected ${"getWasmLinearMemory"}`);
    }
    return await this.loadWasmValue(false, (result) => result.value, `[].slice.call(new Uint8Array(memories[0].buffer, ${Number(message.offset)}, ${Number(message.length)}))`, message.stopId);
  }
  convertWasmValue(valueClass, index) {
    return (obj) => {
      if (obj.type === "undefined") {
        return;
      }
      if (obj.type !== "object" || obj.subtype !== "wasmvalue") {
        return this.status.E_FAILED("Bad object type");
      }
      const type = obj?.description;
      const value = obj.preview?.properties?.find((o) => o.name === "value")?.value ?? "";
      switch (type) {
        case "i32":
        case "f32":
        case "f64":
          return { type, value: Number(value) };
        case "i64":
          return { type, value: BigInt(value.replace(/n$/, "")) };
        case "v128":
          return { type, value };
        default:
          return { type: "reftype", valueClass, index };
      }
    };
  }
  async onGetWasmGlobal(message) {
    if (message.command !== "getWasmGlobal") {
      return this.status.E_BADARG("command", `expected ${"getWasmGlobal"}`);
    }
    const global = Number(message.global);
    const result = await this.loadWasmValue(true, this.convertWasmValue("global", global), `globals[${global}]`, message.stopId);
    return result ?? this.status.E_BADARG("global", `No global with index ${global}`);
  }
  async onGetWasmLocal(message) {
    if (message.command !== "getWasmLocal") {
      return this.status.E_BADARG("command", `expected ${"getWasmLocal"}`);
    }
    const local = Number(message.local);
    const result = await this.loadWasmValue(true, this.convertWasmValue("local", local), `locals[${local}]`, message.stopId);
    return result ?? this.status.E_BADARG("local", `No local with index ${local}`);
  }
  async onGetWasmOp(message) {
    if (message.command !== "getWasmOp") {
      return this.status.E_BADARG("command", `expected ${"getWasmOp"}`);
    }
    const op = Number(message.op);
    const result = await this.loadWasmValue(true, this.convertWasmValue("operand", op), `stack[${op}]`, message.stopId);
    return result ?? this.status.E_BADARG("op", `No operand with index ${op}`);
  }
  registerRecorderExtensionEndpoint(message, _shared_port) {
    if (message.command !== "registerRecorderExtensionPlugin") {
      return this.status.E_BADARG("command", `expected ${"registerRecorderExtensionPlugin"}`);
    }
    const { pluginName, mediaType, port, capabilities } = message;
    RecorderPluginManager.instance().addPlugin(new RecorderExtensionEndpoint(pluginName, port, capabilities, mediaType));
    return this.status.OK();
  }
  onReportResourceLoad(message) {
    if (message.command !== "reportResourceLoad") {
      return this.status.E_BADARG("command", `expected ${"reportResourceLoad"}`);
    }
    const { resourceUrl, extensionId, status } = message;
    const url = resourceUrl;
    const initiator = { target: null, frameId: null, initiatorUrl: extensionId, extensionId };
    const pageResource = {
      url,
      initiator,
      errorMessage: status.errorMessage,
      success: status.success ?? null,
      size: status.size ?? null,
      duration: null
    };
    SDK2.PageResourceLoader.PageResourceLoader.instance().resourceLoadedThroughExtension(pageResource);
    return this.status.OK();
  }
  onSetFunctionRangesForScript(message, port) {
    if (message.command !== "setFunctionRangesForScript") {
      return this.status.E_BADARG("command", `expected ${"setFunctionRangesForScript"}`);
    }
    const { scriptUrl, ranges } = message;
    if (!scriptUrl || !ranges?.length) {
      return this.status.E_BADARG("command", "expected valid scriptUrl and non-empty NamedFunctionRanges");
    }
    const resource = this.lookupAllowedUISourceCode(scriptUrl, port);
    if ("error" in resource) {
      return resource.error;
    }
    const { uiSourceCode } = resource;
    if (!uiSourceCode.contentType().isScript() || !uiSourceCode.contentType().isFromSourceMap()) {
      return this.status.E_BADARG("command", `expected a source map script resource for url: ${scriptUrl}`);
    }
    try {
      Bindings2.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance().setFunctionRanges(uiSourceCode, ranges);
    } catch (e) {
      return this.status.E_FAILED(e);
    }
    return this.status.OK();
  }
  onShowRecorderView(message) {
    if (message.command !== "showRecorderView") {
      return this.status.E_BADARG("command", `expected ${"showRecorderView"}`);
    }
    RecorderPluginManager.instance().showView(message.id);
    return void 0;
  }
  onShowNetworkPanel(message) {
    if (message.command !== "showNetworkPanel") {
      return this.status.E_BADARG("command", `expected ${"showNetworkPanel"}`);
    }
    void Common2.Revealer.reveal(new RevealableNetworkRequestFilter(message.filter));
    return this.status.OK();
  }
  onCreateRecorderView(message, port) {
    if (message.command !== "createRecorderView") {
      return this.status.E_BADARG("command", `expected ${"createRecorderView"}`);
    }
    const id = message.id;
    if (this.clientObjects.has(id)) {
      return this.status.E_EXISTS(id);
    }
    const pagePath = _ExtensionServer.expandResourcePath(this.getExtensionOrigin(port), message.pagePath);
    if (pagePath === void 0) {
      return this.status.E_BADARG("pagePath", "Resources paths cannot point to non-extension resources");
    }
    const onShown = () => this.notifyViewShown(id);
    const onHidden = () => this.notifyViewHidden(id);
    RecorderPluginManager.instance().registerView({
      id,
      pagePath,
      title: message.title,
      onShown,
      onHidden
    });
    return this.status.OK();
  }
  inspectedURLChanged(event) {
    if (!_ExtensionServer.canInspectURL(event.data.inspectedURL())) {
      this.disableExtensions();
      return;
    }
    if (event.data !== SDK2.TargetManager.TargetManager.instance().primaryPageTarget()) {
      return;
    }
    this.requests = /* @__PURE__ */ new Map();
    this.enableExtensions();
    const url = event.data.inspectedURL();
    this.postNotification("inspected-url-changed", [url]);
    const extensions = this.#pendingExtensions.splice(0);
    extensions.forEach((e) => this.addExtension(e));
  }
  hasSubscribers(type) {
    return this.subscribers.has(type);
  }
  postNotification(type, args, filter) {
    if (!this.extensionsEnabled) {
      return;
    }
    const subscribers = this.subscribers.get(type);
    if (!subscribers) {
      return;
    }
    const message = { command: "notify-" + type, arguments: args };
    for (const subscriber of subscribers) {
      if (!this.extensionEnabled(subscriber)) {
        continue;
      }
      if (filter) {
        const origin = extensionOrigins.get(subscriber);
        const extension = origin && this.registeredExtensions.get(origin);
        if (!extension || !filter(extension)) {
          continue;
        }
      }
      subscriber.postMessage(message);
    }
  }
  onSubscribe(message, port) {
    if (message.command !== "subscribe") {
      return this.status.E_BADARG("command", `expected ${"subscribe"}`);
    }
    const subscribers = this.subscribers.get(message.type);
    if (subscribers) {
      subscribers.add(port);
    } else {
      this.subscribers.set(message.type, /* @__PURE__ */ new Set([port]));
      const handler = this.subscriptionStartHandlers.get(message.type);
      if (handler) {
        handler();
      }
    }
    return void 0;
  }
  onUnsubscribe(message, port) {
    if (message.command !== "unsubscribe") {
      return this.status.E_BADARG("command", `expected ${"unsubscribe"}`);
    }
    const subscribers = this.subscribers.get(message.type);
    if (!subscribers) {
      return;
    }
    subscribers.delete(port);
    if (!subscribers.size) {
      this.subscribers.delete(message.type);
      const handler = this.subscriptionStopHandlers.get(message.type);
      if (handler) {
        handler();
      }
    }
    return void 0;
  }
  onAddRequestHeaders(message) {
    if (message.command !== "addRequestHeaders") {
      return this.status.E_BADARG("command", `expected ${"addRequestHeaders"}`);
    }
    const id = message.extensionId;
    if (typeof id !== "string") {
      return this.status.E_BADARGTYPE("extensionId", typeof id, "string");
    }
    let extensionHeaders = this.extraHeaders.get(id);
    if (!extensionHeaders) {
      extensionHeaders = /* @__PURE__ */ new Map();
      this.extraHeaders.set(id, extensionHeaders);
    }
    for (const name in message.headers) {
      extensionHeaders.set(name, message.headers[name]);
    }
    const allHeaders = {};
    for (const headers of this.extraHeaders.values()) {
      for (const [name, value] of headers) {
        if (name !== "__proto__" && typeof value === "string") {
          allHeaders[name] = value;
        }
      }
    }
    SDK2.NetworkManager.MultitargetNetworkManager.instance().setExtraHTTPHeaders(allHeaders);
    return void 0;
  }
  getExtensionOrigin(port) {
    const origin = extensionOrigins.get(port);
    if (!origin) {
      throw new Error("Received a message from an unregistered extension");
    }
    return origin;
  }
  onCreatePanel(message, port) {
    if (message.command !== "createPanel") {
      return this.status.E_BADARG("command", `expected ${"createPanel"}`);
    }
    const id = message.id;
    if (this.clientObjects.has(id) || UI3.InspectorView.InspectorView.instance().hasPanel(id)) {
      return this.status.E_EXISTS(id);
    }
    const page = _ExtensionServer.expandResourcePath(this.getExtensionOrigin(port), message.page);
    if (page === void 0) {
      return this.status.E_BADARG("page", "Resources paths cannot point to non-extension resources");
    }
    let persistentId = this.getExtensionOrigin(port) + message.title;
    persistentId = persistentId.replace(/\s|:\d+/g, "");
    const panelView = new ExtensionServerPanelView(persistentId, i18n.i18n.lockedString(message.title), new ExtensionPanel(this, persistentId, id, page));
    this.clientObjects.set(id, panelView);
    UI3.InspectorView.InspectorView.instance().addPanel(panelView);
    return this.status.OK();
  }
  onShowPanel(message) {
    if (message.command !== "showPanel") {
      return this.status.E_BADARG("command", `expected ${"showPanel"}`);
    }
    let panelViewId = message.id;
    const panelView = this.clientObjects.get(message.id);
    if (panelView && panelView instanceof ExtensionServerPanelView) {
      panelViewId = panelView.viewId();
    }
    void UI3.InspectorView.InspectorView.instance().showPanel(panelViewId);
    return void 0;
  }
  onCreateToolbarButton(message, port) {
    if (message.command !== "createToolbarButton") {
      return this.status.E_BADARG("command", `expected ${"createToolbarButton"}`);
    }
    const panelView = this.clientObjects.get(message.panel);
    if (!panelView || !(panelView instanceof ExtensionServerPanelView)) {
      return this.status.E_NOTFOUND(message.panel);
    }
    const resourcePath = _ExtensionServer.expandResourcePath(this.getExtensionOrigin(port), message.icon);
    if (resourcePath === void 0) {
      return this.status.E_BADARG("icon", "Resources paths cannot point to non-extension resources");
    }
    const button = new ExtensionButton(this, message.id, resourcePath, message.tooltip, message.disabled);
    this.clientObjects.set(message.id, button);
    void panelView.widget().then(appendButton);
    function appendButton(panel) {
      panel.addToolbarItem(button.toolbarButton());
    }
    return this.status.OK();
  }
  onUpdateButton(message, port) {
    if (message.command !== "updateButton") {
      return this.status.E_BADARG("command", `expected ${"updateButton"}`);
    }
    const button = this.clientObjects.get(message.id);
    if (!button || !(button instanceof ExtensionButton)) {
      return this.status.E_NOTFOUND(message.id);
    }
    const resourcePath = message.icon && _ExtensionServer.expandResourcePath(this.getExtensionOrigin(port), message.icon);
    if (message.icon && resourcePath === void 0) {
      return this.status.E_BADARG("icon", "Resources paths cannot point to non-extension resources");
    }
    button.update(resourcePath, message.tooltip, message.disabled);
    return this.status.OK();
  }
  onCreateSidebarPane(message) {
    if (message.command !== "createSidebarPane") {
      return this.status.E_BADARG("command", `expected ${"createSidebarPane"}`);
    }
    const id = message.id;
    const sidebar = new ExtensionSidebarPane(this, message.panel, i18n.i18n.lockedString(message.title), id);
    this.#sidebarPanes.push(sidebar);
    this.clientObjects.set(id, sidebar);
    this.dispatchEventToListeners("SidebarPaneAdded", sidebar);
    return this.status.OK();
  }
  sidebarPanes() {
    return this.#sidebarPanes;
  }
  onSetSidebarHeight(message) {
    if (message.command !== "setSidebarHeight") {
      return this.status.E_BADARG("command", `expected ${"setSidebarHeight"}`);
    }
    const sidebar = this.clientObjects.get(message.id);
    if (!sidebar || !(sidebar instanceof ExtensionSidebarPane)) {
      return this.status.E_NOTFOUND(message.id);
    }
    sidebar.setHeight(message.height);
    return this.status.OK();
  }
  onSetSidebarContent(message, port) {
    if (message.command !== "setSidebarContent") {
      return this.status.E_BADARG("command", `expected ${"setSidebarContent"}`);
    }
    const { requestId, id, rootTitle, expression, evaluateOptions, evaluateOnPage } = message;
    const sidebar = this.clientObjects.get(id);
    if (!sidebar || !(sidebar instanceof ExtensionSidebarPane)) {
      return this.status.E_NOTFOUND(message.id);
    }
    function callback(error) {
      const result = error ? this.status.E_FAILED(error) : this.status.OK();
      this.dispatchCallback(requestId, port, result);
    }
    if (evaluateOnPage) {
      sidebar.setExpression(expression, rootTitle, evaluateOptions, this.getExtensionOrigin(port), callback.bind(this));
      return void 0;
    }
    sidebar.setObject(message.expression, message.rootTitle, callback.bind(this));
    return void 0;
  }
  onSetSidebarPage(message, port) {
    if (message.command !== "setSidebarPage") {
      return this.status.E_BADARG("command", `expected ${"setSidebarPage"}`);
    }
    const sidebar = this.clientObjects.get(message.id);
    if (!sidebar || !(sidebar instanceof ExtensionSidebarPane)) {
      return this.status.E_NOTFOUND(message.id);
    }
    const resourcePath = _ExtensionServer.expandResourcePath(this.getExtensionOrigin(port), message.page);
    if (resourcePath === void 0) {
      return this.status.E_BADARG("page", "Resources paths cannot point to non-extension resources");
    }
    sidebar.setPage(resourcePath);
    return void 0;
  }
  onOpenResource(message) {
    if (message.command !== "openResource") {
      return this.status.E_BADARG("command", `expected ${"openResource"}`);
    }
    const uiSourceCode = Workspace.Workspace.WorkspaceImpl.instance().uiSourceCodeForURL(message.url);
    if (uiSourceCode) {
      void Common2.Revealer.reveal(uiSourceCode.uiLocation(message.lineNumber, message.columnNumber));
      return this.status.OK();
    }
    const resource = Bindings2.ResourceUtils.resourceForURL(message.url);
    if (resource) {
      void Common2.Revealer.reveal(resource);
      return this.status.OK();
    }
    const request = Logs.NetworkLog.NetworkLog.instance().requestForURL(message.url);
    if (request) {
      void Common2.Revealer.reveal(request);
      return this.status.OK();
    }
    return this.status.E_NOTFOUND(message.url);
  }
  onSetOpenResourceHandler(message, port) {
    if (message.command !== "setOpenResourceHandler") {
      return this.status.E_BADARG("command", `expected ${"setOpenResourceHandler"}`);
    }
    const extension = this.registeredExtensions.get(this.getExtensionOrigin(port));
    if (!extension) {
      throw new Error("Received a message from an unregistered extension");
    }
    if (message.urlScheme) {
      extension.openResourceScheme = message.urlScheme;
    }
    const extensionOrigin = this.getExtensionOrigin(port);
    const { name } = extension;
    const registration = {
      title: name,
      origin: extensionOrigin,
      scheme: message.urlScheme,
      handler: this.handleOpenURL.bind(this, port),
      shouldHandleOpenResource: (url, schemes) => Components.Linkifier.Linkifier.shouldHandleOpenResource(extension.openResourceScheme, url, schemes)
    };
    if (message.handlerPresent) {
      Components.Linkifier.Linkifier.registerLinkHandler(registration);
    } else {
      Components.Linkifier.Linkifier.unregisterLinkHandler(registration);
    }
    return void 0;
  }
  onSetThemeChangeHandler(message, port) {
    if (message.command !== "setThemeChangeHandler") {
      return this.status.E_BADARG("command", `expected ${"setThemeChangeHandler"}`);
    }
    const extensionOrigin = this.getExtensionOrigin(port);
    const extension = this.registeredExtensions.get(extensionOrigin);
    if (!extension) {
      throw new Error("Received a message from an unregistered extension");
    }
    if (message.handlerPresent) {
      this.themeChangeHandlers.set(extensionOrigin, port);
    } else {
      this.themeChangeHandlers.delete(extensionOrigin);
    }
    return void 0;
  }
  handleOpenURL(port, contentProviderOrUrl, lineNumber, columnNumber) {
    let resource;
    let isAllowed;
    if (typeof contentProviderOrUrl !== "string") {
      resource = this.makeResource(contentProviderOrUrl);
      isAllowed = this.extensionAllowedOnContentProvider(contentProviderOrUrl, port);
    } else {
      const url = contentProviderOrUrl;
      resource = { url, type: Common2.ResourceType.resourceTypes.Other.name() };
      isAllowed = this.extensionAllowedOnURL(url, port);
    }
    if (isAllowed) {
      port.postMessage({
        command: "open-resource",
        resource,
        lineNumber: lineNumber ? lineNumber + 1 : void 0,
        columnNumber: columnNumber ? columnNumber + 1 : void 0
      });
    }
  }
  extensionAllowedOnURL(url, port) {
    const origin = extensionOrigins.get(port);
    const extension = origin && this.registeredExtensions.get(origin);
    return Boolean(extension?.isAllowedOnTarget(url));
  }
  /**
   * Slightly more permissive as {@link extensionAllowedOnURL}: This method also permits
   * UISourceCodes that originate from a {@link SDK.Script.Script} with a sourceURL magic comment as
   * long as the corresponding target is permitted.
   */
  extensionAllowedOnContentProvider(contentProvider, port) {
    if (!(contentProvider instanceof Workspace.UISourceCode.UISourceCode)) {
      return this.extensionAllowedOnURL(contentProvider.contentURL(), port);
    }
    if (contentProvider.contentType() !== Common2.ResourceType.resourceTypes.Script) {
      return this.extensionAllowedOnURL(contentProvider.contentURL(), port);
    }
    const scripts = Bindings2.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance().scriptsForUISourceCode(contentProvider);
    if (scripts.length === 0) {
      return this.extensionAllowedOnURL(contentProvider.contentURL(), port);
    }
    return scripts.every((script) => {
      if (script.hasSourceURL) {
        return this.extensionAllowedOnTarget(script.target(), port);
      }
      return this.extensionAllowedOnURL(script.contentURL(), port);
    });
  }
  /**
   * This method prefers returning 'Permission denied' errors if restricted resources are not found,
   * rather then NOTFOUND. This prevents extensions from being able to fish for restricted resources.
   */
  lookupAllowedUISourceCode(url, port) {
    const uiSourceCode = Workspace.Workspace.WorkspaceImpl.instance().uiSourceCodeForURL(url);
    if (!uiSourceCode && !this.extensionAllowedOnURL(url, port)) {
      return { error: this.status.E_FAILED("Permission denied") };
    }
    if (!uiSourceCode) {
      return { error: this.status.E_NOTFOUND(url) };
    }
    if (!this.extensionAllowedOnContentProvider(uiSourceCode, port)) {
      return { error: this.status.E_FAILED("Permission denied") };
    }
    return { uiSourceCode };
  }
  extensionAllowedOnTarget(target, port) {
    return this.extensionAllowedOnURL(target.inspectedURL(), port);
  }
  onReload(message, port) {
    if (message.command !== "Reload") {
      return this.status.E_BADARG("command", `expected ${"Reload"}`);
    }
    const options = message.options || {};
    SDK2.NetworkManager.MultitargetNetworkManager.instance().setUserAgentOverride(typeof options.userAgent === "string" ? options.userAgent : "", null);
    let injectedScript;
    if (options.injectedScript) {
      injectedScript = "(function(){" + options.injectedScript + "})()";
    }
    const target = SDK2.TargetManager.TargetManager.instance().primaryPageTarget();
    if (!target) {
      return this.status.OK();
    }
    const resourceTreeModel = target.model(SDK2.ResourceTreeModel.ResourceTreeModel);
    if (!this.extensionAllowedOnTarget(target, port)) {
      return this.status.E_FAILED("Permission denied");
    }
    resourceTreeModel?.reloadPage(Boolean(options.ignoreCache), injectedScript);
    return this.status.OK();
  }
  onEvaluateOnInspectedPage(message, port) {
    if (message.command !== "evaluateOnInspectedPage") {
      return this.status.E_BADARG("command", `expected ${"evaluateOnInspectedPage"}`);
    }
    const { requestId, expression, evaluateOptions } = message;
    function callback(error, object, wasThrown) {
      let result;
      if (error || !object) {
        result = this.status.E_PROTOCOLERROR(error?.toString());
      } else if (wasThrown) {
        result = { isException: true, value: object.description };
      } else {
        result = { value: object.value };
      }
      this.dispatchCallback(requestId, port, result);
    }
    return this.evaluate(expression, true, true, evaluateOptions, this.getExtensionOrigin(port), callback.bind(this));
  }
  async onGetHAR(message, port) {
    if (message.command !== "getHAR") {
      return this.status.E_BADARG("command", `expected ${"getHAR"}`);
    }
    const requests = Logs.NetworkLog.NetworkLog.instance().requests().filter((r) => this.extensionAllowedOnURL(r.url(), port));
    const harLog = await HAR.Log.Log.build(requests, { sanitize: false });
    for (let i = 0; i < harLog.entries.length; ++i) {
      harLog.entries[i]._requestId = this.requestId(requests[i]);
    }
    return harLog;
  }
  makeResource(contentProvider) {
    let buildId = void 0;
    if (contentProvider instanceof Workspace.UISourceCode.UISourceCode) {
      buildId = Bindings2.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance().scriptsForUISourceCode(contentProvider).find((script) => Boolean(script.buildId))?.buildId ?? void 0;
    }
    return { url: contentProvider.contentURL(), type: contentProvider.contentType().name(), buildId };
  }
  onGetPageResources(_message, port) {
    const resources = /* @__PURE__ */ new Map();
    function pushResourceData(contentProvider) {
      if (!resources.has(contentProvider.contentURL()) && this.extensionAllowedOnContentProvider(contentProvider, port)) {
        resources.set(contentProvider.contentURL(), this.makeResource(contentProvider));
      }
      return false;
    }
    let uiSourceCodes = Workspace.Workspace.WorkspaceImpl.instance().uiSourceCodesForProjectType(Workspace.Workspace.projectTypes.Network);
    uiSourceCodes = uiSourceCodes.concat(Workspace.Workspace.WorkspaceImpl.instance().uiSourceCodesForProjectType(Workspace.Workspace.projectTypes.ContentScripts));
    uiSourceCodes.forEach(pushResourceData.bind(this));
    for (const resourceTreeModel of SDK2.TargetManager.TargetManager.instance().models(SDK2.ResourceTreeModel.ResourceTreeModel)) {
      if (this.extensionAllowedOnTarget(resourceTreeModel.target(), port)) {
        resourceTreeModel.forAllResources(pushResourceData.bind(this));
      }
    }
    return [...resources.values()];
  }
  async getResourceContent(contentProvider, message, port) {
    if (!this.extensionAllowedOnContentProvider(contentProvider, port)) {
      this.dispatchCallback(message.requestId, port, this.status.E_FAILED("Permission denied"));
      return void 0;
    }
    const contentData = await contentProvider.requestContentData();
    if (TextUtils.ContentData.ContentData.isError(contentData)) {
      this.dispatchCallback(message.requestId, port, { encoding: "", content: null });
      return;
    }
    const encoding = !contentData.isTextContent ? "base64" : "";
    const content = contentData.isTextContent ? contentData.text : contentData.base64;
    this.dispatchCallback(message.requestId, port, { encoding, content });
  }
  onGetRequestContent(message, port) {
    if (message.command !== "getRequestContent") {
      return this.status.E_BADARG("command", `expected ${"getRequestContent"}`);
    }
    const request = this.requestById(message.id);
    if (!request) {
      return this.status.E_NOTFOUND(message.id);
    }
    void this.getResourceContent(request, message, port);
    return void 0;
  }
  onGetResourceContent(message, port) {
    if (message.command !== "getResourceContent") {
      return this.status.E_BADARG("command", `expected ${"getResourceContent"}`);
    }
    const url = message.url;
    const contentProvider = Workspace.Workspace.WorkspaceImpl.instance().uiSourceCodeForURL(url) || Bindings2.ResourceUtils.resourceForURL(url);
    if (!contentProvider) {
      return this.status.E_NOTFOUND(url);
    }
    void this.getResourceContent(contentProvider, message, port);
    return void 0;
  }
  onAttachSourceMapToResource(message, port) {
    if (message.command !== "attachSourceMapToResource") {
      return this.status.E_BADARG("command", `expected ${"getResourceContent"}`);
    }
    if (!message.sourceMapURL) {
      return this.status.E_FAILED("Expected a source map URL but got null");
    }
    const resource = this.lookupAllowedUISourceCode(message.contentUrl, port);
    if ("error" in resource) {
      return resource.error;
    }
    const debuggerBindingsInstance = Bindings2.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance();
    const scriptFiles = debuggerBindingsInstance.scriptsForUISourceCode(resource.uiSourceCode);
    if (scriptFiles.length > 0) {
      for (const script of scriptFiles) {
        const resourceFile = debuggerBindingsInstance.scriptFile(resource.uiSourceCode, script.debuggerModel);
        resourceFile?.addSourceMapURL(message.sourceMapURL);
      }
    }
    return this.status.OK();
  }
  onSetResourceContent(message, port) {
    if (message.command !== "setResourceContent") {
      return this.status.E_BADARG("command", `expected ${"setResourceContent"}`);
    }
    const { url, requestId, content, commit } = message;
    function callbackWrapper(error) {
      const response = error ? this.status.E_FAILED(error) : this.status.OK();
      this.dispatchCallback(requestId, port, response);
    }
    const resource = this.lookupAllowedUISourceCode(url, port);
    if ("error" in resource) {
      return resource.error;
    }
    const { uiSourceCode } = resource;
    if (!uiSourceCode.contentType().isDocumentOrScriptOrStyleSheet()) {
      const resource2 = SDK2.ResourceTreeModel.ResourceTreeModel.resourceForURL(url);
      if (!resource2) {
        return this.status.E_NOTFOUND(url);
      }
      return this.status.E_NOTSUPPORTED("Resource is not editable");
    }
    uiSourceCode.setWorkingCopy(content);
    if (commit) {
      uiSourceCode.commitWorkingCopy();
    }
    callbackWrapper.call(this, null);
    return void 0;
  }
  requestId(request) {
    const requestId = this.requestIds.get(request);
    if (requestId === void 0) {
      const newId = ++this.lastRequestId;
      this.requestIds.set(request, newId);
      this.requests.set(newId, request);
      return newId;
    }
    return requestId;
  }
  requestById(id) {
    return this.requests.get(id);
  }
  onForwardKeyboardEvent(message) {
    if (message.command !== "_forwardKeyboardEvent") {
      return this.status.E_BADARG("command", `expected ${"_forwardKeyboardEvent"}`);
    }
    message.entries.forEach(handleEventEntry);
    function handleEventEntry(entry) {
      const event = new window.KeyboardEvent(entry.eventType, {
        key: entry.key,
        code: entry.code,
        keyCode: entry.keyCode,
        location: entry.location,
        ctrlKey: entry.ctrlKey,
        altKey: entry.altKey,
        shiftKey: entry.shiftKey,
        metaKey: entry.metaKey
      });
      event.__keyCode = keyCodeForEntry(entry);
      document.dispatchEvent(event);
    }
    function keyCodeForEntry(entry) {
      let keyCode = entry.keyCode;
      if (!keyCode) {
        if (entry.key === Platform2.KeyboardUtilities.ESCAPE_KEY) {
          keyCode = 27;
        }
      }
      return keyCode || 0;
    }
    return void 0;
  }
  dispatchCallback(requestId, port, result) {
    if (requestId) {
      port.postMessage({ command: "callback", requestId, result });
    }
  }
  initExtensions() {
    this.registerAutosubscriptionHandler("resource-added", Workspace.Workspace.WorkspaceImpl.instance(), Workspace.Workspace.Events.UISourceCodeAdded, this.notifyResourceAdded);
    this.registerAutosubscriptionTargetManagerHandler("network-request-finished", SDK2.NetworkManager.NetworkManager, SDK2.NetworkManager.Events.RequestFinished, this.notifyRequestFinished);
    function onElementsSubscriptionStarted() {
      UI3.Context.Context.instance().addFlavorChangeListener(SDK2.DOMModel.DOMNode, this.notifyElementsSelectionChanged, this);
    }
    function onElementsSubscriptionStopped() {
      UI3.Context.Context.instance().removeFlavorChangeListener(SDK2.DOMModel.DOMNode, this.notifyElementsSelectionChanged, this);
    }
    this.registerSubscriptionHandler("panel-objectSelected-elements", onElementsSubscriptionStarted.bind(this), onElementsSubscriptionStopped.bind(this));
    this.registerResourceContentCommittedHandler(this.notifyUISourceCodeContentCommitted);
    SDK2.TargetManager.TargetManager.instance().addEventListener("InspectedURLChanged", this.inspectedURLChanged, this);
  }
  notifyResourceAdded(event) {
    const uiSourceCode = event.data;
    this.postNotification("resource-added", [this.makeResource(uiSourceCode)], (extension) => extension.isAllowedOnTarget(uiSourceCode.url()));
  }
  notifyUISourceCodeContentCommitted(event) {
    const { uiSourceCode, content } = event.data;
    this.postNotification("resource-content-committed", [this.makeResource(uiSourceCode), content], (extension) => extension.isAllowedOnTarget(uiSourceCode.url()));
  }
  async notifyRequestFinished(event) {
    const request = event.data;
    const entry = await HAR.Log.Entry.build(request, { sanitize: false });
    this.postNotification("network-request-finished", [this.requestId(request), entry], (extension) => extension.isAllowedOnTarget(entry.request.url));
  }
  notifyElementsSelectionChanged() {
    this.postNotification("panel-objectSelected-elements", []);
  }
  sourceSelectionChanged(url, range) {
    this.postNotification("panel-objectSelected-sources", [{
      startLine: range.startLine,
      startColumn: range.startColumn,
      endLine: range.endLine,
      endColumn: range.endColumn,
      url
    }], (extension) => extension.isAllowedOnTarget(url));
  }
  setInspectedTabId(event) {
    const oldId = this.inspectedTabId;
    this.inspectedTabId = event.data;
    if (oldId === null) {
      this.initializeExtensions();
    }
  }
  addExtensionFrame({ startPage, name }) {
    const iframe = document.createElement("iframe");
    iframe.src = startPage;
    iframe.dataset.devtoolsExtension = name;
    iframe.style.display = "none";
    document.body.appendChild(iframe);
  }
  addExtension(extensionInfo) {
    const startPage = extensionInfo.startPage;
    const inspectedURL = SDK2.TargetManager.TargetManager.instance().primaryPageTarget()?.inspectedURL() ?? "";
    if (inspectedURL === "") {
      this.#pendingExtensions.push(extensionInfo);
      return;
    }
    if (!_ExtensionServer.canInspectURL(inspectedURL)) {
      this.disableExtensions();
    }
    if (!this.extensionsEnabled) {
      this.#pendingExtensions.push(extensionInfo);
      return;
    }
    const hostsPolicy = HostsPolicy.create(extensionInfo.hostsPolicy);
    if (!hostsPolicy) {
      return;
    }
    try {
      const startPageURL = new URL(startPage);
      const extensionOrigin = startPageURL.origin;
      const name = extensionInfo.name || `Extension ${extensionOrigin}`;
      const extensionRegistration = new RegisteredExtension(name, hostsPolicy, Boolean(extensionInfo.allowFileAccess));
      if (!extensionRegistration.isAllowedOnTarget(inspectedURL)) {
        this.#pendingExtensions.push(extensionInfo);
        return;
      }
      if (!this.registeredExtensions.get(extensionOrigin)) {
        const injectedAPI = self.buildExtensionAPIInjectedScript(extensionInfo, this.inspectedTabId, ThemeSupport.ThemeSupport.instance().themeName(), UI3.ShortcutRegistry.ShortcutRegistry.instance().globalShortcutKeys(), _ExtensionServer.instance().extensionAPITestHook);
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.setInjectedScriptForOrigin(extensionOrigin, injectedAPI);
        this.registeredExtensions.set(extensionOrigin, extensionRegistration);
      }
      this.addExtensionFrame(extensionInfo);
    } catch (e) {
      console.error("Failed to initialize extension " + startPage + ":" + e);
      return false;
    }
    return true;
  }
  registerExtension(origin, port) {
    if (!this.registeredExtensions.has(origin)) {
      if (origin !== window.location.origin) {
        console.error("Ignoring unauthorized client request from " + origin);
      }
      return;
    }
    extensionOrigins.set(port, origin);
    port.addEventListener("message", this.onmessage.bind(this), false);
    port.start();
  }
  onWindowMessage = (event) => {
    if (event.data === "registerExtension") {
      this.registerExtension(event.origin, event.ports[0]);
    }
  };
  extensionEnabled(port) {
    if (!this.extensionsEnabled) {
      return false;
    }
    const origin = extensionOrigins.get(port);
    if (!origin) {
      return false;
    }
    const extension = this.registeredExtensions.get(origin);
    if (!extension) {
      return false;
    }
    return extension.isAllowedOnTarget();
  }
  async onmessage(event) {
    const message = event.data;
    let result;
    const port = event.currentTarget;
    const handler = this.handlers.get(message.command);
    if (!handler) {
      result = this.status.E_NOTSUPPORTED(message.command);
    } else if (!this.extensionEnabled(port)) {
      result = this.status.E_FAILED("Permission denied");
    } else {
      result = await handler(message, event.target);
    }
    if (result && message.requestId) {
      this.dispatchCallback(message.requestId, event.target, result);
    }
  }
  registerHandler(command, callback) {
    console.assert(Boolean(command));
    this.handlers.set(command, callback);
  }
  registerSubscriptionHandler(eventTopic, onSubscribeFirst, onUnsubscribeLast) {
    this.subscriptionStartHandlers.set(eventTopic, onSubscribeFirst);
    this.subscriptionStopHandlers.set(eventTopic, onUnsubscribeLast);
  }
  registerAutosubscriptionHandler(eventTopic, eventTarget, frontendEventType, handler) {
    this.registerSubscriptionHandler(eventTopic, () => eventTarget.addEventListener(frontendEventType, handler, this), () => eventTarget.removeEventListener(frontendEventType, handler, this));
  }
  registerAutosubscriptionTargetManagerHandler(eventTopic, modelClass, frontendEventType, handler) {
    this.registerSubscriptionHandler(eventTopic, () => SDK2.TargetManager.TargetManager.instance().addModelListener(modelClass, frontendEventType, handler, this), () => SDK2.TargetManager.TargetManager.instance().removeModelListener(modelClass, frontendEventType, handler, this));
  }
  registerResourceContentCommittedHandler(handler) {
    function addFirstEventListener() {
      Workspace.Workspace.WorkspaceImpl.instance().addEventListener(Workspace.Workspace.Events.WorkingCopyCommittedByUser, handler, this);
      Workspace.Workspace.WorkspaceImpl.instance().setHasResourceContentTrackingExtensions(true);
    }
    function removeLastEventListener() {
      Workspace.Workspace.WorkspaceImpl.instance().setHasResourceContentTrackingExtensions(false);
      Workspace.Workspace.WorkspaceImpl.instance().removeEventListener(Workspace.Workspace.Events.WorkingCopyCommittedByUser, handler, this);
    }
    this.registerSubscriptionHandler("resource-content-committed", addFirstEventListener.bind(this), removeLastEventListener.bind(this));
  }
  static expandResourcePath(extensionOrigin, resourcePath) {
    const strippedOrigin = new URL(extensionOrigin).origin;
    const resourceURL = new URL(Common2.ParsedURL.normalizePath(resourcePath), strippedOrigin);
    if (resourceURL.origin !== strippedOrigin) {
      return void 0;
    }
    return resourceURL.href;
  }
  evaluate(expression, exposeCommandLineAPI, returnByValue, options, securityOrigin, callback) {
    let context;
    function resolveURLToFrame(url) {
      let found = null;
      function hasMatchingURL(frame2) {
        found = frame2.url === url ? frame2 : null;
        return found;
      }
      SDK2.ResourceTreeModel.ResourceTreeModel.frames().some(hasMatchingURL);
      return found;
    }
    options = options || {};
    let frame;
    if (options.frameURL) {
      frame = resolveURLToFrame(options.frameURL);
    } else {
      const target = SDK2.TargetManager.TargetManager.instance().primaryPageTarget();
      const resourceTreeModel = target?.model(SDK2.ResourceTreeModel.ResourceTreeModel);
      frame = resourceTreeModel?.mainFrame;
    }
    if (!frame) {
      if (options.frameURL) {
        console.warn("evaluate: there is no frame with URL " + options.frameURL);
      } else {
        console.warn("evaluate: the main frame is not yet available");
      }
      return this.status.E_NOTFOUND(options.frameURL || "<top>");
    }
    const extension = this.registeredExtensions.get(securityOrigin);
    if (!extension?.isAllowedOnTarget(frame.url)) {
      return this.status.E_FAILED("Permission denied");
    }
    let contextSecurityOrigin;
    if (options.useContentScriptContext) {
      contextSecurityOrigin = securityOrigin;
    } else if (options.scriptExecutionContext) {
      contextSecurityOrigin = options.scriptExecutionContext;
    }
    const runtimeModel = frame.resourceTreeModel().target().model(SDK2.RuntimeModel.RuntimeModel);
    const executionContexts = runtimeModel ? runtimeModel.executionContexts() : [];
    if (contextSecurityOrigin) {
      for (let i = 0; i < executionContexts.length; ++i) {
        const executionContext = executionContexts[i];
        if (executionContext.frameId === frame.id && executionContext.origin === contextSecurityOrigin && !executionContext.isDefault) {
          context = executionContext;
        }
      }
      if (!context) {
        console.warn("The JavaScript context " + contextSecurityOrigin + " was not found in the frame " + frame.url);
        return this.status.E_NOTFOUND(contextSecurityOrigin);
      }
    } else {
      for (let i = 0; i < executionContexts.length; ++i) {
        const executionContext = executionContexts[i];
        if (executionContext.frameId === frame.id && executionContext.isDefault) {
          context = executionContext;
        }
      }
      if (!context) {
        return this.status.E_FAILED(frame.url + " has no execution context");
      }
    }
    if (!extension?.isAllowedOnTarget(context.origin)) {
      return this.status.E_FAILED("Permission denied");
    }
    void context.evaluate(
      {
        expression,
        objectGroup: "extension",
        includeCommandLineAPI: exposeCommandLineAPI,
        silent: true,
        returnByValue,
        generatePreview: false
      },
      /* userGesture */
      false,
      /* awaitPromise */
      false
    ).then(onEvaluate);
    function onEvaluate(result) {
      if ("error" in result) {
        callback(result.error, null, false);
        return;
      }
      callback(null, result.object || null, Boolean(result.exceptionDetails));
    }
    return void 0;
  }
  static canInspectURL(url) {
    let parsedURL;
    try {
      parsedURL = new URL(url);
    } catch {
      return false;
    }
    if (!kPermittedSchemes.includes(parsedURL.protocol)) {
      return false;
    }
    if ((window.DevToolsAPI?.getOriginsForbiddenForExtensions?.() || []).includes(parsedURL.origin)) {
      return false;
    }
    if (this.#isUrlFromChromeWebStore(parsedURL)) {
      return false;
    }
    return true;
  }
  /**
   * Tests whether a given URL is from the Chrome web store to prevent the extension server from
   * being injected. This is treated as separate from the `getOriginsForbiddenForExtensions` API because
   * DevTools might not be being run from a native origin and we still want to lock down this specific
   * origin from DevTools extensions.
   *
   * @param parsedURL The URL to check
   * @returns `true` if the URL corresponds to the Chrome web store; otherwise `false`
   */
  static #isUrlFromChromeWebStore(parsedURL) {
    if (parsedURL.protocol.startsWith("http") && parsedURL.hostname.match(/^chrome\.google\.com\.?$/) && parsedURL.pathname.startsWith("/webstore")) {
      return true;
    }
    if (parsedURL.protocol.startsWith("http") && parsedURL.hostname.match(/^chromewebstore\.google\.com\.?$/)) {
      return true;
    }
    return false;
  }
  disableExtensions() {
    this.extensionsEnabled = false;
  }
  enableExtensions() {
    this.extensionsEnabled = true;
  }
};
var ExtensionServerPanelView = class extends UI3.View.SimpleView {
  name;
  panel;
  constructor(name, title, panel) {
    const viewId = Platform2.StringUtilities.toKebabCase(title);
    super({ title, viewId });
    this.name = name;
    this.panel = panel;
  }
  viewId() {
    return this.name;
  }
  widget() {
    return Promise.resolve(this.panel);
  }
};
var ExtensionStatus = class {
  OK;
  E_EXISTS;
  E_BADARG;
  E_BADARGTYPE;
  E_NOTFOUND;
  E_NOTSUPPORTED;
  E_PROTOCOLERROR;
  E_FAILED;
  constructor() {
    function makeStatus(code, description, ...details) {
      const status = { code, description, details };
      if (code !== "OK") {
        status.isError = true;
        console.error("Extension server error: " + Platform2.StringUtilities.sprintf(description, ...details));
      }
      return status;
    }
    this.OK = makeStatus.bind(null, "OK", "OK");
    this.E_EXISTS = makeStatus.bind(null, "E_EXISTS", "Object already exists: %s");
    this.E_BADARG = makeStatus.bind(null, "E_BADARG", "Invalid argument %s: %s");
    this.E_BADARGTYPE = makeStatus.bind(null, "E_BADARGTYPE", "Invalid type for argument %s: got %s, expected %s");
    this.E_NOTFOUND = makeStatus.bind(null, "E_NOTFOUND", "Object not found: %s");
    this.E_NOTSUPPORTED = makeStatus.bind(null, "E_NOTSUPPORTED", "Object does not support requested operation: %s");
    this.E_PROTOCOLERROR = makeStatus.bind(null, "E_PROTOCOLERROR", "Inspector protocol error: %s");
    this.E_FAILED = makeStatus.bind(null, "E_FAILED", "Operation failed: %s");
  }
};
export {
  ExtensionAPI_exports as ExtensionAPI,
  ExtensionEndpoint_exports as ExtensionEndpoint,
  ExtensionPanel_exports as ExtensionPanel,
  ExtensionServer_exports as ExtensionServer,
  ExtensionView_exports as ExtensionView,
  HostUrlPattern_exports as HostUrlPattern,
  LanguageExtensionEndpoint_exports as LanguageExtensionEndpoint,
  RecorderExtensionEndpoint_exports as RecorderExtensionEndpoint,
  RecorderPluginManager_exports as RecorderPluginManager
};
//# sourceMappingURL=extensions.js.map
