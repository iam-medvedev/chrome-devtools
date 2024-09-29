// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as UI from '../../ui/legacy/legacy.js';
export class SecurityPanelSidebarTreeElement extends UI.TreeOutline.TreeElement {
    securityPanel;
    constructor(securityPanel, title = '', expandable = false) {
        super(title, expandable);
        this.securityPanel = securityPanel;
        UI.ARIAUtils.setLabel(this.listItemElement, title);
    }
    showView(view) {
        if (this.securityPanel) {
            this.securityPanel.setVisibleView(view);
        }
    }
}
//# sourceMappingURL=SecurityPanelSidebarTreeElement.js.map