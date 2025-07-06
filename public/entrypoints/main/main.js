var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/entrypoints/main/ExecutionContextSelector.js
var ExecutionContextSelector_exports = {};
__export(ExecutionContextSelector_exports, {
  ExecutionContextSelector: () => ExecutionContextSelector
});
import * as SDK from "./../../core/sdk/sdk.js";
var ExecutionContextSelector = class {
  #targetManager;
  #context;
  #lastSelectedContextId;
  #ignoreContextChanged;
  constructor(targetManager, context) {
    context.addFlavorChangeListener(SDK.RuntimeModel.ExecutionContext, this.#executionContextChanged, this);
    context.addFlavorChangeListener(SDK.Target.Target, this.#targetChanged, this);
    targetManager.addModelListener(SDK.RuntimeModel.RuntimeModel, SDK.RuntimeModel.Events.ExecutionContextCreated, this.#onExecutionContextCreated, this);
    targetManager.addModelListener(SDK.RuntimeModel.RuntimeModel, SDK.RuntimeModel.Events.ExecutionContextDestroyed, this.#onExecutionContextDestroyed, this);
    targetManager.addModelListener(SDK.RuntimeModel.RuntimeModel, SDK.RuntimeModel.Events.ExecutionContextOrderChanged, this.#onExecutionContextOrderChanged, this);
    this.#targetManager = targetManager;
    this.#context = context;
    targetManager.observeModels(SDK.RuntimeModel.RuntimeModel, this);
  }
  modelAdded(runtimeModel) {
    queueMicrotask(deferred.bind(this));
    function deferred() {
      if (!this.#context.flavor(SDK.Target.Target)) {
        this.#context.setFlavor(SDK.Target.Target, runtimeModel.target());
      }
    }
  }
  modelRemoved(runtimeModel) {
    const currentExecutionContext = this.#context.flavor(SDK.RuntimeModel.ExecutionContext);
    if (currentExecutionContext && currentExecutionContext.runtimeModel === runtimeModel) {
      this.#currentExecutionContextGone();
    }
    const models = this.#targetManager.models(SDK.RuntimeModel.RuntimeModel);
    if (this.#context.flavor(SDK.Target.Target) === runtimeModel.target() && models.length) {
      this.#context.setFlavor(SDK.Target.Target, models[0].target());
    }
  }
  #executionContextChanged({ data: newContext }) {
    if (newContext) {
      this.#context.setFlavor(SDK.Target.Target, newContext.target());
      if (!this.#ignoreContextChanged) {
        this.#lastSelectedContextId = this.#contextPersistentId(newContext);
      }
    }
  }
  #contextPersistentId(executionContext) {
    return executionContext.isDefault ? executionContext.target().name() + ":" + executionContext.frameId : "";
  }
  #targetChanged({ data: newTarget }) {
    const currentContext = this.#context.flavor(SDK.RuntimeModel.ExecutionContext);
    if (!newTarget || currentContext && currentContext.target() === newTarget) {
      return;
    }
    const runtimeModel = newTarget.model(SDK.RuntimeModel.RuntimeModel);
    const executionContexts = runtimeModel ? runtimeModel.executionContexts() : [];
    if (!executionContexts.length) {
      return;
    }
    let newContext = null;
    for (let i = 0; i < executionContexts.length && !newContext; ++i) {
      if (this.#shouldSwitchToContext(executionContexts[i])) {
        newContext = executionContexts[i];
      }
    }
    for (let i = 0; i < executionContexts.length && !newContext; ++i) {
      if (this.#isDefaultContext(executionContexts[i])) {
        newContext = executionContexts[i];
      }
    }
    this.#ignoreContextChanged = true;
    this.#context.setFlavor(SDK.RuntimeModel.ExecutionContext, newContext || executionContexts[0]);
    this.#ignoreContextChanged = false;
  }
  #shouldSwitchToContext(executionContext) {
    if (executionContext.target().targetInfo()?.subtype) {
      return false;
    }
    if (this.#lastSelectedContextId && this.#lastSelectedContextId === this.#contextPersistentId(executionContext)) {
      return true;
    }
    return !this.#lastSelectedContextId && this.#isDefaultContext(executionContext);
  }
  #isDefaultContext(executionContext) {
    if (!executionContext.isDefault || !executionContext.frameId) {
      return false;
    }
    if (executionContext.target().parentTarget()?.type() === SDK.Target.Type.FRAME) {
      return false;
    }
    const resourceTreeModel = executionContext.target().model(SDK.ResourceTreeModel.ResourceTreeModel);
    const frame = resourceTreeModel?.frameForId(executionContext.frameId);
    return Boolean(frame?.isOutermostFrame());
  }
  #onExecutionContextCreated(event) {
    if (this.#lastSelectedContextId === void 0) {
      this.#switchContextIfNecessary(event.data);
      return;
    }
    switch (event.data.target().type()) {
      case SDK.Target.Type.AUCTION_WORKLET:
      case SDK.Target.Type.SHARED_STORAGE_WORKLET:
      case SDK.Target.Type.SHARED_WORKER:
      case SDK.Target.Type.ServiceWorker:
      case SDK.Target.Type.WORKLET:
      case SDK.Target.Type.Worker:
        return;
      case SDK.Target.Type.BROWSER:
      case SDK.Target.Type.FRAME:
      case SDK.Target.Type.NODE:
      case SDK.Target.Type.TAB:
        this.#switchContextIfNecessary(event.data);
        break;
    }
  }
  #onExecutionContextDestroyed(event) {
    const executionContext = event.data;
    if (this.#context.flavor(SDK.RuntimeModel.ExecutionContext) === executionContext) {
      this.#currentExecutionContextGone();
    }
  }
  #onExecutionContextOrderChanged(event) {
    const runtimeModel = event.data;
    const executionContexts = runtimeModel.executionContexts();
    for (let i = 0; i < executionContexts.length; i++) {
      if (this.#switchContextIfNecessary(executionContexts[i])) {
        break;
      }
    }
  }
  #switchContextIfNecessary(executionContext) {
    if (!this.#context.flavor(SDK.RuntimeModel.ExecutionContext) || this.#shouldSwitchToContext(executionContext)) {
      this.#ignoreContextChanged = true;
      this.#context.setFlavor(SDK.RuntimeModel.ExecutionContext, executionContext);
      this.#ignoreContextChanged = false;
      return true;
    }
    return false;
  }
  #currentExecutionContextGone() {
    const runtimeModels = this.#targetManager.models(SDK.RuntimeModel.RuntimeModel);
    let newContext = null;
    for (let i = 0; i < runtimeModels.length && !newContext; ++i) {
      const executionContexts = runtimeModels[i].executionContexts();
      for (const executionContext of executionContexts) {
        if (this.#isDefaultContext(executionContext)) {
          newContext = executionContext;
          break;
        }
      }
    }
    if (!newContext) {
      for (let i = 0; i < runtimeModels.length && !newContext; ++i) {
        const executionContexts = runtimeModels[i].executionContexts();
        if (executionContexts.length) {
          newContext = executionContexts[0];
          break;
        }
      }
    }
    this.#ignoreContextChanged = true;
    this.#context.setFlavor(SDK.RuntimeModel.ExecutionContext, newContext);
    this.#ignoreContextChanged = false;
  }
};

