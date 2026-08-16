// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as UI from '../../ui/legacy/legacy.js';
const UIStrings = {
    /**
     * @description Title of an action that toggles comment mode.
     */
    toggleCommentMode: 'Add comments to send to your AI coding agent',
};
const str_ = i18n.i18n.registerUIStrings('ui/comments/comments-meta.ts', UIStrings);
const i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(undefined, str_);
let loadedCommentsModule;
async function loadCommentsModule() {
    if (!loadedCommentsModule) {
        loadedCommentsModule = await import('./comments.js');
    }
    return loadedCommentsModule;
}
function isCommentsEnabled(config) {
    return Boolean(config?.devToolsComments?.enabled);
}
UI.ActionRegistration.registerActionExtension({
    category: "GLOBAL" /* UI.ActionRegistration.ActionCategory.GLOBAL */,
    actionId: 'comments.toggle-comment-mode',
    title: i18nLazyString(UIStrings.toggleCommentMode),
    iconClass: "comment-mode" /* UI.ActionRegistration.IconClass.COMMENT_MODE */,
    toggleable: true,
    condition: isCommentsEnabled,
    async loadActionDelegate() {
        const Comments = await loadCommentsModule();
        return new Comments.CommentsOverlayWidget.ActionDelegate();
    },
});
UI.Toolbar.registerToolbarItem({
    actionId: 'comments.toggle-comment-mode',
    location: "main-toolbar-left" /* UI.Toolbar.ToolbarItemLocation.MAIN_TOOLBAR_LEFT */,
    order: 1,
    condition: isCommentsEnabled,
});
//# sourceMappingURL=comments-meta.prebundle.js.map