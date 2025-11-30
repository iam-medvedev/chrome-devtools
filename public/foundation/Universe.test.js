// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../core/common/common.js';
import * as Foundation from './foundation.js';
describe('Universe', () => {
    it('can be instantiated', () => {
        const { SettingType } = Common.Settings;
        new Foundation.Universe.Universe({
            settingsCreationOptions: {
                syncedStorage: new Common.Settings.SettingsStorage({}),
                globalStorage: new Common.Settings.SettingsStorage({}),
                localStorage: new Common.Settings.SettingsStorage({}),
                settingRegistrations: [
                    { settingName: 'skip-stack-frames-pattern', settingType: "regex" /* SettingType.REGEX */, defaultValue: '' },
                    { settingName: 'skip-content-scripts', settingType: "boolean" /* SettingType.BOOLEAN */, defaultValue: true },
                    {
                        settingName: 'automatically-ignore-list-known-third-party-scripts',
                        settingType: "boolean" /* SettingType.BOOLEAN */,
                        defaultValue: true
                    },
                    { settingName: 'skip-anonymous-scripts', settingType: "boolean" /* SettingType.BOOLEAN */, defaultValue: false },
                    { settingName: 'enable-ignore-listing', settingType: "boolean" /* SettingType.BOOLEAN */, defaultValue: true },
                    { settingName: 'request-blocking-enabled', settingType: "boolean" /* SettingType.BOOLEAN */, defaultValue: false },
                ],
            },
        });
    });
});
//# sourceMappingURL=Universe.test.js.map