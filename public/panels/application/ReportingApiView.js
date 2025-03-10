// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import { ReportingApiReportsView } from './ReportingApiReportsView.js';
export class ReportingApiView extends UI.SplitWidget.SplitWidget {
    endpointsGrid;
    endpoints;
    constructor(endpointsGrid) {
        super(/* isVertical: */ false, /* secondIsSidebar: */ true);
        this.element.setAttribute('jslog', `${VisualLogging.pane('reporting-api')}`);
        this.endpointsGrid = endpointsGrid;
        this.endpoints = new Map();
        const mainTarget = SDK.TargetManager.TargetManager.instance().primaryPageTarget();
        const networkManager = mainTarget?.model(SDK.NetworkManager.NetworkManager);
        if (networkManager) {
            networkManager.addEventListener(SDK.NetworkManager.Events.ReportingApiEndpointsChangedForOrigin, event => this.onEndpointsChangedForOrigin(event.data), this);
            const reportingApiReportsView = new ReportingApiReportsView(networkManager);
            const reportingApiEndpointsView = new UI.Widget.VBox();
            reportingApiEndpointsView.setMinimumSize(0, 40);
            reportingApiEndpointsView.contentElement.appendChild(this.endpointsGrid);
            this.setMainWidget(reportingApiReportsView);
            this.setSidebarWidget(reportingApiEndpointsView);
            void networkManager.enableReportingApi();
        }
    }
    onEndpointsChangedForOrigin(data) {
        this.endpoints.set(data.origin, data.endpoints);
        this.endpointsGrid.data = { endpoints: this.endpoints };
    }
}
//# sourceMappingURL=ReportingApiView.js.map