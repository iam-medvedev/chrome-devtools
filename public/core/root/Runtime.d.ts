import * as Platform from '../platform/platform.js';
export declare function getRemoteBase(location?: string): {
    base: string;
    version: string;
} | null;
export declare function getPathName(): string;
export declare class Runtime {
    private constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    } | undefined): Runtime;
    static removeInstance(): void;
    static queryParam(name: string): string | null;
    static setQueryParamForTesting(name: string, value: string): void;
    static experimentsSetting(): {
        [x: string]: boolean;
    };
    static setPlatform(platform: string): void;
    static platform(): string;
    static isDescriptorEnabled(descriptor: {
        experiment: ((string | undefined) | null);
        condition?: Condition;
    }, config?: HostConfig): boolean;
    loadLegacyModule(modulePath: string): Promise<void>;
}
export interface Option {
    title: string;
    value: string | boolean;
    raw?: boolean;
    text?: string;
}
export declare class ExperimentsSupport {
    #private;
    constructor();
    allConfigurableExperiments(): Experiment[];
    private setExperimentsSetting;
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
    STYLES_PANE_CSS_CHANGES = "styles-pane-css-changes",
    HEADER_OVERRIDES = "header-overrides",
    INSTRUMENTATION_BREAKPOINTS = "instrumentation-breakpoints",
    AUTHORED_DEPLOYED_GROUPING = "authored-deployed-grouping",
    JUST_MY_CODE = "just-my-code",
    HIGHLIGHT_ERRORS_ELEMENTS_PANEL = "highlight-errors-elements-panel",
    USE_SOURCE_MAP_SCOPES = "use-source-map-scopes",
    NETWORK_PANEL_FILTER_BAR_REDESIGN = "network-panel-filter-bar-redesign",
    AUTOFILL_VIEW = "autofill-view",
    TIMELINE_SHOW_POST_MESSAGE_EVENTS = "timeline-show-postmessage-events",
    TIMELINE_ANNOTATIONS = "perf-panel-annotations",
    TIMELINE_INSIGHTS = "timeline-rpp-sidebar",
    TIMELINE_DEBUG_MODE = "timeline-debug-mode",
    TIMELINE_OBSERVATIONS = "timeline-observations",
    TIMELINE_ENHANCED_TRACES = "timeline-enhanced-traces",
    TIMELINE_SERVER_TIMINGS = "timeline-server-timings",
    EXTENSION_STORAGE_VIEWER = "extension-storage-viewer",
    FLOATING_ENTRY_POINTS_FOR_AI_ASSISTANCE = "floating-entry-points-for-ai-assistance",
    TIMELINE_EXPERIMENTAL_INSIGHTS = "timeline-experimental-insights",
    TIMELINE_DIM_UNRELATED_EVENTS = "timeline-dim-unrelated-events",
    TIMELINE_ALTERNATIVE_NAVIGATION = "timeline-alternative-navigation"
}
export interface AidaAvailability {
    enabled: boolean;
    blockedByAge: boolean;
    blockedByEnterprisePolicy: boolean;
    blockedByGeo: boolean;
    disallowLogging: boolean;
}
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
}
export interface HostConfigAiAssistanceFileAgent {
    modelId: string;
    temperature: number;
    enabled: boolean;
    userTier: string;
}
export interface HostConfigVeLogging {
    enabled: boolean;
    testing: boolean;
}
export interface HostConfigPrivacyUI {
    enabled: boolean;
}
export type HostConfig = Platform.TypeScriptUtilities.RecursivePartial<{
    aidaAvailability: AidaAvailability;
    devToolsConsoleInsights: HostConfigConsoleInsights;
    devToolsFreestyler: HostConfigFreestyler;
    devToolsExplainThisResourceDogfood: HostConfigAiAssistanceNetworkAgent;
    devToolsAiAssistanceNetworkAgent: HostConfigAiAssistanceNetworkAgent;
    devToolsAiAssistancePerformanceAgentDogfood: HostConfigAiAssistancePerformanceAgent;
    devToolsAiAssistanceFileAgent: HostConfigAiAssistanceFileAgent;
    devToolsAiAssistanceFileAgentDogfood: HostConfigAiAssistanceFileAgent;
    devToolsAiAssistancePerformanceAgent: HostConfigAiAssistancePerformanceAgent;
    devToolsVeLogging: HostConfigVeLogging;
    devToolsPrivacyUI: HostConfigPrivacyUI;
    /**
     * OffTheRecord here indicates that the user's profile is either incognito,
     * or guest mode, rather than a "normal" profile.
     */
    isOffTheRecord: boolean;
}>;
/**
 * When defining conditions make sure that objects used by the function have
 * been instantiated.
 */
export type Condition = (config?: HostConfig) => boolean;
export declare const conditions: {
    canDock: () => boolean;
};
