// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../../core/host/host.js';
import * as TextUtils from '../../../models/text_utils/text_utils.js';
import { AiAgent, ConversationContext, } from './AiAgent.js';
export class ProjectContext extends ConversationContext {
    #project;
    constructor(project) {
        super();
        this.#project = project;
    }
    getOrigin() {
        // TODO
        return 'test';
    }
    getItem() {
        return this.#project;
    }
    getIcon() {
        return document.createElement('span');
    }
    getTitle() {
        return this.#project.displayName();
    }
}
function getFiles(project) {
    const files = [];
    const map = new Map();
    for (const uiSourceCode of project.uiSourceCodes()) {
        let path = uiSourceCode.fullDisplayName();
        const idx = path.indexOf('/');
        if (idx !== -1) {
            path = path.substring(idx + 1);
        }
        files.push(path);
        map.set(path, uiSourceCode);
    }
    return { files, map };
}
export class PatchAgent extends AiAgent {
    #project;
    async *
    // eslint-disable-next-line require-yield
    handleContextDetails(_select) {
        // TODO: Implement
        return;
    }
    type = "patch" /* AgentType.PATCH */;
    preamble = undefined;
    clientFeature = Host.AidaClient.ClientFeature.CHROME_PATCH_AGENT;
    get userTier() {
        return 'TESTERS';
    }
    get options() {
        return {
            temperature: undefined,
            modelId: undefined,
        };
    }
    constructor(opts) {
        super(opts);
        this.declareFunction('listFiles', {
            description: 'Returns a list of all files in the project.',
            parameters: {
                type: 6 /* Host.AidaClient.ParametersTypes.OBJECT */,
                description: '',
                nullable: true,
                properties: {},
            },
            handler: async () => {
                if (!this.#project) {
                    return {
                        error: 'No project available',
                    };
                }
                const project = this.#project.getItem();
                const { files } = getFiles(project);
                return {
                    result: {
                        files,
                    }
                };
            },
        });
        this.declareFunction('searchInFiles', {
            description: 'Searches for a text match in all files in the project. For each match it returns the positions of matches.',
            parameters: {
                type: 6 /* Host.AidaClient.ParametersTypes.OBJECT */,
                description: '',
                nullable: false,
                properties: {
                    query: {
                        type: 1 /* Host.AidaClient.ParametersTypes.STRING */,
                        description: 'The query to search for matches in files',
                        nullable: false,
                    },
                    caseSensitive: {
                        type: 4 /* Host.AidaClient.ParametersTypes.BOOLEAN */,
                        description: 'Whether the query is case sensitive or not',
                        nullable: false,
                    },
                    isRegex: {
                        type: 4 /* Host.AidaClient.ParametersTypes.BOOLEAN */,
                        description: 'Whether the query is a regular expression or not',
                        nullable: true,
                    }
                },
            },
            handler: async (params) => {
                if (!this.#project) {
                    return {
                        error: 'No project available',
                    };
                }
                const project = this.#project.getItem();
                const { map } = getFiles(project);
                const matches = [];
                for (const [filepath, file] of map.entries()) {
                    const results = TextUtils.TextUtils.performSearchInContentData(file.workingCopyContentData(), params.query, params.caseSensitive ?? true, params.isRegex ?? false);
                    for (const result of results) {
                        matches.push({
                            filepath,
                            lineNumber: result.lineNumber,
                            columnNumber: result.columnNumber,
                            matchLength: result.matchLength
                        });
                    }
                }
                return {
                    result: {
                        matches,
                    }
                };
            },
        });
    }
    async *run(initialQuery, options) {
        this.#project = options.selected ?? undefined;
        return yield* super.run(initialQuery, options);
    }
}
//# sourceMappingURL=PatchAgent.js.map