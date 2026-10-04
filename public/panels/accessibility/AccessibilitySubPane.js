// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable @devtools/no-imperative-dom-api */
import objectValueStyles from '../../ui/legacy/components/object_ui/objectValue.css.js';
import * as UI from '../../ui/legacy/legacy.js';
import accessibilityNodeStyles from './accessibilityNode.css.js';
import accessibilityPropertiesStyles from './accessibilityProperties.css.js';
export class AccessibilitySubPane extends UI.View.SimpleView {
    axNodeInternal = null;
    nodeInternal = null;
    constructor(element, options) {
        if (element) {
            super(element, options);
        }
        else {
            super(options);
        }
        this.registerRequiredCSS(accessibilityPropertiesStyles);
    }
    get axNode() {
        return this.axNodeInternal;
    }
    set axNode(axNode) {
        this.setAXNode(axNode);
    }
    setAXNode(axNode) {
        this.axNodeInternal = axNode;
    }
    get node() {
        return this.nodeInternal;
    }
    set node(node) {
        this.setNode(node);
    }
    setNode(node) {
        this.nodeInternal = node;
    }
    createInfo(textContent, ...classNames) {
        const info = new UI.EmptyWidget.EmptyWidget(textContent);
        if (classNames.length === 0) {
            classNames.push('gray-info-message');
        }
        info.element.classList.add(...classNames, 'info-message-overflow');
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