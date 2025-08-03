var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/search/SearchResultsPane.js
var SearchResultsPane_exports = {};
__export(SearchResultsPane_exports, {
  SearchResultsPane: () => SearchResultsPane,
  SearchResultsTreeElement: () => SearchResultsTreeElement,
  lineSegmentForMatch: () => lineSegmentForMatch,
  matchesExpandedByDefault: () => matchesExpandedByDefault,
  matchesShownAtOnce: () => matchesShownAtOnce
});
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as Platform from "./../../core/platform/platform.js";
import * as TextUtils from "./../../models/text_utils/text_utils.js";
import * as Components from "./../../ui/legacy/components/utils/utils.js";
import * as UI from "./../../ui/legacy/legacy.js";

// gen/front_end/panels/search/searchResultsPane.css.js
var searchResultsPane_css_default = `/*
 * Copyright 2016 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  padding: 0;
  margin: 0;
  overflow-y: auto;
}

.tree-outline {
  padding: 0;
}

.tree-outline ol {
  padding: 0;
}

.tree-outline li {
  height: 16px;
}

li.search-result {
  cursor: pointer;
  font-size: 12px;
  margin-top: 8px;
  padding: 2px 0 2px 4px;
  word-wrap: normal;
  white-space: pre;
}

li.search-result:hover {
  background-color: var(--sys-color-state-hover-on-subtle);
}

li.search-result .search-result-file-name {
  color: var(--sys-color-on-surface);
  flex: 1 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

li.search-result .search-result-matches-count {
  color: var(--sys-color-token-subtle);
  margin: 0 8px;
}

li.search-result.expanded .search-result-matches-count {
  display: none;
}

li.show-more-matches {
  color: var(--sys-color-on-surface);
  cursor: pointer;
  margin: 8px 0 0 -4px;
}

li.show-more-matches:hover {
  text-decoration: underline;
}

li.search-match {
  margin: 2px 0;
  word-wrap: normal;
  white-space: pre;
}

li.search-match.selected:focus-visible {
  background: var(--sys-color-tonal-container);
}

li.search-match::before {
  display: none;
}

li.search-match .search-match-line-number {
  color: var(--sys-color-token-subtle);
  text-align: right;
  vertical-align: top;
  word-break: normal;
  padding: 2px 4px 2px 6px;
  margin-right: 5px;
}

.tree-outline .devtools-link {
  text-decoration: none;
  display: block;
  flex: auto;
}

li.search-match .search-match-content {
  color: var(--sys-color-on-surface);
}

ol.children.expanded {
  padding-bottom: 4px;
}

li.search-match .link-style.search-match-link {
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 9px;
  text-align: left;
}

.search-result-qualifier {
  color: var(--sys-color-token-subtle);
}

.search-result-dash {
  color: var(--sys-color-surface-variant);
  margin: 0 4px;
}

/*# sourceURL=${import.meta.resolve("./searchResultsPane.css")} */`;

