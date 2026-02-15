// gen/front_end/core/sdk/sdk-meta.js
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
var UIStrings = {
  /**
   * @description Title of a setting under the Console category that can be invoked through the Command Menu
   */
  preserveLogUponNavigation: "Preserve log upon navigation",
  /**
   * @description Title of a setting under the Console category that can be invoked through the Command Menu
   */
  doNotPreserveLogUponNavigation: "Do not preserve log upon navigation",
  /**
   * @description Text for pausing the debugger on exceptions
   */
  pauseOnExceptions: "Pause on exceptions",
  /**
   * @description Title of a setting under the Debugger category that can be invoked through the Command Menu
   */
  doNotPauseOnExceptions: "Do not pause on exceptions",
  /**
   * @description Title of a setting under the Debugger category that can be invoked through the Command Menu
   */
  disableJavascript: "Disable JavaScript",
  /**
   * @description Title of a setting under the Debugger category that can be invoked through the Command Menu
   */
  enableJavascript: "Enable JavaScript",
  /**
   * @description Title of a setting under the Debugger category in Settings
   */
  disableAsyncStackTraces: "Disable async stack traces",
  /**
   * @description Title of a setting under the Debugger category that can be invoked through the Command Menu
   */
  doNotCaptureAsyncStackTraces: "Do not capture async stack traces",
  /**
   * @description Title of a setting under the Debugger category that can be invoked through the Command Menu
   */
  captureAsyncStackTraces: "Capture async stack traces",
  /**
   * @description Text of a setting that  turn on the measuring rulers when hover over a target
   */
  showRulersOnHover: "Show rulers on hover",
  /**
   * @description Text of a setting that do turn off the measuring rulers when hover over a target
   */
  doNotShowRulersOnHover: "Do not show rulers on hover",
  /**
   * @description Title of a setting that turns on grid area name labels
   */
  showAreaNames: "Show area names",
  /**
   * @description Title of a setting under the Grid category that turns CSS Grid Area highlighting on
   */
  showGridNamedAreas: "Show grid named areas",
  /**
   * @description Title of a setting under the Grid category that turns CSS Grid Area highlighting off
   */
  doNotShowGridNamedAreas: "Do not show grid named areas",
  /**
   * @description Title of a setting that turns on grid track size labels
   */
  showTrackSizes: "Show track sizes",
  /**
   * @description Title for CSS Grid tooling option
   */
  showGridTrackSizes: "Show grid track sizes",
  /**
   * @description Title for CSS Grid tooling option
   */
  doNotShowGridTrackSizes: "Do not show grid track sizes",
  /**
   * @description Title of a setting that turns on grid extension lines
   */
  extendGridLines: "Extend grid lines",
  /**
   * @description Title of a setting that turns off the grid extension lines
   */
  doNotExtendGridLines: "Do not extend grid lines",
  /**
   * @description Title of a setting that turns on grid line labels
   */
  showLineLabels: "Show line labels",
  /**
   * @description Title of a setting that turns off the grid line labels
   */
  hideLineLabels: "Hide line labels",
  /**
   * @description Title of a setting that turns on grid line number labels
   */
  showLineNumbers: "Show line numbers",
  /**
   * @description Title of a setting that turns on grid line name labels
   */
  showLineNames: "Show line names",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  showPaintFlashingRectangles: "Show paint flashing rectangles",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  hidePaintFlashingRectangles: "Hide paint flashing rectangles",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  showLayoutShiftRegions: "Show layout shift regions",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  hideLayoutShiftRegions: "Hide layout shift regions",
  /**
   * @description Text to highlight the rendering frames for ads
   */
  highlightAdFrames: "Highlight ad frames",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  doNotHighlightAdFrames: "Do not highlight ad frames",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  showLayerBorders: "Show layer borders",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  hideLayerBorders: "Hide layer borders",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  showFramesPerSecondFpsMeter: "Show frames per second (FPS) meter",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  hideFramesPerSecondFpsMeter: "Hide frames per second (FPS) meter",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  showScrollPerformanceBottlenecks: "Show scroll performance bottlenecks",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  hideScrollPerformanceBottlenecks: "Hide scroll performance bottlenecks",
  /**
   * @description Title of a Rendering setting that can be invoked through the Command Menu
   */
  emulateAFocusedPage: "Emulate a focused page",
  /**
   * @description Title of a Rendering setting that can be invoked through the Command Menu
   */
  doNotEmulateAFocusedPage: "Do not emulate a focused page",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  doNotEmulateCssMediaType: "Do not emulate CSS media type",
  /**
   * @description A drop-down menu option to do not emulate css media type
   */
  noEmulation: "No emulation",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  emulateCssPrintMediaType: "Emulate CSS print media type",
  /**
   * @description A drop-down menu option to emulate css print media type
   */
  print: "print",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  emulateCssScreenMediaType: "Emulate CSS screen media type",
  /**
   * @description A drop-down menu option to emulate css screen media type
   */
  screen: "screen",
  /**
   * @description A tag of Emulate CSS screen media type setting that can be searched in the command menu
   */
  query: "query",
  /**
   * @description Title of a setting under the Rendering drawer
   */
  emulateCssMediaType: "Emulate CSS media type",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   * @example {prefers-color-scheme} PH1
   */
  doNotEmulateCss: "Do not emulate CSS {PH1}",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   * @example {prefers-color-scheme: light} PH1
   */
  emulateCss: "Emulate CSS {PH1}",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   * @example {prefers-color-scheme} PH1
   */
  emulateCssMediaFeature: "Emulate CSS media feature {PH1}",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   */
  doNotEmulateAnyVisionDeficiency: "Do not emulate any vision deficiency",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   */
  emulateBlurredVision: "Emulate blurred vision",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   */
  emulateReducedContrast: "Emulate reduced contrast",
  /**
   * @description Name of a vision deficiency that can be emulated via the Rendering drawer
   */
  blurredVision: "Blurred vision",
  /**
   * @description Name of a vision deficiency that can be emulated via the Rendering drawer
   */
  reducedContrast: "Reduced contrast",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   */
  emulateProtanopia: "Emulate protanopia (no red)",
  /**
   * @description Name of a color vision deficiency that can be emulated via the Rendering drawer
   */
  protanopia: "Protanopia (no red)",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   */
  emulateDeuteranopia: "Emulate deuteranopia (no green)",
  /**
   * @description Name of a color vision deficiency that can be emulated via the Rendering drawer
   */
  deuteranopia: "Deuteranopia (no green)",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   */
  emulateTritanopia: "Emulate tritanopia (no blue)",
  /**
   * @description Name of a color vision deficiency that can be emulated via the Rendering drawer
   */
  tritanopia: "Tritanopia (no blue)",
  /**
   * @description Title of a setting under the Rendering drawer that can be invoked through the Command Menu
   */
  emulateAchromatopsia: "Emulate achromatopsia (no color)",
  /**
   * @description Name of a color vision deficiency that can be emulated via the Rendering drawer
   */
  achromatopsia: "Achromatopsia (no color)",
  /**
   * @description Title of a setting under the Rendering drawer
   */
  emulateVisionDeficiencies: "Emulate vision deficiencies",
  /**
   * @description Title of a setting under the Rendering drawer
   */
  emulateOsTextScale: "Emulate OS text scale",
  /**
   * @description Title of a setting under the Rendering category that can be invoked through the Command Menu
   */
  doNotEmulateOsTextScale: "Do not emulate OS text scale",
  /**
   * @description A drop-down menu option to not emulate OS text scale
   */
  osTextScaleEmulationNone: "No emulation",
  /**
   * @description A drop-down menu option to emulate an OS text scale 85%
   */
  osTextScaleEmulation85: "85%",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 100%
   */
  osTextScaleEmulation100: "100% (default)",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 115%
   */
  osTextScaleEmulation115: "115%",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 130%
   */
  osTextScaleEmulation130: "130%",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 150%
   */
  osTextScaleEmulation150: "150%",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 180%
   */
  osTextScaleEmulation180: "180%",
  /**
   * @description A drop-down menu option to emulate an OS text scale of 200%
   */
  osTextScaleEmulation200: "200%",
  /**
   * @description Text that refers to disabling local fonts
   */
  disableLocalFonts: "Disable local fonts",
  /**
   * @description Text that refers to enabling local fonts
   */
  enableLocalFonts: "Enable local fonts",
  /**
   * @description Title of a setting that disables AVIF format
   */
  disableAvifFormat: "Disable `AVIF` format",
  /**
   * @description Title of a setting that enables AVIF format
   */
  enableAvifFormat: "Enable `AVIF` format",
  /**
   * @description Title of a setting that disables WebP format
   */
  disableWebpFormat: "Disable `WebP` format",
  /**
   * @description Title of a setting that enables WebP format
   */
  enableWebpFormat: "Enable `WebP` format",
  /**
   * @description Title of a setting under the Console category in Settings
   */
  customFormatters: "Custom formatters",
  /**
   * @description Title of a setting under the Network category
   */
  networkRequestBlocking: "Network request blocking",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu
   */
  enableNetworkRequestBlocking: "Enable network request blocking",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu
   */
  disableNetworkRequestBlocking: "Disable network request blocking",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu
   */
  enableCache: "Enable cache",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu
   */
  disableCache: "Disable cache while DevTools is open",
  /**
   * @description The name of a checkbox setting in the Rendering tool. This setting
   * emulates that the webpage is in auto dark mode.
   */
  emulateAutoDarkMode: "Emulate auto dark mode",
  /**
   * @description Label of a checkbox in the DevTools settings UI.
   */
  enableRemoteFileLoading: "Allow loading remote file path resources in DevTools",
  /**
   * @description Tooltip text for a setting that controls whether external resource can be loaded in DevTools.
   */
  remoteFileLoadingInfo: "Example resource are source maps. Disabled by default for security reasons.",
  /**
   * @description Tooltip text for a setting that controls the network cache. Disabling the network cache can simulate the network connections of users that are visiting a page for the first time.
   */
  networkCacheExplanation: "Disabling the network cache will simulate a network experience similar to a first time visitor.",
  /**
   * @description Setting under the Sources category to toggle usage of JavaScript source maps.
   */
  javaScriptSourceMaps: "JavaScript source maps",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  enableJavaScriptSourceMaps: "Enable JavaScript source maps",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  disableJavaScriptSourceMaps: "Disable JavaScript source maps",
  /**
   * @description Title of a setting under the Sources category
   */
  cssSourceMaps: "CSS source maps",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  enableCssSourceMaps: "Enable CSS source maps",
  /**
   * @description Title of a setting under the Sources category that can be invoked through the Command Menu
   */
  disableCssSourceMaps: "Disable CSS source maps",
  /**
   * @description Title of a setting under the Console category in Settings
   */
  logXmlhttprequests: "Log XMLHttpRequests"
};
var str_ = i18n.i18n.registerUIStrings("core/sdk/sdk-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
Common.Settings.registerSettingExtension({
  category: "CONSOLE",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.preserveLogUponNavigation),
  settingName: "preserve-console-log",
  settingType: "boolean",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.preserveLogUponNavigation)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.doNotPreserveLogUponNavigation)
    }
  ]
});
Common.Settings.registerSettingExtension({
  category: "DEBUGGER",
  settingName: "pause-on-exception-enabled",
  settingType: "boolean",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.pauseOnExceptions)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.doNotPauseOnExceptions)
    }
  ]
});
Common.Settings.registerSettingExtension({
  settingName: "pause-on-caught-exception",
  settingType: "boolean",
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  settingName: "pause-on-uncaught-exception",
  settingType: "boolean",
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "DEBUGGER",
  title: i18nLazyString(UIStrings.disableJavascript),
  settingName: "java-script-disabled",
  settingType: "boolean",
  storageType: "Session",
  order: 1,
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.disableJavascript)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.enableJavascript)
    }
  ]
});
Common.Settings.registerSettingExtension({
  category: "DEBUGGER",
  title: i18nLazyString(UIStrings.disableAsyncStackTraces),
  settingName: "disable-async-stack-traces",
  settingType: "boolean",
  defaultValue: false,
  order: 2,
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.doNotCaptureAsyncStackTraces)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.captureAsyncStackTraces)
    }
  ]
});
Common.Settings.registerSettingExtension({
  category: "DEBUGGER",
  settingName: "breakpoints-active",
  settingType: "boolean",
  storageType: "Session",
  defaultValue: true
});
Common.Settings.registerSettingExtension({
  category: "ELEMENTS",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.showRulersOnHover),
  settingName: "show-metrics-rulers",
  settingType: "boolean",
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.showRulersOnHover)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.doNotShowRulersOnHover)
    }
  ],
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "GRID",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.showAreaNames),
  settingName: "show-grid-areas",
  settingType: "boolean",
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.showGridNamedAreas)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.doNotShowGridNamedAreas)
    }
  ],
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "GRID",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.showTrackSizes),
  settingName: "show-grid-track-sizes",
  settingType: "boolean",
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.showGridTrackSizes)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.doNotShowGridTrackSizes)
    }
  ],
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "GRID",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.extendGridLines),
  settingName: "extend-grid-lines",
  settingType: "boolean",
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.extendGridLines)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.doNotExtendGridLines)
    }
  ],
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "GRID",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.showLineLabels),
  settingName: "show-grid-line-labels",
  settingType: "enum",
  options: [
    {
      title: i18nLazyString(UIStrings.hideLineLabels),
      text: i18nLazyString(UIStrings.hideLineLabels),
      value: "none"
    },
    {
      title: i18nLazyString(UIStrings.showLineNumbers),
      text: i18nLazyString(UIStrings.showLineNumbers),
      value: "lineNumbers"
    },
    {
      title: i18nLazyString(UIStrings.showLineNames),
      text: i18nLazyString(UIStrings.showLineNames),
      value: "lineNames"
    }
  ],
  defaultValue: "lineNumbers"
});
Common.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "show-paint-rects",
  settingType: "boolean",
  storageType: "Session",
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.showPaintFlashingRectangles)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.hidePaintFlashingRectangles)
    }
  ],
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "show-layout-shift-regions",
  settingType: "boolean",
  storageType: "Session",
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.showLayoutShiftRegions)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.hideLayoutShiftRegions)
    }
  ],
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "show-ad-highlights",
  settingType: "boolean",
  storageType: "Session",
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.highlightAdFrames)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.doNotHighlightAdFrames)
    }
  ],
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "show-debug-borders",
  settingType: "boolean",
  storageType: "Session",
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.showLayerBorders)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.hideLayerBorders)
    }
  ],
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "show-fps-counter",
  settingType: "boolean",
  storageType: "Session",
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.showFramesPerSecondFpsMeter)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.hideFramesPerSecondFpsMeter)
    }
  ],
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "show-scroll-bottleneck-rects",
  settingType: "boolean",
  storageType: "Session",
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.showScrollPerformanceBottlenecks)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.hideScrollPerformanceBottlenecks)
    }
  ],
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "RENDERING",
  title: i18nLazyString(UIStrings.emulateAFocusedPage),
  settingName: "emulate-page-focus",
  settingType: "boolean",
  storageType: "Local",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.emulateAFocusedPage)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.doNotEmulateAFocusedPage)
    }
  ]
});
Common.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "emulated-css-media",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "",
  options: [
    {
      title: i18nLazyString(UIStrings.doNotEmulateCssMediaType),
      text: i18nLazyString(UIStrings.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString(UIStrings.emulateCssPrintMediaType),
      text: i18nLazyString(UIStrings.print),
      value: "print"
    },
    {
      title: i18nLazyString(UIStrings.emulateCssScreenMediaType),
      text: i18nLazyString(UIStrings.screen),
      value: "screen"
    }
  ],
  tags: [
    i18nLazyString(UIStrings.query)
  ],
  title: i18nLazyString(UIStrings.emulateCssMediaType)
});
Common.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "emulated-css-media-feature-prefers-color-scheme",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "",
  options: [
    {
      title: i18nLazyString(UIStrings.doNotEmulateCss, { PH1: "prefers-color-scheme" }),
      text: i18nLazyString(UIStrings.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString(UIStrings.emulateCss, { PH1: "prefers-color-scheme: light" }),
      text: i18n.i18n.lockedLazyString("prefers-color-scheme: light"),
      value: "light"
    },
    {
      title: i18nLazyString(UIStrings.emulateCss, { PH1: "prefers-color-scheme: dark" }),
      text: i18n.i18n.lockedLazyString("prefers-color-scheme: dark"),
      value: "dark"
    }
  ],
  tags: [
    i18nLazyString(UIStrings.query)
  ],
  title: i18nLazyString(UIStrings.emulateCssMediaFeature, { PH1: "prefers-color-scheme" })
});
Common.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "emulated-css-media-feature-forced-colors",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "",
  options: [
    {
      title: i18nLazyString(UIStrings.doNotEmulateCss, { PH1: "forced-colors" }),
      text: i18nLazyString(UIStrings.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString(UIStrings.emulateCss, { PH1: "forced-colors: active" }),
      text: i18n.i18n.lockedLazyString("forced-colors: active"),
      value: "active"
    },
    {
      title: i18nLazyString(UIStrings.emulateCss, { PH1: "forced-colors: none" }),
      text: i18n.i18n.lockedLazyString("forced-colors: none"),
      value: "none"
    }
  ],
  tags: [
    i18nLazyString(UIStrings.query)
  ],
  title: i18nLazyString(UIStrings.emulateCssMediaFeature, { PH1: "forced-colors" })
});
Common.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "emulated-css-media-feature-prefers-reduced-motion",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "",
  options: [
    {
      title: i18nLazyString(UIStrings.doNotEmulateCss, { PH1: "prefers-reduced-motion" }),
      text: i18nLazyString(UIStrings.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString(UIStrings.emulateCss, { PH1: "prefers-reduced-motion: reduce" }),
      text: i18n.i18n.lockedLazyString("prefers-reduced-motion: reduce"),
      value: "reduce"
    }
  ],
  tags: [
    i18nLazyString(UIStrings.query)
  ],
  title: i18nLazyString(UIStrings.emulateCssMediaFeature, { PH1: "prefers-reduced-motion" })
});
Common.Settings.registerSettingExtension({
  settingName: "emulated-css-media-feature-prefers-contrast",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "",
  options: [
    {
      title: i18nLazyString(UIStrings.doNotEmulateCss, { PH1: "prefers-contrast" }),
      text: i18nLazyString(UIStrings.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString(UIStrings.emulateCss, { PH1: "prefers-contrast: more" }),
      text: i18n.i18n.lockedLazyString("prefers-contrast: more"),
      value: "more"
    },
    {
      title: i18nLazyString(UIStrings.emulateCss, { PH1: "prefers-contrast: less" }),
      text: i18n.i18n.lockedLazyString("prefers-contrast: less"),
      value: "less"
    },
    {
      title: i18nLazyString(UIStrings.emulateCss, { PH1: "prefers-contrast: custom" }),
      text: i18n.i18n.lockedLazyString("prefers-contrast: custom"),
      value: "custom"
    }
  ],
  tags: [
    i18nLazyString(UIStrings.query)
  ],
  title: i18nLazyString(UIStrings.emulateCssMediaFeature, { PH1: "prefers-contrast" })
});
Common.Settings.registerSettingExtension({
  settingName: "emulated-css-media-feature-prefers-reduced-data",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "",
  options: [
    {
      title: i18nLazyString(UIStrings.doNotEmulateCss, { PH1: "prefers-reduced-data" }),
      text: i18nLazyString(UIStrings.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString(UIStrings.emulateCss, { PH1: "prefers-reduced-data: reduce" }),
      text: i18n.i18n.lockedLazyString("prefers-reduced-data: reduce"),
      value: "reduce"
    }
  ],
  title: i18nLazyString(UIStrings.emulateCssMediaFeature, { PH1: "prefers-reduced-data" })
});
Common.Settings.registerSettingExtension({
  settingName: "emulated-css-media-feature-prefers-reduced-transparency",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "",
  options: [
    {
      title: i18nLazyString(UIStrings.doNotEmulateCss, { PH1: "prefers-reduced-transparency" }),
      text: i18nLazyString(UIStrings.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString(UIStrings.emulateCss, { PH1: "prefers-reduced-transparency: reduce" }),
      text: i18n.i18n.lockedLazyString("prefers-reduced-transparency: reduce"),
      value: "reduce"
    }
  ],
  title: i18nLazyString(UIStrings.emulateCssMediaFeature, { PH1: "prefers-reduced-transparency" })
});
Common.Settings.registerSettingExtension({
  settingName: "emulated-css-media-feature-color-gamut",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "",
  options: [
    {
      title: i18nLazyString(UIStrings.doNotEmulateCss, { PH1: "color-gamut" }),
      text: i18nLazyString(UIStrings.noEmulation),
      value: ""
    },
    {
      title: i18nLazyString(UIStrings.emulateCss, { PH1: "color-gamut: srgb" }),
      text: i18n.i18n.lockedLazyString("color-gamut: srgb"),
      value: "srgb"
    },
    {
      title: i18nLazyString(UIStrings.emulateCss, { PH1: "color-gamut: p3" }),
      text: i18n.i18n.lockedLazyString("color-gamut: p3"),
      value: "p3"
    },
    {
      title: i18nLazyString(UIStrings.emulateCss, { PH1: "color-gamut: rec2020" }),
      text: i18n.i18n.lockedLazyString("color-gamut: rec2020"),
      value: "rec2020"
    }
  ],
  title: i18nLazyString(UIStrings.emulateCssMediaFeature, { PH1: "color-gamut" })
});
Common.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "emulated-vision-deficiency",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "none",
  options: [
    {
      title: i18nLazyString(UIStrings.doNotEmulateAnyVisionDeficiency),
      text: i18nLazyString(UIStrings.noEmulation),
      value: "none"
    },
    {
      title: i18nLazyString(UIStrings.emulateBlurredVision),
      text: i18nLazyString(UIStrings.blurredVision),
      value: "blurredVision"
    },
    {
      title: i18nLazyString(UIStrings.emulateReducedContrast),
      text: i18nLazyString(UIStrings.reducedContrast),
      value: "reducedContrast"
    },
    {
      title: i18nLazyString(UIStrings.emulateProtanopia),
      text: i18nLazyString(UIStrings.protanopia),
      value: "protanopia"
    },
    {
      title: i18nLazyString(UIStrings.emulateDeuteranopia),
      text: i18nLazyString(UIStrings.deuteranopia),
      value: "deuteranopia"
    },
    {
      title: i18nLazyString(UIStrings.emulateTritanopia),
      text: i18nLazyString(UIStrings.tritanopia),
      value: "tritanopia"
    },
    {
      title: i18nLazyString(UIStrings.emulateAchromatopsia),
      text: i18nLazyString(UIStrings.achromatopsia),
      value: "achromatopsia"
    }
  ],
  tags: [
    i18nLazyString(UIStrings.query)
  ],
  title: i18nLazyString(UIStrings.emulateVisionDeficiencies)
});
Common.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "emulated-os-text-scale",
  settingType: "enum",
  storageType: "Session",
  defaultValue: "",
  options: [
    {
      title: i18nLazyString(UIStrings.doNotEmulateOsTextScale),
      text: i18nLazyString(UIStrings.osTextScaleEmulationNone),
      value: ""
    },
    {
      title: i18nLazyString(UIStrings.osTextScaleEmulation85),
      text: i18nLazyString(UIStrings.osTextScaleEmulation85),
      value: "0.85"
    },
    {
      title: i18nLazyString(UIStrings.osTextScaleEmulation100),
      text: i18nLazyString(UIStrings.osTextScaleEmulation100),
      value: "1"
    },
    {
      title: i18nLazyString(UIStrings.osTextScaleEmulation115),
      text: i18nLazyString(UIStrings.osTextScaleEmulation115),
      value: "1.15"
    },
    {
      title: i18nLazyString(UIStrings.osTextScaleEmulation130),
      text: i18nLazyString(UIStrings.osTextScaleEmulation130),
      value: "1.3"
    },
    {
      title: i18nLazyString(UIStrings.osTextScaleEmulation150),
      text: i18nLazyString(UIStrings.osTextScaleEmulation150),
      value: "1.5"
    },
    {
      title: i18nLazyString(UIStrings.osTextScaleEmulation180),
      text: i18nLazyString(UIStrings.osTextScaleEmulation180),
      value: "1.8"
    },
    {
      title: i18nLazyString(UIStrings.osTextScaleEmulation200),
      text: i18nLazyString(UIStrings.osTextScaleEmulation200),
      value: "2"
    }
  ],
  tags: [
    i18nLazyString(UIStrings.query)
  ],
  title: i18nLazyString(UIStrings.emulateOsTextScale)
});
Common.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "local-fonts-disabled",
  settingType: "boolean",
  storageType: "Session",
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.disableLocalFonts)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.enableLocalFonts)
    }
  ],
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "avif-format-disabled",
  settingType: "boolean",
  storageType: "Session",
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.disableAvifFormat)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.enableAvifFormat)
    }
  ],
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "RENDERING",
  settingName: "webp-format-disabled",
  settingType: "boolean",
  storageType: "Session",
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.disableWebpFormat)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.enableWebpFormat)
    }
  ],
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "CONSOLE",
  title: i18nLazyString(UIStrings.customFormatters),
  settingName: "custom-formatters",
  settingType: "boolean",
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "NETWORK",
  title: i18nLazyString(UIStrings.networkRequestBlocking),
  settingName: "request-blocking-enabled",
  settingType: "boolean",
  storageType: "Local",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.enableNetworkRequestBlocking)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.disableNetworkRequestBlocking)
    }
  ]
});
Common.Settings.registerSettingExtension({
  category: "NETWORK",
  title: i18nLazyString(UIStrings.disableCache),
  settingName: "cache-disabled",
  settingType: "boolean",
  order: 0,
  defaultValue: false,
  userActionCondition: "hasOtherClients",
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.disableCache)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.enableCache)
    }
  ],
  learnMore: {
    tooltip: i18nLazyString(UIStrings.networkCacheExplanation)
  }
});
Common.Settings.registerSettingExtension({
  category: "RENDERING",
  title: i18nLazyString(UIStrings.emulateAutoDarkMode),
  settingName: "emulate-auto-dark-mode",
  settingType: "boolean",
  storageType: "Session",
  defaultValue: false
});
Common.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.enableRemoteFileLoading),
  settingName: "network.enable-remote-file-loading",
  settingType: "boolean",
  defaultValue: false,
  learnMore: {
    tooltip: i18nLazyString(UIStrings.remoteFileLoadingInfo)
  }
});
Common.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.javaScriptSourceMaps),
  settingName: "js-source-maps-enabled",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.enableJavaScriptSourceMaps)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.disableJavaScriptSourceMaps)
    }
  ]
});
Common.Settings.registerSettingExtension({
  category: "SOURCES",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.cssSourceMaps),
  settingName: "css-source-maps-enabled",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.enableCssSourceMaps)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.disableCssSourceMaps)
    }
  ]
});
Common.Settings.registerSettingExtension({
  category: "CONSOLE",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.logXmlhttprequests),
  settingName: "monitoring-xhr-enabled",
  settingType: "boolean",
  defaultValue: false
});

