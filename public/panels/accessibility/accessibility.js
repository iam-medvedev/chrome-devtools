var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/accessibility/AccessibilityNodeView.js
var AccessibilityNodeView_exports = {};
__export(AccessibilityNodeView_exports, {
  AXNodeIgnoredReasonTreeElement: () => AXNodeIgnoredReasonTreeElement,
  AXNodePropertyTreeElement: () => AXNodePropertyTreeElement,
  AXNodePropertyTreePropertyElement: () => AXNodePropertyTreePropertyElement,
  AXNodeSubPane: () => AXNodeSubPane,
  AXRelatedNodeElement: () => AXRelatedNodeElement,
  AXRelatedNodeSourceTreeElement: () => AXRelatedNodeSourceTreeElement,
  AXValueSourceTreeElement: () => AXValueSourceTreeElement,
  StringProperties: () => StringProperties,
  TypeStyles: () => TypeStyles
});
import * as Common from "./../../core/common/common.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/accessibility/accessibilityNode.css.js
var accessibilityNode_css_default = `/*
 * Copyright 2017 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.widget.ax-subpane {
  overflow-x: hidden;
  user-select: text;
}

.ax-ignored-info {
  padding: 6px;
}

.ax-ignored-node-pane {
  flex: none;
}

.invalid {
  text-decoration: line-through;
}

span.ax-value-undefined {
  font-style: italic;
}

.ax-value-source-unused {
  opacity: 70%;
}

.ax-value-source-superseded,
.ax-value-source-invalid {
  text-decoration: line-through;
}

.tree-outline dt-icon-label {
  position: relative;
  left: -11px;
}

.tree-outline li {
  display: block;
  overflow-x: hidden;
  align-items: baseline;
}

.tree-outline li::before {
  content: "";
  width: 14px;
  display: inline-block;
  margin-bottom: -2px;
  margin-right: 3px;
}

.tree-outline li.property {
  color: var(--sys-color-on-surface);
}

.tree-outline li.invalid {
  position: relative;
  left: -2px;
}

.tree-outline dt-icon-label + .ax-name {
  margin-left: -11px;
}

.tree-outline li span {
  flex-shrink: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (forced-colors: active) {
  .ax-value-source-unused {
    opacity: 100%;
  }

  .tree-outline-disclosure:hover li.parent::before {
    background-color: ButtonText;
  }
}

/*# sourceURL=${import.meta.resolve("./accessibilityNode.css")} */`;

// gen/front_end/panels/accessibility/AccessibilityStrings.js
var AccessibilityStrings_exports = {};
__export(AccessibilityStrings_exports, {
  AXAttributes: () => AXAttributes,
  AXNativeSourceTypes: () => AXNativeSourceTypes,
  AXSourceTypes: () => AXSourceTypes
});
import * as i18n from "./../../core/i18n/i18n.js";
var UIStrings = {
  /**
   * @description Text to indicate something is not enabled
   */
  disabled: "Disabled",
  /**
   * @description Tooltip text that appears when hovering over the 'Disabled' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  ifTrueThisElementCurrentlyCannot: "If true, this element currently cannot be interacted with.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  invalidUserEntry: "Invalid user entry",
  /**
   * @description Tooltip text that appears when hovering over the 'Invalid user entry' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  ifTrueThisElementsUserentered: "If true, this element's user-entered value does not conform to validation requirement.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  editable: "Editable",
  /**
   * @description Tooltip text that appears when hovering over the 'Editable' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  ifAndHowThisElementCanBeEdited: "If and how this element can be edited.",
  /**
   * @description Adjective. Describes whether the currently selected HTML element of the page can receive focus at all (e.g. can the selected element receive user keyboard input).
   *             Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  focusable: "Focusable",
  /**
   * @description Tooltip text that appears when hovering over the 'Focusable' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  ifTrueThisElementCanReceiveFocus: "If true, this element can receive focus.",
  /**
   * @description Adjective. Describes whether the currently selected HTML element of the page is focused (e.g. the selected element receives user keyboard input).
   *             Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane.
   */
  focused: "Focused",
  /**
   * @description Tooltip text that appears when hovering over the 'Focused' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  ifTrueThisElementCurrentlyHas: "If `true`, this element currently has focus.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  canSetValue: "Can set value",
  /**
   * @description Tooltip text that appears when hovering over the 'Can set value' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  whetherTheValueOfThisElementCan: "Whether the value of this element can be set.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in
   * the Accessibility pane of the Elements panel. A live region is an area of the webpage which is
   * dynamic and changes frequently.
   */
  liveRegion: "Live region",
  /**
   * @description Tooltip text that appears when hovering over the 'Live region' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  whetherAndWhatPriorityOfLive: "Whether and what priority of live updates may be expected for this element.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in
   * the Accessibility pane of the Elements panel when inspecting an element with aria-relevant set.
   */
  atomicLiveRegions: "Atomic (live regions)",
  /**
   * @description Tooltip text that appears when hovering over the 'Atomic (live regions)' attribute
   * name under the Computed Properties section in the Accessibility pane of the Elements panel. When
   * a node within a live region changes, the entire live region can be presented to the user, or
   * just the nodes within the region that actually changed.
   */
  ifThisElementMayReceiveLive: "If this element may receive live updates, whether the entire live region should be presented to the user on changes, or only changed nodes.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in
   * the Accessibility pane of the Elements panel when inspecting an element with aria-relevant set.
   */
  relevantLiveRegions: "Relevant (live regions)",
  /**
   * @description Tooltip text that appears when hovering over the 'Relevant (live regions)' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  ifThisElementMayReceiveLiveUpdates: "If this element may receive live updates, what type of updates should trigger a notification.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in
   * the Accessibility pane of the Elements pane. Indicates that the aria-busy attribute is set for
   * the element, which means the element is being modified and assistive technologies like screen
   * readers may want to wait until the area is no longer live/busy before exposing it to the user.
   */
  busyLiveRegions: "`Busy` (live regions)",
  /**
   * @description Tooltip text that appears when hovering over the 'Busy (live regions)' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  whetherThisElementOrItsSubtree: "Whether this element or its subtree are currently being updated (and thus may be in an inconsistent state).",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in
   * the Accessibility pane of the Elements panel. A live region is a section of the DOM graph which
   * is dynamic in nature and will change regularly. The live region root is the node in the graph
   * which is a parent of all nodes in the live region.
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
   */
  liveRegionRoot: "Live region root",
  /**
   * @description Tooltip text that appears when hovering over the 'Live region root' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  ifThisElementMayReceiveLiveUpdatesThe: "If this element may receive live updates, the root element of the containing live region.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  hasAutocomplete: "Has autocomplete",
  /**
   * @description Tooltip text that appears when hovering over the 'Has autocomplete' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  whetherAndWhatTypeOfAutocomplete: "Whether and what type of autocomplete suggestions are currently provided by this element.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  hasPopup: "Has popup",
  /**
   * @description Tooltip text that appears when hovering over the 'Has popup' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  whetherThisElementHasCausedSome: "Whether this element has caused some kind of pop-up (such as a menu) to appear.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  level: "Level",
  /**
   * @description Tooltip text that appears when hovering over the 'Level' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  theHierarchicalLevelOfThis: "The hierarchical level of this element.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  multiselectable: "Multi-selectable",
  /**
   * @description Tooltip text that appears when hovering over the 'Multi-selectable' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  whetherAUserMaySelectMoreThanOne: "Whether a user may select more than one option from this widget.",
  /**
   * @description Text for the orientation of something
   */
  orientation: "Orientation",
  /**
   * @description Tooltip text that appears when hovering over the 'Orientation' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  whetherThisLinearElements: "Whether this linear element's orientation is horizontal or vertical.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  multiline: "Multi-line",
  /**
   * @description Tooltip text that appears when hovering over the 'Multi-line' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  whetherThisTextBoxMayHaveMore: "Whether this text box may have more than one line.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  readonlyString: "Read-only",
  /**
   * @description Tooltip text that appears when hovering over the 'Read-only' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  ifTrueThisElementMayBeInteracted: "If true, this element may be interacted with, but its value cannot be changed.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  requiredString: "Required",
  /**
   * @description Tooltip text that appears when hovering over the 'Required' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  whetherThisElementIsARequired: "Whether this element is a required field in a form.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  minimumValue: "Minimum value",
  /**
   * @description Tooltip text that appears when hovering over the 'Minimum value' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  forARangeWidgetTheMinimumAllowed: "For a range widget, the minimum allowed value.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  maximumValue: "Maximum value",
  /**
   * @description Tooltip text that appears when hovering over the 'Maximum value' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  forARangeWidgetTheMaximumAllowed: "For a range widget, the maximum allowed value.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  valueDescription: "Value description",
  /**
   * @description Tooltip text that appears when hovering over the 'Value description' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  aHumanreadableVersionOfTheValue: "A human-readable version of the value of a range widget (where necessary).",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  checked: "Checked",
  /**
   * @description Tooltip text that appears when hovering over the 'Checked' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  whetherThisCheckboxRadioButtonOr: "Whether this checkbox, radio button or tree item is checked, unchecked, or mixed (e.g. has both checked and un-checked children).",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  expanded: "Expanded",
  /**
   * @description Tooltip text that appears when hovering over the 'Expanded' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  whetherThisElementOrAnother: "Whether this element, or another grouping element it controls, is expanded.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  pressed: "Pressed",
  /**
   * @description Tooltip text that appears when hovering over the 'Pressed' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  whetherThisToggleButtonIs: "Whether this toggle button is currently in a pressed state.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  selectedString: "Selected",
  /**
   * @description Tooltip text that appears when hovering over the 'Selected' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  whetherTheOptionRepresentedBy: "Whether the option represented by this element is currently selected.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  activeDescendant: "Active descendant",
  /**
   * @description Tooltip text that appears when hovering over the 'Active descendant' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  theDescendantOfThisElementWhich: "The descendant of this element which is active; i.e. the element to which focus should be delegated.",
  /**
   * @description Tooltip text that appears when hovering over the 'Flows to' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  elementToWhichTheUserMayChooseTo: "Element to which the user may choose to navigate after this one, instead of the next element in the DOM order.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  controls: "Controls",
  /**
   * @description Tooltip text that appears when hovering over the 'Controls' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  elementOrElementsWhoseContentOr: "Element or elements whose content or presence is/are controlled by this widget.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  describedBy: "Described by",
  /**
   * @description Tooltip text that appears when hovering over the 'Described by' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  elementOrElementsWhichFormThe: "Element or elements which form the description of this element.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  labeledBy: "Labeled by",
  /**
   * @description Tooltip text that appears when hovering over the 'Labeled by' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  elementOrElementsWhichMayFormThe: "Element or elements which may form the name of this element.",
  /**
   * @description Tooltip text that appears when hovering over the 'Owns' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  elementOrElementsWhichShouldBe: "Element or elements which should be considered descendants of this element, despite not being descendants in the DOM.",
  /**
   * @description Tooltip text that appears when hovering over the 'Name' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  theComputedNameOfThisElement: "The computed name of this element.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  role: "Role",
  /**
   * @description Tooltip text that appears when hovering over the 'Role' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  indicatesThePurposeOfThisElement: "Indicates the purpose of this element, such as a user interface idiom for a widget, or structural role within a document.",
  /**
   * @description Text for the value of something
   */
  value: "Value",
  /**
   * @description Tooltip text that appears when hovering over the 'Value' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  theValueOfThisElementThisMayBe: "The value of this element; this may be user-provided or developer-provided, depending on the element.",
  /**
   * @description Text for the viewing the help options
   */
  help: "Help",
  /**
   * @description Tooltip text that appears when hovering over the 'Help' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  theComputedHelpTextForThis: "The computed help text for this element.",
  /**
   * @description Text for the description of something
   */
  description: "Description",
  /**
   * @description Tooltip text that appears when hovering over the 'Description' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  theAccessibleDescriptionForThis: "The accessible description for this element.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  fromAttribute: "From attribute",
  /**
   * @description Tooltip text that appears when hovering over the 'From attribute' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  valueFromAttribute: "Value from attribute.",
  /**
   * @description The source of an accessibility attribute that appears under the Computed Properties
   * section in the Accessibility pane of the Elements panel. If the source is implicit, that means
   * it was never specified by the user but instead is present because it is the default value.
   */
  implicit: "Implicit",
  /**
   * @description Tooltip text that appears when hovering over the 'Implicit' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  implicitValue: "Implicit value.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  fromStyle: "From style",
  /**
   * @description Tooltip text that appears when hovering over the 'From style' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  valueFromStyle: "Value from style.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  contents: "Contents",
  /**
   * @description Tooltip text that appears when hovering over the 'Contents' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  valueFromElementContents: "Value from element contents.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  fromPlaceholderAttribute: "From placeholder attribute",
  /**
   * @description Tooltip text that appears when hovering over the 'From placeholder attribute' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  valueFromPlaceholderAttribute: "Value from placeholder attribute.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  relatedElement: "Related element",
  /**
   * @description Tooltip text that appears when hovering over the 'Related element' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  valueFromRelatedElement: "Value from related element.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in
   * the Accessibility pane of the Elements pane. Indicates that this element got assigned this
   * attribute because there is a related caption, hence it received it from the caption. 'caption'
   * is part of the ARIA API and should not be translated.
   */
  fromCaption: "From `caption`",
  /**
   * @description Tooltip text that appears when hovering over the 'From caption' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  valueFromFigcaptionElement: "Value from `figcaption` element.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in
   * the Accessibility pane of the Elements pane. Indicates that this element got assigned this
   * attribute because there is a related description, hence it received it from the description.
   * 'description' is part of the ARIA API and should not be translated.
   */
  fromDescription: "From `description`",
  /**
   * @description Tooltip text that appears when hovering over the 'From description' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  valueFromDescriptionElement: "Value from `description` element.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in
   * the Accessibility pane of the Elements pane. Indicates that this element got assigned this
   * attribute because there is a related label, hence it received it from the label. 'label'
   * is part of the ARIA API and should not be translated.
   */
  fromLabel: "From `label`",
  /**
   * @description Tooltip text that appears when hovering over the 'From label' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  valueFromLabelElement: "Value from `label` element.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in
   * the Accessibility pane of the Elements pane. Indicates that this element got assigned this
   * attribute because there is a related label, hence it received it from the label. 'label (for)'
   * is part of the ARIA API and should not be translated. label (for) is just a different type of
   * label.
   */
  fromLabelFor: "From `label` (`for=` attribute)",
  /**
   * @description Tooltip text that appears when hovering over the 'From label (for)' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  valueFromLabelElementWithFor: "Value from `label` element with `for=` attribute.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in
   * the Accessibility pane of the Elements pane. Indicates that this element got assigned this
   * attribute because there is a related label which wraps (encompasses, surrounds) this element,
   * hence it received it from the label. 'wrapped' is not part of the ARIA API, and should be
   * translated.
   */
  fromLabelWrapped: "From `label` (wrapped)",
  /**
   * @description Tooltip text that appears when hovering over the 'From label (wrapped)' attribute
   * name under the Computed Properties section in the Accessibility pane of the Elements pane.
   * Indicates that there is a label element wrapping (surrounding) this element.
   */
  valueFromLabelElementWrapped: "Value from a wrapping `label` element.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in
   * the Accessibility pane of the Elements pane. Indicates that this element got assigned this
   * attribute because there is a related legend, hence it received it from the legend. 'legend' is
   * part of the ARIA API and should not be translated.
   */
  fromLegend: "From `legend`",
  /**
   * @description Tooltip text that appears when hovering over the 'From legend' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  valueFromLegendElement: "Value from `legend` element.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  fromRubyAnnotation: "From ruby annotation",
  /**
   * @description Tooltip text that appears when hovering over the 'From ruby annotation' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane. Indicates that the value was taken from a plain HTML ruby tag (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby).
   */
  valueFromNativeHtmlRuby: "Value from plain HTML ruby annotation.",
  /**
   * @description Tooltip text that appears when hovering over the 'From caption' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  valueFromTableCaption: "Value from `table` `caption`.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in
   * the Accessibility pane of the Elements panel.
   */
  fromTitle: "From title",
  /**
   * @description Tooltip text that appears when hovering over the 'From title' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  valueFromTitleAttribute: "Value from title attribute.",
  /**
   * @description Accessibility attribute name that appears under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  fromNativeHtml: "From native HTML",
  /**
   * @description Tooltip text that appears when hovering over the 'From native HTML' attribute name under the Computed Properties section in the Accessibility pane of the Elements pane
   */
  valueFromNativeHtmlUnknownSource: "Value from native HTML (unknown source)."
};
var str_ = i18n.i18n.registerUIStrings("panels/accessibility/AccessibilityStrings.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var AXAttributes = {
  disabled: {
    name: i18nLazyString(UIStrings.disabled),
    description: i18nLazyString(UIStrings.ifTrueThisElementCurrentlyCannot),
    group: "AXGlobalStates"
  },
  invalid: {
    name: i18nLazyString(UIStrings.invalidUserEntry),
    description: i18nLazyString(UIStrings.ifTrueThisElementsUserentered),
    group: "AXGlobalStates"
  },
  editable: { name: i18nLazyString(UIStrings.editable), description: i18nLazyString(UIStrings.ifAndHowThisElementCanBeEdited) },
  focusable: {
    name: i18nLazyString(UIStrings.focusable),
    description: i18nLazyString(UIStrings.ifTrueThisElementCanReceiveFocus)
  },
  focused: { name: i18nLazyString(UIStrings.focused), description: i18nLazyString(UIStrings.ifTrueThisElementCurrentlyHas) },
  settable: {
    name: i18nLazyString(UIStrings.canSetValue),
    description: i18nLazyString(UIStrings.whetherTheValueOfThisElementCan)
  },
  live: {
    name: i18nLazyString(UIStrings.liveRegion),
    description: i18nLazyString(UIStrings.whetherAndWhatPriorityOfLive),
    group: "AXLiveRegionAttributes"
  },
  atomic: {
    name: i18nLazyString(UIStrings.atomicLiveRegions),
    description: i18nLazyString(UIStrings.ifThisElementMayReceiveLive),
    group: "AXLiveRegionAttributes"
  },
  relevant: {
    name: i18nLazyString(UIStrings.relevantLiveRegions),
    description: i18nLazyString(UIStrings.ifThisElementMayReceiveLiveUpdates),
    group: "AXLiveRegionAttributes"
  },
  busy: {
    name: i18nLazyString(UIStrings.busyLiveRegions),
    description: i18nLazyString(UIStrings.whetherThisElementOrItsSubtree),
    group: "AXLiveRegionAttributes"
  },
  root: {
    name: i18nLazyString(UIStrings.liveRegionRoot),
    description: i18nLazyString(UIStrings.ifThisElementMayReceiveLiveUpdatesThe),
    group: "AXLiveRegionAttributes"
  },
  autocomplete: {
    name: i18nLazyString(UIStrings.hasAutocomplete),
    description: i18nLazyString(UIStrings.whetherAndWhatTypeOfAutocomplete),
    group: "AXWidgetAttributes"
  },
  haspopup: {
    name: i18nLazyString(UIStrings.hasPopup),
    description: i18nLazyString(UIStrings.whetherThisElementHasCausedSome),
    group: "AXWidgetAttributes"
  },
  level: {
    name: i18nLazyString(UIStrings.level),
    description: i18nLazyString(UIStrings.theHierarchicalLevelOfThis),
    group: "AXWidgetAttributes"
  },
  multiselectable: {
    name: i18nLazyString(UIStrings.multiselectable),
    description: i18nLazyString(UIStrings.whetherAUserMaySelectMoreThanOne),
    group: "AXWidgetAttributes"
  },
  orientation: {
    name: i18nLazyString(UIStrings.orientation),
    description: i18nLazyString(UIStrings.whetherThisLinearElements),
    group: "AXWidgetAttributes"
  },
  multiline: {
    name: i18nLazyString(UIStrings.multiline),
    description: i18nLazyString(UIStrings.whetherThisTextBoxMayHaveMore),
    group: "AXWidgetAttributes"
  },
  readonly: {
    name: i18nLazyString(UIStrings.readonlyString),
    description: i18nLazyString(UIStrings.ifTrueThisElementMayBeInteracted),
    group: "AXWidgetAttributes"
  },
  required: {
    name: i18nLazyString(UIStrings.requiredString),
    description: i18nLazyString(UIStrings.whetherThisElementIsARequired),
    group: "AXWidgetAttributes"
  },
  valuemin: {
    name: i18nLazyString(UIStrings.minimumValue),
    description: i18nLazyString(UIStrings.forARangeWidgetTheMinimumAllowed),
    group: "AXWidgetAttributes"
  },
  valuemax: {
    name: i18nLazyString(UIStrings.maximumValue),
    description: i18nLazyString(UIStrings.forARangeWidgetTheMaximumAllowed),
    group: "AXWidgetAttributes"
  },
  valuetext: {
    name: i18nLazyString(UIStrings.valueDescription),
    description: i18nLazyString(UIStrings.aHumanreadableVersionOfTheValue),
    group: "AXWidgetAttributes"
  },
  checked: {
    name: i18nLazyString(UIStrings.checked),
    description: i18nLazyString(UIStrings.whetherThisCheckboxRadioButtonOr),
    group: "AXWidgetStates"
  },
  expanded: {
    name: i18nLazyString(UIStrings.expanded),
    description: i18nLazyString(UIStrings.whetherThisElementOrAnother),
    group: "AXWidgetStates"
  },
  pressed: {
    name: i18nLazyString(UIStrings.pressed),
    description: i18nLazyString(UIStrings.whetherThisToggleButtonIs),
    group: "AXWidgetStates"
  },
  selected: {
    name: i18nLazyString(UIStrings.selectedString),
    description: i18nLazyString(UIStrings.whetherTheOptionRepresentedBy),
    group: "AXWidgetStates"
  },
  activedescendant: {
    name: i18nLazyString(UIStrings.activeDescendant),
    description: i18nLazyString(UIStrings.theDescendantOfThisElementWhich),
    group: "AXRelationshipAttributes"
  },
  flowto: {
    name: i18n.i18n.lockedLazyString("Flows to"),
    description: i18nLazyString(UIStrings.elementToWhichTheUserMayChooseTo),
    group: "AXRelationshipAttributes"
  },
  controls: {
    name: i18nLazyString(UIStrings.controls),
    description: i18nLazyString(UIStrings.elementOrElementsWhoseContentOr),
    group: "AXRelationshipAttributes"
  },
  describedby: {
    name: i18nLazyString(UIStrings.describedBy),
    description: i18nLazyString(UIStrings.elementOrElementsWhichFormThe),
    group: "AXRelationshipAttributes"
  },
  labelledby: {
    name: i18nLazyString(UIStrings.labeledBy),
    description: i18nLazyString(UIStrings.elementOrElementsWhichMayFormThe),
    group: "AXRelationshipAttributes"
  },
  owns: {
    name: i18n.i18n.lockedLazyString("Owns"),
    description: i18nLazyString(UIStrings.elementOrElementsWhichShouldBe),
    group: "AXRelationshipAttributes"
  },
  name: {
    name: i18n.i18n.lockedLazyString("Name"),
    description: i18nLazyString(UIStrings.theComputedNameOfThisElement),
    group: "Default"
  },
  role: {
    name: i18nLazyString(UIStrings.role),
    description: i18nLazyString(UIStrings.indicatesThePurposeOfThisElement),
    group: "Default"
  },
  value: {
    name: i18nLazyString(UIStrings.value),
    description: i18nLazyString(UIStrings.theValueOfThisElementThisMayBe),
    group: "Default"
  },
  help: {
    name: i18nLazyString(UIStrings.help),
    description: i18nLazyString(UIStrings.theComputedHelpTextForThis),
    group: "Default"
  },
  description: {
    name: i18nLazyString(UIStrings.description),
    description: i18nLazyString(UIStrings.theAccessibleDescriptionForThis),
    group: "Default"
  }
};
var AXSourceTypes = {
  attribute: { name: i18nLazyString(UIStrings.fromAttribute), description: i18nLazyString(UIStrings.valueFromAttribute) },
  implicit: {
    name: i18nLazyString(UIStrings.implicit),
    description: i18nLazyString(UIStrings.implicitValue)
  },
  style: { name: i18nLazyString(UIStrings.fromStyle), description: i18nLazyString(UIStrings.valueFromStyle) },
  contents: { name: i18nLazyString(UIStrings.contents), description: i18nLazyString(UIStrings.valueFromElementContents) },
  placeholder: {
    name: i18nLazyString(UIStrings.fromPlaceholderAttribute),
    description: i18nLazyString(UIStrings.valueFromPlaceholderAttribute)
  },
  relatedElement: { name: i18nLazyString(UIStrings.relatedElement), description: i18nLazyString(UIStrings.valueFromRelatedElement) }
};
var AXNativeSourceTypes = {
  description: {
    name: i18nLazyString(UIStrings.fromDescription),
    description: i18nLazyString(UIStrings.valueFromDescriptionElement)
  },
  figcaption: { name: i18nLazyString(UIStrings.fromCaption), description: i18nLazyString(UIStrings.valueFromFigcaptionElement) },
  label: { name: i18nLazyString(UIStrings.fromLabel), description: i18nLazyString(UIStrings.valueFromLabelElement) },
  labelfor: {
    name: i18nLazyString(UIStrings.fromLabelFor),
    description: i18nLazyString(UIStrings.valueFromLabelElementWithFor)
  },
  labelwrapped: {
    name: i18nLazyString(UIStrings.fromLabelWrapped),
    description: i18nLazyString(UIStrings.valueFromLabelElementWrapped)
  },
  legend: { name: i18nLazyString(UIStrings.fromLegend), description: i18nLazyString(UIStrings.valueFromLegendElement) },
  rubyannotation: {
    name: i18nLazyString(UIStrings.fromRubyAnnotation),
    description: i18nLazyString(UIStrings.valueFromNativeHtmlRuby)
  },
  tablecaption: { name: i18nLazyString(UIStrings.fromCaption), description: i18nLazyString(UIStrings.valueFromTableCaption) },
  title: { name: i18nLazyString(UIStrings.fromTitle), description: i18nLazyString(UIStrings.valueFromTitleAttribute) },
  other: {
    name: i18nLazyString(UIStrings.fromNativeHtml),
    description: i18nLazyString(UIStrings.valueFromNativeHtmlUnknownSource)
  }
};

