// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Root from '../../core/root/root.js';
// eslint-disable-next-line rulesdir/es_modules_import
import { deinitializeGlobalVars, initializeGlobalVars, } from '../../testing/EnvironmentHelpers.js';
import * as UI from '../../ui/legacy/legacy.js';
describe('Release Note', () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    let WhatsNew;
    before(async () => {
        await initializeGlobalVars();
        WhatsNew = await import('./whats_new.js');
        WhatsNew.ReleaseNoteText.setReleaseNoteForTest({
            version: 99,
            header: 'Highlights from Chrome 100 update',
            markdownLinks: [],
            link: 'https://developers.google.com/web/tools/chrome-devtools/',
            videoLinks: [],
        });
        // We need to add the What's New view so that an error is not thrown when requesting
        // to show the release notes when needed.
        UI.ViewManager.registerViewExtension({
            location: "drawer-view" /* UI.ViewManager.ViewLocationValues.DRAWER_VIEW */,
            id: 'release-note',
            title: () => 'What\'s New',
            commandPrompt: () => 'Show What\'s New',
            persistence: "closeable" /* UI.ViewManager.ViewPersistence.CLOSEABLE */,
            order: 1,
            async loadView() {
                return new WhatsNew.ReleaseNoteView.ReleaseNoteView();
            },
        });
        // This setting is used to determine if the What's New panel needs to be shown.
        Common.Settings.registerSettingsForTest([{
                category: "APPEARANCE" /* Common.Settings.SettingCategory.APPEARANCE */,
                title: () => 'Show What\'s New after each update',
                settingName: 'help.show-release-note',
                settingType: "boolean" /* Common.Settings.SettingType.BOOLEAN */,
                defaultValue: true,
            }]);
        Root.Runtime.experiments.clearForTest();
        await initializeGlobalVars({ reset: false });
    });
    after(async () => await deinitializeGlobalVars());
    it('sets and gets the last seen release note version correctly', () => {
        const releaseNoteVersionSetting = WhatsNew.WhatsNew.getReleaseNoteVersionSetting();
        assert.strictEqual(releaseNoteVersionSetting.get(), 0);
        releaseNoteVersionSetting.set(1);
        assert.strictEqual(releaseNoteVersionSetting.get(), 1);
    });
    it('updates the last seen version when the release notes are shown', () => {
        assert.strictEqual(WhatsNew.WhatsNew.getReleaseNoteVersionSetting().get(), 1);
        WhatsNew.WhatsNew.showReleaseNoteIfNeeded();
        assert.strictEqual(WhatsNew.WhatsNew.getReleaseNoteVersionSetting().get(), 99);
    });
    it('shows the release notes only when needed', () => {
        const lastSeenVersionSetting = WhatsNew.WhatsNew.getReleaseNoteVersionSetting();
        lastSeenVersionSetting.set(98);
        assert.isTrue(WhatsNew.WhatsNew.showReleaseNoteIfNeeded());
        lastSeenVersionSetting.set(99);
        assert.isFalse(WhatsNew.WhatsNew.showReleaseNoteIfNeeded());
        lastSeenVersionSetting.set(0);
        assert.isFalse(WhatsNew.WhatsNew.showReleaseNoteIfNeeded());
        lastSeenVersionSetting.set(100);
        assert.isFalse(WhatsNew.WhatsNew.showReleaseNoteIfNeeded());
    });
});
//# sourceMappingURL=ReleaseNote.test.js.map