// gen/front_end/panels/search/SearchResultsPane.js
var UIStrings = {
  /**
   *@description Accessibility label for number of matches in each file in search results pane
   *@example {2} PH1
   */
  matchesCountS: "Matches Count {PH1}",
  /**
   *@description Search result label for results in the Search tool
   *@example {2} PH1
   */
  lineS: "Line {PH1}",
  /**
   *@description Text in Search Results Pane of the Search tab
   *@example {2} PH1
   */
  showDMore: "Show {PH1} more"
};
var str_ = i18n.i18n.registerUIStrings("panels/search/SearchResultsPane.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var SearchResultsPane = class extends UI.Widget.VBox {
  searchConfig;
  searchResults;
  treeElements;
  treeOutline;
  matchesExpandedCount;
  constructor(searchConfig) {
    super({ useShadowDom: true });
    this.searchConfig = searchConfig;
    this.searchResults = [];
    this.treeElements = [];
    this.treeOutline = new UI.TreeOutline.TreeOutlineInShadow();
    this.treeOutline.registerRequiredCSS(searchResultsPane_css_default);
    this.treeOutline.hideOverflow();
    this.contentElement.appendChild(this.treeOutline.element);
    this.matchesExpandedCount = 0;
  }
  addSearchResult(searchResult) {
    this.searchResults.push(searchResult);
    this.addTreeElement(searchResult);
  }
  showAllMatches() {
    this.treeElements.forEach((treeElement) => {
      treeElement.expand();
      treeElement.showAllMatches();
    });
  }
  collapseAllResults() {
    this.treeElements.forEach((treeElement) => {
      treeElement.collapse();
    });
  }
  addTreeElement(searchResult) {
    const treeElement = new SearchResultsTreeElement(this.searchConfig, searchResult);
    this.treeOutline.appendChild(treeElement);
    if (!this.treeOutline.selectedTreeElement) {
      treeElement.select(
        /* omitFocus */
        true,
        /* selectedByUser */
        true
      );
    }
    if (this.matchesExpandedCount < matchesExpandedByDefault) {
      treeElement.expand();
    }
    this.matchesExpandedCount += searchResult.matchesCount();
    this.treeElements.push(treeElement);
  }
};
var matchesExpandedByDefault = 200;
var matchesShownAtOnce = 20;
var SearchResultsTreeElement = class extends UI.TreeOutline.TreeElement {
  searchConfig;
  searchResult;
  initialized;
  toggleOnClick;
  constructor(searchConfig, searchResult) {
    super("", true);
    this.searchConfig = searchConfig;
    this.searchResult = searchResult;
    this.initialized = false;
    this.toggleOnClick = true;
  }
  onexpand() {
    if (this.initialized) {
      return;
    }
    this.updateMatchesUI();
    this.initialized = true;
  }
  showAllMatches() {
    this.removeChildren();
    this.appendSearchMatches(0, this.searchResult.matchesCount());
  }
  updateMatchesUI() {
    this.removeChildren();
    const toIndex = Math.min(this.searchResult.matchesCount(), matchesShownAtOnce);
    if (toIndex < this.searchResult.matchesCount()) {
      this.appendSearchMatches(0, toIndex - 1);
      this.appendShowMoreMatchesElement(toIndex - 1);
    } else {
      this.appendSearchMatches(0, toIndex);
    }
  }
  onattach() {
    this.updateSearchMatches();
  }
  updateSearchMatches() {
    this.listItemElement.classList.add("search-result");
    const fileNameSpan = span(this.searchResult.label(), "search-result-file-name");
    fileNameSpan.appendChild(span("\u2014", "search-result-dash"));
    fileNameSpan.appendChild(span(this.searchResult.description(), "search-result-qualifier"));
    this.tooltip = this.searchResult.description();
    this.listItemElement.appendChild(fileNameSpan);
    const matchesCountSpan = document.createElement("span");
    matchesCountSpan.className = "search-result-matches-count";
    matchesCountSpan.textContent = `${this.searchResult.matchesCount()}`;
    UI.ARIAUtils.setLabel(matchesCountSpan, i18nString(UIStrings.matchesCountS, { PH1: this.searchResult.matchesCount() }));
    this.listItemElement.appendChild(matchesCountSpan);
    if (this.expanded) {
      this.updateMatchesUI();
    }
    function span(text, className) {
      const span2 = document.createElement("span");
      span2.className = className;
      span2.textContent = text;
      return span2;
    }
  }
  appendSearchMatches(fromIndex, toIndex) {
    const searchResult = this.searchResult;
    const queries = this.searchConfig.queries();
    const regexes = [];
    for (let i = 0; i < queries.length; ++i) {
      regexes.push(Platform.StringUtilities.createSearchRegex(queries[i], !this.searchConfig.ignoreCase(), this.searchConfig.isRegex()));
    }
    for (let i = fromIndex; i < toIndex; ++i) {
      let lineContent = searchResult.matchLineContent(i);
      let matchRanges = [];
      const column = searchResult.matchColumn(i);
      const matchLength = searchResult.matchLength(i);
      if (column !== void 0 && matchLength !== void 0) {
        const { matchRange, lineSegment } = lineSegmentForMatch(lineContent, new TextUtils.TextRange.SourceRange(column, matchLength));
        lineContent = lineSegment;
        matchRanges = [matchRange];
      } else {
        lineContent = lineContent.trim();
        for (let j = 0; j < regexes.length; ++j) {
          matchRanges = matchRanges.concat(this.regexMatchRanges(lineContent, regexes[j]));
        }
        ({ lineSegment: lineContent, matchRanges } = lineSegmentForMultipleMatches(lineContent, matchRanges));
      }
      const anchor = Components.Linkifier.Linkifier.linkifyRevealable(searchResult.matchRevealable(i), "", void 0, void 0, void 0, "search-match");
      anchor.classList.add("search-match-link");
      anchor.tabIndex = 0;
      const labelSpan = document.createElement("span");
      labelSpan.classList.add("search-match-line-number");
      const resultLabel = searchResult.matchLabel(i);
      labelSpan.textContent = resultLabel;
      if (typeof resultLabel === "number" && !isNaN(resultLabel)) {
        UI.ARIAUtils.setLabel(labelSpan, i18nString(UIStrings.lineS, { PH1: resultLabel }));
      } else {
        UI.ARIAUtils.setLabel(labelSpan, resultLabel);
      }
      anchor.appendChild(labelSpan);
      const contentSpan = this.createContentSpan(lineContent, matchRanges);
      anchor.appendChild(contentSpan);
      const searchMatchElement = new UI.TreeOutline.TreeElement();
      this.appendChild(searchMatchElement);
      searchMatchElement.listItemElement.className = "search-match";
      searchMatchElement.listItemElement.appendChild(anchor);
      searchMatchElement.listItemElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.consume(true);
          void Common.Revealer.reveal(searchResult.matchRevealable(i));
        }
      });
      searchMatchElement.tooltip = lineContent;
    }
  }
  appendShowMoreMatchesElement(startMatchIndex) {
    const matchesLeftCount = this.searchResult.matchesCount() - startMatchIndex;
    const showMoreMatchesText = i18nString(UIStrings.showDMore, { PH1: matchesLeftCount });
    const showMoreMatchesTreeElement = new UI.TreeOutline.TreeElement(showMoreMatchesText);
    this.appendChild(showMoreMatchesTreeElement);
    showMoreMatchesTreeElement.listItemElement.classList.add("show-more-matches");
    showMoreMatchesTreeElement.onselect = this.showMoreMatchesElementSelected.bind(this, showMoreMatchesTreeElement, startMatchIndex);
  }
  createContentSpan(lineContent, matchRanges) {
    const contentSpan = document.createElement("span");
    contentSpan.className = "search-match-content";
    contentSpan.textContent = lineContent;
    UI.ARIAUtils.setLabel(contentSpan, `${lineContent} line`);
    UI.UIUtils.highlightRangesWithStyleClass(contentSpan, matchRanges, "highlighted-search-result");
    return contentSpan;
  }
  regexMatchRanges(lineContent, regex) {
    regex.lastIndex = 0;
    let match;
    const matchRanges = [];
    while (regex.lastIndex < lineContent.length && (match = regex.exec(lineContent))) {
      matchRanges.push(new TextUtils.TextRange.SourceRange(match.index, match[0].length));
    }
    return matchRanges;
  }
  showMoreMatchesElementSelected(showMoreMatchesTreeElement, startMatchIndex) {
    this.removeChild(showMoreMatchesTreeElement);
    this.appendSearchMatches(startMatchIndex, this.searchResult.matchesCount());
    return false;
  }
};
var DEFAULT_OPTS = {
  prefixLength: 25,
  maxLength: 1e3
};
function lineSegmentForMatch(lineContent, range, optionsArg = DEFAULT_OPTS) {
  const options = { ...DEFAULT_OPTS, ...optionsArg };
  const attemptedTrimmedLine = lineContent.trimStart();
  const potentiallyRemovedWhitespaceLength = lineContent.length - attemptedTrimmedLine.length;
  const actuallyRemovedWhitespaceLength = Math.min(range.offset, potentiallyRemovedWhitespaceLength);
  const lineSegmentBegin = Math.max(actuallyRemovedWhitespaceLength, range.offset - options.prefixLength);
  const lineSegmentEnd = Math.min(lineContent.length, lineSegmentBegin + options.maxLength);
  const lineSegmentPrefix = lineSegmentBegin > actuallyRemovedWhitespaceLength ? "\u2026" : "";
  const lineSegment = lineSegmentPrefix + lineContent.substring(lineSegmentBegin, lineSegmentEnd);
  const rangeOffset = range.offset - lineSegmentBegin + lineSegmentPrefix.length;
  const rangeLength = Math.min(range.length, lineSegment.length - rangeOffset);
  const matchRange = new TextUtils.TextRange.SourceRange(rangeOffset, rangeLength);
  return { lineSegment, matchRange };
}
function lineSegmentForMultipleMatches(lineContent, ranges) {
  let trimBy = 0;
  let matchRanges = ranges;
  if (matchRanges.length > 0 && matchRanges[0].offset > 20) {
    trimBy = 15;
  }
  let lineSegment = lineContent.substring(trimBy, 1e3 + trimBy);
  if (trimBy) {
    matchRanges = matchRanges.map((range) => new TextUtils.TextRange.SourceRange(range.offset - trimBy + 1, range.length));
    lineSegment = "\u2026" + lineSegment;
  }
  return { lineSegment, matchRanges };
}

