var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/whats_new/ReleaseNoteText.js
var ReleaseNoteText_exports = {};
__export(ReleaseNoteText_exports, {
  getReleaseNote: () => getReleaseNote,
  setReleaseNoteForTest: () => setReleaseNoteForTest
});
import * as MarkdownView from "./../../ui/components/markdown_view/markdown_view.js";
var registeredLinks = false;
function setReleaseNoteForTest(testReleaseNote) {
  releaseNote = testReleaseNote;
}
function getReleaseNote() {
  if (!registeredLinks) {
    for (const { key, link: link2 } of releaseNote.markdownLinks) {
      MarkdownView.MarkdownLinksMap.markdownLinks.set(key, link2);
    }
    registeredLinks = true;
  }
  return releaseNote;
}
var releaseNote = {
  version: 81,
  header: "What's new in DevTools 140",
  markdownLinks: [
    {
      key: "ai-insights",
      link: "https://developer.chrome.com/blog/new-in-devtools-140/#ai-insights"
    },
    {
      key: "save-data",
      link: "https://developer.chrome.com/blog/new-in-devtools-140/#save-data"
    },
    {
      key: "debug-css",
      link: "https://developer.chrome.com/blog/new-in-devtools-138#debug-css-values"
    }
  ],
  videoLinks: [
    {
      description: "See past highlights from Chrome 139",
      link: "https://developer.chrome.com/blog/new-in-devtools-139",
      type: "WhatsNew"
    }
  ],
  link: "https://developer.chrome.com/blog/new-in-devtools-140/"
};

// gen/front_end/panels/whats_new/ReleaseNoteView.js
var ReleaseNoteView_exports = {};
__export(ReleaseNoteView_exports, {
  DEVTOOLS_TIPS_THUMBNAIL: () => DEVTOOLS_TIPS_THUMBNAIL,
  GENERAL_THUMBNAIL: () => GENERAL_THUMBNAIL,
  ReleaseNoteView: () => ReleaseNoteView,
  WHATS_NEW_THUMBNAIL: () => WHATS_NEW_THUMBNAIL,
  getMarkdownContent: () => getMarkdownContent
});
import "./../../ui/components/markdown_view/markdown_view.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as Marked from "./../../third_party/marked/marked.js";
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as UI from "./../../ui/legacy/legacy.js";
import { html, render } from "./../../ui/lit/lit.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/whats_new/releaseNoteView.css.js
var releaseNoteView_css_default = `/*
 * Copyright 2024 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.whatsnew {
  background: var(--sys-color-header-container);
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;
  justify-content: center;
}

.whatsnew-content {
  max-width: var(--sys-size-35);
  padding: var(--sys-size-9) 0 0;

  >* {
    padding: 0 var(--sys-size-9) var(--sys-size-9) var(--sys-size-9);
  }
}

.header {
  display: flex;
  align-items: center;
  font: var(--sys-typescale-headline4);

  &::before {
    content: "";
    width: var(--sys-size-9);
    height: var(--sys-size-9);
    transform: scale(1.6);
    margin: 0 var(--sys-size-8) 0 var(--sys-size-4);
    background-image: var(--image-file-devtools);
    flex-shrink: 0;
  }
}

.feature-container {
  flex-grow: 1;
  padding: 0;
  background-color: var(--sys-color-surface);
  border-radius: var(--sys-shape-corner-large) var(--sys-shape-corner-large) 0 0;
  display: flex;
  flex-direction: column;
}

.feature {
  background-color: var(--sys-color-surface3);
  padding: 0 var(--sys-size-8) var(--sys-size-8);
  border-radius: var(--sys-shape-corner-medium);
  margin: 0 var(--sys-size-9) var(--sys-size-9);
}

.video-container {
  margin-bottom: var(--sys-size-9);

  &:has(.video) {
    --video-bottom-padding: var(--sys-size-6);

    overflow: auto;
    display: flex;
    flex-direction: row;
    gap: var(--sys-size-5);
    padding: var(--sys-size-9) var(--sys-size-9) var(--video-bottom-padding);

    /* This extra margin makes sure that we have some space between
       the scrollable container for videos and the cards below it. */
    margin-bottom: calc(var(--sys-size-9) - var(--video-bottom-padding));

    > * {
      min-width: auto;
    }
  }
}

.video {
  align-items: center;
  display: flex;
  flex-direction: row;
  border-radius: var(--sys-shape-corner-medium);
  background-color: var(--sys-color-surface3);
  font: var(--sys-typescale-body5-regular);
  min-width: var(--sys-size-29);
  max-width: var(--sys-size-32);
  overflow: hidden;
  height: 72px;

  &:hover {
    box-shadow: var(--sys-elevation-level3);
  }

  .thumbnail {
    border-radius: var(--sys-shape-corner-medium) 0 0 var(--sys-shape-corner-medium);
    flex-shrink: 0;
  }

  .thumbnail-description {
    --description-margin: var(--sys-size-6);

    margin: var(--description-margin);
    height: calc(100% - var(--description-margin) * 2);
    overflow: hidden;
  }
}

x-link:focus .video {
  outline: var(--sys-size-2) solid var(--sys-color-state-focus-ring);
}

@media (forced-colors: active) {
  .feature,
  .video {
    border: var(--sys-size-1) solid ButtonText;
  }
}

/*# sourceURL=${import.meta.resolve("./releaseNoteView.css")} */`;

