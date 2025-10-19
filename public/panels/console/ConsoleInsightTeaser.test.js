// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as AiAssistanceModel from '../../models/ai_assistance/ai_assistance.js';
import { describeWithEnvironment, updateHostConfig } from '../../testing/EnvironmentHelpers.js';
import { createViewFunctionStub } from '../../testing/ViewFunctionHelpers.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as PanelCommon from '../common/common.js';
import * as Console from './console.js';
describeWithEnvironment('ConsoleInsightTeaser', () => {
    let originalLanguageModel;
    beforeEach(() => {
        // @ts-expect-error
        originalLanguageModel = window.LanguageModel;
    });
    afterEach(() => {
        AiAssistanceModel.BuiltInAi.BuiltInAi.removeInstance();
        // @ts-expect-error
        window.LanguageModel = originalLanguageModel;
    });
    it('renders the loading state', async () => {
        const view = createViewFunctionStub(Console.ConsoleInsightTeaser.ConsoleInsightTeaser);
        new Console.ConsoleInsightTeaser.ConsoleInsightTeaser('test-uuid', {}, undefined, view);
        const input = await view.nextInput;
        assert.isFalse(input.isInactive);
        assert.isEmpty(input.mainText);
        assert.isEmpty(input.headerText);
    });
    const setupBuiltInAi = (generateResponse) => {
        updateHostConfig({
            devToolsAiPromptApi: {
                enabled: true,
            },
        });
        const mockLanguageModel = {
            destroy: () => { },
            clone: () => mockLanguageModel,
            promptStreaming: generateResponse,
        };
        // @ts-expect-error
        window.LanguageModel = {
            availability: () => 'available',
            create: () => mockLanguageModel,
        };
        return {
            consoleMessage: () => {
                return {
                    runtimeModel: () => null,
                    getAffectedResources: () => undefined,
                };
            },
            toMessageTextString: () => 'message text string',
            contentElement: () => document.createElement('div'),
        };
    };
    it('renders the generated response', async () => {
        const consoleViewMessage = setupBuiltInAi(async function* () {
            yield JSON.stringify({
                header: 'test header',
                explanation: 'test explanation',
            });
        });
        const view = createViewFunctionStub(Console.ConsoleInsightTeaser.ConsoleInsightTeaser);
        const teaser = new Console.ConsoleInsightTeaser.ConsoleInsightTeaser('test-uuid', consoleViewMessage, undefined, view);
        await teaser.maybeGenerateTeaser();
        const input = await view.nextInput;
        assert.isFalse(input.isInactive);
        assert.strictEqual(input.headerText, 'test header');
        assert.strictEqual(input.mainText, 'test explanation');
    });
    it('executes action on "Tell me more" click if onboarding is completed', async () => {
        const action = sinon.spy();
        sinon.stub(UI.ActionRegistry.ActionRegistry.instance(), 'getAction').returns({
            execute: action,
        });
        const view = createViewFunctionStub(Console.ConsoleInsightTeaser.ConsoleInsightTeaser);
        new Console.ConsoleInsightTeaser.ConsoleInsightTeaser('test-uuid', {}, undefined, view);
        const input = await view.nextInput;
        input.onTellMeMoreClick(new Event('click'));
        sinon.assert.calledOnce(action);
    });
    it('shows FRE dialog on "Tell me more" click', async () => {
        Common.Settings.settingForTest('console-insights-enabled').set(false);
        const show = sinon.stub(PanelCommon.FreDialog, 'show');
        const view = createViewFunctionStub(Console.ConsoleInsightTeaser.ConsoleInsightTeaser);
        new Console.ConsoleInsightTeaser.ConsoleInsightTeaser('test-uuid', {}, undefined, view);
        const input = await view.nextInput;
        await input.onTellMeMoreClick(new Event('click'));
        sinon.assert.calledOnce(show);
        Common.Settings.settingForTest('console-insights-enabled').set(true);
        show.restore();
    });
    it('executes action on "Tell me more" click if onboarding is completed', async () => {
        const action = sinon.spy();
        const getAction = sinon.stub(UI.ActionRegistry.ActionRegistry.instance(), 'getAction').returns({
            execute: action,
        });
        const view = createViewFunctionStub(Console.ConsoleInsightTeaser.ConsoleInsightTeaser);
        new Console.ConsoleInsightTeaser.ConsoleInsightTeaser('test-uuid', {}, undefined, view);
        const input = await view.nextInput;
        input.onTellMeMoreClick(new Event('click'));
        sinon.assert.calledOnce(action);
        getAction.restore();
    });
    it('disables teasers on "Dont show" change', async () => {
        const view = createViewFunctionStub(Console.ConsoleInsightTeaser.ConsoleInsightTeaser);
        new Console.ConsoleInsightTeaser.ConsoleInsightTeaser('test-uuid', {}, undefined, view);
        const input = await view.nextInput;
        const event = {
            target: {
                checked: true,
            },
        };
        assert.isTrue(Common.Settings.moduleSetting('console-insight-teasers-enabled').get());
        input.dontShowChanged(event);
        assert.isFalse(Common.Settings.moduleSetting('console-insight-teasers-enabled').get());
        Common.Settings.settingForTest('console-insight-teasers-enabled').set(true);
    });
    it('updates its view if teaser generation is slow', async () => {
        const consoleViewMessage = setupBuiltInAi(async function* () {
            await new Promise(() => { });
            yield 'unreached';
        });
        const clock = sinon.useFakeTimers({ toFake: ['setTimeout'] });
        const view = createViewFunctionStub(Console.ConsoleInsightTeaser.ConsoleInsightTeaser);
        const teaser = new Console.ConsoleInsightTeaser.ConsoleInsightTeaser('test-uuid', consoleViewMessage, undefined, view);
        let input = await view.nextInput;
        assert.isFalse(input.isInactive);
        assert.isEmpty(input.mainText);
        assert.isEmpty(input.headerText);
        assert.isFalse(input.isSlowGeneration);
        await teaser.maybeGenerateTeaser();
        clock.runAll();
        input = await view.nextInput;
        assert.isFalse(input.isInactive);
        assert.isEmpty(input.mainText);
        assert.isEmpty(input.headerText);
        assert.isTrue(input.isSlowGeneration);
        clock.restore();
    });
    it('can show error state', async () => {
        const consoleViewMessage = setupBuiltInAi(async function* () {
            yield 'Not a JSON, causes error';
        });
        // A console error is emitted when the response cannot be parsed correctly.
        // We don't need that noise in the test output.
        sinon.stub(console, 'error');
        const view = createViewFunctionStub(Console.ConsoleInsightTeaser.ConsoleInsightTeaser);
        const teaser = new Console.ConsoleInsightTeaser.ConsoleInsightTeaser('test-uuid', consoleViewMessage, undefined, view);
        let input = await view.nextInput;
        assert.isFalse(input.isInactive);
        assert.isEmpty(input.mainText);
        assert.isEmpty(input.headerText);
        assert.isFalse(input.isError);
        await teaser.maybeGenerateTeaser();
        input = await view.nextInput;
        assert.isFalse(input.isInactive);
        assert.isEmpty(input.mainText);
        assert.isEmpty(input.headerText);
        assert.isTrue(input.isError);
    });
});
//# sourceMappingURL=ConsoleInsightTeaser.test.js.map