// gen/front_end/panels/search/SearchScope.js
var SearchScope_exports = {};

// gen/front_end/panels/search/SearchView.js
var SearchView_exports = {};
__export(SearchView_exports, {
  SearchView: () => SearchView
});
import "./../../ui/legacy/legacy.js";
import * as Common2 from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as Workspace from "./../../models/workspace/workspace.js";
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as IconButton from "./../../ui/components/icon_button/icon_button.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/search/searchView.css.js
var searchView_css_default = `/*
 * Copyright 2014 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.search-drawer-header {
  align-items: center;
  flex-shrink: 0;
  overflow: hidden;
  display: inline-flex;
  min-width: 150px;

  .search-container {
    border-bottom: 1px solid var(--sys-color-divider);
    display: flex;
    height: 100%;
    align-items: center;
    flex-grow: 1;
  }

  .toolbar-item-search {
    flex-grow: 1;
    box-shadow: inset 0 0 0 2px transparent;
    box-sizing: border-box;
    height: var(--sys-size-9);
    margin-left: var(--sys-size-3);
    padding: 0 var(--sys-size-2) 0 var(--sys-size-5);
    border-radius: 100px;
    position: relative;
    display: flex;
    align-items: center;
    background-color: var(--sys-color-cdt-base);

    &:has(input:focus) {
      box-shadow: inset 0 0 0 2px var(--sys-color-state-focus-ring);
    }

    &:has(input:hover)::before {
      content: "";
      box-sizing: inherit;
      height: 100%;
      width: 100%;
      position: absolute;
      border-radius: 100px;
      left: 0;
      background-color: var(--sys-color-state-hover-on-subtle);
    }

    & > devtools-icon {
      color: var(--sys-color-on-surface-subtle);
      width: var(--sys-size-8);
      height: var(--sys-size-8);
      margin-right: var(--sys-size-3);
    }

    & > devtools-button:last-child {
      margin-right: var(--sys-size-4);
    }
  }

  .search-toolbar-input {
    appearance: none;
    color: var(--sys-color-on-surface);
    background-color: transparent;
    border: 0;
    z-index: 1;
    flex: 1;

    &::placeholder {
      color: var(--sys-color-on-surface-subtle);
    }

    &:placeholder-shown + .clear-button {
      display: none;
    }

    &::-webkit-search-cancel-button {
      display: none;
    }
  }
}

.search-toolbar {
  background-color: var(--sys-color-cdt-base-container);
  border-bottom: 1px solid var(--sys-color-divider);
}

.search-toolbar-summary {
  background-color: var(--sys-color-cdt-base-container);
  border-top: 1px solid var(--sys-color-divider);
  padding-left: 5px;
  flex: 0 0 19px;
  display: flex;
  padding-right: 5px;
}

.search-results:has(.empty-state) + .search-toolbar-summary {
  display: none;
}

.search-toolbar-summary .search-message {
  padding-top: 2px;
  padding-left: 1ex;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.search-view .search-results {
  overflow-y: auto;
  display: flex;
  flex: auto;
}

.search-view .search-results > div {
  flex: auto;
}

/*# sourceURL=${import.meta.resolve("./searchView.css")} */`;