// gen/front_end/entrypoints/main/MainImpl.js
var MainImpl_exports = {};
__export(MainImpl_exports, {
  MainImpl: () => MainImpl,
  MainMenuItem: () => MainMenuItem,
  PauseListener: () => PauseListener,
  ReloadActionDelegate: () => ReloadActionDelegate,
  SearchActionDelegate: () => SearchActionDelegate,
  SettingsButtonProvider: () => SettingsButtonProvider,
  ZoomActionDelegate: () => ZoomActionDelegate,
  handleExternalRequest: () => handleExternalRequest,
  sendOverProtocol: () => sendOverProtocol
});
import * as Common from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as Platform2 from "./../../core/platform/platform.js";
import * as ProtocolClient from "./../../core/protocol_client/protocol_client.js";
import * as Root from "./../../core/root/root.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as AutofillManager from "./../../models/autofill_manager/autofill_manager.js";
import * as Bindings from "./../../models/bindings/bindings.js";
import * as Breakpoints from "./../../models/breakpoints/breakpoints.js";
import * as CrUXManager from "./../../models/crux-manager/crux-manager.js";
import * as Extensions from "./../../models/extensions/extensions.js";
import * as IssuesManager from "./../../models/issues_manager/issues_manager.js";
import * as LiveMetrics from "./../../models/live-metrics/live-metrics.js";
import * as Logs from "./../../models/logs/logs.js";
import * as Persistence from "./../../models/persistence/persistence.js";
import * as ProjectSettings from "./../../models/project_settings/project_settings.js";
import * as Workspace from "./../../models/workspace/workspace.js";
import * as Snippets from "./../../panels/snippets/snippets.js";
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as IconButton from "./../../ui/components/icon_button/icon_button.js";
import * as Components from "./../../ui/legacy/components/utils/utils.js";
import * as UI from "./../../ui/legacy/legacy.js";
import * as ThemeSupport from "./../../ui/legacy/theme_support/theme_support.js";
import { html, render } from "./../../ui/lit/lit.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";
var UIStrings = {
  /**
   *@description Title of item in main
   */
  customizeAndControlDevtools: "Customize and control DevTools",
  /**
   *@description Title element text content in Main
   */
  dockSide: "Dock side",
  /**
   *@description Title element title in Main
   *@example {Ctrl+Shift+D} PH1
   */
  placementOfDevtoolsRelativeToThe: "Placement of DevTools relative to the page. ({PH1} to restore last position)",
  /**
   *@description Text to undock the DevTools
   */
  undockIntoSeparateWindow: "Undock into separate window",
  /**
   *@description Text to dock the DevTools to the bottom of the browser tab
   */
  dockToBottom: "Dock to bottom",
  /**
   *@description Text to dock the DevTools to the right of the browser tab
   */
  dockToRight: "Dock to right",
  /**
   *@description Text to dock the DevTools to the left of the browser tab
   */
  dockToLeft: "Dock to left",
  /**
   *@description Text in Main
   */
  focusDebuggee: "Focus page",
  /**
   *@description Text in Main
   */
  hideConsoleDrawer: "Hide console drawer",
  /**
   *@description Text in Main
   */
  showConsoleDrawer: "Show console drawer",
  /**
   *@description A context menu item in the Main
   */
  moreTools: "More tools",
  /**
   *@description Text for the viewing the help options
   */
  help: "Help",
  /**
   *@description Text describing how to navigate the dock side menu
   */
  dockSideNavigation: "Use left and right arrow keys to navigate the options"
};
var str_ = i18n.i18n.registerUIStrings("entrypoints/main/MainImpl.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var MainImpl = class _MainImpl {
  #readyForTestPromise = Promise.withResolvers();
  constructor() {
    _MainImpl.instanceForTest = this;
    void this.#loaded();
  }
  static time(label) {
    if (Host.InspectorFrontendHost.isUnderTest()) {
      return;
    }
    console.time(label);
  }
  static timeEnd(label) {
    if (Host.InspectorFrontendHost.isUnderTest()) {
      return;
    }
    console.timeEnd(label);
  }
  async #loaded() {
    console.timeStamp("Main._loaded");
    Root.Runtime.Runtime.setPlatform(Host.Platform.platform());
    const [config, prefs] = await Promise.all([
      new Promise((resolve) => {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.getHostConfig(resolve);
      }),
      new Promise((resolve) => Host.InspectorFrontendHost.InspectorFrontendHostInstance.getPreferences(resolve))
    ]);
    console.timeStamp("Main._gotPreferences");
    this.#initializeGlobalsForLayoutTests();
    Object.assign(Root.Runtime.hostConfig, config);
    this.createSettings(prefs);
    await this.requestAndRegisterLocaleData();
    Host.userMetrics.syncSetting(Common.Settings.Settings.instance().moduleSetting("sync-preferences").get());
    const veLogging = config.devToolsVeLogging;
    if (veLogging?.enabled) {
      if (veLogging?.testing) {
        VisualLogging.setVeDebugLoggingEnabled(
          true,
          "Test"
          /* VisualLogging.DebugLoggingFormat.TEST */
        );
        const options = {
          processingThrottler: new Common.Throttler.Throttler(0),
          keyboardLogThrottler: new Common.Throttler.Throttler(10),
          hoverLogThrottler: new Common.Throttler.Throttler(50),
          dragLogThrottler: new Common.Throttler.Throttler(50),
          clickLogThrottler: new Common.Throttler.Throttler(10),
          resizeLogThrottler: new Common.Throttler.Throttler(10)
        };
        void VisualLogging.startLogging(options);
      } else {
        void VisualLogging.startLogging();
      }
    }
    void this.#createAppUI();
  }
  #initializeGlobalsForLayoutTests() {
    self.Extensions ||= {};
    self.Host ||= {};
    self.Host.userMetrics ||= Host.userMetrics;
    self.Host.UserMetrics ||= Host.UserMetrics;
    self.ProtocolClient ||= {};
    self.ProtocolClient.test ||= ProtocolClient.InspectorBackend.test;
  }
  async requestAndRegisterLocaleData() {
    const settingLanguage = Common.Settings.Settings.instance().moduleSetting("language").get();
    const devToolsLocale = i18n.DevToolsLocale.DevToolsLocale.instance({
      create: true,
      data: {
        navigatorLanguage: navigator.language,
        settingLanguage,
        lookupClosestDevToolsLocale: i18n.i18n.lookupClosestSupportedDevToolsLocale
      }
    });
    Host.userMetrics.language(devToolsLocale.locale);
    if (devToolsLocale.locale !== "en-US") {
      await i18n.i18n.fetchAndRegisterLocaleData("en-US");
    }
    try {
      await i18n.i18n.fetchAndRegisterLocaleData(devToolsLocale.locale);
    } catch (error) {
      console.warn(`Unable to fetch & register locale data for '${devToolsLocale.locale}', falling back to 'en-US'. Cause: `, error);
      devToolsLocale.forceFallbackLocale();
    }
  }
  createSettings(prefs) {
    this.#initializeExperiments();
    let storagePrefix = "";
    if (Host.Platform.isCustomDevtoolsFrontend()) {
      storagePrefix = "__custom__";
    } else if (!Root.Runtime.Runtime.queryParam("can_dock") && Boolean(Root.Runtime.Runtime.queryParam("debugFrontend")) && !Host.InspectorFrontendHost.isUnderTest()) {
      storagePrefix = "__bundled__";
    }
    let localStorage;
    if (!Host.InspectorFrontendHost.isUnderTest() && window.localStorage) {
      const localbackingStore = {
        ...Common.Settings.NOOP_STORAGE,
        clear: () => window.localStorage.clear()
      };
      localStorage = new Common.Settings.SettingsStorage(window.localStorage, localbackingStore, storagePrefix);
    } else {
      localStorage = new Common.Settings.SettingsStorage({}, Common.Settings.NOOP_STORAGE, storagePrefix);
    }
    const hostUnsyncedStorage = {
      register: (name) => Host.InspectorFrontendHost.InspectorFrontendHostInstance.registerPreference(name, { synced: false }),
      set: Host.InspectorFrontendHost.InspectorFrontendHostInstance.setPreference,
      get: (name) => {
        return new Promise((resolve) => {
          Host.InspectorFrontendHost.InspectorFrontendHostInstance.getPreference(name, resolve);
        });
      },
      remove: Host.InspectorFrontendHost.InspectorFrontendHostInstance.removePreference,
      clear: Host.InspectorFrontendHost.InspectorFrontendHostInstance.clearPreferences
    };
    const hostSyncedStorage = {
      ...hostUnsyncedStorage,
      register: (name) => Host.InspectorFrontendHost.InspectorFrontendHostInstance.registerPreference(name, { synced: true })
    };
    const syncedStorage = new Common.Settings.SettingsStorage(prefs, hostSyncedStorage, storagePrefix);
    const globalStorage = new Common.Settings.SettingsStorage(prefs, hostUnsyncedStorage, storagePrefix);
    Common.Settings.Settings.instance({ forceNew: true, syncedStorage, globalStorage, localStorage, logSettingAccess: VisualLogging.logSettingAccess });
    if (!Host.InspectorFrontendHost.isUnderTest()) {
      new Common.Settings.VersionController().updateVersion();
    }
  }
  #initializeExperiments() {
    Root.Runtime.experiments.register("capture-node-creation-stacks", "Capture node creation stacks");
    Root.Runtime.experiments.register("live-heap-profile", "Live heap profile", true);
    Root.Runtime.experiments.register("protocol-monitor", "Protocol Monitor", void 0, "https://developer.chrome.com/blog/new-in-devtools-92/#protocol-monitor");
    Root.Runtime.experiments.register("sampling-heap-profiler-timeline", "Sampling heap profiler timeline", true);
    Root.Runtime.experiments.register("show-option-tp-expose-internals-in-heap-snapshot", "Show option to expose internals in heap snapshots");
    Root.Runtime.experiments.register("vertical-drawer", "Enable vertical drawer configuration");
    Root.Runtime.experiments.register("timeline-invalidation-tracking", "Performance panel: invalidation tracking", true);
    Root.Runtime.experiments.register("timeline-show-all-events", "Performance panel: show all events", true);
    Root.Runtime.experiments.register("timeline-v8-runtime-call-stats", "Performance panel: V8 runtime call stats", true);
    Root.Runtime.experiments.register("timeline-enhanced-traces", "Performance panel: Enable collecting enhanced traces", true);
    Root.Runtime.experiments.register("timeline-compiled-sources", "Performance panel: Enable collecting source text for compiled script", true);
    Root.Runtime.experiments.register("timeline-debug-mode", "Performance panel: Enable debug mode (trace event details, etc)", true);
    Root.Runtime.experiments.register("instrumentation-breakpoints", "Enable instrumentation breakpoints", true);
    Root.Runtime.experiments.register("use-source-map-scopes", "Use scope information from source maps", true);
    Root.Runtime.experiments.register("apca", "Enable new Advanced Perceptual Contrast Algorithm (APCA) replacing previous contrast ratio and AA/AAA guidelines", void 0, "https://developer.chrome.com/blog/new-in-devtools-89/#apca");
    Root.Runtime.experiments.register("full-accessibility-tree", "Enable full accessibility tree view in the Elements panel", void 0, "https://developer.chrome.com/blog/new-in-devtools-90/#accessibility-tree", "https://g.co/devtools/a11y-tree-feedback");
    Root.Runtime.experiments.register("font-editor", "Enable new font editor within the Styles tab", void 0, "https://developer.chrome.com/blog/new-in-devtools-89/#font");
    Root.Runtime.experiments.register("contrast-issues", "Enable automatic contrast issue reporting via the Issues panel", void 0, "https://developer.chrome.com/blog/new-in-devtools-90/#low-contrast");
    Root.Runtime.experiments.register("experimental-cookie-features", "Enable experimental cookie features");
    Root.Runtime.experiments.register("highlight-errors-elements-panel", "Highlights a violating node or attribute in the Elements panel DOM tree");
    Root.Runtime.experiments.register("authored-deployed-grouping", "Group sources into authored and deployed trees", void 0, "https://goo.gle/authored-deployed", "https://goo.gle/authored-deployed-feedback");
    Root.Runtime.experiments.register("just-my-code", "Hide ignore-listed code in Sources tree view");
    Root.Runtime.experiments.register("timeline-show-postmessage-events", "Performance panel: show postMessage dispatch and handling flows");
    Root.Runtime.experiments.register("timeline-experimental-insights", "Performance panel: enable experimental performance insights");
    Root.Runtime.experiments.enableExperimentsByDefault([
      "full-accessibility-tree",
      "highlight-errors-elements-panel",
      ...Root.Runtime.Runtime.queryParam("isChromeForTesting") ? ["protocol-monitor"] : []
    ]);
    Root.Runtime.experiments.cleanUpStaleExperiments();
    const enabledExperiments = Root.Runtime.Runtime.queryParam("enabledExperiments");
    if (enabledExperiments) {
      Root.Runtime.experiments.setServerEnabledExperiments(enabledExperiments.split(";"));
    }
    Root.Runtime.experiments.enableExperimentsTransiently([]);
    if (Host.InspectorFrontendHost.isUnderTest()) {
      const testParam = Root.Runtime.Runtime.queryParam("test");
      if (testParam?.includes("live-line-level-heap-profile.js")) {
        Root.Runtime.experiments.enableForTest("live-heap-profile");
      }
    }
    for (const experiment of Root.Runtime.experiments.allConfigurableExperiments()) {
      if (experiment.isEnabled()) {
        Host.userMetrics.experimentEnabledAtLaunch(experiment.name);
      } else {
        Host.userMetrics.experimentDisabledAtLaunch(experiment.name);
      }
    }
  }
  async #createAppUI() {
    _MainImpl.time("Main._createAppUI");
    const isolatedFileSystemManager = Persistence.IsolatedFileSystemManager.IsolatedFileSystemManager.instance();
    const defaultThemeSetting = "systemPreferred";
    const themeSetting = Common.Settings.Settings.instance().createSetting("ui-theme", defaultThemeSetting);
    UI.UIUtils.initializeUIUtils(document);
    if (!ThemeSupport.ThemeSupport.hasInstance()) {
      ThemeSupport.ThemeSupport.instance({ forceNew: true, setting: themeSetting });
    }
    UI.UIUtils.addPlatformClass(document.documentElement);
    UI.UIUtils.installComponentRootStyles(document.body);
    this.#addMainEventListeners(document);
    const canDock = Boolean(Root.Runtime.Runtime.queryParam("can_dock"));
    UI.ZoomManager.ZoomManager.instance({ forceNew: true, win: window, frontendHost: Host.InspectorFrontendHost.InspectorFrontendHostInstance });
    UI.ContextMenu.ContextMenu.initialize();
    UI.ContextMenu.ContextMenu.installHandler(document);
    Logs.NetworkLog.NetworkLog.instance();
    SDK2.FrameManager.FrameManager.instance();
    Logs.LogManager.LogManager.instance();
    IssuesManager.IssuesManager.IssuesManager.instance({
      forceNew: true,
      ensureFirst: true,
      showThirdPartyIssuesSetting: IssuesManager.Issue.getShowThirdPartyIssuesSetting(),
      hideIssueSetting: IssuesManager.IssuesManager.getHideIssueByCodeSetting()
    });
    IssuesManager.ContrastCheckTrigger.ContrastCheckTrigger.instance();
    UI.DockController.DockController.instance({ forceNew: true, canDock });
    SDK2.NetworkManager.MultitargetNetworkManager.instance({ forceNew: true });
    SDK2.DOMDebuggerModel.DOMDebuggerManager.instance({ forceNew: true });
    const targetManager = SDK2.TargetManager.TargetManager.instance();
    targetManager.addEventListener("SuspendStateChanged", this.#onSuspendStateChanged.bind(this));
    Workspace.FileManager.FileManager.instance({ forceNew: true });
    Workspace.Workspace.WorkspaceImpl.instance();
    Bindings.NetworkProject.NetworkProjectManager.instance();
    const resourceMapping = new Bindings.ResourceMapping.ResourceMapping(targetManager, Workspace.Workspace.WorkspaceImpl.instance());
    new Bindings.PresentationConsoleMessageHelper.PresentationConsoleMessageManager();
    Bindings.CSSWorkspaceBinding.CSSWorkspaceBinding.instance({
      forceNew: true,
      resourceMapping,
      targetManager
    });
    Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance({
      forceNew: true,
      resourceMapping,
      targetManager
    });
    targetManager.setScopeTarget(targetManager.primaryPageTarget());
    UI.Context.Context.instance().addFlavorChangeListener(SDK2.Target.Target, ({ data }) => {
      const outermostTarget = data?.outermostTarget();
      targetManager.setScopeTarget(outermostTarget);
    });
    Breakpoints.BreakpointManager.BreakpointManager.instance({
      forceNew: true,
      workspace: Workspace.Workspace.WorkspaceImpl.instance(),
      targetManager,
      debuggerWorkspaceBinding: Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance()
    });
    self.Extensions.extensionServer = Extensions.ExtensionServer.ExtensionServer.instance({ forceNew: true });
    new Persistence.FileSystemWorkspaceBinding.FileSystemWorkspaceBinding(isolatedFileSystemManager, Workspace.Workspace.WorkspaceImpl.instance());
    isolatedFileSystemManager.addPlatformFileSystem("snippet://", new Snippets.ScriptSnippetFileSystem.SnippetFileSystem());
    Persistence.Persistence.PersistenceImpl.instance({
      forceNew: true,
      workspace: Workspace.Workspace.WorkspaceImpl.instance(),
      breakpointManager: Breakpoints.BreakpointManager.BreakpointManager.instance()
    });
    Persistence.NetworkPersistenceManager.NetworkPersistenceManager.instance({ forceNew: true, workspace: Workspace.Workspace.WorkspaceImpl.instance() });
    new ExecutionContextSelector(targetManager, UI.Context.Context.instance());
    Bindings.IgnoreListManager.IgnoreListManager.instance({
      forceNew: true,
      debuggerWorkspaceBinding: Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance()
    });
    const projectSettingsModel = ProjectSettings.ProjectSettingsModel.ProjectSettingsModel.instance({
      forceNew: true,
      hostConfig: Root.Runtime.hostConfig,
      pageResourceLoader: SDK2.PageResourceLoader.PageResourceLoader.instance(),
      targetManager
    });
    const automaticFileSystemManager = Persistence.AutomaticFileSystemManager.AutomaticFileSystemManager.instance({
      forceNew: true,
      inspectorFrontendHost: Host.InspectorFrontendHost.InspectorFrontendHostInstance,
      projectSettingsModel
    });
    Persistence.AutomaticFileSystemWorkspaceBinding.AutomaticFileSystemWorkspaceBinding.instance({
      forceNew: true,
      automaticFileSystemManager,
      isolatedFileSystemManager,
      workspace: Workspace.Workspace.WorkspaceImpl.instance()
    });
    AutofillManager.AutofillManager.AutofillManager.instance();
    LiveMetrics.LiveMetrics.instance();
    CrUXManager.CrUXManager.instance();
    new PauseListener();
    const actionRegistryInstance = UI.ActionRegistry.ActionRegistry.instance({ forceNew: true });
    UI.ShortcutRegistry.ShortcutRegistry.instance({ forceNew: true, actionRegistry: actionRegistryInstance });
    this.#registerMessageSinkListener();
    _MainImpl.timeEnd("Main._createAppUI");
    const appProvider = Common.AppProvider.getRegisteredAppProviders()[0];
    if (!appProvider) {
      throw new Error("Unable to boot DevTools, as the appprovider is missing");
    }
    await this.#showAppUI(await appProvider.loadAppProvider());
  }
  async #showAppUI(appProvider) {
    _MainImpl.time("Main._showAppUI");
    const app = appProvider.createApp();
    UI.DockController.DockController.instance().initialize();
    ThemeSupport.ThemeSupport.instance().fetchColorsAndApplyHostTheme();
    app.presentUI(document);
    if (UI.ActionRegistry.ActionRegistry.instance().hasAction("elements.toggle-element-search")) {
      const toggleSearchNodeAction = UI.ActionRegistry.ActionRegistry.instance().getAction("elements.toggle-element-search");
      Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(Host.InspectorFrontendHostAPI.Events.EnterInspectElementMode, () => {
        void toggleSearchNodeAction.execute();
      }, this);
    }
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(Host.InspectorFrontendHostAPI.Events.RevealSourceLine, this.#revealSourceLine, this);
    await UI.InspectorView.InspectorView.instance().createToolbars();
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.loadCompleted();
    const value = Root.Runtime.Runtime.queryParam("loadTimelineFromURL");
    if (value !== null) {
      const Timeline = await import("./../../panels/timeline/timeline.js");
      Timeline.TimelinePanel.LoadTimelineHandler.instance().handleQueryParam(value);
    }
    UI.ARIAUtils.getOrCreateAlertElement();
    UI.DockController.DockController.instance().announceDockLocation();
    window.setTimeout(this.#initializeTarget.bind(this), 0);
    _MainImpl.timeEnd("Main._showAppUI");
  }
  async #initializeTarget() {
    _MainImpl.time("Main._initializeTarget");
    for (const runnableInstanceFunction of Common.Runnable.earlyInitializationRunnables()) {
      await runnableInstanceFunction().run();
    }
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.readyForTest();
    this.#readyForTestPromise.resolve();
    window.setTimeout(this.#lateInitialization.bind(this), 100);
    await this.#maybeInstallVeInspectionBinding();
    _MainImpl.timeEnd("Main._initializeTarget");
  }
  async #maybeInstallVeInspectionBinding() {
    const primaryPageTarget = SDK2.TargetManager.TargetManager.instance().primaryPageTarget();
    const url = primaryPageTarget?.targetInfo()?.url;
    const origin = url ? Common.ParsedURL.ParsedURL.extractOrigin(url) : void 0;
    const binding = "__devtools_ve_inspection_binding__";
    if (primaryPageTarget && await VisualLogging.isUnderInspection(origin)) {
      const runtimeModel = primaryPageTarget.model(SDK2.RuntimeModel.RuntimeModel);
      await runtimeModel?.addBinding({ name: binding });
      runtimeModel?.addEventListener(SDK2.RuntimeModel.Events.BindingCalled, (event) => {
        if (event.data.name === binding) {
          VisualLogging.setVeDebuggingEnabled(event.data.payload === "true", (query) => {
            VisualLogging.setVeDebuggingEnabled(false);
            void runtimeModel?.defaultExecutionContext()?.evaluate(
              {
                expression: `window.inspect(${JSON.stringify(query)})`,
                includeCommandLineAPI: false,
                silent: true,
                returnByValue: false,
                generatePreview: false
              },
              /* userGesture */
              false,
              /* awaitPromise */
              false
            );
          });
        }
      });
    }
  }
  async #lateInitialization() {
    _MainImpl.time("Main._lateInitialization");
    Extensions.ExtensionServer.ExtensionServer.instance().initializeExtensions();
    const promises = Common.Runnable.lateInitializationRunnables().map(async (lateInitializationLoader) => {
      const runnable = await lateInitializationLoader();
      return await runnable.run();
    });
    if (Root.Runtime.experiments.isEnabled("live-heap-profile")) {
      const PerfUI = await import("./../../ui/legacy/components/perf_ui/perf_ui.js");
      const setting = "memory-live-heap-profile";
      if (Common.Settings.Settings.instance().moduleSetting(setting).get()) {
        promises.push(PerfUI.LiveHeapProfile.LiveHeapProfile.instance().run());
      } else {
        const changeListener = async (event) => {
          if (!event.data) {
            return;
          }
          Common.Settings.Settings.instance().moduleSetting(setting).removeChangeListener(changeListener);
          void PerfUI.LiveHeapProfile.LiveHeapProfile.instance().run();
        };
        Common.Settings.Settings.instance().moduleSetting(setting).addChangeListener(changeListener);
      }
    }
    _MainImpl.timeEnd("Main._lateInitialization");
  }
  readyForTest() {
    return this.#readyForTestPromise.promise;
  }
  #registerMessageSinkListener() {
    Common.Console.Console.instance().addEventListener("messageAdded", messageAdded);
    function messageAdded({ data: message }) {
      if (message.show) {
        Common.Console.Console.instance().show();
      }
    }
  }
  #revealSourceLine(event) {
    const { url, lineNumber, columnNumber } = event.data;
    const uiSourceCode = Workspace.Workspace.WorkspaceImpl.instance().uiSourceCodeForURL(url);
    if (uiSourceCode) {
      void Common.Revealer.reveal(uiSourceCode.uiLocation(lineNumber, columnNumber));
      return;
    }
    function listener(event2) {
      const uiSourceCode2 = event2.data;
      if (uiSourceCode2.url() === url) {
        void Common.Revealer.reveal(uiSourceCode2.uiLocation(lineNumber, columnNumber));
        Workspace.Workspace.WorkspaceImpl.instance().removeEventListener(Workspace.Workspace.Events.UISourceCodeAdded, listener);
      }
    }
    Workspace.Workspace.WorkspaceImpl.instance().addEventListener(Workspace.Workspace.Events.UISourceCodeAdded, listener);
  }
  #postDocumentKeyDown(event) {
    if (!event.handled) {
      UI.ShortcutRegistry.ShortcutRegistry.instance().handleShortcut(event);
    }
  }
  #redispatchClipboardEvent(event) {
    const eventCopy = new CustomEvent("clipboard-" + event.type, { bubbles: true });
    eventCopy["original"] = event;
    const document2 = event.target && event.target.ownerDocument;
    const target = document2 ? Platform2.DOMUtilities.deepActiveElement(document2) : null;
    if (target) {
      target.dispatchEvent(eventCopy);
    }
    if (eventCopy.handled) {
      event.preventDefault();
    }
  }
  #contextMenuEventFired(event) {
    if (event.handled || event.target.classList.contains("popup-glasspane")) {
      event.preventDefault();
    }
  }
  #addMainEventListeners(document2) {
    document2.addEventListener("keydown", this.#postDocumentKeyDown.bind(this), false);
    document2.addEventListener("beforecopy", this.#redispatchClipboardEvent.bind(this), true);
    document2.addEventListener("copy", this.#redispatchClipboardEvent.bind(this), false);
    document2.addEventListener("cut", this.#redispatchClipboardEvent.bind(this), false);
    document2.addEventListener("paste", this.#redispatchClipboardEvent.bind(this), false);
    document2.addEventListener("contextmenu", this.#contextMenuEventFired.bind(this), true);
  }
  #onSuspendStateChanged() {
    const suspended = SDK2.TargetManager.TargetManager.instance().allTargetsSuspended();
    UI.InspectorView.InspectorView.instance().onSuspendStateChanged(suspended);
  }
  static instanceForTest = null;
};
globalThis.Main = globalThis.Main || {};
globalThis.Main.Main = MainImpl;
var ZoomActionDelegate = class {
  handleAction(_context, actionId) {
    if (Host.InspectorFrontendHost.InspectorFrontendHostInstance.isHostedMode()) {
      return false;
    }
    switch (actionId) {
      case "main.zoom-in":
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.zoomIn();
        return true;
      case "main.zoom-out":
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.zoomOut();
        return true;
      case "main.zoom-reset":
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.resetZoom();
        return true;
    }
    return false;
  }
};
var SearchActionDelegate = class {
  handleAction(_context, actionId) {
    let searchableView = UI.SearchableView.SearchableView.fromElement(Platform2.DOMUtilities.deepActiveElement(document));
    if (!searchableView) {
      const currentPanel = UI.InspectorView.InspectorView.instance().currentPanelDeprecated();
      if (currentPanel?.searchableView) {
        searchableView = currentPanel.searchableView();
      }
      if (!searchableView) {
        return false;
      }
    }
    switch (actionId) {
      case "main.search-in-panel.find":
        return searchableView.handleFindShortcut();
      case "main.search-in-panel.cancel":
        return searchableView.handleCancelSearchShortcut();
      case "main.search-in-panel.find-next":
        return searchableView.handleFindNextShortcut();
      case "main.search-in-panel.find-previous":
        return searchableView.handleFindPreviousShortcut();
    }
    return false;
  }
};
var mainMenuItemInstance;
var MainMenuItem = class _MainMenuItem {
  #itemInternal;
  constructor() {
    this.#itemInternal = new UI.Toolbar.ToolbarMenuButton(
      this.#handleContextMenu.bind(this),
      /* isIconDropdown */
      true,
      /* useSoftMenu */
      true,
      "main-menu",
      "dots-vertical"
    );
    this.#itemInternal.element.classList.add("main-menu");
    this.#itemInternal.setTitle(i18nString(UIStrings.customizeAndControlDevtools));
  }
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!mainMenuItemInstance || forceNew) {
      mainMenuItemInstance = new _MainMenuItem();
    }
    return mainMenuItemInstance;
  }
  item() {
    return this.#itemInternal;
  }
  #handleContextMenu(contextMenu) {
    const dockController = UI.DockController.DockController.instance();
    if (dockController.canDock()) {
      const dockItemElement = document.createElement("div");
      dockItemElement.classList.add("flex-auto", "flex-centered", "location-menu");
      dockItemElement.setAttribute("jslog", `${VisualLogging.item("dock-side").track({ keydown: "ArrowDown|ArrowLeft|ArrowRight" })}`);
      dockItemElement.tabIndex = -1;
      UI.ARIAUtils.setLabel(dockItemElement, UIStrings.dockSide + UIStrings.dockSideNavigation);
      const [toggleDockSideShortcut] = UI.ShortcutRegistry.ShortcutRegistry.instance().shortcutsForAction("main.toggle-dock");
      render(html`
        <span class="dockside-title"
              title=${i18nString(UIStrings.placementOfDevtoolsRelativeToThe, { PH1: toggleDockSideShortcut.title() })}>
          ${i18nString(UIStrings.dockSide)}
        </span>
        <devtools-toolbar @mousedown=${(event) => event.consume()}>
          <devtools-button class="toolbar-button"
                           jslog=${VisualLogging.toggle().track({ click: true }).context("current-dock-state-undock")}
                           title=${i18nString(UIStrings.undockIntoSeparateWindow)}
                           aria-label=${i18nString(UIStrings.undockIntoSeparateWindow)}
                           .iconName=${"dock-window"}
                           .toggled=${dockController.dockSide() === "undocked"}
                           .toggledIconName=${"dock-window"}
                           .toggleType=${"primary-toggle"}
                           .variant=${"icon_toggle"}
                           @click=${setDockSide.bind(
        null,
        "undocked"
        /* UI.DockController.DockState.UNDOCKED */
      )}></devtools-button>
          <devtools-button class="toolbar-button"
                           jslog=${VisualLogging.toggle().track({ click: true }).context("current-dock-state-left")}
                           title=${i18nString(UIStrings.dockToLeft)}
                           aria-label=${i18nString(UIStrings.dockToLeft)}
                           .iconName=${"dock-left"}
                           .toggled=${dockController.dockSide() === "left"}
                           .toggledIconName=${"dock-left"}
                           .toggleType=${"primary-toggle"}
                           .variant=${"icon_toggle"}
                           @click=${setDockSide.bind(
        null,
        "left"
        /* UI.DockController.DockState.LEFT */
      )}></devtools-button>
          <devtools-button class="toolbar-button"
                           jslog=${VisualLogging.toggle().track({ click: true }).context("current-dock-state-bottom")}
                           title=${i18nString(UIStrings.dockToBottom)}
                           aria-label=${i18nString(UIStrings.dockToBottom)}
                           .iconName=${"dock-bottom"}
                           .toggled=${dockController.dockSide() === "bottom"}
                           .toggledIconName=${"dock-bottom"}
                           .toggleType=${"primary-toggle"}
                           .variant=${"icon_toggle"}
                           @click=${setDockSide.bind(
        null,
        "bottom"
        /* UI.DockController.DockState.BOTTOM */
      )}></devtools-button>
          <devtools-button class="toolbar-button"
                           jslog=${VisualLogging.toggle().track({ click: true }).context("current-dock-state-right")}
                           title=${i18nString(UIStrings.dockToRight)}
                           aria-label=${i18nString(UIStrings.dockToRight)}
                           .iconName=${"dock-right"}
                           .toggled=${dockController.dockSide() === "right"}
                           .toggledIconName=${"dock-right"}
                           .toggleType=${"primary-toggle"}
                           .variant=${"icon_toggle"}
                           @click=${setDockSide.bind(
        null,
        "right"
        /* UI.DockController.DockState.RIGHT */
      )}></devtools-button>
        </devtools-toolbar>
      `, dockItemElement, { host: this });
      dockItemElement.addEventListener("keydown", (event) => {
        let dir = 0;
        if (event.key === "ArrowLeft") {
          dir = -1;
        } else if (event.key === "ArrowRight") {
          dir = 1;
        } else if (event.key === "ArrowDown") {
          const contextMenuElement = dockItemElement.closest(".soft-context-menu");
          contextMenuElement?.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
          return;
        } else {
          return;
        }
        const buttons = Array.from(dockItemElement.querySelectorAll("devtools-button"));
        let index = buttons.findIndex((button2) => button2.hasFocus());
        index = Platform2.NumberUtilities.clamp(index + dir, 0, buttons.length - 1);
        buttons[index].focus();
        event.consume(true);
      });
      contextMenu.headerSection().appendCustomItem(dockItemElement, "dock-side");
    }
    const button = this.#itemInternal.element;
    function setDockSide(side) {
      void dockController.once(
        "AfterDockSideChanged"
        /* UI.DockController.Events.AFTER_DOCK_SIDE_CHANGED */
      ).then(() => button.focus());
      dockController.setDockSide(side);
      contextMenu.discard();
    }
    if (dockController.dockSide() === "undocked") {
      const mainTarget = SDK2.TargetManager.TargetManager.instance().primaryPageTarget();
      if (mainTarget && mainTarget.type() === SDK2.Target.Type.FRAME) {
        contextMenu.defaultSection().appendAction("inspector-main.focus-debuggee", i18nString(UIStrings.focusDebuggee));
      }
    }
    contextMenu.defaultSection().appendAction("main.toggle-drawer", UI.InspectorView.InspectorView.instance().drawerVisible() ? i18nString(UIStrings.hideConsoleDrawer) : i18nString(UIStrings.showConsoleDrawer));
    contextMenu.appendItemsAtLocation("mainMenu");
    const moreTools = contextMenu.defaultSection().appendSubMenuItem(i18nString(UIStrings.moreTools), false, "more-tools");
    const viewExtensions = UI.ViewManager.getRegisteredViewExtensions();
    viewExtensions.sort((extension1, extension2) => {
      const title1 = extension1.title();
      const title2 = extension2.title();
      return title1.localeCompare(title2);
    });
    for (const viewExtension of viewExtensions) {
      const location = viewExtension.location();
      const persistence = viewExtension.persistence();
      const title = viewExtension.title();
      const id = viewExtension.viewId();
      if (id === "issues-pane") {
        moreTools.defaultSection().appendItem(title, () => {
          Host.userMetrics.issuesPanelOpenedFrom(
            3
            /* Host.UserMetrics.IssueOpener.HAMBURGER_MENU */
          );
          void UI.ViewManager.ViewManager.instance().showView(
            "issues-pane",
            /* userGesture */
            true
          );
        }, { jslogContext: id });
        continue;
      }
      if (persistence !== "closeable") {
        continue;
      }
      if (location !== "drawer-view" && location !== "panel") {
        continue;
      }
      if (viewExtension.isPreviewFeature()) {
        const additionalElement = IconButton.Icon.create("experiment");
        moreTools.defaultSection().appendItem(title, () => {
          void UI.ViewManager.ViewManager.instance().showView(id, true, false);
        }, { disabled: false, additionalElement, jslogContext: id });
        continue;
      }
      moreTools.defaultSection().appendItem(title, () => {
        void UI.ViewManager.ViewManager.instance().showView(id, true, false);
      }, { jslogContext: id });
    }
    const helpSubMenu = contextMenu.footerSection().appendSubMenuItem(i18nString(UIStrings.help), false, "help");
    helpSubMenu.appendItemsAtLocation("mainMenuHelp");
  }
};
var settingsButtonProviderInstance;
var SettingsButtonProvider = class _SettingsButtonProvider {
  #settingsButton;
  constructor() {
    this.#settingsButton = UI.Toolbar.Toolbar.createActionButton("settings.show");
  }
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!settingsButtonProviderInstance || forceNew) {
      settingsButtonProviderInstance = new _SettingsButtonProvider();
    }
    return settingsButtonProviderInstance;
  }
  item() {
    return this.#settingsButton;
  }
};
var PauseListener = class {
  constructor() {
    SDK2.TargetManager.TargetManager.instance().addModelListener(SDK2.DebuggerModel.DebuggerModel, SDK2.DebuggerModel.Events.DebuggerPaused, this.#debuggerPaused, this);
  }
  #debuggerPaused(event) {
    SDK2.TargetManager.TargetManager.instance().removeModelListener(SDK2.DebuggerModel.DebuggerModel, SDK2.DebuggerModel.Events.DebuggerPaused, this.#debuggerPaused, this);
    const debuggerModel = event.data;
    const debuggerPausedDetails = debuggerModel.debuggerPausedDetails();
    UI.Context.Context.instance().setFlavor(SDK2.Target.Target, debuggerModel.target());
    void Common.Revealer.reveal(debuggerPausedDetails);
  }
};
function sendOverProtocol(method, params) {
  return new Promise((resolve, reject) => {
    const sendRawMessage = ProtocolClient.InspectorBackend.test.sendRawMessage;
    if (!sendRawMessage) {
      return reject("Unable to send message to test client");
    }
    sendRawMessage(method, params, (err, ...results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}
var ReloadActionDelegate = class {
  handleAction(_context, actionId) {
    switch (actionId) {
      case "main.debug-reload":
        Components.Reload.reload();
        return true;
    }
    return false;
  }
};
async function handleExternalRequest(input) {
  switch (input.kind) {
    case "PERFORMANCE_RELOAD_GATHER_INSIGHTS": {
      const TimelinePanel = await import("./../../panels/timeline/timeline.js");
      return await TimelinePanel.TimelinePanel.TimelinePanel.handleExternalRecordRequest();
    }
    case "PERFORMANCE_ANALYZE_INSIGHT": {
      const AiAssistance = await import("./../../panels/ai_assistance/ai_assistance.js");
      const AiAssistanceModel = await import("./../../models/ai_assistance/ai_assistance.js");
      const panelInstance = await AiAssistance.AiAssistancePanel.instance();
      return await panelInstance.handleExternalRequest(input.args.prompt, "performance-insight", input.args.insightTitle);
    }
    case "LIVE_STYLE_DEBUGGER": {
      const AiAssistance = await import("./../../panels/ai_assistance/ai_assistance.js");
      const AiAssistanceModel = await import("./../../models/ai_assistance/ai_assistance.js");
      const panelInstance = await AiAssistance.AiAssistancePanel.instance();
      return await panelInstance.handleExternalRequest(input.args.prompt, "freestyler", input.args.selector);
    }
  }
}
globalThis.handleExternalRequest = handleExternalRequest;

// gen/front_end/entrypoints/main/SimpleApp.js
var SimpleApp_exports = {};
__export(SimpleApp_exports, {
  SimpleApp: () => SimpleApp,
  SimpleAppProvider: () => SimpleAppProvider
});
import * as UI2 from "./../../ui/legacy/legacy.js";
var SimpleApp = class {
  presentUI(document2) {
    const rootView = new UI2.RootView.RootView();
    UI2.InspectorView.InspectorView.instance().show(rootView.element);
    rootView.attachToDocument(document2);
    rootView.focus();
  }
};
var simpleAppProviderInstance;
var SimpleAppProvider = class _SimpleAppProvider {
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!simpleAppProviderInstance || forceNew) {
      simpleAppProviderInstance = new _SimpleAppProvider();
    }
    return simpleAppProviderInstance;
  }
  createApp() {
    return new SimpleApp();
  }
};
export {
  ExecutionContextSelector_exports as ExecutionContextSelector,
  MainImpl_exports as MainImpl,
  SimpleApp_exports as SimpleApp
};
//# sourceMappingURL=main.js.map