// gen/front_end/panels/accessibility/AccessibilitySubPane.js
var AccessibilitySubPane_exports = {};
__export(AccessibilitySubPane_exports, {
  AccessibilitySubPane: () => AccessibilitySubPane
});

// gen/front_end/ui/legacy/components/object_ui/objectValue.css.js
var objectValue_css_default = `/*
 * Copyright 2015 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.value.object-value-node:hover {
  background-color: var(--sys-color-state-hover-on-subtle);
}

.object-value-function-prefix,
.object-value-boolean {
  color: var(--sys-color-token-attribute-value);
}

.object-value-function {
  font-style: italic;
}

.object-value-function.linkified:hover {
  --override-linkified-hover-background: rgb(0 0 0 / 10%);

  background-color: var(--override-linkified-hover-background);
  cursor: pointer;
}

.theme-with-dark-background .object-value-function.linkified:hover,
:host-context(.theme-with-dark-background) .object-value-function.linkified:hover {
  --override-linkified-hover-background: rgb(230 230 230 / 10%);
}

.object-value-number {
  color: var(--sys-color-token-attribute-value);
}

.object-value-bigint {
  color: var(--sys-color-token-comment);
}

.object-value-string,
.object-value-regexp,
.object-value-symbol {
  white-space: pre;
  unicode-bidi: -webkit-isolate;
  color: var(--sys-color-token-property-special);
}

.object-value-node {
  position: relative;
  vertical-align: baseline;
  color: var(--sys-color-token-variable);
  white-space: nowrap;
}

.object-value-null,
.object-value-undefined {
  color: var(--sys-color-state-disabled);
}

.object-value-unavailable {
  color: var(--sys-color-token-tag);
}

.object-value-calculate-value-button:hover {
  text-decoration: underline;
}

.object-properties-section-custom-section {
  display: inline-flex;
  flex-direction: column;
}

.theme-with-dark-background .object-value-number,
:host-context(.theme-with-dark-background) .object-value-number,
.theme-with-dark-background .object-value-boolean,
:host-context(.theme-with-dark-background) .object-value-boolean {
  --override-primitive-dark-mode-color: hsl(252deg 100% 75%);

  color: var(--override-primitive-dark-mode-color);
}

.object-properties-section .object-description {
  color: var(--sys-color-token-subtle);
}

.value .object-properties-preview {
  white-space: nowrap;
}

.name {
  color: var(--sys-color-token-tag);
  flex-shrink: 0;
}

.object-properties-preview .name {
  color: var(--sys-color-token-subtle);
}

@media (forced-colors: active) {
  .object-value-calculate-value-button:hover {
    forced-color-adjust: none;
    color: Highlight;
  }
}

/*# sourceURL=${import.meta.resolve("./objectValue.css")} */`;

// gen/front_end/panels/accessibility/AccessibilitySubPane.js
import * as UI from "./../../ui/legacy/legacy.js";

// gen/front_end/panels/accessibility/accessibilityProperties.css.js
var accessibilityProperties_css_default = `/*
 * Copyright 2015 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.ax-name {
  color: var(--sys-color-token-attribute);
  flex-shrink: 0;
}

.ax-readable-name {
  flex-shrink: 0;
}

.ax-readable-string {
  font-style: italic;
}

.ax-value-string {
  color: var(--sys-color-token-property-special);
}

span.ax-internal-role {
  font-style: italic;
}

#source-order-warning {
  padding-bottom: 0;
  text-align: left;
}

.source-order-checkbox {
  margin: 2px 2px 2px 5px;
}

.info-message-overflow {
  overflow-x: hidden;
  white-space: normal;
}

/*# sourceURL=${import.meta.resolve("./accessibilityProperties.css")} */`;

