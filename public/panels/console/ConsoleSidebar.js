// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-imperative-dom-api */
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as IconButton from '../../ui/components/icon_button/icon_button.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import { ConsoleFilter, FilterType } from './ConsoleFilter.js';
import consoleSidebarStyles from './consoleSidebar.css.js';
const UIStrings = {
    /**
     * @description Filter name in Console Sidebar of the Console panel. This is shown when we fail to
     * parse a URL when trying to display console messages from each URL separately. This might be
     * because the console message does not come from any particular URL. This should be translated as
     * a term that indicates 'not one of the other URLs listed here'.
     */
    other: '<other>',
    /**
     *@description Text in Console Sidebar of the Console panel to show how many user messages exist.
     */
    dUserMessages: '{n, plural, =0 {No user messages} =1 {# user message} other {# user messages}}',
    /**
     *@description Text in Console Sidebar of the Console panel to show how many messages exist.
     */
    dMessages: '{n, plural, =0 {No messages} =1 {# message} other {# messages}}',
    /**
     *@description Text in Console Sidebar of the Console panel to show how many errors exist.
     */
    dErrors: '{n, plural, =0 {No errors} =1 {# error} other {# errors}}',
    /**
     *@description Text in Console Sidebar of the Console panel to show how many warnings exist.
     */
    dWarnings: '{n, plural, =0 {No warnings} =1 {# warning} other {# warnings}}',
    /**
     *@description Text in Console Sidebar of the Console panel to show how many info messages exist.
     */
    dInfo: '{n, plural, =0 {No info} =1 {# info} other {# info}}',
    /**
     *@description Text in Console Sidebar of the Console panel to show how many verbose messages exist.
     */
    dVerbose: '{n, plural, =0 {No verbose} =1 {# verbose} other {# verbose}}',
};
const str_ = i18n.i18n.registerUIStrings('panels/console/ConsoleSidebar.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class ConsoleSidebar extends Common.ObjectWrapper.eventMixin(UI.Widget.VBox) {
    tree;
    selectedTreeElement;
    treeElements;
    constructor() {
        super(true);
        this.setMinimumSize(125, 0);
        this.tree = new UI.TreeOutline.TreeOutlineInShadow("NavigationTree" /* UI.TreeOutline.TreeVariant.NAVIGATION_TREE */);
        this.tree.addEventListener(UI.TreeOutline.Events.ElementSelected, this.selectionChanged.bind(this));
        this.tree.registerRequiredCSS(consoleSidebarStyles);
        this.tree.hideOverflow();
        this.contentElement.setAttribute('jslog', `${VisualLogging.pane('sidebar').track({ resize: true })}`);
        this.contentElement.appendChild(this.tree.element);
        this.selectedTreeElement = null;
        this.treeElements = [];
        const selectedFilterSetting = Common.Settings.Settings.instance().createSetting('console.sidebar-selected-filter', null);
        const consoleAPIParsedFilters = [{
                key: FilterType.Source,
                text: Common.Console.FrontendMessageSource.ConsoleAPI,
                negative: false,
                regex: undefined,
            }];
        this.appendGroup("message" /* GroupName.ALL */, [], ConsoleFilter.allLevelsFilterValue(), IconButton.Icon.create('list'), selectedFilterSetting);
        this.appendGroup("user message" /* GroupName.CONSOLE_API */, consoleAPIParsedFilters, ConsoleFilter.allLevelsFilterValue(), IconButton.Icon.create('profile'), selectedFilterSetting);
        this.appendGroup("error" /* GroupName.ERROR */, [], ConsoleFilter.singleLevelMask("error" /* Protocol.Log.LogEntryLevel.Error */), IconButton.Icon.create('cross-circle'), selectedFilterSetting);
        this.appendGroup("warning" /* GroupName.WARNING */, [], ConsoleFilter.singleLevelMask("warning" /* Protocol.Log.LogEntryLevel.Warning */), IconButton.Icon.create('warning'), selectedFilterSetting);
        this.appendGroup("info" /* GroupName.INFO */, [], ConsoleFilter.singleLevelMask("info" /* Protocol.Log.LogEntryLevel.Info */), IconButton.Icon.create('info'), selectedFilterSetting);
        this.appendGroup("verbose" /* GroupName.VERBOSE */, [], ConsoleFilter.singleLevelMask("verbose" /* Protocol.Log.LogEntryLevel.Verbose */), IconButton.Icon.create('bug'), selectedFilterSetting);
        const selectedTreeElementName = selectedFilterSetting.get();
        const defaultTreeElement = this.treeElements.find(x => x.name() === selectedTreeElementName) || this.treeElements[0];
        defaultTreeElement.select();
    }
    appendGroup(name, parsedFilters, levelsMask, icon, selectedFilterSetting) {
        const filter = new ConsoleFilter(name, parsedFilters, null, levelsMask);
        const treeElement = new FilterTreeElement(filter, icon, selectedFilterSetting);
        this.tree.appendChild(treeElement);
        this.treeElements.push(treeElement);
    }
    clear() {
        for (const treeElement of this.treeElements) {
            treeElement.clear();
        }
    }
    onMessageAdded(viewMessage) {
        for (const treeElement of this.treeElements) {
            treeElement.onMessageAdded(viewMessage);
        }
    }
    shouldBeVisible(viewMessage) {
        if (this.selectedTreeElement instanceof ConsoleSidebarTreeElement) {
            return this.selectedTreeElement.filter().shouldBeVisible(viewMessage);
        }
        return true;
    }
    selectionChanged(event) {
        this.selectedTreeElement = event.data;
        this.dispatchEventToListeners("FilterSelected" /* Events.FILTER_SELECTED */);
    }
}
class ConsoleSidebarTreeElement extends UI.TreeOutline.TreeElement {
    filterInternal;
    constructor(title, filter) {
        super(title);
        this.filterInternal = filter;
    }
    filter() {
        return this.filterInternal;
    }
}
export class URLGroupTreeElement extends ConsoleSidebarTreeElement {
    countElement;
    messageCount;
    constructor(filter) {
        super(filter.name, filter);
        this.countElement = this.listItemElement.createChild('span', 'count');
        const icon = IconButton.Icon.create('document');
        this.setLeadingIcons([icon]);
        this.messageCount = 0;
    }
    incrementAndUpdateCounter() {
        this.messageCount++;
        this.countElement.textContent = `${this.messageCount}`;
    }
}
/**
 * Maps the GroupName for a filter to the UIString used to render messages.
 * Stored here so we only construct it once at runtime, rather than every time we
 * construct a filter or get a new message.
 */
