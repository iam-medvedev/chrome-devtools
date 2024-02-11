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
var VisualElements;
(function (VisualElements) {
    VisualElements[VisualElements["TreeItem"] = 1] = "TreeItem";
    VisualElements[VisualElements["Close"] = 2] = "Close";
    VisualElements[VisualElements["Counter"] = 3] = "Counter";
    VisualElements[VisualElements["Drawer"] = 4] = "Drawer";
    VisualElements[VisualElements["Resizer"] = 5] = "Resizer";
    VisualElements[VisualElements["Toggle"] = 6] = "Toggle";
    VisualElements[VisualElements["Tree"] = 7] = "Tree";
    VisualElements[VisualElements["TextField"] = 8] = "TextField";
    VisualElements[VisualElements["AnimationClip"] = 9] = "AnimationClip";
    VisualElements[VisualElements["Section"] = 10] = "Section";
    VisualElements[VisualElements["SectionHeader"] = 11] = "SectionHeader";
    VisualElements[VisualElements["Timeline"] = 12] = "Timeline";
    VisualElements[VisualElements["StylesSelector"] = 13] = "StylesSelector";
    VisualElements[VisualElements["Expand"] = 14] = "Expand";
    VisualElements[VisualElements["ToggleSubpane"] = 15] = "ToggleSubpane";
    VisualElements[VisualElements["ControlPoint"] = 16] = "ControlPoint";
    VisualElements[VisualElements["Toolbar"] = 17] = "Toolbar";
    VisualElements[VisualElements["Popover"] = 18] = "Popover";
    VisualElements[VisualElements["BreakpointMarker"] = 19] = "BreakpointMarker";
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
    VisualElements[VisualElements["Canvas"] = 36] = "Canvas";
    VisualElements[VisualElements["ColorEyeDropper"] = 37] = "ColorEyeDropper";
    VisualElements[VisualElements["ColorPicker"] = 38] = "ColorPicker";
    /* 39 used to be CopyColor, but free to grab now */
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
    /* 55 used to be GridSettings, but free to grab now */
    /* 56 used to be FlexboxOverlays, but free to grab now */
    /* 57 used to be GridOverlays, but free to grab now */
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
    /* 71 used to be StylesComputedPane, but free to grab now */
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
export function makeConfigStringBuilder(veName, context) {
    const components = [veName];
    if (typeof context !== 'undefined') {
        components.push(`context: ${context}`);
    }
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