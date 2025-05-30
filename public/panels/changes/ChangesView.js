// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-imperative-dom-api */
import '../../ui/legacy/legacy.js';
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Root from '../../core/root/root.js';
import * as WorkspaceDiff from '../../models/workspace_diff/workspace_diff.js';
import { PanelUtils } from '../../panels/utils/utils.js';
import * as Diff from '../../third_party/diff/diff.js';
import * as DiffView from '../../ui/components/diff_view/diff_view.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import { ChangesSidebar } from './ChangesSidebar.js';
import changesViewStyles from './changesView.css.js';
import * as CombinedDiffView from './CombinedDiffView.js';
const CHANGES_VIEW_URL = 'https://developer.chrome.com/docs/devtools/changes';
const UIStrings = {
    /**
     *@description Text in Changes View of the Changes tab if no change has been made so far.
     */
    noChanges: 'No changes yet',
    /**
     *@description Text in Changes View of the Changes tab to explain the Changes panel.
     */
    changesViewDescription: 'On this page you can track code changes made within DevTools.',
    /**
     *@description Text in Changes View of the Changes tab if the changed content is of a binary type.
     */
    noTextualDiff: 'No textual diff available',
    /**
     *@description Text in Changes View of the Changes tab when binary data has been changed
     */
    binaryDataDescription: 'The changes tab doesn\'t show binary data changes',
    /**
     * @description Text in the Changes tab that indicates how many lines of code have changed in the
     * selected file. An insertion refers to an added line of code. The (+) is a visual cue to indicate
     * lines were added (not translatable).
     */
    sInsertions: '{n, plural, =1 {# insertion (+)} other {# insertions (+)}}',
    /**
     * @description Text in the Changes tab that indicates how many lines of code have changed in the
     * selected file. A deletion refers to a removed line of code. The (-) is a visual cue to indicate
     * lines were removed (not translatable).
     */
    sDeletions: '{n, plural, =1 {# deletion (-)} other {# deletions (-)}}',
    /**
     *@description Text for a button in the Changes tool that copies all the changes from the currently open file.
     */
    copy: 'Copy',
};
const str_ = i18n.i18n.registerUIStrings('panels/changes/ChangesView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(undefined, str_);
function diffStats(diff) {
    const insertions = diff.reduce((ins, token) => ins + (token[0] === Diff.Diff.Operation.Insert ? token[1].length : 0), 0);
    const deletions = diff.reduce((ins, token) => ins + (token[0] === Diff.Diff.Operation.Delete ? token[1].length : 0), 0);
    const deletionText = i18nString(UIStrings.sDeletions, { n: deletions });
    const insertionText = i18nString(UIStrings.sInsertions, { n: insertions });
    return `${insertionText}, ${deletionText}`;
}
export class ChangesView extends UI.Widget.VBox {
    emptyWidget;
    workspaceDiff;
    changesSidebar;
    selectedUISourceCode;
    #selectedSourceCodeFormattedMapping;
    diffContainer;
    toolbar;
    diffStats;
    diffView;
    combinedDiffView;
    constructor() {
        super(true);
        this.registerRequiredCSS(changesViewStyles);
        this.element.setAttribute('jslog', `${VisualLogging.panel('changes').track({ resize: true })}`);
        const splitWidget = new UI.SplitWidget.SplitWidget(true /* vertical */, false /* sidebar on left */);
        const mainWidget = new UI.Widget.VBox();
        splitWidget.setMainWidget(mainWidget);
        splitWidget.show(this.contentElement);
        this.emptyWidget = new UI.EmptyWidget.EmptyWidget('', '');
        this.emptyWidget.show(mainWidget.element);
        this.workspaceDiff = WorkspaceDiff.WorkspaceDiff.workspaceDiff();
        this.changesSidebar = new ChangesSidebar(this.workspaceDiff);
        // TODO(ergunsh): Add scroll to singular diffs when they are clicked on sidebar.
        this.changesSidebar.addEventListener("SelectedUISourceCodeChanged" /* Events.SELECTED_UI_SOURCE_CODE_CHANGED */, this.selectedUISourceCodeChanged, this);
        splitWidget.setSidebarWidget(this.changesSidebar);
        this.selectedUISourceCode = null;
        this.diffContainer = mainWidget.element.createChild('div', 'diff-container');
        UI.ARIAUtils.markAsTabpanel(this.diffContainer);
        if (shouldRenderCombinedDiffView()) {
            // TODO(ergunsh): Handle clicks from CombinedDiffView too.
            this.combinedDiffView = new CombinedDiffView.CombinedDiffView();
            this.combinedDiffView.workspaceDiff = this.workspaceDiff;
            this.combinedDiffView.show(this.diffContainer);
        }
        else {
            this.diffView = this.diffContainer.appendChild(new DiffView.DiffView.DiffView());
            this.diffContainer.addEventListener('click', event => this.click(event));
        }
        this.toolbar = mainWidget.element.createChild('devtools-toolbar', 'changes-toolbar');
        this.toolbar.setAttribute('jslog', `${VisualLogging.toolbar()}`);
        this.toolbar.appendToolbarItem(UI.Toolbar.Toolbar.createActionButton('changes.revert'));
        if (!shouldRenderCombinedDiffView()) {
            // TODO(ergunsh): We do not show the diff stats & the copy button for the combined view.
            this.diffStats = new UI.Toolbar.ToolbarText('');
            this.toolbar.appendToolbarItem(this.diffStats);
            this.toolbar.appendToolbarItem(new UI.Toolbar.ToolbarSeparator());
            this.toolbar.appendToolbarItem(UI.Toolbar.Toolbar.createActionButton('changes.copy', {
                label: i18nLazyString(UIStrings.copy),
            }));
        }
        this.hideDiff(i18nString(UIStrings.noChanges), i18nString(UIStrings.changesViewDescription), CHANGES_VIEW_URL);
        this.selectedUISourceCodeChanged();
    }
    renderDiffOrEmptyState() {
        if (!this.combinedDiffView) {
            return;
        }
        // There are modified UI source codes, we should render the combined diff view.
        if (this.workspaceDiff.modifiedUISourceCodes().length > 0) {
            this.showDiffContainer();
        }
        else {
            this.hideDiff(i18nString(UIStrings.noChanges), i18nString(UIStrings.changesViewDescription), CHANGES_VIEW_URL);
        }
    }
    selectedUISourceCodeChanged() {
        const selectedUISourceCode = this.changesSidebar.selectedUISourceCode();
        if (!selectedUISourceCode) {
            return;
        }
        this.revealUISourceCode(selectedUISourceCode);
        UI.ActionRegistry.ActionRegistry.instance()
            .getAction('changes.copy')
            .setEnabled(selectedUISourceCode.contentType() === Common.ResourceType.resourceTypes.Stylesheet);
        if (this.combinedDiffView) {
            this.combinedDiffView.selectedFileUrl = selectedUISourceCode.url();
        }
    }
    revert() {
        const uiSourceCode = this.selectedUISourceCode;
        if (!uiSourceCode) {
            return;
        }
        void this.workspaceDiff.revertToOriginal(uiSourceCode);
    }
    async copy() {
        const uiSourceCode = this.selectedUISourceCode;
        if (!uiSourceCode) {
            return;
        }
        const diffResponse = await this.workspaceDiff.requestDiff(uiSourceCode);
        // Diff array with real diff will contain at least 2 lines.
        if (!diffResponse || diffResponse?.diff.length < 2) {
            return;
        }
        const changes = await PanelUtils.formatCSSChangesFromDiff(diffResponse.diff);
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(changes);
    }
    click(event) {
        if (!this.selectedUISourceCode) {
            return;
        }
        for (const target of event.composedPath()) {
            if (!(target instanceof HTMLElement)) {
                continue;
            }
            const selection = target.ownerDocument.getSelection();
            if (selection?.toString()) {
                // We abort source revelation when user has text selection.
                break;
            }
            if (target.classList.contains('diff-line-content') && target.hasAttribute('data-line-number')) {
                let lineNumber = Number(target.dataset.lineNumber) - 1;
                // Unfortunately, caretRangeFromPoint is broken in shadow
                // roots, which makes determining the character offset more
                // work than justified here.
                if (this.#selectedSourceCodeFormattedMapping) {
                    lineNumber = this.#selectedSourceCodeFormattedMapping.formattedToOriginal(lineNumber, 0)[0];
                }
                void Common.Revealer.reveal(this.selectedUISourceCode.uiLocation(lineNumber, 0), false);
                event.consume(true);
                break;
            }
            else if (target.classList.contains('diff-listing')) {
                break;
            }
        }
    }
    revealUISourceCode(uiSourceCode) {
        if (this.selectedUISourceCode === uiSourceCode) {
            return;
        }
        if (this.selectedUISourceCode) {
            this.workspaceDiff.unsubscribeFromDiffChange(this.selectedUISourceCode, this.refreshDiff, this);
        }
        if (uiSourceCode && this.isShowing()) {
            this.workspaceDiff.subscribeToDiffChange(uiSourceCode, this.refreshDiff, this);
        }
        this.selectedUISourceCode = uiSourceCode;
        void this.refreshDiff();
    }
    wasShown() {
        UI.Context.Context.instance().setFlavor(ChangesView, this);
        super.wasShown();
        void this.refreshDiff();
        this.renderDiffOrEmptyState();
        this.workspaceDiff.addEventListener("ModifiedStatusChanged" /* WorkspaceDiff.WorkspaceDiff.Events.MODIFIED_STATUS_CHANGED */, this.renderDiffOrEmptyState, this);
    }
    willHide() {
        super.willHide();
        UI.Context.Context.instance().setFlavor(ChangesView, null);
        this.workspaceDiff.removeEventListener("ModifiedStatusChanged" /* WorkspaceDiff.WorkspaceDiff.Events.MODIFIED_STATUS_CHANGED */, this.renderDiffOrEmptyState, this);
    }
    async refreshDiff() {
        if (!this.isShowing()) {
            return;
        }
        if (!this.selectedUISourceCode) {
            this.renderDiffRows();
            return;
        }
        const uiSourceCode = this.selectedUISourceCode;
        if (!uiSourceCode.contentType().isTextType()) {
            this.hideDiff(i18nString(UIStrings.noTextualDiff), i18nString(UIStrings.binaryDataDescription));
            return;
        }
        const diffResponse = await this.workspaceDiff.requestDiff(uiSourceCode);
        if (this.selectedUISourceCode !== uiSourceCode) {
            return;
        }
        this.#selectedSourceCodeFormattedMapping = diffResponse?.formattedCurrentMapping;
        this.renderDiffRows(diffResponse?.diff);
    }
    hideDiff(header, text, link) {
        this.diffStats?.setText('');
        this.toolbar.setEnabled(false);
        this.diffContainer.style.display = 'none';
        this.emptyWidget.header = header;
        this.emptyWidget.text = text;
        this.emptyWidget.link = link;
        this.emptyWidget.showWidget();
    }
    showDiffContainer() {
        this.emptyWidget.hideWidget();
        this.diffContainer.style.display = 'block';
    }
    showEmptyState() {
        this.hideDiff(i18nString(UIStrings.noChanges), i18nString(UIStrings.changesViewDescription), CHANGES_VIEW_URL);
    }
    renderDiffRows(diff) {
        if (!diff || (diff.length === 1 && diff[0][0] === Diff.Diff.Operation.Equal)) {
            this.showEmptyState();
        }
        else {
            this.diffStats?.setText(diffStats(diff));
            this.toolbar.setEnabled(true);
            if (this.diffView) {
                const mimeType = this.selectedUISourceCode.mimeType();
                this.diffView.data = { diff, mimeType };
            }
            this.showDiffContainer();
        }
    }
}
export class ActionDelegate {
    handleAction(context, actionId) {
        const changesView = context.flavor(ChangesView);
        if (changesView === null) {
            return false;
        }
        switch (actionId) {
            case 'changes.revert':
                changesView.revert();
                return true;
            case 'changes.copy':
                void changesView.copy();
                return true;
        }
        return false;
    }
}
function shouldRenderCombinedDiffView() {
    return Boolean(Root.Runtime.hostConfig.devToolsFreestyler?.patching);
}
//# sourceMappingURL=ChangesView.js.map