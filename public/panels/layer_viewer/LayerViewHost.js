// Copyright 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
const UIStrings = {
    /**
     *@description Text in Layer View Host of the Layers panel
     */
    showInternalLayers: 'Show internal layers',
};
const str_ = i18n.i18n.registerUIStrings('panels/layer_viewer/LayerViewHost.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class LayerView {
}
export class Selection {
    typeInternal;
    layerInternal;
    constructor(type, layer) {
        this.typeInternal = type;
        this.layerInternal = layer;
    }
    static isEqual(a, b) {
        return a && b ? a.isEqual(b) : a === b;
    }
    type() {
        return this.typeInternal;
    }
    layer() {
        return this.layerInternal;
    }
    isEqual(_other) {
        return false;
    }
}
export class LayerSelection extends Selection {
    constructor(layer) {
        console.assert(Boolean(layer), 'LayerSelection with empty layer');
        super("Layer" /* Type.LAYER */, layer);
    }
    isEqual(other) {
        return other.typeInternal === "Layer" /* Type.LAYER */ && other.layer().id() === this.layer().id();
    }
}
export class ScrollRectSelection extends Selection {
    scrollRectIndex;
    constructor(layer, scrollRectIndex) {
        super("ScrollRect" /* Type.SCROLL_RECT */, layer);
        this.scrollRectIndex = scrollRectIndex;
    }
    isEqual(other) {
        return other.typeInternal === "ScrollRect" /* Type.SCROLL_RECT */ && this.layer().id() === other.layer().id() &&
            this.scrollRectIndex === other.scrollRectIndex;
    }
}
export class SnapshotSelection extends Selection {
    snapshotInternal;
    constructor(layer, snapshot) {
        super("Snapshot" /* Type.SNAPSHOT */, layer);
        this.snapshotInternal = snapshot;
    }
    isEqual(other) {
        return other.typeInternal === "Snapshot" /* Type.SNAPSHOT */ && this.layer().id() === other.layer().id() &&
            this.snapshotInternal === other.snapshotInternal;
    }
    snapshot() {
        return this.snapshotInternal;
    }
}
export class LayerViewHost {
    views;
    selectedObject;
    hoveredObject;
    showInternalLayersSettingInternal;
    snapshotLayers;
    constructor() {
        this.views = [];
        this.selectedObject = null;
        this.hoveredObject = null;
        this.showInternalLayersSettingInternal =
            Common.Settings.Settings.instance().createSetting('layers-show-internal-layers', false);
        this.snapshotLayers = new Map();
    }
    registerView(layerView) {
        this.views.push(layerView);
    }
    setLayerSnapshotMap(snapshotLayers) {
        this.snapshotLayers = snapshotLayers;
    }
    getLayerSnapshotMap() {
        return this.snapshotLayers;
    }
    setLayerTree(layerTree) {
        if (!layerTree) {
            return;
        }
        const selectedLayer = this.selectedObject?.layer();
        if (selectedLayer && (!layerTree?.layerById(selectedLayer.id()))) {
            this.selectObject(null);
        }
        const hoveredLayer = this.hoveredObject?.layer();
        if (hoveredLayer && (!layerTree?.layerById(hoveredLayer.id()))) {
            this.hoverObject(null);
        }
        for (const view of this.views) {
            view.setLayerTree(layerTree);
        }
    }
    hoverObject(selection) {
        if (Selection.isEqual(this.hoveredObject, selection)) {
            return;
        }
        this.hoveredObject = selection;
        const layer = selection?.layer();
        this.toggleNodeHighlight(layer ? layer.nodeForSelfOrAncestor() : null);
        for (const view of this.views) {
            view.hoverObject(selection);
        }
    }
    selectObject(selection) {
        if (Selection.isEqual(this.selectedObject, selection)) {
            return;
        }
        this.selectedObject = selection;
        for (const view of this.views) {
            view.selectObject(selection);
        }
    }
    selection() {
        return this.selectedObject;
    }
    showContextMenu(contextMenu, selection) {
        contextMenu.defaultSection().appendCheckboxItem(i18nString(UIStrings.showInternalLayers), this.toggleShowInternalLayers.bind(this), {
            checked: this.showInternalLayersSettingInternal.get(),
            jslogContext: this.showInternalLayersSettingInternal.name,
        });
        const node = selection?.layer()?.nodeForSelfOrAncestor();
        if (node) {
            contextMenu.appendApplicableItems(node);
        }
        void contextMenu.show();
    }
    showInternalLayersSetting() {
        return this.showInternalLayersSettingInternal;
    }
    toggleShowInternalLayers() {
        this.showInternalLayersSettingInternal.set(!this.showInternalLayersSettingInternal.get());
    }
    toggleNodeHighlight(node) {
        if (node) {
            node.highlightForTwoSeconds();
            return;
        }
        SDK.OverlayModel.OverlayModel.hideDOMNodeHighlight();
    }
}
//# sourceMappingURL=LayerViewHost.js.map