// gen/front_end/models/workspace/workspace-meta.js
import * as Common2 from "./../../core/common/common.js";
Common2.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "skip-stack-frames-pattern",
  settingType: "regex",
  defaultValue: "/node_modules/|^node:"
});
Common2.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "skip-content-scripts",
  settingType: "boolean",
  defaultValue: true
});
Common2.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "automatically-ignore-list-known-third-party-scripts",
  settingType: "boolean",
  defaultValue: true
});
Common2.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "skip-anonymous-scripts",
  settingType: "boolean",
  defaultValue: false
});
Common2.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "enable-ignore-listing",
  settingType: "boolean",
  defaultValue: true
});

// gen/front_end/panels/sensors/sensors-meta.js
import * as Common3 from "./../../core/common/common.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings2 = {
  /**
   * @description Title of the Sensors tool. The sensors tool contains GPS, orientation sensors, touch
   * settings, etc.
   */
  sensors: "Sensors",
  /**
   * @description A tag of Sensors tool that can be searched in the command menu
   */
  geolocation: "geolocation",
  /**
   * @description A tag of Sensors tool that can be searched in the command menu
   */
  timezones: "timezones",
  /**
   * @description Text in Sensors View of the Device Toolbar
   */
  locale: "locale",
  /**
   * @description A tag of Sensors tool that can be searched in the command menu
   */
  locales: "locales",
  /**
   * @description A tag of Sensors tool that can be searched in the command menu
   */
  accelerometer: "accelerometer",
  /**
   * @description A tag of Sensors tool that can be searched in the command menu. Refers to the
   * orientation of a device (e.g. phone) in 3D space, e.g. tilted right/left.
   */
  deviceOrientation: "device orientation",
  /**
   * @description Title of Locations settings. Refers to geographic locations for GPS.
   */
  locations: "Locations",
  /**
   * @description Text for the touch type to simulate on a device. Refers to touch input as opposed to
   * mouse input.
   */
  touch: "Touch",
  /**
   * @description Text in Sensors View of the Device Toolbar. Refers to device-based touch input,
   *which means the input type will be 'touch' only if the device normally has touch input e.g. a
   *phone or tablet.
   */
  devicebased: "Device-based",
  /**
   * @description Text in Sensors View of the Device Toolbar. Means that touch input will be forced
   *on, even if the device type e.g. desktop computer does not normally have touch input.
   */
  forceEnabled: "Force enabled",
  /**
   * @description Title of a section option in Sensors tab for idle emulation. This is a command, to
   *emulate the state of the 'Idle Detector'.
   */
  emulateIdleDetectorState: "Emulate Idle Detector state",
  /**
   * @description Title of an option in Sensors tab idle emulation drop-down. Turns off emulation of idle state.
   */
  noIdleEmulation: "No idle emulation",
  /**
   * @description Title of an option in Sensors tab idle emulation drop-down.
   */
  userActiveScreenUnlocked: "User active, screen unlocked",
  /**
   * @description Title of an option in Sensors tab idle emulation drop-down.
   */
  userActiveScreenLocked: "User active, screen locked",
  /**
   * @description Title of an option in Sensors tab idle emulation drop-down.
   */
  userIdleScreenUnlocked: "User idle, screen unlocked",
  /**
   * @description Title of an option in Sensors tab idle emulation drop-down.
   */
  userIdleScreenLocked: "User idle, screen locked",
  /**
   * @description Command that opens the Sensors view/tool. The sensors tool contains GPS,
   * orientation sensors, touch settings, etc.
   */
  showSensors: "Show Sensors",
  /**
   * @description Command that shows geographic locations.
   */
  showLocations: "Show Locations",
  /**
   * @description Text for the CPU Pressure type to simulate on a device.
   */
  cpuPressure: "CPU Pressure",
  /**
   * @description Title of an option in Sensors tab cpu pressure emulation drop-down. Turns off emulation of cpu pressure state.
   */
  noPressureEmulation: "No override",
  /**
   * @description An option that appears in a drop-down that represents the nominal state.
   */
  nominal: "Nominal",
  /**
   * @description An option that appears in a drop-down that represents the fair state.
   */
  fair: "Fair",
  /**
   * @description An option that appears in a drop-down that represents the serious state.
   */
  serious: "Serious",
  /**
   * @description An option that appears in a drop-down that represents the critical state.
   */
  critical: "Critical"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/sensors/sensors-meta.ts", UIStrings2);
