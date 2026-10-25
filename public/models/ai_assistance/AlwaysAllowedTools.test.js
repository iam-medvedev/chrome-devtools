// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import sinon from 'sinon';
import { updateHostConfig } from '../../testing/EnvironmentHelpers.js';
import { createSettingsForTest } from '../../testing/SettingsHelpers.js';
import * as AiAssistance from './ai_assistance.js';
const { AlwaysAllowedTools } = AiAssistance.AlwaysAllowedTools;
const { ToolName } = AiAssistance.Tool;
describe('AlwaysAllowedTools', () => {
    beforeEach(() => {
        updateHostConfig({ devToolsAiNaturalLanguageInterface: { enabled: true } });
    });
    it('does not allow tools by default', () => {
        const alwaysAllowedTools = new AlwaysAllowedTools(createSettingsForTest());
        assert.isFalse(alwaysAllowedTools.isAllowed("getCookieValues" /* ToolName.GET_COOKIE_VALUES */));
    });
    it('allows a tool', () => {
        const alwaysAllowedTools = new AlwaysAllowedTools(createSettingsForTest());
        alwaysAllowedTools.allow("getCookieValues" /* ToolName.GET_COOKIE_VALUES */);
        assert.isTrue(alwaysAllowedTools.isAllowed("getCookieValues" /* ToolName.GET_COOKIE_VALUES */));
        assert.isFalse(alwaysAllowedTools.isAllowed("getStorageValues" /* ToolName.GET_STORAGE_VALUES */));
    });
    it('persists allowed tools in settings', () => {
        const settings = createSettingsForTest();
        new AlwaysAllowedTools(settings).allow("getCookieValues" /* ToolName.GET_COOKIE_VALUES */);
        assert.isTrue(new AlwaysAllowedTools(settings).isAllowed("getCookieValues" /* ToolName.GET_COOKIE_VALUES */));
    });
    it('does not store a tool twice', () => {
        const settings = createSettingsForTest();
        const alwaysAllowedTools = new AlwaysAllowedTools(settings);
        alwaysAllowedTools.allow("getCookieValues" /* ToolName.GET_COOKIE_VALUES */);
        alwaysAllowedTools.allow("getCookieValues" /* ToolName.GET_COOKIE_VALUES */);
        assert.deepEqual(settings.createSetting('ai-assistance-always-allowed-tools', []).get(), ["getCookieValues" /* ToolName.GET_COOKIE_VALUES */]);
    });
    it('removes a tool', () => {
        const alwaysAllowedTools = new AlwaysAllowedTools(createSettingsForTest());
        alwaysAllowedTools.allow("getCookieValues" /* ToolName.GET_COOKIE_VALUES */);
        alwaysAllowedTools.allow("getStorageValues" /* ToolName.GET_STORAGE_VALUES */);
        alwaysAllowedTools.remove("getCookieValues" /* ToolName.GET_COOKIE_VALUES */);
        assert.isFalse(alwaysAllowedTools.isAllowed("getCookieValues" /* ToolName.GET_COOKIE_VALUES */));
        assert.isTrue(alwaysAllowedTools.isAllowed("getStorageValues" /* ToolName.GET_STORAGE_VALUES */));
    });
    it('lists allowed tools in the order they were allowed', () => {
        const alwaysAllowedTools = new AlwaysAllowedTools(createSettingsForTest());
        assert.deepEqual(alwaysAllowedTools.list(), []);
        alwaysAllowedTools.allow("getStorageValues" /* ToolName.GET_STORAGE_VALUES */);
        alwaysAllowedTools.allow("getCookieValues" /* ToolName.GET_COOKIE_VALUES */);
        assert.deepEqual(alwaysAllowedTools.list(), ["getStorageValues" /* ToolName.GET_STORAGE_VALUES */, "getCookieValues" /* ToolName.GET_COOKIE_VALUES */]);
    });
    it('dispatches a change event when the list changes', () => {
        const alwaysAllowedTools = new AlwaysAllowedTools(createSettingsForTest());
        const listener = sinon.stub();
        alwaysAllowedTools.addEventListener("ToolsChanged" /* AiAssistance.AlwaysAllowedTools.Events.TOOLS_CHANGED */, listener);
        alwaysAllowedTools.allow("getCookieValues" /* ToolName.GET_COOKIE_VALUES */);
        sinon.assert.calledOnce(listener);
        alwaysAllowedTools.remove("getCookieValues" /* ToolName.GET_COOKIE_VALUES */);
        sinon.assert.calledTwice(listener);
    });
    it('dispatches a change event when another instance changes the list', () => {
        const settings = createSettingsForTest();
        const alwaysAllowedTools = new AlwaysAllowedTools(settings);
        const listener = sinon.stub();
        alwaysAllowedTools.addEventListener("ToolsChanged" /* AiAssistance.AlwaysAllowedTools.Events.TOOLS_CHANGED */, listener);
        new AlwaysAllowedTools(settings).allow("getCookieValues" /* ToolName.GET_COOKIE_VALUES */);
        sinon.assert.calledOnce(listener);
        assert.deepEqual(alwaysAllowedTools.list(), ["getCookieValues" /* ToolName.GET_COOKIE_VALUES */]);
    });
    describe('when natural language interface is disabled', () => {
        beforeEach(() => {
            updateHostConfig({ devToolsAiNaturalLanguageInterface: { enabled: false } });
        });
        it('does not allow a tool', () => {
            const settings = createSettingsForTest();
            const alwaysAllowedTools = new AlwaysAllowedTools(settings);
            alwaysAllowedTools.allow("getCookieValues" /* ToolName.GET_COOKIE_VALUES */);
            assert.isFalse(alwaysAllowedTools.isAllowed("getCookieValues" /* ToolName.GET_COOKIE_VALUES */));
            assert.deepEqual(alwaysAllowedTools.list(), []);
            assert.deepEqual(settings.createSetting('ai-assistance-always-allowed-tools', []).get(), []);
        });
        it('ignores tools already stored in settings', () => {
            const settings = createSettingsForTest();
            settings.createSetting('ai-assistance-always-allowed-tools', []).set(["getCookieValues" /* ToolName.GET_COOKIE_VALUES */]);
            const alwaysAllowedTools = new AlwaysAllowedTools(settings);
            assert.isFalse(alwaysAllowedTools.isAllowed("getCookieValues" /* ToolName.GET_COOKIE_VALUES */));
            assert.deepEqual(alwaysAllowedTools.list(), []);
        });
        it('does not remove tools stored in settings', () => {
            const settings = createSettingsForTest();
            const setting = settings.createSetting('ai-assistance-always-allowed-tools', []);
            setting.set(["getCookieValues" /* ToolName.GET_COOKIE_VALUES */]);
            new AlwaysAllowedTools(settings).remove("getCookieValues" /* ToolName.GET_COOKIE_VALUES */);
            assert.deepEqual(setting.get(), ["getCookieValues" /* ToolName.GET_COOKIE_VALUES */]);
        });
    });
});
//# sourceMappingURL=AlwaysAllowedTools.test.js.map