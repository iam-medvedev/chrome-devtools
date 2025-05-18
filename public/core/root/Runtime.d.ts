import * as Platform from '../platform/platform.js';
export declare function getRemoteBase(location?: string): {
    base: string;
    version: string;
} | null;
export declare function getPathName(): string;
export declare function isNodeEntry(pathname: string): boolean;
export declare const getChromeVersion: () => string;
export declare class Runtime {
    private constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    } | undefined): Runtime;
    static removeInstance(): void;
    static queryParam(name: string): string | null;
    static setQueryParamForTesting(name: string, value: string): void;
    static isNode(): boolean;
    static setPlatform(platform: string): void;
    static platform(): string;
    static isDescriptorEnabled(descriptor: {
        experiment?: string | null;
        condition?: Condition;
    }): boolean;
    loadLegacyModule(modulePath: string): Promise<unknown>;
}
export interface Option {
    title: string;
    value: string | boolean;
    raw?: boolean;
    text?: string;
}
export declare class ExperimentsSupport {
    #private;
    allConfigurableExperiments(): Experiment[];
    register(experimentName: string, experimentTitle: string, unstable?: boolean, docLink?: string, feedbackLink?: string): void;
    isEnabled(experimentName: string): boolean;
    setEnabled(experimentName: string, enabled: boolean): void;
    enableExperimentsTransiently(experimentNames: string[]): void;
    enableExperimentsByDefault(experimentNames: string[]): void;
    setServerEnabledExperiments(experimentNames: string[]): void;
    enableForTest(experimentName: string): void;
    disableForTest(experimentName: string): void;
    clearForTest(): void;
    cleanUpStaleExperiments(): void;
    private checkExperiment;
}
export declare class Experiment {
    #private;
    name: string;
    title: string;
    unstable: boolean;
    docLink?: Platform.DevToolsPath.UrlString;
    readonly feedbackLink?: Platform.DevToolsPath.UrlString;
    constructor(experiments: ExperimentsSupport, name: string, title: string, unstable: boolean, docLink: Platform.DevToolsPath.UrlString, feedbackLink: Platform.DevToolsPath.UrlString);
    isEnabled(): boolean;
    setEnabled(enabled: boolean): void;
}
export declare const experiments: ExperimentsSupport;
export declare const enum ExperimentName {
    CAPTURE_NODE_CREATION_STACKS = "capture-node-creation-stacks",
    CSS_OVERVIEW = "css-overview",
    LIVE_HEAP_PROFILE = "live-heap-profile",
    ALL = "*",
    PROTOCOL_MONITOR = "protocol-monitor",
    FULL_ACCESSIBILITY_TREE = "full-accessibility-tree",
    HEADER_OVERRIDES = "header-overrides",
    INSTRUMENTATION_BREAKPOINTS = "instrumentation-breakpoints",
    AUTHORED_DEPLOYED_GROUPING = "authored-deployed-grouping",
    JUST_MY_CODE = "just-my-code",
    HIGHLIGHT_ERRORS_ELEMENTS_PANEL = "highlight-errors-elements-panel",
    USE_SOURCE_MAP_SCOPES = "use-source-map-scopes",
    TIMELINE_SHOW_POST_MESSAGE_EVENTS = "timeline-show-postmessage-events",
    TIMELINE_DEBUG_MODE = "timeline-debug-mode",
    TIMELINE_ENHANCED_TRACES = "timeline-enhanced-traces",
    TIMELINE_COMPILED_SOURCES = "timeline-compiled-sources",
    TIMELINE_EXPERIMENTAL_INSIGHTS = "timeline-experimental-insights"
}
export declare enum GenAiEnterprisePolicyValue {
    ALLOW = 0,
    ALLOW_WITHOUT_LOGGING = 1,
    DISABLE = 2
}
export interface AidaAvailability {
    enabled: boolean;
    blockedByAge: boolean;
    blockedByEnterprisePolicy: boolean;
    blockedByGeo: boolean;
    disallowLogging: boolean;
    enterprisePolicyValue: number;
}
type Channel = 'stable' | 'beta' | 'dev' | 'canary';
export interface HostConfigConsoleInsights {
    modelId: string;
    temperature: number;
    enabled: boolean;
}
export declare enum HostConfigFreestylerExecutionMode {
    ALL_SCRIPTS = "ALL_SCRIPTS",
    SIDE_EFFECT_FREE_SCRIPTS_ONLY = "SIDE_EFFECT_FREE_SCRIPTS_ONLY",
    NO_SCRIPTS = "NO_SCRIPTS"
}
export interface HostConfigFreestyler {
    modelId: string;
    temperature: number;
    enabled: boolean;
    userTier: string;
    executionMode?: HostConfigFreestylerExecutionMode;
    patching?: boolean;
    multimodal?: boolean;
    multimodalUploadInput?: boolean;
    functionCalling?: boolean;
}
export interface HostConfigAiAssistanceNetworkAgent {
    modelId: string;
    temperature: number;
    enabled: boolean;
    userTier: string;
}
export interface HostConfigAiAssistancePerformanceAgent {
    modelId: string;
    temperature: number;
    enabled: boolean;
    userTier: string;
    insightsEnabled?: boolean;
}
export interface HostConfigAiAssistanceFileAgent {
    modelId: string;
    temperature: number;
    enabled: boolean;
    userTier: string;
}
/**
 * @see http://go/chrome-devtools:automatic-workspace-folders-design
 */