var i18nLazyString2 = i18n3.i18n.getLazilyComputedLocalizedString.bind(void 0, str_2);
var loadedSensorsModule;
async function loadEmulationModule() {
  if (!loadedSensorsModule) {
    loadedSensorsModule = await import("./../../panels/sensors/sensors.js");
  }
  return loadedSensorsModule;
}
UI.ViewManager.registerViewExtension({
  location: "drawer-view",
  commandPrompt: i18nLazyString2(UIStrings2.showSensors),
  title: i18nLazyString2(UIStrings2.sensors),
  id: "sensors",
  persistence: "closeable",
  order: 100,
  async loadView() {
    const Sensors = await loadEmulationModule();
    return new Sensors.SensorsView.SensorsView();
  },
  tags: [
    i18nLazyString2(UIStrings2.geolocation),
    i18nLazyString2(UIStrings2.timezones),
    i18nLazyString2(UIStrings2.locale),
    i18nLazyString2(UIStrings2.locales),
    i18nLazyString2(UIStrings2.accelerometer),
    i18nLazyString2(UIStrings2.deviceOrientation)
  ]
});
UI.ViewManager.registerViewExtension({
  location: "settings-view",
  id: "emulation-locations",
  commandPrompt: i18nLazyString2(UIStrings2.showLocations),
  title: i18nLazyString2(UIStrings2.locations),
  order: 40,
  async loadView() {
    const Sensors = await loadEmulationModule();
    return new Sensors.LocationsSettingsTab.LocationsSettingsTab();
  },
  settings: [
    "emulation.locations"
  ],
  iconName: "location-on"
});
Common3.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "emulation.locations",
  settingType: "array",
  // TODO(crbug.com/1136655): http://crrev.com/c/2666426 regressed localization of city titles.
  // These titles should be localized since they are displayed to users.
  defaultValue: [
    {
      title: "Berlin",
      lat: 52.520007,
      long: 13.404954,
      timezoneId: "Europe/Berlin",
      locale: "de-DE",
      accuracy: 150
    },
    {
      title: "London",
      lat: 51.507351,
      long: -0.127758,
      timezoneId: "Europe/London",
      locale: "en-GB",
      accuracy: 150
    },
    {
      title: "Moscow",
      lat: 55.755826,
      long: 37.6173,
      timezoneId: "Europe/Moscow",
      locale: "ru-RU",
      accuracy: 150
    },
    {
      title: "Mountain View",
      lat: 37.386052,
      long: -122.083851,
      timezoneId: "America/Los_Angeles",
      locale: "en-US",
      accuracy: 150
    },
    {
      title: "Mumbai",
      lat: 19.075984,
      long: 72.877656,
      timezoneId: "Asia/Kolkata",
      locale: "mr-IN",
      accuracy: 150
    },
    {
      title: "San Francisco",
      lat: 37.774929,
      long: -122.419416,
      timezoneId: "America/Los_Angeles",
      locale: "en-US",
      accuracy: 150
    },
    {
      title: "Shanghai",
      lat: 31.230416,
      long: 121.473701,
      timezoneId: "Asia/Shanghai",
      locale: "zh-Hans-CN",
      accuracy: 150
    },
    {
      title: "S\xE3o Paulo",
      lat: -23.55052,
      long: -46.633309,
      timezoneId: "America/Sao_Paulo",
      locale: "pt-BR",
      accuracy: 150
    },
    {
      title: "Tokyo",
      lat: 35.689487,
      long: 139.691706,
      timezoneId: "Asia/Tokyo",
      locale: "ja-JP",
      accuracy: 150
    }
  ]
});
Common3.Settings.registerSettingExtension({
  title: i18nLazyString2(UIStrings2.cpuPressure),
  reloadRequired: true,
  settingName: "emulation.cpu-pressure",
  settingType: "enum",
  defaultValue: "none",
  options: [
    {
      value: "none",
      title: i18nLazyString2(UIStrings2.noPressureEmulation),
      text: i18nLazyString2(UIStrings2.noPressureEmulation)
    },
    {
      value: "nominal",
      title: i18nLazyString2(UIStrings2.nominal),
      text: i18nLazyString2(UIStrings2.nominal)
    },
    {
      value: "fair",
      title: i18nLazyString2(UIStrings2.fair),
      text: i18nLazyString2(UIStrings2.fair)
    },
    {
      value: "serious",
      title: i18nLazyString2(UIStrings2.serious),
      text: i18nLazyString2(UIStrings2.serious)
    },
    {
      value: "critical",
      title: i18nLazyString2(UIStrings2.critical),
      text: i18nLazyString2(UIStrings2.critical)
    }
  ]
});
Common3.Settings.registerSettingExtension({
  title: i18nLazyString2(UIStrings2.touch),
  reloadRequired: true,
  settingName: "emulation.touch",
  settingType: "enum",
  defaultValue: "none",
  options: [
    {
      value: "none",
      title: i18nLazyString2(UIStrings2.devicebased),
      text: i18nLazyString2(UIStrings2.devicebased)
    },
    {
      value: "force",
      title: i18nLazyString2(UIStrings2.forceEnabled),
      text: i18nLazyString2(UIStrings2.forceEnabled)
    }
  ]
});
Common3.Settings.registerSettingExtension({
  title: i18nLazyString2(UIStrings2.emulateIdleDetectorState),
  settingName: "emulation.idle-detection",
  settingType: "enum",
  defaultValue: "none",
  options: [
    {
      value: "none",
      title: i18nLazyString2(UIStrings2.noIdleEmulation),
      text: i18nLazyString2(UIStrings2.noIdleEmulation)
    },
    {
      value: '{"isUserActive":true,"isScreenUnlocked":true}',
      title: i18nLazyString2(UIStrings2.userActiveScreenUnlocked),
      text: i18nLazyString2(UIStrings2.userActiveScreenUnlocked)
    },
    {
      value: '{"isUserActive":true,"isScreenUnlocked":false}',
      title: i18nLazyString2(UIStrings2.userActiveScreenLocked),
      text: i18nLazyString2(UIStrings2.userActiveScreenLocked)
    },
    {
      value: '{"isUserActive":false,"isScreenUnlocked":true}',
      title: i18nLazyString2(UIStrings2.userIdleScreenUnlocked),
      text: i18nLazyString2(UIStrings2.userIdleScreenUnlocked)
    },
    {
      value: '{"isUserActive":false,"isScreenUnlocked":false}',
      title: i18nLazyString2(UIStrings2.userIdleScreenLocked),
      text: i18nLazyString2(UIStrings2.userIdleScreenLocked)
    }
  ]
});