// gen/front_end/panels/whats_new/ReleaseNoteView.js
var UIStrings = {
  /**
   * @description Text that is usually a hyperlink to more documentation
   */
  seeFeatures: "See all new features"
};
var str_ = i18n.i18n.registerUIStrings("panels/whats_new/ReleaseNoteView.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var WHATS_NEW_THUMBNAIL = "../../Images/whatsnew.svg";
var DEVTOOLS_TIPS_THUMBNAIL = "../../Images/devtools-tips.svg";
var GENERAL_THUMBNAIL = "../../Images/devtools-thumbnail.svg";
async function getMarkdownContent() {
  const markdown = await ReleaseNoteView.getFileContent();
  const markdownAst = Marked.Marked.lexer(markdown);
  const splitMarkdownAst = [];
  let groupStartDepth = Number.MAX_SAFE_INTEGER;
  markdownAst.forEach((token) => {
    if (token.type === "heading" && groupStartDepth >= token.depth) {
      splitMarkdownAst.push([token]);
      groupStartDepth = token.depth;
    } else if (splitMarkdownAst.length > 0) {
      splitMarkdownAst[splitMarkdownAst.length - 1].push(token);
    } else {
      splitMarkdownAst.push([token]);
    }
  });
  return splitMarkdownAst;
}
var ReleaseNoteView = class extends UI.Panel.Panel {
  #view;
  constructor(view = (input, _output, target) => {
    const releaseNote2 = input.getReleaseNote();
    const markdownContent = input.markdownContent;
    render(html`
      <style>${UI.Widget.widgetScoped(releaseNoteView_css_default)}</style>
      <div class="whatsnew" jslog=${VisualLogging.section().context("release-notes")}>
        <div class="whatsnew-content">
          <div class="header">
            ${releaseNote2.header}
          </div>
          <div>
            <devtools-button
                  .variant=${"primary"}
                  .jslogContext=${"learn-more"}
                  @click=${() => input.openNewTab(releaseNote2.link)}
              >${i18nString(UIStrings.seeFeatures)}</devtools-button>
          </div>

          <div class="feature-container">
            <div class="video-container">
              ${releaseNote2.videoLinks.map((value) => {
      return html`
                  <x-link
                  href=${value.link}
                  jslog=${VisualLogging.link().track({ click: true }).context("learn-more")}>
                    <div class="video">
                      <img class="thumbnail" src=${input.getThumbnailPath(
        value.type ?? "WhatsNew"
        /* VideoType.WHATS_NEW */
      )}>
                      <div class="thumbnail-description"><span>${value.description}</span></div>
                    </div>
                </x-link>
                `;
    })}
            </div>
            ${markdownContent.map((markdown) => {
      return html`
                  <div class="feature">
                    <devtools-markdown-view slot="content" .data=${{ tokens: markdown }}>
                    </devtools-markdown-view>
                  </div>`;
    })}
          </div>
        </div>
      </div>
    `, target);
  }) {
    super("whats-new", true);
    this.#view = view;
    this.requestUpdate();
  }
  static async getFileContent() {
    const url = new URL("./resources/WNDT.md", import.meta.url);
    try {
      const response = await fetch(url.toString());
      return await response.text();
    } catch {
      throw new Error(`Markdown file ${url.toString()} not found. Make sure it is correctly listed in the relevant BUILD.gn files.`);
    }
  }
  async performUpdate() {
    const markdownContent = await getMarkdownContent();
    this.#view({
      getReleaseNote,
      openNewTab: UI.UIUtils.openInNewTab,
      markdownContent,
      getThumbnailPath: this.#getThumbnailPath
    }, this, this.contentElement);
  }
  #getThumbnailPath(type) {
    let img;
    switch (type) {
      case "WhatsNew":
        img = WHATS_NEW_THUMBNAIL;
        break;
      case "DevtoolsTips":
        img = DEVTOOLS_TIPS_THUMBNAIL;
        break;
      case "Other":
        img = GENERAL_THUMBNAIL;
        break;
    }
    return new URL(img, import.meta.url).toString();
  }
};

