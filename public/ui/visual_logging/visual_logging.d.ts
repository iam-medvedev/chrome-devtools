import type * as LoggableModule from './Loggable.js';
import * as LoggingConfig from './LoggingConfig.js';
export type Loggable = LoggableModule.Loggable;
export { startLogging, stopLogging, addDocument } from './LoggingDriver.js';
export { logClick, logImpressions } from './LoggingEvents.js';
export { registerContextProvider, registerParentProvider } from './LoggingState.js';
export declare function registerLoggable(loggable: Loggable, config: string, parent: Loggable | null): void;
/**
 * Action visual elements are either buttons or menu items that trigger a given action. Use the
 * context to differentiate between different actions, and make sure that buttons and menu items
 * that have the same effect use the same context.
 *
 * Ideally the `action`s context should match the ID of an `UI.ActionRegistration.Action`.
 */
export declare const action: () => LoggingConfig.ConfigStringBuilder;
export declare const bezierCurveEditor: () => LoggingConfig.ConfigStringBuilder;
export declare const bezierEditor: () => LoggingConfig.ConfigStringBuilder;
export declare const bezierPresetCategory: () => LoggingConfig.ConfigStringBuilder;
export declare const canvas: () => LoggingConfig.ConfigStringBuilder;
export declare const colorEyeDropper: () => LoggingConfig.ConfigStringBuilder;
export declare const colorPicker: () => LoggingConfig.ConfigStringBuilder;
export declare const cssAngleEditor: () => LoggingConfig.ConfigStringBuilder;
export declare const cssColorMix: () => LoggingConfig.ConfigStringBuilder;
export declare const cssFlexboxEditor: () => LoggingConfig.ConfigStringBuilder;
export declare const cssGridEditor: () => LoggingConfig.ConfigStringBuilder;
export declare const cssShadowEditor: () => LoggingConfig.ConfigStringBuilder;
export declare const deviceModeRuler: () => LoggingConfig.ConfigStringBuilder;
export declare const domBreakpoint: () => LoggingConfig.ConfigStringBuilder;
export declare const dropDown: () => LoggingConfig.ConfigStringBuilder;
export declare const elementsBreadcrumbs: () => LoggingConfig.ConfigStringBuilder;
export declare const filterDropdown: () => LoggingConfig.ConfigStringBuilder;
export declare const infoBar: () => LoggingConfig.ConfigStringBuilder;
export declare const item: () => LoggingConfig.ConfigStringBuilder;
export declare const key: () => LoggingConfig.ConfigStringBuilder;
/**
 * Visual element to denote a hyper link. Use the context to differentiate between various types
 * of hyperlinks.
 */
export declare const link: () => LoggingConfig.ConfigStringBuilder;
export declare const mediaInspectorView: () => LoggingConfig.ConfigStringBuilder;
export declare const menu: () => LoggingConfig.ConfigStringBuilder;
export declare const metricsBox: () => LoggingConfig.ConfigStringBuilder;
export declare const paletteColorShades: () => LoggingConfig.ConfigStringBuilder;
export declare const pane: () => LoggingConfig.ConfigStringBuilder;
/**
 * Visual element to denote a top level panel, no matter if that panel is shown in the main
 * view or in the drawer. Use the context to differentiate between different panels, but ensure
 * that the context used here matches the context used for its corresponding {@link panelTabHeader}.
 */
export declare const panel: () => LoggingConfig.ConfigStringBuilder;
export declare const panelTabHeader: () => LoggingConfig.ConfigStringBuilder;
export declare const pieChart: () => LoggingConfig.ConfigStringBuilder;
export declare const pieChartSlice: () => LoggingConfig.ConfigStringBuilder;
export declare const pieChartTotal: () => LoggingConfig.ConfigStringBuilder;
export declare const preview: () => LoggingConfig.ConfigStringBuilder;
export declare const responsivePresets: () => LoggingConfig.ConfigStringBuilder;
export declare const showStyleEditor: () => LoggingConfig.ConfigStringBuilder;
export declare const slider: () => LoggingConfig.ConfigStringBuilder;
export declare const section: () => LoggingConfig.ConfigStringBuilder;
export declare const stylePropertiesSectionSeparator: () => LoggingConfig.ConfigStringBuilder;
export declare const stylesSelector: () => LoggingConfig.ConfigStringBuilder;
export declare const tableCell: () => LoggingConfig.ConfigStringBuilder;
export declare const tableHeader: () => LoggingConfig.ConfigStringBuilder;
/**
 * Visual element to denote text input fields. Use the context to differentiate between various
 * inputs fields.
 *
 * For text fields that control `Common.Settings.Setting`s, make sure to use the name of the
 * setting as the visual elements' context.
 */
export declare const textField: () => LoggingConfig.ConfigStringBuilder;
/**
 * Togglable visual elements are checkboxes, radio buttons, or (binary) combo boxes. Use the
 * context to differentiate between different toggles.
 *
 * For toggles that control `Common.Settings.Setting`s, make sure to use the name of the
 * setting as the toggle context.
 */
export declare const toggle: () => LoggingConfig.ConfigStringBuilder;
export declare const toggleSubpane: () => LoggingConfig.ConfigStringBuilder;
export declare const tree: () => LoggingConfig.ConfigStringBuilder;
export declare const treeItem: () => LoggingConfig.ConfigStringBuilder;
export declare const treeItemExpand: () => LoggingConfig.ConfigStringBuilder;
export declare const value: () => LoggingConfig.ConfigStringBuilder;