// gen/front_end/panels/accessibility/AccessibilitySubPane.js
var AccessibilitySubPane = class extends UI.View.SimpleView {
  axNode;
  nodeInternal;
  constructor(options) {
    super(options);
    this.registerRequiredCSS(accessibilityProperties_css_default);
    this.axNode = null;
  }
  setAXNode(_axNode) {
  }
  node() {
    return this.nodeInternal || null;
  }
  setNode(node) {
    this.nodeInternal = node;
  }
  createInfo(textContent, className) {
    const info = this.element.createChild("div", className || "gray-info-message");
    info.classList.add("info-message-overflow");
    info.textContent = textContent;
    return info;
  }
  createTreeOutline() {
    const treeOutline = new UI.TreeOutline.TreeOutlineInShadow();
    treeOutline.registerRequiredCSS(accessibilityNode_css_default, accessibilityProperties_css_default, objectValue_css_default);
    treeOutline.element.classList.add("hidden");
    treeOutline.setHideOverflow(true);
    this.element.appendChild(treeOutline.element);
    return treeOutline;
  }
};

// gen/front_end/panels/accessibility/AccessibilityNodeView.js
var UIStrings2 = {
  /**
   * @description Text in Accessibility Node View of the Accessibility panel
   */
  computedProperties: "Computed Properties",
  /**
   * @description Text in Accessibility Node View of the Accessibility panel
   */
  noAccessibilityNode: "No accessibility node",
  /**
   * @description Text in Accessibility Node View of the Accessibility panel
   */
  accessibilityNodeNotExposed: "Accessibility node not exposed",
  /**
   * @description Text in Accessibility Node View of the Accessibility panel
   */
  invalidSource: "Invalid source.",
  /**
   * @description Text in Accessibility Node View of the Accessibility panel
   */
  notSpecified: "Not specified",
  /**
   * @description Text in Accessibility Node View of the Accessibility panel
   */
  noNodeWithThisId: "No node with this ID.",
  /**
   * @description Text which appears in the Accessibility Node View of the Accessibility panel when an element is covered by a modal/popup window
   */
  elementIsHiddenBy: "Element is hidden by active modal dialog:\xA0",
  /**
   * @description Text which appears in the Accessibility Node View of the Accessibility panel when an element is hidden by another accessibility tree.
   */
  elementIsHiddenByChildTree: "Element is hidden by child tree:\xA0",
  /**
   * @description Reason element in Accessibility Node View of the Accessibility panel
   */
  ancestorChildrenAreAll: "Ancestor's children are all presentational:\xA0",
  /**
   * @description Reason element in Accessibility Node View of the Accessibility panel
   * @example {aria-hidden} PH1
   */
  elementIsPlaceholder: "Element is {PH1}.",
  /**
   * @description Reason element in Accessibility Node View of the Accessibility panel
   * @example {aria-hidden} PH1
   * @example {true} PH2
   */
  placeholderIsPlaceholderOnAncestor: "{PH1} is {PH2} on ancestor:\xA0",
  /**
   * @description Text in Accessibility Node View of the Accessibility panel
   */
  elementHasEmptyAltText: "Element has empty alt text.",
  /**
   * @description Reason element in Accessibility Node View of the Accessibility panel
   */
  noTextContent: "No text content.",
  /**
   * @description Reason element in Accessibility Node View of the Accessibility panel
   */
  elementIsInert: "Element is `inert`.",
  /**
   * @description Reason element in Accessibility Node View of the Accessibility panel
   */
  elementIsInAnInertSubTree: "Element is in an `inert` subtree from\xA0",
  /**
   * @description Reason element in Accessibility Node View of the Accessibility panel
   */
  elementsInheritsPresentational: "Element inherits presentational role from\xA0",
  /**
   * @description Reason element in Accessibility Node View of the Accessibility panel
   */
  partOfLabelElement: "Part of label element:\xA0",
  /**
   * @description Reason element in Accessibility Node View of the Accessibility panel
   */
  labelFor: "Label for\xA0",
  /**
   * @description Reason element in Accessibility Node View of the Accessibility panel
   */
  elementIsNotRendered: "Element is not rendered.",
  /**
   * @description Reason element in Accessibility Node View of the Accessibility panel
   */
  elementIsNotVisible: "Element is not visible.",
  /**
   * @description Reason element in Accessibility Node View of the Accessibility panel. Indicates the
   *ARIA role for this element, which will always have the format 'role=', but with different roles
   *(which are not translated). https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
   * @example {role=link} PH1
   */
  elementHasPlaceholder: "Element has {PH1}.",
  /**
   * @description Reason element in Accessibility Node View of the Accessibility panel
   */
  elementIsPresentational: "Element is presentational.",
  /**
   * @description Reason element in Accessibility Node View of the Accessibility pane. Here
   * 'interesting' is from the perspective of the accessibility engine in Chrome. A non-interesting
   * element doesn't have any special accessibility considerations
   */
  elementNotInteresting: "Element not interesting for accessibility."
};
var str_2 = i18n3.i18n.registerUIStrings("panels/accessibility/AccessibilityNodeView.ts", UIStrings2);
var i18nString = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
var AXNodeSubPane = class extends AccessibilitySubPane {
  axNode;
  noNodeInfo;
  ignoredInfo;
  treeOutline;
  ignoredReasonsTree;
  constructor() {
    super({
      title: i18nString(UIStrings2.computedProperties),
      viewId: "computed-properties",
      jslog: `${VisualLogging.section("computed-properties")}`
    });
    this.registerRequiredCSS(accessibilityNode_css_default);
    this.axNode = null;
    this.contentElement.classList.add("ax-subpane");
    this.noNodeInfo = this.createInfo(i18nString(UIStrings2.noAccessibilityNode));
    this.ignoredInfo = this.createInfo(i18nString(UIStrings2.accessibilityNodeNotExposed), "ax-ignored-info hidden");
    this.treeOutline = this.createTreeOutline();
    this.ignoredReasonsTree = this.createTreeOutline();
    this.element.classList.add("accessibility-computed");
    this.treeOutline.setFocusable(true);
  }
  setAXNode(axNode) {
    if (this.axNode === axNode) {
      return;
    }
    this.axNode = axNode;
    const treeOutline = this.treeOutline;
    treeOutline.removeChildren();
    const ignoredReasons = this.ignoredReasonsTree;
    ignoredReasons.removeChildren();
    if (!axNode) {
      treeOutline.element.classList.add("hidden");
      this.ignoredInfo.classList.add("hidden");
      ignoredReasons.element.classList.add("hidden");
      this.noNodeInfo.classList.remove("hidden");
      this.element.classList.add("ax-ignored-node-pane");
      return;
    }
    if (axNode.ignored()) {
      let addIgnoredReason = function(property) {
        ignoredReasons.appendChild(new AXNodeIgnoredReasonTreeElement(property, axNode));
      };
      this.noNodeInfo.classList.add("hidden");
      treeOutline.element.classList.add("hidden");
      this.element.classList.add("ax-ignored-node-pane");
      this.ignoredInfo.classList.remove("hidden");
      ignoredReasons.element.classList.remove("hidden");
      const ignoredReasonsArray = axNode.ignoredReasons();
      for (const reason of ignoredReasonsArray) {
        addIgnoredReason(reason);
      }
      if (!ignoredReasons.firstChild()) {
        ignoredReasons.element.classList.add("hidden");
      }
      return;
    }
    this.element.classList.remove("ax-ignored-node-pane");
    this.ignoredInfo.classList.add("hidden");
    ignoredReasons.element.classList.add("hidden");
    this.noNodeInfo.classList.add("hidden");
    treeOutline.element.classList.remove("hidden");
    function addProperty(property) {
      treeOutline.appendChild(new AXNodePropertyTreePropertyElement(property, axNode));
    }
    for (const property of axNode.coreProperties()) {
      addProperty(property);
    }
    const role = axNode.role();
    if (role) {
      const roleProperty = {
        name: "role",
        value: role
      };
      addProperty(roleProperty);
    }
    for (const property of axNode.properties()) {
      addProperty(property);
    }
    const firstNode = treeOutline.firstChild();
    if (firstNode) {
      firstNode.select(
        /* omitFocus= */
        true,
        /* selectedByUser= */
        false
      );
    }
  }
  setNode(node) {
    super.setNode(node);
    this.axNode = null;
  }
};
var AXNodePropertyTreeElement = class _AXNodePropertyTreeElement extends UI2.TreeOutline.TreeElement {
  axNode;
  constructor(axNode) {
    super("");
    this.axNode = axNode;
  }
  static createSimpleValueElement(type, value) {
    let valueElement;
    if (!type || type === "valueUndefined" || type === "computedString") {
      valueElement = document.createElement("span");
    } else {
      valueElement = document.createElement("span");
      valueElement.classList.add("monospace");
    }
    let valueText;
    const isStringProperty = type && StringProperties.has(type);
    if (isStringProperty) {
      valueText = '"' + value.replace(/\n/g, "\u21B5") + '"';
    } else {
      valueText = String(value);
    }
    if (type && type in TypeStyles) {
      valueElement.classList.add(TypeStyles[type]);
    }
    valueElement.setTextContentTruncatedIfNeeded(valueText || "");
    UI2.Tooltip.Tooltip.install(valueElement, String(value) || "");
    return valueElement;
  }
  static createExclamationMark(tooltip) {
    const exclamationElement = UI2.UIUtils.createIconLabel({ iconName: "warning-filled", color: "var(--icon-warning)" });
    UI2.Tooltip.Tooltip.install(exclamationElement, tooltip);
    return exclamationElement;
  }
  appendNameElement(name) {
    const nameElement = document.createElement("span");
    if (name in AXAttributes) {
      const attribute = AXAttributes[name];
      nameElement.textContent = attribute.name();
      UI2.Tooltip.Tooltip.install(nameElement, attribute.description());
      nameElement.classList.add("ax-readable-name");
    } else {
      nameElement.textContent = name;
      nameElement.classList.add("ax-name");
      nameElement.classList.add("monospace");
    }
    this.listItemElement.appendChild(nameElement);
  }
  appendValueElement(value) {
    if (value.type === "idref" || value.type === "node" || value.type === "idrefList" || value.type === "nodeList") {
      this.appendRelatedNodeListValueElement(value);
      return;
    }
    if (value.sources) {
      const sources = value.sources;
      for (let i = 0; i < sources.length; i++) {
        const source = sources[i];
        const child = new AXValueSourceTreeElement(source, this.axNode);
        this.appendChild(child);
      }
      this.expand();
    }
    const element = _AXNodePropertyTreeElement.createSimpleValueElement(value.type, String(value.value));
    this.listItemElement.appendChild(element);
  }
  appendRelatedNode(relatedNode, _index) {
    const deferredNode = new SDK.DOMModel.DeferredDOMNode(this.axNode.accessibilityModel().target(), relatedNode.backendDOMNodeId);
    const nodeTreeElement = new AXRelatedNodeSourceTreeElement({ deferredNode, idref: void 0 }, relatedNode);
    this.appendChild(nodeTreeElement);
  }
  appendRelatedNodeInline(relatedNode) {
    const deferredNode = new SDK.DOMModel.DeferredDOMNode(this.axNode.accessibilityModel().target(), relatedNode.backendDOMNodeId);
    const linkedNode = new AXRelatedNodeElement({ deferredNode, idref: void 0 });
    this.listItemElement.appendChild(linkedNode.render());
  }
  appendRelatedNodeListValueElement(value) {
    if (value.relatedNodes && value.relatedNodes.length === 1 && !value.value) {
      this.appendRelatedNodeInline(value.relatedNodes[0]);
      return;
    }
    if (value.relatedNodes) {
      value.relatedNodes.forEach(this.appendRelatedNode, this);
    }
    if (value.relatedNodes && value.relatedNodes.length <= 3) {
      this.expand();
    } else {
      this.collapse();
    }
  }
};
var TypeStyles = {
  attribute: "ax-value-string",
  boolean: "object-value-boolean",
  booleanOrUndefined: "object-value-boolean",
  computedString: "ax-readable-string",
  idref: "ax-value-string",
  idrefList: "ax-value-string",
  integer: "object-value-number",
  internalRole: "ax-internal-role",
  number: "ax-value-number",
  role: "ax-role",
  string: "ax-value-string",
  tristate: "object-value-boolean",
  valueUndefined: "ax-value-undefined"
};
var StringProperties = /* @__PURE__ */ new Set([
  "string",
  "computedString",
  "idrefList",
  "idref"
]);
var AXNodePropertyTreePropertyElement = class extends AXNodePropertyTreeElement {
  property;
  toggleOnClick;
  constructor(property, axNode) {
    super(axNode);
    this.property = property;
    this.toggleOnClick = true;
    this.listItemElement.classList.add("property");
  }
  onattach() {
    this.update();
  }
  update() {
    this.listItemElement.removeChildren();
    this.appendNameElement(this.property.name);
    this.listItemElement.createChild("span", "separator").textContent = ":\xA0";
    this.appendValueElement(this.property.value);
  }
};
var AXValueSourceTreeElement = class extends AXNodePropertyTreeElement {
  source;
  constructor(source, axNode) {
    super(axNode);
    this.source = source;
  }
  onattach() {
    this.update();
  }
  appendRelatedNodeWithIdref(relatedNode, idref) {
    const deferredNode = new SDK.DOMModel.DeferredDOMNode(this.axNode.accessibilityModel().target(), relatedNode.backendDOMNodeId);
    const nodeTreeElement = new AXRelatedNodeSourceTreeElement({ deferredNode, idref }, relatedNode);
    this.appendChild(nodeTreeElement);
  }
  appendIDRefValueElement(value) {
    if (value.value === null) {
      return;
    }
    const relatedNodes = value.relatedNodes || [];
    if (value.value === "") {
      for (const node of relatedNodes) {
        const idref = node.idref || "";
        this.appendRelatedNodeWithIdref(node, idref);
      }
      return;
    }
    const idrefs = value.value.trim().split(/\s+/);
    for (const idref of idrefs) {
      const matchingNode = relatedNodes.find((node) => node.idref === idref);
      if (matchingNode) {
        this.appendRelatedNodeWithIdref(matchingNode, idref);
      } else if (idrefs.length === 1) {
        this.listItemElement.appendChild(new AXRelatedNodeElement({ deferredNode: void 0, idref }).render());
      } else {
        this.appendChild(new AXRelatedNodeSourceTreeElement({ deferredNode: void 0, idref }));
      }
    }
  }
  appendRelatedNodeListValueElement(value) {
    const relatedNodes = value.relatedNodes;
    const numNodes = relatedNodes ? relatedNodes.length : 0;
    if (value.type === "idrefList" || value.type === "idref") {
      this.appendIDRefValueElement(value);
    } else {
      super.appendRelatedNodeListValueElement(value);
    }
    if (numNodes <= 3) {
      this.expand();
    } else {
      this.collapse();
    }
  }
  appendSourceNameElement(source) {
    const nameElement = document.createElement("span");
    const type = source.type;
    switch (type) {
      case "attribute":
      case "placeholder":
      case "relatedElement":
        if (source.nativeSource) {
          const nativeSource = source.nativeSource;
          nameElement.textContent = AXNativeSourceTypes[nativeSource].name();
          UI2.Tooltip.Tooltip.install(nameElement, AXNativeSourceTypes[nativeSource].description());
          nameElement.classList.add("ax-readable-name");
          break;
        }
        nameElement.textContent = source.attribute || null;
        nameElement.classList.add("ax-name");
        nameElement.classList.add("monospace");
        break;
      default:
        if (type in AXSourceTypes) {
          nameElement.textContent = AXSourceTypes[type].name();
          UI2.Tooltip.Tooltip.install(nameElement, AXSourceTypes[type].description());
          nameElement.classList.add("ax-readable-name");
        } else {
          console.warn(type, "not in AXSourceTypes");
          nameElement.textContent = type;
        }
    }
    this.listItemElement.appendChild(nameElement);
  }
  update() {
    this.listItemElement.removeChildren();
    if (this.source.invalid) {
      const exclamationMark = AXNodePropertyTreeElement.createExclamationMark(i18nString(UIStrings2.invalidSource));
      this.listItemElement.appendChild(exclamationMark);
      this.listItemElement.classList.add("ax-value-source-invalid");
    } else if (this.source.superseded) {
      this.listItemElement.classList.add("ax-value-source-unused");
    }
    this.appendSourceNameElement(this.source);
    this.listItemElement.createChild("span", "separator").textContent = ":\xA0";
    if (this.source.attributeValue) {
      this.appendValueElement(this.source.attributeValue);
      UI2.UIUtils.createTextChild(this.listItemElement, "\xA0");
    } else if (this.source.nativeSourceValue) {
      this.appendValueElement(this.source.nativeSourceValue);
      UI2.UIUtils.createTextChild(this.listItemElement, "\xA0");
      if (this.source.value) {
        this.appendValueElement(this.source.value);
      }
    } else if (this.source.value) {
      this.appendValueElement(this.source.value);
    } else {
      const valueElement = AXNodePropertyTreeElement.createSimpleValueElement("valueUndefined", i18nString(UIStrings2.notSpecified));
      this.listItemElement.appendChild(valueElement);
      this.listItemElement.classList.add("ax-value-source-unused");
    }
    if (this.source.value && this.source.superseded) {
      this.listItemElement.classList.add("ax-value-source-superseded");
    }
  }
};
var AXRelatedNodeSourceTreeElement = class extends UI2.TreeOutline.TreeElement {
  value;
  axRelatedNodeElement;
  constructor(node, value) {
    super("");
    this.value = value;
    this.axRelatedNodeElement = new AXRelatedNodeElement(node);
    this.selectable = true;
  }
  onattach() {
    this.listItemElement.appendChild(this.axRelatedNodeElement.render());
    if (!this.value) {
      return;
    }
    if (this.value.text) {
      this.listItemElement.appendChild(AXNodePropertyTreeElement.createSimpleValueElement("computedString", this.value.text));
    }
  }
  onenter() {
    this.axRelatedNodeElement.revealNode();
    return true;
  }
};
var AXRelatedNodeElement = class {
  deferredNode;
  idref;
  constructor(node) {
    this.deferredNode = node.deferredNode;
    this.idref = node.idref;
  }
  render() {
    const element = document.createElement("span");
    if (this.deferredNode) {
      const valueElement = document.createElement("span");
      element.appendChild(valueElement);
      void this.deferredNode.resolvePromise().then((node) => {
        void Common.Linkifier.Linkifier.linkify(node, { tooltip: void 0, preventKeyboardFocus: true }).then((linkfied) => valueElement.appendChild(linkfied));
      });
    } else if (this.idref) {
      element.classList.add("invalid");
      const valueElement = AXNodePropertyTreeElement.createExclamationMark(i18nString(UIStrings2.noNodeWithThisId));
      UI2.UIUtils.createTextChild(valueElement, this.idref);
      element.appendChild(valueElement);
    }
    return element;
  }
  /**
   * Attempts to cause the node referred to by the related node to be selected in the tree.
   */
  revealNode() {
    if (this.deferredNode) {
      void this.deferredNode.resolvePromise().then((node) => Common.Revealer.reveal(node));
    }
  }
};
var AXNodeIgnoredReasonTreeElement = class _AXNodeIgnoredReasonTreeElement extends AXNodePropertyTreeElement {
  property;
  toggleOnClick;
  reasonElement;
  constructor(property, axNode) {
    super(axNode);
    this.property = property;
    this.axNode = axNode;
    this.toggleOnClick = true;
    this.selectable = false;
  }
  static createReasonElement(reason, axNode) {
    let reasonElement = null;
    switch (reason) {
      case "activeModalDialog":
        reasonElement = i18n3.i18n.getFormatLocalizedString(str_2, UIStrings2.elementIsHiddenBy, {});
        break;
      case "hiddenByChildTree":
        reasonElement = i18n3.i18n.getFormatLocalizedString(str_2, UIStrings2.elementIsHiddenByChildTree, {});
        break;
      case "ancestorIsLeafNode":
        reasonElement = i18n3.i18n.getFormatLocalizedString(str_2, UIStrings2.ancestorChildrenAreAll, {});
        break;
      case "ariaHiddenElement": {
        const ariaHiddenSpan = document.createElement("span", { is: "source-code" }).textContent = "aria-hidden";
        reasonElement = i18n3.i18n.getFormatLocalizedString(str_2, UIStrings2.elementIsPlaceholder, { PH1: ariaHiddenSpan });
        break;
      }
      case "ariaHiddenSubtree": {
        const ariaHiddenSpan = document.createElement("span", { is: "source-code" }).textContent = "aria-hidden";
        const trueSpan = document.createElement("span", { is: "source-code" }).textContent = "true";
        reasonElement = i18n3.i18n.getFormatLocalizedString(str_2, UIStrings2.placeholderIsPlaceholderOnAncestor, { PH1: ariaHiddenSpan, PH2: trueSpan });
        break;
      }
      case "emptyAlt":
        reasonElement = i18n3.i18n.getFormatLocalizedString(str_2, UIStrings2.elementHasEmptyAltText, {});
        break;
      case "emptyText":
        reasonElement = i18n3.i18n.getFormatLocalizedString(str_2, UIStrings2.noTextContent, {});
        break;
      case "inertElement":
        reasonElement = i18n3.i18n.getFormatLocalizedString(str_2, UIStrings2.elementIsInert, {});
        break;
      case "inertSubtree":
        reasonElement = i18n3.i18n.getFormatLocalizedString(str_2, UIStrings2.elementIsInAnInertSubTree, {});
        break;
      case "inheritsPresentation":
        reasonElement = i18n3.i18n.getFormatLocalizedString(str_2, UIStrings2.elementsInheritsPresentational, {});
        break;
      case "labelContainer":
        reasonElement = i18n3.i18n.getFormatLocalizedString(str_2, UIStrings2.partOfLabelElement, {});
        break;
      case "labelFor":
        reasonElement = i18n3.i18n.getFormatLocalizedString(str_2, UIStrings2.labelFor, {});
        break;
      case "notRendered":
        reasonElement = i18n3.i18n.getFormatLocalizedString(str_2, UIStrings2.elementIsNotRendered, {});
        break;
      case "notVisible":
        reasonElement = i18n3.i18n.getFormatLocalizedString(str_2, UIStrings2.elementIsNotVisible, {});
        break;
      case "presentationalRole": {
        const role = axNode?.role()?.value || "";
        const rolePresentationSpan = document.createElement("span", { is: "source-code" }).textContent = "role=" + role;
        reasonElement = i18n3.i18n.getFormatLocalizedString(str_2, UIStrings2.elementHasPlaceholder, { PH1: rolePresentationSpan });
        break;
      }
      case "probablyPresentational":
        reasonElement = i18n3.i18n.getFormatLocalizedString(str_2, UIStrings2.elementIsPresentational, {});
        break;
      case "uninteresting":
        reasonElement = i18n3.i18n.getFormatLocalizedString(str_2, UIStrings2.elementNotInteresting, {});
        break;
    }
    if (reasonElement) {
      reasonElement.classList.add("ax-reason");
    }
    return reasonElement;
  }
  onattach() {
    this.listItemElement.removeChildren();
    this.reasonElement = _AXNodeIgnoredReasonTreeElement.createReasonElement(this.property.name, this.axNode);
    if (this.reasonElement) {
      this.listItemElement.appendChild(this.reasonElement);
    }
    const value = this.property.value;
    if (value.type === "idref") {
      this.appendRelatedNodeListValueElement(value);
    }
  }
};