// gen/front_end/panels/whats_new/WhatsNewImpl.js
var WhatsNewImpl_exports = {};
__export(WhatsNewImpl_exports, {
  HelpLateInitialization: () => HelpLateInitialization,
  ReleaseNotesActionDelegate: () => ReleaseNotesActionDelegate,
  ReportIssueActionDelegate: () => ReportIssueActionDelegate,
  getReleaseNoteVersionSetting: () => getReleaseNoteVersionSetting,
  releaseNoteViewId: () => releaseNoteViewId,
  releaseVersionSeen: () => releaseVersionSeen,
  showReleaseNoteIfNeeded: () => showReleaseNoteIfNeeded
});
import * as Common from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
var releaseVersionSeen = "releaseNoteVersionSeen";
var releaseNoteViewId = "release-note";
var releaseNoteVersionSetting;
function showReleaseNoteIfNeeded() {
  const releaseNoteVersionSetting2 = Common.Settings.Settings.instance().createSetting(releaseVersionSeen, 0);
  const releaseNoteVersionSettingValue = releaseNoteVersionSetting2.get();
  const releaseNote2 = getReleaseNote();
  return innerShowReleaseNoteIfNeeded(releaseNoteVersionSettingValue, releaseNote2.version, Common.Settings.Settings.instance().moduleSetting("help.show-release-note").get());
}
function getReleaseNoteVersionSetting() {
  if (!releaseNoteVersionSetting) {
    releaseNoteVersionSetting = Common.Settings.Settings.instance().createSetting(releaseVersionSeen, 0);
  }
  return releaseNoteVersionSetting;
}
function innerShowReleaseNoteIfNeeded(lastSeenVersion, latestVersion, showReleaseNoteSettingEnabled) {
  const releaseNoteVersionSetting2 = Common.Settings.Settings.instance().createSetting(releaseVersionSeen, 0);
  if (!lastSeenVersion) {
    releaseNoteVersionSetting2.set(latestVersion);
    return false;
  }
  if (!showReleaseNoteSettingEnabled) {
    return false;
  }
  if (lastSeenVersion >= latestVersion) {
    return false;
  }
  releaseNoteVersionSetting2.set(latestVersion);
  void UI2.ViewManager.ViewManager.instance().showView(releaseNoteViewId, true);
  return true;
}
var helpLateInitializationInstance;
var HelpLateInitialization = class _HelpLateInitialization {
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!helpLateInitializationInstance || forceNew) {
      helpLateInitializationInstance = new _HelpLateInitialization();
    }
    return helpLateInitializationInstance;
  }
  async run() {
    if (!Host.InspectorFrontendHost.isUnderTest()) {
      showReleaseNoteIfNeeded();
    }
  }
};
var releaseNotesActionDelegateInstance;
var ReleaseNotesActionDelegate = class _ReleaseNotesActionDelegate {
  handleAction(_context, _actionId) {
    const releaseNote2 = getReleaseNote();
    UI2.UIUtils.openInNewTab(releaseNote2.link);
    return true;
  }
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!releaseNotesActionDelegateInstance || forceNew) {
      releaseNotesActionDelegateInstance = new _ReleaseNotesActionDelegate();
    }
    return releaseNotesActionDelegateInstance;
  }
};
var reportIssueActionDelegateInstance;
var ReportIssueActionDelegate = class _ReportIssueActionDelegate {
  handleAction(_context, _actionId) {
    UI2.UIUtils.openInNewTab("https://goo.gle/devtools-bug");
    return true;
  }
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!reportIssueActionDelegateInstance || forceNew) {
      reportIssueActionDelegateInstance = new _ReportIssueActionDelegate();
    }
    return reportIssueActionDelegateInstance;
  }
};
export {
  ReleaseNoteText_exports as ReleaseNoteText,
  ReleaseNoteView_exports as ReleaseNoteView,
  WhatsNewImpl_exports as WhatsNew
};
//# sourceMappingURL=whats_new.js.map
