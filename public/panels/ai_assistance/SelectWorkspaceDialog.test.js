// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Persistence from '../../models/persistence/persistence.js';
import * as Workspace from '../../models/workspace/workspace.js';
import { createTestFilesystem } from '../../testing/AiAssistanceHelpers.js';
import { dispatchKeyDownEvent, renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import { createViewFunctionStub } from '../../testing/ViewFunctionHelpers.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as AiAssistance from './ai_assistance.js';
describeWithEnvironment('SelectWorkspaceDialog', () => {
    afterEach(() => {
        const workspace = Workspace.Workspace.WorkspaceImpl.instance();
        for (const project of workspace.projects()) {
            workspace.removeProject(project);
        }
    });
    function createComponent() {
        createTestFilesystem('file://test1');
        const { project } = createTestFilesystem('file://test2');
        const dialog = new UI.Dialog.Dialog('select-workspace');
        const hideDialogSpy = sinon.spy(dialog, 'hide');
        const view = createViewFunctionStub(AiAssistance.SelectWorkspaceDialog);
        const onProjectSelected = sinon.spy();
        const component = new AiAssistance.SelectWorkspaceDialog({ dialog, onProjectSelected }, view);
        component.markAsRoot();
        const container = document.createElement('div');
        renderElementIntoDOM(container);
        component.show(container);
        assert.strictEqual(view.callCount, 1);
        assert.strictEqual(view.input.selectedIndex, 0);
        return { view, component, onProjectSelected, hideDialogSpy, project };
    }
    it('selects a project', async () => {
        const { view, onProjectSelected, hideDialogSpy, project } = createComponent();
        view.input.onProjectSelected(1);
        const input = await view.nextInput;
        assert.strictEqual(view.callCount, 2);
        assert.strictEqual(input.selectedIndex, 1);
        view.input.onSelectButtonClick();
        assert.isTrue(onProjectSelected.calledOnceWith(project));
        assert.isTrue(hideDialogSpy.calledOnce);
    });
    it('can be canceled', async () => {
        const { view, onProjectSelected, hideDialogSpy } = createComponent();
        view.input.onProjectSelected(1);
        const input = await view.nextInput;
        assert.strictEqual(view.callCount, 2);
        assert.strictEqual(input.selectedIndex, 1);
        view.input.onCancelButtonClick();
        assert.isTrue(onProjectSelected.notCalled);
        assert.isTrue(hideDialogSpy.calledOnce);
    });
    it('listens to ArrowUp/Down', async () => {
        const { view, component } = createComponent();
        dispatchKeyDownEvent(component.element, { key: 'ArrowDown', bubbles: true, composed: true });
        let input = await view.nextInput;
        assert.strictEqual(view.callCount, 2);
        assert.strictEqual(input.selectedIndex, 1);
        dispatchKeyDownEvent(component.element, { key: 'ArrowUp', bubbles: true, composed: true });
        input = await view.nextInput;
        assert.strictEqual(view.callCount, 3);
        assert.strictEqual(input.selectedIndex, 0);
    });
    it('can add projects', async () => {
        const addProjectSpy = sinon.spy(Persistence.IsolatedFileSystemManager.IsolatedFileSystemManager.instance(), 'addFileSystem');
        const { view } = createComponent();
        assert.strictEqual(view.callCount, 1);
        assert.lengthOf(view.input.projects, 2);
        assert.strictEqual(view.input.selectedIndex, 0);
        view.input.onAddFolderButtonClick();
        assert.isTrue(addProjectSpy.calledOnce);
        createTestFilesystem('file://test3');
        const input = await view.nextInput;
        assert.strictEqual(view.callCount, 2);
        assert.lengthOf(input.projects, 3);
        assert.strictEqual(input.projects[2].name, 'test3');
        assert.strictEqual(input.selectedIndex, 2);
    });
    it('handles project removal', async () => {
        const addProjectSpy = sinon.spy(Persistence.IsolatedFileSystemManager.IsolatedFileSystemManager.instance(), 'addFileSystem');
        const { view, project } = createComponent();
        view.input.onProjectSelected(1);
        let input = await view.nextInput;
        assert.strictEqual(view.callCount, 2);
        assert.lengthOf(input.projects, 2);
        assert.strictEqual(input.selectedIndex, 1);
        input.onAddFolderButtonClick();
        assert.isTrue(addProjectSpy.calledOnce);
        Workspace.Workspace.WorkspaceImpl.instance().removeProject(project);
        input = await view.nextInput;
        assert.lengthOf(input.projects, 1);
        assert.strictEqual(input.selectedIndex, 0);
    });
});
//# sourceMappingURL=SelectWorkspaceDialog.test.js.map