// gen/front_end/panels/accessibility/AccessibilitySidebarView.js
var AccessibilitySidebarView_exports = {};
__export(AccessibilitySidebarView_exports, {
  AccessibilitySidebarView: () => AccessibilitySidebarView
});
import * as Root2 from "./../../core/root/root.js";
import * as SDK3 from "./../../core/sdk/sdk.js";
import * as UI5 from "./../../ui/legacy/legacy.js";

// gen/front_end/panels/accessibility/ARIAAttributesView.js
var ARIAAttributesView_exports = {};
__export(ARIAAttributesView_exports, {
  ARIAAttributePrompt: () => ARIAAttributePrompt,
  ARIAAttributesPane: () => ARIAAttributesPane,
  ARIAAttributesTreeElement: () => ARIAAttributesTreeElement
});
import * as i18n5 from "./../../core/i18n/i18n.js";
import * as Platform from "./../../core/platform/platform.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
import * as VisualLogging2 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/accessibility/ARIAMetadata.js
var ARIAMetadata_exports = {};
__export(ARIAMetadata_exports, {
  ARIAMetadata: () => ARIAMetadata,
  Attribute: () => Attribute,
  ariaMetadata: () => ariaMetadata
});

// gen/front_end/generated/ARIAProperties.js
var config = {
  "attributes": [
    {
      "name": "aria-actions",
      "type": "IDREF_list"
    },
    {
      "name": "aria-activedescendant",
      "type": "IDREF"
    },
    {
      "default": "false",
      "name": "aria-atomic",
      "type": "boolean"
    },
    {
      "default": "none",
      "enum": [
        "inline",
        "list",
        "both",
        "none"
      ],
      "name": "aria-autocomplete",
      "type": "token"
    },
    {
      "name": "aria-braillelabel",
      "type": "string"
    },
    {
      "name": "aria-brailleroledescription",
      "type": "string"
    },
    {
      "default": "false",
      "name": "aria-busy",
      "type": "boolean"
    },
    {
      "default": "undefined",
      "enum": [
        "true",
        "false",
        "mixed",
        "undefined"
      ],
      "name": "aria-checked",
      "type": "token"
    },
    {
      "name": "aria-colcount",
      "type": "integer"
    },
    {
      "name": "aria-colindex",
      "type": "integer"
    },
    {
      "name": "aria-colindextext",
      "type": "string"
    },
    {
      "name": "aria-colspan",
      "type": "integer"
    },
    {
      "name": "aria-controls",
      "type": "IDREF_list"
    },
    {
      "default": "false",
      "enum": [
        "page",
        "step",
        "location",
        "date",
        "time",
        "true",
        "false"
      ],
      "name": "aria-current",
      "type": "token"
    },
    {
      "name": "aria-describedby",
      "type": "IDREF_list"
    },
    {
      "name": "aria-description",
      "type": "string"
    },
    {
      "name": "aria-details",
      "type": "IDREF"
    },
    {
      "default": "false",
      "name": "aria-disabled",
      "type": "boolean"
    },
    {
      "name": "aria-errormessage",
      "type": "IDREF"
    },
    {
      "default": "undefined",
      "enum": [
        "true",
        "false",
        "undefined"
      ],
      "name": "aria-expanded",
      "type": "token"
    },
    {
      "name": "aria-flowto",
      "type": "IDREF_list"
    },
    {
      "default": "false",
      "enum": [
        "false",
        "true",
        "menu",
        "listbox",
        "tree",
        "grid",
        "dialog"
      ],
      "name": "aria-haspopup",
      "type": "token"
    },
    {
      "default": "undefined",
      "enum": [
        "true",
        "false",
        "undefined"
      ],
      "name": "aria-hidden",
      "type": "token"
    },
    {
      "default": "false",
      "enum": [
        "grammar",
        "false",
        "spelling",
        "true"
      ],
      "name": "aria-invalid",
      "type": "token"
    },
    {
      "name": "aria-keyshortcuts",
      "type": "string"
    },
    {
      "name": "aria-label",
      "type": "string"
    },
    {
      "name": "aria-labelledby",
      "type": "IDREF_list"
    },
    {
      "name": "aria-labeledby",
      "type": "IDREF_list"
    },
    {
      "name": "aria-level",
      "type": "integer"
    },
    {
      "default": "off",
      "enum": [
        "off",
        "polite",
        "assertive"
      ],
      "name": "aria-live",
      "type": "token"
    },
    {
      "default": "false",
      "name": "aria-modal",
      "type": "boolean"
    },
    {
      "default": "false",
      "name": "aria-multiline",
      "type": "boolean"
    },
    {
      "default": "false",
      "name": "aria-multiselectable",
      "type": "boolean"
    },
    {
      "default": "undefined",
      "enum": [
        "horizontal",
        "undefined",
        "vertical"
      ],
      "name": "aria-orientation",
      "type": "token"
    },
    {
      "name": "aria-owns",
      "type": "IDREF_list"
    },
    {
      "name": "aria-placeholder",
      "type": "string"
    },
    {
      "name": "aria-posinset",
      "type": "integer"
    },
    {
      "default": "undefined",
      "enum": [
        "true",
        "false",
        "mixed",
        "undefined"
      ],
      "name": "aria-pressed",
      "type": "token"
    },
    {
      "default": "false",
      "name": "aria-readonly",
      "type": "boolean"
    },
    {
      "default": "additions text",
      "enum": [
        "additions",
        "removals",
        "text",
        "all"
      ],
      "name": "aria-relevant",
      "type": "token_list"
    },
    {
      "default": "false",
      "name": "aria-required",
      "type": "boolean"
    },
    {
      "name": "aria-roledescription",
      "type": "string"
    },
    {
      "name": "aria-rowcount",
      "type": "integer"
    },
    {
      "name": "aria-rowindex",
      "type": "integer"
    },
    {
      "name": "aria-rowindextext",
      "type": "string"
    },
    {
      "name": "aria-rowspan",
      "type": "integer"
    },
    {
      "default": "undefined",
      "enum": [
        "true",
        "false",
        "undefined"
      ],
      "name": "aria-selected",
      "type": "token"
    },
    {
      "name": "aria-setsize",
      "type": "integer"
    },
    {
      "default": "none",
      "enum": [
        "ascending",
        "descending",
        "none",
        "other"
      ],
      "name": "aria-sort",
      "type": "token"
    },
    {
      "name": "aria-valuemax",
      "type": "decimal"
    },
    {
      "name": "aria-valuemin",
      "type": "decimal"
    },
    {
      "name": "aria-valuenow",
      "type": "decimal"
    },
    {
      "name": "aria-valuetext",
      "type": "string"
    },
    {
      "name": "aria-virtualcontent",
      "type": "string"
    }
  ],
  "metadata": {
    "attrsNullNamespace": true,
    "export": "CORE_EXPORT",
    "namespace": "HTML",
    "namespacePrefix": "xhtml",
    "namespaceURI": "http://www.w3.org/1999/xhtml"
  },
  "roles": [
    {
      "implicitValues": {
        "aria-atomic": "true",
        "aria-live": "assertive"
      },
      "name": "alert",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "name": "alertdialog",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "alert",
        "dialog"
      ]
    },
    {
      "name": "application",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "structure"
      ]
    },
    {
      "name": "article",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "document"
      ],
      "supportedAttributes": [
        "aria-posinset",
        "aria-setsize"
      ]
    },
    {
      "name": "banner",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "childrenPresentational": true,
      "name": "button",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "command"
      ],
      "supportedAttributes": [
        "aria-expanded",
        "aria-pressed"
      ]
    },
    {
      "name": "cell",
      "namefrom": [
        "contents",
        "author"
      ],
      "scope": "row",
      "superclasses": [
        "section"
      ],
      "supportedAttributes": [
        "aria-colindex",
        "aria-colspan",
        "aria-rowindex",
        "aria-rowspan"
      ]
    },
    {
      "implicitValues": {
        "aria-checked": false
      },
      "name": "checkbox",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "requiredAttributes": [
        "aria-checked"
      ],
      "superclasses": [
        "input"
      ],
      "supportedAttributes": [
        "aria-readonly"
      ]
    },
    {
      "name": "columnheader",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "scope": [
        "row"
      ],
      "superclasses": [
        "gridcell",
        "sectionhead",
        "widget"
      ],
      "supportedAttributes": [
        "aria-sort"
      ]
    },
    {
      "implicitValues": {
        "aria-expanded": "false",
        "aria-haspopup": "listbox"
      },
      "mustContain": [
        "textbox"
      ],
      "name": "combobox",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "requiredAttributes": [
        "aria-controls",
        "aria-expanded"
      ],
      "superclasses": [
        "select"
      ],
      "supportedAttributes": [
        "aria-autocomplete",
        "aria-readonly",
        "aria-required"
      ]
    },
    {
      "abstract": true,
      "name": "command",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "widget"
      ]
    },
    {
      "name": "complementary",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "abstract": true,
      "name": "composite",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "widget"
      ],
      "supportedAttributes": [
        "aria-activedescendant"
      ]
    },
    {
      "name": "contentinfo",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "name": "definition",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "name": "dialog",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "window"
      ]
    },
    {
      "name": "directory",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "list"
      ]
    },
    {
      "name": "document",
      "nameFrom": [
        "author"
      ],
      "nameRequired": false,
      "superclasses": [
        "structure"
      ],
      "supportedAttributes": [
        "aria-expanded"
      ]
    },
    {
      "mustContain": [
        "article"
      ],
      "name": "feed",
      "nameFrom": [
        "author"
      ],
      "nameRequired": false,
      "superclasses": [
        "list"
      ]
    },
    {
      "name": "figure",
      "nameRequired": false,
      "namefrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "name": "form",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "mustContain": [
        "row"
      ],
      "name": "grid",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "composite",
        "table"
      ],
      "supportedAttributes": [
        "aria-level",
        "aria-multiselectable",
        "aria-readonly"
      ]
    },
    {
      "name": "gridcell",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "scope": [
        "row"
      ],
      "superclasses": [
        "cell",
        "widget"
      ],
      "supportedAttributes": [
        "aria-readonly",
        "aria-required",
        "aria-selected"
      ]
    },
    {
      "name": "group",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ],
      "supportedAttributes": [
        "aria-activedescendant"
      ]
    },
    {
      "implicitValues": {
        "aria-level": "2"
      },
      "name": "heading",
      "nameRequired": true,
      "namefrom": [
        "contents",
        "author"
      ],
      "superclasses": [
        "sectionhead"
      ],
      "supportedAttributes": [
        "aria-level"
      ]
    },
    {
      "childrenPresentational": true,
      "name": "img",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "section"
      ]
    },
    {
      "abstract": true,
      "name": "input",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "widget"
      ]
    },
    {
      "abstract": true,
      "name": "landmark",
      "nameFrom": [
        "author"
      ],
      "nameRequired": false,
      "superclasses": [
        "section"
      ]
    },
    {
      "name": "link",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "command"
      ],
      "supportedAttributes": [
        "aria-expanded"
      ]
    },
    {
      "implicitValues": {
        "aria-orientation": "vertical"
      },
      "mustContain": [
        "listitem"
      ],
      "name": "list",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "implicitValues": {
        "aria-orientation": "vertical"
      },
      "mustContain": [
        "option"
      ],
      "name": "listbox",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "select"
      ],
      "supportedAttributes": [
        "aria-multiselectable",
        "aria-readonly",
        "aria-required"
      ]
    },
    {
      "name": "listitem",
      "nameFrom": [
        "author"
      ],
      "scope": [
        "group",
        "list"
      ],
      "superclasses": [
        "section"
      ],
      "supportedAttributes": [
        "aria-level",
        "aria-posinset",
        "aria-setsize"
      ]
    },
    {
      "implicitValues": {
        "aria-live": "polite"
      },
      "name": "log",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "section"
      ]
    },
    {
      "name": "main",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "name": "marquee",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "section"
      ]
    },
    {
      "childrenPresentational": true,
      "name": "math",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "section"
      ]
    },
    {
      "implicitValues": {
        "aria-orientation": "vertical"
      },
      "mustContain": [
        "group",
        "menuitemradio",
        "menuitem",
        "menuitemcheckbox",
        "menuitemradio"
      ],
      "name": "menu",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "select"
      ]
    },
    {
      "implicitValues": {
        "aria-orientation": "horizontal"
      },
      "mustContain": [
        "menuitem",
        "menuitemradio",
        "menuitemcheckbox"
      ],
      "name": "menubar",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "menu"
      ]
    },
    {
      "name": "menuitem",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "scope": [
        "group",
        "menu",
        "menubar"
      ],
      "superclasses": [
        "command"
      ]
    },
    {
      "childrenPresentational": true,
      "implicitValues": {
        "aria-checked": false
      },
      "name": "menuitemcheckbox",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "scope": [
        "menu",
        "menubar"
      ],
      "superclasses": [
        "checkbox",
        "menuitem"
      ]
    },
    {
      "childrenPresentational": true,
      "implicitValues": {
        "aria-checked": false
      },
      "name": "menuitemradio",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "scope": [
        "menu",
        "menubar",
        "group"
      ],
      "superclasses": [
        "menuitemcheckbox",
        "radio"
      ]
    },
    {
      "name": "navigation",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "name": "none",
      "superclasses": [
        "structure"
      ]
    },
    {
      "name": "note",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "childrenPresentational": true,
      "implicitValues": {
        "aria-selected": "false"
      },
      "name": "option",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "requiredAttributes": [
        "aria-selected"
      ],
      "scope": [
        "listbox"
      ],
      "superclasses": [
        "input"
      ],
      "supportedAttributes": [
        "aria-checked",
        "aria-posinset",
        "aria-setsize"
      ]
    },
    {
      "name": "presentation",
      "superclasses": [
        "structure"
      ]
    },
    {
      "childrenPresentational": true,
      "name": "progressbar",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "range"
      ]
    },
    {
      "childrenPresentational": true,
      "implicitValues": {
        "aria-checked": "false"
      },
      "name": "radio",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "requiredAttributes": [
        "aria-checked"
      ],
      "superclasses": [
        "input"
      ],
      "supportedAttributes": [
        "aria-posinset",
        "aria-setsize"
      ]
    },
    {
      "mustContain": [
        "radio"
      ],
      "name": "radiogroup",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "select"
      ],
      "supportedAttributes": [
        "aria-readonly",
        "aria-required"
      ]
    },
    {
      "abstract": true,
      "name": "range",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "widget"
      ],
      "supportedAttributes": [
        "aria-valuemax",
        "aria-valuemin",
        "aria-valuenow",
        "aria-valuetext"
      ]
    },
    {
      "name": "region",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "landmark"
      ]
    },
    {
      "abstract": true,
      "name": "roletype",
      "supportedAttributes": [
        "aria-atomic",
        "aria-busy",
        "aria-controls",
        "aria-current",
        "aria-describedby",
        "aria-details",
        "aria-disabled",
        "aria-dropeffect",
        "aria-errormessage",
        "aria-flowto",
        "aria-grabbed",
        "aria-haspopup",
        "aria-hidden",
        "aria-invalid",
        "aria-keyshortcuts",
        "aria-label",
        "aria-labelledby",
        "aria-live",
        "aria-owns",
        "aria-relevant",
        "aria-roledescription"
      ]
    },
    {
      "mustContain": [
        "cell",
        "columnheader",
        "gridcell",
        "rowheader"
      ],
      "name": "row",
      "nameFrom": [
        "contents",
        "author"
      ],
      "scope": [
        "grid",
        "rowgroup",
        "table",
        "treegrid"
      ],
      "superclasses": [
        "group",
        "widget"
      ],
      "supportedAttributes": [
        "aria-colindex",
        "aria-level",
        "aria-rowindex",
        "aria-selected",
        "aria-setsize",
        "aria-posinset"
      ]
    },
    {
      "mustContain": [
        "row"
      ],
      "name": "rowgroup",
      "nameFrom": [
        "contents",
        "author"
      ],
      "scope": [
        "grid",
        "table",
        "treegrid"
      ],
      "superclasses": [
        "structure"
      ]
    },
    {
      "name": "rowheader",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "scope": [
        "row"
      ],
      "superclasses": [
        "cell",
        "gridcell",
        "sectionhead"
      ],
      "supportedAttributes": [
        "aria-sort"
      ]
    },
    {
      "childrenPresentational": true,
      "implicitValues": {
        "aria-orientation": "vertical",
        "aria-valuemax": "100",
        "aria-valuemin": "0"
      },
      "name": "scrollbar",
      "nameFrom": [
        "author"
      ],
      "nameRequired": false,
      "requiredAttributes": [
        "aria-controls",
        "aria-orientation",
        "aria-valuemax",
        "aria-valuemin",
        "aria-valuenow"
      ],
      "superclasses": [
        "range"
      ]
    },
    {
      "name": "search",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "landmark"
      ]
    },
    {
      "name": "searchbox",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "textbox"
      ]
    },
    {
      "abstract": true,
      "name": "section",
      "superclasses": [
        "structure"
      ],
      "supportedAttributes": [
        "aria-expanded"
      ]
    },
    {
      "abstract": true,
      "name": "sectionhead",
      "nameFrom": [
        "contents",
        "author"
      ],
      "superclasses": [
        "structure"
      ],
      "supportedAttributes": [
        "aria-expanded"
      ]
    },
    {
      "abstract": true,
      "name": "select",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "composite",
        "group"
      ]
    },
    {
      "name": "separator",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "structure"
      ],
      "supportedAttributes": [
        "aria-orientation",
        "aria-valuemin",
        "aria-valuemax",
        "aria-valuenow",
        "aria-valuetext"
      ]
    },
    {
      "childrenPresentational": true,
      "implicitValues": {
        "aria-orientation": "horizontal",
        "aria-valuemax": "100",
        "aria-valuemin": "0"
      },
      "name": "slider",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "requiredAttributes": [
        "aria-valuemax",
        "aria-valuemin",
        "aria-valuenow"
      ],
      "superclasses": [
        "input",
        "range"
      ],
      "supportedAttributes": [
        "aria-orientation"
      ]
    },
    {
      "implicitValues": {
        "aria-valuenow": "0"
      },
      "name": "spinbutton",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "requiredAttributes": [
        "aria-valuemax",
        "aria-valuemin",
        "aria-valuenow"
      ],
      "superclasses": [
        "composite",
        "input",
        "range"
      ],
      "supportedAttributes": [
        "aria-required",
        "aria-readonly"
      ]
    },
    {
      "implicitValues": {
        "aria-atomic": "true",
        "aria-live": "polite"
      },
      "name": "status",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "abstract": true,
      "name": "structure",
      "superclasses": [
        "roletype"
      ]
    },
    {
      "childrenPresentational": true,
      "implicitValues": {
        "aria-checked": "false"
      },
      "name": "switch",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "requiredAttributes": [
        "aria-checked"
      ],
      "superclasses": [
        "checkbox"
      ]
    },
    {
      "childrenPresentational": true,
      "implicitValues": {
        "aria-selected": "false"
      },
      "name": "tab",
      "nameFrom": [
        "contents",
        "author"
      ],
      "scope": [
        "tablist"
      ],
      "superclasses": [
        "sectionhead",
        "widget"
      ],
      "supportedAttributes": [
        "aria-selected"
      ]
    },
    {
      "mustContain": [
        "row"
      ],
      "name": "table",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "section"
      ],
      "supportedAttributes": [
        "aria-colcount",
        "aria-rowcount"
      ]
    },
    {
      "implicitValues": {
        "aria-orientation": "horizontal"
      },
      "mustContain": [
        "tab"
      ],
      "name": "tablist",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "composite"
      ],
      "supportedAttributes": [
        "aria-level",
        "aria-multiselectable",
        "aria-orientation"
      ]
    },
    {
      "name": "tabpanel",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "section"
      ]
    },
    {
      "name": "term",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "section"
      ]
    },
    {
      "name": "textbox",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "input"
      ],
      "supportedAttributes": [
        "aria-activedescendant",
        "aria-autocomplete",
        "aria-multiline",
        "aria-placeholder",
        "aria-readonly",
        "aria-required"
      ]
    },
    {
      "name": "timer",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "status"
      ]
    },
    {
      "implicitValues": {
        "aria-orientation": "horizontal"
      },
      "name": "toolbar",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "group"
      ],
      "supportedAttributes": [
        "aria-orientation"
      ]
    },
    {
      "name": "tooltip",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "section"
      ]
    },
    {
      "implicitValues": {
        "aria-orientation": "vertical"
      },
      "mustContain": [
        "group",
        "treeitem"
      ],
      "name": "tree",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "select"
      ],
      "supportedAttributes": [
        "aria-multiselectable",
        "aria-required"
      ]
    },
    {
      "mustContain": [
        "row"
      ],
      "name": "treegrid",
      "nameFrom": [
        "author"
      ],
      "nameRequired": true,
      "superclasses": [
        "grid",
        "tree"
      ]
    },
    {
      "name": "treeitem",
      "nameFrom": [
        "contents",
        "author"
      ],
      "nameRequired": true,
      "scope": [
        "group",
        "tree"
      ],
      "superclasses": [
        "listitem",
        "option"
      ]
    },
    {
      "abstract": true,
      "name": "widget",
      "superclasses": [
        "roletype"
      ]
    },
    {
      "abstract": true,
      "name": "window",
      "nameFrom": [
        "author"
      ],
      "superclasses": [
        "roletype"
      ],
      "supportedAttributes": [
        "aria-expanded",
        "aria-modal"
      ]
    }
  ]
};

