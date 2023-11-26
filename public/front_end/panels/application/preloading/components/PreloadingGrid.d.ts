import * as Common from '../../../../core/common/common.js';
import * as SDK from '../../../../core/sdk/sdk.js';
import * as LegacyWrapper from '../../../../ui/components/legacy_wrapper/legacy_wrapper.js';
import type * as Platform from '../../../../core/platform/platform.js';
import type * as UI from '../../../../ui/legacy/legacy.js';
import type * as Protocol from '../../../../generated/protocol.js';
export declare const i18nString: (id: string, values?: import("../../../../core/i18n/i18nTypes.js").Values | undefined) => Common.UIString.LocalizedString;
export interface PreloadingGridData {
    rows: PreloadingGridRow[];
    pageURL: Platform.DevToolsPath.UrlString;
}
export interface PreloadingGridRow {
    id: string;
    attempt: SDK.PreloadingModel.PreloadingAttempt;
    ruleSets: Protocol.Preload.RuleSet[];
}
export declare class PreloadingGrid extends LegacyWrapper.LegacyWrapper.WrappableComponent<UI.Widget.VBox> {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    connectedCallback(): void;
    update(data: PreloadingGridData): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-resources-preloading-grid': PreloadingGrid;
    }
}
