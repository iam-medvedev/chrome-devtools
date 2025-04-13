// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Persistence from '../../models/persistence/persistence.js';
import * as Workspace from '../../models/workspace/workspace.js';
import { createTestFilesystem, setupAutomaticFileSystem } from '../../testing/AiAssistanceHelpers.js';
import { dispatchKeyDownEvent, renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import { createViewFunctionStub } from '../../testing/ViewFunctionHelpers.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as AiAssistance from './ai_assistance.js';
describeWithEnvironment('SelectWorkspaceDialog', () => {
    const root = '/path/to/my-automatic-file-system';
    beforeEach(() => {
        setupAutomaticFileSystem();
    });
    afterEach(() => {
        const workspace = Workspace.Workspace.WorkspaceImpl.instance();
        for (const project of workspace.projects()) {
            workspace.removeProject(project);
        }
        Persistence.AutomaticFileSystemManager.AutomaticFileSystemManager.removeInstance();
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
        sinon.assert.callCount(view, 1);
        assert.strictEqual(view.input.selectedIndex, 0);
        return { view, component, onProjectSelected, hideDialogSpy, project };
    }
    it('selects a project', async () => {
        const { view, onProjectSelected, hideDialogSpy, project } = createComponent();
        view.input.onProjectSelected(1);
        const input = await view.nextInput;
        sinon.assert.callCount(view, 2);
        assert.strictEqual(input.selectedIndex, 1);
        view.input.onSelectButtonClick();
        assert.isTrue(onProjectSelected.calledOnceWith(project));
        sinon.assert.calledOnce(hideDialogSpy);
    });
    it('can be canceled', async () => {
        const { view, onProjectSelected, hideDialogSpy } = createComponent();
        view.input.onProjectSelected(1);
        const input = await view.nextInput;
        sinon.assert.callCount(view, 2);
        assert.strictEqual(input.selectedIndex, 1);
        view.input.onCancelButtonClick();
        sinon.assert.notCalled(onProjectSelected);
        sinon.assert.calledOnce(hideDialogSpy);
    });
    it('listens to ArrowUp/Down', async () => {
        const { view, component } = createComponent();
        dispatchKeyDownEvent(component.element, { key: 'ArrowDown', bubbles: true, composed: true });
        let input = await view.nextInput;
        sinon.assert.callCount(view, 2);
        assert.strictEqual(input.selectedIndex, 1);
        dispatchKeyDownEvent(component.element, { key: 'ArrowUp', bubbles: true, composed: true });
        input = await view.nextInput;
        sinon.assert.callCount(view, 3);
        assert.strictEqual(input.selectedIndex, 0);
    });
    it('can add projects', async () => {
        const addProjectSpy = sinon.spy(Persistence.IsolatedFileSystemManager.IsolatedFileSystemManager.instance(), 'addFileSystem');
        const { view } = createComponent();
        sinon.assert.callCount(view, 1);
        assert.lengthOf(view.input.folders, 2);
        assert.strictEqual(view.input.selectedIndex, 0);
        view.input.onAddFolderButtonClick();
        sinon.assert.calledOnce(addProjectSpy);
        createTestFilesystem('file://test3');
        const input = await view.nextInput;
        sinon.assert.callCount(view, 2);
        assert.lengthOf(input.folders, 3);
        assert.strictEqual(input.folders[2].name, 'test3');
        assert.strictEqual(input.selectedIndex, 2);
    });
    it('handles project removal', async () => {
        const addProjectSpy = sinon.spy(Persistence.IsolatedFileSystemManager.IsolatedFileSystemManager.instance(), 'addFileSystem');
        const { view, project } = createComponent();
        view.input.onProjectSelected(1);
        let input = await view.nextInput;
        sinon.assert.callCount(view, 2);
        assert.lengthOf(input.folders, 2);
        assert.strictEqual(input.selectedIndex, 1);
        input.onAddFolderButtonClick();
        sinon.assert.calledOnce(addProjectSpy);
        Workspace.Workspace.WorkspaceImpl.instance().removeProject(project);
        input = await view.nextInput;
        assert.lengthOf(input.folders, 1);
        assert.strictEqual(input.selectedIndex, 0);
    });
    it('allows selecting an automatic workspace', async () => {
        setupAutomaticFileSystem({ hasFileSystem: true });
        const { view, onProjectSelected, hideDialogSpy } = createComponent();
        sinon.assert.callCount(view, 1);
        assert.lengthOf(view.input.folders, 3);
        assert.strictEqual(view.input.selectedIndex, 0);
        assert.strictEqual(view.input.folders[0].name, 'my-automatic-file-system');
        view.input.onSelectButtonClick();
        await new Promise(resolve => setTimeout(resolve, 0));
        const { project: automaticFileSystemProject } = createTestFilesystem(`file://${root}`);
        assert.isTrue(onProjectSelected.calledOnceWith(automaticFileSystemProject));
        sinon.assert.calledOnce(hideDialogSpy);
    });
});
//# sourceMappingURL=SelectWorkspaceDialog.test.js.map