// gen/front_end/panels/accessibility/ARIAMetadata.js
var ARIAMetadata = class {
  attributes;
  roleNames;
  constructor(config2) {
    this.attributes = /* @__PURE__ */ new Map();
    this.roleNames = [];
    if (config2) {
      this.initialize(config2);
    }
  }
  initialize(config2) {
    const attributes = config2["attributes"];
    const booleanEnum = ["true", "false"];
    for (const attributeConfig of attributes) {
      if (attributeConfig.type === "boolean") {
        attributeConfig.enum = booleanEnum;
      }
      this.attributes.set(attributeConfig.name, new Attribute(attributeConfig));
    }
    this.roleNames = config2["roles"].map((roleConfig) => roleConfig.name);
  }
  valuesForProperty(property) {
    const attribute = this.attributes.get(property);
    if (attribute) {
      return attribute.getEnum();
    }
    if (property === "role") {
      return this.roleNames;
    }
    return [];
  }
};
var instance;
function ariaMetadata() {
  if (!instance) {
    instance = new ARIAMetadata(config || null);
  }
  return instance;
}
var Attribute = class {
  enum;
  constructor(config2) {
    this.enum = [];
    if (config2.enum) {
      this.enum = config2.enum;
    }
  }
  getEnum() {
    return this.enum;
  }
};

