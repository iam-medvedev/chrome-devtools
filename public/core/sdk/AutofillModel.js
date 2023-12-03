// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../host/host.js';
import { SDKModel } from './SDKModel.js';
import { Capability } from './Target.js';
export class AutofillModel extends SDKModel {
    agent;
    #enabled;
    constructor(target) {
        super(target);
        this.agent = target.autofillAgent();
        target.registerAutofillDispatcher(this);
        this.enable();
    }
    enable() {
        if (this.#enabled || Host.InspectorFrontendHost.isUnderTest()) {
            return;
        }
        void this.agent.invoke_enable();
        this.#enabled = true;
    }
    disable() {
        if (!this.#enabled || Host.InspectorFrontendHost.isUnderTest()) {
            return;
        }
        this.#enabled = false;
        void this.agent.invoke_disable();
    }
    addressFormFilled(addressFormFilledEvent) {
        this.dispatchEventToListeners(Events.AddressFormFilled, { autofillModel: this, event: addressFormFilledEvent });
    }
}
SDKModel.register(AutofillModel, { capabilities: Capability.DOM, autostart: true });
// TODO(crbug.com/1167717): Make this a const enum again
// eslint-disable-next-line rulesdir/const_enum
export var Events;
(function (Events) {
    Events["AddressFormFilled"] = "AddressFormFilled";
})(Events || (Events = {}));
//# sourceMappingURL=AutofillModel.js.map