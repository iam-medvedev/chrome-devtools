// Copyright 2024 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Root from '../../../../core/root/root.js';
import * as AIAssistance from '../../../../models/ai_assistance/ai_assistance.js';
import * as Badges from '../../../../models/badges/badges.js';
import * as Trace from '../../../../models/trace/trace.js';
import { dispatchClickEvent, renderElementIntoDOM } from '../../../../testing/DOMHelpers.js';
import { describeWithEnvironment, updateHostConfig } from '../../../../testing/EnvironmentHelpers.js';
import * as UI from '../../../../ui/legacy/legacy.js';
import * as Lit from '../../../../ui/lit/lit.js';
import * as Insights from './insights.js';
const { html } = Lit;
describeWithEnvironment('BaseInsightComponent', () => {
    const { BaseInsightComponent } = Insights.BaseInsightComponent;
    class TestInsightComponentNoAISupport extends BaseInsightComponent {
        internalName = 'test-insight';
        hasAskAiSupport() {
            return false;
        }
        createOverlays() {
            return [];
        }
        renderContent() {
            return html `<div>test content</div>`;
        }
    }
    class TestInsightComponentWithAISupport extends BaseInsightComponent {
        internalName = 'test-insight';
        hasAskAiSupport() {
            return true;
        }
        createOverlays() {
            return [];
        }
        renderContent() {
            return html `<div>test content</div>`;
        }
    }
    describe('sidebar insight component rendering', () => {
        it('renders insight title even when not active', async () => {
            const component = new TestInsightComponentNoAISupport();
            component.selected = false;
            component.model = {
                insightKey: 'LCPBreakdown',
                strings: {},
                title: 'LCP by Phase',
                description: 'some description',
                docs: '',
                category: Trace.Insights.Types.InsightCategory.ALL,
                state: 'fail',
                frameId: '123',
            };
            renderElementIntoDOM(component);
            await component.updateComplete;
            assert.isNotNull(component.element.shadowRoot);
            const titleElement = component.element.shadowRoot.querySelector('.insight-title');
            assert.isNotNull(titleElement);
            const descElement = component.element.shadowRoot.querySelector('.insight-description');
            assert.isNull(descElement);
            const contentElement = component.element.shadowRoot.querySelector('.insight-content');
            assert.isNull(contentElement);
            assert.deepEqual(titleElement.textContent, 'LCP by Phase');
        });
        it('renders title, description and content when toggled', async () => {
            const component = new TestInsightComponentNoAISupport();
            component.selected = true;
            component.model = {
                insightKey: 'LCPBreakdown',
                strings: {},
                title: 'LCP by Phase',
                description: 'some description',
                docs: '',
                category: Trace.Insights.Types.InsightCategory.ALL,
                state: 'fail',
                frameId: '123',
            };
            renderElementIntoDOM(component);
            await component.updateComplete;
            assert.isNotNull(component.element.shadowRoot);
            assert.isNotNull(component.element.shadowRoot);
            const titleElement = component.element.shadowRoot.querySelector('.insight-title');
            assert.isNotNull(titleElement);
            assert.deepEqual(titleElement.textContent, 'LCP by Phase');
            const descElement = component.element.shadowRoot.querySelector('.insight-description');
            assert.isNotNull(descElement);
            // It's in the markdown component.
            assert.include(descElement.children[0].shadowRoot?.textContent?.trim(), 'some description');
            const contentElement = component.element.shadowRoot.querySelector('.insight-content');
            assert.isNotNull(contentElement);
            assert.strictEqual(contentElement.textContent, 'test content');
        });
        it('records badge action when an insight is clicked', async () => {
            const recordAction = sinon.stub(Badges.UserBadges.instance(), 'recordAction');
            const component = new TestInsightComponentNoAISupport();
            component.selected = false;
            component.insightSetKey = 'test-key';
            component.model = {
                insightKey: 'LCPBreakdown',
                strings: {},
                title: 'LCP by Phase',
                description: 'some description',
                docs: '',
                category: Trace.Insights.Types.InsightCategory.ALL,
                state: 'fail',
                frameId: '123',
            };
            renderElementIntoDOM(component);
            await component.updateComplete;
            assert.isNotNull(component.element.shadowRoot);
            assert.isNotNull(component.element.shadowRoot);
            const header = component.element.shadowRoot.querySelector('header');
            assert.isNotNull(header);
            dispatchClickEvent(header);
            await component.updateComplete;
            sinon.assert.calledWith(recordAction, Badges.BadgeAction.PERFORMANCE_INSIGHT_CLICKED);
        });
    });
    describe('estimated savings output', () => {
        function makeTestComponent(opts) {
            class TestInsight extends BaseInsightComponent {
                internalName = 'test-insight';
                createOverlays() {
                    return [];
                }
                getEstimatedSavingsTime() {
                    return opts.timeSavings ? Trace.Types.Timing.Milli(opts.timeSavings) : null;
                }
                getEstimatedSavingsBytes() {
                    return opts.wastedBytes ?? null;
                }
                renderContent() {
                    return html `<div>test content</div>`;
                }
            }
            return new TestInsight();
        }
        it('outputs the correct estimated savings for both bytes and time', async () => {
            const component = makeTestComponent({ wastedBytes: 5_000, timeSavings: 50 });
            component.model = {
                insightKey: 'LCPBreakdown',
                strings: {},
                title: 'LCP by Phase',
                description: 'some description',
                docs: '',
                category: Trace.Insights.Types.InsightCategory.ALL,
                state: 'fail',
                frameId: '123',
            };
            renderElementIntoDOM(component);
            await component.updateComplete;
            assert.isNotNull(component.element.shadowRoot);
            const estSavings = component.element.shadowRoot?.querySelector('slot[name=insight-savings]');
            assert.isOk(estSavings);
            assert.strictEqual(estSavings.innerText, 'Est savings: 50 ms & 5.0 kB');
        });
        it('outputs the correct estimated savings for bytes only', async () => {
            const component = makeTestComponent({ wastedBytes: 5_000 });
            component.model = {
                insightKey: 'LCPBreakdown',
                strings: {},
                title: 'LCP by Phase',
                description: 'some description',
                docs: '',
                category: Trace.Insights.Types.InsightCategory.ALL,
                state: 'fail',
                frameId: '123',
            };
            renderElementIntoDOM(component);
            await component.updateComplete;
            assert.isNotNull(component.element.shadowRoot);
            const estSavings = component.element.shadowRoot?.querySelector('slot[name=insight-savings]');
            assert.isOk(estSavings);
            assert.strictEqual(estSavings.innerText, 'Est savings: 5.0 kB');
        });
        it('outputs the correct estimated savings for time only', async () => {
            const component = makeTestComponent({ timeSavings: 50 });
            component.model = {
                insightKey: 'LCPBreakdown',
                strings: {},
                title: 'LCP by Phase',
                description: 'some description',
                docs: '',
                category: Trace.Insights.Types.InsightCategory.ALL,
                state: 'fail',
                frameId: '123',
            };
            renderElementIntoDOM(component);
            await component.updateComplete;
            assert.isNotNull(component.element.shadowRoot);
            const estSavings = component.element.shadowRoot?.querySelector('slot[name=insight-savings]');
            assert.isOk(estSavings);
            assert.strictEqual(estSavings.innerText, 'Est savings: 50 ms');
        });
        it('includes the output in the insight aria label', async () => {
            const component = makeTestComponent({ wastedBytes: 5_000, timeSavings: 50 });
            component.model = {
                insightKey: 'LCPBreakdown',
                strings: {},
                title: 'LCP by Phase',
                description: 'some description',
                docs: '',
                category: Trace.Insights.Types.InsightCategory.ALL,
                state: 'fail',
                frameId: '123',
            };
            renderElementIntoDOM(component);
            await component.updateComplete;
            assert.isNotNull(component.element.shadowRoot);
            const label = component.element.shadowRoot?.querySelector('header')?.getAttribute('aria-label');
            assert.isOk(label);
            assert.strictEqual(label, 'View details for LCP by Phase insight. Estimated savings for this insight: 50 ms and 5.0 kB transfer size');
        });
    });
    describe('Ask AI Insights', () => {
        const FAKE_LCP_MODEL = {
            insightKey: 'LCPBreakdown',
            strings: {},
            title: 'LCP by Phase',
            description: 'some description',
            docs: '',
            category: Trace.Insights.Types.InsightCategory.ALL,
            state: 'fail',
            frameId: '123',
        };
        const FAKE_INSIGHT_SET_BOUNDS = Trace.Helpers.Timing.traceWindowFromMicroSeconds(0, 0);
        async function renderComponent({ insightHasAISupport }) {
            const component = insightHasAISupport ? new TestInsightComponentWithAISupport() : new TestInsightComponentNoAISupport();
            component.selected = true;
            component.model = FAKE_LCP_MODEL;
            // We don't need a real trace for these tests.
            component.bounds = FAKE_INSIGHT_SET_BOUNDS;
            renderElementIntoDOM(component);
            await component.updateComplete;
            assert.isNotNull(component.element.shadowRoot);
            return component;
        }
        it('renders the "Ask AI" button when perf insights AI is enabled and the Insight supports it', async () => {
            updateHostConfig({
                aidaAvailability: {
                    enabled: true,
                },
                devToolsAiAssistancePerformanceAgent: {
                    enabled: true,
                }
            });
            const component = await renderComponent({ insightHasAISupport: true });
            assert.isOk(component.element.shadowRoot);
            const button = component.element.shadowRoot.querySelector('devtools-button[data-insights-ask-ai]');
            assert.isOk(button);
        });
        it('does not render the "Ask AI" button when AI is disabled', async () => {
            updateHostConfig({
                devToolsAiAssistancePerformanceAgent: {
                    enabled: true,
                }
            });
            const component = await renderComponent({ insightHasAISupport: true });
            assert.isOk(component.element.shadowRoot);
            const button = component.element.shadowRoot.querySelector('devtools-button[data-insights-ask-ai]');
            assert.isNotOk(button);
        });
        it('adds a descriptive aria label to the button', async () => {
            updateHostConfig({
                aidaAvailability: {
                    enabled: true,
                },
                devToolsAiAssistancePerformanceAgent: {
                    enabled: true,
                }
            });
            const component = await renderComponent({ insightHasAISupport: true });
            assert.isOk(component.element.shadowRoot);
            const button = component.element.shadowRoot.querySelector('devtools-button[data-insights-ask-ai]');
            assert.isOk(button);
            assert.strictEqual(button.getAttribute('aria-label'), 'Ask AI about LCP by Phase insight');
        });
        it('does not render the "Ask AI" button if disabled by enterprise policy', async () => {
            updateHostConfig({
                devToolsAiAssistancePerformanceAgent: {
                    enabled: true,
                },
                aidaAvailability: {
                    enterprisePolicyValue: Root.Runtime.GenAiEnterprisePolicyValue.DISABLE,
                }
            });
            const component = await renderComponent({ insightHasAISupport: true });
            assert.isOk(component.element.shadowRoot);
            const button = component.element.shadowRoot.querySelector('devtools-button[data-insights-ask-ai]');
            assert.isNull(button);
        });
        it('does not show the button if the feature is enabled but the Insight does not support it', async () => {
            updateHostConfig({
                devToolsAiAssistancePerformanceAgent: {
                    enabled: true,
                }
            });
            const component = await renderComponent({ insightHasAISupport: false });
            assert.isOk(component.element.shadowRoot);
            const button = component.element.shadowRoot.querySelector('devtools-button[data-insights-ask-ai]');
            assert.isNull(button);
        });
        it('sets the context when the user clicks the button', async () => {
            // @ts-expect-error: don't need real data.
            const focus = new AIAssistance.AIContext.AgentFocus({ parsedTrace: { insights: new Map() } });
            updateHostConfig({
                aidaAvailability: {
                    enabled: true,
                },
                devToolsAiAssistancePerformanceAgent: {
                    enabled: true,
                }
            });
            const component = await renderComponent({ insightHasAISupport: true });
            component.agentFocus = focus;
            assert.isOk(component.element.shadowRoot);
            const button = component.element.shadowRoot.querySelector('devtools-button[data-insights-ask-ai]');
            assert.isOk(button);
            sinon.stub(UI.ActionRegistry.ActionRegistry.instance(), 'hasAction')
                .withArgs(sinon.match(/drjones\.performance-panel-context/))
                .returns(true);
            const FAKE_ACTION = sinon.createStubInstance(UI.ActionRegistration.Action);
            sinon.stub(UI.ActionRegistry.ActionRegistry.instance(), 'getAction')
                .withArgs(sinon.match(/drjones\.performance-panel-context/))
                .returns(FAKE_ACTION);
            dispatchClickEvent(button);
            const newFocus = UI.Context.Context.instance().flavor(AIAssistance.AIContext.AgentFocus);
            assert.instanceOf(newFocus, AIAssistance.AIContext.AgentFocus);
        });
        it('clears "insight" from the active context when it gets toggled shut', async () => {
            const mockInsight = {
                insightKey: 'LCPBreakdown',
                strings: {},
                title: 'LCP by Phase',
                description: 'some description',
                docs: '',
                category: Trace.Insights.Types.InsightCategory.ALL,
                state: 'fail',
                frameId: '123',
            };
            // @ts-expect-error: don't need real data.
            const focus = new AIAssistance.AIContext.AgentFocus({ parsedTrace: { insights: new Map() }, insight: mockInsight });
            UI.Context.Context.instance().setFlavor(AIAssistance.AIContext.AgentFocus, focus);
            const component = await renderComponent({ insightHasAISupport: true });
            component.agentFocus = focus;
            component.insightSetKey = 'key';
            component.model = mockInsight;
            const header = component.element.shadowRoot?.querySelector('header');
            assert.isOk(header);
            dispatchClickEvent(header);
            const newFocus = UI.Context.Context.instance().flavor(AIAssistance.AIContext.AgentFocus);
            assert.isNull(newFocus?.insight);
            assert.isOk(newFocus?.parsedTrace);
        });
        it('does not render the "Ask AI" button when the perf agent is not enabled', async () => {
            updateHostConfig({
                devToolsAiAssistancePerformanceAgent: {
                    enabled: false,
                }
            });
            const component = await renderComponent({ insightHasAISupport: true }); // The Insight supports it, but the feature is not enabled
            assert.isOk(component.element.shadowRoot);
            const button = component.element.shadowRoot.querySelector('devtools-button[data-insights-ask-ai]');
            assert.isNull(button);
        });
    });
});
//# sourceMappingURL=BaseInsightComponent.test.js.map