// gen/front_end/panels/accessibility/ARIAAttributesView.js
var UIStrings3 = {
  /**
   * @description Text in ARIAAttributes View of the Accessibility panel
   */
  ariaAttributes: "ARIA Attributes",
  /**
   * @description Text in ARIAAttributes View of the Accessibility panel
   */
  noAriaAttributes: "No ARIA attributes"
};
var str_3 = i18n5.i18n.registerUIStrings("panels/accessibility/ARIAAttributesView.ts", UIStrings3);
var i18nString2 = i18n5.i18n.getLocalizedString.bind(void 0, str_3);
var ARIAAttributesPane = class extends AccessibilitySubPane {
  noPropertiesInfo;
  treeOutline;
  constructor() {
    super({
      title: i18nString2(UIStrings3.ariaAttributes),
      viewId: "aria-attributes",
      jslog: `${VisualLogging2.section("aria-attributes")}`
    });
    this.noPropertiesInfo = this.createInfo(i18nString2(UIStrings3.noAriaAttributes));
    this.treeOutline = this.createTreeOutline();
  }
  setNode(node) {
    super.setNode(node);
    this.treeOutline.removeChildren();
    if (!node) {
      return;
    }
    const target = node.domModel().target();
    const attributes = node.attributes();
    for (let i = 0; i < attributes.length; ++i) {
      const attribute = attributes[i];
      if (!this.isARIAAttribute(attribute)) {
        continue;
      }
      this.treeOutline.appendChild(new ARIAAttributesTreeElement(this, attribute, target));
    }
    const foundAttributes = this.treeOutline.rootElement().childCount() !== 0;
    this.noPropertiesInfo.classList.toggle("hidden", foundAttributes);
    this.treeOutline.element.classList.toggle("hidden", !foundAttributes);
  }
  getTreeOutlineForTesting() {
    return this.treeOutline;
  }
  isARIAAttribute(attribute) {
    return ATTRIBUTES.has(attribute.name);
  }
};
var ARIAAttributesTreeElement = class _ARIAAttributesTreeElement extends UI3.TreeOutline.TreeElement {
  parentPane;
  attribute;
  nameElement;
  valueElement;
  prompt;
  constructor(parentPane, attribute, _target) {
    super("");
    this.parentPane = parentPane;
    this.attribute = attribute;
    this.selectable = false;
  }
  static createARIAValueElement(value) {
    const valueElement = document.createElement("span");
    valueElement.classList.add("monospace");
    valueElement.setTextContentTruncatedIfNeeded(value || "");
    return valueElement;
  }
  onattach() {
    this.populateListItem();
    this.listItemElement.addEventListener("click", this.mouseClick.bind(this));
  }
  getPromptForTesting() {
    return this.prompt;
  }
  populateListItem() {
    this.listItemElement.removeChildren();
    this.appendNameElement(this.attribute.name);
    this.listItemElement.createChild("span", "separator").textContent = ":\xA0";
    this.appendAttributeValueElement(this.attribute.value);
  }
  appendNameElement(name) {
    this.nameElement = document.createElement("span");
    this.nameElement.textContent = name;
    this.nameElement.classList.add("ax-name");
    this.nameElement.classList.add("monospace");
    this.listItemElement.appendChild(this.nameElement);
  }
  appendAttributeValueElement(value) {
    this.valueElement = _ARIAAttributesTreeElement.createARIAValueElement(value);
    this.listItemElement.appendChild(this.valueElement);
  }
  mouseClick(event) {
    if (event.target === this.listItemElement) {
      return;
    }
    event.consume(true);
    this.startEditing();
  }
  startEditing() {
    const valueElement = this.valueElement;
    if (!valueElement || UI3.UIUtils.isBeingEdited(valueElement)) {
      return;
    }
    const previousContent = valueElement.textContent || "";
    function blurListener(previousContent2, event) {
      const target = event.target;
      const text = target.textContent || "";
      this.editingCommitted(text, previousContent2);
    }
    const attributeName = this.nameElement.textContent || "";
    this.prompt = new ARIAAttributePrompt(ariaMetadata().valuesForProperty(attributeName));
    this.prompt.setAutocompletionTimeout(0);
    const proxyElement = this.prompt.attachAndStartEditing(valueElement, blurListener.bind(this, previousContent));
    proxyElement.addEventListener("keydown", (event) => this.editingValueKeyDown(previousContent, event), false);
    const selection = valueElement.getComponentSelection();
    if (selection) {
      selection.selectAllChildren(valueElement);
    }
  }
  removePrompt() {
    if (!this.prompt) {
      return;
    }
    this.prompt.detach();
    delete this.prompt;
  }
  editingCommitted(userInput, previousContent) {
    this.removePrompt();
    if (userInput !== previousContent) {
      const node = this.parentPane.node();
      node.setAttributeValue(this.attribute.name, userInput);
    }
  }
  editingCancelled() {
    this.removePrompt();
    this.populateListItem();
  }
  editingValueKeyDown(previousContent, event) {
    if (event.handled) {
      return;
    }
    if (event.key === "Enter") {
      const target = event.target;
      this.editingCommitted(target.textContent || "", previousContent);
      event.consume();
      return;
    }
    if (Platform.KeyboardUtilities.isEscKey(event)) {
      this.editingCancelled();
      event.consume();
      return;
    }
  }
};
var ARIAAttributePrompt = class extends UI3.TextPrompt.TextPrompt {
  ariaCompletions;
  constructor(ariaCompletions) {
    super();
    this.initialize(this.buildPropertyCompletions.bind(this));
    this.ariaCompletions = ariaCompletions;
  }
  async buildPropertyCompletions(expression, prefix, force) {
    prefix = prefix.toLowerCase();
    if (!prefix && !force && expression) {
      return [];
    }
    return this.ariaCompletions.filter((value) => value.startsWith(prefix)).map((c) => {
      return {
        text: c,
        title: void 0,
        subtitle: void 0,
        priority: void 0,
        isSecondary: void 0,
        subtitleRenderer: void 0,
        selectionRange: void 0,
        hideGhostText: void 0,
        iconElement: void 0
      };
    });
  }
};
var ATTRIBUTES = /* @__PURE__ */ new Set([
  "role",
  "aria-activedescendant",
  "aria-atomic",
  "aria-autocomplete",
  "aria-braillelabel",
  "aria-brailleroledescription",
  "aria-busy",
  "aria-checked",
  "aria-colcount",
  "aria-colindex",
  "aria-colindextext",
  "aria-colspan",
  "aria-controls",
  "aria-current",
  "aria-describedby",
  "aria-description",
  "aria-details",
  "aria-disabled",
  "aria-dropeffect",
  "aria-errormessage",
  "aria-expanded",
  "aria-flowto",
  "aria-grabbed",
  "aria-haspopup",
  "aria-hidden",
  "aria-invalid",
  "aria-keyshortcuts",
  "aria-label",
  "aria-labelledby",
  "aria-level",
  "aria-live",
  "aria-modal",
  "aria-multiline",
  "aria-multiselectable",
  "aria-orientation",
  "aria-owns",
  "aria-placeholder",
  "aria-posinset",
  "aria-pressed",
  "aria-readonly",
  "aria-relevant",
  "aria-required",
  "aria-roledescription",
  "aria-rowcount",
  "aria-rowindex",
  "aria-rowindextext",
  "aria-rowspan",
  "aria-selected",
  "aria-setsize",
  "aria-sort",
  "aria-valuemax",
  "aria-valuemin",
  "aria-valuenow",
  "aria-valuetext"
]);

// gen/front_end/panels/accessibility/AXBreadcrumbsPane.js
var AXBreadcrumbsPane_exports = {};
__export(AXBreadcrumbsPane_exports, {
  AXBreadcrumb: () => AXBreadcrumb,
  AXBreadcrumbsPane: () => AXBreadcrumbsPane,
  RoleStyles: () => RoleStyles
});
import * as Common2 from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n7 from "./../../core/i18n/i18n.js";
import * as Root from "./../../core/root/root.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as Feedback from "./../../ui/components/panel_feedback/panel_feedback.js";
import * as UI4 from "./../../ui/legacy/legacy.js";
import * as VisualLogging3 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/accessibility/axBreadcrumbs.css.js
var axBreadcrumbs_css_default = `/*
 * Copyright 2017 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.ax-breadcrumbs-ignored-node {
  font-style: italic;
  opacity: 70%;
}

.ax-breadcrumbs {
  padding-top: 1px;
  margin: 0;
  position: relative;
}

.ax-breadcrumbs .ax-node {
  align-items: center;
  margin-top: 1px;
  min-height: 16px;
  overflow-x: hidden;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 1px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ax-breadcrumbs .ax-node span {
  flex-shrink: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ax-breadcrumbs .ax-node .wrapper {
  padding-left: 12px;
  overflow-x: hidden;
}

.ax-breadcrumbs .ax-node::before {
  mask-image: var(--image-file-arrow-collapse);
  mask-repeat: no-repeat;
  background-color: var(--icon-default);
  content: "";
  text-shadow: none;
  margin-left: -5px;
  margin-top: -2px;
  height: 16px;
  width: 16px;
  position: absolute;
  display: inline-block;
}

.ax-breadcrumbs .ax-node:not(.parent, .children-unloaded)::before {
  background-color: transparent;
}

.ax-breadcrumbs .ax-node.parent::before {
  mask-image: var(--image-file-arrow-drop-down);
}

.ax-breadcrumbs .ax-node.no-dom-node {
  opacity: 70%;
}

.ax-breadcrumbs .ax-node .selection {
  display: none;
  z-index: -1;
}

.ax-breadcrumbs .ax-node.inspected .selection {
  display: block;
  background-color: var(--sys-color-neutral-container);
}

.ax-breadcrumbs .ax-node.inspected:focus .selection {
  background-color: var(--sys-color-tonal-container);
}

.ax-breadcrumbs .ax-node.inspected:focus {
  background-color: var(--sys-color-tonal-container);
  color: var(--sys-color-on-tonal-container);
}

.ax-breadcrumbs .ax-node:not(.inspected):hover {
  background-color: var(--sys-color-state-hover-on-subtle);
}

.ax-breadcrumbs .ax-node:not(.inspected):focus {
  background-color: var(--sys-color-state-focus-highlight);
}

.ax-breadcrumbs .ax-node.inspected:focus * {
  color: inherit;
}

.ax-breadcrumbs .ax-node.preselected:not(.inspected) .selection,
.ax-breadcrumbs .ax-node.hovered:not(.inspected) .selection {
  display: block;
  left: 2px;
  right: 2px;
  background-color: var(--sys-color-state-hover-on-subtle);
  border-radius: 5px;
}

.ax-breadcrumbs .ax-node.preselected:not(.inspected):focus .selection {
  border: 1px solid var(--sys-color-primary);
}

@media (forced-colors: active) {
  .ax-value-source-unused,
  .ax-breadcrumbs .ax-node.children-unloaded::before {
    opacity: 100%;
  }

  .ax-breadcrumbs .ax-node.parent::before,
  .ax-breadcrumbs .ax-node.children-unloaded::before {
    forced-color-adjust: none;
    background-color: ButtonText;
  }

  .ax-breadcrumbs .ax-node.parent.inspected::before,
  .ax-breadcrumbs .ax-node.parent.inspected:focus::before {
    background-color: HighlightText;
  }

  .ax-breadcrumbs .ax-node.inspected .selection {
    forced-color-adjust: none;
    background: Highlight !important; /* stylelint-disable-line declaration-no-important */
  }

  .ax-breadcrumbs .ax-node.inspected .wrapper {
    forced-color-adjust: none;
    color: HighlightText;
  }

  .ax-breadcrumbs .ax-node.preselected:not(.inspected) .selection,
  .ax-breadcrumbs .ax-node.hovered:not(.inspected) .selection,
  .ax-breadcrumbs .ax-node.hovered:not(.inspected) .wrapper,
  .ax-breadcrumbs .ax-node:focus-visible:not(.inspected) .wrapper {
    forced-color-adjust: none;
    background-color: Highlight;
    color: HighlightText;
    border-radius: 0;
  }

  .ax-breadcrumbs .ax-node.parent.hovered:not(.inspected)::before,
  .ax-breadcrumbs .ax-node.parent:focus-visible:not(.inspected)::before,
  .ax-breadcrumbs .ax-node.children-unloaded:focus-visible:not(.inspected)::before,
  .ax-breadcrumbs .ax-node.hovered:not(.inspected).children-unloaded::before {
    background-color: HighlightText;
  }
}

/*# sourceURL=${import.meta.resolve("./axBreadcrumbs.css")} */`;

