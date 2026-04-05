// Copyright 2015 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable @devtools/no-imperative-dom-api */
import '../../ui/components/switch/switch.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
import { AXNodeSubPane } from './AccessibilityNodeView.js';
import accessibilitySidebarViewStyles from './accessibilitySidebarView.css.js';
import { ARIAAttributesPane } from './ARIAAttributesView.js';
import { SourceOrderPane } from './SourceOrderView.js';
const { html, render } = Lit;
const UIStrings = {
    /**
     * @description Text for a toggle to turn on the accessibility tree view.
     */
    showAccessibilityTree: 'Show accessibility tree',
};
const str_ = i18n.i18n.registerUIStrings('panels/accessibility/AccessibilitySidebarView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
let accessibilitySidebarViewInstance;
export class AccessibilitySidebarView extends UI.Widget.VBox {
    #node;
    #axNode;
    skipNextPullNode;
    sidebarPaneStack;
    ariaSubPane;
    axNodeSubPane;
    sourceOrderSubPane;
    toggleContainer;
    toggleAction;
    constructor() {
        super();
        this.registerRequiredCSS(accessibilitySidebarViewStyles);
        this.element.classList.add('accessibility-sidebar-view');
        this.#node = null;
        this.#axNode = null;
        this.skipNextPullNode = false;
        this.sidebarPaneStack = UI.ViewManager.ViewManager.instance().createStackLocation();
        this.toggleContainer = document.createElement('div');
        this.toggleContainer.classList.add('accessibility-toggle-container');
        this.element.appendChild(this.toggleContainer);
        this.toggleAction = UI.ActionRegistry.ActionRegistry.instance().getAction('elements.toggle-a11y-tree');
        this.toggleAction.addEventListener("Toggled" /* UI.ActionRegistration.Events.TOGGLED */, this.updateToggle, this);
        this.updateToggle();
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
            accessibilitySidebarViewInstance = new AccessibilitySidebarView();
        }
        return accessibilitySidebarViewInstance;
    }
    node() {
        return this.#node;
    }
    axNode() {
        return this.#axNode;
    }
    setNode(node, fromAXTree) {
        this.skipNextPullNode = Boolean(fromAXTree);
        this.#node = node;
        this.requestUpdate();
    }
    accessibilityNodeCallback(axNode) {
        if (!axNode) {
            return;
        }
        this.#axNode = axNode;
        if (axNode.isDOMNode()) {
            void this.sidebarPaneStack.showView(this.ariaSubPane, this.axNodeSubPane);
        }
        else {
            this.sidebarPaneStack.removeView(this.ariaSubPane);
        }
        this.axNodeSubPane.setAXNode(axNode);
    }
    async performUpdate() {
        const node = this.node();
        this.axNodeSubPane.setNode(node);
        this.ariaSubPane.setNode(node);
        void this.sourceOrderSubPane.setNodeAsync(node);
        if (!node) {
            return;
        }
        const accessibilityModel = node.domModel().target().model(SDK.AccessibilityModel.AccessibilityModel);
        if (!accessibilityModel) {
            return;
        }
        await accessibilityModel.requestPartialAXTree(node);
        this.accessibilityNodeCallback(accessibilityModel.axNodeForDOMNode(node));
    }
    wasShown() {
        super.wasShown();
        // Pull down the latest date for this node.
        void this.performUpdate();
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.AttrModified, this.onNodeChange, this, { scoped: true });
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.AttrRemoved, this.onNodeChange, this, { scoped: true });
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.CharacterDataModified, this.onNodeChange, this, { scoped: true });
        SDK.TargetManager.TargetManager.instance().addModelListener(SDK.DOMModel.DOMModel, SDK.DOMModel.Events.ChildNodeCountUpdated, this.onNodeChange, this, { scoped: true });
    }
    willHide() {
        super.willHide();
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
    updateToggle() {
        const isToggled = this.toggleAction.toggled();
        // eslint-disable-next-line @devtools/no-lit-render-outside-of-view
        render(html `
      <div style="display: flex; align-items: center; gap: 8px;">
        <devtools-switch
          role="switch"
          aria-label=${i18nString(UIStrings.showAccessibilityTree)}
          .checked=${isToggled}
          .label=${i18nString(UIStrings.showAccessibilityTree)}
          .jslogContext=${'elements.toggle-a11y-tree'}
          @switchchange=${this.onToggleChange}
        ></devtools-switch>
        <span style="color: var(--sys-color-on-surface);">${i18nString(UIStrings.showAccessibilityTree)}</span>
      </div>
    `, this.toggleContainer, { host: this });
    }
    onToggleChange(_event) {
        void this.toggleAction.execute();
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
        this.requestUpdate();
    }
}
//# sourceMappingURL=AccessibilitySidebarView.js.map