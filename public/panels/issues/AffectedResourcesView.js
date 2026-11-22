// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Logs from '../../models/logs/logs.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as UI from '../../ui/legacy/legacy.js';
import { Directives, html, nothing, render } from '../../ui/lit/lit.js';
import * as PanelsCommon from '../common/common.js';
const { classMap, ref } = Directives;
const { widget } = UI.Widget;
const UIStrings = {
    /**
     * @description Fallback text in the Issues panel when a frame URL is unknown in the affected resources table.
     */
    unknown: 'Unknown',
    /**
     * @description Tooltip in the Issues panel for the button to reveal a frame's DOM node in the Elements panel.
     */
    clickToRevealTheFramesDomNodeIn: 'Click to reveal the frame’s DOM node in the Elements panel',
    /**
     * @description Fallback text in the Issues panel when an HTML element is unavailable in the affected resources table.
     */
    unavailable: 'Unavailable',
};
const str_ = i18n.i18n.registerUIStrings('panels/issues/AffectedResourcesView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export var AffectedItem;
(function (AffectedItem) {
    AffectedItem["COOKIE"] = "Cookie";
    AffectedItem["DIRECTIVE"] = "Directive";
    AffectedItem["ELEMENT"] = "Element";
    AffectedItem["REQUEST"] = "Request";
    AffectedItem["SOURCE"] = "Source";
})(AffectedItem || (AffectedItem = {}));
export const extractShortPath = (path) => {
    // 1st regex matches everything after last '/'
    // if path ends with '/', 2nd regex returns everything between the last two '/'
    return (/[^/]+$/.exec(path) || /[^/]+\/$/.exec(path) || [''])[0];
};
export function renderElementCell(element) {
    const { deferredNode } = element;
    if (!deferredNode) {
        return html `<td>${element.nodeName || i18nString(UIStrings.unavailable)}</td>`;
    }
    // clang-format off
    return html `
    <td class="affected-resource-element devtools-link">${widget(PanelsCommon.DOMLinkifier.DeferredDOMNodeLink, {
        deferredNode,
        options: { textContent: element.nodeName || undefined, onClick: element.onElementClick },
    })}</td>
  `;
    // clang-format on
}
export function renderFrameCell(frame) {
    if (!frame) {
        return html `<td></td>`;
    }
    // clang-format off
    return html `
    <td class="affected-resource-cell"
        @mouseenter=${frame.onMouseEnter}
        @mouseleave=${frame.onMouseLeave}>
      ${frame.hasFrame ? html `
        <devtools-button
          class="elements-panel"
          .data=${{
        variant: "icon" /* Buttons.Button.Variant.ICON */,
        iconName: 'code-circle',
        // On devtools-button (ui/components/buttons/button.css), Size.MICRO sets both
        // --button-width/--button-height and --icon-size to --sys-size-8 (16x16),
        // matching the previous 16x16 medium icon size.
        size: "MICRO" /* Buttons.Button.Size.MICRO */,
        title: i18nString(UIStrings.clickToRevealTheFramesDomNodeIn),
        accessibleLabel: i18nString(UIStrings.clickToRevealTheFramesDomNodeIn),
        jslogContext: 'elements-panel',
    }}
          @click=${frame.onReveal}>
        </devtools-button>
      ` : nothing}
      ${frame.url}
    </td>
  `;
    // clang-format on
}
export const DEFAULT_VIEW = (input, _output, target) => {
    const labelClasses = { 'affected-resource-label': true };
    if (input.labelClass) {
        labelClasses[input.labelClass] = true;
    }
    render(html `<div class=${classMap(labelClasses)}>${input.resourceNameWithCount}</div>`, target);
};
export const TABLE_VIEW = (input, _output, target) => {
    render(html `<table class="affected-resource-list" ${ref(e => {
        if (e instanceof HTMLTableElement) {
            input.onTableRef(e);
        }
    })}></table>`, target);
};
/**
 * The base class for all affected resource views. It provides basic scaffolding
 * as well as machinery for resolving request and frame ids to SDK objects.
 */
export class AffectedResourcesView extends UI.TreeOutline.TreeElement {
    #parentView;
    #view;
    issue;
    affectedResources;
    #affectedResourcesCount = 0;
    #resourceNameWithCount = '';
    #frameListeners = [];
    #unresolvedFrameIds = new Set();
    requestResolver;
    constructor(parent, issue, jslogContext, view = DEFAULT_VIEW, tableView = TABLE_VIEW) {
        super(/* title */ undefined, /* expandable */ undefined, jslogContext);
        this.#parentView = parent;
        this.#view = view;
        this.issue = issue;
        this.toggleOnClick = true;
        this.#render();
        // eslint-disable-next-line @devtools/no-imperative-dom-api
        const body = new UI.TreeOutline.TreeElement();
        let table;
        tableView({
            onTableRef: el => {
                table = el;
            },
        }, undefined, body.listItemElement);
        if (!table) {
            throw new Error('The affected resources table view did not render a table');
        }
        this.appendChild(body);
        this.affectedResources = table;
        this.requestResolver = new Logs.RequestResolver.RequestResolver(Logs.NetworkLog.NetworkLog.instance());
    }
    setIssue(issue) {
        this.issue = issue;
    }
    #render() {
        const input = {
            resourceNameWithCount: this.#resourceNameWithCount,
            labelClass: this.getAffectedResourcesLabelClass(),
        };
        this.#view(input, undefined, this.listItemElement);
    }
    getAffectedResourcesLabelClass() {
        return undefined;
    }
    updateAffectedResourceCount(count) {
        this.#affectedResourcesCount = count;
        this.#resourceNameWithCount = this.getResourceNameWithCount(count);
        this.#render();
        this.hidden = this.#affectedResourcesCount === 0;
        this.#parentView.updateAffectedResourceVisibility();
    }
    isEmpty() {
        return this.#affectedResourcesCount === 0;
    }
    clear() {
        this.requestResolver.clear();
    }
    expandIfOneResource() {
        if (this.#affectedResourcesCount === 1) {
            this.expand();
        }
    }
    /**
     * This function resolves a frameId to a ResourceTreeFrame. If the frameId does not resolve, or hasn't navigated yet,
     * a listener is installed that takes care of updating the view if the frame is added. This is useful if the issue is
     * added before the frame gets reported.
     */
    #resolveFrameId(frameId) {
        const frame = SDK.FrameManager.FrameManager.instance().getFrame(frameId);
        if (!frame?.url) {
            this.#unresolvedFrameIds.add(frameId);
            if (!this.#frameListeners.length) {
                const addListener = SDK.FrameManager.FrameManager.instance().addEventListener("FrameAddedToTarget" /* SDK.FrameManager.Events.FRAME_ADDED_TO_TARGET */, this.#onFrameChanged, this);
                const navigateListener = SDK.FrameManager.FrameManager.instance().addEventListener("FrameNavigated" /* SDK.FrameManager.Events.FRAME_NAVIGATED */, this.#onFrameChanged, this);
                this.#frameListeners = [addListener, navigateListener];
            }
        }
        return frame;
    }
    #onFrameChanged(event) {
        const frame = event.data.frame;
        if (!frame.url) {
            return;
        }
        const frameWasUnresolved = this.#unresolvedFrameIds.delete(frame.id);
        if (this.#unresolvedFrameIds.size === 0 && this.#frameListeners.length) {
            // Stop listening once all requests are resolved.
            Common.EventTarget.removeEventListeners(this.#frameListeners);
            this.#frameListeners = [];
        }
        if (frameWasUnresolved) {
            this.update();
        }
    }
    createFrameCellData(frameId, issueCategory) {
        const frame = this.#resolveFrameId(frameId);
        const url = frame && (frame.unreachableUrl() || frame.url) || i18nString(UIStrings.unknown);
        return {
            url,
            hasFrame: Boolean(frame),
            onReveal: async () => {
                Host.userMetrics.issuesPanelResourceOpened(issueCategory, "Element" /* AffectedItem.ELEMENT */);
                const currentFrame = SDK.FrameManager.FrameManager.instance().getFrame(frameId);
                if (currentFrame) {
                    const ownerNode = await currentFrame.getOwnerDOMNodeOrDocument();
                    if (ownerNode) {
                        void Common.Revealer.reveal(ownerNode);
                    }
                }
            },
            onMouseEnter: () => {
                const currentFrame = SDK.FrameManager.FrameManager.instance().getFrame(frameId);
                if (currentFrame) {
                    void currentFrame.highlight();
                }
            },
            onMouseLeave: () => {
                SDK.OverlayModel.OverlayModel.hideDOMNodeHighlight(SDK.TargetManager.TargetManager.instance());
            },
        };
    }
    createElementCellData({ backendNodeId, nodeName, target }, issueCategory) {
        return {
            nodeName,
            deferredNode: target ? new SDK.DOMModel.DeferredDOMNode(target, backendNodeId) : undefined,
            onElementClick: () => {
                Host.userMetrics.issuesPanelResourceOpened(issueCategory, "Element" /* AffectedItem.ELEMENT */);
            },
        };
    }
}
//# sourceMappingURL=AffectedResourcesView.js.map