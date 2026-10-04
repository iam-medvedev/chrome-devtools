// Copyright 2015 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../ui/components/switch/switch.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Root from '../../core/root/root.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
import { AccessibilityAnnouncementRecordingView, } from './AccessibilityAnnouncementRecordingView.js';
import { AXNodeSubPane } from './AccessibilityNodeView.js';
import accessibilitySidebarViewStyles from './accessibilitySidebarView.css.js';
import { ARIAAttributesPane } from './ARIAAttributesView.js';
import { SourceOrderPane } from './SourceOrderView.js';
const { html, nothing, render } = Lit;
const { widget } = UI.Widget;
const UIStrings = {
    /**
     * @description Text for a toggle to turn on the accessibility tree view.
     */
    showAccessibilityTree: 'Show accessibility tree',
};
const str_ = i18n.i18n.registerUIStrings('panels/accessibility/AccessibilitySidebarView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export const DEFAULT_VIEW = (input, _output, target) => {
    // clang-format off
    render(html `
      <style>${accessibilitySidebarViewStyles}</style>
      <div class="accessibility-toggle-container">
        <div style="display: flex; align-items: center; gap: 8px;">
          <devtools-switch
            role="switch"
            aria-label=${i18nString(UIStrings.showAccessibilityTree)}
            .checked=${input.isToggled}
            .label=${i18nString(UIStrings.showAccessibilityTree)}
            .jslogContext=${'elements.toggle-a11y-tree'}
            @switchchange=${input.onToggleChange}
          ></devtools-switch>
          <span style="color: var(--sys-color-on-surface);">${i18nString(UIStrings.showAccessibilityTree)}</span>
        </div>
      </div>
      <devtools-stack-pane .isVisible=${input.isToggled}>
        ${input.showAriaSubPane ? html `
          <devtools-widget
            ${widget(ARIAAttributesPane, { node: input.node })}></devtools-widget>` : nothing}
        <devtools-widget
          ${widget(AXNodeSubPane, { node: input.node, axNode: input.axNode })}></devtools-widget>
        <devtools-widget
          ${widget(SourceOrderPane, { node: input.node })}></devtools-widget>
        ${input.showAnnouncementsRecordingSubPane
        ? html `<devtools-widget ${widget(AccessibilityAnnouncementRecordingView)}></devtools-widget>`
        : nothing}
      </devtools-stack-pane>
    `, target, { container: { classes: ['accessibility-sidebar-view'] } });
    // clang-format on
};
let accessibilitySidebarViewInstance;
export class AccessibilitySidebarView extends UI.Widget.VBox {
    #view;
    #node;
    #axNode;
    #showAriaSubPane = true;
    skipNextPullNode;
    toggleAction;
    constructor(view = DEFAULT_VIEW) {
        super();
        this.#view = view;
        this.#node = null;
        this.#axNode = null;
        this.skipNextPullNode = false;
        this.toggleAction = UI.ActionRegistry.ActionRegistry.instance().getAction('elements.toggle-a11y-tree');
        this.toggleAction.addEventListener("Toggled" /* UI.ActionRegistration.Events.TOGGLED */, this.requestUpdate, this);
        UI.Context.Context.instance().addFlavorChangeListener(SDK.DOMModel.DOMNode, this.pullNode, this);
        this.pullNode();
    }
    static instance(opts) {
        if (!accessibilitySidebarViewInstance || opts?.forceNew) {
            accessibilitySidebarViewInstance = new AccessibilitySidebarView(opts?.view);
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
        if (this.#axNode !== axNode) {
            this.#axNode = axNode;
            this.#showAriaSubPane = axNode.isDOMNode();
            this.requestUpdate();
        }
    }
    performUpdate() {
        void this.#updateSubPanes(this.node());
        this.#view({
            isToggled: this.toggleAction.toggled(),
            onToggleChange: this.onToggleChange,
            node: this.node(),
            axNode: this.#axNode,
            showAriaSubPane: this.#showAriaSubPane,
            showAnnouncementsRecordingSubPane: Boolean(Root.Runtime.hostConfig.devToolsAriaLiveRecording?.enabled),
        }, undefined, this.contentElement);
    }
    async #updateSubPanes(node) {
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
        // Pull down the latest data for this node.
        this.requestUpdate();
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
    onToggleChange = (_event) => {
        void this.toggleAction.execute();
    };
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