// Copyright 2024 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../ui/legacy/components/data_grid/data_grid.js';
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import * as Elements from '../elements/elements.js';
import { ProfileType, } from './ProfileHeader.js';
import { WritableProfileHeader } from './WritableProfileHeader.js';
const { html, render } = Lit;
const { widget } = UI.Widget;
const UIStrings = {
    /**
     * @description Button text to get the detached elements retained by JavaScript.
     */
    startDetachedElements: 'Get detached elements',
    /**
     * @description The title for the collection of profiles that are gathered from various snapshots of the heap, using a sampling (e.g. every 1/100) technique.
     */
    detachedElementsTitle: 'Detached elements',
    /**
     * @description Description for the detached elements profiling option in the Memory panel.
     */
    detachedElementsDescription: 'Detached elements show objects retained by a JS reference',
    /**
     * @description Name of a profile.
     * @example {2} PH1
     */
    detachedElementProfile: 'Detached elements {PH1}',
    /**
     * @description Column header in detached elements table displaying detached DOM nodes.
     */
    detachedNodes: 'Detached nodes',
    /**
     * @description Column header in detached elements table displaying the number of detached DOM nodes.
     */
    nodeSize: 'Node count',
    /**
     * @description Label for the detached elements table.
     */
    detachedElementsList: 'Detached elements list',
};
const str_ = i18n.i18n.registerUIStrings('panels/profiler/HeapDetachedElementsView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export const DEFAULT_VIEW = (input, _output, target) => {
    // clang-format off
    render(html `
    <devtools-data-grid striped class="flex-auto" name=${i18nString(UIStrings.detachedElementsList)}>
      <table>
        <tr>
          <th id="detached-node">${i18nString(UIStrings.detachedNodes)}</th>
          <th id="detached-node-count">${i18nString(UIStrings.nodeSize)}</th>
        </tr>
        ${input.parsedElements.map(parsed => html `
          <tr jslog=${VisualLogging.tableRow('detached-element')}>
            <td>
              <devtools-widget
                ${widget(Elements.DOMTreeWidget.DOMTreeWidget, {
        omitRootDOMNode: false,
        selectEnabled: true,
        hideGutter: true,
        rootDOMNode: parsed.node,
        showSelectionOnKeyboardFocus: true,
        deindentSingleNode: true,
    })}
              ></devtools-widget>
            </td>
            <td>${parsed.nodeCount}</td>
          </tr>
        `)}
      </table>
    </devtools-data-grid>
  `, target);
    // clang-format on
};
function calculateDetachedNodeCount(treeNode) {
    if (!treeNode) {
        return 0;
    }
    let count = 1;
    const queue = [];
    let node;
    queue.push(treeNode);
    while (queue.length > 0) {
        node = queue.shift();
        if (!node) {
            break;
        }
        if (node.childNodeCount) {
            count += node.childNodeCount;
        }
        if (node.children) {
            for (const child of node.children) {
                queue.push(child);
            }
        }
    }
    return count;
}
export class DetachedElementsProfileView extends UI.View.SimpleView {
    #view;
    #parsedElements = [];
    profile;
    parentDataDisplayDelegate;
    constructor(dataDisplayDelegate, profile, view = DEFAULT_VIEW) {
        super({
            title: i18nString(UIStrings.detachedElementsTitle),
            viewId: 'detached-elements',
            classes: ['detached-elements-view'],
        });
        this.#view = view;
        this.profile = profile;
        this.parentDataDisplayDelegate = dataDisplayDelegate;
        this.populateElementsGrid(profile.detachedElements);
    }
    wasShown() {
        super.wasShown();
        this.requestUpdate();
    }
    performUpdate() {
        this.#view({ parsedElements: this.#parsedElements }, undefined, this.contentElement);
    }
    showProfile(profile) {
        return this.parentDataDisplayDelegate.showProfile(profile);
    }
    showObject(objectId, perspectiveName) {
        this.parentDataDisplayDelegate.showObject(objectId, perspectiveName);
    }
    async linkifyObject() {
        return null;
    }
    populateElementsGrid(detachedElements) {
        const domModel = this.profile.heapProfilerModel()?.target().model(SDK.DOMModel.DOMModel);
        if (!detachedElements || !domModel) {
            return;
        }
        this.#parsedElements = detachedElements.map(elementInfo => {
            const retainedNodeIds = new Set((elementInfo.retainedNodeIds ?? []));
            const node = SDK.DOMModel.DOMNode.create(domModel, null, false, elementInfo.treeNode, retainedNodeIds);
            node.detached = true;
            return { elementInfo, node, nodeCount: calculateDetachedNodeCount(elementInfo.treeNode) };
        });
        this.requestUpdate();
    }
}
const DetachedElementsProfileTypeBase = Common.ObjectWrapper.eventMixin(ProfileType);
export class DetachedElementsProfileType extends DetachedElementsProfileTypeBase {
    constructor(typeId, description) {
        super(typeId || i18nString(UIStrings.detachedElementsTitle), description || i18nString(UIStrings.detachedElementsTitle));
    }
    profileBeingRecorded() {
        return super.profileBeingRecorded();
    }
    get buttonTooltip() {
        return i18nString(UIStrings.startDetachedElements);
    }
    buttonClicked() {
        void this.getDetachedElements();
        return false;
    }
    async getDetachedElements() {
        if (this.profileBeingRecorded()) {
            return;
        }
        const heapProfilerModel = UI.Context.Context.instance().flavor(SDK.HeapProfilerModel.HeapProfilerModel);
        const target = heapProfilerModel?.target();
        const domModel = target?.model(SDK.DOMModel.DOMModel);
        if (!heapProfilerModel || !target || !domModel) {
            return;
        }
        const data = await domModel.getDetachedDOMNodes();
        const profile = new DetachedElementsProfileHeader(heapProfilerModel, this, data);
        this.addProfile(profile);
        this.dispatchEventToListeners("profile-complete" /* ProfileTypeEvents.PROFILE_COMPLETE */, profile);
    }
    get treeItemTitle() {
        return i18nString(UIStrings.detachedElementsTitle);
    }
    get description() {
        return i18nString(UIStrings.detachedElementsDescription);
    }
    isInstantProfile() {
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    static TypeId = 'DetachedElements';
}
(function (DetachedElementsProfileType) {
    let Events;
    (function (Events) {
        Events["RECORDING_STOPPED"] = "RecordingStopped";
        Events["STATS_UPDATE"] = "StatsUpdate";
        Events["DETACHED_ELEMENTS_OBTAINED"] = "DetachedElementsObtained";
    })(Events = DetachedElementsProfileType.Events || (DetachedElementsProfileType.Events = {}));
})(DetachedElementsProfileType || (DetachedElementsProfileType = {}));
export class DetachedElementsProfileHeader extends WritableProfileHeader {
    #heapProfilerModel;
    detachedElements;
    constructor(heapProfilerModel, type, detachedElements, title) {
        super(heapProfilerModel?.debuggerModel() ?? null, type, title || i18nString(UIStrings.detachedElementProfile, { PH1: type.nextProfileUid() }));
        this.detachedElements = detachedElements;
        this.#heapProfilerModel = heapProfilerModel;
    }
    heapProfilerModel() {
        return this.#heapProfilerModel;
    }
    profileType() {
        return super.profileType();
    }
}
//# sourceMappingURL=HeapDetachedElementsView.js.map