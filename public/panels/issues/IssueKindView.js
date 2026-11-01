// Copyright 2021 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../ui/components/adorners/adorners.js';
import '../../ui/kit/kit.js';
import './components/components.js';
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import * as IssueCounter from '../../ui/components/issue_counter/issue_counter.js';
import * as UI from '../../ui/legacy/legacy.js';
import { html, render } from '../../ui/lit/lit.js';
import * as Components from './components/components.js';
const { widget } = UI.Widget;
const UIStrings = {
    /**
     * @description Context menu item in the Issues panel to hide all current page errors.
     */
    hideAllCurrentPageErrors: 'Hide all current page errors',
    /**
     * @description Context menu item in the Issues panel to hide all current breaking changes.
     */
    hideAllCurrentBreakingChanges: 'Hide all current breaking changes',
    /**
     * @description Context menu item in the Issues panel to hide all current improvements.
     */
    hideAllCurrentImprovements: 'Hide all current improvements',
};
const str_ = i18n.i18n.registerUIStrings('panels/issues/IssueKindView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export function getGroupIssuesByKindSetting() {
    return Common.Settings.Settings.instance().createSetting('group-issues-by-kind', false);
}
export function issueKindViewSortPriority(a, b) {
    if (a.getKind() === b.getKind()) {
        return 0;
    }
    if (a.getKind() === "PageError" /* IssuesManager.Issue.IssueKind.PAGE_ERROR */) {
        return -1;
    }
    if (a.getKind() === "BreakingChange" /* IssuesManager.Issue.IssueKind.BREAKING_CHANGE */ &&
        b.getKind() === "Improvement" /* IssuesManager.Issue.IssueKind.IMPROVEMENT */) {
        return -1;
    }
    return 1;
}
export function getClassNameFromKind(kind) {
    switch (kind) {
        case "BreakingChange" /* IssuesManager.Issue.IssueKind.BREAKING_CHANGE */:
            return 'breaking-changes';
        case "Improvement" /* IssuesManager.Issue.IssueKind.IMPROVEMENT */:
            return 'improvements';
        case "PageError" /* IssuesManager.Issue.IssueKind.PAGE_ERROR */:
            return 'page-errors';
    }
}
const DEFAULT_VIEW = (input, _output, target) => {
    // clang-format off
    render(html `
    <div class="header">
      <devtools-icon class="leading-issue-icon extra-large" .name=${input.iconName}></devtools-icon>
      <devtools-adorner class="aggregated-issues-count" .name=${'countWrapper'}>
        <span>${input.count}</span>
      </devtools-adorner>
      <div class="title">${input.title}</div>
      <devtools-widget class="hide-available-issues" ${widget(Components.HideIssuesMenu.HideIssuesMenu, {
        menuItemLabel: input.menuItemLabel,
        menuItemAction: input.menuItemAction,
    })}></devtools-widget>
    </div>
  `, target);
    // clang-format on
};
export class IssueKindView extends UI.TreeOutline.TreeElement {
    #kind;
    #issueCount = 0;
    #view;
    constructor(kind, view = DEFAULT_VIEW) {
        super(undefined, true, Platform.StringUtilities.toKebabCase(kind));
        this.#kind = kind;
        this.#view = view;
        this.toggleOnClick = true;
        this.listItemElement.classList.add('issue-kind');
        this.listItemElement.classList.add(getClassNameFromKind(kind));
        this.childrenListElement.classList.add('issue-kind-body');
    }
    getKind() {
        return this.#kind;
    }
    getHideAllCurrentKindString() {
        switch (this.#kind) {
            case "PageError" /* IssuesManager.Issue.IssueKind.PAGE_ERROR */:
                return i18nString(UIStrings.hideAllCurrentPageErrors);
            case "Improvement" /* IssuesManager.Issue.IssueKind.IMPROVEMENT */:
                return i18nString(UIStrings.hideAllCurrentImprovements);
            case "BreakingChange" /* IssuesManager.Issue.IssueKind.BREAKING_CHANGE */:
                return i18nString(UIStrings.hideAllCurrentBreakingChanges);
        }
    }
    #render() {
        this.#view({
            iconName: IssueCounter.IssueCounter.getIssueKindIconName(this.#kind),
            count: this.#issueCount,
            title: IssuesManager.Issue.getIssueKindName(this.#kind),
            menuItemLabel: this.getHideAllCurrentKindString(),
            menuItemAction: () => {
                const setting = IssuesManager.IssuesManager.getHideIssueByCodeSetting();
                const values = setting.get();
                for (const issue of IssuesManager.IssuesManager.IssuesManager.instance().issues()) {
                    if (issue.getKind() === this.#kind) {
                        values[issue.code()] = "Hidden" /* IssuesManager.IssuesManager.IssueStatus.HIDDEN */;
                    }
                }
                setting.set(values);
            },
        }, undefined, this.listItemElement);
    }
    onattach() {
        this.#render();
        this.expand();
    }
    update(count) {
        this.#issueCount = count;
        this.#render();
    }
}
//# sourceMappingURL=IssueKindView.js.map