// gen/front_end/panels/accessibility/AXBreadcrumbsPane.js
var UIStrings4 = {
  /**
   * @description Text in AXBreadcrumbs Pane of the Accessibility panel
   */
  accessibilityTree: "Accessibility Tree",
  /**
   * @description Text to scroll the displayed content into view
   */
  scrollIntoView: "Scroll into view",
  /**
   * @description Ignored node element text content in AXBreadcrumbs Pane of the Accessibility panel
   */
  ignored: "Ignored",
  /**
   * @description Name for experimental tree toggle.
   */
  fullTreeExperimentName: "Enable full-page accessibility tree",
  /**
   * @description Description text for experimental tree toggle.
   */
  fullTreeExperimentDescription: "The accessibility tree moved to the top right corner of the DOM tree.",
  /**
   * @description Message saying that DevTools must be restarted before the experiment is enabled.
   */
  reloadRequired: "Reload required before the change takes effect"
};
var str_4 = i18n7.i18n.registerUIStrings("panels/accessibility/AXBreadcrumbsPane.ts", UIStrings4);
var i18nString3 = i18n7.i18n.getLocalizedString.bind(void 0, str_4);
var AXBreadcrumbsPane = class extends AccessibilitySubPane {
  axSidebarView;
  preselectedBreadcrumb;
  inspectedNodeBreadcrumb;
  collapsingBreadcrumbId;
  hoveredBreadcrumb;
  rootElement;
  #legacyTreeDisabled = false;
  constructor(axSidebarView) {
    super({
      title: i18nString3(UIStrings4.accessibilityTree),
      viewId: "accessibility-tree",
      jslog: `${VisualLogging3.section("accessibility-tree")}`
    });
    this.registerRequiredCSS(axBreadcrumbs_css_default);
    this.element.classList.add("ax-subpane");
    this.element.tabIndex = -1;
    this.axSidebarView = axSidebarView;
    this.preselectedBreadcrumb = null;
    this.inspectedNodeBreadcrumb = null;
    this.collapsingBreadcrumbId = -1;
    this.rootElement = this.element.createChild("div", "ax-breadcrumbs");
    this.hoveredBreadcrumb = null;
    const previewToggle = new Feedback.PreviewToggle.PreviewToggle();
    previewToggle.setAttribute("jslog", `${VisualLogging3.toggle("full-accessibility-tree")}`);
    const name = i18nString3(UIStrings4.fullTreeExperimentName);
    const experiment = "full-accessibility-tree";
    const onChangeCallback = (checked) => {
      Host.userMetrics.experimentChanged(experiment, checked);
      UI4.InspectorView.InspectorView.instance().displayReloadRequiredWarning(i18nString3(UIStrings4.reloadRequired));
    };
    if (Root.Runtime.experiments.isEnabled(experiment)) {
      this.#legacyTreeDisabled = true;
      const feedbackURL = "https://g.co/devtools/a11y-tree-feedback";
      previewToggle.data = {
        name,
        helperText: i18nString3(UIStrings4.fullTreeExperimentDescription),
        feedbackURL,
        experiment,
        onChangeCallback
      };
      this.element.appendChild(previewToggle);
      return;
    }
    previewToggle.data = { name, helperText: null, feedbackURL: null, experiment, onChangeCallback };
    this.element.prepend(previewToggle);
    UI4.ARIAUtils.markAsTree(this.rootElement);
    this.rootElement.addEventListener("keydown", this.onKeyDown.bind(this), true);
    this.rootElement.addEventListener("mousemove", this.onMouseMove.bind(this), false);
    this.rootElement.addEventListener("mouseleave", this.onMouseLeave.bind(this), false);
    this.rootElement.addEventListener("click", this.onClick.bind(this), false);
    this.rootElement.addEventListener("contextmenu", this.contextMenuEventFired.bind(this), false);
    this.rootElement.addEventListener("focusout", this.onFocusOut.bind(this), false);
  }
  focus() {
    if (this.inspectedNodeBreadcrumb) {
      this.inspectedNodeBreadcrumb.nodeElement().focus();
    } else {
      this.element.focus();
    }
  }
  setAXNode(axNode) {
    if (this.#legacyTreeDisabled) {
      return;
    }
    const hadFocus = this.element.hasFocus();
    super.setAXNode(axNode);
    this.rootElement.removeChildren();
    if (!axNode) {
      return;
    }
    const ancestorChain = [];
    let ancestor = axNode;
    while (ancestor) {
      ancestorChain.push(ancestor);
      ancestor = ancestor.parentNode();
    }
    ancestorChain.reverse();
    let depth = 0;
    let parent = null;
    this.inspectedNodeBreadcrumb = null;
    for (ancestor of ancestorChain) {
      if (ancestor !== axNode && ancestor.ignored() && ancestor.parentNode()) {
        continue;
      }
      const breadcrumb = new AXBreadcrumb(ancestor, depth, ancestor === axNode);
      if (parent) {
        parent.appendChild(breadcrumb);
      } else {
        this.rootElement.appendChild(breadcrumb.element());
      }
      parent = breadcrumb;
      depth++;
      this.inspectedNodeBreadcrumb = breadcrumb;
    }
    if (this.inspectedNodeBreadcrumb) {
      this.inspectedNodeBreadcrumb.setPreselected(true, hadFocus);
    }
    this.setPreselectedBreadcrumb(this.inspectedNodeBreadcrumb);
    function append(parentBreadcrumb, axNode2, localDepth) {
      if (axNode2.ignored()) {
        axNode2.children().map((child) => append(parentBreadcrumb, child, localDepth));
        return;
      }
      const childBreadcrumb = new AXBreadcrumb(axNode2, localDepth, false);
      parentBreadcrumb.appendChild(childBreadcrumb);
      for (const child of axNode2.children()) {
        append(childBreadcrumb, child, localDepth + 1);
      }
    }
    if (this.inspectedNodeBreadcrumb && !axNode.ignored()) {
      for (const child of axNode.children()) {
        append(this.inspectedNodeBreadcrumb, child, depth);
        if (child.backendDOMNodeId() === this.collapsingBreadcrumbId) {
          this.setPreselectedBreadcrumb(this.inspectedNodeBreadcrumb.lastChild());
        }
      }
    }
    this.collapsingBreadcrumbId = -1;
  }
  willHide() {
    this.setPreselectedBreadcrumb(null);
  }
  onKeyDown(event) {
    const preselectedBreadcrumb = this.preselectedBreadcrumb;
    if (!preselectedBreadcrumb) {
      return;
    }
    const keyboardEvent = event;
    if (!keyboardEvent.composedPath().some((element) => element === preselectedBreadcrumb.element())) {
      return;
    }
    if (keyboardEvent.shiftKey || keyboardEvent.metaKey || keyboardEvent.ctrlKey) {
      return;
    }
    let handled = false;
    if (keyboardEvent.key === "ArrowUp" && !keyboardEvent.altKey) {
      handled = this.preselectPrevious();
    } else if (keyboardEvent.key === "ArrowDown" && !keyboardEvent.altKey) {
      handled = this.preselectNext();
    } else if (keyboardEvent.key === "ArrowLeft" && !keyboardEvent.altKey) {
      if (preselectedBreadcrumb.hasExpandedChildren()) {
        this.collapseBreadcrumb(preselectedBreadcrumb);
      } else {
        handled = this.preselectParent();
      }
    } else if (keyboardEvent.key === "Enter" || keyboardEvent.key === "ArrowRight" && !keyboardEvent.altKey && preselectedBreadcrumb.axNode().hasOnlyUnloadedChildren()) {
      handled = this.inspectDOMNode(preselectedBreadcrumb.axNode());
    }
    if (handled) {
      keyboardEvent.consume(true);
    }
  }
  preselectPrevious() {
    if (!this.preselectedBreadcrumb) {
      return false;
    }
    const previousBreadcrumb = this.preselectedBreadcrumb.previousBreadcrumb();
    if (!previousBreadcrumb) {
      return false;
    }
    this.setPreselectedBreadcrumb(previousBreadcrumb);
    return true;
  }
  preselectNext() {
    if (!this.preselectedBreadcrumb) {
      return false;
    }
    const nextBreadcrumb = this.preselectedBreadcrumb.nextBreadcrumb();
    if (!nextBreadcrumb) {
      return false;
    }
    this.setPreselectedBreadcrumb(nextBreadcrumb);
    return true;
  }
  preselectParent() {
    if (!this.preselectedBreadcrumb) {
      return false;
    }
    const parentBreadcrumb = this.preselectedBreadcrumb.parentBreadcrumb();
    if (!parentBreadcrumb) {
      return false;
    }
    this.setPreselectedBreadcrumb(parentBreadcrumb);
    return true;
  }
  setPreselectedBreadcrumb(breadcrumb) {
    if (breadcrumb === this.preselectedBreadcrumb) {
      return;
    }
    const hadFocus = this.element.hasFocus();
    if (this.preselectedBreadcrumb) {
      this.preselectedBreadcrumb.setPreselected(false, hadFocus);
    }
    if (breadcrumb) {
      this.preselectedBreadcrumb = breadcrumb;
    } else {
      this.preselectedBreadcrumb = this.inspectedNodeBreadcrumb;
    }
    if (this.preselectedBreadcrumb) {
      this.preselectedBreadcrumb.setPreselected(true, hadFocus);
    }
    if (!breadcrumb && hadFocus) {
      SDK2.OverlayModel.OverlayModel.hideDOMNodeHighlight();
    }
  }
  collapseBreadcrumb(breadcrumb) {
    if (!breadcrumb.parentBreadcrumb()) {
      return;
    }
    const backendNodeId = breadcrumb.axNode().backendDOMNodeId();
    if (backendNodeId !== null) {
      this.collapsingBreadcrumbId = backendNodeId;
    }
    const parentBreadcrumb = breadcrumb.parentBreadcrumb();
    if (parentBreadcrumb) {
      this.inspectDOMNode(parentBreadcrumb.axNode());
    }
  }
  onMouseLeave(_event) {
    this.setHoveredBreadcrumb(null);
  }
  onMouseMove(event) {
    const target = event.target;
    if (!target) {
      return;
    }
    const breadcrumbElement = target.enclosingNodeOrSelfWithClass("ax-breadcrumb");
    if (!breadcrumbElement) {
      this.setHoveredBreadcrumb(null);
      return;
    }
    const breadcrumb = elementsToAXBreadcrumb.get(breadcrumbElement);
    if (!breadcrumb?.isDOMNode()) {
      return;
    }
    this.setHoveredBreadcrumb(breadcrumb);
  }
  onFocusOut(event) {
    if (!this.preselectedBreadcrumb || event.target !== this.preselectedBreadcrumb.nodeElement()) {
      return;
    }
    this.setPreselectedBreadcrumb(null);
  }
  onClick(event) {
    const target = event.target;
    if (!target) {
      return;
    }
    const breadcrumbElement = target.enclosingNodeOrSelfWithClass("ax-breadcrumb");
    if (!breadcrumbElement) {
      this.setHoveredBreadcrumb(null);
      return;
    }
    const breadcrumb = elementsToAXBreadcrumb.get(breadcrumbElement);
    if (!breadcrumb) {
      return;
    }
    if (breadcrumb.inspected()) {
      this.collapseBreadcrumb(breadcrumb);
      breadcrumb.nodeElement().focus();
      void VisualLogging3.logClick(breadcrumb.expandLoggable, event);
      return;
    }
    if (!breadcrumb.isDOMNode()) {
      return;
    }
    this.inspectDOMNode(breadcrumb.axNode());
    void VisualLogging3.logClick(breadcrumb.expandLoggable, event);
  }
  setHoveredBreadcrumb(breadcrumb) {
    if (breadcrumb === this.hoveredBreadcrumb) {
      return;
    }
    if (this.hoveredBreadcrumb) {
      this.hoveredBreadcrumb.setHovered(false);
    }
    const node = this.node();
    if (breadcrumb) {
      breadcrumb.setHovered(true);
    } else if (node?.id) {
      node.domModel().overlayModel().nodeHighlightRequested({ nodeId: node.id });
    }
    this.hoveredBreadcrumb = breadcrumb;
  }
  inspectDOMNode(axNode) {
    if (!axNode.isDOMNode()) {
      return false;
    }
    const deferredNode = axNode.deferredDOMNode();
    if (deferredNode) {
      deferredNode.resolve((domNode) => {
        this.axSidebarView.setNode(
          domNode,
          true
          /* fromAXTree */
        );
        void Common2.Revealer.reveal(
          domNode,
          true
          /* omitFocus */
        );
      });
    }
    return true;
  }
  contextMenuEventFired(event) {
    const target = event.target;
    if (!target) {
      return;
    }
    const breadcrumbElement = target.enclosingNodeOrSelfWithClass("ax-breadcrumb");
    if (!breadcrumbElement) {
      return;
    }
    const breadcrumb = elementsToAXBreadcrumb.get(breadcrumbElement);
    if (!breadcrumb) {
      return;
    }
    const axNode = breadcrumb.axNode();
    if (!axNode.isDOMNode() || !axNode.deferredDOMNode()) {
      return;
    }
    const contextMenu = new UI4.ContextMenu.ContextMenu(event);
    contextMenu.viewSection().appendItem(i18nString3(UIStrings4.scrollIntoView), () => {
      const deferredNode2 = axNode.deferredDOMNode();
      if (!deferredNode2) {
        return;
      }
      void deferredNode2.resolvePromise().then((domNode) => {
        if (!domNode) {
          return;
        }
        void domNode.scrollIntoView();
      });
    }, { jslogContext: "scroll-into-view" });
    const deferredNode = axNode.deferredDOMNode();
    if (deferredNode) {
      contextMenu.appendApplicableItems(deferredNode);
    }
    void contextMenu.show();
  }
};
var elementsToAXBreadcrumb = /* @__PURE__ */ new WeakMap();
var AXBreadcrumb = class {
  axNodeInternal;
  elementInternal;
  nodeElementInternal;
  nodeWrapper;
  selectionElement;
  childrenGroupElement;
  children;
  hovered;
  preselectedInternal;
  parent;
  inspectedInternal;
  expandLoggable = {};
  constructor(axNode, depth, inspected) {
    this.axNodeInternal = axNode;
    this.elementInternal = document.createElement("div");
    this.elementInternal.classList.add("ax-breadcrumb");
    this.elementInternal.setAttribute("jslog", `${VisualLogging3.treeItem().track({ click: true, keydown: "ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Enter" })}`);
    elementsToAXBreadcrumb.set(this.elementInternal, this);
    this.nodeElementInternal = document.createElement("div");
    this.nodeElementInternal.classList.add("ax-node");
    UI4.ARIAUtils.markAsTreeitem(this.nodeElementInternal);
    this.nodeElementInternal.tabIndex = -1;
    this.elementInternal.appendChild(this.nodeElementInternal);
    this.nodeWrapper = document.createElement("div");
    this.nodeWrapper.classList.add("wrapper");
    this.nodeElementInternal.appendChild(this.nodeWrapper);
    this.selectionElement = document.createElement("div");
    this.selectionElement.classList.add("selection");
    this.selectionElement.classList.add("fill");
    this.nodeElementInternal.appendChild(this.selectionElement);
    this.childrenGroupElement = document.createElement("div");
    this.childrenGroupElement.classList.add("children");
    UI4.ARIAUtils.markAsGroup(this.childrenGroupElement);
    this.elementInternal.appendChild(this.childrenGroupElement);
    this.children = [];
    this.hovered = false;
    this.preselectedInternal = false;
    this.parent = null;
    this.inspectedInternal = inspected;
    this.nodeElementInternal.classList.toggle("inspected", inspected);
    this.nodeElementInternal.style.paddingLeft = 16 * depth + 4 + "px";
    if (this.axNodeInternal.ignored()) {
      this.appendIgnoredNodeElement();
    } else {
      this.appendRoleElement(this.axNodeInternal.role());
      const axNodeName = this.axNodeInternal.name();
      if (axNodeName?.value) {
        this.nodeWrapper.createChild("span", "separator").textContent = "\xA0";
        this.appendNameElement(axNodeName.value);
      }
    }
    if (!this.axNodeInternal.ignored() && this.axNodeInternal.hasOnlyUnloadedChildren()) {
      this.nodeElementInternal.classList.add("children-unloaded");
      UI4.ARIAUtils.setExpanded(this.nodeElementInternal, false);
      VisualLogging3.registerLoggable(this.expandLoggable, `${VisualLogging3.expand()}`, this.elementInternal, new DOMRect(0, 0, 16, 16));
    }
    if (!this.axNodeInternal.isDOMNode()) {
      this.nodeElementInternal.classList.add("no-dom-node");
    }
  }
  element() {
    return this.elementInternal;
  }
  nodeElement() {
    return this.nodeElementInternal;
  }
  appendChild(breadcrumb) {
    this.children.push(breadcrumb);
    breadcrumb.setParent(this);
    this.nodeElementInternal.classList.add("parent");
    UI4.ARIAUtils.setExpanded(this.nodeElementInternal, true);
    this.childrenGroupElement.appendChild(breadcrumb.element());
    VisualLogging3.registerLoggable(this.expandLoggable, `${VisualLogging3.expand()}`, this.elementInternal, new DOMRect(0, 0, 16, 16));
  }
  hasExpandedChildren() {
    return this.children.length;
  }
  setParent(breadcrumb) {
    this.parent = breadcrumb;
  }
  preselected() {
    return this.preselectedInternal;
  }
  setPreselected(preselected, selectedByUser) {
    if (this.preselectedInternal === preselected) {
      return;
    }
    this.preselectedInternal = preselected;
    this.nodeElementInternal.classList.toggle("preselected", preselected);
    if (preselected) {
      this.nodeElementInternal.tabIndex = 0;
    } else {
      this.nodeElementInternal.tabIndex = -1;
    }
    if (this.preselectedInternal) {
      if (selectedByUser) {
        this.nodeElementInternal.focus();
      }
      if (!this.inspectedInternal) {
        this.axNodeInternal.highlightDOMNode();
      } else {
        SDK2.OverlayModel.OverlayModel.hideDOMNodeHighlight();
      }
    }
  }
  setHovered(hovered) {
    if (this.hovered === hovered) {
      return;
    }
    this.hovered = hovered;
    this.nodeElementInternal.classList.toggle("hovered", hovered);
    if (this.hovered) {
      this.nodeElementInternal.classList.toggle("hovered", true);
      this.axNodeInternal.highlightDOMNode();
    }
  }
  axNode() {
    return this.axNodeInternal;
  }
  inspected() {
    return this.inspectedInternal;
  }
  isDOMNode() {
    return this.axNodeInternal.isDOMNode();
  }
  nextBreadcrumb() {
    if (this.children.length) {
      return this.children[0];
    }
    const nextSibling = this.element().nextSibling;
    if (nextSibling) {
      return elementsToAXBreadcrumb.get(nextSibling) || null;
    }
    return null;
  }
  previousBreadcrumb() {
    const previousSibling = this.element().previousSibling;
    if (previousSibling) {
      return elementsToAXBreadcrumb.get(previousSibling) || null;
    }
    return this.parent;
  }
  parentBreadcrumb() {
    return this.parent;
  }
  lastChild() {
    return this.children[this.children.length - 1];
  }
  appendNameElement(name) {
    const nameElement = document.createElement("span");
    nameElement.textContent = '"' + name + '"';
    nameElement.classList.add("ax-readable-string");
    this.nodeWrapper.appendChild(nameElement);
  }
  appendRoleElement(role) {
    if (!role) {
      return;
    }
    const roleElement = document.createElement("span");
    roleElement.classList.add("monospace");
    roleElement.classList.add(RoleStyles[role.type]);
    roleElement.setTextContentTruncatedIfNeeded(role.value || "");
    this.nodeWrapper.appendChild(roleElement);
  }
  appendIgnoredNodeElement() {
    const ignoredNodeElement = document.createElement("span");
    ignoredNodeElement.classList.add("monospace");
    ignoredNodeElement.textContent = i18nString3(UIStrings4.ignored);
    ignoredNodeElement.classList.add("ax-breadcrumbs-ignored-node");
    this.nodeWrapper.appendChild(ignoredNodeElement);
  }
};
var RoleStyles = {
  internalRole: "ax-internal-role",
  role: "ax-role"
};