// gen/front_end/entrypoints/inspector_main/inspector_main-meta.js
import * as Common4 from "./../../core/common/common.js";
import * as i18n5 from "./../../core/i18n/i18n.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
var UIStrings3 = {
  /**
   * @description Title of the Rendering tool. The rendering tool is a collection of settings that
   * lets the user debug the rendering (i.e. how the website is drawn onto the screen) of the
   * website.
   * https://developer.chrome.com/docs/devtools/evaluate-performance/reference#rendering
   */
  rendering: "Rendering",
  /**
   * @description Command for showing the 'Rendering' tool
   */
  showRendering: "Show Rendering",
  /**
   * @description Command Menu search query that points to the Rendering tool. This refers to the
   * process of drawing pixels onto the screen (called painting).
   */
  paint: "paint",
  /**
   * @description Command Menu search query that points to the Rendering tool. Layout is a phase of
   * rendering a website where the browser calculates where different elements in the website will go
   * on the screen.
   */
  layout: "layout",
  /**
   * @description Command Menu search query that points to the Rendering tool. 'fps' is an acronym
   * for 'Frames per second'. It is in lowercase here because the search box the user will type this
   * into is case-insensitive. If there is an equivalent acronym/shortening in the target language
   * then a translation would be appropriate, otherwise it can be left in English.
   */
  fps: "fps",
  /**
   * @description Command Menu search query that points to the Rendering tool.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_types. This is something the user
   * might type in to search for the setting to change the CSS media type.
   */
  cssMediaType: "CSS media type",
  /**
   * @description Command Menu search query that points to the Rendering tool.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_features This is something the
   * user might type in to search for the setting to change the value of various CSS media features.
   */
  cssMediaFeature: "CSS media feature",
  /**
   * @description Command Menu search query that points to the Rendering tool. Possible search term
   * when the user wants to find settings related to visual impairment e.g. blurry vision, blindness.
   */
  visionDeficiency: "vision deficiency",
  /**
   * @description Command Menu search query that points to the Rendering tool. Possible search term
   * when the user wants to find settings related to color vision deficiency/color blindness.
   */
  colorVisionDeficiency: "color vision deficiency",
  /**
   * @description Title of an action that reloads the inspected page.
   */
  reloadPage: "Reload page",
  /**
   * @description Title of an action that 'hard' reloads the inspected page. A hard reload also
   * clears the browser's cache, forcing it to reload the most recent version of the page.
   */
  hardReloadPage: "Hard reload page",
  /**
   * @description Title of a setting under the Network category in Settings. All ads on the site will
   * be blocked (the setting is forced on).
   */
  forceAdBlocking: "Force ad blocking on this site",
  /**
   * @description A command available in the command menu to block all ads on the current site.
   */
  blockAds: "Block ads on this site",
  /**
   * @description A command available in the command menu to disable ad blocking on the current site.
   */
  showAds: "Show ads on this site, if allowed",
  /**
   * @description A command available in the command menu to automatically open DevTools when
   * webpages create new popup windows.
   */
  autoOpenDevTools: "Auto-open DevTools for popups",
  /**
   * @description A command available in the command menu to stop automatically opening DevTools when
   * webpages create new popup windows.
   */
  doNotAutoOpen: "Do not auto-open DevTools for popups",
  /**
   * @description Title of a setting under the Appearance category in Settings. When the webpage is
   * paused by devtools, an overlay is shown on top of the page to indicate that it is paused. The
   * overlay is a pause/unpause button and some text, which appears on top of the paused page. This
   * setting turns off this overlay.
   */
  disablePaused: "Disable paused state overlay",
  /**
   * @description Title of an action that toggle
   * "forces CSS prefers-color-scheme" color
   */
  toggleCssPrefersColorSchemeMedia: "Toggle CSS media feature prefers-color-scheme"
};
var str_3 = i18n5.i18n.registerUIStrings("entrypoints/inspector_main/inspector_main-meta.ts", UIStrings3);
var i18nLazyString3 = i18n5.i18n.getLazilyComputedLocalizedString.bind(void 0, str_3);
var loadedInspectorMainModule;
async function loadInspectorMainModule() {
  if (!loadedInspectorMainModule) {
    loadedInspectorMainModule = await import("./../inspector_main/inspector_main.js");
  }
  return loadedInspectorMainModule;
}
UI2.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "rendering",
  title: i18nLazyString3(UIStrings3.rendering),
  commandPrompt: i18nLazyString3(UIStrings3.showRendering),
  persistence: "closeable",
  order: 50,
  async loadView() {
    const InspectorMain = await loadInspectorMainModule();
    return new InspectorMain.RenderingOptions.RenderingOptionsView();
  },
  tags: [
    i18nLazyString3(UIStrings3.paint),
    i18nLazyString3(UIStrings3.layout),
    i18nLazyString3(UIStrings3.fps),
    i18nLazyString3(UIStrings3.cssMediaType),
    i18nLazyString3(UIStrings3.cssMediaFeature),
    i18nLazyString3(UIStrings3.visionDeficiency),
    i18nLazyString3(UIStrings3.colorVisionDeficiency)
  ]
});
UI2.ActionRegistration.registerActionExtension({
  category: "NAVIGATION",
  actionId: "inspector-main.reload",
  async loadActionDelegate() {
    const InspectorMain = await loadInspectorMainModule();
    return new InspectorMain.InspectorMain.ReloadActionDelegate();
  },
  iconClass: "refresh",
  title: i18nLazyString3(UIStrings3.reloadPage),
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+R"
    },
    {
      platform: "windows,linux",
      shortcut: "F5"
    },
    {
      platform: "mac",
      shortcut: "Meta+R"
    }
  ]
});
UI2.ActionRegistration.registerActionExtension({
  category: "NAVIGATION",
  actionId: "inspector-main.hard-reload",
  async loadActionDelegate() {
    const InspectorMain = await loadInspectorMainModule();
    return new InspectorMain.InspectorMain.ReloadActionDelegate();
  },
  title: i18nLazyString3(UIStrings3.hardReloadPage),
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Shift+Ctrl+R"
    },
    {
      platform: "windows,linux",
      shortcut: "Shift+F5"
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+F5"
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+F5"
    },
    {
      platform: "mac",
      shortcut: "Shift+Meta+R"
    }
  ]
});
UI2.ActionRegistration.registerActionExtension({
  actionId: "rendering.toggle-prefers-color-scheme",
  category: "RENDERING",
  title: i18nLazyString3(UIStrings3.toggleCssPrefersColorSchemeMedia),
  async loadActionDelegate() {
    const InspectorMain = await loadInspectorMainModule();
    return new InspectorMain.RenderingOptions.ReloadActionDelegate();
  }
});
Common4.Settings.registerSettingExtension({
  category: "NETWORK",
  title: i18nLazyString3(UIStrings3.forceAdBlocking),
  settingName: "network.ad-blocking-enabled",
  settingType: "boolean",
  storageType: "Session",
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.blockAds)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.showAds)
    }
  ]
});
Common4.Settings.registerSettingExtension({
  category: "GLOBAL",
  storageType: "Synced",
  title: i18nLazyString3(UIStrings3.autoOpenDevTools),
  settingName: "auto-attach-to-created-pages",
  settingType: "boolean",
  order: 2,
  defaultValue: false,
  options: [
    {
      value: true,
      title: i18nLazyString3(UIStrings3.autoOpenDevTools)
    },
    {
      value: false,
      title: i18nLazyString3(UIStrings3.doNotAutoOpen)
    }
  ]
});
Common4.Settings.registerSettingExtension({
  category: "APPEARANCE",
  storageType: "Synced",
  title: i18nLazyString3(UIStrings3.disablePaused),
  settingName: "disable-paused-state-overlay",
  settingType: "boolean",
  defaultValue: false
});
UI2.Toolbar.registerToolbarItem({
  async loadItem() {
    const InspectorMain = await loadInspectorMainModule();
    return InspectorMain.InspectorMain.NodeIndicatorProvider.instance();
  },
  order: 2,
  location: "main-toolbar-left"
});
UI2.Toolbar.registerToolbarItem({
  async loadItem() {
    const InspectorMain = await loadInspectorMainModule();
    return InspectorMain.OutermostTargetSelector.OutermostTargetSelector.instance();
  },
  order: 97,
  location: "main-toolbar-right"
});

