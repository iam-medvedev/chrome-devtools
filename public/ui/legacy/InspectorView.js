/*
 * Copyright (C) 2011 Google Inc. All rights reserved.
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
/* eslint-disable rulesdir/no-imperative-dom-api */
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Root from '../../core/root/root.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as IconButton from '../components/icon_button/icon_button.js';
import * as VisualLogging from '../visual_logging/visual_logging.js';
import { ActionRegistry } from './ActionRegistry.js';
import * as ARIAUtils from './ARIAUtils.js';
import { Dialog } from './Dialog.js';
import { DockController } from './DockController.js';
import { GlassPane } from './GlassPane.js';
import { Infobar } from './Infobar.js';
import inspectorViewTabbedPaneStyles from './inspectorViewTabbedPane.css.js';
import { KeyboardShortcut } from './KeyboardShortcut.js';
import { SplitWidget } from './SplitWidget.js';
import { Events as TabbedPaneEvents } from './TabbedPane.js';
import { ToolbarButton } from './Toolbar.js';
import { Tooltip } from './Tooltip.js';
import { ViewManager } from './ViewManager.js';
import { VBox, WidgetFocusRestorer } from './Widget.js';
const UIStrings = {
    /**
     *@description Title of more tabs button in inspector view
     */
    moreTools: 'More Tools',
    /**
     *@description Text that appears when hovor over the close button on the drawer view
     */
    closeDrawer: 'Close drawer',
    /**
     *@description The aria label for main tabbed pane that contains Panels
     */
    panels: 'Panels',
    /**
     *@description Title of an action that reloads the tab currently being debugged by DevTools
     */
    reloadDebuggedTab: 'Reload page',
    /**
     *@description Title of an action that reloads the DevTools
     */
    reloadDevtools: 'Reload DevTools',
    /**
     *@description Text for context menu action to move a tab to the main panel
     */
    moveToTop: 'Move to top',
    /**
     *@description Text for context menu action to move a tab to the drawer
     */
    moveToBottom: 'Move to bottom',
    /**
     * @description Text shown in a prompt to the user when DevTools is started and the
     * currently selected DevTools locale does not match Chrome's locale.
     * The placeholder is the current Chrome language.
     * @example {German} PH1
     */
    devToolsLanguageMissmatch: 'DevTools is now available in {PH1}',
    /**
     * @description An option the user can select when we notice that DevTools
     * is configured with a different locale than Chrome. This option means DevTools will
     * always try and display the DevTools UI in the same language as Chrome.
     */
    setToBrowserLanguage: 'Always match Chrome\'s language',
    /**
     * @description An option the user can select when DevTools notices that DevTools
     * is configured with a different locale than Chrome. This option means DevTools UI
     * will be switched to the language specified in the placeholder.
     * @example {German} PH1
     */
    setToSpecificLanguage: 'Switch DevTools to {PH1}',
    /**
     *@description The aria label for main toolbar
     */
    mainToolbar: 'Main toolbar',
    /**
     *@description The aria label for the drawer.
     */
    drawer: 'Tool drawer',
    /**
     *@description The aria label for the drawer shown.
     */
    drawerShown: 'Drawer shown',
    /**
     *@description The aria label for the drawer hidden.
     */
    drawerHidden: 'Drawer hidden',
    /**
     * @description Request for the user to select a local file system folder for DevTools
     * to store local overrides in.
     */
    selectOverrideFolder: 'Select a folder to store override files in',
    /**
     *@description Label for a button which opens a file picker.
     */
    selectFolder: 'Select folder',
    /**
     *@description Text that appears when hover the toggle orientation button
     */
    toggleDrawerOrientation: 'Toggle drawer orientation',
};
const str_ = i18n.i18n.registerUIStrings('ui/legacy/InspectorView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
let inspectorViewInstance = null;
export class InspectorView extends VBox {
    drawerSplitWidget;
    tabDelegate;
    drawerTabbedLocation;
    drawerTabbedPane;
    infoBarDiv;
    tabbedLocation;
    tabbedPane;
    keyDownBound;
    currentPanelLocked;
    focusRestorer;
    ownerSplitWidget;
    reloadRequiredInfobar;
    #selectOverrideFolderInfobar;
    #resizeObserver;
    #toggleOrientationButton;
    constructor() {
        super();
        GlassPane.setContainer(this.element);
        this.setMinimumSize(250, 72);
        // DevTools sidebar is a vertical split of panels tabbed pane and a drawer.
        this.drawerSplitWidget = new SplitWidget(false, true, 'inspector.drawer-split-view-state', 200, 200);
        this.drawerSplitWidget.hideSidebar();
        this.drawerSplitWidget.enableShowModeSaving();
        this.drawerSplitWidget.show(this.element);
        this.tabDelegate = new InspectorViewTabDelegate();
        // Create drawer tabbed pane.
        this.drawerTabbedLocation = ViewManager.instance().createTabbedLocation(this.showDrawer.bind(this, {
            focus: false,
            hasTargetDrawer: true,
        }), 'drawer-view', true, true);
        const moreTabsButton = this.drawerTabbedLocation.enableMoreTabsButton();
        moreTabsButton.setTitle(i18nString(UIStrings.moreTools));
        this.drawerTabbedPane = this.drawerTabbedLocation.tabbedPane();
        this.setDrawerMinimumSize();
        this.drawerTabbedPane.element.classList.add('drawer-tabbed-pane');
        this.drawerTabbedPane.element.setAttribute('jslog', `${VisualLogging.drawer()}`);
        const closeDrawerButton = new ToolbarButton(i18nString(UIStrings.closeDrawer), 'cross');
        closeDrawerButton.element.setAttribute('jslog', `${VisualLogging.close().track({ click: true })}`);
        closeDrawerButton.addEventListener("Click" /* ToolbarButton.Events.CLICK */, this.closeDrawer, this);
        this.#toggleOrientationButton = new ToolbarButton(i18nString(UIStrings.toggleDrawerOrientation), this.drawerSplitWidget.isVertical() ? 'dock-bottom' : 'dock-right');
        this.#toggleOrientationButton.element.setAttribute('jslog', `${VisualLogging.toggle().track({ click: true })}`);
        this.#toggleOrientationButton.element.setAttribute('jslogcontext', 'toggle-drawer-orientation');
        this.#toggleOrientationButton.addEventListener("Click" /* ToolbarButton.Events.CLICK */, this.toggleDrawerOrientation, this);
        this.drawerTabbedPane.addEventListener(TabbedPaneEvents.TabSelected, (event) => this.tabSelected(event.data.tabId), this);
        const selectedDrawerTab = this.drawerTabbedPane.selectedTabId;
        if (this.drawerSplitWidget.showMode() !== "OnlyMain" /* ShowMode.ONLY_MAIN */ && selectedDrawerTab) {
            Host.userMetrics.panelShown(selectedDrawerTab, true);
        }
        this.drawerTabbedPane.setTabDelegate(this.tabDelegate);
        const drawerElement = this.drawerTabbedPane.element;
        ARIAUtils.markAsComplementary(drawerElement);
        ARIAUtils.setLabel(drawerElement, i18nString(UIStrings.drawer));
        this.drawerSplitWidget.installResizer(this.drawerTabbedPane.headerElement());
        this.drawerSplitWidget.setSidebarWidget(this.drawerTabbedPane);
        if (Root.Runtime.experiments.isEnabled("vertical-drawer" /* Root.Runtime.ExperimentName.VERTICAL_DRAWER */)) {
            this.drawerTabbedPane.rightToolbar().appendToolbarItem(this.#toggleOrientationButton);
        }
        this.drawerTabbedPane.rightToolbar().appendToolbarItem(closeDrawerButton);
        this.drawerTabbedPane.headerElement().setAttribute('jslog', `${VisualLogging.toolbar('drawer').track({
            drag: true,
            keydown: 'ArrowUp|ArrowLeft|ArrowDown|ArrowRight|Enter|Space',
        })}`);
        // Create main area tabbed pane.
        this.tabbedLocation = ViewManager.instance().createTabbedLocation(Host.InspectorFrontendHost.InspectorFrontendHostInstance.bringToFront.bind(Host.InspectorFrontendHost.InspectorFrontendHostInstance), 'panel', true, true, Root.Runtime.Runtime.queryParam('panel'));
        this.tabbedPane = this.tabbedLocation.tabbedPane();
        this.tabbedPane.element.classList.add('main-tabbed-pane');
        // The 'Inspect element' and 'Device mode' buttons in the tabs toolbar takes longer to load than
        // the tabs themselves, so a space equal to the buttons' total width is preemptively allocated
        // to prevent to prevent a shift in the tab layout. Note that when DevTools cannot be docked,
        // the Device mode button is not added and so the allocated space is smaller.
        const allocatedSpace = Root.Runtime.conditions.canDock() ? '69px' : '41px';
        this.tabbedPane.leftToolbar().style.minWidth = allocatedSpace;
        this.tabbedPane.registerRequiredCSS(inspectorViewTabbedPaneStyles);
        this.tabbedPane.addEventListener(TabbedPaneEvents.TabSelected, (event) => this.tabSelected(event.data.tabId), this);
        const selectedTab = this.tabbedPane.selectedTabId;
        if (selectedTab) {
            Host.userMetrics.panelShown(selectedTab, true);
        }
        this.tabbedPane.setAccessibleName(i18nString(UIStrings.panels));
        this.tabbedPane.setTabDelegate(this.tabDelegate);
        const mainHeaderElement = this.tabbedPane.headerElement();
        ARIAUtils.markAsNavigation(mainHeaderElement);
        ARIAUtils.setLabel(mainHeaderElement, i18nString(UIStrings.mainToolbar));
        mainHeaderElement.setAttribute('jslog', `${VisualLogging.toolbar('main').track({
            drag: true,
            keydown: 'ArrowUp|ArrowLeft|ArrowDown|ArrowRight|Enter|Space',
        })}`);
        // Store the initial selected panel for use in launch histograms
        Host.userMetrics.setLaunchPanel(this.tabbedPane.selectedTabId);
        if (Host.InspectorFrontendHost.isUnderTest()) {
            this.tabbedPane.setAutoSelectFirstItemOnShow(false);
        }
        this.drawerSplitWidget.setMainWidget(this.tabbedPane);
        this.drawerSplitWidget.setDefaultFocusedChild(this.tabbedPane);
        this.keyDownBound = this.keyDown.bind(this);
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(Host.InspectorFrontendHostAPI.Events.ShowPanel, showPanel.bind(this));
        function showPanel({ data: panelName }) {
            void this.showPanel(panelName);
        }
        if (shouldShowLocaleInfobar()) {
            const infobar = createLocaleInfobar();
            infobar.setParentView(this);
            this.attachInfobar(infobar);
        }
        this.#resizeObserver = new ResizeObserver(this.#observedResize.bind(this));
    }
    static instance(opts = { forceNew: null }) {
        const { forceNew } = opts;
        if (!inspectorViewInstance || forceNew) {
            inspectorViewInstance = new InspectorView();
        }
        return inspectorViewInstance;
    }
    static maybeGetInspectorViewInstance() {
        return inspectorViewInstance;
    }
    static removeInstance() {
        inspectorViewInstance = null;
    }
    #observedResize() {
        const rect = this.element.getBoundingClientRect();
        this.element.style.setProperty('--devtools-window-left', `${rect.left}px`);
        this.element.style.setProperty('--devtools-window-right', `${window.innerWidth - rect.right}px`);
        this.element.style.setProperty('--devtools-window-width', `${rect.width}px`);
        this.element.style.setProperty('--devtools-window-top', `${rect.top}px`);
        this.element.style.setProperty('--devtools-window-bottom', `${window.innerHeight - rect.bottom}px`);
        this.element.style.setProperty('--devtools-window-height', `${rect.height}px`);
    }
    wasShown() {
        this.#resizeObserver.observe(this.element);
        this.#observedResize();
        this.element.ownerDocument.addEventListener('keydown', this.keyDownBound, false);
    }
    willHide() {
        this.#resizeObserver.unobserve(this.element);
        this.element.ownerDocument.removeEventListener('keydown', this.keyDownBound, false);
    }
    resolveLocation(locationName) {
        if (locationName === 'drawer-view') {
            return this.drawerTabbedLocation;
        }
        if (locationName === 'panel') {
            return this.tabbedLocation;
        }
        return null;
    }
    async createToolbars() {
        await this.tabbedPane.leftToolbar().appendItemsAtLocation('main-toolbar-left');
        await this.tabbedPane.rightToolbar().appendItemsAtLocation('main-toolbar-right');
    }
    addPanel(view) {
        this.tabbedLocation.appendView(view);
    }
    hasPanel(panelName) {
        return this.tabbedPane.hasTab(panelName);
    }
    async panel(panelName) {
        const view = ViewManager.instance().view(panelName);
        if (!view) {
            throw new Error(`Expected view for panel '${panelName}'`);
        }
        return await view.widget();
    }
    onSuspendStateChanged(allTargetsSuspended) {
        this.currentPanelLocked = allTargetsSuspended;
        this.tabbedPane.setCurrentTabLocked(this.currentPanelLocked);
        this.tabbedPane.leftToolbar().setEnabled(!this.currentPanelLocked);
        this.tabbedPane.rightToolbar().setEnabled(!this.currentPanelLocked);
    }
    canSelectPanel(panelName) {
        return !this.currentPanelLocked || this.tabbedPane.selectedTabId === panelName;
    }
    async showPanel(panelName) {
        await ViewManager.instance().showView(panelName);
    }
    setPanelWarnings(tabId, warnings) {
        // Find the tabbed location where the panel lives
        const tabbedPane = this.getTabbedPaneForTabId(tabId);
        if (tabbedPane) {
            let icon = null;
            if (warnings.length !== 0) {
                const warning = warnings.length === 1 ? warnings[0] : '· ' + warnings.join('\n· ');
                icon = IconButton.Icon.create('warning-filled', 'warning');
                Tooltip.install(icon, warning);
            }
            tabbedPane.setTrailingTabIcon(tabId, icon);
        }
    }
    emitDrawerChangeEvent(isDrawerOpen) {
        const evt = new CustomEvent("drawerchange" /* Events.DRAWER_CHANGE */, { bubbles: true, cancelable: true, detail: { isDrawerOpen } });
        document.body.dispatchEvent(evt);
    }
    getTabbedPaneForTabId(tabId) {
        // Tab exists in the main panel
        if (this.tabbedPane.hasTab(tabId)) {
            return this.tabbedPane;
        }
        // Tab exists in the drawer
        if (this.drawerTabbedPane.hasTab(tabId)) {
            return this.drawerTabbedPane;
        }
        // Tab is not open
        return null;
    }
    currentPanelDeprecated() {
        return (ViewManager.instance().materializedWidget(this.tabbedPane.selectedTabId || ''));
    }
    showDrawer({ focus, hasTargetDrawer }) {
        if (this.drawerTabbedPane.isShowing()) {
            return;
        }
        // Only auto-select the first drawer (console) when no drawer is chosen specifically.
        this.drawerTabbedPane.setAutoSelectFirstItemOnShow(!hasTargetDrawer);
        this.drawerSplitWidget.showBoth();
        if (focus) {
            this.focusRestorer = new WidgetFocusRestorer(this.drawerTabbedPane);
        }
        else {
            this.focusRestorer = null;
        }
        this.emitDrawerChangeEvent(true);
        ARIAUtils.LiveAnnouncer.alert(i18nString(UIStrings.drawerShown));
    }
    drawerVisible() {
        return this.drawerTabbedPane.isShowing();
    }
    closeDrawer() {
        if (!this.drawerTabbedPane.isShowing()) {
            return;
        }
        if (this.focusRestorer) {
            this.focusRestorer.restore();
        }
        this.drawerSplitWidget.hideSidebar(true);
        this.emitDrawerChangeEvent(false);
        ARIAUtils.LiveAnnouncer.alert(i18nString(UIStrings.drawerHidden));
    }
    toggleDrawerOrientation() {
        const drawerWillBeVertical = !this.drawerSplitWidget.isVertical();
        this.#toggleOrientationButton.setGlyph(drawerWillBeVertical ? 'dock-bottom' : 'dock-right');
        this.drawerSplitWidget.setVertical(drawerWillBeVertical);
        this.setDrawerMinimumSize();
    }
    setDrawerMinimumSize() {
        const drawerIsVertical = this.drawerSplitWidget.isVertical();
        if (drawerIsVertical) {
            // Set minimum size when the drawer is vertical to ensure the buttons will always be
            // visible during resizing.
            this.drawerTabbedPane.setMinimumSize(100, 27);
        }
        else {
            this.drawerTabbedPane.setMinimumSize(0, 27);
        }
    }
    setDrawerMinimized(minimized) {
        this.drawerSplitWidget.setSidebarMinimized(minimized);
        this.drawerSplitWidget.setResizable(!minimized);
    }
    drawerSize() {
        return this.drawerSplitWidget.sidebarSize();
    }
    setDrawerSize(size) {
        this.drawerSplitWidget.setSidebarSize(size);
    }
    totalSize() {
        return this.drawerSplitWidget.totalSize();
    }
    isDrawerMinimized() {
        return this.drawerSplitWidget.isSidebarMinimized();
    }
    keyDown(event) {
        const keyboardEvent = event;
        if (!KeyboardShortcut.eventHasCtrlEquivalentKey(keyboardEvent) || keyboardEvent.altKey || keyboardEvent.shiftKey) {
            return;
        }
        // Ctrl/Cmd + 1-9 should show corresponding panel.
        const panelShortcutEnabled = Common.Settings.moduleSetting('shortcut-panel-switch').get();
        if (panelShortcutEnabled) {
            let panelIndex = -1;
            if (keyboardEvent.keyCode > 0x30 && keyboardEvent.keyCode < 0x3A) {
                panelIndex = keyboardEvent.keyCode - 0x31;
            }
            else if (keyboardEvent.keyCode > 0x60 && keyboardEvent.keyCode < 0x6A &&
                keyboardEvent.location === KeyboardEvent.DOM_KEY_LOCATION_NUMPAD) {
                panelIndex = keyboardEvent.keyCode - 0x61;
            }
            if (panelIndex !== -1) {
                const panelName = this.tabbedPane.tabIds()[panelIndex];
                if (panelName) {
                    if (!Dialog.hasInstance() && !this.currentPanelLocked) {
                        void this.showPanel(panelName);
                        void VisualLogging.logKeyDown(null, event, `panel-by-index-${panelName}`);
                    }
                    event.consume(true);
                }
            }
        }
    }
    onResize() {
        GlassPane.containerMoved(this.element);
    }
    topResizerElement() {
        return this.tabbedPane.headerElement();
    }
    toolbarItemResized() {
        this.tabbedPane.headerResized();
    }
    tabSelected(tabId) {
        Host.userMetrics.panelShown(tabId);
    }
    setOwnerSplit(splitWidget) {
        this.ownerSplitWidget = splitWidget;
    }
    ownerSplit() {
        return this.ownerSplitWidget || null;
    }
    minimize() {
        if (this.ownerSplitWidget) {
            this.ownerSplitWidget.setSidebarMinimized(true);
        }
    }
    restore() {
        if (this.ownerSplitWidget) {
            this.ownerSplitWidget.setSidebarMinimized(false);
        }
    }
    displayDebuggedTabReloadRequiredWarning(message) {
        if (!this.reloadRequiredInfobar) {
            const infobar = new Infobar("info" /* InfobarType.INFO */, message, [
                {
                    text: i18nString(UIStrings.reloadDebuggedTab),
                    delegate: () => {
                        reloadDebuggedTab();
                        this.removeDebuggedTabReloadRequiredWarning();
                    },
                    dismiss: false,
                    buttonVariant: "primary" /* Buttons.Button.Variant.PRIMARY */,
                    jslogContext: 'main.debug-reload',
                },
            ], undefined, 'reload-required');
            infobar.setParentView(this);
            this.attachInfobar(infobar);
            this.reloadRequiredInfobar = infobar;
            infobar.setCloseCallback(() => {
                delete this.reloadRequiredInfobar;
            });
            SDK.TargetManager.TargetManager.instance().addModelListener(SDK.ResourceTreeModel.ResourceTreeModel, SDK.ResourceTreeModel.Events.PrimaryPageChanged, this.removeDebuggedTabReloadRequiredWarning, this);
        }
    }
    removeDebuggedTabReloadRequiredWarning() {
        if (this.reloadRequiredInfobar) {
            this.reloadRequiredInfobar.dispose();
            SDK.TargetManager.TargetManager.instance().removeModelListener(SDK.ResourceTreeModel.ResourceTreeModel, SDK.ResourceTreeModel.Events.PrimaryPageChanged, this.removeDebuggedTabReloadRequiredWarning, this);
        }
    }
    displayReloadRequiredWarning(message) {
        if (!this.reloadRequiredInfobar) {
            const infobar = new Infobar("info" /* InfobarType.INFO */, message, [
                {
                    text: i18nString(UIStrings.reloadDevtools),
                    delegate: () => reloadDevTools(),
                    dismiss: false,
                    buttonVariant: "primary" /* Buttons.Button.Variant.PRIMARY */,
                    jslogContext: 'main.debug-reload',
                },
            ], undefined, 'reload-required');
            infobar.setParentView(this);
            this.attachInfobar(infobar);
            this.reloadRequiredInfobar = infobar;
            infobar.setCloseCallback(() => {
                delete this.reloadRequiredInfobar;
            });
        }
    }
    displaySelectOverrideFolderInfobar(callback) {
        if (!this.#selectOverrideFolderInfobar) {
            const infobar = new Infobar("info" /* InfobarType.INFO */, i18nString(UIStrings.selectOverrideFolder), [
                {
                    text: i18nString(UIStrings.selectFolder),
                    delegate: () => callback(),
                    dismiss: true,
                    buttonVariant: "tonal" /* Buttons.Button.Variant.TONAL */,
                    jslogContext: 'select-folder',
                },
            ], undefined, 'select-override-folder');
            infobar.setParentView(this);
            this.attachInfobar(infobar);
            this.#selectOverrideFolderInfobar = infobar;
            infobar.setCloseCallback(() => {
                this.#selectOverrideFolderInfobar = undefined;
            });
        }
    }
    createInfoBarDiv() {
        if (!this.infoBarDiv) {
            this.infoBarDiv = document.createElement('div');
            this.infoBarDiv.classList.add('flex-none');
            this.contentElement.insertBefore(this.infoBarDiv, this.contentElement.firstChild);
        }
    }
    attachInfobar(infobar) {
        this.createInfoBarDiv();
        this.infoBarDiv?.appendChild(infobar.element);
    }
}
function getDisableLocaleInfoBarSetting() {
    return Common.Settings.Settings.instance().createSetting('disable-locale-info-bar', false);
}
function shouldShowLocaleInfobar() {
    if (getDisableLocaleInfoBarSetting().get()) {
        return false;
    }
    // If the language setting is different than 'en-US', the user already
    // used the setting before, so don't show the toolbar.
    const languageSettingValue = Common.Settings.Settings.instance().moduleSetting('language').get();
    if (languageSettingValue !== 'en-US') {
        return false;
    }
    // When the selected DevTools locale differs from the locale of the browser UI, we want to notify
    // users only once, that they have the opportunity to adjust DevTools locale to match Chrome's locale.
    return !i18n.DevToolsLocale.localeLanguagesMatch(navigator.language, languageSettingValue) &&
        i18n.DevToolsLocale.DevToolsLocale.instance().languageIsSupportedByDevTools(navigator.language);
}
function createLocaleInfobar() {
    const devtoolsLocale = i18n.DevToolsLocale.DevToolsLocale.instance();
    const closestSupportedLocale = devtoolsLocale.lookupClosestDevToolsLocale(navigator.language);
    const locale = new Intl.Locale(closestSupportedLocale);
    const closestSupportedLanguageInCurrentLocale = new Intl.DisplayNames([devtoolsLocale.locale], { type: 'language' }).of(locale.language || 'en') || 'English';
    const languageSetting = Common.Settings.Settings.instance().moduleSetting('language');
    return new Infobar("info" /* InfobarType.INFO */, i18nString(UIStrings.devToolsLanguageMissmatch, { PH1: closestSupportedLanguageInCurrentLocale }), [
        {
            text: i18nString(UIStrings.setToBrowserLanguage),
            delegate: () => {
                languageSetting.set('browserLanguage');
                getDisableLocaleInfoBarSetting().set(true);
                reloadDevTools();
            },
            dismiss: true,
            jslogContext: 'set-to-browser-language',
        },
        {
            text: i18nString(UIStrings.setToSpecificLanguage, { PH1: closestSupportedLanguageInCurrentLocale }),
            delegate: () => {
                languageSetting.set(closestSupportedLocale);
                getDisableLocaleInfoBarSetting().set(true);
                reloadDevTools();
            },
            dismiss: true,
            jslogContext: 'set-to-specific-language',
        },
    ], getDisableLocaleInfoBarSetting(), 'language-mismatch');
}
function reloadDevTools() {
    if (DockController.instance().canDock() && DockController.instance().dockSide() === "undocked" /* DockState.UNDOCKED */) {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.setIsDocked(true, function () { });
    }
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.reattach(() => window.location.reload());
}
function reloadDebuggedTab() {
    void ActionRegistry.instance().getAction('inspector-main.reload').execute();
}
export class ActionDelegate {
    handleAction(_context, actionId) {
        switch (actionId) {
            case 'main.toggle-drawer':
                if (InspectorView.instance().drawerVisible()) {
                    InspectorView.instance().closeDrawer();
                }
                else {
                    InspectorView.instance().showDrawer({
                        focus: true,
                        hasTargetDrawer: false,
                    });
                }
                return true;
            case 'main.toggle-drawer-orientation':
                if (Root.Runtime.experiments.isEnabled("vertical-drawer" /* Root.Runtime.ExperimentName.VERTICAL_DRAWER */)) {
                    InspectorView.instance().toggleDrawerOrientation();
                }
                return true;
            case 'main.next-tab':
                InspectorView.instance().tabbedPane.selectNextTab();
                InspectorView.instance().tabbedPane.focus();
                return true;
            case 'main.previous-tab':
                InspectorView.instance().tabbedPane.selectPrevTab();
                InspectorView.instance().tabbedPane.focus();
                return true;
        }
        return false;
    }
}
export class InspectorViewTabDelegate {
    closeTabs(tabbedPane, ids) {
        tabbedPane.closeTabs(ids, true);
    }
    moveToDrawer(tabId) {
        Host.userMetrics.actionTaken(Host.UserMetrics.Action.TabMovedToDrawer);
        ViewManager.instance().moveView(tabId, 'drawer-view');
    }
    moveToMainPanel(tabId) {
        Host.userMetrics.actionTaken(Host.UserMetrics.Action.TabMovedToMainPanel);
        ViewManager.instance().moveView(tabId, 'panel');
    }
    onContextMenu(tabId, contextMenu) {
        // Special case for console, we don't show the movable context panel for this two tabs
        if (tabId === 'console' || tabId === 'console-view') {
            return;
        }
        const locationName = ViewManager.instance().locationNameForViewId(tabId);
        if (locationName === 'drawer-view') {
            contextMenu.defaultSection().appendItem(i18nString(UIStrings.moveToTop), this.moveToMainPanel.bind(this, tabId), { jslogContext: 'move-to-top' });
        }
        else {
            contextMenu.defaultSection().appendItem(i18nString(UIStrings.moveToBottom), this.moveToDrawer.bind(this, tabId), { jslogContext: 'move-to-bottom' });
        }
    }
}
//# sourceMappingURL=InspectorView.js.map