// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import { assertScreenshot, renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
describeWithEnvironment('RadioSetting', () => {
    let lighthouse;
    beforeEach(async () => {
        lighthouse = await import('./lighthouse.js');
    });
    it('renders correctly', async () => {
        const setting = Common.Settings.Settings.instance().createSetting('test-radio-setting', 'b', "Local" /* Common.Settings.SettingStorageType.LOCAL */);
        const options = [
            { value: 'a', label: () => 'Option A' },
            { value: 'b', label: () => 'Option B' },
            { value: 'c', label: () => 'Option C' },
        ];
        const radioSetting = new lighthouse.RadioSetting.RadioSetting(options, setting, 'Test Radio Setting');
        renderElementIntoDOM(radioSetting.element);
        await assertScreenshot('lighthouse/RadioSetting.png');
    });
});
//# sourceMappingURL=RadioSetting.test.js.map