// gen/front_end/entrypoints/main/main-meta.js
import * as Common5 from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n7 from "./../../core/i18n/i18n.js";
import * as Root from "./../../core/root/root.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as Workspace from "./../../models/workspace/workspace.js";
import * as Components from "./../../ui/legacy/components/utils/utils.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
var UIStrings4 = {
  /**
   * @description Text in Main
   */
  focusDebuggee: "Focus page",
  /**
   * @description Text in the Shortcuts page in settings to explain a keyboard shortcut
   */
  toggleDrawer: "Toggle drawer",
  /**
   * @description Title of an action that navigates to the next panel
   */
  nextPanel: "Next panel",
  /**
   * @description Title of an action that navigates to the previous panel
   */
  previousPanel: "Previous panel",
  /**
   * @description Title of an action that reloads the DevTools
   */
  reloadDevtools: "Reload DevTools",
  /**
   * @description Title of an action in the main tool to toggle dock
   */
  restoreLastDockPosition: "Restore last dock position",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (zoom in)
   */
  zoomIn: "Zoom in",
  /**
   * @description Text in the Shortcuts page to explain a keyboard shortcut (zoom out)
   */
  zoomOut: "Zoom out",
  /**
   * @description Title of an action that reset the zoom level to its default
   */
  resetZoomLevel: "Reset zoom level",
  /**
   * @description Title of an action to search in panel
   */
  searchInPanel: "Search in panel",
  /**
   * @description Title of an action that cancels the current search
   */
  cancelSearch: "Cancel search",
  /**
   * @description Title of an action that finds the next search result
   */
  findNextResult: "Find next result",
  /**
   * @description Title of an action to find the previous search result
   */
  findPreviousResult: "Find previous result",
  /**
   * @description Title of a setting under the Appearance category in Settings
   */
  theme: "Theme:",
  /**
   * @description Title of a setting under the Appearance category that can be invoked through the Command Menu
   */
  switchToBrowserPreferredTheme: "Switch to browser's preferred theme",
  /**
   * @description A drop-down menu option to switch to the same (light or dark) theme as the browser
   */
  autoTheme: "Auto",
  /**
   * @description Title of a setting under the Appearance category that can be invoked through the Command Menu
   */
  switchToLightTheme: "Switch to light theme",
  /**
   * @description A drop-down menu option to switch to light theme
   */
  lightCapital: "Light",
  /**
   * @description Title of a setting under the Appearance category that can be invoked through the Command Menu
   */
  switchToDarkTheme: "Switch to dark theme",
  /**
   * @description A drop-down menu option to switch to dark theme
   */
  darkCapital: "Dark",
  /**
   * @description A tag of theme preference settings that can be searched in the command menu
   */
  darkLower: "dark",
  /**
   * @description A tag of theme preference settings that can be searched in the command menu
   */
  lightLower: "light",
  /**
   * @description Title of a setting under the Appearance category in Settings
   */
  panelLayout: "Panel layout:",
  /**
   * @description Title of a setting under the Appearance category that can be invoked through the Command Menu
   */
  useHorizontalPanelLayout: "Use horizontal panel layout",
  /**
   * @description A drop-down menu option to use horizontal panel layout
   */
  horizontal: "horizontal",
  /**
   * @description Title of a setting under the Appearance category that can be invoked through the Command Menu
   */
  useVerticalPanelLayout: "Use vertical panel layout",
  /**
   * @description A drop-down menu option to use vertical panel layout
   */
  vertical: "vertical",
  /**
   * @description Title of a setting under the Appearance category that can be invoked through the Command Menu
   */
  useAutomaticPanelLayout: "Use automatic panel layout",
  /**
   * @description Text short for automatic
   */
  auto: "auto",
  /**
   * @description Title of a setting under the Appearance category in Settings
   */
  enableCtrlShortcutToSwitchPanels: "Enable Ctrl + 1-9 shortcut to switch panels",
  /**
   * @description (Mac only) Title of a setting under the Appearance category in Settings
   */
  enableShortcutToSwitchPanels: "Enable \u2318 + 1-9 shortcut to switch panels",
  /**
   * @description A drop-down menu option to dock to right
   */
  right: "Right",
  /**
   * @description Text to dock the DevTools to the right of the browser tab
   */
  dockToRight: "Dock to right",
  /**
   * @description A drop-down menu option to dock to bottom
   */
  bottom: "Bottom",
  /**
   * @description Text to dock the DevTools to the bottom of the browser tab
   */
  dockToBottom: "Dock to bottom",
  /**
   * @description A drop-down menu option to dock to left
   */
  left: "Left",
  /**
   * @description Text to dock the DevTools to the left of the browser tab
   */
  dockToLeft: "Dock to left",
  /**
   * @description A drop-down menu option to undock into separate window
   */
  undocked: "Undocked",
  /**
   * @description Text to undock the DevTools
   */
  undockIntoSeparateWindow: "Undock into separate window",
  /**
   * @description Name of the default set of DevTools keyboard shortcuts
   */
  devtoolsDefault: "DevTools (Default)",
  /**
   * @description Title of the language setting that allows users to switch the locale
   * in which DevTools is presented.
   */
  language: "Language:",
  /**
   * @description Users can choose this option when picking the language in which
   * DevTools is presented. Choosing this option means that the DevTools language matches
   * Chrome's UI language.
   */
  browserLanguage: "Browser UI language",
  /**
   * @description Label for a checkbox in the settings UI. Allows developers to opt-in/opt-out
   * of saving settings to their Google account.
   */
  saveSettings: "Save `DevTools` settings to your `Google` account",
  /**
   * @description Label for a checkbox in the settings UI. Allows developers to opt-in/opt-out
   * of receiving Google Developer Program (GDP) badges based on their activity in Chrome DevTools.
   */
  earnBadges: "Earn badges",
  /**
   * @description A command available in the command menu to perform searches, for example in the
   * elements panel, as user types, rather than only when they press Enter.
   */
  searchAsYouTypeSetting: "Search as you type",
  /**
   * @description A command available in the command menu to perform searches, for example in the
   * elements panel, as user types, rather than only when they press Enter.
   */
  searchAsYouTypeCommand: "Enable search as you type",
  /**
   * @description A command available in the command menu to perform searches, for example in the
   * elements panel, only when the user presses Enter.
   */
  searchOnEnterCommand: "Disable search as you type (press Enter to search)",
  /**
   * @description Label of a checkbox under the Appearance category in Settings. Allows developers
   * to opt-in / opt-out of syncing DevTools' color theme with Chrome's color theme.
   */
  matchChromeColorScheme: "Match Chrome color scheme",
  /**
   * @description Tooltip for the learn more link of the Match Chrome color scheme Setting.
   */
  matchChromeColorSchemeDocumentation: "Match DevTools colors to your customized Chrome theme (when enabled)",
  /**
   * @description Command to turn the browser color scheme matching on through the command menu.
   */
  matchChromeColorSchemeCommand: "Match Chrome color scheme",
  /**
   * @description Command to turn the browser color scheme matching off through the command menu.
   */
  dontMatchChromeColorSchemeCommand: "Don't match Chrome color scheme",
  /**
   * @description Command to toggle the drawer orientation.
   */
  toggleDrawerOrientation: "Toggle drawer orientation"
};
var str_4 = i18n7.i18n.registerUIStrings("entrypoints/main/main-meta.ts", UIStrings4);
var i18nLazyString4 = i18n7.i18n.getLazilyComputedLocalizedString.bind(void 0, str_4);
var loadedMainModule;
var loadedInspectorMainModule2;
async function loadMainModule() {
  if (!loadedMainModule) {
    loadedMainModule = await import("./../main/main.js");
  }
  return loadedMainModule;
}
async function loadInspectorMainModule2() {
  if (!loadedInspectorMainModule2) {
    loadedInspectorMainModule2 = await import("./../inspector_main/inspector_main.js");
  }
  return loadedInspectorMainModule2;
}
UI3.ActionRegistration.registerActionExtension({
  category: "DRAWER",
  actionId: "inspector-main.focus-debuggee",
  async loadActionDelegate() {
    const InspectorMain = await loadInspectorMainModule2();
    return new InspectorMain.InspectorMain.FocusDebuggeeActionDelegate();
  },
  order: 100,
  title: i18nLazyString4(UIStrings4.focusDebuggee)
});
UI3.ActionRegistration.registerActionExtension({
  category: "DRAWER",
  actionId: "main.toggle-drawer",
  async loadActionDelegate() {
    return new UI3.InspectorView.ActionDelegate();
  },
  order: 101,
  title: i18nLazyString4(UIStrings4.toggleDrawer),
  bindings: [
    {
      shortcut: "Esc"
    }
  ]
});
UI3.ActionRegistration.registerActionExtension({
  category: "DRAWER",
  actionId: "main.toggle-drawer-orientation",
  async loadActionDelegate() {
    return new UI3.InspectorView.ActionDelegate();
  },
  title: i18nLazyString4(UIStrings4.toggleDrawerOrientation),
  bindings: [
    {
      shortcut: "Shift+Esc"
    }
  ],
  condition: (config) => Boolean(config?.devToolsFlexibleLayout?.verticalDrawerEnabled)
});
UI3.ActionRegistration.registerActionExtension({
  actionId: "main.next-tab",
  category: "GLOBAL",
  title: i18nLazyString4(UIStrings4.nextPanel),
  async loadActionDelegate() {
    return new UI3.InspectorView.ActionDelegate();
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+]"
    },
    {
      platform: "mac",
      shortcut: "Meta+]"
    }
  ]
});
UI3.ActionRegistration.registerActionExtension({
  actionId: "main.previous-tab",
  category: "GLOBAL",
  title: i18nLazyString4(UIStrings4.previousPanel),
  async loadActionDelegate() {
    return new UI3.InspectorView.ActionDelegate();
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+["
    },
    {
      platform: "mac",
      shortcut: "Meta+["
    }
  ]
});
UI3.ActionRegistration.registerActionExtension({
  actionId: "main.debug-reload",
  category: "GLOBAL",
  title: i18nLazyString4(UIStrings4.reloadDevtools),
  async loadActionDelegate() {
    const Main = await loadMainModule();
    return new Main.MainImpl.ReloadActionDelegate();
  },
  bindings: [
    {
      shortcut: "Alt+R"
    }
  ]
});
UI3.ActionRegistration.registerActionExtension({
  category: "GLOBAL",
  title: i18nLazyString4(UIStrings4.restoreLastDockPosition),
  actionId: "main.toggle-dock",
  async loadActionDelegate() {
    return new UI3.DockController.ToggleDockActionDelegate();
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+D"
    },
    {
      platform: "mac",
      shortcut: "Meta+Shift+D"
    }
  ]
});
UI3.ActionRegistration.registerActionExtension({
  actionId: "main.zoom-in",
  category: "GLOBAL",
  title: i18nLazyString4(UIStrings4.zoomIn),
  async loadActionDelegate() {
    const Main = await loadMainModule();
    return new Main.MainImpl.ZoomActionDelegate();
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Plus",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+Plus"
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+NumpadPlus"
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+NumpadPlus"
    },
    {
      platform: "mac",
      shortcut: "Meta+Plus",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+Shift+Plus"
    },
    {
      platform: "mac",
      shortcut: "Meta+NumpadPlus"
    },
    {
      platform: "mac",
      shortcut: "Meta+Shift+NumpadPlus"
    }
  ]
});
UI3.ActionRegistration.registerActionExtension({
  actionId: "main.zoom-out",
  category: "GLOBAL",
  title: i18nLazyString4(UIStrings4.zoomOut),
  async loadActionDelegate() {
    const Main = await loadMainModule();
    return new Main.MainImpl.ZoomActionDelegate();
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Minus",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+Minus"
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+NumpadMinus"
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+NumpadMinus"
    },
    {
      platform: "mac",
      shortcut: "Meta+Minus",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+Shift+Minus"
    },
    {
      platform: "mac",
      shortcut: "Meta+NumpadMinus"
    },
    {
      platform: "mac",
      shortcut: "Meta+Shift+NumpadMinus"
    }
  ]
});
UI3.ActionRegistration.registerActionExtension({
  actionId: "main.zoom-reset",
  category: "GLOBAL",
  title: i18nLazyString4(UIStrings4.resetZoomLevel),
  async loadActionDelegate() {
    const Main = await loadMainModule();
    return new Main.MainImpl.ZoomActionDelegate();
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+0"
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Numpad0"
    },
    {
      platform: "mac",
      shortcut: "Meta+Numpad0"
    },
    {
      platform: "mac",
      shortcut: "Meta+0"
    }
  ]
});
UI3.ActionRegistration.registerActionExtension({
  actionId: "main.search-in-panel.find",
  category: "GLOBAL",
  title: i18nLazyString4(UIStrings4.searchInPanel),
  async loadActionDelegate() {
    const Main = await loadMainModule();
    return new Main.MainImpl.SearchActionDelegate();
  },
  bindings: [
    {
      platform: "windows,linux",
      shortcut: "Ctrl+F",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "Meta+F",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "mac",
      shortcut: "F3"
    }
  ]
});
UI3.ActionRegistration.registerActionExtension({
  actionId: "main.search-in-panel.cancel",
  category: "GLOBAL",
  title: i18nLazyString4(UIStrings4.cancelSearch),
  async loadActionDelegate() {
    const Main = await loadMainModule();
    return new Main.MainImpl.SearchActionDelegate();
  },
  order: 10,
  bindings: [
    {
      shortcut: "Esc"
    }
  ]
});
UI3.ActionRegistration.registerActionExtension({
  actionId: "main.search-in-panel.find-next",
  category: "GLOBAL",
  title: i18nLazyString4(UIStrings4.findNextResult),
  async loadActionDelegate() {
    const Main = await loadMainModule();
    return new Main.MainImpl.SearchActionDelegate();
  },
  bindings: [
    {
      platform: "mac",
      shortcut: "Meta+G",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+G"
    },
    {
      platform: "windows,linux",
      shortcut: "F3",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    }
  ]
});
UI3.ActionRegistration.registerActionExtension({
  actionId: "main.search-in-panel.find-previous",
  category: "GLOBAL",
  title: i18nLazyString4(UIStrings4.findPreviousResult),
  async loadActionDelegate() {
    const Main = await loadMainModule();
    return new Main.MainImpl.SearchActionDelegate();
  },
  bindings: [
    {
      platform: "mac",
      shortcut: "Meta+Shift+G",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    },
    {
      platform: "windows,linux",
      shortcut: "Ctrl+Shift+G"
    },
    {
      platform: "windows,linux",
      shortcut: "Shift+F3",
      keybindSets: [
        "devToolsDefault",
        "vsCode"
      ]
    }
  ]
});
Common5.Settings.registerSettingExtension({
  category: "APPEARANCE",
  storageType: "Synced",
  title: i18nLazyString4(UIStrings4.theme),
  settingName: "ui-theme",
  settingType: "enum",
  defaultValue: "systemPreferred",
  reloadRequired: false,
  options: [
    {
      title: i18nLazyString4(UIStrings4.switchToBrowserPreferredTheme),
      text: i18nLazyString4(UIStrings4.autoTheme),
      value: "systemPreferred"
    },
    {
      title: i18nLazyString4(UIStrings4.switchToLightTheme),
      text: i18nLazyString4(UIStrings4.lightCapital),
      value: "default"
    },
    {
      title: i18nLazyString4(UIStrings4.switchToDarkTheme),
      text: i18nLazyString4(UIStrings4.darkCapital),
      value: "dark"
    }
  ],
  tags: [
    i18nLazyString4(UIStrings4.darkLower),
    i18nLazyString4(UIStrings4.lightLower)
  ]
});
Common5.Settings.registerSettingExtension({
  category: "APPEARANCE",
  storageType: "Synced",
  title: i18nLazyString4(UIStrings4.matchChromeColorScheme),
  settingName: "chrome-theme-colors",
  settingType: "boolean",
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString4(UIStrings4.matchChromeColorSchemeCommand)
    },
    {
      value: false,
      title: i18nLazyString4(UIStrings4.dontMatchChromeColorSchemeCommand)
    }
  ],
  reloadRequired: true,
  learnMore: {
    url: "https://goo.gle/devtools-customize-theme",
    tooltip: i18nLazyString4(UIStrings4.matchChromeColorSchemeDocumentation)
  }
});
Common5.Settings.registerSettingExtension({
  category: "APPEARANCE",
  storageType: "Synced",
  title: i18nLazyString4(UIStrings4.panelLayout),
  settingName: "sidebar-position",
  settingType: "enum",
  defaultValue: "auto",
  options: [
    {
      title: i18nLazyString4(UIStrings4.useHorizontalPanelLayout),
      text: i18nLazyString4(UIStrings4.horizontal),
      value: "bottom"
    },
    {
      title: i18nLazyString4(UIStrings4.useVerticalPanelLayout),
      text: i18nLazyString4(UIStrings4.vertical),
      value: "right"
    },
    {
      title: i18nLazyString4(UIStrings4.useAutomaticPanelLayout),
      text: i18nLazyString4(UIStrings4.auto),
      value: "auto"
    }
  ]
});
Common5.Settings.registerSettingExtension({
  category: "APPEARANCE",
  storageType: "Synced",
  settingName: "language",
  settingType: "enum",
  title: i18nLazyString4(UIStrings4.language),
  defaultValue: "en-US",
  options: [
    {
      value: "browserLanguage",
      title: i18nLazyString4(UIStrings4.browserLanguage),
      text: i18nLazyString4(UIStrings4.browserLanguage)
    },
    ...i18n7.i18n.getAllSupportedDevToolsLocales().sort().map((locale) => createOptionForLocale(locale))
  ],
  reloadRequired: true
});
Common5.Settings.registerSettingExtension({
  category: "APPEARANCE",
  storageType: "Synced",
  title: Host.Platform.platform() === "mac" ? i18nLazyString4(UIStrings4.enableShortcutToSwitchPanels) : i18nLazyString4(UIStrings4.enableCtrlShortcutToSwitchPanels),
  settingName: "shortcut-panel-switch",
  settingType: "boolean",
  defaultValue: false
});
Common5.Settings.registerSettingExtension({
  category: "GLOBAL",
  settingName: "currentDockState",
  settingType: "enum",
  defaultValue: "right",
  options: [
    {
      value: "right",
      text: i18nLazyString4(UIStrings4.right),
      title: i18nLazyString4(UIStrings4.dockToRight)
    },
    {
      value: "bottom",
      text: i18nLazyString4(UIStrings4.bottom),
      title: i18nLazyString4(UIStrings4.dockToBottom)
    },
    {
      value: "left",
      text: i18nLazyString4(UIStrings4.left),
      title: i18nLazyString4(UIStrings4.dockToLeft)
    },
    {
      value: "undocked",
      text: i18nLazyString4(UIStrings4.undocked),
      title: i18nLazyString4(UIStrings4.undockIntoSeparateWindow)
    }
  ]
});
Common5.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "active-keybind-set",
  settingType: "enum",
  defaultValue: "devToolsDefault",
  options: [
    {
      value: "devToolsDefault",
      title: i18nLazyString4(UIStrings4.devtoolsDefault),
      text: i18nLazyString4(UIStrings4.devtoolsDefault)
    },
    {
      value: "vsCode",
      title: i18n7.i18n.lockedLazyString("Visual Studio Code"),
      text: i18n7.i18n.lockedLazyString("Visual Studio Code")
    }
  ]
});
function createLazyLocalizedLocaleSettingText(localeString) {
  return () => i18n7.i18n.getLocalizedLanguageRegion(localeString, i18n7.DevToolsLocale.DevToolsLocale.instance());
}
function createOptionForLocale(localeString) {
  return {
    value: localeString,
    title: createLazyLocalizedLocaleSettingText(localeString),
    text: createLazyLocalizedLocaleSettingText(localeString)
  };
}
Common5.Settings.registerSettingExtension({
  category: "ACCOUNT",
  // This name must be kept in sync with DevToolsSettings::kSyncDevToolsPreferencesFrontendName.
  settingName: "sync-preferences",
  settingType: "boolean",
  title: i18nLazyString4(UIStrings4.saveSettings),
  defaultValue: false,
  reloadRequired: true
});
Common5.Settings.registerSettingExtension({
  category: "ACCOUNT",
  settingName: "receive-gdp-badges",
  settingType: "boolean",
  storageType: "Synced",
  title: i18nLazyString4(UIStrings4.earnBadges),
  defaultValue: false,
  reloadRequired: true
});
Common5.Settings.registerSettingExtension({
  storageType: "Synced",
  settingName: "user-shortcuts",
  settingType: "array",
  defaultValue: []
});
Common5.Settings.registerSettingExtension({
  category: "GLOBAL",
  storageType: "Local",
  title: i18nLazyString4(UIStrings4.searchAsYouTypeSetting),
  settingName: "search-as-you-type",
  settingType: "boolean",
  order: 3,
  defaultValue: true,
  options: [
    {
      value: true,
      title: i18nLazyString4(UIStrings4.searchAsYouTypeCommand)
    },
    {
      value: false,
      title: i18nLazyString4(UIStrings4.searchOnEnterCommand)
    }
  ]
});
UI3.ViewManager.registerLocationResolver({
  name: "drawer-view",
  category: "DRAWER",
  async loadResolver() {
    return UI3.InspectorView.InspectorView.instance();
  }
});
UI3.ViewManager.registerLocationResolver({
  name: "drawer-sidebar",
  category: "DRAWER_SIDEBAR",
  async loadResolver() {
    return UI3.InspectorView.InspectorView.instance();
  }
});
UI3.ViewManager.registerLocationResolver({
  name: "panel",
  category: "PANEL",
  async loadResolver() {
    return UI3.InspectorView.InspectorView.instance();
  }
});
UI3.ContextMenu.registerProvider({
  contextTypes() {
    return [
      Workspace.UISourceCode.UISourceCode,
      SDK.Resource.Resource,
      SDK.NetworkRequest.NetworkRequest
    ];
  },
  async loadProvider() {
    return new Components.Linkifier.ContentProviderContextMenuProvider();
  },
  experiment: void 0
});
UI3.ContextMenu.registerProvider({
  contextTypes() {
    return [
      Node
    ];
  },
  async loadProvider() {
    return new UI3.LinkContextMenuProvider.LinkContextMenuProvider();
  },
  experiment: void 0
});
UI3.ContextMenu.registerProvider({
  contextTypes() {
    return [
      Node
    ];
  },
  async loadProvider() {
    return new Components.Linkifier.LinkContextMenuProvider();
  },
  experiment: void 0
});
UI3.Toolbar.registerToolbarItem({
  separator: true,
  location: "main-toolbar-left",
  order: 100
});
UI3.Toolbar.registerToolbarItem({
  separator: true,
  order: 96,
  location: "main-toolbar-right"
});
UI3.Toolbar.registerToolbarItem({
  condition(config) {
    const isFlagEnabled = config?.devToolsGlobalAiButton?.enabled;
    const isGeoRestricted = config?.aidaAvailability?.blockedByGeo === true;
    const isPolicyRestricted = config?.aidaAvailability?.blockedByEnterprisePolicy === true;
    return Boolean(isFlagEnabled && !isGeoRestricted && !isPolicyRestricted);
  },
  async loadItem() {
    const Main = await loadMainModule();
    return Main.GlobalAiButton.GlobalAiButtonToolbarProvider.instance();
  },
  order: 98,
  location: "main-toolbar-right"
});
UI3.Toolbar.registerToolbarItem({
  async loadItem() {
    const Main = await loadMainModule();
    return Main.MainImpl.SettingsButtonProvider.instance();
  },
  order: 99,
  location: "main-toolbar-right"
});
UI3.Toolbar.registerToolbarItem({
  condition: () => !Root.Runtime.Runtime.isTraceApp(),
  async loadItem() {
    const Main = await loadMainModule();
    return Main.MainImpl.MainMenuItem.instance();
  },
  order: 100,
  location: "main-toolbar-right"
});
UI3.Toolbar.registerToolbarItem({
  async loadItem() {
    return UI3.DockController.CloseButtonProvider.instance();
  },
  order: 101,
  location: "main-toolbar-right"
});
Common5.AppProvider.registerAppProvider({
  async loadAppProvider() {
    const Main = await loadMainModule();
    return Main.SimpleApp.SimpleAppProvider.instance();
  },
  order: 10
});

