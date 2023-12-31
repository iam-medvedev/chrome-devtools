// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const LOGGING_ATTRIBUTE = 'jslog';
export function needsLogging(element) {
    return element.hasAttribute(LOGGING_ATTRIBUTE);
}
export function getLoggingConfig(element) {
    return parseJsLog(element.getAttribute(LOGGING_ATTRIBUTE) || '');
}
// eslint-disable-next-line rulesdir/const_enum
var VisualElements;
(function (VisualElements) {
    VisualElements[VisualElements["TreeItem"] = 1] = "TreeItem";
    /* 2 used to be AriaAttributes, but free to grab now */
    /* 3 used to be AccessibilityComputedProperties, but free to grab now */
    /* 4 used to be AccessibilityPane, but free to grab now */
    /* 5 used to be AccessibilitySourceOrder, but free to grab now */
    VisualElements[VisualElements["Toggle"] = 6] = "Toggle";
    VisualElements[VisualElements["Tree"] = 7] = "Tree";
    VisualElements[VisualElements["TextField"] = 8] = "TextField";
    VisualElements[VisualElements["ShowAllStyleProperties"] = 9] = "ShowAllStyleProperties";
    VisualElements[VisualElements["Section"] = 10] = "Section";
    VisualElements[VisualElements["StylePropertiesSectionSeparator"] = 11] = "StylePropertiesSectionSeparator";
    /* 12 used to be StylesPane, but free to grab now */
    VisualElements[VisualElements["StylesSelector"] = 13] = "StylesSelector";
    VisualElements[VisualElements["TreeItemExpand"] = 14] = "TreeItemExpand";
    VisualElements[VisualElements["ToggleSubpane"] = 15] = "ToggleSubpane";
    /* 16 used to be ElementClassesPane, but free to grab now */
    /* 17 used to be AddElementClassPrompt, but free to grab now */
    /* 18 used to be ElementStatesPan, but free to grab now */
    /* 19 used to be CssLayersPane, but free to grab now */
    VisualElements[VisualElements["DropDown"] = 20] = "DropDown";
    /* 21 used to be StylesMetricsPane, but free to grab now */
    /* 22 used to be JumpToSource, but free to grab now */
    VisualElements[VisualElements["MetricsBox"] = 23] = "MetricsBox";
    VisualElements[VisualElements["MetricsBoxPart"] = 24] = "MetricsBoxPart";
    /* 25 used to be DOMBreakpointsPane, but free to grab now */
    VisualElements[VisualElements["DOMBreakpoint"] = 26] = "DOMBreakpoint";
    /* 27 used to be ElementPropertiesPane, but free to grab now */
    /* 28 used to be EventListenersPane, but free to grab now */
    VisualElements[VisualElements["Action"] = 29] = "Action";
    VisualElements[VisualElements["FilterDropdown"] = 30] = "FilterDropdown";
    VisualElements[VisualElements["InfoBar"] = 31] = "InfoBar";
    VisualElements[VisualElements["BezierCurveEditor"] = 32] = "BezierCurveEditor";
    VisualElements[VisualElements["BezierEditor"] = 33] = "BezierEditor";
    VisualElements[VisualElements["BezierPresetCategory"] = 34] = "BezierPresetCategory";
    VisualElements[VisualElements["Preview"] = 35] = "Preview";
    VisualElements[VisualElements["ColorCanvas"] = 36] = "ColorCanvas";
    VisualElements[VisualElements["ColorEyeDropper"] = 37] = "ColorEyeDropper";
    VisualElements[VisualElements["ColorPicker"] = 38] = "ColorPicker";
    VisualElements[VisualElements["CopyColor"] = 39] = "CopyColor";
    VisualElements[VisualElements["CssAngleEditor"] = 40] = "CssAngleEditor";
    VisualElements[VisualElements["CssFlexboxEditor"] = 41] = "CssFlexboxEditor";
    VisualElements[VisualElements["CssGridEditor"] = 42] = "CssGridEditor";
    VisualElements[VisualElements["CssShadowEditor"] = 43] = "CssShadowEditor";
    VisualElements[VisualElements["Link"] = 44] = "Link";
    /* 45 used to be Next, but free to grab now */
    VisualElements[VisualElements["Item"] = 46] = "Item";
    VisualElements[VisualElements["PaletteColorShades"] = 47] = "PaletteColorShades";
    VisualElements[VisualElements["Panel"] = 48] = "Panel";
    /* 49 used to be Previous, but free to grab now */
    VisualElements[VisualElements["ShowStyleEditor"] = 50] = "ShowStyleEditor";
    VisualElements[VisualElements["Slider"] = 51] = "Slider";
    VisualElements[VisualElements["CssColorMix"] = 52] = "CssColorMix";
    VisualElements[VisualElements["Value"] = 53] = "Value";
    VisualElements[VisualElements["Key"] = 54] = "Key";
    VisualElements[VisualElements["GridSettings"] = 55] = "GridSettings";
    VisualElements[VisualElements["FlexboxOverlays"] = 56] = "FlexboxOverlays";
    VisualElements[VisualElements["GridOverlays"] = 57] = "GridOverlays";
    /* 58 used to be JumpToElement, but free to grab now */
    VisualElements[VisualElements["PieChart"] = 59] = "PieChart";
    VisualElements[VisualElements["PieChartSlice"] = 60] = "PieChartSlice";
    VisualElements[VisualElements["PieChartTotal"] = 61] = "PieChartTotal";
    VisualElements[VisualElements["ElementsBreadcrumbs"] = 62] = "ElementsBreadcrumbs";
    /* 63 used to be FullAccessibilityTree, but free to grab now */
    /* 64 used to be ToggleDeviceMode, but free to grab now */
    /* 65 used to be ToggleElementSearch, but free to grab now */
    VisualElements[VisualElements["PanelTabHeader"] = 66] = "PanelTabHeader";
    VisualElements[VisualElements["Menu"] = 67] = "Menu";
    /* 68 used to be DeveloperResourcesPanel, but free to grab now */
    VisualElements[VisualElements["TableHeader"] = 69] = "TableHeader";
    VisualElements[VisualElements["TableCell"] = 70] = "TableCell";
    VisualElements[VisualElements["StylesComputedPane"] = 71] = "StylesComputedPane";
    VisualElements[VisualElements["Pane"] = 72] = "Pane";
    VisualElements[VisualElements["ResponsivePresets"] = 73] = "ResponsivePresets";
    VisualElements[VisualElements["DeviceModeRuler"] = 74] = "DeviceModeRuler";
    VisualElements[VisualElements["MediaInspectorView"] = 75] = "MediaInspectorView";
})(VisualElements || (VisualElements = {}));
function resolveVe(ve) {
    return VisualElements[ve] ?? 0;
}
export function parseJsLog(jslog) {
    const components = jslog.replace(/ /g, '').split(';');
    const getComponent = (name) => components.find(c => c.startsWith(name))?.substr(name.length);
    const ve = resolveVe(components[0]);
    if (ve === 0) {
        throw new Error('Unkown VE: ' + jslog);
    }
    const config = { ve };
    const context = getComponent('context:');
    if (context) {
        config.context = context;
    }
    const parent = getComponent('parent:');
    if (parent) {
        config.parent = parent;
    }
    const trackString = getComponent('track:');
    if (trackString) {
        config.track = new Map(trackString.split(',').map(t => t.split(':')));
    }
    return config;
}
export function debugString(config) {
    const components = [VisualElements[config.ve]];
    if (config.context) {
        components.push(`context: ${config.context}`);
    }
    if (config.parent) {
        components.push(`parent: ${config.parent}`);
    }
    if (config.track?.size) {
        components.push(`track: ${[...config.track?.entries()].map(([key, value]) => `${key}${value ? `: ${value}` : ''}`).join(', ')}`);
    }
    return components.join('; ');
}
export function makeConfigStringBuilder(veName) {
    const components = [veName];
    return {
        context: function (value) {
            if (typeof value !== 'undefined') {
                components.push(`context: ${value}`);
            }
            return this;
        },
        parent: function (value) {
            components.push(`parent: ${value}`);
            return this;
        },
        track: function (options) {
            components.push(`track: ${Object.entries(options).map(([key, value]) => value !== true ? `${key}: ${value}` : key).join(', ')}`);
            return this;
        },
        toString: function () {
            return components.join('; ');
        },
    };
}
//# sourceMappingURL=LoggingConfig.js.map