const stringForFilterSidebarItemMap = new Map([
    ["user message" /* GroupName.CONSOLE_API */, UIStrings.dUserMessages],
    ["message" /* GroupName.ALL */, UIStrings.dMessages],
    ["error" /* GroupName.ERROR */, UIStrings.dErrors],
    ["warning" /* GroupName.WARNING */, UIStrings.dWarnings],
    ["info" /* GroupName.INFO */, UIStrings.dInfo],
    ["verbose" /* GroupName.VERBOSE */, UIStrings.dVerbose],
]);
export class FilterTreeElement extends ConsoleSidebarTreeElement {
    selectedFilterSetting;
    urlTreeElements;
    messageCount;
    uiStringForFilterCount;
    constructor(filter, icon, selectedFilterSetting) {
        super(filter.name, filter);
        this.uiStringForFilterCount = stringForFilterSidebarItemMap.get(filter.name) || '';
        this.selectedFilterSetting = selectedFilterSetting;
        this.urlTreeElements = new Map();
        this.setLeadingIcons([icon]);
        this.messageCount = 0;
        this.updateCounter();
    }
    clear() {
        this.urlTreeElements.clear();
        this.removeChildren();
        this.messageCount = 0;
        this.updateCounter();
    }
    name() {
        return this.filterInternal.name;
    }
    onselect(selectedByUser) {
        this.selectedFilterSetting.set(this.filterInternal.name);
        return super.onselect(selectedByUser);
    }
    updateCounter() {
        this.title = this.updateGroupTitle(this.messageCount);
        this.setExpandable(Boolean(this.childCount()));
    }
    updateGroupTitle(messageCount) {
        if (this.uiStringForFilterCount) {
            // eslint-disable-next-line rulesdir/l10n-i18nString-call-only-with-uistrings
            return i18nString(this.uiStringForFilterCount, { n: messageCount });
        }
        return '';
    }
    onMessageAdded(viewMessage) {
        const message = viewMessage.consoleMessage();
        const shouldIncrementCounter = message.type !== SDK.ConsoleModel.FrontendMessageType.Command &&
            message.type !== SDK.ConsoleModel.FrontendMessageType.Result && !message.isGroupMessage();
        if (!this.filterInternal.shouldBeVisible(viewMessage) || !shouldIncrementCounter) {
            return;
        }
        const child = this.childElement(message.url);
        child.incrementAndUpdateCounter();
        this.messageCount++;
        this.updateCounter();
    }
    childElement(url) {
        const urlValue = url || null;
        let child = this.urlTreeElements.get(urlValue);
        if (child) {
            return child;
        }
        const filter = this.filterInternal.clone();
        const parsedURL = urlValue ? Common.ParsedURL.ParsedURL.fromString(urlValue) : null;
        if (urlValue) {
            filter.name = parsedURL ? parsedURL.displayName : urlValue;
        }
        else {
            filter.name = i18nString(UIStrings.other);
        }
        filter.parsedFilters.push({ key: FilterType.Url, text: urlValue, negative: false, regex: undefined });
        child = new URLGroupTreeElement(filter);
        if (urlValue) {
            child.tooltip = urlValue;
        }
        this.urlTreeElements.set(urlValue, child);
        this.appendChild(child);
        return child;
    }
}
//# sourceMappingURL=ConsoleSidebar.js.map