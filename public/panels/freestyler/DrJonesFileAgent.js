// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Bindings from '../../models/bindings/bindings.js';
import { AiAgent, } from './AiAgent.js';
const preamble = `You are a highly skilled software engineer with expertise in various programming languages and frameworks.
You are provided with the content of a file from the Chrome DevTools Sources panel. To aid your analysis, you've been given the below links to understand the context of the code and its relationship to other files. When answering questions, prioritize providing these links directly.
* Source-mapped from: If this code is the source for a mapped file, you'll have a link to that generated file.
* Source map: If this code has an associated source map, you'll have link to the source map.

Analyze the code and provide the following information:
* Describe the primary functionality of the code. What does it do? Be specific and concise. If the code snippet is too small or unclear to determine the functionality, state that explicitly.
* If possible, identify the framework or library the code is associated with (e.g., React, Angular, jQuery). List any key technologies, APIs, or patterns used in the code (e.g., Fetch API, WebSockets, object-oriented programming).
* (Only provide if available and accessible externally) External Resources: Suggest relevant documentation that could help a developer understand the code better. Prioritize official documentation if available. Do not provide any internal resources.

# Considerations
* Keep your analysis concise and focused, highlighting only the most critical aspects for a software engineer.
* Answer questions directly, using the provided links whenever relevant.
* Always double-check links to make sure they are complete and correct.
* **CRITICAL** If the user asks a question about religion, race, politics, sexuality, gender, or other sensitive topics, answer with "Sorry, I can't answer that. I'm best at questions about files."
* **Important Note:** The provided code may represent an incomplete fragment of a larger file. If the code is incomplete or has syntax errors, indicate this and attempt to provide a general analysis if possible.
* **Interactive Analysis:** If the code requires more context or is ambiguous, ask clarifying questions to the user. Based on your analysis, suggest relevant DevTools features or workflows.

## Example session

**User:** (Selects a file containing the following JavaScript code)

function calculateTotal(price, quantity) {
  const total = price * quantity;
  return total;
}
Explain this file.


This code defines a function called calculateTotal that calculates the total cost by multiplying the price and quantity arguments.
This code is written in JavaScript and doesn't seem to be associated with a specific framework. It's likely a utility function.
Relevant Technologies: JavaScript, functions, arithmetic operations.
External Resources:
MDN Web Docs: JavaScript Functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
`;
/*
* Strings that don't need to be translated at this time.
*/
const UIStringsNotTranslate = {
    /**
     *@description Title for thinking step of DrJones File agent.
     */
    analyzingFile: 'Analyzing file',
};
const lockedString = i18n.i18n.lockedString;
const MAX_FILE_SIZE = 10000;
/**
 * One agent instance handles one conversation. Create a new agent
 * instance for a new conversation.
 */
export class DrJonesFileAgent extends AiAgent {
    type = "drjones-file" /* AgentType.DRJONES_FILE */;
    preamble = preamble;
    clientFeature = Host.AidaClient.ClientFeature.CHROME_DRJONES_FILE_AGENT;
    get userTier() {
        const config = Common.Settings.Settings.instance().getHostConfig();
        return config.devToolsAiAssistanceFileAgent?.userTier ?? config.devToolsAiAssistanceFileAgentDogfood?.userTier;
    }
    get options() {
        const config = Common.Settings.Settings.instance().getHostConfig();
        const temperature = config.devToolsAiAssistanceFileAgent?.temperature ?? config.devToolsAiAssistanceFileAgentDogfood?.temperature;
        const modelId = config.devToolsAiAssistanceFileAgent?.modelId ?? config.devToolsAiAssistanceFileAgentDogfood?.modelId;
        return {
            temperature,
            modelId,
        };
    }
    async *handleContextDetails(selectedFile) {
        if (!selectedFile) {
            return;
        }
        yield {
            type: "context" /* ResponseType.CONTEXT */,
            title: lockedString(UIStringsNotTranslate.analyzingFile),
            details: createContextDetailsForDrJonesFileAgent(selectedFile),
        };
    }
    async enhanceQuery(query, selectedFile) {
        const fileEnchantmentQuery = selectedFile ? `# Selected file\n${formatFile(selectedFile)}\n\n# User request\n\n` : '';
        return `${fileEnchantmentQuery}${query}`;
    }
    parseResponse(response) {
        return {
            answer: response,
        };
    }
}
function createContextDetailsForDrJonesFileAgent(selectedFile) {
    return [
        {
            title: 'Selected file',
            text: formatFile(selectedFile),
        },
    ];
}
function formatFile(selectedFile) {
    const debuggerWorkspaceBinding = Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance();
    return `File Name: ${selectedFile.displayName()}
URL: ${selectedFile.url()}
${formatSourceMapDetails(selectedFile, debuggerWorkspaceBinding)}
File Content:
${formatFileContent(selectedFile.content())}`;
}
function formatFileContent(content) {
    const formattedContent = content.length > MAX_FILE_SIZE ? content.slice(0, MAX_FILE_SIZE) + '...\n' : content + '\n';
    return '```' + formattedContent + '```';
}
export function formatSourceMapDetails(selectedFile, debuggerWorkspaceBinding) {
    const mappedFileUrls = [];
    const sourceMapUrls = [];
    if (selectedFile.contentType().isFromSourceMap()) {
        for (const script of debuggerWorkspaceBinding.scriptsForUISourceCode(selectedFile)) {
            const uiSourceCode = debuggerWorkspaceBinding.uiSourceCodeForScript(script);
            if (uiSourceCode) {
                mappedFileUrls.push(uiSourceCode.url());
                if (script.sourceMapURL !== undefined) {
                    sourceMapUrls.push(script.sourceMapURL);
                }
            }
        }
        for (const originURL of Bindings.SASSSourceMapping.SASSSourceMapping.uiSourceOrigin(selectedFile)) {
            mappedFileUrls.push(originURL);
        }
    }
    else if (selectedFile.contentType().isScript()) {
        for (const script of debuggerWorkspaceBinding.scriptsForUISourceCode(selectedFile)) {
            if (script.sourceMapURL !== undefined) {
                sourceMapUrls.push(script.sourceMapURL);
            }
        }
    }
    if (sourceMapUrls.length === 0) {
        return '';
    }
    let sourceMapDetails = 'Source map: ' + sourceMapUrls;
    if (mappedFileUrls.length > 0) {
        sourceMapDetails += '\nSource mapped from: ' + mappedFileUrls;
    }
    return sourceMapDetails;
}
function setDebugFreestylerEnabled(enabled) {
    if (enabled) {
        localStorage.setItem('debugFreestylerEnabled', 'true');
    }
    else {
        localStorage.removeItem('debugFreestylerEnabled');
    }
}
// @ts-ignore
globalThis.setDebugFreestylerEnabled = setDebugFreestylerEnabled;
//# sourceMappingURL=DrJonesFileAgent.js.map