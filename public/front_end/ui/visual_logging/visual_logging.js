// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as LoggingConfig from './LoggingConfig.js';
import * as LoggingState from './LoggingState.js';
export { startLogging, stopLogging } from './LoggingDriver.js';
export { logClick, logImpressions } from './LoggingEvents.js';
export { registerContextProvider, registerParentProvider } from './LoggingState.js';
export function registerLoggable(loggable, config, parent) {
    LoggingState.getOrCreateLoggingState(loggable, LoggingConfig.parseJsLog(config), parent || undefined);
}
export const accessibilityComputedProperties = LoggingConfig.makeConfigStringBuilder.bind(null, 'AccessibilityComputedProperties');
export const accessibilityPane = LoggingConfig.makeConfigStringBuilder.bind(null, 'AccessibilityPane');
export const accessibilitySourceOrder = LoggingConfig.makeConfigStringBuilder.bind(null, 'AccessibilitySourceOrder');
/**
 * Action visual elements are either buttons or menu items that trigger a given action. Use the
 * context to differentiate between different actions, and make sure that buttons and menu items
 * that have the same effect use the same context.
 *
 * Ideally the `action`s context should match the ID of an `UI.ActionRegistration.Action`.
 */
export const action = LoggingConfig.makeConfigStringBuilder.bind(null, 'Action');
export const addElementClassPrompt = LoggingConfig.makeConfigStringBuilder.bind(null, 'AddElementClassPrompt');
export const ariaAttributes = LoggingConfig.makeConfigStringBuilder.bind(null, 'AriaAttributes');
export const bezierCurveEditor = LoggingConfig.makeConfigStringBuilder.bind(null, 'BezierCurveEditor');
export const bezierEditor = LoggingConfig.makeConfigStringBuilder.bind(null, 'BezierEditor');
export const bezierPresetCategory = LoggingConfig.makeConfigStringBuilder.bind(null, 'BezierPresetCategory');
export const colorCanvas = LoggingConfig.makeConfigStringBuilder.bind(null, 'ColorCanvas');
export const colorEyeDropper = LoggingConfig.makeConfigStringBuilder.bind(null, 'ColorEyeDropper');
export const colorPicker = LoggingConfig.makeConfigStringBuilder.bind(null, 'ColorPicker');
export const copyColor = LoggingConfig.makeConfigStringBuilder.bind(null, 'CopyColor');
export const cssAngleEditor = LoggingConfig.makeConfigStringBuilder.bind(null, 'CssAngleEditor');
export const cssColorMix = LoggingConfig.makeConfigStringBuilder.bind(null, 'CssColorMix');
export const cssFlexboxEditor = LoggingConfig.makeConfigStringBuilder.bind(null, 'CssFlexboxEditor');
export const cssGridEditor = LoggingConfig.makeConfigStringBuilder.bind(null, 'CssGridEditor');
export const cssLayersPane = LoggingConfig.makeConfigStringBuilder.bind(null, 'CssLayersPane');
export const cssShadowEditor = LoggingConfig.makeConfigStringBuilder.bind(null, 'CssShadowEditor');
export const domBreakpoint = LoggingConfig.makeConfigStringBuilder.bind(null, 'DOMBreakpoint');
export const dropDown = LoggingConfig.makeConfigStringBuilder.bind(null, 'DropDown');
export const elementsBreadcrumbs = LoggingConfig.makeConfigStringBuilder.bind(null, 'ElementsBreadcrumbs');
export const elementClassesPane = LoggingConfig.makeConfigStringBuilder.bind(null, 'ElementClassesPane');
export const elementPropertiesPane = LoggingConfig.makeConfigStringBuilder.bind(null, 'ElementPropertiesPane');
export const elementStatesPane = LoggingConfig.makeConfigStringBuilder.bind(null, 'ElementStatesPan');
export const elementsTreeOutline = LoggingConfig.makeConfigStringBuilder.bind(null, 'ElementsTreeOutline');
export const eventListenersPane = LoggingConfig.makeConfigStringBuilder.bind(null, 'EventListenersPane');
export const filterDropdown = LoggingConfig.makeConfigStringBuilder.bind(null, 'FilterDropdown');
export const flexboxOverlays = LoggingConfig.makeConfigStringBuilder.bind(null, 'FlexboxOverlays');
export const fullAccessibilityTree = LoggingConfig.makeConfigStringBuilder.bind(null, 'FullAccessibilityTree');
export const gridOverlays = LoggingConfig.makeConfigStringBuilder.bind(null, 'GridOverlays');
export const gridSettings = LoggingConfig.makeConfigStringBuilder.bind(null, 'GridSettings');
export const item = LoggingConfig.makeConfigStringBuilder.bind(null, 'Item');
export const jumpToElement = LoggingConfig.makeConfigStringBuilder.bind(null, 'JumpToElement');
export const jumpToSource = LoggingConfig.makeConfigStringBuilder.bind(null, 'JumpToSource');
export const key = LoggingConfig.makeConfigStringBuilder.bind(null, 'Key');
/**
 * Visual element to denote a hyper link. Use the context to differentiate between various types
 * of hyperlinks.
 */
