import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
export declare class AutofillManager extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    #private;
    private constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    }): AutofillManager;
    getLastFilledAddressForm(): SDK.AutofillModel.AddressFormFilledEvent | null;
}
export declare enum Events {
    AddressFormFilled = "AddressFormFilled"
}
export interface AddressFormFilledEvent {
    autofillModel: SDK.AutofillModel.AutofillModel;
    event: Protocol.Autofill.AddressFormFilledEvent;
}
export type EventTypes = {
    [Events.AddressFormFilled]: AddressFormFilledEvent;
};
