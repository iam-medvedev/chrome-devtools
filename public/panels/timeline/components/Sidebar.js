// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../core/common/common.js';
import * as Root from '../../../core/root/root.js';
import * as UI from '../../../ui/legacy/legacy.js';
import { SidebarAnnotationsTab } from './SidebarAnnotationsTab.js';
import { SidebarInsightsTab } from './SidebarInsightsTab.js';
export class RemoveAnnotation extends Event {
    removedAnnotation;
    static eventName = 'removeannotation';
    constructor(removedAnnotation) {
        super(RemoveAnnotation.eventName, { bubbles: true, composed: true });
        this.removedAnnotation = removedAnnotation;
    }
}
export class RevealAnnotation extends Event {
    annotation;
    static eventName = 'revealannotation';
    constructor(annotation) {
        super(RevealAnnotation.eventName, { bubbles: true, composed: true });
        this.annotation = annotation;
    }
}
export class EventReferenceClick extends Event {
    metricEvent;
    static eventName = 'sidebarmetricclick';
    constructor(metricEvent) {
        super(EventReferenceClick.eventName, { bubbles: true, composed: true });
        this.metricEvent = metricEvent;
    }
}
export const DEFAULT_SIDEBAR_TAB = "insights" /* SidebarTabs.INSIGHTS */;
export const DEFAULT_SIDEBAR_WIDTH_PX = 240;
const MIN_SIDEBAR_WIDTH_PX = 170;
export class SidebarWidget extends UI.Widget.VBox {
    #tabbedPane = new UI.TabbedPane.TabbedPane();
    #insightsView = new InsightsView();
    #annotationsView = new AnnotationsView();
    /**
     * Track if the user has opened the sidebar before. We do this so that the
     * very first time they record/import a trace after the sidebar ships, we can
     * automatically pop it open to aid discovery. But, after that, the sidebar
     * visibility will be persisted based on if the user opens or closes it - the
     * SplitWidget tracks its state in its own setting.
     */
    #userHasOpenedSidebarOnce = Common.Settings.Settings.instance().createSetting('timeline-user-has-opened-siderbar-once', false);
    userHasOpenedSidebarOnce() {
        return this.#userHasOpenedSidebarOnce.get();
    }
    constructor() {
        super();
        this.setMinimumSize(MIN_SIDEBAR_WIDTH_PX, 0);
    }
    wasShown() {
        this.#userHasOpenedSidebarOnce.set(true);
        this.#tabbedPane.show(this.element);
        if (!this.#tabbedPane.hasTab("insights" /* SidebarTabs.INSIGHTS */) &&
            Root.Runtime.experiments.isEnabled("timeline-rpp-sidebar" /* Root.Runtime.ExperimentName.TIMELINE_INSIGHTS */)) {
            this.#tabbedPane.appendTab("insights" /* SidebarTabs.INSIGHTS */, 'Insights', this.#insightsView, undefined, undefined, false, false, 0, 'timeline.insights-tab');
        }
        if (!this.#tabbedPane.hasTab("annotations" /* SidebarTabs.ANNOTATIONS */) &&
            Root.Runtime.experiments.isEnabled("perf-panel-annotations" /* Root.Runtime.ExperimentName.TIMELINE_ANNOTATIONS */)) {
            this.#tabbedPane.appendTab('annotations', 'Annotations', this.#annotationsView, undefined, undefined, false, false, 1, 'timeline.annotations-tab');
        }
        // TODO: automatically select the right tab depending on what content is
        // available to us.
    }
    setAnnotations(updatedAnnotations, annotationEntryToColorMap) {
        this.#annotationsView.setAnnotations(updatedAnnotations, annotationEntryToColorMap);
    }
    setParsedTrace(parsedTrace) {
        this.#insightsView.setParsedTrace(parsedTrace);
    }
    setInsights(insights) {
        this.#insightsView.setInsights(insights);
    }
    setActiveInsight(activeInsight) {
        this.#insightsView.setActiveInsight(activeInsight);
    }
}
class InsightsView extends UI.Widget.VBox {
    #component = new SidebarInsightsTab();
    constructor() {
        super();
        this.element.classList.add('sidebar-insights');
        this.element.appendChild(this.#component);
    }
    setParsedTrace(data) {
        this.#component.parsedTrace = data;
    }
    setInsights(data) {
        this.#component.insights = data;
    }
    setActiveInsight(active) {
        this.#component.activeInsight = active;
    }
}
class AnnotationsView extends UI.Widget.VBox {
    #component = new SidebarAnnotationsTab();
    constructor() {
        super();
        this.element.classList.add('sidebar-annotations');
        this.element.appendChild(this.#component);
    }
    setAnnotations(annotations, annotationEntryToColorMap) {
        this.#component.annotationEntryToColorMap = annotationEntryToColorMap;
        this.#component.annotations = annotations;
    }
}
//# sourceMappingURL=Sidebar.js.map