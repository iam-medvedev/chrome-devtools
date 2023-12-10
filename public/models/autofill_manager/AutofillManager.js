// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
let autofillManagerInstance;
export class AutofillManager extends Common.ObjectWrapper.ObjectWrapper {
    #addressFormFilledEvent = null;
    #autoOpenViewSetting;
    constructor() {
        super();
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.AutofillModel.AutofillModel, SDK.AutofillModel.Events.AddressFormFilled, this.#addressFormFilled, this, { scoped: true });
        this.#autoOpenViewSetting = Common.Settings.Settings.instance().createSetting('autoOpenAutofillViewOnEvent', true);
    }
    static instance(opts = { forceNew: null }) {
        const { forceNew } = opts;
        if (!autofillManagerInstance || forceNew) {
            autofillManagerInstance = new AutofillManager();
        }
        return autofillManagerInstance;
    }
    async #addressFormFilled({ data }) {
        this.#addressFormFilledEvent = data;
        if (this.#autoOpenViewSetting.get()) {
            await UI.ViewManager.ViewManager.instance().showView('autofill-view');
        }
        this.dispatchEventToListeners(Events.AddressFormFilled, data);
    }
    getLastFilledAddressForm() {
        return this.#addressFormFilledEvent;
    }
}
// TODO(crbug.com/1167717): Make this a const enum again
// eslint-disable-next-line rulesdir/const_enum
export var Events;
(function (Events) {
    Events["AddressFormFilled"] = "AddressFormFilled";
})(Events || (Events = {}));
//# sourceMappingURL=AutofillManager.js.map