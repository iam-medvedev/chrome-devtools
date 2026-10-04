// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import sinon from 'sinon';
import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Workspace from '../../models/workspace/workspace.js';
import { assertScreenshot, renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { createTarget, describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import * as CodeMirror from '../../third_party/codemirror.next/codemirror.next.js';
import * as TextEditor from '../../ui/components/text_editor/text_editor.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Sources from './sources.js';
const { urlString } = Platform.DevToolsPath;
const { CSSPlugin } = Sources.CSSPlugin;
describe('CSSPlugin', () => {
    describe('accepts', () => {
        it('holds true for documents', () => {
            const uiSourceCode = sinon.createStubInstance(Workspace.UISourceCode.UISourceCode);
            uiSourceCode.contentType.returns(Common.ResourceType.resourceTypes.Document);
            assert.isTrue(CSSPlugin.accepts(uiSourceCode));
        });
        it('holds true for style sheets', () => {
            const uiSourceCode = sinon.createStubInstance(Workspace.UISourceCode.UISourceCode);
            uiSourceCode.contentType.returns(Common.ResourceType.resourceTypes.Stylesheet);
            assert.isTrue(CSSPlugin.accepts(uiSourceCode));
        });
    });
});
describeWithEnvironment('CSSPlugin', () => {
    beforeEach(() => {
        sinon.stub(UI.ShortcutRegistry.ShortcutRegistry, 'instance').returns({
            shortcutTitleForAction: () => { },
            shortcutsForAction: () => [],
            getShortcutListener: () => { },
        });
        const tabTarget = createTarget({ type: SDK.Target.Type.TAB });
        createTarget({ parentTarget: tabTarget, subtype: 'prerender' });
        createTarget({ parentTarget: tabTarget });
    });
    function findAutocompletion(extensions) {
        if ('value' in extensions && extensions.value.override) {
            return extensions.value.override[0] || null;
        }
        if ('length' in extensions) {
            for (let i = 0; i < extensions.length; ++i) {
                const result = findAutocompletion(extensions[i]);
                if (result) {
                    return result;
                }
            }
        }
        return null;
    }
    it('suggests CSS class names from the stylesheet', async () => {
        const URL = urlString `http://example.com/styles.css`;
        const uiSourceCode = sinon.createStubInstance(Workspace.UISourceCode.UISourceCode);
        uiSourceCode.url.returns(URL);
        const plugin = new CSSPlugin(uiSourceCode);
        const autocompletion = findAutocompletion(plugin.editorExtension());
        const FROM = 42;
        sinon.stub(CodeMirror.Tree.prototype, 'resolveInner')
            .returns({ name: 'ClassName', from: FROM });
        const STYLESHEET_ID = 'STYLESHEET_ID';
        sinon.stub(SDK.CSSModel.CSSModel.prototype, 'getStyleSheetIdsForURL').withArgs(URL).returns([STYLESHEET_ID]);
        const CLASS_NAMES = ['foo', 'bar', 'baz'];
        sinon.stub(SDK.CSSModel.CSSModel.prototype, 'getClassNames').withArgs(STYLESHEET_ID).resolves(CLASS_NAMES);
        const completionResult = await autocompletion({ state: { field: () => { } } });
        assert.deepEqual(completionResult, {
            from: FROM,
            options: [
                { type: 'constant', label: CLASS_NAMES[0] },
                { type: 'constant', label: CLASS_NAMES[1] },
                { type: 'constant', label: CLASS_NAMES[2] },
            ],
        });
    });
    it('renders color and bezier swatches with consistent line heights', async () => {
        const uiSourceCode = sinon.createStubInstance(Workspace.UISourceCode.UISourceCode);
        uiSourceCode.url.returns(urlString `http://example.com/styles.css`);
        const plugin = new CSSPlugin(uiSourceCode);
        const doc = `.example {
  width: 200px;
  background-color: #3b82f6;
  border-radius: 8px;
  transition:
    transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1),
    background-color 1.2s ease-in-out;
  opacity: 0.7;
}`;
        const editor = new TextEditor.TextEditor.TextEditor(CodeMirror.EditorState.create({
            doc,
            extensions: [
                TextEditor.Config.baseConfiguration(doc),
                CodeMirror.lineNumbers(),
                CodeMirror.css.css(),
                plugin.editorExtension(),
            ],
        }));
        renderElementIntoDOM(editor, { includeCommonStyles: true });
        const lines = Array.from(editor.editor.dom.querySelectorAll('.cm-line'));
        assert.isAbove(lines.length, 1);
        const expectedHeight = lines[0].getBoundingClientRect().height;
        for (const line of lines) {
            assert.strictEqual(line.getBoundingClientRect().height, expectedHeight);
        }
        await assertScreenshot('sources/css-plugin-swatches.png');
        editor.remove();
    });
});
//# sourceMappingURL=CSSPlugin.test.js.map