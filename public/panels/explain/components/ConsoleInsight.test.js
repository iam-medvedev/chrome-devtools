// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../core/common/common.js';
import * as Host from '../../../core/host/host.js';
import { dispatchClickEvent, getCleanTextContentFromElements, renderElementIntoDOM, } from '../../../testing/DOMHelpers.js';
import { describeWithEnvironment, getGetHostConfigStub } from '../../../testing/EnvironmentHelpers.js';
import * as Explain from '../explain.js';
describeWithEnvironment('ConsoleInsight', () => {
    let component;
    afterEach(() => {
        component?.remove();
        Common.Settings.settingForTest('console-insights-enabled').set(true);
        Common.Settings.settingForTest('console-insights-onboarding-finished').set(true);
    });
    function getTestAidaClient() {
        return {
            async *fetch() {
                yield { explanation: 'test', metadata: { rpcGlobalId: 0 }, completed: true };
            },
            registerClientEvent: sinon.spy(),
        };
    }
    function getTestPromptBuilder() {
        return {
            async buildPrompt() {
                return {
                    prompt: '',
                    sources: [
                        {
                            type: Explain.SourceType.MESSAGE,
                            value: 'error message',
                        },
                    ],
                    isPageReloadRecommended: true,
                };
            },
            getSearchQuery() {
                return '';
            },
        };
    }
    async function drainMicroTasks() {
        await new Promise(resolve => setTimeout(resolve, 0));
    }
    it('shows opt-in teaser when setting is turned off', async () => {
        Common.Settings.settingForTest('console-insights-enabled').set(false);
        component = new Explain.ConsoleInsight(getTestPromptBuilder(), getTestAidaClient(), "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */);
        renderElementIntoDOM(component);
        await drainMicroTasks();
        assert.isNotNull(component.shadowRoot);
        assert.deepEqual(getCleanTextContentFromElements(component.shadowRoot, 'main'), [
            'Turn on Console insights in Settings to receive AI assistance for understanding and addressing console warnings and errors. Learn more',
        ]);
    });
    it('shows opt-in teaser when blocked by age', async () => {
        const stub = getGetHostConfigStub({
            aidaAvailability: {
                blockedByAge: true,
            },
            devToolsConsoleInsights: {
                enabled: true,
            },
        });
        component = new Explain.ConsoleInsight(getTestPromptBuilder(), getTestAidaClient(), "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */);
        renderElementIntoDOM(component);
        await drainMicroTasks();
        assert.isNotNull(component.shadowRoot);
        assert.deepEqual(getCleanTextContentFromElements(component.shadowRoot, 'main'), [
            'Turn on Console insights in Settings to receive AI assistance for understanding and addressing console warnings and errors. Learn more',
        ]);
        stub.restore();
    });
    it('generates an explanation when the user logs in', async () => {
        component = new Explain.ConsoleInsight(getTestPromptBuilder(), getTestAidaClient(), "no-account-email" /* Host.AidaClient.AidaAccessPreconditions.NO_ACCOUNT_EMAIL */);
        renderElementIntoDOM(component);
        await drainMicroTasks();
        assert.isNotNull(component.shadowRoot);
        assert.deepEqual(getCleanTextContentFromElements(component.shadowRoot, 'main'), [
            'This feature is only available when you sign into Chrome with your Google account.',
        ]);
        const stub = sinon.stub(Host.AidaClient.AidaClient, 'checkAccessPreconditions')
            .returns(Promise.resolve("available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */));
        Host.AidaClient.HostConfigTracker.instance().dispatchEventToListeners("aidaAvailabilityChanged" /* Host.AidaClient.Events.AIDA_AVAILABILITY_CHANGED */);
        await drainMicroTasks();
        assert.deepEqual(getCleanTextContentFromElements(component.shadowRoot, 'h2'), ['Explanation']);
        stub.restore();
    });
    it('shows opt-in teaser when setting is disabled via disabledCondition', async () => {
        const setting = Common.Settings.settingForTest('console-insights-enabled');
        setting.setRegistration({
            settingName: 'console-insights-enabled',
            settingType: "boolean" /* Common.Settings.SettingType.BOOLEAN */,
            defaultValue: true,
            disabledCondition: () => {
                return { disabled: true, reasons: ['disabled for test'] };
            },
        });
        component = new Explain.ConsoleInsight(getTestPromptBuilder(), getTestAidaClient(), "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */);
        renderElementIntoDOM(component);
        await drainMicroTasks();
        assert.isNotNull(component.shadowRoot);
        assert.deepEqual(getCleanTextContentFromElements(component.shadowRoot, 'main'), [
            'Turn on Console insights in Settings to receive AI assistance for understanding and addressing console warnings and errors. Learn more',
        ]);
        setting.setRegistration({
            settingName: 'console-insights-enabled',
            settingType: "boolean" /* Common.Settings.SettingType.BOOLEAN */,
            defaultValue: false,
        });
    });
    it('shows reminder on first run of console insights', async () => {
        Common.Settings.settingForTest('console-insights-onboarding-finished').set(false);
        component = new Explain.ConsoleInsight(getTestPromptBuilder(), getTestAidaClient(), "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */);
        renderElementIntoDOM(component);
        await drainMicroTasks();
        assert.isNotNull(component.shadowRoot);
        assert.strictEqual(component.shadowRoot.querySelector('h2')?.innerText, 'Understand console messages with AI');
        dispatchClickEvent(component.shadowRoot.querySelector('.continue-button'), {
            bubbles: true,
            composed: true,
        });
        await drainMicroTasks();
        // Rating buttons are shown.
        assert(component.shadowRoot.querySelector('.rating'));
    });
    const reportsRating = (positive) => async () => {
        const stub = getGetHostConfigStub({});
        const actionTaken = sinon.stub(Host.userMetrics, 'actionTaken');
        const aidaClient = getTestAidaClient();
        component = new Explain.ConsoleInsight(getTestPromptBuilder(), aidaClient, "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */);
        renderElementIntoDOM(component);
        await drainMicroTasks();
        dispatchClickEvent(component.shadowRoot.querySelector(`.rating [data-rating=${positive}]`), {
            bubbles: true,
            composed: true,
        });
        assert(aidaClient.registerClientEvent.calledOnce);
        sinon.assert.match(aidaClient.registerClientEvent.firstCall.firstArg, sinon.match({
            corresponding_aida_rpc_global_id: 0,
            do_conversation_client_event: {
                user_feedback: { sentiment: positive ? 'POSITIVE' : 'NEGATIVE' },
            },
        }));
        assert(actionTaken.calledWith(positive ? Host.UserMetrics.Action.InsightRatedPositive : Host.UserMetrics.Action.InsightRatedNegative));
        dispatchClickEvent(component.shadowRoot.querySelector(`.rating [data-rating=${positive}]`), {
            bubbles: true,
            composed: true,
        });
        // Can only rate once.
        assert(aidaClient.registerClientEvent.calledOnce);
        stub.restore();
    };
    it('reports positive rating', reportsRating(true));
    it('reports negative rating', reportsRating(false));
    it('has no thumbs up/down buttons if logging is disabled', async () => {
        const stub = getGetHostConfigStub({
            aidaAvailability: {
                disallowLogging: true,
            },
            devToolsConsoleInsights: {
                enabled: true,
            },
        });
        component = new Explain.ConsoleInsight(getTestPromptBuilder(), getTestAidaClient(), "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */);
        renderElementIntoDOM(component);
        await drainMicroTasks();
        const thumbsUpButton = component.shadowRoot.querySelector('.rating [data-rating="true"]');
        assert.isNull(thumbsUpButton);
        const thumbsDownButton = component.shadowRoot.querySelector('.rating [data-rating="false"]');
        assert.isNull(thumbsDownButton);
        stub.restore();
    });
    it('report if the user is not logged in', async () => {
        component = new Explain.ConsoleInsight(getTestPromptBuilder(), getTestAidaClient(), "no-account-email" /* Host.AidaClient.AidaAccessPreconditions.NO_ACCOUNT_EMAIL */);
        renderElementIntoDOM(component);
        await drainMicroTasks();
        const content = component.shadowRoot.querySelector('main').innerText.trim();
        assert.strictEqual(content, 'This feature is only available when you sign into Chrome with your Google account.');
    });
    it('report if the navigator is offline', async () => {
        component = new Explain.ConsoleInsight(getTestPromptBuilder(), getTestAidaClient(), "no-internet" /* Host.AidaClient.AidaAccessPreconditions.NO_INTERNET */);
        renderElementIntoDOM(component);
        await drainMicroTasks();
        const content = component.shadowRoot.querySelector('main').innerText.trim();
        assert.strictEqual(content, 'Check your internet connection and try again.');
    });
    it('displays factuality metadata as related content', async () => {
        function getAidaClientWithMetadata() {
            return {
                async *fetch() {
                    yield {
                        explanation: 'test',
                        metadata: {
                            rpcGlobalId: 0,
                            factualityMetadata: {
                                facts: [
                                    { sourceUri: 'https://www.firstSource.test/someInfo' },
                                    { sourceUri: 'https://www.anotherSource.test/page' },
                                ],
                            },
                        },
                        completed: true,
                    };
                },
                registerClientEvent: sinon.spy(),
            };
        }
        component = new Explain.ConsoleInsight(getTestPromptBuilder(), getAidaClientWithMetadata(), "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */);
        renderElementIntoDOM(component);
        await drainMicroTasks();
        const details = component.shadowRoot.querySelector('details');
        assert.strictEqual(details.querySelector('summary').textContent?.trim(), 'Sources and related content');
        const xLinks = details.querySelectorAll('x-link');
        assert.strictEqual(xLinks[0].textContent?.trim(), 'https://www.firstSource.test/someInfo');
        assert.strictEqual(xLinks[0].getAttribute('href'), 'https://www.firstSource.test/someInfo');
        assert.strictEqual(xLinks[1].textContent?.trim(), 'https://www.anotherSource.test/page');
        assert.strictEqual(xLinks[1].getAttribute('href'), 'https://www.anotherSource.test/page');
    });
});
//# sourceMappingURL=ConsoleInsight.test.js.map