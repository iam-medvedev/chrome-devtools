// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import * as Elements from './elements.js';
async function waitForTraceElement(treeOutline) {
    const element = treeOutline.shadowRoot?.querySelector('devtools-computed-style-trace');
    if (element) {
        return element;
    }
    return new Promise(resolve => {
        requestAnimationFrame(async () => {
            const result = await waitForTraceElement(treeOutline);
            resolve(result);
        });
    });
}
describeWithMockConnection('ComputedStyleWidget', () => {
    let computedStyleWidget;
    afterEach(() => {
        computedStyleWidget.detach();
    });
    describe('trace element', () => {
        function createComputedStyleWidgetForTest(cssStyleDeclarationType, cssStyleDeclarationName, parentRule) {
            const node = sinon.createStubInstance(SDK.DOMModel.DOMNode);
            node.id = 1;
            const stubCSSStyle = {
                styleSheetId: 'STYLE_SHEET_ID',
                cssProperties: [{
                        name: 'color',
                        value: 'red',
                        disabled: false,
                        implicit: false,
                        longhandProperties: [],
                        range: { startLine: 1, startColumn: 4, endLine: 1, endColumn: 20 },
                        text: 'color: red;',
                    }],
                shorthandEntries: [],
            };
            const cssMatchedStyles = sinon.createStubInstance(SDK.CSSMatchedStyles.CSSMatchedStyles, {
                node,
                propertyState: "Active" /* SDK.CSSMatchedStyles.PropertyState.ACTIVE */,
                nodeStyles: [
                    new SDK.CSSStyleDeclaration.CSSStyleDeclaration({}, parentRule ?? null, stubCSSStyle, cssStyleDeclarationType, cssStyleDeclarationName),
                ]
            });
            const computedStyleModel = sinon.createStubInstance(Elements.ComputedStyleModel.ComputedStyleModel, {
                fetchComputedStyle: Promise.resolve({ node, computedStyle: new Map([['color', 'red']]) }),
                cssModel: sinon.createStubInstance(SDK.CSSModel.CSSModel, { cachedMatchedCascadeForNode: Promise.resolve(cssMatchedStyles) }),
                node,
            });
            const computedStyleWidget = new Elements.ComputedStyleWidget.ComputedStyleWidget(computedStyleModel);
            computedStyleWidget.markAsRoot();
            computedStyleWidget.show(document.body);
            return computedStyleWidget;
        }
        it('renders trace element with correct selector for declarations coming from animations', async () => {
            computedStyleWidget =
                createComputedStyleWidgetForTest(SDK.CSSStyleDeclaration.Type.Animation, '--animation-name');
            computedStyleWidget.update();
            await computedStyleWidget.updateComplete;
            const treeOutline = computedStyleWidget.contentElement.querySelector('devtools-tree-outline');
            await treeOutline.expandRecursively(2);
            const traceElement = await waitForTraceElement(treeOutline);
            const traceSelector = traceElement.shadowRoot?.querySelector('.trace-selector');
            assert.strictEqual(traceSelector?.textContent, '--animation-name animation');
        });
        it('renders trace element with correct selector for declarations coming from WAAPI animations', async () => {
            computedStyleWidget = createComputedStyleWidgetForTest(SDK.CSSStyleDeclaration.Type.Animation);
            computedStyleWidget.update();
            await computedStyleWidget.updateComplete;
            const treeOutline = computedStyleWidget.contentElement.querySelector('devtools-tree-outline');
            await treeOutline.expandRecursively(2);
            const traceElement = await waitForTraceElement(treeOutline);
            const traceSelector = traceElement.shadowRoot?.querySelector('.trace-selector');
            assert.strictEqual(traceSelector?.textContent, 'animation style');
        });
        it('renders trace element with correct selector for declarations transitions', async () => {
            computedStyleWidget = createComputedStyleWidgetForTest(SDK.CSSStyleDeclaration.Type.Transition);
            computedStyleWidget.update();
            await computedStyleWidget.updateComplete;
            const treeOutline = computedStyleWidget.contentElement.querySelector('devtools-tree-outline');
            await treeOutline.expandRecursively(2);
            const traceElement = await waitForTraceElement(treeOutline);
            const traceSelector = traceElement.shadowRoot?.querySelector('.trace-selector');
            assert.strictEqual(traceSelector?.textContent, 'transitions style');
        });
        it('renders trace element with correct selector for declarations coming from CSS rules', async () => {
            computedStyleWidget = createComputedStyleWidgetForTest(SDK.CSSStyleDeclaration.Type.Regular, undefined, SDK.CSSRule.CSSStyleRule.createDummyRule({}, '.container'));
            computedStyleWidget.update();
            await computedStyleWidget.updateComplete;
            const treeOutline = computedStyleWidget.contentElement.querySelector('devtools-tree-outline');
            await treeOutline.expandRecursively(5);
            const traceElement = await waitForTraceElement(treeOutline);
            const traceSelector = traceElement.shadowRoot?.querySelector('.trace-selector');
            assert.strictEqual(traceSelector?.textContent, '.container');
        });
        it('renders trace element with correct selector for declarations coming from inline styles', async () => {
            computedStyleWidget = createComputedStyleWidgetForTest(SDK.CSSStyleDeclaration.Type.Inline);
            computedStyleWidget.update();
            await computedStyleWidget.updateComplete;
            const treeOutline = computedStyleWidget.contentElement.querySelector('devtools-tree-outline');
            await treeOutline.expandRecursively(5);
            const traceElement = await waitForTraceElement(treeOutline);
            const traceSelector = traceElement.shadowRoot?.querySelector('.trace-selector');
            assert.strictEqual(traceSelector?.textContent, 'element.style');
        });
    });
});
//# sourceMappingURL=ComputedStyleWidget.test.js.map