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
    IMPORTANT_DOM_PROPERTIES = "important-dom-properties",
    JUST_MY_CODE = "just-my-code",
    PRELOADING_STATUS_PANEL = "preloading-status-panel",
    TIMELINE_AS_CONSOLE_PROFILE_RESULT_PANEL = "timeline-as-console-profile-result-panel",
    OUTERMOST_TARGET_SELECTOR = "outermost-target-selector",
    HIGHLIGHT_ERRORS_ELEMENTS_PANEL = "highlight-errors-elements-panel",
    SET_ALL_BREAKPOINTS_EAGERLY = "set-all-breakpoints-eagerly",
    USE_SOURCE_MAP_SCOPES = "use-source-map-scopes",
    STORAGE_BUCKETS_TREE = "storage-buckets-tree",
    NETWORK_PANEL_FILTER_BAR_REDESIGN = "network-panel-filter-bar-redesign",
    AUTOFILL_VIEW = "autofill-view",
    INDENTATION_MARKERS_TEMP_DISABLE = "sources-frame-indentation-markers-temporarily-disable",
    TIMELINE_SHOW_POST_MESSAGE_EVENTS = "timeline-show-postmessage-events",
    SAVE_AND_LOAD_TRACE_WITH_ANNOTATIONS = "save-and-load-trace-with-annotations",
    TIMELINE_TRACK_CONFIGURATION = "timeline-track-configuration"
}
/**
 * When defining conditions make sure that objects used by the function have
 * been instantiated.
 */
export type Condition = () => boolean;
export declare const conditions: {
    canDock: () => boolean;
};
