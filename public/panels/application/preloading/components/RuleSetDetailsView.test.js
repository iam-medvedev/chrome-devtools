// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { renderElementIntoDOM, } from '../../../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../../../testing/EnvironmentHelpers.js';
import * as Coordinator from '../../../../ui/components/render_coordinator/render_coordinator.js';
import * as PreloadingComponents from './components.js';
const coordinator = Coordinator.RenderCoordinator.RenderCoordinator.instance();
async function renderRuleSetDetailsView(data, shouldPrettyPrint) {
    const component = new PreloadingComponents.RuleSetDetailsView.RuleSetDetailsView();
    component.shouldPrettyPrint = shouldPrettyPrint;
    component.data = data;
    renderElementIntoDOM(component);
    assert.isNotNull(component.shadowRoot);
    await coordinator.done();
    return component;
}
describeWithEnvironment('RuleSetDetailsView', () => {
    it('renders nothing if not selected', async () => {
        const data = null;
        const component = await renderRuleSetDetailsView(data, false);
        assert.isNotNull(component.shadowRoot);
        assert.strictEqual(component.shadowRoot.textContent, '');
    });
    it('renders rule set', async () => {
        const data = {
            id: 'ruleSetId:1',
            loaderId: 'loaderId:1',
            sourceText: `
{
  "prefetch": [
    {
      "source": "list",
      "urls": ["/subresource.js"]
    }
  ]
}
`,
            backendNodeId: 1,
        };
        const component = await renderRuleSetDetailsView(data, false);
        assert.deepEqual(component.shadowRoot?.getElementById('error-message-text')?.textContent, undefined);
        const textEditor = component.shadowRoot?.querySelector('devtools-text-editor');
        assert.strictEqual(textEditor.state.doc.toString(), data.sourceText);
    });
    it('renders rule set from Speculation-Rules HTTP header', async () => {
        const data = {
            id: 'ruleSetId:1',
            loaderId: 'loaderId:1',
            sourceText: `
{
  "prefetch": [
    {
      "source": "list",
      "urls": ["/subresource.js"]
    }
  ]
}
`,
            url: 'https://example.com/speculationrules.json',
            requestId: 'reqeustId',
        };
        const component = await renderRuleSetDetailsView(data, false);
        assert.deepEqual(component.shadowRoot?.getElementById('error-message-text')?.textContent, undefined);
        const textEditor = component.shadowRoot?.querySelector('devtools-text-editor');
        assert.strictEqual(textEditor.state.doc.toString(), data.sourceText);
    });
    it('renders invalid rule set, broken JSON', async () => {
        const data = {
            id: 'ruleSetId:1',
            loaderId: 'loaderId:1',
            sourceText: `
{
  "prefetch": [
    {
      "source": "list",
`,
            backendNodeId: 1,
            errorType: "SourceIsNotJsonObject" /* Protocol.Preload.RuleSetErrorType.SourceIsNotJsonObject */,
            errorMessage: 'Line: 6, column: 1, Syntax error.',
        };
        const component = await renderRuleSetDetailsView(data, false);
        assert.deepEqual(component.shadowRoot?.getElementById('error-message-text')?.textContent, 'Line: 6, column: 1, Syntax error.');
        const textEditor = component.shadowRoot?.querySelector('devtools-text-editor');
        assert.strictEqual(textEditor.state.doc.toString(), data.sourceText);
    });
    it('renders invalid rule set, lacking `urls`', async () => {
        const data = {
            id: 'ruleSetId:1',
            loaderId: 'loaderId:1',
            sourceText: `
{
  "prefetch": [
    {
      "source": "list"
    }
  ]
}
`,
            backendNodeId: 1,
            errorType: "InvalidRulesSkipped" /* Protocol.Preload.RuleSetErrorType.InvalidRulesSkipped */,
            errorMessage: 'A list rule must have a "urls" array.',
        };
        const component = await renderRuleSetDetailsView(data, false);
        assert.deepEqual(component.shadowRoot?.getElementById('error-message-text')?.textContent, 'A list rule must have a "urls" array.');
        const textEditor = component.shadowRoot?.querySelector('devtools-text-editor');
        assert.strictEqual(textEditor.state.doc.toString(), data.sourceText);
    });
    it('renders formatted rule set', async () => {
        const data = {
            id: 'ruleSetId:1',
            loaderId: 'loaderId:1',
            sourceText: '{"prefetch":[{"source": "list","urls": ["/subresource.js"]}]}',
            backendNodeId: 1,
        };
        const component = await renderRuleSetDetailsView(data, true);
        assert.deepEqual(component.shadowRoot?.getElementById('error-message-text')?.textContent, undefined);
        const textEditor = component.shadowRoot?.querySelector('devtools-text-editor');
        // Formatted sourceText should be different from the data.sourceText in this case.
        assert.notEqual(textEditor.state.doc.toString(), data.sourceText);
        assert.strictEqual(textEditor.state.doc.toString(), `{
    "prefetch": [
        {
            "source": "list",
            "urls": [
                "/subresource.js"
            ]
        }
    ]
}`);
    });
});
//# sourceMappingURL=RuleSetDetailsView.test.js.map