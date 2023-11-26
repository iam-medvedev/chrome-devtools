import type * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as LegacyWrapper from '../../ui/components/legacy_wrapper/legacy_wrapper.js';
export declare const i18nString: (id: string, values?: import("../../core/i18n/i18nTypes.js").Values | undefined) => Common.UIString.LocalizedString;
export declare class AutofillView extends LegacyWrapper.LegacyWrapper.WrappableComponent implements SDK.TargetManager.SDKModelObserver<SDK.AutofillModel.AutofillModel> {
    #private;
    static readonly litTagName: import("../../ui/lit-html/static.js").Static;
    connectedCallback(): void;
    modelAdded(model: SDK.AutofillModel.AutofillModel): void;
    modelRemoved(model: SDK.AutofillModel.AutofillModel): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-autofill-view': AutofillView;
    }
}
