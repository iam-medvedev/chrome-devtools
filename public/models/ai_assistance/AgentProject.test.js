// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { createTestFilesystem } from '../../testing/AiAssistanceHelpers.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import * as AiAssistanceModel from '../ai_assistance/ai_assistance.js';
describeWithEnvironment('AgentProject', () => {
    async function mockProject(files, options) {
        const { project, uiSourceCode } = createTestFilesystem('file:///path/to/project', files);
        return { project: new AiAssistanceModel.AgentProject(project, options), uiSourceCode };
    }
    it('can list files', async () => {
        const { project } = await mockProject();
        assert.deepEqual(project.getFiles(), ['index.html']);
    });
    it('ignores node_modules', async () => {
        const { project } = await mockProject([
            {
                path: 'node_modules/test.js',
                content: 'content',
            },
            {
                path: 'test/another/node_modules/test2.js',
                content: 'content',
            }
        ]);
        assert.deepEqual(project.getFiles(), ['index.html']);
    });
    it('can search files', async () => {
        const { project } = await mockProject();
        assert.deepEqual(await project.searchFiles('content'), [{
                columnNumber: 0,
                filepath: 'index.html',
                lineNumber: 0,
                matchLength: 7,
            }]);
    });
    it('can read files', async () => {
        const { project } = await mockProject();
        assert.deepEqual(project.readFile('index.html'), 'content');
    });
    it('can report processed files', async () => {
        const { project } = await mockProject();
        assert.deepEqual(project.getProcessedFiles(), []);
        project.readFile('index.html');
        assert.deepEqual(project.getProcessedFiles(), ['index.html']);
    });
    describe('write file', () => {
        describe('full', () => {
            it('can write files files', async () => {
                const { project } = await mockProject();
                project.writeFile('index.html', 'updated');
                assert.deepEqual(project.readFile('index.html'), 'updated');
            });
        });
        describe('unified', () => {
            it('can write files', async () => {
                const { project } = await mockProject();
                const unifiedDiff = `\`\`\`\`\`
diff
--- a/index.html
+++ b/index.html
@@ -817,5 +817,5 @@
-content
+updated
\`\`\`\`\``;
                project.writeFile('index.html', unifiedDiff, "unified" /* AiAssistanceModel.ReplaceStrategy.UNIFIED_DIFF */);
                assert.deepEqual(project.readFile('index.html'), 'updated');
            });
            it('can write files with multiple changes', async () => {
                const { project } = await mockProject([
                    {
                        path: 'index.css',
                        content: `Line:1
Line:2
Line:3
Line:4
Line:5`,
                    },
                ]);
                const unifiedDiff = `\`\`\`\`\`
diff
--- a/index.css
+++ b/index.css
@@ -817,1 +817,1 @@
-Line:1
+LineUpdated:1
@@ -856,7 +857,7 @@
-Line:4
+LineUpdated:4
\`\`\`\`\``;
                project.writeFile('index.css', unifiedDiff, "unified" /* AiAssistanceModel.ReplaceStrategy.UNIFIED_DIFF */);
                assert.deepEqual(project.readFile('index.css'), `LineUpdated:1
Line:2
Line:3
LineUpdated:4
Line:5`);
            });
            it('can write files with only addition', async () => {
                const { project } = await mockProject([
                    {
                        path: 'index.css',
                        content: '',
                    },
                ]);
                const unifiedDiff = `\`\`\`\`\`
diff
--- a/index.css
+++ b/index.css
@@ -817,1 +817,1 @@
+Line:1
+Line:4
\`\`\`\`\``;
                project.writeFile('index.css', unifiedDiff, "unified" /* AiAssistanceModel.ReplaceStrategy.UNIFIED_DIFF */);
                assert.deepEqual(project.readFile('index.css'), `Line:1
Line:4`);
            });
            it('can write files with multiple additions', async () => {
                const { project } = await mockProject([
                    {
                        path: 'index.css',
                        content: `Line:1
Line:2
Line:3
Line:4
Line:5`,
                    },
                ]);
                const unifiedDiff = `\`\`\`\`\`
diff
--- a/index.css
+++ b/index.css
@@ -817,1 +817,1 @@
-Line:1
+LineUpdated:1
+LineUpdated:1.5
\`\`\`\`\``;
                project.writeFile('index.css', unifiedDiff, "unified" /* AiAssistanceModel.ReplaceStrategy.UNIFIED_DIFF */);
                assert.deepEqual(project.readFile('index.css'), `LineUpdated:1
LineUpdated:1.5
Line:2
Line:3
Line:4
Line:5`);
            });
            it('can write files with only deletion', async () => {
                const { project } = await mockProject([
                    {
                        path: 'index.css',
                        content: `Line:1
Line:2
Line:3
Line:4
Line:5`,
                    },
                ]);
                const unifiedDiff = `\`\`\`\`\`
diff
--- a/index.css
+++ b/index.css
@@ -817,1 +817,1 @@
 Line:1
-Line:2
 Line:3
\`\`\`\`\``;
                project.writeFile('index.css', unifiedDiff, "unified" /* AiAssistanceModel.ReplaceStrategy.UNIFIED_DIFF */);
                assert.deepEqual(project.readFile('index.css'), `Line:1
Line:3
Line:4
Line:5`);
            });
            it('can write files with only deletion no search lines', async () => {
                const { project } = await mockProject([
                    {
                        path: 'index.css',
                        content: 'Line:1',
                    },
                ]);
                const unifiedDiff = `\`\`\`\`\`
diff
--- a/index.css
+++ b/index.css
@@ -817,1 +817,1 @@
-Line:1
\`\`\`\`\``;
                project.writeFile('index.css', unifiedDiff, "unified" /* AiAssistanceModel.ReplaceStrategy.UNIFIED_DIFF */);
                assert.deepEqual(project.readFile('index.css'), '');
            });
            it('can write files with first line next to @@', async () => {
                const { project } = await mockProject([
                    {
                        path: 'index.css',
                        content: `Line:1
Line:2
Line:3
Line:4
Line:5`,
                    },
                ]);
                const unifiedDiff = `\`\`\`\`\`
diff
--- a/index.css
+++ b/index.css
@@ -817,1 +817,1 @@-Line:1
-Line:2
 Line:3
\`\`\`\`\``;
                project.writeFile('index.css', unifiedDiff, "unified" /* AiAssistanceModel.ReplaceStrategy.UNIFIED_DIFF */);
                assert.deepEqual(project.readFile('index.css'), `Line:3
Line:4
Line:5`);
            });
        });
    });
    describe('limits', () => {
        it('cannot write more files than allowed', async () => {
            const { project } = await mockProject([{
                    path: 'example2.js',
                    content: 'content',
                }], {
                maxFilesChanged: 1,
                maxLinesChanged: 10,
            });
            project.writeFile('index.html', 'updated');
            expect(() => {
                project.writeFile('example2.js', 'updated2');
            }).throws('Too many files changed');
            assert.deepEqual(project.readFile('index.html'), 'updated');
            assert.deepEqual(project.readFile('example2.js'), 'content');
        });
        it('cannot write same file multiple times', async () => {
            const { project } = await mockProject(undefined, {
                maxFilesChanged: 1,
                maxLinesChanged: 10,
            });
            project.writeFile('index.html', 'updated');
            project.writeFile('index.html', 'updated2');
            assert.deepEqual(project.readFile('index.html'), 'updated2');
        });
        it('cannot write more lines than allowed', async () => {
            const { project } = await mockProject([{
                    path: 'example2.js',
                    content: 'content',
                }], {
                maxFilesChanged: 1,
                maxLinesChanged: 1,
            });
            expect(() => {
                project.writeFile('example2.js', 'updated2\nupdated3');
            }).throws('Too many lines changed');
            assert.deepEqual(project.readFile('example2.js'), 'content');
        });
    });
});
//# sourceMappingURL=AgentProject.test.js.map