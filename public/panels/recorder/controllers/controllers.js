var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/recorder/controllers/SelectorPicker.js
var SelectorPicker_exports = {};
__export(SelectorPicker_exports, {
  RequestSelectorAttributeEvent: () => RequestSelectorAttributeEvent,
  SelectorPickedEvent: () => SelectorPickedEvent,
  SelectorPicker: () => SelectorPicker
});
import * as Common from "./../../../core/common/common.js";
import * as Platform from "./../../../core/platform/platform.js";
import * as SDK from "./../../../core/sdk/sdk.js";
import * as Models from "./../models/models.js";
import * as Util from "./../util/util.js";
var BINDING_NAME = "captureSelectors";
var SelectorPickedEvent = class _SelectorPickedEvent extends Event {
  static eventName = "selectorpicked";
  data;
  constructor(data) {
    super(_SelectorPickedEvent.eventName, { bubbles: true, composed: true });
    this.data = data;
  }
};
var RequestSelectorAttributeEvent = class _RequestSelectorAttributeEvent extends Event {
  static eventName = "requestselectorattribute";
  send;
  constructor(send) {
    super(_RequestSelectorAttributeEvent.eventName, {
      bubbles: true,
      composed: true
    });
    this.send = send;
  }
};
var SelectorPicker = class _SelectorPicker {
  static get #targetManager() {
    return SDK.TargetManager.TargetManager.instance();
  }
  #element;
  #selectorAttribute;
  #activeMutex = new Common.Mutex.Mutex();
  active = false;
  constructor(element) {
    this.#element = element;
  }
  start = () => {
    return this.#activeMutex.run(async () => {
      if (this.active) {
        return;
      }
      this.active = true;
      this.#selectorAttribute = await new Promise((resolve, reject) => {
        const timeout = setTimeout(reject, 1e3);
        this.#element.dispatchEvent(new RequestSelectorAttributeEvent((attribute) => {
          clearTimeout(timeout);
          resolve(attribute);
        }));
      });
      _SelectorPicker.#targetManager.observeTargets(this);
      this.#element.requestUpdate();
    });
  };
  stop = () => {
    return this.#activeMutex.run(async () => {
      if (!this.active) {
        return;
      }
      this.active = false;
      _SelectorPicker.#targetManager.unobserveTargets(this);
      _SelectorPicker.#targetManager.targets().map(this.targetRemoved.bind(this));
      this.#selectorAttribute = void 0;
      this.#element.requestUpdate();
    });
  };
  toggle = () => {
    if (!this.active) {
      return this.start();
    }
    return this.stop();
  };
  #targetMutexes = /* @__PURE__ */ new Map();
  targetAdded(target) {
    if (target.type() !== SDK.Target.Type.FRAME) {
      return;
    }
    let mutex = this.#targetMutexes.get(target);
    if (!mutex) {
      mutex = new Common.Mutex.Mutex();
      this.#targetMutexes.set(target, mutex);
    }
    void mutex.run(async () => {
      await this.#addBindings(target);
      await this.#injectApplicationScript(target);
    });
  }
  targetRemoved(target) {
    const mutex = this.#targetMutexes.get(target);
    if (!mutex) {
      return;
    }
    void mutex.run(async () => {
      try {
        await this.#injectCleanupScript(target);
        await this.#removeBindings(target);
      } catch {
      }
    });
  }
  #handleBindingCalledEvent = (event) => {
    if (event.data.name !== BINDING_NAME) {
      return;
    }
    const contextId = event.data.executionContextId;
    const frames = SDK.TargetManager.TargetManager.instance().targets();
    const contextTarget = Models.SDKUtils.findTargetByExecutionContext(frames, contextId);
    const frameId = Models.SDKUtils.findFrameIdByExecutionContext(frames, contextId);
    if (!contextTarget || !frameId) {
      throw new Error(`No execution context found for the binding call + ${JSON.stringify(event.data)}`);
    }
    const model = contextTarget.model(SDK.ResourceTreeModel.ResourceTreeModel);
    if (!model) {
      throw new Error(`ResourceTreeModel instance is missing for the target: ${contextTarget.id()}`);
    }
    const frame = model.frameForId(frameId);
    if (!frame) {
      throw new Error("Frame is not found");
    }
    this.#element.dispatchEvent(new SelectorPickedEvent({
      ...JSON.parse(event.data.payload),
      ...Models.SDKUtils.getTargetFrameContext(contextTarget, frame)
    }));
    void this.stop();
  };
  #scriptIdentifier = /* @__PURE__ */ new Map();
  async #injectApplicationScript(target) {
    const injectedScript = await Util.InjectedScript.get();
    const script = `${injectedScript};DevToolsRecorder.startSelectorPicker({getAccessibleName, getAccessibleRole}, ${JSON.stringify(this.#selectorAttribute ? this.#selectorAttribute : void 0)}, ${Util.isDebugBuild})`;
    const [{ identifier }] = await Promise.all([
      target.pageAgent().invoke_addScriptToEvaluateOnNewDocument({
        source: script,
        worldName: Util.DEVTOOLS_RECORDER_WORLD_NAME,
        includeCommandLineAPI: true
      }),
      Models.SDKUtils.evaluateInAllFrames(Util.DEVTOOLS_RECORDER_WORLD_NAME, target, script)
    ]);
    this.#scriptIdentifier.set(target, identifier);
  }
  async #injectCleanupScript(target) {
    const identifier = this.#scriptIdentifier.get(target);
    Platform.assertNotNullOrUndefined(identifier);
    this.#scriptIdentifier.delete(target);
    await target.pageAgent().invoke_removeScriptToEvaluateOnNewDocument({ identifier });
    const script = "DevToolsRecorder.stopSelectorPicker()";
    await Models.SDKUtils.evaluateInAllFrames(Util.DEVTOOLS_RECORDER_WORLD_NAME, target, script);
  }
  async #addBindings(target) {
    const model = target.model(SDK.RuntimeModel.RuntimeModel);
    Platform.assertNotNullOrUndefined(model);
    model.addEventListener(SDK.RuntimeModel.Events.BindingCalled, this.#handleBindingCalledEvent);
    await model.addBinding({
      name: BINDING_NAME,
      executionContextName: Util.DEVTOOLS_RECORDER_WORLD_NAME
    });
  }
  async #removeBindings(target) {
    await target.runtimeAgent().invoke_removeBinding({ name: BINDING_NAME });
    const model = target.model(SDK.RuntimeModel.RuntimeModel);
    Platform.assertNotNullOrUndefined(model);
    model.removeEventListener(SDK.RuntimeModel.Events.BindingCalled, this.#handleBindingCalledEvent);
  }
};
export {
  SelectorPicker_exports as SelectorPicker
};
//# sourceMappingURL=controllers.js.map
