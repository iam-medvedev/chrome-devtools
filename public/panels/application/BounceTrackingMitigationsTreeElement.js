// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as LegacyWrapper from '../../ui/components/legacy_wrapper/legacy_wrapper.js';
import { ApplicationPanelTreeElement } from './ApplicationPanelTreeElement.js';
import * as ApplicationComponents from './components/components.js';
import * as Host from '../../core/host/host.js';
const UIStrings = {
    /**
     * @description Hover text for the Bounce Tracking Mitigations element in the Application Panel sidebar.
     */
    bounceTrackingMitigations: 'Bounce tracking mitigations',
};
const str_ = i18n.i18n.registerUIStrings('panels/application/BounceTrackingMitigationsTreeElement.ts', UIStrings);
export const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class BounceTrackingMitigationsTreeElement extends ApplicationPanelTreeElement {
    view;
    constructor(resourcesPanel) {
        super(resourcesPanel, i18nString(UIStrings.bounceTrackingMitigations), false);
        const icon = UI.Icon.Icon.create('database', 'resource-tree-item');
        this.setLeadingIcons([icon]);
    }
    get itemURL() {
        return 'bounce-tracking-mitigations://';
    }
    onselect(selectedByUser) {
        super.onselect(selectedByUser);
        if (!this.view) {
            this.view = LegacyWrapper.LegacyWrapper.legacyWrapper(UI.Widget.Widget, new ApplicationComponents.BounceTrackingMitigationsView.BounceTrackingMitigationsView());
        }
        this.showView(this.view);
        Host.userMetrics.panelShown(Host.UserMetrics.PanelCodes[Host.UserMetrics.PanelCodes.bounce_tracking_mitigations]);
        return false;
    }
}
//# sourceMappingURL=BounceTrackingMitigationsTreeElement.js.map