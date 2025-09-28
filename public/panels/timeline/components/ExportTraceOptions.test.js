// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Root from '../../../core/root/root.js';
import { renderElementIntoDOM, } from '../../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../../testing/EnvironmentHelpers.js';
import * as RenderCoordinator from '../../../ui/components/render_coordinator/render_coordinator.js';
import * as TimelineComponents from './components.js';
describeWithEnvironment('Export Trace Options ', () => {
    const initialCallback = (args) => {
        args.addModifications = true;
        return Promise.resolve();
    };
    async function renderExportTraceOptionsDialog(callback = initialCallback) {
        const exportTraceOptions = new TimelineComponents.ExportTraceOptions.ExportTraceOptions();
        exportTraceOptions.data = {
            onExport: callback,
            buttonEnabled: false,
        };
        exportTraceOptions.updateContentVisibility({ annotationsExist: true });
        // Render component and wait for completion
        renderElementIntoDOM(exportTraceOptions);
        await RenderCoordinator.done();
        return exportTraceOptions;
    }
    const waitFor = async (selector, root) => {
        let element = null;
        // Poll for element until found
        while (!element) {
            element = root ? root.querySelector(selector) : document.querySelector(selector);
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        return element;
    };
    beforeEach(() => {
        Root.Runtime.experiments.setEnabled("timeline-enhanced-traces" /* Root.Runtime.ExperimentName.TIMELINE_ENHANCED_TRACES */, false);
        Root.Runtime.experiments.setEnabled("timeline-compiled-sources" /* Root.Runtime.ExperimentName.TIMELINE_COMPILED_SOURCES */, false);
    });
    it('should render dialog button', async () => {
        Root.Runtime.experiments.setEnabled("timeline-compiled-sources" /* Root.Runtime.ExperimentName.TIMELINE_COMPILED_SOURCES */, true);
        const component = await renderExportTraceOptionsDialog();
        assert.isNotNull(component.shadowRoot);
    });
    it('should render all checkbox options when experiments are enabled', async () => {
        Root.Runtime.experiments.setEnabled("timeline-enhanced-traces" /* Root.Runtime.ExperimentName.TIMELINE_ENHANCED_TRACES */, true);
        Root.Runtime.experiments.setEnabled("timeline-compiled-sources" /* Root.Runtime.ExperimentName.TIMELINE_COMPILED_SOURCES */, true);
        const component = await renderExportTraceOptionsDialog();
        assert.isNotNull(component.shadowRoot);
        await waitFor('devtools-button-dialog', component.shadowRoot);
        const buttonDialog = component.shadowRoot.querySelector('devtools-button-dialog');
        assert.isNotNull(buttonDialog);
        assert.isNotNull(buttonDialog.shadowRoot);
        const buttonFromDialog = buttonDialog.shadowRoot.querySelector('devtools-button');
        assert.isNotNull(buttonFromDialog);
        assert.isTrue(buttonFromDialog.disabled);
        buttonFromDialog.disabled = false;
        buttonFromDialog.click();
        const dialogContent = await waitFor('.export-trace-options-content', component.shadowRoot);
        assert.isNotNull(dialogContent);
        const regexRows = dialogContent.querySelectorAll('devtools-checkbox') || [];
        assert.lengthOf(regexRows, 4);
        assert.isTrue(regexRows[0].checked);
        assert.isFalse(regexRows[1].checked);
        assert.isFalse(regexRows[2].checked);
    });
    it('should show include annotations checkbox only when annotations are present', async () => {
        Root.Runtime.experiments.setEnabled("timeline-enhanced-traces" /* Root.Runtime.ExperimentName.TIMELINE_ENHANCED_TRACES */, true);
        Root.Runtime.experiments.setEnabled("timeline-compiled-sources" /* Root.Runtime.ExperimentName.TIMELINE_COMPILED_SOURCES */, false);
        const component = await renderExportTraceOptionsDialog();
        component.updateContentVisibility({
            annotationsExist: false
        });
        assert.isNotNull(component.shadowRoot);
        await waitFor('devtools-button-dialog', component.shadowRoot);
        const buttonDialog = component.shadowRoot.querySelector('devtools-button-dialog');
        assert.isNotNull(buttonDialog);
        assert.isNotNull(buttonDialog.shadowRoot);
        const buttonFromDialog = buttonDialog.shadowRoot.querySelector('devtools-button');
        assert.isNotNull(buttonFromDialog);
        assert.isTrue(buttonFromDialog.disabled);
        buttonFromDialog.disabled = false;
        buttonFromDialog.click();
        const dialogContent = await waitFor('.export-trace-options-content', component.shadowRoot);
        const resultElement = await waitFor('devtools-checkbox[title="Include script content"]', dialogContent);
        assert.isNotNull(resultElement);
    });
    it('should show script content checkbox only when experiment is enabled', async () => {
        Root.Runtime.experiments.setEnabled("timeline-enhanced-traces" /* Root.Runtime.ExperimentName.TIMELINE_ENHANCED_TRACES */, false);
        Root.Runtime.experiments.setEnabled("timeline-compiled-sources" /* Root.Runtime.ExperimentName.TIMELINE_COMPILED_SOURCES */, false);
        const component = await renderExportTraceOptionsDialog();
        assert.isNotNull(component.shadowRoot);
        await waitFor('devtools-button-dialog', component.shadowRoot);
        const buttonDialog = component.shadowRoot.querySelector('devtools-button-dialog');
        assert.isNotNull(buttonDialog);
        assert.isNotNull(buttonDialog.shadowRoot);
        const buttonFromDialog = buttonDialog.shadowRoot.querySelector('devtools-button');
        assert.isNotNull(buttonFromDialog);
        assert.isTrue(buttonFromDialog.disabled);
        buttonFromDialog.disabled = false;
        buttonFromDialog.click();
        const dialogContent = await waitFor('.export-trace-options-content', component.shadowRoot);
        assert.isNotNull(dialogContent);
        const regexRows = dialogContent.querySelectorAll('devtools-checkbox') || [];
        assert.lengthOf(regexRows, 2);
    });
    it('should show sourcemaps checkbox only when experiment is enabled', async () => {
        Root.Runtime.experiments.setEnabled("timeline-enhanced-traces" /* Root.Runtime.ExperimentName.TIMELINE_ENHANCED_TRACES */, true);
        Root.Runtime.experiments.setEnabled("timeline-compiled-sources" /* Root.Runtime.ExperimentName.TIMELINE_COMPILED_SOURCES */, false);
        const component = await renderExportTraceOptionsDialog();
        assert.isNotNull(component.shadowRoot);
        await waitFor('devtools-button-dialog', component.shadowRoot);
        const buttonDialog = component.shadowRoot.querySelector('devtools-button-dialog');
        assert.isNotNull(buttonDialog);
        assert.isNotNull(buttonDialog.shadowRoot);
        const buttonFromDialog = buttonDialog.shadowRoot.querySelector('devtools-button');
        assert.isNotNull(buttonFromDialog);
        assert.isTrue(buttonFromDialog.disabled);
        buttonFromDialog.disabled = false;
        buttonFromDialog.click();
        const dialogContent = await waitFor('.export-trace-options-content', component.shadowRoot);
        assert.isNotNull(dialogContent);
        const regexRows = dialogContent.querySelectorAll('devtools-checkbox') || [];
        assert.lengthOf(regexRows, 3);
    });
    it('should disable sourcemaps checkbox when script content is disabled', async () => {
        Root.Runtime.experiments.setEnabled("timeline-enhanced-traces" /* Root.Runtime.ExperimentName.TIMELINE_ENHANCED_TRACES */, true);
        Root.Runtime.experiments.setEnabled("timeline-compiled-sources" /* Root.Runtime.ExperimentName.TIMELINE_COMPILED_SOURCES */, true);
        const component = await renderExportTraceOptionsDialog();
        assert.isNotNull(component.shadowRoot);
        await waitFor('devtools-button-dialog', component.shadowRoot);
        const buttonDialog = component.shadowRoot.querySelector('devtools-button-dialog');
        assert.isNotNull(buttonDialog);
        assert.isNotNull(buttonDialog.shadowRoot);
        const buttonFromDialog = buttonDialog.shadowRoot.querySelector('devtools-button');
        assert.isNotNull(buttonFromDialog);
        assert.isTrue(buttonFromDialog.disabled);
        buttonFromDialog.disabled = false;
        buttonFromDialog.click();
        const dialogContent = await waitFor('.export-trace-options-content', component.shadowRoot);
        assert.isNotNull(dialogContent);
        let regexRows = dialogContent.querySelectorAll('devtools-checkbox') || [];
        assert.lengthOf(regexRows, 4);
        assert.isTrue(regexRows[0].checked);
        assert.isFalse(regexRows[1].checked);
        assert.isFalse(regexRows[2].checked);
        assert.isTrue(regexRows[2].disabled);
        regexRows[1].click();
        await waitFor('devtools-checkbox[title="Include script content"][checked]', dialogContent);
        regexRows = dialogContent.querySelectorAll('devtools-checkbox') || [];
        assert.isTrue(regexRows[0].checked);
        assert.isTrue(regexRows[1].checked);
        assert.isFalse(regexRows[2].checked);
        assert.isFalse(regexRows[2].disabled);
        regexRows[1].click(); // Clean-up
        assert.isFalse(regexRows[1].checked);
    });
    it('should execute callback with correct parameters when save button is clicked', async () => {
        Root.Runtime.experiments.setEnabled("timeline-enhanced-traces" /* Root.Runtime.ExperimentName.TIMELINE_ENHANCED_TRACES */, true);
        Root.Runtime.experiments.setEnabled("timeline-compiled-sources" /* Root.Runtime.ExperimentName.TIMELINE_COMPILED_SOURCES */, true);
        let callbackExecuted = false;
        let passedArgs = null;
        // Override callback to capture arguments passed from component
        const overridenCallback = (args) => {
            callbackExecuted = true;
            passedArgs = args;
            return Promise.resolve();
        };
        const component = await renderExportTraceOptionsDialog(overridenCallback);
        assert.isNotNull(component.shadowRoot);
        await waitFor('devtools-button-dialog', component.shadowRoot);
        const buttonDialog = component.shadowRoot.querySelector('devtools-button-dialog');
        assert.isNotNull(buttonDialog);
        assert.isNotNull(buttonDialog.shadowRoot);
        const buttonFromDialog = buttonDialog.shadowRoot.querySelector('devtools-button');
        assert.isNotNull(buttonFromDialog);
        assert.isTrue(buttonFromDialog.disabled);
        buttonFromDialog.disabled = false;
        buttonFromDialog.click(); // Open the dialog
        const dialogContent = await waitFor('.export-trace-options-content', component.shadowRoot);
        assert.isNotNull(dialogContent);
        const saveButton = dialogContent.querySelector('devtools-button[data-export-button]');
        let regexRows = dialogContent.querySelectorAll('devtools-checkbox') || [];
        assert.lengthOf(regexRows, 4);
        // Initial checkbox states: annotations=true, script=false, sourcemaps=false
        assert.isTrue(regexRows[0].checked);
        assert.isFalse(regexRows[1].checked);
        assert.isFalse(regexRows[2].checked);
        assert.isTrue(regexRows[2].disabled);
        regexRows[1].click(); // Enable script content checkbox
        await waitFor('devtools-checkbox[title="Include script content"][checked]', dialogContent);
        regexRows = dialogContent.querySelectorAll('devtools-checkbox') || [];
        assert.isTrue(regexRows[0].checked);
        assert.isTrue(regexRows[1].checked);
        assert.isFalse(regexRows[2].checked);
        assert.isFalse(regexRows[2].disabled);
        assert.isFalse(callbackExecuted);
        saveButton?.click(); // Trigger export callback
        assert.isTrue(callbackExecuted, 'The export callback was not called.');
        assert.isNotNull(passedArgs);
        // Verify callback receives correct checkbox states
        assert.isTrue(passedArgs.addModifications);
        assert.isTrue(passedArgs.includeScriptContent);
        assert.isFalse(passedArgs.includeSourceMaps);
        regexRows[1].click(); // Clean-up
        assert.isFalse(regexRows[1].checked);
    });
});
//# sourceMappingURL=ExportTraceOptions.test.js.map