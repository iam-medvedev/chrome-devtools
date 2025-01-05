// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Helpers from '../../../testing/DOMHelpers.js'; // eslint-disable-line rulesdir/es-modules-import
import * as Buttons from '../buttons/buttons.js';
import * as RenderCoordinator from '../render_coordinator/render_coordinator.js';
import * as Dialogs from './dialogs.js';
describe('ButtonDialog', () => {
    async function getButtonDialog(fieldToTest) {
        const defaultMinimumButtonDialogData = {
            openOnRender: false,
            iconName: 'help',
            variant: "toolbar" /* Buttons.Button.Variant.TOOLBAR */,
            dialogTitle: '',
        };
        const buttonDialog = new Dialogs.ButtonDialog.ButtonDialog();
        buttonDialog.data = Object.assign(defaultMinimumButtonDialogData, fieldToTest);
        Helpers.renderElementIntoDOM(buttonDialog);
        await RenderCoordinator.done();
        return buttonDialog;
    }
    function getButtonFromButtonDialog(buttonDialog) {
        assert.isNotNull(buttonDialog.shadowRoot);
        const button = buttonDialog.shadowRoot.querySelector('devtools-button');
        if (!button) {
            assert.fail('devtools-button not found');
        }
        assert.instanceOf(button, HTMLElement);
        return button;
    }
    function getDialogFromButtonDialog(buttonDialog) {
        assert.isNotNull(buttonDialog.shadowRoot);
        const dialog = buttonDialog.shadowRoot.querySelector('devtools-dialog');
        if (!dialog) {
            assert.fail('devtools-dialog not found');
        }
        assert.instanceOf(dialog, HTMLElement);
        return dialog;
    }
    it('should display dialog on initial render when provided prop', async () => {
        const buttonDialog = await getButtonDialog({
            openOnRender: true,
        });
        const dialog = getDialogFromButtonDialog(buttonDialog);
        assert.isTrue(dialog.hasAttribute('open'));
    });
    it('should not display dialog on initial render by default', async () => {
        const buttonDialog = await getButtonDialog({
            openOnRender: false,
        });
        const dialog = getDialogFromButtonDialog(buttonDialog);
        assert.isFalse(dialog.hasAttribute('open'));
    });
    it('Opens if button is clicked', async () => {
        const buttonDialog = await getButtonDialog({});
        const dialog = getDialogFromButtonDialog(buttonDialog);
        assert.isFalse(dialog.hasAttribute('open'));
        const button = getButtonFromButtonDialog(buttonDialog);
        button.click();
        await RenderCoordinator.done();
        assert.isTrue(dialog.hasAttribute('open'));
    });
});
//# sourceMappingURL=ButtonDialog.test.js.map