// gen/front_end/panels/search/SearchView.js
var UIStrings2 = {
  /**
   *@description Placeholder text of a search bar
   */
  find: "Find",
  /**
   *@description Tooltip text on a toggle to enable search by matching case of the input
   */
  enableCaseSensitive: "Enable case sensitive search",
  /**
   *@description Tooltip text on a toggle to disable search by matching case of the input
   */
  disableCaseSensitive: "Disable case sensitive search",
  /**
   *@description Tooltip text on a toggle to enable searching with regular expression
   */
  enableRegularExpression: "Enable regular expressions",
  /**
   *@description Tooltip text on a toggle to disable searching with regular expression
   */
  disableRegularExpression: "Disable regular expressions",
  /**
   *@description Text to refresh the page
   */
  refresh: "Refresh",
  /**
   *@description Tooltip text to clear the search input field
   */
  clearInput: "Clear",
  /**
   *@description Text to clear content
   */
  clear: "Clear search",
  /**
   *@description Search message element text content in Search View of the Search tab
   */
  indexing: "Indexing\u2026",
  /**
   *@description Text to indicate the searching is in progress
   */
  searching: "Searching\u2026",
  /**
   *@description Text in Search View of the Search tab
   */
  indexingInterrupted: "Indexing interrupted.",
  /**
   *@description Search results message element text content in Search View of the Search tab
   */
  foundMatchingLineInFile: "Found 1 matching line in 1 file.",
  /**
   *@description Search results message element text content in Search View of the Search tab
   *@example {2} PH1
   */
  foundDMatchingLinesInFile: "Found {PH1} matching lines in 1 file.",
  /**
   *@description Search results message element text content in Search View of the Search tab
   *@example {2} PH1
   *@example {2} PH2
   */
  foundDMatchingLinesInDFiles: "Found {PH1} matching lines in {PH2} files.",
  /**
   *@description Search results message element text content in Search View of the Search tab
   */
  noMatchesFound: "No matches found",
  /**
   *@description Search results message element text content in Search View of the Search tab
   */
  nothingMatchedTheQuery: "Nothing matched your search query",
  /**
   *@description Text in Search View of the Search tab
   */
  searchFinished: "Search finished.",
  /**
   *@description Text in Search View of the Search tab
   */
  searchInterrupted: "Search interrupted.",
  /**
   *@description Text in Search View of the Search tab if user hasn't started the search
   *@example {Enter} PH1
   */
  typeAndPressSToSearch: "Type and press {PH1} to search",
  /**
   *@description Text in Search view of the Search tab if user hasn't started the search
   */
  noSearchResult: "No search results"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/search/SearchView.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
function createSearchToggleButton(iconName, jslogContext) {
  const button = new Buttons.Button.Button();
  button.data = {
    variant: "icon_toggle",
    iconName,
    toggledIconName: iconName,
    toggleType: "primary-toggle",
    size: "SMALL",
    toggled: false,
    jslogContext
  };
  return button;
}
var SearchView = class extends UI2.Widget.VBox {
  focusOnShow;
  isIndexing;
  searchId;
  searchMatchesCount;
  searchResultsCount;
  nonEmptySearchResultsCount;
  searchingView;
  notFoundView;
  searchConfig;
  pendingSearchConfig;
  searchResultsPane;
  progressIndicator;
  visiblePane;
  searchPanelElement;
  searchResultsElement;
  search;
  matchCaseButton;
  regexButton;
  searchMessageElement;
  searchProgressPlaceholderElement;
  searchResultsMessageElement;
  advancedSearchConfig;
  searchScope;
  // We throttle adding search results, otherwise we trigger DOM layout for each
  // result added.
  #throttler;
  #pendingSearchResults = [];
  #emptyStartView;
  constructor(settingKey, throttler) {
    super({ useShadowDom: true });
    this.setMinimumSize(0, 40);
    this.registerRequiredCSS(searchView_css_default);
    this.focusOnShow = false;
    this.isIndexing = false;
    this.searchId = 1;
    this.searchMatchesCount = 0;
    this.searchResultsCount = 0;
    this.nonEmptySearchResultsCount = 0;
    this.searchingView = null;
    this.notFoundView = null;
    this.searchConfig = null;
    this.pendingSearchConfig = null;
    this.searchResultsPane = null;
    this.progressIndicator = null;
    this.visiblePane = null;
    this.#throttler = throttler;
    this.contentElement.setAttribute("jslog", `${VisualLogging.panel("search").track({ resize: true })}`);
    this.contentElement.classList.add("search-view");
    this.contentElement.addEventListener("keydown", (event) => {
      this.onKeyDownOnPanel(event);
    });
    this.searchPanelElement = this.contentElement.createChild("div", "search-drawer-header");
    this.searchResultsElement = this.contentElement.createChild("div");
    this.searchResultsElement.className = "search-results";
    const searchContainer = document.createElement("div");
    searchContainer.classList.add("search-container");
    const searchElements = searchContainer.createChild("div", "toolbar-item-search");
    const searchIcon = IconButton.Icon.create("search");
    searchElements.appendChild(searchIcon);
    this.search = UI2.UIUtils.createHistoryInput("search", "search-toolbar-input");
    this.search.addEventListener("keydown", (event) => {
      this.onKeyDown(event);
    });
    this.search.setAttribute("jslog", `${VisualLogging.textField().track({ change: true, keydown: "ArrowUp|ArrowDown|Enter" })}`);
    searchElements.appendChild(this.search);
    this.search.placeholder = i18nString2(UIStrings2.find);
    this.search.setAttribute("results", "0");
    this.search.setAttribute("size", "100");
    UI2.ARIAUtils.setLabel(this.search, this.search.placeholder);
    const clearInputFieldButton = new Buttons.Button.Button();
    clearInputFieldButton.data = {
      variant: "icon",
      iconName: "cross-circle-filled",
      jslogContext: "clear-input",
      size: "SMALL",
      title: i18nString2(UIStrings2.clearInput)
    };
    clearInputFieldButton.classList.add("clear-button");
    clearInputFieldButton.addEventListener("click", () => {
      this.onSearchInputClear();
    });
    clearInputFieldButton.tabIndex = -1;
    searchElements.appendChild(clearInputFieldButton);
    const regexIconName = "regular-expression";
    this.regexButton = createSearchToggleButton(regexIconName, regexIconName);
    this.regexButton.addEventListener("click", () => this.regexButtonToggled());
    searchElements.appendChild(this.regexButton);
    const matchCaseIconName = "match-case";
    this.matchCaseButton = createSearchToggleButton(matchCaseIconName, matchCaseIconName);
    this.matchCaseButton.addEventListener("click", () => this.matchCaseButtonToggled());
    searchElements.appendChild(this.matchCaseButton);
    this.searchPanelElement.appendChild(searchContainer);
    const toolbar2 = this.searchPanelElement.createChild("devtools-toolbar", "search-toolbar");
    toolbar2.setAttribute("jslog", `${VisualLogging.toolbar()}`);
    const refreshButton = new UI2.Toolbar.ToolbarButton(i18nString2(UIStrings2.refresh), "refresh", void 0, "search.refresh");
    const clearButton = new UI2.Toolbar.ToolbarButton(i18nString2(UIStrings2.clear), "clear", void 0, "search.clear");
    toolbar2.appendToolbarItem(refreshButton);
    toolbar2.appendToolbarItem(clearButton);
    refreshButton.addEventListener("Click", () => this.onAction());
    clearButton.addEventListener("Click", () => {
      this.resetSearch();
      this.onSearchInputClear();
    });
    const searchStatusBarElement = this.contentElement.createChild("div", "search-toolbar-summary");
    this.searchMessageElement = searchStatusBarElement.createChild("div", "search-message");
    this.searchProgressPlaceholderElement = searchStatusBarElement.createChild("div", "flex-centered");
    this.searchResultsMessageElement = searchStatusBarElement.createChild("div", "search-message");
    this.advancedSearchConfig = Common2.Settings.Settings.instance().createLocalSetting(settingKey + "-search-config", new Workspace.SearchConfig.SearchConfig("", true, false).toPlainObject());
    this.load();
    this.searchScope = null;
    this.#emptyStartView = new UI2.EmptyWidget.EmptyWidget(i18nString2(UIStrings2.noSearchResult), i18nString2(UIStrings2.typeAndPressSToSearch, {
      PH1: UI2.KeyboardShortcut.KeyboardShortcut.shortcutToString(UI2.KeyboardShortcut.Keys.Enter)
    }));
    this.showPane(this.#emptyStartView);
  }
  regexButtonToggled() {
    this.regexButton.title = this.regexButton.toggled ? i18nString2(UIStrings2.disableRegularExpression) : i18nString2(UIStrings2.enableRegularExpression);
  }
  matchCaseButtonToggled() {
    this.matchCaseButton.title = this.matchCaseButton.toggled ? i18nString2(UIStrings2.disableCaseSensitive) : i18nString2(UIStrings2.enableCaseSensitive);
  }
  buildSearchConfig() {
    return new Workspace.SearchConfig.SearchConfig(this.search.value, !this.matchCaseButton.toggled, this.regexButton.toggled);
  }
  toggle(queryCandidate, searchImmediately) {
    this.search.value = queryCandidate;
    if (this.isShowing()) {
      this.focus();
    } else {
      this.focusOnShow = true;
    }
    this.initScope();
    if (searchImmediately) {
      this.onAction();
    } else {
      this.startIndexing();
    }
  }
  createScope() {
    throw new Error("Not implemented");
  }
  initScope() {
    this.searchScope = this.createScope();
  }
  wasShown() {
    super.wasShown();
    if (this.focusOnShow) {
      this.focus();
      this.focusOnShow = false;
    }
  }
  onIndexingFinished() {
    if (!this.progressIndicator) {
      return;
    }
    const finished = !this.progressIndicator.isCanceled();
    this.progressIndicator.done();
    this.progressIndicator = null;
    this.isIndexing = false;
    this.searchMessageElement.textContent = finished ? "" : i18nString2(UIStrings2.indexingInterrupted);
    if (!finished) {
      this.pendingSearchConfig = null;
    }
    if (!this.pendingSearchConfig) {
      return;
    }
    const searchConfig = this.pendingSearchConfig;
    this.pendingSearchConfig = null;
    this.innerStartSearch(searchConfig);
  }
  startIndexing() {
    this.isIndexing = true;
    if (this.progressIndicator) {
      this.progressIndicator.done();
    }
    this.progressIndicator = new UI2.ProgressIndicator.ProgressIndicator();
    this.searchMessageElement.textContent = i18nString2(UIStrings2.indexing);
    this.progressIndicator.show(this.searchProgressPlaceholderElement);
    if (this.searchScope) {
      this.searchScope.performIndexing(new Common2.Progress.ProgressProxy(this.progressIndicator, this.onIndexingFinished.bind(this)));
    }
  }
  onSearchInputClear() {
    this.search.value = "";
    this.save();
    this.focus();
    this.showPane(this.#emptyStartView);
  }
  onSearchResult(searchId, searchResult) {
    if (searchId !== this.searchId || !this.progressIndicator) {
      return;
    }
    if (this.progressIndicator?.isCanceled()) {
      this.onIndexingFinished();
      return;
    }
    if (!this.searchResultsPane) {
      this.searchResultsPane = new SearchResultsPane(this.searchConfig);
      this.showPane(this.searchResultsPane);
    }
    this.#pendingSearchResults.push(searchResult);
    void this.#throttler.schedule(async () => this.#addPendingSearchResults());
  }
  #addPendingSearchResults() {
    for (const searchResult of this.#pendingSearchResults) {
      this.addSearchResult(searchResult);
      if (searchResult.matchesCount()) {
        this.searchResultsPane?.addSearchResult(searchResult);
      }
    }
    this.#pendingSearchResults = [];
  }
  onSearchFinished(searchId, finished) {
    if (searchId !== this.searchId || !this.progressIndicator) {
      return;
    }
    if (!this.searchResultsPane) {
      this.nothingFound();
    }
    this.searchFinished(finished);
    this.searchConfig = null;
    UI2.ARIAUtils.LiveAnnouncer.alert(this.searchMessageElement.textContent + " " + this.searchResultsMessageElement.textContent);
  }
  innerStartSearch(searchConfig) {
    this.searchConfig = searchConfig;
    if (this.progressIndicator) {
      this.progressIndicator.done();
    }
    this.progressIndicator = new UI2.ProgressIndicator.ProgressIndicator();
    this.searchStarted(this.progressIndicator);
    if (this.searchScope) {
      void this.searchScope.performSearch(searchConfig, this.progressIndicator, this.onSearchResult.bind(this, this.searchId), this.onSearchFinished.bind(this, this.searchId));
    }
  }
  resetSearch() {
    this.stopSearch();
    this.showPane(null);
    this.searchResultsPane = null;
    this.searchMessageElement.textContent = "";
    this.searchResultsMessageElement.textContent = "";
  }
  stopSearch() {
    if (this.progressIndicator && !this.isIndexing) {
      this.progressIndicator.cancel();
    }
    if (this.searchScope) {
      this.searchScope.stopSearch();
    }
    this.searchConfig = null;
  }
  searchStarted(progressIndicator) {
    this.searchMatchesCount = 0;
    this.searchResultsCount = 0;
    this.nonEmptySearchResultsCount = 0;
    if (!this.searchingView) {
      this.searchingView = new UI2.EmptyWidget.EmptyWidget(i18nString2(UIStrings2.searching), "");
    }
    this.showPane(this.searchingView);
    this.searchMessageElement.textContent = i18nString2(UIStrings2.searching);
    progressIndicator.show(this.searchProgressPlaceholderElement);
    this.updateSearchResultsMessage();
  }
  updateSearchResultsMessage() {
    if (this.searchMatchesCount && this.searchResultsCount) {
      if (this.searchMatchesCount === 1 && this.nonEmptySearchResultsCount === 1) {
        this.searchResultsMessageElement.textContent = i18nString2(UIStrings2.foundMatchingLineInFile);
      } else if (this.searchMatchesCount > 1 && this.nonEmptySearchResultsCount === 1) {
        this.searchResultsMessageElement.textContent = i18nString2(UIStrings2.foundDMatchingLinesInFile, { PH1: this.searchMatchesCount });
      } else {
        this.searchResultsMessageElement.textContent = i18nString2(UIStrings2.foundDMatchingLinesInDFiles, { PH1: this.searchMatchesCount, PH2: this.nonEmptySearchResultsCount });
      }
    } else {
      this.searchResultsMessageElement.textContent = "";
    }
  }
  showPane(panel2) {
    if (this.visiblePane) {
      this.visiblePane.detach();
    }
    if (panel2) {
      panel2.show(this.searchResultsElement);
    }
    this.visiblePane = panel2;
  }
  nothingFound() {
    if (!this.notFoundView) {
      this.notFoundView = new UI2.EmptyWidget.EmptyWidget(i18nString2(UIStrings2.noMatchesFound), i18nString2(UIStrings2.nothingMatchedTheQuery));
    }
    this.showPane(this.notFoundView);
  }
  addSearchResult(searchResult) {
    const matchesCount = searchResult.matchesCount();
    this.searchMatchesCount += matchesCount;
    this.searchResultsCount++;
    if (matchesCount) {
      this.nonEmptySearchResultsCount++;
    }
    this.updateSearchResultsMessage();
  }
  searchFinished(finished) {
    this.searchMessageElement.textContent = finished ? i18nString2(UIStrings2.searchFinished) : i18nString2(UIStrings2.searchInterrupted);
  }
  focus() {
    this.search.focus();
    this.search.select();
  }
  willHide() {
    this.stopSearch();
  }
  onKeyDown(event) {
    this.save();
    switch (event.keyCode) {
      case UI2.KeyboardShortcut.Keys.Enter.code:
        this.onAction();
        break;
    }
  }
  /**
   * Handles keydown event on panel itself for handling expand/collapse all shortcut
   *
   * We use `event.code` instead of `event.key` here to check whether the shortcut is triggered.
   * The reason is, `event.key` is dependent on the modification keys, locale and keyboard layout.
   * Usually it is useful when we care about the character that needs to be printed.
   *
   * However, our aim in here is to assign a shortcut to the physical key combination on the keyboard
   * not on the character that the key combination prints.
   *
   * For example, `Cmd + [` shortcut in global shortcuts map to focusing on previous panel.
   * In Turkish - Q keyboard layout, the key combination that triggers the shortcut prints `ğ`
   * character. Whereas in Turkish - Q Legacy keyboard layout, the shortcut that triggers focusing
   * on previous panel prints `[` character. So, if we use `event.key` and check
   * whether it is `[`, we break the shortcut in Turkish - Q keyboard layout.
   *
   * @param event KeyboardEvent
   */
  onKeyDownOnPanel(event) {
    const isMac = Host.Platform.isMac();
    const shouldShowAllForMac = isMac && event.metaKey && !event.ctrlKey && event.altKey && event.code === "BracketRight";
    const shouldShowAllForOtherPlatforms = !isMac && event.ctrlKey && !event.metaKey && event.shiftKey && event.code === "BracketRight";
    const shouldCollapseAllForMac = isMac && event.metaKey && !event.ctrlKey && event.altKey && event.code === "BracketLeft";
    const shouldCollapseAllForOtherPlatforms = !isMac && event.ctrlKey && !event.metaKey && event.shiftKey && event.code === "BracketLeft";
    if (shouldShowAllForMac || shouldShowAllForOtherPlatforms) {
      this.searchResultsPane?.showAllMatches();
      void VisualLogging.logKeyDown(event.currentTarget, event, "show-all-matches");
    } else if (shouldCollapseAllForMac || shouldCollapseAllForOtherPlatforms) {
      this.searchResultsPane?.collapseAllResults();
      void VisualLogging.logKeyDown(event.currentTarget, event, "collapse-all-results");
    }
  }
  save() {
    this.advancedSearchConfig.set(this.buildSearchConfig().toPlainObject());
  }
  load() {
    const searchConfig = Workspace.SearchConfig.SearchConfig.fromPlainObject(this.advancedSearchConfig.get());
    this.search.value = searchConfig.query();
    this.matchCaseButton.toggled = !searchConfig.ignoreCase();
    this.matchCaseButtonToggled();
    this.regexButton.toggled = searchConfig.isRegex();
    this.regexButtonToggled();
  }
  onAction() {
    const searchConfig = this.buildSearchConfig();
    if (!searchConfig.query()?.length) {
      return;
    }
    this.resetSearch();
    ++this.searchId;
    this.initScope();
    if (!this.isIndexing) {
      this.startIndexing();
    }
    this.pendingSearchConfig = searchConfig;
  }
  get throttlerForTest() {
    return this.#throttler;
  }
};
export {
  SearchResultsPane_exports as SearchResultsPane,
  SearchScope_exports as SearchScope,
  SearchView_exports as SearchView
};
//# sourceMappingURL=search.js.map
