// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Root from '../../core/root/root.js';
import * as SDK from '../../core/sdk/sdk.js';
import { AttributionReportingIssue } from './AttributionReportingIssue.js';
import { BounceTrackingIssue } from './BounceTrackingIssue.js';
import { ClientHintIssue } from './ClientHintIssue.js';
import { ContentSecurityPolicyIssue } from './ContentSecurityPolicyIssue.js';
import { CookieDeprecationMetadataIssue } from './CookieDeprecationMetadataIssue.js';
import { CookieIssue } from './CookieIssue.js';
import { CorsIssue } from './CorsIssue.js';
import { CrossOriginEmbedderPolicyIssue, isCrossOriginEmbedderPolicyIssue } from './CrossOriginEmbedderPolicyIssue.js';
import { DeprecationIssue } from './DeprecationIssue.js';
import { ElementAccessibilityIssue } from './ElementAccessibilityIssue.js';
import { FederatedAuthRequestIssue } from './FederatedAuthRequestIssue.js';
import { GenericIssue } from './GenericIssue.js';
import { HeavyAdIssue } from './HeavyAdIssue.js';
import { LowTextContrastIssue } from './LowTextContrastIssue.js';
import { MixedContentIssue } from './MixedContentIssue.js';
import { PartitioningBlobURLIssue } from './PartitioningBlobURLIssue.js';
import { PropertyRuleIssue } from './PropertyRuleIssue.js';
import { QuirksModeIssue } from './QuirksModeIssue.js';
import { SharedArrayBufferIssue } from './SharedArrayBufferIssue.js';
import { SharedDictionaryIssue } from './SharedDictionaryIssue.js';
import { SourceFrameIssuesManager } from './SourceFrameIssuesManager.js';
import { SRIMessageSignatureIssue } from './SRIMessageSignatureIssue.js';
import { StylesheetLoadingIssue } from './StylesheetLoadingIssue.js';
import { UserReidentificationIssue } from './UserReidentificationIssue.js';
let issuesManagerInstance = null;
function createIssuesForBlockedByResponseIssue(issuesModel, inspectorIssue) {
    const blockedByResponseIssueDetails = inspectorIssue.details.blockedByResponseIssueDetails;
    if (!blockedByResponseIssueDetails) {
        console.warn('BlockedByResponse issue without details received.');
        return [];
    }
    if (isCrossOriginEmbedderPolicyIssue(blockedByResponseIssueDetails.reason)) {
        return [new CrossOriginEmbedderPolicyIssue(blockedByResponseIssueDetails, issuesModel)];
    }
    return [];
}
const issueCodeHandlers = new Map([
    [
        "CookieIssue" /* Protocol.Audits.InspectorIssueCode.CookieIssue */,
        CookieIssue.fromInspectorIssue,
    ],
    [
        "MixedContentIssue" /* Protocol.Audits.InspectorIssueCode.MixedContentIssue */,
        MixedContentIssue.fromInspectorIssue,
    ],
    [
        "HeavyAdIssue" /* Protocol.Audits.InspectorIssueCode.HeavyAdIssue */,
        HeavyAdIssue.fromInspectorIssue,
    ],
    [
        "ContentSecurityPolicyIssue" /* Protocol.Audits.InspectorIssueCode.ContentSecurityPolicyIssue */,
        ContentSecurityPolicyIssue.fromInspectorIssue,
    ],
    ["BlockedByResponseIssue" /* Protocol.Audits.InspectorIssueCode.BlockedByResponseIssue */, createIssuesForBlockedByResponseIssue],
    [
        "SharedArrayBufferIssue" /* Protocol.Audits.InspectorIssueCode.SharedArrayBufferIssue */,
        SharedArrayBufferIssue.fromInspectorIssue,
    ],
    [
        "SharedDictionaryIssue" /* Protocol.Audits.InspectorIssueCode.SharedDictionaryIssue */,
        SharedDictionaryIssue.fromInspectorIssue,
    ],
    [
        "LowTextContrastIssue" /* Protocol.Audits.InspectorIssueCode.LowTextContrastIssue */,
        LowTextContrastIssue.fromInspectorIssue,
    ],
    [
        "CorsIssue" /* Protocol.Audits.InspectorIssueCode.CorsIssue */,
        CorsIssue.fromInspectorIssue,
    ],
    [
        "QuirksModeIssue" /* Protocol.Audits.InspectorIssueCode.QuirksModeIssue */,
        QuirksModeIssue.fromInspectorIssue,
    ],
    [
        "AttributionReportingIssue" /* Protocol.Audits.InspectorIssueCode.AttributionReportingIssue */,
        AttributionReportingIssue.fromInspectorIssue,
    ],
    [
        "GenericIssue" /* Protocol.Audits.InspectorIssueCode.GenericIssue */,
        GenericIssue.fromInspectorIssue,
    ],
    [
        "DeprecationIssue" /* Protocol.Audits.InspectorIssueCode.DeprecationIssue */,
        DeprecationIssue.fromInspectorIssue,
    ],
    [
        "ClientHintIssue" /* Protocol.Audits.InspectorIssueCode.ClientHintIssue */,
        ClientHintIssue.fromInspectorIssue,
    ],
    [
        "FederatedAuthRequestIssue" /* Protocol.Audits.InspectorIssueCode.FederatedAuthRequestIssue */,
        FederatedAuthRequestIssue.fromInspectorIssue,
    ],
    [
        "BounceTrackingIssue" /* Protocol.Audits.InspectorIssueCode.BounceTrackingIssue */,
        BounceTrackingIssue.fromInspectorIssue,
    ],
    [
        "StylesheetLoadingIssue" /* Protocol.Audits.InspectorIssueCode.StylesheetLoadingIssue */,
        StylesheetLoadingIssue.fromInspectorIssue,
    ],
    [
        "PartitioningBlobURLIssue" /* Protocol.Audits.InspectorIssueCode.PartitioningBlobURLIssue */,
        PartitioningBlobURLIssue.fromInspectorIssue,
    ],
    [
        "PropertyRuleIssue" /* Protocol.Audits.InspectorIssueCode.PropertyRuleIssue */,
        PropertyRuleIssue.fromInspectorIssue,
    ],
    [
        "CookieDeprecationMetadataIssue" /* Protocol.Audits.InspectorIssueCode.CookieDeprecationMetadataIssue */,
        CookieDeprecationMetadataIssue.fromInspectorIssue,
    ],
    [
        "ElementAccessibilityIssue" /* Protocol.Audits.InspectorIssueCode.ElementAccessibilityIssue */,
        ElementAccessibilityIssue.fromInspectorIssue,
    ],
    [
        "SRIMessageSignatureIssue" /* Protocol.Audits.InspectorIssueCode.SRIMessageSignatureIssue */,
        SRIMessageSignatureIssue.fromInspectorIssue,
    ],
    [
        "UserReidentificationIssue" /* Protocol.Audits.InspectorIssueCode.UserReidentificationIssue */,
        UserReidentificationIssue.fromInspectorIssue,
    ],
]);
/**
 * Each issue reported by the backend can result in multiple `Issue` instances.
 * Handlers are simple functions hard-coded into a map.
 */
