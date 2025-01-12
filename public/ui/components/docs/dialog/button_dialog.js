// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as FrontendHelpers from '../../../../testing/EnvironmentHelpers.js';
import * as Buttons from '../../buttons/buttons.js';
import * as Dialogs from '../../dialogs/dialogs.js';
import * as ComponentHelpers from '../../helpers/helpers.js';
await ComponentHelpers.ComponentServerSetup.setup();
await FrontendHelpers.initializeGlobalVars();
const buttonDialog = new Dialogs.ButtonDialog.ButtonDialog();
buttonDialog.data = {
    openOnRender: false,
    variant: "toolbar" /* Buttons.Button.Variant.TOOLBAR */,
    iconName: 'help',
    position: "auto" /* Dialogs.Dialog.DialogVerticalPosition.AUTO */,
    horizontalAlignment: "auto" /* Dialogs.Dialog.DialogHorizontalAlignment.AUTO */,
    closeOnESC: true,
    closeOnScroll: false,
    closeButton: true,
    dialogTitle: 'Button dialog example',
};
const div = document.createElement('div');
div.style.padding = '0 var(--sys-size-8)';
div.createChild('div').innerHTML = 'Hello, World';
div.createChild('div').innerHTML = 'This is a super long content. This is a super long content';
buttonDialog.appendChild(div);
document.getElementById('container')?.appendChild(buttonDialog);
//# sourceMappingURL=button_dialog.js.map