export interface HostConfigAutomaticFileSystems {
    enabled: boolean;
}
export interface HostConfigVeLogging {
    enabled: boolean;
    testing: boolean;
}
/**
 * @see https://goo.gle/devtools-json-design
 */
export interface HostConfigWellKnown {
    enabled: boolean;
}
export interface HostConfigPrivacyUI {
    enabled: boolean;
}
export interface HostConfigEnableOriginBoundCookies {
    portBindingEnabled: boolean;
    schemeBindingEnabled: boolean;
}
export interface HostConfigAnimationStylesInStylesTab {
    enabled: boolean;
}
export interface HostConfigThirdPartyCookieControls {
    thirdPartyCookieRestrictionEnabled: boolean;
    thirdPartyCookieMetadataEnabled: boolean;
    thirdPartyCookieHeuristicsEnabled: boolean;
    managedBlockThirdPartyCookies: string | boolean;
}
interface CSSValueTracing {
    enabled: boolean;
}
interface AiGeneratedTimelineLabels {
    enabled: boolean;
}
/**
 * The host configuration that we expect from the DevTools back-end.
 *
 * We use `RecursivePartial` here to enforce that DevTools code is able to
 * handle `HostConfig` objects of an unexpected shape. This can happen if
 * the implementation in the Chromium backend is changed without correctly
 * updating the DevTools frontend. Or if remote debugging a different version
 * of Chrome, resulting in the local browser window and the local DevTools
 * window being of different versions, and consequently potentially having
 * differently shaped `HostConfig`s.
 *
 * @see hostConfig
 */
export type HostConfig = Platform.TypeScriptUtilities.RecursivePartial<{
    aidaAvailability: AidaAvailability;
    channel: Channel;
    devToolsConsoleInsights: HostConfigConsoleInsights;
    devToolsFreestyler: HostConfigFreestyler;
    devToolsAiAssistanceNetworkAgent: HostConfigAiAssistanceNetworkAgent;
    devToolsAiAssistanceFileAgent: HostConfigAiAssistanceFileAgent;
    devToolsAiAssistancePerformanceAgent: HostConfigAiAssistancePerformanceAgent;
    devToolsAutomaticFileSystems: HostConfigAutomaticFileSystems;
    devToolsVeLogging: HostConfigVeLogging;
    devToolsWellKnown: HostConfigWellKnown;
    devToolsPrivacyUI: HostConfigPrivacyUI;
    /**
     * OffTheRecord here indicates that the user's profile is either incognito,
     * or guest mode, rather than a "normal" profile.
     */
    isOffTheRecord: boolean;
    devToolsEnableOriginBoundCookies: HostConfigEnableOriginBoundCookies;
    devToolsAnimationStylesInStylesTab: HostConfigAnimationStylesInStylesTab;
    thirdPartyCookieControls: HostConfigThirdPartyCookieControls;
    devToolsCssValueTracing: CSSValueTracing;
    devToolsAiGeneratedTimelineLabels: AiGeneratedTimelineLabels;
}>;
/**
 * The host configuration for this DevTools instance.
 *
 * This is initialized early during app startup and should not be modified
 * afterwards. In some cases it can be necessary to re-request the host
 * configuration from Chrome while DevTools is already running. In these
 * cases, the new host configuration should be reflected here, e.g.:
 *
 * ```js
 * const config = await new Promise<Root.Runtime.HostConfig>(
 *   resolve => InspectorFrontendHostInstance.getHostConfig(resolve));
 * Object.assign(Root.runtime.hostConfig, config);
 * ```
 */
export declare const hostConfig: Platform.TypeScriptUtilities.RecursiveReadonly<HostConfig>;
/**
 * When defining conditions make sure that objects used by the function have
 * been instantiated.
 */
export type Condition = (config?: HostConfig) => boolean;
export declare const conditions: {
    canDock: () => boolean;
};
export {};
