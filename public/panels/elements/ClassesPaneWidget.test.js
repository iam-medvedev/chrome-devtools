// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import sinon from 'sinon';
import * as SDK from '../../core/sdk/sdk.js';
import { renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { createTarget, describeWithEnvironment, stubNoopSettings } from '../../testing/EnvironmentHelpers.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Elements from './elements.js';
const CLASS_NAMES = ['class-1', 'class-2', 'class-3'];
describeWithEnvironment('ClassesPaneWidget', () => {
    let target;
    let view;
    beforeEach(() => {
        stubNoopSettings();
        target = createTarget();
    });
    afterEach(() => {
        view?.detach();
    });
    const updatesUiOnEvent = (inScope) => async () => {
        SDK.TargetManager.TargetManager.instance().setScopeTarget(inScope ? target : null);
        view = new Elements.ClassesPaneWidget.ClassesPaneWidget();
        renderElementIntoDOM(view);
        const model = target.model(SDK.DOMModel.DOMModel);
        assert.exists(model);
        const node = new SDK.DOMModel.DOMNode(model);
        const createCheckboxLabel = sinon.spy(UI.UIUtils.CheckboxLabel, 'create');
        UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, node);
        sinon.stub(node, 'enclosingElementOrSelf').returns(node);
        sinon.stub(node, 'getAttribute').withArgs('class').returns(CLASS_NAMES.join(' '));
        sinon.assert.notCalled(createCheckboxLabel);
        model.dispatchEventToListeners(SDK.DOMModel.Events.DOMMutated, node);
        sinon.assert.callCount(createCheckboxLabel, inScope ? CLASS_NAMES.length : 0);
    };
    it('updates UI on in scope update event', updatesUiOnEvent(true));
    it('does not update UI on out of scope update event', updatesUiOnEvent(false));
    describe('ClassNamePrompt', () => {
        let domModel;
        let cssModel;
        let node;
        beforeEach(() => {
            const model = target.model(SDK.DOMModel.DOMModel);
            assert.exists(model);
            domModel = model;
            const css = domModel.cssModel();
            assert.exists(css);
            cssModel = css;
            node = new SDK.DOMModel.DOMNode(domModel);
            node.ownerDocument = { id: 1 };
            sinon.stub(node, 'frameId').returns('main-frame');
            UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, node);
            sinon.stub(cssModel, 'allStyleSheets').returns([
                { id: 'stylesheet1', frameId: 'main-frame' },
            ]);
            sinon.stub(cssModel, 'getClassNames').withArgs('stylesheet1').resolves([
                'b',
                'abc',
                'a1',
                'a2',
            ]);
            sinon.stub(domModel, 'classNamesPromise').resolves([]);
        });
        function stubSuggestBox() {
            const { resolve, promise } = Promise.withResolvers();
            const suggestBoxStub = sinon.stub(UI.SuggestBox.SuggestBox.prototype, 'updateSuggestions');
            suggestBoxStub.callsFake((_, suggestions) => {
                suggestBoxStub.restore();
                resolve(suggestions);
            });
            return promise;
        }
        async function getCompletions(text, nodeClasses = new Map()) {
            const suggestBoxPromise = stubSuggestBox();
            const prompt = new Elements.ClassesPaneWidget.ClassNamePrompt(() => nodeClasses);
            const div = document.createElement('div');
            renderElementIntoDOM(div);
            prompt.attachAndStartEditing(div);
            prompt.setText(text);
            await prompt.complete();
            const completions = await suggestBoxPromise;
            return completions.map(c => c.text);
        }
        it('shows completions matching dot prefix in alphabetical order', async () => {
            const texts = await getCompletions('.');
            assert.deepEqual(texts, ['.a1', '.a2', '.abc', '.b']);
        });
        it('shows completions matching class name prefix in alphabetical order', async () => {
            const texts = await getCompletions('a');
            assert.deepEqual(texts, ['a1', 'a2', 'abc']);
        });
        it('filters out classes already present on the selected node', async () => {
            sinon.stub(node, 'getAttribute').withArgs('class').returns('abc');
            const texts = await getCompletions('a', new Map([['abc', true]]));
            assert.deepEqual(texts, ['a1', 'a2']);
        });
    });
});
//# sourceMappingURL=ClassesPaneWidget.test.js.map