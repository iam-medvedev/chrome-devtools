export interface LoggingConfig {
    ve: number;
    track?: Map<string, string | undefined>;
    context?: string;
    parent?: string;
}
export declare function needsLogging(element: Element): boolean;
export declare function getLoggingConfig(element: Element): LoggingConfig;
declare enum VisualElements {
    TreeItem = 1,
    AriaAttributes = 2,
    AccessibilityComputedProperties = 3,
    AccessibilityPane = 4,
    AccessibilitySourceOrder = 5,
    Toggle = 6,
    Tree = 7,
    TextField = 8,
    ShowAllStyleProperties = 9,
    Section = 10,
    StylePropertiesSectionSeparator = 11,
    StylesPane = 12,
    StylesSelector = 13,
    TreeItemExpand = 14,
    ToggleSubpane = 15,
    ElementClassesPane = 16,
    AddElementClassPrompt = 17,
    ElementStatesPan = 18,
    CssLayersPane = 19,
    DropDown = 20,
    StylesMetricsPane = 21,
    JumpToSource = 22,
    MetricsBox = 23,
    MetricsBoxPart = 24,
    DOMBreakpoint = 26,
    ElementPropertiesPane = 27,
    EventListenersPane = 28,
    Action = 29,
    FilterDropdown = 30,
    BezierCurveEditor = 32,
    BezierEditor = 33,
    BezierPresetCategory = 34,
    Preview = 35,
    ColorCanvas = 36,
    ColorEyeDropper = 37,
    ColorPicker = 38,
    CopyColor = 39,
    CssAngleEditor = 40,
    CssFlexboxEditor = 41,
    CssGridEditor = 42,
    CssShadowEditor = 43,
    Link = 44,
    Next = 45,
    Item = 46,
    PaletteColorShades = 47,
    Panel = 48,
    Previous = 49,
    ShowStyleEditor = 50,
    Slider = 51,
    CssColorMix = 52,
    Value = 53,
    Key = 54,
    GridSettings = 55,
    FlexboxOverlays = 56,
    GridOverlays = 57,
    JumpToElement = 58,
    PieChart = 59,
    PieChartSlice = 60,
    PieChartTotal = 61,
    ElementsBreadcrumbs = 62,
    PanelTabHeader = 66,
    Menu = 67,
    TableHeader = 69,
    TableCell = 70,
    StylesComputedPane = 71,
    Pane = 72,
    ResponsivePresets = 73,
    DeviceModeRuler = 74,
    MediaInspectorView = 75
}
export type VisualElementName = keyof typeof VisualElements;
export declare function parseJsLog(jslog: string): LoggingConfig;
export declare function debugString(config: LoggingConfig): string;
export interface ConfigStringBuilder {
    /**
     * Specifies an optional context for the visual element. For string contexts
     * the convention is to use kebap case (e.g. `foo-bar`).
     *
     * @param value Optional context, which can be either a string or a number.
     * @returns The builder itself.
     */
    context: (value: string | number | undefined) => ConfigStringBuilder;
    /**
     * Speficies the name of a `ParentProvider` used to lookup the parent visual element.
     *
     * @param value The name of a previously registered `ParentProvider`.
     * @returns The builder itself.
     */
    parent: (value: string) => ConfigStringBuilder;
    /**
     * Specifies which DOM events to track for this visual element.
     *
     * @param options The set of DOM events to track.
     * @returns The builder itself.
     */
    track: (options: {
        click?: boolean;
        dblclick?: boolean;
        hover?: boolean;
        drag?: boolean;
        change?: boolean;
        keydown?: boolean | string;
    }) => ConfigStringBuilder;
    /**
     * Serializes the configuration into a `jslog` string.
     *
     * @returns The serialized string value to put on a DOM element via the `jslog` attribute.
     */
    toString: () => string;
}
export declare function makeConfigStringBuilder(veName: VisualElementName): ConfigStringBuilder;
export {};
