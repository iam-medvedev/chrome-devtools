// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import * as ComputedStyle from '../../models/computed_style/computed_style.js';
import { renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import { createStubbedDomNodeWithModels } from '../../testing/StyleHelpers.js';
import * as Elements from './elements.js';
describeWithEnvironment('MetricsSidebarPane', () => {
    function createWidget(computedStyle, boxModel) {
        const { node, cssModel } = createStubbedDomNodeWithModels({ nodeId: 1 });
        node.nodeType.returns(Node.ELEMENT_NODE);
        node.boxModel.resolves(boxModel);
        cssModel.isEnabled.returns(true);
        cssModel.getComputedStyle.resolves(computedStyle);
        cssModel.getInlineStyles.resolves(null);
        const computedStyleModel = new ComputedStyle.ComputedStyleModel.ComputedStyleModel(node);
        const widget = new Elements.MetricsSidebarPane.MetricsSidebarPane(computedStyleModel);
        renderElementIntoDOM(widget);
        return widget;
    }
    it('renders content width and height from boxModel.content when available', async () => {
        const computedStyle = new Map([
            ['display', 'block'],
            ['position', 'static'],
            ['width', '300px'],
            ['height', '100px'],
            ['box-sizing', 'content-box'],
        ]);
        const boxModel = {
            content: [10, 10, 275, 10, 275, 90, 10, 90],
            padding: [0, 0, 300, 0, 300, 100, 0, 100],
            border: [0, 0, 300, 0, 300, 100, 0, 100],
            margin: [0, 0, 300, 0, 300, 100, 0, 100],
            width: 300,
            height: 100,
        };
        const widget = createWidget(computedStyle, boxModel);
        widget.wasShown();
        await widget.performUpdate();
        const spans = widget.contentElement.querySelectorAll('.content span');
        assert.exists(spans);
        assert.strictEqual(spans[0].textContent, '265');
        assert.strictEqual(spans[2].textContent, '80');
        widget.detach();
    });
    it('falls back to computed style width and height when boxModel is not available', async () => {
        const computedStyle = new Map([
            ['display', 'block'],
            ['position', 'static'],
            ['width', '300px'],
            ['height', '100px'],
            ['box-sizing', 'content-box'],
        ]);
        const widget = createWidget(computedStyle, null);
        widget.wasShown();
        await widget.performUpdate();
        const spans = widget.contentElement.querySelectorAll('.content span');
        assert.exists(spans);
        assert.strictEqual(spans[0].textContent, '300');
        assert.strictEqual(spans[2].textContent, '100');
        widget.detach();
    });
});
//# sourceMappingURL=MetricsSidebarPane.test.js.map