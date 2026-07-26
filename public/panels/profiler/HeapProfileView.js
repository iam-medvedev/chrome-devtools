// Copyright 2016 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../ui/components/icon_button/icon_button.js';
import '../../ui/legacy/components/data_grid/data_grid.js';
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Bindings from '../../models/bindings/bindings.js';
import * as CPUProfile from '../../models/cpu_profile/cpu_profile.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as PerfUI from '../../ui/legacy/components/perf_ui/perf_ui.js';
import * as SettingsUI from '../../ui/legacy/components/settings_ui/settings_ui.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
import * as UI from '../../ui/legacy/legacy.js';
import { Directives, html, nothing, render } from '../../ui/lit/lit.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import { BottomUpProfileDataGridTree } from './BottomUpProfileDataGrid.js';
import { HeapTimelineOverview } from './HeapTimelineOverview.js';
import { ProfileDataGridTree } from './ProfileDataGrid.js';
import { ProfileFlameChart, ProfileFlameChartDataProvider } from './ProfileFlameChartDataProvider.js';
import { ProfileType } from './ProfileHeader.js';
import profilesPanelStyles from './profilesPanel.css.js';
import { TopDownProfileDataGridTree } from './TopDownProfileDataGrid.js';
import { WritableProfileHeader } from './WritableProfileHeader.js';
const { repeat, ref } = Directives;
const { widget, widgetRef } = UI.Widget;
const UIStrings = {
    /**
     * @description The reported total size used in the selected time frame of the allocation sampling profile
     * @example {3 MB} PH1
     */
    selectedSizeS: 'Selected size: {PH1}',
    /**
     * @description Name of column header that reports the size (in terms of bytes) used for a particular part of the heap, excluding the size of the children nodes of this part of the heap
     */
    selfSizeBytes: 'Self size',
    /**
     * @description Name of column header that reports the total size (in terms of bytes) used for a particular part of the heap
     */
    totalSizeBytes: 'Total size',
    /**
     * @description Button text to stop profiling the heap
     */
    stopHeapProfiling: 'Stop heap profiling',
    /**
     * @description Button text to start profiling the heap
     */
    startHeapProfiling: 'Start heap profiling',
    /**
     * @description Progress update that the profiler is recording the contents of the heap
     */
    recording: 'Recording…',
    /**
     * @description Icon title in Heap Profile View of a profiler tool
     */
    heapProfilerIsRecording: 'Heap profiler is recording',
    /**
     * @description Progress update that the profiler is in the process of stopping its recording of the heap
     */
    stopping: 'Stopping…',
    /**
     * @description Sampling category to only profile allocations happening on the heap
     */
    allocationSampling: 'Allocation sampling',
    /**
     * @description The title for the collection of profiles that are gathered from various snapshots of the heap, using a sampling (e.g. every 1/100) technique.
     */
    samplingProfiles: 'Sampling profiles',
    /**
     * @description Description in Heap Profile View of a profiler tool
     */
    recordMemoryAllocations: 'Approximate memory allocations by sampling long operations with minimal overhead and get a breakdown by JavaScript execution stack',
    /**
     * @description Name of a profile
     * @example {2} PH1
     */
    profileD: 'Profile {PH1}',
    /**
     * @description Accessible text for the value in bytes in memory allocation or coverage view.
     * @example {12345} PH1
     */
    sBytes: '{PH1} bytes',
    /**
     * @description Text in CPUProfile View of a profiler tool
     * @example {21.33} PH1
     */
    formatPercent: '{PH1} %',
    /**
     * @description The formatted size in kilobytes, abbreviated to kB
     * @example {1,021} PH1
     */
    skb: '{PH1} kB',
    /**
     * @description Text for the name of something
     */
    name: 'Name',
    /**
     * @description Tooltip of a cell that reports the size used for a particular part of the heap, excluding the size of the children nodes of this part of the heap
     */
    selfSize: 'Self size',
    /**
     * @description Tooltip of a cell that reports the total size used for a particular part of the heap
     */
    totalSize: 'Total size',
    /**
     * @description Text for web URLs
     */
    url: 'URL',
    /**
     * @description Label for a checkbox in the memory panel to enable sampling heap profiler timeline.
     */
    samplingHeapProfilerTimeline: 'Sampling heap profiler timeline',
    /**
     * @description Text in Profile View of a profiler tool
     */
    profile: 'Profile',
    /**
     * @description Placeholder text in the search box of the JavaScript profiler tool. Users can search
     *the results by the cost in milliseconds, the name of the function, or the file name.
     */
    findByCostMsNameOrFile: 'Find by cost (>50ms), name or file',
    /**
     * @description Text for a programming function
     */
    function: 'Function',
    /**
     * @description Title of the Profiler tool
     */
    profiler: 'Profiler',
    /**
     * @description Aria-label for profiles view combobox in memory tool
     */
    profileViewMode: 'Profile view mode',
    /**
     * @description Tooltip text that appears when hovering over the largeicon visibility button in the Profile View of a profiler tool
     */
    focusSelectedFunction: 'Focus selected function',
    /**
     * @description Tooltip text that appears when hovering over the largeicon delete button in the Profile View of a profiler tool
     */
    excludeSelectedFunction: 'Exclude selected function',
    /**
     * @description Tooltip text that appears when hovering over the largeicon refresh button in the Profile View of a profiler tool
     */
    restoreAllFunctions: 'Restore all functions',
    /**
     * @description Text in Profile View of a profiler tool
     */
    chart: 'Chart',
    /**
     * @description Text in Profile View of a profiler tool
     */
    heavyBottomUp: 'Heavy (Bottom Up)',
    /**
     * @description Text for selecting different profile views in the JS profiler tool. This option is a tree view.
     */
    treeTopDown: 'Tree (Top Down)',
    /**
     * @description Tooltip to alert developers that some parts of code in execution were not optimized.
     * @example {Optimized too many times} PH1
     */
    notOptimizedS: 'Not optimized: {PH1}',
};
const str_ = i18n.i18n.registerUIStrings('panels/profiler/HeapProfileView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
function convertToSamplingHeapProfile(profileHeader) {
    return (profileHeader.profile || profileHeader.protocolProfile());
}
export const maxLinkLength = 30;
export const DEFAULT_VIEW = (input, output, target) => {
    const { searchableView, dataProvider } = input;
    // clang-format off
    render(html `
    ${input.hasTemporaryView ? html `
      <devtools-widget ${widget(() => input.timelineOverview)}></devtools-widget>` : nothing}
    <devtools-widget ${widget(element => {
        const searchableViewWidget = new UI.SearchableView.SearchableView(input.searchable, null, undefined, element);
        searchableViewWidget.setPlaceholder(i18nString(UIStrings.findByCostMsNameOrFile));
        return searchableViewWidget;
    })}
      ${widgetRef(UI.SearchableView.SearchableView, input.onSearchableViewMount)}>
      ${input.viewType === "Flame" /* ViewTypes.FLAME */ && searchableView && dataProvider ? html `
          <devtools-widget
            autofocus
            ${widget((e) => new ProfileFlameChart(searchableView, dataProvider, e), { range: input.range })}
            @EntryInvoked=${(e) => input.onFlameChartEntryInvoked(e.detail)}
            ${widgetRef(ProfileFlameChart, widget => {
        output.performSearch = widget.performSearch.bind(widget);
        output.jumpToNextSearchResult = widget.jumpToNextSearchResult.bind(widget);
        output.jumpToPreviousSearchResult = widget.jumpToPreviousSearchResult.bind(widget);
        output.onSearchCanceled = widget.onSearchCanceled.bind(widget);
    })}>
          </devtools-widget>`
        : input.profileDataGridTree ? html `
          <div class="data-grid-target vbox flex-auto">${renderDataGrid(input)}</div>`
            : nothing}
    </devtools-widget>`, target);
    // clang-format on
};
function renderDataGrid(input) {
    if (!input.profileDataGridTree) {
        return nothing;
    }
    let highlightIndex = -1;
    if (input.profileDataGridTree && input.profileDataGridTree.searchResults) {
        highlightIndex = input.profileDataGridTree.searchResultIndex + 1;
    }
    // clang-format off
    return html `
    <style>${profilesPanelStyles}</style>
    <devtools-data-grid class="flex-auto" name=${i18nString(UIStrings.profiler)} striped autofocus resize="last"
                        highlight=${highlightIndex >= 1 ? highlightIndex : nothing}
                        @deselect=${input.onDeselect} .template=${html `
      <style>${profilesPanelStyles}</style>
      <table>
        <tr>
          <th id="self" width="120px" fixed weight="1" sortable sort="descending">
            ${input.columnHeader('self')}
          </th>
          <th id="total" width="120px" fixed weight="1" sortable>
            ${input.columnHeader('total')}
          </th>
          <th id="function" weight="3" sortable disclosure>
            ${i18nString(UIStrings.function)}
          </th>
        </tr>
        ${repeat(input.profileDataGridTree.children, (node) => node.callUID, (node) => renderNode(node, input))}
      </table>`}>
    </devtools-data-grid>`;
    // clang-format on
}
function renderNode(node, input) {
    const onSelect = () => {
        input.onSelect(node);
    };
    const onContextMenu = (event) => {
        input.onContextMenu(event, node);
    };
    const onExpand = () => {
        input.onExpand(node);
    };
    const onCollapse = () => {
        input.onCollapse(node);
    };
    // clang-format off
    return html `
  <tr data-uid=${node.callUID} ?selected=${input.selectedNode === node} ?expanded=${node.expanded}
      ?highlighted=${node.searchMatchedSelfColumn || node.searchMatchedTotalColumn || node.searchMatchedFunctionColumn}
      @select=${onSelect}
      @contextmenu=${onContextMenu}
      @expand=${onExpand} @collapse=${onCollapse}>
    <td data-value=${node.self} class="numeric-column ${node.searchMatchedSelfColumn ? 'highlight' : ''}"
        aria-label=${`${input.nodeFormatter.formatValueAccessibleText(node.self, node)}, ${input.nodeFormatter.formatPercent(node.selfPercent, node)}`}>
      <div class="profile-multiple-values">
        <span>${input.nodeFormatter.formatValue(node.self, node)}</span>
        <span class="percent-column">${input.nodeFormatter.formatPercent(node.selfPercent, node)}</span>
      </div>
    </td>
    <td data-value=${node.total} class="numeric-column ${node.searchMatchedTotalColumn ? 'highlight' : ''}"
        aria-label=${`${input.nodeFormatter.formatValueAccessibleText(node.total, node)}, ${input.nodeFormatter.formatPercent(node.totalPercent, node)}`}>
      <div class="profile-multiple-values">
        <span>${input.nodeFormatter.formatValue(node.total, node)}</span>
        <span class="percent-column">${input.nodeFormatter.formatPercent(node.totalPercent, node)}</span>
      </div>
    </td>
    <td data-value=${node.functionName} class="${node.searchMatchedFunctionColumn ? 'highlight' : ''} ${node.deoptReason ? 'not-optimized' : ''}">
      ${node.deoptReason ? html `
        <devtools-icon name="warning-filled" class="profile-warn-marker small"
                        title=${i18nString(UIStrings.notOptimizedS, { PH1: node.deoptReason })}>
        </devtools-icon>` : nothing}
      ${node.functionName}
      ${node.profileNode.scriptId !== '0' && node.profileNode.callFrame ? widget(Components.Linkifier.ScriptLocationLink, {
        target: input.target ?? undefined,
        scriptId: node.profileNode.callFrame.scriptId,
        sourceURL: node.profileNode.callFrame.url,
        lineNumber: node.profileNode.callFrame.lineNumber,
        options: {
            columnNumber: node.profileNode.callFrame.columnNumber,
            maxLength: maxLinkLength,
            className: 'profile-node-file',
        },
    }) : nothing}
    </td>
    ${node.hasChildren() ? html `
      <td><table>
        ${node.expanded ? html `${repeat(node.children, child => child.callUID, child => renderNode(child, input))}` : nothing}
      </table></td>` : nothing}
  </tr>`;
    // clang-format on
}
export class HeapProfileView extends UI.View.SimpleView {
    profileHeader;
    profileType;
    adjustedTotal;
    selectedSizeText;
    timestamps = [];
    sizes = [];
    max = [];
    ordinals = [];
    totalTime = 0;
    lastOrdinal = 0;
    timelineOverview = new HeapTimelineOverview();
    profileInternal = null;
    searchableViewInternal;
    viewSelectComboBox;
    focusButton;
    excludeButton;
    resetButton;
    #selectedNode = null;
    linkifierInternal = new Components.Linkifier.Linkifier(maxLinkLength);
    viewType;
    bottomUpProfileDataGridTree;
    topDownProfileDataGridTree;
    currentSearchResultIndex;
    dataProvider;
    profileDataGridTree;
    #isNodeSelected = false;
    #view;
    #viewOutput = {};
    #isResetEnabled = false;
    #selectedSize = null;
    #minId = null;
    #maxId = null;
    #range;
    #lastAppliedRange = null;
    #lastAppliedViewType = null;
    constructor(profileHeader, view = DEFAULT_VIEW) {
        super({
            title: i18nString(UIStrings.profile),
            viewId: 'profile',
        });
        this.#view = view;
        this.profileHeader = profileHeader;
        this.profileType = profileHeader.profileType();
        this.initialize();
        const profile = new SamplingHeapProfileModel(convertToSamplingHeapProfile(profileHeader));
        this.adjustedTotal = profile.total;
        this.setProfile(profile);
        this.#setupTimelineOverview();
    }
    #setupTimelineOverview() {
        if (this.profileType.hasTemporaryView()) {
            this.timelineOverview.addEventListener("IdsRangeChanged" /* Events.IDS_RANGE_CHANGED */, this.onIdsRangeChanged.bind(this));
            this.timelineOverview.start();
            this.profileType.addEventListener("StatsUpdate" /* SamplingHeapProfileType.Events.STATS_UPDATE */, this.onStatsUpdate, this);
            void this.profileType.once("profile-complete" /* ProfileEvents.PROFILE_COMPLETE */).then(() => {
                this.profileType.removeEventListener("StatsUpdate" /* SamplingHeapProfileType.Events.STATS_UPDATE */, this.onStatsUpdate, this);
                this.timelineOverview.stop();
                this.timelineOverview.updateGrid();
            });
        }
    }
    async toolbarItems() {
        const currentViewType = this.viewType.get();
        const isFlame = currentViewType === "Flame" /* ViewTypes.FLAME */;
        // clang-format off
        return html `
      <select title=${i18nString(UIStrings.profileViewMode)} aria-label=${i18nString(UIStrings.profileViewMode)}
              @change=${this.changeView.bind(this)}
              jslog=${VisualLogging.dropDown('profile-view.selected-view').track({ change: true })}
              ${ref(e => { this.viewSelectComboBox = e; })}>
        <option value=${"Flame" /* ViewTypes.FLAME */} ?selected=${currentViewType === "Flame" /* ViewTypes.FLAME */}>
          ${i18nString(UIStrings.chart)}
        </option>
        <option value=${"Heavy" /* ViewTypes.HEAVY */} ?selected=${currentViewType === "Heavy" /* ViewTypes.HEAVY */}>
          ${i18nString(UIStrings.heavyBottomUp)}
        </option>
        <option value=${"Tree" /* ViewTypes.TREE */} ?selected=${currentViewType === "Tree" /* ViewTypes.TREE */}>
          ${i18nString(UIStrings.treeTopDown)}
        </option>
      </select>
      <devtools-button .data=${{
            iconName: 'eye',
            variant: "toolbar" /* Buttons.Button.Variant.TOOLBAR */,
            title: i18nString(UIStrings.focusSelectedFunction),
            jslogContext: 'profile-view.focus-selected-function',
            disabled: !this.#isNodeSelected,
        }}
                       @click=${this.focusClicked.bind(this)}
                       ?hidden=${isFlame}
                       ${ref(e => { this.focusButton = e; })}>
      </devtools-button>
      <devtools-button .data=${{
            iconName: 'cross',
            variant: "toolbar" /* Buttons.Button.Variant.TOOLBAR */,
            title: i18nString(UIStrings.excludeSelectedFunction),
            jslogContext: 'profile-view.exclude-selected-function',
            disabled: !this.#isNodeSelected,
        }}
                       @click=${this.excludeClicked.bind(this)}
                       ?hidden=${isFlame}
                       ${ref(e => { this.excludeButton = e; })}>
      </devtools-button>
      <devtools-button .data=${{
            iconName: 'refresh',
            variant: "toolbar" /* Buttons.Button.Variant.TOOLBAR */,
            title: i18nString(UIStrings.restoreAllFunctions),
            jslogContext: 'profile-view.restore-all-functions',
            disabled: !this.#isResetEnabled,
        }}
                       @click=${this.resetClicked.bind(this)}
                       ?hidden=${isFlame}
                       ${ref(e => { this.resetButton = e; })}>
        </devtools-button>
      <span ${ref(e => { this.selectedSizeText = e; })}>
        ${this.#selectedSize !== null ?
            i18nString(UIStrings.selectedSizeS, { PH1: i18n.ByteUtilities.bytesToString(this.#selectedSize) })
            : nothing}
      </span>`;
        // clang-format on
    }
    onIdsRangeChanged(event) {
        const { minId, maxId } = event.data;
        this.#selectedSize = event.data.size;
        this.#minId = minId;
        this.#maxId = maxId;
        this.performUpdate();
    }
    setSelectionRange(minId, maxId) {
        const profileData = convertToSamplingHeapProfile((this.profileHeader));
        const profile = new SamplingHeapProfileModel(profileData, minId, maxId);
        this.adjustedTotal = profile.total;
        this.setProfile(profile);
    }
    onStatsUpdate(event) {
        const profile = event.data;
        if (!this.totalTime) {
            this.timestamps = [];
            this.sizes = [];
            this.max = [];
            this.ordinals = [];
            this.totalTime = 30000;
            this.lastOrdinal = 0;
        }
        this.sizes.fill(0);
        this.sizes.push(0);
        this.timestamps.push(Date.now());
        this.ordinals.push(this.lastOrdinal + 1);
        for (const sample of profile?.samples ?? []) {
            this.lastOrdinal = Math.max(this.lastOrdinal, sample.ordinal);
            const bucket = Platform.ArrayUtilities.upperBound(this.ordinals, sample.ordinal, Platform.ArrayUtilities.DEFAULT_COMPARATOR) -
                1;
            this.sizes[bucket] += sample.size;
        }
        this.max.push(this.sizes[this.sizes.length - 1]);
        const lastTimestamp = this.timestamps[this.timestamps.length - 1];
        if (lastTimestamp - this.timestamps[0] > this.totalTime) {
            this.totalTime *= 2;
        }
        this.performUpdate();
    }
    columnHeader(columnId) {
        switch (columnId) {
            case 'self':
                return i18nString(UIStrings.selfSizeBytes);
            case 'total':
                return i18nString(UIStrings.totalSizeBytes);
        }
        return Common.UIString.LocalizedEmptyString;
    }
    createFlameChartDataProvider() {
        return new HeapFlameChartDataProvider(this.profile(), this.profileHeader.heapProfilerModel());
    }
    static buildPopoverTable(popoverInfo) {
        return html `<table>
      ${popoverInfo.map(entry => html `
        <tr>
          <td>${entry.title}</td>
          <td>${entry.value}</td>
        </tr>
      `)}
    </table>`;
    }
    setProfile(profile) {
        this.profileInternal = profile;
        this.bottomUpProfileDataGridTree = null;
        this.topDownProfileDataGridTree = null;
        this.changeView();
        this.refresh();
    }
    profile() {
        return this.profileInternal;
    }
    initialize() {
        this.viewType = Common.Settings.Settings.instance().createSetting('profile-view', "Heavy" /* ViewTypes.HEAVY */);
        this.changeView();
    }
    selectRange(timeLeft, timeRight) {
        this.#range = { left: timeLeft, right: timeRight };
        this.performUpdate();
    }
    getBottomUpProfileDataGridTree() {
        if (!this.searchableViewInternal) {
            return undefined;
        }
        if (!this.bottomUpProfileDataGridTree) {
            this.bottomUpProfileDataGridTree = new BottomUpProfileDataGridTree(nodeFormatter, this.searchableViewInternal, this.profileInternal.root, this.adjustedTotal);
        }
        return this.bottomUpProfileDataGridTree;
    }
    getTopDownProfileDataGridTree() {
        if (!this.searchableViewInternal) {
            return undefined;
        }
        if (!this.topDownProfileDataGridTree) {
            this.topDownProfileDataGridTree = new TopDownProfileDataGridTree(nodeFormatter, this.searchableViewInternal, this.profileInternal.root, this.adjustedTotal);
        }
        return this.topDownProfileDataGridTree;
    }
    populateContextMenu(contextMenu, node) {
        const heapProfilerModel = this.profileHeader.heapProfilerModel();
        const target = heapProfilerModel ? heapProfilerModel.target() : null;
        const tempLinkifier = new Components.Linkifier.Linkifier();
        const linkElement = tempLinkifier.maybeLinkifyConsoleCallFrame(target, node.profileNode.callFrame);
        if (linkElement) {
            contextMenu.appendApplicableItems(linkElement);
        }
        tempLinkifier.dispose();
    }
    willHide() {
        super.willHide();
        this.currentSearchResultIndex = -1;
    }
    refresh() {
        if (!this.profileDataGridTree) {
            return;
        }
        this.performUpdate();
    }
    refreshVisibleData() {
        this.performUpdate();
    }
    searchableView() {
        return this.searchableViewInternal || null;
    }
    supportsCaseSensitiveSearch() {
        return true;
    }
    supportsWholeWordSearch() {
        return false;
    }
    supportsRegexSearch() {
        return false;
    }
    onSearchCanceled() {
        if (this.viewType.get() === "Flame" /* ViewTypes.FLAME */) {
            this.#viewOutput.onSearchCanceled?.();
        }
        else if (this.profileDataGridTree) {
            this.profileDataGridTree.onSearchCanceled();
        }
        this.refresh();
    }
    performSearch(searchConfig, shouldJump, jumpBackwards) {
        if (this.viewType.get() !== "Flame" /* ViewTypes.FLAME */ && this.profileDataGridTree) {
            // 1. Delegate to model to find ALL matches (including virtualized ones) using complex query logic
            this.profileDataGridTree.performSearch(searchConfig, shouldJump, jumpBackwards);
            // 2. Guarantee Deep Matches: Expand ancestors of matching nodes if deep search is on
            if (this.profileDataGridTree.deepSearch) {
                for (const match of this.profileDataGridTree.searchResults) {
                    let parent = match.profileNode.parent;
                    while (parent && !(parent instanceof ProfileDataGridTree)) {
                        parent.expanded = true;
                        parent = parent.parent;
                    }
                }
            }
            this.refresh();
        }
        else if (this.viewType.get() === "Flame" /* ViewTypes.FLAME */) {
            this.#viewOutput.performSearch?.(searchConfig, shouldJump, jumpBackwards);
            this.refresh();
        }
    }
    jumpToNextSearchResult() {
        if (this.viewType.get() !== "Flame" /* ViewTypes.FLAME */ && this.profileDataGridTree) {
            if (!this.profileDataGridTree.searchResults?.length) {
                return;
            }
            this.profileDataGridTree.searchResultIndex =
                (this.profileDataGridTree.searchResultIndex + 1) % this.profileDataGridTree.searchResults.length;
            this.searchableViewInternal.updateCurrentMatchIndex(this.profileDataGridTree.searchResultIndex);
            this.refresh();
        }
        else if (this.viewType.get() === "Flame" /* ViewTypes.FLAME */) {
            this.#viewOutput.jumpToNextSearchResult?.();
        }
    }
    jumpToPreviousSearchResult() {
        if (this.viewType.get() !== "Flame" /* ViewTypes.FLAME */ && this.profileDataGridTree) {
            if (!this.profileDataGridTree.searchResults?.length) {
                return;
            }
            this.profileDataGridTree.searchResultIndex =
                (this.profileDataGridTree.searchResultIndex - 1 + this.profileDataGridTree.searchResults.length) %
                    this.profileDataGridTree.searchResults.length;
            this.searchableViewInternal.updateCurrentMatchIndex(this.profileDataGridTree.searchResultIndex);
            this.refresh();
        }
        else if (this.viewType.get() === "Flame" /* ViewTypes.FLAME */) {
            this.#viewOutput.jumpToPreviousSearchResult?.();
        }
    }
    linkifier() {
        return this.linkifierInternal;
    }
    ensureFlameChartCreated() {
        if (this.dataProvider || !this.searchableViewInternal) {
            return;
        }
        this.dataProvider = this.createFlameChartDataProvider();
    }
    async onEntryInvoked(entryIndex) {
        if (!this.dataProvider) {
            return;
        }
        const node = this.dataProvider.entryNodes[entryIndex];
        const debuggerModel = this.profileHeader.debuggerModel;
        if (!node || !node.scriptId || !debuggerModel) {
            return;
        }
        const script = debuggerModel.scriptForId(node.scriptId);
        if (!script) {
            return;
        }
        const location = (debuggerModel.createRawLocation(script, node.lineNumber, node.columnNumber));
        const uiLocation = await Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance().rawLocationToUILocation(location);
        void Common.Revealer.reveal(uiLocation);
    }
    changeView(e) {
        if (!this.profileInternal) {
            return;
        }
        if (e) {
            const select = e.target;
            this.viewType.set(select.value);
        }
        this.#selectedNode = null;
        this.#isNodeSelected = false;
        this.performUpdate();
    }
    nodeSelected(selected) {
        this.#isNodeSelected = selected;
        this.performUpdate();
    }
    focusClicked() {
        if (!this.#selectedNode) {
            return;
        }
        this.#isResetEnabled = true;
        this.performUpdate();
        this.resetButton?.focus();
        if (this.profileDataGridTree) {
            this.profileDataGridTree.focus(this.#selectedNode);
        }
        this.refresh();
        this.refreshVisibleData();
        Host.userMetrics.actionTaken(Host.UserMetrics.Action.CpuProfileNodeFocused);
    }
    excludeClicked() {
        const selectedNode = this.#selectedNode;
        if (!selectedNode) {
            return;
        }
        this.#isResetEnabled = true;
        this.performUpdate();
        this.resetButton?.focus();
        this.#selectedNode = null;
        this.nodeSelected(false);
        if (this.profileDataGridTree) {
            this.profileDataGridTree.exclude(selectedNode);
        }
        this.refresh();
        this.refreshVisibleData();
        Host.userMetrics.actionTaken(Host.UserMetrics.Action.CpuProfileNodeExcluded);
    }
    resetClicked() {
        this.viewSelectComboBox?.focus();
        this.#isResetEnabled = false;
        this.#selectedNode = null;
        this.#isNodeSelected = false;
        this.performUpdate();
        if (this.profileDataGridTree) {
            this.profileDataGridTree.restore();
        }
        this.linkifierInternal.reset();
        this.refresh();
        this.refreshVisibleData();
    }
    performUpdate() {
        const currentViewType = this.viewType ? this.viewType.get() : null;
        if (currentViewType && currentViewType !== this.#lastAppliedViewType) {
            this.searchableViewInternal?.closeSearch();
            switch (currentViewType) {
                case "Flame" /* ViewTypes.FLAME */:
                    this.ensureFlameChartCreated();
                    break;
                case "Tree" /* ViewTypes.TREE */:
                    this.profileDataGridTree = this.getTopDownProfileDataGridTree();
                    break;
                case "Heavy" /* ViewTypes.HEAVY */:
                    this.profileDataGridTree = this.getBottomUpProfileDataGridTree();
                    break;
            }
            const initialized = currentViewType === "Flame" /* ViewTypes.FLAME */ ? !!this.dataProvider : !!this.profileDataGridTree;
            if (initialized) {
                this.#lastAppliedViewType = currentViewType;
            }
        }
        const isFlame = currentViewType === "Flame" /* ViewTypes.FLAME */;
        if (this.focusButton) {
            this.focusButton.hidden = isFlame;
            this.focusButton.disabled = !this.#isNodeSelected;
        }
        if (this.excludeButton) {
            this.excludeButton.hidden = isFlame;
            this.excludeButton.disabled = !this.#isNodeSelected;
        }
        if (this.resetButton) {
            this.resetButton.hidden = isFlame;
            this.resetButton.disabled = !this.#isResetEnabled;
        }
        if (this.#selectedSize !== null && this.selectedSizeText) {
            this.selectedSizeText.textContent =
                i18nString(UIStrings.selectedSizeS, { PH1: i18n.ByteUtilities.bytesToString(this.#selectedSize) });
        }
        if (this.#minId !== null && this.#maxId !== null) {
            const rangeChanged = !this.#lastAppliedRange || this.#lastAppliedRange.minId !== this.#minId ||
                this.#lastAppliedRange.maxId !== this.#maxId;
            if (rangeChanged) {
                this.setSelectionRange(this.#minId, this.#maxId);
                this.#lastAppliedRange = { minId: this.#minId, maxId: this.#maxId };
            }
        }
        if (this.sizes.length > 0) {
            const samples = {
                sizes: this.sizes,
                max: this.max,
                ids: this.ordinals,
                timestamps: this.timestamps,
                totalTime: this.totalTime,
            };
            this.timelineOverview.setSamples(samples);
        }
        const input = {
            timelineOverview: this.timelineOverview,
            searchable: this,
            hasTemporaryView: this.profileType.hasTemporaryView(),
            viewType: currentViewType,
            range: this.#range,
            profileDataGridTree: this.profileDataGridTree,
            selectedNode: this.#selectedNode,
            nodeFormatter,
            columnHeader: this.columnHeader.bind(this),
            searchableView: this.searchableViewInternal,
            dataProvider: this.dataProvider,
            target: this.profileHeader.heapProfilerModel()?.target() ?? null,
            onExpand: (node) => {
                node.expanded = true;
                node.populate();
                this.refresh();
            },
            onCollapse: (node) => {
                node.expanded = false;
                this.refresh();
            },
            onSelect: (node) => {
                this.#selectedNode = node;
                this.nodeSelected(true);
            },
            onDeselect: () => {
                this.#selectedNode = null;
                this.nodeSelected(false);
            },
            onContextMenu: (event, node) => {
                this.populateContextMenu(event.detail, node);
            },
            onSearchableViewMount: (widget) => {
                if (this.searchableViewInternal !== widget) {
                    this.searchableViewInternal = widget;
                    this.requestUpdate();
                }
            },
            onFlameChartEntryInvoked: (entryIndex) => {
                void this.onEntryInvoked(entryIndex);
            },
        };
        this.#view(input, this.#viewOutput, this.contentElement);
    }
}
export class SamplingHeapProfileTypeBase extends Common.ObjectWrapper.eventMixin(ProfileType) {
    recording;
    clearedDuringRecording;
    constructor(typeId, description) {
        super(typeId, description);
        this.recording = false;
        this.clearedDuringRecording = false;
    }
    profileBeingRecorded() {
        return super.profileBeingRecorded();
    }
    typeName() {
        return 'Heap';
    }
    fileExtension() {
        return '.heapprofile';
    }
    get buttonTooltip() {
        return this.recording ? i18nString(UIStrings.stopHeapProfiling) : i18nString(UIStrings.startHeapProfiling);
    }
    buttonClicked() {
        if (this.recording) {
            void this.stopRecordingProfile();
        }
        else {
            void this.startRecordingProfile();
        }
        return this.recording;
    }
    async startRecordingProfile() {
        const heapProfilerModel = UI.Context.Context.instance().flavor(SDK.HeapProfilerModel.HeapProfilerModel);
        if (this.profileBeingRecorded() || !heapProfilerModel) {
            return;
        }
        const profileHeader = new SamplingHeapProfileHeader(heapProfilerModel, this);
        this.setProfileBeingRecorded(profileHeader);
        this.addProfile(profileHeader);
        profileHeader.updateStatus(i18nString(UIStrings.recording));
        const warnings = [i18nString(UIStrings.heapProfilerIsRecording)];
        UI.InspectorView.InspectorView.instance().setPanelWarnings('heap-profiler', warnings);
        this.recording = true;
        this.startSampling();
    }
    async stopRecordingProfile() {
        this.recording = false;
        const recordedProfile = this.profileBeingRecorded();
        if (!recordedProfile?.heapProfilerModel()) {
            return;
        }
        recordedProfile.updateStatus(i18nString(UIStrings.stopping));
        const profile = await this.stopSampling();
        if (recordedProfile) {
            console.assert(profile !== undefined);
            recordedProfile.setProtocolProfile(profile);
            recordedProfile.updateStatus('');
            this.setProfileBeingRecorded(null);
        }
        UI.InspectorView.InspectorView.instance().setPanelWarnings('heap-profiler', []);
        // If the data was cleared during the middle of the recording we no
        // longer treat the profile as being completed. This means we avoid
        // a change of view to the profile list.
        const wasClearedDuringRecording = this.clearedDuringRecording;
        this.clearedDuringRecording = false;
        if (wasClearedDuringRecording) {
            return;
        }
        this.dispatchEventToListeners("profile-complete" /* ProfileEvents.PROFILE_COMPLETE */, recordedProfile);
    }
    createProfileLoadedFromFile(title) {
        return new SamplingHeapProfileHeader(null, this, title);
    }
    profileBeingRecordedRemoved() {
        this.clearedDuringRecording = true;
        void this.stopRecordingProfile();
    }
    startSampling() {
        throw new Error('Not implemented');
    }
    stopSampling() {
        throw new Error('Not implemented');
    }
}
let samplingHeapProfileTypeInstance;
export class SamplingHeapProfileType extends SamplingHeapProfileTypeBase {
    updateTimer;
    updateIntervalMs;
    #recordTimelineSetting;
    customContentInternal = null;
    constructor() {
        super(SamplingHeapProfileType.TypeId, i18nString(UIStrings.allocationSampling));
        if (!samplingHeapProfileTypeInstance) {
            samplingHeapProfileTypeInstance = this;
        }
        this.updateTimer = 0;
        this.updateIntervalMs = 200;
        this.#recordTimelineSetting =
            Common.Settings.Settings.instance().createSetting('record-sampling-heap-profiler-timeline', false);
    }
    static get instance() {
        return samplingHeapProfileTypeInstance;
    }
    get treeItemTitle() {
        return i18nString(UIStrings.samplingProfiles);
    }
    get description() {
        // TODO(l10n): Do not concatenate localized strings.
        const formattedDescription = [i18nString(UIStrings.recordMemoryAllocations)];
        return formattedDescription.join('\n');
    }
    hasTemporaryView() {
        return this.#recordTimelineSetting.get();
    }
    customContent() {
        const checkboxSetting = SettingsUI.SettingsUI.createSettingCheckbox(i18nString(UIStrings.samplingHeapProfilerTimeline), this.#recordTimelineSetting);
        this.customContentInternal = checkboxSetting;
        checkboxSetting.setAttribute('jslog', `${VisualLogging.toggle('record-sampling-heap-profiler-timeline').track({ click: true })}`);
        return checkboxSetting;
    }
    setCustomContentEnabled(enable) {
        if (this.customContentInternal) {
            this.customContentInternal.disabled = !enable;
        }
    }
    startSampling() {
        const heapProfilerModel = this.obtainRecordingProfile();
        if (!heapProfilerModel) {
            return;
        }
        void heapProfilerModel.startSampling();
        if (this.#recordTimelineSetting.get()) {
            this.updateTimer = window.setTimeout(() => {
                void this.updateStats();
            }, this.updateIntervalMs);
        }
    }
    obtainRecordingProfile() {
        const recordingProfile = this.profileBeingRecorded();
        if (recordingProfile) {
            const heapProfilerModel = recordingProfile.heapProfilerModel();
            return heapProfilerModel;
        }
        return null;
    }
    async stopSampling() {
        window.clearTimeout(this.updateTimer);
        this.updateTimer = 0;
        this.dispatchEventToListeners("RecordingStopped" /* SamplingHeapProfileType.Events.RECORDING_STOPPED */);
        const heapProfilerModel = this.obtainRecordingProfile();
        if (!heapProfilerModel) {
            throw new Error('No heap profiler model');
        }
        const samplingProfile = await heapProfilerModel.stopSampling();
        if (!samplingProfile) {
            throw new Error('No sampling profile found');
        }
        return samplingProfile;
    }
    async updateStats() {
        const heapProfilerModel = this.obtainRecordingProfile();
        if (!heapProfilerModel) {
            return;
        }
        const profile = await heapProfilerModel.getSamplingProfile();
        if (!this.updateTimer) {
            return;
        }
        this.dispatchEventToListeners("StatsUpdate" /* SamplingHeapProfileType.Events.STATS_UPDATE */, profile);
        this.updateTimer = window.setTimeout(() => {
            void this.updateStats();
        }, this.updateIntervalMs);
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    static TypeId = 'SamplingHeap';
}
export class SamplingHeapProfileHeader extends WritableProfileHeader {
    heapProfilerModelInternal;
    protocolProfileInternal;
    constructor(heapProfilerModel, type, title) {
        super(heapProfilerModel?.debuggerModel() ?? null, type, title || i18nString(UIStrings.profileD, { PH1: type.nextProfileUid() }));
        this.heapProfilerModelInternal = heapProfilerModel;
        this.protocolProfileInternal = {
            head: {
                callFrame: {
                    functionName: '',
                    scriptId: '',
                    url: '',
                    lineNumber: 0,
                    columnNumber: 0,
                },
                children: [],
                selfSize: 0,
                id: 0,
            },
            samples: [],
            startTime: 0,
            endTime: 0,
            nodes: [],
        };
    }
    protocolProfile() {
        return this.protocolProfileInternal;
    }
    heapProfilerModel() {
        return this.heapProfilerModelInternal;
    }
    profileType() {
        return super.profileType();
    }
}
export class SamplingHeapProfileNode extends CPUProfile.ProfileTreeModel.ProfileNode {
    self;
    constructor(node) {
        const callFrame = node.callFrame || {
            // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration)
            // @ts-expect-error
            functionName: node['functionName'],
            // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration)
            // @ts-expect-error
            scriptId: node['scriptId'],
            // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration)
            // @ts-expect-error
            url: node['url'],
            // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration)
            // @ts-expect-error
            lineNumber: node['lineNumber'] - 1,
            // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration)
            // @ts-expect-error
            columnNumber: node['columnNumber'] - 1,
        };
        super(callFrame);
        this.self = node.selfSize;
    }
}
export class SamplingHeapProfileModel extends CPUProfile.ProfileTreeModel.ProfileTreeModel {
    // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    modules;
    constructor(profile, minOrdinal, maxOrdinal) {
        super();
        // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.modules = profile.modules || [];
        let nodeIdToSizeMap = null;
        if (minOrdinal || maxOrdinal) {
            nodeIdToSizeMap = new Map();
            minOrdinal = minOrdinal || 0;
            maxOrdinal = maxOrdinal || Infinity;
            for (const sample of profile.samples) {
                if (sample.ordinal < minOrdinal || sample.ordinal > maxOrdinal) {
                    continue;
                }
                const size = nodeIdToSizeMap.get(sample.nodeId) || 0;
                nodeIdToSizeMap.set(sample.nodeId, size + sample.size);
            }
        }
        this.initialize(translateProfileTree(profile.head));
        function translateProfileTree(root) {
            const resultRoot = new SamplingHeapProfileNode(root);
            const sourceNodeStack = [root];
            const targetNodeStack = [resultRoot];
            while (sourceNodeStack.length) {
                const sourceNode = sourceNodeStack.pop();
                const targetNode = targetNodeStack.pop();
                targetNode.children = sourceNode.children.map(child => {
                    const targetChild = new SamplingHeapProfileNode(child);
                    if (nodeIdToSizeMap) {
                        targetChild.self = nodeIdToSizeMap.get(child.id) || 0;
                    }
                    return targetChild;
                });
                sourceNodeStack.push(...sourceNode.children);
                targetNodeStack.push(...targetNode.children);
            }
            pruneEmptyBranches(resultRoot);
            return resultRoot;
        }
        function pruneEmptyBranches(node) {
            node.children = node.children.filter(pruneEmptyBranches);
            return Boolean(node.children.length || node.self);
        }
    }
}
export class NodeFormatter {
    #formattedValueCache = new Map();
    #formattedValueAccessibleTextCache = new Map();
    #formattedPercentCache = new Map();
    formatValue(value) {
        let result = this.#formattedValueCache.get(value);
        if (!result) {
            result = i18n.ByteUtilities.bytesToString(value);
            this.#formattedValueCache.set(value, result);
        }
        return result;
    }
    formatValueAccessibleText(value) {
        let result = this.#formattedValueAccessibleTextCache.get(value);
        if (!result) {
            result = i18nString(UIStrings.sBytes, { PH1: value });
            this.#formattedValueAccessibleTextCache.set(value, result);
        }
        return result;
    }
    formatPercent(value, _node) {
        let result = this.#formattedPercentCache.get(value);
        if (!result) {
            result = i18nString(UIStrings.formatPercent, { PH1: value.toFixed(2) });
            this.#formattedPercentCache.set(value, result);
        }
        return result;
    }
}
export const nodeFormatter = new NodeFormatter();
export class HeapFlameChartDataProvider extends ProfileFlameChartDataProvider {
    profile;
    heapProfilerModel;
    constructor(profile, heapProfilerModel) {
        super();
        this.profile = profile;
        this.heapProfilerModel = heapProfilerModel;
    }
    minimumBoundary() {
        return 0;
    }
    totalTime() {
        return this.profile.root.total;
    }
    entryHasDeoptReason(_entryIndex) {
        return false;
    }
    formatValue(value, _precision) {
        return i18nString(UIStrings.skb, { PH1: Platform.NumberUtilities.withThousandsSeparator(value / 1e3) });
    }
    calculateTimelineData() {
        function nodesCount(node) {
            return node.children.reduce((count, node) => count + nodesCount(node), 1);
        }
        const count = nodesCount(this.profile.root);
        const entryNodes = new Array(count);
        const entryLevels = new Uint16Array(count);
        const entryTotalTimes = new Float32Array(count);
        const entryStartTimes = new Float64Array(count);
        let depth = 0;
        let maxDepth = 0;
        let position = 0;
        let index = 0;
        function addNode(node) {
            const start = position;
            entryNodes[index] = node;
            entryLevels[index] = depth;
            entryTotalTimes[index] = node.total;
            entryStartTimes[index] = position;
            ++index;
            ++depth;
            node.children.forEach(addNode);
            --depth;
            maxDepth = Math.max(maxDepth, depth);
            position = start + node.total;
        }
        addNode(this.profile.root);
        this.maxStackDepthInternal = maxDepth + 1;
        this.entryNodes = entryNodes;
        this.timelineDataInternal =
            PerfUI.FlameChart.FlameChartTimelineData.create({ entryLevels, entryTotalTimes, entryStartTimes, groups: null });
        return this.timelineDataInternal;
    }
    preparePopoverElement(entryIndex) {
        const node = this.entryNodes[entryIndex];
        if (!node) {
            return null;
        }
        const popoverInfo = [];
        function pushRow(title, value) {
            popoverInfo.push({ title, value });
        }
        pushRow(i18nString(UIStrings.name), UI.UIUtils.beautifyFunctionName(node.functionName));
        pushRow(i18nString(UIStrings.selfSize), i18n.ByteUtilities.bytesToString(node.self));
        pushRow(i18nString(UIStrings.totalSize), i18n.ByteUtilities.bytesToString(node.total));
        const linkifier = new Components.Linkifier.Linkifier();
        const link = linkifier.maybeLinkifyConsoleCallFrame(this.heapProfilerModel ? this.heapProfilerModel.target() : null, node.callFrame);
        if (link) {
            pushRow(i18nString(UIStrings.url), link.textContent);
        }
        linkifier.dispose();
        return HeapProfileView.buildPopoverTable(popoverInfo);
    }
}
//# sourceMappingURL=HeapProfileView.js.map