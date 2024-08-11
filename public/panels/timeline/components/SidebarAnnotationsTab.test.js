// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as TraceEngine from '../../../models/trace/trace.js';
import { renderElementIntoDOM } from '../../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../../testing/EnvironmentHelpers.js';
import { TraceLoader } from '../../../testing/TraceLoader.js';
import * as Coordinator from '../../../ui/components/render_coordinator/render_coordinator.js';
import * as TimelineComponents from './components.js';
describeWithEnvironment('SidebarAnnotationsTab', () => {
    const { SidebarAnnotationsTab } = TimelineComponents.SidebarAnnotationsTab;
    const coordinator = Coordinator.RenderCoordinator.RenderCoordinator.instance();
    it('renders annotations tab in the sidebar', async () => {
        const component = new SidebarAnnotationsTab();
        renderElementIntoDOM(component);
        await coordinator.done();
        assert.isNotNull(component.shadowRoot);
        const annotationsWrapperElement = component.shadowRoot.querySelector('.annotations');
        assert.isNotNull(annotationsWrapperElement);
    });
    it('renders annotations list in the sidebar', async function () {
        const component = new SidebarAnnotationsTab();
        const defaultTraceEvents = await TraceLoader.rawEvents(null, 'basic.json.gz');
        renderElementIntoDOM(component);
        // Create Entry Label annotations
        const entryLabelAnnotation = {
            type: 'ENTRY_LABEL',
            entry: defaultTraceEvents[0],
            label: 'Entry Label 1',
        };
        const entryLabelAnnotation2 = {
            type: 'ENTRY_LABEL',
            entry: defaultTraceEvents[1],
            label: 'Entry Label 2',
        };
        const labelledTimeRangeAnnotation = {
            type: 'TIME_RANGE',
            bounds: {
                min: TraceEngine.Types.Timing.MicroSeconds(0),
                max: TraceEngine.Types.Timing.MicroSeconds(10),
                range: TraceEngine.Types.Timing.MicroSeconds(10),
            },
            label: 'Labelled Time Range',
        };
        component.annotations = [entryLabelAnnotation, entryLabelAnnotation2, labelledTimeRangeAnnotation];
        assert.isNotNull(component.shadowRoot);
        await coordinator.done();
        const annotationsWrapperElement = component.shadowRoot.querySelector('.annotations');
        assert.isNotNull(annotationsWrapperElement);
        const deleteButton = component.shadowRoot.querySelector('.bin-icon');
        assert.isNotNull(deleteButton);
        // Ensure annotations names and labels are rendered for all 3 annotations -
        // 2 entry labels and 1 labelled time range
        const annotationEntryNameElements = component.shadowRoot.querySelectorAll('.entry-name');
        assert.strictEqual(annotationEntryNameElements.length, 3);
        const annotationEntryLabelElements = component.shadowRoot.querySelectorAll('.label');
        assert.strictEqual(annotationEntryNameElements.length, 3);
        assert.strictEqual(annotationEntryLabelElements[0].innerText, 'Entry Label 1');
        assert.strictEqual(annotationEntryLabelElements[1].innerText, 'Entry Label 2');
        assert.strictEqual(annotationEntryLabelElements[2].innerText, 'Labelled Time Range');
    });
    it('dispatches RemoveAnnotation Events when delete annotation button is clicked', async function () {
        const component = new SidebarAnnotationsTab();
        const defaultTraceEvents = await TraceLoader.rawEvents(null, 'basic.json.gz');
        renderElementIntoDOM(component);
        let removeAnnotationEventFired = false;
        component.addEventListener('removeannotation', () => {
            removeAnnotationEventFired = true;
        });
        // Create Entry Label annotation
        const entryLabelAnnotation = {
            type: 'ENTRY_LABEL',
            entry: defaultTraceEvents[0],
            label: 'Entry Label 1',
        };
        component.annotations = [entryLabelAnnotation];
        assert.isNotNull(component.shadowRoot);
        await coordinator.done();
        const deleteButton = component.shadowRoot.querySelector('.bin-icon');
        assert.isNotNull(deleteButton);
        // Make sure the remove annotation event is not fired before clicking the button
        assert.isFalse(removeAnnotationEventFired);
        deleteButton.dispatchEvent(new MouseEvent('click'));
        assert.isTrue(removeAnnotationEventFired);
    });
    it('updates annotations list in the sidebar when a new list is passed in', async function () {
        const component = new SidebarAnnotationsTab();
        const defaultTraceEvents = await TraceLoader.rawEvents(null, 'basic.json.gz');
        renderElementIntoDOM(component);
        // Create Entry Label Annotation
        const entryLabelAnnotation = {
            type: 'ENTRY_LABEL',
            entry: defaultTraceEvents[0],
            label: 'Entry Label 1',
        };
        const entryLabelAnnotation2 = {
            type: 'ENTRY_LABEL',
            entry: defaultTraceEvents[1],
            label: 'Entry Label 2',
        };
        component.annotations = [entryLabelAnnotation, entryLabelAnnotation2];
        assert.isNotNull(component.shadowRoot);
        await coordinator.done();
        const annotationsWrapperElement = component.shadowRoot.querySelector('.annotations');
        assert.isNotNull(annotationsWrapperElement);
        // Ensure there are 2 labels and their entry names and labels and rendered
        const annotationNameElements = component.shadowRoot.querySelectorAll('.entry-name');
        assert.strictEqual(annotationNameElements.length, 2);
        let annotationLabelElements = component.shadowRoot.querySelectorAll('.label');
        assert.strictEqual(annotationNameElements.length, 2);
        assert.strictEqual(annotationLabelElements[0].innerText, 'Entry Label 1');
        assert.strictEqual(annotationLabelElements[1].innerText, 'Entry Label 2');
        // Update the labels and add a range annotation
        entryLabelAnnotation.label = 'New Entry Label 1';
        entryLabelAnnotation2.label = 'New Entry Label 2';
        const labelledTimeRangeAnnotation = {
            type: 'TIME_RANGE',
            bounds: {
                min: TraceEngine.Types.Timing.MicroSeconds(0),
                max: TraceEngine.Types.Timing.MicroSeconds(10),
                range: TraceEngine.Types.Timing.MicroSeconds(10),
            },
            label: 'Labelled Time Range',
        };
        component.annotations = [entryLabelAnnotation, entryLabelAnnotation2, labelledTimeRangeAnnotation];
        await coordinator.done();
        annotationLabelElements = component.shadowRoot.querySelectorAll('.label');
        // Ensure the labels changed to new ones and a labbel range was added
        assert.strictEqual(annotationLabelElements.length, 3);
        assert.strictEqual(annotationLabelElements[0].innerText, 'New Entry Label 1');
        assert.strictEqual(annotationLabelElements[1].innerText, 'New Entry Label 2');
        assert.strictEqual(annotationLabelElements[2].innerText, 'Labelled Time Range');
    });
});
//# sourceMappingURL=SidebarAnnotationsTab.test.js.map