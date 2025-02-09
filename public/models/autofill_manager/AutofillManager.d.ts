import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
export declare class AutofillManager extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    #private;
    private constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    }): AutofillManager;
    onShowAutofillTestAddressesSettingsChanged(): void;
    getLastFilledAddressForm(): AddressFormFilledEvent | null;
}
export interface Match {
    startIndex: number;
    endIndex: number;
    filledFieldIndex: number;
}
export declare const enum Events {
    ADDRESS_FORM_FILLED = "AddressFormFilled"
}
export interface AddressFormFilledEvent {
    address: string;
    filledFields: Protocol.Autofill.FilledField[];
    matches: Match[];
    autofillModel: SDK.AutofillModel.AutofillModel;
}
export interface EventTypes {
    [Events.ADDRESS_FORM_FILLED]: AddressFormFilledEvent;
}
