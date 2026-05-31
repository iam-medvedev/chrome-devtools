// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Platform from '../../../core/platform/platform.js';
import * as SDK from '../../../core/sdk/sdk.js';
import { renderElementIntoDOM } from '../../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../../testing/EnvironmentHelpers.js';
import { expectCalled } from '../../../testing/ExpectStubCall.js';
import * as Marked from '../../../third_party/marked/marked.js';
import * as MarkdownView from '../../../ui/components/markdown_view/markdown_view.js';
import { html } from '../../../ui/lit/lit.js';
import * as PanelsCommon from '../../common/common.js';
import * as AiAssistance from '../ai_assistance.js';
const { urlString } = Platform.DevToolsPath;
describeWithEnvironment('AccessibilityAgentMarkdownRenderer', () => {
    describe('link', () => {
        const renderToElem = (string) => {
            const component = new MarkdownView.MarkdownView.MarkdownView();
            renderElementIntoDOM(component, { allowMultipleChildren: true });
            component.data = {
                tokens: Marked.Marked.lexer(string),
                renderer: new AiAssistance.AccessibilityAgentMarkdownRenderer(urlString `https://example.com`),
            };
            for (const el of component.shadowRoot?.children ?? []) {
                if (el.nodeType === Node.ELEMENT_NODE && el.tagName !== 'STYLE') {
                    return el;
                }
            }
            assert.fail('No Element node found');
        };
        it('linkifies nodes using #node-ID', async () => {
            const targetManager = SDK.TargetManager.TargetManager.instance();
            const mockDomModel = sinon.createStubInstance(SDK.DOMModel.DOMModel);
            const mockTarget = {
                model: (modelClass) => {
                    if (modelClass === SDK.DOMModel.DOMModel) {
                        return mockDomModel;
                    }
                    return null;
                },
            };
            sinon.stub(targetManager, 'primaryPageTarget').returns(mockTarget);
            const mockDocument = {
                documentURL: 'https://example.com',
            };
            const mockNode = {
                ownerDocument: mockDocument,
            };
            mockDomModel.pushNodesByBackendIdsToFrontend.resolves(new Map([
                [23, mockNode],
            ]));
            const linkifyStub = sinon.stub(PanelsCommon.DOMLinkifier.Linkifier.instance(), 'linkify').returns(html `<span>LINKIFIED</span>`);
            const el = renderToElem('[text](#node-23)');
            // Wait for async rendering (until directive)
            await new Promise(resolve => setTimeout(resolve, 0));
            sinon.assert.calledOnce(mockDomModel.pushNodesByBackendIdsToFrontend);
            sinon.assert.calledOnce(linkifyStub);
            assert.include(el.textContent, 'LINKIFIED');
        });
        it('does not linkify nodes if the node belongs to a different origin', async () => {
            const targetManager = SDK.TargetManager.TargetManager.instance();
            const mockDomModel = sinon.createStubInstance(SDK.DOMModel.DOMModel);
            const mockTarget = {
                model: (modelClass) => {
                    if (modelClass === SDK.DOMModel.DOMModel) {
                        return mockDomModel;
                    }
                    return null;
                },
            };
            sinon.stub(targetManager, 'primaryPageTarget').returns(mockTarget);
            const mockDocument = {
                documentURL: 'https://cross-origin.com',
            };
            const mockNode = {
                ownerDocument: mockDocument,
            };
            mockDomModel.pushNodesByBackendIdsToFrontend.resolves(new Map([
                [23, mockNode],
            ]));
            const linkifyStub = sinon.stub(PanelsCommon.DOMLinkifier.Linkifier.instance(), 'linkify').returns(html `<span>LINKIFIED</span>`);
            const el = renderToElem('[text](#node-23)');
            await new Promise(resolve => setTimeout(resolve, 0));
            sinon.assert.calledOnce(mockDomModel.pushNodesByBackendIdsToFrontend);
            sinon.assert.notCalled(linkifyStub);
            assert.include(el.textContent, 'text');
            assert.notInclude(el.textContent, 'LINKIFIED');
        });
        it('linkifies nodes using #node-ID if both are identical data URLs', async () => {
            const targetManager = SDK.TargetManager.TargetManager.instance();
            const mockDomModel = sinon.createStubInstance(SDK.DOMModel.DOMModel);
            const mockTarget = {
                model: (modelClass) => {
                    if (modelClass === SDK.DOMModel.DOMModel) {
                        return mockDomModel;
                    }
                    return null;
                },
            };
            sinon.stub(targetManager, 'primaryPageTarget').returns(mockTarget);
            const mockDocument = {
                documentURL: 'data:text/html,foo',
            };
            const mockNode = {
                ownerDocument: mockDocument,
            };
            mockDomModel.pushNodesByBackendIdsToFrontend.resolves(new Map([
                [23, mockNode],
            ]));
            const linkifyStub = sinon.stub(PanelsCommon.DOMLinkifier.Linkifier.instance(), 'linkify').returns(html `<span>LINKIFIED</span>`);
            const component = new MarkdownView.MarkdownView.MarkdownView();
            renderElementIntoDOM(component, { allowMultipleChildren: true });
            const linkifyCalledPromise = expectCalled(linkifyStub);
            component.data = {
                tokens: Marked.Marked.lexer('[text](#node-23)'),
                renderer: new AiAssistance.AccessibilityAgentMarkdownRenderer(urlString `data:text/html,foo`),
            };
            await linkifyCalledPromise;
            sinon.assert.calledOnce(linkifyStub);
        });
        it('does not linkify nodes if they are different data URLs', async () => {
            const targetManager = SDK.TargetManager.TargetManager.instance();
            const mockDomModel = sinon.createStubInstance(SDK.DOMModel.DOMModel);
            const mockTarget = {
                model: (modelClass) => {
                    if (modelClass === SDK.DOMModel.DOMModel) {
                        return mockDomModel;
                    }
                    return null;
                },
            };
            sinon.stub(targetManager, 'primaryPageTarget').returns(mockTarget);
            const mockDocument = {
                documentURL: 'data:text/html,bar',
            };
            const mockNode = {
                ownerDocument: mockDocument,
            };
            mockDomModel.pushNodesByBackendIdsToFrontend.resolves(new Map([
                [23, mockNode],
            ]));
            const linkifyStub = sinon.stub(PanelsCommon.DOMLinkifier.Linkifier.instance(), 'linkify').returns(html `<span>LINKIFIED</span>`);
            const component = new MarkdownView.MarkdownView.MarkdownView();
            renderElementIntoDOM(component, { allowMultipleChildren: true });
            const pushNodesPromise = expectCalled(mockDomModel.pushNodesByBackendIdsToFrontend);
            component.data = {
                tokens: Marked.Marked.lexer('[text](#node-23)'),
                renderer: new AiAssistance.AccessibilityAgentMarkdownRenderer(urlString `data:text/html,foo`),
            };
            await pushNodesPromise;
            sinon.assert.notCalled(linkifyStub);
            assert.include(component.shadowRoot?.textContent, 'text');
        });
        it('falls back to text if node is not found', async () => {
            const targetManager = SDK.TargetManager.TargetManager.instance();
            const mockDomModel = sinon.createStubInstance(SDK.DOMModel.DOMModel);
            const mockTarget = {
                model: (modelClass) => {
                    if (modelClass === SDK.DOMModel.DOMModel) {
                        return mockDomModel;
                    }
                    return null;
                },
            };
            sinon.stub(targetManager, 'primaryPageTarget').returns(mockTarget);
            mockDomModel.pushNodesByBackendIdsToFrontend.resolves(new Map());
            const el = renderToElem('[text](#node-23)');
            await new Promise(resolve => setTimeout(resolve, 0));
            assert.include(el.textContent, 'text');
        });
        it('linkifies paths using #path-PATH', async () => {
            const targetManager = SDK.TargetManager.TargetManager.instance();
            const mockDomModel = sinon.createStubInstance(SDK.DOMModel.DOMModel);
            const mockTarget = {
                model: (modelClass) => {
                    if (modelClass === SDK.DOMModel.DOMModel) {
                        return mockDomModel;
                    }
                    return null;
                },
            };
            sinon.stub(targetManager, 'primaryPageTarget').returns(mockTarget);
            const mockDocument = {
                documentURL: 'https://example.com',
            };
            const mockNode = {
                ownerDocument: mockDocument,
            };
            mockDomModel.pushNodeByPathToFrontend.resolves(42);
            mockDomModel.nodeForId.returns(mockNode);
            const linkifyStub = sinon.stub(PanelsCommon.DOMLinkifier.Linkifier.instance(), 'linkify')
                .returns(html `<span>LINKIFIED_PATH</span>`);
            const el = renderToElem('[text](#path-1,HTML,1,BODY)');
            await new Promise(resolve => setTimeout(resolve, 0));
            sinon.assert.calledOnce(mockDomModel.pushNodeByPathToFrontend);
            sinon.assert.calledOnce(linkifyStub);
            assert.include(el.textContent, 'LINKIFIED_PATH');
        });
        it('linkifies paths using #1,HTML (without #path- prefix)', async () => {
            const targetManager = SDK.TargetManager.TargetManager.instance();
            const mockDomModel = sinon.createStubInstance(SDK.DOMModel.DOMModel);
            const mockTarget = {
                model: (modelClass) => {
                    if (modelClass === SDK.DOMModel.DOMModel) {
                        return mockDomModel;
                    }
                    return null;
                },
            };
            sinon.stub(targetManager, 'primaryPageTarget').returns(mockTarget);
            const mockDocument = {
                documentURL: 'https://example.com',
            };
            const mockNode = {
                ownerDocument: mockDocument,
            };
            mockDomModel.pushNodeByPathToFrontend.resolves(42);
            mockDomModel.nodeForId.returns(mockNode);
            const linkifyStub = sinon.stub(PanelsCommon.DOMLinkifier.Linkifier.instance(), 'linkify')
                .returns(html `<span>LINKIFIED_PATH</span>`);
            const el = renderToElem('[text](#1,HTML,1,BODY)');
            await new Promise(resolve => setTimeout(resolve, 0));
            sinon.assert.calledOnce(mockDomModel.pushNodeByPathToFrontend);
            sinon.assert.calledWith(mockDomModel.pushNodeByPathToFrontend, '1,HTML,1,BODY');
            sinon.assert.calledOnce(linkifyStub);
            assert.include(el.textContent, 'LINKIFIED_PATH');
        });
        it('does not linkify paths if the node belongs to a different origin', async () => {
            const targetManager = SDK.TargetManager.TargetManager.instance();
            const mockDomModel = sinon.createStubInstance(SDK.DOMModel.DOMModel);
            const mockTarget = {
                model: (modelClass) => {
                    if (modelClass === SDK.DOMModel.DOMModel) {
                        return mockDomModel;
                    }
                    return null;
                },
            };
            sinon.stub(targetManager, 'primaryPageTarget').returns(mockTarget);
            const mockDocument = {
                documentURL: 'https://cross-origin.com',
            };
            const mockNode = {
                ownerDocument: mockDocument,
            };
            mockDomModel.pushNodeByPathToFrontend.resolves(42);
            mockDomModel.nodeForId.returns(mockNode);
            const component = new MarkdownView.MarkdownView.MarkdownView();
            renderElementIntoDOM(component, { allowMultipleChildren: true });
            component.data = {
                tokens: Marked.Marked.lexer('[text](#path-1,HTML,1,BODY)'),
                renderer: new AiAssistance.AccessibilityAgentMarkdownRenderer(urlString `https://example.com`),
            };
            await new Promise(resolve => setTimeout(resolve, 0));
            const el = component.shadowRoot?.querySelector('span');
            assert.exists(el);
            assert.include(el.textContent, 'text');
            assert.notInclude(el.textContent, 'LINKIFIED_PATH');
        });
        it('does not linkify non-integer node IDs', async () => {
            const targetManager = SDK.TargetManager.TargetManager.instance();
            const mockDomModel = sinon.createStubInstance(SDK.DOMModel.DOMModel);
            const mockTarget = {
                model: (modelClass) => {
                    if (modelClass === SDK.DOMModel.DOMModel) {
                        return mockDomModel;
                    }
                    return null;
                },
            };
            sinon.stub(targetManager, 'primaryPageTarget').returns(mockTarget);
            const el = renderToElem('[text](#node-1.5)');
            await new Promise(resolve => setTimeout(resolve, 0));
            sinon.assert.notCalled(mockDomModel.pushNodesByBackendIdsToFrontend);
            assert.include(el.textContent, 'text');
            assert.notInclude(el.textContent, 'LINKIFIED');
        });
    });
});
//# sourceMappingURL=AccessibilityAgentMarkdownRenderer.test.js.map