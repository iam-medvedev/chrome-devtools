// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import * as Common from '../../core/common/common.js';
import { assertScreenshot, renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import * as Sensors from './sensors.js';
describeWithEnvironment('LocationsSettingsTab', () => {
    let tab;
    let customSetting;
    beforeEach(async () => {
        customSetting = Common.Settings.Settings.instance().moduleSetting('emulation.locations');
        customSetting.set([]);
        tab = renderElementIntoDOM(new Sensors.LocationsSettingsTab.LocationsSettingsTab());
        tab.element.style.display = 'flex';
        tab.element.style.width = '780px';
        tab.element.style.height = '400px';
        await tab.updateComplete;
    });
    it('renders default empty state', async () => {
        await assertScreenshot('sensors/LocationsSettingsTab/empty.png');
    });
    it('renders populated custom locations list', async () => {
        customSetting.set([
            {
                title: 'London',
                lat: 51.5074,
                long: -0.1278,
                timezoneId: 'Europe/London',
                locale: 'en-GB',
                accuracy: 100,
            },
            {
                title: 'San Francisco',
                lat: 37.7749,
                long: -122.4194,
                timezoneId: 'America/Los_Angeles',
                locale: 'en-US',
                accuracy: 10,
            },
        ]);
        // The tab listens to setting change listeners, so it should auto-update.
        await tab.updateComplete;
        await assertScreenshot('sensors/LocationsSettingsTab/populated.png');
    });
    it('renders add location editor mode', async () => {
        const addButton = tab.contentElement.querySelector('.add-locations-button');
        assert.exists(addButton);
        addButton.click();
        await tab.updateComplete;
        await assertScreenshot('sensors/LocationsSettingsTab/add-editor.png');
    });
    it('renders edit location mode with validation errors', async () => {
        customSetting.set([
            {
                title: 'London',
                lat: 51.5074,
                long: -0.1278,
                timezoneId: 'Europe/London',
                locale: 'en-GB',
                accuracy: 100,
            },
        ]);
        await tab.updateComplete;
        const listWidgetElement = tab.contentElement.querySelector('.locations-list');
        assert.exists(listWidgetElement);
        assert.exists(listWidgetElement.shadowRoot);
        // Find the edit button inside the list item and click it
        const editButton = listWidgetElement.shadowRoot.querySelector('devtools-button[title="Edit"]');
        assert.exists(editButton);
        editButton.click();
        await tab.updateComplete;
        // Now let's enter an invalid latitude to trigger a validation error
        const latInput = listWidgetElement.shadowRoot.querySelector('input[placeholder="Latitude"]');
        assert.exists(latInput);
        latInput.value = '150'; // Invalid: max 90
        latInput.dispatchEvent(new Event('input'));
        // Trigger timezone ID error as well
        const tzInput = listWidgetElement.shadowRoot.querySelector('input[placeholder="Timezone ID"]');
        assert.exists(tzInput);
        tzInput.value = '123'; // Invalid: must contain alphabetic characters
        tzInput.dispatchEvent(new Event('input'));
        await tab.updateComplete;
        await assertScreenshot('sensors/LocationsSettingsTab/edit-editor-invalid.png');
    });
});
//# sourceMappingURL=LocationsSettingsTab.test.js.map