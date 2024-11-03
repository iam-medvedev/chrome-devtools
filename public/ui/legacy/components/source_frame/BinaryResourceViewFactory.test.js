// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../../core/common/common.js';
import * as TextUtils from '../../../../models/text_utils/text_utils.js';
import { describeWithEnvironment } from '../../../../testing/EnvironmentHelpers.js';
import * as SourceFrame from './source_frame.js';
describeWithEnvironment('BinaryResourceViewFactory', () => {
    it('interprets base64 content correctly', async () => {
        const base64content = new TextUtils.ContentData.ContentData('c2VuZGluZyB0aGlzIHV0Zi04IHN0cmluZyBhcyBhIGJpbmFyeSBtZXNzYWdlLi4u', true, '');
        const factory = new SourceFrame.BinaryResourceViewFactory.BinaryResourceViewFactory(TextUtils.StreamingContentData.StreamingContentData.from(base64content), 'http://example.com', Common.ResourceType.resourceTypes.WebSocket);
        async function getResourceText(view) {
            const contentData = TextUtils.ContentData.ContentData.contentDataOrEmpty(await view.resource.requestContentData());
            return contentData.text;
        }
        assert.strictEqual(await getResourceText(factory.createBase64View()), 'c2VuZGluZyB0aGlzIHV0Zi04IHN0cmluZyBhcyBhIGJpbmFyeSBtZXNzYWdlLi4u');
        assert.instanceOf(factory.createHexView(), SourceFrame.StreamingContentHexView.StreamingContentHexView);
        assert.strictEqual(await getResourceText(factory.createUtf8View()), 'sending this utf-8 string as a binary message...');
    });
});
//# sourceMappingURL=BinaryResourceViewFactory.test.js.map