export const link = LoggingConfig.makeConfigStringBuilder.bind(null, 'Link');
export const menu = LoggingConfig.makeConfigStringBuilder.bind(null, 'Menu');
export const metricsBox = LoggingConfig.makeConfigStringBuilder.bind(null, 'MetricsBox');
export const next = LoggingConfig.makeConfigStringBuilder.bind(null, 'Next');
export const paletteColorShades = LoggingConfig.makeConfigStringBuilder.bind(null, 'PaletteColorShades');
export const pane = LoggingConfig.makeConfigStringBuilder.bind(null, 'Pane');
/**
 * Visual element to denote a top level panel, no matter if that panel is shown in the main
 * view or in the drawer. Use the context to differentiate between different panels, but ensure
 * that the context used here matches the context used for its corresponding {@link panelTabHeader}.
 */
export const panel = LoggingConfig.makeConfigStringBuilder.bind(null, 'Panel');
export const panelTabHeader = LoggingConfig.makeConfigStringBuilder.bind(null, 'PanelTabHeader');
export const preview = LoggingConfig.makeConfigStringBuilder.bind(null, 'Preview');
export const previous = LoggingConfig.makeConfigStringBuilder.bind(null, 'Previous');
export const showAllStyleProperties = LoggingConfig.makeConfigStringBuilder.bind(null, 'ShowAllStyleProperties');
export const showStyleEditor = LoggingConfig.makeConfigStringBuilder.bind(null, 'ShowStyleEditor');
export const slider = LoggingConfig.makeConfigStringBuilder.bind(null, 'Slider');
export const stylesComputedPane = LoggingConfig.makeConfigStringBuilder.bind(null, 'StylesComputedPane');
export const section = LoggingConfig.makeConfigStringBuilder.bind(null, 'Section');
export const stylePropertiesSectionSeparator = LoggingConfig.makeConfigStringBuilder.bind(null, 'StylePropertiesSectionSeparator');
export const stylesMetricsPane = LoggingConfig.makeConfigStringBuilder.bind(null, 'StylesMetricsPane');
export const stylesPane = LoggingConfig.makeConfigStringBuilder.bind(null, 'StylesPane');
export const stylesSelector = LoggingConfig.makeConfigStringBuilder.bind(null, 'StylesSelector');
export const tableCell = LoggingConfig.makeConfigStringBuilder.bind(null, 'TableCell');
export const tableHeader = LoggingConfig.makeConfigStringBuilder.bind(null, 'TableHeader');
/**
 * Visual element to denote text input fields. Use the context to differentiate between various
 * inputs fields.
 *
 * For text fields that control `Common.Settings.Setting`s, make sure to use the name of the
 * setting as the visual elements' context.
 */
export const textField = LoggingConfig.makeConfigStringBuilder.bind(null, 'TextField');
/**
 * Togglable visual elements are checkboxes, radio buttons, or (binary) combo boxes. Use the
 * context to differentiate between different toggles.
 *
 * For toggles that control `Common.Settings.Setting`s, make sure to use the name of the
 * setting as the toggle context.
 */
export const toggle = LoggingConfig.makeConfigStringBuilder.bind(null, 'Toggle');
export const toggleSubpane = LoggingConfig.makeConfigStringBuilder.bind(null, 'ToggleSubpane');
export const treeItem = LoggingConfig.makeConfigStringBuilder.bind(null, 'TreeItem');
export const treeItemExpand = LoggingConfig.makeConfigStringBuilder.bind(null, 'TreeItemExpand');
export const value = LoggingConfig.makeConfigStringBuilder.bind(null, 'Value');
//# sourceMappingURL=visual_logging.js.map