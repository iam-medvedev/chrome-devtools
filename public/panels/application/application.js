var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/application/ApplicationPanelSidebar.js
var ApplicationPanelSidebar_exports = {};
__export(ApplicationPanelSidebar_exports, {
  AppManifestTreeElement: () => AppManifestTreeElement,
  ApplicationPanelSidebar: () => ApplicationPanelSidebar,
  BackgroundServiceTreeElement: () => BackgroundServiceTreeElement,
  ClearStorageTreeElement: () => ClearStorageTreeElement,
  CookieTreeElement: () => CookieTreeElement,
  DOMStorageTreeElement: () => DOMStorageTreeElement,
  ExtensionStorageTreeElement: () => ExtensionStorageTreeElement,
  ExtensionStorageTreeParentElement: () => ExtensionStorageTreeParentElement,
  FrameResourceTreeElement: () => FrameResourceTreeElement,
  FrameTreeElement: () => FrameTreeElement,
  IDBDatabaseTreeElement: () => IDBDatabaseTreeElement,
  IDBIndexTreeElement: () => IDBIndexTreeElement,
  IDBObjectStoreTreeElement: () => IDBObjectStoreTreeElement,
  IndexedDBTreeElement: () => IndexedDBTreeElement,
  ManifestChildTreeElement: () => ManifestChildTreeElement,
  ResourcesSection: () => ResourcesSection,
  ServiceWorkersTreeElement: () => ServiceWorkersTreeElement,
  StorageCategoryView: () => StorageCategoryView
});
import * as Common15 from "./../../core/common/common.js";
import * as Host9 from "./../../core/host/host.js";
import * as i18n51 from "./../../core/i18n/i18n.js";
import * as Platform6 from "./../../core/platform/platform.js";
import * as SDK22 from "./../../core/sdk/sdk.js";
import * as IssuesManager from "./../../models/issues_manager/issues_manager.js";
import * as IconButton13 from "./../../ui/components/icon_button/icon_button.js";
import * as LegacyWrapper11 from "./../../ui/components/legacy_wrapper/legacy_wrapper.js";
import * as SourceFrame5 from "./../../ui/legacy/components/source_frame/source_frame.js";
import * as UI22 from "./../../ui/legacy/legacy.js";

// gen/front_end/panels/application/ApplicationPanelTreeElement.js
import * as Common from "./../../core/common/common.js";
import * as UI from "./../../ui/legacy/legacy.js";
var ApplicationPanelTreeElement = class _ApplicationPanelTreeElement extends UI.TreeOutline.TreeElement {
  resourcesPanel;
  constructor(resourcesPanel, title, expandable, jslogContext) {
    super(title, expandable, jslogContext);
    this.resourcesPanel = resourcesPanel;
    UI.ARIAUtils.setLabel(this.listItemElement, title);
    this.listItemElement.tabIndex = -1;
  }
  deselect() {
    super.deselect();
    this.listItemElement.tabIndex = -1;
  }
  get itemURL() {
    throw new Error("Unimplemented Method");
  }
  onselect(selectedByUser) {
    if (!selectedByUser) {
      return false;
    }
    const path = [];
    for (let el = this; el; el = el.parent) {
      const url = el instanceof _ApplicationPanelTreeElement && el.itemURL;
      if (!url) {
        break;
      }
      path.push(url);
    }
    this.resourcesPanel.setLastSelectedItemPath(path);
    return false;
  }
  showView(view) {
    this.resourcesPanel.showView(view);
  }
};
var ExpandableApplicationPanelTreeElement = class extends ApplicationPanelTreeElement {
  expandedSetting;
  categoryName;
  categoryLink;
  // These strings are used for the empty state in each top most tree element
  // in the Application Panel.
  emptyCategoryHeadline;
  categoryDescription;
  constructor(resourcesPanel, categoryName, emptyCategoryHeadline, categoryDescription, settingsKey, settingsDefault = false) {
    super(resourcesPanel, categoryName, false, settingsKey);
    this.expandedSetting = Common.Settings.Settings.instance().createSetting("resources-" + settingsKey + "-expanded", settingsDefault);
    this.categoryName = categoryName;
    this.categoryLink = null;
    this.emptyCategoryHeadline = emptyCategoryHeadline;
    this.categoryDescription = categoryDescription;
  }
  get itemURL() {
    return "category://" + this.categoryName;
  }
  setLink(link3) {
    this.categoryLink = link3;
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    this.updateCategoryView();
    return false;
  }
  updateCategoryView() {
    const headline = this.childCount() === 0 ? this.emptyCategoryHeadline : this.categoryName;
    this.resourcesPanel.showCategoryView(this.categoryName, headline, this.categoryDescription, this.categoryLink);
  }
  appendChild(child, comparator) {
    super.appendChild(child, comparator);
    if (this.selected && this.childCount() === 1) {
      this.updateCategoryView();
    }
  }
  removeChild(child) {
    super.removeChild(child);
    if (this.selected && this.childCount() === 0) {
      this.updateCategoryView();
    }
  }
  onattach() {
    super.onattach();
    if (this.expandedSetting.get()) {
      this.expand();
    }
  }
  onexpand() {
    this.expandedSetting.set(true);
  }
  oncollapse() {
    this.expandedSetting.set(false);
  }
};

// gen/front_end/panels/application/AppManifestView.js
var AppManifestView_exports = {};
__export(AppManifestView_exports, {
  AppManifestView: () => AppManifestView
});
import * as Common2 from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as IconButton from "./../../ui/components/icon_button/icon_button.js";
import * as InlineEditor from "./../../ui/legacy/components/inline_editor/inline_editor.js";
import * as Components from "./../../ui/legacy/components/utils/utils.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/application/appManifestView.css.js
var appManifestView_css_default = `/*
 * Copyright 2016 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */
.report-field-name {
  flex-basis: 152px;
}

.manifest-view-header {
  min-width: 600px;
  flex-shrink: 0;
  flex-grow: 0;
}

.manifest-container {
  overflow: auto;
}

.inline-icon {
  width: 16px;
  height: 16px;
  margin-inline: var(--sys-size-3);

  &[name="check-circle"] {
    color: var(--icon-checkmark-green);
  }
}

.multiline-value {
  padding-top: var(--sys-size-5);
  white-space: normal;
}

select {
  margin: 4px;
}

.inline-button {
  vertical-align: sub;
}

/*# sourceURL=${import.meta.resolve("./appManifestView.css")} */`;

// gen/front_end/panels/application/AppManifestView.js
import * as ApplicationComponents from "./components/components.js";
var UIStrings = {
  /**
   * @description Text in App Manifest View of the Application panel
   */
  errorsAndWarnings: "Errors and warnings",
  /**
   * @description Text in App Manifest View of the Application panel
   */
  installability: "Installability",
  /**
   * @description Text in App Manifest View of the Application panel
   */
  identity: "Identity",
  /**
   * @description Text in App Manifest View of the Application panel
   */
  presentation: "Presentation",
  /**
   * @description Text in App Manifest View of the Application panel
   */
  protocolHandlers: "Protocol Handlers",
  /**
   * @description Text in App Manifest View of the Application panel
   */
  icons: "Icons",
  /**
   * @description Text in App Manifest View of the Application panel
   */
  windowControlsOverlay: "Window Controls Overlay",
  /**
   * @description Label in the App Manifest View for the "name" property of web app or shortcut item
   */
  name: "Name",
  /**
   * @description Label in the App Manifest View for the "short_name" property of web app or shortcut item
   */
  shortName: "Short name",
  /**
   * @description Label in the App Manifest View for the "url" property of shortcut item
   */
  url: "URL",
  /**
   * @description Label in the App Manifest View for the Computed App Id
   */
  computedAppId: "Computed App ID",
  /**
   * @description Popup-text explaining what the App Id is used for.
   */
  appIdExplainer: "This is used by the browser to know whether the manifest should be updating an existing application, or whether it refers to a new web app that can be installed.",
  /**
   * @description Text which is a hyperlink to more documentation
   */
  learnMore: "Learn more",
  /**
   * @description Explanation why it is advisable to specify an 'id' field in the manifest.
   * @example {/index.html} PH1
   * @example {(button for copying suggested value into clipboard)} PH2
   */
  appIdNote: "Note: `id` is not specified in the manifest, `start_url` is used instead. To specify an App ID that matches the current identity, set the `id` field to {PH1} {PH2}.",
  /**
   * @description Tooltip text that appears when hovering over a button which copies the previous text to the clipboard.
   */
  copyToClipboard: "Copy suggested ID to clipboard",
  /**
   * @description Screen reader announcement string when the user clicks the copy to clipboard button.
   * @example {/index.html} PH1
   */
  copiedToClipboard: "Copied suggested ID {PH1} to clipboard",
  /**
   * @description Label in the App Manifest View for the "description" property of web app or shortcut item
   */
  description: "Description",
  /**
   * @description Text in App Manifest View of the Application panel
   */
  startUrl: "Start URL",
  /**
   * @description Text in App Manifest View of the Application panel
   */
  themeColor: "Theme color",
  /**
   * @description Text in App Manifest View of the Application panel
   */
  backgroundColor: "Background color",
  /**
   * @description Text for the orientation of something
   */
  orientation: "Orientation",
  /**
   * @description Title of the display attribute in App Manifest View of the Application panel
   * The display attribute defines the preferred display mode for the app such fullscreen or
   * standalone.
   * For more details see https://www.w3.org/TR/appmanifest/#display-member.
   */
  display: "Display",
  /**
   * @description Title of the new_note_url attribute in the Application panel
   */
  newNoteUrl: "New note URL",
  /**
   * @description Text in App Manifest View of the Application panel
   */
  descriptionMayBeTruncated: "Description may be truncated.",
  /**
   * @description Warning text about too many shortcuts
   */
  shortcutsMayBeNotAvailable: "The maximum number of shortcuts is platform dependent. Some shortcuts may be not available.",
  /**
   * @description Text in App Manifest View of the Application panel
   */
  showOnlyTheMinimumSafeAreaFor: "Show only the minimum safe area for maskable icons",
  /**
   * @description Link text for more information on maskable icons in App Manifest view of the Application panel
   */
  documentationOnMaskableIcons: "documentation on maskable icons",
  /**
   * @description Text wrapping a link pointing to more information on maskable icons in App Manifest view of the Application panel
   * @example {https://web.dev/maskable-icon/} PH1
   */
  needHelpReadOurS: "Need help? Read the {PH1}.",
  /**
   * @description Text in App Manifest View of the Application panel
   * @example {1} PH1
   */
  shortcutS: "Shortcut #{PH1}",
  /**
   * @description Text in App Manifest View of the Application panel
   * @example {1} PH1
   */
  shortcutSShouldIncludeAXPixel: "Shortcut #{PH1} should include a 96\xD796 pixel icon",
  /**
   * @description Text in App Manifest View of the Application panel
   * @example {1} PH1
   */
  screenshotS: "Screenshot #{PH1}",
  /**
   * @description Manifest installability error in the Application panel
   */
  pageIsNotLoadedInTheMainFrame: "Page is not loaded in the main frame",
  /**
   * @description Manifest installability error in the Application panel
   */
  pageIsNotServedFromASecureOrigin: "Page is not served from a secure origin",
  /**
   * @description Manifest installability error in the Application panel
   */
  pageHasNoManifestLinkUrl: "Page has no manifest <link> `URL`",
  /**
   * @description Manifest installability error in the Application panel
   */
  manifestCouldNotBeFetchedIsEmpty: "Manifest could not be fetched, is empty, or could not be parsed",
  /**
   * @description Manifest installability error in the Application panel
   */
  manifestStartUrlIsNotValid: "Manifest '`start_url`' is not valid",
  /**
   * @description Manifest installability error in the Application panel
   */
  manifestDoesNotContainANameOr: "Manifest does not contain a '`name`' or '`short_name`' field",
  /**
   * @description Manifest installability error in the Application panel
   */
  manifestDisplayPropertyMustBeOne: "Manifest '`display`' property must be one of '`standalone`', '`fullscreen`', or '`minimal-ui`'",
  /**
   * @description Manifest installability error in the Application panel
   * @example {100} PH1
   */
  manifestDoesNotContainASuitable: "Manifest does not contain a suitable icon\u2014PNG, SVG, or WebP format of at least {PH1}px is required, the '`sizes`' attribute must be set, and the '`purpose`' attribute, if set, must include '`any`'.",
  /**
   * @description Manifest installability error in the Application panel
   */
  avoidPurposeAnyAndMaskable: "Declaring an icon with '`purpose`' of '`any maskable`' is discouraged. It is likely to look incorrect on some platforms due to too much or too little padding.",
  /**
   * @description Manifest installability error in the Application panel
   * @example {100} PH1
   */
  noSuppliedIconIsAtLeastSpxSquare: "No supplied icon is at least {PH1} pixels square in `PNG`, `SVG`, or `WebP` format, with the purpose attribute unset or set to '`any`'.",
  /**
   * @description Manifest installability error in the Application panel
   */
  couldNotDownloadARequiredIcon: "Could not download a required icon from the manifest",
  /**
   * @description Manifest installability error in the Application panel
   */
  downloadedIconWasEmptyOr: "Downloaded icon was empty or corrupted",
  /**
   * @description Manifest installability error in the Application panel
   */
  theSpecifiedApplicationPlatform: "The specified application platform is not supported on Android",
  /**
   * @description Manifest installability error in the Application panel
   */
  noPlayStoreIdProvided: "No Play store ID provided",
  /**
   * @description Manifest installability error in the Application panel
   */
  thePlayStoreAppUrlAndPlayStoreId: "The Play Store app URL and Play Store ID do not match",
  /**
   * @description Manifest installability error in the Application panel
   */
  theAppIsAlreadyInstalled: "The app is already installed",
  /**
   * @description Manifest installability error in the Application panel
   */
  aUrlInTheManifestContainsA: "A URL in the manifest contains a username, password, or port",
  /**
   * @description Manifest installability error in the Application panel
   */
  pageIsLoadedInAnIncognitoWindow: "Page is loaded in an incognito window",
  /**
   * @description Manifest installability error in the Application panel
   */
  pageDoesNotWorkOffline: "Page does not work offline",
  /**
   * @description Manifest installability error in the Application panel
   */
  couldNotCheckServiceWorker: "Could not check `service worker` without a '`start_url`' field in the manifest",
  /**
   * @description Manifest installability error in the Application panel
   */
  manifestSpecifies: "Manifest specifies '`prefer_related_applications`: true'",
  /**
   * @description Manifest installability error in the Application panel
   */
  preferrelatedapplicationsIsOnly: "'`prefer_related_applications`' is only supported on `Chrome` Beta and Stable channels on `Android`.",
  /**
   * @description Manifest installability error in the Application panel
   */
  manifestContainsDisplayoverride: "Manifest contains '`display_override`' field, and the first supported display mode must be one of '`standalone`', '`fullscreen`', or '`minimal-ui`'",
  /**
   * @description Warning message for offline capability check
   * @example {https://developer.chrome.com/blog/improved-pwa-offline-detection} PH1
   */
  pageDoesNotWorkOfflineThePage: "Page does not work offline. Starting in Chrome 93, the installability criteria are changing, and this site will not be installable. See {PH1} for more information.",
  /**
   * @description Text to indicate the source of an image
   * @example {example.com} PH1
   */
  imageFromS: "Image from {PH1}",
  /**
   * @description Text for one or a group of screenshots
   */
  screenshot: "Screenshot",
  /**
   * @description Label in the App Manifest View for the "form_factor" property of screenshot
   */
  formFactor: "Form factor",
  /**
   * @description Label in the App Manifest View for the "label" property of screenshot
   */
  label: "Label",
  /**
   * @description Label in the App Manifest View for the "platform" property of screenshot
   */
  platform: "Platform",
  /**
   * @description Text in App Manifest View of the Application panel
   */
  icon: "Icon",
  /**
   * @description This is a warning message telling the user about a problem where the src attribute
   * of an image has not be entered/provided correctly. 'src' is part of the DOM API and should not
   * be translated.
   * @example {ImageName} PH1
   */
  sSrcIsNotSet: "{PH1} '`src`' is not set",
  /**
   * @description Warning message for image resources from the manifest
   * @example {Screenshot} PH1
   * @example {https://example.com/image.png} PH2
   */
  sUrlSFailedToParse: "{PH1} URL ''{PH2}'' failed to parse",
  /**
   * @description Warning message for image resources from the manifest
   * @example {Image} PH1
   * @example {https://example.com/image.png} PH2
   */
  sSFailedToLoad: "{PH1} {PH2} failed to load",
  /**
   * @description Warning message for image resources from the manifest
   * @example {Image} PH1
   * @example {https://example.com/image.png} PH2
   */
  sSDoesNotSpecifyItsSizeInThe: "{PH1} {PH2} does not specify its size in the manifest",
  /**
   * @description Warning message for image resources from the manifest
   * @example {Image} PH1
   * @example {https://example.com/image.png} PH2
   */
  sSShouldSpecifyItsSizeAs: "{PH1} {PH2} should specify its size as `[width]x[height]`",
  /**
   * @description Warning message for image resources from the manifest
   */
  sSShouldHaveSquareIcon: "Most operating systems require square icons. Please include at least one square icon in the array.",
  /**
   * @description Warning message for image resources from the manifest
   * @example {100} PH1
   * @example {100} PH2
   * @example {Image} PH3
   * @example {https://example.com/image.png} PH4
   * @example {200} PH5
   * @example {200} PH6
   */
  actualSizeSspxOfSSDoesNotMatch: "Actual size ({PH1}\xD7{PH2})px of {PH3} {PH4} does not match specified size ({PH5}\xD7{PH6}px)",
  /**
   * @description Warning message for image resources from the manifest
   * @example {100} PH1
   * @example {Image} PH2
   * @example {https://example.com/image.png} PH3
   * @example {200} PH4
   */
  actualWidthSpxOfSSDoesNotMatch: "Actual width ({PH1}px) of {PH2} {PH3} does not match specified width ({PH4}px)",
  /**
   * @description Warning message for image resources from the manifest
   * @example {100} PH1
   * @example {Image} PH2
   * @example {https://example.com/image.png} PH3
   * @example {100} PH4
   */
  actualHeightSpxOfSSDoesNotMatch: "Actual height ({PH1}px) of {PH2} {PH3} does not match specified height ({PH4}px)",
  /**
   * @description Warning message for image resources from the manifest
   * @example {Image} PH1
   * @example {https://example.com/image.png} PH2
   */
  sSSizeShouldBeAtLeast320: "{PH1} {PH2} size should be at least 320\xD7320",
  /**
   * @description Warning message for image resources from the manifest
   * @example {Image} PH1
   * @example {https://example.com/image.png} PH2
   */
  sSSizeShouldBeAtMost3840: "{PH1} {PH2} size should be at most 3840\xD73840",
  /**
   * @description Warning message for image resources from the manifest
   * @example {Image} PH1
   * @example {https://example.com/image.png} PH2
   */
  sSWidthDoesNotComplyWithRatioRequirement: "{PH1} {PH2} width can't be more than 2.3 times as long as the height",
  /**
   * @description Warning message for image resources from the manifest
   * @example {Image} PH1
   * @example {https://example.com/image.png} PH2
   */
  sSHeightDoesNotComplyWithRatioRequirement: "{PH1} {PH2} height can't be more than 2.3 times as long as the width",
  /**
   * @description Manifest installability error in the Application panel
   * @example {https://example.com/image.png} url
   */
  screenshotPixelSize: "Screenshot {url} should specify a pixel size `[width]x[height]` instead of `any` as first size.",
  /**
   * @description Warning text about screenshots for Richer PWA Install UI on desktop
   */
  noScreenshotsForRicherPWAInstallOnDesktop: "Richer PWA Install UI won\u2019t be available on desktop. Please add at least one screenshot with the `form_factor` set to `wide`.",
  /**
   * @description Warning text about screenshots for Richer PWA Install UI on mobile
   */
  noScreenshotsForRicherPWAInstallOnMobile: "Richer PWA Install UI won\u2019t be available on mobile. Please add at least one screenshot for which `form_factor` is not set or set to a value other than `wide`.",
  /**
   * @description Warning text about too many screenshots for desktop
   */
  tooManyScreenshotsForDesktop: "No more than 8 screenshots will be displayed on desktop. The rest will be ignored.",
  /**
   * @description Warning text about too many screenshots for mobile
   */
  tooManyScreenshotsForMobile: "No more than 5 screenshots will be displayed on mobile. The rest will be ignored.",
  /**
   * @description Warning text about not all screenshots matching the appropriate form factor have the same aspect ratio
   */
  screenshotsMustHaveSameAspectRatio: "All screenshots with the same `form_factor` must have the same aspect ratio as the first screenshot with that `form_factor`. Some screenshots will be ignored.",
  /**
   * @description Message for Window Controls Overlay value succsessfully found with links to documnetation
   * @example {window-controls-overlay} PH1
   * @example {https://developer.mozilla.org/en-US/docs/Web/Manifest/display_override} PH2
   * @example {https://developer.mozilla.org/en-US/docs/Web/Manifest} PH3
   */
  wcoFound: "Chrome has successfully found the {PH1} value for the {PH2} field in the {PH3}.",
  /**
   * @description Message for Windows Control Overlay value not found with link to documentation
   * @example {https://developer.mozilla.org/en-US/docs/Web/Manifest/display_override} PH1
   */
  wcoNotFound: "Define {PH1} in the manifest to use the Window Controls Overlay API and customize your app's title bar.",
  /**
   * @description Link text for more information on customizing Window Controls Overlay title bar in the Application panel
   */
  customizePwaTitleBar: "Customize the window controls overlay of your PWA's title bar",
  /**
   * @description Text wrapping link to documentation on how to customize WCO title bar
   * @example {https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/window-controls-overlay} PH1
   */
  wcoNeedHelpReadMore: "Need help? Read {PH1}.",
  /**
   * @description Text for emulation OS selection dropdown
   */
  selectWindowControlsOverlayEmulationOs: "Emulate the Window Controls Overlay on"
};
var str_ = i18n.i18n.registerUIStrings("panels/application/AppManifestView.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var AppManifestView = class extends Common2.ObjectWrapper.eventMixin(UI2.Widget.VBox) {
  emptyView;
  reportView;
  errorsSection;
  installabilitySection;
  identitySection;
  presentationSection;
  iconsSection;
  windowControlsSection;
  protocolHandlersSection;
  shortcutSections;
  screenshotsSections;
  nameField;
  shortNameField;
  descriptionField;
  startURLField;
  themeColorSwatch;
  backgroundColorSwatch;
  orientationField;
  displayField;
  newNoteUrlField;
  throttler;
  registeredListeners;
  target;
  resourceTreeModel;
  serviceWorkerManager;
  overlayModel;
  protocolHandlersView;
  constructor(emptyView, reportView, throttler) {
    super({
      jslog: `${VisualLogging.pane("manifest")}`,
      useShadowDom: true
    });
    this.registerRequiredCSS(appManifestView_css_default);
    this.contentElement.classList.add("manifest-container");
    this.emptyView = emptyView;
    this.emptyView.link = "https://web.dev/add-manifest/";
    this.emptyView.show(this.contentElement);
    this.emptyView.hideWidget();
    this.reportView = reportView;
    this.reportView.registerRequiredCSS(appManifestView_css_default);
    this.reportView.element.classList.add("manifest-view-header");
    this.reportView.show(this.contentElement);
    this.reportView.hideWidget();
    this.errorsSection = this.reportView.appendSection(i18nString(UIStrings.errorsAndWarnings), void 0, "errors-and-warnings");
    this.installabilitySection = this.reportView.appendSection(i18nString(UIStrings.installability), void 0, "installability");
    this.identitySection = this.reportView.appendSection(i18nString(UIStrings.identity), "undefined,identity");
    this.presentationSection = this.reportView.appendSection(i18nString(UIStrings.presentation), "undefined,presentation");
    this.protocolHandlersSection = this.reportView.appendSection(i18nString(UIStrings.protocolHandlers), "undefined,protocol-handlers");
    this.protocolHandlersView = new ApplicationComponents.ProtocolHandlersView.ProtocolHandlersView();
    this.protocolHandlersSection.appendFieldWithCustomView(this.protocolHandlersView);
    this.iconsSection = this.reportView.appendSection(i18nString(UIStrings.icons), "report-section-icons", "icons");
    this.windowControlsSection = this.reportView.appendSection(UIStrings.windowControlsOverlay, void 0, "window-controls-overlay");
    this.shortcutSections = [];
    this.screenshotsSections = [];
    this.nameField = this.identitySection.appendField(i18nString(UIStrings.name));
    this.shortNameField = this.identitySection.appendField(i18nString(UIStrings.shortName));
    this.descriptionField = this.identitySection.appendFlexedField(i18nString(UIStrings.description));
    this.startURLField = this.presentationSection.appendField(i18nString(UIStrings.startUrl));
    UI2.ARIAUtils.setLabel(this.startURLField, i18nString(UIStrings.startUrl));
    const themeColorField = this.presentationSection.appendField(i18nString(UIStrings.themeColor));
    this.themeColorSwatch = new InlineEditor.ColorSwatch.ColorSwatch();
    themeColorField.appendChild(this.themeColorSwatch);
    const backgroundColorField = this.presentationSection.appendField(i18nString(UIStrings.backgroundColor));
    this.backgroundColorSwatch = new InlineEditor.ColorSwatch.ColorSwatch();
    backgroundColorField.appendChild(this.backgroundColorSwatch);
    this.orientationField = this.presentationSection.appendField(i18nString(UIStrings.orientation));
    this.displayField = this.presentationSection.appendField(i18nString(UIStrings.display));
    this.newNoteUrlField = this.presentationSection.appendField(i18nString(UIStrings.newNoteUrl));
    this.throttler = throttler;
    SDK.TargetManager.TargetManager.instance().observeTargets(this);
    this.registeredListeners = [];
  }
  getStaticSections() {
    return [
      this.identitySection,
      this.presentationSection,
      this.protocolHandlersSection,
      this.iconsSection,
      this.windowControlsSection
    ];
  }
  getManifestElement() {
    return this.reportView.getHeaderElement();
  }
  targetAdded(target) {
    if (target !== SDK.TargetManager.TargetManager.instance().primaryPageTarget()) {
      return;
    }
    this.target = target;
    this.resourceTreeModel = target.model(SDK.ResourceTreeModel.ResourceTreeModel);
    this.serviceWorkerManager = target.model(SDK.ServiceWorkerManager.ServiceWorkerManager);
    this.overlayModel = target.model(SDK.OverlayModel.OverlayModel);
    if (!this.resourceTreeModel || !this.serviceWorkerManager || !this.overlayModel) {
      return;
    }
    void this.updateManifest(true);
    this.registeredListeners = [
      this.resourceTreeModel.addEventListener(SDK.ResourceTreeModel.Events.DOMContentLoaded, () => {
        void this.updateManifest(true);
      }),
      this.serviceWorkerManager.addEventListener("RegistrationUpdated", () => {
        void this.updateManifest(false);
      })
    ];
  }
  targetRemoved(target) {
    if (this.target !== target) {
      return;
    }
    if (!this.resourceTreeModel || !this.serviceWorkerManager || !this.overlayModel) {
      return;
    }
    delete this.resourceTreeModel;
    delete this.serviceWorkerManager;
    delete this.overlayModel;
    Common2.EventTarget.removeEventListeners(this.registeredListeners);
  }
  async updateManifest(immediately) {
    if (!this.resourceTreeModel) {
      return;
    }
    const [{ url, data, errors }, installabilityErrors, appId] = await Promise.all([
      this.resourceTreeModel.fetchAppManifest(),
      this.resourceTreeModel.getInstallabilityErrors(),
      this.resourceTreeModel.getAppId()
    ]);
    void this.throttler.schedule(
      () => this.renderManifest(url, data, errors, installabilityErrors, appId),
      immediately ? "AsSoonAsPossible" : "Default"
      /* Common.Throttler.Scheduling.DEFAULT */
    );
  }
  async renderManifest(url, data, errors, installabilityErrors, appIdResponse) {
    const appId = appIdResponse?.appId || null;
    const recommendedId = appIdResponse?.recommendedId || null;
    if ((!data || data === "{}") && !errors.length) {
      this.emptyView.showWidget();
      this.reportView.hideWidget();
      this.dispatchEventToListeners("ManifestDetected", false);
      return;
    }
    this.emptyView.hideWidget();
    this.reportView.showWidget();
    this.dispatchEventToListeners("ManifestDetected", true);
    const link3 = Components.Linkifier.Linkifier.linkifyURL(url);
    link3.tabIndex = 0;
    this.reportView.setURL(link3);
    this.errorsSection.clearContent();
    this.errorsSection.element.classList.toggle("hidden", !errors.length);
    for (const error of errors) {
      const icon = UI2.UIUtils.createIconLabel({
        title: error.message,
        iconName: error.critical ? "cross-circle-filled" : "warning-filled",
        color: error.critical ? "var(--icon-error)" : "var(--icon-warning)"
      });
      this.errorsSection.appendRow().appendChild(icon);
    }
    if (!data) {
      return;
    }
    if (data.charCodeAt(0) === 65279) {
      data = data.slice(1);
    }
    const parsedManifest = JSON.parse(data);
    this.nameField.textContent = stringProperty("name");
    this.shortNameField.textContent = stringProperty("short_name");
    const warnings = [];
    const description = stringProperty("description");
    this.descriptionField.textContent = description;
    if (description.length > 300) {
      warnings.push(i18nString(UIStrings.descriptionMayBeTruncated));
    }
    const startURL = stringProperty("start_url");
    if (appId && recommendedId) {
      const appIdField = this.identitySection.appendField(i18nString(UIStrings.computedAppId));
      UI2.ARIAUtils.setLabel(appIdField, "App Id");
      appIdField.textContent = appId;
      const helpIcon = IconButton.Icon.create("help", "inline-icon");
      helpIcon.title = i18nString(UIStrings.appIdExplainer);
      helpIcon.setAttribute("jslog", `${VisualLogging.action("help").track({ hover: true })}`);
      appIdField.appendChild(helpIcon);
      const learnMoreLink = UI2.XLink.XLink.create("https://developer.chrome.com/blog/pwa-manifest-id/", i18nString(UIStrings.learnMore), void 0, void 0, "learn-more");
      appIdField.appendChild(learnMoreLink);
      if (!stringProperty("id")) {
        const suggestedIdNote = appIdField.createChild("div", "multiline-value");
        const suggestedIdSpan = document.createElement("code");
        suggestedIdSpan.textContent = recommendedId;
        const copyButton = new Buttons.Button.Button();
        copyButton.data = {
          variant: "icon",
          iconName: "copy",
          size: "SMALL",
          jslogContext: "manifest.copy-id",
          title: i18nString(UIStrings.copyToClipboard)
        };
        copyButton.className = "inline-button";
        copyButton.addEventListener("click", () => {
          UI2.ARIAUtils.LiveAnnouncer.alert(i18nString(UIStrings.copiedToClipboard, { PH1: recommendedId }));
          Host.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(recommendedId);
        });
        suggestedIdNote.appendChild(i18n.i18n.getFormatLocalizedString(str_, UIStrings.appIdNote, { PH1: suggestedIdSpan, PH2: copyButton }));
      }
    } else {
      this.identitySection.removeField(i18nString(UIStrings.computedAppId));
    }
    this.startURLField.removeChildren();
    if (startURL) {
      const completeURL = Common2.ParsedURL.ParsedURL.completeURL(url, startURL);
      if (completeURL) {
        const link4 = Components.Linkifier.Linkifier.linkifyURL(completeURL, { text: startURL });
        link4.tabIndex = 0;
        link4.setAttribute("jslog", `${VisualLogging.link("start-url").track({ click: true })}`);
        this.startURLField.appendChild(link4);
      }
    }
    this.themeColorSwatch.classList.toggle("hidden", !stringProperty("theme_color"));
    const themeColor = Common2.Color.parse(stringProperty("theme_color") || "white") || Common2.Color.parse("white");
    if (themeColor) {
      this.themeColorSwatch.renderColor(themeColor);
    }
    this.backgroundColorSwatch.classList.toggle("hidden", !stringProperty("background_color"));
    const backgroundColor = Common2.Color.parse(stringProperty("background_color") || "white") || Common2.Color.parse("white");
    if (backgroundColor) {
      this.backgroundColorSwatch.renderColor(backgroundColor);
    }
    this.orientationField.textContent = stringProperty("orientation");
    const displayType = stringProperty("display");
    this.displayField.textContent = displayType;
    const noteTaking = parsedManifest["note_taking"] || {};
    const newNoteUrl = noteTaking["new_note_url"];
    const hasNewNoteUrl = typeof newNoteUrl === "string";
    this.newNoteUrlField.parentElement?.classList.toggle("hidden", !hasNewNoteUrl);
    this.newNoteUrlField.removeChildren();
    if (hasNewNoteUrl) {
      const completeURL = Common2.ParsedURL.ParsedURL.completeURL(url, newNoteUrl);
      const link4 = Components.Linkifier.Linkifier.linkifyURL(completeURL, { text: newNoteUrl });
      link4.tabIndex = 0;
      this.newNoteUrlField.appendChild(link4);
    }
    const protocolHandlers = parsedManifest["protocol_handlers"] || [];
    this.protocolHandlersView.data = { protocolHandlers, manifestLink: url };
    const icons = parsedManifest["icons"] || [];
    this.iconsSection.clearContent();
    const shortcuts = parsedManifest["shortcuts"] || [];
    for (const shortcutsSection of this.shortcutSections) {
      shortcutsSection.detach(
        /** overrideHideOnDetach= */
        true
      );
    }
    const screenshots = parsedManifest["screenshots"] || [];
    for (const screenshotSection of this.screenshotsSections) {
      screenshotSection.detach(
        /** overrideHideOnDetach= */
        true
      );
    }
    const imageErrors = [];
    const setIconMaskedCheckbox = UI2.UIUtils.CheckboxLabel.create(i18nString(UIStrings.showOnlyTheMinimumSafeAreaFor));
    setIconMaskedCheckbox.classList.add("mask-checkbox");
    setIconMaskedCheckbox.setAttribute("jslog", `${VisualLogging.toggle("show-minimal-safe-area-for-maskable-icons").track({ change: true })}`);
    setIconMaskedCheckbox.addEventListener("click", () => {
      this.iconsSection.setIconMasked(setIconMaskedCheckbox.checked);
    });
    this.iconsSection.appendRow().appendChild(setIconMaskedCheckbox);
    const documentationLink = UI2.XLink.XLink.create("https://web.dev/maskable-icon/", i18nString(UIStrings.documentationOnMaskableIcons), void 0, void 0, "learn-more");
    this.iconsSection.appendRow().appendChild(i18n.i18n.getFormatLocalizedString(str_, UIStrings.needHelpReadOurS, { PH1: documentationLink }));
    let squareSizedIconAvailable = false;
    for (const icon of icons) {
      const result = await this.appendImageResourceToSection(
        url,
        icon,
        this.iconsSection,
        /** isScreenshot= */
        false
      );
      imageErrors.push(...result.imageResourceErrors);
      squareSizedIconAvailable = result.squareSizedIconAvailable || squareSizedIconAvailable;
    }
    if (!squareSizedIconAvailable) {
      imageErrors.push(i18nString(UIStrings.sSShouldHaveSquareIcon));
    }
    if (shortcuts.length > 4) {
      warnings.push(i18nString(UIStrings.shortcutsMayBeNotAvailable));
    }
    let shortcutIndex = 1;
    for (const shortcut of shortcuts) {
      const shortcutSection = this.reportView.appendSection(i18nString(UIStrings.shortcutS, { PH1: shortcutIndex }));
      shortcutSection.element.setAttribute("jslog", `${VisualLogging.section("shortcuts")}`);
      this.shortcutSections.push(shortcutSection);
      shortcutSection.appendFlexedField(i18nString(UIStrings.name), shortcut.name);
      if (shortcut.short_name) {
        shortcutSection.appendFlexedField(i18nString(UIStrings.shortName), shortcut.short_name);
      }
      if (shortcut.description) {
        shortcutSection.appendFlexedField(i18nString(UIStrings.description), shortcut.description);
      }
      const urlField = shortcutSection.appendFlexedField(i18nString(UIStrings.url));
      const shortcutUrl = Common2.ParsedURL.ParsedURL.completeURL(url, shortcut.url);
      const link4 = Components.Linkifier.Linkifier.linkifyURL(shortcutUrl, { text: shortcut.url });
      link4.setAttribute("jslog", `${VisualLogging.link("shortcut").track({ click: true })}`);
      link4.tabIndex = 0;
      urlField.appendChild(link4);
      const shortcutIcons = shortcut.icons || [];
      let hasShortcutIconLargeEnough = false;
      for (const shortcutIcon of shortcutIcons) {
        const { imageResourceErrors: shortcutIconErrors } = await this.appendImageResourceToSection(
          url,
          shortcutIcon,
          shortcutSection,
          /** isScreenshot= */
          false
        );
        imageErrors.push(...shortcutIconErrors);
        if (!hasShortcutIconLargeEnough && shortcutIcon.sizes) {
          const shortcutIconSize = shortcutIcon.sizes.match(/^(\d+)x(\d+)$/);
          if (shortcutIconSize && shortcutIconSize[1] >= 96 && shortcutIconSize[2] >= 96) {
            hasShortcutIconLargeEnough = true;
          }
        }
      }
      if (!hasShortcutIconLargeEnough) {
        imageErrors.push(i18nString(UIStrings.shortcutSShouldIncludeAXPixel, { PH1: shortcutIndex }));
      }
      shortcutIndex++;
    }
    let screenshotIndex = 1;
    const formFactorScreenshotDimensions = /* @__PURE__ */ new Map();
    let haveScreenshotsDifferentAspectRatio = false;
    for (const screenshot of screenshots) {
      const screenshotSection = this.reportView.appendSection(i18nString(UIStrings.screenshotS, { PH1: screenshotIndex }));
      this.screenshotsSections.push(screenshotSection);
      if (screenshot.form_factor) {
        screenshotSection.appendFlexedField(i18nString(UIStrings.formFactor), screenshot.form_factor);
      }
      if (screenshot.label) {
        screenshotSection.appendFlexedField(i18nString(UIStrings.label), screenshot.label);
      }
      if (screenshot.platform) {
        screenshotSection.appendFlexedField(i18nString(UIStrings.platform), screenshot.platform);
      }
      const { imageResourceErrors: screenshotErrors, naturalWidth: width, naturalHeight: height } = await this.appendImageResourceToSection(
        url,
        screenshot,
        screenshotSection,
        /** isScreenshot= */
        true
      );
      imageErrors.push(...screenshotErrors);
      if (screenshot.form_factor && width && height) {
        formFactorScreenshotDimensions.has(screenshot.form_factor) || formFactorScreenshotDimensions.set(screenshot.form_factor, { width, height });
        const formFactorFirstScreenshotDimensions = formFactorScreenshotDimensions.get(screenshot.form_factor);
        if (formFactorFirstScreenshotDimensions) {
          haveScreenshotsDifferentAspectRatio = haveScreenshotsDifferentAspectRatio || width * formFactorFirstScreenshotDimensions.height !== height * formFactorFirstScreenshotDimensions.width;
        }
      }
      screenshotIndex++;
    }
    if (haveScreenshotsDifferentAspectRatio) {
      warnings.push(i18nString(UIStrings.screenshotsMustHaveSameAspectRatio));
    }
    const screenshotsForDesktop = screenshots.filter((screenshot) => screenshot.form_factor === "wide");
    const screenshotsForMobile = screenshots.filter((screenshot) => screenshot.form_factor !== "wide");
    if (screenshotsForDesktop.length < 1) {
      warnings.push(i18nString(UIStrings.noScreenshotsForRicherPWAInstallOnDesktop));
    }
    if (screenshotsForMobile.length < 1) {
      warnings.push(i18nString(UIStrings.noScreenshotsForRicherPWAInstallOnMobile));
    }
    if (screenshotsForDesktop.length > 8) {
      warnings.push(i18nString(UIStrings.tooManyScreenshotsForDesktop));
    }
    if (screenshotsForMobile.length > 5) {
      warnings.push(i18nString(UIStrings.tooManyScreenshotsForMobile));
    }
    this.installabilitySection.clearContent();
    this.installabilitySection.element.classList.toggle("hidden", !installabilityErrors.length);
    const errorMessages = this.getInstallabilityErrorMessages(installabilityErrors);
    for (const error of errorMessages) {
      const msgElement = document.createTextNode(error);
      this.installabilitySection.appendRow().appendChild(msgElement);
    }
    this.errorsSection.element.classList.toggle("hidden", !errors.length && !imageErrors.length && !warnings.length);
    for (const warning of warnings) {
      const msgElement = document.createTextNode(warning);
      this.errorsSection.appendRow().appendChild(msgElement);
    }
    for (const error of imageErrors) {
      const msgElement = document.createTextNode(error);
      this.errorsSection.appendRow().appendChild(msgElement);
    }
    function stringProperty(name) {
      const value = parsedManifest[name];
      if (typeof value !== "string") {
        return "";
      }
      return value;
    }
    this.windowControlsSection.clearContent();
    const displayOverride = parsedManifest["display_override"] || [];
    const hasWco = displayOverride.includes("window-controls-overlay");
    const displayOverrideLink = UI2.XLink.XLink.create("https://developer.mozilla.org/en-US/docs/Web/Manifest/display_override", "display-override", void 0, void 0, "display-override");
    const displayOverrideText = document.createElement("code");
    displayOverrideText.appendChild(displayOverrideLink);
    const wcoStatusMessage = this.windowControlsSection.appendRow();
    if (hasWco) {
      const checkmarkIcon = IconButton.Icon.create("check-circle", "inline-icon");
      wcoStatusMessage.appendChild(checkmarkIcon);
      const wco = document.createElement("code");
      wco.classList.add("wco");
      wco.textContent = "window-controls-overlay";
      wcoStatusMessage.appendChild(i18n.i18n.getFormatLocalizedString(str_, UIStrings.wcoFound, { PH1: wco, PH2: displayOverrideText, PH3: link3 }));
      if (this.overlayModel) {
        await this.appendWindowControlsToSection(this.overlayModel, url, stringProperty("theme_color"));
      }
    } else {
      const infoIcon = IconButton.Icon.create("info", "inline-icon");
      wcoStatusMessage.appendChild(infoIcon);
      wcoStatusMessage.appendChild(i18n.i18n.getFormatLocalizedString(str_, UIStrings.wcoNotFound, { PH1: displayOverrideText }));
    }
    const wcoDocumentationLink = UI2.XLink.XLink.create("https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/window-controls-overlay", i18nString(UIStrings.customizePwaTitleBar), void 0, void 0, "customize-pwa-tittle-bar");
    this.windowControlsSection.appendRow().appendChild(i18n.i18n.getFormatLocalizedString(str_, UIStrings.wcoNeedHelpReadMore, { PH1: wcoDocumentationLink }));
    this.dispatchEventToListeners(
      "ManifestRendered"
      /* Events.MANIFEST_RENDERED */
    );
  }
  getInstallabilityErrorMessages(installabilityErrors) {
    const errorMessages = [];
    for (const installabilityError of installabilityErrors) {
      let errorMessage;
      switch (installabilityError.errorId) {
        case "not-in-main-frame":
          errorMessage = i18nString(UIStrings.pageIsNotLoadedInTheMainFrame);
          break;
        case "not-from-secure-origin":
          errorMessage = i18nString(UIStrings.pageIsNotServedFromASecureOrigin);
          break;
        case "no-manifest":
          errorMessage = i18nString(UIStrings.pageHasNoManifestLinkUrl);
          break;
        case "manifest-empty":
          errorMessage = i18nString(UIStrings.manifestCouldNotBeFetchedIsEmpty);
          break;
        case "start-url-not-valid":
          errorMessage = i18nString(UIStrings.manifestStartUrlIsNotValid);
          break;
        case "manifest-missing-name-or-short-name":
          errorMessage = i18nString(UIStrings.manifestDoesNotContainANameOr);
          break;
        case "manifest-display-not-supported":
          errorMessage = i18nString(UIStrings.manifestDisplayPropertyMustBeOne);
          break;
        case "manifest-missing-suitable-icon":
          if (installabilityError.errorArguments.length !== 1 || installabilityError.errorArguments[0].name !== "minimum-icon-size-in-pixels") {
            console.error("Installability error does not have the correct errorArguments");
            break;
          }
          errorMessage = i18nString(UIStrings.manifestDoesNotContainASuitable, { PH1: installabilityError.errorArguments[0].value });
          break;
        case "no-acceptable-icon":
          if (installabilityError.errorArguments.length !== 1 || installabilityError.errorArguments[0].name !== "minimum-icon-size-in-pixels") {
            console.error("Installability error does not have the correct errorArguments");
            break;
          }
          errorMessage = i18nString(UIStrings.noSuppliedIconIsAtLeastSpxSquare, { PH1: installabilityError.errorArguments[0].value });
          break;
        case "cannot-download-icon":
          errorMessage = i18nString(UIStrings.couldNotDownloadARequiredIcon);
          break;
        case "no-icon-available":
          errorMessage = i18nString(UIStrings.downloadedIconWasEmptyOr);
          break;
        case "platform-not-supported-on-android":
          errorMessage = i18nString(UIStrings.theSpecifiedApplicationPlatform);
          break;
        case "no-id-specified":
          errorMessage = i18nString(UIStrings.noPlayStoreIdProvided);
          break;
        case "ids-do-not-match":
          errorMessage = i18nString(UIStrings.thePlayStoreAppUrlAndPlayStoreId);
          break;
        case "already-installed":
          errorMessage = i18nString(UIStrings.theAppIsAlreadyInstalled);
          break;
        case "url-not-supported-for-webapk":
          errorMessage = i18nString(UIStrings.aUrlInTheManifestContainsA);
          break;
        case "in-incognito":
          errorMessage = i18nString(UIStrings.pageIsLoadedInAnIncognitoWindow);
          break;
        case "not-offline-capable":
          errorMessage = i18nString(UIStrings.pageDoesNotWorkOffline);
          break;
        case "no-url-for-service-worker":
          errorMessage = i18nString(UIStrings.couldNotCheckServiceWorker);
          break;
        case "prefer-related-applications":
          errorMessage = i18nString(UIStrings.manifestSpecifies);
          break;
        case "prefer-related-applications-only-beta-stable":
          errorMessage = i18nString(UIStrings.preferrelatedapplicationsIsOnly);
          break;
        case "manifest-display-override-not-supported":
          errorMessage = i18nString(UIStrings.manifestContainsDisplayoverride);
          break;
        case "warn-not-offline-capable":
          errorMessage = i18nString(UIStrings.pageDoesNotWorkOfflineThePage, { PH1: "https://developer.chrome.com/blog/improved-pwa-offline-detection/" });
          break;
        default:
          console.error(`Installability error id '${installabilityError.errorId}' is not recognized`);
          break;
      }
      if (errorMessage) {
        errorMessages.push(errorMessage);
      }
    }
    return errorMessages;
  }
  async loadImage(url) {
    const frameId = this.resourceTreeModel?.mainFrame?.id;
    if (!this.target) {
      throw new Error("no target");
    }
    if (!frameId) {
      throw new Error("no main frame found");
    }
    const { content } = await SDK.PageResourceLoader.PageResourceLoader.instance().loadResource(
      url,
      {
        target: this.target,
        frameId,
        initiatorUrl: this.target.inspectedURL()
      },
      /* isBinary=*/
      true
    );
    const wrapper = document.createElement("div");
    wrapper.classList.add("image-wrapper");
    const image = document.createElement("img");
    const result = new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    });
    image.src = "data:application/octet-stream;base64," + await Common2.Base64.encode(content);
    image.alt = i18nString(UIStrings.imageFromS, { PH1: url });
    wrapper.appendChild(image);
    try {
      await result;
      return { wrapper, image };
    } catch {
    }
    return null;
  }
  parseSizes(sizes, resourceName, imageUrl, imageResourceErrors) {
    const rawSizeArray = sizes ? sizes.split(/\s+/) : [];
    const parsedSizes = [];
    for (const size of rawSizeArray) {
      if (size === "any") {
        if (!parsedSizes.find((x) => "any" in x)) {
          parsedSizes.push({ any: "any", formatted: "any" });
        }
        continue;
      }
      const match = size.match(/^(?<width>\d+)[xX](?<height>\d+)$/);
      if (match) {
        const width = parseInt(match.groups?.width || "", 10);
        const height = parseInt(match.groups?.height || "", 10);
        const formatted = `${width}\xD7${height}px`;
        parsedSizes.push({ width, height, formatted });
      } else {
        imageResourceErrors.push(i18nString(UIStrings.sSShouldSpecifyItsSizeAs, { PH1: resourceName, PH2: imageUrl }));
      }
    }
    return parsedSizes;
  }
  checkSizeProblem(size, image, resourceName, imageUrl) {
    if ("any" in size) {
      return { hasSquareSize: image.naturalWidth === image.naturalHeight };
    }
    const hasSquareSize = size.width === size.height;
    if (image.naturalWidth !== size.width && image.naturalHeight !== size.height) {
      return {
        error: i18nString(UIStrings.actualSizeSspxOfSSDoesNotMatch, {
          PH1: image.naturalWidth,
          PH2: image.naturalHeight,
          PH3: resourceName,
          PH4: imageUrl,
          PH5: size.width,
          PH6: size.height
        }),
        hasSquareSize
      };
    }
    if (image.naturalWidth !== size.width) {
      return {
        error: i18nString(UIStrings.actualWidthSpxOfSSDoesNotMatch, { PH1: image.naturalWidth, PH2: resourceName, PH3: imageUrl, PH4: size.width }),
        hasSquareSize
      };
    }
    if (image.naturalHeight !== size.height) {
      return {
        error: i18nString(UIStrings.actualHeightSpxOfSSDoesNotMatch, { PH1: image.naturalHeight, PH2: resourceName, PH3: imageUrl, PH4: size.height }),
        hasSquareSize
      };
    }
    return { hasSquareSize };
  }
  async appendImageResourceToSection(baseUrl, imageResource, section8, isScreenshot) {
    const imageResourceErrors = [];
    const resourceName = isScreenshot ? i18nString(UIStrings.screenshot) : i18nString(UIStrings.icon);
    if (!imageResource.src) {
      imageResourceErrors.push(i18nString(UIStrings.sSrcIsNotSet, { PH1: resourceName }));
      return { imageResourceErrors };
    }
    const imageUrl = Common2.ParsedURL.ParsedURL.completeURL(baseUrl, imageResource["src"]);
    if (!imageUrl) {
      imageResourceErrors.push(i18nString(UIStrings.sUrlSFailedToParse, { PH1: resourceName, PH2: imageResource["src"] }));
      return { imageResourceErrors };
    }
    const result = await this.loadImage(imageUrl);
    if (!result) {
      imageResourceErrors.push(i18nString(UIStrings.sSFailedToLoad, { PH1: resourceName, PH2: imageUrl }));
      return { imageResourceErrors };
    }
    const { wrapper, image } = result;
    const { naturalWidth, naturalHeight } = image;
    const sizes = this.parseSizes(imageResource["sizes"], resourceName, imageUrl, imageResourceErrors);
    const title = sizes.map((x) => x.formatted).join(" ") + "\n" + (imageResource["type"] || "");
    const field = section8.appendFlexedField(title);
    let squareSizedIconAvailable = false;
    if (!imageResource.sizes) {
      imageResourceErrors.push(i18nString(UIStrings.sSDoesNotSpecifyItsSizeInThe, { PH1: resourceName, PH2: imageUrl }));
    } else {
      if (isScreenshot && sizes.length > 0 && "any" in sizes[0]) {
        imageResourceErrors.push(i18nString(UIStrings.screenshotPixelSize, { url: imageUrl }));
      }
      for (const size of sizes) {
        const { error, hasSquareSize } = this.checkSizeProblem(size, image, resourceName, imageUrl);
        squareSizedIconAvailable = squareSizedIconAvailable || hasSquareSize;
        if (error) {
          imageResourceErrors.push(error);
        } else if (isScreenshot) {
          const width = "any" in size ? image.naturalWidth : size.width;
          const height = "any" in size ? image.naturalHeight : size.height;
          if (width < 320 || height < 320) {
            imageResourceErrors.push(i18nString(UIStrings.sSSizeShouldBeAtLeast320, { PH1: resourceName, PH2: imageUrl }));
          } else if (width > 3840 || height > 3840) {
            imageResourceErrors.push(i18nString(UIStrings.sSSizeShouldBeAtMost3840, { PH1: resourceName, PH2: imageUrl }));
          } else if (width > height * 2.3) {
            imageResourceErrors.push(i18nString(UIStrings.sSWidthDoesNotComplyWithRatioRequirement, { PH1: resourceName, PH2: imageUrl }));
          } else if (height > width * 2.3) {
            imageResourceErrors.push(i18nString(UIStrings.sSHeightDoesNotComplyWithRatioRequirement, { PH1: resourceName, PH2: imageUrl }));
          }
        }
      }
    }
    image.width = image.naturalWidth;
    const purpose = typeof imageResource["purpose"] === "string" ? imageResource["purpose"].toLowerCase() : "";
    if (purpose.includes("any") && purpose.includes("maskable")) {
      imageResourceErrors.push(i18nString(UIStrings.avoidPurposeAnyAndMaskable));
    }
    field.appendChild(wrapper);
    return { imageResourceErrors, squareSizedIconAvailable, naturalWidth, naturalHeight };
  }
  async appendWindowControlsToSection(overlayModel, url, themeColor) {
    const wcoStyleSheetText = await overlayModel.hasStyleSheetText(url);
    if (!wcoStyleSheetText) {
      return;
    }
    await overlayModel.toggleWindowControlsToolbar(false);
    const wcoOsCheckbox = UI2.UIUtils.CheckboxLabel.create(i18nString(UIStrings.selectWindowControlsOverlayEmulationOs), false);
    wcoOsCheckbox.addEventListener("click", async () => {
      await this.overlayModel?.toggleWindowControlsToolbar(wcoOsCheckbox.checked);
    });
    const osSelectElement = wcoOsCheckbox.createChild("select");
    osSelectElement.appendChild(UI2.UIUtils.createOption("Windows", "Windows", "windows"));
    osSelectElement.appendChild(UI2.UIUtils.createOption("macOS", "Mac", "macos"));
    osSelectElement.appendChild(UI2.UIUtils.createOption("Linux", "Linux", "linux"));
    osSelectElement.selectedIndex = 0;
    if (this.overlayModel) {
      osSelectElement.value = this.overlayModel?.getWindowControlsConfig().selectedPlatform;
    }
    osSelectElement.addEventListener("change", async () => {
      const selectedOS = osSelectElement.options[osSelectElement.selectedIndex].value;
      if (this.overlayModel) {
        this.overlayModel.setWindowControlsPlatform(selectedOS);
        await this.overlayModel.toggleWindowControlsToolbar(wcoOsCheckbox.checked);
      }
    });
    this.windowControlsSection.appendRow().appendChild(wcoOsCheckbox);
    overlayModel.setWindowControlsThemeColor(themeColor);
  }
};

// gen/front_end/panels/application/BackForwardCacheTreeElement.js
import * as Host2 from "./../../core/host/host.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as IconButton2 from "./../../ui/components/icon_button/icon_button.js";
import * as LegacyWrapper from "./../../ui/components/legacy_wrapper/legacy_wrapper.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
import * as ApplicationComponents2 from "./components/components.js";
var UIStrings2 = {
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  backForwardCache: "Back/forward cache"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/application/BackForwardCacheTreeElement.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
var BackForwardCacheTreeElement = class extends ApplicationPanelTreeElement {
  view;
  constructor(resourcesPanel) {
    super(resourcesPanel, i18nString2(UIStrings2.backForwardCache), false, "bfcache");
    const icon = IconButton2.Icon.create("database");
    this.setLeadingIcons([icon]);
  }
  get itemURL() {
    return "bfcache://";
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    if (!this.view) {
      this.view = LegacyWrapper.LegacyWrapper.legacyWrapper(UI3.Widget.Widget, new ApplicationComponents2.BackForwardCacheView.BackForwardCacheView());
    }
    this.showView(this.view);
    Host2.userMetrics.panelShown("back-forward-cache");
    return false;
  }
};

// gen/front_end/panels/application/BackgroundServiceModel.js
var BackgroundServiceModel_exports = {};
__export(BackgroundServiceModel_exports, {
  BackgroundServiceModel: () => BackgroundServiceModel,
  Events: () => Events
});
import * as SDK2 from "./../../core/sdk/sdk.js";
var BackgroundServiceModel = class extends SDK2.SDKModel.SDKModel {
  backgroundServiceAgent;
  events;
  constructor(target) {
    super(target);
    this.backgroundServiceAgent = target.backgroundServiceAgent();
    target.registerBackgroundServiceDispatcher(this);
    this.events = /* @__PURE__ */ new Map();
  }
  enable(service) {
    this.events.set(service, []);
    void this.backgroundServiceAgent.invoke_startObserving({ service });
  }
  setRecording(shouldRecord, service) {
    void this.backgroundServiceAgent.invoke_setRecording({ shouldRecord, service });
  }
  clearEvents(service) {
    this.events.set(service, []);
    void this.backgroundServiceAgent.invoke_clearEvents({ service });
  }
  getEvents(service) {
    return this.events.get(service) || [];
  }
  recordingStateChanged({ isRecording, service }) {
    this.dispatchEventToListeners(Events.RecordingStateChanged, { isRecording, serviceName: service });
  }
  backgroundServiceEventReceived({ backgroundServiceEvent }) {
    this.events.get(backgroundServiceEvent.service).push(backgroundServiceEvent);
    this.dispatchEventToListeners(Events.BackgroundServiceEventReceived, backgroundServiceEvent);
  }
};
SDK2.SDKModel.SDKModel.register(BackgroundServiceModel, { capabilities: 1, autostart: false });
var Events;
(function(Events3) {
  Events3["RecordingStateChanged"] = "RecordingStateChanged";
  Events3["BackgroundServiceEventReceived"] = "BackgroundServiceEventReceived";
})(Events || (Events = {}));

// gen/front_end/panels/application/BackgroundServiceView.js
var BackgroundServiceView_exports = {};
__export(BackgroundServiceView_exports, {
  ActionDelegate: () => ActionDelegate,
  BackgroundServiceView: () => BackgroundServiceView,
  EventDataNode: () => EventDataNode
});
import "./../../ui/legacy/legacy.js";
import * as i18n5 from "./../../core/i18n/i18n.js";
import * as Platform from "./../../core/platform/platform.js";
import * as SDK3 from "./../../core/sdk/sdk.js";
import * as Bindings from "./../../models/bindings/bindings.js";
import * as Buttons2 from "./../../ui/components/buttons/buttons.js";
import * as DataGrid from "./../../ui/legacy/components/data_grid/data_grid.js";

// gen/front_end/ui/legacy/emptyWidget.css.js
var emptyWidget_css_default = `/*
 * Copyright (c) 2015 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.empty-view-scroller {
  overflow: auto;
}

/*# sourceURL=${import.meta.resolve("./emptyWidget.css")} */`;

// gen/front_end/panels/application/BackgroundServiceView.js
import * as UI4 from "./../../ui/legacy/legacy.js";
import * as VisualLogging2 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/application/backgroundServiceView.css.js
var backgroundServiceView_css_default = `/*
 * Copyright 2021 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.background-service-toolbar {
  background-color: var(--sys-color-cdt-base-container);
  border-bottom: var(--sys-size-1) solid var(--sys-color-divider);
}

.data-grid {
  flex: auto;
  border: none;
}

[slot="insertion-point-main"] {
  overflow: auto;
}

.background-service-preview {
  position: absolute;
  background-color: var(--sys-color-cdt-base-container);
  justify-content: center;
  align-items: center;
  overflow: auto;
  font-size: 13px;
  color: var(--sys-color-on-surface-subtle);
}

.background-service-preview > div {
  max-width: 450px;
  margin: 10px;
  text-align: center;
}

.background-service-preview > div > p {
  flex: none;
  white-space: pre-line;
}

.background-service-shortcut {
  color: var(--sys-color-on-surface-subtle);
}

.background-service-metadata {
  padding-left: 5px;
  padding-top: 10px;
}

.background-service-metadata-entry {
  padding-left: 10px;
  padding-bottom: 5px;
}

.background-service-metadata-name {
  color: var(--sys-color-on-surface-subtle);
  display: inline-block;
  margin-right: 0.25em;
  font-weight: bold;
}

.background-service-metadata-value {
  display: inline;
  margin-right: 1em;
  white-space: pre-wrap;
  word-break: break-all;
  user-select: text;
}

.background-service-empty-value {
  color: var(--sys-color-state-disabled);
  font-style: italic;
}

.background-service-record-inline-button {
  margin-bottom: 6px;
}

/*# sourceURL=${import.meta.resolve("./backgroundServiceView.css")} */`;

// gen/front_end/panels/application/BackgroundServiceView.js
var UIStrings3 = {
  /**
   * @description Text in Background Service View of the Application panel
   */
  backgroundFetch: "Background fetch",
  /**
   * @description Text in Background Service View of the Application panel
   */
  backgroundSync: "Background sync",
  /**
   * @description Text in Background Service View of the Application panel
   */
  pushMessaging: "Push messaging",
  /**
   * @description Text in Background Service View of the Application panel
   */
  notifications: "Notifications",
  /**
   * @description Text in Background Service View of the Application panel
   */
  paymentHandler: "Payment handler",
  /**
   * @description Text in the Periodic Background Service View of the Application panel
   */
  periodicBackgroundSync: "Periodic background sync",
  /**
   * @description Text to clear content
   */
  clear: "Clear",
  /**
   * @description Tooltip text that appears when hovering over the largeicon download button in the Background Service View of the Application panel
   */
  saveEvents: "Save events",
  /**
   * @description Text in Background Service View of the Application panel
   */
  showEventsFromOtherDomains: "Show events from other domains",
  /**
   * @description Text of a checkbox to show events for other storage keys
   */
  showEventsForOtherStorageKeys: "Show events from other storage partitions",
  /**
   * @description Title of an action under the Background Services category that can be invoked through the Command Menu
   */
  stopRecordingEvents: "Stop recording events",
  /**
   * @description Title of an action under the Background Services category that can be invoked through the Command Menu
   */
  startRecordingEvents: "Start recording events",
  /**
   * @description Text for timestamps of items
   */
  timestamp: "Timestamp",
  /**
   * @description Text that refers to some events
   */
  event: "Event",
  /**
   * @description Text for the origin of something
   */
  origin: "Origin",
  /**
   * @description Text for the storage key of something
   */
  storageKey: "Storage Key",
  /**
   * @description Text in Background Service View of the Application panel. The Scope is a URL associated with the Service Worker, which limits which pages/sites the Service Worker operates on.
   */
  swScope: "Service Worker Scope",
  /**
   * @description Text in Background Service View of the Application panel
   */
  instanceId: "Instance ID",
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  backgroundServices: "Background services",
  /**
   * @description Text in Background Service View of the Application panel.
   *             An event here refers to a background service event that is an entry in a table.
   */
  noEventSelected: "No event selected",
  /**
   * @description Text in Background Service View of the Application panel
   */
  selectAnEventToViewMetadata: "Select an event to view its metadata",
  /**
   * @description Text in Background Service View of the Application panel
   * @example {Background Fetch} PH1
   */
  recordingSActivity: "Recording {PH1} activity\u2026",
  /**
   * @description Text in Background Service View of the Application panel
   */
  noRecording: "No recording yet",
  /**
   * @description Inform users that DevTools are recording/waiting for events in the Periodic Background Sync tool of the Application panel
   * @example {Background Fetch} PH1
   */
  devtoolsWillRecordAllSActivity: "DevTools will record all {PH1} activity for up to 3 days, even when closed.",
  /**
   * @description Text in Background Service View of the Application panel to instruct the user on how to start a recording for
   * background services.
   * @example {Start recording events} PH1
   * @example {Ctrl + E} PH2
   */
  startRecordingToDebug: 'Start to debug background services by using the "{PH1}" button or by pressing {PH2}.',
  /**
   * @description Text to show an item is empty
   */
  empty: "empty",
  /**
   * @description Text in Background Service View of the Application panel
   */
  noMetadataForThisEvent: "No metadata for this event"
};
var str_3 = i18n5.i18n.registerUIStrings("panels/application/BackgroundServiceView.ts", UIStrings3);
var i18nString3 = i18n5.i18n.getLocalizedString.bind(void 0, str_3);
var BackgroundServiceView = class _BackgroundServiceView extends UI4.Widget.VBox {
  serviceName;
  model;
  serviceWorkerManager;
  securityOriginManager;
  storageKeyManager;
  recordAction;
  recordButton;
  originCheckbox;
  storageKeyCheckbox;
  saveButton;
  toolbar;
  splitWidget;
  dataGrid;
  previewPanel;
  selectedEventNode;
  preview;
  static getUIString(serviceName) {
    switch (serviceName) {
      case "backgroundFetch":
        return i18nString3(UIStrings3.backgroundFetch);
      case "backgroundSync":
        return i18nString3(UIStrings3.backgroundSync);
      case "pushMessaging":
        return i18nString3(UIStrings3.pushMessaging);
      case "notifications":
        return i18nString3(UIStrings3.notifications);
      case "paymentHandler":
        return i18nString3(UIStrings3.paymentHandler);
      case "periodicBackgroundSync":
        return i18nString3(UIStrings3.periodicBackgroundSync);
      default:
        return "";
    }
  }
  constructor(serviceName, model) {
    super({
      jslog: `${VisualLogging2.pane().context(Platform.StringUtilities.toKebabCase(serviceName))}`,
      useShadowDom: true
    });
    this.registerRequiredCSS(emptyWidget_css_default, backgroundServiceView_css_default);
    this.serviceName = serviceName;
    this.model = model;
    this.model.addEventListener(Events.RecordingStateChanged, this.onRecordingStateChanged, this);
    this.model.addEventListener(Events.BackgroundServiceEventReceived, this.onEventReceived, this);
    this.model.enable(this.serviceName);
    this.serviceWorkerManager = this.model.target().model(SDK3.ServiceWorkerManager.ServiceWorkerManager);
    this.securityOriginManager = this.model.target().model(SDK3.SecurityOriginManager.SecurityOriginManager);
    if (!this.securityOriginManager) {
      throw new Error("SecurityOriginManager instance is missing");
    }
    this.securityOriginManager.addEventListener(SDK3.SecurityOriginManager.Events.MainSecurityOriginChanged, () => this.onOriginChanged());
    this.storageKeyManager = this.model.target().model(SDK3.StorageKeyManager.StorageKeyManager);
    if (!this.storageKeyManager) {
      throw new Error("StorageKeyManager instance is missing");
    }
    this.storageKeyManager.addEventListener("MainStorageKeyChanged", () => this.onStorageKeyChanged());
    this.recordAction = UI4.ActionRegistry.ActionRegistry.instance().getAction("background-service.toggle-recording");
    this.toolbar = this.contentElement.createChild("devtools-toolbar", "background-service-toolbar");
    this.toolbar.setAttribute("jslog", `${VisualLogging2.toolbar()}`);
    void this.setupToolbar();
    this.splitWidget = new UI4.SplitWidget.SplitWidget(
      /* isVertical= */
      false,
      /* secondIsSidebar= */
      true
    );
    this.splitWidget.show(this.contentElement);
    this.dataGrid = this.createDataGrid();
    this.previewPanel = new UI4.Widget.VBox();
    this.previewPanel.element.setAttribute("jslog", `${VisualLogging2.pane("preview").track({ resize: true })}`);
    this.selectedEventNode = null;
    this.preview = null;
    this.splitWidget.setMainWidget(this.dataGrid.asWidget());
    this.splitWidget.setSidebarWidget(this.previewPanel);
    this.splitWidget.hideMain();
    this.showPreview(null);
  }
  getDataGrid() {
    return this.dataGrid;
  }
  /**
   * Creates the toolbar UI element.
   */
  async setupToolbar() {
    this.toolbar.wrappable = true;
    this.recordButton = UI4.Toolbar.Toolbar.createActionButton(this.recordAction);
    this.recordButton.toggleOnClick(false);
    this.toolbar.appendToolbarItem(this.recordButton);
    const clearButton = new UI4.Toolbar.ToolbarButton(i18nString3(UIStrings3.clear), "clear", void 0, "background-service.clear");
    clearButton.addEventListener("Click", () => this.clearEvents());
    this.toolbar.appendToolbarItem(clearButton);
    this.toolbar.appendSeparator();
    this.saveButton = new UI4.Toolbar.ToolbarButton(i18nString3(UIStrings3.saveEvents), "download", void 0, "background-service.save-events");
    this.saveButton.addEventListener("Click", (_event) => {
      void this.saveToFile();
    });
    this.saveButton.setEnabled(false);
    this.toolbar.appendToolbarItem(this.saveButton);
    this.toolbar.appendSeparator();
    this.originCheckbox = new UI4.Toolbar.ToolbarCheckbox(i18nString3(UIStrings3.showEventsFromOtherDomains), i18nString3(UIStrings3.showEventsFromOtherDomains), () => this.refreshView(), "show-events-from-other-domains");
    this.toolbar.appendToolbarItem(this.originCheckbox);
    this.storageKeyCheckbox = new UI4.Toolbar.ToolbarCheckbox(i18nString3(UIStrings3.showEventsForOtherStorageKeys), i18nString3(UIStrings3.showEventsForOtherStorageKeys), () => this.refreshView(), "show-events-from-other-partitions");
    this.toolbar.appendToolbarItem(this.storageKeyCheckbox);
  }
  /**
   * Displays all available events in the grid.
   */
  refreshView() {
    this.clearView();
    const events = this.model.getEvents(this.serviceName).filter((event) => this.acceptEvent(event));
    for (const event of events) {
      this.addEvent(event);
    }
  }
  /**
   * Clears the grid and panel.
   */
  clearView() {
    this.selectedEventNode = null;
    this.dataGrid.rootNode().removeChildren();
    this.splitWidget.hideMain();
    this.saveButton.setEnabled(false);
    this.showPreview(null);
  }
  /**
   * Called when the `Toggle Record` button is clicked.
   */
  toggleRecording() {
    this.model.setRecording(!this.recordButton.isToggled(), this.serviceName);
  }
  /**
   * Called when the `Clear` button is clicked.
   */
  clearEvents() {
    this.model.clearEvents(this.serviceName);
    this.clearView();
  }
  onRecordingStateChanged({ data: state }) {
    if (state.serviceName !== this.serviceName) {
      return;
    }
    if (state.isRecording === this.recordButton.isToggled()) {
      return;
    }
    this.recordButton.setToggled(state.isRecording);
    this.updateRecordButtonTooltip();
    this.showPreview(this.selectedEventNode);
  }
  updateRecordButtonTooltip() {
    const buttonTooltip = this.recordButton.isToggled() ? i18nString3(UIStrings3.stopRecordingEvents) : i18nString3(UIStrings3.startRecordingEvents);
    this.recordButton.setTitle(buttonTooltip, "background-service.toggle-recording");
  }
  onEventReceived({ data: serviceEvent }) {
    if (!this.acceptEvent(serviceEvent)) {
      return;
    }
    this.addEvent(serviceEvent);
  }
  onOriginChanged() {
    if (this.originCheckbox.checked()) {
      return;
    }
    this.refreshView();
  }
  onStorageKeyChanged() {
    if (this.storageKeyCheckbox.checked()) {
      return;
    }
    this.refreshView();
  }
  addEvent(serviceEvent) {
    const data = this.createEventData(serviceEvent);
    const dataNode = new EventDataNode(data, serviceEvent.eventMetadata);
    this.dataGrid.rootNode().appendChild(dataNode);
    if (this.splitWidget.showMode() !== "Both") {
      this.splitWidget.showBoth();
    }
    if (this.dataGrid.rootNode().children.length === 1) {
      this.saveButton.setEnabled(true);
      this.showPreview(this.selectedEventNode);
    }
  }
  createDataGrid() {
    const columns = [
      { id: "id", title: "#", weight: 1 },
      { id: "timestamp", title: i18nString3(UIStrings3.timestamp), weight: 7 },
      { id: "event-name", title: i18nString3(UIStrings3.event), weight: 8 },
      { id: "origin", title: i18nString3(UIStrings3.origin), weight: 8 },
      { id: "storage-key", title: i18nString3(UIStrings3.storageKey), weight: 8 },
      { id: "sw-scope", title: i18nString3(UIStrings3.swScope), weight: 4 },
      { id: "instance-id", title: i18nString3(UIStrings3.instanceId), weight: 8 }
    ];
    const dataGrid = new DataGrid.DataGrid.DataGridImpl({
      displayName: i18nString3(UIStrings3.backgroundServices),
      columns,
      refreshCallback: void 0,
      deleteCallback: void 0
    });
    dataGrid.setStriped(true);
    dataGrid.addEventListener("SelectedNode", (event) => this.showPreview(event.data));
    return dataGrid;
  }
  /**
   * Creates the data object to pass to the DataGrid Node.
   */
  createEventData(serviceEvent) {
    let swScope = "";
    const registration = this.serviceWorkerManager ? this.serviceWorkerManager.registrations().get(serviceEvent.serviceWorkerRegistrationId) : void 0;
    if (registration) {
      swScope = registration.scopeURL.substr(registration.securityOrigin.length);
    }
    return {
      id: this.dataGrid.rootNode().children.length + 1,
      timestamp: UI4.UIUtils.formatTimestamp(
        serviceEvent.timestamp * 1e3,
        /* full= */
        true
      ),
      origin: serviceEvent.origin,
      "storage-key": serviceEvent.storageKey,
      "sw-scope": swScope,
      "event-name": serviceEvent.eventName,
      "instance-id": serviceEvent.instanceId
    };
  }
  /**
   * Filtration function to know whether event should be shown or not.
   */
  acceptEvent(event) {
    if (event.service !== this.serviceName) {
      return false;
    }
    if (this.originCheckbox.checked() || this.storageKeyCheckbox.checked()) {
      return true;
    }
    const origin = event.origin.substr(0, event.origin.length - 1);
    const storageKey = event.storageKey;
    return this.securityOriginManager.securityOrigins().includes(origin) || this.storageKeyManager.storageKeys().includes(storageKey);
  }
  createLearnMoreLink() {
    let url = "https://developer.chrome.com/docs/devtools/javascript/background-services/";
    switch (this.serviceName) {
      case "backgroundFetch":
        url += "#fetch";
        break;
      case "backgroundSync":
        url += "#sync";
        break;
      case "pushMessaging":
        url += "#push";
        break;
      case "notifications":
        url += "#notifications";
        break;
      default:
        break;
    }
    return url;
  }
  showPreview(dataNode) {
    if (this.selectedEventNode && this.selectedEventNode === dataNode) {
      return;
    }
    this.selectedEventNode = dataNode;
    if (this.preview) {
      this.preview.detach();
    }
    if (this.selectedEventNode) {
      this.preview = this.selectedEventNode.createPreview();
      this.preview.show(this.previewPanel.contentElement);
      return;
    }
    let emptyWidget;
    if (this.dataGrid.rootNode().children.length) {
      emptyWidget = new UI4.EmptyWidget.EmptyWidget(i18nString3(UIStrings3.noEventSelected), i18nString3(UIStrings3.selectAnEventToViewMetadata));
    } else if (this.recordButton.isToggled()) {
      const featureName = _BackgroundServiceView.getUIString(this.serviceName).toLowerCase();
      emptyWidget = new UI4.EmptyWidget.EmptyWidget(i18nString3(UIStrings3.recordingSActivity, { PH1: featureName }), i18nString3(UIStrings3.devtoolsWillRecordAllSActivity, { PH1: featureName }));
    } else {
      const recordShortcuts = UI4.ShortcutRegistry.ShortcutRegistry.instance().shortcutsForAction("background-service.toggle-recording")[0];
      emptyWidget = new UI4.EmptyWidget.EmptyWidget(i18nString3(UIStrings3.noRecording), i18nString3(UIStrings3.startRecordingToDebug, {
        PH1: i18nString3(UIStrings3.startRecordingEvents),
        PH2: recordShortcuts.title()
      }));
      emptyWidget.link = this.createLearnMoreLink();
      const button = UI4.UIUtils.createTextButton(i18nString3(UIStrings3.startRecordingEvents), () => this.toggleRecording(), {
        jslogContext: "start-recording",
        variant: "tonal"
        /* Buttons.Button.Variant.TONAL */
      });
      emptyWidget.contentElement.appendChild(button);
    }
    this.preview = emptyWidget;
    this.preview.show(this.previewPanel.contentElement);
  }
  /**
   * Saves all currently displayed events in a file (JSON format).
   */
  async saveToFile() {
    const fileName = `${this.serviceName}-${Platform.DateUtilities.toISO8601Compact(/* @__PURE__ */ new Date())}.json`;
    const stream = new Bindings.FileUtils.FileOutputStream();
    const accepted = await stream.open(fileName);
    if (!accepted) {
      return;
    }
    const events = this.model.getEvents(this.serviceName).filter((event) => this.acceptEvent(event));
    await stream.write(JSON.stringify(events, void 0, 2));
    void stream.close();
  }
};
var EventDataNode = class extends DataGrid.DataGrid.DataGridNode {
  eventMetadata;
  constructor(data, eventMetadata) {
    super(data);
    this.eventMetadata = eventMetadata.sort((m1, m2) => Platform.StringUtilities.compare(m1.key, m2.key));
  }
  createPreview() {
    const preview = new UI4.Widget.VBox();
    preview.element.classList.add("background-service-metadata");
    preview.element.setAttribute("jslog", `${VisualLogging2.section("metadata")}`);
    for (const entry of this.eventMetadata) {
      const div = document.createElement("div");
      div.classList.add("background-service-metadata-entry");
      div.createChild("div", "background-service-metadata-name").textContent = entry.key + ": ";
      if (entry.value) {
        div.createChild("div", "background-service-metadata-value source-code").textContent = entry.value;
      } else {
        div.createChild("div", "background-service-metadata-value background-service-empty-value").textContent = i18nString3(UIStrings3.empty);
      }
      preview.element.appendChild(div);
    }
    if (!preview.element.children.length) {
      const div = document.createElement("div");
      div.classList.add("background-service-metadata-entry");
      div.createChild("div", "background-service-metadata-name background-service-empty-value").textContent = i18nString3(UIStrings3.noMetadataForThisEvent);
      preview.element.appendChild(div);
    }
    return preview;
  }
};
var ActionDelegate = class {
  handleAction(context, actionId) {
    const view = context.flavor(BackgroundServiceView);
    switch (actionId) {
      case "background-service.toggle-recording": {
        if (!view) {
          throw new Error("BackgroundServiceView instance is missing");
        }
        view.toggleRecording();
        return true;
      }
    }
    return false;
  }
};

// gen/front_end/panels/application/BounceTrackingMitigationsTreeElement.js
var BounceTrackingMitigationsTreeElement_exports = {};
__export(BounceTrackingMitigationsTreeElement_exports, {
  BounceTrackingMitigationsTreeElement: () => BounceTrackingMitigationsTreeElement,
  i18nString: () => i18nString4
});
import * as Host3 from "./../../core/host/host.js";
import * as i18n7 from "./../../core/i18n/i18n.js";
import * as IconButton3 from "./../../ui/components/icon_button/icon_button.js";
import * as LegacyWrapper3 from "./../../ui/components/legacy_wrapper/legacy_wrapper.js";
import * as UI5 from "./../../ui/legacy/legacy.js";
import * as ApplicationComponents3 from "./components/components.js";
var UIStrings4 = {
  /**
   * @description Hover text for the Bounce Tracking Mitigations element in the Application Panel sidebar.
   */
  bounceTrackingMitigations: "Bounce tracking mitigations"
};
var str_4 = i18n7.i18n.registerUIStrings("panels/application/BounceTrackingMitigationsTreeElement.ts", UIStrings4);
var i18nString4 = i18n7.i18n.getLocalizedString.bind(void 0, str_4);
var BounceTrackingMitigationsTreeElement = class extends ApplicationPanelTreeElement {
  view;
  constructor(resourcesPanel) {
    super(resourcesPanel, i18nString4(UIStrings4.bounceTrackingMitigations), false, "bounce-tracking-mitigations");
    const icon = IconButton3.Icon.create("database");
    this.setLeadingIcons([icon]);
  }
  get itemURL() {
    return "bounce-tracking-mitigations://";
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    if (!this.view) {
      this.view = LegacyWrapper3.LegacyWrapper.legacyWrapper(UI5.Widget.Widget, new ApplicationComponents3.BounceTrackingMitigationsView.BounceTrackingMitigationsView());
    }
    this.showView(this.view);
    Host3.userMetrics.panelShown("bounce-tracking-mitigations");
    return false;
  }
};

// gen/front_end/panels/application/ApplicationPanelSidebar.js
import * as ApplicationComponents15 from "./components/components.js";

// gen/front_end/panels/application/DOMStorageModel.js
var DOMStorageModel_exports = {};
__export(DOMStorageModel_exports, {
  DOMStorage: () => DOMStorage,
  DOMStorageDispatcher: () => DOMStorageDispatcher,
  DOMStorageModel: () => DOMStorageModel
});
import * as Common3 from "./../../core/common/common.js";
import * as SDK4 from "./../../core/sdk/sdk.js";
var DOMStorage = class _DOMStorage extends Common3.ObjectWrapper.ObjectWrapper {
  model;
  storageKeyInternal;
  isLocalStorageInternal;
  constructor(model, storageKey, isLocalStorage) {
    super();
    this.model = model;
    this.storageKeyInternal = storageKey;
    this.isLocalStorageInternal = isLocalStorage;
  }
  static storageId(storageKey, isLocalStorage) {
    return { storageKey, isLocalStorage };
  }
  get id() {
    return _DOMStorage.storageId(this.storageKeyInternal, this.isLocalStorageInternal);
  }
  get storageKey() {
    return this.storageKeyInternal;
  }
  get isLocalStorage() {
    return this.isLocalStorageInternal;
  }
  getItems() {
    return this.model.agent.invoke_getDOMStorageItems({ storageId: this.id }).then(({ entries }) => entries);
  }
  setItem(key, value) {
    void this.model.agent.invoke_setDOMStorageItem({ storageId: this.id, key, value });
  }
  removeItem(key) {
    void this.model.agent.invoke_removeDOMStorageItem({ storageId: this.id, key });
  }
  clear() {
    void this.model.agent.invoke_clear({ storageId: this.id });
  }
};
var DOMStorageModel = class extends SDK4.SDKModel.SDKModel {
  storageKeyManagerInternal;
  storagesInternal;
  agent;
  enabled;
  constructor(target) {
    super(target);
    this.storageKeyManagerInternal = target.model(SDK4.StorageKeyManager.StorageKeyManager);
    this.storagesInternal = {};
    this.agent = target.domstorageAgent();
  }
  enable() {
    if (this.enabled) {
      return;
    }
    this.target().registerDOMStorageDispatcher(new DOMStorageDispatcher(this));
    if (this.storageKeyManagerInternal) {
      this.storageKeyManagerInternal.addEventListener("StorageKeyAdded", this.storageKeyAdded, this);
      this.storageKeyManagerInternal.addEventListener("StorageKeyRemoved", this.storageKeyRemoved, this);
      for (const storageKey of this.storageKeyManagerInternal.storageKeys()) {
        this.addStorageKey(storageKey);
      }
    }
    void this.agent.invoke_enable();
    this.enabled = true;
  }
  clearForStorageKey(storageKey) {
    if (!this.enabled) {
      return;
    }
    for (const isLocal of [true, false]) {
      const key = this.storageKey(storageKey, isLocal);
      const storage = this.storagesInternal[key];
      if (!storage) {
        return;
      }
      storage.clear();
    }
    this.removeStorageKey(storageKey);
    this.addStorageKey(storageKey);
  }
  storageKeyAdded(event) {
    this.addStorageKey(event.data);
  }
  addStorageKey(storageKey) {
    for (const isLocal of [true, false]) {
      const key = this.storageKey(storageKey, isLocal);
      console.assert(!this.storagesInternal[key]);
      const storage = new DOMStorage(this, storageKey, isLocal);
      this.storagesInternal[key] = storage;
      this.dispatchEventToListeners("DOMStorageAdded", storage);
    }
  }
  storageKeyRemoved(event) {
    this.removeStorageKey(event.data);
  }
  removeStorageKey(storageKey) {
    for (const isLocal of [true, false]) {
      const key = this.storageKey(storageKey, isLocal);
      const storage = this.storagesInternal[key];
      if (!storage) {
        continue;
      }
      delete this.storagesInternal[key];
      this.dispatchEventToListeners("DOMStorageRemoved", storage);
    }
  }
  storageKey(storageKey, isLocalStorage) {
    return JSON.stringify(DOMStorage.storageId(storageKey, isLocalStorage));
  }
  domStorageItemsCleared(storageId) {
    const domStorage = this.storageForId(storageId);
    if (!domStorage) {
      return;
    }
    domStorage.dispatchEventToListeners(
      "DOMStorageItemsCleared"
      /* DOMStorage.Events.DOM_STORAGE_ITEMS_CLEARED */
    );
  }
  domStorageItemRemoved(storageId, key) {
    const domStorage = this.storageForId(storageId);
    if (!domStorage) {
      return;
    }
    const eventData = { key };
    domStorage.dispatchEventToListeners("DOMStorageItemRemoved", eventData);
  }
  domStorageItemAdded(storageId, key, value) {
    const domStorage = this.storageForId(storageId);
    if (!domStorage) {
      return;
    }
    const eventData = { key, value };
    domStorage.dispatchEventToListeners("DOMStorageItemAdded", eventData);
  }
  domStorageItemUpdated(storageId, key, oldValue, value) {
    const domStorage = this.storageForId(storageId);
    if (!domStorage) {
      return;
    }
    const eventData = { key, oldValue, value };
    domStorage.dispatchEventToListeners("DOMStorageItemUpdated", eventData);
  }
  storageForId(storageId) {
    console.assert(Boolean(storageId.storageKey));
    return this.storagesInternal[this.storageKey(storageId.storageKey || "", storageId.isLocalStorage)];
  }
  storages() {
    const result = [];
    for (const id in this.storagesInternal) {
      result.push(this.storagesInternal[id]);
    }
    return result;
  }
};
SDK4.SDKModel.SDKModel.register(DOMStorageModel, { capabilities: 2, autostart: false });
var DOMStorageDispatcher = class {
  model;
  constructor(model) {
    this.model = model;
  }
  domStorageItemsCleared({ storageId }) {
    this.model.domStorageItemsCleared(storageId);
  }
  domStorageItemRemoved({ storageId, key }) {
    this.model.domStorageItemRemoved(storageId, key);
  }
  domStorageItemAdded({ storageId, key, newValue }) {
    this.model.domStorageItemAdded(storageId, key, newValue);
  }
  domStorageItemUpdated({ storageId, key, oldValue, newValue }) {
    this.model.domStorageItemUpdated(storageId, key, oldValue, newValue);
  }
};

// gen/front_end/panels/application/ExtensionStorageModel.js
var ExtensionStorageModel_exports = {};
__export(ExtensionStorageModel_exports, {
  ExtensionStorage: () => ExtensionStorage,
  ExtensionStorageModel: () => ExtensionStorageModel
});
import * as Common4 from "./../../core/common/common.js";
import * as SDK5 from "./../../core/sdk/sdk.js";
var ExtensionStorage = class extends Common4.ObjectWrapper.ObjectWrapper {
  #model;
  #extensionIdInternal;
  #nameInternal;
  #storageAreaInternal;
  constructor(model, extensionId, name, storageArea) {
    super();
    this.#model = model;
    this.#extensionIdInternal = extensionId;
    this.#nameInternal = name;
    this.#storageAreaInternal = storageArea;
  }
  get model() {
    return this.#model;
  }
  get extensionId() {
    return this.#extensionIdInternal;
  }
  get name() {
    return this.#nameInternal;
  }
  // Returns a key that uniquely identifies this extension ID and storage area,
  // but which is not unique across targets, so we can identify two identical
  // storage areas across frames.
  get key() {
    return `${this.extensionId}-${this.storageArea}`;
  }
  get storageArea() {
    return this.#storageAreaInternal;
  }
  async getItems(keys) {
    const params = {
      id: this.#extensionIdInternal,
      storageArea: this.#storageAreaInternal
    };
    if (keys) {
      params.keys = keys;
    }
    const response = await this.#model.agent.invoke_getStorageItems(params);
    if (response.getError()) {
      throw new Error(response.getError());
    }
    return response.data;
  }
  async setItem(key, value) {
    const response = await this.#model.agent.invoke_setStorageItems({ id: this.#extensionIdInternal, storageArea: this.#storageAreaInternal, values: { [key]: value } });
    if (response.getError()) {
      throw new Error(response.getError());
    }
  }
  async removeItem(key) {
    const response = await this.#model.agent.invoke_removeStorageItems({ id: this.#extensionIdInternal, storageArea: this.#storageAreaInternal, keys: [key] });
    if (response.getError()) {
      throw new Error(response.getError());
    }
  }
  async clear() {
    const response = await this.#model.agent.invoke_clearStorageItems({ id: this.#extensionIdInternal, storageArea: this.#storageAreaInternal });
    if (response.getError()) {
      throw new Error(response.getError());
    }
  }
  matchesTarget(target) {
    if (!target) {
      return false;
    }
    const targetURL = target.targetInfo()?.url;
    const parsedURL = targetURL ? Common4.ParsedURL.ParsedURL.fromString(targetURL) : null;
    return parsedURL?.scheme === "chrome-extension" && parsedURL?.host === this.extensionId;
  }
};
var ExtensionStorageModel = class extends SDK5.SDKModel.SDKModel {
  #runtimeModelInternal;
  #storagesInternal;
  agent;
  #enabled;
  constructor(target) {
    super(target);
    this.#runtimeModelInternal = target.model(SDK5.RuntimeModel.RuntimeModel);
    this.#storagesInternal = /* @__PURE__ */ new Map();
    this.agent = target.extensionsAgent();
  }
  enable() {
    if (this.#enabled) {
      return;
    }
    if (this.#runtimeModelInternal) {
      this.#runtimeModelInternal.addEventListener(SDK5.RuntimeModel.Events.ExecutionContextCreated, this.#onExecutionContextCreated, this);
      this.#runtimeModelInternal.addEventListener(SDK5.RuntimeModel.Events.ExecutionContextDestroyed, this.#onExecutionContextDestroyed, this);
      this.#runtimeModelInternal.executionContexts().forEach(this.#executionContextCreated, this);
    }
    this.#enabled = true;
  }
  #getStoragesForExtension(id) {
    const existingStorages = this.#storagesInternal.get(id);
    if (existingStorages) {
      return existingStorages;
    }
    const newStorages = /* @__PURE__ */ new Map();
    this.#storagesInternal.set(id, newStorages);
    return newStorages;
  }
  #addExtension(id, name) {
    for (const storageArea of [
      "session",
      "local",
      "sync",
      "managed"
      /* Protocol.Extensions.StorageArea.Managed */
    ]) {
      const storages = this.#getStoragesForExtension(id);
      const storage = new ExtensionStorage(this, id, name, storageArea);
      console.assert(!storages.get(storageArea));
      storage.getItems([]).then(() => {
        if (this.#storagesInternal.get(id) !== storages) {
          return;
        }
        if (storages.get(storageArea)) {
          return;
        }
        storages.set(storageArea, storage);
        this.dispatchEventToListeners("ExtensionStorageAdded", storage);
      }).catch(() => {
      });
    }
  }
  #removeExtension(id) {
    const storages = this.#storagesInternal.get(id);
    if (!storages) {
      return;
    }
    for (const [key, storage] of storages) {
      storages.delete(key);
      this.dispatchEventToListeners("ExtensionStorageRemoved", storage);
    }
    this.#storagesInternal.delete(id);
  }
  #executionContextCreated(context) {
    const extensionId = this.#extensionIdForContext(context);
    if (extensionId) {
      this.#addExtension(extensionId, context.name);
    }
  }
  #onExecutionContextCreated(event) {
    this.#executionContextCreated(event.data);
  }
  #extensionIdForContext(context) {
    const url = Common4.ParsedURL.ParsedURL.fromString(context.origin);
    return url && url.scheme === "chrome-extension" ? url.host : void 0;
  }
  #executionContextDestroyed(context) {
    const extensionId = this.#extensionIdForContext(context);
    if (extensionId) {
      if (this.#runtimeModelInternal?.executionContexts().some((c) => this.#extensionIdForContext(c) === extensionId)) {
        return;
      }
      this.#removeExtension(extensionId);
    }
  }
  #onExecutionContextDestroyed(event) {
    this.#executionContextDestroyed(event.data);
  }
  storageForIdAndArea(id, storageArea) {
    return this.#storagesInternal.get(id)?.get(storageArea);
  }
  storages() {
    const result = [];
    for (const storages of this.#storagesInternal.values()) {
      result.push(...storages.values());
    }
    return result;
  }
};
SDK5.SDKModel.SDKModel.register(ExtensionStorageModel, { capabilities: 4, autostart: false });

// gen/front_end/panels/application/IndexedDBModel.js
var IndexedDBModel_exports = {};
__export(IndexedDBModel_exports, {
  Database: () => Database,
  DatabaseId: () => DatabaseId,
  Entry: () => Entry,
  Events: () => Events2,
  Index: () => Index,
  IndexedDBModel: () => IndexedDBModel,
  ObjectStore: () => ObjectStore
});
import * as Common5 from "./../../core/common/common.js";
import * as SDK6 from "./../../core/sdk/sdk.js";
var DEFAULT_BUCKET = "";
var IndexedDBModel = class _IndexedDBModel extends SDK6.SDKModel.SDKModel {
  storageBucketModel;
  indexedDBAgent;
  storageAgent;
  databasesInternal;
  databaseNamesByStorageKeyAndBucket;
  updatedStorageBuckets;
  throttler;
  enabled;
  constructor(target) {
    super(target);
    target.registerStorageDispatcher(this);
    this.storageBucketModel = target.model(SDK6.StorageBucketsModel.StorageBucketsModel);
    this.indexedDBAgent = target.indexedDBAgent();
    this.storageAgent = target.storageAgent();
    this.databasesInternal = /* @__PURE__ */ new Map();
    this.databaseNamesByStorageKeyAndBucket = /* @__PURE__ */ new Map();
    this.updatedStorageBuckets = /* @__PURE__ */ new Set();
    this.throttler = new Common5.Throttler.Throttler(1e3);
  }
  // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static keyFromIDBKey(idbKey) {
    if (typeof idbKey === "undefined" || idbKey === null) {
      return void 0;
    }
    let key;
    switch (typeof idbKey) {
      case "number":
        key = {
          type: "number",
          number: idbKey
        };
        break;
      case "string":
        key = {
          type: "string",
          string: idbKey
        };
        break;
      case "object":
        if (idbKey instanceof Date) {
          key = {
            type: "date",
            date: idbKey.getTime()
          };
        } else if (Array.isArray(idbKey)) {
          const array = [];
          for (let i = 0; i < idbKey.length; ++i) {
            const nestedKey = _IndexedDBModel.keyFromIDBKey(idbKey[i]);
            if (nestedKey) {
              array.push(nestedKey);
            }
          }
          key = {
            type: "array",
            array
          };
        } else {
          return void 0;
        }
        break;
      default:
        return void 0;
    }
    return key;
  }
  static keyRangeFromIDBKeyRange(idbKeyRange) {
    return {
      lower: _IndexedDBModel.keyFromIDBKey(idbKeyRange.lower),
      upper: _IndexedDBModel.keyFromIDBKey(idbKeyRange.upper),
      lowerOpen: Boolean(idbKeyRange.lowerOpen),
      upperOpen: Boolean(idbKeyRange.upperOpen)
    };
  }
  static idbKeyPathFromKeyPath(keyPath) {
    let idbKeyPath;
    switch (keyPath.type) {
      case "null":
        idbKeyPath = null;
        break;
      case "string":
        idbKeyPath = keyPath.string;
        break;
      case "array":
        idbKeyPath = keyPath.array;
        break;
    }
    return idbKeyPath;
  }
  static keyPathStringFromIDBKeyPath(idbKeyPath) {
    if (typeof idbKeyPath === "string") {
      return '"' + idbKeyPath + '"';
    }
    if (idbKeyPath instanceof Array) {
      return '["' + idbKeyPath.join('", "') + '"]';
    }
    return null;
  }
  enable() {
    if (this.enabled) {
      return;
    }
    void this.indexedDBAgent.invoke_enable();
    if (this.storageBucketModel) {
      this.storageBucketModel.addEventListener("BucketAdded", this.storageBucketAdded, this);
      this.storageBucketModel.addEventListener("BucketRemoved", this.storageBucketRemoved, this);
      for (const { bucket } of this.storageBucketModel.getBuckets()) {
        this.addStorageBucket(bucket);
      }
    }
    this.enabled = true;
  }
  clearForStorageKey(storageKey) {
    if (!this.enabled || !this.databaseNamesByStorageKeyAndBucket.has(storageKey)) {
      return;
    }
    for (const [storageBucketName] of this.databaseNamesByStorageKeyAndBucket.get(storageKey) || []) {
      const storageBucket = this.storageBucketModel?.getBucketByName(storageKey, storageBucketName ?? void 0)?.bucket;
      if (storageBucket) {
        this.removeStorageBucket(storageBucket);
      }
    }
    this.databaseNamesByStorageKeyAndBucket.delete(storageKey);
    const bucketInfos = this.storageBucketModel?.getBucketsForStorageKey(storageKey) || [];
    for (const { bucket } of bucketInfos) {
      this.addStorageBucket(bucket);
    }
  }
  async deleteDatabase(databaseId) {
    if (!this.enabled) {
      return;
    }
    await this.indexedDBAgent.invoke_deleteDatabase({ storageBucket: databaseId.storageBucket, databaseName: databaseId.name });
    void this.loadDatabaseNamesByStorageBucket(databaseId.storageBucket);
  }
  async refreshDatabaseNames() {
    for (const [storageKey] of this.databaseNamesByStorageKeyAndBucket) {
      const storageBucketNames = this.databaseNamesByStorageKeyAndBucket.get(storageKey)?.keys() || [];
      for (const storageBucketName of storageBucketNames) {
        const storageBucket = this.storageBucketModel?.getBucketByName(storageKey, storageBucketName ?? void 0)?.bucket;
        if (storageBucket) {
          await this.loadDatabaseNamesByStorageBucket(storageBucket);
        }
      }
    }
    this.dispatchEventToListeners(Events2.DatabaseNamesRefreshed);
  }
  refreshDatabase(databaseId) {
    void this.loadDatabase(databaseId, true);
  }
  async clearObjectStore(databaseId, objectStoreName) {
    await this.indexedDBAgent.invoke_clearObjectStore({ storageBucket: databaseId.storageBucket, databaseName: databaseId.name, objectStoreName });
  }
  async deleteEntries(databaseId, objectStoreName, idbKeyRange) {
    const keyRange = _IndexedDBModel.keyRangeFromIDBKeyRange(idbKeyRange);
    await this.indexedDBAgent.invoke_deleteObjectStoreEntries({ storageBucket: databaseId.storageBucket, databaseName: databaseId.name, objectStoreName, keyRange });
  }
  storageBucketAdded({ data: { bucketInfo: { bucket } } }) {
    this.addStorageBucket(bucket);
  }
  storageBucketRemoved({ data: { bucketInfo: { bucket } } }) {
    this.removeStorageBucket(bucket);
  }
  addStorageBucket(storageBucket) {
    const { storageKey } = storageBucket;
    if (!this.databaseNamesByStorageKeyAndBucket.has(storageKey)) {
      this.databaseNamesByStorageKeyAndBucket.set(storageKey, /* @__PURE__ */ new Map());
      void this.storageAgent.invoke_trackIndexedDBForStorageKey({ storageKey });
    }
    const storageKeyBuckets = this.databaseNamesByStorageKeyAndBucket.get(storageKey) || /* @__PURE__ */ new Map();
    console.assert(!storageKeyBuckets.has(storageBucket.name ?? DEFAULT_BUCKET));
    storageKeyBuckets.set(storageBucket.name ?? DEFAULT_BUCKET, /* @__PURE__ */ new Set());
    void this.loadDatabaseNamesByStorageBucket(storageBucket);
  }
  removeStorageBucket(storageBucket) {
    const { storageKey } = storageBucket;
    console.assert(this.databaseNamesByStorageKeyAndBucket.has(storageKey));
    const storageKeyBuckets = this.databaseNamesByStorageKeyAndBucket.get(storageKey) || /* @__PURE__ */ new Map();
    console.assert(storageKeyBuckets.has(storageBucket.name ?? DEFAULT_BUCKET));
    const databaseIds = storageKeyBuckets.get(storageBucket.name ?? DEFAULT_BUCKET) || /* @__PURE__ */ new Map();
    for (const databaseId of databaseIds) {
      this.databaseRemovedForStorageBucket(databaseId);
    }
    storageKeyBuckets.delete(storageBucket.name ?? DEFAULT_BUCKET);
    if (storageKeyBuckets.size === 0) {
      this.databaseNamesByStorageKeyAndBucket.delete(storageKey);
      void this.storageAgent.invoke_untrackIndexedDBForStorageKey({ storageKey });
    }
  }
  updateStorageKeyDatabaseNames(storageBucket, databaseNames) {
    const storageKeyBuckets = this.databaseNamesByStorageKeyAndBucket.get(storageBucket.storageKey);
    if (storageKeyBuckets === void 0) {
      return;
    }
    const newDatabases = new Set(databaseNames.map((databaseName) => new DatabaseId(storageBucket, databaseName)));
    const oldDatabases = new Set(storageKeyBuckets.get(storageBucket.name ?? DEFAULT_BUCKET));
    storageKeyBuckets.set(storageBucket.name ?? DEFAULT_BUCKET, newDatabases);
    for (const database of oldDatabases) {
      if (!database.inSet(newDatabases)) {
        this.databaseRemovedForStorageBucket(database);
      }
    }
    for (const database of newDatabases) {
      if (!database.inSet(oldDatabases)) {
        this.databaseAddedForStorageBucket(database);
      }
    }
  }
  databases() {
    const result = [];
    for (const [, buckets] of this.databaseNamesByStorageKeyAndBucket) {
      for (const [, databases] of buckets) {
        for (const database of databases) {
          result.push(database);
        }
      }
    }
    return result;
  }
  databaseAddedForStorageBucket(databaseId) {
    this.dispatchEventToListeners(Events2.DatabaseAdded, { model: this, databaseId });
  }
  databaseRemovedForStorageBucket(databaseId) {
    this.dispatchEventToListeners(Events2.DatabaseRemoved, { model: this, databaseId });
  }
  async loadDatabaseNamesByStorageBucket(storageBucket) {
    const { storageKey } = storageBucket;
    const { databaseNames } = await this.indexedDBAgent.invoke_requestDatabaseNames({ storageBucket });
    if (!databaseNames) {
      return [];
    }
    if (!this.databaseNamesByStorageKeyAndBucket.has(storageKey)) {
      return [];
    }
    const storageKeyBuckets = this.databaseNamesByStorageKeyAndBucket.get(storageKey) || /* @__PURE__ */ new Map();
    if (!storageKeyBuckets.has(storageBucket.name ?? DEFAULT_BUCKET)) {
      return [];
    }
    this.updateStorageKeyDatabaseNames(storageBucket, databaseNames);
    return databaseNames;
  }
  async loadDatabase(databaseId, entriesUpdated) {
    const databaseWithObjectStores = (await this.indexedDBAgent.invoke_requestDatabase({
      storageBucket: databaseId.storageBucket,
      databaseName: databaseId.name
    })).databaseWithObjectStores;
    if (!this.databaseNamesByStorageKeyAndBucket.get(databaseId.storageBucket.storageKey)?.has(databaseId.storageBucket.name ?? DEFAULT_BUCKET)) {
      return;
    }
    if (!databaseWithObjectStores) {
      return;
    }
    const databaseModel = new Database(databaseId, databaseWithObjectStores.version);
    this.databasesInternal.set(databaseId, databaseModel);
    for (const objectStore of databaseWithObjectStores.objectStores) {
      const objectStoreIDBKeyPath = _IndexedDBModel.idbKeyPathFromKeyPath(objectStore.keyPath);
      const objectStoreModel = new ObjectStore(objectStore.name, objectStoreIDBKeyPath, objectStore.autoIncrement);
      for (let j = 0; j < objectStore.indexes.length; ++j) {
        const index = objectStore.indexes[j];
        const indexIDBKeyPath = _IndexedDBModel.idbKeyPathFromKeyPath(index.keyPath);
        const indexModel = new Index(index.name, indexIDBKeyPath, index.unique, index.multiEntry);
        objectStoreModel.indexes.set(indexModel.name, indexModel);
      }
      databaseModel.objectStores.set(objectStoreModel.name, objectStoreModel);
    }
    this.dispatchEventToListeners(Events2.DatabaseLoaded, { model: this, database: databaseModel, entriesUpdated });
  }
  loadObjectStoreData(databaseId, objectStoreName, idbKeyRange, skipCount, pageSize, callback) {
    void this.requestData(databaseId, databaseId.name, objectStoreName, "", idbKeyRange, skipCount, pageSize, callback);
  }
  loadIndexData(databaseId, objectStoreName, indexName, idbKeyRange, skipCount, pageSize, callback) {
    void this.requestData(databaseId, databaseId.name, objectStoreName, indexName, idbKeyRange, skipCount, pageSize, callback);
  }
  async requestData(databaseId, databaseName, objectStoreName, indexName, idbKeyRange, skipCount, pageSize, callback) {
    const keyRange = idbKeyRange ? _IndexedDBModel.keyRangeFromIDBKeyRange(idbKeyRange) : void 0;
    const runtimeModel = this.target().model(SDK6.RuntimeModel.RuntimeModel);
    const response = await this.indexedDBAgent.invoke_requestData({
      storageBucket: databaseId.storageBucket,
      databaseName,
      objectStoreName,
      indexName,
      skipCount,
      pageSize,
      keyRange
    });
    if (!runtimeModel || !this.databaseNamesByStorageKeyAndBucket.get(databaseId.storageBucket.storageKey)?.has(databaseId.storageBucket.name ?? DEFAULT_BUCKET)) {
      return;
    }
    if (response.getError()) {
      console.error("IndexedDBAgent error: " + response.getError());
      return;
    }
    const dataEntries = response.objectStoreDataEntries;
    const entries = [];
    for (const dataEntry of dataEntries) {
      const key = runtimeModel?.createRemoteObject(dataEntry.key);
      const primaryKey = runtimeModel?.createRemoteObject(dataEntry.primaryKey);
      const value = runtimeModel?.createRemoteObject(dataEntry.value);
      if (!key || !primaryKey || !value) {
        return;
      }
      entries.push(new Entry(key, primaryKey, value));
    }
    callback(entries, response.hasMore);
  }
  async getMetadata(databaseId, objectStore) {
    const databaseName = databaseId.name;
    const objectStoreName = objectStore.name;
    const response = await this.indexedDBAgent.invoke_getMetadata({ storageBucket: databaseId.storageBucket, databaseName, objectStoreName });
    if (response.getError()) {
      console.error("IndexedDBAgent error: " + response.getError());
      return null;
    }
    return { entriesCount: response.entriesCount, keyGeneratorValue: response.keyGeneratorValue };
  }
  async refreshDatabaseListForStorageBucket(storageBucket) {
    const databaseNames = await this.loadDatabaseNamesByStorageBucket(storageBucket);
    for (const databaseName of databaseNames) {
      void this.loadDatabase(new DatabaseId(storageBucket, databaseName), false);
    }
  }
  indexedDBListUpdated({ storageKey, bucketId }) {
    const storageBucket = this.storageBucketModel?.getBucketById(bucketId)?.bucket;
    if (storageKey && storageBucket) {
      this.updatedStorageBuckets.add(storageBucket);
      void this.throttler.schedule(() => {
        const promises = Array.from(this.updatedStorageBuckets, (storageBucket2) => {
          void this.refreshDatabaseListForStorageBucket(storageBucket2);
        });
        this.updatedStorageBuckets.clear();
        return Promise.all(promises);
      });
    }
  }
  indexedDBContentUpdated({ bucketId, databaseName, objectStoreName }) {
    const storageBucket = this.storageBucketModel?.getBucketById(bucketId)?.bucket;
    if (storageBucket) {
      const databaseId = new DatabaseId(storageBucket, databaseName);
      this.dispatchEventToListeners(Events2.IndexedDBContentUpdated, { databaseId, objectStoreName, model: this });
    }
  }
  attributionReportingTriggerRegistered(_event) {
  }
  cacheStorageListUpdated(_event) {
  }
  cacheStorageContentUpdated(_event) {
  }
  interestGroupAccessed(_event) {
  }
  interestGroupAuctionEventOccurred(_event) {
  }
  interestGroupAuctionNetworkRequestCreated(_event) {
  }
  sharedStorageAccessed(_event) {
  }
  sharedStorageWorkletOperationExecutionFinished(_event) {
  }
  storageBucketCreatedOrUpdated(_event) {
  }
  storageBucketDeleted(_event) {
  }
  attributionReportingSourceRegistered(_event) {
  }
  attributionReportingReportSent(_event) {
  }
  attributionReportingVerboseDebugReportSent(_event) {
  }
};
SDK6.SDKModel.SDKModel.register(IndexedDBModel, { capabilities: 8192, autostart: false });
var Events2;
(function(Events3) {
  Events3["DatabaseAdded"] = "DatabaseAdded";
  Events3["DatabaseRemoved"] = "DatabaseRemoved";
  Events3["DatabaseLoaded"] = "DatabaseLoaded";
  Events3["DatabaseNamesRefreshed"] = "DatabaseNamesRefreshed";
  Events3["IndexedDBContentUpdated"] = "IndexedDBContentUpdated";
})(Events2 || (Events2 = {}));
var Entry = class {
  key;
  primaryKey;
  value;
  constructor(key, primaryKey, value) {
    this.key = key;
    this.primaryKey = primaryKey;
    this.value = value;
  }
};
var DatabaseId = class {
  storageBucket;
  name;
  constructor(storageBucket, name) {
    this.storageBucket = storageBucket;
    this.name = name;
  }
  inBucket(storageBucket) {
    return this.storageBucket.name === storageBucket.name;
  }
  equals(databaseId) {
    return this.name === databaseId.name && this.storageBucket.name === databaseId.storageBucket.name && this.storageBucket.storageKey === databaseId.storageBucket.storageKey;
  }
  inSet(databaseSet) {
    for (const database of databaseSet) {
      if (this.equals(database)) {
        return true;
      }
    }
    return false;
  }
};
var Database = class {
  databaseId;
  version;
  objectStores;
  constructor(databaseId, version) {
    this.databaseId = databaseId;
    this.version = version;
    this.objectStores = /* @__PURE__ */ new Map();
  }
};
var ObjectStore = class {
  name;
  // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keyPath;
  autoIncrement;
  indexes;
  // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(name, keyPath, autoIncrement) {
    this.name = name;
    this.keyPath = keyPath;
    this.autoIncrement = autoIncrement;
    this.indexes = /* @__PURE__ */ new Map();
  }
  get keyPathString() {
    return IndexedDBModel.keyPathStringFromIDBKeyPath(this.keyPath);
  }
};
var Index = class {
  name;
  // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keyPath;
  unique;
  multiEntry;
  // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(name, keyPath, unique, multiEntry) {
    this.name = name;
    this.keyPath = keyPath;
    this.unique = unique;
    this.multiEntry = multiEntry;
  }
  get keyPathString() {
    return IndexedDBModel.keyPathStringFromIDBKeyPath(this.keyPath);
  }
};

// gen/front_end/panels/application/IndexedDBViews.js
var IndexedDBViews_exports = {};
__export(IndexedDBViews_exports, {
  IDBDataGridNode: () => IDBDataGridNode,
  IDBDataView: () => IDBDataView,
  IDBDatabaseView: () => IDBDatabaseView
});
import "./../../ui/components/report_view/report_view.js";
import "./../../ui/legacy/legacy.js";
import * as i18n9 from "./../../core/i18n/i18n.js";
import * as SDK7 from "./../../core/sdk/sdk.js";
import * as Buttons3 from "./../../ui/components/buttons/buttons.js";
import * as DataGrid3 from "./../../ui/legacy/components/data_grid/data_grid.js";
import * as ObjectUI from "./../../ui/legacy/components/object_ui/object_ui.js";
import * as UI6 from "./../../ui/legacy/legacy.js";
import * as Lit from "./../../ui/lit/lit.js";
import * as VisualLogging3 from "./../../ui/visual_logging/visual_logging.js";
import * as ApplicationComponents4 from "./components/components.js";

// gen/front_end/panels/application/indexedDBViews.css.js
var indexedDBViews_css_default = `/*
 * Copyright (C) 2012 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

.indexed-db-data-view .data-view-toolbar {
  position: relative;
  background-color: var(--sys-color-cdt-base-container);
  border-bottom: 1px solid var(--sys-color-divider);
}

.indexed-db-data-view .data-grid {
  flex: auto;
}

.indexed-db-data-view .data-grid .data-container tr:nth-last-child(1) {
  background-color: var(--sys-color-cdt-base-container);
}

.indexed-db-data-view .data-grid .data-container tr:nth-last-child(1) td {
  border: 0;
}

.indexed-db-data-view .data-grid .data-container tr:nth-last-child(2) td {
  border-bottom: 1px solid var(--sys-color-divider);
}

.indexed-db-data-view .data-grid:focus .data-container tr.selected {
  background-color: var(--sys-color-tonal-container);
  color: inherit;
}

.indexed-db-data-view .section,
.indexed-db-data-view .section > .header,
.indexed-db-data-view .section > .header .title {
  margin: 0;
  min-height: inherit;
  line-height: inherit;
}

.indexed-db-data-view .data-grid .data-container td .section .header .title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.indexed-db-key-path {
  color: var(--sys-color-error);
  white-space: pre-wrap;
  unicode-bidi: -webkit-isolate;
}

.indexed-db-container {
  overflow: auto;
}

.indexed-db-header {
  min-width: 400px;
  flex-shrink: 0;
  flex-grow: 0;
}

.source-code.indexed-db-key-path {
  font-size: unset !important; /* stylelint-disable-line declaration-no-important */
}

.resources-toolbar {
  padding-right: 10px;
}

.object-store-summary-bar {
  flex: 0 0 27px;
  line-height: 27px;
  padding-left: 5px;
  background-color: var(--sys-color-cdt-base-container);
  border-top: 1px solid var(--sys-color-divider);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

/*# sourceURL=${import.meta.resolve("./indexedDBViews.css")} */`;

// gen/front_end/panels/application/IndexedDBViews.js
var { html } = Lit;
var UIStrings5 = {
  /**
   * @description Text in Indexed DBViews of the Application panel
   */
  version: "Version",
  /**
   * @description Text in Indexed DBViews of the Application panel
   */
  objectStores: "Object stores",
  /**
   * @description Text of button in Indexed DBViews of the Application panel
   */
  deleteDatabase: "Delete database",
  /**
   * @description Text of button in Indexed DBViews of the Application panel
   */
  refreshDatabase: "Refresh database",
  /**
   * @description Text in Application panel IndexedDB delete confirmation dialog
   * @example {msb} PH1
   */
  confirmDeleteDatabase: 'Delete "{PH1}" database?',
  /**
   * @description Explanation text in Application panel IndexedDB delete confirmation dialog
   */
  databaseWillBeRemoved: "The selected database and contained data will be removed.",
  /**
   * @description Title of the confirmation dialog in the IndexedDB tab of the Application panel
   *              that the user is about to clear an object store and this cannot be undone.
   * @example {table1} PH1
   */
  confirmClearObjectStore: 'Clear "{PH1}" object store?',
  /**
   * @description Description in the confirmation dialog in the IndexedDB tab of the Application
   *              panel that the user is about to clear an object store and this cannot be undone.
   */
  objectStoreWillBeCleared: "The data contained in the selected object store will be removed.",
  /**
   * @description Text in Indexed DBViews of the Application panel
   */
  idb: "IDB",
  /**
   * @description Text to refresh the page
   */
  refresh: "Refresh",
  /**
   * @description Tooltip text that appears when hovering over the delete button in the Indexed DBViews of the Application panel
   */
  deleteSelected: "Delete selected",
  /**
   * @description Tooltip text that appears when hovering over the clear button in the Indexed DBViews of the Application panel
   */
  clearObjectStore: "Clear object store",
  /**
   * @description Text in Indexed DBViews of the Application panel
   */
  dataMayBeStale: "Data may be stale",
  /**
   * @description Title of needs refresh in indexed dbviews of the application panel
   */
  someEntriesMayHaveBeenModified: "Some entries may have been modified",
  /**
   * @description Text in DOMStorage Items View of the Application panel
   */
  keyString: "Key",
  /**
   * @description Text in Indexed DBViews of the Application panel
   */
  primaryKey: "Primary key",
  /**
   * @description Text for the value of something
   */
  valueString: "Value",
  /**
   * @description Data grid name for Indexed DB data grids
   */
  indexedDb: "Indexed DB",
  /**
   * @description Text in Indexed DBViews of the Application panel
   */
  keyPath: "Key path: ",
  /**
   * @description Tooltip text that appears when hovering over the triangle left button in the Indexed DBViews of the Application panel
   */
  showPreviousPage: "Show previous page",
  /**
   * @description Tooltip text that appears when hovering over the triangle right button in the Indexed DBViews of the Application panel
   */
  showNextPage: "Show next page",
  /**
   * @description Text in Indexed DBViews of the Application panel
   */
  filterByKey: "Filter by key (show keys greater or equal to)",
  /**
   * @description Text in Context menu for expanding objects in IndexedDB tables
   */
  expandRecursively: "Expand Recursively",
  /**
   * @description Text in Context menu for collapsing objects in IndexedDB tables
   */
  collapse: "Collapse",
  /**
   * @description Span text content in Indexed DBViews of the Application panel
   * @example {2} PH1
   */
  totalEntriesS: "Total entries: {PH1}",
  /**
   * @description Text in Indexed DBViews of the Application panel
   * @example {2} PH1
   */
  keyGeneratorValueS: "Key generator value: {PH1}"
};
var str_5 = i18n9.i18n.registerUIStrings("panels/application/IndexedDBViews.ts", UIStrings5);
var i18nString5 = i18n9.i18n.getLocalizedString.bind(void 0, str_5);
var IDBDatabaseView = class extends ApplicationComponents4.StorageMetadataView.StorageMetadataView {
  model;
  database;
  constructor(model, database) {
    super();
    this.model = model;
    if (database) {
      this.update(database);
    }
  }
  getTitle() {
    return this.database?.databaseId.name;
  }
  async renderReportContent() {
    if (!this.database) {
      return Lit.nothing;
    }
    return html`
      ${await super.renderReportContent()}
      ${this.key(i18nString5(UIStrings5.version))}
      ${this.value(this.database.version.toString())}
      ${this.key(i18nString5(UIStrings5.objectStores))}
      ${this.value(this.database.objectStores.size.toString())}
      <devtools-report-divider></devtools-report-divider>
      <devtools-report-section>
      <devtools-button
          aria-label=${i18nString5(UIStrings5.deleteDatabase)}
          .variant=${"outlined"}
          @click=${this.deleteDatabase}
          jslog=${VisualLogging3.action("delete-database").track({
      click: true
    })}>
        ${i18nString5(UIStrings5.deleteDatabase)}
      </devtools-button>&nbsp;
      <devtools-button
          aria-label=${i18nString5(UIStrings5.refreshDatabase)}
          .variant=${"outlined"}
          @click=${this.refreshDatabaseButtonClicked}
          jslog=${VisualLogging3.action("refresh-database").track({
      click: true
    })}>
        ${i18nString5(UIStrings5.refreshDatabase)}
      </devtools-button>
      </devtools-report-section>
      `;
  }
  refreshDatabaseButtonClicked() {
    this.model.refreshDatabase(this.database.databaseId);
  }
  update(database) {
    this.database = database;
    const bucketInfo = this.model.target().model(SDK7.StorageBucketsModel.StorageBucketsModel)?.getBucketByName(database.databaseId.storageBucket.storageKey, database.databaseId.storageBucket.name);
    if (bucketInfo) {
      this.setStorageBucket(bucketInfo);
    } else {
      this.setStorageKey(database.databaseId.storageBucket.storageKey);
    }
    void this.render().then(() => this.updatedForTests());
  }
  updatedForTests() {
  }
  async deleteDatabase() {
    const ok = await UI6.UIUtils.ConfirmDialog.show(i18nString5(UIStrings5.databaseWillBeRemoved), i18nString5(UIStrings5.confirmDeleteDatabase, { PH1: this.database.databaseId.name }), this, { jslogContext: "delete-database-confirmation" });
    if (ok) {
      void this.model.deleteDatabase(this.database.databaseId);
    }
  }
  wasShown() {
    super.wasShown();
  }
};
customElements.define("devtools-idb-database-view", IDBDatabaseView);
var IDBDataView = class extends UI6.View.SimpleView {
  model;
  databaseId;
  isIndex;
  refreshObjectStoreCallback;
  refreshButton;
  deleteSelectedButton;
  clearButton;
  needsRefresh;
  clearingObjectStore;
  pageSize;
  skipCount;
  // Used in Web Tests
  entries;
  objectStore;
  index;
  keyInput;
  dataGrid;
  lastPageSize;
  lastSkipCount;
  pageBackButton;
  pageForwardButton;
  // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lastKey;
  summaryBarElement;
  constructor(model, databaseId, objectStore, index, refreshObjectStoreCallback) {
    super({
      title: i18nString5(UIStrings5.idb),
      viewId: "idb",
      jslog: `${VisualLogging3.pane("indexed-db-data-view")}`
    });
    this.registerRequiredCSS(indexedDBViews_css_default);
    this.model = model;
    this.databaseId = databaseId;
    this.isIndex = Boolean(index);
    this.refreshObjectStoreCallback = refreshObjectStoreCallback;
    this.element.classList.add("indexed-db-data-view", "storage-view");
    this.refreshButton = new UI6.Toolbar.ToolbarButton(i18nString5(UIStrings5.refresh), "refresh");
    this.refreshButton.addEventListener("Click", this.refreshButtonClicked, this);
    this.refreshButton.element.setAttribute("jslog", `${VisualLogging3.action("refresh").track({ click: true })}`);
    this.deleteSelectedButton = new UI6.Toolbar.ToolbarButton(i18nString5(UIStrings5.deleteSelected), "bin");
    this.deleteSelectedButton.addEventListener("Click", (_event) => {
      void this.deleteButtonClicked(null);
    });
    this.deleteSelectedButton.element.setAttribute("jslog", `${VisualLogging3.action("delete-selected").track({ click: true })}`);
    this.clearButton = new UI6.Toolbar.ToolbarButton(i18nString5(UIStrings5.clearObjectStore), "clear");
    this.clearButton.addEventListener("Click", () => {
      void this.clearButtonClicked();
    }, this);
    this.clearButton.element.setAttribute("jslog", `${VisualLogging3.action("clear-all").track({ click: true })}`);
    const refreshIcon = UI6.UIUtils.createIconLabel({
      title: i18nString5(UIStrings5.dataMayBeStale),
      iconName: "warning",
      color: "var(--icon-warning)",
      width: "20px",
      height: "20px"
    });
    this.needsRefresh = new UI6.Toolbar.ToolbarItem(refreshIcon);
    this.needsRefresh.setVisible(false);
    this.needsRefresh.setTitle(i18nString5(UIStrings5.someEntriesMayHaveBeenModified));
    this.clearingObjectStore = false;
    this.createEditorToolbar();
    this.pageSize = 50;
    this.skipCount = 0;
    this.update(objectStore, index);
    this.entries = [];
  }
  createDataGrid() {
    const keyPath = this.isIndex && this.index ? this.index.keyPath : this.objectStore.keyPath;
    const columns = [];
    const columnDefaults = {
      title: void 0,
      titleDOMFragment: void 0,
      sortable: false,
      sort: void 0,
      align: void 0,
      width: void 0,
      fixedWidth: void 0,
      editable: void 0,
      nonSelectable: void 0,
      longText: void 0,
      disclosure: void 0,
      weight: void 0,
      allowInSortByEvenWhenHidden: void 0,
      dataType: void 0,
      defaultWeight: void 0
    };
    columns.push({ ...columnDefaults, id: "number", title: "#", sortable: false, width: "50px" });
    columns.push({
      ...columnDefaults,
      id: "key",
      titleDOMFragment: this.keyColumnHeaderFragment(i18nString5(UIStrings5.keyString), keyPath),
      sortable: false
    });
    if (this.isIndex) {
      columns.push({
        ...columnDefaults,
        id: "primary-key",
        titleDOMFragment: this.keyColumnHeaderFragment(i18nString5(UIStrings5.primaryKey), this.objectStore.keyPath),
        sortable: false
      });
    }
    const title = i18nString5(UIStrings5.valueString);
    columns.push({ ...columnDefaults, id: "value", title, sortable: false });
    const dataGrid = new DataGrid3.DataGrid.DataGridImpl({
      displayName: i18nString5(UIStrings5.indexedDb),
      columns,
      deleteCallback: this.deleteButtonClicked.bind(this),
      refreshCallback: this.updateData.bind(this, true)
    });
    dataGrid.setStriped(true);
    dataGrid.addEventListener("SelectedNode", () => {
      this.updateToolbarEnablement();
    }, this);
    return dataGrid;
  }
  // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keyColumnHeaderFragment(prefix, keyPath) {
    const keyColumnHeaderFragment = document.createDocumentFragment();
    UI6.UIUtils.createTextChild(keyColumnHeaderFragment, prefix);
    if (keyPath === null) {
      return keyColumnHeaderFragment;
    }
    UI6.UIUtils.createTextChild(keyColumnHeaderFragment, " (" + i18nString5(UIStrings5.keyPath));
    if (Array.isArray(keyPath)) {
      UI6.UIUtils.createTextChild(keyColumnHeaderFragment, "[");
      for (let i = 0; i < keyPath.length; ++i) {
        if (i !== 0) {
          UI6.UIUtils.createTextChild(keyColumnHeaderFragment, ", ");
        }
        keyColumnHeaderFragment.appendChild(this.keyPathStringFragment(keyPath[i]));
      }
      UI6.UIUtils.createTextChild(keyColumnHeaderFragment, "]");
    } else {
      const keyPathString = keyPath;
      keyColumnHeaderFragment.appendChild(this.keyPathStringFragment(keyPathString));
    }
    UI6.UIUtils.createTextChild(keyColumnHeaderFragment, ")");
    return keyColumnHeaderFragment;
  }
  keyPathStringFragment(keyPathString) {
    const keyPathStringFragment = document.createDocumentFragment();
    UI6.UIUtils.createTextChild(keyPathStringFragment, '"');
    const keyPathSpan = keyPathStringFragment.createChild("span", "source-code indexed-db-key-path");
    keyPathSpan.textContent = keyPathString;
    UI6.UIUtils.createTextChild(keyPathStringFragment, '"');
    return keyPathStringFragment;
  }
  createEditorToolbar() {
    const editorToolbar = this.element.createChild("devtools-toolbar", "data-view-toolbar");
    editorToolbar.setAttribute("jslog", `${VisualLogging3.toolbar()}`);
    editorToolbar.appendToolbarItem(this.refreshButton);
    editorToolbar.appendToolbarItem(this.clearButton);
    editorToolbar.appendToolbarItem(this.deleteSelectedButton);
    editorToolbar.appendToolbarItem(new UI6.Toolbar.ToolbarSeparator());
    this.pageBackButton = new UI6.Toolbar.ToolbarButton(i18nString5(UIStrings5.showPreviousPage), "triangle-left", void 0, "prev-page");
    this.pageBackButton.addEventListener("Click", this.pageBackButtonClicked, this);
    editorToolbar.appendToolbarItem(this.pageBackButton);
    this.pageForwardButton = new UI6.Toolbar.ToolbarButton(i18nString5(UIStrings5.showNextPage), "triangle-right", void 0, "next-page");
    this.pageForwardButton.setEnabled(false);
    this.pageForwardButton.addEventListener("Click", this.pageForwardButtonClicked, this);
    editorToolbar.appendToolbarItem(this.pageForwardButton);
    this.keyInput = new UI6.Toolbar.ToolbarFilter(i18nString5(UIStrings5.filterByKey), 0.5);
    this.keyInput.addEventListener("TextChanged", this.updateData.bind(this, false));
    editorToolbar.appendToolbarItem(this.keyInput);
    editorToolbar.appendToolbarItem(new UI6.Toolbar.ToolbarSeparator());
    editorToolbar.appendToolbarItem(this.needsRefresh);
  }
  pageBackButtonClicked() {
    this.skipCount = Math.max(0, this.skipCount - this.pageSize);
    this.updateData(false);
  }
  pageForwardButtonClicked() {
    this.skipCount = this.skipCount + this.pageSize;
    this.updateData(false);
  }
  populateContextMenu(contextMenu, gridNode) {
    const node = gridNode;
    if (node.valueObjectPresentation) {
      contextMenu.revealSection().appendItem(i18nString5(UIStrings5.expandRecursively), () => {
        if (!node.valueObjectPresentation) {
          return;
        }
        void node.valueObjectPresentation.objectTreeElement().expandRecursively();
      }, { jslogContext: "expand-recursively" });
      contextMenu.revealSection().appendItem(i18nString5(UIStrings5.collapse), () => {
        if (!node.valueObjectPresentation) {
          return;
        }
        node.valueObjectPresentation.objectTreeElement().collapse();
      }, { jslogContext: "collapse" });
    }
  }
  refreshData() {
    this.updateData(true);
  }
  update(objectStore = null, index = null) {
    if (!objectStore) {
      return;
    }
    this.objectStore = objectStore;
    this.index = index;
    if (this.dataGrid) {
      this.dataGrid.asWidget().detach();
    }
    this.dataGrid = this.createDataGrid();
    this.dataGrid.setRowContextMenuCallback(this.populateContextMenu.bind(this));
    this.dataGrid.asWidget().show(this.element);
    this.skipCount = 0;
    this.updateData(true);
  }
  // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseKey(keyString) {
    let result;
    try {
      result = JSON.parse(keyString);
    } catch {
      result = keyString;
    }
    return result;
  }
  updateData(force) {
    const key = this.parseKey(this.keyInput.value());
    const pageSize = this.pageSize;
    let skipCount = this.skipCount;
    let selected = this.dataGrid.selectedNode ? this.dataGrid.selectedNode.data["number"] : 0;
    selected = Math.max(selected, this.skipCount);
    this.clearButton.setEnabled(!this.isIndex);
    if (!force && this.lastKey === key && this.lastPageSize === pageSize && this.lastSkipCount === skipCount) {
      return;
    }
    if (this.lastKey !== key || this.lastPageSize !== pageSize) {
      skipCount = 0;
      this.skipCount = 0;
    }
    this.lastKey = key;
    this.lastPageSize = pageSize;
    this.lastSkipCount = skipCount;
    function callback(entries, hasMore) {
      this.clear();
      this.entries = entries;
      let selectedNode = null;
      for (let i = 0; i < entries.length; ++i) {
        const data = {};
        data["number"] = i + skipCount;
        data["key"] = entries[i].key;
        data["primary-key"] = entries[i].primaryKey;
        data["value"] = entries[i].value;
        const node = new IDBDataGridNode(data);
        this.dataGrid.rootNode().appendChild(node);
        if (data["number"] <= selected) {
          selectedNode = node;
        }
      }
      if (selectedNode) {
        selectedNode.select();
      }
      this.pageBackButton.setEnabled(Boolean(skipCount));
      this.pageForwardButton.setEnabled(hasMore);
      this.needsRefresh.setVisible(false);
      this.updateToolbarEnablement();
      this.updatedDataForTests();
    }
    const idbKeyRange = key ? window.IDBKeyRange.lowerBound(key) : null;
    if (this.isIndex && this.index) {
      this.model.loadIndexData(this.databaseId, this.objectStore.name, this.index.name, idbKeyRange, skipCount, pageSize, callback.bind(this));
    } else {
      this.model.loadObjectStoreData(this.databaseId, this.objectStore.name, idbKeyRange, skipCount, pageSize, callback.bind(this));
    }
    void this.model.getMetadata(this.databaseId, this.objectStore).then(this.updateSummaryBar.bind(this));
  }
  updateSummaryBar(metadata) {
    if (!this.summaryBarElement) {
      this.summaryBarElement = this.element.createChild("div", "object-store-summary-bar");
    }
    this.summaryBarElement.removeChildren();
    if (!metadata) {
      return;
    }
    const separator = "\u2002\u2758\u2002";
    const span = this.summaryBarElement.createChild("span");
    span.textContent = i18nString5(UIStrings5.totalEntriesS, { PH1: String(metadata.entriesCount) });
    if (this.objectStore.autoIncrement) {
      span.textContent += separator;
      span.textContent += i18nString5(UIStrings5.keyGeneratorValueS, { PH1: String(metadata.keyGeneratorValue) });
    }
  }
  updatedDataForTests() {
  }
  refreshButtonClicked() {
    this.updateData(true);
  }
  async clearButtonClicked() {
    const ok = await UI6.UIUtils.ConfirmDialog.show(i18nString5(UIStrings5.objectStoreWillBeCleared), i18nString5(UIStrings5.confirmClearObjectStore, { PH1: this.objectStore.name }), this.element, { jslogContext: "clear-object-store-confirmation" });
    if (ok) {
      this.clearButton.setEnabled(false);
      this.clearingObjectStore = true;
      await this.model.clearObjectStore(this.databaseId, this.objectStore.name);
      this.clearingObjectStore = false;
      this.clearButton.setEnabled(true);
      this.updateData(true);
    }
  }
  markNeedsRefresh() {
    if (this.clearingObjectStore) {
      return;
    }
    this.needsRefresh.setVisible(true);
  }
  async resolveArrayKey(key) {
    const { properties } = await key.getOwnProperties(
      false
      /* generatePreview */
    );
    if (!properties) {
      return [];
    }
    const result = [];
    const propertyPromises = properties.filter((property) => !isNaN(Number(property.name))).map(async (property) => {
      const value = property.value;
      if (!value) {
        return;
      }
      let propertyValue;
      if (value.subtype === "array") {
        propertyValue = await this.resolveArrayKey(value);
      } else {
        propertyValue = value.value;
      }
      result[Number(property.name)] = propertyValue;
    });
    await Promise.all(propertyPromises);
    return result;
  }
  async deleteButtonClicked(node) {
    if (!node) {
      node = this.dataGrid.selectedNode;
      if (!node) {
        return;
      }
    }
    const key = this.isIndex ? node.data["primary-key"] : node.data.key;
    const keyValue = key.subtype === "array" ? await this.resolveArrayKey(key) : key.value;
    await this.model.deleteEntries(this.databaseId, this.objectStore.name, window.IDBKeyRange.only(keyValue));
    this.refreshObjectStoreCallback();
  }
  clear() {
    this.dataGrid.rootNode().removeChildren();
    this.entries = [];
  }
  updateToolbarEnablement() {
    const empty = !this.dataGrid || this.dataGrid.rootNode().children.length === 0;
    this.deleteSelectedButton.setEnabled(!empty && this.dataGrid.selectedNode !== null);
  }
};
var IDBDataGridNode = class extends DataGrid3.DataGrid.DataGridNode {
  selectable;
  valueObjectPresentation;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data) {
    super(data, false);
    this.selectable = true;
    this.valueObjectPresentation = null;
  }
  createCell(columnIdentifier) {
    const cell = super.createCell(columnIdentifier);
    const value = this.data[columnIdentifier];
    switch (columnIdentifier) {
      case "value": {
        cell.removeChildren();
        const objectPropSection = ObjectUI.ObjectPropertiesSection.ObjectPropertiesSection.defaultObjectPropertiesSection(
          value,
          void 0,
          true,
          true
          /* readOnly */
        );
        cell.appendChild(objectPropSection.element);
        this.valueObjectPresentation = objectPropSection;
        break;
      }
      case "key":
      case "primary-key": {
        cell.removeChildren();
        const objectElement = ObjectUI.ObjectPropertiesSection.ObjectPropertiesSection.defaultObjectPresentation(
          value,
          void 0,
          true,
          true
          /* readOnly */
        );
        cell.appendChild(objectElement);
        break;
      }
    }
    return cell;
  }
};

// gen/front_end/panels/application/InterestGroupStorageModel.js
var InterestGroupStorageModel_exports = {};
__export(InterestGroupStorageModel_exports, {
  InterestGroupStorageModel: () => InterestGroupStorageModel
});
import * as SDK8 from "./../../core/sdk/sdk.js";
var InterestGroupStorageModel = class extends SDK8.SDKModel.SDKModel {
  storageAgent;
  enabled;
  constructor(target) {
    super(target);
    target.registerStorageDispatcher(this);
    this.storageAgent = target.storageAgent();
    this.enabled = false;
  }
  enable() {
    if (this.enabled) {
      return;
    }
    void this.storageAgent.invoke_setInterestGroupTracking({ enable: true });
  }
  disable() {
    if (!this.enabled) {
      return;
    }
    void this.storageAgent.invoke_setInterestGroupTracking({ enable: false });
  }
  interestGroupAccessed(event) {
    this.dispatchEventToListeners("InterestGroupAccess", event);
  }
  attributionReportingTriggerRegistered(_event) {
  }
  indexedDBListUpdated(_event) {
  }
  indexedDBContentUpdated(_event) {
  }
  interestGroupAuctionEventOccurred(_event) {
  }
  interestGroupAuctionNetworkRequestCreated(_event) {
  }
  cacheStorageListUpdated(_event) {
  }
  cacheStorageContentUpdated(_event) {
  }
  sharedStorageAccessed(_event) {
  }
  sharedStorageWorkletOperationExecutionFinished(_event) {
  }
  storageBucketCreatedOrUpdated(_event) {
  }
  storageBucketDeleted(_event) {
  }
  attributionReportingSourceRegistered(_event) {
  }
  attributionReportingReportSent(_event) {
  }
  attributionReportingVerboseDebugReportSent(_event) {
  }
};
SDK8.SDKModel.SDKModel.register(InterestGroupStorageModel, { capabilities: 8192, autostart: false });

// gen/front_end/panels/application/InterestGroupTreeElement.js
var InterestGroupTreeElement_exports = {};
__export(InterestGroupTreeElement_exports, {
  InterestGroupTreeElement: () => InterestGroupTreeElement,
  i18nString: () => i18nString7
});
import * as Host4 from "./../../core/host/host.js";
import * as i18n13 from "./../../core/i18n/i18n.js";
import * as SDK9 from "./../../core/sdk/sdk.js";
import * as IconButton4 from "./../../ui/components/icon_button/icon_button.js";

// gen/front_end/panels/application/InterestGroupStorageView.js
var InterestGroupStorageView_exports = {};
__export(InterestGroupStorageView_exports, {
  InterestGroupStorageView: () => InterestGroupStorageView
});
import * as i18n11 from "./../../core/i18n/i18n.js";
import * as SourceFrame from "./../../ui/legacy/components/source_frame/source_frame.js";
import * as UI7 from "./../../ui/legacy/legacy.js";
import * as VisualLogging4 from "./../../ui/visual_logging/visual_logging.js";
import * as ApplicationComponents5 from "./components/components.js";

// gen/front_end/panels/application/interestGroupStorageView.css.js
var interestGroupStorageView_css_default = `/*
 * Copyright 2021 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

devtools-interest-group-access-grid {
  overflow: auto;
}

/*# sourceURL=${import.meta.resolve("./interestGroupStorageView.css")} */`;

// gen/front_end/panels/application/InterestGroupStorageView.js
var UIStrings6 = {
  /**
   * @description Placeholder text shown when nothing has been selected for display
   *details.
   * An interest group is an ad targeting group stored on the browser that can
   * be used to show a certain set of advertisements in the future as the
   * outcome of a FLEDGE auction.
   */
  noValueSelected: "No interest group selected",
  /**
   * @description Placeholder text instructing the user how to display interest group
   *details.
   * An interest group is an ad targeting group stored on the browser that can
   * be used to show a certain set of advertisements in the future as the
   * outcome of a FLEDGE auction.
   */
  clickToDisplayBody: "Select any interest group event to display the group's current state",
  /**
   * @description Placeholder text telling the user no details are available for
   *the selected interest group.
   */
  noDataAvailable: "No details available",
  /**
   * @description Placeholder text explaining to the user a potential reason for not having details on
   * the interest groups.
   * An interest group is an ad targeting group stored on the browser that can
   * be used to show a certain set of advertisements in the future as the
   * outcome of a FLEDGE auction.
   */
  noDataDescription: "The browser may have left the group."
};
var str_6 = i18n11.i18n.registerUIStrings("panels/application/InterestGroupStorageView.ts", UIStrings6);
var i18nString6 = i18n11.i18n.getLocalizedString.bind(void 0, str_6);
function eventEquals(a, b) {
  return a.accessTime === b.accessTime && a.type === b.type && a.ownerOrigin === b.ownerOrigin && a.name === b.name;
}
var InterestGroupStorageView = class extends UI7.SplitWidget.SplitWidget {
  interestGroupGrid = new ApplicationComponents5.InterestGroupAccessGrid.InterestGroupAccessGrid();
  events = [];
  detailsGetter;
  noDataView;
  noDisplayView;
  constructor(detailsGetter) {
    super(
      /* isVertical */
      false,
      /* secondIsSidebar: */
      true
    );
    this.element.setAttribute("jslog", `${VisualLogging4.pane("interest-groups")}`);
    this.detailsGetter = detailsGetter;
    const topPanel = new UI7.Widget.VBox();
    this.noDisplayView = new UI7.EmptyWidget.EmptyWidget(i18nString6(UIStrings6.noValueSelected), i18nString6(UIStrings6.clickToDisplayBody));
    this.noDataView = new UI7.EmptyWidget.EmptyWidget(i18nString6(UIStrings6.noDataAvailable), i18nString6(UIStrings6.noDataDescription));
    topPanel.setMinimumSize(0, 120);
    this.setMainWidget(topPanel);
    this.noDisplayView.setMinimumSize(0, 80);
    this.setSidebarWidget(this.noDisplayView);
    this.noDataView.setMinimumSize(0, 80);
    this.noDisplayView.contentElement.setAttribute("jslog", `${VisualLogging4.pane("details").track({ resize: true })}`);
    this.noDataView.contentElement.setAttribute("jslog", `${VisualLogging4.pane("details").track({ resize: true })}`);
    this.hideSidebar();
    topPanel.contentElement.appendChild(this.interestGroupGrid);
    this.interestGroupGrid.addEventListener("select", this.onFocus.bind(this));
  }
  wasShown() {
    super.wasShown();
    const mainWidget = this.mainWidget();
    if (mainWidget) {
      mainWidget.registerRequiredCSS(interestGroupStorageView_css_default);
    }
  }
  addEvent(event) {
    if (this.showMode() !== "Both") {
      this.showBoth();
    }
    const foundEvent = this.events.find((t) => eventEquals(t, event));
    if (!foundEvent) {
      this.events.push(event);
      this.interestGroupGrid.data = this.events;
    }
  }
  clearEvents() {
    this.events = [];
    this.interestGroupGrid.data = this.events;
    this.setSidebarWidget(this.noDisplayView);
    this.sidebarUpdatedForTesting();
  }
  async onFocus(event) {
    const focusedEvent = event;
    const { ownerOrigin, name, type: eventType } = focusedEvent.detail;
    let details = null;
    if (eventType !== "additionalBid" && eventType !== "additionalBidWin" && eventType !== "topLevelAdditionalBid") {
      details = await this.detailsGetter.getInterestGroupDetails(ownerOrigin, name);
    }
    if (details) {
      const jsonView = await SourceFrame.JSONView.JSONView.createView(JSON.stringify(details));
      jsonView?.setMinimumSize(0, 40);
      if (jsonView) {
        jsonView.contentElement.setAttribute("jslog", `${VisualLogging4.pane("details").track({ resize: true })}`);
        this.setSidebarWidget(jsonView);
      }
    } else {
      this.setSidebarWidget(this.noDataView);
    }
    this.sidebarUpdatedForTesting();
  }
  getEventsForTesting() {
    return this.events;
  }
  getInterestGroupGridForTesting() {
    return this.interestGroupGrid;
  }
  sidebarUpdatedForTesting() {
  }
};

// gen/front_end/panels/application/InterestGroupTreeElement.js
var UIStrings7 = {
  /**
   * @description Label for an item in the Application Panel Sidebar of the Application panel
   * An interest group is an ad targeting group stored on the browser that can
   * be used to show a certain set of advertisements in the future as the
   * outcome of a FLEDGE auction. (https://developer.chrome.com/blog/fledge-api/)
   */
  interestGroups: "Interest groups"
};
var str_7 = i18n13.i18n.registerUIStrings("panels/application/InterestGroupTreeElement.ts", UIStrings7);
var i18nString7 = i18n13.i18n.getLocalizedString.bind(void 0, str_7);
var InterestGroupTreeElement = class extends ApplicationPanelTreeElement {
  view;
  constructor(storagePanel) {
    super(storagePanel, i18nString7(UIStrings7.interestGroups), false, "interest-groups");
    const interestGroupIcon = IconButton4.Icon.create("database");
    this.setLeadingIcons([interestGroupIcon]);
    this.view = new InterestGroupStorageView(this);
  }
  get itemURL() {
    return "interest-groups://";
  }
  async getInterestGroupDetails(owner, name) {
    const mainTarget = SDK9.TargetManager.TargetManager.instance().primaryPageTarget();
    if (!mainTarget) {
      return null;
    }
    const response = await mainTarget.storageAgent().invoke_getInterestGroupDetails({ ownerOrigin: owner, name });
    return response.details;
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    this.showView(this.view);
    Host4.userMetrics.panelShown("interest-groups");
    return false;
  }
  addEvent(event) {
    this.view.addEvent(event);
  }
  clearEvents() {
    this.view.clearEvents();
  }
};

// gen/front_end/panels/application/OpenedWindowDetailsView.js
var OpenedWindowDetailsView_exports = {};
__export(OpenedWindowDetailsView_exports, {
  OpenedWindowDetailsView: () => OpenedWindowDetailsView,
  WorkerDetailsView: () => WorkerDetailsView
});
import * as Common6 from "./../../core/common/common.js";
import * as i18n15 from "./../../core/i18n/i18n.js";
import * as SDK10 from "./../../core/sdk/sdk.js";
import * as IconButton5 from "./../../ui/components/icon_button/icon_button.js";
import * as UI8 from "./../../ui/legacy/legacy.js";

// gen/front_end/panels/application/openedWindowDetailsView.css.js
var openedWindowDetailsView_css_default = `/*
 * Copyright 2020 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.report-content-box {
  overflow: initial;
}

.report-field-name {
  flex: 0 0 200px;
}

.report-field-value {
  user-select: text;
  display: flex;
}

.report-field .inline-name {
  color: var(--sys-color-state-disabled);
  padding-left: 2ex;
  user-select: none;
  white-space: pre-line;
}

.report-field .inline-name::after {
  content: ":\\A0";
}

.report-field .inline-comment {
  color: var(--sys-color-token-subtle);
  padding-left: 1ex;
  white-space: pre-line;
}

.report-field .inline-comment::before {
  content: "(";
}

.report-field .inline-comment::after {
  content: ")";
}

.report-field .inline-span {
  color: var(--sys-color-token-subtle);
  padding-left: 1ex;
  white-space: pre-line;
}

.report-field-value-link {
  display: inline-block;
}

.icon-link.devtools-link {
  background-color: var(--sys-color-primary);
  vertical-align: sub;
}

.frame-details-container {
  overflow: auto;
}

.frame-details-report-container {
  min-width: 550px;
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
}

/*# sourceURL=${import.meta.resolve("./openedWindowDetailsView.css")} */`;

// gen/front_end/panels/application/OpenedWindowDetailsView.js
var UIStrings8 = {
  /**
   * @description Text in Timeline indicating that input has happened recently
   */
  yes: "Yes",
  /**
   * @description Text in Timeline indicating that input has not happened recently
   */
  no: "No",
  /**
   * @description Title for a link to the Elements panel
   */
  clickToOpenInElementsPanel: "Click to open in Elements panel",
  /**
   * @description Name of a network resource type
   */
  document: "Document",
  /**
   * @description Text for web URLs
   */
  url: "URL",
  /**
   * @description Title of the 'Security' tool
   */
  security: "Security",
  /**
   * @description Label for link to Opener Frame in Detail View for Opened Window
   */
  openerFrame: "Opener Frame",
  /**
   * @description Label in opened window's details view whether window has access to its opener
   */
  accessToOpener: "Access to opener",
  /**
   * @description Description for the 'Access to Opener' field
   */
  showsWhetherTheOpenedWindowIs: "Shows whether the opened window is able to access its opener and vice versa",
  /**
   * @description Text in Frames View of the Application panel
   */
  windowWithoutTitle: "Window without title",
  /**
   * @description Label suffix in the Application Panel Frames section for windows which are already closed
   */
  closed: "closed",
  /**
   * @description Default name for worker
   */
  worker: "worker",
  /**
   * @description Text that refers to some types
   */
  type: "Type",
  /**
   * @description Section header in the Frame Details view
   */
  securityIsolation: "Security & Isolation",
  /**
   * @description Row title in the Frame Details view
   */
  crossoriginEmbedderPolicy: "Cross-Origin Embedder Policy",
  /**
   * @description Label for worker type: web worker
   */
  webWorker: "Web Worker",
  /**
   * @description Text for an unspecified service worker response source
   */
  unknown: "Unknown",
  /**
   * @description This label specifies the server endpoints to which the server is reporting errors
   *and warnings through the Report-to API. Following this label will be the URL of the server.
   */
  reportingTo: "reporting to"
};
var str_8 = i18n15.i18n.registerUIStrings("panels/application/OpenedWindowDetailsView.ts", UIStrings8);
var i18nString8 = i18n15.i18n.getLocalizedString.bind(void 0, str_8);
var booleanToYesNo = (b) => b ? i18nString8(UIStrings8.yes) : i18nString8(UIStrings8.no);
function linkifyIcon(iconType, title, eventHandler) {
  const icon = IconButton5.Icon.create(iconType, "icon-link devtools-link");
  const button = document.createElement("button");
  UI8.Tooltip.Tooltip.install(button, title);
  button.classList.add("devtools-link", "link-style", "text-button");
  button.appendChild(icon);
  button.addEventListener("click", (event) => {
    event.consume(true);
    void eventHandler();
  });
  return button;
}
async function maybeCreateLinkToElementsPanel(opener) {
  let openerFrame = null;
  if (opener instanceof SDK10.ResourceTreeModel.ResourceTreeFrame) {
    openerFrame = opener;
  } else if (opener) {
    openerFrame = SDK10.FrameManager.FrameManager.instance().getFrame(opener);
  }
  if (!openerFrame) {
    return null;
  }
  const linkTargetDOMNode = await openerFrame.getOwnerDOMNodeOrDocument();
  if (!linkTargetDOMNode) {
    return null;
  }
  const linkElement = linkifyIcon("code-circle", i18nString8(UIStrings8.clickToOpenInElementsPanel), () => Common6.Revealer.reveal(linkTargetDOMNode));
  const label = document.createElement("span");
  label.textContent = `<${linkTargetDOMNode.nodeName().toLocaleLowerCase()}>`;
  linkElement.insertBefore(label, linkElement.firstChild);
  linkElement.addEventListener("mouseenter", () => {
    if (openerFrame) {
      void openerFrame.highlight();
    }
  });
  linkElement.addEventListener("mouseleave", () => {
    SDK10.OverlayModel.OverlayModel.hideDOMNodeHighlight();
  });
  return linkElement;
}
var OpenedWindowDetailsView = class extends UI8.ThrottledWidget.ThrottledWidget {
  targetInfo;
  isWindowClosed;
  reportView;
  documentSection;
  #urlFieldValue;
  securitySection;
  openerElementField;
  hasDOMAccessValue;
  constructor(targetInfo, isWindowClosed) {
    super();
    this.registerRequiredCSS(openedWindowDetailsView_css_default);
    this.targetInfo = targetInfo;
    this.isWindowClosed = isWindowClosed;
    this.contentElement.classList.add("frame-details-container");
    this.reportView = new UI8.ReportView.ReportView(this.buildTitle());
    this.reportView.show(this.contentElement);
    this.reportView.registerRequiredCSS(openedWindowDetailsView_css_default);
    this.reportView.element.classList.add("frame-details-report-container");
    this.documentSection = this.reportView.appendSection(i18nString8(UIStrings8.document));
    this.#urlFieldValue = this.documentSection.appendField(i18nString8(UIStrings8.url)).createChild("div", "text-ellipsis");
    this.securitySection = this.reportView.appendSection(i18nString8(UIStrings8.security));
    this.openerElementField = this.securitySection.appendField(i18nString8(UIStrings8.openerFrame));
    this.securitySection.setFieldVisible(i18nString8(UIStrings8.openerFrame), false);
    this.hasDOMAccessValue = this.securitySection.appendField(i18nString8(UIStrings8.accessToOpener));
    UI8.Tooltip.Tooltip.install(this.hasDOMAccessValue, i18nString8(UIStrings8.showsWhetherTheOpenedWindowIs));
    this.update();
  }
  async doUpdate() {
    this.reportView.setTitle(this.buildTitle());
    this.#urlFieldValue.textContent = this.targetInfo.url;
    this.#urlFieldValue.title = this.targetInfo.url;
    this.hasDOMAccessValue.textContent = booleanToYesNo(this.targetInfo.canAccessOpener);
    void this.maybeDisplayOpenerFrame();
  }
  async maybeDisplayOpenerFrame() {
    this.openerElementField.removeChildren();
    const linkElement = await maybeCreateLinkToElementsPanel(this.targetInfo.openerFrameId);
    if (linkElement) {
      this.openerElementField.append(linkElement);
      this.securitySection.setFieldVisible(i18nString8(UIStrings8.openerFrame), true);
      return;
    }
    this.securitySection.setFieldVisible(i18nString8(UIStrings8.openerFrame), false);
  }
  buildTitle() {
    let title = this.targetInfo.title || i18nString8(UIStrings8.windowWithoutTitle);
    if (this.isWindowClosed) {
      title += ` (${i18nString8(UIStrings8.closed)})`;
    }
    return title;
  }
  setIsWindowClosed(isWindowClosed) {
    this.isWindowClosed = isWindowClosed;
  }
  setTargetInfo(targetInfo) {
    this.targetInfo = targetInfo;
  }
};
var WorkerDetailsView = class extends UI8.ThrottledWidget.ThrottledWidget {
  targetInfo;
  reportView;
  documentSection;
  isolationSection;
  coepPolicy;
  constructor(targetInfo) {
    super();
    this.registerRequiredCSS(openedWindowDetailsView_css_default);
    this.targetInfo = targetInfo;
    this.contentElement.classList.add("frame-details-container");
    this.reportView = new UI8.ReportView.ReportView(this.targetInfo.title || this.targetInfo.url || i18nString8(UIStrings8.worker));
    this.reportView.show(this.contentElement);
    this.reportView.registerRequiredCSS(openedWindowDetailsView_css_default);
    this.reportView.element.classList.add("frame-details-report-container");
    this.documentSection = this.reportView.appendSection(i18nString8(UIStrings8.document));
    const URLFieldValue = this.documentSection.appendField(i18nString8(UIStrings8.url)).createChild("div", "text-ellipsis");
    URLFieldValue.textContent = this.targetInfo.url;
    URLFieldValue.title = this.targetInfo.url;
    const workerType = this.documentSection.appendField(i18nString8(UIStrings8.type));
    workerType.textContent = this.workerTypeToString(this.targetInfo.type);
    this.isolationSection = this.reportView.appendSection(i18nString8(UIStrings8.securityIsolation));
    this.coepPolicy = this.isolationSection.appendField(i18nString8(UIStrings8.crossoriginEmbedderPolicy));
    this.update();
  }
  workerTypeToString(type) {
    if (type === "worker") {
      return i18nString8(UIStrings8.webWorker);
    }
    if (type === "service_worker") {
      return i18n15.i18n.lockedString("Service Worker");
    }
    return i18nString8(UIStrings8.unknown);
  }
  async updateCoopCoepStatus() {
    const target = SDK10.TargetManager.TargetManager.instance().targetById(this.targetInfo.targetId);
    if (!target) {
      return;
    }
    const model = target.model(SDK10.NetworkManager.NetworkManager);
    const info = model && await model.getSecurityIsolationStatus(null);
    if (!info) {
      return;
    }
    const coepIsEnabled = (value) => value !== "None";
    this.fillCrossOriginPolicy(this.coepPolicy, coepIsEnabled, info.coep);
  }
  fillCrossOriginPolicy(field, isEnabled, info) {
    if (!info) {
      field.textContent = "";
      return;
    }
    const enabled = isEnabled(info.value);
    field.textContent = enabled ? info.value : info.reportOnlyValue;
    if (!enabled && isEnabled(info.reportOnlyValue)) {
      const reportOnly = document.createElement("span");
      reportOnly.classList.add("inline-comment");
      reportOnly.textContent = "report-only";
      field.appendChild(reportOnly);
    }
    const endpoint = enabled ? info.reportingEndpoint : info.reportOnlyReportingEndpoint;
    if (endpoint) {
      const reportingEndpointPrefix = field.createChild("span", "inline-name");
      reportingEndpointPrefix.textContent = i18nString8(UIStrings8.reportingTo);
      const reportingEndpointName = field.createChild("span");
      reportingEndpointName.textContent = endpoint;
    }
  }
  async doUpdate() {
    await this.updateCoopCoepStatus();
  }
};

// gen/front_end/panels/application/PreloadingTreeElement.js
var PreloadingTreeElement_exports = {};
__export(PreloadingTreeElement_exports, {
  PreloadingRuleSetTreeElement: () => PreloadingRuleSetTreeElement,
  PreloadingSummaryTreeElement: () => PreloadingSummaryTreeElement
});
import * as i18n21 from "./../../core/i18n/i18n.js";
import * as IconButton6 from "./../../ui/components/icon_button/icon_button.js";

// gen/front_end/panels/application/preloading/PreloadingView.js
var PreloadingView_exports = {};
__export(PreloadingView_exports, {
  PreloadingAttemptView: () => PreloadingAttemptView,
  PreloadingRuleSetView: () => PreloadingRuleSetView,
  PreloadingSummaryView: () => PreloadingSummaryView,
  PreloadingWarningsView: () => PreloadingWarningsView
});
import "./../../ui/legacy/legacy.js";
import * as Common7 from "./../../core/common/common.js";
import * as i18n19 from "./../../core/i18n/i18n.js";
import * as Platform2 from "./../../core/platform/platform.js";
import { assertNotNullOrUndefined as assertNotNullOrUndefined2 } from "./../../core/platform/platform.js";
import * as SDK12 from "./../../core/sdk/sdk.js";
import * as Buttons4 from "./../../ui/components/buttons/buttons.js";
import * as UI9 from "./../../ui/legacy/legacy.js";
import { html as html2, render } from "./../../ui/lit/lit.js";
import * as VisualLogging5 from "./../../ui/visual_logging/visual_logging.js";
import * as PreloadingComponents from "./preloading/components/components.js";

// gen/front_end/panels/application/preloading/components/PreloadingString.js
import * as i18n17 from "./../../core/i18n/i18n.js";
import { assertNotNullOrUndefined } from "./../../core/platform/platform.js";
import * as SDK11 from "./../../core/sdk/sdk.js";
import * as Bindings2 from "./../../models/bindings/bindings.js";
var UIStrings9 = {
  /**
   * @description  Description text for Prefetch status PrefetchFailedIneligibleRedirect.
   */
  PrefetchFailedIneligibleRedirect: "The prefetch was redirected, but the redirect URL is not eligible for prefetch.",
  /**
   * @description  Description text for Prefetch status PrefetchFailedInvalidRedirect.
   */
  PrefetchFailedInvalidRedirect: "The prefetch was redirected, but there was a problem with the redirect.",
  /**
   * @description  Description text for Prefetch status PrefetchFailedMIMENotSupported.
   */
  PrefetchFailedMIMENotSupported: "The prefetch failed because the response's Content-Type header was not supported.",
  /**
   * @description  Description text for Prefetch status PrefetchFailedNetError.
   */
  PrefetchFailedNetError: "The prefetch failed because of a network error.",
  /**
   * @description  Description text for Prefetch status PrefetchFailedNon2XX.
   */
  PrefetchFailedNon2XX: "The prefetch failed because of a non-2xx HTTP response status code.",
  /**
   * @description  Description text for Prefetch status PrefetchIneligibleRetryAfter.
   */
  PrefetchIneligibleRetryAfter: "A previous prefetch to the origin got a HTTP 503 response with an Retry-After header that has not elapsed yet.",
  /**
   * @description  Description text for Prefetch status PrefetchIsPrivacyDecoy.
   */
  PrefetchIsPrivacyDecoy: "The URL was not eligible to be prefetched because there was a registered service worker or cross-site cookies for that origin, but the prefetch was put on the network anyways and not used, to disguise that the user had some kind of previous relationship with the origin.",
  /**
   * @description  Description text for Prefetch status PrefetchIsStale.
   */
  PrefetchIsStale: "Too much time elapsed between the prefetch and usage, so the prefetch was discarded.",
  /**
   * @description  Description text for Prefetch status PrefetchNotEligibleBrowserContextOffTheRecord.
   */
  PrefetchNotEligibleBrowserContextOffTheRecord: "The prefetch was not performed because the browser is in Incognito or Guest mode.",
  /**
   * @description  Description text for Prefetch status PrefetchNotEligibleDataSaverEnabled.
   */
  PrefetchNotEligibleDataSaverEnabled: "The prefetch was not performed because the operating system is in Data Saver mode.",
  /**
   * @description  Description text for Prefetch status PrefetchNotEligibleExistingProxy.
   */
  PrefetchNotEligibleExistingProxy: "The URL is not eligible to be prefetched, because in the default network context it is configured to use a proxy server.",
  /**
   * @description  Description text for Prefetch status PrefetchNotEligibleHostIsNonUnique.
   */
  PrefetchNotEligibleHostIsNonUnique: "The URL was not eligible to be prefetched because its host was not unique (e.g., a non publicly routable IP address or a hostname which is not registry-controlled), but the prefetch was required to be proxied.",
  /**
   * @description  Description text for Prefetch status PrefetchNotEligibleNonDefaultStoragePartition.
   */
  PrefetchNotEligibleNonDefaultStoragePartition: "The URL was not eligible to be prefetched because it uses a non-default storage partition.",
  /**
   * @description  Description text for Prefetch status PrefetchNotEligibleSameSiteCrossOriginPrefetchRequiredProxy.
   */
  PrefetchNotEligibleSameSiteCrossOriginPrefetchRequiredProxy: "The URL was not eligible to be prefetched because the default network context cannot be configured to use the prefetch proxy for a same-site cross-origin prefetch request.",
  /**
   * @description  Description text for Prefetch status PrefetchNotEligibleSchemeIsNotHttps.
   */
  PrefetchNotEligibleSchemeIsNotHttps: "The URL was not eligible to be prefetched because its scheme was not https:.",
  /**
   * @description  Description text for Prefetch status PrefetchNotEligibleUserHasCookies.
   */
  PrefetchNotEligibleUserHasCookies: "The URL was not eligible to be prefetched because it was cross-site, but the user had cookies for that origin.",
  /**
   * @description  Description text for Prefetch status PrefetchNotEligibleUserHasServiceWorker.
   */
  PrefetchNotEligibleUserHasServiceWorker: "The URL was not eligible to be prefetched because there was a registered service worker for that origin, which is currently not supported.",
  /**
   * @description  Description text for Prefetch status PrefetchNotUsedCookiesChanged.
   */
  PrefetchNotUsedCookiesChanged: "The prefetch was not used because it was a cross-site prefetch, and cookies were added for that URL while the prefetch was ongoing, so the prefetched response is now out-of-date.",
  /**
   * @description  Description text for Prefetch status PrefetchProxyNotAvailable.
   */
  PrefetchProxyNotAvailable: "A network error was encountered when trying to set up a connection to the prefetching proxy.",
  /**
   * @description  Description text for Prefetch status PrefetchNotUsedProbeFailed.
   */
  PrefetchNotUsedProbeFailed: "The prefetch was blocked by your Internet Service Provider or network administrator.",
  /**
   * @description  Description text for Prefetch status PrefetchEvictedForNewerPrefetch.
   */
  PrefetchEvictedForNewerPrefetch: "The prefetch was discarded because the initiating page has too many prefetches ongoing, and this was one of the oldest.",
  /**
   * @description Description text for Prefetch status PrefetchEvictedAfterCandidateRemoved.
   */
  PrefetchEvictedAfterCandidateRemoved: "The prefetch was discarded because no speculation rule in the initating page triggers a prefetch for this URL anymore.",
  /**
   * @description  Description text for Prefetch status PrefetchNotEligibleBatterySaverEnabled.
   */
  PrefetchNotEligibleBatterySaverEnabled: "The prefetch was not performed because the Battery Saver setting was enabled.",
  /**
   * @description  Description text for Prefetch status PrefetchNotEligiblePreloadingDisabled.
   */
  PrefetchNotEligiblePreloadingDisabled: "The prefetch was not performed because speculative loading was disabled.",
  /**
   * @description  Description text for Prefetch status PrefetchEvictedAfterBrowsingDataRemoved.
   */
  PrefetchEvictedAfterBrowsingDataRemoved: "The prefetch was discarded because browsing data was removed.",
  /**
   *  Description text for PrerenderFinalStatus::kLowEndDevice.
   */
  prerenderFinalStatusLowEndDevice: "The prerender was not performed because this device does not have enough total system memory to support prerendering.",
  /**
   *  Description text for PrerenderFinalStatus::kInvalidSchemeRedirect.
   */
  prerenderFinalStatusInvalidSchemeRedirect: "The prerendering navigation failed because it redirected to a URL whose scheme was not http: or https:.",
  /**
   *  Description text for PrerenderFinalStatus::kInvalidSchemeNavigation.
   */
  prerenderFinalStatusInvalidSchemeNavigation: "The URL was not eligible to be prerendered because its scheme was not http: or https:.",
  /**
   *  Description text for PrerenderFinalStatus::kNavigationRequestBlockedByCsp.
   */
  prerenderFinalStatusNavigationRequestBlockedByCsp: "The prerendering navigation was blocked by a Content Security Policy.",
  /**
   * @description Description text for PrerenderFinalStatus::kMojoBinderPolicy.
   * @example {device.mojom.GamepadMonitor} PH1
   */
  prerenderFinalStatusMojoBinderPolicy: "The prerendered page used a forbidden JavaScript API that is currently not supported. (Internal Mojo interface: {PH1})",
  /**
   *  Description text for PrerenderFinalStatus::kRendererProcessCrashed.
   */
  prerenderFinalStatusRendererProcessCrashed: "The prerendered page crashed.",
  /**
   *  Description text for PrerenderFinalStatus::kRendererProcessKilled.
   */
  prerenderFinalStatusRendererProcessKilled: "The prerendered page was killed.",
  /**
   *  Description text for PrerenderFinalStatus::kDownload.
   */
  prerenderFinalStatusDownload: "The prerendered page attempted to initiate a download, which is currently not supported.",
  /**
   *  Description text for PrerenderFinalStatus::kNavigationBadHttpStatus.
   */
  prerenderFinalStatusNavigationBadHttpStatus: "The prerendering navigation failed because of a non-2xx HTTP response status code.",
  /**
   *  Description text for PrerenderFinalStatus::kClientCertRequested.
   */
  prerenderFinalStatusClientCertRequested: "The prerendering navigation required a HTTP client certificate.",
  /**
   *  Description text for PrerenderFinalStatus::kNavigationRequestNetworkError.
   */
  prerenderFinalStatusNavigationRequestNetworkError: "The prerendering navigation encountered a network error.",
  /**
   *  Description text for PrerenderFinalStatus::kSslCertificateError.
   */
  prerenderFinalStatusSslCertificateError: "The prerendering navigation failed because of an invalid SSL certificate.",
  /**
   *  Description text for PrerenderFinalStatus::kLoginAuthRequested.
   */
  prerenderFinalStatusLoginAuthRequested: "The prerendering navigation required HTTP authentication, which is currently not supported.",
  /**
   *  Description text for PrerenderFinalStatus::kUaChangeRequiresReload.
   */
  prerenderFinalStatusUaChangeRequiresReload: "Changing User Agent occurred in prerendering navigation.",
  /**
   *  Description text for PrerenderFinalStatus::kBlockedByClient.
   */
  prerenderFinalStatusBlockedByClient: "Some resource load was blocked.",
  /**
   *  Description text for PrerenderFinalStatus::kAudioOutputDeviceRequested.
   */
  prerenderFinalStatusAudioOutputDeviceRequested: "The prerendered page requested audio output, which is currently not supported.",
  /**
   *  Description text for PrerenderFinalStatus::kMixedContent.
   */
  prerenderFinalStatusMixedContent: "The prerendered page contained mixed content.",
  /**
   *  Description text for PrerenderFinalStatus::kTriggerBackgrounded.
   */
  prerenderFinalStatusTriggerBackgrounded: "The initiating page was backgrounded, so the prerendered page was discarded.",
  /**
   *  Description text for PrerenderFinalStatus::kMemoryLimitExceeded.
   */
  prerenderFinalStatusMemoryLimitExceeded: "The prerender was not performed because the browser exceeded the prerendering memory limit.",
  /**
   *  Description text for PrerenderFinalStatus::kDataSaverEnabled.
   */
  prerenderFinalStatusDataSaverEnabled: "The prerender was not performed because the user requested that the browser use less data.",
  /**
   *  Description text for PrerenderFinalStatus::TriggerUrlHasEffectiveUrl.
   */
  prerenderFinalStatusHasEffectiveUrl: "The initiating page cannot perform prerendering, because it has an effective URL that is different from its normal URL. (For example, the New Tab Page, or hosted apps.)",
  /**
   *  Description text for PrerenderFinalStatus::kTimeoutBackgrounded.
   */
  prerenderFinalStatusTimeoutBackgrounded: "The initiating page was backgrounded for a long time, so the prerendered page was discarded.",
  /**
   *  Description text for PrerenderFinalStatus::kCrossSiteRedirectInInitialNavigation.
   */
  prerenderFinalStatusCrossSiteRedirectInInitialNavigation: "The prerendering navigation failed because the prerendered URL redirected to a cross-site URL.",
  /**
   *  Description text for PrerenderFinalStatus::kCrossSiteNavigationInInitialNavigation.
   */
  prerenderFinalStatusCrossSiteNavigationInInitialNavigation: "The prerendering navigation failed because it targeted a cross-site URL.",
  /**
   *  Description text for PrerenderFinalStatus::kSameSiteCrossOriginRedirectNotOptInInInitialNavigation.
   */
  prerenderFinalStatusSameSiteCrossOriginRedirectNotOptInInInitialNavigation: "The prerendering navigation failed because the prerendered URL redirected to a cross-origin same-site URL, but the destination response did not include the appropriate Supports-Loading-Mode header.",
  /**
   *  Description text for PrerenderFinalStatus::kSameSiteCrossOriginNavigationNotOptInInInitialNavigation.
   */
  prerenderFinalStatusSameSiteCrossOriginNavigationNotOptInInInitialNavigation: "The prerendering navigation failed because it was to a cross-origin same-site URL, but the destination response did not include the appropriate Supports-Loading-Mode header.",
  /**
   *  Description text for PrerenderFinalStatus::kActivationNavigationParameterMismatch.
   */
  prerenderFinalStatusActivationNavigationParameterMismatch: "The prerender was not used because during activation time, different navigation parameters (e.g., HTTP headers) were calculated than during the original prerendering navigation request.",
  /**
   *  Description text for PrerenderFinalStatus::kPrimaryMainFrameRendererProcessCrashed.
   */
  prerenderFinalStatusPrimaryMainFrameRendererProcessCrashed: "The initiating page crashed.",
  /**
   *  Description text for PrerenderFinalStatus::kPrimaryMainFrameRendererProcessKilled.
   */
  prerenderFinalStatusPrimaryMainFrameRendererProcessKilled: "The initiating page was killed.",
  /**
   *  Description text for PrerenderFinalStatus::kActivationFramePolicyNotCompatible.
   */
  prerenderFinalStatusActivationFramePolicyNotCompatible: "The prerender was not used because the sandboxing flags or permissions policy of the initiating page was not compatible with those of the prerendering page.",
  /**
   *  Description text for PrerenderFinalStatus::kPreloadingDisabled.
   */
  prerenderFinalStatusPreloadingDisabled: "The prerender was not performed because the user disabled preloading in their browser settings.",
  /**
   *  Description text for PrerenderFinalStatus::kBatterySaverEnabled.
   */
  prerenderFinalStatusBatterySaverEnabled: "The prerender was not performed because the user requested that the browser use less battery.",
  /**
   *  Description text for PrerenderFinalStatus::kActivatedDuringMainFrameNavigation.
   */
  prerenderFinalStatusActivatedDuringMainFrameNavigation: "Prerendered page activated during initiating page's main frame navigation.",
  /**
   *  Description text for PrerenderFinalStatus::kCrossSiteRedirectInMainFrameNavigation.
   */
  prerenderFinalStatusCrossSiteRedirectInMainFrameNavigation: "The prerendered page navigated to a URL which redirected to a cross-site URL.",
  /**
   *  Description text for PrerenderFinalStatus::kCrossSiteNavigationInMainFrameNavigation.
   */
  prerenderFinalStatusCrossSiteNavigationInMainFrameNavigation: "The prerendered page navigated to a cross-site URL.",
  /**
   *  Description text for PrerenderFinalStatus::kSameSiteCrossOriginRedirectNotOptInInMainFrameNavigation.
   */
  prerenderFinalStatusSameSiteCrossOriginRedirectNotOptInInMainFrameNavigation: "The prerendered page navigated to a URL which redirected to a cross-origin same-site URL, but the destination response did not include the appropriate Supports-Loading-Mode header.",
  /**
   *  Description text for PrerenderFinalStatus::kSameSiteCrossOriginNavigationNotOptInInMainFrameNavigation.
   */
  prerenderFinalStatusSameSiteCrossOriginNavigationNotOptInInMainFrameNavigation: "The prerendered page navigated to a cross-origin same-site URL, but the destination response did not include the appropriate Supports-Loading-Mode header.",
  /**
   *  Description text for PrerenderFinalStatus::kMemoryPressureOnTrigger.
   */
  prerenderFinalStatusMemoryPressureOnTrigger: "The prerender was not performed because the browser was under critical memory pressure.",
  /**
   *  Description text for PrerenderFinalStatus::kMemoryPressureAfterTriggered.
   */
  prerenderFinalStatusMemoryPressureAfterTriggered: "The prerendered page was unloaded because the browser came under critical memory pressure.",
  /**
   *  Description text for PrerenderFinalStatus::kPrerenderingDisabledByDevTools.
   */
  prerenderFinalStatusPrerenderingDisabledByDevTools: "The prerender was not performed because DevTools has been used to disable prerendering.",
  /**
   * Description text for PrerenderFinalStatus::kSpeculationRuleRemoved.
   */
  prerenderFinalStatusSpeculationRuleRemoved: 'The prerendered page was unloaded because the initiating page removed the corresponding prerender rule from <script type="speculationrules">.',
  /**
   * Description text for PrerenderFinalStatus::kActivatedWithAuxiliaryBrowsingContexts.
   */
  prerenderFinalStatusActivatedWithAuxiliaryBrowsingContexts: "The prerender was not used because during activation time, there were other windows with an active opener reference to the initiating page, which is currently not supported.",
  /**
   * Description text for PrerenderFinalStatus::kMaxNumOfRunningEagerPrerendersExceeded.
   */
  prerenderFinalStatusMaxNumOfRunningEagerPrerendersExceeded: 'The prerender whose eagerness is "eager" was not performed because the initiating page already has too many prerenders ongoing. Remove other speculation rules with "eager" to enable further prerendering.',
  /**
   * Description text for PrerenderFinalStatus::kMaxNumOfRunningEmbedderPrerendersExceeded.
   */
  prerenderFinalStatusMaxNumOfRunningEmbedderPrerendersExceeded: "The browser-triggered prerender was not performed because the initiating page already has too many prerenders ongoing.",
  /**
   * Description text for PrerenderFinalStatus::kMaxNumOfRunningNonEagerPrerendersExceeded.
   */
  prerenderFinalStatusMaxNumOfRunningNonEagerPrerendersExceeded: 'The old non-eager prerender (with a "moderate" or "conservative" eagerness and triggered by hovering or clicking links) was automatically canceled due to starting a new non-eager prerender. It can be retriggered by interacting with the link again.',
  /**
   * Description text for PrenderFinalStatus::kPrerenderingUrlHasEffectiveUrl.
   */
  prerenderFinalStatusPrerenderingUrlHasEffectiveUrl: "The prerendering navigation failed because it has an effective URL that is different from its normal URL. (For example, the New Tab Page, or hosted apps.)",
  /**
   * Description text for PrenderFinalStatus::kRedirectedPrerenderingUrlHasEffectiveUrl.
   */
  prerenderFinalStatusRedirectedPrerenderingUrlHasEffectiveUrl: "The prerendering navigation failed because it redirected to an effective URL that is different from its normal URL. (For example, the New Tab Page, or hosted apps.)",
  /**
   * Description text for PrenderFinalStatus::kActivationUrlHasEffectiveUrl.
   */
  prerenderFinalStatusActivationUrlHasEffectiveUrl: "The prerender was not used because during activation time, navigation has an effective URL that is different from its normal URL. (For example, the New Tab Page, or hosted apps.)",
  /**
   * Description text for PrenderFinalStatus::kJavaScriptInterfaceAdded.
   */
  prerenderFinalStatusJavaScriptInterfaceAdded: "The prerendered page was unloaded because a new JavaScript interface has been injected by WebView.addJavascriptInterface().",
  /**
   * Description text for PrenderFinalStatus::kJavaScriptInterfaceRemoved.
   */
  prerenderFinalStatusJavaScriptInterfaceRemoved: "The prerendered page was unloaded because a JavaScript interface has been removed by WebView.removeJavascriptInterface().",
  /**
   * Description text for PrenderFinalStatus::kAllPrerenderingCanceled.
   */
  prerenderFinalStatusAllPrerenderingCanceled: "All prerendered pages were unloaded by the browser for some reason (For example, WebViewCompat.addWebMessageListener() was called during prerendering.)",
  /**
   * Description text for PrenderFinalStatus::kWindowClosed.
   */
  prerenderFinalStatusWindowClosed: "The prerendered page was unloaded because it called window.close().",
  /**
   * Description text for PrenderFinalStatus::kBrowsingDataRemoved.
   */
  prerenderFinalStatusBrowsingDataRemoved: "The prerendered page was unloaded because browsing data was removed.",
  /**
   * @description Text in grid and details: Preloading attempt is not yet triggered.
   */
  statusNotTriggered: "Not triggered",
  /**
   * @description Text in grid and details: Preloading attempt is eligible but pending.
   */
  statusPending: "Pending",
  /**
   * @description Text in grid and details: Preloading is running.
   */
  statusRunning: "Running",
  /**
   * @description Text in grid and details: Preloading finished and the result is ready for the next navigation.
   */
  statusReady: "Ready",
  /**
   * @description Text in grid and details: Ready, then used.
   */
  statusSuccess: "Success",
  /**
   * @description Text in grid and details: Preloading failed.
   */
  statusFailure: "Failure"
};
var str_9 = i18n17.i18n.registerUIStrings("panels/application/preloading/components/PreloadingString.ts", UIStrings9);
var i18nLazyString = i18n17.i18n.getLazilyComputedLocalizedString.bind(void 0, str_9);
var i18nString9 = i18n17.i18n.getLocalizedString.bind(void 0, str_9);
var PrefetchReasonDescription = {
  PrefetchFailedIneligibleRedirect: { name: i18nLazyString(UIStrings9.PrefetchFailedIneligibleRedirect) },
  PrefetchFailedInvalidRedirect: { name: i18nLazyString(UIStrings9.PrefetchFailedInvalidRedirect) },
  PrefetchFailedMIMENotSupported: { name: i18nLazyString(UIStrings9.PrefetchFailedMIMENotSupported) },
  PrefetchFailedNetError: { name: i18nLazyString(UIStrings9.PrefetchFailedNetError) },
  PrefetchFailedNon2XX: { name: i18nLazyString(UIStrings9.PrefetchFailedNon2XX) },
  PrefetchIneligibleRetryAfter: { name: i18nLazyString(UIStrings9.PrefetchIneligibleRetryAfter) },
  PrefetchIsPrivacyDecoy: { name: i18nLazyString(UIStrings9.PrefetchIsPrivacyDecoy) },
  PrefetchIsStale: { name: i18nLazyString(UIStrings9.PrefetchIsStale) },
  PrefetchNotEligibleBrowserContextOffTheRecord: { name: i18nLazyString(UIStrings9.PrefetchNotEligibleBrowserContextOffTheRecord) },
  PrefetchNotEligibleDataSaverEnabled: { name: i18nLazyString(UIStrings9.PrefetchNotEligibleDataSaverEnabled) },
  PrefetchNotEligibleExistingProxy: { name: i18nLazyString(UIStrings9.PrefetchNotEligibleExistingProxy) },
  PrefetchNotEligibleHostIsNonUnique: { name: i18nLazyString(UIStrings9.PrefetchNotEligibleHostIsNonUnique) },
  PrefetchNotEligibleNonDefaultStoragePartition: { name: i18nLazyString(UIStrings9.PrefetchNotEligibleNonDefaultStoragePartition) },
  PrefetchNotEligibleSameSiteCrossOriginPrefetchRequiredProxy: { name: i18nLazyString(UIStrings9.PrefetchNotEligibleSameSiteCrossOriginPrefetchRequiredProxy) },
  PrefetchNotEligibleSchemeIsNotHttps: { name: i18nLazyString(UIStrings9.PrefetchNotEligibleSchemeIsNotHttps) },
  PrefetchNotEligibleUserHasCookies: { name: i18nLazyString(UIStrings9.PrefetchNotEligibleUserHasCookies) },
  PrefetchNotEligibleUserHasServiceWorker: { name: i18nLazyString(UIStrings9.PrefetchNotEligibleUserHasServiceWorker) },
  PrefetchNotUsedCookiesChanged: { name: i18nLazyString(UIStrings9.PrefetchNotUsedCookiesChanged) },
  PrefetchProxyNotAvailable: { name: i18nLazyString(UIStrings9.PrefetchProxyNotAvailable) },
  PrefetchNotUsedProbeFailed: { name: i18nLazyString(UIStrings9.PrefetchNotUsedProbeFailed) },
  PrefetchEvictedForNewerPrefetch: { name: i18nLazyString(UIStrings9.PrefetchEvictedForNewerPrefetch) },
  PrefetchEvictedAfterCandidateRemoved: { name: i18nLazyString(UIStrings9.PrefetchEvictedAfterCandidateRemoved) },
  PrefetchNotEligibleBatterySaverEnabled: { name: i18nLazyString(UIStrings9.PrefetchNotEligibleBatterySaverEnabled) },
  PrefetchNotEligiblePreloadingDisabled: { name: i18nLazyString(UIStrings9.PrefetchNotEligiblePreloadingDisabled) },
  PrefetchNotEligibleUserHasServiceWorkerNoFetchHandler: { name: () => i18n17.i18n.lockedString("Unknown") },
  PrefetchNotEligibleRedirectFromServiceWorker: { name: () => i18n17.i18n.lockedString("Unknown") },
  PrefetchNotEligibleRedirectToServiceWorker: { name: () => i18n17.i18n.lockedString("Unknown") },
  PrefetchEvictedAfterBrowsingDataRemoved: { name: i18nLazyString(UIStrings9.PrefetchEvictedAfterBrowsingDataRemoved) }
};
function ruleSetLocationShort(ruleSet, pageURL2) {
  const url = ruleSet.url === void 0 ? pageURL2 : ruleSet.url;
  return Bindings2.ResourceUtils.displayNameForURL(url);
}
function ruleSetTagOrLocationShort(ruleSet, pageURL2) {
  if (!ruleSet.errorMessage) {
    const parsedRuleset = JSON.parse(ruleSet["sourceText"]);
    if ("tag" in parsedRuleset) {
      return '"' + parsedRuleset["tag"] + '"';
    }
  }
  return ruleSetLocationShort(ruleSet, pageURL2);
}

// gen/front_end/panels/application/preloading/preloadingView.css.js
var preloadingView_css_default = `/*
 * Copyright 2022 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.empty-state {
  display: none;
}

.empty {
  .empty-state {
    display: flex;
  }

  devtools-split-view, .pretty-print-button, devtools-toolbar {
    display: none;
  }
}

.preloading-toolbar {
  background-color: var(--sys-color-cdt-base-container);
  border-bottom: 1px solid var(--sys-color-divider);

  button.toolbar-has-dropdown {
    margin: var(--sys-size-2) 0;
  }
}

/*# sourceURL=${import.meta.resolve("./preloading/preloadingView.css")} */`;

// gen/front_end/panels/application/preloading/preloadingViewDropDown.css.js
var preloadingViewDropDown_css_default = `/*
 * Copyright 2024 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  padding: 2px 1px 2px 2px;
}

.title {
  padding-left: 8px;
}

.subtitle {
  padding-left: 8px;
}

/*# sourceURL=${import.meta.resolve("./preloading/preloadingViewDropDown.css")} */`;

// gen/front_end/panels/application/preloading/PreloadingView.js
var UIStrings10 = {
  /**
   * @description DropDown title for filtering preloading attempts by rule set
   */
  filterFilterByRuleSet: "Filter by rule set",
  /**
   * @description DropDown text for filtering preloading attempts by rule set: No filter
   */
  filterAllPreloads: "All speculative loads",
  /**
   * @description Dropdown subtitle for filtering preloading attempts by rule set
   *             when there are no rule sets in the page.
   */
  noRuleSets: "no rule sets",
  /**
   * @description Text in grid: Rule set is valid
   */
  validityValid: "Valid",
  /**
   * @description Text in grid: Rule set must be a valid JSON object
   */
  validityInvalid: "Invalid",
  /**
   * @description Text in grid: Rule set contains invalid rules and they are ignored
   */
  validitySomeRulesInvalid: "Some rules invalid",
  /**
   * @description Text in grid and details: Preloading attempt is not yet triggered.
   */
  statusNotTriggered: "Not triggered",
  /**
   * @description Text in grid and details: Preloading attempt is eligible but pending.
   */
  statusPending: "Pending",
  /**
   * @description Text in grid and details: Preloading is running.
   */
  statusRunning: "Running",
  /**
   * @description Text in grid and details: Preloading finished and the result is ready for the next navigation.
   */
  statusReady: "Ready",
  /**
   * @description Text in grid and details: Ready, then used.
   */
  statusSuccess: "Success",
  /**
   * @description Text in grid and details: Preloading failed.
   */
  statusFailure: "Failure",
  /**
   * @description Text to pretty print a file
   */
  prettyPrint: "Pretty print",
  /**
   * @description Placeholder text if there are no rules to show. https://developer.chrome.com/docs/devtools/application/debugging-speculation-rules
   */
  noRulesDetected: "No rules detected",
  /**
   * @description Placeholder text if there are no rules to show. https://developer.chrome.com/docs/devtools/application/debugging-speculation-rules
   */
  rulesDescription: "On this page you will see the speculation rules used to prefetch and prerender page navigations.",
  /**
   * @description Placeholder text if there are no speculation attempts for prefetching or prerendering urls. https://developer.chrome.com/docs/devtools/application/debugging-speculation-rules
   */
  noPrefetchAttempts: "No speculation detected",
  /**
   * @description Placeholder text if there are no speculation attempts for prefetching or prerendering urls. https://developer.chrome.com/docs/devtools/application/debugging-speculation-rules
   */
  prefetchDescription: "On this page you will see details on speculative loads.",
  /**
   * @description Text for a learn more link
   */
  learnMore: "Learn more"
};
var str_10 = i18n19.i18n.registerUIStrings("panels/application/preloading/PreloadingView.ts", UIStrings10);
var i18nString10 = i18n19.i18n.getLocalizedString.bind(void 0, str_10);
var SPECULATION_EXPLANATION_URL = "https://developer.chrome.com/docs/devtools/application/debugging-speculation-rules";
var AllRuleSetRootId = Symbol("AllRuleSetRootId");
var PreloadingUIUtils = class {
  static status(status) {
    switch (status) {
      case "NotTriggered":
        return i18nString10(UIStrings10.statusNotTriggered);
      case "Pending":
        return i18nString10(UIStrings10.statusPending);
      case "Running":
        return i18nString10(UIStrings10.statusRunning);
      case "Ready":
        return i18nString10(UIStrings10.statusReady);
      case "Success":
        return i18nString10(UIStrings10.statusSuccess);
      case "Failure":
        return i18nString10(UIStrings10.statusFailure);
      // NotSupported is used to handle unreachable case. For example,
      // there is no code path for
      // PreloadingTriggeringOutcome::kTriggeredButPending in prefetch,
      // which is mapped to NotSupported. So, we regard it as an
      // internal error.
      case "NotSupported":
        return i18n19.i18n.lockedString("Internal error");
    }
  }
  static preloadsStatusSummary(countsByStatus) {
    const LIST = [
      "NotTriggered",
      "Pending",
      "Running",
      "Ready",
      "Success",
      "Failure"
    ];
    return LIST.filter((status) => (countsByStatus?.get(status) || 0) > 0).map((status) => (countsByStatus?.get(status) || 0) + " " + this.status(status)).join(", ").toLocaleLowerCase();
  }
  // Summary of error of rule set shown in grid.
  static validity({ errorType }) {
    switch (errorType) {
      case void 0:
        return i18nString10(UIStrings10.validityValid);
      case "SourceIsNotJsonObject":
      case "InvalidRulesetLevelTag":
        return i18nString10(UIStrings10.validityInvalid);
      case "InvalidRulesSkipped":
        return i18nString10(UIStrings10.validitySomeRulesInvalid);
    }
  }
  // Where a rule set came from, shown in grid.
  static location(ruleSet) {
    if (ruleSet.backendNodeId !== void 0) {
      return i18n19.i18n.lockedString("<script>");
    }
    if (ruleSet.url !== void 0) {
      return ruleSet.url;
    }
    throw new Error("unreachable");
  }
  static processLocalId(id) {
    const index = id.indexOf(".");
    return index === -1 ? id : id.slice(index + 1);
  }
};
function pageURL() {
  return SDK12.TargetManager.TargetManager.instance().scopeTarget()?.inspectedURL() || "";
}
var PreloadingRuleSetView = class extends UI9.Widget.VBox {
  model;
  focusedRuleSetId = null;
  warningsContainer;
  warningsView = new PreloadingWarningsView();
  hsplit;
  ruleSetGrid = new PreloadingComponents.RuleSetGrid.RuleSetGrid();
  ruleSetDetails = new PreloadingComponents.RuleSetDetailsView.RuleSetDetailsView();
  shouldPrettyPrint = Common7.Settings.Settings.instance().moduleSetting("auto-pretty-print-minified").get();
  constructor(model) {
    super({ useShadowDom: true });
    this.registerRequiredCSS(emptyWidget_css_default, preloadingView_css_default);
    this.model = model;
    SDK12.TargetManager.TargetManager.instance().addScopeChangeListener(this.onScopeChange.bind(this));
    SDK12.TargetManager.TargetManager.instance().addModelListener(SDK12.PreloadingModel.PreloadingModel, "ModelUpdated", this.render, this, { scoped: true });
    SDK12.TargetManager.TargetManager.instance().addModelListener(SDK12.PreloadingModel.PreloadingModel, "WarningsUpdated", this.warningsView.onWarningsUpdated, this.warningsView, { scoped: true });
    this.warningsContainer = document.createElement("div");
    this.warningsContainer.classList.add("flex-none");
    this.contentElement.insertBefore(this.warningsContainer, this.contentElement.firstChild);
    this.warningsView.show(this.warningsContainer);
    this.ruleSetGrid.addEventListener("select", this.onRuleSetsGridCellFocused.bind(this));
    const onPrettyPrintToggle = () => {
      this.shouldPrettyPrint = !this.shouldPrettyPrint;
      this.updateRuleSetDetails();
    };
    render(html2`
        <div class="empty-state">
          <span class="empty-state-header">${i18nString10(UIStrings10.noRulesDetected)}</span>
          <div class="empty-state-description">
            <span>${i18nString10(UIStrings10.rulesDescription)}</span>
            ${UI9.XLink.XLink.create(SPECULATION_EXPLANATION_URL, i18nString10(UIStrings10.learnMore), "x-link", void 0, "learn-more")}
          </div>
        </div>
        <devtools-split-view sidebar-position="second">
          <div slot="main">
            ${this.ruleSetGrid}
          </div>
          <div slot="sidebar" jslog=${VisualLogging5.section("rule-set-details")}>
            ${this.ruleSetDetails}
          </div>
        </devtools-split-view>
        <div class="pretty-print-button" style="border-top: 1px solid var(--sys-color-divider)">
        <devtools-button
          .iconName=${"brackets"}
          .toggledIconName=${"brackets"}
          .toggled=${this.shouldPrettyPrint}
          .toggleType=${"primary-toggle"}
          .title=${i18nString10(UIStrings10.prettyPrint)}
          .variant=${"icon_toggle"}
          .size=${"REGULAR"}
          @click=${onPrettyPrintToggle}
          jslog=${VisualLogging5.action().track({ click: true }).context("preloading-status-panel-pretty-print")}></devtools-button>
        </div>`, this.contentElement, { host: this });
    this.hsplit = this.contentElement.querySelector("devtools-split-view");
  }
  wasShown() {
    super.wasShown();
    this.warningsView.wasShown();
    this.render();
  }
  onScopeChange() {
    const model = SDK12.TargetManager.TargetManager.instance().scopeTarget()?.model(SDK12.PreloadingModel.PreloadingModel);
    assertNotNullOrUndefined2(model);
    this.model = model;
    this.render();
  }
  revealRuleSet(revealInfo) {
    this.focusedRuleSetId = revealInfo.ruleSetId;
    this.render();
  }
  updateRuleSetDetails() {
    const id = this.focusedRuleSetId;
    const ruleSet = id === null ? null : this.model.getRuleSetById(id);
    this.ruleSetDetails.shouldPrettyPrint = this.shouldPrettyPrint;
    this.ruleSetDetails.data = ruleSet;
    if (ruleSet === null) {
      this.hsplit.setAttribute("sidebar-visibility", "hidden");
    } else {
      this.hsplit.removeAttribute("sidebar-visibility");
    }
  }
  render() {
    const countsByRuleSetId = this.model.getPreloadCountsByRuleSetId();
    const ruleSetRows = this.model.getAllRuleSets().map(({ id, value }) => {
      const countsByStatus = countsByRuleSetId.get(id) || /* @__PURE__ */ new Map();
      return {
        ruleSet: value,
        preloadsStatusSummary: PreloadingUIUtils.preloadsStatusSummary(countsByStatus)
      };
    });
    this.ruleSetGrid.update({ rows: ruleSetRows, pageURL: pageURL() });
    this.contentElement.classList.toggle("empty", ruleSetRows.length === 0);
    this.updateRuleSetDetails();
  }
  onRuleSetsGridCellFocused(event) {
    const focusedEvent = event;
    this.focusedRuleSetId = focusedEvent.detail;
    this.render();
  }
  getInfobarContainerForTest() {
    return this.warningsView.contentElement;
  }
  getRuleSetGridForTest() {
    return this.ruleSetGrid;
  }
  getRuleSetDetailsForTest() {
    return this.ruleSetDetails;
  }
};
var PreloadingAttemptView = class extends UI9.Widget.VBox {
  model;
  // Note that we use id of (representative) preloading attempt while we show pipelines in grid.
  // This is because `NOT_TRIGGERED` preloading attempts don't have pipeline id and we can use it.
  focusedPreloadingAttemptId = null;
  warningsContainer;
  warningsView = new PreloadingWarningsView();
  preloadingGrid = new PreloadingComponents.PreloadingGrid.PreloadingGrid();
  preloadingDetails = new PreloadingComponents.PreloadingDetailsReportView.PreloadingDetailsReportView();
  ruleSetSelector;
  constructor(model) {
    super({
      jslog: `${VisualLogging5.pane("preloading-speculations")}`,
      useShadowDom: true
    });
    this.registerRequiredCSS(emptyWidget_css_default, preloadingView_css_default);
    this.model = model;
    SDK12.TargetManager.TargetManager.instance().addScopeChangeListener(this.onScopeChange.bind(this));
    SDK12.TargetManager.TargetManager.instance().addModelListener(SDK12.PreloadingModel.PreloadingModel, "ModelUpdated", this.render, this, { scoped: true });
    SDK12.TargetManager.TargetManager.instance().addModelListener(SDK12.PreloadingModel.PreloadingModel, "WarningsUpdated", this.warningsView.onWarningsUpdated, this.warningsView, { scoped: true });
    this.warningsContainer = document.createElement("div");
    this.warningsContainer.classList.add("flex-none");
    this.contentElement.insertBefore(this.warningsContainer, this.contentElement.firstChild);
    this.warningsView.show(this.warningsContainer);
    const vbox = new UI9.Widget.VBox();
    const toolbar6 = vbox.contentElement.createChild("devtools-toolbar", "preloading-toolbar");
    toolbar6.setAttribute("jslog", `${VisualLogging5.toolbar()}`);
    this.ruleSetSelector = new PreloadingRuleSetSelector(() => this.render());
    toolbar6.appendToolbarItem(this.ruleSetSelector.item());
    this.preloadingGrid.addEventListener("select", this.onPreloadingGridCellFocused.bind(this));
    render(html2`
        <div class="empty-state">
          <span class="empty-state-header">${i18nString10(UIStrings10.noPrefetchAttempts)}</span>
          <div class="empty-state-description">
            <span>${i18nString10(UIStrings10.prefetchDescription)}</span>
            ${UI9.XLink.XLink.create(SPECULATION_EXPLANATION_URL, i18nString10(UIStrings10.learnMore), "x-link", void 0, "learn-more")}
          </div>
        </div>
        <devtools-split-view sidebar-position="second">
          <div slot="main" class="overflow-auto" style="height: 100%">
            ${this.preloadingGrid}
          </div>
          <div slot="sidebar" class="overflow-auto" style="height: 100%">
            ${this.preloadingDetails}
          </div>
        </devtools-split-view>`, vbox.contentElement, { host: this });
    vbox.show(this.contentElement);
  }
  wasShown() {
    super.wasShown();
    this.warningsView.wasShown();
    this.render();
  }
  onScopeChange() {
    const model = SDK12.TargetManager.TargetManager.instance().scopeTarget()?.model(SDK12.PreloadingModel.PreloadingModel);
    assertNotNullOrUndefined2(model);
    this.model = model;
    this.render();
  }
  setFilter(filter) {
    let id = filter.ruleSetId;
    if (id !== null && this.model.getRuleSetById(id) === void 0) {
      id = null;
    }
    this.ruleSetSelector.select(id);
  }
  updatePreloadingDetails() {
    const id = this.focusedPreloadingAttemptId;
    const preloadingAttempt = id === null ? null : this.model.getPreloadingAttemptById(id);
    if (preloadingAttempt === null) {
      this.preloadingDetails.data = null;
    } else {
      const pipeline = this.model.getPipeline(preloadingAttempt);
      const ruleSets = preloadingAttempt.ruleSetIds.map((id2) => this.model.getRuleSetById(id2)).filter((x) => x !== null);
      this.preloadingDetails.data = {
        pipeline,
        ruleSets,
        pageURL: pageURL()
      };
    }
  }
  render() {
    const filteringRuleSetId = this.ruleSetSelector.getSelected();
    const rows = this.model.getRepresentativePreloadingAttempts(filteringRuleSetId).map(({ id, value }) => {
      const attempt = value;
      const pipeline = this.model.getPipeline(attempt);
      const ruleSets = attempt.ruleSetIds.flatMap((id2) => {
        const ruleSet = this.model.getRuleSetById(id2);
        return ruleSet === null ? [] : [ruleSet];
      });
      return {
        id,
        pipeline,
        ruleSets
      };
    });
    this.preloadingGrid.update({ rows, pageURL: pageURL() });
    this.contentElement.classList.toggle("empty", rows.length === 0);
    this.updatePreloadingDetails();
  }
  onPreloadingGridCellFocused(event) {
    const focusedEvent = event;
    this.focusedPreloadingAttemptId = focusedEvent.detail;
    this.render();
  }
  getRuleSetSelectorToolbarItemForTest() {
    return this.ruleSetSelector.item();
  }
  getPreloadingGridForTest() {
    return this.preloadingGrid;
  }
  getPreloadingDetailsForTest() {
    return this.preloadingDetails;
  }
  selectRuleSetOnFilterForTest(id) {
    this.ruleSetSelector.select(id);
  }
};
var PreloadingSummaryView = class extends UI9.Widget.VBox {
  model;
  warningsContainer;
  warningsView = new PreloadingWarningsView();
  usedPreloading = new PreloadingComponents.UsedPreloadingView.UsedPreloadingView();
  constructor(model) {
    super({
      jslog: `${VisualLogging5.pane("speculative-loads")}`,
      useShadowDom: true
    });
    this.registerRequiredCSS(emptyWidget_css_default, preloadingView_css_default);
    this.model = model;
    SDK12.TargetManager.TargetManager.instance().addScopeChangeListener(this.onScopeChange.bind(this));
    SDK12.TargetManager.TargetManager.instance().addModelListener(SDK12.PreloadingModel.PreloadingModel, "ModelUpdated", this.render, this, { scoped: true });
    SDK12.TargetManager.TargetManager.instance().addModelListener(SDK12.PreloadingModel.PreloadingModel, "WarningsUpdated", this.warningsView.onWarningsUpdated, this.warningsView, { scoped: true });
    this.warningsContainer = document.createElement("div");
    this.warningsContainer.classList.add("flex-none");
    this.contentElement.insertBefore(this.warningsContainer, this.contentElement.firstChild);
    this.warningsView.show(this.warningsContainer);
    const usedPreloadingContainer = new UI9.Widget.VBox();
    usedPreloadingContainer.contentElement.appendChild(this.usedPreloading);
    usedPreloadingContainer.show(this.contentElement);
  }
  wasShown() {
    super.wasShown();
    this.warningsView.wasShown();
    this.render();
  }
  onScopeChange() {
    const model = SDK12.TargetManager.TargetManager.instance().scopeTarget()?.model(SDK12.PreloadingModel.PreloadingModel);
    assertNotNullOrUndefined2(model);
    this.model = model;
    this.render();
  }
  render() {
    this.usedPreloading.data = {
      pageURL: SDK12.TargetManager.TargetManager.instance().scopeTarget()?.inspectedURL() || "",
      previousAttempts: this.model.getRepresentativePreloadingAttemptsOfPreviousPage().map(({ value }) => value),
      currentAttempts: this.model.getRepresentativePreloadingAttempts(null).map(({ value }) => value)
    };
  }
  getUsedPreloadingForTest() {
    return this.usedPreloading;
  }
};
var PreloadingRuleSetSelector = class {
  model;
  onSelectionChanged = () => {
  };
  toolbarItem;
  listModel;
  dropDown;
  constructor(onSelectionChanged) {
    const model = SDK12.TargetManager.TargetManager.instance().scopeTarget()?.model(SDK12.PreloadingModel.PreloadingModel);
    assertNotNullOrUndefined2(model);
    this.model = model;
    SDK12.TargetManager.TargetManager.instance().addScopeChangeListener(this.onScopeChange.bind(this));
    SDK12.TargetManager.TargetManager.instance().addModelListener(SDK12.PreloadingModel.PreloadingModel, "ModelUpdated", this.onModelUpdated, this, { scoped: true });
    this.listModel = new UI9.ListModel.ListModel();
    this.dropDown = new UI9.SoftDropDown.SoftDropDown(this.listModel, this);
    this.dropDown.setRowHeight(36);
    this.dropDown.setPlaceholderText(i18nString10(UIStrings10.filterAllPreloads));
    this.toolbarItem = new UI9.Toolbar.ToolbarItem(this.dropDown.element);
    this.toolbarItem.setTitle(i18nString10(UIStrings10.filterFilterByRuleSet));
    this.toolbarItem.element.classList.add("toolbar-has-dropdown");
    this.toolbarItem.element.setAttribute("jslog", `${VisualLogging5.action("filter-by-rule-set").track({ click: true })}`);
    this.onModelUpdated();
    this.onSelectionChanged = onSelectionChanged;
  }
  onScopeChange() {
    const model = SDK12.TargetManager.TargetManager.instance().scopeTarget()?.model(SDK12.PreloadingModel.PreloadingModel);
    assertNotNullOrUndefined2(model);
    this.model = model;
    this.onModelUpdated();
  }
  onModelUpdated() {
    const ids = this.model.getAllRuleSets().map(({ id }) => id);
    const items = [AllRuleSetRootId, ...ids];
    const selected = this.dropDown.getSelectedItem();
    const newSelected = selected === null || !items.includes(selected) ? AllRuleSetRootId : selected;
    this.listModel.replaceAll(items);
    this.dropDown.selectItem(newSelected);
    this.updateWidth(items);
  }
  // Updates the width for the DropDown element.
  updateWidth(items) {
    const DEFAULT_WIDTH = 315;
    const urlLengths = items.map((x) => this.titleFor(x).length);
    const maxLength = Math.max(...urlLengths);
    const width = Math.min(maxLength * 6 + 16, DEFAULT_WIDTH);
    this.dropDown.setWidth(width);
  }
  // AllRuleSetRootId is used within the selector to indicate the root item. When interacting with PreloadingModel,
  // it should be translated to null.
  translateItemIdToRuleSetId(id) {
    if (id === AllRuleSetRootId) {
      return null;
    }
    return id;
  }
  getSelected() {
    const selectItem = this.dropDown.getSelectedItem();
    if (selectItem === null) {
      return null;
    }
    return this.translateItemIdToRuleSetId(selectItem);
  }
  select(id) {
    this.dropDown.selectItem(id);
  }
  // Method for UI.Toolbar.Provider
  item() {
    return this.toolbarItem;
  }
  // Method for UI.SoftDropDown.Delegate<Protocol.Preload.RuleSetId|typeof AllRuleSetRootId>
  titleFor(id) {
    const convertedId = this.translateItemIdToRuleSetId(id);
    if (convertedId === null) {
      return i18nString10(UIStrings10.filterAllPreloads);
    }
    const ruleSet = this.model.getRuleSetById(convertedId);
    if (ruleSet === null) {
      return i18n19.i18n.lockedString("Internal error");
    }
    return ruleSetTagOrLocationShort(ruleSet, pageURL());
  }
  subtitleFor(id) {
    const convertedId = this.translateItemIdToRuleSetId(id);
    const countsByStatus = this.model.getPreloadCountsByRuleSetId().get(convertedId) || /* @__PURE__ */ new Map();
    return PreloadingUIUtils.preloadsStatusSummary(countsByStatus) || `(${i18nString10(UIStrings10.noRuleSets)})`;
  }
  // Method for UI.SoftDropDown.Delegate<Protocol.Preload.RuleSetId|typeof AllRuleSetRootId>
  createElementForItem(id) {
    const element = document.createElement("div");
    const shadowRoot = UI9.UIUtils.createShadowRootWithCoreStyles(element, { cssFile: preloadingViewDropDown_css_default });
    const title = shadowRoot.createChild("div", "title");
    UI9.UIUtils.createTextChild(title, Platform2.StringUtilities.trimEndWithMaxLength(this.titleFor(id), 100));
    const subTitle = shadowRoot.createChild("div", "subtitle");
    UI9.UIUtils.createTextChild(subTitle, this.subtitleFor(id));
    return element;
  }
  // Method for UI.SoftDropDown.Delegate<Protocol.Preload.RuleSetId|typeof AllRuleSetRootId>
  isItemSelectable(_id) {
    return true;
  }
  // Method for UI.SoftDropDown.Delegate<Protocol.Preload.RuleSetId|typeof AllRuleSetRootId>
  itemSelected(_id) {
    this.onSelectionChanged();
  }
  // Method for UI.SoftDropDown.Delegate<Protocol.Preload.RuleSetId|typeof AllRuleSetRootId>
  highlightedItemChanged(_from, _to, _fromElement, _toElement) {
  }
};
var PreloadingWarningsView = class extends UI9.Widget.VBox {
  infobar = new PreloadingComponents.PreloadingDisabledInfobar.PreloadingDisabledInfobar();
  constructor() {
    super();
    this.registerRequiredCSS(emptyWidget_css_default);
  }
  wasShown() {
    super.wasShown();
    this.contentElement.append(this.infobar);
  }
  onWarningsUpdated(args) {
    this.infobar.data = args.data;
  }
};

// gen/front_end/panels/application/PreloadingTreeElement.js
var UIStrings11 = {
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  speculativeLoads: "Speculative loads",
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  rules: "Rules",
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  speculations: "Speculations"
};
var str_11 = i18n21.i18n.registerUIStrings("panels/application/PreloadingTreeElement.ts", UIStrings11);
var i18nString11 = i18n21.i18n.getLocalizedString.bind(void 0, str_11);
var PreloadingTreeElementBase = class extends ApplicationPanelTreeElement {
  #model;
  #viewConstructor;
  view;
  #path;
  #selectedInternal;
  constructor(panel, viewConstructor, path, title) {
    super(panel, title, false, "speculative-loads");
    this.#viewConstructor = viewConstructor;
    this.#path = path;
    const icon = IconButton6.Icon.create("speculative-loads");
    this.setLeadingIcons([icon]);
    this.#selectedInternal = false;
  }
  get itemURL() {
    return this.#path;
  }
  initialize(model) {
    this.#model = model;
    if (this.#selectedInternal && !this.view) {
      this.onselect(false);
    }
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    this.#selectedInternal = true;
    if (!this.#model) {
      return false;
    }
    if (!this.view) {
      this.view = new this.#viewConstructor(this.#model);
    }
    this.showView(this.view);
    return false;
  }
};
var PreloadingSummaryTreeElement = class extends ExpandableApplicationPanelTreeElement {
  #model;
  #view;
  #selectedInternal;
  #ruleSet = null;
  #attempt = null;
  constructor(panel) {
    super(panel, i18nString11(UIStrings11.speculativeLoads), "", "", "preloading");
    const icon = IconButton6.Icon.create("speculative-loads");
    this.setLeadingIcons([icon]);
    this.#selectedInternal = false;
  }
  // Note that
  //
  // - TreeElement.ensureSelection assumes TreeElement.treeOutline initialized.
  // - TreeElement.treeOutline is propagated in TreeElement.appendChild.
  //
  // So, `this.constructChildren` should be called just after `parent.appendChild(this)`
  // to enrich children with TreeElement.selectionElementInternal correctly.
  constructChildren(panel) {
    this.#ruleSet = new PreloadingRuleSetTreeElement(panel);
    this.#attempt = new PreloadingAttemptTreeElement(panel);
    this.appendChild(this.#ruleSet);
    this.appendChild(this.#attempt);
  }
  initialize(model) {
    if (this.#ruleSet === null || this.#attempt === null) {
      throw new Error("unreachable");
    }
    this.#model = model;
    this.#ruleSet.initialize(model);
    this.#attempt.initialize(model);
    if (this.#selectedInternal && !this.#view) {
      this.onselect(false);
    }
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    this.#selectedInternal = true;
    if (!this.#model) {
      return false;
    }
    if (!this.#view) {
      this.#view = new PreloadingSummaryView(this.#model);
    }
    this.showView(this.#view);
    return false;
  }
  expandAndRevealRuleSet(revealInfo) {
    if (this.#ruleSet === null) {
      throw new Error("unreachable");
    }
    this.expand();
    this.#ruleSet.revealRuleSet(revealInfo);
  }
  expandAndRevealAttempts(filter) {
    if (this.#attempt === null) {
      throw new Error("unreachable");
    }
    this.expand();
    this.#attempt.revealAttempts(filter);
  }
};
var PreloadingRuleSetTreeElement = class extends PreloadingTreeElementBase {
  constructor(panel) {
    super(panel, PreloadingRuleSetView, "preloading://rule-set", i18nString11(UIStrings11.rules));
  }
  revealRuleSet(revealInfo) {
    this.select();
    if (this.view === void 0) {
      return;
    }
    this.view?.revealRuleSet(revealInfo);
  }
};
var PreloadingAttemptTreeElement = class extends PreloadingTreeElementBase {
  constructor(panel) {
    super(panel, PreloadingAttemptView, "preloading://attempt", i18nString11(UIStrings11.speculations));
  }
  revealAttempts(filter) {
    this.select();
    this.view?.setFilter(filter);
  }
};

// gen/front_end/panels/application/ReportingApiTreeElement.js
import * as Host5 from "./../../core/host/host.js";
import * as i18n25 from "./../../core/i18n/i18n.js";
import * as IconButton7 from "./../../ui/components/icon_button/icon_button.js";
import * as ApplicationComponents7 from "./components/components.js";

// gen/front_end/panels/application/ReportingApiView.js
var ReportingApiView_exports = {};
__export(ReportingApiView_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW,
  ReportingApiView: () => ReportingApiView,
  i18nString: () => i18nString12
});
import * as i18n23 from "./../../core/i18n/i18n.js";
import * as SDK13 from "./../../core/sdk/sdk.js";
import * as SourceFrame2 from "./../../ui/legacy/components/source_frame/source_frame.js";
import * as UI10 from "./../../ui/legacy/legacy.js";
import { html as html3, render as render2 } from "./../../ui/lit/lit.js";
import * as VisualLogging6 from "./../../ui/visual_logging/visual_logging.js";
import * as ApplicationComponents6 from "./components/components.js";
var { widgetConfig } = UI10.Widget;
var UIStrings12 = {
  /**
   * @description Placeholder text that shows if no report or endpoint was detected.
   *             A report contains information on issues or events that were encountered by a web browser.
   *             An endpoint is a URL where the report is sent to.
   *             (https://developer.chrome.com/docs/capabilities/web-apis/reporting-api)
   */
  noReportOrEndpoint: "No report or endpoint",
  /**
   * @description Placeholder text that shows if no report or endpoint was detected.
   *             A report contains information on issues or events that were encountered by a web browser.
   *             An endpoint is a URL where the report is sent to.
   *             (https://developer.chrome.com/docs/capabilities/web-apis/reporting-api)
   */
  reportingApiDescription: "On this page you will be able to inspect `Reporting API` reports and endpoints.",
  /**
   * @description Placeholder text that shows if no report was selected for viewing
   *report body (https://developers.google.com/web/updates/2018/09/reportingapi#sending).
   */
  noReportSelected: "No report selected",
  /**
   * @description Placeholder text instructing the user how to display a Reporting API
   *report body (https://developers.google.com/web/updates/2018/09/reportingapi#sending).
   */
  clickToDisplayBody: "Click on any report to display its body"
};
var str_12 = i18n23.i18n.registerUIStrings("panels/application/ReportingApiView.ts", UIStrings12);
var i18nString12 = i18n23.i18n.getLocalizedString.bind(void 0, str_12);
var REPORTING_API_EXPLANATION_URL = "https://developer.chrome.com/docs/capabilities/web-apis/reporting-api";
var DEFAULT_VIEW = (input, _output, target) => {
  if (input.hasReports || input.hasEndpoints) {
    render2(html3`
      <devtools-split-view sidebar-position="second" sidebar-initial-size="150" jslog=${VisualLogging6.pane("reporting-api")}>
        ${input.hasReports ? html3`
          <devtools-split-view slot="main" sidebar-position="second" sidebar-initial-size="150">
            <div slot="main">
              ${input.reportsGrid}
            </div>
            <div slot="sidebar" class="vbox" jslog=${VisualLogging6.pane("preview").track({ resize: true })}>
              ${input.focusedReport ? html3`
                <devtools-widget .widgetConfig=${widgetConfig((element) => SourceFrame2.JSONView.JSONView.createViewSync(input.focusedReport?.body || "", element))}></devtools-widget>
              ` : html3`
                <devtools-widget .widgetConfig=${widgetConfig(UI10.EmptyWidget.EmptyWidget, {
      header: i18nString12(UIStrings12.noReportSelected),
      text: i18nString12(UIStrings12.clickToDisplayBody)
    })}></devtools-widget>
              `}
            </div>
          </devtools-split-view>
        ` : html3`
          <div slot="main">
            ${input.reportsGrid}
          </div>
        `}
        <div slot="sidebar">
          ${input.endpointsGrid}
        </div>
      </devtools-split-view>
    `, target);
  } else {
    render2(html3`
      <devtools-widget .widgetConfig=${widgetConfig(UI10.EmptyWidget.EmptyWidget, {
      header: i18nString12(UIStrings12.noReportOrEndpoint),
      text: i18nString12(UIStrings12.reportingApiDescription),
      link: REPORTING_API_EXPLANATION_URL
    })} jslog=${VisualLogging6.pane("reporting-api-empty")}></devtools-widget>
    `, target);
  }
};
var ReportingApiView = class extends UI10.Widget.VBox {
  #endpointsGrid;
  #endpoints;
  #view;
  #networkManager;
  #reportsGrid = new ApplicationComponents6.ReportsGrid.ReportsGrid();
  #reports = [];
  #focusedReport;
  constructor(endpointsGrid, view = DEFAULT_VIEW) {
    super();
    this.#view = view;
    this.#endpointsGrid = endpointsGrid;
    this.#endpoints = /* @__PURE__ */ new Map();
    this.#reportsGrid.addEventListener("select", this.#onFocus.bind(this));
    SDK13.TargetManager.TargetManager.instance().observeModels(SDK13.NetworkManager.NetworkManager, this);
    this.requestUpdate();
  }
  modelAdded(networkManager) {
    if (networkManager.target() !== SDK13.TargetManager.TargetManager.instance().primaryPageTarget()) {
      return;
    }
    this.#networkManager = networkManager;
    this.#networkManager.addEventListener(SDK13.NetworkManager.Events.ReportingApiEndpointsChangedForOrigin, this.#onEndpointsChangedForOrigin, this);
    this.#networkManager.addEventListener(SDK13.NetworkManager.Events.ReportingApiReportAdded, this.#onReportAdded, this);
    this.#networkManager.addEventListener(SDK13.NetworkManager.Events.ReportingApiReportUpdated, this.#onReportUpdated, this);
    void this.#networkManager.enableReportingApi();
    this.requestUpdate();
  }
  modelRemoved(networkManager) {
    if (!this.#networkManager || this.#networkManager !== networkManager) {
      return;
    }
    this.#networkManager.removeEventListener(SDK13.NetworkManager.Events.ReportingApiEndpointsChangedForOrigin, this.#onEndpointsChangedForOrigin, this);
    this.#networkManager.removeEventListener(SDK13.NetworkManager.Events.ReportingApiReportAdded, this.#onReportAdded, this);
    this.#networkManager.removeEventListener(SDK13.NetworkManager.Events.ReportingApiReportUpdated, this.#onReportUpdated, this);
    this.#networkManager = void 0;
  }
  performUpdate() {
    const viewInput = {
      hasReports: this.#reports.length > 0,
      hasEndpoints: this.#endpoints.size > 0,
      endpointsGrid: this.#endpointsGrid,
      reportsGrid: this.#reportsGrid,
      focusedReport: this.#focusedReport
    };
    this.#view(viewInput, {}, this.element);
  }
  #onEndpointsChangedForOrigin({ data }) {
    this.#endpoints.set(data.origin, data.endpoints);
    this.#endpointsGrid.data = { endpoints: this.#endpoints };
    this.requestUpdate();
  }
  #onReportAdded({ data: report }) {
    this.#reports.push(report);
    this.#reportsGrid.data = { reports: this.#reports };
    this.requestUpdate();
  }
  #onReportUpdated({ data: report }) {
    const index = this.#reports.findIndex((oldReport) => oldReport.id === report.id);
    this.#reports[index] = report;
    this.#reportsGrid.data = { reports: this.#reports };
    this.requestUpdate();
  }
  async #onFocus(event) {
    const selectEvent = event;
    const report = this.#reports.find((report2) => report2.id === selectEvent.detail);
    if (report) {
      this.#focusedReport = report;
      this.requestUpdate();
    }
  }
};

// gen/front_end/panels/application/ReportingApiTreeElement.js
var UIStrings13 = {
  /**
   * @description Label for an item in the Application Panel Sidebar of the Application panel
   */
  reportingApi: "Reporting API"
};
var str_13 = i18n25.i18n.registerUIStrings("panels/application/ReportingApiTreeElement.ts", UIStrings13);
var i18nString13 = i18n25.i18n.getLocalizedString.bind(void 0, str_13);
var ReportingApiTreeElement = class extends ApplicationPanelTreeElement {
  view;
  constructor(storagePanel) {
    super(storagePanel, i18nString13(UIStrings13.reportingApi), false, "reporting-api");
    const icon = IconButton7.Icon.create("document");
    this.setLeadingIcons([icon]);
  }
  get itemURL() {
    return "reportingApi://";
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    if (!this.view) {
      this.view = new ReportingApiView(new ApplicationComponents7.EndpointsGrid.EndpointsGrid());
    }
    this.showView(this.view);
    Host5.userMetrics.panelShown("reporting-api");
    return false;
  }
};

// gen/front_end/panels/application/resourcesSidebar.css.js
var resourcesSidebar_css_default = `/*
 * Copyright 2016 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.tree-outline {
  li.storage-group-list-item,
  li.storage-group-list-item:not(:has(devtools-checkbox)) {
    padding: 0 var(--sys-size-8) 0 var(--sys-size-3);

    &::before {
      display: none;
    }

    &:hover .selection,
    &:active .selection::before {
      background-color: transparent;
    }

    & + ol {
      padding-left: 0;
    }
  }

  li.storage-group-list-item:not(:first-child) {
    margin-top: var(--sys-size-6);
  }
}

.icons-container devtools-icon.red-icon {
  color: var(--icon-error);
}

devtools-icon.navigator-file-tree-item {
  color: var(--icon-file-default);
}

devtools-icon.navigator-folder-tree-item {
  color: var(--icon-folder-primary);
}

devtools-icon.navigator-script-tree-item {
  color: var(--icon-file-script);
}

devtools-icon.navigator-stylesheet-tree-item {
  color: var(--icon-file-styles);
}

devtools-icon.navigator-image-tree-item,
devtools-icon.navigator-font-tree-item {
  color: var(--icon-file-image);
}

.window-closed .tree-element-title {
  text-decoration: line-through;
}

/*# sourceURL=${import.meta.resolve("./resourcesSidebar.css")} */`;

// gen/front_end/panels/application/ServiceWorkerCacheTreeElement.js
import * as Host6 from "./../../core/host/host.js";
import * as i18n29 from "./../../core/i18n/i18n.js";
import * as SDK15 from "./../../core/sdk/sdk.js";
import * as IconButton8 from "./../../ui/components/icon_button/icon_button.js";
import * as UI12 from "./../../ui/legacy/legacy.js";

// gen/front_end/panels/application/ServiceWorkerCacheViews.js
var ServiceWorkerCacheViews_exports = {};
__export(ServiceWorkerCacheViews_exports, {
  DataGridNode: () => DataGridNode,
  RequestView: () => RequestView,
  ServiceWorkerCacheView: () => ServiceWorkerCacheView
});
import "./../../ui/legacy/legacy.js";
import * as Common8 from "./../../core/common/common.js";
import * as i18n27 from "./../../core/i18n/i18n.js";
import * as Platform3 from "./../../core/platform/platform.js";
import * as SDK14 from "./../../core/sdk/sdk.js";
import * as TextUtils from "./../../models/text_utils/text_utils.js";
import * as LegacyWrapper5 from "./../../ui/components/legacy_wrapper/legacy_wrapper.js";
import * as DataGrid5 from "./../../ui/legacy/components/data_grid/data_grid.js";
import * as UI11 from "./../../ui/legacy/legacy.js";
import * as VisualLogging7 from "./../../ui/visual_logging/visual_logging.js";
import * as NetworkComponents from "./../network/components/components.js";
import * as Network from "./../network/network.js";
import * as ApplicationComponents8 from "./components/components.js";

// gen/front_end/panels/application/serviceWorkerCacheViews.css.js
var serviceWorkerCacheViews_css_default = `/*
 * Copyright 2014 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.service-worker-cache-data-view .data-view-toolbar {
  position: relative;
  background-color: var(--sys-color-cdt-base-container);
  border-bottom: 1px solid var(--sys-color-divider);
  padding-right: 10px;
}

.service-worker-cache-data-view .data-grid {
  flex: auto;
}

.service-worker-cache-data-view .data-grid .data-container tr:nth-last-child(1) td {
  border: 0;
}

.service-worker-cache-data-view .data-grid .data-container tr:nth-last-child(2) td {
  border-bottom: 1px solid var(--sys-color-divider);
}

.service-worker-cache-data-view .data-grid .data-container tr.selected {
  background-color: var(--sys-color-neutral-container);
  color: inherit;
}

.service-worker-cache-data-view .data-grid:focus .data-container tr.selected {
  background-color: var(--sys-color-tonal-container);
  color: var(--sys-color-on-tonal-container);
}

.service-worker-cache-data-view .section,
.service-worker-cache-data-view .section > .header,
.service-worker-cache-data-view .section > .header .title {
  margin: 0;
  min-height: inherit;
  line-height: inherit;
}

.service-worker-cache-data-view .data-grid .data-container td .section .header .title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.cache-preview-panel-resizer {
  background-color: var(--sys-color-surface1);
  height: 4px;
  border-bottom: 1px solid var(--sys-color-divider);
}

.cache-storage-summary-bar {
  flex: 0 0 27px;
  line-height: 27px;
  padding-left: 5px;
  background-color: var(--sys-color-cdt-base-container);
  border-top: 1px solid var(--sys-color-divider);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

/*# sourceURL=${import.meta.resolve("./serviceWorkerCacheViews.css")} */`;

// gen/front_end/panels/application/ServiceWorkerCacheViews.js
var UIStrings14 = {
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  cache: "Cache",
  /**
   * @description Text to refresh the page
   */
  refresh: "Refresh",
  /**
   * @description Tooltip text that appears when hovering over the largeicon delete button in the Service Worker Cache Views of the Application panel
   */
  deleteSelected: "Delete Selected",
  /**
   * @description Text in Service Worker Cache Views of the Application panel
   */
  filterByPath: "Filter by path",
  /**
   * @description Text in Service Worker Cache Views of the Application panel that shows if no cache entry is selected for preview
   */
  noCacheEntrySelected: "No cache entry selected",
  /**
   * @description Text in Service Worker Cache Views of the Application panel
   */
  selectACacheEntryAboveToPreview: "Select a cache entry above to preview",
  /**
   * @description Text for the name of something
   */
  name: "Name",
  /**
   * @description Text in Service Worker Cache Views of the Application panel
   */
  timeCached: "Time Cached",
  /**
   * @description Tooltip text that appears when hovering over the vary header column in the Service Worker Cache Views of the Application panel
   */
  varyHeaderWarning: "\u26A0\uFE0F Set ignoreVary to true when matching this entry",
  /**
   * @description Text used to show that data was retrieved from ServiceWorker Cache
   */
  serviceWorkerCache: "`Service Worker` Cache",
  /**
   * @description Span text content in Service Worker Cache Views of the Application panel
   * @example {2} PH1
   */
  matchingEntriesS: "Matching entries: {PH1}",
  /**
   * @description Span text content in Indexed DBViews of the Application panel
   * @example {2} PH1
   */
  totalEntriesS: "Total entries: {PH1}",
  /**
   * @description Text for network request headers
   */
  headers: "Headers",
  /**
   * @description Text for previewing items
   */
  preview: "Preview"
};
var str_14 = i18n27.i18n.registerUIStrings("panels/application/ServiceWorkerCacheViews.ts", UIStrings14);
var i18nString14 = i18n27.i18n.getLocalizedString.bind(void 0, str_14);
var ServiceWorkerCacheView = class extends UI11.View.SimpleView {
  model;
  entriesForTest;
  splitWidget;
  previewPanel;
  preview;
  cache;
  dataGrid;
  refreshThrottler;
  refreshButton;
  deleteSelectedButton;
  entryPathFilter;
  returnCount;
  summaryBarElement;
  loadingPromise;
  metadataView = new ApplicationComponents8.StorageMetadataView.StorageMetadataView();
  constructor(model, cache) {
    super({
      title: i18nString14(UIStrings14.cache),
      viewId: "cache",
      jslog: `${VisualLogging7.pane("cache-storage-data")}`
    });
    this.registerRequiredCSS(serviceWorkerCacheViews_css_default);
    this.model = model;
    this.entriesForTest = null;
    this.element.classList.add("service-worker-cache-data-view");
    this.element.classList.add("storage-view");
    const editorToolbar = this.element.createChild("devtools-toolbar", "data-view-toolbar");
    editorToolbar.setAttribute("jslog", `${VisualLogging7.toolbar()}`);
    this.element.appendChild(this.metadataView);
    this.splitWidget = new UI11.SplitWidget.SplitWidget(false, false);
    this.splitWidget.show(this.element);
    this.previewPanel = new UI11.Widget.VBox();
    const resizer = this.previewPanel.element.createChild("div", "cache-preview-panel-resizer");
    this.splitWidget.setMainWidget(this.previewPanel);
    this.splitWidget.installResizer(resizer);
    this.preview = null;
    this.cache = cache;
    const bucketInfo = this.model.target().model(SDK14.StorageBucketsModel.StorageBucketsModel)?.getBucketByName(cache.storageBucket.storageKey, cache.storageBucket.name);
    if (bucketInfo) {
      this.metadataView.setStorageBucket(bucketInfo);
    } else if (cache.storageKey) {
      this.metadataView.setStorageKey(cache.storageKey);
    }
    this.dataGrid = null;
    this.refreshThrottler = new Common8.Throttler.Throttler(300);
    this.refreshButton = new UI11.Toolbar.ToolbarButton(i18nString14(UIStrings14.refresh), "refresh", void 0, "cache-storage.refresh");
    this.refreshButton.addEventListener("Click", this.refreshButtonClicked, this);
    editorToolbar.appendToolbarItem(this.refreshButton);
    this.deleteSelectedButton = new UI11.Toolbar.ToolbarButton(i18nString14(UIStrings14.deleteSelected), "cross", void 0, "cache-storage.delete-selected");
    this.deleteSelectedButton.addEventListener("Click", (_event) => {
      void this.deleteButtonClicked(null);
    });
    editorToolbar.appendToolbarItem(this.deleteSelectedButton);
    const entryPathFilterBox = new UI11.Toolbar.ToolbarFilter(i18nString14(UIStrings14.filterByPath), 1);
    editorToolbar.appendToolbarItem(entryPathFilterBox);
    const entryPathFilterThrottler = new Common8.Throttler.Throttler(300);
    this.entryPathFilter = "";
    entryPathFilterBox.addEventListener("TextChanged", () => {
      void entryPathFilterThrottler.schedule(() => {
        this.entryPathFilter = entryPathFilterBox.value();
        return this.updateData(true);
      });
    });
    this.returnCount = null;
    this.summaryBarElement = null;
    this.loadingPromise = null;
    this.update(cache);
  }
  resetDataGrid() {
    if (this.dataGrid) {
      this.dataGrid.asWidget().detach();
    }
    this.dataGrid = this.createDataGrid();
    const dataGridWidget = this.dataGrid.asWidget();
    this.splitWidget.setSidebarWidget(dataGridWidget);
    dataGridWidget.setMinimumSize(0, 250);
  }
  wasShown() {
    this.model.addEventListener("CacheStorageContentUpdated", this.cacheContentUpdated, this);
    void this.updateData(true);
  }
  willHide() {
    this.model.removeEventListener("CacheStorageContentUpdated", this.cacheContentUpdated, this);
  }
  showPreview(preview) {
    if (preview && this.preview === preview) {
      return;
    }
    if (this.preview) {
      this.preview.detach();
    }
    if (!preview) {
      preview = new UI11.EmptyWidget.EmptyWidget(i18nString14(UIStrings14.noCacheEntrySelected), i18nString14(UIStrings14.selectACacheEntryAboveToPreview));
    }
    this.preview = preview;
    this.preview.show(this.previewPanel.element);
  }
  createDataGrid() {
    const columns = [
      { id: "number", title: "#", sortable: false, width: "3px" },
      { id: "name", title: i18nString14(UIStrings14.name), weight: 4, sortable: true },
      {
        id: "response-type",
        title: i18n27.i18n.lockedString("Response-Type"),
        weight: 1,
        align: "right",
        sortable: true
      },
      { id: "content-type", title: i18n27.i18n.lockedString("Content-Type"), weight: 1, sortable: true },
      {
        id: "content-length",
        title: i18n27.i18n.lockedString("Content-Length"),
        weight: 1,
        align: "right",
        sortable: true
      },
      {
        id: "response-time",
        title: i18nString14(UIStrings14.timeCached),
        width: "12em",
        weight: 1,
        align: "right",
        sortable: true
      },
      { id: "vary-header", title: i18n27.i18n.lockedString("Vary Header"), weight: 1, sortable: true }
    ];
    const dataGrid = new DataGrid5.DataGrid.DataGridImpl({
      displayName: i18nString14(UIStrings14.serviceWorkerCache),
      columns,
      deleteCallback: this.deleteButtonClicked.bind(this),
      refreshCallback: this.updateData.bind(this, true)
    });
    dataGrid.addEventListener("SortingChanged", this.sortingChanged, this);
    dataGrid.addEventListener("SelectedNode", (event) => {
      void this.previewCachedResponse(event.data.data);
    }, this);
    dataGrid.setStriped(true);
    return dataGrid;
  }
  sortingChanged() {
    if (!this.dataGrid) {
      return;
    }
    const dataGrid = this.dataGrid;
    const accending = dataGrid.isSortOrderAscending();
    const columnId = dataGrid.sortColumnId();
    let comparator;
    if (columnId === "name") {
      comparator = (a, b) => a.name.localeCompare(b.name);
    } else if (columnId === "content-type") {
      comparator = (a, b) => a.data.mimeType.localeCompare(b.data.mimeType);
    } else if (columnId === "content-length") {
      comparator = (a, b) => a.data.resourceSize - b.data.resourceSize;
    } else if (columnId === "response-time") {
      comparator = (a, b) => a.data.endTime - b.data.endTime;
    } else if (columnId === "response-type") {
      comparator = (a, b) => a.responseType.localeCompare(b.responseType);
    } else if (columnId === "vary-header") {
      comparator = (a, b) => a.varyHeader.localeCompare(b.varyHeader);
    }
    const children = dataGrid.rootNode().children.slice();
    dataGrid.rootNode().removeChildren();
    children.sort((a, b) => {
      const result = comparator(a, b);
      return accending ? result : -result;
    });
    children.forEach((child) => dataGrid.rootNode().appendChild(child));
  }
  async deleteButtonClicked(node) {
    if (!node) {
      node = this.dataGrid?.selectedNode ?? null;
      if (!node) {
        return;
      }
    }
    await this.model.deleteCacheEntry(this.cache, node.data.url());
    node.remove();
  }
  update(cache = null) {
    if (!cache) {
      return;
    }
    this.cache = cache;
    this.resetDataGrid();
    void this.updateData(true);
  }
  updateSummaryBar() {
    if (!this.summaryBarElement) {
      this.summaryBarElement = this.element.createChild("div", "cache-storage-summary-bar");
    }
    this.summaryBarElement.removeChildren();
    const span = this.summaryBarElement.createChild("span");
    if (this.entryPathFilter) {
      span.textContent = i18nString14(UIStrings14.matchingEntriesS, { PH1: String(this.returnCount) });
    } else {
      span.textContent = i18nString14(UIStrings14.totalEntriesS, { PH1: String(this.returnCount) });
    }
  }
  updateDataCallback(entries, returnCount) {
    if (!this.dataGrid) {
      return;
    }
    const selected = this.dataGrid.selectedNode?.data.url();
    this.refreshButton.setEnabled(true);
    this.entriesForTest = entries;
    this.returnCount = returnCount;
    this.updateSummaryBar();
    const oldEntries = /* @__PURE__ */ new Map();
    const rootNode = this.dataGrid.rootNode();
    for (const node of rootNode.children) {
      oldEntries.set(node.data.url, node);
    }
    rootNode.removeChildren();
    let selectedNode = null;
    for (let i = 0; i < entries.length; ++i) {
      const entry = entries[i];
      let node = oldEntries.get(entry.requestURL);
      if (!node || node.data.responseTime !== entry.responseTime) {
        node = new DataGridNode(i, this.createRequest(entry), entry.responseType);
        node.selectable = true;
      } else {
        node.data.number = i;
      }
      rootNode.appendChild(node);
      if (entry.requestURL === selected) {
        selectedNode = node;
      }
    }
    if (!selectedNode) {
      this.showPreview(null);
    } else {
      selectedNode.revealAndSelect();
    }
    this.updatedForTest();
  }
  async updateData(force) {
    if (!force && this.loadingPromise) {
      return await this.loadingPromise;
    }
    this.refreshButton.setEnabled(false);
    if (this.loadingPromise) {
      return await this.loadingPromise;
    }
    this.loadingPromise = new Promise((resolve) => {
      this.model.loadAllCacheData(this.cache, this.entryPathFilter, (entries2, returnCount2) => {
        resolve({ entries: entries2, returnCount: returnCount2 });
      });
    });
    const { entries, returnCount } = await this.loadingPromise;
    this.updateDataCallback(entries, returnCount);
    this.loadingPromise = null;
    return;
  }
  refreshButtonClicked() {
    void this.updateData(true);
  }
  cacheContentUpdated(event) {
    const { cacheName, storageBucket } = event.data;
    if (!this.cache.inBucket(storageBucket) || this.cache.cacheName !== cacheName) {
      return;
    }
    void this.refreshThrottler.schedule(
      () => Promise.resolve(this.updateData(true)),
      "AsSoonAsPossible"
      /* Common.Throttler.Scheduling.AS_SOON_AS_POSSIBLE */
    );
  }
  async previewCachedResponse(request) {
    let preview = networkRequestToPreview.get(request);
    if (!preview) {
      preview = new RequestView(request);
      networkRequestToPreview.set(request, preview);
    }
    if (this.dataGrid?.selectedNode && request === this.dataGrid.selectedNode.data) {
      this.showPreview(preview);
    }
  }
  createRequest(entry) {
    const request = SDK14.NetworkRequest.NetworkRequest.createWithoutBackendRequest("cache-storage-" + entry.requestURL, entry.requestURL, Platform3.DevToolsPath.EmptyUrlString, null);
    request.requestMethod = entry.requestMethod;
    request.setRequestHeaders(entry.requestHeaders);
    request.statusCode = entry.responseStatus;
    request.statusText = entry.responseStatusText;
    request.protocol = new Common8.ParsedURL.ParsedURL(entry.requestURL).scheme;
    request.responseHeaders = entry.responseHeaders;
    request.setRequestHeadersText("");
    request.endTime = entry.responseTime;
    let header = entry.responseHeaders.find((header2) => header2.name.toLowerCase() === "content-type");
    let mimeType = "text/plain";
    if (header) {
      const result = Platform3.MimeType.parseContentType(header.value);
      if (result.mimeType) {
        mimeType = result.mimeType;
      }
    }
    request.mimeType = mimeType;
    header = entry.responseHeaders.find((header2) => header2.name.toLowerCase() === "content-length");
    request.resourceSize = header && Number(header.value) || 0;
    let resourceType = Common8.ResourceType.ResourceType.fromMimeType(mimeType);
    if (!resourceType) {
      resourceType = Common8.ResourceType.ResourceType.fromURL(entry.requestURL) || Common8.ResourceType.resourceTypes.Other;
    }
    request.setResourceType(resourceType);
    request.setContentDataProvider(this.requestContent.bind(this, request));
    return request;
  }
  async requestContent(request) {
    const response = await this.cache.requestCachedResponse(request.url(), request.requestHeaders());
    if (!response) {
      return { error: "No cached response found" };
    }
    return new TextUtils.ContentData.ContentData(
      response.body,
      /* isBase64=*/
      true,
      request.mimeType,
      request.charset() ?? void 0
    );
  }
  updatedForTest() {
  }
};
var networkRequestToPreview = /* @__PURE__ */ new WeakMap();
var DataGridNode = class extends DataGrid5.DataGrid.DataGridNode {
  number;
  name;
  request;
  responseType;
  varyHeader;
  constructor(number, request, responseType) {
    super(request);
    this.number = number;
    const parsed = new Common8.ParsedURL.ParsedURL(request.url());
    if (parsed.isValid) {
      this.name = Platform3.StringUtilities.trimURL(request.url(), parsed.domain());
    } else {
      this.name = request.url();
    }
    this.request = request;
    this.responseType = responseType;
    this.varyHeader = request.responseHeaders.find((header) => header.name.toLowerCase() === "vary")?.value || "";
  }
  createCell(columnId) {
    const cell = this.createTD(columnId);
    let value;
    let tooltip = this.request.url();
    if (columnId === "number") {
      value = String(this.number);
    } else if (columnId === "name") {
      value = this.name;
    } else if (columnId === "response-type") {
      if (this.responseType === "opaqueResponse") {
        value = "opaque";
      } else if (this.responseType === "opaqueRedirect") {
        value = "opaqueredirect";
      } else {
        value = this.responseType;
      }
    } else if (columnId === "content-type") {
      value = this.request.mimeType;
    } else if (columnId === "content-length") {
      value = (this.request.resourceSize | 0).toLocaleString("en-US");
    } else if (columnId === "response-time") {
      value = new Date(this.request.endTime * 1e3).toLocaleString();
    } else if (columnId === "vary-header") {
      value = this.varyHeader;
      if (this.varyHeader) {
        tooltip = i18nString14(UIStrings14.varyHeaderWarning);
      }
    }
    const parentElement = cell.parentElement;
    let gridNode;
    if (parentElement && this.dataGrid) {
      gridNode = this.dataGrid.elementToDataGridNode.get(parentElement);
    }
    DataGrid5.DataGrid.DataGridImpl.setElementText(
      cell,
      value || "",
      /* longText= */
      true,
      gridNode
    );
    UI11.Tooltip.Tooltip.install(cell, tooltip);
    return cell;
  }
};
var RequestView = class extends UI11.Widget.VBox {
  tabbedPane;
  resourceViewTabSetting;
  constructor(request) {
    super();
    this.tabbedPane = new UI11.TabbedPane.TabbedPane();
    this.tabbedPane.element.setAttribute("jslog", `${VisualLogging7.section("network-item-preview")}`);
    this.tabbedPane.addEventListener(UI11.TabbedPane.Events.TabSelected, this.tabSelected, this);
    this.resourceViewTabSetting = Common8.Settings.Settings.instance().createSetting("cache-storage-view-tab", "preview");
    this.tabbedPane.appendTab("headers", i18nString14(UIStrings14.headers), LegacyWrapper5.LegacyWrapper.legacyWrapper(UI11.Widget.VBox, new NetworkComponents.RequestHeadersView.RequestHeadersView(request)));
    this.tabbedPane.appendTab("preview", i18nString14(UIStrings14.preview), new Network.RequestPreviewView.RequestPreviewView(request));
    this.tabbedPane.show(this.element);
  }
  wasShown() {
    super.wasShown();
    this.selectTab();
  }
  selectTab(tabId) {
    if (!tabId) {
      tabId = this.resourceViewTabSetting.get();
    }
    if (tabId && !this.tabbedPane.selectTab(tabId)) {
      this.tabbedPane.selectTab("headers");
    }
  }
  tabSelected(event) {
    if (!event.data.isUserGesture) {
      return;
    }
    this.resourceViewTabSetting.set(event.data.tabId);
  }
};

// gen/front_end/panels/application/ServiceWorkerCacheTreeElement.js
var UIStrings15 = {
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  cacheStorage: "Cache storage",
  /**
   * @description Text in Application Panel if no cache storage was detected.
   */
  noCacheStorage: "No cache storage detected",
  /**
   * @description Description text in Application Panel describing the cache storage tab
   */
  cacheStorageDescription: "On this page you can view and delete cache data.",
  /**
   * @description A context menu item in the Application Panel Sidebar of the Application panel
   */
  refreshCaches: "Refresh Caches",
  /**
   * @description Text to delete something
   */
  delete: "Delete"
};
var str_15 = i18n29.i18n.registerUIStrings("panels/application/ServiceWorkerCacheTreeElement.ts", UIStrings15);
var i18nString15 = i18n29.i18n.getLocalizedString.bind(void 0, str_15);
var ServiceWorkerCacheTreeElement = class extends ExpandableApplicationPanelTreeElement {
  swCacheModels;
  swCacheTreeElements;
  storageBucket;
  constructor(resourcesPanel, storageBucket) {
    super(resourcesPanel, i18nString15(UIStrings15.cacheStorage), i18nString15(UIStrings15.noCacheStorage), i18nString15(UIStrings15.cacheStorageDescription), "cache-storage");
    const icon = IconButton8.Icon.create("database");
    this.setLink("https://developer.chrome.com/docs/devtools/storage/cache/");
    this.setLeadingIcons([icon]);
    this.swCacheModels = /* @__PURE__ */ new Set();
    this.swCacheTreeElements = /* @__PURE__ */ new Set();
    this.storageBucket = storageBucket;
  }
  initialize() {
    this.swCacheModels.clear();
    this.swCacheTreeElements.clear();
    SDK15.TargetManager.TargetManager.instance().observeModels(SDK15.ServiceWorkerCacheModel.ServiceWorkerCacheModel, {
      modelAdded: (model) => this.serviceWorkerCacheModelAdded(model),
      modelRemoved: (model) => this.serviceWorkerCacheModelRemoved(model)
    });
  }
  onattach() {
    super.onattach();
    this.listItemElement.addEventListener("contextmenu", this.handleContextMenuEvent.bind(this), true);
  }
  handleContextMenuEvent(event) {
    const contextMenu = new UI12.ContextMenu.ContextMenu(event);
    contextMenu.defaultSection().appendItem(i18nString15(UIStrings15.refreshCaches), this.refreshCaches.bind(this), { jslogContext: "refresh-caches" });
    void contextMenu.show();
  }
  refreshCaches() {
    for (const swCacheModel of this.swCacheModels) {
      swCacheModel.refreshCacheNames();
    }
  }
  serviceWorkerCacheModelAdded(model) {
    model.enable();
    this.swCacheModels.add(model);
    for (const cache of model.caches()) {
      this.addCache(model, cache);
    }
    model.addEventListener("CacheAdded", this.cacheAdded, this);
    model.addEventListener("CacheRemoved", this.cacheRemoved, this);
  }
  serviceWorkerCacheModelRemoved(model) {
    for (const cache of model.caches()) {
      this.removeCache(model, cache);
    }
    model.removeEventListener("CacheAdded", this.cacheAdded, this);
    model.removeEventListener("CacheRemoved", this.cacheRemoved, this);
    this.swCacheModels.delete(model);
  }
  cacheAdded(event) {
    const { model, cache } = event.data;
    this.addCache(model, cache);
  }
  cacheInTree(cache) {
    if (this.storageBucket) {
      return cache.inBucket(this.storageBucket);
    }
    return true;
  }
  addCache(model, cache) {
    if (this.cacheInTree(cache)) {
      const swCacheTreeElement = new SWCacheTreeElement(this.resourcesPanel, model, cache, this.storageBucket === void 0);
      this.swCacheTreeElements.add(swCacheTreeElement);
      this.appendChild(swCacheTreeElement);
    }
  }
  cacheRemoved(event) {
    const { model, cache } = event.data;
    if (this.cacheInTree(cache)) {
      this.removeCache(model, cache);
    }
  }
  removeCache(model, cache) {
    const swCacheTreeElement = this.cacheTreeElement(model, cache);
    if (!swCacheTreeElement) {
      return;
    }
    this.removeChild(swCacheTreeElement);
    this.swCacheTreeElements.delete(swCacheTreeElement);
    this.setExpandable(this.childCount() > 0);
  }
  cacheTreeElement(model, cache) {
    for (const cacheTreeElement of this.swCacheTreeElements) {
      if (cacheTreeElement.hasModelAndCache(model, cache)) {
        return cacheTreeElement;
      }
    }
    return null;
  }
};
var SWCacheTreeElement = class extends ApplicationPanelTreeElement {
  model;
  cache;
  view;
  constructor(resourcesPanel, model, cache, appendStorageKey) {
    let cacheName;
    if (appendStorageKey) {
      cacheName = cache.cacheName + " - " + cache.storageKey;
    } else {
      cacheName = cache.cacheName;
    }
    super(resourcesPanel, cacheName, false, "cache-storage-instance");
    this.model = model;
    this.cache = cache;
    this.view = null;
    const icon = IconButton8.Icon.create("table");
    this.setLeadingIcons([icon]);
  }
  get itemURL() {
    return "cache://" + this.cache.cacheId;
  }
  onattach() {
    super.onattach();
    this.listItemElement.addEventListener("contextmenu", this.handleContextMenuEvent.bind(this), true);
  }
  handleContextMenuEvent(event) {
    const contextMenu = new UI12.ContextMenu.ContextMenu(event);
    contextMenu.defaultSection().appendItem(i18nString15(UIStrings15.delete), this.clearCache.bind(this), { jslogContext: "delete" });
    void contextMenu.show();
  }
  clearCache() {
    void this.model.deleteCache(this.cache);
  }
  update(cache) {
    this.cache = cache;
    if (this.view) {
      this.view.update(cache);
    }
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    if (!this.view) {
      this.view = new ServiceWorkerCacheView(this.model, this.cache);
    }
    this.showView(this.view);
    Host6.userMetrics.panelShown("service-worker-cache");
    return false;
  }
  hasModelAndCache(model, cache) {
    return this.cache.equals(cache) && this.model === model;
  }
};

// gen/front_end/panels/application/ServiceWorkersView.js
var ServiceWorkersView_exports = {};
__export(ServiceWorkersView_exports, {
  Section: () => Section,
  ServiceWorkersView: () => ServiceWorkersView,
  setThrottleDisabledForDebugging: () => setThrottleDisabledForDebugging
});
import * as Common9 from "./../../core/common/common.js";
import * as Host7 from "./../../core/host/host.js";
import * as i18n33 from "./../../core/i18n/i18n.js";
import * as SDK17 from "./../../core/sdk/sdk.js";
import * as Logs from "./../../models/logs/logs.js";
import * as NetworkForward from "./../network/forward/forward.js";
import * as Buttons5 from "./../../ui/components/buttons/buttons.js";
import * as Components2 from "./../../ui/legacy/components/utils/utils.js";
import * as UI14 from "./../../ui/legacy/legacy.js";
import * as VisualLogging9 from "./../../ui/visual_logging/visual_logging.js";
import * as MobileThrottling from "./../mobile_throttling/mobile_throttling.js";
import * as ApplicationComponents9 from "./components/components.js";

// gen/front_end/panels/application/serviceWorkersView.css.js
var serviceWorkersView_css_default = `/*
 * Copyright 2015 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.service-worker-version {
  display: flex;
  /* The status string can be long, allow this line of the report to wrap. */
  align-items: center;
  flex-wrap: wrap;

  devtools-button {
    margin-left: var(--sys-size-3);
  }
}

.service-worker-version-stack {
  position: relative;
}

.service-worker-version-stack-bar {
  position: absolute;
  top: 10px;
  bottom: 20px;
  left: 4px;
  content: "";
  border-left: 1px solid var(--sys-color-divider);
  z-index: 0;
}

.service-worker-version:not(:last-child) {
  margin-bottom: 7px;
}

.service-worker-version-string {
  /* This label contains important information that needs to be legible at all
     times. Don't shrink it. */
  flex-shrink: 0;
}

.service-worker-active-circle,
.service-worker-redundant-circle,
.service-worker-waiting-circle,
.service-worker-installing-circle {
  position: relative;
  display: inline-block;
  width: 10px;
  height: 10px;
  z-index: 10;
  margin-right: 5px;
  border-radius: 50%;
  border: 1px solid var(--sys-color-token-subtle);
  align-self: center;
  /* The circle should not shrink, to avoid risking becoming invisible. */
  flex-shrink: 0;
}

.service-worker-active-circle {
  background-color: var(--sys-color-green-bright);
}

.service-worker-waiting-circle {
  background-color: var(--sys-color-yellow-bright);
}

.service-worker-installing-circle {
  background-color: var(--sys-color-cdt-base-container);
}

.service-worker-redundant-circle {
  background-color: var(--sys-color-neutral-bright);
}

.service-worker-subtitle {
  padding-left: 14px;
  line-height: 14px;
  color: var(--sys-color-state-disabled);
}

.link {
  margin-left: 7px;
}

.service-worker-editor-with-button {
  align-items: baseline;
  display: flex;
}

.service-worker-notification-editor {
  border: 1px solid var(--sys-color-divider);
  display: flex;
  flex: auto;
  margin-right: 4px;
  max-width: 400px;
  min-width: 80px;
}

.report-field-value {
  white-space: normal;
}

.report-field-value-filename,
.service-worker-client-string {
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.report-field-value-filename {
  display: contents;
}

.report-field-value-subtitle {
  overflow: hidden;
  text-overflow: ellipsis;
}

.service-worker-client {
  display: flex;
}

.service-worker-client-focus-link {
  flex: none;
  margin-left: 2px;
  align-self: center;
}

.service-worker-notification-editor.source-code {
  /** Simulate CodeMirror that is shown above */
  padding: 4px;
}

.service-worker-list {
  background-color: var(--sys-color-cdt-base-container);
  overflow: auto;
}

.service-workers-this-origin {
  flex-shrink: 0;
  flex-grow: 0;
}

.devtools-link {
  line-height: 14px;
  align-self: center;
  padding: 1px;
}

button.link {
  padding: 1px;
}

button.link:focus-visible {
  background-color: inherit;
}

/*# sourceURL=${import.meta.resolve("./serviceWorkersView.css")} */`;

// gen/front_end/panels/application/serviceWorkerUpdateCycleView.css.js
var serviceWorkerUpdateCycleView_css_default = `/*
 * Copyright 2020 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */
.resource-service-worker-update-view {
  display: block;
  margin: 6px;
  color: var(--sys-color-on-surface-subtle);
  overflow: auto;
}

.service-worker-update-timing-table {
  border: 1px solid var(--sys-color-divider);
  border-spacing: 0;
  padding-left: 10px;
  padding-right: 10px;
  line-height: initial;
  table-layout: auto;
  overflow: hidden;
}

.service-worker-update-timing-row {
  position: relative;
  height: 20px;
  overflow: hidden;
  min-width: 80px;
}

.service-worker-update-timing-bar {
  position: absolute;
  min-width: 1px;
  top: 0;
  bottom: 0;
}

.service-worker-update-timing-bar-clickable::before {
  user-select: none;
  mask-image: var(--image-file-triangle-right);
  float: left;
  width: 14px;
  height: 14px;
  margin-right: 2px;
  content: "";
  position: relative;
  background-color: var(--icon-default);
  transition: transform 200ms;
}

.service-worker-update-timing-bar-clickable {
  position: relative;
  left: -12px;
}

.service-worker-update-timing-bar-clickable:focus-visible {
  background-color: var(--sys-color-state-focus-highlight);
}

.service-worker-update-timing-bar-clickable[aria-checked="true"]::before {
  transform: rotate(90deg);
}

.service-worker-update-timing-bar-details-collapsed {
  display: none;
}

.service-worker-update-timing-bar-details-expanded {
  display: table-row;
}

.service-worker-update-timing-bar-details:focus-visible {
  background-color: var(--sys-color-state-focus-highlight);
}

.service-worker-update-timing-bar.activate {
  top: 5px;
  height: 10px;
  background-color: var(--sys-color-yellow-bright);
}

.service-worker-update-timing-bar.wait {
  top: 5px;
  height: 10px;
  background-color: var(--sys-color-purple-bright);
}

.service-worker-update-timing-bar.install {
  top: 5px;
  height: 10px;
  background-color: var(--sys-color-cyan-bright);
}

.service-worker-update-timing-table > tr > td {
  padding: 4px 0;
  padding-right: 10px;
}

table.service-worker-update-timing-table > tr.service-worker-update-timing-table-header > td {
  border-top: 5px solid transparent;
  color: var(--sys-color-token-subtle);
}

table.service-worker-update-timing-table > tr.service-worker-update-timing-bar-details > td:first-child {
  padding-left: 12px;
}

table.service-worker-update-timing-table > tr.service-worker-update-timeline > td:first-child {
  padding-left: 12px;
}

/*# sourceURL=${import.meta.resolve("./serviceWorkerUpdateCycleView.css")} */`;

// gen/front_end/panels/application/ServiceWorkerUpdateCycleView.js
var ServiceWorkerUpdateCycleView_exports = {};
__export(ServiceWorkerUpdateCycleView_exports, {
  ServiceWorkerUpdateCycleView: () => ServiceWorkerUpdateCycleView
});
import * as i18n31 from "./../../core/i18n/i18n.js";
import * as SDK16 from "./../../core/sdk/sdk.js";
import * as UI13 from "./../../ui/legacy/legacy.js";
import * as VisualLogging8 from "./../../ui/visual_logging/visual_logging.js";
var UIStrings16 = {
  /**
   * @description Text in Indexed DBViews of the Application panel
   */
  version: "Version",
  /**
   * @description Table heading for Service Workers update information. Update is a noun.
   */
  updateActivity: "Update Activity",
  /**
   * @description Title for the timeline tab.
   */
  timeline: "Timeline",
  /**
   * @description Text in Service Workers Update Life Cycle
   * @example {2} PH1
   */
  startTimeS: "Start time: {PH1}",
  /**
   * @description Text for end time of an event
   * @example {2} PH1
   */
  endTimeS: "End time: {PH1}"
};
var str_16 = i18n31.i18n.registerUIStrings("panels/application/ServiceWorkerUpdateCycleView.ts", UIStrings16);
var i18nString16 = i18n31.i18n.getLocalizedString.bind(void 0, str_16);
var ServiceWorkerUpdateCycleView = class {
  registration;
  rows;
  selectedRowIndex;
  tableElement;
  constructor(registration) {
    this.registration = registration;
    this.rows = [];
    this.selectedRowIndex = -1;
    this.tableElement = document.createElement("table");
    this.createTimingTable();
  }
  calculateServiceWorkerUpdateRanges() {
    function addRange(ranges, range) {
      if (range.start < Number.MAX_VALUE && range.start <= range.end) {
        ranges.push(range);
      }
    }
    function addNormalizedRanges(ranges, id, startInstallTime, endInstallTime, startActivateTime, endActivateTime, status) {
      addRange(ranges, { id, phase: "Install", start: startInstallTime, end: endInstallTime });
      if (status === "activating" || status === "activated" || status === "redundant") {
        addRange(ranges, {
          id,
          phase: "Wait",
          start: endInstallTime,
          end: startActivateTime
        });
        addRange(ranges, { id, phase: "Activate", start: startActivateTime, end: endActivateTime });
      }
    }
    function rangesForVersion(version) {
      let state = version.currentState;
      let endActivateTime = 0;
      let beginActivateTime = 0;
      let endInstallTime = 0;
      let beginInstallTime = 0;
      const currentStatus = state.status;
      if (currentStatus === "new") {
        return [];
      }
      while (state) {
        if (state.status === "activated") {
          endActivateTime = state.lastUpdatedTimestamp;
        } else if (state.status === "activating") {
          if (endActivateTime === 0) {
            endActivateTime = state.lastUpdatedTimestamp;
          }
          beginActivateTime = state.lastUpdatedTimestamp;
        } else if (state.status === "installed") {
          endInstallTime = state.lastUpdatedTimestamp;
        } else if (state.status === "installing") {
          if (endInstallTime === 0) {
            endInstallTime = state.lastUpdatedTimestamp;
          }
          beginInstallTime = state.lastUpdatedTimestamp;
        }
        state = state.previousState;
      }
      const ranges = [];
      addNormalizedRanges(ranges, version.id, beginInstallTime, endInstallTime, beginActivateTime, endActivateTime, currentStatus);
      return ranges;
    }
    const versions = this.registration.versionsByMode();
    const modes = [
      "active",
      "waiting",
      "installing",
      "redundant"
    ];
    for (const mode of modes) {
      const version = versions.get(mode);
      if (version) {
        const ranges = rangesForVersion(version);
        return ranges;
      }
    }
    return [];
  }
  createTimingTable() {
    this.tableElement.classList.add("service-worker-update-timing-table");
    this.tableElement.setAttribute("jslog", `${VisualLogging8.tree("update-timing-table")}`);
    const timeRanges = this.calculateServiceWorkerUpdateRanges();
    this.updateTimingTable(timeRanges);
  }
  createTimingTableHead() {
    const serverHeader = this.tableElement.createChild("tr", "service-worker-update-timing-table-header");
    UI13.UIUtils.createTextChild(serverHeader.createChild("td"), i18nString16(UIStrings16.version));
    UI13.UIUtils.createTextChild(serverHeader.createChild("td"), i18nString16(UIStrings16.updateActivity));
    UI13.UIUtils.createTextChild(serverHeader.createChild("td"), i18nString16(UIStrings16.timeline));
  }
  removeRows() {
    const rows = this.tableElement.getElementsByTagName("tr");
    while (rows[0]) {
      if (rows[0].parentNode) {
        rows[0].parentNode.removeChild(rows[0]);
      }
    }
    this.rows = [];
  }
  updateTimingTable(timeRanges) {
    this.selectedRowIndex = -1;
    this.removeRows();
    this.createTimingTableHead();
    const timeRangeArray = timeRanges;
    if (timeRangeArray.length === 0) {
      return;
    }
    const startTimes = timeRangeArray.map((r) => r.start);
    const endTimes = timeRangeArray.map((r) => r.end);
    const startTime = startTimes.reduce((a, b) => Math.min(a, b));
    const endTime = endTimes.reduce((a, b) => Math.max(a, b));
    const scale = 100 / (endTime - startTime);
    for (const range of timeRangeArray) {
      const phaseName = range.phase;
      const left = scale * (range.start - startTime);
      const right = scale * (endTime - range.end);
      const tr = this.tableElement.createChild("tr", "service-worker-update-timeline");
      tr.setAttribute("jslog", `${VisualLogging8.treeItem("update-timeline").track({
        click: true,
        keydown: "ArrowLeft|ArrowRight|ArrowUp|ArrowDown|Enter|Space"
      })}`);
      this.rows.push(tr);
      const timingBarVersionElement = tr.createChild("td");
      UI13.UIUtils.createTextChild(timingBarVersionElement, "#" + range.id);
      timingBarVersionElement.classList.add("service-worker-update-timing-bar-clickable");
      timingBarVersionElement.setAttribute("tabindex", "0");
      timingBarVersionElement.setAttribute("role", "switch");
      timingBarVersionElement.addEventListener("focus", (event) => {
        this.onFocus(event);
      });
      timingBarVersionElement.setAttribute("jslog", `${VisualLogging8.expand("timing-info").track({ click: true })}`);
      UI13.ARIAUtils.setChecked(timingBarVersionElement, false);
      const timingBarTitleElement = tr.createChild("td");
      UI13.UIUtils.createTextChild(timingBarTitleElement, phaseName);
      const barContainer = tr.createChild("td").createChild("div", "service-worker-update-timing-row");
      const bar = barContainer.createChild("span", "service-worker-update-timing-bar " + phaseName.toLowerCase());
      bar.style.left = left + "%";
      bar.style.right = right + "%";
      bar.textContent = "\u200B";
      this.constructUpdateDetails(tr, range);
    }
  }
  /**
   * Detailed information about an update phase. Currently starting and ending time.
   */
  constructUpdateDetails(tr, range) {
    const startRow = this.tableElement.createChild("tr", "service-worker-update-timing-bar-details");
    startRow.classList.add("service-worker-update-timing-bar-details-collapsed");
    const startTimeItem = startRow.createChild("td");
    startTimeItem.colSpan = 3;
    const startTime = new Date(range.start).toISOString();
    UI13.UIUtils.createTextChild(startTimeItem.createChild("span"), i18nString16(UIStrings16.startTimeS, { PH1: startTime }));
    startRow.tabIndex = 0;
    const endRow = this.tableElement.createChild("tr", "service-worker-update-timing-bar-details");
    endRow.classList.add("service-worker-update-timing-bar-details-collapsed");
    const endTimeItem = endRow.createChild("td");
    endTimeItem.colSpan = 3;
    const endTime = new Date(range.end).toISOString();
    UI13.UIUtils.createTextChild(endTimeItem.createChild("span"), i18nString16(UIStrings16.endTimeS, { PH1: endTime }));
    endRow.tabIndex = 0;
    tr.addEventListener("keydown", (event) => {
      this.onKeydown(event, startRow, endRow);
    });
    tr.addEventListener("click", (event) => {
      this.onClick(event, startRow, endRow);
    });
  }
  toggle(startRow, endRow, target, expanded) {
    if (target.classList.contains("service-worker-update-timing-bar-clickable")) {
      startRow.classList.toggle("service-worker-update-timing-bar-details-collapsed");
      startRow.classList.toggle("service-worker-update-timing-bar-details-expanded");
      endRow.classList.toggle("service-worker-update-timing-bar-details-collapsed");
      endRow.classList.toggle("service-worker-update-timing-bar-details-expanded");
      UI13.ARIAUtils.setChecked(target, !expanded);
    }
  }
  onFocus(event) {
    const target = event.target;
    if (!target) {
      return;
    }
    const tr = target.parentElement;
    if (!tr) {
      return;
    }
    this.selectedRowIndex = this.rows.indexOf(tr);
  }
  onKeydown(event, startRow, endRow) {
    if (!event.target) {
      return;
    }
    const target = event.target;
    const keyboardEvent = event;
    const expanded = target.getAttribute("aria-checked") === "true";
    if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
      this.toggle(startRow, endRow, target, expanded);
      event.preventDefault();
      return;
    }
    if (!expanded && keyboardEvent.key === "ArrowRight" || expanded && keyboardEvent.key === "ArrowLeft") {
      this.toggle(startRow, endRow, target, expanded);
      event.preventDefault();
      return;
    }
    if (keyboardEvent.key === "ArrowDown") {
      if (this.selectedRowIndex >= 0) {
        this.selectNextRow();
      } else {
        this.selectFirstRow();
      }
      event.preventDefault();
    }
    if (keyboardEvent.key === "ArrowUp") {
      if (this.selectedRowIndex >= 0) {
        this.selectPreviousRow();
      } else {
        this.selectLastRow();
      }
      event.preventDefault();
    }
  }
  focusRow(row) {
    row.cells[0].focus();
  }
  blurRow(row) {
    row.cells[0].blur();
  }
  selectFirstRow() {
    if (this.rows.length === 0) {
      return;
    }
    this.selectedRowIndex = 0;
    this.focusRow(this.rows[0]);
  }
  selectLastRow() {
    if (this.rows.length === 0) {
      return;
    }
    this.selectedRowIndex = this.rows.length - 1;
    this.focusRow(this.rows[this.selectedRowIndex]);
  }
  selectNextRow() {
    if (this.rows.length === 0) {
      return;
    }
    const previousRowIndex = this.selectedRowIndex;
    this.selectedRowIndex++;
    if (this.selectedRowIndex >= this.rows.length) {
      this.selectedRowIndex = 0;
    }
    this.blurRow(this.rows[previousRowIndex]);
    this.focusRow(this.rows[this.selectedRowIndex]);
  }
  selectPreviousRow() {
    if (this.rows.length === 0) {
      return;
    }
    const previousRowIndex = this.selectedRowIndex;
    this.selectedRowIndex--;
    if (this.selectedRowIndex < 0) {
      this.selectedRowIndex = this.rows.length - 1;
    }
    this.blurRow(this.rows[previousRowIndex]);
    this.focusRow(this.rows[this.selectedRowIndex]);
  }
  onClick(event, startRow, endRow) {
    const tr = event.target;
    if (!tr) {
      return;
    }
    const expanded = tr.getAttribute("aria-checked") === "true";
    this.toggle(startRow, endRow, tr, expanded);
    event.preventDefault();
  }
  refresh() {
    const timeRanges = this.calculateServiceWorkerUpdateRanges();
    this.updateTimingTable(timeRanges);
  }
};

// gen/front_end/panels/application/ServiceWorkersView.js
var UIStrings17 = {
  /**
   * @description Text for linking to other Service Worker registrations
   */
  serviceWorkersFromOtherOrigins: "Service workers from other origins",
  /**
   * @description Title of update on reload setting in service workers view of the application panel
   */
  updateOnReload: "Update on reload",
  /**
   * @description Tooltip text that appears on the setting when hovering over it in Service Workers View of the Application panel
   */
  onPageReloadForceTheService: "On page reload, force the `service worker` to update, and activate it",
  /**
   * @description Title of bypass service worker setting in service workers view of the application panel
   */
  bypassForNetwork: "Bypass for network",
  /**
   * @description Tooltip text that appears on the setting when hovering over it in Service Workers View of the Application panel
   */
  bypassTheServiceWorkerAndLoad: "Bypass the `service worker` and load resources from the network",
  /**
   * @description Screen reader title for a section of the Service Workers view of the Application panel
   * @example {https://example.com} PH1
   */
  serviceWorkerForS: "`Service worker` for {PH1}",
  /**
   * @description Text in Service Workers View of the Application panel
   */
  testPushMessageFromDevtools: "Test push message from DevTools.",
  /**
   * @description Button label for service worker network requests
   */
  networkRequests: "Network requests",
  /**
   * @description Label for a button in the Service Workers View of the Application panel.
   * Imperative noun. Clicking the button will refresh the list of service worker registrations.
   */
  update: "Update",
  /**
   * @description Text in Service Workers View of the Application panel
   */
  unregisterServiceWorker: "Unregister service worker",
  /**
   * @description Text in Service Workers View of the Application panel
   */
  unregister: "Unregister",
  /**
   * @description Text for the source of something
   */
  source: "Source",
  /**
   * @description Text for the status of something
   */
  status: "Status",
  /**
   * @description Text in Service Workers View of the Application panel
   */
  clients: "Clients",
  /**
   * @description Text in Service Workers View of the Application panel. Label for a section of the
   * tool which allows the developer to send a test push message to the service worker.
   */
  pushString: "Push",
  /**
   * @description Text in Service Workers View of the Application panel. Placeholder text for where
   * the user can type in the data they want to push to the service worker i.e. the 'push data'. Noun
   * phrase.
   */
  pushData: "Push data",
  /**
   * @description Text in Service Workers View of the Application panel
   */
  syncString: "Sync",
  /**
   * @description Placeholder text for the input box where a user is asked for a test tag to sync. This is used as a compound noun, not as a verb.
   */
  syncTag: "Sync tag",
  /**
   * @description Text for button in Service Workers View of the Application panel that dispatches a periodicsync event
   */
  periodicSync: "Periodic sync",
  /**
   * @description Default tag for a periodicsync event in Service Workers View of the Application panel
   */
  periodicSyncTag: "Periodic sync tag",
  /**
   * @description Aria accessible name in Service Workers View of the Application panel
   * @example {3} PH1
   */
  sRegistrationErrors: "{PH1} registration errors",
  /**
   * @description Text in Service Workers View of the Application panel. The Date/time that a service
   * worker version update was received by the webpage.
   * @example {7/3/2019, 3:38:37 PM} PH1
   */
  receivedS: "Received {PH1}",
  /**
   **@description Text in Service Workers View of the Application panel.
   */
  routers: "Routers",
  /**
   * @description Text in Service Workers View of the Application panel
   * @example {example.com} PH1
   */
  sDeleted: "{PH1} - deleted",
  /**
   * @description Text in Service Workers View of the Application panel
   * @example {1} PH1
   * @example {stopped} PH2
   */
  sActivatedAndIsS: "#{PH1} activated and is {PH2}",
  /**
   * @description Text in Service Workers View of the Application panel
   */
  stopString: "Stop",
  /**
   * @description Text in Service Workers View of the Application panel
   */
  startString: "Start",
  /**
   * @description Text in Service Workers View of the Application panel. Service workers have
   * different versions, which are labelled with numbers e.g. version #2. This text indicates that a
   * particular version is now redundant (it was replaced by a newer version). # means 'number' here.
   * @example {2} PH1
   */
  sIsRedundant: "#{PH1} is redundant",
  /**
   * @description Text in Service Workers View of the Application panel
   * @example {2} PH1
   */
  sWaitingToActivate: "#{PH1} waiting to activate",
  /**
   * @description Text in Service Workers View of the Application panel
   * @example {2} PH1
   */
  sTryingToInstall: "#{PH1} trying to install",
  /**
   * @description Text in Service Workers Update Timeline. Update is a noun.
   */
  updateCycle: "Update Cycle",
  /**
   * @description Text of a DOM element in Service Workers View of the Application panel
   * @example {example.com} PH1
   */
  workerS: "Worker: {PH1}",
  /**
   * @description Link text in Service Workers View of the Application panel. When the link is clicked,
   * the focus is moved to the service worker's client page.
   */
  focus: "focus",
  /**
   * @description Link to view all the Service Workers that have been registered.
   */
  seeAllRegistrations: "See all registrations"
};
var str_17 = i18n33.i18n.registerUIStrings("panels/application/ServiceWorkersView.ts", UIStrings17);
var i18nString17 = i18n33.i18n.getLocalizedString.bind(void 0, str_17);
var throttleDisabledForDebugging = false;
var setThrottleDisabledForDebugging = (enable) => {
  throttleDisabledForDebugging = enable;
};
var ServiceWorkersView = class extends UI14.Widget.VBox {
  currentWorkersView;
  toolbar;
  sections;
  manager;
  securityOriginManager;
  sectionToRegistration;
  eventListeners;
  constructor() {
    super({
      jslog: `${VisualLogging9.pane("service-workers")}`,
      useShadowDom: true
    });
    this.registerRequiredCSS(serviceWorkersView_css_default);
    this.currentWorkersView = new UI14.ReportView.ReportView(i18n33.i18n.lockedString("Service workers"));
    this.currentWorkersView.setBodyScrollable(false);
    this.contentElement.classList.add("service-worker-list");
    this.currentWorkersView.show(this.contentElement);
    this.currentWorkersView.element.classList.add("service-workers-this-origin");
    this.currentWorkersView.element.setAttribute("jslog", `${VisualLogging9.section("this-origin")}`);
    this.toolbar = this.currentWorkersView.createToolbar();
    this.sections = /* @__PURE__ */ new Map();
    this.manager = null;
    this.securityOriginManager = null;
    this.sectionToRegistration = /* @__PURE__ */ new WeakMap();
    const othersDiv = this.contentElement.createChild("div", "service-workers-other-origin");
    othersDiv.setAttribute("jslog", `${VisualLogging9.section("other-origin")}`);
    const othersView = new UI14.ReportView.ReportView();
    othersView.setHeaderVisible(false);
    othersView.show(othersDiv);
    const othersSection = othersView.appendSection(i18nString17(UIStrings17.serviceWorkersFromOtherOrigins));
    const othersSectionRow = othersSection.appendRow();
    const seeOthers = UI14.Fragment.html`<a class="devtools-link" role="link" tabindex="0" href="chrome://serviceworker-internals" target="_blank" style="display: inline; cursor: pointer;">${i18nString17(UIStrings17.seeAllRegistrations)}</a>`;
    seeOthers.setAttribute("jslog", `${VisualLogging9.link("view-all").track({ click: true })}`);
    self.onInvokeElement(seeOthers, (event) => {
      const rootTarget = SDK17.TargetManager.TargetManager.instance().rootTarget();
      rootTarget && void rootTarget.targetAgent().invoke_createTarget({ url: "chrome://serviceworker-internals?devtools" });
      event.consume(true);
    });
    othersSectionRow.appendChild(seeOthers);
    this.toolbar.appendToolbarItem(MobileThrottling.ThrottlingManager.throttlingManager().createOfflineToolbarCheckbox());
    const updateOnReloadSetting = Common9.Settings.Settings.instance().createSetting("service-worker-update-on-reload", false);
    updateOnReloadSetting.setTitle(i18nString17(UIStrings17.updateOnReload));
    const forceUpdate = new UI14.Toolbar.ToolbarSettingCheckbox(updateOnReloadSetting, i18nString17(UIStrings17.onPageReloadForceTheService));
    this.toolbar.appendToolbarItem(forceUpdate);
    const bypassServiceWorkerSetting = Common9.Settings.Settings.instance().createSetting("bypass-service-worker", false);
    bypassServiceWorkerSetting.setTitle(i18nString17(UIStrings17.bypassForNetwork));
    const fallbackToNetwork = new UI14.Toolbar.ToolbarSettingCheckbox(bypassServiceWorkerSetting, i18nString17(UIStrings17.bypassTheServiceWorkerAndLoad));
    this.toolbar.appendToolbarItem(fallbackToNetwork);
    this.eventListeners = /* @__PURE__ */ new Map();
    SDK17.TargetManager.TargetManager.instance().observeModels(SDK17.ServiceWorkerManager.ServiceWorkerManager, this);
    this.updateListVisibility();
    const drawerChangeHandler = (event) => {
      const isDrawerOpen = event.detail?.isDrawerOpen;
      if (this.manager && !isDrawerOpen) {
        const { serviceWorkerNetworkRequestsPanelStatus: { isOpen, openedAt } } = this.manager;
        if (isOpen) {
          const networkLocation = UI14.ViewManager.ViewManager.instance().locationNameForViewId("network");
          UI14.ViewManager.ViewManager.instance().showViewInLocation("network", networkLocation, false);
          void Common9.Revealer.reveal(NetworkForward.UIFilter.UIRequestFilter.filters([]));
          const currentTime = Date.now();
          const timeDifference = currentTime - openedAt;
          if (timeDifference < 2e3) {
            Host7.userMetrics.actionTaken(Host7.UserMetrics.Action.ServiceWorkerNetworkRequestClosedQuickly);
          }
          this.manager.serviceWorkerNetworkRequestsPanelStatus = {
            isOpen: false,
            openedAt: 0
          };
        }
      }
    };
    document.body.addEventListener("drawerchange", drawerChangeHandler);
  }
  modelAdded(serviceWorkerManager) {
    if (serviceWorkerManager.target() !== SDK17.TargetManager.TargetManager.instance().primaryPageTarget()) {
      return;
    }
    this.manager = serviceWorkerManager;
    this.securityOriginManager = serviceWorkerManager.target().model(SDK17.SecurityOriginManager.SecurityOriginManager);
    for (const registration of this.manager.registrations().values()) {
      this.updateRegistration(registration);
    }
    this.eventListeners.set(serviceWorkerManager, [
      this.manager.addEventListener("RegistrationUpdated", this.registrationUpdated, this),
      this.manager.addEventListener("RegistrationDeleted", this.registrationDeleted, this),
      this.securityOriginManager.addEventListener(SDK17.SecurityOriginManager.Events.SecurityOriginAdded, this.updateSectionVisibility, this),
      this.securityOriginManager.addEventListener(SDK17.SecurityOriginManager.Events.SecurityOriginRemoved, this.updateSectionVisibility, this)
    ]);
  }
  modelRemoved(serviceWorkerManager) {
    if (!this.manager || this.manager !== serviceWorkerManager) {
      return;
    }
    Common9.EventTarget.removeEventListeners(this.eventListeners.get(serviceWorkerManager) || []);
    this.eventListeners.delete(serviceWorkerManager);
    this.manager = null;
    this.securityOriginManager = null;
  }
  getTimeStamp(registration) {
    const versions = registration.versionsByMode();
    let timestamp = 0;
    const active = versions.get(
      "active"
      /* SDK.ServiceWorkerManager.ServiceWorkerVersion.Modes.ACTIVE */
    );
    const installing = versions.get(
      "installing"
      /* SDK.ServiceWorkerManager.ServiceWorkerVersion.Modes.INSTALLING */
    );
    const waiting = versions.get(
      "waiting"
      /* SDK.ServiceWorkerManager.ServiceWorkerVersion.Modes.WAITING */
    );
    const redundant = versions.get(
      "redundant"
      /* SDK.ServiceWorkerManager.ServiceWorkerVersion.Modes.REDUNDANT */
    );
    if (active) {
      timestamp = active.scriptResponseTime;
    } else if (waiting) {
      timestamp = waiting.scriptResponseTime;
    } else if (installing) {
      timestamp = installing.scriptResponseTime;
    } else if (redundant) {
      timestamp = redundant.scriptResponseTime;
    }
    return timestamp || 0;
  }
  updateSectionVisibility() {
    let hasThis = false;
    const movedSections = [];
    for (const section8 of this.sections.values()) {
      const expectedView = this.getReportViewForOrigin(section8.registration.securityOrigin);
      hasThis = hasThis || expectedView === this.currentWorkersView;
      if (section8.section.parentWidget() !== expectedView) {
        movedSections.push(section8);
      }
    }
    for (const section8 of movedSections) {
      const registration = section8.registration;
      this.removeRegistrationFromList(registration);
      this.updateRegistration(registration, true);
    }
    this.currentWorkersView.sortSections((aSection, bSection) => {
      const aRegistration = this.sectionToRegistration.get(aSection);
      const bRegistration = this.sectionToRegistration.get(bSection);
      const aTimestamp = aRegistration ? this.getTimeStamp(aRegistration) : 0;
      const bTimestamp = bRegistration ? this.getTimeStamp(bRegistration) : 0;
      return bTimestamp - aTimestamp;
    });
    for (const section8 of this.sections.values()) {
      if (section8.section.parentWidget() === this.currentWorkersView || this.isRegistrationVisible(section8.registration)) {
        section8.section.showWidget();
      } else {
        section8.section.hideWidget();
      }
    }
    this.contentElement.classList.toggle("service-worker-has-current", Boolean(hasThis));
    this.updateListVisibility();
  }
  registrationUpdated(event) {
    this.updateRegistration(event.data);
    this.gcRegistrations();
  }
  gcRegistrations() {
    if (!this.manager || !this.securityOriginManager) {
      return;
    }
    let hasNonDeletedRegistrations = false;
    const securityOrigins = new Set(this.securityOriginManager.securityOrigins());
    for (const registration of this.manager.registrations().values()) {
      if (!securityOrigins.has(registration.securityOrigin) && !this.isRegistrationVisible(registration)) {
        continue;
      }
      if (!registration.canBeRemoved()) {
        hasNonDeletedRegistrations = true;
        break;
      }
    }
    if (!hasNonDeletedRegistrations) {
      return;
    }
    for (const registration of this.manager.registrations().values()) {
      const visible = securityOrigins.has(registration.securityOrigin) || this.isRegistrationVisible(registration);
      if (!visible && registration.canBeRemoved()) {
        this.removeRegistrationFromList(registration);
      }
    }
  }
  getReportViewForOrigin(origin) {
    if (this.securityOriginManager && (this.securityOriginManager.securityOrigins().includes(origin) || this.securityOriginManager.unreachableMainSecurityOrigin() === origin)) {
      return this.currentWorkersView;
    }
    return null;
  }
  updateRegistration(registration, skipUpdate) {
    let section8 = this.sections.get(registration);
    if (!section8) {
      const title = registration.scopeURL;
      const reportView = this.getReportViewForOrigin(registration.securityOrigin);
      if (!reportView) {
        return;
      }
      const uiSection = reportView.appendSection(title);
      uiSection.setUiGroupTitle(i18nString17(UIStrings17.serviceWorkerForS, { PH1: title }));
      this.sectionToRegistration.set(uiSection, registration);
      section8 = new Section(this.manager, uiSection, registration);
      this.sections.set(registration, section8);
    }
    if (skipUpdate) {
      return;
    }
    this.updateSectionVisibility();
    section8.scheduleUpdate();
  }
  registrationDeleted(event) {
    this.removeRegistrationFromList(event.data);
  }
  removeRegistrationFromList(registration) {
    const section8 = this.sections.get(registration);
    if (section8) {
      section8.section.detach();
    }
    this.sections.delete(registration);
    this.updateSectionVisibility();
  }
  isRegistrationVisible(registration) {
    if (!registration.scopeURL) {
      return true;
    }
    return false;
  }
  updateListVisibility() {
    this.contentElement.classList.toggle("service-worker-list-empty", this.sections.size === 0);
  }
};
var Section = class {
  manager;
  section;
  registration;
  fingerprint;
  pushNotificationDataSetting;
  syncTagNameSetting;
  periodicSyncTagNameSetting;
  updateCycleView;
  routerView;
  networkRequests;
  updateButton;
  deleteButton;
  sourceField;
  statusField;
  clientsField;
  clientInfoCache;
  throttler;
  updateCycleField;
  routerField;
  constructor(manager, section8, registration) {
    this.manager = manager;
    this.section = section8;
    this.registration = registration;
    this.fingerprint = null;
    this.pushNotificationDataSetting = Common9.Settings.Settings.instance().createLocalSetting("push-data", i18nString17(UIStrings17.testPushMessageFromDevtools));
    this.syncTagNameSetting = Common9.Settings.Settings.instance().createLocalSetting("sync-tag-name", "test-tag-from-devtools");
    this.periodicSyncTagNameSetting = Common9.Settings.Settings.instance().createLocalSetting("periodic-sync-tag-name", "test-tag-from-devtools");
    this.updateCycleView = new ServiceWorkerUpdateCycleView(registration);
    this.routerView = new ApplicationComponents9.ServiceWorkerRouterView.ServiceWorkerRouterView();
    this.networkRequests = new Buttons5.Button.Button();
    this.networkRequests.data = {
      iconName: "bottom-panel-open",
      variant: "text",
      title: i18nString17(UIStrings17.networkRequests),
      jslogContext: "show-network-requests"
    };
    this.networkRequests.textContent = i18nString17(UIStrings17.networkRequests);
    this.networkRequests.addEventListener("click", this.networkRequestsClicked.bind(this));
    this.section.appendButtonToHeader(this.networkRequests);
    this.updateButton = UI14.UIUtils.createTextButton(i18nString17(UIStrings17.update), this.updateButtonClicked.bind(this), { variant: "text", title: i18nString17(UIStrings17.update), jslogContext: "update" });
    this.section.appendButtonToHeader(this.updateButton);
    this.deleteButton = UI14.UIUtils.createTextButton(i18nString17(UIStrings17.unregister), this.unregisterButtonClicked.bind(this), {
      variant: "text",
      title: i18nString17(UIStrings17.unregisterServiceWorker),
      jslogContext: "unregister"
    });
    this.section.appendButtonToHeader(this.deleteButton);
    this.sourceField = this.wrapWidget(this.section.appendField(i18nString17(UIStrings17.source)));
    this.statusField = this.wrapWidget(this.section.appendField(i18nString17(UIStrings17.status)));
    this.clientsField = this.wrapWidget(this.section.appendField(i18nString17(UIStrings17.clients)));
    this.createSyncNotificationField(i18nString17(UIStrings17.pushString), this.pushNotificationDataSetting.get(), i18nString17(UIStrings17.pushData), this.push.bind(this), "push-message");
    this.createSyncNotificationField(i18nString17(UIStrings17.syncString), this.syncTagNameSetting.get(), i18nString17(UIStrings17.syncTag), this.sync.bind(this), "sync-tag");
    this.createSyncNotificationField(i18nString17(UIStrings17.periodicSync), this.periodicSyncTagNameSetting.get(), i18nString17(UIStrings17.periodicSyncTag), (tag) => this.periodicSync(tag), "periodic-sync-tag");
    this.createUpdateCycleField();
    this.maybeCreateRouterField();
    this.clientInfoCache = /* @__PURE__ */ new Map();
    this.throttler = new Common9.Throttler.Throttler(500);
  }
  createSyncNotificationField(label, initialValue, placeholder, callback, jslogContext) {
    const form = this.wrapWidget(this.section.appendField(label)).createChild("form", "service-worker-editor-with-button");
    const editor = UI14.UIUtils.createInput("source-code service-worker-notification-editor");
    editor.setAttribute("jslog", `${VisualLogging9.textField().track({ change: true }).context(jslogContext)}`);
    form.appendChild(editor);
    const button = UI14.UIUtils.createTextButton(label, void 0, { jslogContext });
    button.type = "submit";
    form.appendChild(button);
    editor.value = initialValue;
    editor.placeholder = placeholder;
    UI14.ARIAUtils.setLabel(editor, label);
    form.addEventListener("submit", (e) => {
      callback(editor.value || "");
      e.consume(true);
    });
  }
  scheduleUpdate() {
    if (throttleDisabledForDebugging) {
      void this.update();
      return;
    }
    void this.throttler.schedule(this.update.bind(this));
  }
  addVersion(versionsStack, icon, label) {
    const installingEntry = versionsStack.createChild("div", "service-worker-version");
    installingEntry.createChild("div", icon);
    const statusString = installingEntry.createChild("span", "service-worker-version-string");
    statusString.textContent = label;
    UI14.ARIAUtils.markAsAlert(statusString);
    return installingEntry;
  }
  updateClientsField(version) {
    this.clientsField.removeChildren();
    this.section.setFieldVisible(i18nString17(UIStrings17.clients), Boolean(version.controlledClients.length));
    for (const client of version.controlledClients) {
      const clientLabelText = this.clientsField.createChild("div", "service-worker-client");
      const info = this.clientInfoCache.get(client);
      if (info) {
        this.updateClientInfo(clientLabelText, info);
      }
      void this.manager.target().targetAgent().invoke_getTargetInfo({ targetId: client }).then(this.onClientInfo.bind(this, clientLabelText));
    }
  }
  updateSourceField(version) {
    this.sourceField.removeChildren();
    const fileName = Common9.ParsedURL.ParsedURL.extractName(version.scriptURL);
    const name = this.sourceField.createChild("div", "report-field-value-filename");
    const link3 = Components2.Linkifier.Linkifier.linkifyURL(version.scriptURL, { text: fileName });
    link3.tabIndex = 0;
    link3.setAttribute("jslog", `${VisualLogging9.link("source-location").track({ click: true })}`);
    name.appendChild(link3);
    if (this.registration.errors.length) {
      const errorsLabel = UI14.UIUtils.createIconLabel({
        title: String(this.registration.errors.length),
        iconName: "cross-circle-filled",
        color: "var(--icon-error)"
      });
      errorsLabel.classList.add("devtools-link", "link");
      errorsLabel.tabIndex = 0;
      UI14.ARIAUtils.setLabel(errorsLabel, i18nString17(UIStrings17.sRegistrationErrors, { PH1: this.registration.errors.length }));
      self.onInvokeElement(errorsLabel, () => Common9.Console.Console.instance().show());
      name.appendChild(errorsLabel);
    }
    if (version.scriptResponseTime !== void 0) {
      this.sourceField.createChild("div", "report-field-value-subtitle").textContent = i18nString17(UIStrings17.receivedS, { PH1: new Date(version.scriptResponseTime * 1e3).toLocaleString() });
    }
  }
  update() {
    const fingerprint = this.registration.fingerprint();
    if (fingerprint === this.fingerprint) {
      return Promise.resolve();
    }
    this.fingerprint = fingerprint;
    this.section.setHeaderButtonsState(this.registration.isDeleted);
    const versions = this.registration.versionsByMode();
    const scopeURL = this.registration.scopeURL;
    const title = this.registration.isDeleted ? i18nString17(UIStrings17.sDeleted, { PH1: scopeURL }) : scopeURL;
    this.section.setTitle(title);
    const active = versions.get(
      "active"
      /* SDK.ServiceWorkerManager.ServiceWorkerVersion.Modes.ACTIVE */
    );
    const waiting = versions.get(
      "waiting"
      /* SDK.ServiceWorkerManager.ServiceWorkerVersion.Modes.WAITING */
    );
    const installing = versions.get(
      "installing"
      /* SDK.ServiceWorkerManager.ServiceWorkerVersion.Modes.INSTALLING */
    );
    const redundant = versions.get(
      "redundant"
      /* SDK.ServiceWorkerManager.ServiceWorkerVersion.Modes.REDUNDANT */
    );
    this.statusField.removeChildren();
    const versionsStack = this.statusField.createChild("div", "service-worker-version-stack");
    versionsStack.createChild("div", "service-worker-version-stack-bar");
    if (active) {
      this.updateSourceField(active);
      const localizedRunningStatus = SDK17.ServiceWorkerManager.ServiceWorkerVersion.RunningStatus[active.currentState.runningStatus]();
      const activeEntry = this.addVersion(versionsStack, "service-worker-active-circle", i18nString17(UIStrings17.sActivatedAndIsS, { PH1: active.id, PH2: localizedRunningStatus }));
      if (active.isRunning() || active.isStarting()) {
        const stopButton = UI14.UIUtils.createTextButton(i18nString17(UIStrings17.stopString), this.stopButtonClicked.bind(this, active.id), { jslogContext: "stop" });
        activeEntry.appendChild(stopButton);
      } else if (active.isStartable()) {
        const startButton = UI14.UIUtils.createTextButton(i18nString17(UIStrings17.startString), this.startButtonClicked.bind(this), { jslogContext: "start" });
        activeEntry.appendChild(startButton);
      }
      this.updateClientsField(active);
      this.maybeCreateRouterField();
    } else if (redundant) {
      this.updateSourceField(redundant);
      this.addVersion(versionsStack, "service-worker-redundant-circle", i18nString17(UIStrings17.sIsRedundant, { PH1: redundant.id }));
      this.updateClientsField(redundant);
    }
    if (waiting) {
      const waitingEntry = this.addVersion(versionsStack, "service-worker-waiting-circle", i18nString17(UIStrings17.sWaitingToActivate, { PH1: waiting.id }));
      const skipWaitingButton = UI14.UIUtils.createTextButton(i18n33.i18n.lockedString("skipWaiting"), this.skipButtonClicked.bind(this), {
        title: i18n33.i18n.lockedString("skipWaiting"),
        jslogContext: "skip-waiting"
      });
      waitingEntry.appendChild(skipWaitingButton);
      if (waiting.scriptResponseTime !== void 0) {
        waitingEntry.createChild("div", "service-worker-subtitle").textContent = i18nString17(UIStrings17.receivedS, { PH1: new Date(waiting.scriptResponseTime * 1e3).toLocaleString() });
      }
    }
    if (installing) {
      const installingEntry = this.addVersion(versionsStack, "service-worker-installing-circle", i18nString17(UIStrings17.sTryingToInstall, { PH1: installing.id }));
      if (installing.scriptResponseTime !== void 0) {
        installingEntry.createChild("div", "service-worker-subtitle").textContent = i18nString17(UIStrings17.receivedS, {
          PH1: new Date(installing.scriptResponseTime * 1e3).toLocaleString()
        });
      }
    }
    this.updateCycleView.refresh();
    return Promise.resolve();
  }
  unregisterButtonClicked() {
    this.manager.deleteRegistration(this.registration.id);
  }
  createUpdateCycleField() {
    this.updateCycleField = this.wrapWidget(this.section.appendField(i18nString17(UIStrings17.updateCycle)));
    this.updateCycleField.appendChild(this.updateCycleView.tableElement);
  }
  maybeCreateRouterField() {
    const versions = this.registration.versionsByMode();
    const active = versions.get(
      "active"
      /* SDK.ServiceWorkerManager.ServiceWorkerVersion.Modes.ACTIVE */
    );
    const title = i18nString17(UIStrings17.routers);
    if (active?.routerRules && active.routerRules.length > 0) {
      if (!this.routerField) {
        this.routerField = this.wrapWidget(this.section.appendField(title));
      }
      if (!this.routerField.lastElementChild) {
        this.routerField.appendChild(this.routerView);
      }
      this.routerView.update(active.routerRules);
    } else {
      this.section.removeField(title);
      this.routerField = void 0;
    }
  }
  updateButtonClicked() {
    void this.manager.updateRegistration(this.registration.id);
  }
  networkRequestsClicked() {
    const applicationTabLocation = UI14.ViewManager.ViewManager.instance().locationNameForViewId("resources");
    const networkTabLocation = applicationTabLocation === "drawer-view" ? "panel" : "drawer-view";
    UI14.ViewManager.ViewManager.instance().showViewInLocation("network", networkTabLocation);
    void Common9.Revealer.reveal(NetworkForward.UIFilter.UIRequestFilter.filters([
      {
        filterType: NetworkForward.UIFilter.FilterType.Is,
        filterValue: "service-worker-intercepted"
      }
    ]));
    const requests = Logs.NetworkLog.NetworkLog.instance().requests();
    let lastRequest = null;
    if (Array.isArray(requests)) {
      for (const request of requests) {
        if (!lastRequest && request.fetchedViaServiceWorker) {
          lastRequest = request;
        }
        if (request.fetchedViaServiceWorker && lastRequest && lastRequest.responseReceivedTime < request.responseReceivedTime) {
          lastRequest = request;
        }
      }
    }
    if (lastRequest) {
      const requestLocation = NetworkForward.UIRequestLocation.UIRequestLocation.tab(lastRequest, "timing", { clearFilter: false });
      void Common9.Revealer.reveal(requestLocation);
    }
    this.manager.serviceWorkerNetworkRequestsPanelStatus = {
      isOpen: true,
      openedAt: Date.now()
    };
    Host7.userMetrics.actionTaken(Host7.UserMetrics.Action.ServiceWorkerNetworkRequestClicked);
  }
  push(data) {
    this.pushNotificationDataSetting.set(data);
    void this.manager.deliverPushMessage(this.registration.id, data);
  }
  sync(tag) {
    this.syncTagNameSetting.set(tag);
    void this.manager.dispatchSyncEvent(this.registration.id, tag, true);
  }
  periodicSync(tag) {
    this.periodicSyncTagNameSetting.set(tag);
    void this.manager.dispatchPeriodicSyncEvent(this.registration.id, tag);
  }
  onClientInfo(element, targetInfoResponse) {
    const targetInfo = targetInfoResponse.targetInfo;
    if (!targetInfo) {
      return;
    }
    this.clientInfoCache.set(targetInfo.targetId, targetInfo);
    this.updateClientInfo(element, targetInfo);
  }
  updateClientInfo(element, targetInfo) {
    if (targetInfo.type !== "page" && targetInfo.type === "iframe") {
      const clientString2 = element.createChild("span", "service-worker-client-string");
      UI14.UIUtils.createTextChild(clientString2, i18nString17(UIStrings17.workerS, { PH1: targetInfo.url }));
      return;
    }
    element.removeChildren();
    const clientString = element.createChild("span", "service-worker-client-string");
    UI14.UIUtils.createTextChild(clientString, targetInfo.url);
    const focusButton = new Buttons5.Button.Button();
    focusButton.data = {
      iconName: "select-element",
      variant: "icon",
      size: "SMALL",
      title: i18nString17(UIStrings17.focus),
      jslogContext: "client-focus"
    };
    focusButton.className = "service-worker-client-focus-link";
    focusButton.addEventListener("click", this.activateTarget.bind(this, targetInfo.targetId));
    element.appendChild(focusButton);
  }
  activateTarget(targetId) {
    void this.manager.target().targetAgent().invoke_activateTarget({ targetId });
  }
  startButtonClicked() {
    void this.manager.startWorker(this.registration.scopeURL);
  }
  skipButtonClicked() {
    void this.manager.skipWaiting(this.registration.scopeURL);
  }
  stopButtonClicked(versionId) {
    void this.manager.stopWorker(versionId);
  }
  wrapWidget(container) {
    const shadowRoot = UI14.UIUtils.createShadowRootWithCoreStyles(container, {
      cssFile: [
        serviceWorkersView_css_default,
        /* These styles are for the timing table in serviceWorkerUpdateCycleView but this is the widget that it is rendered
           * inside so we are registering the files here. */
        serviceWorkerUpdateCycleView_css_default
      ]
    });
    const contentElement = document.createElement("div");
    shadowRoot.appendChild(contentElement);
    return contentElement;
  }
};

// gen/front_end/panels/application/SharedStorageListTreeElement.js
var SharedStorageListTreeElement_exports = {};
__export(SharedStorageListTreeElement_exports, {
  SharedStorageListTreeElement: () => SharedStorageListTreeElement
});
import * as Common10 from "./../../core/common/common.js";
import * as i18n37 from "./../../core/i18n/i18n.js";
import * as IconButton9 from "./../../ui/components/icon_button/icon_button.js";

// gen/front_end/panels/application/SharedStorageEventsView.js
var SharedStorageEventsView_exports = {};
__export(SharedStorageEventsView_exports, {
  SharedStorageEventsView: () => SharedStorageEventsView
});
import * as i18n35 from "./../../core/i18n/i18n.js";
import * as SDK18 from "./../../core/sdk/sdk.js";
import * as SourceFrame3 from "./../../ui/legacy/components/source_frame/source_frame.js";
import * as UI15 from "./../../ui/legacy/legacy.js";
import * as VisualLogging10 from "./../../ui/visual_logging/visual_logging.js";
import * as ApplicationComponents10 from "./components/components.js";

// gen/front_end/panels/application/sharedStorageEventsView.css.js
var sharedStorageEventsView_css_default = `/*
 * Copyright 2022 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

devtools-shared-storage-access-grid {
  overflow: auto;
}

/*# sourceURL=${import.meta.resolve("./sharedStorageEventsView.css")} */`;

// gen/front_end/panels/application/SharedStorageEventsView.js
var UIStrings18 = {
  /**
   * @description Placeholder text if no shared storage event has been selected.
   * Shared storage allows to store and access data that can be shared across different sites.
   * A shared storage event is for example an access from a site to that storage.
   */
  noEventSelected: "No shared storage event selected",
  /**
   * @description Placeholder text instructing the user how to display shared
   * storage event details.
   * Shared storage allows to store and access data that can be shared across different sites.
   * A shared storage event is for example an access from a site to that storage.
   */
  clickToDisplayBody: "Click on any shared storage event to display the event parameters"
};
var str_18 = i18n35.i18n.registerUIStrings("panels/application/SharedStorageEventsView.ts", UIStrings18);
var i18nString18 = i18n35.i18n.getLocalizedString.bind(void 0, str_18);
function eventEquals2(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
var SharedStorageEventsView = class extends UI15.SplitWidget.SplitWidget {
  #sharedStorageEventGrid = new ApplicationComponents10.SharedStorageAccessGrid.SharedStorageAccessGrid();
  #events = [];
  #noDisplayView;
  #defaultId = "";
  constructor() {
    super(
      /* isVertical */
      false,
      /* secondIsSidebar: */
      true
    );
    this.element.setAttribute("jslog", `${VisualLogging10.pane("shared-storage-events")}`);
    this.#noDisplayView = new UI15.EmptyWidget.EmptyWidget(i18nString18(UIStrings18.noEventSelected), i18nString18(UIStrings18.clickToDisplayBody));
    this.#noDisplayView.setMinimumSize(0, 40);
    this.#sharedStorageEventGrid.setMinimumSize(0, 80);
    this.#sharedStorageEventGrid.onSelect = this.#onFocus.bind(this);
    this.setMainWidget(this.#sharedStorageEventGrid);
    this.setSidebarWidget(this.#noDisplayView);
    this.hideSidebar();
    this.#getMainFrameResourceTreeModel()?.addEventListener(SDK18.ResourceTreeModel.Events.PrimaryPageChanged, this.clearEvents, this);
  }
  #getMainFrameResourceTreeModel() {
    const primaryPageTarget = SDK18.TargetManager.TargetManager.instance().primaryPageTarget();
    return primaryPageTarget?.model(SDK18.ResourceTreeModel.ResourceTreeModel) || null;
  }
  #getMainFrame() {
    return this.#getMainFrameResourceTreeModel()?.mainFrame || null;
  }
  get id() {
    return this.#getMainFrame()?.id || this.#defaultId;
  }
  wasShown() {
    super.wasShown();
    const sidebar = this.sidebarWidget();
    if (sidebar) {
      sidebar.registerRequiredCSS(sharedStorageEventsView_css_default);
    }
  }
  addEvent(event) {
    if (event.mainFrameId !== this.id) {
      return;
    }
    if (this.#events.some((t) => eventEquals2(t, event))) {
      return;
    }
    if (this.showMode() !== "Both") {
      this.showBoth();
    }
    this.#events.push(event);
    this.#sharedStorageEventGrid.events = this.#events;
  }
  clearEvents() {
    this.#events = [];
    this.#sharedStorageEventGrid.events = this.#events;
    this.setSidebarWidget(this.#noDisplayView);
    this.hideSidebar();
  }
  #onFocus(event) {
    const jsonView = SourceFrame3.JSONView.JSONView.createViewSync(event);
    jsonView.setMinimumSize(0, 40);
    this.setSidebarWidget(jsonView);
  }
  setDefaultIdForTesting(id) {
    this.#defaultId = id;
  }
  getEventsForTesting() {
    return this.#events;
  }
  getSharedStorageAccessGridForTesting() {
    return this.#sharedStorageEventGrid;
  }
};

// gen/front_end/panels/application/SharedStorageListTreeElement.js
var UIStrings19 = {
  /**
   * @description Text in SharedStorage Category View of the Application panel
   */
  sharedStorage: "Shared storage"
};
var str_19 = i18n37.i18n.registerUIStrings("panels/application/SharedStorageListTreeElement.ts", UIStrings19);
var i18nString19 = i18n37.i18n.getLocalizedString.bind(void 0, str_19);
var SharedStorageListTreeElement = class extends ApplicationPanelTreeElement {
  #expandedSetting;
  view;
  constructor(resourcesPanel, expandedSettingsDefault = false) {
    super(resourcesPanel, i18nString19(UIStrings19.sharedStorage), false, "shared-storage");
    this.#expandedSetting = Common10.Settings.Settings.instance().createSetting("resources-shared-storage-expanded", expandedSettingsDefault);
    const sharedStorageIcon = IconButton9.Icon.create("database");
    this.setLeadingIcons([sharedStorageIcon]);
    this.view = new SharedStorageEventsView();
  }
  get itemURL() {
    return "shared-storage://";
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    this.resourcesPanel.showView(this.view);
    return false;
  }
  onattach() {
    super.onattach();
    if (this.#expandedSetting.get()) {
      this.expand();
    }
  }
  onexpand() {
    this.#expandedSetting.set(true);
  }
  oncollapse() {
    this.#expandedSetting.set(false);
  }
  addEvent(event) {
    this.view.addEvent(event);
  }
};

// gen/front_end/panels/application/SharedStorageModel.js
var SharedStorageModel_exports = {};
__export(SharedStorageModel_exports, {
  SharedStorageForOrigin: () => SharedStorageForOrigin,
  SharedStorageModel: () => SharedStorageModel
});
import * as Common11 from "./../../core/common/common.js";
import * as SDK19 from "./../../core/sdk/sdk.js";
var SharedStorageForOrigin = class extends Common11.ObjectWrapper.ObjectWrapper {
  #model;
  #securityOrigin;
  constructor(model, securityOrigin) {
    super();
    this.#model = model;
    this.#securityOrigin = securityOrigin;
  }
  get securityOrigin() {
    return this.#securityOrigin;
  }
  async getMetadata() {
    return await this.#model.storageAgent.invoke_getSharedStorageMetadata({ ownerOrigin: this.securityOrigin }).then(({ metadata }) => metadata);
  }
  async getEntries() {
    return await this.#model.storageAgent.invoke_getSharedStorageEntries({ ownerOrigin: this.securityOrigin }).then(({ entries }) => entries);
  }
  async setEntry(key, value, ignoreIfPresent) {
    await this.#model.storageAgent.invoke_setSharedStorageEntry({ ownerOrigin: this.securityOrigin, key, value, ignoreIfPresent });
  }
  async deleteEntry(key) {
    await this.#model.storageAgent.invoke_deleteSharedStorageEntry({ ownerOrigin: this.securityOrigin, key });
  }
  async clear() {
    await this.#model.storageAgent.invoke_clearSharedStorageEntries({ ownerOrigin: this.securityOrigin });
  }
  async resetBudget() {
    await this.#model.storageAgent.invoke_resetSharedStorageBudget({ ownerOrigin: this.securityOrigin });
  }
};
var SharedStorageModel = class extends SDK19.SDKModel.SDKModel {
  #securityOriginManager;
  #storages;
  storageAgent;
  #enabled;
  constructor(target) {
    super(target);
    target.registerStorageDispatcher(this);
    this.#securityOriginManager = target.model(SDK19.SecurityOriginManager.SecurityOriginManager);
    this.#storages = /* @__PURE__ */ new Map();
    this.storageAgent = target.storageAgent();
    this.#enabled = false;
  }
  async enable() {
    if (this.#enabled) {
      return;
    }
    this.#securityOriginManager.addEventListener(SDK19.SecurityOriginManager.Events.SecurityOriginAdded, this.#securityOriginAdded, this);
    this.#securityOriginManager.addEventListener(SDK19.SecurityOriginManager.Events.SecurityOriginRemoved, this.#securityOriginRemoved, this);
    await this.storageAgent.invoke_setSharedStorageTracking({ enable: true });
    this.#addAllOrigins();
    this.#enabled = true;
  }
  disable() {
    if (!this.#enabled) {
      return;
    }
    this.#securityOriginManager.removeEventListener(SDK19.SecurityOriginManager.Events.SecurityOriginAdded, this.#securityOriginAdded, this);
    this.#securityOriginManager.removeEventListener(SDK19.SecurityOriginManager.Events.SecurityOriginRemoved, this.#securityOriginRemoved, this);
    void this.storageAgent.invoke_setSharedStorageTracking({ enable: false });
    this.#removeAllOrigins();
    this.#enabled = false;
  }
  dispose() {
    this.disable();
  }
  #addAllOrigins() {
    for (const securityOrigin of this.#securityOriginManager.securityOrigins()) {
      void this.#maybeAddOrigin(securityOrigin);
    }
  }
  #removeAllOrigins() {
    for (const securityOrigin of this.#storages.keys()) {
      this.#removeOrigin(securityOrigin);
    }
  }
  #securityOriginAdded(event) {
    this.#maybeAddOrigin(event.data);
  }
  #maybeAddOrigin(securityOrigin) {
    const parsedSecurityOrigin = new Common11.ParsedURL.ParsedURL(securityOrigin);
    if (!parsedSecurityOrigin.isValid || parsedSecurityOrigin.scheme === "data" || parsedSecurityOrigin.scheme === "about" || parsedSecurityOrigin.scheme === "javascript") {
      return;
    }
    if (this.#storages.has(securityOrigin)) {
      return;
    }
    const storage = new SharedStorageForOrigin(this, securityOrigin);
    this.#storages.set(securityOrigin, storage);
    this.dispatchEventToListeners("SharedStorageAdded", storage);
  }
  #securityOriginRemoved(event) {
    this.#removeOrigin(event.data);
  }
  #removeOrigin(securityOrigin) {
    const storage = this.storageForOrigin(securityOrigin);
    if (!storage) {
      return;
    }
    this.#storages.delete(securityOrigin);
    this.dispatchEventToListeners("SharedStorageRemoved", storage);
  }
  storages() {
    return this.#storages.values();
  }
  storageForOrigin(origin) {
    return this.#storages.get(origin) || null;
  }
  numStoragesForTesting() {
    return this.#storages.size;
  }
  isChangeEvent(event) {
    return [
      "set",
      "append",
      "delete",
      "clear"
    ].includes(event.method);
  }
  sharedStorageAccessed(event) {
    if (this.isChangeEvent(event)) {
      const sharedStorage = this.storageForOrigin(event.ownerOrigin);
      if (sharedStorage) {
        const eventData = {
          accessTime: event.accessTime,
          method: event.method,
          mainFrameId: event.mainFrameId,
          ownerSite: event.ownerSite,
          params: event.params,
          scope: event.scope
        };
        sharedStorage.dispatchEventToListeners("SharedStorageChanged", eventData);
      } else {
        void this.#maybeAddOrigin(event.ownerOrigin);
      }
    }
    this.dispatchEventToListeners("SharedStorageAccess", event);
  }
  sharedStorageWorkletOperationExecutionFinished(_event) {
  }
  attributionReportingTriggerRegistered(_event) {
  }
  indexedDBListUpdated(_event) {
  }
  indexedDBContentUpdated(_event) {
  }
  cacheStorageListUpdated(_event) {
  }
  cacheStorageContentUpdated(_event) {
  }
  interestGroupAccessed(_event) {
  }
  interestGroupAuctionEventOccurred(_event) {
  }
  interestGroupAuctionNetworkRequestCreated(_event) {
  }
  storageBucketCreatedOrUpdated(_event) {
  }
  storageBucketDeleted(_event) {
  }
  attributionReportingSourceRegistered(_event) {
  }
  attributionReportingReportSent(_event) {
  }
  attributionReportingVerboseDebugReportSent(_event) {
  }
};
SDK19.SDKModel.SDKModel.register(SharedStorageModel, { capabilities: 8192, autostart: false });

// gen/front_end/panels/application/SharedStorageTreeElement.js
var SharedStorageTreeElement_exports = {};
__export(SharedStorageTreeElement_exports, {
  SharedStorageTreeElement: () => SharedStorageTreeElement
});
import * as VisualLogging13 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/application/SharedStorageItemsView.js
var SharedStorageItemsView_exports = {};
__export(SharedStorageItemsView_exports, {
  SharedStorageItemsView: () => SharedStorageItemsView
});
import * as Common13 from "./../../core/common/common.js";
import * as i18n43 from "./../../core/i18n/i18n.js";
import * as SourceFrame4 from "./../../ui/legacy/components/source_frame/source_frame.js";
import * as UI18 from "./../../ui/legacy/legacy.js";
import * as ApplicationComponents13 from "./components/components.js";

// gen/front_end/panels/application/KeyValueStorageItemsView.js
var KeyValueStorageItemsView_exports = {};
__export(KeyValueStorageItemsView_exports, {
  KeyValueStorageItemsView: () => KeyValueStorageItemsView
});
import * as i18n41 from "./../../core/i18n/i18n.js";
import * as Geometry from "./../../models/geometry/geometry.js";
import * as UI17 from "./../../ui/legacy/legacy.js";
import { Directives as LitDirectives, html as html5, nothing as nothing2, render as render4 } from "./../../ui/lit/lit.js";
import * as VisualLogging12 from "./../../ui/visual_logging/visual_logging.js";
import * as ApplicationComponents12 from "./components/components.js";

// gen/front_end/panels/application/StorageItemsToolbar.js
var StorageItemsToolbar_exports = {};
__export(StorageItemsToolbar_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW2,
  StorageItemsToolbar: () => StorageItemsToolbar
});
import "./../../ui/legacy/legacy.js";
import * as Common12 from "./../../core/common/common.js";
import * as i18n39 from "./../../core/i18n/i18n.js";
import * as Platform4 from "./../../core/platform/platform.js";
import * as Buttons6 from "./../../ui/components/buttons/buttons.js";
import * as UI16 from "./../../ui/legacy/legacy.js";
import * as Lit2 from "./../../ui/lit/lit.js";
import * as VisualLogging11 from "./../../ui/visual_logging/visual_logging.js";
import * as ApplicationComponents11 from "./components/components.js";
var UIStrings20 = {
  /**
   * @description Text to refresh the page
   */
  refresh: "Refresh",
  /**
   * @description Text to clear everything
   */
  clearAll: "Clear All",
  /**
   * @description Tooltip text that appears when hovering over the largeicon delete button in the Service Worker Cache Views of the Application panel
   */
  deleteSelected: "Delete Selected",
  /**
   * @description Text that informs screen reader users that the storage table has been refreshed
   */
  refreshedStatus: "Table refreshed"
};
var str_20 = i18n39.i18n.registerUIStrings("panels/application/StorageItemsToolbar.ts", UIStrings20);
var i18nString20 = i18n39.i18n.getLocalizedString.bind(void 0, str_20);
var { html: html4, render: render3 } = Lit2;
var DEFAULT_VIEW2 = (input, _output, target) => {
  render3(
    // clang-format off
    html4`
      <devtools-toolbar class="top-resources-toolbar"
                        jslog=${VisualLogging11.toolbar()}>
        <devtools-button title=${i18nString20(UIStrings20.refresh)}
                         jslog=${VisualLogging11.action("storage-items-view.refresh").track({
      click: true
    })}
                         @click=${input.onRefresh}
                         .iconName=${"refresh"}
                         .variant=${"toolbar"}></devtools-button>
        <devtools-toolbar-input type="filter"
                                ?disabled=${!input.filterItemEnabled}
                                @change=${input.onFilterChanged}
                                style="flex-grow:0.4"></devtools-toolbar-input>
        ${new UI16.Toolbar.ToolbarSeparator().element}
        <devtools-button title=${input.deleteAllButtonTitle}
                         @click=${input.onDeleteAll}
                         id=storage-items-delete-all
                         ?disabled=${!input.deleteAllButtonEnabled}
                         jslog=${VisualLogging11.action("storage-items-view.clear-all").track({
      click: true
    })}
                         .iconName=${input.deleteAllButtonIconName}
                         .variant=${"toolbar"}></devtools-button>
        <devtools-button title=${i18nString20(UIStrings20.deleteSelected)}
                         @click=${input.onDeleteSelected}
                         ?disabled=${!input.deleteSelectedButtonDisabled}
                         jslog=${VisualLogging11.action("storage-items-view.delete-selected").track({
      click: true
    })}
                         .iconName=${"cross"}
                         .variant=${"toolbar"}></devtools-button>
        ${input.mainToolbarItems.map((item) => item.element)}
      </devtools-toolbar>
      ${input.metadataView}`,
    // clang-format on
    target
  );
};
var StorageItemsToolbar = class extends Common12.ObjectWrapper.eventMixin(UI16.Widget.VBox) {
  filterRegex;
  #metadataView;
  #view;
  #deleteAllButtonEnabled = true;
  #deleteSelectedButtonDisabled = true;
  #filterItemEnabled = true;
  #deleteAllButtonIconName = "clear";
  #deleteAllButtonTitle = i18nString20(UIStrings20.clearAll);
  #mainToolbarItems = [];
  constructor(element, view = DEFAULT_VIEW2) {
    super(element);
    this.#view = view;
    this.filterRegex = null;
  }
  set metadataView(view) {
    this.#metadataView = view;
  }
  get metadataView() {
    if (!this.#metadataView) {
      this.#metadataView = new ApplicationComponents11.StorageMetadataView.StorageMetadataView();
    }
    return this.#metadataView;
  }
  performUpdate() {
    const viewInput = {
      deleteAllButtonEnabled: this.#deleteAllButtonEnabled,
      deleteSelectedButtonDisabled: this.#deleteSelectedButtonDisabled,
      filterItemEnabled: this.#filterItemEnabled,
      deleteAllButtonIconName: this.#deleteAllButtonIconName,
      deleteAllButtonTitle: this.#deleteAllButtonTitle,
      mainToolbarItems: this.#mainToolbarItems,
      metadataView: this.metadataView,
      onFilterChanged: this.filterChanged.bind(this),
      onRefresh: () => {
        this.dispatchEventToListeners(
          "Refresh"
          /* StorageItemsToolbar.Events.REFRESH */
        );
        UI16.ARIAUtils.LiveAnnouncer.alert(i18nString20(UIStrings20.refreshedStatus));
      },
      onDeleteAll: () => this.dispatchEventToListeners(
        "DeleteAll"
        /* StorageItemsToolbar.Events.DELETE_ALL */
      ),
      onDeleteSelected: () => this.dispatchEventToListeners(
        "DeleteSelected"
        /* StorageItemsToolbar.Events.DELETE_SELECTED */
      )
    };
    this.#view(viewInput, {}, this.contentElement);
  }
  setDeleteAllTitle(title) {
    this.#deleteAllButtonTitle = title;
    this.requestUpdate();
  }
  setDeleteAllGlyph(glyph) {
    this.#deleteAllButtonIconName = glyph;
    this.requestUpdate();
  }
  appendToolbarItem(item) {
    this.#mainToolbarItems.push(item);
    this.requestUpdate();
  }
  setStorageKey(storageKey) {
    this.metadataView.setStorageKey(storageKey);
  }
  filterChanged({ detail: text }) {
    this.filterRegex = text ? new RegExp(Platform4.StringUtilities.escapeForRegExp(text), "i") : null;
    this.dispatchEventToListeners(
      "Refresh"
      /* StorageItemsToolbar.Events.REFRESH */
    );
  }
  hasFilter() {
    return Boolean(this.filterRegex);
  }
  setCanDeleteAll(enabled) {
    this.#deleteAllButtonEnabled = enabled;
    this.requestUpdate();
  }
  setCanDeleteSelected(enabled) {
    this.#deleteSelectedButtonDisabled = enabled;
    this.requestUpdate();
  }
  setCanFilter(enabled) {
    this.#filterItemEnabled = enabled;
    this.requestUpdate();
  }
};

// gen/front_end/panels/application/KeyValueStorageItemsView.js
var { ARIAUtils: ARIAUtils6 } = UI17;
var { EmptyWidget: EmptyWidget7 } = UI17.EmptyWidget;
var { VBox, widgetConfig: widgetConfig2 } = UI17.Widget;
var { Size } = Geometry;
var { repeat } = LitDirectives;
var UIStrings21 = {
  /**
   * @description Text that shows in the Application Panel if no value is selected for preview
   */
  noPreviewSelected: "No value selected",
  /**
   * @description Preview text when viewing storage in Application panel
   */
  selectAValueToPreview: "Select a value to preview",
  /**
   * @description Text for announcing number of entries after filtering
   * @example {5} PH1
   */
  numberEntries: "Number of entries shown in table: {PH1}",
  /**
   * @description Text in DOMStorage Items View of the Application panel
   */
  key: "Key",
  /**
   * @description Text for the value of something
   */
  value: "Value"
};
var str_21 = i18n41.i18n.registerUIStrings("panels/application/KeyValueStorageItemsView.ts", UIStrings21);
var i18nString21 = i18n41.i18n.getLocalizedString.bind(void 0, str_21);
var MAX_VALUE_LENGTH = 4096;
var KeyValueStorageItemsView = class extends UI17.Widget.VBox {
  #preview;
  #previewValue;
  #items = [];
  #selectedKey = null;
  #view;
  #isSortOrderAscending = true;
  #editable;
  #toolbar;
  metadataView;
  constructor(title, id, editable, view, metadataView) {
    metadataView ??= new ApplicationComponents12.StorageMetadataView.StorageMetadataView();
    if (!view) {
      view = (input, output, target) => {
        render4(
          html5`
            <devtools-widget
              .widgetConfig=${widgetConfig2(StorageItemsToolbar, { metadataView })}
              class=flex-none
              ${UI17.Widget.widgetRef(StorageItemsToolbar, (view2) => {
            output.toolbar = view2;
          })}
            ></devtools-widget>
            <devtools-split-view sidebar-position="second" name="${id}-split-view-state">
               <devtools-widget
                  slot="main"
                  .widgetConfig=${widgetConfig2(VBox, { minimumSize: new Size(0, 50) })}>
                <devtools-data-grid
                  .name=${`${id}-datagrid-with-preview`}
                  striped
                  style="flex: auto"
                  @select=${input.onSelect}
                  @sort=${input.onSort}
                  @refresh=${input.onReferesh}
                  @create=${input.onCreate}
                  @edit=${input.onEdit}
                  @delete=${input.onDelete}
                >
                  <table>
                    <tr>
                      <th id="key" sortable ?editable=${input.editable}>
                        ${i18nString21(UIStrings21.key)}
                      </th>
                      <th id="value" ?editable=${input.editable}>
                        ${i18nString21(UIStrings21.value)}
                      </th>
                    </tr>
                    ${repeat(input.items, (item) => item.key, (item) => html5`
                      <tr data-key=${item.key} data-value=${item.value}
                          selected=${input.selectedKey === item.key || nothing2}>
                        <td>${item.key}</td>
                        <td>${item.value.substr(0, MAX_VALUE_LENGTH)}</td>
                      </tr>`)}
                      <tr placeholder></tr>
                  </table>
                </devtools-data-grid>
              </devtools-widget>
              <devtools-widget
                  slot="sidebar"
                  .widgetConfig=${widgetConfig2(VBox, { minimumSize: new Size(0, 50) })}
                  jslog=${VisualLogging12.pane("preview").track({ resize: true })}>
               ${input.preview?.element}
              </devtools-widget>
            </devtools-split-view>`,
          // clang-format on
          target
        );
      };
    }
    super();
    this.metadataView = metadataView;
    this.#editable = editable;
    this.#view = view;
    this.performUpdate();
    this.#preview = new EmptyWidget7(i18nString21(UIStrings21.noPreviewSelected), i18nString21(UIStrings21.selectAValueToPreview));
    this.#previewValue = null;
    this.showPreview(null, null);
  }
  wasShown() {
    this.refreshItems();
  }
  performUpdate() {
    const that = this;
    const viewOutput = {
      set toolbar(toolbar6) {
        that.#toolbar?.removeEventListener("DeleteSelected", that.deleteSelectedItem, that);
        that.#toolbar?.removeEventListener("DeleteAll", that.deleteAllItems, that);
        that.#toolbar?.removeEventListener("Refresh", that.refreshItems, that);
        that.#toolbar = toolbar6;
        that.#toolbar.addEventListener("DeleteSelected", that.deleteSelectedItem, that);
        that.#toolbar.addEventListener("DeleteAll", that.deleteAllItems, that);
        that.#toolbar.addEventListener("Refresh", that.refreshItems, that);
      }
    };
    const viewInput = {
      items: this.#items,
      selectedKey: this.#selectedKey,
      editable: this.#editable,
      preview: this.#preview,
      onSelect: (event) => {
        this.#toolbar?.setCanDeleteSelected(Boolean(event.detail));
        if (!event.detail) {
          void this.#previewEntry(null);
        } else {
          void this.#previewEntry({ key: event.detail.dataset.key || "", value: event.detail.dataset.value || "" });
        }
      },
      onSort: (event) => {
        this.#isSortOrderAscending = event.detail.ascending;
      },
      onCreate: (event) => {
        this.#createCallback(event.detail.key, event.detail.value || "");
      },
      onEdit: (event) => {
        this.#editingCallback(event.detail.node, event.detail.columnId, event.detail.valueBeforeEditing, event.detail.newText);
      },
      onDelete: (event) => {
        this.#deleteCallback(event.detail.dataset.key || "");
      },
      onReferesh: () => {
        this.refreshItems();
      }
    };
    this.#view(viewInput, viewOutput, this.contentElement);
  }
  get toolbar() {
    return this.#toolbar;
  }
  refreshItems() {
  }
  deleteAllItems() {
  }
  itemsCleared() {
    this.#items = [];
    this.performUpdate();
    this.#toolbar?.setCanDeleteSelected(false);
  }
  itemRemoved(key) {
    const index = this.#items.findIndex((item) => item.key === key);
    if (index === -1) {
      return;
    }
    this.#items.splice(index, 1);
    this.performUpdate();
    this.#toolbar?.setCanDeleteSelected(this.#items.length > 1);
  }
  itemAdded(key, value) {
    if (this.#items.some((item) => item.key === key)) {
      return;
    }
    this.#items.push({ key, value });
    this.performUpdate();
  }
  itemUpdated(key, value) {
    const item = this.#items.find((item2) => item2.key === key);
    if (!item) {
      return;
    }
    if (item.value === value) {
      return;
    }
    item.value = value;
    this.performUpdate();
    if (this.#selectedKey !== key) {
      return;
    }
    if (this.#previewValue !== value) {
      void this.#previewEntry({ key, value });
    }
    this.#toolbar?.setCanDeleteSelected(true);
  }
  showItems(items) {
    const sortDirection = this.#isSortOrderAscending ? 1 : -1;
    this.#items = [...items].sort((item1, item2) => sortDirection * (item1.key > item2.key ? 1 : -1));
    const selectedItem = this.#items.find((item) => item.key === this.#selectedKey);
    if (!selectedItem) {
      this.#selectedKey = null;
    } else {
      void this.#previewEntry(selectedItem);
    }
    this.performUpdate();
    this.#toolbar?.setCanDeleteSelected(Boolean(this.#selectedKey));
    ARIAUtils6.LiveAnnouncer.alert(i18nString21(UIStrings21.numberEntries, { PH1: this.#items.length }));
  }
  deleteSelectedItem() {
    if (!this.#selectedKey) {
      return;
    }
    this.#deleteCallback(this.#selectedKey);
  }
  #createCallback(key, value) {
    this.setItem(key, value);
    this.#removeDupes(key, value);
    void this.#previewEntry({ key, value });
  }
  isEditAllowed(_columnIdentifier, _oldText, _newText) {
    return true;
  }
  #editingCallback(editingNode, columnIdentifier, oldText, newText) {
    if (!this.isEditAllowed(columnIdentifier, oldText, newText)) {
      return;
    }
    if (columnIdentifier === "key") {
      if (typeof oldText === "string") {
        this.removeItem(oldText);
      }
      this.setItem(newText, editingNode.dataset.value || "");
      this.#removeDupes(newText, editingNode.dataset.value || "");
      editingNode.dataset.key = newText;
      void this.#previewEntry({ key: newText, value: editingNode.dataset.value || "" });
    } else {
      this.setItem(editingNode.dataset.key || "", newText);
      void this.#previewEntry({ key: editingNode.dataset.key || "", value: newText });
    }
  }
  #removeDupes(key, value) {
    for (let i = this.#items.length - 1; i >= 0; --i) {
      const child = this.#items[i];
      if (child.key === key && value !== child.value) {
        this.#items.splice(i, 1);
      }
    }
  }
  #deleteCallback(key) {
    this.removeItem(key);
  }
  showPreview(preview, value) {
    if (this.#preview && this.#previewValue === value) {
      return;
    }
    if (this.#preview) {
      this.#preview.detach();
    }
    if (!preview) {
      preview = new EmptyWidget7(i18nString21(UIStrings21.noPreviewSelected), i18nString21(UIStrings21.selectAValueToPreview));
    }
    this.#previewValue = value;
    this.#preview = preview;
    this.performUpdate();
  }
  async #previewEntry(entry) {
    if (entry?.value) {
      this.#selectedKey = entry.key;
      const preview = await this.createPreview(entry.key, entry.value);
      if (this.#selectedKey === entry.key) {
        this.showPreview(preview, entry.value);
      }
    } else {
      this.#selectedKey = null;
      this.showPreview(null, null);
    }
  }
  set editable(editable) {
    this.#editable = editable;
    this.performUpdate();
  }
  keys() {
    return this.#items.map((item) => item.key);
  }
};

// gen/front_end/panels/application/SharedStorageItemsView.js
var UIStrings22 = {
  /**
   * @description Text in SharedStorage Items View of the Application panel
   */
  sharedStorage: "Shared storage",
  /**
   * @description Text for announcing that the "Shared Storage Items" table was cleared, that is, all
   * entries were deleted.
   */
  sharedStorageItemsCleared: "Shared Storage items cleared",
  /**
   * @description Text for announcing that the filtered "Shared Storage Items" table was cleared, that is,
   * all filtered entries were deleted.
   */
  sharedStorageFilteredItemsCleared: "Shared Storage filtered items cleared",
  /**
   * @description Text for announcing a Shared Storage key/value item has been deleted
   */
  sharedStorageItemDeleted: "The storage item was deleted.",
  /**
   * @description Text for announcing a Shared Storage key/value item has been edited
   */
  sharedStorageItemEdited: "The storage item was edited.",
  /**
   * @description Text for announcing a Shared Storage key/value item edit request has been canceled
   */
  sharedStorageItemEditCanceled: "The storage item edit was canceled."
};
var str_22 = i18n43.i18n.registerUIStrings("panels/application/SharedStorageItemsView.ts", UIStrings22);
var i18nString22 = i18n43.i18n.getLocalizedString.bind(void 0, str_22);
var SharedStorageItemsView = class _SharedStorageItemsView extends KeyValueStorageItemsView {
  #sharedStorage;
  sharedStorageItemsDispatcher;
  constructor(sharedStorage, view) {
    super(
      i18nString22(UIStrings22.sharedStorage),
      "shared-storage-items-view",
      /* editable=*/
      true,
      view,
      new ApplicationComponents13.SharedStorageMetadataView.SharedStorageMetadataView(sharedStorage, sharedStorage.securityOrigin)
    );
    this.#sharedStorage = sharedStorage;
    this.performUpdate();
    this.#sharedStorage.addEventListener("SharedStorageChanged", this.#sharedStorageChanged, this);
    this.sharedStorageItemsDispatcher = new Common13.ObjectWrapper.ObjectWrapper();
  }
  // Use `createView()` instead of the constructor to create a view, so that entries can be awaited asynchronously.
  static async createView(sharedStorage, viewFunction) {
    const view = new _SharedStorageItemsView(sharedStorage, viewFunction);
    await view.updateEntriesOnly();
    return view;
  }
  async updateEntriesOnly() {
    const entries = await this.#sharedStorage.getEntries();
    if (entries) {
      this.#showSharedStorageItems(entries);
    }
  }
  async #sharedStorageChanged() {
    await this.refreshItems();
  }
  async refreshItems() {
    await this.metadataView?.render();
    await this.updateEntriesOnly();
    this.sharedStorageItemsDispatcher.dispatchEventToListeners(
      "ItemsRefreshed"
      /* SharedStorageItemsDispatcher.Events.ITEMS_REFRESHED */
    );
  }
  async deleteAllItems() {
    if (!this.toolbar?.hasFilter()) {
      await this.#sharedStorage.clear();
      await this.refreshItems();
      this.sharedStorageItemsDispatcher.dispatchEventToListeners(
        "ItemsCleared"
        /* SharedStorageItemsDispatcher.Events.ITEMS_CLEARED */
      );
      UI18.ARIAUtils.LiveAnnouncer.alert(i18nString22(UIStrings22.sharedStorageItemsCleared));
      return;
    }
    await Promise.all(this.keys().map((key) => this.#sharedStorage.deleteEntry(key)));
    await this.refreshItems();
    this.sharedStorageItemsDispatcher.dispatchEventToListeners(
      "FilteredItemsCleared"
      /* SharedStorageItemsDispatcher.Events.FILTERED_ITEMS_CLEARED */
    );
    UI18.ARIAUtils.LiveAnnouncer.alert(i18nString22(UIStrings22.sharedStorageFilteredItemsCleared));
  }
  isEditAllowed(columnIdentifier, _oldText, newText) {
    if (columnIdentifier === "key" && newText === "") {
      void this.refreshItems().then(() => {
        UI18.ARIAUtils.LiveAnnouncer.alert(i18nString22(UIStrings22.sharedStorageItemEditCanceled));
      });
      return false;
    }
    return true;
  }
  async setItem(key, value) {
    await this.#sharedStorage.setEntry(key, value, false);
    await this.refreshItems();
    this.sharedStorageItemsDispatcher.dispatchEventToListeners(
      "ItemEdited"
      /* SharedStorageItemsDispatcher.Events.ITEM_EDITED */
    );
    UI18.ARIAUtils.LiveAnnouncer.alert(i18nString22(UIStrings22.sharedStorageItemEdited));
  }
  #showSharedStorageItems(items) {
    if (this.toolbar) {
      const filteredList = items.filter((item) => this.toolbar?.filterRegex?.test(`${item.key} ${item.value}`) ?? true);
      this.showItems(filteredList);
    }
  }
  async removeItem(key) {
    await this.#sharedStorage.deleteEntry(key);
    await this.refreshItems();
    this.sharedStorageItemsDispatcher.dispatchEventToListeners("ItemDeleted", { key });
    UI18.ARIAUtils.LiveAnnouncer.alert(i18nString22(UIStrings22.sharedStorageItemDeleted));
  }
  async createPreview(key, value) {
    const wrappedEntry = key && { key, value: value || "" };
    return SourceFrame4.JSONView.JSONView.createViewSync(wrappedEntry);
  }
};

// gen/front_end/panels/application/SharedStorageTreeElement.js
var SharedStorageTreeElement = class _SharedStorageTreeElement extends ApplicationPanelTreeElement {
  view;
  constructor(resourcesPanel, sharedStorage) {
    super(resourcesPanel, sharedStorage.securityOrigin, false, "shared-storage-instance");
  }
  static async createElement(resourcesPanel, sharedStorage) {
    const treeElement = new _SharedStorageTreeElement(resourcesPanel, sharedStorage);
    treeElement.view = await SharedStorageItemsView.createView(sharedStorage);
    treeElement.view.element.setAttribute("jslog", `${VisualLogging13.pane("shared-storage-data")}`);
    return treeElement;
  }
  get itemURL() {
    return "shared-storage://";
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    this.resourcesPanel.showView(this.view);
    return false;
  }
};

// gen/front_end/panels/application/StorageBucketsTreeElement.js
var StorageBucketsTreeElement_exports = {};
__export(StorageBucketsTreeElement_exports, {
  StorageBucketsTreeElement: () => StorageBucketsTreeElement,
  StorageBucketsTreeParentElement: () => StorageBucketsTreeParentElement,
  i18nString: () => i18nString23
});
import * as i18n45 from "./../../core/i18n/i18n.js";
import * as SDK20 from "./../../core/sdk/sdk.js";
import * as IconButton10 from "./../../ui/components/icon_button/icon_button.js";
import * as LegacyWrapper7 from "./../../ui/components/legacy_wrapper/legacy_wrapper.js";
import * as UI19 from "./../../ui/legacy/legacy.js";
import { StorageMetadataView as StorageMetadataView5 } from "./components/components.js";
var UIStrings23 = {
  /**
   * @description Label for an item in the Application Panel Sidebar of the Application panel
   * Storage Buckets allow developers to separate site data into buckets so that they can be
   * deleted independently.
   */
  storageBuckets: "Storage buckets",
  /**
   * @description Text for an item in the Application Panel
   * if no storage buckets are available to show. Storage Buckets allow developers to separate
   * site data into buckets so that they can be
   * deleted independently. https://developer.chrome.com/docs/web-platform/storage-buckets.
   */
  noStorageBuckets: "No storage buckets detected",
  /**
   * @description Description text in the Application Panel describing the storage buckets tab.
   * Storage Buckets allow developers to separate site data into buckets so that they can be
   * deleted independently. https://developer.chrome.com/docs/web-platform/storage-buckets.
   */
  storageBucketsDescription: "On this page you can view and delete storage buckets, and their associated `Storage APIs`."
};
var str_23 = i18n45.i18n.registerUIStrings("panels/application/StorageBucketsTreeElement.ts", UIStrings23);
var i18nString23 = i18n45.i18n.getLocalizedString.bind(void 0, str_23);
var StorageBucketsTreeParentElement = class extends ExpandableApplicationPanelTreeElement {
  bucketTreeElements = /* @__PURE__ */ new Set();
  constructor(storagePanel) {
    super(storagePanel, i18nString23(UIStrings23.storageBuckets), i18nString23(UIStrings23.noStorageBuckets), i18nString23(UIStrings23.storageBucketsDescription), "storage-buckets");
    const icon = IconButton10.Icon.create("bucket");
    this.setLeadingIcons([icon]);
    this.setLink("https://github.com/WICG/storage-buckets/blob/gh-pages/explainer.md");
  }
  initialize() {
    SDK20.TargetManager.TargetManager.instance().addModelListener(SDK20.StorageBucketsModel.StorageBucketsModel, "BucketAdded", this.bucketAdded, this);
    SDK20.TargetManager.TargetManager.instance().addModelListener(SDK20.StorageBucketsModel.StorageBucketsModel, "BucketRemoved", this.bucketRemoved, this);
    SDK20.TargetManager.TargetManager.instance().addModelListener(SDK20.StorageBucketsModel.StorageBucketsModel, "BucketChanged", this.bucketChanged, this);
    for (const bucketsModel of SDK20.TargetManager.TargetManager.instance().models(SDK20.StorageBucketsModel.StorageBucketsModel)) {
      const buckets = bucketsModel.getBuckets();
      for (const bucket of buckets) {
        this.addBucketTreeElement(bucketsModel, bucket);
      }
    }
  }
  removeBucketsForModel(model) {
    for (const bucketTreeElement of this.bucketTreeElements) {
      if (bucketTreeElement.model === model) {
        this.removeBucketTreeElement(bucketTreeElement);
      }
    }
  }
  bucketAdded({ data: { model, bucketInfo } }) {
    this.addBucketTreeElement(model, bucketInfo);
  }
  bucketRemoved({ data: { model, bucketInfo } }) {
    const idbDatabaseTreeElement = this.getBucketTreeElement(model, bucketInfo);
    if (!idbDatabaseTreeElement) {
      return;
    }
    this.removeBucketTreeElement(idbDatabaseTreeElement);
  }
  bucketChanged({ data: { model, bucketInfo } }) {
    const idbDatabaseTreeElement = this.getBucketTreeElement(model, bucketInfo);
    if (!idbDatabaseTreeElement) {
      return;
    }
    idbDatabaseTreeElement.bucketInfo = bucketInfo;
  }
  addBucketTreeElement(model, bucketInfo) {
    if (bucketInfo.bucket.name === void 0) {
      return;
    }
    const singleBucketTreeElement = new StorageBucketsTreeElement(this.resourcesPanel, model, bucketInfo);
    this.bucketTreeElements.add(singleBucketTreeElement);
    this.appendChild(singleBucketTreeElement);
    singleBucketTreeElement.initialize();
  }
  removeBucketTreeElement(bucketTreeElement) {
    this.removeChild(bucketTreeElement);
    this.bucketTreeElements.delete(bucketTreeElement);
    this.setExpandable(this.bucketTreeElements.size > 0);
  }
  get itemURL() {
    return "storage-buckets-group://";
  }
  getBucketTreeElement(model, { bucket: { storageKey, name } }) {
    for (const bucketTreeElement of this.bucketTreeElements) {
      if (bucketTreeElement.model === model && bucketTreeElement.bucketInfo.bucket.storageKey === storageKey && bucketTreeElement.bucketInfo.bucket.name === name) {
        return bucketTreeElement;
      }
    }
    return null;
  }
};
var StorageBucketsTreeElement = class extends ExpandableApplicationPanelTreeElement {
  storageBucketInfo;
  bucketModel;
  view;
  constructor(resourcesPanel, model, bucketInfo) {
    const { bucket } = bucketInfo;
    const { origin } = SDK20.StorageKeyManager.parseStorageKey(bucketInfo.bucket.storageKey);
    super(resourcesPanel, `${bucket.name} - ${origin}`, "", "", "storage-bucket");
    this.bucketModel = model;
    this.storageBucketInfo = bucketInfo;
    const icon = IconButton10.Icon.create("database");
    this.setLeadingIcons([icon]);
  }
  initialize() {
    const { bucket } = this.bucketInfo;
    const indexedDBTreeElement = new IndexedDBTreeElement(this.resourcesPanel, bucket);
    this.appendChild(indexedDBTreeElement);
    const serviceWorkerCacheTreeElement = new ServiceWorkerCacheTreeElement(this.resourcesPanel, bucket);
    this.appendChild(serviceWorkerCacheTreeElement);
    serviceWorkerCacheTreeElement.initialize();
  }
  get itemURL() {
    const { bucket } = this.bucketInfo;
    return `storage-buckets-group://${bucket.name}/${bucket.storageKey}`;
  }
  get model() {
    return this.bucketModel;
  }
  get bucketInfo() {
    return this.storageBucketInfo;
  }
  set bucketInfo(bucketInfo) {
    this.storageBucketInfo = bucketInfo;
    if (this.view) {
      this.view.getComponent().setStorageBucket(this.storageBucketInfo);
    }
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    if (!this.view) {
      this.view = LegacyWrapper7.LegacyWrapper.legacyWrapper(UI19.Widget.Widget, new StorageMetadataView5.StorageMetadataView());
      this.view.getComponent().enableStorageBucketControls(this.model);
      this.view.getComponent().setStorageBucket(this.storageBucketInfo);
    }
    this.showView(this.view);
    return false;
  }
};

// gen/front_end/panels/application/StorageView.js
var StorageView_exports = {};
__export(StorageView_exports, {
  ActionDelegate: () => ActionDelegate2,
  AllStorageTypes: () => AllStorageTypes,
  StorageView: () => StorageView
});
import * as Common14 from "./../../core/common/common.js";
import * as i18n47 from "./../../core/i18n/i18n.js";
import * as Platform5 from "./../../core/platform/platform.js";
import * as SDK21 from "./../../core/sdk/sdk.js";
import * as IconButton11 from "./../../ui/components/icon_button/icon_button.js";
import * as PerfUI from "./../../ui/legacy/components/perf_ui/perf_ui.js";
import * as UI20 from "./../../ui/legacy/legacy.js";
import * as VisualLogging14 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/application/storageView.css.js
var storageView_css_default = `/*
 * Copyright 2016 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.report-row {
  display: flex;
  align-items: center;
  white-space: normal;

  &:has(.quota-override-error:empty) {
    margin: 0;
  }
}

.clear-storage-button .report-row {
  display: flex;
}

.link {
  margin-left: 10px;
  display: none;
}

.report-row:hover .link {
  display: inline;
}

.quota-override-editor-with-button {
  align-items: baseline;
  display: flex;
}

.quota-override-notification-editor {
  border: solid 1px var(--sys-color-neutral-outline);
  border-radius: 4px;
  display: flex;
  flex: auto;
  margin-right: 4px;
  max-width: 200px;
  min-width: 50px;
  min-height: 19px;
  padding-left: 4px;

  &:focus {
    border-color: var(--sys-color-state-focus-ring);
  }

  &:hover:not(:focus) {
    background-color: var(--sys-color-state-hover-on-subtle);
  }
}

.quota-override-error:not(:empty) {
  padding-top: 10px;
  color: var(--sys-color-error);
}

.usage-breakdown-row {
  min-width: fit-content;
}

.clear-storage-container {
  overflow: auto;
}

.clear-storage-header {
  min-width: 400px;
}

.report-content-box {
  overflow: initial;
}

.include-third-party-cookies {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 10px;
}

/*# sourceURL=${import.meta.resolve("./storageView.css")} */`;

// gen/front_end/panels/application/StorageView.js
var UIStrings24 = {
  /**
   * @description Text in the Storage View that expresses the amount of used and available storage quota
   * @example {1.5 MB} PH1
   * @example {123.1 MB} PH2
   */
  storageQuotaUsed: "{PH1} used out of {PH2} storage quota",
  /**
   * @description Tooltip in the Storage View that expresses the precise amount of used and available storage quota
   * @example {200} PH1
   * @example {400} PH2
   */
  storageQuotaUsedWithBytes: "{PH1} bytes used out of {PH2} bytes storage quota",
  /**
   * @description Fragment indicating that a certain data size has been custom configured
   * @example {1.5 MB} PH1
   */
  storageWithCustomMarker: "{PH1} (custom)",
  /**
   * @description Text in Application Panel Sidebar and title text of the Storage View of the Application panel
   */
  storageTitle: "Storage",
  /**
   * @description Title text in Storage View of the Application panel
   */
  usage: "Usage",
  /**
   * @description Unit for data size in DevTools
   */
  mb: "MB",
  /**
   * @description Link to learn more about Progressive Web Apps
   */
  learnMore: "Learn more",
  /**
   * @description Button text for the button in the Storage View of the Application panel for clearing site-specific storage
   */
  clearSiteData: "Clear site data",
  /**
   * @description Announce message when the "clear site data" task is complete
   */
  SiteDataCleared: "Site data cleared",
  /**
   * @description Category description in the Clear Storage section of the Storage View of the Application panel
   */
  application: "Application",
  /**
   * @description Checkbox label in the Clear Storage section of the Storage View of the Application panel
   */
  unregisterServiceWorker: "Unregister service workers",
  /**
   * @description Checkbox label in the Clear Storage section of the Storage View of the Application panel
   */
  localAndSessionStorage: "Local and session storage",
  /**
   * @description Checkbox label in the Clear Storage section of the Storage View of the Application panel
   */
  indexDB: "IndexedDB",
  /**
   * @description Checkbox label in the Clear Storage section of the Storage View of the Application panel
   */
  cookies: "Cookies",
  /**
   * @description Checkbox label in the Clear Storage section of the Storage View of the Application panel
   */
  cacheStorage: "Cache storage",
  /**
   * @description Checkbox label in the Clear Storage section of the Storage View of the Application panel
   */
  includingThirdPartyCookies: "including third-party cookies",
  /**
   * @description Text for error message in Application Quota Override
   * @example {Image} PH1
   */
  sFailedToLoad: "{PH1} (failed to load)",
  /**
   * @description Text for error message in Application Quota Override
   */
  internalError: "Internal error",
  /**
   * @description Text for error message in Application Quota Override
   */
  pleaseEnterANumber: "Please enter a number",
  /**
   * @description Text for error message in Application Quota Override
   */
  numberMustBeNonNegative: "Number must be non-negative",
  /**
   * @description Text for error message in Application Quota Override
   * @example {9000000000000} PH1
   */
  numberMustBeSmaller: "Number must be smaller than {PH1}",
  /**
   * @description Button text for the "Clear site data" button in the Storage View of the Application panel while the clearing action is pending
   */
  clearing: "Clearing\u2026",
  /**
   * @description Quota row title in Clear Storage View of the Application panel
   */
  storageQuotaIsLimitedIn: "Storage quota is limited in Incognito mode",
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  fileSystem: "File System",
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  other: "Other",
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  storageUsage: "Storage usage",
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  serviceWorkers: "Service workers",
  /**
   * @description Checkbox label in Application Panel Sidebar of the Application panel.
   * Storage quota refers to the amount of disk available for the website or app.
   */
  simulateCustomStorage: "Simulate custom storage quota"
};
var str_24 = i18n47.i18n.registerUIStrings("panels/application/StorageView.ts", UIStrings24);
var i18nString24 = i18n47.i18n.getLocalizedString.bind(void 0, str_24);
var StorageView = class _StorageView extends UI20.ThrottledWidget.ThrottledWidget {
  pieColors;
  reportView;
  target;
  securityOrigin;
  storageKey;
  settings;
  includeThirdPartyCookiesSetting;
  quotaRow;
  quotaUsage;
  pieChart;
  previousOverrideFieldValue;
  quotaOverrideCheckbox;
  quotaOverrideControlRow;
  quotaOverrideEditor;
  quotaOverrideErrorMessage;
  clearButton;
  constructor() {
    super(true, 1e3);
    this.registerRequiredCSS(storageView_css_default);
    this.contentElement.classList.add("clear-storage-container");
    this.contentElement.setAttribute("jslog", `${VisualLogging14.pane("clear-storage")}`);
    this.pieColors = /* @__PURE__ */ new Map([
      ["cache_storage", "rgb(229, 113, 113)"],
      // red
      ["cookies", "rgb(239, 196, 87)"],
      // yellow
      ["indexeddb", "rgb(155, 127, 230)"],
      // purple
      ["local_storage", "rgb(116, 178, 102)"],
      // green
      ["service_workers", "rgb(255, 167, 36)"]
      // orange
    ]);
    this.reportView = new UI20.ReportView.ReportView(i18nString24(UIStrings24.storageTitle));
    this.reportView.registerRequiredCSS(storageView_css_default);
    this.reportView.element.classList.add("clear-storage-header");
    this.reportView.show(this.contentElement);
    this.target = null;
    this.securityOrigin = null;
    this.storageKey = null;
    this.settings = /* @__PURE__ */ new Map();
    for (const type of AllStorageTypes) {
      this.settings.set(type, Common14.Settings.Settings.instance().createSetting("clear-storage-" + Platform5.StringUtilities.toKebabCase(type), true));
    }
    this.includeThirdPartyCookiesSetting = Common14.Settings.Settings.instance().createSetting("clear-storage-include-third-party-cookies", false);
    const clearButtonSection = this.reportView.appendSection("", "clear-storage-button").appendRow();
    this.clearButton = UI20.UIUtils.createTextButton(i18nString24(UIStrings24.clearSiteData), this.clear.bind(this), { jslogContext: "storage.clear-site-data" });
    this.clearButton.id = "storage-view-clear-button";
    clearButtonSection.appendChild(this.clearButton);
    const includeThirdPartyCookiesCheckbox = UI20.SettingsUI.createSettingCheckbox(i18nString24(UIStrings24.includingThirdPartyCookies), this.includeThirdPartyCookiesSetting);
    includeThirdPartyCookiesCheckbox.classList.add("include-third-party-cookies");
    clearButtonSection.appendChild(includeThirdPartyCookiesCheckbox);
    const quota = this.reportView.appendSection(i18nString24(UIStrings24.usage));
    quota.element.setAttribute("jslog", `${VisualLogging14.section("usage")}`);
    this.quotaRow = quota.appendSelectableRow();
    this.quotaRow.classList.add("quota-usage-row");
    const learnMoreRow = quota.appendRow();
    const learnMore = UI20.XLink.XLink.create("https://developer.chrome.com/docs/devtools/progressive-web-apps#opaque-responses", i18nString24(UIStrings24.learnMore), void 0, void 0, "learn-more");
    learnMoreRow.appendChild(learnMore);
    this.quotaUsage = null;
    this.pieChart = new PerfUI.PieChart.PieChart();
    this.populatePieChart(0, []);
    const usageBreakdownRow = quota.appendRow();
    usageBreakdownRow.classList.add("usage-breakdown-row");
    usageBreakdownRow.appendChild(this.pieChart);
    this.previousOverrideFieldValue = "";
    const quotaOverrideCheckboxRow = quota.appendRow();
    quotaOverrideCheckboxRow.classList.add("quota-override-row");
    this.quotaOverrideCheckbox = UI20.UIUtils.CheckboxLabel.create(i18nString24(UIStrings24.simulateCustomStorage), false);
    this.quotaOverrideCheckbox.setAttribute("jslog", `${VisualLogging14.toggle("simulate-custom-quota").track({ change: true })}`);
    quotaOverrideCheckboxRow.appendChild(this.quotaOverrideCheckbox);
    this.quotaOverrideCheckbox.addEventListener("click", this.onClickCheckbox.bind(this), false);
    this.quotaOverrideControlRow = quota.appendRow();
    this.quotaOverrideEditor = this.quotaOverrideControlRow.createChild("input", "quota-override-notification-editor");
    this.quotaOverrideEditor.setAttribute("jslog", `${VisualLogging14.textField("quota-override").track({ change: true })}`);
    this.quotaOverrideControlRow.appendChild(UI20.UIUtils.createLabel(i18nString24(UIStrings24.mb)));
    this.quotaOverrideControlRow.classList.add("hidden");
    this.quotaOverrideEditor.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        void this.applyQuotaOverrideFromInputField();
        event.consume(true);
      }
    });
    this.quotaOverrideEditor.addEventListener("focusout", (event) => {
      void this.applyQuotaOverrideFromInputField();
      event.consume(true);
    });
    const errorMessageRow = quota.appendRow();
    this.quotaOverrideErrorMessage = errorMessageRow.createChild("div", "quota-override-error");
    const application = this.reportView.appendSection(i18nString24(UIStrings24.application));
    application.element.setAttribute("jslog", `${VisualLogging14.section("application")}`);
    this.appendItem(
      application,
      i18nString24(UIStrings24.unregisterServiceWorker),
      "service_workers"
      /* Protocol.Storage.StorageType.Service_workers */
    );
    application.markFieldListAsGroup();
    const storage = this.reportView.appendSection(i18nString24(UIStrings24.storageTitle));
    storage.element.setAttribute("jslog", `${VisualLogging14.section("storage")}`);
    this.appendItem(
      storage,
      i18nString24(UIStrings24.localAndSessionStorage),
      "local_storage"
      /* Protocol.Storage.StorageType.Local_storage */
    );
    this.appendItem(
      storage,
      i18nString24(UIStrings24.indexDB),
      "indexeddb"
      /* Protocol.Storage.StorageType.Indexeddb */
    );
    this.appendItem(
      storage,
      i18nString24(UIStrings24.cookies),
      "cookies"
      /* Protocol.Storage.StorageType.Cookies */
    );
    this.appendItem(
      storage,
      i18nString24(UIStrings24.cacheStorage),
      "cache_storage"
      /* Protocol.Storage.StorageType.Cache_storage */
    );
    storage.markFieldListAsGroup();
    SDK21.TargetManager.TargetManager.instance().observeTargets(this);
  }
  appendItem(section8, title, settingName) {
    const row = section8.appendRow();
    const setting = this.settings.get(settingName);
    if (setting) {
      row.appendChild(UI20.SettingsUI.createSettingCheckbox(title, setting));
    }
  }
  targetAdded(target) {
    if (target !== SDK21.TargetManager.TargetManager.instance().primaryPageTarget()) {
      return;
    }
    this.target = target;
    const securityOriginManager = target.model(SDK21.SecurityOriginManager.SecurityOriginManager);
    this.updateOrigin(securityOriginManager.mainSecurityOrigin(), securityOriginManager.unreachableMainSecurityOrigin());
    securityOriginManager.addEventListener(SDK21.SecurityOriginManager.Events.MainSecurityOriginChanged, this.originChanged, this);
    const storageKeyManager = target.model(SDK21.StorageKeyManager.StorageKeyManager);
    this.updateStorageKey(storageKeyManager.mainStorageKey());
    storageKeyManager.addEventListener("MainStorageKeyChanged", this.storageKeyChanged, this);
  }
  targetRemoved(target) {
    if (this.target !== target) {
      return;
    }
    const securityOriginManager = target.model(SDK21.SecurityOriginManager.SecurityOriginManager);
    securityOriginManager.removeEventListener(SDK21.SecurityOriginManager.Events.MainSecurityOriginChanged, this.originChanged, this);
    const storageKeyManager = target.model(SDK21.StorageKeyManager.StorageKeyManager);
    storageKeyManager.removeEventListener("MainStorageKeyChanged", this.storageKeyChanged, this);
  }
  originChanged(event) {
    const { mainSecurityOrigin, unreachableMainSecurityOrigin } = event.data;
    this.updateOrigin(mainSecurityOrigin, unreachableMainSecurityOrigin);
  }
  storageKeyChanged(event) {
    const { mainStorageKey } = event.data;
    this.updateStorageKey(mainStorageKey);
  }
  updateOrigin(mainOrigin, unreachableMainOrigin) {
    const oldOrigin = this.securityOrigin;
    if (unreachableMainOrigin) {
      this.securityOrigin = unreachableMainOrigin;
      this.reportView.setSubtitle(i18nString24(UIStrings24.sFailedToLoad, { PH1: unreachableMainOrigin }));
    } else {
      this.securityOrigin = mainOrigin;
      this.reportView.setSubtitle(mainOrigin);
    }
    if (oldOrigin !== this.securityOrigin) {
      this.quotaOverrideControlRow.classList.add("hidden");
      this.quotaOverrideCheckbox.checked = false;
      this.quotaOverrideErrorMessage.textContent = "";
    }
    void this.doUpdate();
  }
  updateStorageKey(mainStorageKey) {
    const oldStorageKey = this.storageKey;
    this.storageKey = mainStorageKey;
    this.reportView.setSubtitle(mainStorageKey);
    if (oldStorageKey !== this.storageKey) {
      this.quotaOverrideControlRow.classList.add("hidden");
      this.quotaOverrideCheckbox.checked = false;
      this.quotaOverrideErrorMessage.textContent = "";
    }
    void this.doUpdate();
  }
  async applyQuotaOverrideFromInputField() {
    if (!this.target || !this.securityOrigin) {
      this.quotaOverrideErrorMessage.textContent = i18nString24(UIStrings24.internalError);
      return;
    }
    this.quotaOverrideErrorMessage.textContent = "";
    const editorString = this.quotaOverrideEditor.value;
    if (editorString === "") {
      await this.clearQuotaForOrigin(this.target, this.securityOrigin);
      this.previousOverrideFieldValue = "";
      return;
    }
    const quota = parseFloat(editorString);
    if (!Number.isFinite(quota)) {
      this.quotaOverrideErrorMessage.textContent = i18nString24(UIStrings24.pleaseEnterANumber);
      return;
    }
    if (quota < 0) {
      this.quotaOverrideErrorMessage.textContent = i18nString24(UIStrings24.numberMustBeNonNegative);
      return;
    }
    const cutoff = 9e12;
    if (quota >= cutoff) {
      this.quotaOverrideErrorMessage.textContent = i18nString24(UIStrings24.numberMustBeSmaller, { PH1: cutoff.toLocaleString() });
      return;
    }
    const bytesPerMB = 1e3 * 1e3;
    const quotaInBytes = Math.round(quota * bytesPerMB);
    const quotaFieldValue = `${quotaInBytes / bytesPerMB}`;
    this.quotaOverrideEditor.value = quotaFieldValue;
    this.previousOverrideFieldValue = quotaFieldValue;
    await this.target.storageAgent().invoke_overrideQuotaForOrigin({ origin: this.securityOrigin, quotaSize: quotaInBytes });
  }
  async clearQuotaForOrigin(target, origin) {
    await target.storageAgent().invoke_overrideQuotaForOrigin({ origin });
  }
  async onClickCheckbox() {
    if (this.quotaOverrideControlRow.classList.contains("hidden")) {
      this.quotaOverrideControlRow.classList.remove("hidden");
      this.quotaOverrideCheckbox.checked = true;
      this.quotaOverrideEditor.value = this.previousOverrideFieldValue;
      this.quotaOverrideEditor.focus();
    } else if (this.target && this.securityOrigin) {
      this.quotaOverrideControlRow.classList.add("hidden");
      this.quotaOverrideCheckbox.checked = false;
      await this.clearQuotaForOrigin(this.target, this.securityOrigin);
      this.quotaOverrideErrorMessage.textContent = "";
    }
  }
  clear() {
    if (!this.securityOrigin) {
      return;
    }
    const selectedStorageTypes = [];
    for (const type of this.settings.keys()) {
      const setting = this.settings.get(type);
      if (setting?.get()) {
        selectedStorageTypes.push(type);
      }
    }
    if (this.target) {
      const includeThirdPartyCookies = this.includeThirdPartyCookiesSetting.get();
      _StorageView.clear(this.target, this.storageKey, this.securityOrigin, selectedStorageTypes, includeThirdPartyCookies);
    }
    this.clearButton.disabled = true;
    const label = this.clearButton.textContent;
    this.clearButton.textContent = i18nString24(UIStrings24.clearing);
    window.setTimeout(() => {
      this.clearButton.disabled = false;
      this.clearButton.textContent = label;
      this.clearButton.focus();
    }, 500);
    UI20.ARIAUtils.LiveAnnouncer.alert(i18nString24(UIStrings24.SiteDataCleared));
  }
  static clear(target, storageKey, originForCookies, selectedStorageTypes, includeThirdPartyCookies) {
    console.assert(Boolean(storageKey));
    if (!storageKey) {
      return;
    }
    void target.storageAgent().invoke_clearDataForStorageKey({ storageKey, storageTypes: selectedStorageTypes.join(",") });
    const set = new Set(selectedStorageTypes);
    const hasAll = set.has(
      "all"
      /* Protocol.Storage.StorageType.All */
    );
    if (set.has(
      "local_storage"
      /* Protocol.Storage.StorageType.Local_storage */
    ) || hasAll) {
      const storageModel = target.model(DOMStorageModel);
      if (storageModel) {
        storageModel.clearForStorageKey(storageKey);
      }
    }
    if (set.has(
      "indexeddb"
      /* Protocol.Storage.StorageType.Indexeddb */
    ) || hasAll) {
      for (const target2 of SDK21.TargetManager.TargetManager.instance().targets()) {
        const indexedDBModel = target2.model(IndexedDBModel);
        if (indexedDBModel) {
          indexedDBModel.clearForStorageKey(storageKey);
        }
      }
    }
    if (originForCookies && (set.has(
      "cookies"
      /* Protocol.Storage.StorageType.Cookies */
    ) || hasAll)) {
      void target.storageAgent().invoke_clearDataForOrigin({
        origin: originForCookies,
        storageTypes: "cookies"
        /* Protocol.Storage.StorageType.Cookies */
      });
      const cookieModel = target.model(SDK21.CookieModel.CookieModel);
      if (cookieModel) {
        void cookieModel.clear(void 0, includeThirdPartyCookies ? void 0 : originForCookies);
      }
    }
    if (set.has(
      "cache_storage"
      /* Protocol.Storage.StorageType.Cache_storage */
    ) || hasAll) {
      const target2 = SDK21.TargetManager.TargetManager.instance().primaryPageTarget();
      const model = target2?.model(SDK21.ServiceWorkerCacheModel.ServiceWorkerCacheModel);
      if (model) {
        model.clearForStorageKey(storageKey);
      }
    }
  }
  async doUpdate() {
    if (!this.securityOrigin || !this.target) {
      this.quotaRow.textContent = "";
      this.populatePieChart(0, []);
      return;
    }
    const securityOrigin = this.securityOrigin;
    const response = await this.target.storageAgent().invoke_getUsageAndQuota({ origin: securityOrigin });
    this.quotaRow.textContent = "";
    if (response.getError()) {
      this.populatePieChart(0, []);
      return;
    }
    const quotaOverridden = response.overrideActive;
    const quotaAsString = i18n47.ByteUtilities.bytesToString(response.quota);
    const usageAsString = i18n47.ByteUtilities.bytesToString(response.usage);
    const formattedQuotaAsString = i18nString24(UIStrings24.storageWithCustomMarker, { PH1: quotaAsString });
    const quota = quotaOverridden ? UI20.Fragment.Fragment.build`<b>${formattedQuotaAsString}</b>`.element() : quotaAsString;
    const element = i18n47.i18n.getFormatLocalizedString(str_24, UIStrings24.storageQuotaUsed, { PH1: usageAsString, PH2: quota });
    this.quotaRow.appendChild(element);
    UI20.Tooltip.Tooltip.install(this.quotaRow, i18nString24(UIStrings24.storageQuotaUsedWithBytes, { PH1: response.usage.toLocaleString(), PH2: response.quota.toLocaleString() }));
    if (!response.overrideActive && response.quota < 125829120) {
      const icon = new IconButton11.Icon.Icon();
      icon.name = "info";
      icon.style.color = "var(--icon-info)";
      icon.classList.add("small");
      UI20.Tooltip.Tooltip.install(this.quotaRow, i18nString24(UIStrings24.storageQuotaIsLimitedIn));
      this.quotaRow.appendChild(icon);
    }
    if (this.quotaUsage === null || this.quotaUsage !== response.usage) {
      this.quotaUsage = response.usage;
      const slices = [];
      for (const usageForType of response.usageBreakdown.sort((a, b) => b.usage - a.usage)) {
        const value = usageForType.usage;
        if (!value) {
          continue;
        }
        const title = this.getStorageTypeName(usageForType.storageType);
        const color = this.pieColors.get(usageForType.storageType) || "#ccc";
        slices.push({ value, color, title });
      }
      this.populatePieChart(response.usage, slices);
    }
    this.update();
  }
  populatePieChart(total, slices) {
    this.pieChart.data = {
      chartName: i18nString24(UIStrings24.storageUsage),
      size: 110,
      formatter: i18n47.ByteUtilities.bytesToString,
      showLegend: true,
      total,
      slices
    };
  }
  getStorageTypeName(type) {
    switch (type) {
      case "file_systems":
        return i18nString24(UIStrings24.fileSystem);
      case "indexeddb":
        return i18nString24(UIStrings24.indexDB);
      case "cache_storage":
        return i18nString24(UIStrings24.cacheStorage);
      case "service_workers":
        return i18nString24(UIStrings24.serviceWorkers);
      default:
        return i18nString24(UIStrings24.other);
    }
  }
};
var AllStorageTypes = [
  "cache_storage",
  "cookies",
  "indexeddb",
  "local_storage",
  "service_workers"
];
var ActionDelegate2 = class {
  handleAction(_context, actionId) {
    switch (actionId) {
      case "resources.clear":
        return this.handleClear(false);
      case "resources.clear-incl-third-party-cookies":
        return this.handleClear(true);
    }
    return false;
  }
  handleClear(includeThirdPartyCookies) {
    const target = SDK21.TargetManager.TargetManager.instance().primaryPageTarget();
    if (!target) {
      return false;
    }
    const resourceTreeModel = target.model(SDK21.ResourceTreeModel.ResourceTreeModel);
    if (!resourceTreeModel) {
      return false;
    }
    const securityOrigin = resourceTreeModel.getMainSecurityOrigin();
    resourceTreeModel.getMainStorageKey().then((storageKey) => {
      StorageView.clear(target, storageKey, securityOrigin, AllStorageTypes, includeThirdPartyCookies);
    }, (_) => {
    });
    return true;
  }
};

// gen/front_end/panels/application/TrustTokensTreeElement.js
var TrustTokensTreeElement_exports = {};
__export(TrustTokensTreeElement_exports, {
  TrustTokensTreeElement: () => TrustTokensTreeElement,
  i18nString: () => i18nString25
});
import * as Host8 from "./../../core/host/host.js";
import * as i18n49 from "./../../core/i18n/i18n.js";
import * as IconButton12 from "./../../ui/components/icon_button/icon_button.js";
import * as LegacyWrapper9 from "./../../ui/components/legacy_wrapper/legacy_wrapper.js";
import * as UI21 from "./../../ui/legacy/legacy.js";
import * as ApplicationComponents14 from "./components/components.js";
var UIStrings25 = {
  /**
   * @description Hover text for an info icon in the Private State Token panel.
   * Previously known as 'Trust Tokens'.
   */
  trustTokens: "Private state tokens"
};
var str_25 = i18n49.i18n.registerUIStrings("panels/application/TrustTokensTreeElement.ts", UIStrings25);
var i18nString25 = i18n49.i18n.getLocalizedString.bind(void 0, str_25);
var TrustTokensTreeElement = class extends ApplicationPanelTreeElement {
  view;
  constructor(storagePanel) {
    super(storagePanel, i18nString25(UIStrings25.trustTokens), false, "private-state-tokens");
    const icon = IconButton12.Icon.create("database");
    this.setLeadingIcons([icon]);
  }
  get itemURL() {
    return "trustTokens://";
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    if (!this.view) {
      this.view = LegacyWrapper9.LegacyWrapper.legacyWrapper(UI21.Widget.Widget, new ApplicationComponents14.TrustTokensView.TrustTokensView(), "trust-tokens");
    }
    this.showView(this.view);
    Host8.userMetrics.panelShown("trust-tokens");
    return false;
  }
};

// gen/front_end/panels/application/ApplicationPanelSidebar.js
var UIStrings26 = {
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  application: "Application",
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  storage: "Storage",
  /**
   * @description Text in Application Panelthat shows if no local storage
   *             can be shown.
   */
  noLocalStorage: "No local storage detected",
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  localStorage: "Local storage",
  /**
   * @description Text in the Application panel describing the local storage tab.
   */
  localStorageDescription: "On this page you can view, add, edit, and delete local storage key-value pairs.",
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  sessionStorage: "Session storage",
  /**
   * @description Text in Application Panel if no session storage can be shown.
   */
  noSessionStorage: "No session storage detected",
  /**
   * @description Text in the Application panel describing the session storage tab.
   */
  sessionStorageDescription: "On this page you can view, add, edit, and delete session storage key-value pairs.",
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  extensionStorage: "Extension storage",
  /**
   * @description Text in Application Panel if no extension storage can be shown
   */
  noExtensionStorage: "No extension storage detected",
  /**
   * @description Text in the Application panel describing the extension storage tab.
   */
  extensionStorageDescription: "On this page you can view, add, edit, and delete extension storage key-value pairs.",
  /**
   * @description Text for extension session storage in Application panel
   */
  extensionSessionStorage: "Session",
  /**
   * @description Text for extension local storage in Application panel
   */
  extensionLocalStorage: "Local",
  /**
   * @description Text for extension sync storage in Application panel
   */
  extensionSyncStorage: "Sync",
  /**
   * @description Text for extension managed storage in Application panel
   */
  extensionManagedStorage: "Managed",
  /**
   * @description Text for web cookies
   */
  cookies: "Cookies",
  /**
   * @description Text in the Application Panel if no cookies are set
   */
  noCookies: "No cookies set",
  /**
   * @description Text for web cookies
   */
  cookiesDescription: "On this page you can view, add, edit, and delete cookies.",
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  backgroundServices: "Background services",
  /**
   * @description Text for rendering frames
   */
  frames: "Frames",
  /**
   * @description Text that appears on a button for the manifest resource type filter.
   */
  manifest: "Manifest",
  /**
   * @description Text in App Manifest View of the Application panel
   */
  noManifestDetected: "No manifest detected",
  /**
   * @description Description text on manifests in App Manifest View of the Application panel which describes the app manifest view tab
   */
  manifestDescription: "A manifest defines how your app appears on phone\u2019s home screens and what the app looks like on launch.",
  /**
   * @description Text in App Manifest View of the Application panel
   */
  appManifest: "Manifest",
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  indexeddb: "IndexedDB",
  /**
   * @description Text in Application Panel if no indexedDB is detected
   */
  noIndexeddb: "No indexedDB detected",
  /**
   * @description Text in the Application panel describing the extension storage tab.
   */
  indexeddbDescription: "On this page you can view and delete indexedDB key-value pairs and databases.",
  /**
   * @description A context menu item in the Application Panel Sidebar of the Application panel
   */
  refreshIndexeddb: "Refresh IndexedDB",
  /**
   * @description Tooltip in Application Panel Sidebar of the Application panel
   * @example {1.0} PH1
   */
  versionSEmpty: "Version: {PH1} (empty)",
  /**
   * @description Tooltip in Application Panel Sidebar of the Application panel
   * @example {1.0} PH1
   */
  versionS: "Version: {PH1}",
  /**
   * @description Text to clear content
   */
  clear: "Clear",
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   * @example {"key path"} PH1
   */
  keyPathS: "Key path: {PH1}",
  /**
   * @description Text in Application Panel Sidebar of the Application panel
   */
  localFiles: "Local Files",
  /**
   * @description Tooltip in Application Panel Sidebar of the Application panel
   * @example {https://example.com} PH1
   */
  cookiesUsedByFramesFromS: "Cookies used by frames from {PH1}",
  /**
   * @description Text in Frames View of the Application panel
   */
  openedWindows: "Opened Windows",
  /**
   * @description Text in Frames View of the Application panel
   */
  openedWindowsDescription: "On this page you can view windows opened via window.open().",
  /**
   * @description Label for plural of worker type: web workers
   */
  webWorkers: "Web Workers",
  /**
   * @description Label in frame tree for unavailable document
   */
  documentNotAvailable: "No document detected",
  /**
   * @description Description of content of unavailable document in Application panel
   */
  theContentOfThisDocumentHasBeen: "The content of this document has been generated dynamically via 'document.write()'.",
  /**
   * @description Text in Frames View of the Application panel
   */
  windowWithoutTitle: "Window without title",
  /**
   * @description Default name for worker
   */
  worker: "worker",
  /**
   * @description Description text for describing the dedicated worker tab.
   */
  workerDescription: "On this page you can view dedicated workers that are created by the parent frame.",
  /**
   * @description Aria text for screen reader to announce they can scroll to top of manifest if invoked
   */
  onInvokeManifestAlert: "Manifest: Invoke to scroll to the top of manifest",
  /**
   * @description Aria text for screen reader to announce they can scroll to a section if invoked
   * @example {"Identity"} PH1
   */
  beforeInvokeAlert: "{PH1}: Invoke to scroll to this section in manifest",
  /**
   * @description Alert message for screen reader to announce which subsection is being scrolled to
   * @example {"Identity"} PH1
   */
  onInvokeAlert: "Scrolled to {PH1}",
  /**
   * @description Application sidebar panel
   */
  applicationSidebarPanel: "Application panel sidebar",
  /**
   * @description Tooltip in Application Panel Sidebar of the Application panel
   * @example {https://example.com} PH1
   */
  thirdPartyPhaseout: "Cookies from {PH1} may have been blocked due to third-party cookie phaseout.",
  /**
   * @description Description text in the Application Panel describing a frame's resources
   */
  resourceDescription: "On this page you can view the frame's resources."
};
var str_26 = i18n51.i18n.registerUIStrings("panels/application/ApplicationPanelSidebar.ts", UIStrings26);
var i18nString26 = i18n51.i18n.getLocalizedString.bind(void 0, str_26);
function assertNotMainTarget(targetId) {
  if (targetId === "main") {
    throw new Error("Unexpected main target id");
  }
}
function nameForExtensionStorageArea(storageArea) {
  switch (storageArea) {
    case "session":
      return i18nString26(UIStrings26.extensionSessionStorage);
    case "local":
      return i18nString26(UIStrings26.extensionLocalStorage);
    case "sync":
      return i18nString26(UIStrings26.extensionSyncStorage);
    case "managed":
      return i18nString26(UIStrings26.extensionManagedStorage);
    default:
      throw new Error(`Unrecognized storage type: ${storageArea}`);
  }
}
var ApplicationPanelSidebar = class extends UI22.Widget.VBox {
  panel;
  sidebarTree;
  applicationTreeElement;
  serviceWorkersTreeElement;
  localStorageListTreeElement;
  sessionStorageListTreeElement;
  extensionStorageListTreeElement;
  indexedDBListTreeElement;
  interestGroupTreeElement;
  cookieListTreeElement;
  trustTokensTreeElement;
  cacheStorageListTreeElement;
  sharedStorageListTreeElement;
  storageBucketsTreeElement;
  backForwardCacheListTreeElement;
  backgroundFetchTreeElement;
  backgroundSyncTreeElement;
  bounceTrackingMitigationsTreeElement;
  notificationsTreeElement;
  paymentHandlerTreeElement;
  periodicBackgroundSyncTreeElement;
  pushMessagingTreeElement;
  reportingApiTreeElement;
  preloadingSummaryTreeElement;
  resourcesSection;
  domStorageTreeElements;
  extensionIdToStorageTreeParentElement;
  extensionStorageModels;
  extensionStorageTreeElements;
  sharedStorageTreeElements;
  domains;
  // Holds main frame target.
  target;
  previousHoveredElement;
  sharedStorageTreeElementDispatcher;
  constructor(panel) {
    super();
    this.panel = panel;
    this.sidebarTree = new UI22.TreeOutline.TreeOutlineInShadow(
      "NavigationTree"
      /* UI.TreeOutline.TreeVariant.NAVIGATION_TREE */
    );
    this.sidebarTree.registerRequiredCSS(resourcesSidebar_css_default);
    this.sidebarTree.element.classList.add("resources-sidebar");
    this.sidebarTree.setHideOverflow(true);
    this.sidebarTree.element.classList.add("filter-all");
    this.sidebarTree.addEventListener(UI22.TreeOutline.Events.ElementAttached, this.treeElementAdded, this);
    this.contentElement.appendChild(this.sidebarTree.element);
    const applicationSectionTitle = i18nString26(UIStrings26.application);
    this.applicationTreeElement = this.addSidebarSection(applicationSectionTitle, "application");
    const applicationPanelSidebar = this.applicationTreeElement.treeOutline?.contentElement;
    if (applicationPanelSidebar) {
      applicationPanelSidebar.ariaLabel = i18nString26(UIStrings26.applicationSidebarPanel);
    }
    const manifestTreeElement = new AppManifestTreeElement(panel);
    this.applicationTreeElement.appendChild(manifestTreeElement);
    manifestTreeElement.generateChildren();
    this.serviceWorkersTreeElement = new ServiceWorkersTreeElement(panel);
    this.applicationTreeElement.appendChild(this.serviceWorkersTreeElement);
    const clearStorageTreeElement = new ClearStorageTreeElement(panel);
    this.applicationTreeElement.appendChild(clearStorageTreeElement);
    const storageSectionTitle = i18nString26(UIStrings26.storage);
    const storageTreeElement = this.addSidebarSection(storageSectionTitle, "storage");
    this.localStorageListTreeElement = new ExpandableApplicationPanelTreeElement(panel, i18nString26(UIStrings26.localStorage), i18nString26(UIStrings26.noLocalStorage), i18nString26(UIStrings26.localStorageDescription), "local-storage");
    this.localStorageListTreeElement.setLink("https://developer.chrome.com/docs/devtools/storage/localstorage/");
    const localStorageIcon = IconButton13.Icon.create("table");
    this.localStorageListTreeElement.setLeadingIcons([localStorageIcon]);
    storageTreeElement.appendChild(this.localStorageListTreeElement);
    this.sessionStorageListTreeElement = new ExpandableApplicationPanelTreeElement(panel, i18nString26(UIStrings26.sessionStorage), i18nString26(UIStrings26.noSessionStorage), i18nString26(UIStrings26.sessionStorageDescription), "session-storage");
    this.sessionStorageListTreeElement.setLink("https://developer.chrome.com/docs/devtools/storage/sessionstorage/");
    const sessionStorageIcon = IconButton13.Icon.create("table");
    this.sessionStorageListTreeElement.setLeadingIcons([sessionStorageIcon]);
    storageTreeElement.appendChild(this.sessionStorageListTreeElement);
    this.extensionStorageListTreeElement = new ExpandableApplicationPanelTreeElement(panel, i18nString26(UIStrings26.extensionStorage), i18nString26(UIStrings26.noExtensionStorage), i18nString26(UIStrings26.extensionStorageDescription), "extension-storage");
    this.extensionStorageListTreeElement.setLink("https://developer.chrome.com/docs/extensions/reference/api/storage/");
    const extensionStorageIcon = IconButton13.Icon.create("table");
    this.extensionStorageListTreeElement.setLeadingIcons([extensionStorageIcon]);
    storageTreeElement.appendChild(this.extensionStorageListTreeElement);
    this.indexedDBListTreeElement = new IndexedDBTreeElement(panel);
    this.indexedDBListTreeElement.setLink("https://developer.chrome.com/docs/devtools/storage/indexeddb/");
    storageTreeElement.appendChild(this.indexedDBListTreeElement);
    this.cookieListTreeElement = new ExpandableApplicationPanelTreeElement(panel, i18nString26(UIStrings26.cookies), i18nString26(UIStrings26.noCookies), i18nString26(UIStrings26.cookiesDescription), "cookies");
    this.cookieListTreeElement.setLink("https://developer.chrome.com/docs/devtools/storage/cookies/");
    const cookieIcon = IconButton13.Icon.create("cookie");
    this.cookieListTreeElement.setLeadingIcons([cookieIcon]);
    storageTreeElement.appendChild(this.cookieListTreeElement);
    this.trustTokensTreeElement = new TrustTokensTreeElement(panel);
    storageTreeElement.appendChild(this.trustTokensTreeElement);
    this.interestGroupTreeElement = new InterestGroupTreeElement(panel);
    storageTreeElement.appendChild(this.interestGroupTreeElement);
    this.sharedStorageListTreeElement = new SharedStorageListTreeElement(panel);
    storageTreeElement.appendChild(this.sharedStorageListTreeElement);
    this.cacheStorageListTreeElement = new ServiceWorkerCacheTreeElement(panel);
    storageTreeElement.appendChild(this.cacheStorageListTreeElement);
    this.storageBucketsTreeElement = new StorageBucketsTreeParentElement(panel);
    storageTreeElement.appendChild(this.storageBucketsTreeElement);
    const backgroundServiceSectionTitle = i18nString26(UIStrings26.backgroundServices);
    const backgroundServiceTreeElement = this.addSidebarSection(backgroundServiceSectionTitle, "background-services");
    this.backForwardCacheListTreeElement = new BackForwardCacheTreeElement(panel);
    backgroundServiceTreeElement.appendChild(this.backForwardCacheListTreeElement);
    this.backgroundFetchTreeElement = new BackgroundServiceTreeElement(
      panel,
      "backgroundFetch"
      /* Protocol.BackgroundService.ServiceName.BackgroundFetch */
    );
    backgroundServiceTreeElement.appendChild(this.backgroundFetchTreeElement);
    this.backgroundSyncTreeElement = new BackgroundServiceTreeElement(
      panel,
      "backgroundSync"
      /* Protocol.BackgroundService.ServiceName.BackgroundSync */
    );
    backgroundServiceTreeElement.appendChild(this.backgroundSyncTreeElement);
    this.bounceTrackingMitigationsTreeElement = new BounceTrackingMitigationsTreeElement(panel);
    backgroundServiceTreeElement.appendChild(this.bounceTrackingMitigationsTreeElement);
    this.notificationsTreeElement = new BackgroundServiceTreeElement(
      panel,
      "notifications"
      /* Protocol.BackgroundService.ServiceName.Notifications */
    );
    backgroundServiceTreeElement.appendChild(this.notificationsTreeElement);
    this.paymentHandlerTreeElement = new BackgroundServiceTreeElement(
      panel,
      "paymentHandler"
      /* Protocol.BackgroundService.ServiceName.PaymentHandler */
    );
    backgroundServiceTreeElement.appendChild(this.paymentHandlerTreeElement);
    this.periodicBackgroundSyncTreeElement = new BackgroundServiceTreeElement(
      panel,
      "periodicBackgroundSync"
      /* Protocol.BackgroundService.ServiceName.PeriodicBackgroundSync */
    );
    backgroundServiceTreeElement.appendChild(this.periodicBackgroundSyncTreeElement);
    this.preloadingSummaryTreeElement = new PreloadingSummaryTreeElement(panel);
    backgroundServiceTreeElement.appendChild(this.preloadingSummaryTreeElement);
    this.preloadingSummaryTreeElement.constructChildren(panel);
    this.pushMessagingTreeElement = new BackgroundServiceTreeElement(
      panel,
      "pushMessaging"
      /* Protocol.BackgroundService.ServiceName.PushMessaging */
    );
    backgroundServiceTreeElement.appendChild(this.pushMessagingTreeElement);
    this.reportingApiTreeElement = new ReportingApiTreeElement(panel);
    backgroundServiceTreeElement.appendChild(this.reportingApiTreeElement);
    const resourcesSectionTitle = i18nString26(UIStrings26.frames);
    const resourcesTreeElement = this.addSidebarSection(resourcesSectionTitle, "frames");
    this.resourcesSection = new ResourcesSection(panel, resourcesTreeElement);
    this.domStorageTreeElements = /* @__PURE__ */ new Map();
    this.extensionIdToStorageTreeParentElement = /* @__PURE__ */ new Map();
    this.extensionStorageTreeElements = /* @__PURE__ */ new Map();
    this.extensionStorageModels = [];
    this.sharedStorageTreeElements = /* @__PURE__ */ new Map();
    this.domains = {};
    this.sidebarTree.contentElement.addEventListener("mousemove", this.onmousemove.bind(this), false);
    this.sidebarTree.contentElement.addEventListener("mouseleave", this.onmouseleave.bind(this), false);
    SDK22.TargetManager.TargetManager.instance().observeTargets(this, { scoped: true });
    SDK22.TargetManager.TargetManager.instance().addModelListener(SDK22.ResourceTreeModel.ResourceTreeModel, SDK22.ResourceTreeModel.Events.FrameNavigated, this.frameNavigated, this, { scoped: true });
    const selection = this.panel.lastSelectedItemPath();
    if (!selection.length) {
      manifestTreeElement.select();
    }
    SDK22.TargetManager.TargetManager.instance().observeModels(DOMStorageModel, {
      modelAdded: (model) => this.domStorageModelAdded(model),
      modelRemoved: (model) => this.domStorageModelRemoved(model)
    }, { scoped: true });
    SDK22.TargetManager.TargetManager.instance().observeModels(ExtensionStorageModel, {
      modelAdded: (model) => this.extensionStorageModelAdded(model),
      modelRemoved: (model) => this.extensionStorageModelRemoved(model)
    }, { scoped: true });
    SDK22.TargetManager.TargetManager.instance().observeModels(IndexedDBModel, {
      modelAdded: (model) => this.indexedDBModelAdded(model),
      modelRemoved: (model) => this.indexedDBModelRemoved(model)
    }, { scoped: true });
    SDK22.TargetManager.TargetManager.instance().observeModels(InterestGroupStorageModel, {
      modelAdded: (model) => this.interestGroupModelAdded(model),
      modelRemoved: (model) => this.interestGroupModelRemoved(model)
    }, { scoped: true });
    SDK22.TargetManager.TargetManager.instance().observeModels(SharedStorageModel, {
      modelAdded: (model) => this.sharedStorageModelAdded(model).catch((err) => {
        console.error(err);
      }),
      modelRemoved: (model) => this.sharedStorageModelRemoved(model)
    }, { scoped: true });
    SDK22.TargetManager.TargetManager.instance().observeModels(SDK22.StorageBucketsModel.StorageBucketsModel, {
      modelAdded: (model) => this.storageBucketsModelAdded(model),
      modelRemoved: (model) => this.storageBucketsModelRemoved(model)
    }, { scoped: true });
    this.sharedStorageTreeElementDispatcher = new Common15.ObjectWrapper.ObjectWrapper();
    this.contentElement.style.contain = "layout style";
  }
  addSidebarSection(title, jslogContext) {
    const treeElement = new UI22.TreeOutline.TreeElement(title, true, jslogContext);
    treeElement.listItemElement.classList.add("storage-group-list-item");
    treeElement.setCollapsible(false);
    treeElement.selectable = false;
    this.sidebarTree.appendChild(treeElement);
    UI22.ARIAUtils.markAsHeading(treeElement.listItemElement, 3);
    UI22.ARIAUtils.setLabel(treeElement.childrenListElement, title);
    return treeElement;
  }
  targetAdded(target) {
    if (target !== target.outermostTarget()) {
      return;
    }
    this.target = target;
    const interestGroupModel = target.model(InterestGroupStorageModel);
    if (interestGroupModel) {
      interestGroupModel.addEventListener("InterestGroupAccess", this.interestGroupAccess, this);
    }
    const resourceTreeModel = target.model(SDK22.ResourceTreeModel.ResourceTreeModel);
    if (!resourceTreeModel) {
      return;
    }
    if (resourceTreeModel.cachedResourcesLoaded()) {
      this.initialize();
    }
    resourceTreeModel.addEventListener(SDK22.ResourceTreeModel.Events.CachedResourcesLoaded, this.initialize, this);
    resourceTreeModel.addEventListener(SDK22.ResourceTreeModel.Events.WillLoadCachedResources, this.resetWithFrames, this);
  }
  targetRemoved(target) {
    if (target !== this.target) {
      return;
    }
    delete this.target;
    const resourceTreeModel = target.model(SDK22.ResourceTreeModel.ResourceTreeModel);
    if (resourceTreeModel) {
      resourceTreeModel.removeEventListener(SDK22.ResourceTreeModel.Events.CachedResourcesLoaded, this.initialize, this);
      resourceTreeModel.removeEventListener(SDK22.ResourceTreeModel.Events.WillLoadCachedResources, this.resetWithFrames, this);
    }
    const interestGroupModel = target.model(InterestGroupStorageModel);
    if (interestGroupModel) {
      interestGroupModel.removeEventListener("InterestGroupAccess", this.interestGroupAccess, this);
    }
    this.resetWithFrames();
  }
  focus() {
    this.sidebarTree.focus();
  }
  initialize() {
    for (const frame of SDK22.ResourceTreeModel.ResourceTreeModel.frames()) {
      this.addCookieDocument(frame);
    }
    const interestGroupModel = this.target?.model(InterestGroupStorageModel);
    if (interestGroupModel) {
      interestGroupModel.enable();
    }
    this.cacheStorageListTreeElement.initialize();
    const backgroundServiceModel = this.target?.model(BackgroundServiceModel) || null;
    this.backgroundFetchTreeElement.initialize(backgroundServiceModel);
    this.backgroundSyncTreeElement.initialize(backgroundServiceModel);
    this.notificationsTreeElement.initialize(backgroundServiceModel);
    this.paymentHandlerTreeElement.initialize(backgroundServiceModel);
    this.periodicBackgroundSyncTreeElement.initialize(backgroundServiceModel);
    this.pushMessagingTreeElement.initialize(backgroundServiceModel);
    this.storageBucketsTreeElement?.initialize();
    const preloadingModel = this.target?.model(SDK22.PreloadingModel.PreloadingModel);
    if (preloadingModel) {
      this.preloadingSummaryTreeElement?.initialize(preloadingModel);
    }
  }
  domStorageModelAdded(model) {
    model.enable();
    model.storages().forEach(this.addDOMStorage.bind(this));
    model.addEventListener("DOMStorageAdded", this.domStorageAdded, this);
    model.addEventListener("DOMStorageRemoved", this.domStorageRemoved, this);
  }
  domStorageModelRemoved(model) {
    model.storages().forEach(this.removeDOMStorage.bind(this));
    model.removeEventListener("DOMStorageAdded", this.domStorageAdded, this);
    model.removeEventListener("DOMStorageRemoved", this.domStorageRemoved, this);
  }
  extensionStorageModelAdded(model) {
    this.extensionStorageModels.push(model);
    model.enable();
    model.storages().forEach(this.addExtensionStorage.bind(this));
    model.addEventListener("ExtensionStorageAdded", this.extensionStorageAdded, this);
    model.addEventListener("ExtensionStorageRemoved", this.extensionStorageRemoved, this);
  }
  extensionStorageModelRemoved(model) {
    console.assert(this.extensionStorageModels.includes(model));
    this.extensionStorageModels.splice(this.extensionStorageModels.indexOf(model), 1);
    model.storages().forEach(this.removeExtensionStorage.bind(this));
    model.removeEventListener("ExtensionStorageAdded", this.extensionStorageAdded, this);
    model.removeEventListener("ExtensionStorageRemoved", this.extensionStorageRemoved, this);
  }
  indexedDBModelAdded(model) {
    model.enable();
    this.indexedDBListTreeElement.addIndexedDBForModel(model);
  }
  indexedDBModelRemoved(model) {
    this.indexedDBListTreeElement.removeIndexedDBForModel(model);
  }
  interestGroupModelAdded(model) {
    model.enable();
    model.addEventListener("InterestGroupAccess", this.interestGroupAccess, this);
  }
  interestGroupModelRemoved(model) {
    model.disable();
    model.removeEventListener("InterestGroupAccess", this.interestGroupAccess, this);
  }
  async sharedStorageModelAdded(model) {
    await model.enable();
    for (const storage of model.storages()) {
      await this.addSharedStorage(storage);
    }
    model.addEventListener("SharedStorageAdded", this.sharedStorageAdded, this);
    model.addEventListener("SharedStorageRemoved", this.sharedStorageRemoved, this);
    model.addEventListener("SharedStorageAccess", this.sharedStorageAccess, this);
  }
  sharedStorageModelRemoved(model) {
    model.disable();
    for (const storage of model.storages()) {
      this.removeSharedStorage(storage);
    }
    model.removeEventListener("SharedStorageAdded", this.sharedStorageAdded, this);
    model.removeEventListener("SharedStorageRemoved", this.sharedStorageRemoved, this);
    model.removeEventListener("SharedStorageAccess", this.sharedStorageAccess, this);
  }
  storageBucketsModelAdded(model) {
    model.enable();
  }
  storageBucketsModelRemoved(model) {
    this.storageBucketsTreeElement?.removeBucketsForModel(model);
  }
  resetWithFrames() {
    this.resourcesSection.reset();
    this.reset();
  }
  treeElementAdded(event) {
    const selection = this.panel.lastSelectedItemPath();
    if (!selection.length) {
      return;
    }
    const element = event.data;
    const elementPath = [element];
    for (let parent = element.parent; parent && "itemURL" in parent && parent.itemURL; parent = parent.parent) {
      elementPath.push(parent);
    }
    let i = selection.length - 1;
    let j = elementPath.length - 1;
    while (i >= 0 && j >= 0 && selection[i] === elementPath[j].itemURL) {
      if (!elementPath[j].expanded) {
        if (i > 0) {
          elementPath[j].expand();
        }
        if (!elementPath[j].selected) {
          elementPath[j].select();
        }
      }
      i--;
      j--;
    }
  }
  reset() {
    this.domains = {};
    this.cookieListTreeElement.removeChildren();
    this.interestGroupTreeElement.clearEvents();
  }
  frameNavigated(event) {
    const frame = event.data;
    if (frame.isOutermostFrame()) {
      this.reset();
    }
    this.addCookieDocument(frame);
  }
  interestGroupAccess(event) {
    this.interestGroupTreeElement.addEvent(event.data);
  }
  addCookieDocument(frame) {
    const urlToParse = frame.unreachableUrl() || frame.url;
    const parsedURL = Common15.ParsedURL.ParsedURL.fromString(urlToParse);
    if (!parsedURL || parsedURL.scheme !== "http" && parsedURL.scheme !== "https" && parsedURL.scheme !== "file") {
      return;
    }
    const domain = parsedURL.securityOrigin();
    if (!this.domains[domain]) {
      this.domains[domain] = true;
      const cookieDomainTreeElement = new CookieTreeElement(this.panel, frame, parsedURL);
      this.cookieListTreeElement.appendChild(cookieDomainTreeElement);
    }
  }
  domStorageAdded(event) {
    const domStorage = event.data;
    this.addDOMStorage(domStorage);
  }
  addDOMStorage(domStorage) {
    console.assert(!this.domStorageTreeElements.get(domStorage));
    console.assert(Boolean(domStorage.storageKey));
    const domStorageTreeElement = new DOMStorageTreeElement(this.panel, domStorage);
    this.domStorageTreeElements.set(domStorage, domStorageTreeElement);
    if (domStorage.isLocalStorage) {
      this.localStorageListTreeElement.appendChild(domStorageTreeElement, comparator);
    } else {
      this.sessionStorageListTreeElement.appendChild(domStorageTreeElement, comparator);
    }
    function comparator(a, b) {
      const aTitle = a.titleAsText().toLocaleLowerCase();
      const bTitle = b.titleAsText().toLocaleUpperCase();
      return aTitle.localeCompare(bTitle);
    }
  }
  domStorageRemoved(event) {
    const domStorage = event.data;
    this.removeDOMStorage(domStorage);
  }
  removeDOMStorage(domStorage) {
    const treeElement = this.domStorageTreeElements.get(domStorage);
    if (!treeElement) {
      return;
    }
    const wasSelected = treeElement.selected;
    const parentListTreeElement = treeElement.parent;
    if (parentListTreeElement) {
      parentListTreeElement.removeChild(treeElement);
      if (wasSelected) {
        parentListTreeElement.select();
      }
    }
    this.domStorageTreeElements.delete(domStorage);
  }
  extensionStorageAdded(event) {
    const extensionStorage = event.data;
    this.addExtensionStorage(extensionStorage);
  }
  useTreeViewForExtensionStorage(extensionStorage) {
    return !extensionStorage.matchesTarget(this.target);
  }
  getExtensionStorageAreaParent(extensionStorage) {
    if (!this.useTreeViewForExtensionStorage(extensionStorage)) {
      return this.extensionStorageListTreeElement;
    }
    const existingParent = this.extensionIdToStorageTreeParentElement.get(extensionStorage.extensionId);
    if (existingParent) {
      return existingParent;
    }
    const parent = new ExtensionStorageTreeParentElement(this.panel, extensionStorage.extensionId, extensionStorage.name);
    this.extensionIdToStorageTreeParentElement.set(extensionStorage.extensionId, parent);
    this.extensionStorageListTreeElement?.appendChild(parent);
    return parent;
  }
  addExtensionStorage(extensionStorage) {
    if (this.extensionStorageModels.find((m) => m !== extensionStorage.model && m.storageForIdAndArea(extensionStorage.extensionId, extensionStorage.storageArea))) {
      return;
    }
    console.assert(Boolean(this.extensionStorageListTreeElement));
    console.assert(!this.extensionStorageTreeElements.get(extensionStorage.key));
    const extensionStorageTreeElement = new ExtensionStorageTreeElement(this.panel, extensionStorage);
    this.extensionStorageTreeElements.set(extensionStorage.key, extensionStorageTreeElement);
    this.getExtensionStorageAreaParent(extensionStorage)?.appendChild(extensionStorageTreeElement, comparator);
    function comparator(a, b) {
      const getStorageArea = (e) => e.storageArea;
      const order = [
        "session",
        "local",
        "sync",
        "managed"
      ];
      return order.indexOf(getStorageArea(a)) - order.indexOf(getStorageArea(b));
    }
  }
  extensionStorageRemoved(event) {
    const extensionStorage = event.data;
    this.removeExtensionStorage(extensionStorage);
  }
  removeExtensionStorage(extensionStorage) {
    if (this.extensionStorageModels.find((m) => m.storageForIdAndArea(extensionStorage.extensionId, extensionStorage.storageArea))) {
      return;
    }
    const treeElement = this.extensionStorageTreeElements.get(extensionStorage.key);
    if (!treeElement) {
      return;
    }
    const wasSelected = treeElement.selected;
    const parentListTreeElement = treeElement.parent;
    if (parentListTreeElement) {
      parentListTreeElement.removeChild(treeElement);
      if (this.useTreeViewForExtensionStorage(extensionStorage) && parentListTreeElement.childCount() === 0) {
        this.extensionStorageListTreeElement?.removeChild(parentListTreeElement);
        this.extensionIdToStorageTreeParentElement.delete(extensionStorage.extensionId);
      } else if (wasSelected) {
        parentListTreeElement.select();
      }
    }
    this.extensionStorageTreeElements.delete(extensionStorage.key);
  }
  async sharedStorageAdded(event) {
    await this.addSharedStorage(event.data);
  }
  async addSharedStorage(sharedStorage) {
    const sharedStorageTreeElement = await SharedStorageTreeElement.createElement(this.panel, sharedStorage);
    if (this.sharedStorageTreeElements.has(sharedStorage.securityOrigin)) {
      return;
    }
    this.sharedStorageTreeElements.set(sharedStorage.securityOrigin, sharedStorageTreeElement);
    this.sharedStorageListTreeElement.appendChild(sharedStorageTreeElement);
    this.sharedStorageTreeElementDispatcher.dispatchEventToListeners("SharedStorageTreeElementAdded", { origin: sharedStorage.securityOrigin });
  }
  sharedStorageRemoved(event) {
    this.removeSharedStorage(event.data);
  }
  removeSharedStorage(sharedStorage) {
    const treeElement = this.sharedStorageTreeElements.get(sharedStorage.securityOrigin);
    if (!treeElement) {
      return;
    }
    const wasSelected = treeElement.selected;
    const parentListTreeElement = treeElement.parent;
    if (parentListTreeElement) {
      parentListTreeElement.removeChild(treeElement);
      parentListTreeElement.setExpandable(parentListTreeElement.childCount() > 0);
      if (wasSelected) {
        parentListTreeElement.select();
      }
    }
    this.sharedStorageTreeElements.delete(sharedStorage.securityOrigin);
  }
  sharedStorageAccess(event) {
    this.sharedStorageListTreeElement.addEvent(event.data);
  }
  async showResource(resource, line, column) {
    await this.resourcesSection.revealResource(resource, line, column);
  }
  showFrame(frame) {
    this.resourcesSection.revealAndSelectFrame(frame);
  }
  showPreloadingRuleSetView(revealInfo) {
    if (this.preloadingSummaryTreeElement) {
      this.preloadingSummaryTreeElement.expandAndRevealRuleSet(revealInfo);
    }
  }
  showPreloadingAttemptViewWithFilter(filter) {
    if (this.preloadingSummaryTreeElement) {
      this.preloadingSummaryTreeElement.expandAndRevealAttempts(filter);
    }
  }
  onmousemove(event) {
    const nodeUnderMouse = event.target;
    if (!nodeUnderMouse) {
      return;
    }
    const listNode = UI22.UIUtils.enclosingNodeOrSelfWithNodeName(nodeUnderMouse, "li");
    if (!listNode) {
      return;
    }
    const element = UI22.TreeOutline.TreeElement.getTreeElementBylistItemNode(listNode);
    if (this.previousHoveredElement === element) {
      return;
    }
    if (this.previousHoveredElement) {
      this.previousHoveredElement.hovered = false;
      delete this.previousHoveredElement;
    }
    if (element instanceof FrameTreeElement) {
      this.previousHoveredElement = element;
      element.hovered = true;
    }
  }
  onmouseleave(_event) {
    if (this.previousHoveredElement) {
      this.previousHoveredElement.hovered = false;
      delete this.previousHoveredElement;
    }
  }
};
var BackgroundServiceTreeElement = class extends ApplicationPanelTreeElement {
  serviceName;
  view;
  model;
  selectedInternal;
  constructor(storagePanel, serviceName) {
    super(storagePanel, BackgroundServiceView.getUIString(serviceName), false, Platform6.StringUtilities.toKebabCase(serviceName));
    this.serviceName = serviceName;
    this.selectedInternal = false;
    this.view = null;
    this.model = null;
    const backgroundServiceIcon = IconButton13.Icon.create(this.getIconType());
    this.setLeadingIcons([backgroundServiceIcon]);
  }
  getIconType() {
    switch (this.serviceName) {
      case "backgroundFetch":
        return "arrow-up-down";
      case "backgroundSync":
        return "sync";
      case "pushMessaging":
        return "cloud";
      case "notifications":
        return "bell";
      case "paymentHandler":
        return "credit-card";
      case "periodicBackgroundSync":
        return "watch";
      default:
        console.error(`Service ${this.serviceName} does not have a dedicated icon`);
        return "table";
    }
  }
  initialize(model) {
    this.model = model;
    if (this.selectedInternal && !this.view) {
      this.onselect(false);
    }
  }
  get itemURL() {
    return `background-service://${this.serviceName}`;
  }
  get selectable() {
    if (!this.model) {
      return false;
    }
    return super.selectable;
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    this.selectedInternal = true;
    if (!this.model) {
      return false;
    }
    if (!this.view) {
      this.view = new BackgroundServiceView(this.serviceName, this.model);
    }
    this.showView(this.view);
    UI22.Context.Context.instance().setFlavor(BackgroundServiceView, this.view);
    Host9.userMetrics.panelShown("background_service_" + this.serviceName);
    return false;
  }
};
var ServiceWorkersTreeElement = class extends ApplicationPanelTreeElement {
  view;
  constructor(storagePanel) {
    super(storagePanel, i18n51.i18n.lockedString("Service workers"), false, "service-workers");
    const icon = IconButton13.Icon.create("gears");
    this.setLeadingIcons([icon]);
  }
  get itemURL() {
    return "service-workers://";
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    if (!this.view) {
      this.view = new ServiceWorkersView();
    }
    this.showView(this.view);
    Host9.userMetrics.panelShown("service-workers");
    return false;
  }
};
var AppManifestTreeElement = class extends ApplicationPanelTreeElement {
  view;
  constructor(storagePanel) {
    super(storagePanel, i18nString26(UIStrings26.manifest), true, "manifest");
    const icon = IconButton13.Icon.create("document");
    this.setLeadingIcons([icon]);
    self.onInvokeElement(this.listItemElement, this.onInvoke.bind(this));
    const emptyView = new UI22.EmptyWidget.EmptyWidget(i18nString26(UIStrings26.noManifestDetected), i18nString26(UIStrings26.manifestDescription));
    const reportView = new UI22.ReportView.ReportView(i18nString26(UIStrings26.appManifest));
    this.view = new AppManifestView(emptyView, reportView, new Common15.Throttler.Throttler(1e3));
    UI22.ARIAUtils.setLabel(this.listItemElement, i18nString26(UIStrings26.onInvokeManifestAlert));
    const handleExpansion = (hasManifest) => {
      this.setExpandable(hasManifest);
    };
    this.view.addEventListener("ManifestDetected", (event) => handleExpansion(event.data));
  }
  get itemURL() {
    return "manifest://";
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    this.showView(this.view);
    Host9.userMetrics.panelShown("app-manifest");
    return false;
  }
  generateChildren() {
    const staticSections = this.view.getStaticSections();
    for (const section8 of staticSections) {
      const sectionElement = section8.getTitleElement();
      const childTitle = section8.title();
      const sectionFieldElement = section8.getFieldElement();
      const child = new ManifestChildTreeElement(this.resourcesPanel, sectionElement, childTitle, sectionFieldElement, section8.jslogContext || "");
      this.appendChild(child);
    }
  }
  onInvoke() {
    this.view.getManifestElement().scrollIntoView();
    UI22.ARIAUtils.LiveAnnouncer.alert(i18nString26(UIStrings26.onInvokeAlert, { PH1: this.listItemElement.title }));
  }
  showManifestView() {
    this.showView(this.view);
  }
};
var ManifestChildTreeElement = class extends ApplicationPanelTreeElement {
  #sectionElement;
  #sectionFieldElement;
  constructor(storagePanel, element, childTitle, fieldElement, jslogContext) {
    super(storagePanel, childTitle, false, jslogContext);
    const icon = IconButton13.Icon.create("document");
    this.setLeadingIcons([icon]);
    this.#sectionElement = element;
    this.#sectionFieldElement = fieldElement;
    self.onInvokeElement(this.listItemElement, this.onInvoke.bind(this));
    this.listItemElement.addEventListener("keydown", this.onInvokeElementKeydown.bind(this));
    UI22.ARIAUtils.setLabel(this.listItemElement, i18nString26(UIStrings26.beforeInvokeAlert, { PH1: this.listItemElement.title }));
  }
  get itemURL() {
    return "manifest://" + this.title;
  }
  onInvoke() {
    this.parent?.showManifestView();
    this.#sectionElement.scrollIntoView();
    UI22.ARIAUtils.LiveAnnouncer.alert(i18nString26(UIStrings26.onInvokeAlert, { PH1: this.listItemElement.title }));
  }
  // direct focus to the corresponding element
  onInvokeElementKeydown(event) {
    if (event.key !== "Tab" || event.shiftKey) {
      return;
    }
    const checkBoxElement = this.#sectionFieldElement.querySelector(".mask-checkbox");
    let focusableElement = this.#sectionFieldElement.querySelector('[tabindex="0"]');
    if (checkBoxElement?.shadowRoot) {
      focusableElement = checkBoxElement.shadowRoot.querySelector("input") || null;
    } else if (!focusableElement) {
      focusableElement = this.#sectionFieldElement.querySelector("devtools-protocol-handlers-view")?.shadowRoot?.querySelector('[tabindex="0"]') || null;
    }
    if (focusableElement) {
      focusableElement?.focus();
      event.consume(true);
    }
  }
};
var ClearStorageTreeElement = class extends ApplicationPanelTreeElement {
  view;
  constructor(storagePanel) {
    super(storagePanel, i18nString26(UIStrings26.storage), false, "storage");
    const icon = IconButton13.Icon.create("database");
    this.setLeadingIcons([icon]);
  }
  get itemURL() {
    return "clear-storage://";
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    if (!this.view) {
      this.view = new StorageView();
    }
    this.showView(this.view);
    Host9.userMetrics.panelShown(Host9.UserMetrics.PanelCodes[Host9.UserMetrics.PanelCodes.storage]);
    return false;
  }
};
var IndexedDBTreeElement = class extends ExpandableApplicationPanelTreeElement {
  idbDatabaseTreeElements;
  storageBucket;
  constructor(storagePanel, storageBucket) {
    super(storagePanel, i18nString26(UIStrings26.indexeddb), i18nString26(UIStrings26.noIndexeddb), i18nString26(UIStrings26.indexeddbDescription), "indexed-db");
    const icon = IconButton13.Icon.create("database");
    this.setLeadingIcons([icon]);
    this.idbDatabaseTreeElements = [];
    this.storageBucket = storageBucket;
    this.initialize();
  }
  initialize() {
    SDK22.TargetManager.TargetManager.instance().addModelListener(IndexedDBModel, Events2.DatabaseAdded, this.indexedDBAdded, this, { scoped: true });
    SDK22.TargetManager.TargetManager.instance().addModelListener(IndexedDBModel, Events2.DatabaseRemoved, this.indexedDBRemoved, this, { scoped: true });
    SDK22.TargetManager.TargetManager.instance().addModelListener(IndexedDBModel, Events2.DatabaseLoaded, this.indexedDBLoaded, this, { scoped: true });
    SDK22.TargetManager.TargetManager.instance().addModelListener(IndexedDBModel, Events2.IndexedDBContentUpdated, this.indexedDBContentUpdated, this, { scoped: true });
    this.idbDatabaseTreeElements = [];
    for (const indexedDBModel of SDK22.TargetManager.TargetManager.instance().models(IndexedDBModel, { scoped: true })) {
      const databases = indexedDBModel.databases();
      for (let j = 0; j < databases.length; ++j) {
        this.addIndexedDB(indexedDBModel, databases[j]);
      }
    }
  }
  addIndexedDBForModel(model) {
    for (const databaseId of model.databases()) {
      this.addIndexedDB(model, databaseId);
    }
  }
  removeIndexedDBForModel(model) {
    const idbDatabaseTreeElements = this.idbDatabaseTreeElements.filter((element) => element.model === model);
    for (const idbDatabaseTreeElement of idbDatabaseTreeElements) {
      this.removeIDBDatabaseTreeElement(idbDatabaseTreeElement);
    }
  }
  onattach() {
    super.onattach();
    this.listItemElement.addEventListener("contextmenu", this.handleContextMenuEvent.bind(this), true);
  }
  handleContextMenuEvent(event) {
    const contextMenu = new UI22.ContextMenu.ContextMenu(event);
    contextMenu.defaultSection().appendItem(i18nString26(UIStrings26.refreshIndexeddb), this.refreshIndexedDB.bind(this), { jslogContext: "refresh-indexeddb" });
    void contextMenu.show();
  }
  refreshIndexedDB() {
    for (const indexedDBModel of SDK22.TargetManager.TargetManager.instance().models(IndexedDBModel, { scoped: true })) {
      void indexedDBModel.refreshDatabaseNames();
    }
  }
  databaseInTree(databaseId) {
    if (this.storageBucket) {
      return databaseId.inBucket(this.storageBucket);
    }
    return true;
  }
  indexedDBAdded({ data: { databaseId, model } }) {
    this.addIndexedDB(model, databaseId);
  }
  addIndexedDB(model, databaseId) {
    if (!this.databaseInTree(databaseId)) {
      return;
    }
    const idbDatabaseTreeElement = new IDBDatabaseTreeElement(this.resourcesPanel, model, databaseId);
    this.idbDatabaseTreeElements.push(idbDatabaseTreeElement);
    this.appendChild(idbDatabaseTreeElement);
    model.refreshDatabase(databaseId);
  }
  indexedDBRemoved({ data: { databaseId, model } }) {
    const idbDatabaseTreeElement = this.idbDatabaseTreeElement(model, databaseId);
    if (!idbDatabaseTreeElement) {
      return;
    }
    this.removeIDBDatabaseTreeElement(idbDatabaseTreeElement);
  }
  removeIDBDatabaseTreeElement(idbDatabaseTreeElement) {
    idbDatabaseTreeElement.clear();
    this.removeChild(idbDatabaseTreeElement);
    Platform6.ArrayUtilities.removeElement(this.idbDatabaseTreeElements, idbDatabaseTreeElement);
    this.setExpandable(this.childCount() > 0);
  }
  indexedDBLoaded({ data: { database, model, entriesUpdated } }) {
    const idbDatabaseTreeElement = this.idbDatabaseTreeElement(model, database.databaseId);
    if (!idbDatabaseTreeElement) {
      return;
    }
    idbDatabaseTreeElement.update(database, entriesUpdated);
    this.indexedDBLoadedForTest();
  }
  indexedDBLoadedForTest() {
  }
  indexedDBContentUpdated({ data: { databaseId, objectStoreName, model } }) {
    const idbDatabaseTreeElement = this.idbDatabaseTreeElement(model, databaseId);
    if (!idbDatabaseTreeElement) {
      return;
    }
    idbDatabaseTreeElement.indexedDBContentUpdated(objectStoreName);
  }
  idbDatabaseTreeElement(model, databaseId) {
    return this.idbDatabaseTreeElements.find((x) => x.databaseId.equals(databaseId) && x.model === model) || null;
  }
};
var IDBDatabaseTreeElement = class extends ApplicationPanelTreeElement {
  model;
  databaseId;
  idbObjectStoreTreeElements;
  database;
  view;
  constructor(storagePanel, model, databaseId) {
    super(storagePanel, databaseId.name, false, "indexed-db-database");
    this.model = model;
    this.databaseId = databaseId;
    this.idbObjectStoreTreeElements = /* @__PURE__ */ new Map();
    const icon = IconButton13.Icon.create("database");
    this.setLeadingIcons([icon]);
    this.model.addEventListener(Events2.DatabaseNamesRefreshed, this.refreshIndexedDB, this);
  }
  get itemURL() {
    return "indexedDB://" + this.databaseId.storageBucket.storageKey + "/" + (this.databaseId.storageBucket.name ?? "") + "/" + this.databaseId.name;
  }
  onattach() {
    super.onattach();
    this.listItemElement.addEventListener("contextmenu", this.handleContextMenuEvent.bind(this), true);
  }
  handleContextMenuEvent(event) {
    const contextMenu = new UI22.ContextMenu.ContextMenu(event);
    contextMenu.defaultSection().appendItem(i18nString26(UIStrings26.refreshIndexeddb), this.refreshIndexedDB.bind(this), { jslogContext: "refresh-indexeddb" });
    void contextMenu.show();
  }
  refreshIndexedDB() {
    this.model.refreshDatabase(this.databaseId);
  }
  indexedDBContentUpdated(objectStoreName) {
    const treeElement = this.idbObjectStoreTreeElements.get(objectStoreName);
    if (treeElement) {
      treeElement.markNeedsRefresh();
    }
  }
  update(database, entriesUpdated) {
    this.database = database;
    const objectStoreNames = /* @__PURE__ */ new Set();
    for (const objectStoreName of [...this.database.objectStores.keys()].sort()) {
      const objectStore = this.database.objectStores.get(objectStoreName);
      if (!objectStore) {
        continue;
      }
      objectStoreNames.add(objectStore.name);
      let treeElement = this.idbObjectStoreTreeElements.get(objectStore.name);
      if (!treeElement) {
        treeElement = new IDBObjectStoreTreeElement(this.resourcesPanel, this.model, this.databaseId, objectStore);
        this.idbObjectStoreTreeElements.set(objectStore.name, treeElement);
        this.appendChild(treeElement);
      }
      treeElement.update(objectStore, entriesUpdated);
    }
    for (const objectStoreName of this.idbObjectStoreTreeElements.keys()) {
      if (!objectStoreNames.has(objectStoreName)) {
        this.objectStoreRemoved(objectStoreName);
      }
    }
    if (this.view) {
      this.view.getComponent().update(database);
    }
    this.updateTooltip();
  }
  updateTooltip() {
    const version = this.database ? this.database.version : "-";
    if (Object.keys(this.idbObjectStoreTreeElements).length === 0) {
      this.tooltip = i18nString26(UIStrings26.versionSEmpty, { PH1: version });
    } else {
      this.tooltip = i18nString26(UIStrings26.versionS, { PH1: version });
    }
  }
  get selectable() {
    if (!this.database) {
      return false;
    }
    return super.selectable;
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    if (!this.database) {
      return false;
    }
    if (!this.view) {
      this.view = LegacyWrapper11.LegacyWrapper.legacyWrapper(UI22.Widget.VBox, new IDBDatabaseView(this.model, this.database), "indexeddb-data");
    }
    this.showView(this.view);
    Host9.userMetrics.panelShown("indexed-db");
    return false;
  }
  objectStoreRemoved(objectStoreName) {
    const objectStoreTreeElement = this.idbObjectStoreTreeElements.get(objectStoreName);
    if (objectStoreTreeElement) {
      objectStoreTreeElement.clear();
      this.removeChild(objectStoreTreeElement);
    }
    this.idbObjectStoreTreeElements.delete(objectStoreName);
    this.updateTooltip();
  }
  clear() {
    for (const objectStoreName of this.idbObjectStoreTreeElements.keys()) {
      this.objectStoreRemoved(objectStoreName);
    }
  }
};
var IDBObjectStoreTreeElement = class extends ApplicationPanelTreeElement {
  model;
  databaseId;
  idbIndexTreeElements;
  objectStore;
  view;
  constructor(storagePanel, model, databaseId, objectStore) {
    super(storagePanel, objectStore.name, false, "indexed-db-object-store");
    this.model = model;
    this.databaseId = databaseId;
    this.idbIndexTreeElements = /* @__PURE__ */ new Map();
    this.objectStore = objectStore;
    this.view = null;
    const icon = IconButton13.Icon.create("table");
    this.setLeadingIcons([icon]);
  }
  get itemURL() {
    return "indexedDB://" + this.databaseId.storageBucket.storageKey + "/" + (this.databaseId.storageBucket.name ?? "") + "/" + this.databaseId.name + "/" + this.objectStore.name;
  }
  onattach() {
    super.onattach();
    this.listItemElement.addEventListener("contextmenu", this.handleContextMenuEvent.bind(this), true);
  }
  markNeedsRefresh() {
    if (this.view) {
      this.view.markNeedsRefresh();
    }
    for (const treeElement of this.idbIndexTreeElements.values()) {
      treeElement.markNeedsRefresh();
    }
  }
  handleContextMenuEvent(event) {
    const contextMenu = new UI22.ContextMenu.ContextMenu(event);
    contextMenu.defaultSection().appendItem(i18nString26(UIStrings26.clear), this.clearObjectStore.bind(this), { jslogContext: "clear" });
    void contextMenu.show();
  }
  refreshObjectStore() {
    if (this.view) {
      this.view.refreshData();
    }
    for (const treeElement of this.idbIndexTreeElements.values()) {
      treeElement.refreshIndex();
    }
  }
  async clearObjectStore() {
    await this.model.clearObjectStore(this.databaseId, this.objectStore.name);
    this.update(this.objectStore, true);
  }
  update(objectStore, entriesUpdated) {
    this.objectStore = objectStore;
    const indexNames = /* @__PURE__ */ new Set();
    for (const index of this.objectStore.indexes.values()) {
      indexNames.add(index.name);
      let treeElement = this.idbIndexTreeElements.get(index.name);
      if (!treeElement) {
        treeElement = new IDBIndexTreeElement(this.resourcesPanel, this.model, this.databaseId, this.objectStore, index, this.refreshObjectStore.bind(this));
        this.idbIndexTreeElements.set(index.name, treeElement);
        this.appendChild(treeElement);
      }
      treeElement.update(this.objectStore, index, entriesUpdated);
    }
    for (const indexName of this.idbIndexTreeElements.keys()) {
      if (!indexNames.has(indexName)) {
        this.indexRemoved(indexName);
      }
    }
    for (const [indexName, treeElement] of this.idbIndexTreeElements.entries()) {
      if (!indexNames.has(indexName)) {
        this.removeChild(treeElement);
        this.idbIndexTreeElements.delete(indexName);
      }
    }
    if (this.childCount()) {
      this.expand();
    }
    if (this.view && entriesUpdated) {
      this.view.update(this.objectStore, null);
    }
    this.updateTooltip();
  }
  updateTooltip() {
    const keyPathString = this.objectStore.keyPathString;
    let tooltipString = keyPathString !== null ? i18nString26(UIStrings26.keyPathS, { PH1: keyPathString }) : "";
    if (this.objectStore.autoIncrement) {
      tooltipString += "\n" + i18n51.i18n.lockedString("autoIncrement");
    }
    this.tooltip = tooltipString;
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    if (!this.view) {
      this.view = new IDBDataView(this.model, this.databaseId, this.objectStore, null, this.refreshObjectStore.bind(this));
    }
    this.showView(this.view);
    Host9.userMetrics.panelShown("indexed-db");
    return false;
  }
  indexRemoved(indexName) {
    const indexTreeElement = this.idbIndexTreeElements.get(indexName);
    if (indexTreeElement) {
      indexTreeElement.clear();
      this.removeChild(indexTreeElement);
    }
    this.idbIndexTreeElements.delete(indexName);
  }
  clear() {
    for (const indexName of this.idbIndexTreeElements.keys()) {
      this.indexRemoved(indexName);
    }
    if (this.view) {
      this.view.clear();
    }
  }
};
var IDBIndexTreeElement = class extends ApplicationPanelTreeElement {
  model;
  databaseId;
  objectStore;
  index;
  refreshObjectStore;
  view;
  constructor(storagePanel, model, databaseId, objectStore, index, refreshObjectStore) {
    super(storagePanel, index.name, false, "indexed-db");
    this.model = model;
    this.databaseId = databaseId;
    this.objectStore = objectStore;
    this.index = index;
    this.refreshObjectStore = refreshObjectStore;
  }
  get itemURL() {
    return "indexedDB://" + this.databaseId.storageBucket.storageKey + "/" + (this.databaseId.storageBucket.name ?? "") + "/" + this.databaseId.name + "/" + this.objectStore.name + "/" + this.index.name;
  }
  markNeedsRefresh() {
    if (this.view) {
      this.view.markNeedsRefresh();
    }
  }
  refreshIndex() {
    if (this.view) {
      this.view.refreshData();
    }
  }
  update(objectStore, index, entriesUpdated) {
    this.objectStore = objectStore;
    this.index = index;
    if (this.view && entriesUpdated) {
      this.view.update(this.objectStore, this.index);
    }
    this.updateTooltip();
  }
  updateTooltip() {
    const tooltipLines = [];
    const keyPathString = this.index.keyPathString;
    tooltipLines.push(i18nString26(UIStrings26.keyPathS, { PH1: keyPathString }));
    if (this.index.unique) {
      tooltipLines.push(i18n51.i18n.lockedString("unique"));
    }
    if (this.index.multiEntry) {
      tooltipLines.push(i18n51.i18n.lockedString("multiEntry"));
    }
    this.tooltip = tooltipLines.join("\n");
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    if (!this.view) {
      this.view = new IDBDataView(this.model, this.databaseId, this.objectStore, this.index, this.refreshObjectStore);
    }
    this.showView(this.view);
    Host9.userMetrics.panelShown("indexed-db");
    return false;
  }
  clear() {
    if (this.view) {
      this.view.clear();
    }
  }
};
var DOMStorageTreeElement = class extends ApplicationPanelTreeElement {
  domStorage;
  constructor(storagePanel, domStorage) {
    super(storagePanel, domStorage.storageKey ? SDK22.StorageKeyManager.parseStorageKey(domStorage.storageKey).origin : i18nString26(UIStrings26.localFiles), false, domStorage.isLocalStorage ? "local-storage-for-domain" : "session-storage-for-domain");
    this.domStorage = domStorage;
    const icon = IconButton13.Icon.create("table");
    this.setLeadingIcons([icon]);
  }
  get itemURL() {
    return "storage://" + this.domStorage.storageKey + "/" + (this.domStorage.isLocalStorage ? "local" : "session");
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    Host9.userMetrics.panelShown("dom-storage");
    this.resourcesPanel.showDOMStorage(this.domStorage);
    return false;
  }
  onattach() {
    super.onattach();
    this.listItemElement.addEventListener("contextmenu", this.handleContextMenuEvent.bind(this), true);
  }
  handleContextMenuEvent(event) {
    const contextMenu = new UI22.ContextMenu.ContextMenu(event);
    contextMenu.defaultSection().appendItem(i18nString26(UIStrings26.clear), () => this.domStorage.clear(), { jslogContext: "clear" });
    void contextMenu.show();
  }
};
var ExtensionStorageTreeElement = class extends ApplicationPanelTreeElement {
  extensionStorage;
  constructor(storagePanel, extensionStorage) {
    super(storagePanel, nameForExtensionStorageArea(extensionStorage.storageArea), false, "extension-storage-for-domain");
    this.extensionStorage = extensionStorage;
    const icon = IconButton13.Icon.create("table");
    this.setLeadingIcons([icon]);
  }
  get storageArea() {
    return this.extensionStorage.storageArea;
  }
  get itemURL() {
    return "extension-storage://" + this.extensionStorage.extensionId + "/" + this.extensionStorage.storageArea;
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    this.resourcesPanel.showExtensionStorage(this.extensionStorage);
    Host9.userMetrics.panelShown("extension-storage");
    return false;
  }
  onattach() {
    super.onattach();
    this.listItemElement.addEventListener("contextmenu", this.handleContextMenuEvent.bind(this), true);
  }
  handleContextMenuEvent(event) {
    const contextMenu = new UI22.ContextMenu.ContextMenu(event);
    contextMenu.defaultSection().appendItem(i18nString26(UIStrings26.clear), () => this.extensionStorage.clear(), { jslogContext: "clear" });
    void contextMenu.show();
  }
};
var ExtensionStorageTreeParentElement = class extends ApplicationPanelTreeElement {
  extensionId;
  constructor(storagePanel, extensionId, extensionName) {
    super(storagePanel, extensionName || extensionId, true, "extension-storage-for-domain");
    this.extensionId = extensionId;
    const icon = IconButton13.Icon.create("table");
    this.setLeadingIcons([icon]);
  }
  get itemURL() {
    return "extension-storage://" + this.extensionId;
  }
};
var CookieTreeElement = class extends ApplicationPanelTreeElement {
  target;
  cookieDomainInternal;
  constructor(storagePanel, frame, cookieUrl) {
    super(storagePanel, cookieUrl.securityOrigin() || i18nString26(UIStrings26.localFiles), false, "cookies-for-frame");
    this.target = frame.resourceTreeModel().target();
    this.cookieDomainInternal = cookieUrl.securityOrigin();
    this.tooltip = i18nString26(UIStrings26.cookiesUsedByFramesFromS, { PH1: this.cookieDomainInternal });
    const icon = IconButton13.Icon.create("cookie");
    if (IssuesManager.RelatedIssue.hasThirdPartyPhaseoutCookieIssueForDomain(cookieUrl.domain())) {
      icon.name = "warning-filled";
      this.tooltip = i18nString26(UIStrings26.thirdPartyPhaseout, { PH1: this.cookieDomainInternal });
    }
    this.setLeadingIcons([icon]);
  }
  get itemURL() {
    return "cookies://" + this.cookieDomainInternal;
  }
  cookieDomain() {
    return this.cookieDomainInternal;
  }
  onattach() {
    super.onattach();
    this.listItemElement.addEventListener("contextmenu", this.handleContextMenuEvent.bind(this), true);
  }
  handleContextMenuEvent(event) {
    const contextMenu = new UI22.ContextMenu.ContextMenu(event);
    contextMenu.defaultSection().appendItem(i18nString26(UIStrings26.clear), () => this.resourcesPanel.clearCookies(this.target, this.cookieDomainInternal), { jslogContext: "clear" });
    void contextMenu.show();
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    this.resourcesPanel.showCookies(this.target, this.cookieDomainInternal);
    Host9.userMetrics.panelShown(Host9.UserMetrics.PanelCodes[Host9.UserMetrics.PanelCodes.cookies]);
    return false;
  }
};
var StorageCategoryView = class extends UI22.Widget.VBox {
  emptyWidget;
  constructor() {
    super();
    this.element.classList.add("storage-view");
    this.emptyWidget = new UI22.EmptyWidget.EmptyWidget("", "");
    this.emptyWidget.show(this.element);
  }
  setText(text) {
    this.emptyWidget.text = text;
  }
  setHeadline(header) {
    this.emptyWidget.header = header;
  }
  setLink(link3) {
    this.emptyWidget.link = link3;
  }
};
var ResourcesSection = class {
  panel;
  treeElement;
  treeElementForFrameId;
  treeElementForTargetId;
  constructor(storagePanel, treeElement) {
    this.panel = storagePanel;
    this.treeElement = treeElement;
    UI22.ARIAUtils.setLabel(this.treeElement.listItemNode, "Resources Section");
    this.treeElementForFrameId = /* @__PURE__ */ new Map();
    this.treeElementForTargetId = /* @__PURE__ */ new Map();
    const frameManager = SDK22.FrameManager.FrameManager.instance();
    frameManager.addEventListener("FrameAddedToTarget", (event) => this.frameAdded(event.data.frame), this);
    frameManager.addEventListener("FrameRemoved", (event) => this.frameDetached(event.data.frameId), this);
    frameManager.addEventListener("FrameNavigated", (event) => this.frameNavigated(event.data.frame), this);
    frameManager.addEventListener("ResourceAdded", (event) => this.resourceAdded(event.data.resource), this);
    SDK22.TargetManager.TargetManager.instance().addModelListener(SDK22.ChildTargetManager.ChildTargetManager, "TargetCreated", this.windowOpened, this, { scoped: true });
    SDK22.TargetManager.TargetManager.instance().addModelListener(SDK22.ChildTargetManager.ChildTargetManager, "TargetInfoChanged", this.windowChanged, this, { scoped: true });
    SDK22.TargetManager.TargetManager.instance().addModelListener(SDK22.ChildTargetManager.ChildTargetManager, "TargetDestroyed", this.windowDestroyed, this, { scoped: true });
    SDK22.TargetManager.TargetManager.instance().observeTargets(this, { scoped: true });
  }
  initialize() {
    const frameManager = SDK22.FrameManager.FrameManager.instance();
    for (const frame of frameManager.getAllFrames()) {
      if (!this.treeElementForFrameId.get(frame.id)) {
        this.addFrameAndParents(frame);
      }
      const childTargetManager = frame.resourceTreeModel().target().model(SDK22.ChildTargetManager.ChildTargetManager);
      if (childTargetManager) {
        for (const targetInfo of childTargetManager.targetInfos()) {
          this.windowOpened({ data: targetInfo });
        }
      }
    }
  }
  targetAdded(target) {
    if (target.type() === SDK22.Target.Type.Worker || target.type() === SDK22.Target.Type.ServiceWorker) {
      void this.workerAdded(target);
    }
    if (target.type() === SDK22.Target.Type.FRAME && target === target.outermostTarget()) {
      this.initialize();
    }
  }
  async workerAdded(target) {
    const parentTarget = target.parentTarget();
    if (!parentTarget) {
      return;
    }
    const parentTargetId = parentTarget.id();
    const frameTreeElement = this.treeElementForTargetId.get(parentTargetId);
    const targetId = target.id();
    assertNotMainTarget(targetId);
    const { targetInfo } = await parentTarget.targetAgent().invoke_getTargetInfo({ targetId });
    if (frameTreeElement && targetInfo) {
      frameTreeElement.workerCreated(targetInfo);
    }
  }
  targetRemoved(_target) {
  }
  addFrameAndParents(frame) {
    const parentFrame = frame.parentFrame();
    if (parentFrame && !this.treeElementForFrameId.get(parentFrame.id)) {
      this.addFrameAndParents(parentFrame);
    }
    this.frameAdded(frame);
  }
  expandFrame(frame) {
    if (!frame) {
      return false;
    }
    let treeElement = this.treeElementForFrameId.get(frame.id);
    if (!treeElement && !this.expandFrame(frame.parentFrame())) {
      return false;
    }
    treeElement = this.treeElementForFrameId.get(frame.id);
    if (!treeElement) {
      return false;
    }
    treeElement.expand();
    return true;
  }
  async revealResource(resource, line, column) {
    if (!this.expandFrame(resource.frame())) {
      return;
    }
    const resourceTreeElement = FrameResourceTreeElement.forResource(resource);
    if (resourceTreeElement) {
      await resourceTreeElement.revealResource(line, column);
    }
  }
  revealAndSelectFrame(frame) {
    const frameTreeElement = this.treeElementForFrameId.get(frame.id);
    frameTreeElement?.reveal();
    frameTreeElement?.select();
  }
  frameAdded(frame) {
    if (!SDK22.TargetManager.TargetManager.instance().isInScope(frame.resourceTreeModel())) {
      return;
    }
    const parentFrame = frame.parentFrame();
    const parentTreeElement = parentFrame ? this.treeElementForFrameId.get(parentFrame.id) : this.treeElement;
    if (!parentTreeElement) {
      return;
    }
    const existingElement = this.treeElementForFrameId.get(frame.id);
    if (existingElement) {
      this.treeElementForFrameId.delete(frame.id);
      if (existingElement.parent) {
        existingElement.parent.removeChild(existingElement);
      }
    }
    const frameTreeElement = new FrameTreeElement(this, frame);
    this.treeElementForFrameId.set(frame.id, frameTreeElement);
    const targetId = frame.resourceTreeModel().target().id();
    if (!this.treeElementForTargetId.get(targetId)) {
      this.treeElementForTargetId.set(targetId, frameTreeElement);
    }
    parentTreeElement.appendChild(frameTreeElement);
    for (const resource of frame.resources()) {
      this.resourceAdded(resource);
    }
  }
  frameDetached(frameId) {
    const frameTreeElement = this.treeElementForFrameId.get(frameId);
    if (!frameTreeElement) {
      return;
    }
    this.treeElementForFrameId.delete(frameId);
    if (frameTreeElement.parent) {
      frameTreeElement.parent.removeChild(frameTreeElement);
    }
  }
  frameNavigated(frame) {
    if (!SDK22.TargetManager.TargetManager.instance().isInScope(frame.resourceTreeModel())) {
      return;
    }
    const frameTreeElement = this.treeElementForFrameId.get(frame.id);
    if (frameTreeElement) {
      void frameTreeElement.frameNavigated(frame);
    }
  }
  resourceAdded(resource) {
    const frame = resource.frame();
    if (!frame) {
      return;
    }
    if (!SDK22.TargetManager.TargetManager.instance().isInScope(frame.resourceTreeModel())) {
      return;
    }
    const frameTreeElement = this.treeElementForFrameId.get(frame.id);
    if (!frameTreeElement) {
      return;
    }
    frameTreeElement.appendResource(resource);
  }
  windowOpened(event) {
    const targetInfo = event.data;
    if (targetInfo.openerId && targetInfo.type === "page") {
      const frameTreeElement = this.treeElementForFrameId.get(targetInfo.openerId);
      if (frameTreeElement) {
        this.treeElementForTargetId.set(targetInfo.targetId, frameTreeElement);
        frameTreeElement.windowOpened(targetInfo);
      }
    }
  }
  windowDestroyed(event) {
    const targetId = event.data;
    const frameTreeElement = this.treeElementForTargetId.get(targetId);
    if (frameTreeElement) {
      frameTreeElement.windowDestroyed(targetId);
      this.treeElementForTargetId.delete(targetId);
    }
  }
  windowChanged(event) {
    const targetInfo = event.data;
    if (targetInfo.openerId && targetInfo.type === "page") {
      const frameTreeElement = this.treeElementForFrameId.get(targetInfo.openerId);
      if (frameTreeElement) {
        frameTreeElement.windowChanged(targetInfo);
      }
    }
  }
  reset() {
    this.treeElement.removeChildren();
    this.treeElementForFrameId.clear();
    this.treeElementForTargetId.clear();
  }
};
var FrameTreeElement = class _FrameTreeElement extends ApplicationPanelTreeElement {
  section;
  frame;
  categoryElements;
  treeElementForResource;
  treeElementForWindow;
  treeElementForWorker;
  view;
  constructor(section8, frame) {
    super(section8.panel, "", false, "frame");
    this.section = section8;
    this.frame = frame;
    this.categoryElements = /* @__PURE__ */ new Map();
    this.treeElementForResource = /* @__PURE__ */ new Map();
    this.treeElementForWindow = /* @__PURE__ */ new Map();
    this.treeElementForWorker = /* @__PURE__ */ new Map();
    void this.frameNavigated(frame);
    this.view = null;
  }
  getIconTypeForFrame(frame) {
    if (frame.isOutermostFrame()) {
      return frame.unreachableUrl() ? "frame-crossed" : "frame";
    }
    return frame.unreachableUrl() ? "iframe-crossed" : "iframe";
  }
  async frameNavigated(frame) {
    const icon = IconButton13.Icon.create(this.getIconTypeForFrame(frame));
    if (frame.unreachableUrl()) {
      icon.classList.add("red-icon");
    }
    this.setLeadingIcons([icon]);
    this.invalidateChildren();
    if (this.title !== frame.displayName()) {
      this.title = frame.displayName();
      UI22.ARIAUtils.setLabel(this.listItemElement, this.title);
      if (this.parent) {
        const parent = this.parent;
        parent.removeChild(this);
        parent.appendChild(this);
      }
    }
    this.categoryElements.clear();
    this.treeElementForResource.clear();
    this.treeElementForWorker.clear();
    if (this.selected) {
      this.view = LegacyWrapper11.LegacyWrapper.legacyWrapper(UI22.Widget.Widget, new ApplicationComponents15.FrameDetailsView.FrameDetailsReportView(this.frame));
      this.showView(this.view);
    } else {
      this.view = null;
    }
    if (frame.isOutermostFrame()) {
      const targets = SDK22.TargetManager.TargetManager.instance().targets();
      for (const target of targets) {
        if (target.type() === SDK22.Target.Type.ServiceWorker && SDK22.TargetManager.TargetManager.instance().isInScope(target)) {
          const targetId = target.id();
          assertNotMainTarget(targetId);
          const agent = frame.resourceTreeModel().target().targetAgent();
          const targetInfo = (await agent.invoke_getTargetInfo({ targetId })).targetInfo;
          this.workerCreated(targetInfo);
        }
      }
    }
  }
  get itemURL() {
    if (this.frame.isOutermostFrame()) {
      return "frame://";
    }
    return "frame://" + encodeURI(this.frame.url);
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    if (!this.view) {
      this.view = LegacyWrapper11.LegacyWrapper.legacyWrapper(UI22.Widget.Widget, new ApplicationComponents15.FrameDetailsView.FrameDetailsReportView(this.frame));
    }
    Host9.userMetrics.panelShown("frame-details");
    this.showView(this.view);
    this.listItemElement.classList.remove("hovered");
    SDK22.OverlayModel.OverlayModel.hideDOMNodeHighlight();
    return false;
  }
  set hovered(hovered) {
    if (hovered) {
      this.listItemElement.classList.add("hovered");
      void this.frame.highlight();
    } else {
      this.listItemElement.classList.remove("hovered");
      SDK22.OverlayModel.OverlayModel.hideDOMNodeHighlight();
    }
  }
  appendResource(resource) {
    const statusCode = resource.statusCode();
    if (statusCode >= 301 && statusCode <= 303) {
      return;
    }
    const resourceType = resource.resourceType();
    const categoryName = resourceType.name();
    let categoryElement = resourceType === Common15.ResourceType.resourceTypes.Document ? this : this.categoryElements.get(categoryName);
    if (!categoryElement) {
      categoryElement = new ExpandableApplicationPanelTreeElement(this.section.panel, resource.resourceType().category().title(), "", i18nString26(UIStrings26.resourceDescription), categoryName, categoryName === "Frames");
      this.categoryElements.set(resourceType.name(), categoryElement);
      this.appendChild(categoryElement, _FrameTreeElement.presentationOrderCompare);
    }
    const resourceTreeElement = new FrameResourceTreeElement(this.section.panel, resource);
    categoryElement.appendChild(resourceTreeElement, _FrameTreeElement.presentationOrderCompare);
    this.treeElementForResource.set(resource.url, resourceTreeElement);
  }
  windowOpened(targetInfo) {
    const categoryKey = "opened-windows";
    let categoryElement = this.categoryElements.get(categoryKey);
    if (!categoryElement) {
      categoryElement = new ExpandableApplicationPanelTreeElement(this.section.panel, i18nString26(UIStrings26.openedWindows), "", i18nString26(UIStrings26.openedWindowsDescription), categoryKey);
      this.categoryElements.set(categoryKey, categoryElement);
      this.appendChild(categoryElement, _FrameTreeElement.presentationOrderCompare);
    }
    if (!this.treeElementForWindow.get(targetInfo.targetId)) {
      const windowTreeElement = new FrameWindowTreeElement(this.section.panel, targetInfo);
      categoryElement.appendChild(windowTreeElement);
      this.treeElementForWindow.set(targetInfo.targetId, windowTreeElement);
    }
  }
  workerCreated(targetInfo) {
    const categoryKey = targetInfo.type === "service_worker" ? "service-workers" : "web-workers";
    const categoryName = targetInfo.type === "service_worker" ? i18n51.i18n.lockedString("Service workers") : i18nString26(UIStrings26.webWorkers);
    let categoryElement = this.categoryElements.get(categoryKey);
    if (!categoryElement) {
      categoryElement = new ExpandableApplicationPanelTreeElement(this.section.panel, categoryName, "", i18nString26(UIStrings26.workerDescription), categoryKey);
      this.categoryElements.set(categoryKey, categoryElement);
      this.appendChild(categoryElement, _FrameTreeElement.presentationOrderCompare);
    }
    if (!this.treeElementForWorker.get(targetInfo.targetId)) {
      const workerTreeElement = new WorkerTreeElement(this.section.panel, targetInfo);
      categoryElement.appendChild(workerTreeElement);
      this.treeElementForWorker.set(targetInfo.targetId, workerTreeElement);
    }
  }
  windowChanged(targetInfo) {
    const windowTreeElement = this.treeElementForWindow.get(targetInfo.targetId);
    if (!windowTreeElement) {
      return;
    }
    if (windowTreeElement.title !== targetInfo.title) {
      windowTreeElement.title = targetInfo.title;
    }
    windowTreeElement.update(targetInfo);
  }
  windowDestroyed(targetId) {
    const windowTreeElement = this.treeElementForWindow.get(targetId);
    if (windowTreeElement) {
      windowTreeElement.windowClosed();
    }
  }
  appendChild(treeElement, comparator = _FrameTreeElement.presentationOrderCompare) {
    super.appendChild(treeElement, comparator);
  }
  /**
   * Order elements by type (first frames, then resources, last Document resources)
   * and then each of these groups in the alphabetical order.
   */
  static presentationOrderCompare(treeElement1, treeElement2) {
    function typeWeight(treeElement) {
      if (treeElement instanceof ExpandableApplicationPanelTreeElement) {
        return 2;
      }
      if (treeElement instanceof _FrameTreeElement) {
        return 1;
      }
      return 3;
    }
    const typeWeight1 = typeWeight(treeElement1);
    const typeWeight2 = typeWeight(treeElement2);
    return typeWeight1 - typeWeight2 || treeElement1.titleAsText().localeCompare(treeElement2.titleAsText());
  }
};
var resourceToFrameResourceTreeElement = /* @__PURE__ */ new WeakMap();
var FrameResourceTreeElement = class extends ApplicationPanelTreeElement {
  panel;
  resource;
  previewPromise;
  constructor(storagePanel, resource) {
    super(storagePanel, resource.isGenerated ? i18nString26(UIStrings26.documentNotAvailable) : resource.displayName, false, "frame-resource");
    this.panel = storagePanel;
    this.resource = resource;
    this.previewPromise = null;
    this.tooltip = resource.url;
    resourceToFrameResourceTreeElement.set(this.resource, this);
    const icon = IconButton13.Icon.create("document", "navigator-file-tree-item");
    icon.classList.add("navigator-" + resource.resourceType().name() + "-tree-item");
    this.setLeadingIcons([icon]);
  }
  static forResource(resource) {
    return resourceToFrameResourceTreeElement.get(resource);
  }
  get itemURL() {
    return this.resource.url;
  }
  preparePreview() {
    if (this.previewPromise) {
      return this.previewPromise;
    }
    const viewPromise = SourceFrame5.PreviewFactory.PreviewFactory.createPreview(this.resource, this.resource.mimeType);
    this.previewPromise = viewPromise.then((view) => {
      if (view) {
        return view;
      }
      return new UI22.EmptyWidget.EmptyWidget("", this.resource.url);
    });
    return this.previewPromise;
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    if (this.resource.isGenerated) {
      this.panel.showCategoryView("", i18nString26(UIStrings26.documentNotAvailable), i18nString26(UIStrings26.theContentOfThisDocumentHasBeen), null);
    } else {
      void this.panel.scheduleShowView(this.preparePreview());
    }
    Host9.userMetrics.panelShown("frame-resource");
    return false;
  }
  ondblclick(_event) {
    Host9.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(this.resource.url);
    return false;
  }
  onattach() {
    super.onattach();
    this.listItemElement.draggable = true;
    this.listItemElement.addEventListener("dragstart", this.ondragstart.bind(this), false);
    this.listItemElement.addEventListener("contextmenu", this.handleContextMenuEvent.bind(this), true);
  }
  ondragstart(event) {
    if (!event.dataTransfer) {
      return false;
    }
    event.dataTransfer.setData("text/plain", this.resource.content || "");
    event.dataTransfer.effectAllowed = "copy";
    return true;
  }
  handleContextMenuEvent(event) {
    const contextMenu = new UI22.ContextMenu.ContextMenu(event);
    contextMenu.appendApplicableItems(this.resource);
    void contextMenu.show();
  }
  async revealResource(lineNumber, columnNumber) {
    this.revealAndSelect(true);
    const view = await this.panel.scheduleShowView(this.preparePreview());
    if (!(view instanceof SourceFrame5.ResourceSourceFrame.ResourceSourceFrame) || typeof lineNumber !== "number") {
      return;
    }
    view.revealPosition({ lineNumber, columnNumber }, true);
  }
};
var FrameWindowTreeElement = class extends ApplicationPanelTreeElement {
  targetInfo;
  isWindowClosed;
  view;
  constructor(storagePanel, targetInfo) {
    super(storagePanel, targetInfo.title || i18nString26(UIStrings26.windowWithoutTitle), false, "window");
    this.targetInfo = targetInfo;
    this.isWindowClosed = false;
    this.view = null;
    this.updateIcon(targetInfo.canAccessOpener);
  }
  updateIcon(canAccessOpener) {
    const iconType = canAccessOpener ? "popup" : "frame";
    const icon = IconButton13.Icon.create(iconType);
    this.setLeadingIcons([icon]);
  }
  update(targetInfo) {
    if (targetInfo.canAccessOpener !== this.targetInfo.canAccessOpener) {
      this.updateIcon(targetInfo.canAccessOpener);
    }
    this.targetInfo = targetInfo;
    if (this.view) {
      this.view.setTargetInfo(targetInfo);
      this.view.update();
    }
  }
  windowClosed() {
    this.listItemElement.classList.add("window-closed");
    this.isWindowClosed = true;
    if (this.view) {
      this.view.setIsWindowClosed(true);
      this.view.update();
    }
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    if (!this.view) {
      this.view = new OpenedWindowDetailsView(this.targetInfo, this.isWindowClosed);
    } else {
      this.view.update();
    }
    this.showView(this.view);
    Host9.userMetrics.panelShown("frame-window");
    return false;
  }
  get itemURL() {
    return this.targetInfo.url;
  }
};
var WorkerTreeElement = class extends ApplicationPanelTreeElement {
  targetInfo;
  view;
  constructor(storagePanel, targetInfo) {
    super(storagePanel, targetInfo.title || targetInfo.url || i18nString26(UIStrings26.worker), false, "worker");
    this.targetInfo = targetInfo;
    this.view = null;
    const icon = IconButton13.Icon.create("gears", "navigator-file-tree-item");
    this.setLeadingIcons([icon]);
  }
  onselect(selectedByUser) {
    super.onselect(selectedByUser);
    if (!this.view) {
      this.view = new WorkerDetailsView(this.targetInfo);
    } else {
      this.view.update();
    }
    this.showView(this.view);
    Host9.userMetrics.panelShown("frame-worker");
    return false;
  }
  get itemURL() {
    return this.targetInfo.url;
  }
};

// gen/front_end/panels/application/CookieItemsView.js
var CookieItemsView_exports = {};
__export(CookieItemsView_exports, {
  CookieItemsView: () => CookieItemsView
});
import * as Common16 from "./../../core/common/common.js";
import * as i18n53 from "./../../core/i18n/i18n.js";
import * as SDK23 from "./../../core/sdk/sdk.js";
import * as IssuesManager2 from "./../../models/issues_manager/issues_manager.js";
import * as CookieTable from "./../../ui/legacy/components/cookie_table/cookie_table.js";
import * as UI23 from "./../../ui/legacy/legacy.js";
import * as VisualLogging15 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/application/cookieItemsView.css.js
var cookieItemsView_css_default = `/*
 * Copyright 2019 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.cookie-preview-widget {
  padding: 2px 6px;
}

.cookie-preview-widget-header {
  font-weight: bold;
  user-select: none;
  white-space: nowrap;
  margin-bottom: 4px;
  flex: 0 0 18px;
  display: flex;
  align-items: center;
}

.cookie-preview-widget-header-label {
  line-height: 18px;
  flex-shrink: 0;
}

.cookie-preview-widget-cookie-value {
  user-select: text;
  word-break: break-all;
  flex: 1;
  overflow: auto;
}

.cookie-preview-widget-toggle {
  margin-left: 12px;
  font-weight: normal;
  flex-shrink: 1;
}

/*# sourceURL=${import.meta.resolve("./cookieItemsView.css")} */`;

// gen/front_end/panels/application/CookieItemsView.js
var UIStrings27 = {
  /**
   * @description Label for checkbox to show URL-decoded cookie values
   */
  showUrlDecoded: "Show URL-decoded",
  /**
   * @description Text in Cookie Items View of the Application panel to indicate that no cookie has been selected for preview
   */
  noCookieSelected: "No cookie selected",
  /**
   * @description Text in Cookie Items View of the Application panel
   */
  selectACookieToPreviewItsValue: "Select a cookie to preview its value",
  /**
   * @description Text for filter in Cookies View of the Application panel
   */
  onlyShowCookiesWithAnIssue: "Only show cookies with an issue",
  /**
   * @description Title for filter in the Cookies View of the Application panel
   */
  onlyShowCookiesWhichHaveAn: "Only show cookies that have an associated issue",
  /**
   * @description Label to only delete the cookies that are visible after filtering
   */
  clearFilteredCookies: "Clear filtered cookies",
  /**
   * @description Label to delete all cookies
   */
  clearAllCookies: "Clear all cookies",
  /**
   * @description Alert message for screen reader to announce # of cookies in the table
   * @example {5} PH1
   */
  numberOfCookiesShownInTableS: "Number of cookies shown in table: {PH1}"
};
var str_27 = i18n53.i18n.registerUIStrings("panels/application/CookieItemsView.ts", UIStrings27);
var i18nString27 = i18n53.i18n.getLocalizedString.bind(void 0, str_27);
var CookiePreviewWidget = class extends UI23.Widget.VBox {
  cookie;
  showDecodedSetting;
  toggle;
  value;
  constructor() {
    super({ jslog: `${VisualLogging15.section("cookie-preview")}` });
    this.setMinimumSize(230, 45);
    this.cookie = null;
    this.showDecodedSetting = Common16.Settings.Settings.instance().createSetting("cookie-view-show-decoded", false);
    const header = document.createElement("div");
    header.classList.add("cookie-preview-widget-header");
    const span = document.createElement("span");
    span.classList.add("cookie-preview-widget-header-label");
    span.textContent = "Cookie Value";
    header.appendChild(span);
    this.contentElement.appendChild(header);
    const toggle3 = UI23.UIUtils.CheckboxLabel.create(i18nString27(UIStrings27.showUrlDecoded), this.showDecodedSetting.get(), void 0, "show-url-decoded");
    toggle3.title = i18nString27(UIStrings27.showUrlDecoded);
    toggle3.classList.add("cookie-preview-widget-toggle");
    toggle3.addEventListener("click", () => this.showDecoded(!this.showDecodedSetting.get()));
    header.appendChild(toggle3);
    this.toggle = toggle3;
    const value = document.createElement("div");
    value.classList.add("cookie-preview-widget-cookie-value");
    value.textContent = "";
    value.addEventListener("dblclick", this.handleDblClickOnCookieValue.bind(this));
    this.value = value;
    this.contentElement.classList.add("cookie-preview-widget");
    this.contentElement.appendChild(value);
  }
  showDecoded(decoded) {
    if (!this.cookie) {
      return;
    }
    this.showDecodedSetting.set(decoded);
    this.toggle.checked = decoded;
    this.updatePreview();
  }
  updatePreview() {
    if (this.cookie) {
      this.value.textContent = this.showDecodedSetting.get() ? decodeURIComponent(this.cookie.value()) : this.cookie.value();
    } else {
      this.value.textContent = "";
    }
  }
  setCookie(cookie) {
    this.cookie = cookie;
    this.updatePreview();
  }
  /**
   * Select all text even if there a spaces in it
   */
  handleDblClickOnCookieValue(event) {
    event.preventDefault();
    const range = document.createRange();
    range.selectNode(this.value);
    const selection = window.getSelection();
    if (!selection) {
      return;
    }
    selection.removeAllRanges();
    selection.addRange(range);
  }
};
var CookieItemsView = class extends UI23.Widget.VBox {
  model;
  cookieDomain;
  cookiesTable;
  splitWidget;
  previewPanel;
  previewWidget;
  emptyWidget;
  onlyIssuesFilterUI;
  allCookies;
  shownCookies;
  selectedCookie;
  #toolbar;
  constructor(model, cookieDomain) {
    super({ jslog: `${VisualLogging15.pane("cookies-data")}` });
    this.registerRequiredCSS(cookieItemsView_css_default);
    this.element.classList.add("storage-view");
    this.model = model;
    this.cookieDomain = cookieDomain;
    this.#toolbar = new StorageItemsToolbar();
    this.#toolbar.element.classList.add("flex-none");
    this.#toolbar.show(this.element);
    this.cookiesTable = new CookieTable.CookiesTable.CookiesTable(
      /* renderInline */
      false,
      this.saveCookie.bind(this),
      this.refreshItems.bind(this),
      this.handleCookieSelected.bind(this),
      this.deleteCookie.bind(this)
    );
    this.cookiesTable.setMinimumSize(0, 50);
    this.splitWidget = new UI23.SplitWidget.SplitWidget(
      /* isVertical: */
      false,
      /* secondIsSidebar: */
      true,
      "cookie-items-split-view-state"
    );
    this.splitWidget.show(this.element);
    this.previewPanel = new UI23.Widget.VBox();
    this.previewPanel.element.setAttribute("jslog", `${VisualLogging15.pane("preview").track({ resize: true })}`);
    const resizer = this.previewPanel.element.createChild("div", "preview-panel-resizer");
    this.splitWidget.setMainWidget(this.cookiesTable);
    this.splitWidget.setSidebarWidget(this.previewPanel);
    this.splitWidget.installResizer(resizer);
    this.previewWidget = new CookiePreviewWidget();
    this.emptyWidget = new UI23.EmptyWidget.EmptyWidget(i18nString27(UIStrings27.noCookieSelected), i18nString27(UIStrings27.selectACookieToPreviewItsValue));
    this.emptyWidget.show(this.previewPanel.contentElement);
    this.onlyIssuesFilterUI = new UI23.Toolbar.ToolbarCheckbox(i18nString27(UIStrings27.onlyShowCookiesWithAnIssue), i18nString27(UIStrings27.onlyShowCookiesWhichHaveAn), () => {
      this.updateWithCookies(this.allCookies);
    }, "only-show-cookies-with-issues");
    this.#toolbar.appendToolbarItem(this.onlyIssuesFilterUI);
    this.allCookies = [];
    this.shownCookies = [];
    this.selectedCookie = null;
    this.setCookiesDomain(model, cookieDomain);
    this.#toolbar.addEventListener("DeleteSelected", this.deleteSelectedItem, this);
    this.#toolbar.addEventListener("DeleteAll", this.deleteAllItems, this);
    this.#toolbar.addEventListener("Refresh", this.refreshItems, this);
  }
  setCookiesDomain(model, domain) {
    this.model.removeEventListener("CookieListUpdated", this.onCookieListUpdate, this);
    this.model = model;
    this.cookieDomain = domain;
    this.refreshItems();
    this.model.addEventListener("CookieListUpdated", this.onCookieListUpdate, this);
  }
  wasShown() {
    this.refreshItems();
  }
  showPreview(cookie) {
    if (cookie === this.selectedCookie) {
      return;
    }
    this.selectedCookie = cookie;
    if (!cookie) {
      this.previewWidget.detach();
      this.emptyWidget.show(this.previewPanel.contentElement);
    } else {
      this.emptyWidget.detach();
      this.previewWidget.setCookie(cookie);
      this.previewWidget.show(this.previewPanel.contentElement);
    }
  }
  handleCookieSelected() {
    const cookie = this.cookiesTable.selectedCookie();
    this.#toolbar.setCanDeleteSelected(Boolean(cookie));
    this.showPreview(cookie);
  }
  async saveCookie(newCookie, oldCookie) {
    if (oldCookie && newCookie.key() !== oldCookie.key()) {
      await this.model.deleteCookie(oldCookie);
    }
    return await this.model.saveCookie(newCookie);
  }
  deleteCookie(cookie, callback) {
    void this.model.deleteCookie(cookie).then(callback);
  }
  updateWithCookies(allCookies) {
    this.allCookies = allCookies;
    const parsedURL = Common16.ParsedURL.ParsedURL.fromString(this.cookieDomain);
    const host = parsedURL ? parsedURL.host : "";
    this.cookiesTable.setCookieDomain(host);
    this.shownCookies = this.filter(allCookies, (cookie) => `${cookie.name()} ${cookie.value()} ${cookie.domain()}`);
    if (this.#toolbar.hasFilter()) {
      this.#toolbar.setDeleteAllTitle(i18nString27(UIStrings27.clearFilteredCookies));
      this.#toolbar.setDeleteAllGlyph("filter-clear");
    } else {
      this.#toolbar.setDeleteAllTitle(i18nString27(UIStrings27.clearAllCookies));
      this.#toolbar.setDeleteAllGlyph("clear-list");
    }
    this.cookiesTable.setCookies(this.shownCookies, this.model.getCookieToBlockedReasonsMap());
    UI23.ARIAUtils.LiveAnnouncer.alert(i18nString27(UIStrings27.numberOfCookiesShownInTableS, { PH1: this.shownCookies.length }));
    this.#toolbar.setCanFilter(true);
    this.#toolbar.setCanDeleteAll(this.shownCookies.length > 0);
    this.#toolbar.setCanDeleteSelected(Boolean(this.cookiesTable.selectedCookie()));
    if (!this.cookiesTable.selectedCookie()) {
      this.showPreview(null);
    }
  }
  filter(items, keyFunction) {
    const predicate = (object) => {
      if (!this.onlyIssuesFilterUI.checked()) {
        return true;
      }
      if (object instanceof SDK23.Cookie.Cookie) {
        return IssuesManager2.RelatedIssue.hasIssues(object);
      }
      return false;
    };
    return items.filter((item) => this.#toolbar.filterRegex?.test(keyFunction(item)) ?? true).filter(predicate);
  }
  /**
   * This will only delete the currently visible cookies.
   */
  deleteAllItems() {
    this.showPreview(null);
    void this.model.deleteCookies(this.shownCookies);
  }
  deleteSelectedItem() {
    const selectedCookie = this.cookiesTable.selectedCookie();
    if (selectedCookie) {
      this.showPreview(null);
      void this.model.deleteCookie(selectedCookie);
    }
  }
  onCookieListUpdate() {
    void this.model.getCookiesForDomain(this.cookieDomain).then(this.updateWithCookies.bind(this));
  }
  refreshItems() {
    void this.model.getCookiesForDomain(this.cookieDomain, true).then(this.updateWithCookies.bind(this));
  }
};

// gen/front_end/panels/application/DOMStorageItemsView.js
var DOMStorageItemsView_exports = {};
__export(DOMStorageItemsView_exports, {
  DOMStorageItemsView: () => DOMStorageItemsView
});
import * as Common17 from "./../../core/common/common.js";
import * as i18n55 from "./../../core/i18n/i18n.js";
import * as TextUtils2 from "./../../models/text_utils/text_utils.js";
import * as SourceFrame6 from "./../../ui/legacy/components/source_frame/source_frame.js";
import * as UI24 from "./../../ui/legacy/legacy.js";
import * as VisualLogging16 from "./../../ui/visual_logging/visual_logging.js";
var UIStrings28 = {
  /**
   * @description Name for the "DOM Storage Items" table that shows the content of the DOM Storage.
   */
  domStorageItems: "DOM Storage Items",
  /**
   * @description Text for announcing that the "DOM Storage Items" table was cleared, that is, all
   * entries were deleted.
   */
  domStorageItemsCleared: "DOM Storage Items cleared",
  /**
   * @description Text for announcing a DOM Storage key/value item has been deleted
   */
  domStorageItemDeleted: "The storage item was deleted."
};
var str_28 = i18n55.i18n.registerUIStrings("panels/application/DOMStorageItemsView.ts", UIStrings28);
var i18nString28 = i18n55.i18n.getLocalizedString.bind(void 0, str_28);
var DOMStorageItemsView = class extends KeyValueStorageItemsView {
  domStorage;
  eventListeners;
  constructor(domStorage) {
    super(i18nString28(UIStrings28.domStorageItems), "dom-storage", true);
    this.domStorage = domStorage;
    if (domStorage.storageKey) {
      this.toolbar?.setStorageKey(domStorage.storageKey);
    }
    this.element.classList.add("storage-view", "table");
    this.showPreview(null, null);
    this.eventListeners = [];
    this.setStorage(domStorage);
  }
  createPreview(key, value) {
    const protocol = this.domStorage.isLocalStorage ? "localstorage" : "sessionstorage";
    const url = `${protocol}://${key}`;
    const provider = TextUtils2.StaticContentProvider.StaticContentProvider.fromString(url, Common17.ResourceType.resourceTypes.XHR, value);
    return SourceFrame6.PreviewFactory.PreviewFactory.createPreview(provider, "text/plain");
  }
  setStorage(domStorage) {
    Common17.EventTarget.removeEventListeners(this.eventListeners);
    this.domStorage = domStorage;
    const storageKind = domStorage.isLocalStorage ? "local-storage-data" : "session-storage-data";
    this.element.setAttribute("jslog", `${VisualLogging16.pane().context(storageKind)}`);
    if (domStorage.storageKey) {
      this.toolbar?.setStorageKey(domStorage.storageKey);
    }
    this.eventListeners = [
      this.domStorage.addEventListener("DOMStorageItemsCleared", this.domStorageItemsCleared, this),
      this.domStorage.addEventListener("DOMStorageItemRemoved", this.domStorageItemRemoved, this),
      this.domStorage.addEventListener("DOMStorageItemAdded", this.domStorageItemAdded, this),
      this.domStorage.addEventListener("DOMStorageItemUpdated", this.domStorageItemUpdated, this)
    ];
    this.refreshItems();
  }
  domStorageItemsCleared() {
    if (!this.isShowing()) {
      return;
    }
    this.itemsCleared();
  }
  itemsCleared() {
    super.itemsCleared();
    UI24.ARIAUtils.LiveAnnouncer.alert(i18nString28(UIStrings28.domStorageItemsCleared));
  }
  domStorageItemRemoved(event) {
    if (!this.isShowing()) {
      return;
    }
    this.itemRemoved(event.data.key);
  }
  itemRemoved(key) {
    super.itemRemoved(key);
    UI24.ARIAUtils.LiveAnnouncer.alert(i18nString28(UIStrings28.domStorageItemDeleted));
  }
  domStorageItemAdded(event) {
    if (!this.isShowing()) {
      return;
    }
    this.itemAdded(event.data.key, event.data.value);
  }
  domStorageItemUpdated(event) {
    if (!this.isShowing()) {
      return;
    }
    this.itemUpdated(event.data.key, event.data.value);
  }
  refreshItems() {
    void this.#refreshItems();
  }
  async #refreshItems() {
    const items = await this.domStorage.getItems();
    if (!items || !this.toolbar) {
      return;
    }
    const { filterRegex } = this.toolbar;
    const filteredItems = items.map((item) => ({ key: item[0], value: item[1] })).filter((item) => filterRegex?.test(`${item.key} ${item.value}`) ?? true);
    this.showItems(filteredItems);
  }
  deleteAllItems() {
    this.domStorage.clear();
    this.domStorageItemsCleared();
  }
  removeItem(key) {
    this.domStorage?.removeItem(key);
  }
  setItem(key, value) {
    this.domStorage?.setItem(key, value);
  }
};

// gen/front_end/panels/application/ExtensionStorageItemsView.js
var ExtensionStorageItemsView_exports = {};
__export(ExtensionStorageItemsView_exports, {
  ExtensionStorageItemsView: () => ExtensionStorageItemsView
});
import * as Common18 from "./../../core/common/common.js";
import * as i18n57 from "./../../core/i18n/i18n.js";
import * as TextUtils3 from "./../../models/text_utils/text_utils.js";
import * as JSON5 from "./../../third_party/json5/json5.js";
import * as SourceFrame7 from "./../../ui/legacy/components/source_frame/source_frame.js";
import * as UI25 from "./../../ui/legacy/legacy.js";
import * as VisualLogging17 from "./../../ui/visual_logging/visual_logging.js";
var UIStrings29 = {
  /**
   * @description Name for the "Extension Storage Items" table that shows the content of the extension Storage.
   */
  extensionStorageItems: "Extension Storage Items",
  /**
   * @description Text for announcing that the "Extension Storage Items" table was cleared, that is, all
   * entries were deleted.
   */
  extensionStorageItemsCleared: "Extension Storage Items cleared"
};
var str_29 = i18n57.i18n.registerUIStrings("panels/application/ExtensionStorageItemsView.ts", UIStrings29);
var i18nString29 = i18n57.i18n.getLocalizedString.bind(void 0, str_29);
var ExtensionStorageItemsView = class extends KeyValueStorageItemsView {
  #extensionStorage;
  extensionStorageItemsDispatcher;
  constructor(extensionStorage, view) {
    super(i18nString29(UIStrings29.extensionStorageItems), "extension-storage", true, view);
    this.element.setAttribute("jslog", `${VisualLogging17.pane().context("extension-storage-data")}`);
    this.element.classList.add("storage-view", "table");
    this.extensionStorageItemsDispatcher = new Common18.ObjectWrapper.ObjectWrapper();
    this.setStorage(extensionStorage);
  }
  get #isEditable() {
    return this.#extensionStorage.storageArea !== "managed";
  }
  /**
   * When parsing a value provided by the user, attempt to treat it as JSON,
   * falling back to a string otherwise.
   */
  parseValue(input) {
    try {
      return JSON5.parse(input);
    } catch {
      return input;
    }
  }
  removeItem(key) {
    void this.#extensionStorage.removeItem(key).then(() => {
      this.refreshItems();
    });
  }
  setItem(key, value) {
    void this.#extensionStorage.setItem(key, this.parseValue(value)).then(() => {
      this.refreshItems();
      this.extensionStorageItemsDispatcher.dispatchEventToListeners(
        "ItemEdited"
        /* ExtensionStorageItemsDispatcher.Events.ITEM_EDITED */
      );
    });
  }
  createPreview(key, value) {
    const url = "extension-storage://" + this.#extensionStorage.extensionId + "/" + this.#extensionStorage.storageArea + "/preview/" + key;
    const provider = TextUtils3.StaticContentProvider.StaticContentProvider.fromString(url, Common18.ResourceType.resourceTypes.XHR, value);
    return SourceFrame7.PreviewFactory.PreviewFactory.createPreview(provider, "text/plain");
  }
  setStorage(extensionStorage) {
    this.#extensionStorage = extensionStorage;
    this.editable = this.#isEditable;
    this.refreshItems();
  }
  #extensionStorageItemsCleared() {
    if (!this.isShowing()) {
      return;
    }
    this.itemsCleared();
    UI25.ARIAUtils.LiveAnnouncer.alert(i18nString29(UIStrings29.extensionStorageItemsCleared));
  }
  deleteSelectedItem() {
    if (!this.#isEditable) {
      return;
    }
    this.deleteSelectedItem();
  }
  refreshItems() {
    void this.#refreshItems();
  }
  async #refreshItems() {
    const items = await this.#extensionStorage.getItems();
    if (!items || !this.toolbar) {
      return;
    }
    const filteredItems = Object.entries(items).map(([key, value]) => ({ key, value: typeof value === "string" ? value : JSON.stringify(value) })).filter((item) => this.toolbar?.filterRegex?.test(`${item.key} ${item.value}`) ?? true);
    this.showItems(filteredItems);
    this.extensionStorageItemsDispatcher.dispatchEventToListeners(
      "ItemsRefreshed"
      /* ExtensionStorageItemsDispatcher.Events.ITEMS_REFRESHED */
    );
  }
  deleteAllItems() {
    if (!this.#isEditable) {
      return;
    }
    this.#extensionStorage.clear().then(() => {
      this.#extensionStorageItemsCleared();
    }, () => {
      throw new Error("Unable to clear storage.");
    });
  }
};

// gen/front_end/panels/application/ResourcesPanel.js
var ResourcesPanel_exports = {};
__export(ResourcesPanel_exports, {
  AttemptViewWithFilterRevealer: () => AttemptViewWithFilterRevealer,
  FrameDetailsRevealer: () => FrameDetailsRevealer,
  ResourceRevealer: () => ResourceRevealer,
  ResourcesPanel: () => ResourcesPanel,
  RuleSetViewRevealer: () => RuleSetViewRevealer
});
import "./../../ui/legacy/legacy.js";
import * as Common19 from "./../../core/common/common.js";
import * as Platform7 from "./../../core/platform/platform.js";
import * as SDK24 from "./../../core/sdk/sdk.js";
import * as SourceFrame8 from "./../../ui/legacy/components/source_frame/source_frame.js";
import * as UI26 from "./../../ui/legacy/legacy.js";
import * as VisualLogging18 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/application/resourcesPanel.css.js
var resourcesPanel_css_default = `/*
 * Copyright (C) 2006, 2007, 2008 Apple Inc.  All rights reserved.
 * Copyright (C) 2009 Anthony Ricaud <rik@webkit.org>
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1.  Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 * 2.  Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 * 3.  Neither the name of Apple Computer, Inc. ("Apple") nor the names of
 *     its contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE AND ITS CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL APPLE OR ITS CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

.resources-toolbar {
  border-top: 1px solid var(--sys-color-divider);
  background-color: var(--sys-color-cdt-base-container);
}

.top-resources-toolbar {
  border-bottom: 1px solid var(--sys-color-divider);
  background-color: var(--sys-color-cdt-base-container);
}

.resources.panel .status {
  float: right;
  height: 16px;
  margin-top: 1px;
  margin-left: 4px;
  line-height: 1em;
}

.storage-view {
  display: flex;
  overflow: hidden;
}

.storage-view .data-grid:not(.inline) {
  border: none;
  flex: auto;
}

.storage-view .storage-table-error {
  color: var(--sys-color-error);
  font-size: 24px;
  font-weight: bold;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.storage-view.query {
  padding: 2px 0;
  overflow: hidden auto;
}

.storage-view .filter-bar {
  border-top: none;
  border-bottom: 1px solid var(--sys-color-divider);
}

.database-query-group-messages {
  overflow-y: auto;
}

.database-query-prompt-container {
  position: relative;
  padding: 1px 22px 1px 24px;
  min-height: 16px;
}

.database-query-prompt {
  white-space: pre-wrap;
}

.prompt-icon {
  position: absolute;
  display: block;
  left: 7px;
  top: 9px;
  margin-top: -7px;
  user-select: none;
}

.database-user-query .prompt-icon {
  margin-top: -10px;
}

.database-query-prompt-container .prompt-icon {
  top: 6px;
}

.database-user-query {
  position: relative;
  border-bottom: 1px solid var(--sys-color-divider);
  padding: 1px 22px 1px 24px;
  min-height: 16px;
  flex-shrink: 0;
}

.database-user-query:focus-visible {
  background-color: var(--sys-color-state-focus-highlight);
}

.database-query-text {
  color: var(--sys-color-primary-bright);
  user-select: text;
}

.database-query-result {
  position: relative;
  padding: 1px 22px;
  min-height: 16px;
  margin-left: -22px;
  padding-right: 0;
}

.database-query-result.error {
  color: var(--sys-color-token-property-special);
  user-select: text;
}

.database-query-result.error .prompt-icon {
  margin-top: -9px;
}

.resources-sidebar {
  padding: 0;
  overflow-x: auto;
  background-color: var(--sys-color-cdt-base-container);
}

/*# sourceURL=${import.meta.resolve("./resourcesPanel.css")} */`;

// gen/front_end/panels/application/ResourcesPanel.js
var resourcesPanelInstance;
var ResourcesPanel = class _ResourcesPanel extends UI26.Panel.PanelWithSidebar {
  resourcesLastSelectedItemSetting;
  visibleView;
  pendingViewPromise;
  categoryView;
  storageViews;
  storageViewToolbar;
  domStorageView;
  extensionStorageView;
  cookieView;
  sidebar;
  constructor() {
    super("resources");
    this.registerRequiredCSS(resourcesPanel_css_default);
    this.resourcesLastSelectedItemSetting = Common19.Settings.Settings.instance().createSetting("resources-last-selected-element-path", []);
    this.visibleView = null;
    this.pendingViewPromise = null;
    this.categoryView = null;
    const mainContainer = new UI26.Widget.VBox();
    mainContainer.setMinimumSize(100, 0);
    this.storageViews = mainContainer.element.createChild("div", "vbox flex-auto");
    this.storageViewToolbar = mainContainer.element.createChild("devtools-toolbar", "resources-toolbar");
    this.splitWidget().setMainWidget(mainContainer);
    this.domStorageView = null;
    this.extensionStorageView = null;
    this.cookieView = null;
    this.sidebar = new ApplicationPanelSidebar(this);
    this.sidebar.show(this.panelSidebarElement());
  }
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!resourcesPanelInstance || forceNew) {
      resourcesPanelInstance = new _ResourcesPanel();
    }
    return resourcesPanelInstance;
  }
  static shouldCloseOnReset(view) {
    const viewClassesToClose = [
      SourceFrame8.ResourceSourceFrame.ResourceSourceFrame,
      SourceFrame8.ImageView.ImageView,
      SourceFrame8.FontView.FontView,
      StorageItemsToolbar
    ];
    return viewClassesToClose.some((type) => view instanceof type);
  }
  static async showAndGetSidebar() {
    await UI26.ViewManager.ViewManager.instance().showView("resources");
    return _ResourcesPanel.instance().sidebar;
  }
  focus() {
    this.sidebar.focus();
  }
  lastSelectedItemPath() {
    return this.resourcesLastSelectedItemSetting.get();
  }
  setLastSelectedItemPath(path) {
    this.resourcesLastSelectedItemSetting.set(path);
  }
  resetView() {
    if (this.visibleView && _ResourcesPanel.shouldCloseOnReset(this.visibleView)) {
      this.showView(null);
    }
  }
  showView(view) {
    this.pendingViewPromise = null;
    if (this.visibleView === view) {
      return;
    }
    if (this.visibleView) {
      this.visibleView.detach();
    }
    if (view) {
      view.show(this.storageViews);
    }
    this.visibleView = view;
    this.storageViewToolbar.removeToolbarItems();
    this.storageViewToolbar.classList.toggle("hidden", true);
    if (view instanceof UI26.View.SimpleView) {
      void view.toolbarItems().then((items) => {
        items.map((item) => this.storageViewToolbar.appendToolbarItem(item));
        this.storageViewToolbar.classList.toggle("hidden", !items.length);
      });
    }
  }
  async scheduleShowView(viewPromise) {
    this.pendingViewPromise = viewPromise;
    const view = await viewPromise;
    if (this.pendingViewPromise !== viewPromise) {
      return null;
    }
    this.showView(view);
    return view;
  }
  showCategoryView(categoryName, categoryHeadline, categoryDescription, categoryLink) {
    if (!this.categoryView) {
      this.categoryView = new StorageCategoryView();
    }
    this.categoryView.element.setAttribute("jslog", `${VisualLogging18.pane().context(Platform7.StringUtilities.toKebabCase(categoryName))}`);
    this.categoryView.setHeadline(categoryHeadline);
    this.categoryView.setText(categoryDescription);
    this.categoryView.setLink(categoryLink);
    this.showView(this.categoryView);
  }
  showDOMStorage(domStorage) {
    if (!domStorage) {
      return;
    }
    if (!this.domStorageView) {
      this.domStorageView = new DOMStorageItemsView(domStorage);
    } else {
      this.domStorageView.setStorage(domStorage);
    }
    this.showView(this.domStorageView);
  }
  showExtensionStorage(extensionStorage) {
    if (!extensionStorage) {
      return;
    }
    if (!this.extensionStorageView) {
      this.extensionStorageView = new ExtensionStorageItemsView(extensionStorage);
    } else {
      this.extensionStorageView.setStorage(extensionStorage);
    }
    this.showView(this.extensionStorageView);
  }
  showCookies(cookieFrameTarget, cookieDomain) {
    const model = cookieFrameTarget.model(SDK24.CookieModel.CookieModel);
    if (!model) {
      return;
    }
    if (!this.cookieView) {
      this.cookieView = new CookieItemsView(model, cookieDomain);
    } else {
      this.cookieView.setCookiesDomain(model, cookieDomain);
    }
    this.showView(this.cookieView);
  }
  clearCookies(target, cookieDomain) {
    const model = target.model(SDK24.CookieModel.CookieModel);
    if (!model) {
      return;
    }
    void model.clear(cookieDomain).then(() => {
      if (this.cookieView) {
        this.cookieView.refreshItems();
      }
    });
  }
};
var ResourceRevealer = class {
  async reveal(resource) {
    const sidebar = await ResourcesPanel.showAndGetSidebar();
    await sidebar.showResource(resource);
  }
};
var FrameDetailsRevealer = class {
  async reveal(frame) {
    const sidebar = await ResourcesPanel.showAndGetSidebar();
    sidebar.showFrame(frame);
  }
};
var RuleSetViewRevealer = class {
  async reveal(revealInfo) {
    const sidebar = await ResourcesPanel.showAndGetSidebar();
    sidebar.showPreloadingRuleSetView(revealInfo);
  }
};
var AttemptViewWithFilterRevealer = class {
  async reveal(filter) {
    const sidebar = await ResourcesPanel.showAndGetSidebar();
    sidebar.showPreloadingAttemptViewWithFilter(filter);
  }
};
export {
  AppManifestView_exports as AppManifestView,
  ApplicationPanelSidebar_exports as ApplicationPanelSidebar,
  BackgroundServiceModel_exports as BackgroundServiceModel,
  BackgroundServiceView_exports as BackgroundServiceView,
  BounceTrackingMitigationsTreeElement_exports as BounceTrackingMitigationsTreeElement,
  CookieItemsView_exports as CookieItemsView,
  DOMStorageItemsView_exports as DOMStorageItemsView,
  DOMStorageModel_exports as DOMStorageModel,
  ExtensionStorageItemsView_exports as ExtensionStorageItemsView,
  ExtensionStorageModel_exports as ExtensionStorageModel,
  IndexedDBModel_exports as IndexedDBModel,
  IndexedDBViews_exports as IndexedDBViews,
  InterestGroupStorageModel_exports as InterestGroupStorageModel,
  InterestGroupStorageView_exports as InterestGroupStorageView,
  InterestGroupTreeElement_exports as InterestGroupTreeElement,
  KeyValueStorageItemsView_exports as KeyValueStorageItemsView,
  OpenedWindowDetailsView_exports as OpenedWindowDetailsView,
  PreloadingTreeElement_exports as PreloadingTreeElement,
  PreloadingView_exports as PreloadingView,
  ReportingApiView_exports as ReportingApiView,
  ResourcesPanel_exports as ResourcesPanel,
  ServiceWorkerCacheViews_exports as ServiceWorkerCacheViews,
  ServiceWorkerUpdateCycleView_exports as ServiceWorkerUpdateCycleView,
  ServiceWorkersView_exports as ServiceWorkersView,
  SharedStorageEventsView_exports as SharedStorageEventsView,
  SharedStorageItemsView_exports as SharedStorageItemsView,
  SharedStorageListTreeElement_exports as SharedStorageListTreeElement,
  SharedStorageModel_exports as SharedStorageModel,
  SharedStorageTreeElement_exports as SharedStorageTreeElement,
  StorageBucketsTreeElement_exports as StorageBucketsTreeElement,
  StorageItemsToolbar_exports as StorageItemsToolbar,
  StorageView_exports as StorageView,
  TrustTokensTreeElement_exports as TrustTokensTreeElement
};
//# sourceMappingURL=application.js.map
