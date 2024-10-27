import '../../../ui/components/icon_button/icon_button.js';
import '../../../ui/components/report_view/report_view.js';
import type * as Platform from '../../../core/platform/platform.js';
import * as Protocol from '../../../generated/protocol.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
export interface PermissionsPolicySectionData {
    policies: Protocol.Page.PermissionsPolicyFeatureState[];
    showDetails: boolean;
}
export declare function renderIconLink(iconName: string, title: Platform.UIString.LocalizedString, clickHandler: (() => void) | (() => Promise<void>), jsLogContext: string): LitHtml.TemplateResult;
export declare class PermissionsPolicySection extends HTMLElement {
    #private;
    set data(data: PermissionsPolicySectionData);
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-resources-permissions-policy-section': PermissionsPolicySection;
    }
}
