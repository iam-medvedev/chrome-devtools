import '../../ui/kit/kit.js';
import '../../ui/components/adorners/adorners.js';
import '../../ui/legacy/components/data_grid/data_grid.js';
import * as Common from '../../core/common/common.js';
import * as Protocol from '../../generated/protocol.js';
import * as AutofillManager from '../../models/autofill_manager/autofill_manager.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare const i18nString: (id: string, values?: import("../../core/i18n/i18nTypes.js").Values | undefined) => Common.UIString.LocalizedString;
interface ViewInput {
    autoOpenViewSetting: Common.Settings.Setting<boolean>;
    showTestAddressesInAutofillMenuSetting: Common.Settings.Setting<boolean>;
    address: string;
    filledFields: Protocol.Autofill.FilledField[];
    matches: AutofillManager.AutofillManager.Match[];
    highlightedMatches: AutofillManager.AutofillManager.Match[];
    onHighlightMatchesInAddress: (startIndex: number) => void;
    onHighlightMatchesInFilledFiels: (rowIndex: number) => void;
    onClearHighlightedMatches: () => void;
}
type ViewOutput = unknown;
type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare class AutofillView extends UI.Widget.VBox {
    #private;
    constructor(autofillManager?: AutofillManager.AutofillManager.AutofillManager, view?: View);
    wasShown(): void;
    willHide(): void;
    performUpdate(): Promise<void> | void;
}
export {};
