// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-imperative-dom-api */
import * as Root from '../../core/root/root.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
import { AXNodeSubPane } from './AccessibilityNodeView.js';
import { ARIAAttributesPane } from './ARIAAttributesView.js';
import { AXBreadcrumbsPane } from './AXBreadcrumbsPane.js';
import { SourceOrderPane } from './SourceOrderView.js';
let accessibilitySidebarViewInstance;
export class AccessibilitySidebarView extends UI.ThrottledWidget.ThrottledWidget {
    nodeInternal;
    axNodeInternal;
    skipNextPullNode;
    sidebarPaneStack;
    breadcrumbsSubPane = null;
    ariaSubPane;
    axNodeSubPane;
    sourceOrderSubPane;
    constructor(throttlingTimeout) {
        super(false /* useShadowDom */, throttlingTimeout);
        this.nodeInternal = null;
        this.axNodeInternal = null;
        this.skipNextPullNode = false;
        this.sidebarPaneStack = UI.ViewManager.ViewManager.instance().createStackLocation();
        this.breadcrumbsSubPane = new AXBreadcrumbsPane(this);
        void this.sidebarPaneStack.showView(this.breadcrumbsSubPane);
        this.ariaSubPane = new ARIAAttributesPane();
        void this.sidebarPaneStack.showView(this.ariaSubPane);
        this.axNodeSubPane = new AXNodeSubPane();
        void this.sidebarPaneStack.showView(this.axNodeSubPane);
        this.sourceOrderSubPane = new SourceOrderPane();
        void this.sidebarPaneStack.showView(this.sourceOrderSubPane);
        this.sidebarPaneStack.widget().show(this.element);
        UI.Context.Context.instance().addFlavorChangeListener(SDK.DOMModel.DOMNode, this.pullNode, this);
        this.pullNode();
    }
    static instance(opts) {
        if (!accessibilitySidebarViewInstance || opts?.forceNew) {
            accessibilitySidebarViewInstance = new AccessibilitySidebarView(opts?.throttlingTimeout);
        }
        return accessibilitySidebarViewInstance;
    }
    node() {
        return this.nodeInternal;
    }
    axNode() {
        return this.axNodeInternal;
    }
    setNode(node, fromAXTree) {
        this.skipNextPullNode = Boolean(fromAXTree);
        this.nodeInternal = node;
        this.update();
    }
    accessibilityNodeCallback(axNode) {
        if (!axNode) {
            return;
        }
        this.axNodeInternal = axNode;
        if (axNode.isDOMNode()) {
            void this.sidebarPaneStack.showView(this.ariaSubPane, this.axNodeSubPane);
        }
        else {
            this.sidebarPaneStack.removeView(this.ariaSubPane);
        }
        if (this.axNodeSubPane) {
            this.axNodeSubPane.setAXNode(axNode);
        }
        if (this.breadcrumbsSubPane) {
            this.breadcrumbsSubPane.setAXNode(axNode);
        }
    }
    async doUpdate() {
        const node = this.node();
        this.axNodeSubPane.setNode(node);
        this.ariaSubPane.setNode(node);
        if (this.breadcrumbsSubPane) {
            this.breadcrumbsSubPane.setNode(node);
        }
        void this.sourceOrderSubPane.setNodeAsync(node);
        if (!node) {
            return;
        }
        const accessibilityModel = node.domModel().target().model(SDK.AccessibilityModel.AccessibilityModel);
        if (!accessibilityModel) {
            return;
        }
        if (!Root.Runtime.experiments.isEnabled('full-accessibility-tree')) {
            accessibilityModel.clear();
        }
        await accessibilityModel.requestPartialAXTree(node);
        this.accessibilityNodeCallback(accessibilityModel.axNodeForDOMNode(node));
    }
    wasShown() {
        super.wasShown();
        // Pull down the latest date for this node.
        void this.doUpdate();
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.AttrModified, this.onNodeChange, this, { scoped: true });
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.AttrRemoved, this.onNodeChange, this, { scoped: true });
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.CharacterDataModified, this.onNodeChange, this, { scoped: true });
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.ChildNodeCountUpdated, this.onNodeChange, this, { scoped: true });
    }
    willHide() {
        SDK.TargetManager.TargetManager.instance().removeModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.AttrModified, this.onNodeChange, this);
        SDK.TargetManager.TargetManager.instance().removeModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.AttrRemoved, this.onNodeChange, this);
        SDK.TargetManager.TargetManager.instance().removeModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.CharacterDataModified, this.onNodeChange, this);
        SDK.TargetManager.TargetManager.instance().removeModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.ChildNodeCountUpdated, this.onNodeChange, this);
    }
    pullNode() {
        if (this.skipNextPullNode) {
            this.skipNextPullNode = false;
            return;
        }
        this.setNode(UI.Context.Context.instance().flavor(SDK.DOMModel.DOMNode));
    }
    onNodeChange(event) {
        if (!this.node()) {
            return;
        }
        const data = event.data;
        const node = (data instanceof SDK.DOMModel.DOMNode ? data : data.node);
        if (this.node() !== node) {
            return;
        }
        this.update();
    }
}
//# sourceMappingURL=AccessibilitySidebarView.js.map