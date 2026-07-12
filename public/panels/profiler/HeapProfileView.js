// Copyright 2016 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable @devtools/no-imperative-dom-api */
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Bindings from '../../models/bindings/bindings.js';
import * as CPUProfile from '../../models/cpu_profile/cpu_profile.js';
import * as DataGrid from '../../ui/legacy/components/data_grid/data_grid.js';
import * as PerfUI from '../../ui/legacy/components/perf_ui/perf_ui.js';
import * as SettingsUI from '../../ui/legacy/components/settings_ui/settings_ui.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import { BottomUpProfileDataGridTree } from './BottomUpProfileDataGrid.js';
import { HeapTimelineOverview } from './HeapTimelineOverview.js';
import { ProfileDataGridTree } from './ProfileDataGrid.js';
import { ProfileFlameChart, ProfileFlameChartDataProvider } from './ProfileFlameChartDataProvider.js';
import { ProfileType } from './ProfileHeader.js';
import { TopDownProfileDataGridTree } from './TopDownProfileDataGrid.js';
import { WritableProfileHeader } from './WritableProfileHeader.js';
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
};
const str_ = i18n.i18n.registerUIStrings('panels/profiler/HeapProfileView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
function convertToSamplingHeapProfile(profileHeader) {
    return (profileHeader.profile || profileHeader.protocolProfile());
}
export const maxLinkLength = 30;
export class HeapProfileView extends UI.View.SimpleView {
    profileHeader;
    profileType;
    adjustedTotal;
    selectedSizeText;
    timestamps;
    sizes;
    max;
    ordinals;
    totalTime;
    lastOrdinal;
    timelineOverview;
    profileInternal;
    searchableViewInternal;
    dataGrid;
    viewSelectComboBox;
    focusButton;
    excludeButton;
    resetButton;
    linkifierInternal;
    nodeFormatter;
    viewType;
    bottomUpProfileDataGridTree;
    topDownProfileDataGridTree;
    currentSearchResultIndex;
    dataProvider;
    flameChart;
    visibleView;
    searchableElement;
    profileDataGridTree;
    constructor(profileHeader) {
        super({
            title: i18nString(UIStrings.profile),
            viewId: 'profile',
        });
        this.profileInternal = null;
        this.searchableViewInternal = new UI.SearchableView.SearchableView(this, null);
        this.searchableViewInternal.setPlaceholder(i18nString(UIStrings.findByCostMsNameOrFile));
        this.searchableViewInternal.show(this.element);
        const columns = [];
        columns.push({
            id: 'self',
            title: this.columnHeader('self'),
            width: '120px',
            fixedWidth: true,
            sortable: true,
            sort: DataGrid.DataGrid.Order.Descending,
        });
        columns.push({
            id: 'total',
            title: this.columnHeader('total'),
            width: '120px',
            fixedWidth: true,
            sortable: true,
        });
        columns.push({
            id: 'function',
            title: i18nString(UIStrings.function),
            disclosure: true,
            sortable: true,
        });
        this.dataGrid = new DataGrid.DataGrid.DataGridImpl({
            displayName: i18nString(UIStrings.profiler),
            columns,
        });
        this.dataGrid.addEventListener("SortingChanged" /* DataGrid.DataGrid.Events.SORTING_CHANGED */, this.sortProfile, this);
        this.dataGrid.addEventListener("SelectedNode" /* DataGrid.DataGrid.Events.SELECTED_NODE */, this.nodeSelected.bind(this, true));
        this.dataGrid.addEventListener("DeselectedNode" /* DataGrid.DataGrid.Events.DESELECTED_NODE */, this.nodeSelected.bind(this, false));
        this.dataGrid.setRowContextMenuCallback(this.populateContextMenu.bind(this));
        this.viewSelectComboBox = new UI.Toolbar.ToolbarComboBox(this.changeView.bind(this), i18nString(UIStrings.profileViewMode), undefined, 'profile-view.selected-view');
        this.focusButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.focusSelectedFunction), 'eye', undefined, 'profile-view.focus-selected-function');
        this.focusButton.setEnabled(false);
        this.focusButton.addEventListener("Click" /* UI.Toolbar.ToolbarButton.Events.CLICK */, this.focusClicked, this);
        this.excludeButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.excludeSelectedFunction), 'cross', undefined, 'profile-view.exclude-selected-function');
        this.excludeButton.setEnabled(false);
        this.excludeButton.addEventListener("Click" /* UI.Toolbar.ToolbarButton.Events.CLICK */, this.excludeClicked, this);
        this.resetButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.restoreAllFunctions), 'refresh', undefined, 'profile-view.restore-all-functions');
        this.resetButton.setEnabled(false);
        this.resetButton.addEventListener("Click" /* UI.Toolbar.ToolbarButton.Events.CLICK */, this.resetClicked, this);
        this.linkifierInternal = new Components.Linkifier.Linkifier(maxLinkLength);
        this.profileHeader = profileHeader;
        this.profileType = profileHeader.profileType();
        this.initialize(new NodeFormatter(this));
        const profile = new SamplingHeapProfileModel(convertToSamplingHeapProfile(profileHeader));
        this.adjustedTotal = profile.total;
        this.setProfile(profile);
        this.selectedSizeText = new UI.Toolbar.ToolbarText();
        this.timestamps = [];
        this.sizes = [];
        this.max = [];
        this.ordinals = [];
        this.totalTime = 0;
        this.lastOrdinal = 0;
        this.timelineOverview = new HeapTimelineOverview();
        if (this.profileType.hasTemporaryView()) {
            this.timelineOverview.addEventListener("IdsRangeChanged" /* Events.IDS_RANGE_CHANGED */, this.onIdsRangeChanged.bind(this));
            this.timelineOverview.show(this.element, this.element.firstChild);
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
        return [this.viewSelectComboBox, this.focusButton, this.excludeButton, this.resetButton, this.selectedSizeText];
    }
    onIdsRangeChanged(event) {
        const { minId, maxId } = event.data;
        this.selectedSizeText.setText(i18nString(UIStrings.selectedSizeS, { PH1: i18n.ByteUtilities.bytesToString(event.data.size) }));
        this.setSelectionRange(minId, maxId);
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
        const samples = {
            sizes: this.sizes,
            max: this.max,
            ids: this.ordinals,
            timestamps: this.timestamps,
            totalTime: this.totalTime,
        };
        this.timelineOverview.setSamples(samples);
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
        const table = document.createElement('table');
        for (const entry of popoverInfo) {
            const row = table.createChild('tr');
            row.createChild('td').textContent = entry.title;
            row.createChild('td').textContent = entry.value;
        }
        return table;
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
    initialize(nodeFormatter) {
        this.nodeFormatter = nodeFormatter;
        this.viewType = Common.Settings.Settings.instance().createSetting('profile-view', "Heavy" /* ViewTypes.HEAVY */);
        const viewTypes = ["Flame" /* ViewTypes.FLAME */, "Heavy" /* ViewTypes.HEAVY */, "Tree" /* ViewTypes.TREE */];
        const optionNames = new Map([
            ["Flame" /* ViewTypes.FLAME */, i18nString(UIStrings.chart)],
            ["Heavy" /* ViewTypes.HEAVY */, i18nString(UIStrings.heavyBottomUp)],
            ["Tree" /* ViewTypes.TREE */, i18nString(UIStrings.treeTopDown)],
        ]);
        const options = new Map(viewTypes.map(type => [type, this.viewSelectComboBox.createOption(optionNames.get(type), type)]));
        const optionName = this.viewType.get() || viewTypes[0];
        const option = options.get(optionName) || options.get(viewTypes[0]);
        this.viewSelectComboBox.select(option);
        this.changeView();
        if (this.flameChart) {
            this.flameChart.update();
        }
    }
    focus() {
        if (this.flameChart) {
            this.flameChart.focus();
        }
        else {
            super.focus();
        }
    }
    selectRange(timeLeft, timeRight) {
        if (!this.flameChart) {
            return;
        }
        this.flameChart.selectRange(timeLeft, timeRight);
    }
    getBottomUpProfileDataGridTree() {
        if (!this.bottomUpProfileDataGridTree) {
            this.bottomUpProfileDataGridTree = new BottomUpProfileDataGridTree(this.nodeFormatter, this.searchableViewInternal, this.profileInternal.root, this.adjustedTotal);
        }
        return this.bottomUpProfileDataGridTree;
    }
    getTopDownProfileDataGridTree() {
        if (!this.topDownProfileDataGridTree) {
            this.topDownProfileDataGridTree = new TopDownProfileDataGridTree(this.nodeFormatter, this.searchableViewInternal, this.profileInternal.root, this.adjustedTotal);
        }
        return this.topDownProfileDataGridTree;
    }
    populateContextMenu(contextMenu, gridNode) {
        const node = gridNode;
        if (node.linkElement) {
            contextMenu.appendApplicableItems(node.linkElement);
        }
    }
    willHide() {
        super.willHide();
        this.currentSearchResultIndex = -1;
    }
    refresh() {
        if (!this.profileDataGridTree) {
            return;
        }
        this.dataGrid.rootNode().removeChildren();
        const children = this.profileDataGridTree.children;
        const count = children.length;
        for (let index = 0; index < count; ++index) {
            this.dataGrid.rootNode().appendChild(children[index]);
        }
    }
    refreshVisibleData() {
        let child = this.dataGrid.rootNode().children[0];
        while (child) {
            child.refresh();
            child = child.traverseNextNode(false, null, true);
        }
    }
    searchableView() {
        return this.searchableViewInternal;
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
        if (this.searchableElement) {
            this.searchableElement.onSearchCanceled();
        }
    }
    performSearch(searchConfig, shouldJump, jumpBackwards) {
        if (this.searchableElement) {
            this.searchableElement.performSearch(searchConfig, shouldJump, jumpBackwards);
        }
    }
    jumpToNextSearchResult() {
        if (this.searchableElement) {
            this.searchableElement.jumpToNextSearchResult();
        }
    }
    jumpToPreviousSearchResult() {
        if (this.searchableElement) {
            this.searchableElement.jumpToPreviousSearchResult();
        }
    }
    linkifier() {
        return this.linkifierInternal;
    }
    ensureFlameChartCreated() {
        if (this.flameChart) {
            return;
        }
        this.dataProvider = this.createFlameChartDataProvider();
        this.flameChart = new ProfileFlameChart(this.searchableViewInternal, this.dataProvider);
        this.flameChart.addEventListener("EntryInvoked" /* PerfUI.FlameChart.Events.ENTRY_INVOKED */, event => {
            void this.onEntryInvoked(event);
        });
    }
    async onEntryInvoked(event) {
        if (!this.dataProvider) {
            return;
        }
        const entryIndex = event.data;
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
    changeView() {
        if (!this.profileInternal) {
            return;
        }
        this.searchableViewInternal.closeSearch();
        if (this.visibleView) {
            this.visibleView.detach();
        }
        this.viewType.set(this.viewSelectComboBox.selectedOption().value);
        switch (this.viewType.get()) {
            case "Flame" /* ViewTypes.FLAME */:
                this.ensureFlameChartCreated();
                this.visibleView = this.flameChart;
                this.searchableElement = this.flameChart;
                break;
            case "Tree" /* ViewTypes.TREE */:
                this.profileDataGridTree = this.getTopDownProfileDataGridTree();
                this.sortProfile();
                this.visibleView = this.dataGrid.asWidget();
                this.searchableElement = this.profileDataGridTree;
                break;
            case "Heavy" /* ViewTypes.HEAVY */:
                this.profileDataGridTree = this.getBottomUpProfileDataGridTree();
                this.sortProfile();
                this.visibleView = this.dataGrid.asWidget();
                this.searchableElement = this.profileDataGridTree;
                break;
        }
        const isFlame = this.viewType.get() === "Flame" /* ViewTypes.FLAME */;
        this.focusButton.setVisible(!isFlame);
        this.excludeButton.setVisible(!isFlame);
        this.resetButton.setVisible(!isFlame);
        if (this.visibleView) {
            this.visibleView.show(this.searchableViewInternal.element);
        }
    }
    nodeSelected(selected) {
        this.focusButton.setEnabled(selected);
        this.excludeButton.setEnabled(selected);
    }
    focusClicked() {
        if (!this.dataGrid.selectedNode) {
            return;
        }
        this.resetButton.setEnabled(true);
        this.resetButton.element.focus();
        if (this.profileDataGridTree) {
            this.profileDataGridTree.focus(this.dataGrid.selectedNode);
        }
        this.refresh();
        this.refreshVisibleData();
        Host.userMetrics.actionTaken(Host.UserMetrics.Action.CpuProfileNodeFocused);
    }
    excludeClicked() {
        const selectedNode = this.dataGrid.selectedNode;
        if (!selectedNode) {
            return;
        }
        this.resetButton.setEnabled(true);
        this.resetButton.element.focus();
        selectedNode.deselect();
        if (this.profileDataGridTree) {
            this.profileDataGridTree.exclude(selectedNode);
        }
        this.refresh();
        this.refreshVisibleData();
        Host.userMetrics.actionTaken(Host.UserMetrics.Action.CpuProfileNodeExcluded);
    }
    resetClicked() {
        this.viewSelectComboBox.element.focus();
        this.resetButton.setEnabled(false);
        if (this.profileDataGridTree) {
            this.profileDataGridTree.restore();
        }
        this.linkifierInternal.reset();
        this.refresh();
        this.refreshVisibleData();
    }
    sortProfile() {
        if (!this.profileDataGridTree) {
            return;
        }
        const sortAscending = this.dataGrid.isSortOrderAscending();
        const sortColumnId = this.dataGrid.sortColumnId();
        const sortProperty = sortColumnId === 'function' ? 'functionName' : sortColumnId || '';
        this.profileDataGridTree.sort(ProfileDataGridTree.propertyComparator(sortProperty, sortAscending), false);
        this.refresh();
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
    profileView;
    constructor(profileView) {
        this.profileView = profileView;
    }
    formatValue(value) {
        return i18n.ByteUtilities.bytesToString(value);
    }
    formatValueAccessibleText(value) {
        return i18nString(UIStrings.sBytes, { PH1: value });
    }
    formatPercent(value, _node) {
        return i18nString(UIStrings.formatPercent, { PH1: value.toFixed(2) });
    }
    linkifyNode(node) {
        const heapProfilerModel = this.profileView.profileHeader.heapProfilerModel();
        const target = heapProfilerModel ? heapProfilerModel.target() : null;
        const options = {
            className: 'profile-node-file',
        };
        return this.profileView.linkifier().maybeLinkifyConsoleCallFrame(target, node.profileNode.callFrame, options);
    }
}
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