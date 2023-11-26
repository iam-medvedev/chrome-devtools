// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Root from '../../core/root/root.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Bindings from '../../models/bindings/bindings.js';
import * as Logs from '../../models/logs/logs.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
const MAX_CODE_SIZE = 1000;
// TODO(crbug.com/1167717): Make this a const enum again
// eslint-disable-next-line rulesdir/const_enum
export var SourceType;
(function (SourceType) {
    SourceType["MESSAGE"] = "message";
    SourceType["STACKTRACE"] = "stacktrace";
    SourceType["NETWORK_REQUEST"] = "networkRequest";
    SourceType["RELATED_CODE"] = "relatedCode";
    SourceType["SEARCH_ANSWERS"] = "searchAnswers";
})(SourceType || (SourceType = {}));
export class PromptBuilder {
    #consoleMessage;
    #cachedSearchResults;
    constructor(consoleMessage) {
        this.#consoleMessage = consoleMessage;
    }
    async getSearchAnswers() {
        if (this.#cachedSearchResults !== undefined) {
            return this.#cachedSearchResults;
        }
        const apiKey = Root.Runtime.Runtime.queryParam('aidaApiKey');
        if (!apiKey) {
            return '';
        }
        const consoleMessage = this.#consoleMessage.consoleMessage().messageText;
        const response = await fetch(`https://customsearch.googleapis.com/customsearch/v1?cx=f499de4cd70e644b1&key=${apiKey}&q="${encodeURIComponent(consoleMessage)}"`);
        const parsedResponse = await response.json();
        const result = [];
        for (const item of parsedResponse.items || []) {
            if (!item.pagemap?.question?.length || !item.pagemap?.answer) {
                continue;
            }
            for (let i = 0; i < Math.min(item.pagemap?.answer?.length, 3); ++i) {
                result.push('  * ' + item.pagemap?.answer[i].text);
            }
            if (result.length >= 4) {
                break;
            }
        }
        this.#cachedSearchResults = result.join('\n');
        return this.#cachedSearchResults;
    }
    async getNetworkRequest() {
        const requestId = this.#consoleMessage.consoleMessage().getAffectedResources()?.requestId;
        if (!requestId) {
            return;
        }
        const log = Logs.NetworkLog.NetworkLog.instance();
        // TODO: we might try handling redirect requests too later.
        return log.requestsForId(requestId)[0];
    }
    /**
     * Gets the source file associated with the top of the message's stacktrace.
     * Returns an empty string if the source is not available for any reasons.
     */
    async getMessageSourceCode() {
        const callframe = this.#consoleMessage.consoleMessage().stackTrace?.callFrames[0];
        const runtimeModel = this.#consoleMessage.consoleMessage().runtimeModel();
        const debuggerModel = runtimeModel?.debuggerModel();
        if (!debuggerModel || !runtimeModel || !callframe) {
            return { text: '', columnNumber: 0, lineNumber: 0 };
        }
        const rawLocation = new SDK.DebuggerModel.Location(debuggerModel, callframe.scriptId, callframe.lineNumber, callframe.columnNumber);
        const mappedLocation = await Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance().rawLocationToUILocation(rawLocation);
        const content = await mappedLocation?.uiSourceCode.requestContent();
        const text = !content?.isEncoded && content?.content ? content.content : '';
        return { text, columnNumber: mappedLocation?.columnNumber ?? 0, lineNumber: mappedLocation?.lineNumber ?? 0 };
    }
    async buildPrompt(sourcesTypes = Object.values(SourceType)) {
        const [sourceCode, request, searchAnswers] = await Promise.all([
            sourcesTypes.includes(SourceType.RELATED_CODE) ? this.getMessageSourceCode() : undefined,
            sourcesTypes.includes(SourceType.NETWORK_REQUEST) ? this.getNetworkRequest() : undefined,
            sourcesTypes.includes(SourceType.SEARCH_ANSWERS) ? this.getSearchAnswers() : '',
        ]);
        const relatedCode = sourceCode?.text ? formatRelatedCode(sourceCode) : '';
        const relatedRequest = request ? formatNetworkRequest(request) : '';
        const message = formatConsoleMessage(this.#consoleMessage);
        const stacktrace = sourcesTypes.includes(SourceType.STACKTRACE) ? formatStackTrace(this.#consoleMessage) : '';
        const prompt = this.formatPrompt({
            message: [message, stacktrace].join('\n').trim(),
            relatedCode,
            relatedRequest,
            searchAnswers,
        });
        const sources = [
            {
                type: SourceType.MESSAGE,
                value: message,
            },
        ];
        if (stacktrace) {
            sources.push({
                type: SourceType.STACKTRACE,
                value: stacktrace,
            });
        }
        if (relatedCode) {
            sources.push({
                type: SourceType.RELATED_CODE,
                value: relatedCode,
            });
        }
        if (relatedRequest) {
            sources.push({
                type: SourceType.NETWORK_REQUEST,
                value: relatedRequest,
            });
        }
        if (searchAnswers) {
            sources.push({
                type: SourceType.SEARCH_ANSWERS,
                value: searchAnswers,
            });
        }
        return {
            prompt,
            sources,
        };
    }
    formatPrompt({ message, relatedCode, relatedRequest, searchAnswers }) {
        const messageHeader = '### Console message:';
        const relatedCodeHeader = '### Code that generated the error:';
        const relatedRequestHeader = '### Related network request:';
        const searchAnswersHeader = '### Suggestions:';
        const explanationHeader = '### Summary:';
        const preamble = `
You are an expert software engineer looking at a console message in DevTools.

You will follow these rules strictly:
- Answer the question as truthfully as possible using the provided context
- if you don't have the answer, say "I don't know" and suggest looking for this information
  elsewhere
- Start with the explanation immediately without repeating the given console message.
- Always wrap code with three backticks (\`\`\`)`;
        const fewShotExamples = [
            {
                message: `Uncaught TypeError: Cannot read properties of undefined (reading 'setState') at home.jsx:15
    at delta (home.jsx:15:14)
    at Object.Dc (react-dom.production.min.js:54:317)
    at Fc (react-dom.production.min.js:54:471)
    at jc (react-dom.production.min.js:55:35)
    at ai (react-dom.production.min.js:105:68)
    at Ks (react-dom.production.min.js:106:380)
    at react-dom.production.min.js:117:104
    at Pu (react-dom.production.min.js:274:42)
    at vs (react-dom.production.min.js:52:375)
    at Dl (react-dom.production.min.js:109:469)
delta @ home.jsx:15


Dc @ react-dom.production.min.js:54
Fc @ react-dom.production.min.js:54
jc @ react-dom.production.min.js:55
ai @ react-dom.production.min.js:105
Ks @ react-dom.production.min.js:106
(anonymous) @ react-dom.production.min.js:117
Pu @ react-dom.production.min.js:274
vs @ react-dom.production.min.js:52
Dl @ react-dom.production.min.js:109
eu @ react-dom.production.min.js:74
bc @ react-dom.production.min.js:73`,
                relatedCode: `class Counter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count : 1
        };

        this.delta.bind(this);
    }

    delta() {
        this.setState({
            count : this.state.count++
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.delta}>+</button>
            </div>
        );
    }
}`,
                searchAnswers: `- This is due to this.delta not being bound to this. In order to bind set this.delta = this.delta.bind(this) in the constructor: constructor(props) { super(props); this.state = { count : 1 };...
- In ES7+ (ES2016) you can use the experimental function bind syntax operator :: to bind. It is a syntactic sugar and will do the same as Davin Tryon's answer. You can then rewrite this.delta...
- There is a difference of context between ES5 and ES6 class. So, there will be a little difference between the implementations as well. Here is the ES5 version: var Counter = React.createClass({...
- You dont have to bind anything, Just use Arrow functions like this: class Counter extends React.Component { constructor(props) { super(props); this.state = { count: 1 }; } //ARROW FUNCTION...`,
                explanation: 'The error occurs because this.delta is not bound to the instance of the Counter component. The fix is it to change the code to be ` this.delta = this.delta.bind(this);`',
            },
            {
                message: `Uncaught TypeError: Cannot set properties of null(setting 'innerHTML')
        at(index): 57: 49(anonymous) @(index): 57 `,
                relatedCode: `<script>
      document.getElementById("test").innerHTML = "Element does not exist";
    </script>
    <div id="test"></div>`,
                searchAnswers: `- You have to place the hello div before the script, so that it exists when the script is loaded.
- Let us first try to understand the root cause as to why it is happening in first place. Why do I get an error or Uncaught TypeError: Cannot set property 'innerHTML' of null? The browser always...
- You could tell javascript to perform the action \"onload\"... Try with this: \u003cscript type =\"text/javascript\"\u003e window.onload = function what(){ document.getElementById('hello').innerHTML = 'hi';...
- Just put your JS in window.onload window.onload = function() { what(); function what() { document.getElementById('hello').innerHTML = 'hi'; }; }`,
                explanation: 'The error means that getElementById returns null instead of the div element. This happens because the script runs before the element is added to the DOM.',
            },
            {
                message: 'Uncaught SyntaxError: Unexpected token \')\' (at script.js:39:14)',
                relatedCode: `if (10 < 120)) {
  console.log('test')
}`,
                searchAnswers: `- this is the way to re export default import as default export, export {default} from './Component'
- In your index.js. export default from './component'"
- Unexpected token errors in ESLint parsing occur due to incompatibility between your development environment and ESLint's current parsing capabilities with the ongoing changes with JavaScripts...
- In my case (im using Firebase Cloud Functions) i opened .eslintrc.json and changed: \"parserOptions\": { // Required for certain syntax usages \"ecmaVersion\": 2017 }, to: \"parserOptions\": { //..."`,
                explanation: 'There is an extra closing `)`. Remove it to fix the issue.',
            },
        ];
        const formatExample = (example) => {
            const result = [];
            result.push(messageHeader, example.message);
            if (relatedCode) {
                result.push(relatedCodeHeader, '```', example.relatedCode, '```');
            }
            if (relatedRequest && example.relatedRequest) {
                result.push(relatedRequestHeader, example.relatedRequest);
            }
            if (searchAnswers) {
                result.push(searchAnswersHeader, example.searchAnswers);
            }
            result.push(explanationHeader, example.explanation);
            return result.join('\n');
        };
        return `${preamble}

${fewShotExamples.map(formatExample).join('\n\n')}

${formatExample({ message, relatedCode, relatedRequest, searchAnswers, explanation: '' })}`;
    }
}
export function allowHeader(header) {
    const normalizedName = header.name.toLowerCase().trim();
    // Skip custom headers.
    if (normalizedName.startsWith('x-')) {
        return false;
    }
    // Skip cookies as they might contain auth.
    if (normalizedName === 'cookie' || normalizedName === 'set-cookie') {
        return false;
    }
    if (normalizedName === 'authorization') {
        return false;
    }
    return true;
}
export function formatRelatedCode({ text, columnNumber, lineNumber }, maxCodeSize = MAX_CODE_SIZE) {
    const relatedCode = [];
    let relatedCodeSize = 0;
    const lines = text.split('\n');
    let currentLineNumber = lineNumber;
    if (lines[currentLineNumber].length >= maxCodeSize / 2) {
        const start = Math.max(columnNumber - maxCodeSize / 2, 0);
        const end = Math.min(columnNumber + maxCodeSize / 2, lines[currentLineNumber].length);
        relatedCode.push(lines[currentLineNumber].substring(start, end));
        relatedCodeSize += end - start;
    }
    else {
        while (lines[currentLineNumber] !== undefined &&
            (relatedCodeSize + lines[currentLineNumber].length <= maxCodeSize / 2)) {
            relatedCode.push(lines[currentLineNumber]);
            relatedCodeSize += lines[currentLineNumber].length;
            currentLineNumber--;
        }
    }
    relatedCode.reverse();
    currentLineNumber = lineNumber + 1;
    while (lines[currentLineNumber] !== undefined && (relatedCodeSize + lines[currentLineNumber].length <= maxCodeSize)) {
        relatedCode.push(lines[currentLineNumber]);
        relatedCodeSize += lines[currentLineNumber].length;
        currentLineNumber++;
    }
    return relatedCode.join('\n');
}
export function formatNetworkRequest(request) {
    // TODO: anything else that might be relavant?
    // TODO: handle missing headers
    return `Request: ${request.url()}

Request headers:
${request.requestHeaders().filter(allowHeader).map(header => `${header.name}: ${header.value}`).join('\n')}

Response headers:
${request.responseHeaders.filter(allowHeader).map(header => `${header.name}: ${header.value}`).join('\n')}

Response status: ${request.statusCode} ${request.statusText}`;
}
export function formatConsoleMessage(message) {
    return message.consoleMessage().messageText;
}
export function formatStackTrace(message) {
    let preview = message.contentElement().querySelector('.stack-preview-container');
    if (!preview) {
        // If there is no preview, we grab the entire raw message replacing the message text.
        return message.toExportString().replace(message.consoleMessage().messageText, '').trim();
    }
    preview = preview.shadowRoot?.querySelector('.stack-preview-container');
    const nodes = preview.childTextNodes();
    // Gets application-level source mapped stack trace taking the ignore list
    // into account.
    const messageContent = nodes
        .filter(n => {
        return !n.parentElement?.closest('.show-all-link,.show-less-link,.hidden-row');
    })
        .map(Components.Linkifier.Linkifier.untruncatedNodeText)
        .join('');
    return messageContent.trim();
}
//# sourceMappingURL=PromptBuilder.js.map