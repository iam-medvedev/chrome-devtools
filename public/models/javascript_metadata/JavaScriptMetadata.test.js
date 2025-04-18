// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as JavascriptMetadata from './javascript_metadata.js';
describe('JavaScriptMetadata', () => {
    let metadata;
    before(() => {
        metadata = new JavascriptMetadata.JavaScriptMetadata.JavaScriptMetadataImpl();
    });
    it('retrieves native signature by name', () => {
        const signatures = metadata.signaturesForNativeFunction('webkitRequestFullScreen');
        assert.deepEqual(signatures, [['?options']]);
    });
    it('does not retrieve native signatures that are bound to an instance', () => {
        const signatures = metadata.signaturesForNativeFunction('find');
        assert.isNull(signatures);
    });
    describe('with static methods', () => {
        it('retrieves by name and class', () => {
            const signatures = metadata.signaturesForStaticMethod('from', 'Array');
            assert.deepEqual(signatures, [['iterable', '?mapfn', '?thisArg'], ['arrayLike', '?mapfn', '?thisArg']]);
        });
        it('does not retrieve methods that are bound to an instance', () => {
            const signatures = metadata.signaturesForStaticMethod('includes', 'Array');
            assert.isNull(signatures);
        });
        it('handles a non-existing class', () => {
            const signatures = metadata.signaturesForStaticMethod('includes', 'bogus');
            assert.isNull(signatures);
        });
    });
    describe('with instance methods', () => {
        it('retrieves by name and class', () => {
            const signatures = metadata.signaturesForInstanceMethod('assign', 'HTMLSlotElement');
            assert.deepEqual(signatures, [['...nodes']]);
        });
        it('does not retrieve methods that are unbound', () => {
            const signatures = metadata.signaturesForInstanceMethod('webkitRequestFullScreen', 'window');
            assert.isNull(signatures);
        });
        it('does not retrieve static methods', () => {
            const signatures = metadata.signaturesForInstanceMethod('from', 'Array');
            assert.isNull(signatures);
        });
        it('handles a non-existing class', () => {
            const signatures = metadata.signaturesForInstanceMethod('from', 'Sheep');
            assert.isNull(signatures);
        });
    });
});
//# sourceMappingURL=JavaScriptMetadata.test.js.map