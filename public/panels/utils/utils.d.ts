import * as Common from '../../core/common/common.js';
import type * as SDK from '../../core/sdk/sdk.js';
import type * as Workspace from '../../models/workspace/workspace.js';
import type * as Diff from '../../third_party/diff/diff.js';
import * as IconButton from '../../ui/components/icon_button/icon_button.js';
export declare class PanelUtils {
    static isFailedNetworkRequest(request: SDK.NetworkRequest.NetworkRequest | null): boolean;
    static createIconElement(iconData: {
        iconName: string;
        color: string;
    }, title: string): HTMLElement;
    static getIconForNetworkRequest(request: SDK.NetworkRequest.NetworkRequest): HTMLElement;
    static iconDataForResourceType(resourceType: Common.ResourceType.ResourceType): {
        iconName: string;
        color: string;
    };
    static getIconForSourceFile(uiSourceCode: Workspace.UISourceCode.UISourceCode, options?: {
        width?: number;
        height?: number;
    }): IconButton.FileSourceIcon.FileSourceIcon;
    static formatCSSChangesFromDiff(diff: Diff.Diff.DiffArray): Promise<string>;
    static highlightElement(element: HTMLElement): void;
}
