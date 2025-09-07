// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from './sdk.js';
describe('SourceMapCache', () => {
    let cache;
    beforeEach(() => {
        cache = SDK.SourceMapCache.SourceMapCache.createForTest('cache-for-test');
    });
    afterEach(async () => {
        await cache.disposeForTest();
    });
    it('returns null for an unknown Debug ID', async () => {
        assert.isNull(await cache.get('1'));
    });
    it('allows retrieval of a source map', async () => {
        const map = {
            version: 3,
            sources: ['foo.ts', 'bar.ts'],
            mappings: '',
        };
        await cache.set('1', map);
        assert.deepEqual(await cache.get('1'), map);
    });
    it('allows updating of a source map', async () => {
        const map = {
            version: 3,
            sources: ['foo.ts', 'bar.ts'],
            mappings: '',
        };
        await cache.set('1', map);
        const map2 = {
            ...map,
            sourcesContent: ['foo content', 'bar content'],
        };
        await cache.set('1', map2);
        assert.deepEqual(await cache.get('1'), map2);
    });
});
//# sourceMappingURL=SourceMapCache.test.js.map