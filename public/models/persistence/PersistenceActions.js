// Copyright (c) 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Bindings from '../bindings/bindings.js';
import * as Workspace from '../workspace/workspace.js';
import { NetworkPersistenceManager } from './NetworkPersistenceManager.js';
import { PersistenceImpl } from './PersistenceImpl.js';
const UIStrings = {
    /**
     *@description Text to save content as a specific file type
     */
    saveAs: 'Save as...',
    /**
     *@description Context menu item for saving an image
     */
    saveImage: 'Save image',
    /**
     *@description Context menu item for showing all overridden files
     */
    showOverrides: 'Show all overrides',
    /**
     *@description A context menu item in the Persistence Actions of the Workspace settings in Settings
     */
    overrideContent: 'Override content',
    /**
     *@description A context menu item in the Persistence Actions of the Workspace settings in Settings
     */
    openInContainingFolder: 'Open in containing folder',
    /**
     *@description A message in a confirmation dialog in the Persistence Actions
     * @example {bundle.min.js} PH1
     */
    overrideSourceMappedFileWarning: 'Override ‘{PH1}’ instead?',
    /**
     *@description A message in a confirmation dialog to explain why the action is failed in the Persistence Actions
     * @example {index.ts} PH1
     */
    overrideSourceMappedFileExplanation: '‘{PH1}’ is a source mapped file and cannot be overridden.',
};
const str_ = i18n.i18n.registerUIStrings('models/persistence/PersistenceActions.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class ContextMenuProvider {
    appendApplicableItems(_event, contextMenu, contentProvider) {
        async function saveAs() {
            if (contentProvider instanceof Workspace.UISourceCode.UISourceCode) {
                contentProvider.commitWorkingCopy();
            }
            const content = await contentProvider.requestContent();
            let decodedContent = content.content || '';
            if (content.isEncoded) {
                decodedContent = window.atob(decodedContent);
            }
            const url = contentProvider.contentURL();
            await Workspace.FileManager.FileManager.instance().save(url, decodedContent, true);
            Workspace.FileManager.FileManager.instance().close(url);
        }
        async function saveImage() {
            const targetObject = contentProvider;
            const content = (await targetObject.requestContent()).content || '';
            const link = document.createElement('a');
            link.download = targetObject.displayName;
            link.href = 'data:' + targetObject.mimeType + ';base64,' + content;
            link.click();
        }
        if (contentProvider.contentType().isDocumentOrScriptOrStyleSheet()) {
            contextMenu.saveSection().appendItem(i18nString(UIStrings.saveAs), saveAs);
        }
        else if (contentProvider instanceof SDK.Resource.Resource && contentProvider.contentType().isImage()) {
            contextMenu.saveSection().appendItem(i18nString(UIStrings.saveImage), saveImage);
        }
        // Retrieve uiSourceCode by URL to pick network resources everywhere.
        const uiSourceCode = Workspace.Workspace.WorkspaceImpl.instance().uiSourceCodeForURL(contentProvider.contentURL());
        const networkPersistenceManager = NetworkPersistenceManager.instance();
        const binding = uiSourceCode && PersistenceImpl.instance().binding(uiSourceCode);
        const fileURL = binding ? binding.fileSystem.contentURL() : contentProvider.contentURL();
        if (Common.ParsedURL.schemeIs(fileURL, 'file:')) {
            const path = Common.ParsedURL.ParsedURL.urlToRawPathString(fileURL, Host.Platform.isWin());
            contextMenu.revealSection().appendItem(i18nString(UIStrings.openInContainingFolder), () => Host.InspectorFrontendHost.InspectorFrontendHostInstance.showItemInFolder(path));
        }
        if (contentProvider instanceof Workspace.UISourceCode.UISourceCode &&
            (contentProvider.project().type() === Workspace.Workspace.projectTypes.FileSystem)) {
            // Do not append in Sources > Workspace & Overrides tab
            return;
        }
        let disabled = true;
        let handler = () => { };
        if (uiSourceCode && networkPersistenceManager.isUISourceCodeOverridable(uiSourceCode)) {
            if (!uiSourceCode.contentType().isFromSourceMap()) {
                disabled = false;
                handler = this.handleOverrideContent.bind(this, uiSourceCode, contentProvider);
            }
            else {
                // show redirect dialog for source mapped file
                const deployedUiSourceCode = this.getDeployedUiSourceCode(uiSourceCode);
                if (deployedUiSourceCode) {
                    disabled = false;
                    handler = this.redirectOverrideToDeployedUiSourceCode.bind(this, deployedUiSourceCode, uiSourceCode);
                }
            }
        }
        contextMenu.overrideSection().appendItem(i18nString(UIStrings.overrideContent), handler, { disabled });
        if (contentProvider instanceof SDK.NetworkRequest.NetworkRequest) {
            contextMenu.overrideSection().appendItem(i18nString(UIStrings.showOverrides), async () => {
                await UI.ViewManager.ViewManager.instance().showView('navigator-overrides');
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.ShowAllOverridesFromNetworkContextMenu);
            });
        }
    }
    async handleOverrideContent(uiSourceCode, contentProvider) {
        const networkPersistenceManager = NetworkPersistenceManager.instance();
        const isSuccess = await networkPersistenceManager.setupAndStartLocalOverrides(uiSourceCode);
        if (isSuccess) {
            await Common.Revealer.reveal(uiSourceCode);
        }
        // Collect metrics: Context menu access point
        if (contentProvider instanceof SDK.NetworkRequest.NetworkRequest) {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.OverrideContentFromNetworkContextMenu);
        }
        else if (contentProvider instanceof Workspace.UISourceCode.UISourceCode) {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.OverrideContentFromSourcesContextMenu);
        }
        // Collect metrics: Content type
        if (uiSourceCode.isFetchXHR()) {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.OverrideFetchXHR);
        }
        else if (contentProvider.contentType().isScript()) {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.OverrideScript);
        }
        else if (contentProvider.contentType().isDocument()) {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.OverrideDocument);
        }
        else if (contentProvider.contentType().isStyleSheet()) {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.OverrideStyleSheet);
        }
        else if (contentProvider.contentType().isImage()) {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.OverrideImage);
        }
        else if (contentProvider.contentType().isFont()) {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.OverrideFont);
        }
    }
    async redirectOverrideToDeployedUiSourceCode(deployedUiSourceCode, originalUiSourceCode) {
        Host.userMetrics.actionTaken(Host.UserMetrics.Action.OverrideContentContextMenuSourceMappedWarning);
        const deployedUrl = deployedUiSourceCode.url();
        const deployedName = Bindings.ResourceUtils.displayNameForURL(deployedUrl);
        const originalUrl = originalUiSourceCode.url();
        const originalName = Bindings.ResourceUtils.displayNameForURL(originalUrl);
        const warningMessage = i18nString(UIStrings.overrideSourceMappedFileWarning, { PH1: deployedName }) + '\n' +
            i18nString(UIStrings.overrideSourceMappedFileExplanation, { PH1: originalName });
        const shouldJumpToDeployedFile = await UI.UIUtils.ConfirmDialog.show(warningMessage);
        if (shouldJumpToDeployedFile) {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.OverrideContentContextMenuRedirectToDeployed);
            await this.handleOverrideContent(deployedUiSourceCode, deployedUiSourceCode);
        }
    }
    getDeployedUiSourceCode(uiSourceCode) {
        const debuggerWorkspaceBinding = Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance();
        for (const deployedScript of debuggerWorkspaceBinding.scriptsForUISourceCode(uiSourceCode)) {
            const deployedUiSourceCode = debuggerWorkspaceBinding.uiSourceCodeForScript(deployedScript);
            if (deployedUiSourceCode) {
                return deployedUiSourceCode;
            }
        }
        const [deployedStylesUrl] = Bindings.SASSSourceMapping.SASSSourceMapping.uiSourceOrigin(uiSourceCode);
        if (!deployedStylesUrl) {
            return null;
        }
        const deployedUiSourceCode = Workspace.Workspace.WorkspaceImpl.instance().uiSourceCodeForURL(deployedStylesUrl) ||
            Workspace.Workspace.WorkspaceImpl.instance().uiSourceCodeForURL(Common.ParsedURL.ParsedURL.urlWithoutHash(deployedStylesUrl));
        return deployedUiSourceCode;
    }
}
//# sourceMappingURL=PersistenceActions.js.map