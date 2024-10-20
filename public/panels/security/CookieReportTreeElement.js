// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as IconButton from '../../ui/components/icon_button/icon_button.js';
import { SecurityPanelSidebarTreeElement } from './SecurityPanelSidebarTreeElement.js';
export class ShowCookieReportEvent extends Event {
    static eventName = 'showcookiereport';
    constructor() {
        super(ShowCookieReportEvent.eventName, { bubbles: true, composed: true });
    }
}
export class CookieReportTreeElement extends SecurityPanelSidebarTreeElement {
    constructor(title) {
        super(title);
        this.setLeadingIcons([IconButton.Icon.create('cookie', 'cookie-icon')]);
    }
    onselect() {
        this.listItemElement.dispatchEvent(new ShowCookieReportEvent());
        return true;
    }
}
//# sourceMappingURL=CookieReportTreeElement.js.map