// gen/front_end/panels/accessibility/SourceOrderView.js
import "./../../ui/legacy/legacy.js";
import * as i18n9 from "./../../core/i18n/i18n.js";
import { html, nothing, render } from "./../../ui/lit/lit.js";
import * as VisualLogging4 from "./../../ui/visual_logging/visual_logging.js";
var UIStrings5 = {
  /**
   * @description Name of a tool which allows the developer to view the contents of the page in the
   * 'source order' (the order in which the HTML elements show up in the source code). In the
   * Accessibility panel.
   */
  sourceOrderViewer: "Source Order Viewer",
  /**
   * @description Text in Source Order Viewer of the Accessibility panel shown when the selected node has no child elements
   */
  noSourceOrderInformation: "No source order information available",
  /**
   * @description Text in Source Order Viewer of the Accessibility panel shown when the selected node has many child elements
   */
  thereMayBeADelayInDisplaying: "There may be a delay in displaying source order for elements with many children",
  /**
   * @description Checkbox label in Source Order Viewer of the Accessibility panel. Source order
   * means the order in which the HTML elements show up in the source code.
   */
  showSourceOrder: "Show source order"
};
var str_5 = i18n9.i18n.registerUIStrings("panels/accessibility/SourceOrderView.ts", UIStrings5);
var i18nString4 = i18n9.i18n.getLocalizedString.bind(void 0, str_5);
var MAX_CHILD_ELEMENTS_THRESHOLD = 300;
var DEFAULT_VIEW = (input, _output, target) => {
  function onShowSourceOrderChanged(event) {
    const checkbox = event.currentTarget;
    input.onShowSourceOrderChanged(checkbox.checked);
    event.consume();
  }
  render(html`
    ${input.showSourceOrder === void 0 ? html`
        <div class="gray-info-message info-message-overflow">
          ${i18nString4(UIStrings5.noSourceOrderInformation)}
        </div>
      ` : html`
      ${input.childCount >= MAX_CHILD_ELEMENTS_THRESHOLD ? html`
          <div class="gray-info-message info-message-overflow"
                id="source-order-warning">
            ${i18nString4(UIStrings5.thereMayBeADelayInDisplaying)}
          </div>
        ` : nothing}
      <devtools-checkbox class="source-order-checkbox"
                          jslog=${VisualLogging4.toggle().track({ click: true })}
                          ?checked=${input.showSourceOrder}
                          @change=${onShowSourceOrderChanged}>
        ${i18nString4(UIStrings5.showSourceOrder)}
      </devtools-checkbox>
      `}
  `, target);
};
var SourceOrderPane = class extends AccessibilitySubPane {
  #childCount = 0;
  #showSourceOrder = void 0;
  #view;
  constructor(view = DEFAULT_VIEW) {
    super({
      title: i18nString4(UIStrings5.sourceOrderViewer),
      viewId: "source-order-viewer",
      jslog: `${VisualLogging4.section("source-order-viewer")}`
    });
    this.#view = view;
  }
  async setNodeAsync(node) {
    if (this.nodeInternal && this.#showSourceOrder) {
      this.nodeInternal.domModel().overlayModel().hideSourceOrderInOverlay();
    }
    super.setNode(node);
    this.#childCount = this.nodeInternal?.childNodeCount() ?? 0;
    if (!this.nodeInternal || !this.#childCount) {
      this.#showSourceOrder = void 0;
    } else {
      if (!this.nodeInternal.children()) {
        await this.nodeInternal.getSubtree(1, false);
      }
      const children = this.nodeInternal.children();
      if (!children.some((child) => child.nodeType() === Node.ELEMENT_NODE)) {
        this.#showSourceOrder = void 0;
      } else if (this.#showSourceOrder === void 0) {
        this.#showSourceOrder = false;
      }
      if (this.#showSourceOrder) {
        this.nodeInternal.domModel().overlayModel().highlightSourceOrderInOverlay(this.nodeInternal);
      }
    }
    this.requestUpdate();
  }
  async performUpdate() {
    const onShowSourceOrderChanged = (showSourceOrder) => {
      if (!this.nodeInternal) {
        this.#showSourceOrder = void 0;
        return;
      }
      if (showSourceOrder) {
        this.nodeInternal.domModel().overlayModel().highlightSourceOrderInOverlay(this.nodeInternal);
      } else {
        this.nodeInternal.domModel().overlayModel().hideSourceOrderInOverlay();
      }
      this.#showSourceOrder = showSourceOrder;
    };
    const input = {
      childCount: this.#childCount,
      showSourceOrder: this.#showSourceOrder,
      onShowSourceOrderChanged
    };
    const output = void 0;
    this.#view(input, output, this.contentElement);
  }
};

// gen/front_end/panels/accessibility/AccessibilitySidebarView.js
var accessibilitySidebarViewInstance;
var AccessibilitySidebarView = class _AccessibilitySidebarView extends UI5.ThrottledWidget.ThrottledWidget {
  nodeInternal;
  axNodeInternal;
  skipNextPullNode;
  sidebarPaneStack;
  breadcrumbsSubPane;
  ariaSubPane;
  axNodeSubPane;
  sourceOrderSubPane;
  constructor(throttlingTimeout) {
    super(false, throttlingTimeout);
    this.element.classList.add("accessibility-sidebar-view");
    this.nodeInternal = null;
    this.axNodeInternal = null;
    this.skipNextPullNode = false;
    this.sidebarPaneStack = UI5.ViewManager.ViewManager.instance().createStackLocation();
    this.breadcrumbsSubPane = new AXBreadcrumbsPane(this);
    void this.sidebarPaneStack.showView(this.breadcrumbsSubPane);
    this.ariaSubPane = new ARIAAttributesPane();
    void this.sidebarPaneStack.showView(this.ariaSubPane);
    this.axNodeSubPane = new AXNodeSubPane();
    void this.sidebarPaneStack.showView(this.axNodeSubPane);
    this.sourceOrderSubPane = new SourceOrderPane();
    void this.sidebarPaneStack.showView(this.sourceOrderSubPane);
    this.sidebarPaneStack.widget().show(this.element);
    UI5.Context.Context.instance().addFlavorChangeListener(SDK3.DOMModel.DOMNode, this.pullNode, this);
    this.pullNode();
  }
  static instance(opts) {
    if (!accessibilitySidebarViewInstance || opts?.forceNew) {
      accessibilitySidebarViewInstance = new _AccessibilitySidebarView(opts?.throttlingTimeout);
    }
    return accessibilitySidebarViewInstance;
  }
  node() {
    return this.nodeInternal;
  }
  axNode() {
    return this.axNodeInternal;
  }
  setNode(node, fromAXTree) {
    this.skipNextPullNode = Boolean(fromAXTree);
    this.nodeInternal = node;
    this.update();
  }
  accessibilityNodeCallback(axNode) {
    if (!axNode) {
      return;
    }
    this.axNodeInternal = axNode;
    if (axNode.isDOMNode()) {
      void this.sidebarPaneStack.showView(this.ariaSubPane, this.axNodeSubPane);
    } else {
      this.sidebarPaneStack.removeView(this.ariaSubPane);
    }
    this.axNodeSubPane.setAXNode(axNode);
    this.breadcrumbsSubPane.setAXNode(axNode);
  }
  async doUpdate() {
    const node = this.node();
    this.axNodeSubPane.setNode(node);
    this.ariaSubPane.setNode(node);
    this.breadcrumbsSubPane.setNode(node);
    void this.sourceOrderSubPane.setNodeAsync(node);
    if (!node) {
      return;
    }
    const accessibilityModel = node.domModel().target().model(SDK3.AccessibilityModel.AccessibilityModel);
    if (!accessibilityModel) {
      return;
    }
    if (!Root2.Runtime.experiments.isEnabled("full-accessibility-tree")) {
      accessibilityModel.clear();
    }
    await accessibilityModel.requestPartialAXTree(node);
    this.accessibilityNodeCallback(accessibilityModel.axNodeForDOMNode(node));
  }
  wasShown() {
    super.wasShown();
    void this.doUpdate();
    SDK3.TargetManager.TargetManager.instance().addModelListener(SDK3.DOMModel.DOMModel, SDK3.DOMModel.Events.AttrModified, this.onNodeChange, this, { scoped: true });
    SDK3.TargetManager.TargetManager.instance().addModelListener(SDK3.DOMModel.DOMModel, SDK3.DOMModel.Events.AttrRemoved, this.onNodeChange, this, { scoped: true });
    SDK3.TargetManager.TargetManager.instance().addModelListener(SDK3.DOMModel.DOMModel, SDK3.DOMModel.Events.CharacterDataModified, this.onNodeChange, this, { scoped: true });
    SDK3.TargetManager.TargetManager.instance().addModelListener(SDK3.DOMModel.DOMModel, SDK3.DOMModel.Events.ChildNodeCountUpdated, this.onNodeChange, this, { scoped: true });
  }
  willHide() {
    SDK3.TargetManager.TargetManager.instance().removeModelListener(SDK3.DOMModel.DOMModel, SDK3.DOMModel.Events.AttrModified, this.onNodeChange, this);
    SDK3.TargetManager.TargetManager.instance().removeModelListener(SDK3.DOMModel.DOMModel, SDK3.DOMModel.Events.AttrRemoved, this.onNodeChange, this);
    SDK3.TargetManager.TargetManager.instance().removeModelListener(SDK3.DOMModel.DOMModel, SDK3.DOMModel.Events.CharacterDataModified, this.onNodeChange, this);
    SDK3.TargetManager.TargetManager.instance().removeModelListener(SDK3.DOMModel.DOMModel, SDK3.DOMModel.Events.ChildNodeCountUpdated, this.onNodeChange, this);
  }
  pullNode() {
    if (this.skipNextPullNode) {
      this.skipNextPullNode = false;
      return;
    }
    this.setNode(UI5.Context.Context.instance().flavor(SDK3.DOMModel.DOMNode));
  }
  onNodeChange(event) {
    if (!this.node()) {
      return;
    }
    const data = event.data;
    const node = data instanceof SDK3.DOMModel.DOMNode ? data : data.node;
    if (this.node() !== node) {
      return;
    }
    this.update();
  }
};
export {
  ARIAAttributesView_exports as ARIAAttributesView,
  ARIAMetadata_exports as ARIAMetadata,
  AXBreadcrumbsPane_exports as AXBreadcrumbsPane,
  AccessibilityNodeView_exports as AccessibilityNodeView,
  AccessibilitySidebarView_exports as AccessibilitySidebarView,
  AccessibilityStrings_exports as AccessibilityStrings,
  AccessibilitySubPane_exports as AccessibilitySubPane
};
//# sourceMappingURL=accessibility.js.map
