// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Trace from '../../../../models/trace/trace.js';
import { renderElementIntoDOM } from '../../../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../../../testing/EnvironmentHelpers.js';
import * as RenderCoordinator from '../../../../ui/components/render_coordinator/render_coordinator.js';
import * as Lit from '../../../../ui/lit/lit.js';
import * as Insights from './insights.js';
const { html } = Lit;
describeWithEnvironment('BaseInsightComponent', () => {
    const { BaseInsightComponent } = Insights.BaseInsightComponent;
    class TestInsightComponent extends BaseInsightComponent {
        internalName = 'test-insight';
        createOverlays() {
            return [];
        }
        renderContent() {
            return html `<div>test content</div>`;
        }
    }
    customElements.define('test-insight-component', TestInsightComponent);
    describe('sidebar insight component rendering', () => {
        it('renders insight title even when not active', async () => {
            const component = new TestInsightComponent();
            component.selected = false;
            component.model = {
                strings: {},
                title: 'LCP by Phase',
                description: 'some description',
                category: Trace.Insights.Types.InsightCategory.ALL,
                shouldShow: true,
            };
            renderElementIntoDOM(component);
            await RenderCoordinator.done();
            assert.isNotNull(component.shadowRoot);
            const titleElement = component.shadowRoot.querySelector('.insight-title');
            assert.isNotNull(titleElement);
            const descElement = component.shadowRoot.querySelector('.insight-description');
            assert.isNull(descElement);
            const contentElement = component.shadowRoot.querySelector('.insight-content');
            assert.isNull(contentElement);
            assert.deepEqual(titleElement.textContent, 'LCP by Phase');
        });
        it('renders title, description and content when toggled', async () => {
            const component = new TestInsightComponent();
            component.selected = true;
            component.model = {
                strings: {},
                title: 'LCP by Phase',
                description: 'some description',
                category: Trace.Insights.Types.InsightCategory.ALL,
                shouldShow: true,
            };
            renderElementIntoDOM(component);
            await RenderCoordinator.done();
            assert.isNotNull(component.shadowRoot);
            const titleElement = component.shadowRoot.querySelector('.insight-title');
            assert.isNotNull(titleElement);
            assert.deepEqual(titleElement.textContent, 'LCP by Phase');
            const descElement = component.shadowRoot.querySelector('.insight-description');
            assert.isNotNull(descElement);
            // It's in the markdown component.
            assert.strictEqual(descElement.children[0].shadowRoot?.textContent?.trim(), 'some description');
            const contentElement = component.shadowRoot.querySelector('.insight-content');
            assert.isNotNull(contentElement);
            assert.strictEqual(contentElement.textContent, 'test content');
        });
    });
});
//# sourceMappingURL=BaseInsightComponent.test.js.map