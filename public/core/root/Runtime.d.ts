import * as Platform from '../platform/platform.js';
export declare function getRemoteBase(location?: string): {
    base: string;
    version: string;
} | null;
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
    }): boolean;
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
    CAPTURE_NODE_CREATION_STACKS = "captureNodeCreationStacks",
    CSS_OVERVIEW = "cssOverview",
    LIVE_HEAP_PROFILE = "liveHeapProfile",
    ALL = "*",
    PROTOCOL_MONITOR = "protocolMonitor",
    FULL_ACCESSIBILITY_TREE = "fullAccessibilityTree",
    STYLES_PANE_CSS_CHANGES = "stylesPaneCSSChanges",
    HEADER_OVERRIDES = "headerOverrides",
    INSTRUMENTATION_BREAKPOINTS = "instrumentationBreakpoints",
    AUTHORED_DEPLOYED_GROUPING = "authoredDeployedGrouping",
    IMPORTANT_DOM_PROPERTIES = "importantDOMProperties",
    JUST_MY_CODE = "justMyCode",
    PRELOADING_STATUS_PANEL = "preloadingStatusPanel",
    TIMELINE_AS_CONSOLE_PROFILE_RESULT_PANEL = "timelineAsConsoleProfileResultPanel",
    OUTERMOST_TARGET_SELECTOR = "outermostTargetSelector",
    JS_PROFILER_TEMP_ENABLE = "jsProfilerTemporarilyEnable",
    HIGHLIGHT_ERRORS_ELEMENTS_PANEL = "highlightErrorsElementsPanel",
    SET_ALL_BREAKPOINTS_EAGERLY = "setAllBreakpointsEagerly",
    SELF_XSS_WARNING = "selfXssWarning",
    USE_SOURCE_MAP_SCOPES = "useSourceMapScopes",
    STORAGE_BUCKETS_TREE = "storageBucketsTree",
    NETWORK_PANEL_FILTER_BAR_REDESIGN = "networkPanelFilterBarRedesign",
    TRACK_CONTEXT_MENU = "trackContextMenu",
    AUTOFILL_VIEW = "autofillView",
    INDENTATION_MARKERS_TEMP_DISABLE = "sourcesFrameIndentationMarkersTemporarilyDisable"
}
/**
 * When defining conditions make sure that objects used by the function have
 * been instantiated.
 */
export type Condition = () => boolean;
export declare const conditions: {
    canDock: () => boolean;
};
