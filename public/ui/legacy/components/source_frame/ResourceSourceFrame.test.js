// Copyright 2024 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import * as Common from '../../../../core/common/common.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as TextUtils from '../../../../core/text_utils/text_utils.js';
import { renderElementIntoDOM } from '../../../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../../../testing/EnvironmentHelpers.js';
import { createViewFunctionStub } from '../../../../testing/ViewFunctionHelpers.js';
import * as UI from '../../legacy.js';
import * as SourceFrame from './source_frame.js';
const { urlString } = Platform.DevToolsPath;
class MockStreamingContentProvider {
    #contentURL;
    #contentType;
    #content;
    constructor(contentURL, contentType, initialContent) {
        this.#contentURL = contentURL;
        this.#contentType = contentType;
        this.#content = TextUtils.StreamingContentData.StreamingContentData.from(initialContent);
    }
    async requestStreamingContent() {
        return this.#content;
    }
    async requestContentData() {
        return this.#content.content();
    }
    contentURL() {
        return this.#contentURL;
    }
    contentType() {
        return this.#contentType;
    }
    addChunk(chunk) {
        this.#content.addChunk(chunk);
    }
    searchInContent(_query, _caseSensitive, _isRegex) {
        throw new Error('Method not implemented.');
    }
}
describeWithEnvironment('ResourceSourceFrame', () => {
    it('updates the editor when a StreamingContentProvider changes', async () => {
        const contentProvider = new MockStreamingContentProvider(urlString `https://example.com/sse`, Common.ResourceType.resourceTypes.Fetch, new TextUtils.ContentData.ContentData('', true, 'text/event-stream'));
        const resourceSourceFrame = new SourceFrame.ResourceSourceFrame.ResourceSourceFrame(contentProvider, 'text/event-stream');
        renderElementIntoDOM(resourceSourceFrame);
        const initialState = await new Promise(resolve => sinon.stub(resourceSourceFrame.textEditor, 'state').set(resolve));
        assert.strictEqual(initialState.doc.toString(), '');
        contentProvider.addChunk('Zm9v');
        const updatedState = await new Promise(resolve => sinon.stub(resourceSourceFrame.textEditor, 'state').set(resolve));
        assert.strictEqual(updatedState.doc.toString(), 'foo');
        resourceSourceFrame.detach();
    });
    describe('SearchableContainer', () => {
        it('passes sourceFrame, placeholder, and toolbarItems to the view', async () => {
            const contentProvider = new TextUtils.StaticContentProvider.StaticContentProvider(urlString `https://example.com/app.js`, Common.ResourceType.resourceTypes.Script, () => Promise.resolve(new TextUtils.ContentData.ContentData('console.log(1);', false, 'text/javascript')));
            const view = createViewFunctionStub(SourceFrame.ResourceSourceFrame.SearchableContainer);
            const container = new SourceFrame.ResourceSourceFrame.SearchableContainer(contentProvider, 'text/javascript', undefined, view);
            assert.strictEqual(view.input.placeholder, 'Find');
            assert.instanceOf(view.input.sourceFrame, SourceFrame.ResourceSourceFrame.ResourceSourceFrame);
            await view.nextInput;
            assert.isDefined(view.input.toolbarItems);
            const revealSpy = sinon.spy(view.input.sourceFrame, 'revealPosition');
            await container.revealPosition({ lineNumber: 0, columnNumber: 4 });
            sinon.assert.calledOnceWithExactly(revealSpy, { lineNumber: 0, columnNumber: 4 }, true);
        });
        it('renders a SearchableView with placeholder and toolbar in DEFAULT_VIEW', async () => {
            const contentProvider = new TextUtils.StaticContentProvider.StaticContentProvider(urlString `https://example.com/app.js`, Common.ResourceType.resourceTypes.Script, () => Promise.resolve(new TextUtils.ContentData.ContentData('console.log(1);', false, 'text/javascript')));
            const container = SourceFrame.ResourceSourceFrame.ResourceSourceFrame.createSearchableView(contentProvider, 'text/javascript');
            renderElementIntoDOM(container);
            const searchableElement = container.contentElement.querySelector('.searchable-view');
            assert.exists(searchableElement);
            const searchableView = UI.SearchableView.SearchableView.fromElement(searchableElement);
            assert.exists(searchableView);
            assert.strictEqual(searchableView.placeholder, 'Find');
            const toolbar = container.contentElement.querySelector('devtools-toolbar.toolbar');
            assert.exists(toolbar);
            container.detach();
        });
    });
});
//# sourceMappingURL=ResourceSourceFrame.test.js.map