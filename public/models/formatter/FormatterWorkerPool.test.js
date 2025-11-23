// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Formatter from './formatter.js';
describe('FormatterWorkerPool', () => {
    describe('javaScriptScopeTree', () => {
        it('works', async () => {
            const pool = new Formatter.FormatterWorkerPool.FormatterWorkerPool();
            const scopeTree = await pool.javaScriptScopeTree('function foo() {}');
            assert.isNotNull(scopeTree);
            assert.strictEqual(scopeTree.kind, 3 /* Formatter.FormatterWorkerPool.ScopeKind.GLOBAL */);
            assert.strictEqual(scopeTree.children[0].kind, 2 /* Formatter.FormatterWorkerPool.ScopeKind.FUNCTION */);
            pool.dispose();
        });
    });
    describe('format', () => {
        it('works', async () => {
            const pool = new Formatter.FormatterWorkerPool.FormatterWorkerPool();
            const { content } = await pool.format('text/javascript', 'function foo(){console.log("hello");}', '  ');
            assert.deepEqual(content.split('\n'), [
                'function foo() {',
                '  console.log("hello");',
                '}',
                '',
            ]);
            pool.dispose();
        });
    });
});
//# sourceMappingURL=FormatterWorkerPool.test.js.map