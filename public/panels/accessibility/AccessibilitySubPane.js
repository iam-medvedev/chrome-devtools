// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-imperative-dom-api */
// eslint-disable-next-line rulesdir/es-modules-import
import objectValueStyles from '../../ui/legacy/components/object_ui/objectValue.css.js';
import * as UI from '../../ui/legacy/legacy.js';
import accessibilityNodeStyles from './accessibilityNode.css.js';
import accessibilityPropertiesStyles from './accessibilityProperties.css.js';
export class AccessibilitySubPane extends UI.View.SimpleView {
    axNode;
    nodeInternal;
    constructor(options) {
        super(options);
        this.registerRequiredCSS(accessibilityPropertiesStyles);
        this.axNode = null;
    }
    setAXNode(_axNode) {
    }
    node() {
        return this.nodeInternal || null;
    }
    setNode(node) {
        this.nodeInternal = node;
    }
    createInfo(textContent, className) {
        const info = this.element.createChild('div', className || 'gray-info-message');
        info.classList.add('info-message-overflow');
        info.textContent = textContent;
        return info;
    }
    createTreeOutline() {
        const treeOutline = new UI.TreeOutline.TreeOutlineInShadow();
        treeOutline.registerRequiredCSS(accessibilityNodeStyles, accessibilityPropertiesStyles, objectValueStyles);
        treeOutline.element.classList.add('hidden');
        treeOutline.setHideOverflow(true);
        this.element.appendChild(treeOutline.element);
        return treeOutline;
    }
}
//# sourceMappingURL=AccessibilitySubPane.js.map