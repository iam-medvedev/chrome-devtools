import '../../ui/components/switch/switch.js';
import '../../ui/components/cards/cards.js';
import type * as Platform from '../../core/platform/platform.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare const i18nString: (id: string, values?: import("../../core/i18n/i18nTypes.js").Values | undefined) => Platform.UIString.LocalizedString;
export declare const i18nFormatString: (stringId: string, placeholders: Record<string, Object>) => HTMLSpanElement;
export type View = (input: object, output: object, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class IPProtectionView extends UI.Widget.VBox {
    #private;
    constructor(element?: HTMLElement, view?: View);
    performUpdate(): void;
}
