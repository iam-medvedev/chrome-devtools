// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Workspace from '../../models/workspace/workspace.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import { SearchResultsPane } from './SearchResultsPane.js';
import searchViewStyles from './searchView.css.js';
const UIStrings = {
    /**
     *@description Title of a search bar or tool
     */
    search: 'Search',
    /**
     *@description Accessibility label for search query text box
     */
    searchQuery: 'Search Query',
    /**
     *@description Text to search by matching case of the input
     */
    matchCase: 'Match Case',
    /**
     *@description Text for searching with regular expressinn
     */
    useRegularExpression: 'Use Regular Expression',
    /**
     *@description Text to refresh the page
     */
    refresh: 'Refresh',
    /**
     *@description Text to clear content
     */
    clear: 'Clear',
    /**
     *@description Search message element text content in Search View of the Search tab
     */
    indexing: 'Indexing…',
    /**
     *@description Text to indicate the searching is in progress
     */
    searching: 'Searching…',
    /**
     *@description Text in Search View of the Search tab
     */
    indexingInterrupted: 'Indexing interrupted.',
    /**
     *@description Search results message element text content in Search View of the Search tab
     */
    foundMatchingLineInFile: 'Found 1 matching line in 1 file.',
    /**
     *@description Search results message element text content in Search View of the Search tab
     *@example {2} PH1
     */
    foundDMatchingLinesInFile: 'Found {PH1} matching lines in 1 file.',
    /**
     *@description Search results message element text content in Search View of the Search tab
     *@example {2} PH1
     *@example {2} PH2
     */
    foundDMatchingLinesInDFiles: 'Found {PH1} matching lines in {PH2} files.',
    /**
     *@description Search results message element text content in Search View of the Search tab
     */
    noMatchesFound: 'No matches found.',
    /**
     *@description Text in Search View of the Search tab
     */
    searchFinished: 'Search finished.',
    /**
     *@description Text in Search View of the Search tab
     */
    searchInterrupted: 'Search interrupted.',
};
const str_ = i18n.i18n.registerUIStrings('panels/search/SearchView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class SearchView extends UI.Widget.VBox {
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
    constructor(settingKey, throttler) {
        super(true);
        this.setMinimumSize(0, 40);
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
        this.contentElement.setAttribute('jslog', `${VisualLogging.panel('search').track({ resize: true })}`);
        this.contentElement.classList.add('search-view');
        this.contentElement.addEventListener('keydown', event => {
            this.onKeyDownOnPanel(event);
        });
        this.searchPanelElement = this.contentElement.createChild('div', 'search-drawer-header');
        this.searchResultsElement = this.contentElement.createChild('div');
        this.searchResultsElement.className = 'search-results';
        const searchContainer = document.createElement('div');
        searchContainer.classList.add('toolbar-item-search');
        this.search = UI.HistoryInput.HistoryInput.create();
        this.search.addEventListener('keydown', event => {
            this.onKeyDown(event);
        });
        this.search.setAttribute('jslog', `${VisualLogging.textField().track({ keydown: 'ArrowUp|ArrowDown|Enter' })}`);
        searchContainer.appendChild(this.search);
        this.search.placeholder = i18nString(UIStrings.search);
        this.search.setAttribute('type', 'search');
        this.search.setAttribute('results', '0');
        this.search.setAttribute('size', '100');
        this.search.classList.add('custom-search-input');
        UI.ARIAUtils.setLabel(this.search, i18nString(UIStrings.searchQuery));
        const searchItem = new UI.Toolbar.ToolbarItem(searchContainer);
        const toolbar = new UI.Toolbar.Toolbar('search-toolbar', this.searchPanelElement);
        toolbar.element.setAttribute('jslog', `${VisualLogging.toolbar()}`);
        this.matchCaseButton = SearchView.appendToolbarToggle(toolbar, 'Aa', i18nString(UIStrings.matchCase), 'match-case');
        this.regexButton =
            SearchView.appendToolbarToggle(toolbar, '.*', i18nString(UIStrings.useRegularExpression), 'use-regex');
        toolbar.appendToolbarItem(searchItem);
        const refreshButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.refresh), 'refresh', undefined, 'search.refresh');
        const clearButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.clear), 'clear', undefined, 'search.clear');
        toolbar.appendToolbarItem(refreshButton);
        toolbar.appendToolbarItem(clearButton);
        refreshButton.addEventListener("Click" /* UI.Toolbar.ToolbarButton.Events.Click */, () => this.onAction());
        clearButton.addEventListener("Click" /* UI.Toolbar.ToolbarButton.Events.Click */, () => {
            this.resetSearch();
            this.onSearchInputClear();
        });
        const searchStatusBarElement = this.contentElement.createChild('div', 'search-toolbar-summary');
        this.searchMessageElement = searchStatusBarElement.createChild('div', 'search-message');
        this.searchProgressPlaceholderElement = searchStatusBarElement.createChild('div', 'flex-centered');
        this.searchResultsMessageElement = searchStatusBarElement.createChild('div', 'search-message');
        this.advancedSearchConfig = Common.Settings.Settings.instance().createLocalSetting(settingKey + '-search-config', new Workspace.SearchConfig.SearchConfig('', true, false).toPlainObject());
        this.load();
        this.searchScope = null;
    }
    static appendToolbarToggle(toolbar, text, tooltip, jslogContext) {
        const toggle = new UI.Toolbar.ToolbarToggle(tooltip, undefined, undefined, jslogContext);
        toggle.setText(text);
        toggle.addEventListener("Click" /* UI.Toolbar.ToolbarButton.Events.Click */, () => toggle.setToggled(!toggle.toggled()));
        toolbar.appendToolbarItem(toggle);
        return toggle;
    }
    buildSearchConfig() {
        return new Workspace.SearchConfig.SearchConfig(this.search.value, !this.matchCaseButton.toggled(), this.regexButton.toggled());
    }
    toggle(queryCandidate, searchImmediately) {
        this.search.value = queryCandidate;
        if (this.isShowing()) {
            this.focus();
        }
        else {
            this.focusOnShow = true;
        }
        this.initScope();
        if (searchImmediately) {
            this.onAction();
        }
        else {
            this.startIndexing();
        }
    }
    createScope() {
        throw new Error('Not implemented');
    }
    initScope() {
        this.searchScope = this.createScope();
    }
    wasShown() {
        if (this.focusOnShow) {
            this.focus();
            this.focusOnShow = false;
        }
        this.registerCSSFiles([searchViewStyles]);
    }
    onIndexingFinished() {
        if (!this.progressIndicator) {
            return;
        }
        const finished = !this.progressIndicator.isCanceled();
        this.progressIndicator.done();
        this.progressIndicator = null;
        this.isIndexing = false;
        this.searchMessageElement.textContent = finished ? '' : i18nString(UIStrings.indexingInterrupted);
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
        this.progressIndicator = new UI.ProgressIndicator.ProgressIndicator();
        this.searchMessageElement.textContent = i18nString(UIStrings.indexing);
        this.progressIndicator.show(this.searchProgressPlaceholderElement);
        if (this.searchScope) {
            this.searchScope.performIndexing(new Common.Progress.ProgressProxy(this.progressIndicator, this.onIndexingFinished.bind(this)));
        }
    }
    onSearchInputClear() {
        this.search.value = '';
        this.save();
        this.focus();
    }
    onSearchResult(searchId, searchResult) {
        if (searchId !== this.searchId || !this.progressIndicator) {
            return;
        }
        if (this.progressIndicator && this.progressIndicator.isCanceled()) {
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
        UI.ARIAUtils.alert(this.searchMessageElement.textContent + ' ' + this.searchResultsMessageElement.textContent);
    }
    innerStartSearch(searchConfig) {
        this.searchConfig = searchConfig;
        if (this.progressIndicator) {
            this.progressIndicator.done();
        }
        this.progressIndicator = new UI.ProgressIndicator.ProgressIndicator();
        this.searchStarted(this.progressIndicator);
        if (this.searchScope) {
            void this.searchScope.performSearch(searchConfig, this.progressIndicator, this.onSearchResult.bind(this, this.searchId), this.onSearchFinished.bind(this, this.searchId));
        }
    }
    resetSearch() {
        this.stopSearch();
        this.showPane(null);
        this.searchResultsPane = null;
        this.searchMessageElement.textContent = '';
        this.searchResultsMessageElement.textContent = '';
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
            this.searchingView = new UI.EmptyWidget.EmptyWidget(i18nString(UIStrings.searching));
        }
        this.showPane(this.searchingView);
        this.searchMessageElement.textContent = i18nString(UIStrings.searching);
        progressIndicator.show(this.searchProgressPlaceholderElement);
        this.updateSearchResultsMessage();
    }
    updateSearchResultsMessage() {
        if (this.searchMatchesCount && this.searchResultsCount) {
            if (this.searchMatchesCount === 1 && this.nonEmptySearchResultsCount === 1) {
                this.searchResultsMessageElement.textContent = i18nString(UIStrings.foundMatchingLineInFile);
            }
            else if (this.searchMatchesCount > 1 && this.nonEmptySearchResultsCount === 1) {
                this.searchResultsMessageElement.textContent =
                    i18nString(UIStrings.foundDMatchingLinesInFile, { PH1: this.searchMatchesCount });
            }
            else {
                this.searchResultsMessageElement.textContent = i18nString(UIStrings.foundDMatchingLinesInDFiles, { PH1: this.searchMatchesCount, PH2: this.nonEmptySearchResultsCount });
            }
        }
        else {
            this.searchResultsMessageElement.textContent = '';
        }
    }
    showPane(panel) {
        if (this.visiblePane) {
            this.visiblePane.detach();
        }
        if (panel) {
            panel.show(this.searchResultsElement);
        }
        this.visiblePane = panel;
    }
    nothingFound() {
        if (!this.notFoundView) {
            this.notFoundView = new UI.EmptyWidget.EmptyWidget(i18nString(UIStrings.noMatchesFound));
        }
        this.showPane(this.notFoundView);
        this.searchResultsMessageElement.textContent = i18nString(UIStrings.noMatchesFound);
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
        this.searchMessageElement.textContent =
            finished ? i18nString(UIStrings.searchFinished) : i18nString(UIStrings.searchInterrupted);
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
            case UI.KeyboardShortcut.Keys.Enter.code:
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
        // "Command + Alt + ]" for Mac
        const shouldShowAllForMac = isMac && event.metaKey && !event.ctrlKey && event.altKey && event.code === 'BracketRight';
        // "Ctrl + Shift + }" for other platforms
        const shouldShowAllForOtherPlatforms = !isMac && event.ctrlKey && !event.metaKey && event.shiftKey && event.code === 'BracketRight';
        // "Command + Alt + [" for Mac
        const shouldCollapseAllForMac = isMac && event.metaKey && !event.ctrlKey && event.altKey && event.code === 'BracketLeft';
        // "Command + Alt + {" for other platforms
        const shouldCollapseAllForOtherPlatforms = !isMac && event.ctrlKey && !event.metaKey && event.shiftKey && event.code === 'BracketLeft';
        if (shouldShowAllForMac || shouldShowAllForOtherPlatforms) {
            this.searchResultsPane?.showAllMatches();
            void VisualLogging.logKeyDown(event.currentTarget, event, 'show-all-matches');
        }
        else if (shouldCollapseAllForMac || shouldCollapseAllForOtherPlatforms) {
            this.searchResultsPane?.collapseAllResults();
            void VisualLogging.logKeyDown(event.currentTarget, event, 'collapse-all-results');
        }
    }
    save() {
        this.advancedSearchConfig.set(this.buildSearchConfig().toPlainObject());
    }
    load() {
        const searchConfig = Workspace.SearchConfig.SearchConfig.fromPlainObject(this.advancedSearchConfig.get());
        this.search.value = searchConfig.query();
        this.matchCaseButton.setToggled(!searchConfig.ignoreCase());
        this.regexButton.setToggled(searchConfig.isRegex());
    }
    onAction() {
        const searchConfig = this.buildSearchConfig();
        if (!searchConfig.query() || !searchConfig.query().length) {
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
}
//# sourceMappingURL=SearchView.js.map