// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as UI from '../../ui/legacy/legacy.js';
export class SecurityPanelSidebarTreeElement extends UI.TreeOutline.TreeElement {
    constructor(title = '', expandable = false, jslogContext) {
        super(title, expandable, jslogContext);
        UI.ARIAUtils.setLabel(this.listItemElement, title);
    }
}
//# sourceMappingURL=SecurityPanelSidebarTreeElement.js.map