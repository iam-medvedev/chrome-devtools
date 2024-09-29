// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as UI from '../../ui/legacy/legacy.js';
import lockIconStyles from './lockIcon.css.js';
import { OriginTreeElement } from './OriginTreeElement.js';
import { createHighlightedUrl, getSecurityStateIconForDetailedView, getSecurityStateIconForOverview, OriginGroup, } from './SecurityPanel.js';
import sidebarStyles from './sidebar.css.js';
const UIStrings = {
    /**
     *@description Section title for the the Security Panel's sidebar
     */
    security: 'Security',
    /**
     *@description Text in Security Panel of the Security panel
     */
    mainOrigin: 'Main origin',
    /**
     *@description Text in Security Panel of the Security panel
     */
    nonsecureOrigins: 'Non-secure origins',
    /**
     *@description Text in Security Panel of the Security panel
     */
    secureOrigins: 'Secure origins',
    /**
     *@description Text in Security Panel of the Security panel
     */
    unknownCanceled: 'Unknown / canceled',
    /**
     *@description Title text content in Security Panel of the Security panel
     */
    overview: 'Overview',
    /**
     *@description Text in Security Panel of the Security panel
     */
    reloadToViewDetails: 'Reload to view details',
    /**
     *@description New parent title in Security Panel of the Security panel
     */
    mainOriginSecure: 'Main origin (secure)',
    /**
     *@description New parent title in Security Panel of the Security panel
     */
    mainOriginNonsecure: 'Main origin (non-secure)',
};
const str_ = i18n.i18n.registerUIStrings('panels/security/SecurityAndPrivacyPanelSidebar.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class SecurityAndPrivacyPanelSidebar extends UI.Widget.VBox {
    sidebarTree;
    #originGroupTitles;
    #originGroups;
    securityOverviewElement;
    #elementsByOrigin;
    #mainViewReloadMessage;
    #mainOrigin;
    #revealOrigin;
    constructor(revealOrigin, revealMainView) {
        super();
        this.#mainOrigin = null;
        this.#revealOrigin = revealOrigin;
        this.sidebarTree = new UI.TreeOutline.TreeOutlineInShadow("NavigationTree" /* UI.TreeOutline.TreeVariant.NAVIGATION_TREE */);
        this.sidebarTree.element.classList.add('security-sidebar');
        this.contentElement.appendChild(this.sidebarTree.element);
        const securitySectionTitle = i18nString(UIStrings.security);
        const securityTreeElement = this.#addSidebarSection(securitySectionTitle, 'security');
        this.securityOverviewElement =
            new OriginTreeElement('security-main-view-sidebar-tree-item', revealMainView, this.#renderTreeElement);
        this.securityOverviewElement.tooltip = i18nString(UIStrings.overview);
        securityTreeElement.appendChild(this.securityOverviewElement);
        this.#originGroupTitles = new Map([
            [OriginGroup.MainOrigin, i18nString(UIStrings.mainOrigin)],
            [OriginGroup.NonSecure, i18nString(UIStrings.nonsecureOrigins)],
            [OriginGroup.Secure, i18nString(UIStrings.secureOrigins)],
            [OriginGroup.Unknown, i18nString(UIStrings.unknownCanceled)],
        ]);
        this.#originGroups = new Map();
        for (const group of Object.values(OriginGroup)) {
            const element = this.#createOriginGroupElement(this.#originGroupTitles.get(group));
            this.#originGroups.set(group, element);
            securityTreeElement.appendChild(element);
        }
        this.#mainViewReloadMessage = new UI.TreeOutline.TreeElement(i18nString(UIStrings.reloadToViewDetails));
        this.#mainViewReloadMessage.selectable = false;
        this.#mainViewReloadMessage.listItemElement.classList.add('security-main-view-reload-message');
        const treeElement = this.#originGroups.get(OriginGroup.MainOrigin);
        treeElement.appendChild(this.#mainViewReloadMessage);
        this.#clearOriginGroups();
        this.#elementsByOrigin = new Map();
    }
    #addSidebarSection(title, jslogContext) {
        const treeElement = new UI.TreeOutline.TreeElement(title, true, jslogContext);
        treeElement.listItemElement.classList.add('security-group-list-item');
        treeElement.setCollapsible(false);
        treeElement.selectable = false;
        this.sidebarTree.appendChild(treeElement);
        UI.ARIAUtils.markAsHeading(treeElement.listItemElement, 3);
        UI.ARIAUtils.setLabel(treeElement.childrenListElement, title);
        return treeElement;
    }
    #originGroupTitle(originGroup) {
        return this.#originGroupTitles.get(originGroup);
    }
    #originGroupElement(originGroup) {
        return this.#originGroups.get(originGroup);
    }
    #createOriginGroupElement(originGroupTitle) {
        const originGroup = new UI.TreeOutline.TreeElement(originGroupTitle, true);
        originGroup.selectable = false;
        originGroup.setCollapsible(false);
        originGroup.expand();
        originGroup.listItemElement.classList.add('security-sidebar-origins');
        UI.ARIAUtils.setLabel(originGroup.childrenListElement, originGroupTitle);
        return originGroup;
    }
    toggleOriginsList(hidden) {
        for (const element of this.#originGroups.values()) {
            element.hidden = hidden;
        }
    }
    addOrigin(origin, securityState) {
        this.#mainViewReloadMessage.hidden = true;
        const originElement = new OriginTreeElement('security-sidebar-tree-item', this.#revealOrigin.bind(this, origin), this.#renderTreeElement, origin);
        originElement.tooltip = origin;
        this.#elementsByOrigin.set(origin, originElement);
        this.updateOrigin(origin, securityState);
    }
    setMainOrigin(origin) {
        this.#mainOrigin = origin;
    }
    get mainOrigin() {
        return this.#mainOrigin;
    }
    get originGroups() {
        return this.#originGroups;
    }
    updateOrigin(origin, securityState) {
        const originElement = this.#elementsByOrigin.get(origin);
        originElement.setSecurityState(securityState);
        let newParent;
        if (origin === this.#mainOrigin) {
            newParent = this.#originGroups.get(OriginGroup.MainOrigin);
            if (securityState === "secure" /* Protocol.Security.SecurityState.Secure */) {
                newParent.title = i18nString(UIStrings.mainOriginSecure);
            }
            else {
                newParent.title = i18nString(UIStrings.mainOriginNonsecure);
            }
            UI.ARIAUtils.setLabel(newParent.childrenListElement, newParent.title);
        }
        else {
            switch (securityState) {
                case "secure" /* Protocol.Security.SecurityState.Secure */:
                    newParent = this.#originGroupElement(OriginGroup.Secure);
                    break;
                case "unknown" /* Protocol.Security.SecurityState.Unknown */:
                    newParent = this.#originGroupElement(OriginGroup.Unknown);
                    break;
                default:
                    newParent = this.#originGroupElement(OriginGroup.NonSecure);
                    break;
            }
        }
        const oldParent = originElement.parent;
        if (oldParent !== newParent) {
            if (oldParent) {
                oldParent.removeChild(originElement);
                if (oldParent.childCount() === 0) {
                    oldParent.hidden = true;
                }
            }
            newParent.appendChild(originElement);
            newParent.hidden = false;
        }
    }
    #clearOriginGroups() {
        for (const [originGroup, originGroupElement] of this.#originGroups) {
            if (originGroup === OriginGroup.MainOrigin) {
                for (let i = originGroupElement.childCount() - 1; i > 0; i--) {
                    originGroupElement.removeChildAtIndex(i);
                }
                originGroupElement.title = this.#originGroupTitle(OriginGroup.MainOrigin);
                originGroupElement.hidden = false;
                this.#mainViewReloadMessage.hidden = false;
            }
            else {
                originGroupElement.removeChildren();
                originGroupElement.hidden = true;
            }
        }
    }
    clearOrigins() {
        this.#clearOriginGroups();
        this.#elementsByOrigin.clear();
    }
    wasShown() {
        super.wasShown();
        this.sidebarTree.registerCSSFiles([lockIconStyles, sidebarStyles]);
    }
    #renderTreeElement(element) {
        if (element instanceof OriginTreeElement) {
            const securityState = element.securityState() ?? "unknown" /* Protocol.Security.SecurityState.Unknown */;
            const isOverviewElement = element.listItemElement.classList.contains('security-main-view-sidebar-tree-item');
            const icon = isOverviewElement ?
                getSecurityStateIconForOverview(securityState, `lock-icon lock-icon-${securityState}`) :
                getSecurityStateIconForDetailedView(securityState, `security-property security-property-${securityState}`);
            const elementTitle = isOverviewElement ? (() => {
                const title = document.createElement('span');
                title.classList.add('title');
                title.textContent = i18nString(UIStrings.overview);
                return title;
            })() : createHighlightedUrl(element.origin() ?? Platform.DevToolsPath.EmptyUrlString, securityState);
            element.setLeadingIcons([icon]);
            if (element.listItemElement.lastChild) {
                element.listItemElement.removeChild(element.listItemElement.lastChild);
            }
            element.listItemElement.appendChild(elementTitle);
        }
    }
}
//# sourceMappingURL=SecurityAndPrivacyPanelSidebar.js.map