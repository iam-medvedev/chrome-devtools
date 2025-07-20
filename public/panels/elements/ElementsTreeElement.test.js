// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import * as TextUtils from '../../models/text_utils/text_utils.js';
import { createTarget, updateHostConfig } from '../../testing/EnvironmentHelpers.js';
import { spyCall } from '../../testing/ExpectStubCall.js';
import { describeWithMockConnection, setMockConnectionResponseHandler } from '../../testing/MockConnection.js';
import * as Elements from './elements.js';
describe('ElementsTreeElement', () => {
    describe('convertUnicodeCharsToHTMLEntities', () => {
        it('converts unicode characters to HTML entities', () => {
            const input = '\u2002\u2002This string has spaces\xA0\xA0and other\u202Aunicode characters\u200A.';
            const expected = {
                text: '&ensp;&ensp;This string has spaces&nbsp;&nbsp;and other&#x202A;unicode characters&hairsp;.',
                entityRanges: [
                    new TextUtils.TextRange.SourceRange(0, 6),
                    new TextUtils.TextRange.SourceRange(6, 6),
                    new TextUtils.TextRange.SourceRange(34, 6),
                    new TextUtils.TextRange.SourceRange(40, 6),
                    new TextUtils.TextRange.SourceRange(55, 8),
                    new TextUtils.TextRange.SourceRange(81, 8),
                ],
            };
            const result = Elements.ElementsTreeElement.convertUnicodeCharsToHTMLEntities(input);
            assert.strictEqual(result.text, expected.text);
            assert.deepEqual(result.entityRanges, expected.entityRanges);
        });
        it('returns the original string if no unicode characters are present', () => {
            const input = 'ThisStringHasNoWhitespace';
            const expected = {
                text: 'ThisStringHasNoWhitespace',
                entityRanges: [],
            };
            const result = Elements.ElementsTreeElement.convertUnicodeCharsToHTMLEntities(input);
            assert.strictEqual(result.text, expected.text);
            assert.deepEqual(result.entityRanges, expected.entityRanges);
        });
    });
});
describeWithMockConnection('ElementsTreeElement', () => {
    let nodeIdCounter = 0;
    function getTreeElement(model, treeOutline) {
        const node = new SDK.DOMModel.DOMNode(model);
        node.id = nodeIdCounter++;
        model.registerNode(node);
        const treeElement = new Elements.ElementsTreeElement.ElementsTreeElement(node);
        node.setAttributesPayload(['popover', 'manual']);
        treeOutline.bindTreeElement(treeElement);
        return treeElement;
    }
    async function getAdorner(treeElement) {
        await treeElement.updateStyleAdorners();
        const { tagTypeContext } = treeElement;
        const adorners = 'adorners' in tagTypeContext ? tagTypeContext.adorners : undefined;
        assert.exists(adorners);
        assert.lengthOf(adorners, 1);
        const { value } = adorners.values().next();
        assert.exists(value);
        assert.strictEqual(value.name, 'popover');
        return value;
    }
    beforeEach(() => {
        updateHostConfig({ devToolsAllowPopoverForcing: { enabled: true } });
        setMockConnectionResponseHandler('CSS.enable', () => ({}));
        setMockConnectionResponseHandler('CSS.getComputedStyleForNode', () => ({}));
    });
    it('popoverAdorner supports force-opening popovers', async () => {
        const model = new SDK.DOMModel.DOMModel(createTarget());
        const responseHandlerStub = sinon.stub();
        setMockConnectionResponseHandler('DOM.forceShowPopover', responseHandlerStub);
        const treeElement = getTreeElement(model, new Elements.ElementsTreeOutline.ElementsTreeOutline());
        const adorner = await getAdorner(treeElement);
        adorner.dispatchEvent(new MouseEvent('click'));
        sinon.assert.calledOnce(responseHandlerStub);
        assert.isTrue(responseHandlerStub.args[0][0].enable);
        assert.strictEqual(responseHandlerStub.args[0][0].nodeId, treeElement.node().id);
        adorner.dispatchEvent(new MouseEvent('click'));
        sinon.assert.calledTwice(responseHandlerStub);
        assert.isFalse(responseHandlerStub.args[1][0].enable);
        assert.strictEqual(responseHandlerStub.args[1][0].nodeId, treeElement.node().id);
    });
    it('popoverAdorner gets toggled off when a popover is force-closed by another forceShowPopover call', async () => {
        const model = new SDK.DOMModel.DOMModel(createTarget());
        const treeOutline = new Elements.ElementsTreeOutline.ElementsTreeOutline();
        const treeElement1 = getTreeElement(model, treeOutline);
        const treeElement2 = getTreeElement(model, treeOutline);
        const adorner1 = await getAdorner(treeElement1);
        const adorner2 = await getAdorner(treeElement2);
        setMockConnectionResponseHandler('DOM.forceShowPopover', () => ({ nodeIds: adorner2.isActive() ? [treeElement2.node().id] : [] }));
        adorner2.dispatchEvent(new MouseEvent('click'));
        assert.isTrue(adorner2.isActive());
        const toggleStub = spyCall(adorner2, 'toggle');
        adorner1.dispatchEvent(new MouseEvent('click'));
        await toggleStub;
        assert.isTrue(adorner1.isActive());
        assert.isFalse(adorner2.isActive());
    });
});
//# sourceMappingURL=ElementsTreeElement.test.js.map