// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { SecurityPanelSidebarTreeElement } from './SecurityPanelSidebarTreeElement.js';
export class OriginTreeElement extends SecurityPanelSidebarTreeElement {
    #securityStateInternal;
    #onSelect;
    #renderTreeElement;
    #originInternal = null;
    constructor(className, onSelect, renderTreeElement, origin = null, securityPanel = undefined) {
        super(securityPanel);
        this.#onSelect = onSelect;
        this.#renderTreeElement = renderTreeElement;
        this.#originInternal = origin;
        this.listItemElement.classList.add(className);
        this.#securityStateInternal = null;
        this.setSecurityState("unknown" /* Protocol.Security.SecurityState.Unknown */);
    }
    setSecurityState(newSecurityState) {
        this.#securityStateInternal = newSecurityState;
        this.#renderTreeElement(this);
    }
    securityState() {
        return this.#securityStateInternal;
    }
    origin() {
        return this.#originInternal;
    }
    onselect() {
        this.#onSelect();
        return true;
    }
}
//# sourceMappingURL=OriginTreeElement.js.map