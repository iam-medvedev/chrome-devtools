// Copyright 2016 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { SDKModel } from './SDKModel.js';
export class SecurityOriginManager extends SDKModel {
    // if a URL is unreachable, the browser will jump to an error page at
    // 'chrome-error://chromewebdata/', and |this.#mainSecurityOriginInternal| stores
    // its origin. In this situation, the original unreachable URL's security
    // origin will be stored in |this.#unreachableMainSecurityOriginInternal|.
    #mainSecurityOriginInternal = '';
    #unreachableMainSecurityOriginInternal = '';
    #securityOriginsInternal = new Set();
    updateSecurityOrigins(securityOrigins) {
        const oldOrigins = this.#securityOriginsInternal;
        this.#securityOriginsInternal = securityOrigins;
        for (const origin of oldOrigins) {
            if (!this.#securityOriginsInternal.has(origin)) {
                this.dispatchEventToListeners(Events.SecurityOriginRemoved, origin);
            }
        }
        for (const origin of this.#securityOriginsInternal) {
            if (!oldOrigins.has(origin)) {
                this.dispatchEventToListeners(Events.SecurityOriginAdded, origin);
            }
        }
    }
    securityOrigins() {
        return [...this.#securityOriginsInternal];
    }
    mainSecurityOrigin() {
        return this.#mainSecurityOriginInternal;
    }
    unreachableMainSecurityOrigin() {
        return this.#unreachableMainSecurityOriginInternal;
    }
    setMainSecurityOrigin(securityOrigin, unreachableSecurityOrigin) {
        this.#mainSecurityOriginInternal = securityOrigin;
        this.#unreachableMainSecurityOriginInternal = unreachableSecurityOrigin || null;
        this.dispatchEventToListeners(Events.MainSecurityOriginChanged, {
            mainSecurityOrigin: this.#mainSecurityOriginInternal,
            unreachableMainSecurityOrigin: this.#unreachableMainSecurityOriginInternal,
        });
    }
}
export var Events;
(function (Events) {
    /* eslint-disable @typescript-eslint/naming-convention -- Used by web_tests. */
    Events["SecurityOriginAdded"] = "SecurityOriginAdded";
    Events["SecurityOriginRemoved"] = "SecurityOriginRemoved";
    Events["MainSecurityOriginChanged"] = "MainSecurityOriginChanged";
    /* eslint-enable @typescript-eslint/naming-convention */
})(Events || (Events = {}));
// TODO(jarhar): this is the one of the two usages of Capability.None. Do something about it!
SDKModel.register(SecurityOriginManager, { capabilities: 0 /* Capability.NONE */, autostart: false });
//# sourceMappingURL=SecurityOriginManager.js.map