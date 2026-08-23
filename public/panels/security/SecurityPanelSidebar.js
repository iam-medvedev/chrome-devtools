// Copyright 2024 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as UI from '../../ui/legacy/legacy.js';
import { html, nothing, render } from '../../ui/lit/lit.js';
import lockIconStyles from './lockIcon.css.js';
import { createHighlightedUrl, getSecurityStateIconForDetailedView, getSecurityStateIconForOverview, OriginGroup, } from './SecurityPanel.js';
import sidebarStyles from './sidebar.css.js';
const UIStrings = {
    /**
     * @description Section title for the Security panel's sidebar.
     */
    security: 'Security',
    /**
     * @description Title of the tree item in the Security panel sidebar representing the main origin.
     */
    mainOrigin: 'Main origin',
    /**
     * @description Title of the tree group in the Security panel sidebar for non-secure origins.
     */
    nonsecureOrigins: 'Non-secure origins',
    /**
     * @description Title of the tree group in the Security panel sidebar for secure origins.
     */
    secureOrigins: 'Secure origins',
    /**
     * @description Title of the tree group in the Security panel sidebar for unknown or canceled origins.
     */
    unknownCanceled: 'Unknown / canceled',
    /**
     * @description Title of the overview tree item in the Security panel sidebar.
     */
    overview: 'Overview',
    /**
     * @description Message shown in the Security panel sidebar prompting the user to reload the page to record origins.
     */
    reloadToViewDetails: 'Reload to view details',
};
const str_ = i18n.i18n.registerUIStrings('panels/security/SecurityPanelSidebar.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export const DEFAULT_VIEW = (input, output, target) => {
    const renderIcon = (icon) => html `${icon}`;
    const renderOrigin = (origin, state) => {
        const icon = getSecurityStateIconForDetailedView(state, `security-property security-property-${state}`);
        const selected = input.selectedElementId === origin;
        // clang-format off
        return html `
          <li role="treeitem"
              class="security-sidebar-tree-item"
              title=${origin}
              ?selected=${selected}
              @click=${() => {
            output.onElementSelected(origin);
            output.onShowOrigin(origin);
        }}>
            ${renderIcon(icon)}
            ${createHighlightedUrl(origin, state)}
          </li>
        `;
        // clang-format on
    };
    const getGroupTitle = (group) => {
        switch (group) {
            case OriginGroup.MainOrigin:
                return i18nString(UIStrings.mainOrigin);
            case OriginGroup.NonSecure:
                return i18nString(UIStrings.nonsecureOrigins);
            case OriginGroup.Secure:
                return i18nString(UIStrings.secureOrigins);
            case OriginGroup.Unknown:
                return i18nString(UIStrings.unknownCanceled);
        }
    };
    const getGroupIcon = (group, mainOriginState = "unknown" /* Protocol.Security.SecurityState.Unknown */) => {
        switch (group) {
            case OriginGroup.MainOrigin:
                return getSecurityStateIconForOverview(mainOriginState, `lock-icon lock-icon-${mainOriginState}`);
            case OriginGroup.NonSecure:
                return getSecurityStateIconForDetailedView("insecure" /* Protocol.Security.SecurityState.Insecure */, `lock-icon lock-icon-${"insecure" /* Protocol.Security.SecurityState.Insecure */}`);
            case OriginGroup.Secure:
                return getSecurityStateIconForDetailedView("secure" /* Protocol.Security.SecurityState.Secure */, `lock-icon lock-icon-${"secure" /* Protocol.Security.SecurityState.Secure */}`);
            case OriginGroup.Unknown:
                return getSecurityStateIconForDetailedView("unknown" /* Protocol.Security.SecurityState.Unknown */, `lock-icon lock-icon-${"unknown" /* Protocol.Security.SecurityState.Unknown */}`);
        }
    };
    const originsByGroup = new Map();
    for (const group of Object.values(OriginGroup)) {
        originsByGroup.set(group, []);
    }
    let mainOriginState = "unknown" /* Protocol.Security.SecurityState.Unknown */;
    const overviewIcon = getSecurityStateIconForOverview(input.overviewSecurityState, 'lock-icon lock-icon-' + input.overviewSecurityState);
    for (const [origin, state] of input.origins) {
        if (origin === input.mainOrigin) {
            originsByGroup.get(OriginGroup.MainOrigin)?.push({ origin, state });
            mainOriginState = state;
        }
        else {
            switch (state) {
                case "secure" /* Protocol.Security.SecurityState.Secure */:
                    originsByGroup.get(OriginGroup.Secure)?.push({ origin, state });
                    break;
                case "unknown" /* Protocol.Security.SecurityState.Unknown */:
                    originsByGroup.get(OriginGroup.Unknown)?.push({ origin, state });
                    break;
                default:
                    originsByGroup.get(OriginGroup.NonSecure)?.push({ origin, state });
                    break;
            }
        }
    }
    const renderGroup = (group) => {
        const origins = originsByGroup.get(group) || [];
        const title = getGroupTitle(group);
        const icon = getGroupIcon(group, mainOriginState);
        const isHidden = input.originsHidden ||
            (!input.showOriginsUnconditionally && group !== OriginGroup.MainOrigin && origins.length === 0);
        const showReloadMessage = group === OriginGroup.MainOrigin && input.origins.size === 0;
        // clang-format off
        return html `
      <li role="treeitem" class="security-sidebar-origins" open ?hidden=${isHidden}>
        ${icon ? renderIcon(icon) : nothing}
        <span class="security-sidebar-origins-title">${title}</span>
        <ul role="group" aria-label=${title}>
          ${showReloadMessage ? html `
            <li role="treeitem" class="security-main-view-reload-message" aria-disabled="true">
              ${i18nString(UIStrings.reloadToViewDetails)}
            </li>
          ` : nothing}
          ${origins.map(o => renderOrigin(o.origin, o.state))}
        </ul>
      </li>
    `;
        // clang-format on
    };
    // clang-format off
    render(html `
    <devtools-tree class="security-sidebar" navigation-variant .template=${html `
      <ul role="tree">
        <li role="treeitem" class="security-group-list-item" aria-level="3" aria-label=${i18nString(UIStrings.security)}>
          ${i18nString(UIStrings.security)}
          <ul role="group">
            <li role="treeitem"
                class="security-main-view-sidebar-tree-item"
                title=${i18nString(UIStrings.overview)}
                ?selected=${input.selectedElementId === 'overview'}
                @click=${() => {
        output.onElementSelected('overview');
        output.onShowOrigin(null);
    }}>
              ${renderIcon(overviewIcon)}
              <span title=${i18nString(UIStrings.overview)}>${i18nString(UIStrings.overview)}</span>
            </li>
            ${Object.values(OriginGroup).map(group => renderGroup(group))}
          </ul>
        </li>
      </ul>
    `}></devtools-tree>
  `, target);
    // clang-format on
};
export class SecurityPanelSidebar extends UI.Widget.VBox {
    #securitySidebarLastItemSetting;
    #mainOrigin = null;
    #origins = new Map();
    #originsHidden = false;
    #showOriginsUnconditionally = false;
    #overviewSecurityState = "unknown" /* Protocol.Security.SecurityState.Unknown */;
    #selectedElementId = 'overview';
    #view;
    #onShowOrigin;
    constructor(element, view = DEFAULT_VIEW) {
        super(element);
        this.#view = view;
        this.registerRequiredCSS(lockIconStyles, sidebarStyles);
        this.#securitySidebarLastItemSetting =
            Common.Settings.Settings.instance().createSetting('security-last-selected-element-path', '');
    }
    set onShowOrigin(callback) {
        this.#onShowOrigin = callback;
    }
    wasShown() {
        super.wasShown();
        this.showLastSelectedElement();
    }
    showLastSelectedElement() {
        this.#selectedElementId = 'overview';
        this.#securitySidebarLastItemSetting.set('overview');
        this.requestUpdate();
        this.#onShowOrigin?.(null);
    }
    toggleOriginsList(hidden) {
        this.#originsHidden = hidden;
        this.#showOriginsUnconditionally = !hidden;
        this.requestUpdate();
    }
    addOrigin(origin, securityState) {
        this.#origins.set(origin, securityState);
        this.requestUpdate();
    }
    setMainOrigin(origin) {
        this.#mainOrigin = origin;
        this.requestUpdate();
    }
    get mainOrigin() {
        return this.#mainOrigin;
    }
    updateOrigin(origin, securityState) {
        this.#origins.set(origin, securityState);
        this.requestUpdate();
    }
    updateOverviewSecurityState(securityState) {
        this.#overviewSecurityState = securityState;
        this.requestUpdate();
    }
    clearOrigins() {
        this.#origins.clear();
        this.requestUpdate();
    }
    // Used in web tests
    elementsByOrigin() {
        const map = new Map();
        for (const [origin, state] of this.#origins.entries()) {
            const element = {
                select: () => {
                    this.#selectedElementId = origin;
                    this.#securitySidebarLastItemSetting.set(origin);
                    this.requestUpdate();
                    this.#onShowOrigin?.(origin);
                },
                showElement: () => {
                    this.#onShowOrigin?.(origin);
                },
                origin: () => origin,
                securityState: () => state,
            };
            map.set(origin, element);
        }
        return map;
    }
    set selectedOrigin(origin) {
        this.#selectedElementId = origin ?? 'overview';
        this.#securitySidebarLastItemSetting.set(this.#selectedElementId);
        this.requestUpdate();
        this.#onShowOrigin?.(origin);
    }
    get selectedOrigin() {
        return this.#selectedElementId;
    }
    performUpdate() {
        const input = {
            mainOrigin: this.#mainOrigin,
            origins: this.#origins,
            originsHidden: this.#originsHidden,
            showOriginsUnconditionally: this.#showOriginsUnconditionally,
            overviewSecurityState: this.#overviewSecurityState,
            selectedElementId: this.#selectedElementId,
        };
        const output = {
            onElementSelected: (id) => {
                this.#selectedElementId = id;
                this.#securitySidebarLastItemSetting.set(id);
                this.requestUpdate();
            },
            onShowOrigin: (origin) => {
                this.#onShowOrigin?.(origin);
            },
        };
        this.#view(input, output, this.contentElement);
    }
}
//# sourceMappingURL=SecurityPanelSidebar.js.map