export function createIssuesFromProtocolIssue(issuesModel, inspectorIssue) {
    const handler = issueCodeHandlers.get(inspectorIssue.code);
    if (handler) {
        return handler(issuesModel, inspectorIssue);
    }
    console.warn(`No handler registered for issue code ${inspectorIssue.code}`);
    return [];
}
export function defaultHideIssueByCodeSetting() {
    const setting = {};
    return setting;
}
export function getHideIssueByCodeSetting() {
    return Common.Settings.Settings.instance().createSetting('hide-issue-by-code-setting-experiment-2021', defaultHideIssueByCodeSetting());
}
/**
 * The `IssuesManager` is the central storage for issues. It collects issues from all the
 * `IssuesModel` instances in the page, and deduplicates them wrt their primary key.
 * It also takes care of clearing the issues when it sees a main-frame navigated event.
 * Any client can subscribe to the events provided, and/or query the issues via the public
 * interface.
 *
 * Additionally, the `IssuesManager` can filter Issues. All Issues are stored, but only
 * Issues that are accepted by the filter cause events to be fired or are returned by
 * `IssuesManager#issues()`.
 */
export class IssuesManager extends Common.ObjectWrapper.ObjectWrapper {
    showThirdPartyIssuesSetting;
    hideIssueSetting;
    #eventListeners = new WeakMap();
    #allIssues = new Map();
    #filteredIssues = new Map();
    #issueCounts = new Map();
    #hiddenIssueCount = new Map();
    #thirdPartyCookiePhaseoutIssueCount = new Map();
    #issuesById = new Map();
    #issuesByOutermostTarget = new Map();
    #thirdPartyCookiePhaseoutIssueMessageSent = false;
    constructor(showThirdPartyIssuesSetting, hideIssueSetting) {
        super();
        this.showThirdPartyIssuesSetting = showThirdPartyIssuesSetting;
        this.hideIssueSetting = hideIssueSetting;
        new SourceFrameIssuesManager(this);
        SDK.TargetManager.TargetManager.instance().observeModels(SDK.IssuesModel.IssuesModel, this);
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.ResourceTreeModel.ResourceTreeModel, SDK.ResourceTreeModel.Events.PrimaryPageChanged, this.#onPrimaryPageChanged, this);
        SDK.FrameManager.FrameManager.instance().addEventListener("FrameAddedToTarget" /* SDK.FrameManager.Events.FRAME_ADDED_TO_TARGET */, this.#onFrameAddedToTarget, this);
        // issueFilter uses the 'show-third-party-issues' setting. Clients of IssuesManager need
        // a full update when the setting changes to get an up-to-date issues list.
        this.showThirdPartyIssuesSetting?.addChangeListener(() => this.#updateFilteredIssues());
        this.hideIssueSetting?.addChangeListener(() => this.#updateFilteredIssues());
        SDK.TargetManager.TargetManager.instance().observeTargets({
            targetAdded: (target) => {
                if (target.outermostTarget() === target) {
                    this.#updateFilteredIssues();
                }
            },
            targetRemoved: (_) => { },
        }, { scoped: true });
    }
    static instance(opts = {
        forceNew: false,
        ensureFirst: false,
    }) {
        if (issuesManagerInstance && opts.ensureFirst) {
            throw new Error('IssuesManager was already created. Either set "ensureFirst" to false or make sure that this invocation is really the first one.');
        }
        if (!issuesManagerInstance || opts.forceNew) {
            issuesManagerInstance = new IssuesManager(opts.showThirdPartyIssuesSetting, opts.hideIssueSetting);
        }
        return issuesManagerInstance;
    }
    static removeInstance() {
        issuesManagerInstance = null;
    }
    #onPrimaryPageChanged(event) {
        const { frame, type } = event.data;
        const keptIssues = new Map();
        for (const [key, issue] of this.#allIssues.entries()) {
            if (issue.isAssociatedWithRequestId(frame.loaderId)) {
                keptIssues.set(key, issue);
                // Keep issues for prerendered target alive in case of prerender-activation.
            }
            else if ((type === "Activation" /* SDK.ResourceTreeModel.PrimaryPageChangeType.ACTIVATION */) &&
                (frame.resourceTreeModel().target() === issue.model()?.target())) {
                keptIssues.set(key, issue);
                // Keep BounceTrackingIssues alive for non-user-initiated navigations.
            }
            else if (issue.code() === "BounceTrackingIssue" /* Protocol.Audits.InspectorIssueCode.BounceTrackingIssue */ ||
                issue.code() === "CookieIssue" /* Protocol.Audits.InspectorIssueCode.CookieIssue */) {
                const networkManager = frame.resourceTreeModel().target().model(SDK.NetworkManager.NetworkManager);
                if (networkManager?.requestForLoaderId(frame.loaderId)?.hasUserGesture() === false) {
                    keptIssues.set(key, issue);
                }
            }
        }
        this.#allIssues = keptIssues;
        this.#updateFilteredIssues();
    }
    #onFrameAddedToTarget(event) {
        const { frame } = event.data;
        // Determining third-party status usually requires the registered domain of the outermost frame.
        // When DevTools is opened after navigation has completed, issues may be received
        // before the outermost frame is available. Thus, we trigger a recalcuation of third-party-ness
        // when we attach to the outermost frame.
        if (frame.isOutermostFrame() && SDK.TargetManager.TargetManager.instance().isInScope(frame.resourceTreeModel())) {
            this.#updateFilteredIssues();
        }
    }
    modelAdded(issuesModel) {
        const listener = issuesModel.addEventListener("IssueAdded" /* SDK.IssuesModel.Events.ISSUE_ADDED */, this.#onIssueAddedEvent, this);
        this.#eventListeners.set(issuesModel, listener);
    }
    modelRemoved(issuesModel) {
        const listener = this.#eventListeners.get(issuesModel);
        if (listener) {
            Common.EventTarget.removeEventListeners([listener]);
        }
    }
    #onIssueAddedEvent(event) {
        const { issuesModel, inspectorIssue } = event.data;
        const isPrivacyUiEnabled = Root.Runtime.hostConfig.devToolsPrivacyUI?.enabled;
        const issues = createIssuesFromProtocolIssue(issuesModel, inspectorIssue);
        for (const issue of issues) {
            this.addIssue(issuesModel, issue);
            const message = issue.maybeCreateConsoleMessage();
            if (!message) {
                continue;
            }
            // Only show one message for third-party cookie phaseout issues if the new privacy ui is enabled
            const is3rdPartyCookiePhaseoutIssue = CookieIssue.getSubCategory(issue.code()) === "ThirdPartyPhaseoutCookie" /* CookieIssueSubCategory.THIRD_PARTY_PHASEOUT_COOKIE */;
            if (!is3rdPartyCookiePhaseoutIssue || !isPrivacyUiEnabled || !this.#thirdPartyCookiePhaseoutIssueMessageSent) {
                issuesModel.target().model(SDK.ConsoleModel.ConsoleModel)?.addMessage(message);
            }
            if (is3rdPartyCookiePhaseoutIssue && isPrivacyUiEnabled) {
                this.#thirdPartyCookiePhaseoutIssueMessageSent = true;
            }
        }
    }
    addIssue(issuesModel, issue) {
        // Ignore issues without proper description; they are invisible to the user and only cause confusion.
        if (!issue.getDescription()) {
            return;
        }
        const primaryKey = issue.primaryKey();
        if (this.#allIssues.has(primaryKey)) {
            return;
        }
        this.#allIssues.set(primaryKey, issue);
        const outermostTarget = issuesModel.target().outermostTarget();
        if (outermostTarget) {
            let issuesForTarget = this.#issuesByOutermostTarget.get(outermostTarget);
            if (!issuesForTarget) {
                issuesForTarget = new Set();
                this.#issuesByOutermostTarget.set(outermostTarget, issuesForTarget);
            }
            issuesForTarget.add(issue);
        }
        if (this.#issueFilter(issue)) {
            this.#filteredIssues.set(primaryKey, issue);
            this.#issueCounts.set(issue.getKind(), 1 + (this.#issueCounts.get(issue.getKind()) || 0));
            const issueId = issue.getIssueId();
            if (issueId) {
                this.#issuesById.set(issueId, issue);
            }
            const values = this.hideIssueSetting?.get();
            this.#updateIssueHiddenStatus(issue, values);
            if (CookieIssue.isThirdPartyCookiePhaseoutRelatedIssue(issue)) {
                this.#thirdPartyCookiePhaseoutIssueCount.set(issue.getKind(), 1 + (this.#thirdPartyCookiePhaseoutIssueCount.get(issue.getKind()) || 0));
            }
            else if (issue.isHidden()) {
                this.#hiddenIssueCount.set(issue.getKind(), 1 + (this.#hiddenIssueCount.get(issue.getKind()) || 0));
            }
            this.dispatchEventToListeners("IssueAdded" /* Events.ISSUE_ADDED */, { issuesModel, issue });
        }
        // Always fire the "count" event even if the issue was filtered out.
        // The result of `hasOnlyThirdPartyIssues` could still change.
        this.dispatchEventToListeners("IssuesCountUpdated" /* Events.ISSUES_COUNT_UPDATED */);
    }
    issues() {
        return this.#filteredIssues.values();
    }
    numberOfIssues(kind) {
        if (kind) {
            return (this.#issueCounts.get(kind) ?? 0) - this.numberOfHiddenIssues(kind) -
                this.numberOfThirdPartyCookiePhaseoutIssues(kind);
        }
        return this.#filteredIssues.size - this.numberOfHiddenIssues() - this.numberOfThirdPartyCookiePhaseoutIssues();
    }
    numberOfHiddenIssues(kind) {
        if (kind) {
            return this.#hiddenIssueCount.get(kind) ?? 0;
        }
        let count = 0;
        for (const num of this.#hiddenIssueCount.values()) {
            count += num;
        }
        return count;
    }
    numberOfThirdPartyCookiePhaseoutIssues(kind) {
        if (kind) {
            return this.#thirdPartyCookiePhaseoutIssueCount.get(kind) ?? 0;
        }
        let count = 0;
        for (const num of this.#thirdPartyCookiePhaseoutIssueCount.values()) {
            count += num;
        }
        return count;
    }
    numberOfAllStoredIssues() {
        return this.#allIssues.size;
    }
    #issueFilter(issue) {
        const scopeTarget = SDK.TargetManager.TargetManager.instance().scopeTarget();
        if (!scopeTarget) {
            return false;
        }
        if (!this.#issuesByOutermostTarget.get(scopeTarget)?.has(issue)) {
            return false;
        }
        return this.showThirdPartyIssuesSetting?.get() || !issue.isCausedByThirdParty();
    }
    #updateIssueHiddenStatus(issue, values) {
        const code = issue.code();
        // All issues are hidden via their code.
        // For hiding we check whether the issue code is present and has a value of IssueStatus.Hidden
        // assosciated with it. If all these conditions are met the issue is hidden.
        // IssueStatus is set in hidden issues menu.
        // In case a user wants to hide a specific issue, the issue code is added to "code" section
        // of our setting and its value is set to IssueStatus.Hidden. Then issue then gets hidden.
        if (values?.[code]) {
            if (values[code] === "Hidden" /* IssueStatus.HIDDEN */) {
                issue.setHidden(true);
                return;
            }
            issue.setHidden(false);
            return;
        }
    }
    #updateFilteredIssues() {
        this.#filteredIssues.clear();
        this.#issueCounts.clear();
        this.#issuesById.clear();
        this.#hiddenIssueCount.clear();
        this.#thirdPartyCookiePhaseoutIssueCount.clear();
        this.#thirdPartyCookiePhaseoutIssueMessageSent = false;
        const values = this.hideIssueSetting?.get();
        for (const [key, issue] of this.#allIssues) {
            if (this.#issueFilter(issue)) {
                this.#updateIssueHiddenStatus(issue, values);
                this.#filteredIssues.set(key, issue);
                this.#issueCounts.set(issue.getKind(), 1 + (this.#issueCounts.get(issue.getKind()) ?? 0));
                if (issue.isHidden()) {
                    this.#hiddenIssueCount.set(issue.getKind(), 1 + (this.#hiddenIssueCount.get(issue.getKind()) || 0));
                }
                const issueId = issue.getIssueId();
                if (issueId) {
                    this.#issuesById.set(issueId, issue);
                }
            }
        }
        this.dispatchEventToListeners("FullUpdateRequired" /* Events.FULL_UPDATE_REQUIRED */);
        this.dispatchEventToListeners("IssuesCountUpdated" /* Events.ISSUES_COUNT_UPDATED */);
    }
    unhideAllIssues() {
        for (const issue of this.#allIssues.values()) {
            issue.setHidden(false);
        }
        this.hideIssueSetting?.set(defaultHideIssueByCodeSetting());
    }
    getIssueById(id) {
        return this.#issuesById.get(id);
    }
}
// @ts-expect-error
globalThis.addIssueForTest = (issue) => {
    const mainTarget = SDK.TargetManager.TargetManager.instance().primaryPageTarget();
    const issuesModel = mainTarget?.model(SDK.IssuesModel.IssuesModel);
    issuesModel?.issueAdded({ issue });
};
//# sourceMappingURL=IssuesManager.js.map