// gen/front_end/entrypoints/greendev_floaty/FloatyEntrypoint.prebundle.js
import * as Common6 from "./../../core/common/common.js";
import * as Host2 from "./../../core/host/host.js";
import * as i18n9 from "./../../core/i18n/i18n.js";
import * as Root2 from "./../../core/root/root.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as Foundation from "./../../foundation/foundation.js";
import * as AiAssistance from "./../../models/ai_assistance/ai_assistance.js";
import * as UI4 from "./../../ui/legacy/legacy.js";
import * as ThemeSupport from "./../../ui/legacy/theme_support/theme_support.js";
var { AidaClient: AidaClient2 } = Host2.AidaClient;
var { ResponseType } = AiAssistance.AiAgent;
var pendingActivationSessionId = null;
var GreenDevFloaty = class _GreenDevFloaty {
  #chatContainer;
  #textField;
  #playButton;
  #node;
  #agent;
  #nodeContext;
  #backendNodeId;
  #syncChannel;
  #isFloatyWindow;
  constructor(document2) {
    const params = new URLSearchParams(window.location.hash.substring(1));
    this.#backendNodeId = parseInt(params.get("backendNodeId") || "0", 10);
    this.#isFloatyWindow = !!this.#backendNodeId;
    this.#syncChannel = new BroadcastChannel("green-dev-sync");
    this.#syncChannel.onmessage = (event) => {
      this.#onSyncMessage(event.data);
    };
    this.#initFloatyMode(document2);
  }
  #initFloatyMode(doc) {
    this.#chatContainer = doc.getElementById("chat-container");
    this.#textField = doc.querySelector(".green-dev-floaty-dialog-text-field");
    this.#playButton = doc.querySelector(".green-dev-floaty-dialog-play-button");
    this.#playButton?.addEventListener("click", () => {
      if (this.#node) {
        void this.runConversation();
      }
    });
    const contextText = doc.querySelector(".green-dev-floaty-dialog-context-text");
    if (contextText) {
      contextText.style.cursor = "pointer";
      contextText.title = "Click to show in DevTools Panel";
      contextText.addEventListener("click", () => {
        this.#broadcastFullState();
      });
    }
    const learnMoreLink = doc.querySelector(".learn-more-link");
    if (learnMoreLink) {
      learnMoreLink.addEventListener("click", (event) => {
        event.preventDefault();
        Host2.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab("https://developer.chrome.com/docs/devtools/ai-assistance");
      });
    }
    const nodeDescriptionElement = doc.querySelector(".green-dev-floaty-dialog-node-description");
    nodeDescriptionElement?.addEventListener("mousemove", () => {
      if (this.#node) {
        this.#node.highlight();
      }
    });
    nodeDescriptionElement?.addEventListener("mouseleave", () => {
      if (this.#node && this.#backendNodeId) {
        const msg = JSON.stringify({
          id: 9999,
          method: "Overlay.setShowInspectedElementAnchor",
          params: { inspectedElementAnchorConfig: { backendNodeId: this.#backendNodeId } }
        });
        Host2.InspectorFrontendHost.InspectorFrontendHostInstance.sendMessageToBackend(msg);
      }
    });
    this.#textField?.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && this.#node) {
        void this.runConversation();
      }
    });
    this.#textField?.focus();
  }
  #broadcastFullState() {
    const state = {
      type: "full-state",
      messages: this.#getMessages(),
      sessionId: this.#backendNodeId,
      nodeDescription: document.querySelector(".green-dev-floaty-dialog-node-description")?.textContent
    };
    this.#syncChannel.postMessage(state);
  }
  #onSyncMessage(data) {
    if (data.type === "main-window-alive") {
      if (pendingActivationSessionId) {
        const syncChannel = new BroadcastChannel("green-dev-sync");
        syncChannel.postMessage({ type: "activate-panel", sessionId: pendingActivationSessionId });
        syncChannel.close();
      }
    } else if (data.type === "request-session-state") {
      this.#broadcastFullState();
      if (pendingActivationSessionId) {
        this.#syncChannel.postMessage({ type: "select-tab", sessionId: pendingActivationSessionId });
        pendingActivationSessionId = null;
      }
    } else if (data.type === "user-input" && data.sessionId === this.#backendNodeId) {
      if (this.#textField) {
        this.#textField.value = data.text ?? "";
        void this.runConversation();
      }
    } else if (data.type === "restore-floaty" && data.sessionId === this.#backendNodeId) {
      Host2.InspectorFrontendHost.InspectorFrontendHostInstance.bringToFront();
    }
  }
  static instance(opts = { forceNew: null, document }) {
    const { forceNew, document: document2 } = opts;
    if (!greenDevFloatyInstance || forceNew) {
      greenDevFloatyInstance = new _GreenDevFloaty(document2);
    }
    return greenDevFloatyInstance;
  }
  handlePanelRequest = (event) => {
    pendingActivationSessionId = event.data;
    this.#sendActivatePanelMessage(pendingActivationSessionId, 0);
    Host2.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab("magic:open-devtools");
  };
  #maxActivationRetries = 10;
  #activationRetryDelayMs = 200;
  #sendActivatePanelMessage(sessionId, retryCount) {
    if (retryCount >= this.#maxActivationRetries) {
      return;
    }
    const syncChannel = new BroadcastChannel("green-dev-sync");
    syncChannel.postMessage({ type: "activate-panel", sessionId });
    syncChannel.close();
    setTimeout(() => {
      if (pendingActivationSessionId === sessionId) {
        this.#sendActivatePanelMessage(sessionId, retryCount + 1);
      }
    }, this.#activationRetryDelayMs);
  }
  handleRestoreEvent(event) {
    const sessionId = event.data;
    if (!this.#isFloatyWindow) {
      this.#syncChannel.postMessage({ type: "restore-floaty", sessionId });
    } else if (this.#backendNodeId === sessionId) {
      console.error("[GreenDev] Calling bringToFront for session " + sessionId);
      Host2.InspectorFrontendHost.InspectorFrontendHostInstance.bringToFront();
    }
  }
  setNode(node) {
    if (this.#node) {
      this.#node.domModel().overlayModel().removeEventListener("InspectPanelShowRequested", this.handlePanelRequest);
    }
    if (this.#node === node) {
      return;
    }
    this.#node = node;
    this.#node.domModel().overlayModel().addEventListener("InspectPanelShowRequested", this.handlePanelRequest);
    this.#backendNodeId = node.backendNodeId();
    void node.domModel().overlayModel().clearHighlight();
    this.#textField?.focus();
    this.#agent = void 0;
    this.#nodeContext = void 0;
    const nodeDescriptionElement = document.querySelector(".green-dev-floaty-dialog-node-description");
    let description = "";
    if (nodeDescriptionElement) {
      const id = node.getAttribute("id");
      if (id) {
        description = `#${id}`;
      } else {
        const classes = node.classNames().join(".");
        description = node.nodeName().toLowerCase() + (classes ? `.${classes}` : "");
      }
      nodeDescriptionElement.textContent = description;
    }
    this.#syncChannel.postMessage({ type: "node-changed", sessionId: this.#backendNodeId, nodeDescription: description });
    if (this.#backendNodeId) {
      const msg = JSON.stringify({
        id: 9999,
        method: "Overlay.setShowInspectedElementAnchor",
        params: { inspectedElementAnchorConfig: { backendNodeId: this.#backendNodeId } }
      });
      Host2.InspectorFrontendHost.InspectorFrontendHostInstance.sendMessageToBackend(msg);
    }
  }
  #getMessages() {
    const messages = [];
    if (this.#chatContainer) {
      const messageElements = this.#chatContainer.querySelectorAll(".message");
      for (const el of messageElements) {
        const isUser = el.classList.contains("user-message");
        const content = el.querySelector(".message-content")?.textContent || "";
        messages.push({ text: content, isUser });
      }
    }
    return messages;
  }
  #formatError(errorMessage) {
    return `Error: '${errorMessage}' - Protip: to use AI features you need to be signed in.`;
  }
  runConversation = async () => {
    if (!this.#textField || !this.#node) {
      return;
    }
    const query = this.#textField.value || this.#textField.placeholder;
    this.#textField.value = "";
    if (!this.#agent) {
      const aidaClient = new AidaClient2();
      this.#agent = new AiAssistance.StylingAgent.StylingAgent({ aidaClient });
      this.#nodeContext = new AiAssistance.StylingAgent.NodeContext(this.#node);
    }
    this.#addMessageInternal(query, true);
    this.#syncChannel.postMessage({
      type: "new-message",
      text: query,
      isUser: true,
      sessionId: this.#backendNodeId,
      nodeDescription: document.querySelector(".green-dev-floaty-dialog-node-description")?.textContent
    });
    const aiContent = this.#addMessageInternal("Thinking...", false);
    this.#syncChannel.postMessage({
      type: "new-message",
      text: "Thinking...",
      isUser: false,
      sessionId: this.#backendNodeId,
      nodeDescription: document.querySelector(".green-dev-floaty-dialog-node-description")?.textContent
    });
    try {
      if (!this.#nodeContext) {
        throw new Error("Node context not found.");
      }
      for await (const result of this.#agent.run(query, { selected: this.#nodeContext })) {
        switch (result.type) {
          case "answer":
            aiContent.textContent = result.text;
            this.#syncChannel.postMessage({ type: "update-last-message", text: result.text, sessionId: this.#backendNodeId });
            break;
          case "error":
            aiContent.textContent = this.#formatError(result.error);
            this.#syncChannel.postMessage({ type: "update-last-message", text: this.#formatError(result.error), sessionId: this.#backendNodeId });
            break;
          case "side-effect":
            result.confirm(true);
            break;
          default:
            break;
        }
        if (this.#chatContainer) {
          this.#chatContainer.scrollTop = this.#chatContainer.scrollHeight;
        }
      }
    } catch (e) {
      aiContent.textContent = `Exception: ${e instanceof Error ? e.message : String(e)}`;
    }
  };
  #addMessageInternal(text, isUser) {
    const messageElement = document.createElement("div");
    messageElement.className = `message ${isUser ? "user-message" : "ai-message"}`;
    const content = document.createElement("div");
    content.className = "message-content";
    content.textContent = text;
    messageElement.appendChild(content);
    if (this.#chatContainer) {
      this.#chatContainer.appendChild(messageElement);
      this.#chatContainer.scrollTop = this.#chatContainer.scrollHeight;
    }
    return content;
  }
};
var greenDevFloatyInstance;
function safeRegisterExperiment(name, title) {
  try {
    Root2.Runtime.experiments.register(name, title);
  } catch (e) {
    console.error("Unable to register experiment ", name, title, e);
  }
}
async function init() {
  try {
    Root2.Runtime.Runtime.setPlatform(Host2.Platform.platform());
    const [config, prefs] = await Promise.all([
      new Promise((resolve) => Host2.InspectorFrontendHost.InspectorFrontendHostInstance.getHostConfig(resolve)),
      new Promise((resolve) => Host2.InspectorFrontendHost.InspectorFrontendHostInstance.getPreferences(resolve))
    ]);
    Object.assign(Root2.Runtime.hostConfig, config);
    safeRegisterExperiment(Root2.ExperimentNames.ExperimentName.CAPTURE_NODE_CREATION_STACKS, "Capture node creation stacks");
    safeRegisterExperiment(Root2.ExperimentNames.ExperimentName.INSTRUMENTATION_BREAKPOINTS, "Enable instrumentation breakpoints");
    safeRegisterExperiment(Root2.ExperimentNames.ExperimentName.USE_SOURCE_MAP_SCOPES, "Use scope information from source maps");
    safeRegisterExperiment(Root2.ExperimentNames.ExperimentName.LIVE_HEAP_PROFILE, "Live heap profile");
    safeRegisterExperiment(Root2.ExperimentNames.ExperimentName.PROTOCOL_MONITOR, "Protocol Monitor");
    safeRegisterExperiment(Root2.ExperimentNames.ExperimentName.SAMPLING_HEAP_PROFILER_TIMELINE, "Sampling heap profiler timeline");
    safeRegisterExperiment(Root2.ExperimentNames.ExperimentName.APCA, "APCA");
    const hostUnsyncedStorage = {
      register: (name) => Host2.InspectorFrontendHost.InspectorFrontendHostInstance.registerPreference(name, { synced: false }),
      set: Host2.InspectorFrontendHost.InspectorFrontendHostInstance.setPreference,
      get: (name) => new Promise((resolve) => Host2.InspectorFrontendHost.InspectorFrontendHostInstance.getPreference(name, resolve)),
      remove: Host2.InspectorFrontendHost.InspectorFrontendHostInstance.removePreference,
      clear: Host2.InspectorFrontendHost.InspectorFrontendHostInstance.clearPreferences
    };
    const syncedStorage = new Common6.Settings.SettingsStorage(prefs, hostUnsyncedStorage, "");
    const globalStorage = new Common6.Settings.SettingsStorage(prefs, hostUnsyncedStorage, "");
    const localStorage = new Common6.Settings.SettingsStorage(window.localStorage, {
      register(_setting) {
      },
      async get(setting) {
        return window.localStorage.getItem(setting);
      },
      set(setting, value) {
        window.localStorage.setItem(setting, value);
      },
      remove(setting) {
        window.localStorage.removeItem(setting);
      },
      clear: () => window.localStorage.clear()
    }, "");
    Common6.Settings.Settings.instance({
      forceNew: true,
      syncedStorage,
      globalStorage,
      localStorage,
      settingRegistrations: Common6.SettingRegistration.getRegisteredSettings()
    });
    UI4.UIUtils.initializeUIUtils(document);
    ThemeSupport.ThemeSupport.instance({
      forceNew: true,
      setting: Common6.Settings.Settings.instance().moduleSetting("ui-theme")
    });
    UI4.ZoomManager.ZoomManager.instance({ forceNew: true, win: window, frontendHost: Host2.InspectorFrontendHost.InspectorFrontendHostInstance });
    const settingLanguage = Common6.Settings.Settings.instance().moduleSetting("language").get();
    i18n9.DevToolsLocale.DevToolsLocale.instance({
      create: true,
      data: {
        navigatorLanguage: navigator.language,
        settingLanguage,
        lookupClosestDevToolsLocale: i18n9.i18n.lookupClosestSupportedDevToolsLocale
      }
    });
    const universe = new Foundation.Universe.Universe({
      settingsCreationOptions: {
        syncedStorage,
        globalStorage,
        localStorage,
        settingRegistrations: Common6.SettingRegistration.getRegisteredSettings()
      }
    });
    Root2.DevToolsContext.setGlobalInstance(universe.context);
    await i18n9.i18n.fetchAndRegisterLocaleData("en-US");
    Host2.InspectorFrontendHost.InspectorFrontendHostInstance.connectionReady();
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const backendNodeId = parseInt(params.get("backendNodeId") || "0", 10);
    const floaty = GreenDevFloaty.instance({ forceNew: null, document });
    if (backendNodeId) {
      await SDK2.Connections.initMainConnection(async () => {
        const targetManager = SDK2.TargetManager.TargetManager.instance();
        targetManager.createTarget("main", "Main", SDK2.Target.Type.FRAME, null);
        const mainTarget = await new Promise((resolve) => {
          const t = targetManager.primaryPageTarget();
          if (t) {
            resolve(t);
            return;
          }
          const observer = {
            targetAdded: (target) => {
              if (target === targetManager.primaryPageTarget()) {
                targetManager.unobserveTargets(observer);
                resolve(target);
              }
            },
            targetRemoved: () => {
            }
          };
          targetManager.observeTargets(observer);
        });
        if (!mainTarget) {
          return;
        }
        const domModel = mainTarget.model(SDK2.DOMModel.DOMModel);
        if (!domModel) {
          return;
        }
        const overlayModel = mainTarget.model(SDK2.OverlayModel.OverlayModel);
        if (overlayModel) {
          overlayModel.addEventListener("InspectedElementWindowRestored", floaty.handleRestoreEvent, floaty);
        }
        const nodesMap = await domModel.pushNodesByBackendIdsToFrontend(/* @__PURE__ */ new Set([backendNodeId]));
        const node = nodesMap?.get(backendNodeId) || null;
        if (node) {
          floaty.setNode(node);
        }
      }, () => {
      });
    } else {
      const targetManager = SDK2.TargetManager.TargetManager.instance();
      const observer = {
        targetAdded: (target) => {
          if (target.type() === SDK2.Target.Type.FRAME) {
            const overlayModel = target.model(SDK2.OverlayModel.OverlayModel);
            if (overlayModel) {
              overlayModel.addEventListener("InspectedElementWindowRestored", floaty.handleRestoreEvent, floaty);
              overlayModel.addEventListener("InspectPanelShowRequested", floaty.handlePanelRequest);
            }
          }
        },
        targetRemoved: (target) => {
          if (target.type() === SDK2.Target.Type.FRAME) {
            const overlayModel = target.model(SDK2.OverlayModel.OverlayModel);
            if (overlayModel) {
              overlayModel.removeEventListener("InspectedElementWindowRestored", floaty.handleRestoreEvent, floaty);
              overlayModel.removeEventListener("InspectPanelShowRequested", floaty.handlePanelRequest);
            }
          }
        }
      };
      targetManager.observeTargets(observer);
    }
  } catch (err) {
    console.error("[GreenDev] FATAL ERROR during init():", err);
  }
}
void init();
//# sourceMappingURL=FloatyEntrypoint.js.map
