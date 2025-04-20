// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../../core/sdk/sdk.js';
import { renderElementIntoDOM } from '../../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../../testing/EnvironmentHelpers.js';
import * as InlineEditor from '../../../ui/legacy/components/inline_editor/inline_editor.js';
import * as ElementsComponents from './components.js';
function createAnchorFunctionLinkSwatch(props = {}) {
    return new ElementsComponents.AnchorFunctionLinkSwatch.AnchorFunctionLinkSwatch({
        onLinkActivate: () => { },
        onMouseEnter: () => { },
        onMouseLeave: () => { },
        ...props,
    });
}
describeWithEnvironment('AnchorFunctionLinkSwatch', () => {
    describe('when identifier exists', () => {
        let linkSwatchDataStub;
        beforeEach(() => {
            linkSwatchDataStub = sinon.spy(InlineEditor.LinkSwatch.LinkSwatch.prototype, 'data', ['set']);
        });
        afterEach(() => {
            linkSwatchDataStub.set.restore();
        });
        it('should render a defined link when `anchorNode` is resolved correctly', () => {
            const component = createAnchorFunctionLinkSwatch({
                identifier: '--identifier',
                anchorNode: sinon.createStubInstance(SDK.DOMModel.DOMNode),
            });
            renderElementIntoDOM(component);
            sinon.assert.calledWith(linkSwatchDataStub.set, {
                text: '--identifier',
                isDefined: true,
                tooltip: undefined,
                jslogContext: 'anchor-link',
                onLinkActivate: sinon.match.func,
            });
        });
        it('should render an undefined link when `anchorNode` is not resolved correctly', () => {
            const component = createAnchorFunctionLinkSwatch({
                identifier: '--identifier',
                anchorNode: undefined,
            });
            renderElementIntoDOM(component);
            sinon.assert.calledWith(linkSwatchDataStub.set, {
                text: '--identifier',
                isDefined: false,
                tooltip: { title: '--identifier is not defined' },
                jslogContext: 'anchor-link',
                onLinkActivate: sinon.match.func,
            });
        });
        it('should call `onMouseEnter` when mouse enters linkSwatch', () => {
            const data = {
                identifier: '--identifier',
                anchorNode: sinon.createStubInstance(SDK.DOMModel.DOMNode),
                onMouseEnter: sinon.mock(),
            };
            const component = createAnchorFunctionLinkSwatch(data);
            renderElementIntoDOM(component);
            const linkSwatch = component.shadowRoot.querySelector('devtools-link-swatch');
            linkSwatch.dispatchEvent(new Event('mouseenter'));
            sinon.assert.calledOnce(data.onMouseEnter);
        });
        it('should call `onMouseLeave` when mouse leaves linkSwatch', () => {
            const data = {
                identifier: '--identifier',
                anchorNode: sinon.createStubInstance(SDK.DOMModel.DOMNode),
                onMouseLeave: sinon.mock(),
            };
            const component = createAnchorFunctionLinkSwatch(data);
            renderElementIntoDOM(component);
            const linkSwatch = component.shadowRoot.querySelector('devtools-link-swatch');
            linkSwatch.dispatchEvent(new Event('mouseleave'));
            sinon.assert.calledOnce(data.onMouseLeave);
        });
    });
    describe('when identifier does not exist', () => {
        it('should not render anything when `anchorNode` is not resolved correctly', () => {
            const data = {
                identifier: undefined,
                anchorNode: undefined,
            };
            const component = createAnchorFunctionLinkSwatch(data);
            renderElementIntoDOM(component);
            assert.isEmpty(component.shadowRoot.innerHTML);
        });
        it('should render icon link when `anchorNode` is resolved correctly', () => {
            const data = {
                identifier: undefined,
                anchorNode: sinon.createStubInstance(SDK.DOMModel.DOMNode),
            };
            const component = createAnchorFunctionLinkSwatch(data);
            renderElementIntoDOM(component);
            const icon = component.shadowRoot?.querySelector('devtools-icon');
            assert.exists(icon);
        });
        it('should call `onMouseEnter` when mouse enters the icon', () => {
            const data = {
                identifier: undefined,
                anchorNode: sinon.createStubInstance(SDK.DOMModel.DOMNode),
                onMouseEnter: sinon.mock(),
            };
            const component = createAnchorFunctionLinkSwatch(data);
            renderElementIntoDOM(component);
            const icon = component.shadowRoot.querySelector('devtools-icon');
            icon?.dispatchEvent(new Event('mouseenter'));
            sinon.assert.calledOnce(data.onMouseEnter);
        });
        it('should call `onMouseLeave` when mouse leaves the icon', () => {
            const data = {
                identifier: undefined,
                anchorNode: sinon.createStubInstance(SDK.DOMModel.DOMNode),
                onMouseLeave: sinon.mock(),
            };
            const component = createAnchorFunctionLinkSwatch(data);
            renderElementIntoDOM(component);
            const icon = component.shadowRoot.querySelector('devtools-icon');
            icon?.dispatchEvent(new Event('mouseleave'));
            sinon.assert.calledOnce(data.onMouseLeave);
        });
        it('should call `onLinkActivate` when clicking on the icon', () => {
            const data = {
                identifier: undefined,
                anchorNode: sinon.createStubInstance(SDK.DOMModel.DOMNode),
                onLinkActivate: sinon.mock(),
            };
            const component = createAnchorFunctionLinkSwatch(data);
            renderElementIntoDOM(component);
            const icon = component.shadowRoot.querySelector('devtools-icon');
            icon?.dispatchEvent(new Event('click'));
            sinon.assert.calledOnce(data.onLinkActivate);
        });
    });
});
//# sourceMappingURL=AnchorFunctionLinkSwatch.test.js.map